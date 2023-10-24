var prodActual = {};
var asincrono = true;//clientes y responsablesPago
var gImporteCobrar = 0;
var jsonClientes = [];
var jsonPredeterminado = new Array();
var paramStock = -1;
var stockReal = 0;
var validarStockInd = "S";
//DETALLES SIN REDONDEO
var detallesVenta2 = [];
var prodActual2 = {};
var totales = {};
var aux_predeterminado = false;
//CODIGO DE LA VENTA DE MANERA GLOBAL
//var codigodctoglobal;

//PARAMETROS NUEVOS
var prmtVNST = "";//VALIDA STOCK ANTES DE AGREGAR A DETALLES
var agregarDetalle = "";//AGREGAR DETALLE VALIDADO
var cargarprederteminado = false;
//EQUIVALENCIA DE UNIDADESLMCO
var equivalencias = [];

var carga_ini_ind = false;
var cargaDctoOrigenInd = false;
var vAsientoContable = null;
//Pruebita DPORTA
var deuda;
var cate_cod = "";
var cate_des = "";
//Pruebita 2 DPORTA
var cod_cate_clie = "";
var des_cate_clie = "";
const sCodModulo = "0001";
//DPORTA
var prmtDIGC = 0;
var prmtDIGP = 0;
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE
var prmtBFDV = "NO";//BLOQUEA FECHA DE EMISIÓN
var docu = "";
var prmtCURS = "";
var token_migo = '';//dporta
var desc_producto = '';
//var cta_detraccion = '';
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

var fillCboDirecciones = function (pidm) {
    //Bloquear("div_direccion");
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=7&PIDM=" + pidm,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            //Desbloquear("div_direccion");
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
            //Desbloquear("div_direccion");
            infoCustom2("No existen direcciones registradas para el cliente seleccionado.");
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

var NVMDOCV = function () {
    var nPlazoDiasLinea = '';
    var monto = '';
    var nMontoSaldoDoc;

    var plugins = function () {
        $('#cbo_Empresa, #cbo_Sucursal,#cboVendedor, #cbo_modo_pago, #cboDocumentoVenta, #cboDctoOrigen, #cbo_moneda, #cbo_und_medida,  #cboTipoDoc,#cbo_correlativo,#cboSerieDocVenta, #cboAlmacen').select2();
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_vig').datepicker();

        $('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_vig').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txtFechaRegistro, #txtFechaGiro').datepicker("setDate", "now");

        CargarFactorImpuestoRentaVenta();

        $('#cbo_direccion').select2();

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

    //var fillcboOrigenEspecifico = function () {
    //    var tipotipoDcto;
    //    var select = $('#cboDctoOrigen').select2('destroy');
    //    // tipoDcto = $('#cboDocumentoVenta').val();
    //    // if (tipoDcto == "0001" || tipoDcto == "0003" || tipoDcto == "0012") {
    //    tipoDcto = "OV01"
    //    // }
    //    if (tipoDcto != "") {
    //        $.ajax({
    //            type: "post",
    //            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + tipoDcto + "&CTLG=" + $('#cbo_Empresa').val(),
    //            contenttype: "application/json;",
    //            datatype: "json",
    //            async: true,
    //            success: function (datos) {
    //                $(select).empty();
    //                $(select).append('<option></option>');
    //                $(select).append('<option value="">NINGUNO</option>');
    //                if (datos != null) {
    //                    for (var i = 0; i < datos.length; i++) {
    //                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
    //                    }
    //                }
    //            },
    //            error: function (msg) {
    //                alertCustom("Documentos de origen no se listaron correctamente.");
    //            }
    //        });
    //        $(select).select2();
    //    }

    //}

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
            async: false,
            success: function (datos) {
                $('#cbo_modo_pago').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO == "0001" || datos[i].CODIGO == "0002") {
                            $('#cbo_modo_pago').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cbo_modo_pago').append('<option value="0000">CONTRAENTREGA</option>');
                }
                $('#cbo_modo_pago').val(datos[0].CODIGO).change();
                $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
            },
            error: function (msg) {
                alertCustom("Modos de pago no se listaron correctamente.");
            }
        });
        $('#cbo_modo_pago').select2();
    }

    //DocumentosIdentidad
    var fillCboTipoDoc = function () {
        //Bloquear("divCboTipoDoc");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOID",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                //Desbloquear("divCboTipoDoc");
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
                //Desbloquear("divCboTipoDoc");
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

    //var calcularFechaVencimiento = function () {
    //    if ($("#txt_plazo_pago").val() > 0) {
    //        $.ajax({
    //            type: "post",
    //            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=FECHAX&p_PLAZO=" + $("#txt_plazo_pago").val() + "&p_FECHA_EMISION=" + $("#txt_fec_emision").val(),
    //            contenttype: "application/json;",
    //            datatype: "json",
    //            async: false,
    //            success: function (datos) {
    //                if (datos != null) {
    //                    $("#txt_fec_vencimiento").val(datos[0].FECHANUEVA);
    //                }
    //            },
    //            error: function (msg) {
    //                alert(msg);
    //            }
    //        });
    //    }
    //};

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

    var cargatablavacia = function () {

        oTable_detalle = iniciaTabla('tblCoutas', {
            data: null,
            columns: [
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_DIAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "MONTO",
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
            sort: false,
            preDrawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var columnaFechas = 2;
                var dFechaInicial = new Date($("#txt_fec_emision").datepicker("getDate"));
                // actualiza fecha
                api.column(columnaFechas, { page: 'current' }).data().filter(function (e, d) {
                    var valor = dFechaInicial.addDays(parseInt(api.data()[d].NRO_DIAS)).format("dd/MM/yyyy");
                    api.data()[d].FECHA = valor;
                    $($(rows).eq(d).children()[columnaFechas]).html(valor);
                });
            },
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                api.column(4, { page: 'current' }).data().filter(function (e, d) {
                    $($(rows).eq(d).children()[4]).html(formatoMiles(e));
                });
            },
            footerCallback: function (row, data, start, end, display) {
                var api = this.api();
                let spnStatus = $("#txtBalanceadoStatus");
                let fSumaTotalTabla = 0;
                if (data.length > 0) {
                    fSumaTotalTabla = api.column(4).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(nMontoSaldoDoc) === fSumaTotalTabla) {
                        spnStatus.text("BALANCEADO");
                        spnStatus.removeClass("noBalanceado").addClass("balanceado");
                    } else {
                        spnStatus.text("NO BALANCEADO");
                        spnStatus.removeClass("balanceado").addClass("noBalanceado");
                    }
                }

                let sCodMoneda = $("#cbo_moneda").val();
                let sSimboloMoneda = (sCodMoneda === "0002" ? "S/." : "$");

                $(api.column(4).footer()).html(sSimboloMoneda + " " + fSumaTotalTabla);
            }
        });

        $('#tblCoutas').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblCoutas_filter').css('display', 'none');
    };

    var cargatablavacia2 = function () {
        oTable_detalle_2 = iniciaTabla('tblLetras', {
            data: null,
            columns: [
                {
                    data: "CODIGO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "NUMERO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                },
                {
                    data: "FECHA_EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                }
            ],
            paging: false,
            responsive: true,
            order: [[0, 'desc']],
            ordering: false
        });

        $('#tblLetras').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblLetras_filter').css('display', 'none');

    };

    var cargatablavacia3 = function () {

        oTable_detalle_3 = iniciaTabla('tblLetrasVin', {
            data: null,
            columns: [
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_DIAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "MONTO",
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
            sort: false,
            preDrawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var columnaFechas = 2;
                var dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                // actualiza fecha
                api.column(columnaFechas, { page: 'current' }).data().filter(function (e, d) {
                    var valor = dFechaInicial.addDays(parseInt(api.data()[d].NRO_DIAS)).format("dd/MM/yyyy");
                    api.data()[d].FECHA = valor;
                    $($(rows).eq(d).children()[columnaFechas]).html(valor);
                });
            },
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                api.column(4, { page: 'current' }).data().filter(function (e, d) {
                    $($(rows).eq(d).children()[4]).html(formatoMiles(e));
                });
            },
            footerCallback: function (row, data, start, end, display) {
                var api = this.api();
                let spnStatus = $("#txtBalanceadoLetras");
                let fSumaTotalTabla = 0;
                if (data.length > 0) {
                    fSumaTotalTabla = api.column(4).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(nMontoSaldoDoc) === fSumaTotalTabla) {
                        spnStatus.text("BALANCEADO");
                        spnStatus.removeClass("noBalanceado").addClass("balanceado");
                    } else {
                        spnStatus.text("NO BALANCEADO");
                        spnStatus.removeClass("balanceado").addClass("noBalanceado");
                    }
                }

                let sCodMoneda = $("#cbo_moneda").val();
                let sSimboloMoneda = (sCodMoneda === "0002" ? "S/." : "$");

                $(api.column(4).footer()).html(sSimboloMoneda + " " + fSumaTotalTabla.toFixed(2));
            }

        });

        $('#tblLetrasVin').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblLetrasVin_filter').css('display', 'none');
    };


    var eventoControles = function () {
        var fechaEmisionAnterior = "";
        var empresaAnterior = "";
        var dctoOrigenAnterior = "x";

        $('#btnagregarAnticipoDetalle').click(function (e) {
            ListarAnticipos();
            $('#divAnticipos').modal('show');
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
                //filltxtdescproducto('');
                if (ObtenerQueryString("codigo") != undefined) {
                    if ($("#hfCompletoInd").val() == "S") {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "", false);
                    } else {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", false);
                    }
                } else {
                    if (cargaDctoOrigenInd) {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", false);
                    } else {
                        fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
                    }
                }

                cargarCorrelativo();
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
        });

        $('#btn_act_direccion').on('click', function () {
            if (vErrors(["txtClientes"])) {
                fillCboDirecciones($("#hfPIDM").val());
                $("#cbo_direccion").attr("disabled", false);
            }
        });

        $("#btnBuscadocs").on('click', function () {
            if (vErrors(["cboDctoOrigen", "txtClientes"])) {
                if ($("#hfPIDM").val() != '') {
                    buscarDocumento($(this));
                }
                else {
                    alertCustom("Seleccione un cliente válido.");
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

        $('#cboSerieDocVenta').on('change', function () {

            $("#lblTipoCorrelativo").html("");
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

        $("#chkResponsablePago").on('change', function () {
            if ($("#hfPIDM").val() == "") {
                vErrorsNotMessage(['txtClientes'])
                alertCustom("Seleccione un cliente válido para continuar.")
                $("#txtClientes").focus();
                if ($(this).is(":checked")) {
                    $(this).prop("checked", false).parent().removeClass("checked");
                }
                return;
            }

            if ($(this).is(":checked")) {
                //fillTxtResponsablePago();
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
            if ($('#cbo_modo_pago').val() == "0001" || $('#cbo_modo_pago').val() == "0000") {
                $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                $("#rbLibres").removeAttr('checked');
                $('#rbLibres').prop('checked', true).parent().removeClass('checked');
                $("#rbLibres").attr("disabled", "disabled");
                $('#rbVinculadas').prop('checked', true).parent().removeClass('checked');
                $("#rbVinculadas").attr("disabled", "disabled");
                $("#AL").attr("disabled", "disabled");
                $("#A5").attr("disabled", "disabled");
                $('#A5').removeClass();
                $('#A5').addClass("btn gray");
                $('#AL').removeClass();
                $('#AL').addClass("btn gray");
                $("#txt_plazo_pago").val('0');
                if (($("#txtClientes").val() !== "" || $("#txtClientes").val().length !== 0) && ($("#hfPIDM").val() !== "" || $("#hfPIDM").val().length !== 0)) {
                    if (deuda != 0 && deuda != undefined) {
                        CargaDeudaCliente($("#hfPIDM").val());
                    }
                } else {
                    $("#divAlCredito").hide();
                }
            } else {
                $("#rbLibres").removeAttr("disabled");
                $("#rbVinculadas").removeAttr("disabled");
                CargarDatosLineaCredito();
                calcularFechaVencimiento();
                //CargarDatosMonetariosLineaCredito();
                $("#divAlCredito").show();
            }
        });

        $("#rbLibres").click(function () {
            $('#A5').removeClass();
            $('#A5').addClass("btn gray");
            $('#AL').removeClass();
            $('#AL').addClass("btn libre");
            $("#AL").removeAttr("disabled");
            $("#A5").attr("disabled", "disabled");
        });

        $("#rbVinculadas").click(function () {
            $('#AL').removeClass();
            $('#AL').addClass("btn gray");
            $('#A5').removeClass();
            $('#A5').addClass("btn blue");
            $("#A5").removeAttr("disabled");
            $("#AL").attr("disabled", "disabled");
        });

        $("#btnEFac").click(function () {
            GenerarDocFacturacion();
        });

        $("#txt_fec_emision").on("change", function () {
            if ($('#cboDocumentoVenta').val() == '0001' || $('#cboDocumentoVenta').val() == '0003') {
                if ($("#txt_fec_emision").val() != $("#txt_fec_transaccion").val()) { //DPORTA 31/01/2023
                    validarFechaEmision($("#txt_fec_emision").val(), $("#txt_fec_transaccion").val());
                }
            } else {
                if ($("#txt_fec_emision").val() != fechaEmisionAnterior) {
                    CargarFactorImpuestoRentaVenta();
                    if ($("#cbo_modo_pago").val() == "0001" || $("#cbo_modo_pago").val() == "0000") {
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

        $("#chkDespachoVenta").on("change", function () {
            CamposProductosSeriados();
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

        $("#cboDctoOrigen").on("change", function () {
            if ($(this).val() != dctoOrigenAnterior) {
                //dctoOrigenAnterior = $(this).val();
                EliminarDatosDocumentoOrigen("", "all");
                if ($("#txt_cod_doc_orig").val() != "") {
                    infoCustom2("Se eliminaron todos los detalles asociados al documento de origen anteriormente seleccionado")
                    $("#txt_cod_doc_orig").val("");
                    $("#txt_num_ser_orig").val("");
                    $("#txt_num_doc_orig").val("");
                }
            } else {
                dctoOrigenAnterior = "x";
            }
            if ($(this).val() == "0009" || $(this).val() == "0050") {
                $("#chkDespachoVenta").removeAttr("checked").parent().removeClass("checked");
            }
        });

        $("#tabDetalleComp").on("click", function () {
            CalcularDatosMonetarios();
        });

        $("#btn_add_dcto2").click(function () {
            $("#documentosadd").append("<div class='span12 doc_resgistro_extra' style='margin-left: 0px'>" +
                "<div class='span6'></div>" +
                "<div class='span1'>" +
                "<div class='control-group'>" +
                "<label class='span12 control-label'>Nro</label>" +
                "</div>" +
                "</div>" +
                "<div class='span3'>" +
                "<div class='control-group'>" +
                "<div class='controls'>" +
                "<input class='txt_cod_doc_orig' type='hidden' />" +
                "<input class='numeros txt_num_ser_orig span4' type='text' disabled style='text-align: center'/>" +
                "<input class='numeros txt_num_doc_orig span8' type='text' style='margin-left: 4px; text-align: center' disabled/>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='span2'>" +
                "<div class='control-group'>" +
                "<div class='controls'>" +
                "<a onclick='buscarDocumento(this)' class='btn blue buscar'><i class='icon-search' style='line-height: initial;'></i></a>" +
                "&nbsp;<a class='btn red remove' onclick=$(this).parent().parent().parent().parent().remove()><i class='icon-minus' style='line-height: initial;'></i></a>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>");
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
        //btnLetras vinculadas
        $('#A5').click(function () {
            let sCodVenta = $("#txtNumDctoComp").val();
            sCodVenta = $.trim(sCodVenta);
            if (sCodVenta === "") {
                infoCustom("Imposible continuar. ¡El documento no está completado!");
                return;
            }

            if (!vErrors(['txtNumDctoComp', 'cboSerieDocVenta', 'txtNroDocVenta'])) {
                return;
            }

            //let sCodVenta = $("#txtNumDctoComp").val();
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

            let aoDocSaldoVta = fnGetSaldoDocVta(sCodVenta);
            if (aoDocSaldoVta.length === 0) {
                infoCustom("No se pudo obtener el saldo del Documento: " + sCodVenta);
                return;
            }

            nMontoSaldoDoc = aoDocSaldoVta[0].SALDO;

            $('#montoLetra').html('S/. ' + nMontoSaldoDoc);
            $('#divLetraVin').modal('show');
            $('#txtPeriodoLetra').attr('disabled', true);
            setTimeout(function () {
                oTable_detalle_3.fnAdjustColumnSizing();
            }, 500);

            fnCargarCanjeLetra();
            //$('#divLetras').modal('show'); 
        });

        $('#AL').click(function () {

            let sCodVenta = $("#txtNumDctoComp").val();
            sCodVenta = $.trim(sCodVenta);
            if (sCodVenta === "") {
                infoCustom("Imposible continuar. ¡El documento no está completado!");
                return;
            }

            if (!vErrors(['txtNumDctoComp', 'cboSerieDocVenta', 'txtNroDocVenta'])) {
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

            let aoDocSaldoVta = fnGetSaldoDocVta(sCodVenta);
            if (aoDocSaldoVta.length === 0) {
                infoCustom("No se pudo obtener el saldo del Documento: " + sCodVenta);
                return;
            }

            let sCodCanje = fnGetCodCanjeXDocVta(sCodVenta);
            let aoCanje = fnGetCanje(sCodCanje);
            if (aoCanje.length !== 0) {
                infoCustom("Imposible continuar. ¡El documento tiene letras canjeadas!");
                return;
            }

            nMontoSaldoDoc = aoDocSaldoVta[0].SALDO;

            $('#monto').html('S/. ' + nMontoSaldoDoc);
            $('#divCouta').modal('show');
            $('#txtPeriodoCouta').attr('disabled', true);
            setTimeout(function () {
                oTable_detalle.fnAdjustColumnSizing();
            }, 400);

            fnCargarCuotaLibre();
        });

        $("#chkCuotasLibres").on("click", function () {
            if ($(this).is(":checked")) {
                $("#txtPeriodoCouta").attr("disabled", false);
            } else {
                $("#txtPeriodoCouta").val("");
                $("#txtPeriodoCouta").attr("disabled", true);
            }
        });

        $("#chkLetrasFijas").on("click", function () {
            if ($(this).is(":checked")) {
                $("#txtPeriodoLetra").attr("disabled", false);
            } else {
                $("#txtPeriodoLetra").val("");
                $("#txtPeriodoLetra").attr("disabled", true);
            }
        });

        $("#btnSimular").click(function () {

            let sCodMoneda = $("#cbo_moneda").val();
            let sMoneda = (sCodMoneda === "0002" ? "SOL" : "DOL");
            let sSimboloMoneda = (sCodMoneda === "0002" ? "S/." : "$");

            if (!vErrorBodyNotIcon(["txt_fec_emision", "txtNroCoutas"])) {
                let dFechaInicial = new Date($("#txt_fec_emision").datepicker("getDate"));
                let nroCuotas = parseInt($("#txtNroCoutas").val());
                let bCuotasLibres = $("#chkCuotasLibres").is(":checked");
                nPlazoDiasLinea = $("#txt_plazo_pago").val();
                //monto = parseFloat($('#lblImporteCobrar').text()).toFixed(2);
                nMontoSaldoDoc = parseFloat(nMontoSaldoDoc);
                var dFechaMaxima = dFechaInicial.addDays(nPlazoDiasLinea);
                var objArrayLetrasGen = new Array();
                if (bCuotasLibres) {
                    if (!vErrorBodyNotIcon(["txtPeriodoCouta"])) {
                        let nPeriodoCuotas = parseInt($("#txtPeriodoCouta").val());
                        if ((nPeriodoCuotas * nroCuotas) <= nPlazoDiasLinea) {
                            let nMontoCuota = (nMontoSaldoDoc / nroCuotas).toFixed(2);
                            nMontoCuota = parseFloat(nMontoCuota);
                            let nSumaMontoCuota = 0;
                            for (var i = 0; i < nroCuotas; i++) {
                                let objJsonCuotaLib = {};
                                objJsonCuotaLib.NRO_DOC_DETALLE = "Cuota " + (i + 1) + ":";
                                objJsonCuotaLib.NRO_DIAS = nPeriodoCuotas * (i + 1);
                                objJsonCuotaLib.FECHA = dFechaInicial.addDays(nPeriodoCuotas * (i + 1)).format("dd/MM/yyyy");
                                objJsonCuotaLib.MONEDA = sMoneda;

                                if (i === nroCuotas - 1) {
                                    objJsonCuotaLib.MONTO = nMontoSaldoDoc - nSumaMontoCuota;
                                } else {
                                    objJsonCuotaLib.MONTO = nMontoCuota;
                                    nSumaMontoCuota = nSumaMontoCuota + nMontoCuota;
                                }

                                objJsonCuotaLib.NRO_CUOTA_CAB = nroCuotas;
                                objJsonCuotaLib.CUOTA_FIJA_CAB = bCuotasLibres;
                                objJsonCuotaLib.PERIODO_CUOTA_CAB = nPeriodoCuotas;

                                objArrayLetrasGen.push(objJsonCuotaLib);
                            }
                        } else {
                            infoCustom("Número de letras con periodo ha superado al plazo de la línea de crédito.");
                        }
                    } else {
                        infoCustom("Ingrese los campos requeridos!");
                    }
                } else {
                    for (var i = 0; i < nroCuotas; i++) {
                        let objJsonCuotaLib = {};
                        objJsonCuotaLib.NRO_DOC_DETALLE = "Cuotas " + (i + 1) + ":";
                        objJsonCuotaLib.NRO_DIAS = 0;
                        objJsonCuotaLib.FECHA = "";
                        objJsonCuotaLib.MONEDA = sMoneda;
                        objJsonCuotaLib.MONTO = 0;

                        objJsonCuotaLib.NRO_CUOTA_CAB = nroCuotas;
                        objJsonCuotaLib.CUOTA_FIJA_CAB = bCuotasLibres;
                        objJsonCuotaLib.PERIODO_CUOTA_CAB = 0;

                        objArrayLetrasGen.push(objJsonCuotaLib);
                    }
                }

                oTable_detalle.fnClearTable();
                if (objArrayLetrasGen.length > 0) {
                    oTable_detalle.fnAddData(objArrayLetrasGen);
                    if (!bCuotasLibres) {
                        editaTabla();
                    }
                }

            } else {
                infoCustom("Ingrese los campos requeridos!");
            }
        });

        $("#btnSimular2").click(function () {

            let sCodMoneda = $("#cbo_moneda").val();
            let sMoneda = (sCodMoneda === "0002" ? "SOL" : "DOL");
            let sSimboloMoneda = (sCodMoneda === "0002" ? "S/." : "$");

            if (!vErrorBodyNotIcon(["txtFechaGiro", "txtFechaRegistro", "txtLugarGiro", "txtNroLetras"])) {
                let dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                let nroLetras = parseInt($("#txtNroLetras").val());
                let bLetrasFijas = $("#chkLetrasFijas").is(":checked");
                nPlazoDiasLinea = $("#txt_plazo_pago").val();
                //monto = parseFloat($('#lblImporteCobrar').text()).toFixed(2);
                nMontoSaldoDoc = parseFloat(nMontoSaldoDoc);
                var dFechaMaxima = dFechaInicial.addDays(nPlazoDiasLinea);
                var objArrayLetrasGen = new Array();
                if (bLetrasFijas) {
                    if (!vErrorBodyNotIcon(["txtPeriodoLetra"])) {
                        let nPeriodoLetras = parseInt($("#txtPeriodoLetra").val());
                        if ((nPeriodoLetras * nroLetras) <= nPlazoDiasLinea) {
                            let nMontoLetra = (nMontoSaldoDoc / nroLetras).toFixed(2);
                            nMontoLetra = parseFloat(nMontoLetra);
                            let nSumaMontoLetra = 0;
                            for (var i = 0; i < nroLetras; i++) {
                                let objJsonCuotaLib = {};
                                objJsonCuotaLib.NRO_DOC_DETALLE = "Letra " + (i + 1) + ":";
                                objJsonCuotaLib.NRO_DIAS = nPeriodoLetras * (i + 1);
                                objJsonCuotaLib.FECHA = dFechaInicial.addDays(nPeriodoLetras * (i + 1)).format("dd/MM/yyyy");
                                objJsonCuotaLib.MONEDA = sMoneda;

                                if (i === nroLetras - 1) {
                                    objJsonCuotaLib.MONTO = nMontoSaldoDoc - nSumaMontoLetra;
                                } else {
                                    objJsonCuotaLib.MONTO = nMontoLetra;
                                    nSumaMontoLetra = nSumaMontoLetra + nMontoLetra;
                                }

                                objArrayLetrasGen.push(objJsonCuotaLib);
                            }
                        } else {
                            infoCustom("Número de letras con periodo ha superado al plazo de la línea de crédito.");
                        }
                    } else {
                        infoCustom("Ingrese los campos requeridos!");
                    }

                } else {

                    for (var i = 0; i < nroLetras; i++) {
                        let objJsonCuotaLib = {};
                        objJsonCuotaLib.NRO_DOC_DETALLE = "Letra " + (i + 1) + ":";
                        objJsonCuotaLib.NRO_DIAS = 0;
                        objJsonCuotaLib.FECHA = "";
                        objJsonCuotaLib.MONEDA = sMoneda;
                        objJsonCuotaLib.MONTO = 0;
                        objArrayLetrasGen.push(objJsonCuotaLib);
                    }
                }

                oTable_detalle_3.fnClearTable();
                if (objArrayLetrasGen.length > 0) {
                    oTable_detalle_3.fnAddData(objArrayLetrasGen);
                    if (!bLetrasFijas) {
                        editaTabla2();
                    }
                }

            } else {
                infoCustom("Ingrese los campos requeridos!");
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

                //Listar productos seriados para el producto elegido
                var prodCode = $("#hfCOD_PROD").val();
                $.ajax({
                    type: "post",
                    url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD20&CTLG=" + $('#cbo_Empresa').val() + "&ALMC_CODE=" + $('#cboAlmacen').val() + "&SERIADO_IND=S" + "&PROD_CODE=" + prodCode,
                    //url: "vistas/na/ajax/NAMINSA.ashx?OPCION=LPSER&CODE_PROD=" + prodCode + "&CTLG_CODE=" + $('#cbo_Empresa').val() + "&COD_ALMC=" + $('#cboAlmacen').val(),
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

        $("#btnActualizarProductos").on("click", function () {
            if (vErrors(['cbo_Sucursal', 'cbo_Empresa'])) {
                LimpiarCamposDetalle();
                filltxtdescproducto('');
            }
        });

        $("#btnRecargarPersona").on("click", function () {
            $("#hfPIDM").val("");
            fillTxtCliente2("#txtClientes", "");
            fillTxtResponsablePago();
            //DPORTA (PERMITE MODIFICAR CLIENTE LUEGO DE HABER GRABADO UNA VENTA)
            $("#cboTipoDoc,#txtNroDctoCliente,#cbo_direccion").removeAttr("disabled");
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
            $('#txtAsunto').val($('#txt_comentario').val());
            $('#txtcontenido').val("");
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

        //$("#chkBonificacion").on("change", function () {
        //    if ($("#chkBonificacion").is(":checked")) {
        //        $("#txtPrecioUnitario").attr("disabled", true)
        //    } else {

        //        $("#txtPrecioUnitario").attr("disabled", false)

        //    }
        //});

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
            //let precio = parseFloat($('#txtPrecioUnitInicio').val() == '' || $('#txtPrecioUnitInicio').val() == 0 ? $("#txtPrecioUnitario").val() : $('#txtPrecioUnitInicio').val()); DPORTA 20/04/2022 prueba para convertir por equivalencia
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

        $("#divCouta_btnaceptar").on("click", function () {
            let iNroReg = oTable_detalle.fnGetData().length;
            if (iNroReg === 0) {
                infoCustom("No existen cuotas libres para registrar.");
                return;
            }

            let aoDet = oTable_detalle.fnGetData();
            let iNroRef = aoDet.length;
            let iNroDiasAnt = 0;
            let iNroDiasAct = 0;
            let nMontoTabla = 0;
            for (let i = 0; i < iNroReg; i++) {
                iNroDiasAct = parseInt(aoDet[i].NRO_DIAS);
                if (iNroDiasAct < iNroDiasAnt) {
                    infoCustom("El número de días de un item no puede ser menor a un item anterior.");
                    return;
                }
                iNroDiasAnt = parseInt(aoDet[i].NRO_DIAS);
                nMontoTabla = nMontoTabla + parseFloat(aoDet[i].MONTO);
            }

            let nMontoDoc = parseFloat(nMontoSaldoDoc);
            if (nMontoTabla !== nMontoDoc) {
                infoCustom("La sumatoria de los montos de las cuotas difieren del total del documento");
                return;
            }

            let sCodigo = $("#txtCodCuotaLibre").val();
            let sOpcion = (sCodigo === "" ? "CCLVC" : "ACLVC");
            let sCodRef = $("#txtNumDctoComp").val();;
            let iNroCuotas = aoDet[0].NRO_CUOTA_CAB;
            let sCuotaFija = (aoDet[0].CUOTA_FIJA_CAB === true ? "S" : "N");
            let iPeriodoCuota = aoDet[0].PERIODO_CUOTA_CAB;
            let sJSONDetalle = JSON.stringify(aoDet);

            let data = new FormData();
            data.append("sOpcion", sOpcion);
            data.append("sCodigo", sCodigo);
            data.append("sCodRef", sCodRef);
            data.append("iNroCuotas", iNroCuotas);
            data.append("sCuotaFija", sCuotaFija);
            data.append("iPeriodoCuota", iPeriodoCuota);
            data.append("sJSONDetalle", sJSONDetalle);

            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/CC/ajax/CCMCULV.ASHX",
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
                        infoCustom(response);
                        return;
                    }
                    if (response.indexOf("[Error]:") > -1) {
                        sException = response;
                        alertCustom("Error al intentar Guardar.");
                        return;
                    }
                    $("#txtCodCuotaLibre").val(response);
                    $("#btnSimular").hide();
                    $("#divCouta_btnaceptar").hide();
                    $("#divCouta_Salir").show();
                    exito();
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexitoCustom("No se pudo guardar los cambios.");
                }
            });
        });

        $("#divLetra_btnaceptar").on("click", function () {
            let iNroReg = oTable_detalle_3.fnGetData().length;
            if (iNroReg === 0) {
                infoCustom("No existen letras para registrar.");
                return;
            }

            let aoDetLetras = oTable_detalle_3.fnGetData();
            let iNroRef = aoDetLetras.length;
            let iNroDiasAnt = 0;
            let iNroDiasAct = 0;
            let nMontoTabla = 0;
            for (let i = 0; i < iNroReg; i++) {
                iNroDiasAct = parseInt(aoDetLetras[i].NRO_DIAS);
                if (iNroDiasAct < iNroDiasAnt) {
                    infoCustom("El número de días de un item no puede ser menor a un item anterior.");
                    return;
                }
                iNroDiasAnt = parseInt(aoDetLetras[i].NRO_DIAS);
                nMontoTabla = nMontoTabla + parseFloat(aoDetLetras[i].MONTO);
            }

            let nMontoDoc = parseFloat(nMontoSaldoDoc);
            if (nMontoTabla !== nMontoDoc) {
                infoCustom("La sumatoria de los montos de las letras difieren del total del documento");
                return;
            }

            let p_tipo = "C";
            let sCodUsuario = $("#ctl00_lblusuario").html();

            let aoLetra = [];
            let sCodEmpresa = $("#ctl00_hddctlg").val();
            let sLugar = $("#txtLugarGiro").val();
            let sFechaGiro = $("#txtFechaGiro").val();
            let PidmGirador = $("#cbo_Empresa :selected").attr("data-pidm");
            let PidmGiradorA = $("#hfPIDM").val();
            let nMontoCanje = nMontoTabla;
            let sCodMoneda = $("#cbo_moneda").val();
            let sCodSucursal = $("#cbo_Sucursal").val();
            let p_montoCambio = $("#txt_valor_cambio").val();
            let p_fechaCanje = $("#txtFechaRegistro").val();

            let p_NRO = "AUTO";

            let sGlosa = $("#cboDocumentoVenta :selected").html() + " | " + $("#cboSerieDocVenta :selected").html() + " - " + $("#txtNroDocVenta").val();
            for (let i = 0; i < iNroReg; i++) {
                let oLetra = {};

                oLetra.FECHA = aoDetLetras[i].FECHA;
                oLetra.MONTO = aoDetLetras[i].MONTO;

                aoLetra.push(oLetra);
            }

            let aoDetDocVta = [];
            let oDetDocVta = {};
            oDetDocVta.sCodVenta = $("#txtNumDctoComp").val();
            oDetDocVta.sMontoVenta = nMontoDoc;
            aoDetDocVta.push(oDetDocVta);

            let sJsonDetLetras = JSON.stringify(aoLetra);
            let sJsonDetDoc = JSON.stringify(aoDetDocVta);

            let data = new FormData();
            data.append("flag", "1");
            data.append("p_tipo", p_tipo);
            data.append("p_usuario", sCodUsuario);
            data.append("p_empresa", sCodEmpresa);
            data.append("p_giradoA", PidmGiradorA);
            data.append("monto", nMontoCanje);
            data.append("moneda", sCodMoneda);
            data.append("sucursal", sCodSucursal);
            data.append("p_montoCambio", p_montoCambio);
            data.append("p_fechaCanje", p_fechaCanje);

            data.append("p_NRO", p_NRO);
            data.append("p_lugar", sLugar);
            data.append("p_fechaGiro", sFechaGiro);
            data.append("p_girador", PidmGirador);
            data.append("sJsonDetLetras", sJsonDetLetras);
            data.append("sJsonDetDoc", sJsonDetDoc);

            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/GL/ajax/GLMCANJ.ASHX",
                contentType: false,
                data: data,
                processData: false,
                async: false,
                success: function (response) {
                    Desbloquear("ventana");
                    if (response == "") {
                        return;
                    }
                    if (response.indexOf("[Advertencia]:") > -1) {
                        infoCustom(response);
                        return;
                    }
                    if (response.indexOf("[Error]:") > -1) {
                        sException = response;
                        alertCustom("Error al intentar Guardar.");
                        return;
                    }

                    $(".cab_letra").hide();
                    $("#btnSimular2").hide();
                    $("#divLetra_btnaceptar").hide();
                    $("#divLetra_Salir").show();

                    fnCargarCanjeLetra();

                    exito();
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexitoCustom("No se pudo guardar los cambios.");
                }
            });
        });



    };

    fnGetDocVta = function (sCodVenta) {
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

    var fnCargarCanjeLetra = function () {
        if (!vErrors(['txtNumDctoComp'])) {
            return;
        }

        $(".cab_letra").show();
        $("#btnSimular2").show();
        $("#divLetra_btnaceptar").show();
        $("#divLetra_Salir").hide();

        let sCodVenta = $("#txtNumDctoComp").val();
        let sCodCanje = fnGetCodCanjeXDocVta(sCodVenta);

        let aoCanje = fnGetCanje(sCodCanje);
        if (aoCanje.length === 0) {
            return;
        }

        //$("#txtFechaGiro").val(aoCanje[0].fechaCanje);
        //$("#txtFechaRegistro").val(aoCanje[0].fechaCanje);

        $(".cab_letra").hide();
        $("#btnSimular2").hide();
        $("#divLetra_btnaceptar").hide();
        $("#divLetra_Salir").show();

        fnLimpiarDatosLetras();

        let aoLetrasxCanje = fnListarLetrasxCanje(sCodCanje);
        if (aoLetrasxCanje.length === 0) {
            return;
        }

        let sCodMoneda = $("#cbo_moneda").val();
        let sMoneda = (sCodMoneda === "0002" ? "SOL" : "DOL");

        let objArrayLetrasGen = new Array();
        let iNroReg = aoLetrasxCanje.length;
        for (var i = 0; i < iNroReg; i++) {
            let objJsonCuotaLib = {};
            objJsonCuotaLib.NRO_DOC_DETALLE = aoLetrasxCanje[i].NRO_DOC_DETALLE;
            objJsonCuotaLib.NRO_DIAS = aoLetrasxCanje[i].NRO_DIAS;
            objJsonCuotaLib.FECHA = aoLetrasxCanje[i].FECHA;
            objJsonCuotaLib.MONEDA = sMoneda;
            objJsonCuotaLib.MONTO = aoLetrasxCanje[i].MONTO;

            objArrayLetrasGen.push(objJsonCuotaLib);
        }

        oTable_detalle_3.fnClearTable();
        if (objArrayLetrasGen.length > 0) {
            oTable_detalle_3.fnAddData(objArrayLetrasGen);
            editaTabla();
        }
    };

    var fnLimpiarDatosLetras = function () {
        $("#txtFechaGiro").val("");
        $("#txtFechaRegistro").val("");
        $("#txtLugarGiro").val("");

        $("#uniform-chkCuotasLibres span").removeClass();
        $("#chkCuotasLibres").attr("checked", false).change();

        $("#txtNroLetras").val("");
        $("#txtPeriodoLetra").val("");
    };

    var fnGetCodCanjeXDocVta = function (sCodVenta) {
        let sCodCanje = "";

        let p_flag = "GET_COD_CANJE_X_VTA";
        let data = new FormData();
        data.append("flag", p_flag);
        data.append("sCodVenta", sCodVenta);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMCANJ.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    infoCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    infoCustom("Error al intentar Guardar.");
                    return;
                }
                sCodCanje = response;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });

        return sCodCanje;
    };

    var fnListarDocsxCanje = function (sCodCanje) {
        let aoDocsxCanje = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMCANJ.ashx?flag=10&sCodCanje=" + sCodCanje,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocsxCanje = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        Desbloquear("ventana");

        return aoDocsxCanje;
    };

    var fnListarLetrasxCanje = function (sCodCanje) {
        let aoLetrasxCanje = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMCANJ.ashx?flag=9&sCodCanje=" + sCodCanje,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoLetrasxCanje = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        Desbloquear("ventana");

        return aoLetrasxCanje;
    };

    var fnGetCanje = function (sCodCanje) {
        let aoCanje = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMCANJ.ashx?flag=GET_COD_CANJE&sCodCanje=" + sCodCanje,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoCanje = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        Desbloquear("ventana");

        return aoCanje;
    };

    var fnCargarCuotaLibre = function () {
        if (!vErrors(['txtNumDctoComp'])) {
            return;
        }

        $("#btnSimular").show();
        $("#divCouta_btnaceptar").show();
        $("#divCouta_Salir").hide();

        let sCodigo = "";
        let sCodRef = $("#txtNumDctoComp").val();
        let sEstado = "A";

        let aoCuotaLibreCab = fnGetCuotaLibreCab(sCodigo, sCodRef, sEstado);
        if (aoCuotaLibreCab.length === 0) {
            return;
        }

        $("#btnSimular").hide();
        $("#divCouta_btnaceptar").hide();
        $("#divCouta_Salir").show();

        let sCodCuotaLibre = aoCuotaLibreCab[0].Codigo;
        let sNroCoutas = aoCuotaLibreCab[0].NroCuotas;
        let sCuotaFija = aoCuotaLibreCab[0].CuotaFija;
        let sPeriodoCuota = aoCuotaLibreCab[0].PeriodoCuota;

        $("#txtCodCuotaLibre").val(sCodCuotaLibre);
        $("#txtNroCoutas").val(sNroCoutas);
        if (sCuotaFija === "S") {
            $("#uniform-chkCuotasLibres span").removeClass().addClass("checked");
            $("#chkCuotasLibres").attr("checked", true);
        }
        else {
            $("#uniform-chkCuotasLibres span").removeClass();
            $("#chkCuotasLibres").attr("checked", false);
        }
        $("#txtPeriodoCouta").val(sPeriodoCuota);

        let aoCuotaLibreDet = fnGetCuotaLibreDet(sCodCuotaLibre);
        if (aoCuotaLibreDet.length === 0) {
            return;
        }

        let sCodMoneda = $("#cbo_moneda").val();
        let sMoneda = (sCodMoneda === "0002" ? "SOL" : "DOL");

        let objArrayLetrasGen = new Array();
        let sNroCuotasCab = aoCuotaLibreCab[0].NroCuotas;
        let bCuotasLibres = (aoCuotaLibreCab[0].CuotaFija === "S" ? true : false);
        let PeriodoCuotaCab = aoCuotaLibreCab[0].NroCuotas;
        let iNroReg = aoCuotaLibreDet.length;
        for (var i = 0; i < iNroReg; i++) {
            let objJsonCuotaLib = {};
            objJsonCuotaLib.NRO_DOC_DETALLE = "Cuota " + (aoCuotaLibreDet[i].Item) + ":";
            objJsonCuotaLib.NRO_DIAS = aoCuotaLibreDet[i].NroDias;
            objJsonCuotaLib.FECHA = aoCuotaLibreDet[i].FechaVcmto;
            objJsonCuotaLib.MONEDA = sMoneda;
            objJsonCuotaLib.MONTO = aoCuotaLibreDet[i].Monto;

            objJsonCuotaLib.NRO_CUOTA_CAB = sNroCuotasCab;
            objJsonCuotaLib.CUOTA_FIJA_CAB = bCuotasLibres;
            objJsonCuotaLib.PERIODO_CUOTA_CAB = PeriodoCuotaCab;

            objArrayLetrasGen.push(objJsonCuotaLib);
        }

        oTable_detalle.fnClearTable();
        if (objArrayLetrasGen.length > 0) {
            oTable_detalle.fnAddData(objArrayLetrasGen);
            if (!bCuotasLibres) {
                editaTabla();
            }
        }
    };

    var fnGetCuotaLibreCab = function (sCodigo, sCodRef, sEstado) {
        sCodigo = (sCodigo === undefined ? "" : sCodigo);
        sCodRef = (sCodRef === undefined ? "" : sCodRef);
        sEstado = (sEstado === undefined ? "" : sEstado);
        let aoCuotaLibreCab = [];
        $.ajax({
            type: "post",
            url: "vistas/CC/ajax/CCMCULV.ashx?sOpcion=LCLVC&sCodigo=" + sCodigo + "&sCodRef=" + sCodRef + "&sEstado=" + sEstado,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                aoCuotaLibreCab = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los Datos.");
            }
        });
        return aoCuotaLibreCab;
    };

    var fnGetCuotaLibreDet = function (sCodigo) {
        sCodigo = (sCodigo === undefined ? "" : sCodigo);
        let aoCuotaLibreDet = [];
        $.ajax({
            type: "post",
            url: "vistas/CC/ajax/CCMCULV.ashx?sOpcion=LCLVD&sCodigo=" + sCodigo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                aoCuotaLibreDet = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los Datos.");
            }
        });
        return aoCuotaLibreDet;
    };

    var GenerarDocFacturacion = function () {
        Bloquear('ventana');
        let sCodEmpresa = $("#ctl00_hddctlg").val();
        let sCodVenta = $("#txtNumDctoComp").val();
        let sCodTipoDoc = $("#cboDocumentoVenta").val();
        if (sCodTipoDoc !== '0001' && sCodTipoDoc !== '0003') {
            alertCustom('No se puede realizar la operación por el tipo de documento.');
            Desbloquear('ventana');
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

    var editaTabla = function () {

        oTable_detalle.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [null,
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                },
                null,
                null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0]).hasClass("monto")) {
                    let fSumaTotalTabla = oTable_detalle.api(true).column(4).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 0) {
                        return false;
                    }
                    if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > nMontoSaldoDoc) {
                        infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }
                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseFloat(input[0].value) < 0) {
                        infoCustom("La cantidad de días no puedes ser menor a cero.");
                        return false;
                    }
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }
            }
        });
    };

    var editaTabla2 = function () {

        oTable_detalle_3.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [null,
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                },
                null,
                null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0]).hasClass("monto")) {
                    let fSumaTotalTabla = oTable_detalle_3.api(true).column(4).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 0) {
                        return false;
                    }
                    if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > nMontoSaldoDoc) {
                        infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }
                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseFloat(input[0].value) < 0) {
                        infoCustom("La cantidad de días no puedes ser menor a cero.");
                        return false;
                    }
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }

            }
        });
    };

    var cargaInicial = function () {

        var cod = ObtenerQueryString("codigo");
        $("#rbLibres").attr("disabled", "disabled");
        $("#rbVinculadas").attr("disabled", "disabled");
        $("#AL").attr("disabled", "disabled");
        $("#A5").attr("disabled", "disabled");
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
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVU_CAB&p_FVBVTAC_CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    //console.log(datos);
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
                    //DPORTA
                    $("#cboAlmacen").val($("#cbo_Sucursal option:selected").attr("data-almc"));
                    $("#cboAlmacen").change();
                    //F3 - Carga datos de cliente
                    carga_ini_ind = true;
                    $("#txtClientes").attr("disabled", "disabled");
                    $("#txtNroDctoCliente").attr("disabled", "disabled");
                    $("#cboTipoDoc").attr("disabled", "disabled");

                    $("#cboTipoDoc").select2("val", datos[0].CLIE_DOID).change();
                    docu = datos[0].CLIE_DOID;
                    $("#txtClientes").val(datos[0].RAZON_SOCIAL);
                    $("#txtClientes").keyup().siblings("ul").children("li").click();


                    // COMBO DIRECCION 
                    $("#cbo_direccion").empty()
                    $("#cbo_direccion").html("<option value='1'  latitud='" + datos[0].LATITUD_VENTA + "' longitud='" + datos[0].LONGITUD_VENTA + "'>" + datos[0].DIRECCION_VENTA + "</option>")
                    $("#cbo_direccion").select2('val', '1').change()
                    $("#cbo_direccion").attr("disabled", true)


                    //F4 - Documento venta
                    //$("#cboDocumentoVenta").select2("val", datos[0].DCTO_CODE).change();
                    //F5                     
                    //$("#txt_fec_emision").val(datos[0].EMISION);
                    if ($("#hfCompletoInd").val() == "S") {
                        $("#txt_fec_emision").val(datos[0].FECHA_EMISION);
                        $("#txt_fec_transaccion").val(datos[0].TRANSACCION);
                        $("#txt_fec_vencimiento").val(datos[0].VENCIMIENTO);
                    } else {
                        $('#txt_fec_emision').datepicker('setDate', 'now');
                        $('#txt_fec_transaccion').datepicker('setDate', 'now');
                        $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                    }                    
                    $("#cboVendedor").select2("val", datos[0].USVE_USUA_ID).change();
                    //F6 - Documentos Origen                                      
                    $("#cboDctoOrigen").select2('val', datos[0].DCTO_TIPO_CODE_REF).change();
                    $("#txt_cod_doc_orig").val(datos[0].DCTO_CODE_REF);
                    $("#txt_num_ser_orig").val(datos[0].DCTO_REF_SERIE);
                    $("#txt_num_doc_orig").val(datos[0].DCTO_REF_NRO);

                    if ($("#cboDctoOrigen").val() == "0009" || $("#cboDctoOrigen").val() == "0050") {
                        $("#div_btn_add_prods,#divAgregarProducto").attr("style", "display:none");
                    } else {//0027 - Orden Compra Cliente

                    }
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

                    //Si el documento ha sido COMPLETADO se bloquea la edicion y se carga el correlativo correspondiente
                    if ($("#hfCompletoInd").val() == "S") {


                        $("#hfImprimirPreciosIGV").val(datos[0].IGV_IMPR_IND);
                        $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                        $(".btnImprimir").show();
                        $("#btnPdfAlt").removeClass('hidden');
                        $('#btnMail').removeClass('hidden');
                        $('#btnWhatsapp').removeClass('hidden');

                        $("#lblCopia").css("display", "inline-block");
                        $("#divBtnsMantenimiento,#btnBuscadocs").attr("style", "display:none");

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

                        if (datos[0].COMPLETO == "SI") {
                            $("#chkCompleto").attr("checked", true).parent().addClass("checked");
                            $("#cbo_modo_pago").attr("disabled", "disabled");
                            if (datos[0].CONTRAENTREGA_IND == "S") {
                                $("#lblContraentrega").show();
                            } else {
                                $("#lblContraentrega").hide();
                            }

                        }
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

                    //var validarDoc = $('#cboSerieDocVenta').text();
                    //if (validarDoc.substring(0, 1) == 'F' || validarDoc.substring(0, 1) == 'B') {
                    //    //$('#btnEFac').removeClass('hidden');
                    //}

                    var monedaCabecera = datos[0].MONEDA;
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

                                    //pruebita DPORTA
                                    cate_cod = datos2[i].CAT_CODE;
                                    cate_des = datos2[i].CAT_DESC;

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


                                        var anticipo = (datos2[i].PROD_CODE).substring(0, 2);

                                        if (anticipo != 'AP') {
                                            $.ajax({
                                                type: "post",
                                                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=6&PROD_CODE=" + datos2[i].PROD_CODE + "&CODIGO_CATEGORIA=" + $("#hfCodigoCategoriaCliente").val() + "&CTLG_CODE=" + datos[0].EMPRESA + "&SCSL=" + datos[0].SUCURSAL,
                                                contenttype: "application/json;",
                                                datatype: "json",
                                                async: false,
                                                success: function (datos) {
                                                    /*console.log(datos);*/
                                                    if (datos != null && datos.length != 0) {
                                                        descuentoCliente = (datos[0].DESCUENTO == "") ? 0 : parseFloat(datos[0].DESCUENTO);
                                                    }
                                                },
                                                error: function (msg) {
                                                    alertCustom("No se obtuvo correctamente descuento por Categoría de cliente.");
                                                }
                                            });
                                        }

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
                                    $(".slcNombProd").attr("disabled", "disabled");
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
                                    $("#div_btn_completar").attr("style", "display:none");//para que obligatoriamente se tenga que modificar antes de completar
                                }

                                if (datos[0].COMPLETO != "SI") {
                                    if (datos[0].CONTRAENTREGA_IND == "S") {
                                        $("#cbo_modo_pago").select2('val', '0000');
                                    }
                                }
                                //Pruebita DPORTA
                                $("#hfcod_cate").val(cate_cod);
                                $("#hfdes_cate").val(cate_des);
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

                                    if ($("#hfCompletoInd").val() == 'S') {
                                        objProdBoni.ITEM = datos3[i].ITEM;
                                    } else {
                                        objProdBoni.ITEM = i + 1;
                                    };

                                    objProdBoni.CODIGO = datos3[i].PROD_CODE;
                                    objProdBoni.PROD_CODE_ANTIGUO = datos3[i].PROD_CODIGO_ANTIGUO;
                                    objProdBoni.TIPO_BIEN = datos3[i].TIPO_BIEN;
                                    objProdBoni.ALMACENABLE = datos3[i].ALMACENABLE;


                                    objProdBoni.CODE_UNIDAD = datos3[i].UNIDAD;
                                    objProdBoni.UNIDAD = datos3[i].UNIDAD;
                                    objProdBoni.DESC_UNIDAD = datos3[i].DESC_UNIDAD;
                                    objProdBoni.GLOSA = datos3[i].GLOSA;

                                    //Almacen
                                    objProdBoni.ALMC = datos3[i].ALMC;
                                    objProdBoni.DESC_ALMC = datos3[i].DESC_ALMC;

                                    //CATEGORIA CLIENTE
                                    objProdBoni.CAT_CODE = datos3[i].CAT_CODE;
                                    objProdBoni.CAT_DESC = datos3[i].CAT_DESC;

                                    //$("#hfcod_cate").val(datos2[i].CAT_CODE);
                                    //$("#hfdes_cate").val(datos2[i].CAT_DESC);

                                    //Despacho ven venta
                                    objProdBoni.DESP_VENTA = datos3[i].DESP_VENTA;

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
                                    $(".slcNombProd").attr("disabled", "disabled");
                                }

                            }

                        },
                        error: function (msg) {
                            alertCustom(msg);
                        }
                    });


                    //FIN LISTAR DETALLES MUESTRA
                    $.ajax({
                        type: "POST",
                        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCDM&p_FVBVTAC_CODE=" + cod,
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (datos4) {

                            if (datos4 != null) {

                                for (var i = 0; i < datos4.length; i++) {
                                    var objProdMuestra = {};

                                    objProdMuestra.CODE_DCTO_ORIGEN = "";

                                    if ($("#hfCompletoInd").val() == 'S') {
                                        objProdBoni.ITEM = datos4[i].ITEM;
                                    } else {
                                        objProdBoni.ITEM = i + 1;
                                    };

                                    objProdMuestra.CODIGO = datos4[i].PROD_CODE;
                                    objProdMuestra.PROD_CODE_ANTIGUO = datos4[i].PROD_CODIGO_ANTIGUO;
                                    objProdMuestra.TIPO_BIEN = datos4[i].TIPO_BIEN;
                                    objProdMuestra.ALMACENABLE = datos4[i].ALMACENABLE;


                                    objProdMuestra.CODE_UNIDAD = datos4[i].UNIDAD;
                                    objProdMuestra.UNIDAD = datos4[i].UNIDAD;
                                    objProdMuestra.DESC_UNIDAD = datos4[i].DESC_UNIDAD;
                                    objProdMuestra.GLOSA = datos4[i].GLOSA;

                                    //Almacen
                                    objProdMuestra.ALMC = datos4[i].ALMC;
                                    objProdMuestra.DESC_ALMC = datos4[i].DESC_ALMC;

                                    //CATEGORIA CLIENTE
                                    objProdMuestra.CAT_CODE = datos4[i].CAT_CODE;
                                    objProdMuestra.CAT_DESC = datos4[i].CAT_DESC;

                                    //$("#hfcod_cate").val(datos2[i].CAT_CODE);
                                    //$("#hfdes_cate").val(datos2[i].CAT_DESC);

                                    //Despacho ven venta
                                    objProdMuestra.DESP_VENTA = datos4[i].DESP_VENTA;

                                    objProdMuestra.NOMBRE_IMPRESION = datos4[i].NOMBRE_IMPRESION;

                                    objProdMuestra.CANTIDAD = datos4[i].CANTIDAD;

                                    objProdMuestra.MONEDA = datos[0].MONEDA;
                                    objProdMuestra.PRECIO_IND = datos4[i].PRECIO_IND;
                                    if ($("#hfCompletoInd").val() == "N") {
                                        //OBTENER DATOS PRECIOS
                                        if (datos4[i].PRECIO_IND = "E") {
                                            objProdMuestra.PRECIO_VENTA = "0"
                                            objProdMuestra.PRECIO_MINIMO = "0"
                                            objProdMuestra.RANGOS_PRECIO = [];

                                        } else {
                                            objProdMuestra.PRECIO_VENTA = "0";
                                            objProdMuestra.PRECIO_MINIMO = "0";
                                            objProdMuestra.RANGOS_PRECIO = []
                                        }

                                        var descuentoCliente = 0;
                                        // OBTENER DESCUENTO

                                        //DATOS NECESARIOS PARA RECALCULAR SUBTOTALES
                                        objProdMuestra.DETRACCION = "0";
                                        objProdMuestra.DETRACCION_PORCENTAJE = "0";
                                        objProdMuestra.DESCUENTO = descuentoCliente;
                                        objProdMuestra.ISC = "0";
                                    }


                                    objProdMuestra.MONTO_DESCUENTO = "0";
                                    objProdMuestra.PRECIO_DETALLE = datos4[i].PU; //El precio está en la misma moneda que  cbo_moneda
                                    objProdMuestra.PU = datos4[i].PU;
                                    objProdMuestra.TOTAL_BRUTO = (parseFloat(datos4[i].CANTIDAD) * 0);
                                    objProdMuestra.TOTAL_NETO = datos4[i].TOTAL;
                                    objProdMuestra.MONTO_DETRAC = "0";
                                    objProdMuestra.MONTO_ISC = "0";


                                    objProdMuestra.CONVERT_PU = "0";
                                    objProdMuestra.CONVERT_DESCUENTO = "0";
                                    objProdMuestra.CONVERT_PRECIO_COMPRA = "0";
                                    objProdMuestra.CONVERT_DETRACCION = "0";
                                    objProdMuestra.CONVERT_ISC = "0";



                                    objProdMuestra.CENTRO_COSTO_CODE = datos4[i].CENTRO_COSTO_CODE;
                                    objProdMuestra.CUENTA_CODE = datos4[i].CUENTA_CODE;
                                    //Por completar                                 
                                    objProdMuestra.CTAS_CODE = "";
                                    objProdMuestra.CECO_CODE = "";
                                    objProdMuestra.TIPO_PROD = "";
                                    objProdMuestra.SERIADO = datos4[i].SERIADO_IND;

                                    detallesMuestra.push(objProdMuestra);

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
                                    $("#tabla_det_boni").DataTable().column(0).visible(false);
                                    $(".slcNombProd").attr("disabled", "disabled");
                                }

                            }

                        },
                        error: function (msg) {
                            alertCustom(msg);
                        }
                    });
                    //FIN LISTAR DETALLES MUESTRA

                    //fnVerificarCuotasxLetras();

                    if (prmtACON == "SI") {
                        sCodVenta = $("#txtNumDctoComp").val();
                        sCodVenta = $.trim(sCodVenta);
                        oDocVta = fnGetDocVta(sCodVenta);

                        //fnCargaTablaCuentasC(sCodVenta, oDocVta, datos[0].MOVCONT_CODE); 
                        fnCargaTablaCuentasC(sCodVenta, oDocVta, sCodVenta); //AVENGER
                    }
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
            //Desbloquear("ventana");
        } else {
            if (prmtACON == "SI") {
                fnCargaTablaCuentasC();
            }
        }
    };

    //var fnVerificarCuotasxLetras = function () {
    //    let sCodVenta = $("#txtNumDctoComp").val();
    //    sCodVenta = $.trim(sCodVenta);
    //    if (sCodVenta === "") {
    //        return;
    //    }

    //    let aoDocVta = fnGetDocVta(sCodVenta);
    //    if (aoDocVta.length === 0) {
    //        return;
    //    }


    //    let sCodCanje = fnGetCodCanjeXDocVta(sCodVenta);
    //    let aoCanje = fnGetCanje(sCodCanje);
    //    if (aoCanje.length !== 0) {
    //        $('#rbVinculadas').click().prop('checked', true).parent().addClass('checked');
    //        return;
    //    }

    //    let sCodigo = "";
    //    let sCodRef = sCodVenta;
    //    let sEstado = "A";
    //    let aoCuotaLibreCab = fnGetCuotaLibreCab(sCodigo, sCodRef, sEstado);
    //    if (aoCuotaLibreCab.length !== 0) {
    //        $('#rbLibres').click().prop('checked', true).parent().addClass('checked');
    //        return;
    //    }
    //};

    var fnCargaTablaCuentasC = function (sCodVenta, oDocVta, sCodAsiento) {
        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = sCodModulo;
                    vAsientoContable.sCodDoc = sCodVenta;
                    vAsientoContable.objDoc = oDocVta;
                    vAsientoContable.init(sCodAsiento);
                });
        });
    }

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
            //cargarAlmacenes();
            cargatablavacia();
            cargatablavacia2();
            cargatablavacia3();
            //fillcboRegistroEspecifico('VENT');
            //if (ObtenerQueryString("codigo") == undefined) {
            // fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);
            //}
            fillcboMoneda();
            $("#cboSerieDocVenta").select2("val", "");
            CrearListaAnticiposObjeto();
            cargaInicial();
            $("#hdfMontoMuestra").val("0");

        }
    };
}();

function cargarParametrosSistema() {
    let filtro = "DIGC,DIGP,STKP,REDN,DETR,RETN,RETR,IMRE,BFDV,ODON,VNST,ADET,ACON,CURS,MIGO,CANT,0021"; //Aquí van los parámetros que se van a utilizar en la pantalla y luego se le hace su case
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
                        case "DIGC":
                            prmtDIGC = datos[i].VALOR;
                            break;
                        case "DIGP":
                            prmtDIGP = datos[i].VALOR;
                            break;
                        case "STKP":
                            $('#hfParamStock').val(datos[i].VALOR);
                            paramStock = parseFloat($("#hfParamStock").val());
                            break;
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
                            prmtBFDV = datos[i].VALOR;
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
                        case "MIGO":
                            token_migo = datos[i].DESCRIPCION_DETALLADA;
                            break;
                        //case "GRAN":
                        //    if (datos[i].VALOR == "SI") {
                        //        $("#div_gran_redondeo").attr("style", "display:inline");

                        //    } else {
                        //        $("#div_gran_redondeo").attr("style", "display:none");
                        //    }
                        //    break;
                        case "CANT":
                            if (datos[i].VALOR == "SI") {
                                $("#txtStockReal").attr('disabled', true);
                            }
                            break;
                    }
                }

            }
            else { alertCustom("No se recuperaron correctamente los parámetros!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperaron correctamente los parámetros!");
        }
    });
    //OBTENER CANTIDAD DIGITOS EN LA PARTE DECIMAL (COSTO)
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DIGC",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            prmtDIGC = datos[0].VALOR;
    //        }
    //        else { alertCustom("No se recuperó correctamente el parámetro DIGC!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro DIGC!");
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


    //OBTENER PARAMETRO PARA MOSTRAR STOCK
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=STKP",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: false,
    //    success: function (datos) {
    //        if (datos != null) {
    //            $('#hfParamStock').val(datos[0].VALOR);
    //            paramStock = parseFloat($("#hfParamStock").val());
    //        }
    //        else { alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!");
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
    //OBTENER INDICADOR DE VALIDACION DE STOCK
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=VNST",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            prmtVNST = datos[0].VALOR;
    //        }
    //        else { alertCustom("No se recuperó el Indicador de Validación de Stock correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el Indicador de Validación de Stock correctamente!");
    //    }
    //});

    //VALIDAR SI CANTIDAD Y STOCK SON IGUALES 
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CANT",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: false,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (datos[0].VALOR == "S") {
    //                $('#hfParamStock').val(datos[0].VALOR);
    //                paramStock = parseFloat($("#hfParamStock").val());
    //            }
    //        } else { alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!");
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

    //BLOQUEAR CAMPO FECHA DE EMISIÓN EN DOCUMENTO DE VENTA
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CANT",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (datos[0].VALOR == "SI") {
    //                $("#txtStockReal").attr('disabled', true);

    //            } else {
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

                        //cargar el cliente con el valor pidm
                        //fillCboDirecciones(datos[0].VALOR);
                        //alert("go");
                        cargarprederteminado = true;
                        fillTxtCliente("#txtClientes", datos[0].VALOR);
                        //console.log(jsonPredeterminado.PIDM);
                    } else {
                        // QUE CARGUEN TODOS LOS CLIENTES NORMAL  
                        fillTxtCliente("#txtClientes", "");
                    }
                }
            },
        });
    }
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
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_Sucursal').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" data-ubigeo="' + datos[i].UBIGEO + '" >' + datos[i].DESCRIPCION + '</option>');
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
    ajaxVendedor = $.ajax({
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
    $('#input_cod_prod').html('<input id="txt_cod_producto" disabled="disabled" class="span6" type="text" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span6" type="text" style="margin-left:-2px;" placeholder="Código" />');
    $("#input_desc_prod").html("<input id='txt_desc_producto' class='span12' type='text' placeholder='Descripción de Producto o Servicio' />");

    Bloquear("input_cod_prod");
    Bloquear("input_desc_prod");
    //Bloquear("form_add_prod")
    if ($('#cboAlmacen').val() != null) {
        if (ajaxProducto) {
            ajaxProducto.abort();
        }
        ajaxProducto = $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#cbo_Empresa').val() + "&ALMC_CODE=" + $('#cboAlmacen').val() + "&SERIADO_IND=" + seriado,
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


                                //fillcboUniMedida(map[item].TIPO_DE_UNIDAD)
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
                                if (map[item].ALMACENABLE_IND == "N") {
                                    //stockReal = map[item].STOCK_REAL;
                                    //ValidaMostrarStock("SERVICIO");
                                    $("#txtStockReal").val("SERVICIO");
                                    $("#txtStockReal").attr("disabled", "disabled");
                                } else {
                                    stockReal = map[item].STOCK_REAL;
                                    ValidaMostrarStock(stockReal);
                                    $("#txtStockReal").attr("disabled", "disabled");
                                }
                                prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                                $("#hfCostoProducto").val(prodActual.COSTO_PRODUCTO);

                                ActualizarCamposPrecios();
                                //---
                                if ($("#hfProdSeriado").val() == "S") {
                                    CamposProductosSeriados();
                                } else {
                                    $("#div_vie_camp_seriados").slideUp();
                                    $("#txt_cantidad").removeAttr("disabled");
                                }

                                $('#txtPrecioUnitario').keyup(function (e) {
                                    var key = e.keyCode ? e.keyCode : e.which;
                                    if (key === 13 && $(this).val() != '') {
                                        $('#txt_glosa_det').focus();
                                    }
                                });
                                //---                            
                                $("#cbo_moneda").attr("disabled", "disabled");
                                //Desbloquear("form_add_prod");
                                desc_producto = map[item].DESC_ADM;

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
                            $("#cbo_und_medida").empty();
                            $("#txtStockReal").val('');
                            $("#txtPrecioUnitario").val("0.00");

                            if (detallesVenta.length == 0) {
                                $("#chkDespachoVenta").removeAttr("disabled");
                                $("#txtClientes").removeAttr("disabled");
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

                                if (map[item].ALMACENABLE_IND == "N") {
                                    //stockReal = map[item].STOCK_REAL;
                                    //ValidaMostrarStock("SERVICIO");
                                    $("#txtStockReal").val("SERVICIO");
                                    $("#txtStockReal").attr("disabled", "disabled");
                                } else {
                                    stockReal = map[item].STOCK_REAL;
                                    ValidaMostrarStock(stockReal);
                                    $("#txtStockReal").attr("disabled", "disabled");
                                }

                                prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                                $("#hfCostoProducto").val(prodActual.COSTO_PRODUCTO);
                                ActualizarCamposPrecios();
                                //---
                                //---
                                if ($("#hfProdSeriado").val() == "S") {
                                    CamposProductosSeriados();
                                } else {
                                    $("#div_vie_camp_seriados").slideUp();
                                    $("#txt_cantidad").removeAttr("disabled");
                                }

                                $('#txtPrecioUnitario').keyup(function (e) {
                                    var key = e.keyCode ? e.keyCode : e.which;
                                    if (key === 13 && $(this).val() != '') {
                                        $('#txt_glosa_det').focus();
                                    }
                                });
                                //---
                                $("#cbo_moneda").attr("disabled", "disabled");
                                desc_producto = map[item].DESC_ADM;
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
                            $("#cbo_und_medida").empty();
                            $("#txtPrecioUnitario").val("0.00");

                            if (detallesVenta.length == 0) {
                                $("#txtClientes").removeAttr("disabled");
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
                //Desbloquear("form_add_prod")
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
        CargarFactorImpuestoRentaVenta();
        if ($("#cbo_modo_pago").val() == "0001" || $("#cbo_modo_pago").val() == "0000") {
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
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioEstandar(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            }
            else if (prodActual.PRECIO_IND == "C") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12" type="text" disabled="disabled" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
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

//insertar TC - DPORTA
function InsertarValorCambioOficial(monecode) {
    if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
        monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

        var formData = new FormData();
        formData.append("token", token_migo);

        //let fecha = new Date();
        //let cadenaFecha = fecha.getFullYear() + "-" + fecha.getMonth().toString().padStart(2, '0') + "-" + fecha.getDate().toString().padStart(2, '0') //Para completar ceros en js a la izquierda padStart y a la derecha padEnd
        //formData.append("fecha", cadenaFecha);

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
    //Bloquear("divFilaCliente");
    //}
    $.ajax({
        type: "post",
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG_CODE=" + $("#cbo_Empresa").val(),
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2.5&CTLG_CODE=" + $("#cbo_Empresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: asincrono,
        success: function (datos) {
            //if (asincrono == true) {
            //Desbloquear("divFilaCliente");
            //}
            if (datos != null) {
                textclientes = selectRazonSocial.typeahead({
                    items: 20,
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        let oObjet = new Array();
                        //console.log(v_value);
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
                                InsertarValorCambioOficial($('#cbo_moneda').val());
                            }
                            prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                            if (jsonPredeterminado.RUC != "") {
                                $('#cboTipoDoc').select2("val", "6").change();
                                $("#txtNroDctoCliente").val(jsonPredeterminado.RUC);
                                $("#btnHabido").show();

                            } else {
                                $('#cboTipoDoc').select2("val", jsonPredeterminado.CODIGO_TIPO_DOCUMENTO).change();
                                $("#txtNroDctoCliente").val(jsonPredeterminado.NRO_DOCUMENTO);
                                if (jsonPredeterminado.CODIGO_TIPO_DOCUMENTO === "6") {
                                    $("#hfRUC").val(jsonPredeterminado.NRO_DOCUMENTO);
                                }
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

                            //$("#txt_plazo_pago").val(jsonPredeterminado.DIAS);
                            //Cargar modo de pago
                            $("#cbo_modo_pago").select2('val', '0000');
                            $("#cbo_modo_pago").change();
                            //
                            $('#chk_retencion').prop('disabled', true);
                            $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                            $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                            //Evalua si se aplica retencion
                            if (jsonPredeterminado.AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                                $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                                //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                            }

                            if (jsonPredeterminado.DIAS > 0) {
                                $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                            }
                            else {
                                $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
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

                        //console.log(arrayRazonSocial);

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
                        //$("#hfDIR").val(map[item].DIRECCION);

                        cod_cate_clie = map[item].CODIGO_CATEGORIA;
                        des_cate_clie = map[item].CATE_DESC;
                        deuda = map[item].DEUDA;
                        //if (map[item].PPBIDEN_CONDICION_SUNAT != "") {
                        //    $("#lblHabido").html("CONDICIÓN: " + "<b>" + map[item].PPBIDEN_CONDICION_SUNAT + "</b>");
                        //}
                        //if (map[item].PPBIDEN_ESTADO_SUNAT != "") {
                        //    $("#lblEstado").html("ESTADO: " + "<b>" + map[item].PPBIDEN_ESTADO_SUNAT + "</b>");
                        //}

                        if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig_Oficial").val()) {//DPORTA
                            InsertarValorCambioOficial($('#cbo_moneda').val());
                        }
                        prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                        if (docu == "") {
                            if (map[item].RUC != "") {
                                $('#cboTipoDoc').select2("val", "6").change();
                                $("#txtNroDctoCliente").val(map[item].RUC);
                                $("#btnHabido").show();

                            } else {
                                $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                                $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
                                if (map[item].CODIGO_TIPO_DOCUMENTO === "6") {
                                    $("#hfRUC").val(map[item].NRO_DOCUMENTO);
                                }
                                $("#btnHabido").hide();
                            }
                        } else {
                            if (map[item].RUC != "" && docu == "6") {
                                $('#cboTipoDoc').select2("val", "6").change();
                                $("#txtNroDctoCliente").val(map[item].RUC);
                                $("#btnHabido").show();

                            } else {
                                $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                                $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
                                if (map[item].CODIGO_TIPO_DOCUMENTO === "6") {
                                    $("#hfRUC").val(map[item].NRO_DOCUMENTO);
                                }
                                $("#btnHabido").hide();
                            }
                        }

                        //if ($('#cboTipoDoc').val() == '6') {
                        //    $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
                        //    $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
                        //    $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

                        //    var oItems = $('#cboDocumentoVenta option');
                        //    for (var i = 0; i < oItems.length; i++) {
                        //        if (oItems[i].value === "0012") {
                        //            $("#cboDocumentoVenta").select2("val", "0012").change();
                        //        } else {
                        //            $("#cboDocumentoVenta").select2("val", "0001").change();
                        //        }

                        //    }

                        //} else {
                        //    $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
                        //    $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

                        //    var oItems = $('#cboDocumentoVenta option');
                        //    for (var i = 0; i < oItems.length; i++) {
                        //        if (oItems[i].value === "0012") {
                        //            $("#cboDocumentoVenta").select2("val", "0012").change();
                        //        } else {
                        //            $("#cboDocumentoVenta").select2("val", "0003").change();
                        //        }

                        //    }
                        //}

                        //$("#txt_plazo_pago").val(map[item].DIAS);
                        //Cargar modo de pago
                        $("#cbo_modo_pago").select2('val', '0000');
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
                        //
                        $('#chk_retencion').prop('disabled', true);
                        $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                        $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                        //Evalua si se aplica retencion
                        if (map[item].AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                            $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                            //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                        }

                        if (map[item].DIAS > 0) {
                            $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                        }
                        else {
                            $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
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
                        $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
                        $('#chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
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
                        //$('#cboTipoDoc').prop('disabled', true);
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
                        $("#cbo_direccion").attr("disabled", false);
                        carga_ini_ind = false;
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
            //Desbloquear("divFilaCliente");
        }
    });
}


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
                        //console.log(v_value);
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
                                InsertarValorCambioOficial($('#cbo_moneda').val());
                            }
                            prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
                            if (jsonPredeterminado.RUC != "") {
                                $('#cboTipoDoc').select2("val", "6").change();
                                $("#txtNroDctoCliente").val(jsonPredeterminado.RUC);
                                $("#btnHabido").show();

                            } else {
                                $('#cboTipoDoc').select2("val", jsonPredeterminado.CODIGO_TIPO_DOCUMENTO).change();
                                $("#txtNroDctoCliente").val(jsonPredeterminado.NRO_DOCUMENTO);
                                if (jsonPredeterminado.CODIGO_TIPO_DOCUMENTO === "6") {
                                    $("#hfRUC").val(jsonPredeterminado.NRO_DOCUMENTO);
                                }
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

                            //$("#txt_plazo_pago").val(jsonPredeterminado.DIAS);
                            //Cargar modo de pago
                            $("#cbo_modo_pago").select2('val', '0000');
                            $("#cbo_modo_pago").change();
                            //
                            $('#chk_retencion').prop('disabled', true);
                            $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                            $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                            //Evalua si se aplica retencion
                            if (jsonPredeterminado.AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                                $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                                //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                            }

                            if (jsonPredeterminado.DIAS > 0) {
                                $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                            }
                            else {
                                $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
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

                        //console.log(arrayRazonSocial);

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
                        //$("#hfDIR").val(map[item].DIRECCION);

                        cod_cate_clie = map[item].CODIGO_CATEGORIA;
                        des_cate_clie = map[item].CATE_DESC;
                        deuda = map[item].DEUDA;

                        if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig_Oficial").val()) {//DPORTA
                            InsertarValorCambioOficial($('#cbo_moneda').val());
                        }
                        prmtBFDV == "SI" ? $("#txt_fec_emision").attr("disabled", "disabled") : $("#txt_fec_emision").removeAttr("disabled", false);
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
                            if (map[item].CODIGO_TIPO_DOCUMENTO === "6") {
                                $("#hfRUC").val(map[item].NRO_DOCUMENTO);
                            }
                            $("#btnHabido").hide();
                        }

                        //if ($('#cboTipoDoc').val() == '6') {
                        //    $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
                        //    $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
                        //    $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

                        //    var oItems = $('#cboDocumentoVenta option');
                        //    for (var i = 0; i < oItems.length; i++) {
                        //        if (oItems[i].value === "0012") {
                        //            $("#cboDocumentoVenta").select2("val", "0012").change();
                        //        } else {
                        //            $("#cboDocumentoVenta").select2("val", "0001").change();
                        //        }

                        //    }

                        //} else {
                        //    $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
                        //    $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

                        //    var oItems = $('#cboDocumentoVenta option');
                        //    for (var i = 0; i < oItems.length; i++) {
                        //        if (oItems[i].value === "0012") {
                        //            $("#cboDocumentoVenta").select2("val", "0012").change();
                        //        } else {
                        //            $("#cboDocumentoVenta").select2("val", "0003").change();
                        //        }

                        //    }
                        //}

                        //$("#txt_plazo_pago").val(map[item].DIAS);
                        //Cargar modo de pago
                        $("#cbo_modo_pago").select2('val', '0000');
                        if ($("#hfPIDM").val() !== '1') {
                            //$("#cbo_modo_pago").change();
                            $("#linea").html('');
                            $("#disponible").html('');
                            $("#vencido").html('');
                            $("#divAlCredito").hide();
                        }
                        //
                        $('#chk_retencion').prop('disabled', true);
                        $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                        $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                        //Evalua si se aplica retencion
                        if (map[item].AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                            $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                            //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                        }

                        if (map[item].DIAS > 0) {
                            $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                        }
                        else {
                            $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
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
                        $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
                        $('#chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
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
                        //$('#cboTipoDoc').prop('disabled', true);
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
                        $("#cbo_direccion").attr("disabled", false);
                        carga_ini_ind = false;
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
                                $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                            }
                            else {
                                $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
                            }
                            return item;
                        },
                    });

                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtResponsablePago").val().length <= 0) {

                            $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
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
            items: 20,
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
                            //'","DIRECCION":"' + jsonClientes[i].DIRECCION +
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
                    $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                }
                else {
                    $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
                }
                return item;
            },
        });
        selectRazonSocial.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))
            if ($("#txtResponsablePago").val().length <= 0) {
                $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
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

    if ($("#hfCOD_PROD").val() != "" && $("#hfProdSeriado").val() == "S") {
        if (prodActual.STOCK_REAL[0] > 0) {
            $("#div_vie_camp_seriados").slideDown();
        }

        //$("#div_vie_camp_seriados").attr("style", "display:block");

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

                //TODO
            }
        }

    }
    else {
        $("#div_vie_camp_seriados").attr("style", "display:none");
        $("#txt_cantidad").removeAttr("disabled");
    }
}

//Agregar Detalle
var detallesVenta = [];
var detallesBonificacion = [];
var detallesMuestra = [];

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
    var current_filas_bonificacion = (obtenerNumeroItems($("#tabla_det_boni")) !== null) ? obtenerNumeroItems($("#tabla_det_boni")) : 0;
    var current_filas_muestra = (obtenerNumeroItems($("#tabla_det_muestra")) !== null) ? obtenerNumeroItems($("#tabla_det_muestra")) : 0;
    var current_filas_total = (current_filas_table + current_filas_bonificacion + current_filas_muestra);
    var nro_items_permitidos;
    var message_nro_lineas = "";

    if (current_filas_total >= current_nro_lineas) {
        infoCustom2("Ya no se pueden agregar más productos al detalle, según el tipo de documento");
        LimpiarCamposDetalle();
        return;
    } else {
        nro_items_permitidos = current_nro_lineas - current_filas_total;
    }

    if (!$("#chkBonificacion").is(":checked") && !$("#chkMuestra").is(":checked")) {


        if ($("#cboDctoOrigen").val() == "0027" || $("#cboDctoOrigen").val() == "0050" || $("#cboDctoOrigen").val() == "0009") {
            alertCustom("No puede agregar detalles si tiene como origen: " + $("#cboDctoOrigen :selected").html());
        }
        else {
            var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
            var codeProdAntiguo = $("#txt_cod_a_producto").val();
            //var nomProdVenta = $("#txt_desc_producto").val();
            var cantidad = $("#txt_cantidad").val();
            var unidadMedidaCode = $("#cbo_und_medida :selected").val();
            var unidadMedida = $("#cbo_und_medida :selected").html();
            var precioUnidad = $("#txtPrecioUnitario").val().replace(",", ".");
            var glosa = $.trim($("#txt_glosa_det").val().replace(/<\/?[^>]+(>|$)/gi, ""));

            //Guardar Almacen
            var almacenCode = $("#cboAlmacen :selected").val();
            var almacen = $("#cboAlmacen :selected").html();
            //Guardar Categoria Cliente
            var categoriaCode = (($("#hfcod_cate").val()) != "" ? $("#hfcod_cate").val() : cod_cate_clie);
            var categoriaDesc = (($("#hfdes_cate").val()) != "" ? $("#hfdes_cate").val() : des_cate_clie); //$("#hfdes_cate").val();

            //Guardar Despacho
            var despacho = "NO";

            var nomProdVenta = desc_producto + " " + glosa; //$("#txt_desc_producto").val() + " " + glosa;

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
                    //VALIDACION DE STOCK
                    if (prmtVNST == "S") {
                        var diferencia = parseFloat($("#txtStockReal").val()) - parseFloat($("#txt_cantidad").val());
                        if (diferencia < 0) {
                            continuar = false;
                            infoCustom2("No hay stock suficiente para agregar el producto");
                        }
                    }
                }
            }
            //Fin validaciones

            var continuar2;
            if (continuar) {

                if (objProd != null && typeof objProd != "undefined") {
                    if ($("#hfProdSeriado").val() == "S") { // CON DESPACHO EN VENTA //modificado dporta
                        if ($("#hfProdSeriado").val() == "S") {

                            var cantSeriados;
                            if ($("#cboBuscar").val() != null) {
                                cantSeriados = $("#cboBuscar").val().length;
                                var codigos = [];
                                var series = [];
                                codigos = $("#cboBuscar").val().toString().split(",");
                                series = ObtenerSeries().split(",");
                                var objAux;

                                var totalBruto = cantidad * precioUnidad;
                                var totalNeto = totalBruto - descuento;

                                var nro_productos_seriados = codigos.length;
                                if ((current_filas_total + nro_productos_seriados) > current_nro_lineas) {
                                    nro_productos_seriados = nro_items_permitidos;
                                    if (nro_productos_seriados > 0) {
                                        message_nro_lineas = "Sólo fueron agregados " + nro_productos_seriados + " productos seriados según el tipo de documento seleccionado";
                                    } else {
                                        message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                    }

                                }

                                for (var i = 0; i < nro_productos_seriados; i++) {

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
                                        objProd.ALMC = almacenCode;
                                        objProd.DESC_ALMC = almacen;
                                        objProd.CAT_CODE = categoriaCode;
                                        objProd.CAT_DESC = categoriaDesc;
                                        objProd.DESP_VENTA = despacho;
                                        objProd.TOTAL_BRUTO = totalBruto;
                                        objProd.TOTAL_NETO = totalNeto;
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
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                            objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                                        }
                                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                        //$("#div_vie_camp_seriados").attr("style", "display:none;");
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

                                if (current_filas_total < current_nro_lineas) {// AGREGA EL IMPORTE 
                                    LimpiarCamposDetalle();
                                    ListarTablaDetalles(ObtenerTablaDetalles());

                                    CalcularDetraccion();
                                    CalcularDatosMonetarios();
                                    $("#lblImporteCobrar").html($("#txt_monto_total").val());
                                    $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
                                } else {
                                    message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                }

                            } else { //DAPO
                                //cantSeriados = 0;
                                //alertCustom("Debe seleccionar al menos 1 producto de la lista detallada.");
                                var item = detallesVenta.length + 1;
                                objProd.ITEM = item;
                                objProd.DESC_UNIDAD = unidadMedida;
                                objProd.CODE_UNIDAD_PROD_BASE = objProd.CODE_UNIDAD;
                                objProd.CODE_UNIDAD = unidadMedidaCode;
                                objProd.GLOSA = glosa;
                                objProd.NOMBRE_IMPRESION = nomProdVenta; //nomProdVenta + " - " + series[i];
                                objProd.CODIGO = objProd.CODIGO; //codigos[i];
                                objProd.CODIGO_BARRAS = ""; //series[i];
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
                                objProd.TOTAL_NETO = totalNeto;
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
                                    isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                    objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                                }
                                objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                //$("#div_vie_camp_seriados").attr("style", "display:none;");
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

                                if (current_filas_total < current_nro_lineas) {// AGREGA EL IMPORTE 
                                    LimpiarCamposDetalle();
                                    ListarTablaDetalles(ObtenerTablaDetalles());

                                    CalcularDetraccion();
                                    CalcularDatosMonetarios();
                                    $("#lblImporteCobrar").html($("#txt_monto_total").val());
                                    $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
                                } else {
                                    message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                }
                            }

                        } else {
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
                                //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                                objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                                objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
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
                                $("#cbo_uni_medida").attr("disabled", "disabled");
                                $("#cbo_Sucursal").attr("disabled", "disabled");
                                $("#cbo_Empresa").attr("disabled", "disabled");
                                $("#chkDespachoVenta").attr("disabled", "disabled");
                                //
                                $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                                if (current_filas_total < current_nro_lineas) {
                                    LimpiarCamposDetalle();
                                    ListarTablaDetalles(ObtenerTablaDetalles());
                                } else {
                                    message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                }

                                //LimpiarCamposDetalle();
                                //ListarTablaDetalles(ObtenerTablaDetalles());
                            }
                            else {
                                if (agregarDetalle == "NO") {
                                    alertCustom("El producto ya ha sido agregado.");
                                }
                            }
                        }
                    }
                    else { // CON DESPACHO DIFERIDO: No se admite varias filas de seriados
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
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                            objProd.PRECIO_VENTA = parseFloat(objProd.PRECIO_VENTA) * equi;
                            objProd.PRECIO_MINIMO = parseFloat(objProd.PRECIO_MINIMO) * equi;
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
                            $("#cbo_uni_medida").attr("disabled", "disabled");
                            $("#cbo_Sucursal").attr("disabled", "disabled");
                            $("#cbo_Empresa").attr("disabled", "disabled");
                            $("#chkDespachoVenta").attr("disabled", "disabled");
                            //
                            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                            if (current_filas_total < current_nro_lineas) {
                                LimpiarCamposDetalle();
                                ListarTablaDetalles(ObtenerTablaDetalles());

                                CalcularDetraccion();
                                CalcularDatosMonetarios();
                                $("#lblImporteCobrar").html($("#txt_monto_total").val());
                                $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
                            } else {
                                message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                            }

                        } else {
                            if (agregarDetalle == "NO") {
                                alertCustom("El producto ya ha sido agregado.");
                            }
                        }
                    }
                } else { alertCustom("Error al obtener datos completos de producto."); }

            }
        }

    } else if ($("#chkBonificacion").is(":checked")) {  //ELSE CHECKBOX  PRODUCTO BONIFICACION  


        if ($("#cboDctoOrigen").val() == "0027" || $("#cboDctoOrigen").val() == "0050" || $("#cboDctoOrigen").val() == "0009") {
            alertCustom("No puede agregar detalles si tiene como origen: " + $("#cboDctoOrigen :selected").html());
        }
        else {
            var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
            var codeProdAntiguo = $("#txt_cod_a_producto").val();
            //var nomProdVenta = $("#txt_desc_producto").val();
            var cantidad = $("#txt_cantidad").val();
            var unidadMedidaCode = $("#cbo_und_medida :selected").val();
            var unidadMedida = $("#cbo_und_medida :selected").html();
            var precioUnidad = 0.00; //$("#txtPrecioUnitario").val().replace(",", ".");
            var glosa = $.trim($("#txt_glosa_det").val().replace(/<\/?[^>]+(>|$)/gi, ""));

            //Guardar Almacen
            var almacenCode = $("#cboAlmacen :selected").val();
            var almacen = $("#cboAlmacen :selected").html();
            //Guardar Categoria Cliente
            var categoriaCode = (($("#hfcod_cate").val()) != "" ? $("#hfcod_cate").val() : cod_cate_clie);
            var categoriaDesc = (($("#hfdes_cate").val()) != "" ? $("#hfdes_cate").val() : des_cate_clie); //$("#hfdes_cate").val();

            //Guardar Despacho

            var despacho = "NO";
            var nomProdVenta = desc_producto + " " + glosa; //$("#txt_desc_producto").val() + " " + glosa;

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
                    if ($("#hfProdSeriado").val() == "S") { // CON DESPACHO EN VENTA //modificado dporta
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

                                var nro_productos_seriados = codigos.length;
                                if ((current_filas_total + nro_productos_seriados) > current_nro_lineas) {
                                    nro_productos_seriados = nro_items_permitidos;
                                    if (nro_productos_seriados > 0) {
                                        message_nro_lineas = "Sólo fueron agregados " + nro_productos_seriados + " productos seriados según el tipo de documento seleccionado";
                                    } else {
                                        message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                    }

                                }

                                for (var i = 0; i < nro_productos_seriados; i++) {

                                    //var indice = -1;
                                    //for (var h = 0; h < detallesBonificacion.length; h++) {
                                    //    if (detallesBonificacion[h].CODIGO_BARRAS == series[i]) {
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
                                        objProd.PU = precioUnidad;
                                        objProd.ALMC = almacenCode;
                                        objProd.DESC_ALMC = almacen;
                                        objProd.CAT_CODE = categoriaCode;
                                        objProd.CAT_DESC = categoriaDesc;
                                        objProd.DESP_VENTA = despacho;
                                        objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                                        objProd.TOTAL_NETO = totalNeto.toFixed(2);

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
                                        objProd.MONTO_DETRAC = detraccion.toFixed(2);

                                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                            objProd.MONTO_ISC = isc.toFixed(2);
                                        } else {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                            objProd.MONTO_ISC = isc.toFixed(2);
                                        }
                                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                        //$("#div_vie_camp_seriados").attr("style", "display:none;");
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

                            } else { //DAPO
                                //cantSeriados = 0;
                                //alertCustom("Debe seleccionar al menos 1 producto de la lista detallada.");
                                var item = detallesBonificacion.length + 1;
                                objProd.ITEM = item;
                                objProd.DESC_UNIDAD = unidadMedida;
                                objProd.CODE_UNIDAD_PROD_BASE = objProd.CODE_UNIDAD;
                                objProd.CODE_UNIDAD = unidadMedidaCode;
                                objProd.GLOSA = glosa;
                                objProd.NOMBRE_IMPRESION = nomProdVenta; //nomProdVenta + " - " + series[i];
                                objProd.CODIGO = objProd.CODIGO; //codigos[i];
                                objProd.CODIGO_BARRAS = ""; //series[i];
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
                                objProd.TOTAL_NETO = totalNeto;
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
                                    isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                    objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                                }
                                objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                //$("#div_vie_camp_seriados").attr("style", "display:none;");
                                $("#div_vie_camp_seriados").slideUp();
                                objAux = jQuery.parseJSON(JSON.stringify(objProd));
                                detallesBonificacion.push(objAux);

                                //Bloquear edicion
                                $("#cbo_moneda").attr("disabled", "disabled");
                                $("#cbo_uni_medida").attr("disabled", "disabled");
                                $("#cbo_Sucursal").attr("disabled", "disabled");
                                $("#cbo_Empresa").attr("disabled", "disabled");
                                //$("#chkDespachoVenta").attr("disabled", "disabled");
                                //
                                $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                                if (current_filas_total < current_nro_lineas) {// AGREGA EL IMPORTE 
                                    LimpiarCamposDetalle();
                                    ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
                                } else {
                                    message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                }
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
                                objProd.PU = precioUnidad;
                                objProd.ALMC = almacenCode;
                                objProd.DESC_ALMC = almacen;
                                objProd.CAT_CODE = categoriaCode;
                                objProd.CAT_DESC = categoriaDesc;
                                objProd.DESP_VENTA = despacho;
                                objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                                objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
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
                                //$("#chkDespachoVenta").attr("disabled", "disabled");
                                //
                                $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                                if (current_filas_total < current_nro_lineas) {
                                    LimpiarCamposDetalle();
                                    ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
                                } else {
                                    message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                }

                                //LimpiarCamposDetalle();
                                //ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
                            }
                            else {
                                if (agregarDetalle == "NO") {
                                    alertCustom("El producto ya ha sido agregado.");
                                }
                            }
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
                            objProd.ALMC = almacenCode;
                            objProd.DESC_ALMC = almacen;
                            objProd.CAT_CODE = categoriaCode;
                            objProd.CAT_DESC = categoriaDesc;
                            objProd.DESP_VENTA = despacho;
                            objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
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
                            //$("#chkDespachoVenta").attr("disabled", "disabled");
                            //
                            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                            if (current_filas_total < current_nro_lineas) {
                                LimpiarCamposDetalle();
                                ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
                            } else {
                                message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                            }

                            //LimpiarCamposDetalle();
                            //ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());

                        } else { alertCustom("El producto ya ha sido agregado."); }
                    }


                } else { alertCustom("Error al obtener datos completos de producto."); }

                //$("#chkBonificacion").prop('checked', false).parent().removeClass('checked');
                $("#txtPrecioUnitario").attr("disabled", false);

                //CalcularDetraccion();
                //CalcularDatosMonetarios();
                //$("#lblImporteCobrar").html($("#txt_monto_total").val());
                //$("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
            }
        }
    } else if ($("#chkMuestra").is(":checked")) {  // DETALLESSSSS MUESTRA

        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txt_cod_a_producto").val();
        //var nomProdVenta = $("#txt_desc_producto").val();
        var cantidad = $("#txt_cantidad").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = 0.00; //$("#txtPrecioUnitario").val().replace(",", ".");
        // var precioUnidad = 0.00;
        var glosa = $.trim($("#txt_glosa_det").val().replace(/<\/?[^>]+(>|$)/gi, ""));

        //Guardar Almacen
        var almacenCode = $("#cboAlmacen :selected").val();
        var almacen = $("#cboAlmacen :selected").html();
        //Guardar Categoria Cliente
        var categoriaCode = (($("#hfcod_cate").val()) != "" ? $("#hfcod_cate").val() : cod_cate_clie);
        var categoriaDesc = (($("#hfdes_cate").val()) != "" ? $("#hfdes_cate").val() : des_cate_clie); //$("#hfdes_cate").val();

        //Guardar Despacho
        var despacho = "NO";

        var nomProdVenta = desc_producto + " " + glosa; //$("#txt_desc_producto").val() + " " + glosa;

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
                if ($("#hfProdSeriado").val() == "S") { // CON DESPACHO EN VENTA //modificado dporta
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

                            var nro_productos_seriados = codigos.length;
                            if ((current_filas_total + nro_productos_seriados) > current_nro_lineas) {
                                nro_productos_seriados = nro_items_permitidos;
                                if (nro_productos_seriados > 0) {
                                    message_nro_lineas = "Sólo fueron agregados " + nro_productos_seriados + " productos seriados según el tipo de documento seleccionado";
                                } else {
                                    message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                                }

                            }

                            for (var i = 0; i < nro_productos_seriados; i++) {

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
                                    objProd.ALMC = almacenCode;
                                    objProd.DESC_ALMC = almacen;
                                    objProd.CAT_CODE = categoriaCode;
                                    objProd.CAT_DESC = categoriaDesc;
                                    objProd.DESP_VENTA = despacho;
                                    objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                                    objProd.TOTAL_NETO = totalNeto.toFixed(2);

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
                                    //$("#chkDespachoVenta").attr("disabled", "disabled");
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

                        } else { //DAPO
                            //cantSeriados = 0;
                            //alertCustom("Debe seleccionar al menos 1 producto de la lista detallada.");
                            var item = detallesMuestra.length + 1;
                            objProd.ITEM = item;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.CODE_UNIDAD_PROD_BASE = objProd.CODE_UNIDAD;
                            objProd.CODE_UNIDAD = unidadMedidaCode;
                            objProd.GLOSA = glosa;
                            objProd.NOMBRE_IMPRESION = nomProdVenta; //nomProdVenta + " - " + series[i];
                            objProd.CODIGO = objProd.CODIGO; //codigos[i];
                            objProd.CODIGO_BARRAS = ""; //series[i];
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
                            objProd.TOTAL_NETO = totalNeto;
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
                                isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); // Total neto Con IGV
                                objProd.MONTO_ISC = isc.toFixed(prmtDIGP);
                            }
                            objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                            //$("#div_vie_camp_seriados").attr("style", "display:none;");
                            $("#div_vie_camp_seriados").slideUp();
                            objAux = jQuery.parseJSON(JSON.stringify(objProd));
                            detallesMuestra.push(objAux);

                            //Bloquear edicion
                            $("#cbo_moneda").attr("disabled", "disabled");
                            $("#cbo_uni_medida").attr("disabled", "disabled");
                            $("#cbo_Sucursal").attr("disabled", "disabled");
                            $("#cbo_Empresa").attr("disabled", "disabled");
                            //$("#chkDespachoVenta").attr("disabled", "disabled");
                            //
                            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                            if (current_filas_total < current_nro_lineas) {// AGREGA EL IMPORTE 
                                LimpiarCamposDetalle();
                                ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());
                            } else {
                                message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                            }
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
                            objProd.ALMC = almacenCode;
                            objProd.DESC_ALMC = almacen;
                            objProd.CAT_CODE = categoriaCode;
                            objProd.CAT_DESC = categoriaDesc;
                            objProd.DESP_VENTA = despacho;
                            objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
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
                            //$("#chkDespachoVenta").attr("disabled", "disabled");
                            //
                            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                            if (current_filas_total < current_nro_lineas) {
                                LimpiarCamposDetalle();
                                ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());
                            } else {
                                message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                            }

                            //LimpiarCamposDetalle();
                            //ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());
                        }
                        else {
                            if (agregarDetalle == "NO") {
                                alertCustom("El producto ya ha sido agregado.");
                            }
                        }
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
                        objProd.ALMC = almacenCode;
                        objProd.DESC_ALMC = almacen;
                        objProd.CAT_CODE = categoriaCode;
                        objProd.CAT_DESC = categoriaDesc;
                        objProd.DESP_VENTA = despacho;
                        objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                        objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
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
                        //$("#chkDespachoVenta").attr("disabled", "disabled");
                        //
                        $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                        if (current_filas_total < current_nro_lineas) {
                            LimpiarCamposDetalle();
                            ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());
                        } else {
                            message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                        }

                        //LimpiarCamposDetalle();
                        //ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());

                    } else { alertCustom("El producto ya ha sido agregado."); }
                }
            } else { alertCustom("Error al obtener datos completos de producto."); }
        }
    }

    if (message_nro_lineas != "") {
        infoCustom2(message_nro_lineas);
    }

    $("#chkBonificacion").prop('checked', false).parent().removeClass('checked');
    $("#chkMuestra").prop('checked', false).parent().removeClass('checked');
    $("#chkMuestra").attr("disabled", false)
    $("#chkBonificacion").attr("disabled", false)
    //Agregado, no se muestra hasta que se de grabar a la venta
    $("#div_btn_completar").attr("style", "display:none");
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
    if (prmtCURS == "SI") {
        $("#txt_desc_producto").focus();
    } else {
        $("#txt_cod_a_producto").focus();
    }
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
        $("#txtNroDctoCliente").removeAttr("disabled");
        $("#cboTipoDoc").removeAttr("disabled");
        $("#div_btn_completar").attr("style", "display:none");
        $("#rbRedondeo,#rbDonacion").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');
    } else {
        $("#txt_cantidad").removeAttr("disabled");
        $("#txtStockReal").removeAttr("disabled");
        $("#cbo_und_medida").removeAttr("disabled");
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
            "&ALMC_CODE=" + $('#cboAlmacen').val(),
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
                prod += '"TIPO_DE_UNIDAD":"' + datos[0].TIPO_DE_UNIDAD + '",';
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
            "&ALMC_CODE=" + $('#cboAlmacen').val() +
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

            } else if (precioInd == "C") {//Precio por cantidad 
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
    res = '<table id="tabla_det" class="display DTTT_selectable" border="0" style="width:100%">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th>DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCIÓN</th>'
    res += '<th>ALMACÉN</th>'
    res += '<th>CATEGORIA CLIENTE</th>'
    res += '<th>DESPACHO EN VENTA</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesVenta.length; i++) {

        var combo = fillNombreAlterno(detallesVenta[i].CODIGO, detallesVenta[i].NOMBRE_IMPRESION, i, "N");

        res += '<tr id="' + detallesVenta[i].ITEM + '">'

        if (detallesVenta[i].CODE_DCTO_ORIGEN != "" && $("#cboDctoOrigen").val() == "0027") {
            res += '<td align="center"><a href="javascript:infoCustom2(\'Para eliminar este detalle debe cambiar de documento de origen!\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        } else {
            res += '<td align="center"><a href="javascript:Delete(\'' + detallesVenta[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        }

        res += '<td align="center">' + detallesVenta[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesVenta[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td>' + combo + '</td>'

        res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CANTIDAD + '</td>'//Elimnar esta línea cuando descomente lo que está abajo

        //DPORTA - EDITAR CANTIDAD EN DETALLE
        //if ($("#hfCompletoInd").val() == "N" && (detallesVenta[i].SERIADO == "N") && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si tiene el permiso y aún no está completado
        //    res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaCantidad(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].CANTIDAD + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        //}
        //else {
        //    res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CANTIDAD + '</td>'
        //}

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'

        if (detallesVenta[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && $("#cboDctoOrigen").val() != "0027" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si es precio estandar es modificable
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

        res += '<td class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESC_ALMC + '</td>'

        res += '<td class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CAT_DESC + '</td>'

        res += '<td class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESP_VENTA + '</td>'

        res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'

        res += '</tr>'

    }

    res += '</tbody>'
    res += '</table>'
    return res;
}


function ObtenerTablaDetallesCompletado() {
    var res = "";
    res = '<table id="tabla_det" class="display DTTT_selectable" border="0" style="width:100%">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th>DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCIÓN</th>'
    res += '<th>ALMACÉN</th>'
    res += '<th>CATEGORIA CLIENTE</th>'
    res += '<th>DESPACHO EN VENTA</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    //console.log(detallesVenta);

    for (var i = 0; i < detallesVenta.length; i++) {

        //var combo = fillNombreAlterno(detallesVenta[i].CODIGO, detallesVenta[i].PROD_NOMBRE_COMERCIAL, i, "N");

        res += '<tr id="' + detallesVenta[i].ITEM + '">'

        if (detallesVenta[i].CODE_DCTO_ORIGEN != "" && $("#cboDctoOrigen").val() == "0027") {
            res += '<td align="center"><a href="javascript:infoCustom2(\'Para eliminar este detalle debe cambiar de documento de origen!\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        } else {
            res += '<td align="center"><a href="javascript:Delete(\'' + detallesVenta[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        }

        res += '<td align="center">' + detallesVenta[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesVenta[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td>' + detallesVenta[i].NOMBRE_IMPRESION + '</td>'

        res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CANTIDAD + '</td>'//Elimnar esta línea cuando descomente lo que está abajo

        //DPORTA - EDITAR CANTIDAD EN DETALLE
        //if ($("#hfCompletoInd").val() == "N" && (detallesVenta[i].SERIADO == "N") && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si tiene el permiso y aún no está completado
        //    res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center"><input class="input2" type="text" onblur="ActualizaCantidad(this,this.value,\'' + i + '\')" value="' + detallesVenta[i].CANTIDAD + '" onkeypress="return ValidaDecimales(event,this,3)"/></td>'
        //}
        //else {
        //    res += '<td class="cantidad' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CANTIDAD + '</td>'
        //}

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'

        if (detallesVenta[i].PRECIO_IND == "E" && $("#hfCompletoInd").val() == "N" && $("#cboDctoOrigen").val() != "0027" && (detallesVenta[i].PROD_CODE_ANTIGUO.indexOf("AP") < 0)) {//Si es precio estandar es modificable
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

        res += '<td class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESC_ALMC + '</td>'

        res += '<td class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].CAT_DESC + '</td>'

        res += '<td class="almacen" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].DESP_VENTA + '</td>'

        res += '<td class="glosa" id="det' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].GLOSA + '</td>'

        res += '</tr>'

    }

    res += '</tbody>'
    res += '</table>'
    return res;
}


function fillNombreAlterno(codProd, nomProd, indice, tipo) {

    //console.log(codProd);
    //console.log(tipo);
    if (tipo == "N") {
        var comboProd = '<select class="slcNombProd" id="cboNombProd' + indice + '" data-placeholder="Seleccionar Empresa" tabindex="1" onchange="actualizarNomProd(this.value,' + indice + ')"><option value="' + nomProd + '">' + nomProd + '</option>';
    } else {
        if (tipo == "B") {
            var comboProd = '<select class="slcNombProd" id="cboNombProd' + indice + '" data-placeholder="Seleccionar Empresa" tabindex="1" onchange="actualizarNomProdBoni(this.value,' + indice + ')"><option value="' + nomProd + '">' + nomProd + '</option>';
        } else {
            var comboProd = '<select class="slcNombProd" id="cboNombProd' + indice + '" data-placeholder="Seleccionar Empresa" tabindex="1" onchange="actualizarNomProdMuestra(this.value,' + indice + ')"><option value="' + nomProd + '">' + nomProd + '</option>';
        }
    }


    var res = codProd.substring(0, 2);

    if (res != 'AP') {
        $.ajax({
            type: "post",
            url: "vistas/NM/ajax/NMMPROD.ashx?OPCION=LNA2&PROD_CODE=" + codProd,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        comboProd += '<option value="' + datos[i].NOMBRE_ALT + '">' + datos[i].NOMBRE_ALT + '</option>';
                    }
                }
            },
            error: function (msg) {
                noexitoCustom("Error al listar nombre alternativo.");
            }
        });

        comboProd += '</select>'

        return comboProd;
    } else {
        comboProd += '</select>'

        return comboProd;
    }


}


function actualizarNomProd(valor, indice) {
    detallesVenta[indice].NOMBRE_IMPRESION = valor;
}

function actualizarNomProdBoni(valor, indice) {
    detallesBonificacion[indice].NOMBRE_IMPRESION = valor;
}

function actualizarNomProdMuestra(valor, indice) {
    detallesMuestra[indice].NOMBRE_IMPRESION = valor;
}

function ObtenerTablaDetallesBonificacion() {
    var res = "";
    res = '<table id="tabla_det_boni" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th></th>'
    res += '<th>ITEM</th>'
    res += '<th>PRODUCTO</th>'
    res += '<th>DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>ALMACÉN</th>'
    //res += '<th>CATEGORIA CLIENTE</th>'
    res += '<th>DESPACHO EN VENTA</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesBonificacion.length; i++) {

        //var combo = fillNombreAlterno(detallesBonificacion[i].CODIGO, detallesBonificacion[i].NOMBRE_IMPRESION, i, 'B');

        res += '<tr id="' + detallesBonificacion[i].ITEM + '">'

        if (detallesBonificacion[i].CODE_DCTO_ORIGEN != "" && $("#cboDctoOrigen").val() == "0027") {
            res += '<td align="center"><a href="javascript:infoCustom2(\'Para eliminar este detalle debe cambiar de documento de origen!\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        } else {
            res += '<td align="center"><a href="javascript:DeleteBonificacion(\'' + detallesBonificacion[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        }

        res += '<td align="center">' + detallesBonificacion[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesBonificacion[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td style="width:70%">' + detallesBonificacion[i].NOMBRE_IMPRESION + '</td>'

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

        res += '<td class="almacen" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].DESC_ALMC + '</td>'

        //res += '<td class="almacen" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].CAT_DESC + '</td>'

        res += '<td class="almacen" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].DESP_VENTA + '</td>'

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
    res += '<th>DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>PU</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>ALMACÉN</th>'
    //res += '<th>CATEGORIA CLIENTE</th>'
    res += '<th>DESPACHO EN VENTA</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesBonificacion.length; i++) {

        //var combo = fillNombreAlterno(detallesBonificacion[i].CODIGO, detallesBonificacion[i].PROD_NOMBRE_COMERCIAL, i, 'B');

        res += '<tr id="' + detallesBonificacion[i].ITEM + '">'

        if (detallesBonificacion[i].CODE_DCTO_ORIGEN != "" && $("#cboDctoOrigen").val() == "0027") {
            res += '<td align="center"><a href="javascript:infoCustom2(\'Para eliminar este detalle debe cambiar de documento de origen!\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        } else {
            res += '<td align="center"><a href="javascript:DeleteBonificacion(\'' + detallesBonificacion[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        }

        res += '<td align="center">' + detallesBonificacion[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesBonificacion[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td style="width:70%">' + detallesBonificacion[i].NOMBRE_IMPRESION + '</td>'

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

        res += '<td class="almacen" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].DESC_ALMC + '</td>'

        //res += '<td class="almacen" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].CAT_DESC + '</td>'

        res += '<td class="almacen" id="det' + detallesBonificacion[i].ITEM + '" align="center">' + detallesBonificacion[i].DESP_VENTA + '</td>'

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
    res += '<th>DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>VALOR REFERENCIAL</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>ALMACÉN</th>'
    //res += '<th>CATEGORIA CLIENTE</th>'
    res += '<th>DESPACHO EN VENTA</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesMuestra.length; i++) {

        //var combo = fillNombreAlterno(detallesMuestra[i].CODIGO, detallesMuestra[i].NOMBRE_IMPRESION, i, 'M');
        res += '<tr id="' + detallesMuestra[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:DeleteMuestra(\'' + detallesMuestra[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesMuestra[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesMuestra[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td style="width:70%">' + detallesMuestra[i].NOMBRE_IMPRESION + '</td>'

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

        res += '<td class="almacen" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].DESC_ALMC + '</td>'

        //res += '<td class="almacen" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].CAT_DESC + '</td>'

        res += '<td class="almacen" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].DESP_VENTA + '</td>'

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
    res += '<th>DESCRIPCIÓN</th>'
    res += '<th>CANT.</th>'
    res += '<th>UNID.</th>'
    res += '<th>VALOR REFERENCIAL</th>'
    res += '<th>TOTAL BRUTO</th>'
    res += '<th>DESC.</th>'
    res += '<th>TOTAL NETO</th>'
    res += '<th>ISC</th>'
    res += '<th>DETRACCION</th>'
    res += '<th>ALMACÉN</th>'
    //res += '<th>CATEGORIA CLIENTE</th>'
    res += '<th>DESPACHO EN VENTA</th>'
    res += '<th>GLOSA</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesMuestra.length; i++) {

        //var combo = fillNombreAlterno(detallesMuestra[i].CODIGO, detallesMuestra[i].PROD_NOMBRE_COMERCIAL, i, 'M');
        res += '<tr id="' + detallesMuestra[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:DeleteMuestra(\'' + detallesMuestra[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'

        res += '<td align="center">' + detallesMuestra[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesMuestra[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td style="width:70%">' + detallesMuestra[i].NOMBRE_IMPRESION + '</td>'

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

        res += '<td class="almacen" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].DESC_ALMC + '</td>'

        //res += '<td class="almacen" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].CAT_DESC + '</td>'

        res += '<td class="almacen" id="det' + detallesMuestra[i].ITEM + '" align="center">' + detallesMuestra[i].DESP_VENTA + '</td>'

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

function Delete(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
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
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
    }
}

function DeleteBonificacion(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
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

        CalcularDetraccion();
        CalcularDatosMonetarios();
        $("#lblImporteCobrar").html($("#txt_monto_total").val());
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
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

        CalcularDetraccion();
        CalcularDatosMonetarios();
        $("#lblImporteCobrar").html($("#txt_monto_total").val());
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
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
            //}
        }
    }
}

// CALCULOS
function CalcularDetraccion() {

    if ($("#hfCompletoInd").val() == "N" && $("#cboDctoOrigen").val() != "0027") {

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
                /*$("#txt_detraccion").val(detraccionActual.toFixed(2));*/
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

    if ($("#hfCompletoInd").val() == "N" && $("#cboDctoOrigen").val() != "0027") {

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
                        //OP gravada:(GRA / GIS)
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
            igvCalc = opGravadaSinIGV * (parseFloat(igv) / 100);

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
                    if (importeTotal > prmtMontoRetnMoba) {//CAMBIO 
                        continuar = true;
                    }
                } else {
                    if (importeTotal > prmtMontoRetnMoal) {//CAMBIO
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
        $("#txt_subtotal").val(importeTotal.toFixed(2))//DPORTA
        $("#lblImporteCobrar").html($("#txt_monto_total").val());
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA

        $("#rbRedondeo").is(":checked") ? $("#txtRedondeo2").val($("#txtRedondeo").val()) : $("#txtRedondeo2").val("0.00");
        $("#rbDonacion").is(":checked") ? $("#txtDonacion2").val($("#txtDonacion").val()) : $("#txtDonacion2").val("0.00");
        //-------------

        if ($.trim($("#txt_detraccion").val()) == "") {
            $("#txt_detraccion").val("0.00");
        }
    }
}

// VALIDACIONES 
//function ValidarProductoAgregado(obj, precioUnidad, glosa) { //DPORTA VALIDACIÓN PARA CUANDO SE APRUEBE EL EDITAR EN EL DETALLE LA CANTIDAD 

//    if (agregarDetalle == "SI") {
//        for (var i = 0; i < detallesVenta.length; i++) {
//            if (detallesVenta[i].CODIGO == obj.CODIGO) {
//                if (detallesVenta[i].PRECIO_DETALLE == precioUnidad && detallesVenta[i].GLOSA == glosa) {
//                    infoCustom2("El producto ya se encuentra en el item: " + detallesVenta[i].ITEM + " con el mismo precio y glosa, puede modificarlo directamente en el detalle.");
//                    //infoCustom2("El producto ya ha sido agregado con el mismo precio y glosa, puede modificarlo directamente en el detalle.");
//                    return i;
//                }

//                if (detallesVenta[i].CODIGO == obj.CODIGO && detallesVenta[i].GLOSA == glosa && detallesVenta[i].CODE_UNIDAD == obj.CODE_UNIDAD && detallesVenta[i].PRECIO_DETALLE == precioUnidad) {
//                    infoCustom2("El producto ya se encuentra en el item: " + detallesVenta[i].ITEM + " con la misma glosa.");
//                    //infoCustom2("El producto ya ha sido agregado con la misma glosa");
//                    return i;
//                }
//            }
//        }
//        return -1;
//    } if (agregarDetalle == "NO") {
//        for (var i = 0; i < detallesVenta.length; i++) {
//            if (detallesVenta[i].CODIGO == obj.CODIGO) {
//                if (detallesVenta[i].ALMC == obj.ALMC) {
//                    return i;
//                }
//            }
//        }
//        return -1;
//    }
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

            let pLength = prodActual.RANGOS_PRECIO.length;
            if (typeof prodActual.RANGOS_PRECIO != "undefined" && pLength > 0) {

                let nCantidadVta = parseFloat($("#txt_cantidad").val());
                let sCodMoneda = $("#cbo_moneda").val();
                let nRango = 0;
                let nPrecio = 0;

                if (prodActual.MONEDA == sCodMoneda) {
                    //Moneda de producto coincide con la de cbo_moneda
                    let iIndice = -1;
                    let nRangoMax = -1;
                    for (let i = 0; i < pLength; i++) {
                        nRango = parseFloat(prodActual.RANGOS_PRECIO[i].RANGO);
                        if (nCantidadVta >= nRango) {
                            if (nRango >= nRangoMax) {
                                nRangoMax = nRango;
                                iIndice = i;
                            }
                        }
                    }
                    $("#txtPrecioUnitario").val("");
                    if (iIndice > -1) {
                        nPrecio = prodActual.RANGOS_PRECIO[iIndice].PRECIO;
                        $("#txtPrecioUnitario").val(nPrecio);
                    }
                }
                else {
                    //Moneda de producto no coincide con la de cbo_moneda
                    var valorCambio = parseFloat($("#txt_valor_cambio").val());
                    var precio;
                    if (prodActual.MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                        //Si es moneda base: convertir a MOAL
                        for (var i = pLength - 1; i >= 0; i--) {
                            if (nCantidadVta >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {
                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) / valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(prmtDIGP));
                                break;
                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || nCantidadVta < prodActual.RANGOS_PRECIO[0].RANGO) {
                            precio = parseFloat(prodActual.RANGOS_PRECIO[0].PRECIO) / valorCambio;
                            $("#txtPrecioUnitario").val(precio.toFixed(prmtDIGP));
                        }
                    }
                    else {
                        //Si es moneda alterna: convertir a MOBA
                        for (var i = pLength - 1; i >= 0; i--) {
                            if (nCantidadVta >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {
                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) * valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(prmtDIGP));
                                break;
                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || nCantidadVta < prodActual.RANGOS_PRECIO[0].RANGO) {
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

// MANTENIMIENTO DE DOCUMENTO VENTA
function GrabarDctoVenta() {
    //Desbloquea el boton para completar la venta
    //$("#div_btn_completar").attr("style", "display:inline");

    /*NOTA
    - Los correlativos no son obligatorios, en BD no se grabarán, necesita que el documento se complete
     para tomar un correlativo
    
    */
    //Validar Limite 

    CalcularDatosMonetarios();
    //Validaciones iniciales antes de guardado

    var continuar = false;

    try {
        if (parseFloat($("#lblImporteCobrar").text()) >= 0) {
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

    if ($("#cboDctoOrigen").val() != "") {
        //if (vErrors(['cboDocumentoVenta', 'cbo_direccion', 'cboVendedor', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txtCodDctoOrigen_1', 'txtSerieDctoOrigen_1', 'txtNroDctoOrigen_1'])) {
        if (vErrors(['cboDocumentoVenta', 'cbo_direccion', 'cboVendedor', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio'])) {
            continuar = true;
        } else {
            continuar = false;
        }
    } else {
        if (vErrors(['cboDocumentoVenta', 'cbo_direccion', 'cboVendedor', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio'])) {
            continuar = true;
        } else {
            continuar = false;
        }
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
    if (continuar) {
        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
        if (detallesVenta.length != 0) {
            var detalles = "";
            var detalles_bon = "";
            var detalles_mue = "";
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
                        detallesVenta[i].SERIADO + ";" +
                        detallesVenta[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE
                        'N' + ";" +
                        //detallesVenta[i].COSTO_PRODUCTO +  //COSTO EN MONEDA BASE
                        (detallesVenta[i].COSTO_PRODUCTO === undefined ? 0 : detallesVenta[i].COSTO_PRODUCTO) + ";" + //COSTO EN MONEDA BASE
                        detallesVenta[i].ALMC + ";" +
                        detallesVenta[i].CAT_CODE + ";" +
                        detallesVenta[i].DESP_VENTA +
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
                        detallesVenta[i].COSTO_PRODUCTO + ";" + //COSTO EN MONEDA BASE
                        detallesVenta[i].ALMC + ";" +
                        detallesVenta[i].CAT_CODE + ";" +
                        detallesVenta[i].DESP_VENTA +
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
                        detallesBonificacion[i].COSTO_PRODUCTO + ";" + //COSTO EN MONEDA BASE
                        detallesBonificacion[i].ALMC + ";" +
                        detallesBonificacion[i].CAT_CODE + ";" +
                        detallesBonificacion[i].DESP_VENTA +
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
                        detallesMuestra[i].COSTO_PRODUCTO + ";" +//COSTO EN MONEDA BASE
                        detallesMuestra[i].ALMC + ";" +
                        detallesMuestra[i].CAT_CODE + ";" +
                        detallesMuestra[i].DESP_VENTA +
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
            data.append('p_CMNT_DCTO', ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) ? "Venta de Mercaderia" : $("#txt_comentario").val().replace(/<\/?[^>]+(>|$)/gi, ""));
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
            data.append("p_IMPORTE_RETENCION", ($("#txt_Retencion").val() == "") ? "0.00" : $("#txt_Retencion").val());
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
            if ($("#cboDctoOrigen").val() != "") {
                data.append('p_DCTO_CODE_REF', $("#cboDctoOrigen").select2("val"));
                data.append('p_CODE_REF', $("#txt_cod_doc_orig").val());
                data.append('p_DCTO_SERIE_REF', $("#txt_num_ser_orig").val());
                data.append('p_DCTO_NUM_REF', $("#txt_num_doc_orig").val());
            }
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
            data.append('p_DETALLES_BONI', detalles_bon);
            data.append('p_DETALLES_MUESTRA', detalles_mue);
            data.append('p_DIRECCION', $("#cbo_direccion option:selected").text());
            data.append('p_LATITUD', $("#cbo_direccion option:selected").attr("latitud"));
            data.append('p_LONGITUD', $("#cbo_direccion option:selected").attr("longitud"));

            if (isNaN(total_boni)) { total_boni = "0" }
            data.append('p_TOTAL_GRATUITAS', total_boni);


            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=5",
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
                                $("#div_btn_completar").attr("style", "display:inline");
                                $("#txtNumDctoComp").val(datos[0].CODIGO);

                                $('.buscar, .add, .remove').css('display', 'none');
                                $('#cboSerieDocVenta').removeAttr('disabled');
                                $('#cboNroDocVenta').removeAttr('disabled');
                                $('#cbo_Empresa').attr('disabled', 'disabled');

                                if ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) {
                                    $("#txt_comentario").val("Venta de Mercaderia");
                                }
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
            alertCustom("Ingrese al menos 1 detalle!");
        }
    }
}




function GrabarCompletarDctoVenta() {
    /*
   - Esta función modifica y completa el documento si ya ha sido grabado previamente, o inserta un nuevo documento en caso
   el documento no aún no esté grabado   
   */
    var current_nro_lineas = parseInt($("#cboSerieDocVenta :selected").attr("data-lineas"));

    var current_filas_table = (obtenerNumeroItems($("#tabla_det")) !== null) ? obtenerNumeroItems($("#tabla_det")) : 0;
    var current_filas_bonificacion = (obtenerNumeroItems($("#tabla_det_boni")) !== null) ? obtenerNumeroItems($("#tabla_det_boni")) : 0;
    var current_filas_muestra = (obtenerNumeroItems($("#tabla_det_muestra")) !== null) ? obtenerNumeroItems($("#tabla_det_muestra")) : 0;
    var current_filas_total = (current_filas_table + current_filas_bonificacion + current_filas_muestra);

    if (current_nro_lineas < current_filas_total) {
        limitItems = true;
    } else {
        limitItems = false;
    }

    if (limitItems) {

        var current_nro_lineas = parseInt($("#cboSerieDocVenta :selected").attr("data-lineas"));
        infoCustom2("Debe de eliminar items, el tipo de documento éstá configurado para registrar sólo " + current_nro_lineas + " items.");
        return;

    } else {
        var continuar = false;
        try {
            if (parseFloat($("#lblImporteCobrar").text()) >= 0) {
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
            //var continuar = false;
            if ($("#cboDctoOrigen").val() != "") {
                if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'cbo_direccion', 'txtClientes', 'cboDocumentoVenta', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'cboSerieDocVenta', 'txtNroDocVenta', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txt_cod_doc_orig', 'txt_num_ser_orig', 'txt_num_doc_orig'])) {
                    continuar = true;
                } else {
                    continuar = false;
                }
            } else {
                if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'cbo_direccion', 'txtClientes', 'cboDocumentoVenta', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'cboSerieDocVenta', 'txtNroDocVenta', 'txt_valor_cambio_Oficial', 'txt_valor_cambio'])) {
                    continuar = true;
                } else {
                    continuar = false;
                }
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
                                //detallesVenta[i].COSTO_PRODUCTO +  //COSTO EN MONEDA BASE
                                'N' + ";" +
                                (detallesVenta[i].COSTO_PRODUCTO === undefined ? 0 : detallesVenta[i].COSTO_PRODUCTO) + ";" +  //COSTO EN MONEDA BASE
                                detallesVenta[i].ALMC + ";" +
                                detallesVenta[i].CAT_CODE + ";" +
                                detallesVenta[i].DESP_VENTA +
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
                                (detallesVenta[i].COSTO_PRODUCTO === undefined ? 0 : detallesVenta[i].COSTO_PRODUCTO) + ";" +//COSTO EN MONEDA BASE
                                detallesVenta[i].ALMC + ";" +
                                detallesVenta[i].CAT_CODE + ";" +
                                detallesVenta[i].DESP_VENTA +
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
                                // detallesVenta[i].TOTAL_BRUTO + ";" +
                                // detallesVenta[i].CONVERT_TOTAL_BRUTO + ";" +
                                detallesBonificacion[i].TIPO_PROD + ";" +
                                detallesBonificacion[i].SERIADO + ";" +
                                detallesBonificacion[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE
                                (detallesBonificacion[i].COSTO_PRODUCTO === undefined ? 0 : detallesBonificacion[i].COSTO_PRODUCTO) + ";" + //COSTO EN MONEDA BASE
                                detallesBonificacion[i].ALMC + ";" +
                                detallesBonificacion[i].CAT_CODE + ";" +
                                detallesBonificacion[i].DESP_VENTA +

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
                                (detallesMuestra[i].COSTO_PRODUCTO === undefined ? 0 : detallesMuestra[i].COSTO_PRODUCTO) + ";" + //COSTO EN MONEDA BASE
                                detallesMuestra[i].ALMC + ";" +
                                detallesMuestra[i].CAT_CODE + ";" +
                                detallesMuestra[i].DESP_VENTA +
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
                    data.append('p_CMNT_DCTO', ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) ? "Venta de Mercaderia" : $("#txt_comentario").val().replace(/<\/?[^>]+(>|$)/gi, ""));
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
                    data.append("p_IMPORTE_RETENCION", ($("#txt_Retencion").val() == "") ? "0.00" : $("#txt_Retencion").val());
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
                    if ($("#cboDctoOrigen").val() != "") {
                        data.append('p_DCTO_CODE_REF', $("#cboDctoOrigen").select2("val"));
                        data.append('p_CODE_REF', $("#txt_cod_doc_orig").val());
                        data.append('p_DCTO_SERIE_REF', $("#txt_num_ser_orig").val());
                        data.append('p_DCTO_NUM_REF', $("#txt_num_doc_orig").val());
                    }
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
                    data.append('p_DETALLES_BONI', detalles_bon);
                    data.append('p_DETALLES_MUESTRA', detalles_mue);
                    data.append('p_DIRECCION', $("#cbo_direccion option:selected").text());
                    data.append('p_LATITUD', $("#cbo_direccion option:selected").attr("latitud"));
                    data.append('p_LONGITUD', $("#cbo_direccion option:selected").attr("longitud"));


                    if (isNaN(total_boni)) { total_boni = "0" }
                    data.append('p_TOTAL_GRATUITAS', total_boni);

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=5",
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
                                    } else {
                                        exito();
                                        if (datos[0].MSGERROR.indexOf("ERROR") >= 0) {
                                            alertCustom(datos[0].MSGERROR);
                                        }
                                        //COMPLETAR
                                        $("#hfCompletoInd").val("S")
                                        $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                                        $("#divBtnsMantenimiento").attr("style", "display:none");
                                        $("#btnBuscadocs").attr("style", "display:none");
                                        $(".btnEliminarDetalle").attr("style", "display:none");

                                        $("#cbo_modo_pago").prop("disabled", true);

                                        $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                                        $(".btnImprimir").show();
                                        $('#btnMail').removeClass('hidden');
                                        $('#btnWhatsapp').removeClass('hidden');
                                        $("#btnPdfAlt").removeClass('hidden');
                                        //$('#btnEFac').removeClass('hidden');
                                        $("#lblCopia").css("display", "inline-block");
                                        $("#txtNumDctoComp").val(datos[0].CODIGO);
                                        //EL CODIGO GLOBAL OBTIENE EL CODIGO DE LA VENTA
                                        //codigodctoglobal = datos[0].CODIGO;
                                        if ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) {
                                            $("#txt_comentario").val("Venta de Mercaderia");
                                        }

                                        BloquearCampos();
                                        if (prmtACON == "SI") {
                                            var sCodVenta = $("#txtNumDctoComp").val();
                                            sCodVenta = $.trim(sCodVenta);
                                            var oDocVta = fnGetDocVta(sCodVenta);
                                            vAsientoContable.sCodDoc = sCodVenta;
                                            vAsientoContable.objDoc = oDocVta;

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
                        });

                } else {
                    alertCustom("Ingrese al menos 1 detalle!");
                }
            }
        } else {//MODIFICA
            CompletarDctoVenta();
        }
    }
    //CODIGO PARA GENERAR EL CODIGOQR
    //var formato = $("#cboSerieDocVenta :selected").attr("data-formato");
    //if (formato == 'E') {//SI ES ELECTRÓNICO
    //    var miCodigoQR = new QRCode("codigoQR");
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPCQR&p_FVBVTAC_CODE=" + $("#txtNumDctoComp").val(), //codigodctoglobal -- CUANDO SE DA PRIMERO EN EL BOTON COMPLETAR
    //        async: false,
    //        success: function (datos) {

    //            if (datos != "") {
    //                var cadena;
    //                cadena =
    //                    datos[0].RUC_EMISOR + "|" +
    //                    datos[0].CODIGO_DOC + "|" +
    //                    datos[0].SERIE + "|" +
    //                    datos[0].NUMERO + "|" +
    //                    datos[0].TOTAL_IGV + "|" +
    //                    datos[0].IMPORTE_TOTAL + "|" +
    //                    datos[0].FECHA_EMISION + "|" +
    //                    datos[0].TIPO_DOC_ADQUIRIENTE + "|" +
    //                    datos[0].NUMERO_DOC_ADQUIRIENTE

    //                miCodigoQR.makeCode(cadena);
    //                setTimeout(guardarQR, 100);
    //                // guardarQR();
    //                return false;
    //            }
    //        },
    //        error: function (msg) {
    //            alertCustom("No se generó correctamente el QR!")
    //        }
    //    });
    //    $('#codigoQR').hide();
    //}
};

function ActualizarDctoVenta() {
    CalcularDatosMonetarios();
    //Validaciones iniciales antes de guardado
    var continuar = false;
    if ($("#cboDctoOrigen").val() != "") {
        if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'cbo_direccion', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txt_cod_doc_orig', 'txt_num_ser_orig', 'txt_num_doc_orig'])) {
            continuar = true;
        } else {
            continuar = false;
        }
    } else {
        if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'cbo_direccion', 'txtClientes', 'txtNroDctoCliente', 'cbo_Empresa', 'cbo_Sucursal', 'txt_valor_cambio_Oficial', 'txt_valor_cambio'])) {
            continuar = true;
        } else {
            continuar = false;
        }
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
    if (continuar) {

        //console.log(detallesVenta);
        //console.log(detallesBonificacion);
        //console.log(detallesMuestra);



        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
        if (detallesVenta.length != 0) {
            //Bloquear("ventana");
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
                        //detallesVenta[i].COSTO_PRODUCTO +  //COSTO EN MONEDA BASE
                        (detallesVenta[i].COSTO_PRODUCTO === undefined ? 0 : detallesVenta[i].COSTO_PRODUCTO) + ";" +//COSTO EN MONEDA BASE
                        detallesVenta[i].ALMC + ";" +
                        detallesVenta[i].CAT_CODE + ";" +
                        detallesVenta[i].DESP_VENTA +
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
                        detallesVenta[i].COSTO_PRODUCTO + ";" +//COSTO EN MONEDA BASE
                        detallesVenta[i].ALMC + ";" +
                        detallesVenta[i].CAT_CODE + ";" +
                        detallesVenta[i].DESP_VENTA +
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
                        detallesBonificacion[i].COSTO_PRODUCTO + ";" + //COSTO EN MONEDA BASE
                        detallesBonificacion[i].ALMC + ";" +
                        detallesBonificacion[i].CAT_CODE + ";" +
                        detallesBonificacion[i].DESP_VENTA +
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
                        detallesMuestra[i].COSTO_PRODUCTO + ";" + //COSTO EN MONEDA BASE
                        detallesMuestra[i].ALMC + ";" +
                        detallesMuestra[i].CAT_CODE + ";" +
                        detallesMuestra[i].DESP_VENTA +
                        "|";
                }
            }
            var data = new FormData();
            data.append('p_CODE', $("#txtNumDctoComp").val());
            data.append('p_NUM_SERIE', ($("#cboSerieDocVenta :selected").html() == undefined) ? "" : $("#cboSerieDocVenta :selected").html());
            data.append('p_NUM_DCTO', $("#txtNroDocVenta").val());
            data.append('p_DCTO_CODE', $("#cboDocumentoVenta").val());
            data.append('p_FECHA_EMISION', $("#txt_fec_emision").val());
            data.append('p_FECHA_TRANS', $("#txt_fec_transaccion").val());
            data.append('p_FECHA_VENCIMIENTO', $("#txt_fec_vencimiento").val());
            data.append('p_CMNT_DCTO', ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) ? "Venta de Mercaderia" : $("#txt_comentario").val().replace(/<\/?[^>]+(>|$)/gi, ""));
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
            data.append("p_IMPORTE_RETENCION", ($("#txt_Retencion").val() == "") ? "0.00" : $("#txt_Retencion").val());
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
            if ($("#cboDctoOrigen").val() != "") {
                data.append('p_DCTO_CODE_REF', $("#cboDctoOrigen").select2("val"));
                data.append('p_CODE_REF', $("#txt_cod_doc_orig").val());
                data.append('p_DCTO_SERIE_REF', $("#txt_num_ser_orig").val());
                data.append('p_DCTO_NUM_REF', $("#txt_num_doc_orig").val());
            }
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
            data.append('p_DETALLES_BONI', detalles_bon);
            data.append('p_DETALLES_MUESTRA', detalles_mue);

            data.append('p_DIRECCION', $("#cbo_direccion option:selected").text());
            data.append('p_LATITUD', $("#cbo_direccion option:selected").attr("latitud"));
            data.append('p_LONGITUD', $("#cbo_direccion option:selected").attr("longitud"));

            if (isNaN(total_boni)) { total_boni = "0" }
            data.append('p_TOTAL_GRATUITAS', total_boni);

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=7",
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
                                //$('#cboSerieDocVenta').attr('disabled', 'disabled');                         
                                //$('#cbo_SerieDocVenta').attr('disabled', 'disabled');

                                if ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) {
                                    $("#txt_comentario").val("Venta de Mercaderia");
                                }

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
            alertCustom("Ingrese al menos 1 detalle!");
        }
    }
}

function CompletarDctoVenta() {
    //Completa un documento que ha sido grabado anteriormente
    CalcularDatosMonetarios();
    //Validaciones iniciales antes de guardado

    var continuar = false;
    try {
        if (parseFloat($("#lblImporteCobrar").text()) >= 0) {
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


    if ($("#cboDctoOrigen").val() != "") {
        if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'cbo_direccion', 'txtClientes', 'cboDocumentoVenta', 'cbo_Empresa', 'txtNroDctoCliente', 'cbo_Sucursal', 'cboSerieDocVenta', 'txtNroDocVenta', 'txt_valor_cambio_Oficial', 'txt_valor_cambio', 'txt_cod_doc_orig', 'txt_num_ser_orig', 'txt_num_doc_orig'])) {
            continuar = true;
        } else {
            continuar = false;
        }
    } else {
        if (vErrors(['cboDocumentoVenta', 'cboVendedor', 'cbo_direccion', 'txtClientes', 'cboDocumentoVenta', 'cbo_Empresa', 'txtNroDctoCliente', 'cbo_Sucursal', 'cboSerieDocVenta', 'txtNroDocVenta', 'txt_valor_cambio_Oficial', 'txt_valor_cambio'])) {
            continuar = true;
        } else {
            continuar = false;
        }
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

    if (continuar) {
        var valorCambio = parseFloat($("#txt_valor_cambio").val());
        var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());
        if (detallesVenta.length != 0) {
            var detalles = "";
            var detalles_bon = "";
            var detalles_mue = "";
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
                        (detallesVenta[i].COSTO_PRODUCTO === undefined ? 0 : detallesVenta[i].COSTO_PRODUCTO) + ";" +  //COSTO EN MONEDA BASE
                        detallesVenta[i].ALMC + ";" +
                        detallesVenta[i].CAT_CODE + ";" +
                        detallesVenta[i].DESP_VENTA +
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
                        (detallesBonificacion[i].COSTO_PRODUCTO === undefined ? 0 : detallesBonificacion[i].COSTO_PRODUCTO) + ";" + //COSTO EN MONEDA BASE
                        detallesBonificacion[i].ALMC + ";" +
                        detallesBonificacion[i].CAT_CODE + ";" +
                        detallesBonificacion[i].DESP_VENTA +
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
                        (detallesMuestra[i].COSTO_PRODUCTO === undefined ? 0 : detallesMuestra[i].COSTO_PRODUCTO) + ";" + //COSTO EN MONEDA BASE
                        detallesMuestra[i].ALMC + ";" +
                        detallesMuestra[i].CAT_CODE + ";" +
                        detallesMuestra[i].DESP_VENTA +
                        "|";
                }
            }

            var data = new FormData();
            data.append('p_CODE', $("#txtNumDctoComp").val());
            data.append('p_NUM_SERIE', ($("#cboSerieDocVenta :selected").html() == undefined) ? "" : $("#cboSerieDocVenta :selected").html());
            data.append('p_NUM_DCTO', $("#txtNroDocVenta").val());
            data.append('p_DCTO_CODE', $("#cboDocumentoVenta").val());
            data.append('p_FECHA_EMISION', $("#txt_fec_emision").val());
            data.append('p_FECHA_TRANS', $("#txt_fec_transaccion").val());
            data.append('p_FECHA_VENCIMIENTO', $("#txt_fec_vencimiento").val());
            data.append('p_CMNT_DCTO', ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) ? "Venta de Mercaderia" : $("#txt_comentario").val().replace(/<\/?[^>]+(>|$)/gi, ""));
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
            data.append("p_IMPORTE_RETENCION", ($("#txt_Retencion").val() == "") ? "0.00" : $("#txt_Retencion").val());
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
            if ($("#cboDctoOrigen").val() != "") {
                data.append('p_DCTO_CODE_REF', $("#cboDctoOrigen").select2("val"));
                data.append('p_CODE_REF', $("#txt_cod_doc_orig").val());
                data.append('p_DCTO_SERIE_REF', $("#txt_num_ser_orig").val());
                data.append('p_DCTO_NUM_REF', $("#txt_num_doc_orig").val());
            }
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
            data.append('p_DETALLES_BONI', detalles_bon);
            data.append('p_DETALLES_MUESTRA', detalles_mue);
            data.append('p_DIRECCION', $("#cbo_direccion option:selected").text());
            data.append('p_LATITUD', $("#cbo_direccion option:selected").attr("latitud"));
            data.append('p_LONGITUD', $("#cbo_direccion option:selected").attr("longitud"));

            if (isNaN(total_boni)) { total_boni = "0" }
            data.append('p_TOTAL_GRATUITAS', total_boni);

            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=8",
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

                            } else {
                                exito();
                                if (datos[0].MSGERROR.indexOf("ERROR") >= 0) {
                                    alertCustom(datos[0].MSGERROR);
                                } else {
                                    //COMPLETAR
                                    $("#hfCompletoInd").val("S")
                                    $("#grabar").attr("href", "javascript:ActualizarDctoVenta();");
                                    $("#divBtnsMantenimiento").attr("style", "display:none");
                                    $("#btnBuscadocs").attr("style", "display:none");
                                    $(".btnEliminarDetalle").attr("style", "display:none");

                                    $("#btnImprimir").attr("style", "display:inline-block;margin-top:2px;");
                                    $(".btnImprimir").show();
                                    $('#btnMail').removeClass('hidden');
                                    $("#btnPdfAlt").removeClass('hidden');
                                    $('#btnWhatsapp').removeClass('hidden');
                                    $("#lblCopia").css("display", "inline-block");
                                    $("#txtNumDctoComp").val(datos[0].CODIGO);

                                    if ($("#txt_comentario").val() == "" || $("#txt_comentario").val().length == 0) {
                                        $("#txt_comentario").val("Venta de Mercaderia");
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
                                    if (prmtACON == "SI") {
                                        var sCodVenta = $("#txtNumDctoComp").val();
                                        sCodVenta = $.trim(sCodVenta);
                                        var oDocVta = fnGetDocVta(sCodVenta);
                                        vAsientoContable.sCodDoc = sCodVenta;
                                        vAsientoContable.objDoc = oDocVta;

                                        $('#btnGenerarAsiento').click();
                                    }
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
                });

        } else {
            alertCustom("Ingrese al menos 1 detalle!");
        }
    }
}

//function guardarQR() {
//    //CAPTURA LA IMAGEN DEL QR CODIFICADA EN BASE64 
//    var NombreQR = $('#codigoQR img').attr('src');

//    var qrData = new FormData();
//    qrData.append('p_IMGQR', NombreQR);

//    $.ajax({
//        type: "post",
//        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=GQR_VENTA&p_FVBVTAC_CODE=" + $("#txtNumDctoComp").val(),
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
    data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "La operación NO se ha realizado correctamente!")
    data.append('p_CTLG_CODE', $("#cbo_Empresa").val());

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

    //Bloquear("ventana");
    //let ticket = $("#cboSerieDocVenta :selected").attr("data-ticket");//DPORTA

    //if (ticket == 'SI') {
    //    //if (verificarFormatoTicket($("#cboDocumentoVenta").val()) == '[{"FORMATO_TICKET" :"SI"}]') {
    //    var data = new FormData();
    //    data.append('p_CODE', $("#txtNumDctoComp").val());
    //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //    data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "La operación NO se ha realizado correctamente!")
    //    data.append('p_CTLG_CODE', $("#cbo_Empresa").val());

    //    var jqxhr = $.ajax({
    //        type: "POST",
    //        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
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
    //            //Desbloquear("ventana");
    //        })
    //        .error(function () {
    //            //Desbloquear("ventana");
    //            noexito();
    //        });
    //} else {
    //    //if ($("#cboDocumentoVenta").val() == '0012' || $("#cboDocumentoVenta :selected").html().indexOf("TICKET") >= 0 || $("#cboDocumentoVenta").val() == '0101' || $("#cboDocumentoVenta").val() == '0001' || $("#cboDocumentoVenta").val() == '0003') {

    //    //    var data = new FormData();
    //    //    data.append('p_CODE', $("#txtNumDctoComp").val());
    //    //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //    //    data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    //    //    data.append('p_CTLG_CODE', $("#cbo_Empresa").val());

    //    //    var jqxhr = $.ajax({
    //    //        type: "POST",
    //    //        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
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
    //    //            //Desbloquear("ventana");
    //    //        })
    //    //        .error(function () {
    //    //            //Desbloquear("ventana");
    //    //            noexito();
    //    //        });
    //    //} else {
    //    //    crearImpresion($("#txtNumDctoComp").val());
    //    //    //Desbloquear("ventana");
    //    //}
    //    crearImpresion($("#txtNumDctoComp").val());
    //}
}

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
    //    //    //Desbloquear("ventana");
    //    //}
    //}
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

//P En proceso de desarrollo , Busca un documento de origen y llena los campos serie-numero
var buscarDocumento = function (btnBuscar) {
    if ($("#cboDctoOrigen").val() != "") {
        if (vErrors(['txtClientes', 'cboDctoOrigen', 'cbo_Empresa', 'cbo_Sucursal'])) {
            $('#tblDocumentos').DataTable().destroy();

            var data = new FormData();
            data.append('TIPO_DCTO', $('#cboDctoOrigen').val());
            data.append('CTLG_CODE', $('#cbo_Empresa').val());
            data.append('PIDM', $('#hfPIDM').val());
            if ($("#cboDctoOrigen").val() == "0027" || $("#cboDctoOrigen").val() == "0053") {
                data.append('SCSL', $('#cbo_Sucursal').val());
            }
            //  cboDctoOrigen               
            //  0027>O/C CLIENTE  0053>COTIZACIÓN CLIENTE
            //  0050>GUIA SALIDA  0009>REMISION REMITENTE 
            var tbody = $('#tblDocumentos').find('tbody');
            var jqxhr = $.ajax({
                type: 'POST',
                url: 'vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCS',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            }).success(function (datos) {
                tbody.html('');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        tbody.append('<tr><td style="text-align: center">' + datos[i].CODIGO + '</td><td style="text-align: center">' + datos[i].NRO_DOCUMENTO + '</td><td style="text-align: center">' + datos[i].CLIENTE + '</td><td style="text-align: center">' + datos[i].MONEDA + '</td></tr>');
                    }
                }
            }).error(function () {
                alertCustom(msg);
            });


            tabla = $('#tblDocumentos').dataTable({ info: false, responsive: true, order: [[0, 'desc']], ordering: false });
            $(tbody).css('cursor', 'pointer');

            $('#tblDocumentos_wrapper').find(':last').remove();
            $('#divBuscarDoc').modal('show');

            tbody.unbind('click');
            tbody.on('click', 'tr', function () {
                $(this).addClass('selected');
                var indice = tabla.fnGetPosition(this);
                var fila = tabla.fnGetData(indice);
                try {
                    var cod_doc = fila[0];
                    var mone = fila[3];
                    var nro_doc = fila[1].split('-');
                    var serie = nro_doc[0];
                    var nro = nro_doc[1];
                    if ($("#txt_cod_doc_orig").val() != "") {
                        EliminarDatosDocumentoOrigen("S");
                    }
                    if (typeof cod_doc != "undefined") {
                        $("#txt_cod_doc_orig").val(cod_doc);
                        $("#txt_num_ser_orig").val(serie);
                        $("#txt_num_doc_orig").val(nro);
                        $("#cbo_moneda").select2("val", mone).change();
                        $('#divBuscarDoc').modal('hide');
                        CargarDatosDocumentoOrigen();
                    }
                } catch (e) { }
            });
        }
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
            /*console.log(datos);*/
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
    window.location.href = '?f=NVMDOCV';
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
    $("#cboDctoOrigen").attr("disabled", "disabled");
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
    //TO DO
    // $("#cbo_modo_pago").attr("disabled", "disabled");

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

    $("#lbl_chk_boni").css("display", "none");


    $("#cbo_direccion").attr("disabled", true);

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

var NuevaVenta = function () {
    window.location.href = '?f=NVMDOCV'
    //Bloquear("ventana");
    //$("#lblContraentrega").hide();
    //window.history.pushState("Object", "DOCUMENTO VENTA", "/Default.aspx?f=nvmdocv");
    //$("#hfResponsablePagoPIDM,#hfPIDM,#hfRUC,#hfCodigoTipoDocumento,#hfTipoDocumento,#hfNroDocumento,#hfTIPO_INSERT,#hfCOD_PROD,#hfProdSeriado,#hfCodigoCategoriaCliente,#hfAgenteRetencionCliente,#hfDIR,#hfDNI").val("");
    //seleccionados = new Array();
    //$("#hfIMPUESTO,#hfCreditoDispMoba,#hfCreditoDispMoal,#hfParamDetraccion,#hfParamRetencion,#hfporcentaje_detraccion").val("0.00");
    //$("#hfImprimirPreciosIGV,#hfCompletoInd").val("N");
    //$("#hfParamRedondeo").val("EST");
    //$("#divDctoImprimir").html("");

    //$('#txt_fec_emision, #txt_fec_transaccion,#txt_fec_vencimiento').datepicker("setDate", "now");
    //$('#txtFechaGiro, #txtFechaRegistro').datepicker();
    //CargarFactorImpuestoRentaVenta();

    //$("#txtNumDctoComp,#txtClientes,#txtNroDctoCliente,#txt_estado_credito").val("")
    //$("#txtNumSec").val("1")

    //fillCboVendedor($('#cbo_Empresa').val(), $('#cbo_Sucursal').val(), "A", true);

    //LimpiarCamposDetalle();
    //detallesVenta = [];
    //detallesBonificacion = [];
    //detallesMuestra = [];
    //ListarTablaDetalles(ObtenerTablaDetalles());
    //ListarTablaDetallesBonificacion(ObtenerTablaDetallesBonificacion());
    //ListarTablaDetallesMuestra(ObtenerTablaDetallesMuestra());

    //$("#cbo_modo_pago").attr('disabled', false);
    //$($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
    //$('#chk_retencion, #txt_Retencion, #txt_num_comp_reten,#txt_fec_comp_reten').prop('disabled', true);
    //$('#chk_retencion').parent().removeClass('checked');

    //$("#txt_comentario").removeAttr("readonly").val("");

    //$("#rbDonacion,#rbRedondeo").prop("checked", false).parent().removeClass('checked');
    //$("#chkResponsablePago").removeAttr("disabled");

    //$('#cbo_modo_pago option:first-child').prop('selected', true);
    //$('#cbo_modo_pago').change();
    //$('#txt_plazo_pago').val('0');
    //$('#cboTipoDoc').val('1').change();
    //$("#cboTipoDoc,#txtNroDctoCliente").removeAttr("disabled");
    ////$('#cboTipoDoc').prop('disabled', true);
    //$("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");
    //$("#txtResponsablePago").val("").attr("disabled", "disabled");
    //$("#chkResponsablePago").prop("checked", false).parent().removeClass('checked');
    //$('#cboDocumentoVenta').attr("disabled", "disabled");
    //$('#cboDocumentoVenta').select2("val", "");
    //$('#cboSerieDocVenta').attr("disabled", "disabled");
    //$('#cboSerieDocVenta').empty().append('<option></option>').select2("val", "");
    //$("#lblTipoCorrelativo").html("");
    //$("#txtNroDocVenta,#txt_num_ser_orig,#txt_num_doc_orig,#txt_cod_doc_orig").val("");
    //$("#cbo_Empresa,#cbo_Sucursal,#cboVendedor,#cboDctoOrigen,#txtNroDctoCliente").removeAttr("disabled");
    //$("#txt_fec_emision,#txtClientes").removeAttr("disabled");
    //$("#btnBuscadocs").attr("style", "display:inline-block;");
    //$("#div_btn_completar,#btnImprimir").attr("style", "display:none;");
    //$(".btnImprimir").hide();
    //$('#btnMail').addClass('hidden');
    //$("#lblCopia").css("display", "none");
    //$("#divBtnsMantenimiento,#divAgregarProducto,#lbl_fec_vig,#txt_fec_vig,#lbl_fec_vig_Oficial,#txt_fec_vig_Oficial,#input_fec_vig_Oficial,#input_fec_vig,#div_btn_add_prods").attr("style", "display:block;");
    //$("#A1").attr("style", "display:block;margin-right: 5px;");
    //$("#A2").attr("style", "display:block;");
    //$("#grabar").attr("href", "javascript:GrabarDctoVenta();");
    //$("#grabar").html("<i class='icon-save'></i> Grabar");
    //$("#div_tabla_det").html("");
    //$("#lblImporteCobrar").html("0.00");

    //$("input").parent().parent().removeClass("error");
    //$("select").parent().parent().removeClass("error");
    //$(".icon-ok").parent().remove();
    //$("#cboDctoOrigen").select2("val", "").removeAttr("disabled").change();
    //$("#tabDatosGenerales").click();
    //$("#rbRedondeo,#rbDonacion").removeAttr("disabled");
    //$('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten,#txt_cta_detrac').val("");

    //$("#divIndicadores").attr("style", "display:none;");

    //$("#porlet_boni").css("display", "none")

    //$("#porlet_muestra").css("display", "none")


    //$("#lbl_chk_boni").css("display", "block");
    //$("#chkBonificacion").prop('checked', false).parent().removeClass('checked');

    //aux_predeterminado = false;

    //cargarParametrosSistema();
    //CalcularDetraccion();
    //CalcularDatosMonetarios();

    //$("#cbo_direccion").attr("disabled", false);
    //$("#cbo_direccion").empty().html("<option></option>")
    //$("#cbo_direccion").select2("val", "")
    //carga_ini_ind = false;

    //fillcboMoneda();
    //$('#cbo_moneda').attr("disabled", false);

    //$("#cbo_Sucursal").change();

    //vAsientoContable.limpiar();

    //setTimeout(function () {
    //    Desbloquear("ventana");
    //}, 200);
}


function CargarCabeceraDocumentoOrigen() {
    var data = new FormData();
    data.append('p_CODE_REF', $("#txt_cod_doc_orig").val());
    data.append('TIPO_DCTO', $("#cboDctoOrigen").val());
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCABSD",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (datos) {
            $("#cbo_modo_pago").select2("val", datos[0].TIPO_PAGO).change();
        })
        .error(function () {
        });

}

//Cargar documentos de origen
function CargarDatosDocumentoOrigen() {
    cargaDctoOrigenInd = true;
    //, function () { $("#gritter-notice-wrapper").find(".gritter-info2").fadeOut(1500) }
    //CARGAR DATOS CABECERA DEL DOCUMENTO DE ORIGEN
    if ($("#cboDctoOrigen").val() == "0027") {
        infoCustom2("Cargando datos y detalles del documento ...");
        CargarOrdenCompraCliente();
    } else {
        infoCustom2("Cargando detalles...");
    }
    var nroDetallesInsertados = 0;
    var detallesDctoOrigen = [];
    var detallesDctoOrigenBoni = [];
    var detallesDctoOrigenMuestra = [];
    var data = new FormData();
    data.append('p_CODE_REF', $("#txt_cod_doc_orig").val());
    data.append('TIPO_DCTO', $("#cboDctoOrigen").val());
    //Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCSD",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (datos) {
            //Desbloquear("ventana");
            if (datos != null && datos != "") {
                for (var i = 0; i < datos.length; i++) {

                    if ((datos[i].CODIGO).substring(0, 2) == 'AP') {
                        let objProd2 = ObtenerAnticipoCompleto(datos[i].CODIGO);
                        detallesDctoOrigen.push(objProd2);
                        nroDetallesInsertados++;
                    } else {
                        //--------------------------------------------------------------------------
                        LimpiarCamposDetalle();
                        prodActual = ObtenerProductoCompleto(datos[i].PROD_CODE, $("#hfPIDM").val());
                        $("#hfCostoProducto").val(prodActual.COSTO_PRODUCTO);
                        ActualizarCamposPrecios();
                        //---------------------------------------------------------------------------
                        $("#txtClientes").attr("disabled", "disabled");
                        $("#txtNroDctoCliente").attr("disabled", "disabled");
                        $("#cboTipoDoc").attr("disabled", "disabled");
                        $("#txt_glosa_det").val("Ingresado por Dcto. Origen");

                        //OBTENER TODOS LOS DETALLES TAL CUAL SON
                        if ($("#cboDctoOrigen").val() == "0027") {
                            //  0027 O/C CLIENTE 
                            $("#hfCOD_PROD").val(datos[i].PROD_CODE)
                            $("#txt_cod_a_producto").val(datos[i].CODIGO_ANTIGUO)
                            $("#txt_desc_producto").val(datos[i].NOMBRE_IMPRESION);
                            $("#txt_cantidad").val(datos[i].CANTIDAD).keyup();//Actualiza el precio unitario y el descuento

                            fillcboUniMedida(prodActual.TIPO_DE_UNIDAD)
                            $("#cbo_und_medida").select2("val", prodActual.CODE_UNIDAD);

                            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                                $("#txtPrecioUnitario").val(datos[i].PU);
                            }
                            else {
                                $("#txtPrecioUnitario").val(datos[i].CONVERT_PU);
                            }

                        } else if ($("#cboDctoOrigen").val() == "0053") {
                            //|0053 COTIZACIÓN CLIENTE
                            $("#hfCOD_PROD").val(datos[i].PROD_CODE)
                            $("#txt_cod_a_producto").val(datos[i].CODIGO_ANTIGUO)
                            $("#txt_desc_producto").val(datos[i].NOMBRE_IMPRESION);
                            $("#txt_cantidad").val(datos[i].CANTIDAD).keyup();//Actualiza el precio unitario y el descuento

                            fillcboUniMedida(prodActual.TIPO_DE_UNIDAD)
                            $("#cbo_und_medida").select2("val", prodActual.CODE_UNIDAD);

                            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                                $("#txtPrecioUnitario").val(datos[i].PU);
                            }
                            else {
                                $("#txtPrecioUnitario").val(datos[i].CONVERT_PU);
                            }
                        } else {
                            //|0050 GUIA SALIDA|0009 REMISION REMITENTE

                            //$("#hfCOD_PROD").val(datos[i].PROD_CODE);
                            //$("#txt_desc_producto").val(datos[i].DESC_PRODUCTO);
                            //$("#txt_cantidad").val(datos[i].CANTIDAD_BASE).keyup();
                            //$("#cbo_und_medida").select2("val", datos[i].UNME_BASE);

                            $("#hfCOD_PROD").val(datos[i].PROD_CODE)
                            $("#txt_cod_a_producto").val(datos[i].CODIGO_ANTIGUO)
                            $("#txt_desc_producto").val(datos[i].DESC_PRODUCTO);
                            $("#txt_cantidad").val(datos[i].CANTIDAD_BASE).keyup();//Actualiza el precio unitario y el descuento

                            fillcboUniMedida(prodActual.TIPO_DE_UNIDAD)
                            $("#cbo_und_medida").select2("val", prodActual.CODE_UNIDAD);

                            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOBA") {
                                $("#txtPrecioUnitario").val(datos[i].MONTO);
                            }
                            else {
                                $("#txtPrecioUnitario").val(datos[i].MONTO_ALTERNO);
                            }
                        }

                        var nomProdVenta = $("#txt_desc_producto").val();
                        var cantidad = $("#txt_cantidad").val();
                        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
                        var unidadMedida = $("#cbo_und_medida :selected").html();
                        var precioUnidad = $("#txtPrecioUnitario").val().replace(",", ".");
                        var glosa = $.trim($("#txt_glosa_det").val().replace(/<\/?[^>]+(>|$)/gi, ""));

                        var almacenCode = datos[i].ALMC;
                        var almacen = datos[i].DESC_ALMC;

                        //Guardar Categoria Cliente
                        var categoriaCode = (($("#hfcod_cate").val()) != "" ? $("#hfcod_cate").val() : cod_cate_clie);
                        var categoriaDesc = (($("#hfdes_cate").val()) != "" ? $("#hfdes_cate").val() : des_cate_clie); //$("#hfdes_cate").val();

                        var descuento = $("#txt_descuento_det").val();

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
                            infoCustom("No puede agregar un producto con precio 0. No se agregará ningún detalle.");
                            EliminarDatosDocumentoOrigen()
                            break;
                        }
                        else if (parseFloat($("#txt_cantidad").val()) == 0) {
                            infoCustom("La cantidad de un detalle es 0. No se agregará ningún detalle.");
                            EliminarDatosDocumentoOrigen()
                            break;
                        }
                        else {
                            continuar = true
                        }
                        if (isNaN($("#txt_cantidad").val())) {
                            infoCustom("La cantidad en el detalle no es válida. Intente nuevamente.");
                            EliminarDatosDocumentoOrigen()
                            break;
                        }
                        if (isNaN($("#txt_descuento_det").val())) {
                            infoCustom("El descuento obtenido no válido. Intente nuevamente.");
                            EliminarDatosDocumentoOrigen()
                            break;
                        }
                        if (isNaN($("#txtPrecioUnitario").val())) {
                            infoCustom("El precio obtenido no es válido. Intente nuevamente.");
                            EliminarDatosDocumentoOrigen()
                            break;
                        }
                        if (prmtVNST == "S") {
                            var diferencia = parseFloat(prodActual.STOCK_REAL) - parseFloat($("#txt_cantidad").val());
                            if (diferencia < 0) {
                                continuar = false;
                                infoCustom2("No hay stock suficiente para agregar el producto \"" + prodActual.PROD_CODE_ANTIGUO + "\". No se agregará ningún detalle.");
                                EliminarDatosDocumentoOrigen()
                                break;
                            }
                        }
                        //Fin validaciones
                        if (continuar) {
                            var objProd = prodActual;

                            if (datos[i].SERIADO == "N" || datos[i].NRO_SERIE == undefined) {

                                var prodInd;
                                if ($("#cboDctoOrigen").val() != "0027" && $("#cboDctoOrigen").val() != "0050" && $("#cboDctoOrigen").val() != "0009") {
                                    prodInd = ValidarProductoAgregado(objProd, "", "");
                                } else {
                                    prodInd = -1;
                                }

                                //PRODUCTOS NO SERIADOS O SERIADO QUE NO PROVIENEN DE UN DOCUMENTO DE SALIDA DE ALMACEN
                                if (prodInd < 0) {
                                    if (datos[i].TIPO_PRODUCTO == 'N') {
                                        var item = detallesDctoOrigen.length + 1;
                                        objProd.CODE_DCTO_ORIGEN = datos[i].CODIGO;
                                        objProd.ITEM = item;
                                        //objProd.DESC_UNIDAD = unidadMedida;
                                        objProd.GLOSA = glosa;
                                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                                        objProd.MONTO_DESCUENTO = descuento;
                                        objProd.CANTIDAD = cantidad;
                                        objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                        objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                                        objProd.ALMC = almacenCode;
                                        objProd.DESC_ALMC = almacen;
                                        objProd.CAT_CODE = categoriaCode;
                                        objProd.CAT_DESC = categoriaDesc;
                                        objProd.TOTAL_BRUTO = totalBruto;
                                        objProd.TOTAL_NETO = totalNeto;//Total neto Incluido IGV
                                        objProd.DESP_VENTA = "NO"; //ESTÁ PARA VERIFICAR SI FUNCIONA CORRECTAMENTE CON ESTE CAMBIO 12/10/2020
                                        objProd.CODE_UNIDAD = datos[i].UNIDAD;
                                        objProd.UNIDAD = datos[i].UNIDAD;
                                        objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
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
                                        objProd.MONTO_DETRAC = detraccion.toFixed(2);
                                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                            objProd.MONTO_ISC = isc.toFixed(2);
                                        } else {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                            objProd.MONTO_ISC = isc.toFixed(2);
                                        }

                                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                        detallesDctoOrigen.push(objProd);
                                        nroDetallesInsertados++;
                                    }

                                    if (datos[i].TIPO_PRODUCTO == 'B') {
                                        var item = detallesDctoOrigenBoni.length + 1;
                                        objProd.CODE_DCTO_ORIGEN = "";
                                        objProd.ITEM = item;
                                        objProd.DESC_UNIDAD = unidadMedida;
                                        objProd.GLOSA = glosa;
                                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                                        objProd.MONTO_DESCUENTO = descuento;
                                        objProd.CANTIDAD = cantidad;
                                        objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                        objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                                        objProd.ALMC = almacenCode;
                                        objProd.DESC_ALMC = almacen;
                                        objProd.CAT_CODE = categoriaCode;
                                        objProd.CAT_DESC = categoriaDesc;
                                        objProd.TOTAL_BRUTO = parseFloat(totalBruto * 0).toFixed(prmtDIGP);
                                        objProd.TOTAL_NETO = parseFloat(totalNeto * 0).toFixed(prmtDIGP);//Total neto Incluido IGV
                                        objProd.DESP_VENTA = "NO"; //ESTÁ PARA VERIFICAR SI FUNCIONA CORRECTAMENTE CON ESTE CAMBIO 12/10/2020
                                        objProd.CODE_UNIDAD = datos[i].UNIDAD;
                                        objProd.UNIDAD = datos[i].UNIDAD;
                                        objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
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
                                        objProd.MONTO_DETRAC = parseFloat(detraccion).toFixed(prmtDIGP);
                                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                            objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                                        } else {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                            objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                                        }

                                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                        detallesDctoOrigenBoni.push(objProd);
                                        nroDetallesInsertados++;
                                    }

                                    if (datos[i].TIPO_PRODUCTO == 'M') {
                                        var item = detallesDctoOrigenMuestra.length + 1;
                                        objProd.CODE_DCTO_ORIGEN = "";
                                        objProd.ITEM = item;
                                        objProd.DESC_UNIDAD = unidadMedida;
                                        objProd.GLOSA = glosa;
                                        objProd.NOMBRE_IMPRESION = nomProdVenta;
                                        objProd.MONTO_DESCUENTO = descuento;
                                        objProd.CANTIDAD = cantidad;
                                        objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                        objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                                        objProd.ALMC = almacenCode;
                                        objProd.DESC_ALMC = almacen;
                                        objProd.CAT_CODE = categoriaCode;
                                        objProd.CAT_DESC = categoriaDesc;
                                        objProd.TOTAL_BRUTO = parseFloat(totalBruto * 0).toFixed(prmtDIGP);
                                        objProd.TOTAL_NETO = parseFloat(totalNeto * 0).toFixed(prmtDIGP);//Total neto Incluido IGV
                                        objProd.DESP_VENTA = "NO"; //ESTÁ PARA VERIFICAR SI FUNCIONA CORRECTAMENTE CON ESTE CAMBIO 12/10/2020
                                        objProd.CODE_UNIDAD = datos[i].UNIDAD;
                                        objProd.UNIDAD = datos[i].UNIDAD;
                                        objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
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
                                        objProd.MONTO_DETRAC = parseFloat(detraccion).toFixed(prmtDIGP);
                                        if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto); //Total neto Sin IGV
                                            objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                                        } else {
                                            isc = parseFloat(objProd.ISC / 100) * (totalNeto / (decimalIGV + 1)); //Total neto Sin IGV
                                            objProd.MONTO_ISC = parseFloat(0).toFixed(prmtDIGP);
                                        }

                                        objProd.COSTO_PRODUCTO = $("#hfCostoProducto").val();

                                        detallesDctoOrigenMuestra.push(objProd);
                                        nroDetallesInsertados++;
                                    }


                                } else {
                                    alertCustom("El producto '" + objProd.PROD_CODE_ANTIGUO + "' ya ha sido agregado.");
                                }
                            } else {
                                //PRODUCTOS SERIADOS QUE YA SALIERON DE ALMACEN Y TIENEN CODIGO DE BARRAS
                                if (datos[i].TIPO_PRODUCTO == 'N') {
                                    var item = detallesDctoOrigen.length + 1;
                                    objProd.CODE_DCTO_ORIGEN = datos[i].CODIGO;

                                    objProd.CODIGO = datos[i].NRO_SERIE;//CODIGO BARRAS DE PRODUCTO SERIADO

                                    objProd.ITEM = item;
                                    objProd.DESC_UNIDAD = unidadMedida;
                                    objProd.GLOSA = glosa;
                                    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + datos[i].NRO_SERIE;
                                    objProd.MONTO_DESCUENTO = descuento;
                                    objProd.CANTIDAD = cantidad;
                                    objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                    objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                                    objProd.ALMC = almacenCode;
                                    objProd.DESC_ALMC = almacen;
                                    objProd.CAT_CODE = categoriaCode;
                                    objProd.CAT_DESC = categoriaDesc;
                                    objProd.TOTAL_BRUTO = totalBruto;
                                    objProd.TOTAL_NETO = totalNeto;//Total neto Incluido IGV
                                    objProd.DESP_VENTA = "NO"; //ESTÁ PARA VERIFICAR SI FUNCIONA CORRECTAMENTE CON ESTE CAMBIO 12/10/2020
                                    objProd.CODE_UNIDAD = datos[i].UNIDAD;
                                    objProd.UNIDAD = datos[i].UNIDAD;
                                    objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
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

                                    detallesDctoOrigen.push(objProd);
                                    nroDetallesInsertados++;
                                }

                                if (datos[i].TIPO_PRODUCTO == 'B') {
                                    var item = detallesDctoOrigenBoni.length + 1;
                                    objProd.CODE_DCTO_ORIGEN = datos[i].CODIGO;

                                    objProd.CODIGO = datos[i].NRO_SERIE;//CODIGO BARRAS DE PRODUCTO SERIADO

                                    objProd.ITEM = item;
                                    objProd.DESC_UNIDAD = unidadMedida;
                                    objProd.GLOSA = glosa;
                                    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + datos[i].NRO_SERIE;
                                    objProd.MONTO_DESCUENTO = descuento;
                                    objProd.CANTIDAD = cantidad;
                                    objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                    objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                                    objProd.ALMC = almacenCode;
                                    objProd.DESC_ALMC = almacen;
                                    objProd.CAT_CODE = categoriaCode;
                                    objProd.CAT_DESC = categoriaDesc;
                                    objProd.TOTAL_BRUTO = parseFloat(totalBruto * 0).toFixed(prmtDIGP);
                                    objProd.TOTAL_NETO = parseFloat(totalNeto * 0).toFixed(prmtDIGP);//Total neto Incluido IGV
                                    objProd.DESP_VENTA = "NO"; //ESTÁ PARA VERIFICAR SI FUNCIONA CORRECTAMENTE CON ESTE CAMBIO 12/10/2020
                                    objProd.CODE_UNIDAD = datos[i].UNIDAD;
                                    objProd.UNIDAD = datos[i].UNIDAD;
                                    objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
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

                                    detallesDctoOrigenBoni.push(objProd);
                                    nroDetallesInsertados++;
                                }

                                if (datos[i].TIPO_PRODUCTO == 'M') {
                                    var item = detallesDctoOrigenMuestra.length + 1;
                                    objProd.CODE_DCTO_ORIGEN = datos[i].CODIGO;

                                    objProd.CODIGO = datos[i].NRO_SERIE;//CODIGO BARRAS DE PRODUCTO SERIADO

                                    objProd.ITEM = item;
                                    objProd.DESC_UNIDAD = unidadMedida;
                                    objProd.GLOSA = glosa;
                                    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + datos[i].NRO_SERIE;
                                    objProd.MONTO_DESCUENTO = descuento;
                                    objProd.CANTIDAD = cantidad;
                                    objProd.PRECIO_DETALLE = parseFloat(precioUnidad).toFixed(prmtDIGP); //El precio está en la misma moneda que  cbo_moneda
                                    objProd.PU = parseFloat(precioUnidad).toFixed(prmtDIGP);
                                    objProd.ALMC = almacenCode;
                                    objProd.DESC_ALMC = almacen;
                                    objProd.CAT_CODE = categoriaCode;
                                    objProd.CAT_DESC = categoriaDesc;
                                    objProd.TOTAL_BRUTO = parseFloat(totalBruto * 0).toFixed(prmtDIGP);
                                    objProd.TOTAL_NETO = parseFloat(totalNeto * 0).toFixed(prmtDIGP);//Total neto Incluido IGV
                                    objProd.DESP_VENTA = "NO"; //ESTÁ PARA VERIFICAR SI FUNCIONA CORRECTAMENTE CON ESTE CAMBIO 12/10/2020
                                    objProd.CODE_UNIDAD = datos[i].UNIDAD;
                                    objProd.UNIDAD = datos[i].UNIDAD;
                                    objProd.DESC_UNIDAD = datos[i].DESC_UNIDAD;
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

                                    detallesDctoOrigenMuestra.push(objProd);
                                    nroDetallesInsertados++;
                                }

                            }

                        }
                    }


                } //fin FOR



                if (nroDetallesInsertados == datos.length && nroDetallesInsertados > 0) {
                    //LIMPIAR PRODUCTOS EXISTENTES
                    if ($("#cboDctoOrigen").val() == "0009" || $("#cboDctoOrigen").val() == "0050" || $("#cboDctoOrigen").val() == "0027") {
                        detallesVenta.splice(0, detallesVenta.length)
                    }

                    for (var i = 0; i < detallesDctoOrigen.length; i++) {
                        detallesVenta.push(detallesDctoOrigen[i]);
                    }

                    for (var i = 0; i < detallesDctoOrigenBoni.length; i++) {
                        detallesBonificacion.push(detallesDctoOrigenBoni[i]);
                    }

                    for (var i = 0; i < detallesDctoOrigenMuestra.length; i++) {
                        detallesMuestra.push(detallesDctoOrigenMuestra[i]);
                    }
                    //NO CALCULAR DATOS SI SE TRATA DE UNA ORDEN DE COMPRA CLIENTE
                    if ($("#cboDctoOrigen").val() != "0027") {
                        CalcularDetraccion();
                        CalcularDatosMonetarios();
                        $("#lblImporteCobrar").html($("#txt_monto_total").val());
                        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
                    }
                    //Bloquear edicion
                    $("#cbo_moneda").attr("disabled", "disabled");
                    $("#cbo_uni_medida").attr("disabled", "disabled");
                    $("#cbo_Sucursal").attr("disabled", "disabled");
                    $("#cbo_Empresa").attr("disabled", "disabled");

                    $("#rbRedondeo,#rbDonacion").removeAttr("disabled");

                    if (nroDetallesInsertados == datos.length) {
                        exitoCustom("Todos los detalles del documento de origen se cargaron correctamente.");
                    }
                    else {
                        //  exitoCustom("(" + nroDetallesInsertados + " de " + datos.length + ") detalles del documento de origen se cargaron correctamente.");
                    }

                    if ($("#cboDctoOrigen").val() == "0009" || $("#cboDctoOrigen").val() == "0050" || $("#cboDctoOrigen").val() == "0027") {
                        $("#div_btn_add_prods,#divAgregarProducto").attr("style", "display:none");
                    }
                } else {
                    infoCustom("Los detalles del documento de origen (" + datos.length + ") NO se cargaron correctamente.");
                }
                LimpiarCamposDetalle();

                //console.log(detallesVenta.length);
                //console.log(detallesBonificacion.length);
                //console.log(detallesMuestra.length);


                if (detallesVenta.length > 0) {
                    var datos = ObtenerTablaDetalles();
                    ListarTablaDetalles(datos);
                }

                if (detallesBonificacion.length > 0) {
                    var datos2 = ObtenerTablaDetallesBonificacion();
                    ListarTablaDetallesBonificacion(datos2);
                }

                if (detallesMuestra.length > 0) {
                    var datos3 = ObtenerTablaDetallesMuestra();
                    ListarTablaDetallesMuestra(datos3);
                }

            }
            else {
                infoCustom("Detalles del documento de origen no se cargaron correctamente")
                $("#txt_cod_doc_orig").val("");
                $("#txt_num_ser_orig").val("");
                $("#txt_num_doc_orig").val("");
            }
            CargarCabeceraDocumentoOrigen();
        })
        .error(function () {
            alertCustom("Detalles del documento de origen no se cargaron correctamente")
            //Desbloquear("ventana");
        });

}

function CargarOrdenCompraCliente() {
    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmoccl.ashx?OPCION=LDOCC&p_FVBVTAC_CODE=" + $("#txt_cod_doc_orig").val(),
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            Desbloquear("ventana");
            //HF / IND
            $("#hfPIDM").val(datos[0].CLIE_PIDM);
            $("#hfIMPUESTO").val(datos[0].PCTJ_IGV);
            $("#hfImprimirPreciosIGV").val(datos[0].IGV_IMPR_IND);


            $("#txtRedondeo2,#txtRedondeo").val("0.00");
            $("#txtDonacion2,#txtDonacion").val("0.00");

            if (datos[0].IGV_IMPR_IND == "N") {
                $("#chk_inc_igv").prop('checked', false).parent().removeClass('checked');
            }
            if (datos[0].SCSL_EXONERADA_IND == "S") {
                $("#chk_inc_igv").attr("disabled", "disabled");
            }
            //F1
            //F2
            //Ya se usaron correctamente al filtrar
            //$("#cbo_Empresa").select2('val', datos[0].EMPRESA).attr("disabled", "disabled");
            //$("#cbo_Empresa").change();
            //$("#cbo_Sucursal").select2('val', datos[0].SUCURSAL).attr("disabled", "disabled");
            //$("#cbo_Sucursal").change();
            //F3
            $("#txtClientes").attr("disabled", "disabled");
            $("#txtNroDctoCliente").attr("disabled", "disabled");
            $("#cboTipoDoc").attr("disabled", "disabled");


            $("#cboTipoDoc").select2("val", datos[0].CLIE_DOID).change();
            $("#txtClientes").val(datos[0].RAZON_SOCIAL);
            $("#txtClientes").keyup().siblings("ul").children("li").click();
            //F4
            $("#cboDocumentoVenta").select2("val", datos[0].DCTO_CODE).change();

            //F5 
            $("#cbo_moneda").select2('val', datos[0].MONEDA);
            $("#cbo_moneda").change();//Carga tipo de cambio                               
            //F6      
            cargaDctoOrigenInd = false;
            $("#cboVendedor").select2("val", datos[0].USVE_USUA_ID);
            //F7
            $("#txt_comentario").val(datos[0].GLOSA);

            //DATOS CREDITO
            if ($("#cbo_modo_pago").val() == "")
                $("#cbo_modo_pago").select2('val', datos[0].MOPA).change();

            $("#txt_fec_vencimiento").val(datos[0].VENCIMIENTO);
            //Carga responsable de pago
            if (datos[0].RESPONSABLE_PAGO_PIDM != "") {
                $("#chkResponsablePago").prop('checked', true).parent().addClass('checked');
                $("#txtResponsablePago").removeAttr("disabled");
                $("#txtResponsablePago").val(datos[0].RESPONSABLE_PAGO);
                $("#hfResponsablePagoPIDM").val(datos[0].RESPONSABLE_PAGO_PIDM);
                $("#txtResponsablePago").keyup().siblings("ul").children("li").click();
            }

            $("#txt_valor_cambio").val(datos[0].VALOR_CAMBIO);
            $("#txt_valor_cambio_Oficial").val(datos[0].VALOR_CAMBIO_OFI);
            $("#lbl_fec_vig").attr("style", "display:none");
            $("#input_fec_vig").attr("style", "display:none");
            $("#lbl_fec_vig_Oficial").attr("style", "display:none");
            $("#input_fec_vig_Oficial").attr("style", "display:none");

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
            $("#txt_detraccion").val(datos[0].DETRACCION);
            $("#txt_monto_detraccion").val(datos[0].DETRACCION);

            if (datos[0].RETENCION_IND == "S") {
                $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                $("#chk_retencion").change();
                $("#txt_Retencion").val(datos[0].RETENCION)
                $("#txt_num_comp_reten").val(datos[0].NUM_DCTO_RETEN);
                $("#txt_fec_comp_reten").datepicker('setDate', datos[0].FECHA_RETEN);
            }
            $("#txt_Retencion").val(datos[0].RETENCION);

            if (datos[0].PERCEPCION == "S") {
                $('#chk_percepcion').prop('checked', true).parent().addClass('checked');
                $("#chk_percepcion").change();

            }
            $("#txt_Percepcion").val(datos[0].PERCEPCION);

            gImporteCobrar = parseFloat(datos[0].IMPORTE);
            $("#txt_monto_total").val(datos[0].IMPORTE);
            $("#lblImporteCobrar").html(datos[0].IMPORTE);
            $("#lblImporteTotal").val(datos[0].VALOR);
            //FIN CARGA TOTALES                                     

            //CALCULO DE VALORES PARA REDONDEO Y DONACION
            CalcularDonacionRedondeo(datos[0].IMPORTE);

            var date = new Date(datos[0].EMISION.split("/").reverse().join("/"));
            if (date.getDay() == 6) { // sabado
                date = date.addDays(2);
            } else {
                date = date.addDays(1);
            }
            $("#txt_fec_emision").datepicker('setDate', date);


            //CargaDireccion
            setTimeout(function () {
                var dirSet = "-1";
                var lstDirecciones = $("#cbo_direccion option");
                for (var i = 0; i < lstDirecciones.length; i++) {
                    if ($(lstDirecciones[i]).html() == datos[0].DIRECCION_REGISTRADA_CLIENTE) {
                        dirSet = $(lstDirecciones[i]).attr("value");
                        break;
                    }
                }
                if (dirSet != "-1" && dirSet != "") {
                    $("#cbo_direccion").val(dirSet);
                    $("#cbo_direccion").select2("val", dirSet);
                }
            }, 1000);

        },
        error: function (msg) {
            Desbloquear("ventana");
            alertCustom("Documento de origen no se cargó correctamente.");
        }
    });
}

function EliminarDatosDocumentoOrigen(desdeTabla) {
    if ($("#txt_cod_doc_orig").val() != "") {
        if (desdeTabla == undefined) {
            $("#cboDctoOrigen").select2("val", "");
        }
        var detallesNuevo = [];
        var cantActual = detallesVenta.length
        for (var i = 0; i < cantActual; i++) {
            if (detallesVenta[i] != undefined) {
                if (detallesVenta[i].CODE_DCTO_ORIGEN != "") {
                    if (detallesVenta[i].CODE_DCTO_ORIGEN == $("#txt_cod_doc_orig").val()) {
                        detallesVenta.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        $("#txt_cod_doc_orig").val("");
        $("#txt_num_ser_orig").val("");
        $("#txt_num_doc_orig").val("");

        for (var i = 0; i < detallesVenta.length; i++) {
            detallesVenta[i].ITEM = i + 1;
            detallesNuevo.push(detallesVenta[i]);
        }

        detallesVenta.splice(0, detallesVenta.length);
        detallesVenta = detallesNuevo;

        var datos = ObtenerTablaDetalles();
        ListarTablaDetalles(datos);

        if (detallesVenta.length == 0) {
            $("#cbo_moneda").removeAttr("disabled");
            $("#chkDespachoVenta").removeAttr("disabled");
            $("#cbo_Sucursal").removeAttr("disabled");
            $("#cbo_Empresa").removeAttr("disabled");
            $("#txtClientes").removeAttr("disabled");
            $("#txtNroDctoCliente").removeAttr("disabled");
            $("#cboTipoDoc").removeAttr("disabled");
            $("#div_btn_completar").attr("style", "display:none");
            $("#rbRedondeo,#rbDonacion").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');

        } else {
            $("#cbo_moneda").attr("disabled", "disabled");
        }

        $("#div_btn_add_prods,#divAgregarProducto").attr("style", "display:block");

        CalcularDetraccion();
        CalcularDatosMonetarios();
        $("#lblImporteCobrar").html($("#txt_monto_total").val());
        $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
    }
}

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

        if (precioMinimo == "" && precioMinimo == "0" && precioMinimo == "0.00") {
            precioMinimo = valor;
        }


        if (parseFloat($(campo).val()) < parseFloat(precioMinimo) || $(campo).val().trim() == "") {
            infoCustom2("El valor ingresado no puede ser menor al precio mínimo: " + parseFloat(precioMinimo).toFixed(prmtDIGP))
            $(campo).val(parseFloat(precioMinimo).toFixed(prmtDIGP));
            $(campo).focus();
        } else {
            //var factor = calcula_factor_conversion(detallesVenta[indice].CODE_UNIDAD_PROD_BASE, detallesVenta[indice].CODE_UNIDAD) // factor conversion unidades
            //Calcular 01-TOTAL BRUTO, 02-DESCUENTO, 03-TOTAL NETO, 04-DETRACCION,05-ISC
            var totalBruto = (parseFloat(detallesVenta[indice].CANTIDAD)) * parseFloat(valor).toFixed(prmtDIGP);
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
            CalcularDetraccion();
            CalcularDatosMonetarios();
            $("#lblImporteCobrar").html($("#txt_monto_total").val());
            $("#lblImporteTotal").html($("#txt_subtotal").val());//DPORTA
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
            if (tipoDocCode == '0001') {//DPORTA SIN-IMPUESTOS
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

// Cliente Rápido
function BuscarClientexDocumento() {
    if (vErrors(['cboTipoDoc'])) {
        //Bloquear("divFilaCliente");

        var doid = $("#cboTipoDoc").val();
        var nro = $("#txtNroDctoCliente").val();

        var esCliente = false;
        $("#txtClientes").val(" ").keyup();
        $("#txtClientes").val("").keyup();

        //DPORTA
        if (nro.length == 11 && doid == '6') {
            if (rucValido(nro)) {
                if (jsonClientes != null && jsonClientes.length > 0) {

                    for (var i = 0; i < jsonClientes.length; i++) {
                        if (parseInt(jsonClientes[i].CODIGO_TIPO_DOCUMENTO) == parseInt(doid) && parseInt(jsonClientes[i].NRO_DOCUMENTO) == parseInt(nro) || (jsonClientes[i].RUC == parseInt(nro) && parseInt(doid) == 6)) {
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
                    if (parseInt(jsonClientes[i].CODIGO_TIPO_DOCUMENTO) == parseInt(doid) && parseInt(jsonClientes[i].NRO_DOCUMENTO) == parseInt(nro) || (jsonClientes[i].RUC == parseInt(nro) && parseInt(doid) == 6)) {
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
        //Desbloquear("divFilaCliente");
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

//Ver Nuevo Cliente
function NuevoCliente(doid, nro) {
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

//-------------------------------------------------
//--------------- ANTICIPOS -----------------------
//-------------------------------------------------

seleccionados = new Array();
//function AgregarAnticipo() {

//    var filas = tabla_det.api(true).rows('.seleccionado').data().toArray();
//    var item = '';
//    for (var i in filas) {
//        item = filas[i].CODIGO;
//        if (seleccionados.indexOf(item) < 0) {
//            var objProd = ObtenerAnticipoCompleto(item);
//            detallesVenta.push(objProd);
//            seleccionados.push(item);
//            $("#cbo_moneda").attr("disabled", "disabled");
//            $("#cbo_uni_medida").attr("disabled", "disabled");
//            $("#cbo_Sucursal").attr("disabled", "disabled");
//            $("#cbo_Empresa").attr("disabled", "disabled");
//            $("#chkDespachoVenta,#txtNroDctoCliente,#txtClientes").attr("disabled", "disabled");
//            $("#cboTipoDoc").attr("disabled", "disabled");
//            //
//            $("#rbRedondeo,#rbDonacion").removeAttr("disabled");
//        }
//    }
//    LimpiarCamposDetalle();
//    ListarTablaDetalles(ObtenerTablaDetalles());
//    CalcularDetraccion();
//    CalcularDatosMonetarios();
//    $("#lblImporteCobrar").html($("#txt_monto_total").val());
//    $("#txtMonto").val($("#txt_monto_total").val());
//    $('#divAnticipos').modal('hide');
//}

function AgregarAnticipo() { //DPORTA

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
        //$(".btnEliminarDetalle").remove();
        //$("#tabla_det").DataTable().column(0).visible(false);
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
                prod += '"ALMC":"' + $("#cboAlmacen :selected").val() + '",';
                prod += '"DESC_ALMC":"' + $("#cboAlmacen :selected").html() + '",';
                prod += '"CAT_CODE":"' + (($("#hfcod_cate").val()) != "" ? $("#hfcod_cate").val() : cod_cate_clie) + '",' //DPORTA
                prod += '"CAT_DESC":"' + (($("#hfdes_cate").val()) != "" ? $("#hfdes_cate").val() : des_cate_clie) + '",' //DPORTA
                prod += '"DESP_VENTA":"NO",';//DPORTA
                prod += '"TIPO_DCTO":"' + datos[0].TIPO_DCTO + '",';
                prod += '"CODE_DCTO_ORIGEN":""';
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
//function MuestraSunat() {

//    $("#no_existe").css("display", "none").html();
//    var NRO = $("#txtNroDctoCliente").val();
//    Bloquear("divConsultaHabido");
//    if (ajaxSunat) {
//        ajaxSunat.abort();
//    }
//    ajaxSunat = $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: true,
//        success: function (data) {

//            if (data == "NO_EXISTE" || data == "error") {
//                //$("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido. Se marcará como HABIDO</p>');
//                $("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido.</p>');
//                $("#spanVerificando").html("-");
//                HABIDO_IND = "1";
//            } else {
//                var datos = $.parseJSON(data)

//                if (datos[0].FECHA_BAJA != "0000-00-00") {

//                    //DPORTA_RF
//                    let fecha;
//                    let mes;
//                    let anio;
//                    let dia;
//                    let fecha_baja;

//                    fecha = datos[0].FECHA_BAJA;

//                    anio = fecha.split("-")[0];
//                    mes = fecha.split("-")[1];
//                    dia = fecha.split("-")[2];

//                    fecha_baja = dia + "/" + mes + "/" + anio;

//                    $("#no_existe").css("display", "block").html('<p>El <b>RUC ' + NRO + '</b> perteneciente a <B>' + datos[0].RAZON + '</B> se encuentra en <B>' + datos[0].ESTADO + '</B> desde <B>' + fecha_baja + '</B> por SUNAT.</p>');;
//                    if (datos[0].CONDICION == "HABIDO") {
//                        HABIDO_IND = "1";
//                    } else {
//                        HABIDO_IND = "0";
//                    }
//                }
//                else {

//                    if (datos != null) {
//                        if (datos[0].CONDICION == "HABIDO") {
//                            HABIDO_IND = "1";
//                        } else {
//                            HABIDO_IND = "0";
//                        }
//                        DatosSunatCargados = datos[0];
//                    } else {
//                        $("#spanVerificando").html("-");
//                        $("#no_existe").css("display", "block").html('<p>No se encontraron datos. Se marcará como HABIDO</p>');;
//                        HABIDO_IND = "1";
//                    }
//                }
//            }

//            $("#lblEstadoSunat").html(datos[0].ESTADO);
//            $("#spanVerificando").html(datos[0].CONDICION);


//        },
//        error: function (msg) {
//            Desbloquear("divConsultaHabido");
//            if (msg.statusText != "abort") {
//                alertCustom("Consulta no se realizó correctamente");
//            }

//        }, complete: function () {
//            Desbloquear("divConsultaHabido");
//        }
//    });

//}

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
            //if (data.estado_del_contribuyente == "ACTIVO") {
            if (data.condicion_de_domicilio == "HABIDO") {
                HABIDO_IND = "1";
            } else {
                HABIDO_IND = "0";
            }
            DatosSunatCargados = data;
            //} else {
            //    infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
            //}
            debugger;
            Desbloquear("divConsultaHabido");
            $("#lblEstadoSunat").html(data.estado_del_contribuyente);
            $("#spanVerificando").html(data.condicion_de_domicilio);
        }
    };
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



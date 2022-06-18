var monedaCabecera;
var gDatos = null;
//
var igv = 0.18;
var iDesc;
var iAfec;
var iSubt;
var iSubtSinIgv;
var opGra = 0;
var opIna = 0;
var opExo = 0;
var opIgv = 0;
var importeTotal = 0;
//-------
var detalles = [];
var item = {};
var dctoSeleccionado = {};
var notaCredito = {};
//------
var tipoCambioInterno = 1;
var bCargaIgv = false;
var bCargaTC = false;

//CODIGO DE LA NOTA DE CREDITO DE MANERA GLOBAL
//var codigodctoglobal;
// PARA OBTENER LOS 
var FNC = "";
var BNC = "";
//------
function fillTblDocumentos() {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNGCL.ashx?OPCION=1" +
            "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
            "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
            "&USUA_ID=" + $("#hfPIDM").val() +
            "&p_DCTO_REF_TIPO_CODE=" + $("#cboTipoDocumento").val() +
            "&p_FECHA_EMISION=" + $("#txtFechaEmision").val() +
            "&p_MONE_CODE=" + $("#cboMoneda").val() +
            "&p_MOTIVO_CODE=" + $("#cboMotivo").val(),
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#divTblDocumentos').html(datos)
                $("#tblDocumentos").DataTable({
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

function cargarParametrosSistema() {

    //OBTENER IMPUESTO GENERAL A LAS VENTAS
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            bCargaIgv = true;
            if (bCargaIgv && bCargaTC) {
                Desbloquear("divBtnAgregar");
            }
            if (datos != null) {
                if (!isNaN(parseFloat(datos[0].VALOR))) {
                    $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                    igv = parseFloat(datos[0].VALOR)
                    igv > 1 ? igv = igv / 100 : igv = igv; // igv en decimal

                } else {
                    infoCustom2("El parámetro de Impuesto(0021) no es válido. Se considerará IGV 18%")
                    $('#hfIMPUESTO').val("18");
                    igv = 0.18;
                }
            }
            else { alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!"); }
        },
        error: function (msg) {
            bCargaIgv = true;
            if (bCargaIgv && bCargaTC) {
                Desbloquear("divBtnAgregar");
            }
            alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!");
        }
    });
}

var CAMNGCL = function () {

    var plugins = function () {

        $('#cboEmpresa, #txtSerieNota').select2();
        $('#cboEstablecimiento').select2();
        $('#cboMoneda').select2();
        $('#cboTipoDocumento').select2();
        $("#txtFechaTransaccion").datepicker("setDate", "now");
        $("#txtFechaEmision").datepicker("setDate", "now");

        $("#cboMoneda").select2();
        $("#cboMotivo").select2();
        $("#cboAfectacionIgv").select2();
        $("#cboPeriodo").select2();
        $("#txtFechaEmisionRef").datepicker();
        $("#txtFechaTransaccion").datepicker("setDate", "now");
        $("#cboTipoDcto").select2();
        aMayuscula("#txtMotivoAdicional");
    }

    var fnCargarSeries = function () {
        let sCodEmpresa = $('#cboEmpresa').val();
        let sCodEstablec = $('#cboEstablecimiento').val();
        let sCodTipoDoc = "0007";
        let sEstadoInd = "";

        let select = $("#txtSerieNota");
        $('#txtSerieNota').html("");
        $("#txtSerieNota").val("").change();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CORR&CTLG=" + sCodEmpresa + "&SCSL=" + sCodEstablec + "&TIPO_DCTO=" + sCodTipoDoc + "&p_ESTADO_IND=" + sEstadoInd,
            contenttype: "application/json;",
            //async: false,
            datatype: "json",
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                let sHtmlOption = "<option></option>";
                for (var i = 0; i < datos.length; i++) {
                    if (datos[i].ESTADO_IND === "ACTIVO") {
                        sHtmlOption += `<option value=${datos[i].SERIE} data-codautoriza=${datos[i].CODIGO} data-formato=${datos[i].FORMATO} 
                                                data-actual=${datos[i].VALOR_ACTUAL} data-fin=${datos[i].VALOR_FIN} 
                                                data-ind=${datos[i].CORRELATIVO}>${datos[i].SERIE}</option>`;
                        if ((datos[i].SERIE).substring(0, 3) == "FNC") {
                            FNC = datos[i].CODIGO;
                        } else if ((datos[i].SERIE).substring(0, 3) == "BNC") {
                            BNC = datos[i].CODIGO;
                        }
                    }
                    else {
                        sHtmlOption += `<option value=${datos[i].SERIE} data-codauto=${datos[i].CODIGO} data-formato=${datos[i].FORMATO} 
                                                data-actual=${datos[i].VALOR_ACTUAL} data-fin=${datos[i].VALOR_FIN} 
                                                data-ind=${datos[i].CORRELATIVO} disabled>${datos[i].SERIE}</option>`;
                    }
                }

                $(select).html(sHtmlOption);

            },
            error: function (msg) {
                //alertCustom("La Serie y Número correlativos no se obtuvieron correctamente.");
            }
        });
    };

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            Bloquear("divCboEmpresa");
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                cache: true,
                success: function (datos) {
                    Desbloquear("divCboEmpresa");
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option value=""></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                    Fin1_CargaEmpresa();
                },
                error: function (msg) {
                    Desbloquear("divCboEmpresa");
                    alertCustom("Empresas no se listaron correctamente");
                }
            });

        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
            Fin1_CargaEmpresa();
        }
    }

    var fillCboEstablecimiento = function () {

        Bloquear("divCboEstablecimiento");
        $('#divCboEstablecimiento').select2("val", "");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboEstablecimiento");
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option value=""></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                Fin2_CargaEstablecimiento();
            },
            error: function (msg) {
                Desbloquear("divCboEstablecimiento");
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var fillCboMoneda = function () {
        Bloquear("divCboMoneda");
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboMoneda");
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                var pos = 0;
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                $('#cboMoneda').select2("val", datos[pos].CODIGO);
                ListarValorCambio();
            },
            error: function (msg) {
                Desbloquear("divCboMoneda");
                alertCustom("Monedas no se listaron correctamente.");
            }
        });
    }

    var fillCboPeriodo = function () {
        Bloquear("divCboPeriodo");
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboPeriodo");
                $('#cboPeriodo').empty();
                $('#cboPeriodo').append('<option></option>');
                if (datos != null) {
                    var valor = "";
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboPeriodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                        if (i == datos.length - 1) {
                            valor = datos[i].COD;
                        }
                    }
                    var cod = ObtenerQueryString("codigo");
                    if (cod == undefined) {
                        $('#cboPeriodo').select2("val", valor);
                    }
                } else {
                    infoCustom2("No se encontró periodos tributarios")
                }
                Fin2_CargaPeriodo();
            },
            error: function (msg) {
                Desbloquear("divCboPeriodo");
                alertCustom("Error al cargar periodo.");
            }
        });
    }

    function filltxtrazsocial() {
        var v_ID = '#txtrazsocial';
        var v_value = ''
        $("#inputRazsocial").html("");
        $("#inputRazsocial").html('<input id="txtrazsocial" class="span12" type="text" data-provide="typeahead"  placeholder="Cliente"/>');

        var selectRazonSocial = $(v_ID);
        Bloquear("divTxtRazonSocial");
        $.ajax({
            type: "post",
            //url: "vistas/ca/ajax/camnocl.ashx?OPCION=3&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divTxtRazonSocial");
                if (datos != null) {
                    selectRazonSocial.typeahead({
                        source: function (query, process) {
                            items: 20,
                            arrayRazonSocial = [];
                            map = {};
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '","DIRECCION":"' + datos[i].DIRECCION + '"';
                                obj += '},';
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
                            $("#hfPIDM").val(map[item].PIDM);
                            $("#hfDNI").val(map[item].DNI);
                            $("#hfRUC").val(map[item].RUC);
                            $("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                            $("#txtDireccionOrigen").val(map[item].DIRECCION);
                            //$('#txtFechaEmision').focus();
                            //agregado
                            cargarTipoDocumento();
                            $('#cboTipoDcto').prop('disabled', false);

                            return item;
                        }
                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($("#txtrazsocial").val().length <= 0) {
                            $("#hfPIDM").val("");
                            //agregado
                            $("#txtNroDcto").val("");
                            $("#txtDireccionOrigen").val('');
                            $('#cboTipoDcto').val('').change();
                            $('#cboTipoDcto').prop('disabled', true);
                        }
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
            },
            error: function (msg) {
                Desbloquear("divTxtRazonSocial");
                alertCustom("Clientes no se listaron correctamente.");
            }
        });
    }

    //TIPOS DE DOCUMENTO DE REFERENCIA (VENTA)
    var fillCboTipoDocumento = function () {
        Bloquear("divCboTipoDocumento");
        $('#cboTipoDocumento').select2("val", "");
        var opcion = 'VENT';
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboTipoDocumento");
                $('#cboTipoDocumento').empty();
                $('#cboTipoDocumento').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO != '0101') {
                            $('#cboTipoDocumento').append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                        }
                    }
                }
                Fin2_CargaTipoDocumento();
            },
            error: function (msg) {
                Desbloquear("divCboTipoDocumento");
                alertCustom(msg);
            }
        });
    };

    //TIPOS DE MOTIVOS SUNAT
    var fillCboMotivoSunat = function () {
        $("#cboMotivo").html("<option></option>");
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=LMOTSUNAT&p_FTVMOSU_IND_ESTADO=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos)) {
                    alertInfo("No se encontrarón motivos sunat de nota de crédito.");
                    return;
                }
                for (var i = 0; i < datos.length; i++) {
                    if (datos[i].CodMotivoSunatNC == '04' || datos[i].CodMotivoSunatNC == '08' || datos[i].CodMotivoSunatNC == '10' || datos[i].CodMotivoSunatNC == '11') {
                        $("#cboMotivo").append('<option value="' + datos[i].CodMotivoNC + '" codsunat="' + datos[i].CodMotivoSunatNC + '">' + datos[i].Descripcion + '</option>');
                    }
                }
               // $("#cboMotivo").val("").change();
            },
            error: function (msg) {
                alertCustom("Error al obtener motivos sunat de nota de crédito.");
            }
        });
    };

    var ListarValorCambio = function () {
        if (typeof $("#cboMoneda [data-tipo='MOAL']").val() != "undefined" && $("#cboMoneda [data-tipo='MOAL']").val() != "") {
            monecode = $("#cboMoneda [data-tipo='MOAL']").val();

            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=INTERNO",
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {
                    bCargaTC = true;
                    if (bCargaIgv && bCargaTC) {
                        Desbloquear("divBtnAgregar");
                    }
                    if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                        tipoCambioInterno = datos[0].VALOR_CAMBIO_VENTA;
                    }
                },
                error: function (msg) {
                    bCargaTC = true;
                    if (bCargaIgv && bCargaTC) {
                        Desbloquear("divBtnAgregar");
                    }
                    alertCustom("Tipo de cambio Interno no se obtuvo correctamente.");
                }
            });
        }
    }

    //var cargarCorrelativo = function () {
    //    if (ObtenerQueryString("codigo") == undefined) {
    //        $.ajax({
    //            type: "post",
    //            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CORR&CTLG=" + $('#cboEmpresa').val() + "&SCSL=" + $('#cboEstablecimiento').val() + "&TIPO_DCTO=0007",
    //            contenttype: "application/json;",
    //            async: false,
    //            datatype: "json",
    //            success: function (datos) {
    //                limpiarCorrelativo();
    //                if (datos != null && datos != "" && typeof datos[0].SERIE != "undefined") {
    //                    $("#txtSerieNota").val(datos[0].SERIE);
    //                    $("#txtNroNota").val(datos[0].VALOR_ACTUAL);
    //                    $("#hfCodigoCorrelativo").val(datos[0].CODIGO);
    //                }
    //                else {
    //                    var code = ObtenerQueryString("codigo");
    //                    if ($("#rbCliente").is(":checked") && typeof (code) == "undefined") {
    //                        if ($("#txtSerieNota").val() == "" || $("#txtNroNota").val() == "") {
    //                            alertCustom("Verifique la numeración de Nota de Crédito. Haga clic <a style='color:#35aa47;' href='?f=NCLAUTD'>aquí</a>.")
    //                        }
    //                    }
    //                }
    //            },
    //            error: function (msg) {
    //                alertCustom("La Serie y Número correlativos de la Nota de Crédito no se obtuvieron correctamente.");
    //            }
    //        });
    //    }
    //}

    var limpiarCorrelativo = function () {
        $("#txtSerieNota").select2("val", "");        
        $("#txtNroNota").val("");
        $("#hfCodigoCorrelativo").val("");
    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {

            fillCboEstablecimiento();
            fillCboTipoDocumento();
            fillCboPeriodo();
            filltxtrazsocial();

            $("#cboEstablecimiento").change();

        });        

        $("#cboEstablecimiento").on("change", function () {  
            limpiarCorrelativo();
            fnCargarSeries();
            if ($("#cboEstablecimiento").val() == "") {
               limpiarCorrelativo();
                fnCargarSeries();
            }
        });

        $("#cboAfectacionIgv").on("change", function () {
            if ($("#cboEstablecimiento :selected").attr("data-exonerado") == "SI") {
                $("#lblIndIgv small").html("*Montos para detalle <strong>NO</strong> incluyen IGV. Establecimiento Exonerado")

            } else {
                if ($(this).val() == "GRA") {
                    $("#lblIndIgv small").html("*Montos para detalle incluyen IGV")
                } else { // INA - EXO
                    $("#lblIndIgv small").html("*Montos para detalle <strong>NO</strong> incluyen IGV")
                }
            }
            $("#txtSubtotalItem").focus();
        });

        $("#cboMotivo").on("change", function () { //Para marcar y desmarcar checkbox
            if ($("#cboMotivo").val() == "011") {
                $('#chkDevDinero').prop('checked', true).parent().addClass('checked');
                $("#Div_chkDinero").attr("style", "display:inline");
            } else {
                $('#chkDevDinero').prop('checked', false).parent().removeClass('checked');
                $("#Div_chkDinero").attr("style", "display:none");
            }
        })
        //agregado
        $('#cboTipoDcto').on('change', function () {
            $("#txtNroDcto").val($('#cboTipoDcto option:selected').attr('nroDoc'));

            var code = ObtenerQueryString("codigo");

            if (typeof (code) == "undefined") {
                //DPORTA
                if ($('#cboTipoDcto').val() == '6') {
                    $("#txtSerieNota option:not([value=0001])").attr("disabled", "disabled"); //data-codautoriza
                    $("#txtSerieNota option[value=0012]").removeAttr("disabled");
                    $("#cboTipoDocumento option[value=0001]").removeAttr("disabled");//remueve el disable de la opción boleta
                    $("#cboTipoDocumento option[value=0003]").attr("disabled", "disabled");//Deshabilita la opcion de boleta
                    //$("#cboTipoDocumento option[value='']").attr("disabled", "disabled");//Deshabilita la opcion de todos
                    $("#cboTipoDocumento").select2("val", "0001");//Pone por defecto factura en tipo documento
                    $("#txtSerieNota option[data-codautoriza='" + FNC + "']").removeAttr("disabled");

                    var oItems = $('#txtSerieNota option');
                    for (var i = 0; i < oItems.length; i++) {
                        if ((oItems[i].value).substring(0, 3) == "FNC") {
                            $("#txtSerieNota").select2("val", FNC).change();
                        } else {
                            $("#txtSerieNota").select2("val", BNC).change();
                        }

                    }

                } else if ($('#cboTipoDcto').val() == '1' || $('#cboTipoDcto').val() == '0' ||
                           $('#cboTipoDcto').val() == '7' || $('#cboTipoDcto').val() == '4') {

                    var doc17 = $('#cboTipoDcto').val();

                    if (doc17 == '6') {
                        $("#txtSerieNota option:not([value=0001])").attr("disabled", "disabled"); //data-codautoriza
                        $("#txtSerieNota option[value=0012]").removeAttr("disabled");
                        $("#cboTipoDocumento option[value=0001]").removeAttr("disabled");//remueve el disable de la opción boleta
                        $("#cboTipoDocumento option[value=0003]").attr("disabled", "disabled");//Deshabilita la opcion de boleta
                        //$("#cboTipoDocumento option[value='']").attr("disabled", "disabled");//Deshabilita la opcion de todos
                        $("#cboTipoDocumento").select2("val", "0001");//Pone por defecto factura en tipo documento
                        $("#txtSerieNota option[data-codautoriza='" + BNC + "']").removeAttr("disabled");

                        var oItems = $('#txtSerieNota option');
                        for (var i = 0; i < oItems.length; i++) {
                            if ((oItems[i].value).substring(0, 3) == "BNC") {
                                $("#txtSerieNota").select2("val", BNC).change();
                            } else {
                                $("#txtSerieNota").select2("val", FNC).change();
                            }

                        }
                    } else {
                        $("#txtSerieNota option:not([value=0001])").attr("disabled", "disabled"); //data-codautoriza
                        $("#txtSerieNota option[value=0012]").removeAttr("disabled");
                        $("#cboTipoDocumento option[value=0003]").removeAttr("disabled");//remueve el disable de la opción boleta
                        $("#cboTipoDocumento option[value=0001]").attr("disabled", "disabled");//Deshabilita la opcion de factura
                        //$("#cboTipoDocumento option[value='']").attr("disabled", "disabled");//Deshabilita la opcion de todos
                        $("#cboTipoDocumento").select2("val", "0003");//Pone por defecto boleta en tipo documento
                        $("#txtSerieNota option[data-codautoriza='" + BNC + "']").removeAttr("disabled");

                        var oItems = $('#txtSerieNota option');
                        for (var i = 0; i < oItems.length; i++) {
                            if ((oItems[i].value).substring(0, 3) == "BNC") {
                                $("#txtSerieNota").select2("val", BNC).change();
                            } else {
                                $("#txtSerieNota").select2("val", FNC).change();
                            }

                        }
                    }
                } else {
                    $("#txtSerieNota option:not([value=0001])").removeAttr("disabled");
                    $("#txtSerieNota option[value=0001]").attr("disabled", "disabled");

                    var oItems = $('#txtSerieNota option');
                    for (var i = 0; i < oItems.length; i++) {
                        if ((oItems[i].value).substring(0, 3) == "BNC") {
                            $("#txtSerieNota").select2("val", BNC).change();
                        } else {
                            $("#txtSerieNota").select2("val", BNC).change();
                        }

                    }
                }
            }
        });

        $("#cboTipoDocumento").on("change", function () {
            $("#txtSerie").val("");
            $("#txtNro").val("");
            $("#txtFechaEmisionRef").val("");
            //AGREGADO
            $("#txtMonto").val("");
            $("#txtCodMoneda").val("");
            $("#txtDesc").focus();
            dctoSeleccionado = {};
            if ($("#cboTipoDocumento").val() == "") {
                $("#cboMoneda").removeAttr("disabled");
                $("#cboEmpresa").removeAttr("disabled");
                $("#cboEstablecimiento").removeAttr("disabled");
                $("#txtrazsocial").removeAttr("disabled");
                //Se agregó 
                $("#cboMotivo").removeAttr("disabled");
            }
        })

        $('#btnBuscarDocumento').on('click', function () {
            if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtrazsocial", "txtFechaEmision"])) {
                mostrarModalBuscarDocumento();
            }
        });

        //---Eventos Enter
        $("#txtMotivoAdicional").on("keypress", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                $('#cboTipoDocumento').focus();
            }
        });

        $("#txtDesc").on("keypress", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13 && $(this).val() != "") {
                $('#txtSubtotalItem').focus();
            }
        });

        $("#txtSubtotalItem").on("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val().trim() != "") {
                iSubt = parseFloat($(this).val());
            }
            if (key === 13 && $(this).val() != '') {
                $('#btnAgregarDetalle').focus();
            }
        });

        $("#txtFechaEmision").on("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13 && $(this).val() != '' && $("#hfPIDM").val() != "") {
                $('#cboMotivo').focus();
            }
        });

        $("#txtSerieNota").on("change", function () {
            $("#txtNroNota").val("");
            $("#hfCodigoCorrelativo").val("");
            if ($("#txtSerieNota").val() != "") {
                $("#txtNroNota").val($("#txtSerieNota :selected").attr("data-actual"));   
                $("#hfCodigoCorrelativo").val($("#txtSerieNota :selected").attr("data-codautoriza"));
            }
        });
        //---
        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("NOTA DE CRÉDITO");
            $('#txtcontenido').val("");
            cargarCorreos();
            $('#divMail').modal('show');
        });
    }

    var cargaInicial = function () {
        var code = ObtenerQueryString("codigo");
        if (typeof (code) !== "undefined") {

            Bloquear("ventana");
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camngcl.ashx?OPCION=4" +
                    "&p_CODE=" + code+
                    "&p_TIPO_IND=C",
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {
                    Desbloquear("ventana");
                    gDatos = datos;
                    $('#btnMail').removeClass('hidden');
                    $("#btnImprimirDcto").removeAttr("style");
                    $("#hfCodigoNotaCredito").val(datos[0].CODIGO);
                    //F1
                    $("#cboEmpresa").select2("val", datos[0].CTLG_CODE).change();
                    //F2
                    $("#txtrazsocial").val(datos[0].RAZON_SOCIAL);
                    //$("#txtSerieNota").select2("val", datos[0].SERIE).change();
                    //$("#txtSerieNota").val(datos[0].SERIE).change();
                    $("#txtNroNota").val(datos[0].NUMERO);
                    $("#hfPIDM").val(datos[0].PIDM);
                    //agregado
                    cargarTipoDocumento(); 
                    //F3 
                    $("#txtFechaEmision").val(datos[0].EMISION);
                    $("#txtFechaTransaccion").val(datos[0].TRANSACCION);
                    //F4
                    $("#cboMotivo").select2("val", '0'+datos[0].MOTIVO_CODE).change();
                    $("#txtMotivoAdicional").val(datos[0].MOTIVO_DESC);
                    //F5
                    $("#cboMoneda").select2("val", datos[0].MONE_CODE);
                    //F6
                    $("#txtSerie").val(datos[0].DCTO_REF_SERIE);
                    $("#txtNro").val(datos[0].DCTO_REF_NRO);
                    $("#txtFechaEmisionRef").val(datos[0].EMISION_REF);
                    //AGREGADO
                    $("#txtMonto").val(datos[0].IMPORTE);
                    $("#txtCodMoneda").val(datos[0].MONEDA_CODE);
                    


                    //LLENAR DETALLES
                    Bloquear("divTblDetalles");
                    var data2 = new FormData();
                    data2.append('p_CODE', code);
                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/ca/ajax/CAMNGCL.ashx?OPCION=5",
                        contentType: false,
                        data: data2,
                        processData: false,
                        async: true
                    })
                   .success(function (datos) {
                       Desbloquear("divTblDetalles");
                       if (datos != null) {
                           detalles = datos;
                           ListarTablaDetalles();
                           $(".btnEliminarDetalle").remove();
                       }
                   })
                   .error(function () {
                       Desbloquear("divTblDetalles");
                       alertCustom("Detalles no se listaron correctamente")
                   });


                    //LLENAR MONTOS
                    $("#txtGravada").val(parseFloat(datos[0].IMPORTE_GRA).toFixed(2));
                    $("#txtInafecta").val(parseFloat(datos[0].IMPORTE_INA).toFixed(2));
                    $("#txtExonerada").val(parseFloat(datos[0].IMPORTE_EXO).toFixed(2));
                    $("#txtMontoIgv").val(parseFloat(datos[0].IGV).toFixed(2));
                    $("#txtImporteTotal").val(parseFloat(datos[0].IMPORTE_TOTAL).toFixed(2));

                    //---------
                    $("#cboEmpresa").attr("disabled", "disabled");
                    $("#cboEstablecimiento").attr("disabled", "disabled");
                    $("#txtMotivoAdicional").attr("disabled", "disabled");
                    $("#cboMotivo").attr("disabled", "disabled");
                    $("#txtSerieNota").attr("disabled", "disabled");
                    $("#txtNroNota").attr("disabled", "disabled");
                    $("#txtFechaEmision").attr("disabled", "disabled");
                    $("#txtrazsocial").attr("disabled", "disabled");
                    $("#cboTipoDocumento").attr("disabled", "disabled");
                    $("#cboMoneda").attr("disabled", "disabled");
                    $("#cboPeriodo").attr("disabled", "disabled");
                    //BloquearCampos
                    $("#btnBuscarDocumento").attr("style", "display:none");
                    $("#divAgregarDetalles").attr("style", "display:none");

                    $("#grabar").html("<i class='icon-plus'></i> Nuevo");
                    $("#grabar").attr("href", "?f=CAMNGCL");
                    $("#cancelar").attr("style", "display:none;");
                    $("#imprimir").attr("style", "display:inline-block;");
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    alertCustom("Registro NO se listo correctamente. Vuelva a intentarlo.");
                }
            });
        }
    }
    //--
    var iniBloqueo = function () {
        Bloquear("cboEmpresa");
        Bloquear("cboEstablecimiento");
        Bloquear("cboPeriodo");
        Bloquear("cboTipoDocumento");
        Bloquear("cboMoneda");
    }
    //--
    var Fin1_CargaEmpresa = function () {
        fillCboMotivoSunat();
        cargaInicial();
        if (ObtenerQueryString("codigo") == undefined) {
            $("#cboEmpresa").select2("val", $('#ctl00_hddctlg').val());

            if ($("#cboEmpresa").val() != "") {
                fillCboEstablecimiento();
                filltxtrazsocial();
                fillCboTipoDocumento();
                fillCboPeriodo();
                fillCboMotivoSunat();
            }
        }
    };
    var Fin2_CargaEstablecimiento = function () {
        if (ObtenerQueryString("codigo") == undefined) {
            $("#cboEstablecimiento").select2("val", $('#ctl00_hddestablecimiento').val());
            fnCargarSeries();
        }

        if (gDatos != null) {
            $("#cboEstablecimiento").select2("val", gDatos[0].SCSL_CODE);
        }
    };
    var Fin2_CargaTipoDocumento = function () {
        $("#cboTipoDocumento").select2("val", "");
        if (gDatos != null) {
            $("#cboTipoDocumento").select2("val", gDatos[0].DCTO_REF_TIPO_CODE);
            $("#txtSerieNota").val(gDatos[0].SERIE).change();
            $("#txtDireccionOrigen").val(gDatos[0].DIRECCION_CLIENTE);
        }
    };
    var Fin2_CargaPeriodo = function () {
        if (gDatos != null) {
            $("#cboPeriodo").select2("val", gDatos[0].MES_PERIODO + "-" + gDatos[0].ANIO_PERIODO)
            if ($("#cboPeriodo").val() == "") {
                $("#cboPeriodo").append('<option value="PER">' + gDatos[0].PERIODO_DESC + '</option>')
                $("#cboPeriodo").select2("val", "PER");
            }
        }
    };

    var cargarTipoDocumento = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LDOC&PIDM=" + $('#hfPIDM').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoDcto').html('<option></option>');
                if (datos !== null) {
                    let sCodDocIdent = "";
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoDcto').append('<option value="' + datos[i].CODIGO_DOCUMENTO + '" nroDoc="' + datos[i].NUM_DOC + '">' + datos[i].DESC_DOCUMENTO + '</option>');
                        sCodDocIdent = datos[i].CODIGO_DOCUMENTO;
                    }

                    $("#cboTipoDcto").val("6").change();
                    if ($("#cboTipoDcto").val() == "") {
                        $("#cboTipoDcto").val("1").change();
                        if ($("#cboTipoDcto").val() == "") {
                            $("#cboTipoDcto").val(sCodDocIdent).change();
                        }
                    }
                }
                //console.log(datos);



                Desbloquear('ventana');
            },
            error: function (msg) {
                alertCustom('Error al listar direcciones.');
                Desbloquear('ventana');
            }
        });
    };

    return {
        init: function () {
            iniBloqueo();
            Bloquear("divBtnAgregar");//NO AGREGAR HASTA CARGAR IGV Y TIPO DE CAMBIO
            cargarParametrosSistema();
            plugins();
            eventoControles();
            fillCboEmpresa();
            fillCboMoneda();
            //fnCargarSeries();
            cargaInicial();
            $(".lblPctjIgv").html("(" + (igv * 100).toFixed(1) + " %)");
            
        }
    };

}();

//---------------------MANEJO DETALLES 

//Valida dcto global y otros conceptos -- Daive 

function ValidarTotales() {
    if ($("#cboMotivo").val() == "004" || $("#cboMotivo").val() == "010" || $("#cboMotivo").val() == "011") {
        var sumt;
        if ($("#txtImporteTotal").val() == "") {
            sumt = 0;
        } else {
            sumt = parseFloat($("#txtImporteTotal").val());
        }
        if (sumt + parseFloat($("#txtSubtotalItem").val()) > parseFloat($("#txtMonto").val())) {
            parseFloat($("#txtSubtotalItem").val(parseFloat($("#txtMonto").val() - sumt)))

        }
    }
}

function AgregarDetalle() {

    if ($("#cboMoneda").val() != "") {

        var continuar = false;
        if (vErrors(['txtDesc', 'cboAfectacionIgv', 'txtSubtotalItem'])) {
            iDesc = $.trim($("#txtDesc").val());
            iAfec = $("#cboAfectacionIgv").val();

            if (parseFloat(iSubt) > 0) {
                continuar = true;
            } else {
                alertCustom("Subtotal no puede ser menor o igual a 0");
            }

            if (continuar) {
                //IGV
                igv > 1 ? igv = igv / 100 : igv = igv;
                //DESDE HTML
                item.DESC = iDesc;
                item.AFEC = iAfec;

                //CON IGV            
                item.SUBT = iSubt;

                //CALCULADOS
                item.ITEM = detalles.length + 1;
                item.PREC_VENTA_UNITARIO = parseFloat(item.PREC); // Precio con igv

                if (iAfec == "GRA") {
                    item.SUBT_SIN_IGV = iSubt / (1 + igv);
                    item.IGV = parseFloat(item.SUBT_SIN_IGV) * igv;

                } else {
                    item.IGV = 0.00;
                    item.SUBT_SIN_IGV = iSubt;
                }

                var itemAux = JSON.parse(JSON.stringify(item));
                detalles.push(itemAux);
                ListarTablaDetalles();
                LimpiarCamposDetalle();
            }
        }

    } else {
        alertCustom("Seleccione Moneda.");
        $("#cboMoneda").focus();
    }

}

var ListarTablaDetalles = function () {
    if ($("#cboMoneda").val() != "") {
        $(".lblMoneda").html("(" + $('#cboMoneda :selected').attr("simbolo") + ")");
    }
    $(".lblPctjIgv").html("(" + (igv * 100).toFixed(2) + "%)");

    $("#tblDetalles").dataTable().fnDestroy();
    $("#tblDetalles tbody tr").remove(tr);
    opIna = 0; opGra = 0; opExo = 0; opIgv = 0;

    for (var i = 0; i < detalles.length; i++) {
        var tr = "";
        tr += "<tr>"
        tr += "<td class='center'>" + detalles[i].ITEM + "</td>"
        tr += "<td class='center'>" + detalles[i].DESC + "</td>"
        tr += "<td class='center'>" + ((detalles[i].AFEC == "GRA") ? "GRAVADO" : ((detalles[i].AFEC == "EXO") ? "EXONERADO" : "INAFECTO")) + "</td>"
        tr += "<td class='center'>" + parseFloat(detalles[i].IGV).toFixed(2) + "</td>"
        tr += "<td class='center'>" + parseFloat(detalles[i].SUBT_SIN_IGV).toFixed(2) + "</td>"
        tr += '<td align="center"><a href="javascript:Delete(\'' + detalles[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        tr += "</tr>"
        $("#tblDetalles tbody").append(tr);

        if (ObtenerQueryString("codigo") == null) {
            if (detalles[i].AFEC == "GRA") {
                opGra += detalles[i].SUBT_SIN_IGV;
            } else if (detalles[i].AFEC == "INA") {
                opIna += detalles[i].SUBT_SIN_IGV;
            } else { // EXO
                opExo += detalles[i].SUBT_SIN_IGV;
            }
            opIgv += detalles[i].IGV;
        }
    }

    if (ObtenerQueryString("codigo") == null) {

        importeTotal = (opGra + opIgv) + opIna + opExo;
        $("#txtGravada").val(opGra.toFixed(2));
        $("#txtInafecta").val(opIna.toFixed(2));
        $("#txtExonerada").val(opExo.toFixed(2));
        $("#txtMontoIgv").val(opIgv.toFixed(2));
        $("#txtImporteTotal").val(importeTotal.toFixed(2));

        notaCredito.IMPORTE_INA = opIna;
        notaCredito.IMPORTE_EXO = opExo;
        notaCredito.IMPORTE_GRA = opGra;
        notaCredito.IGV = opIgv;
        notaCredito.PCTJ_IGV = (igv * 100);
        notaCredito.IMPORTE_TOTAL = importeTotal;
    }


    $("#tblDetalles").dataTable({
        "aLengthMenu": 10,
        "iDisplayLength": 10,
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla.",
            "sZeroRecords": "No hay datos disponibles en la tabla."
        }
    });

    $('#tblDetalles_wrapper :first').remove();

    if (detalles.length == 0) {
    }
}

var Delete = function (item) {
    var detallesNuevo = [];
    for (var i = 0; i < detalles.length; i++) {
        if (detalles[i].ITEM == item) {
            detalles.splice(i, 1);
        }
    }
    for (var i = 0; i < detalles.length; i++) {
        detalles[i].ITEM = i + 1;
        detallesNuevo.push(detalles[i]);
    }
    detalles.splice(0, detalles.length);
    detalles = detallesNuevo;
    ListarTablaDetalles();
}

function LimpiarCamposDetalle() {
    $("#txtSubtotalItem").val("");
    $("#cboAfectacionIgv").val();
    $("#txtDesc").val("").focus();
}

//---------------------
function mostrarModalBuscarDocumento() {
    //Bloquear("ventana")
    var html =
        '<div id="_buscarDocumento" style="display: block; width: 850px; left: 45%;"  class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">' +
        '<div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color:#ffffff;">' +
        ' <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">' +
        '  <i class="icon-remove"></i>' +
        ' </button>' +
        '        <h4 id="myModalLabel">BUSCAR DOCUMENTO</h4>' +
        '    </div>' +
        '    <div class="modal-body" id="ventanaBuscarDocumento">' +
        '       <div class="row-fluid" >' +
        '         <div class="span12" id="divTblDocumentos" >' +
        '            <table id="tblBuscarDocumento" class="display DTTT_selectable" style="width: 100%;">' +
        '                 <thead>' +
        '                    <tr>' +
        '                         <th>CODIGO</th>' +
        '                         <th>SERIE</th>' +
        '                         <th>NRO</th>' +
        '                         <th>EMISIÓN</th>' +
        '                     </tr>' +
        '                 </thead>' +
        '                 <tbody>' +
        '                    <tr>' +
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
        }
    });
    var oTable = $('#tblBuscarDocumento').dataTable();
    oTable.fnSort([[0, "desc"]]);
    $("#_buscarDocumento").modal('show');

    if ($("#_buscarDocumento").hasClass('in') == true) {
        $('#tblBuscarDocumento_filter.dataTables_filter input[type=search]').focus();
    }
    $('#_buscarDocumento').on('shown.bs.modal', function () {
        $('#tblBuscarDocumento_filter.dataTables_filter input[type=search]').focus();
    });
}

function setSeleccionDocumento(codigo, secuencia, serie, nro, tipo, importe, moneda, simboloMoneda, scslExonerada, emision) {


    dctoSeleccionado.CODIGO = codigo;
    dctoSeleccionado.DCTO_REF_SERIE = serie;
    dctoSeleccionado.NRO = nro;
    dctoSeleccionado.MONEDA_CODE = moneda;
    dctoSeleccionado.SIMBOLO_MONEDA = simboloMoneda;
    dctoSeleccionado.SCSL_EXONERADA_IND = scslExonerada;

    dctoSeleccionado.TIPO_DCTO = $("#cboTipoDocumento option[value='" + tipo + "']").html();
    dctoSeleccionado.TIPO_DCTO_CODE = tipo;
    dctoSeleccionado.FECHA_EMISION = emision;
    //AGREGADO
    dctoSeleccionado.IMPORTE = importe;
    //LLENAR DATOS DOCUMENTO SELECCIONADO 
    $(".lblMoneda").html("(" + simboloMoneda + ")");
     
    if (codigo != "" & serie != "") {

        $("#cboTipoDocumento").select2("val", dctoSeleccionado.TIPO_DCTO_CODE);


        $("#txtNro").val(dctoSeleccionado.NRO);
        $("#txtSerie").val(dctoSeleccionado.DCTO_REF_SERIE);
        $("#cboMoneda").select2("val", dctoSeleccionado.MONEDA_CODE);
        $("#txtFechaEmisionRef").val(dctoSeleccionado.FECHA_EMISION);
        $("#txtFechaEmision").datepicker("setStartDate", dctoSeleccionado.FECHA_EMISION);

        $("#txtFechaEmision").datepicker("setStartDate", dctoSeleccionado.FECHA_EMISION);
        //AGREGADO
        $("#txtMonto").val(dctoSeleccionado.IMPORTE);
        $("#txtCodMoneda").val(dctoSeleccionado.MONEDA_CODE);

        if ($("#txtFechaEmision").val() != "") {
            if ((DateDiff(new Date(ConvertirDate($("#txtFechaEmision").val())), new Date(ConvertirDate(dctoSeleccionado.FECHA_EMISION)))) < 0) {
                infoCustom2("Fecha de nota de crédito debe ser mayor o igual a la del documento de referencia");
                $("#txtFechaEmision").val("").focus();
            }
        }


        BloquearxSeleccion();
    }
    else {
        $("#txtNro").val("");
        $("#txtSerie").val("");
        //AGREGADO
        $("#txtMonto").val("");
        $("#txtCodMoneda").val("");
    }

    $(".doc_fila").css("background-color", "#f9f9f9 !important");
    $("#doc_fila_" + codigo + "_" + secuencia + "").css("background-color", "#cbcbcb !important");
    $("#_buscarDocumento").modal('hide');

}

//---------------------
// MANTENIMIENTO / TRANSACCIONES
function Crear() {
    GrabarNotaCredito();
}

var strDetalles = "";
var montoTotal = 0;
var montoIgv = 0;
var montoTotalSinIgv = 0;
var precio = 0;
function GrabarNotaCredito() {


    var campos = ['cboEmpresa', 'cboEstablecimiento', 'txtrazsocial', 'txtSerieNota', 'txtNroNota', 'txtFechaEmision', 'cboMotivo', 'cboMoneda', 'cboPeriodo'];
    if ($("#cboMotivo").val() == "00") {
        campos.push('txtMotivoAdicional');
    }
    if ($("#cboTipoDocumento").val() != "") {
        campos.push('txtSerie');
        campos.push('txtNro');
        campos.push('txtFechaEmisionRef');
    }

    var continuar = false;
    if (vErrors(campos)) {
        if ($("#hfPIDM").val() != "") {
            if (detalles.length > 0) {
                continuar = true;
            } else {
                alertCustom("Ingrese al menos un detalle")
            }
        }
        else {
            alertCustom("Seleccione un cliente válido");
        }
    }

    if (continuar) {

        //---------------------OBTENER DETALLES-------------
        strDetalles = "";
        for (var i = 0 ; i < detalles.length; i++) {
            strDetalles += detalles[i].ITEM + ";"; //ITEM
            strDetalles += detalles[i].DESC + ";"; //DESCRIPCION DE ITEM
            strDetalles += detalles[i].AFEC + ";";
            strDetalles += detalles[i].IGV + ";"; //MONTO IGV
            strDetalles += detalles[i].SUBT_SIN_IGV + ";"; //VALOR VENTA / SUBTOTAL SIN IGV
            strDetalles += (detalles[i].SUBT_SIN_IGV + detalles[i].IGV) + "|"; //SUBT_CON_IGV
        }
        //-------------------FIN OBTENER DETALLES-------------

        var data = new FormData();

        data.append('USUA_ID', $("#ctl00_txtus").val());
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_SCSL_EXONERADA_IND', ($("#cboEstablecimiento :selected").attr("data-exonerado") == "SI") ? 'S' : 'N');
        data.append('p_PERS_PIDM', $("#hfPIDM").val());
        data.append('p_TIPO_IND', "C");
        data.append('p_SERIE', $('#txtSerieNota').val());
        data.append('p_NUMERO', $("#txtNroNota").val());
        data.append('p_CODIGO_CORRELATIVO', $("#hfCodigoCorrelativo").val());

        data.append('p_FECHA_EMISION', $("#txtFechaEmision").val());
        data.append('p_MOTIVO_CODE', $("#cboMotivo").val());
        if ($("#cboMotivo").val() == "00") {
            data.append('p_MOTIVO_DESC', $("#txtMotivoAdicional").val().trim());
        } else {
            data.append('p_MOTIVO_DESC', $("#cboMotivo option:selected").text().toUpperCase());
        }

        data.append('p_IMPORTE_EXO', notaCredito.IMPORTE_EXO.toFixed(8));
        data.append('p_IMPORTE_INA', notaCredito.IMPORTE_INA.toFixed(8));
        data.append('p_IMPORTE_GRA', notaCredito.IMPORTE_GRA.toFixed(8));
        data.append('p_IGV', notaCredito.IGV.toFixed(8));
        data.append('p_IMPORTE_TOTAL', notaCredito.IMPORTE_TOTAL.toFixed(8));
        data.append('p_PCTJ_IGV', notaCredito.PCTJ_IGV);

        data.append('p_MONE_CODE', $("#cboMoneda").val());
        data.append('p_DCTO_REF_CODE', (dctoSeleccionado.CODIGO == undefined) ? "" : dctoSeleccionado.CODIGO);
        data.append('p_DCTO_REF_SERIE', (dctoSeleccionado.SERIE == undefined) ? "" : dctoSeleccionado.SERIE);
        data.append('p_DCTO_REF_NRO', (dctoSeleccionado.NRO == undefined) ? "" : dctoSeleccionado.NRO);
        data.append('p_DCTO_REF_TIPO_CODE', (dctoSeleccionado.TIPO_DCTO_CODE == undefined) ? "" : dctoSeleccionado.TIPO_DCTO_CODE);
        data.append('p_DETALLES', strDetalles);

        data.append('p_VALOR_CAMBIO', tipoCambioInterno.toString());
        data.append('p_MONTO_USABLE', $("#txtImporteTotal").val());
        data.append('p_MES_PERIODO', $("#cboPeriodo").val().split("-")[0]);
        data.append('p_ANIO_PERIODO', $("#cboPeriodo").val().split("-")[1]);
        data.append('p_DEVOLVER_DINERO', ($("#chkDevDinero").is(':checked') ? 'S' : 'N'));

        //VALIDAR FECHA Y PERIODO
        var continuar = false;
        var mesEmision = $("#txtFechaEmision").val().split("/")[1]; //$("#txtFechaEmision").val() :: "10/02/2016"
        var anioEmision = $("#txtFechaEmision").val().split("/")[2];
        var mesPeriodo = $("#cboPeriodo").val().split("-")[0];//$("#cboPeriodo").val() :: "1-2016"
        var anioPeriodo = $("#cboPeriodo").val().split("-")[1];
        if (parseInt(anioEmision) == parseInt(anioPeriodo)) {
            if (parseInt(mesEmision) <= parseInt(mesPeriodo)) {
                continuar = true;
            }
        } else if (parseInt(anioEmision) < parseInt(anioPeriodo)) {
            continuar = true;
        }

        if (continuar) {
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/ca/ajax/CAMNGCL.ashx?OPCION=3.5",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            })
           .success(function (datos) {
               Desbloquear("ventana");
               if (datos != null && datos.length > 0) {
                   if (datos[0].RESPUESTA == "OK") {
                       exito();
                       $('#btnMail').removeClass('hidden');
                       $("#hfCodigoNota").val(datos[0].CODIGO);
                       //BloquearCampos
                       $("#btnBuscarDocumento").attr("style", "display:none");
                       $("#divAgregarDetalles").attr("style", "display:none");
                       $("#grabar").html("<i class='icon-plus'></i> Nuevo");
                       $("#grabar").attr("href", "?f=CAMNGCL");
                       $("#grabar,#cancelar").attr("style", "display:none");
                       $("#imprimir").attr("style", "display:inline-block;");
                       $(".btnEliminarDetalle").remove();
                       $("#txtSerieNota,#txtNroNota").attr("disabled", "disabled");
                       $("#txtMotivoAdicional").attr("disabled", "disabled");
                       $("#cboMotivo").attr("disabled", "disabled");
                       $("#txtSerieNota").attr("disabled", "disabled");
                       $("#txtNroNota").attr("disabled", "disabled");
                       $("#cboTipoDocumento").val(dctoSeleccionado.TIPO_DCTO_CODE).attr("disabled", "disabled");
                       $("#txtFechaEmision").attr("disabled", "disabled");

                       $("#cboPeriodo").attr("disabled", "disabled");
                       $("#cboMoneda").attr("disabled", "disabled");
                       $("#cboEmpresa").attr("disabled", "disabled");
                       $("#cboEstablecimiento").attr("disabled", "disabled");
                       $("#txtrazsocial").attr("disabled", "disabled");
                       $("#cboTipoDcto").attr("disabled", "disabled");
                       $("#hfCodigoNotaCredito").val(datos[0].CODIGO);
                       //EL CODIGO GLOBAL OBTIENE EL CODIGO DE LA NOTA DE CREDITO GENERICA
                       //codigodctoglobal = datos[0].CODIGO;
                       var miCodigoQR = new QRCode("codigoQR");
                       miCodigoQR.makeCode(datos[0].DATOS_QR);
                       setTimeout(guardarQR, 0.0000000000000001);
                       $("#btnImprimirDcto").removeAttr("style");
                   } else if (datos[0].CODIGO == "LIMITE") {
                       alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Se ha excedido el límite de documentos autorizados!");
                   }
                   else if (datos[0].CODIGO == "ERROR") {
                       alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/>");
                   }
                   else {
                       alertCustom(datos[0].CODIGO);//Mensaje de error de bd
                   }

               } else {
                   noexito();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
        else {
            alertCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
            $("#cboPeriodo").focus();
        }
    }    
};

function guardarQR() {
    //CAPTURA LA IMAGEN DEL QR CODIFICADA EN BASE64 
    var NombreQR = $('#codigoQR img').attr('src');

    var qrData = new FormData();
    qrData.append('p_IMGQR', NombreQR);

    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/camngcl.ashx?OPCION=GQR&p_CODE=" + $("#hfCodigoNotaCredito").val(), //CUANDO SE PRESIONA EL BOTON COMPLETAR
        data: qrData,
        async: false,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res != null) {
                if (res == "OK") {
                    //exito();
                } else {
                    noexito();
                }
            } else {
                noexito();
            }
        },
        error: function () {
            alertCustom("No se guardaron correctamente los datos!")
        }
    });
}


function BloquearxSeleccion(ind) {
    if (ind == undefined) {
        ind = true;
    }
    if (ind) {
        $("#cboEmpresa").attr("disabled", "disabled");
        $("#cboEstablecimiento").attr("disabled", "disabled");
        $("#txtrazsocial").attr("disabled", "disabled");
        $("#cboMoneda").attr("disabled", "disabled");
        //Se bloquea la selección del combobox
        $("#cboMotivo").attr("disabled", "disabled");
    } else {
        $("#cboEmpresa").removeAttr("disabled");
        $("#cboEstablecimiento").removeAttr("disabled");
        $("#txtrazsocial").removeAttr("disabled");
        $("#cboMoneda").removeAttr("disabled");
        //Deselecciona la opción escogida previamente del combobox
        $("#cboMotivo").removeAttr("disabled", "disabled");
    }
}

function ImprimirDcto() {

    if ($("#styleImpresion").html() == undefined) {
        var estilos = '<style id="styleImpresion">@media print {.navbar-inner {display: none !important;}.page-sidebar {display: none  !important;}.footer {display: none  !important;}.page-content {margin-left: 0px  !important;}#contenedor{display: none  !important;}#contenedorBreadcrumb{ display: none  !important;}.page-container {margin-top: 0px  !important;}#divDctoImprimir {display: block  !important;width: 100%  !important;font-size: 12px  !important;line-height: 14px  !important;}.container-fluid {padding: 0px  !important;}.chat-window {display: none;margin:0px !important;}#gritter-notice-wrapper {display: none !important;}.blockUI{display: none !important;} }</style>';
        $("#ventana").append(estilos);
    }

    var continuar = false;
    var code = ObtenerQueryString("codigo");
    var codempr = ObtenerQueryString("codempr");
    if ((typeof (code) !== "undefined" && typeof (codempr) !== "undefined")) {
        continuar = true;
    }
    else if ($("#hfCodigoNotaCredito").val() != "") {
        continuar = true;
        code = $("#hfCodigoNotaCredito").val();
        codempr = $("#cboEmpresa").val();
    }

    if (continuar) {
        //Bloquear("contenedorPrincipal");
        var data = new FormData();
        data.append('p_CODE', code);
        data.append('p_CTLG_CODE', codempr);
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CA/ajax/CAMNGCL.ashx?OPCION=IMPR",
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
           //Desbloquear("contenedorPrincipal");
       })
       .error(function () {
           //Desbloquear("contenedorPrincipal");
           noexito();
       });
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
            url: "vistas/ca/ajax/CAMNGCL.ashx?OPCION=correo" +
                "&p_CODE=" + $("#hfCodigoNotaCredito").val() +
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

//*********************************** LISTAR  *************************************
var json = null;
var ini = true;

function ListarNotasCredito() {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/camngcl.ashx?OPCION=4" +
            "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
            "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
            "&p_TIPO_IND=C",
        contenttype: "application/text;",
        datatype: "json",
        async: true,
        success: function (datos) {
            oTable.fnClearTable();
            Desbloquear("ventana")
            if (datos != null) {
                oTable.fnAddData(datos);
                oTable.fnAdjustColumnSizing();
            }
        },
        error: function (msg) {
            oTable.fnClearTable();
            Desbloquear("ventana")
            alert(msg);
        }
    });
}
var CALNGCL = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
    }

    function fillCboEmpresa() {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            Bloquear("divCboEmpresa");
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                cache: true,
                success: function (datos) {
                    Desbloquear("divCboEmpresa");
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option value=""></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                    Fin1_CargaEmpresa();
                },
                error: function (msg) {
                    Desbloquear("divCboEmpresa");
                    alertCustom("Empresas no se listaron correctamente");
                }
            });

        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
            Fin1_CargaEmpresa();
        }
    }

    function fillCboEstablecimiento() {
        Bloquear("divCboEstablecimiento");
        $('#divCboEstablecimiento').select2("val", "");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboEstablecimiento");
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option value=""></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                Fin2_CargaEstablecimiento();
            },
            error: function (msg) {
                Desbloquear("divCboEstablecimiento");
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#buscar').on('click', function () {
            ListarNotasCredito();
        });
    }
    //---
    var iniTabla = function () {

        var parms = {
            data: null,
            columns: [
                 {
                     data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     visible: false
                 },
                 {
                     data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "MOTIVO_DESC", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     }
                 },
                 {
                     data: "MONEDA", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "IMPORTE_TOTAL", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                         var valor = cellData;
                         $(td).html(formatoMiles(valor));
                     },
                 },
                 {
                     data: "RAZON_SOCIAL", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     },
                 },
                 {
                     data: "EMISION", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     type: "fechaHora"
                 },
                 {
                     data: "USADO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                 },
                 {
                     data: "DOCUMENTO_REF", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                         var valor = cellData;
                         if (valor == "") {
                             $(td).html("NINGUNO");
                         }
                     },
                 }
            ],
            order: ["0", "desc"],
            oLanguage: {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            },
            scrollX: "true"
        }

        oTable = iniciaTabla('tblNotasCredito', parms);
        $('#tblNotasCredito').removeAttr('style');


        $('#tblNotasCredito tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=CAMNGCL&codigo=' + code;
            }
        });
    }
    var iniBloqueo = function () {
        Bloquear("cboEmpresa");
        Bloquear("cboEstablecimiento");
    }
    //---
    var Fin1_CargaEmpresa = function () {

        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        if ($("#cboEmpresa").val() != "") {
            fillCboEstablecimiento();
        }
    };
    var Fin2_CargaEstablecimiento = function () {

        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val()).change();
        if ($("#cboEstablecimiento").val() != "" && ini) {//Primera Carga
            ini = false;
            ListarNotasCredito();
        }
    };
 
    return {
        init: function () {
            iniBloqueo();
            iniTabla();
            plugins();
            fillCboEmpresa();
            eventoControles();
        }
    };
}();

function cargarNotaCredito(codigo, codempr) {
    //window.location.href = "?f=CAMNGCL&codigo=" + codigo
    window.open("?f=CAMNGCL&codigo=" + codigo, '_blank');
}

function irAnularDcto(codigo) {
    window.location.href = "?f=CAMANCL&codigo=" + codigo
}
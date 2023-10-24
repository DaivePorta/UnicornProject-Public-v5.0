var NVLCODT = function () {
    var plugins = function () {
        $('#cboEmpresa,#cboDocumentoVenta,#cboSerieDocVenta').select2();
        $('#cboEstablecimiento').select2();
        $('#cboEstado').select2();

        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();
        $('#txtFechaAplica').datepicker('setDate', 'now');
        $('#txtFechaCanjea').datepicker('setDate', 'now');
        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });
        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });

        $("#txtMontoAplicado").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })//20/02
    }
    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var eventoControles = function () {
        $('#cbo_Empresa').on('change', function () {
            limpiarCorrelativo();
            fillCboEstablecimiento();
            fillcboRegistroEspecifico('VENT');
        });

        $('#cbo_Sucursal').on('change', function () {
            cargarCorrelativo();
        });

        $('#cboDocumentoVenta').on('change', function () {
            $('#cboSerieDocVenta').removeAttr("disabled");
            $('#cboSerieDocVenta').empty().append('<option></option>').select2("val", "");
            $("#txtNroDocVenta").val("");
            cargarCorrelativo();
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

        $("#rbAplicarDoc").on("change", function () {
            $('#rbCanjearDoc').prop('checked', false).parent().removeClass('checked');
            $("#divAplicar, #divAplicar2").show();
            $("#divCanjear,#divCanjear2").hide();
            $('#txtFechaAplica').datepicker('setDate', 'now')
            $('#txtMensajeConfirmar').html("<strong>¿Estás seguro de aplicar el documento?</strong>")
            $('#btnAplicarCanjear').html("Aplicar")
        });

        $("#rbCanjearDoc").on("change", function () {
            $('#rbAplicarDoc').prop('checked', false).parent().removeClass('checked');
            $("#divCanjear,#divCanjear2").show();
            $("#divAplicar, #divAplicar2").hide();
            $('#txtFechaCanjea').datepicker('setDate', 'now');
            $('#txtMensajeConfirmar').html("<strong>¿Estás seguro de canjear el documento?</strong>")
            $('#btnAplicarCanjear').html("Canjear")
            if ($("#lblTipoDctoCliente").html() == '6') {
                $("#cboDocumentoVenta").val("0001").change();
            } else {
                $("#cboDocumentoVenta").val("0003").change();
            }            
            verificarDocumento($("#lblTipoDctoCliente").html());
        });

        $("#btnAplicarCanjear").click(function () {
            if ($("#rbAplicarDoc").is(':checked')) { //APLICA
                if ($("#txtDocumentoNuevoAplica").val() == "") {
                    infoCustom("Ingrese el campo obligatorio!");
                    $("#txtDocumentoNuevoAplica").pulsate({
                        color: "#FF0000",
                        reach: 20,
                        repeat: 2,
                        glow: true
                    });
                    return;
                }
                if ($("#txtMontoAplicado").val() == "") {
                    infoCustom("Ingrese el campo obligatorio!");
                    $("#txtMontoAplicado").pulsate({
                        color: "#FF0000",
                        reach: 20,
                        repeat: 2,
                        glow: true
                    });
                    return;
                }
            } else {
                if ($("#txtNroDocVenta").val() == "") {
                    infoCustom("Ingrese el campo obligatorio!");
                    $("#divSerieCorr").pulsate({
                        color: "#FF0000",
                        reach: 20,
                        repeat: 2,
                        glow: true
                    });
                    return;
                }
            }
            
            $("#modalConfirmar").modal('show');
            $("#modalPagar").modal('hide');
        });

        $("#btnSalir").click(function () {
            $('#txtFechaAplica,#txtFechaCanjea').datepicker('setDate', 'now');
            $("#txtDocumentoNuevoAplica, #txtMontoAplicado").val("");
            $("#lblCodVenta,#lblTipoDctoCliente").html("");
            $('#rbAplicarDoc').change();
            $('#rbAplicarDoc').prop('checked', true).parent().addClass('checked');
            $("#modalPagar").modal('hide');
            limpiarCorrelativo();
        });

        $("#btnSalirConfirmar").click(function () {
            $("#modalPagar").modal('show');
            $("#modalConfirmar").modal('hide');
        });

        $("#btnAplicarCanjearConfirmar").click(function () {
            aplicarCanjearConfirmar();
        });
    }
    var fillcboRegistroEspecifico = function (opcion) {
        var select = $('#cboDocumentoVenta').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO != '0101') {
                            $(select).append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                        }                        
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
    var cargarCorrelativo = function () {
        if ($("#cboDocumentoVenta").val() != "") {
            var select = $('#cboSerieDocVenta');
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CORR&CTLG=" + $('#cboEmpresa').val() + "&SCSL=" + $('#cboEstablecimiento').val() + "&TIPO_DCTO=" + $("#cboDocumentoVenta").val(),
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
        }
    }
    var fillCboEmpresa = function () {
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
                    if (ObtenerQueryString("ctlg") == undefined) {
                        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    } else {
                        $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                    }

                    fillCboEstablecimiento();
                    if (ObtenerQueryString("scsl") == undefined) {
                        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#cboEstablecimiento").select2("val", ObtenerQueryString("scsl"));
                        $("#txtDesde").val(ObtenerQueryString("desde"));
                        $("#txtHasta").val(ObtenerQueryString("hasta"));
                    }
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
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
    function cargainicial() {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                listarDocumentos();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                listarDocumentos();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });

        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            //mes = mes - 1;
            mes = mes;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            fillcboRegistroEspecifico('VENT');
            cargainicial();            
        }
    };
}();

var limpiarCorrelativo = function () {
    $("#txtNroDocVenta").val("");
    $("#cboSerieDocVenta").select2("val", "");
    $("#lblTipoCorrelativo").html("");
}
function aplicarCanjear(CLIE_DOID_NRO, DESCRIPCION, RAZON_SOCIAL, SIMBOLO_MONEDA, MONTO_PAGADO, NRO_SERIE_DCTO, EMISION, CODIGO_VENTA, TIPO_DCTO) {
    $("#modalPagar")
        .modal("show")
        .draggable({ handle: "modal-header" })
        .modal({ backdrop: "static", keyboard: false });

    $("#lblDocCliente").html(CLIE_DOID_NRO);
    $("#lblGlosa").html(DESCRIPCION);
    $("#lblCliente").html(RAZON_SOCIAL);
    $("#lblMonto").html(SIMBOLO_MONEDA + MONTO_PAGADO);
    $("#lblSerieNro").html(NRO_SERIE_DCTO);
    $("#lblFecha").html(EMISION);
    $("#lblCodVenta").html(CODIGO_VENTA);
    $("#lblTipoDctoCliente").html(TIPO_DCTO);
    $("#hfMontoPagado").val(MONTO_PAGADO);
}

function aplicarCanjearConfirmar() {

    var p_fecha = "";
    var p_documento_nuevo = "";
    var p_autorizacion = "";
    var p_tipo = "";
    var p_monto_aplicado = 0;

    if ($("#rbAplicarDoc").is(':checked')) { //APLICA
        p_fecha = $("#txtFechaAplica").val();
        p_documento_nuevo = $.trim($("#txtDocumentoNuevoAplica").val());
        p_tipo = "A";
        p_monto_aplicado = $("#txtMontoAplicado").val();
    } else { //CANJEA
        p_fecha = $("#txtFechaCanjea").val();
        p_documento_nuevo = $.trim($("#cboSerieDocVenta :selected").html() + "-" + $("#txtNroDocVenta").val())
        p_autorizacion = $("#cboSerieDocVenta :selected").val();
        p_tipo = "C";
    }

    var data = new FormData();
    data.append('p_FECHA', p_fecha);
    data.append('p_DOCUMENTO_NUEVO', p_documento_nuevo);
    data.append('p_AUTORIZACION', p_autorizacion);
    data.append('p_TIPO', p_tipo);
    data.append('p_COD_VENTA', $("#lblCodVenta").html());
    data.append('p_MONTO_APLICADO', p_monto_aplicado);

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/NVLCODT.ashx?OPCION=1",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (datos) {
            if (datos != null) {
                if (datos[0].RPTA == "OK") {
                    $("#btnSalir").click();
                    $("#modalConfirmar, #modalPagar").modal('hide');
                    listarDocumentos();
                } else {
                    noexito();
                }
            } else {
                noexito();
            }
        })
        .error(function () {
            noexito();
        });
}

function listarDocumentos() {
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();

    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('ESTADO', ESTADO);
    data.append('DESDE', $("#txtDesde").val());
    data.append('HASTA', $("#txtHasta").val());

    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLCODT.ashx?OPCION=LDOCS",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $('#divDocumento').html(datos);

                $("#tblDocumento").dataTable({
                    "sDom": 'TC<"clear">lfrtip',
                    "sPaginationType": "full_numbers",
                    "scrollX": true,
                    "bAutoWidth": false,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    },
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
                    }
                });

                var oTable = $('#tblDocumento').dataTable();
                oTable.fnSort([[2, "desc"]]);

                $("#tblDocumento").DataTable();
                actualizarEstilos()
            } else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("ventana");
            noexito();
        });
}
function verificarDocumento(doc) {
    if (doc == '6') {
        $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
        $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
        $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

        var oItems = $('#cboDocumentoVenta option');
        for (var i = 0; i < oItems.length; i++) {
            if (oItems[i].value != "" && oItems[i].value != "0003") {
                if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
                    $("#cboDocumentoVenta").select2("val", "0012").change();
                } else if (oItems[i].value === "0001" && $("#txtNroDocVenta").val() == "") {
                    $("#cboDocumentoVenta").select2("val", "0001").change();
                }
            }
        }
    } else {
        $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
        $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

        var oItems = $('#cboDocumentoVenta option');
        for (var i = 0; i < oItems.length; i++) {
            if (oItems[i].value != "" && oItems[i].value != "0001") {
                if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
                    $("#cboDocumentoVenta").select2("val", "0012").change();
                } else if (oItems[i].value === "0003" && $("#txtNroDocVenta").val() == "") {
                    $("#cboDocumentoVenta").select2("val", "0003").change();
                }
            }
        }
    }
}

function ValidarTotales() {
    //if ($("#cboMotivo").val() == "004" || $("#cboMotivo").val() == "010" || $("#cboMotivo").val() == "011") {
    //var sumt;
    //if ($("#txtMontoAplicado").val() == "") {
    //    sumt = 0;
    //} else {
    //    sumt = parseFloat($("#txtMontoAplicado").val());
    //}
    
    if (parseFloat($("#txtMontoAplicado").val()) > parseFloat($("#hfMontoPagado").val())) {
        parseFloat($("#txtMontoAplicado").val(parseFloat($("#hfMontoPagado").val())))

    }
}
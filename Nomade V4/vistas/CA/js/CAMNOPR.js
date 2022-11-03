
// CARGA DE DATOS/COMBOS INICIAL
//
periodo = null
const codContado = '0001';
const codCredito = '0002';
let mopaDoc = '';
var arrayPeriodos = [];

function fillCboEmpresa() {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
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
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
            } else {
                $('#cboEmpresa').select2('val', '');
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function fillCboEstablecimiento(ctlg) {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=1&CTLG_CODE=" + ctlg,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboEstablecimiento').empty();
            $('#cboEstablecimiento').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
            } else {
                $('#cboEstablecimiento').select2('val', '');
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function fillTblDocumentos() {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=5" +
        "&CTLG_CODE=" + $("#cboEmpresa").val() +
        "&SCSL_CODE=" + $("#cboEstablecimiento").val() +
        "&USUA_ID=" + $("#hfPIDM").val() +
        "&TIPO_DOC_CODE=" + $("#cboTipoDocumento").val() +
        "&p_FECHA_EMISION=" + $("#txtFechaEmision").val(),
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

var ajaxDetalle = null;
function fillTblDetallesCompraVenta(par_tbl) {
    var opcion = 7

    Bloquear("divTblDetallesCompraVenta");
    if (ajaxDetalle) {
        ajaxDetalle.abort();
    }
    ajaxDetalle = $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=" + opcion +
        "&CTLG_CODE=" + $("#cboEmpresa").val() +
        "&SCSL_CODE=" + $("#cboEstablecimiento").val() +
        "&USUA_ID=" + $("#hfPIDM").val() +
        "&TIPO_DOC_CODE=" + $("#cboTipoDocumento").val() +
        "&COMPRA_VENTA_CODE=" + $("#hfCodDocSeleccionado").val() +
        "&COMPRA_VENTA_NUM_SEQ_DOC=" + $("#hfSecuenciaDocSeleccionado").val(),
        async: true,
        success: function (datos) {
            Desbloquear("divTblDetallesCompraVenta");
            if (datos != null) {
                if (par_tbl === undefined) {
                    $('#divTblDetallesCompraVenta').html(datos)
                    $("#tblDetallesCompraVenta").DataTable(
                        {
                            "scrollX": true,
                            "ordering": false,
                            "iDisplayLength": -1,
                            "oLanguage": {
                                "sEmptyTable": "No hay datos disponibles en la tabla.",
                                "sZeroRecords": "No hay datos disponibles en la tabla."
                            }
                        }
                    );
                    $("#tblDetallesCompraVenta_length").parent().parent().remove();
                    //Actualizar multiselect
                    $('.cboDevolucion').multiselect({
                        nonSelectedText: 'Ninguno',
                        numberDisplayed: 1
                    });
                    $(".cboDevolucion").on("change", function () {
                        var id = $(this).attr("id");
                        var nro = id.split("_")[1];
                        $("#txtDevolucion_" + nro + "").val(($("#" + id + " :selected").length).toFixed(2));
                        CalcularTotales();
                    });

                    $(".multiselect.dropdown-toggle.btn.btn-default").attr("style", "min-width:164px;");
                    $("#tblDetallesCompraVenta").DataTable().draw();

                    $(".inputDevolucion").on("paste", function () {
                        return false;
                    });

                    CalcularTotales();
                } else {

                }
            }
        },
        error: function (msg) {
            Desbloquear("divTblDetallesCompraVenta");
            if (msg.statusText != "abort") {
                alertCustom(msg);
            }
        },
        complete: function () {
            if (vg_notacredito) {
                $("#rbParcial").click().change();
                $("#uniform-rbParcial span").addClass("checked");
                $("#uniform-rbTotal span").removeClass("checked");

                ListarNotasCreditoxDocumento($("#cboEmpresa").val(), $("#cboEstablecimiento").val(), $("#hfCodDocSeleccionado").val());
                $("input[name=devolucion]").prop("disabled", true);
            } else {
                $("input[name=devolucion]").prop("disabled", false);
                $("#rbTotal").click().change();
                $("#uniform-rbTotal span").addClass("checked");
                $("#uniform-rbParcial span").removeClass("checked");

            }
        }
    });
}

function fillTblDetallesNotaCredito(code, codempr, seq) {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=11&p_NOCC_CODE=" + code + "&p_NOCC_NUM_SEQ_DOC=" + seq + "&p_CTLG_CODE=" + codempr,
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#divTblDetallesCompraVenta').html(datos)
                $("#tblDetallesCompraVenta").DataTable(
                    {
                        "iDisplayLength": -1,
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        },
                        "scrollX": true
                    });
                $(".lblMoneda").html("(" + $("#hfSimboloMoneda").val() + ")");

                //Actualizar multiselect
                $('.cboDevolucion').multiselect({
                    nonSelectedText: 'Ninguno',
                    numberDisplayed: 1
                });                

                $(".multiselect.dropdown-toggle.btn.btn-default").attr("style", "min-width:164px;");
                $("#tblDetallesCompraVenta").DataTable().draw();
                
            }
        },
        error: function (msg) {
            alertCustom("Detalles de nota de crédito no cargaron correctamente");
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
        async: false,
        success: function (datos) {
            if (datos != null) {
                if (!isNaN(parseFloat(datos[0].VALOR))) {
                    $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR));
                } else {
                    infoCustom2("El parámetro de Impuesto(0021) no es válido. Se considerará IGV 18%")
                    $('#hfIMPUESTO').val("0.18");
                }
            }
            else { alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!");
        }
    });
}

var p_sino = "N";

var CAMNOPR = function () {
    

    var plugins = function () {

        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDocumento').select2();
        $("#txtFechaTransaccion").datepicker("setDate", "now");
        $("#txtFechaEmision").datepicker("setEndDate", "now");
        $("#cboPeriodo").select2();
        $(".combobox").select2();

        $('#txtSerieNotaCredito').inputmask({ mask: '*', repeat: 4, greedy: false });
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
                    alertCustom("Error al cargar periodo.")
                }
                //   Fin2_CargaPeriodo();
            },
            complete: function () {
                if (periodo !== null) {
                    $('#cboPeriodo').select2("val", periodo);
                }
                Desbloquear("divCboPeriodo");
            },
            error: function (msg) {
                Desbloquear("divCboPeriodo");
                alertCustom("Error al cargar periodo.");
            }
        });
    }

    function filltxtrazsocial(v_ID, v_value) {

        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    selectRazonSocial.typeahead({
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
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
                        }
                        ,
                        updater: function (item) {
                            $("#hfPIDM").val(map[item].PIDM);
                            $("#hfDNI").val(map[item].DNI);
                            $("#hfRUC").val(map[item].RUC);
                            $("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                            return item;
                        }
                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtrazsocial").val().length <= 0) {
                            $("#hfPIDM").val("");
                        }
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
            },
            error: function (msg) {
                alertCustom("Proveedores no se listaron correctamente.");
            }
        });

    }

    //TIPOS DE DOCUMENTO DE REGISTRO (COMPRA)
    var fillCboTipoDocumento = function () {
        var select = $('#cboTipoDocumento');
        $.ajax({
            type: "post",
            url: 'vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=NRMX&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                $(select).append('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION_CORTA + '</option>');
                }
                $(select).select2("val", "");
            },
            error: function (msg) {
                alertCustom('Error al cargar tipo de documentos.');
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
                    $("#cboMotivo").append('<option value="' + datos[i].CodMotivoNC + '" codsunat="' + datos[i].CodMotivoSunatNC + '">' + datos[i].Descripcion + '</option>');
                }
                $("#cboMotivo").val("006").change();
            },
            error: function (msg) {
                alertCustom("Error al obtener motivos sunat de nota de crédito.");
            }
        });
    };

    var cargaInicial = function () {
        cargaTablaVaciaNotas();
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresa").change();
        filltxtrazsocial('#txtrazsocial', '');
        fillCboTipoDocumento()

        var code = ObtenerQueryString("codigo");
        var codempr = ObtenerQueryString("codempr");

        if (typeof (code) !== "undefined") {

            $("#grabar").html("<i class='icon-plus'></i> Nuevo");
            $("#grabar").attr("href", "?f=CAMNOPR");

            $("#btnBuscarDocumento").attr("style", "display:none;");
            $("#cancelar").attr("style", "display:none;");
            //DESHABILITAR TODO
            $("#cboEmpresa").select2("val", codempr);
            $("#cboEmpresa").change();

            $("#cboEmpresa").attr("disabled", "disabled");
            $("#cboEstablecimiento").attr("disabled", "disabled");
            $("#txtSerieNotaCredito").attr("disabled", "disabled");
            $("#txtNroNotaCredito").attr("disabled", "disabled");
            $("#txtrazsocial").attr("disabled", "disabled");
            $("#txtNro").attr("disabled", "disabled");
            $("#txtNroSerie").attr("disabled", "disabled");
            $("#cboTipoDocumento").attr("disabled", "disabled");
            $("#rbParcial").attr("disabled", "disabled");
            $("#rbTotal").attr("disabled", "disabled");
            $("#tblDetallesCompraVenta").attr("disabled", "disabled");
            $("#chkAlmacen").attr("disabled", "disabled");
            $("#txtSerieNotaCredito").attr("disabled", "disabled");
            $("#txtNroNotaCredito").attr("disabled", "disabled");
            $("#txtFechaEmision").attr("disabled", "disabled");
            $("#cboPeriodo").attr("disabled", "disabled");

            $("#btnImprimirDcto").removeAttr("style");

            $.ajax({
                type: "post",
                url: "vistas/CA/ajax/calnocr.ashx?opcion=2&p_NOCC_CODE=" + code + "&p_CTLG_CODE=" + codempr,
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {

                    $("#txtTotalDevolucion").attr("disabled", "disabled");
                    $("#txtMontoIgv").attr("disabled", "disabled");
                    $("#txtMonto").attr("disabled", "disabled");
                    $("#txtAjuste").attr("disabled", "disabled");

                    $("#hfMoneda").val(datos[0].MONEDA);
                    $("#hfSimboloMoneda").val(datos[0].MONEDA_SIMBOLO);

                    $("#cboEstablecimiento").select2("val", datos[0].SUCURSAL_CODE)
                    $("#txtSerieNotaCredito").val(datos[0].SERIE_NUMERO.split("-")[0]);
                    $("#txtNroNotaCredito").val(datos[0].SERIE_NUMERO.split("-")[1]);
                    $("#txtrazsocial").val(datos[0].RAZON_SOCIAL);
                    $("#txtNro").val(datos[0].SERIE);
                    $("#txtNroSerie").val(datos[0].SERIE);

                    $("#txtFechaEmision").val(datos[0].EMISION);
                    $("#txtFechaTransaccion").val(datos[0].FECHA_TRANSACCION.substring(0, 10));

                    $("#cboTipoDocumento").select2("val", datos[0].ORIGEN_TIPO_DOC);
                    $("#tblDetallesCompraVenta").val(datos[0].SERIE);
                    $("#hfPIDM").val(datos[0].PIDM);
                    $("#hfCodDocSeleccionado").val(datos[0].ORIGEN);
                    $("#hfSecuenciaDocSeleccionado").val(datos[0].SECUENCIA);

                    if (datos[0].MES_PERIODO == null || datos[0].ANHO_PERIODO == null || datos[0].NOMBRE_MES == null) {
                        periodo = "";
                    } else {
                        periodo = (parseInt(datos[0].MES_PERIODO).toString() + "-" + datos[0].ANHO_PERIODO);
                    }                    

                    $("#cboPeriodo").select2('val', periodo);


                    var periodo_selected = $("#cboPeriodo").val();

                    if (periodo_selected == null || periodo_selected == "") {
                        $("#divCboPeriodo").empty();
                        var valor_periodo = "NO ASIGNADO";
                        if (periodo !== "") {
                            valor_periodo = datos[0].NOMBRE_MES + " - " + datos[0].ANHO_PERIODO;
                        }
                        var input_periodo = $('<input>', {
                            'type': 'text',
                            'class': 'span12',
                            'id': 'txtPeriodoAntiguo',
                            'value': valor_periodo,
                            'disabled': 'disabled'
                        });
                        $("#divCboPeriodo").append(input_periodo);
                    }


                    obtenerDocumento(datos[0].ORIGEN);

                    if (datos[0].ENTREGA_DESPACHO_ALMACEN == 'S') {
                        $("#chkAlmacen").attr("checked", true).parent().addClass("checked");
                    }
                    else {
                        $("#chkAlmacen").attr("checked", false).parent().removeClass("checked");
                    }

                    fillTblDetallesNotaCredito(code, codempr, datos[0].SECUENCIA);

                    $($($(".cboDevolucion").siblings()).children().siblings("ul")).find("input").each(function (e, f) {
                        $(f).prop("disabled", true);
                    });

                    $("#divTotales").slideDown();
                    $("#txtMontoIgv").val(datos[0].MONTO_IGV);
                    $("#txtTotalDevolucion").val(datos[0].MONTO_TOTAL);
                    $("#txtAjuste").val(datos[0].AJUSTE);
                    $("#txtMonto").val(parseFloat(datos[0].MONTO_TOTAL) + parseFloat(datos[0].AJUSTE));

                    if ($("#total_parcial").val() == 'False' || parseFloat(datos[0].ORIGEN_IMPORTE) != parseFloat(datos[0].MONTO_TOTAL)) {
                        $("#rbParcial").attr("checked", true).parent().addClass("checked");
                        $("#rbTotal").attr("checked", false).parent().removeClass("checked");
                    }
                    else {
                        $("#rbTotal").attr("checked", true).parent().addClass("checked");
                        $("#rbParcial").attr("checked", false).parent().removeClass("checked");

                    }

                    fnCargaTablaCuentasC(code);                    

                },
                error: function (msg) {
                    alert(msg);
                }
            });
        } else {
            fnCargaTablaCuentasC();
        }
    }

    var eventoControles = function () {
        var establecimientoAnterior;
        var empresaAnterior;
        $('#cboEmpresa').on('change', function () {
            if ($("#cboEmpresa").val() != empresaAnterior && $("#cboEmpresa").val() != "") {
                fillCboEstablecimiento($("#cboEmpresa").val());

                $("#inputRazsocial").html("");
                $("#inputRazsocial").html('<input id="txtrazsocial" class="span12" type="text" data-provide="typeahead"  placeholder="Proveedor"/>');
                filltxtrazsocial('#txtrazsocial', '');
                //fillCboPeriodo();
            }
            empresaAnterior = $('#cboEmpresa').val();
        });

        $('#rbTotal,#rbParcial').on('change', function () {
            if ($("#rbTotal").is(":checked")) {
                $("#cboMotivo").val("006").change();
            } else if ($("#rbParcial").is(":checked")) {
                $("#cboMotivo").val("007").change();
            } else {
                $("#cboMotivo").val("").change();
            }
            BloqueaCamposProductosSeriados();
        });

        $('#btnBuscarDocumento').on('click', function () {
            if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtrazsocial", "txtFechaEmision"])) {
                mostrarModalBuscarDocumento();
            }
        });

        $("#chkAlmacen").on("change", function () {
            var oTable = $("#tblDetallesCompraVenta").DataTable();
            if ($("#chkAlmacen").is(":checked")) {
                oTable.columns(7).visible(false)
                $("#lblMsgDespacho .no").html("NO");
            } else {
                oTable.columns(7).visible(true)
                $("#lblMsgDespacho .no").html("");
            }
            $("#lblMsgDespacho").pulsate({
                color: "#33AECD",
                reach: 20,
                repeat: 1,
                glow: true
            });
            BloqueaCamposProductosSeriados();
        });

        $(".inputDevolucion").live("keyup", function () {
            CalcularTotales();
        });
        $(".inputDevolucion").live("change", function () {
            CalcularTotales();
        });

        $("#txtTotalDevolucion").live("keyup", function () {
            //CambiarMensajes();
        });


        $("#txtAjuste").on("keyup", function (e) {
            if ($(this).val().toString().length > 0) {


                if (parseFloat($(this).val()) > 0.03 || parseFloat($(this).val()) < -0.03) {
                    $(this).val('0');
                    infoCustom("El ajuste debe ser menor a 0.03 y mayor -0.03 ");
                    return false;
                }
                calculaMontos();



            }
            CambiarMensajes();
        });


        $("#txtAjuste").on("blur", function (e) {
            if ($(this).val().toString().length <= 0 || $("#txtAjuste").val() == '.' || $("#txtAjuste").val() == '-') {
                $("#txtAjuste").val('0');
                calculaMontos();
                CambiarMensajes();
            }
        });

        //INI JC
        $("#btnAceptarConfir").on("click", function () {
            p_sino = "S";
            GrabarNotaCredito();
            $("#modal-confirmar").modal("hide");
        });

        $("#btnCancelarConfir").on("click", function () {
            p_sino = "N";
            GrabarNotaCredito();
            $("#modal-confirmar").modal("hide");
        });
        //FIN JC

    }

    let calculaMontos = function () {

        if ($("#txtAjuste").val() == '.' || $("#txtAjuste").val() == '-') {
            $("#txtTotalDevolucion").val('0.00');
        } else {
            let nMonto = $("#txtMonto").val().toString().length > 0 ? $("#txtMonto").val() : 0;
            let nAjuste = $("#txtAjuste").val().toString().length > 0 ? $("#txtAjuste").val() : 0;
            let nTotal = parseFloat(nMonto) + parseFloat(nAjuste);

            $("#txtTotalDevolucion").val(nTotal.toFixed(2));
        }

    }

    var fnCargaTablaCuentasC = function (codDcto) {
        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = "0038";
                    vAsientoContable.sCodDoc = codDcto;
                    vAsientoContable.objDoc = null;
                    vAsientoContable.validate = false;
                    vAsientoContable.init(codDcto);
                });
        });
    }

    return {
        init: function () {
            plugins();

            fillCboEmpresa();
            fillCboEstablecimiento($("#ctl00_hddctlg").val());
            fillCboPeriodo();
            filltxtrazsocial('#txtrazsocial', '');
            fillCboTipoDocumento();
            fillCboMotivoSunat();
            cargaInicial();
            eventoControles();
            cargarParametrosSistema();

            var igv = parseFloat($("#hfIMPUESTO").val()) * 100;
            $(".lblPctjIgv").html("(" + igv.toFixed(1) + " %)");
        }
    };

}();




function mostrarModalBuscarDocumento() {
    Bloquear("ventana")
    var html =
        '<div id="_buscarDocumento"  style="display: block; width: 850px; left: 45%;" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">' +
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
        '                         <th>EMISION</th>' +
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
}
vg_importe_de_notas = 0.00;
vg_notacredito = false;
function setSeleccionDocumento(codigo, secuencia, serie, nro, tipo, importe, moneda, simboloMoneda, incIgv, fechaEmision, importe_pagar, importe_sin_notas, nota_credito, mopa_code, monto_usa, tipo_operacion) {
    //alert(incIgv);

    Bloquear("ventanaBuscarDocumento")
    $("#hfCodDocSeleccionado").val(codigo);
    $("#hfSerieDocSeleccionado").val(serie);
    $("#hfNroDocSeleccionado").val(nro);
    $("#hfSecuenciaDocSeleccionado").val("1");
    $("#hfMoneda").val(moneda);
    $("#hfSimboloMoneda").val(simboloMoneda);
    //$("#hfIncIgvInd").val(incIgv);
    $("#hfIncIgvInd").val(tipo_operacion);
    //(incIgv == "S") ? $(".lblIncIgv").html("SI") : $(".lblIncIgv").html("NO");
    (tipo_operacion !== "ORGNGR") ? $(".lblIncIgv").html("SI") : $(".lblIncIgv").html("NO");
    //vg_importe_de_notas = (importe_sin_notas == 0 ? 0 : parseFloat(importe_pagar) - parseFloat(importe_sin_notas));
    console.log(importe_pagar);
    console.log(importe_sin_notas);
    vg_importe_de_notas = monto_usa;

    //editar
    $("#hfTipoDocSeleccionado").val(tipo);
    $("#hfImporteOrigen").val(importe_pagar);
    $(".lblMoneda").html("(" + simboloMoneda + ")");
    $("#lblDctoSeleccionado").html($("#cboTipoDocumento option[value='" + tipo + "']").html())

    mopaDoc = mopa_code;

    vg_notacredito = false;
    if (nota_credito == 'S') {
        vg_notacredito = true;
    }

    $("#divDctoSeleccionado").slideDown();

    if (codigo != "" & serie != "") {
        $("#txtNro").val($("#hfNroDocSeleccionado").val());
        $("#txtSerie").val($("#hfSerieDocSeleccionado").val());
        fillTblDetallesCompraVenta();
        BloquearxSeleccion();
        if (fechaEmision != "") {
            $("#txtFechaEmision").datepicker("setStartDate", fechaEmision);
        }
        ObtenerDeudaDocumento();
    }
    else {
        $("#txtNro").val("");
        $("#txtSerie").val("");
    }

    Desbloquear("ventanaBuscarDocumento");
    //$(".doc_fila").css("background-color", "#f9f9f9 !important");
    //$("#doc_fila_" + codigo + "_" + serie + "").css("background-color", "#cbcbcb !important");
    $("#_buscarDocumento").modal('hide');

    BloqueaCamposProductosSeriados();
}

var ajaxDeuda = null;
var deudaOrigen = "";
function ObtenerDeudaDocumento() {
    $("#lblDeuda").html("...")
    if (ajaxDeuda) {
        ajaxDeuda.abort();
    }
    ajaxDeuda = $.ajax({
        type: "post",
        url: "vistas/ca/ajax/camnopr.ashx?OPCION=DEUDA" +
        "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
        "&p_PERS_PIDM=" + $("#hfPIDM").val() +
        "&p_ORIGEN_CODE=" + $("#hfCodDocSeleccionado").val(),
        contenttype: "application/text;",
        datatype: "text",
        async: true,
        success: function (datos) {
            deudaOrigen = datos;
            CambiarMensajes();
        },
        error: function (msg) {
            deudaOrigen = "NO_ENCONTRADO";
            $("#lblDeuda").html("...")
            if (msg.statusText != "abort") {
                alertCustom("Deuda del Documento Referenciado no se obtuvo correctamente.");
            }
        }
    });
}

function CambiarMensajes() {
    if (deudaOrigen != "NO_ENCONTRADO") {
        var deuda = parseFloat(deudaOrigen);
        $("#lblDeuda").html($(".lblMoneda").html() + " " + deuda.toFixed(2));
        $("#lblNotacredi").html($(".lblMoneda").html() + " " + formatoMiles(vg_importe_de_notas));
        //13.05.2016 srl
        var vistaAmortizar = 'none';
        if (deuda.toFixed(2) > 0) {
            vistaAmortizar = 'inline-block';
        }
        //$("#divchkAmortizar").css({ "display": vistaAmortizar });

        if (parseFloat(deuda.toFixed(2)) >= parseFloat($("#txtTotalDevolucion").val())) {
            $("#lblMsgUsable .no").html("PODRÁ");
        } else {
            $("#lblMsgUsable .no").html("NO PODRÁ");
        }
    } else {
        $("#lblDeuda").html("(No se pudo consultar)");
    }
}

// MANTENIMIENTO / TRANSACCIONES

function Crear() {
    $("#modal-confirmar").modal("show");

}

var detalles = "";
var montoTotal = 0;
var montoTotalSinIgv = 0;
var montoIgv = 0;
var precio = 0;


function GrabarNotaCredito() {
    var res = false;
    //Proveedores compra(por pagar)
    if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtrazsocial", "txtSerieNotaCredito", "txtNroNotaCredito", "txtFechaEmision", "txtTotalDevolucion", "txtMontoIgv", "cboPeriodo", "cboMotivo", "hfPIDM"])) {
        res = true;
        if (parseFloat($("#txtTotalDevolucion").val()) <= 0) {
            res = false;
            infoCustom("Monto no puede ser menor o igual a 0.");
        }
    }

    if (res == true) {
        var continuar = true;
        var data = new FormData();
        //    continuar = CalcularTotales();
        var cantDetalles = parseFloat($("#hfCantDetalles0").val());
        for (var i = 0; i < cantDetalles; i++) {

            if ($("#txtDevolucion_" + i + "").val() === "" || typeof $("#txtDevolucion_" + i + "").val() == "undefined") {
                continuar = false;
                $("#txtDevolucion_" + i + "").addClass("required");
                $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
            }
            else {

                if (parseFloat($("#hfDetalle" + i + "_cant").val()) < parseFloat($("#txtDevolucion_" + i + "").val())) {
                    continuar = false;
                    $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
                }
                else {
                    $("#txtDevolucion_" + i + "").css("outline", "none");

                }
            }
        }

        if (!ValidaCantidadCero()) {
            continuar = false;
        }

        if (continuar) {
            data.append('p_NUM_SEQ_DOC', $("#hfSecuenciaDocSeleccionado").val());
            data.append('p_ORIGEN_CODE', $("#hfCodDocSeleccionado").val());
            data.append('p_ORIGEN_TIPO_DOC', $("#hfTipoDocSeleccionado").val());
            data.append('p_ORIGEN_IMPORTE', $("#hfImporteOrigen").val());
            data.append('p_DESTINO_CODE', "");
            data.append('p_DESTINO_TIPO_DOC', "");
            data.append('p_PERS_PIDM', $("#hfPIDM").val());
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_COMPRA_VENTA_IND', "C");
            data.append('p_ESTADO_IND', "A");
            data.append('p_ESTADO_USO', "");
            data.append('p_USUA_ID', $("#ctl00_txtus").val());
            data.append('p_ENTREGA_DESPACHO_ALMACEN', $("#chkAlmacen").is(":checked") ? "S" : "N");
            data.append('p_AUTOAMORTIZAR', $("#chkAmortizar").is(":checked") ? "S" : "N");
            data.append('p_SERIE', $('#txtSerieNotaCredito').val());
            data.append('p_NUMERO', $("#txtNroNotaCredito").val());


            let nTotalDocRef = parseFloat($("#hfImporteOrigen").val());
            let nMontoADevolver = parseFloat($("#txtTotalDevolucion").val());
            let nDeuda = parseFloat(deudaOrigen);
            let nMontoPagado = nTotalDocRef - nDeuda;
            let nMontoDisponible = 0.00;

            //if (mopaDoc == codContado) {
            nMontoDisponible = parseFloat(nMontoPagado) - parseFloat(vg_importe_de_notas);
            //}
            //else{
            //    nMontoDisponible = nTotalDocRef - parseFloat(nMontoPagado);
            //}

            //if (nMontoADevolver > nMontoDisponible)
            //{
            //    infoCustom2("El Monto de la Nota de Credito(" + nMontoADevolver.Redondear(2) + ") no puede superar el Monto Disponible(" + nMontoDisponible.Redondear() +
            //        ").");
            //    return;
            //}

            let nMontoTotal = 0;
            if (nMontoADevolver > 0)
                nMontoTotal = nMontoADevolver;

            data.append('p_MONTO_TOTAL', nMontoTotal);
            data.append('p_MONTO_IGV', $("#txtMontoIgv").val());
            data.append('p_AJUSTE', $("#txtAjuste").val());

            data.append('p_FECHA_EMISION', $("#txtFechaEmision").val());
            data.append('p_CODIGO_CORRELATIVO', '');
            data.append('p_IGV', parseFloat($("#hfIMPUESTO").val()) * 100);
            data.append('p_COD_MOTIVO_NC', $("#cboMotivo").val());
            data.append('p_SI_NO', p_sino);
            data.append('p_DETALLES', detalles);
            data.append('p_MES_PERIODO', $("#cboPeriodo").val().split("-")[0]);
            data.append('p_ANIO_PERIODO', $("#cboPeriodo").val().split("-")[1]);


            Bloquear("ventana");

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=9",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
                .success(function (datos) {
                    if (datos != null) {
                        if (datos[0].CODIGO) {
                            if (datos[0].CODIGO == "EXISTE") {
                                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> El documento ya existe!")
                            }
                            else if (datos[0].CODIGO == "LIMITE") {
                                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Se ha excedido el límite de documentos autorizados!")
                            }
                            else if (datos[0].CODIGO == "ERROR") {
                                console.log(datos[0].ERROR);
                                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/>")
                            }
                            else {

                                $("#btnBuscarDocumento").attr("style", "display:none");
                                $("#hfCodigoNotaCredito").val(datos[0].CODIGO);
                                $("#hfSecuenciaNotaCredito").val(datos[0].SECUENCIA);
                                $("#grabar").off('click');
                                $("#grabar").html("<i class='icon-plus'></i> Nuevo");
                                $("#grabar").attr("href", "?f=CAMNOPR");
                                exito();
                                fillTblDetallesNotaCredito(datos[0].CODIGO, $("#cboEmpresa").val(), datos[0].SECUENCIA);       

                                $($($(".cboDevolucion").siblings()).children().siblings("ul")).find("input").each(function (e, f) {
                                    $(f).prop("disabled", true);
                                });

                                //BloquearCampos
                                $("#txtTotalDevolucion").attr("disabled", "disabled");
                                $("#txtMontoIgv").attr("disabled", "disabled");
                                $("#txtMonto").attr("disabled", "disabled");
                                $("#txtAjuste").attr("disabled", "disabled");

                                $("#txtSerieNotaCredito").attr("disabled", "disabled");
                                $("#txtNroNotaCredito").attr("disabled", "disabled");
                                $("#cboTipoDocumento").val($("#hfTipoDocSeleccionado").val()).attr("disabled", "disabled");
                                $("#txtFechaEmision").attr("disabled", "disabled");
                                $("#rbParcial,#rbTotal").attr("disabled", "disabled");
                                $("#chkAlmacen").attr("disabled", "disabled");
                                $("#chkAmortizar").attr("disabled", "disabled");
                                $("#cboPeriodo").attr("disabled", "disabled");

                                $("#divTotales").slideDown();
                                $("#btnImprimirDcto").removeAttr("style");

                                vAsientoContable.sCodDoc = $("#hfCodigoNotaCredito").val();
                                $('#btnGenerarAsiento').click();
                            }

                        }
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
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Los campos de cantidad en los detalles no deben ser vacíos o mayores a la cantidad recibida!")
        }
    }
}

function CalcularTotales() {
    var continuar = true;
    montoTotal = 0;
    montoTotalSinIgv = 0;
    montoIgv = 0;
    precio = 0;

    var cantDetalles = $("#hfCantDetalles0").val();
    if (cantDetalles >= 0 && typeof cantDetalles != "undefined") {
        //---------------------OBTENER DETALLES-------------
        detalles = "";
        for (var i = 0; i < cantDetalles; i++) {
            var subtotal;
            detalles += $("#hfDetalle" + i + "_prod").val() + ";"; //PROD_CODE
            detalles += $("#hfDetalle" + i + "_um").val() + ";";//UM_CODE
            detalles += $("#hfDetalle" + i + "_pu").val() + ";";//PRECIO UNITARIO
            detalles += $("#hfDetalle" + i + "_imp").val() + ";";//SUBTOTAL ORIGEN
            detalles += $("#hfDetalle" + i + "_cant").val() + ";";// CANTIDAD ORIGEN (DESPACHADA)
            //CANTIDAD DEVOLUCION
            if ($("#rbTotal").is(":checked")) {
                subtotal = parseFloat($("#hfDetalle" + i + "_cant").val()) * parseFloat($("#hfDetalle" + i + "_pu").val())
                detalles += $("#hfDetalle" + i + "_cant").val() + ";";
            }
            else {
                subtotal = parseFloat($("#txtDevolucion_" + i + "").val()) * parseFloat($("#hfDetalle" + i + "_pu").val())
                detalles += $("#txtDevolucion_" + i + "").val() + ";";
            }
            detalles += subtotal + ";";        // NUEVO SUBTOTAL            
            detalles += $("#hfDetalle" + i + "_item").val() + ";"; //ITEM

            detalles += ObtenerSeries(i) + ";"; //NRO SERIE PRODUCTOS SERIADOS
            detalles += (($("#cboDevolucion_" + i + "").val() != null) ? $("#cboDevolucion_" + i + "").val().toString() : "") + ";";//CODIGO MCDR PRODUCTOS SERIADOS
            detalles += 0 + "|";//ISC
        }
        //-------------------FIN OBTENER DETALLES-------------

        //OBTENER MONTO TOTAL E IGV  
        //JC
        var incIgv = $("#hfIncIgvInd").val();
        var igv = parseFloat($("#hfIMPUESTO").val());
        for (var i = 0; i < cantDetalles; i++) {

            if ($("#txtDevolucion_" + i + "").val() === "" || typeof $("#txtDevolucion_" + i + "").val() == "undefined") {
                continuar = false;
                $("#txtDevolucion_" + i + "").addClass("required");
                $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
            }
            else {

                if (parseFloat($("#hfDetalle" + i + "_cant").val()) < parseFloat($("#txtDevolucion_" + i + "").val())) {
                    continuar = false;
                    $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
                }
                else {
                    $("#txtDevolucion_" + i + "").css("outline", "none");

                    precio = parseFloat($("#hfDetalle" + i + "_pu").val());
                    //if ($("#hfIncIgvInd").val() == "S") {
                    //    precio = precio / (igv + 1);
                    //}  //El precio siempre no tendrá igv
                    montoTotalSinIgv += parseFloat($("#txtDevolucion_" + i + "").val()) * precio;
                }
            }
        }
        //alert(incIgv);

        if (incIgv !== "ORGNGR") {
            montoTotal = montoTotalSinIgv + (montoTotalSinIgv * igv);
            montoIgv = montoTotalSinIgv * igv;
        } else {
            montoTotal = montoTotalSinIgv;
            
        }

        $("#txtMontoIgv").val(montoIgv.toFixed(2));
        $("#txtTotalDevolucion").val(montoTotal.toFixed(2));
        $("#txtAjuste").val('0');
        $("#txtMonto").val(montoTotal.toFixed(2));
    }

    if (!ValidaCantidadCero()) {
        continuar = false;
    }

    $("#divTotales").slideDown();
    CambiarMensajes();
    return continuar;
}

function ObtenerSeries(item) {
    var optns = $("#cboDevolucion_" + item + " option");
    var inputs = $($($("#cboDevolucion_" + item + "").siblings()).children().siblings("ul")).find("input");
    var nroSeries = "";
    var nroSelec = 0;
    var c = 0;
    $(inputs).each(function (e, f) {
        if ($(f).is(":checked")) {
            nroSelec++;
        }
    });
    $(inputs).each(function (e, f) {
        if ($(f).is(":checked")) {
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

function obtenerDocumento(CODIGO_DOC) {
    var opcion = 12;
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=" + opcion +
        "&CTLG_CODE=" + $("#cboEmpresa").val() +
        "&CODIGO_DOC=" + CODIGO_DOC,
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#txtNro').val(datos[0].NUMERO);
                $("#txtSerie").val(datos[0].SERIE);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function ValidaCantidadOrigen(c, cantidad) {
    var valor = $(c).val();
    if (parseFloat(valor) > parseFloat(cantidad)) {
        $(c).val(cantidad);
    }
}

function ValidaCantidadCero() {
    var continuar = false;
    var inputs = $(".inputDevolucion");
    for (var i = 0; i < inputs.length; i++) {
        if (parseFloat($(inputs[i]).val()) == 0) {
            continuar = continuar | false;
        } else {
            continuar = true;
            break;
        }
    }
    if (continuar == 0) {
        return false
    }
    else {
        return true;
    }
}

function BloqueaCamposProductosSeriados() {
    if ($("#rbTotal").is(":checked")) {
        $(".inputDevolucion").attr("disabled", "disabled");
        var inputs = $(".inputDevolucion");
        for (var i = 0; i < inputs.length; i++) {
            $(inputs[i]).val($(inputs[i]).attr("max"));
        }

        $($(".cboDevolucion").siblings()).children().attr("disabled", "disabled").addClass("disabled");

        //DesSelecionar todos los combos
        $($($(".cboDevolucion").siblings()).children().siblings("ul")).find("input").each(function (e, f) {
            if ($(f).is(":checked")) {
                $(f).click();
            }
        });
        //Seleccionar solo la cantidad segun se haya despachado 
        var cbos = $(".cboDevolucion");
        for (var i = 0; i < cbos.length; i++) {
            var nroSeleccionados = 0;
            $($($(cbos[i]).siblings()).children().siblings("ul")).find("input").each(function (e, f) {
                var id = $(cbos[i]).attr("id").split("_")[1];
                var cant = parseFloat($("#hfDetalle" + id + "_cant").val());
                if (nroSeleccionados < cant) {
                    nroSeleccionados++;
                    $(f).click();
                }
            });
        }
    }
    else {
        var inputs = $(".inputDevolucion");
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).parent().parent().children().find(".cboDevolucion").length == 0) {
                $(inputs[i]).removeAttr("disabled");
                $(inputs[i]).val("0.00");
            }
            else {
                if ($("#chkAlmacen").is(":checked")) {
                    $(inputs[i]).removeAttr("disabled");
                }
                else {
                    $(inputs[i]).attr("disabled", "disabled");
                }

                //DesSelecionar todos los combos
                $($($(".cboDevolucion").siblings()).children().siblings("ul")).find("input").each(function (e, f) {
                    if ($(f).is(":checked")) {
                        $(f).click();
                    }
                });
            }
        }
        $($(".cboDevolucion").siblings()).children().removeAttr("disabled").removeClass("disabled");
    }

    //var oTable = $("#tblDetallesCompraVenta").DataTable();
    //if ($("#txtSerie").val() != "") {
    //    if ($("#chkAlmacen").is(":checked")) {
    //        oTable.columns(7).visible(false)
    //    } else {
    //        oTable.columns(7).visible(true)
    //    }
    //}
    CalcularTotales();
}

function BloquearxSeleccion() {
    $("#cboEmpresa,#cboEstablecimiento").attr("disabled", "disabled");
    $("#txtrazsocial").attr("disabled", "disabled");
}

function ImprimirDcto() {

    if ($("#styleImpresion").html() == undefined) {
        var estilos = '<style id="styleImpresion">@media print {.navbar-inner {display: none !important;}.page-sidebar {display: none  !important;}.footer {display: none  !important;}.page-content {margin-left: 0px  !important;}#contenedor{display: none  !important;}#contenedorBreadcrumb{ display: none  !important;}.page-container {margin-top: 0px  !important;}#divDctoImprimir {display: block  !important;width: 100%  !important;font-size: 12px  !important;line-height: 14px  !important;}.container-fluid {padding: 0px  !important;}}</style>';
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
        Bloquear("ventana");
        var data = new FormData();
        data.append('p_NOCC_CODE', code);
        data.append('p_CTLG_CODE', codempr);
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CA/ajax/CALNOCR.ashx?OPCION=3",
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


    }
}


//*********************************** LISTAR  *************************************

function ListarNotasCredito(ctlg, scsl) {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/calnocr.ashx?OPCION=1&p_CTLG_CODE=" + ctlg +
        "&p_SCSL_CODE=" + scsl + "&p_COMPRA_VENTA_IND=C",
        contenttype: "application/text;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {

                $('#divTblNotasCredito').html(datos);

                var oTable = $("#tblNotasCredito").DataTable({
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    },
                    "scrollX": "true",
                    "order": [[8, "desc"]]
                });

                oTable.column(0).visible(false);


            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alert(msg);
        }
    });


}

function cargaTablaVaciaNotas() {

    oTableNotaCred = $("#tblLNotaCred").dataTable({
        sDom: 'lfrtip ',
        data: null,
        columns: [
            {
                data: "DOCUMENTO"
            },
            {
                data: "EMISION",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');
                },
                type: 'fecha'
            },
            {
                data: "MONTO_TOTAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).html(rowData.MONEDA_SIMBOLO + rowData.MONTO_TOTAL);
                    $(td).css('text-align', 'right');
                }
            },
            {
                data: "FECHA_TRANSACCION",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');
                },
                type: "fechaHora"
            },

        ]
    });

    $('#tblLNotaCred tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTableNotaCred.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTableNotaCred.fnGetPosition(this);
            var row = oTableNotaCred.fnGetData(pos);
            var codigo = row.CODIGO;
            window.open('?f=CAMNOPR&codigo=' + codigo + '&codempr=' + row.EMPRESA_CODE, "_blank");
        }

    });
}



function ListarNotasCreditoxDocumento(ctlg, scsl, doc) {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=3&p_CTLG_CODE=" + ctlg +
        "&p_SCSL_CODE=" + scsl + "&p_COMPRA_VENTA_IND=C" + "&doc_origen_code=" + doc,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos.length > 0) {

                $($(".cboDevolucion").siblings()).children().removeAttr("disabled").removeClass("disabled");

                oTableNotaCred.fnClearTable();
                oTableNotaCred.fnAddData(datos);
                $("#tituloModal").html("LISTA DE NOTAS DE CREDITO DE LA FACTURA " + datos[0].DOCUMENTO_ORIGEN);

                $("#lblTotalNotas").html(datos.length);
                $("#aVerDetalles").css({ "display": "inline-block" })
                    .click(function () { $("#muestralistaNotasCred").modal('show'); });

                for (var i = 0; i < datos.length; i++) {

                    $.ajax({
                        type: "post",
                        url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=11&p_NOCC_CODE=" + datos[i].CODIGO + "&p_NOCC_NUM_SEQ_DOC=" + datos[i].SECUENCIA + "&p_CTLG_CODE=" + ctlg + "&lista_tabla=N",
                        async: false,
                        contenttype: "application/json;",
                        datatype: "json",
                        success: function (json) {
                            if (json.length > 0) {
                                for (var j = 0; j < json.length; j++) {
                                    if (json[j].CANTIDAD_DEVL != 0) {
                                        var id = "#det_fila_" + doc + "_" + json[j].PRODUCTO;
                                        $(id).css({ "background-color": "rgb(255, 255, 168)" });
                                        $(id + " [id*=txtDevolucion]").attr("max", parseInt($(id + " [id*=txtDevolucion]").attr("max")) - parseInt(json[j].CANTIDAD_DEVL));
                                        if (json[j].SERIADO_IND == 'S') {
                                            var codigosmcdr = json[j].CODS_MCDR.split(",");
                                            for (var k = 0; k < codigosmcdr.length; k++) {
                                                if ($($(id + " [id*=cboDevolucion]").siblings("div")).find("input[value=" + codigosmcdr[k] + "]").is(":checked")) {
                                                    $($(id + " [id*=cboDevolucion]").siblings("div")).find("input[value=" + codigosmcdr[k] + "]").click();
                                                }
                                                $($(id + " [id*=cboDevolucion]").siblings("div")).find("input[value=" + codigosmcdr[k] + "]").prop("disabled", true);
                                                $($($(id + " [id*=cboDevolucion]").siblings("div")).find("input[value=" + codigosmcdr[k] + "]").parents("a")[0]).css({ "background-color": "rgb(255, 255, 168)" });
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        error: function (msg) {
                            alertCustom("Detalles de nota de crédito no cargaron correctamente");
                        }
                    });

                }
            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alert(msg);
        }
    });


}

var CALNOPR = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
    }

    var cargaInicial = function () {
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresa").change();
    }

    var eventoControles = function () {
        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#buscar').on('click', function () {
            ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboEstablecimiento($("#ctl00_hddctlg").val());
            eventoControles();
            cargaInicial();
            ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
        }
    };

}();

function cargarNotaCredito(codigo, codempr) {
    window.location.href = "?f=CAMNOPR&codigo=" + codigo + "&codempr=" + codempr
}

function irAnularDcto(codigo) {
    window.location.href = "?f=CAMANPR&codigo=" + codigo
}
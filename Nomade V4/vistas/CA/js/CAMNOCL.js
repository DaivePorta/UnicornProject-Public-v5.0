// CARGA DE DATOS/COMBOS INICIAL

function fillCboEmpresa() {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
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
        url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=1&CTLG_CODE=" + ctlg,
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
        url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=6" +
            "&CTLG_CODE=" + $("#cboEmpresa").val() +
            "&SCSL_CODE=" + $("#cboEstablecimiento").val() +
            "&USUA_ID=" + $("#hfPIDM").val() +            
            "&TIPO_DOC_CODE=" + $("#cboTipoDocumento").val()+
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
function fillTblDetallesCompraVenta() {
    Bloquear("divTblDetallesCompraVenta");
    if (ajaxDetalle) {
        ajaxDetalle.abort();
    }
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=8" +
            "&CTLG_CODE=" + $("#cboEmpresa").val() +
            "&SCSL_CODE=" + $("#cboEstablecimiento").val() +
            "&USUA_ID=" + $("#hfPIDM").val() +
            "&TIPO_DOC_CODE=" + $("#cboTipoDocumento").val() +
            "&COMPRA_VENTA_CODE=" + $("#hfCodDocSeleccionado").val() +
            "&COMPRA_VENTA_NUM_SEQ_DOC=" + $("#hfSecuenciaDocSeleccionado").val() +
            "&p_COD_MOTIVO_NC=" + $('#cboMotivo :selected').attr('codsunat'),
        async: false,
        success: function (datos) {
            Desbloquear("divTblDetallesCompraVenta");
            if (datos != null) {
                $('#divTblDetallesCompraVenta').html(datos);
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
            }
        },
        error: function (msg) {
            Desbloquear("divTblDetallesCompraVenta");
            if (msg.statusText != "abort") {
                alertCustom(msg);
            }
        }
    });
}

function fillTblDetallesNotaCredito(code, codempr, seq) {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=11&p_NOCC_CODE=" + code + "&p_NOCC_NUM_SEQ_DOC=" + seq + "&p_CTLG_CODE=" + codempr,
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
                $(".lblMoneda").html("TOTAL (" + $("#hfSimboloMoneda").val() + ")");
                
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
    //OBTENER IMPUESTO GENERAL A LAS VENTAS (en decimales)
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

// PARA OBTENER LOS CODIGOS DE LAS SERIES DE MANERA GLOBAL
var FNC = "";
var BNC = "";

var CAMNOCL = function () {
    

    var plugins = function () {

        $('.combobox').select2();

        $("#txtFechaTransaccion").datepicker("setDate", "now");
        //$("#txtFechaEmision").datepicker("setEndDate", "now");
        $("#txtFechaEmision").datepicker("setDate", "now");
        
    };

    function filltxtrazsocial(v_ID, v_value) {
        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            //url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
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

                            cargarTipoDocumento(); 
                            $('#cboTipoDcto').prop('disabled', false);

                            return item;
                        },

                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($("#txtrazsocial").val().length <= 0) {
                            $("#hfPIDM").val("");
                            $("#txtNroDcto").val("");
                            $("#txtDireccionOrigen").val('');
                            $('#cboTipoDcto').val('').change();
                            $('#cboTipoDcto').prop('disabled', true);
                            fillCboTipoDocumento();
                            $('#cboTipoDocumento').removeAttr("disabled");
                        }
                    });

                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
            },
            error: function (msg) {
                alertCustom("Clientes no se listaron correctamente.");
            }
        });
    };

    //TIPOS DE DOCUMENTO DE REGISTRO (VENTA)
    var fillCboTipoDocumento = function () {
        var opcion = 'VENT';
        var select = $('#cboTipoDocumento').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option value="">TODOS</option>');
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
                alert(msg);
            }
        });
        $(select).select2();
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
                    if (datos[i].CodMotivoSunatNC == '01' || datos[i].CodMotivoSunatNC == '02' || datos[i].CodMotivoSunatNC == '06' || datos[i].CodMotivoSunatNC == '07') { //     || datos[i].CodMotivoSunatNC == '05' || datos[i].CodMotivoSunatNC == '09'
                        $("#cboMotivo").append('<option value="' + datos[i].CodMotivoNC + '" codsunat="' + datos[i].CodMotivoSunatNC + '">' + datos[i].Descripcion + '</option>');
                    }                    
                }
                $("#cboMotivo").val("").change();
            },
            error: function (msg) {
                alertCustom("Error al obtener motivos sunat de nota de crédito.");
            }
        });
    };

    var limpiarCorrelativo = function () {
        $("#cboSerieNC").val("").change();
        $("#txtNroNC").val("");
        $("#hfCodigoCorrelativo").val("");
    };

    var eventoControles = function () {
        var establecimientoAnterior;
        var empresaAnterior;
        $('#cboEmpresa').on('change', function () {
            if ($("#cboEmpresa").val() != empresaAnterior && $("#cboEmpresa").val() != "") {
                fillCboEstablecimiento($("#cboEmpresa").val());

                $("#inputRazsocial").html("");
                $("#inputRazsocial").html('<input id="txtrazsocial" class="span12" type="text" data-provide="typeahead"  placeholder="Cliente"/>');
                filltxtrazsocial('#txtrazsocial', '');
                $("#cboEstablecimiento").change();
            }
            empresaAnterior = $('#cboEmpresa').val();
        });

        $("#cboEstablecimiento").on("change", function () {
            limpiarCorrelativo();

            if ($("#cboEstablecimiento").val() != establecimientoAnterior && $("#cboEstablecimiento").val() != "") {
                fnCargarSeries();
                cargarTipoDocumento(); //DPORTA  14/01/2022
            }

            establecimientoAnterior = $("#cboEstablecimiento").val();
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
            if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtrazsocial", "txtFechaEmision", "cboMotivo"])) {
                mostrarModalBuscarDocumento();
            }
        });

        $("#btnEFac").click(function () {
            GenerarDocFacturacion();
        });

        $("#chkAlmacen").on("change", function () {
            if ($(this).is(":checked")) {
                $("#lblMsgDespacho .si").html("");
            } else {
                $("#lblMsgDespacho .si").html("&nbsp;NO");
            }

            var oTable = $("#tblDetallesCompraVenta").DataTable();
            if (!$("#chkAlmacen").is(":checked")) { 
                oTable.columns(7).visible(false);
            } else {
                //oTable.columns(7).visible(true);
            }
                        
            //$("#lblMsgDespacho").pulsate({
            //    color: "#33AECD",
            //    reach: 20,
            //    repeat: 1,
            //    glow: true
            //});
            BloqueaCamposProductosSeriados();
        });

        $("#chkAplicar").on("change", function () {            
            if ($(this).is(":checked")) {                
                $("#lblMsgUsable .no").html("");
            } else {                
                $("#lblMsgUsable .no").html("&nbsp;NO");
            }
            //$("#lblMsgDevolverDinero").pulsate({
            //    color: "#33AECD",
            //    reach: 20,
            //    repeat: 1,
            //    glow: true
            //});
        });

        $(".inputDevolucion").live("keyup", function () {
            CalcularTotales();
        });
        $(".inputDevolucion").live("change", function () {
            CalcularTotales();
        });

        //$("#txtTotalDevolucion").live("keyup", function () {
        //    CambiarMensajes();
        //});

        $("#cboSerieNC").on("change", function () {
            $("#txtNroNC").val("");
            $("#hfCodigoCorrelativo").val("");
            if ($("#cboSerieNC").val() != "") {
                $("#txtNroNC").val($("#cboSerieNC :selected").attr("data-actual"));
                $("#hfCodigoCorrelativo").val($("#cboSerieNC :selected").attr("data-codautoriza"));
            }
        });

        $('#cboTipoDcto').on('change', function () {
            $("#txtNroDcto").val($('#cboTipoDcto option:selected').attr('nroDoc'));
            var code = ObtenerQueryString("codigo"); 

            if (typeof (code) == "undefined") {

                //DPORTA
                if ($('#cboTipoDcto').val() == '6') {
                    $("#cboSerieNC option:not([value=0001])").attr("disabled", "disabled"); //data-codautoriza
                    $("#cboSerieNC option[value=0012]").removeAttr("disabled");
                    $("#cboTipoDocumento option[value=0001]").removeAttr("disabled");//remueve el disable de la opción boleta
                    $("#cboTipoDocumento option[value=0003]").attr("disabled", "disabled");//Deshabilita la opcion de boleta
                    //$("#cboTipoDocumento option[value='']").attr("disabled", "disabled");//Deshabilita la opcion de todos
                    $("#cboTipoDocumento").select2("val", "0001");//Pone por defecto factura en tipo documento
                    $("#cboTipoDocumento").attr("disabled", "disabled");
                    $("#cboSerieNC option[data-codautoriza='" + FNC + "']").removeAttr("disabled");

                    var oItems = $('#cboSerieNC option');
                    for (var i = 0; i < oItems.length; i++) {
                        if ((oItems[i].value).substring(0, 3) == "FNC") {
                            $("#cboSerieNC").select2("val", FNC).change();
                        } else {
                            $("#cboSerieNC").select2("val", BNC).change();
                        }

                    }

                } else if ($('#cboTipoDcto').val() == '1' || $('#cboTipoDcto').val() == '0' ||
                           $('#cboTipoDcto').val() == '7' || $('#cboTipoDcto').val() == '4') {

                    var doc1 = $('#cboTipoDcto').val();

                    if (doc1 == '6') {
                        $("#cboSerieNC option:not([value=0001])").attr("disabled", "disabled"); //data-codautoriza
                        $("#cboSerieNC option[value=0012]").removeAttr("disabled");
                        $("#cboTipoDocumento option[value=0001]").removeAttr("disabled");//remueve el disable de la opción boleta
                        $("#cboTipoDocumento option[value=0003]").attr("disabled", "disabled");//Deshabilita la opcion de boleta
                        //$("#cboTipoDocumento option[value='']").attr("disabled", "disabled");//Deshabilita la opcion de todos
                        $("#cboTipoDocumento").select2("val", "0001");//Pone por defecto factura en tipo documento
                        $("#cboTipoDocumento").attr("disabled", "disabled");
                        $("#cboSerieNC option[data-codautoriza='" + BNC + "']").removeAttr("disabled");

                        var oItems = $('#cboSerieNC option');
                        for (var i = 0; i < oItems.length; i++) {
                            if ((oItems[i].value).substring(0, 3) == "BNC") {
                                $("#cboSerieNC").select2("val", BNC).change();
                            } else {
                                $("#cboSerieNC").select2("val", FNC).change();
                            }

                        }
                    } else {
                        $("#cboSerieNC option:not([value=0001])").attr("disabled", "disabled"); //data-codautoriza
                        $("#cboSerieNC option[value=0012]").removeAttr("disabled");
                        $("#cboTipoDocumento option[value=0003]").removeAttr("disabled");//remueve el disable de la opción boleta
                        $("#cboTipoDocumento option[value=0001]").attr("disabled", "disabled");//Deshabilita la opcion de factura
                        //$("#cboTipoDocumento option[value='']").attr("disabled", "disabled");//Deshabilita la opcion de todos
                        $("#cboTipoDocumento").select2("val", "0003");//Pone por defecto boleta en tipo documento
                        $("#cboTipoDocumento").attr("disabled", "disabled");
                        $("#cboSerieNC option[data-codautoriza='" + BNC + "']").removeAttr("disabled");

                        var oItems = $('#cboSerieNC option');
                        for (var i = 0; i < oItems.length; i++) {
                            if ((oItems[i].value).substring(0, 3) == "BNC") {
                                $("#cboSerieNC").select2("val", BNC).change();
                            } else {
                                $("#cboSerieNC").select2("val", FNC).change();
                            }

                        }
                    }
                } else {
                    $("#cboSerieNC option:not([value=0001])").removeAttr("disabled");
                    $("#cboSerieNC option[value=0001]").attr("disabled", "disabled");
                    
                    var oItems = $('#cboSerieNC option');
                    for (var i = 0; i < oItems.length; i++) {
                        if ((oItems[i].value).substring(0, 3) == "BNC") {
                            $("#cboSerieNC").select2("val", BNC).change();
                        } else {
                            $("#cboSerieNC").select2("val", BNC).change();
                        }

                    }
                }
            }
        });


        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("NOTA DE CRÉDITO");
            $('#txtcontenido').val("");
            cargarCorreos();
            $('#divMail').modal('show');
        });


        // Eventos para c/u de los motivos SUNAT

        $("#cboMotivo").on("change", function () {
            var motivo = $('#cboMotivo :selected').attr('codsunat');
            if (motivo !== undefined) {
                switch (motivo) {
                    case '01': // Anulación de la Operación
                        $("#chkAplicar").attr("checked", true).parent().addClass("checked");
                        $('#chkAplicar').attr('disabled', true);
                        $('#chkAplicar').change();
                        $("#chkAlmacen").attr("checked", true).parent().addClass("checked");
                        $('#chkAlmacen').attr('disabled', true);                        
                        $('#chkAlmacen').change();
                        BloqueaCamposProductosSeriados();

                        break;

                    case '02': // Anulación por error en el RUC
                        $("#chkAplicar").attr("checked", true).parent().addClass("checked");
                        $('#chkAplicar').attr('disabled', true);
                        $('#chkAplicar').change();
                        $("#chkAlmacen").attr("checked", true).parent().addClass("checked");
                        $('#chkAlmacen').attr('disabled', true);      
                        $('#chkAlmacen').change();
                        BloqueaCamposProductosSeriados();

                        break;


                    case '06': // Devolución total
                        $("#chkAplicar").attr("checked", false).parent().removeClass("checked");
                        $('#chkAplicar').attr('disabled', false);
                        $('#chkAplicar').change();
                        $("#chkAlmacen").attr("checked", true).parent().addClass("checked");
                        $('#chkAlmacen').attr('disabled', true);
                        $('#chkAlmacen').change();
                        BloqueaCamposProductosSeriados();

                        break;

                    case '07': // Devolución por item
                        //$("#chkAplicar").attr("checked", false).parent().removeClass("checked");
                        //$('#chkAplicar').attr('disabled', true);
                        //$('#chkAplicar').change();
                        //DPORTA
                        $("#chkAplicar").attr("checked", false).parent().removeClass("checked");
                        $('#chkAplicar').attr('disabled', false);
                        $('#chkAplicar').change();
                        $("#chkAlmacen").attr("checked", false).parent().removeClass("checked");
                        $('#chkAlmacen').attr('disabled', false);
                        $('#chkAlmacen').change();
                        BloqueaCamposProductosSeriados();
                    case '05':
                        $("#chkAplicar").attr("checked", false).parent().addClass("checked");
                        $('#chkAplicar').attr('disabled', false);
                        $('#chkAplicar').change();
                        $("#chkAlmacen").attr("checked", false).parent().removeClass("checked");
                        $('#chkAlmacen').attr('disabled', true);
                        $('#chkAlmacen').change();
                        break;

                    default:
                        break;
                }
            }
            
        });

    };

    var GenerarDocFacturacion = function () {
        Bloquear('ventana');
        let sCodEmpresa = $("#ctl00_hddctlg").val();
        let sCodNC = $("#hfCodigoNotaCredito").val();
        let sRuta = "vistas/EF/ajax/EFACTEL.ashx?sOpcion=NC&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + sCodNC

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
    
    var fnCargarSeries = function () {
        let sCodEmpresa = $('#cboEmpresa').val();
        let sCodEstablec = $('#cboEstablecimiento').val();
        let sCodTipoDoc = "0007";
        let sEstadoInd = "";
        
        let select = $("#cboSerieNC");
        $('#cboSerieNC').html("");
        $("#cboSerieNC").val("").change();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CORR&CTLG=" + sCodEmpresa + "&SCSL=" + sCodEstablec + "&TIPO_DCTO=" + sCodTipoDoc + "&p_ESTADO_IND=" + sEstadoInd,
            contenttype: "application/json;",
            async: false,
            datatype: "json",
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                let sHtmlOption = "<option></option>";
                for (var i = 0; i < datos.length; i++) {
                    if (datos[i].ESTADO_IND === "ACTIVO")
                    {
                        sHtmlOption += `<option value=${datos[i].SERIE} data-codautoriza=${datos[i].CODIGO} data-formato=${datos[i].FORMATO} 
                                                data-actual=${datos[i].VALOR_ACTUAL} data-fin=${datos[i].VALOR_FIN} 
                                                data-ind=${datos[i].CORRELATIVO}>${datos[i].SERIE}</option>`; 
                        if ((datos[i].SERIE).substring(0,3) == "FNC") {
                            FNC = datos[i].CODIGO;
                        } else if ((datos[i].SERIE).substring(0, 3) == "BNC"){
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
                alertCustom("La Serie y Número correlativos no se obtuvieron correctamente.");
            }
        });
    };

    var cargaInicial = function () {
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresa").change();

        var code = ObtenerQueryString("codigo"); 
        var codempr = ObtenerQueryString("codempr");

        if (typeof (code) !== "undefined") {

            $("#hfCodigoNotaCredito").val(code);

            $("#grabar").html("<i class='icon-plus'></i> Nuevo");
            $("#grabar").attr("href", "?f=CAMNOCL");
            $('#btnMail').removeClass('hidden');
            $("#btnBuscarDocumento").attr("style", "display:none;");
            $("#cancelar").attr("style", "display:none;");
            //DESHABILITAR TODO
            $("#cboEmpresa").select2("val", codempr);
            $("#cboEmpresa").change();

            $("#cboEmpresa").attr("disabled", "disabled");
            $("#cboEstablecimiento").attr("disabled", "disabled");
            $("#cboSerieNC").attr("disabled", "disabled");
            $("#txtNroNC").attr("disabled", "disabled");
            $("#txtrazsocial").attr("disabled", "disabled");

            $("#txtNro").attr("disabled", "disabled");
            $("#txtNroSerie").attr("disabled", "disabled");
            $("#cboTipoDocumento").attr("disabled", "disabled");
            $("#rbParcial").attr("disabled", "disabled");
            $("#rbTotal").attr("disabled", "disabled");
            $("#tblDetallesCompraVenta").attr("disabled", "disabled");
            $("#chkAlmacen").attr("disabled", "disabled");
            $("#chkAplicar").attr('disabled', true);
            $("#cboSerieNC").attr("disabled", "disabled");
            $("#txtNroNC").attr("disabled", "disabled");
            $("#txtFechaEmision").attr("disabled", "disabled");
            $("#imprimir").attr("style", "display:inline-block;");
            $("#btnImprimirDcto").removeAttr("style");

            $.ajax({
                type: "post",
                url: "vistas/CA/ajax/calnocr.ashx?opcion=2&p_NOCC_CODE=" + code + "&p_CTLG_CODE=" + codempr,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {

                    $("#txtTotalDevolucion").attr("disabled", "disabled");

                    $("#txtMontoGravado").attr("disabled", "disabled");
                    $("#txtMontoInafecta").attr("disabled", "disabled");
                    $("#txtMontoExonerado").attr("disabled", "disabled");


                    $("#txtMontoIgv").attr("disabled", "disabled");
                    $("#hfMoneda").val(datos[0].MONEDA);
                    $("#hfSimboloMoneda").val(datos[0].MONEDA_SIMBOLO);
                    if ($("#cboEmpresa").val() == "") {
                        $("#cboEmpresa").select2("val", datos[0].EMPRESA_CODE).change();
                    }
                    $("#cboEstablecimiento").select2("val", datos[0].SUCURSAL_CODE)
                    //$("#cboSerieNC").val(datos[0].SERIE_NUMERO.split("-")[0]).change();
                    //$("#txtNroNC").val(datos[0].SERIE_NUMERO.split("-")[1]);
                    $("#hfPIDM").val(datos[0].PIDM);
                    $("#txtrazsocial").val(datos[0].RAZON_SOCIAL);
                    cargarTipoDocumento(); 

                    $("#cboSerieNC").val(datos[0].SERIE_NUMERO.split("-")[0]).change();//
                    $("#txtNroNC").val(datos[0].SERIE_NUMERO.split("-")[1]);//
                    $("#txtDireccionOrigen").val(datos[0].CLIE_DIRECCION)

                    $('#cboMotivo').select2('val', datos[0].MOTIVO_CODE);
                    $('#cboMotivo').attr('disabled', true);

                    $("#txtNro").val(datos[0].SERIE);
                    $("#txtNroSerie").val(datos[0].SERIE);

                    $("#txtFechaEmision").val(datos[0].EMISION);
                    $("#txtFechaTransaccion").val(datos[0].FECHA_TRANSACCION);

                    $("#cboTipoDocumento").select2("val", datos[0].ORIGEN_TIPO_DOC);
                    $("#tblDetallesCompraVenta").val(datos[0].SERIE);
                    
                    $("#hfCodDocSeleccionado").val(datos[0].ORIGEN);
                    $("#hfSecuenciaDocSeleccionado").val(datos[0].SECUENCIA);

                    $("#txtFechaDocModif").val(datos[0].EMISION_ORIGEN);

                    $("#txtGlosa").val(datos[0].GLOSA);
                    $("#txtGlosa").attr('disabled', true);

                    obtenerDocumento(datos[0].ORIGEN);
                    if (datos[0].DEVOLUCION_DINERO_IND == 'S') {
                        $("#chkAplicar").attr("checked", true).parent().addClass("checked");                        
                        $("#lblMsgUsable .no").html("");
                    } else {
                        $("#chkAplicar").attr("checked", false).parent().removeClass("checked");  
                        $("#lblMsgUsable .no").html("&nbsp;NO");
                    }

                    if (datos[0].ENTREGA_DESPACHO_ALMACEN == 'S') {
                        //$("#chkAlmacen").attr("checked", true).parent().addClass("checked");
                        $("#chkAlmacen").attr("checked", false).parent().removeClass("checked");                           
                        $("#lblMsgDespacho .si").html("&nbsp;NO");
                    }
                    else {
                        //$("#chkAlmacen").attr("checked", false).parent().removeClass("checked");
                        $("#chkAlmacen").attr("checked", true).parent().addClass("checked");         
                        $("#lblMsgDespacho .si").html("");
                    }
                    fillTblDetallesNotaCredito(code, codempr, datos[0].SECUENCIA)
                    $("#divTotales").slideDown();
                    $("#txtMontoIgv").val(datos[0].MONTO_IGV);
                    $("#txtTotalDevolucion").val(datos[0].MONTO_TOTAL);

                    $("#lblMontogravado").html('OP GRAVADO (' + datos[0].MONEDA_SIMBOLO + ')');
                    $("#lblMontoInafecta").html('OP INAFECTA (' + datos[0].MONEDA_SIMBOLO + ')');
                    $("#lblMontoExonerado").html('OP EXONERADO (' + datos[0].MONEDA_SIMBOLO + ')');
                    

                    $("#txtMontoGravado").val(datos[0].MONTO_GRAVADO);
                    $("#txtMontoInafecta").val(datos[0].MONTO_INAFECTO);
                    $("#txtMontoExonerado").val(datos[0].MONTO_EXONERADO);

                    if ($("#total_parcial").val() == 'False') {
                        $("#rbParcial").attr("checked", true).parent().addClass("checked");
                        $("#rbTotal").attr("checked", false).parent().removeClass("checked");
                    }
                    else {
                        $("#rbTotal").attr("checked", true).parent().addClass("checked");
                        $("#rbParcial").attr("checked", false).parent().removeClass("checked");
                    }

                    var validarDoc = $('#cboSerieNC').val();
                    if (validarDoc.substring(0, 1) == 'F') {
                        //$('#btnEFac').removeClass('hidden');
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    var cargarTipoDocumento = function () {
        if ($('#hfPIDM').val() != '') {
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
        }        
    };

    return {
        init: function () {
            cargarParametrosSistema();
            plugins();
            eventoControles();
            fillCboEmpresa();
            //fillCboEstablecimiento($("#ctl00_hddctlg").val());
            //filltxtrazsocial('#txtrazsocial', '');
            fillCboTipoDocumento();
            fillCboMotivoSunat();
            //fnCargarSeries();
            cargaInicial();

            var igv = parseFloat($("#hfIMPUESTO").val()) * 100;
            $(".lblPctjIgv").html("IGV (" + igv.toFixed(1) + " %)");            
        }
    };

}();

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
        },
        "columnDefs": [
            {
                "targets": [7],
                "visible": false,
                "searchable": false
            }
        ] 
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

var isc_documento_seleccionado = 0;
var gravada_documento_seleccionado = 0;
var inafecta_documento_seleccionado = 0;
var exonerada_documento_seleccionado = 0;
var igv_documento_seleccionado = 0;
var importe_documento_seleccionado = 0;
var moneda_documento_seleccionado = '0002';
var valor_cambio_documento_selecionado = 0;

function setSeleccionDocumento(codigo, secuencia, serie, nro, tipo, importe, moneda, simboloMoneda, scslExonerada, fechaEmision, pagado, pagado_desc, caja, despachado, despachado_desc, ISC_DOCUMENTO, GRAVADA_DOCUMENTO, INAFECTA_DOCUMENTO, EXONERADA_DOCUMENTO, IGV_DOCUMENTO, IMPORTE_DOCUMENTO, VALOR_CAMBIO) {
    $('#cboMotivo').attr('disabled', true);
    var motivo = $('#cboMotivo :selected').attr('codsunat');
    var mostrarDatosVenta = true;
    moneda_documento_seleccionado = moneda;
    valor_cambio_documento_selecionado = VALOR_CAMBIO;

    if (moneda_documento_seleccionado == '0002') {
        
        isc_documento_seleccionado = parseFloat(ISC_DOCUMENTO);
        gravada_documento_seleccionado = parseFloat(GRAVADA_DOCUMENTO);
        inafecta_documento_seleccionado = parseFloat(INAFECTA_DOCUMENTO);
        exonerada_documento_seleccionado = parseFloat(EXONERADA_DOCUMENTO);
        igv_documento_seleccionado = parseFloat(IGV_DOCUMENTO);
        importe_documento_seleccionado = parseFloat(IMPORTE_DOCUMENTO);

    } else { //0003

        isc_documento_seleccionado = parseFloat(ISC_DOCUMENTO / valor_cambio_documento_selecionado);
        gravada_documento_seleccionado = parseFloat(GRAVADA_DOCUMENTO / valor_cambio_documento_selecionado);
        inafecta_documento_seleccionado = parseFloat(INAFECTA_DOCUMENTO / valor_cambio_documento_selecionado);
        exonerada_documento_seleccionado = parseFloat(EXONERADA_DOCUMENTO / valor_cambio_documento_selecionado);
        igv_documento_seleccionado = parseFloat(IGV_DOCUMENTO / valor_cambio_documento_selecionado);
        importe_documento_seleccionado = parseFloat(IMPORTE_DOCUMENTO / valor_cambio_documento_selecionado);
    }
    
    
    
    
    // motivo 01 y 02 no necesita cambiar los checks, ya esta en el onchange

    if (motivo == '01' || motivo == '02') {
        if (despachado == 'N') {
            $("#lblMsgDespacho .si").html("&nbsp;NO");
        } else {
            $("#lblMsgDespacho .si").html("");  
        }
        Bloquear("ventanaBuscarDocumento")
        // mostrar lo seleccionado.
        $("#hfCodDocSeleccionado").val(codigo);
        $("#hfSerieDocSeleccionado").val(serie);
        $("#hfNroDocSeleccionado").val(nro);
        $("#hfSecuenciaDocSeleccionado").val("1");

        $("#hfDespachadoInd").val(despachado);
        $("#hfCobradoInd").val(pagado);

        $("#hfMoneda").val(moneda);
        $("#hfSimboloMoneda").val(simboloMoneda);
        $("#hfScslExoneradaInd").val(scslExonerada);

        $("#hfTipoDocSeleccionado").val(tipo);
        setSerieNotaCredito(tipo);
        $("#hfImporteOrigen").val(importe);
        $(".lblMoneda").html("TOTAL (" + simboloMoneda + ")");

        $(".lblExonerado").html("OP EXONERADO (" + simboloMoneda + ")");
        $(".lblInafecta").html("OP INAFECTA (" + simboloMoneda + ")");
        $(".lblGravado").html("OP GRAVADO (" + simboloMoneda + ")");

        $("#lblDctoSeleccionado").html($("#cboTipoDocumento option[value='" + tipo + "']").html());
        $("#lblPagoInd").text(pagado_desc);
        $("#lblDespachadoInd").text(despachado_desc);

        $("#divDctoSeleccionado").slideDown();

        if (codigo != "" & serie != "") {
            $("#txtNro").val($("#hfNroDocSeleccionado").val());
            $("#txtSerie").val($("#hfSerieDocSeleccionado").val());
            //dibuja la tabla
            fillTblDetallesCompraVenta();
            //checks de acuerdo al dcto
            BloquearxSeleccion(pagado, despachado);

            if (fechaEmision != "") {
                $("#txtFechaEmision").datepicker("setStartDate", fechaEmision);
            }

            $('#txtFechaDocModif').datepicker('setDate', fechaEmision);
            //ObtenerDeudaDocumento();
        }
        else {
            $("#txtNro").val("");
            $("#txtSerie").val("");
        }
        Desbloquear("ventanaBuscarDocumento")
        $(".doc_fila").css("background-color", "#f9f9f9 !important");
        $("#doc_fila_" + codigo + "_" + secuencia + "").css("background-color", "#cbcbcb !important");
        $('#lblMsgDevolverDinero .caja').html(caja);

        $("#_buscarDocumento").modal('hide');

        BloqueaCamposProductosSeriados();

    } else if(motivo == '06') {
        
            if (despachado == 'N') {
                $("#lblMsgDespacho .si").html("&nbsp;NO");
            } else {
                $("#lblMsgDespacho .si").html("");
            }
            Bloquear("ventanaBuscarDocumento")
            // mostrar lo seleccionado.
            $("#hfCodDocSeleccionado").val(codigo);
            $("#hfSerieDocSeleccionado").val(serie);
            $("#hfNroDocSeleccionado").val(nro);
            $("#hfSecuenciaDocSeleccionado").val("1");

            $("#hfDespachadoInd").val(despachado);
            $("#hfCobradoInd").val(pagado);

            $("#hfMoneda").val(moneda);
            $("#hfSimboloMoneda").val(simboloMoneda);
            $("#hfScslExoneradaInd").val(scslExonerada);

            $("#hfTipoDocSeleccionado").val(tipo);
            setSerieNotaCredito(tipo);
            $("#hfImporteOrigen").val(importe);
            $(".lblMoneda").html("TOTAL (" + simboloMoneda + ")");

            $(".lblExonerado").html("OP EXONERADO (" + simboloMoneda + ")");
            $(".lblInafecta").html("OP INAFECTA (" + simboloMoneda + ")");
            $(".lblGravado").html("OP GRAVADO (" + simboloMoneda + ")");

            $("#lblDctoSeleccionado").html($("#cboTipoDocumento option[value='" + tipo + "']").html());
            $("#lblPagoInd").text(pagado_desc);
            $("#lblDespachadoInd").text(despachado_desc);

            $("#divDctoSeleccionado").slideDown();

            if (codigo != "" & serie != "") {
                $("#txtNro").val($("#hfNroDocSeleccionado").val());
                $("#txtSerie").val($("#hfSerieDocSeleccionado").val());
                //dibuja la tabla
                fillTblDetallesCompraVenta();
                //checks de acuerdo al dcto
                BloquearxSeleccion(pagado, despachado);

                if (fechaEmision != "") {
                    $("#txtFechaEmision").datepicker("setStartDate", fechaEmision);
                }

                $('#txtFechaDocModif').datepicker('setDate', fechaEmision);
                //ObtenerDeudaDocumento();
            }
            else {
                $("#txtNro").val("");
                $("#txtSerie").val("");
            }
            Desbloquear("ventanaBuscarDocumento")
            $(".doc_fila").css("background-color", "#f9f9f9 !important");
            $("#doc_fila_" + codigo + "_" + secuencia + "").css("background-color", "#cbcbcb !important");
            $('#lblMsgDevolverDinero .caja').html(caja);

            $("#_buscarDocumento").modal('hide');

            BloqueaCamposProductosSeriados();

    } else if (motivo = '07') {
            if (despachado == 'S') {
                $("#chkAlmacen").attr("checked", true).parent().addClass("checked");
                $('#chkAlmacen').attr('disabled', true);
                $('#chkAlmacen').change();
            } else if (despachado == 'N') {
                $("#chkAlmacen").attr("checked", false).parent().removeClass("checked");
                $('#chkAlmacen').attr('disabled', true);
                $('#chkAlmacen').change();    
            } else {
                $('#chkAlmacen').attr('disabled', false);
            }
            if (mostrarDatosVenta) {
                Bloquear("ventanaBuscarDocumento")
                $("#hfCodDocSeleccionado").val(codigo);
                $("#hfSerieDocSeleccionado").val(serie);
                $("#hfNroDocSeleccionado").val(nro);
                $("#hfSecuenciaDocSeleccionado").val("1");

                $("#hfDespachadoInd").val(despachado);
                $("#hfCobradoInd").val(pagado);

                $("#hfMoneda").val(moneda);
                $("#hfSimboloMoneda").val(simboloMoneda);
                $("#hfScslExoneradaInd").val(scslExonerada);

                //editar
                $("#hfTipoDocSeleccionado").val(tipo);
                setSerieNotaCredito(tipo);
                $("#hfImporteOrigen").val(importe);
                $(".lblMoneda").html("TOTAL (" + simboloMoneda + ")");

                $(".lblExonerado").html("OP EXONERADO (" + simboloMoneda + ")");
                $(".lblInafecta").html("OP INAFECTA (" + simboloMoneda + ")");
                $(".lblGravado").html("OP GRAVADO (" + simboloMoneda + ")");

                $("#lblDctoSeleccionado").html($("#cboTipoDocumento option[value='" + tipo + "']").html());
                $("#lblPagoInd").text(pagado_desc);
                $("#lblDespachadoInd").text(despachado_desc);

                $("#divDctoSeleccionado").slideDown();

                if (codigo != "" & serie != "") {
                    $("#txtNro").val($("#hfNroDocSeleccionado").val());
                    $("#txtSerie").val($("#hfSerieDocSeleccionado").val());
                    fillTblDetallesCompraVenta();
                    BloquearxSeleccion(pagado, despachado);

                    if (fechaEmision != "") {
                        $("#txtFechaEmision").datepicker("setStartDate", fechaEmision);
                    }

                    $('#txtFechaDocModif').datepicker('setDate', fechaEmision);
                    //ObtenerDeudaDocumento();
                }
                else {
                    $("#txtNro").val("");
                    $("#txtSerie").val("");
                }
                Desbloquear("ventanaBuscarDocumento")
                $(".doc_fila").css("background-color", "#f9f9f9 !important");
                $("#doc_fila_" + codigo + "_" + secuencia + "").css("background-color", "#cbcbcb !important");
                $('#lblMsgDevolverDinero .caja').html(caja);

                $("#_buscarDocumento").modal('hide');

                BloqueaCamposProductosSeriados();
            } else {
                $("#_buscarDocumento").modal('hide');
                infoCustom("El motivo de la Nota de Crédito sólo admite documentos de referencia DESPACHADOS.");
                return;
            }
    }

    $("#divInfo").pulsate({
        color: "#33AECD",
        reach: 20,
        repeat: 5,
        glow: true
    });
}

function setSerieNotaCredito(tipo) {

    var tipoSerie = $("#txtSerie").val().substr(0, 2);
    var electronico = ((tipoSerie == "FE" || tipoSerie == "BE") ? true : false);
    /*if (electronico) {
        
    }*/

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
            url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=correo" +
            "&p_NOCC_CODE=" + $("#hfCodigoNotaCredito").val() +
            "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
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



var ajaxDeuda = null;
var deudaOrigen = "";
//function ObtenerDeudaDocumento() {
//    $("#lblDeuda").html("...")
//    if (ajaxDeuda) {
//        ajaxDeuda.abort();
//    }
//    ajaxDeuda = $.ajax({
//        type: "post",
//        url: "vistas/ca/ajax/camnocl.ashx?OPCION=DEUDA" +
//            "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
//            "&p_PERS_PIDM=" + $("#hfPIDM").val() +
//            "&p_ORIGEN_CODE=" + $("#hfCodDocSeleccionado").val(),
//        contenttype: "application/text;",
//        datatype: "text",
//        async: true,
//        success: function (datos) {
//            deudaOrigen = datos;
//            //CambiarMensajes();
//        },
//        error: function (msg) {
//            deudaOrigen = "NO_ENCONTRADO";
//            $("#lblDeuda").html("...")
//            if (msg.statusText != "abort") {
//                alertCustom("Deuda del Documento Referenciado no se obtuvo correctamente.");
//            }
//        }
//    });
//}

//function CambiarMensajes() {
//    if (deudaOrigen != "NO_ENCONTRADO") {
//        var deuda = parseFloat(deudaOrigen);
//        $("#lblDeuda").html($(".lblMoneda").html() + " " + deuda.toFixed(2));
        
//        if (parseFloat(deuda.toFixed(2)) >= parseFloat($("#txtTotalDevolucion").val())) {
//            $("#lblMsgUsable .no").html("");
//        } else {
//            $("#lblMsgUsable .no").html("NO");
//        }
//    } else {
//        $("#lblDeuda").html("(No se pudo consultar)");
//    }
//}

// MANTENIMIENTO / TRANSACCIONES
var montoTotalISCGlobal = 0;
var montoTotalGravadaGlobal = 0;
var montoTotalInafectoGlobal = 0;
var montoTotalExoneradoGlobal = 0;
var montoIgvGlobal = 0;
var montoTotalGlobal = 0;

function Crear() {
    GrabarNotaCredito();
};

var detalles = "";
var montoTotal = 0;
var montoIgv = 0;
var montoTotalSinIgv = 0;
var precio = 0;

function GrabarNotaCredito() {

    var res = false
    if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtrazsocial", "cboSerieNC", "txtNroNC", "txtFechaEmision", "txtTotalDevolucion", "txtMontoIgv", "cboMotivo"])) {
        res = true
        if (parseFloat($("#txtTotalDevolucion").val()) < 0) {
            res = false;
            alertCustom("Monto no puede ser menor a 0.");
        }
    }  

    if (res == true) {
        var continuar = true;
        var data = new FormData();
        // continuar = CalcularTotales();


        var tabla = $("#tblDetallesCompraVenta").dataTable()
        var codigo = tabla.fnGetData(0, 0)
        var tamanioTabla = 0
        if (codigo !== "") {
            tamanioTabla = tabla.length;
        }

        if (tamanioTabla == 0) {
            infoCustom("El documento seleccionado no tiene detalle");
            return;
        }

        if ($("#txtGlosa").val().length > 100) {
            infoCustom2("La glosa sólo debe contener 100 caracteres alfanuméricos como máximo.");
            return;
        }

        //var cantDetalles = tamanioTabla;
        var cantDetalles = $("#hfCantDetalles0").val();
        for (var i = 0 ; i < cantDetalles; i++) {
            if ($("#txtDevolucion_" + i + "").val() === "" || typeof $("#txtDevolucion_" + i + "").val() == "undefined") {
                continuar = false;
                $("#txtDevolucion_" + i + "").addClass("required");
                $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
            }
            else {
                if ($('#cboMotivo :selected').attr('codsunat') == '06' || $('#cboMotivo :selected').attr('codsunat') == '07') {
                    if (parseFloat($("#hfDetalle" + i + "_cant_sol").val()) < parseFloat($("#txtDevolucion_" + i + "").val())) {
                        continuar = false;
                        $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
                    }
                    else {
                        $("#txtDevolucion_" + i + "").css("outline", "none");
                    }
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
        }
        // VALIDA QUE AL MENOS UN ITEM TENGA ALGO QUE DEVOLVER
        if ($('#cboMotivo :selected').attr('codsunat') == '07') {
            if (!ValidaCantidadCero()) {
                continuar = false;
            }   
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
            data.append('p_COMPRA_VENTA_IND', "V");
            
            data.append('p_MONTO_TOTAL', montoTotalGlobal);
            data.append('p_MONTO_IGV', montoIgvGlobal);

            data.append('p_ESTADO_IND', "A");
            data.append('p_ESTADO_USO', "");
            data.append('p_USUA_ID', $("#ctl00_txtus").val());
            //data.append('p_ENTREGA_DESPACHO_ALMACEN', $("#chkAlmacen").is(":checked") ? "S" : "N");

            // ESTO ESTA AL REVES PERO NI MODO, TODO FUNCIONA ASI
            data.append('p_ENTREGA_DESPACHO_ALMACEN', $("#chkAlmacen").is(":checked") ? "N" : "S");

            data.append('p_APLICA_DOC_REFERENCIA', $("#chkAplicar").is(":checked") ? "S" : "N");
            data.append('p_SERIE', $("#cboSerieNC").val());
            data.append('p_NUMERO', $("#txtNroNC").val());

            data.append('p_FECHA_EMISION', $("#txtFechaEmision").val());

            data.append('p_CODIGO_CORRELATIVO', $("#hfCodigoCorrelativo").val());
            data.append('p_IGV', parseFloat($("#hfIMPUESTO").val()) * 100);
            data.append('p_COD_MOTIVO_NC', $("#cboMotivo").val());
            data.append('p_DETALLES', detalles);            

            data.append('p_MONTO_GRAVADO', montoTotalGravadaGlobal);
            data.append('p_MONTO_INAFECTA', montoTotalInafectoGlobal);
            data.append('p_MONTO_EXONERADO', montoTotalExoneradoGlobal);
            data.append('p_MONTO_ISC', montoTotalISCGlobal);

            data.append('p_GLOSA', $("#txtGlosa").val());

            data.append('p_DESPACHADO_IND', $("#hfDespachadoInd").val());
            data.append('p_COBRADO_IND', $("#hfCobradoInd").val());

            Bloquear("ventana");

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=9",
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
                           alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/>")
                       }
                       else {
                           $("#btnBuscarDocumento").attr("style", "display:none");
                           $('#btnMail').removeClass('hidden');
                           $("#hfCodigoNotaCredito").val(datos[0].CODIGO);
                           $("#hfSecuenciaNotaCredito").val(datos[0].SECUENCIA);
                           $("#grabar").html("<i class='icon-plus'></i> Nuevo");
                           $("#grabar").attr("href", "?f=CAMNOCL");
                           exito();
                           fillTblDetallesNotaCredito(datos[0].CODIGO, $("#cboEmpresa").val(), datos[0].SECUENCIA)
                           $("#cancelar").attr("style", "display:none;");
                           $("#imprimir").attr("style", "display:inline-block;");
                           //BloquearCampos
                           $("#txtTotalDevolucion").attr("disabled", "disabled");
                           $("#txtMontoIgv").attr("disabled", "disabled");
                           $("#cboSerieNC").attr("disabled", "disabled");
                           $("#txtNroNC").attr("disabled", "disabled");
                           $("#cboTipoDocumento").val($("#hfTipoDocSeleccionado").val()).attr("disabled", "disabled");
                           $("#txtFechaEmision").attr("disabled", "disabled");
                           $("#rbParcial,#rbTotal").attr("disabled", "disabled");
                           $("#chkAlmacen").attr("disabled", "disabled");

                           $('#cboTipoDcto').attr('disabled', true);
                           $("#cboMotivo").attr('disabled', true);
                           $("#chkAplicar").attr('disabled', true);
                           $("#txtGlosa").attr('disabled', true);
                           var miCodigoQR = new QRCode("codigoQR");
                           miCodigoQR.makeCode(datos[0].DATOS_QR);
                           setTimeout(guardarQR, 0.0000000000000001);
                           $("#divTotales").slideDown();
                           $("#btnImprimirDcto").removeAttr("style");
                           //$("#btnEFac").removeClass("hidden");
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
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Los campos de cantidad en los detalles no deben ser vacíos o mayores a la cantidad despachada!")
        }
    }
}

function guardarQR() {
    //CAPTURA LA IMAGEN DEL QR CODIFICADA EN BASE64 
    var NombreQR = $('#codigoQR img').attr('src');

    var qrData = new FormData();
    qrData.append('p_IMGQR', NombreQR);

    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/camnocl.ashx?OPCION=GQR_NCC&p_NOCC_CODE=" + $("#hfCodigoNotaCredito").val(), //CUANDO SE PRESIONA EL BOTON COMPLETAR
        data: qrData,
        async: false,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res != "OK") {
                noexito();
            }
        },
        error: function () {
            alertCustom("No se guardaron correctamente los datos!")
        }
    });
}

function CalcularTotales() {
    var continuar = true;

    var tabla = $("#tblDetallesCompraVenta").dataTable()
    var codigo = tabla.fnGetData(0, 0)
    var tamanioTabla = 0
    var isc_detalle = 0
    if (codigo !== "") {
        tamanioTabla = tabla.fnGetData().length;
    }

    montoTotal = 0;
    //var cantDetalles = tamanioTabla;
    var cantDetalles = $("#hfCantDetalles0").val();
    if (cantDetalles >= 0 && typeof cantDetalles != "undefined") {
        //---------------------OBTENER DETALLES-------------
        detalles = "";
        for (var i = 0 ; i < cantDetalles; i++) {
            var subtotal;
            detalles += $("#hfDetalle" + i + "_prod").val() + ";"; //PROD_CODE 1
            detalles += $("#hfDetalle" + i + "_um").val() + ";";//UM_CODE 2
            detalles += $("#hfDetalle" + i + "_pu").val() + ";";//PRECIO UNITARIO 3
            detalles += $("#hfDetalle" + i + "_imp").val() + ";";//SUBTOTAL ORIGEN 4                      

            if ($('#cboMotivo :selected').attr('codsunat') == '01' || $('#cboMotivo :selected').attr('codsunat') == '02' || $('#cboMotivo :selected').attr('codsunat') == '06') { // Anulación de la operación || Anulación por error en el RUC || DEVOLUCION TOTAL
                
                subtotal = parseFloat($("#hfDetalle" + i + "_cant_sol").val()) * parseFloat($("#hfDetalle" + i + "_pu").val())
                detalles += $("#hfDetalle" + i + "_cant").val() + ";";// CANTIDAD ORIGEN (DESPACHADA) 5
                detalles += $("#hfDetalle" + i + "_cant").val() + ";"; //CANTIDAD DEVOLUCION 6
                isc_detalle += subtotal * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100);
                
                /*
                else if ($("#chkAplicar").is(":checked") && !$("#chkAlmacen").is(":checked")) {
                    subtotal = parseFloat($("#hfDetalle" + i + "_cant_sol").val()) * parseFloat($("#hfDetalle" + i + "_pu").val())
                    detalles += $("#hfDetalle" + i + "_cant_sol").val() + ";";// CANTIDAD ORIGEN (DESPACHADA) 5
                    detalles += "0.00" + ";"; //CANTIDAD DEVOLUCION 6
                    isc_detalle += subtotal * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100);
                } else {
                    subtotal = parseFloat($("#txtDevolucion_" + i + "").val()) * parseFloat($("#hfDetalle" + i + "_pu").val())
                    detalles += $("#hfDetalle" + i + "_cant").val() + ";";// CANTIDAD ORIGEN (DESPACHADA) 5
                    detalles += $("#txtDevolucion_" + i + "").val() + ";";                    
                    isc_detalle += subtotal * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100);
                }
                */
            } else if ($('#cboMotivo :selected').attr('codsunat') == '07') {
                
                    subtotal = parseFloat($("#txtDevolucion_" + i + "").val()) * parseFloat($("#hfDetalle" + i + "_pu").val())
                    detalles += $("#hfDetalle" + i + "_cant").val() + ";";// CANTIDAD ORIGEN (DESPACHADA) 5
                    detalles += $("#txtDevolucion_" + i + "").val() + ";";// CANTIDAD DEVOLUCION 6
                    isc_detalle += subtotal * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100);
                
            }
            
            detalles += subtotal + ";";        // NUEVO SUBTOTAL 7          
            detalles += $("#hfDetalle" + i + "_item").val() + ";"; //ITEM  8         

            detalles += ObtenerSeries(i) + ";"; //NRO SERIE PRODUCTOS SERIADOS 9
            detalles += (($("#cboDevolucion_" + i + "").val() != null) ? $("#cboDevolucion_" + i + "").val().toString() : "") + ";";//CODIGO MCDR PRODUCTOS SERIADOS 10
            detalles += isc_detalle.toFixed(2) + ";";//CODIGO MCDR PRODUCTOS SERIADOS 11
            detalles += $("#hfDetalle" + i + "_cant_sol").val() + ";"; //CANTIDAD SOLICITADA EN UN INICIO 12
            detalles += $("#hfDetalle" + i + "_item").val() + ";"; //ITEM DETALLE 13
            detalles += $("#hfDetalle" + i + "_almc").val() + ";"; //ALMACEN CADA PRODUCTO DETALLE 14
            detalles += $("#hfDetalle" + i + "_tipo_prod").val() + "|"; //TIPO CADA PRODUCTO DETALLE (VENTA-BONIFICACION-MUESTRA)15

        }
        //-------------------FIN OBTENER DETALLES-------------
        //OBTENER MONTO TOTAL E IGV
        montoTotal = 0;
        montoISC = 0;
        montoIgv = 0;
        montoTotalSinIgv = 0;
        montoTotalISC = 0;
        montoTotalGravada = 0;
        montoTotalExonerado = 0;
        montoTotalInafecto = 0;

        precio = 0;
        var cantDetalles = tamanioTabla;
        var igv = parseFloat($("#hfIMPUESTO").val());

        for (var i = 0 ; i < cantDetalles; i++) {

            if ($("#txtDevolucion_" + i + "").val() === "" || typeof $("#txtDevolucion_" + i + "").val() == "undefined") {
                continuar = false;
                $("#txtDevolucion_" + i + "").addClass("required");
                $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
            }
            else {

                $("#txtDevolucion_" + i + "").css("outline", "none");
                precio = parseFloat($("#hfDetalle" + i + "_pu").val());

                if ($('#cboMotivo :selected').attr('codsunat') == '01' || $('#cboMotivo :selected').attr('codsunat') == '02' || $('#cboMotivo :selected').attr('codsunat') == '06') {

                    if (parseFloat($("#hfDetalle" + i + "_cant").val()) != parseFloat($("#txtDevolucion_" + i + "").val())) {
                        continuar = false;
                        $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
                    }
                    else {
                        $("#txtDevolucion_" + i + "").css("outline", "none");
                        /*
                        precio = parseFloat($("#hfDetalle" + i + "_pu").val());
                        if ($("#hfScslExoneradaInd").val() == "N") {
                            if ($("#hfDetalle" + i + "_tipo").val() == "GRA" || $("#hfDetalle" + i + "_tipo").val() == "GIS") {
                                precio = precio / (igv + 1);
                                montoIgv += (parseFloat($("#hfDetalle" + i + "_pu").val()) - precio) * parseFloat($("#hfDetalle" + i + "_cant_sol").val());
                                montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#txtDevolucion_" + i + "").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));

                                //if (parseFloat($("#txtDevolucion_" + i + "").val()) == '0') {
                                //    montoTotalGravada += 0;
                                //    montoTotalISC += 0;
                                //} else {
                                //    montoTotalGravada = montoTotalGravada + (precio * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                                //}
                                montoTotalGravada = montoTotalGravada + (precio * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                            } else {
                                if ($("#hfDetalle" + i + "_tipo").val() == "EXO") {
                                    montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                                } else {
                                    montoTotalInafecto += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                                }
                            }
                        }  //El precio siempre no tendrá igv
                        else {
                            montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));
                            montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                        }
                            montoTotalSinIgv += parseFloat($("#hfDetalle" + i + "_cant_sol").val()) * precio;
                        */
                    }

                    
                    /*
                    else if ($("#chkAplicar").is(":checked") && !$("#chkAlmacen").is(":checked")) {

                        if (parseFloat($("#hfDetalle" + i + "_cant").val()) < parseFloat($("#txtDevolucion_" + i + "").val())) {
                            continuar = false;
                            $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
                        }
                        else {
                            $("#txtDevolucion_" + i + "").css("outline", "none");
                            precio = parseFloat($("#hfDetalle" + i + "_pu").val());
                            if ($("#hfScslExoneradaInd").val() == "N") {
                                if ($("#hfDetalle" + i + "_tipo").val() == "GRA" || $("#hfDetalle" + i + "_tipo").val() == "GIS") {
                                    precio = precio / (igv + 1);
                                    montoIgv += (parseFloat($("#hfDetalle" + i + "_pu").val()) - precio) * parseFloat($("#hfDetalle" + i + "_cant_sol").val());
                                    montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));

                                    if (parseFloat($("#hfDetalle" + i + "_cant_sol").val()) == '0') {
                                        montoTotalGravada = 0;
                                        montoTotalISC = 0;
                                    } else {
                                        montoTotalGravada = montoTotalGravada + (precio * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                                    }
                                } else {
                                    if ($("#hfDetalle" + i + "_tipo").val() == "EXO") {
                                        montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                                    } else {
                                        montoTotalInafecto += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                                    }
                                }
                            }  //El precio siempre no tendrá igv
                            else {
                                montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));
                                montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#hfDetalle" + i + "_cant_sol").val()));
                            }
                            montoTotalSinIgv += parseFloat($("#hfDetalle" + i + "_cant_sol").val()) * precio;
                        }

                    }
                    */
                    /*else if ($('#cboMotivo :selected').attr('codsunat') == '06' || $('#cboMotivo :selected').attr('codsunat') == '07') {
                        if (parseFloat($("#hfDetalle" + i + "_cant").val()) < parseFloat($("#txtDevolucion_" + i + "").val())) {
                            continuar = false;
                            $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
                        }
                        else {
                            $("#txtDevolucion_" + i + "").css("outline", "none");
                            precio = parseFloat($("#hfDetalle" + i + "_pu").val());
                            if ($("#hfScslExoneradaInd").val() == "N") {
                                if ($("#hfDetalle" + i + "_tipo").val() == "GRA" || $("#hfDetalle" + i + "_tipo").val() == "GIS") {
                                    precio = precio / (igv + 1);
                                    montoIgv += (parseFloat($("#hfDetalle" + i + "_pu").val()) - precio) * parseFloat($("#txtDevolucion_" + i + "").val());
                                    montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#txtDevolucion_" + i + "").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));

                                    if (parseFloat($("#txtDevolucion_" + i + "").val()) == '0') {
                                        montoTotalGravada = 0;
                                        montoTotalISC = 0;
                                    } else {
                                        montoTotalGravada = montoTotalGravada + (precio * parseFloat($("#txtDevolucion_" + i + "").val()));
                                    }
                                } else {
                                    if ($("#hfDetalle" + i + "_tipo").val() == "EXO") {
                                        montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#txtDevolucion_" + i + "").val()));
                                    } else {
                                        montoTotalInafecto += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#txtDevolucion_" + i + "").val()));
                                    }
                                }
                            }  //El precio siempre no tendrá igv
                            else {
                                montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#txtDevolucion_" + i + "").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));
                                montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#txtDevolucion_" + i + "").val()));
                            }
                            montoTotalSinIgv += parseFloat($("#txtDevolucion_" + i + "").val()) * precio;
                        }
                    }
                    */

                } else {
                    if (parseFloat($("#hfDetalle" + i + "_cant_sol").val()) < parseFloat($("#txtDevolucion_" + i + "").val())) {
                        continuar = false;
                        $("#txtDevolucion_" + i + "").css("outline", "1px solid #b94a48");
                    }
                    else {
                        $("#txtDevolucion_" + i + "").css("outline", "none");

                        precio = parseFloat($("#hfDetalle" + i + "_pu").val());

                        if ($("#hfScslExoneradaInd").val() == "N") {
                            if ($("#hfDetalle" + i + "_tipo").val() == "GRA" || $("#hfDetalle" + i + "_tipo").val() == "GIS") {
                                precio = precio / (igv + 1);
                                montoIgv += (parseFloat($("#hfDetalle" + i + "_pu").val()) - precio) * parseFloat($("#txtDevolucion_" + i + "").val());
                                montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#txtDevolucion_" + i + "").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));

                                if (parseFloat($("#txtDevolucion_" + i + "").val()) == '0') {
                                    montoTotalGravada = montoTotalGravada+0;
                                    montoTotalISC = montoTotalISC+0;
                                } else {
                                    montoTotalGravada = montoTotalGravada + (precio * parseFloat($("#txtDevolucion_" + i + "").val()));
                                }


                            } else {
                                if ($("#hfDetalle" + i + "_tipo").val() == "EXO") {
                                    montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#txtDevolucion_" + i + "").val()));
                                } else {
                                    montoTotalInafecto += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#txtDevolucion_" + i + "").val()));
                                }
                            }
                        }  //El precio siempre no tendrá igv
                        else {
                            montoTotalISC += ((parseFloat($("#hfDetalle" + i + "_pu").val())) * parseFloat($("#txtDevolucion_" + i + "").val()) * (parseFloat($("#hfDetalle" + i + "_isc").val()) / 100));
                            montoTotalExonerado += (parseFloat($("#hfDetalle" + i + "_pu").val()) * parseFloat($("#txtDevolucion_" + i + "").val()));
                        }

                        montoTotalSinIgv += parseFloat($("#txtDevolucion_" + i + "").val()) * precio;

                    }
                }

                
            }
        }
        if ($("#hfScslExoneradaInd").val() == "N") {
            // montoIgv se sumó por cada detalle
            montoTotal = montoTotalSinIgv + montoIgv;            
        } else {
            montoTotal = montoTotalSinIgv;            
            montoIgv = 0;
        }

        if ($('#cboMotivo :selected').attr('codsunat') == '01' || $('#cboMotivo :selected').attr('codsunat') == '02' || $('#cboMotivo :selected').attr('codsunat') == '06') {
            montoTotalISC = isc_documento_seleccionado;
            montoTotalGravada = gravada_documento_seleccionado;
            montoTotalInafecto = inafecta_documento_seleccionado;
            montoTotalExonerado = exonerada_documento_seleccionado;
            montoIgv = igv_documento_seleccionado;
            montoTotal = importe_documento_seleccionado;
        }
        if (moneda_documento_seleccionado == '0002') {
            $("#txtMontoISC").val(montoTotalISC.toFixed(2));
            $("#txtMontoGravado").val(montoTotalGravada.toFixed(2));
            $("#txtMontoInafecta").val(montoTotalInafecto.toFixed(2));
            $("#txtMontoExonerado").val(montoTotalExonerado.toFixed(2));
            $("#txtMontoIgv").val(montoIgv.toFixed(2));
            $("#txtTotalDevolucion").val(montoTotal.toFixed(2)); 
        } else {

            $("#txtMontoISC").val((montoTotalISC).toFixed(2));
            $("#txtMontoGravado").val((montoTotalGravada).toFixed(2));
            $("#txtMontoInafecta").val((montoTotalInafecto).toFixed(2));
            $("#txtMontoExonerado").val((montoTotalExonerado).toFixed(2));
            $("#txtMontoIgv").val((montoIgv).toFixed(2));
            $("#txtTotalDevolucion").val((montoTotal).toFixed(2)); 

            //if ($('#cboMotivo :selected').attr('codsunat') == '07') {
            //    $("#txtMontoISC").val((montoTotalISC).toFixed(2));
            //    $("#txtMontoGravado").val((montoTotalGravada).toFixed(2));
            //    $("#txtMontoInafecta").val((montoTotalInafecto).toFixed(2));
            //    $("#txtMontoExonerado").val((montoTotalExonerado).toFixed(2));
            //    $("#txtMontoIgv").val((montoIgv).toFixed(2));
            //    $("#txtTotalDevolucion").val((montoTotal).toFixed(2)); 
            //} else {
            //    $("#txtMontoISC").val((montoTotalISC / valor_cambio_documento_selecionado).toFixed(2));
            //    $("#txtMontoGravado").val((montoTotalGravada / valor_cambio_documento_selecionado).toFixed(2));
            //    $("#txtMontoInafecta").val((montoTotalInafecto / valor_cambio_documento_selecionado).toFixed(2));
            //    $("#txtMontoExonerado").val((montoTotalExonerado / valor_cambio_documento_selecionado).toFixed(2));
            //    $("#txtMontoIgv").val((montoIgv / valor_cambio_documento_selecionado).toFixed(2));
            //    $("#txtTotalDevolucion").val((montoTotal / valor_cambio_documento_selecionado).toFixed(2)); 
            //}
            
        }               
        

        montoTotalISCGlobal = montoTotalISC.toFixed(4);
        montoTotalGravadaGlobal = montoTotalGravada.toFixed(4);
        montoTotalInafectoGlobal = montoTotalInafecto.toFixed(4);
        montoTotalExoneradoGlobal = montoTotalExonerado.toFixed(4);
        montoIgvGlobal = montoIgv.toFixed(4);
        montoTotalGlobal = montoTotal.toFixed(4);

        console.log('ENTRA AQUI');
        console.log(detalles);
    }

  
    $("#divTotales").slideDown();
    //CambiarMensajes();
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
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/CAMNOCL.ashx?OPCION=13" +
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

function ValidaCantidadOrigen(c, cantidad, cantidad_despachada) {
    var valor = $(c).val();

    if ($("#chkAlmacen").is(":checked")) {
        if (parseFloat(valor) > (parseFloat(cantidad)-parseFloat(cantidad_despachada))) {
            $(c).val(valor);
        } else {
            $(c).val('0.00');
        }        
    } else {
        if (parseFloat(valor) > (parseFloat(cantidad)-parseFloat(cantidad_despachada))) {
            $(c).val(parseFloat(cantidad) - parseFloat(cantidad_despachada));
        }    
    }
    
}

function ValidaCantidadCero() {
    var continuar = false;
    var inputs;

    if ($("#chkAlmacen").is(":checked")) {
        inputs = $(".inputDevolucion");
    } else {
        inputs = $(".inputCantidad");
    }

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
    var motivo = $('#cboMotivo :selected').attr('codsunat');
    if (motivo == '01' || motivo == '02' || motivo == '06') { //$("#rbTotal").is(":checked")
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
                if (!$("#chkAlmacen").is(":checked")) {  // $("#chkAlmacen").is(":checked")
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

    var oTable = $("#tblDetallesCompraVenta").DataTable();
    if ($("#txtSerie").val() != "") {
        if (!$("#chkAlmacen").is(":checked")) { // $("#chkAlmacen").is(":checked")
            oTable.columns(7).visible(false)
        } else {
            oTable.columns(7).visible(true)
        }
    }
    CalcularTotales();
}

function BloquearxSeleccion(pagado, despachado) {
    $("#cboEmpresa,#cboEstablecimiento").attr("disabled", "disabled");
    $("#txtrazsocial").attr("disabled", "disabled");
    var motivo = $('#cboMotivo :selected').attr('codsunat');
    if (motivo !== undefined) {
        switch (motivo) {
            /*
            case '01': // Anulación de Operación
                if (despachado === 'S') {
                    $('#chkAlmacen').attr('disabled', true);
                    $('#chkAlmacen').attr('checked', true).parent().addClass('checked');
                    $('#chkAlmacen').change();
                } else {                    
                    $('#chkAlmacen').attr('disabled', true);
                    $('#chkAlmacen').attr('checked', true).parent().addClass('checked');
                    $('#chkAlmacen').change();                    
                }
                $("#divTotales :input").attr("disabled", true);
                break;
            */
            /*case '02': // Anulación por error en el RUC //Comenté esta parte porque hacía conflicto al momento de procesar los productos que se han despachado 28/02/2022
                if (despachado === 'S') {
                    $('#chkAlmacen').attr('disabled', true);
                    $('#chkAlmacen').attr('checked', true).parent().addClass('checked');
                    $('#chkAlmacen').change();
                } else {
                    $('#chkAlmacen').attr('disabled', true);
                    $('#chkAlmacen').attr('checked', false).parent().removeClass('checked');
                    $('#chkAlmacen').change();
                }
                $("#divTotales :input").attr("disabled", true);
                break;
                */
            case '06': // Devolución total                
                $("#divTotales :input").attr("disabled", true);
                break;

            default:
                break;
        }
    }
    if (pagado === 'S') {
        
    }
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
        //Bloquear("ventana");
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
}

//*********************************** LISTAR  *************************************

function ListarNotasCredito(ctlg, scsl, desde, hasta) {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/calnocr.ashx?OPCION=1.5&p_CTLG_CODE=" + ctlg +
            "&p_SCSL_CODE=" + scsl +
            "&p_DESDE=" + desde +
            "&p_HASTA=" + hasta +
            "&p_COMPRA_VENTA_IND=V",
        contenttype: "application/text;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {

                $('#divTblNotasCredito').html(datos);

                $("#tblNotasCredito").dataTable({
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

                var oTable = $('#tblNotasCredito').dataTable();
                oTable.fnSort([[0, "desc"]]);

                $("#tblNotasCredito").DataTable();
                actualizarEstilos()

                //oTable.column(0).visible(false);


            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alert(msg);
        }
    });


}

var CALNOCL = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");

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
            ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val(), $("#txtDesde").val(), $("#txtHasta").val());
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
            mes = mes - 1;
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
            fillCboEmpresa();
            fillCboEstablecimiento($("#ctl00_hddctlg").val());
            eventoControles();
            cargaInicial();
            //ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
        }
    };

}();

function cargarNotaCredito(codigo, codempr) {
    //window.location.href = "?f=CAMNOCL&codigo=" + codigo + "&codempr=" + codempr
    window.open("?f=CAMNOCL&codigo=" + codigo + "&codempr=" + codempr, '_blank');
}

function irAnularDcto(codigo) {
    window.location.href = "?f=CAMANCL&codigo=" + codigo
}
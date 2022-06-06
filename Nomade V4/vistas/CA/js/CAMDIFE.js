

var CALDIFE = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboCaja').select2();
        $("#cboEstado").select2();
    }

    function fillCboCaja() {
        var select = $('#cboCaja');
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + $('#cboEmpresa').val() + "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                var ini = "";
                $('#cboCaja').empty();
                $('#cboCaja').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CAJA_CODE + '" monto="' + datos[i].MONTO_CAJA + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                    }
                    if (datos.length > 0) {
                        ini = datos[0].CAJA_CODE;
                        listarTransferencias();
                    }
                }
                $('#cboCaja').select2('val', ini);
            },
            error: function (msg) {
                alertCustom("Cajas no se listaron correctamente.");
            }
        });
    };
    
    
    var eventoControles = function () {
        $('#cboEmpresa').on('change', function () {
            $('#cboCaja').empty(); $('#cboCaja').append('<option></option>'); $('#cboCaja').select2('val', '');
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#cboEstablecimiento').on('change', function () {
            fillCboCaja();
        });

        $('#buscar').on('click', function () {
            if (vErrors(['cboEmpresa', 'cboEstablecimiento', 'cboCaja'])) {
                listarTransferencias();
            }
        });
    }

    var listarTransferencias = function () {
        var data = new FormData();
        data.append("p_CTLG_CODE", $("#cboEmpresa").val());
        data.append("p_SCSL_CODE", $("#cboEstablecimiento").val());
        data.append("p_CAJA_CODE", $("#cboCaja").val());
        data.append("p_APROBADO_IND", $("#cboEstado").val());
        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camdife.ashx?OPCION=6",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        })
        .success(function (datos) {
            if (datos != null && datos != "") {
                $("#divTabla").html(datos);

                var oTable = $("#tblDocumento").DataTable({
                    "order": [[0, "desc"]],
                    "sPaginationType": "full_numbers",
                    "scrollX": true,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });              
                oTable.column(0).visible(false);           
            }
        })
        .error(function () {
            alertCustom("Datos de transferencias no se cargaron correctamente")
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboEstablecimiento($("#cboEmpresa").val());
            fillCboCaja();
            eventoControles();
        }
    };
    
}();

var CAMDIFE = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboCaja,#cboDestinoMoal,#cboDestinoMoba').select2();

    }

    function fillCboCaja() {
        var select = $('#cboCaja');
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + $('#cboEmpresa').val() + "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                var ini = "";
                $('#cboCaja').empty();
                $('#cboCaja').append('<option></option>');
                let cont = 0;
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO_CAJA == 'A') {
                            select.append('<option value="' + datos[i].CAJA_CODE + '" monto="' + datos[i].MONTO_CAJA + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                            cont = cont + 1;
                        }                        
                    }
                    if (cont > 0) {
                        ini = datos[0].CAJA_CODE;
                        $('#cboCaja').select2('val', ini);
                        cargarDatosCaja();
                    }
                }
                $('#cboCaja').select2('val', ini);
            },
            error: function (msg) {
                alertCustom("Cajas no se listaron correctamente.");
            }
        });
    };

    var eventoControles = function () {
        $('#cboEmpresa').on('change', function () {
            $('#cboCaja').empty(); $('#cboCaja').append('<option></option>'); $('#cboCaja').select2('val', '');
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#cboEstablecimiento').on('change', function () {
            fillCboCaja();          
        });

        $('#cboCaja').on('change', function () {
            cargarDatosCaja();
        });

        $('#buscar').on('click', function () {
            if (vErrors(['cboEmpresa', 'cboEstablecimiento', 'cboCaja'])) {
                $("#txtMontoMoba,#txtMontoMoal").val("0");
                $('#chkMoba').attr('checked', false).change();
                $('#chkMoba').parent().removeClass('checked');
                $('#chkMoal').attr('checked', false).change();
                $('#chkMoal').parent().removeClass('checked');
                
                if (typeof $("#hfCajaAbiertaInd").val() != "undefined")
                    $("#hfCajaAbiertaInd").val("")
                listarAperturasCaja();
                cargarDatosCaja();
            }

        });

        $("#btnGenerar").on("click", function () {
            GenerarTransferencia();
        });

        $("#txtMontoMoba,#txtMontoMoal").on("paste", function () {
            return false;
        });

        $("#chkMoba").on("change", function () {
            if ($(this).is(":checked")) {
                $("#txtMontoMoba").removeAttr("disabled").val("0");
                $("#cboDestinoMoba").removeAttr("disabled");
                $("input[type='radio'][name='rbTipoDestinoMoba']").removeAttr("disabled");
            } else {
                $("#txtMontoMoba").attr("disabled", "disabled").val("0");
                $("#cboDestinoMoba").attr("disabled", "disabled").select2("val", "");
                $("input[type='radio'][name='rbTipoDestinoMoba']").attr("disabled", "disabled");
            }
            bloquearRadioDestinos();
        });
        $("#chkMoal").on("change", function () {
            if ($(this).is(":checked")) {
                $("#txtMontoMoal").removeAttr("disabled").val("0");
                $("#cboDestinoMoal").removeAttr("disabled");
                $("input[type='radio'][name='rbTipoDestinoMoal']").removeAttr("disabled");

            } else {
                $("#txtMontoMoal").attr("disabled", "disabled").val("0");
                $("#cboDestinoMoal").attr("disabled", "disabled").select2("val", "");
                $("input[type='radio'][name='rbTipoDestinoMoal']").attr("disabled", "disabled");
            }
            bloquearRadioDestinos();
        });

        $("input[type='radio'][name='rbTipoDestinoMoba']").on("change", function () {
            cargarDestinos('MOBA');
        });
        $("input[type='radio'][name='rbTipoDestinoMoal']").on("change", function () {
            cargarDestinos('MOAL');
        });
    }

    var cargarDestinos = function (tipo) {
        //MOBA-----------------------------------
        if (tipo == undefined || tipo == "MOBA") {
            Bloquear("divDestinoMoba");
            if ($("#rbCajaMoba").is(":checked")) {
                $("#cboDestinoMoba").attr("data-placeholder", "Caja");
                $.ajax({
                    type: "post",
                    url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2" +
                        "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
                        //"&p_SCSL_CODE=0" +
                        "&p_FILTRO=CAJAS",
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        $('#cboDestinoMoba').empty();
                        $('#cboDestinoMoba').append('<option></option>');
                        if (datos != null) {
                            for (var i = 0; i < datos.length; i++) {
                                if (datos[i].CAJA_CODE != $('#cboCaja').val()) {

                                    if ($('#cboCaja :selected').attr("tipo") !== "C") {
                                        if (datos[i].TIPO_CAJA == "C") {
                                            $('#cboDestinoMoba').append('<option value="' + datos[i].CAJA_CODE + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                                        } else {
                                            if (datos[i].SUCURSAL == $('#cboEstablecimiento').val()) {
                                                $('#cboDestinoMoba').append('<option value="' + datos[i].CAJA_CODE + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                                            }
                                        }
                                    } else {
                                        $('#cboDestinoMoba').append('<option value="' + datos[i].CAJA_CODE + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');     
                                    }
                                }
                            }
                        }
                        $('#cboDestinoMoba').select2('val', '');
                        Desbloquear("divDestinoMoba");
                    },
                    error: function (msg) {
                        Desbloquear("divDestinoMoba");
                        alertCustom("Destino Caja no se listó correctamente.");
                    }
                });
            }
            else {
                $("#cboDestinoMoba").attr("data-placeholder", "Cuenta");
                $.ajax({
                    type: "post",
                    url: "vistas/ca/ajax/CAMDIFE.ashx?OPCION=4" +
                        "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
                        "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() +
                        "&p_PIDM_CTLG=" + $('#cboEmpresa :selected').attr("pidm") +
                        "&p_USUA_ID=" + $('#ctl00_txtus').val(),
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        $('#cboDestinoMoba').empty();
                        $('#cboDestinoMoba').append('<option></option>');
                        if (datos != null) {
                            for (var i = 0; i < datos.length; i++) {
                                //if (datos[i].MONE_CODE == $("#hfMobaCode").val() && datos[i].TIPO_CAJA != "T" ) {
                                if (datos[i].MONE_CODE == $("#hfMobaCode").val()) {
                                    $('#cboDestinoMoba').append('<option value="' + datos[i].CODE + '" pidm="' + datos[i].PIDM + '">' + datos[i].DESCRIPCION +
                                        ' ' + $("#hfSimbMonedaBase").val() + '' + datos[i].SALDO + '</option>');
                                }
                            }
                        }
                        $('#cboDestinoMoba').select2('val', '');
                        Desbloquear("divDestinoMoba");
                    },
                    error: function (msg) {
                        Desbloquear("divDestinoMoba");
                        alertCustom("Destino Cuenta no se listó correctamente.");
                    }
                });
            }
        }
        //MOAL-----------------------------------
        if (tipo == undefined || tipo == "MOAL") {
            Bloquear("divDestinoMoal");
            $("#cboDestinoMoal").attr("data-placeholder", "Caja");
            if ($("#rbCajaMoal").is(":checked")) {
                $.ajax({
                    type: "post",
                    url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2" +
                        "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
                       
                        "&p_FILTRO=CAJAS",
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        $('#cboDestinoMoal').empty();
                        $('#cboDestinoMoal').append('<option></option>');
                        if (datos != null) {
                            for (var i = 0; i < datos.length; i++) {
                                if (datos[i].CAJA_CODE != $('#cboCaja').val()) {

                                    if ($('#cboCaja :selected').attr("tipo") !== "C") {
                                        if (datos[i].TIPO_CAJA == "C") {
                                            $('#cboDestinoMoal').append('<option value="' + datos[i].CAJA_CODE + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                                        } else {
                                            if (datos[i].SUCURSAL == $('#cboEstablecimiento').val()) {
                                                $('#cboDestinoMoal').append('<option value="' + datos[i].CAJA_CODE + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                                            }
                                        }
                                    } else {
                                        //DPORTA
                                        $('#cboDestinoMoal').append('<option value="' + datos[i].CAJA_CODE + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                                    }
                                    
                                }
                            }
                        }
                        $('#cboDestinoMoal').select2('val', '');
                        Desbloquear("divDestinoMoal");
                    },
                    error: function (msg) {
                        alertCustom("Destino Caja no se listó correctamente.");
                        Desbloquear("divDestinoMoal");
                    }
                });
            }
            else {
                $("#cboDestinoMoal").attr("data-placeholder", "Cuenta");
                $.ajax({
                    type: "post",
                    url: "vistas/ca/ajax/CAMDIFE.ashx?OPCION=4" +
                        "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
                        "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() +
                        "&p_PIDM_CTLG=" + $('#cboEmpresa :selected').attr("pidm") +
                        "&p_USUA_ID=" + $('#ctl00_txtus').val(),
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        $('#cboDestinoMoal').empty();
                        $('#cboDestinoMoal').append('<option></option>');
                        if (datos != null) {
                            for (var i = 0; i < datos.length; i++) {
                                if (datos[i].MONE_CODE == $("#hfMoalCode").val()) {
                                    $('#cboDestinoMoal').append('<option value="' + datos[i].CODE + '" pidm="' + datos[i].PIDM + '">' + datos[i].DESCRIPCION +
                                        ' ' + $("#hfSimbMonedaAlterna").val() + '' + datos[i].SALDO + '</option>');
                                }
                            }
                        }
                        $('#cboDestinoMoal').select2('val', '');
                        Desbloquear("divDestinoMoal");
                    },
                    error: function (msg) {
                        alertCustom("Destino Cuenta no se listó correctamente.");
                        Desbloquear("divDestinoMoal");

                    }
                });
            }
        }

    }

    var listarAperturasCaja = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());
        data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
        data.append('p_CAJA_CODE', $('#cboCaja').val());

        Bloquear('ventana');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/CAMDIFE.ASHX?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        }).success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $("#divAperturasCaja").html(datos);
            }
        }).error(function () {
            Desbloquear("ventana");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });
    }

    var listarMontosCaja = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());
        data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
        data.append('p_CAJA_CODE', $('#cboCaja').val());
        data.append('p_CODE_MOVI', $('#hfCodUltimoMovimiento').val());

        Bloquear('ventana');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/CAMDIFE.ASHX?OPCION=2",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        }).success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $("#divMontosCaja").html(datos);
            }
        }).error(function () {
            Desbloquear("ventana");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });
    }

    //TRANSACCIONES

    function GenerarTransferencia() {
        var continuar = true;
        if ($("#chkMoba").is(":checked") || $("#chkMoal").is(":checked")) {

            if ($("#chkMoba").is(":checked")) {
                if (vErrorsNotMessage(['txtMontoMoba', 'cboDestinoMoba'])) {
                    if (parseFloat($("#txtMontoMoba").val()) <= 0) {
                        infoCustom("Monto a diferir en " + $("#hfDescMonedaBase").val() + " no puede ser 0.");
                        continuar = false;
                    } else if (parseFloat($("#hfSaldoEfectivoMoba").val().split(",").join("")) - parseFloat($("#txtMontoMoba").val()) - objTrans.TOTAL_MOBA < 0) {
                        infoCustom("Monto a diferir en " + $("#hfDescMonedaBase").val() + " no puede exeder al monto de Caja menos lo que está en Transferencia. Intente Refrescar");
                        continuar = false;
                    }
                } else {
                    alertCustom("Ingrese campos obligatorios para diferir Efectivo en " + $("#hfDescMonedaBase").val() + ".");
                    continuar = false;
                }
            }
            if ($("#chkMoal").is(":checked")) {
                if (vErrorsNotMessage(['txtMontoMoal', 'cboDestinoMoal'])) {
                    if (parseFloat($("#txtMontoMoal").val()) <= 0) {
                        infoCustom("Monto a diferir en " + $("#hfDescMonedaAlterna").val() + " no puede ser 0.");
                        continuar = false;
                    } else if (parseFloat($("#hfSaldoEfectivoMoal").val().split(",").join("")) - parseFloat($("#txtMontoMoal").val()) - objTrans.TOTAL_MOAL < 0) {
                        infoCustom("Monto a diferir en " + $("#hfDescMonedaAlterna").val() + " no puede exeder al monto de Caja menos lo que está en Transferencia. Intente Refrescar");
                        continuar = false;
                    }
                } else {
                    alertCustom("Ingrese campos obligatorios para diferir Efectivo en " + $("#hfDescMonedaAlterna").val() + ".");
                    continuar = false;
                }
            }

            if (continuar) {
                var data = new FormData();
                data.append('p_CTLG_CODE', $('#cboEmpresa').val());
                data.append('p_PIDM_CTLG', $('#cboEmpresa :selected').attr("pidm"));
                data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
                data.append('p_CAJA_CODE', $('#cboCaja').val());
                data.append('p_CODE_MOVI', $('#hfCodUltimoMovimiento').val());
                data.append('p_MONTO_MOBA', $('#txtMontoMoba').val());
                data.append('p_MONTO_MOAL', $('#txtMontoMoal').val());
                data.append('p_TIPO_DESTINO_MOBA', ($("#rbCajaMoba").is(":checked")) ? "CAJA" : "CUENTA");
                data.append('p_TIPO_DESTINO_MOAL', ($("#rbCajaMoal").is(":checked")) ? "CAJA" : "CUENTA");

                data.append('p_MOBA_IND', ($("#chkMoba").is(":checked") ? "S" : "N"));
                data.append('p_MOAL_IND', ($("#chkMoal").is(":checked") ? "S" : "N"));
                data.append('p_DESTINO_MOBA', $('#cboDestinoMoba').val());
                data.append('p_DESTINO_MOAL', $('#cboDestinoMoal').val());
                data.append('p_USUA_ID', $('#ctl00_txtus').val());

                Bloquear('ventana');
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/ca/ajax/CAMDIFE.ASHX?OPCION=3",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    cache: false
                }).success(function (datos) {
                    Desbloquear("ventana");
                    if (datos != null && datos[0].RESPUESTA != undefined) {
                        if (datos[0].RESPUESTA == "OK") {
                            //Refrescar
                            exito();
                            var x = $("#cboCaja").val();
                            $("#cboCaja").select2("val", "");
                            cargarDatosCaja();
                            $("#cboCaja").select2("val", x);
                            cargarDatosCaja();

                            $('#chkMoba').attr('checked', false).change();
                            $('#chkMoba').parent().removeClass('checked');
                            $('#chkMoal').attr('checked', false).change();
                            $('#chkMoal').parent().removeClass('checked');

                            $("input").parent().parent().removeClass("error");
                            $("select").parent().parent().removeClass("error");
                            $(".icon-ok").parent().remove();

                        } else if (datos[0].RESPUESTA == "PENDIENTE") {
                            infoCustom("La caja origen aún tiene transferencias pendientes.");
                        } else if (datos[0].RESPUESTA == "TRANS_MOBA") {
                            infoCustom("Monto a diferir en " + $("#hfDescMonedaBase").val() + " no puede exeder al monto de Caja menos lo que está en Transferencia. Refresque los datos!");
                        } else if (datos[0].RESPUESTA == "TRANS_MOAL") {
                            infoCustom("Monto a diferir en " + $("#hfDescMonedaAlterna").val() + " no puede exeder al monto de Caja menos lo que está en Transferencia. Refresque los datos!");
                        } else {
                            alertCustom(datos[0].RESPUESTA);
                        }
                    }
                }).error(function () {
                    Desbloquear("ventana");
                    alertCustom("Error al diferir efectivo. Por favor intente nuevamente.");
                });
            }
        }
        else {
            infoCustom("Seleccione al menos una casilla para diferir efectivo.")
        }
    }
    
    function bloquearRadioDestinos() {
        if ($("#cboCaja :selected").attr("tipo") == "T") {
            $("#rbCuentaMoba").attr("disabled", "disabled").removeAttr("checked").parent().removeClass("checked");
            $("#rbCuentaMoal").attr("disabled", "disabled").removeAttr("checked").parent().removeClass("checked");
            $("#rbCajaMoba").attr("checked", "checked").parent().addClass("checked");
            $("#rbCajaMoal").attr("checked", "checked").parent().addClass("checked");
        }
        else {
            $("#rbCuentaMoba").removeAttr("disabled");
            $("#rbCuentaMoal").removeAttr("disabled");
        }
    }

    function cargarDatosCaja() {
        bloquearRadioDestinos();
        $("#txtMontoMoba,#txtMontoMoal").val("0");
        if (typeof $("#hfCajaAbiertaInd").val() != "undefined")
            $("#hfCajaAbiertaInd,#hfCodUltimoMovimiento").val("");

        if ($('#cboCaja').val() != "") {
            var tipo = ($("#cboCaja :selected").attr("tipo") == "T") ? "TPV" : ((($("#cboCaja :selected").attr("tipo")== "C") ? "CENTRAL" : "RECAUDADORA"));
              
            $("#lblCajaSeleccionada").html($("#cboCaja :selected").html());
            $("#lblCajaSeleccionadaTipo").html("("+tipo+")");
            listarAperturasCaja();
            if (typeof $("#hfCajaAbiertaInd").val() != "undefined") {
                if ($("#hfCajaAbiertaInd").val() == "S") {
                    listarMontosCaja();
                    //Etiquetas
                    $(".simboloMoba").html($("#hfSimbMonedaBase").val());
                    $(".simboloMoal").html($("#hfSimbMonedaAlterna").val());
                    $(".descMoba").html($("#hfDescMonedaBase").val());
                    $(".descMoal").html($("#hfDescMonedaAlterna").val());
                    //Montos
                    $("#txtTotalCajaMoba").html($("#hfSaldoEfectivoMoba").val())
                    $("#txtTotalCajaMoal").html($("#hfSaldoEfectivoMoal").val())
                    $("#divDiferirEfectivo").slideDown();
                    cargarDestinos();
                    //TO DO: MONTO EN TRASFERENCIA
                    CargarMontosTransferenciaCaja()
                }
                else {
                    infoCustom("La caja seleccionada no se encuentra abierta!")
                    $("#divDiferirEfectivo").slideUp();
                }
            }
            else {
                $("#divDiferirEfectivo").slideUp();
            }
        } else {
            $("#divDiferirEfectivo").slideUp();
        }
    }

    var cargaInicial = function (codigoCtlg, codigoScsl, codigoCaja) {
        $("#cboEmpresa").select2("val", codigoCtlg);
        fillCboEstablecimiento(codigoCtlg);
        $("#cboEstablecimiento").select2("val", codigoScsl);
        fillCboCaja();
        $("#cboCaja").select2("val", codigoCaja)
        listarAperturasCaja();
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            var codigoCaja = ObtenerQueryString("codcaja");
            var codigoCtlg = ObtenerQueryString("codempr");
            var codigoScsl = ObtenerQueryString("codscsl");
            if (typeof (codigoCaja) !== "undefined" && typeof (codigoCtlg) !== "undefined" && typeof (codigoScsl) !== "undefined") {
                cargaInicial(codigoCtlg, codigoScsl, codigoCaja)
            }
            else {
                fillCboEstablecimiento($("#ctl00_hddctlg").val());
                fillCboCaja();
            }
            eventoControles();

        }
    };

}();

var ajaxMontosT = null;
var objTrans = {};
function CargarMontosTransferenciaCaja() {

    var data = new FormData();
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
    data.append('p_CAJA_CODE', $("#cboCaja").val());
    Bloquear($($('#txtTransferenciaMobaCaja').parents("div")[0]));
    Bloquear($($('#txtTransferenciaMoalCaja').parents("div")[0]));
    if (ajaxMontosT) {
        ajaxMontosT.abort();
    }
    ajaxMontosT = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMDIFE.ashx?OPCION=9",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    })
   .success(function (datos) {
       var obj = {};      
       if (datos != null && datos.length > 0) {
           $('#txtTransferenciaMobaCaja').html(formatoMiles(datos[0].TOTAL_MOBA_CAJA));
           $('#txtTransferenciaMobaCuenta').html(formatoMiles(datos[0].TOTAL_MOBA_CUENTA));
           $('#txtTransferenciaMoalCaja').html(formatoMiles(datos[0].TOTAL_MOAL_CAJA));
           $('#txtTransferenciaMoalCuenta').html(formatoMiles(datos[0].TOTAL_MOAL_CUENTA));          
           objTrans = datos[0];
       } else {
           $('#txtTransferenciaMobaCaja').html("0.00");
           $('#txtTransferenciaMobaCuenta').html("0.00");
           $('#txtTransferenciaMoalCaja').html("0.00");
           $('#txtTransferenciaMoalCuenta').html("0.00");
           obj.TOTAL_MOBA = 0;
           obj.TOTAL_MOBA_CAJA = 0;
           obj.TOTAL_MOBA_CUENTA = 0;
           obj.TOTAL_MOAL = 0;
           obj.TOTAL_MOAL_CAJA = 0;
           obj.TOTAL_MOAL_CUENTA = 0;
           objTrans = obj;
       }
   }).error(function (msg) {
       if (msg.statusText != "abort") {
           noexito();
       }
   }).complete(function () {
       Desbloquear($($('#txtTransferenciaMobaCaja').parents("div")[0]));
       Desbloquear($($('#txtTransferenciaMoalCaja').parents("div")[0]));
   });


}


//CARGAS INICIALES - AMBOS
function fillCboEmpresa() {
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
                    $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '" pidm="' + datos[i].PIDM + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                $('#cboEmpresa').change();
            } else {
                $('#cboEmpresa').select2('val', '');
            }
        },
        error: function (msg) {
            alertCustom("Empresas no se listaron correctamente. Intente refrescar la página.");
        }
    });
}

function fillCboEstablecimiento(ctlg) {
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/calvica.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
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
                if ($("#ctl00_hddctlg").val() == $("#cboEmpresa").val()) {
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                } else {
                    $('#cboEstablecimiento').select2('val', datos[0].CODIGO).change();
                }
            } else {
                $('#cboEstablecimiento').select2('val', '').change();
            }
        },
        error: function (msg) {
            alertCustom("Establecimientos no se listaron correctamente.");
        }
    });

}

//VALIDACIONES

function ValidaMontoMoba(valor) {
    m = $("#txtTotalCajaMoba").html().split(",").join("");
    if (m != "" && valor != "") {
        var monto = parseFloat(m);
        if (parseFloat(valor) > monto) {
            $("#txtMontoMoba").val(monto);
        }
    }
}

function ValidaMontoMoal(valor) {
    m = $("#txtTotalCajaMoal").html().split(",").join("");
    if (m != "" && valor != "") {
        var monto = parseFloat(m);
        if (parseFloat(valor) > monto) {
            $("#txtMontoMoal").val(monto);
        }
    }
}

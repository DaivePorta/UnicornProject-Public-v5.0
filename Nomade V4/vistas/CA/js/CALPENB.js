
var CALPENB = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboCuenta').select2();
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
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '" pidm="' + datos[i].PIDM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function (ctlg) {
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
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                } else {
                    $('#cboEstablecimiento').select2('val', '').change();
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillcboCuenta = function () {
        var select = $('#cboCuenta');
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMDIFE.ashx?OPCION=4" +
                "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
                "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() +
                "&p_PIDM_CTLG=" + $('#cboEmpresa :selected').attr("pidm") +
                "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboCuenta').empty();
                $('#cboCuenta').append('<option value="" selected="selected">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboCuenta').append('<option value="' + datos[i].CODE + '" pidm="' + datos[i].PIDM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboCuenta').select2('val', '');
                Desbloquear("divDestinoMoba");
            },
            error: function (msg) {
                Desbloquear("divDestinoMoba");
                alertCustom("Cuentas no se listaron correctamente.");
            }
        });
    };

    var eventoControles = function () {
        $('#cboEmpresa').on('change', function () {
            $('#cboCuenta').empty(); $('#cboCuenta').append('<option></option>'); $('#cboCuenta').select2('val', '');
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#cboEstablecimiento').on('change', function () {
            $('#cboCuenta').empty(); $('#cboCuenta').append('<option></option>'); $('#cboCuenta').select2('val', '');
            fillcboCuenta();
        });

        $("#cboCuenta").on("change", function () {
            cargarPendientesCuenta();
        });

        $('#buscar').on('click', function () {
            cargarPendientesCuenta();           
        });

    }

    var obtenerDatosMonedas = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CALPENB.ashx?OPCION=1" +
                "&p_CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/text;",
            datatype: "text",
            async: true,
            success: function (datos) {
                $("#ventana").append(datos);
                $(".simboloMoba").html($("#hfSimbMonedaBase").val());
                $(".simboloMoal").html($("#hfSimbMonedaAlterna").val());
                $(".descMoba").html($("#hfDescMonedaBase").val());
                $(".descMoal").html($("#hfDescMonedaAlterna").val());
            },
            error: function (msg) {
                alertCustom("Datos de monedas no se cargaron correctamente.")
            }
        });

    }
    var cargaInicial = function (codigoCtlg, codigoScsl, codigoCaja) {
        $("#cboEmpresa").select2("val", codigoCtlg);
        fillCboEstablecimiento(codigoCtlg);
        $("#cboEstablecimiento").select2("val", codigoScsl);
        fillcboCuenta();
        $("#cboCuenta").select2("val", codigoCaja)
        cargarPendientesCuenta();
        window.history.pushState("Object", "MOVIMIENTOS PENDIENTES CUENTA BANCARIA", "/Default.aspx?f=CALPENB");
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            obtenerDatosMonedas();
            var codigoCaja = ObtenerQueryString("caja");
            var codigoCtlg = ObtenerQueryString("ctlg");
            var codigoScsl = ObtenerQueryString("scsl");
            if (typeof (codigoCaja) !== "undefined" && typeof (codigoCtlg) !== "undefined" && typeof (codigoScsl) !== "undefined") {
                cargaInicial(codigoCtlg, codigoScsl, codigoCaja)
            }
            else {
                fillCboEstablecimiento($("#ctl00_hddctlg").val());
                fillcboCuenta();
            }
            eventoControles();
        }
    };

}();


var cargarPendientesCuenta = function () {  
        $("#pendientes").slideDown();
        var data = new FormData();
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());
        data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
        data.append('p_CUEN_CODE', $('#cboCuenta').val());
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/calpenb.ASHX?OPCION=2",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $("#divPendientes").html(datos)
                var oTable = $('#tblPendientes').DataTable({
                    "order": [[0, "desc"]],
                    "scrollX": true,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });
                oTable.column(0).visible(false);
            }
        }).error(function () {
            Desbloquear("ventana");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });
   
}


function limpiar() {
    $("#txt_num_mov").off()
    $("#txt_num_mov").val("")
    $(".icon-ok").remove()
    $($("#txt_num_mov").parents()[1]).removeClass("error")

}


function ValidaInicioMesCtaBanc(emppidm, cuenta_code) {
    var bool = false
    $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CALPENB.ASHX?OPCION=3&empresapidm=" + emppidm + "&cuenta=" + cuenta_code,
        async: false,
        success: function (datos) {
            if (datos != "" && datos.indexOf("error") >= 0) {
                bool = true
            }
        },
        error: function (msg) {
            alertCustom("Error vaidar inicio mes cuenta bancaria!")

        }
    });

    return bool;
}


function ConfirmarTransferencia(tipo, codigo) {

    limpiar();


    var datosJson = [];
    var data = new FormData();
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/ca/ajax/CAMDIFE.ASHX?OPCION=5&p_CODE=" + codigo,
        contentType: false,
        data: data,
        processData: false,
        async: false,
        cache: false
    }).success(function (datos) {
        Desbloquear("ventana");
        if (datos != null) {
            $("#lblCajaOrigen").html(datos[0].CAJA_ORIGEN);
            $("#lblFecha").html(datos[0].FECHA_EMISION);
            $("#lblUsuario").html(datos[0].USUA_ID);
            $("#lblMovimiento").html("INGRESO");
            $("#lblMontoMoba").html(datos[0].MONTO_MOBA);
            $("#lblMontoMoal").html(datos[0].MONTO_MOAL);
            if (datos[0].MOBA_IND == "S") {
                $("#lblDestino").html(datos[0].DESC_DESTINO_MOBA)
            }
            if (datos[0].MOAL_IND == "S") {
                $("#lblDestino").html(datos[0].DESC_DESTINO_MOAL)
            }
            datosJson = datos;
        } else {
            alertCustom("No se encontraron datos")
        }
    }).error(function () {
        Desbloquear("ventana");
        alertCustom("Error al obtener datos de transferencia")
        $("#lblCajaOrigen").html("");
        $("#lblFecha").html("");
        $("#lblUsuario").html("");
        $("#lblMovimiento").html("");
        $("#lblMontoMoba").html("");
        $("#lblMontoMoal").html("");
    });

    if (tipo == "aceptar") {
        $("#btnAceptar").attr("href", "javascript:AceptarTransferencia('" + codigo + "','" + JSON.stringify(datosJson) + "');")

        var contenido = "";

        $("#mensajeConfirmacion").html('¿Está seguro de <span style="color: blue;font-weight:600;">ACEPTAR</span> la transferencia?');
    }
    else if (tipo = "rechazar") {
        $("#btnAceptar").attr("href", "javascript:RechazarTransferencia('" + codigo + "');")
        $("#mensajeConfirmacion").html('¿Está seguro de <span style="color: red;font-weight:600;">RECHAZAR</span> la transferencia?');
    }
    $("#modal-confirmar").modal("show");
}

function AceptarTransferencia(codigo, strDatos) {


    var datosJson = JSON.parse(strDatos);

    if (!vErrors(["txt_num_mov"])) {

        return;
    }

    var cta_dest = ""
    if (datosJson[0].MOBA_IND == "S") { cta_dest = datosJson[0].CODE_DESTINO_MOBA }
    if (datosJson[0].MOAL_IND == "S") { cta_dest = datosJson[0].CODE_DESTINO_MOAL }

    /*
    porta aquiiiiiiiiiiiii


    if (ValidaInicioMesCtaBanc((datosJson[0].CTLG_PIDM),cta_dest)) {
        infoCustom2("No se a realizado el inicio de mes para la cuenta bancaria a transferir!")
        return;
    }*/



   
    //-----------------------------------
    
    var data = new FormData();
    data.append('p_CODE', codigo);
    data.append('p_CTLG_CODE', datosJson[0].CTLG_CODE);
    data.append('p_PIDM_CTLG', datosJson[0].CTLG_PIDM);
    data.append('p_SCSL_CODE', datosJson[0].SCSL_CODE);
    data.append('p_CAJA_CODE', datosJson[0].CAJA_CODE);
    data.append('p_MONTO_MOBA', datosJson[0].MONTO_MOBA);
    data.append('p_MONTO_MOAL', datosJson[0].MONTO_MOAL);
    data.append('p_TIPO_DESTINO_MOBA', datosJson[0].TIPO_DESTINO_MOBA);
    data.append('p_TIPO_DESTINO_MOAL', datosJson[0].TIPO_DESTINO_MOAL);
    data.append('p_MOBA_IND', datosJson[0].MOBA_IND);
    data.append('p_MOAL_IND', datosJson[0].MOAL_IND);
    data.append('p_DESTINO_MOBA', datosJson[0].CODE_DESTINO_MOBA);
    data.append('p_DESTINO_MOAL', datosJson[0].CODE_DESTINO_MOAL);
    data.append('p_USUA_ID', datosJson[0].USUA_ID);
    data.append('p_USUA_ID_RECEPCION', $('#ctl00_txtus').val());

    data.append('p_NRO_OPERACION', $('#txt_num_mov').val());
    

    Bloquear('ventana');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/ca/ajax/CAMDIFE.ASHX?OPCION=7",
        contentType: false,
        data: data,
        processData: false,
        async: false,
        cache: false
    })
    .success(function (datos) {
        Desbloquear("ventana");
        if (datos != null && datos[0].RESPUESTA != undefined) {
            if (datos[0].RESPUESTA == "OK") {
                exito();
                cargarPendientesCuenta();
            } else if (datos[0].RESPUESTA == "CERRADO_ORGN") {
                alertCustom("La caja origen de la trasferencia se encuentra cerrada.");

            } else if (datos[0].RESPUESTA == "CERRADO_MOBA") {
                alertCustom("La caja destino para Moneda Base no se encuentra abierta.");
            }
            else if (datos[0].RESPUESTA == "CERRADO_MOAL") {
                alertCustom("La caja destino para Moneda Alterna no se encuentra abierta.");
            }
            else if (datos[0].RESPUESTA == "EXCESO") {
                alertCustom("El monto a diferir superó los fondos en la caja origen. Verifique sus datos.");
            } else if (datos[0].RESPUESTA == "ERROR") {
                alertCustom("Parece que hubo un error al confirmar la transferencia. Intente nuevamente!");
            } else {
                alertCustom(datos[0].RESPUESTA);
            }
        }
    })
     .error(function () {
         Desbloquear("ventana");
         alertCustom("Error al diferir efectivo. Por favor intente nuevamente.");
     });
    $("#modal-confirmar").modal("hide");
    
}

function RechazarTransferencia(codigo) {
    var data = new FormData();
    data.append('p_CODE', codigo);
    data.append('p_USUA_ID_RECEPCION', $('#ctl00_txtus').val());

    Bloquear('ventana');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/ca/ajax/CAMDIFE.ASHX?OPCION=8",
        contentType: false,
        data: data,
        processData: false,
        async: false,
        cache: false
    })
    .success(function (datos) {
        Desbloquear("ventana");
        if (datos != null && datos[0].RESPUESTA != undefined) {
            if (datos[0].RESPUESTA == "OK") {
                exito();
                cargarPendientesCuenta();
            } else {
                alertCustom(datos[0].RESPUESTA);
            }
        }
    })
     .error(function () {
         Desbloquear("ventana");
         alertCustom("Error al rechazar la transferencia. Por favor intente nuevamente.");
     });
    $("#modal-confirmar").modal("hide");
}


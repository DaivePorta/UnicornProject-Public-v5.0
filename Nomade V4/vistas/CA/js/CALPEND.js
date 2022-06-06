
var mensaje = true;

var CALPEND = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboCaja').select2();
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

    var fillCboCaja = function () {
        var select = $('#cboCaja');
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + $('#cboEmpresa').val() + "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboCaja').empty();
                $('#cboCaja').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CAJA_CODE + '" monto="' + datos[i].MONTO_CAJA + '" tipo="' + datos[i].TIPO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                    }
                }
                $('#cboCaja').select2('val', '');
            },
            error: function (msg) {
                alert(msg.d);
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
            cargarDatosCaja();           
        });

        $("#cboCaja").on("change", function () {            
                cargarDatosCaja();            
        });

        $('#buscar').on('click', function () {
            if ($("#cboCaja").val() != "") {
                if (typeof $("#hfCajaAbiertaInd").val() != "undefined")
                    $("#hfCajaAbiertaInd").val("")                
                cargarDatosCaja();
            } else {
                alertCustom("Seleccione una caja antes de Filtrar!")
            }
        });
        
    }

    var cargaInicial = function (codigoCtlg, codigoScsl, codigoCaja) {
        $("#cboEmpresa").select2("val", codigoCtlg);
        fillCboEstablecimiento(codigoCtlg);
        $("#cboEstablecimiento").select2("val", codigoScsl);
        fillCboCaja();
        $("#cboCaja").select2("val", codigoCaja)
        cargarDatosCaja();
        window.history.pushState("Object", "MOVIMIENTOS PENDIENTES CAJA", "/Default.aspx?f=CALPEND");
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            var codigoCaja = ObtenerQueryString("caja");
            var codigoCtlg = ObtenerQueryString("ctlg");
            var codigoScsl = ObtenerQueryString("scsl");
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

var cargarDatosCaja = function () {

    //if (vErrors(['cboEmpresa', 'cboEstablecimiento', 'cboCaja'])) {

        $("#txtMontoMoba,#txtMontoMoal").val("0");
        if (typeof $("#hfCajaAbiertaInd").val() != "undefined")
            $("#hfCajaAbiertaInd,#hfCodUltimoMovimiento").val("");

        if ($('#cboCaja').val() != "") {
            listarAperturasCaja();
            if (typeof $("#hfCajaAbiertaInd").val() != "undefined") {
                if ($("#hfCajaAbiertaInd").val() == "S") {
                    $("#pendientes").slideDown();
                    listarPendientes();
                    //Etiquetas
                    $(".simboloMoba").html($("#hfSimbMonedaBase").val());
                    $(".simboloMoal").html($("#hfSimbMonedaAlterna").val());
                    $(".descMoba").html($("#hfDescMonedaBase").val());
                    $(".descMoal").html($("#hfDescMonedaAlterna").val());
                }
                else {
                    alertCustom("La caja seleccionada no se encuentra abierta!")
                    $("#pendientes").slideUp();
                }
            }
            else {
                $("#pendientes").slideUp();
            }
        } else {
            $("#pendientes").slideUp();
        }
    //}
}

var listarPendientes = function () {
    var data = new FormData();
    data.append('p_CTLG_CODE', $('#cboEmpresa').val());
    data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
    data.append('p_CAJA_CODE', $('#cboCaja').val());

    data.append('p_CONTADO_IND', ($("#chkContado").is(":checked") ? "S" : "N"));
    data.append('p_CREDITO_IND', ($("#chkCredito").is(":checked") ? "S" : "N"));
    data.append('p_TRANSFERENCIA_IND', ($("#chkTransferencia").is(":checked") ? "S" : "N"));
    data.append('p_OTROS_IND', ($("#chkOtros").is(":checked") ? "S" : "N"));

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/ca/ajax/calpend.ASHX?OPCION=2",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
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
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

// TRANSFERENCIAS
function ConfirmarTransferencia(tipo, codigo) {
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
                cargarDatosCaja();
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
                noexito();
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
                cargarDatosCaja();
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

//VENTAS
function CobrarVenta(codigo) {
    window.open('?f=CCMCBCL&codigo=' + codigo + '&ctlg_code=' + $("#cboEmpresa").val() + '&scsl_code=' + $("#cboEstablecimiento").val() + '', '_blank');
}

//MOVIMIENTOS INGRESOS EGRESOS
function ConfirmarIngresoMoie(codigo) {

    var datosJson = [];
    var data = new FormData();
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/ca/ajax/CALPEND.ASHX?OPCION=4&p_CODE=" + codigo,
        contentType: false,
        data: data,
        processData: false,
        async: false,
        cache: false
    }).success(function (datos) {
        Desbloquear("ventana");
        if (datos != null) {
            $("#lblCajaOrigen").html("-");
            $("#lblFecha").html(datos[0].FECHA);
            $("#lblUsuario").html(datos[0].USUA_ID);
            $("#lblMovimiento").html("INGRESO");            
            $("#lblMontoMoba").html((datos[0].INGRESO_MOBA == "") ? "0.00" : datos[0].INGRESO_MOBA);
            $("#lblMontoMoal").html((datos[0].INGRESO_MOAL == "") ? "0.00" : datos[0].INGRESO_MOAL);
            datosJson = datos;
        } else {
            alertCustom("No se encontraron datos")
        }
    }).error(function () {
        Desbloquear("ventana");
        alertCustom("Error al obtener datos de movimiento")
        $("#lblCajaOrigen").html("");
        $("#lblFecha").html("");
        $("#lblUsuario").html("");
        $("#lblMovimiento").html("");
        $("#lblMontoMoba").html("");
        $("#lblMontoMoal").html("");
    });


    $("#btnAceptar").attr("href", "javascript:AceptarIngresoMoie('" + codigo + "','" + JSON.stringify(datosJson) + "');")
    $("#mensajeConfirmacion").html('¿Está seguro de <span style="color: blue;font-weight:600;">ACEPTAR</span> la transferencia?');
    $("#modal-confirmar").modal("show");
 
}

function AceptarIngresoMoie(codigo, strDatos) {

    var datosJson = JSON.parse(strDatos);
    //-----------------------------------
    var data = new FormData();
    data.append('p_CODE', codigo);
    data.append('p_SCSL_CODE', datosJson[0].SCSL_CODE);
    data.append('p_CAJA_CODE', datosJson[0].CAJA_CODE);
    data.append('p_USUA_ID', datosJson[0].USUA_ID);
    //data.append('p_ORIGEN_DESTINO', datosJson[0].CTLG_CODE); 
    data.append('p_TMCA_CODE', 'OING');
    data.append('p_CONC_CODE', datosJson[0].CODIGO_CONCEPTO);
    data.append('p_DESC', 'INGRESO POR RENDICION DE CUENTAS');
    //data.append('p_DCTO_CODE', datosJson[0].CTLG_CODE);  
    data.append('p_NRO_DOC', datosJson[0].NRO_DOC);
    //data.append('p_DCTO_CODE_REF', datosJson[0].CTLG_CODE); 
    data.append('p_PAGO_IND', 'S');
    data.append('p_MONTO_DCTO_SOLES', (datosJson[0].INGRESO_MOBA == "") ? "0" : datosJson[0].INGRESO_MOBA);
    data.append('p_MONTO_DCTO_DOLARES', (datosJson[0].INGRESO_MOAL == "") ? "0" : datosJson[0].INGRESO_MOAL);
    data.append('p_MOPA_CODE', '0001');
    data.append('p_FOPA_CODE', '0008');
    //data.append('p_TTAR_CODE', datosJson[0].CTLG_CODE);  
    //data.append('p_FECHA_VENCIM', datosJson[0].CTLG_CODE); 
    //data.append('p_FECHA_PAGO', datosJson[0].CTLG_CODE); 
    //data.append('p_COD_REF', datosJson[0].CTLG_CODE); 
    data.append('p_COMPLETO_IND', 'S');
    data.append('p_IND_INGR_EGRE', 'I');

    Bloquear('ventana');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/ca/ajax/CALPEND.ASHX?OPCION=5",
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
                cargarDatosCaja();            
            } else {
                alertCustom(datos[0].RESPUESTA);
            }
        }
    })
     .error(function () {
         Desbloquear("ventana");
         alertCustom("Error al aceptar la transferencia. Por favor intente nuevamente.");
     });
    $("#modal-confirmar").modal("hide");
   
}

function PagarMoie(codigo) {
    infoCustom2("Esta opción aún se encuentra en desarrollo.")

}
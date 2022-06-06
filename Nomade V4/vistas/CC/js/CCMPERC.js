
var percepciones = [];
var oTable;
var CCMPERC = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        oTable = $('#tblPercepciones').dataTable({ "scrollX": true });
        var fechaTransaccion = new Date();
        $("#txtFechaTransaccion").val(fechaTransaccion.toLocaleDateString());
        $("#txtFechaPago").datepicker();
        $('#cboCuentaDestino').select2();
        $('#cboModoPago').select2();

        $('#txtFechaPago').datepicker().on("change", function () {
            if ($('#txtFechaTransaccion').val() != "") {
                $('#txtFechaPago').datepicker('setStartDate', $('#txtFechaTransaccion').val());
            }
        });
        $('#txtFechaPago').change();
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/ccmperc.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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

    var fillCboModoPago = function () {
        var data = new FormData();
        data.append('OPCION', '2');

        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/ccmperc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboModoPago').empty();
                $('#cboModoPago').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO == "0001" || datos[i].CODIGO == "0003" || datos[i].CODIGO == "0005" ||
                            datos[i].CODIGO == "0006" || datos[i].CODIGO == "0008" || datos[i].CODIGO == "0011") {
                            $('#cboModoPago').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                        }
                    }
                }
                $('#cboModoPago').select2('val', '');

            },
            error: function (msg) {
                alertCustom("Error al listar. Por favor intente nuevamente.");
            }
        });
    }

    var fillCboCuentaDestino = function () {
        var data = new FormData();
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/ccmperc.ashx?OPCION=3&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboCuentaDestino').empty();
                $('#cboCuentaDestino').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboCuentaDestino').append('<option value="' + datos[i].CODE + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboCuentaDestino').select2('val', '');
            },
            error: function (msg) {
                alertCustom("Error al listar. Por favor intente nuevamente.");
            }
        });
    }

    var eventoComtroles = function () {
      
        $('#buscar').on('click', function () {
            listarPercepciones();
        });

        $('#cboCuentaDestino').on("change", function () {
            if ($(this).val() == "001" || $(this).val() == "003") {
                $("#txtNroOperacion").html("Nro Operación");
            }
            else if ($(this).val() == "008") {
                $("#txtNroOperacion").html("Nro Recibo");
            }
                //else if ( $(this).val() == "005"||$(this).val() == "006" || $(this).val() == "011") {
            else {
                $("#txtNroOperacion").html("Nro Documento");
            }
        });

        $('input[name=percepcion]').on('change', function () {
            var monto = parseFloat($(this).attr("data-monto"));
            var id = $(this).prop("id");
            if ($("#" + id).is(":checked")) {
                if (monto != "") {
                    if ($("#txtSeleccionado").val() == "") {
                        $("#txtSeleccionado").val("0")
                    }
                    var totalSeleccionado = parseFloat($("#txtSeleccionado").val()) + monto;
                    $("#txtSeleccionado").val(totalSeleccionado);
                    var obj = { code: $(this).attr("data-code"), monto: $(this).attr("data-monto"), interes: 0, pagoTotal: "N" };
                    percepciones.push(obj);
                }
            }
            else {
                if (monto != "") {
                    if ($("#txtSeleccionado").val() == "") {
                        $("#txtSeleccionado").val("0")
                    }
                    var totalSeleccionado = parseFloat($("#txtSeleccionado").val()) - monto;
                    $("#txtSeleccionado").val(totalSeleccionado);

                    var obj = { code: $(this).attr("data-code"), monto: $(this).attr("data-monto"), interes: 0, pagoTotal: "N" };
                    if (percepciones.contains(obj) != -1)
                        percepciones.splice(percepciones.contains(obj), 1);
                }
            }
            calcularInteres();
        });

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboModoPago();
            fillCboCuentaDestino();
            eventoComtroles();

        }
    };

}();
function calcularInteres() {
    if ($("#txtSeleccionado").val() != 0 && $("#txtSeleccionado").val() != "" && $("#txtMonto").val() != 0) {
        if (parseFloat($("#txtMonto").val()) > parseFloat($("#txtSeleccionado").val())) {
            var interes = parseFloat($("#txtMonto").val()) - parseFloat($("#txtSeleccionado").val())
            $("#txtInteres").val(interes);
        } else {
            $("#txtInteres").val("0");
        }
    } else {
        $("#txtInteres").val("0");
    }
}
function listarPercepciones() {
    var data = new FormData();
    data.append('OPCION', '1');
    data.append('p_CTLG_CODE', $('#cboEmpresa').val());
    data.append('p_USUA_ID', $('#ctl00_txtus').val());
    //Limpiar valores
    $("#txtSeleccionado").val("");
    percepciones.splice(0, percepciones.length);
    Bloquear('ventana');
    //Lista percepciones
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CC/ajax/CCMPERC.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).success(function (datos) {
        Desbloquear("ventana");
        if (datos != null) {
            $("#divPercepciones").html(datos)
            oTable = $('#tblPercepciones').dataTable({ "scrollX": true });
            cargarEventoCheckChange();
        }
    }).error(function () {
        Desbloquear("ventana");
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}
//Carga la funcion para los checkbox
function cargarEventoCheckChange() {
    $('input[name=percepcion]').on('change', function () {
        var monto = parseFloat($(this).attr("data-monto"));
        var id = $(this).prop("id");
        if ($("#" + id).is(":checked")) {
            if (monto != "") {
                if ($("#txtSeleccionado").val() == "") {
                    $("#txtSeleccionado").val("0")
                }
                var totalSeleccionado = parseFloat($("#txtSeleccionado").val()) + monto;
                $("#txtSeleccionado").val(totalSeleccionado);
                var obj = { code: $(this).attr("data-code"), monto: $(this).attr("data-monto"), interes: 0 }

                if (percepciones.contains(obj) == -1)
                    percepciones.push(obj);
            }
        }
        else {
            if (monto != "") {
                if ($("#txtSeleccionado").val() == "") {
                    $("#txtSeleccionado").val("0")
                }
                var totalSeleccionado = parseFloat($("#txtSeleccionado").val()) - monto;
                $("#txtSeleccionado").val(totalSeleccionado);

                var obj = { code: $(this).attr("data-code"), monto: $(this).attr("data-monto") }
                if (percepciones.contains(obj) != -1)
                    percepciones.splice(percepciones.contains(obj), 1);
            }
        }
        calcularInteres();
    });
}
//Graba el pago de la percepcion
function GrabarCobroPercepcion() {
    
    percepcionesActualizar = [];

    if (vErrors(["cboEmpresa", "txtFechaTransaccion", "txtFechaPago",
    "cboModoPago", "txtCuentaOrigen", "cboCuentaDestino", "txtNroOperacion", "txtNroCheque", "txtMonto"])) {

        var montoSeleccionado = parseFloat($("#txtSeleccionado").val());
        var montoIngresado = parseFloat($('#txtMonto').val());
        Bloquear("divPercepciones");
        if (montoSeleccionado <= montoIngresado && montoIngresado != 0 && montoSeleccionado!= 0) {

            for (var i = 0; i < percepciones.length; i++) {
                if (parseFloat(percepciones[i].monto) <= montoIngresado) {
                    montoIngresado -= parseFloat(percepciones[i].monto);
                    percepcionesActualizar.push(percepciones[i]);
                }
            }
            
            Desbloquear("divPercepciones");
            //Si aún queda un exceso en el monto ingresado respecto al Seleccionado
            if (montoIngresado > 0) {
                percepcionesActualizar[percepcionesActualizar.length - 1].interes = montoIngresado;
                infoCustom2("El monto excedente de " + montoIngresado.toFixed(2) + " fue agregado como interés a la última percepción seleccionada.");
            }

          

            for (var i = 0; i < percepcionesActualizar.length; i++) {

                var data = new FormData();
                data.append('OPCION', '4');
                data.append('p_CTLG_CODE', $('#cboEmpresa').val());
                data.append('p_USUA_ID', $('#ctl00_txtus').val());

                data.append('p_FECHA_TRANSACCION', $('#txtFechaTransaccion').val());
                data.append('p_FECHA_PAGO', $('#txtFechaPago').val());
                data.append('p_MODO_PAGO', $('#cboModoPago').val());
                data.append('p_CUENTA_ORIGEN', $('#txtCuentaOrigen').val());
                data.append('p_NRO_CHEQUE', $('#txtNroCheque').val());
                data.append('p_CUENTA_DESTINO', $('#cboCuentaDestino').val());
                data.append('p_NRO', $('#txtNroOperacion').val());

                data.append('p_FAB_CODE', percepcionesActualizar[i].code);
                data.append('p_MONTO', percepcionesActualizar[i].monto);
                data.append('p_INTERES', percepcionesActualizar[i].interes);

                Bloquear('ventana');
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/CC/ajax/CCMPERC.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    async: false
                }).success(function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        RegistraCobroRegistro(percepcionesActualizar[i].code, datos[0].CODIGO_PAGO);
                    }
                }).error(function () {
                    Desbloquear("ventana");
                    alertCustom("Error al listar. Por favor intente nuevamente.");
                });
            }
            exito();
            $('input').val('');
            listarPercepciones();
        }
        else {
            Desbloquear("divPercepciones");
            if (montoIngresado == 0) {
                alertCustom("El monto ingresado debe se mayor a 0.");
            } else if ($("#txtSeleccionado").val() == "" || $("#txtSeleccionado").val() == "0") {
                alertCustom("Debe seleccionar almenos una percepción.");
            } else {
                //Procedimiento de cobro para varias percepciones, pero cuando el monto ingresado es menor al seleccionado
                for (var i = 0; i < percepciones.length; i++) {
                    //Cobro total
                    if (parseFloat(percepciones[i].monto) <= montoIngresado && montoIngresado != 0) {
                        if (parseFloat(percepciones[i].monto) == montoIngresado) {
                            percepciones[i].pagoTotal = "S";
                        }
                        montoIngresado -= parseFloat(percepciones[i].monto);
                        percepcionesActualizar.push(percepciones[i]);

                    } else {
                        //Cuando el monto ingresado es menor al de la percepcion
                        if (montoIngresado == 0) {

                        } else {
                            percepciones[i].monto = montoIngresado;
                            montoIngresado = 0;
                            percepcionesActualizar.push(percepciones[i]);
                        }                       
                    }
                }

                for (var i = 0; i < percepcionesActualizar.length; i++) {

                    var data = new FormData();
                    data.append('OPCION', '4');
                    data.append('p_CTLG_CODE', $('#cboEmpresa').val());
                    data.append('p_USUA_ID', $('#ctl00_txtus').val());

                    data.append('p_FECHA_TRANSACCION', $('#txtFechaTransaccion').val());
                    data.append('p_FECHA_PAGO', $('#txtFechaPago').val());
                    data.append('p_MODO_PAGO', $('#cboModoPago').val());
                    data.append('p_CUENTA_ORIGEN', $('#txtCuentaOrigen').val());
                    data.append('p_NRO_CHEQUE', $('#txtNroCheque').val());
                    data.append('p_CUENTA_DESTINO', $('#cboCuentaDestino').val());
                    data.append('p_NRO', $('#txtNroOperacion').val());

                    data.append('p_FAB_CODE', percepcionesActualizar[i].code);
                    data.append('p_MONTO', percepcionesActualizar[i].monto);
                    data.append('p_INTERES', percepcionesActualizar[i].interes);

                    Bloquear('ventana');
                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/CC/ajax/CCMPERC.ASHX",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false,
                        async: false
                    }).success(function (datos) {
                        Desbloquear("ventana");
                        if (datos != null) {
                            RegistraCobroRegistro(percepcionesActualizar[i].code, datos[0].CODIGO_PAGO);
                        }
                    }).error(function () {
                        Desbloquear("ventana");
                        alertCustom("Error al listar. Por favor intente nuevamente.");
                    });
                }
                exito();
                listarPercepciones();
            }
        }
    }
    Desbloquear("divPercepciones");
}

//Actualiza estado de percepcion
function RegistraCobroRegistro(codigoFab, codigoPago) {

    var data = new FormData();
    data.append('OPCION', '5');
    data.append('p_FAB_CODE', codigoFab);
    data.append('p_PAGO_CODE', codigoPago);

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CC/ajax/CCMPERC.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    }).success(function (datos) {
        if (datos != null) {
        }
    }).error(function () {
    });
}
//Devuelve el indice del objeto dentro de un array si el codigo (".code" - debe ser unico) coincide con alguno de sus elementos
Array.prototype.contains = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].code == obj.code) {
            return i;
        }
    }
    return -1;
};

$(function () {
    $('#tblPercepciones tbody td img').live('click', function () {
        var id = $(this).attr('id');
        var nTr = $(this).parents('tr')[0];

        if (oTable.fnIsOpen(nTr)) {
            /* This row is already open - close it */
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
                url: "vistas/cc/ajax/ccmperc.ashx?OPCION=6&p_FAB_CODE=" + id,
                success: function (datos) {
                    $('#c' + id).html(datos);
                },
                error: function () {
                    $('#c' + id).html("");
                }
            });
        }

    });

    function fnFormatDetails(nTr, id) {
        var sOut = '<div id="c' + id + '"></div>';
        return sOut;
    }
});
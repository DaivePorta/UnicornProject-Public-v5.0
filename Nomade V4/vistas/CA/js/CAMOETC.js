var CALOETC = function () {

    var eventos2 = function () {
        $('#cboEmpresa').on('change', function () {
            $("#tOETC").dataTable().fnDestroy();            
            fillOETipoCambio();            
        });
    }

    var fillCboempresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                
            },
            error: function (msg) {
                alertCustom('Error al intentar listar empresas.');
            }
        });
        $('#cboEmpresa').select2();
    }

    var cargarOETipoCambioLista = function () {
        $.ajax({
            type: "post",
            url: "vistas/CA/ajax/CAMOETC.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            //contenttype: "application/json;",
            //datatype: "json",
            async: false,
            success: function (datos) {
                //if (datos !== null) {
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfOETC').val(datos);
                //}
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('.form-actions').slideUp();
    };

    var fillOETipoCambio = function () {

        cargarOETipoCambioLista();

        var jeson = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfOETC').val()); //$('#cboEmpresa').val()

        var parms = {
            data: jeson,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CTLG_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SCSL_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CAJA_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CASA_CAMBIO_NC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MODO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONEDA_BASE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO_BASE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "MONEDA_CONVERT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO_CONVERT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "TIPO_CAMBIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_OPERACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_SISTEMA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }                
            ]
        }

        tabla = iniciaTabla('tOETC', parms);

        $("#tOETC").removeAttr("style");

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $('#tOETC tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                tabla.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = tabla.fnGetPosition(this);
                var row = tabla.fnGetData(pos);
                var cod = row.CODIGO;

                window.location.href = '?f=CAMOETC&codigo=' + cod + '&ctlg_code=' + $('#cboEmpresa').val();
            }
        });
    };

    return {
        init: function () {
            eventos2();
            fillCboempresa();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val()).change(); 
            //$('#cboEmpresa').select2('val', $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfOETC').val()).change();            
        }
    };
}();

var CAMOETC = function () {
    return {
        init: function () {
            var codigo = ObtenerQueryString('codigo');
            plugins();
            eventos();
            cargarEmpresas();
            $('#cboEmpresas').select2('val', $('#ctl00_hddctlg').val());
            cargarEstablecimientos();
            $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
            cargarEmpleados();
            cargarCajas('SI');
            autocompletarCasadeCambio('');
            cargarMonedas();
            cargarBase();
            $('#cboMoneda').select2('val', '0002');
            cargarCambios();
            $('#cboCambio').select2('val', '0003');            
            $('.timepicker-default').timepicker({
                defaultTime: 'current',
                minuteStep: 1
            });
            if (codigo !== undefined) {
                var ctlg = ObtenerQueryString('ctlg_code');
                $('#cboEmpresas').select2('val', ctlg);
                cargarOETipoCambio(codigo,$('#cboEmpresas').val());
            }
        }
    };
}();

var plugins = function () {
    $('#cboEmpresas, #cboEstablecimiento, #cboCaja, #cboTipo, #cboMoneda, #cboCambio').select2();
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        $('.combo').select2();
};

var cargarEmpleados = function () {
    var select = $('#tbAsignacion');
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMOETC.ashx?OPCION=4&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            select.empty();
            if (datos != null) {
                params = {
                    data: datos,
                    columns: [
                        {
                            data: 'PIDM',
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        },
                        {
                            data: 'NOMBRE_EMPLEADO',
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        }
                    ]
                }
                tabla = $('#tAsignacion').dataTable(params);
                $('#tAsignacion tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        tabla.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        var pos = tabla.fnGetPosition(this);
                        var row = tabla.fnGetData(pos);
                        var pidm = row.PIDM;
                        var nom_emp = row.NOMBRE_EMPLEADO;

                        $('#txtAsignacion').val(pidm);
                        $('#txtAsignacion_RS').val(nom_emp);
                        $('#modalAsignacion').modal('hide');
                    }
                });
            }
        },
        error: function (msg) {
            alert(msg.d);
        }
    });
};

var cargarEmpresas = function () {
    var selectEmpresa = $('#cboEmpresas');
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=6&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEmpresa.html('<option></option>');
            if (datos !== null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        },
        error: function () {
            alertCustom('Error al listar empresas.');
        }
    });

};

var cargarEstablecimientos = function () {
    var selectEst = $('#cboEstablecimiento');
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEst.html('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        },
        error: function (msg) {
            alert(msg.d);
        }
    });

};

var cargarCajas = function (bloquear) {
    var select = $('#cboCaja');
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMOETC.ashx?OPCION=2&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            select.html('<option></option>');
            if (datos !== null) {
                for (var i = 0; i < datos.length; i++) {
                    if (bloquear == 'NO') {
                        select.append('<option value="' + datos[i].CAJA_CODE + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                    }
                    else {
                        if (datos[i].ESTADO == 'ABIERTO') {
                            select.append('<option value="' + datos[i].CAJA_CODE + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                        }
                        //else {
                        //    select.append('<option disabled value="' + datos[i].CAJA_CODE + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                        //}
                    }

                }
            }
        },
        error: function () {
            alertCustom('Error al listar cajas.');
        }
    });
};

var autocompletarCasadeCambio = function (v_value) {
    var txtNuevosCajeros = $('#txtCasadeCambio');
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMOETC.ashx?OPCION=1&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null) {
                txtNuevosCajeros.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].NOMBRE_COMERCIAL);
                            obj += '{ "PIDM" : "' + datos[i].PIDM + '", "NOMBRE_COMERCIAL" : "' + datos[i].NOMBRE_COMERCIAL + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE_COMERCIAL] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfCASA_CAMBIO_PIDM').val(map[item].PIDM);
                        return item;
                    }
                });

                txtNuevosCajeros.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(this).val().length == 0) {
                        $('#hfCASA_CAMBIO_PIDM').val('');
                    }
                });
            }
        },
        error: function () {
            alertCustom('Error al listar casas de cambio.');
        }
    });
};

monedas = [];
var cargarMonedas = function () {
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMOETC.ashx?OPCION=3",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            monedas = datos;
        },
        error: function (msg) {
            alert(msg.d);
        }
    });
};

var cargarBase = function () {
    var select = $('#cboMoneda');
    select.html('<option></option>');
    for (var i = 0; i < monedas.length; i++) {
        select.append('<option value="' + monedas[i].CODIGO + '" data-tipo="' + monedas[i].TIPO + '">' + monedas[i].DESCRIPCION + '</option>');
    }
};

var cargarCambios = function () {
    var select = $('#cboCambio');
    var base = $('#cboMoneda').val();
    select.html('<option></option>');
    for (var i = 0; i < monedas.length; i++) {
        select.append('<option value="' + monedas[i].CODIGO + '">' + monedas[i].DESCRIPCION + '</option>');
    }
};

var mostrarMonto = function () {
    Bloquear('base');
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMOETC.ashx?OPCION=MONTO_CAJA",
        contenttype: "application/json;",
        async: false,
        data: { CAJA_CODE: $('#cboCaja').val(), MONE_TIPO: $('#cboMoneda :selected').attr('data-tipo'), USUA_ID: $('#ctl00_txtus').val() }
    }).done(function (data) {
        $('#lblMonto').text(parseFloat(data).toFixed(2));
        Desbloquear('base');
    }).fail(function () {
        alertCustom('No se pudo calcular la suma de la caja.');
        Desbloquear('base');
    });
};

var eventos = function () {
    $('#cboEmpresas').on('change', function () {
        cargarEstablecimientos();
        $('#cboEstablecimiento').select2('val', '0001').change();
        cargarCajas('SI');
        $('#cboCaja').select2('val', '').change();
        //mostrarMonto();
    });

    $('#cboEstablecimiento').on('change', function () {
        cargarCajas('SI');
        $('#cboCaja').select2('val', '').change();
        //mostrarMonto();
    });

    $('#cboCaja').on('change', function () {
        if ($(this).val() !== '') {
            mostrarMonto();
        } else {
            Bloquear('base');
            $('#lblMonto').text(parseFloat("0").toFixed(2));
            Desbloquear('base');
        }
    });

    $('#cboMoneda').on('change', function () {
        var cambio = ($(this).val() === '0002') ? '0003' : '0002';
        $('#cboCambio').select2('val', cambio).change();
        mostrarMonto();
        $('#txtMonto').keyup();
    });

    $('#txtAsignacion_RS').keyup(function () {
        if ($(this).val().trim().length === 0) {
            $('#txtAsignacion').val('');
        }
    });

    $('#btnAsignacion').click(function () {
        $('#modalAsignacion').modal('show');
    });

    $('#txtMonto').keyup(function () {
        var base = $(this).val();
        var tipoCambio = $('#txtTipodeCambio').val();
        if (base === undefined || tipoCambio === undefined) {
            $('#txtCambio').val('');
        } else {
            var calculo = ($('#cboMoneda :selected').attr('data-tipo') === 'MOBA') ? (base / tipoCambio).toFixed(2) : (base * tipoCambio).toFixed(2);
            if (calculo !== 'Infinity') $('#txtCambio').val(calculo);
            if (base.length == 0 || tipoCambio.length == 0) $('#txtCambio').val('');
        }
    });

    $('#txtTipodeCambio').keyup(function () {
        var base = $('#txtMonto').val();
        var tipoCambio = $(this).val();
        if (base == undefined || tipoCambio == undefined) {
            $('#txtCambio').val(null);
        } else {
            var calculo = ($('#cboMoneda :selected').attr('data-tipo') === 'MOBA') ? (base / tipoCambio).toFixed(2) : (base * tipoCambio).toFixed(2);
            if (calculo !== 'Infinity') $('#txtCambio').val(calculo);
            if (base.length == 0 || tipoCambio.length == 0) $('#txtCambio').val('');
        }
    });

    $('#cboTipo').on('change', function () {
        if ($(this).val() === 'D') {
            $('.asignacion').css('display', 'none');
            $('#txtAsignacion, #txtAsignacion_RS').val('');
        } else {
            $('.asignacion').css('display', 'inline-block');
            $('#btnAsignacion').focus();
        }
    });

    $('#btnGrabar').click(function () {
        $('#divOK').modal('show');
    });
};

var cargarOETipoCambio = function (codigo, ctlg_code) {
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMOETC.ashx?OPCION=0&CODIGO=" + codigo + '&CTLG_CODE=' + ctlg_code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null) {
                $('#cboEmpresas').select2('val', datos[0].CTLG_CODE).change();
                $('#cboEstablecimiento').select2('val', datos[0].SCSL_CODE).change();

                cargarCajas('NO');
                $('#cboCaja').select2('val', datos[0].CAJA_CODE); //.change();

                $('#hfCASA_CAMBIO_PIDM').val(datos[0].CASA_CAMBIO_PIDM);
                $('#txtCasadeCambio').val(datos[0].CASA_CAMBIO);
                $('#txtNombreComercial').val(datos[0].CASA_CAMBIO_NC);
                $('#cboTipo').val(datos[0].MODO.charAt(0));
                $('#txtAsignacion').val(datos[0].ASIGNACION_PIDM);
                $('#txtAsignacion_RS').val(datos[0].ASIGNACION);
                $('#cboMoneda').select2('val', datos[0].MONE_BASE_CODE).change();
                var mone_base_monto = Number(datos[0].MONE_BASE_MONTO);
                $('#txtMonto').val(mone_base_monto.toFixed(3));
                var tipo_cambio = Number(datos[0].TIPO_CAMBIO);
                $('#txtTipodeCambio').val(tipo_cambio.toFixed(3));
                $('#cboCambio').val(datos[0].MONE_CAMBIO_CODE);
                var mone_cambio_monto = Number(datos[0].MONE_CAMBIO_MONTO);
                $('#txtCambio').val(mone_cambio_monto.toFixed(2));
                $('#txtfecharecepcion').val(datos[0].FECHA_OPERACION);
                $('#txthorarecepcion').val(datos[0].HORA_OPERACION);               

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $('.form-actions').slideUp();
};

var Grabar = function () {
    $("#rsptsi").attr('disabled', true);
    var tipo = $('#cboTipo').val();
    var array = ['cboEstablecimiento', 'cboCaja', 'txtCasadeCambio', 'txtMonto', 'txtTipodeCambio', 'txtCambio', 'txtfecharecepcion', 'txthorarecepcion'];
    if (tipo == 'A') {
        array = ['cboEstablecimiento', 'cboCaja', 'txtCasadeCambio', 'txtAsignacion', 'txtAsignacion_RS', 'txtMonto', 'txtTipodeCambio', 'txtCambio', 'txtfecharecepcion', 'txthorarecepcion'];
    }
    var monto = $('#lblMonto').text();
    monto = (monto === undefined || monto === '') ? 0.0 : parseFloat(monto);
    if (vErrors(array)) {
        var MONE_BASE_MONTO = $('#txtMonto').val();
        if (MONE_BASE_MONTO <= monto) {
            var data = new FormData();
            data.append('OPCION', '5');
            data.append('CAJA_CODE', $('#cboCaja').val());
            data.append('CASA_CAMBIO_PIDM', $('#hfCASA_CAMBIO_PIDM').val());
            data.append('MODO', $('#cboTipo').val());
            data.append('ASIG_PIDM', $('#txtAsignacion').val());
            data.append('MONE_BASE_CODE', $('#cboMoneda').val());
            data.append('MONE_BASE_MONTO', MONE_BASE_MONTO);
            data.append('TIPO_CAMBIO', $('#txtTipodeCambio').val());
            data.append('MONE_CAMBIO_CODE', $('#cboCambio').val());
            data.append('MONE_CAMBIO_MONTO', $('#txtCambio').val());
            data.append('USUA_ID', $('#ctl00_txtus').val());
            data.append('FECHA_OPE', $('#txtfecharecepcion').val());
            data.append('HORA_OPE', $('#txthorarecepcion').val());

            Bloquear('caja');

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/CA/ajax/CAMOETC.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                Desbloquear("caja");
                if (res !== null) {
                    if (res !== '0000') {
                        exito();
                        window.history.pushState("Object", "OPERACION ESPECIAL DE TIPO DE CAMBIO", "/Default.aspx?f=CAMOETC&codigo=" + res);
                        $('.form-actions').slideUp();
                        $('#divOK').modal('hide');
                        mostrarMonto();
                    } else {
                        infoCustom('Puede que la caja haya sido cerrada antes del proceso, por favor asegúrese de que la caja se encuentre abierta para poder realizar operaciones.');
                    }
                }
            }).error(function () {
                Desbloquear("caja");
                alertCustom("Error al ejecutar la nueva operación. Por favor intente nuevamente.");
            });
        } else {
            alertCustom("El monto ingresado excede a lo que hay actualmente en Caja.");
        }
    }
};

var Actualizar = function () {
    var tipo = $('#cboTipo').val();
    var array = ['cboEstablecimiento', 'cboCaja', 'txtCasadeCambio', 'txtMonto', 'txtTipodeCambio', 'txtCambio'];
    if (tipo == 'A') {
        array = ['cboEstablecimiento', 'cboCaja', 'txtCasadeCambio', 'txtAsignacion', 'txtAsignacion_RS', 'txtMonto', 'txtTipodeCambio', 'txtCambio'];
    }
    var monto = $('#cboCaja :selected').attr('monto');
    monto = (monto == undefined) ? 0.0 : new Number(monto);
    if (vErrorsNotMessage(array)) {
        var MONE_BASE_MONTO = $('#txtMonto').val();
        if (MONE_BASE_MONTO <= monto) {
            var CODIGO = ObtenerQueryString('codigo');
            var CAJA_CODE = $('#cboCaja').val();
            var CASA_CAMBIO_PIDM = $('#hfCASA_CAMBIO_PIDM').val();
            var MODO = $('#cboTipo').val();
            var ASIG_PIDM = $('#txtAsignacion').val();
            var MONE_BASE_CODE = $('#cboMoneda').val();
            var TIPO_CAMBIO = $('#txtTipodeCambio').val();
            var MONE_CAMBIO_CODE = $('#cboCambio').val();
            var MONE_CAMBIO_MONTO = $('#txtCambio').val();
            var USUA_ID = $('#ctl00_txtus').val();

            var data = new FormData();
            data.append('OPCION', '6');
            data.append('CODIGO', CODIGO);
            data.append('CAJA_CODE', CAJA_CODE);
            data.append('CASA_CAMBIO_PIDM', CASA_CAMBIO_PIDM);
            data.append('MODO', MODO);
            data.append('ASIG_PIDM', ASIG_PIDM);
            data.append('MONE_BASE_CODE', MONE_BASE_CODE);
            data.append('MONE_BASE_MONTO', MONE_BASE_MONTO);
            data.append('TIPO_CAMBIO', TIPO_CAMBIO);
            data.append('MONE_CAMBIO_CODE', MONE_CAMBIO_CODE);
            data.append('MONE_CAMBIO_MONTO', MONE_CAMBIO_MONTO);
            data.append('USUA_ID', USUA_ID);

            Bloquear('caja');

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/CA/ajax/CAMOETC.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (res) {
                Desbloquear("caja");
                if (res != null) {
                    if (res == 'OK') {
                        exito();
                    } else {
                        noexito();
                    }
                }
            })
            .error(function () {
                Desbloquear("caja");
                alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
            });
        } else {
            alertCustom("El monto ingresado excede a lo que hay actualmente en Caja.");
        }
    }
};
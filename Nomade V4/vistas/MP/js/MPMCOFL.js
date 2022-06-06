var MPLCOFL = function () {

    var plugins = function () {
        $('select').select2();
    };

    var listarDataTable = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCOFL.ashx',
            async: false,
            data: { OPCION: 'S', CODIGO: '', CTLG_CODE: '', SCSL_CODE: '', ORFL_CODE: '', ACFI_CODE: '' }
        }).done(function (data) {
            $('#tblLISTA').DataTable({
                responsive: true,
                sDom: 'T<"clear">lfrtip',
                oTableTools: {
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
                },
                data: data,
                columns: [
                    {
                        data: 'CODIGO',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    { data: 'ORDEN_FLUJO' },
                    {
                        data: 'ACTIVO',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'FECHA_INICIO',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'FECHA_FIN',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'ESTADO',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: null,
                        defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'CTLG_CODE',
                        visible: false
                    },
                    {
                        data: 'SCSL_CODE',
                        visible: false
                    }
                ]
            });

            $('#tblLISTA').removeAttr('style');

            $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">ORDEN DE FLUJO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">FLOTA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">FECHA INICIO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">FECHA FIN</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">ESTADO</a>\
                    </div>');

            $('#tblLISTA tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $(this).addClass('selected');
                    var pos = $('#tblLISTA').DataTable().row(this).index();
                    var row = $('#tblLISTA').DataTable().row(pos).data();
                    var codigo = row.CODIGO;
                    window.location.href = '?f=MPMCOFL&codigo=' + codigo;
                }
            });

            $('a.toggle-vis').on('click', function (e) {
                e.preventDefault();
                var column = $('#tblLISTA').DataTable().column($(this).attr('data-column'));
                column.visible(!column.visible());
            });

            $('#tblLISTA tbody').on('click', 'a', function () {
                $(this).parent().parent().addClass('selected');
                var pos = $('#tblLISTA').DataTable().row($(this).parent().parent()).index();
                var row = $('#tblLISTA').DataTable().row(pos).data();
                var code = row.CODIGO;

                Bloquear("ventana");
                $.ajaxSetup({ async: false });
                $.post("vistas/MP/ajax/MPMCOFL.ashx", { OPCION: 'AE', CODIGO: code, USUA_ID: $('#ctl00_txtus').val() },
                    function (res) {
                        if (res != null) {
                            if (res == "I") res = "INACTIVO";
                            else res = "ACTIVO";
                            $('#tblLISTA').DataTable().cell(pos, 5).data(res).draw();
                            exito();
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    });
                $.ajaxSetup({ async: true });
            });
        }).error(function (msg) {
            alertCustom('Error al listar controles.');
        });
    };

    var eventoControles = function () {
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
        });

        $('#cboSucursal').change(function () {
            $('#tblLISTA').DataTable().column(8).search($(this).val()).draw();
        });
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            eventoControles();
            listarDataTable();
        }
    };
}();

var MPMCOFL = function () {

    var plugins = function () {
        $('select').select2();
        $('#txtFechaInicio, #txtFechaFin').datepicker({ format: 'dd/mm/yyyy' });
        $('#txtFechaInicio').datepicker().change(function () {
            $('#txtFechaFin').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtFechaFin').val().split("/").reverse().join(""))) ? "" : $('#txtFechaFin').val());
            $('#txtFechaFin').datepicker('setStartDate', $(this).val());
        });

        $('#txtFechaFin').datepicker().change(function () {
            if ($('#txtFechaInicio').val() !== "") {
                $('#txtFechaFin').datepicker('setStartDate', $('#txtFechaInicio').val());
            }
        });
    };

    var cargarOrdenesFlujo = function () {
        $('#tblOrdenes').DataTable().destroy();
        $('#tblOrdenes tbody').html('').unbind('click');
        $.ajax({
            type: "post",
            url: 'vistas/MP/ajax/MPMCOFL.ashx',
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            data: { OPCION: 'LISTAR_ORDENES', CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val() },
            success: function (data) {
                var parms;
                if (data !== null) {
                    parms = {
                        data: data,
                        responsive: true,
                        columns: [
                            {
                                data: "CODIGO",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "PRODUCTO",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "TOTAL",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "UNIDAD_MEDIDA",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "FASE",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            }
                        ]
                    };
                } else {
                    parms = { responsive: true };
                }
                var tabla = $('#tblOrdenes').DataTable(parms);
                $('#tblOrdenes').removeAttr('style');

                $('#tblOrdenes tbody').on('click', 'tr', function () {
                    var flota = tabla.row(this).data();
                    $('#txtCodigoOrdenFlujo').val(flota.CODIGO);
                    $('#txtOrdenFlujo').val(flota.TOTAL + ' ' + flota.UNIDAD_MEDIDA + ' DE ' + flota.PRODUCTO);
                    $('#divBuscarOrden').modal('hide');
                });
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarFlotas = function () {
        $('#tblFlotas').DataTable().destroy();
        $('#tblFlotas tbody').html('').unbind('click');
        $.ajax({
            type: "post",
            url: 'vistas/MP/ajax/MPMCOFL.ashx',
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            data: { OPCION: 'LISTAR_FLOTAS', CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val() },
            success: function (data) {
                var parms;
                if (data !== null) {
                    parms = {
                        data: data,
                        responsive: true,
                        columns: [
                            {
                                data: "CODIGO",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "BIEN",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "SERIE",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            }
                        ]
                    };
                } else {
                    parms = { responsive: true };
                }
                var tabla = $('#tblFlotas').DataTable(parms);
                $('#tblFlotas').removeAttr('style');

                $('#tblFlotas tbody').on('click', 'tr', function () {
                    var flota = tabla.row(this).data();
                    $('#txtCodigoFlota').val(flota.CODIGO);
                    $('#txtFlota').val(flota.BIEN + ' SERIE ' + flota.SERIE);
                    $('#divBuscarFlota').modal('hide');
                });
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            $('#txtCodigoOrdenFlujo, #txtOrdenFlujo, #txtCodigoFlota, #txtFlota').val('');
        });

        $('#cboSucursal').change(function () {
            $('#txtCodigoOrdenFlujo, #txtOrdenFlujo, #txtCodigoFlota, #txtFlota').val('');
        });

        $('#btnBuscarOrdenFlujo').click(function () {
            cargarOrdenesFlujo();
            $('#divBuscarOrden').modal('show');
        });

        $('#btnBuscarFlota').click(function () {
            cargarFlotas();
            $('#divBuscarFlota').modal('show');
        });
    };

    var cargar = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMCOFL.ashx',
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                data: { OPCION: 'S', CODIGO: codigo, CTLG_CODE: '', SCSL_CODE: '', ORFL_CODE: '', ACFI_CODE: '' }
            }).success(function (data) {
                if (data !== null) {
                    $('#txtCodigo').val(data[0].CODIGO);
                    $('#cboEmpresa').select2('val', data[0].CTLG_CODE).change();
                    $('#cboSucursal').select2('val', data[0].SCSL_CODE).change();
                    if (data[0].ESTADO === 'INACTIVO') {
                        $('#chkEstado').prop('checked', false).parent().removeClass('checked');
                    }
                    $('#txtCodigoOrdenFlujo').val(data[0].ORFL_CODE);
                    $('#txtOrdenFlujo').val(data[0].ORDEN_FLUJO);
                    $('#txtCodigoFlota').val(data[0].ACFI_CODE);
                    $('#txtFlota').val(data[0].ACTIVO);
                    $('#txtFechaInicio').datepicker('setDate', data[0].FECHA_INICIO);
                    $('#txtFechaFin').datepicker('setDate', data[0].FECHA_FIN);
                    $('#chkEstado').prop('disabled', false);
                    $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                }
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al cargar datos de Administración de Flota.');
                Desbloquear('ventana');
            });
        }
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            eventos();
            cargar();
        }
    };
}();

var cargarEmpresas = function () {
    var select = $('#cboEmpresa');
    $.ajax({
        type: "post",
        url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {
            $(select).html('<option></option>');
            for (var i = 0; i < data.length; i++) {
                $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
            }
        },
        error: function (msg) {
            alertCustom('Error al listar Empresas.');
        }
    });
};

var cargarSucursales = function () {
    var select = $('#cboSucursal');
    $.ajax({
        type: "post",
        url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {
            $(select).html('<option></option>');
            for (var i = 0; i < data.length; i++) {
                $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
            }
        },
        error: function (msg) {
            alertCustom('Error al listar Sucursales.');
        }
    });
};

var Grabar = function () {
    if (vErrors(['cboEmpresa', 'cboSucursal', 'txtCodigoOrdenFlujo', 'txtCodigoOrdenFlujo', 'txtOrdenFlujo', 'txtFlota', 'txtFechaInicio', 'txtFechaFin'])) {
        Bloquear('ventana');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCOFL.ashx',
            async: false,
            data: {
                OPCION: 'G', CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(),
                ORFL_CODE: $('#txtCodigoOrdenFlujo').val(), ORDEN_FLUJO: $('#txtOrdenFlujo').val(),
                ACFI_CODE: $('#txtCodigoFlota').val(), ACTIVO: $('#txtFlota').val(),
                FECHA_INICIO: $('#txtFechaInicio').val(), FECHA_FIN: $('#txtFechaFin').val(),
                USUA_ID: $('#ctl00_txtus').val()
            }
        }).done(function (data) {
            if (data !== '000000' && data !== null) {
                exito();
                $('#txtCodigo').val(data);
                $('#chkEstado').prop('disabled', false);
                $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                window.history.pushState("Object", "Administración de Flotas", "/Default.aspx?f=MPMCOFL&codigo=" + data);
            } else {
                alertCustom('Flota reservada actualmente, no puede ser asignada.');
            }
            Desbloquear('ventana');
        }).error(function (msg) {
            alertCustom('Error al intentar grabar nueva asignación de flota.');
            Desbloquear('ventana');
        });
    }
};

var Actualizar = function () {
    if (vErrors(['cboEmpresa', 'cboSucursal', 'txtCodigoOrdenFlujo', 'txtCodigoOrdenFlujo', 'txtOrdenFlujo', 'txtFlota', 'txtFechaInicio', 'txtFechaFin'])) {
        Bloquear('ventana');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCOFL.ashx',
            async: false,
            data: {
                OPCION: 'A', CODIGO: $('#txtCodigo').val(),
                CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(),
                ORFL_CODE: $('#txtCodigoOrdenFlujo').val(), ORDEN_FLUJO: $('#txtOrdenFlujo').val(),
                ACFI_CODE: $('#txtCodigoFlota').val(), ACTIVO: $('#txtFlota').val(),
                FECHA_INICIO: $('#txtFechaInicio').val(), FECHA_FIN: $('#txtFechaFin').val(),
                ESTADO: $('#chkEstado').is(':checked') ? 'A' : 'I', USUA_ID: $('#ctl00_txtus').val()
            }
        }).done(function (data) {
            if (data === 'OK') {
                exito();
            }
            Desbloquear('ventana');
        }).error(function (msg) {
            alertCustom('Error al intentar grabar nueva asignación de flota.');
            Desbloquear('ventana');
        });
    }
};
var tabla_detalles;

var MPLCORE = function () {

    var plugins = function () {
        $('select').select2();
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            $('#tblLISTA').DataTable().column(8).search($(this).val()).draw();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
        });

        $('#cboSucursal').change(function () {
            $('#tblLISTA').DataTable().column(9).search($(this).val()).draw();
        });
    };

    var listarConfiguraciones = function () {
        $('#tblLISTA').DataTable({
            ajax: {
                type: "post",
                url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=S",
                cache: false,
                datatype: "json",
                async: false,
                data: { CODIGO: '' },
                dataSrc: ''
            },
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            info: false,
            scrollX: true,
            order: [[1, 'desc']],
            columns: [
                {
                    data: 'COMPLETO_IND', createdCell: function (cell, cellData) {
                        var color = (cellData === 'S') ? 'green' : 'red';
                        var html = (cellData === 'S') ? '<i class="icon-ok"></i>' : '<i class="icon-pushpin"></i>';
                        $(cell).css('text-align', 'center').html(html).css('color', color);
                    }, width: '5%'
                },
                {
                    data: 'CODIGO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                { data: 'ORFAB_CODE', visible: false },
                {
                    data: 'ORFAB_NRO_ORDEN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                { data: 'ORFAB_DESC', width: '25%' },
                {
                    data: 'INICIO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                {
                    data: 'LIMITE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                {
                    data: 'ESTADO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                { data: 'CTLG_CODE', visible: false },
                { data: 'SCSL_CODE', visible: false }
            ]
        });

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">NRO O.F.</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">ORDEN DE FABRICACION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">FECHA INICIAL</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">FECHA LIMITE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="6" href="#">ESTADO</a>\
                    </div>');

        $('#tblLISTA tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var pos = $('#tblLISTA').DataTable().row(this).index();
                var row = $('#tblLISTA').DataTable().row(pos).data();
                var codigo = row.CODIGO;
                window.location.href = '?f=MPMCORE&codigo=' + codigo;
            }
        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblLISTA').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });
    };

    return {
        init: function () {
            plugins();
            eventos();
            listarConfiguraciones();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
        }
    };
}();

var MPMCORE = function () {

    var plugins = function () {
        $('select').select2();
        $('#tblOrdenes, #tblInsumos, #tblEmpleados, #tblSecciones, #tblActivos, #tblConceptos').DataTable({ resposive: true, info: false });
        $('#tblInsumos').DataTable().columns([0, 1, 4, 6, 14]).visible(false);
        $('#tblConceptos').DataTable().columns([0, 3]).visible(false);
        $('#tblOrdenes, #tblInsumos, #tblEmpleados, #tblSecciones, #tblActivos, #tblConceptos').removeAttr('style');
        $('#txtFechaInicioEMPL, #txtFechaLimiteEMPL, #txtFechaInicioACFI, #txtFechaLimiteACFI, #txtFechaInicioSECC, #txtFechaLimiteSECC').datepicker({ format: 'dd/mm/yyyy' });
        $('#txtEmision, #txtTransaccion').datepicker({ format: 'dd/mm/yyyy' });
        $('#txtEmision, #txtTransaccion').datepicker('setDate', 'now');
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            $('#cboEmpresaReq, #cboEmpresaSalida').select2('val', $(this).val());
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
        });

        $('#cboSucursal').change(function () {
            $('#cboSucursalReq').select2('val', $(this).val());
            $('#cboAlmacen').select2('val', $('#cboSucursal :selected').attr('data-almc-code'));
        });

        $('#tblOrdenes tbody').on('click', 'tr', function () {
            $(this).addClass('selected');
            Bloquear('divBuscarOrden');
            var orden = $('#tblOrdenes').DataTable().row(this).data();
            setTimeout(function () {
                $('#txtCodigoOrdenFabricacion').val(orden.CODIGO);
                $('#txtNroOrdenFabricacion').val(orden.NRO_ORDEN);
                $('#lblNroOrdenFabricacion, #lblNroOrdenFabricacion2').text(orden.NRO_ORDEN);
                $('#txtNroOrigen').val(orden.NRO_ORDEN);
                $('#txtOrdenFabricacion').val(orden.CANTIDAD_TOTAL + ' ' + orden.UNIDAD_MEDIDA + ' DE ' + orden.PRODUCTO);
                $('#txtCodigoProducto').val(orden.PROD_CODE);
                $('#txtCantidadOrden').val(orden.CANTIDAD_TOTAL);
                $('#txtFechaInicioOrden').val(orden.FECHA_INICIO);
                $('#txtFechaLimiteOrden').val(orden.FECHA_FIN);
                cargarDatosFormulacion();
                calcularCostoTotal();
                Desbloquear('divBuscarOrden');
                $('#divBuscarOrden').modal('hide');
            }, 50);
        });

        $('#btnBuscarOrdenFabricacion').click(function () {
            $('#tblOrdenes').DataTable().destroy();
            Bloquear('ventana');
            setTimeout(function () {
                $.ajax({
                    type: 'post',
                    url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=LISTAR_ORDEN_FABRICACION',
                    async: false,
                    cache: false,
                    data: { CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val() }
                }).done(function (data) {
                    data = (data === null) ? [] : data;
                    $('#tblOrdenes').DataTable({
                        data: data,
                        responsive: true,
                        order: [[0, 'desc']],
                        info: false,
                        columns: [
                            { data: 'CODIGO', visible: false },
                            { data: 'NRO_ORDEN', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                            { data: 'PROD_CODE', visible: false },
                            { data: 'PRODUCTO', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                            { data: 'CANTIDAD_TOTAL', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                            { data: 'UNIDAD_MEDIDA', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                            { data: 'RESPONSABLE' },
                            { data: 'FECHA_INICIO', visible: false },
                            { data: 'FECHA_FIN', visible: false }
                        ]
                    });
                    Desbloquear('ventana');
                    $('#divBuscarOrden').modal('show');
                }).fail(function (msg) {
                    alertCustom('Error al listar Productos terminados.');
                    Desbloquear('ventana');
                });
            }, 50);
        });

        $('#btnAgregarPROD').click(function () {
            if (vErrors(['txtInsumo', 'txtCantPROD', 'cboUMPROD', 'txtMermaPROD'])) {
                var codigo = ObtenerQueryString('codigo');
                if (codigo !== undefined) {
                    if (!insumoAgregado($('#txtPROD_CODE_ANTIGUO').val())) {
                        Bloquear('ventana');
                        $.ajax({
                            type: "post",
                            url: 'vistas/MP/ajax/MPMCORE.ashx',
                            contenttype: "application/json;",
                            datatype: "json",
                            async: false,
                            data: {
                                OPCION: 'CREAR_DETALLE', CODIGO: codigo, PROD_CODE: $('#txtPROD_CODE').val(), CANTIDAD: $('#txtCantPROD').val(),
                                UNME_CODE: $('#cboUMPROD').val(), MERMAS: $('#txtMermaPROD').val(),
                                COSTO_MN: (parseFloat($('#txtCostoMNPROD').val()) * parseFloat($('#txtCantPROD').val())).toFixed(8).toString(),
                                COSTO_ME: (parseFloat($('#txtCostoMEPROD').val()) * parseFloat($('#txtCantPROD').val())).toFixed(8).toString()
                            }
                        }).done(function (data) {
                            exito();
                            listarDetalles();
                            listarInsumos();
                            $('#btnCompletar, #btnRequerimiento, #btnSalidaProduccion').addClass('hidden');
                            btnRequerimiento();
                            btnSalidaProduccion();
                            btnCompletar();
                            $('#txtPROD_CODE, #txtInsumo, #txtCantPROD, #txtMermaPROD').val('');
                            $('#cboUMPROD').select2('val', '');
                            Desbloquear('ventana');
                        }).fail(function (msg) {
                            Desbloquear('ventana');
                        });
                    } else {
                        alertCustom('Insumo ya agregado en la lista.');
                    }
                } else {
                    if ($('#txtCodigoOrdenFabricacion').val() !== '') {
                        if (!insumoAgregado($('#txtPROD_CODE_ANTIGUO').val())) {
                            var data = $('#tblInsumos').DataTable().data().toArray();
                            data.push({
                                MANC_CODE: '', MANC_CANTIDAD: '', PROD_CODE: $('#txtPROD_CODE').val(), CODIGO: $('#txtPROD_CODE_ANTIGUO').val(),
                                INSUMO: $('#txtInsumo').val(), NOMBRE_COMERCIAL: $('#txtNombreComercial').val(), CANTIDAD: $('#txtCantPROD').val(),
                                UNME_CODE: $('#cboUMPROD').val(), UNIDAD_MEDIDA: $('#cboUMPROD :selected').text(), MERMA: $('#txtMermaPROD').val(),
                                COSTO_MN: (parseFloat($('#txtCostoMNPROD').val()) * parseFloat($('#txtCantPROD').val())).toFixed(8).toString(),
                                COSTO_ME: (parseFloat($('#txtCostoMEPROD').val()) * parseFloat($('#txtCantPROD').val())).toFixed(8).toString(),
                                STOCK: $('#txtPROD_STOCK').val(), ESTADO: 'I', DETALLE_RECETA: '0'
                            });
                            $('#txtPROD_CODE, #txtInsumo, #txtCantPROD, #txtMermaPROD').val('');
                            $('#cboUMPROD').select2('val', '');
                            dataTableInsumos(data);
                            exito();
                        } else {
                            alertCustom('Insumo ya agregado en la lista.');
                        }
                    } else {
                        alertCustom('Por favor, seleccione una Orden de Fabricación.');
                    }
                }
                calcularCostoTotal();
            }
        });

        $('#btnAgregarEMPL').click(function () {
            if (vErrors(['txtEmpleado', 'txtActividadEMPL', 'txtHorasEMPL', 'txtFechaInicioEMPL', 'txtFechaLimiteEMPL'])) {
                var horas = parseFloat($('#txtHorasEMPL').val());
                var codigo = ObtenerQueryString('codigo');
                var dias = Math.abs($('#txtFechaLimiteEMPL').datepicker('getDate').getTime() - $('#txtFechaInicioEMPL').datepicker('getDate').getTime());
                dias = Math.ceil(dias / (1000 * 3600 * 24)) + 1;
                if (codigo !== undefined) {
                    if (!empleadoAgregado($('#txtEMPL_CODE').val())) {
                        Bloquear('ventana');
                        $.ajax({
                            type: "post",
                            url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=CREAR_DETALLE',
                            contenttype: "application/json;",
                            datatype: "json",
                            async: false,
                            data: {
                                CODIGO: codigo, EMPL_CODE: $('#txtEMPL_CODE').val(), ACTIVIDAD: $('#txtActividadEMPL').val(),
                                HORAS: $('#txtHorasEMPL').val(), INICIO: $('#txtFechaInicioEMPL').val(), LIMITE: $('#txtFechaLimiteEMPL').val(),
                                COSTO_MN: (parseFloat($('#txtCostoMNEMPL').val()) * horas * dias),
                                COSTO_ME: (parseFloat($('#txtCostoMEEMPL').val()) * horas * dias)
                            }
                        }).done(function (data) {
                            exito();
                            listarDetalles();
                            listarEmpleados();
                            $('#txtEMPL_CODE, #txtEmpleado, #txtActividadEMPL, #txtHorasEMPL').val('');
                            $('#txtFechaInicioEMPL, #txtFechaLimiteEMPL').datepicker('update', '');
                            Desbloquear('ventana');
                        }).fail(function (msg) {
                            Desbloquear('ventana');
                        });
                    } else {
                        alertCustom('Empleado ya agregado en la lista.');
                    }
                } else {
                    if ($('#txtCodigoOrdenFabricacion').val() !== '') {
                        if (!empleadoAgregado($('#txtEMPL_CODE').val())) {
                            var data = $('#tblEmpleados').DataTable().data().toArray();
                            $('#tblEmpleados').DataTable().destroy();
                            data.push({
                                EMPL_CODE: $('#txtEMPL_CODE').val(), EMPLEADO: $('#txtEmpleado').val(), ACTIVIDAD: $('#txtActividadEMPL').val(),
                                HORAS: $('#txtHorasEMPL').val(), INICIO: $('#txtFechaInicioEMPL').val(), LIMITE: $('#txtFechaLimiteEMPL').val(),
                                COSTO_MN: (parseFloat($('#txtCostoMNEMPL').val()) * horas * dias),
                                COSTO_ME: (parseFloat($('#txtCostoMEEMPL').val()) * horas * dias)
                            });
                            $('#tblEmpleados').DataTable({
                                info: false, responsive: true,
                                data: data,
                                order: [[0, 'desc']],
                                columns: [
                                    {
                                        data: 'EMPL_CODE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                            $(cell).css('text-align', 'center');
                                        }, width: '10%'
                                    },
                                    { data: 'EMPLEADO' },
                                    { data: 'ACTIVIDAD' },
                                    {
                                        data: 'HORAS', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                            $(cell).css('text-align', 'center');
                                        }, width: '10%'
                                    },
                                    {
                                        data: 'INICIO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                            $(cell).css('text-align', 'center');
                                        }, width: '12%'
                                    },
                                    {
                                        data: 'LIMITE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                            $(cell).css('text-align', 'center');
                                        }, width: '12%'
                                    },
                                    {
                                        data: 'COSTO_MN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                            $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                                        }, width: '12%'
                                    },
                                    {
                                        data: 'COSTO_ME', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                            $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                                        }, width: '12%'
                                    },
                                    {
                                        data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%'
                                    }
                                ]
                            });
                            exito();
                            $('#txtEMPL_CODE, #txtEmpleado, #txtActividadEMPL, #txtHorasEMPL').val('');
                            $('#txtFechaInicioEMPL, #txtFechaLimiteEMPL').datepicker('update', '');
                        } else {
                            alertCustom('Empleado ya agregado en la lista.');
                        }
                    } else {
                        alertCustom('Por favor, seleccione una Orden de Fabricación.');
                    }
                }
                calcularCostoTotal();
            }
        });

        $('#btnAgregarSECC').click(function () {
            if (vErrors(['cboSeccion', 'txtFechaInicioSECC', 'txtFechaLimiteSECC'])) {
                var codigo = ObtenerQueryString('codigo');
                var dias = Math.abs($('#txtFechaLimiteSECC').datepicker('getDate').getTime() - $('#txtFechaInicioSECC').datepicker('getDate').getTime());
                dias = Math.ceil(dias / (1000 * 3600 * 24)) + 1;
                if (codigo !== undefined) {
                    if (!seccionAgregada($('#cboSeccion').val())) {
                        Bloquear('ventana');
                        $.ajax({
                            type: "post",
                            url: 'vistas/MP/ajax/MPMCORE.ashx',
                            contenttype: "application/json;",
                            datatype: "json",
                            async: false,
                            data: {
                                OPCION: 'CREAR_DETALLE', CODIGO: codigo, SECC_CODE: $('#cboSeccion').val(), CANTIDAD: $('#txtCantSECC').val(),
                                INICIO: $('#txtFechaInicioSECC').val(), LIMITE: $('#txtFechaLimiteSECC').val(),
                                COSTO_MN: (parseFloat($('#cboSeccion :selected').attr('data-costo-mn')) * dias),
                                COSTO_ME: (parseFloat($('#cboSeccion :selected').attr('data-costo-me')) * dias)
                            }
                        }).done(function (data) {
                            exito();
                            listarDetalles();
                            listarSecciones();
                            $('#cboSeccion').select2('val', '');
                            $('#txtFechaInicioSECC, #txtFechaLimiteSECC').datepicker('update', '');
                            Desbloquear('ventana');
                        }).fail(function (msg) {
                            Desbloquear('ventana');
                        });
                    } else {
                        alertCustom('Sección de Almacén ya agregada en la lista.');
                    }
                } else {
                    if (!seccionAgregada($('#cboSeccion').val())) {
                        var data = $('#tblSecciones').DataTable().data().toArray();
                        $('#tblSecciones').DataTable().destroy();
                        data.push({
                            SECC_CODE: $('#cboSeccion').val(), SECCION: $('#cboSeccion :selected').text(), CANTIDAD: $('#txtCantSECC').val(),
                            INICIO: $('#txtFechaInicioSECC').val(), LIMITE: $('#txtFechaLimiteSECC').val(),
                            COSTO_MN: (parseFloat($('#cboSeccion :selected').attr('data-costo-mn')) * dias),
                            COSTO_ME: (parseFloat($('#cboSeccion :selected').attr('data-costo-me')) * dias)
                        });
                        $('#tblSecciones').DataTable({
                            info: false, responsive: true,
                            data: data,
                            order: [[0, 'desc']],
                            columns: [
                                {
                                    data: 'SECC_CODE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center');
                                    }, width: '10%'
                                },
                                { data: 'SECCION' },
                                {
                                    data: 'INICIO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center');
                                    }, width: '12%'
                                },
                                {
                                    data: 'LIMITE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center');
                                    }, width: '12%'
                                },
                                {
                                    data: 'COSTO_MN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                                    }, width: '12%'
                                },
                                {
                                    data: 'COSTO_ME', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                                    }, width: '12%'
                                },
                                { data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%' }
                            ]
                        });
                        exito();
                        $('#cboSeccion').select2('val', '');
                        $('#txtFechaInicioSECC, #txtFechaLimiteSECC').datepicker('update', '');
                    } else {
                        alertCustom('Sección de Almacén ya agregada en la lista.');
                    }
                }
                calcularCostoTotal();
            }
        });

        $('#btnAgregarACFI').click(function () {
            if (vErrors(['txtActivoFijo', 'txtActividadACFI', 'txtFechaInicioACFI', 'txtFechaLimiteACFI'])) {
                var dias = Math.abs($('#txtFechaLimiteACFI').datepicker('getDate').getTime() - $('#txtFechaInicioACFI').datepicker('getDate').getTime()) + 1;
                dias = Math.ceil(dias / (1000 * 3600 * 24));
                var codigo = ObtenerQueryString('codigo');
                if (codigo !== undefined) {
                    if (!activoAgregado($('#txtACFI_CODE').val())) {
                        Bloquear('ventana');
                        $.ajax({
                            type: "post",
                            url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=CREAR_DETALLE',
                            contenttype: "application/json;",
                            datatype: "json",
                            async: false,
                            data: {
                                CODIGO: codigo, ACFI_CODE: $('#txtACFI_CODE').val(), ACTIVIDAD: $('#txtActividadACFI').val(),
                                CANTIDAD: $('#txtCantACFI').val(), INICIO: $('#txtFechaInicioACFI').val(), LIMITE: $('#txtFechaLimiteACFI').val(),
                                COSTO_MN: (parseFloat($('#txtCostoMNACFI').val()) * dias).toFixed(8).toString(),
                                COSTO_ME: (parseFloat($('#txtCostoMEACFI').val()) * dias).toFixed(8).toString()
                            }
                        }).done(function (data) {
                            exito();
                            listarDetalles();
                            listarActivos();
                            $('#txtACFI_CODE, #txtActivoFijo, #txtActividadACFI, #txtCostoMNACFI, #txtCostoMEACFI').val('');
                            $('#txtFechaInicioACFI, #txtFechaLimiteACFI').datepicker('update', '');
                            Desbloquear('ventana');
                        }).fail(function (msg) {
                            Desbloquear('ventana');
                        });
                    } else {
                        alertCustom('Activo Fijo ya agregado en la lista.');
                    }
                } else {
                    if (!activoAgregado($('#txtACFI_CODE').val())) {
                        var data = $('#tblActivos').DataTable().data().toArray();
                        $('#tblActivos').DataTable().destroy();
                        data.push({
                            ACFI_CODE: $('#txtACFI_CODE').val(), ACTIVO: $('#txtActivoFijo').val(), ACTIVIDAD: $('#txtActividadACFI').val(),
                            CANTIDAD: $('#txtCantACFI').val(), INICIO: $('#txtFechaInicioACFI').val(), LIMITE: $('#txtFechaLimiteACFI').val(),
                            COSTO_MN: parseFloat($('#txtCostoMNACFI').val() * dias).toFixed(8),
                            COSTO_ME: (parseFloat($('#txtCostoMEACFI').val()) * dias).toFixed(8)
                        });
                        $('#tblActivos').DataTable({
                            info: false, responsive: true,
                            data: data,
                            order: [[0, 'desc']],
                            columns: [
                                { data: 'ACFI_CODE', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '10%' },
                                { data: 'ACTIVO' },
                                { data: 'ACTIVIDAD' },
                                { data: 'INICIO', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '12%' },
                                { data: 'LIMITE', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '12%' },
                                { data: 'COSTO_MN', createdCell: function (cell, cellData) { $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2)); }, width: '12%' },
                                { data: 'COSTO_ME', createdCell: function (cell, cellData) { $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2)); }, width: '12%' },
                                { data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%' }
                            ]
                        });
                        exito();
                        $('#txtACFI_CODE, #txtActivoFijo, #txtActividadACFI, #txtCostoMNACFI, #txtCostoMEACFI').val('');
                        $('#txtFechaInicioACFI, #txtFechaLimiteACFI').datepicker('update', '');
                    } else {
                        alertCustom('Activo Fijo ya agregado en la lista.');
                    }
                }
                calcularCostoTotal();
            }
        });

        $('#btnAgregarCOEN').click(function () {
            if (vErrors(['cboConcepto', 'txtCantCOEN', 'cboUMCOEN'])) {
                var codigo = ObtenerQueryString('codigo');
                if (codigo !== undefined) {
                    if (!conceptoAgregado($('#cboConcepto').val())) {
                        Bloquear('ventana');
                        $.ajax({
                            type: "post",
                            url: 'vistas/MP/ajax/MPMCORE.ashx',
                            contenttype: "application/json;",
                            datatype: "json",
                            async: false,
                            data: {
                                OPCION: 'CREAR_DETALLE', CODIGO: codigo, COEN_CODE: $('#cboConcepto').val(), CANTIDAD: $('#txtCantCOEN').val(),
                                UNME_CODE: $('#cboUMCOEN').val(), UNIDAD_MEDIDA: $('#cboUMCOEN :selected').text(),
                                COSTO_MN: parseFloat($('#cboConcepto :selected').attr('data-costo-mn')) * parseFloat($('#txtCantCOEN').val()),
                                COSTO_ME: parseFloat($('#cboConcepto :selected').attr('data-costo-me')) * parseFloat($('#txtCantCOEN').val())
                            }
                        }).done(function (data) {
                            exito();
                            listarDetalles();
                            listarConceptos();
                            $('#cboConcepto').select2('val', '').change();
                            $('#cboUMCOEN').select2('val', '');
                            $('#txtCantCOEN').val('');
                            Desbloquear('ventana');
                        }).fail(function () {
                            Desbloquear('ventana');
                        });
                    } else {
                        alertCustom('Concepto Energético ya agregado en la lista.');
                    }
                } else {
                    if (!conceptoAgregado($('#cboConcepto').val())) {
                        var data = $('#tblConceptos').DataTable().data().toArray();
                        $('#tblConceptos').DataTable().destroy();
                        data.push({
                            COEN_CODE: $('#cboConcepto').val(), CONCEPTO: $('#cboConcepto :selected').text(), CANTIDAD: $('#txtCantCOEN').val(),
                            UNME_CODE: $('#cboUMCOEN').val(), UNIDAD_MEDIDA: $('#cboUMCOEN :selected').text(),
                            COSTO_MN: parseFloat($('#cboConcepto :selected').attr('data-costo-mn')) * parseFloat($('#txtCantCOEN').val()),
                            COSTO_ME: parseFloat($('#cboConcepto :selected').attr('data-costo-me')) * parseFloat($('#txtCantCOEN').val())
                        });
                        $('#tblConceptos').DataTable({
                            info: false, responsive: true,
                            data: data,
                            order: [[0, 'desc']],
                            columns: [
                                {
                                    data: 'COEN_CODE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center');
                                    }, width: '10%'
                                },
                                {
                                    data: 'CONCEPTO'
                                },
                                {
                                    data: 'CANTIDAD', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center');
                                    }
                                },
                                {
                                    data: 'UNME_CODE', visible: false
                                },
                                {
                                    data: 'UNIDAD_MEDIDA', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center');
                                    }, width: '12%'
                                },
                                {
                                    data: 'COSTO_MN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                                    }, width: '12%'
                                },
                                {
                                    data: 'COSTO_ME', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                                    }, width: '12%'
                                },
                                {
                                    data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%'
                                }
                            ]
                        });
                        exito();
                        $('#cboConcepto').select2('val', '').change();
                        $('#cboUMCOEN').select2('val', '');
                        $('#txtCantCOEN').val('');
                    } else {
                        alertCustom('Concepto Energético ya agregado en la lista.');
                    }
                }
                calcularCostoTotal();
            }
        });

        $('#cboNivel1').change(function () {
            cargarNivelCC($('#cboNivel1 :selected').attr('cecc-code'), $(this).val(), 2, $('#cboNivel2'));
            $('#cboNivel2').select2('destroy').select2();
            $('#cboNivel3, #cboNivel4').html('').select2('destroy').select2();
        });

        $('#cboNivel2').change(function () {
            cargarNivelCC($('#cboNivel2 :selected').attr('cecc-code'), $(this).val(), 3, $('#cboNivel3'));
            $('#cboNivel3').select2('destroy').select2();
            $('#cboNivel4').html('').select2('destroy').select2();
        });

        $('#cboNivel3').change(function () {
            cargarNivelCC($('#cboNivel3 :selected').attr('cecc-code'), $(this).val(), 4, $('#cboNivel4'));
            $('#cboNivel4').select2('destroy').select2();
        });

        $('#tblInsumos tbody').on('click', 'a', function () {
            eliminarInsumo($(this).parents('tr'));
            $('#btnCompletar, #btnRequerimiento, #btnSalidaProduccion').addClass('hidden');
            btnRequerimiento();
            btnSalidaProduccion();
            btnCompletar();
        });

        $('#btnRequerimiento').click(function () {
            cargarCentroCostos();
            var insumos = $('#tblInsumos').DataTable().data().toArray();
            var insumos_req = [];
            for (var i = 0; i < insumos.length; i++) {
                if (insumos[i].ESTADO === 'I' && parseFloat(insumos[i].STOCK) < parseFloat(insumos[i].CANTIDAD)) {
                    var insumo = insumos[i];
                    insumo.PEDIR = (insumo.CANTIDAD - insumo.STOCK).toString();
                    insumos_req.push(insumo);
                }
            }
            $('#tblRequerimiento').DataTable().destroy();
            $('#tblRequerimiento').DataTable({
                info: false, responsive: true,
                data: insumos_req,
                order: [[0, 'desc']],
                columns: [
                    { data: 'PROD_CODE', visible: false },
                    {
                        data: 'CODIGO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '10%'
                    },
                    { data: 'INSUMO', width: '30%' },
                    {
                        data: 'PEDIR', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '15%'
                    },
                    { data: 'UNME_CODE', visible: false },
                    {
                        data: 'UNIDAD_MEDIDA', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '25%'
                    },
                    {
                        data: null, defaultContent: new Date().toLocaleDateString(), createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '15%'
                    },
                    { data: 'DETALLE_RECETA', visible: false }
                ]
            });
            $('#divRequerimiento').modal('show');
        });

        $('#btnSalidaProduccion').click(function () {
            var insumos = $('#tblInsumos').DataTable().data().toArray();
            var insumos_sal = [];
            var item = 0;
            for (var i = 0; i < insumos.length; i++) {
                if ((insumos[i].ESTADO === 'I' || insumos[i].ESTADO === 'C') && parseFloat(insumos[i].STOCK) > parseFloat(insumos[i].CANTIDAD)) {
                    var insumo = insumos[i];
                    insumo.ITEM = (++item).toString();
                    insumos_sal.push(insumo);
                }
            }
            cargarCorrelativo();
            $('#tblSalida').DataTable().destroy();
            $('#tblSalida').DataTable({
                info: false, responsive: true,
                data: insumos_sal,
                order: [[0, 'asc']],
                columns: [
                    { data: 'PROD_CODE', visible: false },
                    {
                        data: 'ITEM', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '10%'
                    },
                    {
                        data: 'CODIGO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '10%'
                    },
                    { data: 'INSUMO', width: '35%' },
                    {
                        data: 'CANTIDAD', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '12%'
                    },
                    { data: 'UNME_CODE', visible: false },
                    {
                        data: 'UNIDAD_MEDIDA', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }, width: '15%'
                    },
                    {
                        data: 'COSTO_MN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                        }, width: '15%'
                    },
                    {
                        data: 'COSTO_ME', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                        }, width: '15%'
                    },
                    { data: 'DETALLE_RECETA', visible: false }
                ]
            });
            $('#divSalidaProduccion').modal('show');
        });

        $('#tblEmpleados tbody').on('click', 'a', function () {
            eliminarEmpleado($(this).parents('tr'));
        });

        $('#tblSecciones tbody').on('click', 'a', function () {
            eliminarSeccion($(this).parents('tr'));
        });

        $('#tblActivos tbody').on('click', 'a', function () {
            eliminarActivo($(this).parents('tr'));
        });

        $('#tblConceptos tbody').on('click', 'a', function () {
            eliminarConcepto($(this).parents('tr'));
        });

        $('#btnNuevoRequerimiento').click(function () {
            if (vErrors(['txtFechaReq', 'txtSolicitanteReq', 'cboNivel1', 'cboNivel2', 'cboNivel3', 'cboNivel4'])) {
                Bloquear('divRequerimiento');
                $('#btnNuevoRequerimiento').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Generando Nuevo Requerimiento');
                setTimeout(function () {
                    $.ajax({
                        type: "POST",
                        url: "vistas/MP/ajax/MPMCORE.ashx",
                        cache: false,
                        async: false,
                        data: {
                            OPCION: 'SOLICITUD_COMPRA', p_SOLICITA: $('#ctl00_txtus').val(), p_FECHA: $('#txtFechaReq').val(), p_PRIORIDAD: $('#cbPrioridadReq').val(), p_TIPOREQ: $('#cboTipoReq').val(),
                            p_AREA1: $('#cboNivel1').val(), p_SECCION1: $('#cboNivel2').val(), p_PROCESO1: $('#cboNivel3').val(), p_ACTIVIDAD: $('#cboNivel4').val(), p_GLOSA: $('#lblGlosa').text(),
                            p_CATALOGO: $("#cboEmpresaReq").val(), p_ESTABLECIMIENTO: $("#cboSucursalReq").val(), p_detalle: datosTablaReq(), CODIGO: $('#txtCodigo').val(),
                            DETALLES_RECETA: $('#tblRequerimiento').DataTable().column(7).data().toArray().toString().concat(','), TIPO_DOC: '0000', ORFAB_CODE: $('#txtCodigoOrdenFabricacion').val()
                        }
                    }).success(function (datos) {
                        $('#txtRequisicion').val(datos)
                        exito();
                        $('#btnNuevoRequerimiento').prop('disabled', true).html('<i class="icon-ok"></i>&nbsp;Generado');
                        $('#cbPrioridadReq').select2('val', '1');
                        listarDetalles();
                        listarInsumos();
                        $('#btnCompletar, #btnRequerimiento, #btnSalidaProduccion').addClass('hidden');
                        btnCompletar();
                        btnRequerimiento();
                        btnSalidaProduccion();
                        Desbloquear('divRequerimiento');
                    }).error(function (msg) {
                        alertCustom('Error al intentar registrar nuevo Requerimiento de Bienes.');
                        $('#btnNuevoRequerimiento').prop('disabled', false).html('<i class="icon-shopping-cart"></i>&nbsp;Generar Nuevo Requerimiento');
                        Desbloquear('divRequerimiento');
                    });
                }, 800);
            }
        });

        $('#btnNuevaSalidaProduccion').click(function () {
            Bloquear('divSalidaProduccion');
            $('#btnNuevaSalidaProduccion').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Generando Nueva Salida');
            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=SALIDA_PRODUCCION",
                    cache: false,
                    async: false,
                    data: {
                        CODIGO: $('#txtCodigo').val(), CTLG_CODE: $('#cboEmpresa').val(), ALMC_CODE: $('#cboAlmacen').val(),
                        ORFAB_NRO: $('#txtNroOrdenFabricacion').val(), EMISION: $('#txtEmision').val(),
                        TRANSACCION: $('#txtTransaccion').val(), PIDM_S: $('#txtPIDM_S').val(), REQC_CODE: $('#txtNroSalida').val(),
                        REQC_NUM_SEQ_DOC: $('#txtSerieSalida').val(), GLOSA: $('#lblGlosaSalida').text(), COD_AUT: $('#txtCOD_AUT').val(),
                        COD_AUT_INT: $('#txtCOD_AUT').val(), DETALLES_RECETA: $('#tblRequerimiento').DataTable().column(7).data().toArray().toString().concat(','),
                        DETALLES_RECETA: $('#tblSalida').DataTable().column(9).data().toArray().toString().concat(','),
                        ORFAB_CODE: $('#txtCodigoOrdenFabricacion').val(), USUA_ID: $('#ctl00_txtus').val(),
                        DETALLES_SALIDA: datosTablaSalida()
                    }
                }).success(function (datos) {
                    $('#txtISAC_CODE').val(datos)
                    exito();
                    $('#btnNuevaSalidaProduccion').prop('disabled', true).html('<i class="icon-ok"></i>&nbsp;Generada');
                    listarDetalles();
                    listarInsumos();
                    $('#btnCompletar, #btnRequerimiento, #btnSalidaProduccion').addClass('hidden');
                    btnCompletar();
                    btnRequerimiento();
                    btnSalidaProduccion();
                    Desbloquear('divSalidaProduccion');
                }).error(function (msg) {
                    alertCustom('Error al intentar registrar nuevo Requerimiento de Bienes.');
                    $('#btnNuevaSalidaProduccion').prop('disabled', false).html('<i class="icon-share-alt"></i>&nbsp;Generar Nueva Salida a Producción');
                    Desbloquear('divSalidaProduccion');
                });
            }, 1000);
        });

        $('#btnCompletar').click(function () {
            Bloquear('ventana');
            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=COMPLETAR",
                    cache: false,
                    async: false,
                    data: { CODIGO: ObtenerQueryString('codigo'), ORFAB_CODE: $('#txtCodigoOrdenFabricacion').val(), USUA_ID: $('#ctl00_txtus').val() }
                }).success(function (data) {
                    Completar();
                    exito();
                    Desbloquear('ventana');
                }).error(function (msg) {
                    Desbloquear('ventana');
                    alertCustom(msg);
                });
            }, 800);
        });
    };

    var Completar = function () {
        $('#cboEmpresa, #cboSucursal').prop('disabled', true);
        $('#agregarInsumo, #agregarRecursoHumano, #agregarSeccion, #agregarActivoFijo, #agregarConcepto, div.form-actions').css('display', 'none');
        $('#tblInsumos').DataTable().columns([13]).visible(false);
        $('#tblEmpleados').DataTable().columns([8]).visible(false);
        $('#tblSecciones').DataTable().columns([6]).visible(false);
        $('#tblActivos').DataTable().columns([7]).visible(false);
        $('#tblConceptos').DataTable().columns([7]).visible(false);
        $('#btnCompletar').addClass('hidden');
    };

    var cargarCorrelativo = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=CORR&CTLG_CODE=" + $('#cboEmpresa').val() + "&TIP_DCTO=" + $('#cboRegistro').val() + "&CORR=S&COD_ALMC=" + $('#cboAlmacen').val(),
            contenttype: "application/json;",
            async: false,
            datatype: "json",
            success: function (datos) {
                for (var i = 0; i < datos.length; i++) {
                    if (datos[i].FORMATO === 'F') {
                        $('#txtCOD_AUT').val(datos[i].CODIGO);
                        $('#txtSerieSalida').val(datos[i].SERIE);
                        $('#txtNroSalida').val(datos[i].VALOR_ACTUAL);
                        break;
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar numeración de documentos comerciales.');
            }
        });
    };

    var cargarAlmacenes = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#cboEmpresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboAlmacen').html('');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Ocurrió un error al listar almacenes.');
            }
        });
    }

    var datosTablaSalida = function () {
        var datos = $('#tblSalida').DataTable().data().toArray();
        var string = '';
        for (var i = 0; i < datos.length; i++) {
            string += datos[i].PROD_CODE + ',' + datos[i].CODIGO + ',' + datos[i].UNME_CODE + ',' + datos[i].CANTIDAD + ',' + datos[i].COSTO_MN + '|'
        }
        string += '|';
        string = string.replace('||', '');
        return string;
    };

    var datosTablaReq = function () {
        var datos_tabla;
        var datos_fila = '';
        var req = $('#tblRequerimiento').DataTable().data().toArray();
        for (var i = 0; i < req.length; i++) {
            datos_fila += req[i].PROD_CODE + ',' + req[i].PEDIR + ',' + req[i].UNME_CODE + ',' + new Date().toLocaleDateString() + ',' + (i + 1).toString() + '|';
        }
        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;
    }

    var cargarTipoCambio = function () {
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=TIPO_CAMBIO",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#txtTipoCambio').val(datos);
            },
            error: function (msg) {
                alertCustom('Error al obtener valor de tipo de cambio.');
            }
        });
    };

    var cargarUnidades = function () {
        var select = $('#cboUMPROD, #cboUMCOEN');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=11",
            contenttype: "application/json;",
            datatype: "json",
            async: false
        }).done(function (datos) {
            select.html('<option></option>');
            if (datos != null) {
                for (var i in datos) {
                    select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        }).fail(function (msg) {
            alertCustom('Error al listar unidades de medida.');
        });
    };

    var cargarDatosFormulacion = function () {
        Bloquear('divBuscarOrden');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=DATOS_FORMULACION',
            async: false,
            cache: false,
            data: { PROD_CODE: $('#txtCodigoProducto').val(), CTLG_CODE: $('#cboEmpresa').val(), CANTIDAD: $('#txtCantidadOrden').val(), TIPO_CAMBIO: $('#txtTipoCambio').val() }
        }).done(function (data) {
            if (data !== null) {
                $('#txtCodigoFormulacion').val(data[0].CODIGO);
                $('#txtHoras').val(data[0].HORAS + ' ' + data[0].TIEMPO);
                $('#txtProceso').val(data[0].PROCESO);
                var divisor = (data[0].TIEMPO === 'HORAS') ? 24 : 1;
                var dias = Math.ceil((data[0].HORAS) / divisor);
                var fechaLimiteFormula = new Date().setDate(new Date($('#txtFechaInicioOrden').val().split('/').reverse().join('-').toString()).getDate() + dias);
                var fechaLimiteDocumento = new Date().setDate(new Date($('#txtFechaLimiteOrden').val().split('/').reverse().join('-').toString()).getDate());
                $('#txtFechaInicioEMPL, #txtFechaInicioSECC, #txtFechaLimiteEMPL, #txtFechaLimiteSECC, #txtFechaInicioACFI, #txtFechaLimiteACFI').datepicker('setStartDate', $('#txtFechaInicioOrden').val());
                $('#txtFechaInicioEMPL, #txtFechaInicioSECC, #txtFechaLimiteEMPL, #txtFechaLimiteSECC, #txtFechaInicioACFI, #txtFechaLimiteACFI').datepicker('setEndDate', (fechaLimiteFormula > fechaLimiteDocumento) ? new Date(fechaLimiteFormula) : new Date(fechaLimiteDocumento));
                cargarInsumos();
                cargarMaquinariasEquipos();
            } else {
                $('#txtCodigoOrdenFabricacion, #txtNroOrdenFabricacion, #txtNroOrigen, #txtOrdenFabricacion, #txtCodigoProducto, #txtCantidadOrden, #txtHoras, #txtProceso').val('');
                $('#lblNroOrdenFabricacion, #lblNroOrdenFabricacion2').text('');
                $('#txtFechaInicioOrden, #txtFechaLimiteOrden').val('');
                infoCustom2('El producto solicitado en la orden de fabricación no tiene una formulación configurada. Puede configurar esa formulación <a target="_blanck" href="?f=MPMFORP">AQUÍ<a>');
            }
            Desbloquear('divBuscarOrden');
        }).fail(function () {
            alertCustom('Error al cargar los datos de la formulación.');
            Desbloquear('divBuscarOrden');
        });
    };

    var cargarInsumos = function () {
        //Bloquear('divBuscarOrden');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=INSUMOS_FORMULACION',
            async: false,
            cache: false,
            data: { MANC_CODE: $('#txtCodigoFormulacion').val(), CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(), ALMC_CODE: $('#cboSucursal :selected').attr('data-almc-code'), CANTIDAD: $('#txtCantidadOrden').val(), TIPO_CAMBIO: $('#txtTipoCambio').val() }
        }).done(function (data) {
            data = (data === null) ? [] : data;
            var datos = $('#tblInsumos').DataTable().data().toArray();
            var contador = 0;
            for (var i = 0; i < datos.length; i++) { if (datos[i].MANC_CODE !== '') { contador++; } }
            datos.splice(0, contador);
            datos = data.concat(datos);
            dataTableInsumos(datos);
            //Desbloquear('divBuscarOrden');
        }).fail(function () {
            alertCustom('Error al cargar Insumos de la formulación.');
            //Desbloquear('divBuscarOrden');
        });
    };

    var cargarMaquinariasEquipos = function () {
        //Bloquear('divBuscarOrden');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=LISTAR_MAQUINARIAS_FORMULACION',
            data: { MANC_CODE: $('#txtCodigoFormulacion').val(), CANTIDAD: $('#txtCantidadOrden').val() },
            async: false
        }).done(function (data) {
            if (data !== null) {
                $('#listaMAEQ').html('');
                for (var i in data) {
                    $('#listaMAEQ').append('<li data-code="' + data[i].CODIGO + '"><span>' + data[i].CANTIDAD + '</span> ' + data[i].MAQUINARIA + '</li>');
                }
                $('#formulacionMAEQ').slideDown();
            } else {
                $('#formulacionMAEQ').slideUp();
            }
            //Desbloquear('divBuscarOrden');
        }).fail(function (msg) {
            alertCustom('Error al listar maquinarias/equipos de la formulación.');
            //Desbloquear('divBuscarOrden');
        });
    };

    var eliminarInsumo = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblInsumos').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMCORE.ashx',
                async: false,
                data: { OPCION: 'ELIMINAR_INSUMO', CODIGO: codigo, MANC_CODE: data.MANC_CODE, PROD_CODE: data.PROD_CODE }
            }).done(function (data) {
                exito();
                listarDetalles();
                listarInsumos();
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al intentar eliminar insumo.');
                Desbloquear('ventana');
            });
        } else {
            var fila = $('#tblInsumos').DataTable().row(fila);
            fila.remove().draw();
        }
        calcularCostoTotal();
    };

    var eliminarEmpleado = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblEmpleados').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMCORE.ashx',
                async: false,
                data: { OPCION: 'ELIMINAR_INSUMO', CODIGO: codigo, EMPL_CODE: data.EMPL_CODE }
            }).done(function (data) {
                exito();
                listarDetalles();
                listarEmpleados();
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al intentar eliminar empleado.');
                Desbloquear('ventana');
            });
        } else {
            var fila = $('#tblEmpleados').DataTable().row(fila);
            fila.remove().draw();
        }
        calcularCostoTotal();
    };

    var eliminarSeccion = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblSecciones').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMCORE.ashx',
                async: false,
                data: { OPCION: 'ELIMINAR_INSUMO', CODIGO: codigo, SECC_CODE: data.SECC_CODE }
            }).done(function (data) {
                exito();
                listarDetalles();
                listarSecciones();
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al intentar eliminar sección de almacén.');
                Desbloquear('ventana');
            });
        } else {
            var fila = $('#tblSecciones').DataTable().row(fila);
            fila.remove().draw();
        }
        calcularCostoTotal();
    };

    var eliminarActivo = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblActivos').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMCORE.ashx',
                async: false,
                data: { OPCION: 'ELIMINAR_INSUMO', CODIGO: codigo, ACFI_CODE: data.ACFI_CODE }
            }).done(function (data) {
                exito();
                listarDetalles();
                listarActivos();
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al intentar eliminar activo fijo.');
                Desbloquear('ventana');
            });
        } else {
            var fila = $('#tblActivos').DataTable().row(fila);
            fila.remove().draw();
        }
        calcularCostoTotal();
    };

    var eliminarConcepto = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblConceptos').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMCORE.ashx',
                async: false,
                data: { OPCION: 'ELIMINAR_INSUMO', CODIGO: codigo, COEN_CODE: data.COEN_CODE }
            }).done(function (data) {
                exito();
                listarDetalles();
                listarConceptos();
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al intentar eliminar activo fijo.');
                Desbloquear('ventana');
            });
        } else {
            var fila = $('#tblConceptos').DataTable().row(fila);
            fila.remove().draw();
        }
        calcularCostoTotal();
    };

    var autocompletarInsumos = function () {
        var input = $('#txtInsumo');
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=INSUMOS",
            cache: false,
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(), ALMC_CODE: $('#cboSucursal :selected').attr('data-almc-code'), TIPO_CAMBIO: $('#txtTipoCambio').val() }
        }).success(function (datos) {
            if (datos !== null) {
                input.typeahead({
                    source: function (query, process) {
                        arraySolicitante = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            if (datos[i].COSTO_MN !== '0') {
                                arraySolicitante.push(datos[i].DESCRIPCION);
                                obj += '{';
                                obj += '"DESCRIPCION":"' + datos[i].DESCRIPCION + '", "NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL + '", "CODIGO":"' + datos[i].CODIGO + '", "CODIGO_ANTIGUO":"' + datos[i].CODIGO_ANTIGUO + '", "UNME_CODE": "' + datos[i].UNME_CODE + '", "STOCK": "' + datos[i].STOCK + '", "COSTO_MN":"' + datos[i].COSTO_MN + '", "COSTO_ME":"' + datos[i].COSTO_ME + '"';
                                obj += '},';
                            }
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.DESCRIPCION] = objeto;
                        });
                        process(arraySolicitante);
                    },
                    updater: function (item) {
                        $('#txtPROD_CODE').val(map[item].CODIGO);
                        $('#txtPROD_CODE_ANTIGUO').val(map[item].CODIGO_ANTIGUO);
                        $('#txtPROD_STOCK').val(map[item].STOCK);
                        $('#txtCostoMNPROD').val(map[item].COSTO_MN);
                        $('#txtCostoMEPROD').val(map[item].COSTO_ME);
                        $('#txtNombreComercial').val(map[item].NOMBRE_COMERCIAL);
                        $('#cboUMPROD').select2('val', map[item].UNME_CODE);
                        return item;
                    },
                });
            }
            if (datos !== null) {
                input.val('');
            }
        }).error(function (msg) {
            alertCustom('Error al intentar listar insumos.');
        });

        input.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($(this).val().length === 0) {
                $("#txtPROD_CODE, #txtPROD_CODE_ANTIGUO, #txtPROD_STOCK, #txtCostoMNPROD, #txtCostoMEPROD").val('');
                $('#cboUM').select2('val', '');
            }
        });
    };

    var autocompletarEmpleados = function () {
        var input = $('#txtEmpleado');
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=EMPLEADOS",
            cache: false,
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val() }
        }).done(function (datos) {
            if (datos !== null) {
                input.typeahead({
                    source: function (query, process) {
                        arraySolicitante = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arraySolicitante.push(datos[i].NOMBRE_EMPLEADO);
                            obj += '{';
                            obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '", "PIDM":"' + datos[i].PIDM + '", "REM_HORA":"' + datos[i].REM_HORA + '"';
                            obj += '},';
                        }

                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE_EMPLEADO] = objeto;
                        });
                        process(arraySolicitante);
                    },
                    updater: function (item) {
                        $("#txtEMPL_CODE").val(map[item].PIDM);
                        $('#txtCostoMNEMPL').val(map[item].REM_HORA);
                        $('#txtCostoMEEMPL').val((parseFloat(map[item].REM_HORA) / parseFloat($('#txtTipoCambio').val())));
                        return item;
                    },
                });
            }

            if (datos !== null) {
                input.val('');
            }
        }).fail(function (msg) {
            alertCustom('Error al intentar consultar empleados.');
        });

        input.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($(this).val().length === 0) {
                $("#txtEMPL_CODE, #txtEmpleado, #txtCostoMNEMPL, #txtCostoMEEMPL").val('');
            }
        });
    };

    var autocompletarActivosFijos = function () {
        var input = $('#txtActivoFijo');
        $.ajax({
            type: "post",
            url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=ACTIVOS_FIJOS',
            cache: false,
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val() }
        }).done(function (datos) {
            if (datos !== null) {
                input.typeahead({
                    source: function (query, process) {
                        arraySolicitante = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arraySolicitante.push(datos[i].BIEN + ' ' + datos[i].SERIE);
                            obj += '{';
                            obj += '"BIEN":"' + datos[i].BIEN + ' ' + datos[i].SERIE + '", "CODIGO":"' + datos[i].CODIGO + '", "VALOR_ACTUAL" : "' + datos[i].VALOR_ACTUAL + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.BIEN] = objeto;
                        });
                        process(arraySolicitante);
                    },
                    updater: function (item) {
                        $("#txtACFI_CODE").val(map[item].CODIGO);
                        $('#txtCostoMNACFI').val(parseFloat(map[item].VALOR_ACTUAL).toFixed(8));
                        $('#txtCostoMEACFI').val((parseFloat(map[item].VALOR_ACTUAL) / parseFloat($('#txtTipoCambio').val())).toFixed(8));
                        $('#cboUMACFI').select2('val', '0007');
                        return item;
                    },
                });
            }
            if (datos !== null) {
                input.val('');
            }
        }).fail(function () {
            alertCustom('Error al intentar consultar activos fijos.');
        });

        input.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($(this).val().length === 0) {
                $("#txtACFI_CODE, #txtCostoMNACFI, #txtCostoMEACFI").val('');
                $('#cboUM').select2('val', '');
            }
        });
    };

    var cargarSeccionesAlmacen = function () {
        var select = $('#cboSeccion');
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=SECCIONES_ALMACEN",
            cache: false,
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#cboEmpresa').val(), ALMC_CODE: $('#cboSucursal :selected').attr('data-almc-code') }
        }).done(function (data) {
            select.html('<option></option>');
            if (data !== null) {
                for (var i in data) {
                    select.append('<option value="' + data[i].CODIGO + '" data-costo-mn="' + data[i].COSTO_SECCION + '" data-costo-me="' + (parseFloat(data[i].COSTO_SECCION) / parseFloat($('#txtTipoCambio').val())) + '">' + data[i].DESCRIPCION + '</option>');
                }
            }
        }).fail(function () {
            //Linea muestra error
            infoCustom2('No se han encontrado secciones de almacén.');
        });
    };

    var cargarConceptosEnergeticos = function () {
        var select = $('#cboConcepto');
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=CONCEPTOS_ENERGETICOS",
            cache: false,
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val() }
        }).done(function (data) {
            select.html('<option></option>');
            if (data !== null) {
                for (var i in data) {
                    var costo_mn = (parseFloat(data[i].MONTO) / parseFloat(data[i].VALOR)).toFixed(8);
                    var costo_me = (costo_mn / parseFloat($('#txtTipoCambio').val())).toFixed(8);
                    select.append('<option value="' + data[i].CODIGO + '" data-unme-code="' + data[i].UNME_CODE + '" data-costo-mn="' + costo_mn + '" data-costo-me="' + costo_me + '">' + data[i].DESCRIPCION + '</option>');
                }
                $('#cboConcepto').change(function () {
                    $('#cboUMCOEN').select2('val', $('#cboConcepto :selected').attr('data-unme-code')).change();
                });
            }
        }).fail(function () {
            alertCustom('Error al intentar obtener secciones de Almacén.');
        });
    };

    var insumoAgregado = function (codigo) {
        var codigos = $('#tblInsumos').DataTable().column(1).data().toArray();
        return codigos.indexOf(codigo) > -1;
    };

    var empleadoAgregado = function (codigo) {
        var codigos = $('#tblEmpleados').DataTable().column(0).data().toArray();
        return codigos.indexOf(codigo) > -1;
    };

    var seccionAgregada = function (codigo) {
        var codigos = $('#tblSecciones').DataTable().column(0).data().toArray();
        return codigos.indexOf(codigo) > -1;
    };

    var activoAgregado = function (codigo) {
        var codigos = $('#tblActivos').DataTable().column(0).data().toArray();
        return codigos.indexOf(codigo) > -1;
    };

    var conceptoAgregado = function (codigo) {
        var codigos = $('#tblConceptos').DataTable().column(0).data().toArray();
        return codigos.indexOf(codigo) > -1;
    };

    var nombreUsuario = function () {
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=5&p_usuario=" + $('#ctl00_txtus').val(),
            async: false,
            success: function (datos) {
                if (datos !== null) { $("#txtSolicitanteReq").val(datos); }
            },
            error: function (msg) { alert(msg); }
        });
    }

    var cargarCentroCostos = function () {
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LCC&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== null && data !== '') {
                    for (var i = 1; i <= parseInt(data[0].NIVELES) ; i++) {
                        $('select[data-nivel=' + i + ']').prop('disabled', false);
                    }
                    if (data[0].NIVEL1 !== '') {
                        $('#lblNivel1').text(data[0].NIVEL1);
                        cargarNivelCC(data[0].CODIGO, '', 1, $('#cboNivel1'));
                    }
                    if (data[0].NIVEL2 !== '') {
                        $('#lblNivel2').text(data[0].NIVEL2);
                    }
                    if (data[0].NIVEL3 !== '') {
                        $('#lblNivel3').text(data[0].NIVEL3);
                    }
                    if (data[0].NIVEL4 !== '') {
                        $('#lblNivel4').text(data[0].NIVEL4);
                    }
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarNivelCC = function (codigo, depend, nivel, select) {
        $(select).html('');
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LNCC&CECC_CODE=' + codigo + '&DEPEND_CODE=' + depend + '&NIVEL=' + nivel,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== null) {
                    $(select).append('<option></option>');
                    for (var i = 0; i < data.length; i++) {
                        $(select).append('<option value="' + data[i].CODE + '" cecc-code="' + codigo + '">' + data[i].DESCC + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var listarEmpleados = function () {
        var tabla_empleados = [];
        for (var i = 0; i < tabla_detalles.length; i++) {
            if (tabla_detalles[i].EMPL_CODE !== '') {
                tabla_empleados.push(tabla_detalles[i]);
            }
        }
        $('#tblEmpleados').DataTable().destroy();
        $('#tblEmpleados').DataTable({
            info: false, responsive: true,
            data: tabla_empleados,
            order: [[0, 'desc']],
            columns: [
                {
                    data: 'EMPL_CODE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                { data: 'EMPLEADO' },
                { data: 'ACTIVIDAD' },
                {
                    data: 'HORAS', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                {
                    data: 'INICIO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '12%'
                },
                {
                    data: 'LIMITE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '12%'
                },
                {
                    data: 'COSTO_MN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                    }, width: '13%'
                },
                {
                    data: 'COSTO_ME', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                    }, width: '13%'
                },
                {
                    data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%'
                }
            ]
        });
    };

    var listarSecciones = function () {
        var tabla_secciones = [];
        for (var i = 0; i < tabla_detalles.length; i++) {
            if (tabla_detalles[i].SECC_CODE !== '') {
                tabla_secciones.push(tabla_detalles[i]);
            }
        }
        $('#tblSecciones').DataTable().destroy();
        $('#tblSecciones').DataTable({
            info: false, responsive: true,
            data: tabla_secciones,
            order: [[0, 'desc']],
            columns: [
                {
                    data: 'SECC_CODE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                {
                    data: 'SECCION'
                },
                {
                    data: 'INICIO', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '12%'
                },
                {
                    data: 'LIMITE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '12%'
                },
                {
                    data: 'COSTO_MN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                    }, width: '15%'
                },
                {
                    data: 'COSTO_ME', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                    }, width: '15%'
                },
                {
                    data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%'
                }
            ]
        });
    };

    var listarActivos = function () {
        var tabla_activos = [];
        for (var i = 0; i < tabla_detalles.length; i++) {
            if (tabla_detalles[i].ACFI_CODE !== '') {
                tabla_activos.push(tabla_detalles[i]);
            }
        }
        $('#tblActivos').DataTable().destroy();
        $('#tblActivos').DataTable({
            info: false, responsive: true,
            data: tabla_activos,
            order: [[0, 'desc']],
            columns: [
                { data: 'ACFI_CODE', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '10%' },
                { data: 'ACTIVO' },
                { data: 'ACTIVIDAD' },
                { data: 'INICIO', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '12%' },
                { data: 'LIMITE', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '12%' },
                { data: 'COSTO_MN', createdCell: function (cell, cellData) { $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2)); }, width: '12%' },
                { data: 'COSTO_ME', createdCell: function (cell, cellData) { $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2)); }, width: '12%' },
                { data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%' }
            ]
        });
    };

    var listarConceptos = function () {
        var tabla_conceptos = [];
        for (var i = 0; i < tabla_detalles.length; i++) {
            if (tabla_detalles[i].COEN_CODE !== '') {
                tabla_conceptos.push(tabla_detalles[i]);
            }
        }
        $('#tblConceptos').DataTable().destroy();
        $('#tblConceptos').DataTable({
            info: false, responsive: true,
            data: tabla_conceptos,
            order: [[0, 'desc']],
            columns: [
                {
                    data: 'COEN_CODE', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '10%'
                },
                {
                    data: 'CONCEPTO'
                },
                {
                    data: 'CANTIDAD', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }
                },
                {
                    data: 'UNME_CODE', visible: false
                },
                {
                    data: 'UNIDAD_MEDIDA', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }, width: '15%'
                },
                {
                    data: 'COSTO_MN', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                    }, width: '15%'
                },
                {
                    data: 'COSTO_ME', createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                    }, width: '15%'
                },
                {
                    data: null, defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>', width: '5%'
                }
            ]
        });
    };

    var cargarPIDMusuario = function () {
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMCORE.ashx",
            cache: false,
            async: false,
            data: { OPCION: 'PIDM_USUARIO', USUA_ID: $('#ctl00_txtus').val() }
        }).success(function (data) {
            $('#txtPIDM_S').val(data);
            $('#txtSolicitante').val($('#ctl00_txtus').val());
        }).error(function (msg) { alertCustom('Error al obtener PIDM del Usuario logueado'); });
    };

    var cargarConfiguracionReceta = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: "post",
                url: 'vistas/MP/ajax/MPMCORE.ashx',
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                data: { OPCION: 'S', CODIGO: codigo }
            }).done(function (data) {
                $('#txtCodigo').val(data[0].CODIGO);
                if (data[0].ESTADO === 'INACTIVO') {
                    $('#chkEstado').prop('checked', false).parent().removeClass('checked');
                }
                $('#cboEmpresa').select2('val', data[0].CTLG_CODE).change().prop('disabled', true);
                $('#cboSucursal').select2('val', data[0].SCSL_CODE).change().prop('disabled', true);
                $('#txtCodigoOrdenFabricacion').val(data[0].ORFAB_CODE);
                $('#txtNroOrdenFabricacion').val(data[0].ORFAB_NRO_ORDEN);
                $('#lblNroOrdenFabricacion, #lblNroOrdenFabricacion2').text(data[0].ORFAB_NRO_ORDEN);
                $('#txtNroOrigen').val(codigo);
                $('#txtOrdenFabricacion').val(data[0].ORFAB_DESC);
                $('#txtCantidadOrden').val(data[0].ORFAB_DESC.split(' ')[0]);
                $('#txtHoras').val(data[0].HORAS);
                $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                $('#btnBuscarOrdenFabricacion').addClass('hidden');
                $('#txtFechaInicioOrden').val(data[0].INICIO);
                $('#txtFechaLimiteOrden').val(data[0].LIMITE);
                $('#txtProceso').val(data[0].PROCESO);
                var divisor = (data[0].HORAS.split(' ')[1] === 'HORAS') ? 24 : 1;
                var dias = Math.ceil(parseFloat(data[0].HORAS.split(' ')[0]) / divisor);
                var fechaLimiteFormula = new Date().setDate(new Date(data[0].INICIO.split('/').reverse().join('-').toString()).getDate() + dias);
                var fechaLimiteDocumento = new Date().setDate(new Date(data[0].LIMITE.split('/').reverse().join('-').toString()).getDate());
                $('#txtFechaInicioEMPL, #txtFechaInicioSECC, #txtFechaLimiteEMPL, #txtFechaLimiteSECC, #txtFechaInicioACFI, #txtFechaLimiteACFI').datepicker('setStartDate', $('#txtFechaInicioOrden').val());
                $('#txtFechaInicioEMPL, #txtFechaInicioSECC, #txtFechaLimiteEMPL, #txtFechaLimiteSECC, #txtFechaInicioACFI, #txtFechaLimiteACFI').datepicker('setEndDate', (fechaLimiteFormula > fechaLimiteDocumento) ? new Date(fechaLimiteFormula) : new Date(fechaLimiteDocumento));
                listarDetalles();
                listarInsumos();
                listarEmpleados();
                listarSecciones();
                listarActivos();
                listarConceptos();
                btnRequerimiento();
                btnSalidaProduccion();
                btnCompletar();
                calcularCostoTotal();
                if (data[0].COMPLETO_IND === 'S') {
                    Completar();
                    $('div.form-actions').css('display', 'none');
                } else {
                    cargarMaquinariasEquipos();
                }
            }).fail(function (msg) {
                alertCustom('Error al cargar los datos.');
            });
        }
    };

    return {
        init: function () {
            plugins();
            nombreUsuario();
            eventos();
            $('#txtFechaReq').val(new Date().toLocaleDateString());
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
            cargarAlmacenes();
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            cargarTipoCambio();
            autocompletarInsumos();
            autocompletarEmpleados();
            cargarSeccionesAlmacen();
            autocompletarActivosFijos();
            cargarConceptosEnergeticos();
            cargarUnidades();
            cargarPIDMusuario();
            cargarConfiguracionReceta();
        }
    };
}();

var calcularCostoTotal = function () {
    var codigo = ObtenerQueryString('codigo');
    var costo_total = 0;
    var costo_total_me = 0;
    if (codigo !== undefined) {
        for (var i in tabla_detalles) {
            costo_total += parseFloat(tabla_detalles[i].COSTO_MN);
            costo_total_me += parseFloat(tabla_detalles[i].COSTO_ME);
        }
    } else {
        var insumos = $('#tblInsumos').DataTable().data().toArray();
        var empleados = $('#tblEmpleados').DataTable().data().toArray();
        var secciones = $('#tblSecciones').DataTable().data().toArray();
        var activos = $('#tblActivos').DataTable().data().toArray();
        var conceptos = $('#tblConceptos').DataTable().data().toArray();
        for (var i in insumos) { costo_total += parseFloat(insumos[i].COSTO_MN); costo_total_me += parseFloat(insumos[i].COSTO_ME); }
        for (var i in empleados) { costo_total += parseFloat(empleados[i].COSTO_MN); costo_total_me += parseFloat(empleados[i].COSTO_ME); }
        for (var i in secciones) { costo_total += parseFloat(secciones[i].COSTO_MN); costo_total_me += parseFloat(secciones[i].COSTO_ME); }
        for (var i in activos) { costo_total += parseFloat(activos[i].COSTO_MN); costo_total_me += parseFloat(activos[i].COSTO_ME); }
        for (var i in conceptos) { costo_total += parseFloat(conceptos[i].COSTO_MN); costo_total_me += parseFloat(conceptos[i].COSTO_ME); }
    }
    $('#txtCostoTotalMN').val(costo_total.toFixed(2));
    $('#txtCostoTotalME').val(costo_total_me.toFixed(2));
};

var dataTableInsumos = function (data) {
    $('#tblInsumos').DataTable().destroy();
    $('#tblInsumos').DataTable({
        info: false, responsive: true,
        data: data,
        order: [[0, 'desc']],
        columns: [
            { data: 'MANC_CODE', visible: false },
            { data: 'PROD_CODE', visible: false },
            {
                data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '10%'
            },
            { data: 'INSUMO' },
            { data: 'NOMBRE_COMERCIAL', visible: false },
            {
                data: 'CANTIDAD', createdCell: function (cell, cellData) { $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2)); }, width: '9%'
            },
            { data: 'UNME_CODE', visible: false },
            {
                data: 'UNIDAD_MEDIDA', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '11%'
            },
            {
                data: 'MERMA', createdCell: function (cell, cellData) {
                    $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                }, width: '10%'
            },
            {
                data: 'COSTO_MN', createdCell: function (cell, cellData) {
                    $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                }, width: '11%'
            },
            {
                data: 'COSTO_ME', createdCell: function (cell, cellData) {
                    $(cell).css('text-align', 'center').text(parseFloat(cellData).toFixed(2));
                }, width: '11%'
            },
            {
                data: 'STOCK', createdCell: function (cell, cellData, row) {
                    $(cell).css('text-align', 'center');
                    if (parseFloat(cellData) > parseFloat(row.CANTIDAD)) {
                        $(cell).css('color', 'green');
                    } else {
                        $(cell).css('color', 'red');
                    }
                }, width: '11%'
            },
            {
                data: 'ESTADO', createdCell: function (cell, cellData) {
                    $(cell).css('text-align', 'center');
                    if (cellData === 'L') {
                        $(cell).html('<i class="icon-ok"></i>').css('color', 'green');
                    } else if (cellData === 'P') {
                        $(cell).html('<i class="icon-arrow-right"></i>').css('color', 'blue');
                    } else if (cellData === 'C') {
                        $(cell).html('<i class="icon-shopping-cart"></i>').css('color', 'orange');
                    } else {
                        $(cell).html('<i class="icon-exclamation-sign"></i>').css('color', 'red');
                    }
                }, width: '5%'
            },
            {
                data: null,
                createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                    if (cellData.MANC_CODE === '' && row.ESTADO !== 'P' && row.ESTADO !== 'C') {
                        $(cell).html('<a class="btn red"><i class="icon-trash" style="line-heigth: inline"></i></a>');
                    } else {
                        $(cell).html('');
                    }
                }, width: '5%'
            },
            { data: 'DETALLE_RECETA', visible: false }
        ]
    });
};

var listarDetalles = function () {
    $.ajax({
        type: "post",
        url: "vistas/MP/ajax/MPMCORE.ashx?OPCION=DETALLES_RECETA",
        cache: false,
        datatype: "json",
        async: false,
        data: { CODIGO: ObtenerQueryString('codigo'), CTLG_CODE: $('#cboEmpresa').val(), ALMC_CODE: $('#cboSucursal :selected').attr('data-almc-code') }
    }).done(function (data) {
        tabla_detalles = data;
    });
};

var listarInsumos = function () {
    var tabla_insumos = [];
    for (var i = 0; i < tabla_detalles.length; i++) {
        if (tabla_detalles[i].PROD_CODE !== '') {
            tabla_insumos.push(tabla_detalles[i]);
        }
    }
    dataTableInsumos(tabla_insumos);
};

var btnRequerimiento = function () {
    var estados = $('#tblInsumos').DataTable().column(12).data().toArray();
    if (estados.indexOf('I') > -1) {
        var cantidades = $('#tblInsumos').DataTable().column(5).data().toArray();
        var stocks = $('#tblInsumos').DataTable().column(11).data().toArray();
        for (var i = 0; i < cantidades.length; i++) {
            if (parseFloat(cantidades[i]) > parseFloat(stocks[i]) && estados[i] === "I") {
                $('#btnRequerimiento').removeClass('hidden');
                break;
            }
        }
    }
};

var btnSalidaProduccion = function () {
    var estados = $('#tblInsumos').DataTable().column(12).data().toArray();
    if (estados.indexOf('I') > -1 || estados.indexOf('C') > -1) {
        var cantidades = $('#tblInsumos').DataTable().column(5).data().toArray();
        var stocks = $('#tblInsumos').DataTable().column(11).data().toArray();
        for (var i = 0; i < cantidades.length; i++) {
            if (parseFloat(cantidades[i]) <= parseFloat(stocks[i]) && estados[i] !== 'L' && $('#btnRequerimiento').hasClass('hidden')) {
                $('#btnSalidaProduccion').removeClass('hidden');
                break;
            }
        }
    }
};

var btnCompletar = function () {
    var estados = $('#tblInsumos').DataTable().column(12).data().toArray();
    if (estados.indexOf('I') === -1 && estados.indexOf('C') === -1 && estados.indexOf('P') === -1) {
        $('#btnCompletar').removeClass('hidden');
    }
};

var cargarEmpresas = function () {
    var select = $('#cboEmpresa, #cboEmpresaReq, #cboEmpresaSalida');
    $.ajax({
        type: "post",
        url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {
            $(select).html('');
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
    var select = $('#cboSucursal, #cboSucursalReq');
    $.ajax({
        type: "post",
        url: 'vistas/NO/ajax/NOMGNLO.ashx?OPCION=2&CTLG_CODE=' + $('#cboEmpresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {
            $(select).html('');
            for (var i = 0; i < data.length; i++) {
                $(select).append('<option value="' + data[i].CODIGO + '" data-almc-code="' + data[i].ALMACEN + '">' + data[i].DESCRIPCION + '</option>');
            }
        },
        error: function (msg) {
            alertCustom('Error al listar Sucursales.');
        }
    });
};

var costosCorrectos = function () {
    var insumos = $('#tblInsumos').DataTable().data().toArray();
    for (var i in insumos) {
        if (parseFloat(insumos[i].COSTO_MN) === 0.0) {
            alertCustom('Verifique que no existan insumos sin costo en la lista, de lo contrario no se podrá calcular el costo total de la fabricación del lote.');
            return false;
        }
    }
    var empleados = $('#tblEmpleados').DataTable().data().toArray();
    for (var i in empleados) {
        if (parseFloat(empleados[i].COSTO_MN) === 0.0) {
            alertCustom('Verifique que no existan insumos sin costo en la lista, de lo contrario no se podrá calcular el costo total de la fabricación del lote.');
            return false;
        }
    }
    var secciones = $('#tblSecciones').DataTable().data().toArray();
    for (var i in secciones) {
        if (parseFloat(secciones[i].COSTO_MN) === 0.0) {
            alertCustom('Verifique que no existan insumos sin costo en la lista, de lo contrario no se podrá calcular el costo total de la fabricación del lote.');
            return false;
        }
    }
    var activos = $('#tblActivos').DataTable().data().toArray();
    for (var i in activos) {
        if (parseFloat(activos[i].COSTO_MN) === 0.0) {
            alertCustom('Verifique que no existan insumos sin costo en la lista, de lo contrario no se podrá calcular el costo total de la fabricación del lote.');
            return false;
        }
    }
    var conceptos = $('#tblConceptos').DataTable().data().toArray();
    for (var i in conceptos) {
        if (parseFloat(conceptos[i].COSTO_MN) === 0.0) {
            alertCustom('Verifique que no existan insumos sin costo en la lista, de lo contrario no se podrá calcular el costo total de la fabricación del lote.');
            return false;
        }
    }
    var total_recursos = insumos.length + empleados.length + secciones.length + activos.length + conceptos.length;
    if (total_recursos === 0) {
        alertCustom('No ha añadido ningún recurso.');
        return false;
    }

    return true;
};

var ValidaHoras = function (e, input) {
    var val = $(input).val().toString().concat(String.fromCharCode(e.keyCode));
    if (!isNaN(val)) {
        if (parseInt(val) > 0 && parseInt(val) <= 18) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

var Grabar = function () {
    if (vErrors(['txtNroOrdenFabricacion', 'txtOrdenFabricacion'])) {
        if (costosCorrectos()) {
            Bloquear('ventana');
            setTimeout(function () {
                $.ajax({
                    type: "post",
                    url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=G',
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,
                    data: {
                        CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(), ORFAB_CODE: $('#txtCodigoOrdenFabricacion').val(), ORFAB_DESC: $('#txtOrdenFabricacion').val(), HORAS: $('#txtHoras').val(), USUA_ID: $('#ctl00_txtus').val(),
                        MANC_CODE: $('#tblInsumos').DataTable().column(0).data().toArray().toString().concat(','), PROD_CODE: $('#tblInsumos').DataTable().column(1).data().toArray().toString().concat(','), CANTIDADES_PROD: $('#tblInsumos').DataTable().column(5).data().toArray().toString().concat(','), UNME_CODES_PROD: $('#tblInsumos').DataTable().column(6).data().toArray().toString().concat(','), MERMAS_PROD: $('#tblInsumos').DataTable().column(8).data().toArray().toString().concat(','), COSTOS_MN_PROD: $('#tblInsumos').DataTable().column(9).data().toArray().toString().concat(','), COSTOS_ME_PROD: $('#tblInsumos').DataTable().column(10).data().toArray().toString().concat(','),
                        EMPL_CODE: $('#tblEmpleados').DataTable().column(0).data().toArray().toString().concat(','), HORAS_EMPL: $('#tblEmpleados').DataTable().column(3).data().toArray().toString().concat(','), ACTIVIDADES_EMPL: $('#tblEmpleados').DataTable().column(2).data().toArray().toString().concat(','), INICIOS_EMPL: $('#tblEmpleados').DataTable().column(4).data().toArray().toString().concat(','), LIMITES_EMPL: $('#tblEmpleados').DataTable().column(5).data().toArray().toString().concat(','), COSTOS_MN_EMPL: $('#tblEmpleados').DataTable().column(6).data().toArray().toString().concat(','), COSTOS_ME_EMPL: $('#tblEmpleados').DataTable().column(7).data().toArray().toString().concat(','),
                        SECC_CODE: $('#tblSecciones').DataTable().column(0).data().toArray().toString().concat(','), INICIOS_SECC: $('#tblSecciones').DataTable().column(2).data().toArray().toString().concat(','), LIMITES_SECC: $('#tblSecciones').DataTable().column(3).data().toArray().toString().concat(','), COSTOS_MN_SECC: $('#tblSecciones').DataTable().column(4).data().toArray().toString().concat(','), COSTOS_ME_SECC: $('#tblSecciones').DataTable().column(5).data().toArray().toString().concat(','),
                        ACFI_CODE: $('#tblActivos').DataTable().column(0).data().toArray().toString().concat(','), ACTIVIDADES_ACFI: $('#tblActivos').DataTable().column(2).data().toArray().toString().concat(','), INICIOS_ACFI: $('#tblActivos').DataTable().column(3).data().toArray().toString().concat(','), LIMITES_ACFI: $('#tblActivos').DataTable().column(4).data().toArray().toString().concat(','), COSTOS_MN_ACFI: $('#tblActivos').DataTable().column(5).data().toArray().toString().concat(','), COSTOS_ME_ACFI: $('#tblActivos').DataTable().column(6).data().toArray().toString().concat(','),
                        COEN_CODE: $('#tblConceptos').DataTable().column(0).data().toArray().toString().concat(','), CANTIDADES_COEN: $('#tblConceptos').DataTable().column(2).data().toArray().toString().concat(','), UNME_CODES_COEN: $('#tblConceptos').DataTable().column(3).data().toArray().toString().concat(','), COSTOS_MN_COEN: $('#tblConceptos').DataTable().column(5).data().toArray().toString().concat(','), COSTOS_ME_COEN: $('#tblConceptos').DataTable().column(6).data().toArray().toString().concat(',')
                    }
                }).done(function (data) {
                    if (!isNaN(parseFloat(data))) {
                        $('#txtCodigo').val(data);
                        $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                        $('#cboEmpresa, #cboSucursal').prop('disabled', true);
                        $('#btnBuscarOrdenFabricacion').addClass('hidden');
                        $('#btnCompletar, #btnRequerimiento, #btnSalidaProduccion').addClass('hidden');
                        window.history.pushState("Object", "Configuracion de Insumos en Receta", "/Default.aspx?f=MPMCORE&codigo=" + data);
                        listarDetalles();
                        listarInsumos();
                        btnRequerimiento();
                        btnSalidaProduccion();
                        btnCompletar();
                        exito();
                    } else {
                        alertCustom('Error al crear nueva configuración. Puede que la orden de fabricación ya haya sido tomada.');
                    }
                    Desbloquear('ventana');
                }).fail(function (msg) {
                    noexito();
                    Desbloquear('ventana');
                });
            }, 100);
        }
    }
};

var Actualizar = function () {
    if (vErrors(['txtNroOrdenFabricacion', 'txtOrdenFabricacion'])) {
        Bloquear('ventana');
        setTimeout(function () {
            $.ajax({
                type: "post",
                url: 'vistas/MP/ajax/MPMCORE.ashx?OPCION=A',
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                data: { CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(), ORFAB_CODE: $('#txtCodigoOrdenFabricacion').val(), ORFAB_DESC: $('#txtOrdenFabricacion').val(), HORAS: $('#txtHoras').val(), USUA_ID: $('#ctl00_txtus').val() }
            }).success(function (data) {
                Desbloquear('ventana');
                exito();
            }).error(function (msg) {
                noexito();
                Desbloquear('ventana');
            });
        }, 100);
    }
};
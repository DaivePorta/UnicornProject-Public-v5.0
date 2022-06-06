var MPLFORP = function () {

    var plugins = function () {
        $('select').select2();
        $('#txtHoras').inputmask({ mask: '9', repeat: 2, greedy: false });
    };

    var listarFormulaciones = function () {
        $('#tblLISTA').DataTable({
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            ajax: {
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=S',
                async: false,
                data: { CODIGO: '' },
                dataSrc: ''
            },
            columns: [
                {
                    data: 'CODIGO',
                    createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }
                },
                { data: 'PRODUCTO' },
                { data: 'PROCESO' },
                {
                    data: 'ALMC_CODE',
                    createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }
                },
                {
                    data: 'CANTIDAD',
                    createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }
                },
                {
                    data: 'UNIDAD',
                    createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }
                },
                {
                    data: 'ESTADO',
                    createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (cell, cellData, row, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    }
                },
                {
                    data: 'CTLG_CODE',
                    visible: false
                }
            ]
        });

        $('#tblLISTA tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var row = $('#tblLISTA').DataTable().row(this).data();
                var codigo = row.CODIGO;
                window.location.href = '?f=MPMFORP&codigo=' + codigo;
            }
        });

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">PRODUCTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">PATENTE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">CANTIDAD</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">UNIDAD</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="8" href="#">ESTADO</a>\
                    </div>');

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
            $.post("vistas/MP/ajax/MPMFORP.ashx", { OPCION: 'AE', CODIGO: code, USUA_ID: $('#ctl00_txtus').val() },
                function (res) {
                    if (res !== null) {
                        res = (res === 'I') ? 'INACTIVO' : 'ACTIVO';
                        $('#tblLISTA').DataTable().cell(pos, 6).data(res).draw();
                        exito();
                    } else {
                        noexito();
                    }
                    Desbloquear("ventana");
                });
            $.ajaxSetup({ async: true });
        });
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            $('#tblLISTA').DataTable().column(8).search($(this).val()).draw();
        });
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            listarFormulaciones();
            eventos();
        }
    };
}();

var MPMFORP = function () {

    var plugins = function () {
        $('select').select2();
        $('#tblInsumos').DataTable({ responsive: true, filter: false, info: false }).columns([0, 3, 6]).visible(false);
        $('#tblDerivados').DataTable({ responsive: true, filter: false, info: false }).columns([0, 4]).visible(false);
        $('#tblMaquinarias').DataTable({ responsive: true, filter: false, info: false });
        $('#txtPatente').inputmask({ mask: '*', repeat: 23, greedy: false });
        $('#txtCantMAEQ').inputmask({ mask: '9', repeat: 3, greedy: false });
    };

    var cargarUnidades = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=11",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboUM, #cboUMP, #cboUMDerivado').html('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboUM, #cboUMP, #cboUMDerivado').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar unidades de medida.');
            }
        });
    };

    var cargarInsumos = function () {
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMFORP.ashx?OPCION=LISTAR_PRODUCTOS_TERMINADOS",
            contenttype: "application/json",
            datatype: "json",
            data: { CTLG_CODE: $('#cboEmpresa').val() },
            async: false
        }).done(function (data) {
            if (data !== null) {
                $('#txtInsumo, #txtDerivado').data('productos', data);
            }
        }).fail(function (msg) {
            alertCustom('Error al cargar los Insumos.');
        });
    };

    var cargarProcesosProductivos = function () {
        var select = $('#cboProceso');
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPLPROC.ashx?OPCION=S",
            contenttype: "application/json",
            datatype: "json",
            data: { CODIGO: '', CTLG_CODE: $('#cboEmpresa').val() },
            async: false
        }).done(function (data) {
            if (data !== null) {
                select.html('<option></option>');
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].PROCESO + '</option>');
                }
            }
        }).fail(function (msg) {
            alertCustom('Error al cargar los procesos productivos.');
        });
    };

    var autocompletarInsumos = function () {
        var input = $('#txtInsumo');
        input.typeahead({
            source: function (query, process) {
                array = [];
                map = {};

                var obj = "[";
                var datos = $('#txtInsumo').data('productos');
                for (var i = 0; i < datos.length; i++) {
                    array.push(datos[i].DESC_ADM);
                    obj += '{';
                    obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","CODIGO_ANTIGUO":"' + datos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + datos[i].UNIDAD + '", "VALOR_TOTAL": "' + datos[i].VALOR_TOTAL + '"';
                    obj += '},';
                }
                obj += "{}";
                obj = obj.replace(",{}", "");
                obj += "]";
                var json = $.parseJSON(obj);

                $.each(json, function (i, objeto) {
                    map[objeto.DESC_ADM] = objeto;
                });
                process(array);
            },
            updater: function (item) {
                $("#txtCodigoInsumo").val(map[item].CODIGO);
                $('#txtCodigoAntiguo').val(map[item].CODIGO_ANTIGUO);
                $("#cboUM").select2('val', map[item].UNIDAD);
                return item;
            },
        });
        input.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))
            if ($("#txtInsumo").val().length <= 0) {
                $('#txtCodigoInsumo, #txtCantidad').val('');
                $('#cboUM').select2('val', '');
            }
        });

    };

    var autocompletarDerivados = function () {
        var input = $('#txtDerivado');
        input.typeahead({
            source: function (query, process) {
                array = [];
                map = {};

                var datos = $('#txtDerivado').data('productos');
                var obj = "[";
                for (var i = 0; i < datos.length; i++) {
                    array.push(datos[i].DESC_ADM);
                    obj += '{';
                    obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","CODIGO_ANTIGUO":"' + datos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + datos[i].UNIDAD + '", "VALOR_TOTAL": "' + datos[i].VALOR_TOTAL + '"';
                    obj += '},';
                }
                obj += "{}";
                obj = obj.replace(",{}", "");
                obj += "]";
                var json = $.parseJSON(obj);

                $.each(json, function (i, objeto) {
                    map[objeto.DESC_ADM] = objeto;
                });
                process(array);
            },
            updater: function (item) {
                $("#txtCodigoDerivado").val(map[item].CODIGO);
                $('#txtCodigoAntiguoDerivado').val(map[item].CODIGO_ANTIGUO);
                $("#cboUMDerivado").select2('val', map[item].UNIDAD);
                return item;
            },
        });
        input.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))
            if ($("#txtDerivado").val().length <= 0) {
                $('#txtCodigoDerivado, #txtCantDerivado').val('');
                $('#cboUM').select2('val', '');
            }
        });
        input.val('');
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            $('#tblInsumos, #tblDerivados').DataTable().destroy();
            $('#tblInsumos').DataTable({ responsive: true, filter: false, info: false, data: [] }).columns([0, 5]).visible(false);
            $('#tblDerivados').DataTable({ responsive: true, filter: false, info: false, data: [] }).columns([0, 4]).visible(false);
            $('#txtProducto, #txtCodigoProducto').val('');
            $('#cboUMP').select2('val', '');
            $('#txtInsumo').parent().html('<input type="hidden" id="txtCodigoInsumo" /><input type="hidden" id="txtCodigoAntiguo" /><input type="text" id="txtInsumo" class="span12" />');
            $('#txtDerivado').parent().html('<input type="hidden" id="txtCodigoDerivado" /><input type="hidden" id="txtCodigoAntiguoDerivado" /><input type="text" id="txtDerivado" class="span12" />');
            cargarInsumos();
            autocompletarInsumos();
            autocompletarDerivados();
        });

        $('#tblInsumos').on('click', 'a', function () {
            eliminarInsumo($(this).parents('tr'));
        });

        $('#btnAgregar').click(function () {
            if (vErrors(['txtInsumo', 'txtCantidad', 'cboUM', 'txtMerma'])) {
                Bloquear('ventana');
                if (parseFloat($('#txtCantidad').val()) > 0 && parseFloat($('#txtMerma').val()) <= (parseFloat($('#txtCantidad').val()) * 0.3)) {
                    if (!contieneInsumo($('#txtCodigoInsumo').val())) {
                        if ($('#txtCodigo').val() === '') {
                            var detalles = $('#tblInsumos').DataTable().data().toArray();
                            $('#tblInsumos').DataTable().destroy();
                            detalles.push({
                                CODIGO: $('#txtCodigoInsumo').val(), CODIGO_ANTIGUO: $('#txtCodigoAntiguo').val(),
                                INSUMO: $('#txtInsumo').val(), CANTIDAD: $('#txtCantidad').val(), MERMA: $('#txtMerma').val(),
                                UNID_CODE: $('#cboUM').val(), UNIDAD_MEDIDA: $('#cboUM :selected').text()
                            });
                            $('#txtCodigoInsumo, #txtCodigoAntiguo, #txtInsumo, #txtCantidad, #txtMerma').val('');
                            $('#cboUM').select2('val', '');
                            $('#tblInsumos').DataTable({
                                responsive: true, filter: false, paging: false,
                                data: detalles,
                                columns: [
                                    { data: 'CODIGO', visible: false },
                                    { data: 'CODIGO_ANTIGUO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                                    { data: 'INSUMO' },
                                    { data: 'CANTIDAD', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                                    { data: 'MERMA', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                                    { data: 'UNID_CODE', visible: false },
                                    { data: 'UNIDAD_MEDIDA', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                                    {
                                        data: null,
                                        defaultContent: '<a class="btn red"><i class="icon-trash" style="line-heigth: inline"></i></a>',
                                        createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); }
                                    }
                                ]
                            });
                            $('#tblInsumos').parent().parent().find(':first').remove();
                            Desbloquear('ventana');
                        } else {
                            $.ajax({
                                type: 'post',
                                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=AGREGAR_INSUMO',
                                data: {
                                    CODIGO: $('#txtCodigo').val(), PROD_CODE: $('#txtCodigoInsumo').val(),
                                    CANTIDAD: $('#txtCantidad').val(), UNID_CODE: $('#cboUM').val(), MERMAS: $('#txtMerma').val()
                                },
                                cache: false,
                                async: false,
                                success: function (data) {
                                    exito();
                                    listarInsumos();
                                    $('#txtCodigoInsumo, #txtCodigoAntiguo, #txtInsumo, #txtCosto, #txtCostoAlterno, #txtCantidad, #txtMerma').val('');
                                    $('#cboUM').select2('val', '');
                                    Desbloquear('ventana');
                                },
                                error: function (msg) {
                                    alertCustom('Insumo ya agregado a la formulación.');
                                    Desbloquear('ventana');
                                }
                            });
                        }
                    } else {
                        alertCustom('Insumo ya agregado a la formulación.');
                    }
                } else {
                    alertCustom('Ingrese valores válidos\n (Cantidad mayor a cero y Merma menor o igual al 30% de la cantidad).');
                }
            }
        });

        $('#tblDerivados').on('click', 'a', function () {
            eliminarDerivado($(this).parents('tr'));
        });

        $('#btnAgregarDerivado').click(function () {
            if (vErrors(['txtDerivado', 'txtCantDerivado', 'cboUMDerivado', 'txtPorcentajeCosto'])) {
                Bloquear('ventana');
                if (parseFloat($('#txtPorcentajeCosto').val()) > 0) {
                    if (sumaPorcentajeDerivados() <= 90) {
                        if (!contieneDerivado($('#txtCodigoDerivado').val())) {
                            if ($('#txtCodigo').val() === '') {
                                var detalles = $('#tblDerivados').DataTable().data().toArray();
                                $('#tblDerivados').DataTable().destroy();
                                detalles.push({
                                    CODIGO: $('#txtCodigoDerivado').val(), CODIGO_ANTIGUO: $('#txtCodigoAntiguoDerivado').val(),
                                    DERIVADO: $('#txtDerivado').val(), CANTIDAD: $('#txtCantDerivado').val(),
                                    UNID_CODE: $('#cboUMDerivado').val(), UNIDAD_MEDIDA: $('#cboUMDerivado :selected').text(),
                                    PORCENTAJE_COSTO: $('#txtPorcentajeCosto').val()
                                });
                                $('#txtCodigoDerivado, #txtCodigoAntiguoDerivado, #txtDerivado, #txtCantDerivado, #txtPorcentajeCosto').val('');
                                $('#cboUMDerivado').select2('val', '');
                                $('#tblDerivados').DataTable({
                                    responsive: true, filter: false, paging: false,
                                    data: detalles,
                                    columns: [
                                        { data: 'CODIGO', visible: false },
                                        { data: 'CODIGO_ANTIGUO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                                        { data: 'DERIVADO' },
                                        { data: 'CANTIDAD', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                                        { data: 'UNID_CODE', visible: false },
                                        { data: 'UNIDAD_MEDIDA', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                                        { data: 'PORCENTAJE_COSTO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                                        {
                                            data: null,
                                            defaultContent: '<a class="btn red"><i class="icon-trash" style="line-heigth: inline"></i></a>',
                                            createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '10%'
                                        }
                                    ]
                                });
                                $('#tblDerivados').parent().parent().find(':first').remove();
                                Desbloquear('ventana');
                            } else {
                                $.ajax({
                                    type: 'post',
                                    url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=AGREGAR_DERIVADO',
                                    data: {
                                        CODIGO: $('#txtCodigo').val(), PROD_CODE: $('#txtCodigoDerivado').val(),
                                        CANTIDAD: $('#txtCantDerivado').val(), UNID_CODE: $('#cboUMDerivado').val(),
                                        PORCENTAJE_COSTO: $('#txtPorcentajeCosto').val()
                                    },
                                    cache: false,
                                    async: false,
                                    success: function (data) {
                                        exito();
                                        listarDerivados();
                                        $('#txtCodigoDerivado, #txtCodigoAntiguo, #txtDerivado, #txtCantDerivado, #txtPorcentajeCosto').val('');
                                        $('#cboUMDerivado').select2('val', '');
                                        Desbloquear('ventana');
                                    },
                                    error: function (msg) {
                                        alertCustom('Derivado ya agregado a la formulación.');
                                        Desbloquear('ventana');
                                    }
                                });
                            }
                        } else { alertCustom('Derivado ya incluido en la lista.'); }
                    } else { alertCustom('Suma de costos supera el 90%.'); }
                } else { alertCustom('Ingrese un porcentaje mayor a 0.'); }
            }
        });

        $('#tblMaquinarias').on('click', 'a', function () {
            eliminarMaquinariaEquipo($(this).parents('tr'));
        });

        $('#btnAgregarMAEQ').click(function () {
            if (vErrors(['cboMaquinaria', 'txtCantMAEQ'])) {
                Bloquear('ventana');
                if (parseInt($('#txtCantMAEQ').val()) > 0) {
                    if (!contieneMaquinaria($('#cboMaquinaria').val())) {
                        if ($('#txtCodigo').val() === '') {
                            var detalles = $('#tblMaquinarias').DataTable().data().toArray();
                            $('#tblMaquinarias').DataTable().destroy();
                            detalles.push({
                                CODIGO: $('#cboMaquinaria').val(), MAQUINARIA: $('#cboMaquinaria :selected').text(), CANTIDAD: $('#txtCantMAEQ').val()
                            });
                            $('#txtCantMAEQ').val('');
                            $('#cboMaquinaria').select2('val', '');
                            $('#tblMaquinarias').DataTable({
                                responsive: true, filter: false, paging: false,
                                data: detalles,
                                columns: [
                                    { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '15%'); } },
                                    { data: 'MAQUINARIA' },
                                    { data: 'CANTIDAD', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                                    {
                                        data: null,
                                        defaultContent: '<a class="btn red"><i class="icon-trash" style="line-heigth: inline"></i></a>',
                                        createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '10%'
                                    }
                                ]
                            });
                            $('#tblMaquinarias').parent().parent().find(':first').remove();
                            Desbloquear('ventana');
                        } else {
                            $.ajax({
                                type: 'post',
                                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=AGREGAR_MAQUINARIA',
                                data: {
                                    CODIGO: $('#txtCodigo').val(), GRUP_CODE: $('#cboMaquinaria').val(), CANTIDAD: $('#txtCantMAEQ').val()
                                },
                                cache: false,
                                async: false,
                                success: function (data) {
                                    exito();
                                    listarMaquinariasEquipos();
                                    $('#cboMaquinaria').select2('val', '');
                                    $('#txtCantMAEQ').val('');
                                    Desbloquear('ventana');
                                },
                                error: function (msg) {
                                    alertCustom('Maquinaria/Equipo ya incluido en la formulación.');
                                    Desbloquear('ventana');
                                }
                            });
                        }
                    } else {
                        alertCustom('Maquinaria/Equipo ya incluido en la formulación.');
                        Desbloquear('ventana');
                    }
                } else {
                    alertCustom('Por favor, ingrese una cantidad mayor a cero.');
                    Desbloquear('ventana');
                }
            }
        });

        $('#tblProductos tbody').on('click', 'tr', function () {
            $(this).addClass('selected');
            var producto = $('#tblProductos').DataTable().row(this).data();
            $('#txtCodigoProducto').val(producto.CODIGO);
            $('#txtProducto').val(producto.DESC_ADM);
            $('#cboUMP').select2('val', producto.UNIDAD);

            $('#divBuscarProducto').modal('hide');
        });

        $('#btnBuscar').click(function () {
            $('#tblProductos').DataTable().destroy();
            $('#tblProductos').DataTable({
                ajax: {
                    type: 'post',
                    url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=LISTAR_PRODUCTOS_TERMINADOS',
                    async: false,
                    cache: false,
                    data: { CTLG_CODE: $('#cboEmpresa').val() },
                    dataSrc: ''
                },
                responsive: true, info: false,
                columns: [
                    { data: 'CODIGO', visible: false },
                    { data: 'CODIGO_ANTIGUO', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                    { data: 'DESC_ADM' },
                    { data: 'UNIDAD', visible: false }
                ]
            });
            var page = ($('#divBuscarProducto').data('pagina') === undefined) ? 0 : $('#divBuscarProducto').data('pagina');
            $('#tblProductos').DataTable().page(page).draw(false);
            $('#divBuscarProducto').modal('show');
        });

        $('#divBuscarProducto').on('hidden.bs.modal', function () {
            $('#divBuscarProducto').data('pagina', $('#tblProductos').DataTable().page());
        });

        $('#chkNombreComercial').click(function () {
            $('#tblInsumos').DataTable().column(2).visible(!$('#chkNombreComercial').is(':checked'));
            $('#tblInsumos').DataTable().column(3).visible($('#chkNombreComercial').is(':checked'));
            $('#tblInsumos').removeAttr('style');
        });
    };

    var sumaPorcentajeDerivados = function () {
        var porcentajes = $('#tblDerivados').DataTable().column(6).data().toArray();
        var suma = 0;
        for (var i = 0; i < porcentajes.length; i++) {
            suma += parseFloat(porcentajes[i]);
        }
        suma += parseFloat($('#txtPorcentajeCosto').val());
        return suma;
    };

    var contieneInsumo = function (codigo) {
        var insumos = $('#tblInsumos').DataTable().column(0).data().toArray();
        return insumos.indexOf(codigo) > -1;
    };

    var contieneDerivado = function (codigo) {
        var derivados = $('#tblDerivados').DataTable().column(0).data().toArray();
        return derivados.indexOf(codigo) > -1;
    };

    var contieneMaquinaria = function (codigo) {
        var maquinarias = $('#tblMaquinarias').DataTable().column(0).data().toArray();
        return maquinarias.indexOf(codigo) > -1;
    };

    var listarInsumos = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $('#tblInsumos').DataTable().destroy();
            $('#tblInsumos').DataTable({
                responsive: true, filter: false, info: false,
                ajax: {
                    type: 'post',
                    url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=LISTAR_INSUMOS_FORMULACION&CODIGO=' + codigo,
                    async: false,
                    dataSrc: ''
                },
                columns: [
                    { data: 'CODIGO', visible: false },
                    { data: 'CODIGO_ANTIGUO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                    { data: 'INSUMO', visible: !$('#chkNombreComercial').is(':checked') },
                    { data: 'NOMBRE_COMERCIAL', visible: $('#chkNombreComercial').is(':checked') },
                    { data: 'CANTIDAD', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                    { data: 'MERMA', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                    { data: 'UNID_CODE', visible: false },
                    { data: 'UNIDAD_MEDIDA', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                    {
                        data: null,
                        defaultContent: '<a class="btn red"><i class="icon-trash" style="line-heigth: inline"></i></a>',
                        createdCell: function (cell) {
                            $(cell).css('text-align', 'center');
                        },
                        width: '10%'
                    }
                ]
            });
        }
    };

    var eliminarInsumo = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblInsumos').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=ELIMINAR_INSUMO&CODIGO=' + codigo + '&PROD_CODE=' + data.CODIGO,
                async: false
            }).done(function (data) {
                exito();
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
    };

    var listarDerivados = function () {
        var codigo = ObtenerQueryString('codigo');
        $('#tblDerivados').DataTable().destroy();
        $('#tblDerivados').DataTable({
            responsive: true, filter: false, info: false,
            ajax: {
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=LISTAR_DERIVADOS_FORMULACION&CODIGO=' + codigo,
                async: false,
                data: {},
                dataSrc: ''
            },
            columns: [
                { data: 'CODIGO', visible: false },
                { data: 'CODIGO_ANTIGUO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                { data: 'DERIVADO' },
                { data: 'CANTIDAD', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                { data: 'UNID_CODE', visible: false },
                { data: 'UNIDAD_MEDIDA', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                { data: 'PORCENTAJE_COSTO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '12%'); } },
                {
                    data: null,
                    defaultContent: '<a class="btn red"><i class="icon-trash" style="line-heigth: inline"></i></a>',
                    createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                        $(cell).css('text-align', 'center');
                    },
                    width: '10%'
                }
            ]
        });
    };

    var eliminarDerivado = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblDerivados').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=ELIMINAR_DERIVADO&CODIGO=' + codigo + '&PROD_CODE=' + data.CODIGO,
                async: false
            }).done(function (data) {
                exito();
                listarDerivados();
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al intentar eliminar derivado.');
                Desbloquear('ventana');
            });
        } else {
            var fila = $('#tblDerivados').DataTable().row(fila);
            fila.remove().draw();
        }
    };

    var listarMaquinariasEquipos = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=LISTAR_MAQUINARIAS_FORMULACION&CODIGO=' + codigo,
                async: false
            }).done(function (data) {
                $('#tblMaquinarias').DataTable().destroy();
                if (data !== null) {
                    $('#tblMaquinarias').DataTable({
                        responsive: true, filter: false, info: false,
                        data: data,
                        columns: [
                            { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '15%'); } },
                            { data: 'MAQUINARIA' },
                            { data: 'CANTIDAD', createdCell: function (cell) { $(cell).css('text-align', 'center').css('width', '16%'); } },
                            {
                                data: null,
                                defaultContent: '<a class="btn red"><i class="icon-trash" style="line-heigth: inline"></i></a>',
                                createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '10%'
                            }
                        ]
                    });
                } else {
                    $('#tblMaquinarias').DataTable({ responsive: true, filter: false, paging: false, info: false, data: [] });
                }
            }).error(function (msg) {
                alertCustom('Error al listar maquinarias/equipos de la formulación.');
            });
        }
    };

    var eliminarMaquinariaEquipo = function (fila) {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var row = $('#tblMaquinarias').DataTable().row(fila);
            var data = row.data();
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=ELIMINAR_MAQUINARIA&CODIGO=' + codigo + '&GRUP_CODE=' + data.CODIGO,
                async: false
            }).done(function (data) {
                exito();
                listarMaquinariasEquipos();
                Desbloquear('ventana');
            }).error(function (msg) {
                alertCustom('Error al intentar eliminar maquinaria/equipo.');
                Desbloquear('ventana');
            });
        } else {
            var fila = $('#tblMaquinarias').DataTable().row(fila);
            fila.remove().draw();
        }
    };

    var cargarSubgruposMAEQ = function () {
        var select = $('#cboMaquinaria');
        $.ajax({
            type: "post",
            url: "vistas/MP/ajax/MPMFORP.ashx?OPCION=LISTAR_SUBGRUPOS",
            contenttype: "application/json",
            datatype: "json",
            data: { CTLG_CODE: $('#cboEmpresa').val() },
            async: false
        }).done(function (data) {
            if (data !== null) {
                select.html('<option></option>');
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            }
        }).fail(function (msg) {
            infoCustom2('No se han encontrado subgrupos de maquinaria/equipos, o no se han podido cargar.');
        });
    };

    var cargarFormulacion = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=S&CODIGO=' + codigo,
                async: false
            }).done(function (data) {
                if (data !== null) {
                    $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                    $('#chkEstado').prop('disabled', false)
                    if (data[0].ESTADO === 'INACTIVO') {
                        $('#chkEstado').parent().removeClass('checked');
                    }
                    $('#chkEstado').prop('checked', (data[0].ESTADO === 'ACTIVO'));
                    $('#cboEmpresa').select2('val', data[0].CTLG_CODE).change().prop('disabled', true);
                    $('#txtPatente').val(data[0].ALMC_CODE);
                    $('#txtCodigo').val(data[0].CODIGO);
                    $('#txtCodigoProducto').val(data[0].PROD_CODE);
                    $('#txtProducto').val(data[0].PRODUCTO);
                    $('#cboProceso').select2('val', data[0].PROC_CODE);
                    $('#txtHoras').val(data[0].HORAS);
                    $('#cboTiempo').select2('val', data[0].TIEMPO);
                    $('#txtCant').val(data[0].CANTIDAD);
                    $('#cboUMP').select2('val', data[0].UNID_CODE);
                    $('#btnBuscar').addClass('hidden');

                    listarInsumos();
                    listarDerivados();
                    listarMaquinariasEquipos();
                }
                Desbloquear('ventana');
            }).error(function (msg) {
                Desbloquear('ventana');
            });
        }
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            cargarProcesosProductivos();
            cargarUnidades();
            cargarInsumos();
            autocompletarInsumos();
            autocompletarDerivados();
            cargarSubgruposMAEQ();
            eventos();
            cargarFormulacion();
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
            $(select).html('');
            for (var i = 0; i < data.length; i++) {
                $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
            }
        },
        error: function (msg) {
            alertCustom('Error al cargar empresas.');
        }
    });
};

var Grabar = function () {
    if (vErrors(['cboEmpresa', 'txtProducto', 'cboProceso', 'txtHoras', 'txtCant', 'cboUMP'])) {
        if (parseFloat($('#txtCant').val()) > 0) {
            var cant_insumos = $('#tblInsumos').DataTable().data().toArray().length;
            var cant_derivados = $('#tblDerivados').DataTable().data().toArray().length;
            var cant_maquinarias = $('#tblMaquinarias').DataTable().data().toArray().length;
            if (!(cant_insumos === 0 && cant_derivados === 0 && cant_maquinarias === 0)) {
                Bloquear('ventana');
                var INSUMOS = $('#tblInsumos').DataTable().column(0).data().toArray().toString().concat(',');
                var CANTIDADES = $('#tblInsumos').DataTable().column(4).data().toArray().toString().concat(',');
                var MERMAS = $('#tblInsumos').DataTable().column(5).data().toArray().toString().concat(',');
                var UNIDADES = $('#tblInsumos').DataTable().column(6).data().toArray().toString().concat(',');

                var MAQUINARIAS = $('#tblMaquinarias').DataTable().column(0).data().toArray().toString().concat(',');
                var CANTIDADES_M = $('#tblMaquinarias').DataTable().column(2).data().toArray().toString().concat(',');

                var DERIVADOS = $('#tblDerivados').DataTable().column(0).data().toArray().toString().concat(',');
                var CANTIDADES_D = $('#tblDerivados').DataTable().column(3).data().toArray().toString().concat(',');
                var UNIDADES_D = $('#tblDerivados').DataTable().column(4).data().toArray().toString().concat(',');
                var PORCENTAJES_COSTO_D = $('#tblDerivados').DataTable().column(6).data().toArray().toString().concat(',');
                $.ajax({
                    type: 'post',
                    url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=G',
                    data: {
                        CTLG_CODE: $('#cboEmpresa').val(), ALMC_CODE: $('#txtPatente').val().toUpperCase(), PROD_CODE: $('#txtCodigoProducto').val(),
                        PROC_CODE: $('#cboProceso').val(), HORAS: $('#txtHoras').val(), TIEMPO: $('#cboTiempo').val(),
                        CANTIDAD: $('#txtCant').val(), UNID_CODE: $('#cboUMP').val(),
                        INSUMOS: INSUMOS, UNIDADES: UNIDADES, CANTIDADES: CANTIDADES, MERMAS: MERMAS,
                        DERIVADOS: DERIVADOS, CANTIDADES_D: CANTIDADES_D, UNIDADES_D: UNIDADES_D,
                        MAQUINARIAS: MAQUINARIAS, CANTIDADES_M: CANTIDADES_M,
                        USUA_ID: $('#ctl00_txtus').val(), PORCENTAJES_COSTO_D: PORCENTAJES_COSTO_D
                    },
                    async: false,
                    cache: false,
                    success: function (data) {
                        $('#txtCodigo').val(data);
                        $('#cboEmpresa').prop('disabled', true);
                        window.history.pushState("Object", "Formulación de Productos", "/Default.aspx?f=MPMFORP&codigo=" + data);
                        $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                        $('#btnBuscar').addClass('hidden');
                        exito();
                        Desbloquear('ventana');
                    },
                    error: function (msg) {
                        alertCustom('Error al guardar nueva formulación de productos.');
                        Desbloquear('ventana');
                    }
                });
            } else {
                alertCustom('Por favor, agregue al menos un insumo, derivado o maquinaria/equipo a la formulación.');
            }
        } else {
            alertCustom('Ingrese una cantidad mayor a cero.');
        }
    }
};

var Actualizar = function () {
    if (vErrors(['cboEmpresa', 'txtProducto', 'cboProceso', 'txtHoras', 'txtCant', 'cboUMP'])) {
        if (parseFloat($('#txtCant').val()) > 0) {
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMFORP.ashx?OPCION=A',
                data: {
                    CODIGO: $('#txtCodigo').val(), ALMC_CODE: $('#txtPatente').val().toUpperCase(), PROC_CODE: $('#cboProceso').val(),
                    PROD_CODE: $('#txtCodigoProducto').val(), HORAS: $('#txtHoras').val(), TIEMPO: $('#cboTiempo').val(),
                    CANTIDAD: $('#txtCant').val(), UNID_CODE: $('#cboUMP').val(), USUA_ID: $('#ctl00_txtus').val(),
                    ESTADO: $('#chkEstado').is(':checked') ? 'A' : 'I'
                },
                async: false,
                cache: false,
                success: function (data) {
                    if (data === 'OK') {
                        exito();
                    }
                    else {
                        noexito();
                    }
                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alertCustom('Error al guardar nueva formulación de productos.');
                    Desbloquear('ventana');
                }
            });
        } else {
            alertCustom('Ingrese una cantidad mayor a cero.');
        }
    }
};
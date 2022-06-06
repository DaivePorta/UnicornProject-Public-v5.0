var MPLCOEN = function () {

    var plugins = function () {
        $('select').select2();
    };

    var listarDataTable = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCOEN.ashx',
            async: false,
            data: { OPCION: 'S', CODIGO: '', CTLG_CODE: '', SCSL_CODE: '', ESTADO: '' }
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
                    { data: 'DESCRIPCION' },
                    {
                        data: 'UNIDAD_MEDIDA',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'VALOR',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'MONTO',
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
                        <a class="toggle-vis" data-column="1" href="#">DESCRIPCION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">UNIDAD</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">VALOR</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">MONTO MN</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">ESTADO</a>\
                    </div>');

            $('#tblLISTA tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $(this).addClass('selected');
                    var row = $('#tblLISTA').DataTable().row(this).data();
                    var codigo = row.CODIGO;
                    window.location.href = '?f=MPMCOEN&codigo=' + codigo;
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
                $.post("vistas/MP/ajax/MPMCOEN.ashx", { OPCION: 'AE', CODIGO: code, USUA_ID: $('#ctl00_txtus').val() },
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
            $('#tblLISTA').DataTable().column(7).search($(this).val()).draw();
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

var MPMCOEN = function () {

    var plugins = function () {
        $('select').select2();
    };

    var cargarUnidades = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=11",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboUnidad').html('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboUnidad').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar unidades de medida.');
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val());
        });
    };

    var cargar = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/MP/ajax/MPMCOEN.ashx',
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                data: { OPCION: 'S', CODIGO: codigo, CTLG_CODE: '', SCSL_CODE: '', ESTADO: '' }
            }).success(function (data) {
                if (data !== null) {
                    $('#txtCodigo').val(data[0].CODIGO);
                    $('#cboEmpresa').select2('val', data[0].CTLG_CODE).change();
                    $('#cboSucursal').select2('val', data[0].SCSL_CODE);
                    if (data[0].ESTADO === 'INACTIVO') {
                        $('#chkEstado').prop('checked', false).parent().removeClass('checked');
                    }
                    $('#txtDescripcion').val(data[0].DESCRIPCION);
                    $('#txtValor').val(data[0].VALOR);
                    $('#cboUnidad').select2('val', data[0].UNME_CODE);
                    $('#txtMonto').val(data[0].MONTO);
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
            cargarUnidades();
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
    if (vErrors(['cboEmpresa', 'cboSucursal', 'txtDescripcion', 'txtValor', 'cboUnidad', 'txtMonto'])) {
        Bloquear('ventana');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCOEN.ashx',
            async: false,
            data: {
                OPCION: 'G', CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(),
                DESCRIPCION: $('#txtDescripcion').val(), VALOR: $('#txtValor').val(),
                UNME_CODE: $('#cboUnidad').val(), MONTO: $('#txtMonto').val(),
                USUA_ID: $('#ctl00_txtus').val()
            }
        }).done(function (data) {
            exito();
            $('#txtCodigo').val(data);
            $('#chkEstado').prop('disabled', false);
            $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
            window.history.pushState("Object", "Administración de Flotas", "/Default.aspx?f=MPMCOEN&codigo=" + data);
            Desbloquear('ventana');
        }).error(function (msg) {
            alertCustom('Error al intentar grabar nueva asignación de flota.');
            Desbloquear('ventana');
        });
    }
};

var Actualizar = function () {
    if (vErrors(['cboEmpresa', 'cboSucursal', 'txtDescripcion', 'txtValor', 'cboUnidad', 'txtMonto'])) {
        Bloquear('ventana');
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPMCOEN.ashx',
            async: false,
            data: {
                OPCION: 'A', CODIGO: $('#txtCodigo').val(),
                CTLG_CODE: $('#cboEmpresa').val(), SCSL_CODE: $('#cboSucursal').val(),
                DESCRIPCION: $('#txtDescripcion').val(), VALOR: $('#txtValor').val(),
                MONTO: $('#txtMonto').val(), UNME_CODE: $('#cboUnidad').val(),
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
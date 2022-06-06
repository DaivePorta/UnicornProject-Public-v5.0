var MPLPROC = function () {
    var plugins = function () {
        $('select').select2();
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            $('#tblLISTA').DataTable().column(5).search($(this).val()).draw();
        });
    };

    var listarProcesos = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/MP/ajax/MPLPROC.ashx?OPCION=S',
            data: { CODIGO: '', CTLG_CODE: '' },
            async: false
        }).done(function (data) {
            $('#tblLISTA').DataTable({
                responsive: true,
                sDom: 'T<"clear">lfrtip',
                oTableTools: {
                    "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        { "sExtends": "copy", "sButtonText": "Copiar" },
                        { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                        { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                    ]
                },
                data: data,
                columns: [
                    { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                    { data: 'PROCESO' },
                    { data: 'DESCRIPCION' },
                    { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                    { data: null, defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                    { data: 'CTLG_CODE', visible: false }
                ]
            });

            $('#tblLISTA tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $(this).addClass('selected');
                    var row = $('#tblLISTA').DataTable().row(this).data();
                    var codigo = row.CODIGO;
                    console.log(codigo);
                    window.location.href = '?f=MPMPROC&codigo=' + codigo;
                }
            });

            $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">PROCESO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">DESCRIPCION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">ESTADO</a>\
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
                $.post("vistas/MP/ajax/MPLPROC.ashx", { OPCION: 'AE', CODIGO: code, USUA_ID: $('#ctl00_txtus').val() },
                    function (res) {
                        if (res !== null) {
                            if (res === "I") res = "INACTIVO";
                            else res = "ACTIVO";
                            $('#tblLISTA').DataTable().cell(pos, 3).data(res).draw();
                            exito();
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    });
            });
        }).error(function (msg) {
            alertCustom('Error al listar Formulaciones de Productos.');
        });
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            listarProcesos();
            eventos();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
        }
    };
}();

var MPMPROC = function () {
    var plugins = function () {
        $('select').select2();
    };

    var cargarProceso = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: 'POST',
                url: 'vistas/MP/ajax/MPLPROC.ashx?OPCION=S',
                datatype: 'json',
                data: { CODIGO: codigo, CTLG_CODE: $('#cboEmpresa').val() },
                async: false,
            }).done(function (data) {
                $('#txtCodigo').val(data[0].CODIGO);
                $('#cboEmpresa').select2('val', data[0].CTLG_CODE);
                $('#txtProceso').val(data[0].PROCESO);
                $('#txtDescripcion').val(data[0].DESCRIPCION);
                $('#chkEstado').prop('checked', (data[0].ESTADO === 'ACTIVO'));
                if (data[0].ESTADO === 'INACTIVO') {
                    $('#chkEstado').parent().removeClass('checked');
                }
                $('#cboEmpresa').prop('disabled', true);
                $('#chkEstado').prop('disabled', false);
                $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
            }).fail(function (msg) {
                alertCustom('Error al cargar los datos del proceso productivo.');
            });
        }
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
            cargarProceso();
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
    if (vErrors(['txtProceso', 'txtDescripcion'])) {
        Bloquear('ventana');
        $.ajax({
            type: "post",
            url: 'vistas/MP/ajax/MPLPROC.ashx?OPCION=G',
            datatype: "json",
            data: { CTLG_CODE: $('#cboEmpresa').val(), PROCESO: $('#txtProceso').val(), DESCRIPCION: $('#txtDescripcion').val(), USUA_ID: $('#ctl00_txtus').val() },
            async: false
        }).done(function (data) {
            if (!isNaN(parseInt(data))) {
                $('#txtCodigo').val(data);
                $('#cboEmpresa').prop('disabled', true);
                $('#chkEstado').prop('disabled', false);
                window.history.pushState("Object", "Proceso de Producción", "/Default.aspx?f=MPMPROC&codigo=" + data);
                $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                exito();
            } else {
                noexito();
            }
            Desbloquear('ventana');
        }).fail(function (msg) {
            noexito();
            Desbloquear('ventana');
        });
    }
};

var Actualizar = function () {
    if (vErrors(['txtProceso', 'txtDescripcion'])) {
        Bloquear('ventana');
        $.ajax({
            type: "post",
            url: 'vistas/MP/ajax/MPLPROC.ashx?OPCION=A',
            datatype: "json",
            data: { CODIGO: ObtenerQueryString('codigo'), PROCESO: $('#txtProceso').val(), DESCRIPCION: $('#txtDescripcion').val(), ESTADO: ($('#chkEstado').is(':checked') ? 'A' : 'I'), USUA_ID: $('#ctl00_txtus').val() },
            async: false
        }).done(function (data) {
            if (data === 'OK') { exito(); } else { noexito(); }
            Desbloquear('ventana');
        }).fail(function (msg) {
            noexito();
            Desbloquear('ventana');
        });
    }
};
var NOLCSPR = function () {
    var plugins = function () {

        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();



    }

    var eventoControles = function () {
        $('#cboEmpresas').on('change', function () {
            cargarSucursales();
            $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            listar();
        });

        $('#cboEstablecimiento').on('change', function () {
            listar();
        });
    }

    var cargarEmpresas = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            data: { USUA_ID: $('#ctl00_txtus').val() }
        }).done(function (data) {
            $('#cboEmpresas').html('<option></option>');
            if (data !== null) {
                for (var i in data) {
                    $('#cboEmpresas').append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            }
        }).fail(function () {
            alertCustom('Error al listar empresas.');
        });
    }

    var cargarSucursales = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            data: { CTLG_CODE: $('#cboEmpresas').val() }
        }).done(function (data) {
            $('#cboEstablecimiento').html('<option value="">TODOS</option>');
            if (data !== null) {
                for (var i in data) {
                    selectEst.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            }
        }).fail(function () {
            alertCustom('Error al listar sucursales.');
        });
    };

    var listar = function () {
        $("#tblProductos").DataTable().destroy();
        $("#tblProductos").DataTable({
            ajax: {
                type: "POST",
                url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=15",
                async: false,
                data: { CTLG_CODE: $('#cboEmpresas').val(), p_ESTABLECIMIENTO: $('#cboEstablecimiento').val(), P_CABEUSUARIO: $('#ctl00_txtus').val(), P_ESTADOCABECE: $('#cboEstado').val() },
                dataSrc: ''
            },
            order: [[0, 'desc']],
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            columns: [
                { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'USUARIO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'GLOSA', createdCell: function (cell) { $(cell).css('width', '20%') } },
                { data: 'EMPRESA', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'SUCURSAL', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'FECHA', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'USUARIO_APROBADO', createdCell: function (cell) { $(cell).css('width', '20%') } }
            ]
        });

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
        <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
        <div id="enlaces" style="display: inline-block">\
            <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            <a class="toggle-vis" data-column="1" href="#">USUARIO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            <a class="toggle-vis" data-column="2" href="#">GLOSA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            <a class="toggle-vis" data-column="3" href="#">EMPRESA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            <a class="toggle-vis" data-column="4" href="#">SUCURSAL</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            <a class="toggle-vis" data-column="5" href="#">FECHA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            <a class="toggle-vis" data-column="6" href="#">ESTADO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
            <a class="toggle-vis" data-column="7" href="#">USUARIO APROBADO</a>\
        </div>');

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblProductos').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });

        $('#tblProductos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var row = $('#tblProductos').DataTable().row(this).data();
                var codigo = row.CODIGO;
                window.location.href = '?f=NOMCSPR&codigo=' + codigo;
            }
        });
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            cargarEmpresas();
            $('#cboEmpresas').select2('val', $('#ctl00_hddctlg').val()).change();
        }
    };

}();
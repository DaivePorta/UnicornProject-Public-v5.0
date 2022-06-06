var CBLCMOP = function () {

    var dataTable = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/CB/ajax/CBMCMOP.ashx',
            async: false,
            data: { OPCION: 'S', CODIGO: '' }
        }).done(function (data) {
            $('#tblComisiones').DataTable({
                responsive: true,
                data: data,
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
                columns: [
                    {
                        data: 'CODIGO',
                        width: '12%',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'OPERADOR',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'COMISION_TOTAL_DEBITO',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'COMISION_TOTAL_CREDITO',
                        width: '11%',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'COMISION_EMISORES',
                        width: '11%',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'COMISION_OPERADOR',
                        width: '11%',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    },
                    {
                        data: 'IGV',
                        width: '11%',
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
                        width: '12%',
                        createdCell: function (cell, cellData, row, rowData, rowIndex, colIndex) {
                            $(cell).css('text-align', 'center');
                        }
                    }
                ]
            });

            $('#tblComisiones').removeAttr('style');

            $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">OPERADOR</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">FORMA DE PAGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">COMISION TOTAL</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">COMISION EMISORES</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">COMISION OPERADOR</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="6" href="#">IGV</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="7" href="#">ESTADO</a>\
                    </div>');

            $('a.toggle-vis').on('click', function (e) {
                e.preventDefault();
                var column = $('#tblComisiones').DataTable().column($(this).attr('data-column'));
                column.visible(!column.visible());
            });

            $('#tblComisiones tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $(this).addClass('selected');
                    var row = $('#tblComisiones').DataTable().row($(this)).data();
                    var codigo = row.CODIGO;
                    window.location.href = '?f=CBMCMOP&codigo=' + codigo;
                }
            });

            $('#tblComisiones tbody').on('click', 'a', function () {
                $(this).parent().parent().addClass('selected');
                var pos = $('#tblComisiones').DataTable().row($(this).parent().parent()).index();
                var row = $('#tblComisiones').DataTable().row(pos).data();
                var code = row.CODIGO;

                Bloquear("ventana");
                $.ajaxSetup({ async: false });
                $.post("vistas/CB/ajax/CBMCMOP.ashx", { OPCION: 'AE', CODIGO: code, USUA_ID: $('#ctl00_txtus').val() },
                    function (res) {
                        if (res !== null) {
                            if (res == "I") res = "INACTIVO";
                            else res = "ACTIVO";
                            $('#tblComisiones').DataTable().cell(pos, 7).data(res).draw();
                            exito();
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    });
            });
        }).error(function (msg) {
            alertCustom('Error al listar Comisiones.');
        });
    };

    return {
        init: function () {
            dataTable();
        }
    };
}();

var CBMCMOP = function () {

    var cargarOperadores = function () {
        var select = $('#cboOperador');
        $.ajax({
            type: 'post',
            url: 'vistas/CB/ajax/CBMOPTR.ashx',
            async: false,
            data: { OPCION: '0', CODIGO: '' }
        }).done(function (data) {
            select.html('<option></option>');
            for (var i = 0; i < data.length; i++) {
                select.append('<option value="' + data[i].CODIGO + '">' + data[i].NOMBRE_COMERCIAL + '</option>');
            }
        }).error(function (msg) {
            alertCustom('Error al listar Operadores.');
        });
    };

    var cargarFormasPago = function () {
        var select = $('#txtComisionTotalDeb');
        $.ajax({
            type: 'post',
            url: 'vistas/CB/ajax/CBMCMOP.ashx',
            async: false,
            data: { OPCION: 'LISTAR_FORMAS_PAGO' }
        }).done(function (data) {
            select.html('<option></option>');
            for (var i = 0; i < data.length; i++) {
                select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION_CORTA + '</option>');
            }
        }).error(function (msg) {
            alertCustom('Error al listar Formas de Pago.');
        });
    };

    var eventos = function () {
    };

    var plugins = function () {
        $('select').select2();
    };

    var cargar = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: 'post',
                url: 'vistas/CB/ajax/CBMCMOP.ashx',
                async: false,
                data: { OPCION: 'S', CODIGO: codigo }
            }).done(function (data) {
                if (data !== null) {
                    $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                    $('#chkEstado').prop('disabled', false);
                    $('#cboOperador').prop('disabled', true);
                    $('#txtCodigo').val(data[0].CODIGO);
                    var estado = data[0].ESTADO === 'ACTIVO';
                    $('#chkEstado').prop('checked', estado);
                    if (!estado) { $('#chkEstado').parent().removeClass('checked') }
                    $('#cboOperador').select2('val', data[0].OPTR_CODE);
                    $('#txtComisionTotalDeb').val(data[0].COMISION_TOTAL_DEBITO);
                    $('#txtComisionTotalCre').val(data[0].COMISION_TOTAL_CREDITO);
                    $('#txtComisionEmisores').val(data[0].COMISION_EMISORES);
                    $('#txtComisionOperador').val(data[0].COMISION_OPERADOR);
                    $('#txtIGV').val(data[0].IGV);
                }
            }).error(function (msg) {
                alertCustom('Error al listar Formas de Pago.');
            });
        }
    };

    return {
        init: function () {
            plugins();
            cargarOperadores();
            cargarFormasPago();
            cargarigv()
            eventos();
            cargar();
        }
    };
}();

var Grabar = function () {
    if (vErrors(['cboOperador', 'txtComisionTotalDeb', 'txtComisionTotalCre', 'txtComisionEmisores', 'txtComisionOperador', 'txtIGV'])) {
        if (parseFloat($('#txtComisionEmisores').val()) > 0 && parseFloat($('#txtComisionOperador').val()) > 0 && parseFloat($('#txtIGV').val()) > 0) {
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/CB/ajax/CBMCMOP.ashx',
                async: false,
                data: {
                    OPCION: 'G', OPTR_CODE: $('#cboOperador').val(), COMISION_TOTAL_DEBITO: $('#txtComisionTotalDeb').val(), COMISION_TOTAL_CREDITO: $('#txtComisionTotalCre').val(),
                    COMISION_EMISORES: $('#txtComisionEmisores').val(), COMISION_OPERADOR: $('#txtComisionOperador').val(), IGV: $('#txtIGV').val(),
                    USUA_ID: $('#ctl00_txtus').val()
                }
            }).done(function (data) {
                Desbloquear('ventana');
                exito();
                $('#txtCodigo').val(data);
                $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                window.history.pushState("Object", "Comisiones Operador de Tarjeta", "/Default.aspx?f=CBMCMOP&codigo=" + data);
                $('#cboOperador').prop('disabled', true);
                $('#chkEstado').prop('disabled', false);
            }).error(function (msg) {
                Desbloquear('ventana');
                alertCustom('Comisiones para Operador ' + $('#cboOperador :selected').text() + ' ya registradas.');
            });
        } else {
            alertCustom('Ingrese comisiones mayores a cero.');
        }
    }
};

var Actualizar = function () {
    if (vErrors(['cboOperador', 'txtComisionTotalDeb', 'txtComisionTotalCre', 'txtComisionEmisores', 'txtComisionOperador', 'txtIGV'])) {
        if (parseFloat($('#txtComisionEmisores').val()) > 0 && parseFloat($('#txtComisionOperador').val()) > 0 && parseFloat($('#txtIGV').val()) > 0) {
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/CB/ajax/CBMCMOP.ashx',
                async: false,
                data: {
                    OPCION: 'A', CODIGO: $('#txtCodigo').val(), OPTR_CODE: $('#cboOperador').val(), COMISION_TOTAL_DEBITO: $('#txtComisionTotalDeb').val(),
                    COMISION_TOTAL_CREDITO: $('#txtComisionTotalCre').val(), COMISION_EMISORES: $('#txtComisionEmisores').val(), COMISION_OPERADOR: $('#txtComisionOperador').val(),
                    IGV: $('#txtIGV').val(), USUA_ID: $('#ctl00_txtus').val(), ESTADO_IND: $('#chkEstado').is(':checked') ? 'A' : 'I'
                }
            }).done(function (data) {
                Desbloquear('ventana');
                exito();
            }).error(function (msg) {
                Desbloquear('ventana');
                alertCustom('Comisiones para Operador ' + $('#cboOperador :selected').text() + ' ya registradas.');
            });
        } else {
            alertCustom('Ingrese comisiones mayores a cero.');
        }
    }
};


function cargarigv() {

    $.ajax({
        type: "post",
        url: "vistas/CB/ajax/CBMCMOP.ashx?OPCION=IGV",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $("#txtIGV").val(parseFloat(datos) * 100);
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });

}
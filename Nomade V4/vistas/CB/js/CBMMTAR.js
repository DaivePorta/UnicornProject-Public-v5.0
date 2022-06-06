var CBLMTAR = function () {

    var listarMarcas = function () {
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfMarcasTarjeta').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MARCA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "TIPO_MARCA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        oTablaCajas = iniciaTabla('tblCajas', parms);

        $("#tblCajas").removeAttr("style");

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $('#tblCajas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablaCajas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablaCajas.fnGetPosition(this);
                var row = oTablaCajas.fnGetData(pos);
                var cod = row.CODIGO;

                window.location.href = '?f=CBMMTAR&codigo=' + cod;
            }
        });
    };

    return {
        init: function () {
            listarMarcas();
        }
    };

}();

var CBMMTAR = function () {

    var cargaInicial = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo == undefined) {
            $('#chkEstado').prop('disabled', true);
            $('#chkEstado').attr('checked', 'checked');
        } else {
            $('#btnGrabar').css('display', 'none');
            $('#btnActualizar').css('display', 'inline-block');
        }
    };

    var cargarMarca = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/CB/ajax/CBMMTAR.ashx?OPCION=0&CODIGO=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        $('#txtCodigo').val(datos[0].CODIGO);
                        $('#txtMarca').val(datos[0].MARCA);
                        if (datos[0].ESTADO == 'ACTIVO') {
                            $('#chkEstado').attr('checked', 'checked');
                        }
                        $('#cboTipoMarca').select2('val', datos[0].TIPO_MARCA);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    };

    var plugins = function () {
        $('#cboTipoMarca').select2();
    };

    return {
        init: function () {
            cargaInicial();
            cargarMarca();
            plugins();
        }
    };
}();

function Grabar() {
    if (vErrorsNotMessage(['txtMarca', 'cboTipoMarca'])) {
        var estado = "A";
        var marca = $('#txtMarca').val();
        var tipo = $('#cboTipoMarca').val();

        var data = new FormData();
        data.append('OPCION', '1');
        data.append('NOMBRE_MARCA', marca);
        data.append('TIPO_MARCA', tipo);
        data.append('ESTADO_MARCA', estado);

        Bloquear('marca');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CB/ajax/CBMMTAR.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("marca");
            if (res != null) {
                if (res != '0000') {
                    exito();
                    setTimeout(function () {
                        window.location = '?f=CBMMTAR&codigo=' + res;
                    }, 1200);
                } else {
                    noexito();
                }
            }
        })
        .error(function () {
            Desbloquear("marca");
            alert("Error al grabar Nueva Marca de Tarjeta. Por favor intente nuevamente.");
        });
    }
};

function Actualizar() {
    if (vErrorsNotMessage(['txtMarca', 'cboTipoMarca'])) {
        var codigo = $('#txtCodigo').val();
        var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var marca = $('#txtMarca').val();
        var tipo = $('#cboTipoMarca').val();

        var data = new FormData();
        data.append('OPCION', '2');
        data.append('CODIGO', codigo);
        data.append('NOMBRE_MARCA', marca);
        data.append('TIPO_MARCA', tipo);
        data.append('ESTADO_MARCA', estado);

        Bloquear('marca');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CB/ajax/CBMMTAR.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("marca");
            if (res != null) {
                if (res == 'OK') {
                    exito();
                } else {
                    noexito();
                }
            }
        })
        .error(function () {
            Desbloquear("marca");
            alert("Error al modificar Nueva Marca de Tarjeta. Por favor intente nuevamente.");
        });
    }
};
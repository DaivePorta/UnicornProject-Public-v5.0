var MPMGNLD = function () {
    var flagTb = false;

    var plugins = function () {
        $('#tblDetallefabricacion').DataTable({ paging: false, filter: false, info: false, });
        $('#txtFechaAnulacion').datepicker('setDate', 'now');
    };

    var listar = function () {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=6&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val(),
            success: function (datos) {
                if (datos != null && datos != "" && datos != "[+]") {
                    var json = $.parseJSON(datos)
                    oTable.fnClearTable()
                    oTable.fnAddData(json)
                } else {
                    oTable.fnClearTable()
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                Desbloquear("div");
                alertCustom('Error al listar');
            }
        });
    }

    var llenaTabla = function () {
        var parms = {
            data: [],
            order: [[0, 'desc']],
            columns: [
                {
                    data: "NRO_ORDEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "UNIDAD_MEDIDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CANTIDAD_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "RESPONSABLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        };

        $('#tblLISTA').dataTable().fnDestroy();

        oTable = iniciaTabla('tblLISTA', parms);
    }

    var eventoControles = function () {
        $('#btnAnular').click(function () {
            $('#divAnular').modal('show');
        });

        $('#btnCompletarAnulacion').click(function () {
            if (vErrors(['txtRazon'])) {
                Bloquear('divAnular');
                $.ajax({
                    type: 'post',
                    url: 'vistas/MP/ajax/MPLFLSO.ashx?OPCION=ANULAR_ORDEN_FAB',
                    data: { NRO_ORDEN: ObtenerQueryString('codigo') },
                    async: false
                }).done(function (data) {
                    if (data === 'OK') {
                        $('div.form-actions').parent().html('<div class="alert alert-error" style="margin-bottom: 0px"><strong><i class="icon-remove-sign"></i></strong>&nbsp;Documento Anulado</div>');
                        $('#divAnular').modal('hide');
                    }
                    Desbloquear('divAnular');
                }).fail(function () {
                    alertCustom('Error al intentar anular la orden de fabricación.');
                    Desbloquear('divAnular');
                });
            } else {
                setTimeout(function () { $('#txtRazon').parents('.control-group').removeClass('error') }, 2000);
            }
        });
    }

    var cargaInicial = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=6&CTLG_CODE=" + '' + "&SCSL_CODE=" + '' + "&P_CODEFABR=" + codigo,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null && datos != "" && datos != "[+]") {
                        var json = $.parseJSON(datos)
                        $('#txtOrden').val(json[0].NRO_ORDEN);
                        $('#txtfechaRegistro').val(json[0].FECHA_REGISTRO);
                        $('#txtProducto').val(json[0].PRODUCTO);
                        $('#txtDescripcion').val(json[0].DESCRIPCION);
                        $('#txtFabricacion').val(json[0].TIPO_FABRICACION);
                        $('#txtCantidad').val(json[0].CANTIDAD_TOTAL);
                        $('#txtResponsable').val(json[0].RESPONSABLE);
                        if (json[0].ESTADO == 'A') {
                            $('#chkFabri').click();
                        }
                        if (json[0].ANULADO_IND === 'S') {
                            $('div.form-actions').parent().html('<div class="alert alert-error" style="margin-bottom: 0px"><strong><i class="icon-remove-sign"></i></strong>&nbsp;Documento Anulado</div>');
                        }
                        if (json[0].CONFIG_IND === 'S') {
                            $('#btnAnular').parent().css('display', 'none');
                        }
                        datosLote(codigo);
                        listarDetalleFabricacion(codigo);
                        $('input[type=checkbox]').attr('disabled', true);
                        $('input[type=text]').attr('disabled', true);
                        $("#s2id_autogen1_search").attr('disabled', false)
                    }
                },
                error: function (msg) {
                    Desbloquear("div");
                    alertCustom('Error al listar');
                }
            });
        }
    }

    var listarDetalleFabricacion = function (codigo) {
        $('#tblDetallefabricacion').DataTable().destroy();
        $('#tblDetallefabricacion').DataTable({
            paging: false,
            filter: false,
            info: false,
            order: [[0, 'desc']],
            ajax: {
                type: "POST",
                url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=8&P_CODEFABR=" + codigo + '&P_CODE_DETALLE_FLUJO=' + '',
                async: false,
                dataSrc: ''
            },
            columns: [
                {
                    data: "CODE_OFA",
                    createdCell: function (td) { $(td).css('text-align', 'center') }, width: '37.5%'
                },
                {
                    data: "CODE_FLUJO",
                    createdCell: function (td) { $(td).css('text-align', 'center') }, width: '37.5%'
                },
                {
                    data: "CANTIDAD",
                    createdCell: function (td) { $(td).css('text-align', 'center') }, width: '25%'
                }
            ]
        });
    }

    var datosLote = function (code) {
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=7&P_CODEFABR=" + code,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)

                    $('#txtnrolote').val(json[0].CODE);
                    $('#txtArea').val(json[0].SECCION);
                    $('#txtLoteFechaini').val(json[0].FECHA_INI);
                    $('#txtLoteFechaFin').val(json[0].FECHA_FIN);
                    $('#txtCantidadLote').val(json[0].CANTIDAD);

                    if (json[0].ESTADO == 'A') {
                        $('#chkLote').click();
                    }



                }
                else {



                }
            },
            error: function () {
                Desbloquear("div");
                alertCustom();
            }
        });
    }

    return {
        init: function () {
            plugins();
            cargaInicial();
            eventoControles();
        }
    };
}();


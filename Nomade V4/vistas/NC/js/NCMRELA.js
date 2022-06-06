var beneficios = [];

var NCLRELA = function () {

    var listarRegimenes = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=S',
            data: { CODIGO: '' },
            async: false,
            success: function (data) {
                if (data !== null) {
                    $('#tblLISTA').DataTable({
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
                        responsive: true,
                        data: data,
                        columns: [
                            {
                                data: 'CODIGO',
                                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                                    $(cell).css('text-align', 'center');
                                }
                            },
                            { data: 'DENOMINACION' },
                            {
                                data: 'ACRONIMO',
                                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                                    $(cell).css('text-align', 'center');
                                }
                            },
                            {
                                data: 'ESTADO',
                                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                                    $(cell).css('text-align', 'center');
                                }
                            },
                            {
                                data: null,
                                defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                                    $(cell).css('text-align', 'center');
                                }
                            }
                        ]
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

                        Bloquear("ventana");
                        $.ajaxSetup({ async: false });
                        $.post("vistas/NC/ajax/NCMRELA.ashx", { OPCION: 'AE', CODIGO: row.CODIGO, USUA_ID: $('#ctl00_txtus').val() },
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
                        $.ajaxSetup({ async: true });
                    });
                } else {
                    $('#tblLISTA').DataTable({
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
                        responsive: true,
                        data: []
                    });
                }
                $('#tblLISTA').removeAttr('style');

                $('#tblLISTA tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        $(this).addClass('selected');
                        var pos = $('#tblLISTA').DataTable().row(this).index();
                        var row = $('#tblLISTA').DataTable().row(pos).data();
                        var codigo = row.CODIGO;
                        window.location.href = '?f=NCMRELA&codigo=' + codigo;
                    }
                });

                $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">DENOMINACION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">ACRONIMO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">ESTADO</a>\
                    </div>');
            }
        });
    };

    return {
        init: function () {
            listarRegimenes();
        }
    };
}();

var NCMRELA = function () {

    var cargarBeneficios = function () {
        $.ajax({
            type: 'post',
            url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=LISTAR_BENEFICIOS',
            async: false
        }).done(function (data) {
            var select = $('#cboBeneficio').html('<option></option>');
            if (data !== null) {
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            }
        });
    };

    var eventoControles = function () {
        $('#chkGrati').change(function () {
            if ($(this).is(':checked')) {
                $('#divDatosGrati').css('display', 'block');
            } else {
                $('#divDatosGrati').css('display', 'none');
                $('#txtGratiFecha1, #txtGratiFecha2').val('');
            }
        });

        $('#chkCTS').change(function () {
            if ($(this).is(':checked')) {
                $('#divDatosCTS').css('display', 'block');
                $('#txtDiasCTS').val('15');
            } else {
                $('#divDatosCTS').css('display', 'none');
                $('#txtCTSFecha1, #txtCTSFecha2').val('');
                $('#txtDiasCTS').val('');
            }
        });

        $('#cboCantGrati').change(function () {
            if ($(this).val() === '2') {
                $('#txtGratiFecha2').parent().parent().parent().parent().css('display', 'block');
            } else {
                $('#txtGratiFecha2').val('');
                $('#txtGratiFecha2').parent().parent().parent().parent().css('display', 'none');
            }
        });

        $('#cboCantCTS').change(function () {
            if ($(this).val() === '2') {
                $('#txtCTSFecha2').parent().parent().parent().parent().css('display', 'block');
            } else {
                $('#txtCTSFecha2').val('');
                $('#txtCTSFecha2').parent().parent().parent().parent().css('display', 'none');
            }
        });

        $('#btnAgregar').click(function () {
            if (vErrors(['cboBeneficio'])) {
                var codigo = ObtenerQueryString('codigo');
                $('#tblBeneficios').DataTable().destroy();
                $('#tblBeneficios tbody').unbind('click');
                if (codigo === undefined) {
                    beneficios.push({
                        CODIGO: $('#cboBeneficio').val(),
                        DESCRIPCION: $('#cboBeneficio :selected').text()
                    });
                    $('#cboBeneficio').find('option[value=' + $('#cboBeneficio').val() + ']').prop('disabled', true);
                    $('#cboBeneficio').select2('val', '').change();
                    $('#tblBeneficios').DataTable({
                        responsive: true, filter: false, paging: false, info: false,
                        data: beneficios,
                        columns: [
                            {
                                data: 'CODIGO',
                                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                                    $(cell).css('text-align', 'center');
                                }
                            },
                            { data: 'DESCRIPCION' },
                            {
                                data: null,
                                defaultContent: '<button type="button" class="btn red"><i class="icon-minus"></i></button>'
                            }
                        ]
                    });
                    $('#tblBeneficios tbody').on('click', 'button', function () {
                        var row = $('#tblBeneficios').DataTable().row($(this).parents('tr'));
                        var data = row.data();
                        row.remove().draw();
                        $('#cboBeneficio').find('option[value=' + data.CODIGO + ']').prop('disabled', false);
                    });
                } else {
                    Bloquear('ventana');
                    $.ajax({
                        type: 'post',
                        url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=AGREGAR_BENEFICIO&CODIGO=' + codigo + '&BENSO_CODE=' + $('#cboBeneficio').val() + '&USUA_ID=' + $('#ctl00_txtus').val(),
                        async: false
                    }).done(function (data) {
                        exito();
                        listarBeneficios();
                        $('#cboBeneficio').find('option[value=' + $('#cboBeneficio').val() + ']').prop('disabled', true);
                        $('#cboBeneficio').select2('val', '').change();
                        Desbloquear('ventana');
                    }).error(function (msg) {
                        alertCustom('Error al intentar agregar nuevo beneficio.');
                        Desbloquear('ventana');
                    });
                }
            }
        });
    };

    var plugins = function () {
        $('select').select2();
        $('#tblBeneficios').DataTable({ responsive: true, filter: false, paging: false, info: false });
        $('#tblBeneficios_wrapper').find(':first').remove();
        $('#txt_porc_cts').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 3, "greedy": false }); });
    };

    var cargarRegimen = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            Bloquear('ventana');
            $.ajax({
                type: 'post',
                url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=S&CODIGO=' + codigo,
                async: false
            }).done(function (data) {
                if (data !== null) {
                    $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                    $('#chkEstado').prop('disabled', false)
                    if (data[0].ESTADO === 'INACTIVO') {
                        $('#chkEstado').parent().removeClass('checked');
                    }
                    $('#chkEstado').prop('checked', (data[0].ESTADO === 'ACTIVO'));
                    $('#txtCodigo').val(data[0].CODIGO);
                    $('#txtDenominacion').val(data[0].DENOMINACION);
                    $('#txtAcronimo').val(data[0].ACRONIMO);
                    $('#txtTiempoServicios').val(data[0].INDE_TIEMPO_SERV);
                    $('#txtAnioServicios').val(data[0].INDE_ANIO_SERV);
                    $('#txtJornada').val(data[0].JORNADA_SEMANAL);
                    $('#txtDespido').val(data[0].PERIODO_SIN_DESPIDO);
                    $('#txtVacaciones').val(data[0].VACACIONES);
                    $('#txt_porc_cts').val(data[0].PORC_CTS);
                    listarBeneficios();
                }
                Desbloquear('ventana');
            }).error(function (msg) {
                Desbloquear('ventana');
            });
        }
    };

    var listarBeneficios = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: 'post',
                url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=LISTAR_BENEFICIOS_REGLA&CODIGO=' + codigo,
                async: false
            }).done(function (data) {
                if (data !== null) {
                    $('#tblBeneficios').DataTable().destroy();
                    $('#tblBeneficios').DataTable({
                        responsive: true, filter: false, paging: false, info: false,
                        data: data,
                        columns: [
                            {
                                data: 'CODIGO',
                                createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                                    $(cell).css('text-align', 'center');
                                }
                            },
                            { data: 'DESCRIPCION' },
                            {
                                data: null,
                                defaultContent: '<button type="button" class="btn red"><i class="icon-minus"></i></button>'
                            }
                        ]
                    });
                    $(data).each(function () {
                        $('#cboBeneficio').find('option[value=' + $(this)[0].CODIGO + ']').prop('disabled', true);
                    });
                    $('#tblBeneficios tbody').unbind('click');
                    $('#tblBeneficios tbody').on('click', 'button', function () {
                        var row = $('#tblBeneficios').DataTable().row($(this).parents('tr'));
                        var data = row.data();
                        Bloquear('ventana');
                        $.ajax({
                            type: 'post',
                            url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=ELIMINAR_BENEFICIO&CODIGO=' + codigo + '&BENSO_CODE=' + data.CODIGO,
                            async: false
                        }).done(function (data) {
                            exito();
                            listarBeneficios();
                            Desbloquear('ventana');
                        }).error(function (msg) {
                            alertCustom('Error al intentar eliminar beneficio.');
                            Desbloquear('ventana');
                        });
                        $('#cboBeneficio').find('option[value=' + data.CODIGO + ']').prop('disabled', false);
                    });
                    $('#tblBeneficios_wrapper').find(':first').remove();
                } else {
                    $('#tblBeneficios').DataTable().destroy();
                    $('#tblBeneficios').DataTable({
                        responsive: true, filter: false, paging: false, info: false,
                        data: []
                    });
                    $('#tblBeneficios tbody').unbind('click');
                    $('#tblBeneficios_wrapper').find(':first').remove();
                }
            }).error(function (msg) {
                alertCustom('Error al listar beneficios del Régimen laboral seleccionado.');
            });
        }
    };

    return {
        init: function () {
            cargarBeneficios();
            eventoControles();
            plugins();
            cargarRegimen();
        }
    };
}();

var Grabar = function () {
    if (vErrors(['txtDenominacion', 'txtAcronimo', 'txtTiempoServicios', 'txtAnioServicios', 'txtJornada', 'txtDespido', 'txtVacaciones', 'txt_porc_cts'])) {
        var strBeneficios = '';
        $(beneficios).each(function () {
            var ben = $(this)[0];
            strBeneficios += ben.CODIGO + '';
        });
        Bloquear('ventana');
        $.ajax({
            type: 'post',
            url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=G',
            async: false,
            data: {
                DENOMINACION: $('#txtDenominacion').val(), ACRONIMO: $('#txtAcronimo').val(), TIEMPO_SERVICIOS: $('#txtTiempoServicios').val(),
                ANIO_SERVICIOS: $('#txtAnioServicios').val(), JORNADA: $('#txtJornada').val(), DESPIDO: $('#txtDespido').val(),
                VACACIONES: $('#txtVacaciones').val(), BENEFICIOS: strBeneficios, USUA_ID: $('#ctl00_txtus').val(), PORC_CTS: $('#txt_porc_cts').val()
            }
        }).done(function (data) {
            exito();
            $('#txtCodigo').val(data);
            $('#chkEstado').prop('disabled', false);
            window.history.pushState("Object", "Régimen Laboral", "/Default.aspx?f=NCMRELA&codigo=" + data);
            $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
            Desbloquear('ventana');
        }).error(function (msg) {
            alertCustom('Error al intentar guardar nuevo Régimen Laboral.');
            Desbloquear('ventana');
        });
    }
};

var Actualizar = function () {
    if (vErrors(['txtDenominacion', 'txtAcronimo', 'txtTiempoServicios', 'txtAnioServicios', 'txtJornada', 'txtDespido', 'txtVacaciones', 'txt_porc_cts'])) {
        Bloquear('ventana');
        $.ajax({
            type: 'post',
            url: 'vistas/NC/ajax/NCMRELA.ashx?OPCION=A',
            async: false,
            data: {
                CODIGO: $('#txtCodigo').val(), DENOMINACION: $('#txtDenominacion').val(), ACRONIMO: $('#txtAcronimo').val(),
                TIEMPO_SERVICIOS: $('#txtTiempoServicios').val(), ANIO_SERVICIOS: $('#txtAnioServicios').val(),
                JORNADA: $('#txtJornada').val(), DESPIDO: $('#txtDespido').val(), VACACIONES: $('#txtVacaciones').val(),
                USUA_ID: $('#ctl00_txtus').val(), PORC_CTS: $('#txt_porc_cts').val(), ESTADO: $('#chkEstado').is(':checked') ? 'A' : 'I'
            }
        }).done(function (data) {
            if (data === 'OK') {
                exito();
            }
            Desbloquear('ventana');
        }).error(function (msg) {
            alertCustom('Error al intentar actualizar el Régimen Laboral.');
            Desbloquear('ventana');
        });
    }
};
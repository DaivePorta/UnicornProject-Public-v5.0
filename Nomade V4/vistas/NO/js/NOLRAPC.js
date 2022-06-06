var NOLRAPC = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal, #cboMon').select2();
        $('#txtAnio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
        Highcharts.setOptions({
            lang: {
                printChart: 'Imprimir gráfico',
                downloadJPEG: 'Descargar JPEG',
                downloadPDF: 'Descargar PDF',
                downloadPNG: 'Descargar PNG',
                downloadSVG: 'Descargar SVG'
            }
        });
    };

    var cargarEmpresas = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
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

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            }
        });
    };

    var cargarMonedas = function () {
        var select = $('#cboMon');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=12&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json",
            async: false,
            datatype: "json",
            success: function (datos) {
                $(select).html('');
                $(select).append('<option value=""></option>');
                if (datos !== null) {
                    for (var i = 0 ; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" data-simbolo="' + datos[i].SIMBOLO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar las monedas del Sistema.');
            }
        });
    }

    var eventoControles = function () {
        var yyyy = new Date().getFullYear();
        $("#txtAnio").keyup(function (e) {
            if (parseInt($(this).val()) > yyyy) $(this).val("");
            if (e.keyCode === 13) {
                $('#btnFiltrar').click();
            }
        });

        $('#btnFiltrar').click(function () {
            if (vErrors(['cboEmpresa', 'cboMon', 'txtAnio'])) {
                Bloquear('ventana');
                $('#cdAnio').text($('#txtAnio').val());
                $('#tblReporteMostrar tbody').html('');
                $('#tblReporte tbody').html('');
                $.ajax({
                    type: "post",
                    url: 'vistas/NO/ajax/NOLRACM.ashx?OPCION=PRODUCTOS_COMPRADOS&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&MONE_CODE=' + $('#cboMon').val() + '&ANIO=' + $('#txtAnio').val(),
                    contenttype: "application/json",
                    datatype: "json",
                    success: function (datos) {
                        if (datos !== null) {
                            var simbolo = $('#cboMon :selected').attr('data-simbolo')
                            var total = 0.0;
                            var total_porcentaje = 0.0;
                            for (var i = 0 ; i < datos.length; i++) {
                                $('#tblReporteMostrar tbody').append('<tr><td style="text-align: center">' + ((i + 1) === datos.length ? 0 : (i + 1)) + '</td><td>' + datos[i].PRODUCTO + '</td>\
                                <td style="text-align: right">' + simbolo + ' ' + formatoMiles(parseFloat(datos[i].MONTO).toFixed(2)) + '</td>\
                                <td style="text-align: right">' + parseFloat(datos[i].PORCENTAJE).toFixed(2) + '%</td></tr>');
                                $('#tblReporte tbody').append('<tr><td>' + datos[i].PRODUCTO + '</td><td>' + parseFloat(datos[i].MONTO).toFixed(2) + '</td></tr>');
                                total = total + parseFloat(datos[i].MONTO);
                                total_porcentaje = total_porcentaje + parseFloat(datos[i].PORCENTAJE);
                            }
                            $('#tblReporteMostrar tbody').append('<tr><th colspan="2" style="text-align: right">TOTAL</th>\
                            <th style="text-align: right">' + simbolo + ' ' + formatoMiles(total.toFixed(2)) + '</th>\
                            <th style="text-align: right">' + total_porcentaje.toFixed(2) + '%</th></tr>');
                        }
                        $('#pie').highcharts({
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8'],
                            data: { table: 'tblReporte' },
                            chart: {
                                type: 'pie',
                                margin: 60
                            },
                            title: { text: 'Analítico de Productos comprados' },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.point.name.toUpperCase() + '</b><br/>' +
                                         $('#cboMon :selected').attr('data-simbolo') + ' ' + formatoMiles(this.point.y);
                                }
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    depth: 35,
                                    dataLabels: {
                                        formatter: function () {
                                            return '<strong>' + this.point.name + '</strong><br>' + this.percentage.toFixed(2) + '%';
                                        }
                                    }
                                }
                            }
                        });
                        Desbloquear('ventana');
                    },
                    error: function (msg) {
                        alertCustom('Error al generar el Reporte.');
                        Desbloquear('ventana');
                    }
                });

            }
        });

        $('#cboEmpresa').change(function () {
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
        });
    };

    return {
        init: function () {
            cargarEmpresas();
            $('#cboEmpresa').val($('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').val($('#ctl00_hddestablecimiento').val());
            cargarMonedas();
            $('#cboMon').val('0002');
            plugins();
            eventoControles();
            $('#txtAnio').val(new Date().getFullYear());
            $('#btnFiltrar').click();
        }
    };
}();
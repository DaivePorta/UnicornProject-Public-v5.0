var NOLRACM = function () {

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
                //$("#cboMon").select2("val", "0002");
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
                    url: 'vistas/NO/ajax/NOLRACM.ashx?OPCION=REPORTE&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&MONE_CODE=' + $('#cboMon').val() + '&ANIO=' + $('#txtAnio').val(),
                    contenttype: "application/json",
                    datatype: "json",
                    success: function (datos) {
                        if (datos !== null) {
                            var simbolo = $('#cboMon :selected').attr('data-simbolo');
                            for (var i = 0 ; i < datos.length; i++) {
                                $('#tblReporteMostrar tbody').append('<tr><td style="text-align: center">' + (i + 1) + '</td><td>' + datos[i].NOMBRE_MES + '</td><td style="text-align: right">' + simbolo + ' ' + formatoMiles(datos[i].MONTO) + '</td></tr>');
                                $('#tblReporte tbody').append('<tr><td>' + datos[i].NOMBRE_MES + '</td><td>' + datos[i].MONTO + '</td></tr>');
                            }
                        }
                        $('#chart').highcharts({
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                            data: { table: 'tblReporte' },
                            chart: {
                                type: 'column'
                            },
                            title: { text: 'Analítico de compras mensuales' },
                            legend: {
                                enabled: false
                            },
                            yAxis: {
                                allowDecimals: true,
                                title: {
                                    text: ''
                                },
                                labels: {
                                    formatter: function () {
                                        return $('#cboMon :selected').attr('data-simbolo') + ' ' + formatoMiles(this.value);
                                    }
                                },
                                min: 0
                            },
                            xAxis: {
                                title: {
                                    text: ''
                                },
                                labels: {
                                    formatter: function () {
                                        return new String(this.value).substring(0, 3).toUpperCase();
                                    }
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.point.name.toUpperCase() + '</b><br/>' +
                                          $('#cboMon :selected').attr('data-simbolo') + ' ' + formatoMiles(this.point.y);
                                }
                            },
                            plotOptions: {
                                series: {
                                    colorByPoint: true
                                }
                            },
                        });
                        $('#pie').highcharts({
                            data: { table: 'tblReporte' },
                            chart: {
                                type: 'pie',
                                margin: 60
                            },
                            title: { text: 'Torta de Analítico de compras mensuales' },
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
                            },
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
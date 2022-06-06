var NVLRDVC = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboRangoHora').select2();
        $("#cboDias").multiselect({
            nonSelectedText: 'TODOS LOS DÍAS'
        });

        $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");

        Highcharts.setOptions({
            lang: {
                printChart: 'Imprimir gráfico',
                downloadJPEG: 'Descargar JPEG',
                downloadPDF: 'Descargar PDF',
                downloadPNG: 'Descargar PNG',
                downloadSVG: 'Descargar SVG'
            }
        });

        $('#form-date-range').daterangepicker({
            ranges: {
                'Hoy': ['today', 'today'],
                'Ayer': ['yesterday', 'yesterday'],
                'Ultimos 7 dias': [Date.today().add({
                    days: -6
                }), 'today'],
                'Ultimos 30 dias': [Date.today().add({
                    days: -29
                }), 'today'],
                'Mes Actual': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                'Ultimo Mes': [Date.today().moveToFirstDayOfMonth().add({
                    months: -1
                }), Date.today().moveToFirstDayOfMonth().add({
                    days: -1
                })]
            },
            opens: 'right',
            format: 'dd/MM/yyyy',
            separator: ' hasta ',
            startDate: Date.today().add({
                days: -29
            }),
            endDate: Date.today(),
            locale: {
                applyLabel: 'Seleccionar',
                fromLabel: 'Desde',
                toLabel: 'Hasta',
                customRangeLabel: 'Personalizar',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                firstDay: 1
            },
            showWeekNumbers: true,
            buttonClasses: ['btn-danger']
        },

        function (start, end) {
            $('#form-date-range span').html(start.toString('d MMMM, yyyy') + ' - ' + end.toString('d MMMM, yyyy'));
        });

        $('#form-date-range span').html(Date.today().add({
            days: -30
        }).toString('d MMMM, yyyy') + ' - ' + Date.today().toString('d MMMM, yyyy'));

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
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option></option>');
                $('#cboSucursal').append('<option value="">TODOS</option>');
                if (data !== null) {
                    for (var i = 0; i < data.length; i++) {
                        $("#cboSucursal").append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                    }
                } 
                $("#cboSucursal").val($('#ctl00_hddestablecimiento').val());
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            }
        });
        $("#cboSucursal").select2();
    };

    var cargarGrupos = function () {
        var select = $('#cboGrupos');
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=4&CTLG_CODE=N&OPCION2=",
            contenttype: "application/json",
            async: false,
            datatype: "json",
            success: function (datos) {
                $(select).html('');
                if (datos !== null) {
                    for (var i = 0 ; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboGrupos').multiselect({
                    nonSelectedText: 'TODOS LOS GRUPOS'
                });
                $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");
            },
            error: function (msg) {
                alertCustom('Error al listar los grupos.');
            }
        });
    }

    var eventoControles = function () {
        $('#btnFiltrar').click(function () {
            if (vErrors(['cboEmpresa'])) {
                Bloquear('ventana');
                $('#cdAnio').text($('#txtAnio').val());
                $('#tblReporteMostrar tbody').html('');
                $('#tblReporteMostrar tfoot').html('');
                $('#tblReporte tbody').html('');
                $('#tblReporte1 tbody').html('');

                var x = $("#form-date-range").data("daterangepicker")

                var desde = x.startDate.toString('dd/MM/yyyy');
                var hasta = x.endDate.toString('dd/MM/yyyy');
                var rangoHorario = $('#cboRangoHora').val(); //DPORTA 15/07/21

                $.ajax({
                    type: "post",
                    url: 'vistas/NV/ajax/NVLRAVM.ashx?OPCION=REPORTE_CRONOLOGICO&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + ($('#cboSucursal').val() == null ? '' : $('#cboSucursal').val()) + '&DIAS=' + ($('#cboDias').val() == null ? '' : $('#cboDias').val()) + '&GRUPO=' + ($('#cboGrupos').val() == null ? '' : $('#cboGrupos').val()) + '&DESDE=' + desde + '&HASTA=' + hasta + '&RANGO_HORARIO=' + rangoHorario,
                    contenttype: "application/json",
                    datatype: "json",
                    success: function (datos) {
                        if (datos !== null) {
                            var simbolo = "S/.";
                            var total = 0;
                            var cantidad = 0;
                            for (var i = 0 ; i < datos.length; i++) {
                                $('#tblReporteMostrar tbody').append('<tr><td style="text-align: center">' + (i + 1) + '</td><td style="text-align: center">' + datos[i].RANGO + '</td><td style="text-align: center">' + datos[i].CANTIDAD + '</td><td style="text-align: right">' + simbolo + ' ' + formatoMiles(datos[i].MONTO) + '</td></tr>');
                                $('#tblReporte tbody').append('<tr><td>' + datos[i].RANGO + '</td><td>' + datos[i].MONTO + '</td></tr>');
                                $('#tblReporte1 tbody').append('<tr><td>' + datos[i].RANGO + '</td><td>' + datos[i].CANTIDAD + '</td></tr>');
                                total += parseFloat(datos[i].MONTO);
                                cantidad += parseFloat(datos[i].CANTIDAD);
                            }
                            $('#tblReporteMostrar tfoot').append('<tr><td style="text-align: center;font-weight: 800;"></td><td style="text-align: center;font-weight: 800;">TOTAL</td><td style="text-align: center;font-weight: 800;">' + cantidad + '</td><td style="text-align: right;font-weight: 800;">S/. ' + formatoMiles(total) + '</td></tr>');
                        }
                        $('#chart').highcharts({
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                            data: { table: 'tblReporte' },
                            chart: {
                                type: 'column'
                            },
                            title: { text: 'Dispersión de Ventas Monetarizada' },
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
                                        return 'S/. ' + formatoMiles(this.value);
                                    }
                                },
                                min: 0
                            },
                            xAxis: {
                                title: {
                                    text: ''
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + (this.point.x + 1) + '</b><br/>' +
                                          'S/. ' + formatoMiles(this.point.y);
                                }
                            },
                            plotOptions: {
                                series: {
                                    colorByPoint: true
                                }
                            },
                        });

                        $('#pie').highcharts({
                            colors: ['#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a','#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354'],
                            data: { table: 'tblReporte1' },
                            chart: {
                                type: 'column'
                            },
                            title: { text: 'Dispersión de Ventas por Cantidad' },
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
                                        return this.value;
                                    }
                                },
                                min: 0
                            },
                            xAxis: {
                                title: {
                                    text: ''
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + (this.point.x + 1) + '</b><br/>' +
                                          this.point.y;
                                }
                            },
                            plotOptions: {
                                series: {
                                    colorByPoint: true
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
            cargarSucursales($('#cboEmpresa').val());
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
        });
    };

    return {
        init: function () {
            cargarEmpresas();
            $('#cboEmpresa').val($('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').val($('#ctl00_hddestablecimiento').val());
            cargarGrupos();
            plugins();
            eventoControles();
            $('#btnFiltrar').click();
        }
    };

}();
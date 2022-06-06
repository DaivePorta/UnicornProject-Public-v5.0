var NELREGM = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal').select2();
        $("#txtanio").val(new Date().getFullYear());
        $('#txtanio').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 4, "greedy": false }); });
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

    var cargarGasto = function () {
        var select = $('#cboConceptos');
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=3&p_TIPO=3&p_ESTADO_IND=A&p_CTLG_CODE=" + $('#cboEmpresa').val(),
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
                $('#cboConceptos').multiselect({
                    nonSelectedText: 'TODOS LOS CONCEPTOS'
                });
                $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");
            },
            error: function (msg) {
                alertCustom('Error al listar los conceptos.');
            }
        });
    }

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

    var eventoControles = function () {
        $('#btnFiltrar').click(function () {
            if (vErrors(['cboEmpresa', 'txtanio'])) {
                Bloquear('ventana');
                $('#tblReporteMostrar tbody').html('');
                $('#tblReporteMostrar tfoot').html('');
                $('#tblReporte1 tbody').html('');

                $.ajax({
                    type: "post",
                    url: 'vistas/NE/ajax/NELREGG.ashx?OPCION=EGRESOS_MENSUALES&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&ANIO=' + $("#txtanio").val() + '&SUBCONCEPTO=' + ($('#cboConceptos').val() == null ? '' : $('#cboConceptos').val()) + "&CECC_CODE=" + ($("#txt_centro_costo").data("CodCentroCostoCab")||"") + '&CECD_CODE=' + ($("#txt_centro_costo").data("CodCentroCosto")||""),
                    contenttype: "application/json",
                    datatype: "json",
                    success: function (datos) {
                        if (datos !== null) {
                            var simbolo = "S/.";
                            var total = 0;
                            for (var i = 0 ; i < datos.length; i++) {
                                $('#tblReporteMostrar tbody').append('<tr id="' + datos[i].CODIGO + '"><td style="text-align: center">' + (i + 1) + '</td><td style="text-align: center">' + datos[i].MES + '</td><td style="text-align: right">' + simbolo + ' ' + formatoMiles(datos[i].MONTO) + '</td></tr>');
                                $('#tblReporte1 tbody').append('<tr><td>' + datos[i].MES + '</td><td>' + datos[i].MONTO + '</td></tr>');
                                total += parseFloat(datos[i].MONTO);
                            }
                            $('#tblReporteMostrar tfoot').append('<tr>"><td style="text-align: center"></td><td style="text-align: center;font-weight:800;">TOTAL</td><td style="text-align: right;font-weight:800;">' + simbolo + ' ' + formatoMiles(total) + '</td></tr>');
                        }

                        $('#chart').highcharts({
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                            data: { table: 'tblReporte1' },
                            chart: {
                                type: 'column'
                            },
                            title: { text: 'Reporte Egresos Mensuales' },
                            legend: {
                                enabled: false
                            },
                            yAxis: {
                                allowDecimals: true,
                                title: {
                                    text: ''
                                },
                                labels: {
                                    enabled: true,
                                    shadow: false,
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
                            data: { table: 'tblReporte1' },
                            chart: {
                                type: 'pie',
                                margin: 60,
                                //options3d: {
                                //    enabled: true,
                                //    alpha: 45,
                                //    beta: 0
                                //}
                            },
                            title: { text: 'Torta de Analítico de Egresos Mensuales' },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.point.name.toUpperCase() + '</b><br/>' +
                                          'S/. ' + formatoMiles(this.point.y);
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


    var fillBandeja = function () {

        var parms = {
            data: null,
            order: [[0, "desc"]],
            columns: [
                //{
                //    data: "CODIGO",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).hide()
                //    }
                //},
                {
                    data: "CODIGO_GAST_ORG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', '')
                    }
                },
                 {
                     data: "RAZON_SOCIAL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', '')
                     }
                 }
                 ,
                 {
                     data: "SIMBOLO_MONEDA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                {
                    data: "MONTO_APROBADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "FECHA_EMISION",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "DESC_DCTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', '')
                     }
                 },
                 {
                     data: "NUMERO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', '')
                     }
                 },
                 {
                     data: "SOLICITA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }

            ]
        }

        oTableGST = iniciaTabla('tbl_aprob_gastos', parms);
        $('#tbl_aprob_gastos').removeAttr('style');
        $('#tbl_aprob_gastos tbody').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableGST.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableGST.fnGetPosition(this);
                var row = oTableGST.fnGetData(pos);
                var CODIGO = row.CODIGO_GAST_ORG;
                window.open("?f=CPMAGAS&codigo=" + CODIGO, '_blank');

            }
        });

    }

    var funcionalidadTabla = function () {

        $('#tblReporteMostrar tbody').on('click', 'tr', function () {

            var ID = $(this).attr('id');

            var gasto = $($(this).find('td')[1]).text();
            $("#labelReporteDetalle").text('Detalle de Egresos por ' + gasto);

            Bloquear("ventana");
            $.ajax({
                type: "post",
                url: 'vistas/NE/ajax/NELREGG.ashx?TIPO=M&OPCION=MOSTRAR_DETALLE&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&MES=' + ID + "&CECC_CODE=" + ($("#txt_centro_costo").data("CodCentroCostoCab")||"") + '&CECD_CODE=' + ($("#txt_centro_costo").data("CodCentroCosto")||"") + "&ANIO=" + $("#txtanio").val() + '&CONC_CODE=' + ($('#cboConceptos').val() == null ? '' : $('#cboConceptos').val()),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {
                    if (datos != "" && datos != null) {
                        oTableGST.fnClearTable();
                        oTableGST.fnAddData(datos);
                    } else {
                        oTableGST.fnClearTable();
                    }

                    $("#ventanaD").modal('show');

                    Desbloquear("ventana");

                },
                error: function (msg) {
                    noexitoCustom("Error Listado")
                    Desbloquear("ventana");
                }

            });

        });
    }

    return {
        init: function () {
            cargarEmpresas();
            $('#cboEmpresa').val($('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').val($('#ctl00_hddestablecimiento').val());
            cargarGasto();
            plugins();
            eventoControles();
            fillBandeja();
            funcionalidadTabla();
            $('#btnFiltrar').click();
        }
    };

}();
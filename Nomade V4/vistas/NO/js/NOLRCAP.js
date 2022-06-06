var NOLRCAP = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal, #cboMoneda').select2();
        $('#cboAnio, #cboMeses').multiselect({
            nonSelectedText: 'TODOS'
        });
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
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar empresas.');
            }
        });
    }

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option></option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al listar Establecimientos.');
            }
        });
    };

    var cargarMonedas = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').html('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar monedas.');
            }
        });
    };

    var cargarAnios = function () {
        var data = new FormData();
        data.append('OPCION', 'ANIOS');
        data.append('CTLG_CODE', $('#cboEmpresa').val());
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NO/ajax/NOLRCAP.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            if (datos != null) {
                $('#cboAnio').html('<option></option>');
                var arr = [];
                for (var i = 0; i < datos.length; i++) {
                    arr.push({ "label": datos[i].ANIO, "title": datos[i].ANIO, "value": datos[i].ANIO });
                }

                $('#cboAnio').multiselect('dataprovider', arr);
                $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");
            }
        }).error(function () {
            alertCustom("Error al listar Años. Por favor intente nuevamente.");
        });
    };

    var cargarDatos = function () {
        var data = new FormData();
        data.append('CTLG_CODE', $("#cboEmpresa").val());
        data.append('SCSL_CODE', $("#cboSucursal").val());
        data.append('MONE_CODE', $("#cboMoneda").val());
        data.append('ANIOS', ($('#cboAnio').val() != null) ? $('#cboAnio').val().toString() : "");
        data.append('MESES', ($('#cboMeses').val() != null) ? $('#cboMeses').val().toString() : "");

        Bloquear('divDatos');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NO/ajax/NOLRCAP.ASHX?OPCION=REPORTE",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        }).success(function (datos) {
            Desbloquear("divDatos");
            if (datos !== null) {
                $("#divDatos").html(datos)
            }
        }).error(function () {
            Desbloquear("divDatos");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });

    }

    //Pie
    var cargarGrafico = function (idContenedor, titulo, subtitulo, idTabla, tipoGrafico) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: tipoGrafico,
            },
            title: {
                text: titulo
            },
            subtitle: {
                text: subtitulo
            },
            yAxis: {
                allowDecimals: true,
                title: {
                    text: ''
                },
                labels: {
                    useHTML: true,
                    formatter: function () {
                        return $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.value);
                    }
                }
            },
            xAxis: {
                labels: { useHTML: true },
                allowDecimals: false
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<b>' + this.point.name.toUpperCase() + '</b><br/>' +
                         $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(this.point.y);
                }
            },
            plotOptions: {
                useHTML: true,
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        useHTML: true,
                        formatter: function () {
                            return '<strong>' + this.point.name + '</strong><br>' + this.percentage.toFixed(2) + '%';
                        }
                    }
                }
            }
        });
    }

    //Barras
    var cargarGrafico2 = function (idContenedor, titulo, subtitulo, idTabla) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: 'column',
            },
            title: {
                text: titulo
            },
            legend: {
                enabled: false
            },
            subtitle: {
                text: subtitulo
            },
            yAxis: {
                allowDecimals: true,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.value);
                    }
                }
            },
            xAxis: {
                allowDecimals: false,
                labels: { useHTML: true }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<b>' + this.point.name + '</b><br/>' +
                         $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(this.point.y);
                }
            },
            plotOptions: {
                useHTML: true,
                series: {
                    colorByPoint: true
                }
            }
        });
    }

    var eventoControles = function () {
        var empresaAnterior = "";

        $("#cboEmpresa").on("change", function () {
            if ($(this).val() != empresaAnterior) {
                cargarSucursales();
                empresaAnterior = $(this).val();
            }
        });

        $('#buscar').on('click', function () {
            $('#buscar').attr("disabled", "disabled");
            if (vErrors(["cboMoneda", "cboEmpresa"])) {
                Bloquear("divGrafico")
                cargarDatos();
                setTimeout(function () {
                    cargarGrafico("contenedor", "Torta Analítico Compras Proveedores", "", "tblDatos", "pie");

                    cargarGrafico2("contenedor2", "Analítico Compras Proveedores", "", "tblDatos", "column");


                    $('#buscar').removeAttr("disabled");
                    Desbloquear("divGrafico")
                }, 250);
            } else {
                $('#buscar').removeAttr("disabled");
            }

        });
    }

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            cargarMonedas();
            cargarAnios();
            eventoControles();
        }
    };
}();
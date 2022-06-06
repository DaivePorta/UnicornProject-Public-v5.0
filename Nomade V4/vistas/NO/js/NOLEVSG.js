var NOLEVSG = function () {

    var plugins = function () {
        $("#cboEmpresa, #cboSucursal,#slcSgmt,#cboMoneda").select2();
        $("#txtFecha").datepicker({
            format: " yyyy",
            viewMode: "years",
            minViewMode: "years"
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
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option></option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {
                select.change(function () {
                    cargarSucursales();

                });
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

    var fillMoneda = function () {
        var selectEst = $('#cboMoneda');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            beforeSend: function () { Bloquear($(selectEst.parents("div")[0])); },
            datatype: "json",
            async: true,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente.");
            },
            complete: function () { Desbloquear($(selectEst.parents("div")[0])); $("#cboMoneda").select2('val', $("#cboMoneda [data-tipo=MOBA]").val()); }
        });

    };

    var eventosControles = function () {

        $('#btnFiltrar').click(function () {
            if (vErrors(['cboEmpresa', 'txtFecha', 'slcSgmt'])) {
                Bloquear('ventana');
                $('#tblReporteMostrar tbody').html('');
                $('#tblReporte tbody').html('');
                $.ajax({
                    type: "post",
                    url: 'vistas/NO/ajax/NOLRTCA.ashx?OPCION=REPORTE_MENSUAL&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&NIVEL=' + $('#slcSgmt').val() +
                                                                                '&ANHO=' + $.trim($('#txtFecha').val()) + '&MONE_CODE=' + $('#cboMoneda').val(),
                    contenttype: "application/json",
                    datatype: "json",
                    success: function (datos) {
                        oTable.fnClearTable();
                        if (datos.length > 0) {
                            var parent = "";
                            var parent_anterior="";
                            var childrens = new Array();
                            var jsonResultante = new Array();
                            var jsonParcial = {};
                            for (var i = 0; i < datos.length; i++) {

                                parent = datos[i].GRUPO;

                                if (parent !== parent_anterior) {
                                    childrens = new Array();
                                    jsonParcial = {};                                  
                                }

                                childrens[datos[i].MES - 1] = datos[i].MONTO;
                                var cons = "m" + datos[i].MES;
                                eval("jsonParcial." + cons + " = " + datos[i].MONTO);                              

                                if (parent !== parent_anterior  && Object.getOwnPropertyNames(jsonParcial).length > 0) {
                                    jsonParcial.name =  parent;
                                    jsonParcial.data = childrens;
                                    jsonResultante.push(jsonParcial);
                                }
                              
                                parent_anterior = parent;

                               
                            }
                            oTable.fnAddData(jsonResultante);
                        }


                        $('#chart').highcharts({
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', 'rgb(172, 172, 172)'],
                            title: {
                                text: 'Ventas Mensuales por ' + $("#slcSgmt :selected").html(),
                                x: -20 //center
                            },
                            //subtitle: {
                            //    text: 'Source: WorldClimate.com',
                            //    x: -20
                            //},
                            xAxis: {
                                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                                    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
                            },
                            yAxis: {
                                title: {
                                    text: 'Ventas ('+ $('#cboMoneda :selected').attr("simbolo")+')'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valuePrefix: $('#cboMoneda :selected').attr("simbolo")
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: jsonResultante
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

    }

    var tablaVacia = function () {
        oTable = $('#tblReporteMostrar').dataTable({
            data: null,
            columns: [
                {
                    data: "name",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "m1",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                    }
                },
                {
                     data: "m2",
                     createdCell: function (td, cellData, rowData, row, col) {
                       $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                     }
                },
                {
                     data: "m3",
                     createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                      }
                },
                {
                    data: "m4",
                    createdCell: function (td, cellData, rowData, row, col) {
                      $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                    }
                },
                {
                    data: "m5",
                    createdCell: function (td, cellData, rowData, row, col) {
                      $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                    }
                },
                {
                    data: "m6",
                    createdCell: function (td, cellData, rowData, row, col) {
                      $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                    }
                },
                {
                     data: "m7",
                     createdCell: function (td, cellData, rowData, row, col) {
                       $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                     }
                 },
                 {
                     data: "m8",
                     createdCell: function (td, cellData, rowData, row, col) {
                       $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                     }
                 },
                 {
                     data: "m9",
                     createdCell: function (td, cellData, rowData, row, col) {
                       $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                     }
                 },
                 {
                     data: "m10",
                     createdCell: function (td, cellData, rowData, row, col) {
                       $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                     }
                 },
                 {
                    data: "m11",
                    createdCell: function (td, cellData, rowData, row, col) {
                      $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                    }
                },
                {
                  data: "m12",
                  createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css({"text-align": "right"}).html(formatoMiles(cellData));
                  }
                }

            ],
            "scrollY": "45vh", "scrollCollapse": true,
            "paging": false,
            "dom": '<"top cabecera"f><t><"clear">',
            info: false

        });

    }

    return {
        init: function () {
             tablaVacia();
            cargarEmpresas();
            cargarSucursales();
            fillMoneda();
            plugins();
            eventosControles();

        }
    };
}();
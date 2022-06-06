
var NVLRAVC = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboSucursal,#cboMoneda').select2();

        $('#cboAnio').multiselect({
            nonSelectedText: 'TODOS'
        });

        $('#cboMeses').multiselect({
            nonSelectedText: 'TODOS'
        });

        $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");


        Highcharts.setOptions({
            lang: {
                printChart: 'Imprimir gráfico',
                downloadJPEG: 'Descargar JPEG',
                downloadPDF: 'Descargar PDF',
                downloadPNG: 'Descargar PNG',
                downloadSVG: 'Descargar SVG'
            }
        });


    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboSucursal = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboSucursal').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillcboMoneda = function () {

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                    $('#cboMoneda').select2("val", datos[pos].CODIGO);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    
    var cargarDatos = function () {
      
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboSucursal").val());
            data.append('p_MONE_CODE', $("#cboMoneda").val());         
            data.append('p_ANIOS', ($('#cboAnio').val() != null) ? $('#cboAnio').val().toString() : "");
            data.append('p_MESES', ($('#cboMeses').val() != null) ? $('#cboMeses').val().toString() : "");

            Bloquear('divDatos');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NV/ajax/NVLRAVC.ASHX?OPCION=1",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true,
                contenttype: "application/json",
                datatype: "json"
            }).success(function (datos) {
                console.log(datos);
                Desbloquear("divDatos");
                oTable.fnClearTable();
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                }
                else {
                    infoCustom2("No hay información!");
                }
            }).error(function () {
                Desbloquear("divDatos");
                alertCustom("Error al listar. Por favor intente nuevamente.");
            }).complete(function () {
                setTimeout(function () {
                    cargarGrafico("contenedor", "Torta Analítico Ventas Clientes","");

                    cargarGrafico2("contenedor2", "Analítico Ventas Clientes", "");


                    $('#buscar').removeAttr("disabled");
                    Desbloquear("divGrafico")
                }, 250);
            });
        
    }

    //Pie
    var cargarGrafico = function (idContenedor, titulo, subtitulo) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            /*data: {
                table: idTabla
            },*/
            series: [{
                name: 'Ventas',
                colorByPoint: true,
                data: JSON.parse(JSON.stringify(oTable.fnGetData()).split("NOMBRE").join("name").split("PORCENTAJE").join("y"))
            }],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: "pie"
            },
            title: {
                text: titulo
            },
            subtitle: {
                text: subtitulo
            },          
           tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.3f}%</b>'            
            },
            plotOptions: {              
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        formatter: function () {
                            if (this.percentage.Redondear(3) > 0)
                                return '<b>' + this.point.name + '</b><br>' + $("#cboMoneda :selected").attr("simbolo") + '.' + formatoMiles(this.point.MONTO) + '<br>' + this.percentage.Redondear(3) + '%';
                        },
                        enabled: true,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                },
                showInLegend: true
            }
        });
    }

    //Barras
    var cargarGrafico2 = function (idContenedor, titulo, subtitulo) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            series: JSON.parse(JSON.stringify(oTable.fnGetData()).split("NOMBRE").join("name").split("MONTO\":").join("data\":[").split(",\"PORCENTAJE").join("],\"PORCENTAJE")),
            chart: {
                type: 'column',
            },
            title: {
                text: titulo,
                x: -20 //center
            },           
            subtitle: {
                text: subtitulo
            },
            yAxis: {              
                title: {
                    text: 'Ventas (' + $('#cboMoneda :selected').attr("simbolo") + ')'
                },
                min: 0
            },
            xAxis: {
                categories: ["Año(s):" + ($("#cboAnio :selected").length>0?$("#cboAnio").val().toString():"Todos") + " - " + 
                             "Mese(s):" + ($("#cboMeses :selected").length > 0 ? $.map($("#cboMeses :selected").contents(), function (n) { return n.textContent; }).join(",").toString() : "Todos")],
                crosshair: true
               },
            tooltip: {
                useHTML: true,
                formatter: function () { 
                    return '<b>' + this.series.name+ '</b><br/>' +
                         $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(this.point.y);
                }
            },
            plotOptions: {
                column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                }
            }
        });
    }

    var fillCboAnios = function () {
        var data = new FormData();
        data.append('OPCION', '2');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLRCAV.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            if (datos != null) {
                $('#cboAnio').empty();
                $('#cboAnio').append('<option></option>');
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
    }

    var fillBandeja = function () {

        var parms = {
            data: null,
            order: [[0, "desc"]],
            "scrollY": "200px",
            "scrollCollapse": true,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: "EMISION", createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html(rowData.EMISION);
                        $(td).css('font-size', '11px')
                        $(td).attr("align", "left");
                    },
                    type: "fechaHora"

                }
                ,
                {
                    data: "CLIE_DOID_NRO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).css('font-size', '11px')
                    }
                },

                {
                    data: "RAZON_SOCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: "VALOR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: "MOPA_DESC", createdCell: function (td, cellData, rowData, row, col) {
                        if (rowData.CONTRAENTREGA_IND === "S")
                            $(td).html(rowData.MOPA_DESC + "<br><small style='color:#6C7686;'>*CONTRAENTREGA</small>");
                        else
                            $(td).html(rowData.MOPA_DESC);


                        $(td).attr("align", "left");
                        $(td).css('font-size', '11px')
                    }

                },
                {
                    data: "NOMBRE_VENDEDOR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', '')
                        $(td).css('font-size', '11px')
                    }
                },
                {
                    data: "ANULADO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).css('font-size', '11px')
                    }

                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).css('font-size', '11px')
                    }
                }

            ]
        }

        oTableVentas = iniciaTabla('tbl_ventas_cliente', parms);
        $('#tbl_ventas_cliente').removeAttr('style');

        $('#tbl_ventas_cliente tbody').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableVentas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableVentas.fnGetPosition(this);
                var row = oTableVentas.fnGetData(pos);
                var IND_RAPIDA = row.VENTA_RAPIDA_IND;
                var CODIGO = row.CODE;

                if (IND_RAPIDA == 'N') {
                    window.open("?f=NVMDOCV&codigo=" + CODIGO, '_blank');
                } else {
                    window.open("?f=NVMDOVR&codigo=" + CODIGO, '_blank');
                }
            }
        });

    }

    var tablaVacia = function () {
        oTable = $('#tblReporteMostrar').dataTable({
            data: null,
            columns: [
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').html(row + 1);
                    }
                },
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {                       
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({ "text-align": "right" }).html(formatoMiles(cellData));
                    }
                }
            ],
            "scrollY": "45vh", "scrollCollapse": true,
            "paging": false,
            "dom": '<"top cabecera"f><t><"clear">',
            info: false,
            footerCallback: function (row, data, start, end, display) {

                var api = this.api(), data;

                if (api.rows()[0].length > 0) {
                    $(api.column(2).footer()).html(
                        formatoMiles(api.row(api.rows()[0].length - 1).data().MONTO)
                    );
                } else {
                    $(api.column(2).footer()).html(
                        "0"
                    );
                }
            }

        });

        $('#tblReporteMostrar tbody').on('click', 'tr', function () {
            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            if (row !== null) {
                var CLIENTE = row.CODIGO;
                var NOMBRE_CLIENTE = row.NOMBRE;
                
                var EMPRESA = $('#cboEmpresa').val();
                var ESTABLECIMIENTO = $('#cboSucursal').val();
                var MONEDA = $('#cboMoneda').val();
                var ANIO =($('#cboAnio').val() != null) ? $('#cboAnio').val().toString() : "";
                var MESES = ($('#cboMeses').val() != null) ? $('#cboMeses').val().toString() : "";

                console.log(MESES);

                if (CLIENTE == 'OTRO') {
                    infoCustom2("No se encontraron datos!");
                    return;
                }

                $("#labelReporteDetalle").text('Detalle de Ventas del cliente: ' + NOMBRE_CLIENTE);
                Bloquear("ventana");
                $.ajax({
                    type: "post",
                    url: 'vistas/NV/ajax/NVLDOCT.ashx?OPCION=7&CTLG_CODE=' + EMPRESA + '&SCSL_CODE=' + ESTABLECIMIENTO + '&MONEDA_CODE=' + MONEDA + '&ANIO=' + ANIO + '&CODE_CLIENTE=' + CLIENTE + '&MESES=' + MESES,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        if (datos != "" && datos != null) {
                            setTimeout(function () {
                                oTableVentas.fnAdjustColumnSizing();
                            }, 500);

                            oTableVentas.fnClearTable();
                            oTableVentas.fnAddData(datos);

                        } else {
                            oTableVentas.fnClearTable();
                        }

                        $("#ventanaD").modal('show');

                        Desbloquear("ventana");

                    },
                    error: function (msg) {
                        noexitoCustom("Error Listado")
                        Desbloquear("ventana");
                    }

                });            

                
                $($($("tspan:contains('" + row.NOMBRE + "')")[0]).parents("g")[0]).click();
            }

                

        });

        $('#tblReporteMostrar tbody').on('mouseover', 'tr', function () {
            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            if (row !== null)
                $($($("tspan:contains('" + row.NOMBRE + "')")[0]).parents("g")[0]).mouseover();


        });

        $('#tblReporteMostrar tbody').on('mouseout', 'tr', function () {
            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            if (row !== null)
                $($($("tspan:contains('" + row.NOMBRE + "')")[0]).parents("g")[0]).mouseout();


        });
    }


    var eventoControles = function () {
        var empresaAnterior = "";

        $("#cboEmpresa").on("change", function () {
            if ($(this).val() != empresaAnterior) {
                fillCboSucursal($("#cboEmpresa").val());
                empresaAnterior = $(this).val();
            }
        });

        $('#buscar').on('click', function () {
            $('#buscar').attr("disabled", "disabled");
            if (vErrors(["cboMoneda", "cboEmpresa"])) {
                $("#txtMoneSimb").html($("#cboMoneda :selected").attr("simbolo"));
                Bloquear("divGrafico")
                cargarDatos();
               
            } else {
                $('#buscar').removeAttr("disabled");
            }

        });       

    }

    return {
        init: function () {
            tablaVacia();
            fillBandeja();
            plugins();
            fillCboAnios();
            fillCboEmpresa();
            fillCboSucursal($("#cboEmpresa").val());
            fillcboMoneda();           
            eventoControles();
            $('#buscar').click();
        }
    };

}();
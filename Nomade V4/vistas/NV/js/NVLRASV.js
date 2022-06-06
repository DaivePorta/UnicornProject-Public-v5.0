
var NVLRASV = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboSucursal,#cboMoneda').select2();
            
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

      
    }
    var cargarFechaDefecto = function () {
        $('#txtAnio').val(new Date().getFullYear());
        var mes = new Date().getMonth() + 1;    
        if ($('#txtAnio').val() != "") {
            cargarDatos();
            setTimeout(function () {
                cargarGrafico("contenedor", "Analítico Subgrupos Vendidos", "", "tblDatos");
            }, 250);
        }
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
        if (vErrors(["txtAnio"])) {
            var data = new FormData();          
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboSucursal").val());
            data.append('p_MONE_CODE', $("#cboMoneda").val());
            data.append('p_ANIO', $('#txtAnio').val());

            Bloquear('divDatos');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NV/ajax/NVLRASV.ASHX?OPCION=1",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            }).success(function (datos) {
                Desbloquear("divDatos");
                if (datos != null) {
                    $("#divDatos").html(datos)
                }
            }).error(function () {
                Desbloquear("divDatos");
                alertCustom("Error al listar. Por favor intente nuevamente.");
            });
         }    
    }

    var cargarGrafico = function (idContenedor, titulo, subtitulo, idTabla) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: 'pie',
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
                    formatter: function () {
                        return $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.value);
                    }
                }
            },
            xAxis: {
                allowDecimals: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name.toUpperCase() + '</b><br/>' +
                         $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(this.point.y);
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
                Bloquear("divGrafico")
                cargarDatos();
                setTimeout(function () {
                    cargarGrafico("contenedor", "Analítico Subgrupos Vendidos", "", "tblDatos");
                    $('#buscar').removeAttr("disabled");
                    Desbloquear("divGrafico")
                }, 250);
            } else {
                $('#buscar').removeAttr("disabled");
            }

        });

        $('#tblDatosMostrar tbody').on('click', 'tr', function () {
            var COD_SUBGRUPO = $($(this).find('td')[1]).text(); 
            
            var EMPRESA = $('#cboEmpresa').val();
            var ESTABLECIMIENTO = $('#cboSucursal').val();
            var MONEDA = $('#cboMoneda').val();
            var ANIO = $('#txtAnio').val();

            var SUBGRUPO = $($(this).find('td')[2]).text();

            if (COD_SUBGRUPO == 'OTRO' || COD_SUBGRUPO == 'TOTA') {
                infoCustom2("No se encontraron datos!");
                return;
            }

            $("#labelReporteDetalle").text('Detalle de Ventas por subgrupo: ' + SUBGRUPO);
            Bloquear("ventana");
            $.ajax({
                type: "post",
                url: 'vistas/NV/ajax/NVLDOCT.ashx?OPCION=5&CTLG_CODE=' + EMPRESA + '&SCSL_CODE=' + ESTABLECIMIENTO + '&MONEDA_CODE=' + MONEDA + '&ANIO=' + ANIO + '&CODE_SUBGRUPO=' + COD_SUBGRUPO,
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

        oTableVentas = iniciaTabla('tbl_ventas_subgrupos', parms);
        $('#tbl_ventas_subgrupos').removeAttr('style');

        $('#tbl_ventas_subgrupos tbody').on('dblclick', 'tr', function () {
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
    
    return {
        init: function () {
            plugins();
            fillBandeja();
            fillCboEmpresa();
            fillCboSucursal($("#cboEmpresa").val());         
            fillcboMoneda();  
            cargarFechaDefecto();
            eventoControles();  
        }
    };

}();
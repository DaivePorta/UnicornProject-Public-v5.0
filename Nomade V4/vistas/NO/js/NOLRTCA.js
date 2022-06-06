var NOLRTCA = function () {

    var plugins = function () {
        $("#cboEmpresa, #cboSucursal, #cboGrupoProductos,#cboProducto,#slcSgmt,#cboMarcas,#cboMoneda").select2();
        inifechas("txtDesde", "txtHasta");
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
    
    var fillProducto = function () {
        var selectEst = $('#cboProducto');            
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cboEmpresa').val() + "&MARCA_CODE=" + $('#cboMarcas').val() + "&SUBGRUPO_CODE=" + ($("#cboGrupoProductos").val() === null ? "" : $("#cboGrupoProductos").val().toString()),
            contenttype: "application/json;",
            beforeSend:function(){  Bloquear("divCboProducto");},
            datatype: "json",
            async: true,
            success: function (datos) {
              
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboProducto').append('<option value="">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE_COMERCIAL + '</option>');
                    }
                }
                $('#cboProducto').select2('val', 'TODOS');
            },
            error: function (msg) {
                Desbloquear("divCboProducto");
                alert(msg.responseText);
            },
            complete: function () { Desbloquear("divCboProducto"); }
        });
    };

    var fillMarcas = function () {
        
        var selectEst = $('#cboMarcas');
        selectEst.empty();     
       
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmgmar.ashx?OPCION=6&SUBGRUP_CODE=" + ($("#cboGrupoProductos").val() === null ? "" : $("#cboGrupoProductos").val().toString()),
            contenttype: "application/json;",
            beforeSend: function () { Bloquear($(selectEst.parents("div")[0])); },
            datatype: "json",
            async: true,
            success: function (datos) {            
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    selectEst.append('<option value="">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboMarcas').select2('val', 'TODOS');
            },
            error: function (msg) {              
                alert(msg);
                error = msg.responseText;
            },
            complete: function () { Desbloquear($(selectEst.parents("div")[0])); } //fillProducto();
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

    var fillGrupoProductos = function () {

        var select = $('#cboGrupoProductos');
        select.empty();
        //select.append('<option></option>');
        $('#cboGrupoProductos').select2('val', '');
        $.ajax({
            type: "post",
            url: "vistas/NM/ajax/NMMFPRO.ashx?OPCION=6&CTLG_CODE=" + $("#cboEmpresa").val() + "&OPCION2=-",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear("divGrupProd"); },
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                    }
                }
                $('#cboGrupoProductos').select2('val', '');
            },
            complete: function () {
                fillMarcas();              
                Desbloquear("divGrupProd");
               
            },
            error: function (msg) {
                error = msg.responseText;
                alertCustom("Error al cargar Grupo de productos.");
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
                        $(td).html(row + 1);
                    },
                    width:'12%'
                },

                {
                    data: "GRUPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');                      
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({ 'text-align': 'right' });
                        var valor = cellData;
                        $(td).html(formatoMiles(valor));
                    }
                },
                   {
                       data: "PORCENTAJE",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css({ 'text-align': 'right' });
                           var valor = cellData.Redondear(3);
                           $(td).html(valor);
                       }
                   }

            ],
            drawCallback: function () {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                $(api.column(0)).html();
            },
            "scrollY": "45vh", "scrollCollapse": true,
            "paging": false,
            "dom": '<"top cabecera"f><t><"clear">',
            info: false

        });
        $("#tblReporteMostrar_filter").css({ "display": "none" });

        $('#tblReporteMostrar tbody').on('click', 'tr', function () {
            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            if(row!==null)
            $($($("tspan:contains('" + row.GRUPO + "')")[0]).parents("g")[0]).click();

        });

        $('#tblReporteMostrar tbody').on('mouseover', 'tr', function () {
            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            if (row !== null)
            $($($("tspan:contains('" + row.GRUPO + "')")[0]).parents("g")[0]).mouseover();

           
        });

        $('#tblReporteMostrar tbody').on('mouseout', 'tr', function () {
            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            if (row !== null)
            $($($("tspan:contains('" + row.GRUPO + "')")[0]).parents("g")[0]).mouseout();


        });

      

    }

    var eventoControles = function () {
        $("#cboGrupoProductos").on("change", function () {
            fillMarcas();
            fillProducto();
        });

        $('#cboMarcas').on("change", function () {           
            fillProducto();
        });

        $('#btnFiltrar').click(function () {
            if (vErrors(['cboEmpresa','slcSgmt'])) {
                Bloquear('ventana');        
                $('#tblReporteMostrar tbody').html('');
                $('#tblReporte tbody').html('');
                $.ajax({
                    type: "post",
                    url: 'vistas/NO/ajax/NOLRTCA.ashx?OPCION=REPORTE&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&NIVEL=' + $('#slcSgmt').val() +
                                                                                '&DESDE=' + $('#txtDesde').val() + '&HASTA=' + $('#txtHasta').val() + '&GRUP_CODE=' +
                                                                                ($("#cboGrupoProductos").val() === null ? '' : $("#cboGrupoProductos").val().toString()) + '&PROD_CODE=' + $('#cboProducto').val() + 
                                                                                 '&MONE_CODE=' + $('#cboMoneda').val() + '&MARCA_CODE=' + $('#cboMarcas').val(),
                    contenttype: "application/json",
                    datatype: "json",
                    success: function (datos) {
                        oTable.fnClearTable();
                        if (datos.length > 0) {
                            oTable.fnAddData(datos);
                        }

                        
                        $('#pie').highcharts({
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: ('VENTAS POR ' + $("#slcSgmt :selected").html())
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.3f}%</b>'
                            },             
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {                                       
                                        formatter: function () {
                                            if(this.percentage.Redondear(3)>0)
                                            return '<b>' + this.point.name + '</b><br>' + $("#cboMoneda :selected").attr("simbolo") + '.' + formatoMiles(this.point.MONTO) +'<br>' + this.percentage.Redondear(3) + '%';
                                        },
                                        enabled: true,                                     
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                },
                                showInLegend: true
                            },
                            series: [{
                                name: 'Ventas',
                                colorByPoint: true,
                                data: JSON.parse(JSON.stringify(oTable.fnGetData()).split("GRUPO").join("name").split("PORCENTAJE").join("y"))
                            }]
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
            fillGrupoProductos();
            fillProducto();
        });
    };


    return {
        init: function () {
            tablaVacia();
            eventoControles();
            cargarEmpresas();            
            fillMoneda();        
            plugins();
          
            
        }
    };
}();
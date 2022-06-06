
var NVLCLVE = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboSucursal,#cboMoneda').select2();

        $('#cboAnio').multiselect({
            nonSelectedText: 'TODOS'
        });

        $('#cboMeses').multiselect({
            nonSelectedText: 'TODOS'
        });

    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
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
                url: "vistas/NV/ajax/NVLCLVE.ASHX?OPCION=1",
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
                    $('#buscar').removeAttr("disabled");
                }, 250);
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
                //{
                //    data: "CODIGO",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //    },
                //    visible: false
                //},
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {                       
                    }
                },
                {
                    data: "NRO_VENTAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center").addClass("colorColumna");
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center").addClass("colorColumna");
                        $(td).html(cellData.Redondear(2));
                    }
                }                
            ],
            "scrollY": "45vh", "scrollCollapse": true,
            "paging": false,
            "sDom": 'TC<"clear">lfrtip',
            "oTableTools": {
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
        actualizarEstilos();
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
                //Bloquear("divGrafico")
                cargarDatos();
               
            } else {
                $('#buscar').removeAttr("disabled");
            }

        });       

    }

    return {
        init: function () {
            tablaVacia();
            plugins();
            fillCboAnios();
            fillCboEmpresa();
            fillCboSucursal($("#cboEmpresa").val());
            fillcboMoneda();           
            eventoControles();
        }
    };

}();
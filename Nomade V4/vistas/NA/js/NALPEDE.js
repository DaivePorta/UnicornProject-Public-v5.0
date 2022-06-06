var empresa = {};

var correlativo = [];

var tipos_mov = [];

var documentos = [];

var correlativoInterno = [];

var arr = [];
var series = [];

var tabla_det;
var posicion;
var productos = [];
var empleados = [];


var json_datos_imp = null;//almacena los dastoas para imprimir
var jsonlineas_gui = null;//nro de lineas que se pueden imprimir en una sola guia de remision

var ajaxProducto = null;
var vAsientoContable = null;
const sCodModulo = "0004"; // Código del módilo de almacen para contabilidad.

var jsonClientes = [];

//PARAMETROS NUEVOS
var prmtDIGI = 0;//VALIDA STOCK ANTES DE AGREGAR A DETALLES
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE

var NALPEDE = function () {
    var plugins = function () {
        $('#cbo_empresa_l, #cbo_Almc, #cboCodigoProducto, #cboProducto').select2();
        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });
        fnSetRangoDatePickerMesHoy('txtDesde', 'txtHasta', true);
    }

    var crearTablaVacia = function () {
        $("#tabla_det").css({ "font-size": "12px" });
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO_VENTA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "CLIENTE", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "DESC_ESTABLECIMIENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "FECHA_EMISION", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }, type: "fecha"
                },
                {
                    data: "COD_PRODUCTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "NOMBRE_PROD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "CANTIDAD_VENDIDA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "UNIDAD_MEDIDA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "CANTIDAD_DESPACHADA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "CANTIDAD_NO_DESPACHADA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "ALMC_DESPACHO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "TIPO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                },
                {
                    data: "ESTADO_DESPACHO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    //width: '30%'

                }

            ],
            stateSave: false,
            "sDom": 'TC<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            order: [[0, "desc"]]

        }


        oTable = iniciaTabla('tabla_det', parms);

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $(".DTTT.btn-group").css({ "float": "right" });
    };

    var filtrar = function () {
        var data = new FormData();
        var CTLG_CODE = $('#cbo_empresa_l').val();
        var SCSL_CODE = $('#cbo_Almc').val();
        var PROD_CODE = $('#txtCodigoProducto').val();
        var CHK_CODE = $("#chkDespachados").is(":checked") ? "S" : "N";
        var fDesde = $('#txtDesde').val();
        var fHasta = $('#txtHasta').val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('COD_ALMC', SCSL_CODE);
        data.append('PROD_CODE', PROD_CODE);
        data.append('CHK_CODE', CHK_CODE);
        data.append('F_DESDE', fDesde);
        data.append('F_HASTA', fHasta);

        $.ajax({
            type: "POST",
            url: 'vistas/NA/ajax/NALPEDE.ashx?OPCION=LP',
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            beforeSend: function () { Bloquear("div_tabla_dctos"); },
            cache: false,
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                } else {
                    infoCustom2("No se encontraron datos!");
                }
            },
            complete: function () { Desbloquear("div_tabla_dctos"); },
            error: function () {
                Desbloquear("div_tabla_dctos");
                noexito();
            }
        });

    }

    var filtrarCabecera = function () {
        var data = new FormData();
        var CTLG_CODE = $('#cbo_empresa_l').val();
        var SCSL_CODE = $('#cbo_Almc').val();
        var PROD_CODE = $('#txtCodigoProducto').val();
        var CHK_CODE = $("#chkDespachados").is(":checked") ? "S" : "N";
        var fDesde = $('#txtDesde').val();
        var fHasta = $('#txtHasta').val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('COD_ALMC', SCSL_CODE);
        data.append('PROD_CODE', PROD_CODE);
        data.append('CHK_CODE', CHK_CODE);
        data.append('F_DESDE', fDesde);
        data.append('F_HASTA', fHasta);

        $.ajax({
            type: "POST",
            url: 'vistas/NA/ajax/NALPEDE.ashx?OPCION=LPC',
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            beforeSend: function () { Bloquear("div_tabla_dctos"); },
            cache: false,
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                } else {
                    infoCustom2("No se encontraron datos!");
                }
            },
            complete: function () { Desbloquear("div_tabla_dctos"); },
            error: function () {
                Desbloquear("div_tabla_dctos");
                noexito();
            }
        });

    }

    var fillCboempresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_empresa_l').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_empresa_l').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar empresas.');
            }
        });
    }

    var listarAlmacenesListado = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + ctlg + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_Almc').html('<option value="">TODOS</option>');
                if (datos != null) {
                    if (datos[0].CODIGO != "" && datos[0].DESCRIPCION != "") {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbo_Almc').append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].SCSL_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar almacenes.');
            }
        });

    }

    var cargarProductos = function () {
        //Bloquear("divProducto");
        if (ajaxProducto) {
            ajaxProducto.abort();
        }
        ajaxProducto = $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTOS_NAM",
            cache: false,
            data: { CTLG_CODE: $('#cbo_empresa_l').val(), SCSL_CODE: ($('#cbo_Almc :selected').attr('data-scsl-code') === undefined ? "" : $('#cbo_Almc :selected').attr('data-scsl-code')), MONEDA: "0002" },
            datatype: "json",
            async: true
        }).done(function (data) {
            //Desbloquear("divProducto");

            if (data !== null) {
                $('#txtCodigoProducto').typeahead({
                    items: 50,
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < data.length; i++) {
                            array.push(data[i].CODIGO);
                            obj += '{';
                            obj += '"DESC_ADM":"' + data[i].DESC_ADM + '","CODIGO":"' + data[i].CODIGO + '","CODIGO_ANTIGUO":"' + data[i].CODIGO_ANTIGUO + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.CODIGO] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        $("#txtCodigoProducto").val(map[item].CODIGO);
                        $("#txtNombreProducto").val(map[item].DESC_ADM);
                        //datatable();
                        filtrar();
                        return item;
                    },
                }).keyup(function () {
                    if ($(this).val().trim().length === 0) {
                        $("#txtCodigoProducto, #txtNombreProducto").val('');
                        //datatable();
                    }
                });

                $('#txtNombreProducto').typeahead({
                    items: 50,
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < data.length; i++) {
                            array.push(data[i].DESC_ADM);
                            obj += '{';
                            obj += '"DESC_ADM":"' + data[i].DESC_ADM + '","CODIGO":"' + data[i].CODIGO + '","CODIGO_ANTIGUO":"' + data[i].CODIGO_ANTIGUO + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.DESC_ADM] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        $("#txtCodigoProducto").val(map[item].CODIGO);
                        $("#txtCodigoAntiguoProducto").val(map[item].CODIGO_ANTIGUO);
                        //datatable();
                        filtrar();
                        return item;
                    },
                }).keyup(function () {
                    if ($(this).val().trim().length === 0) {
                        $("#txtCodigoProducto, #txtCodigoAntiguoProducto").val('');
                        //datatable();
                    }
                });
            }
        }).fail(function () {
            //Desbloquear("divProducto");
            if (msg.statusText != "abort") {
                alertCustom('Error al listar productos.');
            }
        });
    };

    var eventoControles = function () {
        $('#cbo_empresa_l').on('change', function () {
            //cargarProductos();
            listarAlmacenesListado($(this).val());
            $('#cbo_Almc').select2('val', '').change();
            //filtrar();
        });

        $('#cbo_Almc').on('change', function () {
            $('#cboCodigoProducto').select2('val', '');
            $('#cboProducto').select2('val', '');
            filtrarCabecera(); // REVISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            cargarProductos();
        });

        $('#cboCodigoProducto').change(function () {
            $('#cboProducto').select2('val', $(this).val()).change();
        });

        $('#cboProducto').change(function () {
            $('#cboCodigoProducto').select2('val', $(this).val());
            filtrar();
        });
        $("#btnFiltrar").click(function () {
            if ($('#txtCodigoProducto').val() === '')
                filtrarCabecera();
            else
                filtrar();
        });

        $('#chkDespachados').on('click', function () {
            if ($("#chkDespachados").is(':checked')) {
                if ($("#txtCodigoProducto").val() === '') {
                    filtrarCabecera();
                } else {
                    filtrar();
                }
                $('#chkDespachados').attr('checked', true);
            } else {
                if ($("#txtCodigoProducto").val() === '') {
                    filtrarCabecera();
                } else {
                    filtrar();
                }
                $('#chkDespachados').attr('checked', false);
            }
        });
    }



    return {
        init: function () {
            plugins();
            crearTablaVacia();
            fillCboempresa();
            eventoControles();
            $('#cbo_empresa_l').select2('val', $('#ctl00_hddctlg').val()).change();
            // listarAlmacenesListado($('#cbo_empresa_l').val());
            //$('#cbo_Almc').select2('val', '').change();


        }
    };
}();
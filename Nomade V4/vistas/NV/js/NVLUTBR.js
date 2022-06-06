var pctjBajaUtilidad = 30;
var pctjAltaUtilidad = 60;
var prodActual = {};
var ajaxDetalles = null;
var oTable2;

function cargarParametrosSistema() {
    //OBTENER PARAMETRO PORCENTAJE BAJA UTILIDAD 
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=PBUT",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                pctjBajaUtilidad = parseFloat(datos[0].VALOR);
            }
            else { alertCustom("No se recuperó el Parámetro de Porcentaje de Baja Utilidad(PBUT) correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el Parámetro de Porcentaje de Baja Utilidad(PBUT) correctamente!");
        }
    });
    //OBTENER PARAMETRO PORCENTAJE ALTA UTILIDAD 
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=PAUT",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                pctjAltaUtilidad = parseFloat(datos[0].VALOR);
            }
            else { alertCustom("No se recuperó el Parámetro de Porcentaje de Baja Utilidad(PAUT) correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el Parámetro de Porcentaje de Baja Utilidad(PAUT) correctamente!");
        }
    });
}

var NVLUTBR = function () {

    var plugins = function () {
        $("#cboGrupoProductos").select2();
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDoc').select2();
        $('#cboVendedor').select2();
        $('#cboProducto').select2();
        $('#cboCliente').select2();
        $('#cboEstado').select2();
        $("#cboTipoDoc").select2();
        $('#cboMoneda').select2();

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

        $("#txtSerie").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#txtNumero").inputmask({ "mask": "9", "repeat": 9, "greedy": false });

        fnSetRangoDatePickerMesHoy('txtDesde', 'txtHasta', true);
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
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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

                    if (ObtenerQueryString("ctlg") == undefined) {
                        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    }else{
                        $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                    }

                    fillCboEstablecimiento();
                    if (ObtenerQueryString("scsl") == undefined) {
                        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#cboEstablecimiento").select2("val", ObtenerQueryString("scsl"));
                        $("#txtDesde").val(ObtenerQueryString("desde"));
                        $("#txtHasta").val(ObtenerQueryString("hasta"));
                    }

                    fillCboTipoDoc();
                    fillCboVendedor();
                    fillProducto();
                    fillCliente();
                    fillGrupoProductos();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                //selectEst.append('<option></option>');
                if (datos != null) {
                    // $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                    selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    };

    var fillCboTipoDoc = function () {
        var opcion = 'VENT';
        var select = $('#cboTipoDoc');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                $(select).append('<option Value="TODOS">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                    $(select).select2('val', 'TODOS');
                } else {
                    $(select).select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("No se pudo listar los Tipos de Documentos correctamente.");
            }
        });

    };

    function fillCboVendedor(ctlg, scsl, estado, bAsync) {
        ctlg = $("#cboEmpresa").val()
        scsl = $("#cboEstablecimiento").val()
        estado = "";
        bAsync = true;
        if (bAsync == undefined) {
            bAsync = true;
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
                "&CTLG=" + ctlg +
                "&SCSL=" + scsl +
                "&p_ESTADO_IND=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: bAsync,
            success: function (datos) {
                $('#cboVendedor').empty();
                $('#cboVendedor').append('<option></option>');
                $('#cboVendedor').append('<option Value="TODOS">TODOS</option>');

                if (datos != null) {
                    var f = true;
                    var f2 = true;
                    var options = "";
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO == 'A' && f) {
                            options += '<optgroup label="ACTIVOS">';
                            f &= 0;
                        }
                        if (datos[i].ESTADO == 'I' && f2) {
                            if (f) options += '</optgroup>';
                            options += '<optgroup label="INACTIVOS" >';
                            f2 &= 0;
                        }
                        options += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                    }
                    options += '</optgroup>';
                }

                $('#cboVendedor').append(options);
                $('#cboVendedor').select2("val", "TODOS");

                if (ObtenerQueryString("pidmV") != undefined) {
                    if (ObtenerQueryString("pidmV") != "TODOS") {
                        $('#cboVendedor').select2("val", ObtenerQueryString("pidmV"));
                    }
                }

            },
            error: function (msg) {
                alertCustom("Vendedores no se listaron correctamente.");
            }
        });
    }

    var fillProducto = function () {
        var selectEst = $('#cboProducto');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboProducto').select2('val', 'TODOS');
        Bloquear("divCboProducto");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&SCSL=" + $('#cboEstablecimiento').val() +"&CTLG=" + $('#cboEmpresa').val() + "&GRUP_PROD=" + ($("#cboGrupoProductos").val() === null ? "" : $("#cboGrupoProductos").val().toString()),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboProducto");
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboProducto').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESC_ADM + '</option>');
                    }
                }
                $('#cboProducto').select2('val', 'TODOS');
            },
            error: function (msg) {
                Desbloquear("divCboProducto");
                alertCustom("Productos no se listaron correctamente");
            }
        });
    };

    var fillCliente = function () {
        var selectEst = $('#cboCliente');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboCliente').select2('val', 'TODOS');
        Bloquear("divCboCliente");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboCliente");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].ID + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                }
                $('#cboCliente').select2('val', 'TODOS');
                if (ObtenerQueryString("pidmC") != undefined) {
                    var pidm = pad(ObtenerQueryString("pidmC"), 9);
                    $('#cboCliente').select2("val", pidm);
                    obtenerDocumentos();
                }
            },
            error: function (msg) {
                alertCustom("Clientes no se listaron correctamente");
            }
        });
    }

    var fillGrupoProductos = function () {

        var select = $('#cboGrupoProductos');
        select.empty();
        //select.append('<option></option>');
        $('#cboGrupoProductos').select2('val', '');
        $.ajax({
            type: "post",
            url: "vistas/NM/ajax/NMMFPRO.ashx?OPCION=4&CTLG_CODE=" + $("#cboEmpresa").val() + "&OPCION2=-",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear("divGrupProd"); },
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboGrupoProductos').select2('val', '');
            },
            complete: function () { Desbloquear("divGrupProd"); },
            error: function (msg) {
                alertCustom("Grupos de productos no se listaron correctamente");
            }
        });

    }

    //CARGA MONEDA PARA DATOS DE MONEDA BASE
    var fillCboMoneda = function () {
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
                    simbMoneDet = $("#cboMoneda :selected").attr("simbolo");
                }
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente");
            }
        });
    }

    var crearTablaVacia = function () {
        arrTotalBajaUtil = new Array();
        arrTotalMediaUtil = new Array();
        arrTotalAltaUtil = new Array();
        arrTotalBajaUtilD = new Array();
        arrTotalMediaUtilD = new Array();
        arrTotalAltaUtilD = new Array();
        var parms = {
            data: null,
            columns: [
                    {
                        data: null, createdCell: function (td, cellData, rowData, row, col) {
                            $(td).html("");
                            //ROJO:#CC0000
                            //AMBAR:#ffbf00
                            //VERDE #009900                         
                            //TODO ESTA EN MONEDA BASE
                            if (parseFloat(rowData.PORCENTAJE_UTILIDAD) <= pctjBajaUtilidad || parseFloat(rowData.PORCENTAJE_UTILIDAD) == 0 || rowData.PORCENTAJE_UTILIDAD == null) {
                                $(td).attr('style', "background-color:#CC0000;");//ROJO
                                    arrTotalBajaUtil.push(rowData.UTILIDAD_BRUTA);
                              
                            } else if (parseFloat(rowData.PORCENTAJE_UTILIDAD) >= pctjAltaUtilidad) {
                                $(td).attr('style', "background-color:#009900;");//VERDE
                                    arrTotalAltaUtil.push(rowData.UTILIDAD_BRUTA);
                            } else {
                                $(td).attr('style', "background-color:#ffbf00;");//AMBAR
                                    arrTotalMediaUtil.push(rowData.UTILIDAD_BRUTA);
                            }
                            $(td).attr("align", "center");
                        }

                    },
                    {
                        data: "CODE", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                    },
                    {
                        data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "EMISION", createdCell: function (td, cellData, rowData, row, col) {

                            $(td).html(rowData.EMISION + "<br><small style='color:#6C7686;'>" + rowData.FECHA_ACTV + "</small>");

                            $(td).attr("align", "left");
                        },
                        type: "fecha"

                    },
                    {
                        data: "CLIE_DOID_NRO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "RAZON_SOCIAL", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "MONEDA_DESC_CORTA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                    },
                    {
                        data: "UTILIDAD_BRUTA", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right");
                            $(td).html(simbMoneDet+ " " + formatoMiles(rowData.UTILIDAD_BRUTA));
                        }
                    },
                    {
                        data: "PORCENTAJE_UTILIDAD", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right");
                            $(td).html(formatoMiles(rowData.PORCENTAJE_UTILIDAD)+"%");
                        }
                    },
                    {
                        data: "MOPA_DESC", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "FOPA_DESC", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "NOMBRE_VENDEDOR", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); },
                        visible: false

                    },
                    {
                        data: "VENDEDOR_USUA_ID", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "USUA_ID_REG", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "ATENDIDO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "ANULADO", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "left");
                            $(td).html(cellData + "<br/>" + rowData.PAGADO);
                        }
                    },
                    {
                        data: "GLOSA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }
                    }

            ],
            stateSave: false,
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
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                        i : 0;
                };

                var autoSuma = function (p_Array) {
                    if (p_Array.length)
                        return p_Array.reduce(function (a, b) { return intVal(a) + intVal(b); });
                    else
                        return 0;
                };
                           
                if (api.column(7).data().length) {
                    var auxArrayMoba = new Array();
                    var auxArrayMoal = new Array();
                    //TODO LO DE UTILIDAD ESTA EN MONEDA BASE
                    api.columns(0, { page: 'current' }).data()[0].filter(function (e, d) {                      
                         auxArrayMoba.push(e.UTILIDAD_BRUTA);                    
                    });
                    pageTotalMoba = autoSuma(auxArrayMoba);
                    pageTotalMoal = autoSuma(auxArrayMoal)

                } else {
                    pageTotalMoba = 0
                    pageTotalMoal = 0;
                };
                                        
                var textHTML = " <span style='color:white;background-color:#CC0000;padding:9px;'>" + simbMoneDet + " " + formatoMiles(autoSuma(arrTotalBajaUtil)).toString() + "<small id='lblPctjBajaUtilidad' style='color:#cbcbcb;'><" + pctjBajaUtilidad + "%</small></span>" +
                               " <span style='color:white;background-color:#ffbf00;padding:9px;'>" + simbMoneDet + " " + formatoMiles(autoSuma(arrTotalMediaUtil)).toString() + "<small id='lblPctjMedio' style='color:#cbcbcb;'>" + pctjBajaUtilidad + "%-" + pctjAltaUtilidad + "%</small></span>" +
                               " <span style='color:white;background-color:#009900;padding:9px;'>" + simbMoneDet + " " + formatoMiles(autoSuma(arrTotalAltaUtil)).toString() + "<small id='lblPctjAltaUtilidad' style='color:#cbcbcb;'>>" + pctjAltaUtilidad + "%</small></span></span>";
                            


                // Update footer
                $("#spTotales").html(textHTML);
                $("#spTotal").html(simbMoneDet+" " + formatoMiles(pageTotalMoba).toString());

            }
        }


        oTable = iniciaTabla('tblDocumento', parms);
        //  $(".ColVis.TableTools").remove();
        $(".DTTT").after("<p class='totales'>SUBTOTALES: <SPAN id='spTotales'></SPAN></p>");
        $(".dataTables_length").after("<p class='totales'>Total en página: <SPAN id='spTotal'></SPAN></p>")
        actualizarEstilos();
        $('#tblDocumento tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                codigo_vActual = row.CODE;
                moneda = row.MONEDA_DESC_CORTA;        
                $("#modal-detalles").modal('show');
                CargarDetalles(codigo_vActual);
            }
        });

    }

    var crearTablaDetallesVacia = function () {
        var parms = {
            data: null,
            columns: [
                    {
                        data: "ITEM", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                    }, {
                        data: "PRODUCTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }
                    }, {
                        data: "VALOR_VENTA", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right");
                            $(td).html(simbMoneDet+""+formatoMiles(rowData.VALOR_VENTA));
                        }
                    }, {
                        data: "VALOR_COSTO", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right");
                            $(td).html(simbMoneDet + "" + formatoMiles(rowData.VALOR_COSTO));
                        }
                    }, {
                        data: "CANTIDAD", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                            $(td).html(formatoMiles(rowData.CANTIDAD));
                        }
                    }, {
                        data: "TOTAL", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right");
                            $(td).html(simbMoneDet + "" + formatoMiles(rowData.TOTAL));
                        }
                    },
                    {
                        data: "UTILIDAD_X_UNIDAD", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right");
                            $(td).html(simbMoneDet + "" + formatoMiles(rowData.UTILIDAD_X_UNIDAD));
                        }
                    }, {
                        data: "UTILIDAD_X_ITEM", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right");
                            $(td).html(simbMoneDet + "" + formatoMiles(rowData.UTILIDAD_X_ITEM));
                        }
                    }, {
                        data: "PORCENTAJE_UTILIDAD", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                            $(td).html(formatoMiles(rowData.PORCENTAJE_UTILIDAD)+"%");
                        }
                    }
            ]           
        }
       

        oTable2 = iniciaTabla('tblDetalles', parms);       
    }

    var obtenerDocumentos = function () {
        var data = new FormData();
        var CTLG_CODE = $("#cboEmpresa").val();
        var SCSL_CODE = $("#cboEstablecimiento").val();
        var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
        var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
        var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : parseFloat($("#cboCliente :selected").val()).toString();
        var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
        var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
        var GRUPO = ($("#cboGrupoProductos").val() === null ? '' : $("#cboGrupoProductos").val().toString())

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('DCTO_CODE', DCTO_CODE);
        data.append('VENDEDOR', VENDEDOR);
        data.append('CLIENTE', CLIENTE);
        data.append('PRODUCTO', PRODUCTO);
        data.append('ESTADO', ESTADO);
        data.append('SERIE_DCTO', $("#txtSerie").val());
        data.append('NUM_DCTO', $("#txtNumero").val());
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());
        data.append('GRUPO_PROD', GRUPO);

        $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLUTBR.ashx?OPCION=3",
            beforeSend: Bloquear("divDocumento"),
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            cache: false,
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length > 0) {
                    arrTotalBajaUtil = new Array();
                    arrTotalMediaUtil = new Array();
                    arrTotalAltaUtil = new Array();
                    arrTotalBajaUtilD = new Array();
                    arrTotalMediaUtilD = new Array();
                    arrTotalAltaUtilD = new Array();
                    oTable.fnAddData(datos);
                    oTable.fnSort([[1, "desc"]]);
                } else {
                    infoCustom2("No se encontraron datos!");
                }
            },
            error: function () {
                noexito();
            }, complete: function () {
                Desbloquear("divDocumento");
            }
        });

    }

    function EventoControles() {

        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboTipoDoc();
            fillCboVendedor();
            fillProducto();
            fillCliente();
            fillGrupoProductos();
            Desbloquear("ventana");
        });

        $("#cboGrupoProductos").on("change", function () {
            fillProducto();
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                obtenerDocumentos();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                obtenerDocumentos();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("DOCUMENTO DE VENTA");
            cargarCorreos();
            $('#divMail').modal('show');
        });

        $('#cboEstablecimiento').on('change', function () {
            fillProducto();
        });

    }

    return {
        init: function () {
            cargarParametrosSistema();
            plugins();
            fillCboMoneda();
            crearTablaVacia();
            crearTablaDetallesVacia();
            fillCboEmpresa();
            EventoControles();
            if (ObtenerQueryString("pidmV") == undefined) {
                obtenerDocumentos();
            }
        }
    };
}();


function CargarDetalles(cod) {
    oTable2.fnClearTable();   
    Bloquear('modal-detalles');
    if (ajaxDetalles) {
        ajaxDetalles.abort();
    }
    ajaxDetalles = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/NVLUTBR.ashx?OPCION=LDOCD&p_FVBVTAC_CODE=" + cod,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            if (datos != null) {
                ListarTablaDetalles(datos);
            }
        }, error: function (msg) {
            if (msg.statusText != "abort") {
                alertCustom("Detalles no se listaron correctamente");
            }
        }, complete: function (msg) {
            Desbloquear('modal-detalles');
        }
    });
}
var simbMoneDet = "";
function ListarTablaDetalles(datos) { 
    oTable2.fnClearTable();
    if (datos.length > 0) {       
        var lstItems = [];        
        for (var i = 0; i < datos.length; i++) {
            var item = {};
            item.ITEM = datos[i].ITEM;
            item.PRODUCTO = datos[i].NOMBRE_IMPRESION;
            item.VALOR_VENTA = parseFloat(datos[i].PU).toFixed(2);
            item.VALOR_COSTO = parseFloat(datos[i].COSTO_PRODUCTO_SEGUN_EXO).toFixed(2);
            item.CANTIDAD = parseFloat(datos[i].CANTIDAD).toFixed(2);
            item.TOTAL = parseFloat(datos[i].TOTAL).toFixed(2);

            //var totalCosto = parseFloat(datos[i].COSTO_PRODUCTO_SEGUN_EXO) * parseFloat(datos[i].CANTIDAD)
            //var totalVenta = parseFloat(datos[i].PU) * parseFloat(datos[i].CANTIDAD)

            //item.UTILIDAD_X_ITEM = (totalVenta - totalCosto).toFixed(2)
            //item.UTILIDAD_X_UNIDAD = (parseFloat(datos[i].PU) - parseFloat(datos[i].COSTO_PRODUCTO_SEGUN_EXO)).toFixed(2)
            //item.PORCENTAJE_UTILIDAD = (item.UTILIDAD_X_ITEM * 100 / parseFloat(datos[i].TOTAL)).toFixed(2);

            item.UTILIDAD_X_ITEM = parseFloat(datos[i].UTILIDAD_ITEM).toFixed(2);
            item.UTILIDAD_X_UNIDAD = parseFloat(datos[i].UTILIDAD_UNIDAD).toFixed(2);
            item.PORCENTAJE_UTILIDAD = parseFloat(datos[i].PORCENTAJE_UTILIDAD).toFixed(2);

            lstItems.push(item);
        }
        oTable2.fnAddData(lstItems);
        oTable2.fnSort([[0, "asc"]]);
    } else {
        infoCustom2("No se encontraron datos!");
    }
}



function imprimirDetalle(codigo, nroDoc, tipoDoc) {
    Bloquear("ventana");

    if (tipoDoc == '0012') { //ticket
        var data = new FormData();
        data.append('p_CODE', codigo);
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $("#divDctoImprimir").html(datos);
               setTimeout(function () {
                   imprimirDiv("divDctoImprimir", "", true); //window.print();
               }, 500)

           } else {
               noexito();
           }

       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    } else {
        crearImpresion(codigo);
        Desbloquear("ventana");
    }
}

function imprimirListaDctosVenta() {
    Bloquear("ventana")
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
    var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
    var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : $("#cboCliente :selected").text();
    var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
    var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('DCTO_CODE', DCTO_CODE);
    data.append('VENDEDOR', VENDEDOR);
    data.append('CLIENTE', CLIENTE);
    data.append('PRODUCTO', PRODUCTO);
    data.append('ESTADO', ESTADO);
    data.append('SERIE_DCTO', $("#txtSerie").val());
    data.append('NUM_DCTO', $("#txtNumero").val());
    data.append('DESDE', $("#txtDesde").val());
    data.append('HASTA', $("#txtHasta").val());
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLDOCV.ashx?OPCION=5",
        async: false,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {
                $("#divDctoImprimir").html(datos);
                $("#divDctoImprimir #tblDocumento").attr("border", "1");
                $("#divDctoImprimir #tblDocumento").removeClass("display").removeClass("DTTT_selectable");
                var nomSucursal, nomEmpresa;
                nomSucursal = $("#cboEstablecimiento :selected").html();
                nomEmpresa = $("#cboEmpresa :selected").html();
                imprimirDiv("divDctoImprimir", "DOCUMENTOS DE VENTA - " + nomSucursal);

                //$("#divDctoImprimir").prepend("<hr></hr>")
                //$("#divDctoImprimir").prepend("<h5 class='arial'>DOCUMENTOS DE VENTA - " + nomSucursal + "</h5>")
                //$("#divDctoImprimir").prepend("<h4 class='arial'>" + nomEmpresa + "</h4>")
                //setTimeout(function () {
                //    window.print();
                //}, 200);
            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alertCustom("No se pudo obtener correctamente los documentos de venta.");
        }
    });
}
var detallesVenta = [];
function obtenerDetalleVenta(codigo) {

    Bloquear('tblDetalleVenta');

    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCD&p_FVBVTAC_CODE=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos2) {
            $("#tblDetalleVenta tbody").html('');
            if (datos2 != null) {
                for (var i = 0; i < datos2.length; i++) {
                    $("#tblDetalleVenta tbody").append('<tr>' +
                        '<td style="text-align:center">' + datos2[i].ITEM + '</td>' +
                            '<td>' + datos2[i].NOMBRE_IMPRESION + '</td>' +
                            '<td style="text-align:center">' + parseFloat(datos2[i].CANTIDAD).toFixed(2) + '</td>' +
                            '<td>' + datos2[i].DESC_UNIDAD + '</td>' +
                            '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_PU : datos2[i].PU) + '</td>' +
                            '<td style="text-align:center">' + (parseFloat(datos2[i].CANTIDAD) * (moneda == 'USD' ? datos2[i].CONVERT_PU : datos2[i].PU)).toFixed(2) + '</td>' +
                            '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_DESCUENTO : datos2[i].DESCUENTO) + '</td>' +
                            '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_TOTAL : datos2[i].TOTAL) + '</td>' +
                            '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_ISC : datos2[i].ISC) + '</td>' +
                            '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_DETRACCION : datos2[i].DETRACCION) + '</td>');
                }
            }
            Desbloquear('tblDetalleVenta');
        },
        error: function (msg) {
            Desbloquear('tblDetalleVenta');
            alertCustom('Error al obtener detalle de la venta.');
        }
    });
}

//EMAIL
function cargarCorreos() {
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
        for (var u in data) {
            if (data[u].usuario === $('#ctl00_txtus').val()) {
                $('#txtRemitente').val(data[u].email);
                break;
            }
        }
        $('#cboCorreos').selectize({
            persist: false,
            maxItems: null,
            valueField: 'email',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                    '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.email;
                    var caption = item.name ? item.email : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                    '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                // email@address.com
                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name <email@address.com>
                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                    return { email: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                alertCustom('Invalid email address.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');
    });

    if ($("#txtRemitente").val() == "") {
        $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
    }
};

function enviarCorreo() {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {

        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=correo" +
                      "&p_CODE=" + codigo_vActual +
                      "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
                      "&REMITENTE=" + $('#txtRemitente').val() +
                      "&NREMITENTE=" + $('#txtRemitente').val() +
                      "&DESTINATARIOS=" + destinos +
                      "&ASUNTO=" + $('#txtAsunto').val() +
                      "&MENSAJE=" + $('#txtcontenido').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("No se encontró el archivo adjunto. Correo no se envió correctamente.");

                } else {
                    exito();
                }
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);

            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });

    }
};

$("#divMail").on("show", function () {

    $("#modal_info").modal("hide");

});
$(".close_mail").on("click", function () {

    $("#modal_info").modal("show");

});


function obtenerCabeceraVenta(codigo) {

    Bloquear('ventanaInfo');
    var cod;
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvldoct.ashx?OPCION=LDOCC&p_FVBVTAC_CODE=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    cod = datos[i].CODE;
                    if (datos[i].VIGENCIA == 'ANULADO') {
                        $("#modalTitulo").html('Información de la venta anulada ' + datos[i].CODE);
                        $("#tblInfo").css('background-color', '#F5C4C4');
                        $("#tblMontos").css('background-color', '#F5C4C4');
                    } else {
                        if (datos[i].VENTA_RAPIDA_IND == 'S') {
                            $("#modalTitulo").html('Información de la venta rápida ' + datos[i].CODE);
                            $("#tblInfo").css('background-color', '#F7F2CE');
                            $("#tblMontos").css('background-color', '#F7F2CE');
                        } else {
                            $("#modalTitulo").html('Información de la venta regular ' + datos[i].CODE);
                            $("#tblInfo").css('background-color', '#CEF7DE');
                            $("#tblMontos").css('background-color', '#CEF7DE');
                        }
                    }
                    $("#tblDoc").text(datos[i].DOCUMENTO);
                    $("#tblFecha").html(datos[i].FECHA);
                    $("#tblMoneda").text(datos[i].MONE_DESC)
                    $("#tblCliente").html(datos[i].CLIENTE);
                    $("#tblMopa").text(datos[i].MOPA_DESC);
                    $("#tblFopa").text(datos[i].FOPA_DESC);
                    $("#tblEstado").html(datos[i].ESTADO);
                    $("#tblVendedor").text(datos[i].VENDEDOR);
                    $("#tblCaja").text(datos[i].CAJA_DESC);

                    $("#tblBase").html(formatoMiles(datos[i].GRAVADA)); //IMPORTE
                    $("#tblDescuento").html(formatoMiles(datos[i].DESCUENTO));
                    $("#tblisc").html(formatoMiles(datos[i].ISC));
                    $("#tblExonerada").html(formatoMiles(datos[i].EXONERADA));
                    $("#tblGravada").html(formatoMiles(datos[i].GRAVADA));

                    $("#tblInafecta").html(formatoMiles(datos[i].INAFECTA));
                    $("#tblImporte").html(formatoMiles(datos[i].VALOR));//IMPORTE
                    $("#tblRedondeo").html(formatoMiles(datos[i].REDONDEO));
                    $("#tblDonacion").html(formatoMiles(datos[i].DONACION));
                    $("#tblDetraccion").html(formatoMiles(datos[i].DETRACCION));

                    $("#tblPercepcion").html(formatoMiles(datos[i].PERCEPCION));
                    $("#tblRetencion").html(formatoMiles(datos[i].RETENCION));
                    $("#tblPctjigv").html(formatoMiles(datos[i].PCTJ_IGV));
                    $("#tblMontoigv").html(formatoMiles(datos[i].IGV));
                    $("#tblCobrar").html(formatoMiles(datos[i].IMPORTE));//VALOR

                    if (datos[i].SIG_CLIE.length != 0) {
                        $("#clieSiguiente").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].SIG_CLIE + "');");
                        $("#clieSiguiente").removeClass('disabled');
                    } else {
                        $("#clieSiguiente").attr('href', '#');
                        $("#clieSiguiente").addClass('disabled');
                    }
                    if (datos[i].ANT_CLIE.length != 0) {
                        $("#clieAnterior").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ANT_CLIE + "');");
                        $("#clieAnterior").removeClass('disabled');
                    } else {
                        $("#clieAnterior").attr('href', '#');
                        $("#clieAnterior").addClass('disabled');
                    }

                    if (datos[i].SIG_DOC.length != 0) {
                        $("#corrSiguiente").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].SIG_DOC + "');");
                        $("#corrSiguiente").removeClass('disabled');
                    } else {
                        $("#corrSiguiente").attr('href', '#');
                        $("#corrSiguiente").addClass('disabled');
                    }
                    if (datos[i].ANT_DOC.length != 0) {
                        $("#corrAnterior").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ANT_DOC + "');");
                        $("#corrAnterior").removeClass('disabled');
                    } else {
                        $("#corrAnterior").attr('href', '#');
                        $("#corrAnterior").addClass('disabled');
                    }
                    if (datos[i].SIGUIENTE.length != 0) {
                        $("#docSiguiente").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].SIGUIENTE + "');");
                        $("#docSiguiente").removeClass('disabled');
                    } else {
                        $("#docSiguiente").attr('href', '#');
                        $("#docSiguiente").addClass('disabled');
                    }
                    if (datos[i].ANTERIOR.length != 0) {
                        $("#docAnterior").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ANTERIOR + "');");
                        $("#docAnterior").removeClass('disabled');
                    } else {
                        $("#docAnterior").attr('href', '#');
                        $("#docAnterior").addClass('disabled');
                    }
                    $("#ultDocumento").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ULTIMO + "');");
                    $("#priDocumento").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].PRIMERO + "');");
                    $("#btnImprimirDetalle").attr('onclick', "imprimirDetalle('" + datos[i].CODE + "','" + datos[i].NUM_DCTO + "','" + datos[i].DCTO_CODE + "')");
                }

                obtenerDetalleVenta(cod);

            }

            Desbloquear('ventanaInfo');

        },
        error: function (msg) {
            Desbloquear('ventanaInfo');
            alertCustom('Error al obtener datos de cabecera de la venta.');
            console.log(msg);
        }
    });
}


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
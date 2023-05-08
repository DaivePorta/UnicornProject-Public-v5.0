var linea_credito = 0;
var base_imponible_origen = 0;
var detraccion_origen = 0;
var retencion_origen = 0;
var correlativo = [];
montoBalance = 0;
var detraccionInd = '';
var jsonClientes = [];

var fSumaTotalTabla = 0;

carga_ini_ind = false;
act_dire_ind = false;

IGV_IND = false;
ISC_IND = false;
var HABIDO_IND = "1";
var vAsientoContable = null;
const sCodModulo = "0002";
var prmtACON = "NO";
var token_migo = '';//dporta

var NOLDOCC = function () {
    var ajaxProducto = null;

    var plugins = function () {    
        $('#cboEmpresa, #cbo_establecimiento, #cboTipoDcto,#cboProducto, #cbo_periodo, #cboProveedor, #cboEstado, #cboDeclara').select2();
        $('#txtFechaEmisionI, #txtFechaEmisionF').datepicker({ format: 'dd/mm/yyyy' });
        $('#txtFechaEmisionI, #txtFechaEmisionF').datepicker();
        $('#txtFechaEmisionI').datepicker().change(function () {
            $('#txtFechaEmisionF').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtFechaEmisionF').val().split("/").reverse().join(""))) ? "" : $('#txtFechaEmisionF').val());
            $('#txtFechaEmisionF').datepicker('setStartDate', $(this).val());
        });
        $('#txtFechaEmisionF').datepicker().on("change", function () {
            if ($('#txtFechaEmisionI').val() !== "") {
                $('#txtFechaEmisionF').datepicker('setStartDate', $('#txtFechaEmisionI').val());
            }
        });
    }

    var crearTablaVacia = function () {
        arrTotalAnulados = new Array();
        arrTotalAnuladosD = new Array();

        arrTotalVigente = new Array();
        arrTotalVigenteD = new Array();

        arrTotalImcompleto = new Array();
        arrTotalImcompletoD = new Array();   

        var parms = {
            data: null,
            columns: [
                {
                    data: null, createdCell: function (td, cellData, rowData, row, col) {
                        $($(td).parents("tr")[0]).attr("data-tipo", 'venta anulada');
                        if (rowData.ANULADO.toString() == "ANULADO") {
                            $(td).html("<i class='icon-pushpin' style='color: red;font-size:14px;'>");
                            if (rowData.MONEDA == '0002')//SOLES
                                arrTotalAnulados.push(rowData.TOTAL);
                            else
                                arrTotalAnuladosD.push(rowData.TOTAL);
                        } else {
                            if (rowData.COMPLETO.toString() == "COMPLETO") {
                                $(td).html("<i class='icon-pushpin' style='color: black;font-size:14px;'>")
                                if (rowData.MONEDA == '0002')//SOLES
                                    arrTotalVigente.push(rowData.TOTAL);
                                else
                                    arrTotalVigenteD.push(rowData.TOTAL);
                            } else if (rowData.COMPLETO.toString() == "INCOMPLETO") {
                                $(td).html("<i class='icon-pushpin' style='color: purple;font-size:14px;'>")
                                if (rowData.MONEDA == '0002')//SOLES
                                    arrTotalImcompleto.push(rowData.TOTAL);
                                else
                                    arrTotalImcompletoD.push(rowData.TOTAL);
                            }
                        }
                        $(td).attr("align", "center");

                    }, width: '3%'

                },                
                {
                    data: 'CODIGO',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '5%'
                },
                {
                    data: 'DESC_SUCURSAL',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '10%'
                },
                {
                    data: 'DESC_DCTO',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '7%'
                },
                {
                    data: 'NUM_DCTO',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '9%'
                },
                {
                    data: 'EMISION',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    },
                    type: "fecha",
                    width: '5%'
                },
                {
                    data: 'RAZON_SOCIAL',
                    createdCell: function (cell) {
                        $(cell).css('font-size', '12px')
                    }, width: '12%'
                },
                {
                    data: 'ATENDIDO',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '7%'
                },
                {
                    data: 'SIMBOLO_MONEDA',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '4%'
                },
                {
                    data: 'TOTAL',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '5%'
                },               
                {
                    data: 'EMPRESA', visible: false
                },
                {
                    data: 'SUCURSAL', visible: false
                },
                {
                    data: 'TIPO_DCTO', visible: false
                },
                {
                    data: 'ASIENTO',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '8%'
                },
                {
                    data: 'PERIODO',
                    createdCell: function (cell) {
                        $(cell).css('text-align', 'center')
                        $(cell).css('font-size', '12px')
                    }, width: '8%'
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

                // Total over this page
                if (api.column(8).data().length) {
                    var auxArray = new Array();
                    var auxArray2 = new Array();
                    //filtro
                    api.columns(0, { page: 'current' }).data()[0].filter(function (e, d) {
                        if (e.MONEDA == '0002')
                            auxArray.push(e.TOTAL);
                        else
                            auxArray2.push(e.TOTAL)
                    });

                    pageTotalMoba = autoSuma(auxArray);

                    pageTotalMoal = autoSuma(auxArray2)


                } else {
                    pageTotalMoba = 0
                    pageTotalMoal = 0;
                };

                var SMOBA = "S/.";
                var SMOAL = "US$";                

                $("#tdComprasNormalSol").html("<span style='color:black; text-align: right'>" + SMOBA + " " + formatoMiles(autoSuma(arrTotalVigente)).toString() + "</span>");
                $("#tdComprasNormalDol").html("<span style='color:black; text-align: right'>" + SMOAL + " " + formatoMiles(autoSuma(arrTotalVigenteD)).toString() + "</span>");

                $("#tdComprasAnuladaSol").html("<span style='color:red; text-align: right'>" + SMOBA + " " + formatoMiles(autoSuma(arrTotalAnulados)).toString() + "</span>");
                $("#tdComprasAnuladaDol").html("<span style='color:red; text-align: right'>" + SMOAL + " " + formatoMiles(autoSuma(arrTotalAnuladosD)).toString() + "</span>");

                $("#tdComprasImcompletaSol").html("<span style='color:purple; text-align: right'>" + SMOBA + " " + formatoMiles(autoSuma(arrTotalImcompleto)).toString() + "</span>");
                $("#tdComprasImcompletaDol").html("<span style='color:purple; text-align: right'>" + SMOAL + " " + formatoMiles(autoSuma(arrTotalImcompletoD)).toString() + "</span>");                               

                $("#tdTotales").html("<strong><label style='font-weight: 600; text-align: center'>&nbsp;Total en página: S/. " + formatoMiles(pageTotalMoba).toString() + " | US$ " + formatoMiles(pageTotalMoal).toString() + "</label></strong>");               

            }
        }

        oTable = iniciaTabla('tblDocumento', parms);
        //  $(".ColVis.TableTools").remove();

        //$(".DTTT").after("<p class='totales'>SUBTOTALES: <SPAN id='spTotales'></SPAN></p>");
        //$(".dataTables_length").after("<p class='totales'>Total en página: <span id='spTotal'></span></p>");

        actualizarEstilos();

        $('#tblDocumento tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $('#tblDocumento').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var cod = $('#tblDocumento').DataTable().row(this).data().CODIGO;
            window.open("?f=nomdocc&codigo=" + cod, '_blank');
        }
        });


    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }
    
    var fillCboEmpresa = function () {
        Bloquear("divCboEmpresa");
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divCboEmpresa");
                $("#cboEmpresa").empty();
                $("#cboEmpresa").append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $("#cboEmpresa").append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cboEmpresa").select2("val", $('#ctl00_hddctlg').val()).change();                
            },
            error: function (msg) {
                Desbloquear("divCboEmpresa");
                alertCustom("Empresas no se listaron correctamente.")
            }
        });
    }

    var fillCbo_Periodo = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=100&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {                
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {
                    var valor = "";
                    $('#cbo_periodo').append('<option  value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '" data-mes="' + datos[i].NUMERO_MES + '" data-anio="' + datos[i].ANO + '">' + datos[i].PERIODO_DESC + '</option>');
                        //if (i == datos.length - 1) {
                            valor = datos[i].COD;
                        //}
                    }
                    var cod = ObtenerQueryString("codigo");
                    if (cod == undefined) {
                        $('#cbo_periodo').select2("val", "TODOS");
                        $("#hfvalor_periodo_carga").val(valor);
                    } else {
                        $('#cbo_periodo').select2("val", "TODOS");
                    }
                } else {
                    alertCustom("Error al cargar periodo.")
                }

            },
            error: function (msg) {
                alertCustom("Error al cargar periodo.");
            }
        });
    }

    var fillcboRegistroEspecifico = function (opcion) {
        var select = $('#cboTipoDcto');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).html('<option value="" selected>TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar documentos de registro');
            }
        });
        $(select).select2();
    }

    var fillProducto = function () {
        var selectEst = $('#cboProducto');
        Bloquear($($('#divCboProducto').parents("div")[0]));
        if (ajaxProducto) {
            ajaxProducto.abort();
        }
        ajaxProducto = $.ajax({
            type: "post",
            url: "vistas/na/ajax/NAMINSA.ashx?OPCION=LISTAR_PRODUCTOS&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear($($('#divCboProducto').parents("div")[0]));
                selectEst.html('');
                // selectEst.append('<option></option>');
                if (datos !== null) {
                    $('#cboProducto').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE_COMERCIAL + '</option>');
                    }
                    $('#cboProducto').select2('val', 'TODOS');
                } else {
                    selectEst.html('<option></option>');
                    $('#cboProducto').select2('val', '');
                }
            },
            error: function (msg) {
                Desbloquear($($('#divCboProducto').parents("div")[0]));
                if (msg.statusText != "abort") {
                    alertCustom('Error al cargar productos');
                }
            }
        });
    };

    function filltxtproveedor() {
        $.ajax({
            type: "post",
            //url: "vistas/CP/ajax/CPMPGPR.ashx?flag=3&empresa=" + $('#cboEmpresa').val(),
            url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=LISTAR_PROVEEDORES&CTLG_CODE=" + $('#cboEmpresa').val(),
            async: true,            
            success: function (datos) {                
                if (datos != null) {

                    $("#cboProveedor").empty();
                    $("#cboProveedor").append('<option value="TODOS">TODOS</option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $("#cboProveedor").append('<option value="' + datos[i].PIDM + '">' + datos[i].RAZON_SOCIAL + '</option>');
                        }
                    }

                    $('#cboProveedor').select2("val", "TODOS");
                    //$('#cboProveedor').html(datos).select2("val", "TODOS").change();
                }
            },
            error: function (msg) {
                alert(msg);
            },
            complete: function () {                
            }
        });
    }

    var eventoControles = function () {
        $('#cboEmpresa').on('change', function () {
            ListarEstablecimiento();
            fillcboRegistroEspecifico('NRMX');       
            fillProducto();
            $('#cboProducto').select2("val", "");
            //ListarTodoGeneral();
        });

        $('#cbo_establecimiento').on('change', function () {
            //ListarTodoGeneral();
        });

        $('#cboTipoDcto').change(function () {
            //ListarTodoGeneral();
        });

        $('#cboProducto').change(function () {
            //ListarTodoGeneral();
        });

        $('#txtFechaEmisionI').datepicker().change(function () {
            //ListarTodoGeneral();
        });

        $('#txtFechaEmisionF').datepicker().change(function () {
            //ListarTodoGeneral();
        });

        $("#btnFiltrar").click(function () {           
            ListarTodoGeneral();
        });

        $("#txtFechaEmisionF").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtFechaEmisionI").val(fNueva);

    };

    return {
        init: function () {
          
            plugins();
            crearTablaVacia();
            eventoControles();
            fillCboEmpresa();
            fillCbo_Periodo();
            filltxtproveedor();                        
            ListarTodoGeneral();
        }
    };
}();

function solonumbef(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = '0123456789.-';//Caracteres validos
    for (var i = 0; i < string.length; i++) {
        if (filtro.indexOf(string.charAt(i)) != -1) {
            out += string.charAt(i);
        }
    }
    //Corta la cadena y toma la parte decimal
    var arr = out.split(".");
    //Toma la longitud de la cadena y si es 3, entonces es porque ingresaron otro "."
    var long = arr.length;
    //Si es asi, entonces corta la cadena uno anterior
    if (long == 3) {
        return out.substring(0, out.length - 1);
    }

    var arrDecimal = arr[1];

    //Si es menor o igual al valor del parámetro, entonces muestra el número digitado con normalidad. 
    if (typeof arrDecimal != "undefined") {
        if (arrDecimal.length <= 2) {
            return out;
        }
        //Si es mayor al valor del parámetro entonces corta la cadena longitud de la cadena - 1, para que quite el último digito ingresado.
        return out.substring(0, out.length - 1);
    }

    return out;
} 

var ListarTodoGeneral = function () {
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cbo_establecimiento").val();

    var TIPO_DCTO = ($("#cboTipoDcto").val() == "TODOS") ? '' : $("#cboTipoDcto").val();
    var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
    var PERIODO = $("#cbo_periodo").val();
    if (PERIODO == "TODOS") {
        var MES = "";
        var ANIO = "";
    } else {
        var MES = $('#cbo_periodo option:selected').data('mes');
        var ANIO = $('#cbo_periodo option:selected').data('anio');
    }

    var PROVEEDOR = ($("#cboProveedor").val() == "TODOS") ? '' : $("#cboProveedor").val();
    var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
    var DESDE = $("#txtFechaEmisionI").val();
    var HASTA = $("#txtFechaEmisionF").val();

    var p_PROV_PIDM = 0;

    var data = new FormData();
    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('TIPO_DCTO', TIPO_DCTO);
    data.append('DESDE', DESDE);
    data.append('HASTA', HASTA);
    data.append('PRODUCTO', PRODUCTO);
    data.append('MES', MES);
    data.append('ANIO', ANIO);
    data.append('PROVEEDOR', PROVEEDOR);
    data.append('ESTADO', ESTADO);


    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=BUDPL",
        beforeSend: Bloquear("divDocumento"),
        contentType: false,
        data: data,
        dataType: "json",
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            console.log(datos);
            oTable.fnClearTable();
            if (datos.length > 0) {
                arrTotalAnulados = new Array();
                arrTotalAnuladosD = new Array();

                arrTotalVigente = new Array();
                arrTotalVigenteD = new Array();

                arrTotalImcompleto = new Array();
                arrTotalImcompletoD = new Array();

                oTable.fnAddData(datos);
                oTable.fnSort([[3, "desc"]]);

            } else {
                infoCustom2("No se encontraron datos!");
            }
        },
        error: function () {
            noexito();
        }, complete: function () {
            Desbloquear("ventana");
        }
    });
}

var fillCboDirecciones = function (pidm) {
    //Bloquear("div_direccion");
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=7&PIDM=" + pidm,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            //Desbloquear("div_direccion");
            $('#cbo_direccion').empty();
            $('#cbo_direccion').append('<option></option>');
            var codigo = "";
            if (!isEmpty(datos)) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_direccion').append('<option value="' + datos[i].Secuencia + '" latitud="' + datos[i].LATITUD + '"  longitud="' + datos[i].LONGITUD + '" >' + datos[i].Direccion + '</option>');
                }
                codigo = datos[0].Secuencia;
            }
            $('#cbo_direccion').select2('val', codigo);
            $('#cbo_direccion').change();
        },
        error: function (msg) {
            //Desbloquear("div_direccion");
            infoCustom2("No existen direcciones registradas para el cliente seleccionado.");
        }
    });
}

var NOMDOCC = function () {

    var plugins = function () {
        $('#txt_num_ser_reg').inputmask({ mask: '*', repeat: 4, greedy: false });
        $('#txt_num_doc_reg').inputmask({ mask: '9', repeat: 10, greedy: false });
        $('#cbo_Empresa, #cbo_Sucursal, #cbo_modo_pago, #cbo_doc_registro, #cbo_doc_origen, #cbo_moneda, #cbo_und_medida, #cbx_destino, #cboTipoDoc').select2();
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_vig').datepicker();
        $('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_vig').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txtFechaRegistro, #txtFechaGiro').datepicker("setDate", "now");
        $('#cbo_periodo').select2();
        $('#cbo_direccion').select2();
        $("#cboTipoBien").select2();
        $("#cboDeclara").select2();
    }

    var fillCbo_Periodo = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + $("#cbo_Empresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {
                    var valor = "";
                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                        if (i == datos.length - 1) {
                            valor = datos[i].COD;
                        }
                    }
                    var cod = ObtenerQueryString("codigo");
                    if (cod == undefined) {
                        $('#cbo_periodo').select2("val", valor);
                        $("#hfvalor_periodo_carga").val(valor);
                    } else {
                        $('#cbo_periodo').select2("val", "");
                    }
                } else {
                    alertCustom("Error al cargar periodo.")
                }

            },
            error: function (msg) {
                alertCustom("Error al cargar periodo.");
            }
        });
    }

    var fillCboOperacion = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=LISTAR_OPERA",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //$('#cboDeclara').html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].VALOR == '1' || datos[i].VALOR == '6' || datos[i].VALOR == '7') {
                            $('#cboDeclara').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                        }
                    }
                }
                $('#cboDeclara').select2('val', '0002');
                $("#cboDeclara").change();
            },
            error: function (msg) {
                alertCustom('Error al cargar operaciones.');
            }
        });
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_Empresa').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_Empresa').append('<option value="' + datos[i].CODIGO + '" agente-reten-ind="' + datos[i].AGENTE_RETEN_IND + '" data-pidm="' + datos[i].PIDM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            }
        });
    }

    var ListarSucursales = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_Sucursal').html('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_Sucursal').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_Sucursal').select2('val', $('#ctl00_hddestablecimiento').val());
                $("#cbo_Sucursal").change();
            },
            error: function (msg) {
                alertCustom('Error al listar sucursales.');
            }
        });
    };

    var fillcboOrigen = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=7" + "&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_doc_origen').html('<option value="">NINGUNO</option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_doc_origen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $('#cbo_doc_origen').select2('val', '').change();
            },
            error: function (msg) {
                alertCustom('Error al listar tipos de documentos de origen.');
            }
        });
    }

    var fillcboOrigenEspecifico = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + $('#cbo_doc_registro').val() + "&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_doc_origen').html('<option value="">NINGUNO</option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_doc_origen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $('#cbo_doc_origen').select2('val', '').change();
            },
            error: function (msg) {
                alertCustom('Error al listar tipos de documentos de origen.');
            }
        });
    }

    var fillcboRegistro = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=7&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                var valorAnterior = $('#cbo_doc_registro').val();
                //$('#cbo_doc_registro').html('<option></option>');
                $('#cbo_doc_registro').empty().append("<option></option>");
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_doc_registro').append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $('#cbo_doc_registro').select2();
                if (valorAnterior != '') {
                    $('#cbo_doc_registro').select2("val", valorAnterior).change();
                }
            },
            error: function (msg) {
                alertCustom('Error al listar Documentos de Registro.');
            }
        });
    }

    var fillcboRegistroEspecifico = function (opcion) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_doc_registro').html('<option></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_doc_registro').append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar Documentos de Registro.');
            }
        });
    };

    var fillcboMoneda = function () {
        //Bloquear("divCboMoneda");
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cbo_moneda').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO === "MOBA") { $('#sMOBA').text(datos[i].SIMBOLO); }
                        if (datos[i].TIPO === "MOAL") { $('#sMOAL').text(datos[i].SIMBOLO); }
                    }
                    if (ObtenerQueryString("codigo") == undefined)
                        cargarMonedaDefecto();
                    else
                        Desbloquear("divCboMoneda");
                }
            },
            error: function (msg) {
                alertCustom('Error al listar monedas.');
            }
        });
    }

    var fillimpuesto = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                }
                else { alertCustom("No se recupero el impuesto correctamente!"); }
            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    var fillCboModoPago = function () {
        $('#cbo_modo_pago').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_modo_pago').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_modo_pago').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_modo_pago').val(datos[0].CODIGO);
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cbo_modo_pago').select2();
    }

    var fillcboUniMedida = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=11",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_und_medida').empty();
                $('#cbo_und_medida').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_und_medida').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_und_medida').select2('val', "");
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboTipoBien = function () {
        //Bloquear($($('#cboTipoBien').parents("div")[0]));
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMCLBI.ASHX?OPCION=4"
                + "&p_CODE="
            + "&p_DESCRIPCION="
            + "&p_DESC_CORTA="
            + "&p_ESTADO_IND=A",
            contentType: "application/json;",
            dataType: "json",
            async:true,
            success: function (datos) {
                $('#cboTipoBien').html('<option></option>');
                if (datos != null && datos.length > 0) {
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboTipoBien').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                        $('#cboTipoBien').select2("val", "0001");
                    }
                }
            },
            error: function (msg) {
                alertCustom("Tipo de bienes no se listaron correctamente.");
            },
            complete: function (msg) {
                //Desbloquear($($('#cboTipoBien').parents("div")[0]));
            }
        });
    }

    var cargatablavacia = function () {

        oTable_detalle = iniciaTabla('tblCoutas', {
            data: null,
            columns: [
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "NRO_DIAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort: false,
            preDrawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var columnaFechas = 2;
                var dFechaInicial = new Date($("#txt_fec_emision").datepicker("getDate"));
                // actualiza fecha
                api.column(columnaFechas, { page: 'current' }).data().filter(function (e, d) {
                    var valor = dFechaInicial.addDays(parseInt(api.data()[d].NRO_DIAS)).format("dd/MM/yyyy");
                    api.data()[d].FECHA = valor;
                    $($(rows).eq(d).children()[columnaFechas]).html(valor);
                });
            },
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                api.column(3, { page: 'current' }).data().filter(function (e, d) {
                    $($(rows).eq(d).children()[3]).html(formatoMiles(e));
                });
            }
            //footerCallback: function (row, data, start, end, display) {
            //    var api = this.api();
            //    let spnStatus = $("#txtBalanceadoStatus");
            //    if (data.length > 0) {
            //        let fSumaTotalTabla = api.column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
            //        if (ObjJsonRowSelected.MONTO === fSumaTotalTabla) {
            //            spnStatus.text("BALANCEADO");
            //            spnStatus.removeClass("noBalanceado").addClass("balanceado");
            //        } else {
            //            spnStatus.text("NO BALANCEADO");
            //            spnStatus.removeClass("balanceado").addClass("noBalanceado");
            //        }
            //    }
            //}

        });

        $('#tblCoutas').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblCoutas_filter').css('display', 'none');

    }

    var cargatablavacia2 = function () {
        oTable_detalle_2 = iniciaTabla('tblLetras', {
            data: null,
            columns: [
                {
                    data: "CODIGO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "NUMERO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                },
                {
                    data: "FECHA_EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                }
            ],
            paging: false,
            responsive: true,
            order: [[0, 'desc']],
            ordering: false
        });

        $('#tblLetras').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblLetras_filter').css('display', 'none');

    }

    var cargatablavacia3 = function () {
        oTable_detalle_3 = iniciaTabla('tblLetrasVin', {
            data: null,
            columns: [
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');                     
                        //if (cellData === '') {
                        //    $(td).attr('data-isDefaultText', true);
                        //    $(td).html('Ingrese Numeración de Letras (Doble click)');
                        //} else {
                        //    $(td).attr('data-isDefaultText', false);
                        //}                            
                    }
                },
                {
                    data: "NRO_DIAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort: false,
            preDrawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var columnaFechas = 2;
                var dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                // actualiza fecha
                api.column(columnaFechas, { page: 'current' }).data().filter(function (e, d) {
                    var valor = dFechaInicial.addDays(parseInt(api.data()[d].NRO_DIAS)).format("dd/MM/yyyy");
                    api.data()[d].FECHA = valor;
                    $($(rows).eq(d).children()[columnaFechas]).html(valor);
                });
            },
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                api.column(4, { page: 'current' }).data().filter(function (e, d) {
                    $($(rows).eq(d).children()[4]).html(formatoMiles(e));
                });
            },
            footerCallback: function (row, data, start, end, display) {
                var api = this.api();
                let spnStatus = $("#txtBalanceadoLetras");
                
                if (data.length > 0) {
                    fSumaTotalTabla = api.column(4).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(nMontoSaldoDoc) === fSumaTotalTabla) {
                        spnStatus.text("BALANCEADO");
                        spnStatus.removeClass("noBalanceado").addClass("balanceado");
                    } else {
                        spnStatus.text("NO BALANCEADO");
                        spnStatus.removeClass("balanceado").addClass("noBalanceado");
                    }
                }

                let sCodMoneda = $("#cbo_moneda").val();
                let sSimboloMoneda = (sCodMoneda === "0002" ? "S/." : "$");

                $(api.column(4).footer()).html(sSimboloMoneda + " " + fSumaTotalTabla.toFixed(2));
            }

        });

        $('#tblLetrasVin').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblLetrasVin_filter').css('display', 'none');

    }

    var eventoControles = function () {
                
        $('#cbo_Empresa').on('change', function () {
            fillCbo_Periodo();
            fillcboRegistro();
            ListarSucursales();
            $('#cbo_Sucursal').val($("#ctl00_hddestablecimiento").val());
            //cargarProductos();
            autocompletarCodigoProducto();
            autocompletarProducto();
        });

        $("#cbo_Sucursal").on('change', function () {
            var cod = ObtenerQueryString("codigo");
            if (cod == undefined) {
                if ($("#cbo_Sucursal").val() != "") {
                    if ($("#cbo_Sucursal option:selected").attr("data-exonerado") == "SI") {
                        $("#cbx_destino").select2("val", "ORGNGR");//ORIGEN NO GRAVADO
                        $("#cbx_destino").change();
                    } else {
                        $("#cbx_destino").select2("val", "DSTGRA");//DESTINO GRAVADO
                        $("#cbx_destino").change();
                    }
                }
            }
        });

        $('#cbo_periodo').on('change', function () {
            var mesEmision = $("#txt_fec_emision").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
            var anioEmision = $("#txt_fec_emision").val().split("/")[2];
            var mesPeriodo = $("#cbo_periodo").val().split("-")[0];//$("#cbo_periodo").val() :: "1-2016"
            var anioPeriodo = $("#cbo_periodo").val().split("-")[1];
            //var suma_periodo = parseInt(mesPeriodo) + parseInt(anioPeriodo);
            //var suma_anio = parseInt(mesEmision) + parseInt(anioEmision);
            //var diferencia = suma_periodo - suma_anio;
            var diferencia_uno = anioPeriodo - 1;

            if (mesPeriodo.length == 1) {
                mesPeriodo = ("0" + mesPeriodo).slice(-2);
            } else {
                mesPeriodo;
            }

            if (anioEmision == anioPeriodo && mesEmision == mesPeriodo) {
                $('#cboDeclara').select2('val', '0002');
                $("#cboDeclara").change();
            } else if (anioEmision == anioPeriodo && mesEmision < mesPeriodo) {
                $('#cboDeclara').select2('val', '0004');
                $("#cboDeclara").change();
            } else if ((anioEmision == diferencia_uno && mesEmision >= mesPeriodo)) {
                $('#cboDeclara').select2('val', '0004');
                $("#cboDeclara").change();
            } else if (anioEmision == anioPeriodo && mesEmision > mesPeriodo) {
                infoCustom2('La fecha de emisíon del documento no debe exceder al periodo.');
                $('#cboDeclara').select2('val', '');
            } else {
                $('#cboDeclara').select2('val', '0005');
                $("#cboDeclara").change();
            }

        });

        $('#txt_fec_emision').on('change', function () {
            var mesPeriodo = $("#cbo_periodo").val();
            if (mesPeriodo !== null) {
                var mesEmision = $("#txt_fec_emision").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
                var anioEmision = $("#txt_fec_emision").val().split("/")[2];
                var mesPeriodo = $("#cbo_periodo").val().split("-")[0];//$("#cbo_periodo").val() :: "1-2016"
                var anioPeriodo = $("#cbo_periodo").val().split("-")[1];
                //var suma_periodo = parseInt(mesPeriodo) + parseInt(anioPeriodo);
                //var suma_anio = parseInt(mesEmision) + parseInt(anioEmision);
                //var diferencia = suma_periodo - suma_anio;
                var diferencia_uno = anioPeriodo - 1;

                if (mesPeriodo.length == 1) {
                    mesPeriodo = ("0" + mesPeriodo).slice(-2);
                } else {
                    mesPeriodo;
                }

                if (anioEmision == anioPeriodo && mesEmision == mesPeriodo) {
                    $('#cboDeclara').select2('val', '0002');
                    $("#cboDeclara").change();
                } else if (anioEmision == anioPeriodo && mesEmision < mesPeriodo) {
                    $('#cboDeclara').select2('val', '0004');
                    $("#cboDeclara").change();
                } else if ((anioEmision == diferencia_uno && mesEmision >= mesPeriodo)) {
                    $('#cboDeclara').select2('val', '0004');
                    $("#cboDeclara").change();
                } else if (anioEmision == anioPeriodo && mesEmision > mesPeriodo) {
                    infoCustom2('La fecha de emisíon del documento no debe exceder al periodo.');
                    $('#cboDeclara').select2('val', '');
                } else {
                    $('#cboDeclara').select2('val', '0005');
                    $("#cboDeclara").change();
                }
            }
        });

        $('#btn_act_direccion').on('click', function () {
            if (vErrors(["txt_proveedor"])) {
                fillCboDirecciones($("#hfPIDM").val());
                $("#cbo_direccion").attr("disabled", false);
                act_dire_ind = true;
            }
        });

        $('#btnDireccion').click(function () {
            if ($('#cboTipoDoc').val() === '6') {
                //time = setTimeout(function () {
                //    if ($("#fieldsetOrigen .blockMsg").length == 1) { //La consulta esta demorando mucho   
                //        $("#modal-confirmar").show();
                //    }
                //}, 5000);
                var NRO = $('#txt_ruc_proveedor').val();
                var formData = new FormData();

                formData.append("token", token_migo);
                formData.append("ruc", NRO);

                var request = new XMLHttpRequest();

                request.open("POST", "https://api.migo.pe/api/v1/ruc");
                request.setRequestHeader("Accept", "application/json");

                request.send(formData);
                request.onload = function () {
                    var data = JSON.parse(this.response);
                    if (data.success == true) {
                        if (data.estado_del_contribuyente == "ACTIVO" && data.condicion_de_domicilio == "HABIDO") {
                            $('#cbo_direccion').val(data.direccion);
                            $('#cbo_direccion').append("<option value=\"" + data.direccion + "\">" + data.direccion + "</option>")
                            $('#cbo_direccion').select2("val", data.direccion);
                        }
                    } else {
                        alertCustom("Servicio SUNAT no disponible en estos momentos.");
                    }
                };
            } else {
                alertCustom('Es necesario el RUC para buscar a la persona en SUNAT.');
                if ($('#cbo_direccion')[0].tagName === 'SELECT' && $("#cbo_direccion option").length == 1) {
                    $('#cbo_direccion').html('<option value="DIRECCION NO REGISTRADA">DIRECCION NO REGISTRADA</option>')
                }
            }
        });

        $('#btn_refresh').on('click', function () {
            $('#txt_proveedor').val('');
            $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
            $('#chk_retencion').parent().removeClass('checked');
            $('#cbo_modo_pago option:first-child').prop('selected', true);
            $('#cbo_modo_pago').change();
            $('#txt_plazo_pago').val('0');
            $('#txt_fec_vencimiento').datepicker('setDate', 'now');
            $('#cboTipoDoc').select2('val', '6').change();
            $('#cboTipoDoc').prop('disabled', true);
            $("#hfPIDM, #txt_ruc_proveedor, #txt_id_proveedor, #txt_Retencion").val("");
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
            autocompletarProveedor('#txt_proveedor', '');
            $("#txt_proveedor").val("").keyup();
            $("#lblHabido").html("");
            $("#lblEstado").html("");

            $("#cbo_direccion").empty().html("<option></option>")
            $("#cbo_direccion").select2("val", "")
            $("#cbo_direccion").attr("disabled", false);
            
        });

        $('#cbo_moneda').on('change', function () {
            listarValorCambio();
            calcularTotalOrigen();
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
            $('#simbolo_moneda, #lblSimbolo').text($('#cbo_moneda :selected').attr('simbolo'));
        });

        $("#btnverempl").click(function () {
            if (vErrors(['txt_proveedor'])) {
                BuscarEmpresa($("#hfPIDM").val());
            }
        });

        $('#cbo_doc_registro').on('change', function () {
            var cadena = "0001,0004,0012";
            var cdr = $(this).val();
            if (cdr !== '') {
                if (cadena.indexOf(cdr) >= 0) {
                    fillcboOrigenEspecifico();
                } else {
                    fillcboOrigen();
                }
                $('#cbo_doc_origen').prop('disabled', false);

                switch (cdr) {
                    case '0001': {
                        $('#txt_proveedor').parent().html('<input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor" style="text-transform: uppercase"/>');
                        autocompletarProveedor('#txt_proveedor', '');
                        //$('#txt_num_ser_reg, #txt_num_doc_reg').val('');
                        $('#txt_ruc_proveedor').val('');
                        $('#cboTipoDoc').select2('val', '6').change();
                        break;
                    }
                    case '0004': {
                        $('#txt_proveedor').parent().html('<input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor" style="text-transform: uppercase"/>');
                        autocompletarProveedorPersonaNatural('#txt_proveedor', '');
                        $('#txt_num_ser_reg, #txt_num_doc_reg').val('');
                        $('#txt_ruc_proveedor').val('');
                        cargarCorrelativo();
                        establecerCorrelativo('F');
                        $('#cboTipoDoc').select2('val', '1').change();
                        break;
                    }
                    case '0002': {
                        $('#txt_proveedor').parent().html('<input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor" style="text-transform: uppercase">');
                        autocompletarLocadores('#txt_proveedor', '');
                        $('#txt_num_ser_reg, #txt_num_doc_reg').val('');
                        $('#txt_ruc_proveedor').val('');
                        $('#cboTipoDoc').select2('val', '1').change();
                        break;
                    }
                    case '0012': {
                        $('#txt_proveedor').parent().html('<input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor" style="text-transform: uppercase"/>');
                        autocompletarProveedorPersona('#txt_proveedor', '');
                        $('#txt_num_ser_reg, #txt_num_doc_reg').val('');
                        $('#txt_ruc_proveedor').val('');
                        $('#cboTipoDoc').select2('val', '6').change();
                        break;
                    }
                }

                $('#cbo_moneda').prop('disabled', false);
            } else {
                $("#txt_proveedor").val("").keyup().attr("disabled", "disabled");
            }
        });

        $('#cbo_modo_pago').on('change', function () {

            if ($(this).val() === '0002') {

                $("#txt_plazo_pago, #txt_fec_vencimiento").prop("disabled", false);
                cargarMontoLineaCredito();
                $('#txt_plazo_pago').val($('#txt_plazo_credito').val());
                $("#A5").attr("disabled", false);
                $("#AL").attr("disabled", false);
                $('#A5').removeClass();
                $('#A5').addClass("btn blue span12");
            }
            else {
                $("#txt_plazo_pago, #txt_fec_vencimiento").prop("disabled", true);
                $('#txt_plazo_pago').val('0');
                $("#A5").attr("disabled", true);                                           
                $('#A5').removeClass();
                $('#A5').addClass("btn grey span12");
            }

            if ($('#cbo_modo_pago').val() == "0001") {
                $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
                $("#A5").attr("disabled", true);
                $("#AL").attr("disabled", true);
                $('#A5').removeClass();
                $('#A5').addClass("btn gray span12");
            } else {
                calcularFechaVencimiento();
            }

        });

        $('#txt_plazo_pago').on('keyup', function (e) {
            var code = e.keyCode || e.which;
            if ($("#txt_plazo_pago").val() > 0) {
                var fechita = $("#txt_fec_emision").val();
                let dia = fechita.split("/")[0];
                let mes = fechita.split("/")[1] - 1; // -1 porque el mes empieza en 0 que viene a ser enero y diciembre sería 11
                let anio = fechita.split("/")[2];
                var fecha = new Date(anio, mes, dia);
                var plazo = parseInt($("#txt_plazo_pago").val());
                fecha.setDate(fecha.getDate() + plazo);
                var fecha_vencimiento = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()) + '/' + ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '/' + fecha.getFullYear();
                $("#txt_fec_vencimiento").val(fecha_vencimiento);
                //$.ajax({
                //    type: "post",
                //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=FECHAX",
                //    contenttype: "application/json;",
                //    datatype: "json",
                //    async: false,
                //    data: { ISC: $("#txt_plazo_pago").val(), FECHA_EMISION: $('#txt_fec_emision').val() }
                //}).done(function (data) {
                //    if (data !== null) {
                //        $("#txt_fec_vencimiento").val(data[0].FECHANUEVA);
                //    }
                //}).fail(function (msg) {
                //    alertCustom(msg);
                //});
            } else {
                $("#txt_fec_vencimiento").val($("#txt_fec_emision").val());
            }
        });

        $('#txt_fec_emision').datepicker().change(function () {
            $('#txt_plazo_pago').keyup();
            listarValorCambio();
        });

        $('#cbo_doc_origen').on('change', function () {
            $('.doc_resgistro_extra').remove();
            $('.txt_cod_doc_orig, .txt_num_ser_orig, .txt_num_doc_orig, #txt_base_imponible, #txt_subtotal, #txt_impuesto, #txt_impuesto_calc, #txt_prec_total, #txt_monto_total').val('');
            $('#txt_descuento, #txt_isc, #txt_ajuste').val(0);
            detraccion_origen = 0;
            percepcion_origen = 0;
            retencion_origen = 0;
        });

        $('#cbx_destino').on('change', function () {
            $('#txt_subtotal, #txt_impuesto, #txt_impuesto_calc, #txt_prec_total, #txt_detraccion, #txt_Percepcion, #txt_Retencion, #txt_monto_total').val('');

            if ($("#cbx_destino").val() == "ORGNGR") {
                IGV_IND = false;
                $('#chk_inc_igv').attr("disabled", "disabled");
                $('#chk_inc_igv').prop('checked', false);
                $('#uniform-chk_inc_igv span').removeClass("checked");
            } else {
                $('#chk_inc_igv').removeAttr("disabled");
            }

        });

        $("#btn_add_dcto2").click(function () {
            $("#documentosadd").append("<div class='span12 doc_resgistro_extra' style='margin-left: 0px'>" +
                                           "<div class='span6'></div>" +
                                           "<div class='span1'>" +
                                                "<div class='control-group'>" +
                                                    "<label class='span12 control-label'>Nro</label>" +
                                                "</div>" +
                                           "</div>" +
                                           "<div class='span3'>" +
                                                "<div class='control-group'>" +
                                                    "<div class='controls'>" +
                                                        "<input class='txt_cod_doc_orig' type='hidden' />" +
                                                        "<input class='numeros txt_num_ser_orig span5' type='text' disabled style='text-align: center'/>" +
                                                        "<input class='numeros txt_num_doc_orig span7' type='text' style='margin-left: 4px; text-align: center' disabled/>" +
                                                        "<input class='txt_total_origen' type='hidden' />" +
                                                        "<input class='txt_total_origen_alterno' type='hidden' />" +
                                                        "<input class='txt_detraccion' type='hidden' />" +
                                                        "<input class='txt_detraccion_alterno' type='hidden' />" +
                                                        "<input class='txt_percepcion' type='hidden' />" +
                                                        "<input class='txt_percepcion_alterno' type='hidden' />" +
                                                        "<input class='txt_retencion' type='hidden' />" +
                                                        "<input class='txt_retencion_alterno' type='hidden' />" +
                                                    "</div>" +
                                                "</div>" +
                                            "</div>" +
                                           "<div class='span2'>" +
                                                "<div class='control-group'>" +
                                                    "<div class='controls'>" +
                                                        "<a onclick='buscarDocumento(this)' class='btn blue buscar'><i class='icon-search' style='line-height: initial;'></i></a>" +
                                                        "&nbsp;<a class='btn red remove' onclick='$(this).parent().parent().parent().parent().remove(); calcularTotalOrigen(); Calcular()'><i class='icon-minus' style='line-height: initial;'></i></a>" +
                                                    "</div>" +
                                                "</div>" +
                                           "</div>" +
                                       "</div>");
        });

        $("#rbsinserie").on('change', function () {
            if ($(this).is(":checked")) {
                $("#txt_num_comp_percep, #txt_fec_comp_percep").attr('disabled', true);
            }
        });

        $("#rbseriada").on('change', function () {
            if ($(this).is(":checked"))
                $("#txt_num_comp_percep, #txt_fec_comp_percep").prop('disabled', false);
        });

        $('#chk_detraccion').click(function () {
            if ($(this).is(':checked')) {
                sumaDetrac();
                //$("#txt_num_op_detrac,#txt_fec_comp_detrac").prop('disabled', false);
                $("#txt_detraccion").val($("#txt_monto_detraccion").val());

                $('#chk_percepcion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
                $('#txt_Percepcion, #txt_Retencion, #txt_num_comp_percep, #txt_estado_credito, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
                $('#rbsinserie, #rbseriada').prop('disabled', true);
                $('#rbsinserie').prop('checked', true).parent().addClass('checked');
                $('#rbseriada').prop('checked', false).parent().removeClass('checked');
                cargarCuentaDetraccion();
            } else {
                $("#txt_num_op_detrac, #txt_fec_comp_detrac").prop('disabled', true);
                $("#txt_detraccion, #txt_monto_detraccion").val("");
            }
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
        });

        $("#chk_percepcion").click(function () {
            if ($(this).is(":checked")) {
                $("#txt_Percepcion, #rbsinserie, #rbseriada").prop('disabled', false);
                $('#chk_detraccion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
                $('#txt_detraccion, #txt_Retencion, #txt_monto_detraccion, #txt_num_op_detrac, #txt_fec_comp_detrac, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
                $('#txt_plazo_pago').prop('disabled', true).val('0');
                $('#txt_fec_vencimiento').prop('disabled', true).datepicker('setDate', 'now');
                $('#txt_Percepcion').val(percepcion_origen);
            }
            else {
                $("#rbsinserie, #rbseriada, #txt_num_comp_percep, #txt_fec_comp_percep, #txt_Percepcion").prop('disabled', true);
                $("#txt_Percepcion, #txt_num_comp_percep, #txt_fec_comp_percep").val("");
                $('#rbsinserie').prop('checked', true).parent().addClass('checked');
                $('#rbseriada').prop('checked', false).parent().removeClass('checked');
                $('#txt_Percepcion').val('');
            }
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
        });

        $("#chk_retencion").click(function () {
            if ($(this).is(":checked")) {
                $("#txt_num_comp_reten, #txt_fec_comp_reten, #txt_Retencion").prop('disabled', false);

                $('#chk_percepcion, #chk_detraccion').prop('checked', false).parent().removeClass('checked');
                $('#txt_detraccion, #txt_Percepcion, #txt_num_op_detrac, #txt_fec_comp_detrac, #txt_num_comp_percep, #txt_fec_comp_percep').prop('disabled', true).val('');
                $('#rbsinserie, #rbseriada').prop('disabled', true);
                $('#rbsinserie').prop('checked', true).parent().addClass('checked');
                $('#rbseriada').prop('checked', false).parent().removeClass('checked');
                $('#txt_Retencion').val(retencion_origen);
            }
            else {
                $("#txt_num_comp_reten, #txt_fec_comp_reten, #txt_Retencion").prop('disabled', true);
                $("#txt_Retencion").val("");
            }
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
        });

        $('#txt_base_imponible, #txt_descuento, #txt_isc').keyup(function () {
            $('#txt_subtotal, #txt_impuesto, #txt_impuesto_calc, #txt_prec_total, #txt_monto_total').val('');
            if (!$('#chk_detraccion').is(':checked')) { $('#txt_detraccion').val(''); }
            if (!$('#chk_percepcion').is(':checked')) { $('#txt_Percepcion').val(''); }
            if (!$('#chk_retencion').is(':checked')) { $('#txt_Retencion').val(''); }
            base_imponible = parseFloat($('#txt_base_imponible').val());
        });

        $("#txt_detraccion,#txt_Percepcion,#txt_Retencion,#txt_base_imponible,#txt_descuento,#txt_descuento,#txt_isc,#txt_ajuste").on('keyup', function () {
            if (window.event.keyCode == 13) {
                Calcular();
            }
        });

        $('#txt_cantidad').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 && $(this).val() != '') {
                $('#txt_descuento_det').focus();
            }
        });

        $('#txt_descuento_det').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                if ($(this).val() === '') { $(this).val('0') }
                $('#txt_importe').focus();
            }
        });

        $('#txt_importe').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13 && $(this).val() != '') {
                $('#txt_glosa_det').focus();
            }
        });

        $('#txt_glosa_det').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                $('#A1').focus();
            }
        });

        $('#cboTipoDoc').change(function () {
            if ($(this).val() === '6') {
                $('#txt_ruc_proveedor').val($("#hfRUC").val());
            } else {
                $('#txt_ruc_proveedor').val($("#hfDNI").val());
            }
        });

        $("#chkCuotasLibres").on("click", function () {
            if ($(this).is(":checked")) {
                $("#txtPeriodoCouta").attr("disabled", false);
            } else {
                $("#txtPeriodoCouta").val("");
                $("#txtPeriodoCouta").attr("disabled", true);
            }
        });

        $("#chkLetrasFijas").on("click", function () {
            if ($(this).is(":checked")) {
                $("#txtPeriodoLetra").attr("disabled", false);
            } else {
                $("#txtPeriodoLetra").val("");
                $("#txtPeriodoLetra").attr("disabled", true);
            }
        });

        $('#A5').click(function () {

            if ($("#chkLetrasFijas").is(":checked"))                 
                $('#txtPeriodoLetra').attr('disabled', false);
            else
                $('#txtPeriodoLetra').attr('disabled', true);


            if ($("#txtNumDctoComp").val() === '') {
                infoCustom2('El documento aun no ha sido registrado');
                return;
            }            

            let sCodCompra = $("#txtNumDctoComp").val();
            let aoDocCompra = fnGetDocCompra(sCodCompra);

            if (aoDocCompra.length === 0) {
                infoCustom2("No se encontró el Documento: " + sCodCompra);
                return;
            }

            let sAnuladoInd = aoDocCompra[0].AnuladoInd;
            if (sAnuladoInd === "S") {
                infoCustom("Imposible continuar. ¡El documento está anulado!");
                return;
            }

            let sCompletoInd = aoDocCompra[0].CompletoInd;
            if (sCompletoInd === "N") {
                infoCustom("Imposible continuar. ¡El documento no está completado!");
                return;
            }

            let aoDocSaldoCompra = fnGetSaldoDocCompra(sCodCompra);

          
            if (aoDocSaldoCompra.length === 0) {
                infoCustom("No se pudo obtener el saldo del Documento: " + sCodCompra);
                return;
            }

            nMontoSaldoDoc = aoDocSaldoCompra[0].SALDO;
            

            let simbolo = $("#cbo_moneda option:selected").attr("simbolo")

            if (nMontoSaldoDoc > 0) {
                $('#montoLetra').html(simbolo + ' ' + nMontoSaldoDoc);
            } else {
                $('#montoLetra').html('');
            }
                                    
            $('#divLetraVin').modal('show' );
            //$('#txtPeriodoLetra').attr('disabled', true);


            setTimeout(function () {
                oTable_detalle_3.fnAdjustColumnSizing();
            }, 500);

            fnCargarCanjeLetra();


            if (nMontoSaldoDoc > 0) {
                $('#montoLetra').html(simbolo + ' ' + nMontoSaldoDoc);
            } else {
                $('#montoLetra').html(simbolo + ' ' + fSumaTotalTabla.toFixed(2));
            }

            //if (vErrors(['txtNumDctoComp'])) {
            //    cargarLetras();
            //}
        });

        $('#AL').click(function () {
            if (vErrors(['txt_num_ser_reg', 'txt_num_doc_reg'])) {
                let monto = $('#txt_monto_total').val();
                $('#monto').html('S/. ' + monto);
                $('#divCouta').modal('show');
                $('#txtPeriodoCouta').attr('disabled', true);
                setTimeout(function () {
                    oTable_detalle.fnAdjustColumnSizing();
                }, 200);
            }
        });

        $("#btnSimular").click(function () {
            if (!vErrorBodyNotIcon(["txt_fec_emision", "txtNroCoutas"])) {
                let dFechaInicial = new Date($("#txt_fec_emision").datepicker("getDate"));
                let nroCoutas = parseInt($("#txtNroCoutas").val());
                let bCuotasLibres = $("#chkCuotasLibres").is(":checked");
                nPlazoDiasLinea = $("#txt_plazo_pago").val();
                monto = $('#txt_monto_total').val();
                var dFechaMaxima = dFechaInicial.addDays(nPlazoDiasLinea);
                var objArrayLetrasGen = new Array();
                //.format("dd/MM/yyyy")
                if (bCuotasLibres) {
                    if (!vErrorBodyNotIcon(["txtPeriodoCouta"])) {
                        let nPeriodoCuotas = parseInt($("#txtPeriodoCouta").val());
                        if ((nPeriodoCuotas * nroCoutas) <= nPlazoDiasLinea) {
                            for (var i = 0; i < nroCoutas; i++) {
                                let objJsonCuotaLib = {};
                                objJsonCuotaLib.NRO_DOC_DETALLE = "Cuota " + (i + 1) + ":";
                                objJsonCuotaLib.NRO_DIAS = nPeriodoCuotas * (i + 1);
                                objJsonCuotaLib.FECHA = dFechaInicial.addDays(nPeriodoCuotas * (i + 1)).format("dd/MM/yyyy");
                                objJsonCuotaLib.MONTO = monto / nroCoutas;
                                objArrayLetrasGen.push(objJsonCuotaLib);
                            }
                        } else {
                            infoCustom("Número de letras con periodo ha superado al plazo de la línea de crédito.");
                        }
                    } else {
                        infoCustom("Ingrese los campos requeridos!");
                    }
                } else {

                    for (var i = 0; i < nroCoutas; i++) {
                        let objJsonCuotaLib = {};
                        objJsonCuotaLib.NRO_DOC_DETALLE = "Cuotas " + (i + 1) + ":";
                        objJsonCuotaLib.NRO_DIAS = 0;
                        objJsonCuotaLib.FECHA = "";
                        objJsonCuotaLib.MONTO = 0;
                        objArrayLetrasGen.push(objJsonCuotaLib);
                    }
                }

                oTable_detalle.fnClearTable();
                if (objArrayLetrasGen.length > 0) {
                    oTable_detalle.fnAddData(objArrayLetrasGen);
                    if (!bCuotasLibres) {
                        editaTabla();
                    }
                }

            } else {
                infoCustom("Ingrese los campos requeridos!");
            }
        });

        $("#btnSimular2").click(function () {
            if (!vErrorBodyNotIcon(["txtFechaGiro", "txtFechaRegistro", "txtLugarGiro", "txtNroLetras"])) {
                let sCodMoneda = $("#cbo_moneda").val();
                let sMoneda = (sCodMoneda === "0002" ? "SOL" : "DOL");
                let dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                let nroLetras = parseInt($("#txtNroLetras").val());
                let bLetrasFijas = $("#chkLetrasFijas").is(":checked");
                nPlazoDiasLinea = $("#txt_plazo_pago").val();
                montoBalance = parseFloat(nMontoSaldoDoc);                
                var dFechaMaxima = dFechaInicial.addDays(nPlazoDiasLinea);
                var objArrayLetrasGen = new Array();
                var suma = 0;
                //.format("dd/MM/yyyy")
                if (bLetrasFijas) {
                    if (!vErrorBodyNotIcon(["txtPeriodoLetra"])) {
                        let nPeriodoLetras = parseInt($("#txtPeriodoLetra").val());
                        if ((nPeriodoLetras * nroLetras) <= nPlazoDiasLinea) {
                            for (var i = 0; i < nroLetras; i++) {
                                let objJsonLetraGen = {};
                                objJsonLetraGen.NRO_DOC_DETALLE = '';
                                objJsonLetraGen.NRO_DIAS = nPeriodoLetras * (i + 1);
                                objJsonLetraGen.FECHA = dFechaInicial.addDays(nPeriodoLetras * (i + 1)).format("dd/MM/yyyy");
                                objJsonLetraGen.MONEDA = sMoneda;
                                if (i === nroLetras - 1) {
                                    objJsonLetraGen.MONTO = montoBalance - suma;
                                } else {
                                    suma += (montoBalance / nroLetras).Redondear(2);
                                    objJsonLetraGen.MONTO = (montoBalance / nroLetras).Redondear(2);
                                }
                                objArrayLetrasGen.push(objJsonLetraGen);
                            }
                        } else {
                            infoCustom("Número de letras con periodo ha superado al plazo de la línea de crédito.");
                        }
                    } else {
                        infoCustom("Ingrese los campos requeridos!");
                    }

                } else {

                    for (var i = 0; i < nroLetras; i++) {
                        let objJsonLetraGen = {};                        
                        objJsonLetraGen.NRO_DOC_DETALLE = '';
                        objJsonLetraGen.NRO_DIAS = 0;
                        objJsonLetraGen.FECHA = "";
                        objJsonLetraGen.MONEDA = sMoneda;
                        objJsonLetraGen.MONTO = 0;
                        objArrayLetrasGen.push(objJsonLetraGen);
                    }

                }                

                oTable_detalle_3.fnClearTable();
                if (objArrayLetrasGen.length > 0) {
                    oTable_detalle_3.fnAddData(objArrayLetrasGen);                    

                    if (!bLetrasFijas) {
                        editaTabla2();
                    } else {
                        editaTablaNro();
                    }

                }

            } else {
                infoCustom("Ingrese los campos requeridos!");
            }
        });

        $('#chk_inc_igv').change(function () {
            verificaBalanceo();
        });

        $('#chk_inc_isc').change(function () {
            verificaBalanceo();
        });

        $('#txt_desc_producto').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 && $('#txt_cod_a_producto').val() !== '') {
                $('#txt_cantidad').focus();
            }
        });

        $('#btnActualizarProductos').click(function () {
            Bloquear('divBotonesProd');
            cargarProductos();
        });

        $('#tblProductos tbody').on('click', 'tr', function () {
            var data = $('#tblProductos').DataTable().row($(this)).data();
            $("#hfCOD_PROD").val(data.CODIGO);
            $("#txt_cod_producto").val($("#hfCOD_PROD").val());
            $('#txt_cod_a_producto').val(data.CODIGO_ANTIGUO);
            $("#txt_desc_producto").val(data.DESC_ADM);
            $("#cbo_und_medida").select2('val', data.UNIDAD).change();
            $("#hfporcentaje_detraccion").val(data.DETRACCION)
            $('#txt_cantidad').focus();
            $('#hfPROD_ALMACENABLE').val(data.ALMACENABLE_IND);
            $('#divBuscarProducto').modal('hide');
        });

        $("#btnCompletarConfirmar").on("click", function () {
            Completar();
            $("#modal-confirmar").modal('hide');
        });

        var cuentaclicktab = 0;
        $("#tabAsientos").on("click", function () {
            if (cuentaclicktab <= 0) {
                $('#btnactualizaAsiento').click();
                cuentaclicktab += 1;
            }
        }); 

        $("#btnactualizaAsiento").on("click", function () {
            fnListaMovContable();
        });

        $("#btnDatosGenerales").on("click", function () {
            $("#modal-confirmar").modal('hide');
            $('#tabDatosGenerales').click();
        });

        $("#btnHabido").on("click", function () {
            if (vErrors(["txt_ruc_proveedor", "txt_proveedor"])) {
                $("#modal-habido").modal("show");
                MuestraSunat();
            }
        });

        $("#btnActualizarDS").on("click", function () {
            if (vErrors(["txt_ruc_proveedor", "txt_proveedor"])) {
                    var pidm = $("#hfPIDM").val();
                    var condSunat = $("#spanVerificando").text();
                    var estadoSunat = $("#lblEstadoSunat").text();
                    fnActualizarDatosContribuyente(pidm, condSunat, estadoSunat);
            }
        });

        $("#divLetra_btnaceptar").on("click", function () {            
            let iNroReg = oTable_detalle_3.fnGetData().length;
            if (iNroReg === 0) {
                infoCustom("No existen letras para registrar.");
                return;
            }

            let aoDetLetras = oTable_detalle_3.fnGetData();
            let iNroRef = aoDetLetras.length;
            let iNroDiasAnt = 0;
            let iNroDiasAct = 0;
            let nMontoTabla = 0;

            for (let i = 0; i < iNroReg; i++) {
                iNroDiasAct = parseInt(aoDetLetras[i].NRO_DIAS);
                if (iNroDiasAct < iNroDiasAnt) {
                    infoCustom("El número de días de un item no puede ser menor a un item anterior.");
                    return;
                }
                iNroDiasAnt = parseInt(aoDetLetras[i].NRO_DIAS);
                nMontoTabla = nMontoTabla + parseFloat(aoDetLetras[i].MONTO);
            }

            let nMontoDoc = parseFloat(nMontoSaldoDoc);
            if (nMontoTabla !== nMontoDoc) {
                infoCustom("La sumatoria de los montos de las letras difieren del total del documento");
                return;
            }

            let cont = 0;    
            for (let i = 0; i < aoDetLetras.length; i++) {
                let sCodLetra = aoDetLetras[i].NRO_DOC_DETALLE;
                if (sCodLetra === '') {
                    cont++;
                }
            }

            if (cont === 0) {                               
                let aoLetra = [];
                let flag = 11;
                let empresa = $("#cbo_Empresa").val();
                let sucursal = $("#cbo_Sucursal").val();
                let monto = nMontoTabla;
                let giradoA = $("#cbo_Empresa :selected").attr("data-pidm");
                let lugarGiro = $("#txtLugarGiro").val();
                let nroLetras = $("#txtNroLetras").val();
                let periodoLetras = $("#txtPeriodoLetra").val();
                let fechaGiro = $("#txtFechaGiro").val();
                let moneda = $("#cbo_moneda").val();
                let girador = $("#hfPIDM").val();
                let fechaCanje = $("#txtFechaRegistro").val();
                let sCodUsuario = $("#ctl00_lblusuario").html();

                for (let i = 0; i < iNroReg; i++) {
                    let oLetra = {};

                    oLetra.NRO_DOC_DETALLE = aoDetLetras[i].NRO_DOC_DETALLE;
                    oLetra.FECHA = aoDetLetras[i].FECHA;
                    oLetra.MONTO = aoDetLetras[i].MONTO;

                    aoLetra.push(oLetra);
                }

                let aoDetDocCompra = [];
                let oDetDocCompra = {};
                oDetDocCompra.sCodVenta = $("#txtNumDctoComp").val();
                oDetDocCompra.sMontoVenta = nMontoDoc;
                aoDetDocCompra.push(oDetDocCompra);

                let sJsonDetLetras = JSON.stringify(aoLetra);
                let sJsonDetDoc = JSON.stringify(aoDetDocCompra);

                var data = new FormData();
                data.append("flag", flag);
                data.append("p_usuario", sCodUsuario);
                data.append("p_empresa", empresa);
                data.append("p_sucursal", sucursal);
                data.append("p_NRO", "AUTO");
                data.append("p_tipo", "P");
                data.append("p_fechaGiro", fechaGiro);
                data.append("p_lugar", lugarGiro);
                data.append("p_giradoA", girador);
                data.append("p_girador", giradoA);
                data.append("sucursal", sucursal);
                data.append("p_fechaCanje", fechaCanje);
                data.append("moneda", moneda);
                data.append("p_montoCambio", $('#txt_valor_cambio').val());
                data.append("monto", monto);
                data.append("p_nroLetras", nroLetras);
                data.append("p_periodoLetras", periodoLetras);
                data.append("sJsonDetLetras", JSON.stringify(aoLetra));
                data.append("sJsonDetDoc", JSON.stringify(aoDetDocCompra));
                Bloquear("ventana");
                sException = "";
                $.ajax({
                    type: "POST",
                    url: "vistas/GL/ajax/GLMCANJ.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    success: function (response) {
                        Desbloquear("ventana");
                        if (response == "") {
                            noexito();
                            return;
                        }
                        if (response.indexOf("[Advertencia]:") > -1) {
                            alertCustom(response);
                            return;
                        }
                        if (response.indexOf("[Error]:") > -1) {
                            sException = response;
                            alertCustom("Error al intentar Guardar.");
                            return;
                        }
                        $(".cab_letra").hide();
                        $("#btnSimular2").hide();
                        $("#divLetra_btnaceptar").hide();
                        $("#divLetra_Salir").show();

                        fnCargarCanjeLetra();

                        exito();

                    }
                });
            } else {
                infoCustom('Ingrese todos los Números de letras,');
            }

            console.log(aoDetLetras);
        });

        $('#A3').click(function () {
            CompletarDcto();
        });

        $('#txt_comentario, #txt_glosa_det').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                return false;
            }
        });
    
    };  

    var fnGetDocCompra = function (sCodCompra) {
        let aoDocCompra = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=GET_DOC_COMPRA&p_CODE=" + sCodCompra,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocCompra = datos;
                
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de venta.");
            }
        });
        Desbloquear("ventana");

        return aoDocCompra;
    };

    var fnLimpiarDatosLetras = function () {
        $("#txtFechaGiro").val("");
        $("#txtFechaRegistro").val("");
        $("#txtLugarGiro").val("");

        $("#txtNroLetras").val("");
        $("#txtPeriodoLetra").val("");
    };

    var fnGetSaldoDocCompra = function (sCodCompra) {
        let aoDocSaldoCompra = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVMDOCV.ashx?OPCION=GET_SALDO_DOC_VTA&p_CODE=" + sCodCompra,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocSaldoCompra = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de compra.");
            }
        });
        Desbloquear("ventana");

        return aoDocSaldoCompra;
    };

    var fnCargarCanjeLetra = function () {
        if (!vErrors(['txtNumDctoComp'])) {
            return;
        }

        $(".cab_letra").show();
        $("#btnSimular2").show();
        $("#divLetra_btnaceptar").show();
        $("#divLetra_Salir").hide();

        let sCodCompra = $("#txtNumDctoComp").val();        
        let sCodCanje = fnGetCodCanjeXDocCompra(sCodCompra);


        let aoCanje = fnGetCanje(sCodCanje);
        if (aoCanje.length === 0) {
            return;
        }

        $(".cab_letra").hide();
        $("#btnSimular2").hide();
        $("#divLetra_btnaceptar").hide();
        $("#divLetra_Salir").show();

        fnLimpiarDatosLetras();

        let aoLetrasxCanje = fnListarLetrasxCanje(sCodCanje);
        if (aoLetrasxCanje.length === 0) {
            return;
        }

        let sCodMoneda = $("#cbo_moneda").val();
        let sMoneda = (sCodMoneda === "0002" ? "SOL" : "DOL");

        let objArrayLetrasGen = new Array();
        let iNroReg = aoLetrasxCanje.length;
        for (var i = 0; i < iNroReg; i++) {
            let objJsonLetraGen = {};
            objJsonLetraGen.NRO_DOC_DETALLE = aoLetrasxCanje[i].NRO_DOC_DETALLE;
            objJsonLetraGen.NRO_DIAS = aoLetrasxCanje[i].NRO_DIAS;
            objJsonLetraGen.FECHA = aoLetrasxCanje[i].FECHA;
            objJsonLetraGen.MONEDA = sMoneda;
            objJsonLetraGen.MONTO = aoLetrasxCanje[i].MONTO;

            objArrayLetrasGen.push(objJsonLetraGen);
        }

        oTable_detalle_3.fnClearTable();
        if (objArrayLetrasGen.length > 0) {
            oTable_detalle_3.fnAddData(objArrayLetrasGen);
            editaTabla();
        }
    };

    var fnListarLetrasxCanje = function (sCodCanje) {
        let aoLetrasxCanje = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMCANJ.ashx?flag=9&sCodCanje=" + sCodCanje,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoLetrasxCanje = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        Desbloquear("ventana");

        return aoLetrasxCanje;
    };

    var fnGetCodCanjeXDocCompra = function (sCodCompra) {
        let sCodCanje = "";

        let p_flag = "GET_COD_CANJE_X_VTA";
        let data = new FormData();
        data.append("flag", p_flag);
        data.append("sCodVenta", sCodCompra);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMCANJ.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    infoCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    infoCustom("Error al intentar Guardar.");
                    return;
                }
                sCodCanje = response;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });

        return sCodCanje;
    };

    var fnGetCanje = function (sCodCanje) {
        let aoCanje = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMCANJ.ashx?flag=GET_COD_CANJE&sCodCanje=" + sCodCanje,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoCanje = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        Desbloquear("ventana");

        return aoCanje;
    };

    var calcularFechaVencimiento = function () {
        if ($("#txt_plazo_pago").val() > 0) {
            var fecha = new Date(Date($("#txt_fec_emision").val()));
            var plazo = parseInt($("#txt_plazo_pago").val());
            fecha.setDate(fecha.getDate() + plazo);
            var fecha_vencimiento = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()) + '/' + ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '/' + fecha.getFullYear();
            $("#txt_fec_vencimiento").val(fecha_vencimiento);
            //$.ajax({
            //    type: "post",
            //    url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=FECHAX&p_PLAZO=" + $("#txt_plazo_pago").val() + "&p_FECHA_EMISION=" + $("#txt_fec_emision").val(),
            //    contenttype: "application/json;",
            //    datatype: "json",
            //    async: false,
            //    success: function (datos) {
            //        if (datos != null) {
            //            $("#txt_fec_vencimiento").val(datos[0].FECHANUEVA);
            //        }
            //    },
            //    error: function (msg) {
            //        alert(msg);
            //    }
            //});
        }
    };

    var editaTabla = function () {
        oTable_detalle.makeEditable({
            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [null,
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0]).hasClass("monto")) {
                    let fSumaTotalTabla = oTable_detalle.api(true).column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 0) {
                        return false;
                    }
                    if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > monto) {
                        infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }

                }
                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }

            }
        });
    };

    var editaTabla2 = function () {
        oTable_detalle_3.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [{
                    cssclass: "required letras",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit',
                    placeholder: 'Ingrese Numeración de Letras (Doble Click)'
                },
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }, null, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0]).hasClass("letras")) {
                    /* if (input[0].value === '' && original!=='') {
                         infoCustom("Ingrese el numero de letra.");
                         input[0].value = original;
                         $(input.parents("form")[0]).submit();
                     } else {*/
                    if (oTable_detalle_3.api(true).column(0).data().indexOf(input[0].value) >= 0 && input[0].value != original && input[0].value !== '') {
                        infoCustom("El numero de letra ya ha sido ingresado.");
                        input[0].value = original;
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                    // }
                }

                if ($(input.parents("form")[0]).hasClass("monto")) {
                    let fSumaTotalTabla = oTable_detalle_3.api(true).column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 0) {
                        return false;
                    }
                    if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > monto) {
                        infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }

                }
                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }
            }
        });
    };

    var editaTablaNro = function () {
        oTable_detalle_3.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [
                {
                    cssclass: "letras",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit',
                    placeholder:'Ingrese Numeración de Letras (Doble Click)'
                },
                null, null, null, null
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0]).hasClass("letras")) {                    
                   /* if (input[0].value === '' && original!=='') {
                        infoCustom("Ingrese el numero de letra.");
                        input[0].value = original;
                        $(input.parents("form")[0]).submit();
                    } else {*/
                    if (oTable_detalle_3.api(true).column(0).data().indexOf(input[0].value) >= 0 && input[0].value != original && input[0].value!=='') {
                            infoCustom("El numero de letra ya ha sido ingresado.");
                            input[0].value = original;
                            $(input.parents("form")[0]).submit();
                        } else {
                            return true;
                        }
                   // }
                }

            }
        });
    };

    var cargarMontoLineaCredito = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=MONTO_LINEA_CREDITO&CTLG_CODE=" + $('#cbo_Empresa').val() + "&PROV_PIDM=" + $('#hfPIDM').val(),
            contenttype: "application/json;",
            async: false,
            datatype: "json",
            success: function (datos) {
                if (datos !== null && datos !== '') {
                    linea_credito = parseFloat(datos);
                } else {
                    linea_credito = 0;
                }
            },
            error: function (msg) {
                alertCustom('Error al cargara datos de línea de crédito.');
            }
        });
    };

    var cargarMonedaDefecto = function () {
        //OBTENER PARAMETRO MONEDA POR DEFECTO COMPRAS
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MCOM",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboMoneda");
                if (datos != null) {
                    $('#cbo_moneda').select2("val", datos[0].VALOR).change();
                }
            },
            error: function (msg) {
                Desbloquear("divCboMoneda");
            }
        });
    };

    var CompletarDcto = function () {
        var montoDetracTemp = 0;
        if ($(".detraccion").length > 0) {
            $(".detraccion").each(function () {
                montoDetracTemp += parseFloat($(this).text());
            });
        } else if ($(".detrac").length > 0) {
            $(".detrac").each(function () {
                montoDetracTemp += parseFloat($(this).text());
            });
        } else {
            if ($("#txt_monto_detraccion").val() == "") {
                $("#txt_monto_detraccion").val("0");
            }
            montoDetracTemp = parseFloat($("#txt_monto_detraccion").val());
        }

        if ($("#cbo_periodo").val() != "") {
            if ($("#hfvalor_periodo_carga").val() != $("#cbo_periodo").val()) {
                $("#lblMensajeConfirmar").html("Usted ha modificado el periodo de la compra pero NO hizo clic en 'Modificar'. Por favor click en Modificar.");
                $("#modal-confirmar").modal('show');
                return;
            }
        }

        if (act_dire_ind) {
            $("#lblMensajeConfirmar").html("Usted ha modificado la dirección de la compra pero NO hizo clic en 'Modificar'. Por favor click en Modificar.");
            $("#modal-confirmar").modal('show');
            return;
        }

        if ($('#chk_inc_igv').is(':checked') !== IGV_IND || $('#chk_inc_isc').is(':checked') !== ISC_IND) {
            $("#lblMensajeConfirmar").html("Usted ha modificado el indicador de IGV o ISC de la compra pero NO hizo clic en 'Modificar'. Por favor click en Modificar.");
            $("#modal-confirmar").modal('show');
            return;
        }

        if (detraccionInd != "") {
            var cadena = "de " + $("#cbo_moneda :selected").attr("simbolo") + " " + montoDetracTemp;
            $("#lblMontoDetraccion").html(cadena);

            if (detraccionInd == 'N' && montoDetracTemp > 0) {
                $("#lblMensajeConfirmar").html("NO se tomará en cuenta a menos que modifique el documento.");
                $("#modal-confirmar").modal('show');
            } else {
                if (detraccionInd == 'S' && !$('#chk_detraccion').is(':checked') && montoDetracTemp > 0) {
                    $("#lblMensajeConfirmar").html("Usted ha marcado que el documento NO está sujeto a detracción pero NO hizo clic en 'Modificar'. La detracción SI se tomará en cuenta.");
                    $("#modal-confirmar").modal('show');
                } else {
                    Completar();
                    //fnListaMovContable();
                }
            }
        } else {
            console.log("Ocurrió algún problema al obtener indicador de detracción.");
        }
    };

    var Completar = function () {
        if ($("#hfBalanceo").val() === "B") {
            if (costosCorrectos()) {
                if (vErrors(["cbo_periodo"])) {
                    Bloquear("modal-confirmar");
                    Bloquear("ventana");
                    $.ajax({
                        type: "post",
                        url: "vistas/no/ajax/nomdocc.ashx?OPCION=COMPLETAR&FACC_CODE=" + $("#txtNumDctoComp").val() + "&USUARIO=" + $("#ctl00_lblusuario").html(),
                        async: false,
                        success: function (datos) {

                            if (datos.indexOf("[Error]") > -1) {
                                alertCustom(datos);
                                Desbloquear("ventana");
                                Desbloquear("modal-confirmar");
                                return;
                            }

                            if (datos.indexOf("[Advertencia]") > -1) {
                                alertCustom(datos);
                                Desbloquear("ventana");
                                Desbloquear("modal-confirmar");
                                return;
                            }

                            if (datos == "OK") {
                                $("#detalle_compra").find(":input").attr('disabled', 'disabled');
                                $("#datos_generales").find(":input").attr("disabled", true);
                                $("#form_add_prod").attr("style", "display:none");
                                $("#div_btn_completar").attr("style", "display:none");
                                $("#acciones_generales").attr("style", "display:none");
                                listarDetCompl($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                                //DIRECCION
                                $("#cbo_direccion").attr("disabled", true);
                                $("#btn_act_direccion").remove();
                                exito();
                                if ($('#cbo_modo_pago').val() == '0002')
                                    $("#A5").attr("disabled", false);
                                else
                                    $("#A5").attr("disabled", true);

                                let aoDocCompra = fnGetDocCompra($("#txtNumDctoComp").val());
                                console.log(aoDocCompra[0].TC);
                                if (aoDocCompra.length === 0) {
                                    return;
                                }

                                if (prmtACON == "SI") {
                                    var sCodCompra = $("#txtNumDctoComp").val();
                                    sCodCompra = $.trim(sCodCompra);
                                    var oDocCompra = fnGetDocCompra(sCodCompra);
                                    vAsientoContable.sCodDoc = sCodCompra;
                                    vAsientoContable.objDoc = oDocCompra;
                                    $('#btnGenerarAsiento').click();
                                }
                                $("#txt_valor_cambio").val(aoDocCompra[0].TC);
                            }
                            else {
                                noexito();
                            }

                            Desbloquear("ventana");
                            Desbloquear("modal-confirmar");
                            //fnListaMovContable();
                        },
                        error: function (msg) {
                            Desbloquear("ventana");
                            Desbloquear("modal-confirmar");
                            alertCustom('Error en el servidor al intentar completar el documento.');
                        }
                    });
                } else {
                    $("#tabDatosGenerales").click();
                    //$("#hfindicador_periodo_no_selecccionado").val("1")
                }
            } else { infoCustom('Por favor, verifique los costos de cada detalle del documento.'); }
        } else { alertCustom("Documento no balanceado.") }
    };

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        $("#btn_add_dcto").attr("href", "?f=nrmgepr");
        $("#btn_add_dcto").attr("target", "_blank");
        $("#A5").attr("disabled", true);
        $("#AL").attr("disabled", true);
        if (cod !== undefined) {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:ActualizarDctoCompra();");
            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/no/ajax/nomdocc.ashx?OPCION=S&codigo=" + cod,
                contentType: "application/json;",
                dataType: "json"
            }).done(function (datos) {

                act_dire_ind = false;


                console.log(datos);

                $('#hfIMPUESTO').val(datos[0].PORCE_IGV);
                $("#txtNumDctoComp").val(datos[0].CODIGO);

                $("#cbo_Empresa").select2('val', datos[0].EMPRESA).change();//Este change carga periodos
                $("#cbo_Sucursal").select2('val', datos[0].SUCURSAL).change();
                $("#txt_num_ser_reg").val(datos[0].SERIE_DOC_REGISTRO);
                $("#txt_num_doc_reg").val(datos[0].NUM_DOC_REGISTRO);
                $("#hfPIDM").val(datos[0].PIDM);
                $("#txt_proveedor").val(datos[0].RAZON_SOCIAL);
                $('#txt_fec_transaccion').datepicker('setDate', datos[0].FECHA_TRANSACCION);
                //$("#txt_fec_emision").datepicker('setDate', datos[0].EMISION);
                $("#cbo_moneda").select2('val', datos[0].MONEDA).change();
                $("#txt_valor_cambio").val(datos[0].VALOR_CAMBIO);
                $("#txt_comentario").val(datos[0].GLOSA);
                $("#cbx_destino").select2('val', datos[0].OPERACION).change();
                if (datos[0].TIPO_BIEN != "") {
                    $("#cboTipoBien").select2('val', datos[0].TIPO_BIEN);
                } else {
                    $("#cboTipoBien").select2('val', "");
                }
                
                fillcboRegistroEspecifico('NRMX');//DPORTA 14/12/2021 SIRVE PARA CARGAR SOLO LOS DOCS. QUE SE SE USAN EN COMPRA
                $("#txt_ruc_proveedor").val(datos[0].RUC);
                $("#cbo_doc_registro").select2('val', datos[0].TIPO_DOC_REGISTRO);
                //INICIO DE SECCION DE CARGA DE SERIE REPARTIDA
                $("#cbo_doc_origen").select2('val', datos[0].TIPO_DCTO).change();

                var serie = datos[0].SERIE.split(',');
                var num = datos[0].NUM_DCTO.split(',');
                var cod = datos[0].DCTO_CODE_REF.split(',');
                for (var i = 1; i < serie.length; i++) {
                    $("#btn_add_dcto2").click();
                }
                var iseries = $('.txt_num_ser_orig');
                var inums = $('.txt_num_doc_orig');
                var icods = $('.txt_cod_doc_orig');

                for (var i = 0; i < iseries.length; i++) {
                    $(iseries[i]).val(serie[i]);
                    $(inums[i]).val(num[i]);
                    $(icods[i]).val(cod[i]);
                }
                $('a.buscar, a.add, a.remove').remove();

                var tipoMoneda = $('#cbo_moneda :selected').attr('tipo');

                base_imponible = parseFloat((tipoMoneda === 'MOBA') ? datos[0].VALOR : datos[0].CONVERT_VALOR);
                $("#txt_base_imponible").val(base_imponible.toFixed(2));
                $('#txt_ajuste').val(datos[0].AJUSTE);
                $("#txt_isc").val((tipoMoneda === 'MOBA') ? datos[0].ISC : datos[0].CONVERT_ISC);
                $("#txt_descuento").val((tipoMoneda === 'MOBA') ? datos[0].DESCUENTO : datos[0].CONVERT_DESCUENTO);

                detraccionInd = datos[0].DETRACCION_IND;
                if (datos[0].DETRACCION_IND === 'S') {
                    $("#txt_monto_detraccion").val((tipoMoneda === 'MOBA') ? datos[0].DETRACCION : datos[0].CONVERT_DETRACCION);
                    $("#txt_detraccion").val((tipoMoneda === 'MOBA') ? datos[0].DETRACCION : datos[0].CONVERT_DETRACCION);
                    $("#chk_detraccion").attr("checked", true).change();
                    $('#uniform-chk_detraccion span').removeClass().addClass("checked");

                    $("#txt_num_op_detrac").val(datos[0].NUM_OPE_DETRAC);
                    $("#txt_cta_detrac").val(datos[0].NRO_CUENTA_DETRAC);
                    $("#txt_fec_comp_detrac").datepicker('setDate', datos[0].FECHA_DETRAC);
                    //$('#txt_num_op_detrac, #txt_fec_comp_detrac').prop('disabled', false);
                }

                if (datos[0].PERCEPCION_IND === 'S') {
                    $("#txt_Percepcion").val((tipoMoneda === 'MOBA') ? datos[0].PERCEPCION : datos[0].CONVERT_PERCEPCION);
                    $("#chk_percepcion").attr("checked", true).change();
                    $('#uniform-chk_percepcion span').removeClass().addClass("checked");

                    if (datos[0].IMPR_FACT_PERCEP === 'N') {
                        $("#rbseriada").attr("checked", true).change();
                        $('#uniform-rbseriada span').removeClass().addClass("checked");
                        $('#uniform-rbsinserie span').removeClass();
                        $("#txt_num_comp_percep").val(datos[0].NUM_OPE_PERCEP);
                        $("#txt_fec_comp_percep").val(datos[0].FECHA_PERCEP);
                    }
                    else {
                        $("#rbsinserie").attr("checked", true).change();
                        $('#uniform-rbsinserie span').removeClass().addClass("checked");
                        $('#uniform-rbseriada span').removeClass();
                    }
                }

                if (datos[0].RETENCION_IND === 'S') {
                    $("#chk_retencion").attr("checked", true).change();
                    $("#txt_Retencion").val((tipoMoneda === 'MOBA') ? datos[0].RETENCION : datos[0].CONVERT_RETENCION);
                    $('#uniform-chk_retencion span').removeClass().addClass("checked");
                    $("#txt_num_comp_reten").val(datos[0].NUM_OPE_RETEN);
                    $("#txt_fec_comp_reten").datepicker('setDate', datos[0].FECHA_RETEN);
                }

                $("#txt_prec_total").val((tipoMoneda === 'MOBA') ? datos[0].IMPORTE : datos[0].CONVERT_IMPORTE);
                $("#txt_monto_total").val((tipoMoneda === 'MOBA') ? datos[0].IMPORTE : datos[0].CONVERT_IMPORTE);
                $("#txt_impuesto_calc").val(datos[0].IGV);

                $("#hfRUC").val(datos[0].RUC);
                $("#hfCOD_EMPRESA").val(datos[0].EMPRESA);
                $("#hfCOD_SCSL").val(datos[0].SUCURSAL);
                $("#hfIGV_IND").val(datos[0].IMPUESTO_IND);
                if (datos[0].IMPUESTO_IND === 'S') {
                    IGV_IND = true;
                    $('#chk_inc_igv').prop('checked', true);
                    $('#uniform-chk_inc_igv span').removeClass().addClass("checked");
                }

                if (datos[0].ISC_IND === 'S') {

                    ISC_IND = true;
                    $('#chk_inc_isc').prop('checked', true);
                    $('#uniform-chk_inc_isc span').removeClass().addClass("checked");
                }

                Calcular();
                if ($("#hfIGV_IND").val() === "S") {
                    $("#lbl_monto_total").html("<b>" + formatoMoneda($("#txt_prec_total").val(), $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
                    $("#hfMONTO_TOTAL").val($("#txt_prec_total").val());
                } else {
                    $("#lbl_monto_total").html("<b>" + formatoMoneda($("#txt_subtotal").val(), $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
                    $("#hfMONTO_TOTAL").val($("#txt_subtotal").val());
                }
                $("#txtNumDctoComp_Det").val(datos[0].CODIGO);
                $("#txtcod_empresa").val(datos[0].EMPRESA);
                $("#txt_empresa_desc").val(datos[0].DESC_CATALOGO);
                $("#txtcod_sucursal").val(datos[0].SUCURSAL);
                $("#txt_sucursal_desc").val(datos[0].DESC_SUCURSAL);
                $("#txtNumSec, #txtNumSec_det").val(datos[0].SECUENCIA);
                $('#div_btn_add_prods').css('display', 'block');
                var estado = (datos[0].PAGADO_IND === 'S') ? 'PAGADO' : 'NO PAGADO';
                $('#txt_estado_credito').val(estado);

                if (datos[0].COMPLETO === "S") {

                    $("#btn_act_direccion").remove()

                    $("#detalle_compra").find(":input").attr('disabled', 'disabled');
                    $("#datos_generales").find(":input").attr("disabled", true);
                    $("#form_add_prod, #div_btn_completar, #acciones_generales, #div_btn_add_prods").css("display", "none");
                    listarDetCompl($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                    sumaDetrac();
                    $("#A2").remove();

                    if (datos[0].MES_PERIODO != "") {
                        var oMes = Devuelve_Desc_MES(datos[0].MES_PERIODO);


                        $("#cbo_periodo").empty();
                        var option = "<option value=" + datos[0].MES_PERIODO + "-" + datos[0].ANIO_PERIODO + ">" + oMes + " - " + datos[0].ANIO_PERIODO + "</option>";
                        $("#cbo_periodo").append(option);
                        $("#cbo_periodo").select2("val", datos[0].ANIO_PERIODO + "-" + datos[0].MES_PERIODO)
                        $("#txt_fec_emision").datepicker('setDate', datos[0].EMISION);
                    }
                }
                else {
                    cargarProductos();
                    $('#cbo_und_medida').attr("disabled", false);
                    $("#cbo_periodo").select2('val', datos[0].CODIGO_PERIODO);
                    $("#hfvalor_periodo_carga").val(datos[0].CODIGO_PERIODO);
                    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                    sumaDetrac();
                }
                if ($("#txt_monto_detraccion").val() != 0) { //DPORTA
                    //$("#chk_detraccion").attr("checked", true).change();
                    $('#chk_detraccion').prop('checked', true).parent().addClass('checked');
                }
                //Llamada para asegurar la ejecución del cálculo con detracción
                if (datos[0].DETRACCION_IND === 'S') {
                    $("#chk_detraccion").click();
                    $("#chk_detraccion").attr("checked", true);
                    $('#uniform-chk_detraccion span').removeClass().addClass("checked");
                }


                // COMBO DIRECCION 
                $("#cbo_direccion").empty()
                $("#cbo_direccion").html("<option value='1'  latitud='" + datos[0].LATITUD + "' longitud='" + datos[0].LONGITUD + "'>" + datos[0].DIRECCION + "</option>")
                $("#cbo_direccion").select2('val', '1').change()
                $("#cbo_direccion").attr("disabled", true)

                
                $('#cbo_Empresa, #cbo_Sucursal, #cbo_doc_origen, #cbo_moneda').prop('disabled', true);
                verificaBalanceo();
                Desbloquear("ventana");
                console.log(datos[0].MODO_PAGO);
                $("#cbo_modo_pago").select2('val', datos[0].MODO_PAGO).change();
                

                if (datos[0].MODO_PAGO == '0002') {

                    let sCodCanje = fnGetCodCanjeXDocCompra(datos[0].CODIGO);

                    let aoCanje = fnGetCanje(sCodCanje);
                    if (aoCanje.length === 0) {
                        $('#A5').removeClass();
                        $('#A5').addClass("btn gray");
                    } else {
                        $("#A5").attr("disabled", false);
                        console.log('Poner boton aZUL');
                    }

                } else {
                    $("#A5").attr("disabled", true);
                }

                $("#txt_plazo_pago").val(datos[0].DIAS);
                $("#txt_fec_vencimiento").datepicker('setDate', datos[0].VENCIMIENTO);



                var sCodCompra = $("#txtNumDctoComp").val();
                sCodCompra = $.trim(sCodCompra);
                var oDocCompra = fnGetDocCompra(sCodCompra);

                //fnCargaTablaCuentasC(sCodCompra, oDocCompra, datos[0].MOVCONT_CODE);  
                fnCargaTablaCuentasC(sCodCompra, oDocCompra, sCodCompra);//CAMBIO AVENGER
     
            }).fail(function (msg) {
                alertCustom('Error al cargar datos.');
                Desbloquear("ventana");
            });
        } else {
            fnCargaTablaCuentasC();
        } 
    };

    var fnCargaTablaCuentasC = function (sCodCompra, oDocCompra, sCodAsiento) {

        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = sCodModulo;
                    vAsientoContable.sCodDoc = sCodCompra;
                    vAsientoContable.objDoc = oDocCompra;
                    vAsientoContable.init(sCodAsiento);
                });
        });

    }

    return {
        init: function () {

            var cod = ObtenerQueryString("codigo");
            cargarParametrosSistema();
            eventoControles();
            cargatablavacia();
            cargatablavacia2();
            cargatablavacia3();
            fillCboEmpresa();
            if (cod == undefined) {
                $('#cbo_Empresa').val($('#ctl00_hddctlg').val()).change();
            }
            fillcboRegistroEspecifico('NRMX');
            $('#cbo_doc_registro').val('0001').change();
            fillcboOrigenEspecifico();
            fillcboMoneda();
            if (cod == undefined) {
                $('#cbo_moneda').select2('val', '0002');
            }
            plugins();
            fillCboOperacion();
            fillimpuesto();
            fillCboModoPago();
            fillcboUniMedida();
            fillCboTipoBien();
            cargaInicial();
            $('#cbo_Sucursal').change();
 
        }
    };
}();

//DPORTA
function cargarParametrosSistema() {
    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                prmtACON = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro ACON!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro ACON!");
        }
    });

    //TOKEN PARA PODER HACER LAS CONSULTAS DE LOS N° DE DOCS. A SUNAT
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MIGO",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                token_migo = datos[0].DESCRIPCION_DETALLADA;
            } else {
                alertCustom("No se recuperó correctamente el parámetro MIGO!");
            }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro MIGO!");
        }
    });
}

var buscarDocumento = function (btnBuscar) {
    if (vErrors(['txt_proveedor', 'cbo_doc_origen'])) {
        $('#tblDocumentos').DataTable().destroy();
        var tbody = $('#tblDocumentos tbody');

        Bloquear("ventana");
        $.ajax({
            type: 'post',
            url: 'vistas/no/ajax/nomdocc.ashx?OPCION=LDOCS&TIPO_DCTO=' + $('#cbo_doc_origen').val() + '&CTLG_CODE=' + $('#cbo_Empresa').val() + '&PROV_PIDM=' + $('#hfPIDM').val() + '&SCSL_CODE=' + $('#cbo_Sucursal').val(),
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("ventana");
                tbody.html('');
                tbody.unbind('click');
                if (datos !== null) {
                    tabla = $('#tblDocumentos').DataTable({
                        info: false, responsive: true, order: [[0, 'desc']],
                        data: datos,
                        columns: [
                            {
                                data: 'CODIGO',
                                createdCell: function (cell, cellData, row, rowData, colIndex) {
                                    $(cell).css('text-align', 'center')
                                }
                            },
                            {
                                data: 'NRO_DOCUMENTO',
                                createdCell: function (cell, cellData, row, rowData, colIndex) {
                                    $(cell).css('text-align', 'center')
                                }
                            },
                            {
                                data: 'PROVEEDOR',
                                createdCell: function (cell, cellData, row, rowData, colIndex) {
                                    $(cell).css('text-align', 'center')
                                }
                            },
                            {
                                data: 'TOTAL',
                                createdCell: function (cell, cellData, row, rowData, colIndex) {
                                    $(cell).css('text-align', 'center')
                                    $(cell).text(parseFloat(cellData).toFixed(2))
                                }
                            },
                            {
                                data: 'TOTAL_ALTERNO',
                                createdCell: function (cell, cellData, row, rowData, colIndex) {
                                    $(cell).css('text-align', 'center')
                                    $(cell).text(parseFloat(cellData).toFixed(2))
                                }
                            },
                            {
                                data: 'DETRACCION',
                                visible: false
                            },
                            {
                                data: 'DETRACCION_ALTERNO',
                                visible: false
                            },
                            {
                                data: 'PERCEPCION',
                                visible: false
                            },
                            {
                                data: 'PERCEPCION_ALTERNO',
                                visible: false
                            },
                            {
                                data: 'RETENCION',
                                visible: false
                            },
                            {
                                data: 'RETENCION_ALTERNO',
                                visible: false
                            }
                        ]
                    });
                    $(tbody).css('cursor', 'pointer');
                    $('#tblDocumentos_wrapper').find(':last').remove();
                    $('#divBuscarDoc').modal('show');

                    if ($("#divBuscarDoc").hasClass('in') == true) {
                        $('#tblDocumentos_filter.dataTables_filter input[type=search]').focus();
                    }
                    $('#divBuscarDoc').on('shown.bs.modal', function () {
                        $('#tblDocumentos_filter.dataTables_filter input[type=search]').focus();
                    });

                    tbody.on('click', 'tr', function () {
                        $(this).addClass('selected');
                        var dcto = tabla.row(this).data();
                        var cod_doc = dcto.CODIGO;

                        if (!documentoSeleccionado(cod_doc)) {
                            var nro_doc = dcto.NRO_DOCUMENTO.split('-');
                            if (nro_doc.length > 2) {
                                var serie = nro_doc[0] + '-' + nro_doc[1];
                                var nro = nro_doc[2];
                            } else if (nro_doc.length > 1) {
                                var serie = nro_doc[0];
                                var nro = nro_doc[1];
                            } else {
                                serie = '';
                                nro = nro_doc[0];
                            }

                            var padre = $(btnBuscar).parent().parent().parent().parent();
                            $(padre).find('.txt_cod_doc_orig').val(cod_doc);
                            $(padre).find('.txt_num_ser_orig').val(serie);
                            $(padre).find('.txt_num_doc_orig').val(nro);
                            $(padre).find('.txt_total_origen').val(dcto.TOTAL);
                            $(padre).find('.txt_total_origen_alterno').val(dcto.TOTAL_ALTERNO);
                            $(padre).find('.txt_detraccion').val(dcto.DETRACCION);
                            $(padre).find('.txt_detraccion_alterno').val(dcto.DETRACCION_ALTERNO);
                            $(padre).find('.txt_percepcion').val(dcto.PERCEPCION);
                            $(padre).find('.txt_percepcion_alterno').val(dcto.PERCEPCION_ALTERNO);
                            $(padre).find('.txt_retencion').val(dcto.RETENCION);
                            $(padre).find('.txt_retencion_alterno').val(dcto.RETENCION_ALTERNO);

                            calcularTotalOrigen();
                            calcularDetraccionOrigen();
                            calcularPercepcionOrigen();
                            calcularRetencionOrigen();
                            Calcular();
                            $('#divBuscarDoc').modal('hide');
                        } else {
                            alertCustom('Documento ya seleccionado en la lista de Documentos de Origen.');
                            $(this).removeClass('selected');
                        }
                    });
                } else {
                    $('#tblDocumentos').DataTable({
                        info: false, responsive: true, order: [[0, 'desc']], data: []
                    });
                    infoCustom('No tiene Documentos de ese tipo para Origen');
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom('Error al listar documentos de origen.');
            }
        });
    }
};

var calcularTotalOrigen = function () {
    if ($('#cbo_moneda').val() === '0002') {
        var totales = $('.txt_total_origen');
    } else {
        totales = $('.txt_total_origen_alterno');
    }
    base_imponible_origen = 0;
    if ($('#cbo_doc_origen').val() !== '') {
        totales.each(function () {
            if (!isNaN(parseFloat($(this).val()))) {
                base_imponible_origen += parseFloat($(this).val());
            } else {
                base_imponible_origen += 0;
            }
        });
    }
    base_imponible = (base_imponible_origen === 0) ? '' : base_imponible_origen;
    $('#txt_base_imponible').val(base_imponible);
};

var calcularDetraccionOrigen = function () {
    if ($('#cbo_moneda').val() === '0002') {
        var totales = $('.txt_detraccion');
    } else {
        totales = $('.txt_detraccion_alterno');
    }
    detraccion_origen = 0;
    if ($('#cbo_doc_origen').val() !== '') {
        totales.each(function () {
            if (!isNaN(parseFloat($(this).val()))) {
                detraccion_origen += parseFloat($(this).val());
            } else {
                detraccion_origen += 0;
            }
        });
    }
    detraccion_origen = (detraccion_origen === 0) ? '' : detraccion_origen;
};

var calcularPercepcionOrigen = function () {
    if ($('#cbo_moneda').val() === '0002') {
        var totales = $('.txt_percepcion');
    } else {
        totales = $('.txt_percepcion_alterno');
    }
    percepcion_origen = 0;
    if ($('#cbo_doc_origen').val() !== '') {
        totales.each(function () {
            if (!isNaN(parseFloat($(this).val()))) {
                percepcion_origen += parseFloat($(this).val());
            } else {
                percepcion_origen += 0;
            }
        });
    }
    percepcion_origen = (percepcion_origen === 0) ? '' : percepcion_origen;
};

var calcularRetencionOrigen = function () {
    if ($('#cbo_moneda').val() === '0002') {
        var totales = $('.txt_retencion');
    } else {
        totales = $('.txt_retencion_alterno');
    }
    retencion_origen = 0;
    if ($('#cbo_doc_origen').val() !== '') {
        totales.each(function () {
            if (!isNaN(parseFloat($(this).val()))) {
                retencion_origen += parseFloat($(this).val());
            } else {
                retencion_origen += 0;
            }
        });
    }
    retencion_origen = (retencion_origen === 0) ? '' : retencion_origen;
};

var documentoSeleccionado = function (strdoc) {
    var inputs = $('.txt_cod_doc_orig');
    var docsseleccionados = "";
    for (var c = 0; c < inputs.length; c++) {
        var input = inputs[c];
        docsseleccionados += $(input).val() + ',';
    }
    return docsseleccionados.indexOf(strdoc) > -1;
};

var cargarCorrelativo = function () {
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=CORR&CTLG_CODE=" + $('#cbo_Empresa').val() + "&SCSL_CODE=" + $('#cbo_Sucursal').val() + "&TIP_DCTO=" + $('#cbo_doc_registro').val(),
        contenttype: "application/json;",
        async: false,
        datatype: "json",
        success: function (datos) {
            correlativo = datos;
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

var establecerCorrelativo = function (formato) {
    if (correlativo != null) {
        for (var i = 0; i < correlativo.length; i++) {
            if (correlativo[i].FORMATO == formato) {
                $('#hfCOD_AUT').val(correlativo[i].CODIGO);
                $('#txt_num_ser_reg').val(correlativo[i].SERIE);
                $('#txt_num_doc_reg').val(correlativo[i].VALOR_ACTUAL);
                return;
            }
        }
    } else {
        $('#txt_num_ser_reg', '#txt_num_doc_reg').val('');
    }
};

var cargarLetras = function () {
    var doc = $('#txt_num_ser_reg').val() + '-' + $('#txt_num_doc_reg').val();

    $.ajax({
        type: "post",
        url: 'vistas/no/ajax/nomdocc.ashx?OPCION=LASOC&p_CODE=' + $("#txtNumDctoComp").val() + '&CTLG_CODE=' + $("#cbo_Empresa").val() + '&p_DOCUMENTO=' + doc,
        //url: "vistas/gl/ajax/GLMRENO.ashx?flag=6",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            oTable_detalle_2.fnClearTable();
            if (datos != null) {
                $('#divLetras').modal('show');
                setTimeout(function () {
                    oTable_detalle_2.fnAddData(datos);
                }, 200);
            } else {
                let monto = $('#txt_monto_total').val();
                $('#montoLetra').html('S/. ' + monto);
                $('#divLetraVin').modal('show');
                $('#txtPeriodoLetra').attr('disabled', true);
                setTimeout(function () {
                    oTable_detalle_3.fnAdjustColumnSizing();
                }, 200);
            }

        },
        complete: function () {

        },
        error: function (msg) {
            alert(msg);
        }
    });




    //$('#tblLetras').DataTable().destroy();
    //var tbody = $('#tblLetras tbody');
    //$.post('vistas/no/ajax/nomdocc.ashx?OPCION=LASOC&NUM_DCTO=' + doc + '&TIPO_DCTO=' + $('#cbo_doc_registro :selected').text(),
    //    function (data) {
    //        tbody.html('');
    //        if (data != null) {
    //            for (var i = 0; i < data.length; i++) {
    //                tbody.append('<tr>\
    //                <td style="text-align: center">' + data[i].CODIGO_DOCUMENTO + '</td>\
    //                <td style="text-align: center">' + data[i].NUMERO_DOCUMENTO + '</td>\
    //                <td style="text-align: center">' + data[i].NRO_DOC_DETALLE + '</td>\
    //                <td style="text-align: center">' + data[i].MONTO + '</td>\
    //                <td style="text-align: center">' + data[i].FECHA_EMISION + '</td>\
    //                </tr>');
    //            }
    //        }
    //        $('#tblLetras').DataTable({ paging: false, responsive: true, order: [[0, 'desc']], ordering: false });
    //        $('#tblLetras').DataTable().draw();
    //        $('#tblLetras_wrapper').children(':last').remove();
    //        $('#divLetras').modal('show');
    //    });
};

var cargarCuentaDetraccion = function () {
    if (vErrors(['txt_proveedor'])) {
        $.post('vistas/no/ajax/nomdocc.ashx?OPCION=DETRAC&PROV_PIDM=' + $('#hfPIDM').val() + "&MONEDA_CODE=" + $('#cbo_moneda').val(),
            function (data) {
                if (data !== null && data !== '') {
                    $('#txt_cta_detrac').val(data[0].NRO_CUENTA);
                } else {
                    $('#txt_cta_detrac').val('');
                }
            });
    }
};

//AUTOCOMPLETAR PROVEEDORES
var autocompletarProveedor = function (v_ID, v_value) {

    $("#divTxtProveedor").html('<input id="txt_proveedor" class="span12" type="text" placeholder="Proveedor" style="text-transform: uppercase" />');
    var selectRazonSocial = $(v_ID);
    //Bloquear("divTxtProveedor");    
    
    $.ajax({
        type: 'post',
        url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=LISTAR_PROVEEDORES",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        data: { CTLG_CODE: $('#cbo_Empresa').val() },
        success: function (datos) {
            //Desbloquear("divTxtProveedor");
            if (datos != null) {               
                textproveedores = selectRazonSocial.typeahead({
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        let oObjet = new Array();
                        for (var i = 0; i < datos.length; i++) {
                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            var obj = {};
                            obj.DNI = datos[i].DNI;
                            obj.RUC = datos[i].RUC;
                            obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                            obj.DIRECCION = datos[i].DIRECCION;
                            obj.PIDM = datos[i].PIDM;
                            obj.DIAS = datos[i].DIAS;
                            obj.ID = datos[i].ID;
                            obj.AGENTE_RETEN_IND = datos[i].AGENTE_RETEN_IND;
                            obj.PPBIDEN_CONDICION_SUNAT = datos[i].PPBIDEN_CONDICION_SUNAT;
                            obj.PPBIDEN_ESTADO_SUNAT = datos[i].PPBIDEN_ESTADO_SUNAT;                           
                            oObjet.push(obj);
                        }
                        jsonProveedores = oObjet;
                        $.each(oObjet, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });
                        process(arrayRazonSocial);
                        console.log(arrayRazonSocial);
                    },
                    updater: function (item) {
                        $("#lblHabido").html("");
                        $("#spanVerificando").html("Verificando...");
                        HABIDO_IND = "1";
                        $("#hfPIDM").val(map[item].PIDM);

                        if (!carga_ini_ind) {
                            fillCboDirecciones(map[item].PIDM);
                        }

                        $("#hfDIR").val(map[item].DIRECCION);
                        $("#hfDNI").val(map[item].DNI);
                        $("#hfRUC").val(map[item].RUC);
                        $("#txt_plazo_credito").val(map[item].DIAS);
                        $("#cbo_modo_pago").select2('val', '0001').change();
                        $('#chk_retencion').prop('disabled', true);
                        $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                        $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                        $("#txt_ruc_proveedor").val(map[item].RUC);
                        $('#cboTipoDoc').select2('val', '6').change();
                        $("#cboTipoDoc").prop('disabled', true);

                        if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig").val()) {//DPORTA
                            InsertarValorCambioOficial($('#cbo_moneda').val());
                        }

                        if (map[item].PPBIDEN_CONDICION_SUNAT != "") {
                            $("#lblHabido").html("CONDICIÓN: " + "<b>" + map[item].PPBIDEN_CONDICION_SUNAT + "</b>");
                        }
                        if (map[item].PPBIDEN_ESTADO_SUNAT != "") {
                            $("#lblEstado").html("ESTADO: " + "<b>" + map[item].PPBIDEN_ESTADO_SUNAT + "</b>");
                        }

                        if (map[item].RUC !== '' && map[item].DNI !== '') {
                            $('#cboTipoDoc').prop('disabled', false);
                        }

                        if (map[item].AGENTE_RETEN_IND === 'S' && $('#cboEmpresa :selected').attr('agente-reten-ind') === 'N') {
                            $('#chk_retencion').prop('disabled', false);
                        }
                        if ($("#txt_plazo_credito").val() > 0) {
                            $("#cbo_modo_pago").prop("disabled", false);
                            $('#txt_plazo_pago').keyup();
                            //$.ajax({
                            //    type: "post",
                            //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=FECHAX&ISC=" + $("#txt_plazo_pago").val(),
                            //    contenttype: "application/json",
                            //    datatype: "json",
                            //    async: false,
                            //    success: function (data) {
                            //        if (data !== null) {
                            //            $("#txt_fec_vencimiento").datepicker('setDate', data[0].FECHANUEVA);
                            //        }
                            //    },
                            //    error: function (msg) {
                            //        alertCustom('Error al calcular fecha.');
                            //    }
                            //});
                        }
                        else {
                            $("#cbo_modo_pago").prop("disabled", true);
                        }
                        if ($('#txt_base_imponible').val() !== '') {
                            Calcular();
                        }
                        if ($('#chk_detraccion').is(':checked')) {
                            cargarCuentaDetraccion();
                        }
                        return item;
                    },
                });   

                selectRazonSocial.keyup(function () {
                    $(this).siblings('ul').css('width', $(this).css('width'));
                    if ($("#txt_proveedor").val().length <= 0) {
                        $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
                        $('#chk_retencion').parent().removeClass('checked');
                        $('#cbo_modo_pago option:first-child').prop('selected', true);
                        $('#cbo_modo_pago').change();
                        $('#txt_plazo_pago').val('0');
                        $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                        $('#cboTipoDoc').select2('val', '6').change();
                        $('#cboTipoDoc').prop('disabled', true);
                        $("#hfPIDM, #txt_ruc_proveedor, #txt_id_proveedor, #txt_Retencion").val("");
                        if ($('#txt_base_imponible').val() !== '') {
                            Calcular();
                        }
                        $("#lblHabido").html("");
                        $("#lblEstado").html("");

                        $("#cbo_direccion").empty().html("<option></option>")
                        $("#cbo_direccion").select2("val", "")
                        $("#cbo_direccion").attr("disabled", false);

                        carga_ini_ind = false;

                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alertCustom("Proveedores no se listaron correctamente");
            //Desbloquear("divTxtProveedor");
        }
    });
};

var autocompletarProveedorPersonaNatural = function (v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: 'post',
        url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=LISTAR_PROVEEDORES_PER_NAT",
        cache: false,
        async: false,
        dataType: 'json',
        data: { CTLG_CODE: $('#cbo_Empresa').val() }
    }).done(function (data) {
        if (data !== null) {
            selectRazonSocial.typeahead({
                source: function (query, process) {
                    arrayRazonSocial = [];
                    map = {};
                    var obj = "[";
                    for (var i = 0; i < data.length; i++) {
                        arrayRazonSocial.push(data[i].RAZON_SOCIAL);
                        obj += '{';
                        obj += '"DNI":"' + data[i].DNI + '","RUC":"' + data[i].RUC + '","RAZON_SOCIAL":"' + data[i].RAZON_SOCIAL + '","DIRECCION":"' + data[i].DIRECCION + '","PIDM":"' + data[i].PIDM + '","DIAS":"' + data[i].DIAS + '","ID":"' + data[i].ID + '","ID":"' + data[i].ID + '", "AGENTE_RETEN_IND": "' + data[i].AGENTE_RETEN_IND + '"';
                        obj += '},';
                    }
                    obj += "{}";
                    obj = obj.replace(",{}", "");
                    obj += "]";
                    var json = $.parseJSON(obj);

                    $.each(json, function (i, objeto) {
                        map[objeto.RAZON_SOCIAL] = objeto;
                    });
                    process(arrayRazonSocial);
                },
                updater: function (item) {
                    $("#hfPIDM").val(map[item].PIDM);
                    $("#hfDIR").val(map[item].DIRECCION);
                    $("#hfDNI").val(map[item].DNI);
                    $("#hfRUC").val(map[item].RUC);
                    $("#txt_plazo_credito").val(map[item].DIAS);
                    $("#cbo_modo_pago").select2('val', '0001').change();
                    $('#chk_retencion').prop('disabled', true);
                    $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                    $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                    $("#txt_ruc_proveedor").val(map[item].RUC);
                    $('#cboTipoDoc').select2('val', '1').change();
                    $("#cboTipoDoc").prop('disabled', true);

                    if ($("#txt_fec_transaccion").val() != $("#txt_fec_vig").val()) {//DPORTA
                        InsertarValorCambioOficial($('#cbo_moneda').val());
                    }

                    if (map[item].RUC !== '' && map[item].DNI !== '') {
                        $('#cboTipoDoc').prop('disabled', false);
                    }

                    if (map[item].AGENTE_RETEN_IND === 'S' && $('#cboEmpresa :selected').attr('agente-reten-ind') === 'N') {
                        $('#chk_retencion').prop('disabled', false);
                    }
                    if ($("#txt_plazo_credito").val() > 0) {
                        $("#cbo_modo_pago").prop("disabled", false);
                        $.ajax({
                            type: "post",
                            url: "vistas/no/ajax/nomdocc.ashx?OPCION=FECHAX&ISC=" + $("#txt_plazo_pago").val() + "&FECHA_EMISION=" + $('#txt_fec_emision').val(),
                            contenttype: "application/json",
                            datatype: "json",
                            async: false,
                            success: function (data) {
                                if (data !== null) {
                                    $("#txt_fec_vencimiento").datepicker('setDate', data[0].FECHANUEVA);
                                }
                            },
                            error: function (msg) {
                                alertCustom('Error al calcular fecha.');
                            }
                        });
                    }
                    else {
                        $("#cbo_modo_pago").prop("disabled", true);
                    }
                    if ($('#txt_base_imponible').val() !== '') {
                        Calcular();
                    }
                    if ($('#chk_detraccion').is(':checked')) {
                        cargarCuentaDetraccion();
                    }
                    return item;
                },
            });
        }
    });
    selectRazonSocial.keyup(function () {
        $(this).siblings('ul').css('width', $(this).css('width')).css('overflow-x', 'hidden');
        if ($("#txt_proveedor").val().length <= 0) {
            $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
            $('#chk_retencion').parent().removeClass('checked');
            $('#cbo_modo_pago option:first-child').prop('selected', true);
            $('#cbo_modo_pago').change();
            $('#txt_plazo_pago').val('0');
            $('#txt_fec_vencimiento').datepicker('setDate', 'now');
            $('#cboTipoDoc').select2('val', '1').change();
            $('#cboTipoDoc').prop('disabled', true);
            $("#hfPIDM, #txt_ruc_proveedor, #txt_id_proveedor, #txt_Retencion").val("");
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
        }
    });
};

var autocompletarLocadores = function (v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: 'post',
        url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=LISTAR_LOCADORES",
        data: { CTLG_CODE: $('#cbo_Empresa').val() },
        cache: false,
        async: false,
        dataType: 'json'
    }).done(function (data) {
        if (data !== null) {
            selectRazonSocial.typeahead({
                source: function (query, process) {
                    arrayRazonSocial = [];
                    map = {};
                    var obj = "[";
                    for (var i = 0; i < data.length; i++) {
                        arrayRazonSocial.push(data[i].RAZON_SOCIAL);
                        obj += '{';
                        obj += '"DNI":"' + data[i].DNI + '","RUC":"' + data[i].RUC + '","RAZON_SOCIAL":"' + data[i].RAZON_SOCIAL + '","DIRECCION":"' + data[i].DIRECCION + '","PIDM":"' + data[i].PIDM + '","DIAS":"' + data[i].DIAS + '","ID":"' + data[i].ID + '","ID":"' + data[i].ID + '", "AGENTE_RETEN_IND": "' + data[i].AGENTE_RETEN_IND + '"';
                        obj += '},';
                    }
                    obj += "{}";
                    obj = obj.replace(",{}", "");
                    obj += "]";
                    var json = $.parseJSON(obj);

                    $.each(json, function (i, objeto) {
                        map[objeto.RAZON_SOCIAL] = objeto;
                    });
                    process(arrayRazonSocial);
                },
                updater: function (item) {
                    $("#hfPIDM").val(map[item].PIDM);
                    $("#hfDIR").val(map[item].DIRECCION);
                    $("#hfDNI").val(map[item].DNI);
                    $("#hfRUC").val(map[item].RUC);
                    $("#txt_plazo_credito").val(map[item].DIAS);
                    $("#cbo_modo_pago").select2('val', '0001').change();
                    $('#chk_retencion').prop('disabled', true);
                    $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                    $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                    $("#txt_ruc_proveedor").val(map[item].RUC);
                    $('#cboTipoDoc').select2('val', '1').change();
                    $("#cboTipoDoc").prop('disabled', true);

                    if (map[item].RUC !== '' && map[item].DNI !== '') {
                        $('#cboTipoDoc').prop('disabled', false);
                    }

                    if (map[item].AGENTE_RETEN_IND === 'S' && $('#cboEmpresa :selected').attr('agente-reten-ind') === 'N') {
                        $('#chk_retencion').prop('disabled', false);
                    }
                    if ($("#txt_plazo_credito").val() > 0) {
                        $("#cbo_modo_pago").prop("disabled", false);
                        $.ajax({
                            type: "post",
                            url: "vistas/no/ajax/nomdocc.ashx?OPCION=FECHAX&ISC=" + $("#txt_plazo_pago").val(),
                            contenttype: "application/json;",
                            datatype: "json",
                            async: false,
                            success: function (data) {
                                if (data !== null) {
                                    $("#txt_fec_vencimiento").datepicker('setDate', data[0].FECHANUEVA);
                                }
                            },
                            error: function (msg) {
                                alert(msg);
                            }
                        });
                    }
                    else {
                        $("#cbo_modo_pago").prop("disabled", true);
                    }
                    if ($('#txt_base_imponible').val() !== '') {
                        Calcular();
                    }
                    if ($('#chk_detraccion').is(':checked')) {
                        cargarCuentaDetraccion();
                    }
                    return item;
                },
            });
            selectRazonSocial.keyup(function () {
                $(this).siblings('ul').css('width', $(this).css('width')).css('overflow-x', 'hidden');
                if ($("#txt_proveedor").val().length <= 0) {
                    $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
                    $('#chk_retencion').parent().removeClass('checked');
                    $('#cbo_modo_pago option:first-child').prop('selected', true);
                    $('#cbo_modo_pago').change();
                    $('#txt_plazo_pago').val('0');
                    $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                    $('#cboTipoDoc').select2('val', '6').change();
                    $('#cboTipoDoc').prop('disabled', true);
                    $("#hfPIDM, #txt_ruc_proveedor, #txt_id_proveedor, #txt_Retencion").val("");
                    if ($('#txt_base_imponible').val() !== '') {
                        Calcular();
                    }
                }
            });
        }
    });
};

var autocompletarProveedorPersona = function (v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: 'post',
        url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=LISTAR_PROVEEDORES_PER",
        cache: false,
        async: false,
        data: { CTLG_CODE: $('#cbo_Empresa').val() },
        dataType: 'json'
    }).done(function (data) {
        if (data !== null) {
            selectRazonSocial.typeahead({
                source: function (query, process) {
                    arrayRazonSocial = [];
                    map = {};
                    var obj = "[";
                    for (var i = 0; i < data.length; i++) {
                        arrayRazonSocial.push(data[i].RAZON_SOCIAL);
                        obj += '{';
                        obj += '"DNI":"' + data[i].DNI + '","RUC":"' + data[i].RUC + '","RAZON_SOCIAL":"' + data[i].RAZON_SOCIAL + '","DIRECCION":"' + data[i].DIRECCION + '","PIDM":"' + data[i].PIDM + '","DIAS":"' + data[i].DIAS + '","ID":"' + data[i].ID + '","ID":"' + data[i].ID + '", "AGENTE_RETEN_IND": "' + data[i].AGENTE_RETEN_IND + '"';
                        obj += '},';
                    }
                    obj += "{}";
                    obj = obj.replace(",{}", "");
                    obj += "]";
                    var json = $.parseJSON(obj);

                    $.each(json, function (i, objeto) {
                        map[objeto.RAZON_SOCIAL] = objeto;
                    });
                    process(arrayRazonSocial);
                },
                updater: function (item) {
                    $("#hfPIDM").val(map[item].PIDM);
                    $("#hfDIR").val(map[item].DIRECCION);
                    $("#hfDNI").val(map[item].DNI);
                    $("#hfRUC").val(map[item].RUC);
                    $("#txt_plazo_credito").val(map[item].DIAS);
                    $("#cbo_modo_pago").select2('val', '0001').change();
                    $('#chk_retencion').prop('disabled', true);
                    $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                    $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                    $("#txt_ruc_proveedor").val(map[item].RUC);
                    if (map[item].DNI === '') {
                        $('#cboTipoDoc').select2('val', '6').change();
                        $("#cboTipoDoc").prop('disabled', true);
                    }

                    if (map[item].RUC === '') {
                        $('#cboTipoDoc').select2('val', '1').change();
                        $("#cboTipoDoc").prop('disabled', true);
                    }

                    if (map[item].RUC !== '' && map[item].DNI !== '') {
                        $('#cboTipoDoc').prop('disabled', false);
                    }

                    if (map[item].AGENTE_RETEN_IND === 'S' && $('#cboEmpresa :selected').attr('agente-reten-ind') === 'N') {
                        $('#chk_retencion').prop('disabled', false);
                    }
                    if ($("#txt_plazo_credito").val() > 0) {
                        $("#cbo_modo_pago").prop("disabled", false);
                        $.ajax({
                            type: "post",
                            url: "vistas/no/ajax/nomdocc.ashx?OPCION=FECHAX&ISC=" + $("#txt_plazo_pago").val() + "&FECHA_EMISION=" + $('#txt_fec_emision').val(),
                            contenttype: "application/json",
                            datatype: "json",
                            async: false,
                            success: function (data) {
                                if (data !== null) {
                                    $("#txt_fec_vencimiento").datepicker('setDate', data[0].FECHANUEVA);
                                }
                            },
                            error: function (msg) {
                                alertCustom('Error al calcular fecha.');
                            }
                        });
                    }
                    else {
                        $("#cbo_modo_pago").prop("disabled", true);
                    }
                    if ($('#txt_base_imponible').val() !== '') {
                        Calcular();
                    }
                    if ($('#chk_detraccion').is(':checked')) {
                        cargarCuentaDetraccion();
                    }
                    return item;
                },
            });
        }
    });
    selectRazonSocial.keyup(function () {
        $(this).siblings('ul').css('width', $(this).css('width')).css('overflow-x', 'hidden');
        if ($("#txt_proveedor").val().length <= 0) {
            $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
            $('#chk_retencion').parent().removeClass('checked');
            $('#cbo_modo_pago option:first-child').prop('selected', true);
            $('#cbo_modo_pago').change();
            $('#txt_plazo_pago').val('0');
            $('#txt_fec_vencimiento').datepicker('setDate', 'now');
            $('#cboTipoDoc').select2('val', '6').change();
            $('#cboTipoDoc').prop('disabled', true);
            $("#hfPIDM, #txt_ruc_proveedor, #txt_id_proveedor, #txt_Retencion").val("");
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
        }
    });
};
//========================

//AUTOCOMPLETAR PRODUCTOS
var productos = [];
var cargarProductos = function () {

    //Bloquear("input_cod_prod");
    //Bloquear("input_desc_prod");
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTOS&CTLG_CODE=" + $('#cbo_Empresa').val(),
        datatype: "json",
        async: true
    }).done(function (data) {
        productos = data;
        //Desbloquear("input_cod_prod");
        //Desbloquear("input_desc_prod");

        $('#txt_cod_a_producto').parent().html('<input id="txt_cod_producto" type="hidden" /><input id="txt_cod_a_producto" class="span12" type="text" />');
        autocompletarCodigoProducto();
        $('#txt_desc_producto').parent().html('<input id="txt_desc_producto" class="span12" type="text"/>');
        autocompletarProducto();
        Desbloquear('divBotonesProd');

    }).fail(function () {
        alertCustom('Error al listar Productos.');
        //Desbloquear("input_cod_prod");
        //Desbloquear("input_desc_prod");
        Desbloquear('divBotonesProd');
    });
};

var autocompletarCodigoProducto = function () {
    var input = $('#txt_cod_a_producto');
    input.typeahead({
        items: 50,
        source: function (query, process) {
            array = [];
            map = {};

            var obj = "[";
            for (var i = 0; i < productos.length; i++) {
                array.push(productos[i].CODIGO_ANTIGUO);
                obj += '{';
                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '", "CODIGO_ANTIGUO": "' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","ALMACENABLE_IND":"' + productos[i].ALMACENABLE_IND + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '","DETRACCION":"' + productos[i].DETRACCION + '"';
                obj += '},';
            }
            obj += "{}";
            obj = obj.replace(",{}", "");
            obj += "]";
            var json = $.parseJSON(obj);

            $.each(json, function (i, objeto) {
                map[objeto.CODIGO_ANTIGUO] = objeto;
            });
            process(array);
        },
        updater: function (item) {
            $("#hfCOD_PROD").val(map[item].CODIGO);
            $("#txt_cod_producto").val($("#hfCOD_PROD").val());
            $("#txt_desc_producto").val(map[item].DESC_ADM);
            $("#cbo_und_medida").select2('val', map[item].UNIDAD).change();
            $("#hfporcentaje_detraccion").val(map[item].DETRACCION)
            $('#txt_cantidad').focus();
            $('#hfPROD_ALMACENABLE').val(map[item].ALMACENABLE_IND);
            return item;
        },
    });
    input.keyup(function (e) {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"))
        if ($(this).val().length <= 0) {
            $('#txt_desc_producto, #txt_cod_producto').val('');
            $("#cbo_und_medida").select2('val', '').change();
        }

        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 13) {
            $('#txt_desc_producto').focus();
        }
    });

};

var autocompletarProducto = function () {
    var input = $('#txt_desc_producto');
    input.typeahead({
        items: 50,
        source: function (query, process) {
            array = [];
            map = {};
            let aoObj = new Array();
            for (var i = 0; i < productos.length; i++) {
                array.push(productos[i].DESC_ADM);
                var obj = {};
                obj.DESC_ADM = productos[i].DESC_ADM;
                obj.CODIGO = productos[i].CODIGO;
                obj.CODIGO_ANTIGUO = productos[i].CODIGO_ANTIGUO;
                obj.UNIDAD = productos[i].UNIDAD;
                obj.ALMACENABLE_IND = productos[i].ALMACENABLE_IND;
                obj.NO_SERIADA = productos[i].NO_SERIADA;
                obj.DETRACCION = productos[i].DETRACCION;
                aoObj.push(obj);
            }

            $.each(aoObj, function (i, objeto) {
                map[objeto.DESC_ADM] = objeto;
            });
            process(array);
        },
        //            var obj = "[";
        //    for (var i = 0; i < productos.length; i++) {
        //        array.push(productos[i].DESC_ADM);
        //        //obj += '{';
        //        //obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '", "CODIGO_ANTIGUO": "' + productos[i].CODIGO_ANTIGUO + '", "UNIDAD":"' + productos[i].UNIDAD + '","ALMACENABLE_IND":"' + productos[i].ALMACENABLE_IND + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '","DETRACCION":"' + productos[i].DETRACCION + '"';
        //        //obj += '},';
        //    }
        //    obj += "{}";
        //    obj = obj.replace(",{}", "");
        //    obj += "]";
        //    var json = $.parseJSON(obj);

        //    $.each(json, function (i, objeto) {
        //        map[objeto.DESC_ADM] = objeto;
        //    });
        //    process(array);
        //},
        updater: function (item) {
            $("#hfCOD_PROD").val(map[item].CODIGO);
            $("#txt_cod_producto").val($("#hfCOD_PROD").val());
            $('#txt_cod_a_producto').val(map[item].CODIGO_ANTIGUO);
            $("#cbo_und_medida").select2('val', map[item].UNIDAD).change();
            $("#hfporcentaje_detraccion").val(map[item].DETRACCION);
            $('#txt_cantidad').focus();
            $('#hfPROD_ALMACENABLE').val(map[item].ALMACENABLE_IND);
            return item;
        },
    });
    input.keyup(function (e) {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"));
        if ($(this).val().length <= 0) {
            $('#txt_cod_a_producto, #txt_cod_producto').val('');
            $("#cbo_und_medida").select2('val', '').change();
        }
    });
};
//=======================

//insertar TC - DPORTA
var InsertarValorCambioOficial = function (monecode) {
    if (typeof $("#cbo_moneda [tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [tipo='MOAL']").val() != "") {
        monecode = $("#cbo_moneda [tipo='MOAL']").val();

        var formData = new FormData();
        formData.append("token", token_migo);

        var request = new XMLHttpRequest();

        request.open("POST", "https://api.migo.pe/api/v1/exchange/latest");
        request.setRequestHeader("Accept", "application/json");

        request.send(formData);
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (data.success == true) {
                let fecha = $("#txt_fec_transaccion").val();
                let valorcomprabase = data.precio_compra;
                let valorventabase = data.precio_venta;
                let valorcompralt = data.precio_compra;
                let valorventalt = data.precio_venta;

                $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=3.5&valorcomprabase=" + valorcomprabase + "&valorventabase=" + valorventabase +
                        "&valorcompralt=" + valorcompralt + "&valorventalt=" + valorventalt + "&fecha=" + fecha + "&usuario=" + "SIST" +
                        "&codbase=" + "0002" + "&codalt=" + monecode,
                    //contentType: "application/json;",
                    //dataType: "json",
                    //async: true,
                    success: function (datos) {
                        if (datos == "OK") {
                            listarValorCambio();
                        } else {
                            noexito();
                        }
                    },
                    error: function (msg) {
                        $("#msgSunat").html("Ocurrió un error al obtener tipo de Cambio.");
                        console.log("Error al obtener datos de SUNAT.");
                    }
                });
            }
        };
    }
}

var listarValorCambio = function () {
    
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=1",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        data: { MONEDA_CODE: $('#cbo_moneda').val(), FECHA_EMISION: $('#txt_fec_emision').val() }
    }).done(function (datos) {
        if (datos !== null) {
            if (datos[0].VALOR_CAMBIO_VENTA !== "" && datos[0].FECHA_VIGENTE !== "") {
                $('#lbl_TC, #input_valor_cambio, #lbl_fec_vig, #input_fec_vig').css("display", "block");
                $('#txt_valor_cambio').val(datos[0].VALOR_CAMBIO_VENTA);
                $('#txt_fec_vig').val(datos[0].FECHA_VIGENTE);
            } else {
                $('#lbl_TC, #input_valor_cambio, #lbl_fec_vig, #input_fec_vig').css("display", "none");
                $('#txt_valor_cambio').val("");
                $('#txt_fec_vig').val("");
            }
        }
    }).fail(function (msg) {
        alertCustom('Error al intentar cargar valor de cambio.');
    });
}

var Calcular = function () {
    if (vErrors(["txt_base_imponible"])) {
        var descuento = $("#txt_descuento").val() === '' ? 0 : parseFloat($("#txt_descuento").val());
        if (descuento <= base_imponible) {
            var inafecto = $("#txt_isc").val() === '' ? 0 : parseFloat($("#txt_isc").val());

            var tasa_impuest = ($('#cbx_destino').val() === 'ORGNGR') ? 0 : parseFloat($('#hfIMPUESTO').val());
            var ajuste = $("#txt_ajuste").val() === '' ? 0 : parseFloat($("#txt_ajuste").val());

            let tipoDocCode = $("#cbo_doc_registro").val();//DPORTA SIN-IMPUESTOS
            if (tipoDocCode == "0001") {
                var detraccion = $("#txt_detraccion").val() === '' ? 0 : parseFloat($("#txt_detraccion").val());
                var percepcion = $("#txt_Percepcion").val() === '' ? 0 : parseFloat($("#txt_Percepcion").val());
                var retencion = $("#txt_Retencion").val() === '' ? 0 : parseFloat($("#txt_Retencion").val());
            } else {
                var detraccion = 0;
                var percepcion = 0;
                var retencion = 0;
            }
            
            var subtotal = base_imponible - descuento + inafecto;

            if (tipoDocCode == "0001") {
                var impuesto = subtotal * (tasa_impuest / 100);
            } else {
                var impuesto = 0;
            }
            
            if (ajuste > 0.05 || ajuste < -0.05 || isNaN(ajuste)) {
                ajuste = 0;
                alertCustom('Sólo se pueden realizar ajustes de un máximo de 5 céntimos.');
            }

            impuesto = impuesto + ajuste;
            var total_pagar = subtotal + impuesto;
            var neto_pagar = total_pagar + percepcion - detraccion - retencion;

            $('#txt_base_imponible').val(base_imponible);
            $('#txt_descuento').val(descuento.toFixed(2));
            $('#txt_ajuste').val(ajuste.toFixed(2));
            $("#txt_isc").val(inafecto.toFixed(2));
            $('#txt_impuesto').val(tasa_impuest.toFixed(2));
            $("#txt_subtotal").val(subtotal.toFixed(2));
            $("#txt_impuesto_calc").val(impuesto.toFixed(2));
            $("#txt_prec_total").val(total_pagar.toFixed(2));
            $("#txt_monto_total").val(neto_pagar.toFixed(2));
        }
    }
}

var validarDctoCompra = function (serie, numdcto, pidm, tipodcto) {
    var resp = false;
    if (vErrors(['cbo_doc_registro', "txt_proveedor", "txt_ruc_proveedor", "cbo_Empresa", "cbo_Sucursal", "txt_num_ser_reg", "txt_num_doc_reg", "txt_fec_emision", "txt_fec_transaccion", "txt_fec_vencimiento", "txt_base_imponible", "txt_descuento", "txt_isc", "txt_ajuste", "cbo_periodo", "cbo_direccion"])) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=V&NUM_SERIE=" + serie + "&NUM_DCTO=" + numdcto + "&PROV_PIDM=" + pidm + "&TIPO_DCTO=" + tipodcto,
            async: false,
            success: function (datos) {
                if (datos != null) {
                    if (datos != "N") { infoCustom("N° Dcto de registro ya  Existe!"); }
                    else { resp = true; }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    return resp;
};

var origenesValidos = function () {
    var inputs = $('.txt_cod_doc_orig');
    if ($('#cbo_doc_origen').val() === "") {
        return true;
    } else {
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if ($(input).val() === '') {
                return false;
            }
        }
        return true;
    }
}

var glosario_correcto = function () {
    var inputs = $('.txt_comentario');
    if (inputs.length > 100) {
        return false
    } else {
        return true;
    }
}

var AddProdDet = function () {
    var data = new FormData();
    var existe = false;
    let tipoDocCode = $("#cbo_doc_registro").val();//DPORTA SIN-IMPUESTOS

    var PRECIO = parseFloat(parseFloat($("#txt_importe").val()) / parseFloat($("#txt_cantidad").val()));
    data.append('FACC_CODE', $("#txtNumDctoComp_Det").val());
    data.append('FACC_SEQ_DOC', $("#txtNumSec").val());
    data.append('PROD_CODE', $("#txt_cod_producto").val());
    data.append('PROD_ALMACENABLE', $('#hfPROD_ALMACENABLE').val())
    data.append('PROD_CMNT', $("#txt_desc_producto").val());
    data.append('UMME_CODE', $("#cbo_und_medida").val());
    data.append('CANTIDAD', $("#txt_cantidad").val());
    data.append('PREC_UNI', PRECIO);
    data.append('DESCUENTO', $("#txt_descuento_det").val());
    data.append('TOTAL', $("#txt_importe").val());
    data.append('CTLG_CODE', $("#cbo_Empresa").val());
    data.append('USUARIO', $('#ctl00_txtus').val());
    data.append('PAGO_FINAL_IND', $("#chk_pag_final").is(":checked") ? "S" : "N");
    data.append('IMPUESTO_IND', $("#chk_inc_igv").is(":checked") ? "S" : "N");
    if (tipoDocCode == '0001') {
        data.append('DETALLE_DETRACCION', Math.round(parseFloat($("#hfporcentaje_detraccion").val()) * parseFloat($("#txt_importe").val()) / 100));
    } else {
        data.append('DETALLE_DETRACCION', 0);
    }
    
    if ($("#txt_monto_detraccion").val() == "") {
        $("#txt_monto_detraccion").val("0");
    }

    if (tipoDocCode == '0001') {
        var monto_dtrac = Math.round(parseFloat($("#txt_monto_detraccion").val()) + (parseFloat($("#hfporcentaje_detraccion").val()) * parseFloat($("#txt_importe").val()) / 100));
    } else {
        var monto_dtrac = 0;
    }
    
    $("#txt_monto_detraccion").val(monto_dtrac.toString());

    if ($("#txt_monto_detraccion").val() != 0) { //DPORTA
        //$("#chk_detraccion").attr("checked", true).change();
        $('#chk_detraccion').prop('checked', true).parent().addClass('checked');
    }
    
    if ($("#chk_detraccion").is(":checked")) {
        if ($("#txt_monto_detraccion").val() === "0") { $("#txt_detraccion").val("0.00"); }
        else { $("#txt_detraccion").val($("#txt_monto_detraccion").val()); }
    }

    $("#hfporcentaje_detraccion").val("0");

    if (vErrors(["txt_desc_producto", "txt_cantidad", "txt_descuento_det", "txt_importe"])) {
        Bloquear("detalle_compra");
        $(".producto").each(function () {
            if ($(this).text() === $("#txt_cod_producto").val()) {
                existe = true;
                Desbloquear("detalle_compra");
                alertCustom("Producto ya agregado a la lista.");
            }
        });

        if (!existe) {
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/no/ajax/nomdocc.ashx?OPCION=GD",
                contentType: false, data: data,
                processData: false, cache: false
            }).success(function (datos) {
                if (datos !== null) {
                    if (datos === "OK") {
                        exito();
                        //Recalcular para incluir detracciones
                        if ($('#txt_base_imponible').val() !== '') {
                            Calcular();
                        }
                        CancelarDet();
                        listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                        $("#div_btn_completar").css("display", "block");
                        verificaBalanceo();
                    }
                } else {
                    noexito();
                }
                Desbloquear("detalle_compra");
            }).error(function () {
                Desbloquear("detalle_compra");
                noexito();
            });
        }//cierra if
    }//cierra if validador
}

var Cancelar = function () {
    window.location.href = '?f=NOMDOCC';
}

var CancelarDet = function () {
    $("#txt_cod_a_producto, #txt_cod_producto, #hfCOD_PROD, #txt_desc_producto, #txt_cantidad, #txt_importe, #txt_glosa_det").val("");
    $('#txt_descuento_det').val(0);
    $("#cbo_und_medida").select2('val', '');
    $("#hfporcentaje_detraccion").val("0");
}

var item = 0;
var listarDet = function (fac_code, fac_seq) {
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=LD&FACC_CODE=" + fac_code + "&FACC_SEQ_DOC=" + fac_seq + '&TIPO_MONE=' + $('#cbo_moneda :selected').attr('tipo'),
        async: false,
        success: function (datos) {
            if (datos === "No se encontraron datos!!!") {
                $("#div_tabla_det").css("display", "none");
                $("#div_btn_completar").css("display", "none");
            } else {
                $("#div_tabla_det").css("display", "block");
                $("#div_btn_completar").css("display", "block");
                $('#div_tabla_det').html(datos);
                $('#tabla_det').dataTable({
                    "info": false,
                    "order": [[0, 'asc']],
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                }).makeEditable({
                    sUpdateURL: "vistas/no/ajax/nomdocc.ashx?OPCION=AGRID&FACC_CODE=" + $("#txtNumDctoComp").val(),
                    "aoColumns": [null, null, null,
                        {
                            cssclass: "required number",
                            indicator: '<img src="../../recursos/img/loading.gif" />',
                            tooltip: 'Click para cambiar',
                            loadtext: '<img src="../../recursos/img/loading.gif" />',
                            type: 'text',
                            onblur: 'submit',
                            fnOnCellUpdated: function (sStatus, sValue, settings) {
                                exito();
                                setTimeout(function () {
                                    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                                    verificaBalanceo();
                                }, 50);
                            }
                        }, null, null, null,
                        {
                            cssclass: "required number",
                            indicator: '<img src="../../recursos/img/loading.gif" />',
                            tooltip: 'Click para cambiar',
                            loadtext: '<img src="../../recursos/img/loading.gif" />',
                            type: 'text',
                            onblur: 'submit',
                            fnOnCellUpdated: function (sStatus, sValue, settings) {
                                exito();
                                setTimeout(function () {
                                    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                                    verificaBalanceo();
                                }, 50);
                            }
                        },
                        {
                            cssclass: "required number",
                            indicator: '<img src="../../recursos/img/loading.gif" />',
                            tooltip: 'Click para cambiar',
                            loadtext: '<img src="../../recursos/img/loading.gif" />',
                            type: 'text',
                            onblur: 'submit',
                            fnOnCellUpdated: function (sStatus, sValue, settings) {
                                exito();
                                setTimeout(function () {
                                    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                                    verificaBalanceo();
                                }, 50);
                            }
                        }]
                });

                $("#tabla_det tr").click(function () {
                    item = $(this).attr('id');
                });
            }
            sumaDetrac();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var listarDetCompl = function (fac_code, fac_seq) {
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=LD&FACC_CODE=" + fac_code + "&FACC_SEQ_DOC=" + fac_seq + "&IND_COMPL=C&TIPO_MONE=" + $('#cbo_moneda :selected').attr('tipo'),
        async: false,
        success: function (datos) {
            if (datos == "No se encontraron datos!!!") {
                $("#div_tabla_det").attr("style", "display:none");
            }
            else {
                $("#div_tabla_det").attr("style", "display:block");
                $('#div_tabla_det').html(datos);
                $('#tabla_det').dataTable({ order: [[0, 'asc']] });

                var xy = 0;
                $(".detraccion").each(function () {
                    xy += parseFloat($(this).text());
                });

                if ($(".detraccion").length > 0 || $(".detrac").length == 0) {
                    $("#txt_monto_detraccion").val(xy.toString());
                    if ($("#chk_detraccion").is(":checked")) {
                        if ($("#txt_monto_detraccion").val() == "0")
                            $("#txt_detraccion").val("0.00");
                        else
                            $("#txt_detraccion").val($("#txt_monto_detraccion").val());
                    }
                }

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

var sumaDetrac = function () {
    var codigo = ObtenerQueryString('codigo');
    if (codigo !== undefined) {
        var df = 0;
        $(".detraccion").each(function () {
            df += parseFloat($(this).text());
        });
        if ($(".detraccion").length > 0 || $(".detrac").length == 0) {
            $("#txt_monto_detraccion").val(df);
            if ($("#chk_detraccion").is(":checked")) {
                if ($("#txt_monto_detraccion").val() === "0") {
                    $("#txt_detraccion").val("0.00");
                } else {
                    $("#txt_detraccion").val($("#txt_monto_detraccion").val());
                }
            }
        }
    } else {
        calcularDetraccionOrigen();
        $("#txt_monto_detraccion").val(detraccion_origen);
    }
}

var Delete = function (item, total_neto) {
    Bloquear("div_tabla_det");
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=DELETE&FACC_CODE=" + $("#txtNumDctoComp").val() + "&FACC_SEQ_DOC=" + $("#txtNumSec").val() + "&ITEM=" + item,
        async: false,
        success: function (datos) {
            Desbloquear("div_tabla_det");
            if (datos === "OK") {
                //var monto_dtrac = parseFloat($("#txt_monto_detraccion").val()) - parseFloat($("#det" + item).text());
                //$("#txt_monto_detraccion").val(monto_dtrac.toString());
                //if ($("#chk_detraccion").is(":checked")) {
                //    if ($("#txt_monto_detraccion").val() == "0")
                //        $("#txt_detraccion").val("0.00");
                //    else
                //        $("#txt_detraccion").val($("#txt_monto_detraccion").val());
                //}
                //$("#hfporcentaje_detraccion").val("0.00");
                exito();
                listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
                verificaBalanceo();
                if ($("#tabla_det tbody").children().length == 0) {
                    $("#div_tabla_det").attr("style", "display:none");
                    $("#div_btn_completar").attr("style", "display:none");
                }
                //Recalcular para incluir detraccion
                if ($('#txt_base_imponible').val() !== '') {
                    Calcular();
                }
                if ($("#txt_monto_detraccion").val() == 0) { //DPORTA
                    $('#chk_detraccion').prop('checked', false).parent().removeClass('checked');
                }
            }
            else {
                noexito();
            }
        },
        error: function (msg) {
            Desbloquear("div_tabla_det");
            alert(msg);
        }
    });
}

var verificaBalanceo = function () {

    // var monto_total = ($('#chk_inc_igv').is(':checked')) ? parseFloat($('#txt_prec_total').val()) : parseFloat($('#txt_subtotal').val());
    var monto_actual = parseFloat(sumaDetalles()).toFixed(2);
    var igv = $('#chk_inc_igv').is(':checked');
    var isc = $('#chk_inc_isc').is(':checked');

    if (!igv && !isc) {
        monto_total = parseFloat($('#txt_base_imponible').val()).toFixed(2)
    }
    if (!igv && isc) {
        monto_total = parseFloat($('#txt_subtotal').val()).toFixed(2)
    }
    if (igv && isc) {
        monto_total = parseFloat($('#txt_prec_total').val()).toFixed(2)
    }
    if (igv && !isc) {
        monto_total = (parseFloat($('#txt_prec_total').val()) - parseFloat($("#txt_isc").val())).toFixed(2)
        // parseFloat($('#txt_base_imponible').val() * ((1 + parseFloat($("#txt_impuesto").val()) / 100))).toFixed(2)
    }

    if (isNaN(monto_total)) { monto_total = 0; }


    $("#lbl_monto_total").html("<b>" + formatoMoneda(monto_total, $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
    $("#lbl_monto_actual").html("<b>" + formatoMoneda(monto_actual, $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
    if (monto_total == monto_actual) {
        $("#msg_balanceo").html("<b>BALANCEADO</b>");
        $("#msg_balanceo").attr("style", "font-family: monospace; color:green;");
        $("#hfBalanceo").val("B");
        return true;
    } else {
        $("#msg_balanceo").html("<b>NO BALANCEADO</b>");
        $("#msg_balanceo").attr("style", "font-family: monospace; color:red;");
        $("#hfBalanceo").val("NB");
        return false;
    }
}

var sumaDetalles = function () {
    var montos = $('#tabla_det').DataTable().column(8).data().toArray();
    var suma = 0.0;
    for (var i in montos) {
        suma += parseFloat(montos[i]);
    }
    return suma.toFixed(2);
};

var sumar = function () {
    var m = 0;
    $(".suma").each(function () {
        m += parseFloat($(this).text());
    });
    $("#hfMONTO_ACTUAL").val(m.toFixed(2));
    $("#lbl_monto_actual").html("<b>" + formatoMoneda($("#hfMONTO_ACTUAL").val(), $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
    if (verificaBalanceo()) {
        $("#div_btn_add_prods").css("display", "none");
    } else {
        $("#div_btn_add_prods").css("display", "block");
    }

}

var calcular_fila_cantidad = function () {
    var cantidad, precio, descuento, bruto, neto, pu;
    cantidad = parseFloat($(".cantidad" + item + ":first").text());
    descuento = parseFloat($(".descuento" + item + ":first").text());
    neto = parseFloat($(".neto" + item + ":first").text());

    if ($("#hfIGV_IND").val() == "S") { pu = (((neto / 1.18) + descuento) / cantidad).toFixed(2); }
    else {
        pu = ((neto + descuento) / cantidad).toFixed(2);
    }

    bruto = (pu * cantidad).toFixed(2);
    $(".precio" + item + ":first").text(pu);
    $(".bruto" + item + ":first").text(bruto);
    sumar();
    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
}

var calcular_fila_bruto = function () {
    var cantidad, precio, descuento, bruto, neto, pu;
    cantidad = $(".cantidad" + item + ":first").text();
    descuento = $(".descuento" + item + ":first").text();
    neto = $(".neto" + item + ":first").text();

    if ($("#hfIGV_IND").val() == "S") { pu = (((neto / 1.18) + descuento) / cantidad).toFixed(2); }
    else { pu = ((neto + descuento) / cantidad).toFixed(2); }

    $(".precio" + item + ":first").text(pu.toFixed(2).toString().replace(',', '.'));

    sumar();
    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
}

var get_producto = function (prod_code) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=LPROD&CTLG_CODE=" + $('#cbo_Empresa').val() + "&PROD_CODE=" + prod_code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $("#hfCOD_PROD").val(datos[0].CODIGO);
                $('#hfPROD_ALMACENABLE').val(datos[0].ALMACENABLE_IND);
                $("#txt_cod_producto").val($("#hfCOD_PROD").val());
                $("#txt_cod_producto").change();
                $("#cbo_und_medida").select2('val', datos[0].UNIDAD);
                $("#cbo_und_medida").change();
                $("#txt_desc_producto").val(datos[0].DESC_ADM);
                $("#txt_desc_producto").change();
            }
            else {
                alertCustom("No hay Productos para el catalogo");
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}


var costosCorrectos = function () {
    var valores = $('#tabla_det').DataTable().column(8).data().toArray();
    return true; //!(valores.indexOf('0') > -1);
};

var formatoMoneda = function (n, moneda) {
    var num = parseFloat(n);
    return moneda + " " + num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ,");
}

var ListarEstablecimiento = function () {

    Bloquear($($('#cbo_establecimiento').parents("div")[0]));
    var select = $('#cbo_establecimiento');
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + $("#cboEmpresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("divCboEstablecimiento");
            $(select).empty();
            $(select).append('<option></option>');
            if (datos !== null) {
                for (var i = 0; i < datos.length; i++) {
                    $(select).append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $(select).select2("val",$('#ctl00_hddestablecimiento').val()).change();
        },
        error: function (msg) {
            alertCustom("Establecimientos no se listaron correctamente.")
        },
        complete: function (msg) {
            Desbloquear($($('#cbo_establecimiento').parents("div")[0]));
        }
    });

}

//TRANSACCIONES--------------
var GrabarDctoCompra = function () {
    if ($("#txt_base_imponible").val() !== "" && $("#txt_descuento").val() !== "" && $("#txt_isc").val() !== "") { Calcular(); }

    var res = validarDctoCompra($("#txt_num_ser_reg").val(), $("#txt_num_doc_reg").val(), $("#hfPIDM").val(), $("#cbo_doc_registro").val());
    var credito_correcto = true;

    if (origenesValidos()) {
        if (res) {
            if ($('#cbo_modo_pago').val() === '0002') { credito_correcto = (linea_credito >= base_imponible_origen); }
            credito_correcto = credito_correcto;
            if (credito_correcto) {
                var plazo_correcto = ($('#cbo_modo_pago').val() === '0002') && (parseInt($('#txt_plazo_pago').val()) > 0)
                plazo_correcto = plazo_correcto || ($('#cbo_modo_pago').val() === '0001') && (parseInt($('#txt_plazo_pago').val()) === 0)
                if (plazo_correcto) {
                    //VALIDAR FECHA Y PERIODO
                    var continuar = false;
                    var mesEmision = $("#txt_fec_emision").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
                    var anioEmision = $("#txt_fec_emision").val().split("/")[2];
                    var mesPeriodo = $("#cbo_periodo").val().split("-")[0];//$("#cbo_periodo").val() :: "1-2016"
                    var anioPeriodo = $("#cbo_periodo").val().split("-")[1];
                    if (parseInt(anioEmision) == parseInt(anioPeriodo)) {
                        if (parseInt(mesEmision) <= parseInt(mesPeriodo)) {
                            continuar = true;
                        }
                    } else if (parseInt(anioEmision) < parseInt(anioPeriodo)) {
                        continuar = true;
                    }
                    //TRANSACCION
                    if (continuar) {
                        if (glosario_correcto) {
                            Bloquear("ventana");
                            var inputscodigos = $('.txt_cod_doc_orig');
                            var inputsseries = $('.txt_num_ser_orig');
                            var inputsnums = $('.txt_num_doc_orig');
                            var cadenacodsorigen = '';
                            var cadenaserieorigen = '';
                            var cadenanumorigen = '';
                            for (var i = 0; i < inputsseries.length; i++) {
                                cadenacodsorigen += $(inputscodigos[i]).val() + ','
                                cadenaserieorigen += $(inputsseries[i]).val() + ',';
                                cadenanumorigen += $(inputsnums[i]).val() + ',';
                            }
                            cadenacodsorigen += ']';
                            cadenacodsorigen = cadenacodsorigen.replace(',]', '');

                            cadenaserieorigen += ']';
                            cadenaserieorigen = cadenaserieorigen.replace(',]', '');

                            cadenanumorigen += ']';
                            cadenanumorigen = cadenanumorigen.replace(',]', '');

                            var data = new FormData();
                            data.append('COD_OPERA', $('#cboDeclara').val());
                            data.append('COD_SERIE_ORG', cadenacodsorigen);
                            data.append('NUM_SERIE_ORG', cadenaserieorigen);
                            data.append('NUM_DCTO_ORG', cadenanumorigen);
                            data.append('TIPO_DCTO_ORG', $("#cbo_doc_origen").val());
                            data.append('FEC_EMISION', $("#txt_fec_emision").val());
                            data.append('FEC_TRANS', $("#txt_fec_transaccion").val());
                            data.append('FEC_VENCI', $("#txt_fec_vencimiento").val());
                            data.append('GLOSA', $("#txt_comentario").val());
                            data.append('CTLG_CODE', $("#cbo_Empresa").val());
                            data.append('SCSL_CODE', $("#cbo_Sucursal").val());
                            data.append('MONEDA_CODE', $("#cbo_moneda").val());
                            data.append('IMPUESTO_IND', $("#chk_inc_igv").is(":checked") ? "S" : "N");
                            data.append('p_ISC_IND', $("#chk_inc_isc").is(":checked") ? "S" : "N");

                            data.append('PROV_PIDM', $("#hfPIDM").val());
                            data.append('VALOR_CAMBIO', $("#txt_valor_cambio").val());
                            data.append('USUARIO', $('#ctl00_txtus').val());
                            data.append('TIPO_DCTO', $("#cbo_doc_registro").val());
                            data.append('NUM_SERIE', $("#txt_num_ser_reg").val());
                            data.append('NUM_DCTO', $("#txt_num_doc_reg").val());
                            data.append('PERCEPCION', $("#txt_Percepcion").val() == "" ? "0" : $("#txt_Percepcion").val());
                            data.append('DETRACCION', $("#txt_detraccion").val() == "" ? "0" : $("#txt_detraccion").val());
                            data.append('RETENCION', $("#txt_Retencion").val() == "" ? "0" : $("#txt_Retencion").val());
                            data.append('PERCEPCION_IND', $("#chk_percepcion").is(":checked") ? "S" : "N");
                            data.append('DETRACCION_IND', $("#chk_detraccion").is(":checked") ? "S" : "N");
                            data.append('RETENCION_IND', $("#chk_retencion").is(":checked") ? "S" : "N");
                            data.append('BASE_IMPONIBLE', $("#txt_base_imponible").val());
                            data.append('INAFECTO', "0");
                            data.append('ISC', $("#txt_isc").val());
                            data.append('DESCUENTO', $("#txt_descuento").val());
                            data.append('IMPUESTO', $("#txt_impuesto_calc").val());
                            data.append('TOTAL_PAGAR', $("#chk_inc_igv").is(":checked") ? $("#txt_prec_total").val() : $("#txt_subtotal").val());
                            data.append('MODO_PAGO', $("#cbo_modo_pago").val());
                            data.append('NUM_DCTO_DETRAC', $("#txt_num_op_detrac").val());
                            data.append("NRO_CUENTA_DETRAC", $("#txt_cta_detrac").val());
                            data.append('FEC_EMI_DETRAC', $("#txt_fec_comp_detrac").val());
                            data.append('IMPRFAC_PERCEP', $("#rbsinserie").is(":checked") ? "S" : "N");
                            data.append('NUM_DCTO_PERCEP', $("#txt_num_comp_percep").val());
                            data.append('FECHA_EMI_PERCEP', $("#txt_fec_comp_percep").val());
                            data.append('NUM_DCTO_RETEN', $("#txt_num_comp_reten").val());
                            data.append('FECHA_EMI_RETEN', $("#txt_fec_comp_reten").val());
                            data.append('OPERACION', $("#cbx_destino").val());
                            data.append('FEC_DCTO_REF', "");
                            data.append('PLAZO', $('#txt_plazo_pago').val());
                            data.append('FECHA_VENC', $('#txt_fec_vencimiento').val());
                            data.append('AJUSTE', $('#txt_ajuste').val());
                            ///////////////////////////////////
                            data.append('p_MES_TRIB', $("#cbo_periodo").val().split("-")[0]);
                            data.append('p_ANIO_TRIB', $("#cbo_periodo").val().split("-")[1]);


                            data.append('p_DIRECCION', $("#cbo_direccion option:selected").text());
                            data.append('p_LATITUD', $("#cbo_direccion option:selected").attr("latitud"));
                            data.append('p_LONGITUD', $("#cbo_direccion option:selected").attr("longitud"));

                            data.append('p_PORCEN_IGV', $("#txt_impuesto").val());
                            data.append('p_HABIDO_IND', HABIDO_IND);
                            data.append('p_TIPO_BIEN', $("#cboTipoBien").val());

                            $("#hfCOD_EMPRESA").val($("#cbo_Empresa").val());
                            $("#hf_DESC_EMP").val($('#cbo_Empresa option:selected').text());
                            $("#hfCOD_SCSL").val($('#cbo_Sucursal').val());
                            $("#hfDESC_SCSL").val($('#cbo_Sucursal option:selected').text());

                            var jqxhr = $.ajax({
                                type: "POST",
                                url: "vistas/no/ajax/nomdocc.ashx?OPCION=GF",
                                contentType: false,
                                data: data,
                                processData: false,
                                async: true,
                                cache: false
                            }).done(function (datos) {
                                if (datos !== null) {
                                    if (datos[0].CODIGO) {
                                        detraccionInd = $("#chk_detraccion").is(":checked") ? "S" : "N";
                                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                                        $("#grabar").attr("href", "javascript:ActualizarDctoCompra();");
                                        $("#tabDetalleComp").click()
                                        $("#txtNumDctoComp_Det").val(datos[0].CODIGO);
                                        $("#txtNumDctoComp").val(datos[0].CODIGO);
                                        $("#txtcod_empresa").val($('#hfCOD_EMPRESA').val());
                                        $("#txt_empresa_desc").val($('#hf_DESC_EMP').val());
                                        $("#txtcod_sucursal").val($('#hfCOD_SCSL').val());
                                        $("#txt_sucursal_desc").val($('#hfDESC_SCSL').val());
                                        $("#div_btn_add_prods").attr("style", "display:block");
                                        $("#chk_inc_igv").is(":checked") ? $("#hfIGV_IND").val("S") : $("#hfIGV_IND").val("N")
                                        $('.buscar, .add, .remove').css('display', 'none');
                                        $('#cbo_modo_pago').prop('disabled', true);
                                        if ($("#hfIGV_IND").val() === "S") {
                                            $("#lbl_monto_total").html("<b>" + formatoMoneda($("#txt_prec_total").val(), $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
                                            $("#hfMONTO_TOTAL").val($("#txt_prec_total").val());
                                        } else {
                                            $("#lbl_monto_total").html("<b>" + formatoMoneda($("#txt_subtotal").val(), $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
                                            $("#hfMONTO_TOTAL").val($("#txt_subtotal").val());
                                        }
                                        listarDet(datos[0].CODIGO, $('#txtNumSec').val());
                                        verificaBalanceo();
                                        cargarProductos();
                                        $('#cbo_Empresa, #cbo_Sucursal, #cbo_doc_origen, #cbo_moneda').prop('disabled', true);
                                        window.history.pushState("Object", "DOCUMENTOS DE COMPRAS", "/Default.aspx?f=nomdocc&codigo=" + datos[0].CODIGO);
                                        $('#cbo_und_medida').attr("disabled", false);
                                        IGV_IND = $('#chk_inc_igv').is(':checked')
                                        ISC_IND = $('#chk_inc_isc').is(':checked')
                                        $("#hfvalor_periodo_carga").val($("#cbo_periodo").val())
                                        exito();
                                    }
                                } else {
                                    noexito();
                                }
                                Desbloquear("ventana");
                            }).fail(function () {
                                noexito();
                                Desbloquear("ventana");
                            });
                        } else {
                            alertCustom("El glosario no debe ser mayor a 100 caractereres");
                            $("#txt_comentario").focus();
                        }
                    } else {
                        alertCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                        $("#cbo_periodo").focus();
                    }

                } else {
                    alertCustom('Ingrese un plazo de pago válido.');
                }
            } else {
                alertCustom('Línea de Crédito del Proveedor no cubre el monto de la base imponible.');
            }
        }
    } else {
        alertCustom('Por favor, llene todos los campos documentos de Origen.');
    }
}

var ActualizarDctoCompra = function () {
    if ($("#txt_base_imponible").val() !== "" && $("#txt_descuento").val() !== "" && $("#txt_isc").val() !== "") { Calcular(); }

    var a = ["cbo_periodo", "cbo_direccion"];

    if ($('#chk_percepcion').is(':checked')) { a.push('txt_Percepcion'); }
    if ($('#chk_retencion').is(':checked')) { a.push('txt_Retencion'); }

    if (vErrors(a)) {
        var actualizar = true;
        if ($('#chk_percepcion').is(':checked')) { actualizar = parseFloat($('#txt_Percepcion').val()) > 0; }

        if ($('#chk_retencion').is(':checked')) { actualizar = parseFloat($('#txt_Retencion').val()) > 0; }

        if (actualizar) {
            Bloquear("ventana");
            var inputscodigos = $('.txt_cod_doc_orig');
            var inputsseries = $('.txt_num_ser_orig');
            var inputsnums = $('.txt_num_doc_orig');

            var cadenacodsorigen = '';
            var cadenaserieorigen = '';
            var cadenanumorigen = '';
            for (var i = 0; i < inputsseries.length; i++) {
                cadenacodsorigen += $(inputscodigos[i]).val() + ',';
                cadenaserieorigen += $(inputsseries[i]).val() + ',';
                cadenanumorigen += $(inputsnums[i]).val() + ',';
            }

            cadenacodsorigen += ']';
            cadenacodsorigen = cadenacodsorigen.replace(',]', '');

            cadenaserieorigen += ']';
            cadenaserieorigen = cadenaserieorigen.replace(',]', '');

            cadenanumorigen += ']';
            cadenanumorigen = cadenanumorigen.replace(',]', '');

            $("#hfCOD_EMPRESA").val($("#cbo_Empresa").val());
            $("#hf_DESC_EMP").val($('#cbo_Empresa option:selected').text());
            $("#hfCOD_SCSL").val($('#cbo_Sucursal').val());
            $("#hfDESC_SCSL").val($('#cbo_Sucursal option:selected').text());

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/no/ajax/nomdocc.ashx?OPCION=AC",
                data: {
                    COD_OPERA: $('#cboDeclara').val(),
                    COD_SERIE_ORG: cadenacodsorigen,
                    FACC_CODE: $("#txtNumDctoComp").val(),
                    NUM_SERIE_ORG: cadenaserieorigen, NUM_DCTO_ORG: cadenanumorigen,
                    TIPO_DCTO_ORG: $("#cbo_doc_origen").val(),
                    FEC_EMISION: $("#txt_fec_emision").val(),
                    FEC_TRANS: $("#txt_fec_transaccion").val(), FEC_VENCI: $("#txt_fec_vencimiento").val(),
                    GLOSA: $("#txt_comentario").val(),
                    CTLG_CODE: $("#cbo_Empresa").val(), SCSL_CODE: $("#cbo_Sucursal").val(),
                    MONEDA_CODE: $("#cbo_moneda").val(),
                    IMPUESTO_IND: ($("#chk_inc_igv").is(":checked") ? "S" : "N"),
                    PROV_PIDM: $("#hfPIDM").val(), VALOR_CAMBIO: $("#txt_valor_cambio").val(),
                    USUARIO: $('#ctl00_txtus').val(),
                    TIPO_DCTO: $("#cbo_doc_registro").val(),
                    NUM_SERIE: $("#txt_num_ser_reg").val(),
                    NUM_DCTO: $("#txt_num_doc_reg").val(),
                    PERCEPCION: ($("#txt_Percepcion").val() === "" ? "0" : $("#txt_Percepcion").val()),
                    DETRACCION: ($("#txt_detraccion").val() === "" ? "0" : $("#txt_detraccion").val()),
                    RETENCION: ($("#txt_Retencion").val() === "" ? "0" : $("#txt_Retencion").val()),
                    PERCEPCION_IND: ($("#chk_percepcion").is(":checked") ? "S" : "N"),
                    DETRACCION_IND: ($("#chk_detraccion").is(":checked") ? "S" : "N"),
                    RETENCION_IND: ($("#chk_retencion").is(":checked") ? "S" : "N"),
                    BASE_IMPONIBLE: $("#txt_base_imponible").val(), INAFECTO: "0", ISC: $("#txt_isc").val(),
                    DESCUENTO: $("#txt_descuento").val(), IMPUESTO: $("#txt_impuesto_calc").val(),
                    TOTAL_PAGAR: ($("#chk_inc_igv").is(":checked") ? $("#txt_prec_total").val() : $("#txt_subtotal").val()),
                    MODO_PAGO: $("#cbo_modo_pago").val(), NUM_DCTO_DETRAC: $("#txt_num_op_detrac").val(),
                    NRO_CUENTA_DETRAC: $("#txt_cta_detrac").val(), FEC_EMI_DETRAC: $("#txt_fec_comp_detrac").val(),
                    IMPRFAC_PERCEP: ($("#rbsinserie").is(":checked") ? "S" : "N"), NUM_DCTO_PERCEP: $("#txt_num_comp_percep").val(),
                    FECHA_EMI_PERCEP: $("#txt_fec_comp_percep").val(), NUM_DCTO_RETEN: $("#txt_num_comp_reten").val(),
                    FECHA_EMI_RETEN: $("#txt_fec_comp_reten").val(),
                    OPERACION: $("#cbx_destino").val(), FEC_DCTO_REF: "", PLAZO: $('#txt_plazo_pago').val(),
                    p_MES_TRIB: $("#cbo_periodo").val().split("-")[0],
                    p_ANIO_TRIB: $("#cbo_periodo").val().split("-")[1],
                    FECHA_VENC: $('#txt_fec_vencimiento').val(), AJUSTE: $('#txt_ajuste').val(),
                    p_DIRECCION: $("#cbo_direccion option:selected").text(),
                    p_LATITUD: $("#cbo_direccion option:selected").attr("latitud"),
                    p_LONGITUD: $("#cbo_direccion option:selected").attr("longitud"),
                    p_ISC_IND: ($("#chk_inc_isc").is(":checked") ? "S" : "N"),
                    p_PORCEN_IGV: $("#txt_impuesto").val(),
                    p_HABIDO_IND: HABIDO_IND,
                    p_TIPO_BIEN: $("#cboTipoBien").val()
                },
            }).done(function (datos) {
                if (datos !== null) {
                    detraccionInd = $("#chk_detraccion").is(":checked") ? "S" : "N";
                    var s = $("#txtNumSec").val();
                    var sec = parseFloat(s) + 1;
                    $("#txtNumSec").val(sec);
                    cargarProductos();
                    exito();
                    $("#hfvalor_periodo_carga").val($("#cbo_periodo").val().split("-")[0] + "-" + $("#cbo_periodo").val().split("-")[1])
                    $("#chk_inc_igv").is(":checked") ? $("#hfIGV_IND").val("S") : $("#hfIGV_IND").val("N")
                    if ($("#hfIGV_IND").val() === "S") {
                        $("#lbl_monto_total").html("<b>" + formatoMoneda($("#txt_prec_total").val(), $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
                        $("#hfMONTO_TOTAL").val($("#txt_prec_total").val());
                    }
                    else {
                        $("#lbl_monto_total").html("<b>" + formatoMoneda($("#txt_subtotal").val(), $('#cbo_moneda :selected').attr('simbolo')) + "</b>");
                        $("#hfMONTO_TOTAL").val($("#txt_subtotal").val());
                    }
                    verificaBalanceo();
                    act_dire_ind = false
                    IGV_IND = $('#chk_inc_igv').is(':checked')
                    ISC_IND = $('#chk_inc_isc').is(':checked')
                    $("#hfvalor_periodo_carga").val($("#cbo_periodo").val())
                } else {
                    noexito();
                }
                Desbloquear("ventana");
            }).fail(function () {
                noexito();
                Desbloquear("ventana");
            });
        } else {
            alertCustom('Si el documento está sujeto a Percepción, debe ingresar un monto mayor a cero.');
        }
    }
}

var ConfirmarModificacion = function () {


    $('#modal-confirmar').modal('hide')

    ActualizarDctoCompra();


}


//----------------------------

var Devuelve_Desc_MES = function (oMes) {

    var array = [];
    array[1] = "ENERO"
    array[2] = "FEBRERO"
    array[3] = "MARZO"
    array[4] = "ABRIL"
    array[5] = "MAYO"
    array[6] = "JUNIO"
    array[7] = "JULIO"
    array[8] = "AGOSTO"
    array[9] = "SEPTIEMBRE"
    array[10] = "OCTUBRE"
    array[11] = "NOVIEMBRE"
    array[12] = "DICIEMBRE"

    return array[oMes].toString();
}

flagCargaPlugMaps = false;
function MostrarMapa(v_iddiv) {

    //var vLatitud = $("#" + v_iddiv + " #txtLatitud").val();
    //var vLongitud = $("#" + v_iddiv + " #txtLongitud").val();
    //var vTitulo = $("#" + v_iddiv + " #titulodir").val();
    if (vErrors(["cbo_direccion"])) {
        var vLongitud = $("#cbo_direccion option:selected").attr("longitud");
        var vLatitud = $("#cbo_direccion option:selected").attr("latitud");
        var vTitulo = $("#cbo_direccion option:selected").html();
        if (vLongitud != "null" && vLatitud != "null") {


            $("#mapaModal").modal('show');
            if (!flagCargaPlugMaps) {
                $.getScript("//maps.googleapis.com/maps/api/js?key=AIzaSyCQ22NAvgA2_s8S1xRmR7YQZXsk_PejW1Q")
                    .always(Bloquear("map"), "Cargando")
                     .done(function (script, textStatus) {
                         $.getScript("../../recursos/plugins/gmaps.js")
                             .done(function (script, textStatus) {
                                 map = new GMaps({
                                     div: '#map',
                                     lat: -12.043333,
                                     lng: -77.028333
                                 });
                                 if (vLatitud === "" || vLongitud === "") {
                                     BuscarPorNombre(v_iddiv, vTitulo);
                                 } else {
                                     map.setCenter(vLatitud, vLongitud);
                                     map.addMarker({
                                         lat: vLatitud,
                                         lng: vLongitud,
                                         title: vTitulo,
                                         draggable: true,
                                         dragend: function () {
                                             $("#mapaModal").modal("hide");
                                             $("#modalGConfirmacion").modal("show");
                                             vNewLat = this.getPosition().lat();
                                             vNewLng = this.getPosition().lng();
                                         },
                                         infoWindow: {
                                             content: '<p>' + vTitulo + '</p>'
                                         }
                                     });
                                 }

                             });
                     });

                $("#modGSi").click(function () { $("#" + v_iddiv + " #txtLatitud").val(vNewLat); $("#" + v_iddiv + " #txtLongitud").val(vNewLng); $("#modalGConfirmacion").modal("hide"); $("#mapaModal").modal("show"); });
                $("#modGNo").click(function () { $("#modalGConfirmacion").modal("hide"); map.markers[0].setPosition(new google.maps.LatLng($("#" + v_iddiv + " #txtLatitud").val(), $("#" + v_iddiv + " #txtLongitud").val())); $("#mapaModal").modal("show"); });
                flagCargaPlugMaps |= 1;
            }
            else {
                x = map.markers[0];
                if (vLatitud === "" || vLongitud === "") {
                    BuscarPorNombre(v_iddiv, vTitulo);
                } else {
                    map.setCenter($("#" + v_iddiv + " #txtLatitud").val(), $("#" + v_iddiv + " #txtLongitud").val());
                    x.setPosition(new google.maps.LatLng($("#" + v_iddiv + " #txtLatitud").val(), $("#" + v_iddiv + " #txtLongitud").val()));
                }
            }
        } else {
            infoCustom2("No se ha encontrado una longitud y latitud para esta dirección.");
        }
    }
}

//DATOS SUNAT PARA INDICADOR HABIDO_IND
var DatosSunatCargados;
//var ajaxSunat = null;
//function MuestraSunat() {

//    $("#no_existe").css("display", "none").html();
//    var NRO = $("#txt_ruc_proveedor").val();
//    Bloquear("divConsultaHabido");
//    Bloquear("divConsultaHabido");
//    if (ajaxSunat) {
//        ajaxSunat.abort();
//    }
//    ajaxSunat = $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: true,
//        success: function (data) {

//            if (data == "NO_EXISTE" || data == "error") {
//                $("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido. Se marcará como HABIDO</p>');
//                $("#spanVerificando").html("-");
//                HABIDO_IND = "1";
//            } else {
//                var datos = $.parseJSON(data)
//                if (datos[0].FECHA_BAJA != undefined) {
//                    $("#no_existe").css("display", "block").html('<p>El <b>RUC ' + NRO + '</b> perteneciente a <B>' + datos[0].RAZON + '</B> se encuentra en <B>' + datos[0].ESTADO + '</B> desde <B>' + datos[0].FECHA_BAJA + '</B> por SUNAT.</p>');;
//                    if (datos[0].CONDICION == "HABIDO") {
//                        HABIDO_IND = "1";
//                    } else {
//                        HABIDO_IND = "0";
//                    }
//                }
//                else {

//                    if (datos != null) {
//                        if (datos[0].CONDICION == "HABIDO") {
//                            HABIDO_IND = "1";
//                        } else {
//                            HABIDO_IND = "0";
//                        }
//                        DatosSunatCargados = datos[0];
//                    } else {
//                        $("#spanVerificando").html("-");
//                        $("#no_existe").css("display", "block").html('<p>No se encontraron datos. Se marcará como HABIDO</p>');;
//                        HABIDO_IND = "1";
//                    }
//                }
//            }

//            $("#lblEstadoSunat").html(datos[0].ESTADO);
//            $("#spanVerificando").html(datos[0].CONDICION);

//            //if (HABIDO_IND = "1") {
//            //    $("#lblHabido").html("Condición: HABIDO");
//            //} else {
//            //    $("#lblHabido").html("Condición: NO HABIDO");
//            //}
//        },
//        error: function (msg) {
//            Desbloquear("divConsultaHabido");
//            if (msg.statusText != "abort") {
//                alertCustom("Consulta no se realizó correctamente");
//            }

//        }, complete: function () {
//            Desbloquear("divConsultaHabido");
//        }
//    });

//}

function MuestraSunat() {

    $("#no_existe").css("display", "none").html();
    var NRO = $("#txt_ruc_proveedor").val();
    Bloquear("divConsultaHabido");

    var formData = new FormData();

    formData.append("token", token_migo);
    formData.append("ruc", NRO);

    var request = new XMLHttpRequest();

    request.open("POST", "https://api.migo.pe/api/v1/ruc");
    request.setRequestHeader("Accept", "application/json");

    request.send(formData);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (data.success == true) {
            //if (data.estado_del_contribuyente == "ACTIVO") {
            if (data.condicion_de_domicilio == "HABIDO") {
                HABIDO_IND = "1";
            } else {
                HABIDO_IND = "0";
            }
            DatosSunatCargados = data;
            //} else {
            //    infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
            //}
            debugger;
            Desbloquear("divConsultaHabido");
            $("#lblEstadoSunat").html(data.estado_del_contribuyente);
            $("#spanVerificando").html(data.condicion_de_domicilio);
        }
    };
}

var fnActualizarDatosContribuyente = function (pidm, cond_sunat, estado_sunat) {

    var data = new FormData();
    data.append('PIDM', pidm);
    data.append('sCONDI_SUNAT', cond_sunat);
    data.append('sESTADO_SUNAT', estado_sunat);

    $.ajax({
        type: "POST",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=22",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            if (datos != null) {
                if (datos == "OK") {
                    $("#lblHabido").html("CONDICIÓN: " + "<b>" + cond_sunat + "</b>");
                    $("#lblEstado").html("ESTADO: " + "<b>" + estado_sunat + "</b>");
                    exito();
                    $('#modal-habido').modal('hide');
                } else {
                    noexito();
                }

            } else {
                noexito();
            }
            Desbloquear("ventana");
        },
        error: function () {
            noexito();
            Desbloquear("ventana");
        }
    });
};

function CancelarSunat() {
    $('#ModalSunat').modal('hide');
}

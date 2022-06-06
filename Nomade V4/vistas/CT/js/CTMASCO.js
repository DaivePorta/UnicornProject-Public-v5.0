var array = [];
var correlativoInterno = [];
var ajaxCentroCostos = null;
var detallesGasto = [];
var detallesCuentas = [];
var objProd = {};
var dTotal = 0;
var dTotalH = 0;
var objAux;
var vAsientoContable = null;
const sCodModulo = "0003";


var asincrono = true;//clientes y responsablesPago
var gImporteCobrar = 0;
var jsonClientes = [];
var jsonPredeterminado = new Array();
var paramStock = -1;
var stockReal = 0;
var validarStockInd = "S";
//DETALLES SIN REDONDEO
var detallesVenta2 = [];
var prodActual2 = {};
var totales = {};
var aux_predeterminado = false;
//CODIGO DE LA VENTA DE MANERA GLOBAL
//var codigodctoglobal;

//PARAMETROS NUEVOS
var prmtVNST = "";//VALIDA STOCK ANTES DE AGREGAR A DETALLES
var agregarDetalle = "";//AGREGAR DETALLE VALIDADO
var cargarprederteminado = false;
//EQUIVALENCIA DE UNIDADESLMCO
var equivalencias = [];

var carga_ini_ind = false;
var cargaDctoOrigenInd = false;
var vAsientoContable = null;
var token_migo = '';//dporta

var CTLASCO = function () {

    var plugin = function () {
        $("#slcEmpresa").select2();
        $("#slcSucural").select2();
        $("#txt_fec_ini").datepicker();
        $("#txt_fec_fin").datepicker();
        $("#txt_fec_ini_emi").datepicker();
        $("#txt_fec_fin_emi").datepicker();

    }

    var fillBandeja = function () {


        var parms = {
            data: null,
            order: [[0, "desc"]],
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            "scrollX": true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "NRO_MOV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "DESC_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }, {
                    data: "CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },
                {
                    data: "TIPO_ASIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },
                {
                    data: "ESTABLECIMIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "FECHA_EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "VALOR_CAMBIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "USUARIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }
            ],
            footerCallback: function (row, data, start, end, display) {
               

            }

        }

        oTableGST = iniciaTabla('tbl_gastos', parms);
        $('#tbl_gastos').removeAttr('style');
        $('#tbl_gastos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableGST.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableGST.fnGetPosition(this);
                var row = oTableGST.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.open("?f=CTMASCO&codigo=" + CODIGO, '_blank');
                
            }
        });



    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var ListarSucursales = function () {
        var select = $('#slcSucural');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#slcEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
                $("#slcSucural").select2("val", "");
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            }
        });
    };



    var fillCbo_Periodo = function () {

        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=98&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option value="T">TODOS</option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                    }

                    $('#cbo_periodo').select2("val", "T");

                } else {


                    alertCustom("Error cargar periodo")

                }

            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
            }
        });
    }
    

    var reset = function () {

        $('#uniform-chkemp span').removeClass();
        $('#chkemp').attr('checked', false);
        $('#uniform-chkscsl span').removeClass();
        $('#chkscsl').attr('checked', false);
        $('#chkscsl').attr('disabled', true);
        $('#uniform-chkgast span').removeClass();
        $('#chkgast').attr('checked', false);
        $('#uniform-chkSgast span').removeClass();
        $('#chkSgast').attr('checked', false);
        $('#chkSgast').attr('disabled', true);
        $('#uniform-chkestado span').removeClass();
        $('#chkestado').attr('checked', false);
        $('#uniform-chkfec span').removeClass();
        $('#chkfec').attr('checked', false);

        $('#uniform-chkCentroCostos span').removeClass();
        $('#chkCentroCostos').attr('checked', false);

        if ($("#ctl00_hddctlg").val() == "") { $("#slcEmpresa").select2("val", ""); }
        else { $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()); }
        if ($("#ctl00_hddestablecimiento").val() == "") { $("#slcSucural").select2("val", ""); }
        else { $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val()); }
        $("#cbo_gasto").select2("val", "");
        $("#cbo_subgasto").select2("val", "");
        $("#cbo_estado").select2("val", "");
        $("#txt_fec_ini").datepicker("setDate", "");
        $("#txt_fec_fin").datepicker("setDate", "");

        //$("#txt_fec_ini_emi").datepicker("setDate", "");
        //$("#txt_fec_fin_emi").datepicker("setDate", "");

        $('#uniform-chkprovision span').removeClass();
        $('#chkprovision').attr('checked', false);
        $("#cbo_tipo_provision").select2("val", "NPRO").change();

        MuestraOculta("empresa", false);
        MuestraOculta("sucursal", false);
        MuestraOculta("gasto", false);
        MuestraOculta("subgasto", false);
        MuestraOculta("estado", false);
        MuestraOculta("fecha", false);
        MuestraOculta("provision", false);
        MuestraOculta("fecha_emi", false)
        MuestraOculta("divCentroCostos", false);

        $("#busq_avanz .error").attr("class", "control-group")
        $("#txt_fec_fin").parent().parent().attr("class", "control-group")
        $("#txt_fec_ini").parent().parent().attr("class", "control-group")

        $("#txt_fec_ini_emi").parent().parent().attr("class", "control-group")
        $("#txt_fec_fin_emi").parent().parent().attr("class", "control-group")
        array = [];
    }

    var eventos = function () {

        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                fillCbo_Periodo();
                ListarSucursales();
                fillCbo_Gasto($('#slcEmpresa').val());        
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        var gasto_ant = "";
        $('#cbo_gasto').on('change', function () {
            if (gasto_ant != $(this).val()) {
                ListarSubGasto($('#cbo_gasto').val())
                gasto_ant = $(this).val();
            } else { gasto_ant = ""; }
        });

  


        var tpro_ant = "";
        $('#cbo_tipo_provision').on('change', function () {
            if (tpro_ant != $(this).val()) {
                tpro_ant = $(this).val();
                if ($(this).val() == "PRO") {
                    $("#cbo_periodo").select2("val", "T")
                    $("#cbo_periodo").attr("disabled", true)

                    //$("#chk_avanzada").attr("disabled", "disabled");
                    //$("#chk_avanzada").attr("checked", false).parent().removeClass("checked");
                    //$("#chk_avanzada").click();
                } else {
                    $("#cbo_periodo").select2("val", "T")
                    $("#cbo_periodo").attr("disabled", false)

                    //$("#chk_avanzada").removeAttr("disabled");
                }
            } else { tpro_ant = ""; }
        });

        var per_ant = "";
        $('#cbo_periodo').on('change', function () {
            if (per_ant != $(this).val()) {
                //var date = new Date()
                if ($(this).val() != "T") {
                    var primerDia = new Date($('#cbo_periodo').val().split("-")[1], $('#cbo_periodo').val().split("-")[0] - 1, 1)
                    var ultimoDia = new Date($('#cbo_periodo').val().split("-")[1], $('#cbo_periodo').val().split("-")[0], 0)
                    $("#txt_fec_ini").datepicker("setStartDate", primerDia)
                    $("#txt_fec_ini").datepicker("setEndDate", ultimoDia);
                    $("#txt_fec_fin").datepicker("setStartDate", primerDia)
                    $("#txt_fec_fin").datepicker("setEndDate", ultimoDia);

                    $("#txt_fec_ini_emi").datepicker("setStartDate", primerDia)
                    $("#txt_fec_ini_emi").datepicker("setEndDate", ultimoDia);
                    $("#txt_fec_fin_emi").datepicker("setStartDate", primerDia)
                    $("#txt_fec_fin_emi").datepicker("setEndDate", ultimoDia);
                }
                else {
                    $("#txt_fec_ini").datepicker("setStartDate", "")
                    $("#txt_fec_ini").datepicker("setEndDate", "")
                    $("#txt_fec_ini").datepicker("setDate", "now");

                    $("#txt_fec_fin").datepicker("setStartDate", "")
                    $("#txt_fec_fin").datepicker("setEndDate", "")
                    $("#txt_fec_fin").datepicker("setDate", "now");



                    $("#txt_fec_ini_emi").datepicker("setStartDate", "")
                    $("#txt_fec_ini_emi").datepicker("setEndDate", "")
                    $("#txt_fec_ini_emi").datepicker("setDate", "now");

                    $("#txt_fec_fin_emi").datepicker("setStartDate", "")
                    $("#txt_fec_fin_emi").datepicker("setEndDate", "")
                    $("#txt_fec_fin_emi").datepicker("setDate", "now");
                }

            } else { per_ant = ""; }
        });

        $('#chkemp').on('click', function () {
            if ($("#chkemp").is(':checked')) {

                $('#uniform-chkemp span').removeClass().addClass("checked");
                $('#chkemp').attr('checked', true);
                $('#chkscsl').attr('disabled', false);
                MuestraOculta("empresa", true);
                array.push("slcEmpresa");
            } else {

                $('#uniform-chkemp span').removeClass();
                $('#chkemp').attr('checked', false);
                MuestraOculta("empresa", false);
                $('#chkscsl').attr('disabled', true);
                array.splice(array.indexOf("slcEmpresa"), 1);
                $("#slcEmpresa").parent().parent().attr("class", "control-group")

                //oculto sucursal tbn
                $('#uniform-chkscsl span').removeClass();
                $('#chkscsl').attr('checked', false);
                MuestraOculta("sucursal", false);
                array.splice(array.indexOf("slcSucural"), 1);
                $("#slcSucural").parent().parent().attr("class", "control-group")
            }
        });

        $('#chkscsl').on('click', function () {
            if ($("#chkscsl").is(':checked')) {

                $('#uniform-chkscsl span').removeClass().addClass("checked");
                $('#chkscsl').attr('checked', true);
                MuestraOculta("sucursal", true);
                array.push("slcSucural");
            } else {

                $('#uniform-chkscsl span').removeClass();
                $('#chkscsl').attr('checked', false);
                MuestraOculta("sucursal", false);
                array.splice(array.indexOf("slcSucural"), 1);
                $("#slcSucural").parent().parent().attr("class", "control-group")

            }
        });

        $('#chkgast').on('click', function () {
            if ($("#chkgast").is(':checked')) {

                $('#uniform-chkgast span').removeClass().addClass("checked");
                $('#chkgast').attr('checked', true);
                $('#chkSgast').attr('disabled', false);
                MuestraOculta("gasto", true);
                array.push("cbo_gasto");
            } else {

                $('#uniform-chkgast span').removeClass();
                $('#chkgast').attr('checked', false);
                $('#chkSgast').attr('disabled', true);
                MuestraOculta("gasto", false);
                array.splice(array.indexOf("cbo_gasto"), 1);
                $("#cbo_gasto").parent().parent().attr("class", "control-group")

                //oculto sub gasto tbn
                $('#uniform-chkSgast span').removeClass();
                $('#chkSgast').attr('checked', false);
                MuestraOculta("subgasto", false);
                array.splice(array.indexOf("cbo_subgasto"), 1);
                $("#cbo_subgasto").parent().parent().attr("class", "control-group");
            }
        });

        $('#chkSgast').on('click', function () {
            if ($("#chkSgast").is(':checked')) {

                $('#uniform-chkSgast span').removeClass().addClass("checked");
                $('#chkSgast').attr('checked', true);
                MuestraOculta("subgasto", true);
                array.push("cbo_subgasto");
            } else {

                $('#uniform-chkSgast span').removeClass();
                $('#chkSgast').attr('checked', false);
                MuestraOculta("subgasto", false);
                array.splice(array.indexOf("cbo_subgasto"), 1);
                $("#cbo_subgasto").parent().parent().attr("class", "control-group");
            }
        });

        $('#chkestado').on('click', function () {
            if ($("#chkestado").is(':checked')) {

                $('#uniform-chkestado span').removeClass().addClass("checked");
                $('#chkestado').attr('checked', true);
                MuestraOculta("estado", true);
                array.push("cbo_estado");
            } else {

                $('#uniform-chkestado span').removeClass();
                $('#chkestado').attr('checked', false);
                MuestraOculta("estado", false);
                array.splice(array.indexOf("cbo_estado"), 1);
                $("#cbo_estado").parent().parent().attr("class", "control-group");
            }
        });



        $('#chkprovision').on('click', function () {
            if ($("#chkprovision").is(':checked')) {            
                $('#uniform-chkprovision span').removeClass().addClass("checked");
                $('#chkprovision').attr('checked', true);
                MuestraOculta("provision", true);
                $("#cbo_tipo_provision").select2("val", "PRO").change();
            } else {
                $('#uniform-chkprovision span').removeClass();
                $('#chkprovision').attr('checked', false);
                MuestraOculta("provision", false);
                $("#cbo_tipo_provision").select2("val", "NPRO").change();
                $("#cbo_tipo_provision").parent().parent().attr("class", "control-group");
            }
        });





        $('#chkfec').on('click', function () {
            if ($("#chkfec").is(':checked')) {

                $('#uniform-chkfec span').removeClass().addClass("checked");
                $('#chkfec').attr('checked', true);
                MuestraOculta("fecha", true);
                array.push("txt_fec_ini");
                array.push("txt_fec_fin");
            } else {

                $('#uniform-chkfec span').removeClass();
                $('#chkfec').attr('checked', false);
                MuestraOculta("fecha", false);
                array.splice(array.indexOf("txt_fec_ini"), 1);
                array.splice(array.indexOf("txt_fec_fin"), 1);
                $("#txt_fec_ini").parent().parent().attr("class", "control-group");
                $("#txt_fec_fin").parent().parent().attr("class", "control-group");
            }
        });

        $('#chkfec_emision').on('click', function () {
            if ($("#chkfec_emision").is(':checked')) {

                $('#uniform-chkfec_emision span').removeClass().addClass("checked");
                $('#chkfec_emision').attr('checked', true);
                MuestraOculta("fecha_emi", true);
                array.push("txt_fec_ini_emi");
                array.push("txt_fec_fin_emi");
            } else {

                $('#uniform-chkfec_emision span').removeClass();
                $('#chkfec_emision').attr('checked', false);
                MuestraOculta("fecha_emi", false);
                array.splice(array.indexOf("txt_fec_ini_emi"), 1);
                array.splice(array.indexOf("txt_fec_fin_emi"), 1);
                $("#txt_fec_ini_emi").parent().parent().attr("class", "control-group");
                $("#txt_fec_fin_emi").parent().parent().attr("class", "control-group");
            }
        });

        $('#chkCentroCostos').on('click', function () {
            if ($("#chkCentroCostos").is(':checked')) {
                $('#uniform-chkCentroCostos span').removeClass().addClass("checked");
                $('#chkCentroCostos').attr('checked', true);
                MuestraOculta("divCentroCostos", true);
                array.push("chkCentroCostos");
            } else {
                $('#uniform-chkCentroCostos span').removeClass();
                $('#chkCentroCostos').attr('checked', false);
                MuestraOculta("divCentroCostos", false);
                array.splice(array.indexOf("chkCentroCostos"), 1);
            }
        });

        $('#btn_filtrar').on('click', function () {

            if ($("#chk_avanzada").is(':checked')) {
                if (vErrors(array)) {
                    if ($("#cbo_tipo_provision").val() == "PRO") {
                        ListaGastosProgramados();
                    } else if ($("#cbo_tipo_provision").val() == "NPRO") {
                        fnListarGastosNoProg();
                    }
                }
            } else {
                fnListarGastosNoProg();
            }

            //if ($("#cbo_tipo_provision").val() == "PRO") {
            //    if ($("#chk_avanzada").is(':checked')) {
            //        if (vErrors(array)) {
            //            ListaGastosProgramados();
            //        }
            //    }
            //    else {
            //        ListaGastosProgramados();
            //    }
            //}

            //if ($("#cbo_tipo_provision").val() == "NPRO") {
            //    if ($("#chk_avanzada").is(':checked')) {
            //        if (vErrors(array)) {
            //            ListaGastos();
            //        }
            //    } else {
            //        ListaGastos();
            //    }
            //}            
        });

        $('#chk_avanzada').on('click', function () {
            if ($("#chk_avanzada").is(':checked')) {
                $("#busq_avanz").slideDown();
                $('#uniform-chk_avanzada span').removeClass().addClass("checked");
                $('#chk_avanzada').attr('checked', true);
            } else {
                $('#uniform-chk_avanzada span').removeClass();
                $('#chk_avanzada').attr('checked', false);
                $("#busq_avanz").slideUp();
                reset();
            }
        });

        $('#rb_todos').on('click', function () {
            if ($("#rb_todos").is(':checked')) {

                $("#busq_avanz").slideUp();
                reset();
            }
        });

        $('#rbprogramados').on('click', function () {
            if ($("#rbprogramados").is(':checked')) {

                $("#busq_avanz").slideUp();
                reset();
            }
        });

        $("#txt_fec_fin_emi").datepicker({
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

        $("#txt_fec_ini_emi").val(fNueva);

    }

    //LISTAR DATA
    var fnListarGastosNoProg = function () {

        let p_CTLG_CODE = "";
        let p_SCSL_CODE = "";
        let p_FECHA_INI_EMI = "";
        let p_FECHA_FIN_EMI = "";
        
        
        p_CTLG_CODE = $("#slcEmpresa").val();
        p_SCSL_CODE = ($("#slcSucural").val() == "TODOS") ? '' : $("#slcSucural").val(); //$("#slcSucural").val();

        p_FECHA_INI_EMI = $("#txt_fec_ini_emi").val();
        p_FECHA_FIN_EMI = $("#txt_fec_fin_emi").val();

       

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMASCO.ashx?OPCION=LASIENTOS" +
            "&p_CTLG_CODE=" + p_CTLG_CODE +
            "&p_SCSL_CODE=" + p_SCSL_CODE +
            "&p_FECHA_INI_EMI=" + p_FECHA_INI_EMI +
            "&p_FECHA_FIN_EMI=" + p_FECHA_FIN_EMI ,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTableGST.fnClearTable();
                if (datos.length === 0) {
                    return;
                }
                oTableGST.fnAddData(datos);                
            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    };

    var ListaGastosProgramados = function () {

        let p_CTLG_CODE = "";
        let p_SCSL_CODE = "";
        let p_FECHA_INI_EMI = "";
        let p_FECHA_FIN_EMI = "";
        let p_COMPRAS_IND = "";
        let p_CONC_CODE = "";
        let p_SCONC_CODE = "";
        let p_ESTADO_IND = "";
        let p_FECHA_INI = "";
        let p_FECHA_FIN = "";
        let p_CENTRO_COSTOS = "";

        if (!$("#chk_avanzada").is(':checked')) {
            return;
        }

        p_CTLG_CODE = $("#slcEmpresa").val();
        p_SCSL_CODE = $("#slcSucural").val();
        p_FECHA_INI_EMI = $("#txt_fec_ini_emi").val();
        p_FECHA_FIN_EMI = $("#txt_fec_fin_emi").val();
        p_COMPRAS_IND = $("#cbo_tipo_egreso").val();

        if ($("#chkgast").is(':checked')) {
            p_CONC_CODE = $("#cbo_gasto").val();
        }

        if ($("#chkSgast").is(':checked')) {
            p_SCONC_CODE = $("#cbo_subgasto").val();
        }

        if ($("#chkestado").is(':checked')) {
            p_ESTADO_IND = $("#cbo_estado").val();
        }

        if ($("#chkfec").is(':checked')) {
            p_FECHA_INI = $("#txt_fec_ini").val();
            p_FECHA_FIN = $("#txt_fec_fin").val();
        }
        if ($("#chkCentroCostos").is(':checked')) {
            p_CENTRO_COSTOS = $("#txt_centro_costo").data("CodCentroCosto");
        }

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGAS.ashx?OPCION=LGASTOS_PROG" +
            "&p_CTLG_CODE=" + p_CTLG_CODE +
            "&p_SCSL_CODE=" + p_SCSL_CODE +
            "&p_FECHA_INI_EMI=" + p_FECHA_INI_EMI +
            "&p_FECHA_FIN_EMI=" + p_FECHA_FIN_EMI +
            "&p_COMPRAS_IND=" + p_COMPRAS_IND +
            "&p_CONC_CODE=" + p_CONC_CODE +
            "&p_SCONC_CODE=" + p_SCONC_CODE +
            "&p_ESTADO_IND=" + p_ESTADO_IND +
            "&p_FECHA_FIN=" + p_FECHA_FIN +
            "&p_FECHA_INI=" + p_FECHA_INI +
            "&p_CENTRO_COSTOS=" + p_CENTRO_COSTOS,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTableGST.fnClearTable();
                if (datos.length === 0) {
                    return;
                }
                oTableGST.fnAddData(datos);
            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");

    };
    //

    var MuestraOculta = function (v_ID, bool) {

        if (bool) {
            $("#" + v_ID).attr("style", "display:block")
        }
        else {
            $("#" + v_ID).attr("style", "display:none")
        }


    }

    return {
        init: function () {


            plugin();
            eventos();
            fillCboEmpresa();
            ListarSucursales();
            fillCbo_Periodo();
            fillBandeja();

            
            $('#uniform-chkemp span').removeClass();
            $('#chkemp').attr('checked', false);
            $('#uniform-chkscsl span').removeClass();
            $('#chkscsl').attr('checked', false);
            $('#chkscsl').attr('disabled', true);
            $('#uniform-chkgast span').removeClass();
            $('#chkgast').attr('checked', false);
            $('#uniform-chkSgast span').removeClass();
            $('#chkSgast').attr('checked', false);
            $('#chkSgast').attr('disabled', true);
            $('#uniform-chkestado span').removeClass();
            $('#chkestado').attr('checked', false);
            $('#uniform-chkfec span').removeClass();
            $('#chkfec').attr('checked', false);
            $('#uniform-chkfec_emision span').removeClass();
            $('#chkfec_emision').attr('checked', false);
            $('#uniform-chk_avanzada span').removeClass();
            $('#chk_avanzada').attr('checked', false);
            $("#cbo_tipo_provision").select2("val", "NPRO");
            $("#cbo_tipo_egreso").select2("val", "T");
            $("#cbo_periodo").select2("val", "T");
            $('#uniform-chkprovision span').removeClass();
            $('#chkprovision').attr('checked', false);            

            $('#btn_filtrar').click();
        }
    };

}();

var arrayProveedores;
var rucSeleccionado = "";
var CTMASCO = function () {

    var oCentroCostoCab = [];
    var aoNiveles = [];    
    var sCodPlanContable = "";

    var fnCargarParametros = function (psPlanCostos) {
        aoNiveles = CargarNivelesCentroCostos(psPlanCostos);
        sCodPlanContable = mGetParametro("PCGE", "CODIGO PLAN CONTABLE EMPRESA");
    };
    var CargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        return vNiveles;
    };

    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
        $('#cbo_gasto').select2();
        $('#cbo_subgasto').select2();
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        $('#txt_serie').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 4, "greedy": false }); });
        $('#txt_dcto_ref').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 12, "greedy": false }); });
        $("#cbo_mes").select2();
        $("#cbo_semana").select2();
        $('#cbo_moneda').select2();
        $('#cbo_documento').select2();
        $('#cboRegistroInterno').select2();
        $('#cbo_periodo').select2();
        $("#txt_fec_reg").datepicker("setDate", "now")
        $("#cbx_destino").select2();
        $('#cbx_opcion').select2();
        $('#cboMes').select2();
        $('#cboTipoAsiento').select2();
        $('#cboDeclarado').select2();
        $('#cboOperacionAsiento').select2();
        $('#cboTipoDoc').select2();
        $('#cboOportunidad').select2();
        $('#cboOperacion').select2();
    }

    var CargarTabla = function () {
        var parms = {
            data: null,         
            order: [[0, "desc"]],
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    //{ "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            "scrollX": true,
            columns: [
               {
                    data: "CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "DES_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "CENTRO_COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DEBE_MN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                    }                
                }, {
                    data: "HABER_MN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                    }
                }, {
                    data: "DEBE_ME",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                    }
                },{
                    data: "HABER_ME",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                    }
                },{
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td)
                            .html("<a class='btn red btnEliminarDetalle' onclick=\"deleteDetalle('" + rowData.ITEM + "')\"><i class='icon-remove'></i></a>")
                            .attr("align", "center");
                    }
                }
            ]           
        }

        oTable = iniciaTabla('tblDocumento', parms);       
    }


    var fillCboTipoDoc = function () {
        Bloquear("divCboTipoDoc");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOID",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboTipoDoc");
                $('#cboTipoDoc').empty();
                $('#cboTipoDoc').append('<option></option>');
                var codigo = "";
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoDoc').append('<option value="' + datos[i].CODIGO + '" data-sunat="' + datos[i].CODIGO_SUNAT + '">' + datos[i].DESC_CORTA + '</option>');
                    }
                    //codigo = datos[0].CODIGO;
                }
                //$('#cboTipoDoc').select2('val', codigo);
                //$('#cboTipoDoc').change();
            },
            error: function (msg) {
                Desbloquear("divCboTipoDoc");
                alertCustom("Documentos de Identidad no se listaron correctamente.");
            }
        });
    }

    var fillCboDcto_Emite = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=10&p_CTLG_CODE=" + $('#slcEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_documento').empty();
                $('#cbo_documento').append('<option></option>');

                $('#cboRegistroInterno').empty();
                $('#cboRegistroInterno').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_documento').append('<option value="' + datos[i].DCTO_CODE + '" compras="' + datos[i].COMPRAS + '" doc_interno="' + datos[i].DOC_INTERNO + '">' + datos[i].DCTO_DESC_CORTA + '</option>');
                        $('#cboRegistroInterno').append('<option value="' + datos[i].DCTO_CODE + '">' + datos[i].DCTO_DESC_CORTA + '</option>');
                    }
                    $('#cbo_documento').select2("val", "");
                    $('#cboRegistroInterno').select2("val", "0100");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCbo_Gasto = function () {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=PADRES&p_ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_gasto').empty();
                $('#cbo_gasto').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_gasto').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCbo_Moneda = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=3&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_moneda').empty();
                $('#cbo_moneda').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_moneda').append('<option  simbolo="' + datos[i].SIMBOLO + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_moneda').select2("val", datos[0].CODIGO);
                } else {
                    alertCustom("Error cargar moneda");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCbo_Movimiento = function () {
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMASCO.ashx?OPCION=LISTAD_MOV&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboOperacion').empty();
                $('#cboOperacion').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboOperacion').append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }
                   // $('#cboOperacion').select2("val", datos[0].CODIGO);
                } else {
                    alertCustom("Error cargar moneda");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCbo_Periodo = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                    }
                    $('#cbo_periodo').select2("val", "");

                } else {
                    alertCustom("Error cargar periodo");
                }
            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
            }
        });
    };

    var fillCbo_semana = function () {
        var array = [{ CODIGO: '1', DESCRIPCION: 'LUNES' },
        { CODIGO: '2', DESCRIPCION: 'MARTES' },
        { CODIGO: '3', DESCRIPCION: 'MIERCOLES' },
        { CODIGO: '4', DESCRIPCION: 'JUEVES' },
        { CODIGO: '5', DESCRIPCION: 'VIERNES' },
        { CODIGO: '6', DESCRIPCION: 'SABADO' },
        { CODIGO: '7', DESCRIPCION: 'DOMINGO' },
        ];
                
        $('#cbo_semana').empty();
        $('#cbo_semana').append('<option></option>');
        if (array != null) {

            for (var i = 0; i < array.length; i++) {

                $('#cbo_semana').append('<option value="' + array[i].CODIGO + '">' + array[i].DESCRIPCION + '</option>');
            }
        }
    };

    var fillCbo_mes = function () {
        var array = [{ CODIGO: '1', DESCRIPCION: '1' },
        { CODIGO: '2', DESCRIPCION: '2' },
        { CODIGO: '3', DESCRIPCION: '3' },
        { CODIGO: '4', DESCRIPCION: '4' },
        { CODIGO: '5', DESCRIPCION: '5' },
        { CODIGO: '6', DESCRIPCION: '6' },
        { CODIGO: '7', DESCRIPCION: '7' },
        { CODIGO: '8', DESCRIPCION: '8' },
        { CODIGO: '9', DESCRIPCION: '9' },
        { CODIGO: '10', DESCRIPCION: '10' },
        { CODIGO: '11', DESCRIPCION: '11' },
        { CODIGO: '12', DESCRIPCION: '12' },
        { CODIGO: '13', DESCRIPCION: '13' },
        { CODIGO: '14', DESCRIPCION: '14' },
        { CODIGO: '15', DESCRIPCION: '15' },
        { CODIGO: '16', DESCRIPCION: '16' },
        { CODIGO: '17', DESCRIPCION: '17' },
        { CODIGO: '18', DESCRIPCION: '18' },
        { CODIGO: '19', DESCRIPCION: '19' },
        { CODIGO: '20', DESCRIPCION: '20' },
        { CODIGO: '21', DESCRIPCION: '21' },
        { CODIGO: '22', DESCRIPCION: '22' },
        { CODIGO: '23', DESCRIPCION: '23' },
        { CODIGO: '24', DESCRIPCION: '24' },
        { CODIGO: '25', DESCRIPCION: '25' },
        { CODIGO: '26', DESCRIPCION: '26' },
        { CODIGO: '27', DESCRIPCION: '27' },
        { CODIGO: '28', DESCRIPCION: '28' },
        { CODIGO: '29', DESCRIPCION: '29' },
        { CODIGO: '30', DESCRIPCION: '30' },
        { CODIGO: '31', DESCRIPCION: '31' },
        ];
                
        $('#cbo_mes').empty();
        $('#cbo_mes').append('<option></option>');
        if (array != null) {
            for (var i = 0; i < array.length; i++) {
                $('#cbo_mes').append('<option value="' + array[i].CODIGO + '">' + array[i].DESCRIPCION + '</option>');
            }
        }
    };
    
    var permiso_aprobar = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=ROL&p_USUA_ID=" + $("#ctl00_txtus").val(),
            async: false,
            success: function (datos) {
                $("#hf_permiso").val(datos);
            },
            error: function (msg) {
                alertCustom("No se obtuvo correctamente el indicador de permiso");
            }
        });
    };

    var MuestraPeriodo = function (valor) {
        $("#div_per_tri").attr("style", "display:" + valor);
    };

    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val()).change();
                        $("#slcSucural").change();
                    } else {
                        $("#slcSucural").select2("val", "").change();
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var ListarSubGasto = function (depend_code) {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_ESTADO_IND=A&p_CODE=" + depend_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_subgasto').empty();
                $('#cbo_subgasto').append('<option></option>');
                if (datos != null) {
                    $("#error").slideUp();
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_subgasto').append('<option cta_des="' + datos[i].CONTABLE_DESC + '" cta="' + datos[i].CONTABLE + '" tipo-bien="' + datos[i].TIPO_BIEN + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_subgasto').select2("val", "");
                }
                else {
                    $('#cbo_subgasto').select2("val", "");
                    $("#error").slideDown();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var ListarGasto = function (code) {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=3&p_TIPO=3&p_ESTADO_IND=A&p_CTLG_CODE=" + code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_gasto').empty();
                $('#cbo_gasto').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_gasto').append('<option  value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_gasto').select2("val", "");
                }
                else {
                    $('#cbo_gasto').select2("val", "");
                }
                $('#cbo_subgasto').empty();
                $('#cbo_subgasto').append('<option></option>');
                $('#cbo_subgasto').select2("val", "");
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    

    function filltxtBeneficiario(v_ID, v_value) {
        $("#divTxtClientes").html('<input id="txt_beneficiario" class="span12" type="text" placeholder="PERSONA" style="text-transform: uppercase" />');
        var selectRazonSocial = $(v_ID);
        $("#hfpidm").val("");
        if (asincrono == true) {
            Bloquear("divFilaCliente");
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=2&CTLG_CODE=" + $("#slcEmpresa").val(),
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (asincrono == true) {
                    Desbloquear("divFilaCliente");
                }
                if (datos !== null) {
                    textclientes = selectRazonSocial.typeahead({
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};
                            let oObjet = new Array();
                            console.log(v_value);
                            for (var i = 0; i < datos.length; i++) {

                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                var obj = {};
                                obj.TIPO_DOCUMENTO = datos[i].TIPO_DOCUMENTO;
                                obj.NRO_DOCUMENTO = datos[i].NRO_DOCUMENTO;
                                obj.CODIGO_TIPO_DOCUMENTO = datos[i].CODIGO_TIPO_DOCUMENTO;
                                obj.RUC = datos[i].RUC;
                                obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                                obj.DIRECCION = datos[i].DIRECCION;
                                obj.CODIGO_CATEGORIA = datos[i].CODIGO_CATEGORIA;
                                obj.PIDM = datos[i].PIDM;
                                obj.DIAS = datos[i].DIAS;
                                obj.ID = datos[i].ID;
                                obj.AGENTE_RETEN_IND = datos[i].AGENTE_RETEN_IND;
                                obj.PPBIDEN_CONDICION_SUNAT = datos[i].PPBIDEN_CONDICION_SUNAT;
                                obj.PPBIDEN_ESTADO_SUNAT = datos[i].PPBIDEN_ESTADO_SUNAT;

                                if (v_value == obj.PIDM) {
                                    jsonPredeterminado = obj;
                                }
                                oObjet.push(obj);


                            }
                            jsonClientes = oObjet;
                            $.each(oObjet, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);
                            if (jsonPredeterminado.PIDM == v_value && !aux_predeterminado) {
                                var auxArrayRazonSocial = [];
                                auxArrayRazonSocial.push(jsonPredeterminado.RAZON_SOCIAL);
                                $("#txt_beneficiario").val(jsonPredeterminado.RAZON_SOCIAL);
                                $("#lblHabido").html("");
                                $("#lblEstado").html("");

                                $('#cboDocumentoVenta').removeAttr("disabled");
                                $("#hfpidm").val(jsonPredeterminado.PIDM);

                                $("#hfAgenteRetencionCliente").val(jsonPredeterminado.AGENTE_RETEN_IND);
                                $("#hfCodigoCategoriaCliente").val(jsonPredeterminado.CODIGO_CATEGORIA);
                                $("#hfCodigoTipoDocumento").val(jsonPredeterminado.CODIGO_TIPO_DOCUMENTO);
                                $("#hfTipoDocumento").val(jsonPredeterminado.TIPO_DOCUMENTO);
                                $("#hfNroDocumento").val(jsonPredeterminado.NRO_DOCUMENTO);
                                $("#hfRUC").val(jsonPredeterminado.RUC);
                                $("#hfDIR").val(jsonPredeterminado.DIRECCION);

                                if (jsonPredeterminado.PPBIDEN_CONDICION_SUNAT != "") {
                                    $("#lblHabido").html("CONDICIÓN: " + "<b>" + jsonPredeterminado.PPBIDEN_CONDICION_SUNAT + "</b>");
                                }
                                if (jsonPredeterminado.PPBIDEN_ESTADO_SUNAT != "") {
                                    $("#lblEstado").html("ESTADO: " + "<b>" + jsonPredeterminado.PPBIDEN_ESTADO_SUNAT + "</b>");
                                }

                                if (jsonPredeterminado.RUC != "") {
                                    $('#cboTipoDoc').select2("val", "6").change();
                                    $("#txtNroDctoCliente").val(jsonPredeterminado.RUC);
                                    $("#btnHabido").show();

                                } else {
                                    $('#cboTipoDoc').select2("val", jsonPredeterminado.CODIGO_TIPO_DOCUMENTO).change();
                                    $("#txtNroDctoCliente").val(jsonPredeterminado.NRO_DOCUMENTO);
                                    if (jsonPredeterminado.CODIGO_TIPO_DOCUMENTO === "6") {
                                        $("#hfRUC").val(jsonPredeterminado.NRO_DOCUMENTO);
                                    }
                                    $("#btnHabido").hide();
                                }

                                if ($('#cboTipoDoc').val() == '6') {
                                    $("#cbo_documento option:not([value=0001])").attr("disabled", "disabled");
                                    $("#cbo_documento option[value=0012]").removeAttr("disabled");
                                    $("#cbo_documento option[value=0001]").removeAttr("disabled");

                                    var oItems = $('#cbo_documento option');
                                    for (var i = 0; i < oItems.length; i++) {
                                        if (oItems[i].value === "0012") {
                                            $("#cbo_documento").select2("val", "0012").change();
                                        } else {
                                            $("#cbo_documento").select2("val", "0001").change();
                                        }

                                    }

                                } else {
                                    $("#cbo_documento option:not([value=0001])").removeAttr("disabled");
                                    $("#cbo_documento option[value=0001]").attr("disabled", "disabled");

                                    var oItems = $('#cbo_documento option');
                                    for (var i = 0; i < oItems.length; i++) {
                                        if (oItems[i].value === "0012") {
                                            $("#cbo_documento").select2("val", "0012").change();
                                        } else {
                                            $("#cbo_documento").select2("val", "0003").change();
                                        }

                                    }
                                }
                                if (jsonPredeterminado.AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                                    $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                                }

                                if (jsonPredeterminado.DIAS > 0) {
                                    $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                                }
                                else {
                                    $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
                                }

                  
                                if ($("#cbo_documento").val() == "" && $("#txtNroDocVenta").val() == "") {
                                    $("#cbo_documento").select2("val", "0012").change();
                                }
                                process(auxArrayRazonSocial);
                                aux_predeterminado = true;
                                }
                            },
                            updater: function (item) {
                                    $("#lblHabido").html("");
                                    $("#lblEstado").html("");

                                    $('#cbo_documento').removeAttr("disabled");
                                    $("#hfpidm").val(map[item].PIDM);

                                    $("#hfAgenteRetencionCliente").val(map[item].AGENTE_RETEN_IND);
                                    $("#hfCodigoCategoriaCliente").val(map[item].CODIGO_CATEGORIA);
                                    $("#hfCodigoTipoDocumento").val(map[item].CODIGO_TIPO_DOCUMENTO);
                                    $("#hfTipoDocumento").val(map[item].TIPO_DOCUMENTO);
                                    $("#hfNroDocumento").val(map[item].NRO_DOCUMENTO);
                                    $("#hfRUC").val(map[item].RUC);
                                    $("#hfDIR").val(map[item].DIRECCION);

                                    if (map[item].PPBIDEN_CONDICION_SUNAT != "") {
                                        $("#lblHabido").html("CONDICIÓN: " + "<b>" + map[item].PPBIDEN_CONDICION_SUNAT + "</b>");
                                    }
                                    if (map[item].PPBIDEN_ESTADO_SUNAT != "") {
                                        $("#lblEstado").html("ESTADO: " + "<b>" + map[item].PPBIDEN_ESTADO_SUNAT + "</b>");
                                    }

                                    if (map[item].RUC != "") {
                                        $('#cboTipoDoc').select2("val", "6").change();
                                        $("#txtNroDctoCliente").val(map[item].RUC);
                                        $("#btnHabido").show();

                                    } else {
                                        $('#cboTipoDoc').select2("val", map[item].CODIGO_TIPO_DOCUMENTO).change();
                                        $("#txtNroDctoCliente").val(map[item].NRO_DOCUMENTO);
                                        if (map[item].CODIGO_TIPO_DOCUMENTO === "6") {
                                            $("#hfRUC").val(map[item].NRO_DOCUMENTO);
                                        }
                                        $("#btnHabido").hide();
                                    }

                                    if ($('#cboTipoDoc').val() == '6') {
                                        $("#cbo_documento option:not([value=0001])").attr("disabled", "disabled");
                                        $("#cbo_documento option[value=0012]").removeAttr("disabled");
                                        $("#cbo_documento option[value=0001]").removeAttr("disabled");

                                        var oItems = $('#cbo_documento option');
                                        for (var i = 0; i < oItems.length; i++) {
                                            if (oItems[i].value === "0012") {
                                                $("#cbo_documento").select2("val", "0012").change();
                                            } else {
                                                $("#cbo_documento").select2("val", "0001").change();
                                            }

                                        }

                                    } else {
                                        $("#cbo_documento option:not([value=0001])").removeAttr("disabled");
                                        $("#cbo_documento option[value=0001]").attr("disabled", "disabled");

                                        var oItems = $('#cbo_documento option');
                                        for (var i = 0; i < oItems.length; i++) {
                                            if (oItems[i].value === "0012") {
                                                $("#cbo_documento").select2("val", "0012").change();
                                            } else {
                                                $("#cbo_documento").select2("val", "0003").change();
                                            }

                                        }
                                    }
                                    $("#cbo_modo_pago").select2('val', '0000');
                                    $("#cbo_modo_pago").change();
                                    //
                                    $('#chk_retencion').prop('disabled', true);
                                    $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                                    $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                                    //Evalua si se aplica retencion
                                    if (map[item].AGENTE_RETEN_IND == 'S' && $("#cbo_Empresa :selected").attr("agente-reten-ind") == "N") {//CAMBIO_RETENCION
                                        $('#chk_retencion').prop('checked', true).parent().addClass('checked');
                                        //$('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');
                                    }

                                    if (map[item].DIAS > 0) {
                                        $($("#cbo_modo_pago option[value='0002']")[0]).removeAttr("disabled");
                                    }
                                    else {
                                        $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
                                    }

                                

                                    //CARGA POR DEFECTO                       
                                    if ($("#cbo_documento").val() == "" && $("#txtNroDocVenta").val() == "") {
                                        $("#cbo_documento").select2("val", "0012").change();
                                    }



                                    return item;
                                },
                        });
                       selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txt_beneficiario").val().length <= 0) {
                            $("#lblHabido").html("");
                            $("#lblEstado").html("");
                            $($("#cbo_modo_pago option[value='0002']")[0]).attr("disabled", "disabled");
                            $('#chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
                            $('#chk_retencion').parent().removeClass('checked');
                            $('#cbo_modo_pago option:first-child').prop('selected', true);
                            $('#cbo_modo_pago').change();
                            $('#txt_plazo_pago').val('0');
                            if ($("#txt_fec_emision").val() != "") {
                                $('#txt_fec_vencimiento').val($("#txt_fec_emision").val());
                            } else {
                                $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                            }
                            if ($("#txtNroDctoCliente").val() != "" && $("#txt_beneficiario").val() != "") {
                                $('#cboTipoDoc').val('1').change();
                            }
                            //$('#cboTipoDoc').prop('disabled', true);
                            $("#txtNroDctoCliente, #txt_id_proveedor, #txt_Retencion").val("");

                            //Limpiar valores   
                            $("#txtResponsablePago").val("").attr("disabled", "disabled");
                            $("#chkResponsablePago").prop("checked", false).parent().removeClass('checked');

                            $('#cbo_documento').attr("disabled", "disabled");
                            $('#cbo_documento').select2("val", "");

                            $('#cboSerieDocVenta').attr("disabled", "disabled");
                            $('#cboSerieDocVenta').empty().append('<option></option>').select2("val", "");
                            $("#txtNroDocVenta").val("");

                            $("#hfpidm").val('');
                            $("#hfAgenteRetencionCliente").val('');
                            $("#hfCodigoCategoriaCliente").val('');
                            $("#hfCodigoTipoDocumento").val('');
                            $("#hfTipoDocumento").val('');
                            $("#hfNroDocumento").val('');
                            $("#hfRUC").val('');
                            $("#hfDIR").val('');
                            $("#hfCreditoDispMoba").val("0");
                            $("#lblTipoCorrelativo").html("");

                            $("#cbo_direccion").empty().html("<option></option>")
                            $("#cbo_direccion").select2("val", "")
                            $("#cbo_direccion").attr("disabled", false);
                            carga_ini_ind = false;
                        }
                    });
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar consultar proveedores.');
                Desbloquear("ventana");
            }
        });


        //selectBeneficiario.keyup(function () {
        //    $(this).siblings("ul").css("min-width", $(this).css("width"));
        //    if ($("#txt_beneficiario").val().length <= 0) {
        //        $("#hfpidm").val("");
        //        $("#lblHabido").html("");
        //        $("#lblEstado").html("");
        //        $("#lblRucSeleccionado").html("");
        //        //  selectBeneficiario.removeAttr("style", "border-color: forestgreen; background-color: beige");
        //    }
        //});
    };
    
    var eventoControles = function () {

        //$('#cboTipoDoc').change(function () {
        //    $("#txtNroDctoCliente").focus();
        //    //var valor = $(this).val();
        //    switch (valor) {
        //        case "1": //DNI                            
        //            var numDoc = $("#txtNroDctoCliente").val().substring(0, 1);
        //            if (numDoc == 2) {
        //                $("#lblHabido").html("");
        //                $("#lblEstado").html("");
        //                $('#cboDocumentoVenta').val("").change();
        //                $("#hfpidm").val("");
        //                $("#hfAgenteRetencionCliente").val("");
        //                $("#hfCodigoCategoriaCliente").val("");
        //                $("#hfCodigoTipoDocumento").val("");
        //                $("#hfTipoDocumento").val("");
        //                $("#hfNroDocumento").val("");
        //                $("#hfRUC").val("");
        //                $("#hfDIR").val("");
        //                $("#txtNroDctoCliente").val("");
        //                $("#txt_beneficiario").val("");
        //                $('#cbo_direccion').val("").change();

        //            } else {
        //                $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        //            }

        //            break;
        //        case "6": //RUC
        //            $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 11, "greedy": false });

        //            break;
        //        case "4": //CARNE EXTRANJ.
        //            $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        //            break;
        //        case "7": //PASAPORTE
        //            $("#txtNroDctoCliente").inputmask({ "mask": "#", "repeat": 9, "greedy": false });
        //            break;
        //        case "11"://PARTIDA
        //            $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        //            break;
        //    }

        //    var tipo = $(this).val();
        //    if (tipo === '6') {
        //        $('#txtNroDctoCliente').val($("#hfRUC").val());
        //    } else {
        //        if ($("#hfCodigoTipoDocumento").val() == tipo) {
        //            $('#txtNroDctoCliente').val($("#hfNroDocumento").val());
        //        } else {
        //            $('#txtNroDctoCliente').val("");
        //        }
        //    }

        //    if ($('#cboTipoDoc').val() == '6') {
        //        $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
        //        $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
        //        $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

        //        var oItems = $('#cboDocumentoVenta option');
        //        for (var i = 0; i < oItems.length; i++) {
        //            if (oItems[i].value === "0012") {
        //                $("#cboDocumentoVenta").select2("val", "0012").change();
        //            } else {
        //                $("#cboDocumentoVenta").select2("val", "0001").change();
        //            }

        //        }

        //    } else {
        //        $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
        //        $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

        //        var oItems = $('#cboDocumentoVenta option');
        //        for (var i = 0; i < oItems.length; i++) {
        //            if (oItems[i].value === "0012") {
        //                $("#cboDocumentoVenta").select2("val", "0012").change();
        //            } else {
        //                $("#cboDocumentoVenta").select2("val", "0003").change();
        //            }

        //        }
        //    }
        //});

        $('#btn_refresh').on('click', function () {
            Bloquear("ventana")
            setTimeout(function () {
                $("#input").empty();
                $("#input").html('<input id="txt_beneficiario" class="limpiar span12" type="text" >');
                filltxtBeneficiario('#txt_beneficiario', '');
            }, 1000);
        });

        $("#linkModalCuentas").on("click", function () {
            if (!vErrors(["txtCuenta"]))
                return;
            fnCargarModalCuentas();
            $("#divModal").modal("show");
        });

        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana")
                setTimeout(function () {

                    ListarSucursales($('#slcEmpresa').val())
                    ListarGasto($('#slcEmpresa').val());
                    $("#input").empty();
                    $("#input").html('<input id="txt_beneficiario" class="limpiar span12" type="text" >');
                    filltxtBeneficiario('#txt_beneficiario', '');
                    fnlimpiaCentroCostos();
                    fillCbo_Periodo();
                    emp_ant = $(this).val();

                }, 1000);

            } else { emp_ant = ""; }
        });

        $("#slcSucural").on("change", function () {
            var cod = ObtenerQueryString("codigo");
            if (cod == undefined) {
                if ($("#slcSucural").val() != "") {
                    if ($("#slcSucural option:selected").attr("data-exonerado") == "SI") {
                        $("#cbx_destino").select2("val", "ORGNGR");//ORIGEN NO GRAVADO
                    } else {
                        $("#cbx_destino").select2("val", "DSTGRA");//DESTINO GRAVADO
                    }
                }
            }
        });

        $("#cboOperacionAsiento").on("change", function () {
            let cd_opera = $("#cboOperacionAsiento").val();

            if (cd_opera == "A") {
                $("#cboOperacion").select2("val", "0011");
            } else if (cd_opera == "C"){
                $("#cboOperacion").select2("val", "0010");
            } else {
                $("#cboOperacion").select2("val", " ");
            }

        });
        
        var gasto_ant = "";
        $('#cbo_gasto').on('change', function () {
            if (gasto_ant != $(this).val()) {
                ListarSubGasto($('#cbo_gasto').val())
                gasto_ant = $(this).val();
            } else { gasto_ant = ""; }
            $("#txtcuenta").val('');
        });
        
        $("#add_detalle").on("click", function () {

            if (vErrors(['txtCuenta', 'txtCuentaDescrip', 'txt_centro_costo', 'cbx_destino', 'txtSubTotal', 'txt_TCambio'])) {
                let sCuenta = $("#txtCuenta").val();
                let sDescripcionCuenta = $("#txtCuentaDescrip").val();
                
                let p_CENTRO_COSTO_CABECERA = $("#txt_centro_costo").data("CodCentroCostoCab");
                let p_CENTRO_COSTO = $("#txt_centro_costo").data("CodCentroCosto");
                let sCentroCosto = $("#txt_centro_costo").val();

                let codDestino = $("#cbx_destino").val();
                let descDestino = $("#cbx_destino option:selected").text();

                let sSubTotal = $("#txtSubTotal").val();
                let valorCambio = $("#txt_TCambio").val();
                let moneda = $("#cbo_moneda").val();

                
                if (codDestino == 'D') {
                   dTotal += parseFloat(sSubTotal);
                } else {
                   dTotalH += parseFloat(sSubTotal);
                }
               
                
                var item = detallesCuentas.length + 1;
                objProd.ITEM = item;
                objProd.CUENTA = sCuenta;
                objProd.DES_CUENTA = sDescripcionCuenta;
                objProd.CC_CAB = p_CENTRO_COSTO_CABECERA;
                objProd.CC_COSTO = p_CENTRO_COSTO;
                objProd.CENTRO_COSTO = sCentroCosto;

                objProd.COD_DESTINO = codDestino;
                objProd.DES_DESTINO = descDestino;
                
                objProd.MONTO = sSubTotal;
                objProd.SUB_MONTO = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + sSubTotal;

                if (moneda == '0002') {
                    if (codDestino == 'D') {
                        objProd.DEBE_MN = parseFloat(sSubTotal).toFixed(2);
                        objProd.DEBE_ME = parseFloat(parseFloat(sSubTotal) / parseFloat(valorCambio)).toFixed(2);
                        objProd.HABER_MN = parseFloat('0.00').toFixed(2);
                        objProd.HABER_ME = parseFloat('0.00').toFixed(2);
                    } else {
                        objProd.DEBE_MN = parseFloat('0.00').toFixed(2);
                        objProd.DEBE_ME = parseFloat('0.00').toFixed(2);
                        objProd.HABER_MN = parseFloat(sSubTotal).toFixed(2);
                        objProd.HABER_ME = parseFloat(parseFloat(sSubTotal) / parseFloat(valorCambio)).toFixed(2);
                    }
                } else {
                    if (codDestino == 'D') {
                        objProd.DEBE_MN = parseFloat(parseFloat(sSubTotal) * parseFloat(valorCambio)).toFixed(2); 
                        objProd.DEBE_ME = parseFloat(sSubTotal).toFixed(2);
                        objProd.HABER_MN = parseFloat('0.00').toFixed(2);
                        objProd.HABER_ME = parseFloat('0.00').toFixed(2);
                    } else {
                        objProd.DEBE_MN = parseFloat('0.00').toFixed(2);
                        objProd.DEBE_ME = parseFloat('0.00').toFixed(2);
                        objProd.HABER_MN = parseFloat(parseFloat(sSubTotal) * parseFloat(valorCambio)).toFixed(2); 
                        objProd.HABER_ME = parseFloat(sSubTotal).toFixed(2);
                    }
                }
                

                objAux = jQuery.parseJSON(JSON.stringify(objProd));
                detallesCuentas.push(objAux);

                console.log(detallesCuentas);

                oTable.fnClearTable();
                oTable.fnAddData(detallesCuentas);
                oTable.fnAdjustColumnSizing();
                
                $("#txtCuenta").val("");
                $("#txtCuentaDescrip").val("");

                $("#txt_centro_costo").data("CodCentroCostoCab", "");
                $("#txt_centro_costo").data("CodCentroCosto", "");
                $("#txtcuenta").val("");
                $("#txtSubTotal").val("");
                $("#txt_centro_costo").val('');
                $("#cbx_destino").select2("val", "");

                $("#txt_monto").val(dTotal.toFixed(2));
                $("#txt_monto2").val(dTotalH.toFixed(2));
                
                if (dTotal.toFixed(2) == dTotalH.toFixed(2)) {
                    $("#msg_balanceo").html("<b>BALANCEADO</b>");
                    $("#msg_balanceo").attr("style", "font-family: monospace; color:green;");
                    $("#hfBalanceo").val("B");
                    $("#guardar").attr("style", "display:inline");
                    //return true;
                } else {
                    $("#msg_balanceo").html("<b>NO BALANCEADO</b>");
                    $("#msg_balanceo").attr("style", "font-family: monospace; color:red;");
                    $("#hfBalanceo").val("NB");
                    $("#guardar").attr("style", "display:none");
                    //return false;
                }
                $("#txt_TCambio").attr('disabled', true);
                $("#cbo_moneda").attr('disabled', true);

            }                        
        });
                

        $('#rbtipo_fijo').on('click', function () {
            if ($("#rbtipo_fijo").is(':checked')) {
                $('#div_monto').slideDown();
                $('#div_monto2').slideDown();
                $('#div_moneda').slideDown();
            }
        });

        var moneda_ant = "";
        $('#cbo_moneda').on('change', function () {
            if (moneda_ant != $(this).val()) {

                //var text = "Monto (" + $("#cbo_moneda :selected").attr("simbolo") + ")"
                //$('#lbl_monto').text(text);
                $('#simbMoneda').text($("#cbo_moneda :selected").attr("simbolo"));
                $('#simbMoneda2').text($("#cbo_moneda :selected").attr("simbolo"));

                moneda_ant = $(this).val();
            } else { moneda_ant = ""; }
        });

        $('#rbtipo_variable').on('click', function () {
            if ($("#rbtipo_variable").is(':checked')) {
                $('#div_monto').slideDown();
                $('#div_monto2').slideDown();
                $('#div_moneda').slideDown();
                $("#txt_monto").val("");
                $("#txt_monto").focus();
                $("#rbProgramado").attr("checked", "checked");
                $("#rbProgramado").click();
                MuestraPeriodo("none");
            }
        });

        $('#rbUnico').on('click', function () {
            if ($("#rbUnico").is(':checked')) {
                $("#txt_fec_unica").datepicker("setDate", "now");
                MuestraPeriodo("none");
                $('#div_fec_unica_0').slideDown();
                $('#div_fec_unica_1').slideDown();
                $('#div_frecuencia_0').slideUp();
                $('#div_frecuencia_1').slideUp();
                $('#div_frecuencia_2').slideUp();
                $('#div_frecuencia_3').slideUp();

                $("#cbo_documento").val("").change();

                $('.div_documentos').slideDown();
                $('#cbo_mes').select2("val", "");
                $('#cbo_semana').select2("val", "");
                $("#cbo_mes").parent().parent().attr("class", "control-group")
                $("#cbo_semana").parent().parent().attr("class", "control-group")

                $("#div_per_tri").html("<div class='span4'><div class='control-group'><label class='control-label' for='txtCodigo'>Periodo Tributario</label></div></div>" +
                    " <div class=span6 ><div class='control-group'><div class='controls'><select  id='cbo_periodo' class='b limpiar span12 m-wrap' placeholder='Selecciona Periodo'><option></option><option value='11-2015'>NOVIEMBRE - 2015</option></select></div></div></div>")
                $("#cbo_periodo").select2();

                $("#rbtipo_fijo").attr("checked", "checked");
                $("#rbtipo_fijo").click();


            }

        });
        

        $("#cbo_frecuencia").change(function () {

            var valor = $(this).val();

            if (valor == "S") {
                $('#div_cbo_semanal').attr("style", "display:block");
                $('#div_cbo_mensual').attr("style", "display:none");
                $('#cbo_mes').select2("val", "");
            } else if (valor == "M") {
                $('#div_cbo_semanal').attr("style", "display:none");
                $('#div_cbo_mensual').attr("style", "display:block");
                $('#cbo_semana').select2("val", "");
            } else if (valor == "D") {
                $('#div_cbo_semanal').attr("style", "display:none");
                $('#div_cbo_mensual').attr("style", "display:none");
                $('#cbo_mes').select2("val", "");
                $('#cbo_semana').select2("val", "");
            }
        });

        $('#txt_monto').on('blur', function () {

            if ($("#txt_monto").val() == "") {
                $("#txt_monto").val($("#hfmonto").val());
            }
            $("#txt_monto").val(formatoMiles($("#txt_monto").val()));
        });

        $('#txt_monto').on('focus', function () {
            $("#txt_monto").val("");
        });
        
        $("#cbo_documento").change(function () {
            console.log(rucSeleccionado);
            $("#txt_serie").val("");
            $("#txt_dcto_ref").val("");
            //$("#txt_serie").focus();     

            var comprobante = $('#cbo_documento option:selected').attr('compras');
            var doc_interno = $('#cbo_documento option:selected').attr('doc_interno');

            if (doc_interno == 'N') {
                $('#chkDeducible').prop('checked', true).parent().addClass('checked');
            } else {                
                $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
            }
            
        });
        
        $("#btnHabido").on("click", function () {
            if (vErrors(["txt_beneficiario"])) {
                $("#modal-habido").modal("show");
                MuestraSunat();
            }
        });

        $("#btnActualizarDS").on("click", function () {
            if (vErrors(["txt_beneficiario"])) {

                var pidm = $("#hfpidm").val();
                var condSunat = $("#spanVerificando").text();
                var estadoSunat = $("#lblEstadoSunat").text();
                fnActualizarDatosContribuyente(pidm, condSunat, estadoSunat);
            }
        });

   
    };   

    var fnCargarModalCuentas = function () {
        Bloquear("ventana");

        var sCuenta = $("#txtCuenta").val();
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=7&sCodPlanContable=" + sCodPlanContable + "&sCuenta=" + sCuenta + "&sEstado=A&sCuentaAsiento=S",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                var oCuentas = JSON.parse(datos);
                $("#tituloModal").html("LISTA DE CUENTAS");
                if (isEmpty(oCuentas)) {
                    Desbloquear("ventana");
                    $("#divModalContenido").html("<div class='span12'><div class='alert alert-block alert-info fade in'><h4 class='alert-heading'>Info!</h4><p>No se encontrarón Datos.</b></p></div></div>");
                    return;
                }

                var sTabla = "";
                sTabla += ("<table id='tablaModal' class='display DTTT_selectable bordered' border='0' >");
                sTabla += ("<thead>");
                sTabla += ("<tr align='center'>");
                sTabla += ("<th>Cuenta</th>");
                sTabla += ("<th>Descripcion</th>");
                sTabla += ("</tr>");
                sTabla += ("</thead>");

                sTabla = sTabla + ("<tbody>");
                $.each(oCuentas, function (key, value) {
                    sTabla += ("<tr>");
                    sTabla += ("<td>" + value.cCuenta + "</td>");
                    sTabla += ("<td>" + value.cDescripcion + "</td>");
                    sTabla += ("</tr>");
                });
                sTabla += ("</tbody>");
                sTabla += ("</table>");

                $("#divModalContenido").html(sTabla);
                $("#divModalPie").html("Reg(s): " + oCuentas.length);

                Desbloquear("ventana");

                var oTablaModal = $("#tablaModal").dataTable({
                    scrollY: '50vh',
                    scrollCollapse: true,
                    paging: false,
                    ordering: false,
                    info: false
                });

                $("#tablaModal tbody tr").on("click", function () {
                    if ($(this).hasClass("selected"))
                        $(this).removeClass("selected");
                    else {
                        oTablaModal.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    }

                    $("#divModal").modal("hide");
                    var sCuenta = $(this).find("td").eq(0).html();
                    var sDescripcion = $(this).find("td").eq(1).html();

                    $("#txtCuenta").val(sCuenta);
                    $("#txtCuentaDescrip").val(sDescripcion);
                });
            },
            error: function (msg) {
                alertCustom("Error al obtener Lista de Cuentas.");
                Desbloquear("ventana");
            }
        });
    };

    var cargaInicial = function () {

        $('#uniform-rbUnico span').removeClass().addClass("checked");
        $('#rbUnico').attr('checked', true);
        $('#rbUnico').click().click();
        $('#uniform-rbtipo_fijo span').removeClass().addClass("checked");
        $('#rbtipo_fijo').attr('checked', true);
        $("#rbtipo_fijo").click().click()

        $('#chk_compras').click().click()
        $('#chk_compras').prop('checked', true).parent().addClass('checked');

        $('#chk_sindcto').click().click()
        $('#chk_sindcto').prop('checked', true).parent().addClass('checked');
        $('#simbMoneda').text($("#cbo_moneda :selected").attr("simbolo"));
        $('#simbMoneda2').text($("#cbo_moneda :selected").attr("simbolo"));
        $("#txt_usua").val($("#ctl00_txtus").val())
        $("#guardar").attr("style", "display:none");

        var CODE = ObtenerQueryString("codigo");
        var CTLG = $('#ctl00_hddctlg').val();

        if (typeof (CODE) !== "undefined") {

            $("#btn_aprobar").remove();
            Bloquear("ventana")

            var data = new FormData();
            data.append('OPCION', '4');
            data.append('p_CODE', CODE);
            data.append('CTLG', CTLG);

            var cod = CODE.substring(0, 1);
            

            if (cod == "PRO") {//----------------GASTO PROGRAMADO---------          
                Bloquear("ventana");
                $.ajax({
                    type: "post",
                    url: "vistas/CP/ajax/CPMPGAS.ashx?OPCION=5&p_CODE=" + CODE,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        if (datos != "" && datos != null) {
                            
                        }
                        else {
                            noexitoCustom("Error carga inicial gasto programado");
                        }
                        Desbloquear("ventana");
                    },
                    error: function (msg) {
                        noexitoCustom("No se listó correctamente.")
                        Desbloquear("ventana");
                    },
                    complete: function (msg) {
                        Desbloquear("ventana");
                    }
                });
            }
            else if (cod == "N") {//-----------GASTO UNICO--------------
                Bloquear("ventana");
                $.ajax({
                    url: "vistas/CT/ajax/CTMASCO.ashx?",
                    type: 'POST',
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    async: false,
                    success: function (datos) {

                        console.log(datos);
                        if (datos != null) {


                            $('#slcEmpresa').select2("val", datos[0].CTLG_CODE);
                            $('#slcSucural').select2("val", datos[0].SCSL_CODE);
                            $('#cbo_moneda').select2("val", datos[0].MONE_CODE).change();
                            $('#txtanio').val(datos[0].ANIO);
                            $('#cboMes').select2("val", datos[0].VAL_MES).change();
                            $('#txt_Descripcion').val(datos[0].GLOSA);
                            $('#cboOperacionAsiento').select2("val", datos[0].COD_OPERACION_ASIENTO).change();
                            $('#cboTipoAsiento').select2("val", datos[0].TIPO_ASIENTO).change();
                            $('#txt_TCambio').val(datos[0].VALOR_CAMBIO);
                            $('#cboTipoDoc').select2("val", datos[0].COD_DOCUMENTO).change();
                            $('#txtNroDctoCliente').val(datos[0].NRO_DOCUMENTO);
                            $('#txt_beneficiario').val(datos[0].NOMBRES);
                            $("#txt_beneficiario").keyup().siblings("ul").children("li").click();
                            $('#hfpidm').val(datos[0].PIDM_BENE);
                            $('#cboOperacion').select2("val", datos[0].COD_MOVIMIENTO).change();
                            $('#cboOportunidad').select2("val", datos[0].OPORTUNIDAD).change();
                            $('#cboDeclarado').select2("val", datos[0].COD_DECLARADO).change();

                            $("#txt_fec_unica").datepicker("remove")
                            $("#txt_fec_unica").datepicker("update")
                            $("#txt_fec_unica").datepicker("setDate", datos[0].FECHA_UNICA)

                            $("#txt_fec_reg").datepicker("remove")
                            $("#txt_fec_reg").datepicker("update")
                            $("#txt_fec_reg").datepicker("setDate", datos[0].FECHA_REGISTRO)

                            if (datos[0].TIPO_DCTO != "") {
                                $("#cbo_documento").val(datos[0].TIPO_DCTO).change();
                                $("#txt_serie").val(datos[0].SERIE_DOC);
                                $("#txt_dcto_ref").val(datos[0].NUMERO_DOC);
                                
                            } else {

                            }

                            $("#txt_beneficiario").attr('disabled', true);
                            $("#slcEmpresa").attr('disabled', true);
                            $("#slcSucural").attr('disabled', true);
                            $("#cbo_moneda").attr('disabled', true);
                            $("#txt_TCambio").attr('disabled', true);
                            //----------------------------
                            $("#guardar").html("<i class='icon-pencil'></i> Modificar");
                            $("#guardar").attr("href", "javascript:Modificar();");
                            //$("#guardar").attr("style", "display:none"); 
                            listarDetallesAsiento(CODE);
                            
                        }
                        else { noexito(); }
                    },
                    error: function (msg) {
                        noexitoCustom("No se listó correctamente.")
                        Desbloquear("ventana");
                    },
                    complete: function (msg) {
                        Desbloquear("ventana");
                    }
                });
            }
        }
        else {
            filltxtBeneficiario('#txt_beneficiario', '');
        }

        //$("#btnAceptarConfirmacion").click(registrarAprobacion);
    }


    return {
        init: function () {
            var CODE = ObtenerQueryString("codigo");
            fnCargarParametros();
            plugins();
            cargarParametrosSistema();
            eventoControles();
            CargarTabla();
            //fnCargarLibrosContables();
            fillCboTipoDoc();
            fillCbo_semana();
            fillCbo_mes();
            fillCboEmpresa();
            fillCbo_Gasto();
            fillCbo_Moneda();
            fillCbo_Movimiento();
            fillCboDcto_Emite();
            ListarSucursales($('#slcEmpresa').val());
            ListarGasto($('#slcEmpresa').val());
            permiso_aprobar();
            cargaInicial();
        }
    };

}();

function cargarParametrosSistema() {
    
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
        if (arrDecimal.length <= 4) {
            return out;
        }
        //Si es mayor al valor del parámetro entonces corta la cadena longitud de la cadena - 1, para que quite el último digito ingresado.
        return out.substring(0, out.length - 1);
    }

    return out;
} 

var deleteDetalle = function (item) {
    var detallesNuevo = [];
    for (var i = 0; i < detallesCuentas.length; i++) {
        if (detallesCuentas[i].ITEM == item) {
            if (detallesCuentas[i].COD_DESTINO == 'D') {
                dTotal = (dTotal).toFixed(2) - parseFloat(detallesCuentas[i].MONTO);
                detallesCuentas.splice(i, 1);
                $("#txt_monto").val((dTotal).toFixed(2));
            } else {
                dTotalH = (dTotalH).toFixed(2) - parseFloat(detallesCuentas[i].MONTO);
                detallesCuentas.splice(i, 1);
                $("#txt_monto2").val((dTotalH).toFixed(2));
            }  
            if ((dTotal).toFixed(2) == (dTotalH).toFixed(2)) {
                $("#msg_balanceo").html("<b>BALANCEADO</b>");
                $("#msg_balanceo").attr("style", "font-family: monospace; color:green;");
                $("#hfBalanceo").val("B");
                $("#guardar").removeAttr("style", "display:none");
                //return true;
            } else {
                $("#msg_balanceo").html("<b>NO BALANCEADO</b>");
                $("#msg_balanceo").attr("style", "font-family: monospace; color:red;");
                $("#hfBalanceo").val("NB");
                $("#guardar").attr("style", "display:none");
                //return false;
            }
        }

    }
    // PARA ACTUALIZAR LA TABLA DE DETALLE
    for (var i = 0; i < detallesCuentas.length; i++) {
        detallesCuentas[i].ITEM = i + 1;
        detallesNuevo.push(detallesCuentas[i]);
    }

    detallesCuentas.splice(0, detallesCuentas.length);
    detallesCuentas = detallesNuevo;
    var datos = obtenerDetalle(); //BRINDA LA TABLA ACTUALIZADA
    

    if (detallesCuentas.length > 0) {
        oTable.fnClearTable();
        oTable.fnAddData(detallesCuentas);
        oTable.fnAdjustColumnSizing();
    } else {
        $("#txt_TCambio").attr('disabled', false);
        $("#cbo_moneda").attr('disabled', false);
        oTable.fnClearTable();
        $("#guardar").attr("style", "display:line");
    }

}


var listarDetallesAsiento = function (CODE) {

    var data = new FormData();
    data.append('OPCION', 'DETASIENTO');
    data.append('p_CODE', CODE);


    $.ajax({
        url: "vistas/CT/ajax/CTMASCO.ashx?",
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            
            if (datos != null) {    
                for (var i = 0; i < datos.length; i++){
                    dTotal += datos[i].DEBE;
                    dTotalH += datos[i].HABER;
                    var item = i + 1;
                    objProd.ITEM = item;
                    objProd.CUENTA = datos[i].CUENTA;
                    objProd.DES_CUENTA = datos[i].DES_CUENTA;
                    objProd.CC_CAB = datos[i].CC_CAB;
                    objProd.CC_COSTO = datos[i].CC_COSTO;
                    objProd.CENTRO_COSTO = datos[i].CENTRO_COSTO;
                    objProd.COD_DESTINO = datos[i].COD_DESTINO;
                    objProd.DES_DESTINO = datos[i].DES_DESTINO;
                    objProd.DEBE_MN = datos[i].DEBE_MN;
                    objProd.HABER_MN = datos[i].HABER_MN;
                    objProd.DEBE_ME = datos[i].DEBE_ME;
                    objProd.HABER_ME = datos[i].HABER_ME;
                    objProd.MONTO = (datos[i].DEBE == "0.00" ? datos[i].HABER : datos[i].DEBE);

                    objAux = jQuery.parseJSON(JSON.stringify(objProd));
                    detallesCuentas.push(objAux);
                }

                console.log(detallesCuentas);
                oTable.fnClearTable();
                oTable.fnAddData(detallesCuentas);
                oTable.fnAdjustColumnSizing();

                $("#txt_monto").val((dTotal).toFixed(2));
                $("#txt_monto2").val((dTotalH).toFixed(2));

                if (dTotal.toFixed(2) == dTotalH.toFixed(2)) {
                    $("#msg_balanceo").html("<b>BALANCEADO</b>");
                    $("#msg_balanceo").attr("style", "font-family: monospace; color:green;");
                    $("#hfBalanceo").val("B");
                    $("#guardar").removeAttr("style", "display:none");
                } else {
                    $("#msg_balanceo").html("<b>NO BALANCEADO</b>");
                    $("#msg_balanceo").attr("style", "font-family: monospace; color:red;");
                    $("#hfBalanceo").val("NB");
                    $("#guardar").attr("style", "display:none");
                }
            }
            else { noexito(); }
        },
        error: function (msg) {
            noexitoCustom("No se listó correctamente.")
            Desbloquear("ventana");
        },
        complete: function (msg) {
            Desbloquear("ventana");
        }
    });

}


function BloquearCamposCabecera() {
    $("#slcEmpresa").attr('disabled', true);
    $("#slcSucural").attr('disabled', true);
    $("#cbo_moneda").attr('disabled', true);
    $("#txt_TCambio").attr('disabled', true);
    $("#txtanio").attr('disabled', true);
    $("#cboMes").attr('disabled', true);
    $("#txt_Descripcion").attr('disabled', true);
    $("#cboTipoAsiento").attr('disabled', true);
    $("#cboDeclarado").attr('disabled', true);
    $("#cboOperacionAsiento").attr('disabled', true);
    $("#txt_beneficiario").attr('disabled', true);
    $("#cboOperacion").attr('disabled', true);
    $("#cbo_documento").attr('disabled', true);
    $("#txt_serie").attr('disabled', true);
    $("#txt_dcto_ref").attr('disabled', true);
    $("#cboOportunidad").attr('disabled', true);
}

function BloquearCamposDetalle() {
    $("#txtCuenta").attr('disabled', true);
    $("#cbx_destino").attr('disabled', true);
    $("#txtSubTotal").attr('disabled', true);
    $("#add_detalle").attr("style", "display:none");
    $("#btnBuscarCentroCto").attr("style", "display:none");
    $("#linkModalCuentas").attr("style", "display:none");
    $("#tblDocumento").attr('disabled', true);
}

function Guardar() {
   
    var p_CTLG_CODE = '';
    var p_SCSL_CODE = '';
    var p_COD_MONEDA = '';
    var p_VALOR_CAMBIO = '';
    var p_ANIO = '';
    var p_MES = '';
    var p_DESCRIPCION = '';
    var p_TIPO_ASIENTO = '';
    var p_DECLARADO = "";
    var p_OPERACION_ASIENTO = "";
    var p_CUO = "";
    var p_NRO_MOV = "";
    var p_USUARIO = "";
    var p_COD_DOC_CLIENTE = "";
    var p_DESC_DOC_CLIENTE = "";
    var p_NRO_DOC_CLIENTE = "";
    var p_CLIENTE = "";
    var p_COD_DOCUMENTO = "";
    var p_DESC_DOCUMENTO = "";
    var p_COD_SERIE = "";
    var p_COD_NUMERO = "";
    var p_FECHA_EMISION = "";
    var p_FECHA_TRANSACCION = "";
    var p_OPORTUNIDAD_ANOTACION = "";
    var p_DETALLE_ASIENTO = "";
    var p_PIDM = "";
    var p_OPERACION = "";

    p_DETALLE_ASIENTO = obtenerDetalle();

    p_CTLG_CODE = $("#slcEmpresa").val();
    p_SCSL_CODE = $("#slcSucural").val();
    p_COD_MONEDA = $("#cbo_moneda").val();
    p_VALOR_CAMBIO = $("#txt_TCambio").val();
    p_ANIO = $("#txtanio").val();
    p_MES = $("#cboMes").val();
    p_DESCRIPCION = $("#txt_Descripcion").val();
    p_TIPO_ASIENTO = $("#cboTipoAsiento").val();
    p_DECLARADO = $("#cboDeclarado").val();
    p_OPERACION_ASIENTO = $("#cboOperacionAsiento").val();
    p_CUO = "";
    p_NRO_MOV = "";
    p_USUARIO = $.trim($('#ctl00_txtus').val());
    p_COD_DOC_CLIENTE = $("#cboTipoDoc").val();
    p_DESC_DOC_CLIENTE = $("#cboTipoDoc option:selected").text();
    p_NRO_DOC_CLIENTE = $("#txtNroDctoCliente").val();
    p_CLIENTE = $("#txt_beneficiario").val();
    p_COD_DOCUMENTO = $("#cbo_documento").val();
    p_DESC_DOCUMENTO = $("#cbo_documento option:selected").text();
    p_COD_SERIE = $("#txt_serie").val();
    p_COD_NUMERO = $.trim($("#txt_dcto_ref").val());
    p_FECHA_EMISION = $.trim($('#txt_fec_unica').val());
    p_FECHA_TRANSACCION = $("#txt_fec_reg").val();
    p_OPORTUNIDAD_ANOTACION = $("#cboOportunidad").val();
    p_PIDM = $.trim($("#hfpidm").val());
    p_OPERACION = $("#cboOperacion").val();

    var data = new FormData();
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_SCSL_CODE", p_SCSL_CODE);
    data.append("p_COD_MONEDA", p_COD_MONEDA);
    data.append("p_VALOR_CAMBIO", p_VALOR_CAMBIO);
    data.append("p_ANIO", p_ANIO);
    data.append("p_MES", p_MES);
    data.append("p_DESCRIPCION", p_DESCRIPCION);
    data.append("p_TIPO_ASIENTO", p_TIPO_ASIENTO);
    data.append("p_DECLARADO", p_DECLARADO);
    data.append("p_OPERACION_ASIENTO", p_OPERACION_ASIENTO);
    data.append("p_CUO", p_CUO);
    data.append("p_NRO_MOV", p_NRO_MOV);
    data.append("p_USUARIO", p_USUARIO);
    data.append("p_COD_DOC_CLIENTE", p_COD_DOC_CLIENTE);
    data.append("p_DESC_DOC_CLIENTE", p_DESC_DOC_CLIENTE);
    data.append("p_NRO_DOC_CLIENTE", p_NRO_DOC_CLIENTE);
    data.append("p_CLIENTE", p_CLIENTE);
    data.append("p_COD_DOCUMENTO", p_COD_DOCUMENTO);
    data.append("p_DESC_DOCUMENTO", p_DESC_DOCUMENTO);
    data.append("p_COD_SERIE", p_COD_SERIE);
    data.append("p_COD_NUMERO", p_COD_NUMERO);
    data.append("p_FECHA_EMISION", p_FECHA_EMISION);
    data.append("p_FECHA_TRANSACCION", p_FECHA_TRANSACCION);
    data.append("p_OPORTUNIDAD_ANOTACION", p_OPORTUNIDAD_ANOTACION);
    data.append("p_PIDM", p_PIDM);
    data.append("p_OPERACION", p_OPERACION);

    data.append("p_DETALLE_ASIENTO", p_DETALLE_ASIENTO);

    
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMASCO.ashx?OPCION=GRABAR_ASIENTO",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
                .success(function (data) {
                    Desbloquear("ventana");
                    if (data != null) {
                        //$("#txt_Cuo").val(data);
                        //$("#txt_NroMov").val(data);
                        
                        //var cod = $("#txtCodigo").val().substring(0, 3);

                        //$("#guardar").html("<i class='icon-pencil'></i> Modificar");
                        //$("#guardar").attr("href", "javascript:Modificar();");
                        
                        //$(".btnEliminarDetalle").attr("style", "display:none");
                        //BloquearCamposDetalle();

                        exito();
                    }
                })
                .error(function () {
                    //$("#guardar").html("<i class='icon-pencil'></i> Modificar");
                    //$("#guardar").attr("href", "javascript:Modificar();");

                    $("#guardar").attr("style", "display:none");
                    $(".btnEliminarDetalle").attr("style", "display:none");
                    $("#cancelar").attr("style", "display:none");
                    BloquearCamposCabecera();
                    BloquearCamposDetalle();
                    exito();
                    Desbloquear("ventana");
                });
}

let VerificaFechaPeriodo = function() {
    var continuar = false;
    var mesEmision = $("#txt_fec_unica").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
    var anioEmision = $("#txt_fec_unica").val().split("/")[2];
    var mesPeriodo = $("#cbo_periodo").val().split("-")[0];//$("#cbo_periodo").val() :: "1-2016"
    var anioPeriodo = $("#cbo_periodo").val().split("-")[1];
    if (parseInt(anioEmision) == parseInt(anioPeriodo)) {
        if (parseInt(mesEmision) <= parseInt(mesPeriodo)) {
            continuar = true;
        }
    } else if (parseInt(anioEmision) < parseInt(anioPeriodo)) {
        continuar = true;
    }

    return continuar;
}

function ReplaceTotal(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//MODIFICAR GASTO  UNICO
var Modificar = function () {
    var CODE = ObtenerQueryString("codigo");

    var p_CTLG_CODE = '';
    var p_SCSL_CODE = '';
    var p_COD_MONEDA = '';
    var p_VALOR_CAMBIO = '';
    var p_ANIO = '';
    var p_MES = '';
    var p_DESCRIPCION = '';
    var p_TIPO_ASIENTO = '';
    var p_DECLARADO = "";
    var p_OPERACION_ASIENTO = "";
    var p_CUO = "";
    var p_NRO_MOV = "";
    var p_USUARIO = "";
    var p_COD_DOC_CLIENTE = "";
    var p_DESC_DOC_CLIENTE = "";
    var p_NRO_DOC_CLIENTE = "";
    var p_CLIENTE = "";
    var p_COD_DOCUMENTO = "";
    var p_DESC_DOCUMENTO = "";
    var p_COD_SERIE = "";
    var p_COD_NUMERO = "";
    var p_FECHA_EMISION = "";
    var p_FECHA_TRANSACCION = "";
    var p_OPORTUNIDAD_ANOTACION = "";
    var p_DETALLE_ASIENTO = "";
    var p_PIDM = "";
    var p_OPERACION = "";

    p_DETALLE_ASIENTO = obtenerDetalle();

    p_CTLG_CODE = $("#slcEmpresa").val();
    p_SCSL_CODE = $("#slcSucural").val();
    p_COD_MONEDA = $("#cbo_moneda").val();
    p_VALOR_CAMBIO = $("#txt_TCambio").val();
    p_ANIO = $("#txtanio").val();
    p_MES = $("#cboMes").val();
    p_DESCRIPCION = $("#txt_Descripcion").val();
    p_TIPO_ASIENTO = $("#cboTipoAsiento").val();
    p_DECLARADO = $("#cboDeclarado").val();
    p_OPERACION_ASIENTO = $("#cboOperacionAsiento").val();
    p_CUO = "";
    p_NRO_MOV = "";
    p_USUARIO = $.trim($('#ctl00_txtus').val());
    p_COD_DOC_CLIENTE = $("#cboTipoDoc").val();
    p_DESC_DOC_CLIENTE = $("#cboTipoDoc option:selected").text();
    p_NRO_DOC_CLIENTE = $("#txtNroDctoCliente").val();
    p_CLIENTE = $("#txt_beneficiario").val();
    p_COD_DOCUMENTO = $("#cbo_documento").val();
    p_DESC_DOCUMENTO = $("#cbo_documento option:selected").text();
    p_COD_SERIE = $("#txt_serie").val();
    p_COD_NUMERO = $.trim($("#txt_dcto_ref").val());
    p_FECHA_EMISION = $.trim($('#txt_fec_unica').val());
    p_FECHA_TRANSACCION = $("#txt_fec_reg").val();
    p_OPORTUNIDAD_ANOTACION = $("#cboOportunidad").val();
    p_PIDM = $.trim($("#hfpidm").val());
    p_OPERACION = $("#cboOperacion").val();

    var data = new FormData();
    //data.append("OPCION", "ACTUALIZAR_ASIENTO");
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_SCSL_CODE", p_SCSL_CODE);
    data.append("p_COD_MONEDA", p_COD_MONEDA);
    data.append("p_VALOR_CAMBIO", p_VALOR_CAMBIO);
    data.append("p_ANIO", p_ANIO);
    data.append("p_MES", p_MES);
    data.append("p_DESCRIPCION", p_DESCRIPCION);
    data.append("p_TIPO_ASIENTO", p_TIPO_ASIENTO);
    data.append("p_DECLARADO", p_DECLARADO);
    data.append("p_OPERACION_ASIENTO", p_OPERACION_ASIENTO);
    data.append("p_CUO", p_CUO);
    data.append("p_NRO_MOV", p_NRO_MOV);
    data.append("p_USUARIO", p_USUARIO);
    data.append("p_COD_DOC_CLIENTE", p_COD_DOC_CLIENTE);
    data.append("p_DESC_DOC_CLIENTE", p_DESC_DOC_CLIENTE);
    data.append("p_NRO_DOC_CLIENTE", p_NRO_DOC_CLIENTE);
    data.append("p_CLIENTE", p_CLIENTE);
    data.append("p_COD_DOCUMENTO", p_COD_DOCUMENTO);
    data.append("p_DESC_DOCUMENTO", p_DESC_DOCUMENTO);
    data.append("p_COD_SERIE", p_COD_SERIE);
    data.append("p_COD_NUMERO", p_COD_NUMERO);
    data.append("p_FECHA_EMISION", p_FECHA_EMISION);
    data.append("p_FECHA_TRANSACCION", p_FECHA_TRANSACCION);
    data.append("p_OPORTUNIDAD_ANOTACION", p_OPORTUNIDAD_ANOTACION);
    data.append("p_PIDM", p_PIDM);
    data.append("p_OPERACION", p_OPERACION);
    data.append("p_CODE", CODE);

    data.append("p_DETALLE_ASIENTO", p_DETALLE_ASIENTO);
    
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CT/ajax/CTMASCO.ashx?OPCION=UPDATE_ASIENTO",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
        .success(function (data) {
            Desbloquear("ventana");
            if (data != null) {
                //$("#txt_Cuo").val(data);
                //$("#txt_NroMov").val(data);

                //var cod = $("#txtCodigo").val().substring(0, 3);

                //$("#guardar").html("<i class='icon-pencil'></i> Modificar");
                //$("#guardar").attr("href", "javascript:Modificar();");

                //$(".btnEliminarDetalle").attr("style", "display:none");
                //BloquearCamposDetalle();

                exito();
            }
        })
        .error(function () {
            //$("#guardar").html("<i class='icon-pencil'></i> Modificar");
            //$("#guardar").attr("href", "javascript:Modificar();");

            $("#guardar").attr("style", "display:none");
            $(".btnEliminarDetalle").attr("style", "display:none");
            $("#cancelar").attr("style", "display:none");
            BloquearCamposCabecera();
            BloquearCamposDetalle();
            exito();
            Desbloquear("ventana");
        });
};


var obtenerDetalle = function () {
    var detalles = "";
    for (var i = 0; i < detallesCuentas.length; i++) {
        detalles +=
            detallesCuentas[i].ITEM + ";" +  
            detallesCuentas[i].CUENTA + ";" +           
            detallesCuentas[i].DES_CUENTA + ";" +
            detallesCuentas[i].CC_CAB + ";" +
            detallesCuentas[i].CC_COSTO + ";" +         
            detallesCuentas[i].CENTRO_COSTO + ";" +  
            detallesCuentas[i].COD_DESTINO + ";" +            
            detallesCuentas[i].DES_DESTINO + ";" +
            detallesCuentas[i].DEBE_MN + ";" +
            detallesCuentas[i].DEBE_ME + ";" +   
            detallesCuentas[i].HABER_MN + ";" +   
            detallesCuentas[i].HABER_ME + 
            "|";
    }
    return detalles;
}


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


var fnGetGasto = function (sCodGasto) {
    let aoDocGasto = [];

    Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/CP/ajax/CPMAGAS.ashx?OPCION=GET_GASTO&p_CODE_REF_GASTO=" + sCodGasto,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana");
            aoDocGasto = datos;
        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("No se encontró el documento de venta.");
        }
    });
    Desbloquear("ventana");

    return aoDocGasto;
};

function BuscarClientexDocumento() {
    if (vErrors(['cboTipoDoc'])) {
        Bloquear("divFilaCliente");

        var doid = $("#cboTipoDoc").val();
        var nro = $("#txtNroDctoCliente").val();

        var esCliente = false;
        $("#txt_beneficiario").val(" ").keyup();
        $("#txt_beneficiario").val("").keyup();

        if (jsonClientes != null && jsonClientes.length > 0) {

            for (var i = 0; i < jsonClientes.length; i++) {
                if (parseInt(jsonClientes[i].CODIGO_TIPO_DOCUMENTO) == parseInt(doid) && parseInt(jsonClientes[i].NRO_DOCUMENTO) == parseInt(nro) || (jsonClientes[i].RUC == parseInt(nro) && parseInt(doid) == 6)) {
                    esCliente = true;
                    $("#txt_beneficiario").val($.trim(jsonClientes[i].RAZON_SOCIAL));
                    $("#txt_beneficiario").keyup().siblings("ul").children("li").click();
                    break;
                }
            }
            if (!esCliente) {
                infoCustom2("La Persona no está registrada como Cliente");
                NuevoClienteRapido(doid, nro);
                //Datos buscados permanecen
                $("#cboTipoDoc").val(doid).change();
                $("#txtNroDctoCliente").val(nro);
            }
        } else {
            infoCustom2("No se encontró Cliente");
            NuevoClienteRapido(doid, nro);
            $("#txt_beneficiario").val("").keyup();
            //Datos buscados permanecen
            $("#cboTipoDoc").val(doid).change();
            $("#txtNroDctoCliente").val(nro);
        }
        Desbloquear("divFilaCliente");
    }
}

//DATOS SUNAT PARA INDICADOR HABIDO_IND
var HABIDO_IND = "0";
var DatosSunatCargados;
var ajaxSunat = null;
//function MuestraSunat() {

//    $("#no_existe").css("display", "none").html();
//    var NRO = rucSeleccionado;
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

//            debugger;
//            $("#lblEstadoSunat").html(datos[0].ESTADO);
//            $("#spanVerificando").html(datos[0].CONDICION);

//            //if (HABIDO_IND == "1") {
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
    var NRO = rucSeleccionado;
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

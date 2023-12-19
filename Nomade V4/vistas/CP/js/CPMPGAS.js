var array = [];
var correlativoInterno = [];
var ajaxCentroCostos = null;
var detallesGasto = [];
var objProd = {};
var dTotal = 0;
var objAux;
var vAsientoContable = null;
const sCodModulo = "0003";
var prmtACON = "NO";
var prmtSURE;
var p_indRR;
var token_migo = '';//dporta
var count = 0;
var jsonBeneficiarios = new Array();
var CPLPGAS = function () {

    var plugin = function () {
        $("#slcEmpresa").select2();
        $("#slcSucural").select2();
        $("#cbo_gasto").select2();
        $("#cbo_subgasto").select2();
        $("#cbo_estado").select2();
        $("#txt_fec_ini").datepicker();
        $("#txt_fec_fin").datepicker();
        $("#txt_fec_ini_emi").datepicker();
        $("#txt_fec_fin_emi").datepicker();
        $("#cbo_tipo_provision").select2();
        $("#cbo_tipo_egreso").select2();
        $("#cbo_periodo").select2();
        $("#cbx_opcion").select2();

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
                    }
                },
                {
                    data: "GASTO_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "BENEFICIARIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }, {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "IMPORTE_PAGAR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right')
                    }
                },
                {
                    data: "DCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "SERIE_NRO_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
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
                    data: "FECHA_REGISTRO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "USU_ID_SOLICITA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "ESTADO_GASTO_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "ASIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "CCOSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }
            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                //TOTAL EGRESO SOLES
                api.data().filter(function (e) {
                    if (e.MONE_CODE.toString() == "0002") {
                        if (e.ESTADO_GASTO === "1" || e.ESTADO_GASTO === "2" || e.ESTADO_GASTO === "5" || e.ESTADO_GASTO === "0" || e.ESTADO_GASTO === "A") {
                            y.push(parseFloat(e.MONTO));
                        }
                    }

                });
                v_total = 0;
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                }

                //console.log(y);
                $("#lbl_egreso_sol").text("S/. " + formatoMiles(v_total))

                //TOTAL EGRESO DOLARES
                y = new Array();
                api.data().filter(function (e) {
                    if (e.MONE_CODE.toString() == "0003") {
                        if (e.ESTADO_GASTO === "1" || e.ESTADO_GASTO === "2" || e.ESTADO_GASTO === "5" || e.ESTADO_GASTO === "0" || e.ESTADO_GASTO === "A") {
                            y.push(parseFloat(e.MONTO));
                        }
                    }

                });
                var v_total2 = 0;
                if (y.length > 0) {
                    v_total2 = y.reduce(function (a, b) { return a + b; });
                }

                $("#lbl_egreso_dol").text("$. " + formatoMiles(v_total2))

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
                window.open("?f=cpmpgas&codigo=" + CODIGO, '_blank');

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

    var fillCbo_Gasto = function (ctlg) {

        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=3&p_TIPO=3&p_ESTADO_IND=A&p_CTLG_CODE=" + ctlg,
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
                $('#cbo_gasto').select2("val", "");
                $('#cbo_subgasto').empty();
                $('#cbo_subgasto').append('<option></option>');
                $('#cbo_subgasto').select2("val", "");

            },
            error: function (msg) {
                alert(msg);
            }
        });


    }


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
                        $('#cbo_subgasto').append('<option cta="' + datos[i].CONTABLE + '"  tipo-bien="' + datos[i].TIPO_BIEN + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
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
    }

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
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#slcSucural").select2("val", "");
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
    }



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

    var fillCbo_Estado = function () {

        var datos = [
            { "CODIGO": "1", "DESCRIPCION": "REGISTRADO" },
            { "CODIGO": "2", "DESCRIPCION": "APROBADO" },
            { "CODIGO": "3", "DESCRIPCION": "ANULADO" },
            { "CODIGO": "4", "DESCRIPCION": "RECHAZADO" },
            { "CODIGO": "5", "DESCRIPCION": "PAGADO" },
            { "CODIGO": "6", "DESCRIPCION": "AMORTIZADO" },
        ]

        var datos_2 = [
            { "CODIGO": "A", "DESCRIPCION": "ACTIVO" },
            { "CODIGO": "I", "DESCRIPCION": "INACTIVO" },

        ]

        $('#cbo_estado').empty();
        $('#cbo_estado').append('<option></option>');

        if ($("#cbo_tipo_provision").val() == "NPRO") {
            for (var i = 0; i < datos.length; i++) {

                $('#cbo_estado').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
            }
        }
        if ($("#cbo_tipo_provision").val() == "PRO") {
            for (var i = 0; i < datos_2.length; i++) {

                $('#cbo_estado').append('<option value="' + datos_2[i].CODIGO + '">' + datos_2[i].DESCRIPCION + '</option>');
            }

        }
        $("#cbo_estado").select2("val", "")

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
                ListarSucursales($('#slcEmpresa').val())
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
                fillCbo_Estado();
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
        let p_COMPRAS_IND = "";
        let p_ANIO_TRIB = "";
        let p_MES_TRIB = "";

        let p_CONC_CODE = "";
        let p_SCONC_CODE = "";
        let p_ESTADO_IND = "";
        let p_FECHA_INI = "";
        let p_FECHA_FIN = "";
        let p_CENTRO_COSTOS = "";

        p_CTLG_CODE = $("#slcEmpresa").val();
        p_SCSL_CODE = $("#slcSucural").val();

        p_FECHA_INI_EMI = $("#txt_fec_ini_emi").val();
        p_FECHA_FIN_EMI = $("#txt_fec_fin_emi").val();

        p_COMPRAS_IND = $("#cbo_tipo_egreso").val();

        let PERIODO = $("#cbo_periodo").val();
        if (p_COMPRAS_IND == "S") {
            if (PERIODO != "T") {
                p_MES_TRIB = $("#cbo_periodo").val().split("-")[0]
                p_ANIO_TRIB = $("#cbo_periodo").val().split("-")[1]
            }
        }

        if (p_COMPRAS_IND == "T") {
            if (PERIODO != "T") {
                p_MES_TRIB = $("#cbo_periodo").val().split("-")[0]
                p_ANIO_TRIB = $("#cbo_periodo").val().split("-")[1]
            }
        }

        //FILTROS AVANZADOS
        if ($("#chk_avanzada").is(':checked')) {

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
                p_MES_TRIB = ""
                p_ANIO_TRIB = ""
            }

            if ($("#chkCentroCostos").is(':checked')) {
                //$("#txt_centro_costo").val(CentroCosto);
                //$("#txt_centro_costo").data("CodCentroCostoCab", CECC);
                //$("#txt_centro_costo").data("CodCentroCosto", CECD);

                p_CENTRO_COSTOS = $("#txt_centro_costo").data("CodCentroCosto");
            }
        }


        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGAS.ashx?OPCION=LGASTOS_NO_PROG" +
                "&p_CTLG_CODE=" + p_CTLG_CODE +
                "&p_SCSL_CODE=" + p_SCSL_CODE +
                "&p_FECHA_INI_EMI=" + p_FECHA_INI_EMI +
                "&p_FECHA_FIN_EMI=" + p_FECHA_FIN_EMI +
                "&p_COMPRAS_IND=" + p_COMPRAS_IND +
                "&p_ANIO_TRIB=" + p_ANIO_TRIB +
                "&p_MES_TRIB=" + p_MES_TRIB +
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
            ListarSucursales($('#slcEmpresa').val());
            fillCbo_Gasto($('#slcEmpresa').val());

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
            fillCbo_Estado();
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
var CPMPGAS = function () {

    var oCentroCostoCab = [];
    var aoNiveles = [];

    var fnFillBandejaCtas = function () {
        var parms = {
            data: null,
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
                    data: "ANIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "MES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TIPO_ASIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_EMI_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_TRANSAC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "DECLARADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "MONE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        type: formatoMiles;
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<a class='VerAsiento' >Ver Asiento</a>");
                        $(td).css("text-align", "center").addClass("asiento");
                    }
                }
            ]
        }

        oTableLista = $("#tblLista").dataTable(parms);
        // $("#tblLista").removeAttr("style");

        $("#tblLista tbody").on("click", "td.asiento", function (event) {

            event.stopPropagation();
            var oTr = $(this).parent();

            $(this).find("a.VerAsiento").html("Ocultar");

            if (oTableLista.fnIsOpen(oTr)) {
                $(this).find("a.VerAsiento").html("Ver Asiento");
                oTr.removeClass("details");
                oTableLista.fnClose(oTr);
                return;
            }

            var pos = oTableLista.api(true).row(oTr).index();
            var row = oTableLista.fnGetData(pos);
            var sCodigo = row.CODIGO;


            var oMovCuentaDet = fnListaMovContableDet(sCodigo);

            var sHtml = "<div class='span12' id='divTblCuentas'>";
            sHtml += "<div class='span12' id='divTblCuentas'>";
            sHtml += "<table id='tblCuentas' class='table table-bordered'>";
            sHtml += "<thead>";
            sHtml += "<tr style='background-color: rgb(3, 121, 56); color: aliceblue;'>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Correlativo</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Documento</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>F. Emisión</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Doc Id</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Persona</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Cuenta</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Descripción</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Centro de Costos</th>";            
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeME</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberME</th>";
            sHtml += "</tr>";
            sHtml += "</thead>";
            sHtml += "<tbody>";

            if (!isEmpty(oMovCuentaDet)) {
                var nTotalDebeMN = 0;
                var nTotalHaberMN = 0;
                var nTotalDebeME = 0;
                var nTotalHaberME = 0;
                $.each(oMovCuentaDet, function (key, value) {
                    var sCorrelativo = value.ITEM;
                    var sDocumento = value.DCTO;
                    var sFEmision = value.FECHA_DCTO;
                    var sCodIdent = value.DOC_IDENT;
                    var sPersona = value.PERSONA;
                    var sCuenta = value.CTAS_CODE;
                    var sDescripcionItem = value.CTAS;
                    var sCCosto = value.CCOSTO_DET;                    
                    var nDebeMN = value.DEBE_MN;
                    var nHaberMN = value.HABER_MN;
                    var nDebeME = value.DEBE_ME;
                    var nHaberME = value.HABER_ME;

                    sHtml += ("<tr>");
                    sHtml += ("<td style='text-align:center;'>" + sCorrelativo + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sDocumento + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sFEmision + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sCodIdent + "</td>");
                    sHtml += ("<td>" + sPersona + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + sCuenta + "</td>");
                    sHtml += ("<td>" + sDescripcionItem + "</td>");
                    sHtml += ("<td>" + sCCosto + "</td>");                    
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeME) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberME) + "</td>");
                    sHtml += ("</tr>");

                    nTotalDebeMN = nTotalDebeMN + nDebeMN;
                    nTotalHaberMN = nTotalHaberMN + nHaberMN;

                    nTotalDebeME = nTotalDebeME + nDebeME;
                    nTotalHaberME = nTotalHaberME + nHaberME;
                });
            }
            sHtml += ("<tr style='background-color: rgb(237, 208, 0); color: #006232;'>");
            sHtml += ("<td colspan='8' style='text-align:right;font-weight:bold;'>Total</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeME) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberME) + "</td>");
            sHtml += ("</tr>");

            sHtml += "</tbody>";
            sHtml += "</table>";
            sHtml += "</div>";

            oTableLista.fnOpen(oTr, sHtml, "details");
        });
    };

    var fnCargarParametros = function (psPlanCostos) {
        aoNiveles = CargarNivelesCentroCostos(psPlanCostos);
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
        $('#txt_dcto_ref').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 20, "greedy": false }); });
        $("#cbo_mes").select2();
        $("#cbo_semana").select2();
        $('#cbo_moneda').select2();
        $('#cbo_tipo_persona').select2();
        $('#cbo_tipo_documento').select2();
        $('#cbo_documento').select2();
        $('#cboRegistroInterno').select2();
        $('#cbo_periodo').select2();
        $("#txt_fec_reg").datepicker("setDate", "now")
        $("#txtFechaVenc").datepicker("setDate", "now")
        $("#cboTipoBien,#cbx_destino").select2();
        $('#cbx_opcion').select2();
        $('#cboDeclara').select2();


        $('#txt_fec_unica').datepicker().change(function () {
            $('#txtFechaVenc').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtFechaVenc').val().split("/").reverse().join(""))) ? "" : $('#txtFechaVenc').val());
            $('#txtFechaVenc').datepicker('setStartDate', $(this).val());
        });

        $('#txtFechaVenc').datepicker().on("change", function () {
            if ($('#txt_fec_unica').val() != "") {
                $('#txt_fec_unica').datepicker('setStartDate', $('#txt_fec_unica').val());
            }
        });
    }

    var CargarTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "SUB_GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "CENTRO_COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DES_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DES_OPERACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "SUB_MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SUB_DETRACCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SUB_TOTAL_NETO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
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
                        if (datos[i].VALOR == '0' || datos[i].VALOR == '1' || datos[i].VALOR == '6' || datos[i].VALOR == '7') {
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
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=PADRES&p_ESTADO_IND=A&p_CTLG_CODE=" + $("#slcEmpresa").val(),
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
                        $('#cbo_moneda').append('<option  simbolo="' + datos[i].SIMBOLO + '" value="' + datos[i].CODIGO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
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

    var fillCbo_Tipo_Persona = function () {
        $('#cbo_tipo_persona').empty();

        $('#cbo_tipo_persona').append('<option value=""></option>');
        $('#cbo_tipo_persona').append('<option value="P">Proveedor</option>');
        $('#cbo_tipo_persona').append('<option value="E">Empleado</option>');
        $('#cbo_tipo_persona').append('<option value="T">Persona</option>');
        $('#cbo_tipo_persona').select2("val", "P");
    };

    var fillCbo_Tipo_Documento = function () {
        var tipoPersona = $('#cbo_tipo_persona').val();
        var opcionHtml = '';

        switch (tipoPersona) {
            case 'P':
                opcionHtml += '<option value="6">RUC</option>'; //CODIGOS DOID SUNAT
                opcionHtml += '<option value="0">OTROS</option>';
                break;

            case 'E':
                opcionHtml += '<option value="1">DNI</option>';
                opcionHtml += '<option value="4">CARNÉ EXTRAN.</option>';
                opcionHtml += '<option value="7">PASAPORTE</option>';
                opcionHtml += '<option value="0">OTROS</option>';
                break;

            default:
                opcionHtml += '<option value="6">RUC</option>';
                opcionHtml += '<option value="1">DNI</option>';
                opcionHtml += '<option value="4">CARNÉ EXTRAN.</option>';
                opcionHtml += '<option value="7">PASAPORTE</option>';
                opcionHtml += '<option value="0">OTROS</option>';
        }

        $('#cbo_tipo_documento').empty().append(opcionHtml);

        $('#cbo_tipo_documento').select2("val", "6");
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

    var fillCboTipoBien = function (code) {
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
            async: true,
            success: function (datos) {
                $('#cboTipoBien').html('<option></option>');
                if (datos != null && datos.length > 0) {
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboTipoBien').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                        if (code != undefined) {
                            if (code != "") {
                                $('#cboTipoBien').select2("val", code);
                            }
                        }
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
        $('#cbo_periodo').select2();
        $("#div_per_tri").attr("style", "display:" + valor);

        $('#cboDeclara').select2();
        $("#div_declara").attr("style", "display:" + valor);
    };

    function BuscarBeneficiarioxDocumento() {
        if (vErrors(['cbo_tipo_documento'])) {
            var tipoDoc = $("#cbo_tipo_documento").val();
            var numeroDoc = $("#txtNroDctoProveedor").val();
            var tipoPer = $("#cbo_tipo_persona").val();

            if (jsonBeneficiarios != null && jsonBeneficiarios.length > 0) {
                for (var i = 0; i < jsonBeneficiarios.length; i++) {
                    var beneficiario = jsonBeneficiarios[i];

                    if ((tipoDoc === '6' && beneficiario.RUC === numeroDoc) || // RUC
                        (tipoDoc === '1' && beneficiario.DNI === numeroDoc) || // DNI
                        (tipoDoc === '4' && beneficiario.CARNET === numeroDoc) || // CARNET
                        (tipoDoc === '7' && beneficiario.PASAPORTE === numeroDoc) || // PASAPORTE
                        (tipoDoc === '0' && beneficiario.OTROS === numeroDoc) // OTROS
                    ) {
                        actualizarInformacionBeneficiario(beneficiario);
                        return;
                    }
                }
            }
        }
    }

    function actualizarInformacionBeneficiario(beneficiario) {
        limpiarHf();
        $("#hfpidm").val(beneficiario.PIDM);
        rucSeleccionado = beneficiario.RUC;
        var tipoPersona = $('#cbo_tipo_persona').val();
        $('#txt_beneficiario').val() === '' ? $('#txt_beneficiario').val(beneficiario.PERSONA) : $('#txt_beneficiario').val();

        switch (tipoPersona) {
            case 'P':
                $("#hfRUCPER").val(beneficiario.RUC);
                $("#hfOTROSPER").val(beneficiario.OTROS);

                if (beneficiario.RUC) {
                    $("#cbo_tipo_documento").val('6');
                } else if (beneficiario.OTROS) {
                    $("#cbo_tipo_documento").val('0');
                }

                break;

            case 'E':
                $("#hfDNIPER").val(beneficiario.DNI);
                $("#hfCARNETPER").val(beneficiario.CARNET);
                $("#hfPASAPORTEPER").val(beneficiario.PASAPORTE);
                $("#hfOTROSPER").val(beneficiario.OTROS);

                if (beneficiario.DNI) {
                    $("#cbo_tipo_documento").val('1');
                } else if (beneficiario.PASAPORTE) {
                    $("#cbo_tipo_documento").val('7');
                } else if (beneficiario.CARNET) {
                    $("#cbo_tipo_documento").val('4');
                } else if (beneficiario.OTROS) {
                    $("#cbo_tipo_documento").val('0');
                }

                break;

            default:
                $("#hfRUCPER").val(beneficiario.RUC);
                $("#hfDNIPER").val(beneficiario.DNI);
                $("#hfCARNETPER").val(beneficiario.CARNET);
                $("#hfPASAPORTEPER").val(beneficiario.PASAPORTE);
                $("#hfDNIPER").val(beneficiario.DNI);

                if (beneficiario.RUC) {
                    $("#cbo_tipo_documento").val('6'); 
                } else if (beneficiario.DNI) {
                    $("#cbo_tipo_documento").val('1');
                } else if (beneficiario.PASAPORTE) {
                    $("#cbo_tipo_documento").val('7');
                } else if (beneficiario.CARNET) {
                    $("#cbo_tipo_documento").val('4'); 
                } else if (beneficiario.OTROS) {
                    $("#cbo_tipo_documento").val('0');
                }

        }
        $("#cbo_tipo_documento").trigger('change');
        actualizarNroDctoProveedor();

        $("#lblHabido").html("");
        $("#lblEstado").html("");
        $("#lblRucSeleccionado").html("");
        if (rucSeleccionado != "") {
            $("#lblRucSeleccionado").html("RUC: " + rucSeleccionado + "");
            $("#cbo_documento option[value=0001]").removeAttr("disabled");
            $("#cbo_documento option[value=0002]").removeAttr("disabled");
            $("#cbo_documento option[value=0003]").removeAttr("disabled");
            $("#cbo_documento option[value=0005]").removeAttr("disabled");
            $("#cbo_documento option[value=0009]").removeAttr("disabled");
            $("#cbo_documento option[value=0010]").removeAttr("disabled");
            $("#cbo_documento option[value=0014]").removeAttr("disabled");
        } else {
            $("#cbo_documento option[value=0001]").attr("disabled", "disabled");
            $("#cbo_documento option[value=0002]").attr("disabled", "disabled");
            $("#cbo_documento option[value=0003]").attr("disabled", "disabled");
            $("#cbo_documento option[value=0005]").attr("disabled", "disabled");
            $("#cbo_documento option[value=0009]").attr("disabled", "disabled");
            $("#cbo_documento option[value=0010]").attr("disabled", "disabled");
            $("#cbo_documento option[value=0014]").attr("disabled", "disabled");
            $("#lblRucSeleccionado").html("");
        }

        if (rucSeleccionado == "") {
            $("#chk_compras").attr("disabled", "disabled");
            $('#uniform-chk_compras span').removeClass();
            $('#chk_compras').attr('checked', false);
            $(".divDestinoTipo").hide();
            $("#btnHabido").hide();
            MuestraPeriodo("none")
        } else {
            $("#btnHabido").show();
            if (!$("#chk_sindcto").is(":checked")) {
                $("#chk_compras").removeAttr("disabled");
            }
        }

        if (beneficiario.PPBIDEN_CONDICION_SUNAT != "") {
            HABIDO_IND = "1";
            $("#lblHabido").html("CONDICIÓN: " + "<b>" + beneficiario.PPBIDEN_CONDICION_SUNAT + "</b>");
        }
        if (beneficiario.PPBIDEN_ESTADO_SUNAT != "") {
            $("#lblEstado").html("ESTADO: " + "<b>" + beneficiario.PPBIDEN_ESTADO_SUNAT + "</b>");
        }

        $("#hfPIDM").val(beneficiario.PIDM);
    }

    function actualizarNroDctoProveedor() {
        var tipo_documento = $("#cbo_tipo_documento").val();
        var nroDoc;
        switch (tipo_documento) {
            case '6':
                nroDoc = $("#hfRUCPER").val();
                break;

            case '0':
                nroDoc = $("#hfOTROSPER").val();
                break;

            case '1':
                nroDoc = $("#hfDNIPER").val();
                break;

            case '4':
                nroDoc = $("#hfCARNETPER").val();
                break;

            case '7':
                nroDoc = $("#hfPASAPORTEPER").val();
                break;

            default:
                nroDoc = $("#hfRUCPER").val();
        }

        if (nroDoc === "" || nroDoc === "0") {
            $("#txtNroDctoProveedor").val("");
            $("#txtNroDctoProveedor").attr("placeholder", "Nro. ");
        } else {
            $("#txtNroDctoProveedor").val(nroDoc);
        }
    }

    function limpiarHf() {
        $("#hfRUCPER").val("");
        $("#hfOTROSPER").val("");
        $("#hfDNIPER").val("");
        $("#hfCARNETPER").val("");
        $("#hfPASAPORTEPER").val("");
        $("#txtNroDctoProveedor").val("");
    }

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
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_ESTADO_IND=A&p_CODE=" + depend_code + "&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_subgasto').empty();
                $('#cbo_subgasto').append('<option></option>');
                if (datos != null) {
                    $("#error").slideUp();
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_subgasto').append('<option cta_des="' + datos[i].CONTABLE_DESC + '" cta="' + datos[i].CONTABLE + '" tipo-bien="' + datos[i].TIPO_BIEN + '" value="' + datos[i].CODIGO + '" detraccion="' + datos[i].GASTO_DETRACCION_DECIMALES + '">' + datos[i].DESCRIPCION + '</option>');
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

    function nuevoProveedor() {
        var tp, td, d;
        var continuar = false;
        var enlace; 
        personaSeleccionada = {};

        if (vErrorsNotMessage(['txtNroDctoProveedor'])) {
            continuar = true;
            td = $("#cbo_tipo_documento").val();
            d = $("#txtNroDctoProveedor").val()
        }

        switch ($("#cbo_tipo_persona").val()) {
            case "P":
                enlace = "?f=nrmgepr&tp=";
                break;
            case "E":
                enlace = "?f=npmempl&tp=";
                break;
            default:
                enlace = "?f=ncmpers&tp=";
                break;

        }

        if (continuar) {
            if (td == "6") {//JURIDICA         
                if (d.length == 11) {
                    if (d.toString().substring(0, 1) == "1") {
                        //PERSONA NATURAL CON RUC    
                        tp = "N";
                        window.open(enlace + tp + "&td=" + td + "&d=" + d + "", "_blank");
                    } else {
                        //PERSONA JURÍDICA  
                        tp = "J";
                        window.open(enlace + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#slcEmpresa").val() + "", "_blank");
                    }
                } else {
                    alertCustom("Ingrese un número de documento válido");
                }
            } else {//PERSONA NATURAL
                tp = "N";
                window.open(enlace + tp + "&td=" + td + "&d=" + d + "&ctlg=" + $("#slcEmpresa").val() + "", "_blank");
            }
        }
    }

    function filltxtBeneficiario(v_ID, v_value) {
        limpiarHf()

        var selectBeneficiario = $(v_ID);

        $("#hfpidm").val("");
        rucSeleccionado = "";
        $("#lblRucSeleccionado").html("");
        $("#lblHabido").html("");
        $("#lblEstado").html("");
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/CPMPGAS.ashx?OPCION=PER_PROV&p_CTLG_CODE=" + $('#slcEmpresa').val() + "&p_TIPO_PER=" + $("#cbo_tipo_persona").val(),
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null && datos !== '') {
                    $('.typeahead.dropdown-menu').html('');
                    $('#txt_beneficiario').attr("placeholder", "Nombre proveedor");
                    jsonBeneficiarios = datos;
                    selectBeneficiario.typeahead({
                        source: function (query, process) {
                            items: 20,
                                arrayProveedores = [];
                            map = {};
                            let oObjet = new Array();
                            for (var i = 0; i < datos.length; i++) {
                                arrayProveedores.push(datos[i].PERSONA);
                                var obj = {};
                                obj.RAZON_SOCIAL = datos[i].PERSONA;
                                obj.DNI = datos[i].DNI;
                                obj.RUC = datos[i].RUC;
                                obj.CARNET = datos[i].CARNET;
                                obj.PASAPORTE = datos[i].PASAPORTE;
                                obj.OTROS = datos[i].OTROS;
                                obj.PIDM = datos[i].PIDM;
                                obj.PPBIDEN_CONDICION_SUNAT = datos[i].PPBIDEN_CONDICION_SUNAT;
                                obj.PPBIDEN_ESTADO_SUNAT = datos[i].PPBIDEN_ESTADO_SUNAT;
                                oObjet.push(obj);
                            }

                            $.each(oObjet, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayProveedores);

                        },
                        updater: function (item) {
                            actualizarInformacionBeneficiario(map[item]);
                            return item;
                        },
                        keyup: function () {
                            if (selectBeneficiario.val().length <= 0) {
                                $("#hfpidm").val("");
                                $("#lblRucSeleccionado").html("");

                                if (rucSeleccionado == "") {
                                    $("#chk_compras").attr("disabled", "disabled");
                                    $('#uniform-chk_compras span').removeClass();
                                    $('#chk_compras').attr('checked', false);
                                    $(".divDestinoTipo").hide();
                                    MuestraPeriodo("none")
                                } else {
                                    $("#chk_compras").removeAttr("disabled", "disabled");
                                }
                                $("#lblHabido").html("");
                                $("#lblEstado").html("");
                                $("#lblRucSeleccionado").html("");

                                //HABIDO_IND = "1";
                            }
                        }
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    arrayProveedores.val(v_value);
                    rucSeleccionado = "";
                    $("#lblRucSeleccionado").html("");
                    //Desbloquear("ventana");
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom('Error al intentar consultar proveedores.');
                //Desbloquear("ventana");
            }
        });


        selectBeneficiario.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txt_beneficiario").val().length <= 0) {
                $("#hfpidm").val("");
                $("#lblHabido").html("");
                $("#lblEstado").html("");
                $("#lblRucSeleccionado").html("");
                //  selectBeneficiario.removeAttr("style", "border-color: forestgreen; background-color: beige");
            }
        });
    };

    function eventoContro() {
        $("#txtFechaVenc").datepicker({
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

        $("#txt_fec_unica").val(fNueva);
    };

    var eventoControles = function () {
        $('#btn_refresh').on('click', function () {
            Bloquear("ventana")
            setTimeout(function () {
                $("#input").empty();
                $("#input").html('<input id="txt_beneficiario" class="limpiar span12" type="text" >');
                filltxtBeneficiario('#txt_beneficiario', '');
            }, 500);
        });

        $('#cbo_tipo_persona').on('change', function () {
            limpiarHf();
            $('#txt_beneficiario').remove();
            $('#input').append('<input id="txt_beneficiario" class="limpiar span12 " type="text" />');

            var estereotipo = $("#cbo_tipo_persona").val();
            filltxtBeneficiario('#txt_beneficiario', '');
            if (estereotipo === "P") {
                $('#txt_beneficiario').attr("placeholder", "Nombre proveedor");
            } else if (estereotipo === "E") {
                $('#txt_beneficiario').attr("placeholder", "Nombre empleado");
            } else {
                $('#txt_beneficiario').attr("placeholder", "Nombre persona"); 
            }
            fillCbo_Tipo_Documento();
            actualizarNroDctoProveedor();

            oTable.fnClearTable();
            detallesGasto = [];
            dTotal = 0;
            $("#txt_monto, #txt_detraccion, #txt_importePagar").val("");
            actualizarRetencionRenta();
            $("#txt_retencion, #txt_nroSuspencion").val("");
            $("#txt_nroSuspencion").attr("disabled", true);
        });

        $("#cbo_tipo_documento").on('change', function () {
            actualizarNroDctoProveedor();
        });

        $("#btn_origen_destino").on("click", function (e) {
            nuevoProveedor();
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
                    actualizarNroDctoProveedor();
                    filltxtBeneficiario('#txt_beneficiario', '');
                    fnlimpiaCentroCostos();
                    fillCbo_Periodo();
                    emp_ant = $(this).val();

                }, 500);

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

        //$("#cbo_periodo").change(function () {
        $('#cbo_periodo').on('change', function () {
            var mesEmision = $("#txt_fec_unica").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
            var anioEmision = $("#txt_fec_unica").val().split("/")[2];
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

        $('#txt_fec_unica').on('change', function () {
            if ($("#cbo_periodo").val() != null) {
                var mesEmision = $("#txt_fec_unica").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
                var anioEmision = $("#txt_fec_unica").val().split("/")[2];
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
                    count = count + 1;
                    if (count % 2 == 0) {
                        infoCustom2('La fecha de emisíon del documento no debe exceder al periodo.');
                        $('#cboDeclara').select2('val', '');
                    }
                    if (count == 3) {
                        count = 0;
                    }
                } else {
                    $('#cboDeclara').select2('val', '0005');
                    $("#cboDeclara").change();
                }
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
            if (vErrors(['cbo_gasto', 'cbo_subgasto', 'txt_centro_costo', 'txtcuenta', 'txtSubTotal'])) {
                let codGasto = $("#cbo_gasto").val();
                let descGasto = $("#cbo_gasto option:selected").text();
                let codSubGasto = $("#cbo_subgasto").val();
                let desSubcGasto = $("#cbo_subgasto option:selected").text();
                let p_CENTRO_COSTO_CABECERA = $("#txt_centro_costo").data("CodCentroCostoCab");
                let p_CENTRO_COSTO = $("#txt_centro_costo").data("CodCentroCosto");
                let sCentroCosto = $("#txt_centro_costo").val();

                let sGlosa = $("#txt_glosa_detalle").val();


                let sCuenta = $('#cbo_subgasto :selected').attr("cta");
                let nomCuenta = $('#cbo_subgasto :selected').attr("cta_des");;
                let desCuenta = $("#txtcuenta").val();
                let codOperacion = $("#cbx_destino").val();
                let desOperacion = $("#cbx_destino :selected").html();
                let sSubTotal = $("#txtSubTotal").val();
                let detraccion = $('#cbo_subgasto :selected').attr("detraccion"); //DPORTA 17/01/2022

                dTotal += parseFloat(sSubTotal);

                var item = detallesGasto.length + 1;
                objProd.ITEM = item;
                objProd.COD_GASTO = codGasto;
                objProd.GASTO = descGasto;
                objProd.COD_SUB_GASTO = codSubGasto;
                objProd.SUB_GASTO = desSubcGasto;
                objProd.CC_CAB = p_CENTRO_COSTO_CABECERA;
                objProd.CC_COSTO = p_CENTRO_COSTO;
                objProd.CENTRO_COSTO = sCentroCosto;

                objProd.GLOSA = sGlosa;

                objProd.CUENTA = sCuenta;
                objProd.DES_CUENTA = desCuenta;
                objProd.COD_OPERACION = codOperacion;
                objProd.DES_OPERACION = desOperacion;
                objProd.NOM_CUENTA = nomCuenta;
                objProd.MONTO = sSubTotal;
                objProd.SUB_MONTO = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + sSubTotal;

                //let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
                if ($('#cbo_documento').val()  == '0001') { //DPORTA 18/08/2022
                    objProd.DETRACCION = parseFloat(detraccion) * (sSubTotal);//DPORTA 17/01/2022
                    objProd.SUB_DETRACCION = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + parseFloat(detraccion) * (sSubTotal);
                } else {
                    objProd.DETRACCION = parseFloat(0) * (sSubTotal);//DPORTA 17/01/2022
                    objProd.SUB_DETRACCION = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + parseFloat(0) * (sSubTotal);
                }
                objProd.TOTAL_NETO = sSubTotal;//DPORTA 17/01/2022
                objProd.SUB_TOTAL_NETO = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + sSubTotal;

                objAux = jQuery.parseJSON(JSON.stringify(objProd));
                detallesGasto.push(objAux);

                //console.log(detallesGasto);

                oTable.fnClearTable();
                oTable.fnAddData(detallesGasto);
                oTable.fnAdjustColumnSizing();

                $("#cbo_gasto").select2("val", "");

                $("#cbo_subgasto").select2("val", "");

                $("#txt_centro_costo").data("CodCentroCostoCab", "");
                $("#txt_centro_costo").data("CodCentroCosto", "");
                $("#txtcuenta").val("");
                $("#txt_glosa_detalle").val("");
                $("#txtSubTotal").val("");
                $("#txt_centro_costo").val('');

                CalcularDetraccion();

                parseFloat($("#txt_monto").val(dTotal)).toFixed(2);
                parseFloat($("#txt_importePagar").val(dTotal - parseFloat($("#txt_detraccion").val()))).toFixed(2);

                $('#txt_retencion').val(0);

                actualizarRetencionRenta();
                habilitarNroSuspencion($('#chk_retencionrenta').prop('checked'));
            }
        });

        $('#chkactivo').on('click', function () {
            if ($("#chkactivo").is(':checked')) {

                $('#uniform-chkactivo span').removeClass().addClass("checked");
                $('#chkactivo').attr('checked', true);
            } else {

                $('#uniform-chkactivo span').removeClass();
                $('#chkactivo').attr('checked', false);
            }
        });

        $('#chkDeducible').on('click', function () {
            if ($("#chkDeducible").is(':checked')) {

                $('#uniform-chkDeducible span').removeClass().addClass("checked");
                $('#chkDeducible').attr('checked', true);
                MuestraPeriodo("block");
            } else {
                if ($("#chk_compras").is(':checked')) {
                    $('#uniform-chkDeducible span').removeClass();
                    $('#chkDeducible').attr('checked', false);
                } else {
                    $("#div_per_tri").attr("style", "display:none");
                    $("#div_declara").attr("style", "display:none");
                    $('#uniform-chkDeducible span').removeClass();
                    $('#chkDeducible').attr('checked', false);
                }

            }
        });

        $('#cbo_subgasto').on('change', function () {
            var cta = $('#cbo_subgasto :selected').attr('cta');
            var cta_des = $('#cbo_subgasto :selected').attr('cta_des');
            $("#txtcuenta").val("[" + cta + "] " + cta_des);
            if ($("#cboTipoBien").val() == "" && ObtenerQueryString("codigo") == undefined) {
                if ($('#cbo_subgasto option:selected').attr("tipo-bien") != "") {
                    $("#cboTipoBien").select2("val", $('#cbo_subgasto option:selected').attr("tipo-bien"));
                } else {
                    $('#cboTipoBien').select2("val", "0001");
                }
            }
        });

        $('#rbtipo_fijo').on('click', function () {
            if ($("#rbtipo_fijo").is(':checked')) {
                $('#div_monto, #div_detraccion, #div_retencion, #div_importePagar').slideDown();
                $('#div_moneda, #div_detraccion, #div_retencion, #div_importePagar').slideDown();
            }
        });

        var moneda_ant = "";
        $('#cbo_moneda').on('change', function () {
            if (moneda_ant != $(this).val()) {

                //var text = "Monto (" + $("#cbo_moneda :selected").attr("simbolo") + ")"
                //$('#lbl_monto').text(text);
                $('#simbMoneda,#simbMoneda2,#simbMoneda3, #simbMoneda4').text($("#cbo_moneda :selected").attr("simbolo"));

                moneda_ant = $(this).val();
            } else { moneda_ant = ""; }
        });

        $('#rbtipo_variable').on('click', function () {
            if ($("#rbtipo_variable").is(':checked')) {
                $('#div_monto, #div_detraccion, #div_retencion, #div_importePagar').slideDown();
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

                //var permiso_ind = $("#hf_permiso").val();

                //AGREGA BOTON SI SE TIENE PERMISO
                if ($("#hf_permiso").val() != 0) {
                    $("#acciones_generales").html("<a id='btn_aprobar' class='btn green div_documentos' href='javascript:ConfirmarAprobacion();'><i class='icon-ok-circle'></i>&nbsp;Guardar y Aprobar</a>&nbsp;&nbsp;" +
                        "<a id='cancelar' class='btn' href='?f=CPMPGAS'><i class='icon-remove'></i>&nbsp;Cancelar</a>"
                    );
                }

                $("#rbdiario").parent().attr("class", "")
                $("#rbmensual").parent().attr("class", "")
                $("#rbsemanal").parent().attr("class", "")
                $('#div_cbo_semanal').attr("style", "display:none");
                $('#div_cbo_mensual').attr("style", "display:none");
                $('#cbo_mes').select2("val", "");
                $('#cbo_semana').select2("val", "");
                $("#cbo_mes").parent().parent().attr("class", "control-group")
                $("#cbo_semana").parent().parent().attr("class", "control-group")

                //$("#div_per_tri").html("<div class='span4'><div class='control-group'><label class='control-label' for='txtCodigo'>Periodo Tributario</label></div></div>" +
                //    " <div class=span6 ><div class='control-group'><div class='controls'><select  id='cbo_periodo' class='b limpiar span12 m-wrap' placeholder='Selecciona Periodo'><option></option><option value='11-2015'>NOVIEMBRE - 2015</option></select></div></div></div>")
                $("#cbo_periodo").select2();

                $("#rbtipo_fijo").attr("checked", "checked");
                $("#rbtipo_fijo").click();


            }

        });

        $('#rbProgramado').on('click', function () {
            if ($("#rbProgramado").is(':checked')) {
                MuestraPeriodo("none");
                $('#div_frecuencia_0').slideDown();
                $('#div_frecuencia_1').slideDown();
                $('#div_frecuencia_2').slideDown();
                $('#div_frecuencia_3').slideDown();
                $('#div_fec_unica_0').slideUp();
                $('#div_fec_unica_1').slideUp();

                $("#cbo_documento").val("").change();

                $('.div_documentos').slideUp();

                $('#txt_fec_unica').datepicker("setDate", "");
                $("#txt_fec_unica").parent().parent().attr("class", "control-group")
                $("#div_per_tri").html("");
                $("#cbo_frecuencia").change();
                $("#div_per_tri").attr("style", "display:block");
                $("#acciones_generales").html("<a id='guardar' class='btn blue' href='javascript:Guardar();'><i class='icon-save'></i>&nbsp;Guardar</a>&nbsp;&nbsp;" +
                    "<a id='cancelar' class='btn' href='?f=CPMPGAS'><i class='icon-remove'></i>&nbsp;Cancelar</a>"
                );


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
            //console.log(rucSeleccionado);
            $("#txt_serie").removeAttr("disabled");
            $("#txt_dcto_ref").removeAttr("disabled");
            $("#txt_serie").val("");
            $("#txt_dcto_ref").val("");
            $("#txt_serie").focus();
            if ($("#chk_sindcto").is(":checked")) {
                $("#txt_serie,#txt_dcto_ref,#cbo_documento").attr("disabled", "disabled")
            }

            var comprobante = $('#cbo_documento option:selected').attr('compras');
            var doc_interno = $('#cbo_documento option:selected').attr('doc_interno');

            if (doc_interno == 'N') {
                $('#chkDeducible').prop('checked', true).parent().addClass('checked');
            } else {
                $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
            }

            if (comprobante == 'S') {
                if (rucSeleccionado != "") {
                    $('#chk_compras').removeAttr("disabled");
                    $('#chk_compras').prop('checked', true).parent().addClass('checked');
                    $(".divDestinoTipo").show();
                    MuestraPeriodo("block");
                } else {
                    infoCustom2("Persona no posee RUC");
                }
            } else {
                $('#chk_compras').attr("disabled", "disabled");
                $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                $(".divDestinoTipo").hide();
                MuestraPeriodo("none");
            }

            var cod_doc = $('#cbo_documento').val();

            if (cod_doc == '0000' || cod_doc == '0002' || cod_doc == '0003' || cod_doc == '0016'
                || cod_doc == '0006' || cod_doc == '0010' || cod_doc == '0020' || cod_doc == '0100') {
                $('#cbx_destino').select2('val', 'OTRTRI');
                oTable.fnClearTable();
                detallesGasto = [];
                dTotal = 0;
                $("#txt_monto, #txt_detraccion, #txt_retencion, #txt_nroSuspencion, #txt_importePagar").val("")
                $("#txt_nroSuspencion").attr("disabled", true);
            } else {
                $('#cbx_destino').select2('val', 'DSTGRA');
                oTable.fnClearTable();
                detallesGasto = [];
                dTotal = 0;
                $("#txt_monto, #txt_detraccion, txt_retencion, #txt_nroSuspencion, #txt_importePagar").val("")
                $("#txt_nroSuspencion").attr("disabled", true);
            }

        });

        $('#chk_compras').on('click', function () {
            if ($("#chk_compras").is(':checked')) {
                $('#chk_compras').prop('checked', true).parent().addClass('checked');
                MuestraPeriodo("block")
                $(".divDestinoTipo").show();
            } else {

                if (!$("#chkDeducible").is(':checked')) {
                    $(".divDestinoTipo").hide();
                    $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                    MuestraPeriodo("none")
                } else {
                    $(".divDestinoTipo").hide();
                    $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                }



            }
        });

        $('#chk_sindcto').on('click', function () {

            if ($("#chk_sindcto").is(':checked')) {//SIN DOCUMENTO
                $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
                $('#chk_sindcto').prop('checked', true).parent().addClass('checked');

                $("#cbo_documento").select2("val", "")
                $("#txt_serie").val("")
                $("#txt_dcto_ref").val("")
                $("#cbo_documento").attr("disabled", true)
                $("#txt_serie").attr("disabled", true)
                $("#txt_dcto_ref").attr("disabled", true)

                $($("#txt_serie").parent().parent().parent()).attr("class", "control-group")
                $($("#txt_dcto_ref").parent().parent().parent()).attr("class", "control-group")
                $($("#cbo_documento").parent().parent().parent()).attr("class", "control-group")

                $('#chk_compras').attr("disabled", "disabled");
                $('#chk_compras').prop('checked', false).parent().removeClass('checked');

                $(".divDestinoTipo").hide();
                MuestraPeriodo("none")

                oTable.fnClearTable();
                detallesGasto = [];
                dTotal = 0;
                $("#txt_monto, #txt_detraccion, #txt_importePagar").val("");
                actualizarRetencionRenta();
                $("#txt_retencion, #txt_nroSuspencion").val("");
                $("#txt_nroSuspencion").attr("disabled", true);

            } else { // CON DOCUMENTO
                $('#chk_sindcto').prop('checked', false).parent().removeClass('checked');

                $("#cbo_documento").attr("disabled", false)
                $("#txt_serie").attr("disabled", false)
                $("#txt_dcto_ref").attr("disabled", false)

                if (rucSeleccionado != "") {
                    $('#chk_compras').removeAttr("disabled");
                }
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

        $('#chk_retencionrenta').change(function () {
            var importePago = parseFloat($('#txt_importePagar').val());
            var txtretencion = parseFloat($('#txt_retencion').val());
            var importe = !this.checked ? (importePago + txtretencion) : importePago;
            calcularRetencionRenta(importe)
            habilitarNroSuspencion($('#chk_retencionrenta').prop('checked'));
            $.uniform.update('#chk_retencionrenta');
        });

        //$("#txtNroDctoProveedor").live("keyup", function (e) {
        //    var key = e.keyCode ? e.keyCode : e.which;
        //    if ($(this).val() != "") {
        //        let beneficiary = beneficiariesData.find(b => b.docNumber === docNumber);
        //        if (beneficiary) {
        //            $('#txt_beneficiario').val(beneficiary.name);
        //        } else {
        //            $('#txt_beneficiario').val(''); 
        //        }
        //    }
        //});

        //$('#cbo_tipo_documento').change(function () {
        //    $("#txtNroDctoProveedor").focus();
        //    var valor = $(this).val();
        //    switch (valor) {
        //        case "1": //DNI                            
        //            var numDoc = $("#txtNroDctoProveedor").val().substring(0, 1);
        //            if (numDoc == 2) {
        //                $("#lblHabido").html("");
        //                $("#lblEstado").html("");
        //                //$('#cboDocumentoVenta').val("").change();
        //                $("#hfPIDM").val("");
        //                $("#hfAgenteRetencionCliente").val("");
        //                $("#hfCodigoCategoriaCliente").val("");
        //                $("#hfCodigoTipoDocumento").val("");
        //                $("#hfTipoDocumento").val("");
        //                $("#hfNroDocumento").val("");
        //                $("#hfRUC").val("");
        //                $("#hfDIR").val("");
        //                $("#txtNroDctoProveedor").val("");
        //                $("#txt_beneficiario").val("");
        //                //$('#cbo_direccion').val("").change();

        //            } else {
        //                $("#txtNroDctoProveedor").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        //            }
        //            break;
        //        case "6": //RUC
        //            $("#txtNroDctoProveedor").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
        //            break;
        //        case "4": //CARNE EXTRANJ.
        //            $("#txtNroDctoProveedor").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        //            break;
        //        case "7": //PASAPORTE
        //            $("#txtNroDctoProveedor").inputmask({ "mask": "#", "repeat": 9, "greedy": false });
        //            break;
        //        case "11"://PARTIDA
        //            $("#txtNroDctoProveedor").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        //            break;
        //        case "0"://OTROS
        //            $("#txtNroDctoProveedor").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
        //            break;
        //    }

        //    var tipo = $(this).val();
        //    $('#cboDocumentoVenta').val("").change();//DPORTA
        //    if (tipo === '6') {
        //        $('#txtNroDctoProveedor').val($("#hfRUC").val());
        //    } else {
        //        if ($("#hfCodigoTipoDocumento").val() == tipo) {
        //            $('#txtNroDctoProveedor').val($("#hfNroDocumento").val());
        //        } else {
        //            $('#txtNroDctoProveedor').val("");
        //        }
        //    }

        //    if ($('#cbo_tipo_documento').val() == '6') {
        //        $("#cboDocumentoVenta option:not([value=0001])").attr("disabled", "disabled");
        //        $("#cboDocumentoVenta option[value=0012]").removeAttr("disabled");
        //        $("#cboDocumentoVenta option[value=0101]").removeAttr("disabled"); 
        //        $("#cboDocumentoVenta option[value=0001]").removeAttr("disabled");

        //        var oItems = $('#cboDocumentoVenta option');
        //        for (var i = 0; i < oItems.length; i++) {
        //            if (oItems[i].value != "" && oItems[i].value != "0003") {
        //                if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
        //                    $("#cboDocumentoVenta").select2("val", "0012").change();
        //                } else if (oItems[i].value === "0001" && $("#txtNroDocVenta").val() == "") {
        //                    $("#cboDocumentoVenta").select2("val", "0001").change();
        //                } else if (oItems[i].value === "0101" && $("#txtNroDocVenta").val() == "") {
        //                    $("#cboDocumentoVenta").select2("val", "0101").change();
        //                }
        //            }
        //        }
        //    } else {
        //        $("#cboDocumentoVenta option:not([value=0001])").removeAttr("disabled");
        //        $("#cboDocumentoVenta option[value=0001]").attr("disabled", "disabled");

        //        var oItems = $('#cboDocumentoVenta option');
        //        for (var i = 0; i < oItems.length; i++) {
        //            if (oItems[i].value != "" && oItems[i].value != "0001") {
        //                if (oItems[i].value === "0012" && $("#txtNroDocVenta").val() == "") {
        //                    $("#cboDocumentoVenta").select2("val", "0012").change();
        //                } else if (oItems[i].value === "0003" && $("#txtNroDocVenta").val() == "") {
        //                    $("#cboDocumentoVenta").select2("val", "0003").change();
        //                } else if (oItems[i].value === "0101" && $("#txtNroDocVenta").val() == "") {
        //                    $("#cboDocumentoVenta").select2("val", "0101").change();
        //                }
        //            }
        //        }
        //    }

        //});

        $("#txtNroDctoProveedor").live("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    BuscarBeneficiarioxDocumento();
                }
            }
        });
        
        $('#txt_descripcion').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                return false;
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

        $('#simbMoneda,#simbMoneda2,#simbMoneda3, #simbMoneda4').text($("#cbo_moneda :selected").attr("simbolo"));
        $("#txt_usua").val($("#ctl00_txtus").val())
        var CODE = ObtenerQueryString("codigo");
        //var permiso_ind = $("#hf_permiso").val();
        if ($("#hf_permiso").val() == 0) {
            $("#btn_aprobar").remove();
            if (typeof (CODE) == "undefined") {
                $("#div_per_tri").remove();
                $("#div_declara").remove();
            }
        } else {
            $("#guardar").remove();
            fillCbo_Periodo();
        }

        if (typeof (CODE) !== "undefined") {

            $("#btn_aprobar").remove();
            Bloquear("ventana")
            var estado_ind;

            var data = new FormData();
            data.append('OPCION', '4');
            data.append('p_CODE', CODE);
            data.append('p_ESTADO_PAG', 0);
            data.append('p_ESTADO_IND', "");
            data.append('p_CTLG_CODE', "");
            data.append('p_SCSL_CODE', "");
            data.append('p_CONC_CODE', "");
            data.append('p_SCONC_CODE', "");
            data.append('p_FECHA_INI', "");
            data.append('p_FECHA_FIN', "");

            var cod = CODE.substring(0, 3);

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

                            $($($("#ventana").children()[0]).children()[0]).html("<i class='icon-reorder'></i>&nbsp;REGISTRO PROVISION DE GASTOS PROGRAMADOS")
                            $('#txtCodigo').val(datos[0].CODIGO);
                            $("#txt_descripcion").val(datos[0].GASTO);
                            $("#txt_descripcion").val(datos[0].GASTO);

                            //$("#txt_centro_costo").val(datos[0].DESC_CENTRO_COSTO);
                            //$("#txt_centro_costo").data("CodCentroCostoCab", datos[0].COD_CABECERA_CENTRO_COSTO);
                            //$("#txt_centro_costo").data("CodCentroCosto", datos[0].CODIGO_CENTRO_COSTO);

                            $("#txt_fec_reg").datepicker("remove")
                            $("#txt_fec_reg").datepicker("update")
                            $("#txt_fec_reg").datepicker("setDate", datos[0].FECHA_REGISTRO)

                            $('#slcEmpresa').select2("val", datos[0].CTLG_CODE);
                            $('#slcSucural').select2("val", datos[0].SCSL_CODE);
                            //$('#cbo_gasto').select2("val", datos[0].GASTO_COD).change()
                            //$('#cbo_subgasto').select2("val", datos[0].SUB_GASTO).change();
                            $('#txt_beneficiario').val(datos[0].NOMBRES);
                            $("#txt_beneficiario").keyup().siblings("ul").children("li").click();

                            $('#hfpidm').val(datos[0].PIDM_BENE);
                            if (datos[0].TIPO_IND == "F") {
                                $('#uniform-rbtipo_fijo span').removeClass().addClass("checked");
                                $('#rbtipo_fijo').attr('checked', true);
                                $("#rbtipo_fijo").click()
                            }
                            if (datos[0].TIPO_IND == "V") {
                                $('#uniform-rbtipo_variable span').removeClass().addClass("checked");
                                $('#rbtipo_variable').attr('checked', true);
                                $('#rbtipo_variable').click()
                            }

                            if (datos[0].RUC != "") {
                                rucSeleccionado = datos[0].RUC;
                                $("#lblRucSeleccionado").html("RUC: " + rucSeleccionado + "");
                            } 

                            $('#cbo_moneda').select2("val", datos[0].MONEDA_CODE).change();
                            $('#txt_monto').val(formatoMiles(datos[0].MONTO));
                            $("#hfmonto").val(datos[0].MONTO);

                            if (datos[0].PERIODICIDAD_IND == "P") {
                                $('#uniform-rbProgramado span').removeClass().addClass("checked");
                                $('#rbProgramado').attr('checked', true);
                                $("#rbProgramado").click()
                                $("#rbUnico").attr("disabled", true)
                            }
                            if (datos[0].PERIODICIDAD_IND == "U") {
                                $('#uniform-rbUnico span').removeClass().addClass("checked");
                                $('#rbUnico').attr('checked', true);
                                $('#rbUnico').click()
                                $("#rbProgramado").attr("disabled", true)
                            }

                            $("#cbo_documento").val(datos[0].TIPO_DCTO).change();
                            $("#txt_serie").val(datos[0].SERIE);
                            $("#txt_dcto_ref").val(datos[0].NUMERO);


                            $("#div_per_tri").remove();
                            $("#acciones_generales").html("<a id='guardar' class='btn blue' href='javascript:confirmarModificar();'><i class='icon-pencil'></i> Modificar</a>&nbsp;&nbsp;<a id='cancelar' class='btn' href='?f=CPMPGAS'><i class='icon-remove'></i>&nbsp;Cancelar</a>")

                            $("#guardar").html("<i class='icon-pencil'></i> Modificar");
                            $("#guardar").attr("href", "javascript:confirmarModificarP();");

                            $('#cbo_tipo_persona').val(datos[0].TIPO_PERSONA).trigger('change');

                            if (datos[0].ESTADO_A_I == 'A') {
                                $('#chkactivo').prop('checked', true).parent().addClass('checked');
                            } else {
                                $('#chkactivo').prop('checked', false).parent().removeClass('checked');
                            }

                            if (datos[0].COMPRAS_IND == 'S') {
                                $('#chk_compras').prop('checked', true).parent().addClass('checked');
                                $(".divDestinoTipo").show();
                            } else {
                                $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                                $(".divDestinoTipo").hide();
                            }

                            if (datos[0].DEDUCIBLE == 'S') {
                                $('#chkDeducible').prop('checked', true).parent().addClass('checked');
                            } else {
                                $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
                            }

                            $("#cbo_frecuencia").val(datos[0].FRECUENCIA).change();

                            if (datos[0].FRECUENCIA == "M") {
                                $('#cbo_mes').select2("val", datos[0].DATO_FRECUENCIA);
                            }
                            if (datos[0].FRECUENCIA == "S") {
                                $('#cbo_semana').select2("val", datos[0].DATO_FRECUENCIA);
                            }

                            filltxtBeneficiario('#txt_beneficiario', '');
                            //---------------------------
                            HABIDO_IND = datos[0].HABIDO_IND_ORG;

                            if (datos[0].TIPO_DCTO == '0001') {
                                if (datos[0].HABIDO_IND_ORG == "1") {
                                    $("#lblHabido").html("Condición: HABIDO");
                                } else {
                                    $("#lblHabido").html("Condición: NO HABIDO");
                                }
                            }


                            $("#cbx_destino").select2("val", datos[0].OPERACION_ORG);
                            fillCboTipoBien(datos[0].TIPO_BIEN_ORG);
                            actualizarNroDctoProveedor()

                            $("#add_detalle").attr("disabled", true);
                            $("#btnBuscarCentroCto").attr("disabled", true);
                            //----------------------------
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
            else if (cod == "GST") {//-----------GASTO UNICO--------------
                Bloquear("ventana");
                $.ajax({
                    url: "vistas/CP/ajax/CPMPGAS.ashx?",
                    type: 'POST',
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    async: false,
                    success: function (datos) {

                        //console.log(datos);
                        if (datos != null) {

                            $("#estado").slideDown();
                            $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                            var html = "<i class='icon-asterisk'></i>&nbsp;&nbsp;ESTADO&nbsp;:&nbsp;" + datos[0].NESTADO
                            $("#estado").children().children().html(html);
                            $('#txtCodigo').val(datos[0].CODIGO);

                            $("#txt_descripcion").val(datos[0].GASTO);

                            //$("#txt_centro_costo").val(datos[0].DESC_CENTRO_COSTO);
                            //$("#txt_centro_costo").data("CodCentroCostoCab", datos[0].COD_CABECERA_CENTRO_COSTO);
                            //$("#txt_centro_costo").data("CodCentroCosto", datos[0].CODIGO_CENTRO_COSTO);

                            $("#txt_usua").val(datos[0].SOLICITA);

                            $("#txtSerieRegistroInterno").val(datos[0].SERIE_INT)
                            $("#txtNroRegistroInterno").val(datos[0].NUMERO_INT)

                            $('#slcEmpresa').select2("val", datos[0].CTLG_CODE);
                            $('#slcSucural').select2("val", datos[0].SCSL_CODE);
                            //$('#cbo_gasto').select2("val", datos[0].GASTO_COD).change();
                            //$('#cbo_subgasto').select2("val", datos[0].SUB_GASTO).change();

                            if (datos[0].DEDUCIBLE == 'S') {
                                $('#chkDeducible').prop('checked', true).parent().addClass('checked');
                            } else {
                                $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
                            }

                            if (datos[0].TIPO_IND == "F") {
                                $('#uniform-rbtipo_fijo span').removeClass().addClass("checked");
                                $('#rbtipo_fijo').attr('checked', true);
                                $("#rbtipo_fijo").click()
                            }
                            if (datos[0].TIPO_IND == "V") {
                                $('#uniform-rbtipo_variable span').removeClass().addClass("checked");
                                $('#rbtipo_variable').attr('checked', true);
                                $('#rbtipo_variable').click()
                            }

                            $('#cbo_moneda').select2("val", datos[0].MONEDA_CODE).change();
                            $('#txt_monto').val(formatoMiles(datos[0].MONTO));
                            $("#hfmonto").val(datos[0].MONTO);

                            if (datos[0].COMPRAS_IND == 'S') {
                                $('#uniform-chk_compras span').removeClass().addClass("checked");
                                $('#chk_compras').attr('checked', true);
                                $(".divDestinoTipo").show();
                                if ($("#hf_permiso").val() != 0) {
                                    MuestraPeriodo("display");
                                }
                                //llenar combo
                                if (datos[0].MES_TRIB != "") {
                                    var oMes = Devuelve_Desc_MES(datos[0].MES_TRIB);
                                    $("#cbo_periodo").empty();
                                    var option = "<option value=" + datos[0].MES_TRIB + "-" + datos[0].ANIO_TRIB + ">" + oMes + " - " + datos[0].ANIO_TRIB + "</option>";
                                    $("#cbo_periodo").append(option);
                                    $("#cbo_periodo").select2("val", datos[0].ANIO_TRIB + "-" + datos[0].MES_TRIB)
                                }

                            } else {
                                $('#uniform-chk_compras span').removeClass();
                                $('#chkcompras').attr('checked', false);
                                $(".divDestinoTipo").hide();
                                MuestraPeriodo("none");
                            }

                            if (datos[0].DETRACCION_IND == 'S') {
                                $('#txt_detraccion').val(formatoMiles(datos[0].IMPORTE_DETRACCION));
                                $('#txt_importePagar').val(formatoMiles(datos[0].IMPORTE_PAGAR))
                            } else {
                                $('#txt_detraccion').val(formatoMiles(0));
                                $('#txt_importePagar').val(formatoMiles(datos[0].IMPORTE_PAGAR))
                            }

                            if (datos[0].DEDUCIBLE == 'S') {
                                $('#uniform-chkDeducible span').removeClass().addClass("checked");
                                $('#chkDeducible').attr('checked', true);
                                if ($("#hf_permiso").val() != 0) {
                                    MuestraPeriodo("display");
                                }
                                //llenar combo
                                if (datos[0].MES_TRIB != "") {
                                    var oMes = Devuelve_Desc_MES(datos[0].MES_TRIB);
                                    $("#cbo_periodo").empty();
                                    var option = "<option value=" + datos[0].MES_TRIB + "-" + datos[0].ANIO_TRIB + ">" + oMes + " - " + datos[0].ANIO_TRIB + "</option>";
                                    $("#cbo_periodo").append(option);
                                    $("#cbo_periodo").select2("val", datos[0].ANIO_TRIB + "-" + datos[0].MES_TRIB)
                                }

                            } else {
                                $('#uniform-chkDeducible span').removeClass();
                                $('#chkDeducible').attr('checked', false);
                                MuestraPeriodo("none");
                            }

                            if (datos[0].PERIODICIDAD_IND == "P") {
                                $('#uniform-rbProgramado span').removeClass().addClass("checked");
                                $('#rbProgramado').attr('checked', true);
                                $("#rbProgramado").click()
                                $("#rbUnico").attr("disabled", true)
                            }
                            if (datos[0].PERIODICIDAD_IND == "U") {
                                $('#uniform-rbUnico span').removeClass().addClass("checked");
                                $('#rbUnico').attr('checked', true);
                                if (datos[0].ESTADO_A_I != 'A') {
                                    $('#rbUnico').click();
                                }
                                $("#rbProgramado").attr("disabled", true)
                            }

                            if (datos[0].RUC != "") {
                                rucSeleccionado = datos[0].RUC;
                                $("#lblRucSeleccionado").html("RUC: " + rucSeleccionado + "");
                            }

                            $("#txt_fec_unica").datepicker("remove")
                            $("#txt_fec_unica").datepicker("update")
                            $("#txt_fec_unica").datepicker("setDate", datos[0].FECHA_UNICA)

                            $("#txt_fec_reg").datepicker("remove")
                            $("#txt_fec_reg").datepicker("update")
                            $("#txt_fec_reg").datepicker("setDate", datos[0].FECHA_REGISTRO)

                            $("#txtFechaVenc").datepicker("remove")
                            $("#txtFechaVenc").datepicker("update")
                            $("#txtFechaVenc").datepicker("setDate", datos[0].FECHA_VENCIMIENTO)
                            $("#txtFechaVenc").attr("disabled", true);

                            if (datos[0].TIPO_DCTO != "") {
                                $("#cbo_documento").val(datos[0].TIPO_DCTO).change();
                                $("#txt_serie").val(datos[0].SERIE);
                                $("#txt_dcto_ref").val(datos[0].NUMERO);
                                $('#uniform-chk_sindcto span').removeClass("checked");
                                $('#chk_sindcto').attr('checked', false);
                            } else {
                                $('#uniform-chk_sindcto span').removeClass("checked");
                                $('#chk_sindcto').attr('checked', false);
                                $('#chk_sindcto').click().click()
                                $('#uniform-chk_sindcto span').removeClass().addClass("checked");
                                $('#chk_sindcto').attr('checked', true);
                            }

                            if (datos[0].COMPRAS_IND == 'N') {//DPORTA
                                $('#uniform-chk_compras span').removeClass();
                                $('#chkcompras').attr('checked', false);
                                $(".divDestinoTipo").hide();
                                //MuestraPeriodo("none");
                            }

                            $('#cbo_tipo_persona').val(datos[0].TIPO_PERSONA).trigger('change');

                            if (datos[0].EST_IND == "ANU" || datos[0].EST_IND == "PAG"
                                || datos[0].EST_IND == "AMOR" || datos[0].EST_IND == "REC"
                                || datos[0].EST_IND == "APRO") {
                                $("#acciones_generales").remove();
                                $(".limpiar").attr("disabled", true);
                                $("#add_detalle").attr("disabled", true);
                                $("#btnBuscarCentroCto").attr("disabled", true);
                                $("#cbo_gasto").attr("disabled", true);
                                $("#cbo_subgasto").attr("disabled", true);
                                $("#txtSubTotal").attr("disabled", true);
                                $("#btnGenerarAsiento").attr("style", "display:display");
                            } else {
                                //$("#cbo_documento").attr("disabled", false);
                                //if (datos[0].RUC != "") {
                                //    $("#cbo_documento").val("default").trigger('change');
                                //}
                                $("#div_per_tri").remove();
                                $("#acciones_generales").html("<a id='guardar' class='btn blue' href='javascript:confirmarModificar();'><i class='icon-pencil'></i> Modificar</a>&nbsp;&nbsp;<a id='cancelar' class='btn' href='?f=CPMPGAS'><i class='icon-remove'></i>&nbsp;Cancelar</a>")
                                filltxtBeneficiario('#txt_beneficiario', '');
                                if ($("#hf_permiso").val() != 0) {
                                    MuestraPeriodo("display");
                                } else {
                                    MuestraPeriodo("none");
                                }
                                $("#btnGenerarAsiento").attr("style", "display:none");
                            }
                            $('#txt_beneficiario').val(datos[0].NOMBRES);
                            $("#txt_beneficiario").keyup().siblings("ul").children("li").click();
                            $('#hfpidm').val(datos[0].PIDM_BENE);
                            actualizarNroDctoProveedor();
                            //---------------------------
                            HABIDO_IND = datos[0].HABIDO_IND;


                            if (datos[0].TIPO_DCTO == '0001') {
                                if (datos[0].HABIDO_IND_ORG == "1") {
                                    $("#lblHabido").html("Condición: HABIDO");
                                } else {
                                    $("#lblHabido").html("Condición: NO HABIDO");
                                }
                            }

                            //if (datos[0].HABIDO_IND == "1") {
                            //    $("#lblHabido").html("Condición: HABIDO");
                            //} else {
                            //    $("#lblHabido").html("Condición: NO HABIDO");
                            //}
                            //$("#cbx_destino").select2("val", datos[0].OPERACION);
                            fillCboTipoBien(datos[0].TIPO_BIEN);


                            //if (datos[0].TIPO_DCTO == '0001') {
                            //    //rucSeleccionado = datos[0].RUC;
                            //    console.log('Mostrar Ruc');
                            //} else {
                            //    console.log('NO mostrar RUC');
                            //}


                            //----------------------------
                            $("#guardar").html("<i class='icon-pencil'></i> Modificar");
                            $("#guardar").attr("href", "javascript:confirmarModificar();");

                            if (datos[0].ESTADO_A_I == 'A') {

                                $('#uniform-chkactivo span').removeClass().addClass("checked");
                                $('#chkactivo').attr('checked', true);
                            } else {
                                $('#uniform-chkactivo span').removeClass();
                                $('#chkactivo').attr('checked', false);
                            }

                            listarDetallesGasto(CODE);

                            if (!$("#chk_retencionrenta").is(':checked') && $("#cbo_documento").val() === "0002" && prmtSURE <= parseFloat($('#txt_monto').val())) {
                                $("#txt_nroSuspencion").val(datos[0].NRO_SUSPENCION);
                            }

                            if (datos[0].EST_IND == "ANU" || datos[0].EST_IND == "PAG"
                                || datos[0].EST_IND == "AMOR" || datos[0].EST_IND == "REC"
                                || datos[0].EST_IND == "APRO") {
                                $(".btnEliminarDetalle").attr("style", "display:none");
                                $('#chk_retencionrenta').prop('checked', false);
                                $('#chk_retencionrenta').prop('disabled', true);
                                $('#txt_retencion').prop('disabled', true);
                                habilitarNroSuspencion($("#chk_retencionrenta").is(':checked'));
                                $("#txt_nroSuspencion").prop('disabled', true);
                            } else {
                                habilitarNroSuspencion($("#chk_retencionrenta").is(':checked'));
                            }

                            if (prmtACON == "SI") {
                                var sCodGasto = CODE;
                                sCodGasto = $.trim(sCodGasto);
                                var oDocGasto = fnGetGasto(sCodGasto);
                                fnCargaTablaCuentasC(sCodGasto, oDocGasto, sCodGasto); //CAMBIO AVENGER
                            } else {
                                $("#asientos_contables").hide();
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
        }
        else {
            if (prmtACON == "SI") {
                fnCargaTablaCuentasC();
            }
            if (prmtACON == "NO") {
                $("#asientos_contables").hide();
            }
            filltxtBeneficiario('#txt_beneficiario', '');
        }

        $("#btnAceptarConfirmacion").click(registrarAprobacion);
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


    var fnCargaTablaCuentasC = function (sCodGasto, oDocGasto, sCodAsiento) {
        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = sCodModulo;
                    vAsientoContable.sCodDoc = sCodGasto;
                    vAsientoContable.objDoc = oDocGasto;
                    vAsientoContable.indRR = p_indRR;
                    vAsientoContable.init(sCodAsiento);
                });
        });
    }


    return {
        init: function () {
            var CODE = ObtenerQueryString("codigo");
            if (CODE == undefined) {
                fillCboTipoBien();
            }
            cargarParametrosSistema();
            eventoControles();
            plugins();
            eventoContro();
            CargarTabla();
            fnFillBandejaCtas();
            fillCbo_semana();
            fillCbo_mes();
            fillCboEmpresa();
            fillCbo_Gasto();
            fillCbo_Moneda();
            fillCbo_Tipo_Persona();
            fillCbo_Tipo_Documento();
            fillCboOperacion();
            fillCboDcto_Emite();
            ListarSucursales($('#slcEmpresa').val());
            ListarGasto($('#slcEmpresa').val());
            permiso_aprobar();
            cargaInicial();
        }
    };

}();

//DPORTA
function cargarParametrosSistema() {
    let filtro = "ACON,MIGO,DETR,SURE"; //Aquí van los parámetros que se van a utilizar en la pantalla y luego se le hace su case
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3.5&FILTRO=" + filtro,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    switch (datos[i].CODIGO) {                        
                        case "DETR":
                            if (!isNaN(parseFloat(datos[i].VALOR))) {
                                $('#hfParamDetraccion').val(datos[i].VALOR);
                            } else {
                                infoCustom2("El parámetro de sistema de Detracción(DETR) no es válido. Se considerará como monto requerido 700")
                                $('#hfParamDetraccion').val("700");
                            }
                            break;
                        case "ACON":
                            prmtACON = datos[i].VALOR;
                            break;
                        case "SURE":
                            prmtSURE = datos[i].VALOR;
                            break;
                        case "MIGO":
                            token_migo = datos[i].DESCRIPCION_DETALLADA;
                            break;
                    }
                }

            }
            else { alertCustom("No se recuperaron correctamente los parámetros!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperaron correctamente los parámetros!");
        }
    });

    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: false,
    //    success: function (datos) {
    //        if (datos != null) {
    //            prmtACON = datos[0].VALOR;
    //        }
    //        else { alertCustom("No se recuperó correctamente el parámetro ACON!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro ACON!");
    //    }
    //});

    ////TOKEN PARA PODER HACER LAS CONSULTAS DE LOS N° DE DOCS. A SUNAT
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MIGO",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            token_migo = datos[0].DESCRIPCION_DETALLADA;
    //        } else {
    //            alertCustom("No se recuperó correctamente el parámetro MIGO!");
    //        }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro MIGO!");
    //    }
    //});

    ////OBTENER PARAMETRO DE DETRACCION
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DETR",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: true,
    //    success: function (datos) {
    //        if (datos != null) {
    //            if (!isNaN(parseFloat(datos[0].VALOR))) {
    //                $('#hfParamDetraccion').val(datos[0].VALOR);
    //            } else {
    //                infoCustom2("El parámetro de sistema de Detracción(DETR) no es válido. Se considerará como monto requerido 700")
    //                $('#hfParamDetraccion').val("700");
    //            }
    //        }
    //        else { alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!");
    //    }
    //});

    ////PARAMETRO SUJETO A RETENCION
    //$.ajax({
    //    type: "post",
    //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=SURE",
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: false,
    //    success: function (datos) {
    //        if (datos != null) {
    //            prmtSURE = datos[0].VALOR;
    //        }
    //        else { alertCustom("No se recuperó correctamente el parámetro SURE!"); }
    //    },
    //    error: function (msg) {
    //        alertCustom("No se recuperó correctamente el parámetro SURE!");
    //    }
    //});
}

function BuscarBeneficiarioxDocumento() {
    if (vErrors(['cbo_tipo_documento'])) {
        var tipoDoc = $("#cbo_tipo_documento").val();
        var numeroDoc = $("#txtNroDctoProveedor").val();
        var tipoPer = $("#cbo_tipo_persona").val();

        if (jsonBeneficiarios != null && jsonBeneficiarios.length > 0) {
            for (var i = 0; i < jsonBeneficiarios.length; i++) {
                var beneficiario = jsonBeneficiarios[i];

                if ((tipoDoc === '6' && beneficiario.RUC === numeroDoc) || // RUC
                    (tipoDoc === '1' && beneficiario.DNI === numeroDoc) || // DNI
                    (tipoDoc === '4' && beneficiario.CARNET === numeroDoc) || // CARNET
                    (tipoDoc === '7' && beneficiario.PASAPORTE === numeroDoc) || // PASAPORTE
                    (tipoDoc === '0' && beneficiario.OTROS === numeroDoc) // OTROS
                ) {
                    actualizarInformacionBeneficiario(beneficiario);
                    return;
                }
            }
        }
    }
}

function actualizarInformacionBeneficiario(beneficiario) {
    limpiarHf();
    $("#hfpidm").val(beneficiario.PIDM);
    rucSeleccionado = beneficiario.RUC;
    var tipoPersona = $('#cbo_tipo_persona').val();
    $('#txt_beneficiario').val() === '' ? $('#txt_beneficiario').val(beneficiario.PERSONA) : $('#txt_beneficiario').val();

    switch (tipoPersona) {
        case 'P':
            $("#hfRUCPER").val(beneficiario.RUC);
            $("#hfOTROSPER").val(beneficiario.OTROS);
            break;

        case 'E':
            $("#hfDNIPER").val(beneficiario.DNI);
            $("#hfCARNETPER").val(beneficiario.CARNET);
            $("#hfPASAPORTEPER").val(beneficiario.PASAPORTE);
            $("#hfOTROSPER").val(beneficiario.OTROS);
            break;

        default:
            $("#hfRUCPER").val(beneficiario.RUC);
            $("#hfDNIPER").val(beneficiario.DNI);
            $("#hfCARNETPER").val(beneficiario.CARNET);
            $("#hfPASAPORTEPER").val(beneficiario.PASAPORTE);
            $("#hfDNIPER").val(beneficiario.DNI);
    }

    actualizarNroDctoProveedor();

    $("#lblHabido").html("");
    $("#lblEstado").html("");
    $("#lblRucSeleccionado").html("");
    if (rucSeleccionado != "") {
        $("#lblRucSeleccionado").html("RUC: " + rucSeleccionado + "");
        $("#cbo_documento option[value=0001]").removeAttr("disabled");
        $("#cbo_documento option[value=0002]").removeAttr("disabled");
        $("#cbo_documento option[value=0003]").removeAttr("disabled");
        $("#cbo_documento option[value=0005]").removeAttr("disabled");
        $("#cbo_documento option[value=0009]").removeAttr("disabled");
        $("#cbo_documento option[value=0010]").removeAttr("disabled");
        $("#cbo_documento option[value=0014]").removeAttr("disabled");
    } else {
        $("#cbo_documento option[value=0001]").attr("disabled", "disabled");
        $("#cbo_documento option[value=0002]").attr("disabled", "disabled");
        $("#cbo_documento option[value=0003]").attr("disabled", "disabled");
        $("#cbo_documento option[value=0005]").attr("disabled", "disabled");
        $("#cbo_documento option[value=0009]").attr("disabled", "disabled");
        $("#cbo_documento option[value=0010]").attr("disabled", "disabled");
        $("#cbo_documento option[value=0014]").attr("disabled", "disabled");
        $("#lblRucSeleccionado").html("");
    }

    if (rucSeleccionado == "") {
        $("#chk_compras").attr("disabled", "disabled");
        $('#uniform-chk_compras span').removeClass();
        $('#chk_compras').attr('checked', false);
        $(".divDestinoTipo").hide();
        $("#btnHabido").hide();
        MuestraPeriodo("none")
    } else {
        $("#btnHabido").show();
        if (!$("#chk_sindcto").is(":checked")) {
            $("#chk_compras").removeAttr("disabled");
        }
    }

    if (beneficiario.PPBIDEN_CONDICION_SUNAT != "") {
        HABIDO_IND = "1";
        $("#lblHabido").html("CONDICIÓN: " + "<b>" + beneficiario.PPBIDEN_CONDICION_SUNAT + "</b>");
    }
    if (beneficiario.PPBIDEN_ESTADO_SUNAT != "") {
        $("#lblEstado").html("ESTADO: " + "<b>" + beneficiario.PPBIDEN_ESTADO_SUNAT + "</b>");
    }

    $("#hfPIDM").val(beneficiario.PIDM);
}

function actualizarNroDctoProveedor() {
    var tipo_documento = $("#cbo_tipo_documento").val();
    var nroDoc;
    switch (tipo_documento) {
        case '6':
            nroDoc = $("#hfRUCPER").val();
            break;

        case '0':
            nroDoc = $("#hfOTROSPER").val();
            break;

        case '1':
            nroDoc = $("#hfDNIPER").val();
            break;

        case '4':
            nroDoc = $("#hfCARNETPER").val();
            break;

        case '7':
            nroDoc = $("#hfPASAPORTEPER").val();
            break;

        default:
            nroDoc = $("#hfRUCPER").val();
    }

    if (nroDoc === "" || nroDoc === "0") {
        $("#txtNroDctoProveedor").val("");
        $("#txtNroDctoProveedor").attr("placeholder", "Nro. ");
    } else {
        $("#txtNroDctoProveedor").val(nroDoc);
    }
}

function limpiarHf() {
    $("#hfRUCPER").val("");
    $("#hfOTROSPER").val("");
    $("#hfDNIPER").val("");
    $("#hfCARNETPER").val("");
    $("#hfPASAPORTEPER").val("");
    $("#txtNroDctoProveedor").val("");
}

var deleteDetalle = function (item) {
    for (var i = 0; i < detallesGasto.length; i++) {
        if (detallesGasto[i].ITEM == item) {
            //console.log("SI");            
            dTotal = dTotal - parseFloat(detallesGasto[i].MONTO);
            detallesGasto.splice(i, 1);
            //$("#txt_monto").val(dTotal);
            CalcularDetraccion();

            parseFloat($("#txt_monto").val(dTotal)).toFixed(2);
            parseFloat($("#txt_importePagar").val(dTotal - parseFloat($("#txt_detraccion").val()))).toFixed(2);

            $('#txt_retencion').val(0);

            actualizarRetencionRenta();
            habilitarNroSuspencion($('#chk_retencionrenta').prop('checked'));
        }
    }

    if (detallesGasto.length > 0) {
        oTable.fnClearTable();
        oTable.fnAddData(detallesGasto);
        oTable.fnAdjustColumnSizing();
    } else {
        oTable.fnClearTable();
    }
}

var listarDetallesGasto = function (CODE) {

    var data = new FormData();
    data.append('OPCION', 'DETGAST');
    data.append('p_CODE', CODE);


    $.ajax({
        url: "vistas/CP/ajax/CPMPGAS.ashx?",
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    dTotal += datos[i].SUB_MONTO;
                    var item = i + 1;
                    objProd.ITEM = item;
                    objProd.COD_GASTO = datos[i].COD_GASTO;
                    objProd.GASTO = datos[i].GASTO;
                    objProd.COD_SUB_GASTO = datos[i].COD_SUB_GASTO;
                    objProd.SUB_GASTO = datos[i].SUB_GASTO;
                    objProd.CC_CAB = datos[i].CC_CAB;
                    objProd.CC_COSTO = datos[i].CC_COSTO;
                    objProd.CENTRO_COSTO = datos[i].CENTRO_COSTO;
                    objProd.GLOSA = datos[i].GLOSA;
                    objProd.CUENTA = datos[i].CUENTA;
                    objProd.DES_CUENTA = datos[i].DES_CUENTA;
                    objProd.COD_OPERACION = datos[i].COD_OPERACION;
                    objProd.DES_OPERACION = datos[i].DES_OPERACION;
                    objProd.NOM_CUENTA = datos[i].NOM_CUENTA;
                    objProd.MONTO = datos[i].SUB_MONTO;
                    objProd.SUB_MONTO = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + datos[i].SUB_MONTO;
                    objProd.DETRACCION = datos[i].DETRACCION;
                    objProd.SUB_DETRACCION = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + datos[i].DETRACCION;
                    objProd.IND_RETENCION = datos[i].IND_RETENCION;
                    //objProd.RETENCION = datos[i].RETENCION;
                    //objProd.SUB_RETENCION = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + datos[i].RETENCION;
                    objProd.TOTAL_NETO = datos[i].TOTAL_NETO;
                    objProd.SUB_TOTAL_NETO = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + datos[i].TOTAL_NETO;

                    objAux = jQuery.parseJSON(JSON.stringify(objProd));
                    detallesGasto.push(objAux);
                }

                //console.log(detallesGasto);
                oTable.fnClearTable();
                oTable.fnAddData(detallesGasto);
                oTable.fnAdjustColumnSizing();

                CalcularDetraccion();

                parseFloat($("#txt_monto").val(dTotal)).toFixed(2);
                parseFloat($("#txt_importePagar").val(dTotal - parseFloat($("#txt_detraccion").val()))).toFixed(2);

                if (datos[0].IND_RETENCION === 'N' && $('#cbo_documento').val() !== '0002') {
                    $('#chk_retencionrenta').prop('disabled', true);
                } else {
                    $('#chk_retencionrenta').prop('disabled', false);
                    actualizarRetencionRenta(datos[0].IND_RETENCION);
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

//function VerificaExiste(p_pidm, p_dcto, p_serie, p_numero) {

//    if (p_dcto != '' && (p_serie != '' || p_numero != '')) {
//        var data = new FormData();

//        data.append("OPCION", "VERIFICA");

//        data.append("p_PIDM_BENEFICIARIO", p_pidm);
//        data.append("p_TIPO_DCTO", p_dcto);
//        data.append("p_SERIE", p_serie);
//        data.append("p_NUMERO", p_numero);

//        $.ajax({
//            url: "vistas/CP/ajax/CPMPGAS.ASHX",
//            type: "post",
//            contentType: false,
//            data: data,
//            async: false,
//            processData: false,
//            cache: false,
//            success: function (datos) {
//                $("#hf_existe").val(datos);
//            },
//            error: function (msg) {
//                noexitoCustom("Error al Verificar Documento!");
//            }
//        });
//    }

//}

var confirmarGuardar = function () {
    confirmarRetencion().then(continuar => {
        if (continuar) {
            Guardar();
        }
    });
}
 
var Guardar = function () {

    var p_CONC_CODE = '';
    var p_CTLG_CODE = '';
    var p_DATO_FRECUENCIA = '';
    var p_DESC_GASTO = '';
    var p_ESTADO_IND = '';
    var p_FECHA_UNICA = '';
    var p_FRECUENCIA = '';
    var p_MONTO = "";
    var p_PERIOCIDAD = "";
    var p_PIDM_BENEFICIARIO = "";
    var p_SCONC_CODE = "";
    var p_SCSL_CODE = "";
    var p_DEDUCIBLE_IND = '';
    var p_TIPO_IND = "";
    var p_USUA_ID = "";
    var p_NRO_DCTO_REF = "";
    var p_CTA_CONTABLE = "";
    var p_CENTRO_COSTO = "";
    var p_CENTRO_COSTO_CABECERA = "";
    var p_TIPO_DCTO = "";
    var p_NUMERO = "";
    var p_SERIE = "";
    var p_COMPRAS_IND = "";
    var p_DETALLE_GASTO = "";
    var p_DECLARA = "";
    var p_FECHA_VENCI = "";
    var p_DETRACCION_IND = 'N';
    var p_IMPORTE_DETRACCION = 0;
    var p_RETENCION_IND = 'N';
    var p_IMPORTE_RETENCION = 0;
    var p_NRO_SUSPENCION = 0;
    var p_IMPORTE_PAGAR = 0;

    //var p_COD_OPERACION = "";
    //var p_DES_OPERACION = "";

    p_DECLARA = (typeof $('#cboDeclara').val() == "undefined" ? "0002" : $('#cboDeclara').val());
    p_FECHA_VENCI = $.trim($('#txtFechaVenc').val());
    p_DETALLE_GASTO = obtenerDetalle();



    //console.log(p_DETALLE_GASTO);
    p_CONC_CODE = $.trim(detallesGasto[0].COD_GASTO);
    p_CTA_CONTABLE = detallesGasto[0].CUENTA;
    p_DEDUCIBLE_IND = $("#chkDeducible").is(':checked') ? 'S' : 'N';
    //p_DESC_GASTO = detallesGasto[0].GASTO;
    p_DESC_GASTO = $("#txt_descripcion").val();
    p_CENTRO_COSTO_CABECERA = detallesGasto[0].CC_CAB;
    p_CENTRO_COSTO = detallesGasto[0].CC_COSTO;
    p_SCONC_CODE = $.trim(detallesGasto[0].COD_SUB_GASTO);
    p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    p_ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    p_COMPRAS_IND = $("#chk_compras").is(':checked') ? 'S' : 'N';
    p_FECHA_UNICA = $.trim($('#txt_fec_unica').val());
    p_TIPO_DCTO = $.trim($('#cbo_documento').val());
    p_SERIE = $.trim($('#txt_serie').val());



    //if (p_SERIE.length == 1) {
    //    p_SERIE = ("000" + p_SERIE).slice(-4);
    //} else if (p_SERIE.length == 2) {
    //    p_SERIE = ("00" + p_SERIE).slice(-4);
    //} else if (p_SERIE.length == 3){
    //    p_SERIE = ("0" + p_SERIE).slice(-4);
    //} else {
    //    p_SERIE;
    //}

    p_NUMERO = $.trim($('#txt_dcto_ref').val());
    p_FRECUENCIA = $("#cbo_frecuencia").val();

    if (p_FRECUENCIA == 'S') {
        p_DATO_FRECUENCIA = $.trim($('#cbo_semana').val());
    }
    if (p_FRECUENCIA == 'M') {
        p_DATO_FRECUENCIA = $.trim($('#cbo_mes').val());
    }


    p_MONTO = $.trim(ReplaceTotal(",", "", $('#txt_monto').val()));

    if ($("#rbProgramado").is(':checked')) {
        p_PERIOCIDAD = 'P';
    }
    if ($("#rbUnico").is(':checked')) {
        p_PERIOCIDAD = 'U';
    }

    p_PIDM_BENEFICIARIO = $.trim($("#hfpidm").val());

    p_SCSL_CODE = $.trim($('#slcSucural').val());

    if ($("#rbtipo_fijo").is(':checked')) {
        p_TIPO_IND = 'F'
    }
    if ($("#rbtipo_variable").is(':checked')) {
        p_TIPO_IND = 'V'
    }

    p_USUA_ID = $.trim($('#ctl00_txtus').val());
    p_NRO_DCTO_REF = $.trim($('#txt_dcto_ref').val());

    if ($("#txt_detraccion").val() != '' && $("#txt_detraccion").val() != 0 && !isNaN(parseFloat($("#txt_detraccion").val()))) {
        p_DETRACCION_IND = 'S';
        p_IMPORTE_DETRACCION = parseFloat($("#txt_detraccion").val()).toFixed(2);
    }

    if ($("#chk_retencionrenta").is(':checked') && $("#txt_retencion").val() != '' && $("#txt_retencion").val() != 0 && !isNaN(parseFloat($("#txt_retencion").val()))) {
        p_RETENCION_IND = 'S';
        p_IMPORTE_RETENCION = parseFloat($("#txt_retencion").val()).toFixed(2);
    }

    if (!$("#chk_retencionrenta").is(':checked') && $("#cbo_documento").val() === "0002" && prmtSURE <= parseFloat($('#txt_monto').val())) {
        p_NRO_SUSPENCION = $("#txt_nroSuspencion").val().toString();
    }

    p_IMPORTE_PAGAR = parseFloat($("#txt_importePagar").val()).toFixed(2);
    var data = new FormData();

    data.append("OPCION", "G");
    data.append("p_CONC_CODE", p_CONC_CODE);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_DATO_FRECUENCIA", p_DATO_FRECUENCIA);
    data.append("p_DESC_GASTO", p_DESC_GASTO);
    data.append("p_DEDUCIBLE_IND", p_DEDUCIBLE_IND);
    data.append("p_ESTADO_IND", p_ESTADO_IND);
    data.append("p_FECHA_UNICA", p_FECHA_UNICA);
    data.append("p_FRECUENCIA", p_FRECUENCIA);
    data.append("p_MONTO", p_MONTO);
    data.append("p_PERIOCIDAD", p_PERIOCIDAD);
    data.append("p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO);
    data.append("p_SCONC_CODE", p_SCONC_CODE);
    data.append("p_SCSL_CODE", p_SCSL_CODE);
    data.append("p_TIPO_IND", p_TIPO_IND);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_NRO_DCTO_REF", p_NRO_DCTO_REF);
    data.append("p_CTA_CONTABLE", p_CTA_CONTABLE);
    data.append("p_MONE_CODE", $("#cbo_moneda").val());
    data.append("p_CENTRO_COSTO", p_CENTRO_COSTO);
    data.append("p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA);
    data.append("p_TIPO_DCTO", p_TIPO_DCTO);
    data.append("p_SERIE", p_SERIE);
    data.append("p_NUMERO", p_NUMERO);
    data.append("p_COMPRAS_IND", p_COMPRAS_IND);
    data.append("p_DETRACCION_IND", p_DETRACCION_IND);
    data.append("p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION);
    data.append("p_RETENCION_IND", p_RETENCION_IND);
    data.append("p_IMPORTE_RETENCION", p_IMPORTE_RETENCION);
    data.append("p_NRO_SUSPENCION", p_NRO_SUSPENCION);
    data.append("p_IMPORTE_PAGAR", p_IMPORTE_PAGAR);
    //
    if (typeof ($("#cbo_periodo").val()) !== "undefined") {
        data.append("p_MES_TRIB", ($("#cbo_periodo").val().split("-")[0] === "" ? $("#txt_fec_unica").val().split("/")[1] : $("#cbo_periodo").val().split("-")[0]));
        data.append("p_ANIO_TRIB", (typeof $("#cbo_periodo").val().split("-")[1] == "undefined" ? $("#txt_fec_unica").val().split("/")[2] : $("#cbo_periodo").val().split("-")[1]));
    }
    var p_TIPO_BIEN = "";
    //var p_OPERACION = "";
    if ($("#chk_compras").is(':checked')) {
        p_TIPO_BIEN = $("#cboTipoBien").val();
        //p_OPERACION = $("#cbx_destino").val();
    } else {
        p_TIPO_BIEN = "0001";
        //p_OPERACION = "DSTGRA";
    }
    data.append("p_HABIDO_IND", HABIDO_IND);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    //data.append("p_OPERACION", p_OPERACION);
    data.append("p_DETALLE_GASTO", p_DETALLE_GASTO);
    data.append("p_DECLARA", p_DECLARA);
    data.append("p_FECHA_VENCI", p_FECHA_VENCI);
    //if (p_TIPO_DCTO == "") {
    //    var arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "slcEmpresa", "slcSucural", "cbo_gasto", "cbo_subgasto", "txt_serie", "txt_dcto_ref", "cbo_documento"];

    //} else {
    //    var arraY = ["txt_descripcion", "txt_serie", "txt_dcto_ref", "cbo_moneda", "txt_monto", "txt_beneficiario", "slcEmpresa", "slcSucural", "cbo_gasto", "cbo_subgasto"];
    //}
    var arraY = [];
    if ($("#chk_sindcto").is(':checked')) {
        arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "txtNroDctoProveedor", "slcEmpresa", "slcSucural", "txtFechaVenc"];
    } else {
        arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "txtNroDctoProveedor", "slcEmpresa", "slcSucural", "txt_serie", "txt_dcto_ref", "cbo_documento", "txtFechaVenc"];
    }

    if ($("#rbUnico").is(":checked")) {
        arraY.slice(arraY.indexOf("cbo_semana"), 1);
        arraY.slice(arraY.indexOf("cbo_mes"), 1);
        arraY.push("txt_fec_unica")

    }
    if ($("#rbProgramado").is(":checked")) {
        arraY.slice(arraY.indexOf("txt_fec_unica"), 1);
        if (p_FRECUENCIA == "S") {
            arraY.push("cbo_semana")
            arraY.slice(arraY.indexOf("cbo_mes"), 1);
        }
        if (p_FRECUENCIA == "M") {
            arraY.push("cbo_mes")
            arraY.slice(arraY.indexOf("cbo_semana"), 1);
        }
    }

    if ($("#chk_compras").is(':checked')) {
        arraY.push("cboTipoBien");
        arraY.push("cbx_destino");
        //1
        if ($("#cbo_periodo").val() !== undefined) {
            if (!VerificaFechaPeriodo()) {
                infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                $("#cbo_periodo").focus();
                return false;
            }
        }

    }

    //VerificaExiste(p_PIDM_BENEFICIARIO, p_TIPO_DCTO, p_SERIE, p_NUMERO);

    if (vErrors(arraY)) {
        Bloquear("ventana");
        setTimeout(function () {
            //OPCION: G
            $.ajax({
                url: "vistas/CP/ajax/CPMPGAS.ASHX",
                type: "post",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null && datos != "" && datos != "X" && datos != "ERROR") {

                        $("#txtCodigo").val(datos);
                        window.history.pushState("Object", "REGISTRO PROVISION DE GASTOS", "/Default.aspx?f=cpmpgas&codigo=" + datos);

                        if (HABIDO_IND == "1") {
                            $("#lblHabido").html("Condición: HABIDO");
                        } else {
                            $("#lblHabido").html("Condición: NO HABIDO");
                        }
                        //----
                        $("#estado").slideDown();
                        $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                        var html = "<i class='icon-asterisk'></i>&nbsp;&nbsp;ESTADO&nbsp;:&nbsp;REGISTRADO"
                        $("#estado").children().children().html(html);
                        //------

                        var cod = $("#txtCodigo").val().substring(0, 3);
                        if (cod == "PRO") {//GASTO PROGRAMADO
                            $("#guardar").html("<i class='icon-pencil'></i> Modificar");
                            $("#guardar").attr("href", "javascript:confirmarModificarP();");
                        }
                        if (cod == "GST") {//GASTO UNICO
                            $("#guardar").html("<i class='icon-pencil'></i> Modificar");
                            $("#guardar").attr("href", "javascript:confirmarModificar();");
                        }
                        $("#btn_aprobar").hide();
                        $(".btnEliminarDetalle").attr("style", "display:none");
                        $("#add_detalle").attr("disabled", true);
                        $("#btnBuscarCentroCto").attr("disabled", true);
                        $("#txtFechaVenc").attr("disabled", true);
                        exito();
                    }
                    if (datos == "X") {
                        noexitoCustom("DISCULPA! La provisión con el número de documento ya ha sido registrada anteriormente en el sistema.")
                    }
                    if (datos == "ERROR") {//ERROR DESDE BD                        
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexitoCustom("Error al Registrar!")
                }
            });

        }, 2000);
    }
}

let VerificaFechaPeriodo = function () {
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

var confirmarModificar = function () {
    confirmarRetencion().then(continuar => {
        if (continuar) {
            Modificar();
        }
    });
}

//MODIFICAR GASTO  UNICO
var Modificar = function () {

    var p_CONC_CODE = '';
    var p_CTLG_CODE = '';
    var p_DATO_FRECUENCIA = '';
    var p_DESC_GASTO = '';
    var p_ESTADO_IND = '';
    var p_FECHA_UNICA = '';
    var p_FRECUENCIA = '';
    var p_MONTO = "";
    var p_PERIOCIDAD = "";
    var p_PIDM_BENEFICIARIO = "";
    var p_DEDUCIBLE_IND = '';
    var p_SCONC_CODE = "";
    var p_SCSL_CODE = "";
    var p_TIPO_IND = "";
    var p_USUA_ID = "";
    var p_CTA_CONTABLE = "";
    var p_CENTRO_COSTO = "";
    var p_CENTRO_COSTO_CABECERA = "";
    var p_TIPO_DCTO = "";
    var p_NUMERO = "";
    var p_SERIE = "";
    var p_COMPRAS_IND = "";
    var p_DETALLE_GASTO = "";
    var p_DECLARA = "";
    var p_FECHA_VENCI = "";
    var p_DETRACCION_IND = 'N';
    var p_IMPORTE_DETRACCION = 0;
    var p_RETENCION_IND = 'N';
    var p_IMPORTE_RETENCION = 0;
    var p_NRO_SUSPENCION = "";
    var p_IMPORTE_PAGAR = 0;

    p_DECLARA = p_DECLARA = (typeof $('#cboDeclara').val() == "undefined" ? "0002" : $('#cboDeclara').val());
    p_FECHA_VENCI = $.trim($('#txtFechaVenc').val());

    p_DETALLE_GASTO = obtenerDetalle();
    p_DEDUCIBLE_IND = $("#chkDeducible").is(':checked') ? 'S' : 'N';

    p_CONC_CODE = $.trim(detallesGasto[0].COD_GASTO);
    p_CTA_CONTABLE = detallesGasto[0].CUENTA;
    p_CENTRO_COSTO_CABECERA = detallesGasto[0].CC_CAB;
    p_CENTRO_COSTO = detallesGasto[0].CC_COSTO;
    p_SCONC_CODE = $.trim(detallesGasto[0].COD_SUB_GASTO);

    p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    //p_CTA_CONTABLE = $('#cbo_subgasto :selected').attr("cta");
    p_DESC_GASTO = $("#txt_descripcion").val();
    p_ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    p_COMPRAS_IND = $("#chk_compras").is(':checked') ? 'S' : 'N';
    p_FECHA_UNICA = $.trim($('#txt_fec_unica').val());

    //p_CENTRO_COSTO_CABECERA = $("#txt_centro_costo").data("CodCentroCostoCab");
    //p_CENTRO_COSTO = $("#txt_centro_costo").data("CodCentroCosto");

    p_TIPO_DCTO = $.trim($('#cbo_documento').val());
    p_SERIE = $.trim($('#txt_serie').val());
    p_NUMERO = $.trim($('#txt_dcto_ref').val());

    p_FRECUENCIA = $("#cbo_frecuencia").val();

    if (p_FRECUENCIA == 'S') {
        p_DATO_FRECUENCIA = $.trim($('#cbo_semana').val());
    }
    if (p_FRECUENCIA == 'M') {
        p_DATO_FRECUENCIA = $.trim($('#cbo_mes').val());
    }

    p_MONTO = $.trim(ReplaceTotal(",", "", $('#txt_monto').val()));

    if ($("#rbProgramado").is(':checked')) {
        p_PERIOCIDAD = 'P';
    }
    if ($("#rbUnico").is(':checked')) {
        p_PERIOCIDAD = 'U';
    }

    p_PIDM_BENEFICIARIO = $.trim($("#hfpidm").val());
    //p_SCONC_CODE = $.trim($('#cbo_subgasto').val());
    p_SCSL_CODE = $.trim($('#slcSucural').val());

    if ($("#rbtipo_fijo").is(':checked')) {
        p_TIPO_IND = 'F'
    }
    if ($("#rbtipo_variable").is(':checked')) {
        p_TIPO_IND = 'V'
    }
    p_USUA_ID = $.trim($('#ctl00_txtus').val());

    if ($("#txt_detraccion").val() != '' && $("#txt_detraccion").val() != 0 && !isNaN(parseFloat($("#txt_detraccion").val()))) {
        p_DETRACCION_IND = 'S';
        p_IMPORTE_DETRACCION = parseFloat($("#txt_detraccion").val()).toFixed(2);        
    }

    if ($("#chk_retencionrenta").is(':checked') && $("#txt_retencion").val() != '' && $("#txt_retencion").val() != 0 && !isNaN(parseFloat($("#txt_retencion").val()))) {
        p_RETENCION_IND = 'S';
        p_IMPORTE_RETENCION = parseFloat($("#txt_retencion").val()).toFixed(2);
    }

    if (!$("#chk_retencionrenta").is(':checked') && $("#cbo_documento").val() === "0002" && prmtSURE <= parseFloat($('#txt_monto').val())) {
        p_NRO_SUSPENCION = $("#txt_nroSuspencion").val().toString();
    }

    p_IMPORTE_PAGAR = parseFloat($("#txt_importePagar").val()).toFixed(2);

    var data = new FormData();
    data.append("OPCION", "AT");
    data.append("p_CONC_CODE", p_CONC_CODE);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_DATO_FRECUENCIA", p_DATO_FRECUENCIA);
    data.append("p_DESC_GASTO", p_DESC_GASTO);
    data.append("p_ESTADO_IND", p_ESTADO_IND);
    data.append("p_FECHA_UNICA", p_FECHA_UNICA);
    data.append("p_FRECUENCIA", p_FRECUENCIA);
    data.append("p_MONTO", p_MONTO);
    data.append("p_PERIOCIDAD", p_PERIOCIDAD);
    data.append("p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO);
    data.append("p_SCONC_CODE", p_SCONC_CODE);
    data.append("p_SCSL_CODE", p_SCSL_CODE);
    data.append("p_TIPO_IND", p_TIPO_IND);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_CTA_CONTABLE", p_CTA_CONTABLE);
    data.append("p_MONE_CODE", $("#cbo_moneda").val());
    data.append("p_CODE", $("#txtCodigo").val());
    data.append("p_DEDUCIBLE_IND", p_DEDUCIBLE_IND);
    data.append("p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA);
    data.append("p_CENTRO_COSTO", p_CENTRO_COSTO);
    data.append("p_TIPO_DCTO", p_TIPO_DCTO);
    data.append("p_SERIE", p_SERIE);
    data.append("p_NUMERO", p_NUMERO);
    data.append("p_COMPRAS_IND", p_COMPRAS_IND);
    data.append("p_DETALLE_GASTO", p_DETALLE_GASTO);
    data.append("p_DECLARA", p_DECLARA);
    data.append("p_FECHA_VENCI", p_FECHA_VENCI);
    data.append("p_DETRACCION_IND", p_DETRACCION_IND);
    data.append("p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION);
    data.append("p_RETENCION_IND", p_RETENCION_IND);
    data.append("p_IMPORTE_RETENCION", p_IMPORTE_RETENCION);
    data.append("p_NRO_SUSPENCION", p_NRO_SUSPENCION);
    data.append("p_IMPORTE_PAGAR", p_IMPORTE_PAGAR);

    var p_TIPO_BIEN = "";
    var p_OPERACION = "";
    if ($("#chk_compras").is(':checked')) {
        p_TIPO_BIEN = $("#cboTipoBien").val();
        p_OPERACION = $("#cbx_destino").val();
    } else {
        p_TIPO_BIEN = "0001";
        p_OPERACION = "DSTGRA";
    }
    data.append("p_HABIDO_IND", HABIDO_IND);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    data.append("p_OPERACION", p_OPERACION);


    var arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "txtNroDctoProveedor", "slcEmpresa", "slcSucural", "txtFechaVenc"];
    if ($("#rbUnico").is(":checked")) {
        arraY.slice(arraY.indexOf("cbo_semana"), 1);
        arraY.slice(arraY.indexOf("cbo_mes"), 1);
        arraY.push("txt_fec_unica")

    }
    if ($("#rbProgramado").is(":checked")) {
        arraY.slice(arraY.indexOf("txt_fec_unica"), 1);
        if (p_FRECUENCIA == "S") {
            arraY.push("cbo_semana")
            arraY.slice(arraY.indexOf("cbo_mes"), 1);
        }
        if (p_FRECUENCIA == "M") {
            arraY.push("cbo_mes")
            arraY.slice(arraY.indexOf("cbo_semana"), 1);
        }
    }

    if ($("#chk_sindcto").is(':checked')) {
        arraY.slice(arraY.indexOf("txt_serie"), 1);
        arraY.slice(arraY.indexOf("txt_dcto_ref"), 1);
        arraY.slice(arraY.indexOf("cbo_documento"), 1);
    } else {
        arraY.push("txt_serie")
        arraY.push("txt_dcto_ref")
        arraY.push("cbo_documento")
    }

    if ($("#chk_compras").is(':checked')) {
        arraY.push("cboTipoBien");
        arraY.push("cbx_destino");
    }



    if (vErrors(arraY)) {
        Bloquear("ventana");
        $.ajax({
            url: "vistas/CP/ajax/CPMPGAS.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "X") {
                    if (datos == "OK") {
                        exito();
                    }
                    if (datos == "E") {
                        $("#e").slideDown();
                        $("#estado").slideUp();
                        $("#acciones_generales").remove();
                    }
                }
                if (datos == "X") {
                    noexitoCustom("DISCULPA! La provisión con el número de documento ya ha sido registrada anteriormente en el sistema.")
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Registrar!")
            }
        });
    }

};

var confirmarModificarP = function () {
    confirmarRetencion().then(continuar => {
        if (continuar) {
            ModificarP();
        }
    });
}

//MODIFICAR GASTO PROGRAMADO
var ModificarP = function () {

    var p_CONC_CODE = '';
    var p_CTLG_CODE = '';
    var p_DATO_FRECUENCIA = '';
    var p_DESC_GASTO = '';
    var p_ESTADO_IND = '';
    var p_FECHA_UNICA = '';
    var p_FRECUENCIA = '';
    var p_MONTO = "";
    var p_PERIOCIDAD = "";
    var p_PIDM_BENEFICIARIO = "";
    var p_SCONC_CODE = "";
    var p_SCSL_CODE = "";
    var p_TIPO_IND = "";
    var p_USUA_ID = "";
    var p_CTA_CONTABLE = "";
    var p_CENTRO_COSTO = "";
    var p_CENTRO_COSTO_CABECERA = "";
    var p_TIPO_DCTO = "";
    var p_NUMERO = "";
    var p_SERIE = "";
    var p_COMPRAS_IND = "";

    p_CONC_CODE = $.trim($('#cbo_gasto').val());
    p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    p_CTA_CONTABLE = $('#cbo_subgasto :selected').attr("cta");
    p_DESC_GASTO = $("#txt_descripcion").val();
    p_ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    p_COMPRAS_IND = $("#chk_compras").is(':checked') ? 'S' : 'N';
    p_FECHA_UNICA = $.trim($('#txt_fec_unica').val());

    p_CENTRO_COSTO_CABECERA = $("#txt_centro_costo").data("CodCentroCostoCab");
    p_CENTRO_COSTO = $("#txt_centro_costo").data("CodCentroCosto");

    p_FRECUENCIA = $("#cbo_frecuencia").val();

    if (p_FRECUENCIA == 'S') {
        p_DATO_FRECUENCIA = $.trim($('#cbo_semana').val());
    }
    if (p_FRECUENCIA == 'M') {
        p_DATO_FRECUENCIA = $.trim($('#cbo_mes').val());
    }

    p_TIPO_DCTO = $.trim($('#cbo_documento').val());
    p_SERIE = $.trim($('#txt_serie').val());
    p_NUMERO = $.trim($('#txt_dcto_ref').val());

    p_MONTO = $.trim(ReplaceTotal(",", "", $('#txt_monto').val()));

    if ($("#rbProgramado").is(':checked')) {
        p_PERIOCIDAD = 'P';
    }
    if ($("#rbUnico").is(':checked')) {
        p_PERIOCIDAD = 'U';
    }


    p_PIDM_BENEFICIARIO = $.trim($("#hfpidm").val());
    p_SCONC_CODE = $.trim($('#cbo_subgasto').val());
    p_SCSL_CODE = $.trim($('#slcSucural').val());

    if ($("#rbtipo_fijo").is(':checked')) {
        p_TIPO_IND = 'F'
    }
    if ($("#rbtipo_variable").is(':checked')) {
        p_TIPO_IND = 'V'
    }

    p_USUA_ID = $.trim($('#ctl00_txtus').val());



    var data = new FormData();

    data.append("OPCION", "A");
    data.append("p_CONC_CODE", p_CONC_CODE);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_DATO_FRECUENCIA", p_DATO_FRECUENCIA);
    data.append("p_DESC_GASTO", p_DESC_GASTO);
    data.append("p_ESTADO_IND", p_ESTADO_IND);
    data.append("p_FECHA_UNICA", p_FECHA_UNICA);
    data.append("p_FRECUENCIA", p_FRECUENCIA);
    data.append("p_MONTO", p_MONTO);
    data.append("p_PERIOCIDAD", p_PERIOCIDAD);
    data.append("p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO);
    data.append("p_SCONC_CODE", p_SCONC_CODE);
    data.append("p_SCSL_CODE", p_SCSL_CODE);
    data.append("p_TIPO_IND", p_TIPO_IND);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_CTA_CONTABLE", p_CTA_CONTABLE);
    data.append("p_MONE_CODE", $("#cbo_moneda").val());
    data.append("p_CODE", $("#txtCodigo").val());
    data.append("p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA);
    data.append("p_CENTRO_COSTO", p_CENTRO_COSTO);

    data.append("p_TIPO_DCTO", p_TIPO_DCTO);
    data.append("p_SERIE", p_SERIE);
    data.append("p_NUMERO", p_NUMERO);
    data.append("p_COMPRAS_IND", p_COMPRAS_IND);

    var p_TIPO_BIEN = "";
    var p_OPERACION = "";
    if ($("#chk_compras").is(':checked')) {
        p_TIPO_BIEN = $("#cboTipoBien").val();
        p_OPERACION = $("#cbx_destino").val();
    } else {
        p_TIPO_BIEN = "0001";
        p_OPERACION = "DSTGRA";
    }
    data.append("p_HABIDO_IND", HABIDO_IND);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    data.append("p_OPERACION", p_OPERACION);

    var arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "txtNroDctoProveedor", "slcEmpresa", "slcSucural", "cbo_gasto", "cbo_subgasto"];
    if ($("#rbUnico").is(":checked")) {
        arraY.slice(arraY.indexOf("cbo_semana"), 1);
        arraY.slice(arraY.indexOf("cbo_mes"), 1);
        arraY.push("txt_fec_unica")

    }
    if ($("#rbProgramado").is(":checked")) {
        arraY.slice(arraY.indexOf("txt_fec_unica"), 1);
        if (p_FRECUENCIA == "S") {
            arraY.push("cbo_semana")
            arraY.slice(arraY.indexOf("cbo_mes"), 1);
        }
        if (p_FRECUENCIA == "M") {
            arraY.push("cbo_mes")
            arraY.slice(arraY.indexOf("cbo_semana"), 1);
        }
    }

    if ($("#chk_compras").is(':checked')) {
        arraY.push("cboTipoBien");
        arraY.push("cbx_destino");
    }

    if (vErrors(arraY)) {

        Bloquear("ventana");

        $.ajax({
            url: "vistas/CP/ajax/CPMPGAS.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "") {

                    if (datos == "OK") {

                        exito();
                    }
                    if (datos == "E") {
                        $("#e").slideDown();
                        $("#estado").slideUp();
                        $("#acciones_generales").remove();
                    }

                } else { noexitoCustom("Error al actualizar") }

            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Registrar!")
            }
        });
    }
};

function actualizarRetencionRenta(indRetencion) {
    var importePago = parseFloat($('#txt_importePagar').val());
    var chkRetencionRenta = $('#chk_retencionrenta');

    function funcionCheckbox(isEnabled, isChecked) {
        chkRetencionRenta.prop('disabled', !isEnabled);
        if (isChecked !== undefined) {
            chkRetencionRenta.prop('checked', isChecked);
        }
        $.uniform.update('#chk_retencionrenta');
    }

    if ($('#cbo_documento').val() == '0002' && prmtSURE <= importePago) {
        if (indRetencion) {
            funcionCheckbox(true, indRetencion === 'S');
            calcularRetencionRenta(importePago);
        } else {
            funcionCheckbox(true, true);
            calcularRetencionRenta(importePago);
        }
    } else {
        funcionCheckbox(false, false);
        $('#txt_retencion').val(0);
    }
}


function calcularRetencionRenta(importePago) {
    var valorRetencionRenta = parseFloat(importePago * 0.08);
    if ($('#chk_retencionrenta').is(':checked')) {
        $('#txt_retencion').val(valorRetencionRenta.toFixed(2));
        importePago = importePago - valorRetencionRenta;
        $('#txt_importePagar').val(importePago.toFixed(2))
    } else {
        $('#txt_retencion').val(0);
        $('#txt_importePagar').val(importePago);
    }
}

function habilitarNroSuspencion(isChecked) {
    var $nroSuspencion = $("#txt_nroSuspencion");

    if (!isChecked && $("#cbo_documento").val() === "0002" && prmtSURE <= parseFloat($('#txt_monto').val())) {
        $nroSuspencion.attr("disabled", false);
        $nroSuspencion.attr({
            "pattern": "\\d{8}",
            "title": "Nro operacion formulario 1609",
            "placeholder": "Nro operacion"
        });
    } else {
        $nroSuspencion.attr("disabled", true);
        $nroSuspencion.val("")
            .removeAttr("pattern")
            .removeAttr("title")
            .removeAttr("placeholder");
    }
}


var Aprobar = function () {

    if (detallesGasto.length > 0) {
        var p_CONC_CODE = '';
        var p_CTLG_CODE = '';
        var p_DATO_FRECUENCIA = '';
        var p_DESC_GASTO = '';
        var p_ESTADO_IND = '';
        var p_DEDUCIBLE_IND = '';
        var p_FECHA_UNICA = '';
        var p_FRECUENCIA = '';
        var p_MONTO = "";
        var p_PERIOCIDAD = "";
        var p_PIDM_BENEFICIARIO = "";
        var p_SCONC_CODE = "";
        var p_SCSL_CODE = "";
        var p_TIPO_IND = "";
        var p_USUA_ID = "";
        var p_NRO_DCTO_REF = "";
        var p_CTA_CONTABLE = "";
        var p_CENTRO_COSTO = "";
        var p_CENTRO_COSTO_CABECERA = "";
        var p_TIPO_DCTO = "";
        var p_NUMERO = "";
        var p_SERIE = "";
        var p_COMPRAS_IND = "";
        var p_GASTO_CONCATENADO = "";
        var p_DETALLE_GASTO = "";
        var p_DECLARA = "";
        var p_FECHA_VENCI = "";
        var p_DETRACCION_IND = 'N';
        var p_IMPORTE_DETRACCION = 0;
        var p_RETENCION_IND = 'N';
        var p_IMPORTE_RETENCION = 0;
        var p_NRO_SUSPENCION = "";
        var p_IMPORTE_PAGAR = 0;

        p_DECLARA = p_DECLARA = (typeof $('#cboDeclara').val() == "undefined" ? "0002" : $('#cboDeclara').val());
        p_FECHA_VENCI = $.trim($('#txtFechaVenc').val());

        p_DETALLE_GASTO = obtenerDetalle();
        //console.log(detallesGasto);

        p_CONC_CODE = $.trim(detallesGasto[0].COD_GASTO);
        p_CTLG_CODE = $.trim($('#slcEmpresa').val());

        p_CTA_CONTABLE = detallesGasto[0].CUENTA;


        //p_DESC_GASTO = detallesGasto[0].GASTO;
        p_DESC_GASTO = $("#txt_descripcion").val();

        p_ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';

        p_DEDUCIBLE_IND = $("#chkDeducible").is(':checked') ? 'S' : 'N';

        p_COMPRAS_IND = $("#chk_compras").is(':checked') ? 'S' : 'N';
        p_FECHA_UNICA = $.trim($('#txt_fec_unica').val());

        p_CENTRO_COSTO_CABECERA = detallesGasto[0].CC_CAB;
        p_CENTRO_COSTO = detallesGasto[0].CC_COSTO;

        p_TIPO_DCTO = $.trim($('#cbo_documento').val());
        p_SERIE = $.trim($('#txt_serie').val());

        //if (p_SERIE.length == 1) {
        //    p_SERIE = ("000" + p_SERIE).slice(-4);
        //} else if (p_SERIE.length == 2) {
        //    p_SERIE = ("00" + p_SERIE).slice(-4);
        //} else if (p_SERIE.length == 3) {
        //    p_SERIE = ("0" + p_SERIE).slice(-4);
        //} else {
        //    p_SERIE;
        //}

        p_NUMERO = $.trim($('#txt_dcto_ref').val());
        p_FRECUENCIA = $("#cbo_frecuencia").val();

        if (p_FRECUENCIA == 'S') {
            p_DATO_FRECUENCIA = $.trim($('#cbo_semana').val());
        }
        if (p_FRECUENCIA == 'M') {
            p_DATO_FRECUENCIA = $.trim($('#cbo_mes').val());
        }

        p_MONTO = $.trim(ReplaceTotal(",", "", $('#txt_monto').val()));

        if ($("#rbProgramado").is(':checked')) {
            p_PERIOCIDAD = 'P';
        }
        if ($("#rbUnico").is(':checked')) {
            p_PERIOCIDAD = 'U';
        }

        p_PIDM_BENEFICIARIO = $.trim($("#hfpidm").val());
        p_SCONC_CODE = $.trim(detallesGasto[0].COD_SUB_GASTO);
        p_SCSL_CODE = $.trim($('#slcSucural').val());

        if ($("#rbtipo_fijo").is(':checked')) {
            p_TIPO_IND = 'F'
        }
        if ($("#rbtipo_variable").is(':checked')) {
            p_TIPO_IND = 'V'
        }

        p_USUA_ID = $.trim($('#ctl00_txtus').val());
        p_NRO_DCTO_REF = $.trim($('#txt_dcto_ref').val());


        p_GASTO_CONCATENADO = detallesGasto[0].GASTO + " " + detallesGasto[0].SUB_GASTO

        var p_MES_TRIB = "";
        //if (p_COMPRAS_IND == 'S') { //DPORTA
        p_MES_TRIB = $("#cbo_periodo").val().split("-")[0];
        //}

        var p_ANIO_TRIB = "";
        //if (p_COMPRAS_IND == 'S') { // DPORTA
        p_ANIO_TRIB = $("#cbo_periodo").val().split("-")[1];
        //}

        if ($("#txt_detraccion").val() != '' && $("#txt_detraccion").val() != 0 && !isNaN(parseFloat($("#txt_detraccion").val()))) {
            p_DETRACCION_IND = 'S';
            p_IMPORTE_DETRACCION = parseFloat($("#txt_detraccion").val()).toFixed(2);            
        }

        if ($("#chk_retencionrenta").is(':checked') && $("#txt_retencion").val() != '' && $("#txt_retencion").val() != 0 && !isNaN(parseFloat($("#txt_retencion").val()))) {
            p_RETENCION_IND = 'S';
            p_IMPORTE_RETENCION = parseFloat($("#txt_retencion").val()).toFixed(2);
        } 

        if (!$("#chk_retencionrenta").is(':checked') && $("#cbo_documento").val() === "0002" && prmtSURE <= parseFloat($('#txt_monto').val())) {
            p_NRO_SUSPENCION = $("#txt_nroSuspencion").val().toString();
        }

        p_IMPORTE_PAGAR = parseFloat($("#txt_importePagar").val()).toFixed(2);

        var data = new FormData();
        data.append("OPCION", "AP");
        data.append("p_CONC_CODE", p_CONC_CODE);
        data.append("p_CTLG_CODE", p_CTLG_CODE);
        data.append("p_DATO_FRECUENCIA", p_DATO_FRECUENCIA);
        data.append("p_DESC_GASTO", p_DESC_GASTO);
        data.append("p_ESTADO_IND", p_ESTADO_IND);
        data.append("p_FECHA_UNICA", p_FECHA_UNICA);
        data.append("p_DEDUCIBLE_IND", p_DEDUCIBLE_IND);
        data.append("p_FRECUENCIA", p_FRECUENCIA);
        data.append("p_MONTO", p_MONTO);
        data.append("p_PERIOCIDAD", p_PERIOCIDAD);
        data.append("p_PIDM_BENEFICIARIO", p_PIDM_BENEFICIARIO);
        data.append("p_SCONC_CODE", p_SCONC_CODE);
        data.append("p_SCSL_CODE", p_SCSL_CODE);
        data.append("p_TIPO_IND", p_TIPO_IND);
        data.append("p_USUA_ID", p_USUA_ID);
        data.append("p_NRO_DCTO_REF", p_NRO_DCTO_REF);
        data.append("p_CTA_CONTABLE", p_CTA_CONTABLE);
        data.append("p_MONE_CODE", $("#cbo_moneda").val());
        data.append("p_CENTRO_COSTO", p_CENTRO_COSTO);
        data.append("p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA);
        data.append("p_TIPO_DCTO", p_TIPO_DCTO);
        data.append("p_SERIE", p_SERIE);
        data.append("p_NUMERO", p_NUMERO);
        data.append("p_COMPRAS_IND", p_COMPRAS_IND);
        data.append("p_GASTO_CONCATENADO", p_GASTO_CONCATENADO);
        data.append("p_MES_TRIB", (p_MES_TRIB === "" ? $("#txt_fec_unica").val().split("/")[1] : p_MES_TRIB));
        data.append("p_ANIO_TRIB", (typeof p_ANIO_TRIB == "undefined" ? $("#txt_fec_unica").val().split("/")[2] : p_ANIO_TRIB));
        data.append("p_DETALLE_GASTO", p_DETALLE_GASTO);
        data.append("p_DECLARA", p_DECLARA);
        data.append("p_FECHA_VENCI", p_FECHA_VENCI);
        data.append("p_DETRACCION_IND", p_DETRACCION_IND);
        data.append("p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION);
        data.append("p_RETENCION_IND", p_RETENCION_IND);
        data.append("p_IMPORTE_RETENCION", p_IMPORTE_RETENCION);
        data.append("p_NRO_SUSPENCION", p_NRO_SUSPENCION);
        data.append("p_IMPORTE_PAGAR", p_IMPORTE_PAGAR);

        var p_TIPO_BIEN = "";
        //var p_OPERACION = "";
        if ($("#chk_compras").is(':checked')) {
            p_TIPO_BIEN = $("#cboTipoBien").val();
            // p_OPERACION = $("#cbx_destino").val();
        } else {
            p_TIPO_BIEN = "0001";
            //p_OPERACION = "DSTGRA";
        }
        data.append("p_HABIDO_IND", HABIDO_IND);
        data.append("p_TIPO_BIEN", p_TIPO_BIEN);
        //data.append("p_OPERACION", p_OPERACION);

        arraY = [];
        //if (p_TIPO_DCTO == "") {
        //    var arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "slcEmpresa", "slcSucural", "cbo_gasto", "cbo_subgasto", "txt_centro_costo"];
        //} else {
        //    var arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "slcEmpresa", "slcSucural", "cbo_gasto", "cbo_subgasto", "txt_centro_costo", "txt_serie", "txt_dcto_ref"];
        //}

        if ($("#chk_sindcto").is(':checked')) {
            var arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "txtNroDctoProveedor", "slcEmpresa", "slcSucural", "txtFechaVenc"];
        } else {
            var arraY = ["txt_descripcion", "cbo_moneda", "txt_monto", "txt_beneficiario", "txtNroDctoProveedor", "slcEmpresa", "slcSucural", "txt_serie", "txt_dcto_ref", "cbo_documento", "txtFechaVenc"];
        }

        if ($("#rbUnico").is(":checked")) {
            arraY.slice(arraY.indexOf("cbo_semana"), 1);
            arraY.slice(arraY.indexOf("cbo_mes"), 1);
            arraY.push("txt_fec_unica")
        }

        if ($("#rbProgramado").is(":checked")) {
            arraY.slice(arraY.indexOf("txt_fec_unica"), 1);
            if (p_FRECUENCIA == "S") {
                arraY.push("cbo_semana")
                arraY.slice(arraY.indexOf("cbo_mes"), 1);
            }
            if (p_FRECUENCIA == "M") {
                arraY.push("cbo_mes")
                arraY.slice(arraY.indexOf("cbo_semana"), 1);
            }
        }

        if ($("#chk_compras").is(':checked')) {
            arraY.push("cbo_periodo");
            arraY.push("cboTipoBien");
            arraY.push("cbx_destino");

            //2
            if ($("#cbo_periodo").val() !== undefined) {
                if (!VerificaFechaPeriodo()) {
                    infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                    $("#cbo_periodo").focus();
                    return false;
                }
            }

        } else {
            var index = arraY.indexOf("cbo_periodo")
            arraY.splice(index, 1)
        }

        //VerificaExiste(p_PIDM_BENEFICIARIO, p_TIPO_DCTO, p_SERIE, p_NUMERO);
        //if ($("#hf_existe").val() == 0) {

        if (vErrors(arraY)) {
            Bloquear("ventana");
            setTimeout(function () {
                //("OPCION", "AP");           
                $.ajax({
                    url: "vistas/CP/ajax/CPMPGAS.ASHX",
                    type: "post",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        if (datos != null && datos != "" && datos != "X") {

                            if (datos.split(",")[0] == "OK") {
                                $(".btnEliminarDetalle").attr("style", "display:none");
                                $("#btnGenerarAsiento").attr("style", "display:display");
                                $("#add_detalle").attr("disabled", true);
                                $("#btnBuscarCentroCto").attr("disabled", true);
                                exito();
                                $("#txtCodigo").val(datos.split(",")[1])
                                $(".limpiar").attr("disabled", true)
                                $("#txtFechaVenc").attr("disabled", true);
                                $("#guardar").remove();
                                $("#btn_aprobar").remove();
                                $("#estado").show();

                                if (HABIDO_IND == "1") {
                                    $("#lblHabido").html("Condición: HABIDO");
                                } else {
                                    $("#lblHabido").html("Condición: NO HABIDO");
                                }

                                $("#Label5").text('EL PROCESO DE APROBACIÓN SE REALIZÓ CORRECTAMENTE');

                                if (prmtACON == "SI") {
                                    var sCodGasto = $("#txtCodigo").val();
                                    sCodGasto = $.trim(sCodGasto);
                                    var oDocGasto = fnGetGasto(sCodGasto);

                                    vAsientoContable.sCodDoc = sCodGasto;
                                    vAsientoContable.objDoc = oDocGasto;

                                    //Si el usuario lo ve necesario, se puede deshabilitar la retencion de la renta a pesar de cumplir con las condiciones necesarias
                                    $('#chk_retencionrenta').is(':checked') ? p_indRR = 'S' : p_indRR = 'N';

                                    if ($('#cbo_documento').val() == '0002' && prmtSURE <= parseFloat($('#txt_monto').val()) && p_indRR === 'S') {
                                        vAsientoContable.indRR = p_indRR;
                                        vAsientoContable.prmtSURE = prmtSURE;
                                    }

                                    if (p_DEDUCIBLE_IND == "S") {
                                        $('#btnGenerarAsiento').click();
                                    } else {
                                        $("#btnGenerarAsiento").attr("style", "display:display");
                                    }

                                } else {
                                    var sCodGasto = $("#txtCodigo").val();
                                    sCodGasto = $.trim(sCodGasto);
                                    var oDocGasto = fnGetGasto(sCodGasto);
                                    fnCargaTablaCuentasC(sCodGasto, oDocGasto, sCodGasto); //CAMBIO AVENGER
                                }
                            }
                            else {
                                $("#estado").show();
                                $("#Label5").text(datos);
                                alertCustom(datos);
                            }

                        }
                        if (datos == "X") {
                            noexitoCustom("DISCULPA! La provisión con el número de documento ya ha sido registrada anteriormente en el sistema.")
                        }

                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        noexitoCustom("Error al Registrar!")
                    }
                });

            }, 1000);
        }

    } else {
        infoCustom('No existe gasto agregado. Agregue un gasto');
    }
    //} else {
    //    alertCustom("El documento ingresado ya se encuentra registrado!!!");
    //}
}

var ConfirmarAprobacion = function () {
    if ($("#chk_sindcto").is(':checked')) {
        $("#modal-confirmacion").modal("show");
    } else {
        confirmarRetencion().then(continuar => {
            if (continuar) {
                Aprobar();
            }
        });
    }
}

var confirmarRetencion = function () {
    var nroDigitos = /^\d{8}$/.test($('#txt_nroSuspencion').val().trim()); 
    return new Promise((resolve) => {
        if ($('#cbo_documento').val() == '0002' && prmtSURE <= parseFloat($('#txt_monto').val())) {
            if (!$("#chk_retencionrenta").is(':checked') && !vErrors("txt_nroSuspencion")) {
                resolve(false);
            }
            else if (!$("#chk_retencionrenta").is(':checked') && !nroDigitos){
                alertCustom("La operación <b>NO</b> se realizó!<br/> Ingrese el nro de suspencion en el formato correcto!");
                resolve(false);
            }
            else {
                $("#ModalRetencion").modal('show');

                $("#btnNO").one("click", function () {
                    $("#ModalRetencion").modal("hide");
                    resolve(false);
                });

                $("#btnOk").one("click", function () {
                    $("#ModalRetencion").modal("hide");
                    resolve(true);
                });
            }
        } else {
            resolve(true);
        }
    });
}

var registrarAprobacion = function () {
    $("#modal-confirmacion").modal("hide");
    confirmarRetencion().then(continuar => {
        if (continuar) {
            Aprobar();
        }
    });
}

var obtenerDetalle = function () {
    var detalles = "";
    for (var i = 0; i < detallesGasto.length; i++) {
        detalles += detallesGasto[i].COD_GASTO + ";" +
            detallesGasto[i].GASTO + ";" +
            detallesGasto[i].COD_SUB_GASTO + ";" +
            detallesGasto[i].SUB_GASTO + ";" +
            detallesGasto[i].CUENTA + ";" +
            detallesGasto[i].NOM_CUENTA + ";" +
            detallesGasto[i].MONTO + ";" +
            detallesGasto[i].CC_CAB + ";" +
            detallesGasto[i].CC_COSTO + ";" +
            detallesGasto[i].GLOSA + ";" +
            detallesGasto[i].COD_OPERACION + ";" +
            detallesGasto[i].DES_OPERACION + ";" +
            detallesGasto[i].DETRACCION + ";" +
            detallesGasto[i].TOTAL_NETO +
            "||";
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


var fnCargaTablaCuentasC = function (sCodGasto, oDocGasto, sCodAsiento) {
    $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
        $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
            .done(function (script, textStatus) {
                vAsientoContable = LAsientoContable;
                vAsientoContable.sTipoMov = sCodModulo;
                vAsientoContable.sCodDoc = sCodGasto;
                vAsientoContable.objDoc = oDocGasto;
                vAsientoContable.init(sCodAsiento);
            });
    });

}

//DATOS SUNAT PARA INDICADOR HABIDO_IND
var HABIDO_IND = "0";
var DatosSunatCargados;
//var ajaxSunat = null;
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

// CALCULOS //DPORTA 17/01/2022

function CalcularDetraccion() {

    //if ($("#hfCompletoInd").val() == "N") {

        var parametroDetraccion = parseFloat($("#hfParamDetraccion").val());

        var montoParaDetraccion = 0; // en MOBA o MOAL segun cbo_moneda
        var detraccionActual = 0;
        for (var i = 0; i < detallesGasto.length; i++) {
            //Suma montos netos de aquellos productos que tengan detraccion
            if (parseFloat(detallesGasto[i].DETRACCION) > 0) {
                montoParaDetraccion += Math.round(parseFloat(detallesGasto[i].TOTAL_NETO));
                detraccionActual += Math.round(parseFloat(detallesGasto[i].DETRACCION));
            }
        }

        //Muestra detraccion MOAL / MOBA
        //var valorCambio = parseFloat($("#txt_valor_cambio").val());
        //var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());

        //$("#txt_detraccion").val(detraccionActual.toFixed(2));


        //var detraccionMoal, montoParaDetraccionMoal;
        //if ($("#cbo_moneda :selected").attr("data-tipo") == "MOAL") {
        //    var detraccionMoba = detraccionActual * valorCambioOfi;
        //    detraccionMoal = detraccionActual;
        //    detraccionActual = detraccionMoba;
        //    var montoParaDetraccionMoba = montoParaDetraccion * valorCambioOfi;
        //    montoParaDetraccionMoal = montoParaDetraccion;
        //    montoParaDetraccion = montoParaDetraccionMoba;
        //}

        //$(".simboloMoneda").html($("#cbo_moneda :selected").attr("simbolo"));

        if (montoParaDetraccion >= parametroDetraccion && montoParaDetraccion != 0) {

            //$('#chk_detraccion').prop('checked', true).parent().addClass('checked');
            if ($("#cbo_moneda :selected").attr("data-tipo") == "MOAL") {
                parseFloat($("#txt_detraccion").val(detraccionMoal));
            } else {
                parseFloat($("#txt_detraccion").val(detraccionActual));
            }

            //$("#txt_num_op_detrac,#txt_fec_comp_detrac").prop('disabled', false);
            //$('#chk_percepcion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
            //$('#txt_Percepcion, #txt_Retencion, #txt_num_comp_percep, #txt_estado_credito, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
            //$('#rbsinserie, #rbseriada').prop('disabled', true);
            //$('#rbsinserie').prop('checked', true).parent().addClass('checked');
            //$('#rbseriada').prop('checked', false).parent().removeClass('checked');
            //cargarCuentaDetraccion();
        }
        else {

            //if ($("#cbo_Empresa :selected").attr("agente-reten-ind") == "N" && $("#hfAgenteRetencionCliente").val() == "S") {//CAMBIO_RETENCION
            //    $('#chk_retencion').prop('checked', true).parent().addClass('checked');
            //    $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');

            //} else {
            //    $("#txt_Retencion").val("0.00");
            //}

            //$('#chk_detraccion').prop('checked', false).parent().removeClass('checked');
            //$("#txt_num_op_detrac, #txt_fec_comp_detrac").prop('disabled', true);
            $("#txt_detraccion").val(0);
        }
    //}
}

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

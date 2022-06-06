var NCLEQCC = function () {

    var fillBandejaCentroCostos = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjCentroCostos').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODE" },
                //{ data: "NCTLG_CODE" },
                { data: "NOMBRE_PLAN_BASE" },
                { data: "CECD_CODE_BASE" },
                { data: "DESCRIPCION_BASE" },
                { data: "NOMBRE_PLAN_EQUIVALENTE" },
                { data: "CECD_CODE_EQUIVALENTE" },
                { data: "DESCRIPCION_EQUIVALENTE" },
                { data: "FECHA_INICIO" },
                { data: "FECHA_FIN" },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },]
        }
        oTableCentroCostos = iniciaTabla('tblCentroCostos', parms);
        $('#tblCentroCostos').removeAttr('style');
        //oTableCentroCostos.fnSetColumnVis(2, false);
        

        $('#tblCentroCostos tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCentroCostos.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCentroCostos.fnGetPosition(this);
                var row = oTableCentroCostos.fnGetData(pos);
                var codigo = row.CODE;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmeqcc&codigo=' + codigo;
            }

        });



  }

    return {
       init: function () {
           fillBandejaCentroCostos();
        }
    };

}();


        var vg_OptionsCboPlanDeCuentas = '';
        var vg_OptionsCboCentroCosto = '';


        var NCMEQCC = function () {

            var fillCboEmpresa = function () {
                $.ajax({
                    async: false,
                    type: "post",
                    url: "vistas/nc/ajax/ncmeqcc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val(),
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
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });
            }

            var plugins = function () {
                $('#cboEmpresa').select2();
                $('#cboPlanCostoBase').select2();
                $('#cboCentroCostoBase').select2();
                $('#cboPlanCostoEquivalente').select2();
                $('#cboCentroCostoEquivalente').select2();
                inifechas("txtFechaInicio", "txtFechaTermino");
            }

            var eventoControles = function () {

                $('#chkEstado').on('change', function () {
                    if ($("#chkEstado").is(':checked')) {
                        offObjectEvents('txtFechaTermino');
                        $('#txtFechaTermino').val('');
                        $('#txtFechaTermino').attr('disabled', true);
                        $('#txtFechaTermino').attr('placeholder', '');
                    } else {
                        $('#txtFechaTermino').val('');
                        $('#txtFechaTermino').attr('disabled', false);
                        $('#txtFechaTermino').attr('placeholder', 'dd/mm/yyyy');
                    }
                });

                $('#cboEmpresa').on('change', function () {
                    var ddlValue = this.value;

                    $('#cboPlanCostoBase').empty();
                    $('#cboPlanCostoBase').append('<option></option>');
                    $('#cboPlanCostoBase').select2('val', '');

                    $('#cboCentroCostoBase').empty();
                    $('#cboCentroCostoBase').append('<option></option>');
                    $('#cboCentroCostoBase').select2('val', '');

                    //$('#txtCentroCostoBase').val('');
                    //$('#hfCentroCostoBase').val('');

                    //$('#txtDescripcionBase').val('');

                    $('#cboPlanCostoEquivalente').empty();
                    $('#cboPlanCostoEquivalente').append('<option></option>');
                    $('#cboPlanCostoEquivalente').select2('val', '');

                    $('#cboCentroCostoEquivalente').empty();
                    $('#cboCentroCostoEquivalente').append('<option></option>');
                    $('#cboCentroCostoEquivalente').select2('val', '');

                    //$('#txtCentroCostoEquivalente').val('');
                    //$('#hfCentroCostoEquivalente').val('');

                    //$('#txtDescripcionEquivalente').val('');

                    fillCboPlanCosto(ddlValue);

                });

                $('#cboPlanCostoBase').on('change', function () {

                    var v_ValPlanCostoEquivalente = $('#cboPlanCostoEquivalente').val();
            
                    $('#cboPlanCostoEquivalente').empty();
                    $('#cboPlanCostoEquivalente').append(vg_OptionsCboPlanDeCuentas);

                    if (parseInt($('#cboPlanCostoEquivalente').html().indexOf(this.value)) > -1) {
                        $('#cboPlanCostoEquivalente option[value=' + this.value + ']').remove();
                    }

                    if (v_ValPlanCostoEquivalente != '') {
                        $('#cboPlanCostoEquivalente').select2('val', v_ValPlanCostoEquivalente);
                    }

                    fillCboCentroCosto(this.value, 'cboCentroCostoBase');

                });

                $('#cboPlanCostoEquivalente').on('change', function () {

                    var v_ValPlanCostoBase = $('#cboPlanCostoBase').val();

                    $('#cboPlanCostoBase').empty();
                    $('#cboPlanCostoBase').append(vg_OptionsCboPlanDeCuentas);

                    if (parseInt($('#cboPlanCostoBase').html().indexOf(this.value)) > -1) {
                        $('#cboPlanCostoBase option[value=' + this.value + ']').remove();
                    }

                    if (v_ValPlanCostoBase != '') {
                        $('#cboPlanCostoBase').select2('val', v_ValPlanCostoBase);
                    }

                    fillCboCentroCosto(this.value, 'cboCentroCostoEquivalente');

                });

            }

            var cargaInicial = function () {
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                var CODE = ObtenerQueryString("codigo");
                if (typeof (CODE) !== "undefined") {
                    $.ajax({
                        type: "post",
                        url: "vistas/nc/ajax/ncmeqcc.ashx?OPCION=4&CODE=" + CODE + "&USUA_ID=" + $('#ctl00_txtus').val(),
                        contenttype: "application/json;",
                        datatype: "json",
                        async: false,
                        success: function (datos) {

                            $('#txtCodigo').val(datos[0].CODE);

                            if (datos[0].ESTADO_IND == 'A') {
                                //$('#uniform-chkEstado span').removeClass().addClass("checked");
                                $('#chkEstado').attr('checked', true);
                                $('#txtFechaTermino').val('');
                                $('#txtFechaTermino').attr('disabled', true);
                                $('#txtFechaTermino').attr('placeholder', '');
                            }
                            else {
                                //$('#uniform-chkEstado span').removeClass();
                                $('#chkEstado').attr('checked', false);
                                $('#txtFechaTermino').val('');
                                $('#txtFechaTermino').attr('disabled', false);
                                $('#txtFechaTermino').attr('placeholder', 'dd/mm/yyyy');
                            }

                            $("#cboEmpresa").select2('val', datos[0].CTLG_CODE);

                            $("#cboEmpresa").change();
                            //fillCboPlanCosto(datos[0].CTLG_CODE);

                            $("#cboPlanCostoBase").select2('val', datos[0].CECC_CODE_BASE);
                            $("#cboPlanCostoEquivalente").select2('val', datos[0].CECC_CODE_EQUIVALENTE);

                            $("#cboPlanCostoBase").change();
                            $("#cboPlanCostoEquivalente").change();

                            $("#cboCentroCostoBase").select2('val', datos[0].CECD_CODE_BASE);

                            //$('#txtCentroCostoBase').val(datos[0].CECD_CODE_BASE);
                            //$('#hfCentroCostoBase').val(datos[0].CECD_CODE_BASE);

                            //$('#txtDescripcionBase').val(datos[0].DESCRIPCION_BASE);

                            $("#cboCentroCostoEquivalente").select2('val', datos[0].CECD_CODE_EQUIVALENTE);

                            //$('#txtCentroCostoEquivalente').val(datos[0].CECD_CODE_EQUIVALENTE);
                            //$('#hfCentroCostoEquivalente').val(datos[0].CECD_CODE_EQUIVALENTE);

                            //$('#txtDescripcionEquivalente').val(datos[0].DESCRIPCION_EQUIVALENTE);

                            $('#txtFechaInicio').datepicker("setDate", datos[0].FECHA_INICIO);

                            $('#txtFechaTermino').datepicker("setDate", datos[0].FECHA_FIN);

                            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabar").attr("href", "javascript:Modificar();");
                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    });
                }
            }

            return {
                init: function () {
                    plugins();
                    fillCboEmpresa();
                    eventoControles();
                    cargaInicial();
                }
            };

        }();

        function InitConfiguration() {
            var input = NewTableInit();
            $('#divBandejaEquivalenciaCentroCostos').html(input);
            oTableNew = $('#tblEquivalenciaCentroCostos').dataTable({
                "aLengthMenu": [
                                         [5, 15, 20, -1],
                                         [5, 15, 20, "Todo"]
                ],
                "iDisplayLength": 15,
                "paging": true,
                "ordering": true,
                "oLanguage": {
                    "sEmptyTable": "No hay datos disponibles en la tabla.",
                    "sZeroRecords": "No hay datos disponibles en la tabla."
                }
            });

        }

        function NewTableInit() {
            var output = '';
            output += "<table id='tblEquivalenciaCentroCostos' cellspacing='0'  class='display'>";
            output += "<thead>";
            output += "<tr>";
            output += "<td align='center'>EMPRESA</td>"
            output += "<td align='center'>PLAN COSTO BASE</td>"
            output += "<td align='center'>CODIGO</td>"
            output += "<td align='center'>COSTO BASE</td>"
            output += "<td align='center'>PLAN COSTO EQUIVALENTE</td>"
            output += "<td align='center'>CODIGO</td>"
            output += "<td align='center'>COSTO EQUIVALENTE</td>"
            output += "<td align='center'>FECHA INICIO</td>"
            output += "<td align='center'>FECHA TÉRMINO</td>"
            output += "<td align='center'>ESTADO</td>"
            output += "</tr>"
            output += "</thead>"
            output += "<tbody>"
            output += "</tbody>"
            output += "</table>"
            return output;
        }

        function ClearTables() {
            if ($('#tblEquivalenciaCentroCostos').length != 0) {
                $('#tblEquivalenciaCentroCostos').remove();
            }
        }

        function fillCboPlanCosto(value) {
            var selectPlanCostoBase = $('#cboPlanCostoBase');
            var selectPlanCostoEquivalente = $('#cboPlanCostoEquivalente');
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmeqcc.ashx?OPCION=2&CTLG_CODE=" + value,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    vg_OptionsCboPlanDeCuentas = '';
                    selectPlanCostoBase.empty();
                    selectPlanCostoEquivalente.empty();
                    selectPlanCostoBase.append('<option></option>');
                    selectPlanCostoEquivalente.append('<option></option>');
                    vg_OptionsCboPlanDeCuentas += '<option></option>';
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            selectPlanCostoBase.append('<option value="' + datos[i].CODE + '">' + datos[i].NOMBRE_PLAN + '</option>');
                            selectPlanCostoEquivalente.append('<option value="' + datos[i].CODE + '">' + datos[i].NOMBRE_PLAN + '</option>');
                            vg_OptionsCboPlanDeCuentas += '<option value="' + datos[i].CODE + '">' + datos[i].NOMBRE_PLAN + '</option>';
                        }
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

        function fillCboCentroCosto(v_Value, v_ID) {
            $.ajax({
                async: false,
                type: "post",
                url: "vistas/nc/ajax/ncmeqcc.ashx?OPCION=3&CECC_CODE=" + v_Value,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    vg_OptionsCboCentroCosto = '';
                    $('#' + v_ID).empty();
                    $('#' + v_ID).append('<option></option>');
                    vg_OptionsCboCentroCosto += '<option></option>';
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#' + v_ID).append('<option value="' + datos[i].CODE + '">' + datos[i].DESCC + '</option>');
                            vg_OptionsCboCentroCosto += '<option value="' + datos[i].CODE + '">' + datos[i].DESCC + '</option>';
                        }
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

        function Grabar() {

            var CODE = '';
            var CTLG_CODE = '';
            var CECC_CODE_BASE = '';
            var CECD_CODE_BASE = '';
            var CECC_CODE_EQUIVALENTE = '';
            var CECD_CODE_EQUIVALENTE = '';
            var ESTADO_IND = '';
            var FECHA_INICIO = '';
            var FECHA_FIN = '';
            var USUA_ID = '';

            var Errors = false;
            if ($("#chkEstado").is(':checked')) {
                Errors = vErrors(["cboEmpresa", "cboPlanCostoBase", "cboCentroCostoBase", "cboPlanCostoEquivalente", "cboCentroCostoEquivalente", "txtFechaInicio"]);
            }
            else {
                Errors = vErrors(["cboEmpresa", "cboPlanCostoBase", "cboCentroCostoBase", "cboPlanCostoEquivalente", "cboCentroCostoEquivalente", "txtFechaInicio", "txtFechaTermino"]);
            }

            if (Errors) {

                CTLG_CODE = $.trim($('#cboEmpresa').val());
                CECC_CODE_BASE = $.trim($('#cboPlanCostoBase').val());
                CECD_CODE_BASE = $.trim($('#cboCentroCostoBase').val());
                CECC_CODE_EQUIVALENTE = $.trim($('#cboPlanCostoEquivalente').val());
                CECD_CODE_EQUIVALENTE = $.trim($('#cboCentroCostoEquivalente').val());
                ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
                FECHA_INICIO = $('#txtFechaInicio').val();
                FECHA_FIN = $('#txtFechaTermino').val();
                USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                Bloquear("ventana");
                $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMEQCC.ASHX?OPCION=N&CTLG_CODE=" + CTLG_CODE + "&CECC_CODE_BASE=" + CECC_CODE_BASE + "&CECD_CODE_BASE=" + CECD_CODE_BASE + "&CECC_CODE_EQUIVALENTE=" + CECC_CODE_EQUIVALENTE
                                                                + "&CECD_CODE_EQUIVALENTE=" + CECD_CODE_EQUIVALENTE + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
                    contentType: "application/json;",
                    dataType: "json",
                    async: false,
                    success: function (datos) {
                        if (datos[0].SUCCESS == "OK") {
                            Desbloquear("ventana");
                            if (datos[0].CODIGO == "EXIS") {
                                alertCustom("EXISTE CODIGO INGRESADO");
                            }
                            else {
                                $('#txtCodigo').val(datos[0].CODIGO);
                                exito();
                                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                                $("#grabar").attr("href", "javascript:Modificar();");
                            }
                        }
                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        alert(msg);
                    }
                });
            }
        }

        function Modificar() {
            var CODE = '';
            var CTLG_CODE = '';
            var CECC_CODE_BASE = '';
            var CECD_CODE_BASE = '';
            var CECC_CODE_EQUIVALENTE = '';
            var CECD_CODE_EQUIVALENTE = '';
            var ESTADO_IND = '';
            var FECHA_INICIO = '';
            var FECHA_FIN = '';
            var USUA_ID = '';

            var Errors = false;
            if ($("#chkEstado").is(':checked')) {
                Errors = vErrors(["cboEmpresa", "cboPlanCostoBase", "cboCentroCostoBase", "cboPlanCostoEquivalente", "cboCentroCostoEquivalente", "txtFechaInicio"]);
            }
            else {
                Errors = vErrors(["cboEmpresa", "cboPlanCostoBase", "cboCentroCostoBase", "cboPlanCostoEquivalente", "cboCentroCostoEquivalente", "txtFechaInicio", "txtFechaTermino"]);
            }

            if (Errors) {
                CODE = $.trim($('#txtCodigo').val());
                CTLG_CODE = $.trim($('#cboEmpresa').val());
                CECC_CODE_BASE = $.trim($('#cboPlanCostoBase').val());
                CECD_CODE_BASE = $.trim($('#cboCentroCostoBase').val());
                CECC_CODE_EQUIVALENTE = $.trim($('#cboPlanCostoEquivalente').val());
                CECD_CODE_EQUIVALENTE = $.trim($('#cboCentroCostoEquivalente').val());
                ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
                FECHA_INICIO = $('#txtFechaInicio').val();
                FECHA_FIN = $('#txtFechaTermino').val();
                USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

                Bloquear("ventana");

                $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMEQCC.ASHX?OPCION=M&CODE=" + CODE + "&CTLG_CODE=" + CTLG_CODE + "&CECC_CODE_BASE=" + CECC_CODE_BASE + "&CECD_CODE_BASE=" + CECD_CODE_BASE + "&CECC_CODE_EQUIVALENTE=" + CECC_CODE_EQUIVALENTE
                                                                + "&CECD_CODE_EQUIVALENTE=" + CECD_CODE_EQUIVALENTE + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
                    contentType: "application/json;",
                    dataType: "json",
                    async: false,
                    success: function (datos) {
                        if (datos[0].SUCCESS == "OK") {
                            Desbloquear("ventana");
                            if (datos[0].CODIGO == "EXIS") {
                                alertCustom("EXISTE CODIGO INGRESADO");
                            }
                            else {
                                $('#txtCodigo').val(datos[0].CODIGO);
                                exito();
                                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                                $("#grabar").attr("href", "javascript:Modificar();");
                            }
                        }
                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        alert(msg);
                    }
                });
            }
        }
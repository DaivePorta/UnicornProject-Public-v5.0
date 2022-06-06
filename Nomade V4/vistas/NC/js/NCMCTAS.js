var oTablePlanCuentas;

var NCLCTAS = function () {

    var ec_listar = function () {
        $('#cboEmpresas').on('change', function () {            
            listarPC($(this).val());            

            datatable();            

            $('#tblPlanCuentas').DataTable().column(8)
                       .search($(this).val())
                       .draw();            
        });

        $('#cboPC').on('change', function () {
            $('#tblPlanCuentas').DataTable().column(9)
                       .search($(this).val())
                       .draw();
        });

        $('#cboNiveles').on('change', function () {
            $('#tblPlanCuentas').DataTable().column(3)
                       .search($(this).val())
                       .draw();
        });
    }

    function listarPC(empresa) {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmctas.ashx?OPCION=7&CTLG_CODE=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboPC').empty();
                $('#cboPC').append('<option></option>');
                if (datos != null) {
                    if (datos.length > 1) { $('#cboPC').append('<option value=" ">TODOS</option>'); }
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboPC').append('<option value="' + datos[i].CODE + '">' + datos[i].NOMBRE + '</option>');
                    }
                    if (datos.length > 1) { $('#cboPC').val(' '); }
                    else { $('#cboPC').val(datos[0].CODE); }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cboPC').change();
    }
    
    var llenarDT = function()
    {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmctas.ashx?OPCION=INI&CTLG_CODE=" + $('#cboEmpresas').val(),
            //contenttype: "application/json;",
            //datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null)
                {
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjPlanCuentas').val(datos);
                }
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });

    }

    var lplugins = function () {
        $('#cboEmpresas').select2();
        $('#cboPC').select2();
        $('#cboNiveles').select2();
    }

    var datatable = function () {
        llenarDT();
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjPlanCuentas').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('width', '8%');
                    }
                },
                { data: "DESCR" },
                {
                    data: "CLASE_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NIVEL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NCENTRO_COSTO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NDIF_CAMBIO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NACTIV_FLUJO_EFECTVO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CTLG_CODE",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "NIPC_CODE",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "CUCO_CODE",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "ID",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }
            ]
        }

        try {
            $('#tblPlanCuentas').dataTable().fnDestroy();
        }
        catch (rft) { }

        oTablePlanCuentas = $('#tblPlanCuentas').dataTable(parms);
        //oTablePlanCuentas.fnSetColumnVis(8, false);
        //oTablePlanCuentas.fnSetColumnVis(9, false);
        //oTablePlanCuentas.fnSetColumnVis(10, false);
        //oTablePlanCuentas.fnSetColumnVis(11, false);

        $('#tblPlanCuentas').removeAttr('style');

        $('#tblPlanCuentas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablePlanCuentas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablePlanCuentas.fnGetPosition(this);
                var row = oTablePlanCuentas.fnGetData(pos);
                var id = row.ID;

                window.location.href = '?f=ncmctas&id=' + id;
            }

        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblPlanCuentas').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
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
                $('#cboEmpresas').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEmpresas').select2();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    return {
        init: function () {
            lplugins();
            fillCboEmpresa();
            $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val()).change();                     
            listarPC($('#cboEmpresas').val());
            ec_listar();
            datatable();
            //$('#cboEmpresas').val($('#ctl00_hddctlg').val());
            //$('#cboEmpresas').change();           
            
        }
    };

}();

var NCMCTAS = function () {

    var fillCboEmpresa = function () {
        $.ajax({
            async: false,
            type: "post",
            url: "vistas/nc/ajax/ncmctas.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val(),
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

    var fillCboDiferenciaDeCambio = function () {
        var selectDiferenciaCambio = $('#cboDiferenciaCambio');
        selectDiferenciaCambio.empty();
        selectDiferenciaCambio.append('<option></option>');
        selectDiferenciaCambio.append('<option value="CO">COMPRA</option>');
        selectDiferenciaCambio.append('<option value="VE">VENTA</option>');
    }

    var fillCboActividadFlujoEfectivo = function () {
        var selectActividadFlujoEfectivo = $('#cboActividadFlujoEfectivo');
        selectActividadFlujoEfectivo.empty();
        selectActividadFlujoEfectivo.append('<option></option>');
        selectActividadFlujoEfectivo.append('<option value="F">FINANCIAMIENTO</option>');
        selectActividadFlujoEfectivo.append('<option value="I">INVERSION</option>');
        selectActividadFlujoEfectivo.append('<option value="O">OPERACION</option>');
    }

    parametro = 0;
    var cargarParametro = function () {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmctas.ashx?OPCION=LP",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    parametro = datos[0].VALOR;
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboClaseCuenta').select2();
        $('#cboDiferenciaCambio').select2();
        $('#cboActividadFlujoEfectivo').select2();

        inifechas("txtFechaInicio", "txtFechaTermino");

        $("#txtDescripcion").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 60, "greedy": false }); })

        $('#txtCodigo').attr('placeholder', '');
        $('#txtCodigo').attr('disabled', true);


        $("#s2id_cboClaseCuenta a .select2-chosen").html('');
        $('#cboClaseCuenta').attr('disabled', true);

        $('#txtFechaTermino').attr('disabled', true);
        $('#txtFechaTermino').attr('placeholder', '');

        $('#chkEstado').on('change', function () {
            $('#txtFechaTermino').val('');
            if ($("#chkEstado").is(':checked')) {
                $('#txtFechaTermino').attr('disabled', true);
                $('#txtFechaTermino').attr('placeholder', '');
            } else {
                $('#txtFechaTermino').attr('disabled', false);
                $('#txtFechaTermino').attr('placeholder', 'dd/mm/yyyy');
            }
        });

        $('#cboEmpresa').change(function () {
            var ddl_value = $(this).val();
            getDatosEstructuraPlanContable(ddl_value);
        });

        $('#cboClaseCuenta').on('change', function () {
            var ddl_value = $(this).val();
            $('#hfCodigo_ClaseCuenta').val(ddl_value);
            $('#txtCodigoSunat').val($('#cboClaseCuenta :selected').attr('value_sunat'));
        });

        $('#txtCodigo').blur(function () {
            var niveles = '';
            var value = $(this).val();

            $('#hfCodigo_ClaseCuenta').val('');

            if ($.trim(value) == "") {
                $('#hfNivelActual').val('');
                $('#txtNivel').val('');
                $('#txtCodigoSunat').val('');
                $("#s2id_cboClaseCuenta a").removeClass();
                $("#s2id_cboClaseCuenta a").addClass("select2-choice select2-default");
                $('#cboClaseCuenta').html('<option></option>');
                $('#cboClaseCuenta').attr('disabled', true);
                $('#cboClaseCuenta').select2();
            }
            else {
                niveles = getNiveles(value);
                var parts = niveles.split(";");
                if (parts[1] == 0) {
                    $('#hfNivelActual').val(parts[0]);
                    $('#txtNivel').val(parts[0]);
                    $('#txtCodigoSunat').val('');

                    fillcboClaseCuenta($('#hfCodigo_Tipo_Plan').val());

                    if (parts[0] == "1") {
                        $("#s2id_cboClaseCuenta a").removeClass();
                        $("#s2id_cboClaseCuenta a").addClass("select2-choice select2-default");
                        $("#s2id_cboClaseCuenta a .select2-chosen").html('Clase Cuenta');
                        $('#cboClaseCuenta').attr('disabled', false);
                        $('#cboClaseCuenta').select2();
                    }
                    else {
                        $("#s2id_cboClaseCuenta a").removeClass();
                        $("#s2id_cboClaseCuenta a").addClass("select2-choice select2-default");
                        $('#cboClaseCuenta').html('<option></option>');
                        $('#cboClaseCuenta').attr('disabled', true);
                        setClaseCuentaPrimerNivel();
                    }
                }
                else {
                    $('#hfNivelActual').val('');
                    $('#txtNivel').val('');
                    $('#txtCodigoSunat').val('');
                    $("#s2id_cboClaseCuenta a").removeClass();
                    $("#s2id_cboClaseCuenta a").addClass("select2-choice select2-default");
                    $('#cboClaseCuenta').html('<option></option>');
                    $('#cboClaseCuenta').attr('disabled', true);
                    $('#cboClaseCuenta').select2();
                }
            }
        });

        $('#txtCodigo').keyup(function () {
            var array = $(this).val().split('.');
            var valor = array[0];
            if (valor == parametro) {
                $('#divAFE').removeClass('hidden');
            } else {
                $('#divAFE').addClass('hidden');
            }
        });
    }

    var cargaInicial = function () {
        $("#cboEmpresa").val($("#ctl00_hddctlg").val());
        $("#cboEmpresa").change();

        var ID = ObtenerQueryString("id");

        initJqxGrid();
        $("#jqxgrid #contenttablejqxgrid").children("div").on('keydown', function () {
            $('#textboxeditorjqxgridFTVCTAD_DEBE').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
            $('#textboxeditorjqxgridFTVCTAD_HABER').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
            $('#textboxeditorjqxgridFTVCTAD_PORCENTAJE').inputmask({ "mask": "9", "repeat": 3, "greedy": false });
        });

        if (ID != undefined) {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmctas.ashx?OPCION=5&ID=" + ID,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        if (datos[0].ESTADO_IND == 'A') {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                        }
                        else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }

                        $("#cboEmpresa").val(datos[0].CTLG_CODE);
                        $("#cboEmpresa").change();
                        $("#cboEmpresa").attr('disabled', true);

                        $('#hfCodigo_Plan_Contable').val(datos[0].NIPC_CODE);
                        $('#txtPlanContable').val(datos[0].NNIPC_CODE);

                        $('#hfCodigo_Tipo_Plan').val(datos[0].TIPL_CODE);
                        $('#txtTipoPlan').val(datos[0].NTIPL_CODE);

                        $('#txtCodigo').val(datos[0].CODE);
                        $('#txtCodigo').attr('placeholder', '');
                        $('#txtCodigo').prop('disabled', true);

                        var valor = datos[0].CODE.split('.')[0];
                        if (valor == parametro) {
                            $('#divAFE').removeClass('hidden');
                        }

                        $('#txtNivel').val(getNiveles(datos[0].CODE)[0]);
                        $('#hfNivelActual').val($('#txtNivel').val());

                        $('#hfCodigo_ClaseCuenta').val(datos[0].CUCO_CODE);
                        $('#txtCodigoSunat').val(datos[0].CODIGO_SUNAT);

                        fillcboClaseCuenta(datos[0].TIPL_CODE);

                        $("#s2id_cboClaseCuenta a .select2-chosen").html(datos[0].NOMBRE_CORTO);
                        $("#s2id_cboClaseCuenta a").removeClass();
                        $("#s2id_cboClaseCuenta a").addClass("select2-choice");
                        $('#cboClaseCuenta').attr('disabled', true);

                        $('#txtDescripcion').val(datos[0].DESCR);

                        $('#txtFechaInicio').datepicker("setDate", datos[0].FECHA_INICIO);

                        if (datos[0].CENTRO_COSTO_IND == 'S') {
                            $('#uniform-chkCentroCosto span').removeClass().addClass("checked");
                            $('#chkCentroCosto').attr('checked', true);
                        }
                        else {
                            $('#uniform-chkCentroCosto span').removeClass();
                            $('#chkCentroCosto').attr('checked', false);
                        }

                        $('#txtFechaTermino').datepicker("setDate", datos[0].FECHA_TERMINO);

                        if (datos[0].ENTR_DATOS == 'S') {
                            $('#uniform-chkEntradaDatos span').removeClass().addClass("checked");
                            $('#chkEntradaDatos').attr('checked', true);
                        }
                        else {
                            $('#uniform-chkEntradaDatos span').removeClass();
                            $('#chkEntradaDatos').attr('checked', false);
                        }

                        $("#cboDiferenciaCambio").val(datos[0].DIF_CAMBIO_IND);
                        $("#cboDiferenciaCambio").change();

                        if (datos[0].CUENTA_MONETARIA_IND == 'S') {
                            $('#uniform-chkMonetario span').removeClass().addClass("checked");
                            $('#chkMonetario').attr('checked', true);
                        }
                        else {
                            $('#uniform-chkMonetario span').removeClass();
                            $('#chkMonetario').attr('checked', false);
                        }

                        $("#cboActividadFlujoEfectivo").val(datos[0].ACTIV_FLUJO_EFECTVO_IND);
                        $("#cboActividadFlujoEfectivo").change();
                    }
                    //refreshJqxGrid(datos[0].JSON);
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
        }

        $("#addrowprop").click(function () {
            $("#jqxgrid").jqxGrid('addrow', null, {});
            $("#jqxgrid #contenttablejqxgrid").children("div").on('keydown', function () {
                $('#textboxeditorjqxgridFTVCTAD_DEBE').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
                $('#textboxeditorjqxgridFTVCTAD_HABER').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
                $('#textboxeditorjqxgridFTVCTAD_PORCENTAJE').inputmask({ "mask": "9", "repeat": 3, "greedy": false });
            });
        });

        $("#delrowprop").click(function () {
            var selectedrowindex = $('#jqxgrid').jqxGrid('getselectedcell').rowindex;
            var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
            if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
                var commit = $("#jqxgrid").jqxGrid('deleterow', id);
            }
        });

    }


    var eventocontroles = function () {

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboDiferenciaDeCambio();
            fillCboActividadFlujoEfectivo();
            cargarParametro();
            cargaInicial();
            eventocontroles()
        }
    };

}();

function InitConfigurationDestino() {
    var input = NewTableInitDestino();
    $('#divDestino').html(input);

    otablenew = $('#tblDestino').dataTable({
        "scrolly": "220px",
        "pagelength": false,
        "searching": false,
        "paging": false,
        "info": false,
        "bsort": false,
        "dom": '<"toolbar">frtip'
    });



    ClearTablesDestino();

}

function NewTableInitDestino() {
    var output = '';
    output += "<table id='tblDestino' cellspacing='0'  class='display'>";
    output += "<thead>";
    output += "<tr>";
    output += "<td align='center'>DEBE</td>"
    output += "<td align='center'>HABER</td>"
    output += "<td align='center'>%</td>"
    output += "</tr>"
    output += "</thead>"
    output += "<tbody>"
    output += "<tr>"
    output += "<td></td>"
    output += "<td></td>"
    output += "<td></td>"
    output += "</tr>"
    output += "</tbody>"
    output += "</table>"
    return output;
}

function ClearTablesDestino() {
    if ($('#tblDestino').length != 0) {
        $('#tblDestino').remove();
    }
}

function initJqxGrid() {

    var data = new Array();

    var source = {
        localdata: data,
        datatype: 'array',
        addrow: function (rowid, rowdata, position, commit) {
            commit(true);
        },
        deleterow: function (rowid, commit) {
            commit(true);
        },
        updaterow: function (rowid, newdata, commit) {
            commit(true);
        }
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgrid').jqxGrid({
        width: '80%',
        theme: 'bootstrap',
        autoheight: true,
        editable: true,
        scrollmode: 'logical',
        selectionmode: 'multiplecellsadvanced',
        altrows: true,
        enabletooltips: true,
        source: dataAdapter,
        showtoolbar: false,
        showemptyrow: true,
        columns: [{ text: 'Item', columntype: 'textbox', datafield: 'FTVCTAD_ITEM', width: '10%', cellsalign: 'center', align: 'center', editable: false, hidden: true },
                    { text: 'Debe', columntype: 'textbox', datafield: 'FTVCTAD_DEBE', width: '35%', cellsalign: 'right', align: 'center' },
                    { text: 'Haber', columntype: 'textbox', datafield: 'FTVCTAD_HABER', width: '35%', cellsalign: 'right', align: 'center' },
                    { text: '%', columntype: 'textbox', datafield: 'FTVCTAD_PORCENTAJE', width: '30%', cellsalign: 'right', align: 'center' }
        ]
    });
}

function refreshJqxGrid(v_JsonString) {
    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json',
        addrow: function (rowid, rowdata, position, commit) {
            commit(true);
        },
        deleterow: function (rowid, commit) {
            commit(true);
        },
        updaterow: function (rowid, newdata, commit) {
            commit(true);
        }
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgrid').jqxGrid({
        width: '80%',
        theme: 'bootstrap',
        autoheight: true,
        editable: true,
        scrollmode: 'logical',
        selectionmode: 'multiplecellsadvanced',
        altrows: true,
        enabletooltips: true,
        source: dataAdapter,
        showtoolbar: false,
        showemptyrow: false,
        columns: [{ text: 'Item', columntype: 'textbox', datafield: 'FTVCTAD_ITEM', width: '10%', cellsalign: 'center', align: 'center', editable: false, hidden: true },
                    { text: 'Debe', columntype: 'textbox', datafield: 'FTVCTAD_DEBE', width: '35%', cellsalign: 'right', align: 'center' },
                    { text: 'Haber', columntype: 'textbox', datafield: 'FTVCTAD_HABER', width: '35%', cellsalign: 'right', align: 'center' },
                    { text: '%', columntype: 'textbox', datafield: 'FTVCTAD_PORCENTAJE', width: '30%', cellsalign: 'right', align: 'center' }]
    });
}

function getDatosEstructuraPlanContable(value) {
    $('#hfCodigo_Plan_Contable').val('');
    $('#txtPlanContable').val('');
    $('#hfCodigo_Tipo_Plan').val('');
    $('#txtTipoPlan').val('');
    $('#txtCodigo').val('');
    $('#txtCodigo').attr('placeholder', '');
    $('#txtCodigo').attr('disabled', true);
    $('#hfNivelActual').val('');
    $('#txtNivel').val('');
    $('#txtCodigoSunat').val('');
    $("#s2id_cboClaseCuenta a").removeClass();
    $("#s2id_cboClaseCuenta a").addClass("select2-choice select2-default");
    $("#s2id_cboClaseCuenta a .select2-chosen").html('');
    $('#cboClaseCuenta').empty();
    $('#cboClaseCuenta').append('<option></option>');
    $('#cboClaseCuenta').attr('disabled', true);
    $('#hfNiveles').val('');
    $('#hfNivel1').val('');
    $('#hfNivel2').val('');
    $('#hfNivel3').val('');
    $('#hfNivel4').val('');
    $('#hfNivel5').val('');
    $('#hfNivel6').val('');
    $('#hfNivel7').val('');
    $('#hfNivel8').val('');

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmctas.ashx?OPCION=2&CTLG_CODE=" + value,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            if (datos != null) {
                $('#hfCodigo_Plan_Contable').val(datos[0].CODIGO_PLAN_CONTABLE);
                $('#txtPlanContable').val(datos[0].PLAN_CONTABLE);

                $('#hfCodigo_Tipo_Plan').val(datos[0].CODIGO_TIPO_PLAN);
                $('#txtTipoPlan').val(datos[0].TIPO_PLAN);

                $('#hfNiveles').val(datos[0].NIVELES);
                $('#hfNivel1').val(datos[0].NIVEL1);
                $('#hfNivel2').val(datos[0].NIVEL2);
                $('#hfNivel3').val(datos[0].NIVEL3);
                $('#hfNivel4').val(datos[0].NIVEL4);
                $('#hfNivel5').val(datos[0].NIVEL5);
                $('#hfNivel6').val(datos[0].NIVEL6);
                $('#hfNivel7').val(datos[0].NIVEL7);
                $('#hfNivel8').val(datos[0].NIVEL8);

                GenerarFormatoNiveles();

                $('#txtCodigo').attr('placeholder', 'Código');
                $('#txtCodigo').attr('disabled', false);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function fillcboClaseCuenta(value) {
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmctas.ashx?OPCION=3&TIPL_CODE=" + value,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            $('#cboClaseCuenta').empty();
            $('#cboClaseCuenta').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboClaseCuenta').append('<option value="' + datos[i].CODE + '" value_sunat="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE_CORTO + '</option>');
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function GenerarFormatoNiveles() {
    var cantidadNiveles = parseInt($('#hfNiveles').val());
    var cadenaFormatoNiveles = '';
    var myArray = [];
    var newI = 0;
    var numeroActual = 1;

    for (var i = 0; i < cantidadNiveles; i++) {
        newI = i + 1;
        myArray[i] = $('#hfNivel' + newI.toString()).val();
    }

    for (var i = 0; i < cantidadNiveles; i++) {
        newI = 1;
        if (myArray[i] == "") {
            cadenaFormatoNiveles += "";
        }
        else {
            do {
                cadenaFormatoNiveles += "9";
                numeroActual++;
                if (numeroActual == 10) {
                    numeroActual = 0;
                }
                newI++;
            } while (newI <= parseInt(myArray[i]));
            cadenaFormatoNiveles += ".";
        }
    }
    if (cadenaFormatoNiveles.length > 0) {
        cadenaFormatoNiveles = cadenaFormatoNiveles.substr(0, cadenaFormatoNiveles.length - 1);
        cadenaFormatoNiveles = $.trim(cadenaFormatoNiveles);
        $('#txtCodigo').inputmask(cadenaFormatoNiveles);
    }
}

function getNiveles(value) {
    var output = '';
    var parts = value.split(".");
    var nivelActual = 0;
    var nivelSiguiente = 0;
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].search("_") == 0) { break; }
        else {
            if (parts[i].search("_") == -1) {
                nivelActual++;
            }
            else {
                nivelSiguiente = nivelActual + 1;
                break;
            }
        }
    }
    output = nivelActual.toString() + ';' + nivelSiguiente.toString();
    return output;
}

function setClaseCuentaPrimerNivel() {
    var CTLG_CODE = $('#cboEmpresa').val();

    var value = $('#txtCodigo').val();
    var parts = value.split(".");

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmctas.ashx?OPCION=4&CTLG_CODE=" + CTLG_CODE + "&CODE=" + parts[0],
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboClaseCuenta').attr('disabled', true);
            if (datos != null) {
                $('#hfCodigo_ClaseCuenta').val(datos[0].CUCO_CODE);
                $('#txtCodigoSunat').val(datos[0].CODIGO_SUNAT);
                $("#cboClaseCuenta").select2('val', datos[0].CUCO_CODE);
                $('#select2-chosen-6').text(datos[0].NOMBRE_CORTO);
            }
            else {
                $('#hfCodigo_ClaseCuenta').val('');
                $('#txtCodigoSunat').val('');
                $("#s2id_cboClaseCuenta a").removeClass();
                $("#s2id_cboClaseCuenta a").addClass("select2-choice select2-default");
                $("#s2id_cboClaseCuenta a .select2-chosen").html('');
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function Grabar() {
    var CTLG_CODE = '';
    var CODE = '';
    var NIPC_CODE = '';
    var CUCO_CODE = '';
    var DESC = '';
    var CENTRO_COSTO_IND = '';
    var DESTINO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_TERMINO = '';
    var ENTR_DATOS = '';
    var PREDEC_CODE = '';
    var AJUSTE_DIF_CAMBIO_IND = '';
    var CUENTA_MONETARIA_IND = '';
    var ACTIV_FLUJO_EFECTVO_IND = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var ITEMSDETALLE = '';

    CTLG_CODE = $.trim($('#cboEmpresa').val());
    CODE = $.trim($('#txtCodigo').val());
    NIPC_CODE = $.trim($('#hfCodigo_Plan_Contable').val());
    CUCO_CODE = $.trim($('#hfCodigo_ClaseCuenta').val());
    DESC = $.trim($('#txtDescripcion').val());
    CENTRO_COSTO_IND = $("#chkCentroCosto").is(':checked') ? 'S' : 'N';
    DESTINO_IND = 'N';
    FECHA_INICIO = $.trim($('#txtFechaInicio').val());
    FECHA_TERMINO = $.trim($('#txtFechaTermino').val());
    ENTR_DATOS = $("#chkEntradaDatos").is(':checked') ? 'S' : 'N';
    PREDEC_CODE = '';
    AJUSTE_DIF_CAMBIO_IND = $.trim($('#cboDiferenciaCambio').val());
    CUENTA_MONETARIA_IND = $("#chkMonetario").is(':checked') ? 'S' : 'N';
    ACTIV_FLUJO_EFECTVO_IND = $.trim($('#cboActividadFlujoEfectivo').val());
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

    CODE = getFormatoCODE(CODE);
    PREDEC_CODE = getFormatoPREDECCODE(CODE);

    GenerateJsonJqxGrid();

    ITEMSDETALLE = $('#hfJsonJqxGrid').val();
    if (vErrors(["txtDescripcion", "txtCodigoSunat"])) {
        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/nc/ajax/ncmctas.ashx?OPCION=N&CTLG_CODE=" + CTLG_CODE + "&CODE=" + CODE + "&NIPC_CODE=" + NIPC_CODE + "&CUCO_CODE=" + CUCO_CODE + "&DESC=" + DESC +
                "&CENTRO_COSTO_IND=" + CENTRO_COSTO_IND + "&DESTINO_IND=" + DESTINO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_TERMINO=" + FECHA_TERMINO +
                "&ENTR_DATOS=" + ENTR_DATOS + "&PREDEC_CODE=" + PREDEC_CODE + "&AJUSTE_DIF_CAMBIO_IND=" + AJUSTE_DIF_CAMBIO_IND + "&CUENTA_MONETARIA_IND=" + CUENTA_MONETARIA_IND +
                "&ACTIV_FLUJO_EFECTVO_IND=" + ACTIV_FLUJO_EFECTVO_IND + "&ESTADO_IND=" + ESTADO_IND + "&USUA_ID=" + USUA_ID + "&ITEMSDETAIL=" + ITEMSDETALLE,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");
                    if (datos[0].CODIGO == "EXISTE") {
                        alertCustom("EXISTE CODIGO INGRESADO");
                    }
                    else {
                        exito();
                        $("#jqxgrid").jqxGrid('clear');

                        if (datos[0].JSON.length > 0) {
                            refreshJqxGrid(datos[0].JSON);
                        }
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");

                        $('#cboEmpresa').attr('disabled', true);
                        $('#txtCodigo').attr('disabled', true);
                        $('#cboClaseCuenta').attr('disabled', true);

                        $("#jqxgrid #contenttablejqxgrid").children("div").on('keydown', function () {
                            $('#textboxeditorjqxgridFTVCTAD_DEBE').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
                            $('#textboxeditorjqxgridFTVCTAD_HABER').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
                            $('#textboxeditorjqxgridFTVCTAD_PORCENTAJE').inputmask({ "mask": "9", "repeat": 3, "greedy": false });
                        });
                    }
                }
                else {
                    Desbloquear("ventana");
                    noexito();
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
    var ID = ObtenerQueryString('id');
    var CTLG_CODE = '';
    var CODE = '';
    var NIPC_CODE = '';
    var CUCO_CODE = '';
    var DESC = '';
    var CENTRO_COSTO_IND = '';
    var DESTINO_IND = '';
    var FECHA_INICIO = '';
    var FECHA_TERMINO = '';
    var ENTR_DATOS = '';
    var PREDEC_CODE = '';
    var AJUSTE_DIF_CAMBIO_IND = '';
    var CUENTA_MONETARIA_IND = '';
    var ACTIV_FLUJO_EFECTVO_IND = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var ITEMSDETALLE = '';

    CTLG_CODE = $.trim($('#cboEmpresa').val());
    CODE = $('#txtCodigo').val();
    NIPC_CODE = $.trim($('#hfCodigo_Plan_Contable').val());
    CUCO_CODE = $.trim($('#hfCodigo_ClaseCuenta').val());
    DESC = $.trim($('#txtDescripcion').val());
    CENTRO_COSTO_IND = $("#chkCentroCosto").is(':checked') ? 'S' : 'N';
    DESTINO_IND = 'N';
    FECHA_INICIO = $.trim($('#txtFechaInicio').val());
    FECHA_TERMINO = $.trim($('#txtFechaTermino').val());
    ENTR_DATOS = $("#chkEntradaDatos").is(':checked') ? 'S' : 'N';
    PREDEC_CODE = '';
    AJUSTE_DIF_CAMBIO_IND = $.trim($('#cboDiferenciaCambio').val());
    CUENTA_MONETARIA_IND = $("#chkMonetario").is(':checked') ? 'S' : 'N';
    ACTIV_FLUJO_EFECTVO_IND = $.trim($('#cboActividadFlujoEfectivo').val());
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

    CODE = getFormatoCODE(CODE);
    PREDEC_CODE = getFormatoPREDECCODE(CODE);

    GenerateJsonJqxGrid();

    ITEMSDETALLE = $('#hfJsonJqxGrid').val();

    Bloquear("ventana");

    $.ajax({
        type: "POST",
        url: "vistas/nc/ajax/ncmctas.ashx?OPCION=M&ID=" + ID + "&CTLG_CODE=" + CTLG_CODE + "&CODE=" + CODE + "&NIPC_CODE=" + NIPC_CODE + "&CUCO_CODE=" + CUCO_CODE + "&DESC=" + DESC +
            "&CENTRO_COSTO_IND=" + CENTRO_COSTO_IND + "&DESTINO_IND=" + DESTINO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_TERMINO=" + FECHA_TERMINO +
            "&ENTR_DATOS=" + ENTR_DATOS + "&PREDEC_CODE=" + PREDEC_CODE + "&AJUSTE_DIF_CAMBIO_IND=" + AJUSTE_DIF_CAMBIO_IND + "&CUENTA_MONETARIA_IND=" + CUENTA_MONETARIA_IND +
            "&ACTIV_FLUJO_EFECTVO_IND=" + ACTIV_FLUJO_EFECTVO_IND + "&ESTADO_IND=" + ESTADO_IND + "&USUA_ID=" + USUA_ID + "&ITEMSDETAIL=" + ITEMSDETALLE,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            if (datos[0].SUCCESS == "OK") {
                Desbloquear("ventana");
                if (datos[0].CODIGO == "EXISTE") {
                    alertCustom("EXISTE CODIGO INGRESADO");
                }
                else {
                    exito();

                    $("#jqxgrid").jqxGrid('clear');

                    if (datos[0].JSON.length > 0) {
                        refreshJqxGrid(datos[0].JSON);
                    }

                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");

                    $('#cboEmpresa').attr('disabled', true);
                    $('#txtCodigo').attr('disabled', true);
                    $('#cboClaseCuenta').attr('disabled', true);

                    $("#jqxgrid #contenttablejqxgrid").children("div").on('keydown', function () {
                        $('#textboxeditorjqxgridFTVCTAD_DEBE').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
                        $('#textboxeditorjqxgridFTVCTAD_HABER').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
                        $('#textboxeditorjqxgridFTVCTAD_PORCENTAJE').inputmask({ "mask": "9", "repeat": 3, "greedy": false });
                    });
                }
            }
            else {
                Desbloquear("ventana");
                noexito();
            }
        },
        error: function (msg) {
            Desbloquear("ventana");
            alert(msg);
        }
    });
}

function getFormatoCODE(CODE) {
    var output = '';
    var nivelActual = $('#hfNivelActual').val();
    var parts = CODE.split(".");

    for (var i = 0; i < parseInt(nivelActual) ; i++) {
        output = output + parts[i] + '.';
    }

    output = output.substr(0, output.length - 1);

    return output;
}

function getFormatoPREDECCODE(CODE) {
    var output = '';
    var nivelActual = $('#hfNivelActual').val();
    var parts = CODE.split(".");

    for (var i = 0; i < parseInt(nivelActual) - 1 ; i++) {
        output = output + parts[i] + '.';
    }

    if (output.length > 0) {
        output = output.substr(0, output.length - 1);
    }

    return output;
}

function GenerateJsonJqxGrid() {
    var obj = '';

    var rowscount = $('#jqxgrid').jqxGrid('getdatainformation').rowscount;
    var rows = $('#jqxgrid').jqxGrid('getdisplayrows');

    if (rowscount > 0) {
        for (var i = 0; i < rowscount; i++) {
            var rowData = rows[i];
            if (typeof (rowData.FTVCTAD_DEBE) !== "undefined" && typeof (rowData.FTVCTAD_HABER) !== "undefined" && typeof (rowData.FTVCTAD_PORCENTAJE) !== "undefined") {
                if (typeof (rowData.FTVCTAD_ITEM) === "undefined") obj += ',';
                else obj += rowData.FTVCTAD_ITEM + ',';
                obj += rowData.FTVCTAD_DEBE + ',';
                obj += rowData.FTVCTAD_HABER + ',';
                obj += parseInt(rowData.FTVCTAD_PORCENTAJE).toString() + ';';
            }
        }
        if (obj.length > 0) {
            obj = obj.substr(0, obj.length - 1);
        }
    }

    $('#hfJsonJqxGrid').val(obj);
}
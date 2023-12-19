var prmtSURE;
var NNLRENQ = function () {

    var plugin = function () {
        $("#slcEmpresa").select2();
        $("#slcSucursal").select2();
        $('#txtAnio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
    }

    var fillBandeja = function () {
        oTableHNR = $('#tbl_honorarios').dataTable({
            data: null,
            order: [],
            columns: [
                {
                    data: "MES",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "MONTO_RETENIDO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right');
                        $(td).text('S/. ' + cellData);
                    }
                },
                {
                    data: "HONORARIOS_RETENIDOS_NETO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right');
                        $(td).text('S/. ' + cellData);
                    }
                },
                {
                    data: "HONORARIOS_RETENIDOS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right');
                        $(td).text('S/. ' + cellData);
                    }
                },
                {
                    data: "TOTAL_HONORARIOS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right');
                        $(td).text('S/. ' + cellData);
                    }
                }, {
                    data: "NRO_HONORARIOS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "HONORARIOS_CON_RETENCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "HONORARIOS_CON_SUSPENCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }
            ],
            "scrollY": "45vh", "scrollCollapse": true,
            "paging": false,
            "dom": '<"top cabecera"f><t><"clear">',
            info: false
        });
        $('#tbl_honorarios').removeAttr('style');
        $('#tbl_honorarios tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableHNR.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableHNR.fnGetPosition(this);
                var row = oTableHNR.fnGetData(pos);
                //var CODIGO = row.CODIGO;
                //window.open("?f=NNLDREQ&codigo=" + CODIGO, '_blank');

            }
        });
    }

    var listarEmpresa = function () {
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
        var Emp = $("#slcEmpresa").val();
        if (Emp == 'TODOS') { Emp = '' };

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + Emp,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucursal').empty();
                $('#slcSucursal').append('<option val="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    if (Emp == '') {
                        $('#slcSucursal').select2('val', 'TODOS').change();
                    }
                    else {
                        $('#slcSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                    }


                } else {
                    $('#slcSucursal').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var cargarFechaDefecto = function () {
        $('#txtAnio').val(new Date().getFullYear());
    }

    var eventos = function () {
        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                cargarFechaDefecto();
                ListarSucursales($('#slcEmpresa').val());
            } else { emp_ant = ""; }
        });

        $("#slcSucursal").on('change', function () {
            $('#btn_filtrar').click();
        });

        $("#txtAnio").on('change', function () {
            $('#btn_filtrar').click();
        });

        $('#btn_filtrar').on('click', function () {
            fnListarHonorarios();
        });
    }

    var cargarFechaDefecto = function () {
        $('#txtAnio').val(new Date().getFullYear());
    }

    var fnListarHonorarios = function () {

        let p_CTLG_CODE = "";
        let p_SCSL_CODE = "";
        let p_ANIO = "";

        p_CTLG_CODE = $("#slcEmpresa").val();
        p_SCSL_CODE = $("#slcSucursal").val() === 'TODOS' ? '' : $("#slcSucursal").val();

        p_ANIO = $('#txtAnio').val();

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNLDREQ.ashx?OPCION=LHONORARIOS" +
                "&p_CTLG_CODE=" + p_CTLG_CODE +
                "&p_SCSL_CODE=" + p_SCSL_CODE +
                "&p_ANIO=" + p_ANIO + 
                "&p_SURE=" + prmtSURE,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTableHNR.fnClearTable();
                if (datos.length === 0) {
                    return;
                }
                oTableHNR.fnAddData(datos);
            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    };

    return {
        init: function () {
            cargarParametrosSistema();
            plugin();
            eventos();
            listarEmpresa();
            ListarSucursales();
            cargarFechaDefecto();
            fillBandeja();
            $('#btn_filtrar').click();
        }
    };

}();

function cargarParametrosSistema() {
    let filtro = "SURE";
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
                        case "SURE":
                            prmtSURE = datos[i].VALOR;
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
}
var NCRINCO = function () {

    return {
        init: function () {
            plugins();            
            fillCboEmpresa();
            ListarSucursales();
            cargarCajas();
            listarCajas();
            fillCboCajeros($('#cboCaja').val());
            eventos();
        }
    }
}();

cajas = [];
reporte = [];


var plugins = function () {
    $('#txtFechaDesde').datepicker({ format: 'dd/mm/yyyy' });
    $('#txtFechaHasta').datepicker({ format: 'dd/mm/yyyy' });
    $('#cboTipo').select2();
    $('#cbo_cajeros').select2();
    $('#cboCaja').select2();
    $('#slcSucural').select2();
    $('#slcEmpresa').select2();

    $('#txtFechaDesde').datepicker().change(function () {
        $('#txtFechaHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtFechaHasta').val().split("/").reverse().join(""))) ? "" : $('#txtFechaHasta').val());
        $('#txtFechaHasta').datepicker('setStartDate', $(this).val());
    });

    $('#txtFechaHasta').datepicker().on("change", function () {
        if ($('#txtFechaDesde').val() != "") {
            $('#txtFechaHasta').datepicker('setStartDate', $('#txtFechaDesde').val());
        }
    });
};

var eventos = function () {   

    $('#slcEmpresa').on('change', function () {
        ListarSucursales();   
    });

    $('#slcSucural').on('change', function () {
        cargarCajas();
        listarCajas();
        fillCboCajeros($('#cboCaja').val());
    });

    $('#cboCaja').on('change', function () {
        fillCboCajeros($('#cboCaja').val());
    });

   
};

var ListarSucursales = function () {

    var ctlg = $('#slcEmpresa').val();

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

                    $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();

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


var fillCboCajeros = function (codcaja) {

    if (codcaja.length !== 0) {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCRINCO.ashx?OPCION=10&CTLG_CODE=" + $('#ctl00_hddctlg').val() + "&SCSL_CODE=" + $('#ctl00_hddestablecimiento').val() + "&CAJA_CODE=" + codcaja,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $('#cbo_cajeros').empty();
                $('#cbo_cajeros').append('<option value="">Todos</option>');
                if (datos != null) {


                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_cajeros').append('<option value="' + datos[i].USUARIO + '">' + datos[i].CAJERO + '</option>');
                    }


                }
                $('#cbo_cajeros').select2('val', "");
            },
            error: function (msg) {
                alert(msg);
            }
        });
    } else {
        $('#cbo_cajeros').empty();
        $('#cbo_cajeros').append('<option value="">Todos</option>');
        $('#cbo_cajeros').select2('val', "");
    }
    
};


var cargarCajas = function () {

    var empresa = $("#slcEmpresa").val();
    var sucursal = $("#slcSucural").val();

    if (empresa.length !== 0 && sucursal.length !== 0) {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCRINCO.ashx?OPCION=0&CTLG_CODE=" + empresa + "&SCSL_CODE=" + sucursal,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                cajas = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });
    } else if (sucursal.length == 0) {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCRINCO.ashx?OPCION=0&CTLG_CODE=" + empresa + "&SCSL_CODE=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                cajas = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });
    } else {

    }  
};

var listarCajas = function () {
    $('#cboCaja').empty();
    $('#cboCaja').append('<option value="">Todas</option>');
    if (cajas != null) {
        for (var i = 0; i < cajas.length; i++) {
            $('#cboCaja').append('<option value="' + cajas[i].CODIGO + '">' + cajas[i].DESCRIPCION + '</option>');
        }
    }
    $('#cboCaja').select2("val", "");
};

var cargarReporte = function () {
    var desde = $('#txtFechaDesde').val().fechaMysql();
    var hasta = $('#txtFechaHasta').val().fechaMysql();
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCRINCO.ashx?OPCION=1&TIPO=" + $('#cboTipo').val() + "&CAJA_CODE=" + $('#cboCaja').val() + "&DESDE=" + desde + "&HASTA=" + hasta + "&CAJERO=" + $('#cbo_cajeros').val() + "&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            reporte = datos;
        },
        error: function (msg) {
            alert(msg);
        }
    });
    Bloquear('tblReporte');
    listarReporte();
    Desbloquear('tblReporte');
};

var listarReporte = function () {
    var tipo = $('#cboTipo').val();
    var cabeceras = [];
    switch (tipo) {
        case '':
            cabeceras = ['CAJA', 'OCURRENCIA', 'INC SOLES', 'M SOLES', 'INC USD', 'M USD','USUARIO','FECHA', 'OBSERVACIONES'];
            break;
        case 'S':
            cabeceras = ['CAJA', 'OCURRENCIA', 'INC SOLES', 'M SOLES', 'INC USD', 'M USD', 'USUARIO','FECHA', 'OBSERVACIONES'];
            break;
        case 'F':
            cabeceras = ['CAJA', 'OCURRENCIA', 'INC SOLES', 'M SOLES', 'INC USD', 'M USD','USUARIO', 'FECHA', 'OBSERVACIONES'];
            break;
    }
    llenarCabeceras(cabeceras);
    $('#tblReporte').DataTable().destroy();
    llenarReporte(tipo);
};

var llenarCabeceras = function (c) {
    $('#thReporte').empty();
    if (reporte.length > 0) {
        for (var i = 0; i < c.length; i++) {
            $('#thReporte').append('<th  style="text-align: center">' + c[i] + '</th>');
        }
    } else {
        $('#thReporte').append('<th style="text-align: center"><h3>No se encontraron resultados</h3></th>');
    }
};

var llenarReporte = function (tipo) {
    $('#tbReporte').empty();
    var fila;
    for (var i = 0; i < reporte.length; i++) {
        fila = '<tr>' +
            '<td style="width: 10%; text-align: center">' + reporte[i].CAJA + '</td>' +
            '<td style="text-align: center; width: 10%;">' + reporte[i].OCURRENCIA + '</td>';
        if (reporte[i].INC_SOLES.charAt(0) == tipo || tipo == '') {
            fila += '<td style="text-align: center; width: 8%;">' + reporte[i].INC_SOLES + '</td>' +
            '<td style="text-align: center; width: 10%;">' + reporte[i].SOLES + '</td>';
        } else {
            fila += '<td></td><td></td>';
        }

        if (reporte[i].INC_DOLARES.charAt(0) == tipo || tipo == '') {
            fila += '<td style="text-align: center; width: 8%;">' + reporte[i].INC_DOLARES + '</td>' +
                '<td style="text-align: center; width: 8%;">' + reporte[i].DOLARES + '</td>';
        } else {
            fila += '<td></td><td></td>';
        }

        //if (tipo != '' && tipo != 'S') {
        //    fila += '<td style="text-align: center">' + reporte[i].FALTANTE + '</td>';
        //} else if (tipo != '' && tipo != 'F') {
        //    fila += '<td style="text-align: center">' + reporte[i].SOBRANTE + '</td>';
        //} else {
        //    fila += '<td style="text-align: center">' + reporte[i].FALTANTE + '</td>';
        //    fila += '<td style="text-align: center">' + reporte[i].SOBRANTE + '</td>';
        //}

        fila += '<td style="text-align: center">' + reporte[i].USUARIO + '</td>';        

        fila += '<td style="text-align: center; width: 12%;" >' + reporte[i].FECHA + '</td>' +
            '<td style="width: 30%;">' + reporte[i].OBSERVACIONES + '</td></tr>';
        $('#tbReporte').append(fila);
    }
    if (reporte.length > 0) {
        $('#tblReporte').DataTable({
            "sDom": 'TC<"clear">lfrtip',
            "sPaginationType": "full_numbers",
            "scrollX" : true,
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
            }
        });
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("display", "inline-block");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
    }
}

String.prototype.fechaMysql = function () {
    var nueva_fecha = '';
    if (this.length == 10) {
        var array = this.split('/');
        nueva_fecha = array[2] + '-' + array[1] + '-' + array[0];
    }
    return nueva_fecha;
};
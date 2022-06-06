var NSLGHEM = function () {
    var plugins = function () {     
        $('#slcEstado').select2();    
        $('#cboEmpresa').select2();    
    }
    var eventos = function () {   
        $('#cboEmpresa').on('change', function () {
            ListarHorarios();
        });

        $('#slcEstado').on('change', function () {            
            ListarHorarios();
        });
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
                    $("#cboEmpresa").select2("val", $('#ctl00_hddctlg').val());                  
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var crearTablaVacia = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBRE_PERSONA" },
                {
                    data: { _: "FECHA_INICIO.display", sort: "FECHA_INICIO.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_LIMITE.display", sort: "FECHA_LIMITE.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]
        }
        oTableHorarios = iniciaTabla('tblHorarios', parms);
        $('#tblHorarios').removeAttr('style');
        $('#tblHorarios tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableHorarios.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableHorarios.fnGetPosition(this);
                var row = oTableHorarios.fnGetData(pos);
                var code = row.CODE;
                window.location.href = '?f=nsmghem&codigo=' + code;
            }
        });
        /*boton cambiar ACTIVO - INACTIVO*/
        $('#tblHorarios tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = oTableHorarios.api(true).row($(this).parent().parent()).index();
            var row = oTableHorarios.fnGetData(pos);
            var cod = row.CODE;

            Bloquear("ventana");
            $.post("vistas/NS/ajax/NSMGHEM.ASHX", { OPCION: 'CE', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        //if (res == "I") res = "INACTIVO";
                        //else res = "ACTIVO"
                        //oTableHorarios.fnGetData(pos).NESTADO_IND = res;
                        //refrescaTabla(oTableHorarios);
                        ListarHorarios();
                        exito();
                        
                    } else {
                        noexito();
                    }

                });
        });
    };    

    var ListarHorarios = function () {               
        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMGHEM.ASHX?OPCION=LPE&p_ESTADO=" + $('#slcEstado').val() + "&p_RHPLAHO_CTLG_CODE=" + $('#cboEmpresa').val(),
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos != null) {
                    oTableHorarios.fnClearTable();
                    oTableHorarios.fnAddData(datos);
                    oTableHorarios.fnDraw();
                } else {
                    oTableHorarios.fnClearTable();
                    infoCustom2("No se encontraron datos!");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    return {
        init: function () {
            plugins();
            eventos();
            fillCboEmpresa();
            crearTablaVacia();
            ListarHorarios();
            //fillBandejaHorarios();
        }
    };

}();

var NSMGHEM = function () {
    var p_RHPLAHO_CTLG_CODE = $("#ctl00_hddctlg").val();
    
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
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
    
    var fillCboEmpleados = function () {
        var selectEmpleado = $('#cboEmpleado');
        var valorActual = selectEmpleado.val();
        var bPresente = false;
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMGHEM.ASHX?OPCION=1&p_RHPLAHO_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEmpleado.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectEmpleado.append('<option></option>');
                        }
                        selectEmpleado.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                        bPresente |= (valorActual === datos[i].CODIGO);
                    }
                }
              
                Desbloquear("ventana")
            },
            complete: function () {
                if (bPresente)
                    selectEmpleado.select2("val", valorActual);
                else
                    selectEmpleado.select2("val", "");

            },
            error: function (msg) {
                Desbloquear("ventana")
                alert(msg);
            }
        });
    }

    var eventos = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana");
                fillCboEmpleados();
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        $("#slcEmpresa,#cboEmpleado").on('change', function () {
            var empresa = $('#slcEmpresa').val();
            var empleado = $("#cboEmpleado").val();
            if (empresa !== "" && empleado !== "")
                cargarDatosHorarioEmpleado(empleado, empresa);
            else
                limpiarDatos();
        });

    }
    
    var fillCboZonaHoraria = function () {
        var selectZonaHoraria = $('#cboZonaHoraria');
        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSMGHEM.ASHX?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    selectZonaHoraria.empty();
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectZonaHoraria.append('<option></option>');
                        }
                        selectZonaHoraria.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillBandeja_Break = function () {

        var parms = {
            data: null,
            //"sDom": "t",
            "paging": false,
            "searching": false,
            "scrollCollapse": true,
            "info": false,
            "ordering": false,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "HORA_INICIO",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }, {
                    data: "HORA_FIN",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }, {
                    data: "LUNES",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (rowData.LUNES == "0") {
                            $(td).html("<i style='color:red;' class='icon-remove' title='No'></i>")

                        }
                        if (rowData.LUNES == "1") {

                            $(td).html("<i style='color:green;' class='icon-ok' title='Sí'></i>")
                        }
                    }
                }, {
                    data: "MARTES",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (rowData.MARTES == "0") {
                            $(td).html("<i style='color:red;' class='icon-remove' title='No'></i>")

                        }
                        if (rowData.MARTES == "1") {

                            $(td).html("<i style='color:green;' class='icon-ok' title='Sí'></i>")
                        }
                    }
                }, {
                    data: "MIERCOLES",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (rowData.MIERCOLES == "0") {
                            $(td).html("<i style='color:red;' class='icon-remove' title='No'></i>")

                        }
                        if (rowData.MIERCOLES == "1") {

                            $(td).html("<i style='color:green;' class='icon-ok' title='Sí'></i>")
                        }
                    }
                }, {
                    data: "JUEVES",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (rowData.JUEVES == "0") {
                            $(td).html("<i style='color:red;' class='icon-remove' title='No'></i>")

                        }
                        if (rowData.JUEVES == "1") {

                            $(td).html("<i style='color:green;' class='icon-ok' title='Sí'></i>")
                        }
                    }
                }, {
                    data: "VIERNES",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (rowData.VIERNES == "0") {
                            $(td).html("<i style='color:red;' class='icon-remove' title='No'></i>")

                        }
                        if (rowData.VIERNES == "1") {

                            $(td).html("<i style='color:green;' class='icon-ok' title='Sí'></i>")
                        }
                    }
                }, {
                    data: "SABADO",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (rowData.SABADO == "0") {
                            $(td).html("<i style='color:red;' class='icon-remove' title='No'></i>")
                        
                        }
                        if (rowData.SABADO == "1") {

                            $(td).html("<i style='color:green;' class='icon-ok' title='Sí'></i>")
                        }
                    }
                }, {
                    data: "DOMINGO",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        if (rowData.DOMINGO == "0") {
                            $(td).html("<i style='color:red;' class='icon-remove' title='No'></i>")

                        }
                        if (rowData.DOMINGO == "1") {

                            $(td).html("<i style='color:green;' class='icon-ok' title='Sí'></i>")
                        }
                    }
                },
                {
                    data: "ZONA_HORARIA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },



            ]

        }

        oTableBreak = iniciaTabla('tblbreak', parms);
       
        $('#tblbreak').removeAttr('style');
        $('#tblbreak tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $("#hf_hoec_code").val("");
               
            }
            else {
                oTableBreak.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableBreak.fnGetPosition(this);
                var row = oTableBreak.fnGetData(pos);
                var CODIGO = row.CODIGO;
                $("#hf_hoec_code").val(CODIGO);


            }
        });

    }

    var cargainicial = function () {

        $("#txtHoraInicio").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
        $("#txtHoraFin").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
        $("#txtHoraInicio_break").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
        $("#txtHoraFin_break").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
        
        var cod = ObtenerQueryString("codigo");

        $('#uniform-chkActivo span').removeClass().addClass("checked");
        $('#chkActivo').attr('checked', true);
        
        if (typeof (cod) !== "undefined") {

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMGHEM.ASHX?OPCION=RH&CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    $("#txtCodigo").val(datos[0].CODE);                    

                    AgregaItemCombo(datos[0].EMPL_PIDM, datos[0].NOMBRE_PERSONA);

                  //  $('#cboEmpleado').attr('disabled', true);
                  //  $('#slcEmpresa').attr('disabled', true);
                    $("#slcEmpresa").select2("val", datos[0].CTLG_CODE);
                    $("#cboZonaHoraria").select2("val", datos[0].ZOHO_CODE).change();
                    $("#txtFechaInicio").val(datos[0].FECHA_INICIO);
                    if (datos[0].NESTADO_IND == "ACTIVO") {
                        $('#uniform-chkActivo span').removeClass().addClass("checked");
                        $('#chkActivo').attr('checked', true);
                    } else {
                        $('#uniform-chkActivo span').removeClass();
                        $('#chkActivo').attr('checked', false);
                    }
                    if (datos[0].INC_FERIADOS_IND == "SI") {
                        $('#uniform-chkIncluirFeriados span').removeClass().addClass("checked");
                        $('#chkIncluirFeriados').attr('checked', true);
                    } else {
                        $('#uniform-chkIncluirFeriados span').removeClass();
                        $('#chkIncluirFeriados').attr('checked', false);
                    }
                    $("#txtFechaLimite").val(datos[0].FECHA_LIMITE);
                    $('#divSeparador').removeAttr('style');
                    $('#divHorarioDetalle').removeAttr('style');
                    $('#divJqxGridDetalle').removeAttr('style');
                    $('#divSeparador_2').removeAttr('style');
                    $('#divBreakDetalle').removeAttr('style');
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    obtenerDetalleHorarioEmpleado();
                    Listar_break_empleado();

                    var rows = $('#jqxgrid').jqxGrid('getrows').length;
                    if (rows == 0) {
                        $("#btnPlantilla").attr("disabled", false)
                    } else {
                        $("#btnPlantilla").attr("disabled", true)
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }
    }

    var cargarDatosHorarioEmpleado = function (pidm_empleado, ctlg_code) {

        limpiarDatos();

        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMGHEM.ASHX?OPCION=RH&EMPL_PIDM=" + pidm_empleado + "&p_RHPLAHO_CTLG_CODE=" + ctlg_code + "&CODE=",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {

                if (datos.length > 0) {

                    $("#txtCodigo").val(datos[0].CODE);

                    $("#cboZonaHoraria").select2("val", datos[0].ZOHO_CODE).change();
                    $("#txtFechaInicio").val(datos[0].FECHA_INICIO);
                    if (datos[0].NESTADO_IND == "ACTIVO") {
                        $('#uniform-chkActivo span').removeClass().addClass("checked");
                        $('#chkActivo').attr('checked', true);
                    } else {
                        $('#uniform-chkActivo span').removeClass();
                        $('#chkActivo').attr('checked', false);
                    }
                    if (datos[0].INC_FERIADOS_IND == "SI") {
                        $('#uniform-chkIncluirFeriados span').removeClass().addClass("checked");
                        $('#chkIncluirFeriados').attr('checked', true);
                    } else {
                        $('#uniform-chkIncluirFeriados span').removeClass();
                        $('#chkIncluirFeriados').attr('checked', false);
                    }
                    $("#txtFechaLimite").val(datos[0].FECHA_LIMITE);
                    $('#divSeparador').removeAttr('style');
                    $('#divHorarioDetalle').removeAttr('style');
                    $('#divJqxGridDetalle').removeAttr('style');
                    $('#divSeparador_2').removeAttr('style');
                    $('#divBreakDetalle').removeAttr('style');
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    obtenerDetalleHorarioEmpleado();
                    Listar_break_empleado();

                    var rows = $('#jqxgrid').jqxGrid('getrows').length;
                    if (rows == 0) {
                        $("#btnPlantilla").attr("disabled", false)
                    } else {
                        $("#btnPlantilla").attr("disabled", true)
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    };

    var limpiarDatos = function () {
        $("#txtCodigo").val("");
        $("#cboZonaHoraria").select2("val", "").change();
        $("#txtFechaInicio").val("");    
        $('#uniform-chkActivo span').removeClass().addClass("checked");
        $('#chkActivo').attr('checked', true);
        $('#uniform-chkIncluirFeriados span').removeClass();
        $('#chkIncluirFeriados').attr('checked', false);        
        $("#txtFechaLimite").val("");

        $('#divSeparador').attr('style','display:none');
        $('#divHorarioDetalle').attr('style', 'display:none');
        $('#divJqxGridDetalle').attr('style', 'display:none');
        $('#divSeparador_2').attr('style', 'display:none');
        $('#divBreakDetalle').attr('style', 'display:none');

        $("#grabar").html("<i class='icon-pencil'></i> Grabar Datos");
        $("#grabar").attr("href", "javascript:grabar();");

        initJqxGridHorarioEmpleados("[]");


        oTableBreak.fnClearTable();
        
        $("#btnPlantilla").attr("disabled", true)
        
    }

    var plugins = function () {
        //aMayuscula(":input");
        $('#cboEmpleado').select2();
        $('#cboZonaHoraria').select2();
        $("#slcEmpresa").select2();

        inifechas("txtFechaInicio");
        inifechas("txtFechaLimite");

        $("#txtHoraInicio").focus(function () { $(this).inputmask("H:0") });
        $("#txtHoraFin").focus(function () { $(this).inputmask("H:0") });

        $("#txtHoraInicio_break").focus(function () { $(this).inputmask("H:0") });
        $("#txtHoraFin_break").focus(function () { $(this).inputmask("H:0") });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventos();
            fillCboEmpleados();
            fillCboZonaHoraria();
            fillBandeja_Break();
            initJqxGridHorarioEmpleados([]);
            cargainicial();
            cargamodal();
           
        }
    };

}();

function Actualizar() {
    var p_CODE = $('#txtCodigo').val();
    var p_EMPL_PIDM = $('#cboEmpleado').val();
    var p_FECHA_INICIO = $('#txtFechaInicio').val();
    var p_FECHA_LIMITE = $('#txtFechaLimite').val();
    var p_INC_FERIADOS_IND = $('#chkIncluirFeriados').is(':checked') ? 'S' : 'N';
    var p_ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    var ZOHO_CODE = $('#cboZonaHoraria').val();
    var CTLG_CODE = $("#slcEmpresa").val();

    if (vErrors(["cboEmpleado", "txtFechaInicio"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMGHEM.ASHX", {
            OPCION: "AH",
            CODE: p_CODE,
            EMPL_PIDM: p_EMPL_PIDM,
            FECHA_INICIO: p_FECHA_INICIO,
            FECHA_LIMITE: p_FECHA_LIMITE,
            INC_FERIADOS_IND: p_INC_FERIADOS_IND,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID,
            ZOHO_CODE: ZOHO_CODE,
            p_RHPLAHO_CTLG_CODE: CTLG_CODE

        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    obtenerDetalleHorarioEmpleado();
                    Listar_break_empleado();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}

function grabar() {

    var p_EMPL_PIDM = $('#cboEmpleado').val();
    var p_FECHA_INICIO = $('#txtFechaInicio').val();
    var p_FECHA_LIMITE = $('#txtFechaLimite').val();
    var p_INC_FERIADOS_IND = $('#chkIncluirFeriados').is(':checked') ? 'S' : 'N';
    var p_ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    var ZOHO_CODE = $('#cboZonaHoraria').val();
    var CTLG_CODE = $("#slcEmpresa").val();

    if (vErrors(["cboEmpleado", "txtFechaInicio"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMGHEM.ASHX", {
            OPCION: "CH",
            EMPL_PIDM: p_EMPL_PIDM,
            FECHA_INICIO: p_FECHA_INICIO,
            FECHA_LIMITE: p_FECHA_LIMITE,
            INC_FERIADOS_IND: p_INC_FERIADOS_IND,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID,
            ZOHO_CODE: ZOHO_CODE,
            p_RHPLAHO_CTLG_CODE: CTLG_CODE
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXISTE") {
                    alertCustom("YA EXISTE HORARIO DEL EMPLEADO SELECCIONADO.");
                }
                else {
                    $('#txtCodigo').val(res);
                    $("#cboEmpleado").attr("disabled", true);
                    $('#slcEmpresa').attr('disabled', true);
                    $('#divSeparador').removeAttr('style');
                    $('#divHorarioDetalle').removeAttr('style');
                    $('#divJqxGridDetalle').removeAttr('style');
                    $('#divSeparador_2').removeAttr('style');
                    $('#divBreakDetalle').removeAttr('style');
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }
    
}

function obtenerDetalleHorarioEmpleado() {
    var data = new FormData();
    data.append('OPCION', '3');
    data.append('CODE', $('#txtCodigo').val());

    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMGHEM.ASHX",
        data: data,
        contentType: false,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            if (datos != null) {
                initJqxGridHorarioEmpleados(JSON.stringify(datos));
            }
            else {
                initJqxGridHorarioEmpleados("[]");
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function initJqxGridHorarioEmpleados(v_JsonString) {
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
        source: dataAdapter,
        pagerButtonsCount: 20,
        altrows: true,
        filterable: false,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        showemptyrow: true,
        sortable: true,
        columns: [{ text: 'HORA INICIO', datafield: 'HORA_INICIO', columntype: 'textbox', width: '10%', cellsalign: 'center', align: 'center' },
                    { text: 'HORA FIN', datafield: 'HORA_FIN', columntype: 'textbox', width: '10%', cellsalign: 'center', align: 'center' },
                    { text: 'L', datafield: 'NLUNES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'M', datafield: 'NMARTES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'M', datafield: 'NMIERCOLES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'J', datafield: 'NJUEVES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'V', datafield: 'NVIERNES_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'S', datafield: 'NSABADO_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'D', datafield: 'NDOMINGO_IND', columntype: 'checkbox', width: '6%', cellsalign: 'center', align: 'center' },
                    { text: 'ZONA HORARIA', datafield: 'NZOHO_CODE', columntype: 'textbox', width: '38%', cellsalign: 'left', align: 'center' }
        ]
    });
}

function agregarDetalle() {

    var Errors = true;

    var p_HOEC_CODE = $('#txtCodigo').val();
    var p_HORA_INICIO = $('#txtHoraInicio').val();
    var p_HORA_FIN = $('#txtHoraFin').val();
    var p_LUNES_IND = $('#chkLunes').is(':checked') ? 'S' : 'N';
    var p_MARTES_IND = $('#chkMartes').is(':checked') ? 'S' : 'N';
    var p_MIERCOLES_IND = $('#chkMiercoles').is(':checked') ? 'S' : 'N';
    var p_JUEVES_IND = $('#chkJueves').is(':checked') ? 'S' : 'N';
    var p_VIERNES_IND = $('#chkViernes').is(':checked') ? 'S' : 'N';
    var p_SABADO_IND = $('#chkSabado').is(':checked') ? 'S' : 'N';
    var p_DOMINGO_IND = $('#chkDomingo').is(':checked') ? 'S' : 'N';
    var p_ESTADO_IND = 'A';
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    var dias = {
        LUNES_IND: p_LUNES_IND,
        MARTES_IND: p_MARTES_IND,
        MIERCOLES_IND: p_MIERCOLES_IND,
        JUEVES_IND: p_JUEVES_IND,
        VIERNES_IND: p_VIERNES_IND,
        SABADO_IND: p_SABADO_IND,
        DOMINGO_IND: p_DOMINGO_IND
    };




    Errors = validarHorarioEmpleado() && validarIngresoTabla(dias);

    if (Errors) {
        //if (vErrors(["txtHoraInicio", "txtHoraFin", "cboZonaHoraria"])) {
        Bloquear("divHorarioDetalle");
        $.post("vistas/NS/ajax/NSMGHEM.ASHX", {
            OPCION: "CHD",
            HOEC_CODE: p_HOEC_CODE,
            HORA_INICIO: p_HORA_INICIO,
            HORA_FIN: p_HORA_FIN,
            LUNES_IND: p_LUNES_IND,
            MARTES_IND: p_MARTES_IND,
            MIERCOLES_IND: p_MIERCOLES_IND,
            JUEVES_IND: p_JUEVES_IND,
            VIERNES_IND: p_VIERNES_IND,
            SABADO_IND: p_SABADO_IND,
            DOMINGO_IND: p_DOMINGO_IND,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("divHorarioDetalle");
                if (res == "OK") {
                    exito();
                    limpiarControlesDetalle();
                    obtenerDetalleHorarioEmpleado();
                    Listar_break_empleado();
                    $("#btnPlantilla").attr("disabled", true);
                } else {
                    noexito();
                }
            })
            .fail(function () {
                Desbloquear("divHorarioDetalle");
                noexito();
            });
        //}
    }
}

var agregarDetalle_Break = function () {

    var Errors = true;

    var p_HOEC_CODE = $('#txtCodigo').val();
    var p_HORA_INICIO = $('#txtHoraInicio_break').val();
    var p_HORA_FIN = $('#txtHoraFin_break').val();
    var p_LUNES_IND = $('#chk_lunes').is(':checked') ? 'S' : 'N';
    var p_MARTES_IND = $('#chk_martes').is(':checked') ? 'S' : 'N';
    var p_MIERCOLES_IND = $('#chk_miercoles').is(':checked') ? 'S' : 'N';
    var p_JUEVES_IND = $('#chk_jueves').is(':checked') ? 'S' : 'N';
    var p_VIERNES_IND = $('#chk_viernes').is(':checked') ? 'S' : 'N';
    var p_SABADO_IND = $('#chk_sabado').is(':checked') ? 'S' : 'N';
    var p_DOMINGO_IND = $('#chk_domingo').is(':checked') ? 'S' : 'N';
    var p_ESTADO_IND = 'A';
    var p_USUA_ID = $('#ctl00_lblusuario').html();
    var dias = {
        LUNES_IND: p_LUNES_IND,
        MARTES_IND: p_MARTES_IND,
        MIERCOLES_IND: p_MIERCOLES_IND,
        JUEVES_IND: p_JUEVES_IND,
        VIERNES_IND: p_VIERNES_IND,
        SABADO_IND: p_SABADO_IND,
        DOMINGO_IND: p_DOMINGO_IND
    };




    Errors = validarBreakEmpleado() && validaBreakDias(dias) && validarIngresoTabla_Break(dias) && validaBreak_Horario(dias);
    //

    if (Errors) {
      
        Bloquear("divBreakDetalle");
        $.post("vistas/NS/ajax/NSMGHEM.ASHX", {
            OPCION: "CBD",
            HOEC_CODE: p_HOEC_CODE,
            HORA_INICIO: p_HORA_INICIO,
            HORA_FIN: p_HORA_FIN,
            LUNES_IND: p_LUNES_IND,
            MARTES_IND: p_MARTES_IND,
            MIERCOLES_IND: p_MIERCOLES_IND,
            JUEVES_IND: p_JUEVES_IND,
            VIERNES_IND: p_VIERNES_IND,
            SABADO_IND: p_SABADO_IND,
            DOMINGO_IND: p_DOMINGO_IND,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("divBreakDetalle");
                if (res == "OK") {
                    exito();
                    limpiarControlesDetalle_Break();
                    Listar_break_empleado();
                } else {
                    noexito();
                }
            })
            .fail(function () {
                Desbloquear("divBreakDetalle");
                noexito();
            });
       
    }





}

function eliminarDetalle() {
    var indx = $('#jqxgrid').jqxGrid('getselectedrowindex');
    var seq = $('#jqxgrid').jqxGrid('getcellvalue', indx, "SEQ");
    var code = $('#jqxgrid').jqxGrid('getcellvalue', indx, "HOEC_CODE");

    if (indx!=-1) {
        Bloquear("divHorarioDetalle");
        $.post("vistas/NS/ajax/NSMGHEM.ASHX", {
            OPCION: "EHD",
            SEQ: seq,
            HOEC_CODE: code
        })
        .done(function (res) {
           
            if (res == "OK") {
               
                limpiarControlesDetalle();
                obtenerDetalleHorarioEmpleado();
                $.post("vistas/NS/ajax/NSMGHEM.ASHX", {
                    OPCION: "EBD",
                    HOEC_CODE: $("#txtCodigo").val()
                })
                .done(function (res) {
                    Desbloquear("divHorarioDetalle");
                    if (res == "OK") {
                        exito();
                        limpiarControlesDetalle_Break();
                        Listar_break_empleado();

                        var rows = $('#jqxgrid').jqxGrid('getrows').length;
                        if (rows == 0) {
                            $("#btnPlantilla").attr("disabled", false)
                        }
                       

                    } else {
                        noexito();
                    }
                });
            } else {
                noexito();
            }
        });
    } else {
        alertCustom("Seleccione un horario.")
    }


}

function eliminarDetalle_Break() {
   

    var code = $('#hf_hoec_code').val();

    if (code != "") {
        Bloquear("divBreakDetalle");
        $.post("vistas/NS/ajax/NSMGHEM.ASHX", {
            OPCION: "EBD",
            HOEC_CODE: code
        })
        .done(function (res) {
            Desbloquear("divBreakDetalle");
            if (res == "OK") {
                exito();
                limpiarControlesDetalle_Break();
                Listar_break_empleado();
            } else {
                noexito();
            }
        });
    } else {
        alertCustom("Seleccione la fila que desea eliminar.")
    }


}

function validarHorarioEmpleado() {
    var v_Errors = true;
    var v_message = "";

    var v_HoraInicoOrigen = $('#txtHoraInicio').val();
    var v_HoraFinOrigen = $('#txtHoraFin').val();

    v_message += "Campos incorrectos: <br><br>";

    if (!vErrorsNotMessage(["txtHoraInicio"])) {
        v_message += "* Hora Inicio." + "<br>";
        v_Errors = false;
    }

    if (!vErrorsNotMessage(["txtHoraFin"])) {
        v_message += "* Hora Fin." + "<br>";
        v_Errors = false;
    }



    if (v_Errors) {

        if ($('#txtHoraInicio').val().indexOf('_') != -1) {
            $('#txtHoraInicio').val('');
            if (!vErrorsNotMessage(["txtHoraInicio"])) {
                v_message += "* Hora Inicio." + "<br>";
                v_Errors = false;
                $('#txtHoraInicio').val(v_HoraInicoOrigen);
            }
        }

        if ($('#txtHoraFin').val().indexOf('_') != -1) {
            $('#txtHoraFin').val('');
            if (!vErrorsNotMessage(["txtHoraFin"])) {
                v_message += "* Hora Fin." + "<br>";
                v_Errors = false;
                $('#txtHoraFin').val(v_HoraFinOrigen);
            }
        }
        if (v_Errors) {

            var v_HoraInicio = parseInt($('#txtHoraInicio').val().split(':')[0] + $('#txtHoraInicio').val().split(':')[1]);
            var v_HoraFin = parseInt($('#txtHoraFin').val().split(':')[0] + $('#txtHoraFin').val().split(':')[1]);

            if (v_HoraInicio >= v_HoraFin) {
                $('#txtHoraInicio').val('');
                if (!vErrorsNotMessage(["txtHoraInicio"])) {
                    v_message += "* Hora Inicio debe ser menor a Hora Fin." + "<br>";
                    v_Errors = false;
                    $('#txtHoraInicio').val(v_HoraInicoOrigen);
                }
            }
        }
    }

 

    if (!v_Errors) {
        alertCustom(v_message);
    }

    return v_Errors;
}

function validarBreakEmpleado() {
    var v_Errors = true;
    var v_message = "";

    var v_HoraInicoOrigen = $('#txtHoraInicio_break').val();
    var v_HoraFinOrigen = $('#txtHoraFin_break').val();

    v_message += "Campos incorrectos: <br><br>";

    if (!vErrorsNotMessage(["txtHoraInicio_break"])) {
        v_message += "* Hora Inicio Break." + "<br>";
        v_Errors = false;
    }

    if (!vErrorsNotMessage(["txtHoraFin_break"])) {
        v_message += "* Hora Fin Break." + "<br>";
        v_Errors = false;
    }



    if (v_Errors) {

        if ($('#txtHoraInicio_break').val().indexOf('_') != -1) {
            $('#txtHoraInicio_break').val('');
            if (!vErrorsNotMessage(["txtHoraInicio_break"])) {
                v_message += "* Hora Inicio." + "<br>";
                v_Errors = false;
                $('#txtHoraInicio_break').val(v_HoraInicoOrigen);
            }
        }

        if ($('#txtHoraFin_break').val().indexOf('_') != -1) {
            $('#txtHoraFin_break').val('');
            if (!vErrorsNotMessage(["txtHoraFin_break"])) {
                v_message += "* Hora Fin." + "<br>";
                v_Errors = false;
                $('#txtHoraFin_break').val(v_HoraFinOrigen);
            }
        }
        if (v_Errors) {

            var v_HoraInicio = parseInt($('#txtHoraInicio_break').val().split(':')[0] + $('#txtHoraInicio_break').val().split(':')[1]);
            var v_HoraFin = parseInt($('#txtHoraFin_break').val().split(':')[0] + $('#txtHoraFin_break').val().split(':')[1]);

            if (v_HoraInicio >= v_HoraFin) {
                $('#txtHoraInicio_break').val('');
                if (!vErrorsNotMessage(["txtHoraInicio_break"])) {
                    v_message += "* Hora Inicio debe ser menor a Hora Fin." + "<br>";
                    v_Errors = false;
                    $('#txtHoraInicio_break').val(v_HoraInicoOrigen);
                }
            }
        }
    }



    if (!v_Errors) {
        alertCustom(v_message);
    }

    return v_Errors;
}

function limpiarControlesDetalle() {
    $('#txtHoraInicio').val('');
    $('#txtHoraFin').val('');

    $('#uniform-chkLunes span').removeClass();
    $('#chkLunes').attr('checked', false);

    $('#uniform-chkMartes span').removeClass();
    $('#chkMartes').attr('checked', false);

    $('#uniform-chkMiercoles span').removeClass();
    $('#chkMiercoles').attr('checked', false);

    $('#uniform-chkJueves span').removeClass();
    $('#chkJueves').attr('checked', false);

    $('#uniform-chkViernes span').removeClass();
    $('#chkViernes').attr('checked', false);

    $('#uniform-chkSabado span').removeClass();
    $('#chkSabado').attr('checked', false);

    $('#uniform-chkDomingo span').removeClass();
    $('#chkDomingo').attr('checked', false);


}

function limpiarControlesDetalle_Break() {
    $('#txtHoraInicio_break').val('');
    $('#txtHoraFin_break').val('');

    $('#uniform-chk_lunes span').removeClass();
    $('#chk_lunes').attr('checked', false);

    $('#uniform-chk_martes span').removeClass();
    $('#chk_martes').attr('checked', false);

    $('#uniform-chk_miercoles span').removeClass();
    $('#chk_miercoles').attr('checked', false);

    $('#uniform-chk_jueves span').removeClass();
    $('#chk_jueves').attr('checked', false);

    $('#uniform-chk_viernes span').removeClass();
    $('#chk_viernes').attr('checked', false);

    $('#uniform-chk_sabado span').removeClass();
    $('#chk_sabado').attr('checked', false);

    $('#uniform-chk_domingo span').removeClass();
    $('#chk_domingo').attr('checked', false);

    
}

function validarIngresoTabla(dias) {
    var rows = $('#jqxgrid').jqxGrid('getrows').length;
    var stringfinal = "";
    var flag = true;
    var p_HORA_INICIO = $('#txtHoraInicio').val();
    var p_HORA_FIN = $('#txtHoraFin').val();



    if (dias.LUNES_IND == "N" &&
        dias.MARTES_IND == "N" &&
        dias.MIERCOLES_IND == "N" &&
        dias.JUEVES_IND == "N" &&
        dias.VIERNES_IND == "N" &&
        dias.SABADO_IND == "N" &&
        dias.DOMINGO_IND == "N") {
        alertCustom("No se encontró ningún día marcado.");
        return false;
    }


    for (var i = 0; i < rows; i++) {

        var horaini = $('#jqxgrid').jqxGrid('getcellvalue', i, "HORA_INICIO");
        var horafin = $('#jqxgrid').jqxGrid('getcellvalue', i, "HORA_FIN");
        var nlunes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NLUNES_IND"));
        var nmartes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NMARTES_IND"));
        var nmiercoles = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NMIERCOLES_IND"));
        var njueves = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NJUEVES_IND"));
        var nviernes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NVIERNES_IND"));
        var nsabado = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NSABADO_IND"));
        var ndomingo = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NDOMINGO_IND"));


        if ((p_HORA_INICIO > horaini) && (p_HORA_INICIO < horafin) ||
            (p_HORA_FIN > horaini) && (p_HORA_INICIO < horafin)) {

            if (dias.LUNES_IND == 'S' && nlunes) { stringfinal += "LUNES "; flag &= false; }
            if (dias.MARTES_IND == 'S' && nmartes) { stringfinal += "MARTES "; flag &= false; }
            if (dias.MIERCOLES_IND == 'S' && nmiercoles) { stringfinal += "MIERCOLES "; flag &= false; }
            if (dias.JUEVES_IND == 'S' && njueves) { stringfinal += "JUEVES "; flag &= false; }
            if (dias.VIERNES_IND == 'S' && nviernes) { stringfinal += "VIERNES "; flag &= false; }
            if (dias.SABADO_IND == 'S' && nsabado) { stringfinal += "SABADO "; flag &= false; }
            if (dias.DOMINGO_IND == 'S' && ndomingo) { stringfinal += "DOMINGO "; flag &= false; }

        }


    }

    if (!flag) {
        alertCustom("Horas no disponibles en día(s): " + stringfinal);
    }

    return flag;

}

var Listar_break_empleado = function () {
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMGHEM.ashx?OPCION=6&HOEC_CODE=" + $("#txtCodigo").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {

                oTableBreak.fnClearTable();
                oTableBreak.fnAddData(datos);
                oTableBreak.fnAdjustColumnSizing();

            }
            else {

                oTableBreak.fnClearTable();

            }

            Desbloquear("ventana");

        },
        error: function (msg) {
            alert(msg);
            Desbloquear("ventana");
        }

    });
}

function validarIngresoTabla_Break(dias) {
    //var rows = oTableBreak.fnGetData().length
    var rows_jqx = $('#jqxgrid').jqxGrid('getrows').length;
    var stringfinal = "";
    var flag = true;
    var p_HORA_INICIO = $('#txtHoraInicio_break').val();
    var p_HORA_FIN = $('#txtHoraFin_break').val();



    if (dias.LUNES_IND == "N" &&
        dias.MARTES_IND == "N" &&
        dias.MIERCOLES_IND == "N" &&
        dias.JUEVES_IND == "N" &&
        dias.VIERNES_IND == "N" &&
        dias.SABADO_IND == "N" &&
        dias.DOMINGO_IND == "N") {
        alertCustom("No se encontró ningún día marcado.");
        return false;
    }


    if (rows_jqx > 0) {
        for (var j = 0; j < rows_jqx; j++) {
            //for (var i = 0; i < rows; i++) {

            var horaini_jqx = $('#jqxgrid').jqxGrid('getcellvalue', j, "HORA_INICIO");
            var horafin_jqx = $('#jqxgrid').jqxGrid('getcellvalue', j, "HORA_FIN");
            var nlunes_jqx = parseInt($('#jqxgrid').jqxGrid('getcellvalue', j, "NLUNES_IND"));
            var nmartes_jqx = parseInt($('#jqxgrid').jqxGrid('getcellvalue', j, "NMARTES_IND"));
            var nmiercoles_jqx = parseInt($('#jqxgrid').jqxGrid('getcellvalue', j, "NMIERCOLES_IND"));
            var njueves_jqx = parseInt($('#jqxgrid').jqxGrid('getcellvalue', j, "NJUEVES_IND"));
            var nviernes_jqx = parseInt($('#jqxgrid').jqxGrid('getcellvalue', j, "NVIERNES_IND"));
            var nsabado_jqx = parseInt($('#jqxgrid').jqxGrid('getcellvalue', j, "NSABADO_IND"));
            var ndomingo_jqx = parseInt($('#jqxgrid').jqxGrid('getcellvalue', j, "NDOMINGO_IND"));



            //var horaini = oTableBreak.fnGetData()[i]["HORA_INICIO"];
            //var horafin = oTableBreak.fnGetData()[i]["HORA_FIN"];
            //var nlunes = parseInt(oTableBreak.fnGetData()[i]["LUNES"]);
            //var nmartes = parseInt(oTableBreak.fnGetData()[i]["MARTES"]);
            //var nmiercoles = parseInt(oTableBreak.fnGetData()[i]["MIERCOLES"]);
            //var njueves = parseInt(oTableBreak.fnGetData()[i]["JUEVES"]);
            //var nviernes = parseInt(oTableBreak.fnGetData()[i]["VIERNES"]);
            //var nsabado = parseInt(oTableBreak.fnGetData()[i]["SABADO"]);
            //var ndomingo = parseInt(oTableBreak.fnGetData()[i]["DOMINGOS"]);


            if ((p_HORA_INICIO > horaini_jqx) && (p_HORA_INICIO < horafin_jqx) ||
            (p_HORA_FIN > horaini_jqx) && (p_HORA_INICIO < horafin_jqx)) {

                //    if ((p_HORA_INICIO > horaini_jqx) && (p_HORA_INICIO <= horafin_jqx) ||
                //(p_HORA_FIN > horaini_jqx) && (p_HORA_FIN <= horafin_jqx)) {

                if (dias.LUNES_IND == 'S' && nlunes_jqx) { stringfinal += "LUNES "; flag &= false; }
                if (dias.MARTES_IND == 'S' && nmartes_jqx) { stringfinal += "MARTES "; flag &= false; }
                if (dias.MIERCOLES_IND == 'S' && nmiercoles_jqx) { stringfinal += "MIERCOLES "; flag &= false; }
                if (dias.JUEVES_IND == 'S' && njueves_jqx) { stringfinal += "JUEVES "; flag &= false; }
                if (dias.VIERNES_IND == 'S' && nviernes_jqx) { stringfinal += "VIERNES "; flag &= false; }
                if (dias.SABADO_IND == 'S' && nsabado_jqx) { stringfinal += "SABADO "; flag &= false; }
                if (dias.DOMINGO_IND == 'S' && ndomingo_jqx) { stringfinal += "DOMINGO "; flag &= false; }

                //}
                //}



            }
        }

    }
    else {
        alertCustom("No se encontró ningún horario registrado.");
        return false;
    }

    if (!flag) {
        alertCustom("Horas no disponibles en día(s): " + stringfinal);
    }

    return flag;

}

function validaBreakDias(dias) {

    var rows = oTableBreak.fnGetData().length
    var stringfinal = "";
    var flag = true;

    for (var i = 0; i < rows; i++) {

        var nlunes = parseInt(oTableBreak.fnGetData()[i]["LUNES"]);
        var nmartes = parseInt(oTableBreak.fnGetData()[i]["MARTES"]);
        var nmiercoles = parseInt(oTableBreak.fnGetData()[i]["MIERCOLES"]);
        var njueves = parseInt(oTableBreak.fnGetData()[i]["JUEVES"]);
        var nviernes = parseInt(oTableBreak.fnGetData()[i]["VIERNES"]);
        var nsabado = parseInt(oTableBreak.fnGetData()[i]["SABADO"]);
        var ndomingo = parseInt(oTableBreak.fnGetData()[i]["DOMINGOS"]);


        if (dias.LUNES_IND == 'S' && nlunes) { stringfinal += "LUNES "; flag &= false; }
        if (dias.MARTES_IND == 'S' && nmartes) { stringfinal += "MARTES "; flag &= false; }
        if (dias.MIERCOLES_IND == 'S' && nmiercoles) { stringfinal += "MIERCOLES "; flag &= false; }
        if (dias.JUEVES_IND == 'S' && njueves) { stringfinal += "JUEVES "; flag &= false; }
        if (dias.VIERNES_IND == 'S' && nviernes) { stringfinal += "VIERNES "; flag &= false; }
        if (dias.SABADO_IND == 'S' && nsabado) { stringfinal += "SABADO "; flag &= false; }
        if (dias.DOMINGO_IND == 'S' && ndomingo) { stringfinal += "DOMINGO "; flag &= false; }
    }


    if (!flag) {
        alertCustom("Ya existe break para los día(s): " + stringfinal);
    }

    return flag;

}

function validaBreak_Horario(dias) {

    var rows = $('#jqxgrid').jqxGrid('getrows').length;
    var stringfinal = "";
    var flag = true;

    var oLunes = false, oMartes = false, oMiercoles = false, oJueves = false, oViernes = false, oSabado = false, oDomingo = false;

    for (var i = 0; i < rows; i++) {


        var nlunes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NLUNES_IND"));
        var nmartes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NMARTES_IND"));
        var nmiercoles = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NMIERCOLES_IND"));
        var njueves = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NJUEVES_IND"));
        var nviernes = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NVIERNES_IND"));
        var nsabado = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NSABADO_IND"));
        var ndomingo = parseInt($('#jqxgrid').jqxGrid('getcellvalue', i, "NDOMINGO_IND"));


      
        if (!oLunes) { if (dias.LUNES_IND == 'S' && nlunes) {  oLunes = true; } }
        if (!oMartes) { if (dias.MARTES_IND == 'S' && nmartes) {  oMartes = true; } }
        if (!oMiercoles) { if (dias.MIERCOLES_IND == 'S' && nmiercoles) {  oMiercoles = true; } }
        if (!oJueves) { if (dias.JUEVES_IND == 'S' && njueves) {  oJueves = true; } }
        if (!oViernes) { if (dias.VIERNES_IND == 'S' && nviernes) {  oViernes = true; } }
        if (!oSabado) { if (dias.SABADO_IND == 'S' && nsabado) { oSabado = true; } }
        if (!oDomingo) { if (dias.DOMINGO_IND == 'S' && ndomingo) {  oDomingo = true; } }
           

    }

    if (!oLunes && dias.LUNES_IND == 'S') { stringfinal += "LUNES "; }
    if (!oMartes && dias.MARTES_IND == 'S') { stringfinal += "MARTES "; }
    if (!oMiercoles && dias.MIERCOLES_IND == 'S') { stringfinal += "MIERCOLES "; }
    if (!oJueves && dias.JUEVES_IND == 'S') { stringfinal += "JUEVES "; }
    if (!oViernes && dias.VIERNES_IND == 'S') { stringfinal += "VIERNES "; }
    if (!oSabado && dias.SABADO_IND == 'S') { stringfinal += "SABADO "; }
    if (!oDomingo && dias.DOMINGO_IND == 'S') { stringfinal += "DOMINGO "; }


    if (stringfinal != "") {
        alertCustom("No se puede insertar break porque no existe horario para  los día(s): " + stringfinal);
        flag = false
    }


    return flag;

}

var cargamodal = function () {
    $("#btnPlantilla").click(function () {
        CargaPopUp();
    });
}

function CargaPopUp() {
    Bloquear("muestralistap");
    var p_RHPLAHO_CTLG_CODE = $("#ctl00_hddctlg").val();
    $.post("vistas/NS/ajax/NSMGHEM.ASHX", { OPCION: 'LCP', p_RHPLAHO_CTLG_CODE: p_RHPLAHO_CTLG_CODE },
        function (res) {
            Desbloquear("muestralistap");
            $("#divmodal").html("");
            $("#divmodal").html(res);
            $('#muestralistap').modal('show');
            //  alert(res);

            var tablemod = $('#tblbmodal').DataTable({

                "scrollCollapse": true,
                //"paging": false,
                //"info": false
            });


            ////////////////////////////////////////$('#tblbmodal tbody').on('click', 'tr', function () {
            ////////////////////////////////////////    //if ($(this).hasClass('selected')) {
            ////////////////////////////////////////    //    $(this).removeClass('selected');
            ////////////////////////////////////////    //}
            ////////////////////////////////////////    //else {
            ////////////////////////////////////////    //    tablemod.$('tr.selected').removeClass('selected');
            ////////////////////////////////////////    //    $(this).addClass('selected');
            ////////////////////////////////////////    //}


            ////////////////////////////////////////    //$("#grabar").html("<i class='icon-pencil'></i> Grabar Datos");
            ////////////////////////////////////////    //$("#grabar").attr("href", "javascript:GrabarPension();");


            ////////////////////////////////////////    $('#txtcodigo').val("");
            ////////////////////////////////////////    $('#muestralistap').modal('hide');
            ////////////////////////////////////////    var IDPER2 = $(this).attr("id");


            ////////////////////////////////////////    $('#txtpidm').val(IDPER2);
            ////////////////////////////////////////    $('#txtnombre').val($('#per' + IDPER2).text());

            ////////////////////////////////////////    $('#txtruc').val($('#ruc' + IDPER2).text());
            ////////////////////////////////////////    //$('#txtPension').val($('#raz' + IDPER2).text());

            ////////////////////////////////////////    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfPDIM').val(IDPER2);
            ////////////////////////////////////////});

            $('#cboPlantilla').select2();
            Valor();
        });

}

function Valor() {
    var p_RHDEPL_RHPLAHO_CODE = $("#cboPlantilla").val();
    $.post("vistas/NS/ajax/NSMGHEM.ASHX", { OPCION: 'LDP', p_RHDEPL_RHPLAHO_CODE: p_RHDEPL_RHPLAHO_CODE },
        function (res) {
            $("#DivTabla").html("");
            $("#DivTabla").html(res);
            $('#tblHorario').DataTable({
                "scrollCollapse": true
            });
        });

}

function Valor() {
    var p_RHDEPL_RHPLAHO_CODE = $("#cboPlantilla").val();
    $.post("vistas/NS/ajax/NSMGHEM.ASHX", { OPCION: 'LDP', p_RHDEPL_RHPLAHO_CODE: p_RHDEPL_RHPLAHO_CODE },
        function (res) {
            $("#DivTabla").html("");
            $("#DivTabla").html(res);
            var Tabla = $('#tblHorario').DataTable({
                "scrollCollapse": true
            });
        });

}

function CrearPlantillaHorario() {
    //if (Tabla.row().data()) {
    //}

    Bloquear("divHorarioDetalle");
    var p_RHDEPL_RHPLAHO_CODE = $("#cboPlantilla").val();
    var p_PEBHOED_HOEC_CODE = $("#txtCodigo").val();
    $.post("vistas/NS/ajax/NSMGHEM.ASHX",
        { OPCION: "C", p_RHDEPL_RHPLAHO_CODE: p_RHDEPL_RHPLAHO_CODE, p_PEBHOED_HOEC_CODE: p_PEBHOED_HOEC_CODE })
    .done(function (res) {
        Desbloquear("divHorarioDetalle");
        if (res == "OK") {
            exito();
            $('#muestralistap').modal('hide');
            limpiarControlesDetalle();
            obtenerDetalleHorarioEmpleado();
            $("#btnPlantilla").attr("disabled", true);
        } else {
            noexito();
        }
    });
}

function AgregaItemCombo(Cod, Nom) {
    var selectEmpleado = $('#cboEmpleado');
    selectEmpleado.append('<option value="' + Cod + '">' + Nom + '</option>');
    selectEmpleado.select2("val",Cod);
   // selectEmpleado.change();
}

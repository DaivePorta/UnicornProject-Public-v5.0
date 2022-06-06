var NSLPLAN = function () {
    return {
        init: function () {
            ListarConfiguracion();
        }
    };


  

    function ListarConfiguracion() {
        $('#tblPlantilla').dataTable().fnDestroy()
        var Emp = $("#ctl00_hddctlg").val();
        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSLPLAN.ASHX?Opcion=LHP&p_RHPLAHO_CTLG_CODE=" + Emp,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos == null) {
                    iniciaTabla('tblPlantilla');
                    return false;
                }
                var parms = {
                    data: datos,
                    columns: [
                        {
                            data: "CODIGO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                                $(td).css('display', 'none')
                            }
                        },
                        {
                            data: "NOMBRE",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'left')
                            }
                        },
                        {
                            data: "ESTADO",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center')
                            }
                        }
                        //,
                        //{
                        //    data: null,
                        //    defaultContent: '<a class="btn red Eliminar" title="Eliminar fila."><i class="icon-minus"></i></a>',
                        //    createdCell: function (td, cellData, rowData, row, col) {
                        //        $(td).attr('align', 'center')
                        //    }
                        //}
                    ]

                }
                oTableRegimen = iniciaTabla('tblPlantilla', parms);

                $('#tblPlantilla').removeAttr('style');
                $('#tblPlantilla tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        oTableRegimen.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        var pos = oTableRegimen.fnGetPosition(this);
                        var row = oTableRegimen.fnGetData(pos);
                        var Codigo = row.CODIGO;
                        window.location.href = '?f=NSMPLAN&Codigo=' + Codigo;
                    }
                });
                

            },
            error: function (msg) {
                alert(msg);
            }
        });

    }
}();
var NSMPLAN = function () {
    return {
        init: function () {
            CargaInicial();
            //$("#txtHoraInicio").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
            //$("#txtHoraFin").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
            $("#txtHoraInicio").focus(function () { $(this).inputmask("H:0") });
            $("#txtHoraFin").focus(function () { $(this).inputmask("H:0") });
            if ($("#txtCodigo").val() != "") {
                $('#divHorarioDetalle').css({ 'display': 'block' });
                $('#divTabla').css({ 'display': 'block' });
                $('#divSeparador').css({ 'display': 'block' });
                $('#divSeparador2').css({ 'display': 'block' });
                
            } else {
                $('#divHorarioDetalle').css({ 'display': 'none' });
                $('#divTabla').css({ 'display': 'none' });
                $('#divSeparador').css({ 'display': 'none' });
                $('#divSeparador2').css({ 'display': 'none' });
                $('#tblHorario').dataTable();
            }

        }
    };





  

}();

var CargaInicial = function () {

   
    
    var Codigo = ObtenerQueryString("Codigo");
    var Emp = $("#ctl00_hddctlg").val();
    $('#uniform-chkActivo span').removeClass().addClass("checked");
    $('#chkActivo').attr('checked', true);

    if (typeof (Codigo) !== "undefined") {

        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMPLAN.ASHX?OPCION=LHP&p_RHPLAHO_CODE=" + Codigo + "&p_RHPLAHO_CTLG_CODE=" + Emp,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                $("#txtCodigo").val(datos[0].CODIGO);
                //$('#cboEmpleado').select2('val', datos[0].EMPL_PIDM);
                //$('#cboEmpleado').attr('disabled', true);
                $("#txtNombre").val(datos[0].NOMBRE);
                //$("#txtFechaInicio").val(datos[0].FECHA_INICIO);
                if (datos[0].ESTADO == "A") {
                    $('#uniform-chkActivo span').removeClass().addClass("checked");
                    $('#chkActivo').attr('checked', true);
                } else {
                    $('#uniform-chkActivo span').removeClass();
                    $('#chkActivo').attr('checked', false);
                }
                //if (datos[0].INC_FERIADOS_IND == "SI") {
                //    $('#uniform-chkIncluirFeriados span').removeClass().addClass("checked");
                //    $('#chkIncluirFeriados').attr('checked', true);
                //} else {
                //    $('#uniform-chkIncluirFeriados span').removeClass();
                //    $('#chkIncluirFeriados').attr('checked', false);
                //}
                //$("#txtFechaLimite").val(datos[0].FECHA_LIMITE);
                //$('#divSeparador').removeAttr('style');
                //$('#divHorarioDetalle').removeAttr('style');
                //$('#divJqxGridDetalle').removeAttr('style');
                $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                $("#grabar").attr("href", "javascript:Actualizar();");

                //obtenerDetalleHorarioEmpleado();
                ListarDetalle();
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }
}


function ListarDetalle() {
    $('#tblHorario').dataTable().fnDestroy();
    var Emp = $("#ctl00_hddctlg").val();
    var Codigo = $("#txtCodigo").val();
    $.ajax({
        type: "POST",
        url: "vistas/NS/ajax/NSMPLAN.ASHX?Opcion=LDHP&p_RHDEPL_RHPLAHO_CODE=" + Codigo,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            if (datos == null) {
                iniciaTabla('tblHorario');
                return false;
            }
            var parms = {
                data: datos,
                columns: [
                    {
                        data: "CODIGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                            $(td).css('display', 'none')
                        }
                    },
                    {
                        data: "HORA_INICIO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                    {
                        data: "HORA_FIN",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                    {
                        data: "LUNES",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                    {
                        data: "MARTES",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                    {
                        data: "MIERCOLES",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                    {
                        data: "JUEVES",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                    {
                        data: "VIERNES",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                    {
                        data: "SABADO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                    {
                        data: "DOMINGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                    ,
                   
                    {
                        data: null,
                        defaultContent: '<a class="btn red Eliminar" title="Eliminar fila."><i class="icon-minus"></i></a>',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                ]

            }
            oListado = iniciaTabla('tblHorario', parms);

            $('#tblHorario').removeAttr('style');
            //$('#tblPlantilla tbody').on('click', 'tr', function () {
            //    if ($(this).hasClass('selected')) {
            //        $(this).removeClass('selected');
            //    }
            //    else {
            //        oTableRegimen.$('tr.selected').removeClass('selected');
            //        $(this).addClass('selected');

            //        var pos = oTableRegimen.fnGetPosition(this);
            //        var row = oTableRegimen.fnGetData(pos);
            //        var Codigo = row.CODIGO;
            //        window.location.href = '?f=NSMPLAN&Codigo=' + Codigo;
            //    }
            //});
            $('#tblHorario tbody').on('click', 'a', function () {//si existieran dos etiquetas en una sola fila

                var pos = oListado.api(true).row($(this).parent().parent()).index();
                var row = oListado.fnGetData(pos);
                var p_RHDEPL_CODE = row.CODIGO;//nombre de la data

                var row2 = $(this).parents('tr')[0];

                $.ajaxSetup({ async: false });
                Bloquear("ventana");
                $.post("vistas/NS/ajax/NSMPLAN.ASHX", { OPCION: "EDHP", p_RHDEPL_CODE: p_RHDEPL_CODE },
                 function (res) {
                     if (res.indexOf("error") == -1) {
                         exito();
                         oListado.fnDeleteRow(pos);
                     } else {
                         noexito();
                     }
                 }
                 );


                Desbloquear("ventana");
                $.ajaxSetup({ async: true });
            });

        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function grabar() {

    var p_RHPLAHO_NOMBRE = $('#txtNombre').val();
    var p_RHPLAHO_ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
    var p_RHPLAHO_CTLG_CODE = $("#ctl00_hddctlg").val();
    var p_RHPLAHO_USUA_ID = $('#ctl00_lblusuario').html();

    if (vErrors(["txtNombre"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMPLAN.ASHX", {
            OPCION: "CHP",
            p_RHPLAHO_NOMBRE: p_RHPLAHO_NOMBRE,
            p_RHPLAHO_ESTADO_IND: p_RHPLAHO_ESTADO_IND,
            p_RHPLAHO_CTLG_CODE: p_RHPLAHO_CTLG_CODE,
            p_RHPLAHO_USUA_ID: p_RHPLAHO_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXIS") {
                    alertCustom("Ya existe una plantilla con esos datos registrada.");
                }
                else {
                    $('#txtCodigo').val(res);
                    $('#divHorarioDetalle').css({ 'display': 'block' });
                    $('#divTabla').css({ 'display': 'block' });
                    $('#divSeparador').css({ 'display': 'block' });
                    $('#divSeparador2').css({ 'display': 'block' });
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

function Actualizar() {

    var p_RHPLAHO_CODE = $('#txtCodigo').val();
    var p_RHPLAHO_NOMBRE = $('#txtNombre').val();
    var p_RHPLAHO_ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
    var p_RHPLAHO_CTLG_CODE = $("#ctl00_hddctlg").val();
    var p_RHPLAHO_USUA_ID = $('#ctl00_lblusuario').html();

    if (vErrors(["txtNombre"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMPLAN.ASHX", {
            OPCION: "EHP",
            p_RHPLAHO_CODE:p_RHPLAHO_CODE,
            p_RHPLAHO_NOMBRE: p_RHPLAHO_NOMBRE,
            p_RHPLAHO_ESTADO_IND: p_RHPLAHO_ESTADO_IND,
            p_RHPLAHO_CTLG_CODE: p_RHPLAHO_CTLG_CODE,
            p_RHPLAHO_USUA_ID: p_RHPLAHO_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXIS") {
                    alertCustom("Ya existe una plantilla con esos datos registrada.");
                }
                else {
                    //$('#txtCodigo').val(res);
                    //$('#divHorarioDetalle').css({ 'display': 'block' });
                    //$('#divTabla').css({ 'display': 'block' });
                    //$('#divSeparador').css({ 'display': 'block' });
                    exito();
                    //$("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    //$("#grabar").attr("href", "javascript:Actualizar();");
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }


}


function agregarDetalle() {

    var Errors = true;

    var p_RHDEPL_RHPLAHO_CODE = $('#txtCodigo').val();
    var p_RHDEPL_HORA_INICIO = $('#txtHoraInicio').val();
    var p_RHDEPL_HORA_FIN = $('#txtHoraFin').val();
    var p_RHDEPL_LUNES_IND = $('#chkLunes').is(':checked') ? 'S' : 'N';
    var p_RHDEPL_MARTES_IND = $('#chkMartes').is(':checked') ? 'S' : 'N';
    var p_RHDEPL_MIERCOLES_IND = $('#chkMiercoles').is(':checked') ? 'S' : 'N';
    var p_RHDEPL_JUEVES_IND = $('#chkJueves').is(':checked') ? 'S' : 'N';
    var p_RHDEPL_VIERNES_IND = $('#chkViernes').is(':checked') ? 'S' : 'N';
    var p_RHDEPL_SABADO_IND = $('#chkSabado').is(':checked') ? 'S' : 'N';
    var p_RHDEPL_DOMINGO_IND = $('#chkDomingo').is(':checked') ? 'S' : 'N';
    var p_RHDEPL_ESTADO_IND = 'A';
    var p_RHDEPL_USUA_ID = $('#ctl00_lblusuario').html();
    var dias = {
        //p_RHDEPL_RHPLAHO_CODE: p_RHDEPL_RHPLAHO_CODE,
        //p_RHDEPL_HORA_INICIO: p_RHDEPL_HORA_INICIO,
        //p_RHDEPL_HORA_FIN:p_RHDEPL_HORA_FIN ,
        p_RHDEPL_LUNES_IND:p_RHDEPL_LUNES_IND ,
        p_RHDEPL_MARTES_IND: p_RHDEPL_MARTES_IND,
        p_RHDEPL_MIERCOLES_IND:p_RHDEPL_MIERCOLES_IND ,
        p_RHDEPL_JUEVES_IND: p_RHDEPL_JUEVES_IND,
        p_RHDEPL_VIERNES_IND: p_RHDEPL_VIERNES_IND,
        p_RHDEPL_SABADO_IND: p_RHDEPL_SABADO_IND,
        p_RHDEPL_DOMINGO_IND: p_RHDEPL_DOMINGO_IND
        //,
        //p_RHDEPL_ZOHO_CODE: p_RHDEPL_ZOHO_CODE,
        //p_RHDEPL_ZOHO_CODE: p_RHDEPL_ZOHO_CODE,
        //p_RHDEPL_ESTADO_IND: p_RHDEPL_ESTADO_IND,
        //p_RHDEPL_USUA_ID: p_RHDEPL_USUA_ID
    };
    //p_RHDEPL_SEQ,

    //Errors = validarHorarioEmpleado() && validarIngresoTabla(dias);
    Errors = validarIngresoTabla(dias) ;
    if (Errors) {
        if (vErrors(["txtHoraInicio", "txtHoraFin"])) {
            
        Bloquear("divHorarioDetalle");
            $.post("vistas/NS/ajax/NSMPLAN.ASHX", {
            OPCION: "CDHP",
            p_RHDEPL_RHPLAHO_CODE: p_RHDEPL_RHPLAHO_CODE,
            p_RHDEPL_HORA_INICIO: p_RHDEPL_HORA_INICIO,
            p_RHDEPL_HORA_FIN:p_RHDEPL_HORA_FIN ,
            p_RHDEPL_LUNES_IND:p_RHDEPL_LUNES_IND ,
            p_RHDEPL_MARTES_IND: p_RHDEPL_MARTES_IND,
            p_RHDEPL_MIERCOLES_IND:p_RHDEPL_MIERCOLES_IND ,
            p_RHDEPL_JUEVES_IND: p_RHDEPL_JUEVES_IND,
            p_RHDEPL_VIERNES_IND: p_RHDEPL_VIERNES_IND,
            p_RHDEPL_SABADO_IND: p_RHDEPL_SABADO_IND,
            p_RHDEPL_DOMINGO_IND: p_RHDEPL_DOMINGO_IND,
            p_RHDEPL_ESTADO_IND: p_RHDEPL_ESTADO_IND,
            p_RHDEPL_USUA_ID: p_RHDEPL_USUA_ID
        })
            .done(function (res) {
                Desbloquear("divHorarioDetalle");
                if (res != "EXIS") {
                    exito();
                    ListarDetalle();
                    //$('#txtHoraInicio').val('');
                    //$('#txtHoraFin').val('');
                    limpiarControlesDetalle();
                    //Desbloquear("divTabla");
                } else {
                    //noexito();
                    alertCustom('Ya existe en esta plantilla con un horario igual.');
                }
            })
            .fail(function () {
                Desbloquear("divHorarioDetalle");
                noexito();
            });
            
        }
    }
}

function validarIngresoTabla(dias) {
    //var rows = $('#jqxgrid').jqxGrid('getrows').length;
    var stringfinal = "";
    var flag = true;
    //var p_HORA_INICIO = $('#txtHoraInicio').val();
    //var p_HORA_FIN = $('#txtHoraFin').val();

    //if (((dias.LUNES_IND == dias.MARTES_IND )== (dias.MIERCOLES_IND == dias.JUEVES_IND)) == ((dias.VIERNES_IND == dias.SABADO_IND) == (dias.DOMINGO_IND == "N"))) {
    //    alertCustom("No se encontró ningún día marcado.");
    //    return false;
    //}
    var v_message = "";
    if (dias.p_RHDEPL_LUNES_IND == "N" &&
        dias.p_RHDEPL_MARTES_IND == "N" &&
        dias.p_RHDEPL_MIERCOLES_IND == "N" &&
        dias.p_RHDEPL_JUEVES_IND == "N" &&
        dias.p_RHDEPL_VIERNES_IND == "N" &&
        dias.p_RHDEPL_SABADO_IND == "N" &&
        dias.p_RHDEPL_DOMINGO_IND == "N") {
        alertCustom("No se encontró ningún día marcado.");
        return false;
    }
    //else {
    //    return true;
    //}

    if ($('#txtHoraInicio').val().indexOf('_') != -1) {
        $('#txtHoraInicio').val('');
        if (vErrors(["txtHoraInicio"])) {
            v_message += "* Hora Inicio." + "<br>";
            //$('#txtHoraInicio').val(v_HoraInicoOrigen);
        }
    }

    if ($('#txtHoraFin').val().indexOf('_') != -1) {
        $('#txtHoraFin').val('');
        if (vErrors(["txtHoraFin"])) {
            v_message += "* Hora Inicio." + "<br>";
            //$('#txtHoraFin').val(v_HoraFinOrigen);
        }
    }
    //var v_HoraInicio = parseInt($('#txtHoraInicio').val().split(':')[0] + $('#txtHoraInicio').val().split(':')[1]);
    //var v_HoraFin = parseInt($('#txtHoraFin').val().split(':')[0] + $('#txtHoraFin').val().split(':')[1]);
    var Inicio = $('#txtHoraInicio').val().split(':');
    var Fin = $('#txtHoraFin').val().split(':');

    var v_HoraInicioUno = Inicio[0];
    var v_HoraInicioDos =Inicio[1];
    var v_HoraFinUno = Fin[0];
    var v_HoraFinDos = Fin[1];

    var v_HoraInicio = v_HoraInicioUno.toString() + v_HoraInicioDos.toString();
    var v_HoraFin = v_HoraFinUno.toString() + v_HoraFinDos.toString();

    if (parseInt(v_HoraInicio) >= parseInt(v_HoraFin)) {
        //$('#txtHoraInicio').val('');
        if (vErrors(["txtHoraInicio"])) {
            v_message += "* Hora Inicio debe ser menor a Hora Fin." + "<br>";            
            //$('#txtHoraInicio').val(v_HoraInicoOrigen);
        }
    }
    if (v_message != "") {
        alertCustom(v_message);
        return false;
    }
    return true;
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

    $('#cboZonaHoraria').select2('val', '');
}


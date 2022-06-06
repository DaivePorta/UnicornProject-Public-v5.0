oTablaAdelantos = [];
var NNLAUAD = function () {
    var plugins = function () {
        //$('#cboEmpleado').select2();
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();

        $('#txt_Anio').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '+1y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#txt_Mes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());

    }

    var fillCboEmpresa = function () {

        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option   value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
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
                $('#cboSucursal').empty();
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#cboSucursal").select2("val", $("#ctl00_hddestablecimiento").val()).change();

                    } else {

                        $("#cboSucursal").select2("val", datos[0].CODIGO).change();
                    }


                }
                else {
                    infocustom2("No existen establecimientos registrados")
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }

    var fillCboEmpleado = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val() + "&ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    $('#cboEmpleado').append('<option  value ="">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', '').change();
                } else {
                    $('#cboEmpleado').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            ListarSucursales($("#cboEmpresa").val());
        });

        $('#cboSucursal').on('change', function () {
            fillCboEmpleado();
        });

        $('#cboEmpleado').on('change', function () {
            GetAdelantos();
        });

        $("#txt_Mes").datepicker().on("changeDate", function () {
            GetAdelantos();
        });

        $("#txt_Anio").datepicker().on("changeDate", function () {
            GetAdelantos();
        });


        $('#chkTodos').on('change', function () {

            if ($('#chkTodos').is(':checked')) {
                $('#txt_Mes').attr('disabled', 'disabled');
                $('#txt_Anio').attr('disabled', 'disabled');

            } else {
                $('#txt_Mes').removeAttr('disabled');
                $('#txt_Anio').removeAttr('disabled');
            }
            GetAdelantos();
        });


    }

    function cargainicial() {
        $('#chkTodos').attr('checked', true).parent().addClass("checked")
        fillCboEmpresa();
        $('#chkTodos').change();

    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            ListarSucursales($("#cboEmpresa").val());
            cargainicial();

        }
    };

}();


var NNMAUAD = function () {
    var plugins = function () {
        $('#cboEmpleado').select2();
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();

        $('#txtFechaReg').datepicker('setDate', 'Now')
        $('#txtMotivo').inputmask({ "mask": "E", "repeat": 100, "greedy": false });
    }

    var fillCboMoneda = function () {
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" val_simb="' + datos[i].SIMBOLO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    if ($('#hfMOBA_CODE').val() != '') {
                        $("#cboMoneda").select2('val', $('#hfMOBA_CODE').val()).change();
                    }
                    else {
                        $("#cboMoneda").select2('val', datos[0].CODIGO).change();
                    }
                } else {
                    $('#cboMoneda').append('<option  value =""></option>');
                    $('#cboMoneda').select2('val', '');
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
            url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=3&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option   value="' + datos[i].CODIGO + '" val_Tope="' + datos[i].TOPE_ADEL + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
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
                $('#cboSucursal').empty();
                //   $('#slcSucural').append('<option value="T">TODOS</option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#cboSucursal").select2("val", $("#ctl00_hddestablecimiento").val()).change();

                    } else {

                        $("#cboSucursal").select2("val", datos[0].CODIGO).change();
                    }


                }
                else {
                    infocustom2("No existen establecimientos registrados")
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }

    var fillCboEmpleado = function () {

        var getUsuario = devuelveDatosUsuario($('#ctl00_txtus').val());
        var pidmUsuario = getUsuario[0].PIDM; 

        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=11&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    //$('#cboEmpleado').append('<option  value ="">TODOS</option>');
                    let existeEmp = false
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].PIDM == pidmUsuario) {
                            existeEmp = true;
                        }
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '" val_rem ="' + datos[i].REM_BASICA + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }

                    if (existeEmp) {
                        $('#cboEmpleado').select2('val', pidmUsuario).change();
                    }
                    else {
                        $('#cboEmpleado').append('<option  value =""></option>');
                        $('#cboEmpleado').select2('val', '').change();
                    }
                       
             
                } else {
                    $('#cboEmpleado').append('<option  value =""></option>');
                    $('#cboEmpleado').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            ListarSucursales($("#cboEmpresa").val());
            if ($('#cboEmpresa').val() != '') {
                var val_Tope = $('#cboEmpresa [value="' + $('#cboEmpresa').val() + '"]').attr('val_Tope');
                $('#lblTope').text(val_Tope);
            }
            else {
                $('#lblTope').text('0');
            }

            regresaMontos();


        });

        $('#cboSucursal').on('change', function () {
            fillCboEmpleado();
            regresaMontos();


        });

        $('#cboEmpleado').on('change', function () {
            if ($('#cboEmpleado').val() != '') {
                var val_rem = $('#cboEmpleado [value="' + $('#cboEmpleado').val() + '"]').attr('val_rem');
                $('#lblRemBasica').text(val_rem);
            }
            else {
                $('#lblRemBasica').text('0.00');
            }

            regresaMontos();

        });

        $('#cboMoneda').on('change', function () {
            var val_simb = $('#cboMoneda [value="' + $('#cboMoneda').val() + '"]').attr('val_simb');
            $('#lblSimb').text(val_simb);

        });

        $('#txtMonto').on('keyup', function () {

            $(this).siblings("small").remove();

            if ($(this).val().trim() == '') { $(this).val('0') }
            if (parseFloat($(this).val()) > parseFloat($('#lblMontoTope').text())) {

                $(this).parent().append("<small style='color:red;'>supera el tope de adelanto</small>")
                $(this).parents(".control-group").addClass("error");
                $(this).addClass("errorPor");
            } else {
                $(this).parents(".control-group").removeClass("error");
                $(this).removeClass("errorPor");
            }


        });


    }

    var regresaMontos = function () {
        var tope = (parseInt($('#lblTope').text()) * parseFloat($('#lblRemBasica').text())) / 100;
        $('#lblMontoTope').text(parseFloat(tope).toFixed(2));

        $('#txtMonto').siblings("small").remove();
        $('#txtMonto').val('');
        $('#txtMonto').parents(".control-group").removeClass("error");
        $('#txtMonto').removeClass("errorPor");
    }

    var cargarParametrosSistema = function () {

        //OBTENER PARAMETRO DE REDONDEO
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MOBA",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#hfMOBA_CODE').val(datos[0].VALOR);
                }
                else {
                    alertCustom("No se recuperó el Parámetro de Moneda Base correctamente!");
                    $('#hfMOBA_CODE').val('');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function cargainicial() {
        var code = ObtenerQueryString("code");

        fillCboEmpresa();
        fillCboMoneda();

        if (code != undefined) {
            CargaDatosAdelanto(code);
        }

    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            ListarSucursales($("#cboEmpresa").val());
            cargainicial();

        }
    };

}();

function CargaDatosAdelanto(code) {

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmadem.ashx?OPCION=6&PIDM=&MES=0&ANIO=0&ESTADO_IND=&CODE=" + code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {


            if (datos != null) {
                $('#txtNroDoc').val(datos[0].NRO_DOCUMENTO);
                $('#txtFechaReg').val(datos[0].FECHA_REG);

                $('#lblEstado').text(datos[0].ESTADO);

                $('#cboEmpresa').select2('val', datos[0].CTLG_CODE).change();
                $('#cboEmpresa').attr('disabled', 'disabled');

                $('#cboSucursal').select2('val', datos[0].SCSL_CODE).change();
                $('#cboSucursal').attr('disabled', 'disabled');

                //$('#cboEmpleado').select2('val', datos[0].PIDM).change();
                $("#cboEmpleado").html('');
                $("#cboEmpleado").html("<option value='" + datos[0].PIDM + "'>" + datos[0].NOMBRE_EMPLEADO + "</option>");
                $('#cboEmpleado').attr('disabled', 'disabled');

                $('#txtMonto').val(datos[0].MONTO);
                $('#cboMoneda').select2('val', datos[0].MONE_CODE).change();
                $('#txtMotivo').val(datos[0].MOTIVO);



                $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                $("#grabar").attr("href", "javascript:ActualizarAdelanto();");


                if (datos[0].ESTADO_IND != 'G') {
                    $("#grabar").attr('disabled', 'disabled');
                    $('#txtMonto').attr('disabled', 'disabled');
                    $('#txtMotivo').attr('disabled', 'disabled');
                }
                else {
                    $("#grabar").removeAttr('disabled');
                    $('#txtMonto').removeAttr('disabled');
                    $('#txtMotivo').removeAttr('disabled');
                }


            }
            else {
                alertCustom("Error al Cargar los datos del adelanto");
            }
        },
        error: function (msg) {

            alert(msg);
        }
    });

}

var GetAdelantos = function () {
    var getUsuario = devuelveDatosUsuario($('#ctl00_txtus').val());
    var pidmUsuario = getUsuario[0].PIDM; 
    var data = new FormData();
    data.append('PIDM', pidmUsuario);
    data.append('CTLG_CODE', $('#cboEmpresa').val());
    data.append('SCSL_CODE', $('#cboSucursal').val());

    if ($('#chkTodos').is(':checked')) {
        data.append('MES', '0');
        data.append('ANIO', '0');
    }
    else {
        data.append('MES', $('#txt_Mes').datepicker('getDate').getMonth() + 1);
        data.append('ANIO', $('#txt_Anio').val());

    }
    data.append('ESTADO_IND', '');
    data.append('p_CODE', '0');
    ;
    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=1",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    })
        .success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $('#divAdelanto').html(datos);

                $("#tblAdelantos").DataTable({
                    "sDom": 'T<"clear">lfrtip',
                    "sPaginationType": "full_numbers",
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
                })
                    .columns(0).visible(false);
                actualizarEstilos()
                oTablaAdelantos = $('#tblAdelantos').dataTable();
                $('#tblAdelantos tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table = $('#tblAdelantos').dataTable();
                        var pos = table.fnGetPosition(this);
                        var row = table.fnGetData(pos);
                        var code = row[0];
                        var nro = row[1];

                        if (code !== '') {
                            window.location.href = '?f=NNMAUAD&code=' + code;
                        }

                    }
                });


            } else {
                if (oTablaAdelantos !== []) {
                    oTablaAdelantos.fnClearTable();
                }
                noexito();
            }
        })
        .error(function () {
            Desbloquear("ventana");
            noexito();
        });
}

var actualizarEstilos = function () {
    $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
    $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
    //ColVis_Button TableTools_Button 
    //$(".DTTT.btn-group").addClass("pull-right");
    $("TableTools_Button").css("float", "left");


}

function CrearAdelanto() {

    var varAdelanto = true

    varAdelanto = validarAdelanto();
    console.log(varAdelanto);
    if (varAdelanto) {

        //Datos Basicos
        var PIDM = $('#cboEmpleado').val();
        var CTLG_CODE = $('#cboEmpresa').val();
        var SCSL_CODE = $('#cboSucursal').val();
        var MONTO = $('#txtMonto').val();
        var MONE_CODE = $('#cboMoneda').val()
        var MOTIVO = $('#txtMotivo').val()
        var USUA_ID = $.trim($('#ctl00_lblusuario').html());
        var TOPE = $('#lblMontoTope').text()


        var data = new FormData();
        data.append('OPCION', "4");
        data.append('PIDM', PIDM);
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('MONTO', MONTO);
        data.append('MONE_CODE', MONE_CODE);
        data.append('MOTIVO', MOTIVO);
        data.append('USUA_ID', USUA_ID);
        data.append('TOPE', TOPE);


        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/nn/ajax/nnmadem.ashx",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].VALIDACION != "") {
                            alertCustom(datos[0].VALIDACION);
                        }
                        else {
                            exito();
                            $('#txtNroDoc').val(datos[0].NRO);

                            $('#cboEmpresa').attr('disabled', 'disabled');
                            $('#cboSucursal').attr('disabled', 'disabled');
                            $('#cboEmpleado').attr('disabled', 'disabled');

                            $('#lblEstado').text('GENERADO');

                            $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                            $("#grabar").attr("href", "javascript:ActualizarAdelanto();");
                        }
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexito();
            }
        });
    } else {
        alertCustom('El monto adelantar debe ser menor al mìnimo permitido.');
    }




}

function ActualizarAdelanto() {

    if ($('#grabar').attr('disabled') != 'disabled') {
        var varAdelanto = true

        varAdelanto = validarAdelanto();

        if (varAdelanto) {

            //Datos Basicos
            var PIDM = $('#cboEmpleado').val();
            var NRO_DOC = $('#txtNroDoc').val();
            var MONTO = $('#txtMonto').val();
            var MONE_CODE = $('#cboMoneda').val()
            var MOTIVO = $('#txtMotivo').val()
            var USUA_ID = $.trim($('#ctl00_lblusuario').html());
            var TOPE = $('#lblMontoTope').text()


            var data = new FormData();
            data.append('OPCION', "5");

            data.append('PIDM', PIDM);
            data.append('NRO_DOC', NRO_DOC);
            data.append('MONTO', MONTO);
            data.append('MONE_CODE', MONE_CODE);
            data.append('MOTIVO', MOTIVO);
            data.append('USUA_ID', USUA_ID);
            data.append('TOPE', TOPE);

            Bloquear("ventana");

            $.ajax({
                type: "POST",
                url: "vistas/nn/ajax/nnmadem.ashx",
                data: data,
                contentType: false,
                processData: false,
                cache: false,
                async: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        if (datos[0].SUCCESS == "OK") {
                            if (datos[0].VALIDACION != "") {
                                alertCustom(datos[0].VALIDACION);
                            }
                            else {
                                exito();
                            }
                        }
                    }
                    else {
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexito();
                }
            });
        } else {
            alertCustom('El monto adelantar debe ser menor al mìnimo permitido.');
        }


    }

}

function validarAdelanto() {

    var v_continue = true;
    var monto_adelanto = $('#txtMonto').val();

    var monto_minimo = $('#lblMontoTope').text();


    if (parseFloat(monto_adelanto) > parseFloat(monto_minimo))
        v_continue = false;

    //if (!vErrors(['cboEmpresa', 'cboSucursal', 'txtFechaIniCont', 'cboEstado',
    //'cboCargo', 'cboTipoContrato', 'cboTipoTrabajador', 'cboRegLab'])) {
    //    v_continue = false;
    //}

    //else if ($('#cboTipoContrato [value="' + $('#cboTipoContrato').val() + '"]').attr('value_sunat') != '01' && ($('#txtFechaFinCont').val().trim() == '')) {

    //    vErrorsNotMessage(['txtFechaFinCont']);
    //    v_continue = false;
    //    alertCustom("Ingrese Fecha Fin de Contrato");
    //}

    //else if ($('#cboEstado').val() == 'I' && !$('#chkCese').is(':checked')) {
    //    vErrorsNotMessage(['cboEstado']);
    //    v_continue = false;
    //    alertCustom("Ingresar datos de Cese");
    //}



    return v_continue;

}
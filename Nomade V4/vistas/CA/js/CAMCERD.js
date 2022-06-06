var click = false;//var valida click
var rbsoles = false;
var rbdolares = false;
var grab = false;


var CAMCERD = function () {


    var CargaInicial = function () {
        $(".control").attr("disabled", true);
    };

    var plugins = function () {

        $("#slcEmpresa").select2();
        $("#slcSucural").select2();
        $("#cbo_caja").select2();
    }

    var eventos = function () {


        $('#btn_inconsistencia').on('click', function () {

            //RESET
            $('#rbFalta_S').attr("disabled", true);
            $('#rbSobra_S').attr("disabled", true);
            $('#rbFalta_S').click().click(); // reset radiobutton
            $('#rbFalta_D').click().click(); // reset radiobutton
            rbsoles = true; // setea rbsoles por estar por defecto seleccionado
            rbdolares = false;
            $("#txt_obvservacion").removeClass("obligatorio");
            $("#txt_monto_dolares").removeClass("obligatorio");
            $("#txt_monto_soles").removeClass("obligatorio");
            $("#txt_obvservacion").parent().parent().removeClass("error");
            $("#txt_monto_soles").parent().parent().removeClass("error");
            $("#txt_monto_dolares").parent().parent().removeClass("error");
            $("#rbFalta_D").removeClass("checked");
            $("#rbFalta_D").parent("span").removeClass("checked");

            if (click == false) {
                $("#txt_monto_soles").attr("disabled", false);
                $("#txt_monto_dolares").attr("disabled", true);
                $("#txt_obvservacion").attr("disabled", false);

                $("#btn_inconsistencia").attr("class", "btn red");
                $('#rbFalta_S').attr("disabled", false);
                $('#rbSobra_S').attr("disabled", false);
                $("#rb_sobra_falta").attr("style", "display:block");
                click = true;
            }
            else {
                $("#txt_monto_soles").attr("disabled", true);
                $("#txt_monto_dolares").attr("disabled", true);
                $("#txt_monto_dolares").attr("disabled", true);
                $("#txt_obvservacion").attr("disabled", true);
                $("#txt_obvservacion").val("");
                $("#btn_inconsistencia").attr("class", "btn black");
                $("#rb_sobra_falta").attr("style", "display:none");
                click = false;



            }

        });

        $('#rbFalta_S').on('click', function () {

            $('#txt_monto_soles').val("");
            $('#txt_cer_caj_soles').val($('#hfcerrar_caja_soles').val());
            rbsoles = true;
        });

        $('#rbSobra_S').on('click', function () {

            $('#txt_monto_soles').val("");
            $('#txt_cer_caj_soles').val($('#hfcerrar_caja_soles').val());
            rbsoles = true;
        });


        $('#rbFalta_D').on('click', function () {

            $('#txt_monto_dolares').val("");
            $('#txt_monto_dolares').attr("disabled", false);
            $('#txt_cer_caj_dolares').val($('#hfcerrar_caja_dolares').val());
            rbdolares = true;
        });

        $('#rbSobra_D').on('click', function () {

            $('#txt_monto_dolares').val("");
            $('#txt_monto_dolares').attr("disabled", false);
            $('#txt_cer_caj_dolares').val($('#hfcerrar_caja_dolares').val());
            rbdolares = true;
        });




        $('#txt_monto_soles').on('keyup', function () {



            var falta_sobra_soles = $('#txt_monto_soles').val();
            var inicio_caja_soles = $('#hfcerrar_caja_soles').val().substr(4);
            var monto = "0.00";



            if ($('#rbFalta_S').is(":checked")) {
                if ($("#txt_monto_soles").val().length <= 0) {
                    $('#txt_cer_caj_soles').val($('#hfcerrar_caja_soles').val());
                }
                else {

                    if (parseFloat(falta_sobra_soles) > parseFloat(inicio_caja_soles)) {

                        $('#txt_cer_caj_soles').val($('#hfcerrar_caja_soles').val());
                        $('#txt_monto_soles').val("");
                    }
                    else {

                        monto = (parseFloat(inicio_caja_soles) - parseFloat(falta_sobra_soles)).toFixed(2);
                        $('#txt_cer_caj_soles').val("S/. " + monto);
                    }
                }
            }

            if ($('#rbSobra_S').is(":checked")) {
                if ($("#txt_monto_soles").val().length <= 0) {
                    $('#txt_cer_caj_soles').val($('#hfcerrar_caja_soles').val());
                }
                else {
                    monto = (parseFloat(inicio_caja_soles) + parseFloat(falta_sobra_soles)).toFixed(2);
                    $('#txt_cer_caj_soles').val("S/. " + monto);

                }

            }

        });


        $('#txt_monto_dolares').on('keyup', function () {

            var falta_sobra_dolares = $('#txt_monto_dolares').val();
            var inicio_caja_dolares = $('#hfcerrar_caja_dolares').val().substr(2);
            var monto = "0.00";



            if ($('#rbFalta_D').is(":checked")) {



                if ($("#txt_monto_dolares").val().length <= 0) {
                    $('#txt_cer_caj_dolares').val($('#hfcerrar_caja_dolares').val());
                }
                else {

                    if (parseFloat(falta_sobra_dolares) > parseFloat(inicio_caja_dolares)) {

                        $('#txt_cer_caj_dolares').val($('#hfcerrar_caja_dolares').val());
                        $('#txt_monto_dolares').val("");
                    }
                    else {

                        monto = (parseFloat(inicio_caja_dolares) - parseFloat(falta_sobra_dolares)).toFixed(2);
                        $('#txt_cer_caj_dolares').val("$. " + monto);
                    }
                }

            }

            if ($('#rbSobra_D').is(":checked")) {


                if ($("#txt_monto_dolares").val().length <= 0) {
                    $('#txt_cer_caj_dolares').val($('#hfcerrar_caja_dolares').val());
                }
                else {
                    monto = (parseFloat(inicio_caja_dolares) + parseFloat(falta_sobra_dolares)).toFixed(2);
                    $('#txt_cer_caj_dolares').val("$. " + monto);
                }
            }

        });

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                ListarSucursales($('#slcEmpresa').val());
                //$("#cbo_caja").empty().append("<option></option>").change();
                fillCboCaja();
                $("#form").attr("style", "display:none")
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        var scsl_ant = ""
        $('#slcSucural').on('change', function () {
            if (scsl_ant != $(this).val()) {
                fillCboCaja();
                $("#form").attr("style", "display:none")
                scsl_ant = $(this).val();
            } else { scsl_ant = ""; }
        });

        var caja_ant = ""
        $('#cbo_caja').on('change', function () {

            if (caja_ant != $(this).val()) {
                Bloquear("ventana");
                verificaCajaCerrada();

                caja_ant = $(this).val();
            }
            else { caja_ant = ""; }
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
    }

    var ListarSucursales = function (ctlg) {
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
                    // $("#slcSucural").change();

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

    var fillCboCaja = function () {
        var select = $('#cbo_caja');
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + $('#slcEmpresa').val() + "&p_SCSL_CODE=" + $('#slcSucural').val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_caja').empty();
                $('#cbo_caja').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CAJA_CODE + '" monto="' + datos[i].MONTO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                    }
                }
                $('#cbo_caja').select2('val', '');
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };


    var verificaCajaCerrada = function () {

        Bloquear("ventana");

        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMABRI.ashx?OPCION=7&COD_CTLG=" + $('#slcEmpresa').val() + "&COD_ESTABLE=" + $('#slcSucural').val() + "&COD_CAJA=" + $('#cbo_caja').val(),
            async: false,
            success: function (datos) {
                if (datos != "") {
                    if (datos.split(",")[0] == "S") {
                        //$("#form").slideToggle();
                      
                        cargarDetalleMov(datos.split(",")[1]);
                        $("#form").attr("style", "display:block");
                        $("#hfcod_ult_mov").val(datos.split(",")[1]);

                    } else {
                        if (datos.split(",")[0] == "N") {
                           
                            infoCustom2("Caja ya se ecuentra cerrada!!!")
                            $("#form").attr("style", "display:none")
                          
                        }
                    }
                    Desbloquear("ventana");

                } else {

                    noexito();
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });



    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            CargaInicial();
            eventos();
            ListarSucursales($('#slcEmpresa').val());
            fillCboCaja();
           
        }
    };
}();

var cargarDetalleMov = function (codultmov) {
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMABRI.ashx?COD_ULT_MOV=" + codultmov + "&IND_APER_CIER=C",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#txt_soles').val(datos[0].HABER_SOLES);
                $('#txt_dolares').val(datos[0].HABER_DOLARES);
                $('#txt_cer_caj_soles').val(datos[0].HABER_SOLES);
                $('#txt_cer_caj_dolares').val(datos[0].HABER_DOLARES);


                //$('#txt_ini_caj_soles').val(datos[0].MONTO_INICIO_SOL);
                //$('#txt_ini_caj_dolares').val(datos[0].MONTO_INICIO_DOL);

                $('#hfcerrar_caja_soles').val(datos[0].HABER_SOLES);
                $('#hfcerrar_caja_dolares').val(datos[0].HABER_DOLARES);



                //$('#hfcod_monto_sol').val(datos[0].COD_MONTO_SOLES);
                //$('#hfcod_monto_dol').val(datos[0].COD_MONTO_DOLARES);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });


};


var CerrarCaja = function () {

    var COD_CAJA = $('#cbo_caja').val();
    var COD_ULT_MOV = $("#hfcod_ult_mov").val();
    var COD_CTLG = $('#slcEmpresa').val();
    var COD_ESTABLE = $('#slcSucural').val();
    var USUA_ID = $('#ctl00_txtus').val();
    var CER_CAJA_SOLES = $('#txt_cer_caj_soles').val().substr(4);
    var CER_CAJA_DOLARES = $('#txt_cer_caj_dolares').val().substr(2);
    var TIPO_INCONS_SOLES = "";
    var TIPO_INCONS_DOLARES = "";
    var OBSERVACION = $("#txt_obvservacion").val();
    var INCONSISTENCIA_IND = click == false ? 'N' : 'S';
    var INCONSISTENCIA_SOLES = "";
    var INCONSISTENCIA_DOLARES = "";
    var COD_MONTO_SOL = $('#hfcod_monto_sol').val();
    var COD_MONTO_DOL = $('#hfcod_monto_dol').val();

     


    if (($('#rbFalta_S').is(":checked") || $('#rbSobra_S').is(":checked")) && ($('#rbFalta_D').is(":checked") || $('#rbSobra_D').is(":checked"))) {
        var TIPO_INCONS_SOLES = "N";
        if ($('#rbFalta_S').is(":checked"))
            TIPO_INCONS_SOLES = "F";
        if ($('#rbSobra_S').is(":checked"))
            TIPO_INCONS_SOLES = "S";
        var TIPO_INCONS_DOLARES = "N";
        if ($('#rbFalta_D').is(":checked"))
            TIPO_INCONS_DOLARES = "F";
        if ($('#rbSobra_D').is(":checked"))
            TIPO_INCONS_DOLARES = "S";

        if ($("#txt_monto_soles").val() != '')
            INCONSISTENCIA_SOLES = $("#txt_monto_soles").val()
        if ($("#txt_monto_dolares").val() != '')
            INCONSISTENCIA_DOLARES = $("#txt_monto_dolares").val()

    }
    else {

        if ($('#rbFalta_S').is(":checked") || $('#rbSobra_S').is(":checked")) {
            var TIPO_INCONS_SOLES = "N";
            if ($('#rbFalta_S').is(":checked"))
                TIPO_INCONS_SOLES = "F";
            if ($('#rbSobra_S').is(":checked"))
                TIPO_INCONS_SOLES = "S";

            if ($("#txt_monto_soles").val() != '')
                INCONSISTENCIA_SOLES = $("#txt_monto_soles").val()

        } else {


            if ($('#rbFalta_D').is(":checked") || $('#rbSobra_D').is(":checked")) {
                var TIPO_INCONS_DOLARES = "N";
                if ($('#rbFalta_D').is(":checked"))
                    TIPO_INCONS_DOLARES = "F";
                if ($('#rbSobra_D').is(":checked"))
                    TIPO_INCONS_DOLARES = "S";
                if ($("#txt_monto_dolares").val() != '')
                    INCONSISTENCIA_DOLARES = $("#txt_monto_dolares").val()

            }

        }

    }

    var data = new FormData();
    data.append('OPCION', '6');
    data.append('COD_CAJA', COD_CAJA);
    data.append('COD_ULT_MOV', COD_ULT_MOV);
    data.append('COD_CTLG', COD_CTLG);
    data.append('COD_ESTABLE', COD_ESTABLE);
    data.append('USUA_ID', USUA_ID);
    data.append('CER_CAJA_SOLES', CER_CAJA_SOLES);
    data.append('CER_CAJA_DOLARES', CER_CAJA_DOLARES);
    data.append('TIPO_INCONS_SOLES', TIPO_INCONS_SOLES);
    data.append('TIPO_INCONS_DOLARES', TIPO_INCONS_DOLARES);
    data.append('INCONSISTENCIA_IND', INCONSISTENCIA_IND);
    data.append('INCONSISTENCIA_SOLES', INCONSISTENCIA_SOLES);
    data.append('INCONSISTENCIA_DOLARES', INCONSISTENCIA_DOLARES);
    data.append('OBSERVACION', OBSERVACION);
    data.append('COD_MONTO_SOL', COD_MONTO_SOL);
    data.append('COD_MONTO_DOL', COD_MONTO_DOL);


    if (click == true && rbsoles == true) {

        //$("#txt_obvservacion").removeClass("obligatorio");
        $("#txt_obvservacion").addClass("obligatorio");
        $("#txt_monto_soles").addClass("obligatorio");

    }

    if (click == true && rbdolares == true) {
        $("#txt_obvservacion").addClass("obligatorio");
        $("#txt_monto_dolares").addClass("obligatorio");

    }



    if (!vErrorBodyAnyElement(".obligatorio")) {
        grab = true;
        Bloquear("caja");

    }

    if (grab == true) {
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CA/ajax/CAMABRI.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
                    .success(function (res) {
                        Desbloquear("caja");
                        if (res != null) {
                            if (res == 'OK') {

                                exito();
                                setTimeout(function () {
                                    window.location = '?f=CALVICA&codcaja=' + $('#cbo_caja').val() + '&codempr=' + $('#slcEmpresa').val() + '&codscsl=' + $('#slcSucural').val();
                                }, 600);
                            } else {
                                noexito();
                            }
                        }
                    })
                    .error(function () {
                        Desbloquear("caja");
                        alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
                    });
    }

};


var Back = function () {

    window.location.href = '?f=camcerd';

};


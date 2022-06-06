var click = false;//var valida click
var rbsoles = false;
var rbdolares = false;
var grab = false;


var CAMABRI = function () {
  

    var CargaInicial = function () {
        $(".control").attr("disabled", true);
    };


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

            if (click == false)
                {
                    $("#txt_monto_soles").attr("disabled", false);
                    $("#txt_monto_dolares").attr("disabled", true);
                    $("#txt_obvservacion").attr("disabled", false);
                    $("#btn_inconsistencia").attr("class", "btn red");
                    $('#rbFalta_S').attr("disabled", false);
                    $('#rbSobra_S').attr("disabled", false);
                    $("#rb_sobra_falta").attr("style","display:block");
                    click = true;
                }
            else
                {
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
            $('#txt_ini_caj_soles').val($('#hfinicio_caja_soles').val());
            rbsoles = true;
        });

        $('#rbSobra_S').on('click', function () {

            $('#txt_monto_soles').val("");
            $('#txt_ini_caj_soles').val($('#hfinicio_caja_soles').val());
            rbsoles = true;
        });


        $('#rbFalta_D').on('click', function () {

            $('#txt_monto_dolares').val("");
            $('#txt_monto_dolares').attr("disabled",false);
            $('#txt_ini_caj_dolares').val($('#hfinicio_caja_dolares').val());
            rbdolares = true;
        });

        $('#rbSobra_D').on('click', function () {

            $('#txt_monto_dolares').val("");
            $('#txt_monto_dolares').attr("disabled", false);
            $('#txt_ini_caj_dolares').val($('#hfinicio_caja_dolares').val());
            rbdolares = true;
        });




        $('#txt_monto_soles').on('keyup', function () {

           

            var falta_sobra_soles = $('#txt_monto_soles').val();
            var inicio_caja_soles = $('#hfinicio_caja_soles').val().substr(4);
            var monto = "0.00";

           

            if ($('#rbFalta_S').is(":checked")) {
                if ($("#txt_monto_soles").val().length <= 0) {
                    $('#txt_ini_caj_soles').val($('#hfinicio_caja_soles').val());
                }
                else {

                        if (parseFloat(falta_sobra_soles) > parseFloat(inicio_caja_soles)) {

                            $('#txt_ini_caj_soles').val($('#hfinicio_caja_soles').val());
                            $('#txt_monto_soles').val("");
                        }
                        else {

                            monto = (parseFloat(inicio_caja_soles) - parseFloat(falta_sobra_soles)).toFixed(2);
                            $('#txt_ini_caj_soles').val("S/. " + monto);
                        }
                    }
                }

            if ($('#rbSobra_S').is(":checked"))
                {
                    if ($("#txt_monto_soles").val().length <= 0) {
                        $('#txt_ini_caj_soles').val($('#hfinicio_caja_soles').val());
                    }
                    else {
                            monto = (parseFloat(inicio_caja_soles) + parseFloat(falta_sobra_soles)).toFixed(2);
                            $('#txt_ini_caj_soles').val("S/. " + monto);

                    }
                       
                }

        });


        $('#txt_monto_dolares').on('keyup', function () {

            var falta_sobra_dolares = $('#txt_monto_dolares').val();
            var inicio_caja_dolares = $('#hfinicio_caja_dolares').val().substr(2);
            var monto = "0.00";



            if ($('#rbFalta_D').is(":checked")) {

               

                if ($("#txt_monto_dolares").val().length <= 0) {
                    $('#txt_ini_caj_dolares').val($('#hfinicio_caja_dolares').val());
                }
                else {

                    if (parseFloat(falta_sobra_dolares) > parseFloat(inicio_caja_dolares)) {

                        $('#txt_ini_caj_dolares').val($('#hfinicio_caja_dolares').val());
                        $('#txt_monto_dolares').val("");
                    }
                    else {

                        monto = (parseFloat(inicio_caja_dolares) - parseFloat(falta_sobra_dolares)).toFixed(2);
                        $('#txt_ini_caj_dolares').val("$. " + monto);
                    }
                }

            }

            if ($('#rbSobra_D').is(":checked")) {
              

                if ($("#txt_monto_dolares").val().length <= 0) {
                    $('#txt_ini_caj_dolares').val($('#hfinicio_caja_dolares').val());
                }
                else {
                        monto = (parseFloat(inicio_caja_dolares) + parseFloat(falta_sobra_dolares)).toFixed(2);
                        $('#txt_ini_caj_dolares').val("$. " + monto);
                }
            }

        });

    };



    return {
        init: function () {
            var codultmov = ObtenerQueryString('codultmov');
            var codcaja = ObtenerQueryString('codcaja');
            var codempr = ObtenerQueryString('codempr');
            var codscsl = ObtenerQueryString('codscsl');
            var ind = ObtenerQueryString('ind');
            $("#hfcod_ctlg").val(codempr);
            $("#hfcod_estable").val(codscsl);
            $("#hfcod_caja").val(codcaja);

            CargaInicial();
            eventos();
            //alert(codultmov)
            //plugins();
            //cargarEmpresas();
            //cargarEmpleados();
            //cargarEstablecimientos();
            //cargarCajas();
            //autocompletarCasadeCambio('');
            //cargarMonedas();
            //cargarBase();
            //cargarCambios();
            //eventos();&& codcaja !== undefined && codempr !== undefined && codscsl !== undefined && ind !== undefined
            if (codultmov !== undefined) {

                cargarUltimoMov(codcaja, codempr, codscsl, ind, codultmov);
            }
            else {
                window.location.href = '?f=CALVICA';

            }
        }
    };
}();

var cargarUltimoMov = function (codcaja, codempr, codscsl,   codultmov) {
    $.ajax({
        type: "post",
        url: "vistas/CA/ajax/CAMABRI.ashx?COD_CAJA=" + codcaja + "&COD_CTLG=" + codempr + "&COD_ESTABLE=" + codscsl + "&COD_ULT_MOV=" + codultmov + "&IND_APER_CIER=A&USUA_ID="+ $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#txt_soles').val(datos[0].MONTO_CIERRE_SOL);
                $('#txt_dolares').val(datos[0].MONTO_CIERRE_DOL);
                $('#txt_ini_caj_soles').val(datos[0].MONTO_INICIO_SOL);
                $('#txt_ini_caj_dolares').val(datos[0].MONTO_INICIO_DOL);

                $('#hfinicio_caja_soles').val(datos[0].MONTO_INICIO_SOL);
                $('#hfinicio_caja_dolares').val(datos[0].MONTO_INICIO_DOL);
                
                $('#txt_fondo_fijo_sol').val(datos[0].FONDO_FIJO_SOLES);
                $('#txt_fondo_fijo_dol').val(datos[0].FONDO_FIJO_DOLARES);

                $('#hfcod_monto_sol').val(datos[0].COD_MONTO_SOLES);
                $('#hfcod_monto_dol').val(datos[0].COD_MONTO_DOLARES);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    //$('#btnGrabar').css('display', 'none');
    //$('#btnActualizar').css('display', 'inline-block');
};

var AperturaCaja = function () {
    //var tipo = $('#cboTipo').val();
    //var array = ['cboEstablecimiento', 'cboCaja', 'txtCasadeCambio', 'cboMoneda', 'txtMonto', 'txtTipodeCambio', 'cboCambio', 'txtCambio'];
    //if (tipo == 'A') {
    //    array = ['cboEstablecimiento', 'cboCaja', 'txtCasadeCambio', 'txtAsignacion', 'txtAsignacion_RS', 'cboMoneda', 'txtMonto', 'txtTipodeCambio', 'cboCambio', 'txtCambio'];
    //}
    //var monto = $('#cboCaja :selected').attr('monto');
    //monto = (monto == undefined) ? 0.0 : new Number(monto);
    //if (vErrorsNotMessage(array)) {
    //    var MONE_BASE_MONTO = $('#txtMonto').val();
    //    if (MONE_BASE_MONTO <= monto) {
            var COD_CAJA = $("#hfcod_caja").val();
            var COD_CTLG = $("#hfcod_ctlg").val();
            var COD_ESTABLE =  $("#hfcod_estable").val();
            var USUA_ID = $('#ctl00_txtus').val();
            var INI_CAJA_SOLES = $('#txt_ini_caj_soles').val().substr(4);
            var INI_CAJA_DOLARES = $('#txt_ini_caj_dolares').val().substr(2);
            var TIPO_INCONS_SOLES = "";
            var TIPO_INCONS_DOLARES = "";
            var OBSERVACION = $("#txt_obvservacion").val();
            var INCONSISTENCIA_IND = click == false ? 'N' : 'S';
            var INCONSISTENCIA_SOLES = "";
            var INCONSISTENCIA_DOLARES = "";
            var COD_MONTO_SOL = $('#hfcod_monto_sol').val();
            var COD_MONTO_DOL = $('#hfcod_monto_dol').val();
    //        var TIPO_CAMBIO = $('#txtTipodeCambio').val();
    //        var MONE_CAMBIO_CODE = $('#cboCambio').val();
    //        var MONE_CAMBIO_MONTO = $('#txtCambio').val();
    //        var USUA_ID = $('#ctl00_txtus').val();

           
    //        data.append('MONE_BASE_MONTO', MONE_BASE_MONTO);
    //        data.append('TIPO_CAMBIO', TIPO_CAMBIO);
    //        data.append('MONE_CAMBIO_CODE', MONE_CAMBIO_CODE);
    //        data.append('MONE_CAMBIO_MONTO', MONE_CAMBIO_MONTO);
    //        data.append('USUA_ID', USUA_ID);

           
      

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

                if($("#txt_monto_soles").val() != '')
                    INCONSISTENCIA_SOLES = $("#txt_monto_soles").val()
                if($("#txt_monto_dolares").val() != '')
                    INCONSISTENCIA_DOLARES = $("#txt_monto_dolares").val()
                //if (!Global.Global.isNumeroReal(txtSolesInconsistencia.Text.Trim()))
                //{
                //    lblmensaje.Text = "Formato Incorrecto";
                //    lblmensaje.Visible = true;
                //    txtSolesInconsistencia.Focus();
                //    return;
                //}
                //if (!Global.Global.isNumeroReal(txtSolesInconsistencia.Text.Trim()))
                //{
                //    lblmensaje2.Text = "Formato Incorrecto";
                //    lblmensaje2.Visible = true;
                //    txtDolaresInconsistencia.Focus();
                //    return;
                //}
                //ok = cmovimiento.abrir_caja(Global.Global.codigoCatalogo,
                //          Global.Global.codigoSucursal, Global.Global.codigoCaja,
                //          valorRegistrSoles.ToString(), valorRegistrUSD.ToString(),
                //          Global.Global.IdUsuario, "S", tipo1, txtSolesInconsistencia.Text.Trim(),
                //          tipo2,txtDolaresInconsistencia.Text.Trim(),
                //          txtObservacion.Text.Trim());
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
                    //if (Global.Global.isNumeroReal(txtSolesInconsistencia.Text.Trim()))
                    //{
                    //    ok = cmovimiento.abrir_caja(Global.Global.codigoCatalogo,
                    //       Global.Global.codigoSucursal, Global.Global.codigoCaja,
                    //       valorRegistrSoles.ToString(), valorRegistrUSD.ToString(),
                    //       Global.Global.IdUsuario, "S",tipo,txtSolesInconsistencia.Text.Trim(),"","0",
                    //       txtObservacion.Text.Trim());
                    //}
                    //else
                    //{
                    //    lblmensaje.Text = "Formato Incorrecto";
                    //    lblmensaje.Visible = true;
                    //    txtSolesInconsistencia.Focus();
                    //}
                } else {


                    if ($('#rbFalta_D').is(":checked") || $('#rbSobra_D').is(":checked"))
                            {
                             var TIPO_INCONS_DOLARES = "N";
                             if ($('#rbFalta_D').is(":checked"))
                             TIPO_INCONS_DOLARES = "F";
                             if ($('#rbSobra_D').is(":checked"))
                                 TIPO_INCONS_DOLARES = "S";
                             if ($("#txt_monto_dolares").val() != '')
                                 INCONSISTENCIA_DOLARES = $("#txt_monto_dolares").val()
                                //if(Global.Global.isNumeroReal(txtDolaresInconsistencia.Text.Trim()))
                                //{
                                //    ok = cmovimiento.abrir_caja(Global.Global.codigoCatalogo,
                                //       Global.Global.codigoSucursal, Global.Global.codigoCaja,
                                //       totalInicioCajaSoles.ToString(), totalInicioCajaDolares.ToString(),
                                //       Global.Global.IdUsuario, "S", "", "0", tipo, txtDolaresInconsistencia.Text.Trim(),
                                //       txtObservacion.Text.Trim());
                                //}else
                                //{
                                //    lblmensaje2.Text = "Formato Incorrecto";
                                //    lblmensaje2.Visible = true;
                                //    txtDolaresInconsistencia.Focus();
                                //}
                            }

                }

            }

            var data = new FormData();
            data.append('OPCION', '5');
            data.append('COD_CAJA', COD_CAJA);
            data.append('COD_CTLG', COD_CTLG);
            data.append('COD_ESTABLE', COD_ESTABLE);
            data.append('USUA_ID', USUA_ID);
            data.append('INI_CAJA_SOLES', INI_CAJA_SOLES);
            data.append('INI_CAJA_DOLARES', INI_CAJA_DOLARES);
            data.append('TIPO_INCONS_SOLES', TIPO_INCONS_SOLES);
            data.append('TIPO_INCONS_DOLARES', TIPO_INCONS_DOLARES);
            data.append('INCONSISTENCIA_IND', INCONSISTENCIA_IND);
            data.append('INCONSISTENCIA_SOLES', INCONSISTENCIA_SOLES);
            data.append('INCONSISTENCIA_DOLARES', INCONSISTENCIA_DOLARES);
            data.append('OBSERVACION', OBSERVACION);
            data.append('COD_MONTO_SOL', COD_MONTO_SOL);
            data.append('COD_MONTO_DOL', COD_MONTO_DOL);
          

            if (click == true && rbsoles == true) {
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
                                            window.location = '?f=CALVICA&codcaja=' + $("#hfcod_caja").val() + '&codempr=' + $("#hfcod_ctlg").val() + '&codscsl=' + $("#hfcod_estable").val();
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

    window.location.href = '?f=CALVICA';

};
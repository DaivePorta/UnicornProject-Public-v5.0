var NPLEMCO = function () {
    var plugins = function () {
        $('#cboEmpleado').select2();
        $('#cboSucursal').select2();
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        //$('#cboEstado').select2();
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
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val()).change();
                    //fillCboEstablecimiento();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    };



    var fillCboEstablecimiento = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                } else {
                    $('#cboSucursal').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Establecimiento no se listaron correctamente");
            }
        });
    };

    var fillCboEmpleado = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val() + "&ESTADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    $('#cboEmpleado').append('<option  value ="">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '" val_ctlg_code ="' + datos[i].CTLG_CODE + '" val_Empresa ="' + datos[i].CTLG_DESC_CORTA + '"  val_Sucursal ="' + datos[i].SCSL_DESC + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', '').change();
                } else {
                    $('#cboEmpleado').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Empleados no se listaron correctamente");
            }
        });
    };

    //var fillCboEstado = function () {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/np/ajax/npmemco.ashx?OPCION=LECO&ESTADO_IND=A",
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $('#cboEstado').empty();
    //            if (!isEmpty(datos)) {
    //                $('#cboEstado').append('<option value="">TODOS</option>');
    //                for (var i = 0; i < datos.length; i++) {
    //                    $('#cboEstado').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
    //                }
    //                $('#cboEstado').select2('val', '').change();
    //            } else {
    //                $('#cboEstado').select2('val', '');
    //            }
    //        },
    //        error: function (msg) {
    //            noexitoCustom("Error al listar Estado del Contrato.");
    //        }
    //    });
    //};

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
        });

        $('#cboSucursal').on('change', function () {
            fillCboEmpleado();
        });

        $('#cboEmpleado').on('change', function () {
            GetContratos();
        });

        //$('#cboEstado').on('change', function () {
        //    GetContratos();
        //});


    }


    function cargainicial() {
        fillCboEmpresa();
        //fillCboEstado();
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            cargainicial();

        }
    };


}();


var NPMEMCO = function () {
    var plugins = function () {
        $('#cbo_Empresa').select2();
        $('#cboEmpleado').select2();
        $('#cboTipoContrato').select2();
        $('#cboModFormativa').select2();
        $('#cboTipoTrabajador').select2();
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();
        $('#cboCargo').select2();
        $('#cboMotivoCese').select2();
        $('#cboEstado').select2();
        $('#txtFechaIniCont').datepicker();
        $('#txtFechaFinCont').datepicker();
        $('#txtFechaCese').datepicker();
        $('#cboRegLab').select2();
        $('#cboEmpresaAlerta').select2();

        $('.danger-toggle-button-custom').toggleButtons({
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "info",
                disabled: "danger"
            },
            label: {
                enabled: "SI",
                disabled: "NO"
            }
        });


    }
   
    function ListarTipoCotrato() {
        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=TCONT",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoContrato').empty();
                $('#cboTipoContrato').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoContrato').append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom("Tipos de contratos no se listaron correctamente");
            }
        });
    }

    function ListarModFormativa() {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboModFormativa').empty();
                $('#cboModFormativa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboModFormativa').append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });
    }

    function ListarTipoTrab() {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoTrabajador').empty();
                $('#cboTipoTrabajador').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoTrabajador').append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });
    }


    function ListarCargo() {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=5",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboCargo').empty();
                $('#cboCargo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboCargo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom("Cargos no se listaron correctamente");
            }
        });
    }


    function ListarRegimenLaboral() {

        let reglaCode = $('#cboEmpresa :selected').attr('regla_code');
        let reglaOrden = $('#cboEmpresa :selected').attr('regla_orden');

        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=10",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboRegLab').empty();
                $('#cboRegLab').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (parseInt(datos[i].ORDEN) >= parseInt(reglaOrden) ) {
                            $('#cboRegLab').append('<option   orden="' + datos[i].ORDEN + '" value="' + datos[i].CODIGO + '">' + datos[i].ACRONIMO + '</option>');
                        }
                       
                    }

                    $('#cboRegLab').val(reglaCode).change();

                }
            },
            error: function (msg) {
                alertCustom("Regimen labora no se listó correctamente");
            }
        });
    }


    function ListarMotivoCese() {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=6",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMotivoCese').empty();
                $('#cboMotivoCese').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMotivoCese').append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom("Motivos de cese no se listaron correctamente");
            }
        });
    }


    var fillCboEmpresa = function () {

        let datos = fnGetEmpresasUsuario(2, 'A', false);

        if (!isEmpty(datos)) {
            for (var i = 0; i < datos.length; i++) {
                $('#cboEmpresa').append('<option regla_code="' + datos[i].RHREGLA_CODE + '" regla_orden="' + datos[i].RHREGLA_ORDEN +  '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
            }
            $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val());

            for (var i = 0; i < datos.length; i++) {
                $('#cbo_Empresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
            }
            $("#cbo_Empresa").select2('val', $('#ctl00_hddctlg').val());

            for (var i = 0; i < datos.length; i++) {
                $('#cboEmpresaAlerta').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
            }
            $("#cboEmpresaAlerta").select2('val', $('#ctl00_hddctlg').val());

            ListarRegimenLaboral(); 
            fillCboSucursal();
        }
     
    };

    var fillCboEmpleado = function (ESTADO) {        
        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=LEMP&PIDM=0&ESTADO_IND=" + ESTADO + "&CTLG_CODE=" + $("#cbo_Empresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '" val_Bio ="' + datos[i].ASIST_CODE + '"  >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', datos[0].PIDM);
                } else {
                    $('#cboEmpleado').append('<option></option>');
                    $('#cboEmpleado').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Empleados no se listaron correctamente");
            }
        });
    };


    var fillCboSucursal = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '" value_bio ="' + datos[i].BIO_IND + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                } else {
                    $('#cboSucursal').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    };


    var cargarParametrosSistema = function () {

        //OBTENER PARAMETRO DE REDONDEO
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=SUBA",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#hfSueldoBasico').val(datos[0].VALOR);
                }
                else {
                    alertCustom("No se recuperó el Parámetro de Sueldo Básico correctamente!");
                    $('#hfSueldoBasico').val('0.00');
                }
            },
            error: function (msg) {
                alertCustom("Parámetro del sistema de Sueldo Básico no se listó correctamente");
            }
        });
    }


    function CargaContrato(v_PPBIDEN_PIDM, v_PPBIDEM_CTLG) {       

 
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/npmemco.ashx?OPCION=9&PIDM=" + v_PPBIDEN_PIDM + "&CTLG_CODE=" + v_PPBIDEM_CTLG + "&SCSL_CODE=&ESTADO_IND=&NUMERO=" + $('#hfNumeroCont').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                var selectTipoContrato = $('#cboTipoContrato');
                var selectModFormativa = $('#cboModFormativa');
                var selectTipoTrabajador = $('#cboTipoTrabajador');
                var selectCargo = $('#cboCargo');
                var selectMotivoCese = $('#cboMotivoCese');
                var selectRegLab = $('#cboRegLab');

                if (!$('#chkReingreso').is(':checked')) {
                    if (datos != null) {
                        $('#hfRenovacion').val('');
                        if (datos[0].ESTADO_IND != 'A') {
                            DesabilitaControles();
                            $('#btnFirmar').attr('disabled', 'disabled');
                            $('#divFirmar').hide();
                            $('#txtFechaFinCont').attr('disabled', 'disabled');
                        } else {
                            HabilitaControles();
                            $('#divBtnCese').hide();
                            $('#btnFirmar').removeAttr('disabled');
                            $('#divFirmar').show();
                            $('#txtFechaFinCont').removeAttr('disabled');
                        }                        
                        
                        $('#txtNroContrato').val(datos[0].NRO);
                        $('#hfNumeroCont').val(datos[0].NRO)
                        $('#txtFechaIniCont').datepicker('setDate', datos[0].FECHA_INI);
                        $('#txtFechaFinCont').datepicker('setDate', datos[0].FECHA_FIN);

                        $('#cboEmpresa').val(datos[0].CTLG_CODE).change();
                        $('#cboSucursal').val(datos[0].SCSL_CODE).change();


                        $('#cboTipoContrato').select2('val', datos[0].TICO_CODE).change();
                        if (datos[0].ESTADO_IND == 'A') {
                            $('#txtFechaFinCont').removeAttr('disabled')
                        }
                        else { $('#txtFechaFinCont').attr('disabled', 'disabled') }


                        selectTipoTrabajador.select2('val', datos[0].TITR_CODE).change();
                        selectCargo.select2('val', datos[0].CARG_CODE).change();



                        $('#cboRegLab option').filter(function (i,obj) {
                            if (obj.value == datos[0].REGLAB_CODE ) {
                                $(obj).remove();
                            }
                        });
                        selectRegLab.append('<option value="' + datos[0].REGLAB_CODE + '">' + datos[0].REGLAB_DESC + '</option>');

                        selectRegLab.select2('val', datos[0].REGLAB_CODE).change()

                        if (datos[0].TMOF_CODE != '') {
                            $('#chkModFormativa').attr('checked', true).parent().addClass("checked").change();
                            $('#chkModFormativa').change();
                            selectModFormativa.select2('val', datos[0].TMOF_CODE).change();
                            if (datos[0].ESTADO_IND == 'A') {
                                selectModFormativa.removeAttr('disabled')
                            }
                            else { selectModFormativa.attr('disabled', 'disabled') }


                        }
                        else {
                            $('#chkModFormativa').attr('checked', false).parent().removeClass("checked").change();
                        }




                        if (datos[0].MOTIVO_CESE_CODE != '') {
                            $('#chkCese').attr('checked', true).parent().addClass("checked")
                            selectMotivoCese.select2('val', datos[0].MOTIVO_CESE_CODE).change()
                            $('#txtFechaCese').datepicker('setDate', datos[0].FECHA_CESE)
                        }
                        else {
                            $('#chkCese').attr('checked', false).parent().removeClass("checked")
                        }

                        $('#divBtnCese').hide();
                        $('#txtRemBasica').val(datos[0].REM_BASICA)
                        $('#txtMovilidad').val(datos[0].MOVILIDAD)
                        $('#txtViaticos').val(datos[0].VIATICOS)
                        $('#txtRefrigerio').val(datos[0].REFRIGERIO)
                        $('#txtBonoProductividad').val(datos[0].BONO_PRODUCTIVIDAD)
                        $('#txtBonificRiesgoCaja').val(datos[0].BONIFICACION_RIESGO_CAJA)
                        $('#lblRemTotal').text(datos[0].REM_TOTAL)
                        $('#hfESTADO_CONT').val(datos[0].ESTADO_IND);
                        $('#cboEstado').select2('val', datos[0].ESTADO_IND).change();

                        if (datos[0].ESTADO_IND == 'F') {
                            DesbloquearSinGif('#divChkCese');
                            $('#btnRenovar').removeAttr('disabled');
                            $('#divRenovar').show();
                            $('#divGrabar').hide();
                        }
                        else {
                            BloquearSinGif('#divChkCese');
                            $('#btnRenovar').attr('disabled', 'disabled');
                            $('#divRenovar').hide();
                            $('#cboMotivoCese').attr('disabled', 'disabled');
                            $('#txtFechaCese').attr('disabled', 'disabled');
                        }

                        if (datos[0].ESTADO_IND == 'I' || datos[0].ESTADO_IND == 'V') {
                            $('#grabarEmpleado').attr('disabled', 'disabled')
                            $('#divGrabar').hide();
                        }
                        else {
                            $('#grabarEmpleado').removeAttr('disabled')
                            if (datos[0].ESTADO_IND == 'A') { $('#divGrabar').show(); }
                        }

                        bloqueDatosPrinc('A');

                    }
                    else {
                        $('#hfRenovacion').val('');
                        HabilitaControles();                        
                        $('#btnRenovar').attr('disabled', 'disabled');
                        $('#divRenovar').hide();
                        $('#divBtnCese').hide();
                        $('#grabarEmpleado').removeAttr('disabled');
                        $('#divGrabar').show();
                        BloquearSinGif('#divChkCese');

                        //$('#cboEmpresa').val($('#cbo_Empresa').val());
                        $('#cboEmpresa').attr('disabled', 'disabled');

                        $('#cboEstado').select2('val', 'A').change();
                        $('#cboEstado').attr('disabled', 'disabled');
                        $('#btnFirmar').attr('disabled', 'disabled');
                        $('#divFirmar').hide();
                        $('#cboEmpresa').val($('#cbo_Empresa').val()).change();
                     
                        bloqueDatosPrinc('C');
                    }


                }
                else {
                    $('#hfRenovacion').val('');
                    HabilitaControles();
                    $('#btnRenovar').attr('disabled', 'disabled');
                    $('#divRenovar').hide();
                    $('#divBtnCese').hide();
                    $('#grabarEmpleado').removeAttr('disabled');
                    $('#divGrabar').show();
                    BloquearSinGif('#divChkCese');
                    $('#cboEstado').select2('val', 'A').change();
                    $('#cboEstado').attr('disabled', 'disabled');
                    $('#btnFirmar').attr('disabled', 'disabled');
                    $('#divFirmar').hide();
                    bloqueDatosPrinc('C');
                }
            },
            error: function (msg) {

                alertCustom("Contrato no se listó correctamente");
            }
        });

    }


    var bloqueDatosPrinc = function (accion) {
        $('#DatosEmp').slideDown();
        $('#btnContrato').attr('disabled', 'disabled');
        $('#cbo_Empresa').attr('disabled', 'disabled');
        $('#cboEmpleado').attr('disabled', 'disabled');
        //$('#chkReingreso').attr('disabled', 'disabled');
        $('#btnCancelar').removeAttr('disabled');
        BloquearSinGif('#divchkIngreso');

        $("#grabarEmpleado").html("<i class='icon-pencil'></i>&nbsp;Guardar");

        if (accion == 'C') {
            $("#grabarEmpleado").attr("href", "javascript: CrearContrato();");
        }
        else if (accion == 'A') {
            $("#grabarEmpleado").attr("href", "javascript:ActualizarContrato();");

        }
        else {
            $("#grabarEmpleado").attr("href", "javascript:");

        }


    }



    var eventoControles = function () {



        $('#cboTipoContrato').on('change', function () {
            $('#txtCodigoTipoContrato').val($('#cboTipoContrato [value="' + this.value + '"]').attr('value_sunat'));

            if ($('#cboTipoContrato [value="' + this.value + '"]').attr('value_sunat') == '01') {
                $('#txtFechaFinCont').val('')
                $('#txtFechaFinCont').attr('disabled', 'disabled')
            }
            else {
                $('#txtFechaFinCont').removeAttr('disabled')
            }


        });



        $('#cboEmpresa').on('change', function () {
            ListarRegimenLaboral();
            fillCboSucursal();
        });

        $('#cbo_Empresa').on('change', function () {
            fillCboEmpleado(""); //Cuando pasa de NPLEMCO a NPMEMCO debe permitir ambos estados "A" e "I" para que pueda cargar todos los contratos, incluso los concluidos
        });

        $('#cboEmpresaAlerta').on('change', function () {
            cargarUsuarios();
        });



        $('#chkModFormativa').on('change', function () {

            HandlerCboModFormativa();


            if ($('#chkModFormativa').is(':checked')) {

                $('#cboModFormativa').removeAttr('disabled');

            } else {

                $('#cboModFormativa').select2('val', '');
                $('#txtCodigoModFormativa').val('');
                $('#cboModFormativa').attr('disabled', true);
            }

        });

        $('#cboTipoTrabajador').on('change', function () {
            $('#txtCodigoTipoTrabajador').val($('#cboTipoTrabajador [value="' + this.value + '"]').attr('value_sunat'));
        });



        $('#cboMotivoCese').on('change', function () {
            $('#txtCodigoMotivoCese').val($('#cboMotivoCese [value="' + this.value + '"]').attr('value_sunat'));
        });



        $('#chkCese').on('change', function () {


            if ($('#chkCese').is(':checked')) {
                $('#cboMotivoCese').removeAttr('disabled');
                $('#txtFechaCese').removeAttr('disabled');
                $('#cboEstado').select2('val', 'I').change();
                $('#divBtnCese').show();
                $('#divRenovar').hide();
            } else {

                $('#cboMotivoCese').select2('val', '');
                $('#cboMotivoCese').attr('disabled', 'disabled');
                $('#txtFechaCese').val('');
                $('#txtFechaCese').attr('disabled', 'disabled');
                $('#cboEstado').select2('val', 'F').change();
                $('#divBtnCese').hide();
                $('#divRenovar').show();
            }


        });


        $('#txtRemBasica, #txtMovilidad, #txtViaticos, #txtRefrigerio, #txtBonoProductividad, #txtBonificRiesgoCaja').on('blur', function () {
            if ($('#txtRemBasica').val().trim() == '') { $('#txtRemBasica').val('0.00') }
            if ($('#txtMovilidad').val().trim() == '') { $('#txtMovilidad').val('0.00') }
            if ($('#txtViaticos').val().trim() == '') { $('#txtViaticos').val('0.00') }
            if ($('#txtRefrigerio').val().trim() == '') { $('#txtRefrigerio').val('0.00') }
            if ($('#txtBonoProductividad').val().trim() == '') { $('#txtBonoProductividad').val('0.00') }
            if ($('#txtBonificRiesgoCaja').val().trim() == '') { $('#txtBonificRiesgoCaja').val('0.00') }
        });

        $('#txtRemBasica , #txtMovilidad, #txtViaticos, #txtRefrigerio, #txtBonoProductividad, #txtBonificRiesgoCaja').on('keyup', function () {
            CalculaRemTotal();
        });


        $("#btnContrato").on("click", function () {

            if ($('#btnContrato').attr('disabled') != 'disabled') {
                if ($('#cboEmpleado').val() != "") {

                    if (vErrors(['cboEmpleado'])) {
                        var val_Bio = $('#cboEmpleado [value="' + $('#cboEmpleado').val() + '"]').attr('val_Bio')
                        $('#hfBIO').val(val_Bio)

                        CargaContrato($('#cboEmpleado').val(), $('#cbo_Empresa').val());
                    }

                } else {
                    alertCustom("Seleccione Empleado");
                }
            }

        });


        $("#btnCancelar").on("click", function () {
            if ($('#btnCancelar').attr('disabled') != 'disabled') {
                $('#btnContrato').removeAttr('disabled');
                $('#cbo_Empresa').removeAttr('disabled');
                $('#cboEmpleado').removeAttr('disabled');
                $('#btnRenovar').removeAttr('disabled');
                $('#divRenovar').show();
                $('#btnActualizarEmpl').removeAttr('disabled', 'disabled');
                DesbloquearSinGif('#divchkIngreso');
                $('#btnCancelar').attr('disabled', 'disabled')
                $('#hfBIO').val('')
                $('#DatosEmp').slideUp();
                LimpiaDatosEmp();
                if ($('#chkReingreso').is(':checked')) {
                    fillCboEmpleado("I");
                }
                else {
                    fillCboEmpleado("A");
                } //Para que la lista se restaure a su estado por defecto.
            }
        });


        $("#btnFirmar").on("click", function () {
            if ($('#btnFirmar').attr('disabled') != 'disabled') {

                if ($('#cboEstado').val() == 'A') {
                    $("#mensaje").html("Una vez firmado el contrato no podrá modificarlo. Está seguro de firmar el contrato del empleado?");
                    $("#modal-confirmar").modal("show");

                } else {
                    alertCustom("No se pude firmar contrato, estado incorrecto.");
                }
            }
        });







        $("#cboEstado").on("change", function () {


            if ($('#cboEstado').val() == 'I') {
                $('#chkCese').attr('checked', true).parent().addClass("checked")
                $('#cboMotivoCese').removeAttr('disabled');
                $('#txtFechaCese').removeAttr('disabled');
            }
            else {
                $('#chkCese').attr('checked', false).parent().removeClass("checked")

                if ($('#cboEstado').val() == 'F') {
                    DesbloquearSinGif('#divChkCese');

                }
                else {
                    BloquearSinGif('#divChkCese');
                }


                $('#cboMotivoCese').select2('val', '');
                $('#cboMotivoCese').attr('disabled', 'disabled');
                $('#txtCodigoMotivoCese').val('');
                $('#txtFechaCese').attr('disabled', 'disabled');
            }


        });

        $("#btnRenovar").on("click", function () {
            if ($('#btnRenovar').attr('disabled') != 'disabled') {

                if ($('#cboEstado').val() == 'F') {
                    $('#txtNroContrato').val('');
                    $('#hfNumeroCont').val('');

                    var x = new Date();

                    if ($("#txtFechaFinCont").val() !== '') {
                        x = $("#txtFechaFinCont").datepicker("getDate");                                             
                    }

                    x.setDate(x.getDate() + 1);  
                    $("#txtFechaIniCont").datepicker("setDate", x).datepicker('update');

                    HabilitaControles();
                    $('#hfRenovacion').val('R');
                    
                    $('#txtFechaIniCont').attr('disabled', 'disabled');
                    $('#txtFechaFinCont').val('');
                    $("#cboTipoContrato").change();
                    $('#cboRegLab').attr('disabled', 'disabled')

                    $('#cboEstado').select2('val', 'A');
                    $('#cboEstado').attr('disabled', 'disabled');
                    $('#chkCese').attr('checked', false).parent().removeClass("checked")
                    BloquearSinGif('#divChkCese');
                    $('#cboMotivoCese').select2('val', '');
                    $('#cboMotivoCese').attr('disabled', 'disabled');
                    $('#txtCodigoMotivoCese').val('');
                    $('#txtFechaCese').attr('disabled', 'disabled');
                    $("#grabarEmpleado").html("<i class='icon-ok'></i>&nbsp;Guardar");
                    $("#grabarEmpleado").attr("href", "javascript:CrearContrato();");
                    $('#btnRenovar').attr('disabled', 'disabled')
                    $('#divRenovar').hide();
                    $('#divGrabar').show();
                }
                else {
                    alertCustom('No se puede renovar contrato en ese estado');
                }
            }
        });



        $("#btnNuevo").on("click", function () {
            $('#hfNumeroCont').val('')
        });


        $('#chkReingreso').on('change', function () {
            if ($('#chkReingreso').is(':checked')) {                
                fillCboEmpleado("I");
            }
            else {
                fillCboEmpleado("A");
            }

        });


        $("#btnCese").on("click", function () {
            if ($('#cboEstado').val() == 'I') {
                if ($('#chkCese').is(':checked') && (($('#txtFechaCese').val().trim() == '') || $('#cboMotivoCese').val() == '')) {
                    vErrorsNotMessage(['txtFechaCese', 'cboMotivoCese']);
                    v_continue = false;
                    alertCustom("Ingrese los datos obligatorios para el cese");
                }
                else {
                    $("#mensaje").html("Una vez cesado el contrato no podrá modificarlo. Está seguro de cesar el contrato del empleado?");
                    $("#modal-confirmar").modal("show");

                }

            } else {
                alertCustom("No se pude cesar contrato, estado incorrecto.");
            }
        });


        $('#btnAceptarConfir').on('click', function () {
            if ($('#cboEstado').val() == 'I') {
                ActualizarContrato();
                $("#modal-confirmar").modal("hide");
            }
            else if ($('#cboEstado').val() == 'A') {
                ActualizarFirmado();
            }
        });

        $("#btnCancelarConfir").on("click", function () {
            $("#modal-confirmar").modal("hide");
        });
    }


 

    function HandlerCboModFormativa() {
        $('#cboModFormativa').on('change', function () {
            $('#txtCodigoModFormativa').val($('#cboModFormativa [value="' + this.value + '"]').attr('value_sunat'));
        });
    }


    function CalculaRemTotal() {

        var RemBasica, AsigFam, Movilidad, Viaticos, Refrigerio, BonificacionRiesgoCaja, BonoProductividad;

        if ($('#txtRemBasica').val().trim() == '') { RemBasica = '0.00'; }
        else { RemBasica = $('#txtRemBasica').val(); }

        //if ($('#txtAsigFam').val().trim() == '') { AsigFam = '0.00'; }
        //else { AsigFam = $('#txtAsigFam').val(); }

        if ($('#txtMovilidad').val().trim() == '') { Movilidad = '0.00'; }
        else { Movilidad = $('#txtMovilidad').val(); }

        if ($('#txtViaticos').val().trim() == '') { Viaticos = '0.00'; }
        else { Viaticos = $('#txtViaticos').val(); }

        if ($('#txtRefrigerio').val().trim() == '') { Refrigerio = '0.00'; }
        else { Refrigerio = $('#txtRefrigerio').val(); }

        if ($('#txtBonoProductividad').val().trim() == '') { BonoProductividad = '0.00'; }
        else { BonoProductividad = $('#txtBonoProductividad').val(); }

        if ($('#txtBonificRiesgoCaja').val().trim() == '') { BonificacionRiesgoCaja = '0.00'; }
        else { BonificacionRiesgoCaja = $('#txtBonificRiesgoCaja').val(); }


        var sumaTotal = (parseFloat(RemBasica) + parseFloat(Movilidad) + parseFloat(Viaticos) + parseFloat(Refrigerio) + parseFloat(BonoProductividad) + parseFloat(BonificacionRiesgoCaja)).toFixed(2);
        $('#lblRemTotal').text(sumaTotal);


    }


    function LimpiaDatosEmp() {
        $('#cboMotivoCese').select2('val', '');
        $('#txtCodigoMotivoCese').val('');

        $('#cboMotivoCese').attr('disabled', 'disabled');

        //$('#chkCese').attr('checked', false).parent().removeClass("checked")

        $("#uniform-chkCese span").removeClass();
        $("#chkCese").attr("checked", false).change();
        BloquearSinGif('#divChkCese');

        $('#cboEstado').select2('val', 'A');


        $('#txtRemBasica').val('0.00');
        $('#txtMovilidad').val('0.00');
        $('#txtViaticos').val('0.00');
        $('#txtRefrigerio').val('0.00');
        $('#txtBonoProductividad').val('0.00');
        $('#txtBonificRiesgoCaja').val('0.00');
        $('#lblRemTotal').text('0.00');

        $('#txtNroContrato').val('');
        $('#hfNumeroCont').val('');

        $('#txtFechaIniCont').val('')
        $('#txtFechaFinCont').val('')
        $('#cboEmpresa').select2('val', '');
        $('#cboSucursal').select2('val', '');
        $('#cboTipoContrato').select2('val', '');
        $('#txtCodigoTipoContrato').val('');

        $('#chkModFormativa').attr('checked', false).parent().removeClass("checked")
        $('#cboModFormativa').select2('val', '');
        $('#txtCodigoModFormativa').val('');

        $('#cboTipoTrabajador').select2('val', '');
        $('#txtCodigoTipoTrabajador').val('');

        $('#cboCargo').select2('val', '');
        $('#cboRegLab').select2('val', '');
        $('#txtFechaCese').val('');


    }




    function cargainicial() {
        var pidm = ObtenerQueryString("pidm");
        var nro = ObtenerQueryString("nro");
        var ctlg_code = ObtenerQueryString("ctlg_code");

        $('#DatosEmp').slideUp();        
        fillCboEmpresa();
        fillCboEmpleado("A");        
        ListarTipoCotrato();
        ListarEstadoContrato();
        ListarModFormativa();
        ListarTipoTrab();
        ListarCargo();
        //ListarRegimenLaboral();
        ListarMotivoCese();
        cargarParametrosSistema();
        $('#hfRenovacion').val('');

        $('#cboMotivoCese').select2('val', '');
        $('#cboMotivoCese').attr('disabled', 'disabled');

        $('#txtRemBasica').val('0.00');
        $('#txtMovilidad').val('0.00');
        $('#txtViaticos').val('0.00');
        $('#txtRefrigerio').val('0.00');
        $('#txtBonoProductividad').val('0.00');
        $('#txtBonificRiesgoCaja').val('0.00');

        $('#chkReingreso').attr('checked', false);

        if (pidm != undefined) {
            $('#cbo_Empresa').select2('val', ctlg_code).change();
            $('#cboEmpleado').select2('val', pidm).change();
            $('#hfNumeroCont').val(nro)
            $('#btnContrato').click();
        }

        cargarUsuarios();

        cargarNuevosUsuarios('#txtNuevoUsuario');
        cargarConfiguracionAlerta();
    }

    var ListarEstadoContrato = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/npmemco.ashx?OPCION=LECO&ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstado').empty();
                $('#cboEstado').append('<option></option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstado').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                noexitoCustom("Error al listar Estado del Contrato.");
            }
        });
    }

    var creaTablaVacia = function () {
        var json = null;
        order: [[1, "desc"]];
        var parms = {
            data: json,
            columns: [
                { data: 'USUARIO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'NOMBRE' },
                {
                    data: null, defaultContent: '<a class="btn red"><i class="icon-remove"></i></a>',
                    createdCell: function (cell) { $(cell).css('text-align', 'center') }
                }
            ],
            order: [[1, "asc"]]
        }

        oTable = iniciaTabla('tblUsuarios', parms);
        $('#tblUsuarios').removeAttr('style');
        $('#tblUsuarios tbody').unbind('click');
        $('#tblUsuarios tbody').on('click', 'a', function () {
            var data = $('#tblUsuarios').DataTable().row($(this).parents('tr')).data();
            eliminarUsuario(1, data.USUARIO, $("#cboEmpresaAlerta").val());
        });
    };



    return {
        init: function () {
            plugins();
            eventoControles();
            creaTablaVacia();
            cargainicial();
        }
    };

}();

var cargarConfiguracionAlerta = function () {
    if ($('#cboEmpresaAlerta').val() === undefined || $('#cboEmpresaAlerta').val() === "")
        return;

    $.ajax({
        type: "post",
        url: "vistas/AL/ajax/ALMALER.ashx?opcion=5&idAlerta=1&codEmpresa=" + $('#cboEmpresaAlerta').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $('#txtNroDiasPorVencer').val(datos[0].VALOR);
            }
        },
        error: function (msg) {
            alertCustom('Error al cargar la configuración de alertas.');
        }
    });
};

var GetContratos = function () {
    var data = new FormData();
    data.append('PIDM', $('#cboEmpleado').val());
    data.append('CTLG_CODE', $('#cboEmpresa').val());
    data.append('SCSL_CODE', $('#cboSucursal').val() ?? '');
    data.append('ESTADO_IND', $('#cboEstado').val() ?? '');

    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NP/ajax/NPMEMCO.ashx?OPCION=2",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    })
   .success(function (datos) {
       Desbloquear("ventana");
       if (datos != null) {
           $('#divContratos').html(datos);

           $("#tblContratos").DataTable({
               "sDom": '<"clear">lfrtip',
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
           //columns(8).visible(false);
           $('#tblContratos').DataTable().columns(10).visible(false);
           actualizarEstilos()
           $('#tblContratos tbody').on('click', 'tr', function () {
               if ($(this).hasClass('selected')) {
                   $(this).removeClass('selected');
               }
               else {
                   table = $('#tblContratos').dataTable();
                   //table.$('tr.selected').removeClass('selected');
                   // $(this).addClass('selected');
                   var pos = table.fnGetPosition(this);
                   var row = table.fnGetData(pos);
                   var code = row[0];
                   var nro = row[1];
                   var ctlg_code = row[10];
                   
                   window.location.href = '?f=npmemco&pidm=' + code + "&nro=" + nro + "&ctlg_code=" + ctlg_code ;
               }
           });


           $('#tblDocumento tbody').on('click', 'a', function () {
               $(this).parent().parent().addClass('selected');
           });


       } else {
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
    $("TableTools_Button").css("float", "left");
}

function CrearContrato() {

    if ($('#grabarEmpleado').attr('disabled') != 'disabled') {
        var varContrato = true

        varContrato = validarContrato();

        if (varContrato) {

            //Datos Basicos
            var PIDM = $('#cboEmpleado').val();
            var CTLG_CODE = $('#cboEmpresa').val();
            var SCSL_CODE = $('#cboSucursal').val();
            var CONT_FECHA_INI = $('#txtFechaIniCont').val();
            var CONT_FECHA_FIN = $('#txtFechaFinCont').val();
            var TICO_CODE = $('#cboTipoContrato').val();
            var TITR_CODE = $('#cboTipoTrabajador').val();
            var TMOF_CODE = $('#cboModFormativa').val();
            var CARG_CODE = $('#cboCargo').val();

            var REM_BASICA = $('#txtRemBasica').val();
            var MOVILIDAD = $('#txtMovilidad').val();
            var VIATICOS = $('#txtViaticos').val();
            var REFRIGERIO = $('#txtRefrigerio').val();
            var BONO_PRODUCTIVIDAD = $('#txtBonoProductividad').val();
            var BONIFICACION_RIESGO_CAJA = $('#txtBonificRiesgoCaja').val();
            //  var ASIG_FAM_IND = $('#chkAsigFam').is(':checked') == true ? 'S' : 'N';
            //  var ASIG_FAM = $('#txtAsigFam').val();
            var REM_TOTAL = $('#lblRemTotal').text();
            var ESTADO_IND = $('#cboEstado').val();
            var USUA_ID = $.trim($('#ctl00_lblusuario').html());
            var RHREGLA_CODE = $('#cboRegLab').val();
            var RENOV_IND = $('#hfRenovacion').val();

            var data = new FormData();
            data.append('OPCION', "7");
            data.append('PIDM', PIDM);
            data.append('CTLG_CODE', CTLG_CODE);
            data.append('SCSL_CODE', SCSL_CODE);
            data.append('CONT_FECHA_INI', CONT_FECHA_INI);
            data.append('CONT_FECHA_FIN', CONT_FECHA_FIN);
            data.append('TICO_CODE', TICO_CODE);
            data.append('TITR_CODE', TITR_CODE);
            data.append('TMOF_CODE', TMOF_CODE);
            data.append('CARG_CODE', CARG_CODE);
            data.append('REM_BASICA', REM_BASICA);
            data.append('MOVILIDAD', MOVILIDAD);
            data.append('VIATICOS', VIATICOS);
            data.append('REFRIGERIO', REFRIGERIO);
            data.append('BONO_PRODUCTIVIDAD', BONO_PRODUCTIVIDAD);
            data.append('BONIFICACION_RIESGO_CAJA', BONIFICACION_RIESGO_CAJA);
            data.append('REM_TOTAL', REM_TOTAL);
            data.append('ESTADO_IND', ESTADO_IND);
            data.append('USUA_ID', USUA_ID);
            data.append('RHREGLA_CODE', RHREGLA_CODE);
            data.append('RENOV_IND', RENOV_IND);

            Bloquear("ventana");

            $.ajax({
                type: "POST",
                url: "vistas/np/ajax/npmemco.ashx",
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

                                $('#txtNroContrato').val(datos[0].NRO_CONTRATO);
                                $('#hfNumeroCont').val(datos[0].NRO_CONTRATO);
                                $('#btnFirmar').removeAttr('disabled');
                                $('#divFirmar').show();
                                $('#hfRenovacion').val('')
                                $("#grabarEmpleado").html("<i class='icon-pencil'></i>&nbsp;Guardar");
                                $("#grabarEmpleado").attr("href", "javascript:ActualizarContrato();");

                                if ($('#chkReingreso').is(':checked')) {
                                    $('#chkReingreso').attr('checked', false).change();
                                    //fillCboEmpleado("A"); //2
                                    $('#cboEmpleado').select2('val', PIDM);
                                }   

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
        }


    }

}

function ActualizarContrato() {

    if ($('#grabarEmpleado').attr('disabled') != 'disabled') {

        var varContrato = true

        varContrato = validarContrato();

        if (varContrato) {

            //Datos Basicos
            var PIDM = $('#cboEmpleado').val();
            var CTLG_CODE = $('#cboEmpresa').val();
            var SCSL_CODE = $('#cboSucursal').val();
            var CONT_FECHA_INI = $('#txtFechaIniCont').val();
            var CONT_FECHA_FIN = $('#txtFechaFinCont').val();
            var TICO_CODE = $('#cboTipoContrato').val();
            var TITR_CODE = $('#cboTipoTrabajador').val();
            var TMOF_CODE = $('#cboModFormativa').val();
            var CARG_CODE = $('#cboCargo').val();

            var REM_BASICA = $('#txtRemBasica').val();
            var MOVILIDAD = $('#txtMovilidad').val();
            var VIATICOS = $('#txtViaticos').val();
            var REFRIGERIO = $('#txtRefrigerio').val();
            var BONO_PRODUCTIVIDAD = $('#txtBonoProductividad').val();
            var BONIFICACION_RIESGO_CAJA = $('#txtBonificRiesgoCaja').val();
            //var ASIG_FAM_IND = $('#chkAsigFam').is(':checked') == true ? 'S' : 'N';
            // var ASIG_FAM = $('#txtAsigFam').val();
            var REM_TOTAL = $('#lblRemTotal').text();
            var ESTADO_IND = $('#cboEstado').val();
            var USUA_ID = $.trim($('#ctl00_lblusuario').html());
            var MOTIVO_CESE = $('#cboMotivoCese').val();
            var CONT_FECHA_CESE = $('#txtFechaCese').val();
            var RHREGLA_CODE = $('#cboRegLab').val();

            var data = new FormData();
            data.append('OPCION', "8");
            data.append('PIDM', PIDM);
            data.append('CTLG_CODE', CTLG_CODE);
            data.append('SCSL_CODE', SCSL_CODE);
            data.append('CONT_FECHA_INI', CONT_FECHA_INI);
            data.append('CONT_FECHA_FIN', CONT_FECHA_FIN);
            data.append('TICO_CODE', TICO_CODE);
            data.append('TITR_CODE', TITR_CODE);
            data.append('TMOF_CODE', TMOF_CODE);
            data.append('CARG_CODE', CARG_CODE);
            data.append('REM_BASICA', REM_BASICA);
            data.append('MOVILIDAD', MOVILIDAD);
            data.append('VIATICOS', VIATICOS);
            data.append('REFRIGERIO', REFRIGERIO);
            data.append('BONO_PRODUCTIVIDAD', BONO_PRODUCTIVIDAD);
            data.append('BONIFICACION_RIESGO_CAJA', BONIFICACION_RIESGO_CAJA);
            //   data.append('ASIG_FAM_IND', ASIG_FAM_IND);
            // data.append('ASIG_FAM', ASIG_FAM);
            data.append('REM_TOTAL', REM_TOTAL);
            data.append('ESTADO_IND', ESTADO_IND);
            data.append('USUA_ID', USUA_ID);
            data.append('MOTIVO_CESE', MOTIVO_CESE);
            data.append('CONT_FECHA_CESE', CONT_FECHA_CESE);
            data.append('RHREGLA_CODE', RHREGLA_CODE);

            Bloquear("ventana");

            $.ajax({
                type: "POST",
                url: "vistas/np/ajax/npmemco.ashx",
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

                                if (ESTADO_IND == "F") {
                                    DesabilitaControles();
                                    DesbloquearSinGif('#divChkCese');
                                    $('#btnRenovar').removeAttr('disabled');
                                    $('#divRenovar').show();
                                }
                                else if (ESTADO_IND == "I") {
                                    DesabilitaControles();
                                    BloquearSinGif('#divChkCese');
                                    $('#divBtnCese').hide();

                                    $('#cboMotivoCese').attr('disabled', 'disabled');
                                    $('#txtFechaCese').attr('disabled', 'disabled');
                                    $('#btnRenovar').attr('disabled', 'disabled')
                                    $('#divRenovar').hide();
                                    $('#grabarEmpleado').attr('disabled', 'disabled');
                                    $('#divGrabar').hide();
                                }
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
        }


    }

}

function ActualizarFirmado() {



    var varContrato = true

    varContrato = validarContrato();

    var bio_Ind = ind_bio = $("#cboSucursal :selected").attr("value_bio");

    if (bio_Ind == 'S' && $('#hfBIO').val() == '') {
        varContrato = false;
        alertCustom("El empleado no está vinculado al biométrico");
    }

    var remTotal = 0.00
    remTotal = parseFloat($('#lblRemTotal').text());

    if (remTotal <= 0) {
        varContrato = false;
        alertCustom("Ingrese los datos remunerativos");
    }



    if (varContrato) {

        //Datos Basicos
        var PIDM = $('#cboEmpleado').val();
        var CTLG_CODE = $('#cboEmpresa').val();
        var SCSL_CODE = $('#cboSucursal').val();
        var CONT_FECHA_INI = $('#txtFechaIniCont').val();
        var CONT_FECHA_FIN = $('#txtFechaFinCont').val();
        var TICO_CODE = $('#cboTipoContrato').val();
        var TITR_CODE = $('#cboTipoTrabajador').val();
        var TMOF_CODE = $('#cboModFormativa').val();
        var CARG_CODE = $('#cboCargo').val();

        var REM_BASICA = $('#txtRemBasica').val();
        var MOVILIDAD = $('#txtMovilidad').val();
        var VIATICOS = $('#txtViaticos').val();
        var REFRIGERIO = $('#txtRefrigerio').val();
        var BONO_PRODUCTIVIDAD = $('#txtBonoProductividad').val();
        var BONIFICACION_RIESGO_CAJA = $('#txtBonificRiesgoCaja').val();

        var REM_TOTAL = $('#lblRemTotal').text();
        var ESTADO_IND = "F"
        var USUA_ID = $.trim($('#ctl00_lblusuario').html());
        var MOTIVO_CESE = $('#cboMotivoCese').val();
        var CONT_FECHA_CESE = $('#txtFechaCese').val();
        var RHREGLA_CODE = $('#cboRegLab').val();

        var data = new FormData();
        data.append('OPCION', "8");
        data.append('PIDM', PIDM);
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('CONT_FECHA_INI', CONT_FECHA_INI);
        data.append('CONT_FECHA_FIN', CONT_FECHA_FIN);
        data.append('TICO_CODE', TICO_CODE);
        data.append('TITR_CODE', TITR_CODE);
        data.append('TMOF_CODE', TMOF_CODE);
        data.append('CARG_CODE', CARG_CODE);
        data.append('REM_BASICA', REM_BASICA);
        data.append('MOVILIDAD', MOVILIDAD);
        data.append('VIATICOS', VIATICOS);
        data.append('REFRIGERIO', REFRIGERIO);
        data.append('BONO_PRODUCTIVIDAD', BONO_PRODUCTIVIDAD);
        data.append('BONIFICACION_RIESGO_CAJA', BONIFICACION_RIESGO_CAJA);

        data.append('REM_TOTAL', REM_TOTAL);
        data.append('ESTADO_IND', ESTADO_IND);
        data.append('USUA_ID', USUA_ID);
        data.append('MOTIVO_CESE', MOTIVO_CESE);
        data.append('CONT_FECHA_CESE', CONT_FECHA_CESE);
        data.append('RHREGLA_CODE', RHREGLA_CODE);

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/np/ajax/npmemco.ashx",
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
                            DesabilitaControles();
                            DesbloquearSinGif('#divChkCese');
                            $('#cboEstado').select2('val', 'F')
                            $('#btnFirmar').attr('disabled', 'disabled');
                            $('#divFirmar').hide();
                            $('#btnRenovar').removeAttr('disabled');
                            $('#divRenovar').show();
                            $('#divGrabar').hide();
                            $("#modal-confirmar").modal("hide");
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
    }
}

function DesabilitaControles() {
    $('#txtRemBasica').attr('disabled', 'disabled')
    $('#txtMovilidad').attr('disabled', 'disabled')
    $('#txtViaticos').attr('disabled', 'disabled')
    $('#txtRefrigerio').attr('disabled', 'disabled')
    $('#txtBonoProductividad').attr('disabled', 'disabled')
    $('#txtBonificRiesgoCaja').attr('disabled', 'disabled')
    $('#txtFechaIniCont').attr('disabled', 'disabled')
    $('#txtFechaFinCont').attr('disabled', 'disabled')
    $('#cboEmpresa').attr('disabled', 'disabled')
    $('#cboSucursal').attr('disabled', 'disabled')
    $('#cboTipoContrato').attr('disabled', 'disabled')
    $('#chkModFormativa').attr('disabled', 'disabled')
    BloquearSinGif('#divChkModForm');
    $('#cboModFormativa').attr('disabled', 'disabled');
    $('#cboTipoTrabajador').attr('disabled', 'disabled')
    $('#cboCargo').attr('disabled', 'disabled')
    $('#cboRegLab').attr('disabled', 'disabled')
    $('#cboEstado').attr('disabled', 'disabled')

}

function HabilitaControles() {

    $('#txtRemBasica').removeAttr('disabled')
    $('#txtMovilidad').removeAttr('disabled')
    $('#txtViaticos').removeAttr('disabled')
    $('#txtRefrigerio').removeAttr('disabled')
    $('#txtBonoProductividad').removeAttr('disabled')
    $('#txtBonificRiesgoCaja').removeAttr('disabled')

    $('#txtFechaIniCont').removeAttr('disabled')
    $('#txtFechaFinCont').removeAttr('disabled')
    $('#cboEmpresa').removeAttr('disabled')
    $('#cboSucursal').removeAttr('disabled')
    $('#cboTipoContrato').removeAttr('disabled')

    $('#chkModFormativa').removeAttr('disabled')
    DesbloquearSinGif('#divChkModForm');
    $('#cboTipoTrabajador').removeAttr('disabled')
    $('#cboCargo').removeAttr('disabled')
    $('#cboRegLab').removeAttr('disabled')
}

function validarContrato() {

    var v_continue = true;

    if (!vErrors(['cboEmpresa', 'cboSucursal', 'txtFechaIniCont', 'cboEstado',
    'cboCargo', 'cboTipoContrato', 'cboTipoTrabajador', 'cboRegLab'])) {
        v_continue = false;
    }

    else if ($('#cboTipoContrato [value="' + $('#cboTipoContrato').val() + '"]').attr('value_sunat') != '01' && ($('#txtFechaFinCont').val().trim() == '')) {

        vErrorsNotMessage(['txtFechaFinCont']);
        v_continue = false;
        alertCustom("Ingrese Fecha Fin de Contrato");
    }

    else if ($('#cboEstado').val() == 'I' && !$('#chkCese').is(':checked')) {
        vErrorsNotMessage(['cboEstado']);
        v_continue = false;
        alertCustom("Ingresar datos de Cese");
    }

    else if ($('#cboEstado').val() == 'V') {
        vErrorsNotMessage(['cboEstado']);
        v_continue = false;
        alertCustom("No puede actualizar un contrato a estado : VENCIDO");
    }

    else if ($('#chkCese').is(':checked') && (($('#txtFechaCese').val().trim() == '') || $('#cboMotivoCese').val() == '')) {
        vErrorsNotMessage(['txtFechaCese', 'cboMotivoCese']);
        v_continue = false;
        alertCustom("Ingrese los datos obligatorios para el cese");
    }

    else if ($('#chkCese').is(':checked') && (DateDiff(new Date(ConvertirDate($('#txtFechaCese').val())), new Date(ConvertirDate($('#txtFechaIniCont').val()))) <= 0)) {
        vErrorsNotMessage(['txtFechaCese', 'cboMotivoCese']);
        v_continue = false;
        alertCustom("La Fecha de Cese debe ser mayor a la Fecha de Inicio del Contrato");
    }

    else if ($('#chkCese').is(':checked') && (DateDiff(new Date(ConvertirDate($('#txtFechaFinCont').val())), new Date(ConvertirDate($('#txtFechaCese').val()))) < 0)) {
        vErrorsNotMessage(['txtFechaCese', 'txtFechaFinCont']);
        v_continue = false;
        alertCustom("La Fecha de Cese debe ser menor o igual a la fecha de fin del contrato");
    }

    else if (DateDiff(new Date(ConvertirDate($('#txtFechaFinCont').val())), new Date(ConvertirDate($('#txtFechaIniCont').val()))) <= 0) {
        v_continue = false;
        alertCustom("La Fecha Fin del contrato debe ser mayor a la Fecha de Inicio");
    }

    return v_continue;

}

var agregarUsuario = function () {
    if (vErrors(['txtNuevoUsuario'])) {
        var codEmpresa = $("#cboEmpresaAlerta").val();
        var idAlerta = 1;
        var usua_id = $('#hfUSUA_ID_NC').val();

        var data = new FormData();
        data.append('opcion', '1');
        data.append('codEmpresa', codEmpresa);
        data.append('idAlerta', idAlerta);
        data.append('usuario', usua_id);

        if (usua_id !== '') {
            Bloquear('config-alertas');
            $.ajax({
                type: "POST",
                url: "vistas/AL/ajax/ALMALER.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                if (res !== null) {
                    if (res === 'OK') {
                        exito();
                        cargarUsuarios();
                        $('#txtNuevoUsuario, #hfUSUA_ID_NC').val('');
                    } else {
                        noexito();
                    }
                }
                Desbloquear('config-alertas');
            }).error(function () {
                alertCustom("Usuario ya está agregado");
                Desbloquear('config-alertas');
            });
        } else {
            alertCustom('Ingrese un usuario válido.');
        }
    }
};

var cargarUsuarios = function () {

    if ($('#cboEmpresaAlerta').val() === undefined || $('#cboEmpresaAlerta').val() === "")
        return;

    $.ajax({
        type: "post",
        url: "vistas/AL/ajax/ALMALER.ashx?opcion=2&idAlerta=1&codEmpresa=" + $('#cboEmpresaAlerta').val(),
        datatype: "json",
        async: false,
        dataSrc: '',
        success: function (datos) {
            oTable.fnClearTable();
            if (!isEmpty(datos)) {
                oTable.fnAddData(datos);
            } else {
                infoCustom("No se encontraron usuarios registrados en la configuración de alertas.");
            }
            setTimeout(function () {
                oTable.fnAdjustColumnSizing();
            }, 300);
        },
        complete: function () {
            //oTable.fnAdjustColumnSizing();
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

var cargarNuevosUsuarios = function (v_ID) {
    var txtNuevosUsuarios = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=5&CTLG_CODE=" + $('#cboEmpresaAlerta').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                txtNuevosUsuarios.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].NOMBRE);
                            obj += '{ "NOMBRE" : "' + datos[i].NOMBRE + '", "USUARIO" : "' + datos[i].USUARIO + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfUSUA_ID_NC').val(map[item].USUARIO);
                        return item;
                    }
                });
                txtNuevosUsuarios.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"));
                    if ($(this).val().trim().length === 0) {
                        $('#hfUSUA_ID_NC').val('');
                    }
                });
            }
        },
        error: function () {
            alertCustom('Error al agregar nuevo usuario.');
        }
    });
};

var eliminarUsuario = function (idAlerta, usuario, codEmpresa) {
    
    var data = new FormData();
    data.append('OPCION', '3');
    data.append('codEmpresa', codEmpresa);
    data.append('idAlerta', idAlerta);
    data.append('usuario', usuario);

    Bloquear('config-alertas');

    $.ajax({
        type: "POST",
        url: "vistas/AL/ajax/ALMALER.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).success(function (res) {
        if (res === 'OK') {
            exito();
            cargarUsuarios();
        } else {
            noexito();
        }
        Desbloquear('config-alertas');
    }).error(function () {
        alert("Error al eliminar el usuario. Por favor, intente nuevamente.");
        Desbloquear('config-alertas');
    });
};

var GrabarConfiguracionAlerta = function () {
    if (vErrorsNotMessage(['cboEmpresaAlerta', 'txtNroDiasPorVencer'])) {
        
        var data = new FormData();
        data.append('opcion', '4');
        data.append('codEmpresa', $('#cboEmpresaAlerta').val());
        data.append('idAlerta', 1);
        data.append('idParametroAlerta', 1);
        data.append('valorParametro', $('#txtNroDiasPorVencer').val());

        Bloquear('config-alertas');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/AL/ajax/ALMALER.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (res) {
            if (res == 'OK') {
                exito();
                //$('#tblCajeros').DataTable();
                //cargarNuevosCajeros('#txtNuevoCajero', '');
            } else {
                noexito();
            }
            Desbloquear("config-alertas");
        }).error(function () {
            Desbloquear("config-alertas");
            alertCustom("Error al grabar la configuración. Por favor intente nuevamente.");
        });
    }
};
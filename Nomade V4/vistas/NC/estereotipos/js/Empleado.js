
var gJsonPersona = '';
var gJsonRelacion = '';
var gJsonMotivoFin = '';
var boolButtonToggle = false

var EMPLEADO = function () {
    const estadoActivoEPS = "0001";
    const estadoBajaEPS = "0002";

    var plugins = function () {
        $('#empleado #cboEmpresa').select2();
        $('#empleado #cboSucursal').select2();
       
        $('#cboAfiliadoEPS').select2();
        $('#cboSituacionEPS').select2();
        $('#cboTipoDePago').select2();
        $('#cboCuentaPago').select2();
        $('#cboRegimenPension').select2();
        $('#cboPeriodicidadPago').select2();
        $('#cboNivelEducativo').select2();
        $('#cboCuentaCTS').select2();

        $('#txtFechaInicioAFP').datepicker();
        $('#cboTipoRegSalud').select2();
        $('#txtFechaIniEPS').datepicker();
        $('#txtFechaFinEPS').datepicker();
        $('#cboCargo').select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-65y').keydown(function () { return false; });

        $('#txtEd').inputmask({ "mask": "!", "repeat": 500, "greedy": false });
        $('#txtOcupacion').inputmask({ "mask": "!", "repeat": 500, "greedy": false });
        $("#txtFecAsig_ini").datepicker();
        $("#txtFecAsig_fin").datepicker();
    }

    var ToggleButtons = function () {
       
        if (!boolButtonToggle) {
            $('.basic-toggle-button').toggleButtons({

                label: {
                    enabled: "SI",
                    disabled: "NO"
                }
            });
            boolButtonToggle = true;
        }
    }

    var eventoControles = function () {

        $("#chk_asigFam").on('change', function () {
            if ($("#chk_asigFam").is(":checked")) {
                $($("#txtFecAsig_ini").parent().parent().parent()).removeClass("error");
                $($("#txtFecAsig_fin").parent().parent().parent()).removeClass("error");
                $("#div_asig i").remove()

                Bloquear("div_asig")
                setTimeout(function () {
                    if (verificaDerechoHabiente($('#hfPPBIDEN_PIDM').val())) {

                        $(".fecha").css("display", "block");
                        $("#msg").css("display", "none")

                    } else {
                        $('.basic-toggle-button').toggleButtons('setState', false);
                        $("#msg").css("display", "block")
                        $(".fecha").css("display", "none");
                    }
                },500)

            } else {

                
                $("#txtFecAsig_ini").datepicker("setDate", "")
                $("#msg").css("display", "none")
                $(".fecha").css("display", "none");

            }

           

        })
        
        $("#txtFecAsig_ini").datepicker().on("changeDate", function () {
        
            var fechaSelect = this.value;

            var array = fechaSelect.split("/")

            var f = array[1] + "-" + array[0] + "-" + array[2]

            var dia = new Date(f);
             dia.setDate(dia.getDate() + 1);

            //a.setDate(a.getDate() + 1)
             $("#txtFecAsig_fin").val("");
             $("#txtFecAsig_fin").datepicker('setStartDate', dia);

        });

        $('#btnDerechoHabientes').click(function () {
            $('#btnDerechoHabientes').blur();
            var pidm = $('#hfPPBIDEN_PIDM').val();
            window.open("?f=NPMEMDH&pidm=" + pidm, '_blank');
        });

        $('#empleado #cboEmpresa').on('change', function () {
            fillCboSucursal(this.value);
            //$('#btnBio').attr('disabled', true);
            $('#txtCosAsistencia').val('');
            $('#txtCosAsistencia').parent().parent().attr('class', 'control-group');
            CargaDatosEmp($('#hfPPBIDEN_PIDM').val(), this.value);

        });

        $('#empleado #cboSucursal').on('change', function () {
            var bio_ind = $("#cboSucursal :selected").attr("value_bio");

            if (bio_ind == 'S') {
                $('#btnBio').removeAttr('disabled');
                $('#txtCosAsistencia').val('');
            }
            else {
                $('#btnBio').attr('disabled', true);
                $('#txtCosAsistencia').val('');
                $('#txtCosAsistencia').parent().parent().attr('class', 'control-group');
            }
            
        });
      
        $('#txtCUSSP').on('focus', function () {
            $('#txtCUSSP').inputmask({ "mask": "U", "repeat": 12, "greedy": false }); 
        });

        $('#chkAfiliadoEPS').on('change', function () {
            //HandlerCboAfiliadoEPS();
            $('#cboSituacionEPS').select2('val', '');
            $('#txtCodigoSituacionEPS').val('');

            fillCboSituacionEPS();

            if ($('#chkAfiliadoEPS').is(':checked')) {

                $('#txtFechaFinEPS').val('');
                $('#txtFechaFinEPS').attr('disabled','true');
                
            } else {

                $('#txtFechaFinEPS').removeAttr('disabled');
         

            }

        });

         HandlerCboAfiliadoEPS();

        $('#cboSituacionEPS').on('change', function () {
            $('#txtCodigoSituacionEPS').val($('#cboSituacionEPS [value="' + this.value + '"]').attr('value_sunat'));
        });

     
        $('#cboTipoDePago').on('change', function () {
            $('#txtCodigoTipoDePago').val($('#cboTipoDePago [value="' + this.value + '"]').attr('value_sunat'));

            var valorcombo = $('#cboTipoDePago').val();
            if ((valorcombo == '0008') || (valorcombo == '0009')) {
                $('#cboCuentaPago').attr('disabled', 'disabled');
            }
            else {
                $('#cboCuentaPago').removeAttr('disabled');
            }
        });

    
        $('#cboCuentaPago').on('change', function () {
            $('#txtCodigoCuentaPago').val($('#cboCuentaPago [value="' + this.value + '"]').attr('acronimo'));
        });

        $('#cboRegimenPension').on('change', function () {
            $('#txtRegimenPension').val($('#cboRegimenPension [value="' + this.value + '"]').attr('value_sunat'));

            if ($('#cboRegimenPension [value="' + this.value + '"]').attr('value_TIP') == '1') {
                $('#chkMixto').removeAttr('disabled');
                $('#chkMixto').attr('checked', false)
            }
            else {
                $('#chkMixto').attr('disabled','disabled');
                $('#chkMixto').attr('checked', false)
            }

            if ($('#cboRegimenPension [value="' + this.value + '"]').attr('value_sunat') == '99') {
                $('#txtCUSSP').val('');
                $('#txtCUSSP').attr('disabled', 'disabled');
                //$('#txtCUSSP').attr('maxlength', '12');
                $('#txtFechaInicioAFP').datepicker('setDate', 'now');
                $('#txtFechaInicioAFP').attr('disabled', 'disabled');
            }
            
            else {
                $('#txtCUSSP').removeAttr('disabled');
                //$('#txtCUSSP').attr('maxlength', '12');
                $('#txtFechaInicioAFP').removeAttr('disabled');     
            }

        });

        $('#cboPeriodicidadPago').on('change', function () {
            $('#txtCodigoPeriodicidadPago').val($('#cboPeriodicidadPago [value="' + this.value + '"]').attr('value_sunat'));
        });

        $('#cboNivelEducativo').on('change', function () {
            $('#txtCodigoNivelEducativo').val($('#cboNivelEducativo [value="' + this.value + '"]').attr('value_sunat'));
        });

        $('#cboCuentaCTS').on('change', function () {
            $('#txtCuentaCTS').val($('#cboCuentaCTS [value="' + this.value + '"]').attr('acronimo'));
        });

        $('#cboTipoRegSalud').on('change', function () {
            if ($('#cboTipoRegSalud').val() == "S") {
                $('#cboAfiliadoEPS').select2('val', '');  
                $('#txtCodigoAfiliadoEPS').val('');                
                $('#cboAfiliadoEPS').attr('disabled', true);
                $('#cboSituacionEPS').select2('val', '');
                $('#txtCodigoSituacionEPS').val('');                
                $('#cboSituacionEPS').attr('disabled', true);
                $('#txtFechaIniEPS').val('');
                $('#txtFechaIniEPS').attr('disabled', 'disabled');
                $('#txtFechaFinEPS').val('');
                $('#txtFechaFinEPS').attr('disabled', 'disabled');                
                $('#EPS').slideUp();
            }
            else {
                $('#cboAfiliadoEPS').removeAttr('disabled');
                $('#cboSituacionEPS').removeAttr('disabled');
                $('#txtFechaIniEPS').removeAttr('disabled');
                $('#EPS').slideDown();
            }
        });
          
        $('#btnAfp').on('click', function () {
            if ($('#btnAFP').attr('disabled') != 'disabled') {
                verHistorial();
            }
        });

        $(".btnpep").click(function () {
            $("#modal-info-cont").modal('show');
        });

        $("#txtEd").bind('keyup', function (e) {
            if (e.which >= 97 && e.which <= 122) {
                var newKey = e.which - 32;
                e.keyCode = newKey;
                e.charCode = newKey;
            }

            $("#txtEd").val(($("#txtEd").val()).toUpperCase());
        });

        $("#txtOcupacion").bind('keyup', function (e) {
            if (e.which >= 97 && e.which <= 122) {
                var newKey = e.which - 32;
                e.keyCode = newKey;
                e.charCode = newKey;
            }

            $("#txtOcupacion").val(($("#txtOcupacion").val()).toUpperCase());
        });


        $('#btnHorarioEmp').click(function () {
            var pidm = $('#hfPPBIDEN_PIDM').val();
            window.open("?f=nsmghem&pidm=" + pidm, '_blank');
        });


        $('#btnCentroCost').click(function () {
            var pidm = $('#hfPPBIDEN_PIDM').val();
            window.open("?f=NPMCCEM&nIdPersona=" + pidm, '_blank');
        });

        $('#btnContrato').click(function () {
            var pidm = $('#hfPPBIDEN_PIDM').val();
            var ctlg_code = $('#cboEmpresa').val();
            window.open("?f=npmemco&pidm=" + pidm + "&ctlg_code=" + ctlg_code, '_blank');
        });

        $('#btnVacaciones').click(function () {
            var pidm = $('#hfPPBIDEN_PIDM').val();
            var ctlg_code = $('#cboEmpresa').val();
            var scsl_code = $('#cboSucursal').val();
            window.open("?f=npmemva&pidm=" + pidm + "&ctlg_code=" + ctlg_code, '_blank');
        });

        $('#btnBio').on('click', function () {
            VerificaBio();
        });

    }




    var verHistorial = function () {
        let codEmpresa = $('#empleado #cboEmpresa').val();
        Bloquear("empleado");
        $.ajax({
            type: "post",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=AFRP&PIDM=" + $('#hfPPBIDEN_PIDM').val() + "&CTLG_CODE=" + codEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#tbl-historial-regpen tbody").html('');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $("#tbl-historial-regpen tbody").append((datos[i].ESTADO_IND == 'A' ? '<tr class="alert alert-success" style="font-weight:bold;">' : '<tr>') +
                            '<td style="text-align: center;">' + datos[i].REPE_COD_SUNAT +
                            '</td><td>' + datos[i].REPE_DESC +
                            '</td><td>' + datos[i].FECHA_INICIO +
                            '</td><td>' + (datos[i].FECHA_FIN == null ? '' : datos[i].FECHA_FIN) +
                            '</td><td>' + datos[i].MIXTA_DESC +
                            '</td><td>' + datos[i].ESTADO +
                            '</td></tr>');
                    }
                }
                Desbloquear("empleado");
                $("#modal-historial-regpen").modal('show');
            },
            error: function () {
                noexitoCustom("Error al obtener Historial de Regímenes Pensionarios.");
                Desbloquear("empleado");
            }
        }
        );

    }




    var verificaDerechoHabiente = function (pidm) {

        //Bloquear("div_asig");
        //var y;
        //setTimeout(y = function () {
            var bool = false;
            $.ajax({
                type: "post",
                url: "vistas/np/ajax/npmemdh.ashx?sOpcion=LDH&IdPersona=" + pidm,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos.length > 0) {

                        for (var i = 0 ; i < datos.length ; i++) {

                            if (datos[i].EstadoInd == "A") {

                                bool = true;
                            }

                        }


                       
                    }

                    Desbloquear("div_asig");
                },
                error: function (msg) {
                    noexitoCustom("Error al obtener lista de DerechoHabientes");
                    Desbloquear("div_asig");
                }
            });



       

        //}, 500)
    
            return bool;

      

    }






    var cargaInicial = function () {

        $('#txtCUSSP').val('');
        $('#txtCUSSP').attr('disabled', 'disabled');
        $('#txtFechaInicioAFP').attr('disabled', 'disabled');

        $('#txtOcupacion').parent().html('<input type="text" id="txtOcupacion" class="span12" style="font-size:12px"/>');
        $('#txtEd').parent().html('<input type="text" id="txtEd" class="span12" style="font-size:12px"/>');

        autocompletaOcupaciones('#txtOcupacion', $('#hfOcupacion').val());
        fillCboComboboxEmpleado();
     
        autocompletaInstEduc('#txtEd', $('#hfInstEduc').val());
        ListarNivelEducativo();
        ListarRegimenPen('cboRegimenPension');
        ListarEPS();
       
        LimpiarControlesEmpleado();

    }

    return {
        init: function () {
            plugins();
            ToggleButtons();
            cargarParametrosSistema();
            transaccionesCompletas = 0
            Bloquear("empleado");
            eventoControles();
            cargaInicial();
            Desbloquear("empleado");           
            $('#cboTipoRegSalud').change();
            $('#cboRegimenPension').change();
            $('#cboAfiliadoEPS').change();
            $('#bntBio').attr('disabled', true);
           
        }
    };

}();


var habilitaAdicionales = function () {
    $('#btnDerechoHabientes').removeAttr('disabled');
    $('#btnCentroCost').removeAttr('disabled');
    $('#btnHorarioEmp').removeAttr('disabled');

    $('#btnAfp').removeAttr('disabled');
    $('#btnContrato').removeAttr('disabled');
    $('#btnVacaciones').removeAttr('disabled');    
}


function LimpiarControlesEmpleado() {
    $('#txtCodigoNivelEducativo').val('');
    $('#txtCodigoOcupacion').val('');

    $('#txtFechaInicioAFP').val('');
    $('#txtCodigoTipoTrabajador').val('');
    $('#txtCUSSP').val('');
    $('#txtRegimenPension').val('');

    $('#txtCodigoAfiliadoEPS').val('');
    $('#cboAfiliadoEPS').attr('disabled', true);
    $("#empleado #s2id_cboAfiliadoEPS a .select2-chosen").html('');
    $('#txtCodigoSituacionEPS').val('');

    $('#txtCodigoTipoDePago').val('');
    $('#txtCodigoCuentaPago').val('');    
    $('#txtCodigoPeriodicidadPago').val('');    
    $('#txtCuentaCTS').val('');
}

function HandlerCboAfiliadoEPS() {
    $('#empleado #cboAfiliadoEPS').on('change', function () {
        $('#empleado #txtCodigoAfiliadoEPS').val($('#empleado #cboAfiliadoEPS [value="' + this.value + '"]').attr('value_sunat'));
    });
}

function ListarNivelEducativo() {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=NIVED",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            $('#cboNivelEducativo').empty();
            $('#cboNivelEducativo').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboNivelEducativo').append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE + '</option>');
                }
            }
            ValidaCargaPersona();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function ListarRegimenPen(cbo_id) {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=REGPEN",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            $('#' + cbo_id).empty();
            $('#' + cbo_id).append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#' + cbo_id).append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '" value_TIP ="' + datos[i].TIP + '">' + datos[i].NOMBRE + '</option>');
                }
            }
            ValidaCargaPersona();
        },
        error: function (msg) {
            alert(msg);
        }
    });
    
}

function ListarEPS() {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=LEPS",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            $('#cboAfiliadoEPS').empty();
            $('#cboAfiliadoEPS').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboAfiliadoEPS').append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE + '</option>');
                }
            }
            ValidaCargaPersona();
        },
        error: function (msg) {
            alert(msg);
        }
    });
    //$('#cboAfiliadoEPS').select2('destroy').select2();
}


function fillCboComboboxEmpleado() {

    var selectEmpresa = $('#empleado #cboEmpresa');
    var selectSucursal = $('#empleado #cboSucursal');
    var selectSituacionEPS = $('#cboSituacionEPS');
    var selectTipoDePago = $('#cboTipoDePago');
    var selectCuentaPago = $('#cboCuentaPago');
    var selectPeriodicidadPago = $('#cboPeriodicidadPago');
    var selectCuentaCTS = $('#cboCuentaCTS');
    var selectCargo = $('#cboCargo');
  

    var data = new FormData();
    data.append('OPCION', 'COMBOBOX');
    data.append('M_EMPRESA', 'S');
    data.append('CTLG_CODE', '');
    data.append('M_SUCURSAL', 'N');
    data.append('M_TIPOTRABAJADOR', 'S');
    data.append('M_OCUPACION', 'S');
    data.append('M_AFILIADOEPS', 'S');
    data.append('EPSS_TIPO_IND', $('#empleado #chkAfiliadoEPS').is(':checked') == true ? 'S' : 'N');
    data.append('M_SITUACIONEPS', 'S');
    data.append('M_TIPOCONTRATO', 'S');
    data.append('M_MOTIVOCESE', 'S');
    data.append('M_TIPOPAGO', 'S');
    data.append('M_MODFORMATIVA', 'S');
    data.append('PIDM', $('#hfPPBIDEN_PIDM').val());
    data.append('M_CUENTA', 'S');
    data.append('M_REGIMENPENSION', 'S');
    data.append('M_PERIODICIDADPAGO', 'S');
    data.append('M_NIVELEDUCATIVO', 'S');
    data.append('M_CARGO', 'S');

    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx",
        data: data,
        contentType: false,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            selectEmpresa.empty();
            selectEmpresa.append('<option></option>');
            selectSucursal.empty();
            selectSucursal.append('<option></option>');
            selectSituacionEPS.empty();
            selectSituacionEPS.append('<option></option>');
            selectTipoDePago.empty();
            selectTipoDePago.append('<option></option>');
            selectCuentaPago.empty();
            selectCuentaPago.append('<option></option>');
            selectPeriodicidadPago.empty();
            selectPeriodicidadPago.append('<option></option>');
            selectCuentaCTS.empty();
            selectCuentaCTS.append('<option></option>');
            selectCargo.empty();
            selectCargo.append('<option></option>');


            if (datos != null) {
                if (datos[0].EMPRESA != "") selectEmpresa.append(datos[0].EMPRESA);
                if (datos[0].SUCURSAL != "") selectSucursal.append(datos[0].SUCURSAL);
                if (datos[0].SITUACION_EPS != "") selectSituacionEPS.append(datos[0].SITUACION_EPS);
                if (datos[0].TIPO_PAGO != "") selectTipoDePago.append(datos[0].TIPO_PAGO);
                if (datos[0].CUENTA_AHO != "") selectCuentaPago.append(datos[0].CUENTA_AHO);
                if (datos[0].PERIODICIDAD_PAGO != "") selectPeriodicidadPago.append(datos[0].PERIODICIDAD_PAGO);
                if (datos[0].CUENTA_CTS != "") selectCuentaCTS.append(datos[0].CUENTA_CTS);
                if (datos[0].CARGO != "") selectCargo.append(datos[0].CARGO);
            }

            selectEmpresa.select2('val', $('#ctl00_hddctlg').val()).change();
            //fillCboSucursal($('#ctl00_hddctlg').val());
            //selectSucursal.select2('val', $('#ctl00_hddestablecimiento').val()).change();
            selectSituacionEPS.select2('val', '');
            
            selectTipoDePago.select2('val', '');
            selectCuentaPago.select2('val', '');
            selectPeriodicidadPago.select2('val', '');
            selectCuentaCTS.select2('val', '');
            selectCargo.select2('val', '');

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function fillCboSucursal(v_CTLG_CODE) {
    var selectSucursal = $('#empleado #cboSucursal');

    var data = new FormData();
    data.append('OPCION', '1');
    data.append('M_EMPRESA', 'N');
    data.append('CTLG_CODE', v_CTLG_CODE);
    data.append('M_SUCURSAL', 'S');
    data.append('M_TIPOTRABAJADOR', 'N');
    data.append('M_OCUPACION', 'N');
    data.append('M_AFILIADOEPS', 'N');
    data.append('EPSS_TIPO_IND', '');
    data.append('M_SITUACIONEPS', 'N');
    data.append('M_TIPOCONTRATO', 'N');
    data.append('M_MOTIVOCESE', 'N');
    data.append('M_TIPOPAGO', 'N');
    data.append('M_MODFORMATIVA', 'N');
    data.append('PIDM', 0);
    data.append('M_CUENTA', 'N');
    data.append('M_REGIMENPENSION', 'N');
    data.append('M_PERIODICIDADPAGO', 'N');
    data.append('M_NIVELEDUCATIVO', 'N');
    data.append('M_CARGO', 'N');

    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx",
        data: data,
        contentType: false,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            selectSucursal.empty();
            selectSucursal.append('<option></option>');
            if (datos != null) {
                if (datos[0].SUCURSAL != "") selectSucursal.append(datos[0].SUCURSAL);
            }
            selectSucursal.select2('val', $('#ctl00_hddestablecimiento').val()).change();
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function fillCboSituacionEPS() {
    var selectSituacionEPS = $('#cboSituacionEPS');

    var data = new FormData();
    data.append('OPCION', '5');
    data.append('M_EMPRESA', 'N');
    data.append('CTLG_CODE', '');
    data.append('M_SUCURSAL', 'N');
    data.append('M_TIPOTRABAJADOR', 'N');
    data.append('M_OCUPACION', 'N');
    data.append('M_AFILIADOEPS', 'N');
    data.append('EPSS_TIPO_IND', $('#empleado #chkAfiliadoEPS').is(':checked') == true ? 'S' : 'N');
    data.append('M_SITUACIONEPS', 'S');
    data.append('M_TIPOCONTRATO', 'N');
    data.append('M_MOTIVOCESE', 'N');
    data.append('M_TIPOPAGO', 'N');
    data.append('M_MODFORMATIVA', 'N');
    data.append('PIDM', 0);
    data.append('M_CUENTA', 'N');
    data.append('M_REGIMENPENSION', 'N');
    data.append('M_PERIODICIDADPAGO', 'N');
    data.append('M_NIVELEDUCATIVO', 'N');
    data.append('M_CARGO', 'N');

    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx",
        data: data,
        contentType: false,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            selectSituacionEPS.empty();
            selectSituacionEPS.append('<option></option>');
            if (datos != null) {
                if (datos[0].SITUACION_EPS != "") selectSituacionEPS.append(datos[0].SITUACION_EPS);
            }
            selectSituacionEPS.selectedIndex = 1;
            selectSituacionEPS.change();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}



function initJqxGridAFP(v_JsonString) {

    $('#empleado #jqxgridAfp').jqxGrid('clear');
    $('#empleado #jqxgridAfp').jqxGrid('clearselection');

    var data = v_JsonString;
    var source = {
        datatype: 'json',
        localdata: data
    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    var editrow = -1;

    $('#empleado #jqxgridAfp').jqxGrid({
        source: dataAdapter,
        pageable: true,
        pagerButtonsCount: 20,
        altrows: true,
        filterable: true,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        enabletooltips: true,
        showemptyrow: true,
        sortable: true,
        columns: [{ text: 'CODIGO', datafield: 'REPE_CODE', width: '8%', cellsalign: 'center', align: 'center',hidden: true },
                    { text: 'COD. SUNAT', datafield: 'REPE_COD_SUNAT', width: '12%', cellsalign: 'center', align: 'center', sortable: false, search: false },
                    { text: 'REGIMEN PENS.', datafield: 'REPE_DESC', width: '30%', cellsalign: 'left', align: 'center', sortable: false, search: false },
                    { text: 'INICIO', datafield: 'FECHA_INICIO', width: '15%', cellsalign: 'center', align: 'center', sortable: false, search: false },
                    { text: 'FIN', datafield: 'FECHA_FIN', width: '15%', cellsalign: 'center', align: 'center', sortable: false, search: false },
                    { text: 'C.MIXTA', datafield: 'MIXTA_DESC', width: '15%', cellsalign: 'center', align: 'center', sortable: false, search: false },
                    { text: 'ESTADO', datafield: 'ESTADO', width: '15%', cellsalign: 'center', align: 'center', sortable: false, search: false }
                    //{
                    //    text: '', datafield: 'Editar', columntype: 'button', width: '9%', cellsrenderer: function () {
                    //        return "Editar";
                    //    }, buttonclick: function (row) {

                    //        editrow = row;
                    //        var offset = $("#empleado #jqxgridAfp").offset();
                    //        $("#popupWindow2").jqxWindow({ position: { x: parseInt(offset.left) + 30, y: parseInt(offset.top) + 30 } });

                    //        var dataRecord = $("#empleado #jqxgridAfp").jqxGrid('getrowdata', editrow);

                    //        $('#empleado #hfOpcionAFP').val("M");

                    //        ClearControlsAFP();

                       
                    //        //$("#DERECHO_HABIENTE").select2('val', dataRecord.PIDM_DA).change();


                    //        //$('#hfPIDMDA_ANT').val(dataRecord.PIDM_DA)

                    //        //$("#FECHA_INICIO").jqxDateTimeInput('val', dataRecord.FFECHA_INICIO);
                       
                    //        //var ArrayRelacion = JSON.parse(gJsonRelacion);
                    //        //$("#NVINC_CODE").jqxDropDownList({ source: ArrayRelacion, placeHolder: "", displayMember: "DESCRIPCION", valueMember: "CODIGO", width: 350, height: 25 });

                    //        //$("#NVINC_CODE").jqxDropDownList('selectItem', dataRecord.VINC_CODE);


                    //        $("#popupWindow2").jqxWindow('open');

                    //        $("#popupWindow2 span #correcto").remove();
                    //        $("#popupWindow2 .jqx-window-content").css("height", "");
                    //        $("#popupWindow2").css("height", "");

                    //    }
                    //}
        ]
    });

    $('#empleado #jqxgridAfp').jqxGrid('refreshdata');

    // initialize the popup window and buttons.
    $("#popupWindow2").jqxWindow({
        width: 500, maxHeight: 500, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#btnCancelarAFP"), modalOpacity: 0.01
    });


}


function grabarAfiliacionAFP() {

    var PIDM = 0;
    var AFP_FECHA_INI = '';
    var REPE_CODE = '';
    var USUA_ID = '';
    var flag = true;
    var MIXTO_IND = '';
    var TIP_REPE = '';

    PIDM = $('#hfPPBIDEN_PIDM').val();
    AFP_FECHA_INI = $("#txtFechaAfpMod_INI").val();
    REPE_CODE = $("#cboAfpMod").val();;
    USUA_ID = $.trim($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val());
    MIXTO_IND = $('#chkMixtoMod').is(':checked') == true ? 'S' : 'N'
    TIP_REPE = $('#cboAfpMod [value="' + $('#cboAfpMod').val() + '"]').attr('value_TIP')

    if (REPE_CODE == "") {
        flag = false;
        vErrorsNotMessage(['cboAfpMod']);
        alertCustom("Seleccione AFP");
        return false
    }

    if (AFP_FECHA_INI == "") {
        flag = false;
        vErrorsNotMessage(['txtFechaAfpMod_INI']);
        alertCustom("Seleccione Fecha Inicio AFP");
        return false
    }


    var datainformations = $('#jqxgridAfp').jqxGrid('getdatainformation');
    var rowscounts = datainformations.rowscount;

    var data_PrimeraFecha = $('#jqxgridAfp').jqxGrid('getcell', rowscounts - 1, 'FECHA_FIN');

    if (DateDiff(new Date(ConvertirDate(AFP_FECHA_INI)), new Date(ConvertirDate(data_PrimeraFecha.value))) <= 0) {
        flag = false;
        vErrorsNotMessage(['txtFechaAfpMod_INI']);
        alertCustom("No se puede ingresar una afiliación anterior a la primera");
        return false
    }



    var data_FechaIni = $('#jqxgridAfp').jqxGrid('getcell', 0, 'FECHA_INICIO');

    if (DateDiff(new Date(ConvertirDate(AFP_FECHA_INI)), new Date(ConvertirDate(data_FechaIni.value))) <= 0) {
        flag = false;
        vErrorsNotMessage(['txtFechaAfpMod_INI']);
        alertCustom("La fecha ingresada es anterior a la última afiliación");
        return false
    }


    
    if (flag) {

        var data = new FormData();
        data.append('OPCION', "NAF");
        data.append('PIDM', PIDM);
        data.append('AFP_FECHA_INI', AFP_FECHA_INI);
        data.append('REPE_CODE', REPE_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('MIXTO_IND', MIXTO_IND);

        

        Bloquear("popupWindow2");

        $.ajax({
            type: "POST",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("popupWindow2");
                if (datos != null) {
                    if (datos[0].VALIDACION != "") {
                        alertCustom(datos[0].VALIDACION);
                    }                    
                    else {
                        obtenerAfiliacionAFP();
                        $("#popupWindow2").jqxWindow('hide');
                        exito();
                        $('#cboRegimenPension').select2('val', REPE_CODE).change();
                        $('#txtFechaInicioAFP').val(AFP_FECHA_INI);
                        $('#txtFechaInicioAFP').attr('disabled', 'disabled');

                        if (TIP_REPE == '1') {
                            $('#chkMixto').removeAttr('disabled');
                            if (MIXTO_IND == 'S') {
                                $('#chkMixto').attr('checked', true);
                            }
                            else {
                                $('#chkMixto').attr('checked', false);
                            }
                        }
                        else {
                            $('#chkMixto').attr('checked', false);
                            $('#chkMixto').attr('disabled', 'disabled');

                        }

                       
                            
                       
                    }
                }
            },
            error: function (msg) {
                Desbloquear("popupWindow2");
                noexito();
            }
        });
    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }

}


function ShowPopupWindowAFP() {
    var ArrayPersonas = [];
    var offset = $("#empleado #jqxgridAfp").offset();
    $("#popupWindow2").jqxWindow({ maxHeight: "500px", height: "210px", position: { x: parseInt(offset.left) + 30, y: parseInt(offset.top) + 30 } });

    $('#empleado #hfOpcionAFP').val("A");

    $("#popupWindow2").jqxWindow('open');
    $("#popupWindow2 span #correcto").remove();
    $("#popupWindow2 .jqx-window-content").css("height", "");
    $("#popupWindow2").css("height", "");

}

function ClearControlsDerechoHabientes() {

    $("#DERECHO_HABIENTE").select2('val','').change();
    $("#FECHA_INICIO").jqxDateTimeInput({ value: null });
    $("#FECHA_FIN").jqxDateTimeInput({ value: null });
    $("#NVINC_CODE").jqxDropDownList('clearSelection');
    $("#NMBDH_COD").jqxDropDownList('clearSelection');
    $('#hfPIDMDA_ANT').val('');

}


function getArrayRelacion() {

    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=17",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                gJsonRelacion = JSON.stringify(datos);
            }
            else {
                gJsonRelacion = "[]";
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function getArrayMotivoFin() {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=18",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                gJsonMotivoFin = JSON.stringify(datos);
            }
            else {
                gJsonMotivoFin = "[]";
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getArrayPersonas() {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=19",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                gJsonPersona = JSON.stringify(datos);
            }
            else {
                gJsonPersona = "[]";
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function fillcboDerechoHabiente() {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=19",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#DERECHO_HABIENTE').empty();
            $('#DERECHO_HABIENTE').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#DERECHO_HABIENTE').append('<option value="' + datos[i].CODIGO + '" value_sexo ="' + datos[i].SEXO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    //$('#cboAfiliadoEPS').select2('destroy').select2();
}


function crearEmpleado() {

    var v_continue = true;

    v_continue = validarEmpleado();

    if (v_continue) {

        //Datos Basicos
        var PIDM = $('#hfPPBIDEN_PIDM').val();
        var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
        var CTLG_CODE = $('#empleado #cboEmpresa').val();
        var SCSL_CODE = $('#empleado #cboSucursal').val();
        var NIED_CODE = $('#cboNivelEducativo').val();
        var OCUP_CODE = $('#hfOcupacion').val();
        var RESUMEN = $('#txtResumen').val();

        //Régimen Pensionario
        var REPE_CODE = $('#cboRegimenPension').val();
        var NUM_CUSSP = $('#txtCUSSP').val();
        var AFP_FECHA_INI = $('#txtFechaInicioAFP').val();
        var MIXTO_IND = $('#chkMixto').is(':checked') == true ? 'S' : 'N';

        //Régimen Salud
        var TIPO_REG_SALUD = $('#cboTipoRegSalud').val();
        var EPSA_CODE = $('#cboAfiliadoEPS').val();
        var EPSS_CODE = $('#cboSituacionEPS').val();
        var EPS_ESTADO = $('#chkAfiliadoEPS').is(':checked') == true ? 'A' : 'I';
        var EPS_FECHA_INI = $('#txtFechaIniEPS').val();
        var EPS_FECHA_FIN = $('#txtFechaFinEPS').val();
        var VIDA_LEY_ESTADO = $('#chkAfiliadoVidaLey').is(':checked') == true ? 'A' : 'I';

        //Cuentas y Pagos
        var CUBA_CODE_PAGO = $('#cboCuentaPago').val();
        var CUBA_CODE_CTS = $('#cboCuentaCTS').val();
        var TIPA_CODE = $('#cboTipoDePago').val();
        var PEPA_CODE = $('#cboPeriodicidadPago').val();

        var CARG_CODE = $('#cboCargo').val();

        var FTVIEDU_CODE = $('#hfInstEduc').val();
        var ANIO_EDU_FIN = $('#optanho').val();
        var ASIST_CODE = $('#txtCosAsistencia').val();
        var FTVIEDU_DESC = $('#txtEd').val().trim();
        
                                     
        var data = new FormData();
        data.append('OPCION', "NE");
        data.append('PIDM', PIDM);
        data.append('ESTADO_IND', "A");
        data.append('USUA_ID', USUA_ID);
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('NIED_CODE', NIED_CODE);
        data.append('OCUP_CODE', OCUP_CODE);
        data.append('RESUMEN', RESUMEN);

        data.append('REPE_CODE', REPE_CODE);
        data.append('NUM_CUSSP', NUM_CUSSP);
        data.append('AFP_FECHA_INI', AFP_FECHA_INI);
        data.append('MIXTO_IND', MIXTO_IND);

        data.append('TIPO_REG_SALUD', TIPO_REG_SALUD);
        data.append('EPSA_CODE', EPSA_CODE);
        data.append('EPSS_CODE', EPSS_CODE);
        data.append('EPS_ESTADO', EPS_ESTADO);
        data.append('EPS_FECHA_INI', EPS_FECHA_INI);
        data.append('EPS_FECHA_FIN', EPS_FECHA_FIN);
        data.append('VIDA_LEY_ESTADO', VIDA_LEY_ESTADO);

        data.append('CUBA_CODE_PAGO', CUBA_CODE_PAGO);
        data.append('CUBA_CODE_CTS', CUBA_CODE_CTS);
        data.append('TIPA_CODE', TIPA_CODE);     
        data.append('PEPA_CODE', PEPA_CODE);
               
        data.append('CARG_CODE', CARG_CODE);

        data.append('FTVIEDU_CODE', FTVIEDU_CODE);
        data.append('ANIO_EDU_FIN', ANIO_EDU_FIN);
        data.append('ASIST_CODE', ASIST_CODE);
        data.append('FTVIEDU_DESC', FTVIEDU_DESC);


        Bloquear("empleado");

        $.ajax({
            type: "POST",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("empleado");
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].VALIDACION != "") {
                            alertCustom(datos[0].VALIDACION);
                        }
                        else {                           
                            exito();
                            $('#empleado #cboSucursal').attr('disabled', 'disabled');
                            $('#cboCargo').attr('disabled', 'disabled');
                            $("#grabarEmpleado").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                            $("#grabarEmpleado").attr("href", "javascript:actualizarEmpleado();");
                            $('#chkAfiliadoEPS').removeAttr('disabled')

                            $('#hfInstEduc').val('');
                            $('#txtEd').parent().html('<input type="text" id="txtEd" class="span12" style="font-size:12px"/>');
                            autocompletaInstEduc('#txtEd', $('#hfInstEduc').val());
                            $('#hfInstEduc').val(datos[0].RESPUESTA)
                            $('#txtEd').val(FTVIEDU_DESC);
                            $('#lblEstado').text('ACTIVO');

                            //21052015
                            //if ($('#cboRegimenPension').val() != '0011') {
                            //    $('#cboRegimenPension').attr('disabled', 'disabled');
                            //    $('#txtFechaInicioAFP').attr('disabled', 'disabled');
                            //    $('#btnAfp').removeAttr('disabled')
                            //}
                               
                            habilitaAdicionales();
                        }
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("empleado");
                noexito();
            }
        });
    }


}

function validarEmpleado() {

    var v_continue = true;
    var bio_ind = $("#cboSucursal :selected").attr("value_bio");
    var sunat_regimen = $('#cboRegimenPension [value="' + $('#cboRegimenPension').val() + '"]').attr('value_sunat'); // 48 onp; 99: sin regimen

    if (!vErrors(['cboEmpresa', 'cboSucursal', 'txtCodigoTipoDePago', 'cboPeriodicidadPago', 'cboNivelEducativo', 'optanho', 'txtEd', 'cboRegimenPension', 'txtOcupacion'])) {
        v_continue = false;
    }
    else if (sunat_regimen != '99' && sunat_regimen!="48" && ($('#txtCUSSP').val().trim() == '' || $('#txtFechaInicioAFP').val().trim() == '')) {
        vErrorsNotMessage(['txtCUSSP', 'txtFechaInicioAFP']);        
        v_continue = false;
        alertCustom("Ingrese los datos obligatorios del Régimen pensionario");
    }
    else if ($('#cboTipoRegSalud').val() == 'P' && ($('#cboAfiliadoEPS').val().trim() == '' || $('#cboSituacionEPS').val().trim() == '' || $('#txtFechaIniEPS').val().trim() == '')) {
        vErrorsNotMessage(['cboAfiliadoEPS', 'cboSituacionEPS', 'txtFechaIniEPS']);
        v_continue = false;
        alertCustom("Ingrese los datos obligatorios del EPS");
    }
 
    else if ($('#cboTipoRegSalud').val() == 'P' && !$('#chkAfiliadoEPS').is(':checked') && $('#txtFechaFinEPS').val().trim() == '') {
        vErrorsNotMessage(['txtFechaFinEPS']);
        v_continue = false;
        alertCustom("Ingrese los datos obligatorios del EPS");
    }
    else if ((!$('#chkAfiliadoEPS').is(':checked') && $('#cboTipoRegSalud').val() == 'P') && (DateDiff(new Date(ConvertirDate($('#txtFechaFinEPS').val())), new Date(ConvertirDate($('#txtFechaIniEPS').val()))) <= 0)) {
        v_continue = false;
        alertCustom("La Fecha Fin de afiliacion EPS no puede ser menor a la Fecha Inicio");
    }
    //else if (bio_ind == 'S' && $('#txtCosAsistencia').val().trim() == '') {
    //    v_continue = false;
    //    alertCustom("Debe vincular al empleado con el Biométrico");
    //    vErrorsNotMessage(['txtCosAsistencia']);
    //}
    else if ($('#hfOcupacion').val() == '') {
        v_continue = false;
        alertCustom("Seleccione Ocupación");
        vErrorsNotMessage(['txtOcupacion']);
    }
    else if ($('#chk_asigFam').is(':checked') && $('#txtFecAsig_ini').val().trim() == '' && $('#txtFecAsig_fin').val().trim() == '') {
        v_continue = false;
        alertCustom("Ingrese una fecha de inicio y fin para registrar la Asigancion Familiar");
        vErrorsNotMessage(['txtFecAsig_ini', 'txtFecAsig_fin']);
    }
    else if (sunat_regimen == "48" && $('#txtFechaInicioAFP').val().trim() == '') {
        vErrorsNotMessage(['txtFechaInicioAFP']);
        v_continue = false;
        alertCustom("Ingrese los datos obligatorios del Régimen pensionario");
    }
    else {
        return v_continue;
    }
}

function actualizarEmpleado() {

    var v_continue = true;

    v_continue = validarEmpleado();

    if (v_continue) {

        //Datos Basicos
        var PIDM = $('#hfPPBIDEN_PIDM').val();
        var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
        var CTLG_CODE = $('#empleado #cboEmpresa').val();
        var SCSL_CODE = $('#empleado #cboSucursal').val();
        var NIED_CODE = $('#cboNivelEducativo').val();
        var OCUP_CODE = $('#hfOcupacion').val();
        var RESUMEN = $('#txtResumen').val();

        //Régimen Pensionario
        var REPE_CODE = $('#cboRegimenPension').val();
        var NUM_CUSSP = $('#txtCUSSP').val();
        var AFP_FECHA_INI = $('#txtFechaInicioAFP').val();
        var MIXTO_IND = $('#chkMixto').is(':checked') == true ? 'S' : 'N';
        

        //Régimen Salud
        var TIPO_REG_SALUD = $('#cboTipoRegSalud').val();
        var EPSA_CODE = $('#cboAfiliadoEPS').val();
        var EPSS_CODE = $('#cboSituacionEPS').val();
        var EPS_ESTADO = $('#chkAfiliadoEPS').is(':checked') == true ? 'A' : 'I';
        var EPS_FECHA_INI = $('#txtFechaIniEPS').val();
        var EPS_FECHA_FIN = $('#txtFechaFinEPS').val();
        var VIDA_LEY_ESTADO = $('#chkAfiliadoVidaLey').is(':checked') == true ? 'A' : 'I';

        //Cuentas y Pagos
        var CUBA_CODE_PAGO = $('#cboCuentaPago').val();
        var CUBA_CODE_CTS = $('#cboCuentaCTS').val();
        var TIPA_CODE = $('#cboTipoDePago').val();
        var PEPA_CODE = $('#cboPeriodicidadPago').val();


        var CARG_CODE = $('#cboCargo').val();

        var FTVIEDU_CODE = $('#hfInstEduc').val();
        var ANIO_EDU_FIN = $('#optanho').val();
        var ASIST_CODE = $('#txtCosAsistencia').val();
        var FTVIEDU_DESC = $('#txtEd').val().trim();


        //Asigancion Familiar

        var p_IND_ASIG_FAM = $('#chk_asigFam').is(':checked') == true ? 'S' : 'N';
        var p_FEC_ASIG_FAM_INI = $('#txtFecAsig_ini').val();
        var p_FEC_ASIG_FAM_FIN = $('#txtFecAsig_fin').val();

        var data = new FormData();
        data.append('OPCION', "AE");
        data.append('PIDM', PIDM);

        data.append('USUA_ID', USUA_ID);
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('NIED_CODE', NIED_CODE);
        data.append('OCUP_CODE', OCUP_CODE);
        data.append('RESUMEN', RESUMEN);

        data.append('REPE_CODE', REPE_CODE);
        data.append('NUM_CUSSP', NUM_CUSSP);
        data.append('AFP_FECHA_INI', AFP_FECHA_INI);
        data.append('MIXTO_IND', MIXTO_IND);        

        data.append('TIPO_REG_SALUD', TIPO_REG_SALUD);
        data.append('EPSA_CODE', EPSA_CODE);
        data.append('EPSS_CODE', EPSS_CODE);
        data.append('EPS_ESTADO', EPS_ESTADO);
        data.append('EPS_FECHA_INI', EPS_FECHA_INI);
        data.append('EPS_FECHA_FIN', EPS_FECHA_FIN);
        data.append('VIDA_LEY_ESTADO', VIDA_LEY_ESTADO);

        data.append('CUBA_CODE_PAGO', CUBA_CODE_PAGO);
        data.append('CUBA_CODE_CTS', CUBA_CODE_CTS);
        data.append('TIPA_CODE', TIPA_CODE);
        data.append('PEPA_CODE', PEPA_CODE);

        data.append('CARG_CODE', CARG_CODE);

        data.append('FTVIEDU_CODE', FTVIEDU_CODE);
        data.append('ANIO_EDU_FIN', ANIO_EDU_FIN);
        data.append('ASIST_CODE', ASIST_CODE);
        data.append('FTVIEDU_DESC', FTVIEDU_DESC);

        data.append('p_IND_ASIG_FAM', p_IND_ASIG_FAM);
        data.append('p_FEC_ASIG_FAM_INI', p_FEC_ASIG_FAM_INI);
        data.append('p_FEC_ASIG_FAM_FIN', p_FEC_ASIG_FAM_FIN);

        Bloquear("empleado");

        $.ajax({
            type: "POST",
            url: "vistas/nc/estereotipos/ajax/Empleado.ashx",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                Desbloquear("empleado");
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].VALIDACION != "OK") {
                            alertCustom(datos[0].VALIDACION);
                        }
                        else {
                            exito();
                            $('#hfInstEduc').val('');
                            $('#txtEd').parent().html('<input type="text" id="txtEd" class="span12" style="font-size:12px"/>');
                            autocompletaInstEduc('#txtEd', $('#hfInstEduc').val());
                            $('#hfInstEduc').val(datos[0].RESPUESTA)
                            $('#txtEd').val(FTVIEDU_DESC);

                        }
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("empleado");
                noexito();
            }
        });
    }


}

function recargaEmpleado() {
    $.ajaxSetup({ async: false });
    $("#empleado").load('../../vistas/NC/estereotipos/Empleado.html', function (html) {
    });
    $.ajaxSetup({ async: true });

    EMPLEADO.init();
}

function CargaDatosEmp(v_PPBIDEN_PIDM , v_CTLG_CODE) {

    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=LEMP&PIDM=" + v_PPBIDEN_PIDM + "&CTLG_CODE=" + v_CTLG_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            var selectEmpresa = $('#empleado #cboEmpresa');
            var selectSucursal = $('#empleado #cboSucursal');
            var selectNivelEducativo = $('#cboNivelEducativo');
                              
            if (!isEmpty(datos)) {
                selectEmpresa.select2('val', datos[0].CTLG_CODE);
                        
                $('#empleado #cboSucursal').select2('val', datos[0].SCSL_CODE).change();
                $('#empleado #cboSucursal').attr('disabled', 'disabled');

                $('#lblEstadoDesc').text(datos[0].ESTADO_CONT);
                $('#lblEstado').text(datos[0].ESTADO);

                if (datos[0].FECHA_INGRESO == '00/00/0000') {
                    $('#lblFechaIng').text('-');
                }
                else {
                    $('#lblFechaIng').text(datos[0].FECHA_INGRESO);
                }

                $('#txtResumen').val(datos[0].RESUMEN_EMPL);
                //selectOcupacion.select2('val', datos[0].OCUP_CODE).change();
                $('#hfOcupacion').val(datos[0].OCUP_CODE)
                $('#txtOcupacion').val(datos[0].OCUPACION)
                $('#txtCodigoOcupacion').val(datos[0].OCUP_CODE_SUNAT)

                
                
                selectNivelEducativo.select2('val', datos[0].NIED_CODE).change();

                $('#cboCargo').val(datos[0].CARGO_CODE).change();
                $('#cboCargo').attr('disabled','disabled')

                CargaRegPen(v_PPBIDEN_PIDM);

                $('#empleado #cboTipoRegSalud').select2('val', datos[0].REG_SALUD).change();
                if (datos[0].REG_SALUD == 'P') {
                    CargaEps(v_PPBIDEN_PIDM, v_CTLG_CODE)                    
                }


                $('#txtCosAsistencia').val(datos[0].ASIST_CODE)
                $('#optanho').val(datos[0].ANIO_EDU_FIN)
                $('#hfInstEduc').val(datos[0].FTVIEDU_CODE)
                $('#txtEd').val(datos[0].FTVIEDU_DESCRIPCION)
                
                
                //CargaContrato(v_PPBIDEN_PIDM)
                CargaDatosPago(v_PPBIDEN_PIDM)


                //DATOS ASIG FAMILIAR 
                if (datos[0].ASIG_FAM_IND == "N") {
                    $('.basic-toggle-button').toggleButtons('setState', false);
                    $("#txtFecAsig_ini").datepicker("setDate", "")
                }
                if (datos[0].ASIG_FAM_IND == "S") {
                    $('.basic-toggle-button').toggleButtons('setState', true);
                    $("#txtFecAsig_ini").datepicker("setDate", datos[0].FEC_ASIG_FAM_INI)
                    $("#txtFecAsig_fin").datepicker("setDate", datos[0].FEC_ASIG_FAM_FIN)
                }

                if (datos[0].VIDA_LEY_IND == 'A') {
                    $('#chkAfiliadoVidaLey').attr("checked", true).change();
                }
                else {
                    $('#chkAfiliadoVidaLey').attr("checked", false).change();
                }

                $("#grabarEmpleado").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                $("#grabarEmpleado").attr("href", "javascript:actualizarEmpleado();");

                habilitaAdicionales();
            }
            else {
                             
                fnControlesEstadoInicial();
            }
        },
        error: function (msg) {

            alert(msg);
        }
    });

}

var fnControlesEstadoInicial = function(){
    $("#grabarEmpleado").html("<i class='icon-ok'></i>&nbsp;Guardar");
    $("#grabarEmpleado").attr("href", "javascript:crearEmpleado();");

    $('#empleado #cboSucursal').removeAttr('disabled');
    $("#lblEstado").text("");    
    $("#lblEstadoDesc").text("SIN CONTRATO");
    $("#lblFechaIng").text("-"); 
    $("#txtResumen").val("");
    $('#chk_asigFam').removeAttr("checked").change();
    $("#cboCargo").val("").change();
    $("#cboCargo").removeAttr("disabled");
    $("#txtCosAsistencia").val("");

    $('#txtCodigoAfiliadoEPS').val('');
    $('#cboAfiliadoEPS').attr('disabled', true);
    $("#empleado #s2id_cboAfiliadoEPS a .select2-chosen").html('');
    $('#txtCodigoSituacionEPS').val('');
    $("#cboTipoRegSalud").val("S").change();

    $('#txtCodigoTipoDePago').val('');
    $('#txtCodigoCuentaPago').val('');
    $('#txtCodigoPeriodicidadPago').val('');
    $('#txtCuentaCTS').val('');
    $("#cboCuentaPago").val("").change();
    $("#cboCuentaCTS").val("").change();
    $("#cboTipoDePago").val("").change();
    $("#cboPeriodicidadPago").val("").change();   
}

function CargaRegPen(v_PPBIDEN_PIDM) {
    let codEmpresa = $('#empleado #cboEmpresa').val();
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=AFRP&PIDM=" + v_PPBIDEN_PIDM +
        "&REPE_CODE=&ESTADO_IND=A" +
        "&CTLG_CODE=" + codEmpresa ,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            var selectAfiliadoEPS = $('#empleado #cboAfiliadoEPS');
            var selectRegimenPension = $('#empleado #cboRegimenPension');
    
            
            if (datos != null) {

                selectRegimenPension.select2('val', datos[0].REPE_CODE).change();
                $('#txtCUSSP').val(datos[0].CUSPP);
                $('#txtFechaInicioAFP').datepicker('setDate', datos[0].FECHA_INICIO);

                if (datos[0].MIXTA_IND == 'S') {
                    $('#chkMixto').attr("checked", true);
                }
                else {
                    $('#chkMixto').attr("checked", false);
                }

            }
          
        },
        error: function (msg) {

            alert(msg);
        }
    });

}

function CargaEps(v_PPBIDEN_PIDM, v_CTLG_CODE) {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=AFEPS&PIDM=" + v_PPBIDEN_PIDM +
        "&REPE_CODE=" + 
        "&CTLG_CODE=" + v_CTLG_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            var selectAfiliadoEPS = $('#empleado #cboAfiliadoEPS');
            var selectSituacionEPS = $('#empleado #cboSituacionEPS');
           

            if (datos != null) {

                selectAfiliadoEPS.select2('val', datos[0].EPSA_CODE).change();
                             
                $('#empleado #txtFechaIniEPS').datepicker('setDate', datos[0].FECHA_INICIO);
               

                $('#empleado #chkAfiliadoEPS').removeAttr('disabled');

                if (datos[0].ESTADO_IND == 'A') {
                    $('#empleado #chkAfiliadoEPS').attr("checked", true).change();
                }
                else {
                    $('#empleado #chkAfiliadoEPS').attr("checked", false).change();
                }

                $('#empleado #txtFechaFinEPS').datepicker('setDate', datos[0].FECHA_FIN);
                selectSituacionEPS.select2('val', datos[0].EPSS_CODE).change();

            }
        },
        error: function (msg) {

            alert(msg);
        }
    });

}

function CargaDatosPago(v_PPBIDEN_PIDM) {
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=PAGO&PIDM=" + v_PPBIDEN_PIDM ,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            var selectTipoDePago = $('#cboTipoDePago');
            var selectPeriodicidadPago = $('#cboPeriodicidadPago');
            var selectCuentaPago = $('#cboCuentaPago');
            var selectCuentaCTS = $('#cboCuentaCTS');
          
          


            if (datos != null) {
                selectTipoDePago.select2('val', datos[0].TIPO_PAGO_COD).change()
                selectPeriodicidadPago.select2('val', datos[0].PEPA_CODE).change()
                selectCuentaPago.select2('val', datos[0].CUEN_CODE_SUELDO).change()
                selectCuentaCTS.select2('val', datos[0].CUEN_CODE_CTS).change()
            }
        },
        error: function (msg) {

            alert(msg);
        }
    });

}

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
            alert(msg);
        }
    });
}

var autocompletaInstEduc = function (v_ID, v_value) {
    var txtResp = $(v_ID);

    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=IED",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                txtResp.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].DESCRIPCION);
                            obj += '{ "CODIGO" : "' + datos[i].CODIGO + '", "DESCRIPCION" : "' + datos[i].DESCRIPCION + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.DESCRIPCION] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfInstEduc').val(map[item].CODIGO);
                        return item;
                    }
                });

                txtResp.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if (txtResp.val().length <= 0)
                    {
                        $('#hfInstEduc').val('');
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                txtResp.val(v_value);
            }
            ValidaCargaPersona();
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

var transaccionesCompletas = 0;

function ValidaCargaPersona() {
    transaccionesCompletas += 1;

    if (transaccionesCompletas == 5) {
        let codEmpresa = $('#empleado #cboEmpresa').val();
        CargaDatosEmp($('#hfPPBIDEN_PIDM').val(), codEmpresa);
    }    
}

var VerificaBio = function () {
   
    if ($('#btnBio').attr('disabled') != 'disabled') {
        Bloquear('divAsistencia');
        setTimeout(function () {

            $.ajax({
                type: "post",
                url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=VBIO&DNI_BIO=" + $('#txtdninatural').val(),
                async: false,
                success: function (datos) {
                    if (datos != null) {

                        if (datos == 'NE') {

                            infoCustom("El empleado no está registrado en el Biométrico");
                            $('#txtCosAsistencia').val('');
                        }
                        else {
                            $('#txtCosAsistencia').val(datos);
                            $('#txtCosAsistencia').parent().parent().attr('class', 'control-group');
                        }


                    }
                    else {
                        alertCustom("Error de conexión");
                        $('#txtCosAsistencia').val('');
                    }
                    Desbloquear('divAsistencia');
                },
                error: function (msg) {
                    alertCustom("Error al vincular Empleado con Biométrico");
                    Desbloquear('divAsistencia')
                }
            });


        }, 1500);
       
    }
}

var autocompletaOcupaciones = function (v_ID, v_value) {
    var txtResp = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/nc/estereotipos/ajax/Empleado.ashx?OPCION=OCUP",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                txtResp.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].NOMBRE);
                            obj += '{ "CODIGO" : "' + datos[i].CODIGO + '", "DESCRIPCION" : "' + datos[i].NOMBRE + '" , "CODIGO_SUNAT" : "' + datos[i].CODIGO_SUNAT + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.DESCRIPCION] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfOcupacion').val(map[item].CODIGO);
                        $('#txtCodigoOcupacion').val(map[item].CODIGO_SUNAT);
                        return item;
                    }
                });

                txtResp.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if (txtResp.val().length <= 0) {
                        $('#hfOcupacion').val('');
                        $('#txtCodigoOcupacion').val('');
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                txtResp.val(v_value);
            }
            ValidaCargaPersona();
           

        },
        error: function (msg) {
            alert(msg);
        }
    });
};
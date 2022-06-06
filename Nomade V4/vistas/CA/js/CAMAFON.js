function GrabarAsignacion() {
    Bloquear("ventana");

    var opcion, ctlg_code, scsl_code, pidm, activo, glosa, moneda, monto, fecha_asignacion, fecha_limite, centro_costos, estado;

    opcion = $("#hf_opcion").val();
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    caja_code = $("#cbocajas").val();
    cajac_code = $("#cbocajac").val();
    descripcion = $("#txtdescripcion").val();
    moneda = $("#cbomoneda").val();
    monto = $("#txtmonto").val();
    usua_id = $('#ctl00_lblusuario').text();

    var data = new FormData();

    data.append('opcion', opcion);
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('caja_code', caja_code);
    data.append('cajac_code', cajac_code);
    data.append('descripcion', descripcion);
    data.append('moneda', moneda);
    data.append('monto', monto);
    data.append('usua_id', usua_id);


    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CA/ajax/CAMAFON.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
.success(function (res) {
    Desbloquear("ventana");
    if (res != null) {
        if (res== 'OK') {
            exito();
            $("#grabar").addClass('disabled');
            $("#grabar").removeAttr('href');
        } else {
            noexito();
        }
    }
    else {
        noexito();
    }
})
.error(function () {
    Desbloquear("ventana");
})
}

function Grabar() {
    $('#aspnetForm').submit();
}

var CAMAFON = function () {

    var validacion = function () {

        var frmPersonaNatural = $("#aspnetForm"); //aspnetForm es el formulario por defecto del ASP
        var errorNatural = $('.alert-error', frmPersonaNatural);
        var successNatural = $('.alert-success', frmPersonaNatural);

        frmPersonaNatural.validate({
            errorElement: 'span', //el input tien por defecto el span para mostrar el error
            errorClass: 'help-inline', // agrega la clase help-line en la cual se mostrara el error
            focusInvalid: false, // no se muestra el foco en el elemento invalido
            ignore: "",
            invalidHandler: function (event, validator) { //se ejecuta al no cumplirse las reglas              
                successNatural.hide();
                errorNatural.show();
                App.scrollTo(errorNatural, -200);
            },

            highlight: function (element) { // error para cada input
                $(element)
                    .closest('.help-inline').removeClass('ok'); // quita el icono de ok (aspa)
                $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // cambia la clase de todo el agrupador a rojo
            },

            unhighlight: function (element) { // revierte el error a success
                $(element)
                    .closest('.control-group').removeClass('error');
            },

            success: function (label) {
                label
                    .addClass('valid').addClass('help-inline ok') // agrega el icono del check
                .closest('.control-group').removeClass('error').addClass('success'); // quita el color rpjp y lo coloca en verde
                //Grabar()
            },

            submitHandler: function (form) {
                successNatural.show();
                errorNatural.hide();
                if ($('#hf_opcion').val() == "1") {
                    GrabarAsignacion();
                } else if ($('#hf_opcion').val() == "2") {
                    dibujarTabla();
                }

            }
        });
    }

    function fillBandejaexistencias() {
        var oTableExistencias = $('#tblAsignacion').dataTable();
        $('#tblAsignacion').removeAttr('style');

    }


    function dibujarTabla() {
        var ctlg_code = $("#slcEmpresa").val();
        var scsl_code = $("#slcSucural").val();
        var caja_code = $("#cbocajas").val();;
        
        var opcion = $("#hf_opcion").val();

        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/camafon.ashx?opcion=" + opcion + "&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code + "&caja_code=" + caja_code,
            async: false,
            success: function (datos) {
                $('#tblDatos').html(datos);
                    fillBandejaexistencias();
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

    var cargarCajas = function () {
        var ctlg_code = $("#slcEmpresa").val();
        var scsl_code = $("#slcSucural").val();
        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camascr.ASHX?opcion=12&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code,
            success: function (datos) {
                $("#con_cajas").html(datos);
                $('#cbocajas').select2();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargarCajas1 = function () {
        var ctlg_code = $("#slcEmpresa").val();
        var scsl_code = $("#slcSucural").val();
        var tipo_caja = $("#cbo_origen").val();

        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camascr.ASHX?opcion=14&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code + "&tipo_caja=" + tipo_caja,
            success: function (datos) {
                $("#con_caja1").html(datos);
                $('#cbocajac').select2();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillcboMoneda = function () {

        CrearControl('N', '1', 'cbomoneda', 'con_moneda');

    }

    var eventoControles = function () {

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
        });

        $('#slcSucural').on('change', function () {
            cargarCajas();
        });
    }

    function ListarSucursales(ctlg) {
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
                }

                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();
                
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function ListarCajas(ctlg,scsl,tipo) {
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
                }

                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var plugings = function () {
        $('.combo').select2();
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {
            Bloquear('ventana');
            $.ajax({
                type: "POST",
                url: "vistas/ca/ajax/camascr.ASHX?OPCION=4&codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");

                    $("#hf_opcion").val('2');
                    $("#hf_codigo").val(datos[0].CODIGO);
                    $("#slcEmpresa").val(datos[0].CTLG_CODE);
                    $("#slcEmpresa").change();
                    $("#slcSucural").val(datos[0].SCSL_CODE);
                    $("#slcSucural").change();
                    $("#hf_pidm").val(datos[0].PIDM);
                    $("#txtempleado").val(datos[0].EMPLEADO);

                    if (datos[0].ACTIVO == 'S') {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    $("#txtglosa").val(datos[0].GLOSA);
                    $("#cbomoneda").val(datos[0].MONE_CODE);
                    $("#cbomoneda").change();
                    $("#txtmonto").val(datos[0].MONTO);
                    $("#txtfecasignacion").val(datos[0].FECHA_REGISTRO);
                    $("#txtfecha").val(datos[0].FECHA_LIMITE);
                    $("#hf_centrocosto").val(datos[0].CENTRO_COSTO_CODE);
                    $("#txtcentrocosto").val(datos[0].CENTRO_COSTO);
                    $("#cboestado").val(datos[0].ESTADO);
                    $("#cboestado").change();

                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alert(msg);
                    Desbloquear('ventana');
                }
            });

            fillTxtSolicitante("#txtempleado", "");

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

        var eventoControles = function () {

            $('#slcEmpresa').on('change', function () {
                ListarSucursales($('#slcEmpresa').val());
            }

            );
        }

        var fillcboMoneda = function () {

            CrearControl('N', '1', 'cbomoneda', 'con_moneda');
        }
    }
    return {
        init: function () {
            cargaInicial();
            plugings();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            cargarCajas();
            cargarCajas1();
            fillcboMoneda();
            validacion();
            eventoControles();
        }
    };

}();
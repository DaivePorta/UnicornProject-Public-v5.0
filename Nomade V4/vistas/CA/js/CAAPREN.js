var v_total = 0.00;
var v_asignado = 0.00;
var v_devolver = 0.00;

function validarBalanceo() {
    v_total = 0.00;
    v_asignado = 0.00;
    v_devolver = 0.00;

    v_asignado = parseFloat($("#txtmonto").val());

    $(".sum").each(function () {
        var x = parseFloat($(this).val());
        v_total += x;
    });
    v_devolver = Math.round(parseFloat(v_asignado - v_total) * 100) / 100;
    $("#txt_rdevolver").val(v_devolver);
    $("#txt_rmonto").val(v_total);
    $("#txt_rasignado").val(v_asignado);
}
function Grabar() {

    var ctlg_code = $("#slcEmpresa").val();
    var scsl_code = $("#slcSucural").val();
    var asig_code = $("#txtcodcuenta").val();
    var usua_id = $("#ctl00_txtus").val();

    $(".chapr:checked").each(function () {
        var _this = $(this);
        var seq = $(_this).val();
        var monto = $("#datamonto" + seq).val();

        $.ajax({
            type: "POST",
            url: "vistas/CA/ajax/CAAPREN.ASHX?opcion=4&code=" + asig_code + "&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code + "&usua_id=" + usua_id + "&seq=" + seq + "&monto=" + monto,
            async: false,
            success: function (datos) {
                if (datos == "OK") {
                    $(_this).parent().parent().removeClass('noa');
                    $(_this).parent().parent().removeClass('sia');
                    $(_this).remove();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    });
}
var CAAPREN = function () {

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

    var plugings = function () {
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");

        $(".chapr").click(function () {
            if ($(this).is(":checked")) {
                $(this).parent().parent().addClass("sia");
                $(this).parent().parent().removeClass("noa");
            } else {
                $(this).parent().parent().addClass("noa");
                $(this).parent().parent().removeClass("sia");
            }
        });

        $('.sum').on('blur focus', function () {
            if ($(this).val().length == 0) {
                $(this).val('0');
            }
            validarBalanceo();
        });
    }

    var cargaInicial = function () {

        var cod = ObtenerQueryString("code");

        if (cod != null) {

            $.ajax({
                type: "POST",
                url: "vistas/CA/ajax/CAAPREN.ASHX?opcion=1&code=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {

                    $('#slcEmpresa').val(datos[0].CTLG_CODE);
                    $('#slcSucural').val(datos[0].SCSL_CODE);
                    $('#txtempleado').val(datos[0].EMPLEADO);
                    $('#hf_pidm').val(datos[0].PIDM);
                    $("#txtcodcuenta").val(datos[0].CODIGO);
                    $("#txtcentrocosto").val(datos[0].CENTRO_COSTO);
                    $("#txtglosa").val(datos[0].GLOSA);
                    $("#cbomoneda").val(datos[0].MONE_CODE);
                    $("#txtmonto").val(datos[0].MONTO);
                    $("#cbomoneda").attr('disabled', 'disabled');

                },
                error: function (msg) {
                    alert(msg);
                }
            });

            $.ajax({
                type: "POST",
                url: "vistas/CA/ajax/CAAPREN.ASHX?opcion=2&code=" + cod,
                contentType: null,
                async: false,
                success: function (datos) {

                    if (datos != null) {
                        $("#dataDocumentos").html(datos);
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });

            $.ajax({
                type: "POST",
                url: "vistas/CA/ajax/CAAPREN.ASHX?opcion=3&code=" + cod,
                contentType: null,
                async: false,
                success: function (datos) {

                    if (datos != null) {
                        $("#dataGastos").html(datos);
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }        
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
        });
    }

    var fillcboMoneda = function () {

        CrearControl('N', '1', 'cbomoneda', 'con_moneda');
        CrearControl('N', '1', 'devmoneda', 'dev_moneda');

    }

    var peticionTipoCambio = function () {

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=1",
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {

                if (datos[0].VENTA != '0') {
                    $("#txt_tcambio").val(datos[0].VENTA);
                    //$("#txtCompraOficial").val(datos[0].COMPRA);
                } else {
                    alertCustom('No existe tipo de cambio.');
                    $("#txt_tcambio").val('0.00');
                }

            },
            error: function (msg) {

                alert(msg);
            }
        });
    }

    return {
        init: function () {
            fillcboMoneda();
            cargaInicial();
            plugings();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            eventoControles();
            peticionTipoCambio();
            validarBalanceo();
        }
    };
}();
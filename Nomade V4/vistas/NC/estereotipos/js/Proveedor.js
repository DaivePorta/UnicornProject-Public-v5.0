
var vg_CodEmpresaProveedor = '';
var PROVEEDOR = function () {

    var plugins = function () {
        $('#proveedor #slcEmpresaprov').select2();
        $('#proveedor #slcNivelCadenaAbastecimiento').select2();
        $('#proveedor #slcCategprov').select2();
        inifechas("txtfechaiprov", "txtfechatprov");
    }

    var fillCboEmpresa = function () {
        $.ajaxSetup({ async: false });
        $.post("vistas/NC/estereotipos/ajax/Proveedor.ASHX",
            {
                flag: 3,
                usua: $("#ctl00_txtus").val()
            })
            .done(function (res) {
                $('#proveedor #slcEmpresaprov').html(res);
            })
            .fail(function () {
                alertCustom("Error al obtener lista de Empresa.");
            });
        $.ajaxSetup({ async: true });
    }

    var fillCboNivelCadenaAbastecimiento = function () {
        $.ajaxSetup({ async: false });
        $.post("vistas/NC/estereotipos/ajax/Proveedor.ASHX",
            {
                flag: 6
            })
            .done(function (res) {
                $('#proveedor #slcNivelCadenaAbastecimiento').html(res);
            })
            .fail(function () {
                alertCustom("Error al obtener lista de Nivel Cadena de Abastecimiento.");
            });
        $.ajaxSetup({ async: true });
        var tp = ObtenerQueryString('tp');
        $('#slcNivelCadenaAbastecimiento option[value=0008]').prop('disabled', (tp === 'J'));
    }

    var eventoControles = function () {
        handlerChkActivo();
        handlerCboEmpresa();
    }

    var cargainicial = function () {
        vg_CodEmpresaProveedor = '';
        $('#proveedor #txtfechatprov').removeAttr('placeholder');
        $("#proveedor #slcEmpresaprov").select2("val", $("#ctl00_hddctlg").val());
        if ($.trim($("#ctl00_hddctlg").val()) != "") {
            $("#proveedor #slcEmpresaprov").trigger('change');
        }

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboNivelCadenaAbastecimiento();
            eventoControles();
            cargainicial();
        }
    };

}();

function handlerChkActivo() {
    $('#proveedor #chkactivoprov').on('change', function () {
        offObjectEvents('proveedor #txtfechatprov');
        inifechas("txtfechaiprov", "txtfechatprov");
        if ($("#proveedor #chkactivoprov").is(':checked')) {
            $('#proveedor #txtfechatprov').attr("disabled", true);
            $('#proveedor #txtfechatprov').val('');
            $('#proveedor #txtfechatprov').removeAttr('placeholder');
        } else {
            $('#proveedor #txtfechatprov').attr("disabled", false);
            $('#proveedor #txtfechatprov').attr('placeholder', 'dd/mm/yyyy');
        }
    });
}

function handlerCboEmpresa() {
    $('#proveedor #slcEmpresaprov').on('change', function () {
        var CODE = $(this).val();
        var CODE_ANT = vg_CodEmpresaProveedor;
        if (CODE != CODE_ANT) {
            $('#proveedor #slcCategprov').select2("val", "");
            $("#txtfechaiprov").val("");
            $("#slcTipoprov").select2("val", "");
            $("#txtfechatprov").val("");
            $("#slcNivelCadenaAbastecimiento").select2("val", "");
            $("#grabarprov").html("<i class='icon-pencil'></i> Grabar Datos");
            $("#grabarprov").attr("href", "javascript:CrearProveedor();");
            fillCboCategoria(CODE);
            if ($("#hfPPBIDEN_PIDM").val() != "") {
                cargarProveedor(CODE);
            }
            vg_CodEmpresaProveedor = CODE;
        }
    });
    //         $("#slcEmpresaprov").change(function (event, empresa) {
    //             $('#txtfechatprov').attr("disabled", true);
    //             if (empresa == null) {
    //                 empresa = $('#slcEmpresaprov').val();

    //                 $("#txtfechaiprov").val("");

    //                 $("#slcTipoprov").select2("val", "");

    //                 $("#txtfechatprov").val("");

    //                $("#grabarprov").html("<i class='icon-pencil'></i> Grabar Datos");
    //              $("#grabarprov").attr("href", "javascript:CrearProveedor();");
    //             }

    //             if ($("#hfPPBIDEN_PIDM").val() != "")
    //             { cargarProveedor(empresa); }

    //         });
}

function fillCboCategoria(v_Value) {
    $.ajaxSetup({ async: false });
    $.post("vistas/NC/estereotipos/ajax/Proveedor.ASHX",
        {
            flag: 4,
            CTLG_CODE: v_Value
        })
        .done(function (res) {
            $('#proveedor #slcCategprov').html(res);
        })
        .fail(function () {
            alertCustom("Error al obtener lista de Categoría.");
        });
    //function (res) {
    //    $("#controlcatprov").html(res);
    //    //$("#slcTipoprov option[value=0]").remove();
    //    //$("#slcTipoprov").select2({
    //    //    placeholder: "CATEGORIA",
    //    //    allowclear: true

    //    //});
    //});
    $.ajaxSetup({ async: true });
}

function cargarProveedor(v_Value) {

    Bloquear("proveedor");
    $.ajax({
        type: "GET",
        url: "vistas/NC/estereotipos/ajax/Proveedor.ASHX",
        data: {
            flag: 5,
            pidm: $("#hfPPBIDEN_PIDM").val(),
            empr: v_Value
        },
        contentType: "application/json;",
        dataType: "json",
        async: true,
        success: function (datos) {
            Desbloquear("proveedor");
            if (datos != "" & datos != null) {
                $('#proveedor #slcCategprov').select2("val", datos[0].CATE_CODE);
                $('#proveedor #slcNivelCadenaAbastecimiento').select2("val", datos[0].NICA_CODE);
                $('#proveedor #txtfechaiprov').val(datos[0].FECHA_INICIO);
                $('#proveedor #txtfechatprov').val(datos[0].FECHA_TERMINO);
                $('#proveedor #txtareadescripcion').val(datos[0].DESCRIPCION);

                if (datos[0].ESTADO == "ACTIVO") {
                    $('#uniform-chkactivoprov span').removeClass().addClass("checked");
                    $('#proveedor #chkactivoprov').attr('checked', true);
                    $('#proveedor #txtfechatprov').attr("disabled", true);
                    $('#proveedor #txtfechatprov').removeAttr('placeholder');
                } else {
                    $('#uniform-chkactivoprov span').removeClass();
                    $('#proveedor #chkactivoprov').attr('checked', false);
                    $('#proveedor #txtfechatprov').attr("disabled", false);
                    $('#proveedor #txtfechatprov').attr('placeholder', 'dd/mm/yyyy');
                }

                $("#grabarprov").html("<i class='icon-pencil'></i>&nbsp;Guardar");
                $("#grabarprov").attr("href", "javascript:ActualizarProveedor();");
            }
        },
        error: function () {
            Desbloquear("proveedor");
            alertCustom("Error al obtener datos de Proveedor.");
        }
    });
    //Cargar datos resumen linea crédito
    $.ajax({
        type: "GET",
        url: "vistas/NC/estereotipos/ajax/Proveedor.ASHX",
        data: {
            flag: 7,
            pidm: $("#hfPPBIDEN_PIDM").val(),
            empr: v_Value
        },
        contentType: "application/json;",
        dataType: "json",
        async: true,
        success: function (datos) {
            var modeda = '';
            if (datos != "" & datos != null) {
                if (datos[0].MONEDA != "") {
                    if (datos[0].MONEDA == '0002') {
                        modeda = 'S/. ';
                    } else {
                        modeda = 'US$. ';
                    }
                }
                $("#txtocupadoprov").val(modeda + formatoMiles(datos[0].USADO));
                $("#txtdisponibleprov").val(modeda + formatoMiles(datos[0].ACTUAL));
                $("#txtvencidoprov").val(modeda + formatoMiles(datos[0].MONTO_VENCIDO));
                $("#txttiempoatrasprov").html(datos[0].TIEMPO_VENCIDO);
                $("#txtestadodelineaprov").html("");
            }
        },
        error: function () {
            alertCustom("Error al obtener datos de Proveedor.");
        }
    });

    //Cargar datos resumen compras
    $.ajax({
        type: "GET",
        url: "vistas/NC/estereotipos/ajax/Proveedor.ASHX",
        data: {
            flag: 8,
            pidm: $("#hfPPBIDEN_PIDM").val(),
            empr: v_Value
        },
        contentType: "application/json;",
        dataType: "json",
        async: true,
        success: function (datos) {
            var modeda = '';
            if (datos != "" & datos != null) {
                if (datos[0].MONEDA != "") {
                    if (datos[0].MONEDA == '0002') {
                        modeda = 'S/. ';
                    } else {
                        modeda = 'US$. ';
                    }
                }
                    $("#txtcompramesanteriorprov").val(modeda +formatoMiles(datos[0].COMPRAS_MES_ANTERIOR));
                    $("#txtcompraanhoanteriorprov").val(modeda + formatoMiles(datos[0].COMPRAS_ANIO_ANTERIOR));
                    $("#txtcompramensualpromprov").val(modeda + formatoMiles(datos[0].COMPRAS_PROM_MENSUAL));
                    $("#txtcompraacumuladaprov").val(modeda + formatoMiles(datos[0].COMPRAS_ACUMULADO));
            }
        },
        error: function () {
            alertCustom("Error al obtener datos de Proveedor.");
        }
    });

}

function CrearProveedor() {

    var Errors = true;

    var p_acti = $('#proveedor #chkactivoprov').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cate = $('#proveedor #slcCategprov').val();
    var p_fect = $('#proveedor #txtfechatprov').val();
    var p_feci = $('#proveedor #txtfechaiprov').val();
    var p_empr = $('#proveedor #slcEmpresaprov').val();
    var p_nivelcadena = $('#proveedor #slcNivelCadenaAbastecimiento').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_desc = $('#proveedor #txtareadescripcion').val();

    Errors = validarProveedor();

    if (Errors) {

        Bloquear("proveedor");
        $.post("vistas/NC/estereotipos/ajax/Proveedor.ASHX",
            {
                flag: 1,
                pidm: p_pidm,
                cate: p_cate,
                feci: p_feci,
                user: p_user,
                acti: p_acti,
                fect: p_fect,
                empr: p_empr,
                nivelcadena: p_nivelcadena,
                desc: p_desc
            })
            .done(function (res) {
                Desbloquear("proveedor");
                exito();
                $("#grabarprov").html("<i class='icon-pencil'></i>&nbsp;Guardar");
                $("#grabarprov").attr("href", "javascript:ActualizarProveedor();");
            })
            .fail(function () {
                Desbloquear("proveedor");
                noexito();
            });
    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
}

function ActualizarProveedor() {
    var p_acti = $('#proveedor #chkactivoprov').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cate = $('#proveedor #slcCategprov').val();
    var p_fect = $('#proveedor #txtfechatprov').val();
    var p_feci = $('#proveedor #txtfechaiprov').val();
    var p_empr = $('#proveedor #slcEmpresaprov').val();
    var p_nivelcadena = $('#proveedor #slcNivelCadenaAbastecimiento').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_desc = $('#proveedor #txtareadescripcion').val();

    Errors = validarProveedor();

    if (Errors) {

        Bloquear("proveedor");
        $.post("vistas/NC/estereotipos/ajax/Proveedor.ASHX", {
            flag: 2,
            pidm: p_pidm,
            cate: p_cate,
            feci: p_feci,
            user: p_user,
            acti: p_acti,
            fect: p_fect,
            empr: p_empr,
            nivelcadena: p_nivelcadena,
            desc: p_desc,
        })
            .done(function (res) {
                Desbloquear("proveedor");
                exito();
                $("#grabarprov").html("<i class='icon-pencil'></i>&nbsp;Guardar");
                $("#grabarprov").attr("href", "javascript:ActualizarProveedor();");
            })
            .fail(function () {
                Desbloquear("proveedor");
                noexito();
            });
    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
}

function validarProveedor() {
    var v_Errors = true;
    if (vErrorsNotMessage(["proveedor #slcEmpresaprov", "proveedor #slcNivelCadenaAbastecimiento", "proveedor #slcCategprov", "proveedor #txtfechaiprov"]) == false) {
        v_Errors = false;
    }

    if (!$('#proveedor #chkactivoprov').is(':checked')) {
        if (vErrorsNotMessage(["proveedor #txtfechatprov"]) == false) {
            v_Errors = false;
        }
    }
    return v_Errors;
}


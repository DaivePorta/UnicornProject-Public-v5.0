var NCLNIPL = function () {

    var fillBandejaEPlanContable = function () {


        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjEPlanContable').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                { data: "NCTLG_CODE" },
                {
                    data: "NTIPL_CODE_CORTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                { data: "NOMBRE_PLAN" },
                {
                    data: "NIVELES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_INICIO.display", sort: "FECHA_INICIO.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_FIN.display", sort: "FECHA_FIN.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, ]
        }

        oTableEPlanContable = iniciaTabla('tblEPlanContable', parms);
        $('#tblEPlanContable').removeAttr('style');

        $("#controlEmp").each(function () {
            var select = $('<select id="cboEmpresa" class="span12" style="margin-bottom: 0px;"><option></option><option value=" ">Todas</option></select>')
                .appendTo($(this).empty())
                .on('change', function () {
                    $('#tblEPlanContable').DataTable().column(1)
                        .search($(this).val())
                        .draw();
                });

            $('#tblEPlanContable').DataTable().column(1).data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            $("#cboEmpresa").select2({
                placeholder: "EMPRESA",
                allowclear: true
            });
        });

        $('#cboEmpresa').val(' ');

        $('#tblEPlanContable tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableEPlanContable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableEPlanContable.fnGetPosition(this);
                var row = oTableEPlanContable.fnGetData(pos);
                var codigo = row.CODE;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmnipl&codigo=' + codigo;
            }

        });
    }
    return {
        init: function () {

            fillBandejaEPlanContable();
        }
    };

}();
var NCMNIPL = function () {

    var plugins = function () {

        $('#cboNiveles').select2();
        $('#cboEmpresa').select2();
        $('#cboTipoPlanCuenta').select2();
        $('#cboNivel1').select2();
        $('#cboNivel2').select2();
        $('#cboNivel3').select2();
        $('#cboNivel4').select2();
        $('#cboNivel5').select2();
        $('#cboNivel6').select2();
        $('#cboNivel7').select2();
        $('#cboNivel8').select2();

        $("#txtNombrePlanCuentas").focus(function () { $(this).inputmask({ "mask": "D", "repeat": 50, "greedy": false }); })

        inifechas("txtFechaInicio", "txtFechaTermino");

        $('#chkEstado').on('change', function () {
            offValidationError('txtFechaTermino');
            $('#txtFechaTermino').val('');
            if ($("#chkEstado").is(':checked')) {
                $('#txtFechaTermino').attr('disabled', true);
                $('#txtFechaTermino').removeAttr('placeholder');
            } else {
                $('#txtFechaTermino').attr('disabled', false);
                $('#txtFechaTermino').attr('placeholder', 'dd/mm/yyyy');
            }
        });
    }

    var fillCboEmpresa = function () {
        var selectEmpresa = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=" + $("#ctl00_txtus").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEmpresa.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectEmpresa.append('<option></option>');
                        }
                        selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                else {
                    selectEmpresa.append('<option></option>');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillCboTipoPlanCuenta = function () {
        var selectTipoPlanCuenta = $('#cboTipoPlanCuenta');
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmnipl.ashx?opcion=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectTipoPlanCuenta.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectTipoPlanCuenta.append('<option></option>');
                        }
                        selectTipoPlanCuenta.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                } else {
                    selectTipoPlanCuenta.append('<option></option>');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboNiveles = function () {
        var selectNiveles = $('#cboNiveles');
        selectNiveles.empty();
        for (var i = 2; i <= 8; i++) {
            if (i == 2) {
                selectNiveles.append('<option></option>');
            }
            selectNiveles.append('<option value="' + i + '">' + i + '</option>');
        }

        var selectNivel;
        for (var i = 1; i <= 8; i++) {
            selectNivel = $('#cboNivel' + i);
            selectNivel.empty();
            for (var j = 1; j <= 5; j++) {
                if (j == 1) {
                    selectNivel.append('<option></option>');
                }
                selectNivel.append('<option value="' + j + '">' + j + '</option>');
            }
        }

        $('#cboNiveles').on('change', function () {
            HandlerCboNiveles(this.value);
        });
    }

    var cargaInicial = function () {


        $('#txtFechaTermino').removeAttr('placeholder');

        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) === "undefined") {

            $("#cboNiveles").select2('val', '2');
            HandlerCboNiveles($("#cboNiveles").val());

        }
        else {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Modificar();");
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmnipl.ashx?opcion=2&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    var countNivel = 1;
                    $("#txtcodigo").val(datos[0].CODE);
                    $("#cboEmpresa").select2('val', datos[0].CTLG_CODE);
                    $("#cboTipoPlanCuenta").select2('val', datos[0].TIPL_CODE);

                    if (datos[0].ESTADO_IND == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                        $('#txtFechaTermino').attr('disabled', true);
                        $('#txtFechaTermino').removeAttr('placeholder');
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                        $('#txtFechaTermino').attr('disabled', false);
                        $('#txtFechaTermino').attr('placeholder', 'dd/mm/yyyy');
                    }
                    $('#txtNombrePlanCuentas').val(datos[0].NOMBRE_PLAN);
                    $('#txtFechaInicio').datepicker("setDate", datos[0].FECHA_INICIO);
                    $('#txtFechaTermino').datepicker("setDate", datos[0].FECHA_FIN);

                    $("#cboNiveles").empty();
                    $("#cboNiveles").append('<option></option>');
                    for (var i = parseInt(datos[0].NIVELES) ; i <= 8; i++) {
                        $("#cboNiveles").append('<option value="' + i + '">' + i + '</option>');
                    }

                    //$("#cboNiveles").select2('val', datos[0].NIVELES);
                    $('#cboNiveles').val(datos[0].NIVELES);
                    $('#cboNiveles').select2();

                    var valueIntegerCboNivel = parseInt(datos[0].NIVELES);

                    for (var i = 2; i <= 8; i++) {
                        if (i <= valueIntegerCboNivel)
                            $('#cboNivel' + i.toString()).attr('disabled', false);
                        else {
                            $('#cboNivel' + i.toString()).attr('disabled', true);
                            $('#s2id_cboNivel' + i.toString() + ' a .select2-chosen').html('');
                        }
                    }

                    $('#cboNivel1').attr('disabled', true);

                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("1", datos[0].NIVEL1);
                        countNivel++;
                    }
                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("2", datos[0].NIVEL2);
                        countNivel++;
                    }
                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("3", datos[0].NIVEL3);
                        countNivel++;
                    }
                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("4", datos[0].NIVEL4);
                        countNivel++;
                    }
                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("5", datos[0].NIVEL5);
                        countNivel++;
                    }
                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("6", datos[0].NIVEL6);
                        countNivel++;
                    }
                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("7", datos[0].NIVEL7);
                        countNivel++;
                    }
                    if (countNivel <= valueIntegerCboNivel) {
                        generarOptionsNiveles("8", datos[0].NIVEL8);
                        countNivel++;
                    }

                    GenerarFormatoNiveles();
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

    }

    return {
        init: function () {
            fillCboEmpresa();
            fillCboTipoPlanCuenta();
            fillCboNiveles();
            plugins();
            cargaInicial();


        }
    };

}();

/*function generarOptionsNiveles(v_NIVEL_ID, v_NIVEL) {
    $("#cboNivel" + v_NIVEL_ID).empty();
    $("#cboNivel" + v_NIVEL_ID).append('<option></option>');
    for (var i = parseInt(v_NIVEL) ; i <= 5; i++) {
        $("#cboNivel" + v_NIVEL_ID).append('<option value="' + i + '">' + i + '</option>');
    }
    $("#cboNivel" + v_NIVEL_ID).select2('val', v_NIVEL);
}*/

function generarOptionsNiveles(v_NIVEL_ID, v_NIVEL) {
    $("#cboNivel" + v_NIVEL_ID).empty();
    $("#cboNivel" + v_NIVEL_ID).append('<option></option>');
    for (var i = 1 ; i <= 5; i++) {
        $("#cboNivel" + v_NIVEL_ID).append('<option value="' + i + '">' + i + '</option>');
    }
    $("#cboNivel" + v_NIVEL_ID).select2('val', v_NIVEL);
}

function HandlerCboNiveles(v_Niveles) {
    var valueCboNivel = v_Niveles;
    var valueIntegerCboNivel = parseInt(v_Niveles);

    var selectNivel;
    for (var i = 8; i > valueIntegerCboNivel; i--) {
        $('#cboNivel' + i.toString()).select2('val', '');
    }

    $('#cboNivel1').select2('val', '2');
    $('#cboNivel1').attr('disabled', true);

    if ($('#cboNivel2').val() == "") {
        $('#cboNivel2').select2('val', '1');
    }

    $('#cboNivel2').attr('disabled', false);

    for (var i = 3; i <= 8; i++) {
        offValidationError('cboNivel' + i.toString());
        if (i <= valueIntegerCboNivel) {
            $('#cboNivel' + i.toString()).attr('disabled', false);
            if ($('#cboNivel' + i.toString()).val() == '') {
                $('#cboNivel' + i.toString()).select2('val', '');
            }
        }
        else {
            $('#cboNivel' + i.toString()).attr('disabled', true);
            $('#s2id_cboNivel' + i.toString() + ' a .select2-chosen').html('');
        }

    }

    GenerarFormatoNiveles();
}

function GenerarFormatoNiveles() {
    var cantidadNiveles = parseInt($('#cboNiveles').val());
    var cadenaFormatoNiveles = '';
    var myArray = [];
    var newI = 0;
    var numeroActual = 1;

    for (var i = 0; i < cantidadNiveles; i++) {
        newI = i + 1;
        myArray[i] = $('#cboNivel' + newI.toString()).val();
    }

    for (var i = 0; i < cantidadNiveles; i++) {
        newI = 1;
        if (myArray[i] == "") {
            cadenaFormatoNiveles += "";
        }
        else {
            do {
                cadenaFormatoNiveles += numeroActual.toString();
                numeroActual++;
                if (numeroActual == 10) {
                    numeroActual = 0;
                }
                newI++;
            } while (newI <= parseInt(myArray[i]));
            cadenaFormatoNiveles += "-";
        }
    }
    if (cadenaFormatoNiveles.length > 0) {
        cadenaFormatoNiveles = cadenaFormatoNiveles.substr(0, cadenaFormatoNiveles.length - 1);
        cadenaFormatoNiveles = $.trim(cadenaFormatoNiveles);
        $('#GeneradorHtml').html(cadenaFormatoNiveles);
    }
}

function Grabar() {

    var Errors = true;

    Errors = validarEstructuraPlanContable();

    if (Errors) {

        var CTLG_CODE = '';
        var TIPL_CODE = '';
        var NOMBRE_PLAN = '';
        var NIVELES = '';
        var NIVEL1 = '';
        var NIVEL2 = '';
        var NIVEL3 = '';
        var NIVEL4 = '';
        var NIVEL5 = '';
        var NIVEL6 = '';
        var NIVEL7 = '';
        var NIVEL8 = '';
        var ESTADO_IND = '';
        var FECHA_INICIO = '';
        var FECHA_FIN = '';
        var USUA_ID = '';

        CTLG_CODE = $('#cboEmpresa').val();
        TIPL_CODE = $('#cboTipoPlanCuenta').val();
        NOMBRE_PLAN = $.trim($('#txtNombrePlanCuentas').val());
        NIVELES = $('#cboNiveles').val();
        NIVEL1 = $('#cboNivel1').val();
        NIVEL2 = $('#cboNivel2').val();
        NIVEL3 = $('#cboNivel3').val();
        NIVEL4 = $('#cboNivel4').val();
        NIVEL5 = $('#cboNivel5').val();
        NIVEL6 = $('#cboNivel6').val();
        NIVEL7 = $('#cboNivel7').val();
        NIVEL8 = $('#cboNivel8').val();
        ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
        FECHA_INICIO = $('#txtFechaInicio').val();
        FECHA_FIN = $('#txtFechaTermino').val();
        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

        if (NIVELES == "") NIVELES = "0";
        if (NIVEL1 == "") NIVEL1 = "0";
        if (NIVEL2 == "") NIVEL2 = "0";
        if (NIVEL3 == "") NIVEL3 = "0";
        if (NIVEL4 == "") NIVEL4 = "0";
        if (NIVEL5 == "") NIVEL5 = "0";
        if (NIVEL6 == "") NIVEL6 = "0";
        if (NIVEL7 == "") NIVEL7 = "0";
        if (NIVEL8 == "") NIVEL8 = "0";


        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMNIPL.ASHX?OPCION=N&CTLG_CODE=" + CTLG_CODE + "&TIPL_CODE=" + TIPL_CODE + "&NOMBRE_PLAN=" + NOMBRE_PLAN +
                 "&NIVELES=" + NIVELES + "&NIVEL1=" + NIVEL1 + "&NIVEL2=" + NIVEL2 + "&NIVEL3=" + NIVEL3 + "&NIVEL4=" + NIVEL4 + "&NIVEL5=" + NIVEL5 +
                 "&NIVEL6=" + NIVEL6 + "&NIVEL7=" + NIVEL7 + "&NIVEL8=" + NIVEL8 + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].CODIGO == "EXIS") {
                            alertCustom("Ya existe Estructura de Plan Contable para esa Empresa.");
                        }
                        else {

                            var v_CountNivel = 1;
                            var v_Nivel = parseInt(NIVELES);

                            $('#txtcodigo').val(datos[0].CODIGO);

                            $("#cboNiveles").empty();
                            $("#cboNiveles").append('<option></option>');
                            for (var i = v_Nivel; i <= 8; i++) {
                                $("#cboNiveles").append('<option value="' + i + '">' + i + '</option>');
                            }

                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("1", NIVEL1);
                                v_CountNivel++;
                            }
                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("2", NIVEL2);
                                v_CountNivel++;
                            }
                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("3", NIVEL3);
                                v_CountNivel++;
                            }
                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("4", NIVEL4);
                                v_CountNivel++;
                            }
                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("5", NIVEL5);
                                v_CountNivel++;
                            }
                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("6", NIVEL6);
                                v_CountNivel++;
                            }
                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("7", NIVEL7);
                                v_CountNivel++;
                            }
                            if (v_CountNivel <= v_Nivel) {
                                generarOptionsNiveles("8", NIVEL8);
                                v_CountNivel++;
                            }

                            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabar").attr("href", "javascript:Modificar();");


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
    }
}

function Modificar() {

    var Errors = true;

    Errors = validarEstructuraPlanContable();

    if (Errors) {

        var CODE = '';
        var CTLG_CODE = '';
        var TIPL_CODE = '';
        var NOMBRE_PLAN = '';
        var NIVELES = '';
        var NIVEL1 = '';
        var NIVEL2 = '';
        var NIVEL3 = '';
        var NIVEL4 = '';
        var NIVEL5 = '';
        var NIVEL6 = '';
        var NIVEL7 = '';
        var NIVEL8 = '';
        var ESTADO_IND = '';
        var FECHA_INICIO = '';
        var FECHA_FIN = '';
        var USUA_ID = '';


        CODE = $('#txtcodigo').val();
        CTLG_CODE = $('#cboEmpresa').val();
        TIPL_CODE = $('#cboTipoPlanCuenta').val();
        NOMBRE_PLAN = $.trim($('#txtNombrePlanCuentas').val());
        NIVELES = $('#cboNiveles').val();
        NIVEL1 = $('#cboNivel1').val();
        NIVEL2 = $('#cboNivel2').val();
        NIVEL3 = $('#cboNivel3').val();
        NIVEL4 = $('#cboNivel4').val();
        NIVEL5 = $('#cboNivel5').val();
        NIVEL6 = $('#cboNivel6').val();
        NIVEL7 = $('#cboNivel7').val();
        NIVEL8 = $('#cboNivel8').val();
        ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
        FECHA_INICIO = $('#txtFechaInicio').val();
        FECHA_FIN = $('#txtFechaTermino').val();
        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

        if (NIVELES == "") NIVELES = "0";
        if (NIVEL1 == "") NIVEL1 = "0";
        if (NIVEL2 == "") NIVEL2 = "0";
        if (NIVEL3 == "") NIVEL3 = "0";
        if (NIVEL4 == "") NIVEL4 = "0";
        if (NIVEL5 == "") NIVEL5 = "0";
        if (NIVEL6 == "") NIVEL6 = "0";
        if (NIVEL7 == "") NIVEL7 = "0";
        if (NIVEL8 == "") NIVEL8 = "0";


        if (Errors) {
            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMNIPL.ASHX?OPCION=M&CODE=" + CODE + "&CTLG_CODE=" + CTLG_CODE + "&TIPL_CODE=" + TIPL_CODE + "&NOMBRE_PLAN=" + NOMBRE_PLAN +
                     "&NIVELES=" + NIVELES + "&NIVEL1=" + NIVEL1 + "&NIVEL2=" + NIVEL2 + "&NIVEL3=" + NIVEL3 + "&NIVEL4=" + NIVEL4 + "&NIVEL5=" + NIVEL5 +
                     "&NIVEL6=" + NIVEL6 + "&NIVEL7=" + NIVEL7 + "&NIVEL8=" + NIVEL8 + "&ESTADO_IND=" + ESTADO_IND + "&FECHA_INICIO=" + FECHA_INICIO + "&FECHA_FIN=" + FECHA_FIN + "&USUA_ID=" + USUA_ID,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos != null) {
                        if (datos[0].SUCCESS == "OK") {
                            if (datos[0].CODIGO == "EXIS") {
                                alertCustom("Ya existe Estructura de Plan Contable para esa Empresa.");
                            }
                            else {

                                var v_CountNivel = 1;
                                var v_Nivel = parseInt(NIVELES);

                                $('#txtcodigo').val(datos[0].CODIGO);

                                $("#cboNiveles").empty();
                                $("#cboNiveles").append('<option></option>');
                                for (var i = v_Nivel; i <= 8; i++) {
                                    $("#cboNiveles").append('<option value="' + i + '">' + i + '</option>');
                                }

                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("1", NIVEL1);
                                    v_CountNivel++;
                                }
                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("2", NIVEL2);
                                    v_CountNivel++;
                                }
                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("3", NIVEL3);
                                    v_CountNivel++;
                                }
                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("4", NIVEL4);
                                    v_CountNivel++;
                                }
                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("5", NIVEL5);
                                    v_CountNivel++;
                                }
                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("6", NIVEL6);
                                    v_CountNivel++;
                                }
                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("7", NIVEL7);
                                    v_CountNivel++;
                                }
                                if (v_CountNivel <= v_Nivel) {
                                    generarOptionsNiveles("8", NIVEL8);
                                    v_CountNivel++;
                                }

                                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                                $("#grabar").attr("href", "javascript:Modificar();");
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
        }
    }
}

function validarEstructuraPlanContable() {
    var v_Errors = true;

    if (!vErrorsNotMessage(["cboNiveles"])) {
        v_Errors = false;
    }

    if (!vErrorsNotMessage(["cboEmpresa"])) {
        v_Errors = false;
    }

    if ($("#cboNiveles").val() != "") {
        for (var i = 1; i <= parseInt($("#cboNiveles").val()) ; i++) {
            if (!vErrorsNotMessage(["cboNivel" + i.toString()])) {
                v_Errors = false;
            }
        }
    }

    if (!vErrorsNotMessage(["cboTipoPlanCuenta"])) {
        v_Errors = false;
    }

    if (!vErrorsNotMessage(["txtNombrePlanCuentas"])) {
        v_Errors = false;
    }

    if (!vErrorsNotMessage(["txtFechaInicio"])) {
        v_Errors = false;
    }

    if (!$("#chkEstado").is(':checked')) {
        if (!vErrorsNotMessage(["txtFechaTermino"])) {
            v_Errors = false;
        }
    }

    if (!v_Errors) {
        alertCustom("La operación <b>NO</b> se realizó.<br/> Ingrese los campos obligatorios!");
    }

    //valida el tipo de plan no se repita


    return v_Errors;
}


//function fValidaDuplicidadPC()
//{

//    $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmnipl.ashx?opcion=3",
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (datos) {
//            selectTipoPlanCuenta.empty();
//            if (datos != null) {
//                if (datos[0].NRO != 1)
//                { alertCustom("Ese plan ya se registró para esa empresa, por favor Editelo"); }


//            } else {
//                selectTipoPlanCuenta.append('<option></option>');
//            }
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });

//}

function ObtenerQueryString(param) {
    var urlpagina = window.location.search.substring(1);
    var variables = urlpagina.split('&');
    for (var i = 0; i < variables.length; i++) {
        var nombrparam = variables[i].split('=');
        if (nombrparam[0] == param) {
            return nombrparam[1]; //valor

        }
    }
}

function offValidationError(v_Id) {
    $('#' + v_Id).parent().parent().removeAttr('class');
    $('#' + v_Id).off("change");
    $('#' + v_Id).off('paste');
    $('#' + v_Id).off('keyup');
    $('#' + v_Id).parent().children('span').remove();
}
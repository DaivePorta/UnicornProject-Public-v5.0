var NCLUBIG = function () {

    var fillcboPais = function () {

        fillCboMPais('cboPais');

    }

    var eventoControles = function () {

        $('#cboPais').change(function () {

            var CODE = $(this).val();
            var CODE_ANT = $('#hfUbigeo').val();

            if (CODE != CODE_ANT) {
                Bloquear("ventana");
                $.ajax({
                    type: "POST",
                    url: "vistas/nc/ajax/ncmubig.ashx?OPCION=6&code_pais=" + CODE,
                    success: function (datos) {
                        Desbloquear("ventana");
                        if (datos != null) {
                            if (datos == "No se encontraron datos!!!") {
                                var output = '';
                                output += "<table id='tblUbigeo' cellspacing='0' class='display'>";
                                output += "<thead>";
                                output += "<tr>";
                                output += "<td align='center'>UBIGEO</td>"
                                output += "<td align='center'>DEPARTAMENTO</td>"
                                output += "<td align='center'>UBIGEO</td>"
                                output += "<td align='center'>PROVINCIA</td>"
                                output += "<td align='center'>UBIGEO</td>"
                                output += "<td align='center'>DISTRITO</td>"
                                output += "</tr>"
                                output += "</thead>"
                                output += "<tbody>"
                                output += "</tbody>"
                                output += "</table>"

                                $('#divBandejaUbigeo').html(output);
                                oTableNew = $('#tblUbigeo').dataTable({
                                    "aLengthMenu": [
                                                             [5, 15, 20, -1],
                                                             [5, 15, 20, "Todo"]
                                    ],
                                    "iDisplayLength": 15,
                                    "paging": true,
                                    "ordering": true,
                                    "oLanguage": {
                                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                                        "sZeroRecords": "No hay datos disponibles en la tabla."
                                    }
                                });
                            }
                            else {
                                ClearTables('');
                                $('#divBandejaUbigeo').html(datos);

                                oTableUbigeo = $('#tblUbigeo').dataTable({
                                    "aLengthMenu": [
                                                                              [5, 15, 20, -1],
                                                                              [5, 15, 20, "Todo"] // change per page values here
                                    ],
                                    "iDisplayLength": 15,
                                    "paging": true,
                                    "ordering": true,
                                    "oLanguage": {
                                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                                        "sZeroRecords": "No hay datos disponibles en la tabla."
                                    }
                                });

                                $('#tblUbigeo tbody').on('click', 'tr', function () {
                                    if ($(this).hasClass('selected')) {
                                        $(this).removeClass('selected');
                                    }
                                    else {
                                        oTableUbigeo.$('tr.selected').removeClass('selected');
                                        $(this).addClass('selected');
                                        //var code = $(this).attr('id');
                                        //window.location.href = '?f=ncmnipl&codigo=' + code;
                                    }
                                });

                            }
                        }
                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        alert(msg);
                    }
                });

                $('#hfUbigeo').val(CODE);
            }
        });
    }

    return {
        init: function () {
            fillcboPais();
            eventoControles();
        }
    };

}();

var NCMUBIG = function () {

    var plugins = function () {

        fillCboMPais('cboMPais');

        $('#cboMPais').change(function () {
            var ddl_value = $(this).val();
            getCodigoUbigeoPais(ddl_value);
        });

        styleDiv('display:none', 'display:none', 'display:none');

        disabledBotonesDpt(true, true, true, true);
        styleBotonesDpt('display:none', 'display:none', 'display:none', 'display:none');

        disabledBotonesPrv(true, true, true, true);
        styleBotonesPrv('display:none', 'display:none', 'display:none', 'display:none');

        disabledBotonesDis(true, true, true, true);
        styleBotonesDis('display:none', 'display:none', 'display:none', 'display:none');

        $('#txtCodigoSunatModal').on('focus', function () {
            $('#txtCodigoSunatModal').inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        });

        $('#txtDescripcionModal').on('focus', function () {
            $('#txtDescripcionModal').inputmask({ "mask": "%", "repeat": 150, "greedy": false });
        });

    }

    return {
        init: function () {
            plugins();
        }
    };

}();

function styleDiv(strDivDpt, strDivPrv, strDivDis) {
    $('#divDpt').attr('style', strDivDpt);
    $('#divPrv').attr('style', strDivPrv);
    $('#divDis').attr('style', strDivDis);
}

function disabledBotonesDpt(boolAddDpt, boolRefDpt, boolEditDpt, boolDelDpt) {
    $('#aAddDpt').attr('disabled', boolAddDpt);
    $('#aRefDpt').attr('disabled', boolRefDpt);
    $('#aEditDpt').attr('disabled', boolEditDpt);
    $('#aDelDpt').attr('disabled', boolDelDpt);

    if (boolAddDpt == false) $('#aAddDpt').attr('href', 'javascript:ShowModalNewDpt();');
    else $('#aAddDpt').attr('href', 'javascript:;');

    if (boolRefDpt == false) $('#aRefDpt').attr('href', 'javascript:RefreshDpt();');
    else $('#aRefDpt').attr('href', 'javascript:;');

    if (boolEditDpt == false) $('#aEditDpt').attr('href', 'javascript:ShowModalEditDpt();');
    else $('#aEditDpt').attr('href', 'javascript:;');

    if (boolDelDpt == false) $('#aDelDpt').attr('href', 'javascript:Delete(1);');
    else $('#aDelDpt').attr('href', 'javascript:;');
}

function disabledBotonesPrv(boolAddPrv, boolRefPrv, boolEditPrv, boolDelPrv) {
    $('#aAddPrv').attr('disabled', boolAddPrv);
    $('#aRefPrv').attr('disabled', boolRefPrv);
    $('#aEditPrv').attr('disabled', boolEditPrv);
    $('#aDelPrv').attr('disabled', boolDelPrv);

    if (boolAddPrv == false) $('#aAddPrv').attr('href', 'javascript:ShowModalNewPrv();');
    else $('#aAddPrv').attr('href', 'javascript:;');

    if (boolRefPrv == false) $('#aRefPrv').attr('href', 'javascript:RefreshPrv();');
    else $('#aRefPrv').attr('href', 'javascript:;');

    if (boolEditPrv == false) $('#aEditPrv').attr('href', 'javascript:ShowModalEditPrv();');
    else $('#aEditPrv').attr('href', 'javascript:;');

    if (boolDelPrv == false) $('#aDelPrv').attr('href', 'javascript:Delete(2);');
    else $('#aDelPrv').attr('href', 'javascript:;');
}

function disabledBotonesDis(boolAddDis, boolRefDis, boolEditDis, boolDelDis) {
    $('#aAddDis').attr('disabled', boolAddDis);
    $('#aRefDis').attr('disabled', boolRefDis);
    $('#aEditDis').attr('disabled', boolEditDis);
    $('#aDelDis').attr('disabled', boolDelDis);

    if (boolAddDis == false) $('#aAddDis').attr('href', 'javascript:ShowModalNewDis();');
    else $('#aAddDis').attr('href', 'javascript:;');

    if (boolRefDis == false) $('#aRefDis').attr('href', 'javascript:RefreshDis();');
    else $('#aRefDis').attr('href', 'javascript:;');

    if (boolEditDis == false) $('#aEditDis').attr('href', 'javascript:ShowModalEditDis();');
    else $('#aEditDis').attr('href', 'javascript:;');

    if (boolDelDis == false) $('#aDelDis').attr('href', 'javascript:Delete(3);');
    else $('#aDelDis').attr('href', 'javascript:;');
}

function styleBotonesDpt(strAddDpt, strRefDpt, strEditDpt, strDelDpt) {
    $('#aAddDpt').attr('style', strAddDpt);
    $('#aRefDpt').attr('style', strRefDpt);
    $('#aEditDpt').attr('style', strEditDpt);
    $('#aDelDpt').attr('style', strDelDpt);
}

function styleBotonesPrv(strAddPrv, strRefPrv, strEditPrv, strDelPrv) {
    $('#aAddPrv').attr('style', strAddPrv);
    $('#aRefPrv').attr('style', strRefPrv);
    $('#aEditPrv').attr('style', strEditPrv);
    $('#aDelPrv').attr('style', strDelPrv);
}

function styleBotonesDis(strAddDis, strRefDis, strEditDis, strDelDis) {
    $('#aAddDis').attr('style', strAddDis);
    $('#aRefDis').attr('style', strRefDis);
    $('#aEditDis').attr('style', strEditDis);
    $('#aDelDis').attr('style', strDelDis);
}

function fillCboMPais(v_Id) {
    var selectPais = $('#' + v_Id);
    $('#' + v_Id).select2();

    var ArrayJson = [];
    var obj = '';

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmubig.ashx?opcion=5",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectPais.empty();
            if (datos != null) {

                obj += '[';

                for (var i = 0; i < datos.length; i++) {
                    if (i == 0) {
                        selectPais.append('<option></option>');
                    }
                    selectPais.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    obj += '{';
                    obj += '"CODIGO":"' + datos[i].CODIGO + '",';
                    obj += '"CODIGO_SUNAT":"' + datos[i].CODIGO_SUNAT + '"';
                    obj += '},';
                }

                obj += '{}';
                obj = obj.replace(',{}', '');
                obj += ']';
                $('#hfJsonPais').val(obj);

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getCodigoUbigeoPais(value) {

    var JsonPais = $('#hfJsonPais').val();
    var ArrayJsonPais = JSON.parse(JsonPais);

    $('#txtcode').val('');

    for (var j = 0; j < ArrayJsonPais.length; j++) {
        if (value == ArrayJsonPais[j].CODIGO) {
            $('#txtcode').val(ArrayJsonPais[j].CODIGO_SUNAT);
            break;
        }
    }
}

function Listar() {
    var varPais = $('#cboMPais').val();

    if (varPais != "") {
        $('#cboMPais').attr('disabled', true);
        $('#aListar').attr('disabled', true);
        $('#aListar').attr('href', 'javascript:;');
        ListarDpt(varPais);
    }
}

function Limpiar() {

    $('#txtcode').val('');

    $('#cboMPais').attr('disabled', false);


    $('#aListar').attr('disabled', false);
    //$('#s2id_cboMPais a').removeClass();
    //$('#s2id_cboMPais a').addClass('select2-choice select2-default');
    //$('#s2id_cboMPais a .select2-chosen').html('');
    $('#aListar').attr('href', 'javascript:Listar();');

    fillCboMPais('cboMPais');

    $('#cboMPais').select2('val', '');

    styleDiv('display:none', 'display:none', 'display:none');

    ClearTables('DEPARTAMENTO');

    ClearTables('PROVINCIA');

    ClearTables('DISTRITO');

    disabledBotonesDpt(true, true, true, true);
    styleBotonesDpt('display:none', 'display:none', 'display:none', 'display:none');

    disabledBotonesPrv(true, true, true, true);
    styleBotonesPrv('display:none', 'display:none', 'display:none', 'display:none');

    disabledBotonesDis(true, true, true, true);
    styleBotonesDis('display:none', 'display:none', 'display:none', 'display:none');

}

function ListarDpt(idPais) {

    styleDiv('display', 'display', 'display');

    disabledBotonesDpt(false, false, true, true);
    styleBotonesDpt('display', 'display', 'display:none', 'display:none');

    disabledBotonesPrv(true, true, true, true);
    styleBotonesPrv('display:none', 'display:none', 'display:none', 'display:none');

    disabledBotonesDis(true, true, true, true);
    styleBotonesDis('display:none', 'display:none', 'display:none', 'display:none');

    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMUBIG.ASHX?code_pais=" + idPais + "&NIVEL=1&opcion=2",
        success: function (datos) {
            if (datos == "No se encontraron datos!!!") {
                InitConfiguration('DEPARTAMENTO', 'Dpt');
                InitConfiguration('PROVINCIA', 'Prv');
                InitConfiguration('DISTRITO', 'Dis');
            }
            else {

                ClearTables('DEPARTAMENTO');
                ClearTables('PROVINCIA');
                ClearTables('DISTRITO');

                $('#divDpt').html(datos);

                oTableDpt = $('#tblUbigDEPARTAMENTO').dataTable({
                    "scrollY": "300px",
                    "pageLength": false,
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "dom": '<"toolbar">frtip'
                });

                InitConfiguration('PROVINCIA', 'Prv');
                InitConfiguration('DISTRITO', 'Dis');

                $('#tblUbigDEPARTAMENTO tbody').on('click', 'tr', function () {

                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                        InitConfiguration('PROVINCIA', 'Prv');
                        InitConfiguration('DISTRITO', 'Dis');

                        disabledBotonesDpt(false, false, true, true);
                        styleBotonesDpt('display', 'display', 'display:none', 'display:none');

                        disabledBotonesPrv(true, true, true, true);
                        styleBotonesPrv('display:none', 'display:none', 'display:none', 'display:none');

                        disabledBotonesDis(true, true, true, true);
                        styleBotonesDis('display:none', 'display:none', 'display:none', 'display:none');

                        $('#hdCodigoDpt').val('');
                        $('#hdUbigeoDpt').val('');
                        $('#hdDescripcionDpt').val('');
                        $('#hdEstadoDpt').val('');

                        $('#hdCodigoPrv').val('');
                        $('#hdUbigeoPrv').val('');
                        $('#hdUbigeoAnteriorPrv').val('');
                        $('#hdDescripcionPrv').val('');
                        $('#hdEstadoPrv').val('');

                        $('#hdCodigoDis').val('');
                        $('#hdUbigeoDis').val('');
                        $('#hdUbigeoAnteriorDis').val('');
                        $('#hdDescripcionDis').val('');
                        $('#hdEstadoDis').val('');

                    }
                    else {
                        oTableDpt.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        disabledBotonesDpt(false, false, false, true);
                        styleBotonesDpt('display', 'display', 'display', 'display:none');

                        disabledBotonesPrv(false, false, true, true);
                        styleBotonesPrv('display', 'display', 'display:none', 'display:none');

                        disabledBotonesDis(true, true, true, true);
                        styleBotonesDis('display:none', 'display:none', 'display:none', 'display:none');

                        var idDpt = $(this).attr('id');
                        $('#hdCodigoDpt').val($(this).find('td').first().html());
                        $('#hdUbigeoDpt').val(idDpt);
                        $('#hdDescripcionDpt').val($(this).find('td').first().next().next().html());
                        $('#hdEstadoDpt').val($(this).find('td').first().next().next().next().html());

                        $('#hdUbigeoAnteriorPrv').val(idDpt);

                        ListarPrv(idPais, idDpt);
                    }
                });

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function ListarPrv(idPais, idDpt) {

    disabledBotonesPrv(false, false, true, true);
    styleBotonesPrv('display', 'display', 'display:none', 'display:none');

    disabledBotonesDis(true, true, true, true);
    styleBotonesDis('display:none', 'display:none', 'display:none', 'display:none');

    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMUBIG.ASHX?code_pais=" + idPais + "&code_ubig=" + idDpt + "&NIVEL=2&opcion=3",
        success: function (datos) {
            if (datos == "No se encontraron datos!!!") {
                InitConfiguration('PROVINCIA', 'Prv');
                InitConfiguration('DISTRITO', 'Dis');

                disabledBotonesDpt(false, false, false, false);
                styleBotonesDpt('display', 'display', 'display', 'display');

            }
            else {
                ClearTables('PROVINCIA');
                ClearTables('DISTRITO');

                $('#divPrv').html(datos);

                oTablePrv = $('#tblUbigPROVINCIA').dataTable({
                    "scrollY": "300px",
                    "pageLength": false,
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "dom": '<"toolbar">frtip'
                });

                InitConfiguration('DISTRITO', 'Dis');

                $('#tblUbigPROVINCIA tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                        InitConfiguration('DISTRITO', 'Dis');

                        disabledBotonesPrv(false, false, true, true);
                        styleBotonesPrv('display', 'display', 'display:none', 'display:none');

                        disabledBotonesDis(true, true, true, true);
                        styleBotonesDis('display:none', 'display:none', 'display:none', 'display:none');

                        $('#hdCodigoPrv').val('');
                        $('#hdUbigeoPrv').val('');
                        $('#hdDescripcionPrv').val('');
                        $('#hdEstadoPrv').val('');

                        $('#hdCodigoDis').val('');
                        $('#hdUbigeoDis').val('');
                        $('#hdUbigeoAnteriorDis').val('');
                        $('#hdDescripcionDis').val('');
                        $('#hdEstadoDis').val('');

                    }
                    else {
                        oTablePrv.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        disabledBotonesPrv(false, false, false, true);
                        styleBotonesPrv('display', 'display', 'display', 'display:none');

                        disabledBotonesDis(false, false, true, true);
                        styleBotonesDis('display', 'display', 'display:none', 'display:none');

                        var idPrv = $(this).attr('id');

                        $('#hdCodigoPrv').val($(this).find('td').first().html());
                        $('#hdUbigeoPrv').val(idPrv);
                        $('#hdDescripcionPrv').val($(this).find('td').first().next().next().html());
                        $('#hdEstadoPrv').val($(this).find('td').first().next().next().next().html());

                        $('#hdUbigeoAnteriorDis').val(idPrv);

                        ListarDis(idPais, idPrv);
                    }

                });
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function ListarDis(idPais, idPrv) {

    disabledBotonesDis(false, false, true, true);
    styleBotonesDis('display', 'display', 'display:none', 'display:none');

    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMUBIG.ASHX?code_pais=" + idPais + "&code_ubig=" + idPrv + "&NIVEL=3&opcion=4",
        success: function (datos) {
            if (datos == "No se encontraron datos!!!") {
                InitConfiguration('DISTRITO', 'Dis');

                disabledBotonesPrv(false, false, false, false);
                styleBotonesPrv('display', 'display', 'display', 'display');
            }
            else {
                ClearTables('DISTRITO');

                $('#divDis').html(datos);

                oTableDis = $('#tblUbigDISTRITO').dataTable({
                    "scrollY": "300px",
                    "pageLength": false,
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "dom": '<"toolbar">frtip'
                });

                $('#tblUbigDISTRITO tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                        disabledBotonesDis(false, false, true, true);
                        styleBotonesDis('display', 'display', 'display:none', 'display:none');

                        $('#hdCodigoDis').val('');
                        $('#hdUbigeoDis').val('');
                        $('#hdDescripcionDis').val('');
                        $('#hdEstadoDis').val('');
                    }
                    else {
                        oTableDis.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        disabledBotonesDis(false, false, false, false);
                        styleBotonesDis('display', 'display', 'display', 'display');

                        var idDis = $(this).attr('id');

                        $('#hdCodigoDis').val($(this).find('td').first().html());
                        $('#hdUbigeoDis').val(idDis);
                        $('#hdDescripcionDis').val($(this).find('td').first().next().next().html());
                        $('#hdEstadoDis').val($(this).find('td').first().next().next().next().html());
                    }
                });
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function ClearTables(name) {
    if ($('#tblUbig' + name).length != 0) {
        $('#tblUbig' + name).remove();
    }
}

function NewTableInit(name) {
    var output = '';
    output += "<table id='tblUbig" + name + "' cellspacing='0'  class='display'>";
    output += "<thead>";
    output += "<tr>";
    output += "<th colspan='3'>" + name + "</th>"
    output += "</tr>"
    output += "<tr>"
    output += "<th align='center'>UBIGEO</th>"
    output += "<th align='center'>DESCRIPCION</th>"
    output += "<th align='center'>ESTADO</th>"
    output += "</tr>"
    output += "</thead>"
    output += "<tbody>"
    output += "<tr>"
    output += "<td></td>"
    output += "<td></td>"
    output += "<td></td>"
    output += "</tr>"
    output += "</tbody>"
    output += "</table>"
    return output;
}

function InitConfiguration(name, div) {
    var input = NewTableInit(name);
    $('#div' + div).html(input);
    oTableNew = $('#tblUbig' + name).dataTable({
        "scrollY": "300px",
        "pageLength": false,
        "searching": false,
        "paging": false,
        "info": false,
        "bSort": false,
        "dom": '<"toolbar">frtip'
    });

    ClearTables(name);
}

function offValidationError(v_Id) {
    $('#' + v_Id).parent().parent().removeAttr('class');
    $('#' + v_Id).off("change");
    $('#' + v_Id).off('paste');
    $('#' + v_Id).off('keyup');
    $('#' + v_Id).parent().children('span').remove();
}

function ShowModalNewDpt() {
    ClearControls();
    $("#grabarModal").html("<i class='icon-pencil'></i> Grabar");
    $("#grabarModal").attr("href", "javascript:Grabar(1);");
    $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
    $('#myModalLabel').html('Nuevo Departamento');
    $('#MuestraModal').modal('show');
    offValidationError('txtCodigoSunatModal');
    offValidationError('txtDescripcionModal');
}

function ShowModalNewPrv() {
    ClearControls();
    $("#grabarModal").html("<i class='icon-pencil'></i> Grabar");
    $("#grabarModal").attr("href", "javascript:Grabar(2);");
    $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
    $('#myModalLabel').html('Nueva Provincia');
    $('#MuestraModal').modal('show');
    offValidationError('txtCodigoSunatModal');
    offValidationError('txtDescripcionModal');
}

function ShowModalNewDis() {
    ClearControls();
    $("#grabarModal").html("<i class='icon-pencil'></i> Grabar");
    $("#grabarModal").attr("href", "javascript:Grabar(3);");
    $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
    $('#myModalLabel').html('Nuevo Distrito');
    $('#MuestraModal').modal('show');
    offValidationError('txtCodigoSunatModal');
    offValidationError('txtDescripcionModal');
}

function ShowModalEditDpt() {

    ClearControls();

    var CODIGO_SUNAT = $.trim($('#hdUbigeoDpt').val());
    if (CODIGO_SUNAT != "") {
        $("#grabarModal").html("<i class='icon-pencil'></i> Modificar");
        $("#grabarModal").attr("href", "javascript:Modificar(1);");
        $("#cancelarModal").html("<i class='icon-remove'></i> Cerrar");

        $('#txtCodigoModal').val($('#hdCodigoDpt').val());
        $('#txtCodigoSunatModal').val(CODIGO_SUNAT);
        $('#txtDescripcionModal').val($('#hdDescripcionDpt').val());

        $('#myModalLabel').html('Editar Departamento');
        $('#MuestraModal').modal('show');

        offValidationError('txtCodigoSunatModal');
        offValidationError('txtDescripcionModal');
    }
}

function ShowModalEditPrv() {

    ClearControls();

    var CODIGO_SUNAT = $.trim($('#hdUbigeoPrv').val());
    if (CODIGO_SUNAT != "") {
        $("#grabarModal").html("<i class='icon-pencil'></i> Modificar");
        $("#grabarModal").attr("href", "javascript:Modificar(2);");
        $("#cancelarModal").html("<i class='icon-remove'></i> Cerrar");

        $('#txtCodigoModal').val($('#hdCodigoPrv').val());
        $('#txtCodigoSunatModal').val(CODIGO_SUNAT);
        $('#txtDescripcionModal').val($('#hdDescripcionPrv').val());

        $('#myModalLabel').html('Editar Provincia');
        $('#MuestraModal').modal('show');

        offValidationError('txtCodigoSunatModal');
        offValidationError('txtDescripcionModal');
    }
}

function ShowModalEditDis() {

    ClearControls();

    var CODIGO_SUNAT = $.trim($('#hdUbigeoDis').val());
    if (CODIGO_SUNAT != "") {
        $("#grabarModal").html("<i class='icon-pencil'></i> Modificar");
        $("#grabarModal").attr("href", "javascript:Modificar(3);");
        $("#cancelarModal").html("<i class='icon-remove'></i> Cerrar");

        $('#txtCodigoModal').val($('#hdCodigoDis').val());
        $('#txtCodigoSunatModal').val(CODIGO_SUNAT);
        $('#txtDescripcionModal').val($('#hdDescripcionDis').val());

        $('#myModalLabel').html('Editar Distrito');
        $('#MuestraModal').modal('show');

        offValidationError('txtCodigoSunatModal');
        offValidationError('txtDescripcionModal');
    }
}

function Delete(opcion) {
    var CODE_PAIS = '';
    var CODE = '';
    var CODIGO_SUNAT = '';
    var CODIGO_ANT = '';
    var DESCRIPCION = '';
    var NIVEL = 0;
    var ESTADO = '';
    var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

    CODE_PAIS = $('#cboMPais').val();

    switch (opcion) {
        case 1:
            CODE = $('#hdCodigoDpt').val();
            CODIGO_SUNAT = $.trim($('#hdUbigeoDpt').val());
            DESCRIPCION = $.trim($('#hdDescripcionDpt').val());
            NIVEL = opcion;
            ESTADO = $('#hdEstadoDpt').val() == 'ACTIVO' ? 'I' : 'A';
            break;
        case 2:
            CODE = $('#hdCodigoPrv').val();
            CODIGO_SUNAT = $.trim($('#hdUbigeoPrv').val());
            CODIGO_ANT = $('#hdUbigeoAnteriorPrv').val();
            DESCRIPCION = $.trim($('#hdDescripcionPrv').val());
            NIVEL = opcion;
            ESTADO = $('#hdEstadoPrv').val() == 'ACTIVO' ? 'I' : 'A';
            break;
        case 3:
            CODE = $('#hdCodigoDis').val();
            CODIGO_SUNAT = $.trim($('#hdUbigeoDis').val());
            CODIGO_ANT = $('#hdUbigeoAnteriorDis').val();
            DESCRIPCION = $.trim($('#hdDescripcionDis').val());
            NIVEL = opcion;
            ESTADO = $('#hdEstadoDis').val() == 'ACTIVO' ? 'I' : 'A';
            break;
        default:
            break;
    }

    Bloquear("modal");

    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMUBIG.ASHX?opcion=M&CODE=" + CODE + "&CODIGO_SUNAT=" + CODIGO_SUNAT + "&CODIGO_ANT=" + CODIGO_ANT + "&DESCRIPCION=" + DESCRIPCION + "&NIVEL=" + NIVEL + "&code_pais=" + CODE_PAIS + "&ESTADO=" + ESTADO + "&USUA_ID=" + USUA_ID,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            if (datos[0].SUCCESS == "OK") {
                Desbloquear("modal");
                if (opcion == 1) {
                    $('#tblUbigDEPARTAMENTO tbody [id=' + CODIGO_SUNAT.toString() + '] td').next().next().next().html(ESTADO.toString() == "A" ? "ACTIVO" : "INACTIVO")
                    $('#hdEstadoDpt').val(ESTADO.toString() == "A" ? "ACTIVO" : "INACTIVO");
                    //$('#tblUbigDEPARTAMENTO tbody [id=' + CODIGO_SUNAT.toString() + ']').remove();
                }
                if (opcion == 2) {
                    $('#tblUbigPROVINCIA tbody [id=' + CODIGO_SUNAT.toString() + '] td').next().next().next().html(ESTADO.toString() == "A" ? "ACTIVO" : "INACTIVO")
                    $('#hdEstadoPrv').val(ESTADO.toString() == "A" ? "ACTIVO" : "INACTIVO");
                    //$('#tblUbigDEPARTAMENTO tbody [id=' + CODIGO_SUNAT.toString() + ']').remove();
                }
                if (opcion == 3) {
                    $('#tblUbigDISTRITO tbody [id=' + CODIGO_SUNAT.toString() + '] td').next().next().next().html(ESTADO.toString() == "A" ? "ACTIVO" : "INACTIVO")
                    $('#hdEstadoDis').val(ESTADO.toString() == "A" ? "ACTIVO" : "INACTIVO");
                    //$('#tblUbigDEPARTAMENTO tbody [id=' + CODIGO_SUNAT.toString() + ']').remove();
                }
                exito();
            }
            else {
                Desbloquear("modal");
                noexito();
            }
        },
        error: function (msg) {
            Desbloquear("modal");
            alert(msg);
        }
    });
}

function RefreshDpt() {
    var varPais = $('#cboMPais').val();
    ListarDpt(varPais);
}

function RefreshPrv() {
    var varPais = $('#cboMPais').val();
    var varIdDpt = $('#hdUbigeoAnteriorPrv').val();
    ListarPrv(varPais, varIdDpt);
}

function RefreshDis() {
    var varPais = $('#cboMPais').val();
    var varIdPrv = $('#hdUbigeoAnteriorDis').val();
    ListarDis(varPais, varIdPrv);
}

function HideModal() {
    $('#MuestraModal').modal('hide');
}

function ClearControls() {
    $('#txtCodigoModal').val('');
    $('#txtCodigoSunatModal').val('');
    $('#txtDescripcionModal').val('');
    //$('#uniform-chkEstadoDpt span').removeClass().addClass("checked");
    //$('#chkEstadoDpt').attr('checked', true);
}

function Grabar(opcion) {

    var Errors = true;

    var CODE_PAIS = '';
    var CODE = '';
    var CODIGO_SUNAT = '';
    var CODIGO_ANT = '';
    var DESCRIPCION = '';
    var NIVEL = 0;
    var ESTADO = '';
    var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

    CODE_PAIS = $('#cboMPais').val();

    switch (opcion) {
        case 1:
            CODIGO_SUNAT = $('#txtCodigoSunatModal').val();
            DESCRIPCION = $('#txtDescripcionModal').val();
            NIVEL = opcion;
            ESTADO = 'A';
            break;
        case 2:
            CODIGO_SUNAT = $('#txtCodigoSunatModal').val();
            CODIGO_ANT = $('#hdUbigeoAnteriorPrv').val();
            DESCRIPCION = $('#txtDescripcionModal').val();
            NIVEL = opcion;
            ESTADO = 'A';
            break;
        case 3:
            CODIGO_SUNAT = $('#txtCodigoSunatModal').val();
            CODIGO_ANT = $('#hdUbigeoAnteriorDis').val();
            DESCRIPCION = $('#txtDescripcionModal').val();
            NIVEL = opcion;
            ESTADO = 'A';
            break;
        default:
            break;
    }

    Errors = validar();

    if (Errors) {
        Bloquear("modal");

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMUBIG.ASHX?opcion=N&CODIGO_SUNAT=" + CODIGO_SUNAT + "&CODIGO_ANT=" + CODIGO_ANT + "&DESCRIPCION=" + DESCRIPCION + "&NIVEL=" + NIVEL + "&code_pais=" + CODE_PAIS + "&ESTADO=" + ESTADO + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {

                    Desbloquear("modal");

                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("EXISTE CODIGO INGRESADO");
                    }
                    else {
                        $("#txtCodigoModal").val(datos[0].CODIGO);
                        $("#grabarModal").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabarModal").attr("href", "javascript:Modificar(" + opcion + ");");
                        $("#cancelarModal").html("<i class='icon-remove'></i> Cerrar");
                        exito();
                        if (opcion == 1) {
                            ListarDpt(CODE_PAIS);
                        }
                        if (opcion == 2) {
                            ListarPrv(CODE_PAIS, CODIGO_ANT);
                        }
                        if (opcion == 3) {
                            ListarDis(CODE_PAIS, CODIGO_ANT);
                        }
                    }
                }
                else {
                    Desbloquear("modal");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("modal");
                alert(msg);
            }
        });
    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }

}

function Modificar(opcion) {

    var Errors = true;

    var CODE_PAIS = '';
    var CODE = '';
    var CODIGO_SUNAT = '';
    var CODIGO_ANT = '';
    var DESCRIPCION = '';
    var NIVEL = 0;
    var ESTADO = '';
    var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();

    CODE_PAIS = $('#cboMPais').val();

    switch (opcion) {
        case 1:
            CODE = $('#txtCodigoModal').val();
            CODIGO_SUNAT = $('#txtCodigoSunatModal').val();
            DESCRIPCION = $('#txtDescripcionModal').val();
            NIVEL = opcion;
            ESTADO = 'A';
            break;
        case 2:
            CODE = $('#txtCodigoModal').val();
            CODIGO_SUNAT = $('#txtCodigoSunatModal').val();
            CODIGO_ANT = $('#hdUbigeoAnteriorPrv').val();
            DESCRIPCION = $('#txtDescripcionModal').val();
            NIVEL = opcion;
            ESTADO = 'A';
            break;
        case 3:
            CODE = $('#txtCodigoModal').val();
            CODIGO_SUNAT = $('#txtCodigoSunatModal').val();
            CODIGO_ANT = $('#hdUbigeoAnteriorDis').val();
            DESCRIPCION = $('#txtDescripcionModal').val();
            NIVEL = opcion;
            ESTADO = 'A';
            break;
        default:
            break;
    }

    Errors = validar();

    if (Errors) {

        Bloquear("modal");

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMUBIG.ASHX?opcion=M&CODE=" + CODE + "&CODIGO_SUNAT=" + CODIGO_SUNAT + "&CODIGO_ANT=" + CODIGO_ANT + "&DESCRIPCION=" + DESCRIPCION + "&NIVEL=" + NIVEL + "&code_pais=" + CODE_PAIS + "&ESTADO=" + ESTADO + "&USUA_ID=" + USUA_ID,
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {

                    Desbloquear("modal");

                    if (datos[0].CODIGO == "EXIS") {
                        alertCustom("EXISTE CODIGO INGRESADO");
                    }
                    else {
                        $("#txtCodigoModal").val(datos[0].CODIGO);
                        $("#grabarModal").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabarModal").attr("href", "javascript:Modificar(" + opcion + ");");
                        exito();
                        if (opcion == 1) {
                            ListarDpt(CODE_PAIS);
                        }
                        if (opcion == 2) {
                            ListarPrv(CODE_PAIS, CODIGO_ANT);
                        }
                        if (opcion == 3) {
                            ListarDis(CODE_PAIS, CODIGO_ANT);
                        }
                    }
                }
                else {
                    Desbloquear("modal");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("modal");
                alert(msg);
            }
        });
    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
       
}

function validar() {
    var v_Errors = true;

    if (vErrorsNotMessage(["txtCodigoSunatModal"]) == false) {
        v_Errors = false;
    }

    if (vErrorsNotMessage(["txtDescripcionModal"]) == false) {
        v_Errors = false;
    }

    //if ($.trim(CODIGO_SUNAT) == "") {
    //    mensaje = mensaje + "INGRESE CÓDIGO SUNAT. <br/>";
    //}

    //if ($.trim(DESCRIPCION) == "") {
    //    mensaje = mensaje + "INGRESE DESCRIPCIÓN. <br/>";
    //}

    return v_Errors;

}

function Cancelar() {
    HideModal();
}
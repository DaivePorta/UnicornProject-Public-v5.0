
var vg_JsonDetalleClase = "";

var NSLCLAS = function () {

    var fillBandejaClases = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCR" },
                //{ data: "NSIST_CODE" },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }


       var  oTableClases = iniciaTabla('tblClases',parms);
       $('#tblClases').removeAttr('style');
        $('#tblClases tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableClases.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableClases.fnGetPosition(this);
                var row = oTableClases.fnGetData(pos);
                var CODE = row.CODE;
                window.location.href = '?f=nsmclas&codigo=' + CODE;
            }
        });
    }

    return {
        init: function () {
            fillBandejaClases();
        }
    };

}();

var NSMCLAS = function () {

    var fillCboSistema = function () {
        var selectSistema = $('#cboSistema');
        $('#cboSistema').select2();

        $.ajax({
            type: "post",
            url: "vistas/ns/ajax/nsmclas.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    selectSistema.empty();
                    selectSistema.append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            selectSistema.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                        }
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoControles = function () {

        HandlerEstado();

        HandlerCodigo();

        HandlerDescripcion();

        HandlerSistema();

        HandlerForma();

        HandlerJqxgrid();

    }

    var cargaInicial = function () {

        $('#hfJsonForma').val("[]");
        //$('#hfJsonDetalleClase').val("[]");
        vg_JsonDetalleClase = "[]";

        var CODE = ObtenerQueryString("codigo");

        initJqxGrid();

        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "post",
                url: "vistas/ns/ajax/nsmclas.ashx?opcion=L&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    if (datos != null) {
                        $('#txtCodigo').attr('disabled', true);
                        $('#txtCodigo').val(datos[0].CODE);
                        $('#txtDescripcion').val(datos[0].DESCR);
                        if (datos[0].ESTADO_IND == 'A') {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                            $('#chkEstado').parent().parent().siblings('span').html('Activo');
                        }
                        else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                            $('#chkEstado').parent().parent().siblings('span').html('Inactivo');
                        }
                        $('#cboSistema').select2('val', datos[0].SIST_CODE);

                        if (datos[0].JSON_DETAIL == "[]") {
                            //$('#hfJsonDetalleClase').val("[]");
                            vg_JsonDetalleClase = "[]";
                            refreshJqxGrid(datos[0].JSON_DETAIL);
                        }
                        else {
                            //$('#hfJsonDetalleClase').val(JSON.stringify(datos[0].JSON_DETAIL));
                            vg_JsonDetalleClase = JSON.stringify(datos[0].JSON_DETAIL);
                            refreshJqxGrid(JSON.stringify(datos[0].JSON_DETAIL));
                        }

                        fillCboForma($('#cboSistema').val());
                        $('#hfSistema').val(CODE);
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }
    }

    return {
        init: function () {
            fillCboSistema();
            cargaInicial();
            eventoControles();
        }
    };

}();

function HandlerEstado() {

    $('#chkEstado').on('change', function () {
        if ($("#chkEstado").is(':checked')) {
            $('#chkEstado').parent().parent().siblings('span').html('Activo');
        } else {
            $('#chkEstado').parent().parent().siblings('span').html('Inactivo');
        }
    });

}

function HandlerCodigo() {
    $('#txtCodigo').on('focus', function () {
        $('#txtCodigo').inputmask({ "mask": "%", "repeat": 30, "greedy": false });
    });
}

function HandlerDescripcion() {
    $('#txtDescripcion').on('focus', function () {
        $('#txtDescripcion').inputmask({ "mask": "%", "repeat": 50, "greedy": false });
    });
}

function HandlerSistema() {
    $('#cboSistema').on('change', function () {
        var CODE = $(this).val();
        var CODE_ANT = $('#hfSistema').val();
        if (CODE != CODE_ANT) {
            fillCboForma($('#cboSistema').val());
            $('#hfSistema').val(CODE);
        }
    });
}

function fillCboForma(v_Value) {

    var ArrayJson = [];

    var obj = '';

    var selectForma = $('#cboForma');
    $('#cboForma').select2();

    $('#cboForma').removeAttr('disabled');

    $('#addrowprop').removeClass();
    $('#addrowprop').addClass('btn green disabled');
    $('#addrowprop').removeAttr('href');
    $('#addrowprop').attr('href', 'javascript:;');

    var SIST_CODE = $('#cboSistema').val();

    $.ajax({
        type: "post",
        url: "vistas/ns/ajax/nsmclas.ashx?OPCION=2&SIST_CODE=" + SIST_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectForma.empty();
            if (datos != null) {

                obj += '[';

                for (var i = 0; i < datos.length; i++) {
                    obj += '{';
                    obj += '"CODIGO":"' + datos[i].CODIGO + '",';
                    obj += '"DESCRIPCION":"' + datos[i].DESCRIPCION + '"';
                    obj += '},';
                }

                obj += '{}';
                obj = obj.replace(',{}', '');
                obj += ']';
                $('#hfJsonForma').val(obj);
                deleteOptionForma();
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function HandlerForma() {
    $('#cboForma').on('change', function () {
        $('#addrowprop').removeClass();
        $('#addrowprop').addClass('btn green');
        $('#addrowprop').removeAttr('href');
        $('#addrowprop').attr('href', 'javascript:addRowJqxgrid();');
    });
}

function initJqxGrid() {

    var data = new Array();

    var source = {
        localdata: data,
        datatype: 'array',
        addrow: function (rowid, rowdata, position, commit) {
            commit(true);
        },
        deleterow: function (rowid, commit) {
            commit(true);
        },
        updaterow: function (rowid, newdata, commit) {
            commit(true);
        },
        pager: function (pagenum, pagesize, oldpagenum) {
            // callback called when a page or page size is changed.
        }

    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgrid').jqxGrid({
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
        columns: [{ text: 'Código Forma', columntype: 'textbox', datafield: 'CODE', width: '20%', cellsalign: 'center', align: 'center' },
          { text: 'Descripción Forma', columntype: 'textbox', datafield: 'DESCR', width: '80%', cellsalign: 'left', align: 'center' }
        ]
    });

    $('#jqxgrid').jqxGrid('refreshdata');
}

function HandlerJqxgrid() {
    $("#jqxgrid").on('rowselect', function (event) {
        var selectedrowindex = event.args.rowindex;

        $('#delrowprop').removeClass();
        $('#delrowprop').addClass('btn red');
        $('#delrowprop').removeAttr('href');
        $('#delrowprop').attr('href', 'javascript:deleteRowJqxgrid(' + selectedrowindex + ');');
    });
}

function addRowJqxgrid() {

    var ArrayJson;
    var CODE = '';
    var DESCR = '';

    //var JsonDetalleClase = $('#hfJsonDetalleClase').val();
    var JsonDetalleClase = vg_JsonDetalleClase;

    if (JsonDetalleClase == "[]") {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonDetalleClase);
    }

    CODE = $.trim($('#cboForma').val());
    DESCR = $.trim($('#cboForma option:selected').html());

    ArrayJson.push({ 'CODE': CODE, "DESCR": DESCR });
    //$('#hfJsonDetalleClase').val(JSON.stringify(ArrayJson));
    vg_JsonDetalleClase = JSON.stringify(ArrayJson);

    //refreshJqxGrid($('#hfJsonDetalleClase').val());
    refreshJqxGrid(vg_JsonDetalleClase);

    deleteOptionForma();

    $('#addrowprop').removeClass();
    $('#addrowprop').addClass('btn green disabled');
    $('#addrowprop').removeAttr('href');
    $('#addrowprop').attr('href', 'javascript:;');
}

function deleteRowJqxgrid(v_Index) {
    var ArrayJson;
    //var JsonDetalleClase = $('#hfJsonDetalleClase').val();
    var JsonDetalleClase = vg_JsonDetalleClase;

    var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;

    if (v_Index >= 0 && v_Index < rowscount) {
        var id = $("#jqxgrid").jqxGrid('getrowid', v_Index);
        var rows = $('#jqxgrid').jqxGrid('getdisplayrows');
        var rowData = rows[v_Index];
        var CODE = rowData.CODE;

        ArrayJson = JSON.parse(JsonDetalleClase);

        for (var j = 0; j < ArrayJson.length; j++) {
            if (CODE == ArrayJson[j].CODE) {
                ArrayJson.splice(j, 1);
                break;
            }
        }

        //$('#hfJsonDetalleClase').val(JSON.stringify(ArrayJson));
        vg_JsonDetalleClase = JSON.stringify(ArrayJson);

    }

    deleteOptionForma();

    //refreshJqxGrid($('#hfJsonDetalleClase').val());
    refreshJqxGrid(vg_JsonDetalleClase);
}

function deleteOptionForma() {

    var JsonForma = $('#hfJsonForma').val();
    //var JsonDetalleClase = $('#hfJsonDetalleClase').val();
    var JsonDetalleClase = vg_JsonDetalleClase;

    var ArrayJsonForma = JSON.parse(JsonForma);
    var ArrayJsonDetalleClase = JSON.parse(JsonDetalleClase);

    for (var i = 0; i < ArrayJsonDetalleClase.length; i++) {
        for (var j = 0; j < ArrayJsonForma.length; j++) {
            if (ArrayJsonDetalleClase[i].CODE == ArrayJsonForma[j].CODIGO) {
                ArrayJsonForma.splice(j, 1);
                break;
            }
        }
    }

    $('#cboForma').empty();
    $('#cboForma').append('<option></option>');

    for (var i = 0; i < ArrayJsonForma.length; i++) {
        $('#cboForma').append('<option value="' + ArrayJsonForma[i].CODIGO + '">' + ArrayJsonForma[i].DESCRIPCION + '</option>');
    }

    $('#cboForma').select2('val', '');

}

function refreshJqxGrid(v_JsonString) {

    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json',
        addrow: function (rowid, rowdata, position, commit) {
            commit(true);
        },
        deleterow: function (rowid, commit) {
            commit(true);
        },
        updaterow: function (rowid, newdata, commit) {
            commit(true);
        }
    };

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgrid').jqxGrid({
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
        columns: [{ text: 'Código Forma', columntype: 'textbox', datafield: 'CODE', width: '20%', cellsalign: 'center', align: 'center' },
                    { text: 'Descripción Forma', columntype: 'textbox', datafield: 'DESCR', width: '80%', cellsalign: 'left', align: 'center' }
        ]
    });

    HandlerJqxgrid();

    $("#jqxgrid").jqxGrid('clearselection');

    $('#jqxgrid').jqxGrid('refreshdata');

    $('#delrowprop').removeClass();
    $('#delrowprop').addClass('btn red disabled');
    $('#delrowprop').removeAttr('href');
    $('#delrowprop').attr('href', 'javascript:;');

}

function Grabar() {

    var Errors = true;

    var CODE = '';
    var DESC = '';
    var SIST_CODE = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var ArrayJson;
    var JsonDetalleClase;
    var DETAIL = '';
    var DETAIL_COUNT = 0;

    CODE = $.trim($('#txtCodigo').val());
    DESC = $.trim($('#txtDescripcion').val());
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    SIST_CODE = $.trim($('#cboSistema').val());
    USUA_ID = $.trim($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val());

    //JsonDetalleClase = $('#hfJsonDetalleClase').val()
    JsonDetalleClase = vg_JsonDetalleClase;

    Errors = validarClases();

    if (Errors) {

        if (JsonDetalleClase == "[]") {
            ArrayJson = [];
        }
        else {
            ArrayJson = JSON.parse(JsonDetalleClase);
        }

        for (var i = 0; i < ArrayJson.length; i++) {

            DETAIL += ArrayJson[i].CODE;
            if (i != ArrayJson.length - 1) {
                DETAIL += '|;|';
            }
        }

        DETAIL_COUNT = ArrayJson.length

        var data = new FormData();
        data.append('OPCION', 'N');
        data.append('CODE', CODE);
        data.append('DESC', DESC);
        data.append('ESTADO_IND', ESTADO_IND);
        data.append('SIST_CODE', SIST_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('DETAIL', DETAIL);
        data.append('DETAIL_COUNT', DETAIL_COUNT);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMCLAS.ASHX",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        Desbloquear("ventana");
                        if (datos[0].CODIGO == "EXISTE") {
                            alertCustom("EXISTE CODIGO INGRESADO");
                        }
                        else {

                            $('#txtCodigo').attr('disabled', true);
                            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabar").attr("href", "javascript:Modificar();");
                            exito();
                        }
                    }
                }

            },
            error: function (msg) {
                Desbloquear("ventana");
                noexito();
            }
        });


    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }

}

function Modificar() {
    var Errors = true;

    var CODE = '';
    var DESC = '';
    var SIST_CODE = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var ArrayJson;
    var JsonDetalleClase;
    var DETAIL = '';
    var DETAIL_COUNT = 0;

    CODE = $.trim($('#txtCodigo').val());
    DESC = $.trim($('#txtDescripcion').val());
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    SIST_CODE = $.trim($('#cboSistema').val());
    USUA_ID = $.trim($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val());

    //JsonDetalleClase = $('#hfJsonDetalleClase').val()
    JsonDetalleClase = vg_JsonDetalleClase;

    Errors = validarClases();

    if (Errors) {

        if (JsonDetalleClase == "[]") {
            ArrayJson = [];
        }
        else {
            ArrayJson = JSON.parse(JsonDetalleClase);
        }

        for (var i = 0; i < ArrayJson.length; i++) {

            DETAIL += ArrayJson[i].CODE;
            if (i != ArrayJson.length - 1) {
                DETAIL += '|;|';
            }
        }

        DETAIL_COUNT = ArrayJson.length

        var data = new FormData();
        data.append('OPCION', 'M');
        data.append('CODE', CODE);
        data.append('DESC', DESC);
        data.append('ESTADO_IND', ESTADO_IND);
        data.append('SIST_CODE', SIST_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('DETAIL', DETAIL);
        data.append('DETAIL_COUNT', DETAIL_COUNT);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMCLAS.ASHX",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        Desbloquear("ventana");

                        $('#txtCodigo').attr('disabled', true);
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                        exito();

                    }
                }

            },
            error: function (msg) {
                Desbloquear("ventana");
                noexito();
            }
        });


    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
}

function validarClases() {
    var v_Errors = true;

    if (vErrorsNotMessage(["txtCodigo"]) == false) {
        v_Errors = false;
    }

    if (vErrorsNotMessage(["txtDescripcion"]) == false) {
        v_Errors = false;
    }

    if (vErrorsNotMessage(["cboSistema"]) == false) {
        v_Errors = false;
    }

    return v_Errors;

}
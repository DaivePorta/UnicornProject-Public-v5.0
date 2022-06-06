var NMLGMAR = function () {

    var fillBandejaMarcas = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "MARCA" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }

        var table = iniciaTabla("tblGestionMarcas", parms);
        $('#tblGestionMarcas').removeAttr('style');


        $('#tblGestionMarcas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=nmmgmar&codigo=' + code;
            }
        });

        $('#tblGestionMarcas tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NM/ajax/NMMGMAR.ASHX",
            {
                OPCION: 1,
                CODE: cod
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res != null && res != "") {
                    if (res == "I") res = "INACTIVO";
                    else res = "ACTIVO";
                    table.fnGetData(pos).ESTADO = res;
                    refrescaTabla(table);
                    exito();
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

            $.ajaxSetup({ async: true });

        });

    }

    return {
        init: function () {
            fillBandejaMarcas();
        }
    };

}();

var vg_CodEmpresa = '';
var vg_CodGrupo = '';
var vg_CodSubGrupo = '';

var NMMGMAR = function () {

    var plugins = function () {

        $('#cboEmpresa').select2();
        $('#cboGrupo').select2();
        $('#cboSubGrupo').select2();

    }

    var eventoControles = function () {

        HandlerMarca();

    }

    var cargaInicial = function () {
        $('#divSubGrupos').attr('style', 'display:none');

        initJqxGridMarca("[]");

        var cod = ObtenerQueryString("codigo");

        if (typeof (cod) !== "undefined") {
            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMGMAR.ASHX?OPCION=RM&CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos != "" && datos != null) {

                        $('#txtCodigo').val(datos[0].CODIGO);
                        if (datos[0].ESTADO == "ACTIVO") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }
                        $('#txtMarca').val(datos[0].MARCA);
                        if (datos[0].JSON == "[]") {
                            initJqxGridMarca(datos[0].JSON);
                        }
                        else {
                            initJqxGridMarca(JSON.stringify(datos[0].JSON));
                        }
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizarMarca();");

                        initSubGrupos();

                    }

                },
                error: function (msg) {
                    alertCustom("Error al obtener datos de Gestión de Marcas.");
                }

            });

        }
    }

    return {
        init: function () {
            plugins();
            cargaInicial();
            eventoControles();
        }
    };
}();

function solonumbef(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890& ';//Caracteres validos

    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
} 

function HandlerMarca() {
    //$("#txtMarca").focus(function () { $(this).inputmask({ "mask": "%", "repeat": 150, "greedy": false }); });

}

function HandlerEmpresa() {

    $('#cboEmpresa').on('change', function () {
        var CODE = $(this).val();
        var CODE_ANT = vg_CodEmpresa;
        if (CODE != CODE_ANT) {
            vg_CodGrupo = '';
            vg_CodSubGrupo = '';
            fillCboGrupo(CODE);
            HandlerGrupo();
            $('#cboGrupo').attr('disabled', false);
            $('#uniform-chkTodosSubGrupos span').removeClass();
            $('#chkTodosSubGrupos').attr('checked', false);
            $('#chkTodosSubGrupos').attr('disabled', true);
            $('#cboSubGrupo').select2('val', '');
            $('#cboSubGrupo').attr('disabled', true);
            $("#s2id_cboSubGrupo a .select2-chosen").html('');
            $('#addSubGrupo').removeAttr('class');
            $('#addSubGrupo').attr('class', 'btn green disabled');
            $('#addSubGrupo').attr('onclick', 'javascript:;');
            vg_CodEmpresa = CODE;
        }
    });

}

function HandlerGrupo() {

    $('#cboGrupo').on('change', function () {
        var CODE = $(this).val();
        var CODE_ANT = vg_CodGrupo;
        if (CODE != CODE_ANT) {
            vg_CodSubGrupo = '';
            fillCboSubGrupo(CODE);
            $('#cboSubGrupo').attr('disabled', false);
            HandlerSubGrupo();
            if ($('#cboSubGrupo option').length > 1) {
                $('#uniform-chkTodosSubGrupos span').removeClass();
                $('#chkTodosSubGrupos').attr('checked', false);
                $('#chkTodosSubGrupos').attr('disabled', false);
                HandlerTodosSubGrupo();
            }
            else {
                $('#uniform-chkTodosSubGrupos span').removeClass();
                $('#chkTodosSubGrupos').attr('checked', false);
                $('#chkTodosSubGrupos').attr('disabled', true);
            }
            $('#addSubGrupo').removeAttr('class');
            $('#addSubGrupo').attr('class', 'btn green disabled');
            $('#addSubGrupo').attr('onclick', 'javascript:;');
            vg_CodGrupo = CODE;
        }
    });

}

function HandlerTodosSubGrupo() {
    $('#chkTodosSubGrupos').on('change', function () {
        vg_CodSubGrupo = '';
        if ($("#chkTodosSubGrupos").is(':checked')) {
            $('#cboSubGrupo').select2('val', '');
            $('#cboSubGrupo').attr('disabled', true);
            $("#s2id_cboSubGrupo a .select2-chosen").html('');
            $('#addSubGrupo').removeAttr('class');
            $('#addSubGrupo').attr('class', 'btn green');
            $('#addSubGrupo').attr('onclick', 'javascript:addRowJqxgrid();');
        } else {
            $('#cboSubGrupo').select2('val', '');
            $('#cboSubGrupo').attr('disabled', false);
            $('#addSubGrupo').removeAttr('class');
            $('#addSubGrupo').attr('class', 'btn green disabled');
            $('#addSubGrupo').attr('onclick', 'javascript:;');
        }
    });
}

function HandlerSubGrupo() {

    $('#cboSubGrupo').on('change', function () {
        var CODE = $(this).val();
        var CODE_ANT = vg_CodSubGrupo;
        if (CODE != CODE_ANT) {
            $('#addSubGrupo').removeAttr('class');
            $('#addSubGrupo').attr('class', 'btn green');
            $('#addSubGrupo').attr('onclick', 'javascript:addRowJqxgrid();');
            vg_CodSubGrupo = CODE;
        }
    });

}

function initJqxGridMarca(v_JsonString) {

    $('#jqxgrid').jqxGrid('clear');
    $('#jqxgrid').jqxGrid('clearselection');

    //v_JsonString = '[{"A":"A","B":"A","C":"C","D":"D","E":"E","F":"F","CODIGO":"AAA" }, {"A":"B","B":"B","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }, {"A":"C","B":"C","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }, {"A":"D","B":"D","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }, {"A":"E","B":"E","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }, {"A":"F","B":"F","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }, {"A":"G","B":"G","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }, {"A":"H","B":"H","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }, {"A":"I","B":"I","C":"C","D":"D","E":"E","F":"F","CODIGO":"BB" }]';
    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json'
    };

    var renderer = function (row, datafield, value) {
        return '<button id="del' + row + '" type="button" class="btn red" onclick="javascript:deleteRowJqxgrid(' + row + ');"><i class="icon-minus"></i></button>';
    }

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgrid').jqxGrid({
        source: dataAdapter,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        showemptyrow: true,
        sortable: true,
        scrollmode: 'logical',
        enabletooltips: false,
        columns: [
            { text: 'CODEMPRRESA', datafield: 'CTLG_CODE', width: '100%', cellsalign: 'left', align: 'center', hidden: true },
            { text: 'EMPRESA', datafield: 'CTLG_DESC', width: '33%', cellsalign: 'left', align: 'center' },
            { text: 'CODGRUPO', datafield: 'GRUP_CODE', width: '100%', cellsalign: 'left', align: 'center', hidden: true },
            { text: 'GRUPO', datafield: 'GRUP_DESC', width: '32%', cellsalign: 'left', align: 'center' },
            { text: 'CODSUBGRUPO', datafield: 'SUBGRUP_CODE', width: '100%', cellsalign: 'left', align: 'center', hidden: true },
            { text: 'SUB GRUPO', datafield: 'SUBGRUP_DESC', width: '30%', cellsalign: 'left', align: 'center' },
            {
                text: '', datafield: 'eliminar', width: '5%', cellsrenderer: renderer
            }
        ]
    });

    $('#jqxgrid').jqxGrid('refreshdata');

}

function addRowJqxgrid() {
    var p_CTLG_CODE = '';
    var p_GRUP_CODE = '';
    var p_SUBGRUP_CODE = '';
    var p_CODE = '';
    var p_USUA_ID = '';
    var p_TODOS = '';

    p_CTLG_CODE = $('#cboEmpresa').val();
    p_GRUP_CODE = $('#cboGrupo').val();
    p_SUBGRUP_CODE = $('#cboSubGrupo').val();
    p_CODE = $('#txtCodigo').val();
    p_USUA_ID = $.trim($('#ctl00_lblusuario').html());
    p_TODOS = $('#chkTodosSubGrupos').is(':checked') ? 'SI' : 'NO';

    Bloquear("divSubGrupos");

    $.post("vistas/NM/ajax/NMMGMAR.ASHX", {
        OPCION: "CMS",
        CTLG_CODE: p_CTLG_CODE,
        GRUP_CODE: p_GRUP_CODE,
        SUBGRUP_CODE: p_SUBGRUP_CODE,
        CODE: p_CODE,
        USUA_ID: p_USUA_ID,
        TODOS: p_TODOS
    })
        .done(function (res) {
            Desbloquear("divSubGrupos");

            if (res == "EXISTE") {
                alertCustom("EXISTE SUBGRUPO INGRESADO");
            }
            else {
                exito();
                obtenerGestionMarcasSubGrupos();
            }

        })
        .fail(function () {
            Desbloquear("divSubGrupos");
            noexito();
        });

}

function deleteRowJqxgrid(id) {

    var p_SUBGRUP_CODE = '';
    var p_CODE = '';
    var p_USUA_ID = '';

    var v_uid = $('#jqxgrid').jqxGrid('getdisplayrows')[id].uid;

    p_SUBGRUP_CODE = $('#jqxgrid').jqxGrid('getdisplayrows')[id].SUBGRUP_CODE;
    p_CODE = $.trim($('#txtCodigo').val());
    p_USUA_ID = $.trim($('#ctl00_lblusuario').html());

    Bloquear("divSubGrupos");

    $.post("vistas/NM/ajax/NMMGMAR.ASHX", {
        OPCION: "CEMS",
        SUBGRUP_CODE: p_SUBGRUP_CODE,
        CODE: p_CODE,
        USUA_ID: p_USUA_ID
    })
    .done(function (res) {
        Desbloquear("divSubGrupos");
        exito();
        $('#jqxgrid').jqxGrid('deleterow', v_uid);
    })
    .fail(function () {
        Desbloquear("divSubGrupos");
        noexito();
    });


    $('#jqxgrid').jqxGrid('refreshdata');
}

function obtenerGestionMarcasSubGrupos() {
    $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMGMAR.ASHX?OPCION=RM&CODE=" + $('#txtCodigo').val(),
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {

                if (datos[0].JSON == "[]") {
                    initJqxGridMarca(datos[0].JSON);
                }
                else {
                    initJqxGridMarca(JSON.stringify(datos[0].JSON));
                }

            }

        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Sub Grupos.");
        }

    });
}

function grabarMarca() {

    var p_MARCA = '';
    var p_ESTADO_IND = '';
    var p_USUA_ID = '';

    if (vErrors(["txtMarca"])) {

        p_MARCA = $.trim($('#txtMarca').val());
        p_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        p_USUA_ID = $.trim($('#ctl00_lblusuario').html());

        Bloquear("ventana");

        $.post("vistas/NM/ajax/NMMGMAR.ASHX", {
            OPCION: "CM",
            MARCA: p_MARCA,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe la marca ingresada.");
                }
                else {
                    //if (res != "" && res != null) {
                    $('#txtCodigo').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                    $("#grabar").attr("href", "javascript:actualizarMarca();");

                    initSubGrupos();

                    //}
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}

function actualizarMarca() {

    var p_CODE = '';
    var p_MARCA = '';
    var p_ESTADO_IND = '';
    var p_USUA_ID = '';

    if (vErrors(["txtMarca"])) {

        p_CODE = $.trim($('#txtCodigo').val());
        p_MARCA = $.trim($('#txtMarca').val());
        p_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        p_USUA_ID = $.trim($('#ctl00_lblusuario').html());

        Bloquear("ventana");

        $.post("vistas/NM/ajax/NMMGMAR.ASHX", {
            OPCION: "AM",
            CODE: p_CODE,
            MARCA: p_MARCA,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe la marca ingresada.");
                }
                else {
                    //if (res != "" && res != null) {

                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                        $("#grabar").attr("href", "javascript:actualizarMarca();");

                    //}
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}

function initSubGrupos() {

    vg_CodEmpresa = '';
    vg_CodGrupo = '';
    vg_CodSubGrupo = '';

    $('#divSubGrupos').removeAttr('style');
    fillCboEmpresa();
    HandlerEmpresa();
    $('#cboGrupo').select2('val', '');
    $("#s2id_cboGrupo a .select2-chosen").html('');
    $('#cboGrupo').attr('disabled', true);
    $('#cboSubGrupo').select2('val', '');
    $('#uniform-chkTodosSubGrupos span').removeClass();
    $('#chkTodosSubGrupos').attr('checked', false);
    $('#chkTodosSubGrupos').attr('disabled', true);
    $("#s2id_cboSubGrupo a .select2-chosen").html('');
    $('#cboSubGrupo').attr('disabled', true);

}

function fillCboEmpresa() {
    var v_Usuario_Session = $('#ctl00_txtus').val();
    $.ajax({
        type: "post",
        url: "vistas/NM/ajax/NMMGMAR.ASHX?OPCION=2&USUA_ID=" + v_Usuario_Session,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboEmpresa').empty();
            $('#cboEmpresa').append('<option></option>');
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Empresa.");
        }
    });
}

function fillCboGrupo(v_Value) {
    $.ajax({
        type: "post",
        url: "vistas/NM/ajax/NMMGMAR.ASHX?OPCION=3&CTLG_CODE=" + v_Value,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboGrupo').empty();
            $('#cboGrupo').append('<option></option>');
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboGrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboGrupo').select2('val', '');
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Grupo.");
        }
    });
}

function fillCboSubGrupo(v_Value) {
    $.ajax({
        type: "post",
        url: "vistas/NM/ajax/NMMGMAR.ASHX?OPCION=4&CTLG_CODE=" + vg_CodEmpresa + '&GRUP_CODE=' + v_Value,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboSubGrupo').empty();
            $('#cboSubGrupo').append('<option></option>');
            if (datos != "" && datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboSubGrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboSubGrupo').select2('val', '');
        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Sub Grupo.");
        }
    });
}
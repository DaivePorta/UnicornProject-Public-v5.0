var CTLTIAS = function () {
    
    var fillBandejaMarcas = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "NOMBRE" },
                { data: "DESCRIPCION" },
                { data: "NRO_ORDEN" },
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
                window.location.href = '?f=CTMTIAS&codigo=' + code;
            }
        });

        $('#tblGestionMarcas tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/CT/ajax/CTMTIAS.ASHX",
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

var CTMTIAS = function () {

    var plugins = function () {

        $('#cboEmpresa').select2();
        $('#cboSubGrupo').select2();
        $('#txtOrden').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 2, "greedy": false }); });
        $('#txtMnemonico').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 3, "greedy": false }); });
    }

    var eventoControles = function () {
        

    }

    var cargaInicial = function () {
        $('#divSubGrupos').attr('style', 'display:none');

        initJqxGridAsiento("[]");

        var cod = ObtenerQueryString("codigo");
        var ctlg = $('#ctl00_hddctlg').val();

        if (typeof (cod) !== "undefined") {
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMTIAS.ASHX?OPCION=RM&CODE=" + cod + "&CTLG_CODE=" + ctlg,
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
                        $('#txtMarca').val(datos[0].DESCRIPCION);
                        $('#txtNombre').val(datos[0].NOMBRE);
                        $('#txtOrden').val(datos[0].NRO_ORDEN);
                        if (datos[0].JSON == "[]") {
                            initJqxGridAsiento(datos[0].JSON);
                        }
                        else {
                            initJqxGridAsiento(JSON.stringify(datos[0].JSON));
                        }
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizar();");

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
    var filtro = 'abcdefghijklmñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890&';//Caracteres validos

    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
} 

function sololetras(string) {//Solo letras
    var out = '';
    //Se añaden las letras validas
    var cadena = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';//Caracteres validos
    
        for (var i = 0; i < string.length; i++)
            if (cadena.indexOf(string.charAt(i)) != -1)
                out += string.charAt(i);
        return out;
    
} 

function HandlerEmpresa() {

    $('#cboEmpresa').on('change', function () {
        var CODE = $(this).val();
        var CODE_ANT = vg_CodEmpresa;
        if (CODE != CODE_ANT) {
            vg_CodGrupo = '';
            vg_CodSubGrupo = '';
            $('#addSubGrupo').attr('onclick', 'javascript:addRowJqxgrid();');
            vg_CodEmpresa = CODE;
        }
    });

}


function initJqxGridAsiento(v_JsonString) {

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
            { text: 'MNEMÓNICO', datafield: 'MNEMO_DESC', width: '30%', cellsalign: 'left', align: 'center' },
            {
                text: '', datafield: 'eliminar', width: '5%', cellsrenderer: renderer
            }
        ]
    });

    $('#jqxgrid').jqxGrid('refreshdata');

}

function addRowJqxgrid() {
    var p_CTLG_CODE = '';
    var p_CODE = '';
    var p_MNEMO = '';

    p_CTLG_CODE = $('#cboEmpresa').val();
    p_CODE = $('#txtCodigo').val();
    p_MNEMO = $('#txtMnemonico').val(); 

    Bloquear("divSubGrupos");

    $.post("vistas/CT/ajax/CTMTIAS.ASHX", {
        OPCION: "CMS",
        CTLG_CODE: p_CTLG_CODE,
        CODE: p_CODE,
        MNEMO: p_MNEMO
    })
        .done(function (res) {
            Desbloquear("divSubGrupos");

            if (res == "EXISTE") {
                alertCustom("YA EXISTE MNEMOTÉCNIA RELACIONADA A ESTE ASIENTO");
            }
            else {
                exito();
                obtenerGestionAsientos();
            }

        })
        .fail(function () {
            Desbloquear("divSubGrupos");
            noexito();
        });

}

function deleteRowJqxgrid(id) {

    var p_MNEMO_DESC = '';
    var p_CODE = '';
    var p_CTLG_CODE = '';

    var v_uid = $('#jqxgrid').jqxGrid('getdisplayrows')[id].uid;

    p_MNEMO_DESC = $('#jqxgrid').jqxGrid('getdisplayrows')[id].MNEMO_DESC;
    p_CODE = $.trim($('#txtCodigo').val());
    p_CTLG_CODE = $('#jqxgrid').jqxGrid('getdisplayrows')[id].CTLG_CODE;//CAMBIO AVENGER

    Bloquear("divSubGrupos");

    $.post("vistas/CT/ajax/CTMTIAS.ASHX", {
        OPCION: "CEMS",
        MNEMO: p_MNEMO_DESC,
        CODE: p_CODE,
        CTLG_CODE: p_CTLG_CODE
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

function obtenerGestionAsientos() {
    $.ajax({
        type: "POST",
        url: "vistas/CT/ajax/CTMTIAS.ASHX?OPCION=RM&CODE=" + $('#txtCodigo').val() + "&CTLG_CODE=" + $('#cboEmpresa').val(),
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != "" && datos != null) {

                if (datos[0].JSON == "[]") {
                    initJqxGridAsiento(datos[0].JSON);
                    $("#txtMnemonico").val('');
                }
                else {
                    initJqxGridAsiento(JSON.stringify(datos[0].JSON));
                    $("#txtMnemonico").val('');
                }

            }

        },
        error: function (msg) {
            alertCustom("Error al obtener lista de Sub Grupos.");
        }

    });
}

function grabar() {

    var p_NOMBRE = '';
    var p_DESCRIPCION = '';
    var p_ESTADO_IND = '';
    var p_ORDEN = '';
    var p_USUA_ID = '';

    if (vErrors(["txtMarca"])) {

        p_NOMBRE = $('#txtNombre').val();
        p_DESCRIPCION = $.trim($('#txtMarca').val());
        p_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        p_ORDEN = $('#txtOrden').val();
        p_USUA_ID = $.trim($('#ctl00_lblusuario').html());

        Bloquear("ventana");

        $.post("vistas/CT/ajax/CTMTIAS.ASHX", {
            OPCION: "CM",
            NOMBRE: p_NOMBRE,
            DESCRIPCION: p_DESCRIPCION,
            ESTADO_IND: p_ESTADO_IND,
            ORDEN: p_ORDEN,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe el tipo de asiento ingresado.");
                } else if (res == "ORDEN_DUP"){
                    alertCustom("Ya existe el número de orden ingresado.");
                } else {
                    $('#txtCodigo').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");

                    initSubGrupos();
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}

function actualizar() {

    var p_CODE = '';
    var p_NOMBRE = '';
    var p_DESCRIPCION = '';
    var p_ESTADO_IND = '';
    var p_ORDEN = '';
    var p_USUA_ID = '';

    if (vErrors(["txtMarca"])) {

        p_CODE = $.trim($('#txtCodigo').val());
        p_NOMBRE = $('#txtNombre').val();
        p_DESCRIPCION = $.trim($('#txtMarca').val());
        p_ESTADO_IND = $('#chkEstado').is(':checked') ? 'A' : 'I';
        p_ORDEN = $('#txtOrden').val();
        p_USUA_ID = $.trim($('#ctl00_lblusuario').html());

        Bloquear("ventana");

        $.post("vistas/CT/ajax/CTMTIAS.ASHX", {
            OPCION: "AM",
            CODE: p_CODE,
            NOMBRE: p_NOMBRE,
            DESCRIPCION: p_DESCRIPCION,
            ESTADO_IND: p_ESTADO_IND,
            ORDEN: p_ORDEN,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe el tipo de asiento ingresado.");
                } else if (res == "ORDEN_DUP") {
                    alertCustom("Ya existe el número de orden ingresado.");
                } else {
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                        $("#grabar").attr("href", "javascript:actualizar();");
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

}

function fillCboEmpresa() {
    var v_Usuario_Session = $('#ctl00_txtus').val();
    $.ajax({
        type: "post",
        url: "vistas/CT/ajax/CTMTIAS.ASHX?OPCION=2&USUA_ID=" + v_Usuario_Session,
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
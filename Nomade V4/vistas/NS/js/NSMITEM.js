var NSLITEM = function () {

    var datatable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBRE" },
                { data: "NOMBRE_SISTEMA" },
                  { data: "DESC_MODULO" },
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

        var table = iniciaTabla("tblBandeja", parms);
        $('#tblBandeja').removeAttr('style');




        $('#tblBandeja tbody').on('click', 'tr', function () {


            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=nsmitem&codigo=' + code;

            }



        });



        $('#tblBandeja tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NS/ajax/NSMITEM.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        table.fnGetData(pos).ESTADO = res;
                        refrescaTabla(table);


                        exito();



                    } else {
                        noexito();
                    }
                });
            $.ajaxSetup({ async: true });

        });


    }
    return {
        init: function () {

            datatable();


        }
    };
}();

var vg_CodEmpresa = "";
var vg_CodForma = "";
var vg_JsonDetalleItem = "";
var vg_JsonForma = "";

var NSMITEM = function () {

    var plugins = function () {

        //aMayuscula(":input");

        $("#slcsistema").select2();
        $("#slcmodulo").select2();
        $("#slcforma").select2();

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "l", "repeat": 50, "greedy": false }); });

    }

    var fillCboSistema = function () {
        $.ajaxSetup({ async: false });
        $.post("vistas/NS/ajax/NSMITEM.ASHX",
            { flag: 4 })
        .done(function (res) {
            $("#slcsistema").html(res);
            $("#slcsistema").select2('val', '');
        })
        .fail(function () {
            alertCustom("Error al obtener lista de Empresa.");
        });
        $.ajaxSetup({ async: true });
    }

    var eventoControles = function () {
        HandlerSistema();
        HandlerForma();
        HandlerJqxgrid();
      
    }

    var cargainicial = function () {

        //cargacombos();
        vg_JsonForma = "[]";
        vg_JsonDetalleItem = "[]";

        $("#slcmodulo").attr("disabled", true);
        $("#s2id_slcmodulo a .select2-chosen").html('');
        $("#slcforma").attr("disabled", true);
        $("#s2id_slcforma a .select2-chosen").html('');

        $('#btnAgregaForma').attr('disabled', true);
        $('#btnAgregaForma').removeAttr('onclick');

        $('#btnEliminarForma').attr('disabled', true);
        $('#btnEliminarForma').removeAttr('onclick');


        initJqxGridForma("[]");

        var cod = ObtenerQueryString("codigo");

        if (cod != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMITEM.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {

                    if (datos[0].JSON_DETAIL == "[]") {
                        vg_JsonDetalleItem = "[]";
                        initJqxGridForma(datos[0].JSON_DETAIL);
                    }
                    else {
                        vg_JsonDetalleItem = JSON.stringify(datos[0].JSON_DETAIL);
                        initJqxGridForma(JSON.stringify(datos[0].JSON_DETAIL));
                    }

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].NOMBRE);
                    $("#slcsistema").select2("val", datos[0].SISTEMA);

                    if (contador > 0) {
                        fillCboSistemaTipo($("#slcsistema :selected").attr("data-tipo"));
                        $("#slcsistema").select2("val", datos[0].SISTEMA);
                        $("#slcsistema").change();
                    }

                    $("#slcmodulo").select2("val", datos[0].MODULO);
                    $("#txtareadescripcion").val(datos[0].DESCRIPCION);
                    
                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
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
            plugins();
            fillCboSistema();
            eventoControles();
            cargainicial();
        }
    };

}();

function HandlerSistema() {
    $('#slcsistema').on('change', function () {

        if (vg_CodEmpresa == "" || vg_CodEmpresa != this.value) {
            $('#btnAgregaForma').attr('disabled', true);
            $('#btnAgregaForma').removeAttr('onclick');
            $('#btnEliminarForma').attr('disabled', true);
            $('#btnEliminarForma').removeAttr('onclick');
            fillCboModulo(this.value);
            fillCboForma(this.value);
            vg_CodEmpresa = this.value;
        }

    });

}


function HandlerForma() {
    $('#slcforma').on('change', function () {

        if (vg_CodForma == "" || vg_CodForma != this.value) {
            $('#btnAgregaForma').attr('disabled', false);
            $('#btnAgregaForma').attr('onclick', 'javascript:addRowJqxgrid();');
            vg_CodForma = this.value;
        }

    });
}

function fillCboModulo(value) {
    $.ajaxSetup({ async: false });
    $.post("vistas/NS/ajax/NSMITEM.ASHX",
        { flag: 5, sist: value })
        .done(function (res) {
            $("#slcmodulo").attr("disabled", false);
            $("#slcmodulo").html(res);
            $("#slcmodulo").select2('val', '');
        })
        .fail(function () {
            alertCustom("Error al obtener lista de Módulo.");
        });
    $.ajaxSetup({ async: true });
}

function fillCboForma(value) {
    var obj = '';
    $.ajaxSetup({ async: false });
    $.post("vistas/NS/ajax/NSMITEM.ASHX",
        { flag: 6, sist: value })
        .done(function (res) {
            $("#slcforma").attr("disabled", false);
            $("#slcforma").html(res);
            $("#slcforma").select2('val', '');

            if ($('#slcforma option').length > 1) {
                obj += '[';
                $('#slcforma option').each(function () {
                    if ($.trim($(this).attr('value')) != "" && $.trim($(this).text()) != "") {
                        obj += '{';
                        obj += '"CODIGO":"' + $(this).attr('value') + '",';
                        obj += '"DESCRIPCION":"' + $(this).text() + '"';
                        obj += '},';
                    }
                });

                obj += '{}';
                obj = obj.replace(',{}', '');
                obj += ']';
            }
            else {
                obj += '[]';
            }

            vg_JsonForma = obj;
            deleteOptionForma();
        })
        .fail(function () {
            alertCustom("Error al obtener lista de Forma.");
        });
    $.ajaxSetup({ async: true });
}

function initJqxGridForma(v_JsonString) {

    $('#jqxgrid').jqxGrid('clear');
    $('#jqxgrid').jqxGrid('clearselection');

    var data = v_JsonString;
    var source = {
        localdata: data,
        datatype: 'json'
    };
    contador = JSON.parse(data).length;
 

    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#jqxgrid').jqxGrid({
        source: dataAdapter,
        width: '100%',
        theme: 'bootstrap',
        autoheight: true,
        showemptyrow: true,
        sortable: true,
        scrollmode: 'logical',
        enabletooltips: true,
        columns: [
            { text: 'CODIGO', datafield: 'CODE', width: '25%', cellsalign: 'center', align: 'center' },
            { text: 'DESCRIPCION', datafield: 'DESCR', width: '75%', cellsalign: 'left', align: 'center' }
        ]
    });

    $('#jqxgrid').jqxGrid('refreshdata');
    $('#btnEliminarForma').attr('disabled', true);
    $('#btnEliminarForma').attr('onclick', 'javascript:;');

}


var contador = 0;
function addRowJqxgrid() {
  
    var ArrayJson;
    var CODE = '';
    var DESCR = '';

    var JsonDetalleItem = vg_JsonDetalleItem;

    if (JsonDetalleItem == "[]") {
        ArrayJson = [];
    }
    else {
        ArrayJson = JSON.parse(JsonDetalleItem);
    }

    if (contador >= 0 && typeof $("#slcsistema :selected").val() != "undefined") {
        var code = $("#slcsistema").val();

        fillCboSistemaTipo($("#slcsistema :selected").attr("data-tipo"));
        $("#slcsistema").select2("val", code);
       // $("#slcsistema").change();
    }
 
    CODE = $.trim($('#slcforma').val());
    DESCR = $.trim($('#slcforma option:selected').html());

    ArrayJson.push({ 'CODE': CODE, "DESCR": DESCR });

    vg_JsonDetalleItem = JSON.stringify(ArrayJson);

    initJqxGridForma(vg_JsonDetalleItem);

    deleteOptionForma();

    $('#btnAgregaForma').attr('disabled', true);
    $('#btnAgregaForma').attr('onclick', 'javascript:;');
}

//Evento elimina una fila de la lista de formas
function deleteRowJqxgrid(v_Index) {
    contador--;

    if (contador == 0) {
        fillCboSistemaTipo("");
        $("#slcsistema").change();
        $("#slcmodulo").attr("disabled", "disabled");
    }

    var ArrayJson;

    var JsonDetalleItem = vg_JsonDetalleItem;

    var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;

    if (v_Index >= 0 && v_Index < rowscount) {
        var id = $("#jqxgrid").jqxGrid('getrowid', v_Index);
        var rows = $('#jqxgrid').jqxGrid('getdisplayrows');
        var rowData = rows[v_Index];
        var CODE = rowData.CODE;

        ArrayJson = JSON.parse(JsonDetalleItem);

        for (var j = 0; j < ArrayJson.length; j++) {
            if (CODE == ArrayJson[j].CODE) {
                ArrayJson.splice(j, 1);
                break;
            }
        }

        vg_JsonDetalleItem = JSON.stringify(ArrayJson);

    }

    deleteOptionForma();

    initJqxGridForma(vg_JsonDetalleItem);
}

function HandlerJqxgrid() {
    $("#jqxgrid").on('rowselect', function (event) {
        var selectedrowindex = event.args.rowindex;

        $('#btnEliminarForma').attr('disabled', false);
        $('#btnEliminarForma').attr('onclick', 'javascript:deleteRowJqxgrid(' + selectedrowindex + ');');

    });
}

function deleteOptionForma() {

    var JsonForma = vg_JsonForma;
    //var JsonDetalleClase = $('#hfJsonDetalleClase').val();
    var JsonDetalleItem = vg_JsonDetalleItem;

    var ArrayJsonForma = JSON.parse(JsonForma);
    var ArrayJsonDetalleItem = JSON.parse(JsonDetalleItem);

    for (var i = 0; i < ArrayJsonDetalleItem.length; i++) {
        for (var j = 0; j < ArrayJsonForma.length; j++) {
            if (ArrayJsonDetalleItem[i].CODE == ArrayJsonForma[j].CODIGO) {
                ArrayJsonForma.splice(j, 1);
                break;
            }
        }
    }

    $('#slcforma').empty();
    $('#slcforma').append('<option></option>');

    for (var i = 0; i < ArrayJsonForma.length; i++) {
        $('#slcforma').append('<option value="' + ArrayJsonForma[i].CODIGO + '">' + ArrayJsonForma[i].DESCRIPCION + '</option>');
    }

    $('#slcforma').select2('val', '');
    vg_CodForma = "";

}

function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_nombre = $('#txtnombre').val();
    var p_sistema = $('#slcsistema').val();
    var p_modulo = $('#slcmodulo').val();
    var p_descripcion = $('#txtareadescripcion').val();
    var p_user = $('#ctl00_lblusuario').html();
    var ArrayJson;
    var JsonDetalleItem;
    var DETAIL = '';
    var DETAIL_COUNT = 0;

    JsonDetalleItem = vg_JsonDetalleItem;

    if (vErrors(["slcsistema", "txtnombre", "slcmodulo"])) {

        if (JsonDetalleItem == "[]") {
            ArrayJson = [];
        }
        else {
            ArrayJson = JSON.parse(JsonDetalleItem);
        }

        for (var i = 0; i < ArrayJson.length; i++) {

            DETAIL += ArrayJson[i].CODE;
            if (i != ArrayJson.length - 1) {
                DETAIL += '|;|';
            }
        }

        DETAIL_COUNT = ArrayJson.length

        Bloquear("ventana");
        var data = new FormData();
        data.append('flag', 2);
        data.append('nomb', p_nombre);
        data.append('user', p_user);
        data.append('acti', p_acti);
        data.append('codi', p_codi);
        data.append('sist', p_sistema);
        data.append('modu', p_modulo);
        data.append('desc', p_descripcion);
        data.append('DETAIL', DETAIL);
        data.append('DETAIL_COUNT', DETAIL_COUNT);

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMITEM.ASHX",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {
                    Desbloquear("ventana");
                    if ($.trim(datos) == "") {
                        alertCustom("No se puede registrar la forma, porque esá asignado a otro Item.");
                    }
                    else {

                        $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                        $("#grabar").attr("href", "javascript:Actualizar();");
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
}

function Crear() {

    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_modulo = $('#slcmodulo').val();
    var p_nombre = $('#txtnombre').val();
    var p_sistema = $('#slcsistema').val();
    var p_descripcion = $('#txtareadescripcion').val();
    var p_user = $('#ctl00_lblusuario').html();
    var ArrayJson;
    var JsonDetalleItem;
    var DETAIL = '';
    var DETAIL_COUNT = 0;

    JsonDetalleItem = vg_JsonDetalleItem;

    if (vErrors(["slcsistema", "txtnombre", "slcmodulo"])) {

        if (JsonDetalleItem == "[]") {
            ArrayJson = [];
        }
        else {
            ArrayJson = JSON.parse(JsonDetalleItem);
        }

        for (var i = 0; i < ArrayJson.length; i++) {

            DETAIL += ArrayJson[i].CODE;
            if (i != ArrayJson.length - 1) {
                DETAIL += '|;|';
            }
        }

        DETAIL_COUNT = ArrayJson.length


        var data = new FormData();
        data.append('flag', 1);
        data.append('nomb', p_nombre);
        data.append('user', p_user);
        data.append('acti', p_acti);
        data.append('sist', p_sistema);
        data.append('modu', p_modulo);
        data.append('desc', p_descripcion);
        data.append('DETAIL', DETAIL);
        data.append('DETAIL_COUNT', DETAIL_COUNT);

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMITEM.ASHX",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {
                    Desbloquear("ventana");
                    if ($.trim(datos) == "") {
                        alertCustom("No se puede registrar la forma, porque esá asignado a otro Item.");
                    }
                    else {
                        $('#txtcodigo').val(datos);
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                        $("#grabar").attr("href", "javascript:Actualizar();");

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
}

var fillCboSistemaTipo = function (tipo) {
    $.ajaxSetup({ async: false });
    $.post("vistas/NS/ajax/NSMITEM.ASHX",
        {
            flag: 7,
            TIPO:tipo
        })
    .done(function (res) {
        $("#slcsistema").html(res);
        $("#slcsistema").select2('val', '');       
    })
    .fail(function () {
        alertCustom("Error al obtener lista de Empresa.");
    });
    $.ajaxSetup({ async: true });
}
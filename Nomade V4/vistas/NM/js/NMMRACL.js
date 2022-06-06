var NMLRACL = function () {

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
                window.location.href = '?f=nmmracl&codigo=' + code + "&empresa=" + $("#ctl00_hddctlg").val();

            }
        });
        

        $('#tblBandeja tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NM/ajax/NMMRACL.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "N") res = "INACTIVO";
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

var contador = 0;
var vg_JsonDetalleItem = "";
var vg_JsonForma = "";
var vg_CodForma = "";

var NMMRACL = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboClaseCliente').select2();
       
    }

    var cargainicial = function () {
        var codigo = ObtenerQueryString('codigo');
        var empresa = ObtenerQueryString('empresa');
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());


        if (codigo != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMRACL.ASHX?codigo=" + codigo + "&empresa=" + empresa,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }
                    //seleccionar la empresa falta
                    $("#txtLista").val(datos[0].NOMBRE);


                    if (datos[0].JSON_DETAIL == "[]") {
                        vg_JsonDetalleItem = "[]";
                        initGridClase(datos[0].JSON_DETAIL);
                    }
                    else {
                        vg_JsonDetalleItem = JSON.stringify(datos[0].JSON_DETAIL);
                        initGridClase(JSON.stringify(datos[0].JSON_DETAIL));
                    }
                },
                error: function (msg) {
                    alert("No se pudo obtener los datos de la list" + msg);
                }
            });
        } else {
            vg_JsonDetalleItem = "[]";
            initGridClase("[]");
            vg_JsonForma = "[]";
        }

        
    }

    var fillClaseCliente = function () {
        
        var obj = '';
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=CLACLIE&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#cboClaseCliente").attr("disabled", false);
                
                $('#cboClaseCliente').html('');
                if (datos != null) {
                    claseClientes = datos;
                    for (var i = 0; i < claseClientes.length; i++) {
                        $('#cboClaseCliente').append('<option value="' + claseClientes[i].CODIGO + '">' + claseClientes[i].DESCRIPCION + '</option>');
                    }
                }
                
                $("#cboClaseCliente").select2('val', '');

                if ($('#cboClaseCliente option').length > 1) {
                    obj += '[';
                    $('#cboClaseCliente option').each(function () {
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
                deleteOptionClase();
            },
            error: function (msg) {
                alertCustom('Ocurrió un error al listar las clases de clientes.');
            }
        });

    };


    var fillCboEmpresa = function () {
        $('#cboEmpresa').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/NA/ajax/NAMINSA.ashx?OPCION=0",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEmpresa').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cboEmpresa').select2();
    }

    var eventoControles = function () {

        var empresaAnterior = "";

        $('#cboClaseCliente').on('change', function () {

            if ($('#cboClaseCliente').val() != undefined) {
                $('#btnAgregaClase').attr('disabled', false);
                $('#btnAgregaClase').attr('onclick', 'javascript:addRow();');
                vg_CodForma = $('#cboClaseCliente').val();
            }

        });
        
        $("#jqxgrid").on('rowselect', function (event) {
            var selectedrowindex = event.args.rowindex;

            $('#btnEliminarClase').attr('disabled', false);
            $('#btnEliminarClase').attr('onclick', 'javascript:deleteRowJqxgrid(' + selectedrowindex + ');');

        });

        
        

        //$('#cbo_Empresa').on('change', function () {
        //    if ($(this).val() != empresaAnterior) {
        //        fillClaseCliente();
        //        //fillClaseCliente($('#cbo_Empresa').val());

        //        if (ObtenerQueryString("codigo") == undefined) {
        //            //fillTxtCliente("#txtClientes", "");
        //            //fillTxtResponsablePago();
        //        }
        //        else {
        //            //asincrono = false;
        //            //fillTxtCliente("#txtClientes", "");
        //            //fillTxtResponsablePago();
        //            //asincrono = true;
        //        }
        //        empresaAnterior = $(this).val();
        //    }
        //});
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargainicial();
            fillClaseCliente();
            eventoControles();

        }
    };

}();



function addRow() {

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

    CODE = $.trim($('#cboClaseCliente').val());
    DESCR = $.trim($('#cboClaseCliente option:selected').html());

    ArrayJson.push({ 'CODE': CODE, "DESCR": DESCR });

    vg_JsonDetalleItem = JSON.stringify(ArrayJson);

    initGridClase(vg_JsonDetalleItem);

    deleteOptionClase();

    $('#btnAgregaClase').attr('disabled', true);
    $('#btnAgregaClase').attr('onclick', 'javascript:;');
}

function initGridClase(v_JsonString) {

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
    $('#btnEliminarClase').attr('disabled', true);
    $('#btnEliminarClase').attr('onclick', 'javascript:;');

}

//Evento elimina una fila de la lista de formas
function deleteRowJqxgrid(v_Index) {
    contador--;

    //if (contador == 0) {
    //    fillCboSistemaTipo("");
    //    $("#slcsistema").change();
    //    $("#slcmodulo").attr("disabled", "disabled");
    //}

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

    deleteOptionClase();

    initGridClase(vg_JsonDetalleItem);
}


function deleteOptionClase() {

    var JsonForma = vg_JsonForma;
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

    $('#cboClaseCliente').empty();
    $('#cboClaseCliente').append('<option></option>');

    for (var i = 0; i < ArrayJsonForma.length; i++) {
        $('#cboClaseCliente').append('<option value="' + ArrayJsonForma[i].CODIGO + '">' + ArrayJsonForma[i].DESCRIPCION + '</option>');
    }

    $('#cboClaseCliente').select2('val', '');
    vg_CodForma = "";

}

function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'S' : 'N';
    var p_codi = $('#txtcodigo').val();
    var p_ctlg = $('#cboEmpresa').val();
    var p_lista = $("#txtLista").val();
    var p_user = $('#ctl00_lblusuario').html();


    var ArrayJson;
    var JsonDetalleItem;
    var DETAIL = '';
    var DETAIL_COUNT = 0;

    JsonDetalleItem = vg_JsonDetalleItem;
    

    if (vErrors(["cboEmpresa", "txtLista"])) {

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
        data.append('ctlg', p_ctlg);
        data.append('list', p_lista);
        data.append('codi', p_codi);
        data.append('acti', p_acti);
        data.append('user', p_user);
        data.append('DETAIL', DETAIL);
        data.append('DETAIL_COUNT', DETAIL_COUNT);

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/nmmracl.ASHX",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {
                    Desbloquear("ventana");
                    if ($.trim(datos) == "") {
                        alertCustom("No se pudo registrar correctamente");
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

    var p_acti = $('#chkactivo').is(':checked') ? 'S' : 'N';
    var p_ctlg = $('#cboEmpresa').val();
    var p_lista = $("#txtLista").val();
    var p_user = $('#ctl00_lblusuario').html();
    
    
    var ArrayJson;
    var JsonDetalleItem;
    var DETAIL = '';
    var DETAIL_COUNT = 0;

    JsonDetalleItem = vg_JsonDetalleItem;

    if (vErrors(["cboEmpresa", "txtLista"])) {

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
        data.append('ctlg', p_ctlg);
        data.append('list', p_lista);
        data.append('acti', p_acti);
        data.append('user', p_user);
        data.append('DETAIL', DETAIL);
        data.append('DETAIL_COUNT', DETAIL_COUNT);

        Bloquear("ventana");

        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/nmmracl.ASHX",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {
                    Desbloquear("ventana");
                    if ($.trim(datos) == "") {
                        alertCustom("El tipo de cliente ya ha sido asgnado a otra lista");
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

function Cancelar() {
    window.location.href = '?f=NMMRACL';
}

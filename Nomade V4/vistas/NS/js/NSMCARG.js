function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_desc = $('#txtdescripcion').val();
    var p_nive = $('#slcnivel').val();
    var p_user = $('#ctl00_lblusuario').html();
  
    var p_item;

    if ($("#itemselim").val().substring($("#itemselim").val().length - 1) == ";") {
        p_item = $("#itemselim").val().substring($("#itemselim").val().length - 1, "");

    } else p_item = $("#itemselim").val();


    if (vErrors(["txtdescripcion"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMCARG.ASHX", {
            flag: 2,
            user: p_user,
            acti: p_acti,
            codigo: p_codi,
            desc: p_desc,
            nive: p_nive,
            
            deta: p_item
        },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    var lista_actual="";
                    for (var i = 0; i < $("#jqxgrid").jqxGrid('getboundrows').length; i++) {
                        lista_actual += $("#jqxgrid").jqxGrid('getboundrows')[i].codigo + ",A";
                        if (i < $("#jqxgrid").jqxGrid('getboundrows').length - 1) { lista_actual += ";";}
                    }

                    $("#itemactls").val(lista_actual);
                    $("#itemselim").val("");

                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_desc = $('#txtdescripcion').val();
    var p_nive = $('#slcnivel').val();
    var p_user = $('#ctl00_lblusuario').html();
 
    var p_item;
    if ($("#itemselim").val().substring($("#itemselim").val().length - 1) == ";") {
        p_item = $("#itemselim").val().substring($("#itemselim").val().length - 1, "");

    } else p_item = $("#itemselim").val();

    if (vErrors(["txtdescripcion"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMCARG.ASHX", {
            flag: 1,
            user: p_user,
            acti: p_acti,
            desc: p_desc,
            nive: p_nive,
      
            deta: p_item
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $('#txtcodigo').val(res);
                    $("#itemactls").val($("#itemselim").val());
                    $("#itemselim").val("");

                } else {
                    noexito();
                }
            });
    }
}



function reordena() {
    var rows = $('#jqxgrid').jqxGrid('getrows').length;
    for (var i = 0; i < rows; i++)
    { $('#jqxgrid').jqxGrid('setcellvalue', i, "itemtbl", i + 1); }

}




var NSMCARG = function () {


    var cargacombos = function () {
        $.ajaxSetup({ async: false });

        $.post("vistas/NS/ajax/NSMCARG.ASHX", { flag: 4 },
            function (res) {
                if (res != "error") {
                    $("#slcrol").html("");
                    $("#slcrol").html(res);
                    $("#slcrol").select2();
                }


            });
        $.ajaxSetup({ async: true });

        $("#slcnivel").select2();

    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;

    

    var cargainicial = function () {

        $("#btnagregarol").click(
            function () {

                if (vErrors("slcrol")) {
                    var rows = $('#jqxgrid').jqxGrid('getrows').length;

                    var row = {};
                    row["itemtbl"] = rows + 1;
                    row["rol"] = $("#slcrol option[value=" + $("#slcrol").val() + "]").html();
                    row["codigo"] = $("#slcrol").val();


                    $("#jqxgrid").jqxGrid('addrow', null, row);

                   
                    
                    var itemsactl = $("#itemactls").val();
                    var id = $("#slcrol").val();
                    var items = $("#itemselim").val();
                    if (itemsactl.indexOf(id) >= 0) {//existe en la lista actual

                        if (items.indexOf(id) >= 0) { // existe en la lista de eliminados y n l actual lo deja igual
                            items = items.replace(items.substring(items.indexOf(id), items.indexOf(id) + 7), (""));
                        } else {//sino agrega

                            items += (id + "," + "A;");
                        }

                    } else {
                        items += id + "," + "A;";
                    }


                    $("#itemselim").val(items);


                    $("#slcrol option[value=" + $("#slcrol").val() + "]").remove();
                    $("#slcrol").select2("val", "");
                }
            });


        $("#delrowprop").click(function () {

            var cells = $('#jqxgrid').jqxGrid('getselectedrowindexes');
        
            var rowIDs = new Array();
    
            for (var i = 0; i < cells.length;i++){
               
                var n=cells[i];
          
                var rowrid = $('#jqxgrid').jqxGrid('getrowid', n);

                rowIDs.push(rowrid);

                var id = $('#jqxgrid').jqxGrid('getcellvalue',n , "codigo");;

                var rol=$('#jqxgrid').jqxGrid('getcellvalue', n, "rol");

                var itemsactl = $("#itemactls").val();
                var items = $("#itemselim").val();;
                //los que se eliminen estaran activos
                if (itemsactl.indexOf(id) >= 0) {//existe en la lista actual

                    if (items.indexOf(id) >= 0) { // existe en la lista de eliminados y n l actual lo deja igual
                        items = items.replace(items.substring(items.indexOf(id), items.indexOf(id) + 7), (""));
                    } else {//sino agrega

                        items += (id + "," + "I;");
                    }

                } else { items = items.replace(items.substring(items.indexOf(id), items.indexOf(id) + 7), ("")); }
               

                $("#itemselim").val(items);

                $("#slcrol").append("<option value=\"" + id + "\">" + rol + "</option>");
                      
               
            }


         
            // delete the first and second rows.
            var commit = $("#jqxgrid").jqxGrid('deleterow', rowIDs);
   

            $('#jqxgrid').jqxGrid('clearselection');

            reordena();
          

        });



        var cod = ObtenerQueryString("codigo");

        if (cod != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMCARG.ASHX?codigo=" + cod + "&flag=9",
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);


                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    $("#slcnivel").select2("val",datos[0].NIVEL[0]);

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                   

                    var data = datos[0].DETALLE;
                    var items = "";
                    for (var i = 0; i < data.length; i++) {
                        var rows = $('#jqxgrid').jqxGrid('getrows').length;
                        if (data[i].estado[0] == "A") {
                            var row = {};
                            row["itemtbl"] = rows + 1;
                            row["rol"] = data[i].rol;
                            row["codigo"] = data[i].codigo;
                            row["estado"] = data[i].estado;

                            items += data[i].codigo + "," + data[i].estado[0] + ";";

                            $("#jqxgrid").jqxGrid('addrow', null, row);
                            $("#slcrol option[value=" + datos[0].DETALLE[i].codigo + "]").remove();
                        }
                    }

                    $("#itemactls").val(items);
                   
                },
                error: function (msg) {

                    alert(msg);
                }


            });


        }

    }


    var datagrid = function () {


        var data = new Array();

        var source =
        {
            localdata: data,
            datatype: "array",
            addrow: function (rowid, rowdata, position, commit) {
                commit(true);
            },
            deleterow: function (rowid, commit) {
                commit(true);
            },
            updaterow: function (rowid, newdata, commit) {
                commit(true);
            },

            datafields:
            [
                { name: 'itemtbl', type: 'string' },
                { name: 'rol', type: 'string' },
                { name: 'estado', type: 'string' },
   
            ]
        };


        var dataAdapter = new $.jqx.dataAdapter(source);



        // initialize jqxGrid
        $("#jqxgrid").jqxGrid(
        {
            source: dataAdapter,
            editable: true,
            selectionmode: 'multiplerows',
            editmode: 'selectedrow',
            editable: false,
            width: '100%',
            theme: 'bootstrap',
            columnsresize: true,
            autoheight: true,
            columns: [
              { text: 'ITEM', align: 'center', columntype: 'text', width: '20%', datafield: 'itemtbl',  cellsalign: 'center' },
              { text: 'ROL', align: 'center', datafield: 'rol', columntype: 'text', width: '80%' },
             
               

            ]
        });


        $('#jqxgrid').jqxGrid({ showemptyrow: true });
    }


    var plugins = function () {

        aMayuscula(":input");

        $('#txtdescripcion').focus(function () {

            $(this).inputmask({ "mask": "L", "repeat": 50, "greedy": false });
        });

    }

    return {
        init: function () {
         
            if (ObtenerQueryString("f").substring(2, 3) == "m") { datagrid(); }
           cargacombos();
            cargainicial();
            plugins();

        }
    };

}();

var NSLCARG = function () {

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
                { data: "DESCRIPCION" },
                { data: "NIVEL" },
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

        var table = iniciaTabla("tblBandeja",parms);
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
                    var code =row.CODIGO;
                    window.location.href = '?f=nsmcarg&codigo=' + code;
                }

            });



            $('#tblBandeja tbody').on('click', 'a', function () {

                $(this).parent().parent().addClass('selected');

              
                var pos = table.api(true).row($(this).parent().parent()).index();
                var row = table.fnGetData(pos);
                var cod = row.CODIGO;

                Bloquear("ventana");
                $.ajaxSetup({ async: false });
                $.post("vistas/NS/ajax/NSMCARG.ASHX", { flag: 3, codigo: cod },
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
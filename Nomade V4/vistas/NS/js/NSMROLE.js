function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_desc = $('#txtdescripcion').val();
    var p_come = $('#txtareacomentario').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_clas = obtenerRegClases();
    var p_item ;

    if ($("#itemscch").val().substring($("#itemscch").val().length - 1) == ";") {
        p_item = $("#itemscch").val().substring($("#itemscch").val().length - 1, "");

    } else p_item = $("#itemscch").val();
   

    if (vErrors(["txtdescripcion"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMROLE.ASHX", {
            flag: 2,
            user: p_user,
            acti: p_acti,
            codigo: p_codi,
            desc: p_desc,
            come: p_come,
            clas: p_clas,
            item: p_item
        },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_desc = $('#txtdescripcion').val();
    var p_come = $('#txtareacomentario').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_clas = obtenerRegClases();
    var p_item;
    if ($("#itemscch").val().substring($("#itemscch").val().length - 1) == ";") {
        p_item = $("#itemscch").val().substring($("#itemscch").val().length - 1, "");

    } else p_item = $("#itemscch").val();

    if (vErrors(["txtdescripcion"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMROLE.ASHX", {
            flag: 1,
            user: p_user,
            acti: p_acti,
            desc: p_desc,
            come: p_come,
            clas: p_clas,
            item: p_item
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $('#txtcodigo').val(res);
                    vistaArbol(res);
                } else {
                    noexito();
                }
            });
    }
}


function obtenerRegClases() {
    var rows = $('#jqxgrid').jqxGrid('getrows').length;
    var stringfinal = "";

    for (var i = 0; i < rows; i++) {

        stringfinal += $('#jqxgrid').jqxGrid('getcellvalue', i, "item") + ",";
        stringfinal += $('#jqxgrid').jqxGrid('getcellvalue', i, "codigo")+ ",";
        stringfinal += $('#jqxgrid').jqxGrid('getcelltext', i, "fecha_inicio") + ",";
        if ($('#jqxgrid').jqxGrid('getcelltext', i, "fecha_fin") == null)
        { stringfinal += "" + ","; }
        else { stringfinal += $('#jqxgrid').jqxGrid('getcelltext', i, "fecha_fin") + ","; }
        stringfinal += $('#jqxgrid').jqxGrid('getcellvalue', i, "estado")[0];
        if (i < rows - 1) {
            stringfinal += ";";
        } 
    }
   
    return stringfinal;

}

flag1 = false;
flag2 = false;
function marcarTodaFila() {

    var items = $("#itemscch").val();
  

    $("#colVer").click(function () {

        if (flag1) { $(".ver input").click(); flag1=false;}//si todos estan con check 
        else {
            for (var i = 0; i < $(".ver input").length; i++)
                if (!$($(".ver input")[i]).is(':checked')) { $($(".ver input")[i]).click(); flag1 = true; };//todos con check
            if (!flag1) { $(".ver input").click(); flag1 |= 1; }
        }
    });

    $("#colEditar").click(function () { 
        if (flag2) { $(".editar input").click(); flag2 = false; } else {

            for (var i = 0; i < $(".editar input").length; i++)
                if (!$($(".editar input")[i]).is(':checked')) { $($(".editar input")[i]).click(); flag2 = true; };
            if (!flag2) { $(".ver input").click(); flag2 |=1;}
        }
     });
}

function listasselect() {

    $(".item").click(function () {
        //if ($(this).hasClass('selected')) {
        //    $(this).removeClass('selected');

        //}
        //else {

            $("#" + $(this).parent("div").attr("id") + " .item").removeClass('selected');
            $(this).addClass('selected');
      //  }
    });

}

var divactual = "";
var divid;

function leerTodos() {
    

    var total = divactual == "divmodulos" ? 1 : $("#divmodulos p").attr("valor") == undefined ? 0 : $("#divmodulos p").length;
    for (var i = 0; i < total; i++) {
        if (divactual == "divmodulos") {
            divid.trigger("click", "RD");
        } else {
            $($("#divmodulos p")[i]).trigger("click", "RD");
        }
      
    }

}

function editarTodos() {
   
    var total = divactual == "divmodulos" ? 1 : $("#divmodulos p").attr("valor") == undefined ? 0 : $("#divmodulos p").length;
    for (var i = 0; i < total; i++) {
        if (divactual == "divmodulos") {
            divid.trigger("click", "WR");
        } else {
            $($("#divmodulos p")[i]).trigger("click", "WR");
        }
    }
}

function quitarTodos() {
    var total = divactual == "divmodulos" ? 1 : $("#divmodulos p").attr("valor") == undefined ? 0 : $("#divmodulos p").length;
    for (var i = 0; i < total; i++) {
        if (divactual == "divmodulos") {
            divid.trigger("click", "DL");
        } else {
            $($("#divmodulos p")[i]).trigger("click", "DL");
        }
    }

}

function cargaMenu(div) {
    $("#" + div + " p.item").bind("contextmenu",
               function (e) {

                   $("#menuPermisos").css({'left': e.pageX, 'top': e.pageY, 'display':'none' }).slideDown();
                   $(this).trigger("click");

                   divactual = $(this).parent().parent().parent().attr("id");
                   divid = $(this);

                   return false;
               });
}

var NSMROLE = function () {


    var cargacombos = function () {
        $.ajaxSetup({ async: false });

        $.post("vistas/NS/ajax/NSMROLE.ASHX", { flag: 5},
            function (res) {
                if (res != "error") {
                    $("#slcclase").html("");
                    $("#slcclase").html(res);
                    $("#slcclase").select2();
                }
            });
        $.ajaxSetup({ async: true });



        $.ajaxSetup({ async: false });

        $.post("vistas/NS/ajax/NSMROLE.ASHX", { flag: 6 },
            function (res) {
                if (res != "error") {
                 
                    $("#sistlist").html(res);
                    listasselect();


                    $("#sistlist .item").click(function () {


                        $.post("vistas/NS/ajax/NSMROLE.ASHX", { flag: 7, sist: $("#sistlist .selected").attr("valor") },
                            function (res2) {
                                if (res2 != "error") {
                                    $("#modulist").html("");
                                    $("#modulist").html(res2);
                                    $("#itemlist").html("<p class=\"item\">SELECCIONE MODULO...</p>");
                                    listasselect();
                            
                                    cargaMenu("modulist");

                                    $("#modulist .item").click(function (event,carga) {

                           

                                        $.post("vistas/NS/ajax/NSMROLE.ASHX", { flag: 8, sist: $("#sistlist .selected").attr("valor"), modl: $("#modulist .selected").attr("valor") },
                                            function (res3) {
                                                if (res3 != "error") {
                                                    $("#itemlist").html("");
                                                    $("#itemlist").html(res3);

                            

                                                    var items=$("#itemscch").val();
                                                    if ( items != "") {
                                                        var items2=items.split(";");
                                                        for (var i = 0; i < items2.length ; i++) {
                                                            var items3 = items2[i].split(",");

                                                            if (items3[1] == "L")
                                                            { $("#" + items3[0] + " .ver input").attr("checked", true); }
                                                            if (items3[1] == "E")
                                                            { $("#" + items3[0] + " .editar input").attr("checked", true); }
                                                             

                                                        }

                                                    }

                                                    $(".ver").children("input").change(
                                                        function (event) {
                                                            var items = $("#itemscch").val(); 
                                                            var id = $(this).parent().parent().attr("id");

                                                            if ($('#' + id + " .editar input").is(':checked') && $(this).is(':checked')) {
                                                                $('#' + id + " .editar input").attr("checked", false); 
                                                            }


                                                            if ($(this).is(':checked')) {

                                                                if (items.indexOf(id) >= 0) { //actualiza

                                                                    items=items.replace(items.substring(items.indexOf(id), items.indexOf(id) + 7), (id + "," + "L;"));
                                                                                                                                                                       
                                                                } else { //crea

                                                                    items += id + "," + "L;";

                                                                }
                                                                $("#itemscch").val(items);
                                                             
                                                            } else {
                                                                
                                                                if (items.indexOf(id) >= 0) {
                                                                    items=items.replace(items.substring(items.indexOf(id), items.indexOf(id) + 7), "");
                                                                }
                                                                $("#itemscch").val(items);
                                                            }

                                                        });
                                                    $(".editar").children("input").change(
                                                        function (event) {
                                                            var items = $("#itemscch").val();
                                                            var id = $(this).parent().parent().attr("id");
                                                            if ($('#' + id + " .ver input").is(':checked') && $(this).is(':checked')) {
                                                                $('#' + id + " .ver input").attr("checked", false);
                                                            }


                                                            if ($(this).is(':checked')) {

                                                                if (items.indexOf(id) >= 0) {
                                                                    items=items.replace(items.substring(items.indexOf(id), items.indexOf(id) + 7), (id + "," + "E;"));
                                                                   
                                                                } else {

                                                                    items += id + "," + "E;";

                                                                }

                                                                $("#itemscch").val(items);

                                                            } else {

                                                                if (items.indexOf(id) >= 0) {
                                                                    items=items.replace(items.substring(items.indexOf(id), items.indexOf(id) + 7), "");
                                                                }
                                                                $("#itemscch").val(items);
                                                            }


                                                        });

                                                    listasselect();

                                                    if (carga == "RD") {

                                                        for (var i = 0; i < $(".ver input").length;i++)
                                                        if (!$($(".ver input")[i]).is(':checked')) $($(".ver input")[i]).click();
                                                      //  $(".ver input").click();

                                                    }

                                                    if (carga == "WR") {
                                                        for (var i = 0; i < $(".editar input").length; i++)
                                                        if (!$($(".editar input")[i]).is(':checked')) $($(".editar input")[i]).click();
                                                      //  $(".editar input").click();

                                                    }

                                                    if (carga == "DL") {
                                                        for (var i = 0; i < $(".ver input").length; i++)
                                                            if ($($(".ver input")[i]).is(':checked')) $($(".ver input")[i]).click();
                                                        for (var i = 0; i < $(".editar input").length; i++)
                                                            if ($($(".editar input")[i]).is(':checked')) $($(".editar input")[i]).click();
                                                    }

                                                } else { $("#itemlist").html("<p class=\"item\">SIN ITEMS...</p>"); }

                                            });
                                    });




                                } else {

                                    $("#modulist").html("<p class=\"item\">SIN MODULOS...</p>");
                                }

                            });



                    });

                }


            });
        $.ajaxSetup({ async: true });



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

       

        cargaMenu("sistlist");
        marcarTodaFila();

        $("#btnagregaclase").click(
            function () {
               
                if (vErrors("slcclase")) {
                    var rows = $('#jqxgrid').jqxGrid('getrows').length;

                    var row = {};
                    row["item"] = rows + 1;
                    row["clase"] = $("#slcclase option[value=" + $("#slcclase").val() + "]").html();
                    row["fecha_inicio"] = today;
                    row["fecha_fin"] = "";
                    row["estado"] = "ACTIVO";
                    row["codigo"] = $("#slcclase").val();

                    $("#jqxgrid").jqxGrid('addrow', null, row);

                    $("#slcclase option[value=" + $("#slcclase").val() + "]").remove();
                    $("#slcclase").select2("val","");
                }
            });

        

        var cod = ObtenerQueryString("codigo");
        
        if (cod != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMROLE.ASHX?codigo=" + cod+"&flag=9" ,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);
                    vistaArbol(datos[0].CODIGO);
                
                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    $("#txtareacomentario").val(datos[0].COMENTARIO);

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    if (datos[0].ITEMS != "") {
                        $("#itemscch").val(datos[0].ITEMS + ";");
                    }

                    var data = datos[0].CLASES;

                    for (var i = 0; i < data.length; i++) {
                        $("#jqxgrid").jqxGrid('addrow', null, data[i]);
                        $("#slcclase option[value=" + datos[0].CLASES[i].codigo + "]").remove();
                     }
                },
                error: function (msg) {

                    alert(msg);
                }


            });


        }

    }


    var datagrid = function () {

        var estados =
       [
           "ACTIVO", "INACTIVO"
       ];


            var data = new Array();

            var source =
            {
                localdata: data,
                datatype: "array",
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failder.
                    commit(true);
                },

                datafields:
                [
                    { name: 'item', type: 'string' },
                    { name: 'clase', type: 'string' },
                    { name: 'fecha_inicio', type: 'string' },
                    { name: 'fecha_fin', type: 'string' },
                    { name: 'estado', type: 'string' }
                ]
            };


            var dataAdapter = new $.jqx.dataAdapter(source);


     
        // initialize jqxGrid
        $("#jqxgrid").jqxGrid(
        {
            source: dataAdapter,
            editable: true,
            selectionmode: 'singlerow',
            editmode: 'selectedrow',
            width: '100%',
            theme: 'bootstrap',
            columnsresize: true,
            autoheight:true,
            columns: [
              { text: 'ITEM', align: 'center', columntype: 'text', width: '5%', datafield: 'item', editable: false, cellsalign: 'center' },
              { text: 'CLASE', align: 'center', datafield: 'clase', columntype: 'text', width: '35%', editable:false},
              {
                  text: 'FECHA INICIO', datafield: 'fecha_inicio', width: '20%', columntype: 'datetimeinput', cellsalign: 'center', align: 'center',  cellsformat: 'dd/MM/yyyy'
                  //validation: function (cell, value) {
                  //    if (value == null)
                  //        return { result: false, message: "El campo fecha inicio no puede ser vacío" };

                  //    var year = value.getFullYear();
                  //    if (year < 2014) {
                  //        return { result: false, message: "La fecha no puede ser anterior a 01/01/2014" };
                  //    }
                  //    return true;
                  //}
              },
              {
                  text: 'FECHA FIN', datafield: 'fecha_fin', columntype: 'datetimeinput', editable:false, width: '20%', cellsalign: 'center', align: 'center',  cellsformat: 'dd/MM/yyyy',
                  validation: function (cell, value) {
               
                      if (value == null) return true;

                      else {
                          var year = value.getFullYear();
                          if (year >= 2100 || year < 2014) {
                              return { result: false, message: "Fecha no válida" };
                          }
                      }
                      return true;
                  }
              },
               {
                   text: 'ESTADO', align: 'center', datafield: 'estado', cellsalign: 'center', columntype: 'dropdownlist',
                   initeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                       editor.jqxDropDownList({ source: estados });
                      
                   },
               }
              
            ]
        });


        $("#jqxgrid").on('cellendedit', function (event) {
            var column = args.datafield;
            var row = args.rowindex; var value = args.value;
            var oldvalue = args.oldvalue;
           
            if (column == "estado" && oldvalue=="ACTIVO" && value=="INACTIVO") {
                $('#jqxgrid').jqxGrid('setcellvalue', row, "fecha_fin", today);
            } else if (column == "estado" && oldvalue == "INACTIVO" && value == "ACTIVO") {
                $('#jqxgrid').jqxGrid('setcellvalue', row, "fecha_fin", "");
            }

            if (column == "fecha_inicio") {
                if ($('#jqxgrid').jqxGrid('getcellvalue', row, "fecha_inicio") == null) {
                    alertCustom("Fecha de inicio no puede ser vacío!");
                    $("#jqxgrid").jqxGrid('begincelledit', row, "fecha_inicio");
                }
            }
        });

        $('#jqxgrid').jqxGrid({ showemptyrow: true });
    }


    var plugins=function(){
    
        aMayuscula(":input");
        $('#txtdescripcion').focus(function () { $(this).inputmask({ "mask": "P", "repeat": 60, "greedy": false }); })
    
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

var NSLROLE = function () {

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
                { data: "COMENTARIO" },
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
                    window.location.href = '?f=nsmrole&codigo=' + code;
                }



            });
        

    
            $('#tblBandeja tbody').on('click', 'a', function () {
                $(this).parent().parent().addClass('selected');


                var pos = table.api(true).row($(this).parent().parent()).index();
                var row = table.fnGetData(pos);
                var cod = row.CODIGO;

                Bloquear("ventana");
                $.post("vistas/NS/ajax/NSMROLE.ASHX", { flag: 3, codi: cod },
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


            });
        

    }

    return {
        init: function () {
            datatable();

        }
    };
}();


function vistaArbol(code) {
  
    $.ajax({
        type: "POST",
        url: "vistas/NS/ajax/NSMROLE.ASHX?codigo=" + code + "&flag=10",
        contentType: "application/json;",
        dataType: "json",
        async:false,
        success: function (datos) {

            
            $('#jqxTree')
                .jqxTree({ source: datos, 
                    height: '200px', width: '99%',               
                    easing: 'easeInOutCirc',
                    toggleMode: 'click'
                    //checkboxes: true,
                    //incrementalSearch: true,
                    //hasThreeStates: true
                })
                .jqxTree('expandItem', $("#jqxTree li li")[0])
            ;
            
            //for(var i=0;i<datos.length;i++){
            //    $("#sistlist p[valor=" + datos[i].id + "]").addClass("conItems");
            //}
        }
    
    });


}

function imprimirRolCompleto() {
    $('#jqxTree').jqxTree('expandAll');
    var lista = $("#panelContentpaneljqxTree").html();
    $('#jqxTree').jqxTree('collapseAll');
    $("#ventana").parent().append('<div id="imprimirRol"></div>');
    $("#imprimirRol").html(lista).addClass("info_print");
    imprimirDiv("imprimirRol", "ROL DE "+$("#txtdescripcion").val());
    $('#jqxTree').jqxTree('expandItem', $("#jqxTree li li")[0]);
}
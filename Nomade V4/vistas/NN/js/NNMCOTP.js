
var oTableConcepto;
var oTableConceptPla;
seleccionados = [], posSeleccionados = [], posSeleccionadosCxP =[],seleccionadosCxP=[];
//s

var NNMCOTP = function () {
    var plugins = function () {
        $('#cboTipoPlanilla').select2();
        $('#cboGrupoConcepto').select2();
    }


    var eventoControles = function () {
        $('#cboGrupoConcepto').on('change', function () {
            posSeleccionadosCxP = [];
            seleccionadosCxP = [];
            posSeleccionados = [];
            seleccionados = [];

            listaConceptos();
            listaConcepTipla();
        });


    

        $('#btnAddConcep').on('click', function () {
           
            $("#modal_add").modal("show");
            $("#cboGrupoConcepto").select2("val", "AF").change();
        });

        
        $('#btnClose').on('click', function () {

            CargaEstructuraPlanilla();
        });
        
        $('#btnActualizar').on('click', function () {

            CargaEstructuraPlanilla();
        });
        

        $("#btnSelecc").on("click", function () {

            if ($('#btnSelecc').attr('disabled') != 'disabled') {
                if ($('#cboTipoPlanilla').val() != "" ) {

                    posSeleccionadosCxP = [];
                    seleccionadosCxP = [];
                    posSeleccionados = [];
                    seleccionados = [];

                    if ($('#cboTipoPlanilla option:selected').attr("tipo") == "R") {
                        $("#div_grupo_concepto").css("display", "block")
                        $("#legend_1").text("Conceptos Adicionales por asignar")
                        $("#legend_2").text("Conceptos Adicionales Asignados")
                        $("#cboGrupoConcepto").select2("val", "AF").change()
                        listaConceptos();
                       
                    } 

                    if ($('#cboTipoPlanilla option:selected').attr("tipo") == "B") {
                        $("#legend_1").text("Conceptos por asignar")
                        $("#legend_2").text("Conceptos Asignados")
                        $("#div_grupo_concepto").css("display","none")
                        ListaTotalConceptos();
                       
                    }
                  
                   // listaConcepTipla();
                   
                    CargaEstructuraPlanilla();
                    $('#tablas').slideDown();
                    $('#btnCancelar').removeAttr('disabled');
                    $('#btnSelecc').attr('disabled', 'disabled');
                    $('#cboTipoPlanilla').attr('disabled', 'disabled');
                  

                } else {
                    alertCustom("Seleccione Tipo de Planilla");
                }
            }

        });


        $("#btnCancelar").on("click", function () {
            if ($('#btnCancelar').attr('disabled') != 'disabled') {
                $('#tablas').slideUp();
                $('#btnSelecc').removeAttr('disabled');
                $('#btnCancelar').attr('disabled', 'disabled');
                $('#cboTipoPlanilla').removeAttr('disabled');

            }
        });



    }

    var CargaEstructuraPlanilla = function () {

        Bloquear("ventana")
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcotp.ashx?OPCION=7",
            async: true,
            success: function (datos) {
                if (!isEmpty(datos)) {


                    $("#divPlanillas").html(datos);


                }
                Desbloquear("ventana")

            },
            error: function (msg) {
                Desbloquear("ventana")
                alertCustom2("Error lsitar estructura de la planilla")
            }
        });


    }

    var fillConceptos = function () {
        var parms = {
            data: null,
            order: [[2, 'asc']],
            info: false,
            paging: false,
            scrollY: '25vh',
            scrollCollapse: true,
            columns: [
                           {
                               data: null,
                               defaultContent: '<input type="checkbox" class="check" />',
                               createdCell: function (td, cellData, rowData, row, col) {

                                   $(td).attr('align', 'center')

                               }
                           },

                          {
                              data: "CODE",
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).attr('align', 'center');
                                  $(td).attr('style', 'display:none');
                              }

                          },
                          {
                              data: "CODE_PLAN",
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).attr('align', 'center');
                              }
                          },
                             {
                                 data: "DESCRIPCION",
                                 createdCell: function (td, cellData, rowData, row, col) {
                                     $(td).attr('align', 'center');
                                 }
                             }
            ]

        }

        $(".display.DTTT_selectable.dataTable.no-footer").removeAttr("style");
        oTableConcepto = $("#tbl_Conceptos").dataTable(parms)
        $($("#tbl_Conceptos_wrapper div.span6")[0]).html('<button type="button" class="btn green agregar"><i class="icon-plus"></i></button>');

        $($("#tbl_Conceptos_wrapper div.span6")[0]).attr("class", "span2")
        $("#tbl_Conceptos_wrapper div.span6").attr("class", "span10")

        $(".dataTables_filter").css("color","white")

        $('.agregar').click(function () {
            $('.agregar').blur();
            if (!seleccionados.length == 0) {
                CargaTablaConceptoxTiPla();
            }
            else {
                infoCustom2("No se ha seleccionado ningun concepto.");
            }
        });



    }

    var fillConceptoTipla = function () {
        var parms = {
            data: null,
            order: [[2, 'asc']],
            info: false,
            paging: false,
            scrollY: '25vh',
            scrollCollapse : true,
            columns: [
                          {
                              data: null,
                              defaultContent: '<input type="checkbox" class="check" />',
                              createdCell: function (td, cellData, rowData, row, col) {

                                  $(td).attr('align', 'center')

                              }
                          },

                         {
                             data: "CODE",
                             createdCell: function (td, cellData, rowData, row, col) {
                                 $(td).attr('align', 'center');
                                 $(td).attr('style', 'display:none');
                             }

                         },
                            {
                                data: "NRO",
                               // visible : false,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }

                            },
                         {
                             data: "CODE_PLAN",
                             createdCell: function (td, cellData, rowData, row, col) {
                                 $(td).css('text-align', 'center');
                             }
                         },
                            {
                                data: "DESCRIPCION",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).attr('align', 'center');
                                }
                            },

                               //{
                               //    data: "ESTADO",
                               //    createdCell: function (td, cellData, rowData, row, col) {

                               //        if (rowData.ESTADO == 'ACTIVO') {
                               //            $(td).html('<button  type="button" class="btn green cambiaEstado">' + cellData + '</button>');
                               //        }
                               //        else {
                               //            $(td).html('<button  type="button" class="btn red cambiaEstado">' + cellData + '</button>');
                               //        }
                               //    }
                               //},


                  {
                      data: null,
                      defaultContent: '<a  class="btn blue subir"><i class="icon-chevron-up"></i></a><a  class="btn blue bajar"><i class="icon-chevron-down"></i></a>',
                      createdCell: function (td, cellData, rowData, row, col) {

                          $(td).css('text-align', 'center')

                      }
                  }



            ]

        }

        $(".display.DTTT_selectable.dataTable.no-footer").removeAttr("style");
        oTableConceptPla = $("#tbl_ConceptPla").dataTable(parms)
        $($("#tbl_ConceptPla_wrapper div.span6")[0]).html('<button type="button" class="btn red eliminar" id="remove"><i class="icon-trash"></i></button>');


        $($("#tbl_ConceptPla_wrapper div.span6")[0]).attr("class", "span2")
        $("#tbl_ConceptPla_wrapper div.span6").attr("class", "span10")

        $(".dataTables_filter").css("color", "white")



        $('.eliminar').click(function () {
            $('.eliminar').blur();
            if (!seleccionadosCxP.length == 0) {
                EliminaConcptxTipoPla();
            }
            else {
                infoCustom2("No se ha seleccionado ningun concepto.");
            }
        });

       


       



    }

    function cargainicial() {
        $('#tablas').slideUp();

        fillTipoPlanilla();
      //  $('#cboGrupoConcepto').select2('val','AF').change
        funcionalidadTabla();
        funcionalidadTablaCxTP();

    }

    var fillTipoPlanilla = function () {
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMADEM.ashx?OPCION=9&CODE=0&ESTADO_IND=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoPlanilla').empty();
                $('#cboTipoPlanilla').append('<option  value =""></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoPlanilla').append('<option value="' + datos[i].CODIGO + '"  tipo="' + datos[i].PAGO_IND + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    $("#cboTipoPlanilla").select2('val', datos[0].CODIGO).change();

                } else {
                    $('#cboTipoPlanilla').append('<option  value =""></option>');
                    $('#cboTipoPlanilla').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };
    
    return {
        init: function () {
            plugins();
            eventoControles();
            fillConceptos();
            fillConceptoTipla();
            cargainicial();
            
        }
    };


}();








var listaConceptos = function () {
    var tipla_code = $('#cboTipoPlanilla').val()
    var depen_code = $('#cboGrupoConcepto').val()

    if (typeof oTableConcepto != "undefined") {
        oTableConcepto.fnClearTable();        
    }

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmcotp.ashx?OPCION=2&LISTA_IND=N&TIPLA_CODE=" + tipla_code + "&DEPEND_CODE=" + depen_code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            oTableConcepto.fnClearTable()
            if (!isEmpty(datos)) {
               
                oTableConcepto.fnAddData(datos)
            }

        },
        error: function (msg) {
            oTableConcepto.fnClearTable()
            alertCustom("No se listo correctamente los conceptos")
        }
    });
}

var ListaTotalConceptos  = function () {
   

    if (typeof oTableConcepto != "undefined") {
        oTableConcepto.fnClearTable();
    }

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmcotp.ashx?OPCION=2&LISTA_IND=T&TIPLA_CODE=0003&DEPEND_CODE=",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                var json = datos;
                var parms = {
                    data: json,
                    order: [[2, 'asc']],
                    iDisplayLength: -1,
                    info: false,
                    paging : false,
                    columns: [
                         {
                             data: null,
                             defaultContent: '<input type="checkbox" class="check" />',
                             createdCell: function (td, cellData, rowData, row, col) {

                                 $(td).attr('align', 'center')

                             }
                         },

                        {
                            data: "CODE",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center');
                                $(td).attr('style', 'display:none');
                            }

                        },
                        {
                            data: "CODE_PLAN",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center');
                            }
                        },
                           {
                               data: "DESCRIPCION",
                               createdCell: function (td, cellData, rowData, row, col) {
                                   $(td).attr('align', 'center');
                               }
                           }



                    ]

                }

                $('#tbl_Conceptos').dataTable().fnDestroy();
                oTableConcepto = iniciaTabla("tbl_Conceptos", parms);
            }

        },
        error: function (msg) {

            alert(msg);
        }
    });
}

var SeleccionaTipla = function () {

    var tipla_code = $('#cboTipoPlanilla').val();
    //listaConceptos();

}

var funcionalidadTabla = function () {

    $('#tbl_Conceptos tbody').on('click', '.check', function () {


        var pos = oTableConcepto.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableConcepto.fnGetData(pos);
   
        if ($(this).is(":checked")) {
            $(this).parent().parent().addClass('selected');
            //console.log(row);
            posSeleccionados.push(pos);
            seleccionados.push(row);

        } else {

            $(this).parent().parent().removeClass('selected');
            seleccionados.filter(function (e, f) {
                if (e == row) { seleccionados.splice(f, 1); }
            });
            posSeleccionados.filter(function (q, w) {
                if (q == pos) { posSeleccionados.splice(w, 1); }
            });
        }

    });

  


    var flag = false;
    $('#tbl_Conceptos thead').on('click', '.todosC', function () {

        if (flag) {
            for (var i = 0; i < $("#tbl_Conceptos .check").length; i++)
                if ($($("#tbl_Conceptos .check")[i]).is(':checked')) {
                    $($("#tbl_Conceptos .check")[i]).removeAttr('checked');
                    $($("#tbl_Conceptos .check")[i]).click();
                    $($("#tbl_Conceptos .check")[i]).removeAttr('checked').parent().removeClass('checked');
                    $(this).parent().parent().removeClass('selected');
                }
            flag = false;

        } else {

            for (var i = 0; i < $("#tbl_Conceptos .check").length; i++)
                if (!$($("#tbl_Conceptos .check")[i]).is(':checked')) {
                    $($("#tbl_Conceptos .check")[i]).attr('checked', true);
                    $($("#tbl_Conceptos .check")[i]).click();
                    $($("#tbl_Conceptos .check")[i]).attr('checked', true).parent().addClass('checked');
                    $(this).parent().parent().addClass('selected');
                }

            flag = true;
        }




    });






}

var CargaTablaConceptoxTiPla = function () {
    AsignaConcptxTipoPla()    
}


var listaConcepTipla = function () {
    var tipla_code = $('#cboTipoPlanilla').val();
    var depen_code = $('#cboGrupoConcepto').val();
    if (typeof oTableConceptPla != "undefined") {
        oTableConceptPla.fnClearTable();
    }
    if (tipla_code == "0003") {

        depen_code = "";
    }

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmcotp.ashx?OPCION=2&LISTA_IND=S&TIPLA_CODE=" + tipla_code + "&DEPEND_CODE=" + depen_code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            oTableConceptPla.fnClearTable()
            if (!isEmpty(datos)) {

                oTableConceptPla.fnAddData(datos)
            }

        },
        error: function (msg) {
            oTableConceptPla.fnClearTable()
            alertCustom("No se listo correctamente los conceptos")
        }
    });
}



function AsignaConcptxTipoPla() {

    var TIPLA_CODE = '';
    var CONCEP_CODE = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var GRUPO = '';

        var flag = true;

        TIPLA_CODE = $('#cboTipoPlanilla').val();
        CONCEP_CODE = listaSelecc();
        ESTADO_IND = 'A';
        USUA_ID = $.trim($('#ctl00_lblusuario').html());
        GRUPO = $('#cboGrupoConcepto').val();

        Bloquear("modal_add");

        $.post("vistas/NN/ajax/NNMCOTP.ASHX", {
            OPCION: "3",
            TIPLA_CODE: TIPLA_CODE,
            CONCEP_CODE: CONCEP_CODE,
            ESTADO_IND: ESTADO_IND,
            USUA_ID: USUA_ID,
            GRUPO: GRUPO,
        })
            .done(function (res) {
                Desbloquear("modal_add");
                if (res[0].SUCCESS != "OK") {
                    alertCustom(res[0].SUCCESS);
                }
                else {
                    exito();
                    listaConcepTipla();
                    oTableConcepto.fnDeleteRow(posSeleccionados);
                    posSeleccionados = [];
                    seleccionados = [];
                }
            })
            .fail(function () {
                Desbloquear("modal_add");
                noexito();
            });

}

var listaSelecc = function () {  
    var cadena = '';
    for (var i = 0; i < seleccionados.length; i++) {
        cadena = cadena + seleccionados[i]["CODE"] + ","
    }

    return cadena;
}

var listaSeleccCxP = function () {
    var cadena = '';
    for (var i = 0; i < seleccionadosCxP.length; i++) {
        cadena = cadena + seleccionadosCxP[i]["CODE"] + ","
    }
    return cadena;
}



var funcionalidadTablaCxTP = function () {

    $('#tbl_ConceptPla tbody').on('click', '.check', function () {


        var pos = oTableConceptPla.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableConceptPla.fnGetData(pos);

        if ($(this).is(":checked")) {
            $(this).parent().parent().addClass('selected');
            //console.log(row);
            posSeleccionadosCxP.push(pos);  
            seleccionadosCxP.push(row);

        } else {

            $(this).parent().parent().removeClass('selected');
            seleccionadosCxP.filter(function (e, f) {
                if (e == row) { seleccionadosCxP.splice(f, 1); }
            });
            posSeleccionadosCxP.filter(function (q, w) {
                if (q == pos) { posSeleccionadosCxP.splice(w, 1); }
            });
        }

    });
        


    $('#tbl_ConceptPla tbody').on('click', '.subir', function () {
        var pos = oTableConceptPla.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableConceptPla.fnGetData(pos);

        var Nro_ord = row["Nro"];
        var concep_code = row["CODE"];

        if (Nro_ord != '1') {
            CabiarPosicion("S", concep_code, Nro_ord)
        }
        else {
            alertCustom("No se puede subir de posicion")
        }



    });

    $('#tbl_ConceptPla tbody').on('click', '.bajar', function () {
        var pos = oTableConceptPla.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableConceptPla.fnGetData(pos);

        var Nro_ord = row["Nro"];
        var concep_code = row["CODE"];

        if (Nro_ord != oTableConceptPla.fnGetData().length) {
            CabiarPosicion("B", concep_code, Nro_ord)
        }
        else {
            alertCustom("No se puede bajar de posicion")
        }
    });

    var flag2 = false;
    $('#tbl_ConceptPla thead').on('click', '.todosCxT', function () {

        if (flag2) {
            for (var i = 0; i < $("#tbl_ConceptPla .check").length; i++)
                if ($($("#tbl_ConceptPla .check")[i]).is(':checked')) {
                    $($("#tbl_ConceptPla .check")[i]).removeAttr('checked');
                    $($("#tbl_ConceptPla .check")[i]).click();
                    $($("#tbl_ConceptPla .check")[i]).removeAttr('checked').parent().removeClass('checked');
                    $(this).parent().parent().removeClass('selected');
                }
                flag2 = false;
                
        } else{ 

            for (var i = 0; i < $("#tbl_ConceptPla .check").length; i++)            
                if (!$($("#tbl_ConceptPla .check")[i]).is(':checked')) {
                    $($("#tbl_ConceptPla .check")[i]).attr('checked', true);
                    $($("#tbl_ConceptPla .check")[i]).click();
                    $($("#tbl_ConceptPla .check")[i]).attr('checked', true).parent().addClass('checked');
                    $(this).parent().parent().addClass('selected');                   
                }
        
             flag2 = true;
        }



      
    });



    $('#tbl_ConceptPla tbody').on('click', '.cambiaEstado', function () {
        var pos = oTableConceptPla.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableConceptPla.fnGetData(pos);

        var Nro_ord = row["NRO"];
        var concep_code = row["CODE"];
        var estado = row["ESTADO"];

        CambiarEstado(concep_code, Nro_ord, estado);

    });

    


}


function EliminaConcptxTipoPla() {

    var TIPLA_CODE = '';
    var CONCEP_CODE = '';
    var GRUPO = '';

    var flag = true;

    TIPLA_CODE = $('#cboTipoPlanilla').val();
    CONCEP_CODE = listaSeleccCxP();
    GRUPO = $('#cboGrupoConcepto').val();


    Bloquear("modal_add")

    $.post("vistas/NN/ajax/NNMCOTP.ASHX", {
        OPCION: "4",
        TIPLA_CODE: TIPLA_CODE,
        CONCEP_CODE: CONCEP_CODE,
        GRUPO: GRUPO,
    })
        .done(function (res) {
            Desbloquear("modal_add");
            if (res[0].SUCCESS != "OK") {
                alertCustom(res[0].SUCCESS);
            }
            else {
                exito();
                listaConceptos();
                listaConcepTipla();
                //oTableConceptPla.fnDeleteRow(posSeleccionadosCxP);
                posSeleccionados = [];
                seleccionados = [];
                posSeleccionadosCxP = [];
                seleccionadosCxP = [];
            }
        })
        .fail(function () {
            Desbloquear("modal_add");
            noexito();
        });

    

}

function CabiarPosicion(accion_ind , concep_code , nro_orden) {

    var ACCION = '';
    var TIPLA_CODE = '';
    var CONCEP_CODE = '';
    var GRUPO = '';
    var NRO_ORDEN = '';

    var flag = true;

    ACCION = accion_ind;
    TIPLA_CODE = $('#cboTipoPlanilla').val();
    CONCEP_CODE = concep_code;
    GRUPO = $('#cboGrupoConcepto').val();
    NRO_ORDEN = nro_orden;

    Bloquear("modal_add")

    $.post("vistas/NN/ajax/NNMCOTP.ASHX", {
        OPCION: "5",
        ACCION:ACCION,
        TIPLA_CODE: TIPLA_CODE,
        CONCEP_CODE: CONCEP_CODE,
        GRUPO: GRUPO,
        NRO_ORDEN: NRO_ORDEN,
    })
        .done(function (res) {
            Desbloquear("modal_add");
            if (res[0].SUCCESS != "OK") {
                alertCustom(res[0].SUCCESS);
            }
            else {
                listaConcepTipla();
                posSeleccionadosCxP = [];
                seleccionadosCxP = [];
            }
        })
        .fail(function () {
            Desbloquear("modal_add");
            noexito();
        });

}



function CambiarEstado(concep_code, nro_orden,estado) {


    var TIPLA_CODE = '';
    var CONCEP_CODE = '';
    var GRUPO = '';
    var NRO_ORDEN = '';
    var USUA_ID = '';
    var ACTIVO = '';
    var flag = true;

    TIPLA_CODE = $('#cboTipoPlanilla').val();
    CONCEP_CODE = concep_code;
    GRUPO = $('#cboGrupoConcepto').val();
    NRO_ORDEN = nro_orden;
    USUA_ID = $.trim($('#ctl00_lblusuario').html());
    ACTIVO = estado;

    Bloquear("ventana");

    $.post("vistas/NN/ajax/NNMCOTP.ASHX", {
        OPCION: "6",
        TIPLA_CODE: TIPLA_CODE,
        CONCEP_CODE: CONCEP_CODE,
        GRUPO: GRUPO,
        NRO_ORDEN: NRO_ORDEN,
        USUA_ID: USUA_ID,
        ACTIVO:ACTIVO,
    })
        .done(function (res) {
            Desbloquear("ventana");
            if (res[0].SUCCESS != "OK") {
                alertCustom(res[0].SUCCESS);
            }
            else {
                listaConcepTipla();
                posSeleccionadosCxP = [];
                seleccionadosCxP = [];
            }
        })
        .fail(function () {
            Desbloquear("ventana");
            noexito();
        });

}
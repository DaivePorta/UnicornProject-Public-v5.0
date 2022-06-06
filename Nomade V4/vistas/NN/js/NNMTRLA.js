var NNLTRLA = function () {



    var fillBandejaGrupoTributos = function () {


        var parms = {
            data: null,

            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "NESTADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                   {
                       data: "TIPO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   }

                      

            ]

        }

        oTable = iniciaTabla('tblgru_subgru', parms);
        $('#tblgru_subgru').removeAttr('style');
    }






    var listaGrupoTribLab = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmtrla.ashx?OPCION=1&p_TIPO=TOTAL",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);


                }
                else {

                    oTable.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }

    return {
        init: function () {

            fillBandejaGrupoTributos();
            listaGrupoTribLab();
        }
    };

}();








var NNMTRLA = function () {

   

    var fillBandejaGrupo = function () {


        var parms = {
            data: null,
            "dom": '<"toolbar">frtip',
            "paging": false,
            "info": false,
            
        
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }


                },
               
                 {
                     data: "NESTADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
            ]

        }

        oTableGrupo = iniciaTabla('tbl_grupo', parms);
        $('#tbl_grupo').removeAttr('style');
 

 
    }

    var fillBandejaSubGrupo = function () {


        var parms = {
            data: null,
            "dom": '<"toolbar">frtip',
            "paging": false,
            "info": false,


            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }


                },

                 {
                     data: "NESTADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
            ]

        }

        oTableSubGrupo = iniciaTabla('tbl_Subgrupo', parms);
        $('#tbl_Subgrupo').removeAttr('style');
    


    }
   

    var eventoControles = function () {


        $('#chkactivoModal').on('click', function () {
            if ($("#chkactivoModal").is(':checked')) {

                $('#uniform-chkactivoModal span').removeClass().addClass("checked");
                $('#chkactivoModal').attr('checked', true);
            } else {

                $('#uniform-chkactivoModal span').removeClass();
                $('#chkactivoModal').attr('checked', false);
            }
        });


        $('#chkactivoSubGru').on('click', function () {
            if ($("#chkactivoSubGru").is(':checked')) {

                $('#uniform-chkactivoSubGru span').removeClass().addClass("checked");
                $('#chkactivoSubGru').attr('checked', true);
            } else {

                $('#uniform-chkactivoSubGru span').removeClass();
                $('#chkactivoSubGru').attr('checked', false);
            }
        });
        
     
        $('#tbl_grupo tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

                oTableSubGrupo.fnClearTable();


                styleBotonesGrupo('', '', 'display:none', 'display:none');
                disabledBotonesGrupo(false, false, true, true);

                styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
                disabledBotonesSubGrupo(true, true, true, true);


                $("#hfCOD_GRUPO").val("");
                $("#hfDESC_GRUPO").val("");
                $("#hfESTADO_GRUPO").val("");
             

            }
            else {
                oTableGrupo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');


                var pos = oTableGrupo.fnGetPosition(this);
                var row = oTableGrupo.fnGetData(pos);

               
                $("#hfCOD_GRUPO").val(row.CODIGO);
                $("#hfDESC_GRUPO").val(row.DESCRIPCION);
                $("#hfESTADO_GRUPO").val(row.NESTADO);
                styleBotonesGrupo('display:none', 'display', 'display', 'display:none');
                disabledBotonesGrupo(true, false, false, true);
                ListarSubGrupos(row.CODIGO);
            
            }
        });


        $('#tbl_Subgrupo tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

                styleBotonesSubGrupo('', '', 'display:none', 'display:none');
                disabledBotonesSubGrupo(false, false, true, true);

                $("#hfCOD_SGRUPO").val("");
                $("#hfDESC_SGRUPO").val("");
                $("#hfESTADO_SGRUPO").val("");

            }
            else {
                oTableSubGrupo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableSubGrupo.fnGetPosition(this);
                var row = oTableSubGrupo.fnGetData(pos);


                $("#hfCOD_SGRUPO").val(row.CODIGO);
                $("#hfDESC_SGRUPO").val(row.DESCRIPCION);
                $("#hfESTADO_SGRUPO").val(row.NESTADO);


                styleBotonesSubGrupo('display:none', '', '', 'display');
                disabledBotonesSubGrupo(true, false, false, false);

            }

        });

    }


    var cargaInicial = function () {


       

       

        styleBotonesGrupo('', '', 'display:none', 'display:none');
        disabledBotonesGrupo(false, false, true, true);

        styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
        disabledBotonesSubGrupo(true, true, true, true);

        ListarGrupos();


    }



    return {
        init: function () {
   
            fillBandejaGrupo();
            fillBandejaSubGrupo();
            eventoControles();
            cargaInicial();
        }
    };

}();




function styleBotonesGrupo(strAddGrupo, strRefGrupo, strEditGrupo, strDelGrupo) {
    $('#aAddGrupo').attr('style', strAddGrupo);
    $('#aRefGrupo').attr('style', strRefGrupo);
    $('#aEditGrupo').attr('style', strEditGrupo);
   
}

function styleBotonesSubGrupo(strAddSubGrupo, strRefSubGrupo, strEditSubGrupo, strDelSubGrupo) {
    $('#aAddSubGrupo').attr('style', strAddSubGrupo);
    $('#aRefSubGrupo').attr('style', strRefSubGrupo);
    $('#aEditSubGrupo').attr('style', strEditSubGrupo);
   
}


function disabledBotonesGrupo(boolAddGrupo, boolRefGrupo, boolEditGrupo, boolDelGrupo) {
    $('#aAddGrupo').attr('disabled', boolAddGrupo);
    $('#aRefGrupo').attr('disabled', boolRefGrupo);
    $('#aEditGrupo').attr('disabled', boolEditGrupo);


    if (boolAddGrupo == false) $('#aAddGrupo').attr('href', 'javascript:ShowModalNewGrupo();');
    else $('#aAddGrupo').attr('href', 'javascript:;');

    if (boolRefGrupo == false) $('#aRefGrupo').attr('href', 'javascript:RefreshGrupo();');
    else $('#aRefGrupo').attr('href', 'javascript:;');

    if (boolEditGrupo == false) $('#aEditGrupo').attr('href', 'javascript:ShowModalEditGrupo();');
    else $('#aEditGrupo').attr('href', 'javascript:;');


}

function disabledBotonesSubGrupo(boolAddSubGrupo, boolRefSubGrupo, boolEditSubGrupo, boolDelSubGrupo) {
    $('#aAddSubGrupo').attr('disabled', boolAddSubGrupo);
    $('#aRefSubGrupo').attr('disabled', boolRefSubGrupo);
    $('#aEditSubGrupo').attr('disabled', boolEditSubGrupo);


    if (boolAddSubGrupo == false) $('#aAddSubGrupo').attr('href', 'javascript:ShowModalNewSubGrupo();');
    else $('#aAddSubGrupo').attr('href', 'javascript:;');

    if (boolRefSubGrupo == false) $('#aRefSubGrupo').attr('href', 'javascript:RefreshSubGrupo();');
    else $('#aRefSubGrupo').attr('href', 'javascript:;');

    if (boolEditSubGrupo == false) $('#aEditSubGrupo').attr('href', 'javascript:ShowModalEditSubGrupo();');
    else $('#aEditSubGrupo').attr('href', 'javascript:;');

   
}


function ShowModalNewGrupo() {

    ClearControlsModal();
    $('#grabarModal').html("<i class='icon-save'></i> Grabar");
    $('#grabarModal').attr("href", "javascript:GrabarModal();");
    $('#cancelarModal').html("<i class='icon-remove'></i> Cancelar");
    $('#myModalLabel').html('NUEVO GRUPO');
    $('#MuestraModal').modal('show');
    $($("#MuestraModal :input[type=text]").parent().parent()).removeClass("error")

   
}

function ShowModalEditGrupo() {

    ClearControlsModal();
    $($("#MuestraModal :input[type=text]").parent().parent()).removeClass("error"); //nuevo;

    var CODE = $.trim($('#hfCOD_GRUPO').val());
    if (CODE != "") {
        $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
        $('#grabarModal').attr("href", "javascript:ModificarGrupo();");
        $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");
        $("#correcto").remove();

        $("#txtCodigoModal").val($("#hfCOD_GRUPO").val());
        $("#txtDescripcionModal").val($("#hfDESC_GRUPO").val());
        if ($("#hfESTADO_GRUPO").val() == "ACTIVO") {
            $('#uniform-chkactivoModal span').removeClass().addClass("checked");
            $('#chkactivoModal').attr('checked', true);
        }
        if ($("#hfESTADO_GRUPO").val() == "INACTIVO") {
            $('#uniform-chkactivoModal span').removeClass();
            $('#chkactivoModal').attr('checked', false);
        }

        $('#myModalLabel').html('EDITAR GRUPO');
        $('#MuestraModal').modal('show');

     
    }
}

function ShowModalEditSubGrupo() {
    ClearControlsModalSubGrupo();
    $($("#MuestraModalSubGrupo :input[type=text]").parent().parent()).removeClass("error"); //nuevo;
    var CODE = $.trim($('#hfCOD_SGRUPO').val());
    if (CODE != "") {
        $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Modificar");
        $('#grabarModalSubGrupo').attr("href", "javascript:ModificarSubGrupo();");
        $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cerrar");
        $("#correcto").remove();

        $("#txtCodigoSubGrupo").val($("#hfCOD_SGRUPO").val());
        $("#txtDescripcionSubGrupo").val($("#hfDESC_SGRUPO").val());
        if ($("#hfESTADO_SGRUPO").val() == "ACTIVO") {
            $('#uniform-chkactivoSubGru span').removeClass().addClass("checked");
            $('#chkactivoSubGru').attr('checked', true);
        }
        if ($("#hfESTADO_SGRUPO").val() == "INACTIVO") {
            $('#uniform-chkactivoSubGru span').removeClass();
            $('#chkactivoSubGru').attr('checked', false);
        }

        $('#myModalLabel2').html('EDITAR SUB GRUPO');
        $('#MuestraModalSubGrupo').modal('show');

     
   
      
    }
}

function ShowModalNewSubGrupo() {
    ClearControlsModalSubGrupo();
    $('#grabarModalSubGrupo').html("<i class='icon-save'></i> Grabar");
    $('#grabarModalSubGrupo').attr("href", "javascript:GrabarModalSubGrupo();");
    $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cancelar");
    $('#cancelarModalSubGrupo').attr("href", "javascript:cancelarModalSubGrupo();");
    $('#myModalLabel2').html('NUEVO SUB GRUPO');
    $('#MuestraModalSubGrupo').modal('show');
    $($("#MuestraModalSubGrupo :input[type=text]").parent().parent()).removeClass("error")
}


function ClearControlsModal() {

   

    $(".limpiar").val("");
    $("#NuevoGrupo").remove();
    $('#uniform-chkactivoModal span').removeClass().addClass("checked");
    $('#chkactivoModal').attr('checked', true);
    $("#txtDescripcionModal").off();//NUEVO
}

function ClearControlsModalSubGrupo() {

    

    $(".limpiar").val("");
    $("#NuevoSGrupo").remove();
    $('#uniform-chkactivoSubGru span').removeClass().addClass("checked");
    $('#chkactivoSubGru').attr('checked', true);
    $("#txtDescripcionSubGrupo").off();//NUEVO
}


function HideModal() {
    $('#MuestraModal').modal('hide');
}

function HideModalSubGrupo() {
    $('#MuestraModalSubGrupo').modal('hide');

}
function CancelarModal() {
    HideModal();
}

function cancelarModalSubGrupo() {
    HideModalSubGrupo();
}



var GrabarModal = function () {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';

    

    ESTADO_IND = $("#chkactivoModal").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txtDescripcionModal").val();

    var data = new FormData();

    data.append("OPCION", "NG");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_GRUP_DESC", DESCRIPCION);


    if (vErrors(["txtDescripcionModal"])) {

        Bloquear("MuestraModal ");

        $.ajax({
            url: "vistas/NN/ajax/NNMTRLA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModal");
                if (datos != null) {

                    $("#txtCodigoModal").val(datos);
                    ListarGrupos();
                    $("#grabarModal").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabarModal").attr("href", "javascript:ModificarGrupo();");
                    
                    $("#botones_grupo").append("<a id='NuevoGrupo' class='btn green' href='javascript:NuevoGrupo();'><i class='icon-plus'></i> Nuevo</a>");
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }

}


function NuevoGrupo() {

    ClearControlsModal();
    $($("#MuestraModal :input[type=text]").parent().parent()).removeClass("error");
    $("#correcto").remove();
    $("#grabarModal").html("<i class='icon-save'></i> Grabar");
    $("#grabarModal").attr("href", "javascript:GrabarModal();");
}

function NuevoSGrupo() {

    ClearControlsModalSubGrupo();
    $($("#MuestraModalSubGrupo :input[type=text]").parent().parent()).removeClass("error");
    $("#correcto").remove();
    $("#grabarModalSubGrupo").html("<i class='icon-save'></i> Grabar");
    $("#grabarModalSubGrupo").attr("href", "javascript:GrabarModalSubGrupo();");
}

function ModificarGrupo() {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';



    ESTADO_IND = $("#chkactivoModal").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txtDescripcionModal").val();
    p_GRUP_CODE = $.trim($('#txtCodigoModal').val());

    var data = new FormData();

    data.append("OPCION", "AT");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_GRUP_DESC", DESCRIPCION);
    data.append("p_GRUP_CODE", p_GRUP_CODE);

    if (vErrors(["txtDescripcionModal"])) {

        Bloquear("MuestraModal ");

        $.ajax({
            url: "vistas/NN/ajax/NNMTRLA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModal");
                if (datos =="OK") {

                   
                    ListarGrupos();
                    HideModal();
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }
}

function ModificarSubGrupo() {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';



    ESTADO_IND = $("#chkactivoSubGru").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txtDescripcionSubGrupo").val();
    p_GRUP_CODE = $.trim($('#txtCodigoSubGrupo').val());

    var data = new FormData();

    data.append("OPCION", "AT");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_GRUP_DESC", DESCRIPCION);
    data.append("p_GRUP_CODE", p_GRUP_CODE);

    if (vErrors(["txtDescripcionSubGrupo"])) {

        Bloquear("MuestraModalSubGrupo ");

        $.ajax({
            url: "vistas/NN/ajax/NNMTRLA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModalSubGrupo");
                if (datos == "OK") {


                    ListarSubGrupos($.trim($('#hfCOD_GRUPO').val()));
                    HideModalSubGrupo();
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }
}

var GrabarModalSubGrupo = function () {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';
    var p_DEPEND_CODE = '';

    ESTADO_IND = $("#chkactivoSubGru").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txtDescripcionSubGrupo").val();
    p_DEPEND_CODE = $.trim($('#hfCOD_GRUPO').val());

    var data = new FormData();

    data.append("OPCION", "NG");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_GRUP_DESC", DESCRIPCION);
    data.append("p_DEPEND_CODE", p_DEPEND_CODE);

    if (vErrors(["txtDescripcionSubGrupo"])) {

        Bloquear("MuestraModalSubGrupo ");

        $.ajax({
            url: "vistas/NN/ajax/NNMTRLA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModalSubGrupo");
                if (datos != null) {

                    $("#txtCodigoSubGrupo").val(datos);
                    var codGrupo = $('#hfCOD_GRUPO').val();
                    ListarSubGrupos(codGrupo);
                 
                    $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Modificar");
                    $('#grabarModalSubGrupo').attr("href", "javascript:ModificarSubGrupo();");

                    $("#botones_subgrupo").append("<a id='NuevoSGrupo' class='btn green' href='javascript:NuevoSGrupo();'><i class='icon-plus'></i> Nuevo</a>");
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }

}

var  ListarGrupos = function() {



    styleBotonesGrupo('', '', 'display:none', 'display:none');
    disabledBotonesGrupo(false, false, true, true);

    styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
    disabledBotonesSubGrupo(true, true, true, true);



    $.ajax({
        type: "POST",
        url: "vistas/nn/ajax/nnmtrla.ashx?OPCION=1&p_TIPO=PADRES",
        async: false,
        success: function (datos) {
            if (datos != null) {
                
               
                oTableGrupo.fnClearTable();
                oTableGrupo.fnAddData(datos);
                oTableSubGrupo.fnClearTable();
            }
            else {
               
                oTableGrupo.fnClearTable();

              
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}


var  ListarSubGrupos = function (DEPEND_CODE) {



    styleBotonesSubGrupo('display', 'display', 'display:none', 'display:none');
    disabledBotonesSubGrupo(false, false, true, true);

   
   
    $.ajax({
        type: "POST",
        url: "vistas/nn/ajax/nnmtrla.ashx?OPCION=1&p_TIPO=HIJOS&p_GRUP_CODE=" + DEPEND_CODE,
        async: false,
        success: function (datos) {
            if (datos != null) {


                oTableSubGrupo.fnClearTable();
                oTableSubGrupo.fnAddData(datos);
            }
            else {

                oTableSubGrupo.fnClearTable();
                styleBotonesGrupo('display:none', '', '', '');
                disabledBotonesGrupo(true, false, false, false);


            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}


function RefreshGrupo() {

    ListarGrupos();
}

function RefreshSubGrupo() {
    var codGrupo = $('#hfCOD_GRUPO').val();
    ListarSubGrupos(codGrupo);
}

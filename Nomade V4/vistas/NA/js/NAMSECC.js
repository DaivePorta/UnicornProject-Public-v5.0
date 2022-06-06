var NALSECC = function () {

    var fillBandejaSeccAlmacen = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjSeccAlmacenes').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                { data: "ALMACEN.NOMBRE" },
                { data: "EMPRESA.NOMBRE" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
               
            ]

        }



        oTableAlmacenes = iniciaTabla('tblSeccAlmacen', parms);
        $('#tblSeccAlmacen').removeAttr('style');

        /*****/

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $("#filemp").each(function () {
            var select = $('<select id="slcfilempr" class="span12" style="margin-bottom: 0px;"><option></option><option value="">Todo</option></select>')
                .appendTo($(this).empty())
                .on('change', function () {
                    $('#tblSeccAlmacen').DataTable().column(3)
                        .search($(this).val())
                        .draw();
                });

            $('#tblSeccAlmacen').DataTable().column(3).data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            $("#slcfilempr").select2({
                placeholder: "EMPRESA",
                allowclear: true

            });
            $("#s2id_slcfilempr").attr("style", "margin-bottom: -10px;");

        });

        $("#filalm").each(function () {
            var select = $('<select id="slcfilalm" class="span12" style="margin-bottom: 0px;"><option></option><option value="">Todo</option></select>')
                .appendTo($(this).empty())
                .on('change', function () {
                    $('#tblSeccAlmacen').DataTable().column(2)
                        .search($(this).val())
                        .draw();
                });

            $('#tblSeccAlmacen').DataTable().column(2).data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            $("#slcfilalm").select2({
                placeholder: "ALMACEN",
                allowclear: true

            });
            $("#s2id_slcfilalm").attr("style", "margin-bottom: -10px;");

        });

        /*****/


        $('#tblSeccAlmacen tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableAlmacenes.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableAlmacenes.fnGetPosition(this);
                var row = oTableAlmacenes.fnGetData(pos);
                var codigo = row.CODIGO;
               // var empr = row.EMPRESA.CODIGO;
        
                window.location.href = '?f=namsecc&codigo=' + codigo ;
            }

        });


    }

    return {
        init: function () {

            fillBandejaSeccAlmacen();
        }
    };

}();

function actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_empresa = $("#slcEmpresa").val();  
    var p_descripcion = $("#txtdescripcion").val();    
    var p_tipoalmacen = $('#slctipoalmacen').val();
    var p_tipoalmacenaje = $('#slctipoalmacenaje').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_codigo = $('#txtcodigo').val();
    var p_almacen = $("#slcalmacen").val();
    var p_sistema=$("#slcsistemaalmacenaje").val();
    var p_nro_palets=$("#txtnropalets").val();
    var p_paletizado = $('#chkpaletizado').is(':checked') ? 'S' : 'N';
    var p_costo = $("#txtCosto").val() == "" ? 0.00 : $("#txtCosto").val();


    if (vErrors(["slcalmacen", "txtcodigo", "slcEmpresa", "slctipoalmacen", "txtdescripcion", "slctipoalmacen", "slctipoalmacenaje"])) {
        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMSECC.ASHX", {
            flag: 2,
            CODIGO: p_codigo,
            PALETIZADO_IND:p_paletizado,
            EMPRESA: p_empresa,
            DESCRIPCION: p_descripcion,
            ALMACEN: p_almacen,
            TIPO_ALMACEN: p_tipoalmacen,
            TIPO_ALMACENAJE: p_tipoalmacenaje,
            ESTADO: p_acti,
            USUARIO: p_user,
            SISTEMA_ALMACENAJE:p_sistema, 
            Costo: p_costo,
            NRO_PALETS:p_nro_palets
        },
            function (res) {
                Desbloquear("ventana");
                if (res.indexOf("error") == -1 && res == "OK") {

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");
                    $("#txtcodigo").attr("disabled", "disabled");
                } else {
                    noexito();
                }
            });
    }
}

function crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_paletizado = $('#chkpaletizado').is(':checked') ? 'S' : 'N';

    var p_empresa = $("#slcEmpresa").val();
 
    var p_descripcion = $("#txtdescripcion").val();
    
    var p_tipoalmacen = $('#slctipoalmacen').val();
    var p_tipoalmacenaje = $('#slctipoalmacenaje').val();
    var p_user = $('#ctl00_lblusuario').html();
    
    var p_almacen = $("#slcalmacen").val();
    var p_sistema = $("#slcsistemaalmacenaje").val();
    var p_nro_palets = $("#txtnropalets").val();
    var p_costo = $("#txtCosto").val() == "" ? 0.00 : $("#txtCosto").val();

    if (vErrors(["slcalmacen", "slcEmpresa", "slctipoalmacen", "txtdescripcion", "slctipoalmacen", "slctipoalmacenaje"]) && verificarcodigo(p_codigo)) {
        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMSECC.ASHX", {
            flag: 1,
          
            PALETIZADO_IND:p_paletizado,
            EMPRESA: p_empresa,          
            DESCRIPCION:p_descripcion,
            ALMACEN:p_almacen,
            TIPO_ALMACEN: p_tipoalmacen,
            TIPO_ALMACENAJE: p_tipoalmacenaje,
            ESTADO: p_acti,
            USUARIO: p_user,
            SISTEMA_ALMACENAJE: p_sistema,
            Costo:p_costo,
            NRO_PALETS: p_nro_palets

        },
            function (res) {
                Desbloquear("ventana");
                if (res.indexOf("error") == -1 && res != "" && res != null) {
                    exito();
                    $('#txtcodigo').val(res);
                    $("#grabar").html("<i class='icon-pencil'></i> modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");
                    $("#slcEmpresa").attr("disabled", "disabled");
                    $('#txtcodigo').attr("disabled", "disabled");

                } else {
                    noexito();
                }
            });
    } 
}


var NAMSECC = function () {
    var cargaInicial = function () {

        $('#chkpaletizado').on('change', function () {
            if ($("#chkpaletizado").is(':checked')) {
                $('#txtnropalets').attr("disabled", false);
               
            } else {
                $('#txtnropalets').attr("disabled", true);
                $('#txtnropalets').val('');
               
            }
        });

        var code = ObtenerQueryString("codigo");
        //var codempr = ObtenerQueryString("codempr");
        if (typeof (code) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:actualizar();");
            $("#slcEmpresa").attr("disabled", "disabled");
            $('#txtcodigo').attr("disabled", "disabled");
            $.ajax({
                type: "post",
                url: "vistas/NA/ajax/namsecc.ashx?flag=3&code=" + code,
                contenttype: "application/json;",
                datatype: "json",
                async: false,

                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);
                    $("#slcEmpresa").select2("val",datos[0].EMPRESA);
                    $("#slcEmpresa").trigger("change",datos[0].ALMACEN);
                    
                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    
                    $("#slctipoalmacen").select2("val",datos[0].TIPO_ALMACEN);
                    $("#slctipoalmacenaje").select2("val",datos[0].TIPO_ALMACENAJE).change();

                    $("#txtnropalets").val(datos[0].NRO_PALETS == "0" ? "" : datos[0].NRO_PALETS);
                    $("#slcsistemaalmacenaje").val(datos[0].SISTEMA_ALMACENAJE);
           
                    $("#txtCosto").val(datos[0].COSTO);
                    
                    if (datos[0].PALETIZADO == 'S') {
                        $('#uniform-chkpaletizado span').removeClass().addClass("checked");
                        $('#chkpaletizado').attr('checked', true);
                        $("#txtnropalets").removeAttr("disabled");
                    }
                    else {
                        $('#uniform-chkpaletizado span').removeClass();
                        $('#chkpaletizado').attr('checked', false);
                    }

                    if (datos[0].ESTADO == 'ACTIVO') {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    }
                    else {
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


    var cargacombos = function () {


        $("#slctipoalmacenaje").select2();
        $("#slcsistemaalmacenaje").select2();
        $("#slctipoalmacenaje").change(function () {
            if ($(this).val() == "0003") {
                $("#slcsistemaalmacenaje").attr("disabled", false);
                $("#slcsistemaalmacenaje").select2("val", "");
            } else { $("#slcsistemaalmacenaje").select2("val", "0000"); $("#slcsistemaalmacenaje").attr("disabled", true); }
        });



       

        $("#slctipoalmacen").select2();
        $.ajaxSetup({ async: false });
        $.post("vistas/NA/ajax/NAMSECC.ASHX", { flag: 8 },
             function (res) {
                 $("#slctipoalmacen").html(res);
             });
        $.ajaxSetup({ async: true });

        $("#slcEmpresa").select2();
        $("#slcalmacen").select2();
        $.ajaxSetup({ async: false });
        $.post("vistas/NA/ajax/NAMSECC.ASHX", { flag: 9, usua: $("#ctl00_txtus").val() },
             function (res) {
                 $("#slcEmpresa").html(res);


                 $("#slcEmpresa").change(function (event,  p_almacen) {
                     $.ajaxSetup({ async: false });
                     $.post("vistas/NA/ajax/NAMSECC.ASHX", { flag: 10, codempr: $("#slcEmpresa").val() },
                         function (res) {
                             if (res != "error") {
                                 $("#slcalmacen").attr("disabled", false);
                                 $("#slcalmacen").html(res);

                                 $("#slcalmacen").change(function (event, parenc) {
                              
                                     if (parenc != null) {

                                         var parenc_v = parenc;
                                         $("#slcalmacen").select2("val", parenc_v);

                                     } 

                                 });

                                 if (p_almacen != undefined) {
                                     $("#slcalmacen").trigger("change", p_almacen);
                                 }

                             } else {
                                 deshabilitacombos("slcalmacen");
                             }
                         });
                     $.ajaxSetup({ async: true });
                    
                 });



             });

        $.ajaxSetup({ async: true });
             
    }

    var plugins = function () {
        aMayuscula(":input");

        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "k", "repeat": 50, "greedy": false }); });
        $("#txtcodigo").focus(function () { $(this).inputmask({ "mask": "#", "repeat": 8, "greedy": false }); });
        $("#txtnropalets").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 4, "greedy": false }); });
               
    }
   
    return {
        init: function () {
            plugins();
           
            cargacombos();
            cargaInicial();
        }
    };
}();

function deshabilitacombos(id) {
    var auxiliar = new Array();

    if (!(Object.prototype.toString.call(id) == "[object Array]")) {

        auxiliar[0] = id;

    } else { auxiliar = id; }

    for (var i = 0; i < auxiliar.length; i++) {
        $("#" + auxiliar[i]).attr("disabled", "disabled");
        $("#" + auxiliar[i]).select2("val", "");
        //  $("#s2id_" + auxiliar[i] + " a .select2-chosen").html('');
    }

}


function verificarcodigo(code) {

    var ind = true;

    $.ajax({
        type: "post",
        url: "vistas/NA/ajax/namsecc.ashx?flag=3&code=" + code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,

        success: function (datos) {

            if (datos != null && datos != "") {

                ind = false;

            }


        }
         });

    return ind;

}
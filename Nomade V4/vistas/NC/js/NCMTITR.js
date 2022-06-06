﻿
function GrabarTipT() {

    var mensaje = "";
    var cod_sunat = $("#txtCodSunat").val();
    var des_tip = $("#txtTipTra").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();


    mensaje = validar(cod_sunat, des_tip);

    if (mensaje.length > 0) {

        alertCustom(mensaje);
    }
    else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMTITR.ASHX", {
            opcion: 'N', cod_sunat: cod_sunat, des_tip: des_tip, estado: estado, usuario: usuario
        },

        function (res) {
            Desbloquear("ventana");
            if (res != 'EXIS' && res.length == 4) {
                $('#txtCodigo').val(res);
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
            } else {

                switch (res) {
                    case 'EXIS':
                        existeCod(cod_sunat);
                        break;
                    case 'DUP':
                        duplicidadCod(des_tip);
                        break;
                    case 'CSN':
                        CodDescDup(cod_sunat, des_tip);
                        break;
                }
            }
        });
    }
}


function Modificar() {

    var mensaje = "";
    var codigo = $("#txtCodigo").val();
    var cod_sunat = $("#txtCodSunat").val();
    var des_tip = $("#txtTipTra").val();
    var estado = $("#chkEstado").is(':checked') ? 'I' : 'A';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje = validar(cod_sunat, des_tip);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    }
    else {
        Bloquear("ventana");

        $.post("vistas/nc/ajax/ncmtitr.ashx", {
            opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, des_tip: des_tip, estado: estado, usuario: usuario
        },
         function (res) {
             Desbloquear("ventana");
             if (res == "OK") {
                 exito();
             } else {

                 switch (res) {
                     case 'EXIS':
                         existeCod(cod_sunat);
                         break;
                     case 'DUP':
                         duplicidadCod(des_tip);
                         break;
                     case 'CSN':
                         CodDescDup(cod_sunat, des_tip);
                         break;
                 }
             }
         });
    }
}




var NCLTITR = function () {

    var fillBandejaTipPer = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjTipPer').val());
        var parms = {
            data: json,
            columns: [
                { data: "codigo" },
                { data: "codigo_sunat" },
                { data: "descripcion" },
                {
                    data: "estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }
        

        oTipPer = iniciaTabla('tblTipPer', parms);
        $('#tblTipPer').removeAttr('style');


        $('#tblTipPer tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTipPer.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTipPer.fnGetPosition(this);
                var row = oTipPer.fnGetData(pos);
                var codigo = row.codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmtitr&codigo=' + codigo;
            }

        });

    
        $('#tblTipPer tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTipPer.api(true).row($(this).parent().parent()).index();
            var row = oTipPer.fnGetData(pos);
            var cod = row.codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMTITR.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTipPer.fnGetData(pos).estado = res;
                        refrescaTabla(oTipPer);
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
            fillBandejaTipPer();
            //datatable();
            //plugins();
        }
    };
}();

var NCMTITR = function () {

    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $('#txtTipTra').focus(function () { $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false }); })
    }

    var datatable = function () {
    }

    var cargaInicial = function () {

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmtitr.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtTipTra").val(datos[0].DESCRIPCION);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
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
            datatable();
            cargaInicial();
        }
    };

}();

function ObtenerQueryString(param) {
    var urlpagina = window.location.search.substring(1);
    var variables = urlpagina.split('&');
    for (var i = 0; i < variables.length; i++) {
        var nombrparam = variables[i].split('=');
        if (nombrparam[0] == param) {
            return nombrparam[1]; //valor
        }
    }
}

function validar(cod_sunat, des_tip) {

    var mensaje = "";

    if (cod_sunat == "") {
        mensaje = mensaje + 'INGRESE CÓDIGO DE SUNAT<br/>';
    }

    if (des_tip == "") {
        mensaje = mensaje + 'INGRESE DESCRIPCIÓN DEL TIPO DE TRABAJADOR<br/>';
    }

    return mensaje;

}
function GrabarVinculacion() {


    var cod_sunat = $('#txtCodSunat').val();
    var descripcion = $('#txtDescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();
    var sexo = $("#cbo_sexo").val();

 

    if (vErrors(["txtCodSunat", "txtDescripcion", "cbo_sexo"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMVINC.ASHX",
            {
                opcion: 'N', cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, usuario: usuario, sexo : sexo
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
                            duplicidadCod(descripcion);
                            break;
                        case 'CSN':
                            CodDescDup(cod_sunat, descripcion);
                            break;
                    }
                }
            });
    }
}


function Modificar() {

    var codigo = $('#txtCodigo').val();
    var cod_sunat = $('#txtCodSunat').val();
    var descripcion = $('#txtDescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();
    var sexo = $("#cbo_sexo").val();

    if (vErrors(["txtCodSunat", "txtDescripcion", "cbo_sexo"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMVINC.ASHX",
            {
                opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, usuario: usuario, sexo: sexo
            },
             function (res) {
                 Desbloquear("ventana");
                 if (res == 'OK') {
                     exito();
                 } else {

                     switch (res) {
                         case 'EXIS':
                             existeCod(cod_sunat);
                             break;
                         case 'DUP':
                             duplicidadCod(descripcion);
                             break;
                         case 'CSN':
                             CodDescDup(cod_sunat, descripcion);
                             break;
                     }
                 }
             });
    }
}
var NCLVINC = function () {

    var fillBandejaVinculo = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjVinculo').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "Codigo_Sunat" },
                { data: "descripcion" },
                 { data: "GENERO_DESC" },
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



        oTableVinculo = iniciaTabla('tblVinculo', parms);
        $('#tblVinculo').removeAttr('style');



        $('#tblVinculo tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableVinculo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableVinculo.fnGetPosition(this);
                var row = oTableVinculo.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmvinc&codigo=' + codigo;
            }

        });



        $('#tblVinculo tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableVinculo.api(true).row($(this).parent().parent()).index();
            var row = oTableVinculo.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMVINC.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableVinculo.fnGetData(pos).estado = res;
                        refrescaTabla(oTableVinculo);
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

            fillBandejaVinculo();
        }
    };

}();

var NCMVINC = function () {

    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 2, "greedy": false });
        $("#txtDescripcion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 70, "greedy": false }); })
        aMayuscula(":input");
        $("#cbo_sexo").select2();
        $('#uniform-chkEstado span').removeClass().addClass("checked");
        $('#chkEstado').attr('checked', true);
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
                url: "vistas/NC/ajax/ncmvinc.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",

                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }
                    $("#cbo_sexo").select2('val', datos[0].GENERO).change()

                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val(datos[0].USUA_ID);
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



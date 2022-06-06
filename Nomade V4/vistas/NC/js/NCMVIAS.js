
function GrabarVia() {


    var mensaje = '';

    var cod_sunat = $('#txtCodSunat').val();
    var nom_via = $('#txtNomVia').val();
    var activo = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var nombre_corto = $('#txtNomCorto').val();
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();

    mensaje = validar(cod_sunat, nom_via, nombre_corto);


    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMVIAS.ASHX",
            {
                opcion: 'N',  cod_sunat: cod_sunat, nom_via: nom_via, activo: activo, nombre_corto: nombre_corto, usuario: usuario
            },
            function (res) {
                Desbloquear("ventana");
                if (res != "EXIS" && res.length==4) {
                    $('#txtCodVia').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");
                } else {

                    switch (res) {
                        case 'EXIS':
                            existeCod(cod_sunat);
                            break;
                        case 'DUP':
                            duplicidadCod(nom_via);
                            break;
                        case 'CSN':
                            CodDescDup(cod_sunat, nom_via);
                            break;
                    }
                }
            });
    }
}

function Modificar() {


    var mensaje = '';

    var codigo = $('#txtCodVia').val();
    var cod_sunat = $('#txtCodSunat').val();
    var nom_via = $('#txtNomVia').val();
    var activo = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var nombre_corto = $('#txtNomCorto').val();
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();


    mensaje = validar(cod_sunat, nom_via, nombre_corto);


    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMVIAS.ASHX",
            {
                opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, nom_via: nom_via, activo: activo, nombre_corto: nombre_corto, usuario: usuario
            },
             function (res) {
                 Desbloquear("ventana");
                 if (res == 'OK' ) {
                     exito();
                 } else {

                     switch (res) {
                         case 'EXIS':
                             existeCod(cod_sunat);
                             break;
                         case 'DUP':
                             duplicidadCod(nom_via);
                             break;
                         case 'CSN':
                             CodDescDup(cod_sunat, nom_via);
                             break;
                     }
                 }
             });
    }
}

var NCLVIAS = function () {

    var fillBandejaVias = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjVias').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "Codigo_Sunat" },
                { data: "Descripcion" },
                { data: "Descripcion_Corto" },
                {
                    data: "Estado",
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



        oTableVias = iniciaTabla('tblVias', parms);
        $('#tblVias').removeAttr('style');



        $('#tblVias tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableVias.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableVias.fnGetPosition(this);
                var row = oTableVias.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmvias&codigo=' + codigo;
            }

        });



        $('#tblVias tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableVias.api(true).row($(this).parent().parent()).index();
            var row = oTableVias.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMVIAS.ASHX", { opcion: 'A', CODE:cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableVias.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableVias);
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

            fillBandejaVias();
        }
    };

}();

var NCMVIAS = function () {

    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
      $("#txtNomVia").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 30, "greedy": false }); })
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
                url: "vistas/NC/ajax/ncmvias.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",

                success: function (datos) {

                    $("#txtCodVia").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtNomVia").val(datos[0].NOMBRE_VIA);
                    $("#txtNomCorto").val(datos[0].NOMBRE_CORTO);
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
function validar(cod_sunat, nom_via, nombre_corto) {
    var mensaje = "";

    if (cod_sunat == "") {
        mensaje = mensaje + "INGRESE CÓDIGO DE SUNAT. <br/>";
    }

    if (nom_via == "") {
        mensaje = mensaje + "INGRESE NOMBRE DE VÍA<br/>";
    }


    if (nombre_corto == "") {
        mensaje = mensaje + "INGRESE NOMBRE CORTO.";
    }

    return mensaje;

}
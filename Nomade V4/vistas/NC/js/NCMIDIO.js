
function GrabarIdioma() {

    var mensaje = '';
    var codIdioma = $("#txtCodigo").val();
    var idioma = $("#txtIdioma").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var nombreCorto = $("#txtNombreCorto").val();
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje = validar(idioma, nombreCorto);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMIDIO.ASHX", {
            opcion: 'N', codIdioma: codIdioma, idioma: idioma, estado: estado, nombreCorto: nombreCorto,
            usuario: usuario
        },
        function (res) {
            Desbloquear("ventana");
            if (res != 'EXIS') {
                $('#txtCodigo').val(res);
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
            } else {
                duplicidadCod(idioma);
                noexito();
            }
        });
    }
}

function Modificar() {

    var mensaje = '';
    var codIdioma = $("#txtCodigo").val();
    var idioma = $("#txtIdioma").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var nombreCorto = $("#txtNombreCorto").val();
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje = validar(idioma, nombreCorto);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMIDIO.ASHX", {
            opcion: 'M', codIdioma: codIdioma, idioma: idioma, estado: estado, nombreCorto: nombreCorto,
            usuario: usuario
        },
            function (res) {
                Desbloquear("ventana");
                if (res == 'OK') {
                    exito();
                } else {
                    duplicidadCod(idioma);
                    noexito();
                }
            });
    }
}

var NCLIDIO = function () {

    var fillBandejaIdioma = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjIdioma').val());
        var parms = {
            data: json,
            columns: [
                { data: "codigo" },
                { data: "descripcion" },
                { data: "nom_corto" },
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



        oTableIdioma = iniciaTabla('tblIdioma', parms);
        $('#tblIdioma').removeAttr('style');



        $('#tblIdioma tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableIdioma.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableIdioma.fnGetPosition(this);
                var row = oTableIdioma.fnGetData(pos);
                var codigo = row.codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmidio&codigo=' + codigo;
            }

        });



        $('#tblIdioma tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableIdioma.api(true).row($(this).parent().parent()).index();
            var row = oTableIdioma.fnGetData(pos);
            var cod = row.codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMIDIO.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableIdioma.fnGetData(pos).estado = res;
                        refrescaTabla(oTableIdioma);
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

            fillBandejaIdioma();
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

var NCMIDIO = function () {
    var plugins = function () {
        $("#txtIdioma").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 30, "greedy": false }); })
        $("#txtNombreCorto").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 30, "greedy": false }); })
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
                url: "vistas/nc/ajax/ncmidio.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtIdioma").val(datos[0].NOMBRE_IDIOMA);
                    $("#txtNombreCorto").val(datos[0].NOMBRE_CORTO);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }
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




function validar(idioma, nombreCorto) {
    var mensaje = "";

    if (idioma == "") {
        mensaje = mensaje + "INGRESE IDIOMA. <br/>";
    }

    if (nombreCorto == "") {
        mensaje = mensaje + "INGRESE NOMBRE DE CORTO. <br/>";
    }

    return mensaje;

}

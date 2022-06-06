
function GrabarZona() {


    var mensaje = '';
    var cod_sunat = $('#txtCodSunat').val();
    var nom_zona = $('#txtNomZona').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var nombre_corto = $('#txtNomCorto').val();
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();


    mensaje = validar(cod_sunat, nom_zona, nombre_corto);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMZONA.ASHX",
            {
                opcion: 'N', cod_sunat: cod_sunat, nom_zona: nom_zona,
                estado: estado, nombre_corto: nombre_corto, usuario: usuario
            },
            function (res) {
                Desbloquear("ventana");
                if (res != 'EXIS' && res.length == 4) {
                    $('#txtCodigo').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");
                }
                else {

                    switch (res) {
                        case 'EXIS':
                            existeCod(cod_sunat);
                            break;
                        case 'DUP':
                            duplicidadCod(nom_zona);
                            break;
                        case 'CSN':
                            CodDescDup(cod_sunat, nom_zona);
                            break;
                    }
                }
            });
    }
}

function Modificar() {

    var mensaje = '';
    var codigo = $('#txtCodigo').val();
    var cod_sunat = $('#txtCodSunat').val();
    var nom_zona = $('#txtNomZona').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var nombre_corto = $('#txtNomCorto').val();
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();

    mensaje = validar(cod_sunat, nom_zona, nombre_corto);
    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMZONA.ASHX", {
            opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, nom_zona: nom_zona, estado: estado,
            nombre_corto: nombre_corto, usuario: usuario
        },
        function (res) {
            Desbloquear("ventana");
            if (res == "OK") {
                exito();
            }
            else {

                switch (res) {
                    case 'EXIS':
                        existeCod(cod_sunat);
                        break;
                    case 'DUP':
                        duplicidadCod(nom_zona);
                        break;
                    case 'CSN':
                        CodDescDup(cod_sunat, nom_zona);
                        break;
                }
            }

        });
    }
}

var NCMZONA = function () {

    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 2, "greedy": false });
        $("#txtNomZona").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 45, "greedy": false }); })
        $("#txtNomCorto").focus(function () { $(this).inputmask({ "mask": "k", "repeat": 12, "greedy": false }); })
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
                url: "vistas/NC/ajax/ncmzona.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",

                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtNomZona").val(datos[0].NOMBRE_ZONA);
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

var NCLZONA = function () {

    var fillBandejaZonas = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjZonas').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "Codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "Codigo_Sunat",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
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



        oTableZonas = iniciaTabla('tblZonas', parms);
        $('#tblZonas').removeAttr('style');



        $('#tblZonas tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableZonas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableZonas.fnGetPosition(this);
                var row = oTableZonas.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmzona&codigo=' + codigo;
            }

        });



        $('#tblZonas tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableZonas.api(true).row($(this).parent().parent()).index();
            var row = oTableZonas.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMZONA.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableZonas.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableZonas);
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

            fillBandejaZonas();
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

function validar(cod_sunat,nom_zona,nombre_corto) {
    var mensaje = "";

    if (cod_sunat == "") {
        mensaje = mensaje + "INGRESE CODIGO SUNAT. <br/>";
    }

    if (nom_zona == "") {
        mensaje = mensaje + "INGRESE NOMBRE DE ZONA. <br/>";
    }
    if (nombre_corto == "") {
        mensaje = mensaje + "INGRESE NOMBRE DE CORTO. <br/>";
    }
    return mensaje;

}

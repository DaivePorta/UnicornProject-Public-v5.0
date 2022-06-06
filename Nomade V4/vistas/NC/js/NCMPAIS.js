
function GrabarPais() {

    var mensaje = '';

    var codsunat = $.trim($("#txtCodSunat").val());
    var activo = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var nompais = $.trim($("#txtNomPais").val());
    var nomcort = $.trim($("#txtNomCor").val());
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje = validar(codsunat, nompais, nomcort);


    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {

        Bloquear("ventana");
        $.post("vistas/nc/ajax/ncmpais.ashx", {
            opcion: 'N', codsunat: codsunat, activo: activo, nompais: nompais,
            nomcort: nomcort, usuario: usuario
        },

        function (res) {
            Desbloquear("ventana");
            if (res != 'EXIS' && res.length == 4) {
                $('#txtCodigoPais').val(res);
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
            } else {

                switch (res) {
                    case 'EXIS':
                        existeCod(codsunat);
                        break;
                    case 'DUP':
                        duplicidadCod(nompais);
                        break;
                    case 'CSN':
                        CodDescDup(codsunat, nompais);
                        break;
                }
            }
        });
    }
}

function Modificar() {

    var mensaje = '';

    var codpais = $("#txtCodigoPais").val();
    var codsunat = $.trim($("#txtCodSunat").val());
    var activo = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var nompais = $.trim($("#txtNomPais").val());
    var nomcort = $.trim($("#txtNomCor").val());
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje = validar(codsunat, nompais, nomcort);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/nc/ajax/ncmpais.ashx", {
            opcion: 'M', codpais: codpais, codsunat: codsunat, activo: activo, nompais: nompais,
            nomcort: nomcort, usuario: usuario
        },
         function (res) {
             Desbloquear("ventana");
             if (res == "OK") {
                 exito();
             } else {

                 switch (res) {
                     case 'EXIS':
                         existeCod(codsunat);
                         break;
                     case 'DUP':
                         duplicidadCod(nompais);
                         break;
                     case 'CSN':
                         CodDescDup(codsunat, nompais);
                         break;
                 }
             }

         });
    }
}

var NCLPAIS = function () {

    var fillBandejaPais = function () {


        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjPais').val());
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
        
        oTablePais = iniciaTabla('tblPais', parms);
        $('#tblPais').removeAttr('style');

        $('#tblPais tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablePais.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablePais.fnGetPosition(this);
                var row = oTablePais.fnGetData(pos);
                var codigo = row.Codigo;

                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmpais&codigo=' + codigo;
            }

        });

        $('#tblPais tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTablePais.api(true).row($(this).parent().parent()).index();
            var row = oTablePais.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMPAIS.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTablePais.fnGetData(pos).Estado = res;
                        refrescaTabla(oTablePais);
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
            //datatable();
            fillBandejaPais();

        }
    };

}();

var NCMPAIS = function () {

    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $("#txtNomPais").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false }); })
        $("#txtNomCor").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 30, "greedy": false }); })

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
                url: "vistas/nc/ajax/ncmpais.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

                    $("#txtCodigoPais").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }
                    $("#txtNomPais").val(datos[0].NOMBRE_PAIS);
                    $("#txtNomCor").val(datos[0].NOMBRE_CORTO);


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


function validar(codsunat, nompais, nomcort) {
    var mensaje = "";

    if (codsunat == "") {
        mensaje = mensaje + "INGRESE CÓDIGO DE SUNAT. <br/>";
    }

    if (nompais == "") {
        mensaje = mensaje + "INGRESE NOMBRE DE PAÍS. <br/>";
    }


    if (nomcort == "") {
        mensaje = mensaje + "INGRESE NOMBRE CORTO.";
    }

    return mensaje;

}
function GrabarTico() {

    var mensaje = "";
    var cod_sunat = $("#txtCodSunat").val();
    var descripcion = $("#txtDescripcion").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje = validar(cod_sunat, descripcion);
    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMTICO.ASHX", {
            opcion: 'N', cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, usuario: usuario
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

    var mensaje = "";
    var codigo = $('#txtCodigo').val();
    var cod_sunat = $('#txtCodSunat').val();
    var descripcion = $('#txtDescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();

    mensaje = validar(cod_sunat, descripcion);
    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMTICO.ASHX",
            {
                opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, usuario: usuario
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


var NCMTICO = function () {

    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $("#txtDescripcion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 70, "greedy": false }); })
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
                url: "vistas/nc/ajax/ncmtico.ashx?opcion=0&code=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    if (datos != null) {
                        $("#txtCodigo").val(datos[0].CODE);
                    }

                    $("#txtCodSunat").val(datos[0].CODE_SUNAT);
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
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


var NCLTICO = function () {

    
    var fillBandejaTico = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjTico').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "Codigo_Sunat" },
                { data: "Descripcion" },                
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



        oTableTico = iniciaTabla('tblTico', parms);
        $('#tblTico').removeAttr('style');



        $('#tblTico tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTico.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableTico.fnGetPosition(this);
                var row = oTableTico.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmtico&codigo=' + codigo;
            }

        });



        $('#tblTico tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableTico.api(true).row($(this).parent().parent()).index();
            var row = oTableTico.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMTICO.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableTico.fnGetData(pos).estado = res;
                        refrescaTabla(oTableTico);
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

            fillBandejaTico();
        }
    };

}();

function validar(cod_sunat, descripcion) {

    mensaje = "";
    if (cod_sunat == "") {
        mensaje = mensaje + 'INGRESE CÓDIGO DE SUNAT.<BR/>';
    }
    if (descripcion == "") {
        mensaje = mensaje + 'INGRESE DESCRIPCIÓN.';
    }
    return mensaje;
}

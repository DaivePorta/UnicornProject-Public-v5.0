var NCLTCON = function () {

    var fillBandejacontribuyente = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjcontribuyente').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "CODIGO_SUNAT" },
                { data: "NOMBRE" },
                {
                    data: "NESTADO",
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


        oTablecontribuyente = iniciaTabla('tblcontribuyente', parms);
        $('#tblcontribuyente').removeAttr('style');


        $('#tblcontribuyente tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablecontribuyente.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablecontribuyente.fnGetPosition(this);
                var row = oTablecontribuyente.fnGetData(pos);
                var codigo = row.CODIGO;

                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmtcon&codigo=' + codigo;
            }

        });


        $('#tblcontribuyente tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTablecontribuyente.api(true).row($(this).parent().parent()).index();
            var row = oTablecontribuyente.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
           
                $.post("vistas/NC/ajax/NCMTCON.ASHX", {  OPCION: 'CT',CODIGO: cod},
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTablecontribuyente.fnGetData(pos).NESTADO = res;
                        refrescaTabla(oTablecontribuyente);
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
            fillBandejacontribuyente();
        }
    };

}();

var NCMTCON = function () {

    var plugins = function () {
        $('#txtCodigoSunat').inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $("#txtNombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 60, "greedy": false }); })
        $("#txtacronimo").focus(function () { $(this).inputmask({ "mask": "k", "repeat":12 , "greedy": false }); })
    }

    var cargaInicial = function () {

        var CODE_TIPO_CONTRI = ObtenerQueryString("codigo");

        if (typeof (CODE_TIPO_CONTRI) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:actualizar();");

            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/ncmtcon.ashx?OPCION=CE&CODIGO=" + CODE_TIPO_CONTRI,
                contenttype: "application/json;",
                datatype: "json",

                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODIGO);
                    $("#txtCodigoSunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtNombre").val(datos[0].NOMBRE);
                    $("#txtacronimo").val(datos[0].ACRONIMO);
                    $("#slctipopersona").val(datos[0].TIPO_PERSONA);
                    if (datos[0].ESTADO_IND == 'A') {
                        $('#uniform-chkActivo span').removeClass().addClass("checked");
                        $('#chkActivo').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkActivo span').removeClass();
                        $('#chkActivo').attr('checked', false);
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
            cargaInicial();
        }
    };
}();

function grabar() {

    if (vErrors(["txtNombre", "txtCodigoSunat", "txtacronimo"])) {
        var SUNAT = $('#txtCodigoSunat').val();
        var NOMBRE = $('#txtNombre').val();
        var ACRO = $('#txtacronimo').val();       
        var ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
        var TIPO = $('#slctipopersona').val();
        var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMTCON.ASHX",
            {
                OPCION: 'CR',
                SUNAT: SUNAT,
                NOMBRE: NOMBRE,
                ACRO: ACRO,
                TIPO:TIPO,
                ESTADO_IND: ESTADO_IND,
                USUA_ID: USUA_ID
            }).done(function (res) {
                Desbloquear("ventana");
                if (res != "EXIS" && res.length == 4) {
                    $('#txtCodigo').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:actualizar();");
                } else {
                    switch (res) {
                        case 'EXIS':
                            alertCustom("El Código de Sunat o Descripción están siendo utilizados.");
                            break;
                        case 'CSN':
                            alertCustom("el Código de Sunat" + SUNAT + " y la Descripción " + NOMBRE + " están siendo utilizados.");
                            break;
                    }
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}

function actualizar() {


    if (vErrors(["txtNombre", "txtCodigoSunat", "txtacronimo"])) {

        var CODE_TIPO_CONTRI = $('#txtCodigo').val();
        var SUNAT = $('#txtCodigoSunat').val();
        var NOMBRE = $('#txtNombre').val();
        var ACRO = $('#txtacronimo').val();
        var ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
        var TIPO = $('#slctipopersona').val();
        var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMTCON.ASHX",
            {
                opcion: 'AT',
                CODIGO: CODE_TIPO_CONTRI,
                SUNAT: SUNAT,
                NOMBRE: NOMBRE,
                ACRO: ACRO,
                TIPO: TIPO,
                ESTADO_IND: ESTADO_IND,
                USUA_ID: USUA_ID
            }).done(function (res) {
                Desbloquear("ventana");
                if (res == 'OK') {
                    exito();
                } else {
                    switch (res) {
                        case 'EXIS':
                            alertCustom("El Código de Sunat o Descripción están siendo utilizados.");
                            break;
                        case 'CSN':
                            alertCustom("el Código de Sunat" + SUNAT + " y la Descripción " + NOMBRE + " están siendo utilizados.");
                            break;
                    }
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}
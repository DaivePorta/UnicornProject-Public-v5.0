var NCLACTV = function () {

    var fillBandejaActividad = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjActividad').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CODIGO_SUNAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBRE" },
                { data: "NOMBRE_PROPIO" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a  class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }
        oTableActividad = iniciaTabla('tblActividad', parms);
        $('#tblActividad').removeAttr('style');

        $('#tblActividad tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableActividad.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableActividad.fnGetPosition(this);
                var row = oTableActividad.fnGetData(pos);
                var codigo = row.CODIGO;

                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmactv&codigo=' + codigo;
            }

        });


        $('#tblActividad tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableActividad.api(true).row($(this).parent().parent()).index();
            var row = oTableActividad.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCACTV.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableActividad.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableActividad);
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
            //plugins();
            fillBandejaActividad();
        }
    };

}();

var NCACTV = function () {

    



    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCACTV.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtcodigosunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtnombre").val(datos[0].NOMBRE);
                    $("#txtnombrepropio").val(datos[0].NOMBRE_PROPIO);
                    $("#txtareadescripcion").val(datos[0].DESCRIPCION);

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

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

    var plugins = function () {

        aMayuscula(":input");

        $("#txtcodigosunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 200, "greedy": false }); })

        $('#txtnombrepropio').focus(function () { $(this).inputmask({ "mask": "L", "repeat": 100, "greedy": false }); })


    }

    return {
        init: function () {

            plugins();
            cargainicial();
            


        }
    };


}();

function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_codigosunat = $("#txtcodigosunat").val();
    var p_nombre = $('#txtnombre').val();
    var p_nombrepropio = $('#txtnombrepropio').val();
    var p_descripcion = $('#txtareadescripcion').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcodigosunat", "txtnombrepropio", "txtnombre"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCACTV.ASHX",
            {
                flag: 2,
                cosu: p_codigosunat,
                nomb: p_nombre,
                user: p_user,
                acti: p_acti,
                codi: p_codi,
                nopo: p_nombrepropio,
                desc: p_descripcion
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXISTE") {
                    alertCustom("El CIIU " + p_codigosunat + " ya existe.");
                } else {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }
}

function Crear() {

    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_codigosunat = $("#txtcodigosunat").val();
    var p_nombre = $('#txtnombre').val();
    var p_nombrepropio = $('#txtnombrepropio').val();
    var p_descripcion = $('#txtareadescripcion').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcodigosunat", "txtnombrepropio", "txtnombre"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCACTV.ASHX",
            {
                flag: 1,
                cosu: p_codigosunat,
                nomb: p_nombre,
                user: p_user,
                acti: p_acti,
                nopo: p_nombrepropio,
                desc: p_descripcion
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXISTE") {
                    alertCustom("El CIIU " + p_codigosunat + " ya existe.");
                } else {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}
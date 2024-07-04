var NCLDOID = function () {

    var fillBandejaDIdentidad = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjDIdentidad').val());
        var parms = {
            data: json,
            columns: [
                { data: "ORDEN" },
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                {
                    data: "CODIGO_SUNAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "MUESTRA" },
                {
                    data: "ESTADO",
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

        oTableDIdentidad = iniciaTabla('tblDIdentidad', parms);
        oTableDIdentidad.fnSetColumnVis(0, false);
        oTableDIdentidad.fnSetColumnVis(4, false);

        $('#tblDIdentidad').removeAttr('style');

        $('#tblDIdentidad tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableDIdentidad.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableDIdentidad.fnGetPosition(this);
                var row = oTableDIdentidad.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmdoid&codigo=' + codigo;
            }

        });

        $('#tblDIdentidad tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableDIdentidad.api(true).row($(this).parent().parent()).index();
            var row = oTableDIdentidad.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCDOID.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableDIdentidad.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableDIdentidad);
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

            fillBandejaDIdentidad();
        }
    };

}();

var NCDOID = function () {

    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCDOID.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].DESC);
                    $("#txtnombrecorto").val(datos[0].DESC_CORTA);
                    $("#txtcosu").val(datos[0].CODIGO_SUNAT);
                    $("#txtorden").val(datos[0].ORDEN);

                    if (datos[0].MUESTRA == "SI") {

                        $('#uniform-chksemuestra span').removeClass().addClass("checked");
                        $('#chksemuestra').attr('checked', true);
                    } else {

                        $('#uniform-chksemuestra span').removeClass();
                        $('#chksemuestra').attr('checked', false);
                    }

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

        //$("#txtcosu").inputmask({ "mask": "9", "repeat": 6, "greedy": false });

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false }); })

        $('#txtnombrecorto').focus(function () { $(this).inputmask({ "mask": "L", "repeat": 20, "greedy": false }); })

        $('#txtorden').inputmask({ "mask": "9", "repeat": 3, "greedy": false });
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
    var p_nombre = $("#txtnombre").val();
    var p_deco = $('#txtnombrecorto').val();
    var p_cosu = $('#txtcosu').val();
    var p_orden = $('#txtorden').val();
    var p_muestra = $('#chksemuestra').is(':checked') ? 'S' : 'N';
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcosu", "txtnombrecorto", "txtnombre", "txtorden"])) {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCDOID.ASHX",
            {
                flag: 2,
                codi: p_codi,
                desc: p_nombre,
                deco: p_deco,
                cosu: p_cosu,
                acti: p_acti,
                user: p_user,
                orde: p_orden,
                mues: p_muestra
            })
            .done(function (res) {
                    Desbloquear("ventana");
                    if (res == "EXISTE") {
                        alertCustom("El Código Sunat " + p_cosu + " ya existe.");
                    } else {
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("onclick", "javascript:Actualizar();");
                    }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
           
    }
}

function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_nombre = $("#txtnombre").val();
    var p_deco = $('#txtnombrecorto').val();
    var p_cosu = $('#txtcosu').val();
    var p_orden = $('#txtorden').val();
    var p_muestra = $('#chksemuestra').is(':checked') ? 'S' : 'N';
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcosu", "txtnombrecorto", "txtnombre", "txtorden"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCDOID.ASHX",
            {
                flag: 1,
                desc: p_nombre,
                deco: p_deco,
                cosu: p_cosu,
                acti: p_acti,
                user: p_user,
                orde: p_orden,
                mues: p_muestra
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "EXISTE") {
                    alertCustom("El Código Sunat " + p_cosu + " ya existe.");
                }
                else {
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

var NMMRANG = function () {

    var plugins = function () {

    }

    var eventoControles = function () {
        $("#btnAceptar").on("click", function () {
            EliminarRango($("#codigoEliminar").val());
            $("#modal-confirmar").modal("hide");

        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");
            $("#codigoEliminar").val("");
        });

        $("#txtNombre").on("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 && $(this).val() != '') {
                $('#txtRangoInicio').focus();
            }
        });
        $("#txtRangoInicio").on("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 && $(this).val() != '') {
                $('#grabar').focus();
            }
        });
    }

    return {
        init: function () {
            plugins();
            ListarRangos();
            eventoControles();

        }
    };

}();

function ListarRangos() {
    $('#tblRangos').DataTable().destroy();
    $('#tblRangos tbody tr').remove();

    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmrang.ashx?OPCION=1",
        async: false,
        success: function (datos) {
            // var parms;
            if (datos != null && typeof datos[0].CODIGO != "undefined") {
                $("#txtRangoInicio").val("");
                $("#txtRangoInicio").removeAttr("disabled");

                var table;
                table = "<table id='tblRangos' class='table bordered'>"
                table += "<thead>"
                table += "<tr>"
                table += "<th style='text-align:center;'>CODIGO</th>"
                table += "<th style='text-align:center;'>NOMBRE</th>"
                table += "<th style='text-align:center;'>RANGO INICIO</th>"
                table += "<th style='text-align:center;'>RANGO FIN</th>"
                table += "<th style='text-align:center;'>ELIMINAR</th>"
                table += "</tr>"
                table += "</thead>"
                table += "<tbody>"
                if (datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        table += "<tr>"
                        table += "<td>" + datos[i].CODIGO + "</td>"
                        table += "<td style='text-align:left;'>" + datos[i].NOMBRE + "</td>"

                        table += "<td style='text-align:center;'>" + datos[i].RANGO_INICIO+ "</td>"

                        if (i == (datos.length-1)) {
                            table += "<td style='text-align:center;'> ... </td>"
                        }
                        else {                          
                            table += "<td style='text-align:center;'>" + datos[i + 1].RANGO_INICIO + "</td>"
                        }
                        table += "<td style='text-align:center;'><a class='btn red eliminar'><i class=icon-trash></i></a></td>"
                        table += "</tr>"
                    }
                }
                else {
                    $("#txtRangoInicio").val("0");
                    $("#txtRangoInicio").attr("disabled", "disabled");
                    table += "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
                }

                table += "</tbody>"
                table += "<table>"

                $("#divTblRangos").html(table);

                $('#tblRangos').DataTable({ aLengthMenu: 10, iDisplayLength: 10, responsive: true, ordering: false, order: [[3, 'desc']] });
                $('#tblRangos').removeAttr('style');
                $('#tblRangos_wrapper').children(':first').remove();
                $('#tblRangos').DataTable().column(0).visible(false);

                $('#tblRangos tbody').on('click', '.eliminar', function () {
                    var rango = $('#tblRangos').DataTable().row($(this).parent().parent()).data();
                    var codigo = rango[0];
                    $("#codigoEliminar").val(codigo);
                    $("#modal-confirmar").modal("show");
                });


            } else {
                $("#txtRangoInicio").val("0");
                $("#txtRangoInicio").attr("disabled", "disabled");
                $('#tblRangos').DataTable({ responsive: true });
                $('#tblRangos').DataTable().column(0).visible(false);
                $('#tblRangos').removeAttr('style');
                $('#tblRangos_wrapper').children(':first').remove();
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function Grabar() {

    if (vErrors(["txtNombre", "txtRangoInicio"])) {

        var data = new FormData();
        data.append('OPCION', '2');
        data.append('p_USUA_ID', $('#ctl00_lblusuario').text());
        data.append('p_NOMBRE', $("#txtNombre").val());
        data.append('p_RANGO_INICIO', $("#txtRangoInicio").val());

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmrang.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("ventana");
            if (res != null) {
                if (res == "OK") {
                    exito();
                    ListarRangos();
                    $("#txtNombre").val("");
                    $("#txtRangoInicio").val("");
                } else if (res == "EXNOM") {
                    alertCustom('El nombre de rango ya existe, ingrese uno nuevo.');
                } else if (res == "EXRAN") {
                    alertCustom('El rango definido ya existe ingrese uno nuevo.');
                } else {
                    alertCustom('El Rango no se registró correctamente.');
                }
            } else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("ventana");
        });

    }

}

function EliminarRango(code) {
    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmrang.ashx?OPCION=3&p_CODE=" + code,
        async: false,
        success: function (datos) {
            if (datos != null) {
                exito();
                ListarRangos();
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function Cancelar() {
    window.location.href = '?f=NMMRANG';
}

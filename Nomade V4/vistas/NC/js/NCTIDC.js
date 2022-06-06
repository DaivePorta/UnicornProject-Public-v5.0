function Actualizar() {
    if (vErrors(["txtcodigosunat", "txtdesc", "txtAcronimo"])) {
        var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
        var p_codi = $('#txtcodigo').val();
        var p_codigosunat = $("#txtcodigosunat").val();
        var p_docinterno = $('#chkDocInterno').is(':checked') ? 'S' : 'N';
        var p_compras = $('#chkcompra').is(':checked') ? 'S' : 'N';
        var p_desc = $('#txtdesc').val();
        var p_deco = $('#txtdeco').val();
        var p_acronimo = $('#txtAcronimo').val();
        var p_user = $('#ctl00_lblusuario').html();

        if ($('#txtdeco').val().length <= 25) {
            Bloquear("ventana");
            $.post("vistas/NC/ajax/NCTIDC.ASHX", {
                flag: 2,
                cosu: p_codigosunat,
                docint: p_docinterno,
                desc: p_desc,
                user: p_user,
                acti: p_acti,
                codi: p_codi,
                deco: p_deco,
                compras: p_compras,
                acronimo: p_acronimo
            },
                function (res) {
                    Desbloquear("ventana");
                    if (res = "OK") {
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Actualizar();");
                    } else {
                        noexito();
                    }
                });
        } else {
            alertCustom('La descripción corta debe tener como máximo 25 caracteres.');
        }
    }
}

function Crear() {
    if (vErrors(["txtcodigosunat", "txtdesc", "txtAcronimo"])) {
        var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
        var p_codigosunat = $("#txtcodigosunat").val();
        var p_docinterno = $('#chkDocInterno').is(':checked') ? 'S' : 'N';
        var p_compras = $('#chkcompra').is(':checked') ? 'S' : 'N';
        var p_desc = $('#txtdesc').val();
        var p_deco = $('#txtdeco').val();
        var p_acronimo = $('#txtAcronimo').val();
        var p_user = $('#ctl00_lblusuario').html();

        if ($('#txtdeco').val().length <= 25) {
            Bloquear("ventana");
            $.post("vistas/NC/ajax/NCTIDC.ASHX", {
                flag: 1,
                cosu: p_codigosunat,
                docint: p_docinterno,
                desc: p_desc, user:
                p_user, acti: p_acti,
                deco: p_deco,
                compras: p_compras,
                acronimo: p_acronimo
            },
                function (res) {
                    Desbloquear("ventana");
                    if (res != "") {
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Actualizar();");
                        $("#txtcodigo").val(res);
                    } else {
                        noexito();
                    }
                });
        } else {
            alertCustom('La descripción corta debe tener como máximo 25 caracteres.');
        }
    }
}

var NCLTIDC = function () {

    var fillBandejaDComercial = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjDComercial').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "CODIGO_SUNAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                { data: "DESCRIPCION_CORTA" },
                {
                    data: "TIPO_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
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

        oTableDComercial = iniciaTabla('tblDComercial', parms);
        $('#tblDComercial').removeAttr('style');

        $('#tblDComercial tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableDComercial.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableDComercial.fnGetPosition(this);
                var row = oTableDComercial.fnGetData(pos);
                var codigo = row.CODIGO;

                window.location.href = '?f=ncmtidc&codigo=' + codigo;
            }

        });
        $('#tblDComercial tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableDComercial.api(true).row($(this).parent().parent()).index();
            var row = oTableDComercial.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCTIDC.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableDComercial.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableDComercial);
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

            fillBandejaDComercial();
        }
    };

}();

var NCTIDC = function () {

    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCTIDC.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);
                    $("#txtAcronimo").val(datos[0].ACRONIMO);
                    

                    $("#txtcodigosunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtdesc").val(datos[0].DESCRIPCION);
                    $("#txtdeco").val(datos[0].DESCRIPCION_CORTA);

                    if (datos[0].TIPO_DOC == 'INTERNO') {
                        $('#uniform-chkDocInterno span').removeClass().addClass("checked");
                        $('#chkDocInterno').attr('checked', true);
                    } else {
                        $('#uniform-chkDocInterno span').removeClass();
                        $('#chkDocInterno').attr('checked', false);
                    }

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    if (datos[0].REG_COMPRA == "SI") {

                        $('#uniform-chkcompra span').removeClass().addClass("checked");
                        $('#chkcompra').attr('checked', true).change();
                    } else {

                        $('#uniform-chkcompra span').removeClass();
                        $('#chkcompra').attr('checked', false).change();
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
        $('#txtAcronimo').inputmask({ mask: 'A', repeat: 3, greedy: false });
        $("#txtcodigosunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });

        $("#txtdesc").focus(function () {
            $(this).inputmask({ "mask": "P", "repeat": 50, "greedy": false });
        });

        //$("#txtdeco").inputmask({ "mask": 'A', "repeat": 25, "greedy": false });
        $('.danger-toggle-button-custom').toggleButtons({
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "info",
                disabled: "danger"
            },
            label: {
                enabled: "SI",
                disabled: "NO"
            }
        });

    }

    return {
        init: function () {
            cargainicial();
            //datatable();
            plugins();
        }
    };
}();

var descripcionCorta = function (field) {
    if (field.value.length > 25) return false;
};
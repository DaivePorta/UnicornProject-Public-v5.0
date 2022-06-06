var NMLPRES = function () {

    var fillBandejaPresentacion = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "PRESENTACION" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }

        var table = iniciaTabla("tblPresentacion", parms);
        $('#tblPresentacion').removeAttr('style');


        $('#tblPresentacion tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=nmmpres&codigo=' + code;
            }
        });

        $('#tblPresentacion tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NM/ajax/NMMPRES.ASHX",
            {
                OPCION: 1,
                CODE: cod
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res != null && res != "") {
                    if (res == "I") res = "INACTIVO";
                    else res = "ACTIVO";
                    table.fnGetData(pos).ESTADO = res;
                    refrescaTabla(table);
                    exito();
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

            $.ajaxSetup({ async: true });

        });

    }

    return {
        init: function () {
            fillBandejaPresentacion();
        }
    };

}();

var NMMPRES = function () {

    var cargaInicial = function () {
        //$('#divSubGrupos').attr('style', 'display:none');

        //initJqxGridMarca("[]");

        var cod = ObtenerQueryString("codigo");

        if (typeof (cod) !== "undefined") {
            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMPRES.ASHX?OPCION=2&CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos != "" && datos != null) {

                        $('#txtCodigo').val(datos[0].CODIGO);
                        if (datos[0].ESTADO == "ACTIVO") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }
                        $('#txtPresentacion').val(datos[0].PRESENTACION);
                        //if (datos[0].JSON == "[]") {
                        //    initJqxGridMarca(datos[0].JSON);
                        //}
                        //else {
                        //    initJqxGridMarca(JSON.stringify(datos[0].JSON));
                        //}
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizarPresentacion();");
                      
                    }

                },
                error: function (msg) {
                    alertCustom("Error al obtener datos de Presentaciones");
                }

            });

        }
    }

    return {
        init: function () {
            cargaInicial();
        }
    };
}();

function HandlerMarca() {
    $("#txtPresentacion").focus(function () { $(this).inputmask({ "mask": "%", "repeat": 150, "greedy": false }); });
}


function grabarPresentacion() {

    var p_DESC= '';
    var p_ESTADO = '';
    var p_USUA_ID = '';

    if (vErrors(["txtPresentacion"])) {

        p_DESC = $.trim($('#txtPresentacion').val());
        p_ESTADO = $('#chkEstado').is(':checked') ? 'A' : 'I';
        p_USUA_ID = $.trim($('#ctl00_lblusuario').html());

        Bloquear("ventana");

        $.post("vistas/NM/ajax/NMMPRES.ASHX", {
            OPCION: "3",
            DESC: p_DESC,
            ESTADO_IND: p_ESTADO,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe la presentacion ingresada.");
                }
                else {
                    //if (res != "" && res != null) {
                    $('#txtCodigo').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                    $("#grabar").attr("href", "javascript:actualizarPresentacion();");              
                    //}
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}

function actualizarPresentacion() {

    var p_CODE = '';
    var p_DESC = '';
    var p_ESTADO= '';
    var p_USUA_ID = '';

    if (vErrors(["txtPresentacion"])) {

        p_CODE = $.trim($('#txtCodigo').val());
        p_DESC = $.trim($('#txtPresentacion').val());
        p_ESTADO = $('#chkEstado').is(':checked') ? 'A' : 'I';
        p_USUA_ID = $.trim($('#ctl00_lblusuario').html());

        Bloquear("ventana");

        $.post("vistas/NM/ajax/NMMPRES.ASHX", {
            OPCION: "4",
            CODE: p_CODE,
            DESC: p_DESC,
            ESTADO_IND: p_ESTADO,
            USUA_ID: p_USUA_ID
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe la presentacion ingresada.");
                }
                else {
                    //if (res != "" && res != null) {

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                    $("#grabar").attr("href", "javascript:actualizarPresentacion();");

                    //}
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}
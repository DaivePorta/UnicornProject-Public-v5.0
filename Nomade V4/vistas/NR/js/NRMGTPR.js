function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_predet = $('#chx_defecto').is(':checked') ? 'S' : 'N';
    var p_codi = $('#txtcodigo').val();
    var p_nombre = $("#txtnombre").val();
    var p_ctlg = $("#slcempr").val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtnombre", "slcempr"])) {

        Bloquear("ventana");
        $.post("vistas/NR/ajax/NRMGTPR.ASHX", { flag: 2, nomb: p_nombre, user: p_user, acti: p_acti, codi: p_codi, empr: p_ctlg, predet: p_predet },
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
    }
}


function Crear() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_predet = $('#chx_defecto').is(':checked') ? 'S' : 'N';
    var p_nombre = $("#txtnombre").val();

    var p_user = $('#ctl00_lblusuario').html();
    var p_ctlg = $("#slcempr").val();

    if (vErrors(["txtnombre", "slcempr"])) {

        Bloquear("ventana");
        $.post("vistas/NR/ajax/NRMGTPR.ASHX", { flag: 1, nomb: p_nombre, user: p_user, acti: p_acti, empr: p_ctlg, predet: p_predet },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                    $("#slcempr").attr("disabled", "disabled");
                } else {
                    noexito();
                }
            });
    }
}

var NRLGTPR = function () {
    var fillBandejaCProveedores = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjCProveedores').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "DESCRIPCION" },
                { data: "EMPRESA.nombre" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                { data: "CONFIGURACION" },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ]

        }

        oTableCProveedores = iniciaTabla('tblCProveedores', parms);
        $('#tblCProveedores').removeAttr('style');


        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $("#filemp").each(function () {
            var select = $('<select id="slcfilempr" class="span12" style="margin-bottom: 0px;"><option></option><option value=" ">Todo</option></select>')
                .appendTo($(this).empty())
                .on('change', function () {
                    $('#tblCProveedores').DataTable().column(2)
                        .search($(this).val())
                        .draw();
                });

            $('#tblCProveedores').DataTable().column(2).data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            $("#slcfilempr").select2({
                placeholder: "EMPRESA",
                allowclear: true
            });

            $("#slcfilempr").val(' ');
            $("#slcfilempr").change();

            $("#s2id_slcfilempr").attr("style", "margin-bottom: -10px;");

        });

        $('#tblCProveedores tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCProveedores.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCProveedores.fnGetPosition(this);
                var row = oTableCProveedores.fnGetData(pos);
                var codigo = row.CODIGO;
                var empresa = row.EMPRESA.codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=nrmgtpr&codigo=' + codigo + "&ctlg=" + empresa;
            }

        });

        $('#tblCProveedores tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = oTableCProveedores.api(true).row($(this).parent().parent()).index();
            var row = oTableCProveedores.fnGetData(pos);
            var cod = row.CODIGO;
            var empresa = row.EMPRESA.codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NR/ajax/NRMGTPR.ASHX", { flag: 3, codi: cod, empr: empresa },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableCProveedores.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableCProveedores);
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
            fillBandejaCProveedores();
        }
    };

}();


var NRMGTPR = function () {
    var cargarcombos = function () {
        $.ajaxSetup({ async: true });
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcempr').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcempr').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#slcempr').select2();
    }

    var eventoControles = function () {
        $('#slcempr').on('change', function () {
            Verifica();
        });
    }

    var Verifica = function () {
        var empx = ObtenerQueryString("empr");
        var codx = ObtenerQueryString("codigo");

        if (empx == null) {
            empx = $('#slcempr').val();
            if (empx == null)
                empx = $("#ctl00_hddctlg").val();
        }

        if (codx == null)            //codx = $('#txtcodigo').val();
        {
            $.ajax({
                ype: "GET",
                url: "vistas/NR/ajax/NRMGTPR.ASHX",
                data: { codi: codx, flag: 6, empr: empx },
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    if (datos != null) {
                        if (datos[0].VERIFICADOR == "0")
                            $('#chx_defecto').attr('disabled', false);
                        else
                            $('#chx_defecto').attr('disabled', true);
                    }
                    else
                        $('#chx_defecto').attr('disabled', true);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    var cargainicial = function () {
        $("#slctipo").select2();
        $("#slcempr").select2("val", $("#ctl00_hddctlg").val());

        var cod = ObtenerQueryString("codigo");
        var empresa = ObtenerQueryString("ctlg");

        if (cod != null && cod != "") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");
            $("#slcempr").attr("disabled", "disabled");

            $.ajax({
                async: false,
                type: "POST",
                url: "vistas/nr/ajax/nrmgtpr.ashx?flag=" + 4 + "&codi=" + cod + "&empr=" + empresa,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].DESCRIPCION);
                    // $("#slctipo").select2("val",datos[0].tipo.substring(0,1));


                    $("#slcempr").select2("val", datos[0].EMPRESA);

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    //if ((datos[0].CONTROL == "S" && datos[0].PREDETERMINADO == "S") || (datos[0].CONTROL == "N" && datos[0].PREDETERMINADO == "N")) {
                    if (datos[0].CONTROL == datos[0].PREDETERMINADO) {
                        if (datos[0].PREDETERMINADO == "S") {
                            $('#uniform-chx_defecto span').removeClass().addClass("checked");
                            $('#chx_defecto').attr('checked', true);
                        }
                        else {
                            $('#uniform-chx_defecto span').removeClass();
                            $('#chx_defecto').attr('checked', false);
                        }
                        $('#chx_defecto').attr('disabled', false);
                    }
                    else
                        $('#chx_defecto').attr('disabled', true);

                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }
    }

    var plugins = function () {
        aMayuscula(":input");
        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 150, "greedy": false }); })
    }

    return {
        init: function () {
            cargarcombos();
            eventoControles();
            cargainicial();
            plugins();

        }
    };
}();
var NCLCOWH = function () {

    var fillBandejaWhatsapp = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjWhatsapp').val());
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
                    data: "EMPRESA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO TELEFONO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "WABA ID",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
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
                    defaultContent: '<a  class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }
        oTableWhatsapp = iniciaTabla('tblWhatsapp', parms);
        $('#tblWhatsapp').removeAttr('style');

        $('#tblWhatsapp tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableWhatsapp.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableWhatsapp.fnGetPosition(this);
                var row = oTableWhatsapp.fnGetData(pos);
                var codigo = row.CODIGO;

                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmcowh&codigo=' + codigo;
            }

        });


        $('#tblWhatsapp tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableWhatsapp.api(true).row($(this).parent().parent()).index();
            var row = oTableWhatsapp.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCCOWH.ASHX", { flag: 3, p_CODIGO: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableWhatsapp.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableWhatsapp);
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
            fillBandejaWhatsapp();
        }
    };

}();

var NCCOWH = function () {

    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");
            //$(":contains('Cancelar')").closest('button').attr("href", "?f=NCLCOWH");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCCOWH.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#cboEmpresa").val(datos[0].EMPRESA);
                    $("#idEmpresa").val(datos[0].ID_EMPRESA);

                    $("#nroTelefono").val(datos[0].NRO_TELEFONO);
                    $("#idTelefono").val(datos[0].ID_TELEFONO);

                    $("#txtareatoken").val(datos[0].TOKEN);
                    $("#idWaba").val(datos[0].WABA_ID);
                    $("#cboVersion").val(datos[0].VERSION);

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
        $("#cboEmpresa").select2();       
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                console.log("ListaEmpresas");
            }
        });
    };

    return {
        init: function () {
            plugins();
            cargainicial();
            fillCboEmpresa();
        }
    };
}();

function Actualizar() {
    var p_codi = $('#txtcodigo').val();
    var p_ctlg = $('#cboEmpresa').val();
    var p_id_negocio = $('#idEmpresa').val();
    var p_tele = $('#nroTelefono').val();
    var p_id_tele = $('#idTelefono').val();
    var p_token = $('#txtareatoken').val();
    var p_waba_id = $('#idWaba').val();
    var p_version = $('#cboVersion').val();
    var p_estado = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_usua = $('#ctl00_lblusuario').html();

    if (vErrors(["idEmpresa", "idTelefono", "txtareatoken", "idWaba", "cboVersion"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCCOWH.ASHX",
            {
                flag: 2,
                p_CODIGO: p_codi,
                p_CTLG_CODE: p_ctlg,
                p_BUSINESS_ID: p_id_negocio,
                p_TELEFONO: p_tele,
                p_PHONE_NUMBER_ID: p_id_tele,
                p_TOKEN: p_token,
                p_WABA_ID: p_waba_id,
                p_VERSION: p_version,
                p_ESTADO_IND: p_estado,
                p_USUA_ID: p_usua
            })
            .done(function (res) {
                Desbloquear("ventana");
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                $("#grabar").attr("onclick", "javascript:Actualizar();");
                $("#txtcodigo").val(res);
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}

function Crear() {

    var p_codi = $('#txtcodigo').val();
    var p_ctlg = $('#cboEmpresa').val();
    var p_id_negocio = $('#idEmpresa').val();
    var p_tele = $('#nroTelefono').val();
    var p_id_tele = $('#idTelefono').val();
    var p_token = $('#txtareatoken').val();
    var p_waba_id = $('#idWaba').val();
    var p_version = $('#cboVersion').val();
    var p_estado = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_usua = $('#ctl00_lblusuario').html();

    if (vErrors(["idEmpresa", "idTelefono", "txtareatoken", "idWaba", "cboVersion"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCCOWH.ASHX",
            {
                flag: 1,
                p_CODIGO: p_codi,
                p_CTLG_CODE: p_ctlg,
                p_BUSINESS_ID: p_id_negocio,
                p_TELEFONO: p_tele,
                p_PHONE_NUMBER_ID: p_id_tele,
                p_TOKEN: p_token,
                p_WABA_ID: p_waba_id,
                p_VERSION: p_version,
                p_ESTADO_IND: p_estado,
                p_USUA_ID: p_usua
            })
            .done(function (res) {
                Desbloquear("ventana");
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                $("#grabar").attr("onclick", "javascript:Actualizar();");
                $("#txtcodigo").val(res);
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}
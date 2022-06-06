var NSLFORM = function () {

    var fillBandejaFormas = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCR" },
                { data: "NSIST_CODE" },
                {
                    data: "FECHA_ACTV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                     data: "TIPO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                },
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }

        oTableFormas = iniciaTabla('tblFormas', parms);
        $('#tblFormas').removeAttr('style');
        $('#tblFormas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableFormas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableFormas.fnGetPosition(this);
                var row = oTableFormas.fnGetData(pos);
                var CODE = row.CODE;
                window.location.href = '?f=nsmform&codigo=' + CODE;
            }
        });
    }

    return {
        init: function () {
            fillBandejaFormas();
        }
    };

}();

var NSMFORM = function () {

    var fillCboSistema = function () {
        var selectSistema = $('#cboSistema');
        $('#cboSistema').select2();

        $.ajax({
            type: "post",
            url: "vistas/ns/ajax/nsmform.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectSistema.empty();
                selectSistema.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectSistema.append('<option value="' + datos[i].CODIGO + '" data-tipo="' + datos[i].TIPO_IND + '"  >' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    var eventoControles = function () {

        $('#chkEstado').on('change', function () {
            if ($("#chkEstado").is(':checked')) {
                $('#chkEstado').parent().parent().siblings('span').html('Activo');
            } else {
                $('#chkEstado').parent().parent().siblings('span').html('Inactivo');
            }
        });

        $('#txtCodigo').on('focus', function () {
            $('#txtCodigo').inputmask({ "mask": "%", "repeat": 9, "greedy": false });
        });

        $('#txtDescripcion').on('focus', function () {
            $('#txtDescripcion').inputmask({ "mask": "%", "repeat": 100, "greedy": false });
        });

    }

    var cargaInicial = function () {
        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");


            var data = new FormData();

            data.append('OPCION', 'R');
            data.append('CODE', CODE);

            $.ajax({

                url: "vistas/ns/ajax/nsmform.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {

                        $('#txtCodigo').attr('disabled', true);
                        $('#txtCodigo').val(datos[0].CODE);
                        $('#txtDescripcion').val(datos[0].DESCR);
                        if (datos[0].ESTADO_IND == 'A') {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                            $('#chkEstado').parent().parent().siblings('span').html('Activo');
                        }
                        else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                            $('#chkEstado').parent().parent().siblings('span').html('Inactivo');
                        }
                        fillCboSistemaPorTipo(datos[0].TIPO_IND);
                        $('#cboSistema').select2('val', datos[0].SIST_CODE);
                        $("#txtayuda").val(datos[0].AYUDA);


                    }
                }

            });


        }
    }
    return {
        init: function () {
            fillCboSistema();
            eventoControles();
            cargaInicial();
        }
    };

}();

function Grabar() {
    var Errors = true;
    var CODE = '';
    var DESC = '';
    var ESTADO_IND = '';
    var SIST_CODE = '';
    var USUA_ID = '';
    var TIPO = '';
    var AYUDA = '';
    
    CODE = $.trim($('#txtCodigo').val());
    DESC = $.trim($('#txtDescripcion').val());
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    SIST_CODE = $.trim($('#cboSistema').val());
    USUA_ID = $.trim($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val());
    TIPO = $("#cboSistema :selected").attr("data-tipo");
    AYUDA = $("#txtayuda").val();

    var data = new FormData();

    data.append("OPCION", "N");
    data.append("CODE", CODE);
    data.append("DESC", DESC);
    data.append("ESTADO_IND", ESTADO_IND);
    data.append("SIST_CODE", SIST_CODE);
    data.append("USUA_ID", USUA_ID);
    data.append("TIPO", TIPO);
    data.append("AYUDA", AYUDA);

    Errors = validarFormas();

    if (Errors) {

        Bloquear("ventana");

        $.ajax({
            url: "vistas/ns/ajax/nsmform.ashx",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        Desbloquear("ventana");
                        if (datos[0].CODIGO == "EXISTE") {
                            alertCustom("EXISTE CODIGO INGRESADO");
                        }
                        else {
                            $('#txtCodigo').val(datos[0].CODIGO);
                            $('#txtCodigo').attr('disabled', true);
                            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabar").attr("href", "javascript:Modificar();");
                            exito();
                            fillCboSistemaPorTipo(TIPO);
                            $('#cboSistema').select2('val', SIST_CODE);
                        }
                    }
                }

            },
            error: function (msg) {
                Desbloquear("ventana");
                alert(msg);
            }
        });

    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
}

function validarFormas() {
    var v_Errors = true;
    var v_Codigo = '';

    v_Codigo = $.trim($('#txtCodigo').val());

    if (v_Codigo.length >= 0 && v_Codigo.length < 7) {

        $('#txtCodigo').val('');
        if (vErrorsNotMessage(["txtCodigo"]) == false) {
            v_Errors = false;
            $('#txtCodigo').val(v_Codigo);
            $('#txtCodigo').parent().parent().removeClass();
            $('#txtCodigo').parent().parent().addClass('control-group error');
            $('#txtCodigo ~ span').children().remove();
        }

    }

    if (vErrorsNotMessage(["txtDescripcion"]) == false) {
        v_Errors = false;
    }

    if (vErrorsNotMessage(["cboSistema"]) == false) {
        v_Errors = false;
    }

    return v_Errors;
}

function Modificar() {

    var Errors = true;
    var CODE = '';
    var DESC = '';
    var ESTADO_IND = '';
    var SIST_CODE = '';
    var USUA_ID = '';
    var TIPO = '';
    var AYUDA = '';

    CODE = $.trim($('#txtCodigo').val());
    DESC = $.trim($('#txtDescripcion').val());
    ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    SIST_CODE = $.trim($('#cboSistema').val());
    USUA_ID = $.trim($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val());
    TIPO = $("#cboSistema :selected").attr("data-tipo");
    AYUDA = $("#txtayuda").val();
    Errors = validarFormas();
    var data = new FormData();

    data.append("OPCION", "M");
    data.append("CODE", CODE);
    data.append("DESC", DESC);
    data.append("ESTADO_IND", ESTADO_IND);
    data.append("SIST_CODE", SIST_CODE);
    data.append("USUA_ID", USUA_ID);
    data.append("TIPO", TIPO);
    data.append("AYUDA", AYUDA);

    if (Errors) {

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "post",
            url: "vistas/ns/ajax/nsmform.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                if (datos != null) {
                    if (datos[0].SUCCESS == "OK") {
                        Desbloquear("ventana");

                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                        exito();

                    }
                }

            })
            .error(function (msg) {
                Desbloquear("ventana");
                alert(msg);
            });

    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
}

var fillCboSistemaPorTipo = function (tipo) {
    var selectSistema = $('#cboSistema');
    $('#cboSistema').select2();

    $.ajax({
        type: "post",
        url: "vistas/ns/ajax/nsmform.ashx?OPCION=2&TIPO=" + tipo,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectSistema.empty();
            selectSistema.append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectSistema.append('<option value="' + datos[i].CODIGO + '" data-tipo="' + datos[i].TIPO_IND + '"  >' + datos[i].NOMBRE + '</option>');
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
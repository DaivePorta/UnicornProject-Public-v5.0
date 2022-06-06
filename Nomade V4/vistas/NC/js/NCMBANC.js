var NCLBANC = function () {

    var fillBancos = function () {
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfBancos').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO_SUNAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NOMBRE_COMERCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "RUC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_TERMINO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        var ft = ($(td).text().split(' ', 1))[0];
                        $(td).text(ft);
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        oTablaBancos = iniciaTabla('tblBancos', parms);

        $("#tblBancos").removeAttr("style");

        $('#tblBancos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablaBancos.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablaBancos.fnGetPosition(this);
                var row = oTablaBancos.fnGetData(pos);
                var cod = row.BANCO;

                window.location.href = '?f=NCMBANC&codigo=' + cod;
            }
        });
    };

    return {
        init: function () {
            fillBancos();
        }
    };

}();

var NCMBANC = function () {

    var plugins = function () {
        $('#txtFechaVigente').datepicker({ format: "dd/mm/yyyy" });
        $('#txtFechaTermino').datepicker({ format: "dd/mm/yyyy" });
        $('#txtCodSunat').inputmask({ mask: "9", repeat: 2, greedy: false });
        $('#chkEstado').on('change', function () {
            var act = $('#chkEstado').is(':checked');
            if (act) {
                $('#txtFechaTermino').prop('disabled', true);
                $('#txtFechaTermino').val('');
            } else {
                $('#txtFechaTermino').prop('disabled', false);
                $('#txtFechaTermino').val('');
            }
        });
    };

    var cargarBanco = function () {
        var codigo = ObtenerQueryString("codigo");
        if (codigo != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMBANC.ashx?OPCION=0&CODIGO=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        $('#txtCodigo').val(datos[0].BANCO);
                        $('#txtCodSunat').val(datos[0].CODIGO_SUNAT);
                        $('#txtDescSunat').val(datos[0].DESCRIPCION);

                        if (datos[0].ESTADO == 'ACTIVO') {
                            //$('#chkEstado').attr('checked', 'checked');
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado ').attr('checked', true).parent().addClass("checked")
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false).parent().removeClass("checked")

                            $('#txtFechaTermino').prop('disabled', false);
                            var ft = (datos[0].FECHA_TERMINO.toString().split(' ', 1))[0];
                            $('#txtFechaTermino').datepicker('setDate',ft);
                        }

                        $('#txtPersona').val(datos[0].PERSONA);
                        if ($('#txtPersona').val().length > 0) {
                            $('#txtNombreComercial').val(datos[0].NOMBRE_COMERCIAL);
                        }

                        $('#txtRuc').val(datos[0].RUC);

                        var fv = (datos[0].FECHA_VIGENTE.toString().split(' ', 1))[0];
                        $('#txtFechaVigente').datepicker('setDate',fv);

                        $('#btnGrabar').css("display", "none");
                        $('#btnActualizar').css("display", "inline-block");

                        $('#hfPIDM').val(datos[0].PIDM);
                        $('#btnver').attr('href', '?f=ncmpers&tp=J&td=6&d=' + $('#txtRuc').val());
                    } else {
                        $('#btnActualizar').css("display", "none");
                        $('#btnGrabar').css("display", "inline-block");
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        } else {
            //$('#chkEstado').attr('checked', 'checked');
        }
    };

    var autocompletarPersona = function (v_ID, v_value) {
        var txtResp = $(v_ID);
        txtResp.typeahead({
            minLength: 3,
            source: function (query, process) {
                arrayNC = [];
                map = {};
                $.ajax({
                    type: "post",
                    url: "vistas/NC/ajax/NCMBANC.ashx?OPCION=1",
                    data: { type: 'keyword', q: query },
                    cache: false,
                    datatype: "json",
                    async: false,
                    success: function (datos) {
                        if (datos !== null && datos !== '') {
                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                arrayNC.push(datos[i].RAZONSOCIAL);
                                obj += '{ "PIDM" : "' + datos[i].PIDM + '", "RAZONSOCIAL" : "' + datos[i].RAZONSOCIAL + '", "RAZO_COME" : "' + datos[i].RAZO_COME + '", "RUC" : "' + datos[i].RUC + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZONSOCIAL] = objeto;
                            });

                            return process(arrayNC);
                        }
                        if (datos != null && $.trim(v_value).length > 0) {
                            txtResp.val(v_value);
                        }
                    },
                    error: function (msg) {
                        alert(msg.d);
                    }
                });
            },
            updater: function (item) {
                $('#hfPIDM').val(map[item].PIDM);
                $('#txtNombreComercial').val(map[item].RAZO_COME);
                $('#txtRuc').val(map[item].RUC);
                $('#btnver').attr('href', '?f=ncmpers&tp=J&td=6&d=' + map[item].RUC);
                return item;
            }
        });

        txtResp.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))
            if (txtResp.val().length <= 0) {
                $('#hfPIDM').val('');
                $('#txtNombreComercial').val('');
                $('#btnver').attr('href', '');
            }
        });
    };

    return {
        init: function () {
            plugins();
            autocompletarPersona('#txtPersona', '');
            cargarBanco();
        }
    };
}();

function Grabar() {
    var a = ['txtCodSunat', 'txtDescSunat', 'txtPersona', 'txtFechaVigente', 'txtFechaTermino'];
    if ($('#chkEstado').is(':checked')) {
        a = ['txtCodSunat', 'txtDescSunat', 'txtPersona', 'txtFechaVigente'];
    }
    else {
        var fechaIni = $('#txtFechaVigente').val();
        var fechaFin = $('#txtFechaTermino').val();

        if (DateDiff(new Date(ConvertirDate(fechaFin)), new Date(ConvertirDate(fechaIni))) <= 0) {
            alertCustom("La Fecha de Inicio de Vigencia no puede ser mayor o igual a la Fecha de Fin");
            return;
        }

    }
    if (vErrorsNotMessage(a)) {
        var CODIGO_SUNAT = $('#txtCodSunat').val();
        var DESC = $('#txtDescSunat').val();
        var FECHA_VIG = $('#txtFechaVigente').val();
        var FECHA_TERM = $('#txtFechaTermino').val();
        var PIDM = $('#hfPIDM').val();
        var NOM_COM = $('#txtNombreComercial').val();
        var USUA_ID = $('#ctl00_txtus').val();
        var ESTADO = ($('#chkEstado').is(':checked')) ? 'A' : 'I';

        FECHA_VIG = FECHA_VIG.split('/');
        FECHA_VIG = FECHA_VIG[2] + '-' + FECHA_VIG[1] + '-' + FECHA_VIG[0];

        if (FECHA_TERM != '') {
            FECHA_TERM = FECHA_TERM.split('/');
            FECHA_TERM = FECHA_TERM[2] + '-' + FECHA_TERM[1] + '-' + FECHA_TERM[0];
        }

        var data = new FormData();
        data.append('OPCION', '2');
        data.append('CODIGO_SUNAT', CODIGO_SUNAT);
        data.append('DESC', DESC);
        data.append('FECHA_VIG', FECHA_VIG);
        data.append('FECHA_TERM', FECHA_TERM);
        data.append('PIDM', PIDM);
        data.append('NOM_COM', NOM_COM);
        data.append('USUA_ID', USUA_ID);
        data.append('ESTADO', ESTADO);

        Bloquear('p_banco');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMBANC.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            if (res != null) {
                if (res != '0000') {
                    exito();
                    setTimeout(function () {
                        window.location = '?f=NCMBANC&codigo=' + res;
                    }, 1200);
                } else {
                    noexito();
                }
            }
        })
        .error(function () {
            Desbloquear("p_banco");
            alert("Error al grabar Nuevo Banco.");
        });
    }
};

function Actualizar() {
    var a = ['txtCodSunat', 'txtDescSunat', 'txtPersona', 'txtFechaVigente', 'txtFechaTermino'];
    if ($('#chkEstado').is(':checked')) {
        a = ['txtCodSunat', 'txtDescSunat', 'txtPersona', 'txtFechaVigente'];
    }
    else {
        var fechaIni = $('#txtFechaVigente').val();
        var fechaFin = $('#txtFechaTermino').val();
        if (DateDiff(new Date(ConvertirDate(fechaFin)), new Date(ConvertirDate(fechaIni))) <= 0) {
            alertCustom("La Fecha de Inicio de Vigencia no puede ser mayor o igual a la Fecha de Fin");
            return;
        }
    }
    if (vErrorsNotMessage(a)) {
        var CODIGO = $('#txtCodigo').val();
        var CODIGO_SUNAT = $('#txtCodSunat').val();
        var DESC = $('#txtDescSunat').val();
        var FECHA_VIG = $('#txtFechaVigente').val();
        var FECHA_TERM = $('#txtFechaTermino').val();
        var PIDM = $('#hfPIDM').val();
        var NOM_COM = $('#txtNombreComercial').val();
        var USUA_ID = $('#ctl00_txtus').val();
        var ESTADO = ($('#chkEstado').is(':checked')) ? 'A' : 'I';

        FECHA_VIG = FECHA_VIG.split('/');
        FECHA_VIG = FECHA_VIG[2] + '-' + FECHA_VIG[1] + '-' + FECHA_VIG[0];

        if (FECHA_TERM != '') {
            FECHA_TERM = FECHA_TERM.split('/');
            FECHA_TERM = FECHA_TERM[2] + '-' + FECHA_TERM[1] + '-' + FECHA_TERM[0];
        }

        var data = new FormData();
        data.append('OPCION', '3');
        data.append('CODIGO', CODIGO);
        data.append('CODIGO_SUNAT', CODIGO_SUNAT);
        data.append('DESC', DESC);
        data.append('FECHA_VIG', FECHA_VIG);
        data.append('FECHA_TERM', FECHA_TERM);
        data.append('PIDM', PIDM);
        data.append('NOM_COM', NOM_COM);
        data.append('USUA_ID', USUA_ID);
        data.append('ESTADO', ESTADO);

        Bloquear('p_banco');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMBANC.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            if (res != null) {
                if (res == 'OK') {
                    exito();

                } else {
                    noexito();
                }
            }
            Desbloquear("p_banco");
        })
        .error(function () {
            Desbloquear("p_banco");
            alert("Error al modificar Banco.");
        });
    }
};
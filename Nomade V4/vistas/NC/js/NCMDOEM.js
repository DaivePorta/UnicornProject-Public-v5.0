var NCLDOEM = function () {

    var oTableDoc = null;

    var fnPluguins = function () {
        $('#cboEmpresa').select2();
    };

    var eventos = function () {
        $('#cboEmpresa').on('change', function () {
            fnListarDocumentos($(this).val());
        });

        $('#tDOEM tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableDoc.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableDoc.fnGetPosition(this);
                var row = oTableDoc.fnGetData(pos);
                var codigo = row.CODE;

                window.location.href = '?f=ncmdoem&codigo=' + codigo;
            }
        });

        $('#tDOEM tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = oTableDoc.api(true).row($(this).parent().parent()).index();
            var row = oTableDoc.fnGetData(pos);
            var code = row.CODE;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMDOEM.ASHX", { OPCION: 'CA', P_CODE: code, P_USUA_ID: $('#ctl00_txtus').val() },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableDoc.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableDoc);
                        exito();
                        //$('#cboEmpresa').select2('val', $('#cboEmpresa2').val());

                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });
        });
    };

    var cargarEmpresas = function () {

        $('#cboEmpresa').html(fnGetEmpresasUsuario(1, "A"));
        $('#cboEmpresa').select2("val", $("#ctl00_hddctlg").val());
    };

    var fnIniTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "DCTO_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "SUNAT_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "DCTO_DESC"
                },
                {
                    data: "TIPO_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "GASTOS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "ALMACEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "COMPRA_VENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CASOS_ESP",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "FECHA_ELEC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CTLG_CODE",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CODE",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ]
        }

        oTableDoc = iniciaTabla("tDOEM", parms);

        $("#tDOEM").removeAttr("style");

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

    };

    var fnListarDocumentos = function (vEmpresa) {
       
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMDOEM.ashx?OPCION=LTDCE&sEmpresa=" + vEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    oTableDoc.fnClearTable();
                    oTableDoc.fnAddData(datos);
                    Desbloquear('ventana');
                }
                else {
                    alertCustom("No Documentos registrados ..!")
                    oTableDoc.fnClearTable();
                    Desbloquear('ventana');
                }
            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de documentos");
            }
        });
    };

    return {
        init: function () {
            fnPluguins();
            cargarEmpresas();
            fnIniTabla();
            eventos();
            fnListarDocumentos($('#cboEmpresa').val());
        }
    };
}();

var NCMDOEM = function () {

    dcct = [];
    td = [];

    var fnPluguins = function () {
        $('#cboEmpresa').select2();
    };

    var cargarDocumentosEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMDOEM.ashx?OPCION=LTDCE",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    dcct = datos;
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var cargarTiposDC = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMDOEM.ashx?OPCION=LTDC",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    td = datos;
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var llenarTiposDC = function () {
        var select = $('#cboDocumento');
        select.empty();
        select.append('<option></option>');
        if (dcct !== null) {
            for (var i = 0; i < td.length; i++) {
                if (!dcct.contieneDoc($('#cboEmpresa').val(), td[i])) {
                    select.append('<option value="' + td[i].CODIGO + '" code_sunat="' + td[i].CODIGO_SUNAT + '">' + td[i].DESCRIPCION + '</option>');
                }
            }
        } else {
            for (var i = 0; i < td.length; i++) {
                select.append('<option value="' + td[i].CODIGO + '" code_sunat="' + td[i].CODIGO_SUNAT + '">' + td[i].DESCRIPCION + '</option>');
            }
        }
        select.select2();
        select.select2('val', null);
    };

    var eventos = function () {
        $('#cboEmpresa').on('change', function () {
            llenarTiposDC();
        });
        $('#cboDocumento').on('change', function () {
            var code_sunat = $('#cboDocumento option:selected').attr('code_sunat');
            $('#txtCodSunat').val(code_sunat);
        });
        $('#chkGastosE').on('change', function () {
            var checked = $(this).is(':checked');
            if (checked) {
                $('#chkGastosU').prop('checked', true);
                $('#uniform-chkGastosU span').addClass('checked');
            }
        });
        $('#chkAlmacenE').on('change', function () {
            var checked = $(this).is(':checked');
            if (checked) {
                $('#chkAlmacenU').prop('checked', true);
                $('#uniform-chkAlmacenU span').addClass('checked');
            }
        });
        $('#chkCVE').on('change', function () {
            var checked = $(this).is(':checked');
            if (checked) {
                $('#chkCVU').prop('checked', true);
                $('#uniform-chkCVU span').addClass('checked');
            }
        });
        $('#chkGastosU').on('change', function () {
            var checked = $(this).is(':checked');
            if (!checked) {
                $('#chkGastosE').prop('checked', false);
                $('#uniform-chkGastosE span').removeClass('checked');
            }
        });
        $('#chkAlmacenU').on('change', function () {
            var checked = $(this).is(':checked');
            if (!checked) {
                $('#chkAlmacenE').prop('checked', false);
                $('#uniform-chkAlmacenE span').removeClass('checked');
            }
        });
        $('#chkCVU').on('change', function () {
            var checked = $(this).is(':checked');
            if (!checked) {
                $('#chkCVE').prop('checked', false);
                $('#uniform-chkCVE span').removeClass('checked');
            }
        });
        $('#chkElec').on('change', function () {
            var checked = $(this).is(':checked');
            $('#txtFechaElec').prop('disabled', !checked);
            var valor = (checked) ? $('#txtFechaElec').val() : '';
            $('#txtFechaElec').val(valor);
        });
        $('#chkEEM').on('change', function () {
            var checked = $(this).is(':checked');
            if (checked) {
                $('#chkEUS').prop('checked', true);
                $('#uniform-chkEUS span').addClass('checked');
            }
        });
    };

    var cargarEmpresas = function () {
        $('#cboEmpresa').html(fnGetEmpresasUsuario(1, "A"));
    };

    var cargarDocumentoEmite = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMDOEM.ashx?OPCION=L&P_CODE=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null) {
                        $('#hf_codigo').val(datos[0].CODE);
                        $('#txtCodSunat').val(codigo);
                        $('#cboEmpresa').select2('val', datos[0].CTLG_CODE);
                        $('#cboEmpresa').prop('disabled', true);
                        $('#cboDocumento').empty();
                        $('#cboDocumento').html('<option value="' + datos[0].DCTO_CODE + '">' + datos[0].DCTO_DESC + '</option>');
                        $('#cboDocumento').prop('disabled', true);
                        $('#cboDocumento').select2();
                        $('#txtCodSunat').val(datos[0].SUNAT_CODE);
                        let fecha_elec = datos[0].FECHA_ELEC;
                        fecha_elec = (fecha_elec === null ? "" : fecha_elec);
                        if (fecha_elec != "") {
                            $('#chkElec').prop('checked', true);
                            $('#uniform-chkElec span').addClass('checked');

                            $('#txtFechaElec').prop('disabled', false);
                            $('#txtFechaElec').val(datos[0].FECHA_ELEC);
                        }
                        var g = datos[0].GASTOS;
                        if (g != '-') {
                            if (g == 'EMITE') {
                                $('#chkGastosE').prop('checked', true);
                                $('#uniform-chkGastosE span').addClass('checked');
                                $('#chkGastosU').prop('checked', true);
                                $('#uniform-chkGastosU span').addClass('checked');
                            }
                            else {
                                $('#chkGastosU').prop('checked', true);
                                $('#uniform-chkGastosU span').addClass('checked');
                            }
                        }
                        var a = datos[0].ALMACEN;
                        if (a != '-') {
                            if (a == 'EMITE') {
                                $('#chkAlmacenE').prop('checked', true);
                                $('#uniform-chkAlmacenE span').addClass('checked');
                                $('#chkAlmacenU').prop('checked', true);
                                $('#uniform-chkAlmacenU span').addClass('checked');
                            }
                            else {
                                $('#chkAlmacenU').prop('checked', true);
                                $('#uniform-chkAlmacenU span').addClass('checked');
                            }
                        }
                        var cv = datos[0].COMPRA_VENTA;
                        if (cv != '-') {
                            if (cv == 'EMITE') {
                                $('#chkCVE').prop('checked', true);
                                $('#uniform-chkCVE span').addClass('checked');
                                $('#chkCVU').prop('checked', true);
                                $('#uniform-chkCVU span').addClass('checked');
                            }
                            else {
                                $('#chkCVU').prop('checked', true);
                                $('#uniform-chkCVU span').addClass('checked');
                            }
                        }

                        var ce = datos[0].CASOS_ESP;
                        if (ce != '-') {
                            if (ce == 'EMITE') {
                                $('#chkEEM').prop('checked', true);
                                $('#uniform-chkEEM span').addClass('checked');
                                $('#chkEUS').prop('checked', true);
                                $('#uniform-chkEUS span').addClass('checked');
                            }
                            else {
                                $('#chkEUS').prop('checked', true);
                                $('#uniform-chkEUS span').addClass('checked');
                            }
                        }

                        $('#grabar').addClass('hidden');
                        $('#actualizar').removeClass('hidden');
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    };

    return {
        init: function () {
            fnPluguins();
            $('#txtFechaElec').datepicker({ format: 'dd/mm/yyyy' });
            //cargarDocumentosEmpresa();
            cargarTiposDC();
            cargarEmpresas();
            cargarDocumentosEmpresa();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            eventos();
            llenarTiposDC();
            cargarDocumentoEmite();
        }
    };
}();



var Grabar = function () {
    var gastos = '';
    gastos = ($('#chkGastosE').is(':checked')) ? 'E' : '';
    if (gastos == '') gastos = ($('#chkGastosU').is(':checked')) ? 'U' : '';

    var almacen = '';
    almacen = ($('#chkAlmacenE').is(':checked')) ? 'E' : '';
    if (almacen == '') almacen = ($('#chkAlmacenU').is(':checked')) ? 'U' : '';

    var compra_venta = '';
    compra_venta = ($('#chkCVE').is(':checked')) ? 'E' : '';
    if (compra_venta == '') compra_venta = ($('#chkCVU').is(':checked')) ? 'U' : '';

    var casos_especiales = '';
    casos_especiales = ($('#chkEEM').is(':checked')) ? 'E' : '';
    if (casos_especiales == '') casos_especiales = ($('#chkEUS').is(':checked')) ? 'U' : '';

    var a = ['cboDocumento'];

    if ($('#chkElec').is(':checked')) {
        a.push('txtFechaElec');
    }

    if (vErrorsNotMessage(a)) {
        if (gastos == '' && almacen == '' && compra_venta == '' && casos_especiales == '' ) {
            alertCustom("Por favor, especifique las opciones para Gastos, Almacén y Compra/Venta.");
        } else {
            var P_CTLG_CODE = $('#cboEmpresa').val();
            var P_DCTO_CODE = $('#cboDocumento').val();
            var P_USUA_ID = $('#ctl00_txtus').val();
            var P_FECHA_ELEC = $('#txtFechaElec').val();

            var data = new FormData();
            data.append('OPCION', 'G');
            data.append('P_CTLG_CODE', P_CTLG_CODE);
            data.append('P_DCTO_CODE', P_DCTO_CODE);
            data.append('P_USUA_ID', P_USUA_ID);
            data.append('P_GASTOS', gastos);
            data.append('P_ALMACEN', almacen);
            data.append('P_COMPRA_VENTA', compra_venta);
            data.append('P_CASOS_ESP_IND', casos_especiales);
            data.append('P_FECHA_ELEC', P_FECHA_ELEC);

            Bloquear('ventana');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMDOEM.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (res) {
                Desbloquear("ventana");
                if (res != null) {
                    $('#hf_codigo').val(res);
                    res = new Number(res);
                    if (res > 0) {
                        exito();
                        $('#cboEmpresa').prop('disabled', true);
                        $('#cboDocumento').prop('disabled', true);
                        $("#grabar").addClass("hidden");
                        $("#actualizar").removeClass("hidden");
                    }
                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                alertCustom("Error al grabar Nueva Caja. Por favor intente nuevamente.");
            });
        }
    }
};

var Actualizar = function () {
    var gastos = '';
    gastos = ($('#chkGastosE').is(':checked')) ? 'E' : '';
    if (gastos == '') gastos = ($('#chkGastosU').is(':checked')) ? 'U' : '';

    var almacen = '';
    almacen = ($('#chkAlmacenE').is(':checked')) ? 'E' : '';
    if (almacen == '') almacen = ($('#chkAlmacenU').is(':checked')) ? 'U' : '';

    var compra_venta = '';
    compra_venta = ($('#chkCVE').is(':checked')) ? 'E' : '';
    if (compra_venta == '') compra_venta = ($('#chkCVU').is(':checked')) ? 'U' : '';

    var casos_especiales = '';
    casos_especiales = ($('#chkEEM').is(':checked')) ? 'E' : '';
    if (casos_especiales == '') casos_especiales = ($('#chkEUS').is(':checked')) ? 'U' : '';

    var a = [];

    if ($('#chkElec').is(':checked')) {
        a.push('txtFechaElec');
    }

    if (gastos == '' && almacen == '' && compra_venta == '' && casos_especiales == '' ) {
        alertCustom("Por favor, especifique las opciones para Gastos, Almacén y Compra/Venta.");
    } else {
        if (vErrors(a)) {
            var P_CODE = $('#hf_codigo').val();//ObtenerQueryString('codigo');
            var P_USUA_ID = $('#ctl00_txtus').val();
            var P_FECHA_ELEC = $('#txtFechaElec').val();

            var data = new FormData();
            data.append('OPCION', 'A');
            data.append('P_CODE', P_CODE);
            data.append('P_USUA_ID', P_USUA_ID);
            data.append('P_GASTOS', gastos);
            data.append('P_ALMACEN', almacen);
            data.append('P_COMPRA_VENTA', compra_venta);
            data.append('P_CASOS_ESP_IND', casos_especiales);
            data.append('P_FECHA_ELEC', P_FECHA_ELEC);

            Bloquear('ventana');

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMDOEM.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
            .success(function (res) {
                Desbloquear("ventana");
                if (res != null) {
                    if (res == 'OK') {
                        exito();
                    } else {
                        alertCustom('Por favor, indique las opciones para Gastos, Almacén y Compra/Venta');
                    }
                }
            })
            .error(function () {
                Desbloquear("ventana");
                alertCustom("Error al modificar Tipo de Documento. Por favor intente nuevamente.");
            });
        }
    }
};

Array.prototype.contieneDoc = function (ctlg, doc) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].DCTO_CODE == doc.CODIGO && this[i].CTLG_CODE == ctlg) return true;
    }
    return false;
};
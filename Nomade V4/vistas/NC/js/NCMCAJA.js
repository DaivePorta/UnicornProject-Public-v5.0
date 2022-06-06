var NCLCAJA = function () {
    var plugins = function () {        
        $('#cboEmpresas, #cboEstablecimiento').select2();
    };

    var fillCajas = function () {
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCajas').val());
        var parms = {
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel"
                    }
                ]
            },
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '5%');
                    }
                },
                {
                    data: "DESC_EMPRESA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '21%');
                    }
                }, {
                    data: "DESC_SUCURSAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '11%');
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "DESC_TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "RESPONSABLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "TELEFONO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '8%');
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '5%');
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '5%');
                    }
                },
                {
                    data: "EMPRESA",
                    visible: false
                },
                {
                    data: "SUCURSAL",
                    visible: false
                }
            ]
        }

        tabla = $('#tblCajas').dataTable(parms);

        $("#tblCajas").removeAttr("style");

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">EMPRESA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">ESTABLECIMIENTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">NOMBRE CAJA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">TIPO CAJA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">RESPONSABLE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="6" href="#">TELEFONO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="7" href="#">ESTADO</a>\
                    </div>');

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblCajas').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });

        $('#tblCajas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                tabla.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = tabla.fnGetPosition(this);
                var row = tabla.fnGetData(pos);
                var cod = row.CODIGO;

                window.location.href = '?f=NCMCAJA&codigo=' + cod;
            }
        });

        $('#tblCajas tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = tabla.api(true).row($(this).parent().parent()).index();
            var row = tabla.fnGetData(pos);
            var code = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMCAJA.ASHX", { OPCION: 'CE', CODIGO: code },
                function (res) {
                    if (res != null) {
                        if (res != null) {
                            if (res == "I") res = "INACTIVO";
                            else res = "ACTIVO";
                            $('#tblCajas').DataTable().cell(pos, 7).data(res).draw();
                            exito();
                        } else {
                            noexito();
                        }
                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });
            Desbloquear("ventana");
        });
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option value=" ">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                //selectEst.val($('#ctl00_hddestablecimiento').val());
                //selectEst.change();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresas').change(function () {
            fillCboEstablecimiento();
            $('#tblCajas').DataTable().column(9).search($(this).val()).draw();
            $('#cboEstablecimiento').select2('val', ' ').change();
        });

        $('#cboEstablecimiento').change(function () {
            $('#tblCajas').DataTable().column(10).search($(this).val()).draw();
        });
    };

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCajas();
            eventos();
            fillCboEstablecimiento();
            $('#cboEstablecimiento').select2('val', ' ').change();
            $('#cboEmpresas').change();
        }
    };

}();

var NCMCAJA = function () {

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
        $('#txtTelefono').focus(function () { $(this).inputmask({ "mask": "M", "repeat": 20, "greedy": false }); })
        //$('#cboResp').select2();
        $('#cboTipo').select2();
        $('#cboctaContable').select2();
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                selectEst.select2('val', $('#ctl00_hddestablecimiento').val()).change();
            },
            error: function (msg) {
                alertCustom('Error al listar Establecimientos.');
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresas').change(function () {
            fillCboEstablecimiento();
            $('#txtResp').parent().html('<input type="text" id="txtResp" class="span12" style="text-transform: uppercase">');
            autocompletarResponsables('#txtResp', '');
        });

        $('#cboEstablecimiento').change(function () {
            $('#txtNuevasImp').parent().html('<input class="span12" type="text" id="txtNuevasImp" placeholder="Nueva Impresora" style="margin-bottom: 0px; text-transform: uppercase">');
            cargarNuevasImp('#txtNuevasImp', '');
            cargarNuevosPOS('#txtPOS', '');
        });
    };

    var creaTablaVacia = function () {
        var json = null;
        order: [[3, "desc"]];
        var parms = {
            data: json,
            columns: [
                { data: 'USUARIO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'CAJERO' },
                {
                    data: 'USUARIO', createdCell: function (cell, cellData) {
                        $(cell).css('text-align', 'center').text(cellData === $('#hfCOD_RESP').val() ? 'SI' : 'NO');
                    }
                },
                { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                {
                    data: null, defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (cell) { $(cell).css('text-align', 'center') }
                }
            ],
            order: [[3, "asc"]]
        }

        oTable = iniciaTabla('tblCajeros', parms);
        $('#tblCajeros').removeAttr('style');
        $('#tblCajeros tbody').unbind('click');
        $('#tblCajeros tbody').on('click', 'a', function () {
            var data = $('#tblCajeros').DataTable().row($(this).parents('tr')).data();
            var estado = data.ESTADO === 'ACTIVO' ? 'I' : 'A';
            var codCaja = ObtenerQueryString("codigo");
            cambiarEstadoCajeroCaja(codCaja, data.USUARIO, estado);
        })
    };

    var cargaInicial = function () {
        var codigo = ObtenerQueryString("codigo");
        if (codigo !== undefined) {
            cargarCajeros($('#hfCOD_RESP').val());
            cargarImpresoras();
            cargarPOS();
            cargarNuevosCajeros('#txtNuevoCajero', '');
            cargarNuevasImp('#txtNuevasImp', '');
            cargarNuevosPOS('#txtPOS', '');
            $('#adicionales').slideDown(500);
        }
    };

    return {
        init: function () {
            plugins();
            eventos();      
            fillCboEmpresa();
            fillCboEstablecimiento();
            cargarCuentasContables();
            creaTablaVacia();
            cargarCaja();
            autocompletarResponsables('#txtResp', $('#hfRESP').val());
            cargaInicial();
        }
    };
}();

var cargarCaja = function () {
    var codigo = ObtenerQueryString("codigo");
    if (codigo !== undefined) {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=0&CODIGO=" + codigo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#cboEmpresas').select2('val', datos[0].EMPRESA).change();
                    $('#cboEstablecimiento').select2('val', datos[0].SUCURSAL).change();
                    $('#txtdesc1').val(datos[0].DESCRIPCION);
                    $('#txtTelefono').val(datos[0].TELEFONO);
                    $('#txttipo').val(datos[0].DESC_TIPO);
                    $('#btnGrabar').css("display", "none");
                    $('#btnActualizar').css("display", "inline-block");
                    $('#p_estado').css('display', 'block');
                    $('#hfCOD_RESP').val(datos[0].RESP_ID);
                    $('#hfCOD_NRESP').val(datos[0].RESP_ID);
                    $('#hfRESP').val(datos[0].RESPONSABLE);
                    if (datos[0].ESTADO == 'INACTIVO') {
                        $('#chkEstado').prop('checked', false).parent().removeClass('checked');
                    }
                    $('#cboTipo').select2('val', datos[0].TIPO);
                    $('#hfCOD_CAJA').val(codigo);

                    $('#cboctaContable').select2('val', datos[0].CTA_CONTAB).change();
                } else {
                    $('#btnActualizar').css("display", "none");
                    $('#btnGrabar').css("display", "inline-block");
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar los datos de la caja.');
            }
        });
    }
};

var autocompletarResponsables = function (v_ID, v_value) {
    var txtResp = $(v_ID);

    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=13&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                txtResp.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].NOMBRE);
                            obj += '{ "USUARIO" : "' + datos[i].USUARIO + '", "NOMBRE" : "' + datos[i].NOMBRE + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfCOD_NRESP').val(map[item].USUARIO);
                        return item;
                    }
                });

                txtResp.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if (txtResp.val().length <= 0) { $('#hfCOD_NRESP').val(''); }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                txtResp.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

var resp = '';
var cargarCajeros = function (responsable) {
    
    var codigo = ObtenerQueryString("codigo");
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=1&CODIGO=" + codigo,      
        datatype: "json",
        async: false,
        dataSrc: '',
        success: function (datos) {
            oTable.fnClearTable();
            if (!isEmpty(datos)) {
                oTable.fnAddData(datos);       
            } else {
                infoCustom("No se encontraron registros.");
            }
            setTimeout(function () {
                oTable.fnAdjustColumnSizing();
            }, 200);
                
        },
        complete: function () {

        },
        error: function (msg) {
            alert(msg);
        }
    });


    //$('#tblCajeros').DataTable().destroy();
    //if (codigo !== undefined) {
    //    $('#tblCajeros').DataTable({
    //        ajax: {
    //            type: "post",
    //            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=1&CODIGO=" + codigo,
    //            datatype: "json",
    //            async: false,
    //            dataSrc: ''                
    //        },
    //        columns: [
    //            { data: 'USUARIO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
    //            { data: 'CAJERO' },
    //            {
    //                data: 'USUARIO', createdCell: function (cell, cellData) {
    //                    $(cell).css('text-align', 'center').text(cellData === responsable ? 'SI' : 'NO');
    //                }
    //            },
    //            { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
    //            {
    //                data: null, defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
    //                createdCell: function (cell) { $(cell).css('text-align', 'center') }
    //            }
    //        ]
    //    });
    //    order: [[3, "desc"]];
    //    $('#tblCajeros tbody').unbind('click');
    //    $('#tblCajeros tbody').on('click', 'a', function () {
    //        var data = $('#tblCajeros').DataTable().row($(this).parents('tr')).data();
    //        var estado = data.ESTADO === 'ACTIVO' ? 'I' : 'A'
    //        cambiarEstadoCajeroCaja(codigo, data.USUARIO, estado)
    //    })
    //}
};


var cargarImpresoras = function () {
    var codigo = ObtenerQueryString("codigo");
    $('#tblImpresoras').DataTable().destroy();
    if (codigo !== undefined) {
        $('#tblImpresoras').DataTable({
            ajax: {
                type: "post",
                url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=2&CODIGO=" + codigo,
                datatype: "json",
                async: false,
                dataSrc: ''
            },
            columns: [
                { data: 'IMPRESORA' },
                { data: 'SERIE', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'TIPO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: null, defaultContent: '<a class="btn red"><i class="icon-remove"></i></a>', createdCell: function (cell) { $(cell).css('text-align', 'center') } }
            ]
        });
        $('#tblImpresoras tbody').unbind('click');
        $('#tblImpresoras tbody').on('click', 'a', function () {
            var data = $('#tblImpresoras').DataTable().row($(this).parents('tr')).data();
            eliminarImpresora(codigo, data.CODIGO);
        });
    }
};

var cargarPOS = function () {
    var codigo = ObtenerQueryString("codigo");
    $('#tblPOS').DataTable().destroy();
    if (codigo !== undefined) {
        $('#tblPOS').DataTable({
            ajax: {
                type: "post",
                url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=POSTCAJA&CODIGO=" + codigo,
                datatype: "json",
                async: false,
                dataSrc: ''
            },
            columns: [
                { data: 'POST_DESCRIPCION' },
                { data: 'POST_SERIE', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'TIPO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                { data: null, defaultContent: '<a class="btn red"><i class="icon-remove"></i></a>', createdCell: function (cell) { $(cell).css('text-align', 'center') } }
            ]
        });
        $('#tblPOS tbody').unbind('click');
        $('#tblPOS tbody').on('click', 'a', function () {
            var data = $('#tblPOS').DataTable().row($(this).parents('tr')).data();
            eliminarPOS(data.CODIGO);
        });
    }
}

var cargarNuevosCajeros = function (v_ID, v_value) {
    var txtNuevosCajeros = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=5&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                txtNuevosCajeros.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].NOMBRE);
                            obj += '{ "NOMBRE" : "' + datos[i].NOMBRE + '", "USUARIO" : "' + datos[i].USUARIO + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfUSUA_ID_NC').val(map[item].USUARIO);
                        return item;
                    }
                });
                txtNuevosCajeros.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"));
                    if ($(this).val().trim().length === 0) {
                        $('#hfUSUA_ID_NC').val('');
                    }
                });
            }
        },
        error: function () {
            alertCustom('Error al agregar nuevo cajero.');
        }
    });
};

var cargarNuevasImp = function (v_ID, v_value) {
    var txtNuevasImp = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=10&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null) {
                txtNuevasImp.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};

                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].IMPRESORA + ' ' + datos[i].SERIE);
                            obj += '{ "CODIGO" : "' + datos[i].CODIGO + '", "IMPRESORA" : "' + datos[i].IMPRESORA + ' ' + datos[i].SERIE + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.IMPRESORA] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfCOD_NIMP').val(map[item].CODIGO);
                        return item;
                    }
                });
                txtNuevasImp.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"));
                    if ($(this).val().trim().length === 0) {
                        $('#hfCOD_NIMP').val('');
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                txtNuevasImp.val(v_value);
            }
        },
        error: function () {
            alertCustom('Error al agregar nueva impresora.');
        }
    });
};

var cargarNuevosPOS = function (v_ID, v_value) {
    var txtNuevasImp = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=POS&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                txtNuevasImp.typeahead({
                    source: function (query, process) {
                        arrayNC = [];
                        map = {};
                        var obj = '[';
                        for (var i = 0; i < datos.length; i++) {
                            arrayNC.push(datos[i].DESCRIPCION + ' ' + datos[i].SERIE + ' - ' + datos[i].TIPO_DESC);
                            obj += '{ "CODIGO" : "' + datos[i].CODIGO + '", "DESCRIPCION" : "' + datos[i].DESCRIPCION + ' ' + datos[i].SERIE + '", "TIPO_DESC" : "' + datos[i].TIPO_DESC + '" },';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[datos[i].DESCRIPCION + ' ' + datos[i].SERIE + ' - ' + datos[i].TIPO_DESC] = objeto;
                        });

                        process(arrayNC);
                    },
                    updater: function (item) {
                        $('#hfCOD_NPOST').val(map[item].CODIGO);
                        return item;
                    }
                });

                txtNuevasImp.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"));
                    if ($(this).val().trim().length === 0) {
                        $('#hfCOD_NPOST').val('');
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                txtNuevasImp.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

var fillCboEmpresa = function () {
    var selectEmpresa = $('#cboEmpresas');
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=6&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEmpresa.empty();
            selectEmpresa.append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            selectEmpresa.select2('val', $('#ctl00_hddctlg').val()).change();
        },
        error: function (msg) {
            alertCustom('Error al listar empresas.');
        }
    });
};

var cargarCuentasContables = function () {
    $.ajax({
        type: "post",
        url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboctaContable').html('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboctaContable').append('<option value="' + datos[i].CUENTA + '">' + datos[i].DESC_MOSTRAR + '</option>');
                }
            }
            $('#cboctaContable').select2('val', '');
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

var Grabar = function () {
    if (vErrorsNotMessage(['txtdesc1', 'txtTelefono', 'cboEstablecimiento'])) {
        if ($('#hfCOD_NRESP').val() == '') {
            $('#txtResp').val("");
        }
        var empr = $('#cboEmpresas').val();
        var esta = $('#cboEstablecimiento').val();
        var desc = $('#txtdesc1').val().toUpperCase();
        var tipo = $('#cboTipo').val();
        var resp = $('#hfCOD_NRESP').val();
        var telf = $('#txtTelefono').val();
        var cta = $('#cboctaContable').val();

        var data = new FormData();
        data.append('OPCION', '3');
        data.append('CTLG_CODE', empr);
        data.append('SCSL_CODE', esta);
        data.append('DESC', desc);
        data.append('TIPO', tipo);
        data.append('TELF', telf);
        data.append('RESP', resp);
        data.append('CTAS_CODE', cta);

        Bloquear('caja');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCAJA.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (res) {
            if (res !== null) {
                if (res !== '0000') {
                    exito();
                    $('#tblCajeros').DataTable();
                    $('#tblImpresoras').DataTable();
                    $('#tblPOS').DataTable();

                    cargarNuevosCajeros('#txtNuevoCajero', '');
                    cargarNuevasImp('#txtNuevasImp', '');
                    cargarNuevosPOS('#txtPOS', '');

                    $('#adicionales').slideDown(500);

                    $('#btnGrabar').css('display', 'none');
                    $('#btnActualizar').css('display', 'inline-block');

                    window.history.pushState("Object", "POS Tarjeta", "/Default.aspx?f=NCMCAJA&codigo=" + res);
                } else {
                    noexito();
                }
            }
            Desbloquear("caja");
        }).error(function () {
            Desbloquear("caja");
            alertCustom("Error al grabar Nueva Caja. Por favor intente nuevamente.");
        });
    }
};

var Actualizar = function () {
    if (vErrorsNotMessage(['txtdesc1', 'txtTelefono'])) {        
        if ($('#hfCOD_NRESP').val() == '') {
            $('#txtResp').val("");
        }
        var codigo = $('#hfCOD_CAJA').val();
        var empr = $('#cboEmpresas').val();
        var esta = $('#cboEstablecimiento').val();
        var desc = $('#txtdesc1').val();
        var tipo = $('#cboTipo').val();
        var resp = $('#hfCOD_NRESP').val();
        var telf = $('#txtTelefono').val();
        var estd = ($('#chkEstado').is(':checked')) ? 'A' : 'I';
        var cta = $('#cboctaContable').val();

        var data = new FormData();
        data.append('OPCION', '4');
        data.append('CODIGO', codigo);
        data.append('CTLG_CODE', empr);
        data.append('SCSL_CODE', esta);
        data.append('DESC', desc);
        data.append('TIPO', tipo);
        data.append('RESP', resp);
        data.append('TELF', telf);
        data.append('ESTADO', estd);
        data.append('CTAS_CODE', cta);

        Bloquear('caja');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCAJA.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (res) {
            if (res != null) {
                if (res == 'OK') {
                    exito();
                    Bloquear('p_cajeros');
                    cargarCajeros(resp);
                    Desbloquear('p_cajeros');
                } else {
                    noexito();
                }
            }
        }).error(function () {
            alert("Error al grabar Nueva Caja. Por favor intente nuevamente.");
        });
        Desbloquear("caja");
    }
};

var agregarCajero = function () {
    if (vErrors(['txtNuevoCajero'])) {
        var usua_cajero = $('#hfUSUA_ID_NC').val();
        var cod_caja = ObtenerQueryString("codigo");
        var usua_id = $('#ctl00_txtus').val();

        var data = new FormData();
        data.append('OPCION', '8');
        data.append('CODIGO', cod_caja);
        data.append('USUA_CAJERO', usua_cajero);
        data.append('USUA_ID', usua_id);

        if (usua_cajero !== '') {
            Bloquear('cajeros');
            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMCAJA.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                if (res !== null) {
                    if (res === 'OK') {
                        exito();
                        cargarCajeros($('#hfCOD_RESP').val());
                        $('#txtNuevoCajero, #hfUSUA_ID_NC').val('');
                    } else {
                        noexito();
                    }
                }
                Desbloquear('cajeros');
            }).error(function () {
                alertCustom("Cajero ya agregado a esta Caja");
                Desbloquear('cajeros');
            });
        } else {
            alertCustom('Ingrese un cajero válido.');
        }
    }
};

var agregarImpresora = function () {
    if (vErrors(['txtNuevasImp'])) {
        var cod_imp = $('#hfCOD_NIMP').val();
        var cod_caja = ObtenerQueryString("codigo");
        var usua_id = $('#ctl00_txtus').val();

        var data = new FormData();
        data.append('OPCION', '9');
        data.append('CODIGO', cod_caja);
        data.append('IMP_CODE', cod_imp);
        data.append('USUA_ID', usua_id);

        if (cod_imp !== '') {
            Bloquear('impresoras');
            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMCAJA.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                if (res !== null) {
                    if (res === 'OK') {
                        exito();
                        cargarImpresoras();
                        $('#txtNuevasImp, #hfCOD_NIMP').val('');
                    } else {
                        noexito();
                    }
                }
                Desbloquear('impresoras');
            }).error(function () {
                alertCustom("Impresora ya agregada a esta caja.");
                Desbloquear('impresoras');
            });
        } else {
            alertCustom('Ingrese información de una impresora válida.');
        }
    }
};

var agregarPOS = function () {
    if (vErrors(['txtPOS'])) {
        var cod_imp = $('#hfCOD_NPOST').val();
        var cod_caja = ObtenerQueryString("codigo");
        var usua_id = $('#ctl00_txtus').val();

        var data = new FormData();
        data.append('OPCION', 'NPOST');
        data.append('CODIGO', cod_caja);
        data.append('POST_CODE', cod_imp);
        data.append('USUA_ID', usua_id);

        if (cod_imp !== '') {
            Bloquear('p_pos');
            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMCAJA.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                if (res !== null) {
                    if (res === 'OK') {
                        exito();
                        cargarPOS();
                        $('#txtPOS, #hfCOD_NPOST').val('');
                    } else {
                        noexito();
                    }
                }
                Desbloquear('pos');
            }).error(function () {
                alertCustom("POS ya agregado a esta caja.");
                Desbloquear('pos');
            });
        } else {
            alertCustom('Ingrese un POS válido.');
        }
    }
};

var cambiarEstadoCajeroCaja = function (cod_caja, usua_cajero, estado) {
    var usua_id = $('#ctl00_txtus').val();

    var data = new FormData();
    data.append('OPCION', '11');
    data.append('CODIGO', cod_caja);
    data.append('USUA_CAJERO', usua_cajero);
    data.append('ESTADO', estado);
    data.append('USUA_ID', usua_id);

    Bloquear('cajeros');

    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMCAJA.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).success(function (res) {
        if (res !== null) {
            if (res === 'OK') {
                exito();
                cargarCaja();
                cargarCajeros($('#hfCOD_RESP').val());
                $('#txtResp').val($('#hfRESP').val());
            } else {
                noexito();
            }
        }
        Desbloquear('cajeros');
    }).error(function () {
        alert("Error al cambiar estado. Por favor, intente nuevamente.");
        Desbloquear('cajeros');
    });
};

var eliminarImpresora = function (cod_caja, cod_impr) {
    var data = new FormData();
    data.append('OPCION', '12');
    data.append('CODIGO', cod_caja);
    data.append('IMP_CODE', cod_impr);

    Bloquear('impresoras');

    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMCAJA.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).success(function (res) {
        if (res !== null) {
            if (res === 'OK') {
                exito();
                cargarCaja();
                cargarImpresoras();
            } else {
                noexito();
                $('#txtNuevasImp').val('');
            }
        }
        Desbloquear('impresoras');
    }).error(function () {
        alert("Error al cambiar estado. Por favor, intente nuevamente.");
        Desbloquear('impresoras');
    });
};

var eliminarPOS = function (codigo) {
    var data = new FormData();
    data.append('OPCION', 'RPOST');
    data.append('CODIGO', codigo);

    Bloquear('pos');

    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMCAJA.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).success(function (res) {
        if (res != null) {
            if (res == 'OK') {
                exito();
                cargarCaja();
                cargarPOS();
            } else {
                noexito();
                $('#txtPOS').val('');
            }
        }
        Desbloquear('pos');
    }).error(function () {
        alert("Error al cambiar estado. Por favor, intente nuevamente.");
        Desbloquear('pos');
    });
};



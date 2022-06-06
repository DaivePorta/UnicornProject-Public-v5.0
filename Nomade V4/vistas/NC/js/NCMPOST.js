var NCLPOST = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal').select2();
    };

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value=" ">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var listarPOS = function () {
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfLISTA').val());
        var parms = {
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
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
            responsive: true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "CTLG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SCSL",
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
                    data: "MARCA_MODELO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "SERIE",
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
                    data: "PREDETERMINADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                { data: "CTLG_CODE", visible: false },
                { data: "SCSL_CODE", visible: false }
            ]
        };
        $('#tblLISTA').DataTable(parms);
        $('#tblLISTA').removeAttr('style');

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">EMPRESA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">ESTABLECIMIENTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">DESCRIPCION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">MARCA / MODELO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">NRO SERIE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="6" href="#">TIPO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="7" href="#">PREDETERMINADO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="8" href="#">ESTADO</a>\
                    </div>');

        $('#tblLISTA tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var pos = $('#tblLISTA').DataTable().row(this).index();
                var row = $('#tblLISTA').DataTable().row(pos).data();
                var codigo = row.CODIGO;
                window.location.href = '?f=NCMPOST&codigo=' + codigo;
            }
        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblLISTA').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });

        $('#tblLISTA tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = $('#tblLISTA').DataTable().row($(this).parent().parent()).index();
            var row = $('#tblLISTA').DataTable().row(pos).data();
            var code = row.CODIGO;
            var objectRow = $('#tblLISTA').DataTable().row($(this).parents("tr"));
            var indexRow = objectRow.index();

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMPOST.ashx", { OPCION: 'AE', P_CODE: code, USUA_ID: $('#ctl00_txtus').val() },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        if (res == "I") {
                            res = "INACTIVO";
                        }
                        else {
                            res = "ACTIVO";
                        }
                        objectRow.cell(indexRow, 8).data(res).draw(true);
                        exito();
                    } else {
                        noexito();
                    }
                });
            $.ajaxSetup({ async: true });
        });
    };

    var refrescar = function (table) {
        var data = table.data();
        var pagina = table.page()
        table.clear();
        table.rows.add(data);
        table.draw();
        table.page(pagina);
    }

    var eventos = function () {
        $('#cboEmpresa').on('change', function () {
            cargarSucursales();
            $('#cboSucursal').select2('val', '');
            $('#tblLISTA').DataTable().column(9).search($(this).val()).draw();
        });

        $('#cboSucursal').on('change', function () {
            $('#tblLISTA').DataTable().column(10).search($(this).val()).draw();
        });
    };

    return {
        init: function () {
            plugins();
            listarPOS();
            eventos();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').select2('val', ' ');
        }
    };
}();

var NCMPOST = function () {

    var plugins = function () {
        $('#txtFecha').datepicker('setDate', 'now');
        $('#cboEmpresa, #cboSucursal, #cboTipo').select2();
        $('#txtSerie').inputmask({ mask: '*', repeat: 15, greedy: false });
        $('#tblOperadores').DataTable().column(0).visible(false);
    };

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarOperadores = function () {
        var input = $('#txtOperador');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMPOST.ashx?OPCION=LOP",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== null) {
                    input.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i in data) {
                                arrayNC.push(data[i].RAZON_SOCIAL);
                                obj += '{ "RAZON_SOCIAL" : "' + data[i].RAZON_SOCIAL + '", "PIDM" : "' + data[i].PIDM + '", "CODIGO": "' + data[i].CODIGO + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            $('#hfOPERADOR_PIDM').val(map[item].PIDM);
                            $('#hfOPERADOR_CODIGO').val(map[item].CODIGO);
                            return item;
                        }
                    });

                    input.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($(this).val().trim().length === 0) {
                            $('#hfOPERADOR_PIDM, #hfOPERADOR_CODIGO').val('');
                        }
                    });
                }
                input.val('');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresa').on('change', function () {
            cargarSucursales();
            $('#cboSucursal').select2('destroy').select2();
        });

        $('#btnAgregarOperador').click(function () {
            Bloquear('operadores');
            $.ajax({
                type: "post",
                url: 'vistas/NC/ajax/NCMPOST.ashx?OPCION=AGREGAR_OPERADOR',
                contenttype: "application/json;",
                datatype: "json",
                data: { POST_CODE: ObtenerQueryString('codigo'), OPTR_CODE: $('#hfOPERADOR_CODIGO').val(), USUA_ID: $('#ctl00_txtus').val() },
                async: false
            }).done(function (data) {
                if (data !== '000000') {
                    listarOperadores();
                    $('#txtOperador, #hfOPERADOR_PIDM, #hfOPERADOR_CODIGO').val('');
                    exito();
                } else {
                    alertCustom('Error al insertar nuevo operador.Por favor inténtelo nuevamente');
                }
                Desbloquear('operadores');
            }).fail(function () {
                infoCustom('Error al insertar nuevo operador. Compruebe que no está agregado a la lista.');
                Desbloquear('operadores');
            });
        });

        $('#tblOperadores tbody').on('click', 'a', function () {
            var codigo = $('#tblOperadores').DataTable().row($(this).parents('tr')).data().CODIGO;
            Bloquear('operadores');
            $.ajax({
                type: 'post',
                url: 'vistas/NC/ajax/NCMPOST.ashx?OPCION=ELIMINAR_OPERADOR',
                contenttype: "application/json;",
                data: { CODIGO: codigo },
                async: false
            }).done(function (data) {
                if (data === 'OK') {
                    listarOperadores();
                    exito();
                } else {
                    alertCustom('Error al eliminar Operador, por favor inténtelo nuevamente.');
                }
                Desbloquear('operadores');
            }).fail(function () {
                alertCustom('Error al eliminar Operador, por favor inténtelo nuevamente.');
                Desbloquear('operadores');
            });
        });


        $('#tblOperadores tbody').on('click', '.chkprincipal', function (){ 

            var data = $('#tblOperadores').DataTable().row($(this).parents('tr')).data();
            var codigo = data.CODIGO;          

            if (data.ESTADO == "INACTIVO") {/*VALIDACION*/

                infoCustom2("Solo se puede asignar como principal a un operador Activo!");
                return false;

            } else {
                Bloquear('operadores');
                $.ajax({
                    type: 'post',
                    url: 'vistas/NC/ajax/NCMPOST.ashx?OPCION=ASIGNAR_PRINCIPAL_OPERADOR',
                    contenttype: "application/json;",
                    data: { CODIGO: codigo },
                    async: false
                }).done(function (data) {
                    if (data === 'OK') {
                        listarOperadores();
                        exito();
                    } else {
                        alertCustom('Error, por favor inténtelo nuevamente.');
                    }
                    Desbloquear('operadores');
                }).fail(function () {
                    alertCustom('Error al eliminar Operador, por favor inténtelo nuevamente.');
                    Desbloquear('operadores');
                });
            }

        });

    };

    var listarOperadores = function () {
        $('#tblOperadores').DataTable().destroy();
        $('#tblOperadores').DataTable({
            ajax: {
                type: 'post',
                url: 'vistas/NC/ajax/NCMPOST.ashx?OPCION=LISTAR_OPERADORES',
                contenttype: "application/json;",
                data: { POST_CODE: ObtenerQueryString('codigo') },
                dataType: 'json',
                async: false,
                dataSrc: ''
            },
            columns: [
                { data: null, defaultContent: '<input type="radio" name="principal" class="chkprincipal">', createdCell: function (td, cellData, rowData, row, col) { $(td).css('text-align', 'center'); if (rowData.ES_PRINCIPAL == 'S') { $($(td).children("input")).attr("checked",true); } } },
               
                { data: 'OPERADOR', width: '45%' },
                { data: 'NOMBRE_COMERCIAL', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: null, defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>', createdCell: function (cell) { $(cell).css('text-align', 'center'); } }
            ]
        });
        $(".chkprincipal[checked=checked]").attr("checked", true)
    };

    var cargarPOS = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: "post",
                url: 'vistas/NC/ajax/NCMPOST.ashx?OPCION=S&P_CODE=' + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data !== null) {
                        $('#txtcodigo').val(data[0].CODIGO);
                        $('#cboEmpresa').select2('val', data[0].CTLG_CODE);
                        $('#cboSucursal').select2('val', data[0].SCSL_CODE);
                        $('#txtMarca').val(data[0].MARCA_MODELO);
                        $('#txtFecha').datepicker('setDate', data[0].FECHA);
                        $('#txtDescripcion').val(data[0].DESCRIPCION);
                        $('#txtSerie').val(data[0].SERIE);
                        $('#cboTipo').select2('val', data[0].TIPO);
                        if (data[0].ESTADO !== 'ACTIVO') {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }
                        if (data[0].PREDETERMINADO == 'SI') {
                            $("#chkPredeterminado").prop('checked', true).parent().addClass('checked');
                        }
                        $('#operadores').slideDown();
                        listarOperadores();
                        $('#grabar').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                        $('#grabar').attr('href', 'javascript:Actualizar();');
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
            cargarSucursales();
            $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            cargarOperadores();
            eventos();
            cargarPOS();
        }
    };
}();

var cargarEmpresas = function () {
    var select = $('#cboEmpresa');
    $.ajax({
        type: "post",
        url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {
            $(select).html('');
            for (var i = 0; i < data.length; i++) {
                $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
            }
        },
        error: function (msg) {
            alertCustom(msg.d);
        }
    });
};

var Grabar = function () {
    if (vErrors(['cboEmpresa', 'cboSucursal', 'txtMarca', 'txtDescripcion', 'txtSerie', 'cboTipo'])) {
        var data = new FormData();
        data.append('OPCION', 'G');
        data.append('CTLG_CODE', $('#cboEmpresa').val());
        data.append('SCSL_CODE', $('#cboSucursal').val());
        data.append('MARCA_MODELO', $('#txtMarca').val());
        data.append('FECHA', $('#txtFecha').val());
        data.append('P_DESCRIPCION', $('#txtDescripcion').val());
        data.append('SERIE', $('#txtSerie').val());
        data.append('TIPO', $('#cboTipo').val());
        data.append('ESTADO', $('#chkEstado').is(':checked') ? 'A' : 'I');
        data.append('USUA_ID', $('#ctl00_txtus').val());
        data.append('PREDETERMINADO', $('#chkPredeterminado').is(':checked') ? '1' : '0');
        Bloquear('ventana');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMPOST.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (res) {
            if (res !== null) {
                if (res != 'YALA') {
                    exito();
                    $('#txtcodigo').val(res);
                    $('#grabar').html('<i class="icon-pencil"></i>&nbsp;Modificar').attr('href', 'javascript:Actualizar();');
                    $('#operadores').slideDown();
                    window.history.pushState("Object", "POS Tarjeta", "/Default.aspx?f=NCMPOST&codigo=" + res);
                } else {
                    infoCustom2("No puede haber dos POS predeterminados.");
                }
            }
            Desbloquear('ventana');
        }).error(function () {
            alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
            Desbloquear('ventana');
        });


    }
};

var Actualizar = function () {
    if (vErrors(['cboEmpresa', 'cboSucursal', 'txtMarca', 'txtDescripcion', 'txtSerie', 'cboTipo'])) {
        var data = new FormData();
        data.append('OPCION', 'A');
        data.append('P_CODE', $('#txtcodigo').val());
        data.append('CTLG_CODE', $('#cboEmpresa').val());
        data.append('SCSL_CODE', $('#cboSucursal').val());
        data.append('MARCA_MODELO', $('#txtMarca').val());
        data.append('FECHA', $('#txtFecha').val());
        data.append('P_DESCRIPCION', $('#txtDescripcion').val());
        data.append('SERIE', $('#txtSerie').val());
        data.append('TIPO', $('#cboTipo').val());
        data.append('ESTADO', $('#chkEstado').is(':checked') ? 'A' : 'I');
        data.append('USUA_ID', $('#ctl00_txtus').val());
        data.append('PREDETERMINADO', $('#chkPredeterminado').is(':checked') ? '1' : '0');
        Bloquear('ventana');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMPOST.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (res) {
            if (res !== null) {
                exito();
            }
            Desbloquear('ventana');
        }).error(function () {
            alertCustom("Error al grabar Nueva Operación. Por favor intente nuevamente.");
            Desbloquear('ventana');
        });
    }
};
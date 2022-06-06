


var OPMTIOP = function () {

    var CargaInicial = function () {
        var codigo = ObtenerQueryString("codigo");
        if (codigo !== undefined) {

            $.ajax({
                type: "post",
                url: "vistas/OP/ajax/OPMTIOP.ashx?OPCION=LTPU&CODE_TIOP=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null && datos.length > 0) {
                        $("#txtdesc").val(datos[0].DESCRIPCION);
                        $("#txtcodeTP").val(datos[0].CODIGO);
                        $("#hfCOD_TIOP").val(datos[0].CODIGO);
                        if (datos[0].ESTADO == "ACTIVO") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }
                        $('#btnGrabar').css('display', 'none');
                        $('#btnActualizar').css('display', 'inline-block');

                    }
                    else {
                        alertCustom("Faltan datos en el listado de tipos de operaciones")
                        Desbloquear('ventana');
                    }
                },
                error: function (msg) {
                    noexitoCustom("Error al obtener datos de tipos de operacion...!");
                }
            });
        }
    };

    var Grabar = function () {
        if (vErrorsNotMessage('txtdesc')) {

            var estado_ind;
            if ($('#chkEstado').is(':checked')) {
                estado_ind = "A"
            } else {
                estado_ind = "I"
            }

            var data = new FormData();
            data.append('OPCION', 'GTP');
            data.append('DESCRIPCION', $("#txtdesc").val());
            data.append('ESTADO_IND', estado_ind);

            Bloquear('ventana');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/OP/ajax/OPMTIOP.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                if (res !== null) {
                    if (res !== '') {
                        exito();
                        $("#txtcodeTP").val(res); 
                        $("#hfCOD_TIOP").val(res);
                        $('#btnGrabar').css('display', 'none');
                        $('#btnActualizar').css('display', 'inline-block');

                    } else {
                        noexito();
                    }
                }
                Desbloquear("ventana");
            }).error(function () {
                Desbloquear("ventana");
                alertCustom("Error al grabar tipo de operacion");
            });
        }
    };

    var Actualizar = function () {
        if (vErrorsNotMessage(['txtdesc', 'txtcodeTP'])) {

            var estado_ind;
            if ($('#chkEstado').is(':checked')) {
                estado_ind = "A"
            } else {
                estado_ind = "I"
            }

            var data = new FormData();
            data.append('OPCION', 'ATPT');
            data.append('CODE_TIOP', $("#hfCOD_TIOP").val());
            data.append('DESCRIPCION', $("#txtdesc").val());
            data.append('ESTADO_IND', estado_ind);

            Bloquear('ventana');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/OP/ajax/OPMTIOP.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            }).success(function (res) {
                if (res !== null) {
                    if (res !== '') {
                        exito();
                    } else {
                        noexito();
                    }
                }
                Desbloquear("ventana");
            }).error(function () {
                Desbloquear("ventana");
                alertCustom("Error al Actualizar el tipo de operacion");
            });
        }
    };

    var eventoControles = function () {

        $("#btnGrabar").on("click", function () {
            if ($("#btnGrabar").attr("disabled") != 'disabled') {
                Grabar();
            }

        });
        $("#btnActualizar").on("click", function () {
            if ($("#btnActualizar").attr("disabled") != 'disabled') {
                Actualizar();
            }

        });

        $("#btnCancelar").on("click", function () {
            if ($("#btnCancelar").attr("disabled") != 'disabled') {
                Cancelar();
            }

        });
       
    };

    return {
        init: function () {
            eventoControles();
            CargaInicial();
        }
    };

}();


var OPLTIOP = function () {

    var OtableTipoOP;

    var iniciaTablaTipoOP = function () {

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
            data: null,
            columns: [

                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '5%');
                    }
                },
                 {
                     data: "DESCRIPCION",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'left');
                     }
                 },
                {
                    data: "USUARIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "FECHA",
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
                    defaultContent: '<a class="btn tooltips green" data-toggle="modal" data-original-title="Cambiar Estado"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '5%');
                    }
                }
            ]

        }
        OtableTipoOP = iniciaTabla("tblTipoOP", parms);

        $("#tblTipoOP").removeAttr("style");

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">DESCRIPCION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">USUARIO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">FECHA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">ESTADO</a>\
                    </div>');

        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblTipoOP').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });

        $('#tblTipoOP tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                OtableTipoOP.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = OtableTipoOP.fnGetPosition(this);
                var row = OtableTipoOP.fnGetData(pos);
                var cod = row.CODIGO;

                window.location.href = '?f=OPMTIOP&codigo=' + cod;
            }
        });

        $('#tblTipoOP tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = OtableTipoOP.api(true).row($(this).parent().parent()).index();
            var row = OtableTipoOP.fnGetData(pos);
            var code = row.CODIGO;
            if (row.ESTADO == "ACTIVO") {
                var estado = "I"
            } else {
                var estado = "A"
            }

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/OP/ajax/OPMTIOP.ASHX", { OPCION: 'ATPE', CODE_TIOP: code, ESTADO_IND: estado },
                function (res) {
                    if (res != null) {
                        if (res != null) {
                            var nuevo_estado;
                            if (res.trim() == "I") {
                                nuevo_estado = "INACTIVO";
                            }
                            else {
                                nuevo_estado = "ACTIVO";
                            }
                            $('#tblTipoOP').DataTable().cell(pos, 4).data(nuevo_estado).draw();
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


    }

    var CargarTipoOperaciones = function () {
        Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/OP/ajax/OPMTIOP.ashx?OPCION=LTP",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    OtableTipoOP.fnClearTable();
                    OtableTipoOP.fnAddData(datos);
                    Desbloquear('ventana');
                }
                else {
                    alertCustom("No hay Tipo de operaciones Registradas..!")
                    OtableTipoOP.fnClearTable();
                    Desbloquear('ventana');
                }
            },
            error: function (msg) {
                noexitoCustom("Error al listar Tipo de operaciones...!");
                OtableTipoOP.fnClearTable();
            }
        });
    };

    return {
        init: function () {
            iniciaTablaTipoOP();
            CargarTipoOperaciones();

        }
    };

}();
var NCLTRIB = function () {

    var plugins = function () {
        $("#cbo_tipo_tributo").select2();
        $("#cbo_estado").select2();
    }

    var fillBandeja = function () {

        var parms = {
            data: null,
            //order: [[0, "desc"]],
            // iDisplayLength: -1,
            ordering: false,
            paginate: true,
            info: false,
            columns: [
                 {
                     data: "CODIGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')                        
                     },
                     visible: false
                 }, {
                     data: "COD_TRIBUTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "DESCRIPCION",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     }
                 }, {
                     data: "COD_TRIBUTO_ASOC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "ABREVIATURA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "DIA_VENC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "PORCENTAJE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }, {
                     data: "DESC_TIPO_TRIBUTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')                       
                     },
                     visible:false
                 }
            ],
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(7, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            '<tr class="group"><td colspan="8" style="BACKGROUND-COLOR: rgb(223, 223, 223);">' + group + '</td></tr>'
                        );
                        last = group;
                    }
                });
            },
        }

        oTable = iniciaTabla('tblTributos', parms);
        $('#tblTributos').removeAttr('style');
        $('#tblTributos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=NCMTRIB&codigo=' + CODIGO;
            }
        });

    }

    var eventos = function () {


        $('#btn_imprime').on('click', function () {
            imprimirDiv("tblTributos")
        });

        $('#btn_filtrar').on('click', function () {
            Bloquear("ventana")
            setTimeout(function () {
                ListaTributos();
            }, 1000);
        });
    }

    var ListaTributos = function () {

        var p_ESTADO_IND = $("#cbo_estado").val();
        var P_TIPO_TRIBUTO = $("#cbo_tipo_tributo").val();



        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMTRIB.ashx?OPCION=1&P_TIPO_TRIBUTO=" + P_TIPO_TRIBUTO +
                                                                   "&p_ESTADO_IND=" + p_ESTADO_IND,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);


                }
                else {

                    oTable.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                Desbloquear("ventana");
            }
        });
    }

    return {
        init: function () {

            plugins();
            fillBandeja();
            eventos();
            ListaTributos();

        }
    };
}();

var NCMTRIB = function () {

    var plugins = function () {
        $('#cbo_tipo_tributo').select2();
        $('#txt_cod_trib').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 4, "greedy": false }); });
        $('#txt_cod_trib_asoc').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 4, "greedy": false }); });
        $("#txtAbreviatura").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 7, "greedy": false }); })

    }

    var eventoControles = function () {

        $('#chkEstado').on('click', function () {
            if ($("#chkEstado").is(':checked')) {

                $('#uniform-chkEstado span').removeClass().addClass("checked");
                $('#chkEstado').attr('checked', true);

            } else {

                $('#uniform-chkEstado span').removeClass();
                $('#chkEstado').attr('checked', false);

            }
        });

        $("#txtPorcentaje").on('blur', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            } else {
                $(this).val("0.00");
            }
        }).on("click", function () {
            $(this).select();
        }).on('keyup', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            } 
        })

        $("#txtDiaVenc").on('blur keyup', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() < 1) {
                    $(this).val("1");
                }
                if ($(this).val() > 28) {
                    $(this).val("28");
                }
            } else {
                $(this).val("1");
            }
        }).on("click", function () {
            $(this).select();
        });
    }

    var cargaInicial = function () {

        var CODE = ObtenerQueryString("codigo");
        
        if (typeof (CODE) !== "undefined") {

            var data = new FormData();
            data.append('OPCION', '1');
            data.append('p_CODIGO', CODE);
            data.append('p_ESTADO_IND', 'T');
            data.append('p_TIPO_TRIBUTO', 'T');
            $.ajax({

                url: "vistas/NC/ajax/NCMTRIB.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {

                        row = datos[0];

                        $("#txt_codigo").val(row.CODIGO).change();
                        $("#txt_cod_trib").val(row.COD_TRIBUTO).change();
                        $("#txt_cod_trib_asoc").val(row.COD_TRIBUTO_ASOC).change();
                        $("#txt_descripcion").val(row.DESCRIPCION).change();
                        $("#txtAbreviatura").val(row.ABREVIATURA);
                        $("#txtDiaVenc").val(row.DIA_VENC);
                        $("#txtPorcentaje").val(row.PORCENTAJE);
                        
                        $("#cbo_tipo_tributo").select2('val', row.TIPO_TRIBUTO);

                        if (row.ESTADO == 'A') {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado').attr('checked', true);
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false);
                        }

                        $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");

                    }
                }
            });

        }
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            cargaInicial();
        }
    };

}();

var Grabar = function () {

    Bloquear("ventana");
    //var array = ["cbo_tipo_tributo", "txt_cod_trib", "txt_descripcion"]
    //if ($("#chkEstado").is(':checked')) {
    if (vErrors(["cbo_tipo_tributo", "txt_cod_trib", "txt_descripcion", "txtAbreviatura", "txtDiaVenc", "txtPorcentaje"])) {
        var p_USUA_ID = $('#ctl00_txtus').val();
        var p_COD_TRIBUTO = $.trim($('#txt_cod_trib').val());
        var p_COD_TRIBUTO_ASOC = $.trim($('#txt_cod_trib_asoc').val());
        var p_DESCRIPCION = $('#txt_descripcion').val();
        var p_ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
        var P_TIPO_TRIBUTO = $("#cbo_tipo_tributo").val();

        var data = new FormData();

        data.append("OPCION", "2");
        data.append("p_USUA_ID", p_USUA_ID);
        data.append("p_COD_TRIBUTO", p_COD_TRIBUTO);
        data.append("p_COD_TRIBUTO_ASOC", p_COD_TRIBUTO_ASOC);
        data.append("p_DESCRIPCION", p_DESCRIPCION);
        data.append("p_ESTADO_IND", p_ESTADO_IND);
        data.append("P_TIPO_TRIBUTO", P_TIPO_TRIBUTO);
        data.append("P_ABREVIATURA", $("#txtAbreviatura").val());
        data.append("P_DIA_VENC", $("#txtDiaVenc").val());
        data.append("P_PORCENTAJE", $("#txtPorcentaje").val());

        $.ajax({
            url: "vistas/NC/ajax/NCMTRIB.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        }).success(function (datos) {
            if (datos != null && datos != "") {


                switch (datos) {
                    case "E":
                        $("#msg").attr("style", "display:block")
                        $("#body_msg").html("Alerta! El código de tributo ingresado ya se ecuentra registrado.");
                        break;
                    case "Error":
                        noexitoCustom("Error al Registrar!")
                        break;
                    default:
                        exito()
                        $("#txt_codigo").val(datos)
                        $("#msg").attr("style", "display:none")
                        $("#body_msg").html("");
                        $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                        $("#grabar").attr("href", "javascript:Modificar();");
                        break;
                }
            } else { noexitoCustom("Error al Registrar!") }

            Desbloquear("ventana")
        }).error(function () {
            Desbloquear("ventana");
            noexitoCustom("Error al Registrar!")
        });
    } else {

        Desbloquear("ventana")
    }
}

var Modificar = function () {

    Bloquear("ventana");
    var p_USUA_ID = $('#ctl00_txtus').val();
    var p_COD_TRIBUTO = $.trim($('#txt_cod_trib').val());
    var p_COD_TRIBUTO_ASOC = $.trim($('#txt_cod_trib_asoc').val());
    var p_DESCRIPCION = $('#txt_descripcion').val();
    var p_ESTADO_IND = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var P_TIPO_TRIBUTO = $("#cbo_tipo_tributo").val();
    var p_CODIGO = $("#txt_codigo").val();

    var array = ["cbo_tipo_tributo", "txt_cod_trib", "txt_descripcion"]
    if ($("#chkEstado").is(':checked')) {
        if (vErrors(["cbo_tipo_tributo", "txt_cod_trib", "txt_descripcion"])) {

            var data = new FormData();

            data.append("OPCION", "3");
            data.append("p_USUA_ID", p_USUA_ID);
            data.append("p_CODIGO", p_CODIGO);
            data.append("p_COD_TRIBUTO", p_COD_TRIBUTO);
            data.append("p_COD_TRIBUTO_ASOC", p_COD_TRIBUTO_ASOC);
            data.append("p_DESCRIPCION", p_DESCRIPCION);
            data.append("p_ESTADO_IND", p_ESTADO_IND);
            data.append("P_TIPO_TRIBUTO", P_TIPO_TRIBUTO);
            data.append("p_TIPO", "1");
            data.append("P_ABREVIATURA", $("#txtAbreviatura").val());
            data.append("P_DIA_VENC", $("#txtDiaVenc").val());
            data.append("P_PORCENTAJE", $("#txtPorcentaje").val());

            $.ajax({
                url: "vistas/NC/ajax/NCMTRIB.ASHX",
                type: "POST",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
            }).success(function (datos) {
                if (datos != null && datos != "") {
                    switch (datos) {
                        case "E":
                            $("#msg").attr("style", "display:block")
                            $("#body_msg").html("Alerta! El código de tributo ingresado ya se ecuentra registrado.");
                            break;
                        case "Error":
                            noexitoCustom("Error al Actualizar!")
                            break;
                        case "OK":
                            exito()
                            $("#msg").attr("style", "display:none")
                            $("#body_msg").html("");

                            break;
                    }
                } else { noexitoCustom("Error al Actualizar!") }

                Desbloquear("ventana")

            }).error(function () {
                Desbloquear("ventana");
                noexitoCustom("Error al Actualizar!")
            });
        } else { Desbloquear("ventana") }
    } else {
        array = [];

        var data = new FormData();
        data.append("OPCION", "3");
        data.append("p_ESTADO_IND", "I");
        data.append("p_TIPO", "2");
        data.append("p_CODIGO", p_CODIGO);
        $.ajax({
            url: "vistas/NC/ajax/NCMTRIB.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        }).success(function (datos) {
            if (datos != null && datos != "") {
                switch (datos) {
                    case "Error":
                        noexitoCustom("Error al Actualizar!")
                        break;
                    case "OK":
                        exito()
                        $("#msg").attr("style", "display:none")
                        $("#body_msg").html("");
                        break;
                }
            } else { noexitoCustom("Error al Actualizar!") }
            Desbloquear("ventana")
        }).error(function () {
            Desbloquear("ventana");
            noexitoCustom("Error al Actualizar!")
        });
    }

}
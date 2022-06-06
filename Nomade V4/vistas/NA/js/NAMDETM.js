var NAMDETM = function () {
    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#hf10').select2();
    }

    var fillCboEmpresa = function () {
        var select = $('#cboEmpresas');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            }
        });
    };

    var fillCboAlmacenes = function () {
        var select = $('#hf10');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#cboEmpresas').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Almacenes.');
            }
        });
    };

    //var eventoComtroles = function () {

    //    $('#cboEmpresas').on('change', function () {
    //        //listarAlmacenes($('#cboEmpresas').val());
    //        fillCboAlmacenes();
    //        listarGrupos($('#cboEmpresas').val());
    //        //if ($('#slsGrupos').val() == null) {
    //        //    listarProductos($('#cboEmpresas').val(), $('#hf10').val(), '');
    //        //} else {
    //        //    listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val())
    //        //}

    //        // listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val())
    //        //listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val(), "N", "1")
    //    });

    //    $('#hf10').on('change', function () {
    //        // listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val())
    //        //listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val(), "N", "1")
    //    });

    //    $('#slsGrupos').on('change', function () {
    //        //listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val())
    //        // listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val(), "N", "1")
    //    });

    //    $('#buscar').on('click', function () {
    //        if (vErrors(["cboEmpresas"])) {
    //            if ($('#slsGrupos').val() == null) {
    //                listarProductos($('#cboEmpresas').val(), $('#hf10').val(), '');
    //            } else {
    //                listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val())
    //            }
                
    //        }
    //    });

    //}

    var cargaInicial = function () {
        $('#cboEmpresas').on('change', function () {
            fillCboAlmacenes();
            listarGrupos($('#cboEmpresas').val());
        });
        

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresas"])) {
                if ($('#slsGrupos').val() == null) {
                    listarProductos($('#cboEmpresas').val(), $('#hf10').val(), '');
                } else {
                    listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val())
                }

            }
        });
    }

    function listarGrupos(empresa) {

        $.ajax({
            type: "post",
            url: "vistas/na/ajax/namdetm.ashx?OPCION=3&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#slsGrupos").multiselect("destroy");
                $('#slsGrupos').empty();
                if (datos != null) {
                    if (datos[0].MENSAJE != "Error") {
                        for (var i = 0; i < datos.length; i++) {
                            $('#slsGrupos').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
                $('#slsGrupos').multiselect({
                    nonSelectedText: 'Seleccione un Grupo!',
                    numberDisplayed: 2
                });
                $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");
            },
            error: function (msg) {
                alertCustom("Grupos no se listaron correctamente");
            }
        });
    }

    function listarProductos(empresa, almacen, grupos) {
        Bloquear("ventana")
        $.ajax({
            type: "POST",
            url: "vistas/na/ajax/namdetm.ashx?OPCION=2" +
                "&p_CTLG_CODE=" + $("#cboEmpresas").val() +
                "&p_alamcen=" + $('#hf10').val() +
                "&p_grupo=" + grupos,
            async: false,
            success: function (datos) {
                Desbloquear("ventana")
                if (datos != null) {
                    $('#tblProductos').html(datos)
                    var table = $("#tblbmodal").DataTable({
                        "scrollX": "true",
                        "sDom": 'T<"clear">lfrtip',
                        "sPaginationType": "full_numbers",
                        "oTableTools": {
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
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                        //,
                        //"columnDefs": [
                        //        { "visible": false, "targets": 0 }
                        //]
                        //,
                        //drawCallback: function (settings) {
                        //    var api = this.api();
                        //    var rows = api.rows({ page: 'current' }).nodes();
                        //    var last = null;

                        //    api.column(1, { page: 'current' }).data().each(function (group, i) {
                        //        if (last !== group) {
                        //            $(rows).eq(i).before(
                        //                '<tr class="group"><td colspan="7" style="BACKGROUND-COLOR: rgb(223, 223, 223);">' + group + '</td></tr>'
                        //            );

                        //            last = group;
                        //        }
                        //    });
                        //}
                        });
                    $('#tblbmodal').removeAttr('style');
                    $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <div style="display: inline-block"><button class="btn green">Mostrar / Ocultar</button></div>\
                    <div style="display: inline-block; padding-left: 20px">\
                            <a class="toggle-vis" data-column="2" href="#">SERIE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                            <a class="toggle-vis" data-column="3" href="#">CANTIDAD</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                            <a class="toggle-vis" data-column="4" href="#">FECHA COMPRA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                            <a class="toggle-vis" data-column="5" href="#">COSTO SOLES</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                            <a class="toggle-vis" data-column="6" href="#">COSTO DOLARES</a></div>\
                    </div>');

                    $('a.toggle-vis').click(function (e) {
                        e.preventDefault();
                        var column = table.column($(this).attr('data-column'));
                        column.visible(!column.visible());
                    });
                }
            },
            error: function (msg) {
                MostrarError(msg, "ventana")
            }
        });
    }

    //function listarAlmacenes(empresa) {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/na/ajax/nalmerc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $("#hf10").multiselect("destroy");
    //            $('#hf10').empty();
    //            if (datos != null) {
    //                //var arr = [];                   
    //                if (datos[0].MENSAJE == "Error") {
    //                    $('#hf10').multiselect({
    //                        nonSelectedText: 'Seleccione un Almacen!',
    //                        numberDisplayed: 1
    //                    });
    //                    $('#hf10').multiselect('disable');
    //                    $('#slsGrupos').multiselect('disable');
    //                }
    //                else {

    //                    for (var i = 0; i < datos.length; i++) {
    //                        $('#hf10').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
    //                        //arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
    //                    }
    //                    // $('#hf10').multiselect('dataprovider', arr);
    //                    $('#hf10').multiselect({
    //                        nonSelectedText: 'Seleccione un Almacen!',
    //                        numberDisplayed: 2
    //                    });
    //                    $('#hf10').multiselect('enable');
    //                    $('#slsGrupos').multiselect('enable');
    //                    //$('#hf10').multiselect('select', datos[0].CODIGO);
    //                    $('#hf10').multiselect("select", $('#ctl00_hddestablecimiento').val()); 
    //                }
    //                $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");
    //            } else {
    //                $('#hf10').multiselect({
    //                    nonSelectedText: 'Seleccione un Almacen!',
    //                    numberDisplayed: 2
    //                });
    //            }
    //        },
    //        error: function (msg) {
    //            alertCustom("Almacenes no se listaron correctamente");
    //        }
    //    });
    //}

    return {
        init: function () {
            //plugins();
            fillCboEmpresa();
            $('#cboEmpresas').val($('#ctl00_hddctlg').val());
            fillCboAlmacenes();
            $('#hf10').val('');
            listarGrupos($('#cboEmpresas').val());
            plugins();
            //eventoComtroles();
            cargaInicial();
            
        }
    };

}();


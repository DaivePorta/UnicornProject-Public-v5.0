var NVLCPCL = function () {

    var oTable = "[]";

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboAlmacen').select2();
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    listarAlmacenes($('#cboEmpresas').val());
                }
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    };

    var fillCboListaCliente = function () {
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmrang.ashx?OPCION=4",
            contenttype: "application/json;",
            async: false,
            success: function (datos) {
                $("#cboListaClientes").multiselect("destroy");
                $('#cboListaClientes').empty();
                if (datos != null && typeof datos[0].CODIGO != "undefined") {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboListaClientes').append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }
                }

                $('#cboListaClientes').multiselect({
                    nonSelectedText: 'Seleccione Lista!',
                    numberDisplayed: 2
                });

                $(".btn-group").addClass("span12");

                $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");
            },
            error: function (msg) {
                alertCustom("Las listas de precios por cliente no se cargaron correctamente");
            }
        });
    };

    var listarAlmacenes = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#cboEmpresas').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboAlmacen').html('');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cboAlmacen").change();
            },
            error: function (msg) {
                alertCustom('Ocurrió un error al listar almacenes.');
            }
        });
    };

    var eventoComtroles = function () {

        $('#cboEmpresas').on('change', function () {
            listarAlmacenes($('#cboEmpresas').val());
            listarGrupos($('#cboEmpresas').val());
        });

        $('#cboAlmacen').on('change', function () {
        });

        $('#slsGrupos').on('change', function () {
        });

        $('#cboListaClientes').on('change', function () {
        }); 

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresas"])) {
                listarProductos($('#cboEmpresas').val(),
                    $('#cboAlmacen').val() == null ? '' : $('#cboAlmacen').val().toString(),
                    $('#slsGrupos').val() == null ? '' : $('#slsGrupos').val().toString(),
                    $('#cboListaClientes').val() == null ? '' : $('#cboListaClientes').val().toString());
            }
        });

        $("#btnLibroPdf").on("click", function () {
            exportTable2PDF("tblStock", "REPORTE DE PRECIOS POR LISTA DE CLIENTES  " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"), "REPORTE DE PRECIOS POR LISTA DE CLIENTES " + $("#cboEmpresas :selected").text())
        });

        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblStock", "REPORTE DE PRECIOS POR LISTA DE CLIENTES  " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"));
        });

        $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);

    }

    var cargaInicial = function () {
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();
    }

    function listarGrupos(empresa) {

        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=3&codempr=" + empresa,
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

    function listarProductos(empresa, almacen, grupos, listaPreClie) {

        var data = new FormData();
        data.append('OPCION', 'LISTACLIE');
        data.append('CTLG_CODE', empresa);
        data.append('ALMACEN_CODE', almacen);
        data.append('GRUPO_CODE', grupos);
        data.append('LISTA_CODE', listaPreClie);

        Bloquear("ventana", "Se está consultando los precios por lista de cliente. Espere un momento por favor...")

        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvlcpcl.ashx",
            contentType: false,
            data: data,
            processData: false,
            async: true,
            success: function (datos) {
                if (datos !== null) {

                    $('#divTblProductos').empty();

                    if (datos.indexOf("[Advertencia]") >= 0) {
                        infoCustom2(datos);
                        Desbloquear("ventana");
                        return;
                    }
                    if (datos.indexOf("[Error]") >= 0) {
                        alertCustom(datos);
                        Desbloquear("ventana");
                        return;
                    }

                    if (datos == "") {
                        $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);
                        infoCustom("No existen productos con los filtros seleccionados. Intente nuevamente.");
                        Desbloquear("ventana");
                        return;
                    } else {
                        $('#divTblProductos').html(datos);
                        $("#tblStock").dataTable({
                            "order": [0, 'asc'],
                            "sDom": 'TC<"clear">lfrtip',
                            "sPaginationType": "full_numbers",
                            "scrollX": true,
                            "oLanguage": {
                                "sEmptyTable": "No hay datos disponibles en la tabla.",
                                "sZeroRecords": "No hay datos disponibles en la tabla."
                            },
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
                            }
                        });
                        actualizarEstilos();
                        $("#btnLibroPdf,#btnLibroXls").attr("disabled", false);
                        Desbloquear("ventana");
                    }

                } else {
                    noexito();
                    Desbloquear("ventana");
                }

            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Error al cargar los datos. Por favor intente nuevamente.");
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
    //            $("#cboAlmacen").multiselect("destroy");
    //            $('#cboAlmacen').empty();
    //            if (datos != null) {
    //                //var arr = [];                   
    //                if (datos[0].MENSAJE == "Error") {
    //                    $('#cboAlmacen').multiselect({
    //                        nonSelectedText: 'Seleccione un Almacen!',
    //                        numberDisplayed: 1
    //                    });
    //                    $('#cboAlmacen').multiselect('disable');
    //                    $('#slsGrupos').multiselect('disable');
    //                }
    //                else {

    //                    for (var i = 0; i < datos.length; i++) {
    //                        $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
    //                        //arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
    //                    }
    //                    // $('#cboAlmacen').multiselect('dataprovider', arr);
    //                    $('#cboAlmacen').multiselect({
    //                        nonSelectedText: 'Seleccione un Almacen!',
    //                        numberDisplayed: 2
    //                    });
    //                    $('#cboAlmacen').multiselect('enable');
    //                    $('#slsGrupos').multiselect('enable');

    //                }
    //                $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");
    //            } else {
    //                $('#cboAlmacen').multiselect({
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


    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            listarAlmacenes($('#cboEmpresas').val());
            fillCboListaCliente();
            eventoComtroles();
            cargaInicial();
        }
    };

}();
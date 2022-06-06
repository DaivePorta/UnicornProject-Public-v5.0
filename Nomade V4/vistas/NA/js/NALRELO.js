var NALRELO = function () {

    var oTable = "[]";

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboDatoLog').select2();
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

                    //listarAlmacenes($('#cboEmpresas').val());
                }
            },
            error: function (msg) {
                alertCustom("Empresas no se listaron correctamente");
            }
        });
    };

    var eventoComtroles = function () {

        $('#cboEmpresas').on('change', function () {
            listarAlmacenes($('#cboEmpresas').val());
            listarGrupos($('#cboEmpresas').val());
            //listarProductos($('#cboEmpresas').val(),
            //    $('#cboAlmacen').val() == null ? '' : $('#cboAlmacen').val().toString(),
            //    $('#slsGrupos').val() == null ? '' : $('#slsGrupos').val().toString(),
            //    '');
        });

        $('#cboAlmacen').on('change', function () {
        });

        $('#slsGrupos').on('change', function () {
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresas"])) {
                if ($('#cboAlmacen').val() != null) {
                    listarProductos($('#cboEmpresas').val(),
                        $('#cboAlmacen').val() == null ? '' : $('#cboAlmacen').val().toString(),
                        $('#slsGrupos').val() == null ? '' : $('#slsGrupos').val().toString(),
                        '');
                } else {
                    alertCustom("Seleccione por lo menos un almacén");
                }
            }
        });

        $("#btnLibroPdf").on("click", function () {
            exportTable2PDF("tblStock", "REPORTE DE STOCK DE PRODUCTOS POR CANTIDADES " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"), "REPORTE DE STOCK DE PRODUCTOS VALORIZADOS " + $("#cboEmpresas :selected").text())
        });

        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblStock", "REPORTE DE STOCK DE PRODUCTOS POR CANTIDADES " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"));
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
            url: "vistas/na/ajax/nalrelo.ashx?OPCION=3&codempr=" + empresa,
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

    function listarProductos(empresa, almacen, grupos, tipo) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "vistas/na/ajax/nalrelo.ashx?OPCION=5" +
                "&p_ctlg=" + empresa +
                "&p_almacen=" + almacen +
                "&p_grupo=" + grupos +
                "&p_dato_log=" + $("#cboDatoLog").val(),
            async: true,
            beforeSend: function () { Bloquear("tblProductos") },
            success: function (datos) {
                oTable.fnClearTable();
                $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);
                $("#divValorizadoTotal").slideUp();
                $("#lblValorizadoTotal").html("");
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                    $("#btnLibroPdf,#btnLibroXls").attr("disabled", false);
                    $("#divValorizadoTotal").slideDown();
                }
            },
            complete: function () { Desbloquear("tblProductos") },
            error: function (msg) {
                console.log(msg);
                noexito();
            }
        });
    }

    function listarAlmacenes(empresa) {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalrelo.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#cboAlmacen").multiselect("destroy");
                $('#cboAlmacen').empty();
                if (datos != null) {
                    //var arr = [];                   
                    if (datos[0].MENSAJE == "Error") {
                        $('#cboAlmacen').multiselect({
                            nonSelectedText: 'Seleccione un Almacen!',
                            numberDisplayed: 1
                        });
                        $('#cboAlmacen').multiselect('disable');
                        $('#slsGrupos').multiselect('disable');
                    }
                    else {

                        for (var i = 0; i < datos.length; i++) {
                            $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION + '</option>');
                            //arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
                        }
                        // $('#cboAlmacen').multiselect('dataprovider', arr);
                        $('#cboAlmacen').multiselect({
                            nonSelectedText: 'Seleccione un Almacen!',
                            numberDisplayed: 2
                        });
                        $('#cboAlmacen').multiselect('enable');
                        $('#slsGrupos').multiselect('enable');

                    }
                    $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");
                } else {
                    $('#cboAlmacen').multiselect({
                        nonSelectedText: 'Seleccione un Almacen!',
                        numberDisplayed: 2
                    });
                }
            },
            error: function (msg) {
                alertCustom("Almacenes no se listaron correctamente");
            }
        });
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
    }

    var handleTable = function () {
        var parms = {
            data: null,
            columns: [
                { data: "CODIGO" },
                { data: "PRODUCTO" },
                { data: "DESC_GRUPO" },
                { data: "DESC_SUBGRUPO" },
                { data: "UM", align: "center" },
                /*{ data: "CANTIDAD", align: "right" },*/
                /*{ data: "SEPARADO", align: "right" },*/
                { data: "CANT_PROD", align: "right" },
                { data: "CANTIDAD_DISPONIBLE", align: "right" }
            ],
            stateSave: false,
            sDom: 'C<"clear">lfrtip'
        }

        oTable = iniciaTabla('tblStock', parms);
        oTable.fnSort([[6, "desc"]]);
        actualizarEstilos();
        $(".ColVis.TableTools").append($("#divExportBtns"));

        $('#tblStock tbody tr').live('dblclick', function () {


            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);

            let sCodigo = row.PROD_CODE;
            let sCodeAlmc = row.ALMACEN_CODE;
            let sNombre = row.PRODUCTO;
            let sUnidadM = row.UM;

            setCookie('nombreProductoKardex', sNombre, 0.5);
            setCookie('nombreUnidadKardex', sUnidadM, 0.5);
            setCookie('codAlmacenKardex', sCodeAlmc, 0.5);
            window.open("?f=nalkard&codigo=" + sCodigo, '_blank');
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoComtroles();
            handleTable();
            cargaInicial();
        }
    };

}();


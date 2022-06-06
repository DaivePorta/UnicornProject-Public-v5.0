var NALSPUD = function () {

    let oTable = [];

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#slsUnd').select2();

        $('#cboAlmacen').multiselect(
       {
           nonSelectedText: 'Seleccione un Almacen!'
       }
       );
        $('#slsGrupos').multiselect(
            {
                nonSelectedText: 'Seleccione un Grupo!'
            }
            );
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

                    //$('#cboEmpresas').select2('val', $('#ctl00_hddctlg').val());
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoComtroles = function () {
        $('#cboEmpresas').on('change', function () {    
            listarProductos($('#cboEmpresas').val(), $('#cboAlmacen').val() == null ? '' : $('#cboAlmacen').val().toString(),
                $('#slsGrupos').val() == null ? '' : $('#slsGrupos').val().toString(), $('#slsUnd').val())
            listarAlmacenes($('#cboEmpresas').val());
            listarGrupos($('#cboEmpresas').val());
        });

        $('#cboAlmacen').on('change', function () {           
        });

        $('#slsGrupos').on('change', function () {           
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresas"])) {
                listarProductos($('#cboEmpresas').val(), $('#cboAlmacen').val() == null ? '' : $('#cboAlmacen').val().toString(),
                    $('#slsGrupos').val() == null ? '' : $('#slsGrupos').val().toString(), $('#slsUnd').val())
            }
        });


        $("#btnLibroPdf").on("click", function () {
            exportTable2PDF("tblStock", "REPORTE DE STOCK DE PRODUCTOS POR UNIDADES DE DETALLE " + $("#slsUnd :selected").text() + " " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"), "REPORTE DE STOCK DE PRODUCTOS POR UNIDADES DE DETALLE " + $("#slsUnd :selected").text())
        });

        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblStock", "REPORTE DE STOCK DE PRODUCTOS POR UNIDADES DE DETALLE " + $("#slsUnd :selected").text() + " " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"));
        });

        $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);

    }

    var fillCboUnidad = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmunme.ashx?flag=6&codi=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $('#slsUnd').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slsUnd').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#slsUnd').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargaInicial = function () {
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();
    }

    function listarGrupos(empresa) {

        //url: "vistas/na/ajax/nalmerc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
        var obj = "";
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=3&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {


                if (datos != null) {
                    var arr = [];
                    obj += '[';


                    if (datos[0].MENSAJE == "Error") {

                    }
                    else {


                        for (var i = 0; i < datos.length; i++) {

                            arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
                            obj += '{';
                            obj += '"NOMBRE":"' + datos[i].CODIGO + '"';
                            obj += '},';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';


                    }

                    $('#slsGrupos').multiselect('dataprovider', arr);
                    $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");

                }






            },
            error: function (msg) {
                alert(msg);
            }
        });






    }

    function listarAlmacenes(empresa) {

        var obj = "";
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {


                if (datos != null) {
                    var arr = [];
                    obj += '[';


                    if (datos[0].MENSAJE == "Error") {
                        $('#cboAlmacen').multiselect('disable');
                        $('#slsGrupos').multiselect('disable');
                        $('#slsUnd').attr('disabled', true);
                        //  alertCustom("No se cuenta con alamcenes registrados");
                    }
                    else {
                        $('#cboAlmacen').multiselect('enable');
                        $('#slsGrupos').multiselect('enable');
                        $('#slsUnd').attr('disabled', false);

                        for (var i = 0; i < datos.length; i++) {

                            arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
                            obj += '{';
                            obj += '"NOMBRE":"' + datos[i].CODIGO + '"';
                            obj += '},';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';


                    }

                    $('#cboAlmacen').multiselect('dataprovider', arr);
                    //$('#cboAlmacen').multiselect("select", datos[0].CODIGO);
                    $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");

                }






            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    function listarProductos(empresa, almacen, grupos, unmed) {
        
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=4&p_ALMACEN=" + almacen + "&p_grupo=" + grupos + "&p_ctlg=" + empresa + "&p_UNME_DET=" + unmed,
            beforeSend: function () { Bloquear("tblProductos") },
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);                       
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                    $("#btnLibroPdf,#btnLibroXls").attr("disabled", false);   
                    setTimeout(function () { oTable.fnAdjustColumnSizing(); }, 200);                 
                                   
                }
            },
            complete: function () { Desbloquear("tblProductos") },
            error: function (msg) {
                console.log(msg);
                noexito();
            }
        });               
    }

    var handleTable = function () {
        var parms = {
            data: null,
            columns: [
                { data: "CODIGO" },
                { data: "DESCRIPCION"},
                { data: "UMB", align: "center" },
                { data: "CANTIDAD_BASE", type: "formatoMiles"  },
                { data: "UMDET", align: "center" },
                {
                    data: "CANTIDAD_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        if (cellData === "-") {
                            td.align = "center"; 
                        } else {
                            td.innerHTML = formatoMiles(cellData);
                            td.align = 'right';
                        }
                     
                    }
                }
            ],
            stateSave: false,
            sDom: 'C<"clear">lfrtip'
        }

        oTable = iniciaTabla('tblStock', parms);
        actualizarEstilos();
        $(".ColVis.TableTools").append($("#divExportBtns"));

        $('#tblStock tbody tr').live('dblclick', function () {
      
         
             
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);

                let sCodigo = row.PROD_CODE;
                let sNombre = row.DESCRIPCION;
                let sUnidadM = row.UMB;
                setCookie('nombreProductoKardex', sNombre, 0.5);
                setCookie('nombreUnidadKardex', sUnidadM, 0.5);
                window.open("?f=nalkard&codigo=" + sCodigo, '_blank');
            
        });



    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
    }


    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboUnidad();
            handleTable();
            eventoComtroles();
            cargaInicial();
        }
    };

}();
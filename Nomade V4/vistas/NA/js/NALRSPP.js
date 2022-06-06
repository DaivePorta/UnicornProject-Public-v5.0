var NALRSPP = function () {

    let oTable = [];

    var plugins = function () {
        $('#cboEmpresas').select2();
        //$('#slsMoneda').select2();

        $('#cboAlmacen').multiselect({
            nonSelectedText: 'Seleccione un Almacen!',
            numberDisplayed: 1
        });
        $('#slsGrupos').multiselect({
            nonSelectedText: 'Seleccione un Grupo!',
            numberDisplayed: 1
        });
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
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val());
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoControles = function () {
        CrearControl("N", "1", "slsMoneda", "moneda");
        //$('#slsMoneda').select2();
        //$('#slsMoneda').select2("val","0002"); //soles
        
        $('#cboEmpresas').on('change', function () {

            

            listarAlmacenes($('#cboEmpresas').val());
            listarGrupos($('#cboEmpresas').val());

            listarProductos($('#cboEmpresas').val(),
                $('#cboAlmacen').val() == null ? '' : $('#cboAlmacen').val().toString(),
                $('#slsGrupos').val() == null ? '' : $('#slsGrupos').val().toString());
                //($('#slsMoneda').val());
        });

        $('#cboAlmacen').on('change', function () {
         
        });

        $('#slsGrupos').on('change', function () {
          
        });

        //$('#slsMoneda').on('change', function () {
        //});

        $('#buscar').on('click', function () {

            if (vErrors(["cboEmpresas"])) {
                listarProductos($('#cboEmpresas').val(),
                    $('#cboAlmacen').val() == null ? '' : $('#cboAlmacen').val().toString(),
                    $('#slsGrupos').val() == null ? '' : $('#slsGrupos').val().toString());
                    //$('#slsMoneda').val());
            }

        });

        $("#btnLibroPdf").on("click", function () {
            exportTable2PDF("tblStock", "REPORTE DE STOCK DE PRODUCTOS VALORIZADOS " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"), "REPORTE DE STOCK DE PRODUCTOS VALORIZADOS " + $("#cboEmpresas :selected").text())
        });

        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblStock", "REPORTE DE STOCK DE PRODUCTOS VALORIZADOS " + $("#cboEmpresas :selected").text() + " al " + new Date().format("dd.MM.yyyy"));
        });

        $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);

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
                    }
                    else {
                        $('#cboAlmacen').multiselect('enable');
                        $('#slsGrupos').multiselect('enable');
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
                    $('#cboAlmacen').multiselect("select", $('#ctl00_hddestablecimiento').val()); 
                    $('.checkbox').attr("style", "padding:2px 0px 2px 00px !important");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function listarProductos(empresa, almacen, grupos, moneda) {
       
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=6&p_almacen=" + almacen + "&p_grupo=" + grupos + "&p_ctlg=" + empresa + "&p_mone_code=" + "0002",
            beforeSend: function () { Bloquear("tblProductos")  },
            success: function (datos) {   
                oTable.fnClearTable();
                $("#btnLibroPdf,#btnLibroXls").attr("disabled", true);
                $("#divValorizadoTotal").slideUp();
                $("#lblValorizadoTotal").html("");
                if (datos.length>0) {
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

    var cargaInicial = function () {
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();
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
                { data: "DESC_GRUPO", align: "center" },
                { data: "DESC_SUBGRUPO", align: "center" },
                { data: "DESC_MARCA", align: "center" },
                { data: "CANTIDAD",align:"right" },
                { data: "UM", align: "center" },
                { data: "PESO_UNIT", align: "right" },
                { data: "PESO_TOTAL", align: "right" } //type:"formatoMiles"
            ],
            stateSave: false,
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var oArrayItemsSumar = new Array();
               
                api.data().filter(function (obj) {
                    oArrayItemsSumar.push(obj.PESO_TOTAL);
                });

                if (oArrayItemsSumar.length > 0) {

                    //$("#lblTipoCambio").html(api.data()[0].VALOR_CAMBIO);

                    $("#lblValorizadoTotal").html(formatoMiles(oArrayItemsSumar.reduce(
                        function (itemA, itemB) {
                            return itemA + itemB;
                        })));
                }            
            },
            sDom: 'C<"clear">lfrtip'
        }

        oTable = iniciaTabla('tblStock', parms);     
        actualizarEstilos();
        $(".ColVis.TableTools").append($("#divExportBtns"));


        $('#tblStock tbody tr').live('dblclick', function () {
   
           
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);

                let sCodigo = row.PROD_CODE;
                let sNombre = row.PRODUCTO;
                let sUnidadM = row.UM;
                setCookie('nombreProductoKardex', sNombre, 0.5);
                setCookie('nombreUnidadKardex', sUnidadM, 0.5);
                window.open("?f=nalkard&codigo=" + sCodigo, '_blank');
            
        });



    }


    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            eventoControles();
            handleTable();
            cargaInicial();
          
        }
    };
}();
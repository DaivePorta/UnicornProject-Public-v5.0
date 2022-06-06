

var productos = [];
var almacenes = "";
var paramStock = -1;
var NVLTPRO = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();
        $("#cbogrupo").select2();
        $("#cbosubgrupo").select2();
        $("#cbomarca").select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
        }
    }

    var fillCboAlmacen = function (ctlg) {
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $("#cboAlmacen").multiselect("destroy");
                $('#cboAlmacen').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '" selected="selected">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboAlmacen').multiselect({
                    nonSelectedText: 'SELECCION ALMACÉN',
                    allSelectedText: 'TODOS',
                    numberDisplayed: 1
                });
                $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");

            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });

        $(".btn-group").attr("style", "max-width:100%");
        $(".multiselect.dropdown-toggle").attr("style", "max-width:100%");
    }

    var fillCboGrupos = function () {
        Bloquear($($("#cbogrupo").parents("div")[0]).attr("id"));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=4&CTLG_CODE=" + $.trim($('#cboEmpresa').val()) + "&OPCION2=&CODE_EXIS=",
            async: true,
            success: function (datos) {
                Desbloquear($($("#cbogrupo").parents("div")[0]).attr("id"));
                $('#cbogrupo').empty();
                $('#cbogrupo').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbogrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbogrupo').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cbogrupo").parents("div")[0]).attr("id"));
                alertCustom("Grupos no se listaron correctamente");
            }
        });
    }

    var fillCboSubgrupos = function () {
        if ($('#cbogrupo').val() != "") {
            Bloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
            $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + $.trim($('#cbogrupo').val()) + "&CTLG_CODE=" + $.trim($('#cboEmpresa').val()),
                async: true,
                success: function (datos) {
                    Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                    $('#cbosubgrupo').empty();
                    $('#cbosubgrupo').append('<option value="">TODOS</option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                        }
                        $('#cbosubgrupo').removeAttr("disabled");
                    } else {
                        $('#cbosubgrupo').attr("disabled", "disabled");
                    }
                    $('#cbosubgrupo').select2('val', '');
                },
                error: function (msg) {
                    Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                    alertCustom("Subgrupos no se listaron correctamente");
                }
            });
        } else {
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            $('#cbomarca').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
        }
    }

    var fillCboMarcas = function () {
        Bloquear($($("#cbomarca").parents("div")[0]).attr("id"));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmgmar.ashx?OPCION=6&SUBGRUP_CODE=" + $.trim($('#cbosubgrupo').val()),
            async: true,
            success: function (datos) {
                Desbloquear($($("#cbomarca").parents("div")[0]).attr("id"));
                $('#cbomarca').empty();
                $('#cbomarca').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbomarca').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbomarca').removeAttr("disabled");
                } else {
                    $('#cbomarca').attr("disabled", "disabled");
                }
                $('#cbomarca').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cbomarca").parents("div")[0]).attr("id"));
                alertCustom("Marcas no se listaron correctamente");
            }
        });
    }

    function cargarParametrosSistema() {
        //OBTENER PARAMETRO PARA MOSTRAR STOCK
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=STKP",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#hfParamStock').val(datos[0].VALOR);
                    paramStock = parseFloat($("#hfParamStock").val());
                }
                else { alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!"); }
            },
            error: function (msg) {
                alertCustom("No se recuperó el Parámetro de Muestra de Stock(STKP) correctamente!");
            }
        });
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboAlmacen($("#cboEmpresa").val());
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            $('#cbomarca').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            fillCboGrupos();

        });

        $("#cboAlmacen").on("change", function () {

        });

        $('#cbogrupo').on('change', function () {
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            $('#cbomarca').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            fillCboSubgrupos();
        });

        $('#cbosubgrupo').on('change', function () {
            fillCboMarcas();
        });

        $("#buscar").on("click", function () {
            listarCatalogo();
        });

        $("#tblProductos tr td div").live("click", function () {
            if ($(this).attr("id") != undefined) {
                var id = $(this).attr("id").split("_")[1];
                var prod = ObtenerProducto(id);
                LlenarDetallesProducto(prod);
                $("#modalDetalles,#bModalDetalles").fadeIn();
            }
        });

        $("#btnVerFiltros").on("click", function () {
            $("#divFiltros").slideToggle();
            if ($("#btnVerFiltros i").hasClass("icon-chevron-down")) {
                $("#btnVerFiltros i").removeClass("icon-chevron-down");
                $("#btnVerFiltros i").addClass("icon-chevron-up");
                $("#btnVerFiltros span").html("&nbsp;Ocultar Filtros");
            }
            else {
                $("#btnVerFiltros i").addClass("icon-chevron-down");
                $("#btnVerFiltros i").removeClass("icon-chevron-up");
                $("#btnVerFiltros span").html("&nbsp;Ver Filtros");
            }
        });

        $("#btnCerrarModal").live("click", function () {
            $("#modalDetalles,#bModalDetalles").fadeOut();
        });

        $("#bModalDetalles").live("click", function () {
            $("#modalDetalles,#bModalDetalles").fadeOut();
        });


        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                $("#modalDetalles,#bModalDetalles").fadeOut();
            }
        });
    }

    var cargaInicial = function () {
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
    }

    var EventosCargaInicial = function () {
        var value = "";

        var cboGru = true;
        $("#cbogrupo").live("select2-opening", function () {
            if (cboGru) {
                value = $(this).val();
                fillCboGrupos();
                $(this).select2("val", value);
                cboGru = false;
            }
        })

        var cboSubgru = true;
        $("#cbosubgrupo").live("select2-opening", function () {
            if (cboSubgru) {
                value = $(this).val();
                fillCboSubgrupos()
                $(this).select2("val", value);
                cboSubgru = false;
            }
        })

        var cboMarc = true;
        $("#cbomarca").live("select2-opening", function () {
            if (cboMarc) {
                value = $(this).val();
                fillCboMarcas();
                $(this).select2("val", value);
                cboMarc = false;
            }
        })
    }

    return {
        init: function () {
            $("#contenedorBreadcrumb").attr("style", "display:none");
            cargarParametrosSistema();
            plugins();
            if (ObtenerQueryString("codigo") != null) {
                EventosCargaInicial();
            } else {
                //fillcboExistencias();               
            }
            eventoControles();
            fillCboEmpresa();
            cargaInicial();
            listarCatalogo();
        }
    };
}();

function listarCatalogo() {

    $("#chkGrupo").attr("checked", "checked").parent().addClass("checked");
    $("#chkSubgrupo").attr("checked", "checked").parent().addClass("checked");
    var almacenes = (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "");

    if (vErrors(['cboEmpresa'])) {
      
        setTimeout(function () {
            $.ajax({
                type: "post",
                url: "vistas/NV/ajax/NVLCPRO.ashx?OPCION=1&CTLG_CODE=" + $("#cboEmpresa").val() +
                    "&ESTADO_IND=" + (($("#chkEstado").is(":checked")) ? "" : "A") +
                    "&STOCK_IND=" + (($("#chkStock").is(":checked")) ? "S" : "N") +
                    "&SCSL_CODE=" + (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "") +
                    "&ALMC_CODE=" + (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "") +
                    "&GRUPO_CODE=" + $("#cbogrupo").val() +
                    "&SUBGRUPO_CODE=" + $("#cbosubgrupo").val() +
                    "&MARCA_CODE=" + $("#cbomarca").val() +
                    "&start=0" +
                    "&length=-1" +
                    "&search[value]=" +
                    "&order[0][column]=0" +
                    "&order[0][dir]=asc",
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                beforeSend: function () { Bloquear("divTblProductos","Cargando Productos");},
                cache: true,
                success: function (datos) {

                    var isdatatable = $("#divTblProductos .dataTables_wrapper").html() != undefined ? true : false;
                    if (isdatatable) {
                        $("#divTblProductos").html('<table id="tblProductos" class="table" border="0" style="width: 100%; border: 0px solid #cbcbcb;"><thead class="fondoHeader"><tr> <th class="center"></th></tr></thead><tbody></tbody></table> ')
                    }
                    $("#tblProductos tbody tr").remove();

                    if (datos != null) {
                        productos = datos;
                        var precio;

                        var contador = 1;
                        var tr;
                        var nroProductos = productos.length + (Math.ceil(productos.length / 4) * 4 - productos.length);
                        var stocks, stockAcumulado, listar;
                        for (var i = 0; i < nroProductos; i++) {
                            if (productos[i] != undefined) {
                                //PRECIO------------------------
                                precio = "";
                                if (productos[i].PRECIO_IND == "E") {
                                    precio = ObtenerPrecioEstandarMostrar(productos[i]);
                                } else {
                                    precio = ObtenerPrecioCantidadMostrar(productos[i]);
                                }
                                //STOCK--------------------------
                                stocks = productos[i].STOCK_REAL.split(",");
                                stockAcumulado = 0;
                                for (var k = 0; k < stocks.length; k++) {
                                    if (almacenes.indexOf(stocks[k].split("|")[1]) >= 0) {
                                        stockAcumulado += parseFloat(stocks[k].split("|")[0]);
                                    }
                                }
                                //----------------------------
                                listar = true;
                                if (stockAcumulado <= 0) {
                                    if (!$("#chkStock").is(":checked")) {
                                        listar = false;
                                    }
                                    stockAcumulado = 0;
                                }

                                if (!isNaN(paramStock)) {
                                    if (paramStock >= 0) {
                                        if (stockAcumulado > paramStock) {
                                            stockAcumulado = "> " + paramStock;
                                        }
                                    }
                                }
                            }


                            if (listar) {

                                if (productos[i] != undefined) {
                                    precio = (precio == "") ? "" : productos[i].SIMBOLO_MONEDA + " " + precio;
                                }
                                else {
                                    precio = "";
                                }

                                switch (contador) {
                                    case 1:
                                        tr = '<tr class="" >';
                                        if (productos[i] != undefined && typeof productos[i].RUTA_IMAGEN != "undefined") {
                                            tr += '<td class="td_wrap center" style="width:155px;">'
                                            tr += '<div class="divimg"  id="td_' + productos[i].CODIGO + '" ><img class="img_hover" src="' + productos[i].RUTA_IMAGEN + '" alt="' + productos[i].CODIGO_ANTIGUO + '" title="' + productos[i].CODIGO_ANTIGUO + " - " + productos[i].DESC_ADM + '"/>';
                                            tr += '<p><small>' + productos[i].DESC_ADM + '</small></p>';
                                            tr += '</div>';
                                        } else {
                                            tr += '<div class="divimg"></div>'
                                        }
                                        contador++;
                                        break;
                                    case 2:
                                        if (productos[i] != undefined && typeof productos[i].RUTA_IMAGEN != "undefined") {
                                            tr += '<div class="divimg"  id="td_' + productos[i].CODIGO + '"><img class="img_hover" src="' + productos[i].RUTA_IMAGEN + '" alt="' + productos[i].CODIGO_ANTIGUO + '" title="' + productos[i].CODIGO_ANTIGUO + " - " + productos[i].DESC_ADM + '"/>';
                                            tr += '<p><small>' + productos[i].DESC_ADM + '</small></p>';
                                            tr += '</div>';
                                        } else {
                                            tr += '<div class="divimg"></div>'
                                        }
                                        contador++;
                                        break;
                                    case 3:
                                        if (productos[i] != undefined && typeof productos[i].RUTA_IMAGEN != "undefined") {
                                            tr += '<div class="divimg"  id="td_' + productos[i].CODIGO + '"><img class="img_hover" src="' + productos[i].RUTA_IMAGEN + '" alt="' + productos[i].CODIGO_ANTIGUO + '" title="' + productos[i].CODIGO_ANTIGUO + " - " + productos[i].DESC_ADM + '"/>';
                                            tr += '<p><small>' + productos[i].DESC_ADM + '</small></p>';
                                            tr += '</div>';
                                        } else {
                                            tr += '<div class="divimg"></div>'
                                        }
                                        contador++;
                                        break;
                                    case 4:
                                        if (productos[i] != undefined && typeof productos[i].RUTA_IMAGEN != "undefined") {
                                            tr += '<div class="divimg"  id="td_' + productos[i].CODIGO + '"><img class="img_hover" src="' + productos[i].RUTA_IMAGEN + '" alt="' + productos[i].CODIGO_ANTIGUO + '" title="' + productos[i].CODIGO_ANTIGUO + " - " + productos[i].DESC_ADM + '"/>';
                                            tr += '<p><small>' + productos[i].DESC_ADM + '</small></p>';
                                            tr += '</div>';
                                            tr += '</td>';
                                        } else {
                                            tr += '<div class="divimg"></div></td>'
                                        }
                                        tr += '</tr>'
                                        $("#tblProductos tbody").append(tr);
                                        contador = 1;
                                        break;
                                }

                            }
                        }
                    }
                   
                    //$("#tblProductos").dataTable();
                    $('#tblProductos').dataTable().fnDestroy();
                    $('#tblProductos').dataTable({
                        "info": false,
                        "scrollX": true,
                        "ordering": false,
                        "lengthMenu": [[1, 2, -1], [4, 8, "Todo"]],
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                    });
                
                    $($("#tblProductos_filter label")[0]).css("color", "white")
                    $($("#tblProductos_filter label input")[0]).parent().prepend("<span style='color:black !important'>Buscar por Fila:</span>");
                    //   $('#tblProductos_wrapper :first').remove()
                },
                error: function (msg) {
                    Desbloquear("divTblProductos");
                    alertCustom("Productos no se listaron correctamente");
                },
                complete: function () { Desbloquear("divTblProductos");}
            });
        }, 100);

    }
}

function ObtenerProducto(code) {
    var prod = {};
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].CODIGO == code) {
            prod = productos[i];
            break;
        }
    }
    return prod;
}

function LlenarDetallesProducto(prod) {

    var almacenes = (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "");
    $("#txtImgProducto").attr("src", "../../recursos/img/150x150.gif");
    $(".txtCodigoProd").html(prod.CODIGO_ANTIGUO);
    $(".txtCodigoAux").html(prod.CODIGO_AUXILIAR);
    $("#txtEspAdicional").html(prod.ESP_ADICIONAL);
    $("#txtNombre").html(prod.DESC_ADM);
    $("#txtNombreComercial").html(prod.NOMBRE_COMERCIAL);
    $("#txtEspAdicional").html(prod.ESP_ADICIONAL);
    $("#txtFichaTecnica").html(prod.URLPROD);
    $("#txtFichaTecnica").attr("href", (prod.URLPROD.indexOf("http://") >= 0) ? prod.URLPROD : "http://" + prod.URLPROD);
    $("#txtExistencia").html(prod.DESC_EXISTENCIA);
    $("#txtGrupo").html(prod.DESC_GRUPO);
    $("#txtSubgrupo").html(prod.DESC_SUBGRUPO);
    $("#txtMarca").html(prod.DESC_MARCA);
    $("#txtModelo").html(prod.DESC_MODELO);
    $("#txtPresentacion").html(prod.DESC_PRESENTACION);
    $("#txtUnidadDespacho").html(prod.DESC_UNIDAD_DESPACHO);
    $("#txtVolumen").html(prod.VOLUMEN + " " + prod.DESC_CORTA_UNIDAD_VOLUMEN);

    $("#txtEstado").html((prod.ESTADO == "A") ? "ACTIVO" : "DESCONTINUADO");
    $("#txtSeriado").html((prod.SERIADA == "S") ? "SÍ" : "NO");
    var bien = "";
    if (prod.TIPO_BIEN == "GRA") {
        bien = "GRAVADO";
    } else if (prod.TIPO_BIEN == "INA") {
        bien = "INAFECTO";

    } else if (prod.TIPO_BIEN == "EXO") {
        bien = "EXONERADO";
    } else if (prod.TIPO_BIEN == "GIS") {
        bien = "GRAVADO CON ISC(" + prod.ISC + " %)";
    } else {
        bien = prod.TIPO_BIEN;
    }
    $("#txtTipoBien").html(bien);

    if (prod.DESC_DETRACCION != "") {
        $("#txtDetraccion").html(prod.DESC_DETRACCION + "(" + parseFloat(prod.DETRACCION).toFixed(2) + " %)");
    } else {
        $("#txtDetraccion").html("NO ESTÁ SUJETO");
    }

    //--------------------------------------
    $("#tblAlmacenes tbody tr").remove();
    var tr = "";
    var stocks = prod.STOCK_REAL.split(",");
    for (var i = 0; i < stocks.length; i++) {
        if (parseFloat(stocks[i].split("|")[0]) > 0) {//SOLO ALMACENES CON STOCK
            if (almacenes.indexOf(stocks[i].split("|")[1]) >= 0) {//[1] Codigo [2] Almacen [0] Stock
                var stockAcumulado = parseFloat(stocks[i].split("|")[0]);
                if (!isNaN(paramStock)) {
                    if (paramStock >= 0) {
                        if (stockAcumulado > paramStock) {
                            stockAcumulado = "> " + paramStock;
                        }
                    } else {
                        stockAcumulado = 0;
                    }
                }
                tr += "<tr><td>" + stocks[i].split("|")[2] + "</td><td class='center'>" + stockAcumulado + "</td></tr>";
            }
        }
    }
    $("#tblAlmacenes tbody").append(tr);
    if (tr == "") {
        $("#tblAlmacenes tbody").append("<tr><td colspan='2' class='center'>SIN STOCK</td></tr>");
    }
    //-------------------------------------

    tr = "";
    if (prod.PRECIO_IND == "E") {
        $("#tblPreciosEstandar").css("display", "table");
        $("#tblPreciosCantidad").css("display", "none");
        $("#tblPreciosEstandar tbody tr").remove();

        var ape = prod.ALMACENES_PREE.split(",");
        var pEstandar = (prod.PRECIOS_ESTANDAR.split(","))
        for (var j = 0; j < ape.length; j++) {
            if (ape[j] == prod.ALMC_PREE) {
                var pVen = (pEstandar[j].split("|"))[0];
                var pMin = (pEstandar[j].split("|"))[1];
                tr += "<tr><td class='fondoPrecio' style='width: 70px;'>P. VENTA</td><td class='precio'>" + ((pVen != undefined) ? ((pVen == "") ? "" : (prod.SIMBOLO_MONEDA + " " + pVen)) : "") + "</td></tr>";
                tr += "<tr><td class='fondoPrecio'>P. MÍNIMO</td><td class='precio'>" + ((pMin != undefined) ? ((pMin == "") ? "" : (prod.SIMBOLO_MONEDA + " " + pMin)) : "") + "</td></tr>";

                break;
            }
        }
        $("#tblPreciosEstandar tbody").append(tr);
        $(".txtAlamcen").html($("#cboAlmacen option[value='" + prod.ALMC_PREE + "']").html())
    } else {
        $("#tblPreciosEstandar").css("display", "none");
        $("#tblPreciosCantidad").css("display", "table");
        $("#tblPreciosCantidad tbody tr").remove();

        var pCantidad = (prod.PRECIOS_CANTIDAD.split(","))
        for (var k = 0; k < pCantidad.length; k++) {
            var prec = pCantidad[k].split("|")[0]; //Precio
            var nomb = pCantidad[k].split("|")[1]; //Nombre del Rango
            var almc = pCantidad[k].split("|")[2]; //Almacen
            if (almc == prod.ALMC_PREC) {
                tr += "<tr><td class='fondoPrecio' style='width: 70px;'>" + nomb + "</td><td class='precio'>" + ((prec == "") ? "" : (prod.SIMBOLO_MONEDA + " " + prec)) + "</td></tr>";
            }
        }
        $("#tblPreciosCantidad tbody").append(tr);
        $(".txtAlamcen").html($("#cboAlmacen option[value='" + prod.ALMC_PREC + "']").html())

    }

    ObtenerImagenProducto(prod);
}

function ObtenerPrecioEstandarMostrar(prod) {
    var almacenes = (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "");
    var precio = "";
    prod.ALMC_PREE = "";

    var ape = prod.ALMACENES_PREE.split(",");
    var pEstandar = (prod.PRECIOS_ESTANDAR.split(","))
    for (var j = 0; j < ape.length; j++) {
        var pVen = (pEstandar[j].split("|"))[0];//[0]PRECIO VENTA,[1]PRECIO MINIMO
        var pMin = (pEstandar[j].split("|"))[1];
        if (almacenes.indexOf(ape[j]) >= 0) {
            if (pVen != undefined) {
                if (parseFloat(precio) < parseFloat(pVen) || precio == "") {
                    precio = pVen;
                    prod.ALMC_PREE = ape[j];
                }
            }
        }
    }
    return precio;
}

function ObtenerPrecioCantidadMostrar(prod) {
    var almacenes = (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "");
    var precio = "";
    prod.ALMC_PREC = "";

    var pCantidad = (prod.PRECIOS_CANTIDAD.split(","))

    precio = "";
    var nombreRangoMostrar = "";

    for (var k = 0; k < pCantidad.length; k++) {
        var prec = pCantidad[k].split("|")[0]; //Precio
        var nomb = pCantidad[k].split("|")[1]; //Nombre del Rango
        var almc = pCantidad[k].split("|")[2]; //Almacen

        if (almacenes.indexOf(almc) >= 0) {
            if (prec != undefined) {
                if (parseFloat(precio) < parseFloat(prec) || precio == "") {
                    precio = prec;
                    nombreRangoMostrar = nomb;
                    prod.ALMC_PREC = almc;
                }
            }
        }
    }
    precio = (precio == "") ? "" : (precio + " (" + nombreRangoMostrar + ")");
    return precio;
}

function ObtenerImagenProducto(prod) {

    if (prod != undefined && typeof prod.RUTA_IMAGEN != "undefined") {
        $("#txtImgProducto").attr("src", prod.RUTA_IMAGEN);

    } else {
        $("#txtImgProducto").attr("src", "../../recursos/img/no_disponible.png");
    }
}

function ImprimirCatalogo() {
    if ($("#styleImpresion").html() == undefined) {
        var estilos = '<style id="styleImpresion">@media print {.navbar-inner {display: none !important;}.page-sidebar {display: none  !important;}.footer {display: none  !important;}.page-content {margin-left: 0px  !important;}#contenedor{display: none  !important;}#contenedorBreadcrumb{ display: none  !important;}.page-container {margin-top: 0px  !important;}#divDctoImprimir {display: block  !important;width: 100%  !important;font-size: 11px  !important;line-height: 11px  !important;}.container-fluid {padding: 0px  !important;}}</style>';
        $("#ventana").append(estilos);
    }



    setTimeout(function () {
        $("#divDctoImprimir").html($("#divTblProductos").html());

        $($("#divDctoImprimir #tblProductos_wrapper").children("div")[2]).remove();
        $($("#divDctoImprimir #tblProductos_wrapper").children("div")[0]).remove();
        $("#divDctoImprimir .dataTables_scrollBody").removeAttr("style");
        $("#divDctoImprimir #tblProductos").css("width", "100%");
        $("#divDctoImprimir #tblProductos img").css("width", "150px").css("height", "150px");
        $("#divDctoImprimir #tblProductos .divimg").css("min-width", "150px").css("min-height", "150px");
        $("#divDctoImprimir #tblProductos .divimg").css("max-width", "150px")
        
        var nomEmpresa = $("#cboEmpresa :selected").html();
        $("#divDctoImprimir").prepend("<hr></hr>")
        $("#divDctoImprimir").prepend("<h5>CATÁLOGO PRODUCTOS</h5>")
        $("#divDctoImprimir").prepend("<h4>" + nomEmpresa + "</h4>")
        window.print();
    }, 200)
}

/*
Al cargar el formulario, se mostrarán todos los productos con sus stocks en todos sus almacenes

Cuando la pantalla tiene un ancho máximo de 500px se muestra el checkbox "Barra de Búsqueda" 
que mostrará la barra de búsqueda de productos en la parte superior de la pantalla; Todas la coincidencias encontradas cambian de color
y al presionar Enter se irá al siguiente registro. //Necesita habilitar en código

Los filtros: Almacen, Grupo, Subgrupo, Incluir Productos descontinuados; requieren hacer click en Filtrar para que tengan efecto.

Si checkbox "Mostrar Grupos" esta marcado, las divisiones de grupos en el catálogo de productos se mostrarán, de lo contrario se ocultarán.
Si checkbox "Mostrar Subgrupos" esta marcado, las divisiones de subgrupos en el catálogo de productos se mostrarán, de lo contrario se ocultarán.

El precio estandar mostrado es el mayor precio de venta de todos los almacenes seleccionados
Los precios por cantidad mostrados se base en el mayor precio dentro de todos los rangos para un almacen
*/

var productos = [];
var almacenes = "";
var paramStock = -1;
var NVLCSER = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();
        $("#cbogrupo").select2();
        $("#cbosubgrupo").select2();        
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
                        if (datos[i].ALMACENABLE_IND == 'N') {
                            $('#cbogrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
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
        }
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
            fillCboGrupos();

        });

        $("#cboAlmacen").on("change", function () {

        });

        $('#cbogrupo').on('change', function () {
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            fillCboSubgrupos();
        });

        $('#cbosubgrupo').on('change', function () {
           
        });

        $("#buscar").on("click", function () {
            listarCatalogo();
        });

        $("#tblProductos tr").live("click", function () {
            var id = $(this).attr("id").split("_")[1];
            if (id != undefined) {
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

        $("#chkGrupo").on("change", function () {
            if ($(this).is(":checked")) {
                $(".fondoGrupo").css("display", "table-cell");
            } else {
                $(".fondoGrupo").css("display", "none");
            }
        });

        $("#chkSubgrupo").on("change", function () {
            if ($(this).is(":checked")) {
                $(".fondoSubgrupo").css("display", "table-cell");
            } else {
                $(".fondoSubgrupo").css("display", "none");
            }
        });

        $("#chkBuscar").on("change", function () {
            if ($(this).is(":checked")) {
                if ($("#modalBusqueda").css("display") == "none") {
                    $("#modalBusqueda").css("display", "block");
                    $('#txtBuscar').focus();
                }
            } else {
                if ($("#modalBusqueda").css("display") == "block") {
                    $("#modalBusqueda").css("display", "none");
                }
            }
        });

        var ids = [];
        var idConsutado = 0;
        $('#txtBuscar').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 && $(this).val() != '') {
                if (idConsutado < ids.length && ids.length > 0) {
                    window.location.href = "#" + ids[idConsutado];
                    window.scrollTo(0, window.scrollY - 50);
                    idConsutado++;
                } else {
                    idConsutado = 0;
                }
            } else {
                ids = [];
                $(".td_wrap").parent().css("background-color", "white");
                if ($(this).val().trim() != "" && $(this).val().trim().length >= 3) {
                    var tr = $(".td_wrap");
                    for (var i = 0; i < tr.length; i++) {
                        var cont = $(tr[i]).html();
                        if (cont.toUpperCase().indexOf($(this).val().toUpperCase()) >= 0) {
                            $(tr[i]).parent().css("background-color", "#EEEEEE");
                            ids.push($(tr[i]).parent().attr("id"));
                        }
                    }
                    if (ids.length > 0) {
                        window.location.href = "#" + ids[idConsutado];
                        window.scrollTo(0, window.scrollY - 50);
                        idConsutado = 0;
                    }
                }
            }
            $(this).focus();
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
       
    }

    return {
        init: function () {
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

        Bloquear("divBloqueo");
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVLCSER.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val() +
                "&ESTADO_IND=" + (($("#chkEstado").is(":checked")) ? "" : "A") +
                "&STOCK_IND=" + "S" +
                "&SCSL_CODE=" + (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "") +
                "&ALMC_CODE=" + (($('#cboAlmacen').val() != null) ? $('#cboAlmacen').val().toString() : "") +
                "&GRUPO_CODE=" + $("#cbogrupo").val() +
                "&SUBGRUPO_CODE=" + $("#cbosubgrupo").val() +
                "&MARCA_CODE=" + "" +
                "&start=0" +
                "&length=-1" +
                "&search[value]=" +
                "&order[0][column]=0" +
                "&order[0][dir]=asc",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: true,
            success: function (datos) {
                $("#tblProductos tbody tr").remove();
                if (datos != null) {
                    productos = datos;
                    var precio;

                    var grupoAnterior = "";
                    var subgrupoAnterior = "";
                    for (var i = 0; i < productos.length; i++) {

                        //PRECIO------------------------
                        precio = "";
                        if (productos[i].PRECIO_IND == "E") {
                            precio = ObtenerPrecioEstandarMostrar(productos[i]);
                        } else {
                            precio = ObtenerPrecioCantidadMostrar(productos[i]);
                        }
                        //STOCK--------------------------
                        //var stocks = productos[i].STOCK_REAL.split(",");
                        //var stockAcumulado = 0;
                        //for (var k = 0; k < stocks.length; k++) {
                        //    if (almacenes.indexOf(stocks[k].split("|")[1]) >= 0) {
                        //        stockAcumulado += parseFloat(stocks[k].split("|")[0]);
                        //    }
                        //}
                        //----------------------------
                        var listar = true;

                        //if (stockAcumulado <= 0) {
                        //    if (!$("#chkStock").is(":checked")) {
                        //        listar = false;
                        //    }
                        //    stockAcumulado = 0;
                        //}

                        //if (!isNaN(paramStock)) {
                        //    if (paramStock >= 0) {
                        //        if (stockAcumulado > paramStock) {
                        //            stockAcumulado = "> " + paramStock;
                        //        }
                        //    }
                        //}

                        if (listar) {
                            if (productos[i].CODIGO_GRUPO != grupoAnterior) {
                                var tr = '<tr><td colspan="2" class="fondoGrupo">' + productos[i].DESC_GRUPO.toUpperCase() + '</td></tr>'
                                grupoAnterior = productos[i].CODIGO_GRUPO;
                                $("#tblProductos tbody").append(tr);
                            }

                            if (productos[i].CODIGO_SUBGRUPO != subgrupoAnterior) {
                                var tr = '<tr><td colspan="2" class="fondoSubgrupo">' + productos[i].DESC_SUBGRUPO.toUpperCase() + '</td></tr>'
                                subgrupoAnterior = productos[i].CODIGO_SUBGRUPO;
                                $("#tblProductos tbody").append(tr);
                            }

                            precio = (precio == "") ? "" : productos[i].SIMBOLO_MONEDA + " " + precio;
                            var tr = '<tr class="tr_hover" id="tr_' + productos[i].CODIGO + '">';
                            tr += '<td class="td_wrap">' + productos[i].CODIGO_ANTIGUO + " - " + productos[i].DESC_ADM + '</td>';
                            tr += '<td class="right">' + precio + '</td>';                      
                            tr += '</tr>'
                            $("#tblProductos tbody").append(tr);
                        }
                    }
                }
                Desbloquear("divBloqueo");
            },
            error: function (msg) {
                Desbloquear("divBloqueo");
                alertCustom("Productos no se listaron correctamente");
            }
        });
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

    ObtenerImagenProducto(prod.CODIGO);
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

function ObtenerImagenProducto(cod) {
    var url = "";
    $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX?OPCION=3&PROD_CODE=" + cod,
        contentType: "application/json;",
        dataType: "json",
        async: true,
        success: function (datos) {
            url = datos[0].RUTA_IMAGEN;
            if (url == "") {
                $("#txtImgProducto").attr("src", "../../recursos/img/no_disponible.png");
            } else {
                $("#txtImgProducto").attr("src", url);
            }
        },
        error: function (msg) {
            MostrarError(msg, "producto");
        }
    });
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

        var nomEmpresa = $("#cboEmpresa :selected").html();
        $("#divDctoImprimir").prepend("<hr></hr>")
        $("#divDctoImprimir").prepend("<h5>CATÁLOGO PRODUCTOS</h5>")
        $("#divDctoImprimir").prepend("<h4>" + nomEmpresa + "</h4>")
        window.print();
    }, 200)
}

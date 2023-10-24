//Llenar productos
var productos = [];
var prodActual = {};

function cargarParametrosSistema() {
    //PARÁMETRO CENTRO DE COSTOS
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CCST",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (datos[0].VALOR !== "" || datos[0].VALOR == "0") {

                    autocompletarCentroCostos2('#txtCentroCostos', datos[0].VALOR);
                    //console.log(jsonPredeterminado.PIDM);
                } else {
                    // QUE CARGUEN TODOS LOS CLIENTES NORMAL  
                    autocompletarCentroCostos('#txtCentroCostos', '');
                }
            } else {
                autocompletarCentroCostos('#txtCentroCostos', '');
            }
        },
    });
};

function autocompletarCentroCostos2(v_ID, v_value) { //DPORTA
    var selectinput = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=17&CTLG_CODE=" + $('#slcEmpresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null && v_value != "") {
                for (var i = 0; i < datos.length; i++) {
                    if (datos[i].CODE == v_value) {
                        $("#txtCentroCostos").val(datos[i].DESCC);
                        $("#hfCENTRO_COSTOS").val(datos[i].CODE);
                        $("#hfCECC_CODE").val(datos[i].CECC_CODE);
                    }
                }
            }
        },
        error: function (msg) {
            alertCustom('Error al intentar obtener centro de costos.');
        }
    });

};

function autocompletarCentroCostos(v_ID, v_value) {
    var selectinput = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=17&CTLG_CODE=" + $('#slcEmpresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null) {
                selectinput.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].DESCC);
                            obj += '{';
                            obj += '"CODE":"' + datos[i].CODE + '","DESCC":"' + datos[i].DESCC + '","CECC_CODE":"' + datos[i].CECC_CODE + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.DESCC] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        $("#hfCENTRO_COSTOS").val(map[item].CODE);
                        $("#hfCECC_CODE").val(map[item].CECC_CODE);

                        return item;
                    },
                });
                selectinput.keyup(function (e) {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(v_ID).val().length <= 0) {
                        $("#hfCENTRO_COSTOS").val("");
                        $("#hfCECC_CODE").val("");
                    }

                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectinput.val(v_value);
            }
        },
        error: function (msg) {
            alertCustom('Error al intentar obtener centro de costos.');
        }
    });
};

function filltxtdescproducto(seriado) {

    Bloquear("detalle")
    $.ajax({
        type: "post",
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#slcEmpresa').val() + "&SCSL=" + $('#slcSucural').val() + "&SERIADO_IND=" + seriado,
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#slcEmpresa').val() + "&ALMC_CODE=" + $('#slcAlmacen').val() + "&SERIADO_IND=" + seriado,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("detalle")
            if (datos != null) {
                productos = datos;
                // UPDATER_DESC_PROD
                var input = $('#txtdesProducto');
                input.typeahead({
                    items: 50,
                    source: function (query, process) {
                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].DESC_ADM);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM +
                                '","CODIGO":"' + datos[i].CODIGO +
                                '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                '","MONEDA": "' + datos[i].MONEDA +
                                '","UNIDAD":"' + datos[i].UNIDAD +
                                '","NO_SERIADA":"' + datos[i].NO_SERIADA +
                                '","SERIADO":"' + datos[i].SERIADA +
                                '","PRECIO_IND":"' + datos[i].PRECIO_IND +
                                '","CTLG":"' + datos[i].CTLG +
                                '","STOCK_REAL":"' + datos[i].STOCK_REAL +
                                '","STOCK_TOTAL":"' + datos[i].STOCK_TOTAL +
                                '","ALMACENABLE_IND":"' + datos[i].ALMACENABLE_IND + //DPORTA
                                '","DETRACCION":"' + datos[i].DETRACCION + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";

                        var json = $.parseJSON(obj);
                        $.each(json, function (i, objeto) {
                            map[objeto.DESC_ADM] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {

                        //if ($("#hfPIDM").val() != "") {

                            $("#hfCOD_PROD").val(map[item].CODIGO);
                            $("#hfProdSeriado").val(map[item].SERIADO);
                        
                            $("#txtcodProducto").val(map[item].CODIGO_ANTIGUO);
                            $("#txt_desc_producto").val(map[item].DESC_ADM);

                            $("#cbo_und_medida").select2("destroy");
                            $("#cbo_und_medida").val(map[item].UNIDAD);
                            $("#cbo_und_medida").select2();
                            $("#txtcanProducto").val("");
                            $("#txtcanProducto").focus();
                            //$("#txtstkProducto").val(map[item].STOCK_REAL);
                            if (map[item].ALMACENABLE_IND == "N") {
                                $("#txtstkProducto").val("SERVICIO");
                                $("#txtstkProducto").attr("disabled", "disabled");
                            } else {
                                $("#txtstkProducto").val(map[item].STOCK_REAL);
                                $("#txtstkProducto").attr("disabled", "disabled");
                            }
                            prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPidmCliente").val());
                            ActualizarCamposPrecios();
                            //---
                            if ($("#hfProdSeriado").val() == "S") {
                                CamposProductosSeriados();
                            } else {
                                $("#div_vie_camp_seriados").slideUp();
                                $("#txtcanProducto").removeAttr("disabled");
                            }
                        //---                  
                            //var precios = ObtenerPrecioProducto(map[item].CODIGO, $('#slcEmpresa').val(), $("#slcSucural").val(), map[item].PRECIO_IND);
                            

                            Desbloquear("detalle");
                            return item;

                    },
                });
                input.keyup(function (e) {
                    $(this).siblings("ul").css("min-width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        $('#txtcodProducto, #txtdesProducto').val('');
                        $("#cbo_und_medida").select2('destroy');
                        $("#cbo_und_medida").val('');
                        $("#cbo_und_medida").select2();
                        $("#txtpreProducto").val("0.00");

                        $("#hfCOD_PROD").val("");
                        prodActual = {};
                    }
                });

                var input = $('#txtcodProducto');
                input.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].CODIGO_ANTIGUO);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM +
                                '","CODIGO":"' + datos[i].CODIGO +
                                '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                '","MONEDA": "' + datos[i].MONEDA +
                                '","UNIDAD":"' + datos[i].UNIDAD +
                                '","NO_SERIADA":"' + datos[i].NO_SERIADA +
                                '","SERIADO":"' + datos[i].SERIADA +
                                '","PRECIO_IND":"' + datos[i].PRECIO_IND +
                                '","CTLG":"' + datos[i].CTLG +
                                '","STOCK_REAL":"' + datos[i].STOCK_REAL +
                                '","STOCK_TOTAL":"' + datos[i].STOCK_TOTAL +
                                '","ALMACENABLE_IND":"' + datos[i].ALMACENABLE_IND + //DPORTA
                                '","DETRACCION":"' + datos[i].DETRACCION + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.CODIGO_ANTIGUO] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        Bloquear("detalle");

                            $("#hfCOD_PROD").val(map[item].CODIGO);
                            $("#hfProdSeriado").val(map[item].SERIADO);

                            $("#txtcodProducto").val($("#hfCOD_PROD").val());
                            $("#txtdesProducto").val(map[item].DESC_ADM);
                            $('#cbo_und_medida').select2('destroy');
                            $("#cbo_und_medida").val(map[item].UNIDAD);
                            $("#cbo_und_medida").select2();
                            $("#txtcanProducto").val("");
                            $("#txtcanProducto").focus();
                            //$("#txtstkProducto").val(map[item].STOCK_REAL);
                            if (map[item].ALMACENABLE_IND == "N") {
                                $("#txtstkProducto").val("SERVICIO");
                                $("#txtstkProducto").attr("disabled", "disabled");
                            } else {
                                $("#txtstkProducto").val(map[item].STOCK_REAL);
                                $("#txtstkProducto").attr("disabled", "disabled");
                            }
                            prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPidmCliente").val());
                            ActualizarCamposPrecios();
                            //---
                            if ($("#hfProdSeriado").val() == "S") {
                                CamposProductosSeriados();
                            } else {
                                $("#div_vie_camp_seriados").slideUp();
                                $("#txtcanProducto").removeAttr("disabled");
                            }
                            Desbloquear("detalle");
                            return item;
                        
                    },
                });
                input.keyup(function () {
                    $(this).siblings("ul").css("min-width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        $('#txtcodProducto, #txtdesProducto').val('');
                        $("#cbo_und_medida").select2('destroy');
                        $("#cbo_und_medida").val('');
                        $("#cbo_und_medida").select2();
                        $("#txtpreProducto").val("0.00");

                        $("#hfCOD_PROD").val("");
                        prodActual = {};
                    }
                });
            }
        },
        error: function (msg) {
            Desbloquear("detalle")
            alertCustom("Productos no se listaron correctamente");
        }
    });
}
//DPORTA
function filltxtdescproducto2(seriado) {
    $("#input_desc_prod").html("<input id='txtdesProducto' class='span12 m-wrap' type='text' placeholder='Ingrese descripción de Producto' />");
    Bloquear("input_desc_prod");
    //Bloquear("detalle")
    $.ajax({
        type: "post",
        //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#slcEmpresa').val() + "&SCSL=" + $('#slcSucural').val() + "&SERIADO_IND=" + seriado,
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#slcEmpresa').val() + "&ALMC_CODE=" + $('#slcAlmacen').val() + "&SERIADO_IND=" + seriado,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            Desbloquear("input_desc_prod");
            if (datos != null) {
                productos = datos;
                // UPDATER_DESC_PROD
                var input = $('#txtdesProducto');
                input.typeahead({
                    items: 50,
                    source: function (query, process) {
                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].DESC_ADM);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM +
                                '","CODIGO":"' + datos[i].CODIGO +
                                '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                '","MONEDA": "' + datos[i].MONEDA +
                                '","UNIDAD":"' + datos[i].UNIDAD +
                                '","NO_SERIADA":"' + datos[i].NO_SERIADA +
                                '","SERIADO":"' + datos[i].SERIADA +
                                '","PRECIO_IND":"' + datos[i].PRECIO_IND +
                                '","CTLG":"' + datos[i].CTLG +
                                '","STOCK_REAL":"' + datos[i].STOCK_REAL +
                                '","STOCK_TOTAL":"' + datos[i].STOCK_TOTAL +
                                '","ALMACENABLE_IND":"' + datos[i].ALMACENABLE_IND + //DPORTA
                                '","DETRACCION":"' + datos[i].DETRACCION + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";

                        var json = $.parseJSON(obj);
                        $.each(json, function (i, objeto) {
                            map[objeto.DESC_ADM] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {

                        //if ($("#hfPIDM").val() != "") {

                        $("#hfCOD_PROD").val(map[item].CODIGO);
                        $("#hfProdSeriado").val(map[item].SERIADO);

                        $("#txtcodProducto").val(map[item].CODIGO_ANTIGUO);
                        $("#txt_desc_producto").val(map[item].DESC_ADM);

                        $("#cbo_und_medida").select2("destroy");
                        $("#cbo_und_medida").val(map[item].UNIDAD);
                        $("#cbo_und_medida").select2();
                        $("#txtcanProducto").val("");
                        $("#txtcanProducto").focus();
                        //$("#txtstkProducto").val(map[item].STOCK_REAL);
                        if (map[item].ALMACENABLE_IND == "N") {
                            $("#txtstkProducto").val("SERVICIO");
                            $("#txtstkProducto").attr("disabled", "disabled");
                        } else {
                            $("#txtstkProducto").val(map[item].STOCK_REAL);
                            $("#txtstkProducto").attr("disabled", "disabled");
                        }
                        prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPidmCliente").val());
                        ActualizarCamposPrecios();
                        //---
                        if ($("#hfProdSeriado").val() == "S") {
                            CamposProductosSeriados();
                        } else {
                            $("#div_vie_camp_seriados").slideUp();
                            $("#txtcanProducto").removeAttr("disabled");
                        }
                        //---                  
                        //var precios = ObtenerPrecioProducto(map[item].CODIGO, $('#slcEmpresa').val(), $("#slcSucural").val(), map[item].PRECIO_IND);


                        Desbloquear("input_desc_prod");
                        return item;

                    },
                });
                input.keyup(function (e) {
                    $(this).siblings("ul").css("min-width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        $('#txtcodProducto, #txtdesProducto').val('');
                        $("#cbo_und_medida").select2('destroy');
                        $("#cbo_und_medida").val('');
                        $("#cbo_und_medida").select2();
                        $("#txtpreProducto").val("0.00");

                        $("#hfCOD_PROD").val("");
                        prodActual = {};
                    }
                });

                var input = $('#txtcodProducto');
                input.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].CODIGO_ANTIGUO);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM +
                                '","CODIGO":"' + datos[i].CODIGO +
                                '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                '","MONEDA": "' + datos[i].MONEDA +
                                '","UNIDAD":"' + datos[i].UNIDAD +
                                '","NO_SERIADA":"' + datos[i].NO_SERIADA +
                                '","SERIADO":"' + datos[i].SERIADA +
                                '","PRECIO_IND":"' + datos[i].PRECIO_IND +
                                '","CTLG":"' + datos[i].CTLG +
                                '","STOCK_REAL":"' + datos[i].STOCK_REAL +
                                '","STOCK_TOTAL":"' + datos[i].STOCK_TOTAL +
                                '","ALMACENABLE_IND":"' + datos[i].ALMACENABLE_IND + //DPORTA
                                '","DETRACCION":"' + datos[i].DETRACCION + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.CODIGO_ANTIGUO] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        Bloquear("input_desc_prod");

                        $("#hfCOD_PROD").val(map[item].CODIGO);
                        $("#hfProdSeriado").val(map[item].SERIADO);

                        $("#txtcodProducto").val($("#hfCOD_PROD").val());
                        $("#txtdesProducto").val(map[item].DESC_ADM);
                        $('#cbo_und_medida').select2('destroy');
                        $("#cbo_und_medida").val(map[item].UNIDAD);
                        $("#cbo_und_medida").select2();
                        $("#txtcanProducto").val("");
                        $("#txtcanProducto").focus();
                        //$("#txtstkProducto").val(map[item].STOCK_REAL);
                        if (map[item].ALMACENABLE_IND == "N") {
                            $("#txtstkProducto").val("SERVICIO");
                            $("#txtstkProducto").attr("disabled", "disabled");
                        } else {
                            $("#txtstkProducto").val(map[item].STOCK_REAL);
                            $("#txtstkProducto").attr("disabled", "disabled");
                        }
                        prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPidmCliente").val());
                        ActualizarCamposPrecios();
                        //---
                        if ($("#hfProdSeriado").val() == "S") {
                            CamposProductosSeriados();
                        } else {
                            $("#div_vie_camp_seriados").slideUp();
                            $("#txtcanProducto").removeAttr("disabled");
                        }
                        Desbloquear("input_desc_prod");
                        return item;

                    },
                });
                input.keyup(function () {
                    $(this).siblings("ul").css("min-width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        $('#txtcodProducto, #txtdesProducto').val('');
                        $("#cbo_und_medida").select2('destroy');
                        $("#cbo_und_medida").val('');
                        $("#cbo_und_medida").select2();
                        $("#txtpreProducto").val("0.00");

                        $("#hfCOD_PROD").val("");
                        prodActual = {};
                    }
                });
            }
        },
        error: function (msg) {
            Desbloquear("input_desc_prod")
            alertCustom("Productos no se listaron correctamente");
        }
    });
}


//Obtiene todos los datos de producto, precios, descuento por cliente. Devuelve un json con formato de detalle de venta
function ObtenerProductoCompleto(codeProd, cliePidm) {

    var productoJSON = [];
    var descuentoCliente = 0;
    // OBTENER DESCUENTO
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=6&PROD_CODE=" + codeProd + "&CODIGO_CATEGORIA=" + $("#hfCateCode").val() + "&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL=" + $("#slcSucural").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos.length != 0) {
                descuentoCliente = (datos[0].DESCUENTO == "") ? 0 : parseFloat(datos[0].DESCUENTO);
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente descuento por Categoría de cliente.");
        }
    });
    //DATOS PRODUCTO E INICIALIZACION DE CAMPOS PARA DETALLE DE VENTA
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_DET" +
            "&PROD_CODE=" + codeProd +
            "&CTLG=" + $("#slcEmpresa").val() +
            "&ALMC_CODE=" + $('#hfAlmacen').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos.length != 0) {

                var prod = "";
                prod = '{';
                prod += '"ITEM":"",';
                prod += '"CTLG":"' + datos[0].CTLG + '",';
                prod += '"CODIGO":"' + datos[0].CODIGO + '",';
                prod += '"PROD_CODE_ANTIGUO":"' + datos[0].CODIGO_ANTIGUO + '",';
                prod += '"MONEDA":"' + datos[0].MONEDA + '",';
                prod += '"PROD_NOMBRE":"' + datos[0].DESC_ADM + '",';
                prod += '"PROD_NOMBRE_COMERCIAL":"' + datos[0].NOMBRE_COMERCIAL + '",';
                prod += '"GLOSA":"",';
                prod += '"CANTIDAD":"",';
                prod += '"CODE_UNIDAD":"' + datos[0].UNIDAD + '",';
                prod += '"DESC_UNIDAD":"",';
                prod += '"NOMBRE_IMPRESION":"' + datos[0].NOMBRE_COMERCIAL + '",';

                prod += '"PU":"0",';
                prod += '"TOTAL_BRUTO":"0",';
                prod += '"DESCUENTO":"' + descuentoCliente + '",';
                prod += '"MONTO_DESCUENTO":"0",';
                prod += '"TOTAL_NETO":"0",';
                prod += '"MONTO_DETRAC":"0",';
                prod += '"MONTO_ISC":"0",';

                //Indicadores/valores otros de producto
                prod += '"SERIADO":"' + datos[0].SERIADA + '",';
                prod += '"CODIGO_SERIADO":"' + datos[0].CODIGO_SERIADO + '",';
                prod += '"CODIGO_BARRAS":"' + datos[0].CODIGO_BARRAS + '",';
                prod += '"PRECIO_IND":"' + datos[0].PRECIO_IND + '",'; //Cantidad - Estandar

                prod += ObtenerPreciosProductoJSON(datos[0].CODIGO, datos[0].PRECIO_IND, datos[0].TIPO_BIEN, datos[0].CTLG, $("#slcSucural").val(), "STR");

                prod += '"PRECIO_DETALLE":"0",'; //E Y C
                prod += '"DETRACCION":"' + datos[0].DETRACCION_DECIMALES + '",';
                prod += '"DETRACCION_PORCENTAJE":"' + datos[0].DETRACCION + '",';
                prod += '"TIPO_BIEN":"' + datos[0].TIPO_BIEN + '",';
                prod += '"ISC":"' + datos[0].ISC + '",';
                //MONTOS CONVERT
                prod += '"CONVERT_ISC":"0",';
                prod += '"CONVERT_MONTO_DETRAC":"0",';
                prod += '"CONVERT_PRECIO_DETALLE":"0",';
                prod += '"CONVERT_MONTO_DESCUENTO":"0",';
                prod += '"CONVERT_TOTAL_BRUTO":"0",';
                prod += '"CONVERT_TOTAL_NETO":"0",';
                //PENDIENTES
                prod += '"CTAS_CODE":"",';
                prod += '"CECO_CODE":"",';
                prod += '"ALMACENABLE":"' + datos[0].ALMACENABLE_IND + '",';
                prod += '"TIPO_PROD":"",';
                prod += '"STOCK_REAL":"' + datos[0].STOCK_REAL + '",';
                prod += '"CODE_DCTO_ORIGEN":""';
                prod += '}';
                productoJSON = JSON.parse(prod);
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente datos de producto.");
        }
    });
    return productoJSON;
}

//Retorna fragmento de texto para JSON con los precios del producto
//EJM: 'PRECIO_VENTA":"0","PRECIO_MINIMO":"0","RANGOS_PRECIO":[{"RANGO":"100.00","PRECIO":"3.37"}],'
function ObtenerPreciosProductoJSON(codeProd, precioInd, tipoBien, ctlg, scsl, tipoRetorno) {
    var prod = "";
    var pv = "";
    var pm = "";
    var r;
    //PRECIO PARA SUCURSALES EXONERADAS
    if ($("#cbo_Sucursal :selected").attr("data-exonerado") == "SI") {

        $("#chk_inc_igv").attr("disabled", "disabled").prop('checked', false).parent().removeClass('checked');
        var igv = parseFloat($("#hfIMPUESTO").val()) / 100;
        var precios = ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd);

        if (tipoBien == "EXO" || tipoBien == "INA") {
            //NO SE DESCUENTA IGV DE LOS PRECIOS PARA PRODUCTOS EXONERADOS E INAFECTOS
            if (precios.length > 0) {
                if (precioInd == "E") {//Precio estandar 
                    prod += '"PRECIO_VENTA":"' + (precios[0].PRECIO_VENTA).replace(",", ".") + '",';//E
                    prod += '"PRECIO_MINIMO":"' + (precios[0].PRECIO_MINIMO).replace(",", ".") + '",';//E
                    prod += '"RANGOS_PRECIO":[] ,'; //C

                    pv = (precios[0].PRECIO_VENTA).replace(",", ".");
                    pm = (precios[0].PRECIO_MINIMO).replace(",", ".");
                    r = [];
                }
                else {//Precio por cantidad 
                    prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                    prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                    prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C

                    pv = "0";
                    pm = "0";
                    r = precios;
                }
            } else {

                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
                prod += '"RANGOS_PRECIO":[],'; //C

                pv = "0";
                pm = "0";
                r = [];
            }
        }
        else {
            //DESCONTAR IGV DE PRODUCTOS GRAVADOS
            if (precios.length > 0) {
                if (precioInd == "E") {//Precio estandar 
                    var pVenta = parseFloat(precios[0].PRECIO_VENTA) / (igv + 1);
                    var pMinimo = parseFloat(precios[0].PRECIO_MINIMO) / (igv + 1);
                    prod += '"PRECIO_VENTA":"' + (pVenta.toFixed(2)).replace(",", ".") + '",';//E
                    prod += '"PRECIO_MINIMO":"' + (pMinimo.toFixed(2)).replace(",", ".") + '",';//E
                    prod += '"RANGOS_PRECIO":[] ,'; //C

                    pv = (pVenta.toFixed(2)).replace(",", ".");
                    pm = (pMinimo.toFixed(2)).replace(",", ".");
                    r = [];
                }
                else {//Precio por cantidad 
                    var pPrecio;
                    for (var i = 0; i < precios.length; i++) {
                        pPrecio = parseFloat(precios[i].PRECIO) / (igv + 1);
                        precios[i].PRECIO = pPrecio.toFixed(2);
                    }
                    prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                    prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                    prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C

                    pv = "0";
                    pm = "0";
                    r = precios;
                }
            } else {

                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
                prod += '"RANGOS_PRECIO":[],'; //C  

                pv = "0";
                pm = "0";
                r = [];
            }
        }

    } else {
        //PRECIO PARA SUCURSALES NO EXONERADAS
        $("#chk_inc_igv").removeAttr("disabled").prop('checked', true).parent().addClass('checked');
        var precios = ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd, $("#hfPIDM").val());

        if (precios.length > 0) {
            if (precioInd == "E") {//Precio estandar 
                prod += '"PRECIO_VENTA":"' + (precios[0].PRECIO_VENTA).replace(",", ".") + '",';//E
                prod += '"PRECIO_MINIMO":"' + (precios[0].PRECIO_MINIMO).replace(",", ".") + '",';//E
                prod += '"RANGOS_PRECIO":[] ,'; //C

                pv = (precios[0].PRECIO_VENTA).replace(",", ".");
                pm = (precios[0].PRECIO_MINIMO).replace(",", ".");
                r = [];

            } else if (precioInd == "C") {//Precio por cantidad 
                prod += '"PRECIO_VENTA":"' + "0" + '",';//E
                prod += '"PRECIO_MINIMO":"' + "0" + '",';//E  
                prod += '"RANGOS_PRECIO":' + JSON.stringify(precios) + ','; //C

                pv = "0";
                pm = "0";
                r = precios;
            } else {
                prod += '"PRECIO_VENTA":"' + (precios[0].PRECIO_VENTA).replace(",", ".") + '",';//L
                prod += '"PRECIO_MINIMO":"' + (precios[0].PRECIO_MINIMO).replace(",", ".") + '",';//L
                prod += '"RANGOS_PRECIO":[] ,'; //C

                pv = (precios[0].PRECIO_VENTA).replace(",", ".");
                pm = (precios[0].PRECIO_MINIMO).replace(",", ".");
                r = [];
            }
        } else {
            prod += '"PRECIO_VENTA":"' + "0" + '",';//E
            prod += '"PRECIO_MINIMO":"' + "0" + '",';//E                    
            prod += '"RANGOS_PRECIO":[],'; //C

            pv = "0";
            pm = "0";
            r = [];
        }
    }
    if (tipoRetorno == "PV") {//PRECIO_VENTA - STRING
        return pv;
    } else if (tipoRetorno == "PM") {//PRECIO MINIMO - STRING
        return pm;
    } else if (tipoRetorno == "R") {//RANDO DE PRECIO - ARREGLO
        return r;
    } else {//TODO CONCATENADO PARA JSON
        return prod;
    }
}

//Obtiene precio del producto
function ObtenerPrecioProducto(codeProd, ctlg, scsl, precioInd, pidmCliente) {
    var precios;
    if (precioInd != "L") {
        pidmCliente = "";
    }
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=4&PROD_CODE=" + codeProd + "&CTLG=" + ctlg +
            "&PRECIO_IND=" + precioInd +
            "&SCSL=" + scsl +
            "&ALMC_CODE=" + $('#hfAlmacen').val() +
            "&PIDM=" + pidmCliente,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            precios = datos;
        },
        error: function (msg) {
            alertCustom("Precio de producto no se obtuvo correctamente");
        }
    });
    return precios;
}

//Actualiza campos para precios 
function ActualizarCamposPrecios() {
    if (prodActual != null && prodActual.length != 0) {
        $("#divPrecioUnitario").html("");
        //La moneda de venta coincide con la moneda del producto
        if (prodActual.MONEDA == "0002") {//MONEDA DE SOLES SIEMPRE SE FACTURA EN SOLES PARA SOPORTE
            if (prodActual.PRECIO_IND == "E") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12 m-wrap" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioEstandar(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            }
            else if (prodActual.PRECIO_IND == "C") {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12 m-wrap" type="text" disabled="disabled" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            } else {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12 m-wrap" type="text" value="' + prodActual.PRECIO_VENTA + '" onkeyup="return ValidaPrecioCliente(\'' + prodActual.PRECIO_VENTA + '\',\'' + prodActual.PRECIO_MINIMO + '\')"  onkeypress="return ValidaDecimales(event,this,5)" />')
                $("#txtPrecioUnitInicio").val(prodActual.PRECIO_VENTA);
            }
        } else {
            var valorCambio = parseFloat($("#txt_valor_cambio").val());
            if (prodActual.PRECIO_IND == "E") {
                var precioVenta, precioMinimo;
                //La moneda de venta no coincide con la moneda del producto                                          
                if (prodActual.MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                    //Si es igual a la moneda base: Convierte a MOAL
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) / valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) / valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12 m-wrap" type="text" value="' + precioVenta.toFixed(2) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,3)" />')
                } else {
                    //Si es igual a la moneda alterna: Convierte a MOBA
                    precioVenta = parseFloat(prodActual.PRECIO_VENTA) * valorCambio;
                    precioMinimo = parseFloat(prodActual.PRECIO_MINIMO) * valorCambio;
                    $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12 m-wrap" type="text" value="' + precioVenta.toFixed(2) + '" onkeyup="return ValidaPrecioEstandar(\'' + precioVenta + '\',\'' + precioMinimo + '\')"  onkeypress="return ValidaDecimales(event,this,3)" />')
                }
            }
            else {
                $("#divPrecioUnitario").append('<input id="txtPrecioUnitario" class="span12 m-wrap" type="text" disabled="disabled" />')
            }
        }
    }
}

function ValidaPrecioEstandar(venta, min) {
    if (min == "") {
        min = "0";
    } else {
        var c = $("#txtPrecioUnitario").val();
        if ((c.indexOf(".")) > 0) {
            var nroDecimales = c.substring(c.indexOf(".") + 1, c.length).length;
            if (nroDecimales == 3) {
                $("#txtPrecioUnitario").val(c.substring(0, c.length - 1));
            }
        }
    }
    $("#txtPrecioUnitario").on("blur", function () {
        if (parseFloat($("#txtPrecioUnitario").val()) < parseFloat(min)) {
            infoCustom2("El valor ingresado no puede ser menor al precio mínimo: " + parseFloat(min).toFixed(2))
            $("#txtPrecioUnitario").val(parseFloat(min).toFixed(2));
        }
    });
    $('#txt_cantidad').keyup();
}

//Mostrar/Ocultar campos productos seriados. Valida si el producto es seriado y si chkDespachoVenta esta seleccionado (SIN USO)
function CamposProductosSeriados() {

    $("#cbo_correlativo").change();

    if ($("#hfCOD_PROD").val() != "" && $("#hfProdSeriado").val() == "S") {
        if (prodActual.STOCK_REAL[0] > 0) {
            $("#div_vie_camp_seriados").slideDown();
        }

        //$("#div_vie_camp_seriados").attr("style", "display:block");

        $("#txtcanProducto").val("1").attr("disabled", "disabled");
        //Precios para producto Seriado
        if (prodActual != null) {
            if (parseFloat($("#txtstkProducto").val()) <= 0) {
                $("#cboBuscar").attr("disabled", "disabled");
                $("#txtserieProducto").attr("disabled", "disabled");
            } else {
                $("#cboBuscar").removeAttr("disabled");
                $("#txtserieProducto").removeAttr("disabled");
            }

            if (prodActual.PRECIO_IND == "C") {    //Obtener precio para cantidad de acuerdo a los Items Seleccionados de la Lista

                $("#txtcanProducto").val("1");
                ValidaPrecioCantidad();
            }
            else {//Precio estandar

                //TODO
            }
        }

    }
    else {
        $("#div_vie_camp_seriados").attr("style", "display:none");
        $("#txtcanProducto").removeAttr("disabled");
    }

    //if ($("#hfCOD_PROD").val() != "" && $("#hfProdSeriado").val() == "S") {
    //    $("#div_vie_camp_seriados").attr("style", "display:block");
    //    $("#txtcanProducto").val("1").attr("disabled", "disabled");
    //    //Precios para producto Seriado
    //    if (prodActual != null) {
    //        if (prodActual.PRECIO_IND == "C") {    //Obtener precio para cantidad de acuerdo a los Items Seleccionados de la Lista

    //            $("#txt_cantidad").val("1");
    //            ValidaPrecioCantidad();
    //        }
    //    }
    //    $("#txtserieProducto").focus();
    //}
    //else {
    //    $("#div_vie_camp_seriados").attr("style", "display:none");
    //    $("#txtcanProducto").removeAttr("disabled");
    //}
}

//Obtiene el precio cantidad para el producto seleccionado
function ValidaPrecioCantidad() {

    if (prodActual != null && prodActual.length != 0 && $("#txtcanProducto").val() != "") {
        if (prodActual.PRECIO_IND == "C") {


            if (typeof prodActual.RANGOS_PRECIO != "undefined" && prodActual.RANGOS_PRECIO.length > 0) {

                if (prodActual.MONEDA == "0002") {//Moneda soles
                    //Moneda de producto coincide con la de cbo_moneda
                    var pLength = prodActual.RANGOS_PRECIO.length;
                    for (var i = pLength - 1 ; i >= 0 ; i--) {
                        if (parseFloat($("#txtcanProducto").val()) >= prodActual.RANGOS_PRECIO[i].RANGO) {
                            $("#txtPrecioUnitario").val(prodActual.RANGOS_PRECIO[i].PRECIO)
                            break;
                        }
                    }

                    if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txtcanProducto").val()) < prodActual.RANGOS_PRECIO[0].RANGO) {
                        $("#txtPrecioUnitario").val(prodActual.RANGOS_PRECIO[0].PRECIO)
                    }

                }
                else {
                    //Moneda de producto no coincide con la de cbo_moneda
                    var valorCambio = parseFloat($("#hfValorCambio").val());
                    var precio;
                    if (prodActual.MONEDA == $("#cbo_moneda [data-tipo='MOBA']").val()) {
                        //Si es moneda base: convertir a MOAL
                        var pLength = prodActual.RANGOS_PRECIO.length;
                        for (var i = pLength - 1 ; i >= 0; i--) {

                            if (parseFloat($("#txt_cantidad").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {

                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) / valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(2));
                                break;
                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txtcanProducto").val()) < prodActual.RANGOS_PRECIO[0].RANGO) {

                            precio = parseFloat(prodActual.RANGOS_PRECIO[0].PRECIO) / valorCambio;
                            $("#txtPrecioUnitario").val(precio.toFixed(2));

                        }
                    }
                    else {
                        //Si es moneda alterna: convertir a MOBA
                        var pLength = prodActual.RANGOS_PRECIO.length;
                        for (var i = pLength - 1; i >= 0; i--) {

                            if (parseFloat($("#txtcanProducto").val()) >= parseFloat(prodActual.RANGOS_PRECIO[i].RANGO)) {

                                precio = parseFloat(prodActual.RANGOS_PRECIO[i].PRECIO) * valorCambio;
                                $("#txtPrecioUnitario").val(precio.toFixed(2));
                                break;

                            }
                        }

                        if ($("#txtPrecioUnitario").val() == "" || parseFloat($("#txtcanProducto").val()) < prodActual.RANGOS_PRECIO[0].RANGO) {

                            precio = parseFloat(prodActual.RANGOS_PRECIO[0].PRECIO) * valorCambio;
                            $("#txtPrecioUnitario").val(precio.toFixed(2));

                        }

                    }

                }


            } else {
                $("#txtpreProducto").val("0.00")
            }
        }
    }
}

//Agregar Detalle
var detallesVenta = [];
function AgregarDetalleVenta() {

        var codeProd = $("#hfCOD_PROD").val();//no varia, es único  
        var codeProdAntiguo = $("#txtcodProducto").val();
        var nomProdVenta = $("#txtdesProducto").val();
        var cantidad = $("#txtcanProducto").val();
        var unidadMedidaCode = $("#cbo_und_medida :selected").val();
        var unidadMedida = $("#cbo_und_medida :selected").html();
        var precioUnidad = $("#txtPrecioUnitario").val();
        var glosa = $.trim($("#txtdesProducto").val());

        //var prod;
        var objProd = prodActual; //Json Producto

        var totalBruto = cantidad * precioUnidad;
        var totalNeto = totalBruto;
        //Validaciones iniciales
        var continuar = false;
        if (vErrors(["txtcodProducto", "txtcanProducto", "cbo_und_medida"])) {

            if (typeof prodActual.CODIGO != undefined) {
                if (parseFloat($("#txtPrecioUnitario").val()) == 0) {
                    alertCustom("No puede agregar un producto con precio 0.")
                }
                else if (parseFloat($("#txtcanProducto").val()) == 0) {
                    alertCustom("La cantidad debe ser mayor a 0.")
                }
                else {
                    continuar = true
                }
            } else {
                alertCustom("Debe seleccionar un producto.")
            }
        }

        if (isNaN($("#txtcanProducto").val()) || isNaN($("#txtPrecioUnitario").val())) {
            continuar = false;
            alertCustom("Los valores ingresados no son válidos. Intente nuevamente.")
            LimpiarCamposDetalle();
        }
        //Fin validaciones
        var continuar2;
        if (continuar) {

            if (objProd != null && typeof objProd != "undefined") {

                    if ($("#hfProdSeriado").val() == "S") {

                        var cantSeriados;

                        if ($("#cboBuscar").val() != null) {
                            cantSeriados = $("#cboBuscar").val().length;
                            var codigos = [];
                            var series = [];
                            codigos = $("#cboBuscar").val().toString().split(",");
                            series = ObtenerSeries().split(",");
                            var objAux;
                            
                            var totalBruto = cantidad * precioUnidad;
                            var totalNeto = totalBruto;

                            var nro_productos_seriados = codigos.length;
                            //if ((current_filas_total + nro_productos_seriados) > current_nro_lineas) {
                            //    nro_productos_seriados = nro_items_permitidos;
                            //    if (nro_productos_seriados > 0) {
                            //        message_nro_lineas = "Sólo fueron agregados " + nro_productos_seriados + " productos seriados según el tipo de documento seleccionado";
                            //    } else {
                            //        message_nro_lineas = "No se agregó el producto según el tipo de documento seleccionado";
                            //    }

                            //}

                            for (var i = 0; i < nro_productos_seriados; i++) {

                                var indice = -1;
                                for (var h = 0; h < detallesVenta.length; h++) {
                                    if (detallesVenta[h].CODIGO_BARRAS == series[i]) {
                                        indice = h;
                                    }
                                }
                                if (indice == -1) {
                                    var item = detallesVenta.length + 1;
                                    objProd.ITEM = item;
                                    objProd.DESC_UNIDAD = unidadMedida;
                                    objProd.GLOSA = glosa;
                                    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + series[i];
                                    objProd.CODIGO = codigos[i]; //codeProd;
                                    objProd.CODIGO_BARRAS = series[i];
                                    objProd.MONTO_DESCUENTO = 0;
                                    objProd.CANTIDAD = cantidad;
                                    objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                                    objProd.PU = precioUnidad;
                                    objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                                    objProd.TOTAL_NETO = totalNeto.toFixed(2);

                                    //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                                    $("#div_vie_camp_seriados").attr("style", "display:none;");
                                    objAux = jQuery.parseJSON(JSON.stringify(objProd));
                                    detallesVenta.push(objAux);
                                    
                                    //Bloquear edicion
                                    $("#cbo_und_medida").attr("disabled", "disabled");
                                    LimpiarCamposDetalle();
                                    ListarTablaDetalles(ObtenerTablaDetalles());
                                }
                                else {
                                    $("#div_vie_camp_seriados").slideUp();
                                    alertCustom("La producto con serie " + series[i] + " ya ha sido ingresado.")
                                }
                            }

                            //if (codigos.length > 0) {

                            //    var item = detallesVenta.length + 1;
                            //    objProd.ITEM = item;
                            //    objProd.DESC_UNIDAD = unidadMedida;
                            //    objProd.GLOSA = glosa;
                            //    objProd.NOMBRE_IMPRESION = nomProdVenta + " - " + series;
                            //    objProd.CODIGO = codeProd;
                            //    objProd.CODIGO_BARRAS = series;
                            //    objProd.MONTO_DESCUENTO = 0;
                            //    objProd.CANTIDAD = cantidad;
                            //    objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                            //    objProd.PU = precioUnidad;
                            //    objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            //    objProd.TOTAL_NETO = totalNeto.toFixed(2);

                            //    //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                            //    $("#div_vie_camp_seriados").attr("style", "display:none;");
                            //    objAux = jQuery.parseJSON(JSON.stringify(objProd));
                            //    detallesVenta.push(objAux);
                            //}

                            ////Bloquear edicion
                            //$("#cbo_und_medida").attr("disabled", "disabled");

                            //LimpiarCamposDetalle();
                            //ListarTablaDetalles(ObtenerTablaDetalles());

                        } else {
                            //cantSeriados = 0;
                            //if ($("#txtstkProducto").val() == '' || $("#txtstkProducto").val() == '0') {
                            //    alertCustom("El producto seleccionado no cuenta con stock.");
                            //} else {
                            //    alertCustom("Debe seleccionar al menos 1 producto de la lista detallada.");
                            //}
                            var item = detallesVenta.length + 1;
                            objProd.ITEM = item;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.GLOSA = glosa;
                            objProd.NOMBRE_IMPRESION = nomProdVenta; //nomProdVenta + " - " + series[i];
                            objProd.CODIGO = codeProd; //codigos[i];
                            objProd.CODIGO_BARRAS = ""; //series[i];
                            objProd.MONTO_DESCUENTO = 0;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = precioUnidad;
                            objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            objProd.TOTAL_NETO = totalNeto.toFixed(2);

                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)
                            $("#div_vie_camp_seriados").attr("style", "display:none;");
                            objAux = jQuery.parseJSON(JSON.stringify(objProd));
                            detallesVenta.push(objAux);

                            //Bloquear edicion
                            $("#cbo_und_medida").attr("disabled", "disabled");
                            LimpiarCamposDetalle();
                            ListarTablaDetalles(ObtenerTablaDetalles());
                            
                        }

                    } else {
                        if (ValidarProductoAgregado(objProd) < 0) {
                            var item = detallesVenta.length + 1;
                            objProd.ITEM = item;
                            objProd.DESC_UNIDAD = unidadMedida;
                            objProd.GLOSA = glosa;
                            objProd.NOMBRE_IMPRESION = nomProdVenta;
                            objProd.MONTO_DESCUENTO = 0;
                            objProd.CANTIDAD = cantidad;
                            objProd.PRECIO_DETALLE = precioUnidad; //El precio está en la misma moneda que  cbo_moneda
                            objProd.PU = precioUnidad;
                            objProd.TOTAL_BRUTO = totalBruto.toFixed(2);
                            objProd.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                            //Calculos validados para empresa NO EXONERADA (los precios incluyen IGV)

                            detallesVenta.push(objProd);

                            //Bloquear edicion
                            
                            $("#cbo_uni_medida").attr("disabled", "disabled");
                            
                            LimpiarCamposDetalle();
                            ListarTablaDetalles(ObtenerTablaDetalles());
                        }
                        else { alertCustom("El producto ya ha sido agregado."); }
                    }

            } else { alertCustom("Error al obtener datos completos de producto."); }

            CalcularDatosMonetarios();
        }
}

function ObtenerSeries() {
    var optns = $("#cboBuscar option");
    var nroSeries = "";
    var nroSelec = 0;
    var c = 0;
    $(optns).each(function (e, f) {
        if ($(f).is(":selected")) {
            nroSelec++;
        }
    });
    $(optns).each(function (e, f) {
        if ($(f).is(":selected")) {
            if (c == nroSelec - 1) {
                nroSeries += $(optns[e]).html();
            } else {
                nroSeries += $(optns[e]).html() + ",";
            }
            c++;
        }
    });

    return nroSeries;
}

//Limpiar campos para llenar nuevo producto
function LimpiarCamposDetalle() {
    $("#txtcodProducto").focus();

    $('#txtcodProducto, #txtdesProducto').val('');
    $("#cbo_und_medida").select2('destroy');
    $("#cbo_und_medida").val('');
    $("#cbo_und_medida").select2();

    $("#txtcanProducto").val('');
    $("#txtPrecioUnitario").val('');
    $("#txtstkProducto").val('');

    $("#txtserieProducto").val();

    $("#hfCOD_PROD").val('');
    prodActual = {};
}

//Calcula el total del detalle
function CalcularDatosMonetarios() {
    //$(".simboloMoneda").html($("#cbo_moneda :selected").attr("simbolo"));

    if ($("#hfCompletoInd").val() == "N") {

        var total_detalles = 0;

        if (true) {
            //INICIO RECORRIDO DETALLES
            for (var i = 0; i < detallesVenta.length; i++) {
                //Se obtiene el total de los detalles
                total_detalles += parseFloat(detallesVenta[i].TOTAL_BRUTO);
            }
            //FIN RECORRIDO DETALLES

            $("#txtTotal").val(total_detalles.toFixed(2));

        }
    }
}

//Listar Tabla Detalles
function ListarTablaDetalles(datos) {
    $('#div_tabla_det').html(datos);

    $('#tabla_det').dataTable({
        "info": false,
        "scrollX": true,
        "ordering": false,
        "aLengthMenu": 10,
        "iDisplayLength": 10,
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla.",
            "sZeroRecords": "No hay datos disponibles en la tabla."
        }
    });

    $("#tabla_det tr").click(function () {
        item = $(this).attr('id');
    });
    $('#tabla_det_wrapper :first').remove();
    
}

//Genera el HTML de la tabla detale
function ObtenerTablaDetalles() {
    var res = "";
    res = '<table id="tabla_det" class="display DTTT_selectable" border="0">'
    res += '<thead>'

    res += '<tr align="center">'
    res += '<th>#</th>'
    res += '<th>ITEM</th>'
    res += '<th>CODIGO</th>'
    res += '<th>DESCRIPCIÓN</th>'
    res += '<th>UM.</th>'
    res += '<th>SERIE</th>'
    res += '<th>CANTIDAD</th>'
    res += '<th>PREC. UNIT.</th>'
    res += '<th>TOTAL</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";

    for (var i = 0; i < detallesVenta.length; i++) {

        res += '<tr id="' + detallesVenta[i].ITEM + '">'

        res += '<td align="center"><a href="javascript:Delete(\'' + detallesVenta[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        
        res += '<td align="center">' + detallesVenta[i].ITEM + '</td>'

        res += '<td class="producto" align="center">' + detallesVenta[i].PROD_CODE_ANTIGUO + '</td>'

        res += '<td class="descripcion" >' + detallesVenta[i].NOMBRE_IMPRESION + '</td>'

        res += '<td align="center">' + detallesVenta[i].DESC_UNIDAD + '</td>'

        res += '<td align="center">' + detallesVenta[i].CODIGO_BARRAS + '</td>'

        res += '<td align="center">' + detallesVenta[i].CANTIDAD + '</td>'

        res += '<td class="precio' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].PRECIO_DETALLE + '</td>'

        res += '<td class="bruto' + detallesVenta[i].ITEM + '" align="center">' + detallesVenta[i].TOTAL_BRUTO + '</td>'

        res += '</tr>'
    }

    res += '</tbody>'
    res += '</table>'
    return res;
}

//Quitar un detalled de la tabla detalle
function Delete(item) {
    if ($("#hfCompletoInd").val() == "S") {
        alertCustom("No puede eliminar un detalle de un documento ya 'Completado'")
    } else {
        var detallesNuevo = [];
        for (var i = 0; i < detallesVenta.length; i++) {
            if (detallesVenta[i].ITEM == item) {
                detallesVenta.splice(i, 1);
            }
        }
        for (var i = 0; i < detallesVenta.length; i++) {
            detallesVenta[i].ITEM = i + 1;
            detallesNuevo.push(detallesVenta[i]);
        }

        detallesVenta.splice(0, detallesVenta.length);
        detallesVenta = detallesNuevo;
        var datos = ObtenerTablaDetalles();


        $("#div_tabla_det").attr("style", "display:block");
        $('#div_tabla_det').html(datos);

        $('#tabla_det').dataTable({
            "info": false,
            "scrollX": true,
            "ordering": false,
            "aLengthMenu": 10,
            "iDisplayLength": 10,
            "oLanguage": {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            }
        })

        $("#tabla_det tr").click(function () {
            item = $(this).attr('id');
        });
        $('#tabla_det_wrapper :first').remove()

        if (detallesVenta.length == 0) {
            LimpiarCamposDetalle();
        }

        CalcularDatosMonetarios();
        $("#txtTotal").val();
    }
}

//Validar producto agregado
function ValidarProductoAgregado(obj) {
    for (var i = 0; i < detallesVenta.length; i++) {
        if (detallesVenta[i].CODIGO == obj.CODIGO) {
            return i;
        }
    }
    return -1;
}

//ValidarBotones
function ValidarBotones() {
    var sit = $("#hfSituacion").val();

    if (sit == '0001') {//Inicia Reparacion
        $("#btnInicioR").removeClass('disabled');
        $("#btnInicioR").attr('href', 'javascript:IniciarReparacion();');
        $("#btnCierreR").addClass('disabled');
        $("#btnCierreR").removeAttr('href');
        $("#btnPaseP").addClass('disabled');
        $("#btnPaseP").removeAttr('href');
        $("#btnEntregaE").addClass('disabled');
        $("#btnEntregaE").removeAttr('href');

        $("#btnInicioR").pulsate();
        $("#btnCierreR").pulsate("destroy");
        $("#btnPaseP").pulsate("destroy");
        $("#btnEntregaE").pulsate("destroy");

        $("#titulo_info").text('Inicio Reparación');
        $("#cuerpo_info").text('Cuando se inicie la reparación se realizará la separación de los productos que se van a usar para iniciar el proceso reparación en soporte!!!');
        
    } else if (sit == '0002') {
        $("#btnInicioR").addClass('disabled');
        $("#btnInicioR").removeAttr('href');
        $("#btnCierreR").removeClass('disabled');
        $("#btnCierreR").attr('href', 'javascript:PasarPago();');
        $("#btnPaseP").addClass('disabled');
        $("#btnPaseP").removeAttr('href');
        $("#btnEntregaE").addClass('disabled');
        $("#btnEntregaE").removeAttr('href');

        $("#btnInicioR").pulsate("destroy");
        $("#btnCierreR").pulsate();
        $("#btnPaseP").pulsate("destroy");
        $("#btnEntregaE").pulsate("destroy");

        $("#titulo_info").text('Cierre Reparación');
        $("#cuerpo_info").text('Cuando se finalice la reparación del producto, la atención estará lista para pasar a caja y cancelar por el serivicio y los productos!!!');
        $('#btns_Productos').hide();
    //} else if (sit == '0004') { //} else if (sit == '0003') {
    //    $("#btnInicioR").addClass('disabled');
    //    $("#btnInicioR").removeAttr('href');
    //    $("#btnCierreR").addClass('disabled');
    //    $("#btnCierreR").removeAttr('href');
    //    $("#btnPaseP").removeClass('disabled');
    //    $("#btnPaseP").attr('href', 'javascript:PasarPago();');
    //    $("#btnEntregaE").addClass('disabled');
    //    $("#btnEntregaE").removeAttr('href');
        

    //    $("#btnInicioR").pulsate("destroy");
    //    $("#btnCierreR").pulsate("destroy");
    //    $("#btnPaseP").pulsate();
    //    $("#btnEntregaE").pulsate("destroy");

    //    $("#titulo_info").text('Pasar a Pago')
    //    $("#cuerpo_info").text('Cuando se haga el pase a pago se genera una deuda pendiente en caja por el servicio de reparación!!!');
        
    //} else if (sit == '0004') {
    //    $("#btnInicioR").addClass('disabled');
    //    $("#btnInicioR").removeAttr('href');
    //    $("#btnCierreR").addClass('disabled');
    //    $("#btnCierreR").removeAttr('href');
    //    $("#btnPaseP").addClass('disabled');
    //    $("#btnPaseP").removeAttr('href');
    //    $("#btnEntregaE").removeClass('disabled');
    //    $("#btnEntregaE").attr('href', 'javascript:EntregarEquipo();');
        
    //    $("#btnInicioR").pulsate("destroy");
    //    $("#btnCierreR").pulsate("destroy");
    //    $("#btnPaseP").pulsate("destroy");
    //    $("#btnEntregaE").pulsate();

    //    $("#titulo_info").text('Entrega de Equipo')
    //    $("#cuerpo_info").text('El equipo es entregado al cliente o autorizado!!!');

    } else if (sit == '0005') {
        $("#btnInicioR").addClass('disabled');
        $("#btnInicioR").removeAttr('href');
        $("#btnCierreR").addClass('disabled');
        $("#btnCierreR").removeAttr('href');
        $("#btnPaseP").addClass('disabled');
        $("#btnPaseP").removeAttr('href');
        $("#btnEntregaE").addClass('disabled');
        $("#btnEntregaE").removeAttr('href');

        $("#btnInicioR").pulsate("destroy");
        $("#btnCierreR").pulsate("destroy");
        $("#btnPaseP").pulsate("destroy");
        $("#btnEntregaE").pulsate("destroy");

        $("#titulo_info").text('Proceso Finalizado')
        $("#cuerpo_info").text('La orden seleccionada ya ha sido finalizada!!!');
        //DPORTA
        $('#btnMail').removeAttr("disabled");
        $('#btnMail').removeClass("disabled");
    } else { //Bloquear Todos
        $("#btnInicioR").addClass('disabled');
        $("#btnInicioR").removeAttr('href');
        $("#btnCierreR").addClass('disabled');
        $("#btnCierreR").removeAttr('href');
        $("#btnPaseP").addClass('disabled');
        $("#btnPaseP").removeAttr('href');
        $("#btnEntregaE").addClass('disabled');
        $("#btnEntregaE").removeAttr('href');

        $("#btnInicioR").pulsate("destroy");
        $("#btnCierreR").pulsate("destroy");
        $("#btnPaseP").pulsate("destroy");
        $("#btnEntregaE").pulsate("destroy");

    }
}

//Boton Cancelar
function BotonCancelar() {
    location.href = '?f=NFLRECE';
}

//Obtener cadena detalle
function ObtenerDetalle() {
    var detalles = '';
    for (var i = 0; i < detallesVenta.length; i++) {
        detalles += ValidaCaracter(detallesVenta[i].ITEM) + ";" +
        detallesVenta[i].CODIGO + ";" +
        detallesVenta[i].CANTIDAD + ";" +
        detallesVenta[i].CODIGO_BARRAS + ";" +
        detallesVenta[i].PU + ";" +
        detallesVenta[i].TOTAL_BRUTO + ";" +
        ValidaCaracter(detallesVenta[i].NOMBRE_IMPRESION) + ";" +
        detallesVenta[i].CODE_UNIDAD +
        "|";
    }
    return detalles;
}

//Valida que el texto no contenga ";" o "|" en los detalles de venta
function ValidaCaracter(texto) {
    while (texto.toString().indexOf(";") != -1) {
        texto = texto.replace(";", ",");
    }
    while (texto.toString().indexOf("|") != -1) {
        texto = texto.replace("|", " ");
    }
    while (texto.toString().indexOf('"') != -1) {
        texto = texto.replace('"', " ");
    }
    return texto;
}

//Grabar Reparacion y Realiza una salida de almacen con los productos indicados (Inicio Reparacion)
function IniciarReparacion() {
    if (vErrors(["txtfechaentrega", "txthoraentrega", "cboentrega", "txtdiagnostico", "txtrecomendacion", "txtdiagnostica", "txtestado", "txtCentroCostos"])) {

        var opcion, fecha_entrega, hora_entrega, lugar_entrega, rece_code, diag_code,
            diagnostico, recomendacion, pidm_tecnico, estado, situacion, cecc_code,
            cecd_code, detalles, usua_id, ctlg_code, scsl_code, almc_code, code_prod,
            estado,usua_id,serie;

        opcion = '1';

        fecha_entrega = $('#txtfechaentrega').val();
        hora_entrega = $('#txthoraentrega').val();
        lugar_entrega = $("#cboentrega").val();
        rece_code = $("#txtnroatencion").val();
        diag_code = $("#txtnrodiagnostico").val();
        diagnostico = $("#txtdiagnostico").val();
        recomendacion = $("#txtrecomendacion").val();
        pidm_tecnico = $("#hfDiagnostica").val(); //$("#txtdiagnostica").attr('valor');
        cecc_code = $("#hfCECC_CODE").val();
        cecd_code = $("#hfCENTRO_COSTOS").val();
        detalles = ObtenerDetalle();
        ctlg_code = $('#slcEmpresa').val();
        scsl_code = $('#slcSucural').val();
        almc_code = $('#hfAlmacen').val();
        code_prod = $('#hfProducto').val();
        serie = $('#txtserie').val();
        estado = $('#txtestado').val();
        usua_id = $('#ctl00_lblusuario').text();
        
        var data = new FormData();

        data.append('OPCION', opcion);
        data.append('FEC_ENTREGA', fecha_entrega);
        data.append('HORA_ENTREGA', hora_entrega);
        data.append('RECE_CODE', rece_code);
        data.append('DIAG_CODE', diag_code);
        data.append('LUGAR', lugar_entrega);
        data.append('DIAGNOSTICO', diagnostico);
        data.append('RECOMENDACION', recomendacion);
        data.append('PIDM_TECNICO', pidm_tecnico);
        data.append('CECC_CODE', cecc_code);
        data.append('CECD_CODE', cecd_code);
        data.append('DETALLES', detalles);
        data.append('USUA_ID', usua_id);
        data.append('CTLG_CODE', ctlg_code);
        data.append('SCSL_CODE', scsl_code);
        data.append('ALMC_CODE', almc_code);
        data.append('CODE_PROD', code_prod);
        data.append('SERIE', serie);
        data.append('ESTADO', estado);
        
        Bloquear("ventana");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMREPA.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            var datos = $.parseJSON(res);
            
            if (datos[0].RESPUESTA == "SERIE") {
                alertCustom("El número de serie indicado ya existe!");
            } else if (datos[0].RESPUESTA == "OK") {
                $('#hfCodeRepa').val(datos[0].CODE);
                $("#txtnroreparacion").val(datos[0].CODE);
                $('#hfCompletoInd').val('S');
                $('#hfSituacion').val('0002');
                exito();
                $('#tabla_det').DataTable().columns(0).visible(false);
                $('#botones_accion').hide();
                ValidarBotones();
            } else {
                alertCustom(datos[0].RESPUESTA.toString);
            }
            Desbloquear("ventana");
        })
        .error(function () {
            alertCustom('Ocurrio un error al Grabar Diagnóstico');
        });
    }
}

//Cambia el estado de la Reparacion
function CerrarReparacion() {
    Bloquear('ventana');
    $.ajax({
        type: "POST",
        url: "vistas/nf/ajax/nfmrepa.ASHX?OPCION=4&RECE_CODE=" + $("#hfCodeRepa").val() + "&USUA_ID=" + $("#ctl00_txtus").val(),
        success: function (datos) {
            if (datos == 'OK') {
                exito();
                $("#hfSituacion").val('0004');
                ValidarBotones();
            }
            Desbloquear('ventana');
        },
        error: function (msg) {
            alertCustom(msg);
            Desbloquear('ventana');
        }
    });
}

//function EntregarEquipo() {
//    Bloquear('ventana');
//    $.ajax({
//        type: "POST",
//        url: "vistas/nf/ajax/nfmrepa.ASHX?OPCION=6&RECE_CODE=" + $("#hfCodeRepa").val() + "&USUA_ID=" + $("#ctl00_txtus").val(),
//        success: function (datos) {
//            if (datos == 'OK') {
//                exito();
//                $("#hfSituacion").val('0005');
//                ValidarBotones();
//            }
//            Desbloquear('ventana');
//        },
//        error: function (msg) {
//            alertCustom(msg);
//            Desbloquear('ventana');
//        }
//    });
//}

//Realiza un ingreso de almacen y genera una venta sin completar
function PasarPago() {
    if (vErrors(["txtnroatencion", "txtnrodiagnostico", "txtnroreparacion"])) {

        var opcion, dcto_cliente, monto, code_prod, repa_code, ctlg_code, scsl_code, pidm_cliente, pidm_tecnico,
            rece_code, diag_coe, cecc_code, cecd_code, almc_code, serie, estado, usua_id, fecha_dia;

        opcion = '5';
        dcto_cliente = $("#hfDctoCliente").val();
        monto = $("#txtTotal").val();
        code_prod = $('#hfProducto').val();
        repa_code = $('#txtnroreparacion').val();
        ctlg_code = $('#slcEmpresa').val();
        scsl_code = $('#slcSucural').val();
        pidm_cliente = $("#hfPidmCliente").val();
        pidm_tecnico = $("#hfDiagnostica").val();
        rece_code = $("#txtnroatencion").val();
        diag_code = $("#txtnrodiagnostico").val();
        cecc_code = $("#hfCECC_CODE").val();
        cecd_code = $("#hfCENTRO_COSTOS").val();
        almc_code = $('#hfAlmacen').val();
        serie = $('#txtserie').val();
        usua_id = $('#ctl00_lblusuario').text();
        fecha_dia = $('#txt_fec_dia').val();

        var data = new FormData();

        data.append('OPCION', opcion);
        data.append('DCTO_CLIENTE', dcto_cliente);
        data.append('MONTO', monto);
        data.append('CODE_PROD', code_prod);
        data.append('REPA_CODE', repa_code);
        data.append('RECE_CODE', rece_code);
        data.append('DIAG_CODE', diag_code);
        data.append('PIDM_TECNICO', pidm_tecnico);
        data.append('PIDM_CLIENTE', pidm_cliente);
        data.append('CECC_CODE', cecc_code);
        data.append('CECD_CODE', cecd_code);
        data.append('USUA_ID', usua_id);
        data.append('CTLG_CODE', ctlg_code);
        data.append('SCSL_CODE', scsl_code);
        data.append('ALMC_CODE', almc_code);
        
        data.append('SERIE', serie);
        data.append('FECHA_DIA', fecha_dia);

        Bloquear("ventana");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMREPA.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            
            if (res == "OK") {
                exito();
                $('#hfSituacion').val('0005');
                ValidarBotones();
            }else{
                alertCustom("Ocurrio un error al registrar la reparacion para pago.");
            }
            Desbloquear("ventana");
        })
        .error(function () {
            alertCustom('Ocurrio un error al registrar el pago.');
        });
    }
}

var NFMREPA = function ()
    {
        var fillcboUniMedida = function () {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=3",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#cbo_und_medida').empty();
                    $('#cbo_und_medida').append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbo_und_medida').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cbo_und_medida').select2('val', "");
                },
                error: function (msg) {
                    alertCustom("Unidades de Medida no se listaron correctamente.");
                }
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
                    $('#slcEmpresa').empty();
                    $('#slcEmpresa').append('<option></option>');
                    if (datos != null) {

                        for (var i = 0; i < datos.length; i++) {

                            $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

        var eventoControles = function () {

            $('#txtdiagnostico, #txtrecomendacion').bind('keypress', function (e) {
                var code = e.keyCode || e.which;
                if (code == 13) { //Enter keycode
                    return false;
                }
            });

            $("#btnActualizarCentroCostos").on("click", function () { //DPORTA
                $("#txtCentroCostos").val("");
                $("#hfCENTRO_COSTOS").val("");
                $("#hfCECC_CODE").val("");
                autocompletarCentroCostos('#txtCentroCostos', '');
            });

            $("#btnActualizarProductos").on("click", function () { //DPORTA
                $("#txtcodProducto").val("");
                $("#txtdesProducto").val("");
                $("#txtcanProducto,#txtcanProducto,#cbo_und_medida,#txtPrecioUnitario,#txtstkProducto").val("");
                filltxtdescproducto2('');
            });


            $('#btnMail').click(function (e) {
                e.preventDefault();

                if ($('#btnMail').attr('disabled') != 'disabled') {

                    var usuario = $.trim($('#ctl00_lblusuario').html())
                    var datosUsuario = devuelveDatosUsuario(usuario)

                    $('#txtAsunto').val('REPARACIÓN DE PRODUCTO EN SOPORTE : ' + $('#txtnroatencion').val());
                    $('#lblAsunto').text('REPARACIÓN DE PRODUCTO EN SOPORTE : ' + $('#txtnroatencion').val());
                    $('#lblEmpresa').text($('#slcEmpresa :selected').html());
                    $('#lblFRecepcion').text($("#txtfecharecepcion").val());
                    $('#lblFDiagnostico').text($("#txtfechadiagnostico").val());
                    $("#lblFEntrega").text($("#txtfechaentrega").val() + ' ' + $("#txthoraentrega").val());
                    $("#lblCliente").text($("#txtcliente").val());
                    $("#lblAutorizado").text($("#txtautorizado").val());
                    $("#lblProducto").text($("#txtproducto").val() + " - Serie: " + $("#txtserie").val());
                    $("#lblDiagnostico").text($("#txtdiagnostico").val());
                    $("#lblRecomendacion").text($("#txtrecomendacion").val());
                    $("#lblTecnico").text($("#txtdiagnostica").val());
                    $("#lblEstado").text($("#txtestado").val());
                    $("#lblSituacion").text($("#titulo_info").text());
                    var htmltabla = '<table class="table table-bordered">' + $("#tabla_det tbody").html().toString() + '<tr><td colspan="6"></td><td><h6><b>TOTAL</b></h6></td><td><h6><b>' + $("#txtTotal").val() + '</b></h6></td><tr></table>';
                    $("#datos_tabla").html(htmltabla);

                    $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                    cargarCorreos();
                    $('#divMail').modal('show');
                }

            });

            $('#slcEmpresa').on('change', function () {
                ListarSucursales($('#slcEmpresa').val());
            });

            $("#cbo_correlativo").on('change', function () {

                if ($("#cbo_correlativo").val() == 'L') {    //Insert por lista detallada

                    $("#hfTIPO_INSERT").val("LISTA");
                    $("#div_txt_serie_sec").css("display", "none");
                    $("#div_correlativos").attr("class", "span8");
                    $("#div_correlativos").html('<select id="cboBuscar" class="span12" multiple></select>');

                    $("#txtserieProducto").val("");
                    $('#cboBuscar').select2();

                    //Listar productos seriados para el producto elegido
                    var prodCode = $("#hfCOD_PROD").val();
                    $.ajax({
                        type: "post",
                        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD20&CTLG=" + $('#slcEmpresa').val() + "&ALMC_CODE=" + $('#slcAlmacen').val() + "&SERIADO_IND=S" + "&PROD_CODE=" + prodCode,
                        //url: "vistas/na/ajax/NAMINSA.ashx?OPCION=LPSER&CODE_PROD=" + prodCode + "&CTLG_CODE=" + $('#cbo_Empresa').val() + "&COD_ALMC=" + $('#cboAlmacen').val(),
                        contenttype: "application/json;",
                        datatype: "json",
                        async: false,
                        success: function (datos) {
                            var obj = '';
                            if (datos != null) {
                                for (var i = 0; i < datos.length; i++) {
                                    $('#cboBuscar').append('<option value="' + datos[i].CODIGO_SERIADO + '">' + datos[i].CODIGO_BARRAS + '</option>');
                                }
                            }
                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    });

                    $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");
                    $('#cboBuscar').on('change', function () {
                        $('#txtserieProducto').val($(this).val());
                        //TODO        

                    });

                }
            });

            //$('#slcAlmacen').on('change', function () {
            //    cargarConceptos();
            //});
        }

    var cargarCorreos = function () {
        var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
        $.ajax({
            type: 'post',
            url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
            async: false
        }).done(function (data) {
            data = JSON.parse(data);
            for (var u in data) {
                if (data[u].usuario === $('#ctl00_txtus').val()) {
                    $('#txtRemitente').val(data[u].email);
                    break;
                }
            }
            $('#cboCorreos').selectize({
                persist: false,
                maxItems: null,
                valueField: 'email',
                labelField: 'name',
                searchField: ['name', 'email'],
                options: data,
                render: {
                    item: function (item, escape) {
                        return '<div>' +
                            (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                            (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                            '</div>';
                    },
                    option: function (item, escape) {
                        var label = item.name || item.email;
                        var caption = item.name ? item.email : null;
                        return '<div style="padding: 2px">' +
                            '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                            (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                            '</div>';
                    }
                },
                createFilter: function (input) {
                    var match, regex;
                    // email@address.com
                    regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[0]);
                    // name <email@address.com>
                    regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[2]);
                    return false;
                },
                create: function (input) {
                    if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                        return { email: input };
                    }
                    var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                    if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                    alert('Invalid email address.');
                    return false;
                }
            });
            $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
            $('.selectize-dropdown').css('margin-left', '0px');
        });
    };


        function ListarSucursales(ctlg) {
            var USUA_ID = $("#ctl00_txtus").val();
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LSU&CTLG_CODE=" + ctlg + "&USUA_ID=" + USUA_ID,
                //url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#slcSucural').empty();
                    $('#slcSucural').append('<option></option>');
                    if (datos != null) {

                        for (var i = 0; i < datos.length; i++) {

                            $('#slcSucural').append('<option value="' + datos[i].CODIGO + '" data-almc="' + datos[i].ALMC_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }

                    $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    $("#slcSucural").change();

                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

        var fillCboAlmacen = function () {
            $.ajax({
                type: "post",
                url: "vistas/nf/ajax/nfmdiag.ashx?OPCION=7&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $('#slcSucural').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#slcAlmacen').empty();
                    $('#slcAlmacen').append('<option></option>');
                    if (datos != null) {

                        for (var i = 0; i < datos.length; i++) {

                            $('#slcAlmacen').append('<option value="' + datos[i].CODE + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }

                    $('#slcAlmacen').select2('val', $('#ctl00_hddestablecimiento').val());
                    //$("#slcAlmacen").change();
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
        }

        var plugins = function () {
            $('.fecha').datepicker();
            $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
            $('.fecha').datepicker("setDate", "now");
            $('.combo').select2();
            $('#txt_fec_dia').datepicker();
            $('#txt_fec_dia').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
            $('#txt_fec_dia').datepicker("setDate", "now"); //20/02
        }

        function VerificarDatosReparacion(cod) {
            $.ajax({
                type: "POST",
                url: "vistas/nf/ajax/nfmrepa.ASHX?OPCION=2&RECE_CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    if (datos != null) {
                        $("#txtnroreparacion").val(datos[0].CODIGO);
                        $("#txtfechaentrega").val(datos[0].FECHA_ENTREGA);
                        $("#txthoraentrega").val(datos[0].HORA_ENTREGA);
                        $("#cboentrega").val(datos[0].LUGAR_ENTREGA);
                        $("#cboentrega").change();
                        $("#txtdiagnostico").val(datos[0].DIAGNOSTICO);
                        $("#txtrecomendacion").val(datos[0].RECOMENDACION);
                        $("#txtdiagnostica").val(datos[0].TECNICO);
                        $("#hfDiagnostica").val(datos[0].PIDM_TECNICO);
                        $("#txtestado").val(datos[0].ESTADO);
                        $("#txtCentroCostos").val(datos[0].CENTRO_COSTO);

                        $("#hfCECC_CODE").val(datos[0].CECC_CODE);
                        $("#hfCENTRO_COSTOS").val(datos[0].CECD_CODE);

                        $("#hfSituacion").val(datos[0].SITUACION);
                        $("#hfCompletoInd").val('S');
                        $("#hfCodeRepa").val(datos[0].CODIGO);

                        VerificarDetalleReparacion(datos[0].CODIGO);

                        $(".det_prod").hide();

                        ValidarBotones();

                        //Bloquea campos
                        $("#cboentrega").attr('disabled', 'disabled');
                        $("#txtdiagnostico").attr('disabled', 'disabled');
                        $("#txtrecomendacion").attr('disabled', 'disabled');
                        $("#txtdiagnostica").attr('disabled', 'disabled');
                        $("#txtestado").attr('disabled', 'disabled');
                        $("#txtCentroCostos").attr('disabled', 'disabled');

                        //$('#btnMail').removeAttr("disabled");
                        //$('#btnMail').removeClass("disabled");
                    }
                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alertCustom(msg);
                    Desbloquear('ventana');
                }
            });
        }

        function VerificarDetalleReparacion(cod) {
            $.ajax({
                type: "POST",
                url: "vistas/nf/ajax/nfmrepa.ASHX?OPCION=3&RECE_CODE=" + cod,
                success: function (datos) {
                    $("#div_tabla_det").html(datos);

                    $('#tabla_det').dataTable({
                        "info": false,
                        "scrollX": true,
                        "ordering": false,
                        "aLengthMenu": 10,
                        "iDisplayLength": 10,
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                    });

                    var suma = 0;
                    $(".bruto").each(function () {
                        suma += parseFloat($(this).text());
                    });

                    $("#txtTotal").val(suma.toFixed(2));
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
        }

        var cargaInicial = function () {
            var cod = ObtenerQueryString("code");
            $("#slcAlmacen").val($("#slcSucural option:selected").attr("data-almc"));
            $("#slcAlmacen").change();
            $('#cboentrega').select2('val', "LOCAL");
            //$("#txtCentroCostos").val(prmtCCST);
            if (cod != null) {
                Bloquear('ventana');
                $.ajax({
                    type: "POST",
                    url: "vistas/nf/ajax/nfmdiag.ASHX?OPCION=2&CODE_RECE=" + cod,
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (datos) {
                        $("#txtnrodiagnostico").val(datos[0].CODE);
                        $("#slcEmpresa").val(datos[0].CTLG_CODE);
                        $("#slcSucural").val(datos[0].SCSL_CODE);
                        $("#txtnroatencion").val(datos[0].RECE_CODE);
                        $("#txtfecharecepcion").val(datos[0].FECHA_RECEPCION + " " + datos[0].HORA_RECEPCION);
                        $("#txtfechadiagnostico").val(datos[0].FECHA_DIAGNOSTICO + " " + datos[0].HORA_DIAGNOSTICO);
                        $("#txtfechaentrega").val(datos[0].FECHA_ENTREGA);
                        $('#txthoraentrega').timepicker({
                            defaultTime: datos[0].HORA_ENTREGA,
                            minuteStep: 1
                        });
                        $('#txthoraentrega').val(datos[0].HORA_ENTREGA);
                        $('#hfAlmacen').val(datos[0].ALMC_CODE); 
                        $("#txtcliente").val(datos[0].CLIENTE);
                        $("#hfPidmCliente").val(datos[0].PIDM_CLIENTE);
                        $("#txtautorizado").val(datos[0].AUTORIZADO);
                        $("#txtruc").val(datos[0].RUC);
                        $("#txtdni").val(datos[0].DNI);
                        $("#hfProducto").val(datos[0].PROD_CODE);
                        $("#txtproducto").val(datos[0].PRODUCTO);
                        $("#txtserie").val(datos[0].SERIE);
                        $("#txtcodcotizacion").val(datos[0].CODE_COTIZACION);
                        $("#txtcotizacion").val(datos[0].MONTO_COTIZACION);

                        $("#txtdiagnostico").val(datos[0].DIAGNOSTICO);
                        $("#txtrecomendacion").val(datos[0].RECOMENDACION);
                        $("#txtdiagnostica").val(datos[0].TECNICO);
                        $("#hfDiagnostica").val(datos[0].PIDM_TECNICO);
                        $("#txtestado").val(datos[0].ESTADO);

                        $("#slcAlmacen").val(datos[0].ALMC_CODE);
                        $("#slcAlmacen").change();
                        $("#txtconcepto").val(datos[0].CONCEPTO);
                        $("#txtmonto").val(datos[0].MONTO_DIAGNOSTICO);
                        $("#hfAlmacen").val(datos[0].ALMC_CODE);

                        $("#hfDctoCliente").val(datos[0].DCTO_CLIENTE);
                        $("#hfCateCode").val(datos[0].CATE_CODE);
                        if (datos[0].DCTO_CLIENTE == '1') {
                            $("#lblruc").text("DNI");
                        } else {
                            $("#lblruc").text("RUC");
                        }

                        $("#txtfecharecepcion").attr("disabled", "disabled");
                        $("#txtfechaentrega").attr("disabled", "disabled");

                        $("#slcAlmacen").attr("disabled", "disabled");
                        $("#txtconcepto").attr("disabled", "disabled");
                        $("#txtmonto").attr("disabled", "disabled");

                        $("#hfSituacion").val('0001');

                        VerificarDatosReparacion(cod);

                        ValidarBotones();

                        Desbloquear('ventana');
                    },
                    error: function (msg) {
                        alertCustom(msg);
                        Desbloquear('ventana');
                    }
                });
            }

        }

        var tipoCambio = function () {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=0003&TIPO_CAMBIO=INTERNO",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {

                        $('#hfValorCambio').val(datos[0].VALOR_CAMBIO_VENTA);
                    } else {
                        $('#hfValorCambio').val("");
                    }
                },
                error: function (msg) {
                    alertCustom("Tipo de cambio Interno no se obtuvo correctamente.");
                }
            });
        }

        //Parte copiada de Selwyn GLMLETR (.)
        //                                 !
        function cargarJsonEmpleado(empresa) {
            $.ajax({
                type: "post",
                url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE-2&empresa=" + empresa,
                contenttype: "application/json;",
                datatype: "json",
                async: false,

                success: function (datos) {
                    if (datos != null && datos != "") {
                        jsonPersonasEmpleado = datos;
                    } else {
                        jsonPersonasEmpleado = "";
                    }
                }
            });
        }

        var cargarAutocompletarEmpleados = function () {

            $.ajaxSetup({ async: false });

            $.post("vistas/GL/ajax/GLMLETR.ASHX", { flag: 5 },
              function (res) {
                  if (res != null && res != "" && res.indexOf("error") < 0) {

                      cargarJsonEmpleado($("#ctl00_hddctlg").val());

                      arrayPersonasEmpleado = new Array();

                      var jsonEmpleado = jQuery.parseJSON(jsonPersonasEmpleado);
                      if (jsonEmpleado != null) {
                          jsonEmpleado.filter(function (e) { if (arrayPersonasEmpleado.indexOf(e.NOMBRE) < 0) { arrayPersonasEmpleado.push(e.NOMBRE); } });
                      }

                      $(".personasEmpleado").typeahead({ source: arrayPersonasEmpleado }, { highlight: true, hint: true });

                      $(".personasEmpleado").keyup(function () {
                          $(this).siblings("ul").css("width", $(this).css("width"))

                      }).change(function () {
                          var actual = $(this);
                          var encontrado = false;
                          if (jsonEmpleado != null) {
                              jsonEmpleado.filter(function (d) {
                                  if (d.NOMBRE == actual.val()) {
                                      actual.attr("valor", d.PIDM);
                                      encontrado = true;
                                  }
                                  if (!encontrado) {
                                      actual.removeAttr("valor");
                                  }
                              });
                          }
                          if (actual.val() == "") { actual.removeAttr("valor"); }
                      });
                  }
              });
        }

        return {
            init: function () {
                cargarParametrosSistema();
                plugins();
                fillCboEmpresa();
                eventoControles();
                $("#slcEmpresa").change();
                fillCboAlmacen();
                cargaInicial();
                filltxtdescproducto('');
                fillcboUniMedida();
                //autocompletarCentroCostos('#txtCentroCostos', '');
                cargarAutocompletarEmpleados();
                tipoCambio();
                ValidarBotones();
            }
        };
}();

//Imprimir dctu
function ImprimirDcto() {

    //Bloquear("ventana");
    var rece_code, ctlg_code;
    rece_code = $("#txtnroatencion").val();
    ctlg_code = $("#slcEmpresa").val();

    if (rece_code != "") {
        var data = new FormData();
        data.append('RECE_CODE', rece_code);
        data.append('CTLG_CODE', ctlg_code);
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nf/ajax/nfmrepa.ashx?OPCION=IMPR",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        })
            .success(function (datos) {
                if (datos != null) {
                    $("#divDctoImprimir").html(datos);
                    setTimeout(function () {
                        window.print();
                    }, 200)

                } else {
                    noexito();
                }
                //Desbloquear("ventana");
            })
            .error(function () {
                //Desbloquear("ventana");
                noexito();
            });
    }
}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();

        var data = new FormData();

        data.append('OPCION', 'SENDMAIL');
        data.append('NREMITENTE', $('#txtNRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $('#datos_correo').html());
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());
        data.append('REPA_CODE', $("#txtnroreparacion").val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMREPA.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (res) {
                exito();
                $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);
            })
            .error(function () {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            });
    }
};
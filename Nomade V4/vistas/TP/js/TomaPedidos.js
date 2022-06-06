var oPedidoActual = [];
var oItemActual = {};
var codVenta = '';
var banderaActualizar = false;


var tomaPedidos = function () {
    var objProd = {};
    var igv = 0;
    var baseImponible = 0;
    var isc = 0;
    var descuento = 0
    var opExonerada = 0;
    var opGravada = 0;
    var opGravadaSinIGV = 0;
    var opInafecta = 0;
    var igvCalc = 0;
    var importeTotal = 0;
    var importeCobrar = 0;
    var scslExonerado = "";

    var onloadEvent = function () {
        $("#btnMaxOk").click(function () {
            var el = document.documentElement,
                rfs = el.requestFullscreen
                    || el.webkitRequestFullScreen
                    || el.mozRequestFullScreen
                    || el.msRequestFullscreen
                ;

            rfs.call(el);
            setTimeout(function () { $("#divLoad").remove(); }, 200);
        });
    };

    var handleProductos = function () {

        $("#txtBusqProd").autocomplete({
            //appendTo: "#txtBusqProd",
            source: function (request, response) {
                $.ajax({
                    url: "ajax/TomaPedidos.ashx",
                    dataType: "json",
                    data: {
                        OPCION: 3,
                        sGrupo: ($('#cbo_grupos').val() == 'TODOS' ? "" : $('#cbo_grupos').val() || ""),
                        sSubGrupo: ($('#cbo_subgrupos').val() == 'TODOS' ? "" : $('#cbo_subgrupos').val() || ""),
                        term: request.term.split(' ').join('%')
                    },
                    success: function (data) {
                        response($.map(data, function (item) {                           
                            return {
                                label: item.DESC_ADM,                                
                                codigo: item.CODIGO,
                                json: item
                            }
                        }));
                    },
                });
            },
            minLength: 3,
            //autoFocus: true,
            select: function (event, ui) {
                fnCargaProducto(ui.item.json);
                //console.log(ui.item);
                //console.log("Selected: " + ui.item.codigo);
            }
        }).data("uiAutocomplete")._renderItem = function (ul, item) {
            return $("<li></li>").append("<a>" + item.label + " <span style='color:gray'>(" + item.codigo + ")</span> <span style='float:right;color:gray'>" + (item.json.STOCK_REAL > item.json.PARAM_STOCK ? ">" + item.json.PARAM_STOCK : item.json.STOCK_REAL) + "</span></a>").appendTo(ul);
        };
    };

    var ObtenerPrecioProducto = function (codeProd, precioInd) {
        var precios;
        var data = {
            "sProductoCode": codeProd,
            "cPrecioInd": precioInd
        };
        $.ajax({
            type: "post",
            url: "ajax/TomaPedidos.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            data: data,
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

    var fnCargaProducto = function (objProd) {
        $("#infoProducto").load('../../vistas/TP/recursos/html/VistaProducto.html', function (html) {
            $("#divCodigo").text(objProd.CODIGO_ANTIGUO);
            $("#divNombre").text(objProd.DESC_ADM);
            $("#divCosto").text(objProd.SMONEDA + objProd.COSTO_PRODUCTO);
            $("#txtUniMedida").val(objProd.DESC_UNIDAD);
            if (objProd.STOCK_REAL > objProd.PARAM_STOCK)
                $("#divStock").text(">" + objProd.PARAM_STOCK);
            else 
                $("#divStock").text(objProd.STOCK_REAL);
        });
        oItemActual = objProd;
        oItemActual.precios = ObtenerPrecioProducto(oItemActual.CODIGO, oItemActual.PRECIO_IND);

        console.log(objProd.precios);
        $('#txt_glosa_prod').val('');
        if (objProd.precios.length > 0) {
            $('#mensaje').hide();
            $("#txtPrecUnitario").val(formatoMiles(objProd.precios[0].PRECIO_VENTA));

            $("#txtCantidad").change();
            $("#infoProducto,.footer-prod").show();
        } else {
            
            $('#mensaje').show();
            $("#mensaje").html('El producto seleccionado no tiene precio de venta. ');
            $("#infoProducto,.footer-prod").hide();
        }

       
        
    };

    var crearTablaVaciaListado = function () {
        $("#tblPedidos").css({ "font-size": "12px" });
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('font-size', '15px')
                    }
                },
                {
                    data: "CLIENTE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                        $(td).css('font-size', '15px')
                    }
                },
                {
                    data: "MONTO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('font-size', '15px')
                    }
                },
                {
                    data: "ESTADO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                        $(td).css('font-size', '15px')
                    }
                },
                {
                    data: null, createdCell: function (td, cellData, rowData, row, col) {
                        if (rowData.ESTADO === "PENDIENTE")
                            $(td).html("<a class='btn blue' onclick=\"editarTomaPedido('" + rowData.CODIGO + "')\"><i class='icon-pencil'></i></a>")  
                        else 
                            $(td).html("")  

                        $(td).attr("align", "center");
                        $(td).css('font-size', '15px')
                    }

                }
            ],
            stateSave: false,
            order: [[0, "asc"]],
            paginate: false,
            info: false,
            scrollY: "50vh"

        }
        oTable_listado = $('#tblPedidos').dataTable(parms);

    };

    var crearTablaVaciaDetalle = function () {
        $("#tblDetallePedidos").css({ "font-size": "12px" });
        var parms = {
            data: null,
            columns: [                
                {
                    data: "CANTIDAD", createdCell: function (cell) {
                        $(cell).css('text-align', 'center');
                    }
                },
                {
                    data: "DESC_ADM", createdCell: function (cell) {
                        $(cell).css('text-align', 'left');
                    }
                },
                {
                    data: "DESP_ALMACEN", createdCell: function (td, cellData, rowData, row, col) {
                        if (rowData.DESP_ALMACEN == 'S') {
                            $(td).html("TIENDA");
                        } else {
                            $(td).html("ALMACEN");
                        }
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "PRECIO", type: "formatoMiles"
                },
                {
                    data: "PRECIO_TOTAL", type: "formatoMiles"
                },
                {
                    data: null, createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<i class='fa fa-times-circle removeItem' style='font-size: 4.5vh;color: red;'></i>");
                        $(td).css('text-align', 'center');
                    }

                }
            ],
            stateSave: false,
            order: [[1, "asc"]],
            paginate: false,
            info: false,
            searching: false,
            //scrollY: "50vh",
            footerCallback: function (row, data, start, end, display) {

                var api = this.api(), data;
                var n = 4;
                if (data.length == 0) {
                    $("#txtSubTotal").val(0);
                    $("#txtIgv").val(0);
                    $("#txtTotal").val(0);
                } else {
                    if (this.api().data().length > 0) {
                        // Total over all pages
                        total = api
                            .column(n)
                            .data()
                            .reduce(function (a, b) {
                                return parseFloat(a) + parseFloat(b);
                            });

                        // Update totales

                        $("#txtTotal").val(formatoMiles(total));
                        $("#txtSubTotal").val(formatoMiles(total / (1 + parseFloat(api.data()[0].IGV))))
                        $("#txtIgv").val(formatoMiles(total - (total / (1 + parseFloat(api.data()[0].IGV)))));

                    }
                }
            }
        }
        oTable_listado_pedidos = $('#tblDetallePedidos').dataTable(parms);

    };

    var eventoControles = function () {

        var fnEventosContFiltros = function () {

            $("#full_sreem").click(function () {
                var el = document.documentElement,
                    rfs = el.requestFullscreen
                        || el.webkitRequestFullScreen
                        || el.mozRequestFullScreen
                        || el.msRequestFullscreen
                    ;

                rfs.call(el);
                setTimeout(function () { $("#divLoad").remove(); }, 200);
            });

            // listado de productos a agregar
            $("#regresar_pedido").click(function () {
                $("#infoProducto,.footer-prod").hide();
                $("#txtBusqProd").val("");
                $("#cont_cabecera .adicionales").show();

                var filtro = ($('#cbo_subgrupos').val() == "TODOS" ? ($('#cbo_grupos').val() == "TODOS" ? "" : $('#cbo_grupos :selected').text()) : $('#cbo_subgrupos :selected').text()) + " ";

                $("#txtBusqProd").attr("placeholder", "Buscar " + filtro + "...");

                $("#cont_filtros").hide("slide", { direction: "right" }, 100);
                setTimeout(function () {
                    $("#cont_agregar_detalle").show("slide", { direction: "left" }, 400);
                }, 100);
                setTimeout(function () {
                    $("input[name='txtBusqProd']").focus()
                }, 300); 
            });


            $("#limpiar_producto").click(function () {

                $("#mensaje").hide();

                $("#infoProducto,.footer-prod").hide();
                $("#txtBusqProd").val("");
                $("#cont_cabecera .adicionales").show();

                var filtro = ($('#cbo_subgrupos').val() == "TODOS" ? ($('#cbo_grupos').val() == "TODOS" ? "" : $('#cbo_grupos :selected').text()) : $('#cbo_subgrupos :selected').text()) + " ";

                $("#txtBusqProd").attr("placeholder", "Buscar " + filtro + "...");

                $("#cont_filtros").hide("slide", { direction: "right" }, 100);
                setTimeout(function () {
                    $("#cont_agregar_detalle").show("slide", { direction: "left" }, 400);
                }, 100);
                setTimeout(function () {
                    $("input[name='txtBusqProd']").focus()
                }, 300);
            });


            $("#cerrar_sesion").click(function () {               
                window.location.href = "../../cerrar_sesion.aspx";
                //location.href("../../cerrar_sesion.aspx");
            });

            $('#cbo_grupos').on('change', function () {
                if ($('#cbo_grupos').val() == 'TODOS') {
                    var sGrupo = "";
                } else {
                    var sGrupo = $('#cbo_grupos').val();
                }

                $.ajax({
                    type: "POST",
                    url: "ajax/TomaPedidos.ashx?OPCION=2&sGrupo=" + sGrupo,
                    async: true,
                    success: function (datos) {
                        $('#cbo_subgrupos').empty();
                        $('#cbo_subgrupos').append('<option value="TODOS">TODOS</option>');
                        if (datos != null) {
                            for (var i = 0; i < datos.length; i++) {
                                $('#cbo_subgrupos').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                            }
                        }
                        $('#cbo_subgrupos').val('TODOS');
                    },
                    error: function (msg) {
                        alertCustom("Los Sub-Grupos no se listaron correctamente");
                    }
                });
            });

        }();

        var fnEventosContCabecera = function () {

            //detalle del pedido
            $("#detalle_pedido").click(function () {                
                if (oPedidoActual.length > 0) {
                    if (codVenta.length > 0) {
                        $('#grabar_pedido').attr("style", "display:none");
                        $('#modificar_pedido').attr("style", "display:inline");
                    } else {
                        $('#grabar_pedido').attr("style", "display:inline");
                        $('#modificar_pedido').attr("style", "display:none");
                    }

               
                    
                    $("#cont_cabecera .adicionales").hide();                
                    $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
                    $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                    $("#cont_listado").hide("slide", { direction: "left" }, 100);
                    $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                    setTimeout(function () {
                        $("#cont_det_pedido").show("slide", { direction: "right" }, 400);
                    }, 100);
                } else {                
                    setTimeout(function () {
                        $("input[name='txtBusqProd']").focus()
                    }, 300); 

                    $("#txtBusqProd").val("");  
                    $('#txtNombre').val('');
                    $('#grabar_pedido').attr("style", "display:inline");
                    $('#modificar_pedido').attr("style", "display:none");
                    $("#infoProducto,.footer-prod").hide();
                    $("#cont_cabecera .adicionales").show();
                    $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                    $("#cont_listado").hide("slide", { direction: "left" }, 100);
                    $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                    setTimeout(function () {
                        $("#cont_agregar_detalle").show("slide", { direction: "right" }, 400);
                    }, 100);
                }               
            });

            $("#aceptarExito").click(function () {
                $('#ModalExito').modal('hide');
            });

            $("#venta_completada").click(function () {
                $('#ModalAdvertencia2').modal('hide');
                limpiarPedido();
                codVenta = "";
                listadoVentasUsuario();
                $("#cont_cabecera .adicionales").hide();
                $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
                $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                setTimeout(function () {
                    $("#cont_listado").show("slide", { direction: "right" }, 400);
                }, 100);
            });
            

            //listado de pedidos por usuario
            $("#list_pedidos").click(function () {
                $("#regCompra").attr("disabled", false);
                if (oPedidoActual.length > 0) {
                    if (banderaActualizar == true) {
                        limpiarPedido();
                        codVenta = "";
                        listadoVentasUsuario();
                        $("#cont_cabecera .adicionales").hide();
                        $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                        $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
                        $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                        setTimeout(function () {
                            $("#cont_listado").show("slide", { direction: "right" }, 400);
                        }, 100);
                    } else {
                        if (codVenta.length > 0) {
                            $('#ModalAdvertencia').modal('show');
                            $("#tipOperacion").text('modificar');
                        } else {
                            $('#ModalAdvertencia').modal('show');
                            $("#tipOperacion").text('grabar');
                        }
                    }





                } else {
                    listadoVentasUsuario();
                    $("#cont_cabecera .adicionales").hide();
                    $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                    $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
                    $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                    setTimeout(function () {
                        $("#cont_listado").show("slide", { direction: "right" }, 400);
                    }, 100); 
                }                      
            });

            //listado de pedidos por usuario
            $("#noRegCompra").click(function () {
                $('#ModalAdvertencia').modal('hide');
                limpiarPedido();
                codVenta = "";
                listadoVentasUsuario();
                $("#cont_cabecera .adicionales").hide();
                $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
                $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                setTimeout(function () {
                    $("#cont_listado").show("slide", { direction: "right" }, 400);
                }, 100);                
            });

            //registro o modificacion de pedido
            $("#regCompra").click(function () {

                $("#regCompra").attr("disabled", true);

                $('#ModalAdvertencia').modal('hide');
                if (codVenta.length > 0) {
                    modificar();
                    $("#noRegCompra").click();
                } else {
                    grabar();
                    $("#noRegCompra").click();
                }                                         
            });
                                    
            // filtrar
            $("#add_filtro").click(function () {
                $("#cont_cabecera .adicionales").hide();

                $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);               
                $("#cont_listado").hide("slide", { direction: "left" }, 100);
                $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                setTimeout(function () {
                    $("#cont_filtros").show("slide", { direction: "right" }, 400);
                }, 100);
                
            });

        }();

        var fnEventosContDetPedido = function () {

            // listado de productos a agregar
            $("#regresar_venta").click(function () {

                console.log(codVenta);

                if (codVenta != '') {

                    var data = new FormData();
                    data.append('p_CODE_VTAC', codVenta);
                    data.append('p_TIPO', 'C');

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "ajax/TomaPedidos.ashx?OPCION=11",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false,
                        async: false,
                    })
                        .success(function (datos) {                           
                            if (datos != null) {
                                if (datos[0].COMPLETADO == 'S') {
                                    $('#ModalAdvertencia2').modal('show');
                                } else {
                                    $("#infoProducto,.footer-prod, #mensaje").hide();
                                    $("#txtBusqProd").val("");
                                    $("#cont_cabecera .adicionales").show();

                                    $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                                    $("#cont_listado").hide("slide", { direction: "left" }, 100);
                                    $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);

                                    setTimeout(function () {
                                        $("#cont_agregar_detalle").show("slide", { direction: "right" }, 400);
                                    }, 100);

                                    setTimeout(function () {
                                        $("input[name='txtBusqProd']").focus()
                                    }, 300); 
                                }


                            } else {
                                noexito();
                            }
                            Desbloquear("ventana");
                        })
                        .error(function () {
                            noexito();
                            Desbloquear("ventana");
                        });
                } else {
                    $("#infoProducto,.footer-prod, #mensaje").hide();
                    $("#txtBusqProd").val("");
                    $("#cont_cabecera .adicionales").show();

                    $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                    $("#cont_listado").hide("slide", { direction: "left" }, 100);
                    $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);

                    setTimeout(function () {
                        $("#cont_agregar_detalle").show("slide", { direction: "right" }, 400);
                    }, 100);

                    setTimeout(function () {
                        $("input[name='txtBusqProd']").focus()
                    }, 300); 
                }

                
            });

            $("#grabar_pedido").on("click", function () {
                grabar();
            });

            $("#modificar_pedido").on("click", function () {

                if (codVenta != '') {

                    var data = new FormData();
                    data.append('p_CODE_VTAC', codVenta);
                    data.append('p_TIPO', 'C');

                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "ajax/TomaPedidos.ashx?OPCION=11",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false,
                        async: false,
                    })
                        .success(function (datos) {
                            if (datos != null) {
                                if (datos[0].COMPLETADO == 'S') {
                                    $('#ModalAdvertencia2').modal('show');
                                } else {
                                    modificar();
                                }


                            } else {
                                noexito();
                            }
                            Desbloquear("ventana");
                        })
                        .error(function () {
                            noexito();
                            Desbloquear("ventana");
                        });
                } else {
                    modificar();
                }                
            });


            $('#tblDetallePedidos tbody').on('click', 'i.removeItem', function () {
                $(this).parent().parent().addClass('selected');
                var pos = oTable_listado_pedidos.api(true).row($(this).parent().parent()).index();
                var row = oTable_listado_pedidos.fnGetData(pos);
                oTable_listado_pedidos.fnDeleteRow(pos);
                oPedidoActual = oTable_listado_pedidos.fnGetData();
                $("#counter").text(oPedidoActual.length);
                if (!oPedidoActual.length) $("#counter").hide();
            });

        }();

        var fnEventosContAgregarDetalle = function () {
            
            $("#txtCantidad").on("change", function () {
                var precio = "";
                var cantidad = this.value;
                var precioTotal = $("#txtPrecTotal");
                var nPrecioTotal = 0;
                switch (oItemActual.PRECIO_IND) {
                    case "C":
                        var i = 0;

                        while (i < oItemActual.precios.length) {
                            if (parseFloat(cantidad) >= parseFloat(oItemActual.precios[i].RANGO))
                                i++;
                            else break;
                        }

                        precio = oItemActual.precios[i - 1].PRECIO_VENTA;
                        $("#txtPrecUnitario").val(formatoMiles(precio));

                        break;
                    case "E":
                        precio = oItemActual.precios[0].PRECIO_VENTA
                        break;
                }

                nPrecioTotal = parseFloat(cantidad || 0) * parseFloat(precio || 0);
                precioTotal[0].value = formatoMiles(nPrecioTotal);
                oItemActual.PRECIO = precio;
                oItemActual.PRECIO_TOTAL = nPrecioTotal;
                
                
                oItemActual.CANTIDAD = cantidad;                

            });

            $("#agregarProducto").on("click", function () {
                var stockproducto = $("#divStock").text();
                var glosaProducto = $("#txt_glosa_prod").val();
                var cantidadItems = oPedidoActual.length + 1;
                var cantidad = $("#txtCantidad").val();
                var precioUnidad = $("#txtPrecUnitario").val();
                var despAlmacen = ($("#chkAlmacen").is(":checked")) ? "S" : "N";
                var descuento = "0.00";
                var glosa = $.trim("");
                var detraccion, isc;
                var totalBruto = parseFloat(cantidad) * parseFloat(precioUnidad);
                var totalNeto = parseFloat(totalBruto) - parseFloat(descuento);
                var existeDetalle = false;

                if (parseInt(stockproducto) < parseInt(cantidad)) {
                    $("#divMensajeStock").fadeIn(3000, "swing", function () {
                        setTimeout(function () { $("#divMensajeStock").fadeOut(1200); }, 600);
                    });
                } else {

                    if (oPedidoActual.length > 0) {
                        for (var i = 0; i < oPedidoActual.length; i++ ) {
                            if (oPedidoActual[i].CODIGO == oItemActual.CODIGO) {

                                existeDetalle = true;
                                
                                /*$("#divMensajeAgregado").fadeIn(3000, "swing", function () {
                                    setTimeout(function () { $("#divMensajeAgregado").fadeOut(1200); }, 600);
                                });*/
                                break;
                            } 
                        }

                        if (existeDetalle == true) {
                            $("#divMensajeAgregado").fadeIn(3000, "swing", function () {
                                setTimeout(function () { $("#divMensajeAgregado").fadeOut(1200); }, 600);
                            });
                            $('#txtBusqProd').focus();
                        } else {
                            igv = mGetIGV();
                            oItemActual.ITEM = cantidadItems;
                            oItemActual.CANTIDAD = cantidad;
                            oItemActual.IGV = igv;
                            oItemActual.GLOSA = glosa;
                            oItemActual.NOMBRE_IMPRESION = oItemActual.DESC_ADM + " " + glosaProducto;
                            oItemActual.DESC_ADM = oItemActual.DESC_ADM + " " + glosaProducto;
                            oItemActual.PRECIO_DETALLE = precioUnidad;
                            oItemActual.MONTO_DESCUENTO = descuento;


                            oItemActual.TOTAL_BRUTO = totalBruto.toFixed(2);
                            oItemActual.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                            detraccion = parseFloat(oItemActual.DETRACCION) * (totalNeto);
                            oItemActual.MONTO_DETRAC = detraccion.toFixed(2);
                            oItemActual.TIPO_PROD = "N";
                            oItemActual.CTAS_CODE = "";
                            oItemActual.CTAS_CODE = "";
                            oItemActual.CECO_CODE = "";
                            oItemActual.DESP_ALMACEN = despAlmacen;
                            oItemActual.CODE_DCTO_ORIGEN = "";
                            oPedidoActual.push(oItemActual);
                            oTable_listado_pedidos.fnClearTable();
                            oTable_listado_pedidos.fnAddData(oPedidoActual);

                            $("#spnMessageProdAdded").text("Se agregó " + cantidad + " " + oItemActual.DESC_ADM);

                            $('#uniform-chkAlmacen span').removeClass();
                            $('#chkAlmacen').attr('checked', false).parent().removeClass("checked")

                            banderaActualizar = false;

                            $("#divProdAgregado").fadeIn(1200, "swing", function () {
                                $("#counter").text(cantidadItems);
                                $("#counter").show();
                                setTimeout(function () { $("#divProdAgregado").fadeOut(1000); }, 600);
                            });

                            limpiarProducto();                            
                        }


                        
                    } else {
                        igv = mGetIGV();
                        oItemActual.ITEM = cantidadItems;
                        oItemActual.CANTIDAD = cantidad;
                        oItemActual.IGV = igv;
                        oItemActual.GLOSA = glosa;
                        oItemActual.NOMBRE_IMPRESION = oItemActual.DESC_ADM + " " + glosaProducto;
                        oItemActual.DESC_ADM = oItemActual.DESC_ADM + " " + glosaProducto;
                        oItemActual.PRECIO_DETALLE = precioUnidad;
                        oItemActual.MONTO_DESCUENTO = descuento;


                        oItemActual.TOTAL_BRUTO = totalBruto.toFixed(2);
                        oItemActual.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                        detraccion = parseFloat(oItemActual.DETRACCION) * (totalNeto);
                        oItemActual.MONTO_DETRAC = detraccion.toFixed(2);
                        oItemActual.TIPO_PROD = "N";
                        oItemActual.CTAS_CODE = "";
                        oItemActual.CTAS_CODE = "";
                        oItemActual.CECO_CODE = "";
                        oItemActual.DESP_ALMACEN = despAlmacen;
                        oItemActual.CODE_DCTO_ORIGEN = "";
                        oPedidoActual.push(oItemActual);
                        oTable_listado_pedidos.fnClearTable();
                        oTable_listado_pedidos.fnAddData(oPedidoActual);

                        $("#spnMessageProdAdded").text("Se agregó " + cantidad + " " + oItemActual.DESC_ADM);

                        $('#uniform-chkAlmacen span').removeClass();
                        $('#chkAlmacen').attr('checked', false).parent().removeClass("checked")

                        banderaActualizar = false;

                        $("#divProdAgregado").fadeIn(1200, "swing", function () {
                            $("#counter").text(cantidadItems);
                            $("#counter").show();
                            setTimeout(function () { $("#divProdAgregado").fadeOut(1000); }, 600);
                        });

                        limpiarProducto();
                    }

                    
                    




                    //igv = mGetIGV();
                    //oItemActual.ITEM = cantidadItems;
                    //oItemActual.CANTIDAD = cantidad;
                    //oItemActual.IGV = igv;
                    //oItemActual.GLOSA = glosa;
                    //oItemActual.NOMBRE_IMPRESION = oItemActual.DESC_ADM + " " + glosaProducto;
                    //oItemActual.DESC_ADM = oItemActual.DESC_ADM + " " + glosaProducto;                    
                    //oItemActual.PRECIO_DETALLE = precioUnidad;
                    //oItemActual.MONTO_DESCUENTO = descuento;

                    
                    //oItemActual.TOTAL_BRUTO = totalBruto.toFixed(2);
                    //oItemActual.TOTAL_NETO = totalNeto.toFixed(2);//Total neto Incluido IGV
                    //detraccion = parseFloat(oItemActual.DETRACCION) * (totalNeto);
                    //oItemActual.MONTO_DETRAC = detraccion.toFixed(2);
                    //oItemActual.TIPO_PROD = "N";
                    //oItemActual.CTAS_CODE = "";
                    //oItemActual.CTAS_CODE = "";
                    //oItemActual.CECO_CODE = "";
                    //oItemActual.DESP_ALMACEN = despAlmacen;
                    //oItemActual.CODE_DCTO_ORIGEN = "";
                    //oPedidoActual.push(oItemActual);                    
                    //oTable_listado_pedidos.fnClearTable();
                    //oTable_listado_pedidos.fnAddData(oPedidoActual);

                    //$("#spnMessageProdAdded").text("Se agregó " + cantidad + " " + oItemActual.DESC_ADM);

                    //$('#uniform-chkAlmacen span').removeClass();
                    //$('#chkAlmacen').attr('checked', false).parent().removeClass("checked")

                    //banderaActualizar = false;

                    //$("#divProdAgregado").fadeIn(1200, "swing", function () {
                    //    $("#counter").text(cantidadItems);
                    //    $("#counter").show();
                    //    setTimeout(function () { $("#divProdAgregado").fadeOut(1000); }, 600);
                    //});

                    //limpiarProducto();

                }

            });


        }();

        var fnEventosContListado = function () {

        }();

        var fnEventosContNavegacion = function () {
            /* listado de pedidos
      $("#regresar_listado").click(function () {
          $("#cont_cabecera .adicionales").hide();

          $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
          $("#cont_filtros").hide("slide", { direction: "left" }, 100);
          $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
          setTimeout(function () {
              $("#cont_listado").show("slide", { direction: "right" }, 400);
          }, 100);
      });  

 

      // listado de pedidos
      $("#list_pedido").click(function () {
          $("#cont_cabecera .adicionales").hide();

          $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
          $("#cont_filtros").hide("slide", { direction: "left" }, 100);
          $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
          setTimeout(function () {
              $("#cont_listado").show("slide", { direction: "right" }, 400);
          }, 100);
      });      */
        };

    }

    //Obtiene tipo de cambio INTERNO
    function ListarValorCambio(monecode) {
        var sCambio = "";
        $.ajax({
            type: "post",
            url: "../../vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=INTERNO",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {

                    //$('#lbl_TC').attr("style", "display:block");
                    //$('#input_valor_cambio').attr("style", "display:block");
                    //$('#lbl_fec_vig').attr("style", "display:block");
                    //$('#input_fec_vig').attr("style", "display:block");

                    sCambio = datos[0].VALOR_CAMBIO_VENTA;
                    //$('#txt_fec_vig').val(datos[0].FECHA_VIGENTE);
                }
                else {

                }
            },
            error: function (msg) {
                alertCustom("Tipo de cambio Interno no se obtuvo correctamente.");
            }
        });

        return sCambio;
    }

    //Obtiene tipo de cambio OFICIAL
    function ListarValorCambioOficial(monecode) {
        var sCambioOficial = "";
        $.ajax({
            type: "post",
            url: "../../vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=OFICIAL",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                    //$('#lbl_TC_Oficial').attr("style", "display:block");
                    //$('#input_valor_cambio_Oficial').attr("style", "display:block");
                    //$('#lbl_fec_vig_Oficial').attr("style", "display:block");
                    //$('#input_fec_vig_Oficial').attr("style", "display:block");

                    sCambioOficial = datos[0].VALOR_CAMBIO_VENTA;
                    //$('#txt_fec_vig_Oficial').val(datos[0].FECHA_VIGENTE);
                }
                else {

                }
            },
            error: function (msg) {
                alertCustom("Tipo de cambio Oficial no se obtuvo correctamente.");
            }
        });

        return sCambioOficial;
    }

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

    function fnGetParametro(sCodParametro, sDescripParametro) {
        var sParametro = "";
        $.ajax({
            type: "POST",
            url: "ajax/TomaPedidos.ashx?OPCION=5&codigo=" + sCodParametro,
            contentType: "application/json;",
            async: false,
            dataType: "json",
            success: function (datos) {
                if (isEmpty(datos)) {
                    alertCustom("El Parametro \"" + sCodParametro + " - " + sDescripParametro + "\" no existe en la Base de Datos.");
                    return;
                }
                sParametro = datos[0].VALOR;
            },
            error: function (msg) {
                noexitoCustom("Error al Listar Parametro");
            }
        });
        return sParametro;
    }

    function obtenerFechaActual() {
        var fechaActualDev = "";

        var fecha = new Date();
        var dia = fecha.getDate();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes >= 10 || dia >= 10)
            return fechaActualDev = dia + '/' + mes + '/' + ano;
        else
            return fechaActualDev = '0' + dia + '/0' + mes + '/' + ano;
    }

    var limpiarProducto = function () {
        setTimeout(function () {
            $("input[name='txtBusqProd']").focus()
        }, 300);
        $("#txtCantidad").val("1");
        $("#txtBusqProd").val("");
        $("#infoProducto,.footer-prod").hide();
        oItemActual = {};
    };

    var limpiarPedido = function () {
        //$("#txtCodigoVenta").text("0");
        $("#counter").text("0");
        $("#counter").hide();
        oPedidoActual = [];
        oTable_listado_pedidos.fnClearTable();
        isc = 0;
        opExonerada = 0;
        opInafecta = 0;
        opGravada = 0;
        opGravadaSinIGV = 0;
        igvCalc = 0;
        importeTotal = 0;
        importeCobrar = 0;
        descuento = 0;
        isc = 0;
        $("#txt_glosa_prod").val('');

    };

    var fillCboGrupos = function () {
        $.ajax({
            type: "POST",
            url: "ajax/TomaPedidos.ashx?OPCION=1",
            async: true,
            success: function (datos) {
                $('#cbo_grupos').empty();
                $('#cbo_grupos').append('<option value="TODOS">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_grupos').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_grupos').val('TODOS').change();
            },
            error: function (msg) {
                alertCustom("Grupos no se listaron correctamente");
            }
        });
    }

    var grabar = function () {
        if (oPedidoActual.length != 0) {
            var detalles = "";
            var detalles_bon = "";
            var detalles_mue = "";
            var docVenta = "0003";

            var parametroMoneda = fnGetParametro('MOAL', 'Moneda Alterna');
            var valorCambio = ListarValorCambio(parametroMoneda);
            var valorCambioOfi = ListarValorCambioOficial(parametroMoneda);
            var impuestoRentaV = fnCargarFactorImpuestoRentaVenta();

            for (var i = 0; i < oPedidoActual.length; i++) {
                detalles += (i+1) + ";" +
                    oPedidoActual[i].CODIGO + ";" +
                    ValidaCaracter(oPedidoActual[i].NOMBRE_IMPRESION) + ";" +
                    oPedidoActual[i].UNIDAD + ";" +
                    oPedidoActual[i].CANTIDAD + ";" +
                    oPedidoActual[i].PRECIO_DETALLE + ";" +
                    oPedidoActual[i].MONTO_DESCUENTO + ";" +
                    oPedidoActual[i].TOTAL_NETO + ";" +
                    oPedidoActual[i].MONTO_DETRAC + ";" +
                    oPedidoActual[i].MONTO_ISC + ";" +
                    
                    ValidaCaracter(oPedidoActual[i].GLOSA) + ";" +
                    oPedidoActual[i].TIPO_BIEN + ";" +
                    oPedidoActual[i].PRECIO_IND + ";" +
                    
                    (parseFloat(oPedidoActual[i].MONTO_ISC) / valorCambio).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].MONTO_DETRAC) / valorCambioOfi).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].PRECIO_DETALLE) / valorCambio).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].MONTO_DESCUENTO) / valorCambio).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].TOTAL_NETO) / valorCambio).toFixed(2) + ";" +
                    oPedidoActual[i].CTAS_CODE + ";" +
                    oPedidoActual[i].CECO_CODE + ";" +
                    
                    oPedidoActual[i].ALMACENABLE + ";" +
                    oPedidoActual[i].TIPO_PROD + ";" +
                    oPedidoActual[i].SERIADA + ";" +
                    oPedidoActual[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE 
                    oPedidoActual[i].DESP_ALMACEN + ";" + 
                    (oPedidoActual[i].COSTO_PRODUCTO === undefined ? 0 : oPedidoActual[i].COSTO_PRODUCTO) +  //COSTO EN MONEDA BASE
                    "|";
            }

            calculoMontos();

            var data = new FormData();
            data.append('p_MONE_CODE', '0002');
            data.append('p_VALOR', importeTotal);
            data.append('p_IGV', igvCalc);
            data.append('p_IMPORTE', importeCobrar);
            data.append('p_ISC', isc);
            data.append('p_IMPORTE_EXO', opExonerada);
            data.append('p_IMPORTE_INA', opInafecta);
            data.append('p_IMPORTE_GRA', opGravadaSinIGV);
            data.append('p_IMPORTE_REDONDEO', "0");
            data.append('p_VALOR_CAMBIO', valorCambio);
            data.append('p_NOMBRE_REFERENCIA', $("#txtNombre").val());
            data.append("p_DESCUENTO", "0");

            data.append('p_IMPORTE_DETRACCION', "0");
            data.append("p_IMPORTE_RETENCION", "0");
            data.append('p_IMPORTE_PERCEPCION', "0");

            data.append('p_DETRACCION_IND', "N");
            data.append('p_PERCEPCION_IND', "N");
            data.append('p_RETENCION_IND', "N");
            data.append('p_NUM_DCTO_PERCEP', "");
            data.append('p_NUM_DCTO_DETRAC', "");
            data.append('p_NUM_DCTO_RETEN', "");
            data.append('p_FECHA_EMISION_PERCEP', "");
            data.append('p_FECHA_EMISION_DETRAC', "");
            data.append('p_FECHA_EMISION_RETEN', "");
            data.append('p_IMPRFAC_PERCEP', "N");
            data.append('p_NRO_CUENTA_DETRAC', "");

            data.append('p_SCSL_EXONERADA_IND', (scslExonerado == "SI") ? "S" : "N");
            data.append('p_IGV_IMPR_IND', "S");
            data.append('p_VALOR_CAMBIO_OFI', valorCambioOfi);
            data.append('p_PCTJ_IGV', (parseFloat(igv) * 100));
            var ir = ((parseFloat(impuestoRentaV) / 100) * parseFloat($('#txtTotal').val())).Redondear(4);
            data.append('p_FACTOR_RENTA', impuestoRentaV);
            data.append('p_IMPUESTO_RENTA', ir);
            data.append('p_DETALLES', detalles);

            var jqxhr = $.ajax({
                type: "POST",
                url: "ajax/TomaPedidos.ashx?OPCION=6",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false,
                //beforeSend: function () { console.log("grabando ..."); },
                //complete: function () { console.log("hecho ..."); }
            })
                .success(function (datos) {
                    if (datos != null) {
                        if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                            if (datos[0].CODIGO != 'LIMITE') {                               
                                $('#ModalExito').modal('show');

                                $("#sOperacion").text('registro');
                                $("#sCodigo").text(datos[0].CODIGO); 
                           

                                limpiarPedido();
                                codVenta = "";
                                listadoVentasUsuario();
                                $("#cont_cabecera .adicionales").hide();
                                $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                                $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
                                $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                                setTimeout(function () {
                                    $("#cont_listado").show("slide", { direction: "right" }, 400);
                                }, 100);    
                                
                            }
                            else {
                                alertCustom("Se ha excedido el límite de los documentos autorizados. Intente utilizar otra serie o refrescar la página");
                            }
                        }
                        else {
                            noexito();
                        }
                    } else {
                        noexito();
                    }
                    Desbloquear("ventana");
                })
                .error(function () {
                    noexito();
                    Desbloquear("ventana");
                });

        } else {
            alertCustom("Ingrese al menos 1 detalle!");
        }
    };
    
    var modificar = function () {       
        if (oPedidoActual.length != 0) {
            var detalles = "";
            var detalles_bon = "";
            var detalles_mue = "";
            var docVenta = "0003";

            var parametroMoneda = fnGetParametro('MOAL', 'Moneda Alterna');
            var valorCambio = ListarValorCambio(parametroMoneda);
            var valorCambioOfi = ListarValorCambioOficial(parametroMoneda);
            var impuestoRentaV = fnCargarFactorImpuestoRentaVenta();

            for (var i = 0; i < oPedidoActual.length; i++) {
                detalles += ValidaCaracter(oPedidoActual[i].ITEM) + ";" +
                    oPedidoActual[i].CODIGO + ";" +
                    ValidaCaracter(oPedidoActual[i].NOMBRE_IMPRESION) + ";" +
                    oPedidoActual[i].UNIDAD + ";" +
                    oPedidoActual[i].CANTIDAD + ";" +
                    oPedidoActual[i].PRECIO_DETALLE + ";" +
                    oPedidoActual[i].MONTO_DESCUENTO + ";" +
                    oPedidoActual[i].TOTAL_NETO + ";" +
                    oPedidoActual[i].MONTO_DETRAC + ";" +
                    oPedidoActual[i].MONTO_ISC + ";" +
                    //10
                    ValidaCaracter(oPedidoActual[i].GLOSA) + ";" +
                    oPedidoActual[i].TIPO_BIEN + ";" +
                    oPedidoActual[i].PRECIO_IND + ";" +
                    //Montos convertidos:
                    (parseFloat(oPedidoActual[i].MONTO_ISC) / valorCambio).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].MONTO_DETRAC) / valorCambioOfi).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].PRECIO_DETALLE) / valorCambio).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].MONTO_DESCUENTO) / valorCambio).toFixed(2) + ";" +
                    (parseFloat(oPedidoActual[i].TOTAL_NETO) / valorCambio).toFixed(2) + ";" +
                    oPedidoActual[i].CTAS_CODE + ";" +
                    oPedidoActual[i].CECO_CODE + ";" +
                    //20
                    oPedidoActual[i].ALMACENABLE + ";" +
                    oPedidoActual[i].TIPO_PROD + ";" +
                    oPedidoActual[i].SERIADA + ";" +
                    oPedidoActual[i].CODE_DCTO_ORIGEN + ";" + //DCTO_ORGN_CODE 
                    oPedidoActual[i].DESP_ALMACEN + ";" + 
                    (oPedidoActual[i].COSTO_PRODUCTO === undefined ? 0 : oPedidoActual[i].COSTO_PRODUCTO) +  //COSTO EN MONEDA BASE
                    "|";
            }

            calculoMontos();

            var data = new FormData();
            data.append('p_MONE_CODE', '0002');
            data.append('p_CODE_VTAC', codVenta);            
            data.append('p_VALOR', importeTotal);
            data.append('p_IGV', igvCalc);
            data.append('p_IMPORTE', importeCobrar);
            data.append('p_ISC', isc);
            data.append('p_IMPORTE_EXO', opExonerada);
            data.append('p_IMPORTE_INA', opInafecta);
            data.append('p_IMPORTE_GRA', opGravadaSinIGV);
            data.append('p_IMPORTE_REDONDEO', "0");
            data.append('p_VALOR_CAMBIO', valorCambio);
            data.append("p_DESCUENTO", "0");
            data.append('p_NOMBRE_REFERENCIA', $("#txtNombre").val());
            data.append('p_IMPORTE_DETRACCION', "0");
            data.append("p_IMPORTE_RETENCION", "0");
            data.append('p_IMPORTE_PERCEPCION', "0");

            data.append('p_DETRACCION_IND', "N");
            data.append('p_PERCEPCION_IND', "N");
            data.append('p_RETENCION_IND', "N");
            data.append('p_NUM_DCTO_PERCEP', "");
            data.append('p_NUM_DCTO_DETRAC', "");
            data.append('p_NUM_DCTO_RETEN', "");
            data.append('p_FECHA_EMISION_PERCEP', "");
            data.append('p_FECHA_EMISION_DETRAC', "");
            data.append('p_FECHA_EMISION_RETEN', "");
            data.append('p_IMPRFAC_PERCEP', "N");
            data.append('p_NRO_CUENTA_DETRAC', "");

            data.append('p_SCSL_EXONERADA_IND', (scslExonerado == "SI") ? "S" : "N");
            data.append('p_IGV_IMPR_IND', "S");
            data.append('p_VALOR_CAMBIO_OFI', valorCambioOfi);
            data.append('p_PCTJ_IGV', igv);
            var ir = ((parseFloat(impuestoRentaV) / 100) * parseFloat($('#txtTotal').val())).Redondear(4);
            data.append('p_FACTOR_RENTA', impuestoRentaV);
            data.append('p_IMPUESTO_RENTA', ir);
            data.append('p_DETALLES', detalles);

            var jqxhr = $.ajax({
                type: "POST",
                url: "ajax/TomaPedidos.ashx?OPCION=12",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false,
                //beforeSend: function () { console.log("grabando ..."); },
                //complete: function () { console.log("hecho ..."); }
            })
                .success(function (datos) {
                    if (datos != null) {
                        if (typeof datos[0].CODIGO != "undefined" && datos[0].CODIGO != 'ERROR') {
                            if (datos[0].CODIGO != 'LIMITE') {                                
                                $("#txtCodigoVenta").text(datos[0].CODIGO);
                                banderaActualizar = true;
                                $('#ModalExito').modal('show');

                                $("#sOperacion").text('modifico');
                                $("#sCodigo").text(datos[0].CODIGO);                                                                                            

                                //limpiarPedido();

                            }
                            else {
                                alertCustom("Se ha excedido el límite de los documentos autorizados. Intente utilizar otra serie o refrescar la página");
                            }
                        }
                        else {
                            noexito();
                        }
                    } else {
                        noexito();
                    }
                    Desbloquear("ventana");
                })
                .error(function () {
                    noexito();
                    Desbloquear("ventana");
                });

        } else {
            alertCustom("Ingrese al menos 1 detalle!");
        }
    };

    var mGetIGV = function () {
        var sParametro = 0;
        $.ajax({
            type: "POST",
            url: "ajax/TomaPedidos.ashx?OPCION=5&codigo=0021",
            contentType: "application/json;",
            async: false,
            dataType: "json",
            success: function (datos) {
                if (isEmpty(datos)) {
                    alertCustom("El Parametro 0021 - IGV no existe en la Base de Datos.");
                    return;
                }
                sParametro = parseFloat(datos[0].VALOR);
            },
            error: function (msg) {
                noexitoCustom("Error al Listar IGV");
            }
        });
        return sParametro;
    }

    var fnGetExonerado = function () {
        var sExonerado = "";
        $.ajax({
            type: "POST",
            url: "ajax/TomaPedidos.ashx?OPCION=7",
            async: false,
            success: function (datos) {
                sExonerado = datos;
            },
            error: function (msg) {
                noexitoCustom("Error al Listar EXONERADO");
            }
        });
        return sExonerado;
    }

    var fnGetRetencion = function () {
        var sRetencion = "";
        $.ajax({
            type: "POST",
            url: "ajax/TomaPedidos.ashx?OPCION=8",
            async: false,
            success: function (datos) {
                sRetencion = datos;
            },
            error: function (msg) {
                noexitoCustom("Error al Listar RETENCION");
            }
        });
        return sRetencion;
    }

    var calculoMontos = function () {

        var percepcion = 0;
        var retencion = 0;
        opGravada = 0;
        var agretencion_ind = fnGetRetencion();
        scslExonerado = fnGetExonerado();

        //CALCULO PARA SUCURSALES NO EXONERADAS----------------------------
        //------------------------------------------------------------------

        //INICIO RECORRIDO DETALLES
        for (var i = 0; i < oPedidoActual.length; i++) {
            //Descuento total
            descuento += parseFloat(oPedidoActual[i].MONTO_DESCUENTO);

            //ISC suma de todos los montos de ISC, de todos los producto que tengan ISC
            isc += parseFloat(oPedidoActual[i].MONTO_ISC);

            //OPExonerada:
            //--Si la sucursal es exhonerada, todos los montos van a exonerada
            if (scslExonerado == "SI") {
                opExonerada += parseFloat(oPedidoActual[i].TOTAL_NETO);
            }
            else {
                if (oPedidoActual[i].TIPO_BIEN == "EXO") {
                    opExonerada += parseFloat(oPedidoActual[i].TOTAL_NETO);

                } else if (oPedidoActual[i].TIPO_BIEN == "INA") {
                    //OP inafecto:  INA 
                    opInafecta += parseFloat(oPedidoActual[i].TOTAL_NETO);
                }
                else {
                    //OP gravada:(GRA / GIS)
                    opGravada += parseFloat(oPedidoActual[i].TOTAL_NETO);
                }
            }
        }
        //FIN RECORRIDO DETALLES

        //Op Gravada Sin IGV
        opGravadaSinIGV = opGravada / (1 + igv); //Ejm. OpGrav/1.18   

        //IGV calculado de la operacion gravada sin IGV
        igvCalc = opGravadaSinIGV * igv;

        baseImponible = opExonerada + opInafecta + opGravadaSinIGV

        importeTotal = baseImponible + igvCalc;

        //Importe cobrar
        importeCobrar = parseFloat(importeTotal);
        //if (parseFloat($("#txt_detraccion").val()) > parseFloat(retencion)) {
        //    importeCobrar -= parseFloat($("#txt_detraccion").val());
        //} else {
        //    importeCobrar -= parseFloat(retencion);
        //}

    }

    var fnCargarFactorImpuestoRentaVenta = function () {
        var data = new FormData();
        var impuestoRenta = fnGetParametro("IMRE", "IMPUESTO A LA RENTA");
        var impuestoRentaVenta = 0;
        $.ajax({
            type: "POST",
            url: "ajax/TomaPedidos.ashx?sOpcion=9",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        })
            .success(function (datos) {
                if (datos != null && datos != "") {
                    if (parseFloat(datos[0].FACTOR) < impuestoRenta) {
                        impuestoRentaVenta = impuestoRenta;
                    } else {
                        impuestoRentaVenta = datos[0].FACTOR;
                    }
                }
                else {
                    impuestoRentaVenta = impuestoRenta;;
                }
            })
            .error(function () {
            });
        return impuestoRentaVenta;
    }

    var listadoVentasUsuario = function () { 
        let contPend = 0;
        let totalVentas = 0;
        let arrayPedidos = {};
        $.ajax({
            type: "POST",
            url: "ajax/TomaPedidos.ashx?OPCION=10",
            async: true,
            success: function (datos) {                                  
                oTable_listado.fnClearTable();
                if (datos.length > 0) {
                    oTable_listado.fnAddData(datos);               
                }

                arrayPedidos = oTable_listado.fnGetData()

               
                if (arrayPedidos.length > 0) {
                    $.each(arrayPedidos, function (i, value) {
                        if (value.ESTADO == 'COMPLETO') {
                            totalVentas = totalVentas + parseFloat(value.VALOR);
                        }                        
                    })
                } else {
                    totalVentas = 0
                }

                

                $("#lblTotalVenta").html(formatoMiles(totalVentas));                

                for (let j = 0; j < datos.length; j++) {
                    if (datos[j].ESTADO == 'PENDIENTE')
                        contPend++;
                }

                if (contPend > 0) {
                    $("#counter2").text(contPend);
                    $("#counter2").show();
                } else {
                    $("#counter2").text('0');
                    $("#counter2").hide();
                }                
            },
            error: function (datos) {
                alertCustom("Grupos no se listaron correctamente");
            }
        });
    }

    return {
        init: function () {
            onloadEvent();
            crearTablaVaciaListado();
            crearTablaVaciaDetalle();
            eventoControles();
            fillCboGrupos();
            handleProductos();
            listadoVentasUsuario();
            $("#txtBusqProd").focus();
        }
    }
}();

function editarTomaPedido(codigo) {
    codVenta = codigo;   
    var data = new FormData();
    data.append('p_CODE_VTAC', codigo);
    data.append('p_TIPO', 'C');

    var jqxhr = $.ajax({
        type: "POST",
        url: "ajax/TomaPedidos.ashx?OPCION=11",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,       
    })
        .success(function (datos) {
            console.log(datos);
            
            if (datos != null) {    

                if (datos[0].COMPLETADO == 'S') {                    
                    $('#ModalAdvertencia2').modal('show');
                } else {
                    let dSubTotal = parseFloat(datos[0].TOTAL) / 1.18;
                    let dIgv = dSubTotal * 0.18;


                    $("#txtNombre").val(datos[0].NOMBRE_OPCIONAL);
                    //$("#txtSubTotal").val(dSubTotal.toFixed(2));
                    //$("#txtIgv").val(dIgv.toFixed(2));
                    detallePedido(codigo);
                    $("#cont_cabecera .adicionales").hide();
                    $("#cont_agregar_detalle").hide("slide", { direction: "left" }, 100);
                    $("#cont_filtros").hide("slide", { direction: "left" }, 100);
                    $("#cont_listado").hide("slide", { direction: "left" }, 100);
                    $("#cont_det_pedido").hide("slide", { direction: "left" }, 100);
                    setTimeout(function () {
                        $("#cont_det_pedido").show("slide", { direction: "right" }, 400);
                    }, 100);
                }
                

            } else {
                noexito();
            }
            Desbloquear("ventana");
        })
        .error(function () {
            noexito();
            Desbloquear("ventana");
        });
}

function detallePedido(codigo) {
    var data = new FormData();
    data.append('p_CODE_VTAC', codigo);
    data.append('p_TIPO', 'D');

    var jqxhr = $.ajax({
        type: "POST",
        url: "ajax/TomaPedidos.ashx?OPCION=11",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,       
    })
        .success(function (datos) {           
            if (datos != null) {      
                let contInt = 0;
                for (var i = 0; i < datos.length; i++) {
                    contInt++;
                    oItemActual.ITEM = contInt;
                    oItemActual.CANTIDAD = datos[i].CANTIDAD;
                    oItemActual.IGV = datos[i].IGV;
                    oItemActual.GLOSA = "";
                    oItemActual.DESC_ADM = datos[i].DESC_ADM;
                    oItemActual.PRECIO_TOTAL = datos[i].PRECIO_TOTAL;
                    oItemActual.PRECIO = datos[i].PRECIO;
                    oItemActual.CANTIDAD = datos[i].CANTIDAD;
                    oItemActual.UNIDAD = datos[i].UNIDAD;
                    oItemActual.SUBGRUPO = datos[i].SUBGRUPO;
                    oItemActual.TIPO_BIEN = datos[i].TIPO_BIEN;
                    oItemActual.SERIADA = datos[i].SERIADA;
                    oItemActual.SMONEDA = datos[i].SMONEDA;
                    oItemActual.MONTO_ISC = datos[i].MONTO_ISC;
                    oItemActual.NOMBRE_IMPRESION = datos[i].NOMBRE_IMPRESION;
                    oItemActual.PARAM_STOCK = datos[i].PARAM_STOCK;
                    oItemActual.GRUPO = datos[i].GRUPO;
                    oItemActual.ALMACENABLE = datos[i].ALMACENABLE;
                    oItemActual.CODIGO = datos[i].CODIGO;
                    oItemActual.PRECIO_IND = datos[i].PRECIO_IND;
                    oItemActual.CODIGO_ANTIGUO = datos[i].CODIGO_ANTIGUO;
                    oItemActual.CODMONEDA = datos[i].CODMONEDA;
                    oItemActual.COSTO_PRODUCTO = datos[i].COSTO_PRODUCTO;
                    oItemActual.PRECIO_DETALLE = datos[i].COSTO_PRODUCTO;
                    oItemActual.MONTO_DESCUENTO = datos[i].MONTO_DESCUENTO;
                    oItemActual.TOTAL_BRUTO = datos[i].TOTAL_BRUTO.toFixed(2);
                    oItemActual.TOTAL_NETO = datos[i].TOTAL_NETO.toFixed(2);//Total neto Incluido IGV
                    detraccion = parseFloat(datos[i].MONTO_DETRAC) * (datos[i].TOTAL_NETO);
                    oItemActual.MONTO_DETRAC = detraccion.toFixed(2);
                    oItemActual.TIPO_PROD = "N";
                    oItemActual.CTAS_CODE = "";
                    oItemActual.CTAS_CODE = "";
                    oItemActual.CECO_CODE = "";
                    oItemActual.CODE_DCTO_ORIGEN = "";
                    oItemActual.DESP_ALMACEN = datos[i].DESP_ALMACEN;
                    
                    oPedidoActual.push(oItemActual);
                    oItemActual = {};
                }
                
                $("#counter").text(oPedidoActual.length);
                $("#counter").show(); 
                $('#grabar_pedido').attr("style", "display:none");
                $('#modificar_pedido').attr("style", "display:inline");
                oTable_listado_pedidos.fnClearTable();
                oTable_listado_pedidos.fnAddData(oPedidoActual);               
            } else {
                noexito();
            }
            Desbloquear("ventana");
        })
        .error(function () {
            noexito();
            Desbloquear("ventana");
        });
}




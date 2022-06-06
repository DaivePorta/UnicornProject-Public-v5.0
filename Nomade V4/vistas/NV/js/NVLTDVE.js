var ajaxListado = null;
var ajaxVendedor = null;
var ajaxDev = null;
var ajaxNotaCredito = null;
var ajaxNotaDebito = null;
var ajaxNaminsa1 = null;
var ajaxCobros = null;
var ajaxCobros2 = null;
var formulario;
var formulario2;
var formulario3;
var formulario4;

var NVLTDVE = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboEstablecimiento, #cboTipoDcto, #cboCliente').select2();
        $('#txtCodigoVenta').inputmask({ "mask": "#", "repeat": 9, "greedy": false });

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });


    };

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
                    $("#cboEmpresa").select2("val", '');
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
            $("#cboEmpresa").select2("val", '');

        }
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var fillCboMoneda = function () {
        Bloquear($($('#cboMoneda').parents("div")[0]));
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                    $('#cboMoneda').select2("val", datos[pos].CODIGO);
                }
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente");
            },
            complete: function (msg) {
                Desbloquear($($('#cboMoneda').parents("div")[0]));
            }
        });
    }

    var fillCliente = function () {
        var selectEst = $('#cboCliente');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboCliente').select2('val', 'TODOS');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].ID + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                }
                $('#cboCliente').select2('val', 'TODOS');
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var cargarTipoDocumento = function () {
        var select = $('#cboTipoDcto').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=VENT&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();             
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $(select).append('<option value="COTI">COTIZACION</option>');
                $(select).append('<option value="OCCL">ORDEN DE COMPRA</option>');
                $(select).append('<option value="SALIDA">SALIDA POR VENTA NACIONAL</option>');
            },
            error: function (msg) {
                alertCustom('Error al cargar tipo de documentos.');
            }
        });
        $(select).select2();
    };

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#cboTipoDcto').change(function () {
            $('#txtCodigoDoc, #txtDocumento').val(null);
            $('#txtCodigoVenta').val("");
            $('svg').html('');
        });

        var CLIENTE = '';
        $("#cboCliente").on("change", function () {
            CLIENTE = $("#cboCliente :selected").text();
            if (CLIENTE === "TODOS") {
                CLIENTE = "";
            }
            else {
                CLIENTE = parseFloat($("#cboCliente :selected").val()).toString();
            }
        });

        $('#btnFiltrar').click(function () {
            // $("#chkCodigo").attr("checked", true).parent().addClass("checked");
            $("#chkCodigo").removeAttr("checked").parent().removeClass("checked");
            $("#chkCodigo").change();

            $('#txtInfo').text('');
            Bloquear("ventana");
            $.ajax({
                type: "post",
                url: 'vistas/NV/ajax/NVLTDVE.ASHX?OPCION=DOCUMENTOS&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboEstablecimiento').val() + '&TIPO_DCTO=' + $('#cboTipoDcto').val() + '&RAZON_SOCIAL=' + CLIENTE + '&DESDE=' + $("#txtDesde").val() + '&HASTA=' + $("#txtHasta").val(),
                contenttype: "application/json",
                datatype: "json",
                async: true,
                success: function (data) {
                    Desbloquear("ventana");
                    $('#tblDocumentos').DataTable().destroy();
                    $('#tblDocumentos tbody').unbind('click');
                    if (data !== null) {
                        var tabla = $('#tblDocumentos').DataTable({
                            responsive: true,
                            data: data,
                            order: [[0, "desc"]],
                            columns: [
                                {
                                    data: "CODIGO",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'center');
                                    }
                                },
                                {
                                    data: "NUM_DCTO",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'center');
                                    }
                                },
                                {
                                    data: "EMISION",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'center');
                                    },
                                    type: "fecha"
                                },
                                {
                                    data: "RAZON_SOCIAL",
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).css('text-align', 'left');
                                    }
                                }
                            ]
                        });
                        $('#tblDocumentos tbody').on('click', 'tr', function () {
                            var datos = tabla.row(this).data();
                            $('#txtCodigoDoc').val(datos.CODIGO);
                            $('#txtCodigoVenta').val(datos.CODIGO);
                            $('#txtDocumento').val(datos.NUM_DCTO);
                            $('#divBuscarDoc').modal('hide');
                            $('#divImprimir svg').html('');
                            $("#btnVerFlujo").click();
                        });
                    } else {
                        $('#tblDocumentos').DataTable({ responsive: true, data: [] });
                    }

                    $('#divBuscarDoc').modal('show');
                },
                error: function (msg) {
                    alertCustom('Error al cargar tipo de documentos.');
                    Desbloquear("ventana");
                }
            });
        });

        $("#txtCodigoVenta").on("keypress", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                $('#btnVerFlujo').click();
            }
        }).on("focus", function () {
            $('#txtCodigoVenta').select();
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("POSICION GLOBAL - " + $("#cboEmpresa :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html("<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p>");
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
        });

        $('#btnVerFlujo').click(function () {
            $("input").parent().parent().removeClass("error");
            $("select").parent().parent().removeClass("error");
            var campos = [];
            if ($("#chkCodigo").is(":checked")) {
                campos.push('txtCodigoVenta')
            } else {
                campos.push('txtDocumento', 'cboEmpresa', 'cboEstablecimiento')
            }
            if (vErrors(campos)) {
                var codigo = "";
                var dcto = "";
                $('#divImprimir').html('');
                if ($("#txtCodigoVenta").val().search("V") == 0) {//VENTA         
                    codigo = $("#txtCodigoVenta").val();
                    CargarDatosFlujo(codigo);
                } else if ($("#txtCodigoVenta").val().search("K") == 0) {//ORDEN DE COMPRA                 
                    codigo = "";
                    dcto = "OCCL";
                }
                else if ($("#txtCodigoVenta").val().search("Z") == 0) {//COTIZACION
                    codigo = "";
                    dcto = "COTI";
                }
                else if ($("#txtCodigoVenta").val().search("A") == 0) {//SALIDA ALMACEN
                    codigo = "";
                    dcto = "SALIDA";
                } else {
                    infoCustom("El código ingresado no es válido!");
                }
                if (dcto=="OCCL"||dcto=="COTI"||dcto=="SALIDA") {                    
                    var data = new FormData();
                    data.append('OPCION', 'INFO_EXTRA');
                    data.append('DCTO', dcto);
                    data.append('p_CODIGO_DCTO', $("#txtCodigoVenta").val());
                    data.append('p_CODIGO_ORIGEN', '');
                    data.append('p_TIPO_IND', "C");
                    Bloquear("ventana");
                    $.ajax({
                        type: "POST",
                        url: "vistas/NV/ajax/NVLTDVE.ashx",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false,
                        async: true,
                        datatype: "json",
                    }).success(function (datos) {
                        if (datos.length > 0) {
                            if (datos[0].CODIGO.search(",") > 0) {
                                codigo = datos[0].CODIGO.split(",")[0];
                                $("#tituloModal").html("Información");
                                $("#msgModal").html("Documento se encontró asociado a más de 1 venta.");
                                $("#cuerpoModal").html("");
                                var strDetalles = "";
                                for (var i = 0; i < datos[0].CODIGO.split(",").length; i++) {
                                    strDetalles += "<tr>";          
                                    strDetalles += "<td style='text-align:center;'>" + datos[0].CODIGO.split(",")[i] + "</td>";
                                    strDetalles += '<td style="text-align:center;"><a href="javascript:CargarDatosFlujo(\'' + datos[0].CODIGO.split(",")[i] + '\',true)" class="btn blue buscar">&nbsp;Ver Flujo</a></td>';
                                    strDetalles += "</tr>";
                                }
                                var strTabla = '<table class="tblCustom" style="margin-top:10px;">\
                                                <caption>Documentos Asociados</caption><thead>\
                                                <tr>\
                                                    <th>CODIGO VENTA</th>\
                                                    <th>#</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody style="cursor: pointer">'+ strDetalles + '</tbody>\
                                     </table>';
                                $("#cuerpoModal").append(strTabla);
                                $("#modalMensaje").modal("show");
                            } else {
                                codigo = datos[0].CODIGO;
                                if (datos.length > 1) {
                                    //infoCustom2("Documento se encontró referenciado en más de 1 venta.")
                                    $("#tituloModal").html("Información");
                                    $("#msgModal").html("Documento se encontró asociado a más de 1 venta.");
                                    $("#cuerpoModal").html("");
                                    var strDetalles = "";
                                    for (var i = 0; i < datos.length; i++) {
                                        strDetalles += "<tr>";
                                        strDetalles += "<td style='text-align:center;'>" + datos[i].CODIGO + "</td>";
                                        strDetalles += '<td style="text-align:center;"><a href="javascript:CargarDatosFlujo(\'' + datos[i].CODIGO + '\',true)" class="btn blue buscar">Ver Flujo</a></td>';
                                        strDetalles += "</tr>";
                                    }
                                    var strTabla = '<table class="tblCustom" style="margin-top:10px;">\
                                                <caption>Documentos Asociados</caption><thead>\
                                                <tr>\
                                                    <th>CODIGO VENTA</th>\
                                                    <th>#</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody style="cursor: pointer">'+ strDetalles + '</tbody>\
                                     </table>';
                                    $("#cuerpoModal").append(strTabla);
                                    $("#modalMensaje").modal("show");
                                }
                            }                           
                        }
                    }).error(function (msg) {
                        if (msg.statusText != "abort") {
                            noexito();
                        }
                    }).complete(function () {
                        Desbloquear("ventana");
                        if (codigo != "") {
                            CargarDatosFlujo(codigo);
                        } else {
                            BloquearSinGif("#bloqueFlujo");
                            infoCustom2("No se ha encontrado el documento solicitado o aún NO está asociado a una Venta!");
                            LimpiarGraficosFlujo()
                        }
                    });
                }
               
            }
        });

        $("#chkCodigo").on("change", function () {
            if ($("#chkCodigo").is(":checked")) {
                $("#txtCodigoVenta").removeAttr("disabled");
                $(".buscarCodigo").show();
                $("#txtDocumento").val("");
                $("#divBuscarDcto").slideUp();
            } else {
                $("#txtCodigoVenta").attr("disabled", "disabled");
                $(".buscarCodigo").hide();
                $("#divBuscarDcto").slideDown();
            }
        });

        $(".imgFondoFlujo").on("click", function () {
            if ($(this).hasClass("imgSelected")) {

            } else {
                $(".imgFondoFlujo").removeClass("imgSelected");
                $(this).addClass("imgSelected")
            }
        });

        //EVENTOS DOCUMENTOS
        $("#btnCotizacion").on("click", function () {
            CargarDatosDcto($(this).attr("id"));
        });
        $("#btnOrdenCompra").on("click", function () {
            CargarDatosDcto($(this).attr("id"));

        });
        $("#btnVenta").on("click", function () {
            CargarDatosDcto($(this).attr("id"));

        });
        $("#btnVentaLista").on("click", function () {
            CargarDatosDcto($(this).attr("id"));

        });
        $("#btnVentaCobrada").on("click", function () {
            CargarDatosDcto($(this).attr("id"));

        });
        $("#btnVentaDespachada").on("click", function () {
            CargarDatosDcto($(this).attr("id"));

        });
        $("#btnNotaCredito").on("click", function () {
            CargarDatosDcto($(this).attr("id"));

        });
        $("#btnNotaDebito").on("click", function () {
            CargarDatosDcto($(this).attr("id"));

        });
        $("#btnDevolucionNotaCredito").on("click", function () {
            CargarDatosDcto($(this).attr("id"));
        });

    };

    var update = function (source) {
        $('#txtInfo').text('Click en un cuadro para navegar hacia el documento.');
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        nodes.forEach(function (d) { d.y = d.depth * 250; });

        var node = svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        var nodeEnter = node.enter().append("g").attr("class", "node")
            .attr("transform", function (d) { return "translate(" + rtl.y(source) + "," + rtl.x(source) + ")"; })
            .on("click", click);

        var rects = nodeEnter.append("rect")
            .attr("width", "10px").attr("height", "10px")
            .attr("x", function (d) { return -5; }).attr("y", function (d) { return -5; })
            .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; })
            .style("stroke", function (d) { return d.type; });

        nodeEnter.append("text")
            .attr("y", function (d) { return d.children || d._children ? 10 : -10; })
            .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", "1em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "start" : "end"; })
            .html(function (d) {
                return '<tspan x="-10" dy="1em">' + d.documento + '</tspan><tspan x="-10" dy="1em">' + d.numero + '</tspan>';
            })
            .style("fill-opacity", 1e-6);

        var nodeUpdate = node.transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + rtl.x(d) + "," + rtl.y(d) + ")"; });

        nodeUpdate.select("text").style("fill-opacity", 1);

        var nodeExit = node.exit().transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + rtl.x(source) + "," + rtl.y(source) + ")"; })
            .remove();

        nodeExit.select("text").style("fill-opacity", 1e-6);

        var link = svg.selectAll("path.link").data(links, function (d) { return d.target.id; });

        link.enter().insert("path", "g").attr("class", "link")
            .attr("d", function (d) {
                var o = { x: source.y, y: source.x };
                return diagonal({ source: o, target: o });
            });

        link.transition().duration(duration).attr("d", diagonal);

        link.exit().transition().duration(duration)
            .attr("d", function (d) {
                var o = { x: source.y, y: source.x };
                return diagonal({ source: o, target: o });
            }).remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x = rtl.y(d);
            d.y = rtl.x(d);
        });
    };

    var cargaInicial = function () {
        var codDoc = ObtenerQueryString("cod");
        var nroDoc = ObtenerQueryString("doc");
        var tipDoc = ObtenerQueryString("tipDoc");
        var emp = ObtenerQueryString("emp");
        var sucu = ObtenerQueryString("sucu");
        var cli = ObtenerQueryString("cli");

        /*
        $("#btnFiltrar").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                eventoControles();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                eventoControles();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar.")
            }
        });
        */

        if (codDoc != undefined && codDoc != null) {          
            $('#cboEmpresa').select2('val', emp); 
            $('#cboEstablecimiento').select2('val', sucu); 
            $('#cboTipoDcto').select2('val', tipDoc); 
            $('#txtDocumento').val(nroDoc);
            $('#txtCodigoVenta').val(codDoc);
            $('#cboCliente').select2('val', cli);
            
            
            $('#btnVerFlujo').click();
        } else {
            formulario = $("#divBase").clone();
            formulario2 = $("#divBase2").clone();
            formulario3 = $("#divBase3").clone();
            formulario4 = $("#divBase4").clone();
            $("#divBase2").remove();
            $("#divBase3").remove();
            $("#divBase4").remove();
        }

        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);
        
    };

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboMoneda();
            fillCliente();
            eventoControles();
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
            cargarTipoDocumento();
            
            cargaInicial();
        }
    }
}();

function CargarDatosDcto(id) {
    //id: id del boton que identifica al tipo de documento a cargar

    $("#bloqueCotizacion").hide();
    $("#bloqueOrdenCompra").hide();
    $("#bloqueVenta").hide();
    $("#bloqueCotizacion").hide();
    $("#bloqueCobro").hide();
    $("#bloqueNaminsa").hide();
    $("#bloqueNotaCredito").hide();
    $("#bloqueNotaDebito").hide();
    $("#bloqueDevolucion").hide();

    var titulo = "";
    switch (id) {
        case "btnCotizacion":
            titulo = "Datos Cotización "
            $("#bloqueCotizacion").show();
            break;
        case "btnOrdenCompra":
            titulo = "Datos Orden de Compra"
            $("#bloqueOrdenCompra").show();
            break;
        case "btnVenta":
            titulo = "Datos Documento de Venta"
            $("#bloqueVenta").show();
            break;
        case "btnVentaLista":
            titulo = "Datos Documento de Venta"
            $("#bloqueVenta").show();
            break;
        case "btnVentaCobrada":
            titulo = "Datos Cobro"
            $("#bloqueCobro").show();
            break;
        case "btnVentaDespachada":
            titulo = "Datos Despacho"
            $("#bloqueNaminsa").show();
            break;
        case "btnNotaCredito":
            titulo = "Datos Nota Crédito"
            $("#bloqueNotaCredito").show();
            break;
        case "btnNotaDebito":
            titulo = "Datos Nota Débito"
            $("#bloqueNotaDebito").show();
            break;
        case "btnDevolucionNotaCredito":
            titulo = "Devolución Nota Crédito"
            $("#bloqueDevolucion").show();
            break;
        default:
    }
    $("#tituloDcto").html(titulo);
    if (datosFlujo != null) {
        CargarDatosDctoDetallado(id)
    }
}

function CargarDatosDctoDetallado(id) {
    if (datosFlujo.CODIGO != undefined) {
        DesbloquearSinGif("#bloqueFlujo");
        if (id == "btnCotizacion") {
            //*******************************************************
            //*******************************************************
            var dt = null;
            var nroDctos = 0;
            $("#bloqueCotizacion").html("");
            for (var i = 0; i < datosFlujo.ORIGENES.length; i++) {//ESTE FOR HASTA 19-12-2016 SOLO HACE 1 RECORRIDO: VENTA SOLO ACEPTA 1 DCTO DE ORIGEN
                //BUSCAR Cotizaciones 1
                if (datosFlujo.ORIGENES[i].DCTO == "COTIZACION") {
                    //DIBUJAR CONTROLES------------
                    nroDctos++;
                    var idActual = "ct_" + nroDctos;
                    $("#bloqueCotizacion").prepend('<div id="' + idActual + '"></div>');
                    $(formulario).clone().appendTo("#" + idActual);
                    //-----------------------------               

                } else {
                    //BUSCAR Ordenes de Compra
                    if (datosFlujo.ORIGENES[i].DCTO == "ORDEN_COMPRA") {
                        //BUSCAR Cotizaciones 2 COMO ORIGEN DE UNA ORDEN DE COMPRA
                        for (var j = 0; j < datosFlujo.ORIGENES[i].ORIGENES.length; j++) {
                            if (datosFlujo.ORIGENES[i].ORIGENES[j].DCTO == "COTIZACION") {
                                //DIBUJAR CONTROLES------------
                                nroDctos++;
                                var idActual = "ct_" + nroDctos;
                                $("#bloqueCotizacion").prepend('<div id="' + idActual + '"></div>');
                                $(formulario).clone().appendTo("#" + idActual);
                                //-----------------------------
                                var str = "AbrirDcto(\"" + datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].CODIGO + "\")"
                                $("#" + idActual + " #btnAbrirDcto0").attr('onclick', str).attr("title", "Ir a Documento");
                                $("#" + idActual + " #txtCodigo").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].CODIGO)
                                $("#" + idActual + " #txtUsuario").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].USUA_ID)
                                // $("#" + idActual + " #txtTipoDcto").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].DOCUMENTO)
                                $("#" + idActual + " #txtTipoDcto").val("COTIZACION")
                                $("#" + idActual + " #txtSerieDcto").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].DCTO_SERIE)
                                $("#" + idActual + " #txtNroDcto").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].DCTO_NRO)
                                $("#" + idActual + " #txtFechaEmision").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].EMISION)
                                $("#" + idActual + " #txtCliente").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].RAZON_SOCIAL)
                                $("#" + idActual + " #txtDctoCliente").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].CLIE_DCTO_DESC)
                                $("#" + idActual + " #txtNroDctoCliente").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].CLIE_DCTO_NRO)
                                $("#" + idActual + " #txtVendedor").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].VENDEDOR)
                                $("#" + idActual + " #txtMoneda").val(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].DESC_MONEDA)
                                $("#" + idActual + " #txtGlosa").html(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].GLOSA)

                                var baseImponible = parseFloat(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].IMPORTE_EXO) + parseFloat(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].IMPORTE_GRA) + parseFloat(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].IMPORTE_INA);
                                var subtotal = baseImponible + parseFloat(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].IGV);
                                $("#" + idActual + " #txtImporteTotal").val(formatoMiles(subtotal))
                                $("#" + idActual + " #txtImporteCobrar").val(formatoMiles(datosFlujo.ORIGENES[i].ORIGENES[j].DATOS[0].IMPORTE))
                                $("#" + idActual + " #txtModoPago").val("-");

                            }
                        }
                    }
                }
            }
            $("#bloqueCotizacion .divBorrableOrgn").remove();
            $("#bloqueCotizacion .divBorrableDest").remove();
        } else if (id == "btnOrdenCompra") {
            //*******************************************************
            //*******************************************************
            var dt = null;
            var nroDctos = 0;
            $("#bloqueOrdenCompra").html("");
            for (var i = 0; i < datosFlujo.ORIGENES.length; i++) {
                //DIBUJAR CONTROLES------------
                nroDctos++;
                var idActual = "oc_" + nroDctos;
                $("#bloqueOrdenCompra").prepend('<div id="' + idActual + '"></div>');
                $(formulario).clone().appendTo("#" + idActual);
                //-----------------------------
                //BUSCAR Ordenes de Compra
                if (datosFlujo.ORIGENES[i].DCTO == "ORDEN_COMPRA") {
                    //Cargar datos para 1 orden de compra 
                    var str = "AbrirDcto(\"" + datosFlujo.ORIGENES[i].DATOS[0].CODIGO + "\")"
                    $("#" + idActual + " #btnAbrirDcto0").attr('onclick', str).attr("title", "Ir a Documento");
                    $("#" + idActual + " #txtCodigo").val(datosFlujo.ORIGENES[i].DATOS[0].CODIGO)
                    $("#" + idActual + " #txtUsuario").val(datosFlujo.ORIGENES[i].DATOS[0].USUA_ID)
                    // $("#" + idActual + " #txtTipoDcto").val(datosFlujo.ORIGENES[i].DATOS[0].DOCUMENTO)
                    $("#" + idActual + " #txtTipoDcto").val("ORDEN DE COMPRA")
                    $("#" + idActual + " #txtSerieDcto").val(datosFlujo.ORIGENES[i].DATOS[0].DCTO_SERIE)
                    $("#" + idActual + " #txtNroDcto").val(datosFlujo.ORIGENES[i].DATOS[0].DCTO_NRO)
                    $("#" + idActual + " #txtFechaEmision").val(datosFlujo.ORIGENES[i].DATOS[0].EMISION)
                    $("#" + idActual + " #txtCliente").val(datosFlujo.ORIGENES[i].DATOS[0].RAZON_SOCIAL)
                    $("#" + idActual + " #txtDctoCliente").val(datosFlujo.ORIGENES[i].DATOS[0].CLIE_DCTO_DESC)
                    $("#" + idActual + " #txtNroDctoCliente").val(datosFlujo.ORIGENES[i].DATOS[0].CLIE_DCTO_NRO)
                    $("#" + idActual + " #txtVendedor").val(datosFlujo.ORIGENES[i].DATOS[0].VENDEDOR)
                    $("#" + idActual + " #txtMoneda").val(datosFlujo.ORIGENES[i].DATOS[0].DESC_MONEDA)
                    $("#" + idActual + " #txtGlosa").html(datosFlujo.ORIGENES[i].DATOS[0].GLOSA)

                    var baseImponible = parseFloat(datosFlujo.ORIGENES[i].DATOS[0].IMPORTE_EXO) + parseFloat(datosFlujo.ORIGENES[i].DATOS[0].IMPORTE_GRA) + parseFloat(datosFlujo.ORIGENES[i].DATOS[0].IMPORTE_INA);
                    var subtotal = baseImponible + parseFloat(datosFlujo.ORIGENES[i].DATOS[0].IGV);
                    $("#" + idActual + " #txtImporteTotal").val(formatoMiles(subtotal))
                    $("#" + idActual + " #txtImporteCobrar").val(formatoMiles(datosFlujo.ORIGENES[i].DATOS[0].IMPORTE))
                    $("#" + idActual + " #txtModoPago").val("-");

                    //CargarDocumentosOrigen  
                    if (datosFlujo.ORIGENES[i].DATOS[0].DCTO_CODE_REF != null) {
                        var codigos = (datosFlujo.ORIGENES[i].DATOS[0].DCTO_CODE_REF).split(",");
                        var series = (datosFlujo.ORIGENES[i].DATOS[0].DCTO_REF_SERIE).split(","); 
                        var nros = (datosFlujo.ORIGENES[i].DATOS[0].DCTO_REF_NRO).split(",");
                    } else {
                        var codigos = [];
                        var series = [];
                        var nros = [];
                    }
                    var c = 0;
                    $("#" + idActual + " #divDctosOrigen").html("");
                    for (var i = 0; i < codigos.length; i++) {
                        c++;
                        var str = ObtenerFilaOrigenDestino("ORIGEN", c, codigos[i]);
                        $("#" + idActual + " #divDctosOrigen").append(str);
                        //------
                        $("#" + idActual + " #txtCodDctoOrigen_" + c + "").val(codigos[i]);
                        $("#" + idActual + " #txtSerieDctoOrigen_" + c + "").val(series[i]);
                        $("#" + idActual + " #txtNroDctoOrigen_" + c + "").val(nros[i]);
                        if (codigos[i].search("K") != -1) {
                            $("#" + idActual + " #lblDctoOrigen_" + c + "").html("Orden de Compra");
                        } else if (codigos[i].search("Z") != -1) {
                            $("#" + idActual + " #lblDctoOrigen_" + c + "").html("Cotización");
                        } else if (codigos[i].search("A") != -1) {
                            //TO DO: CAMBIAR NOMBRES A CORRESPONDIENTES TIPOS DE DCTOS
                            $("#" + idActual + " #lblDctoOrigen_" + c + "").html("Salida de Almacén");
                        }
                    }
                }
            }
            $("#bloqueOrdenCompra .divBorrableDest").remove();

        } else if (id == "btnVenta" || id == "btnVentaLista") {
            //*******************************************************
            //*******************************************************
            var str = "AbrirDcto(\"" + datosFlujo.DATOS[0].CODIGO + "\")"
            $("#bloqueVenta #btnAbrirDcto0").attr('onclick', str).attr("title", "Ir a Documento");
            if (datosFlujo.DATOS[0].ANULADO == "SI") {
                str = "AbrirDctoAnulacion(\"" + datosFlujo.DATOS[0].CODIGO + "\")"
                $("#bloqueVenta #btnAbrirDcto1")
                 .css('display', "inline-block")
                 .attr('onclick', str).attr("title", "Ir a Anulación");
            } else {
                $("#bloqueVenta #btnAbrirDcto1").css('display', "none");
            }
            $("#bloqueVenta #txtCodigo").val(datosFlujo.DATOS[0].CODIGO)
            $("#bloqueVenta #txtUsuario").val(datosFlujo.DATOS[0].USUA_ID)
            $("#bloqueVenta #txtTipoDcto").val(datosFlujo.DATOS[0].DOCUMENTO)
            $("#bloqueVenta #txtSerieDcto").val(datosFlujo.DATOS[0].DCTO_SERIE)
            $("#bloqueVenta #txtNroDcto").val(datosFlujo.DATOS[0].DCTO_NRO)
            $("#bloqueVenta #txtFechaEmision").val(datosFlujo.DATOS[0].EMISION)
            $("#bloqueVenta #txtCliente").val(datosFlujo.DATOS[0].RAZON_SOCIAL)
            $("#bloqueVenta #txtDctoCliente").val(datosFlujo.DATOS[0].CLIE_DCTO_DESC)
            $("#bloqueVenta #txtNroDctoCliente").val(datosFlujo.DATOS[0].CLIE_DCTO_NRO)
            $("#bloqueVenta #txtVendedor").val(datosFlujo.DATOS[0].VENDEDOR)
            $("#bloqueVenta #txtMoneda").val(datosFlujo.DATOS[0].DESC_MONEDA)
            $("#bloqueVenta #txtGlosa").html(datosFlujo.DATOS[0].GLOSA)

            var baseImponible = parseFloat(datosFlujo.DATOS[0].IMPORTE_EXO) + parseFloat(datosFlujo.DATOS[0].IMPORTE_GRA) + parseFloat(datosFlujo.DATOS[0].IMPORTE_INA);
            var subtotal = baseImponible + parseFloat(datosFlujo.DATOS[0].IGV);
            $("#bloqueVenta #txtImporteTotal").val(formatoMiles(subtotal))
            $("#bloqueVenta #txtImporteCobrar").val(formatoMiles(datosFlujo.DATOS[0].IMPORTE))
            if (datosFlujo.DATOS[0].CONTRAENTREGA_IND == "S") {
                $("#bloqueVenta #txtModoPago").val("CONTRAENTREGA");
            } else if (datosFlujo.DATOS[0].MOPA == "0001") {
                $("#bloqueVenta #txtModoPago").val("CONTADO");
            } else if (datosFlujo.DATOS[0].MOPA == "0002") {
                $("#bloqueVenta #txtModoPago").val("CREDITO");
            }
            //CargarDocumentosOrigen  
            if (datosFlujo.DATOS[0].DCTO_CODE_REF != null && datosFlujo.DATOS[0].DCTO_TIPO_CODE_REF != 'XXXX') {
                var codigos = (datosFlujo.DATOS[0].DCTO_CODE_REF).split(",");
                var series = (datosFlujo.DATOS[0].DCTO_REF_SERIE).split(",");
                var nros = (datosFlujo.DATOS[0].DCTO_REF_NRO).split(",");
            } else {
                var codigos = [];
                var series = [];
                var nros = [];
            }
            var c = 0;
            $("#bloqueVenta #divDctosOrigen").html("");
            for (var i = 0; i < codigos.length; i++) {
                c++;
                var str = ObtenerFilaOrigenDestino("ORIGEN", c, codigos[i]);
                $("#bloqueVenta #divDctosOrigen").append(str);
                //------
                $("#bloqueVenta #txtCodDctoOrigen_" + c + "").val(codigos[i]);
                $("#bloqueVenta #txtSerieDctoOrigen_" + c + "").val(series[i]);
                $("#bloqueVenta #txtNroDctoOrigen_" + c + "").val(nros[i]);
                if (codigos[i].search("K") != -1) {
                    $("#bloqueVenta #lblDctoOrigen_" + c + "").html("Orden de Compra");
                } else if (codigos[i].search("Z") != -1) {
                    $("#bloqueVenta #lblDctoOrigen_" + c + "").html("Cotización");
                } else if (codigos[i].search("A") != -1) {
                    $("#bloqueVenta #lblDctoOrigen_" + c + "").html("Salida de Almacén");
                }
            }

            codigos = [];
            series = [];
            nros = [];
            c = 0;
            var tipos = [];
            $("#bloqueVenta #divDctosDestino").html("");
            //CargarDocumentosDestino
            if (datosFlujo.DATOS[0].CODE_DCTO_DESTINO != null) {
                codigos = (datosFlujo.DATOS[0].CODE_DCTO_DESTINO).split(",");
                tipos = (datosFlujo.DATOS[0].TIPO_DCTO_DESTINO).split(",");
                for (var i = 0; i < datosFlujo.DESTINOS.length; i++) {
                    c++;
                    var str = ObtenerFilaOrigenDestino("DESTINO", c, codigos[i]);
                    $("#bloqueVenta #divDctosDestino").append(str);
                    //------
                    $("#bloqueVenta #txtCodDctoDestino_" + c + "").val(codigos[i]);
                    if (datosFlujo.DESTINOS[i].DCTO == "NAMINSA_1") {//GUIAS 
                        $("#bloqueVenta #txtSerieDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].REQC_NUM_SEQ_DOC);
                        $("#bloqueVenta #txtNroDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].REQC_CODE);
                    } else if(datosFlujo.DESTINOS[i].DCTO == "NAMINSA_2") {//FACTURAS/BOLETAS/TICKETS
                        $("#bloqueVenta #txtSerieDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].NUM_SERIE_DCTO);
                        $("#bloqueVenta #txtNroDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].NUM_DCTO);
                    }
                    //if (datosFlujo.DESTINOS[i].DATOS[0].NUM_SERIE_DCTO != "") {
                    //    $("#bloqueVenta #txtSerieDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].NUM_SERIE_DCTO);
                    //    $("#bloqueVenta #txtNroDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].NUM_DCTO);
                    //} else {
                    //    $("#bloqueVenta #txtSerieDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].REQC_NUM_SEQ_DOC);
                    //    $("#bloqueVenta #txtNroDctoDestino_" + c + "").val(datosFlujo.DESTINOS[i].DATOS[0].REQC_CODE);
                    //}
                    if (codigos[i].search("K") != -1) {
                        $("#bloqueVenta #lblDctoDestino_" + c + "").html("Orden de Compra");
                    } else if (codigos[i].search("Z") != -1) {
                        $("#bloqueVenta #lblDctoDestino_" + c + "").html("Cotización");
                    } else if (codigos[i].search("A") != -1) {                       
                        $("#bloqueVenta #lblDctoDestino_" + c + "").html(datosFlujo.DESTINOS[i].DATOS[0].DESC_TIPO_DCTO);
                    }
                }
            }

        } else if (id == "btnVentaCobrada") {
            //*******************************************************
            //*******************************************************
            if (datosFlujo.DATOS[0].PAGADO_IND == "S") {
                $("#lblMensajeCobro").html("Venta Cobrada");

            } else {
                $("#lblMensajeCobro").html("Venta NO Cobrada");
            }
        } else if (id == "btnVentaDespachada") {
            var dt = null;
            var nroDctos = 0;
            $("#divSalidas").html("");
            if (datosFlujo.DESTINOS.length > 0) {
                $("#lblMensajeDespacho").html("Venta Despachada");
            } else {
                if (datosFlujo.DATOS[0].VENTA_RAPIDA_IND == "S") {
                    $("#lblMensajeDespacho").html("Despachado por Venta Rápida");
                } else {
                    $("#lblMensajeDespacho").html("Venta NO Despachada");
                    //CARGAR NAMINSAS SIN COMPLETAR QUE YA TENGAN COMO ORIGEN LA VENTA
                    //****************
                    var data2 = new FormData();
                    data2.append('OPCION', 'INFO_EXTRA');
                    data2.append('DCTO', "NAMINSA");
                    data2.append('p_CODIGO_DCTO', "");
                    data2.append('p_CODIGO_ORIGEN', datosFlujo.CODIGO);
                    data2.append('p_TIPO_IND', "C");
                    Bloquear("bloqueNaminsa");
                    if (ajaxNaminsa1) {
                        ajaxNaminsa1.abort();
                    }
                    ajaxNaminsa1 = $.ajax({
                        type: "POST",
                        url: "vistas/NV/ajax/NVLTDVE.ashx",
                        contentType: false,
                        data: data2,
                        processData: false,
                        cache: false,
                        async: true,
                        datatype: "json",
                    }).success(function (datos) {
                        if (datos.length > 0) {
                            var strDetalles = "";
                            for (var i = 0; i < datos.length; i++) {
                                strDetalles += "<tr>";
                                strDetalles += "<td style='text-align:center;'>" + datos[i].EMISION.substr(0, 10) + "</td>";
                                strDetalles += "<td style='text-align:center;'>" + datos[i].MOVIMIENTO + "</td>";
                                strDetalles += "<td style='text-align:center;'>" + datos[i].CODIGO + "</td>";
                                strDetalles += '<td style="text-align:center;"><a href="?f=NAMINSA&codigo=' + datos[i].CODIGO + '" target="_blank" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a></td>';
                                strDetalles += "</tr>";
                            }
                            var strTabla = '<table class="tblCustom" style="margin-top:10px;">\
                                                <caption>Documentos Asociados</caption><thead>\
                                                <tr>\
                                                    <th>FECHA EMISION</th>\
                                                    <th>MOVIMIENTO</th>\
                                                    <th>CODIGO</th>\
                                                    <th>#</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody style="cursor: pointer">'+ strDetalles + '</tbody>\
                                        </table>';
                            $("#divSalidas").append(strTabla);
                        }
                    }).error(function (msg) {
                        if (msg.statusText != "abort") {
                            noexito();
                        }
                    }).complete(function () {
                        Desbloquear("bloqueNaminsa");
                    });
                    //****************
                }
            }
            for (var i = 0; i < datosFlujo.DESTINOS.length; i++) {
                //DIBUJAR CONTROLES------------
                nroDctos++;
                var idActual = "na_" + nroDctos;
                $("#divSalidas").prepend('<div id="' + idActual + '"></div>');
                $(formulario2).clone().appendTo("#" + idActual);
                //-----------------------------

                var str = "AbrirDcto(\"" + datosFlujo.DESTINOS[i].DATOS[0].CODIGO + "\")"
                $("#" + idActual + " #btnAbrirDcto0").attr('onclick', str).attr("title", "Ir a Documento");
                $("#" + idActual + " #txtCodigo").val(datosFlujo.DESTINOS[i].DATOS[0].CODIGO)
                //  $("#" + idActual + " #txtUsuario").val(datosFlujo.DESTINOS[i].DATOS[0].USUA_ID)
                //TO DO: CAMBIAR A LLAMADA DE DESCRIPCION DESDE BD
                switch (datosFlujo.DESTINOS[i].DATOS[0].TIPO_DCTO) {
                    case "0009":
                        $("#" + idActual + " #txtTipoDctoReg").val("GUIA SALIDA")
                        break;
                    case "0050":
                        $("#" + idActual + " #txtTipoDctoReg").val("REMISION REMITENTE")
                        break;
                    case "0001":
                        $("#" + idActual + " #txtTipoDctoReg").val("FACTURA")
                        break;
                    case "0003":
                        $("#" + idActual + " #txtTipoDctoReg").val("BOLETA")
                        break;
                    case "0012":
                        $("#" + idActual + " #txtTipoDctoReg").val("TICKET")
                        break;
                    default:
                        $("#" + idActual + " #txtTipoDctoReg").val(datosFlujo.DESTINOS[i].DATOS[0].TIPO_DCTO)
                        break;
                }
                $("#" + idActual + " #txtSerieDctoReg").val(datosFlujo.DESTINOS[i].DATOS[0].NUM_SERIE_DCTO)
                $("#" + idActual + " #txtNroDctoReg").val(datosFlujo.DESTINOS[i].DATOS[0].NUM_DCTO)
                //TO DO: CAMBIAR A LLAMADA DE DESCRIPCION DESDE BD
                switch (datosFlujo.DESTINOS[i].DATOS[0].TIPO_DCTO_INTERNO) {
                    case "0009":
                        $("#" + idActual + " #txtTipoDctoInt").val("GUIA SALIDA")
                        break;
                    case "0050":
                        $("#" + idActual + " #txtTipoDctoInt").val("REMISION REMITENTE")
                        break;
                    case "0001":
                        $("#" + idActual + " #txtTipoDctoInt").val("FACTURA")
                        break;
                    case "0003":
                        $("#" + idActual + " #txtTipoDctoInt").val("BOLETA")
                        break;
                    case "0012":
                        $("#" + idActual + " #txtTipoDctoInt").val("TICKET")
                        break;
                    default:
                        $("#" + idActual + " #txtTipoDctoInt").val(datosFlujo.DESTINOS[i].DATOS[0].TIPO_DCTO_INTERNO)
                        break;
                }

                $("#" + idActual + " #txtSerieDctoInt").val(datosFlujo.DESTINOS[i].DATOS[0].REQC_NUM_SEQ_DOC_INTERNO)
                $("#" + idActual + " #txtNroDctoInt").val(datosFlujo.DESTINOS[i].DATOS[0].REQC_CODE_INTERNO)
                if (datosFlujo.DESTINOS[i].DATOS[0].TIPO_TRANS == "PRI") {
                    $("#txtTransporte").val("FLOTA");
                } else if (datosFlujo.DESTINOS[i].DATOS[0].TIPO_TRANS == "PUB") {
                    $("#txtTransporte").val("TRANSPORTISTA");
                } else {
                    $("#txtTransporte").val("OTRO");
                }
                $("#" + idActual + " #txtFechaEmision").val(datosFlujo.DESTINOS[i].DATOS[0].FECHA_EMISION.substr(0, 10))
                $("#" + idActual + " #txtFechaMovimiento").val(datosFlujo.DESTINOS[i].DATOS[0].FECHA_TRANS.substr(0, 10))
                $("#" + idActual + " #txtDestino").val(datosFlujo.DESTINOS[i].DATOS[0].RAZON_DEST)
                $("#" + idActual + " #txtDireccionDestino").val(datosFlujo.DESTINOS[i].DATOS[0].DIRECCION)

                $("#" + idActual + " #txtDespachador").val(datosFlujo.DESTINOS[i].DATOS[0].ENTREGAR_A)
                $("#" + idActual + " #txtMoneda").val($("#cboMoneda option[value='" + datosFlujo.DESTINOS[i].DATOS[0].MONEDA + "']").text())
                $("#" + idActual + " #txtGlosa").html(datosFlujo.DESTINOS[i].DATOS[0].CMNT_DCTO)
                
                //CargarDocumentosOrigen  
                if (datosFlujo.DESTINOS[i].DATOS[0].ORGN != null) {
                    var codigos = (datosFlujo.DESTINOS[i].DATOS[0].ORGN).split(",");
                    //    var series = (datosFlujo.DESTINOS[i].DATOS[0].DCTO_REF_SERIE).split(",");
                    //    var nros = (datosFlujo.DESTINOS[i].DATOS[0].DCTO_REF_NRO).split(",");
                } else {
                    var codigos = [];
                    var series = [];
                    var nros = [];
                }
                var c = 0;
                $("#" + idActual + " #divDctosOrigen").html("");
                for (var j = 0; j < codigos.length; j++) {
                    c++;
                    var str = ObtenerFilaOrigenDestino("ORIGEN_2", c, codigos[j]);
                    $("#" + idActual + " #divDctosOrigen").append(str);
                    //------
                    $("#" + idActual + " #txtCodDctoOrigen_" + c + "").val(codigos[j]);
                    if (codigos[j].search("K") != -1) {
                        $("#" + idActual + " #lblDctoOrigen_" + c + "").html("Orden de Compra");
                    } else if (codigos[j].search("Z") != -1) {
                        $("#" + idActual + " #lblDctoOrigen_" + c + "").html("Cotización");
                    } else if (codigos[j].search("A") != -1) {
                        $("#" + idActual + " #lblDctoOrigen_" + c + "").html("Salida de Almacén");
                    } else if (codigos[j].search("V") != -1) {
                        $("#" + idActual + " #lblDctoOrigen_" + c + "").html("Venta");
                    }
                }
            }
        } else if (id == "btnNotaCredito") {
            //*******************************************************
            //*******************************************************
            $("#bloqueNotaCredito").html("");
            if (datosNotas != null) {
                if (datosNotas.length > 0) {

                    var nroDctos = 0;
                    for (var i = 0; i < datosNotas.length; i++) {
                        //DIBUJAR CONTROLES------------
                        nroDctos++;
                        var idActual = "nc_" + nroDctos;
                        $("#bloqueNotaCredito").prepend('<div id="' + idActual + '"></div>');
                        $(formulario3).clone().appendTo("#" + idActual);
                        //-----------------------------

                        var strNotas = "";
                        var str = "AbrirDcto(\"" + datosNotas[i].CODIGO + "\")"
                        $("#" + idActual + "  #btnAbrirDcto0").attr('onclick', str).attr("title", "Ir a Documento");
                        $("#" + idActual + "  #txtCodigo").val(datosNotas[i].CODIGO)
                        $("#" + idActual + "  #txtUsuario").val(datosNotas[i].USUA_ID)
                        $("#" + idActual + "  #txtTipoDcto").val("NOTA DE CRÉDITO")
                        $("#" + idActual + "  #txtSerieDcto").val(datosNotas[i].SERIE)
                        $("#" + idActual + "  #txtNroDcto").val(datosNotas[i].NUMERO)
                        $("#" + idActual + "  #txtFechaEmision").val(datosNotas[i].EMISION)
                        $("#" + idActual + "  #txtCliente").val(datosNotas[i].RAZON_SOCIAL)
                        $("#" + idActual + "  #txtMoneda").val(datosNotas[i].MONEDA)
                        $("#" + idActual + "  #txtMontoTotal").val(formatoMiles(datosNotas[i].IMPORTE_TOTAL))
                        $("#" + idActual + "  #txtMontoUsable").val(formatoMiles(datosNotas[i].MONTO_USABLE))

                        //$("#" + idActual + "  #divDctosDestino").val(datosNotas[i].DESTINO_CODE);
                        $("#" + idActual + " #divDctosDestino").html("");
                        if (datosNotas[i].DESTINO_CODE != "") {
                            var str = ObtenerFilaOrigenDestino("DESTINO_2", 1, datosNotas[i].DESTINO_CODE);
                            $("#" + idActual + " #divDctosDestino").append(str);
                            //------
                            $("#" + idActual + " #txtCodDctoDestino_" + 1 + "").val(datosNotas[i].DESTINO_CODE);
                            $("#" + idActual + " #lblDctoDestino_" + 1 + "").html("Venta");
                        } else {
                            $("#" + idActual + " .divBorrableDest").remove();
                        }

                        //LINK ANULACION
                        if (datosNotas[i].CODIGO.search("BG") != -1) {
                            //Nota de crédito genérica
                            if (datosNotas[i].ANULADO_IND == "S") {
                                str = "AbrirDctoAnulacion(\"" + datosNotas[i].CODIGO + "\")"
                                $("#" + idActual + "  #btnAbrirDcto1")
                                 .css('display', "inline-block")
                                 .attr('onclick', str).attr("title", "Ir a Anulación");
                            } else {
                                $("#" + idActual + "  #btnAbrirDcto1").css('display', "none");
                            }
                        } else {
                            //Nota de crédito por devolución de productos
                            if (datosNotas[i].ANULADO_IND == "S") {
                                str = "AbrirDctoAnulacion(\"" + datosNotas[i].CODIGO + "\")"
                                $("#" + idActual + "  #btnAbrirDcto1")
                                 .css('display', "inline-block")
                                 .attr('onclick', str).attr("title", "Ir a Anulación");
                            } else {
                                $("#" + idActual + "  #btnAbrirDcto1").css('display', "none");
                            }
                        }
                    }
                }
            }
        } else if (id == "btnNotaDebito") {
            //*******************************************************
            //*******************************************************
            var dt = null;
            var nroDctos = 0;
            $("#bloqueNotaDebito").html("");
            for (var i = 0; i < datosNotasD.length; i++) {
                //DIBUJAR CONTROLES------------
                nroDctos++;
                var idActual = "nd_" + nroDctos;
                $("#bloqueNotaDebito").prepend('<div id="' + idActual + '"></div>');
                $(formulario4).clone().appendTo("#" + idActual);
                //-----------------------------
                var str = "AbrirDcto(\"" + datosNotasD[i].CODIGO + "\")"
                $("#" + idActual + " #btnAbrirDcto0").attr('onclick', str).attr("title", "Ir a Documento");
                $("#" + idActual + " #txtCodigo").val(datosNotasD[i].CODIGO)
                $("#" + idActual + " #txtUsuario").val(datosNotasD[i].USUA_ID)
                $("#" + idActual + " #txtTipoDcto").val("NOTA DE DEBITO")
                $("#" + idActual + " #txtSerieDcto").val(datosNotasD[i].SERIE)
                $("#" + idActual + " #txtNroDcto").val(datosNotasD[i].NUMERO)
                $("#" + idActual + " #txtFechaEmision").val(datosNotasD[i].EMISION)
                $("#" + idActual + " #txtCliente").val(datosNotasD[i].RAZON_SOCIAL)
                $("#" + idActual + " #txtMoneda").val(datosNotasD[i].MONEDA)
                $("#" + idActual + " #txtMontoTotal").val(datosNotasD[i].IMPORTE_TOTAL)
                $("#" + idActual + " #txtPagado").val(datosNotasD[i].PAGADO)
            }
        } else if (id == "btnDevolucionNotaCredito") {
            if (datosDevolucion != null && datosDevolucion.length > 0) {
                //cargado en : CargarDatosDctoDevolucion()  
            } else {
                $("#bloqueDevolucion").html("");
                $("#bloqueDevolucion").append('<div class="row-fluid">\
                                        <div class="span12 ">\
                                            <div class="control-group alert alert-info">\
                                                <label id="lblMensajeDespacho" class="control-label">\
                                                 No se encontraron datos</label>\
                                            </div>\
                                        </div>\
                                    </div>');
            }
        }
    } else {
        Desbloquear("ventana");
        BloquearSinGif("#bloqueFlujo");
        infoCustom2("No se ha encontrado el documento solicitado!");
        LimpiarGraficosFlujo()
    }
}

function LimpiarGraficosFlujo() {
    datosFlujo = null;
    $("#btnCotizacion").parents(".flujo").addClass("dsn");
    $("#btnOrdenCompra").parents(".flujo").addClass("dsn");
    $("#btnNotaCredito").parents(".flujo").addClass("dsn");
    $("#btnNotaDebito").parents(".flujo").addClass("dsn");
    $("#btnDevolucionNotaCredito").parents(".flujo").addClass("dsn");
    $(".divNumero").removeClass("completo anulado").addClass("incompleto");
    $("#btnVentaLista").parent().siblings(".divAdicional_1").removeClass("ventaRapida ventaNormal");


    $(".divAdicional_1").removeClass("despachado ventaRapida ventaNormal notaGen notaDev info despachoNaminsa despachoRapido");
    $(".divAdicional_2").removeClass("despachado ventaRapida ventaNormal notaGen notaDev info despachoNaminsa despachoRapido");
    $(".divAdicional_3").removeClass("despachado ventaRapida ventaNormal notaGen notaDev info despachoNaminsa despachoRapido");
}

function AbrirDcto(codigo) {
    if (codigo.search("K") != -1) {
        //("Orden de Compra");
        window.open("?f=NVMOCCL&codigo=" + codigo, '_blank');
    } else if (codigo.search("Z") != -1) {
        //("Cotización");
        window.open("?f=NVMCOTI&codigo=" + codigo, '_blank');
    } else if (codigo.search("A") != -1) {
        //("Guia Remisión");
        window.open("?f=NAMINSA&codigo=" + codigo, '_blank');
    } else if (codigo.search("V") != -1) {
        //("Venta");
        window.open("?f=NVMDOCV&codigo=" + codigo, '_blank');
    } else if (codigo.search("BG") != -1) {
        //("Nota Crédito Genérica");
        window.open("?f=CAMNGCL&codigo=" + codigo, '_blank');
    } else if (codigo.search("B") != -1) {
        //("Nota Crédito");
        window.open("?f=CAMNOCL&codigo=" + codigo, '_blank');
    } else if (codigo.search("D") != -1) {
        //("Nota Débito Cliente");
        window.open("?f=NVMNDAC&codigo=" + codigo, '_blank');
    }
}

function AbrirDctoAnulacion(codigo) {
    if (codigo.search("V") != -1) {
        //("Venta");
        window.open("?f=NVMANUL&codigo=" + codigo, '_blank');
    } else if (codigo.search("BG") != -1) {
        //("Nota Crédito Genérica");
        window.open("?f=CAMANCL&codigo=" + codigo, '_blank');
    } else if (codigo.search("B") != -1) {
        //("Nota Crédito");
        window.open("?f=CAMANCL&codigo=" + codigo, '_blank');
    }
}


var datosFlujo = null;
var datosNotas = null;
var datosNotasD = null;
var datosDevolucion = null
var CargarDatosFlujo = function (codigoVenta, ocultar) {
    if (ocultar!=undefined) {
        $("#modalMensaje").modal("hide");
    }
    LimpiarGraficosFlujo();

    var continuar = true;
    if (continuar) {
        var data = new FormData();
        data.append('OPCION', 'VER_FLUJO_2');
        data.append('TIPO_DCTO', $('#cboTipoDcto').val());
        data.append('CTLG_CODE', $('#cboEmpresa').val());
        data.append('SCSL_CODE', $('#cboEstablecimiento').val());
        data.append('FACC_CODE', codigoVenta);
        //data.append('p_USUA_ID', $("#ctl00_txtus").val());     
        //data.append('p_MONE_CODE', $("#cboMoneda").val());
        //data.append('p_DESDE', $("#txtDesde").val());
        //data.append('p_HASTA', $("#txtHasta").val());
        //data.append('p_VENDEDOR', $("#cboVendedor").val());
        Bloquear('ventana');
        $("#panelDocumento").slideUp();
        if (ajaxListado) {
            ajaxListado.abort();
        }
        ajaxListado = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLTDVE.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true,
            datatype: "json",
        }).success(function (datos) {
            datosFlujo = datos;
            ActualizarImagenesFlujo();
        }).error(function (msg) {
            if (msg.statusText != "abort") {
                noexito();
            }
        }).complete(function () {
            Desbloquear("ventana");
            $("#panelDocumento").slideDown();
        });
    }
}

function ActualizarImagenesFlujo() {
    //LIMPIAR DIVS ADICIONALES...
    $(".divAdicional_1").removeClass("despachado ventaRapida ventaNormal notaGen notaDev info despachoNaminsa despachoRapido");
    $(".divAdicional_2").removeClass("despachado ventaRapida ventaNormal notaGen notaDev info despachoNaminsa despachoRapido");
    $(".divAdicional_3").removeClass("despachado ventaRapida ventaNormal notaGen notaDev info despachoNaminsa despachoRapido");

    if (datosFlujo != null) {
        //CARGAR DATOS DETALLADOS DCTO
        $("#btnVentaLista").click();//Llama a CargarDatosDcto->CargarDatosDctoDetallado
        //----------------------------
        if (datosFlujo.CODIGO != undefined) {
            $("#lblDctoConsultado").html("[ " + datosFlujo.CODIGO + " ]  " + datosFlujo.DATOS[0].DOCUMENTO + "/" + datosFlujo.DATOS[0].DCTO_SERIE + "-" + datosFlujo.DATOS[0].DCTO_NRO);
            //Cargar Venta
            if (datosFlujo.DATOS[0].COMPLETO_IND == "S") {
                $("#btnVenta").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
                $("#btnVentaLista").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
            } else {
                $("#btnVenta").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
            }

            if (datosFlujo.DATOS[0].VENTA_RAPIDA_IND == "S") {
                $("#btnVentaLista").parent().siblings(".divAdicional_1")
                    .addClass("ventaRapida")
                    .attr("title", "Venta Rápida");
            } else {
                $("#btnVentaLista").parent().siblings(".divAdicional_1")
                    .addClass("ventaNormal")
                    .attr("title", "Venta Normal");
            }

            if (datosFlujo.DATOS[0].PAGADO_IND == "S") {
                $("#btnVentaCobrada").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
            }
            if (datosFlujo.DATOS[0].DESPACHADO_IND == "S") {
                $("#btnVentaDespachada").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
            }
            if (datosFlujo.DATOS[0].ANULADO == "SI") {
                $("#btnVentaLista").parent().siblings(".divNumero").removeClass("incompleto completo").addClass("anulado");
                //CON DEVOLUCIÓN DE PRODUCTOS
                if (datosFlujo.DATOS[0].ANULAC_DEVPROD_IND == "S") {
                    $("#btnVentaLista").parent().siblings(".divAdicional_2")
                         .addClass("info")
                         .attr("title", "Anulado CON devolución de Productos");
                } else {
                    $("#btnVentaLista").parent().siblings(".divAdicional_2")
                             .addClass("info")
                             .attr("title", "Anulado SIN devolución de Productos");
                }
                //CON DEVOLUCIÓN DE EFECTIVO - Esto debe consultarse en la pestaña de cobro
                //TO DO: CONSULTAR EL ESTADO DE DEVOLUCION DE EFECTIVO
                //if (datos[0].ANULAC_DEVPROD_IND == "N") {
                //    $("#btnVentaLista").parent().siblings(".divAdicional_2")
                //         .addClass("ventaNormal")
                //         .attr("title", "CON devolución de ");
                //} else {
                //    $("#btnVentaLista").parent().siblings(".divAdicional_2")
                //             .addClass("ventaNormal")
                //             .attr("title", "SIN devolución de Productos");
                //}
            }

            if (datosFlujo.DATOS[0].NOTA_CREDITO_IND == "S") {
                $("#btnNotaCredito").parents(".flujo").removeClass("dsn");
                $("#btnNotaCredito").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
            }

            for (var i = 0; i < datosFlujo.ORIGENES.length; i++) {
                //BUSCAR Cotizaciones
                if (datosFlujo.ORIGENES[i].DCTO == "COTIZACION") {
                    $("#btnCotizacion").parents(".flujo").removeClass("dsn");
                    $("#btnCotizacion").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
                }
                //BUSCAR Ordenes de Compra
                if (datosFlujo.ORIGENES[i].DCTO == "ORDEN_COMPRA") {
                    $("#btnOrdenCompra").parents(".flujo").removeClass("dsn");
                    $("#btnOrdenCompra").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
                    //BUSCAR Cotizaciones como origen de las ordenes de compra
                    for (var j = 0; j < datosFlujo.ORIGENES[i].ORIGENES.length; i++) {
                        if (datosFlujo.ORIGENES[i].ORIGENES[j].DCTO == "COTIZACION") {
                            $("#btnCotizacion").parents(".flujo").removeClass("dsn");
                            $("#btnCotizacion").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
                            break;
                        }
                    }
                }
            }

            //CARGAR DATOS COBRO   
            Bloquear("bloqueCobro");
            $("#divCobros").html("");
            if (ajaxCobros) {
                ajaxCobros.abort();
            }
            ajaxCobros = $.ajax({
                type: "POST",
                url: "vistas/cc/ajax/cclrfva.ashx?OPCION=4&p_FACTURA=" + datosFlujo.CODIGO,
                success: function (datos) {
                    $("#divCobros").html(datos);
                    $("#tblBandeja").addClass("tblCustom");
                },
                error: function (msg) {
                    if (msg.statusText != "abort") {
                        noexito();
                    }
                },
                complete: function () {
                    Desbloquear("bloqueCobro");
                    if (datosFlujo.CODIGO != undefined) {
                        var data = new FormData();
                        data.append('OPCION', 'INFO_EXTRA');
                        data.append('DCTO', "COBROS");
                        data.append('p_CODIGO_DCTO', "");
                        data.append('p_CODIGO_ORIGEN', datosFlujo.CODIGO);
                        data.append('p_TIPO_IND', "C");
                        if (ajaxCobros2) {
                            ajaxCobros2.abort();
                        }
                        ajaxCobros2 = $.ajax({
                            type: "POST",
                            url: "vistas/NV/ajax/NVLTDVE.ashx",
                            contentType: false,
                            data: data,
                            processData: false,
                            cache: false,
                            async: true,
                            datatype: "json",
                        }).success(function (datos) {
                            if (datos.length > 0) {
                                var strDetalles = "";
                                for (var i = 0; i < datos.length; i++) {
                                    strDetalles += "<tr>";
                                    strDetalles += "<td>" + datos[i].FECHA + "</td>";
                                    strDetalles += "<td>" + datos[i].PERSONA + "</td>";
                                    strDetalles += "<td>" + datos[i].MONTO_INGRESO_SOLES + "</td>";
                                    strDetalles += "<td>" + datos[i].MONTO_INGRESO_DOLARES + "</td>";
                                    strDetalles += "<td>" + datos[i].MONTO_EGRESO_SOLES + "</td>";
                                    strDetalles += "<td>" + datos[i].MONTO_EGRESO_DOLARES + "</td>";
                                    strDetalles += "<td>" + datos[i].CAJERO + "</td>";
                                    if (datos[i].ANULADO_IND == "S") {
                                        strDetalles += "<td style='background-color:red;color:white;'>SI</td>";
                                    } else {
                                        strDetalles += "<td>NO</td>";
                                    }
                                    if (datos[i].ANULADO_IND == "S") {
                                        strDetalles += "<td>" + ((datos[i].DEV_EFECTIVO_IND == "S") ? "SI" : "NO") + "</td>";
                                    } else {
                                        strDetalles += "<td>-</td>";
                                    }
                                    strDetalles += "</tr>";
                                }
                                var strTabla = '<table class="tblCustom" style="margin-top:10px;">\
                                                <caption>Movimientos Caja</caption><thead>\
                                                <tr>\
                                                    <th>FECHA</th>\
                                                    <th>PERSONA</th>\
                                                    <th>INGRESO S/.</th>\
                                                    <th>INGRESO $.</th>\
                                                    <th>EGRESO S/.</th>\
                                                    <th>EGRESO $.</th>\
                                                    <th>CAJERO</th>\
                                                    <th>ANULADO</th>\
                                                    <th>DEV. EFECTIVO</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody style="cursor: pointer">'+ strDetalles + '</tbody>\
                                        </table>';
                                $("#divCobros").append(strTabla);

                            }
                        }).error(function (msg) {
                            if (msg.statusText != "abort") {
                                noexito();
                            }
                        }).complete(function () {
                        });
                    }

                }
            });

            //BUSCAR Naminsa             
            //for (var i = 0; i < datosFlujo.DESTINOS.length; i++) {
            //    //BUSCAR NAMINSA_1 : GUIA DE REMISION Y DE SALIDA
            //    if (datosFlujo.DESTINOS[i].DCTO == "NAMINSA_1") {
            //        // $("#btnOrdenCompra").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
            //    }
            //    //BUSCAR NAMINSA_2 : FACTURA, BOLETA TICKET
            //    if (datosFlujo.DESTINOS[i].DCTO == "NAMINSA_2") {
            //        //  $("#btnOrdenCompra").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
            //    }
            //}

            //Cargar NotaCredito
            var data = new FormData();
            data.append('OPCION', 'INFO_EXTRA');
            data.append('DCTO', "NOTA_CREDITO");
            data.append('p_CODIGO_DCTO', "");
            data.append('p_CODIGO_ORIGEN', datosFlujo.CODIGO);
            data.append('p_TIPO_IND', "C");
            if (ajaxNotaCredito) {
                ajaxNotaCredito.abort();
            }
            ajaxNotaCredito = $.ajax({
                type: "POST",
                url: "vistas/NV/ajax/NVLTDVE.ashx",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true,
                datatype: "json",
            }).success(function (datos) {
                datosNotas = datos;
                if (datos.length > 0) {
                    $("#btnNotaCredito").parents(".flujo").removeClass("dsn");
                    var notaNoAnulada = -1;
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ANULADO_IND == "N") {
                            notaNoAnulada = i;
                            break;
                        }
                    }
                    if (notaNoAnulada == -1) {//TODAS ANULADAS, SE MUESTRA LA PRIMERA
                        notaNoAnulada = datos.length - 1;
                    }
                    //ICONO PARA LA NOTA DE CREDITO QUE NO ESTÉ ANULADA DE TODAS LAS POSIBLES OBTENIDAS:
                    $("#btnNotaCredito").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
                    if (datos[notaNoAnulada].ANULADO_IND == "S") {
                        $("#btnNotaCredito").parent().siblings(".divNumero").removeClass("incompleto completo").addClass("anulado");
                    }
                    if (datos[notaNoAnulada].CODIGO.search("BG") != -1) {
                        $("#btnNotaCredito").parent().siblings(".divAdicional_1").addClass("notaGen").attr("title", "N.C. Genérica");
                    } else {
                        $("#btnNotaCredito").parent().siblings(".divAdicional_1").addClass("notaDev").attr("title", "N.C. Devolución");
                        //DESPACHADO POR NAMINSA O EN LA MISMA PANTALLA
                        if (datos[notaNoAnulada].ENTREGA_DESPACHO_ALMACEN == "N") {
                            $("#btnNotaCredito").parent().siblings(".divAdicional_2").addClass("despachoRapido").attr("title", "Despacho Rápido");
                        } else {
                            $("#btnNotaCredito").parent().siblings(".divAdicional_2").addClass("despachoNaminsa").attr("title", "Despacho por Almacén");
                            CargarDatosDctoDevolucion(datos[notaNoAnulada].CODIGO, datos[notaNoAnulada].ANULADO_IND);
                            //ICONO PARA DESPACHADO O NO
                            if (datos[notaNoAnulada].DESPACHADO_IND == "S" && datos[notaNoAnulada].ANULADO_IND == "N") {
                                $("#btnDevolucionNotaCredito").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
                                $("#btnDevolucionNotaCredito").parent().siblings(".divAdicional_1").addClass("despachado").attr("title", "Despachado");;
                            } else {
                                $("#btnDevolucionNotaCredito").parent().siblings(".divNumero").removeClass("completo anulado").addClass("incompleto");
                                $("#btnDevolucionNotaCredito").parent().siblings(".divAdicional_1").addClass("despachoNaminsa").attr("title", "No despachado");;
                            }
                        }
                    }
                }
                if (datos.length > 1) {//Cuando hay 2 ó más notas de crédito
                    $("#btnNotaCredito").parent().siblings(".divAdicional_3").addClass("info").attr("title", "Existen varias Notas de Crédito asociadas");

                }

            }).error(function (msg) {
                if (msg.statusText != "abort") {
                    noexito();
                }
            }).complete(function () {
            });

            //Cargar NotaDebito
            var data2 = new FormData();
            data2.append('OPCION', 'INFO_EXTRA');
            data2.append('DCTO', "NOTA_DEBITO");
            data2.append('p_CODIGO_DCTO', "");
            data2.append('p_CODIGO_ORIGEN', datosFlujo.CODIGO);
            data2.append('p_TIPO_IND', "C");
            if (ajaxNotaDebito) {
                ajaxNotaDebito.abort();
            }
            ajaxNotaDebito = $.ajax({
                type: "POST",
                url: "vistas/NV/ajax/NVLTDVE.ashx",
                contentType: false,
                data: data2,
                processData: false,
                cache: false,
                async: true,
                datatype: "json",
            }).success(function (datos) {
                datosNotasD = datos;
                if (datos.length > 0) {
                    $("#btnNotaDebito").parents(".flujo").removeClass("dsn");
                    $("#btnNotaDebito").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");

                }
            }).error(function (msg) {
                if (msg.statusText != "abort") {
                    noexito();
                }
            }).complete(function () {
            });

        } else {
            $("#lblDctoConsultado").html("")
        }
    }
}

function CargarDatosDctoDevolucion(codigoNotaCredito, anuladoInd) {
    //CARGA LOS DATOS DE NAMINSA REFERIDO A LA DEVOLUCION DE PRODUCTOS POR NOTA DE CREDITO
    $("#btnDevolucionNotaCredito").parents(".flujo").removeClass("dsn");

    Bloquear("bloqueDevolucion");
    var data2 = new FormData();
    data2.append('OPCION', 'INFO_EXTRA');
    data2.append('DCTO', "NAMINSA");
    data2.append('p_CODIGO_DCTO', "");
    data2.append('p_CODIGO_ORIGEN', codigoNotaCredito);
    data2.append('p_TIPO_IND', "C");
    if (ajaxDev) {
        ajaxDev.abort();
    }
    ajaxDev = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLTDVE.ashx",
        contentType: false,
        data: data2,
        processData: false,
        cache: false,
        async: true,
        datatype: "json",
    }).success(function (datos) {
        datosDevolucion = datos;
        if (datos.length > 0) {
            var strDetalles = "";
            for (var i = 0; i < datos.length; i++) {
                strDetalles += "<tr>";
                strDetalles += "<td style='text-align:center;'>" + datos[i].EMISION.substr(0, 10) + "</td>";
                strDetalles += "<td style='text-align:center;'>" + datos[i].MOVIMIENTO + "</td>";
                strDetalles += "<td style='text-align:center;'>" + datos[i].CODIGO + "</td>";
                strDetalles += '<td style="text-align:center;"><a href="?f=NAMINSA&codigo=' + datos[i].CODIGO + '" target="_blank" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a></td>';
                strDetalles += "</tr>";
                if (anuladoInd == "S") {
                    $("#btnDevolucionNotaCredito").parent().siblings(".divNumero").removeClass("incompleto completo").addClass("anulado");
                } else {
                    if (datos[i].COMPLETO_IND == "S") {
                        $("#btnDevolucionNotaCredito").parent().siblings(".divNumero").removeClass("incompleto anulado").addClass("completo");
                    }
                }
            }
            var strTabla = '<table class="tblCustom" style="margin-top:10px;">\
                                                <caption>Documentos Asociados [<small> ' + codigoNotaCredito + ' </small>]</caption><thead>\
                                                <tr>\
                                                    <th>FECHA EMISION</th>\
                                                    <th>MOVIMIENTO</th>\
                                                    <th>CODIGO</th>\
                                                    <th>#</th>\
                                                </tr>\
                                            </thead>\
                                            <tbody style="cursor: pointer">'+ strDetalles + '</tbody>\
                                        </table>';
            $("#bloqueDevolucion").html("");
            $("#bloqueDevolucion").append(strTabla);

        }
    }).error(function (msg) {
        if (msg.statusText != "abort") {
            noexito();
        }
    }).complete(function () {
        Desbloquear("bloqueDevolucion");
    });
}

function ObtenerFilaOrigenDestino(origenDestino, c, codigo) {
    var str = ""
    if (origenDestino == "ORIGEN") {   //VENTA, COTIZACION, ORDEN_COMPRA
        str = ('<div class="span12 divDctoOrigenExtra">\
                    <div class="span4">\
                        <div class="control-group">\
                            <label id="lblDctoOrigen_' + c + '" class="control-label"></label>\
                        </div>\
                    </div>\
                    <div class="span6">\
                        <div class="control-group">\
                            <div class="controls">\
                                <input id="txtCodDctoOrigen_' + c + '" class="txtCodDctoOrigen inputOrigen" type="hidden" />\
                                <input id="txtSerieDctoOrigen_' + c + '" class="txtSerieDctoOrigen inputOrigen span4" type="text" disabled style="text-align: center"/>\
                                <input id="txtNroDctoOrigen_' + c + '" class="txtNroDctoOrigen inputOrigen span8" type="text" style="margin-left:0px !important;text-align: center" disabled/>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="span2">\
                        <div class="control-group">\
                            <div class="controls">\
                                <a onclick="AbrirDcto(\'' + codigo.trim() + '\')" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>\
                            </div>\
                        </div>\
                    </div>\
                </div>');
    } else if (origenDestino == "DESTINO") {//VENTA
        str = ('<div class="span12 divDctoDestinoExtra">\
                    <div class="span4">\
                        <div class="control-group">\
                            <label id="lblDctoDestino_' + c + '" class="control-label"></label>\
                        </div>\
                    </div>\
                    <div class="span6">\
                        <div class="control-group">\
                            <div class="controls">\
                                <input id="txtCodDctoDestino_' + c + '" class="txtCodDctoDestino inputDestino" type="hidden" />\
                                <input id="txtSerieDctoDestino_' + c + '" class="txtSerieDctoDestino inputDestino span4" type="text" disabled style="text-align: center"/>\
                                <input id="txtNroDctoDestino_' + c + '" class="txtNroDctoDestino inputDestino span8" type="text" style="margin-left:0px !important;text-align: center" disabled/>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="span2">\
                        <div class="control-group">\
                            <div class="controls">\
                                <a onclick="AbrirDcto(\'' + codigo.trim() + '\')" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>\
                            </div>\
                        </div>\
                    </div>\
                </div>');
    } else if (origenDestino == "ORIGEN_2") {//VENTA DESPACHADA
        str = ('<div class="span12 divDctoOrigenExtra">\
                <div class="span4">\
                    <div class="control-group">\
                        <label id="lblDctoOrigen_' + c + '" class="control-label"></label>\
                    </div>\
                </div>\
                <div class="span6">\
                    <div class="control-group">\
                        <div class="controls">\
                            <input id="txtCodDctoOrigen_' + c + '" class="txtCodDctoOrigen inputOrigen span8" type="text" disabled="disabled"/>\
                        </div>\
                    </div>\
                </div>\
                <div class="span2">\
                    <div class="control-group">\
                        <div class="controls">\
                            <a onclick="AbrirDcto(\'' + codigo.trim() + '\')" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>\
                        </div>\
                    </div>\
                </div>\
            </div>');
    } else if (origenDestino == "DESTINO_2") {//DESTINO NOTA CREDITO
         str = ('<div class="span12 divDctoDestinoExtra">\
                <div class="span4">\
                    <div class="control-group">\
                        <label id="lblDctoDestino_' + c + '" class="control-label"></label>\
                    </div>\
                </div>\
                <div class="span6">\
                    <div class="control-group">\
                        <div class="controls">\
                            <input id="txtCodDctoDestino_' + c + '" class="txtCodDctoDestino inputDestino span8" type="text" disabled="disabled"/>\
                        </div>\
                    </div>\
                </div>\
                <div class="span2">\
                    <div class="control-group">\
                        <div class="controls">\
                            <a onclick="AbrirDcto(\'' + codigo.trim() + '\')" class="btn blue buscar"><i class="icon-external-link" style="line-height: initial;"></i></a>\
                        </div>\
                    </div>\
                </div>\
            </div>');
    }
    return str;
}

function ImprimirDcto() {
    var estilos = '<style id="styleImpresion">@media print{.navbar-inner{display:none!important}.page-sidebar{display:none!important}.footer{display:none!important}.page-content{margin-left:0!important}#gritter-notice-wrapper{display:none!important}#contenedor{display:none!important}#contenedorBreadcrumb{display:none!important}.page-container{margin-top:0!important}#divDctoImprimir{display:block!important;width:100%!important;line-height:11px!important;font-family:Arial!important}.container-fluid{padding:0!important}.dn,.btn{display:none !important;}}</style>';
    if ($("#styleImpresion").val() == undefined) {
        $("#ventana").append(estilos);
    }
    $("#divDctoImprimir").append($("#divConsultado").clone());
    $("#divDctoImprimir").append($("#bloqueFlujo").clone());
    $("#divDctoImprimir").append($("#panelDocumento").clone());
    setTimeout(function () {
        window.print();
        $("#divDctoImprimir").html("");
    }, 200);
}


var click = function (d) {
    window.open(d.url, '_blank');
}
//------------

var CollapsibleTree = function (elt) {
    $('#txtInfo').text('Click en un cuadro para navegar hacia el documento.');

    var m = [20, 120, 20, 120],
        w = 500,
        h = parseFloat($("#divImprimir").css("width")),
        i = 0,
        root,
        root2;

    var tree = d3.layout.tree()
        //.size([h, w]);
        .size([w, h]);

    // var diagonal = d3.svg.diagonal()
    //     .projection(function(d) { return [d.y, d.x]; });

    var parentdiagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.x + 20, -d.y - 20]; });

    var childdiagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.x + 20, d.y + 20]; });

    var vis = d3.select(elt).append("svg:svg")
       .attr("width", h + m[1] + m[3])
       .attr("height", w + m[0] + m[2])
       .append("svg:g")
       // .attr("transform", "translate(" + m[3] + "," + m[0] + ")"); // left-right
       // .attr("transform", "translate(" + m[0] + "," + m[3] + ")"); // top-bottom
       .attr("transform", "translate(" + (h + m[1]) / 2 + ",0) rotate(90)");


    var that = {
        init: function (url) {
            var that = this;
            d3.json(url, function (json) {
                root = json;

                // root.x0 = h / 2;
                // root.y0 = 0;
                root.x0 = w / 2;
                root.y0 = h / 2;

                // Initialize the display to show a few nodes.
                root.children.forEach(that.toggleAll);
                // that.toggle(root.children[1]);
                // that.toggle(root.children[1].children[2]);
                // that.toggle(root.children[9]);
                // that.toggle(root.children[9].children[0]);

                // that.updateParents(root);
                // that.updateChildren(root);
                that.updateBoth(root);
            });
        },
        init2: function (json) {
            var that = this;
            root = json;

            root.x0 = w / 2;
            root.y0 = h / 2;
            //  root.children.forEach(that.toggleAll);
            that.updateBoth(root);
        },
        updateBoth: function (source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 120; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); })

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
               .on("click", click);


            var rects = nodeEnter.append("rect")
             .attr("width", "10px").attr("height", "10px")
             //x abajo -x arriba
             //y derecha -y izquierda
             .attr("x", function (d) {
                 if (that.isParent(d)) {
                     //derecha
                     return 15;
                 } else {
                     if (d != root) {
                         //izquierda
                         return 15;
                     } else {
                         //root
                         return 15;
                     }
                 }
             })
             .attr("y", function (d) {
                 if (that.isParent(d)) {
                     //derecha
                     return -25;
                 } else {
                     if (d != root) {
                         //izquierda
                         return 15;
                     } else {
                         //root
                         return -5;
                     }
                 }
             })
             .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; })
             .style("stroke", function (d) { return d.type; });


            nodeEnter.append("svg:text")
                .attr("dy", ".35em")
                //.attr("y", function (d) { return d.children || d._children ? 10 : -10; })
                //.attr("x", function (d) { return d.children || d._children ? -10 : 10; })
                .attr("text-anchor", function (d) {
                    if (that.isParent(d)) {
                        return "end";
                    } else {
                        return d.children || d._children ? "end" : "start";
                    }
                })
                .attr("transform", function (d) {
                    if (that.isParent(d)) {
                        //derecha
                        //+y izquieda
                        //+x abajo
                        return "translate(25,-55) rotate(-90)";
                    } else {
                        if (d != root) {
                            return "translate(25,35) rotate(-90)";
                        } else {
                            //+y izquieda
                            //+x abajo
                            return "translate(25,-25) rotate(-90)";
                        }
                    }
                })
                //.text(function (d) { return d.name; })
                 .html(function (d) {
                     //return '<tspan x="-10" dy="1em">' + d.documento + '</tspan><tspan x="-10" dy="1em">' + d.name + '</tspan>';
                     return '<tspan x="-10" dy="1em">' + d.documento + '</tspan><tspan x="-10" dy="1em">' + d.numero + '</tspan><tspan x="-10" dy="1em">' + d.name + '</tspan>';
                 })
                .style("fill-opacity", 1e-6);


            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    if (that.isParent(d)) {
                        return "translate(" + d.x + "," + -d.y + ")";
                    } else {
                        return "translate(" + d.x + "," + d.y + ")";
                    }
                });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links_parents(nodes).concat(tree.links(nodes)), function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    if (that.isParent(d.target)) {
                        return parentdiagonal({ source: o, target: o });
                    } else {
                        // return parentdiagonal({source: o, target: o});
                        return childdiagonal({ source: o, target: o });
                    }
                })
              .transition()
                .duration(duration)
                // .attr("d", parentdiagonal);
                .attr("d", function (d) {
                    if (that.isParent(d.target)) {
                        return parentdiagonal(d);
                    } else {
                        // return parentdiagonal(d);
                        return childdiagonal(d);
                    }
                })

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                // .attr("d", parentdiagonal);
                .attr("d", function (d) {
                    if (that.isParent(d.target)) {
                        return parentdiagonal(d);
                    } else {
                        return childdiagonal(d);
                    }
                })

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    // return parentdiagonal({source: o, target: o});
                    if (that.isParent(d.target)) {
                        return parentdiagonal({ source: o, target: o });
                    } else {
                        return childdiagonal({ source: o, target: o });
                    }
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },
        updateParents: function (source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                // .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
                .on("click", function (d) { that.toggle(d); that.updateParents(d); });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                .text(function (d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + d.x + "," + -d.y + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    return parentdiagonal({ source: o, target: o });
                })
              .transition()
                .duration(duration)
                .attr("d", parentdiagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", parentdiagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    return parentdiagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },
        updateChildren: function (source) {
            var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // Compute the new tree layout.
            var nodes = tree.nodes(root2).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                // .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
                .on("click", function (d) { that.toggle(d); that.updateChildren(d); });

            nodeEnter.append("svg:circle")
                .attr("r", 1e-6)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("svg:text")
                .attr("x", function (d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
                .text(function (d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                // .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = vis.selectAll("path.link")
                .data(tree.links(nodes), function (d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("svg:path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    return childdiagonal({ source: o, target: o });
                })
              .transition()
                .duration(duration)
                .attr("d", childdiagonal);

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", childdiagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    return childdiagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        },

        isParent: function (node) {
            if (node.parent && node.parent != root) {
                return this.isParent(node.parent);
            } else
                // if ( node.name == 'data' || node.name == 'scale' || node.name == 'util' ) {
                if (node.isparent) {
                    return true;
                } else {
                    return false;
                }
        },

        // Toggle children.
        toggle: function (d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            if (d.parents) {
                d._parents = d.parents;
                d.parents = null;
            } else {
                d.parents = d._parents;
                d._parents = null;
            }
        },
        toggleAll: function (d) {
            if (d.children) {
                d.children.forEach(that.toggleAll);
                that.toggle(d);
            }
            if (d.parents) {
                d.parents.forEach(that.toggleAll);
                that.toggle(d);
            }
        }

    }

    return that;
}

//EMAIL
function cargarCorreos() {
    ObtenerCorreoUsuario();
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
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

var ObtenerCorreoUsuario = function () {
    var email = "";
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ashx?OPCION=RU&ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                email = datos[0].EMAIL;
            } else {
                alertInfo("No se encontro ningun email para remitente!");
            }
        },
        complete: function () {
            $("#txtRemitente").val(email);
        },
        error: function (msg) {
            alert(msg);
        }
    });
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
        data.append('HTMLMENSAJE', $("#datos_correo").html() + $(".divTblCustom").html().replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;').split('height: 0px;').join().split('height:0').join());
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
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

$("#divMail").on("show", function () {

    $("#modal_info").modal("hide");

});

$(".close_mail").on("click", function () {

    $("#modal_info").modal("show");

});

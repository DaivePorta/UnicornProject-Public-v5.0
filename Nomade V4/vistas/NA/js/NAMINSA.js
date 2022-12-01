/*
EN SALIDA
- Venta Nacional
    - Solo se listan ventas completas, no anuladas, que no tengan nota de credito, que no esten totalmente despachadas,
    todas las que son al credito, si son al contado sólo se listan si están pagadas
*/
var empresa = {};

var correlativo = [];

var tipos_mov = [];

var documentos = []; 

var correlativoInterno = [];

var arr = [];
var series = [];

var tabla_det;
var posicion;
var productos = [];
var empleados = [];


var json_datos_imp = null;//almacena los dastoas para imprimir
var jsonlineas_gui = null;//nro de lineas que se pueden imprimir en una sola guia de remision

var ajaxProducto = null;
var vAsientoContable = null;
const sCodModulo = "0004"; // Código del módilo de almacen para contabilidad.

var jsonClientes = [];

//PARAMETROS NUEVOS
var prmtDIGI = 0;//VALIDA STOCK ANTES DE AGREGAR A DETALLES
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE
var prodSeriado = "";
var token_migo = '';//dporta
var prmtCCST = '0201';
var NALINSA = function () {
    var plugins = function () {
        $('#cbo_empresa_l, #cbo_Almc, #cboCodigoProducto, #cboProducto').select2();
        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });
        fnSetRangoDatePickerMesHoy('txtDesde', 'txtHasta', true);
    }

    var crearTablaVacia = function () {
        $("#tabla_det").css({ "font-size": "11.5px" });
        var parms = {
            data: null,
            columns: [
                {
                    data: "COMPLETO", createdCell: function (cell, cellData) {
                        $(cell).css('text-align', 'center');
                        var html = (cellData === 'COMPLETO') ? '<i class="icon-ok" style="color: green"></i>' : '<i class="icon-pushpin" style="color: red"></i>';
                        $(cell).html(html);
                    }
                },
                { data: "CODIGO", createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '1%' },
                { data: "RETORNO", createdCell: function (cell) { $(cell).css('text-align', 'center'); }},
                { data: "TIPO_MOVIMIENTO", createdCell: function (cell) { $(cell).css('text-align', 'center'); }},
                { data: 'MONEDA', createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "ALMACEN", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "RAZON_DEST", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "DIRECCION", width: '50%' },
                { data: "FECHA_EMISION", createdCell: function (cell) { $(cell).css('text-align', 'center'); }, type: "fecha" },
                { data: "TIPO_DCTO", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "REQC_NUM_SEQ_DOC", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "REQC_CODE", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "TRANSPORTISTA" },
                { data: "NOMBRE_USUARIO", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "ASIENTO" ,createdCell: function (cell) { $(cell).css('text-align', 'center'); }},
                { data: "CMNT_DCTO" },
                { data: "PESO_TOTAL", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                { data: "COSTO_TOTAL", createdCell: function (cell) { $(cell).css('text-align', 'center'); } },
                {
                    data: null,
                    defaultContent: '',
                    createdCell: function (cell, cellData, row) {
                        if (row.DIRECCION != "") {
                            $(cell).append('<a class="btn glocat red" style="background-color:#b21414"><i class="icon-map-marker"></i></a>');
                        }
                        if (row.COMPLETO != 'COMPLETO') {
                            $(cell).append('<a class="btn red delete" style="margin: 1pc;"><i class="icon-trash"></i></a>');
                        }
                        if (row.COMPLETO == "COMPLETO" && row.TIPO_DOCU == "0009" && row.ELECTRONICO_IND == 'S') {// PARA QUE APAREZCA EL ICONO DE IMPRIMIR SOLO EN GUIA DE REMISION ELECTRÓNICA
                            $(cell).append("<a class='btn blue' style='margin: 1pc;' onclick=\"ImprimirGuiaRemisionElectonicaNalinsa('" + row.CODIGO + "','" + row.CTLG_CODE + "')\"><i class='icon-print'></i></a>");
                        }
                        $(cell).css('text-align', 'center');
                    }
                }
            ],
            stateSave: false,
            "sDom": 'TC<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            order: [[1, "desc"]]
        }

        oTable = iniciaTabla('tabla_det', parms);

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $(".DTTT.btn-group").css({ "float": "right" });

        $('#tabla_det').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $("#tabla_det tr.selected").removeClass('selected');
                $(this).addClass('selected');
                var row = $("#tabla_det").DataTable().row(this).data();
                var code = row.CODIGO;
                window.open("?f=naminsa&codigo=" + code, '_blank');
            }
        });

        $('#tabla_det').on('click', '.delete', function (e) {
            var codigo = $('#tabla_det').DataTable().row($(this).parents('tr')).data().CODIGO;
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            posicion = pos;
            var validar = validarNaminsa(codigo);
            Bloquear('ventana');

            if (validar === 1) {
                infoCustom2('El documento ya ha sido completado, se actualizara el listado.');
                setTimeout(function () { filtrar(); }, 100);
                Desbloquear('ventana');
            } else {
                $.ajax({
                    type: 'post',
                    url: 'vistas/NA/ajax/NAMINSA.ashx?OPCION=ELIMINAR_DCTO_ALMACEN',
                    data: { ISAC_CODE: codigo }
                }).done(function (data) {
                    if (data === 'OK') {
                        exito();
                        oTable.fnDeleteRow(posicion);
                        //setTimeout(function () { filtrar(); }, 100);
                    }
                    Desbloquear('ventana');
                }).fail(function () {
                    noexito();
                    Desbloquear('ventana');
                });
            }
        });

        $('#tabla_det').on('click', '.glocat', function (e) {
            var lat_long = $('#tabla_det').DataTable().row($(this).parents('tr')).data().LAT_LONG;
            var destino = $('#tabla_det').DataTable().row($(this).parents('tr')).data().RAZON_DEST;
            var direccion = $('#tabla_det').DataTable().row($(this).parents('tr')).data().DIRECCION;
            var vLatitud = "";
            var vLongitud = "";
            var vTitulo = destino;
            $("#mapaModal").modal('show');

            if (lat_long !== "" && lat_long !==undefined) {
                vLatitud = lat_long.split(",")[0];
                vLongitud = lat_long.split(",")[1];

            }
            
            if (!flagCargaPlugMaps) {
                $.getScript("//maps.googleapis.com/maps/api/js?key=AIzaSyCQ22NAvgA2_s8S1xRmR7YQZXsk_PejW1Q")
                    .always(Bloquear("map"), "Cargando")
                    .done(function (script, textStatus) {
                        $.getScript("../../recursos/plugins/gmaps.js")
                            .done(function (script, textStatus) {
                                map = new GMaps({
                                    div: '#map',
                                    lat: -12.043333,
                                    lng: -77.028333
                                });
                                if (vLatitud === "" || vLongitud === "") {
                                    BuscarPorNombre(direccion, vTitulo);
                                } else {

                                    map.setCenter(vLatitud, vLongitud);
                                    map.addMarker({
                                        lat: vLatitud,
                                        lng: vLongitud,
                                        title: vTitulo,
                                        infoWindow: {
                                            content: '<p>' + vTitulo + '</p>'
                                        }
                                    });
                                }

                            });
                    });

                flagCargaPlugMaps |= 1;
            } else {
                if (map.markers.length > 0) {
                    x = map.markers[0];
                } else {
                    x = map.addMarker({
                        lat: 0,
                        lng: 0,
                        title: vTitulo,
                        infoWindow: {
                            content: '<p>' + vTitulo + '</p>'
                        }
                    });
                }

                if (vLatitud === "" || vLongitud === "") {
                    BuscarPorNombre(direccion, vTitulo);
                } else {
                    map.setCenter(vLatitud, vLongitud);
                    x.setPosition(new google.maps.LatLng(vLatitud, vLongitud));
                }
            }
        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = table.column($(this).attr('data-column'));
            column.visible(!column.visible());
        });
    };

    var validarNaminsa = function (codigo) {
        var data = new FormData();

        let iValor = -1;
        data.append('ISAC_CODE', codigo);

        $.ajax({
            type: "POST",
            url: 'vistas/NA/ajax/NAMINSA.ashx?OPCION=ESTADO_NAMINSA',
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                if (datos[0].ESTADO === 'S')
                    iValor = 1;
                else
                    iValor = 0;
            },
            error: function () {
                noexito();
            }
        });
        return iValor;
    }


    var filtrar = function () {
        var data = new FormData();
        var CTLG_CODE = $('#cbo_empresa_l').val();
        var SCSL_CODE = $('#cbo_Almc').val();
        var PROD_CODE = $('#txtCodigoProducto').val();
        var fDesde = $('#txtDesde').val();
        var fHasta = $('#txtHasta').val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('COD_ALMC', SCSL_CODE);
        data.append('PROD_CODE', PROD_CODE);
        data.append('F_DESDE', fDesde);
        data.append('F_HASTA', fHasta);

        $.ajax({
            type: "POST",
            url: 'vistas/na/ajax/naminsa.ashx?OPCION=L',
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            beforeSend: function () { Bloquear("div_tabla_dctos"); },
            cache: false,
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                } else {
                    infoCustom2("No se encontraron datos!");
                }
            },
            complete: function () { Desbloquear("div_tabla_dctos"); },
            error: function () {
                Desbloquear("div_tabla_dctos");
                noexito();
            }
        });

    }

    var filtrarCabecera = function () {
        var data = new FormData();
        var CTLG_CODE = $('#cbo_empresa_l').val();
        var SCSL_CODE = $('#cbo_Almc').val();
        var PROD_CODE = $('#txtCodigoProducto').val();
        var fDesde = $('#txtDesde').val();
        var fHasta = $('#txtHasta').val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('COD_ALMC', SCSL_CODE);
        data.append('PROD_CODE', PROD_CODE);
        data.append('F_DESDE', fDesde);
        data.append('F_HASTA', fHasta);

        $.ajax({
            type: "POST",
            url: 'vistas/na/ajax/naminsa.ashx?OPCION=LC',
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            //beforeSend: function () { Bloquear("div_tabla_dctos"); },
            cache: false,
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                } else {
                    infoCustom2("No se encontraron datos!");
                }
            },
            //complete: function () { Desbloquear("div_tabla_dctos"); },
            error: function () {
                //Desbloquear("div_tabla_dctos");
                noexito();
            }
        });

    }

    var fillCboempresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_empresa_l').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_empresa_l').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar empresas.');
            }
        });
    }

    var listarAlmacenesListado = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + ctlg + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_Almc').html('<option value="">TODOS</option>');
                if (datos != null) {
                    if (datos[0].CODIGO != "" && datos[0].DESCRIPCION != "") {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbo_Almc').append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].SCSL_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar almacenes.');
            }
        });

    }

    var cargarProductos = function () {
        //Bloquear("divProducto");
        if (ajaxProducto) {
            ajaxProducto.abort();
        }
        ajaxProducto = $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTOS_NAM",
            cache: false,
            data: { CTLG_CODE: $('#cbo_empresa_l').val(), SCSL_CODE: ($('#cbo_Almc :selected').attr('data-scsl-code') === undefined ? "" : $('#cbo_Almc :selected').attr('data-scsl-code')), MONEDA: "0002" },
            datatype: "json",
            async: true
        }).done(function (data) {
            //Desbloquear("divProducto");

            if (data !== null) {
                $('#txtCodigoAntiguoProducto').typeahead({
                    items: 50,
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < data.length; i++) {
                            array.push(data[i].CODIGO_ANTIGUO);
                            obj += '{';
                            obj += '"DESC_ADM":"' + data[i].DESC_ADM + '","CODIGO":"' + data[i].CODIGO + '","CODIGO_ANTIGUO":"' + data[i].CODIGO_ANTIGUO + '"';
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
                        $("#txtCodigoProducto").val(map[item].CODIGO);
                        $("#txtNombreProducto").val(map[item].DESC_ADM);
                        //datatable();
                        filtrar();
                        return item;
                    },
                }).keyup(function () {
                    if ($(this).val().trim().length === 0) {
                        $("#txtCodigoProducto, #txtNombreProducto").val('');
                        //datatable();
                    }
                });

                $('#txtNombreProducto').typeahead({
                    items: 50,
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < data.length; i++) {
                            array.push(data[i].DESC_ADM);
                            obj += '{';
                            obj += '"DESC_ADM":"' + data[i].DESC_ADM + '","CODIGO":"' + data[i].CODIGO + '","CODIGO_ANTIGUO":"' + data[i].CODIGO_ANTIGUO + '"';
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
                        $("#txtCodigoProducto").val(map[item].CODIGO);
                        $("#txtCodigoAntiguoProducto").val(map[item].CODIGO_ANTIGUO);
                        //datatable();
                        filtrar();
                        return item;
                    },
                }).keyup(function () {
                    if ($(this).val().trim().length === 0) {
                        $("#txtCodigoProducto, #txtCodigoAntiguoProducto").val('');
                        //datatable();
                    }
                });
            }
        }).fail(function () {
            //Desbloquear("divProducto");
            if (msg.statusText != "abort") {
                alertCustom('Error al listar productos.');
            }
        });
    };

    var eventoControles = function () {
        $('#cbo_empresa_l').on('change', function () {
            //cargarProductos();
            listarAlmacenesListado($(this).val());
            $('#cbo_Almc').select2('val', '').change();
            //filtrar();
        });

        $('#cbo_Almc').on('change', function () {
            $('#cboCodigoProducto').select2('val', '');
            $('#cboProducto').select2('val', '');
            filtrarCabecera();
            cargarProductos();
        });

        $('#cboCodigoProducto').change(function () {
            $('#cboProducto').select2('val', $(this).val()).change();
        });

        $('#cboProducto').change(function () {
            $('#cboCodigoProducto').select2('val', $(this).val());
            filtrar();
        });
        $("#btnFiltrar").click(function () {
            if ($('#txtCodigoAntiguoProducto').val() === '')
                filtrarCabecera();
            else
                filtrar();
        });
    }

    flagCargaPlugMaps = false;
    
    function BuscarPorNombre(direccion, vTitulo) {
        direccion = direccion === "" ? "lima-peru" : direccion;
        GMaps.geocode({
            address: direccion,
            callback: function (results, status) {
                if (status == 'OK') {
                    var latlng = results[0].geometry.location;
                    map.setCenter(latlng.lat(), latlng.lng());
                    if (map.markers.length == 0) {
                        map.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng(),
                            draggable: true,
                            title: vTitulo,
                            dragend: function () {
                                $("#mapaModal").modal("hide");
                                $("#modalGConfirmacion").modal("show");
                                vNewLat = this.getPosition().lat();
                                vNewLng = this.getPosition().lng();
                            },
                            infoWindow: {
                                content: '<p>' + vTitulo + '</p>'
                            }
                        });
                    } else {
                        map.setCenter(latlng.lat(), latlng.lng());
                        x = map.markers[0];
                        x.setPosition(new google.maps.LatLng(latlng.lat(), latlng.lng()));
                    }
                } else {
                    map.removeMarkers();
                    infoCustom2("No se encontraron coincidencias!");

                }
            }
        });

    }

    function Geolocalizar() {
        GMaps.geolocate({
            success: function (position) {
                map.setCenter(position.coords.latitude, position.coords.longitude);
                if (map.markers[0].getPosition().lng() == 0 && map.markers[0].getPosition().lat() == 0) {
                    map.markers[0].setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    //$("#"+v_iddiv+" #txtLatitud").val(map.markers[0].getPosition().lat()); $("#"+v_iddiv+" #txtLongitud").val(map.markers[0].getPosition().lng());
                }
                infoCustom2("Se ha localizado su posición actual!");
            },
            beforeSend: function () { Bloquear("map") },
            error: function (error) {
                if (error.message.indexOf("Only secure origins are allowed") == 0) {
                    tryAPIGeolocation();
                } else {
                    alert('Geolocalizacion falló: ' + error.message);
                }
            },
            not_supported: function () {
                infoCustom("Tu navegador no soporta geolocalización!");
            },
            always: function () {

            }
        });
    }

    return {
        init: function () {
            plugins();
            crearTablaVacia();
            fillCboempresa();
            eventoControles();
            $('#cbo_empresa_l').select2('val', $('#ctl00_hddctlg').val()).change();
            // listarAlmacenesListado($('#cbo_empresa_l').val());
            //$('#cbo_Almc').select2('val', '').change();


        }
    };
}();
var NAMINSA = function () {
    var oCentroCostoCab = [];
    var sCentroCostoCab = "";
    var aoNiveles = [];

    var fnCargarParametros = function (psPlanCostos) {
        aoNiveles = CargarNivelesCentroCostos(psPlanCostos);
    };

    var CargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        return vNiveles;
    };

    var plugins = function () {
        $('#cboOperacion, #cboTipoDcto, #cboOrigen, #cboRegistro, #cbotipoDoctrans, #cboAlmacenTransferencia, #cboUniMedida, #cboCorrelativo, #cboMoneda, #cboTipoEnvio, #txtDireccionTransportista, #slcpais, #slcdepa, #slcprov, #slcdist').select2();
        $('input[type=text]').attr('autocomplete', 'off');
        $('#txtEmision, #txtTransaccion, #txtTransaccion2, #txtfecanulacion').datepicker("setDate", "now");
        $('#txt_fec_vig').datepicker();
        $('#txt_fec_vig').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $("#txt_garantia").inputmask({ "mask": "9", "repeat": 2, "greedy": false });
        $("#txtSerieDctoOrigen_0, #txtSerieDctoRegistro").inputmask({ mask: "*", repeat: 4, greedy: false });
        //$("#txtcant").inputmask({ mask: "*", repeat: 6, greedy: false });
        $('#txtNroDctoRegistro').inputmask({ mask: '9', repeat: 10, greedy: false });//Cambio debido a que compra permite 10 digitos
        $('#slcEmpresa, #cboAlmacen, #cboOperacion, #cboMoneda, #cboTipoEnvio, #cboTipoDcto, #cboAlmacenTransferencia, #cboOrigen, #cboRegistro, #cboRegistroInterno, #cbotipoDoctrans, #cboUniMedida, #cboCorrelativo').select2();
        tabla_det = $('#tabla_det').dataTable();
    }

    var eventoControles = function () {

        $('#cboMoneda').on('change', function () {
            if ($('#cboMoneda').val() == '0003') {//DPORTA
                if ($("#txtTransaccion2").val() != $("#txt_fec_vig").val()) {
                    InsertarValorCambioOficial($('#cboMoneda').val());
                }
                listarValorCambio();
            } else {
                $('#lbl_TC, #input_valor_cambio, #lbl_fec_vig, #input_fec_vig').css("display", "none");
            }
            //InsertarValorCambioOficial($("cboMoneda").val())
        });

        $("#btnVerEmpresaTransporte").click(function () {
            if (vErrors("txtEmpresaTransporte")) {
                BuscarEmpresa($("#txtPIDM_EmpresaTransporte").val());
            }
        });

        $("#btnVerProducto").click(function () {
            if (vErrorsNotIcon("txtPROD_CODE")) {
                BuscarProducto($("#txtPROD_CODE").val());
            }
        });

        $('#cboAlmacenTransferencia').on('change', function () {
            $('#txtDireccionTransferencia').val($('#cboAlmacenTransferencia :selected').attr('direccion'));          
        });

        $("#rbEntrada").click(function () {

            $(".nrovuel").css({ "display": "none" });
            listarOperacionES($("#rbEntrada").val());
            $('#cboOperacion').select2('val', '').change();
            $("#txtNroDcto, #txtDireccionOrigen, #cboAlmacenTransferencia, #txtEmpresaTransporte, #txtnumdocemptrans, #txtRazonSocial, .txtSerieDctoOrigen, .txtNroDctoOrigen, #txtSerieDctoRegistro, #txtNroDctoRegistro, #cboOrigen, #cboRegistro").val('');
            $('.tipoventa').addClass('hidden');
            $('#cboOrigen, #cboRegistro').change();
            $('#txtSerieDctoRegistro, #txtNroDctoRegistro').prop('disabled', false);
            $("#legend").html("Origen");
            $("#lbldir").html("Dirección Origen");
            $("#lblUrba").html("Urbanización Origen");
            $("#lblrecepcionado").html("Receptor");
            $("#div_lblalmc_transf, #div_cboALmc_tranf").css("display", "none");
            $("#chkincluyeIGV").attr("disabled", false);
            $("#chkincluyeIGV").attr("disabled", false);
            $("#chkdirNoexis").attr("disabled", true);
            $("#txtUrbanizacionDestino").val('');

            $('#divES').removeClass('hidden');
            $('#divT, #divAdvertencia').addClass('hidden');

            $("#cboTipoDcto, #cbotipoDoctrans").select2('val', '').change();
            $('#fieldsetOrigen, #fieldsetTransporte').slideDown();
            $('#txtmonto, .optLND, #chkincluyeIGV').prop('disabled', false);
            $('#optLD').prop('disabled', true);
            $('#lblalmacen').html('Almacén');
            $('#btnAgregarDctoOrigen').removeClass('hidden');
            $('.div_mas_dctoreg').remove();
            cargarDctosRegistroInterno('100');
            cargarCorrelativoDocumentoRegistroInterno();
            $('#btnBuscarDctoOrigen, #btnAgregarDctoOrigen').prop('disabled', false);
            $('#divRegistro').slideDown(500);
            $('#divDireccionTransportista').slideUp(500);
            $('#txtEmpresaTransporte').prop('disabled', true);
            $('#txtEmpresaTransporte').val(empresa.DESCRIPCION);
            $("#lblCosto, #txtCostoTrans, #ComIGV").attr("style", "display:inline");
            $("#nodireccion").hide();
            if (ObtenerQueryString('codigo') === undefined) {
                if ($('#cboAlmacen').val() == "" || $('#cboAlmacen').val() == null) {
                    var almc_code = $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val();
                    $('#cboAlmacen').select2('val', (almc_code === undefined) ? '' : almc_code).change();
                }
            }
            $('#rdPrivado').click();
            $('#rdPrivado').parent().addClass('checked');
            $('#rdPublico').parent().removeClass('checked');
            $('#rdOtro').parent().removeClass('checked');
        });

        $("#rbSalida").click(function () {
            $(".nrovuel").css({ "display": "block" });
            listarOperacionES($("#rbSalida").val());
            $('#cboOperacion').select2('val', '').change();
            $("#txtNroDcto, #txtDireccionOrigen, #cboAlmacenTransferencia, #txtEmpresaTransporte, #txtnumdocemptrans, #txtRazonSocial, .txtSerieDctoOrigen, .txtNroDctoOrigen, #txtSerieDctoRegistro, #txtNroDctoRegistro, #cboOrigen, #cboRegistro").val('');
            $('#cboOrigen, #cboRegistro').change();
            $('.tipoventa').addClass('hidden');
            $('#txtSerieDctoRegistro, #txtNroDctoRegistro').prop('disabled', true);
            $('#divES, #divAdvertencia').removeClass('hidden');
            $('#divT').addClass('hidden');
            $("#div_lblalmc_transf, #div_cboALmc_tranf, #cboAlmacenTransferencia").css("display", "none");
            $("#legend").html("Destino");
            $("#lbldir").html("Dirección Destino");
            $("#lblUrba").html("Urbanización Destino");
            $("#lblUrba").css({ "display": "none" });
            $("#txtUrbanizacionDestino").css({ "display": "none" });
            $("#cboOrigen").val("NINGUNO").change();
            $("#lblrecepcionado").html("Despachado Por");
            $('#fieldsetTransporte').css('display', 'block');
            $("#chkdirNoexis").attr("disabled", false);
            $("#cboTipoDcto").select2('val', '').change();
            $("#cbotipoDoctrans").select2('val', '').change();
            $("#chkincluyeIGV, #txtmonto, .optLND").prop("disabled", true);
            $('#fieldsetOrigen').slideDown();
            $('#lblalmacen').html('Almacén');
            $('#btnAgregarDctoOrigen').removeClass('hidden');
            $('.div_mas_dctoreg').remove();
            $("#txtRazonSocial").attr("disabled", false);

            autocompletarClientes('#txtRazonSocial', '');
            $("#txtRazonSocial").val("").keyup();
            $('#lblCosto, #txtCostoTrans, #ComIGV').attr("style", "display:none");

            cargarDctosRegistroInterno('105');
            cargarCorrelativoDocumentoRegistroInterno();
            $('#optLD, #btnBuscarDctoOrigen, #btnAgregarDctoOrigen').prop('disabled', false);
            $('#divRegistro').slideDown();
            $('#divDireccionTransportista').slideUp(500);
            $('#txtEmpresaTransporte').prop('disabled', true);
            $('#txtEmpresaTransporte').val(empresa.DESCRIPCION);
            $("#nodireccion").show();
            if (ObtenerQueryString('codigo') === undefined) {
                if ($('#cboAlmacen').val() == "" || $('#cboAlmacen').val() == null) {
                    var almc_code = $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val();
                    $('#cboAlmacen').select2('val', (almc_code === undefined) ? '' : almc_code).change();
                }
            }
            $('#rdPrivado').click();
            $('#rdPrivado').parent().addClass('checked');
            $('#rdPublico').parent().removeClass('checked');
            $('#rdOtro').parent().removeClass('checked');
        });

        $("#rbTEntrada").click(function () {
            
            $(".nrovuel").css({ "display": "none" });
            $('#fieldsetOrigen').slideDown(500);
            listarOperacionT($("#rbTEntrada").val());
            $('#cboOperacion').select2('val', '').change();
            $('.txtSerieDctoOrigen, .txtNroDctoOrigen, #txtNroDcto, #txtDireccionOrigen, #txtDireccionTransferencia, #txtEmpresaTransporte, #txtnumdocemptrans, #cboOrigen, #cboRegistro, #txtSerieDctoRegistro, #txtNroDctoRegistro').val('');
            $("#cboOperacion").select2("val", "0021").change();
            $("#legend").html("Origen");
            $("#lblrecepcionado").html("Receptor");
            $("#lbldir").html("Dirección Origen");
            $("#lblUrba").html("Urbanización Origen");
            $("#Label1").html("Dirección Origen");
            $("#lblalmacen").html("Almacén Destino");
            $('#divES, #divAdvertencia').addClass('hidden');
            $('#divT').removeClass('hidden');
            $("#divOrigen").html('');
            $("#div_lblalmc_transf, #div_cboALmc_tranf").css("display", "block");
            $("#lblalmc_transf").html("Almacén Origen");
            //cargarEmpresaDefault(); //DPORTA 12/08/2021 COMENTADO
            $('#hfPIDM').val(empresa.PIDM);
            $('#txtRazonSocial').val(empresa.DESCRIPCION);
            cargarTipoDocumento();
            $('#cboTipoDcto').select2('val', '6');
            $('#txtNroDcto').val(empresa.RUC);
            cargarAlmacenesTransferencia(); //DPORTA 12/08/2021 LO DESCOMENTÉ
            //$('#cboAlmacenTransferencia').select2('val', '').change(); //DPORTA 12/08/2021 COMENTADO
            $("#cbotipoDoctrans").select2('val', '').change();
            $('#chkincluyeIGV, #txtmonto, .optLND, #btnBuscarDctoOrigen, #btnAgregarDctoOrigen').prop('disabled', false);
            $('#txtRazonSocial, #optLD, #txtSerieDctoRegistro, #txtNroDctoRegistro').prop('disabled', true);
            $('#btnAgregarDctoOrigen').addClass('hidden');
            $('.div_mas_dctoreg').remove();
            cargarDctosRegistroInterno('100');
            cargarCorrelativoDocumentoRegistroInterno();
            $('#txtSerieDctoRegistro, #txtNroDctoRegistro').prop('disabled', false);
            $('#divDireccionTransportista').slideUp(500);
            $('#divRegistro').slideDown(500);
            $('#txtEmpresaTransporte').prop('disabled', true);
            $('#txtEmpresaTransporte').val(empresa.DESCRIPCION);
            $("#nodireccion").hide();
            $('#lblCosto, #txtCostoTrans, #ComIGV').attr("style", "display:none");

            
            //if (ObtenerQueryString('codigo') === undefined) { //DPORTA 12/08/2021 COMENTADO
            //    if ($('#cboAlmacen').val() == "" || $('#cboAlmacen').val() == null) {
            //        var almc_code = $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val();
            //        $('#cboAlmacen').select2('val', (almc_code === undefined) ? '' : almc_code).change();
            //    }
            //}
            $('#rdPrivado').click();
            $('#rdPrivado').parent().addClass('checked');
            $('#rdPublico').parent().removeClass('checked');
            $('#rdOtro').parent().removeClass('checked');
        });

        $("#rbTSalida").click(function () {
            $(".nrovuel").css({ "display": "none" });
            $('#fieldsetOrigen').slideDown(500);
            listarOperacionT($("#rbTSalida").val());
            $('#cboOperacion').select2('val', '').change();
            $('.txtSerieDctoOrigen, .txtNroDctoOrigen, #txtNroDcto, #txtDireccionOrigen, #txtDireccionTransferencia, #txtEmpresaTransporte, #txtnumdocemptrans, #cboOrigen, #cboRegistro, #txtSerieDctoRegistro, #txtNroDctoRegistro').val('');
            $("#cboOperacion").select2("val", "0011").change();
            $("#legend").html("Destino");
            $("#lblrecepcionado").html("Despachado Por");
            $("#lbldir").html("Dirección Destino");
            $("#lblUrba").html("Urbanización Destino");
            $("#lblalmacen").html("Almacén Origen");
            $("#lblalmc_transf").html("Almacén Destino");
            $("#Label1").html("Dirección Destino");
            $('#divES').addClass('hidden');
            $('#divT, #divAdvertencia').removeClass('hidden');
            $("#div_lblalmc_transf, #div_cboALmc_tranf").css("display", "block");
            $('#cboAlmacenTransferencia').select2('val', '').change();
            //cargarEmpresaDefault(); //DPORTA 12/08/2021 COMENTADO
            $('#hfPIDM').val(empresa.PIDM);
            $('#txtRazonSocial').val(empresa.DESCRIPCION);
            cargarTipoDocumento();
            $('#cboTipoDcto').select2('val', '6');
            $('#txtNroDcto').val(empresa.RUC);
            //$("#cbotipoDoctrans").select2('val', '').change();
            $("#cbotipoDoctrans").select2('val', '6');
            $('#txtSerieDctoRegistro, #txtNroDctoRegistro, #chkincluyeIGV, #txtmonto, .optLND, #txtRazonSocial').prop('disabled', true);
            $('#btnAgregarDctoOrigen').removeClass('hidden');
            $('.div_mas_dctoreg').remove();
            $('#optLD, #btnBuscarDctoOrigen, #btnAgregarDctoOrigen').prop('disabled', false);
            cargarDctosRegistroInterno('105');
            cargarCorrelativoDocumentoRegistroInterno();
            $('#divRegistro').slideDown(500);
            $('#txtEmpresaTransporte').prop('disabled', true);
            $('#txtEmpresaTransporte').val(empresa.DESCRIPCION);
            $("#nodireccion").hide();
            $('#lblCosto, #txtCostoTrans, #ComIGV').attr("style", "display:none");
            // AJAX TRAER EL VAQOR DEL PARAMETRO ALOR Y DE ACUERDO A ESO MOVER EL CBO
            //if (ObtenerQueryString('codigo') === undefined) {
            //    $.ajax({
            //        type: "post",
            //        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ALOR",
            //        contenttype: "application/json;",
            //        datatype: "json",
            //        async: false,
            //        success: function (datos) {
            //            if (datos != null) {
            //                var xd = datos[0].VALOR;
            //                console.log(xd);
            //                if (datos[0].VALOR == 'L') {
            //                    var almc_code = $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val();
            //                    $('#cboAlmacen').select2('val', (almc_code === undefined) ? '' : almc_code).change();
            //                } else {
            //                    $('#cboAlmacen').select2('val', datos[0].VALOR).change();
            //                    var almc_code = $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val();
            //                    $('#cboAlmacenTransferencia').select2('val', (almc_code === undefined) ? '' : almc_code).change();

            //                }

            //            }
            //            else { alertCustom("No se recuperó el Parámetro de Almacen Origen (ALOR) correctamente!"); }
            //        },
            //        error: function (msg) {
            //            alertCustom("No se recuperó el Parámetro de Almacen Origen(ALOR) correctamente!");
            //        }
            //    });
            //}
            if (ObtenerQueryString('codigo') === undefined) {
                if ($('#cboAlmacen').val() == "" || $('#cboAlmacen').val() == null) {
                    var almc_code = $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val();
                    $('#cboAlmacen').select2('val', (almc_code === undefined) ? '' : almc_code).change();
                }
            }
            $('#rdPrivado').click();
            $('#rdPrivado').parent().addClass('checked');
            $('#rdPublico').parent().removeClass('checked');
            $('#rdOtro').parent().removeClass('checked');
        });

        $('#slcEmpresa').on('change', function () {

            cargarEmpresaDefault();
            //cargarEmpresaDtosBasicos();            
            cargarAlmacenes();
            cargarAlmacenesDatos();
            var almc_code = $('#cboAlmacen option[data-scsl-code=' + $('#ctl00_hddestablecimiento').val() + ']').val();
            $('#cboAlmacen').select2('val', (almc_code === undefined) ? '' : almc_code).change();
            cargaInicio();    
            //cargarEmpleados();
            //$('#txtSolicitante').parent().html('<input id="txtPIDM_Solicitante" type="hidden" /><input id="txtSolicitante" class="span12" type="text" style="text-transform: uppercase" /><input type="hidden" id="txtUsuaSolicitante" />');
            //autocompletarSolicitante('#txtSolicitante', '');
            //$('#txtEntregar').parent().html('<input id="txtPIDM_Entregar" type="hidden" /><input id="txtEntregar" class="span12" type="text" style="text-transform: uppercase" />');
            //autocompletarEntregar('#txtEntregar', '');

            //cargarProductos();        

            if ($('#rbTEntrada').is(':checked')) {                
                $('#rbTEntrada').click();
                
            }

            if ($('#rbTSalida').is(':checked')) {
                $('#rbTSalida').click();

            }

            $("#cboAlmacen").attr("disabled", false);
        });

        $('#cboAlmacen').on('change', function () {
            cargarAlmacenesTransferencia();
            cargarEmpleados();
            $('#txtSolicitante').parent().html('<input id="txtPIDM_Solicitante" type="hidden" /><input id="txtSolicitante" class="span12" type="text" style="text-transform: uppercase" /><input type="hidden" id="txtUsuaSolicitante" />');
            autocompletarSolicitante('#txtSolicitante', '');
            $('#txtEntregar').parent().html('<input id="txtPIDM_Entregar" type="hidden" /><input id="txtEntregar" class="span12" type="text" style="text-transform: uppercase" />');
            autocompletarEntregar('#txtEntregar', '');

            $('#cboAlmacenTransferencia').select2('val', '').prop('disabled', false);
            if ($("#rbTEntrada").is(":checked") == true || $("#rbTSalida").is(":checked") == true) {
                $("#txtDireccionOrigen").val("");
            }
            if ($('#rbSalida').is(':checked') || $('#rbTSalida').is(':checked')) {
                cargarCorrelativo();
                establecerCorrelativo('F');
            }
            cargarCorrelativoInterno();
            establecerCorrelativoInterno('P');//GUIA SALIDA Y GUIA DE INTERNAMIENTO
            //cargarProductos();
            //cargarCostoProducto();
        });

        $('#cboOperacion').on('change', function () {
            $('#cboTipoDcto').select2('val', '').change();
            $('#txtNroDcto, #txtDireccionOrigen').val('');            
            //var s=$("#cboOperacion option");for(i=0;i<s.length;i++){console.log($(s[i]).val()+" :: " + $(s[i]).html()+" :: "+$(s[i]).attr("data-tipo-movcont") +" :: " + $(s[i]).val()  +" :: " + $(s[i]).attr("data-origenes")+" :: " + $(s[i]).attr("data-registros")+" :: " + $(s[i]).attr("data-tipo-persona"))}
            //VALUE  :: data-tipo-movcont :: data-origenes :: data-registros :: data-tipo-persona
            //SALIDAS
            //------    ------------------    -------------    --------------   -----------------
            // 0001 :: VENTA NACIONAL :: S :: 0001 :: 01,03,27,99,12,60 :: 01,03,09,12,60,99 :: CLIENTE
            // 0004 :: CONSIGNACION ENTREGADA :: S :: 0004 :: 09 :: 09 :: CLIENTE
            // 0006 :: DEVOLUCION ENTREGADA :: IN :: 0006 ::  :: 09 :: PROVEEDOR
            // 0007 :: BONIFICACION :: IN :: 0007 :: 09 :: 09 :: PERSONA
            // 0008 :: PREMIO :: S :: 0008 :: 09 :: 09 :: PERSONA
            // 0009* :: DONACION :: S :: 0009 :: 09 :: 09 :: PERSONA
            // 0010 :: SALIDA A PRODUCCION :: S :: 0010 :: 00,103 :: 105 :: 
            // 0012 :: RETIRO :: S :: 0012 :: 09 :: 105 :: 
            // 0013 :: MERMAS :: S :: 0013 :: 09 :: 105 :: 
            // 0014 :: DESMEDROS :: S :: 0014 :: 09 :: 105 :: 
            // 0015 :: DESTRUCCION :: S :: 0015 :: 09 :: 105 :: 
            // 0025 :: SALIDA POR DEVOLUCION AL PROVEEDOR :: S :: 0025 :: 09 :: 09 :: PROVEEDOR
            // 0028* :: AJUSTE POR DIFERENCIA DE INVENTARIO :: I :: 0028 :: 09 :: 100,105 :: 
            // 0030 :: SALIDA DE BIENES EN PRESTAMO :: S :: 0030 :: 09 :: 09 :: PERSONA
            // 0034* :: PUBLICIDAD :: S :: 0034 :: 09 :: 09,31,100,105 :: PERSONA
            // 0036 :: RETIRO PARA ENTREGA A TRABAJADORES :: S :: 0036 :: 28,103 :: 09,105 :: EMPLEADO
            // 0038 :: RETIRO POR SUSTITUCION DE BIEN SINIESTRADO :: S :: 0038 :: 09 :: 09,105 :: 
            // 0041 :: SALIDA POR ACTIVOS FIJOS :: S :: 0041 :: 09,103 :: 105 :: 
            // 0042 :: SALIDA POR EMISOR ITINERANTE DE COMPROBANTE :: SN :: 0042 :: 01,03,12 :: 01,03,12 :: CLIENTE
            // 0043 :: SALIDA GARANTIA A PROVEEDOR :: IN :: 0043 :: 01,09 :: 01,09 :: PROVEEDOR
            // ----ENTRADAS
            //  0002 :: COMPRA NACIONAL :: I :: 0002 :: 01,12,101,104 :: 01,09,31 :: PROVEEDOR
            // 0003 :: CONSIGNACION RECIBIDA :: I :: 0003 :: 09 :: 09 :: PROVEEDOR
            // 0005 :: DEVOLUCION RECIBIDA :: SN :: 0005 :: 07,87 :: 100 :: PERSONA
            // 0009* :: DONACION :: S :: 0009 :: 09 :: 09 :: PERSONA
            // 0016 :: SALDO INICIAL :: I :: 0016 :: 09 :: 100 :: 
            // 0018 :: IMPORTACION :: I :: 0018 :: 09 :: 31 :: PERSONA
            // 0019 :: ENTRADA DE PRODUCCION :: I :: 0019 :: 09 :: 100 :: 
            // 0024 :: DEVOLUCION DEL CLIENTE :: I :: 0024 :: 09 :: 100 :: CLIENTE
            // 0028* :: AJUSTE POR DIFERENCIA DE INVENTARIO :: I :: 0028 :: 09 :: 100,105 :: 
            // 0029 :: ENTRADA DE BIENES EN PRESTAMO :: I :: 0029 :: 09 :: 09,31,100 :: PERSONA
            // 0034* :: PUBLICIDAD :: S :: 0034 :: 09 :: 09,31,100,105 :: PERSONA
            // 0039 :: ENTRADA CLIENTE POR GARANTÍA :: SN :: 0039 :: 01,03,12 :: 01,03,12 :: CLIENTE
            // 0040 :: ENTRADA POR ACTIVOS FIJOS :: I :: 0040 :: 09 :: 100 :: 
            //---- TRANSFERENCIA SALIDA
            //0011 :: SALIDA POR TRANSFERENCIA ENTRE ALMACENES :: S :: 0011 :: 09 :: 09 :: CATALOGO
            //---- TRANSFERENCIA ENTRADA
            //0021 :: ENTRADA POR TRANSFERENCIA ENTRE ALMACENES :: I :: 0021 :: 09 :: 09 :: CATALOGO
            var operacion = $(this).val();
            var mov_cont = $("#cboOperacion option:selected").attr("data-tipo-movcont");// S:SALIDA, I:INGRESO, SN: SALIDA NEGATIVA, IN: INGRESO NEGATIVO

            if (mov_cont == "SN") { DesbloquearSinGif("#detallemov_datos") } else { DesbloquearSinGif("#detallemov_datos") }

            //if (mov_cont == "IN" && $("#cboOrigen").val() != "") { BloquearSinGif("#detallemov_datos") } else { DesbloquearSinGif("#detallemov_datos") }

            if (operacion !== '' && operacionAnterior !== operacion) {

                $('#txtRazonSocial, #txtDireccionOrigen, #cboOrigen, #cboRegistro').prop('disabled', false);
                $('#txtSerieDctoRegistro, #txtNroDctoRegistro').val('');

                cargarDctosOrigen($('#cboOperacion :selected').attr('data-origenes'));
                cargarDctosRegistro($('#cboOperacion :selected').attr('data-registros'));

                var tipo_persona = $('#cboOperacion :selected').attr('data-tipo-persona');
                switch (tipo_persona) {
                    case 'CLIENTE': {
                        $('#fieldsetOrigen, #fieldsetTransporte, #divRegistro').slideDown(500);
                        $('#hfSIN_DESTINO').val('NO');
                        $('#hfSIN_TRANSPORTE').val('NO');
                        $('#btn_origen_destino').prop('disabled', false);
                        $('#btn_origen_destino').attr('href', '?f=nkmgecl');
                        $('#btn_ver_origen_destino').attr('href', 'javascript: if(vErrorsNotMessage(["txtRazonSocial"])) BuscarCliente($("#hfPIDM").val())');                        
                        $('#cboOrigen').prop('disabled', false);
                        $('#txtSerieDctoRegistro, #txtNroDctoRegistro').val('');

                        $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase"/>');
                        autocompletarClientes('#txtRazonSocial', '');
                        break;
                    }
                    case 'EMPLEADO': {
                        $('#fieldsetOrigen, #fieldsetTransporte, #divRegistro').slideUp(500);

                        $('#hfSIN_DESTINO').val('SI');
                        $('#hfSIN_TRANSPORTE').val('SI');
                        $('#cboRegistro').select2('val', $('#cboRegistroInterno').val()).change();
                        $('#btn_origen_destino').prop('disabled', false);
                        $('#btn_origen_destino').attr('href', '?f=ncmpers');
                        $('#btn_ver_origen_destino').attr('href', 'javascript: if(vErrorsNotMessage(["txtRazonSocial"])) BuscarEmpleado($("#hfPIDM").val())');
                        $('#cboOrigen').prop('disabled', false);

                        //REVISAR
                        $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase"/>');
                        autocompletarTrabajador('#txtRazonSocial', '');
                        break;
                    }
                    case 'CATALOGO': {
                        $('#fieldsetOrigen, #fieldsetTransporte, #divRegistro').slideDown(500);
                        $('#hfSIN_DESTINO').val('NO');
                        $('#hfSIN_TRANSPORTE').val('NO');
                        $('#btn_origen_destino').prop('disabled', true);
                        $('#cboOrigen').prop('disabled', false);
                        break;
                    }
                    case 'PERSONA': {
                        $('#fieldsetOrigen, #fieldsetTransporte, #divRegistro').slideDown(500);
                        $('#hfSIN_DESTINO').val('NO');
                        $('#hfSIN_TRANSPORTE').val('NO');
                        $('#btn_origen_destino').prop('disabled', false);
                        $('#btn_origen_destino').attr('href', '?f=ncmpers');
                        $('#btn_ver_origen_destino').attr('href', 'javascript: if(vErrorsNotMessage(["txtRazonSocial"])) BuscarPersonaGeneral($("#hfPIDM").val())');
                        $('#cboOrigen').prop('disabled', false);

                        $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase"/>');
                        autocompletarPersonas('#txtRazonSocial', '');
                        break;
                    }
                    case 'PROVEEDOR': {
                        $('#fieldsetOrigen, #fieldsetTransporte, #divRegistro').slideDown(500);
                        $('#hfSIN_DESTINO').val('NO');
                        $('#hfSIN_TRANSPORTE').val('NO');
                        $('#btn_origen_destino').prop('disabled', false);
                        $('#btn_origen_destino').attr('href', '?f=nrmgepr');
                        $('#btn_ver_origen_destino').attr('href', 'javascript: if(vErrorsNotMessage(["txtRazonSocial"])) BuscarEmpresa($("#hfPIDM").val())');
                        $('#cboOrigen').prop('disabled', false);

                        $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase"/>');
                        autocompletarRazonSocial('#txtRazonSocial', '');
                        break;
                    }
                    case '': {
                        $('#fieldsetOrigen, #fieldsetTransporte, #divRegistro').slideUp(500);

                        $('#txtDireccionOrigen').parent().html('<select id="txtDireccionOrigen" class="span12" disabled="disabled"></select>');
                        $('#txtDireccionOrigen').select2();
                        $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');
                        //$('#txtDireccionOrigen2').select2();
                        //$('#txtUrbanizacionDestino').parent().append('<label class="checkbox"><div class="checker" id="uniform-chkdirNoexis"><span class=""><input type="checkbox" value="" style="opacity: 0;" id="chkdirNoexis"></span></div>Dirección No Pertenece a la Empresa</label>');

                        $('#hfSIN_DESTINO').val('SI');
                        $('#hfSIN_TRANSPORTE').val('SI');
                        cargarDctosRegistro('100,105');
                        $('#cboRegistro').select2('val', $('#cboRegistroInterno').val()).change();
                        $('#txtSerieDctoRegistro').val($('#txtSerieRegistroInterno').val());
                        $('#txtNroDctoRegistro').val($('#txtNroRegistroInterno').val());
                        $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase" disabled="disabled"/>');
                        break;
                    }
                }

                if (operacion === '0001' || operacion === '0011') {                      
                    $("#p_info2").css("display", "block");
                    $('.tipoventa').removeClass('hidden');
                    cargarTipoEnvio(operacion);
                    $('#cboTipoEnvio').select2('val', 'EDIR').change();
                    //$('#detallemov_datos').hide();
                } else {
                    $('.tipoventa').addClass('hidden');
                    $('#cboTipoEnvio').select2('val', '').change();
                }
                //***CONFIGURACION MOSTRAR/OCULTAD DESTINO/ORIGEN***

                if ($("#cboOperacion option:selected").attr("data-tipo-persona") == "") {
                    $('#hfSIN_DESTINO').val('SI');
                    $("#fieldsetOrigen").slideUp();
                } else {
                    $("#fieldsetOrigen").slideDown();
                }
                //OPERACIONES DE SALIDAS
                if (operacion == '0008' || operacion == '0004' || operacion == '0006' || operacion == '0007'
                    || operacion == '0025' || operacion == '0030' || operacion == '0036' || operacion == '0043') {
                    $('#txtDireccionOrigen').parent().html('<select id="txtDireccionOrigen" class="span12" disabled="disabled"></select>');
                    //$('#txtDireccionOrigen').parent().html('<input type="text" class="span12" id="txtDireccionOrigen" style="text-transform:uppercase" />');
                    $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');
                }
                if (operacion == '0010' || operacion == '0038' || operacion == '0041' || operacion == '0042') {
                    $('#hfSIN_DESTINO').val('SI');
                    $("#fieldsetOrigen").slideUp();
                }
                //OPERACIONES ENTRADAS
                if (operacion == '0003' || operacion == '0005' || operacion == '0018' || operacion == '0024' || operacion == '0029') {
                    $('#txtDireccionOrigen').parent().html('<input type="text" class="span12" id="txtDireccionOrigen" style="text-transform:uppercase" />');
                    $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');
                }
                if (operacion == '0016' || operacion == '0019' || operacion == '0040') {
                    $('#hfSIN_DESTINO').val('SI');
                    $("#fieldsetOrigen").slideUp();
                    $("#hfPIDM").val("");
                }

                //OPERACIONES COMPARTIDAS ENTRE ENTRADA Y SALIDA
                if (operacion == '0009' || operacion == '0034') {
                    $('#txtDireccionOrigen').parent().html('<input type="text" class="span12" id="txtDireccionOrigen" style="text-transform:uppercase" />');
                    $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');
                }
                if (operacion == '0028') {
                    $('#hfSIN_DESTINO').val('SI');
                    $("#fieldsetOrigen").slideUp();
                }
            }
            //*** FIN CONFIGURACION
            if (operacion === '') {
                $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase" disabled="disabled"/>');
                $('#txtDireccionOrigen').parent().html('<input id="txtDireccionOrigen" class="span12" type="text" style="text-transform: uppercase" disabled="disabled"/>');
                $('#cboOrigen, #cboRegistro, #cboTipoDcto').prop('disabled', true);
            }
            operacionAnterior = operacion;
        });

        $('#cboTipoDcto').on('change', function () {
            $("#txtNroDcto").val($('#cboTipoDcto option:selected').attr('nroDoc'));  

            var doc = $('#cboTipoDcto').val();

            if (doc == '6') {
                $('#cboOrigen option[value=0001], #cboRegistro option[value=0001]').prop('disabled', false);               
            } else {
                if (doc == '1' || doc == '0') {
                    $('#cboOrigen option[value=0003], #cboRegistro option[value=0003]').prop('disabled', false);                   
                } else {
                    $('#cboRegistro option[value=0003]').prop('disabled', true); // #cboOrigen option[value=0003], 
                }
                $('#cboOrigen option[value=0001], #cboRegistro option[value=0001]').prop('disabled', true);
            }

            //if ($('#hfDNI').val() !== '' || $('#hfOTROS').val() !== '') {
            //    $('#cboOrigen option[value=0003], #cboRegistro option[value=0003]').prop('disabled', false);
            //    $("#cboTipoDcto").val("1").change();
            //} else {
                
            //}
        });

        $("#cbotipoDoctrans").on('change', function () {
            if ($('#cbotipoDoctrans').val() == "6") {
                $("#txtnumdocemptrans").val($("#hfRUC_EMPTRANS").val());
            }
            if ($('#cbotipoDoctrans').val() == "1") {
                $("#txtnumdocemptrans").val($("#hfDNI_EMPTRANS").val());
            }
        });

        $("#cboOrigen").on('change', function () {         

            if ($('#cboRegistro').val() !== "") {
                if ($("#cboOrigen").val() !== $('#cboRegistro').val()) {
                    //$('#txtSerieDctoRegistro').val("");
                    //$('#txtNroDctoRegistro').val("");
                    $('#txtSerieDctoRegistro').attr('disabled', false);
                    $('#txtNroDctoRegistro').attr('disabled', false);
                    if ($('#rbEntrada').is(':checked') && $("#cboOperacion").val() == '0002' && $("#cboRegistro").val() == '0009' && $("#chkNuestraGuia").is(':checked')) {
                        $('#txtSerieDctoRegistro').attr('disabled', true);
                        $('#txtNroDctoRegistro').attr('disabled', true);
                    }
                } else {
                    $('#txtSerieDctoRegistro').attr('disabled', true);
                    $('#txtNroDctoRegistro').attr('disabled', true);
                }
                $("#divNuestraGuia").attr("style", "display:none");
                $('#divElec').addClass('hidden');
            } 

            $('.div_mas_dctoreg').remove();
            $("#prueba").find(":input.txtNroDctoOrigen").val("");
            $("#prueba").find(":input.txtSerieDctoOrigen").val("");
            $('#prueba').find('input.txtCodigoDctoOrigen').val('');   

            var mov_cont = $("#cboOperacion option:selected").attr("data-tipo-movcont");

            if (mov_cont == "IN" && $("#cboOrigen").val() != "") { DesbloquearSinGif("#detallemov_datos") } else { DesbloquearSinGif("#detallemov_datos") }

            let sCodDoc = $(this).val();

            if ($("#rbSalida").is(':checked')) {
                $("#cboRegistro option[value=0009]").prop('disabled', false);
                $("#cboRegistro option[value=0001]").prop('disabled', false);
                $("#cboRegistro option[value=0003]").prop('disabled', false);
                $("#cboRegistro option[value=0012]").prop('disabled', false);

                if (sCodDoc === "NINGUNO") {
                    $("#cboRegistro option[value=0001]").prop('disabled', true);
                    $("#cboRegistro option[value=0003]").prop('disabled', true);
                    $("#cboRegistro option[value=0012]").prop('disabled', true);
                }

                if (sCodDoc === "0001") {
                    $("#cboRegistro option[value=0003]").prop('disabled', true);
                    $("#cboRegistro option[value=0012]").prop('disabled', true);
                }

                if (sCodDoc === "0012") {
                    $("#cboRegistro option[value=0003]").prop('disabled', true);
                    $("#cboRegistro option[value=0001]").prop('disabled', true);
                }

                if (sCodDoc === "0003") {
                    $("#cboRegistro option[value=0001]").prop('disabled', true);
                    $("#cboRegistro option[value=0012]").prop('disabled', true);
                }
            }  

            if ($('#rbTEntrada').is(':checked') && $(this).val() == '0050') {

                $('#txtSerieDctoRegistro').val($('#txtSerieDctoOrigen_0').val());
                $('#txtNroDctoRegistro').val($('#txtNroDctoOrigen_0').val());
                $('#txtSerieDctoRegistro').prop('disabled', true);
                $('#txtNroDctoRegistro').prop('disabled', true);
            }

            $('#rdPrivado').click();
            $('#rdPrivado').parent().addClass('checked');
            $('#rdPublico').parent().removeClass('checked');
            $('#rdOtro').parent().removeClass('checked');
            $("#rdPublico, #rdPrivado, #rdOtro,#txtDireccionTransferencia").attr("disabled", false);
            $("#txtVehiculoFact,#txtMarca,#txtPlaca,#txtCertificadoInscripcion,#txtvehiculo,#txtchofer,#txtLicConducir,#txtNroVueltas").attr("disabled", false);
            $("#txtCertificadoInscripcion, #txtLicConducir").val("");
        });

        $("#btnRecargarDestino").on("click", function () {
            $("#slcpais").select2("val", "");
            $("#slcdepa").select2("val", "");
            $("#slcprov").select2("val", "");
            $("#slcdist").select2("val", "");
            $('#txtubigeo').val('');
            $('#txtUrbanizacionDestino').val('');
            $('#txtNroDcto').val('');
            $("#cboTipoDcto").select2("val", "");
            $("#txtDireccionOrigen").select2("val", "");
            autocompletarRazonSocial('#txtRazonSocial', '');
            $("#txtRazonSocial").val("").keyup();
        });

        $("#btnRecargarDctoOrigen").on("click", function () {
            $("#cboOrigen").select2("val", "");
            $('#txtSerieDctoOrigen_0').val('');
            $('#txtNroDctoOrigen_0').val('');
            $('#txtCodigoDctoOrigen_0').val('');
        });


        var time;
        var rqstDireccion = null;

        $("#btnEsperar").on("click", function () {
            $("#modal-confirmar").hide();
            clearTimeout(time);
            time = setTimeout(function () {
                if ($("#fieldsetOrigen .blockMsg").length == 1) {
                    $("#modal-confirmar").show();
                }
            }, 5000);
        });

        $("#btnNoEsperar").on("click", function () {
            if (rqstDireccion) {
                rqstDireccion.abort();
            }
            clearTimeout(time);
            //Desbloquear('fieldsetOrigen');
            $("#modal-confirmar").hide();
        });

        //$('#btnDireccion').click(function () {
        //    if ($('#cboTipoDcto').val() === '6') {
        //        time = setTimeout(function () {
        //            if ($("#fieldsetOrigen .blockMsg").length == 1) { //La consulta esta demorando mucho   
        //                $("#modal-confirmar").show();
        //            }
        //        }, 5000);

        //        //Bloquear('fieldsetOrigen');
        //        rqstDireccion = $.ajax({
        //            url: 'vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT',
        //            async: true,
        //            data: { NRO: $('#txtNroDcto').val() }
        //        }).done(function (data) {

        //            if (data.indexOf('DIRECCION') >= 0) {
        //                var index = data.indexOf('DIRECCION') + 12;
        //                var fin = data.length - 3;

        //                var txt = $("#txtDireccionOrigen[type='text']").length;
        //                if (txt == 1) {
        //                    $('#txtDireccionOrigen').val(data.substring(index, fin));
        //                } else {
        //                    var val = -1;
        //                    var direcciones = $('#txtDireccionOrigen option');
        //                    for (var i = 0; i < direcciones.length; i++) {
        //                        if ($(direcciones[i]).val() == data.substring(index, fin)) {
        //                            val = i;
        //                        }
        //                    }
        //                    if (val == -1) {
        //                        $('#txtDireccionOrigen').append("<option value=\"" + data.substring(index, fin) + "\">" + data.substring(index, fin) + "</option>")
        //                        $('#txtDireccionOrigen').select2("val", data.substring(index, fin));
        //                    } else {
        //                        $('#txtDireccionOrigen').select2("val", data.substring(index, fin));
        //                    }
        //                }
        //            } else {
        //                alertCustom('Sin datos de respuesta.');
        //            }
        //            $("#btnNoEsperar").click();
        //            //Desbloquear('fieldsetOrigen');
        //        }).fail(function (msg) {
        //            if (msg.statusText == "abort") {
        //                infoCustom2("La consulta a SUNAT se canceló");
        //            } else {
        //                alertCustom('Sin datos de respuesta.');
        //            }
        //            $("#btnNoEsperar").click();
        //            //Desbloquear('fieldsetOrigen');
        //        });

        //    } else {
        //        alertCustom('Es necesario el RUC para buscar a la persona en SUNAT.');
        //        if ($('#txtDireccionOrigen')[0].tagName === 'SELECT' && $("#txtDireccionOrigen option").length == 1) {
        //            $('#txtDireccionOrigen').html('<option value="DIRECCION NO REGISTRADA">DIRECCION NO REGISTRADA</option>')
        //        }
        //    }

        //});

        $('#btnDireccion').click(function () {
            if ($('#cboTipoDcto').val() === '6') {
                //time = setTimeout(function () {
                //    if ($("#fieldsetOrigen .blockMsg").length == 1) { //La consulta esta demorando mucho   
                //        $("#modal-confirmar").show();
                //    }
                //}, 5000);
                var NRO = $('#txtNroDcto').val();
                var formData = new FormData();

                formData.append("token", token_migo);
                formData.append("ruc", NRO);

                var request = new XMLHttpRequest();

                request.open("POST", "https://api.migo.pe/api/v1/ruc");
                request.setRequestHeader("Accept", "application/json");

                request.send(formData);
                request.onload = function () {
                    var data = JSON.parse(this.response);
                    if (data.success == true) {
                        if (data.estado_del_contribuyente == "ACTIVO" && data.condicion_de_domicilio == "HABIDO") {
                            $('#txtDireccionOrigen').val(eliminarDiacriticos(data.direccion));
                            $('#txtDireccionOrigen').append("<option value=\"" + eliminarDiacriticos(data.direccion) + "\">" + eliminarDiacriticos(data.direccion) + "</option>")
                            $('#txtDireccionOrigen').select2("val", eliminarDiacriticos(data.direccion));
                        }
                    } else {
                        alertCustom("Servicio SUNAT no disponible en estos momentos.");
                    }
                };
            } else {
                alertCustom('Es necesario el RUC para buscar a la persona en SUNAT.');
                if ($('#txtDireccionOrigen')[0].tagName === 'SELECT' && $("#txtDireccionOrigen option").length == 1) {
                    $('#txtDireccionOrigen').html('<option value="DIRECCION NO REGISTRADA">DIRECCION NO REGISTRADA</option>')
                }
            }
        });

        $("#btnRecargarDireccion").on("click", function () {
            var continuar = true;
            if ($("#slcEmpresa").val() == "") {
                alertCustom("Seleccione una Empresa.")
                continuar = false;
            }
            if ($("#txtDireccionOrigen")[0].tagName == "SELECT") {
                if ($('#hfPIDM').val() == "") {
                    alertCustom("Seleccione una persona válida.")
                    continuar = false;
                }
                if (continuar) {
                    cargarDirecciones();
                }
            } else {
                var pers = $("#txtRazonSocial").val();
                $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase"/>');
                autocompletarRazonSocial('#txtRazonSocial', '');
                $("#txtRazonSocial").val(pers).keyup().siblings("ul").find("li").click();
            }

        });

        var i = 0;
        $("#btnAgregarDctoOrigen").click(function () {
            $("#prueba").append("<div class='row-fluid div_mas_dctoreg' id='div_mas_dctoreg_" + (i = i + 1) + "'>\
            <div class='span12'><div class='span2'></div>\
            <div class='span4'></div>\
            <div class='span4'><div class='control-group'>\
            <div class='controls'>\
            <label class='span2 control-label' for='txtNroDctoOrigen'>Nro</label>\
            <input id='txtSerieDctoOrigen" + (i) + "' class='txtSerieDctoOrigen span4'  type='text' disabled style='text-align: right'/>\
            <input id='txtNroDctoOrigen" + (i) + "' class='txtNroDctoOrigen span6'  type='text' disabled/>\
            <input id='txtCodigoDoc_" + (i) + "' class='txtCodigoDctoOrigen' type='hidden'/>\
            </div></div></div><div class='span2'>\
            <div class='control-group'><div class='controls quitar'><a id='btnBuscadocs_" + (i) + "' onclick=buscarDocumento(this) class='btn blue' data-toggle='modal' data-target='#muestralistap'>\
            <i class='icon-search' style='line-height: initial;'></i></a>&nbsp;\
            <a id='btn_quitar_" + (i) + "' class='btn red btn-quitar' onclick='$(this).parent().parent().parent().parent().parent().remove()'><i class='icon-minus'  style='line-height: initial;'></i></a>\
            </div></div></div></div></div>");
        });

        $("#cboCorrelativo").change(function () {
            var nro_serie = $(this).val();
            switch (nro_serie) {
                case '': {
                    $("#div_correlativos").html('');
                    break;
                }
                case 'C': {
                    $("#hfTIPO_INSERT").val("CORRELATIVO");
                    $("#div_txt_serie_sec").css("display", "none");
                    $("#div_correlativos").attr("class", "span6");
                    $("#div_correlativos").html("<div class='span1' ><div class='control-group'><label class='control-label' for='txt_num_inicio'>Inicio</label></div></div><div class='span5' >" +
                        "<div class='control-group'><div class='controls'><input id='txt_num_inicio' class='span12' type='text' /> </div></div></div><div class='span1' >" +
                        "<div class='control-group'><label class='control-label' for='txt_num_fin'>Fin</label></div></div><div class='span5' ><div class='control-group'>" +
                        "<div class='controls'><input id='txt_num_fin' class='span12' type='text' /> </div></div></div>");
                    $("#txtSerie").val("");
                    $('#txt_num_inicio').keyup(function () {
                        var inicio = numerico($(this).val());
                        var final = numerico($('#txt_num_fin').val());
                        var cant = (!isNaN(inicio) && !isNaN(final) && (final > inicio)) ? (final - inicio + 1) : 1;
                        $('#txtcant').val(cant);
                        $('#txtPU').keyup();
                        var key = event.keyCode ? event.keyCode : event.which;
                        if (key === 13) {
                            if ($(this).val().length > 0) { $('#txt_num_fin').focus(); }
                        }
                    });
                    $('#txt_num_fin').keyup(function () {
                        var inicio = numerico($('#txt_num_inicio').val());
                        var final = numerico($(this).val());

                        var cant = (!isNaN(inicio) && !isNaN(final) && (final > inicio)) ? (final - inicio + 1) : 1;
                        $('#txtcant').val(cant);
                        calcularMontos('txtPU');

                        var key = event.keyCode ? event.keyCode : event.which;
                        if (key == 13) {
                            $('#btnAgregarProducto').focus();
                        }
                    });
                    $('#txt_num_inicio').focus();
                    break;
                }
                case 'S': {
                    $("#hfTIPO_INSERT").val("SECUENCIAL");
                    $("#div_txt_serie_sec").css("display", "block");
                    $("#div_correlativos").attr("class", "span4");
                    $("#div_correlativos").html("<div class='span2' ><div class='control-group'><label class='control-label' for='txt_num_inicio'>Adicionar</label></div>" +
                        "</div><div class='span10' ><div class='control-group'><div class='controls'><input id='txt_serie_add' class='span12' type='text' /> " +
                        "</div></div></div>");
                    $("#txtSerie").val("");
                    $('#txt_serie_add').keypress(function (e) {
                        var code = e.keyCode || e.which;
                        if (code === 13) {
                            if ($(this).val() === '' && $("#txtSerie").val() !== '') {
                                $('#btnAgregarProducto').focus();
                            } else {
                                if ($(this).val() !== '') {
                                    $("#txtSerie").tagsinput("add", $('#txt_serie_add').val());
                                    $('#txt_serie_add').val("");
                                }
                            }
                        }
                    });
                    $('#txt_serie_add').focus();
                    break;
                }
                case 'L': {
                    $("#hfTIPO_INSERT").val("LISTA");
                    $("#div_txt_serie_sec").css("display", "none");
                    $("#div_correlativos").attr("class", "span5");
                    $("#div_correlativos").html('<select id="cboBuscar" class="span10" multiple="multiple" disabled="disabled"></select>&nbsp;<span id="cSeries"><img src="./recursos/img/loading.gif" align="absmiddle"></span>');
                    $("#txtSerie").val("");
                    var arr = [];
                    $.ajax({
                        type: "post",
                        url: "vistas/na/ajax/NAMINSA.ashx?OPCION=LPSER&CODE_PROD=" + $('#hfCOD_PROD').val() + "&CTLG_CODE=" + $('#slcEmpresa').val() + "&COD_ALMC=" + $('#cboAlmacen').val(),
                        contenttype: "application/json;",
                        datatype: "json"
                    }).done(function (data) {
                        $('#cboBuscar').html('');
                        if (data !== null) {
                            for (var i = 0; i < data.length; i++) {
                                $('#cboBuscar').append('<option value="' + data[i].CODIGO_BARRAS + '">' + data[i].CODIGO_BARRAS + '</option>');
                            }
                            $('#cboBuscar').prop('disabled', false);
                        }
                        $('#cSeries').remove();
                    }).fail(function () {
                        alertCustom('Error al listar series del producto.');
                    });
                    $('#cboBuscar').select2();
                    $('#cboBuscar').on('change', function () {
                        $('#txtSerie').val($(this).val());
                        $('#txtcant').val($(this).val().length).keyup();
                    });
                    $('#cboBuscar').select2('open');
                    break;
                }
            }
        });

        $('#txtRazonSocial').keyup(function () {
            if ($(this).val().length == 0) {
                $("#cboTipoDcto").val('');
                $('#cboTipoDcto').change();
                $("#txtDireccionOrigen").val('');
                $("#txtNroDcto").val('');
                $("#hfPIDM").val('');
                $("#txtDIRECCION").val('');
                $("#hfDNI").val('');
                $("#hfRUC").val('');
            }
        });

        $('#txtcant').keyup(function (event) {
            calcularMontos($(this)[0].id);
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13) {
                if ($(this).val().trim().length > 0) { $('#txtPU').focus(); }
            }
        });

        $('#txtPU').keyup(function (event) {
            calcularMontos($(this)[0].id);
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13) {
                if ($(this).val().trim().length > 0) {
                    if ($('#txtmonto').prop('disabled')) {
                        if ($('#chkincluyeIGV').prop('disabled')) { $('#txt_garantia').focus(); }
                        else { $('#chkincluyeIGV').focus(); }
                    } else { $('#txtmonto').focus(); }
                }
            }
        });

        $('#txtmonto').keyup(function (event) {
            calcularMontos($(this)[0].id);
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13) {
                if ($(this).val().trim().length > 0) {
                    if (!$('#chkincluyeIGV').prop('disabled')) {
                        $('#chkincluyeIGV').focus();
                    } else { $('#txt_garantia').focus() }
                }
            }
        });

        $('#txt_garantia').keyup(function (event) {
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13) {
                if ($(this).val().length > 0) {
                    $('#chk_desde_compra').focus();
                }
            }
        });

        $('#chkincluyeIGV').keyup(function (event) {
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13) {
                if ($(this).val().length > 0) {
                    $('#txt_garantia').focus();
                }
            }
        });

        $('#chk_desde_compra').keyup(function (event) {
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13) {
                $('#txtCentroCostos').focus();
            }
        });

        $('#rdPublico').click(function () { //transportista
            $(".typeahead").removeClass("nomostrar");
            $('#txtEmpresaTransporte').prop('disabled', false);
            $('#divBtnTrans').slideDown
            $('#divDatosFact').show();
            $('#divVehiculoFlota').hide();
            $('#txtVehiculoFact').val('');
            $('#txtMarca').val('');
            $('#txtPlaca').val('');
            autocompletarEmpresaTransporte('#txtEmpresaTransporte', '');
            //$('#txtnumdocemptrans').prop('disabled', false);
            $("#cbotipoDoctrans").attr("disabled", false)
            $('#cbotipoDoctrans').select2('val', '').change();
            $('#txtvehiculo').parent().html('<input id="txtvehiculo" class="span12" type="text" style="text-transform: uppercase" />');
            $('#divTxtChofer').html('<input id="txtchofer" class="span12" type="text" style="text-transform: uppercase">');
            limpiarCampos(['#txtEmpresaTransporte', '#txtnumdocemptrans', '#txtvehiculo', '#txtchofer', '#txtCertificadoInscripcion', '#txtLicConducir', '#txtPIDM_EmpresaTransporte', '#hfRUC_EMPTRANS']);
        });

        
         
        $('#rdPrivado').click(function () { //flota
            $('#txtEmpresaTransporte').prop('disabled', true);
            $('#txtEmpresaTransporte').val(empresa.DESCRIPCION);
            $('#txtPIDM_EmpresaTransporte').val(empresa.PIDM);
            $('#txtDireccionTransportista').val(empresa.DIRECCION);
            $('#txtnumdocemptrans').prop('disabled', true);
            $('#cbotipoDoctrans').select2('val', '6').change().prop('disabled', true);
            $('#txtnumdocemptrans, #hfRUC_EMPTRANS').val(empresa.RUC);
            //$('#divBtnTrans').slideUp(500);
            $('#divBtnTrans').slideDown
            $('#txtvehiculo').parent().html('<input id="txtvehiculo" class="span12" type="text" style="text-transform: uppercase" /><select id="cboVehiculo" style="display:none" class="span12"></select>');
            $('#txtchofer').parent().html('<input id="txtchofer" class="span12" type="text" style="text-transform: uppercase" /><select id="cboChofer" style="display:none" class="span12"></select>');
            $('#divVehiculoFlota').show();
            $('#divDatosFact').hide();
            $('#txtVehiculoFact').val('');
            $('#txtMarca').val('');
            $('#txtPlaca').val('');
            cargarVehiculos();
            $("#txtvehiculo").on("focus", function () {
                $("#cboVehiculo").show().select2();
                var cboS2 = $("#cboVehiculo").data("select2");
                setTimeout(function () {
                    if (!cboS2.opened()) {
                        cboS2.open();
                    }
                }, 0);

                $("#s2id_cboVehiculo").attr("style", "margin-left:0px!important");

                $(this).hide();
            });

            $("#cboVehiculo").on("change", function () {
                $("#txtvehiculo").show().val(this.selectedOptions[0].textContent);
                if (this.value != "") {
                    //$("#txtCertificadoInscripcion").val(this.selectedOptions[0].getAttribute("cert"));
                    $("#txtCertificadoInscripcion").val("");
                    $("#txtVehiculoFact").val(this.selectedOptions[0].getAttribute("vehiculo"));
                    $("#txtMarca").val(this.selectedOptions[0].getAttribute("modelo"));
                    $("#txtPlaca").val(this.selectedOptions[0].getAttribute("placa"));
                    cargarChoferes(this.value);

                } else {
                    $("#txtCertificadoInscripcion").val("");
                    $('#txtVehiculo').val('');
                    $('#txtMarca').val('');
                    $('#txtPlaca').val('');

                }
                $(this).select2("destroy").hide();
            });

            $("#txtchofer").on("focus", function () {
                $("#cboChofer").show().select2();
                var cboS2 = $("#cboChofer").data("select2");
                setTimeout(function () {
                    if (!cboS2.opened()) {
                        cboS2.open();
                    }
                }, 0);

                $("#s2id_cboChofer").attr("style", "margin-left:0px!important");

                $(this).hide();
            });

            $("#cboChofer").on("change select2-close", function () {
                $("#txtchofer").show().val(this.selectedOptions[0].textContent);
                if (this.value != "") {
                    $("#txtLicConducir").val(this.selectedOptions[0].getAttribute("lic"));
                    // cargarChoferes(this.value);
                } else {
                    $("#txtLicConducir").val("");

                }
                $(this).select2("destroy").hide();
            });
        });
         


        $('#rdOtro').click(function () { //otro
            autocompletarEmpresaTransporteOtros('#txtEmpresaTransporte', '');
            $(".typeahead").addClass("nomostrar");
            $("#cbotipoDoctrans").attr("disabled", false)
            $('#txtEmpresaTransporte').prop('disabled', false);
            //$('#divBtnTrans').slideUp(500);
            $('#divBtnTrans').slideDown
            $('#divDatosFact').show();
            $('#divVehiculoFlota').hide();
            $('#txtVehiculoFact').val('');
            $('#txtMarca').val('');
            $('#txtPlaca').val('');
            //$('#txtnumdocemptrans').prop('disabled', false);
            $('#cbotipoDoctrans').select2('val', '').change();
            $('#txtvehiculo').parent().html('<input id="txtvehiculo" class="span12" type="text" style="text-transform: uppercase" />');
            $('#divTxtChofer').html('<input id="txtchofer" class="span12" type="text" style="text-transform: uppercase">');
            limpiarCampos(['#txtEmpresaTransporte', '#txtnumdocemptrans', '#txtvehiculo', '#txtchofer', '#txtCertificadoInscripcion', '#txtLicConducir', '#txtPIDM_EmpresaTransporte', '#hfRUC_EMPTRANS']);
        });


        $("#btnRefrescaEmpresaTransporte").click(function () {

            if ($('#rdOtro').is(':checked')) {
                autocompletarEmpresaTransporteOtros('#txtEmpresaTransporte', '');
            } else {
                autocompletarEmpresaTransporte('#txtEmpresaTransporte', '');
            }

        });

        $('#cboRegistro').on('change', function () {
            if ($(this).val() !== $('#cboOrigen').val()) {
                $('#txtSerieDctoRegistro').attr('disabled', false);
                $('#txtNroDctoRegistro').attr('disabled', false);
                if (($('#rbSalida').is(':checked') || $('#rbTSalida').is(':checked')) && $(this).val() !== '') {
                    cargarCorrelativo();
                    establecerCorrelativo('F');
                    if ($(this).val() == '0009') {//GUIA DE REMISIÓN
                        $('#txtSerieDctoRegistro').prop('disabled', true);
                        $('#txtNroDctoRegistro').prop('disabled', true);
                        if ($("#cboOperacion").val() == '0001' || $("#cboOperacion").val() == '0011') {
                            $('#divElec').removeClass('hidden');
                        }
                    }
                } else {
                    //console.log($(this).val());
                    if ($(this).val() == '0051') {
                        $('#txtSerieDctoRegistro').val($("#txtSerieRegistroInterno").val());
                        $('#txtNroDctoRegistro').val($("#txtNroRegistroInterno").val());
                        $('#txtSerieDctoRegistro').prop('disabled', true);
                        $('#txtNroDctoRegistro').prop('disabled', true);    
                    } else {
                        if ($('#rbEntrada').is(':checked') && $("#cboOperacion").val() == '0002' && $(this).val() == '0009') {//SOLO PARA ENTRADA Y COMPRA NACIONAL
                            $("#divNuestraGuia").attr("style", "display:inline");
                        } else {
                            $("#divNuestraGuia").attr("style", "display:none");
                            $('#chkNuestraGuia').prop('checked', false);
                            $('#chkNuestraGuia').parent().removeClass('checked');
                        }
                        $('#txtSerieDctoRegistro').val("");
                        $('#txtNroDctoRegistro').val("");

                        $('#txtSerieDctoRegistro').prop('disabled', false);
                        $('#txtNroDctoRegistro').prop('disabled', false);                       
                    }
                    $('#divElec').addClass('hidden');
                }
                //var fechaelec = $('#cboRegistro :selected').attr('fecha-elec');
                //if (fechaelec == '0000-00-00') {
                //    $('#divElec').addClass('hidden');
                //} else {
                //    if (new Date(fechaelec) <= new Date()) {
                //        if (contieneFormatoEnCorrelativo('E')) {
                //            $('#divElec').removeClass('hidden');
                //        } else {
                //            $('#divElec').addClass('hidden');
                //        }
                //    } else {
                //        $('#divElec').addClass('hidden');
                //    }
                //}
                //$('#chkElectronico').prop('checked', false);
                //$('#chkElectronico').parent().removeClass('checked');
            } else {
                console.log($(this).val());                
                $('#txtSerieDctoRegistro').val($('#txtSerieDctoOrigen_0').val());
                $('#txtNroDctoRegistro').val($('#txtNroDctoOrigen_0').val());
                $('#txtSerieDctoRegistro').attr('disabled', true);
                $('#txtNroDctoRegistro').attr('disabled', true);
            }

            if ($('#rbTSalida').is(':checked') && $(this).val() == '0050') {

                $('#txtSerieDctoRegistro').val($('#txtSerieRegistroInterno').val());
                $('#txtNroDctoRegistro').val($('#txtNroRegistroInterno').val());
                $('#txtSerieDctoRegistro').prop('disabled', true);
                $('#txtNroDctoRegistro').prop('disabled', true);
                if ($(this).val() == '0009') {
                    $('#divElec').removeClass('hidden');
                } else {
                    $('#divElec').addClass('hidden');
                }
            }
            $('#chkElectronico').prop('checked', false);
            $('#chkElectronico').parent().removeClass('checked');
        });

        $('#chkElectronico').click(function () {
            var formato = $(this).is(':checked') ? 'E' : 'F';
            establecerCorrelativo(formato);
            if ($('#rbEntrada').is(':checked') && $("#cboOperacion").val() == '0002' && $("#cboRegistro").val() == '0009' && formato == 'E') {
                cargarCorrelativo();
                establecerCorrelativo(formato);
                $('#txtSerieDctoRegistro').prop('disabled', true);
                $('#txtNroDctoRegistro').prop('disabled', true);
            } else if ($('#rbEntrada').is(':checked') && $("#cboOperacion").val() == '0002' && $("#cboRegistro").val() == '0009' && formato == 'F') {
                cargarCorrelativo();
                establecerCorrelativo(formato);
            }            
        });

        $('#chkNuestraGuia').click(function () {
            if ($(this).is(':checked')) {
                cargarCorrelativo();
                establecerCorrelativo('F');
                $('#txtSerieDctoRegistro').prop('disabled', true);
                $('#txtNroDctoRegistro').prop('disabled', true);
                $('#divElec').removeClass('hidden');
            } else {
                $('#divElec').addClass('hidden');
                $('#txtSerieDctoRegistro').val('');
                $('#txtNroDctoRegistro').val('');
                $('#txtSerieDctoRegistro').prop('disabled', false);
                $('#txtNroDctoRegistro').prop('disabled', false);
            }
        });

        $('#txtDireccionOrigen').on('keyup', function () {
            $('#txtDIRECCION').val($(this).val());
        });

        $('#btnMail').click(function (e) {
            e.preventDefault();
            $('#txtAsunto').val(tipo_mov + ' EN ' + $('#cboAlmacen :selected').text() + ' POR ' + $('#cboOperacion :selected').text());
            $('#lblEmpresa').text($('#ctl00_lbl_empresa').text());
            $('#lblAsunto').text(tipo_mov + ' EN ' + $('#cboAlmacen :selected').text() + ' POR ' + $('#cboOperacion :selected').text() + ' SECUENCIA ' + $('#txtsecuencia').val());
            $('#lblEmision').text($('#txtEmision').val());
            $('#lblTransaccion').text($('#txtTransaccion').val());
            $('#lblSolicitante').text($('#txtSolicitante').val());
            $('#lblReceptor').text($('#txtEntregar').val());
            $('#lblAux').text(aux + ': ');
            $('#lblRazSocial').text($('#txtRazonSocial').val());
            $('#lblTipoDoc').text($('#txtNroDcto').val().length === 11 ? 'RUC' : 'DNI');
            $('#lblNumDoc').text($('#txtNroDcto').val());
            $('#lblDocRegistro').text($('#cboRegistro :selected').text() + ' ' + $('#txtSerieDctoRegistro').val() + '-' + $('#txtNroDctoRegistro').val());
            $('#lblGlosa').text($('#txtGlosa').val());
            $('#lblTablaHtml').html($('#tblImpresion').parent().html());
            $('#lblTablaHtml').children('table').DataTable();
            cargarCorreos();
            $('#divMail').modal('show');

        });

        $('#btnWhatsapp').click(function (e) {
            $('#txtcontenidoWhatsapp').attr('disabled', false);
            $('#txtcontenidoWhatsapp').val("");
            cargarTelefonos();
            $('#divWhatsapp').modal('show');

        });

        //$('#cboAlmacenTransferencia').change(function () {
        //    $('#txtDireccionTransferencia').val($('#cboAlmacenTransferencia :selected').attr('direccion'));
        //});

        $('#cboTipoEnvio').change(function () {
            $('#txtDireccionTransportista').select2('val', '').prop('disabled', true);
            var tipoEnvio = $(this).val();
            switch (tipoEnvio) {
                case 'EDIR': { //ENVIO DIRECTO 
                    $('#txtDireccionOrigen').parent().html('<select id="txtDireccionOrigen" class="span12" disabled="disabled"></select>');
                    $('#txtDireccionOrigen').select2();
                    $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');

                    if ($("#chkdirNoexis").html() != '') {
                        $('#txtUrbanizacionDestino').parent().append('<label class="checkbox"><div class="checker" id="uniform-chkdirNoexis"><span class=""><input type="checkbox" value="" style="opacity: 0;" id="chkdirNoexis"></span></div>Dirección No Pertenece a la Empresa</label>');
                    }

                    
                    AddEventChk_DirNoEncont(2);
                    $('#cboTipoDcto, #txtNroDcto').prop('disabled', true);
                    $('#divDireccionTransportista').slideUp(500);
                    $('#divRdPrivado').slideDown(500);
                    if ($('#txtRazonSocial').val() !== '' && $('#txtRazonSocial').val() !== null) {
                        cargarDirecciones();
                        $('#txtDireccionOrigen').val($('#txtDIRECCION').val()).change();
                    }
                    break;
                }
                case 'EDTR': {// ENVIO EN DOS TRAMOS 
                    $('#txtDireccionOrigen').parent().html('<input type="text" class="span12" id="txtDireccionOrigen" disabled="disabled" />');
                    //$('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2" disabled="disabled" />');
                    $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');
                    $('#txtDireccionOrigen').parent().append('<label class="checkbox"><div class="checker" id="uniform-chkdirNoexis"><span class=""><input type="checkbox" value="" style="opacity: 0;" id="chkdirNoexis"></span></div>Dirección No Pertenece a la Empresa</label>');
                    AddEventChk_DirNoEncont(1);
                    $('#txtDireccionOrigen').val($('#txtDIRECCION').val());
                    $('#cboTipoDcto, #txtNroDcto').prop('disabled', true);
                    $('#divDireccionTransportista').slideDown();
                    $('#rdPublico').click();
                    $('#divRdPrivado').slideUp(500);
                    if ($('#txtEmpresaTransporte').val() !== '' && $('#txtEmpresaTransporte').val() !== null) {
                        cargarDireccionesTransportista();
                    }
                    break;
                }
                case 'DDOC': {//DIRECCION DESTINO POR ORDEN CLIENTE
                    $('#txtDireccionOrigen').parent().html('<input type="text" class="span12" id="txtDireccionOrigen" />');
                    //$('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2" disabled="disabled" />');
                    $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');
                    $('#txtUrbanizacionDestino').parent().append('<label class="checkbox"><div class="checker" id="uniform-chkdirNoexis"><span class=""><input type="checkbox" value="" style="opacity: 0;" id="chkdirNoexis"></span></div>Dirección No Pertenece a la Empresa</label>');
                    AddEventChk_DirNoEncont(1);
                    $('#txtDireccionOrigen').val($('#txtDIRECCION').val());
                    $('#cboTipoDcto, #txtNroDcto').prop('disabled', true);
                    $('#divDireccionTransportista').slideUp(500);
                    $('#divRdPrivado').slideDown(500);
                    break;
                }
                case 'CEAT': {//CON ENTREGA A TERCERO
                    $('#cboTipoDcto, #txtDireccionOrigen, #txtNroDcto').prop('disabled', false);
                    $('#divDireccionTransportista').slideUp(500);
                    $('#divRdPrivado').slideDown(500);
                    break;
                }
                case 'ETDT': {//ENTREGA A TERCERO EN DOS TRAMOS
                    $('#cboTipoDcto, #txtDireccionOrigen, #txtNroDcto').prop('disabled', false);
                    $('#divDireccionTransportista').slideDown(500);
                    $('#rdPublico').click();
                    $('#divRdPrivado').slideUp(500);
                    break;
                }
                case '' || null: {
                    $('#txtDireccionOrigen').parent().html('<input type="text" class="span12" id="txtDireccionOrigen" style="text-transform:uppercase" />');
                    $('#txtDireccionOrigen').parent().append('<input type="text" class="span12" id="txtDireccionOrigen2"  style="display:none;text-transform:uppercase" />');
                    $('#txtUrbanizacionDestino').parent().append('<label class="checkbox"><div class="checker" id="uniform-chkdirNoexis"><span class=""><input type="checkbox" value="" style="opacity: 0;" id="chkdirNoexis"></span></div>Dirección No Pertenece a la Empresa</label>');
                    AddEventChk_DirNoEncont(1);
                }
            }
        });

        $('#txtSerie').change(function () {
            var series = $(this).val().split(',');
            $('#txtcant').val(series.length);
            $('#txtPU').keyup();
        });

        $('#btnRefrescarProductos').click(function (event) {
            event.preventDefault();
            Bloquear('detallemov_datos');
            cargarProductos2();
            $('#txtPROD_CODE').parent().html('<input id="txtPROD_CODE" class="span11" type="text" style="text-transform: uppercase">');
            $('#txtPROD_CODE').keyup(function (event) {
                var key = event.keyCode ? event.keyCode : event.which;
                if (key === 13 && $(this).val().trim() === '') { $('#txtPROD_DESC').focus(); }
            });
            autocompletarCodigoProducto2('#txtPROD_CODE', '');
            $("#txtPROD_DESC").parent().html('<input id="txtPROD_DESC" class="span12" type="text" />');
            $('#txtPROD_DESC').keyup(function (event) {
                var key = event.keyCode ? event.keyCode : event.which;
                if (key === 13) {
                    if ($(this).val().trim() !== '' && $('#hfCOD_PROD').val().trim() !== '') {
                        if ($('#txtcant').prop('disabled')) { $('#txtPU').focus() }
                        else { $('#txtcant').focus() }
                    }
                }
            });
            autocompletarProducto2('#txtPROD_DESC', '');
            $("#cboUniMedida").html("<option></option>").attr("disabled", true).select2()
            $("#txtPU").val("");
            $("#txtKU").val("");
            $("#txtmonto").val("");
            $("#txtStock").val("");
            Desbloquear('detallemov_datos');
        });

        $('#btnRecargarTabla').click(function () { 
            var cod = ObtenerQueryString('codigo');

            if (cod !== undefined) {
                listarDetalles();
                listarTotales(cod);
            }
        });

        $('#btnEliminarDetalles').click(function () {
            //Bloquear("div_tabla_det");
            var filas = $('#tabla_det').DataTable().rows('.seleccionado').data().toArray();
            var item = '';
            var doc_origen = '';
            for (var i in filas) { item += filas[i].ITEM + ',' }
            for (var j in filas) { doc_origen += filas[j].DCTO_ORGN_CODE + ',' }
            $.ajax({
                type: "post",
                url: "vistas/na/ajax/naminsa.ashx?OPCION=DELETE",
                data: { ISAC_CODE: ObtenerQueryString('codigo'), item: item, doc_origen: doc_origen}
            }).done(function (data) {
                if (data === "OK") {
                    $('#btnEliminarDetalles').prop('disabled', true);
                    listarDetalles();
                    if ($('#tabla_det').DataTable().data().toArray().length === 0 && $('#cboOrigen').val() !== '') { $('#btnVerDetallesOrigen').removeClass('hidden'); }
                    $('#chkTodos').prop('checked', false).parent().removeClass('checked');
                    exito();
                } else {
                    alertCustom('Error al listar los detalles');
                }
                //Desbloquear("div_tabla_det");
            }).fail(function () {
                //Desbloquear("div_tabla_det");
                alertCustom('Ocurrió un error al intentar eliminar el producto de la lista.');
            });
        });

        $('#chkTodos').click(function () {
            var checked = $(this).is(':checked');
            $('#btnEliminarDetalles').prop('disabled', !checked);
            $('#tabla_det tbody input[type=checkbox]').prop('checked', checked);
            if (checked) {
                $('#tabla_det tbody input[type=checkbox]').parent().addClass('checked');
                $('#tabla_det tbody tr').addClass('seleccionado');
            } else {
                $('#tabla_det tbody input[type=checkbox]').parent().removeClass('checked');
                $('#tabla_det tbody tr').removeClass('seleccionado');
            }
        });

        $("#tabDetalleMov").on("click", function () {
            if ($("#txtNroDctoOrigen_0").val() != "") {
                $("#btnVerDetallesOrigen_2").removeClass("hidden");
            } else {
                $("#btnVerDetallesOrigen_2").addClass("hidden");
            }
        });

        $('#btnVerificarSN').click(function () {
            var RAZON_DEST = $('#hfPIDM').val();
            var TIP_DCTO = $("#cboRegistro").val();
            var DCTO_ORGN = $("#txtNroDctoRegistro").val();
            var DCTO_ORGN_SERIE = $("#txtSerieDctoRegistro").val();
            var ISAC_CODE = $("#txtNumDctoAlmc").val();
            ValidarSerieNumeroEmpresa(RAZON_DEST, TIP_DCTO, DCTO_ORGN_SERIE, DCTO_ORGN, true, ISAC_CODE)
        });

        $('#btnImprimirGuia, #btnImprimir').click(function () {
            let documento_registro = $('#cboRegistro').val();
            let serie_documento_registro = $('#txtSerieDctoRegistro').val()

            if (documento_registro == '0009' && serie_documento_registro.substring(0, 1) == 'T') { //Si es una Guía Electrónica
                ImprimirGuiaRemisionElectonica($("#txtNumDctoAlmc").val());
            } else {
                crearImpresion($("#txtNumDctoAlmc").val());
            }
            
            /*  $("#tblImprGuias tbody").html('');
               var ind_inicio = 1;
               var ind_fin = 0;
               var nro_lineas_gui = 0;
               var nro_items_guia = 0;
   
               ListarNumeroLineasImprimir();
               nro_items = json_datos_imp.length;
               //nro_items = nro_items - 1;
               for (var i = 0; i < json_datos_imp.length; i++) {
                   if (json_datos_imp[i].SERIADO_IND == "S") {
                       campo1 = json_datos_imp[i].DESC_PRODUCTO + ";NRO SERIE(" + json_datos_imp[i].NRO_SERIE + ")";
   
                   } else {
                       campo1 = json_datos_imp[i].DESC_PRODUCTO;
   
                   }
               }
   
               if (jsonlineas_gui != null) {
                   nro_lineas_gui = jsonlineas_gui[0].LINEAS;
                   if (nro_items <= nro_lineas_gui) {
                       ImprimirGuia(1, nro_items);
                   } else {
                       var resto = nro_items % nro_lineas_gui;
                       var nro_docs = (nro_items - resto) / nro_lineas_gui
                       if (resto > 0) {
                           nro_docs += 1;
                       }
                       var ind_fin = 0;
                       if (nro_docs > 1) {
                           for (var c = 1; c <= nro_docs; c++) {
   
   
                               if (nro_docs != c) {
   
                                   ind_fin = parseFloat(ind_fin) + parseFloat(nro_lineas_gui);
                                   nro_items_guia = parseFloat(ind_fin) - parseFloat(ind_inicio) + 1;
                                   $('#tblImprGuias').append("<tr><td style='text-align:center;'>" + c + "</td>" + "<td style='text-align:center;'>" + nro_items_guia + "</td>" + "<td style='text-align:center;display:none;'>" + ind_inicio + "</td><td style='text-align:center;display:none;'>" + ind_fin + "</td><td style='text-align:left;'><a class='btn black' href='javascript:ImprimirGuia(" + ind_inicio + "," + ind_fin + ");'><i class='icon-print'></i>&nbsp;Imprimir</a></td></tr>");
                               } else {
                                   ind_fin = nro_items;
                                   nro_items_guia = parseFloat(ind_fin) - parseFloat(ind_inicio) + 1;
                                   $('#tblImprGuias').append("<tr><td style='text-align:center;'>" + c + "</td>" + "<td style='text-align:center;'>" + nro_items_guia + "</td>" + "<td style='text-align:center;display:none;'>" + ind_inicio + "</td><td style='text-align:center;display:none;'>" + ind_fin + "</td><td style='text-align:left;'><a class='btn black' href='javascript:ImprimirGuia(" + ind_inicio + "," + ind_fin + ");'><i class='icon-print'></i>&nbsp;Imprimir</a></td></tr>");
                               }
                               ind_inicio = parseFloat(ind_inicio) + parseFloat(nro_lineas_gui);
                           }
                       }
                       $('#impr_guias').modal('show');
   
                   }
   
               }
               */
        });

        $("#btn_filtrar").on("click", function () {
            obtenerDocumentosGarantia();
        });

        $("#slcpais").on('change', function () {
            var pais = $('#slcpais').val();
            fnFillcboDepa(pais);
        });

        $("#slcdepa").on('change', function () {
            var depa = $(this).val();
            fnFillcboProv(depa);
        });

        $("#slcprov").on('change', function () {
            var prov = $(this).val();
            fnFillcboDist(prov);
        });

        $("#slcdist").on('change', function () {
            var ubigeo = $(this).val();           
            var ubigeoFinal = $('#slcdist option:selected').attr('codigoUb');
            $('#txtubigeo').val(ubigeo);
            $('#txtCodubigeo').val('');
            $('#txtCodubigeo').val(ubigeoFinal);
        });

        $("#btnEditar").on("click", function () {
            var tp, td, d;
            if (!vErrorsNotMessage(['txtRazonSocial'])) {                
                alertCustom("Debe ingresar los campos requeridos.");
            } else {
                td = $("#cboTipoDcto").val();
                d = $("#txtNroDcto").val();

                if (td == "6") {//JURIDICA         
                    if (d.length == 11) {
                        if (d.toString().substring(0, 1) == "1") {
                            //PERSONA NATURAL CON RUC    
                            tp = "N";
                            window.open("?f=NKMGECL&tp=" + tp + "&td=" + td + "&d=" + d + "", "_blank");
                        } else {
                            //PERSONA JURÍDICA  
                            tp = "J";
                            window.open("?f=NKMGECL&tp=" + tp + "&td=" + td + "&d=" + d + "", "_blank");
                        }
                    } else {
                        alertCustom("Ingrese un número de documento válido");
                    }
                } else {//PERSONA NATURAL
                    tp = "N";
                    window.open("?f=NKMGECL&tp=" + tp + "&td=" + td + "&d=" + d + "", "_blank");
                }                
            }
        });

        $('#cboUniMedida').on('change', function () {
            let equi = parseFloat($('#cboUniMedida option:selected').attr('equivalencia'));
            let precio = parseFloat($('#txtPrecioUnitInicio').val());
            let precio_unitario = equi * precio;
            $('#txtPU').val(precio_unitario.toFixed(prmtDIGI));

            if ($('#txtcant').val() == '') {
                $('#txtmonto').val(precio_unitario.toFixed(prmtDIGI));
            } else {
                let cant = parseFloat($('#txtcant').val());
                let monto = cant * precio_unitario;
                $('#txtmonto').val(monto.toFixed(prmtDIGI));
            }
            
        });

        $('#txtGlosa').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                return false;
            }
        });
              
    };

    var AddEventChk_DirNoEncont = function (tipo) {

        $('#chkdirNoexis').on('click', function () {

            var checked = $(this).is(':checked');
            $("#txtDireccionOrigen2").val("")
            if (checked) {
                $("#divUbigeo").removeClass('hidden');
                $('#uniform-chkdirNoexis span').removeClass().addClass("checked");
                $('#chkdirNoexis').attr('checked', true);
                $('#slcpais').attr("disabled", false);  
                $("#lblUrba").css({ "display": "block" });
                $("#txtUrbanizacionDestino").css({ "display": "block" });
                $('#txtUrbanizacionDestino').attr("disabled", false);  
                $("#txtUrbanizacionDestino").val("");                
                $('#slcdist').select2("val", "").change();
                $('#slcprov').select2("val", "").change();
                $('#slcdepa').select2("val", "").change();
                $('#slcdepa').attr("disabled", true);
                $('#slcprov').attr("disabled", true);
                $('#slcdist').attr("disabled", true);
                fnFillcboPais();
                $('#slcpais').select2("val", "0001").change();
                let ubiAlmacen = $("#cboAlmacen").find('option:selected').attr("data-ubigeo");
                let asUbigeoSunat = fnGetCodUbigeoSunat(ubiAlmacen);
                $("#slcpais").val("").change();
                $("#slcdepa").val("").change();
                $("#slcprov").val("").change();
                $("#slcdist").val("").change();
                if (asUbigeoSunat.length !== 0) {
                    $("#slcpais").val(asUbigeoSunat[0].CODE_PAIS).change();
                    $("#slcdepa").val(asUbigeoSunat[0].UBIG_DEPARTAMENTO).change();
                    $("#slcprov").val(asUbigeoSunat[0].UBIG_PROVINCIA).change();
                    $("#slcdist").val(asUbigeoSunat[0].UBIG_DISTRITO).change();
                    $('#txtubigeo').val(asUbigeoSunat[0].UBIG_DISTRITO);
                }
            } else {
                $("#lblUrba").css({ "display": "none" });
                $("#txtUrbanizacionDestino").css({ "display": "none" });
                $("#divUbigeo").addClass('hidden');
                $('#uniform-chkdirNoexis span').removeClass();
                $('#chkdirNoexis').attr('checked', false);
                $('#slcpais').attr("disabled", true);
                $('#slcdepa').attr("disabled", true);
                $('#slcprov').attr("disabled", true);
                $('#slcdist').attr("disabled", true);   
                $('#txtUrbanizacionDestino').attr("disabled", true);
                $('#txtCodUbigeo').val('');

                if (!vErrorsNotMessage(['txtRazonSocial'])) {
                    alertCustom("Debe ingresar los campos requeridos.");
                } else {
                    cargarDirecciones();
                }                
            }
            switch (tipo) {
                case 1: {
                    if (checked) {
                        $('#txtDireccionOrigen').css("display", "none")
                        $('#txtDireccionOrigen2').css("display", "block")
                    } else {
                        $('#txtDireccionOrigen').css("display", "block")
                        $('#txtDireccionOrigen2').css("display", "none")
                    }
                    break;
                }
                case 2: {
                    if (checked) {
                        $("#txtDireccionOrigen").select2("container").hide()
                        $('#txtDireccionOrigen2').css("display", "block")
                    } else {
                        $("#txtDireccionOrigen").select2("container").show()
                        $('#txtDireccionOrigen2').css("display", "none")
                    }
                    break;
                }

            }
        });

    }

    //DPORTA - CANTIDAD DE DECIMALES EN LOS MONTOS
    var calcularMontos = function (input) {
        var cant = parseFloat($('#txtcant').val());
        var pu = parseFloat($('#txtPU').val());
        var monto = parseFloat($('#txtmonto').val());
        let equi = parseFloat($('#cboUniMedida option:selected').attr('equivalencia'));
        let precioNuevo = pu / equi;
        $('#txtPrecioUnitInicio').val(precioNuevo.toFixed(prmtDIGI));
        switch (input) {
            case 'txtcant': {
                if (!isNaN(cant)) {
                    if (!isNaN(pu) && isNaN(monto)) {
                        monto = (pu * cant);
                        $('#txtmonto').val(isNaN(monto) ? '' : monto.toFixed(prmtDIGI));
                    } else if (!isNaN(monto) && isNaN(pu)) {
                        pu = (monto / cant);
                        $('#txtPU').val(isNaN(pu) ? '' : pu.toFixed(prmtDIGI));
                    } else if (!isNaN(monto) && !isNaN(pu)) {
                        monto = (pu * cant);
                        $('#txtmonto').val(isNaN(monto) ? '' : monto.toFixed(prmtDIGI));
                    }
                }
                break;
            }
            case 'txtPU': {
                if (!isNaN(cant) && !isNaN(pu)) {
                    monto = pu * cant;
                    $('#txtmonto').val(monto.toFixed(prmtDIGI));
                }
                if ($('#txtPU').val() === '') $('#txtmonto').val('')
                break;
            }
            case 'txtmonto': {
                if (!isNaN(cant) && !isNaN(monto)) {
                    pu = monto / cant;
                    $('#txtPU').val(pu.toFixed(prmtDIGI));
                }
                if ($('#txtmonto').val() === '') $('#txtPU').val('')
                break;
            }
        }
    };

    var cargarTiposMovimiento = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false
        }).done(function (datos) {
            if (datos !== null) { tipos_mov = datos; }
        }).fail(function (msg) {
            alertCustom('Error al listar las Operaciones.');
        });
    };

    var listarOperacionES = function (tipomov) {
        var select = $('#cboOperacion');
        select.html('<option></option>');
        var array;
        for (var i = 0; i < tipos_mov.length; i++) {
            array = tipos_mov[i].TIPO_MOV.split('');
            if (array.indexOf(tipomov) > -1 && tipos_mov[i].CODIGO !== '0021' && tipos_mov[i].CODIGO !== '0011') {
                select.append('<option value="' + tipos_mov[i].CODIGO + '" data-tipo-movcont="' + tipos_mov[i].MOV_CONT + '" data-tipo-persona="' + tipos_mov[i].TIPO_PERSONA + '" data-origenes="' + tipos_mov[i].DOCS_ORIGEN + '" data-registros="' + tipos_mov[i].DOCS_REGISTRO + '" data-nivel-aprobacion="' + tipos_mov[i].NIVEL_APROBACION + '" data-costos-requeridos="' + tipos_mov[i].COSTOS_REQUERIDOS + '">' + tipos_mov[i].DESCRIPCION + '</option>');
            }
        }
    }

    var listarOperacionT = function (tipomov) {
        var select = $('#cboOperacion');
        select.html('<option></option>');
        for (var i = 0; i < tipos_mov.length; i++) {
            if (tipos_mov[i].TIPO_MOV === tipomov) {
                select.append('<option value="' + tipos_mov[i].CODIGO + '" data-tipo-movcont="' + tipos_mov[i].MOV_CONT + '" data-tipo-persona="' + tipos_mov[i].TIPO_PERSONA + '" data-origenes="' + tipos_mov[i].DOCS_ORIGEN + '" data-registros="' + tipos_mov[i].DOCS_REGISTRO + '" data-nivel-aprobacion="' + tipos_mov[i].NIVEL_APROBACION + '" data-costos-requeridos="' + tipos_mov[i].COSTOS_REQUERIDOS + '">' + tipos_mov[i].DESCRIPCION + '</option>');
            }
        }
    }

    var cargarEmpresaDefault = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/NAMINSA.ashx?OPCION=0&CTLG_CODE=" + $('#slcEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    empresa = datos[0];
                    $('#txtEmpresaTransporte').prop('disabled', true);
                    $('#txtEmpresaTransporte').val(datos[0].DESCRIPCION);
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar las empresas.');
            }
        });
    };

    //var cargarEmpresaDtosBasicos = function () {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/na/ajax/NAMINSA.ashx?OPCION=00&CTLG_CODE=" + $('#slcEmpresa').val(),
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            if (datos != null) {
    //                empresa = datos[0];
    //                $('#txtEmpresaTransporte').prop('disabled', true);
    //                $('#txtEmpresaTransporte').val(datos[0].DESCRIPCION);
    //            }
    //        },
    //        error: function (msg) {
    //            alertCustom('Error al intentar listar las empresas.');
    //        }
    //    });
    //};

    var cargarEmpresas = function () {
        var select = $('#slcEmpresa, #cboCtlg');
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                select.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar empresas.');
            }
        });
    };

    var cargarAlmacenes = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#slcEmpresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboAlmacen').html('');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboAlmacen').append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].SCSL_CODE + '"data-ubigeo="' + datos[i].UBIGEO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Ocurrió un error al listar almacenes.');
            }
        });
    };

    var cargarAlmacenesDatos = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#slcEmpresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $("#txtUbigeoOrigen").val(datos[0].UBIGEO);
                    $("#txtDirecOrigen").val(datos[0].DIRECCION);
                    $("#txtUrbOrigen").val(datos[0].URBANIZACION);
                }
            },
            error: function (msg) {
                alertCustom('Ocurrió un error al listar almacenes.');
            }
        });
    };

    var cargarAlmacenesTransferencia = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=1&CTLG_CODE=" + $('#slcEmpresa').val() + "&COD_ALMC=" + $('#cboAlmacen').val() + "&TIPO=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboAlmacenTransferencia').html('<option></option>');
                if (datos[0].CODIGO !== "" && datos[0].DESCRIPCION !== "") {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboAlmacenTransferencia').append('<option value="' + datos[i].CODIGO + '" direccion="' + datos[i].DIRECCION + '"data-ubigeo="' + datos[i].UBIGEO +  '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar almacenes de transferencia.');
            }
        });
    }

    var cargarVehiculos = function () {
        var select = $("#cboVehiculo");
        $.ajax({
            type: "post",
            url: "vistas/NF/ajax/NFMUNID.ASHX?flag=12.5&codigo=&empr=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            //beforeSend: function () { Bloquear($(select.parent())); },
            async: true,
            success: function (datos) {
                select.html("<option></option>");
                if (datos.length > 0) {
                    var carroceria = '';
                    for (var i = 0; i < datos.length; i++) {
                        carroceria = datos[i].CARROCERIA;
                        //console.log(carroceria);

                        let sOptionHtml = `<option value=${datos[i].CODIGO} cert=${datos[i].NRO_CONSTANCIA} placa=${datos[i].PLACA} modelo=${datos[i].NOMBRE_MODELO} vehiculo="${carroceria}"> ${datos[i].nombre_marca} ${datos[i].NOMBRE_MODELO} ${datos[i].PLACA} </option>`;
                        //console.log(sOptionHtml);
                        select.append(sOptionHtml);
                    }
                }
            },
            error: function (msg) {
                alertCustom('');
            },
            //complete: function () { Desbloquear($(select.parent())); }
        });
    }

    var cargarChoferes = function (code) {
        var select = $("#cboChofer");

        $.ajax({
            type: "post",
            url: "vistas/NF/ajax/NFMUNID.ASHX?flag=18&codigo=" + code,
            contenttype: "application/json;",
            datatype: "json",
            //beforeSend: function () { Bloquear($(select.parent())); },
            async: true,
            success: function (datos) {
                select.html("<option></option>");
                if (datos.length > 0) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append("<option value=" + i + " lic=" + datos[i].NUMERO_LICENCIA + ">" + datos[i].NOMBRE + "</option>");
                    }
                    select.val(0);
                }
                select.change();

            },
            error: function (msg) {
                alertCustom('');
            },
            //complete: function () { Desbloquear($(select.parent())); }
        });
    }
    //===== AUTOCOMPLETAR PARA CAMPO Nombre / Razon Social

    var autocompletarRazonSocial = function (v_ID, v_value) {

        $("#divTxtProveedor").html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase" />');
        var input = $(v_ID);
        //TO DO: Verificar si es necesario enviar CTLG
        //Bloquear('divTxtProveedor');

        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=4",
            cache: false,
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos !== null) {
                    textproveedores = input.typeahead({
                        items: 20,
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};

                            let aoObj = new Array();
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);

                                var obj = {};
                                obj.DNI = datos[i].DNI;
                                obj.RUC = datos[i].RUC;
                                obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                                obj.DIRECCION = datos[i].DIRECCION;
                                obj.PIDM = datos[i].PIDM;
                                obj.NRO_DOCUMENTO = datos[i].NRO_DOCUMENTO;
                                obj.CODIGO_TIPO_DOCUMENTO = datos[i].CODIGO_TIPO_DOCUMENTO;
                                obj.TIPO_DOCUMENTO = datos[i].TIPO_DOCUMENTO;
                                aoObj.push(obj);
                            }
                            jsonProveedores = aoObj;
                            $.each(aoObj, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);
                        },
                        updater: function (item) {

                            $("#hfPIDM").val(map[item].PIDM);
                            $("#txtDIRECCION").val(map[item].DIRECCION);

                            if ($('#txtDireccionOrigen').get(0).tagName === 'INPUT') {
                                $("#txtDireccionOrigen").val($("#txtDIRECCION").val());
                            } else {
                                cargarDirecciones();
                                $('#txtDireccionOrigen').val($('#txtDIRECCION').val()).change();
                            }
                            cargarTipoDocumento();

                            if (map[item].CODIGO_TIPO_DOCUMENTO === '1') {
                                $("#hfDNI").val(map[item].NRO_DOCUMENTO);
                            }
                            if (map[item].CODIGO_TIPO_DOCUMENTO === '6') {
                                $('#hfRUC').val(map[item].NRO_DOCUMENTO);
                            }
                            if (map[item].CODIGO_TIPO_DOCUMENTO === '0') {
                                $('#hfOTROS').val(map[item].NRO_DOCUMENTO);
                            }

                            $("#cboOrigen").val("NINGUNO").change();
                            if ($('#hfRUC').val() === '' || $('#hfDNI').val() === '') {
                                $('#cboTipoDcto').prop('disabled', false);
                            } else {
                                $('#cboTipoDcto').prop('disabled', false);
                            }

                            if ($('#cboTipoEnvio').val() === 'CEAT') {
                                $('#cboTipoDcto').prop('disabled', false);
                            }
                            
                            //CARGAR OTRO DOCUMENTO, SI DNI Y RUC ESTÁN VACIOS, SINO LIMPIAR
                            if (map[item].RUC == "" && map[item].DNI == "") {
                                if (map[item].NRO_DOCUMENTO != "") {
                                    $("#cboTipoDcto").val(map[item].CODIGO_TIPO_DOCUMENTO).change();
                                    $("#hfDNI").val(map[item].NRO_DOCUMENTO);
                                    $("#txtNroDcto").val(map[item].NRO_DOCUMENTO);
                                } else {
                                    $("#cboTipoDcto").val("").change();
                                    $("#txtNroDcto").val("");
                                }
                            }

                            //if ($('#cboTipoEnvio').val() === 'CEAT') {
                            //    $('#cboTipoDcto').prop('disabled', false);
                            //} else {
                            //    $('#cboTipoDcto').prop('disabled', true);
                            //}
                            return item;                                                        
                        },
                    });
                    input.keyup(function () {
                        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($(this).val().length === 0) {
                            $('#cboTipoDcto, #txtNroDcto, #hfPIDM, #txtDIRECCION, #hfDNI, #hfRUC, .txtSerieDctoOrigen, .txtNroDctoOrigen').val('');
                            $("#txtDireccionOrigen").val('');
                            $('#cboTipoDcto').change();
                            $('.div_mas_dctoreg').remove();
                            $('#cboTipoDcto').prop('disabled', true);
                        }
                    });
                }
                //Desbloquear('divTxtProveedor');
            },
            error: function (msg) {
                alertCustom('Error al listar los Proveedores.');
                //Desbloquear('divTxtProveedor');
            }
        });
    };

    var autocompletarClientes = function (v_ID, v_value) {
        var selectinput = $(v_ID);
        //Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=5",
            cache: false,
            datatype: "json",
            async: true,
            data: { CTLG_CODE: $('#slcEmpresa').val() },
            success: function (datos) {
                if (datos !== null) {
                    items: 20,
                        selectinput.typeahead({
                            source: function (query, process) {

                                arrayClientes = [];
                                map = {};
                                let aoObj = new Array();
                                for (var i = 0; i < datos.length; i++) {
                                    arrayClientes.push(datos[i].RAZON_SOCIAL);

                                    var obj = {};
                                    obj.DNI = datos[i].DNI;
                                    obj.RUC = datos[i].RUC;
                                    obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                                    obj.DIRECCION = datos[i].DIRECCION;
                                    obj.PIDM = datos[i].PIDM;
                                    obj.NRO_DOCUMENTO = datos[i].NRO_DOCUMENTO;
                                    obj.CODIGO_TIPO_DOCUMENTO = datos[i].CODIGO_TIPO_DOCUMENTO;
                                    obj.TIPO_DOCUMENTO = datos[i].TIPO_DOCUMENTO;
                                    aoObj.push(obj);
                                }

                                $.each(aoObj, function (i, objeto) {
                                    map[objeto.RAZON_SOCIAL] = objeto;
                                });
                                process(arrayClientes);

                            },
                            updater: function (item) {
                                $("#hfPIDM").val(map[item].PIDM);
                                $("#txtDIRECCION").val(map[item].DIRECCION);
                                
                                if ($('#txtDireccionOrigen').get(0).tagName === 'INPUT') {
                                    $("#txtDireccionOrigen").val($("#txtDIRECCION").val());
                                } else {
                                    cargarDirecciones();
                                    $('#txtDireccionOrigen').val($('#txtDIRECCION').val()).change();
                                }                                
                            cargarTipoDocumento();                            

                            if (map[item].CODIGO_TIPO_DOCUMENTO === '1') {
                                $("#hfDNI").val(map[item].NRO_DOCUMENTO);
                            }
                            if (map[item].CODIGO_TIPO_DOCUMENTO === '6') {
                                $('#hfRUC').val(map[item].NRO_DOCUMENTO);
                            }
                            if (map[item].CODIGO_TIPO_DOCUMENTO === '0') {
                                $('#hfOTROS').val(map[item].NRO_DOCUMENTO);
                            }

                           
                            if ($('#hfRUC').val() === '' || $('#hfDNI').val() === '') {
                                $('#cboTipoDcto').prop('disabled', false);
                            } else {
                                $('#cboTipoDcto').prop('disabled', false);
                            }

                            if ($('#cboTipoEnvio').val() === 'CEAT') {
                                $('#cboTipoDcto').prop('disabled', false);
                            }                           
                            $("#cboOrigen").val("NINGUNO").change();
                            //CARGAR OTRO DOCUMENTO, SI DNI Y RUC ESTÁN VACIOS, SINO LIMPIAR
                            if (map[item].RUC == "" && map[item].DNI == "") {
                                if (map[item].NRO_DOCUMENTO != "") {
                                    $("#cboTipoDcto").val(map[item].CODIGO_TIPO_DOCUMENTO).change();
                                    $("#hfDNI").val(map[item].NRO_DOCUMENTO);
                                    $("#txtNroDcto").val(map[item].NRO_DOCUMENTO);
                                } else {
                                    $("#cboTipoDcto").val("").change();
                                    $("#txtNroDcto").val("");
                                }
                            }

                                return item;
                            },
                        });
                    selectinput.keyup(function () {
                        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($(this).val().length === 0) {
                            $('#cboOrigen, #hfCOD_AUT, #txtSerieDctoRegistro, #txtNroDctoRegistro, #cboRegistro, #cboTipoDcto, #txtNroDcto, #hfPIDM, #txtDIRECCION, #hfDNI, #hfRUC, .txtSerieDctoOrigen, .txtNroDctoOrigen').val('');
                            $('#cboOrigen, #cboRegistro, #cboTipoDcto').change();
                            if ($('#txtDireccionOrigen').get(0).tagName === 'SELECT') {
                                $('#txtDireccionOrigen').html('').select2().prop('disabled', true);
                            }
                            if ($('#txtDireccionOrigen').get(0).tagName === 'INPUT') {
                                $('#txtDireccionOrigen').val('');
                            }
                            $('#cboTipoDcto').prop('disabled', true);
                            $('.div_mas_dctoreg').remove();
                        }
                    });
                }
                //Desbloquear('ventana');
            },
            error: function (msg) {
                alertCustom('Error al listar Clientes.');
                //Desbloquear('ventana');
            }
        });
    };

    var autocompletarPersonas = function (v_ID, v_value) {
        var selectinput = $(v_ID);
        //Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LPER",
            cache: false,
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos !== null) {

                    selectinput.typeahead({
                        items: 20,
                        source: function (query, process) {
                            arrayPersonas = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayPersonas.push(datos[i].RAZON_SOCIAL);
                                obj += '{ "CODIGO_TIPO_DOC": "' + datos[i].CODIGO_TIPO_DOC + '","NRO_DOC": "' + datos[i].NRO_DOC + '","RAZON_SOCIAL": "' + datos[i].RAZON_SOCIAL + '","DIRECCION": "' + datos[i].DIRECCION + '","PIDM": "' + datos[i].PIDM + '" },';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });

                            process(arrayPersonas);
                        },
                        updater: function (item) {
                            setTimeout(function () {

                                $("#hfPIDM").val(map[item].PIDM);
                                $("#txtDIRECCION").val(map[item].DIRECCION);
                                $("#txtRazonSocial").val(map[item].RAZON_SOCIAL);
                                

                                if ($("#cboOperacion").val() == "0008") {// PREMIO
                                    if ($('#txtDireccionOrigen').get(0).tagName === 'INPUT') {
                                        $("#txtDireccionOrigen").val($("#txtDIRECCION").val());
                                    } else {
                                        cargarDirecciones();
                                        $('#txtDireccionOrigen').val($('#txtDIRECCION').val()).change();
                                    }
                                }

                                cargarTipoDocumento();  
                                $("#txtDireccionOrigen").val($("#txtDIRECCION").val());

                                if (map[item].CODIGO_TIPO_DOC === '6') {
                                    $('#hfRUC').val(map[item].NRO_DOC);
                                } else {
                                    $("#hfDNI").val(map[item].NRO_DOC);
                                }

                                $('#cboTipoDcto').val(map[item].CODIGO_TIPO_DOC).change();

                                if ($('#cboTipoEnvio').val() === 'CEAT') {
                                    $('#cboTipoDcto').prop('disabled', false);
                                }
                                return item;
                            }, 200);

                        },
                    });
                    selectinput.keyup(function () {
                        //$('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($(this).val().length == 0) {
                            $('#cboTipoDcto, #txtNroDcto, #hfPIDM, #txtDIRECCION, #hfDNI, #hfRUC, .txtSerieDctoOrigen, .txtNroDctoOrigen').val('');
                            $("#txtDireccionOrigen").val('');
                            $('#cboTipoDcto').change();
                            $('.div_mas_dctoreg').remove();

                            if ($('#txtDireccionOrigen').get(0).tagName === 'SELECT') {
                                $('#txtDireccionOrigen').html('').select2().prop('disabled', true);
                            }
                            if ($('#txtDireccionOrigen').get(0).tagName === 'INPUT') {
                                $('#txtDireccionOrigen').val('');
                            }
                        }
                    });
                }
                //Desbloquear('ventana');
            },
            error: function (msg) {
                alertCustom('Error al listar Personas.');
                //Desbloquear('ventana');
            }
        });
    };

    var autocompletarTrabajador = function (v_ID, v_value) {
        var selectinput = $(v_ID);
        //Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=3&CTLG_CODE=" + $('#slcEmpresa').val() + '&SCSL_CODE=' + $('#cboAlmacen :selected').attr('data-scsl-code'),
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    selectinput.typeahead({
                        items: 20,
                        source: function (query, process) {
                            arrayTrabj = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayTrabj.push(datos[i].NOMBRE_EMPLEADO);
                                obj += '{';
                                obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '","PIDM":"' + datos[i].PIDM + '","DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","DIRECCION":"' + datos[i].DIRECCION + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE_EMPLEADO] = objeto;
                            });
                            process(arrayTrabj);

                        },
                        updater: function (item) {
                            $("#hfPIDM").val(map[item].PIDM);
                            $("#txtDIRECCION").val(map[item].DIRECCION);
                            $("#txtDireccionOrigen").val($("#txtDIRECCION").val());

                            if ($('#txtDireccionOrigen').get(0).tagName === 'INPUT') {
                                $("#txtDireccionOrigen").val($("#txtDIRECCION").val());
                            } else {
                                cargarDirecciones();
                                $('#txtDireccionOrigen').val($('#txtDIRECCION').val()).change();
                            }    



                            cargarTipoDocumento();
                            $("#txtDireccionOrigen").val($("#txtDIRECCION").val());

                            if (map[item].CODIGO_TIPO_DOC === '6') {
                                $('#hfRUC').val(map[item].NRO_DOC);
                            } else {
                                $("#hfDNI").val(map[item].NRO_DOC);
                            }

                            //$('#cboTipoDcto').val(map[item].CODIGO_TIPO_DOC).change();


                            //$("#hfDNI").val(map[item].DNI);
                            //$("#hfRUC").val(map[item].RUC);

                            //if ($('#hfRUC').val() === '' || $('#hfDNI').val() === '') {
                            //    $('#cboTipoDcto').prop('disabled', true);
                            //} else {
                            //    $('#cboTipoDcto').prop('disabled', false);
                            //}

                            //if ($('#hfRUC').val() !== '') {
                            //    $('#cboOrigen option[value=0001], #cboRegistro option[value=0001]').prop('disabled', false);
                            //    $("#cboTipoDcto").val("6").change();
                            //} else {
                            //    $('#cboOrigen option[value=0001], #cboRegistro option[value=0001]').prop('disabled', true);
                            //}

                            //if ($('#hfDNI').val() !== '') {
                            //    $('#cboOrigen option[value=0003], #cboRegistro option[value=0003]').prop('disabled', false);
                            //    $("#cboTipoDcto").val("1").change();
                            //} else {
                            //    $('#cboOrigen option[value=0003], #cboRegistro option[value=0003]').prop('disabled', true);
                            //}

                            return item;
                        },
                    });
                    selectinput.keyup(function () {
                        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                        $(this).siblings("ul").css("width", $(this).css("width"))
                    });
                }
                //Desbloquear('ventana');
            },
            error: function (msg) {
                alertCustom('Error al listar Empleados.');
                //Desbloquear('ventana');
            }
        });
    };
    //====================================================

 

    //var listarAlmacenesListado = function (ctlg) {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#slcEmpresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            if (datos !== '' && datos !== null) {
    //                $('#cbo_Almc').html('<option></option>');
    //                if (datos != null) {
    //                    if (datos[0].CODIGO != "" && datos[0].DESCRIPCION != "") {
    //                        for (var i = 0; i < datos.length; i++) {
    //                            $('#cbo_Almc').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
    //                        }
    //                        $('#cbo_Almc').val(datos[0].CODIGO);
    //                    }
    //                    cargarAlmacenesTransferencia(ctlg, datos[0].CODIGO);
    //                }
    //            }
    //        },
    //        error: function (msg) {
    //            alertCustom('Error al listar almacenes.');
    //        }
    //    });
    //};

    //function cargarCentroCosto(pCodProducto) {
    //    var CODE_PROD = pCodProducto;
    //    var TIPO_MOV = $("#cboOperacion").val();
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTO_CECO&CTLG_CODE=" + $('#ctl00_hddctlg').val() + "&CODE_PROD=" + CODE_PROD+ "&TIPO_MOV=" + TIPO_MOV,
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
              
    //            if (datos != null) {
    //                var sCentroCostoDescr = datos[0].DES_CORTA;
    //                var sCodCentroCosCab = datos[0].CECC;
    //                var sCodCentroCosto = datos[0].CECD;

    //                $("#txtCentroCostos").val(sCentroCostoDescr);
    //                $("#txtCentroCostos").data("CodCentroCostoCab", sCodCentroCosCab);
    //                $("#txtCentroCostos").data("CodCentroCosto", sCodCentroCosto);
    //            } else {
    //                return;
    //            }
                


    //        },
    //        error: function (msg) {
    //            alertCustom('Error al listar unidades de medida.');
    //        }
    //    });
    //}
    //nuevo    

    //function cargarUnidadesMedida(codUniMed) {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LUNPRO&COD_UNI=" + codUniMed,
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $('#cboUniMedida').empty();
    //            $('#cboUniMedida').append('<option></option>');
    //            if (datos != null) {
    //                for (var i = 0; i < datos.length; i++) {
    //                    $('#cboUniMedida').append('<option value="' + datos[i].CODUNI2 + '" equivalencia="' + datos[i].EQUI + '">' + datos[i].UNIDAD_MEDIDA + '</option>');
    //                }
    //            }
    //            $('#cboUniMedida').select2('val', "");
    //        },
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });
    //}

    var cargarMonedas = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=12&CTLG_CODE=" + $('#ctl00_hddctlg').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').html('<option></option>');
                if (datos != null) {
                    for (var i = datos.length - 1; i > -1; i--) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '"tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar las monedas del Sistema.');
            }
        });
    }

    var cargarDocumentos = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=7&CTLG_CODE=" + $('#ctl00_hddctlg').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                
                if (datos !== null) {
                    documentos = datos;
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar tipos de documentos comerciales.');
            }
        });
    };

    var cargarDctosOrigen = function (array) {
        $('#cboOrigen').html('<option value="NINGUNO">NINGUNO</option>');

        var listaOrigenes = array.split(",");
        for (var i = 0; i < listaOrigenes.length; i++) {
            for (var j = 0; j < documentos.length; j++) {
                if (parseInt(listaOrigenes[i]) == parseInt(documentos[j].CODIGO_SUNAT)) {
                    $('#cboOrigen').append('<option value="' + documentos[j].CODIGO + '" data-tipo-doc="' + documentos[j].TIPO_DOC + '">' + documentos[j].DESCRIPCION_CORTA + '</option>');
                    break;
                }
            }
        }
        //if (array.length > 0) {
        //    for (var i = 0; i < documentos.length; i++) {
        //        if (array.indexOf(documentos[i].CODIGO_SUNAT) > -1) {
        //            $('#cboOrigen').append('<option value="' + documentos[i].CODIGO + '" data-tipo-doc="' + documentos[i].TIPO_DOC + '">' + documentos[i].DESCRIPCION_CORTA + '</option>');
        //        }
        //    }
        //}
        $('#cboOrigen').select2('val', 'NINGUNO').change;


    }

    var cargarDctosRegistro = function (array) {
        $('#cboRegistro').html('<option></option>');

        var listaRegistro = array.split(",");
        for (var i = 0; i < documentos.length; i++) {
            for (var j = 0; j < documentos.length; j++) {
                if (parseInt(listaRegistro[i]) == parseInt(documentos[j].CODIGO_SUNAT)) {
                    $('#cboRegistro').append('<option value="' + documentos[j].CODIGO + '" fecha-elec="' + documentos[j].FECHA_ELEC + '" data-tipo-doc="' + documentos[j].TIPO_DOC + '">' + documentos[j].DESCRIPCION_CORTA + '</option>');
                    break;
                }
            }
        }
        //if (array.length > 0) {
        //    for (var i = 0; i < documentos.length; i++) {
        //        if (array.indexOf(documentos[i].CODIGO_SUNAT.toString()) > -1) {
        //            $('#cboRegistro').append('<option value="' + documentos[i].CODIGO + '" fecha-elec="' + documentos[i].FECHA_ELEC + '" data-tipo-doc="' + documentos[i].TIPO_DOC + '">' + documentos[i].DESCRIPCION_CORTA + '</option>');
        //        }
        //    }
        //}
        $('#cboRegistro').select2('val', '').change();


        //if ($("#rbSalida").is(':checked')) {
        //    $("#cboRegistro option[value=0001]").prop('disabled', true);
        //    $("#cboRegistro option[value=0003]").prop('disabled', true);
        //    $("#cboRegistro option[value=0012]").prop('disabled', true);
        //}


    }

    var cargarDctosRegistroInterno = function (array) {
        $('#cboRegistroInterno').empty();

        var listaRegistroInterno = array.split(",");
        for (var i = 0; i < documentos.length; i++) {
            for (var j = 0; j < documentos.length; j++) {
                if (parseInt(listaRegistroInterno[i]) == parseInt(documentos[j].CODIGO_SUNAT)) {
                    $('#cboRegistroInterno').append('<option value="' + documentos[j].CODIGO + '" fecha-elec="' + documentos[j].FECHA_ELEC + '" data-tipo-doc="' + documentos[j].TIPO_DOC + '">' + documentos[j].DESCRIPCION_CORTA + '</option>');
                    break;
                }
            }
        }
        //if (array.length > 0) {
        //    for (var i = 0; i < documentos.length; i++) {
        //        if (array === documentos[i].CODIGO_SUNAT) {
        //            $('#cboRegistroInterno').append('<option value="' + documentos[i].CODIGO + '" fecha-elec="' + documentos[i].FECHA_ELEC + '" data-tipo-doc="' + documentos[i].TIPO_DOC + '">' + documentos[i].DESCRIPCION_CORTA + '</option>');
        //        }
        //    }
        //}
        $('#cboRegistroInterno').select2();
    };

    var cargarTipoEnvio = function (operacion) {
        var options = '<option></option><option value="EDIR">ENVIO DIRECTO</option>\
                       <option value="EDTR">ENVIO EN DOS TRAMOS</option>';
        if (operacion === '0001') {
            options += '<option value="DDOC">DIRECCION DESTINO POR ORDEN DE CLIENTE</option>\
                        <option value="CEAT">CON ENTREGA A TERCERO</option>\
                        <option value="ETDT">ENTREGA A TERCERO EN DOS TRAMOS</option>';
        }
        $('#cboTipoEnvio').html(options).change();
    };

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

        if ($("#txtRemitente").val() == "") {
            $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
        }
    };

    function cargarTelefonos() {
        REGEX_TELE = "([0-9]*)"
        $.ajax({
            type: 'post',
            url: 'vistas/na/ajax/naminsa.ashx?OPCION=LTELEFONOS',
            async: false
        }).done(function (data) {
            data = JSON.parse(data);

            $('#cboClienteWhatsapp').selectize({
                persist: false,
                maxItems: null,
                valueField: 'telefono',
                labelField: 'name',
                searchField: ['name', 'telefono'],
                options: data,
                render: {
                    item: function (item, escape) {
                        return '<div>' +
                            (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                            (item.telefono ? '<span class="telefono">' + escape(item.telefono) + '</span>' : '') +
                            '</div>';
                    },
                    option: function (item, escape) {
                        var label = item.name || item.telefono;
                        var caption = item.name ? item.telefono : null;
                        return '<div style="padding: 2px">' +
                            '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                            (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                            '</div>';
                    }
                },
                createFilter: function (input) {
                    var match, regex;
                    regex = new RegExp('^' + REGEX_TELE + '$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[0]);
                    // name phone_number
                    regex = new RegExp('^([^<]*)\<' + REGEX_TELE + '\>$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[2]);
                    return false;
                },
                create: function (input) {
                    if ((new RegExp('^' + REGEX_TELE + '$', 'i')).test(input)) {
                        return { telefono: input };
                    }
                    var match = input.match(new RegExp('^([^<]*)\<' + REGEX_TELE + '\>$', 'i'));
                    if (match) { return { telefono: match[2], name: $.trim(match[1]) }; }
                    alert('Invalid number.');
                    return false;
                }
            });
            $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
            $('.selectize-dropdown').css('margin-left', '0px');

            for (var c in data) {
                if (data[c].codigo === $('#hfPIDM').val()) {
                    $("#cboClienteWhatsapp")[0].selectize.setValue(data[c].telefono);
                    break;
                }
            }
        });
    }

    var contieneFormatoEnCorrelativo = function (formato) {
        if (correlativo != null) {
            for (var i = 0; i < correlativo.length; i++) {
                if (formato == correlativo[i].FORMATO) {
                    return true;
                }
            }
        } else {
            return false;
        }
    };

    var cargarCorrelativo = function () {
        if ($('#cboRegistro').val() !== '') {
            $.ajax({
                type: "post",
                url: "vistas/na/ajax/naminsa.ashx?OPCION=CORR&CTLG_CODE=" + $('#slcEmpresa').val() + "&TIP_DCTO=" + $('#cboRegistro').val() + "&CORR=S&COD_ALMC=" + $('#cboAlmacen').val(),
                contenttype: "application/json;",
                async: false,
                datatype: "json",
                success: function (datos) {
                    correlativo = datos;
                },
                error: function (msg) {
                    alertCustom('Error al cargar numeraciones de documentos comerciales.');
                }
            });
        }
    };

    var establecerCorrelativo = function (formato) {
        if (correlativo != null) {
            for (var i = 0; i < correlativo.length; i++) {
                if (correlativo[i].FORMATO == formato) {
                    $('#hfCOD_AUT').val(correlativo[i].CODIGO);
                    $('#txtSerieDctoRegistro').val(correlativo[i].SERIE);
                    $('#txtNroDctoRegistro').val(correlativo[i].VALOR_ACTUAL);
                    $('#txtLineasRegistro').val(correlativo[i].NRO_LINEAS);
                    return;
                } else { // AGREGADO
                    if (correlativo[i].FORMATO == "F") {
                        $('#hfCOD_AUT').val(correlativo[i].CODIGO);
                        $('#txtSerieDctoRegistro').val(correlativo[i].SERIE);
                        $('#txtNroDctoRegistro').val(correlativo[i].VALOR_ACTUAL);
                        $('#txtLineasRegistro').val(correlativo[i].NRO_LINEAS);
                        return;
                    } else if (correlativo[i].FORMATO == "P") {
                        $('#hfCOD_AUT').val(correlativo[i].CODIGO);
                        $('#txtSerieDctoRegistro').val(correlativo[i].SERIE);
                        $('#txtNroDctoRegistro').val(correlativo[i].VALOR_ACTUAL);
                        $('#txtLineasRegistro').val(correlativo[i].NRO_LINEAS);
                    }
                }
            }
            if (correlativo[0] == undefined || typeof correlativo[0].CODIGO == "undefined") {
                limpiarCampos(['#txtSerieDctoRegistro', '#txtNroDctoRegistro']);
            }
        } else {
            limpiarCampos(['#txtSerieDctoRegistro', '#txtNroDctoRegistro']);
        }
    };

    var contieneFormatoEnCorrelativoInterno = function (formato) {
        if (correlativoInterno != null) {
            for (var i = 0; i < correlativoInterno.length; i++) {
                if (formato == correlativoInterno[i].FORMATO) {
                    return true;
                }
            }
        } else {
            return false;
        }
    };

    var cargarCorrelativoInterno = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=CORR&CTLG_CODE=" + $('#slcEmpresa').val() + "&TIP_DCTO=" + $('#cboRegistroInterno').val() + "&CORR=S&COD_ALMC=" + $('#cboAlmacen').val(),
            contenttype: "application/json;",
            async: false,
            datatype: "json",
            success: function (datos) {
                correlativoInterno = datos;
            },
            error: function (msg) {
                alertCustom('Error al cargar numeraciones de documentos comerciales internos.');
            }
        });
    };

    var establecerCorrelativoInterno = function (formato) {
        if (correlativoInterno !== null) {
            for (var i = 0; i < correlativoInterno.length; i++) {
                if (correlativoInterno[i].FORMATO == formato) {
                    $('#hfCOD_AUT_INTERNO').val(correlativoInterno[i].CODIGO);
                    $('#txtSerieRegistroInterno').val(correlativoInterno[i].SERIE);
                    $('#txtNroRegistroInterno').val(correlativoInterno[i].VALOR_ACTUAL);
                    $('#txtLineasRegistroInterno').val(correlativoInterno[i].NRO_LINEAS);
                    return;
                } else { // AGREGADO
                    if (correlativoInterno[i].FORMATO == "F") {
                        $('#hfCOD_AUT_INTERNO').val(correlativoInterno[i].CODIGO);
                        $('#txtSerieRegistroInterno').val(correlativoInterno[i].SERIE);
                        $('#txtNroRegistroInterno').val(correlativoInterno[i].VALOR_ACTUAL);
                        $('#txtLineasRegistroInterno').val(correlativoInterno[i].NRO_LINEAS);
                        return;
                    } else if (correlativo[i].FORMATO == "P") {
                        $('#hfCOD_AUT_INTERNO').val(correlativoInterno[i].CODIGO);
                        $('#txtSerieRegistroInterno').val(correlativoInterno[i].SERIE);
                        $('#txtNroRegistroInterno').val(correlativoInterno[i].VALOR_ACTUAL);
                        $('#txtLineasRegistroInterno').val(correlativoInterno[i].NRO_LINEAS);
                    }
                }
            }
        } else {
            $('#txtSerieRegistroInterno, #txtNroRegistroInterno').val('');
        }
    };

    var cargarCorrelativoDocumentoRegistroInterno = function () {
        cargarCorrelativoInterno();
        establecerCorrelativoInterno('P');;//GUIA SALIDA Y GUIA DE INTERNAMIENTO
        var fechaelec = $('#cboRegistroInterno :selected').attr('fecha-elec');
        if (fechaelec == '0000-00-00') {
            $('#divElecInterno').addClass('hidden');
        } else {
            if (new Date(fechaelec) <= new Date()) {
                if (contieneFormatoEnCorrelativoInterno('E')) {
                    $('#divElecInterno').removeClass('hidden');
                } else {
                    $('#divElecInterno').addClass('hidden');
                }
            } else {
                $('#divElecInterno').addClass('hidden');
            }
        }
        $('#chkElectronicoInterno').prop('checked', false);
        $('#chkElectronicoInterno').parent().removeClass('checked');
    };

    //var cargarProductos = function (DCTO_ORGN) {
    //    Bloquear("input_cod_prod");
    //    Bloquear("input_prod");
    //    DCTO_ORGN = (DCTO_ORGN === undefined) ? '' : DCTO_ORGN;
    //    if (ajaxProducto) {
    //        ajaxProducto.abort();
    //    }
    //    ajaxProducto = $.ajax({
    //        type: "post",
    //        url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTOS",
    //        cache: false,
    //        data: { CTLG_CODE: $('#slcEmpresa').val(), SCSL_CODE: $('#cboAlmacen :selected').attr('data-scsl-code'), DCTO_ORGN: DCTO_ORGN },
    //        datatype: "json",
    //        async: true
    //    }).done(function (data) {
    //        productos = data;
    //        Desbloquear("input_cod_prod");
    //        Desbloquear("input_prod");

    //        $('#txtPROD_CODE').parent().html('<input id="txtPROD_CODE" class="span11" type="text" style="text-transform: uppercase">');
    //        $('#txtPROD_CODE').keyup(function (event) {
    //            var key = event.keyCode ? event.keyCode : event.which;
    //            if (key === 13 && $(this).val().trim() === '') { $('#txtPROD_DESC').focus(); }
    //        });
    //        autocompletarCodigoProducto('#txtPROD_CODE', '');
    //        $("#txtPROD_DESC").parent().html('<input id="txtPROD_DESC" class="span12" type="text" data-provide="typeahead" />');
    //        $('#txtPROD_DESC').keyup(function (event) {
    //            var key = event.keyCode ? event.keyCode : event.which;
    //            if (key === 13) {
    //                if ($(this).val().trim() !== '' && $('#hfCOD_PROD').val().trim() !== '') {
    //                    if ($('#txtcant').prop('disabled')) { $('#txtPU').focus() }
    //                    else { $('#txtcant').focus() }
    //                }
    //            }
    //        });
    //        autocompletarProducto('#txtPROD_DESC', '');

    //    }).fail(function (msg) {
    //        Desbloquear("input_cod_prod");
    //        Desbloquear("input_prod");
    //        if (msg.statusText != "abort") {
    //            alertCustom('Error al listar productos.');
    //        }
    //    });
    //};

    //var autocompletarCodigoProducto = function (v_ID, v_value) {
    //    var input = $(v_ID);
    //    input.typeahead({
    //        items: 50,
    //        source: function (query, process) {
    //            array = [];
    //            map = {};

    //            var obj = "[";
    //            for (var i = 0; i < productos.length; i++) {
    //                array.push(productos[i].CODIGO_ANTIGUO);
    //                obj += '{';
    //                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","TIPO_UNIDAD":"' + productos[i].TIPO_UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
    //                obj += '},';
    //            }
    //            obj += "{}";
    //            obj = obj.replace(",{}", "");
    //            obj += "]";
    //            var json = $.parseJSON(obj);

    //            $.each(json, function (i, objeto) {
    //                map[objeto.CODIGO_ANTIGUO] = objeto;
    //            });
    //            process(array);
    //        },
    //        updater: function (item) {
    //            $("#hfCOD_PROD").val(map[item].CODIGO);
    //            $("#hfDESC_PROD").val(map[item].DESC_ADM);
    //            $("#txtPROD_DESC").val($("#hfDESC_PROD").val()).change();
    //            cargarCentroCosto(map[item].CODIGO);
    //            //cargarUnidadesMedida(map[item].TIPO_UNIDAD);
    //            cargarUnidadesMedida(map[item].UNIDAD);
    //            $("#cboUniMedida").select2('val', map[item].UNIDAD);
    //            $('#hfDETRACCION').val(map[item].DETRACCION);
    //            $('#txt_garantia').val('0');
    //            $('#txtPROD_DESC').focus();
    //            if (map[item].NO_SERIADA === "S") {
    //                $("#div_vie_camp_seriados").css("display", "none");
    //                $("#cboCorrelativo").change();
    //                $("#txt_num_inicio, #txt_num_fin, #txt_num_inicio, #txtSerie").val("");
    //                $("#hfTIPO_INSERT").val("NORMAL");
    //                $("#txtcant").val("");
    //                $("#hfTIPO_APLI_VALORES").val("E");
    //                cargarCostoProducto();
    //                $('#txtStock').val(map[item].STOCK_REAL);
    //                $("#div_vie_camp_seriados").css("display", "none");
    //                $("#cboUniMedida").attr("disabled", false)
    //            } else {
    //                $("#cboUniMedida").attr("disabled", true)
    //                $("#div_vie_camp_seriados").css("display", "block");
    //                $("#cboCorrelativo").change();
    //                $("#txt_num_inicio, #txt_num_fin, #txt_num_inicio, #txtSerie").val("");
    //                $("#txtcant").val("1").change();
    //                $("#txtcant").prop("disabled", true);
    //                $("#hfTIPO_APLI_VALORES").val("M");
    //                cargarCostoProducto();
    //                $('#txtStock').val(map[item].STOCK_REAL);
    //            }
    //            return item;
    //        },
    //    });
    //    input.keyup(function () {
    //        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
    //        $(this).siblings("ul").css("width", $(this).css("width"))
    //        if ($("#txtPROD_CODE").val().length <= 0) {
    //            $('#txtPU, #txtmonto').val('');
    //            $("#txtcant").attr("disabled", false);
    //            $("#hfCOD_PROD, #hfCOD_ANT_PROD, #hfSERIE_PROD, #txtPROD_DESC, #hfDETRACCION, #txtcant, #txtCentroCostos, #txt_garantia, #txtStock, #hfTIPO_INSERT, #hfCENTRO_COSTOS, #hfCECC_CODE, #hfTIPO_APLI_VALORES, #txtmonto").val("");
    //            $("#cboUniMedida").select2("val", "").change();
    //            $("#cboUniMedida").attr("disabled", true);
    //            $('#uniform-chkincluyeIGV span').removeClass();
    //            $('#uniform-chk_desde_compra span').removeClass();
    //            $('#chkincluyeIGV, #chk_desde_compra').prop('checked', false);

    //            //INICIO FIN
    //            $("#txt_num_inicio, #txt_num_fin, #txt_serie_add").val("");
    //            $("#txtSerie").tagsinput("removeAll");
    //            $("#cboCorrelativo").select2("val", '').change();
    //            $("#div_vie_camp_seriados").css("display", "none");

    //            $('#txtPU, #txtmonto, #txtcant').val('');  
    //        }
    //    });
    //    input.val(v_value);
    //}

    //var autocompletarProducto = function (v_ID, v_value) {
    //    var input = $(v_ID);
    //    input.typeahead({
    //        items: 50,
    //        source: function (query, process) {
    //            array = [];
    //            map = {};
    //            var obj = "[";
    //            for (var i = 0; i < productos.length; i++) {
    //                array.push(productos[i].DESC_ADM);
    //                obj += '{';
    //                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","TIPO_UNIDAD":"' + productos[i].TIPO_UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
    //                obj += '},';
    //            }
    //            obj += "{}";
    //            obj = obj.replace(",{}", "");
    //            obj += "]";
    //            var json = $.parseJSON(obj);

    //            $.each(json, function (i, objeto) {
    //                map[objeto.DESC_ADM] = objeto;
    //            });
    //            process(array);
    //        },
    //        updater: function (item) {                               
    //            $("#hfCOD_PROD").val(map[item].CODIGO);
    //            $("#txtPROD_CODE").val(map[item].CODIGO_ANTIGUO);
    //            cargarCentroCosto(map[item].CODIGO);
    //            //cargarUnidadesMedida(map[item].TIPO_UNIDAD);
    //            cargarUnidadesMedida(map[item].UNIDAD);
    //            $("#cboUniMedida").select2('val', map[item].UNIDAD);
    //            $('#hfDETRACCION').val(map[item].DETRACCION);
    //            $('#txt_garantia').val('0');
    //            if (map[item].NO_SERIADA == "S") {
    //                $("#div_vie_camp_seriados").css("display", "none");
    //                $("#cboCorrelativo").change();
    //                $("#txt_num_inicio").val("");
    //                $("#txt_num_fin").val("");
    //                $("#txt_num_inicio").val("");
    //                $("#txtSerie").val("");
    //                $("#hfTIPO_INSERT").val("NORMAL");
    //                $("#txtcant").val("");
    //                $("#hfTIPO_APLI_VALORES").val("E");
    //                cargarCostoProducto();
    //                $('#txtStock').val(map[item].STOCK_REAL);
    //                if ($("#hfCOD_PROD").val() !== '') { $('#txtcant').focus(); }
    //                $("#div_vie_camp_seriados").css("display", "none");
    //                $("#cboUniMedida").attr("disabled", false)
    //            } else {
    //                $("#cboUniMedida").attr("disabled", true)
    //                $("#div_vie_camp_seriados").css("display", "block");
    //                $("#cboCorrelativo").change();
    //                $("#txt_num_inicio, #txt_num_fin, #txtSerie").val("");
    //                $("#txtcant").val("1").change();
    //                $("#txtcant").attr("disabled", true);
    //                $("#hfTIPO_APLI_VALORES").val("M");
    //                cargarCostoProducto();
    //                $('#txtStock').val(map[item].STOCK_REAL);
    //                if ($("#hfCOD_PROD").val() !== '') {
    //                    if ($('#rbSalida').is(':checked') || $('#rbTSalida').is(':checked')) {
    //                        $('#txt_garantia').focus();
    //                    } else {
    //                        $('#txtPU').focus();
    //                    }
    //                }
    //            }
    //            return item;
    //        },
    //    });
    //    input.keyup(function () {
    //        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
    //        $(this).siblings("ul").css("width", $(this).css("width"))
    //        if ($("#txtPROD_DESC").val().trim().length === 0) {
    //            $('#txtPU, #txtmonto').val('');
    //            $("#txtPROD_CODE, #hfCOD_PROD, #hfSERIE_PROD, #hfDETRACCION, #txtmonto, #hfTIPO_APLI_VALORES").val("");
    //            $("#txtcant, #txtCentroCostos, #hfCENTRO_COSTOS, #hfCECC_CODE, #txtStock").val("");
    //            $("#txtcant").attr("disabled", false);
    //            $("#cboUniMedida").select2("val", "").change();
    //            $("#cboUniMedida").attr("disabled", true);
    //            $('#uniform-chkincluyeIGV span').removeClass();
    //            $('#chkincluyeIGV').attr('checked', false);
    //            $('#uniform-chk_desde_compra span').removeClass();
    //            $('#chk_desde_compra').attr('checked', false);

    //            //INICIO FIN
    //            $("#txt_num_inicio, #txt_num_fin, #txt_serie_add").val("");
    //            $("#txtSerie").tagsinput("removeAll");
    //            $("#cboCorrelativo").select2("val", '').change();
    //            $("#div_vie_camp_seriados").css("display", "none");    
    //            $('#txtPU, #txtmonto, #txtcant').val('');                
    //        }
    //    });
    //    input.val(v_value);
    //}

    var cargarEmpleados = function () {
        var scsl_code = $('#cboAlmacen :selected').attr('data-scsl-code');
        $.ajax({
            type: "post",
            url: 'vistas/na/ajax/naminsa.ashx?OPCION=3',
            cache: false,
            datatype: "json",
            async: true,
            // data: { CTLG_CODE: $('#slcEmpresa').val(), SCSL_CODE: ((scsl_code === undefined) ? '' : scsl_code) },
            data: { CTLG_CODE: $('#slcEmpresa').val(), SCSL_CODE: '' }, // Filtra todos los empleados, sin importar la sucursal.
            success: function (data) {
                empleados = (data === null) ? [] : data;
            },
            error: function (msg) {
                alertCustom('Error al intentar obtener empleados.');
            }
        });
    };

    var autocompletarSolicitante = function (v_ID, v_value) {
        var selectSolicitante = $(v_ID);
        selectSolicitante.typeahead({
            source: function (query, process) {
                arraySolicitante = [];
                map = {};

                var obj = "[";
                for (var i = 0; i < empleados.length; i++) {
                    arraySolicitante.push(empleados[i].NOMBRE_EMPLEADO);
                    obj += '{';
                    obj += '"NOMBRE_EMPLEADO":"' + empleados[i].NOMBRE_EMPLEADO + '","PIDM":"' + empleados[i].PIDM + '", "USUA_ID":"' + empleados[i].USUA_ID + '"';
                    obj += '},';
                }
                obj += "{}";
                obj = obj.replace(",{}", "");
                obj += "]";
                var json = $.parseJSON(obj);

                $.each(json, function (i, objeto) {
                    map[objeto.NOMBRE_EMPLEADO] = objeto;
                });
                process(arraySolicitante);
            },
            updater: function (item) {
                $("#txtPIDM_Solicitante").val(map[item].PIDM);
                $('#txtUsuaSolicitante').val(map[item].USUA_ID);
                listarValorCambio2();//DPORTA 26/02/2021
                if ($("#txtTransaccion2").val() != $("#txt_fec_vig").val()) {//DPORTA 26/02/2021
                    InsertarValorCambioOficial($('#cboMoneda').val());
                }
                return item;
            },
        });
        selectSolicitante.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"));
            if ($(this).val().length == 0) {
                $("#txtPIDM_Solicitante, #txtUsuaSolicitante").val('');
            }
        });
    }

    var autocompletarEntregar = function (v_ID, v_value) {
        var selectReceptor = $(v_ID);
        selectReceptor.typeahead({
            source: function (query, process) {
                arrayRecepciona = [];
                map = {};

                var obj = "[";
                for (var i = 0; i < empleados.length; i++) {
                    arrayRecepciona.push(empleados[i].NOMBRE_EMPLEADO);
                    obj += '{';
                    obj += '"NOMBRE_EMPLEADO":"' + empleados[i].NOMBRE_EMPLEADO + '","PIDM":"' + empleados[i].PIDM + '"';
                    obj += '},';
                }
                obj += "{}";
                obj = obj.replace(",{}", "");
                obj += "]";
                var json = $.parseJSON(obj);

                $.each(json, function (i, objeto) {
                    map[objeto.NOMBRE_EMPLEADO] = objeto;
                });
                process(arrayRecepciona);
            },
            updater: function (item) {
                $("#txtPIDM_Entregar").val(map[item].PIDM);
                return item;
            },
        });
        selectReceptor.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"));
            if ($(this).val().length == 0) {
                $("#txtPIDM_Entregar").val('');
            }
        });
    };

    var cargarEntradaSalida = function () {
        var cod = ObtenerQueryString("codigo");

        if (cod !== undefined) {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");
            Bloquear('generales');
            $.ajax({
                type: "POST",
                url: "vistas/na/ajax/naminsa.ashx?OPCION=S&codigo=" + cod,
                contentType: "application/json;",
                dataType: "json"
            })
                .done(function (data) {                    
                    if (data !== null) {
                        $("#div_botones_detalle").css("display", "block");
                        var numerosdcto = data[0].NUM_DCTO.split(",");
                        var seriesdcto = data[0].NUM_SERIE_DCTO.split(",");
                        var codigosdcto = data[0].ORGN_CODE.split(",");

                        $("#slcEmpresa").select2("val", data[0].EMPRESA).change();
                        $("#cboAlmacen").select2("val", data[0].ALMC_CODE).change();

                        if (data[0].RETORNO_IND === "I") {
                            $("#rbEntrada").click();
                            $('#uniform-rbSalida span').removeClass();
                            $('#uniform-rbTEntrada span').removeClass();
                            $('#uniform-rbTSalida span').removeClass();
                            $('#uniform-rbEntrada span').removeClass().addClass("checked");
                            if (data[0].COMPLETO == "S") {
                                $("#txtRazonSocial").prop("disabled", true);
                            }
                        } if (data[0].RETORNO_IND === "S") {
                            $("#rbSalida").click();
                            $('#uniform-rbEntrada span').removeClass();
                            $('#uniform-rbTEntrada span').removeClass();
                            $('#uniform-rbTSalida span').removeClass();
                            $('#uniform-rbSalida span').removeClass().addClass("checked");
                            if (data[0].TMOV_CODE == "0036") {
                                $("#cboOperacion").change();
                            }
                            if (data[0].COMPLETO === "S") {
                                $("#txtRazonSocial").prop("disabled", true);
                            }
                        } if (data[0].RETORNO_IND === "TI") {
                            $("#rbTEntrada").click();
                            $('#uniform-rbSalida span').removeClass();
                            $('#uniform-rbEntrada span').removeClass();
                            $('#uniform-rbTSalida span').removeClass();
                            $('#uniform-rbTEntrada span').removeClass().addClass("checked");
                            if (data[0].COMPLETO == "S") {
                                $("#txtRazonSocial").prop("disabled", true);
                            }
                        } if (data[0].RETORNO_IND === "TS") {
                            $("#rbTSalida").click();
                            $('#uniform-rbSalida span').removeClass();
                            $('#uniform-rbEntrada span').removeClass();
                            $('#uniform-rbTEntrada span').removeClass();
                            $('#uniform-rbTSalida span').removeClass().addClass("checked");
                            if (data[0].COMPLETO == "S") {
                                $("#txtRazonSocial").prop("disabled", true);
                            }
                        }
                        $("#cboOperacion").val(data[0].TMOV_CODE).change();

                        if ((data[0].TMOV_CONT == "SN")) {
                            DesbloquearSinGif("#detallemov_datos");
                        }

                        if ((data[0].TMOV_CONT == "IN" && data[0].TIPO_DCTO_ORG != "")) {
                            DesbloquearSinGif("#detallemov_datos");
                        }                        
                        
                        $("#txtNumDctoAlmc").val(data[0].CODIGO);
                        $('#txtAPROBADO_IND').val(data[0].APROBADO_IND);
                        $("#hfCOD_DCTO_ALMC").val(data[0].CODIGO);
                        $("#txtsecuencia").val(data[0].NUM_SEQ_DOC);
                        $('#cboMoneda').select2('val', data[0].MONEDA).change();

                        $("#cboAlmacenTransferencia").select2("val", data[0].ALMC_DEST).change();
                        $("#txtSerieDctoRegistro").val(data[0].REQC_NUM_SEQ_DOC);
                        $("#txtNroDctoRegistro").val(data[0].REQC_CODE);

                        $("#txtEmision").val(data[0].FECHA_EMISION);
                        $("#txtTransaccion").val(data[0].FECHA_TRANS);
                        $('#txtPIDM_Solicitante').val(data[0].PIDM_SOLICITANTE);
                        $("#txtSolicitante").val(data[0].SOLICITANTE);
                        $('#txtPIDM_Entregar').val(data[0].PIDM_ENTREGAR_A);
                        $("#txtEntregar").val(data[0].ENTREGAR_A);

                        $('#cboMoneda').prop('disabled', true);
                        $('#cboTipoEnvio').select2('val', data[0].TIPO_ENVIO).change();

                        $('#txtCostoTransporte').val(data[0].COSTO_TRANSPORTE);

                        $("#hfPIDM").val(data[0].PIDMDEST);
                        cargarTipoDocumento();
                        $("#txtDIRECCION").val(data[0].DIRECCION);                                                
                        $('#cboTipoDcto').select2('val', data[0].RAZON_DEST_TIPO_DOC).change();

                        if (data[0].RAZON_DEST_TIPO_DOC === '1') {
                            $("#hfDNI").val(data[0].NRO_DOC_DNI_DEST);
                            $("#txtNroDcto").val(data[0].NRO_DOC_DNI_DEST);
                        }
                        if (data[0].RAZON_DEST_TIPO_DOC === '6') {
                            $("#hfRUC").val(data[0].NRO_DOC_RUC_DEST);
                            $("#txtNroDcto").val(data[0].NRO_DOC_RUC_DEST);
                        }
                        if (data[0].RAZON_DEST_TIPO_DOC === '0') {
                            $('#hfOTROS').val(data[0].NRO_DOC_DNI_DEST);
                            $("#txtNroDcto").val(data[0].NRO_DOC_DNI_DEST);
                        }

                        $("#txtRazonSocial").val(data[0].RAZON_DEST).keyup().siblings("ul").children('li').click();                        
                        
                        $("#txtDireccionOrigen").val(data[0].DIRECCION);

                        if ($('#txtDireccionOrigen').get(0).tagName === 'SELECT') {
                            //CARGAR DIRECCION, SI ES QUE NO ESTA REGISTRADA
                            var val = -1;
                            var direcciones = $('#txtDireccionOrigen option');
                            for (var i = 0; i < direcciones.length; i++) {
                                if ($(direcciones[i]).val() == data[0].DIRECCION) {
                                    val = i;
                                }
                            }
                            if (val == -1) {
                                $('#txtDireccionOrigen').append("<option value=\"" + data[0].DIRECCION + "\">" + data[0].DIRECCION + "</option>")
                                $('#txtDireccionOrigen').select2("val", data[0].DIRECCION);
                            } else {
                                $('#txtDireccionOrigen').select2("val", data[0].DIRECCION);
                            }
                            $('#txtDireccionOrigen').change();
                        }

                        $("#txtGlosa").val(data[0].CMNT_DCTO);
                        $("#cboRegistro").select2("val", data[0].TIPO_DCTO);

                        if (data[0].COMPLETO === "N" && ($('#rbSalida').is(':checked') || $('#rbTSalida').is(':checked'))) {
                            $("#cboRegistro").change();
                            if (data[0].REQC_NUM_SEQ_DOC != "" && data[0].REQC_CODE != "") {
                                $("#txtSerieDctoRegistro").val(data[0].REQC_NUM_SEQ_DOC);
                                $("#txtNroDctoRegistro").val(data[0].REQC_CODE);
                            }
                        }

                        if ($("#txtSerieDctoRegistro").val() === '' && $("#txtNroDctoRegistro").val() === '') {
                            $("#txtSerieDctoRegistro").val(data[0].NUM_SERIE_DCTO);
                            $("#txtNroDctoRegistro").val(data[0].NUM_DCTO);
                        } 

                        $("#cboOrigen").select2("val", data[0].TIPO_DCTO_ORG);
                        $('#cboMoneda, #cboOperacion, #slcEmpresa, #cboAlmacen, #cboOrigen, #cboRegistro').prop('disabled', true);

                        for (var i = 1; i < seriesdcto.length; i++) {
                            $('#btnAgregarDctoOrigen').click();
                        }

                        var arrayDivs = $('#prueba').children();
                        for (var i = 0; i < seriesdcto.length; i++) {
                            var child = arrayDivs[i];
                            $(child).find('.txtSerieDctoOrigen').val(seriesdcto[i]);
                        }

                        for (var i = 0; i < numerosdcto.length; i++) {
                            var child = arrayDivs[i];
                            $(child).find('.txtNroDctoOrigen').val(numerosdcto[i]);
                        }

                        for (var i = 0; i < codigosdcto.length; i++) {
                            var child = arrayDivs[i];
                            $(child).find('.txtCodigoDctoOrigen').val(codigosdcto[i]);
                        }

                        if (data[0].TIPO_TRANS === 'PUB') {
                            $('#rdPublico').click();
                            $('#rdPublico').parent().addClass('checked');
                            $('#rdPrivado').parent().removeClass('checked');
                            $('#rdOtro').parent().removeClass('checked');
                            $("#txtPIDM_EmpresaTransporte").val(data[0].PIDMTRANS);
                            $("#hfDNI_EMPTRANS").val(data[0].NRO_DOC_DNI_TRANS);
                            $("#hfRUC_EMPTRANS").val(data[0].NRO_DOC_RUC_TRANS);
                            $("#txtnumdocemptrans").val(data[0].NRO_DOC_RUC_TRANS);

                            $("#txtEmpresaTransporte").val(data[0].RAZON_TRANS.trim()).keyup().siblings("ul").children('li').click();

                        } else if (data[0].TIPO_TRANS === 'PRI') {
                            $('#rdPrivado').click();
                            $('#rdPrivado').parent().addClass('checked');
                            $('#rdPublico').parent().removeClass('checked');
                            $('#rdOtro').parent().removeClass('checked');
                        }
                        else if (data[0].TIPO_TRANS === 'OTR') {
                            $('#rdOtro').click();
                            $('#rdOtro').parent().addClass('checked');
                            $('#rdPublico').parent().removeClass('checked');
                            $('#rdPrivado').parent().removeClass('checked'); 
                            $("#txtEmpresaTransporte").val(data[0].RAZON_TRANS.trim()).keyup().siblings("ul").children('li').click();
                            //$("#txtEmpresaTransporte").val(data[0].RAZON_TRANS);
                            //$("#txtPIDM_EmpresaTransporte").val(data[0].PIDM_TRANSPORTISTA);
                        }

                        if (data[0].ELETRONICO_IND == "S" && data[0].COMPLETO === "N" && data[0].RETORNO_IND !== "I") {
                            establecerCorrelativo("E");
                            $('#chkElectronico').prop('checked', true);
                            $('#chkElectronico').parent().addClass('checked');
                        }

                        if (data[0].ELETRONICO_IND == "S" && data[0].COMPLETO === "N" && data[0].RETORNO_IND === "I" && data[0].TIPO_DCTO === '0009' && data[0].TMOV_CODE === '0002') {
                            $('#txtSerieDctoRegistro').prop('disabled', true);
                            $('#txtNroDctoRegistro').prop('disabled', true);
                            if ($('#txtSerieDctoRegistro').is(':disabled')) { //textbox is disabled }
                                $('#divElec').removeClass('hidden');
                                $('#chkElectronico').prop('checked', true);
                                $('#chkElectronico').parent().addClass('checked');
                                $("#divNuestraGuia").attr("style", "display:inline");
                                $('#chkNuestraGuia').prop('checked', true);
                                $('#chkNuestraGuia').parent().addClass('checked');
                            }
                        } else if (data[0].ELETRONICO_IND == "N" && data[0].COMPLETO === "N" && data[0].RETORNO_IND === "I" && data[0].TIPO_DCTO === '0009' && data[0].TMOV_CODE === '0002') {
                            $("#divNuestraGuia").attr("style", "display:inline");
                        }


                        $('#txtDireccionTransportista').select2('val', data[0].DIRECCION_TRANSPORTISTA).change();
                        $("#txtchofer").val(data[0].CHOFER);
                        $("#txtLicConducir").val(data[0].LICENCIA_NRO);
                        $("#txtCertificadoInscripcion").val(data[0].CERTIFICADO_NRO);
                        if (data[0].TIPO_TRANS === 'PRI') {
                            $("#txtvehiculo").val(data[0].VEHICULO_MARCA_PLACA);
                        } else {
                            $("#txtVehiculoFact").val(data[0].VEHICULO_MARCA_PLACA.split("||")[0]);
                            $("#txtMarca").val(data[0].VEHICULO_MARCA_PLACA.split("||")[1]);
                            $("#txtPlaca").val(data[0].VEHICULO_MARCA_PLACA.split("||")[2]);
                            if (data[0].COMPLETO === "S") {
                                $("#txtVehiculoFact,#txtMarca,#txtPlaca").attr("disabled", true);
                            }                            
                        }                       

                        $("#txtNroVueltas").val(data[0].NRO_VUELTAS);

                        if (data[0].COMPLETO === "S") {
                            $('#txtNroRegistroInterno').val(data[0].REQC_CODE_INTERNO);
                            $('#txtSerieRegistroInterno').val(data[0].REQC_NUM_SEQ_DOC_INTERNO);
                            bloquearElementos();
                            $('#p_info').remove();
                            $('#btnMail, #btnImprimir, #btnWhatsapp').removeClass('hidden');
                            listarDetallesCompletado(); 
                            listarTotales(cod);
                            generarImpresion();
                            $('#advs').addClass('hidden');
                        } else {
                            listarDetalles();
                        }
                        $('.quitar, #btnOrigen').remove();
                        //$("#cbotipoDoctrans").select2('val', '6').change();
                        $("#rbEntrada, #rbSalida, #rbTEntrada, #rbTSalida").prop("disabled", true);
                        $('#slcEmpresa, #cboOperacion, #cboAlmacen').prop('disabled', true);
                        cargarProductos2();
                        if ($('#txtNroDctoOrigen_0').val() != '') {                           
                            $('#fila_2').hide();
                            $('#fila_3').hide();
                            $('#fila_4').hide();
                            $('#div_aceptar').hide();                            
                        } else {
                            $('#btnVerDetallesOrigen').hide();
                        }

                        if ($('#cboOrigen').val() !== '' && data[0].COMPLETO === 'N') {
                            $('#btnVerDetallesOrigen').removeClass('hidden');

                            $('#btnVerDetallesOrigen').click(function () {
                                listarDetalles();
                                if ($('#tabla_det').DataTable().data().toArray().length < 1) {
                                    //if (true) {
                                    Bloquear('detallemov');
                                    setTimeout(function () {
                                        $.ajax({
                                            url: 'vistas/na/ajax/naminsa.ashx?OPCION=DETALLES_ORIGEN',
                                            type: 'POST',
                                            async: false,
                                            datatype: false,
                                            data: {
                                                TIPO_MOV : ($("#rbEntrada").is(':checked') ? 'I' : $("#rbSalida").is(':checked') ? 'S' : $("#rbTEntrada").is(':checked') ? 'TI' : $("#rbTSalida").is(':checked') ? 'TS' : ''),
                                                ISAC_CODE: ObtenerQueryString('codigo'),
                                                TIPO_DCTO: data[0].TIPO_DCTO_ORG,
                                                DCTO_ORGN: data[0].ORGN_CODE,
                                                DCTO_SERIE: data[0].NUM_SERIE_DCTO,
                                                DCTO_NUM: data[0].NUM_DCTO,
                                                USUA_ID: $('#ctl00_txtus').val(),
                                                SCSL_CODE: $('#cboAlmacen :selected').attr('data-scsl-code'),
                                                CTLG_CODE: $('#slcEmpresa').val(),
                                                COD_ALMC: $('#cboAlmacen').val(),
                                                TIPO_OPE: $('#cboOperacion').val()
                                            }
                                        }).success(function (data) {
                                            Desbloquear('detallemov');
                                            if (data === 'OK') {
                                                listarDetalles();
                                                if ($('#tabla_det').DataTable().data().toArray().length === 0) {
                                                    if ($('#cboOrigen').val() === '0052' || $('#cboOrigen').val() === '0028' || $('#cboOrigen').val() === '0050') {
                                                        infoCustom2('Es posible que el documento de origen no haya sido atendido o autorizado.');
                                                    } else { infoCustom2('No hay stock disponible de cada producto del documento de origen.'); }
                                                } else {
                                                    $('#btnVerDetallesOrigen').addClass('hidden');
                                                }
                                            }
                                            else {

                                                if (data === 'SIN_DESPACHAR') {
                                                    listarDetalles();

                                                    infoCustom2('No es posible ingresar un producto que aun no a salido , por favor efectue la salida del producto primero.');

                                                } else if (data == "ALMACEN_DIF"){
                                                    listarDetalles();
                                                    //infoCustom2('Está intentando despachar un producto de un almacén que no corresponde');
                                                    infoCustom2('El almacén de salida difiere con el almacén de origen del producto');
                                                } else {
                                                    infoCustom2('No hay stock disponible para producto(s) con código: ' + data);
                                                    listarDetalles();
                                                    if ($('#tabla_det').DataTable().data().toArray().length === 0) {
                                                        if ($('#cboOrigen').val() === '0052' || $('#cboOrigen').val() === '0028') {
                                                            infoCustom2('Es posible que el documento de origen no haya sido atendido o autorizado.');
                                                        }
                                                    } else {
                                                        $('#btnVerDetallesOrigen').addClass('hidden');
                                                    }
                                                }
                                            }
                                        }).error(function (msg) {
                                            alertCustom(msg.statusText);
                                            Desbloquear('detallemov');
                                        });
                                    }, 1000);
                                } else {
                                    infoCustom2('Productos ya obtenidos del documento de origen.');
                                }
                            });
                        }
                        //cargarProductos();
                    }

                    if (prmtACON == "SI") {
                        // Lista Asiento en Carga Inicial
                        sCodAlmacen = $("#txtNumDctoAlmc").val();
                        sCodAlmacen = $.trim(sCodAlmacen);
                        console.log(sCodAlmacen);
                        oDocAlmc = fnGetDocAlmacen(sCodAlmacen);

                        fnCargaTablaCuentasC(sCodAlmacen, oDocAlmc, sCodAlmacen); // cambio avenger
                    }

                    Desbloquear('generales');

                })
                .fail(function () {
                    alertCustom('Error al cargar los datos del movimiento.');
                    Desbloquear('generales');
                });
        } else {
            $("#rbSalida").click();
            $('#uniform-rbEntrada span').removeClass();
            $('#uniform-rbTEntrada span').removeClass();
            $('#uniform-rbTSalida span').removeClass();
            $('#uniform-rbSalida span').removeClass().addClass("checked");
            $("#cboOperacion").val("0001").change();
            $("#cboOrigen").val("NINGUNO").change();
            $("#txtPU").val(''); 
            $("#txtmonto").val('');
            // Lista Asiento en blanco
            if (prmtACON == "SI") {
                fnCargaTablaCuentasC();
            }
            setTimeout(function () {
                $('#rdPrivado').click();
                $('#rdPrivado').parent().addClass('checked');
                $('#rdPublico').parent().removeClass('checked');
                $('#rdOtro').parent().removeClass('checked');
            }, 100);
        }

       
    };

    var cargaInicio = function () {
        if ($('#cboAlmacen').val() != null) {
            oCentroCostoCab = fnGetCentroCostoActivo($("#slcEmpresa").val());
        }      
    };

    var fnCargaTablaCuentasC = function (sCodVenta, oDocVta, sCodAsiento) {

        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = sCodModulo;
                    vAsientoContable.sCodDoc = sCodVenta;
                    vAsientoContable.objDoc = oDocVta;
                    vAsientoContable.init(sCodAsiento);
                });
        });

    }

   
    //========================================================================
    //                                   Fin
    //========================================================================
    return {
        init: function () {
            var cod = ObtenerQueryString("codigo");
            //DPORTA
            cargarParametrosSistema();
            plugins();
            //cargaInicio();
            eventoControles();
           
            fnFillcboPais();
            cargarEmpresas();
            //cargarEmpresaDefault();
            cargarTiposMovimiento();
            cargarDocumentos();
            //if (cod == undefined) {
            //    $('#slcEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
            //}
            cargarDctosOrigen('');
            cargarDctosRegistro('');
            $('#chkdirNoexis').addClass('hidden');
            //cargarDctosRegistroInterno('100');
            //cargarUnidadesMedida();
            if (cod == undefined) {
                $("#cboUniMedida").select2('val', '').change();
            }
            cargarMonedas();
            if (cod == undefined) {
                $('#cboMoneda').select2('val', '0002').change();
                
            }
            //autocompletarEmpresaTransporte('#txtEmpresaTransporte', '');
            //listarOperacionES($("#rbEntrada").val());
            //$("#rbEntrada").click();
            $('#rdPublico').click();

            //CARGA INICIAL
            cargarEntradaSalida();

            $("#txtDireccionOrigen").on('change', function () {
                sCodUbigSist = $('#txtDireccionOrigen option:selected').attr('ubigeo');

                if (sCodUbigSist != '') {
                    $('#txtCodubigeo').val(sCodUbigSist);
                } else {
                    let ubiAlmacen = $("#cboAlmacen").find('option:selected').attr("data-ubigeo");
                    $('#txtCodubigeo').val(ubiAlmacen);
                }
                
                urba = $('#txtDireccionOrigen option:selected').attr('urbanizacion');
                $('#txtUrbanizacionDestino').val(urba);

                $('#slcdepa').attr("disabled", true);
                $('#slcprov').attr("disabled", true);
                $('#slcdist').attr("disabled", true);
                $('#txtUrbanizacionDestino').attr("disabled", true);
            });
        }
    };

}();

//insertar TC - DPORTA
var InsertarValorCambioOficial = function (monecode) {
    if (typeof $("#cboMoneda [tipo='MOAL']").val() != "undefined" && $("#cboMoneda [tipo='MOAL']").val() != "") {
        monecode = $("#cboMoneda [tipo='MOAL']").val();

        var formData = new FormData();
        formData.append("token", token_migo);

        var request = new XMLHttpRequest();

        request.open("POST", "https://api.migoperu.pe/api/v1/exchange/latest");
        request.setRequestHeader("Accept", "application/json");

        request.send(formData);
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (data.success == true) {
                let fecha = $("#txtTransaccion2").val();
                let valorcomprabase = data.precio_compra;
                let valorventabase = data.precio_venta;
                let valorcompralt = data.precio_compra;
                let valorventalt = data.precio_venta;

                $.ajax({
                    type: "POST",
                    url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=3.5&valorcomprabase=" + valorcomprabase + "&valorventabase=" + valorventabase +
                        "&valorcompralt=" + valorcompralt + "&valorventalt=" + valorventalt + "&fecha=" + fecha + "&usuario=" + "SIST" +
                        "&codbase=" + "0002" + "&codalt=" + monecode,
                    //contentType: "application/json;",
                    //dataType: "json",
                    //async: true,
                    success: function (datos) {
                        if (datos == "OK") {
                            listarValorCambio();
                        } else {
                            noexito();
                        }
                    },
                    error: function (msg) {
                        $("#msgSunat").html("Ocurrió un error al obtener tipo de Cambio.");
                        console.log("Error al obtener datos de SUNAT.");
                    }
                });
            }
        };
    }
}

var listarValorCambio = function () { //DPORTA 26/02/2021

    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=1",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        data: { MONEDA_CODE: $('#cboMoneda').val(), FECHA_EMISION: $('#txtTransaccion2').val() }
    }).done(function (datos) {
        if (datos !== null) {
            if (datos[0].VALOR_CAMBIO_VENTA !== "" && datos[0].FECHA_VIGENTE !== "") {
                $('#txt_valor_cambio').val(datos[0].VALOR_CAMBIO_VENTA);
                $('#txt_fec_vig').val(datos[0].FECHA_VIGENTE);
                $('#lbl_TC, #input_valor_cambio, #lbl_fec_vig, #input_fec_vig').css("display", "block");
            } else {
                $('#txt_valor_cambio').val("");
                $('#txt_fec_vig').val("");
                $('#lbl_TC, #input_valor_cambio, #lbl_fec_vig, #input_fec_vig').css("display", "none");
            }
        }
    }).fail(function (msg) {
        alertCustom('Error al intentar cargar valor de cambio.');
    });
}

var listarValorCambio2 = function () { //DPORTA 26/02/2021

    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=1",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        data: { MONEDA_CODE: "0003", FECHA_EMISION: $('#txtTransaccion2').val() }
    }).done(function (datos) {
        if (datos !== null) {
            if (datos[0].VALOR_CAMBIO_VENTA !== "" && datos[0].FECHA_VIGENTE !== "") {
                $('#txt_valor_cambio').val(datos[0].VALOR_CAMBIO_VENTA);
                $('#txt_fec_vig').val(datos[0].FECHA_VIGENTE);
                //$('#lbl_TC, #input_valor_cambio, #lbl_fec_vig, #input_fec_vig').css("display", "block");
            } else {
                $('#txt_valor_cambio').val("");
                $('#txt_fec_vig').val("");
                $('#lbl_TC, #input_valor_cambio, #lbl_fec_vig, #input_fec_vig').css("display", "none");
            }
        }
    }).fail(function (msg) {
        alertCustom('Error al intentar cargar valor de cambio.');
    });
}

function autocompletarCentroCostos(v_value) { //DPORTA
    //var selectinput = $(v_ID);
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

function cargarProductos2(DCTO_ORGN) {
    //Bloquear("input_cod_prod");
    //Bloquear("input_prod");
    DCTO_ORGN = (DCTO_ORGN === undefined) ? '' : DCTO_ORGN;
    if (ajaxProducto) {
        ajaxProducto.abort();
    }
    ajaxProducto = $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTOS_NAM",
        cache: false,
        data: { CTLG_CODE: $('#slcEmpresa').val(), SCSL_CODE: $('#cboAlmacen :selected').attr('data-scsl-code'), DCTO_ORGN: DCTO_ORGN, MONEDA: $('#cboMoneda').val() },
        datatype: "json",
        async: true
    }).done(function (data) {
        productos = data;
        //Desbloquear("input_cod_prod");
        //Desbloquear("input_prod");

        $('#txtPROD_CODE').parent().html('<input id="txtPROD_CODE" class="span11" type="text" style="text-transform: uppercase">');
        $('#txtPROD_CODE').keyup(function (event) {
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13 && $(this).val().trim() === '') { $('#txtPROD_DESC').focus(); }
        });
        autocompletarCodigoProducto2('#txtPROD_CODE', '');
        $("#txtPROD_DESC").parent().html('<input id="txtPROD_DESC" class="span12" type="text" data-provide="typeahead" />');
        $('#txtPROD_DESC').keyup(function (event) {
            var key = event.keyCode ? event.keyCode : event.which;
            if (key === 13) {
                if ($(this).val().trim() !== '' && $('#hfCOD_PROD').val().trim() !== '') {
                    if ($('#txtcant').prop('disabled')) { $('#txtPU').focus() }
                    else { $('#txtcant').focus() }
                }
            }
        });
        autocompletarProducto2('#txtPROD_DESC', '');
        //autocompletarCentroCostos(prmtCCST);
    }).fail(function (msg) {
        //Desbloquear("input_cod_prod");
        //Desbloquear("input_prod");
        if (msg.statusText != "abort") {
            alertCustom('Error al listar productos.');
        }
    });
};

function autocompletarCodigoProducto2(v_ID, v_value) {
    var input = $(v_ID);
    input.typeahead({
        items: 50,
        source: function (query, process) {
            array = [];
            map = {};

            var obj = "[";
            for (var i = 0; i < productos.length; i++) {
                array.push(productos[i].CODIGO_ANTIGUO);
                obj += '{';
                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","TIPO_UNIDAD":"' + productos[i].TIPO_UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "COSTO": "' + productos[i].COSTO + '", "PESO": "' + productos[i].PESO + '", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
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
            $("#hfCOD_PROD").val(map[item].CODIGO);
            $("#hfDESC_PROD").val(map[item].DESC_ADM);
            $("#txtPROD_DESC").val($("#hfDESC_PROD").val()).change();
            cargarCentroCosto2(map[item].CODIGO);
            autocompletarCentroCostos(prmtCCST);
            //cargarUnidadesMedida(map[item].TIPO_UNIDAD);
            cargarUnidadesMedida2(map[item].UNIDAD);
            $("#cboUniMedida").select2('val', map[item].UNIDAD);
            $('#hfDETRACCION').val(map[item].DETRACCION);
            $('#txt_garantia').val('0');
            $('#txtPROD_DESC').focus();
            $('#txtKU').val(map[item].PESO);
            if (map[item].NO_SERIADA === "S") {
                $("#div_vie_camp_seriados").css("display", "none");
                $("#cboCorrelativo").change();
                $("#txt_num_inicio, #txt_num_fin, #txt_num_inicio, #txtSerie").val("");
                $("#hfTIPO_INSERT").val("NORMAL");
                $("#txtcant").val("");
                $("#hfTIPO_APLI_VALORES").val("E");
                prodSeriado = "N";
                //cargarCostoProducto2();
                $('#txtPU, #txtmonto, #hfMONTO, #txtPrecioUnitInicio').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);
                $("#div_vie_camp_seriados").css("display", "none");
                $("#cboUniMedida").attr("disabled", false)
            } else {
                $("#cboUniMedida").attr("disabled", true)
                $("#div_vie_camp_seriados").css("display", "block");
                $("#cboCorrelativo").change();
                $("#txt_num_inicio, #txt_num_fin, #txt_num_inicio, #txtSerie").val("");
                $("#hfTIPO_INSERT").val("");
                $("#txtcant").val("1").change();
                $("#txtcant").prop("disabled", true);
                $("#hfTIPO_APLI_VALORES").val("M");
                prodSeriado = "S";
                //cargarCostoProducto2();
                $('#txtPU, #txtmonto, #hfMONTO, #txtPrecioUnitInicio').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);
            }
            return item;
        },
    });
    input.keyup(function () {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"))
        if ($("#txtPROD_CODE").val().length <= 0) {
            $('#txtPU, #txtmonto, #txtKU').val('');
            $("#txtcant").attr("disabled", false);
            $("#hfCOD_PROD, #hfCOD_ANT_PROD, #hfSERIE_PROD, #txtPROD_DESC, #hfDETRACCION, #txtcant, #txtCentroCostos, #txt_garantia, #txtStock, #hfTIPO_INSERT, #hfCENTRO_COSTOS, #hfCECC_CODE, #hfTIPO_APLI_VALORES, #txtmonto, #txtKU").val("");
            $("#cboUniMedida").select2("val", "").change();
            $("#cboUniMedida").attr("disabled", true);
            $('#uniform-chkincluyeIGV span').removeClass();
            $('#uniform-chk_desde_compra span').removeClass();
            $('#chkincluyeIGV, #chk_desde_compra').prop('checked', false);
            autocompletarCentroCostos(prmtCCST);
            //INICIO FIN
            $("#txt_num_inicio, #txt_num_fin, #txt_serie_add").val("");
            $("#txtSerie").tagsinput("removeAll");
            $("#cboCorrelativo").select2("val", '').change();
            $("#div_vie_camp_seriados").css("display", "none");

            $('#txtPU, #txtmonto, #txtcant, #txtKU').val('');
        }
    });
    input.val(v_value);
}

function autocompletarProducto2(v_ID, v_value) {
    var input = $(v_ID);
    input.typeahead({
        items: 50,
        source: function (query, process) {
            array = [];
            map = {};
            var obj = "[";
            for (var i = 0; i < productos.length; i++) {
                array.push(productos[i].DESC_ADM);
                obj += '{';
                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","TIPO_UNIDAD":"' + productos[i].TIPO_UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "COSTO": "' + productos[i].COSTO + '", "PESO": "' + productos[i].PESO  + '", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
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
            $("#hfCOD_PROD").val(map[item].CODIGO);
            $("#txtPROD_CODE").val(map[item].CODIGO_ANTIGUO);
            cargarCentroCosto2(map[item].CODIGO);
            autocompletarCentroCostos(prmtCCST);
            //cargarUnidadesMedida(map[item].TIPO_UNIDAD);
            cargarUnidadesMedida2(map[item].UNIDAD);
            $("#cboUniMedida").select2('val', map[item].UNIDAD);
            $('#hfDETRACCION').val(map[item].DETRACCION);
            $('#txt_garantia').val('0');
            $('#txtKU').val(map[item].PESO);
            if (map[item].NO_SERIADA == "S") {
                $("#div_vie_camp_seriados").css("display", "none");
                $("#cboCorrelativo").change();
                $("#txt_num_inicio").val("");
                $("#txt_num_fin").val("");
                $("#txt_num_inicio").val("");
                $("#txtSerie").val("");
                $("#hfTIPO_INSERT").val("NORMAL");
                $("#txtcant").val("");
                $("#hfTIPO_APLI_VALORES").val("E");
                prodSeriado = "N";
                //cargarCostoProducto2();
                $('#txtPU, #txtmonto, #hfMONTO, #txtPrecioUnitInicio').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);
                if ($("#hfCOD_PROD").val() !== '') { $('#txtcant').focus(); }
                $("#div_vie_camp_seriados").css("display", "none");
                $("#cboUniMedida").attr("disabled", false)
            } else {
                $("#cboUniMedida").attr("disabled", true)
                $("#div_vie_camp_seriados").css("display", "block");
                $("#cboCorrelativo").change();
                $("#txt_num_inicio, #txt_num_fin, #txtSerie").val("");
                $("#hfTIPO_INSERT").val("");
                $("#txtcant").val("1").change();
                $("#txtcant").attr("disabled", true);
                $("#hfTIPO_APLI_VALORES").val("M");
                prodSeriado = "S";
                //cargarCostoProducto2();
                $('#txtPU, #txtmonto, #hfMONTO, #txtPrecioUnitInicio').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);
                if ($("#hfCOD_PROD").val() !== '') {
                    if ($('#rbSalida').is(':checked') || $('#rbTSalida').is(':checked')) {
                        $('#txt_garantia').focus();
                    } else {
                        $('#txtPU').focus();
                    }
                }
            }
            return item;
        },
    });
    input.keyup(function () {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"))
        if ($("#txtPROD_DESC").val().trim().length === 0) {
            $('#txtPU, #txtmonto, #txtKU').val('');
            $("#txtPROD_CODE, #hfCOD_PROD, #hfSERIE_PROD, #hfDETRACCION, #txtmonto, #txtKU, #hfTIPO_APLI_VALORES").val("");
            $("#txtcant, #txtCentroCostos, #hfCENTRO_COSTOS, #hfCECC_CODE, #txtStock, #txtKU").val("");
            $("#txtcant").attr("disabled", false);
            $("#cboUniMedida").select2("val", "").change();
            $("#cboUniMedida").attr("disabled", true);
            $('#uniform-chkincluyeIGV span').removeClass();
            $('#chkincluyeIGV').attr('checked', false);
            $('#uniform-chk_desde_compra span').removeClass();
            $('#chk_desde_compra').attr('checked', false);
            autocompletarCentroCostos(prmtCCST);
            //INICIO FIN
            $("#txt_num_inicio, #txt_num_fin, #txt_serie_add").val("");
            $("#txtSerie").tagsinput("removeAll");
            $("#cboCorrelativo").select2("val", '').change();
            $("#div_vie_camp_seriados").css("display", "none");
            $('#txtPU, #txtmonto, #txtcant, #txtKU').val('');
        }
    });
    input.val(v_value);
}

function cargarCentroCosto2(pCodProducto) {
    var CODE_PROD = pCodProducto;
    var TIPO_MOV = $("#cboOperacion").val();
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTO_CECO&CTLG_CODE=" + $('#ctl00_hddctlg').val() + "&CODE_PROD=" + CODE_PROD + "&TIPO_MOV=" + TIPO_MOV,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            if (datos != null) {
                var sCentroCostoDescr = datos[0].DES_CORTA;
                var sCodCentroCosCab = datos[0].CECC;
                var sCodCentroCosto = datos[0].CECD;

                $("#txtCentroCostos").val(sCentroCostoDescr);
                $("#txtCentroCostos").data("CodCentroCostoCab", sCodCentroCosCab);
                $("#txtCentroCostos").data("CodCentroCosto", sCodCentroCosto);
            } else {
                return;
            }
        },
        error: function (msg) {
            alertCustom('Error al listar unidades de medida.');
        }
    });
}

function cargarUnidadesMedida2(codUniMed) {
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LUNPRO&COD_UNI=" + codUniMed,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboUniMedida').empty();
            $('#cboUniMedida').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboUniMedida').append('<option value="' + datos[i].CODUNI2 + '" equivalencia="' + datos[i].EQUI + '">' + datos[i].UNIDAD_MEDIDA + '</option>');
                }
            }
            $('#cboUniMedida').select2('val', "");
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

//var cargarCostoProducto2 = function () {
//    if ($('#cboMoneda').val() !== '' && $('#hfCOD_PROD').val() !== '') {
//        //Bloquear('detallemov');
//        $.ajax({
//            type: "post",
//            url: "vistas/na/ajax/naminsa.ashx?OPCION=COSTO&CTLG_CODE=" + $('#slcEmpresa').val() + "&CODE_PROD=" + $('#hfCOD_PROD').val() + "&COD_ALMC=" + $('#cboAlmacen').val() + "&MONEDA=" + $('#cboMoneda').val(),
//            contenttype: "application/json;",
//            datatype: "json",
//            async: false,
//            success: function (datos) {
//                if (datos !== null) {
//                    $('#txtPU, #txtmonto, #hfMONTO, #txtPrecioUnitInicio').val(parseFloat(datos[0].PU_TOT).toFixed(prmtDIGI));
//                } else {
//                    $('#txtmonto, #hfMONTO').val('');
//                }
//                //Desbloquear('detallemov');
//            },
//            error: function (msg) {
//                alertCustom('Error al cargar costo del producto seleccionado.');
//                Desbloquear('detallemov');
//            }
//        });
//    }
//};

//DPORTA
function cargarParametrosSistema() {
    //OBTENER CANTIDAD DIGITOS EN LA PARTE DECIMAL (COSTO)
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DIGC",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                prmtDIGI = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro DIGC!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro DIGC!");
        }
    });

    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                prmtACON = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro ACON!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro ACON!");
        }
    });

    //TOKEN PARA PODER HACER LAS CONSULTAS DE LOS N° DE DOCS. A SUNAT
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MIGO",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                token_migo = datos[0].DESCRIPCION_DETALLADA;
            } else {
                alertCustom("No se recuperó correctamente el parámetro MIGO!");
            }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro MIGO!");
        }
    });

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

                    prmtCCST = datos[0].VALOR;
                    //console.log(jsonPredeterminado.PIDM);
                } else {
                    // QUE CARGUEN TODOS LOS CLIENTES NORMAL  
                    alertCustom("No se recuperó correctamente el parámetro CCST!");
                }
            } else {
                alertCustom("No se recuperó correctamente el parámetro CCST!");
            }
        },
    });
}

//Imprimir dcto venta
function ImprimirGuiaRemisionElectonica(NumDctoAlmc) {
    //Bloquear("ventana");    
    /*if (documento_registro == '0009' && serie_documento_registro.substring(0,1) == 'T') {*/
        //if (verificarFormatoTicket($("#cboDocumentoVenta").val()) == '[{"FORMATO_TICKET" :"SI"}]') {
    var data = new FormData();
    data.append('CTLG_CODE', $("#slcEmpresa").val());
    data.append('p_CODE', NumDctoAlmc);
    //data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
    //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/na/ajax/NAMINSA.ashx?OPCION=IMPR",
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
                }, 0.0000000000000001)

            } else {
                noexito();
            }
        })
        .error(function () {
            noexito();
        });
        //ImprimirDctoVentaTicket();
    /*} else {*/
        //if ($("#cboDocumentoVenta").val() == '0012' || $("#cboDocumentoVenta :selected").html().indexOf("TICKET") >= 0) {
        //    var data = new FormData();
        //    data.append('p_CODE', $("#txtNumDctoComp").val());
        //    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
        //    //data.append('COPIA_IND', ($("#chkCopia").is(":checked")) ? "S" : "N")
        //    var jqxhr = $.ajax({
        //        type: "POST",
        //        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
        //        contentType: false,
        //        data: data,
        //        processData: false,
        //        async: false,
        //        cache: false
        //    })
        //        .success(function (datos) {
        //            if (datos != null) {


        //                $("#divDctoImprimir").html(datos);
        //                setTimeout(function () {
        //                    window.print();
        //                }, 0.0000000000000001)

        //            } else {
        //                noexito();
        //            }
        //        })
        //        .error(function () {
        //            noexito();
        //        });
        //    //ImprimirDctoVentaTicket();
        //} else {
        /*crearImpresion($("#txtNumDctoAlmc").val());*/
        /*}*/
    /*}*/
}

function ImprimirGuiaRemisionElectonicaNalinsa(NumDctoAlmc, CtlgCode) {
    //Bloquear("ventana");    
    /*if (documento_registro == '0009' && serie_documento_registro.substring(0,1) == 'T') {*/
    //if (verificarFormatoTicket($("#cboDocumentoVenta").val()) == '[{"FORMATO_TICKET" :"SI"}]') {
    var data = new FormData();
    data.append('CTLG_CODE', CtlgCode);
    data.append('p_CODE', NumDctoAlmc);
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/na/ajax/NAMINSA.ashx?OPCION=IMPR",
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
                }, 0.0000000000000001)

            } else {
                noexito();
            }
        })
        .error(function () {
            noexito();
        });
}

//DPORTA - validaDecimales
function solonumbef(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = '0123456789.';//Caracteres validos
    for (var i = 0; i < string.length; i++) {
        if (filtro.indexOf(string.charAt(i)) != -1) {
            out += string.charAt(i);
        }
    }
    //Corta la cadena y toma la parte decimal
    var arr = out.split(".");
    //Toma la longitud de la cadena y si es 3, entonces es porque ingresaron otro "."
    var long = arr.length;
    //Si es asi, entonces corta la cadena uno anterior
    if (long == 3) {
        return out.substring(0, out.length - 1);
    }

    var arrDecimal = arr[1];

    //Si es menor o igual al valor del parámetro, entonces muestra el número digitado con normalidad. 
    if (typeof arrDecimal != "undefined") {
        if (arrDecimal.length <= prmtDIGI) {
            return out;
        }
        //Si es mayor al valor del parámetro entonces corta la cadena longitud de la cadena - 1, para que quite el último digito ingresado.
        return out.substring(0, out.length - 1);
    }

    return out;
} 


var fillTable_Dctos_Garantias = function () {

    var parms = {
        data: null,
        responsive: false,
        order: [[0, 'desc']],
        "paging": false,
        "searching": false,
        "info": false,

        columns: [
            {
                data: "CODE",
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
                data: "RAZON_SOCIAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');

                }
            },
            {
                data: "IMPORTE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center');

                }
            },
        ]
    }

    oTableDcto = $('#Tbl_Docs_Gar').dataTable(parms);
}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=SENDMAIL&REMITENTE=" + $('#txtRemitente').val() +
            "&NREMITENTE=" + $('#txtNRemitente').val() + "&DESTINATARIOS=" + destinos +
            "&ASUNTO=" + $('#txtAsunto').val() + "&MENSAJE=" + $('#txtcontenido').val() +
            "&EMPRESA=" + $('#ctl00_lbl_empresa').text() + "&TIPO_MOV=" + tipo_mov +
            "&ALMACEN=" + $('#cboAlmacen :selected').text() + "&OPERACION=" + $('#cboOperacion :selected').text() +
            "&SECUENCIA=" + $('#txtsecuencia').val() + "&EMISION=" + $('#txtEmision').val() +
            "&TRANSACCION=" + $('#txtTransaccion').val() + "&SOLICITANTE=" + $('#txtSolicitante').val() +
            "&RECEPCIONADO=" + $('#txtEntregar').val() + "&AUX=" + aux + "&ORIGEN_DESTINO=" + $('#txtRazonSocial').val() +
            "&DOC_ORIGEN=" + $('#cboTipoDcto :selected').text() + "&NUM_DOC_ORIGEN=" + $('#txtNroDcto').val() +
            "&DOC_REGISTRO=" + $('#cboRegistro :selected').text() + ' ' + $('#txtSerieDctoRegistro').val() + '-' + $('#txtNroDctoRegistro').val() +
            "&GLOSA=" + $('#txtGlosa').val() + "&codigo=" + ObtenerQueryString("codigo"),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                exito();
                $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);
            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });
    }
};

var enviarWhatsapp = function () {
    var telefonos = $("#cboClienteWhatsapp").val();

    if (vErrors(['cboClienteWhatsapp'])) {
        $('#btnEnviarWhatsapp').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        RECIPIENT_PHONE_NUMBER = telefonos.toString();
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=SENDWHATSAPP&RECIPIENT_PHONE_NUMBER=" + RECIPIENT_PHONE_NUMBER +
                "&MENSAJEWHATSAPP=" + $('#txtContenidoWhatsapp').val() +
                "&CTLG_CODE=" + $("#slcEmpresa").val() +
                "&p_CODE=" + $("#txtNumDctoAlmc").val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos === "OK") {
                    exito();
                } else {
                    alertCustom("El mensaje no se envio correctamente");
                }
                $('#btnEnviarWhatsapp').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divWhatsapp').modal('hide'); }, 25);
            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el mensaje. Por favor, inténtelo nuevamente.');
                $('#btnEnviarWhatsapp').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });
    }
};

var cargarCostoProducto = function () {
    if ($('#cboMoneda').val() !== '' && $('#hfCOD_PROD').val() !== '') {
        //Bloquear('detallemov');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=COSTO&CTLG_CODE=" + $('#slcEmpresa').val() + "&CODE_PROD=" + $('#hfCOD_PROD').val() + "&COD_ALMC=" + $('#cboAlmacen').val() + "&MONEDA=" + $('#cboMoneda').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    $('#txtPU, #txtmonto, #hfMONTO, #txtPrecioUnitInicio').val(parseFloat(datos[0].PU_TOT).toFixed(prmtDIGI)); 
                } else {
                    $('#txtmonto, #hfMONTO').val('');
                }
                //Desbloquear('detallemov');
            },
            error: function (msg) {
                alertCustom('Error al cargar costo del producto seleccionado.');
                //Desbloquear('detallemov');
            }
        });
    }
};

var documentoSeleccionado = function (strdoc) {
    var inputs = $('.txtCodigoDctoOrigen');
    var docsseleccionados = "";
    for (var c = 0; c < inputs.length; c++) {
        var input = inputs[c];
        docsseleccionados += $(input).val() + ',';
    }
    return docsseleccionados.indexOf(strdoc) > -1;
};

var buscarDocumento = function (btnBuscar) {
    var tipo_persona = $('#cboOperacion :selected').attr('data-tipo-persona');
    var a = ['cboOrigen'];
    var pidm = $('#hfPIDM').val();
    var tipo_mov = $("#rbEntrada").is(':checked') ? 'I' : $("#rbSalida").is(':checked') ? 'S' : $("#rbTEntrada").is(':checked') ? 'TI' : $("#rbTSalida").is(':checked') ? 'TS' : '';
    var operacion = $("#cboOperacion").val();
    var mov_cont = $("#cboOperacion option:selected").attr("data-tipo-movcont");

    if (tipo_persona === 'CLIENTE' || tipo_persona === 'CATALOGO' || tipo_persona === 'PERSONA' || tipo_persona === 'PROVEEDOR') {
        a.push('txtRazonSocial');
    }

    if (tipo_persona === 'EMPLEADO' || tipo_persona === '') {
        pidm = $('#txtPIDM_Solicitante').val();
        a.push('txtSolicitante');
    }
    if (vErrors(a)) {

        if (mov_cont != "SN" || (mov_cont == "SN" && $('#cboOrigen').val() == "0007")) {
            Bloquear('generales');
            $('#tblDocumentos').DataTable().destroy();
            var tbody = $('#tblDocumentos').find('tbody');
            $.ajax({
                type: 'post',
                // '&SCSL_CODE=' + $('#cboAlmacen :selected').attr('data-scsl-code') +
                url: 'vistas/na/ajax/naminsa.ashx?OPCION=LDOCS&TIPO_DCTO=' + $('#cboOrigen').val() + '&CTLG_CODE=' + $('#slcEmpresa').val() +  '&COD_ALMC=' + $('#cboAlmacen').val() + '&PIDM=' + pidm + '&USUA_ID=' + $('#txtUsuaSolicitante').val() + '&TIPO_MOV=' + tipo_mov + '&ALMC_DEST=' + $('#cboAlmacenTransferencia').val(),
                contenttype: "application/json",
                datatype: "json",
                async: true
            })
                .done(function (datos) {
                    Desbloquear('generales');
                    tbody.html('');
                    if (datos !== null && datos.length > 0) {
                        
                        for (var i = 0; i < datos.length; i++) {
                            //Se lista el importe total, NO el importe que se paga en fabcred
                            var flujo = ($("#rbEntrada").is(':checked') ? 'I' : $("#rbSalida").is(':checked') ? 'S' : $("#rbTEntrada").is(':checked') ? 'TI' : $("#rbTSalida").is(':checked') ? 'TS' : '');
                            if (datos[i].DESPACHADO == "N")
                                var despachado = "NO";
                            else
                                if (datos[i].DESPACHADO == "P")
                                    var despachado = "PARCIAL";
                                else
                                    if (datos[i].DESPACHADO.length > 1)
                                        var despachado = datos[i].DESPACHADO.length;
                            

                            if (flujo == "I" || flujo == "TI") {
                                var total = 0
                                if (datos[i].IMPORTE_TOTAL != undefined && datos[i].IMPORTE_TOTAL !== "") {
                                    total = datos[i].IMPORTE_TOTAL;
                                }
                                if (datos[i].TOTAL != undefined && datos[i].TOTAL !== "") {
                                    total = datos[i].TOTAL;
                                }
                                if (flujo == "TI") {//DPORTA 10/06/2022
                                    tbody.append('<tr><td style="text-align: center">' + datos[i].CODIGO + '</td><td style="text-align: center">' + datos[i].NRO_DOCUMENTO + '</td><td style="text-align: center">' + datos[i].PROVEEDOR + '</td><td style="text-align: center">' + datos[i].DESC_CORTA_MONEDA + '</td><td style="text-align: center">' + parseFloat(total).toFixed(2) + '</td><td style="text-align: center">' + datos[i].EMISION + '</td><td style="text-align: center">' + despachado + '</td><td style="text-align: center">' + datos[i].ALMC_CODE_ORIGEN + '</td><td style="text-align: center">' + datos[i].ALMC_CODE_DESTINO + '</td><td style="text-align: center">' + datos[i].DESC_ALMC_ORIGEN + '</td><td style="text-align: center">' + datos[i].DESC_ALMC_DESTINO + '</td></tr>');
                                } else {
                                    tbody.append('<tr><td style="text-align: center">' + datos[i].CODIGO + '</td><td style="text-align: center">' + datos[i].NRO_DOCUMENTO + '</td><td style="text-align: center">' + datos[i].PROVEEDOR + '</td><td style="text-align: center">' + datos[i].DESC_CORTA_MONEDA + '</td><td style="text-align: center">' + parseFloat(total).toFixed(2) + '</td><td style="text-align: center">' + datos[i].EMISION + '</td><td style="text-align: center">' + despachado + '</td><td style="text-align: center">' + "-" + '</td><td style="text-align: center">' + "-" + '</td><td style="text-align: center">' + "-" + '</td><td style="text-align: center">' + "-" + '</td></tr>');
                                }
                            }
                            else {
                                tbody.append('<tr><td style="text-align: center">' + datos[i].CODIGO + '</td><td style="text-align: center">' + datos[i].NRO_DOCUMENTO + '</td><td style="text-align: center">' + datos[i].PROVEEDOR + '</td><td style="text-align: center">' + datos[i].DESC_CORTA_MONEDA + '</td><td style="text-align: center">' + parseFloat(datos[i].TOTAL).toFixed(2) + '</td><td style="text-align: center">' + datos[i].EMISION + '</td><td style="text-align: center">' + despachado + '</td><td style="text-align: center">' + "-" + '</td><td style="text-align: center">' + "-" + '</td><td style="text-align: center">' + "-" + '</td><td style="text-align: center">' + "-" + '</td></tr>');
                            }
                        }
                    }

                    tabla = $('#tblDocumentos').DataTable({ info: false, responsive: true, order: [[0, 'desc']] });
                    $(tbody).css('cursor', 'pointer');
                    $('#tblDocumentos_wrapper').find(':last').remove();
                    $('#divBuscarDoc').modal('show');

                    if ($("#divBuscarDoc").hasClass('in') == true) {
                        $('#tblDocumentos_filter.dataTables_filter input[type=search]').focus();
                    }
                    $('#divBuscarDoc').on('shown.bs.modal', function () {
                        $('#tblDocumentos_filter.dataTables_filter input[type=search]').focus();
                    });

                    tbody.unbind('click');
                    tbody.on('click', 'tr', function () {
                        $(this).addClass('selected');
                        var fila = tabla.row(this).data();
                        var cod_doc = fila[0];

                        if (flujo == "TI") { //DPORTA 10/06/2022
                            $('#cboAlmacen').select2('val', fila[8]).change(); // ALMACÉN DESTINO
                            $("#cboAlmacenTransferencia").select2("val", fila[7]).change(); // ALMACÉN ORIGEN
                            $('#cboAlmacen, #cboAlmacenTransferencia').attr("disabled", true);

                            $.ajax({
                                type: "POST",
                                url: "vistas/na/ajax/naminsa.ashx?OPCION=S&codigo=" + cod_doc,
                                contentType: "application/json;",
                                dataType: "json"
                            })
                                .done(function (data) {
                                    if (data !== null) {
                                        if (data[0].TIPO_TRANS === 'PUB') {
                                            $('#rdPublico').click();
                                            $('#rdPublico').parent().addClass('checked');
                                            $('#rdPrivado').parent().removeClass('checked');
                                            $('#rdOtro').parent().removeClass('checked');
                                            $("#txtPIDM_EmpresaTransporte").val(data[0].PIDMTRANS);
                                            $("#hfDNI_EMPTRANS").val(data[0].NRO_DOC_DNI_TRANS);
                                            $("#hfRUC_EMPTRANS").val(data[0].NRO_DOC_RUC_TRANS);
                                            $("#txtnumdocemptrans").val(data[0].NRO_DOC_RUC_TRANS);

                                            $("#txtEmpresaTransporte").val(data[0].RAZON_TRANS.trim()).keyup().siblings("ul").children('li').click();

                                        } else if (data[0].TIPO_TRANS === 'PRI') {
                                            $('#rdPrivado').click();
                                            $('#rdPrivado').parent().addClass('checked');
                                            $('#rdPublico').parent().removeClass('checked');
                                            $('#rdOtro').parent().removeClass('checked');
                                        }
                                        else if (data[0].TIPO_TRANS === 'OTR') {
                                            $('#rdOtro').click();
                                            $('#rdOtro').parent().addClass('checked');
                                            $('#rdPublico').parent().removeClass('checked');
                                            $('#rdPrivado').parent().removeClass('checked');
                                            $("#txtEmpresaTransporte").val(data[0].RAZON_TRANS.trim()).keyup().siblings("ul").children('li').click();
                                        }

                                        $('#txtDireccionTransportista').select2('val', data[0].DIRECCION_TRANSPORTISTA).change();
                                        $("#txtchofer").val(data[0].CHOFER);
                                        $("#txtLicConducir").val(data[0].LICENCIA_NRO);
                                        $("#txtCertificadoInscripcion").val(data[0].CERTIFICADO_NRO);
                                        if (data[0].TIPO_TRANS === 'PRI') {
                                            $("#txtvehiculo").val(data[0].VEHICULO_MARCA_PLACA);
                                        } else {
                                            $("#txtVehiculoFact").val(data[0].VEHICULO_MARCA_PLACA.split("||")[0]);
                                            $("#txtMarca").val(data[0].VEHICULO_MARCA_PLACA.split("||")[1]);
                                            $("#txtPlaca").val(data[0].VEHICULO_MARCA_PLACA.split("||")[2]);
                                        }
                                        $("#txtNroVueltas").val(data[0].NRO_VUELTAS);
                                        if ($("#txtEmpresaTransporte").val() !== "") {
                                            $("#rdPublico, #rdPrivado, #rdOtro,#txtDireccionTransferencia").attr("disabled", true);
                                            $("#txtEmpresaTransporte,#txtVehiculoFact,#txtMarca,#txtPlaca,#txtCertificadoInscripcion,#txtvehiculo,#txtchofer,#txtLicConducir,#txtNroVueltas").attr("disabled", true);
                                        }
                                        if (data[0].TIPO_TRANS === 'PRI') {
                                            ($("#txtvehiculo").val() !== '' ? $("#txtvehiculo").attr("disabled", true) : $("#txtvehiculo").attr("disabled", false));
                                            ($("#txtCertificadoInscripcion").val() !== '' ? $("#txtCertificadoInscripcion").attr("disabled", true) : $("#txtCertificadoInscripcion").attr("disabled", false));
                                            ($("#txtLicConducir").val() !== '' ? $("#txtLicConducir").attr("disabled", true) : $("#txtLicConducir").attr("disabled", false));
                                            ($("#txtchofer").val() !== '' ? $("#txtchofer").attr("disabled", true) : $("#txtchofer").attr("disabled", false));                                            
                                        }
                                    }                                                                        
                                })
                        }

                        if (!documentoSeleccionado(cod_doc)) {
                            var nro_doc = fila[1].split('-');
                            if (nro_doc.length > 2) {
                                var serie = nro_doc[0] + '-' + nro_doc[1];
                                var nro = nro_doc[2];
                            } else if (nro_doc.length > 1) {
                                var serie = nro_doc[0];
                                var nro = nro_doc[1];
                            } else {
                                serie = '';
                                nro = nro_doc[0];
                            }
                            var monto = fila[3];

                            var padre = $(btnBuscar).parent().parent().parent().parent();
                            $(padre).find('.txtCodigoDctoOrigen').val(cod_doc);
                            $(padre).find('.txtSerieDctoOrigen').val(serie);
                            $(padre).find('.txtNroDctoOrigen ').val(nro);
                            $('#divBuscarDoc').modal('hide');
                        } else {
                            alertCustom('Documento ya seleccionado en la lista de Documentos de Origen.');
                            $(this).removeClass('selected');
                        }
                        $('#cboRegistro').change();
                    });

                    CambiarTextoCabeceraDctosOrigen(tabla);

                })
                .error(function (msg) {
                    Desbloquear('generales');
                    alertCustom(msg);


                    tabla = $('#tblDocumentos').DataTable({ info: false, responsive: true, order: [[0, 'desc']] });
                    $(tbody).css('cursor', 'pointer');
                    $('#tblDocumentos_wrapper').find(':last').remove();
                    $('#divBuscarDoc').modal('show');
                    tbody.unbind('click');
                    tbody.on('click', 'tr', function () {
                        $(this).addClass('selected');
                        var fila = tabla.row(this).data();
                        var cod_doc = fila[0];

                        if (!documentoSeleccionado(cod_doc)) {
                            var nro_doc = fila[1].split('-');
                            if (nro_doc.length > 2) {
                                var serie = nro_doc[0] + '-' + nro_doc[1];
                                var nro = nro_doc[2];
                            } else if (nro_doc.length > 1) {
                                var serie = nro_doc[0];
                                var nro = nro_doc[1];
                            } else {
                                serie = '';
                                nro = nro_doc[0];
                            }
                            var monto = fila[3];

                            var padre = $(btnBuscar).parent().parent().parent().parent();
                            $(padre).find('.txtCodigoDctoOrigen').val(cod_doc);
                            $(padre).find('.txtSerieDctoOrigen').val(serie);
                            $(padre).find('.txtNroDctoOrigen ').val(nro);
                            $('#divBuscarDoc').modal('hide');
                        } else {
                            alertCustom('Documento ya seleccionado en la lista de Documentos de Origen.');
                            $(this).removeClass('selected');
                        }
                    });

                    var th = tabla.column(2).header();
                    var cMonto = tabla.column(3);
                    if ($('#cboOrigen').val() === '0028' || $('#cboOrigen').val() === '0052') {
                        $(th).text('SOLICITANTE');
                        cMonto.visible(false);
                    } else {
                        $(th).text('PROVEEDOR');
                        cMonto.visible(true);
                    }
                });

            DesbloquearSinGif("#detallemov_datos")
        } else {

            div = $(btnBuscar).parent().parent().parent().parent();

            $("#t_serie,#t_numero").val("");
            $('#Tbl_Docs_Gar').DataTable().destroy();
            fillTable_Dctos_Garantias();
            var tbody = $('#Tbl_Docs_Gar').find('tbody');
            $(tbody).css('cursor', 'pointer');
            $('#divDocGar').modal('show');
            oTableDcto.fnClearTable();
            oTableDcto.fnAdjustColumnSizing();
            oTableDcto.fnDraw();

            var titulo = $('#cboOrigen option:selected').text();
            $("#lbl_titulo").text(titulo)

            $('#Tbl_Docs_Gar').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $("#Tbl_Docs_Gar tr.selected").removeClass('selected');
                    $(this).addClass('selected');
                    var row = $("#Tbl_Docs_Gar").DataTable().row(this).data();

                    var code = row.CODE;
                    if (!documentoSeleccionado(code)) {

                        var nro_doc = (row.NUM_DCTO).split('-');
                        if (nro_doc.length > 2) {
                            var serie = nro_doc[0] + '-' + nro_doc[1];
                            var nro = nro_doc[2];
                        } else if (nro_doc.length > 1) {
                            var serie = nro_doc[0];
                            var nro = nro_doc[1];
                        } else {
                            serie = '';
                            nro = nro_doc[0];
                        }

                        $(div).find('.txtCodigoDctoOrigen').val(code);
                        $(div).find('.txtSerieDctoOrigen').val(serie);
                        $(div).find('.txtNroDctoOrigen ').val(nro);
                        $('#divDocGar').modal('hide');
                        oTableDcto.fnClearTable();
                    } else {
                        alertCustom('Documento ya seleccionado en la lista de Documentos de Origen.');
                        $(this).removeClass('selected');
                    }
                }
            });

            DesbloquearSinGif("#detallemov_datos")
        }
    }
};

function CambiarTextoCabeceraDctosOrigen(tabla) {
    var mov_cont = $("#cboOperacion option:selected").attr("data-tipo-movcont");

    var th = tabla.column(2).header();
    var th2 = tabla.column(6).header();
    var cMonto = tabla.column(3);
    var cOrigen = tabla.column(7);
    var cDestino = tabla.column(8);
    var cAlmcOrigen = tabla.column(9);
    var cAlmcDestino = tabla.column(10);
    if ($('#cboOrigen').val() === '0028' || $('#cboOrigen').val() === '0052') {
        $(th).text('SOLICITANTE');
        $(th2).text('COMPLETADO');
        cMonto.visible(false);
    } else {
        $(th).text('PROVEEDOR');
        $(th2).text('DESPACHO');
        cMonto.visible(true);
        if ($("#cboOperacion").val() == "0001") {
            $(th).text('CLIENTE');
            $(th2).text('DESPACHO');
        } else {
            if ($('#cboOrigen').val() == '0009') {
                $(th).text('PROVEEDOR');
                $(th2).text('COMPLETADO');
            }
        }
    }

    if ($("#rbTEntrada").is(':checked')) { //|| $("#rbTSalida").is(':checked')
        $(th).text('EMPRESA');
        $(th2).text('INGRESADO');
        cOrigen.visible(false);
        cDestino.visible(false);
        cAlmcOrigen.visible(true);
        cAlmcDestino.visible(true);
    } else {
        cOrigen.visible(false);
        cDestino.visible(false);
        cAlmcOrigen.visible(false);
        cAlmcDestino.visible(false);
    }
}
var fnGetCodUbigeoSunat = function (sCodUbigSist) {
    let asUbigeoSunat = [];

    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=GETUBI&sCodUbigSist=" + sCodUbigSist,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (isEmpty(datos)) {
                alertCustom('Error al obtener el código de ubigeo.');
                return;
            }
            asUbigeoSunat = datos;
        },
        error: function (msg) {
            alertCustom('Error al cargar costo del producto seleccionado.');
            Desbloquear('detallemov');
        }
    });

    return asUbigeoSunat;
}

function obtenerDocumentosGarantia() {
    var CTLG_CODE = $('#slcEmpresa').val();
    var SCSL_CODE = $('#cboAlmacen :selected').attr('data-scsl-code');
    var DCTO_CODE = $('#cboOrigen').val();
    //var ESTADO = "N" // no anulado
    var p_COMPLETO_IND = "S" //venta completada
    var SERIE_DCTO = $("#t_serie").val();
    var NUM_DCTO = $("#t_numero").val();
    var PIDM = $("#hfPIDM").val();

    if (vErrors(["t_serie", "t_numero"])) {
        //Bloquear('div2');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=6&CTLG_CODE=" + CTLG_CODE +
            "&SCSL_CODE=" + SCSL_CODE +
            "&DCTO_CODE=" + DCTO_CODE +
            // "&ESTADO="+ ESTADO +
            "&p_COMPLETO_IND=" + p_COMPLETO_IND +
            "&SERIE_DCTO=" + SERIE_DCTO +
            "&NUM_DCTO=" + NUM_DCTO +
            "&PIDM=" + PIDM,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTableDcto.fnClearTable()
                if (!(isEmpty(datos))) {

                    oTableDcto.fnAddData(datos)

                } else {
                    alertCustom("Documento no existe");

                }
                //Desbloquear('div2');
            },
            error: function (msg) {
                alertCustom('Ocurrió un error al listar.');
                //Desbloquear('div2');
            }
        });
    }
}

//DIRECCIONES
var cargarDirecciones = function () {
    $('#txtDireccionOrigen').select2();
    var select = $('#txtDireccionOrigen').prop('disabled', false);
    //Bloquear('ventana');
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LDIR&CTLG_CODE=" + $('#slcEmpresa').val() + "&PIDM=" + $('#hfPIDM').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $(select).html('<option></option>');
            if (datos !== null) {
                for (var i = 0; i < datos.length; i++) {
                    $(select).append('<option value="' + datos[i].DIRECCION + '" ubigeo="' + datos[i].UBIGEO + '"urbanizacion="' + datos[i].URBANIZACION + '">' + datos[i].DIRECCION + '</option>');
                }
                if ($('#txtDireccionOrigen')[0].tagName == "SELECT") {
                    $(select).select2("val", datos[0].DIRECCION);
                    let sCodUbigSist = datos[0].UBIGEO;
                    if (sCodUbigSist != '') {
                        $('#txtCodubigeo').val(sCodUbigSist);
                        
                    } else {
                        let ubiAlmacen = $("#cboAlmacen").find('option:selected').attr("data-ubigeo");
                        $('#txtCodubigeo').val(ubiAlmacen);                                                                
                    }                   
                    $('#txtUrbanizacionDestino').val(datos[0].URBANIZACION);                                      
                    $('#slcdepa').attr("disabled", true);
                    $('#slcprov').attr("disabled", true);
                    $('#slcdist').attr("disabled", true);
                    $('#txtUrbanizacionDestino').attr("disabled", true);
                }
            }
            //Desbloquear('ventana');
        },
        error: function (msg) {
            alertCustom('Error al listar direcciones.');
            //Desbloquear('ventana');
        }
    });
};

//TIPO DE DOCUMENTO
var cargarTipoDocumento = function () {    
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LDOC&PIDM=" + $('#hfPIDM').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {                
            $('#cboTipoDcto').html('<option></option>');
            if (datos !== null) {
                let sCodDocIdent = "";
                for (var i = 0; i < datos.length; i++) {
                    $('#cboTipoDcto').append('<option value="' + datos[i].CODIGO_DOCUMENTO + '" nroDoc="' + datos[i].NUM_DOC + '">' + datos[i].DESC_DOCUMENTO + '</option>');
                    sCodDocIdent = datos[i].CODIGO_DOCUMENTO;
                }

                $("#cboTipoDcto").val("6").change();
                if ($("#cboTipoDcto").val() == "") { 
                    $("#cboTipoDcto").val("1").change();
                    if ($("#cboTipoDcto").val() == "") {
                        $("#cboTipoDcto").val(sCodDocIdent).change();
                    }
                }
            }            
            //Desbloquear('ventana');
        },
        error: function (msg) {
            alertCustom('Error al listar direcciones.');
            //Desbloquear('ventana');
        }
    });
};

var fnFillcboPais = function () {
    //Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/namcfal.ashx?opcion=18",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: true,
        success: function (datos) {
            //Desbloquear("ventana");

            if (datos != null) {
                //debugger;
                $('#slcpais').empty();
                $('#slcpais').append('<option value=""></option>');
                for (var i = 0; i < datos.length; i++) {
                    $('#slcpais').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                }
            }
            $('#slcpais').select2('val', '');
        },
        error: function (msg) {
            //Desbloquear("ventana");
            alertCustom("Empresas no se listaron correctamente");
        }
    });
};

var fnFillcboDepa = function (sCodPais) {

    //Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/namcfal.ashx?opcion=19&p_Code_Pais=" + sCodPais,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: true,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $('#slcdepa').empty();
                $('#slcdepa').append('<option value=""></option>');
                for (var i = 0; i < datos.length; i++) {
                    $('#slcdepa').append('<option value="' + datos[i].UBIG_DEPARTAMENTO + '">' + datos[i].DEPARTAMENTO + '</option>');
                }
            }
            $('#slcdepa').select2('val', '');
            $('#slcdepa').attr("disabled", false);
        },
        error: function (msg) {
            //Desbloquear("ventana");
            alertCustom("Empresas no se listaron correctamente");
        }
    });
};

var fnFillcboProv = function (sCodDep) {

    //Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/namcfal.ashx?opcion=20&p_Code_Depa=" + sCodDep,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: true,
        success: function (datos) {
            //Desbloquear("ventana");
            if (datos != null) {
                $('#slcprov').empty();
                $('#slcprov').append('<option value=""></option>');
                for (var i = 0; i < datos.length; i++) {
                    $('#slcprov').append('<option value="' + datos[i].UBIG_PROVINCIA + '">' + datos[i].PROVINCIA + '</option>');
                }
            }
            $('#slcprov').select2('val', '');
            $('#slcprov').attr("disabled", false);
        },
        error: function (msg) {
            //Desbloquear("ventana");
            alertCustom("Empresas no se listaron correctamente");
        }
    });
};

var fnFillcboDist = function (sCodProv) {
    //Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/namcfal.ashx?opcion=21&p_Code_Prov=" + sCodProv,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: true,
        success: function (datos) {
            //Desbloquear("ventana");

            if (datos != null) {
                $('#slcdist').empty();
                $('#slcdist').append('<option value=""></option>');
                for (var i = 0; i < datos.length; i++) {
                    $('#slcdist').append('<option value="' + datos[i].UBIG_DISTRITO + '"codigoub="' + datos[i].CODE_UBIGEO + '">' + datos[i].DISTRITO + '</option>');
                }
            }
            $('#slcdist').select2('val', '');
            $('#slcdist').attr("disabled", false);
        },
        error: function (msg) {
            //Desbloquear("ventana");
            alertCustom("Empresas no se listaron correctamente");
        }
    });
};

var cargarDireccionesTransportista = function () {
    var select = $('#txtDireccionTransportista').prop('disabled', false);
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LDIR&CTLG_CODE=" + $('#slcEmpresa').val() + "&PIDM=" + $('#txtPIDM_EmpresaTransporte').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $(select).html('<option></option>');
            if (datos !== null) {
                for (var i = 0; i < datos.length; i++) {
                    $(select).append('<option value="' + datos[i].DIRECCION + '">' + datos[i].DIRECCION + '</option>');
                }
            }
        },
        error: function (msg) {
            alertCustom('Error al listar direcciones de transportista.');
        }
    });
};

//AUTOCOMPLETADO CAMPOS
var autocompletarChofer = function (v_ID, v_value) {
    var selectinput = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=6&CTLG_CODE=" + $('#slcEmpresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos !== null) {
                selectinput.typeahead({
                    source: function (query, process) {
                        var arrayChofer = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayChofer.push(datos[i].NOMBRE);
                            obj += '{';
                            obj += '"LICENCIA":"' + datos[i].LICENCIA + '","NOMBRE":"' + datos[i].NOMBRE + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE] = objeto;
                        });
                        process(arrayChofer);
                    },
                    updater: function (item) {
                        $("#hfLIC_CONDUC").val(map[item].LICENCIA);
                        $("#txtLicConducir").val($("#hfLIC_CONDUC").val()).change();
                        return item;
                    },

                });
                selectinput.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"));
                    if ($("#txtchofer").val().length <= 0) {
                        $("#hfLIC_CONDUC").val('');
                        $("#txtLicConducir").val('').change();
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectinput.val(v_value);
            }
        },
        error: function (msg) {
            alertCustom('Error al intentar listar los choferes de la empresa.');
        }
    });
};

var autocompletarVehiculos = function () {
    var input = $('#txtvehiculo');
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_VEHICULOS",
        contenttype: "application/json;",
        data: { CTLG_CODE: $('#slcEmpresa').val() },
        datatype: "json",
        async: true
    }).done(function (data) {
        if (data !== null) {
            input.typeahead({
                source: function (query, process) {
                    var arrayChofer = [];
                    map = {};
                    var obj = "[";
                    for (var i = 0; i < data.length; i++) {
                        arrayChofer.push(data[i].NOMBRE);
                        obj += '{';
                        obj += '"NOMBRE":"' + data[i].NOMBRE + '", "NRO_REGISTRO" : "' + data[i].NRO_REGISTRO + '"';
                        obj += '},';
                    }
                    obj += "{}";
                    obj = obj.replace(",{}", "");
                    obj += "]";
                    var json = $.parseJSON(obj);

                    $.each(json, function (i, objeto) {
                        map[objeto.NOMBRE] = objeto;
                    });
                    process(arrayChofer);
                },
                updater: function (item) {
                    $('#txtCertificadoInscripcion').val(map[item].NRO_REGISTRO);
                    return item;
                },

            });
            input.keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"));
                if ($(this).val().trim() === '') {
                    $('#txtCertificadoInscripcion').val('');
                }
            });
        }
    }).fail(function () {
        alertCustom('Error al intentar listar los vehículos de la empresa.');
    });
};

var autocompletarEmpresaTransporte = function (v_ID, v_value) {
    var parent = $(v_ID).parents("div")[0];
    var html = parent.innerHTML;
    var input;
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=4&NICA_CODE=0006&CTLG_CODE=" + $('#slcEmpresa').val(),
        cache: false,
        beforeSend: function () { Bloquear($(parent)); },
        datatype: "json",
        async: false
    }).done(function (data) {
        $(parent).html(html);
        input = $(v_ID);
        if (data !== null) {
            input.typeahead({
                items: 20,
                source: function (query, process) {
                    var arrayEmpTrans = [];
                    map = {};

                    var obj = "[";
                    for (var i = 0; i < data.length; i++) {
                        arrayEmpTrans.push(data[i].RAZON_SOCIAL);
                        obj += '{';
                        obj += '"DNI":"' + data[i].DNI + '","RAZON_SOCIAL":"' + data[i].RAZON_SOCIAL + '","PIDM":"' + data[i].PIDM + '","RUC":"' + data[i].RUC + '","DIRECCION":"' + data[i].DIRECCION + '"';
                        obj += '},';
                    }
                    obj += "{}";
                    obj = obj.replace(",{}", "");
                    obj += "]";
                    var json = $.parseJSON(obj);

                    $.each(json, function (i, objeto) {
                        map[objeto.RAZON_SOCIAL] = objeto;
                    });

                    process(arrayEmpTrans);
                },
                updater: function (item) {
                    $("#hfDNI_EMPTRANS").val(map[item].DNI);
                    $("#hfRUC_EMPTRANS").val(map[item].RUC);
                    $("#txtPIDM_EmpresaTransporte").val(map[item].PIDM);
                    
                    if ($('#hfRUC_EMPTRANS').val() === '' || $('#hfDNI_EMPTRANS').val() === '') {
                        $('#cbotipoDoctrans').prop('disabled', true);
                    } else {
                        $('#cbotipoDoctrans').prop('disabled', false);
                    }

                    if ($('#hfRUC_EMPTRANS').val() !== '') {
                        $("#cbotipoDoctrans").val("6").change();
                    }

                    if ($('#hfDNI_EMPTRANS').val() !== '') {
                        $("#cbotipoDoctrans").val("1").change();
                    }

                    if ($('#cboTipoEnvio').val() === 'EDTR' || $('#cboTipoEnvio').val() === 'ETDT') {
                        cargarDireccionesTransportista();
                        $('#txtDireccionTransportista').prop('disabled', false);
                    } else {
                        $('#txtDireccionTransportista').prop('disabled', true);
                    }

                    return item;
                },
            });
            input.keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"));
                if ($("#txtEmpresaTransporte").val().length <= 0) {
                    $('#txtPIDM_EmpresaTransporte, #hfRUC_EMPTRANS, #hfDNI_EMPTRANS, #txtnumdocemptrans, #txtDireccionTransportista').val('');
                    $('#cbotipoDoctrans').select2('val', '').change();
                    $('#txtDireccionTransportista').select2('val', '').prop('disabled', true);
                }
            });
        }
    }).fail(function (msg) {
        alertCustom('Error al listar empresas de transporte.');
    }).complete(function () { Desbloquear($(parent)); });
};


var autocompletarEmpresaTransporteOtros = function (v_ID, v_value) {
    var parent = $(v_ID).parents("div")[0];
    var html = parent.innerHTML;
    var input;
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=PO",
        cache: false,
        beforeSend: function () { Bloquear($(parent)); },
        datatype: "json",
        async: false
    }).done(function (data) {
        $(parent).html(html);
        input = $(v_ID);
        if (data !== null) {
            input.typeahead({
                items: 20,
                source: function (query, process) {
                    var arrayEmpTrans = [];
                    map = {};

                    var obj = "[";
                    for (var i = 0; i < data.length; i++) {
                        arrayEmpTrans.push(data[i].RAZON_SOCIAL);
                        obj += '{';
                        obj += '"DNI":"' + data[i].DNI + '","RAZON_SOCIAL":"' + data[i].RAZON_SOCIAL + '","PIDM":"' + data[i].PIDM + '","RUC":"' + data[i].RUC + '","DIRECCION":"' + data[i].DIRECCION + '"';
                        obj += '},';
                    }
                    obj += "{}";
                    obj = obj.replace(",{}", "");
                    obj += "]";
                    var json = $.parseJSON(obj);

                    $.each(json, function (i, objeto) {
                        map[objeto.RAZON_SOCIAL] = objeto;
                    });

                    process(arrayEmpTrans);
                },
                updater: function (item) {
                    $("#hfDNI_EMPTRANS").val(map[item].DNI);
                    $("#hfRUC_EMPTRANS").val(map[item].RUC);
                    $("#txtPIDM_EmpresaTransporte").val(map[item].PIDM);

                    if ($('#hfRUC_EMPTRANS').val() === '' || $('#hfDNI_EMPTRANS').val() === '') {
                        $('#cbotipoDoctrans').prop('disabled', true);
                    } else {
                        $('#cbotipoDoctrans').prop('disabled', false);
                    }

                    if ($('#hfRUC_EMPTRANS').val() !== '') {
                        $("#cbotipoDoctrans").val("6").change();
                    }

                    if ($('#hfDNI_EMPTRANS').val() !== '') {
                        $("#cbotipoDoctrans").val("1").change();
                    }

                    if ($('#cboTipoEnvio').val() === 'EDTR' || $('#cboTipoEnvio').val() === 'ETDT') {
                        cargarDireccionesTransportista();
                        $('#txtDireccionTransportista').prop('disabled', false);
                    } else {
                        $('#txtDireccionTransportista').prop('disabled', true);
                    }

                    return item;
                },
            });
            input.keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"));
                if ($("#txtEmpresaTransporte").val().length <= 0) {
                    $('#txtPIDM_EmpresaTransporte, #hfRUC_EMPTRANS, #hfDNI_EMPTRANS, #txtnumdocemptrans, #txtDireccionTransportista').val('');
                    $('#cbotipoDoctrans').select2('val', '').change();
                    $('#txtDireccionTransportista').select2('val', '').prop('disabled', true);
                }
            });
        }
    }).fail(function (msg) {
        alertCustom('Error al listar empresas de transporte.');
    }).complete(function () { Desbloquear($(parent)); });
};


//DETALLES DE PRODUCTOS
var grabarDetalle = function () {
    var continuar = true;
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var stock = new Number($('#txtStock').val());

    var pos = -1, pos2 = -1;
    var valor1 = "0", valor2 = "1", cadena = "", cadena2 = "";
    a = ["txtPROD_CODE", "txtPROD_DESC", "txtcant", "txt_garantia"];

    if ($('#cboOperacion :selected').attr('data-costos-requeridos') === 'S') {
        a.push('txtmonto');
    }

    if ($("#rbSalida").is(":checked") || $('#rbTSalida').is(':checked')) {
        a.push('txtCentroCostos');
    }

    if ($('#hfTIPO_INSERT').val() === "CORRELATIVO") {
        a.push('txt_num_inicio');
        for (var i = 0; i < $("#txt_num_inicio").val().length; i++) {
            var b = $("#txt_num_inicio").val().substring(i, i + 1)
            if ($.inArray(b, letras) != -1) {
                pos = i;
            }
        }
        for (var i = 0; i < $("#txt_num_fin").val().length; i++) {
            var b = $("#txt_num_fin").val().substring(i, i + 1)
            if ($.inArray(b, letras) != -1) {
                pos2 = i;
            }
        }

        if (pos >= 0) {
            valor1 = $("#txt_num_inicio").val().substring(pos + 1);
            cadena = $("#txt_num_inicio").val().substring(0, pos + 1);
        }
        else {
            valor1 = $("#txt_num_inicio").val();
        }

        if (pos2 >= 0) {
            valor2 = $("#txt_num_fin").val().substring(pos2 + 1);
            cadena2 = $("#txt_num_fin").val().substring(0, pos2 + 1);
        }
        else {
            valor2 = $("#txt_num_fin").val();
        }
    } else if ($('#hfTIPO_INSERT').val() === "SECUENCIAL") {
        a.push('txtSerie');
    } else if ($('#hfTIPO_INSERT').val() === "LISTA") {
        a.push('cboBuscar');
    } else if ($('#hfTIPO_INSERT').val() == "" && prodSeriado == 'S') {//DPORTA
        continuar = false;
    }

    if (continuar) {
        if (valor2 == '') {
            valor2 = valor1;
            val_fin = $("#txt_num_fin").val();
            cadena2 = cadena;
        }

        var codigos_productos = $('#tabla_det').DataTable().column(2).data().toArray();
        var page = $('#tabla_det').DataTable().page();

        var filas = ($('#hfTIPO_APLI_VALORES').val() === 'E') ? (1 + $('#tabla_det').DataTable().column(0).data().toArray().length) : (parseInt($('#txtcant').val()) + $('#tabla_det').DataTable().column(0).data().toArray().length);
        var filas_permitidas = (parseInt($('#txtLineasRegistro').val()) > parseInt($('#txtLineasRegistroInterno').val())) ? parseInt($('#txtLineasRegistro').val()) : parseInt($('#txtLineasRegistroInterno').val());

        var agregar = ($('#cboRegistro :selected').attr('data-tipo-doc') === 'INTERNO' || $('#rbEntrada').is(':checked') || $('#rbTEntrada').is(':checked')) ? true : filas < filas_permitidas;
        var cant = $('#txtcant').val();
        var peso = $('#txtKU').val();
        var peso_total = parseFloat(cant) * parseFloat(peso);

        if (vErrors(a)) {
            if ($('#txtmonto').val() != 0) {
                if (agregar) {
                    var cantN = new Number($("#txtcant").val());
                    if (cadena === cadena2) {
                        //if (codigos_productos.indexOf($('#txtPROD_CODE').val()) > -1) {
                        //    infoCustom2('Acaba de agregar un producto que ya se encuentra en la lista. Costo se promedió.');
                        //}
                        var hayStock = (cantN <= stock);
                        if (!($('#rbSalida').is(':checked')) && !($('#rbTSalida').is(':checked'))) { hayStock = true; }
                        if (hayStock) {
                            //Bloquear("ventana");

                            var data = new FormData();
                            data.append('CODE_PROD', $("#hfCOD_PROD").val());
                            data.append('CODE_PROD_ANTIGUO', $('#txtPROD_CODE').val());
                            data.append('CODE_UME', $("#cboUniMedida").val());
                            data.append('CANT', (($('#hfTIPO_APLI_VALORES').val() !== 'E') ? '1' : $('#txtcant').val()));
                            data.append('MONTO', ($("#txtmonto").val() === '') ? '0' : $("#txtmonto").val());
                            data.append('GARANTIA', $("#txt_garantia").val());
                            data.append('IGV_IND', $("#chkincluyeIGV").is(":checked") ? 'S' : 'N');
                            data.append('USUA_ID', $('#ctl00_txtus').val());
                            data.append('ISAC_CODE', $("#hfCOD_DCTO_ALMC").val());
                            data.append('DCTO_REQ', $("#hfNumDocOrigen").val());
                            data.append('COD_ALMC', $("#cboAlmacen").val());
                            data.append('DESD_COMPRA_IND', $("#chk_desde_compra").is(":checked") ? 'S' : 'N');
                            data.append('TIPO_INSERT', $('#hfTIPO_INSERT').val());
                            data.append('VAL_INI', $("#txt_num_inicio").val());
                            data.append('VAL_FIN', $("#txt_num_fin").val());
                            data.append('MONEDA', $("#cboMoneda").val());
                            data.append('SERIE_PROD', $("#txtSerie").val());
                            // data.append('CODE_CENTRO_COSTO', $('#hfCENTRO_COSTOS').val());
                            data.append('CODE_CECC', $('#hfCECC_CODE').val());
                            data.append('APLIC_VALORES', $('#hfTIPO_APLI_VALORES').val());
                            data.append('DETRACCION', $('#hfDETRACCION').val());
                            data.append('MONTO_MAS_COSTO_TRANSPORTE', $('#hfCOSTO_CON_FLETE').val());
                            data.append('PESO_UNIT', peso);
                            data.append('PESO_TOTAL', peso_total);

                            var p_CECC = "";
                            var p_CECD = "";

                            if ($("#txtCentroCostos").val() !== "" || $("#txtCentroCostos").val().length !== 0) {
                                p_CECC = $("#txtCentroCostos").data("CodCentroCostoCab");
                                p_CECD = $("#txtCentroCostos").data("CodCentroCosto");
                            }

                            data.append('p_CECC', p_CECC == undefined ? $("#hfCECC_CODE").val() : p_CECC);
                            data.append('p_CECD', p_CECD == undefined ? $("#hfCENTRO_COSTOS").val() : p_CECD);


                            var jqxhr = $.ajax({
                                type: "POST",
                                url: "vistas/na/ajax/naminsa.ashx?OPCION=GD",
                                contentType: false,
                                data: data,
                                processData: false,
                                cache: false
                            }).done(function (datos) {
                                if (datos[0].MENSAJE == "Transaccion terminada: registros aplicados y guardados. ") {
                                    $("#txtPROD_CODE, #hfCOD_PROD, #hfSERIE_PROD, #txtPROD_DESC, #txtcant, #txtCentroCostos, #txt_garantia, #hfTIPO_INSERT, #hfCENTRO_COSTOS, #hfCECC_CODE, #hfTIPO_APLI_VALORES, #txtmonto, #txtStock, #txt_num_inicio, #txt_num_fin, #txt_serie_add, #txtPU, #txtKU").val('');
                                    if ($('#txtCodigoDctoOrigen_0').val() === '') {
                                        $("#txtcant").prop("disabled", false);
                                    }
                                    $("#cboUniMedida").select2('val', '');
                                    $('#cboUniMedida').attr("disabled", true);
                                    $('#uniform-chkincluyeIGV span').removeClass();
                                    $('#uniform-chk_desde_compra span').removeClass();
                                    $('#chkincluyeIGV, #chk_desde_compra').prop('checked', false);

                                    //INICIO FIN
                                    $("#txtSerie").tagsinput("removeAll");
                                    $("#cboCorrelativo").select2("val", "C").change();
                                    $("#div_vie_camp_seriados").css("display", "none");
                                    $('#txtPROD_CODE').focus();
                                    $('#cboCorrelativo').select2('val', '').change();
                                    $("#txtcant").val('');
                                    exito();
                                    listarDetalles();
                                    $('#tabla_det').DataTable().page(page).draw(false);
                                    autocompletarCentroCostos(prmtCCST);
                                } else {
                                    alertCustom(datos[0].MENSAJE);
                                }
                                //Desbloquear("ventana");

                            }).fail(function (msg) {
                                Desbloquear("ventana");
                                noexito();
                                alertCustom('Ocurrió un error al intentar agregar el detalle.');
                            });
                        } else { alertCustom('La cantidad debe ser menor o igual al Stock si se está registrando una Operación en Salida'); }
                    } else { alertCustom("Las series deben ser iguales"); }
                } else { alertCustom('Los documentos de registro y registro interno permiten sólo ' + filas_permitidas + ' líneas por documento.'); }
            } else { infoCustom2('El Costo Unit. del producto no debe ser 0'); }
        }
    } else {
        alertCustom("El producto no se pudo agregar porque no tiene una serie seleccionada.");
    }
    
}

var cancelarDetalle = function () {
    $("#hfCOD_PROD, #txtPROD_CODE,#txtPROD_DESC, #hfSERIE_PROD, #txtcant").val("");
    $("#txtcant").prop("disabled", false);
    $("#txtCentroCostos, #hfTIPO_INSERT, #hfCENTRO_COSTOS, #hfCECC_CODE, #hfTIPO_APLI_VALORES, #txtmonto").val("");
    $("#txt_garantia").val("0");
    $("#cboUniMedida").select2("val", "").change();

    $('#uniform-chkincluyeIGV span').removeClass();
    $('#chkincluyeIGV').prop('checked', false);
    $('#uniform-chk_desde_compra span').removeClass();
    $('#chk_desde_compra').prop('checked', false);

    //INICIO FIN
    $("#txt_num_inicio").val("");
    $("#txtSerie").tagsinput("removeAll");
    $("#txt_num_fin").val("");
    $("#cboCorrelativo").select2("val", "COR");
    $("#cboCorrelativo").change();
    $("#txt_serie_add").val("");
    $("#div_vie_camp_seriados").css("display", "none");

}

var listarDetalles = function () {
    var page = $('#tabla_det').DataTable().page();
    var mostrar = $('#tabla_det_rppag').val();
    mostrar = (mostrar === undefined) ? '5' : mostrar;
    $('#tabla_det').DataTable().destroy();
    var tabla_det = $('#tabla_det').dataTable({
        order: [[1, "asc"]],
        ajax: {
            type: "POST",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=14",
            data: { ISAC_CODE: ObtenerQueryString('codigo'), CBOOPERACION: $('#cboOperacion').val() },
            async: false,
            dataSrc: '',

        },
        columns: [
            { data: null, defaultContent: '<div class="checker"><span><input type="checkbox" class="chkFila" style="opacity: 0;"></span></div>', width: '5%', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
            { data: 'NRO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '5%' },
            { data: 'PRODUCTO', width: '10%' },
            { data: 'DESC_PRODUCTO', width: '30%' },
            {
                data: 'NRO_SERIE', createdCell: function (cell, cellData, row) {
                    $(cell).css('text-align', 'center').attr('PROD_CODE', row.PROD_CODE).attr('id', row.ITEM);
                    $(cell).dblclick(function () {
                        $('#btnCompletar').data('SERIADO_IND', row.SERIADO_IND);
                    });
                }, width: '10%'
            },
            { data: 'CENTRO_COSTO', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center').attr('id', row.ITEM); }, width: '10%' },
            { data: 'GARANTIA', createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center').attr('id', row.ITEM); }, width: '7%' },
            {
                data: 'CANTIDAD_BASE', createdCell: function (cell, cellData, row) {
                    $(cell).css('text-align', 'right').attr('PROD_CODE', row.PROD_CODE).attr('id', row.ITEM);
                    $(cell).dblclick(function () {
                        $('#btnCompletar').data('SERIADO_IND', row.SERIADO_IND);
                    });
                }, width: '6%'
            },
            { data: 'DESC_UNME_BASE', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '15%' },
            { data: 'PESO_UNIT', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '15%' },//PESO UNIT
            { data: 'PESO_TOTAL', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '15%' },//PESO TOTAL
            {
                data: 'MONTO', createdCell: function (cell, cellData, row) {
                    $(cell).css('text-align', 'right').attr('id', row.ITEM).text(parseFloat(cellData).toFixed(prmtDIGI));
                }, width: '9%'
            },
            {
                data: 'MONTO_COSTO_TRANSPORTE', createdCell: function (cell, cellData, row) {
                    $(cell).css('text-align', 'right').attr('id', row.ITEM).text(parseFloat(cellData).toFixed(prmtDIGI));
                }, width: '9%'
            },
            {
                data: 'TOTAL', createdCell: function (cell, cellData) {
                    $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                }, width: '9%'
            },
            {
                data: 'MONTO_ALTERNO', createdCell: function (cell, cellData, row) {
                    $(cell).css('text-align', 'right').attr('id', row.ITEM).text(parseFloat(cellData).toFixed(prmtDIGI));
                }, width: '9%'
            },
            {
                data: 'TOTAL_ALTERNO', createdCell: function (cell, cellData) {
                    $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                }, width: '9%'
            },
            { data: 'INC_IGV', createdCell: function (cell) { $(cell).css('text-align', 'center'); }, width: '5%' },
            { data: 'TIPO_PRODUCTO', visible: false , createdCell: function (cell, cellData, row) { $(cell).css('text-align', 'center').attr('id', row.ITEM); }, width: '8%' },
            { data: 'SERIADO_IND', visible: false }    
            
        ]
    });

    $($("#tabla_det_wrapper .span6")[0]).append(`  <div class="span6">
                                            <div class="control-group">
                                                <div class="controls">
                                                    <button class="btn green" id="btnLibroXls" type="button"><i class="fa fa-file-excel-o"></i>&nbsp;Exportar a Excel</button>
                                                </div>
                                            </div>
                                        </div>`);


    $("#btnLibroXls").click(function () {
        let sTipoMov = $.trim($("input:radio[name=movAlmacen]:checked").parents("label.radio").text());
        let nro_doc = $("#cboOrigen :selected").text() + " " + $("#txtSerieDctoOrigen_0").val().toString() + "-" + $("#txtNroDctoOrigen_0").val().toString();

        exportTable2Excel("tabla_det", "Detalle " + sTipoMov + " " + nro_doc);
    });

    var flujo = ($("#rbEntrada").is(':checked') ? 'I' : $("#rbSalida").is(':checked') ? 'S' : $("#rbTEntrada").is(':checked') ? 'TI' : $("#rbTSalida").is(':checked') ? 'TS' : '');
    if (flujo === 'S') {
        tabla_det.makeEditable({
            sUpdateURL: "vistas/na/ajax/naminsa.ashx?OPCION=24&ISAC_CODE=" + ObtenerQueryString('codigo'),
            aoColumns: [null, null, null, null,
                {
                    cssclass: 'span12',
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para seleccionar serie.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'select',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    data: function () {
                        var PROD_CODE = $(this).attr('prod_code');
                        var fuente = '';
                        $.ajax({
                            url: 'vistas/NA/ajax/NAMINSA.ashx?OPCION=SERIES_SELECT',
                            async: false,
                            data: { PROD_CODE: PROD_CODE, CTLG_CODE: $('#slcEmpresa').val(), COD_ALMC: $('#cboAlmacen').val(), SERIES_SELECCIONADAS: $('#tabla_det').DataTable().column(3).data().toArray().toString().concat(',') }
                        }).done(function (data) {
                            if (data === '') infoCustom2('No se encontraron números de serie para este producto.');

                            if (data != '') {

                                var obj = "";
                                var jsonData = JSON.parse(data);
                                var filas = $('#tabla_det').dataTable().fnGetData();
                                obj += '{';
                                $.each(jsonData, function (index, valor) {
                                    var existe = -1;
                                    for (var i = 0; i < filas.length; i++) {
                                        if (typeof filas[i].NRO_SERIE != "undefined") {
                                            //VALIDA QUE DATO NO SE REPITA 
                                            if (valor == filas[i].NRO_SERIE) {
                                                //YA EXISTE 
                                                existe = i;
                                                break;
                                            }
                                        }
                                    }
                                    if (existe == -1) {
                                        obj += '"' + valor + '":"' + valor + '",';
                                    }
                                });
                                obj += "{}";
                                obj = obj.replace(",{}", "");
                                obj += '}';

                                data = obj;
                            }

                            fuente = (data === '') ? null : data;
                        }).fail(function (msg) {
                            alertCustom('Error al listar las series del producto.');
                        });
                        //TO DO SOLO LISTAR SERIADOS NO AGREGADOS EN LISTA
                        return fuente;
                    },
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            if ($('#btnCompletar').data('SERIADO_IND') === 'N') {
                                infoCustom2('La serie es sólo para productos seriados.');
                            } else { exito(); }
                        }, 10);
                    }
                },
                {
                    cssclass: 'required span12',
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para seleccionar el centro de costos.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'select',
                    data: function () {
                        var fuente = '';
                        $.ajax({
                            url: 'vistas/NA/ajax/NAMINSA.ashx?OPCION=COSTOS_SELECT',
                            async: false,
                            data: { CTLG_CODE: $('#slcEmpresa').val() }
                        }).success(function (data) {
                            if (data === '') infoCustom2('Configure la estructura de costos activa.');
                            fuente = (data === '') ? null : data;
                        }).error(function (msg) {
                            alertCustom('Error al listar las series del producto.');
                        });
                        return fuente;
                    },
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                },
                {
                    cssclass: "required number span10",
                    oValidationOptions: { rules: { value: { maxlength: 3 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar los meses de garantía.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                },
                {
                    cssclass: "required number span10",
                    oValidationOptions: { rules: { value: { maxlength: 10 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar la cantidad.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            if ($('#btnCompletar').data('SERIADO_IND') === 'S') {
                                infoCustom2('La cantidad de productos seriados es siempre 1.');
                            } else { exito(); }
                        }, 10);
                    }
                }, null, null, null,
                {
                    cssclass: "required span10",
                    oValidationOptions: { rules: { value: { maxlength: 10 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar costo unitario en soles.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                }, null,
                {
                    cssclass: "required span10",
                    oValidationOptions: { rules: { value: { maxlength: 10 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar costo unitario en dolares.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                }
            ]

        });
    } else if (flujo === 'I') {
        tabla_det.makeEditable({
            sUpdateURL: "vistas/na/ajax/naminsa.ashx?OPCION=24&ISAC_CODE=" + ObtenerQueryString('codigo') + "&VALIDAR_EXISTENTE=S",
            aoColumns: [null, null, null, null,
                {
                    cssclass: 'span12',
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para ingresar serie.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {

                        setTimeout(function () {
                            listarDetalles();
                            if ($('#btnCompletar').data('SERIADO_IND') === 'N') {
                                infoCustom2('La serie es sólo para productos seriados.');
                            } else {
                                if (sValue != "La serie ingresada ya existe" && sValue != "La serie ingresada ya se encuentra en la lista") {
                                    exito();
                                }
                            }
                        }, 10);
                    }
                }, {
                    cssclass: 'required span12',
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para seleccionar el centro de costos.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'select',
                    data: function () {
                        var fuente = '';
                        $.ajax({
                            url: 'vistas/NA/ajax/NAMINSA.ashx?OPCION=COSTOS_SELECT',
                            async: false,
                            data: { CTLG_CODE: $('#slcEmpresa').val() }
                        }).success(function (data) {
                            if (data === '') infoCustom2('Configure la estructura de costos activa.');
                            fuente = (data === '') ? null : data;
                        }).error(function (msg) {
                            alertCustom('Error al listar las series del producto.');
                        });
                        return fuente;
                    },
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                },
                {
                    cssclass: "required number span10",
                    oValidationOptions: { rules: { value: { maxlength: 3 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar los meses de garantía.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                },
                {
                    cssclass: "required number span10",
                    oValidationOptions: { rules: { value: { maxlength: 10 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar la cantidad.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            if ($('#btnCompletar').data('SERIADO_IND') === 'S') {
                                infoCustom2('La cantidad de productos seriados es siempre 1.');
                            } else { exito(); }
                        }, 10);
                    }
                }, null, null, null,
                {
                    cssclass: "required span10",
                    oValidationOptions: { rules: { value: { maxlength: 10 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar la cantidad.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                }, null,
                {
                    cssclass: "required span10",
                    oValidationOptions: { rules: { value: { maxlength: 10 } } },
                    indicator: '<img src="../../recursos/img/loading.gif" height="16"/>',
                    tooltip: 'Doble click para cambiar la cantidad.',
                    loadtext: '<img src="../../recursos/img/loading.gif" height="16" />',
                    type: 'text',
                    style: 'margin: 0px; text-align: center; padding: 3px',
                    onblur: 'submit',
                    fnOnCellUpdated: function (sStatus, sValue, settings) {
                        setTimeout(function () {
                            listarDetalles();
                            exito();
                        }, 10);
                    }
                }
            ]
        });
    }
    if ($('#tabla_det').DataTable().data().length > 0 && $('#txtAPROBADO_IND').val() === 'S') {

        if ($('#txtNroDctoOrigen_0').val() != "") {
            $("#btnCompletar a").css("display", "inline-block");
        } else {
            $("#btnCompletar a").css("display", "none");
        }

        
        $('#btnImprimirGuia').css('display', 'none');
    }
    $('#tabla_det_rppag').val(mostrar).change();
    $('#tabla_det').DataTable().page(page).draw(false);

    $('#tabla_det tbody').unbind('click');
    $('#tabla_det tbody').on('click', 'input[type=checkbox]', function () {
        $(this).parents('tr').toggleClass('seleccionado');
        $(this).parent().toggleClass('checked');
        var eliminar = $('#tabla_det').DataTable().rows('.seleccionado').data().toArray().length <= 0
        $('#btnEliminarDetalles').prop('disabled', eliminar);
    });
}

var listarDetallesCompletado = function () {
    $("#btnCompletar a").css("display", "none");
    $('#tabla_det').DataTable().destroy();
    $.ajax({
        type: "POST",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=14&ISAC_CODE=" + $.trim($('#hfCOD_DCTO_ALMC').val() + "&IND=C"),
        async: false
    }).done(function (datos) {
        if (datos !== "No se encontraron datos!!!") {

            if ($("#rbSalida").is(':checked') || $("#rbTSalida").is(':checked') || ($("#rbEntrada").is(':checked') && $("#cboOperacion").val() == '0002' && $("#txtSerieDctoRegistro").val().substring(0,2) == 'TE')) {
                if ($("#cboRegistro").val() == "0009") {
                    json_datos_imp = datos;
                    $('#btnImprimirGuia').css('display', 'inline');
                }
            }
            $('#tabla_det').dataTable({
                info: false,
                order: [[0, "asc"]],
                data: datos,
                columns: [
                    { data: 'ITEM', visible: false },
                    { data: 'NRO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '5%' },
                    { data: 'PRODUCTO' },
                    { data: 'DESC_PRODUCTO' },
                    { data: 'NRO_SERIE', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                    { data: 'CENTRO_COSTO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'GARANTIA', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'CANTIDAD_BASE', createdCell: function (cell) { $(cell).css('text-align', 'right') } },
                    { data: 'DESC_UNME_BASE', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'PESO_UNIT', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'PESO_TOTAL', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    {
                        data: 'MONTO', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI)); 
                        }, width: '15%'
                    },
                    {
                        data: 'MONTO_COSTO_TRANSPORTE', createdCell: function (cell, cellData, row) {
                            $(cell).css('text-align', 'right').attr('id', row.ITEM).text(parseFloat(cellData).toFixed(prmtDIGI));
                        }, width: '10%'
                    },
                    {
                        data: 'TOTAL', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI))
                        }, width: '15%'
                    },
                    {
                        data: 'MONTO_ALTERNO', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                        }, width: '15%'
                    },
                    {
                        data: 'TOTAL_ALTERNO', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                        }, width: '15%'
                    },
                    { data: 'INC_IGV', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '5%' },
                    { data: 'DCTO_ORGN_CODE', visible: false },
                    { data: 'SERIADO_IND', visible: false }
                ]
            });
            $('#tblImpresion').DataTable({
                info: false,
                order: [[0, "asc"]],
                data: datos,
                columns: [
                    { data: 'NRO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '5%' },
                    { data: 'PRODUCTO' },
                    { data: 'DESC_PRODUCTO' },
                    { data: 'NRO_SERIE', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                    { data: 'CENTRO_COSTO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'GARANTIA', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'CANTIDAD_BASE', createdCell: function (cell) { $(cell).css('text-align', 'right') } },
                    { data: 'DESC_UNME_BASE', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'PESO_UNIT', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    { data: 'PESO_TOTAL', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                    {
                        data: 'MONTO', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                        }, width: '12%'
                    },
                    {
                        data: 'MONTO_COSTO_TRANSPORTE', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                        }, width: '10%'
                    },
                    {
                        data: 'TOTAL', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI))
                        }, width: '12%'
                    },
                    {
                        data: 'MONTO_ALTERNO', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                        }, width: '12%'
                    },
                    {
                        data: 'TOTAL_ALTERNO', createdCell: function (cell, cellData) {
                            $(cell).css('text-align', 'right').text(parseFloat(cellData).toFixed(prmtDIGI));
                        }, width: '12%'
                    },
                    { data: 'INC_IGV', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '5%' },
                ]
            });
        }
    }).fail(function (msg) {
        alertCustom('No se pudo listar la tabla de detalles de los productos del presente documento. Reintente actualizando la página.');
    });
}

var listarTotales = function (codigo_naminsa) {
    
    //Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/NA/ajax/NAMINSA.ashx?OPCION=TOTALES_DOC&p_CODIGO_NAM=" + codigo_naminsa,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            //Desbloquear("ventana");
            //aoDoc = datos;

            $("#lblValorizadoTotal").html(datos[0].COSTO_TOTAL);
            $("#lblPesoTotal").html(datos[0].PESO_TOTAL);
            $('#divValorizadoTotal').css('display', 'inline');
        },
        error: function (msg) {
            //Desbloquear("ventana");
            noexitoCustom("No se cargó correctamente los totales.");
        }
    });
    //Desbloquear("ventana");
}

// 
var bloquearElementos = function () {
    $("#btnCompletar a").css("display", "none");
    $("#cboOperacion, #cboAlmacenTransferencia, #txtDireccionTransferencia, #txtRazonSocial, #txtNumDctoAlmc, #cboAlmacen").attr("disabled", true);
    $("#slcEmpresa, #txtEmision, #txtTransaccion, #txtTransaccion2, #rbEntrada, #rbSalida").attr("disabled", true);
    $("#rbTEntrada, #rbTSalida, #txtSolicitante, #txtEntregar, #txtLicConducir").attr("disabled", true);
    $("#txtCertificadoInscripcion, #txtvehiculo, #cboTipoEnvio, #txtchofer, #txtGlosa, #txtDireccionOrigen").attr("disabled", true);
    $("#txtnumdocemptrans, #txtsecuencia, #txtEmpresaTransporte, #cboRegistro, #cboOrigen").attr("disabled", true);
    $("#txtNroDcto, #cboTipoDcto, #cbotipoDoctrans, #txtSerieDctoOrigen_0, #txtNroDctoRegistro").attr("disabled", true);
    $("#txtNroDctoOrigen_0, #txtSerieDctoRegistro, #rdPublico, #rdPrivado,#rdOtro,#txtNroVueltas").attr("disabled", true);
    $("#grabar").attr("disabled", true);
    $("#txtCostoTransporte").attr("disabled", true);
    $("#grabar").off();

    $("#btnAgregarDctoOrigen, #btnBuscarDctoOrigen, #btnVerEmpleado, #btnVerEmpleado2, #btnveremp, #btnVerEmpresaTransporte, #acciones_generales").attr("style", "display:none");

    $("#fila_8, #fila_7, #fila_6, #fila_5, #fila_4, #fila_3, #fila_2").attr("style", "display:none");
    if ($("#txtNroDctoOrigen_0").val() != "") {
        $("#btnVerDetallesOrigen_3").parent().parent().removeClass("hidden");
    }

    $('.txtNroDctoOrigen, .txtSerieDctoOrigen').prop('disabled', true);

    $("#chkdirNoexis").parent().parent().parent().remove()
};

var Cancelar = function () {
    window.location.href = '?f=naminsa';
};

var generarImpresion = function () {
    tipo_mov = $("#rbEntrada").is(':checked') ? 'ENTRADA' : $("#rbSalida").is(':checked') ? 'SALIDA' : $("#rbTEntrada").is(':checked') ? 'TRANSF. ENTRADA' : $("#rbTSalida").is(':checked') ? 'TRANSF. SALIDA' : '';
    aux = $("#rbEntrada").is(':checked') || $("#rbTEntrada").is(':checked') ? 'ORIGEN' : $("#rbSalida").is(':checked') || $("#rbTSalida").is(':checked') ? 'DESTINO' : '';
    $('#desc_operacion').text(tipo_mov + ' EN ' + $('#cboAlmacen :selected').text() + ' POR ' + $('#cboOperacion :selected').text() + ' SECUENCIA ' + $('#txtsecuencia').val());
    $('#fecha_emision').text($('#txtEmision').val());
    $('#fecha_transaccion').text($('#txtTransaccion').val());
    $('#solicitante').text($('#txtSolicitante').val());
    $('#receptor').text($('#txtEntregar').val());
    $('#origen_destino_label').html(aux + ':&nbsp;');
    $('#origen_destino_nombre').text($('#txtRazonSocial').val());
    $('#tipo_dcto').text($('#cboTipoDcto :selected').text() + ' ');
    $('#nro_dcto').text($('#txtNroDcto').val());
    $('#dcto_registro').text($('#cboRegistro :selected').text() + ' ' + $('#txtSerieDctoRegistro').val() + '-' + $('#txtNroDctoRegistro').val());
    $('#glosa').text($('#txtGlosa').val());
    $('#nombre_dcto_reg_interno').text($('#cboRegistroInterno :selected').text());
    $('#nro_dcto_reg_interno').text($('#txtSerieRegistroInterno').val() + '-' + $('#txtNroRegistroInterno').val());
    $('#tblImpresion').DataTable().destroy();
};

validar_sn = true;

var ValidarSerieNumeroEmpresa = function (pidmempresa, TipoDoc, SerieDoc, numDoc, indi_mesg, isac_code) {

    var data = new FormData();
    var arraY = ["hfPIDM", "cboRegistro", "txtNroDctoRegistro", "txtSerieDctoRegistro"];
    data.append("RAZON_DEST", pidmempresa);
    data.append("TIP_DCTO", TipoDoc);
    data.append("DCTO_ORGN_SERIE", SerieDoc);
    data.append("DCTO_ORGN", numDoc);
    data.append("ISAC_CODE", isac_code);

    if (indi_mesg) {
        if (vCamposO(arraY)) {

            //Bloquear("ventana");
            $.ajax({
                url: "vistas/na/ajax/naminsa.ashx?OPCION=VL_SERIE_DOC",
                type: "post",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false,
                success: function (datos) {
                    datos = JSON.parse(datos);
                    if (datos != null && datos != "") {
                        if (datos[0].NRO_DOC == 'NO EXISTE') {
                            if (indi_mesg) {
                                infoCustom2("El NUMERO DE DOCUMENTO ES VALIDO.....!")
                                //Desbloquear("ventana");
                            } else {
                                //Desbloquear("ventana");
                            }
                            validar_sn = true;
                        } else {
                            infoCustom2("EL NUMERO DE DOCUMENTO YA FUE REGISTRADO...!")
                            //Desbloquear("ventana");
                            $("#txtdoc_ser").pulsate({ color: "#33AECD", repeat: 5, glow: true, reach: 20 });
                            validar_sn = false;
                        }
                    }
                },
                error: function (msg) {
                    //Desbloquear("ventana");
                    noexitoCustom("Error al Listado!")
                }
            });
        }
    } else {
        $.ajax({
            url: "vistas/na/ajax/naminsa.ashx?OPCION=VL_SERIE_DOC",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {
                datos = JSON.parse(datos);
                if (datos != null && datos != "") {
                    if (datos[0].NRO_DOC == 'NO EXISTE') {
                        validar_sn = true;
                    } else {
                        infoCustom2("EL NUMERO DE DOCUMENTO YA FUE REGISTRADO...!")
                        //Desbloquear("ventana");
                        $("#txtdoc_ser").pulsate({ color: "#33AECD", repeat: 5, glow: true, reach: 20 });
                        validar_sn = false;
                    }
                }
            },
            error: function (msg) {
                noexitoCustom("Error al Listado!")
            }
        });
    }
};

//TRANSACCIONES

var Grabar = function () {
    var a = ['slcEmpresa', 'cboAlmacen', 'cboOperacion', 'txtSolicitante', 'txtEntregar', 'txtEmision', 'txtTransaccion', 'cboMoneda', 'cboRegistroInterno', 'txtSerieRegistroInterno', 'txtNroRegistroInterno', 'txtCostoTransporte'];

    var dcto_origen = $('#cboOrigen').val();
    var serie_origen = $('#txtSerieDctoOrigen_0').val();
    var nro_origen = $('#txtNroDctoOrigen_0').val();

    var dcto_registro = $('#cboRegistro').val();
    var serie_registro = $('#txtSerieDctoRegistro').val();
    var nro_registro = $('#txtNroDctoRegistro').val();
    //if ($("#hfPIDM").val() != "") {
    //    var res = validarDctoRegistro('NAMINSA' + $('#slcEmpresa').val() + '-' + serie_registro, nro_registro, $("#hfPIDM").val(), dcto_registro); //DPORTA
    //} else {
        var res = true;
    //} 
    
    if (res) {
        if (dcto_origen === dcto_registro) {
            if (serie_origen !== serie_registro) {
                infoCustom2("El número de serie de origen debe ser el mismo que el documento de registro.");
                $('#txtSerieDctoRegistro').focus();
                return;
            } else if (nro_origen !== nro_registro) {
                infoCustom2("El número de documento de origen debe ser el mismo que el documento de registro.");
                $('#txtNroDctoRegistro').focus();
                return;
            }
        }

        //HACER OBLIGATORIO TENER UNA LINEA DE CREDITO PARA PODER REALIZAR SALIDAS POR VENTA NACIONAL
        if ($("#rbSalida").is(':checked') && $("#cboOperacion").val() == "0001") { //0001: VENTA NACIONAL
            if (dcto_origen == "NINGUNO") {//UNICAMENTE PARA SALIDAS QUE NO TIENEN DOCUMENTO DE ORIGEN Y QUE LUEGO SE VAN A PROCESAR EN LA PANTALLA DE VENTA
                CargarDatosLineaCredito($("#hfPIDM").val());
                if (datosLineaCredito.length > 0) {
                    if (parseFloat(datosLineaCredito[0].ACTUAL) > 0) {
                        console.log("ok")
                    } else {
                        /*a.push("cboOrigen");
                        a.push("txtSerieDctoOrigen_0");
                        a.push("txtNroDctoOrigen_0");*/
                        alertCustom("El cliente seleccionado no tiene linea de crédito para realizar esta operación.");
                        return;
                    }
                }
            }            
        }

        if ($('#hfSIN_DESTINO').val() === 'NO') {
            a.splice(-1, 0, 'txtRazonSocial', 'txtNroDcto', 'cboTipoDcto');
            if ($('#rbTEntrada').is(':checked') || $('#rbTSalida').is(':checked')) { a.splice(-1, 0, 'cboAlmacenTransferencia', 'txtDireccionTransferencia'); }
            else {
                if ($('#chkdirNoexis').is(':checked')) { a.push('txtDireccionOrigen2'); }
                else { a.push('txtDireccionOrigen'); }

            }
        }

        if ($('#hfSIN_TRANSPORTE').val() === 'NO') { a.push('txtEmpresaTransporte'); }

        if ($('#cboTipoEnvio').val() !== '') {
            var tipoEnvio = $('#cboTipoEnvio').val();
            if (tipoEnvio === 'EDTR' || tipoEnvio === 'ETDT') { a.push('txtDireccionTransportista'); }
        }

        if ($('#divRegistro').css('display') !== 'none') { a.splice(-1, 0, 'cboRegistro', 'txtSerieDctoRegistro', 'txtNroDctoRegistro'); }

        if ($('#tipoEnvio').val() === 'EDTR' || $('#tipoenvio').val() === 'ETDT') { a.push('txtDireccionTransportista'); }


        if ($('#cboOrigen').val() !== 'NINGUNO') {
            a.push('txtNroDctoOrigen_0');
        }

        var i = 0;

        if (vErrors(a)) {
            Bloquear("generales");
            setTimeout(function () {
                var dni = $('#hfDNI').val();
                var ruc = $('#hfRUC').val();
                var dni_emp_trans = $('#hfDNI_EMPTRANS').val();
                var ruc_emp_trans = $('#hfRUC_EMPTRANS').val();
                var razonsocial = $("#txtRazonSocial").val();
                var nrodoc = $("#txtNroDcto").val();
                var NumdocEMptrans = $("#txtnumdocemptrans").val();
                var tipodoc2 = $("#cbotipoDoctrans").val();

                var arrayDivs = $("#prueba").children();
                var tamaño = arrayDivs.length;
                var num = "";
                var num_serie = "";
                var codigo_doc = "";
                for (i = 0; i < tamaño; i++) {
                    var child = arrayDivs[i];
                    var n = $(child).find('.txtNroDctoOrigen').val();
                    num += n + ',';
                    var s = $(child).find('.txtSerieDctoOrigen').val();
                    num_serie += s + ",";
                    var cd = $(child).find('.txtCodigoDctoOrigen').val();
                    codigo_doc += cd + ',';
                }
                num += "}";
                num_serie += "}";
                codigo_doc += "}";
                var NumDocOrigen = num.replace(",}", "");
                var NumserieDocOrigen = num_serie.replace(",}", "");
                codigo_doc = codigo_doc.replace(',}', '');

                var data = new FormData();
                data.append('CTLG_CODE', $("#slcEmpresa").val());
                data.append('COD_ALMC', $('#cboAlmacen').val());
                data.append('FEC_EMISION', $("#txtEmision").val());
                data.append('FEC_TRANS', $("#txtTransaccion").val());
                data.append('DCTO_REG', ((NumDocOrigen === undefined) ? '' : NumDocOrigen));
                data.append('SERIE_DCTO', ((NumserieDocOrigen === undefined) ? '' : NumserieDocOrigen));
                data.append('PIDM_SOLICITANTE', $('#txtPIDM_Solicitante').val());

                data.append('DCTO_ORGN', $("#txtNroDctoRegistro").val());
                data.append('DCTO_ORGN_SERIE', $("#txtSerieDctoRegistro").val());
                data.append('TIPO_MOV', $("#rbEntrada").is(':checked') ? 'I' : $("#rbSalida").is(':checked') ? 'S' : $("#rbTEntrada").is(':checked') ? 'TI' : $("#rbTSalida").is(':checked') ? 'TS' : '');
                data.append('PIDM_ENTREGAR_A', $('#txtPIDM_Entregar').val());
                data.append('TIPO_OPE', $("#cboOperacion").val());
                //Validacion para enter
                data.append('CMMNT_DCTO', Enter_MYSQL($("#txtGlosa").val().trim()));
                data.append('USUA_ID', $('#ctl00_txtus').val());
                //data.append('RAZON_TRANS', $("input[type=radio][name=trans]:checked").val() == 'OTR' ? $("#txtEmpresaTransporte").val() : $('#txtPIDM_EmpresaTransporte').val());
                data.append('RAZON_TRANS', $('#txtPIDM_EmpresaTransporte').val());
                data.append('RAZON_DEST', $('#hfPIDM').val());
                data.append('LIC_CONDUCIR', $('#txtLicConducir').val());
                data.append('CHOFER', $("#txtchofer").val());


                if ($('#chkdirNoexis').is(':checked')) { $('#txtDIRECCION').val($('#txtDireccionOrigen2').val()); }
                else { $('#txtDIRECCION').val($('#txtDireccionOrigen').val()); }

                data.append('DIRE', $('#txtDIRECCION').val());
                data.append('CERTIFICADO', $("#txtCertificadoInscripcion").val());
                data.append('PLACA', $("#txtvehiculo").val());
                data.append('TIP_DCTO', $("#cboRegistro").val());
                //data.append('TIP_DCTO_ORG', $("#cboOrigen").val());
                data.append('TIP_DCTO_ORG', (($("#cboOrigen").val() === 'NINGUNO') ? '' : $("#cboOrigen").val()));

                data.append('ALMC_DEST', $('#cboAlmacenTransferencia').val());
                data.append('p_NUM_SEQ_DOC', $('#txtsecuencia').val());

                if ($("#cboTipoDcto").val() === null) {
                    data.append('TIPO_DOC_RAZON_DEST', '');
                } else {
                    data.append('TIPO_DOC_RAZON_DEST', $("#cboTipoDcto").val());
                }

                // data.append('TIPO_DOC_RAZON_DEST', $("#cboTipoDcto").val());
                data.append('MONEDA', $('#cboMoneda').val());
                data.append('ELECTRONICO', $('#chkElectronico').is(':checked') ? 'S' : 'N');
                data.append('TIPO_TRANS', $("input[type=radio][name=trans]:checked").val());
                data.append('COD_AUT', $('#hfCOD_AUT').val());
                data.append('DOCS_CODE', ((codigo_doc === undefined) ? '' : codigo_doc));
                data.append('TIPO_DCTO_INTERNO', $('#cboRegistroInterno').val());
                data.append('COD_AUT_INTERNO', $('#hfCOD_AUT_INTERNO').val());
                data.append('TIPO_ENVIO', $('#cboTipoEnvio').val());
                data.append('DIRECCION_TRANSPORTISTA', $('#txtDireccionTransportista').val());

                data.append('DESC_VEHICULO', $('#txtVehiculoFact').val());
                data.append('MARCA_FACT', $('#txtMarca').val());
                data.append('PLACA_FACT', $('#txtPlaca').val());

                data.append('UBIGEO_ORIGEN', $('#txtUbigeoOrigen').val());

                if ($("#rbTEntrada").is(':checked') || $("#rbTSalida").is(':checked')) {
                    data.append('UBIGEO_DESTINO', $('#cboAlmacenTransferencia :selected').attr('data-ubigeo'));
                    data.append('DIREC_DESTINO', $('#cboAlmacenTransferencia :selected').attr('direccion'));


                    //data.append('UBIGEO_DESTINO', $('#slcdist option:selected').attr('codigoUb'));
                    data.append('DIREC_ORIGEN', $('#txtDirecOrigen').val());
                    data.append('URBANIZACION_ORIGEN', $('#txtUrbOrigen').val());


                    data.append('URBANIZACION_DESTINO', $('#txtUrbanizacionDestino').val());
                    data.append('PIDM_TRANSP', $('#txtPIDM_EmpresaTransporte').val());

                    data.append('TIPO_DOC_TRANS', tipodoc2);

                    data.append('COSTO_TRANSPORTE', $('#txtCostoTransporte').val());


                    data.append('NRO_VUELTAS', $('#txtNroVueltas').val());
                } else {
                    if ($('#txtCodubigeo').val() == undefined)
                        data.append('UBIGEO_DESTINO', '');
                    else
                        data.append('UBIGEO_DESTINO', $('#txtCodubigeo').val());

                    //data.append('UBIGEO_DESTINO', $('#slcdist option:selected').attr('codigoUb'));
                    data.append('DIREC_ORIGEN', $('#txtDirecOrigen').val());
                    data.append('DIREC_DESTINO', $('#txtDireccionOrigen').val());
                    data.append('URBANIZACION_ORIGEN', $('#txtUrbOrigen').val());


                    data.append('URBANIZACION_DESTINO', $('#txtUrbanizacionDestino').val());
                    data.append('PIDM_TRANSP', $('#txtPIDM_EmpresaTransporte').val());

                    data.append('TIPO_DOC_TRANS', tipodoc2);

                    data.append('COSTO_TRANSPORTE', $('#txtCostoTransporte').val());


                    data.append('NRO_VUELTAS', $('#txtNroVueltas').val());
                }     

                if ($('#hfPIDM').val() != "") {

                    ValidarSerieNumeroEmpresa($('#hfPIDM').val(), $("#cboRegistro").val(), $("#txtSerieDctoRegistro").val(), $("#txtNroDctoRegistro").val(), false, $("#txtNumDctoAlmc").val())
                }
                if (validar_sn) {
                    var jqxhr = $.ajax({
                        type: "POST",
                        url: "vistas/na/ajax/naminsa.ashx?OPCION=G",
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (datos) {
                        if (datos[0].SUCCESS == "OK") {
                            if (datos[0].CODIGO == "") {
                                alertCustom("Ocurrió un error en el servidor al registrar la Operación.");
                            } else if (datos[0].CODIGO == "LIMITE") {
                                alertCustom('Se ha comsumido por completo la numeración del Documento de Registro.');
                            } else if (datos[0].CODIGO == "LIMITE INTERNO") {
                                alertCustom('Se ha consumido por completo la numeración del Documento Interno de Registro.');
                            } else {
                                $('#txtNumDctoAlmc').val(datos[0].CODIGO);
                                $('#txtAPROBADO_IND').val(($('#cboOperacion :selected').attr('data-nivel-aprobacion') === 'D') ? 'S' : 'N');
                                $('#hfCOD_DCTO_ALMC').val(datos[0].CODIGO);

                                if (datos[0].CORR_REG !== '-' && datos[0].CORR_REG !== '') {
                                    var nreg = datos[0].CORR_REG.split('-');
                                    $('#txtSerieDctoRegistro').val(nreg[0]);
                                    $('#txtNroDctoRegistro').val(nreg[1]);
                                }

                                if (datos[0].CORR_REG_INT !== '-' && datos[0].CORR_REG_INT !== '') {
                                    var nregint = datos[0].CORR_REG_INT.split('-');
                                    $('#txtSerieRegistroInterno').val(nregint[0]);
                                    $('#txtNroRegistroInterno').val(nregint[1]);
                                }

                                if ($('#txtNroDctoOrigen_0').val() != "") {

                                    $('#fila_2').hide();
                                    $('#fila_3').hide();
                                    $('#fila_4').hide();
                                    $('#div_vie_camp_seriados').hide();
                                    $('#fila_5').hide();
                                    $('#div_aceptar').hide();

                                }

                                $('#cboMoneda, #cboOperacion, #slcEmpresa, #cboAlmacen, #cboOrigen').prop('disabled', true);
                                $('#grabar').html("<i class='icon-pencil'></i> Modificar").attr("href", "javascript:Actualizar();");
                                $("#div_botones_detalle").css("display", "block");
                                var val = parseInt($("#txtsecuencia").val());
                                var seq = val + 1;
                                $("#txtsecuencia").val(seq);
                                $('#liDetalles').removeClass('hidden');
                                $("#tabDetalleMov").click();
                                $('.quitar, #btnOrigen').remove();
                                $('#rbEntrada, #rbSalida, #rbTEntrada, #rbTSalida').prop('disabled', true);
                                window.history.pushState("Object", "ENTRADA SALIDA ALMACEN", "/Default.aspx?f=naminsa&codigo=" + datos[0].CODIGO);
                                Desbloquear("generales");
                                exito();

                                if ($('#cboOrigen').val() !== 'NINGUNO') {
                                    $('#btnVerDetallesOrigen').removeClass('hidden');
                                    $('#btnVerDetallesOrigen').click(function () {
                                        listarDetalles();
                                        if ($('#tabla_det').DataTable().data().toArray().length < 1) {
                                            //if (true) {
                                            Bloquear('detallemov');
                                            setTimeout(function () {
                                                $.ajax({
                                                    url: 'vistas/na/ajax/naminsa.ashx?OPCION=DETALLES_ORIGEN',
                                                    type: 'POST',
                                                    async: false,
                                                    datatype: false,
                                                    data: {
                                                        TIPO_MOV: ($("#rbEntrada").is(':checked') ? 'I' : $("#rbSalida").is(':checked') ? 'S' : $("#rbTEntrada").is(':checked') ? 'TI' : $("#rbTSalida").is(':checked') ? 'TS' : ''),
                                                        ISAC_CODE: ObtenerQueryString('codigo'), TIPO_DCTO: $('#cboOrigen').val(), DCTO_ORGN: codigo_doc, DCTO_SERIE: NumserieDocOrigen, DCTO_NUM: NumDocOrigen,
                                                        USUA_ID: $('#ctl00_txtus').val(), SCSL_CODE: $('#cboAlmacen :selected').attr('data-scsl-code'), CTLG_CODE: $('#slcEmpresa').val(), COD_ALMC: $('#cboAlmacen').val(),
                                                        TIPO_OPE: $('#cboOperacion').val()
                                                    }
                                                }).done(function (data) {
                                                    Desbloquear('detallemov');
                                                    if (data === 'OK') {
                                                        listarDetalles();
                                                        if ($('#tabla_det').DataTable().data().toArray().length === 0) {
                                                            if ($('#cboOrigen').val() === '0052' || $('#cboOrigen').val() === '0028' || $('#cboOrigen').val() === '0050') {
                                                                infoCustom2('Es posible que el documento de origen no haya sido atendido o autorizado.');
                                                            } else { infoCustom2('No hay stock disponible de cada producto del documento de origen.'); }
                                                        } else {
                                                            $('#btnVerDetallesOrigen').addClass('hidden');
                                                        }
                                                    } else if (data == "ALMACEN_DIF") {
                                                        listarDetalles();
                                                        //infoCustom2('Está intentando despachar un producto de un almacén que no corresponde');
                                                        infoCustom2('El almacén de salida difiere con el almacén de origen del producto');
                                                    }else {
                                                        // codigos de productos sin stock
                                                        //listarDetalles();
                                                        //if ($('#tabla_det').DataTable().data().toArray().length === 0) {
                                                        //    if ($('#cboOrigen').val() === '0052' || $('#cboOrigen').val() === '0028') {
                                                        //        infoCustom2('Es posible que el documento de origen no haya sido atendido o autorizado.');
                                                        //    } else { infoCustom2('No hay stock disponible de cada producto del documento de origen.'); }
                                                        //} else {
                                                        //    $('#btnVerDetallesOrigen').addClass('hidden');
                                                        //}
                                                        infoCustom2('No hay stock disponible para producto(s) con código: ' + data);
                                                        listarDetalles();
                                                        if ($('#tabla_det').DataTable().data().toArray().length === 0) {
                                                            if ($('#cboOrigen').val() === '0052' || $('#cboOrigen').val() === '0028') {
                                                                infoCustom2('Es posible que el documento de origen no haya sido atendido o autorizado.');
                                                            }
                                                        } else {
                                                            $('#btnVerDetallesOrigen').addClass('hidden');
                                                        }

                                                    }

                                                }).fail(function () {
                                                    alertCustom('Error al guardar documento de almacen');
                                                    Desbloquear('detallemov');
                                                });
                                            }, 1000);
                                        } else {
                                            infoCustom2('Productos ya obtenidos del documento de origen.');
                                        }
                                    });
                                }
                            }
                            autocompletarCentroCostos(prmtCCST);
                            cargarProductos2();
                        }
                        else {
                            alertCustom("Existen Documentos Repetidos (" + datos[0].NUMERO + ").");
                            Desbloquear("generales");
                        }
                    }).fail(function () {
                        noexito();
                        Desbloquear("generales");
                    });
                } else {
                    Desbloquear("generales");
                }
            }, 100);
        }
    }
}

var validarDctoRegistro = function (serie, numdcto, pidm, tipodcto) {
    var resp = false;
    if (pidm == "") { pidm = '99999999'}
    if (vErrors(['cboRegistro', "slcEmpresa", "cboAlmacen", "txtSerieDctoRegistro", "txtNroDctoRegistro", "txtEmision"])) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=V&NUM_SERIE=" + serie + "&NUM_DCTO=" + numdcto + "&PROV_PIDM=" + pidm + "&TIPO_DCTO=" + tipodcto,
            async: false,
            success: function (datos) {
                if (datos != null) {
                    if (datos != "N") { infoCustom("N° Dcto de registro ya  Existe!"); }
                    else { resp = true; }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    return resp;
};

var Actualizar = function () {
    var isacc_code = $("#txtNumDctoAlmc").val();

    autocompletarCentroCostos(prmtCCST);
    var tamaño = $("#prueba").children().length;
    var num = "", num_serie = ""; codigo_doc = "";
    for (i = 0; i < tamaño; i++) {
        num += $("#txtNroDctoOrigen_" + i + "").val() + ",";
        num_serie += $("#txtSerieDctoOrigen_" + i + "").val() + ",";
        codigo_doc += $("#txtCodigoDctoOrigen_" + i + "").val() + ",";
    }
    num += "}";
    num_serie += "}";
    codigo_doc += "}";

    NumDocOrigen = num.replace(",}", "");
    NumserieDocOrigen = num_serie.replace(",}", "");
    codigo_doc = codigo_doc.replace(",}", "");

    $("#hfNumDocOrigen").val(NumDocOrigen);

    var a = ['slcEmpresa', 'cboAlmacen', 'cboOperacion', 'txtSolicitante', 'txtEntregar', 'txtEmision', 'txtTransaccion', 'cboMoneda', 'cboRegistroInterno', 'txtSerieRegistroInterno', 'txtNroRegistroInterno', 'txtCostoTransporte'];

    if ($('#hfSIN_DESTINO').val() === 'NO') {
        a.splice(-1, 0, 'txtRazonSocial', 'txtNroDcto', 'cboTipoDcto');
        if ($('#rbTEntrada').is(':checked') || $('#rbTSalida').is(':checked')) {
            a.splice(-1, 0, 'cboAlmacenTransferencia', 'txtDireccionTransferencia');
        } else {
            if ($('#chkdirNoexis').is(':checked')) { a.push('txtDireccionOrigen2'); }
            else { a.push('txtDireccionOrigen'); }
        }
    }

    if ($('#hfSIN_TRANSPORTE').val() === 'NO') {
        a.push('txtEmpresaTransporte');
    }

    if ($('#cboTipoEnvio').val() !== '') {
        var tipoEnvio = $('#cboTipoEnvio').val();
        if (tipoEnvio === 'EDTR' || tipoEnvio === 'ETDT') {
            a.push('txtDireccionTransportista');
        }
    }

    if ($('#divRegistro').css('display') !== 'none') {
        a.splice(-1, 0, 'cboRegistro', 'txtSerieDctoRegistro', 'txtNroDctoRegistro');
    }

    if ($('#tipoEnvio').val() === 'EDTR' || $('#tipoenvio').val() === 'ETDT') {
        a.push('txtDireccionTransportista');
    }

    var i = 0;

    if (vErrors(a)) {
        Bloquear("ventana");
        setTimeout(function () {
            var data = new FormData();
            data.append('ISAC_CODE', $("#txtNumDctoAlmc").val());
            data.append('FEC_EMISION', $("#txtEmision").val());
            data.append('FEC_TRANS', $("#txtTransaccion").val());
            data.append('DCTO_REG', ((NumDocOrigen === undefined) ? '' : NumDocOrigen));
            data.append('SERIE_DCTO', ((NumserieDocOrigen === undefined) ? '' : NumserieDocOrigen));
            data.append('PIDM_SOLICITANTE', $('#txtPIDM_Solicitante').val());
            data.append('DCTO_ORGN', $("#txtNroDctoRegistro").val());
            data.append('DCTO_ORGN_SERIE', $("#txtSerieDctoRegistro").val());
            data.append('PIDM_ENTREGAR_A', $('#txtPIDM_Entregar').val());
            data.append('TIPO_OPE', $("#cboOperacion").val());
            //Validacion de enter
            data.append('CMMNT_DCTO', Enter_MYSQL($("#txtGlosa").val().trim()));
            data.append('USUA_ID', $('#ctl00_txtus').val());
            //data.append('RAZON_TRANS', $("input[type=radio][name=trans]:checked").val() == 'OTR' ? $("#txtEmpresaTransporte") : $('#txtPIDM_EmpresaTransporte').val());
            data.append('RAZON_TRANS', $('#txtPIDM_EmpresaTransporte').val());
            data.append('RAZON_DEST', $('#hfPIDM').val());
            data.append('LIC_CONDUCIR', $('#txtLicConducir').val());
            data.append('CHOFER', $("#txtchofer").val());
            //$('#txtDIRECCION').val($('#txtDireccionOrigen').val());

            if ($('#chkdirNoexis').is(':checked')) { $('#txtDIRECCION').val($('#txtDireccionOrigen2').val()); }
            else { $('#txtDIRECCION').val($('#txtDireccionOrigen').val()); }


            data.append('DIRE', $('#txtDIRECCION').val());
            data.append('CERTIFICADO', $("#txtCertificadoInscripcion").val());
            data.append('PLACA', $("#txtvehiculo").val());
            data.append('TIP_DCTO_ORG', $("#cboOrigen").val() == "NINGUNO" ? "" : $("#cboOrigen").val());
            data.append('ALMC_DEST', $('#cboAlmacenTransferencia').val());
            data.append('p_NUM_SEQ_DOC', $('#txtsecuencia').val());
            data.append('TIPO_DOC_RAZON_DEST', $("#cboTipoDcto").val());
            data.append('ELECTRONICO', $('#chkElectronico').is(':checked') ? 'S' : 'N');
            data.append('TIPO_TRANS', $("input[type=radio][name=trans]:checked").val());
            data.append('TIPO_ENVIO', $('#cboTipoEnvio').val());
            data.append('DIRECCION_TRANSPORTISTA', $('#txtDireccionTransportista').val());
            data.append('DOCS_CODE', ((codigo_doc === undefined) ? '' : codigo_doc));
            data.append('NRO_VUELTAS', $('#txtNroVueltas').val());

            data.append('DESC_VEHICULO', $('#txtVehiculoFact').val());
            data.append('MARCA_FACT', $('#txtMarca').val());
            data.append('PLACA_FACT', $('#txtPlaca').val());
                      
            data.append('PIDM_TRANSP', $('#txtPIDM_EmpresaTransporte').val());
            data.append('COSTO_TRANSPORTE', $('#txtCostoTransporte').val());

            if ($("#rbTEntrada").is(':checked') || $("#rbTSalida").is(':checked')) {
                data.append('UBIGEO_DESTINO', $('#cboAlmacenTransferencia :selected').attr('data-ubigeo'));
                data.append('DIREC_DESTINO', $('#cboAlmacenTransferencia :selected').attr('direccion'));

            }

            if ($('#hfPIDM').val() != "") {
                ValidarSerieNumeroEmpresa($('#hfPIDM').val(), $("#cboRegistro").val(), $("#txtSerieDctoRegistro").val(), $("#txtNroDctoRegistro").val(), false, $("#txtNumDctoAlmc").val())
            }

            
            if (validar_sn) {
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/na/ajax/naminsa.ashx?OPCION=AD",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).success(function (datos) {
                    if (datos[0].SUCCESS == "OK") {
                        if (datos[0].CODIGO == "") {
                            alertCustom("NO SE PUEDE ACTUALIZAR");
                        }
                        else {
                            var val = parseInt($("#txtsecuencia").val());
                            var seq = val + 1;
                            $("#txtsecuencia").val(seq);

                            exito();
                        }
                    } else {
                        alertCustom("Existen Documentos Repetidos (" + datos[0].NUMERO + ")!");
                    }
                    Desbloquear("ventana");
                }).error(function () {
                    Desbloquear("ventana");
                    noexito();
                });
            } else {
                Desbloquear("ventana");
                alertCustom("Número de documento no existe")
            }

        }, 100);
    }
};

var CompletarDcto = function () {

    if (detallesCorrectos()) {
        if (seriadosCorrectos()) {
            if (centroCostosCorrecto()) {
                Bloquear('detallemov');

                //if ($("#rbEntrada").is(":checked") && $("#cboOperacion").val() == "0005" && $("#cboOrigen").val()=="0007") { //DEVOLUCION RECIBIDA                    
                //    infoCustom2("Martin Camiseta!!!")
                //}
                //else {
                //}
                setTimeout(function () {
                    $.ajax({
                        type: "post",
                        //url: "vistas/na/ajax/naminsa.ashx?OPCION=COMPLETAR",
                        url: "vistas/na/ajax/naminsa.ashx?OPCION=COMPLETAR_VALI",
                        async: false,
                        data: { ISAC_CODE: ObtenerQueryString('codigo') },
                        success: function (datos) {
                            if (datos != null && datos.length > 0) {
                                if (datos[0].p_RPTA === "OK") {
                                    listarDetallesCompletado();
                                    listarTotales(ObtenerQueryString('codigo'));
                                    //$("#lblValorizadoTotal").html(api.data()[0].SIMBOLO_MONEDA);
                                    exito();
                                    bloquearElementos();
                                    $("#tabDatosGenerales").click();
                                    generarImpresion();
                                    $('#btnMail, #btnImprimir, #btnWhatsapp').removeClass('hidden');
                                    if ($("#rbSalida").is(':checked') || ($("#rbEntrada").is(':checked') && $("#cboOperacion").val() == '0002' && $("#txtSerieDctoRegistro").val().substring(0, 2) == 'TE')) {
                                        if ($("#cboRegistro").val() == "0009") {
                                            //json_datos_imp = datos;
                                            $('#btnImprimirGuia').css('display', 'inline');
                                        }
                                    }
                                    $('#advs').addClass('hidden');

                                    if (prmtACON == "SI") {
                                        //Asiento al completar
                                        var sCodAlmc = $("#txtNumDctoAlmc").val();
                                        sCodAlmc = $.trim(sCodAlmc);
                                        var oDocAlmc = fnGetDocAlmacen(sCodAlmc);
                                        vAsientoContable.sCodDoc = sCodAlmc;
                                        vAsientoContable.objDoc = oDocAlmc;

                                        $('#btnGenerarAsiento').click();
                                    }
                                    //if ($('#chkElectronico').is(':checked')) {
                                    //    $("#hfCodigoNaminsa").val(ObtenerQueryString('codigo'));
                                    //    var miCodigoQR = new QRCode("codigoQR");
                                    //    miCodigoQR.makeCode(datos[0].DATOS_QR);
                                    //    $('#codigoQR').hide();
                                    //    //setTimeout(guardarQR, 0.0000000000000001);
                                    //    setTimeout(guardarQR, 500);
                                    //}                                    
                                }
                                else if (atos[0].p_RPTA.split("-")[0] === "X_SEPAR") {
                                    infoCustom2("El producto " + atos[0].p_RPTA.split("-")[1] + " no cuenta con separados suficientes para despachar.")
                                }
                                else if (atos[0].p_RPTA.split("-")[0] === "X_STOCK") {
                                    infoCustom2("El producto " + atos[0].p_RPTA.split("-")[1] + " no cuenta con el stock suficiente. Revise su stock disponible.")
                                }
                                else {
                                    alertCustom("El doc. no se completó, porque la serie " + atos[0].p_RPTA + " ya se encuentra registrada en el almacén.")
                                    //infoCustom2("La serie " + data + " ya se encuentra registrada en el almacén.")
                                }
                            } else {
                                noexito();
                            }
                            
                            Desbloquear('detallemov');
                        },
                        error: function (msg) {
                            alertCustom('Error al intentar completar el documento.');
                            Desbloquear('detallemov');
                        }
                    });
                }, 50);

            } else { alertCustom('Por favor, ingrese un centro de costos para cada salida.'); }
        } else { alertCustom('Por favor, ingrese una serie para cada producto seriado.'); }
    } else { alertCustom('El documento no tiene detalles, por lo tanto no se puede completar la operación.'); }
};

function guardarQR() {
    //CAPTURA LA IMAGEN DEL QR CODIFICADA EN BASE64 
    var NombreQR = $('#codigoQR img').attr('src');

    var qrData = new FormData();
    qrData.append('p_IMGQR', NombreQR);

    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=GQR_GRE&ISAC_CODE=" + $("#hfCodigoNaminsa").val(), //CUANDO SE PRESIONA EL BOTON COMPLETAR
        data: qrData,
        async: false,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res != "OK") {
                noexito();
            }
        },
        error: function () {
            alertCustom("No se guardaron correctamente los datos!")
        }
    });
}

//VALIDACIONES DETALLES
var detallesCorrectos = function () {
    var detalles = $('#tabla_det').DataTable().data();
    return (detalles.length > 0);
};

var seriadosCorrectos = function () {
    var series = $('#tabla_det').DataTable().column(4).data().toArray();
    var seriados = $('#tabla_det').DataTable().column(18).data().toArray(); //VERIFICA SI ES SERIADO
    for (var i = 0; i < seriados.length; i++) {
        if ((series[i] === '' && seriados[i] === 'S')) {
            return false;
        }
    }
    return true;
};

var centroCostosCorrecto = function () {
    var centros = $('#tabla_det').DataTable().column(5).data().toArray();
    for (var i = 0; i < centros.length; i++) {
        if ($('#rbSalida').is(':checked') && centros[i] === '') {
            return false;
        }
    }
    return true;
};

//-------------------------

var numerico = function (text) {
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var arreglo = text.toUpperCase().split('');
    var pos = -1;
    for (var i = arreglo.length - 1; i > -1; i--) {
        if (letras.indexOf(arreglo[i].toString()) > -1) {
            pos = i;
            break;
        }
    }
    return parseInt(text.substring(pos + 1));
};

function MostrarDetallesOrigen() {
    var cod = ObtenerQueryString("codigo");
    if (cod !== undefined) {

        var data = new FormData();

        data.append('ISAC_CODE', cod);

        //Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/na/ajax/NAMINSA.ashx?OPCION=DETALLES_ORIGEN_LISTA",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                //Desbloquear("ventana");
                $('#divTblDetallesOrigen').html("");
                if (datos != null) {
                    $('#divTblDetallesOrigen').html(datos)
                    oTable = $('#tblDetallesOrigen').dataTable({
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        },
                        "sPaginationType": "full_numbers"
                    });
                    //oTable.fnSetColumnVis(0, false, true)
                    oTable.fnSetColumnVis(1, false, true)
                    oTable.fnSetColumnVis(2, false, true)

                    setTimeout(function () {
                        $("#modalDetallesOrigen").modal("show");
                    }, 1000);
                } else {
                    noexito();
                }
            })
            .error(function () {
                //Desbloquear("ventana");
                noexito();
            });
    } else {
        infoCustom2("Debe grabar el documento para esta operación!")
    }
}

var datosLineaCredito = [];
function CargarDatosLineaCredito(pidm) {
    //Cargar datos resumen linea crédito      
    datosLineaCredito = [];
    if (pidm != "") {
        $.ajax({
            type: "GET",
            url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
            data: {
                flag: 7,
                pidm: pidm,
                empr: $("#slcEmpresa").val()
            },
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (datos != "" & datos != null) {
                    datosLineaCredito = datos;
                    //$("#hfCreditoDispMoba").val(datos[0].ACTUAL)
                    //$("#hfCreditoDispMoal").val(datos[0].ACTUAL_MOAL)
                } else {
                    datosLineaCredito = [];
                }
            },
            error: function () {
                alertCustom("Error al obtener datos de Línea de Crédito.");
            }
        });
    }
}

var ListarNumeroLineasImprimir = function () {
    var b = 0;
    Bloquear('ventana');

    var data = new FormData();
    data.append('CTLG_CODE', $("#slcEmpresa").val());
    //data.append('TIP_DCTO', $("#cboRegistro").val());
    data.append('TIP_DCTO', "0009");

    $.ajax({
        type: "POST",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=NUM_LINEAS_G",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    }).success(function (datos) {
        Desbloquear("ventana");
        if (datos != null && datos != "") {
            if (datos[0].LINEAS != "VACIO") {
                jsonlineas_gui = datos;
            } else {
                infoCustom2("TIPO DE DOCUMENTO NO ESTA ASOCIADO A UNA IMPRESORA, NO SE INDICO NUMERO DE LINEAS DE IMPRESION");
                return 0;
            }
        }
        else {
            b = 1;
            noexito();
        }
    })
        .error(function () {
            noexito();
            Desbloquear("ventana");
            return false;
        });
}

function ImprimirGuia(indice_inicio, indice_fin) {

    var arraY = ["slcEmpresa", "slcSucural", "txt_fdel", "txt_fal"];
    var data = new FormData();
    data.append('CTLG_CODE', $("#slcEmpresa").val());
    data.append('FEC_EMISION', $("#txtEmision").val());
    data.append('FEC_TRANS', $("#txtTransaccion").val());

    data.append('TIP_DCTO', $("#cboRegistro").val());
    data.append('DCTO_REG', $("#txtNroDctoRegistro").val());
    data.append('SERIE_DCTO', $("#txtSerieDctoRegistro").val());

    data.append('TIP_DCTO_ORG', $("#cboOrigen").val());
    data.append('DCTO_ORGN', $("#txtNroDctoOrigen_0").val());
    data.append('DCTO_ORGN_SERIE', $("#txtSerieDctoOrigen_0").val());

    data.append('CMMNT_DCTO', Enter_MYSQL($("#txtGlosa").val().trim()));


    data.append('RAZON_DEST', $('#hfPIDM').val());
    data.append('RAZON_DEST_DESC', $('#txtRazonSocial').val());
    data.append('RUC_DEST', $('#txtNroDcto').val());

    data.append('RAZON_TRANS_DESC', $('#txtEmpresaTransporte').val());
    data.append('RAZON_TRANS', $('#txtPIDM_EmpresaTransporte').val());
    data.append('RUC_TRANSP', $('#txtnumdocemptrans').val());

    data.append('LIC_CONDUCIR', $('#txtLicConducir').val());
    data.append('CHOFER', $("#txtchofer").val());

    data.append('DIRE', $('#txtDIRECCION').val());
    data.append('CERTIFICADO', $("#txtCertificadoInscripcion").val());
    data.append('PLACA', $("#txtvehiculo").val());

    data.append('MONEDA', $('#cboMoneda').val());

    data.append('TIPO_TRANS', $('#rdPublico').is(':checked') ? 'PUB' : 'PRI');

    data.append('DIRECCION_TRANSPORTISTA', $('#txtDireccionTransportista').val());
    data.append('INDICE_INI', indice_inicio);
    data.append('INDICE_FIN', indice_fin);
    var campo1, campo2, campo3;
    var nro_items = 0;
    var cadena = "";
    if (json_datos_imp != null) {
        campo1 = "", campo2 = "", campo3 = "";
        nro_items = json_datos_imp.length;
        for (var i = 0; i < json_datos_imp.length; i++) {
            if (json_datos_imp[i].SERIADO_IND == "S") {
                campo1 = json_datos_imp[i].DESC_PRODUCTO + ";NRO SERIE(" + json_datos_imp[i].NRO_SERIE + ")";
                if (campo1.length > 60) {
                    nro_items = nro_items + 1;
                }
            } else {
                campo1 = json_datos_imp[i].DESC_PRODUCTO;
            }
            campo2 = json_datos_imp[i].CANTIDAD_BASE;
            campo3 = json_datos_imp[i].DESC_UNME_BASE;
            cadena += campo1 + "¬" + campo2 + "¬" + campo3 + "|";

        }
    } else {
        $('#tabla_det tbody tr').each(function (index) {
            campo1 = "", campo2 = "", campo3 = "";
            $(this).children("td").each(function (index2) {

                switch (index2) {
                    case 3: campo1 = $(this).text().toString();
                        break;
                    case 7:
                        campo2 = $(this).text().toString();
                        break;
                    case 8:
                        campo3 = $(this).text();
                        break;
                }
            });
            cadena += campo1 + ";" + campo2 + ";" + campo3 + "|";
        });
    }
    data.append('DETALLE_IMPR', cadena);
    //if (vCamposO(arraY)) {

    Bloquear("ventana");

    $.ajax({
        url: "vistas/na/ajax/naminsa.ashx?OPCION=IMP_GUIA",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            if (datos != null && datos != "") {
                if (datos == "OK") {
                    exito();
                } else {
                    noexitoCustom("No se imprimio Correctamente ...!");
                }
            } else {
                noexitoCustom("No se imprimio Correctamente ...!");
            }
            Desbloquear("ventana");
        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("Error al Listado!")
        }
    });
}

function fnVerDctoOrigen() {
    if (vErrors(["txtSerieDctoOrigen_0", "txtNroDctoOrigen_0"])) {
        let sCodigo = $("#txtCodigoDctoOrigen_0").val();
        if (sCodigo!=="") {
            switch (sCodigo.substring(0,1)){
                case "V":
                    window.open("?f=nvmdocv&codigo=" + sCodigo, "_blank");
                    break;
                case "P": 
                    window.open("?f=nomdocc&codigo=" + sCodigo, "_blank");
                    break;
            }
        } else {
            alertCustom("No se pudo obtener código de documento origen.");
        }
    }
}

var fnGetDocAlmacen = function (sCodDoc) {
    let aoDoc = [];

    Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/NA/ajax/NAMINSA.ashx?OPCION=GET_DOC_ALMACEN&p_CODE=" + sCodDoc,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana");
            aoDoc = datos;
        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("No se encontró el documento de almacen.");
        }
    });
    Desbloquear("ventana");

    return aoDoc;
};
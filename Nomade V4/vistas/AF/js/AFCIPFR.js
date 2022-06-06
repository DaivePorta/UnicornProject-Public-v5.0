var codigodeCaja = 0;
var productos = [];

var AFCIPFR = function () {

    var flagTb = false;
    var flagTbDetalle = false;

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
        $('#txthorasTrabaja').inputmask({ mask: '9', repeat: 4, greedy: false });
        $("#cboUniMedida").select2();
        $("#txtFechaEnsamblaje").datepicker("setDate", "now").datepicker("setEndDate", "now");
        $("#txtFechaMovimiento").datepicker("setDate", "now").datepicker("setEndDate", "now");
    }

    var eventoControles = function () {

        $('#cboEmpresas').on('change', function () {
           fillTxtProducto('#txt_desc_producto', '', '', '02,');
            $("#txtEmpleado").remove();
            $("#input_empl").html("<input id='txtEmpleado' class='span10' type='text' style='text-transform: uppercase'/> ");
            filltxtEmpleado('#txtEmpleado');

            cargarEmpleados();
            $('#txtAlmacenero').parent().html('<input id="txtAlmacenero" class="span12" type="text" style="text-transform: uppercase" />');
            autocompletarAlmacenero('#txtAlmacenero', '');

            cargarProductos();
           

            $('.div_mas_dctoreg').remove();
            $('#detalleEmpleado').DataTable().data().clear().draw()
            $('#detalleGeneral').DataTable().data().clear().draw()

            var sinIGV = CalculaTotalPrSinIgv();
            $('#totalSinIGV').val(sinIGV.toFixed(2));

            var conigv = CalculaTotalPrConIgv();
            $('#totalConIGV').val(conigv.toFixed(2));

            totalTotales();
            fillCboEstablecimiento();
        });

        $('#cboEstablecimiento').on('change', function () {

            $("#txtEmpleado").remove();
            $("#input_empl").html("<input id='txtEmpleado' class='span10' type='text' style='text-transform: uppercase'/> ");
            filltxtEmpleado('#txtEmpleado', '');

            $('#detalleEmpleado').DataTable().data().clear().draw()
            $('#detalleGeneral').DataTable().data().clear().draw()
            $('.div_mas_dctoreg').remove();

            $('#txtnumdocOrigenserie_0').val('');
            $('#txtnumdocOrigen_0').val('');
            $('#txtCodigoDoc_0').val('');

            cargarEmpleados();
            $('#txtAlmacenero').parent().html('<input id="txtAlmacenero" class="span12" type="text" style="text-transform: uppercase" />');
            autocompletarAlmacenero('#txtAlmacenero', '');

            cargarProductos();
           
        });

        $('#btnCodigo').click(function () {
            if ($.trim($('#txtNroSerie').val()) == "") {
                alertCustom("Ingrese un número de serie")
            }
            else {
                var numero = $('#txtNroSerie').val();
                $("#divCodBarras").html('<canvas id="codBarras" width="400" height="120" style="margin:auto;display:block;margin:10px;"></canvas>')
                $('#codBarras').barcode("" + numero + "", "code128", { barWidth: 2, barHeight: 80, output: "canvas" });
                $('#barras').modal('show');
            }
        });

        $('#guardar').click(function () {
            if ($('#txttotalProFaS').val() == "") {
                alertCustom("Agrege un producto / empleado");
            }
            else {
                if ($("#detalleGeneral").dataTable().fnGetData().length == 0) {
                    alertCustom("Agrege al menos un producto antes de continuar!");
                }
                else {
                    Guardar();
                }
            }
        });

        $('#txthorasTrabaja').blur(function () {
            sumarHoras();
            totalTotales();
        });

        $('#btn_add_emp').click(function () {
            if ($('#emplPidm').val() == "") {
                alertCustom('Seleccione un empleado de la lista')
            }
            else {
                if (vErrors('txtEmpleado')) {
                    GrabarEmpl($('#emplPidm').val(), $('#emplNombres').val(), $('#emplSueldo').val());
                    var horas = CalculaTotalHoras();
                    $('#txtHoraSueldo').val(horas.toFixed(2));
                    sumarHoras();
                    totalTotales();
                    //Limpiar
                    $('#emplPidm').val("");
                    $("#txtEmpleado").val("");
                }
            }
        });

        var i = 0;
        $("#btn_add_dcto").click(function () {
            i = i + 1;
            $("#prueba").append("<div class='row-fluid div_mas_dctoreg' >\
                        <div class='span12'>\
                            <div class='span1'>\
                                <div class'control-group '>\
                                </div>\
                            </div>\
                            <div class='span6'>\
                                <div class='row-fluid' >\
                                <div class='span6'>\
                                <div class='control-group'>\
                                    <div class='controls'>\
                                        <div id='Div1' class='controls'>\
                                           <input id='txtnumdocOrigenserie_" + (i) + "' class='span4 txtnumdocOrigenserie ' disabled='disabled'  type='text' />\
                                           <input id='txtnumdocOrigen_" + (i) + "' class='txtnumdocOrigen span8'  disabled='disabled' type='text' />\
                                           <input id='txtCodigoDoc_" + (i) + "' class='txtCodigoDoc' type='hidden'/>\
                                        </div>\
                                </div>\
                                </div>\
                                </div>\
                                 <div class='span6'>\
                                 <div class='control-group'>\
                                 <div class='controls'>\
                                        <a id='btnBuscadocs_" + (i) + "' data-original-title='Buscar Documento' class='btn tooltips blue buscar' onclick='buscarDocumento(this)' ><i class='icon-search' style='line-height: initial;'></i></a>\
                                        <a id='btn_busca_deta_" + (i) + "' data-original-title='Listar Detalles de Documento' class='btn tooltips blue deta   '  onclick=\"ListaProdDetalle($($($(btn_busca_deta_" + (i) + ").parent().parent().parent().parent().children()[0]).find(\'input[type=hidden]\')[0]).val())\"   ><i class='icon-reorder' style='line-height: initial;'></i></a>\
                                        <a id='btn_quitar_" + (i) + "' data-original-title='Agregar Otro Documento' class='btn tooltips red btn-quitar' onclick=\"eliminarDetalle($($($(btn_quitar_" + (i) + ").parent().parent().parent().parent().children()[0]).find(\'input[type=hidden]\')[0]).val(),$(this))\" ><i class='icon-minus' style='line-height: initial;'></i></a>\
                            </div>\
                            </div>\
                            </div> \
                                </div>\
                            </div>\
                            <div class='span6'>\
                            </div>\
                        </div>\
                    </div>");
        });

        //--------
       
        $("#cboCorrelativo").on('change', function () {
            var nro_serie = $(this).val();
            switch (nro_serie) {
                //Cargar PRODUCTOS SERIADOS
                case '': {
                    $("#div_correlativos").html('');
                    break;
                }
                case 'L': {
                    $("#hfTIPO_INSERT").val("LISTA");
                    $("#div_txt_serie_sec").css("display", "none");
                    $("#div_correlativos").attr("class", "span5");
                    $("#div_correlativos").html('<select id="cboBuscar" class="span10" multiple="multiple" disabled="disabled"></select>&nbsp;<span id="cSeries"><img src="./recursos/img/loading.gif" align="absmiddle"></span>');
                    $("#txtSerie").val("");
                    var arr = []; 
                    
                    /*
                    $.ajax({
                        type: "post",
                        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cboEmpresas').val() + "&SCSL=" + $('#cboEstablecimiento').val() + "&SERIADO_IND=S" + "&PROD_CODE=" + prodActual.CODIGO,
                        contenttype: "application/json;",
                        datatype: "json",
                        async: false,
                        success: function (datos) {
                            $('#cboBuscar').html('');
                            var obj = '';
                            if (datos != null) {
                                for (var i = 0; i < datos.length; i++) {
                                    $('#cboBuscar').append('<option value="' + datos[i].CODIGO_BARRAS + '">' + datos[i].CODIGO_BARRAS + '</option>');
                                }
                                $('#cboBuscar').prop('disabled', false);
                            } 
                            $('#cSeries').remove();                            
                        },
                        error: function (msg) {
                            alert(msg);
                        }
                   });*/

                     //LISTA TODOS LOS PRODUCTOS SERIADOS
                      $.ajax({
                        type: "post",
                        url: "vistas/na/ajax/NAMINSA.ashx?OPCION=LPSER&CODE_PROD=" + prodActual.CODIGO + "&CTLG_CODE=" + $('#cboEmpresas').val() + "&COD_ALMC=" + $('#cboEstablecimiento :selected').attr("data-almc"),
                        contenttype: "application/json;",
                        datatype: "json",
                        success: function (datos) {
                            $('#cboBuscar').html('');
                            if (datos !== null && datos !== '') {
                                for (var i = 0; i < datos.length; i++) {
                                    $('#cboBuscar').append('<option value="' + datos[i].CODIGO_BARRAS + '">' + datos[i].CODIGO_BARRAS + '</option>');
                                }
                                $('#cboBuscar').prop('disabled', false);
                            }
                            $('#cSeries').remove();
                        },
                        error: function (msg) {
                            alertCustom(msg);
                        }
                    });
                    
                    $('#cboBuscar').select2();
                    $('#cboBuscar').unbind('change');
                    $('#cboBuscar').on('change', function () {
                        if ($('#txtmonto').val() !== '') {
                            $('#txtSerie').val($(this).val());
                            if ($(this).val() != null) {
                                $('#txtmonto').val(($(this).val().length * $('#hfMONTO').val()).toFixed(2));
                            }
                        }
                    });
                    $('#txtCentroCostos').attr('next', '#cboBuscar');
                    break;
                }
            }
        });

        $('#btnRefrescarProductos').click(function (event) {
            event.preventDefault();
            Bloquear('detallemov_datos');
            cargarProductos();
            
            Desbloquear('detallemov_datos');
            LimpiarCamposDetalle();
        });

        //-------- EVENTOS ENTER

        $("#txtNroSerie").keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    $("#txtAlmacenero").focus();
                }
            }
        });

        $("#txtPROD_CODE,#txtPROD_DESC").live("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    $('#txtcant').focus();
                }
            }
        });

        $("#txtcant").keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    if ($("#txtPROD_CODE").val() != "" &&
                        $("#txtPROD_DESC").val() != "" &&
                        $("#txtcant").val() != "" &&
                        $("#cboUniMedida").val() != "" &&
                        $("#txtPU").val() != "" &&
                        $("#txtStock").val() != "") {
                        AgregarProducto();
                    }
                }
            }
        });

        $("#btnImprimir").live("click", function () {
            var canvas = document.getElementById('codBarras');
            var dataURL = canvas.toDataURL();    
            var ID_LINK = document.getElementById('btnImprimir');
            var DESC = document.getElementById('divCodBarras');
            ID_LINK.href = canvas.toDataURL('image/png');           
            ID_LINK.download = $("#txtNroSerie").val() + ".png";
        });

        $("#btnRecargarProdFab").on("click", function () {
            fillTxtProducto('#txt_desc_producto', '', '', '02,');
        });
    }

    var cargarProductos = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LISTAR_PRODUCTOS_NAM",
            cache: false,
            data: { CTLG_CODE: $('#cboEmpresas').val(), SCSL_CODE: $('#cboEstablecimiento').val(), MONEDA: "0002" },
            datatype: "json",
            //async: false,
            success: function (data) {
                productos = data;
            },
            complete: function () {
                $('#txtPROD_CODE').parent().html('<input id="txtPROD_CODE" class="span12" type="text" next="#txtPROD_DESC" style="text-transform: uppercase">');
                autocompletarCodigoProducto('#txtPROD_CODE', '');
                $("#txtPROD_DESC").parent().html('<input id="txtPROD_DESC" class="span12" type="text" data-provide="typeahead" />');
                autocompletarProducto('#txtPROD_DESC', '');
            },
            error: function (msg) {
                alertCustom('Error al listar productos.');
            }
        });
    };

    var cargaInicial = function () {
        igv();
        var cod = ObtenerQueryString("codigo");
        if (cod != undefined) {
            $.ajax({
                type: 'post',
                url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=4&P_CATALOGO=' + "" + '&P_SUCURSAL=' + "" + '&ISAC_CODE=' + cod,
                contenttype: "application/json",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null && datos != "") {

                        $('#mano').remove();
                        $('#detalleProd').remove();
                        $('#prueba').remove();
                        $('#divMno').remove();

                        $('#cboEmpresas').attr('disabled', true);
                        $('#cboEstablecimiento').attr('disabled', true);

                        $('#txtCodigoFabricacion').val(cod);
                        $('#txt_cod_a_producto,#txt_desc_producto').attr('disabled', true)
                        $('#txthorasTrabaja').attr('disabled', true)

                        $('#cboEmpresas').val(datos[0].CATALOGO)
                        $('#cboEstablecimiento').val(datos[0].SUCURSAL)
                        //$('#hfCOD_PROD').val()

                        $('#txttotalProFaS').val(datos[0].TOTALSIGV)
                        $('#txttotalProFac').val(datos[0].TOTALCIGV)

                        $('#totalSinIGV').val(datos[0].TOTAL_PRODSIGV)
                        $('#totalConIGV').val(datos[0].TOTAL_PRODCIGV)

                        $('#txtHoraSueldo').val(datos[0].SUELDO_HORA)
                        $('#txthorasTrabaja').val(datos[0].HORAS_TRABA)
                        $('#txttotalEmpleados').val(datos[0].TOTAL_MANO_OBRA)
                        $('#txt_cod_a_producto').val(datos[0].CODIGO_ANTIGUO)
                        $('#txt_desc_producto').val(datos[0].PRODUCTO)
                        //
                        $("#txtNroSerie").val(datos[0].NRO_SERIE);
                        $("#txtFechaEnsamblaje").val(datos[0].FECHA_ENSAMBLAJE);
                        $("#txtFechaMovimiento").val(datos[0].FECHA_MOVIMIENTO);
                        $("#txtAlmacenero").val(datos[0].ALMACENERO);
                        $("#hfPidmAlmacenero").val(datos[0].PIDM_ALMACENERO);
                        $("#txtCentroCostos").val(datos[0].CENTRO_COSTOS);
                        $("#hfCECC_CODE").val(datos[0].CECC_CODE);
                        $("#hfCENTRO_COSTOS").val(datos[0].CECD_CODE);
                        $("#hfCOD_PROD").val(datos[0].PROD_CODE)


                        llenaTabla(cod);
                        llenaMnoObra(cod);

                        $('#detalleGeneral').DataTable().columns(12).visible(false);
                        $('#detalleEmpleado').DataTable().columns(3).visible(false);
                        BloquearCampos();

                    }
                    else {
                        alertCustom("Error")
                    }
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
        }
    }

    function igv() {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    if (!isNaN(parseFloat(datos[0].VALOR))) {
                        $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                    } else {
                        infoCustom2("El parámetro de Impuesto(0002) no es válido. Se considerará IGV 18%")
                        $('#hfIMPUESTO').val("18");
                    }
                }
                else { alertCustom("No se recuperó el impuesto correctamente!"); }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function REGISTRAR() {
        var tablas = ObtenerDatosTabla();
        var data = new FormData;

        data.append('p_GLOSA_GENERAL', $('#txtGlosa_general').val());
        data.append('p_SOLICITA', $('#ctl00_txtus').val());
        data.append('p_FECHA', $('#txtFecha').val());
        data.append('p_PRIORIDAD', $('#cbPrioridad').val());
        data.append('p_TIPOREQ', $('#cboRque').val());
        data.append('p_AREA1', $('#cboArea').val());

        data.append('p_SECCION1', $('#cboSeccion').val());
        data.append('p_PROCESO1', $('#cboProceso').val());
        data.append('p_ACTIVIDAD', $('#cboActividad').val());

        data.append('p_GLOSA', $('#txtGlosa').val());
        data.append('p_USUARIO1', $('#ctl00_txtus').val());
        data.append('p_CATALOGO', $("#cboEmpresas").val());
        data.append('p_ESTABLECIMIENTO', $("#cboEstablecimiento").val());
        data.append('p_detalle', tablas);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=6",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (datos) {
                Desbloquear("ventana");
                $('#txtRequi').val(datos)
                exito();
                window.location.href = '?f=NOMRCOM&codigo=' + datos;

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            fillCboMoneda();
            //----
            cargarUnidadesMedida();
            cargarEmpleados();
            $('#txtAlmacenero').parent().html('<input id="txtAlmacenero" class="span12" type="text" style="text-transform: uppercase" />');
            autocompletarAlmacenero('#txtAlmacenero', '');
            cargarProductos();
          
            $("#txtCentroCostos").parent().html('<input id="txtCentroCostos" class="span12" type="text" style="text-transform: uppercase" />');
            autocompletarCentroCostos('#txtCentroCostos', '');
            //----
            tabla();
            tablaEmpl();
            cargaInicial();

            var estilos = '<style id="styleImpresion">@media print{.navbar-inner{display:none!important}.page-sidebar{display:none!important}.footer{display:none!important}.page-content{margin-left:0!important}#gritter-notice-wrapper{display:none!important}#contenedor{display:none!important}#contenedorBreadcrumb{display:none!important}.page-container{margin-top:0!important}#divDctoImprimir{display:block!important;width:100%!important;line-height:11px!important;font-family:Arial!important}.container-fluid{padding:0!important}.dn{display:none !important;}}</style>';
            $("#ventana").append(estilos);
        }
    };

}();

//fillTxtProducto: PRODUCTO FABRICADO POR TIPO DE EXISTENCIA
function fillTxtProducto(v_ID, v_value, SERVICIO, TEXTI) {
    $('#divCodigoProd').html('<input id="txt_cod_a_producto" class="span12" type="text" style="margin-left:-2px;" placeholder="Código" />');
    $("#divDescProd").html("<input id='txt_desc_producto' class='span12' type='text' placeholder='Nombre' />");
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresas").val() +
            "&TEXTI=" + TEXTI +
            "&SERVICIO=" + SERVICIO +
            "&SERIADO_IND=S",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: false,
        success: function (datos) {
            //DESCRIPCION DE PRODUCTO
            var selectRazonSocial = $("#txt_desc_producto");
            v_ID="#txt_desc_producto";
            if (datos != null) {
                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].DESC_ADM);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","CODIGO_ANTIGUO":"' + datos[i].CODIGO_ANTIGUO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","STOCK":"' + datos[i].STOCK + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';
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
                        $("#txtUnidad").val(map[item].DESC_UNIDAD_DESPACHO);
                        $("#hfCOD_PROD").val(map[item].CODIGO);
                        $("#hdcodUNI").val(map[item].UNIDAD);
                        $("#txt_cod_a_producto").val(map[item].CODIGO_ANTIGUO);
                        return item;
                    },
                });
                selectRazonSocial.keyup(function (e) {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(v_ID).val().length <= 0) {
                        $("#hfCOD_PROD").val("");
                        $("#hdcodUNI").val("");
                        $("#txtUnidad").val("");
                    } else {
                        var key = e.keyCode ? e.keyCode : e.which;
                        if ($(v_ID).val() != "" && $("#hfCOD_PROD").val() != "") {
                            if (key === 13) {
                                $('#txtNroSerie').focus();
                            }
                        }
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
            //CODIGO DE PRODUCTO
            var selectRazonSocial = $("#txt_cod_a_producto");
            v_ID = "#txt_cod_a_producto";
            if (datos != null) {
                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].CODIGO_ANTIGUO);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","CODIGO_ANTIGUO":"' + datos[i].CODIGO_ANTIGUO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","STOCK":"' + datos[i].STOCK + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';
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
                        $("#txtUnidad").val(map[item].DESC_UNIDAD_DESPACHO);
                        $("#hfCOD_PROD").val(map[item].CODIGO);
                        $("#hdcodUNI").val(map[item].UNIDAD);
                        $("#txt_desc_producto").val(map[item].DESC_ADM);
                        return item;
                    },
                });
                selectRazonSocial.keyup(function (e) {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(v_ID).val().length <= 0) {
                        $("#hfCOD_PROD").val("");
                        $("#hdcodUNI").val("");
                        $("#txtUnidad").val("");
                    } else {
                        var key = e.keyCode ? e.keyCode : e.which;
                        if ($(v_ID).val() != "" && $("#hfCOD_PROD").val() != "") {
                            if (key === 13) {
                                $('#txtNroSerie').focus();
                            }
                        }
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });   
}

function filltxtEmpleado(v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NC/estereotipos/ajax/Empleado.ashx?OPCION=CONT&PIDM=" + 0 + "&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val() + "&ESTADO_IND=" + "F",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: false,
        success: function (datos) {
            if (datos != null) {
                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].NOMBRE_EMPLEADO);
                            obj += '{';
                            obj += '"PIDM":"' + datos[i].PIDM + '","HORAS_CONTRATO":"' + datos[i].HORAS_CONTRATO + '","NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '","REM_TOTAL":"' + datos[i].REM_TOTAL + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE_EMPLEADO] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        $("#emplPidm").val(map[item].PIDM);
                        $("#emplNombres").val(map[item].NOMBRE_EMPLEADO);
                        $("#emplSueldo").val((parseFloat(map[item].REM_TOTAL) / (parseFloat(map[item].HORAS_CONTRATO) * 4)).toFixed(2));
                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
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
            $('#cboEmpresas').empty();
            $('#cboEmpresas').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                //Iniciar valores con valores de login
                $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();
                fillCboEstablecimiento();
                fillTxtProducto('#txt_desc_producto', '', '', '02,');
                filltxtEmpleado('#txtEmpleado', '');
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var fillCboEstablecimiento = function () {
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + $('#cboEmpresas').val(),
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
            $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
        },
        error: function (msg) {
            alertCustom("Establecimientos no se listaron correctamente");
        }
    });
}

var fillCboMoneda = function () {
    $('#cboMoneda').select2('destroy');
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboMoneda').empty().append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboMoneda').val("");
        },
        error: function (msg) {
            alertCustom("Monedas no se listaron correctamente.");
        }
    });
    $('#cboMoneda').select2();
}

var documentoSeleccionado = function (strdoc) {
    var inputs = $('.txtCodigoDoc');
    var docsseleccionados = "";
    for (var c = 0; c < inputs.length; c++) {
        var input = inputs[c];
        docsseleccionados += $(input).val() + ',';
    }
    return docsseleccionados.indexOf(strdoc) > -1;
};

var buscarDocumento = function (btnBuscar) {
    $('#tblDocumentos').DataTable().destroy();
    var tbody = $('#tblDocumentos').find('tbody');
    $.ajax({
        type: 'post',
        url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=1&TIPO_DCTO=' + '0001' + "&CTLG_CODE=" + $('#cboEmpresas').val() + "&COD_ALMC=" + $('#cboEstablecimiento').val(),
        contenttype: "application/json",
        datatype: "json",
        async: false,
        success: function (datos) {
            tbody.html('');
            if (datos !== null && datos.length > 0) {
                for (var i = 0; i < datos.length; i++) {
                    tbody.append('<tr><td style="text-align: center">' + datos[i].CODIGO + '</td><td style="text-align: center">' + datos[i].NUM_DCTO + '</td><td style="text-align: center">' + datos[i].PROVEEDOR + '</td><td style="text-align: center">' + datos[i].IMPORTE + '</td></tr>');
                }
            }
            Desbloquear('generales');
        },
        error: function (msg) {
            alertCustom(msg);
        }
    });
    tabla = $('#tblDocumentos').DataTable({ info: false, responsive: true, order: [[0, 'desc']], ordering: false });
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
            $(padre).find('.txtCodigoDoc').val(cod_doc);
            $(padre).find('.txtnumdocOrigenserie').val(serie);
            $(padre).find('.txtnumdocOrigen ').val(nro);
            $(padre).find('.buscar').css('display', 'none');
            $('#divBuscarDoc').modal('hide');

        } else {
            alertCustom('Documento ya seleccionado en la lista de Documentos de Origen.');
            $(this).removeClass('selected');
        }
    });

    //var th = tabla.column(2).header();
    //var cMonto = tabla.column(3);
    //if ($('#cboOrigen').val() === '0028' || $('#cboOrigen').val() === '0052') {
    //    $(th).text('SOLICITANTE');
    //    cMonto.visible(false);
    //} else {
    //    $(th).text('PROVEEDOR');
    //    cMonto.visible(true);
    //}
}

function ListaProdDetalle(codigo) {
    if (codigo == "") {
        alertCustom("Seleccione un numero de documento");
        return;
    }

    $.ajax({
        type: 'post',
        url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=2&ISAC_CODE=' + codigo,
        contenttype: "application/json",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null && datos.length > 0) {
                llenaDetalle(datos);
                $('#MDETALLE').modal('show');
            }
            else {
                alertCustom("No hay movimientos en almacen");
            }

        },
        error: function (msg) {
            alertCustom(msg);
        }
    });

}

function llenaDetalle(datos) {
    var parms = {
        data: datos,
        responsive: true,
        searching: false,
        "sDom": "t",
        "paging": false,
        "bAutoWidth": false,
        order: [[0, 'desc']],
        columns: [
            {
                data: "CODIGO_PADRE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }
            ,
            {
                data: "CODIGO_HIJO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'display:none')
                }
            }
            ,
             {
                 data: "FACTURA",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                 }
             }
            ,

            {
                data: "GUIA_CODE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }
            ,

            {
                data: "ITEM",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },


             {
                 data: "PRODUCTO",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                 }
             },
            {
                data: "DESC_PRODUCTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }
            ,
            {
                data: "CANTIDAD_BASE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }
           ,
            {
                data: "MONTO_UNID_PRODCTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "CODIGO_BARRAS",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }
        ]
    }

    $('#detalle').dataTable().fnDestroy();

    oTableTReg = iniciaTabla('detalle', parms);

    $('#detalle tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTableTReg.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTableTReg.fnGetPosition(this);
            var row = oTableTReg.fnGetData(pos);

            var DCODIGO = row.CODIGO_PADRE;
            var FACTURA = row.FACTURA;
            var DCODIGO_GUIA = row.GUIA_CODE;
            var NITEM = row.ITEM;
            var CODE_PROD = row.PRODUCTO;
            var DES_PROD = row.DESC_PRODUCTO;
            var CANTIDAD_V = row.CANTIDAD_BASE;
            var PRECIO_VALORIZADO = parseFloat(row.MONTO_UNID_PRODCTO);
            var CODIGO_BARRAS = row.CODIGO_BARRAS;
            var CODIGO_HIJO = row.CODIGO_HIJO;
            var UNME_CODE = $("#cboUniMedida").val();

            var CENTRO_COSTOS = $("#txtCentroCostos").val();
            var CECC_CODE = $("#hfCECC_CODE").val();
            var CECD_CODE = $("#hfCENTRO_COSTOS").val();

            if (CANTIDAD_V == 0) {
                alertCustom("La cantidad de este item es 0")
            }
            else {

                GrabarDet(DCODIGO, FACTURA, DCODIGO_GUIA, NITEM, CODE_PROD, DES_PROD, CANTIDAD_V, PRECIO_VALORIZADO, CODIGO_BARRAS, CODIGO_HIJO, UNME_CODE, CENTRO_COSTOS, CECC_CODE, CECD_CODE)

            }
        }
    });

}

function buscarDocumento1(v) {
    buscarDocumento(v)
    eliminarDetalle($('#txtCodigoDoc_0').val(), "")

    var tIGV = CalculaTotalPrSinIgv();
    $('#totalSinIGV').val(tIGV.toFixed(2));

    var conigv = CalculaTotalPrConIgv();
    $('#totalConIGV').val(conigv.toFixed(2));

    totalTotales();
}

function ListaProdDetalle1() {
    ListaProdDetalle($('#txtCodigoDoc_0').val());
}

function ValidaDecimales(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
    // 0-9 a partir del .decimal 
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                regexp = /[0-9]{3}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        regexp = /[0-9]{10}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}

function llenaMnoObra(codigo) {
    $.ajax({
        type: 'post',
        url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=6&ISAC_CODE=' + codigo,
        async: false,
        success: function (datos) {
            if (datos !== null && datos.length > 0) {
                $('#nuevoMano').html(datos);
                $("#tblbmodal1").DataTable({
                    "scrollX": "true",
                    //"sDom": 't',
                    "sPaginationType": "full_numbers",
                    "iDisplayLength": -1
                });
            }
            else {
                alertCustom("Error");
            }

        },
        error: function (msg) {
            alertCustom(msg);
        }
    });
}

function llenaTabla(codigo) {
    $.ajax({
        type: 'post',
        url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=5&ISAC_CODE=' + codigo,
        async: false,
        success: function (datos) {
            if (datos !== null && datos.length > 0) {
                $('#nuevoDetalle').html(datos);
                $("#tblbmodal").DataTable({
                    "scrollX": "true",
                  //  "sDom": 't',
                    "sPaginationType": "full_numbers",
                    "iDisplayLength": -1
                })
            }
            else {
                alertCustom("No hay movimientos en almacen");
            }
        },
        error: function (msg) {
            alertCustom(msg);
        }
    });
}

function tablaLLenada(data) {

    var parms = {
        data: data,
        responsive: true,
        scrollX: true,
        columns: [
            { data: "FACC" },
            { data: "FACTURA" },
            { data: "GUIA" },
            { data: "ITEM" },
            { data: "PRODUCTO_CODE" },
            { data: "SERIE" },
            { data: "PRODUCTO" },
            {
                data: "CANT_COMPRA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');
                }
            },
            {
                data: "PRE_COMPRA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');

                }
            },
            {
                data: "CANT_USAR",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');

                }
            },
            {
                data: "TOTALSIGV",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');

                }
            },
            {
                data: "TOTALCIGV",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');

                }
            },
            { data: null },
            { data: null, }
        ]
    }
    oTableActividad = iniciaTabla('detalleGeneral', parms);
    flagTbDetalle = true;
    $('#detalleGeneral').removeAttr('style');
}

var tabla = function () {

    var parms = {
        data: null,
        responsive: true,
        scrollX: true,
        bAutoWidth: false,
        columns: [
            { data: "DCODIGO" },
            { data: "FACTURA" },
            { data: "GUIA" },
            {
                data: "NITEM",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:center');
                }
            },
            {
                data: "CODE_PROD",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:center');
                }
            },
            { data: "SERIE_PROD" },
            { data: "DES_PROD" },
            {
                data: "CANTIDAD_V",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');

                }
            },
            {
                data: "PRECIO_VALORIZADO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');

                }
            },
            {
                data: "CANTIDAD",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('style', 'text-align:right');

                    if (rowData.SERIE_PROD == "") {
                        if (rowData.CANTIDAD != "") {
                            $(td).html("<input id=\"txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "_" + rowData.GUIA + "\"   tabindex=\"txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "\"  value='" + rowData.CANTIDAD + "' class='right cantidad' onkeypress='return ValidaDecimales(event,this)' />");
                        } else {
                            $(td).html("<input id=\"txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "_" + rowData.GUIA + "\"   tabindex=\"txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "\"  value='" + rowData.CANTIDAD_V + "' class='right cantidad' onkeypress='return ValidaDecimales(event,this)' />");
                        }
                        codigodeCaja = "txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "_" + rowData.GUIA;

                    } else {
                        $(td).html("<input id=\"txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "_" + rowData.GUIA + "\"   tabindex=\"txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "\"  value='" + rowData.CANTIDAD_V + "' class='right cantidad' onkeypress='return ValidaDecimales(event,this)' disabled='disabled' />");
                        codigodeCaja = "txt_" + rowData.DCODIGO + "_" + rowData.NITEM + "_" + rowData.GUIA;
                    }

                    $(td).children(".cantidad").blur(function () {
                     
                        if ($(this).val() == "") {
                            return;
                        }
                        else {
                            if (parseFloat(rowData.CANTIDAD_V) >= parseFloat($(this).val())) {

                                rowData.CANTIDAD = $.trim($(this).val());

                                //TOTAL SIN IGV
                                //$("#" + rowData.DCODIGO + "_" + rowData.GUIA + "_" + rowData.NITEM).html((parseFloat($(this).val()) * parseFloat(rowData.PRECIO_VALORIZADO)).toFixed(2));
                                rowData.TOTAL = (parseFloat($(this).val()) * parseFloat(rowData.PRECIO_VALORIZADO)).toFixed(2)

                                var cigv = ($(this).val() * rowData.PRECIO_VALORIZADO).toFixed(2);
                                var igv = ($('#hfIMPUESTO').val())
                                var igvt = (parseFloat(cigv) + ((parseFloat(igv) / 100.00) * parseFloat(cigv)));

                                //TOTAL CON IGV
                                // $("#S" + rowData.DCODIGO + "_" + rowData.GUIA + "_" + rowData.NITEM).html((igvt).toFixed(2));
                                rowData.CTOTAL = (igvt).toFixed(2);

                                var t = $("#detalleGeneral").dataTable();
                                var data = $("#detalleGeneral").dataTable().fnGetData();
                                var cant = data.length;
                                for (var i = 0; i < cant; i++) {
                                    t.fnAddData(data[i]);
                                }
                                for (var i = 0  ; i < cant; i++) {
                                    t.fnDeleteRow(0);
                                }

                                var sinIGV = CalculaTotalPrSinIgv();
                                $('#totalSinIGV').val(sinIGV.toFixed(2));

                                var conigv = CalculaTotalPrConIgv();
                                $('#totalConIGV').val(conigv.toFixed(2));

                                totalTotales();
                            }
                            else {
                                alertCustom("Ingrese una cantidad menor");
                                $(this).val(0);
                                return;
                            }
                            //$(td).children(".Cprec").val(formatoMiles($(this).val()));
                            //prec_ref = 0;
                        }
                    });



                }
            },
            {
                data: "TOTAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('id', rowData.DCODIGO + "_" + rowData.GUIA + "_" + rowData.NITEM)
                    $(td).attr('style', 'text-align:right');

                }
            },
             {
                 data: "CTOTAL",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('id', "S" + rowData.DCODIGO + "_" + rowData.GUIA + "_" + rowData.NITEM)
                     $(td).attr('style', 'text-align:right');

                 }
             },
             //{
             //    data: "CENTRO_COSTOS",
             //    createdCell: function (td, cellData, rowData, row, col) {
             //        $(td).attr('style', 'display:none')
             //    }
             //},
             {
                 data: null,
                 defaultContent: '<a  class="btn red eliminar"><i class="icon-trash"></i></a>',
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                 }
             }
             //{
             //    data: "CODIGO_HIJO",
             //    createdCell: function (td, cellData, rowData, row, col) {
             //        $(td).attr('style', 'display:none')
             //    }
             //},
             //{
             //    data: "UNME_CODE",
             //    createdCell: function (td, cellData, rowData, row, col) {
             //        $(td).attr('style', 'display:none')
             //    }
             //},
             //{
             //    data: "CECC_CODE",
             //    createdCell: function (td, cellData, rowData, row, col) {
             //        $(td).attr('style', 'display:none')
             //    }
             //},
             // {
             //     data: "CECD_CODE",
             //     createdCell: function (td, cellData, rowData, row, col) {
             //         $(td).attr('style', 'display:none')
             //     }
             // }
        ]
    }

    oTableActividad = iniciaTabla('detalleGeneral', parms);
    flagTbDetalle = true;
    $('#detalleGeneral').removeAttr('style');

    $('#detalleGeneral tbody').on('click', '.eliminar', function () {

        var pos = oTableActividad.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableActividad.fnGetData(pos);
        oTableActividad.fnDeleteRow(pos);
        var sinIGV = CalculaTotalPrSinIgv();
        $('#totalSinIGV').val(sinIGV.toFixed(2));

        var conigv = CalculaTotalPrConIgv();
        $('#totalConIGV').val(conigv.toFixed(2));
        totalTotales();
    });

    $('#detalleGeneral tbody').on('keydown', 'input', function (e) {

        if (e.keyCode == 13) {
            var curreTabindex = $(this).attr('tabindex');
            var nextabindex = parseInt(curreTabindex) + 1;
            var nextfield = $('[tabindex=' + nextabindex + ']');

            if (nextfield.length > 0) {
                nextfield.focus();
                e.preventDefault();
            }
            //else {
            //    $('#idRegis').on('click');
            //}
        }
    });

}

var tablaEmpl = function () {
    var parms = {
        data: null,
        responsive: true,
        searching: false,
        "sDom": "t",
        "paging": false,
        columns: [

            { data: "PIDM" },
            { data: "EMPLEADO" },
            {
                data: "SUELDO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'right');
                }
            },
            {
                data: null,
                defaultContent: '<a  class="btn red eliminar"><i class="icon-trash"></i></a>',
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }
        ]
    }

    oTableEmpleado = iniciaTabla('detalleEmpleado', parms);

    $('#detalleEmpleado tbody').on('click', '.eliminar', function () {
        var pos = oTableEmpleado.api(true).row($(this).parents("tr")[0]).index();
        var row = oTableEmpleado.fnGetData(pos);
        oTableEmpleado.fnDeleteRow(pos);

        var horas = CalculaTotalHoras();
        $('#txtHoraSueldo').val(horas.toFixed(2));

        sumarHoras();
        totalTotales();
    });
}

function eliminarDetalle(codigo, valor) {
    if (valor != "") {
        valor.parent().parent().parent().parent().parent().parent().parent().remove()
    }
    if (codigo != "") {
        $('#detalleGeneral tbody').children().each(function (i) {

            var CODIGO_PROD;

            CODIGO_PROD = $(this).find('td').eq(0).text();

            if (codigo == CODIGO_PROD) {

                var x = $("#detalleGeneral").dataTable().fnGetData();
                var x1 = x;
                x.filter(function (d, e) {
                    if (d.DCODIGO == CODIGO_PROD) {
                        oTableActividad.fnDeleteRow(e)
                        //x1.splice(e, 1)
                    }
                });

                //var y = $("#detalleGeneral").dataTable();
                //y.fnClearTable();
                //if (x.length > 0) {
                //    y.fnAddData(x);
                //}
            }



        });

        var tIGV = CalculaTotalPrSinIgv();
        $('#totalSinIGV').val(tIGV.toFixed(2));

        var conigv = CalculaTotalPrConIgv();
        $('#totalConIGV').val(conigv.toFixed(2));
        totalTotales();
    }
}

//GrabarDet(DCODIGO, DCODIGO_GUIA, NITEM, CODE_PROD, DES_PROD, CANTIDAD_V, PRECIO_VALORIZADO, CODIGO_BARRAS)
function GrabarDet(DCODIGO, FACTURA, DCODIGO_GUIA, NITEM, CODE_PROD, DES_PROD, CANTIDAD_V, PRECIO_VALORIZADO, CODIGO_BARRAS, CODIGO_HIJO, UNME_CODE, CENTRO_COSTOS, CECC_CODE, CECD_CODE) {

    var a = {
        "DCODIGO": DCODIGO,
        "FACTURA": FACTURA,
        "GUIA": DCODIGO_GUIA,
        "NITEM": NITEM,
        "CODE_PROD": CODE_PROD,
        "SERIE_PROD": CODIGO_BARRAS,
        "DES_PROD": DES_PROD,
        "CANTIDAD_V": CANTIDAD_V,
        "PRECIO_VALORIZADO": parseFloat(PRECIO_VALORIZADO),
        "CANTIDAD": 0,
        "TOTAL": 0,
        "CTOTAL": 0,
        "CODIGO_HIJO": CODIGO_HIJO,
        "UNME_CODE": UNME_CODE,
        "CENTRO_COSTOS": CENTRO_COSTOS,
        "CECC_CODE": CECC_CODE,
        "CECD_CODE": CECD_CODE
    }

    var ar = oTableActividad.fnGetData();
    var continuar = true;
    ar.filter(function (e, f) {

        //if (e.DCODIGO == DCODIGO && e.NITEM == NITEM && e.GUIA == DCODIGO_GUIA) {
        if (prodActual.NO_SERIADA == "S" || CODIGO_BARRAS == "") {//PRODUCTOS NO SERIADOS
            if (e.CODE_PROD == CODE_PROD || ((e.DCODIGO != "" && DCODIGO != "") ? (e.DCODIGO == DCODIGO && e.NITEM == NITEM) : false)) {
                alertCustom("El producto ya se encuentra en la lista!");
                continuar = false;
            }
        } else {//PRODUCTO SERIADO
            if (e.SERIE_PROD == CODIGO_BARRAS || ((e.DCODIGO != "" && DCODIGO != "") ? (e.DCODIGO == DCODIGO && e.NITEM == NITEM && e.CODIGO_HIJO == CODIGO_HIJO) : false)) {
                alertCustom("El producto ya se encuentra en la lista!");
                continuar = false;
            }
        }

    });

    if (continuar) {
        var c = $("#detalleGeneral_rppag").val();
        if (c != "-1") {
            $("#detalleGeneral_rppag").val("-1").change();
        }
        oTableActividad.fnAddData(a);
        $(".cantidad").blur();
        if (c != "-1") {
            $("#detalleGeneral_rppag").val(c).change();
        }

        //SI ES PRODUCTO SERIADO, entonces bloquear Datos
        if (CODIGO_BARRAS != "") {
            //var id = codigodeCaja
            ////var x = "#txt_" + e.DCODIGO + "_" + e.NITEM + " ";
            //$("#" + id + "").val(CANTIDAD_V);
            //$("#" + id + "").focus();
            //$("#" + id + "").attr('disabled', true);
        }
    }

    $("#txtPROD_CODE").focus();
}

function GrabarEmpl(pidm, empleado, sueldo) {
    var e = {
        "PIDM": pidm,
        "EMPLEADO": empleado,
        "SUELDO": sueldo
    }
    var emp = oTableEmpleado.fnGetData();
    var flagEmpl = false;
    emp.filter(function (e, f) {
        if (e.PIDM == pidm) {
            alertCustom("Empleado ya esta en la lista")
            flagEmpl = true;
        }
    });

    if (!flagEmpl) {
        oTableEmpleado.fnAddData(e);
    }

}

function CalculaTotalHoras() {
    var total = 0;

    var d = $("#detalleEmpleado").dataTable();
    var datos = d.fnGetData();
    for (var i = 0; i < datos.length; i++) {
        total += parseFloat(datos[i].SUELDO);
    }

    if (isNaN(total)) {
        total = 0;
    }

    return total;
}

function CalculaTotalPrSinIgv() {
    var total = 0;

    var d = $("#detalleGeneral").dataTable();
    var datos = d.fnGetData();
    for (var i = 0; i < datos.length; i++) {
        total += parseFloat(datos[i].TOTAL);
    }

    if (isNaN(total)) {
        total = 0;
    }

    return total;
}

function CalculaTotalPrConIgv() {
    var total = 0;

    var d = $("#detalleGeneral").dataTable();
    var datos = d.fnGetData();
    for (var i = 0; i < datos.length; i++) {
        total += parseFloat(datos[i].CTOTAL);
    }  

    if (isNaN(total)) {
        total = 0;
    }
    return total;
}

function sumarHoras() {
    var hor = 0;

    if ($('#txtHoraSueldo').val() == "") {
        hor = 0;
    }
    else {
        hor = parseFloat($('#txtHoraSueldo').val());
    }
    if ($('#txthorasTrabaja').val() == "") {
        infoCustom2("Ingrese Horas Trabajadas")
        var d = $("#detalleEmpleado").dataTable();
        var datos = d.fnGetData();
        if (datos.length != 0) {
            $('#txthorasTrabaja').val("0");
        }
        return;
    }
    else {
        $('#txttotalEmpleados').val((hor * parseFloat($('#txthorasTrabaja').val())).toFixed(2));
    }
}

function ObtenerDatosManoObra() {
    var datos_tabla;
    var datos_fila = '';
    var d = $("#detalleEmpleado").dataTable();
    var datos = d.fnGetData();
    for (var i = 0; i < datos.length; i++) {
        //JSON datos: EMPLEADO: "NOMBRE DEL EMPLEADO"  |  PIDM: "2716"| SUELDO: "5.21"                
        var PIDM, SUELDO;
        PIDM = datos[i].PIDM;
        SUELDO = datos[i].SUELDO;
        ITEMS = i + 1;
        datos_fila += PIDM + ',' + SUELDO;
        datos_fila += '|';
    }
    datos_fila = datos_fila + '|';
    datos_tabla = datos_fila.replace('||', '');
    if (datos.length == 0) {
        datos_tabla = "";
    }
    return datos_tabla;
}

//DEVUELVE LOS DATOS DE LA TABLA CONCATENADO POR "," y "|"
function ObtenerDatosTabla() {

    var datos_tabla;
    var datos_fila = '';
  
    var d = $("#detalleGeneral").dataTable();
    var datos = d.fnGetData();
    for (var i = 0; i < datos.length; i++) {

        var P_CODE_FABFACC, P_FACTURA, P_ITEM, P_COD_PROD, P_SERIE, P_CANTIDAD_COMP, P_CANTIDA_USAR, P_TOTALSIGV, P_TOTALCIGV, P_PRECIO_COMP, P_GUIA, P_CODE_HIJO, serieaux, serieaux1;
        serieaux = datos[i].SERIE_PROD;
        if (serieaux == '') {
            serieaux1 = '';
        }
        else {
            serieaux1 = datos[i].SERIE_PROD;
        }       

        P_CODE_FABFACC = datos[i].DCODIGO;
        P_FACTURA = datos[i].FACTURA;
        P_ITEM = datos[i].NITEM;
        P_COD_PROD = datos[i].CODE_PROD;
        P_SERIE = serieaux1;
        P_CANTIDAD_COMP = datos[i].CANTIDAD_V;
        P_CANTIDA_USAR = datos[i].CANTIDAD;
        P_TOTALSIGV = datos[i].TOTAL;
        P_TOTALCIGV = datos[i].CTOTAL;
        P_PRECIO_COMP = datos[i].PRECIO_VALORIZADO;
        P_GUIA = datos[i].GUIA;
        P_CODE_HIJO = datos[i].CODIGO_HIJO;
        P_UNME_CODE = datos[i].UNME_CODE;

        ITEMS = i + 1;
        datos_fila += P_CODE_FABFACC + ',' + P_FACTURA + ',' + P_ITEM + ',' + P_COD_PROD + ',' + P_SERIE + ',' + P_CANTIDAD_COMP + ',' + P_CANTIDA_USAR + ',' + P_TOTALSIGV + ',' + P_TOTALCIGV + ',' + P_PRECIO_COMP + ',' + P_GUIA + ',' + P_CODE_HIJO + ',' + P_UNME_CODE;
        datos_fila += '|';
    }

    datos_fila = datos_fila + '|';
    datos_tabla = datos_fila.replace('||', '');
    if (datos.length == 0) {
        datos_tabla = "";
    }
    return datos_tabla;
}

function totalTotales() {
    var tsigv = parseFloat($('#totalSinIGV').val()).toFixed(2);

    var tcigv = parseFloat($('#totalConIGV').val()).toFixed(2);

    if (isNaN(parseFloat(tsigv))) {
        tsigv = 0.00;
    }

    if (isNaN(parseFloat(tcigv))) {
        tcigv = 0.00;
    }
    //----------------------------------------------

    var ths = parseFloat($('#txttotalEmpleados').val()).toFixed(2);

    if (isNaN(ths)) {
        ths = 0.00;
    }

    var totasIGV = (parseFloat(tsigv) + parseFloat(ths)).toFixed(2);

    if (isNaN(totasIGV)) {
        totasIGV = 0.00;
    }

    var totalCigv = (parseFloat(tcigv) + parseFloat(ths)).toFixed(2);

    if (isNaN(totalCigv)) {
        totalCigv = 0.00;
    }

    $('#txttotalProFaS').val(totasIGV);
    $('#txttotalProFac').val(totalCigv);
}

function Guardar() {
    var continuar = true;
    if (vErrors(['txt_desc_producto', 'txtFechaEnsamblaje', 'txtFechaMovimiento', 'txtNroSerie', 'txtAlmacenero'])) {
        if ($("#hfCOD_PROD").val() == "") {
            continuar = false;
            alertCustom("Seleccione un producto a fabricar válido");
        } else if ($("#hfPidmAlmacenero").val() == "") {
            continuar = false;
            alertCustom("Seleccione un almacenero válido");
        } else if ($("#hfCECC_CODE").val() == "" || $("#hfCENTRO_COSTOS").val() == "") {
            continuar = false;
            alertCustom("Seleccione un centro de costos válido");
        }
    } else {
        continuar = false;
    }

    if (continuar) {
        //Calcular();
        var datos = ObtenerDatosTabla();
        var datosMno = ObtenerDatosManoObra();
        var data = new FormData;
        //var pidm = $("#txtpersona").attr("valor");
        data.append('P_TEXT', datos);
        data.append('P_TEXTM', datosMno);
        //data.append('p_DOC_ORIG_NRO', '');
        //data.append('p_DESPACHO', $('#cbx_destino').val());
        //data.append('p_ENTREGA', $("#txt_comentario").val());
        //data.append('p_PROVEDOR_TIPODOC', $("#cboTipoDoc").val());
        data.append("P_CATALOGO", $('#cboEmpresas').val())
        data.append("P_SUCURSAL", $('#cboEstablecimiento').val())
        data.append("P_COD_PRD", $('#hfCOD_PROD').val())
        data.append("P_TSIGV", $('#totalSinIGV').val() == "" ? "0" : $('#totalSinIGV').val())
        data.append("P_TIGV", $('#totalConIGV').val() == "" ? "0" : $('#totalConIGV').val())
        data.append("P_TSHORA", $('#txtHoraSueldo').val() == "" ? "0" : $('#txtHoraSueldo').val())
        data.append("P_THORAS_TRABAJ", $('#txthorasTrabaja').val() == "" ? "0" : $('#txthorasTrabaja').val())
        data.append("P_TOTAL_MANO", $('#txttotalEmpleados').val() == "" ? "0" : $('#txttotalEmpleados').val())
        data.append("P_TOTAL_SIN_IGV", $('#txttotalProFaS').val() == "" ? "0" : $('#txttotalProFaS').val())
        data.append("P_TOTAL_CON_IGV", $('#txttotalProFac').val() == "" ? "0" : $('#txttotalProFac').val())

        data.append("P_FECHA_ENSAMBLAJE", $('#txtFechaEnsamblaje').val());
        data.append("P_FECHA_MOVIMIENTO", $('#txtFechaMovimiento').val());
        data.append("P_PIDM_ALMACENERO", $('#hfPidmAlmacenero').val());
        data.append("P_CECC_CODE", $('#hfCECC_CODE').val());
        data.append("P_CECD_CODE", $('#hfCENTRO_COSTOS').val());
        data.append("P_NRO_SERIE", $('#txtNroSerie').val());
        data.append("P_MCDR_CODE", $('#hfMcdrCode').val());
        data.append("P_USUA_ID", $('#ctl00_lblusuario').html());
        data.append("P_ALMC_CODE", $("#cboEstablecimiento :selected").attr("data-almc"));

        //data.append("P_USUA_PIDM", $('#hfPidmAlmacenero').val());

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=3',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");

                if (datos[0].RESPUESTA == "SERIE") {
                    alertCustom("El número de serie indicado ya existe!");
                } else if (datos[0].RESPUESTA == "OK") {

                    //window.history.pushState("Object", "ENTRADA SALIDA ALMACEN", "/Default.aspx?f=naminsa&codigo=" + datos[0].CODIGO);

                    $('#txtCodigoFabricacion').val((datos[0].CODE));
                    exito();
                    $('#guardar').remove();
                    $('#detalleGeneral').DataTable().columns(12).visible(false);
                    $('#detalleEmpleado').DataTable().columns(3).visible(false);

                    BloquearCampos();

                    $('.div_mas_dctoreg').remove();
                    $('#prueba').remove();
                    $('#divMno').remove();
                } else if (datos[0].RESPUESTA == "SAL") {
                    alertCustom("No hay correlativo válido para documento de Salida")

                } else if (datos[0].RESPUESTA == "ENT") {
                    alertCustom("No hay correlativo válido para documento de Entrada")
                    
                } else if (datos[0].RESPUESTA == "SERIADO_VENDIDO") {
                    alertCustom("El producto seriado " + datos[0].CODE + " ya no se encuentra disponible")
                }else {
                    alertCustom(datos[0].RESPUESTA)
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

}

//------------------------------
var prodActual = {};
var empleados = [];

function cargarEmpleados() {
    $.ajax({
        type: "post",
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=3',
        cache: false,
        datatype: "json",
        async: false,
        data: { CTLG_CODE: $('#cboEmpresas').val(), SCSL_CODE: $("#cboEstablecimiento").val() },
        success: function (data) {
            empleados = (data === null) ? [] : data;
        },
        error: function (msg) {
            alertCustom('Error al intentar obtener empleados.');
        }
    });
};

function autocompletarAlmacenero(v_ID, v_value) {

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
            $("#hfPidmAlmacenero").val(map[item].PIDM);
            return item;
        },
    });
    selectReceptor.keyup(function (e) {
        $(this).siblings("ul").css("width", $(this).css("width"));
        if ($(this).val().length == 0) {
            $("#hfPidmAlmacenero").val('');
        }
        var key = e.keyCode ? e.keyCode : e.which;
        if ($(v_ID).val() != "" && $("#hfPidmAlmacenero").val() != "") {
            if (key === 13) {
                $('#txtCentroCostos').focus();
            }
        }
    });
}

function autocompletarCodigoProducto(v_ID, v_value) {
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
                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "COSTO": "' + productos[i].COSTO + '", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
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

            prodActual.CODIGO = map[item].CODIGO;
            prodActual.CODIGO_ANTIGUO = map[item].CODIGO_ANTIGUO;
            prodActual.DESC_ADM = map[item].DESC_ADM;
            prodActual.DETRACCION = map[item].DETRACCION;
            prodActual.NO_SERIADA = map[item].NO_SERIADA;
            prodActual.STOCK_REAL = map[item].STOCK_REAL;
            prodActual.UNIDAD = map[item].UNIDAD;

            $("#hfProdCodeDetalle").val(map[item].CODIGO);
            $("#hfDESC_PROD").val(map[item].DESC_ADM);
            $("#txtPROD_DESC").val($("#hfDESC_PROD").val()).change();
            $("#cboUniMedida").select2('val', map[item].UNIDAD);
            $('#hfDETRACCION').val(map[item].DETRACCION);

            if (map[item].NO_SERIADA === "S") {
                $("#txtcant").val("").removeAttr("disabled");

                $("#div_vie_camp_seriados").css("display", "none");
                $("#cboCorrelativo").select2().select2("val", "L").change();

                $("#txt_num_inicio, #txt_num_fin, #txt_num_inicio, #txtSerie").val("");
                $("#hfTIPO_INSERT").val("NORMAL");      
                $("#hfTIPO_APLI_VALORES").val("E");
                //cargarCostoProducto();
                $('#txtmonto, #txtPU, #hfMONTO').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);
                $('#txtPROD_CODE').attr('next', '#txtcant');
                $('#txtCentroCostos').attr('next', '#btnAgregarProducto');

            } else {

                $("#div_vie_camp_seriados").css("display", "block");
                $("#cboCorrelativo").select2().select2("val", "L").change();

                $("#txt_num_inicio, #txt_num_fin, #txt_num_inicio, #txtSerie").val("");
                $("#txtcant").val("1").change();
                $("#txtcant").prop("disabled", true);
                $("#hfTIPO_APLI_VALORES").val("M");
                $('#txtCentroCostos').attr('next', '#txt_num_inicio');
                //cargarCostoProducto();
                $('#txtmonto, #txtPU, #hfMONTO').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);

            }
            return item;
        },
    });
    input.keyup(function () {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"))
        if ($("#txtPROD_CODE").val().length <= 0) {
            prodActual = {};
            $("#txtPU").val("0.00");
            $("#txtcant").attr("disabled", false);
            $("#hfProdCodeDetalle, #hfCOD_ANT_PROD, #hfSERIE_PROD, #txtPROD_DESC, #hfDETRACCION, #txtcant, #txt_garantia, #txtStock, #hfTIPO_INSERT, #hfTIPO_APLI_VALORES, #txtmonto").val("");
            //$("#hfCENTRO_COSTOS, #hfCECC_CODE").val("");
            $("#cboUniMedida").select2("val", "").change();
            $('#uniform-chkincluyeIGV span').removeClass();
            $('#uniform-chk_desde_compra span').removeClass();
            $('#chkincluyeIGV, #chk_desde_compra').prop('checked', false);

            //INICIO FIN
            $("#txt_num_inicio, #txt_num_fin, #txt_serie_add").val("");
            $("#txtSerie").tagsinput("removeAll");
            $("#cboCorrelativo").select2("val", '').change();
            $("#div_vie_camp_seriados").css("display", "none");
        }
    });
    input.val(v_value);
}

function autocompletarProducto(v_ID, v_value) {
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
                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "COSTO": "' + productos[i].COSTO +'", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
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

            prodActual.CODIGO = map[item].CODIGO;
            prodActual.CODIGO_ANTIGUO = map[item].CODIGO_ANTIGUO;
            prodActual.DESC_ADM = map[item].DESC_ADM;
            prodActual.DETRACCION = map[item].DETRACCION;
            prodActual.NO_SERIADA = map[item].NO_SERIADA;
            prodActual.STOCK_REAL = map[item].STOCK_REAL;
            prodActual.UNIDAD = map[item].UNIDAD;

            $("#hfProdCodeDetalle").val(map[item].CODIGO);
            $("#txtPROD_CODE").val(map[item].CODIGO_ANTIGUO);
            $("#cboUniMedida").select2('val', map[item].UNIDAD);
            $('#hfDETRACCION').val(map[item].DETRACCION);

            if (map[item].NO_SERIADA == "S") {
                $("#txtcant").val("").removeAttr("disabled");

                $("#div_vie_camp_seriados").css("display", "none");
                $("#cboCorrelativo").select2().change();
                $("#txt_num_inicio").val("");
                $("#txt_num_fin").val("");
                $("#txt_num_inicio").val("");
                $("#txtSerie").val("");
                $("#hfTIPO_INSERT").val("NORMAL");
                $("#hfTIPO_APLI_VALORES").val("E");
                $('#txtCentroCostos').attr('next', '#btnAgregarProducto');
                //cargarCostoProducto();
                $('#txtmonto, #txtPU, #hfMONTO').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);
                if ($("#hfProdCodeDetalle").val() !== '') { $('#txtcant').focus(); }
                $("#div_vie_camp_seriados").css("display", "none");
           
            } else {
                $("#div_vie_camp_seriados").css("display", "block");
                $("#cboCorrelativo").select2().change();
                $("#txt_num_inicio, #txt_num_fin, #txtSerie").val("");
                $("#txtcant").val("1").change();
                $("#txtcant").attr("disabled", true);
                $("#hfTIPO_APLI_VALORES").val("M");
                $('#txtCentroCostos').attr('next', '#txt_num_inicio');
                //cargarCostoProducto();
                $('#txtmonto, #txtPU, #hfMONTO').val(map[item].COSTO);
                $('#txtStock').val(map[item].STOCK_REAL);

            }
            return item;
        },
    });
    input.keyup(function () {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"))
        if ($("#txtPROD_DESC").val().length <= 0) {
            prodActual = {};
            $("#txtPU").val("0.00");
            $("#txtcant").attr("disabled", false);
            $("#txtPROD_CODE, #hfProdCodeDetalle, #hfSERIE_PROD, #hfDETRACCION, #txtmonto, #hfTIPO_APLI_VALORES").val("");
            $("#txtcant, #txtStock").val("");
            $("#cboUniMedida").select2("val", "").change();
            $('#uniform-chkincluyeIGV span').removeClass();
            $('#chkincluyeIGV').attr('checked', false);
            $('#uniform-chk_desde_compra span').removeClass();
            $('#chk_desde_compra').attr('checked', false);

            //INICIO FIN
            $("#txt_num_inicio, #txt_num_fin, #txt_serie_add").val("");
            $("#txtSerie").tagsinput("removeAll");
            $("#cboCorrelativo").select2("val", '').change();
            $("#div_vie_camp_seriados").css("display", "none");
        }
    });
    input.val(v_value);
}

function autocompletarCentroCostos(v_ID, v_value) {
    var selectinput = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=17&CTLG_CODE=" + $('#cboEmpresas').val(),
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
                        var next = $('#txtCentroCostos').attr('next');
                        $(next).focus();
                        return item;
                    },
                });
                selectinput.keyup(function (e) {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(v_ID).val().length <= 0) {
                        $("#hfCENTRO_COSTOS").val("");
                        $("#hfCECC_CODE").val("");
                    } else {
                        var key = e.keyCode ? e.keyCode : e.which;
                        if ($(v_ID).val() != "" && $("#hfCENTRO_COSTOS").val() != "" && $("#hfCECC_CODE").val() != "") {

                            if (key === 13) {
                                $('#txtPROD_CODE').focus();
                            }
                        }
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

function cargarCostoProducto(asincrono) {

    if (asincrono == undefined) {
        asincrono = false;
    }
    //Id moneda base:
    var moba = $("#cboMoneda option[data-tipo='MOBA']").val()
    //Id moneda base:
    var moal = $("#cboMoneda option[data-tipo='MOAL']").val()

    $("#txtPU").val("0.00");
    prodActual.COSTO = 0;

    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=COSTO&CTLG_CODE=" + $('#cboEmpresas').val() + "&CODE_PROD=" + prodActual.CODIGO + "&COD_ALMC=" + $("#cboEstablecimiento :selected").attr("data-almc") + "&MONEDA=" + moba,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null) {

                $("#txtPU").val(parseFloat(datos[0].PU_TOT).toFixed(2));
                prodActual.COSTO = parseFloat(datos[0].PU_TOT);
                prodActual.MONE_CODE = moba;

            } else {
                $('#txtmonto, #hfMONTO').val('');
            }
        },
        error: function (msg) {
            alertCustom('Error al cargar costo del producto seleccionado.');
        }
    });

    //$.ajax({
    //    type: "post",
    //    url: "vistas/nm/ajax/nmmprod.ashx?OPCION=16&CTLG_CODE=" + $("#cboEmpresas").val() +
    //        "&PROD_CODE=" + prodActual.CODIGO +
    //        "&MONE_CODE=" + moba +
    //        "&SCSL_CODE=" + $("#cboEstablecimiento").val(),
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: asincrono,
    //    success: function (datos) {
    //        if (datos != null) {
    //            //$("#txtUltimaCompra").val(datos[0].ULTIMA_COMPRA);
    //            //$("#txtValorizado").val(datos[0].VALORIZADO);
    //            //$("#txtNeto").val(datos[0].NETO);
    //            $("#txtPU").val(parseFloat(datos[0].VALORIZADO).toFixed(2));
    //            prodActual.COSTO = parseFloat(datos[0].VALORIZADO);
    //            prodActual.MONE_CODE = moba;
    //        }
    //    },
    //    error: function (msg) {
    //        alertCustom("Costos de producto no se listaron correctamente");
    //    }
    //});

};

function cargarUnidadesMedida() {
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=11",
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            $('#cboUniMedida').empty();
            $('#cboUniMedida').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboUniMedida').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        },
        error: function (msg) {
            alertCustom('Error al listar unidades de medida.');
        }
    });
}

function AgregarProducto() {

    if (vErrors(["txtPROD_CODE", "txtPROD_DESC", "txtcant", "cboUniMedida", "txtPU", "txtStock"])) {
        //VALIDACIONES INICIALES
        var continuar = true;

        if (typeof prodActual.CODIGO == undefined) {
            alertCustom("Seleccione un producto válido");
            continuar = false;
        } else if (parseFloat($("#txtCant").val()) <= 0) {
            alertCustom("Cantidad debe ser mayor a 0");
            continuar = false;
        } else if (parseFloat($("#txtPU").val()) <= 0) {
            alertCustom("No puede ingresar un producto con costo 0");
            continuar = false;
        } else if (parseFloat($("#txtStock").val()) <= 0 || parseFloat($("#txtcant").val()) > parseFloat($("#txtStock").val())) {
            alertCustom("No existe stock suficiente");
            continuar = false;
        }

        if (continuar) {
            if (prodActual.NO_SERIADA == "S") {
                //PRODUCTOS SIN SERIE
                var DCODIGO = "";
                var FACTURA = "";
                var DCODIGO_GUIA = "";
                var NITEM = "";
                var CODE_PROD = prodActual.CODIGO;
                var DES_PROD = prodActual.DESC_ADM;
                var CANTIDAD_V = $("#txtcant").val();
                var PRECIO_VALORIZADO = $("#txtPU").val();
                var CODIGO_BARRAS = "";
                var CODIGO_HIJO = "";
                var UNME_CODE = $("#cboUniMedida").val();

                //Opcional: Al grabar se reemplazará por el de la cabecera
                var CENTRO_COSTOS = $("#txtCentroCostos").val();
                var CECC_CODE = $("#hfCECC_CODE").val();
                var CECD_CODE = $("#hfCENTRO_COSTOS").val();

                GrabarDet(DCODIGO, FACTURA, DCODIGO_GUIA, NITEM, CODE_PROD, DES_PROD, CANTIDAD_V, PRECIO_VALORIZADO, CODIGO_BARRAS, CODIGO_HIJO, UNME_CODE, CENTRO_COSTOS, CECC_CODE, CECD_CODE)
                LimpiarCamposDetalle()
            }
            else {
                //PRODUCTOS SERIADOS
                if ($("#cboBuscar").val() != null) {
                    var seriados = $("#cboBuscar").val();

                    for (var i = 0; i < seriados.length; i++) {
                        prodActual.CODIGO_BARRAS = seriados[i];
                        var DCODIGO = "";//CODIGO FACTURA P02301232
                        var FACTURA = "";//DOCUMENTO 123-01213
                        var DCODIGO_GUIA = "";//GUIA INTERNA 5462-213112
                        var NITEM = "";//ITEM RISAD
                        var CODE_PROD = prodActual.CODIGO;
                        var DES_PROD = prodActual.DESC_ADM;
                        var CANTIDAD_V = $("#txtcant").val();
                        var PRECIO_VALORIZADO = $("#txtPU").val();
                        var CODIGO_BARRAS = seriados[i];
                        var CODIGO_HIJO = "";//CODIGO BISAC A00120314
                        var UNME_CODE = $("#cboUniMedida").val();

                        //Opcional: Al grabar se reemplazará por el de la cabecera
                        var CENTRO_COSTOS = $("#txtCentroCostos").val();
                        var CECC_CODE = $("#hfCECC_CODE").val();
                        var CECD_CODE = $("#hfCENTRO_COSTOS").val();

                        //Obtener documento de compra de producto seriado
                        var data = new FormData();
                        data.append('P_CATALOGO', $("#cboEmpresas").val());
                        data.append('COD_ALMC', $("#cboEstablecimiento :selected").attr("data-almc"));
                        data.append('P_PROD_CODE', prodActual.CODIGO);
                        data.append('P_CODIGO_BARRAS', seriados[i]);
                        Bloquear("ventana");
                        var jqxhr = $.ajax({
                            type: "POST",
                            url: "vistas/AF/ajax/AFCIPFR.ashx?OPCION=7",
                            contentType: false,
                            data: data,
                            processData: false,
                            cache: false,
                            async: false
                        })
                       .success(function (datos) {
                           Desbloquear("ventana");
                           if (datos != null && datos.length > 0) {
                               DCODIGO = datos[0].CODIGO;
                               FACTURA = datos[0].DOCUMENTO;
                               DCODIGO_GUIA = datos[0].GUIA;
                               NITEM = datos[0].RIDAD_ITEM;
                               CODIGO_HIJO = datos[0].BISAC_CODE;

                               if (datos[0].CENTRO_COSTOS != "" && datos[0].CECC_CODE == "" && datos[0].CECD_CODE == "") {
                                   CENTRO_COSTOS = datos[0].CENTRO_COSTOS;
                                   CECC_CODE = datos[0].CECC_CODE;
                                   CECD_CODE = datos[0].CECD_CODE;
                               }

                           }
                       })
                       .error(function () {
                           Desbloquear("ventana");
                           noexito();
                       });

                        GrabarDet(DCODIGO, FACTURA, DCODIGO_GUIA, NITEM, CODE_PROD, DES_PROD, CANTIDAD_V, PRECIO_VALORIZADO, CODIGO_BARRAS, CODIGO_HIJO, UNME_CODE, CENTRO_COSTOS, CECC_CODE, CECD_CODE)
                    }

                    LimpiarCamposDetalle()
                } else {
                    alertCustom("Seleccione al menos 1 producto de la Lista Detallada")
                }
            }
        }
    }
}

function ImprimirCodigoBarras() {
    var canvas = document.getElementById('codBarras');
    var dataURL = canvas.toDataURL();
    // window.open(dataURL, "blank");

    var ID_LINK = document.getElementById('btnImprimir');
    var DESC = document.getElementById('divCodBarras');

    ID_LINK.href = canvas.toDataURL('image/png');
    //ID_LINK.download = canvas.toDataURL('image/png');
    ID_LINK.download = $("#txtNroSerie").val()+".png";

    $("#btnImprimir").click();



    //$("#divImprimirCodBarras").html($("#divCodBarras").html())
    //$('#divImprimirCodBarras #codBarras').barcode("" + $('#txtNroSerie').val() + "", "code128", { barWidth: 2, barHeight: 80, output: "canvas" });
    //var estilos = '<style id="styleImpresion">@media print{.navbar-inner{display:none!important}.page-sidebar{display:none!important}.footer{display:none!important}.page-content{margin-left:0!important}#gritter-notice-wrapper{display:none!important}#contenedor{display:none!important}#contenedorBreadcrumb{display:none!important}.page-container{margin-top:0!important}#divImprimirCodBarras{display:block!important;width:100%!important;line-height:11px!important;font-family:Arial!important}.container-fluid{padding:0!important}.dn{display:none !important;}}</style>';
    //$("#ventana").append(estilos);
    //setTimeout(function () {
    //    window.print();
    //    $("#divImprimirCodBarras").html("");
    //    $("#styleImpresion").remove();
    //}, 200);

}

function BloquearCampos() {
    $('#cboEstablecimiento').attr('disabled', 'disabled');
    $('#cboEmpresas').attr('disabled', 'disabled');
    $('#txtFechaEnsamblaje').attr('disabled', 'disabled');
    $('#txtFechaMovimiento').attr('disabled', 'disabled');
    $('#txtAlmacenero').attr('disabled', 'disabled');
    $('#txtCentroCostos').attr('disabled', 'disabled');
    $('#txtNroSerie').attr('disabled', 'disabled');
    $('#txt_desc_producto,#txt_cod_a_producto').attr('disabled', 'disabled');
    $('.cantidad').attr('disabled', 'disabled');
    $('#txthorasTrabaja').attr('disabled', 'disabled');

    $("#btnRecargarProdFab,#btn_new_cc").hide();
    $("#guardar").parent().hide();
    $("#platillaOpciones").hide();
}

function LimpiarCamposDetalle() {
    $('#txtPROD_CODE').val('').keyup(); $('#txtcant, #txtPU, #txtmonto').val('');

    $('#txtPROD_CODE').val('').keyup();
    $('#txtcant, #txtPU, #txtmonto').val('');
    prodActual = {};
    $("input").parent().parent().removeClass("error");
    $("select").parent().parent().removeClass("error");
    $(".icon-ok").parent().remove();

    $("#cboBuscar").empty();
    $($("#s2id_cboBuscar").find("li")[0]).remove();

}

var numerico = function (text) {
    var letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var arreglo = text.toUpperCase().split('');
    var pos = -1;
    for (var i = arreglo.length - 1; i > -1 ; i--) {
        if (letras.indexOf(arreglo[i].toString()) > -1) {
            pos = i;
            break;
        }
    }
    return parseInt(text.substring(pos + 1));
};

function ImprimirDcto() {
    
    var cod = ObtenerQueryString("codigo");
    if (cod != undefined) {
        Bloquear("ventana");
        var data = new FormData();
        data.append('ISAC_CODE', cod);
        var jqxhr = $.ajax({
            type: "POST",
            url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=IMPR',
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
           Desbloquear("ventana");
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    } else {
        //Generar datos para dcto Imprimir
        var tabla = '<div class="portlet-title"><h4><i class="icon-reorder"></i>PRODUCTO FABRICADO</h4></div>';
        tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td><strong>EMPRESA:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#cboEmpresas :selected").html() + '</strong></td>';
        tabla += '<td><strong>ESTABLECIMIENTO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#cboEstablecimiento :selected").html() + '</td>';
        tabla += '</tr>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td><strong>PRODUCTO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txt_desc_producto").val() + '</strong></td>';
        tabla += '<td><strong>NRO SERIE:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtNroSerie").val() + '</strong></td>';
        tabla += '</tr>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td><strong>ENSAMBLAJE:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtFechaEnsamblaje").val() + '</td>';
        tabla += '<td><strong>MOVIMIENTO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtFechaMovimiento").val() + '</td>';
        tabla += '</tr>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td><strong>ALMACENERO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtAlmacenero").val() + '</td>';
        tabla += '<td><strong>CENTRO DE COSTOS:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtCentroCostos").val() + '</td>';
        tabla += '</tr>';
        tabla += '</tbody></table><br/>';    
        //DETALLES
        tabla += '<fieldset class="scheduler-border "><legend class="scheduler-border " id="legend">Detalles</legend></fieldset>';
        tabla += '<table class="table display DTTT_selectable" border="1">';
        tabla += '<thead><tr align="center">';
        tabla += '<th>CÓDIGO</th><th>FACTURA</</th><th>GUÍA</th><th>ITEM</th><th>SERIE PROD.</th><th>PRODUCTO</th><th>CANTIDAD</th><th>COSTO</th><th>CANTIDAD USADA</th><th>TOTAL<br/>SIN IGV</th><th>TOTAL<br/>CON IGV</th>';
        tabla += '</tr></thead><tbody>';
        var detalles = $("#detalleGeneral").DataTable().data();
        for (var i = 0; i < detalles.length ; i++) {
            tabla += '<tr>';
            tabla += '<td align="center">' + detalles[i].DCODIGO + '</td>';
            tabla += '<td align="center">' + detalles[i].FACTURA + '</td>';
            tabla += '<td align="center">' + detalles[i].GUIA + '</td>';
            tabla += '<td align="center">' + detalles[i].NITEM + '</td>';
            tabla += '<td align="center">' + detalles[i].SERIE_PROD + '</td>';
            tabla += '<td align="center">' + detalles[i].DES_PROD + '</td>';
            tabla += '<td align="center">' + detalles[i].CANTIDAD_V + '</td>';
            tabla += '<td align="center">' + detalles[i].PRECIO_VALORIZADO + '</td>';
            tabla += '<td align="center">' + detalles[i].CANTIDAD + '</td>';
            tabla += '<td align="center">' + detalles[i].TOTAL + '</td>';
            tabla += '<td align="center">' + detalles[i].CTOTAL + '</td>';
            tabla += '</tr>';
        }
        tabla += '</tbody></table>';
        tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody><tr>';
        tabla += '<td><strong>Total Sin IGV:</strong></td><td>' + formatoMiles($("#totalSinIGV").val()) + '</strong></td>';
        tabla += '<td><strong>Total Con IGV:</strong></td><td>' + formatoMiles($("#totalConIGV").val()) + '</td>';
        tabla += '</tr></tbody></table><br/>';
        //MANO DE OBRA
        tabla += '<fieldset class="scheduler-border "><legend class="scheduler-border " id="legend">Mano de Obra</legend></fieldset>';
        tabla += '<table class="table display DTTT_selectable" border="1"><thead><tr>';
        tabla += '<th>EMPLEADO</th><th>SUELDO X HORA</</th>';
        tabla += '</tr></thead><tbody>';
        var empleados = $("#detalleEmpleado").DataTable().data();
        for (var i = 0; i < empleados.length ; i++) {
            tabla += '<tr>';
            tabla += '<td align="center">' + empleados[i].EMPLEADO + '</td>';
            tabla += '<td align="center">' + empleados[i].SUELDO + '</td>';
            tabla += '</tr>';
        }
        tabla += '</tbody></table>';
        tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody><tr>';
        tabla += '<td><strong>Total de Sueldo x Horas:</strong></td><td>' + formatoMiles($("#txtHoraSueldo").val()) + '</strong></td>';
        tabla += '<td><strong>Horas Trabajadas:</strong></td><td>' + formatoMiles($("#txthorasTrabaja").val()) + '</td>';
        tabla += '<td><strong>Total de Mano de Obra:</strong></td><td>' + formatoMiles($("#txttotalEmpleados").val()) + '</td>';
        tabla += '</tr></tbody></table><br/>';
        //TOTALES
        tabla += '<fieldset class="scheduler-border "><legend class="scheduler-border" id="legend">Totales</legend></fieldset>';
        tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody><tr>';
        tabla += '<td><strong>Total de Producto Facricado Sin IGV:</strong></td><td>' + formatoMiles($("#txttotalProFaS").val()) + '</strong></td>';
        tabla += '<td><strong>Total de Producto Facricado Con IGV:</strong></td><td>' + formatoMiles($("#txttotalProFac").val()) + '</td>';
        tabla += '</tr></tbody></table>';

        $("#divDctoImprimir").html(tabla);
        setTimeout(function () {
            window.print();
        }, 200)
    }
}


function ImprimirDctoSinCosto() {

   // var cod = ObtenerQueryString("codigo");
    var cod = $('#txtCodigoFabricacion').val();

    if (cod != undefined && cod != "") {

        Bloquear("ventana");
        var data = new FormData();
        data.append('ISAC_CODE', cod);
        var jqxhr = $.ajax({
            type: "POST",
            url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=IMPR2',
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
           Desbloquear("ventana");
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    } else {
        //Generar datos para dcto Imprimir
        var tabla = '<div class="portlet-title"><h4><i class="icon-reorder"></i>PRODUCTO FABRICADO</h4></div>';
        tabla += '<table style="width:100%;" cellpadding="7px" border="0" ><tbody>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td style="line-height: 19px;"><strong>EMPRESA:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#cboEmpresas :selected").html() + '</strong></td>';
        tabla += '<td style="line-height: 19px;"><strong>ESTABLECIMIENTO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#cboEstablecimiento :selected").html() + '</td>';
        tabla += '</tr>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td style="line-height: 19px;"><strong>PRODUCTO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txt_desc_producto").val() + '</strong></td>';
        tabla += '<td style="line-height: 19px;"><strong>NRO SERIE:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtNroSerie").val() + '</strong></td>';
        tabla += '</tr>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td style="line-height: 19px;"><strong>ENSAMBLAJE:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtFechaEnsamblaje").val() + '</td>';
        tabla += '<td style="line-height: 19px;"><strong>MOVIMIENTO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtFechaMovimiento").val() + '</td>';
        tabla += '</tr>';
        tabla += '<tr style="vertical-align: top;">';
        tabla += '<td style="line-height: 19px;"><strong>ALMACENERO:</strong></td>';
        tabla += '<td style="line-height: 19px;">' + $("#txtAlmacenero").val() + '</td>';
        tabla += '<td></td>';
        tabla += '<td></td>';
        tabla += '</tr>';
        tabla += '</tbody></table><br/>';
        //DETALLES
        tabla += '<fieldset class="scheduler-border "><legend class="scheduler-border " id="legend">Detalles</legend></fieldset>';
        tabla += '<table class="table display DTTT_selectable" border="1">';
        tabla += '<thead><tr align="center">';
        tabla += '<th>SERIE</th><th>PRODUCTO</th><th>CANTIDAD</th><th>GARANTÍA</th>';
        tabla += '</tr></thead><tbody>';
        var detalles = $("#detalleGeneral").DataTable().data();
        for (var i = 0; i < detalles.length ; i++) {
            tabla += '<tr>';             
            tabla += '<td align="center">' + detalles[i].SERIE_PROD + '</td>';
            tabla += '<td align="center">' + detalles[i].DES_PROD + '</td>';       
            tabla += '<td align="center">' + detalles[i].CANTIDAD + '</td>';
            tabla += '<td align="center">Guardar para ver Garantía</td>';            
            tabla += '</tr>';
        }
        tabla += '</tbody></table>';
     
        $("#divDctoImprimir").html(tabla);
        setTimeout(function () {
            window.print();
        }, 200)
    }
}
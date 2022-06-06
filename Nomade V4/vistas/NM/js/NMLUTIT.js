var NMLUTIT = function () {
    var codigoVenta = '';
    let sCodMovContSelec = "";
    var vAsientoContable = null;
    const sCodModulo = "0001"; // Código del módilo de almacen para contabilidad.

    var plugins = function () {
       
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $("#cbo_moneda").select2();
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

        $("#txtNumero").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
    };

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }
    
    var fillCboEmpresa = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            }
        });
    };

    var fillcboMoneda = function () {
        var select = $('#cbo_moneda');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=12&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json",
            async: false,
            datatype: "json",
            success: function (datos) {
                $(select).html('');
                $(select).append('<option value=""></option>');
                if (datos !== null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" data-simbolo="' + datos[i].SIMBOLO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                //$("#cboMon").select2("val", "0002");
            },
            error: function (msg) {
                alertCustom('Error al listar las monedas del Sistema.');
            }
        });
    }

    var fillCboEstablecimiento = function () {
        var select = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            }
        });
    };
    
    
    var crearTablaVacia = function () {
        
        var parms = {
            data: null,
            columns: [
                //{
                //    data: null, createdCell: function (td, cellData, rowData, row, col) {
                //        if (rowData.ANULADO.toString() == "S") {
                //            $(td).html("<i class='icon-pushpin' style='color: #AD193E;font-size:14px;'>");
                //            if (rowData.MONEDA == '0002')//SOLES
                //                arrTotalAnulados.push(rowData.UTILIDAD_TOTAL);
                //            else
                //                arrTotalAnuladosD.push(rowData.UTILIDAD_TOTAL);
                //        } else {
                //            if (rowData.TIPO_MODULO.toString() == "N") {
                //                $(td).html("<i class='icon-pushpin' style='color: black;font-size:14px;'>")
                //                if (rowData.MONEDA == '0002')//SOLES
                //                    arrTotalVentaNormal.push(rowData.UTILIDAD_TOTAL);
                //                else
                //                    arrTotalVentaNormalD.push(rowData.UTILIDAD_TOTAL);
                //            } else if (rowData.TIPO_MODULO.toString() == "R") {
                //                $(td).html("<i class='icon-pushpin' style='color: #094CB4;font-size:14px;'>")
                //                if (rowData.MONEDA == '0002')//SOLES
                //                    arrTotalVentaRapida.push(rowData.UTILIDAD_TOTAL);
                //                else
                //                    arrTotalVentaRapidaD.push(rowData.UTILIDAD_TOTAL);
                //            } else if (rowData.TIPO_MODULO.toString() == "A") {
                //                $(td).html("<i class='icon-pushpin' style='color: #AD193E;font-size:14px;'>");
                //                if (rowData.MONEDA == '0002')//SOLES
                //                    arrTotalVentaAnticipo.push(rowData.UTILIDAD_TOTAL);
                //                else
                //                    arrTotalVentaAnticipoD.push(rowData.UTILIDAD_TOTAL);
                //            } else if (rowData.TIPO_MODULO.toString() == "P") {
                //                $(td).html("<i class='icon-pushpin' style='color: #00A300;font-size:14px;'>");
                //                if (rowData.MONEDA == '0002')//SOLES
                //                    arrTotalVentaPos.push(rowData.UTILIDAD_TOTAL);
                //                else
                //                    arrTotalVentaPosD.push(rowData.VALOR);
                //            } 
                //        }
                //        $(td).attr("align", "center");
                //    }

                //},
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); },
                    visible: false
                },
                {
                    data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "EMISION", createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html(rowData.EMISION);

                        $(td).attr("align", "center");
                    },
                    type: "fechaHora"

                },
                {
                    data: "TIPO_DOC", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "CLIE_DOID_NRO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "RAZON_SOCIAL", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "CATEGORIA_CLIENTE", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                //{
                //    data: "NOMBRE_VENDEDOR", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); },
                //    visible: false

                //},
                {
                    data: "VENDEDOR_USUA_ID", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "CODIGO_PROD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); },
                    visible: false
                },
                {
                    data: "DESC_PROD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "CENTRO_COSTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "GRUPO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); },
                    visible: false
                },
                {
                    data: "SUBGRUPO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); },
                    visible: false
                },
                {
                    data: "MARCA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); },
                    visible: false
                },
                {
                    data: "DESC_ALMC", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },                
                {
                    data: "DESC_UNIDAD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "CANTIDAD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                //{
                //    data: "CANTIDAD_DESPACHADA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                //},
                //{
                //    data: "CANTIDAD_NO_DESPACHADA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                //},
                //{
                //    data: "DESPACHO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                //},
                {
                    data: "SIMBOLO_MONEDA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "PRECIO_UNITARIO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "TOTAL", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "COSTO_PRODUCTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }


                },
                {
                    data: "COSTO_TOTAL", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }


                },
                {
                    data: "UTILIDAD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }


                },
                {
                    data: "UTILIDAD_TOTAL", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }


                }

            ],
            stateSave: false,
            "sDom": 'TC<"clear">lfrtip',
            "oTableTools": {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel"
                    }
                ]
            },
            stateSave: false,
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var oArrayItemsSumar = new Array();

                api.data().filter(function (obj) {
                    oArrayItemsSumar.push(obj.UTILIDAD_TOTAL);
                });

                if (oArrayItemsSumar.length > 0) {

                    $("#lblValorizadoTotal").html(api.data()[0].SIMBOLO_MONEDA + ' ' + formatoMiles(oArrayItemsSumar.reduce(
                        function (itemA, itemB) {
                            return itemA + itemB;
                        })));
                }
            },
            sDom: 'TC<"clear">lfrtip'

            //footerCallback: function (row, data, start, end, display) {
            //    var api = this.api(), data;

            //    // Remove the formatting to get integer data for summation
            //    var intVal = function (i) {
            //        return typeof i === 'string' ?
            //            i.replace(/[\$,]/g, '') * 1 :
            //            typeof i === 'number' ?
            //                i : 0;
            //    };

            //    var autoSuma = function (p_Array) {
            //        if (p_Array.length)
            //            return p_Array.reduce(function (a, b) { return intVal(a) + intVal(b); });
            //        else
            //            return 0;
            //    };

            //    // Total over this page
            //    if (api.column(21).data().length) {
            //        var auxArray = new Array();
            //        var auxArray2 = new Array();
            //        //filtro
            //        api.columns(0, { page: 'current' }).data()[0].filter(function (e, d) {
            //            if (e.MONEDA == '0002')
            //                auxArray.push(e.UTILIDAD_TOTAL);
            //            else
            //                auxArray2.push(e.UTILIDAD_TOTAL)
            //        });

            //        pageTotalMoba = autoSuma(auxArray);

            //        pageTotalMoal = autoSuma(auxArray2)


            //    } else {
            //        pageTotalMoba = 0
            //        pageTotalMoal = 0;
            //    };

            //    var SMOBA = "S/.";
            //    var SMOAL = "US$";
                
            //    $("#tdTotales").html("<strong><label style='font-weight: 600;'>&nbsp;Total en página: S/. " + formatoMiles(pageTotalMoba).toString() + " | US$ " + formatoMiles(pageTotalMoal).toString() + "</label></strong>");
                
            //}
        }


        oTable = iniciaTabla('tblDocumento', parms);

        actualizarEstilos();
        
        $('#tblDocumento tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
        });
    }

    var
        obtenerDocumentos = function () {
        var data = new FormData();        
        var CTLG_CODE = $("#cboEmpresa").val();
        var SCSL_CODE = ($("#cboEstablecimiento").val() == "TODOS") ? '' : $("#cboEstablecimiento").val();
        var CHK_INC_SERVICIOS = $("#chkInServicios").is(':checked') ? 'S' : 'N';
        var MONEDA_CODE = $("#cbo_moneda").val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('MONEDA_CODE', MONEDA_CODE);
        data.append('CHK_INC_SERVICIOS', CHK_INC_SERVICIOS);
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());

        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMLUTIT.ashx?OPCION=1",
            beforeSend: Bloquear("divDocumento"),
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            cache: false,
            async: true,
            success: function (datos) {                
                oTable.fnClearTable();
                if (datos.length > 0) {
                    arrTotalVentaNormal = new Array();
                    arrTotalVentaNormalD = new Array();

                    arrTotalVentaRapida = new Array();
                    arrTotalVentaRapidaD = new Array();
                    
                    arrTotalVentaAnticipo = new Array();
                    arrTotalVentaAnticipoD = new Array();

                    arrTotalVentaPos = new Array();
                    arrTotalVentaPosD = new Array();

                    arrTotalVentaTomPed = new Array();
                    arrTotalVentaTomPedD = new Array();

                    oTable.fnAddData(datos);
                    $("#smIncIGV").pulsate({
                        color: "#FF0000",
                        reach: 20,
                        repeat: 3,
                        glow: true
                    });
                    oTable.fnSort([[2, "desc"]]);
                } else {
                    infoCustom2("No se encontraron datos!");
                    $("#lblValorizadoTotal").html("")
                }
            },
            error: function () {
                noexito();
            }, complete: function () {
                Desbloquear("divDocumento");
            }
        });

    }

    function EventoControles() {
        var controlProCli = false;
        
        $('#cboEmpresa').change(function () {
            fillCboEstablecimiento();
            $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
        });


        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                obtenerDocumentos();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                obtenerDocumentos();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });

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
    
    var fnTablaAsientosIni = function () {
        var parms = {
            data: null,
            columns: [
                
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<a class='VerAsiento' >Ver Asiento</a>");
                        $(td).css("text-align", "center").addClass("asiento");
                    }
                }
            ]
        }

        oTableLista = $("#tblLista").dataTable(parms);
        
    };

    
    var fnCargaInicial = function () {
        
        $(".bavanzado").hide();
        $("#iconAvanz").addClass("icon-chevron-down");

        $("#tblTotalesRes .centro").css("text-align", "center");
        $("#tblTotalesRes .derecha").css("text-align", "right");

    };

    return {
        init: function () {
            cargarParametrosSistema();
            crearTablaVacia();
            fnTablaAsientosIni();
            fillCboEmpresa();
            $('#cboEmpresa').val($('#ctl00_hddctlg').val());
            fillCboEstablecimiento();
            $('#cboEstablecimiento').val('');
            fillcboMoneda();
            $('#cbo_moneda').val('0002');
            plugins();
            EventoControles();
            fnCargaInicial();
        }
    };
}();

function cargarParametrosSistema() {
    //OCULTAR DONACION
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ODET",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (datos[0].VALOR == "SI") {
                    $("#DivtblDetalleVentas").attr("style", "display:none");//se oculta el que está con almacen en el detalle
                    $("#DivtblDetalleVentas2").attr("style", "display:inline");//se muestra el que está sin almacen en el detalle 
                } else {
                    $("#DivtblDetalleVentas").attr("style", "display:inline");//se muestra el que está con almacen en el detalle
                    $("#DivtblDetalleVentas2").attr("style", "display:none");//se oculta el que está sin almacen en el detalle 
                }
            }
        },
    });
}

function imprimirListaDctosVenta() { 
    Bloquear("ventana")
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = ($("#cboEstablecimiento").val() == "TODOS") ? '' : $("#cboEstablecimiento").val();
    var MONEDA_CODE = $("#cbo_moneda").val();
    var CHK_INC_SERVICIOS = $("#chkInServicios").is(':checked') ? 'S' : 'N';

    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('MONEDA_CODE', MONEDA_CODE);
    data.append('CHK_INC_SERVICIOS', CHK_INC_SERVICIOS);
    data.append('DESDE', $("#txtDesde").val());
    data.append('HASTA', $("#txtHasta").val());

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMLUTIT.ashx?OPCION=2",
        async: false,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {
                $("#divDctoImprimir").html(datos);
                $("#divDctoImprimir #tblDocumento").attr("border", "1");
                $("#divDctoImprimir #tblDocumento").removeClass("display").removeClass("DTTT_selectable");
                var nomSucursal, nomEmpresa;
                nomSucursal = $("#cboEstablecimiento :selected").html();
                nomEmpresa = $("#cboEmpresa :selected").html();
                imprimirDiv("divDctoImprimir", "UTILIDADES POR ITEM - " + nomSucursal);
            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alertCustom("No se pudo obtener correctamente los documentos de venta.");
        }
    });
}


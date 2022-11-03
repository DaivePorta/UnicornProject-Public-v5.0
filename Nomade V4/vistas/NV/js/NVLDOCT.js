var prmtODET = "";
var codigoParaPDF = "";//DPORTA
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE
var NVLDOCT = function () {
    var codigoVenta = '';
    let sCodMovContSelec = "";
    var vAsientoContable = null;
    const sCodModulo = "0001"; // Código del módilo de almacen para contabilidad.

    var plugins = function () {
        $("#cboGrupoProductos").select2();
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDoc').select2();
        $('#cboVendedor').select2();
        $('#cboProducto').select2();
        $('#cboCliente').select2();
        $('#cboEstado').select2();
        $("#cboTipoDoc").select2();
        $("#cboTipoVenta").select2();

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

        $("#txtSerie").inputmask({ "mask": "#", "repeat": 4, "greedy": false });
        $("#txtNumero").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
    };

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var fillCboEmpresa = function () {

        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    fillCboEstablecimiento();
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());

                    fillCboTipoDoc();
                    fillCboVendedor();
                    //fillProducto();
                    //fillCliente();
                    fillGrupoProductos();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                //selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                    selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillCboTipoDoc = function () {
        var opcion = 'VENT';
        var select = $('#cboTipoDoc');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                $(select).append('<option Value="TODOS">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                    $(select).select2('val', 'TODOS');
                } else {
                    $(select).select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("No se pudo listar los Tipos de Documentos correctamente.");
            }
        });

    };

    function fillCboVendedor(ctlg, scsl, estado, bAsync) {
        ctlg = $("#cboEmpresa").val()
        scsl = $("#cboEstablecimiento").val()
        estado = "A";
        bAsync = true;
        if (bAsync == undefined) {
            bAsync = true;
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
                "&CTLG=" + ctlg +
                "&SCSL=" + scsl +
                "&p_ESTADO_IND=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: bAsync,
            success: function (datos) {
                $('#cboVendedor').empty();
                $('#cboVendedor').append('<option></option>');
                $('#cboVendedor').append('<option Value="TODOS">TODOS</option>');

                if (datos != null) {
                    var f = true;
                    var f2 = true;
                    var options = "";
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO == 'A' && f) {
                            options += '<optgroup label="ACTIVOS">';
                            f &= 0;
                        }
                        if (datos[i].ESTADO == 'I' && f2) {
                            if (f) options += '</optgroup>';
                            options += '<optgroup label="INACTIVOS" >';
                            f2 &= 0;
                        }
                        options += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                    }
                    options += '</optgroup>';
                }

                $('#cboVendedor').append(options);
                $('#cboVendedor').select2("val", "TODOS");


            },
            error: function (msg) {
                alertCustom("Vendedores no se listaron correctamente.");
            }
        });
    }

    var fillProducto = function () {
        var selectEst = $('#cboProducto');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboProducto').select2('val', 'TODOS');
        //Bloquear("divCboProducto");
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cboEmpresa').val() +
            //"&SCSL=" + $('#cboEstablecimiento').val() +
            //"&GRUP_PROD=" + ($("#cboGrupoProductos").val() === null ? "" : $("#cboGrupoProductos").val().toString()),

            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODTODOS&CTLG=" + $('#cboEmpresa').val() + "&SCSL=" + $('#cboEstablecimiento').val() + "&SERIADO_IND=",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#cboEmpresa').val() + "&ALMC_CODE=" + $('#cboEstablecimiento').val() + "&SERIADO_IND=" + "",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                //Desbloquear("divCboProducto");
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboProducto').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESC_ADM + '</option>');
                    }
                }
                $('#cboProducto').select2('val', 'TODOS');
            },
            error: function (msg) {
                //Desbloquear("divCboProducto");
                alert(msg.d);
            }
        });
    };

    var fillCliente = function () {
        var selectEst = $('#cboCliente');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboCliente').select2('val', 'TODOS');
        //Bloquear("divCboCliente");
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2.5&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                //Desbloquear("divCboCliente");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].PIDM + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                }
                $('#cboCliente').select2('val', 'TODOS');
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }



    var fillGrupoProductos = function () {

        var select = $('#cboGrupoProductos');
        select.empty();
        //select.append('<option></option>');
        $('#cboGrupoProductos').select2('val', '');
        $.ajax({
            type: "post",
            url: "vistas/NM/ajax/NMMFPRO.ashx?OPCION=4&CTLG_CODE=" + $("#cboEmpresa").val() + "&OPCION2=-",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            beforeSend: function () {
                //Bloquear("divGrupProd");
            },
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboGrupoProductos').select2('val', '');
            },
            complete: function () {
                //Desbloquear("divGrupProd");
            },
            error: function (msg) {
                alert(msg.d);
            }
        });

    }



    var crearTablaVacia = function () {
        arrTotalAnulados = new Array();
        arrTotalAnuladosD = new Array();

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

        var parms = {
            data: null,
            columns: [
                {
                    data: null, createdCell: function (td, cellData, rowData, row, col) {
                        $($(td).parents("tr")[0]).attr("data-tipo", 'venta anulada');
                        if (rowData.ANULADO.toString() == "ANULADO") {
                            $(td).html("<i class='icon-pushpin' style='color: #AD193E;font-size:14px;'>");
                            if (rowData.MONEDA == '0002')//SOLES
                                arrTotalAnulados.push(rowData.VALOR);
                            else
                                arrTotalAnuladosD.push(rowData.VALOR);
                        } else {
                            if (rowData.TIPO_MODULO.toString() == "N" || rowData.TIPO_MODULO.toString() == "P") {
                                $(td).html("<i class='icon-pushpin' style='color: black;font-size:14px;'>")
                                if (rowData.MONEDA == '0002')//SOLES
                                    arrTotalVentaNormal.push(rowData.VALOR);
                                else
                                    arrTotalVentaNormalD.push(rowData.VALOR);
                            } else if (rowData.TIPO_MODULO.toString() == "R") {
                                $(td).html("<i class='icon-pushpin' style='color: #094CB4;font-size:14px;'>")
                                if (rowData.MONEDA == '0002')//SOLES
                                    arrTotalVentaRapida.push(rowData.VALOR);
                                else
                                    arrTotalVentaRapidaD.push(rowData.VALOR);
                            } else if (rowData.TIPO_MODULO.toString() == "A") {
                                $(td).html("<i class='icon-pushpin' style='color: #5535B0;font-size:14px;'>");
                                if (rowData.MONEDA == '0002')//SOLES
                                    arrTotalVentaAnticipo.push(rowData.VALOR);
                                else
                                    arrTotalVentaAnticipoD.push(rowData.VALOR);
                            } else if (rowData.TIPO_MODULO.toString() == "X") {
                                $(td).html("<i class='icon-pushpin' style='color: #00A300;font-size:14px;'>");
                                if (rowData.MONEDA == '0002')//SOLES
                                    arrTotalVentaPos.push(rowData.VALOR);
                                else
                                    arrTotalVentaPosD.push(rowData.VALOR);
                            }
                            //else if (rowData.TIPO_MODULO.toString() == "T") { // Agregué tipo de venta = 'T' (12/02/18)
                            //    $(td).html("<i class='icon-pushpin' style='color: #00839A; font-size:14px;'>");
                            //    if (rowData.MONEDA == '0002')//SOLES
                            //        arrTotalVentaTomPed.push(rowData.VALOR);
                            //    else
                            //        arrTotalVentaTomPedD.push(rowData.VALOR);
                            //} 
                        }
                        $(td).attr("align", "center");
                    }

                },
                {
                    data: "CODE", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "EMISION", createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html(rowData.EMISION);

                        $(td).attr("align", "left");
                    },
                    type: "fechaHora"

                },
                {
                    data: "CLIE_DOID_NRO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "RAZON_SOCIAL", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "MONEDA_DESC_CORTA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "BASE_IMPONIBLE", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); }

                },
                {
                    data: "DETRACCION", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); }
                    //visible: false
                },
                {
                    data: "VALOR", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); }

                },
                {
                    data: "MOPA_DESC", createdCell: function (td, cellData, rowData, row, col) {
                        if (rowData.CONTRAENTREGA_IND === "S")
                            $(td).html(rowData.MOPA_DESC + "<br><small style='color:#6C7686;'>*CONTRAENTREGA</small>");
                        else
                            $(td).html(rowData.MOPA_DESC);


                        $(td).attr("align", "left");
                    }

                },
                {
                    data: "FOPA_DESC", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "NOMBRE_VENDEDOR", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); },
                    visible: false

                },
                {
                    data: "VENDEDOR_USUA_ID", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "USUA_ID_REG", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "ATENDIDO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "ANULADO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");

                    }

                },
                {
                    data: "ASIENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }
                },
                {
                    data: "GLOSA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }
                },
                {
                    data: null, createdCell: function (td, cellData, rowData, row, col) {

                        $(td)
                            .html("<a class='btn blue' onclick=\"imprimirDetalle('" + rowData.CODE + "','" + rowData.TIPO_MODULO + "','" + rowData.TIPO_DCTO + "','" + rowData.ELECTRONICO_IND + "')\"><i class='icon-print'></i></a><a class='btn red' onclick=\"tracking('" + rowData.CODE + "','" + rowData.NUM_DCTO + "','" + rowData.TIPO_DCTO + "')\"><i class='icon-search'></i></a>")

                            .attr("align", "center");
                    }

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
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                var autoSuma = function (p_Array) {
                    if (p_Array.length)
                        return p_Array.reduce(function (a, b) { return intVal(a) + intVal(b); });
                    else
                        return 0;
                };

                // Total over this page
                if (api.column(7).data().length) {
                    var auxArray = new Array();
                    var auxArray2 = new Array();
                    //filtro
                    api.columns(0, { page: 'current' }).data()[0].filter(function (e, d) {
                        if (e.MONEDA == '0002')
                            auxArray.push(e.VALOR);
                        else
                            auxArray2.push(e.VALOR)
                    });

                    pageTotalMoba = autoSuma(auxArray);

                    pageTotalMoal = autoSuma(auxArray2)


                } else {
                    pageTotalMoba = 0
                    pageTotalMoal = 0;
                };

                var SMOBA = "S/.";
                var SMOAL = "US$";

                $("#tdVtaNormalSol").html("<span style='color:black;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaNormal)).toString() + "</span>");
                $("#tdVtaNormalDol").html("<span style='color:black;'>" + SMOAL + formatoMiles(autoSuma(arrTotalVentaNormalD)).toString() + "</span>");

                $("#tdVtaRapidaSol").html("<span style='color:#094CB4;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaRapida)).toString() + "</span>");
                $("#tdVtaRapidaDol").html("<span style='color:#094CB4;'>" + SMOAL + formatoMiles(autoSuma(arrTotalVentaRapidaD)).toString() + "</span>");

                $("#tdVtaAnuladaSol").html("<span style='color:#AD193E;'>" + SMOBA + formatoMiles(autoSuma(arrTotalAnulados)).toString() + "</span>");
                $("#tdVtaAnuladaDol").html("<span style='color:#AD193E;'>" + SMOAL + formatoMiles(autoSuma(arrTotalAnuladosD)).toString() + "</span>");

                $("#tdVtaAnticipoSol").html("<span style='color:#5535B0;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaAnticipo)).toString() + "</span>");
                $("#tdVtaAnticipoDol").html("<span style='color:#5535B0;'>" + SMOAL + formatoMiles(autoSuma(arrTotalVentaAnticipoD)).toString() + "</span>");

                $("#tdVtaPosSol").html("<span style='color:#00A300;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaPos)).toString() + "</span>");
                $("#tdVtaPosDol").html("<span style='color:#00A300;'>" + SMOAL + formatoMiles(autoSuma(arrTotalVentaPosD)).toString() + "</span>");

                // Agregué totales para ventas del tip 'Toma Pedido' - ERICK (13/02/2018)
                $("#tdVtaTomPedSol").html("<span style='color:#00839A;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaTomPed)).toString() + "</span>");
                $("#tdVtaTomPedDol").html("<span style='color:#00839A;'>" + SMOAL + formatoMiles(autoSuma(arrTotalVentaTomPedD)).toString() + "</span>");

                $("#tdTotales").html("<strong><label style='font-weight: 600;'>&nbsp;Total en página: S/. " + formatoMiles(pageTotalMoba).toString() + " | US$ " + formatoMiles(pageTotalMoal).toString() + "</label></strong>");

                //var textHTML = "<i class='icon-pushpin' style='color: red;font-size:14px;'/> <span style='color:red;'>" + SMOBA + formatoMiles(autoSuma(arrTotalAnulados)).toString() + " / " + SMOAL + formatoMiles(autoSuma(arrTotalAnuladosD)).toString() + "</span>" +
                //    " <i class='icon-pushpin' style='color: blue;font-size:14px;'/> <span style='color:blue;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaRapida)).toString() + " / " + SMOAL + formatoMiles(autoSuma(arrTotalVentaRapidaD)).toString() + "</span>" +
                //    " <i class='icon-pushpin' style='color: black;font-size:14px;'/> <span style='color:black;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaNormal)).toString() + " / " + SMOAL + formatoMiles(autoSuma(arrTotalVentaNormalD)).toString() + "</span>" +
                //    " <i class='icon-pushpin' style='color: purple;font-size:14px;'/> <span style='color:purple;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaAnticipo)).toString() + " / " + SMOAL + formatoMiles(autoSuma(arrTotalVentaAnticipoD)).toString() + "</span>" +
                //    " <i class='icon-pushpin' style='color: green;font-size:14px;'/> <span style='color:green;'>" + SMOBA + formatoMiles(autoSuma(arrTotalVentaPos)).toString() + " / " + SMOAL + formatoMiles(autoSuma(arrTotalVentaPosD)).toString() + "</span>";


                //// Update footer
                //$("#spTotales").html(textHTML);
                //$("#spTotal").html("S/. " + formatoMiles(pageTotalMoba).toString() + " | US$ " + formatoMiles(pageTotalMoal).toString());

            }
        }


        oTable = iniciaTabla('tblDocumento', parms);
        //  $(".ColVis.TableTools").remove();

        //$(".DTTT").after("<p class='totales'>SUBTOTALES: <SPAN id='spTotales'></SPAN></p>");
        //$(".dataTables_length").after("<p class='totales'>Total en página: <span id='spTotal'></span></p>");

        actualizarEstilos();
        $('#tblDocumento tbody').on('click', 'tr', function () {
            sCodMovContSelec = "";
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {

                let pos = oTable.fnGetPosition(this);
                let row = oTable.fnGetData(pos);

                let sCodDoc = row.CODE;

                codigoVenta = row.CODE;

                let sPrefDoc = sCodDoc.substring(0, 2);
                codigo_vActual = sCodDoc;
                moneda = row.MONEDA_DESC_CORTA;

                if (sPrefDoc === 'AP') {
                    obtenerCabeceraAnticipo(sCodDoc);
                } else {
                    obtenerCabeceraVenta(sCodDoc);
                }

                sCodMovContSelec = row.COD_MOV_CONT;
                $('#divAsiento').slideUp();
                $('#asientos_contables').css({ "display": "none" });
                $("#modal_info").modal('show');

                $('#divAsiento').slideUp();
                $('#divDetVenta').slideDown();

                $("#btnVerDetVenta").css({ "display": "none" });
                if (prmtACON == "SI") {
                    $("#btnVerAsiento").css({ "display": "inline" });
                } else {
                    $("#btnVerAsiento").css({ "display": "none" });
                }
            }
        });
        $('#tblDocumento tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
        });
    }

    var obtenerDocumentos = function () {
        var data = new FormData();
        var CTLG_CODE = $("#cboEmpresa").val();
        var SCSL_CODE = $("#cboEstablecimiento").val();
        var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
        var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
        var CLIENTE = ($("#cboCliente").val() == "TODOS" || $("#cboCliente").val() == "") ? '' : parseFloat($("#cboCliente :selected").val()).toString();
        var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
        var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
        var GRUPO = ($("#cboGrupoProductos").val() === null ? '' : $("#cboGrupoProductos").val().toString())
        var p_TIPO_VTA = ($("#cboTipoVenta").val() == "TODOS") ? '' : $("#cboTipoVenta").val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('DCTO_CODE', DCTO_CODE);
        data.append('VENDEDOR', VENDEDOR);
        data.append('CLIENTE', CLIENTE);
        data.append('PRODUCTO', PRODUCTO);
        data.append('ESTADO', ESTADO);
        data.append('SERIE_DCTO', $("#txtSerie").val());
        data.append('NUM_DCTO', $("#txtNumero").val());
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());
        data.append('GRUPO_PROD', GRUPO);
        data.append('p_TIPO_VTA', p_TIPO_VTA);

        $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLDOCT.ashx?OPCION=3",
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

                    arrTotalAnulados = new Array();
                    arrTotalAnuladosD = new Array();

                    arrTotalVentaAnticipo = new Array();
                    arrTotalVentaAnticipoD = new Array();

                    arrTotalVentaPos = new Array();
                    arrTotalVentaPosD = new Array();

                    arrTotalVentaTomPed = new Array();
                    arrTotalVentaTomPedD = new Array();

                    oTable.fnAddData(datos);
                    oTable.fnSort([[3, "desc"]]);
                } else {
                    infoCustom2("No se encontraron datos!");
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

        $('#cboEmpresa').on('change', function () {
            //Bloquear("ventana");
            fillCboEstablecimiento();
            //fillCboTipoDoc();
            //fillCboVendedor();
            //fillProducto();
            //fillCliente();
            //fillGrupoProductos();
            //Desbloquear("ventana");
        });

        $("#cboGrupoProductos").on("change", function () {
            fillProducto();
        });

        $("#btnBusquedaAvanz").on("click", function () {
            $("#iconAvanz").removeClass();
            let bVer = $("#btnBusquedaAvanz").data("ver");
            if (bVer) {
                $("#btnBusquedaAvanz").data("ver", false);
                $(".bavanzado").hide();
                $("#iconAvanz").addClass("icon-chevron-down");
            } else {
                $("#btnBusquedaAvanz").data("ver", true);
                $(".bavanzado").show();
                $("#iconAvanz").addClass("icon-chevron-up");
                if (!controlProCli) {
                    fillCboTipoDoc();
                    fillCboVendedor();
                    fillProducto();
                    fillCliente();
                    fillGrupoProductos();
                }
                controlProCli = true;
            }
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

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("DOCUMENTO DE VENTA");
            cargarCorreos();
            $('#divMail').modal('show');
        });

        $('#btnVerDetVenta').click(function (e) {
            $('#asientos_contables').slideUp();
            $('#divDetVenta').slideDown();

            $("#btnVerDetVenta").css({ "display": "none" });
            if (prmtACON == "SI") {
                $("#btnVerAsiento").css({ "display": "inline" });
            } else {
                $("#btnVerAsiento").css({ "display": "none" });
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
            //mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);

        $('#btnGenerarAsiento').on('click', function () {
            let sCodVenta = codigoVenta;
            sCodVenta = $.trim(sCodVenta);

            if (sCodVenta === "") {
                infoCustom("Imposible continuar. ¡El documento no está completado!");
                return;
            }

            if (sCodVenta.substring(0, 2) == "V0") {
                let aoDocVta = fnGetDocVta(sCodVenta);

                if (aoDocVta.length === 0) {
                    infoCustom("No se encontró el Documento: " + sCodVenta);
                    return;
                }

                let sAnuladoInd = aoDocVta[0].AnuladoInd;
                if (sAnuladoInd === "S") {
                    infoCustom("Imposible continuar. ¡El documento está anulado!");
                    return;
                }

                let sCompletoInd = aoDocVta[0].CompletoInd;
                if (sCompletoInd === "N") {
                    infoCustom("Imposible continuar. ¡El documento no está completado!");
                    return;
                }

                let sCodMovContab = aoDocVta[0].MOVCONT_CODE;
                sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
                if (sCodMovContab === "") {
                    fnGenerarAsiento(sCodVenta);
                }
            } else {
                let aoDocVta = fnGetDocAnti(sCodVenta);

                if (aoDocVta.length === 0) {
                    infoCustom("No se encontró el Documento: " + sCodVenta);
                    return;
                }

                let sAnuladoInd = aoDocVta[0].AnuladoInd;
                if (sAnuladoInd === "S") {
                    infoCustom("Imposible continuar. ¡El documento está anulado!");
                    return;
                }

                let sCompletoInd = aoDocVta[0].CompletoInd;
                if (sCompletoInd === "N") {
                    infoCustom("Imposible continuar. ¡El documento no está completado!");
                    return;
                }

                let sCodMovContab = aoDocVta[0].MOVCONT_CODE;
                sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
                if (sCodMovContab === "") {
                    fnGenerarAsientoAnti(sCodVenta);
                }
            }


        });

        $("#btnVerAsiento").on("click", function () {
            var sCodVenta = codigoVenta;
            sCodVenta = $.trim(sCodVenta);
            console.log(sCodVenta);
            if (sCodVenta.substring(0, 1) == "V") {
                var oDocVenta = fnGetDocVta(sCodVenta);
            } else {
                var oDocVenta = fnGetDocAnti(sCodVenta);
            }


            //fnCargaTablaCuentasC(oDocVenta, sCodVenta, sCodMovContSelec);
            //fnCargaTablaCuentasC(oDocVenta, sCodVenta, sCodVenta); //CAMBIO AVENGER

            $('#divDetVenta').slideUp();
            $('#asientos_contables').slideDown();
            $("#btnVerAsiento").css({ "display": "none" });
            $("#btnVerDetVenta").css({ "display": "inline" });
            fnGetMovContable(sCodVenta);
        });

        $("#btnGenerarPDF").on("click", function () {//DPORTA
            fnGenerarPDF(codigoParaPDF);
        });

    };

    //var fnCargaTablaCuentasC = function (sCodVenta, oDocVta, sCodAsiento) {

    //    $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
    //        $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
    //            .done(function (script, textStatus) {
    //                vAsientoContable = LAsientoContable;
    //                vAsientoContable.sTipoMov = sCodModulo;
    //                vAsientoContable.sCodDoc = sCodVenta;
    //                vAsientoContable.objDoc = oDocVta;
    //                vAsientoContable.init(sCodAsiento);
    //            });
    //    });

    //}

    var fnGetDocVta = function (sCodVenta) {
        let aoDocVta = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVMDOCV.ashx?OPCION=GET_DOC_VTA&p_CODE=" + sCodVenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocVta = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de venta.");
            }
        });
        Desbloquear("ventana");

        return aoDocVta;
    };

    var fnGetDocAnti = function (sCodVenta) {//dporta
        let aoDocVta = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVMANTI.ashx?OPCION=GET_DOC_ANTI&p_CODE=" + sCodVenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocVta = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de anticipo.");
            }
        });
        Desbloquear("ventana");

        return aoDocVta;
    };

    var fnTablaAsientosIni = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "NRO_MOV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "ANIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "MES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TIPO_ASIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_EMI_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_TRANSAC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "DECLARADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "MONE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        type: formatoMiles;
                    }
                },
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
        // $("#tblLista").removeAttr("style");

        $("#tblLista tbody").on("click", "td.asiento", function (event) {

            event.stopPropagation();
            var oTr = $(this).parent();

            $(this).find("a.VerAsiento").html("Ocultar");

            if (oTableLista.fnIsOpen(oTr)) {
                $(this).find("a.VerAsiento").html("Ver Asiento");
                oTr.removeClass("details");
                oTableLista.fnClose(oTr);
                return;
            }

            var pos = oTableLista.api(true).row(oTr).index();
            var row = oTableLista.fnGetData(pos);
            var sCodigo = row.CODIGO;


            var oMovCuentaDet = fnListaMovContableDet(sCodigo);

            var sHtml = "<div class='span12' id='divTblCuentas'>";
            sHtml += "<div class='span12' id='divTblCuentas'>";
            sHtml += "<table id='tblCuentas' class='table table-bordered'>";
            sHtml += "<thead>";
            sHtml += "<tr style='background-color: rgb(3, 121, 56); color: aliceblue;'>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Correlativo</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Documento</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>F. Emisión</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Doc Id</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Persona</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Descripción</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Centro de Costos</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Cuenta</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeME</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberME</th>";
            sHtml += "</tr>";
            sHtml += "</thead>";
            sHtml += "<tbody>";

            if (!isEmpty(oMovCuentaDet)) {
                var nTotalDebeMN = 0;
                var nTotalHaberMN = 0;
                var nTotalDebeME = 0;
                var nTotalHaberME = 0;
                $.each(oMovCuentaDet, function (key, value) {
                    var sCorrelativo = value.ITEM;
                    var sDocumento = value.DCTO;
                    var sFEmision = value.FECHA_DCTO;
                    var sCodIdent = value.DOC_IDENT;
                    var sPersona = value.PERSONA;
                    var sDescripcionItem = value.CTAS;
                    var sCCosto = value.CCOSTO_DET;
                    var sCuenta = value.CTAS_CODE;
                    var nDebeMN = value.DEBE_MN;
                    var nHaberMN = value.HABER_MN;
                    var nDebeME = value.DEBE_ME;
                    var nHaberME = value.HABER_ME;

                    sHtml += ("<tr>");
                    sHtml += ("<td style='text-align:center;'>" + sCorrelativo + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sDocumento + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sFEmision + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sCodIdent + "</td>");
                    sHtml += ("<td>" + sPersona + "</td>");
                    sHtml += ("<td>" + sDescripcionItem + "</td>");
                    sHtml += ("<td>" + sCCosto + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + sCuenta + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeME) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberME) + "</td>");
                    sHtml += ("</tr>");

                    nTotalDebeMN = nTotalDebeMN + nDebeMN;
                    nTotalHaberMN = nTotalHaberMN + nHaberMN;

                    nTotalDebeME = nTotalDebeME + nDebeME;
                    nTotalHaberME = nTotalHaberME + nHaberME;
                });
            }
            sHtml += ("<tr style='background-color: rgb(237, 208, 0); color: #006232;'>");
            sHtml += ("<td colspan='8' style='text-align:right;font-weight:bold;'>Total</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeME) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberME) + "</td>");
            sHtml += ("</tr>");

            sHtml += "</tbody>";
            sHtml += "</table>";
            sHtml += "</div>";

            oTableLista.fnOpen(oTr, sHtml, "details");
        });
    };

    var fnGetMovContable = function (sCodMovContab) {
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LMCO&p_DCTO_CODE=" + sCodMovContab,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Asiento Contable.");
            }
        });
    };

    var fnListaMovContableDet = function (sCodMovContab) {
        var oMovCuentaDet = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LDCO&p_DCTO_CODE=" + sCodMovContab,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oMovCuentaDet = datos; // JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Detalle del Movimiento Contable.");
            }
        });
        return oMovCuentaDet;
    };

    var fnGenerarAsiento = function (sCodVenta) {

        var data = new FormData();
        data.append("OPCION", "GEN_ASIENTO");
        data.append("p_CODE", sCodVenta);
        data.append("USUA_ID", $("#ctl00_txtus").val());
        data.append("p_NCMOCONT_CODIGO", "0001");
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    infoCustom2(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    alertCustom(response);
                    return;
                }

                $("#divGenAsiento").hide();

                //fnGetMovContable(response);
                fnGetMovContable(sCodVenta); //AVENGER

                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo generar el asiento.");
            }
        });
        Desbloquear("ventana");
    };

    var fnGenerarPDF = function (sCodVenta) { //DPORTA

        var data = new FormData();
        data.append("OPCION", "GENERAR_PDF");
        data.append("p_CODE", sCodVenta);
        data.append("p_CTLG_CODE", $("#cboEmpresa").val());

        if (sCodVenta.substring(0, 2) == "AP") {
            $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmanti.ashx",
                contentType: false,
                data: data,
                processData: false,
                async: false,
                success: function (data) {
                    //Desbloquear("ventana");
                    if (data == "OK") {
                        //exito();
                        //$("#divBotones1").hide();
                        //$("#divBotones2").show();
                        $("[id*=btnLibroPDF]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
                    } else {
                        noexito();
                        return;
                    }
                },
                error: function (msg) {
                    //Desbloquear("ventana");
                    noexitoCustom("No se pudo generar el PDF.");
                }
            });
        } else {
            if ($("#hfTipoModulo").val() == "X") {// SOLO PARA LAS VENTAS QUE TIENEN ORDENES DE SERVICIO O SON REALIZADAS EN ESAS PANTALLAS
                $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmdovs.ashx",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    success: function (data) {
                        //Desbloquear("ventana");
                        if (data == "OK") {
                            //exito();
                            //$("#divBotones1").hide();
                            //$("#divBotones2").show();
                            $("[id*=btnLibroPDF]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
                        } else {
                            noexito();
                            return;
                        }
                    },
                    error: function (msg) {
                        //Desbloquear("ventana");
                        noexitoCustom("No se pudo generar el PDF.");
                    }
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmdocv.ashx",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    success: function (data) {
                        //Desbloquear("ventana");
                        if (data == "OK") {
                            //exito();
                            //$("#divBotones1").hide();
                            //$("#divBotones2").show();
                            $("[id*=btnLibroPDF]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
                        } else {
                            noexito();
                            return;
                        }
                    },
                    error: function (msg) {
                        //Desbloquear("ventana");
                        noexitoCustom("No se pudo generar el PDF.");
                    }
                });
            }
            
        }
        
        //Desbloquear("ventana");
    };

    var fnGenerarAsientoAnti = function (sCodVenta) {//dporta

        var data = new FormData();
        data.append("OPCION", "GEN_ASIENTO");
        data.append("p_CODE", sCodVenta);
        data.append("USUA_ID", $("#ctl00_txtus").val());
        data.append("p_NCMOCONT_CODIGO", "0009");
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmanti.ashx",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    infoCustom2(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    alertCustom(response);
                    return;
                }

                $("#divGenAsiento").hide();

                //fnGetMovContable(response);
                fnGetMovContable(sCodVenta); //AVENGER

                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo generar el asiento.");
            }
        });
        Desbloquear("ventana");
    };

    var fnCargaInicial = function () {


        $("#btnBusquedaAvanz").data("ver", false);
        $(".bavanzado").hide();
        $("#iconAvanz").addClass("icon-chevron-down");

        $("#tblTotalesRes .centro").css("text-align", "center");
        $("#tblTotalesRes .derecha").css("text-align", "right");

    };

    return {
        init: function () {
            cargarParametrosSistema();
            plugins();
            crearTablaVacia();
            fnTablaAsientosIni();
            fillCboEmpresa();
            EventoControles();
            //obtenerDocumentos();
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
                    prmtODET = datos[0].VALOR;
                    $("#DivtblDetalleVentas").attr("style", "display:none");//se oculta el que está con almacen en el detalle
                    $("#DivtblDetalleVentas2").attr("style", "display:inline");//se muestra el que está sin almacen en el detalle 
                } else {
                    prmtODET = datos[0].VALOR;
                    $("#DivtblDetalleVentas").attr("style", "display:inline");//se muestra el que está con almacen en el detalle
                    $("#DivtblDetalleVentas2").attr("style", "display:none");//se oculta el que está sin almacen en el detalle 
                }
            }
        },
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
}

function solonumbef(string) {
    var out = '';
    //Se añaden los caracteres validos
    var filtro = 'ebfBEF1234567890';//Caracteres validos
    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
}
function verificarFormatoTicket(tipoDoc) {
    Bloquear("ventana");

    var data = new FormData();
    data.append('DOC_CODE', tipoDoc);
    data.append('CTLG', $("#cboEmpresa").val());
    data.append('SCSL', $("#cboEstablecimiento").val());

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=FORTICK",
        contentType: false,
        data: data,
        processData: false,
        async: false,
        cache: false
    })
        .success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                if (datos[0].FORMATO_TICKET == "SI") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
                //noexito();
            }
        })
        .error(function () {
            Desbloquear("ventana");
            //noexito();
        });

    return jqxhr.responseText;

}

function imprimirDetalle(codigo, tipoModulo, tipoDoc, electronicoInd) {
    //Bloquear("ventana");
    //Añadido para que tmb se puedan imprimir los anticipos
    var anticipo = 'AP';
    var index = codigo.indexOf(anticipo);

    if (index >= 0) {
        var data = new FormData();
        data.append('p_CODE', codigo);
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMANTI.ashx?OPCION=IMPR",
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
                //Desbloquear("ventana");
            })
            .error(function () {
                //Desbloquear("ventana");
                noexito();
            });
    } else {
        if (electronicoInd == 'S') { //DPORTA 16/05/2022
        //if (verificarFormatoTicket(tipoDoc) == '[{"FORMATO_TICKET" :"SI"}]') {
            if (tipoModulo == 'X') { // SOLO PARA LAS VENTAS QUE TIENEN ORDENES DE SERVICIO O SON REALIZADAS EN ESAS PANTALLAS
                var data = new FormData();
                data.append('p_CODE', codigo);
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    cache: false
                })
                    .success(function (datos) {
                        //Desbloquear("ventana");
                        if (datos != null) {
                            $("#divDctoImprimir").html(datos);
                            setTimeout(function () {
                                //imprimirDiv("divDctoImprimir", "", true);//Comentado porque la impresion no es la correcta
                                window.print();
                            }, 0.0000000000000001)
                        } else {
                            noexito();
                        }

                    })
                    .error(function () {
                        //Desbloquear("ventana");
                        noexito();
                    });
            } else {
                var data = new FormData();
                data.append('p_CODE', codigo);
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    cache: false
                })
                    .success(function (datos) {
                        //Desbloquear("ventana");
                        if (datos != null) {
                            $("#divDctoImprimir").html(datos);
                            setTimeout(function () {
                                //imprimirDiv("divDctoImprimir", "", true);//Comentado porque la impresion no es la correcta
                                window.print();
                            }, 0.0000000000000001)
                        } else {
                            noexito();
                        }

                    })
                    .error(function () {
                        //Desbloquear("ventana");
                        noexito();
                    });
            }
            
        } else {
            if (tipoDoc == '0012' || tipoDoc == '0101') { //0012 ticket - 0101 es para los tickets o notas de venta o lo que sea que tenga ese código
                var data = new FormData();
                data.append('p_CODE', codigo);
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=IMPR",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: false,
                    cache: false
                })
                    .success(function (datos) {
                        //Desbloquear("ventana");
                        if (datos != null) {
                            $("#divDctoImprimir").html(datos);
                            setTimeout(function () {
                                //imprimirDiv("divDctoImprimir", "", true);//Comentado porque la impresion no es la correcta
                                window.print();
                            }, 0.0000000000000001)
                        } else {
                            noexito();
                        }

                    })
                    .error(function () {
                        //Desbloquear("ventana");
                        noexito();
                    });
            } else {
                crearImpresion(codigo);
                //Desbloquear("ventana");
            }
        }
    }
}

function tracking(codigo, nroDoc, tipoDoc) {
    if (codigo != "") {
        window.open("?f=NVLTDVE&cod=" + codigo + "&doc=" + nroDoc + "&tipDoc=" + tipoDoc + "&emp=" + $('#cboEmpresa').val() + "&sucu=" + $('#cboEstablecimiento').val(), '_blank');
    }
}

function imprimirListaDctosVenta() {
    //Bloquear("ventana")
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
    var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
    var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : $("#cboCliente :selected").text();
    var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
    var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('DCTO_CODE', DCTO_CODE);
    data.append('VENDEDOR', VENDEDOR);
    data.append('CLIENTE', CLIENTE);
    data.append('PRODUCTO', PRODUCTO);
    data.append('ESTADO', ESTADO);
    data.append('SERIE_DCTO', $("#txtSerie").val());
    data.append('NUM_DCTO', $("#txtNumero").val());
    data.append('DESDE', $("#txtDesde").val());
    data.append('HASTA', $("#txtHasta").val());
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLDOCV.ashx?OPCION=5",
        async: false,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            //Desbloquear("ventana")
            if (datos != null) {
                $("#divDctoImprimir").html(datos);
                $("#divDctoImprimir #tblDocumento").attr("border", "1");
                $("#divDctoImprimir #tblDocumento").removeClass("display").removeClass("DTTT_selectable");
                var nomSucursal, nomEmpresa;
                nomSucursal = $("#cboEstablecimiento :selected").html();
                nomEmpresa = $("#cboEmpresa :selected").html();
                //imprimirDiv("divDctoImprimir", "DOCUMENTOS DE VENTA - " + nomSucursal);

                $("#divDctoImprimir").prepend("<hr></hr>")
                $("#divDctoImprimir").prepend("<h5 class='arial'>DOCUMENTOS DE VENTA - " + nomSucursal + "</h5>")
                $("#divDctoImprimir").prepend("<h4 class='arial'>" + nomEmpresa + "</h4>")
                setTimeout(function () {
                    window.print();
                }, 0.0000000000000001);
            }
        },
        error: function (msg) {
            //Desbloquear("ventana")
            alertCustom("No se pudo obtener correctamente los documentos de venta.");
        }
    });
}
var detallesVenta = [];
function obtenerDetalleVenta(codigo) {

    $("#divDetVta").show();
    $("#divDetAnticipo").hide();

    //Bloquear('tblDetalleVenta');

    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LISTA_DET_FAST&p_FVBVTAC_CODE=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos2) {
            $("#tblDetalleVenta tbody").html('');
            if (datos2 != null) {
                for (var i = 0; i < datos2.length; i++) {

                    if ((datos2[i].PROD_CODIGO_ANTIGUO).substring(0, 2) == "AP")
                        var tipo = "ANTICIPO";
                    else
                        var tipo = datos2[i].TIPO;

                    $("#tblDetalleVenta tbody").append('<tr>' +
                        '<td style="text-align:center">' + datos2[i].ITEM + '</td>' +
                        '<td>' + datos2[i].NOMBRE_IMPRESION + '</td>' +
                        '<td style="text-align:center">' + tipo + '</td>' +
                        '<td >' + datos2[i].DESC_ALMC + '</td>' +
                        '<td style="text-align:center">' + parseFloat(datos2[i].CANTIDAD).toFixed(2) + '</td>' +
                        '<td>' + datos2[i].DESC_UNIDAD + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_PU : datos2[i].PU) + '</td>' +
                        '<td style="text-align:center">' + (parseFloat(datos2[i].CANTIDAD) * (moneda == 'USD' ? datos2[i].CONVERT_PU : datos2[i].PU)).toFixed(2) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_DESCUENTO : datos2[i].DESCUENTO) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_TOTAL : datos2[i].TOTAL) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_ISC : datos2[i].ISC) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_DETRACCION : datos2[i].DETRACCION) + '</td>' +
                        '<td>' + datos2[i].ESTADO_DESP + '</td>');
                }
            }
            //Desbloquear('tblDetalleVenta');
        },
        error: function (msg) {
            //Desbloquear('tblDetalleVenta');
            alertCustom('Error al obtener detalle de la venta.');
        }
    });
}

function obtenerDetalleVenta2(codigo) {

    $("#divDetVta").show();
    $("#divDetAnticipo").hide();

    //Bloquear('tblDetalleVenta2');

    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LISTA_DET_FAST&p_FVBVTAC_CODE=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos2) {
            $("#tblDetalleVenta2 tbody").html('');
            if (datos2 != null) {
                for (var i = 0; i < datos2.length; i++) {

                    if ((datos2[i].PROD_CODIGO_ANTIGUO).substring(0, 2) == "AP")
                        var tipo = "ANTICIPO";
                    else
                        var tipo = datos2[i].TIPO;

                    $("#tblDetalleVenta2 tbody").append('<tr>' +
                        '<td style="text-align:center">' + datos2[i].ITEM + '</td>' +
                        '<td>' + datos2[i].NOMBRE_IMPRESION + '</td>' +
                        '<td style="text-align:center">' + tipo + '</td>' +
                        //'<td >' + datos2[i].DESC_ALMC + '</td>' +
                        '<td style="text-align:center">' + parseFloat(datos2[i].CANTIDAD).toFixed(2) + '</td>' +
                        '<td>' + datos2[i].DESC_UNIDAD + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_PU : datos2[i].PU) + '</td>' +
                        '<td style="text-align:center">' + (parseFloat(datos2[i].CANTIDAD) * (moneda == 'USD' ? datos2[i].CONVERT_PU : datos2[i].PU)).toFixed(2) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_DESCUENTO : datos2[i].DESCUENTO) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_TOTAL : datos2[i].TOTAL) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_ISC : datos2[i].ISC) + '</td>' +
                        '<td style="text-align:center">' + (moneda == 'USD' ? datos2[i].CONVERT_DETRACCION : datos2[i].DETRACCION) + '</td>' +
                        '<td>' + datos2[i].ESTADO_DESP + '</td>');
                }
            }
            //Desbloquear('tblDetalleVenta2');
        },
        error: function (msg) {
            //Desbloquear('tblDetalleVenta2');
            alertCustom('Error al obtener detalle de la venta.');
        }
    });
}

//EMAIL
function cargarCorreos() {
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

        for (var c in data) {
            if (data[c].codigo === $('#hfPIDM').val()) {
                $("#cboCorreos")[0].selectize.setValue(data[c].email);
                break;
            }
        }
    });

    if ($("#txtRemitente").val() == "") {
        $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
    }
};

function enviarCorreo() {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=correo" +
                "&p_CODE=" + codigo_vActual +
                "&p_CTLG_CODE=" + $('#cboEmpresa').val() +
                "&REMITENTE=" + $('#txtRemitente').val() +
                "&NREMITENTE=" + $('#txtRemitente').val() +
                "&DESTINATARIOS=" + destinos +
                "&ASUNTO=" + $('#txtAsunto').val() +
                "&MENSAJE=" + $('#txtcontenido').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("No se encontró el archivo adjunto. Correo no se envió correctamente.");
                } else {
                    exito();
                    $('#txtcontenido').val("");
                }
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

$("#divMail").on("show", function () {
    $("#modal_info").modal("hide");
});
$(".close_mail").on("click", function () {
    $("#modal_info").modal("show");
});


function obtenerCabeceraVenta(codigo) {
    //codigoVenta = codigo;
    codigoParaPDF = codigo; //DPORTA
    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCodDoc").val(codigoParaPDF);

    Bloquear('ventanaInfo');
    var cod;
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvldoct.ashx?OPCION=LDOCC&p_FVBVTAC_CODE=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            console.log(datos);
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    cod = datos[i].CODE;
                    if (datos[i].VIGENCIA == 'ANULADO') {
                        if (datos[i].GLOSA == 'N') {
                            $("#modalTitulo").html('VENTA ANULADA ' + datos[i].CODE);
                        } else {
                            $("#modalTitulo").html('VENTA ANULADA ' + datos[i].CODE + ' - ' + datos[i].GLOSA.toUpperCase());
                        }
                        $("#tblInfo").css('background-color', '#F5C4C4');
                        $("#tblMontos").css('background-color', '#F5C4C4');
                    } else {
                        if (datos[i].VENTA_RAPIDA_IND == 'S') {
                            if (datos[i].GLOSA == 'N') {
                                $("#modalTitulo").html('VENTA RÁPIDA ' + datos[i].CODE);
                            } else {
                                $("#modalTitulo").html('VENTA RÁPIDA ' + datos[i].CODE + ' - ' + datos[i].GLOSA.toUpperCase());
                            }
                            $("#tblInfo").css('background-color', '#F7F2CE');
                            $("#tblMontos").css('background-color', '#F7F2CE');
                        } else {
                            if (datos[i].GLOSA == 'N') {
                                $("#modalTitulo").html('VENTA ' + datos[i].CODE);
                            } else {
                                $("#modalTitulo").html('VENTA ' + datos[i].CODE + ' - ' + datos[i].GLOSA.toUpperCase());
                            }
                            $("#tblInfo").css('background-color', '#CEF7DE');
                            $("#tblMontos").css('background-color', '#CEF7DE');
                        }
                    }
                    $("#tblDoc").text(datos[i].DOCUMENTO);
                    $("#tblFecha").html(datos[i].FECHA);
                    $("#tblMoneda").text(datos[i].MONE_DESC)
                    $("#tblCliente").html(datos[i].CLIENTE);
                    $("#tblMopa").text(datos[i].MOPA_DESC + ' ' + datos[i].CONTRAENTREGA_IND);
                    $("#tblFopa").text(datos[i].FOPA_DESC);
                    $("#tblEstado").html(datos[i].ESTADO);
                    $("#tblVendedor").text(datos[i].VENDEDOR);
                    let cajaDesc = datos[i].CAJA_DESC;

                    if (datos[i].FOPA_DESC == "LETRAS DE CAMBIO") {
                        //console.log('GDFGDFG');
                        $("#tblCaja").text("CANJEADO EN LETRAS");
                    } else {
                        $.post("vistas/nv/ajax/nvldoct.ashx", { OPCION: "ALLAMORT", p_FVBVTAC_CODE: codigo },
                            function (res) {
                                let aoCuentaAmort = jQuery.parseJSON(res);
                                if (aoCuentaAmort.length === 1) {
                                    if (aoCuentaAmort[0].FABAMPR_ORD_PAGO === 'B') {
                                        $.post("vistas/nv/ajax/nvldoct.ashx", { OPCION: "CUENTA", CTLG_CODE: $("#cboEmpresa").val(), p_FVBVTAC_CODE: codigo },
                                            function (res) {
                                                let aoCuenta = jQuery.parseJSON(res);
                                                $("#tblCaja").text(aoCuenta[0].DESCRIPCION);
                                            }).done(function () { });
                                    } else {
                                        $("#tblCaja").text(cajaDesc);
                                    }
                                } else if (aoCuentaAmort.length === 0) {
                                    $("#tblCaja").text("");
                                } else {
                                    $("#tblCaja").text("VARIOS PAGOS");
                                }
                            }).done(function () { });
                    }
                    $("#hfPIDM").val(datos[i].PIDM_CLIENTE);

                    $("#tblBase").html(formatoMiles(datos[i].GRAVADA)); //IMPORTE
                    $("#tblDescuento").html(formatoMiles(datos[i].DESCUENTO));
                    $("#tblisc").html(formatoMiles(datos[i].ISC));
                    $("#tblExonerada").html(formatoMiles(datos[i].EXONERADA));
                    $("#tblGravada").html(formatoMiles(datos[i].GRAVADA));
                    $("#tblInafecta").html(formatoMiles(datos[i].INAFECTA));
                    $("#tblImporte").html(formatoMiles(datos[i].VALOR));//IMPORTE
                    $("#tblRedondeo").html(formatoMiles(datos[i].REDONDEO));
                    $("#tblDonacion").html(formatoMiles(datos[i].DONACION));
                    $("#tblDetraccion").html(formatoMiles(datos[i].DETRACCION));
                    $("#tblPercepcion").html(formatoMiles(datos[i].PERCEPCION));
                    $("#tblRetencion").html(formatoMiles(datos[i].RETENCION));
                    $("#tblPctjigv").html(formatoMiles(datos[i].PCTJ_IGV));
                    $("#tblMontoigv").html(formatoMiles(datos[i].IGV));
                    $("#tblCobrar").html(formatoMiles(datos[i].IMPORTE));//VALOR

                    if (datos[i].SIG_CLIE.length != 0) { 
                        $("#clieSiguiente").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].SIG_CLIE + "');");
                        $("#clieSiguiente").removeClass('disabled');
                        //$("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#clieSiguiente").attr('href', "javascript:fnMuestraMensaje('último');");
                        $("#clieSiguiente").addClass('disabled');
                    }
                    if (datos[i].ANT_CLIE.length != 0) {
                        $("#clieAnterior").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ANT_CLIE + "');");
                        $("#clieAnterior").removeClass('disabled');
                        //$("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#clieAnterior").attr('href', "javascript:fnMuestraMensaje('primer');");
                        $("#clieAnterior").addClass('disabled');
                    }

                    if (datos[i].SIG_DOC.length != 0) {
                        $("#corrSiguiente").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].SIG_DOC + "');");
                        $("#corrSiguiente").removeClass('disabled');
                        //$("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#corrSiguiente").attr('href', "javascript:fnMuestraMensaje('último');");
                        $("#corrSiguiente").addClass('disabled');
                    }
                    if (datos[i].ANT_DOC.length != 0) {
                        $("#corrAnterior").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ANT_DOC + "');");
                        $("#corrAnterior").removeClass('disabled');
                        //$("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#corrAnterior").attr('href', "javascript:fnMuestraMensaje('primer');");
                        $("#corrAnterior").addClass('disabled');
                    }
                    if (datos[i].SIGUIENTE.length != 0) {
                        $("#docSiguiente").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].SIGUIENTE + "');");
                        $("#docSiguiente").removeClass('disabled');
                        $("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#docSiguiente").attr('href', "javascript:fnMuestraMensaje('último');");
                        $("#docSiguiente").addClass('disabled');
                    }
                    if (datos[i].ANTERIOR.length != 0) {
                        $("#docAnterior").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ANTERIOR + "');");
                        $("#docAnterior").removeClass('disabled');
                        //$("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#docAnterior").attr('href', "javascript:fnMuestraMensaje('primer');");
                        $("#docAnterior").addClass('disabled');
                    }

                    var dUltimo = datos[i].ULTIMO;
                    if (dUltimo != codigo) {
                        $("#ultDocumento").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].ULTIMO + "');");
                        $("#ultDocumento").removeClass('disabled');
                        //$("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#ultDocumento").attr('href', "javascript:fnMuestraMensaje('último');");
                        $("#ultDocumento").addClass('disabled');
                    }
                    $("#hfUltimo").val(dUltimo);

                    var dPrimero = datos[i].PRIMERO;
                    if (dPrimero != codigo) {
                        $("#priDocumento").attr('href', "javascript:obtenerCabeceraVenta('" + datos[i].PRIMERO + "');");
                        //$("#priDocumento").removeClass('disabled');
                        //$("#divBotones1").show();
                        //$("#divBotones2").hide();
                    } else {
                        $("#priDocumento").attr('href', "javascript:fnMuestraMensaje('primer');");
                        //$("#priDocumento").addClass('disabled');
                    }
                    $("#hfPrimero").val(dPrimero);
                    $("#hfTipoModulo").val(datos[i].TIPO_MODULO);
                    $("#btnImprimirDetalle").attr('onclick', "imprimirDetalle('" + datos[i].CODE + "','" + datos[i].TIPO_MODULO + "','" + datos[i].DCTO_CODE + "','" + datos[i].ELECTRONICO_IND +"')");
                }
                if (prmtODET == "NO") {
                    obtenerDetalleVenta(cod);
                } else {
                    obtenerDetalleVenta2(cod);
                }
            }

            Desbloquear('ventanaInfo');

        },
        error: function (msg) {
            Desbloquear('ventanaInfo');
            alertCustom('Error al obtener datos de cabecera de la venta.');
            //console.log(msg);
        }
    });
}


function obtenerCabeceraAnticipo(codigo) {
    //codigoVenta = codigo;
    codigoParaPDF = codigo; //DPORTA
    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCodDoc").val(codigoParaPDF);
    Bloquear('ventanaInfo');
    var cod;
    $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVMANTI.ashx?OPCION=GET_ANTICIPO&p_CODE=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            console.log(datos);
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    //if (isEmpty(datos)) {
                    //    infoCustom("No se encontró el anticipo.");
                    //    return;
                    //}

                    cod = datos[0].CODIGO;

                    $("#modalTitulo").html('Información del anticipo ' + datos[0].CODIGO);
                    $("#tblInfo").css('background-color', '#CEF7DE');
                    $("#tblMontos").css('background-color', '#CEF7DE');


                    $("#tblDoc").text(datos[0].NUM_DCTO);
                    $("#tblFecha").html(datos[0].FECHA_EMI);
                    $("#tblMoneda").text(datos[0].MONE_DESC)
                    $("#tblCliente").html(datos[0].CLIENTE);
                    $("#tblMopa").text(datos[0].MOPA_DESC);
                    $("#tblFopa").text(datos[0].FOPA_DESC);

                    if (datos[0].ANULADO == 'ANULADO') {
                        $("#tblEstado").html(datos[0].ANULADO);
                    } else {
                        $("#tblEstado").html(datos[0].ATENDIDO + "-" + datos[0].PAGADO);
                    }


                    $("#tblVendedor").text(datos[0].VENDEDOR);
                    $("#tblCaja").text(datos[0].CAJA_DESC);


                    $("#tblBase").html(formatoMiles(datos[0].IMPORTE_GRA)); //IMPORTE
                    $("#tblDescuento").html(formatoMiles(datos[0].DESCUENTO));
                    $("#tblisc").html(formatoMiles(datos[0].ISC));
                    $("#tblExonerada").html(formatoMiles(datos[0].IMPORTE_EXO));
                    $("#tblGravada").html(formatoMiles(datos[0].IMPORTE_GRA));

                    $("#tblInafecta").html(formatoMiles(datos[0].IMPORTE_INA));
                    $("#tblImporte").html(formatoMiles(datos[0].VALOR));//IMPORTE
                    $("#tblRedondeo").html(formatoMiles(datos[0].REDONDEO));
                    $("#tblDonacion").html(formatoMiles(datos[0].DONACION));
                    $("#tblDetraccion").html(formatoMiles(datos[0].DETRACCION));

                    $("#tblPercepcion").html(formatoMiles(datos[0].PERCEPCION));
                    $("#tblRetencion").html(formatoMiles(datos[0].RETENCION));
                    $("#tblPctjigv").html(formatoMiles(datos[0].PCTJ_IGV));
                    $("#tblMontoigv").html(formatoMiles(datos[0].IGV));
                    $("#tblCobrar").html(formatoMiles(datos[0].IMPORTE));//VALOR


                    $("#clieSiguiente").attr('href', "javascript:fnMuestraMensaje('último');");
                    $("#clieSiguiente").addClass('disabled');

                    $("#clieAnterior").attr('href', "javascript:fnMuestraMensaje('primer');");
                    $("#clieAnterior").addClass('disabled');

                    $("#corrSiguiente").attr('href', "javascript:fnMuestraMensaje('último');");
                    $("#corrSiguiente").addClass('disabled');

                    $("#corrAnterior").attr('href', "javascript:fnMuestraMensaje('primer');");
                    $("#corrAnterior").addClass('disabled');

                    $("#docSiguiente").attr('href', "javascript:fnMuestraMensaje('último');");
                    $("#docSiguiente").addClass('disabled');

                    $("#docAnterior").attr('href', "javascript:fnMuestraMensaje('primer');");
                    $("#docAnterior").addClass('disabled');

                    $("#ultDocumento").attr('href', "javascript:fnMuestraMensaje('último');");
                    $("#ultDocumento").addClass('disabled');

                    $("#priDocumento").attr('href', "javascript:fnMuestraMensaje('primer');");

                    $("#hfTipoModulo").val(datos[i].TIPO_MODULO);
                    $("#divDetAnticipo").show();
                    $("#divDetVta").hide();
                    //$("#divBotones1").show();
                    //$("#divBotones2").hide();
                    let sGlosa = datos[0].GLOSA;
                    $("#tblGlosaAnticipo tbody").html(`<tr><td>${sGlosa}</td></tr>`);
                    //Agregado para que pueda imprimir desde el modal 
                    $("#btnImprimirDetalle").attr('onclick', "imprimirDetalle('" + datos[i].CODIGO + "','" + datos[i].TIPO_MODULO + "','" + datos[i].DCTO_CODE + "','" + datos[i].ELECTRONICO_IND + "')");

                }

            }
            Desbloquear('ventanaInfo');
        },
        error: function (msg) {
            Desbloquear('ventanaInfo');
            alertCustom('Error al obtener datos de cabecera de la venta.');
            //console.log(msg);
        }
    });
}


function fnMuestraMensaje(pMensaje) {
    //var hfPrimero = $("#hfPrimero").val();
    //var hfUltimo = $("#hfUltimo").val();

    //if (hfPrimero == codigo) {
    //    alertCustom("Se encuentra en el primer registro.");
    //    return;
    //}
    //if (hfUltimo == codigo) {
    //    alertCustom("Se encuentra en el último registro.");
    //    return;
    //}
    infoCustom("Se encuentra en el " + pMensaje + " registro.");
}

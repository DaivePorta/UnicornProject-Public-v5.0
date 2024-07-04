var NBLRCBA = function () {

    var plugins = function () {

        $('#cboEmpresa, #cboCtaBancaria, #cboMoneda, #cboCajero').select2();
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

    var fillCboEstablecimiento = function (empresa) {
        var select = $('#cboEstablecimiento');
        select.multiselect('destroy');
        select.multiselect();
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + empresa,
            beforesend: function () { select.hide(); Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.empty();
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {

                select.multiselect('destroy');
                select.multiselect();

                var scsl_code = ObtenerQueryString("scsl_code");
                if (scsl_code !== undefined) {
                    $('#cboEstablecimiento').val(scsl_code);
                    $("#cboEstablecimiento").multiselect('refresh');
                }

                Desbloquear($(select.parents("div")[0]));

            }
        });
    };

    var fillCboCuentas = function (empresa) {
        var select = $('#cboCtaBancaria');
        $.ajax({
            type: "post",
            url: 'vistas/NB/ajax/NBMMOCB.ashx?flag=6.5&empresa=' + empresa,
            beforesend: function () { select.hide(); Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.empty();
                select.append('<option></option>');
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '" moneda="' + data[i].MONEDA_CODE + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Cuentas Bancarias.');
            },
        });
    };

    var fillcboMoneda = function () {
        $('#cboMoneda').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    //var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                //$('#cboMoneda').val(datos[pos].CODIGO);
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente.");
            }
        });
        $('#cboMoneda').select2();
    }

    var crearTablaVacia = function () {

        var parms = {
            data: null,
            columns: [
                //{
                //    data: "CODIGO_VENTA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); },
                //    visible: false
                //},
                {
                    data: "ESTABLECIMIENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "CUENTA_BANCARIA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "FECHA_OPERACION", createdCell: function (td, cellData, rowData, row, col) {

                        $(td).html(rowData.FECHA_OPERACION);

                        $(td).attr("align", "center");
                    },
                    type: "fechaHora"

                },
                {
                    data: "CENTRO_COSTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "COMPROBANTE_PAGO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "ORDEN_SERVICIO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                },
                {
                    data: "GLOSA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                },
                {
                    data: "USUARIO_COBRO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); },
                    //visible: false
                },
                {
                    data: "NRO_OPERACION", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); },
                    //visible: false
                },
                {
                    data: "INGRESO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); }

                },
                {
                    data: "EGRESO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); },
                    //visible: false
                },
                {
                    data: "SALDO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); },
                    //visible: false
                },
                {
                    data: "TC", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); },
                    //visible: false
                },
                {
                    data: "RAZON_SOCIAL", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                }
                //{
                //    data: "ESTADO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                //}
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
            sDom: 'TC<"clear">lfrtip'
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
            var SCSL_CODE = $("#cboEstablecimiento").val();
            var CTA_BANCARIA = $("#cboCtaBancaria").val();
            var DESC_CTA_BANCARIA = $("#cboCtaBancaria option:selected").html();
            var MONE_CODE = $("#cboMoneda").val();
            var CHK_DETALLE = $("#chkDespachoVenta").is(":checked") ? "S" : "N";
            var CAJERO = ($('#cboCajero option:selected').attr("usuario") == undefined ? "" : $('#cboCajero option:selected').attr("usuario"));

            data.append('CHK_DETALLE', CHK_DETALLE);
            data.append('MONE_CODE', MONE_CODE);
            data.append('CTLG_CODE', CTLG_CODE);
            data.append('SCSL_CODE', SCSL_CODE);
            data.append('CTA_BANCARIA', CTA_BANCARIA);
            data.append('DESC_CTA_BANCARIA', DESC_CTA_BANCARIA);
            data.append('DESDE', $("#txtDesde").val());
            data.append('HASTA', $("#txtHasta").val());
            data.append('CAJERO', CAJERO);

            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBLRCBA.ashx?OPCION=1",
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
                        oTable.fnSort([[2, "asc"]]);
                    } else {
                        infoCustom2("No se encontraron datos!");
                        //$("#lblValorizadoTotal").html("")
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

        // CARGA DE CATALOGOS
        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 5 },
            function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {
                    $("#cboEmpresa").html(res);
                    var ctlg_code = ObtenerQueryString("ctlg_code");
                    if (ctlg_code !== undefined) {
                        $("#cboEmpresa").select2('val', ctlg_code).change();
                    }

                }
            });

        $("#cboEmpresa").change(function () {
            var valEmpresa = $(this).val();
            // CARGA DE ESTABLECIMIENTOS
            fillCboEstablecimiento(valEmpresa);
            $('#cboCtaBancaria, #cboMoneda').select2("val", "");
            $("#cboMoneda").attr("disabled", true);
            fillCboCuentas(valEmpresa);
            fillCboCajero(valEmpresa, $('#cboEstablecimiento').val(), "", false);
        });

        $("#cboCtaBancaria").change(function () {
            $('#cboMoneda').select2("val", $('#cboCtaBancaria option:selected').attr("moneda"));
            $("#cboMoneda").removeAttr("disabled");
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#cboCtaBancaria").val() != "") {
                obtenerDocumentos();
            } else {
                infoCustom2("Seleccione una cuenta Bancaria")
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
            plugins();
            EventoControles();
            fillcboMoneda();
            crearTablaVacia();
            fnTablaAsientosIni();
            fnCargaInicial();
        }
    };
}();

//tiene cambios de anticipo
var NuevaVenta = function () {
    window.location.href = '?f=NBLRCBA';
}

var ajaxVendedor = null;
function fillCboCajero(ctlg, scsl, estado, bAsync) {
    if (ajaxVendedor) {
        ajaxVendedor.abort();
    }
    if (bAsync == undefined) {
        bAsync = true;
    }
    ajaxVendedor = $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LCAJ" +
            "&CTLG=" + ctlg +
            "&SCSL=" + scsl +
            "&p_ESTADO_IND=" + estado,
        contenttype: "application/json;",
        datatype: "json",
        async: bAsync,
        success: function (datos) {
            $('#cboVendedor').empty();
            $('#cboVendedor').append('<option></option>');
            var pidmActual = "";
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboCajero').append('<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    if ($("#ctl00_lblusuario").html() == datos[i].USUARIO) {
                        pidmActual = datos[i].PIDM;
                    }
                }
            }
            $('#cboCajero').select2("val", pidmActual);
        },
        error: function (msg) {
            if (msg.statusText != "abort") {
                alertCustom("Vendedores no se listaron correctamente.");
            }
        }
    });
}

function imprimirListaDctosVenta() {
    Bloquear("ventana")
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var CTA_BANCARIA = $("#cboCtaBancaria").val();

    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('CTA_BANCARIA', CTA_BANCARIA);
    data.append('DESDE', $("#txtDesde").val());
    data.append('HASTA', $("#txtHasta").val());

    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NB/ajax/NBLRCBA.ashx?OPCION=2",
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


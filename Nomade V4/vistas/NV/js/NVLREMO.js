var codigoCaja = "";
var codigoCtlg = "";
var codigoScsl = "";
var codigoMovi = "";
var indCerrado = "";
var fechaApertura = "";
var fechaCierre = "";

var NVLREMO = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();

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

    var eventoControles = function () {
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
            // mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);
        $('.btnLibroPDF').attr('disabled', true);

        if (indCerrado == "S") {
            $("#btnCerrarCaja").css("display", "none");
        }

        $('#txtDesde, #txtHasta').on('change', function () {
            $("#div_generarDPF, #div_descargarPDF").attr("style", "display:none");
            $('.btnLibroPDF').attr('disabled', true);
        });

        $('#btnBuscar').on('click', function () {
            Bloquear($("#contenedor"), "Generando Reporte Monetario ...")
            CobroVentasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
            VentasContado($("#cboEmpresa").val(), $("#cboEstablecimiento").val());            
            ResumenDetallesMovimientosCaja($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
            PagoGastosPorBanco($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
            VentasArea($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
            $("#chkDetGastos").is(':checked') ? ($("#divDetGastos").attr("style", "margin-left: 0; display:inline") && DetGastos($("#cboEmpresa").val(), $("#cboEstablecimiento").val())) : $("#divDetGastos").attr("style", "display:none");
            VentasSubArea($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
            Inconsistencias($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
        });  

        $("#btnMail").on('click', function () {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("REPORTE MONEATARIO " + codigoMovi + "| DESDE: " + $("#txtDesde").val() + " - HASTA: " + $("#txtHasta").val() + "");
            cargarCorreos();
            $('#divMail').modal('show');
        });

        //WHATSAPP
        $('#btnWhatsapp').click(function (e) {
            $('#txtcontenidoWhatsapp').attr('disabled', false);
            $('#txtcontenidoWhatsapp').val("");
            cargarTelefonos();
            $('#divWhatsapp').modal('show');
        });

        $('#btnGenerarLibro').on('click', function () {
            if (vErrors(["cboEmpresa", "txtDesde", "txtHasta"])) {
                $('.btnLibroPDF').attr('disabled', false);
                fnGenerarPDF();
            }
        });

        $('#chkDetGastos').click(function () {
            var checked = $(this).is(':checked');

            if (!checked) {
                $("#divDetGastos").attr("style", "display:none");
            }
        });
    }

    var fnGenerarPDF = function () { //DPORTA

        var data = new FormData();
        data.append("OPCION", "GENERAR_PDF");
        data.append("p_CTLG_CODE", $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_DESDE', $("#txtDesde").val());
        data.append('p_HASTA', $("#txtHasta").val());
        data.append('p_DET_GASTO', $("#chkDetGastos").is(':checked') ? 'S' : 'N');
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVLREMO.ashx",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (data) {
                //Desbloquear("ventana");
                if (data == "OK") {
                    exito();
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
        //Desbloquear("ventana");
    };

    var oTable;
    var IniciaTabla = function () {
        var parms = {
            data: null,
            //"sDom": 'T<"clear">lfrtip',
            //"sPaginationType": "full_numbers",
            //"oTableTools": {
            //    "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
            //    "aButtons": [
            //        {
            //            "sExtends": "copy",
            //            "sButtonText": "Copiar"
            //        },
            //        {
            //            "sExtends": "pdf",
            //            "sPdfOrientation": "landscape",
            //            "sButtonText": "Exportar a PDF"
            //        },
            //        {
            //            "sExtends": "xls",
            //            "sButtonText": "Exportar a Excel"
            //        }
            //    ]
            //},
            //"oLanguage": {
            //    "sEmptyTable": "No hay datos disponibles en la tabla.",
            //    "sZeroRecords": "No hay datos disponibles en la tabla."
            //},
            //"order": [[0, "desc"]],
            //"scrollX": true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DES_CAJA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                //{
                //    data: "DESC_ESTABLECIMIENTO",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'center')
                //    }
                //},
                {
                    data: "SALDO_MONTO_SOLES_EFECTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.SALDO_MONTO_SOLES_EFECTIVO == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.SALDO_MONTO_SOLES_EFECTIVO);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "ING_MONTO_SOLES_EFECTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.ING_MONTO_SOLES_EFECTIVO == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.ING_MONTO_SOLES_EFECTIVO);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "ING_MONTO_SOLES_TARJETA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.ING_MONTO_SOLES_TARJETA == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.ING_MONTO_SOLES_TARJETA);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "EGR_MONTO_SOLES_EFECTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.EGR_MONTO_SOLES_EFECTIVO == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.EGR_MONTO_SOLES_EFECTIVO);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "DIF_CUENTA_MONTO_SOLES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.DIF_CUENTA_MONTO_SOLES == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.DIF_CUENTA_MONTO_SOLES);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "DIF_CAJA_MONTO_SOLES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.DIF_CAJA_MONTO_SOLES == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.DIF_CAJA_MONTO_SOLES);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "SALDO_MONTO_DOLARES_EFECTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.SALDO_MONTO_DOLARES_EFECTIVO == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.SALDO_MONTO_DOLARES_EFECTIVO);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "ING_MONTO_DOLARES_EFECTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.ING_MONTO_DOLARES_EFECTIVO == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.ING_MONTO_DOLARES_EFECTIVO);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "ING_MONTO_DOLARES_TARJETA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.ING_MONTO_DOLARES_TARJETA == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.ING_MONTO_DOLARES_TARJETA);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "EGR_MONTO_DOLARES_EFECTIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.EGR_MONTO_DOLARES_EFECTIVO == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.EGR_MONTO_DOLARES_EFECTIVO);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "DIF_CUENTA_MONTO_DOLARES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.DIF_CUENTA_MONTO_DOLARES == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.DIF_CUENTA_MONTO_DOLARES);
                            $(td).html(f);
                        }
                    }
                },
                {
                    data: "DIF_CAJA_MONTO_DOLARES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        if (rowData.DIF_CAJA_MONTO_DOLARES == "") {
                            $(td).html("0.00");
                        } else {
                            var f = formatoMiles(rowData.DIF_CAJA_MONTO_DOLARES);
                            $(td).html(f);
                        }
                    }
                }
            ]
        }

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        oTable.fnSetColumnVis(0, false, true);
    }
    
    var ResumenDetallesMovimientosCaja = function (empresa, establecimiento) {
        var data = new FormData();
        data.append('OPCION', '3');
        data.append('p_CTLG_CODE', empresa);
        data.append('p_SCSL_CODE', establecimiento);
        data.append('p_DESDE', $("#txtDesde").val());
        data.append('p_HASTA', $("#txtHasta").val());

        Bloquear('detalles');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLREMO.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            if (datos != null && datos.length > 0) {
                oTable.fnClearTable();
                if (datos != null && datos.length > 0) {
                    oTable.fnAddData(datos);
                    oTable.fnAdjustColumnSizing();
                }
            } else {
                oTable.fnClearTable();
            }
            Desbloquear("detalles");
        }).error(function () {
            Desbloquear("detalles");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            IniciaTabla();
        }
    };

}();

//tiene cambios de anticipo
var NuevaVenta = function () {
    window.location.href = '?f=NVLREMO';
}

function VentasContado(empresa, establecimiento) {
    var data = new FormData();
    data.append('OPCION', '1');
    data.append('p_CTLG_CODE', empresa);
    data.append('p_SCSL_CODE', establecimiento);
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());

    Bloquear('divTotales');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("divTotales");
        //Desbloquear('contenedor');
        if (datos != null) {
            $("#divTotales").html(datos);
            if ($("#datosMoba").val() != undefined) {
                $(".simboloMoba").html($("#datosMoba").val());
                $(".simboloMoal").html($("#datosMoal").val());
            }
            //$("#div_1Parte, #div_2Parte, #div_generarDPF, #div_descargarPDF").attr("style", "display:inline"); //DPORTA PDF
            $("#div_1Parte, #div_2Parte").attr("style", "display:inline");
            $(".btnImprimir, #btnMail, #btnWhatsapp").show();
        }
    }).error(function () {
        Desbloquear("divTotales");
        //Desbloquear('contenedor');
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

function CobroVentasCredito(empresa, establecimiento) {
    var data = new FormData();
    data.append('OPCION', '2');
    data.append('p_CTLG_CODE', empresa);
    data.append('p_SCSL_CODE', establecimiento);
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());

    //Bloquear('divTotalesCobroVentasCredito');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        //Desbloquear("divTotalesCobroVentasCredito");
        Desbloquear('contenedor');
        if (datos != null) {
            $("#divTotalesCobroVentasCredito").html(datos);
            if ($("#datosMoba").val() != undefined) {
                $(".simboloMoba").html($("#datosMoba").val());
                $(".simboloMoal").html($("#datosMoal").val());
            }
        }
    }).error(function () {
        //Desbloquear("divTotalesCobroVentasCredito");
        Desbloquear('contenedor');
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

function PagoGastosPorBanco(empresa, establecimiento) {
    var data = new FormData();
    data.append('OPCION', '4');
    data.append('p_CTLG_CODE', empresa);
    data.append('p_SCSL_CODE', establecimiento);
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());

    Bloquear('divPagoGastosPorBanco');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("divPagoGastosPorBanco");
        if (datos != null) {
            $("#divPagoGastosPorBanco").html(datos);
            if ($("#datosMoba").val() != undefined) {
                $(".simboloMoba").html($("#datosMoba").val());
                $(".simboloMoal").html($("#datosMoal").val());
            }
        }
    }).error(function () {
        Desbloquear("divPagoGastosPorBanco");
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

function DetGastos(empresa, establecimiento) {
    var data = new FormData();
    data.append('OPCION', '4.5');
    data.append('p_CTLG_CODE', empresa);
    data.append('p_SCSL_CODE', establecimiento);
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());

    Bloquear('divDetGastos');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("divDetGastos");
        if (datos != null) {
            $("#divDetGastos").html(datos);
            if ($("#datosMoba").val() != undefined) {
                $(".simboloMoba").html($("#datosMoba").val());
                $(".simboloMoal").html($("#datosMoal").val());
            }
        }
    }).error(function () {
        Desbloquear("divDetGastos");
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

function VentasArea(empresa, establecimiento) {
    var data = new FormData();
    data.append('OPCION', '5');
    data.append('p_CTLG_CODE', empresa);
    data.append('p_SCSL_CODE', establecimiento);
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());

    Bloquear('divVentasArea');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("divVentasArea");
        if (datos != null) {
            $("#divVentasArea").html(datos);
            if ($("#datosMoba").val() != undefined) {
                $(".simboloMoba").html($("#datosMoba").val());
                $(".simboloMoal").html($("#datosMoal").val());
            }
        }
    }).error(function () {
        Desbloquear("divVentasArea");
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

function VentasSubArea(empresa, establecimiento) {
    var data = new FormData();
    data.append('OPCION', '6');
    data.append('p_CTLG_CODE', empresa);
    data.append('p_SCSL_CODE', establecimiento);
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());

    Bloquear('divVentasSubArea');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("divVentasSubArea");
        if (datos != null) {
            $("#divVentasSubArea").html(datos);
            if ($("#datosMoba").val() != undefined) {
                $(".simboloMoba").html($("#datosMoba").val());
                $(".simboloMoal").html($("#datosMoal").val());
            }
        }
    }).error(function () {
        Desbloquear("divVentasSubArea");
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

function Inconsistencias(empresa, establecimiento) {
    var data = new FormData();
    data.append('OPCION', '7');
    data.append('p_CTLG_CODE', empresa);
    data.append('p_SCSL_CODE', establecimiento);
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());

    Bloquear('divInconsistencias');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("divInconsistencias");
        if (datos != null) {
            $("#divInconsistencias").html(datos);
            if ($("#datosMoba").val() != undefined) {
                $(".simboloMoba").html($("#datosMoba").val());
                $(".simboloMoal").html($("#datosMoal").val());
            }
        }
    }).error(function () {
        Desbloquear("divInconsistencias");
        alertCustom("Error al listar. Por favor intente nuevamente.");
    });
}

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
            url: "vistas/NV/ajax/NVLREMO.ashx?OPCION=correo" +
                "&p_CTLG_CODE=" + $("#cboEmpresa").val() + 
                "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
                "&p_CAJA_CODE=" + codigoCaja +
                "&p_CODE_MOVI=" + codigoMovi +
                "&REMITENTE=" + $('#txtRemitente').val() +
                "&DESTINATARIOS=" + destinos +
                "&ASUNTO=" + $('#txtAsunto').val() +
                "&MENSAJE=" + $('#txtcontenido').val() +
                "&p_DET_GASTO=" + ($("#chkDetGastos").is(':checked') ? 'S' : 'N') +
                "&p_DESDE=" + $('#txtDesde').val() +
                "&p_HASTA=" + $('#txtHasta').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("No se encontró el archivo adjunto. Correo no se envió correctamente.");
                } else {
                    exito();
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

//WHATSAPP

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

function enviarWhatsapp() {

    var telefonos = $("#cboClienteWhatsapp").val();

    if (vErrors(['cboClienteWhatsapp'])) {
        $('#btnEnviarWhatsapp').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        RECIPIENT_PHONE_NUMBER = telefonos.toString();
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVLREMO.ashx?OPCION=whatsapp" +
                "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
                "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
                "&p_CAJA_CODE=" + codigoCaja +
                "&p_CODE_MOVI=" + codigoMovi +
                "&RECIPIENT_PHONE_NUMBER=" + RECIPIENT_PHONE_NUMBER +
                "&MENSAJEWHATSAPP=" + $('#txtContenidoWhatsapp').val() + 
                "&p_DET_GASTO=" + ($("#chkDetGastos").is(':checked') ? 'S' : 'N') +
                "&p_DESDE=" + $('#txtDesde').val() +
                "&p_HASTA=" + $('#txtHasta').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos = "undefined") {
                    datos = ""
                }
                if (datos.indexOf("error") >= 0) {
                    alertCustom("El mensaje no se envio correctamente");
                } else {
                    exito();
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

function imprimirReporte() {
    Bloquear("ventana")
    var data = new FormData();
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());
    data.append('p_DET_GASTO', $("#chkDetGastos").is(':checked') ? 'S' : 'N');
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLREMO.ashx?OPCION=IMPR",
        async: false,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {
                $("#divDctoImprimir").html(datos);
                var nomSucursal, nomEmpresa;
                var f = new Date();
                nomSucursal = $("#cboEstablecimiento :selected").html();
                nomEmpresa = $("#cboEmpresa :selected").html();
                $("#divDctoImprimir").prepend("<hr></hr>")
                //$("#divDctoImprimir").prepend("<h5 class='arial'>REPORTE MONETARIO - " + nomSucursal + ' - ' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "</h5>")
                $("#divDctoImprimir").prepend("<h5 class='arial'>FECHA DE REPORTE: " + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + "</h5>")
                $("#divDctoImprimir").prepend("<h4 class='arial'>REPORTE MONETARIO - " + nomSucursal + " | DESDE: " + $("#txtDesde").val() + " - HASTA: " + $("#txtHasta").val() + "</h5>")
                $("#divDctoImprimir").prepend("<h3 class='arial'>" + nomEmpresa + "</h4>")
                setTimeout(function () {
                    window.print();
                }, 0.0000000000000001)

            } else {
                noexito();
            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alertCustom("No se pudo imprimir correctamente el reporte.");
        }
    });
}
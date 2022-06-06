var CCLCODE = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboAlmacen').select2();
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
                    if (ObtenerQueryString("ctlg") == undefined) {
                        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    } else {
                        $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                    }

                    fillCboEstablecimiento();
                    //fillCboAlmacenes();
                    //if (ObtenerQueryString("scsl") == undefined) {
                    //    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                    //    $("#cboAlmacen").select2("val", $("#ctl00_hddestablecimiento").val());
                    //} else {
                    //    $("#cboEstablecimiento").select2("val", ObtenerQueryString("scsl"));
                    //    $("#txtDesde").val(ObtenerQueryString("desde"));
                    //    $("#txtHasta").val(ObtenerQueryString("hasta"));
                    //}

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
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboEstablecimiento').append('<option value="TODOS">TODOS</option>');
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
    var obtenerReporteCuentasPorCobrar = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_HASTA', $("#txtHasta").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/cc/ajax/cclcode.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#divCuentasPorCobrar').html(datos);
                    //"TotalCuentasPorPagar
                    $("#txtTotalMonedaBase").html($("#hfTotalBase").val());
                    $("#txtTotalMonedaAlterna").html($("#hfTotalAlterna").val());
                    //Datos moneda
                    $("#lblMonedaBase").html($("#hfDescMonedaBase").val());
                    $("#lblSimboloMonedaBase").html($("#hfSimbMonedaBase").val());
                    $("#lblMonedaAlterna").html($("#hfDescMonedaAlterna").val());
                    $("#lblSimboloMonedaAlterna").html($("#hfSimbMonedaAlterna").val());
                    //Datos tipo de cambio
                    //$("#fechaTipoCambio").html($("#hfFechaTipoCambio").val());
                    $("#valorTipoCambio").html($("#hfValorTipoCambio").val());
                    //if ($("#hfFechaTipoCambio").val() != "-")
                    //    $("#bloqueTipoCambio").attr("style", "display:block;");
                    //else
                    //    $("#bloqueTipoCambio").attr("style", "display:none;");

                    oTableTReg = $("#tblCuentasPorCobrar").dataTable({
                        "sDom": 'TC<"clear">lfrtip',
                        //"sPaginationType": "full_numbers",
                        "scrollX": true,
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
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                    })
                    oTableTReg.fnSort([[10, "desc"]]);
                    actualizarEstilos();
                    
                    //$('#tblCuentasPorCobrar').DataTable().columns(0).visible(false);
                    //$('#tblCuentasPorCobrar').DataTable().columns(1).visible(false);

                    //$('#tblCuentasPorCobrar tbody').on('dblclick', 'tr', function () {
                    //    var pos = oTableTReg.fnGetPosition(this);
                    //    var row = oTableTReg.fnGetData(pos);
                    //    var tabla = row[0];
                    //    var pidm = row[1];
                    //    if (pidm != "") {
                    //        window.open("?f=cclrccl&p=" + pidm, '_blank');
                    //    }

                    //});


                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    }

    function cargainicial() {

        var controlProCli = false;

        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboAlmacenes();
            Desbloquear("ventana");
        });

        $('#cboAlmacen').on('change', function () {
            Bloquear("ventana");
            Desbloquear("ventana");
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtHasta").val().trim() == "") {
                obtenerReporteCuentasPorCobrar();
            } else if ($("#txtHasta").val().trim() != "") {
                obtenerReporteCuentasPorCobrar();
            } else {
                alertCustom("Ingrese fecha para filtrar por Fecha.")
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
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargainicial();
        }
    };
}();

function solonumbef(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = 'BEF1234567890';//Caracteres validos

    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
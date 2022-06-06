
var CALVICA = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboCaja').select2();

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
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    $('#cboEstablecimiento').select2('val', '');

                }
                $('#cboEstablecimiento').change();

            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillCboCaja = function () {
        var select = $('#cboCaja');
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CALVICA.ashx?OPCION=2&p_CTLG_CODE=" + $('#cboEmpresa').val() + "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboCaja').empty();
                $('#cboCaja').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO.toString() == 'ACTIVO') {
                            var estadocaja = datos[i].ESTADO_CAJA !== 'A' ? 'disabled="disabled" ' : "";
                            select.append('<option value="' + datos[i].CAJA_CODE + '" ' + estadocaja + 'monto="' + datos[i].MONTO_CAJA + '">' + datos[i].DESCRIPCION_CAJA + '</option>');
                        }

                    }
                }
                $('#cboCaja').select2('val', '');
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var eventoComtroles = function () {
        $('#cboEmpresa').on('change', function () {
            $('#cboCaja').empty(); $('#cboCaja').append('<option></option>'); $('#cboCaja').select2('val', '');
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#cboEstablecimiento').on('change', function () {
            fillCboCaja();
        });

        $('#cboCaja').on('change', function () {
            listarAperturasCaja();        
            
        });

        $("#btnAbrirCaja").on("click", function () {
            if (typeof $("#hfCodUltimoMovimiento").val() != "undefined" && $("#hfCajaAbiertaInd").val()=="N")
                window.location.href = "?f=camabri&codcaja=" + $("#cboCaja").val() + "&codempr=" + $("#cboEmpresa").val() + "&codscsl=" + $("#cboEstablecimiento").val() + "&codultmov=" + $("#hfCodUltimoMovimiento").val() + "&ind=A"
            else
                alertCustom("Su solicitud no puede ser procesada.<br/>Ya existe una caja abierta!")
        });
      
        $('#buscar').on('click', function () {
            if ($("#cboCaja").val() != "") {
                if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                    listarAperturasCajaFechas();
                } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                    listarAperturasCajaFechas();
                } else {
                    alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
                }
            } else {
                alertCustom("Seleccione una caja antes de Filtrar!")
            }
        });                
      
    }

    var listarAperturasCajaFechas = function () {
        var data = new FormData();
        data.append('OPCION', '4');
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());
        data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
        data.append('p_CAJA_CODE', $('#cboCaja').val());
        data.append('p_DESDE', $('#txtDesde').val());
        data.append('p_HASTA', $('#txtHasta').val());

        Bloquear('ventana');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/calvica.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $("#divAperturasCaja").html(datos)
                var oTable = $('#tblAperturasCaja').DataTable({
                    "order": [[0, "desc"]],
                    "scrollX": true,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });
                oTable.column(0).visible(false);
                
                

            }
        }).error(function () {
            Desbloquear("ventana");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });

    }

    var listarAperturasCaja = function () {
        var data = new FormData();
        data.append('OPCION', '3');
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());
        data.append('p_SCSL_CODE', $('#cboEstablecimiento').val());
        data.append('p_CAJA_CODE', $('#cboCaja').val());

        Bloquear('ventana');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/calvica.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $("#divAperturasCaja").html(datos)                    
               
                var oTable = $('#tblAperturasCaja').DataTable({
                    "order": [[0, "desc"]],
                    "scrollX": true,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });

                
                oTable.column(0).visible(false);

                if ($("#hfCajaAbiertaInd").val() == "S") {
                    $("#btnAbrirCaja").attr("disabled", "disabled");
                }
                else {
                    $("#btnAbrirCaja").removeAttr("disabled");
                }
                $("#btnDetallesCaja").removeAttr("disabled");
                
            }
        }).error(function () {
            Desbloquear("ventana");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });

    }

    var cargaInicial = function (codigoCtlg, codigoScsl, codigoCaja) {
        $("#cboEmpresa").select2("val", codigoCtlg);
        fillCboEstablecimiento(codigoCtlg);
        $("#cboEstablecimiento").select2("val", codigoScsl);
        fillCboCaja();
        $("#cboCaja").select2("val", codigoCaja)
        listarAperturasCaja();        
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            
            var codigoCaja = ObtenerQueryString("codcaja");
            var codigoCtlg = ObtenerQueryString("codempr");
            var codigoScsl = ObtenerQueryString("codscsl");          
            if (typeof (codigoCaja) !== "undefined" && typeof (codigoCtlg) !== "undefined" && typeof (codigoScsl) !== "undefined") {
                cargaInicial(codigoCtlg, codigoScsl, codigoCaja)
            }
            else {
                fillCboEstablecimiento($("#ctl00_hddctlg").val());
                fillCboCaja();
            }            
            eventoComtroles();
            

        }
    };

}();

function CerrarCaja(codigoCaja, codigoMovimiento) {
    window.open("?f=camcerr&codcaja=" + codigoCaja + "&codempr=" + $("#cboEmpresa").val() + "&codscsl=" + $("#cboEstablecimiento").val() + "&codultmov=" + codigoMovimiento + "&ind=C", '_blank');
    //window.location.href = "?f=camcerr&codcaja=" + codigoCaja + "&codempr=" + $("#cboEmpresa").val() + "&codscsl=" + $("#cboEstablecimiento").val() + "&codultmov=" + codigoMovimiento+"&ind=C"
}

//Tambien está por href en <a>
function VerDetallesCaja(codigoCaja, codigoMovimiento, indCerrado) {
    window.open("?f=CALDEMO&codempr=" + $("#cboEmpresa").val() + "&codscsl=" + $("#cboEstablecimiento").val() + "&codcaja=" + codigoCaja + "&codmov=" + codigoMovimiento + "&ind=" + indCerrado, '_blank');
    //window.location.href = "?f=caldemo&codcaja=" + codigoCaja + "&codempr=" + $("#cboEmpresa").val() + "&codscsl=" + $("#cboEstablecimiento").val() + "&codmov=" + codigoMovimiento 
}
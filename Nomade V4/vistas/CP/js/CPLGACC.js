var CPLGACC = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboEstablecimiento, #cboNivel, #cboCCostos').select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
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
                    fillCboNiveles();

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
                    $('#cboEstablecimiento').select2('val', '');
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

    var fillCboNiveles = function () {

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ashx?sOpcion=NIVELES&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboNivel').empty();
                $('#cboNivel').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboNivel').append('<option value="' + datos[i].CODIGO + '" data-nivel="' + datos[i].NIVEL + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].NIVEL == "1") {
                            $('#cboNivel').select2('val', datos[i].CODIGO);
                            fillCboCCostos(datos[i].CODIGO, datos[i].NIVEL);
                        }
                    }                   
                } else {
                    $('#cboNivel').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboCCostos = function (codCCostos, nivel) {

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ashx?sOpcion=CCXNIVELES&CTLG_CODE=" + $('#cboEmpresa').val() + "&NIVEL=" + nivel + "&CCOSTOS_CODE=" + codCCostos.substring(0, 4),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboCCostos').empty();
                $('#cboCCostos').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboCCostos').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                            $('#cboCCostos').select2('val', datos[0].CODIGO);
                            $("#cboCCostos").change();
                    }
                } else {
                    $('#cboCCostos').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var eventoComtroles = function () {   
        $('#cboEmpresa').on('change', function () {          
            fillCboEstablecimiento();
            fillCboNiveles();
            $('#divRegistroGastos').html("");
            $('#btnDescargarLibroPDF').attr('disabled', true);
            $('.btnLibroXls').attr('disabled', true);
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#optanho').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddScsl").val($('#cboEstablecimiento').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescEmpresa").val($('#cboEmpresa :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesCCostos").val($('#cboCCostos :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddNivel").val($('#cboNivel').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCCostos").val($('#cboCCostos').val());
        });

        $('#cboNivel').on('change', function () {
            fillCboCCostos($('#cboNivel').val(), $("#cboNivel :selected").attr("data-nivel"));
            $('#divRegistroGastos').html("");
            $('#btnDescargarLibroPDF').attr('disabled', true);
            $('.btnLibroXls').attr('disabled', true);
        });
        $('#cboEstablecimiento, #cboCCostos').on('change', function () {
            $('#divRegistroGastos').html("");
            $('#btnDescargarLibroPDF').attr('disabled', true);
            $('.btnLibroXls').attr('disabled', true);
        });

        $('#optanho').on('change', function () {
            $('#divRegistroGastos').html("");
            $('#btnDescargarLibroPDF').attr('disabled', true);
            $('.btnLibroXls').attr('disabled', true);
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#optanho').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddScsl").val($('#cboEstablecimiento').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescEmpresa").val($('#cboEmpresa :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesCCostos").val($('#cboCCostos :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddNivel").val($('#cboNivel').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCCostos").val($('#cboCCostos').val());
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "cboEstablecimiento", "optanho"])) {
                listarRegistroGastosXCentroCostos();
            }
        });     

        $('#btnDescargarLibroPDF').on('click', function () {
            if (vErrors(["cboEmpresa", "cboEstablecimiento", "optanho"])) {
                fnGenerarPDF();
            }
        });
    }

    var cargaInicial = function () {
        $('#btnDescargarLibroPDF').attr('disabled', true);
        $('.btnLibroXls').attr('disabled', true);
    }

    return {
        init: function () {    
            plugins();
            eventoComtroles();
            fillCboEmpresa();   
            cargaInicial();
        }
    };

}();

var NuevaCarga = function () {
    window.location.href = '?f=CPLGACC';
}

function listarRegistroGastosXCentroCostos() {
    
    var data = new FormData();
    data.append('OPCION', "1");
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('p_SCSL_CODE', ($("#cboEstablecimiento").val() == "TODOS") ? '' : $("#cboEstablecimiento").val());  
    data.append('p_ANIO', $('#optanho').val());        
    data.append('p_NIVEL', $("#cboNivel :selected").attr("data-nivel"));  
    data.append('p_CCOSTOS', $('#cboCCostos').val());  
    data.append('p_DESC_EMPRESA', $('#cboEmpresa option:selected').html());
    data.append('p_DESC_CCOSTOS', $('#cboCCostos option:selected').html());

    //Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CP/ajax/CPLGACC.ASHX",
        contentType: false,
        data: data,
        async: true,
        processData: false,
        beforeSend: function () { Bloquear($("#ventana"), "Generando reporte de gastos por centro de costos ...") },
        cache: false
    })
        .success(function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                $('#divRegistroGastos').html(datos);
                $('#btnDescargarLibroPDF').attr('disabled', false);
                $('.btnLibroXls').attr('disabled', false);

                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#optanho').val());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddScsl").val($('#cboEstablecimiento').val());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescEmpresa").val($('#cboEmpresa :selected').html());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesCCostos").val($('#cboCCostos :selected').html());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddNivel").val($("#cboNivel :selected").attr("data-nivel"));
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCCostos").val($('#cboCCostos').val());
            } else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("ventana");
            noexito();
        });
}

function fnGenerarPDF() {

    var data = new FormData;
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('p_SCSL_CODE', ($("#cboEstablecimiento").val() == "TODOS") ? '' : $("#cboEstablecimiento").val());
    data.append('p_ANIO', $('#optanho').val());
    data.append('p_NIVEL', $("#cboNivel :selected").attr("data-nivel"));
    data.append('p_CCOSTOS', $('#cboCCostos').val());
    data.append('p_DESC_EMPRESA', $('#cboEmpresa option:selected').html());
    data.append('p_DESC_CCOSTOS', $('#cboCCostos option:selected').html());

    $.ajax({
        type: "POST",
        url: "vistas/CP/ajax/CPLGACC.ashx?OPCION=2",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        beforeSend: function () { Bloquear($("#ventana"), "Generando archivo ...") },
        success: function (datos) {
            if (datos == 'ok') {
                exito();
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#optanho').val());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescEmpresa").val($('#cboEmpresa :selected').html());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesCCostos").val($('#cboCCostos :selected').html());
                $("[id*=btnLibroPDF]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
            }
            else {
                noexito();
            }
        },
        complete: function () {
            Desbloquear("ventana");
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
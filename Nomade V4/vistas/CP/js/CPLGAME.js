var CPLGAME = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboEstablecimiento, #cboClasificacion').select2();
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
                    //$("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());

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

    var eventoComtroles = function () {   
        $('#cboEmpresa').on('change', function () {          
            fillCboEstablecimiento();
            $('#divRegistroGastos').html("");
            $('#btnDescargarLibroPDF').attr('disabled', true);
            $('.btnLibroXls').attr('disabled', true);
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($('#optanho').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddScsl").val($('#cboEstablecimiento').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddClasificacion").val($('#cboClasificacion').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescEmpresa").val($('#cboEmpresa :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesClasificacion").val($('#cboClasificacion :selected').html());
        });

        $('#cboEstablecimiento, #cboClasificacion').on('change', function () {  
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
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddClasificacion").val($('#cboClasificacion').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescEmpresa").val($('#cboEmpresa :selected').html());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesClasificacion").val($('#cboClasificacion :selected').html());
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "cboEstablecimiento", "optanho"])) {
                listarRegistroResumenGastos();
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
    window.location.href = '?f=CPLGAME';
}

function listarRegistroResumenGastos() {
    
    var data = new FormData();
    data.append('OPCION', "1");
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('p_SCSL_CODE', ($("#cboEstablecimiento").val() == "TODOS") ? '' : $("#cboEstablecimiento").val());  
    data.append('p_CLASIFICACION', $("#cboClasificacion").val());
    data.append('p_ANIO', $('#optanho').val());    
    data.append('p_DESC_EMPRESA', $('#cboEmpresa option:selected').html());
    data.append('p_DESC_CLASIFICACION', $('#cboClasificacion option:selected').html());

    //Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CP/ajax/CPLGAME.ASHX",
        contentType: false,
        data: data,
        async: true,
        processData: false,
        beforeSend: function () { Bloquear($("#ventana"), "Generando resumen de gastos ...") },
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
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddClasificacion").val($('#cboClasificacion').val());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDescEmpresa").val($('#cboEmpresa :selected').html());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesClasificacion").val($('#cboClasificacion :selected').html());
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
    data.append('p_CLASIFICACION', $("#cboClasificacion").val());
    data.append('p_ANIO', $('#optanho').val());
    data.append('p_DESC_EMPRESA', $('#cboEmpresa option:selected').html());
    data.append('p_DESC_CLASIFICACION', $('#cboClasificacion option:selected').html());

    $.ajax({
        type: "POST",
        url: "vistas/CP/ajax/CPLGAME.ashx?OPCION=2",
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
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesClasificacion").val($('#cboClasificacion :selected').html());
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
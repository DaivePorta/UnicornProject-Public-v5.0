var NFLVACO = function () {
    var plugins = function () {
        $('#cboEmpresa, #cboEstablecimiento, #cboCliente').select2()
        $("#cboMes").select2();
        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });
        //fnSetRangoDatePickerMesHoy('txtDesde', 'txtHasta', true);
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
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            complete: function () {
                if (ObtenerQueryString("ctlg") == undefined) {
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                }
                fillCboEstablecimiento();
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
                if (datos != null) {
                    $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');//se comenta esta línea y se oculta la opción de todos
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
            complete: function () {
                if (ObtenerQueryString("scsl") == undefined) {
                    //$("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                } else {
                    $("#cboEstablecimiento").select2("val", ObtenerQueryString("scsl"));
                    $("#txtDesde").val(ObtenerQueryString("desde"));
                    $("#txtHasta").val(ObtenerQueryString("hasta"));
                }
                fillCliente();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillCliente = function () {
        var selectEst = $('#cboCliente');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option value="TODOS">TODOS</option>');
        $('#cboCliente').select2('val', 'TODOS');
        Bloquear("divCboCliente");
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2.5&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboCliente");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].PIDM + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                }
                $('#cboCliente').select2('val', 'TODOS');
                if (ObtenerQueryString("pidmC") != undefined) {
                    var pidm = pad(ObtenerQueryString("pidmC"), 9);
                    $('#cboCliente').select2("val", pidm);
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    function listarComprobantes() {

        var data = new FormData();
        data.append('OPCION', "1");
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val() == 'TODOS' ? '' : $('#cboEstablecimiento').val());
        data.append('p_DESDE', $('#txtDesde').val());
        data.append('p_HASTA', $('#txtHasta').val());
        data.append('p_PIDM', $('#cboCliente').val() == 'TODOS' ? '' : $('#cboCliente').val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFLVACO.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#divRegistroVentas').html(datos);
                    $("#filtros_2 #correcto").parent().remove();
                    $("#btnDescargarPDF").removeClass('hidden');
                    //$("#btnDescargarTXT").removeClass('hidden');
                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    }

    function listarArchivosTXTDescarga() {

        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val() == 'TODOS' ? '' : $('#cboEstablecimiento').val());
        data.append('p_DESDE', $('#txtDesde').val());
        data.append('p_HASTA', $('#txtHasta').val());
        data.append('p_PIDM', $('#cboCliente').val() == 'TODOS' ? '' : $('#cboCliente').val());

        $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFLVACO.ashx?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != 0) {
                    $('#divDocumento').html(datos);

                    $("#tblDocumento").dataTable({
                        "scrollY": true,
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                    });
                }
                else {
                    noexito();
                    return;
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoComtroles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
            fillCliente();
        });

        $('#cboEmpresa').on('change', function () {

            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddScsl").val($('#cboEstablecimiento').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesde").val($('#txtDesde').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddHasta").val($('#txtHasta').val());
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddPIDM").val($('#cboCliente').val() == 'TODOS' ? '' : $('#cboCliente').val());           

            $("#btnDescargarPDF").addClass('hidden');
        });

        $('#btnDescargarPDF').on('click', function () {
            fnGenerarPDF();
        });

        //$('#btnDescargarTXT').on('click', function () {
        //    fnGenerarTXT();
        //});

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtDesde", "txtHasta"])) {
                listarComprobantes();
                listarArchivosTXTDescarga();
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
    }    

    function fnGenerarPDF() {

        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val() == 'TODOS' ? '' : $('#cboEstablecimiento').val());
        data.append('p_DESDE', $('#txtDesde').val());
        data.append('p_HASTA', $('#txtHasta').val());
        data.append('p_PIDM', $('#cboCliente').val() == 'TODOS' ? '' : $('#cboCliente').val());
        data.append('p_NOMBRE_CTLG_CODE', $("#cboEmpresa :selected").html());

        $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFLVACO.ashx?OPCION=2",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos == 'ok') {
                    $("[id*=btnLibroPDF]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
                }
                else {
                    noexito();
                    return;
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    //function fnGenerarTXT() {

    //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCtlg").val($('#cboEmpresa').val());
    //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddScsl").val($('#cboEstablecimiento').val());
    //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddDesde").val($('#txtDesde').val());
    //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddHasta").val($('#txtHasta').val());
    //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddPIDM").val($('#cboCliente').val() == 'TODOS' ? '' : $('#cboCliente').val());
    //    $("[id*=btnLibroTXT2]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
    //}

    var cargaInicial = function () {
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

function DescargaArchivoTXT(nombre) {
    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddNombreArchivo").val(nombre);
    $("[id*=btnLibroTXT]").click();//DPORTA 21/05/2022 - Ejecuta el evento del botón que está en asp.net
}
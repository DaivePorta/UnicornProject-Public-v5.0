var NOLAUCO = function () {

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
        $('#cboEstado').select2();
    };

    var eventoControles = function () {    
        $('#buscar').on('click', function () {
            listar();
        });

        $('#cboEmpresas').on('change', function () {
            fillCboEstablecimiento();
        });
    };

    var fillCboEmpresa = function () {
        var select = $('#cboEmpresas').select2('destroy');
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNVMDOCV");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $(select).empty();
                    $(select).append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNVMDOCV", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $(select).append('<option value="' + datos[i].CODIGO + '" agente-reten-ind="' + datos[i].AGENTE_RETEN_IND + '" data-pidm="' + datos[i].PIDM + '" direccion="' + datos[i].DIRECCION + '" ruc="' + datos[i].RUC + '" ruta="' + datos[i].RUTA_IMAGEN + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $(select).val($('#ctl00_hddctlg').val());

                    fillCboEstablecimiento();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente.");
                }
            });
        }
        else {
            $(select).empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $(select).append('<option value="' + dPermanente[i].CODIGO + '" agente-reten-ind="' + dPermanente[i].AGENTE_RETEN_IND + '" data-pidm="' + dPermanente[i].PIDM + '" direccion="' + dPermanente[i].DIRECCION + '" ruc="' + dPermanente[i].RUC + '" ruta="' + dPermanente[i].RUTA_IMAGEN + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
            $(select).val($('#ctl00_hddctlg').val());
            fillCboEstablecimiento();
        }
        $(select).select2();
    }

    var fillCboEstablecimiento = function () {
        var USUA_ID = $("#ctl00_txtus").val();
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LSU&CTLG_CODE=" + $('#cboEmpresas').val() + "&USUA_ID=" + USUA_ID,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" data-ubigeo="' + datos[i].UBIGEO + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                $("#cboEstablecimiento").change();
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });

        $('#cboEstablecimiento').select2('destroy').select2();
    };

    function listar() {

        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=21&CTLG_CODE=" + $('#cboEmpresas').val() + "&p_ESTABLECIMIENTO=" + $('#cboEstablecimiento').val() + "&P_CABEUSUARIO=" + $('#ctl00_txtus').val() + "&P_ESTADOCABECE=" + $('#cboEstado').val(),
            async: false,
            success: function (datos) {
                console.log(datos);
                Desbloquear("div");
                if (datos != null) {

                    $('#tblProductos').html(datos)

                    $("#tblbmodal").DataTable({
                        "order": [[0, 'desc']],
                        "scrollX": "true",
                        "sDom": 'T<"clear">lfrtip',
                        "sPaginationType": "full_numbers",
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
                        }
                    })

                    $('#tblbmodal tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            $(this).addClass('selected');
                            var pos = $('#tblbmodal').DataTable().row(this).index();
                            var row = $('#tblbmodal').dataTable().fnGetData(pos);
                            var codigo = row[0];
                            window.location.href = '?f=NOMAUCO&codigo=' + codigo;
                        }
                    });


                } else {
                    infoCustom2("No se encontraron registros.");
                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            listar();
        }
    };

}();



var AFLACFI = function () {

    jsonx = null;
    iniScsl = true;

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal').select2();
    };

    var cargajson = function () {

        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=S&P_CODE=&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&ESTADO=',
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                jsonx = data;
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });

    };

    var listarActivosFijos = function () {
        try {
            $('#tblLISTA').DataTable().destroy();
        }
        catch (e) { }

        cargajson();
        //var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfLISTA').val());       

        var json = jsonx; // jQuery.parseJSON(jsonx);
        var parms = {
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
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
            data: json,
            responsive: true,
            columns: [
                {
                    data: "CODIGO_AF",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CTLG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }, {
                    data: "SCSL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "BIEN"
                },
                {
                    data: "SERIE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "FECHA_INICIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "VALOR_INICIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "VALOR_ACTUAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '8%');
                    }
                },
                {
                    data: "CODIGO",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CTLG_CODE",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "SCSL_CODE",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                if (data.length == 0) {
                    $("#txtTotalValorActual").html("0.00");
                } else {
                    var total = api.column(7).data()
                        .reduce(function (a, b) {
                            var suma = parseFloat(a) + parseFloat(b)
                            return suma;
                        });
                    var total2 = api.column(6).data()
                       .reduce(function (a, b) {
                           var suma = parseFloat(a) + parseFloat(b)
                           return suma;
                       });
                    if (parseFloat(total.toString())) {
                        $("#txtTotalValorActual").html(parseFloat(total).toFixed(2));
                    }
                    if (parseFloat(total2.toString())) {
                        $("#txtTotalValorInicial").html(parseFloat(total2).toFixed(2));
                    }
                }
            }
        };


        $('#tblLISTA').DataTable(parms);
        $('#tblLISTA').removeAttr('style');

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO A.F.</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">EMPRESA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">ESTABLECIMIENTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">BIEN</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="4" href="#">SERIE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="5" href="#">FECHA INICIAL</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="6" href="#">VALOR INICIAL</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="7" href="#">VALOR ACTUAL</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="8" href="#">ESTADO</a>\
                    </div>');


        $('#tblLISTA tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var pos = $('#tblLISTA').DataTable().row(this).index();
                var row = $('#tblLISTA').DataTable().row(pos).data();
                var codigo = row.CODIGO;
                var CTLG_CODE = row.CTLG_CODE;
                var SCSL_CODE = row.SCSL_CODE;
                var ESTADO = row.ESTADO.substring(0, 1);
                if (codigo.replace('%20', ' ') == 'SIN REGISTROS') {
                    return;
                }
                else {
                    window.location.href = '?f=AFMACFI&codigo=' + codigo + "&CTLG_CODE=" + CTLG_CODE + "&SCSL_CODE=" + SCSL_CODE + "&ESTADO=" + ESTADO;
                }
            }
        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tblLISTA').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });

        $('#tblLISTA tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = $('#tblLISTA').DataTable().row($(this).parent().parent()).index();
            var row = $('#tblLISTA').DataTable().row(pos).data();
            var code = row.CODIGO;

            if (code.replace('%20', ' ') == 'SIN REGISTROS') {
                return;
            }
            else {
                Bloquear("ventana");
                $.ajaxSetup({ async: false });
                $.post("vistas/AF/ajax/AFMACFI.ashx", { OPCION: 'AE', P_CODE: code, USUA_ID: $('#ctl00_txtus').val() },
                    function (res) {
                        if (res != null) {
                            if (res == "I") res = "INACTIVO";
                            else res = "ACTIVO";
                            $('#tblLISTA').DataTable().cell(pos, 7).data(res).draw();
                            exito();
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    });
                $.ajaxSetup({ async: true });
            }
        });


    };

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    if (ObtenerQueryString('codigo') == undefined) {
                        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                    }
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            if (ObtenerQueryString('codigo') == undefined) {
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
            }
        }

    };

    var cargarSucursales = function () {
        var select = $('#cboSucursal');
        Desbloquear($($('#cboSucursal').parents("div")[0]));
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            complete: function () {
                if (iniScsl) {
                    listarActivosFijos();
                    iniScsl = false;
                }
                $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                Desbloquear($($('#cboSucursal').parents("div")[0]));
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var eventoControles = function () {

        $('#cboEmpresa').change(function () {
            $("#txtTotalValorActual").html("0.00");
            $("#txtTotalValorInicial").html("0.00");
            iniScsl = true;
            cargarSucursales();
        });

        $('#cboSucursal').on('change', function () {
            $("#txtTotalValorActual").html("0.00");
            $("#txtTotalValorInicial").html("0.00");
            if (!iniScsl) {
                listarActivosFijos();
            }
        });
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            listarActivosFijos();
        }
    };
}();

var AFMACFI = function () {

    var cargarSucursales = function (scslCode) {    
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option></option>');
                for (var i = 0; i < datos.length; i++) {
                    $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }              
                if (ObtenerQueryString('codigo') == undefined) {
                    $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                }
            },
            complete: function () {
                if (scslCode !== undefined && $('#cboSucursal').val() != $('#ctl00_hddestablecimiento').val()) {
                    $('#cboSucursal').select2("val", scslCode).change();
                }
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    };

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    if (ObtenerQueryString('codigo') == undefined) {
                        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                    }
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            if (ObtenerQueryString('codigo') == undefined) {
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
            }
        }

    };
  
    
    var cargarAlmacen = function () {
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=SALMC&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== null) {
                    $('#hfALMC_CODE').val(data[0].CODIGO);
                } else {
                    $('#hfALMC_CODE').val('');
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarCentroCostos = function () {
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LCC&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {

                if (data !== null && data !== '') {
                    nNiveles = data[0].NIVELES;
                    $('select[data-nivel=4]').prop('disabled', false);
                    for (var i = 1; i <= parseInt(data[0].NIVELES) - 1 ; i++) {
                        $('select[data-nivel=' + i + ']').prop('disabled', false);
                    }
                    if (data[0].NIVEL1 !== '') {
                        $('#lblNivel1').text(data[0].NIVEL1);
                        cargarNivelCC(data[0].CODIGO, '', 1, $('#cboNivel1'));
                    }
                    if (data[0].NIVEL2 !== '') {
                        $('#lblNivel2').text(data[0].NIVEL2);
                    }
                    if (data[0].NIVEL3 !== '') {
                        $('#lblNivel3').text(data[0].NIVEL3);
                    }
                    if (data[0].NIVEL4 !== '') {
                        $('#lblNivel4').text(data[0].NIVEL4);
                    }
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarNivelCC = function (codigo, depend, nivel, select) {
        $(select).html('');
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LNCC&CECC_CODE=' + codigo + '&DEPEND_CODE=' + depend + '&NIVEL=' + nivel,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== null) {
                    $(select).append('<option></option>');
                    for (var i = 0; i < data.length; i++) {
                        $(select).append('<option value="' + data[i].CODE + '" cecc-code="' + codigo + '">' + data[i].DESCC + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var eventoControles = function () {
   
        $('#cboEmpresa').change(function () {
            cargarSucursales();
            cargarVehiculos();            
            for (var i = 1; i <= 4; i++) {
                $('select[data-nivel=' + i + ']').select2("val", "").change().prop('disabled', true);
            }
            //cargarCentroCostos();
            $("#txtIMPR_CODE, #txtPROD_CODE, #txtMCDR_CODE, #txtUNID_CODE, #txtBien, #txtBienSeriado").val('');
            $('#cboSerie').select2('destroy').html('').select2().prop('disabled', true);
        });

        $('#cboSucursal').change(function () {   
            if ($('#txtPROD_CODE').val() !== '') {
                $('#txtPROD_CODE, #txtMCDR_CODE, #txtBien').val('');
                $('#txtBienSeriado').val('N');
            }
            cargarImpresoras();
            cargarAlmacen();
        });

        $('#cboNivel1').change(function () {
            if ($(this).val() != "" && $(this).val() !== null) {
                cargarNivelCC($('#cboNivel1 :selected').attr('cecc-code'), $(this).val(), 2, $('#cboNivel2'));
                $('#cboNivel2').select2('destroy').select2();
                $('#cboNivel3, #cboNivel4').html('').select2('destroy').select2();
            }
        });

        $('#cboNivel2').change(function () {
            if ($(this).val() != "" && $(this).val() !== null) {
                if (nNiveles == 4) {
                    cargarNivelCC($('#cboNivel2 :selected').attr('cecc-code'), $(this).val(), 3, $('#cboNivel3'));
                    $('#cboNivel3').select2('destroy').select2();
                    $('#cboNivel4').html('').select2('destroy').select2();
                }
                else {
                    cargarNivelCC($('#cboNivel2 :selected').attr('cecc-code'), $(this).val(), 4, $('#cboNivel4'));
                    $('#cboNivel4').select2('destroy').select2();
                }
            }
        });

        $('#cboNivel3').change(function () {
            if ($(this).val() != "" && $(this).val() !== null) {
                cargarNivelCC($('#cboNivel3 :selected').attr('cecc-code'), $(this).val(), 4, $('#cboNivel4'));
                $('#cboNivel4').select2('destroy').select2();
            }
        });

        $('#cboMetodoDepreciacion').change(function () {
            if ($(this).val() != "") {
                if ($(this).val() === 'UP') {
                    $('.productividad').removeClass('hidden');
                } else {
                    $('.productividad').addClass('hidden');
                }
            }
        });

        $('#btnBuscarBien').click(function () {
            $('#divBuscarBien').modal('show');
            $('#tblImpresoras').DataTable().draw();
            $('#tblProductos').DataTable().draw();
            $('#tblVehiculos').DataTable().draw();
            //$('#tabProductos').click();
        });
    };

    var cargaTablasVacias = function () {
        //impresoras
        var parms = {
            data: null,
            responsive: true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "MARCA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "MODELO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "SERIE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ]
        };


        tablaImpr = $('#tblImpresoras').dataTable(parms);
        $('#tblImpresoras').removeAttr('style');

        $('#tblImpresoras tbody').on('click', 'tr', function () {
            var pos = tablaImpr.fnGetPosition(this);
            var impresora = tablaImpr.fnGetData(pos);
            $('#txtIMPR_CODE').val(impresora.CODIGO);
            $('#txtMCDR_CODE, #txtUNID_CODE, #txtPROD_CODE').val('');
            $('#txtBien').val(impresora.MARCA + ' ' + impresora.MODELO);
            $('#txtBienSeriado').val('S');
            cargarSerieBien(impresora.SERIE);
            $('#divBuscarBien').modal('hide');
        });
        // fin impresoras


        //tabla vehiculos

        parms = {
            data: null,
            responsive: true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "MARCA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }, {
                    data: "CARROCERIA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "SERIE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "PLACA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ]
        };

        tablaVehiculos = $('#tblVehiculos').dataTable(parms);
        $('#tblVehiculos').removeAttr('style');

        $('#tblVehiculos tbody').on('click', 'tr', function () {
            var pos = tablaVehiculos.fnGetPosition(this);
            var vehiculo = tablaVehiculos.fnGetData(pos);
            $('#txtIMPR_CODE, #txtMCDR_CODE, #txtPROD_CODE').val('');
            $('#txtUNID_CODE').val(vehiculo.CODIGO);
            $('#txtBien').val(vehiculo.MARCA + ' ' + vehiculo.CARROCERIA + ' ' + vehiculo.PLACA);
            $('#txtBienSeriado').val('S');
            cargarSerieBien(vehiculo.SERIE);
            $('#divBuscarBien').modal('hide');
        });


        //fin tabla vehiculos

    }

    var cargarImpresoras = function () {
        var dataf;
        var newData = new Array();
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LIMPR&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data != null) {
                    dataf = data;
                }

            },
            complete: function () {

                $.ajax({
                    type: "post",
                    url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=S&P_CODE=&CTLG_CODE=' + $('#cboEmpresa').val() + '&SCSL_CODE=' + $('#cboSucursal').val() + '&ESTADO=',
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,
                    success: function (data) {
                        data.filter(function (e, d) {
                            if (JSON.stringify(data).indexOf(e.SERIE) < 0) {
                                newData.push(e);
                            }
                        });
                        tablaImpr.fnClearTable();
                        if (newData.length > 0)
                            tablaImpr.fnAddData(newData);

                    },
                    error: function (msg) {
                        alertCustom(msg.d);
                    }
                });

            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarProductos = function () {
        $('#tblProductos').DataTable().destroy();
        $('#tblProductos tbody').html('').unbind('click');
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LPROD&CTLG_CODE=' + $('#cboEmpresa').val() + '&ALMC_CODE=' + $('#hfALMC_CODE').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                var parms;
                if (data !== null) {
                    parms = {
                        data: data,
                        responsive: true,
                        columns: [
                            {
                                data: "CODIGO",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "CODIGO_ANTIGUO",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'center');
                                }
                            },
                            {
                                data: "DESC_ADM",
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).css('text-align', 'left');
                                }
                            },
                            {
                                data: "SERIADA",
                                visible: false
                            }
                        ]
                    };
                } else {
                    parms = { responsive: true };
                }
                var tabla = $('#tblProductos').DataTable(parms);
                $('#tblProductos').removeAttr('style');

                $('#tblProductos tbody').on('click', 'tr', function () {
                    var producto = tabla.row(this).data();
                    $('#txtPROD_CODE').val(producto.CODIGO);
                    $('#txtIMPR_CODE, #txtMCDR_CODE, #txtUNID_CODE').val('');
                    $('#txtBien').val(producto.DESC_ADM);
                    $('#txtBienSeriado').val(producto.SERIADA);
                    if (producto.SERIADA === 'S') {
                        cargarSeriesProducto(producto.CODIGO);
                    } else {
                        $('#cboSerie').html('').select2('destroy').select2().prop('disabled', true);
                    }
                    $('#divBuscarBien').modal('hide');
                });
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarSeriesProducto = function (codigo, vendido_ind) {
        $('#cboSerie').html('').prop('disabled', false).unbind('change');
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LSPROD&PROD_CODE=' + codigo + '&ALMC_CODE=' + $('#hfALMC_CODE').val() + '&CTLG_CODE=' + $('#cboEmpresa').val() + "&p_Vendido=" + (vendido_ind === undefined ? "N" : vendido_ind),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data != null) {
                    $('#cboSerie').html('<option></option>');
                    for (var i = 0; i < data.length; i++) {
                        $('#cboSerie').append('<option value="' + data[i].CODIGO + '">' + data[i].CODIGO_BARRAS + '</option>');
                    }
                }
                $('#cboSerie').select2('destroy').select2();
                $('#cboSerie').on('change', function () {
                    $('#txtMCDR_CODE').val($(this).val());
                });
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarVehiculos = function () {
        $.ajax({
            type: "post",
            url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=LVEH&USUA_ID=' + $('#ctl00_txtus').val() + '&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                var parms;
                tablaVehiculos.fnClearTable();
                if (data !== null) {
                    tablaVehiculos.fnAddData(data);
                }

            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    };

    var cargarSerieBien = function (serie) {
        $('#cboSerie').html('<option value="' + serie + '">' + serie + '</option>').select2('destroy').select2().prop('disabled', true).unbind('change');
    };

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal, #cboSerie, #cboMetodoDepreciacion, #cboNivel1, #cboNivel2, #cboNivel3, #cboNivel4').select2();
        $('#txtFechaInicial').datepicker();
        $('#txtVidaUtil').inputmask({ mask: '9', repeat: 3, greedy: false });
        $('#txtValorInicial').inputmask({ mask: '9', repeat: 7, greedy: false });
    };

    var cargarInicial = function () {

        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            var CTLG_CODE = ObtenerQueryString('CTLG_CODE')
            var SCSL_CODE = ObtenerQueryString('SCSL_CODE')
            var ESTADO = ObtenerQueryString('ESTADO')

            $('#cboEmpresa').select2("val", CTLG_CODE).change();
            $("#cboSucursal").select2("val", SCSL_CODE).change();
            //cargarCentroCostos();
            $.ajax({
                type: "post",
                url: 'vistas/AF/ajax/AFMACFI.ashx?OPCION=S&P_CODE=' + codigo + '&CTLG_CODE=' + CTLG_CODE + '&SCSL_CODE=' + SCSL_CODE + '&ESTADO=' + ESTADO,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data !== null) {
                        console.log(data);
                        $('#txtCodigo').val(data[0].CODIGO);
                        $('#txtCodigoActivoFijo').val(data[0].CODIGO_AF);
                        if (data[0].ESTADO === 'INACTIVO') { $('#chkEstado').prop('checked', false).parent().removeClass('checked'); }
                        $('#txtBien').val(data[0].BIEN);
                        if (data[0].TIPO_BIEN === 'IMPRESORA') { $('#txtIMPR_CODE').val(data[0].BIEN_CODE); cargarSerieBien(data[0].SERIE); }
                        else if (data[0].TIPO_BIEN === 'PRODUCTO') {
                            $('#txtPROD_CODE').val(data[0].BIEN_CODE);
                            if (data[0].MCDR_CODE !== '') {
                                $("#txtMCDR_CODE").val(data[0].MCDR_CODE);
                                cargarSeriesProducto(data[0].BIEN_CODE, "S");
                                $('#cboSerie').select2('val', data[0].MCDR_CODE).change();
                            }
                        } else if (data[0].TIPO_BIEN === 'VEHICULO') {
                            $('#txtUNID_CODE').val(data[0].BIEN_CODE);
                            cargarSerieBien(data[0].SERIE);
                        }
                        
                        $('#cboMetodoDepreciacion').select2('val', data[0].METODO_DEPRECIACION).change();
                        $('#txtProduccion').val(data[0].PRODUCCION);
                        $('#txtFechaInicial').datepicker('setDate', data[0].FECHA_INICIAL);
                        $('#txtValorInicial').val(parseInt(data[0].VALOR_INICIAL));
                        $('#txtVidaUtil').val(data[0].VIDA_UTIL);
                        $('#txtValorDesecho').val(data[0].VALOR_DESECHO);
                        $('#txtValorActual').val(data[0].VALOR_ACTUAL);
                        $('#txt_centro_costo').val(data[0].DESC_CENTRO_COSTO);
                        
                        $("#txt_centro_costo").data("CodCentroCostoCab", data[0].CENTRO_COSTO);
                        $("#txt_centro_costo").data("CodCentroCosto", data[0].DETALLE_CENTRO_COSTO);

                        $('#cboEmpresa, #cboMetodoDepreciacion').prop('disabled', true);
                        if (data[0].METODO_DEPRECIACION === '') {
                            $('#cboMetodoDepreciacion').prop('disabled', false);
                        }
                        $('#datos').removeClass('hidden');
                        //cargarValorActual();
                        cargarDepreciacion(data[0].METODO_DEPRECIACION);
                        $('#txtBien').removeClass('span10').addClass('span12');
                        $('#btnBuscarBien').addClass('hidden');
                        $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }// else {
        //cargarAlmacen();
        //cargarImpresoras();
        //cargarVehiculos();
        // }
    };

    return {
        init: function () {
            plugins();
            cargaTablasVacias();
            eventoControles();
            fillCboEmpresa();
            //cargarProductos();
           
            cargarInicial();
        }
    };
}();

var cargarDepreciacion = function (metodo) {
    switch (metodo) {
        case 'LR': { //linea recta
            var fecha_inicial = $('#txtFechaInicial').datepicker('getDate');
            var anios_uso = parseInt((new Date() - fecha_inicial) / (1000 * 60 * 60 * 24 * 365));
            var dep_anual = ($('#txtValorInicial').val() - $('#txtValorDesecho').val()) / $('#txtVidaUtil').val();
            var dep_total = anios_uso * dep_anual;
            var valor_actual = $('#txtValorInicial').val() - dep_total;
            $('#tblDepreciacion thead').html('<tr><th>VARIABLES</th><th style="text-align: right">VALORES</th></tr>');
            $('#tblDepreciacion tbody').html('<tr><th>VALOR DEL ACTIVO</th><td style="text-align: right">' + parseFloat($('#txtValorInicial').val()).toFixed(2) + '</td></tr>\
                <tr><th>VALOR DE DESECHO</th><td style="text-align: right">' + parseFloat($('#txtValorDesecho').val()).toFixed(2) + '</td></tr>\
                <tr><th>VIDA UTIL EN AÑOS</th><td style="text-align: right">' + $('#txtVidaUtil').val() + '</td></tr>\
                <tr><th>DEPRECIACION ANUAL</th><td style="text-align: right">' + dep_anual.toFixed(2) + '</td></tr>\
                <tr><th>AÑOS DE USO HASTA HOY</th><td style="text-align: right">' + anios_uso + '</td></tr>\
                <tr style="color: green"><th><big>VALOR ACTUAL</big></th><td style="text-align: right"><big>' + valor_actual.toFixed(2) + '</big></td></tr>');
            break;
        }
        case 'UP': { //unidades producidas
            var fecha_inicial = $('#txtFechaInicial').datepicker('getDate');
            var valor_activo = parseFloat($('#txtValorInicial').val());
            var unidades_producidas = $('#txtProduccion').val();
            var vida_util = $('#txtVidaUtil').val();
            var unidades_producidas_anual = unidades_producidas / vida_util;
            var anios_uso = parseInt((new Date() - fecha_inicial) / (1000 * 60 * 60 * 24 * 365));
            var dep_unidad = (valor_activo - $('#txtValorDesecho').val()) / unidades_producidas;
            var cuota_dep = unidades_producidas_anual * dep_unidad;
            var dep_acumulada = 0;
            var valor_actual = valor_activo;
            $('#tblDepreciacion thead').html('<tr><th style="text-align: right">Año</th>\
            <th style="text-align: center">Prod. Anual</th>\
            <th style="text-align: right">Dep. por unidad</th>\
            <th style="text-align: right">Cuota de Dep.</th>\
            <th style="text-align: right">Dep. Acumulada</th>\
            <th style="text-align: right">Valor Neto en Libros</th></tr>');
            $('#tblDepreciacion tbody').html('');
            for (var i = 0; i < anios_uso && i < vida_util; i++) {
                dep_acumulada += cuota_dep;
                valor_actual = valor_activo - dep_acumulada;
                $('#tblDepreciacion tbody').append('<tr><td style="text-align: center">' + (i + 1) + '</td>\
                    <td style="text-align: center">' + unidades_producidas_anual + '</td>\
                    <td style="text-align: center">' + dep_unidad.toFixed(2) + '</td>\
                    <td style="text-align: right">' + cuota_dep.toFixed(2) + '</td>\
                    <td style="text-align: right">' + dep_acumulada.toFixed(2) + '</td>\
                    <td style="text-align: right">' + valor_actual.toFixed(2) + '</td></tr>');
            }
            if (valor_actual > 0 && anios_uso >= parseInt(vida_util)) {
                dep_acumulada += cuota_dep;
                $('#tblDepreciacion tbody').append('<tr><td style="text-align: center">' + (i + 1) + '</td>\
                    <td style="text-align: center">' + unidades_producidas_anual + '</td>\
                    <td style="text-align: center">' + dep_unidad.toFixed(2) + '</td>\
                    <td style="text-align: right">' + cuota_dep.toFixed(2) + '</td>\
                    <td style="text-align: right">' + dep_acumulada.toFixed(2) + '</td>\
                    <td style="text-align: right">0.00</td></tr>');
            }
            break;
        }
        case 'SD': {//suma de digitos
            var fecha_inicial = $('#txtFechaInicial').datepicker('getDate');
            var valor_activo = parseFloat($('#txtValorInicial').val());
            var vida_util = parseFloat($('#txtVidaUtil').val());
            var anios_uso = parseInt((new Date() - fecha_inicial) / (1000 * 60 * 60 * 24 * 365));
            var factor = 0;
            var x = 0;
            var cuota_dep = 0;
            var dep_acumulada = 0;
            var valor_actual = valor_activo;
            $('#tblDepreciacion thead').html('<tr><th style="text-align: right">Año</th><th>Factor</th><th style="text-align: right">Porcentaje</th>\
                <th style="text-align: right">Valor Activo</th><th style="text-align: right">Cuota Dep.</th>\
                <th style="text-align: right">Dep. Acumulada</th><th style="text-align: right">Valor Neto en Libros</th></tr>');
            $('#tblDepreciacion tbody').html('');
            for (var i = 0; i < anios_uso && i < vida_util; i++) {
                x = vida_util - i;
                factor = x / (vida_util * (vida_util + 1) / 2);
                cuota_dep = factor * valor_activo;
                dep_acumulada += cuota_dep;
                valor_actual = valor_activo - dep_acumulada;
                $('#tblDepreciacion tbody').append('<tr><td style="text-align: right">' + (i + 1) + '</td>\
                <td>' + factor.toFixed(4) + '</td>\
                <td style="text-align: right">' + (factor * 100).toFixed(3) + '</td>\
                <td style="text-align: right">' + valor_activo.toFixed(2) + '</td>\
                <td style="text-align: right">' + cuota_dep.toFixed(2) + '</td>\
                <td style="text-align: right">' + dep_acumulada.toFixed(2) + '</td>\
                <td style="text-align: right">' + valor_actual.toFixed(2) + '</td></tr>');
            }
            break;
        }
    }
    if (metodo !== "") {
        //tabla depreciacion
        //tablaDepreciacion.fnDestroy();
        tablaDepreciacion = $('#tblDepreciacion').dataTable({ responsive: true, searching: false, paging: false, info: false, ordering: false });
        $('#tblDepreciacion_wrapper :first').remove();
        $('#tblDepreciacion_wrapper :last').remove();
        $('#tblDepreciacion_wrapper :last').remove();

        //fin tabla depreciacion
    }

    if (metodo == "") {
        //tabla depreciacion
        //tablaDepreciacion.fnDestroy();
        tablaDepreciacion = $('#tblDepreciacion').dataTable({ responsive: true, searching: false, paging: false, info: false, ordering: false });
        $('#tblDepreciacion_wrapper :first').remove();
        $('#tblDepreciacion_wrapper :last').remove();
        $('#tblDepreciacion_wrapper :last').remove();

        //fin tabla depreciacion
    }
};

var Grabar = function () {
    var a = ['cboEmpresa', 'cboSucursal', 'txtBien', 'txt_centro_costo','cboMetodoDepreciacion', 'txtFechaInicial', 'txtValorInicial', 'txtVidaUtil', 'txtValorDesecho'];
    if ($('#txtBienSeriado').val() === 'S') {
        a.push('cboSerie');
    }
    if ($('#cboMetodoDepreciacion').val() === 'UP') {
        a.push('txtProduccion');
    }
    if (vErrors(a)) {
        if (parseFloat($('#txtValorInicial').val()) > 0) {
            if (parseFloat($('#txtValorDesecho').val()) <= parseFloat($('#txtValorInicial').val()) * 0.45) {
                Bloquear("ventana");
                var data = new FormData();
                data.append('CTLG_CODE', $('#cboEmpresa').val());
                data.append('SCSL_CODE', $('#cboSucursal').val());
                data.append('IMPR_CODE', $('#txtIMPR_CODE').val());
                data.append('PROD_CODE', $('#txtPROD_CODE').val());
                data.append('MCDR_CODE', $('#txtMCDR_CODE').val());
                data.append('UNID_CODE', $('#txtUNID_CODE').val());
                if ($('#txtUNID_CODE').val() !== '') {
                    data.append('UNIDAD', $('#txtBien').val());
                } else {
                    data.append('UNIDAD', '');
                }
                data.append('SERIE', $('#cboSerie :selected').text());
                data.append('FECHA_INICIAL', $('#txtFechaInicial').val());
                data.append('VALOR_INICIAL', $('#txtValorInicial').val());
                data.append('VIDA_UTIL', $('#txtVidaUtil').val());
                data.append('VALOR_DESECHO', $('#txtValorDesecho').val());
                data.append('METODO_DEPRECIACION', $('#cboMetodoDepreciacion').val());
                data.append('PRODUCCION', $('#txtProduccion').val());
                data.append('CENTRO_COSTO', $("#txt_centro_costo").data("CodCentroCostoCab"));
                data.append('CENTRO_COSTO_DETALLE', $("#txt_centro_costo").data("CodCentroCosto"));
                data.append('ESTADO', $('#chkEstado').is(':checked') ? 'A' : 'I');
                data.append('USUA_ID', $('#ctl00_txtus').val());
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/AF/ajax/AFMACFI.ashx?OPCION=G",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).success(function (datos) {
                    datos = datos.split(',');
                    $('#txtCodigo').val(datos[0]);
                    $('#txtCodigoActivoFijo').val(datos[1]);
                    $('#txtValorActual').val(datos[2]);
                    $('#txtBien').removeClass('span10').addClass('span12');
                    $('#btnBuscarBien').addClass('hidden');
                    $('#grabar').attr('href', 'javascript:Actualizar()').html('<i class="icon-pencil"></i>&nbsp;Modificar');
                    $('#cboEmpresa, #cboMetodoDepreciacion').prop('disabled', true);
                    window.history.pushState("Object", "Activo Fijo", "/Default.aspx?f=AFMACFI&codigo=" + datos[0] + "&CTLG_CODE=" + $('#cboEmpresa').val() + "&SCSL_CODE=" + $('#cboSucursal').val() + "&ESTADO=" + ($('#chkEstado').is(':checked') ? 'A' : 'I'));
                    $('#datos').removeClass('hidden');
                    //cargarValorActual();

                    cargarDepreciacion($('#cboMetodoDepreciacion').val());
                    Desbloquear("ventana");
                    exito();
                }).error(function () {
                    infoCustom2('Un bien material sólo puede tener un sólo código de Activo Fijo');
                    Desbloquear("ventana");
                });
            } else {
                alertCustom('Por favor, ingrese un valor adecuado para el valor de desecho.');
            }
        } else {
            alertCustom('Por favor, ingrese un valor inicial mayor a 0.');
        }
    }
};

var Actualizar = function () {
    var a = ['cboEmpresa', 'cboSucursal', 'txtBien', 'txt_centro_costo','cboMetodoDepreciacion', 'txtFechaInicial', 'txtValorInicial', 'txtVidaUtil', 'txtValorDesecho'];
    if ($('#cboMetodoDepreciacion').val() === 'UP') {
        a.push('txtProduccion');
    }
    if (vErrors(a)) {
        if (parseFloat($('#txtValorInicial').val()) > 0) {
            if (parseFloat($('#txtValorDesecho').val()) <= parseFloat($('#txtValorInicial').val()) * 0.45) {
                Bloquear("ventana");
                var data = new FormData();
                data.append('P_CODE', $('#txtCodigo').val());
                data.append('CTLG_CODE', $('#cboEmpresa').val());
                data.append('SCSL_CODE', $('#cboSucursal').val());
                data.append('IMPR_CODE', $('#txtIMPR_CODE').val());
                data.append('PROD_CODE', $('#txtPROD_CODE').val());
                data.append('MCDR_CODE', $('#txtMCDR_CODE').val());
                data.append('UNID_CODE', $('#txtUNID_CODE').val());
                if ($('#txtUNID_CODE').val() !== '') {
                    data.append('UNIDAD', $('#txtBien').val());
                } else {
                    data.append('UNIDAD', '');
                }
                data.append('SERIE', $('#cboSerie :selected').text())
                data.append('FECHA_INICIAL', $('#txtFechaInicial').val());
                data.append('VALOR_INICIAL', $('#txtValorInicial').val());
                data.append('VIDA_UTIL', $('#txtVidaUtil').val());
                data.append('VALOR_DESECHO', $('#txtValorDesecho').val());
                data.append('METODO_DEPRECIACION', $('#cboMetodoDepreciacion').val());
                data.append('PRODUCCION', $('#txtProduccion').val());
                data.append('CENTRO_COSTO', $("#txt_centro_costo").data("CodCentroCostoCab"));
                data.append('CENTRO_COSTO_DETALLE', $("#txt_centro_costo").data("CodCentroCosto"));
                data.append('ESTADO', $('#chkEstado').is(':checked') ? 'A' : 'I');
                data.append('USUA_ID', $('#ctl00_txtus').val());
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/AF/ajax/AFMACFI.ashx?OPCION=A",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).success(function (datos) {                    
                    datos = datos.split(',');
                    console.log(datos);
                    if (datos[1] === 'OK') {
                        exito();
                        $('#txtValorActual').val(datos[0]);
                        tablaDepreciacion.fnDestroy();
                        cargarDepreciacion($('#cboMetodoDepreciacion').val());
                    } else {
                        noexito();
                    }
                    Desbloquear("ventana");
                }).error(function () {
                    Desbloquear("ventana");
                    noexito();
                });
            } else {
                alertCustom('Por favor, ingrese un valor adecuado para el valor de desecho.');
            }
        } else {
            alertCustom('Por favor, ingrese un valor inicial mayor a 0.');
        }
    }
};
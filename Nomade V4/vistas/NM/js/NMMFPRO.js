// <reference path="../../NV/js/NVMDOCV.js" />

var sUsaConta = 'N';

var NMMFPRO = function () {
    var oCentroCostoCab = [];
    var sCentroCostoCab = "";
    var aoNiveles = [];

    var fnCargarParametros = function (psPlanCostos) {
        sUsaConta = mGetParametro("ECON", "Parametro Contable");
    };
    
    var CargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        aoNiveles = vNiveles;
    };

    // Cambio de id de "cboEmpresas" a "slcEmpresa" en todas las líneas de código necesarias

    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#cboEmpresaModal').select2();
        $('#cboExistenciasModal').select2();
        $('#cboEmpresaModalSubg').select2();
        $('#cboExistenciasSgModal').select2();
        $('#cboGrupoModal').select2();
        $('#cboTipoSistema').select2();

        //compra
        $('#cbo_cuentaCompra').select2();
        /*
        // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
        $('#cbo_cuentaIgv').select2();
        $('#cbo_cuentaCompraMN').select2();
        $('#cbo_cuentaCompraME').select2();
        $('#cbo_cuentaCompraRelMN').select2();
        $('#cbo_cuentaCompraRelME').select2();
        */

        //venta
        $('#cbo_cuentaVenta').select2();
        /*
        // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
        $('#cbo_cuentaIgv_venta').select2();
        $('#cbo_cuentaVentaMN').select2();
        $('#cbo_cuentaVentaME').select2();
        $('#cbo_cuentaVentaRelMN').select2();
        $('#cbo_cuentaVentaRelME').select2();
        */
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#slcEmpresa').empty();
                    $('#slcEmpresa').append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#slcEmpresa').empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $('#slcEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
        }
    }

    var fillcboExistenciasModal = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboExistenciasModal').empty();
                $('#cboExistenciasModal').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboExistenciasModal').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                    }
                }
                $('#cboExistenciasModal').select2('val', '');
            },
            error: function (msg) {
                MostrarError(msg, "ventana");
            }
        });
    }
        
    var fillcboExistenciasSgModal = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboExistenciasSgModal').empty();
                $('#cboExistenciasSgModal').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboExistenciasSgModal').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                    }
                }
                $('#cboExistenciasSgModal').select2('val', '');
            },
            error: function (msg) {
                MostrarError(msg, "ventana");
            }
        });
    }

    var fillcboEmpresaModal = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#cboEmpresaModal').empty();
                    $('#cboEmpresaModal').append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresaModal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresaModal').select2('val', $('#ctl00_hddctlg').val());
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresaModal').empty().append('<option></option>');
            dPermanente = JSON.parse(dPermanente);
            for (var i = 0; i < dPermanente.length; i++) {
                $('#cboEmpresaModal').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
            }
            $('#cboEmpresaModal').select2('val', $('#ctl00_hddctlg').val());
        }
    }

    var fillcboEmpresaModalSubg = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresaModalSubg').empty();
                $('#cboEmpresaModalSubg').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboEmpresaModalSubg').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEmpresaModalSubg').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoControles = function () {

        $('#slcEmpresa').on('change', function () {
            var ddlValue = this.value;

            //fnlimpiaCentroCostos();

            $('#hfCODE_EMPRESA').val($('#slcEmpresa').val());
            $('#hfDESC_EMPRESA').val($('#slcEmpresa option:selected').html());

            styleDiv('display', 'display');

            styleBotonesGrupo('display', 'display', 'display:none', 'display:none');
            disabledBotonesGrupo(false, false, true, true);

            styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
            disabledBotonesSubGrupo(true, true, true, true);
            //ListarCuentasTodas();
            InitConfiguration('Grupos', 'Grupos', 'GRUPOS');
            InitConfiguration('SubGrupo', 'SubGrupo', 'SUBGRUPOS');

            ListarGrupos();
            
            //compras
            ListarCtasGeneral('cbo_cuentaCompra', 'cbo_cuentaCompra_desc', '');
            /*
            // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
            ListarCtasGeneral('cbo_cuentaIgv', 'cbo_cuentaIgv_desc', '40');
            ListarCtasGeneral('cbo_cuentaCompraMN', 'cbo_cuentaCompraMN_desc', '42');
            ListarCtasGeneral('cbo_cuentaCompraME', 'cbo_cuentaCompraME_desc', '42');
            ListarCtasGeneral('cbo_cuentaCompraRelMN', 'cbo_cuentaCompraRelMN_desc', '43');
            ListarCtasGeneral('cbo_cuentaCompraRelME', 'cbo_cuentaCompraRelME_desc', '43');
            */

            //ventas
            ListarCtasGeneral('cbo_cuentaVenta', 'cbo_cuentaVenta_desc', '');
            /*
            // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
            ListarCtasGeneral('cbo_cuentaIgv_venta', 'cbo_cuentaIgv_venta_desc', '40');
            ListarCtasGeneral('cbo_cuentaVentaMN', 'cbo_cuentaVentaMN_desc', '12');
            ListarCtasGeneral('cbo_cuentaVentaME', 'cbo_cuentaVentaME_desc', '12');
            ListarCtasGeneral('cbo_cuentaVentaRelMN', 'cbo_cuentaVentaRelMN_desc', '13');
            ListarCtasGeneral('cbo_cuentaVentaRelME', 'cbo_cuentaVentaRelME_desc', '13');
            */

        });

        $('#cboEmpresaModalSubg').on('change', function () {
            ListarCuentasTodas();
            ListarGruposCbo();
            
            fnlimpiaCentroCostos();
        });

        
        // CONTROLES DE COMPRAS
        $('#chxDebe1').on('change', function () {

            if ($("#chxDebe1").is(":checked")) {
                $('#chxHaber1').attr('disabled', true);
            }
            else {
                $('#chxHaber1').attr('disabled', false);
            }
            
        });

        $('#chxHaber1').on('change', function () {
            

            if ($("#chxHaber1").is(":checked")) {
                $('#chxDebe1').attr('disabled', true);
            }
            else {
                $('#chxDebe1').attr('disabled', false);
            }

        });
        
        $('#cbo_cuentaCompra').on('change', function () {
            var desc = $('#cbo_cuentaCompra').val();
            document.getElementById("cbo_cuentaCompra_desc").innerHTML = desc;
        });

             
        // CONTROLES DE VENTAS
        $('#chxDebev1').on('change', function () {

            if ($("#chxDebev1").is(":checked")) {
                $('#chxHaberv1').attr('disabled', true);
            }
            else {
                $('#chxHaberv1').attr('disabled', false);
            }

        });

        $('#chxHaberv1').on('change', function () {

            if ($("#chxHaberv1").is(":checked")) {
                $('#chxDebev1').attr('disabled', true);
            }
            else {
                $('#chxDebev1').attr('disabled', false);
            }

        });

        $('#chxDebev2').on('change', function () {

            if ($("#chxDebev2").is(":checked")) {
                $('#chxHaberv2').attr('disabled', true);
            }
            else {
                $('#chxHaberv2').attr('disabled', false);
            }

        });

        $('#chxHaberv2').on('change', function () {
            
            if ($("#chxHaberv2").is(":checked")) {
                $('#chxDebev2').attr('disabled', true);
            }
            else {
                $('#chxDebev2').attr('disabled', false);
            }

        });

        $('#chxDebev3').on('change', function () {

            if ($("#chxDebev3").is(":checked")) {
                $('#chxHaberv3').attr('disabled', true);
            }
            else {
                $('#chxHaberv3').attr('disabled', false);
            }

        });

        $('#chxHaberv3').on('change', function () {

            if ($("#chxHaberv3").is(":checked")) {
                $('#chxDebev3').attr('disabled', true);
            }
            else {
                $('#chxDebev3').attr('disabled', false);
            }

        });

        $('#chxDebev4').on('change', function () {

            if ($("#chxDebev4").is(":checked")) {
                $('#chxHaberv4').attr('disabled', true);
            }
            else {
                $('#chxHaberv4').attr('disabled', false);
            }

        });

        $('#chxHaberv4').on('change', function () {

            if ($("#chxHaberv4").is(":checked")) {
                $('#chxDebev4').attr('disabled', true);
            }
            else {
                $('#chxDebev4').attr('disabled', false);
            }

        });

        $('#chxDebev5').on('change', function () {

            if ($("#chxDebev5").is(":checked")) {
                $('#chxHaberv5').attr('disabled', true);
            }
            else {
                $('#chxHaberv5').attr('disabled', false);
            }

        });

        $('#chxHaberv5').on('change', function () {

            if ($("#chxHaberv5").is(":checked")) {
                $('#chxDebev5').attr('disabled', true);
            }
            else {
                $('#chxDebev5').attr('disabled', false);
            }

        });

        $('#chxDebev6').on('change', function () {

            if ($("#chxDebev6").is(":checked")) {
                $('#chxHaberv6').attr('disabled', true);
            }
            else {
                $('#chxHaberv6').attr('disabled', false);
            }

        });

        $('#chxHaberv6').on('change', function () {

            if ($("#chxHaberv6").is(":checked")) {
                $('#chxDebev6').attr('disabled', true);
            }
            else {
                $('#chxDebev6').attr('disabled', false);
            }

        });

        $('#cbo_cuentaVenta').on('change', function () {
            var desc = $('#cbo_cuentaVenta').val();
            document.getElementById("cbo_cuentaVenta_desc").innerHTML = desc;
        });

        $('#cbo_cuentaIgv_venta').on('change', function () {
            var desc = $('#cbo_cuentaIgv_venta').val();
            document.getElementById("cbo_cuentaIgv_venta_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaMN').on('change', function () {
            var desc = $('#cbo_cuentaVentaMN').val();
            document.getElementById("cbo_cuentaVentaMN_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaME').on('change', function () {
            var desc = $('#cbo_cuentaVentaME').val();
            document.getElementById("cbo_cuentaVentaME_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaRelMN').on('change', function () {
            var desc = $('#cbo_cuentaVentaRelMN').val();
            document.getElementById("cbo_cuentaVentaRelMN_desc").innerHTML = desc;
        });

        $('#cbo_cuentaVentaRelME').on('change', function () {
            var desc = $('#cbo_cuentaVentaRelME').val();
            document.getElementById("cbo_cuentaVentaRelME_desc").innerHTML = desc;
        });       

        $('#chkIscSgModal').on('change', function () {
            if ($("#chkIscSgModal").is(":checked")) {
                
                if ($('#hfISC_CODE').val() !== "") {
                    $("#cboTipoSistema").select2('val', $('#hfISC_CODE').val());
                } else {
                    $('#cboTipoSistema').select2('val', '');    
                }                
                $('#cboTipoSistema').attr('disabled', false);
            }
            else {
                $('#cboTipoSistema').select2('val', '');
                $('#cboTipoSistema').attr('disabled', true);
            }
        });
        

    }

    var fnlimpiaCentroCostos = function () {
        $("#txt_centro_costo").val('');
        $("#txt_centro_costo").data("CodCentroCostoCab", '');
        $("#txt_centro_costo").data("CodCentroCosto", '');
    };

  
         
    var cargaInicial = function () {
        var posicion = $('#slcEmpresa').offset();
        $("#MuestraModal").attr("style", "margin-top:-100px");
        //$("#MuestraModalSubGrupo").attr("style", "margin-top:-140px;width:1220px; margin-left:-605px;");
        // alert(posicion.top +"" + posicion.left);
        styleDiv('display:none', 'display:none');

        var ddlValue = this.value;

        $('#hfCODE_EMPRESA').val($('#slcEmpresa').val());
        $('#hfDESC_EMPRESA').val($('#slcEmpresa option:selected').html());

        styleDiv('display', 'display');

        styleBotonesGrupo('display', 'display', 'display:none', 'display:none');
        disabledBotonesGrupo(false, false, true, true);

        styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
        disabledBotonesSubGrupo(true, true, true, true);
        
        InitConfiguration('Grupos', 'Grupos', 'GRUPOS');
        InitConfiguration('SubGrupo', 'SubGrupo', 'SUBGRUPOS');

        $('#slcEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
        
        var cod = ObtenerQueryString("codigo");
        //PARA SUBGRUPOS: IR A ListarSubGrupos(...)
        if (typeof cod != "undefined") {
            var id = "#" + cod;//LISTAR GRUPO
            window.location.hash = id;
            $(id).click();
        }
       
    }

    return {
        init: function () {
            fnCargarParametros();
            plugins();
            eventoControles();
            fillCboEmpresa();
            //  fillcboEmpresaModal();
            //  fillcboEmpresaModalSubg();
            fillcboExistenciasModal();            
            //  fillcboExistenciasSgModal();
            cargaInicial();
        }
    };

}();

function InitConfiguration(name, div, nameTable) {
    var input = NewTableInit(name, nameTable);
    $('#div' + div).html(input);

    oTableNew = $('#tbl' + name).dataTable({
        "searching": false,
        "info": false,
        "ordering": true,
        "paging": false,
        "dom": '<"toolbar">frtip',
        "scrollX": false,
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla.",
            "sZeroRecords": "No hay datos disponibles en la tabla."
        }
    });

}

function NewTableInit(name, nameTable) {
    var output = '';
    output += "<table id='tbl" + name + "' cellspacing='0'  class='display DTTT_selectable'>";
    output += "<thead>";
    output += "<tr>";
    output += "<th colspan='3'>" + nameTable.toUpperCase() + "</th>"
    output += "</tr>"
    output += "<tr>"
    output += "<th align='center'>CÓDIGO</th>"
    output += "<th align='center'>DESCRIPCIÓN</th>"
    output += "<th align='center'>ESTADO</th>"
    output += "</tr>"
    output += "</thead>"
    output += "<tbody>"
    output += "</tbody>"
    output += "</table>"
    return output;
}

function ListarGrupos() {

    // var v_Niveles = $('#hfCodigoNiveles').val();

    styleBotonesGrupo('display', 'display', 'display:none', 'display:none');
    disabledBotonesGrupo(false, false, true, true);

    styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
    disabledBotonesSubGrupo(true, true, true, true);



    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=1&CTLG_CODE=" + $.trim($('#slcEmpresa').val()),
        async: false,
        success: function (datos) {
            if (datos == "No se encontraron datos!!!") {
                InitConfiguration('Grupos', 'Grupos', 'GRUPOS');
                InitConfiguration('SubGrupo', 'SubGrupo', 'SUBGRUPOS');

            }
            else {
                ClearTables('Grupos');
                ClearTables('SubGrupo');


                $('#divGrupos').html(datos);

                oTableNivel1 = $('#tblGrupos').dataTable({
                    "searching": true,
                    //"iDisplayLength": 10,
                    "info": false,
                    "ordering": true,
                    "paging": false,
                    "dom": '<"toolbar">frtip',
                    "scrollX": false,
                    "scrollY": 400,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });

                InitConfiguration('SubGrupo', 'SubGrupo', 'SUBGRUPOS');


                $('#tblGrupos tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                        InitConfiguration('SubGrupo', 'SubGrupo', 'SUBGRUPOS');


                        styleBotonesGrupo('display', 'display', 'display:none', 'display:none');
                        disabledBotonesGrupo(false, false, true, true);

                        styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
                        disabledBotonesSubGrupo(true, true, true, true);

                        
                    }
                    else {
                        oTableNivel1.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        var codGrupo = $(this).attr('id');
                        $('#hfCODE_GRUPO').val(codGrupo);
                        $('#hfDESC_GRUPO').val($(this).find('td').first().next().html());
                        $('#hfDESC_EXIS').val($(this).find('td').first().next().next().html());
                        $('#hfTIPO_EXIS').val($(this).find('td').first().next().next().next().html());
                        $('#hfESTADO_IND_GRUPO').val($(this).find('td').first().next().next().next().next().html());

                        styleBotonesGrupo('display:none', 'display', 'display', 'display:none');
                        disabledBotonesGrupo(true, false, false, true);
                        ListarSubGrupos(codGrupo);
                        
                    }
                });
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

    //$(".dataTables_scroll").attr("style", "max-height:500px;overflow-y:scroll;");
}

function ListarSubGrupos(DEPEND_CODE) {

    //var v_Niveles = $('#hfCodigoNiveles').val();

    styleBotonesSubGrupo('display', 'display', 'display:none', 'display:none');
    disabledBotonesSubGrupo(false, false, true, true);

    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=2&DEPEND_CODE=" + DEPEND_CODE + "&CTLG_CODE=" + $.trim($('#slcEmpresa').val()),
        async: false,
        success: function (datos) {
            if (datos == "No se encontraron datos!!!") {
                styleBotonesGrupo('display:none', 'display', 'display', 'display');
                disabledBotonesGrupo(true, false, false, false);
                InitConfiguration('SubGrupo', 'SubGrupo', 'SUBGRUPOS');
            }
            else {

                ClearTables('SubGrupo');
                $('#divSubGrupo').html(datos);
                oTableSubGrupo = $('#tblSubGrupo').dataTable({
                    "searching": true,
                    //"iDisplayLength": 10,
                    "info": false,
                    "ordering": true,
                    "paging": false,
                    "dom": '<"toolbar">frtip',
                    "scrollX": false,
                    "scrollY": 400,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });

                $('#tblSubGrupo tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');

                        styleBotonesSubGrupo('display', 'display', 'display:none', 'display:none');
                        disabledBotonesSubGrupo(false, false, true, true);
                        
                    }
                    else {
                        oTableSubGrupo.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        var codSubGrupo = $(this).attr('id');
                        
                        $('#hfCODE_SUBGRUPO').val(codSubGrupo);
                        $('#hfDESC_SUBGRUPO').val($(this).find('td').first().next().html());
                        $('#hfESTADO_IND_SUBGRUPO').val($(this).find('td').first().next().next().html());                       
                        $("#hfCODE_SUBGRUPO_CECO").val($(this).find('td').first().next().next().next().html()); 
                        $("#hfCECC").val($(this).find('td').first().next().next().next().next().html());  
                        $("#hfCECD").val($(this).find('td').first().next().next().next().next().next().html());
                        $("#hfISC_CODE").val($(this).find('td').first().next().next().next().next().next().next().html());
                        $("#hfISC_IND").val($(this).find('td').first().next().next().next().next().next().next().next().html());
                        
                        styleBotonesSubGrupo('display:none', 'display', 'display', 'display');
                        disabledBotonesSubGrupo(true, false, false, false);

                    }

                });


                var cod = ObtenerQueryString("codigo");
                var subgrup = ObtenerQueryString("s");
                if (typeof cod != "undefined" && typeof subgrup != "undefined") {
                    setTimeout(function () {
                        var id = "#" + subgrup;
                        window.location.hash = id;
                        $(id).click();
                    }, 500);
                }

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function ListarCuentasTodas() {


    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=5&CTLG_CODE=" + $('#cboEmpresaModalSubg').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('.cuentas:input').empty();

            $('.cuentas:input').append('<option></option>');


            if (datos != null) {

                for (var i = 0; i < datos.length; i++) {

                    $('.cuentas:input').append('<option value="' + datos[i].Descripcion + '">' + datos[i].Cod_Cuenta + '</option>');

                }
            }
            $('.cuentas:input').select2('val', '');
            $('.cuentasdesc').html("");


        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function ListarCtasGeneral(control,control_desc,cuenta)
{
    //colocamos en una variable la referencia al control enviado por parámetro
    controlvar = $('#' + control);
    //control = $('#' + control_desc);
    
    $.ajax({
        type: "post",
        url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + $('#slcEmpresa').val() + "&P_CUEN_CODE=" + cuenta,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            controlvar.empty();
            controlvar.append('<option></option>');
            if (!isEmpty(datos)) {
                for (var i = 0; i < datos.length; i++) {
                    controlvar.append('<option value="' + datos[i].CUENTA + '" data-ctaid = "' + datos[i].ID_CUENTA + '" >' + datos[i].DESCRIPCION + ' - ' + datos[i].CUENTA + '</option>');
                }
            }
            controlvar.select2('val', '');
            //colocamos el valor vacío al control de pantalla obtenido por parámetro
            $('#' + control_desc)[0].innerHTML = "";
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

function styleDiv(strDivSpanButtonsNivel, strDivSpanTablesNivel) {
    $('#divSpanButtonsGrupo').attr('style', strDivSpanButtonsNivel);
    $('#divSpanButtonsSubgrupo').attr('style', strDivSpanButtonsNivel);
    $('#divSpanTablesGruposSubgrupos').attr('style', strDivSpanTablesNivel);
}

function styleBotonesGrupo(strAddGrupo, strRefGrupo, strEditGrupo, strDelGrupo) {
    $('#aAddGrupo').attr('style', strAddGrupo);
    $('#aRefGrupo').attr('style', strRefGrupo);
    $('#aEditGrupo').attr('style', strEditGrupo);
    $('#aDelGrupo').attr('style', strDelGrupo);
}

function styleBotonesSubGrupo(strAddSubGrupo, strRefSubGrupo, strEditSubGrupo, strDelSubGrupo) {
    $('#aAddSubGrupo').attr('style', strAddSubGrupo);
    $('#aRefSubGrupo').attr('style', strRefSubGrupo);
    $('#aEditSubGrupo').attr('style', strEditSubGrupo);
    $('#aDelSubGrupo').attr('style', strDelSubGrupo);
}

function disabledBotonesGrupo(boolAddGrupo, boolRefGrupo, boolEditGrupo, boolDelGrupo) {
    $('#aAddGrupo').attr('disabled', boolAddGrupo);
    $('#aRefGrupo').attr('disabled', boolRefGrupo);
    $('#aEditGrupo').attr('disabled', boolEditGrupo);
    $('#aDelGrupo').attr('disabled', boolDelGrupo);

    if (boolAddGrupo == false) $('#aAddGrupo').attr('href', 'javascript:ShowModalNewGrupo();');
    else $('#aAddGrupo').attr('href', 'javascript:;');

    if (boolRefGrupo == false) $('#aRefGrupo').attr('href', 'javascript:RefreshGrupo();');
    else $('#aRefGrupo').attr('href', 'javascript:;');

    if (boolEditGrupo == false) $('#aEditGrupo').attr('href', 'javascript:ShowModalEditGrupo();');
    else $('#aEditGrupo').attr('href', 'javascript:;');

    if (boolDelGrupo == false) $('#aDelGrupo').attr('href', 'javascript:DeleteGrupo();');
    else $('#aDelGrupo').attr('href', 'javascript:;');
}

function disabledBotonesSubGrupo(boolAddSubGrupo, boolRefSubGrupo, boolEditSubGrupo, boolDelSubGrupo) {
    $('#aAddSubGrupo').attr('disabled', boolAddSubGrupo);
    $('#aRefSubGrupo').attr('disabled', boolRefSubGrupo);
    $('#aEditSubGrupo').attr('disabled', boolEditSubGrupo);
    $('#aDelSubGrupo').attr('disabled', boolDelSubGrupo);

    if (boolAddSubGrupo)
        $('#aAddSubGrupo').attr('href', 'javascript:;');
    else
        $('#aAddSubGrupo').attr('href', 'javascript:ShowModalNewSubGrupo();');

    if (boolRefSubGrupo)
        $('#aRefSubGrupo').attr('href', 'javascript:;');
    else
        $('#aRefSubGrupo').attr('href', 'javascript:RefreshSubGrupo();');

    if (boolEditSubGrupo)
        $('#aEditSubGrupo').attr('href', 'javascript:;');
    else
        $('#aEditSubGrupo').attr('href', 'javascript:ShowModalEditSubGrupo();');

    if (boolDelSubGrupo)
        $('#aDelSubGrupo').attr('href', 'javascript:;');
    else
        $('#aDelSubGrupo').attr('href', 'javascript:DeleteSubGrupo();');
};

function NuevoGrupo() {

    $("#nuevoGrupo").remove();
    $("#btns_grupo").html("<a id='grabarModal' class='btn blue' href='javascript:;'><i class='icon-save'></i> Grabar</a> " +
                          "<a id='cancelarModal' class='btn' href='javascript:CancelarModal();'><i class='icon-remove'></i> Cancelar</a> " +
                          "<a id='nuevoGrupo' class='btn green' href='javascript:NuevoGrupo();'><i class='icon-plus'></i>&nbsp;Nuevo</a> ");
    ClearControlsModal();


    $("#MuestraModal").attr("style", "margin-top:auto; width: 720px");

    $('#cboEmpresaModal').append('<option></option>');
    $('#cboEmpresaModal').append('<option value="' + $('#hfCODE_EMPRESA').val() + '">' + $('#hfDESC_EMPRESA').val() + '</option>');

    $('#cboEmpresaModal').select2('val', $('#slcEmpresa').val());


    $('#grabarModal').html("<i class='icon-pencil'></i> Grabar");
    $('#grabarModal').attr("href", "javascript:GrabarModal();");
    $('#cancelarModal').html("<i class='icon-remove'></i> Cancelar");
    $('#myModalLabel').html('NUEVO GRUPO');
    $('#MuestraModal').modal('show');


    //LIMPIO VALIDACION
    $("#txtDescripcionModal").off("change paste keyup");
    $("#txtDescripcionModal").parents(".control-group").attr("class", "control-group")
    $("#txtDescripcionModal ~ span").remove();
    //$("#cboExistenciasModal").off("change paste keyup");
    $("#cboExistenciasModal").parents(".control-group").attr("class", "control-group")
    $("#cboExistenciasModal ~ span").remove();
}

function ShowModalNewGrupo() {


    ClearControlsModal();


    $("#MuestraModal").attr("style", "margin-top:auto; width: 720px");

    $('#cboEmpresaModal').append('<option></option>');
    $('#cboEmpresaModal').append('<option value="' + $('#hfCODE_EMPRESA').val() + '">' + $('#hfDESC_EMPRESA').val() + '</option>');

    $('#cboEmpresaModal').select2('val', $('#slcEmpresa').val());


    $('#grabarModal').html("<i class='icon-pencil'></i> Grabar");
    $('#grabarModal').attr("href", "javascript:GrabarModal();");
    $('#cancelarModal').html("<i class='icon-remove'></i> Cancelar");
    $('#myModalLabel').html('NUEVO GRUPO');
    $('#MuestraModal').modal('show');


    //LIMPIO VALIDACION
    $("#txtDescripcionModal").off("change paste keyup");
    $("#txtDescripcionModal").parents(".control-group").attr("class", "control-group")
    $("#txtDescripcionModal ~ span").remove();
    //$("#cboExistenciasModal").off("change paste keyup");
    $("#cboExistenciasModal").parents(".control-group").attr("class", "control-group")
    $("#cboExistenciasModal ~ span").remove();
}

function NuevoSubGrupo() {

    marcas = [];
    $('#cboMarca').select2();
    fillCboMarcas();
    fillTipoSistemaIsc();
    ListarTablaMarcas();

    $("#nuevoSubGrupo").remove();
    $("#btns_subgrupo").html("<a id='grabarModalSubGrupo' class='btn blue' href='javascript:;'><i class='icon-save'></i> Grabar</a>" +
                              "<a id='cancelarModalSubGrupo' class='btn' href='javascript:CancelarModal();'><i class='icon-remove'></i> Cancelar</a>");

    ClearControlsModalSubGrupo();
    //$("#MuestraModalSubGrupo").attr("style", "margin-top:auto;width:1220px; margin-left:-605px");
    $('#cboEmpresaModalSubg').append('<option></option>');
    $('#cboEmpresaModalSubg').append('<option value="' + $('#hfCODE_EMPRESA').val() + '">' + $('#hfDESC_EMPRESA').val() + '</option>');
    $('#cboEmpresaModalSubg').select2('val', $('#slcEmpresa').val());
    $("#cboEmpresaModalSubg").prop("disabled", true);

    $('#cboExistenciasSgModal').append('<option></option>');
    $('#cboExistenciasSgModal').append('<option value="' + $('#hfTIPO_EXIS').val() + '">' + $('#hfDESC_EXIS').val() + '</option>');
    $('#cboExistenciasSgModal').select2('val', $('#hfTIPO_EXIS').val());

    $('#cboGrupoModal').append('<option></option>');
    $('#cboGrupoModal').append('<option value="' + $('#hfCODE_GRUPO').val() + '">' + $('#hfDESC_GRUPO').val() + '</option>');
    $('#cboGrupoModal').select2('val', $('#hfCODE_GRUPO').val());

    
    //$('#tabla_ctas_contables').attr('style', 'display:none');
    $('#tbldinamicaCompras').attr('style', 'display:none');
    $('#tbldinamicaVentas').attr('style', 'display:none');
   
    $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Grabar");
    $('#grabarModalSubGrupo').attr("href", "javascript:GrabarModalSubGrupo();");
    $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cancelar");
    $('#cancelarModalSubGrupo').attr("href", "javascript:cancelarModalSubGrupo();");
    $('#tituloModal').html('NUEVO SUB GRUPO');
    $('#MuestraModalSubGrupo').modal('show');
}

function ShowModalNewSubGrupo() {
    marcas = [];
    $('#cboMarca').select2();
    fillCboMarcas();
    fillTipoSistemaIsc();
    ListarTablaMarcas();

    ClearControlsModalSubGrupo();
    //$("#MuestraModalSubGrupo").attr("style", "margin-top:auto;width:1220px; margin-left:-605px");
    $('#cboEmpresaModalSubg').append('<option></option>');
    $('#cboEmpresaModalSubg').append('<option value="' + $('#hfCODE_EMPRESA').val() + '">' + $('#hfDESC_EMPRESA').val() + '</option>');
    $('#cboEmpresaModalSubg').select2('val', $('#slcEmpresa').val());
    $("#cboEmpresaModalSubg").prop("disabled", true);

    $('#cboExistenciasSgModal').append('<option></option>');
    $('#cboExistenciasSgModal').append('<option value="' + $('#hfTIPO_EXIS').val() + '">' + $('#hfDESC_EXIS').val() + '</option>');
    $('#cboExistenciasSgModal').select2('val', $('#hfTIPO_EXIS').val());

    $('#cboGrupoModal').append('<option></option>');
    $('#cboGrupoModal').append('<option value="' + $('#hfCODE_GRUPO').val() + '">' + $('#hfDESC_GRUPO').val() + '</option>');
    $('#cboGrupoModal').select2('val', $('#hfCODE_GRUPO').val());
   
    $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Grabar");
    $('#grabarModalSubGrupo').attr("href", "javascript:GrabarModalSubGrupo();");
    $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cancelar");
    $('#cancelarModalSubGrupo').attr("href", "javascript:cancelarModalSubGrupo();");
    $('#tituloModal').html('NUEVO SUB GRUPO');
    $('#MuestraModalSubGrupo').modal('show');

    $('#tbldinamicaCompras').attr('style', 'display');
    $('#tbldinamicaVentas').attr('style', 'display');
    $('#txt_centro_costo').val('');
    $("#txt_centro_costo").data("CodCentroCostoCab", "");
    $("#txt_centro_costo").data("CodCentroCosto", "");

    $('#uniform-chkIscSgModal span').removeClass();
    $('#chkIscSgModal').attr('checked', false).parent().removeClass("checked");

    $('#cboTipoSistema').attr('disabled', true);
   

    fnLimpiarCuentas();

    setCheckDebeHaber();


};

function ClearControlsModal() {

    $("#nuevoGrupo").remove();
    $("#btns_grupo").html("<a id='grabarModal' class='btn blue' href='javascript:;'><i class='icon-save'></i> Grabar</a>" +
                          "<a id='cancelarModal' class='btn' href='javascript:CancelarModal();'><i class='icon-remove'></i> Cancelar</a>");

    $("#txtDescripcionModal").off("change paste keyup");
    $("#txtDescripcionModal").parents(".control-group").attr("class", "control-group")
    $("#txtDescripcionModal ~ span").remove();
    $("#cboExistenciasModal").parents(".control-group").attr("class", "control-group")
    $("#cboExistenciasModal ~ span").remove();
    $('#uniform-chkactivoModal span').removeClass().addClass("checked");
    $('#chkactivoModal').attr('checked', true).parent().addClass('checked');
    $('#cboEmpresaModal').empty();
    $('#cboExistenciasModal').select2('val', '');
    $('#txtCodigoModal').val('');
    $('#txtDescripcionModal').val('');

    $("#cboTipoSistema").parents(".control-group").attr("class", "control-group")
    $("#cboTipoSistema ~ span").remove();
    $('#cboTipoSistema').select2('val', '');

    $("#chkIscSgModal ~ span").remove();
    $('#uniform-chkIscSgModal span').removeClass().addClass("checked");
}

function ClearControlsModalSubGrupo() {

    $("#nuevoSubGrupo").remove();
    $("#txtDescSubGrupoModal").off("change paste keyup");
    $("#txtDescSubGrupoModal").parents(".control-group").attr("class", "control-group")
    $("#txtDescSubGrupoModal ~ span").remove();
    $('#uniform-chkactivoSgModal span').removeClass().addClass("checked");
    $('#chkactivoSgModal').attr('checked', true);
    $('#cboEmpresaModalSubg').empty();
    $('#cboExistenciasSgModal').empty();
    $('#cboGrupoModal').empty();
    $('#txtCodigoSgModal').val('');
    $('#txtDescSubGrupoModal').val('');
    $('#uniform-chkIscSgModal span').removeClass().addClass("checked");
    $('#chkIscSgModal').attr('checked', false);
    $("#cboTipoSistema").attr("disabled", "disabled");
}

function ClearTables(name) {
    if ($('#tbl' + name).length != 0) {
        $('#tbl' + name).remove();
    }
}

function CancelarModal() {
    HideModal();
}

function cancelarModalSubGrupo() {
    HideModalSubGrupo();
}

function HideModalSubGrupo() {
    $('#MuestraModalSubGrupo').modal('hide');
}

function setCheckDebeHaber() {
    $('#uniform-chxDebe1 span').removeClass().addClass("checked");
    $('#chxDebe1').attr('checked', true).parent().addClass("checked");
    $('#chxHaber1').attr('disabled', true);
    $('#chxDebe1').attr('disabled', true);

    $('#uniform-chxHaberv1 span').removeClass().addClass("checked");
    $('#chxHaberv1').attr('checked', true).parent().addClass("checked");
    $('#chxDebev1').attr('disabled', true);
    $('#chxHaberv1').attr('disabled', true);
}

function HideModal() {
    $('#MuestraModal').modal('hide');
}

function GrabarModal() {

    var ESTADO_IND = '';

    if ($("#chkactivoModal").is(":checked"))
        ESTADO_IND = "A";
    else
        ESTADO_IND = "I";

    if (vErrorsNotIcon(["cboExistenciasModal", "txtDescripcionModal"])) {

        Bloquear("modal");

        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=NG&DESC=" + $("#txtDescripcionModal").val() + "&CODE_EXIS=" + $("#cboExistenciasModal").val() +
                                                         "&CTLG_CODE=" + $("#cboEmpresaModal").val() + "&ESTADO_IND=" + ESTADO_IND + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {

                    Desbloquear("modal");
                    if (datos[0].CODIGO == "") {
                        alertCustom("NO SE PUEDE INSERTAR");
                    }
                    else {
                        $("#btns_grupo").html("");
                        $("#btns_grupo").html("<a id='grabarModal' class='btn blue' href='javascript:;'><i class='icon-save'></i> Grabar</a>" +
                                              "<a id='cancelarModal' class='btn' href='javascript:CancelarModal();'><i class='icon-remove'></i> Cancelar</a>" +
                                              "<a id='nuevoGrupo' class='btn green' href='javascript:NuevoGrupo();' ><i class='icon-plus'></i>&nbsp;Nuevo</a>");

                        $('#txtCodigoModal').val(datos[0].CODIGO);
                        $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
                        $('#grabarModal').attr("href", "javascript:ModificarGrupo();");
                        $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");
                        $('#myModalLabel').html('EDITAR GRUPO');
                        exito();
                        ListarGrupos();

                    }
                }
                else {
                    Desbloquear("modal");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("modal");
                alert(msg);
            }
        });
    }
};

function ShowModalEditGrupo() {

    ClearControlsModal();
    $("#MuestraModal").attr("style", "margin-top:auto; width: 720px");

    var CODE = $.trim($('#hfCODE_GRUPO').val());
    if (CODE != "") {
        $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
        $('#grabarModal').attr("href", "javascript:ModificarGrupo();");
        $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");
        
        $('#cboEmpresaModal').append('<option></option>');
        $('#cboEmpresaModal').append('<option value="' + $('#hfCODE_EMPRESA').val() + '">' + $('#hfDESC_EMPRESA').val() + '</option>');

        $('#cboEmpresaModal').select2('val', $('#slcEmpresa').val());
        $('#txtCodigoModal').val($('#hfCODE_GRUPO').val());
        $('#txtDescripcionModal').val($('#hfDESC_GRUPO').val());
        $('#cboExistenciasModal').select2('val', $('#hfTIPO_EXIS').val());
        $("#cboExistenciasModal ~ span").remove();



        if ($('#hfESTADO_IND_GRUPO').val() == "A") {
            $('#uniform-chkactivoModal span').removeClass().addClass("checked");
            $('#chkactivoModal').attr('checked', true).parent().addClass("checked");

        }
        else {
            $('#uniform-chkactivoModal span').removeClass();
            $('#chkactivoModal').attr('checked', false).parent().removeClass("checked");

        }
        $('#myModalLabel').html('EDITAR GRUPO');
        $('#MuestraModal').modal('show');

        //LIMPIO VALIDACIONES

        $("#txtDescripcionModal").off("change paste keyup");
        $("#txtDescripcionModal").parents(".control-group").attr("class", "control-group")
        $("#txtDescripcionModal ~ span").remove();
        // $("#cboExistenciasModal").off("change paste keyup");
        $("#cboExistenciasModal").parents(".control-group").attr("class", "control-group")
        $("#cboExistenciasModal ~ span").remove();

    }
}

function RefreshGrupo() {

    ListarGrupos();
}

function RefreshSubGrupo() {
    var codGrupo = $('#hfCODE_GRUPO').val();
    ListarSubGrupos(codGrupo);
}

function ModificarGrupo() {
    // var v_Niveles = parseInt($('#hfCodigoNiveles').val());

    var CODE = '';
    var CTLG_CODE = '';
    var DESC = '';
    var CODE_EXIS = '';
    var ESTADO_IND = '';
    var USUA_ID = '';


    CODE = $('#txtCodigoModal').val();
    DESC = $.trim($('#txtDescripcionModal').val());
    if ($("#chkactivoModal").is(":checked"))
    { ESTADO_IND = "A"; }
    else
    { ESTADO_IND = "I"; }
    USUA_ID = $('#ctl00_txtus').val();
    CODE_EXIS = $('#cboExistenciasModal').val();
    CTLG_CODE = $('#cboEmpresaModal').val();

    if (vErrorsNotIcon("txtDescripcionModal")) {
        Bloquear("modal");

        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=AG&CODE=" + CODE + "&DESC=" + DESC + "&CODE_EXIS=" + CODE_EXIS + "&ESTADO_IND=" + ESTADO_IND +
                                                        "&USUA_ID=" + USUA_ID + "&CTLG_CODE=" + CTLG_CODE,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {

                    Desbloquear("modal");
                    //if (datos[0].CODIGO == "LIMI") {
                    //    alertCustom("NO SE PUEDE INSERTAR(LIMITE)");
                    //}
                    //else {
                    //    $("#txtCodigoModal").val(datos[0].CODIGO);
                    $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
                    $('#grabarModal').attr("href", "javascript:ModificarGrupo();");
                    $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");
                    exito();
                    ListarGrupos();
                    //}
                }
                else {
                    Desbloquear("modal");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("modal");
                alert(msg);
            }
        });
    }
}

function ModificarSubGrupo() {
    var CODE = '';
    var CTLG_CODE = '';
    var DESC = '';
    var CODE_EXIS = '';
    var ESTADO_IND = '';
    var USUA_ID = '';

        
    if ($("#chkactivoSgModal").is(":checked"))
    { ESTADO_IND = "A"; }
    else
    { ESTADO_IND = "I"; }

    if ($("#chkIscSgModal").is(":checked")) {
        ISC_IND = "S";
        ISC_CODE = $("#cboTipoSistema").val();
        if (ISC_CODE == '') {
            infoCustom2("Seleccione el Tipo de Sistema del ISC");
            return;
        }
    } else {
        ISC_IND = "N";
        ISC_CODE = "";
    }

    if (vErrors(["txtDescSubGrupoModal"])) {
        Bloquear("MuestraModalSubGrupo");
        var detalles = "";
        for (var i = 0; i < marcas.length; i++) {
            if (i == marcas.length - 1) {
                detalles += marcas[i].CODIGO;
            }
            else {
                detalles += marcas[i].CODIGO + "|";
            }
        }

        //definicion de varible para cadena json
        var sconfigcontatot = [];

        var p_CECC = $("#txt_centro_costo").data("CodCentroCostoCab");
        var p_CECD = $("#txt_centro_costo").data("CodCentroCosto");
        if (isEmpty(p_CECC) || isEmpty(p_CECD)) {
            infoCustom2("Seleccione Centro de Costos");
            Desbloquear("MuestraModalSubGrupo");
            return;
        } else {
            if (sUsaConta === 'S' || sUsaConta === 'N') {
                //agregando comrpras
                var opecont = 'COMPRA';

                var ctasgrup = $("#cbo_cuentaCompra").val();
                if (ctasgrup === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctagrup = $("#cbo_cuentaCompra option:selected").data('ctaid');
                var dh1 = $("#chxDebe1").is(":checked") ? 'D' : $("#chxHaber1").is(":checked") ? 'H' : 'N';

                if ($("#chxDebe1").is(":checked") && $("#chxHaber1").is(":checked")) {
                    dh1 = 'N';
                }

                if (dh1 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }

                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                var impuesto = 'IGV';
                var ctaimpuesto = $("#cbo_cuentaIgv").val();
                if (ctaimpuesto === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaimp = $("#cbo_cuentaIgv option:selected").data('ctaid');
                var dh2 = $("#chxDebe2").is(":checked") ? 'D' : $("#chxHaber2").is(":checked") ? 'H' : 'N';
                if (dh2 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaMN = $("#cbo_cuentaCompraMN").val();
                if (ctaMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaMN = $("#cbo_cuentaCompraMN option:selected").data('ctaid');
                var dh3 = $("#chxDebe3").is(":checked") ? 'D' : $("#chxHaber3").is(":checked") ? 'H' : 'N';
                if (dh3 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaME = $("#cbo_cuentaCompraME").val();
                if (ctaME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaME = $("#cbo_cuentaCompraME option:selected").data('ctaid');
                var dh4 = $("#chxDebe4").is(":checked") ? 'D' : $("#chxHaber4").is(":checked") ? 'H' : 'N';
                if (dh4 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELMN = $("#cbo_cuentaCompraRelMN").val();
                if (ctaRELMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELMN = $("#cbo_cuentaCompraRelMN option:selected").data('ctaid');
                var dh5 = $("#chxDebe5").is(":checked") ? 'D' : $("#chxHaber5").is(":checked") ? 'H' : 'N';
                if (dh5 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELME = $("#cbo_cuentaCompraRelME").val();
                if (ctaRELME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELME = $("#cbo_cuentaCompraRelME option:selected").data('ctaid');
                var dh6 = $("#chxDebe6").is(":checked") ? 'D' : $("#chxHaber6").is(":checked") ? 'H' : 'N';
                if (dh6 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                */

                var sconfigconta = {};
                sconfigconta.operacion = opecont;
                sconfigconta.idctagrup = idctagrup;
                sconfigconta.ctasgrup = ctasgrup;
                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                sconfigconta.impuesto = impuesto;
                sconfigconta.idctaimp = idctaimp;
                sconfigconta.ctaimpuesto = ctaimpuesto;
                sconfigconta.idctaMN = idctaMN;
                sconfigconta.ctaMN = ctaMN;
                sconfigconta.idctaME = idctaME;
                sconfigconta.ctaME = ctaME;
                sconfigconta.idRELMN = idRELMN;
                sconfigconta.ctaRELMN = ctaRELMN
                sconfigconta.idRELME = idRELME;
                sconfigconta.ctaRELME = ctaRELME;
                sconfigconta.debehaber = (dh1 + '|' + dh2 + '|' + dh3 + '|' + dh4 + '|' + dh5 + '|' + dh6);
                */

                sconfigconta.debehaber = (dh1);
                sconfigcontatot.push(sconfigconta);

                //agregando ventas
                var opecont = 'VENTA';

                var ctasgrup = $("#cbo_cuentaVenta").val();
                if (ctasgrup === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctagrup = $("#cbo_cuentaVenta option:selected").data('ctaid');
                var dh1 = $("#chxDebev1").is(":checked") ? 'D' : $("#chxHaberv1").is(":checked") ? 'H' : 'N';

                if ($("#chxDebev1").is(":checked") && $("#chxHaberv1").is(":checked")) {
                    dh1 = 'N';
                }

                if (dh1 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                var impuesto = 'IGV';
                var ctaimpuesto = $("#cbo_cuentaIgv_venta").val();
                if (ctaimpuesto === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaimp = $("#cbo_cuentaIgv_venta option:selected").data('ctaid');
                var dh2 = $("#chxDebev2").is(":checked") ? 'D' : $("#chxHaberv2").is(":checked") ? 'H' : 'N';
                if (dh2 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaMN = $("#cbo_cuentaVentaMN").val();
                if (ctaMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaMN = $("#cbo_cuentaVentaMN option:selected").data('ctaid');
                var dh3 = $("#chxDebev3").is(":checked") ? 'D' : $("#chxHaberv3").is(":checked") ? 'H' : 'N';
                if (dh3 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaME = $("#cbo_cuentaVentaME").val();
                if (ctaME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaME = $("#cbo_cuentaVentaME option:selected").data('ctaid');
                var dh4 = $("#chxDebev4").is(":checked") ? 'D' : $("#chxHaberv4").is(":checked") ? 'H' : 'N';
                if (dh4 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELMN = $("#cbo_cuentaVentaRelMN").val();
                if (ctaRELMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELMN = $("#cbo_cuentaVentaRelMN option:selected").data('ctaid');
                var dh5 = $("#chxDebev5").is(":checked") ? 'D' : $("#chxHaberv5").is(":checked") ? 'H' : 'N';
                if (dh5 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELME = $("#cbo_cuentaVentaRelME").val();
                if (ctaRELME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELME = $("#cbo_cuentaVentaRelME option:selected").data('ctaid');
                var dh6 = $("#chxDebev6").is(":checked") ? 'D' : $("#chxHaberv6").is(":checked") ? 'H' : 'N';
                if (dh6 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                */




                var sconfigconta = {};
                sconfigconta.operacion = opecont;
                sconfigconta.idctagrup = idctagrup;
                sconfigconta.ctasgrup = ctasgrup;

                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                sconfigconta.impuesto = impuesto;
                sconfigconta.idctaimp = idctaimp;
                sconfigconta.ctaimpuesto = ctaimpuesto;
                sconfigconta.idctaMN = idctaMN;
                sconfigconta.ctaMN = ctaMN;
                sconfigconta.idctaME = idctaME;
                sconfigconta.ctaME = ctaME;
                sconfigconta.idRELMN = idRELMN;
                sconfigconta.ctaRELMN = ctaRELMN;
                sconfigconta.idRELME = idRELME;
                sconfigconta.ctaRELME = ctaRELME;
                sconfigconta.debehaber = (dh1 + '|' + dh2 + '|' + dh3 + '|' + dh4 + '|' + dh5 + '|' + dh6);
                */

                sconfigconta.debehaber = (dh1);
                sconfigcontatot.push(sconfigconta);
            }


            var data = new FormData();
            data.append("DESC", $("#txtDescSubGrupoModal").val());
            $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=ASG&CODE_EXIS=" + $("#cboExistenciasSgModal").val() +
                "&CTLG_CODE=" + $("#slcEmpresa").val() + "&ESTADO_IND=" + ESTADO_IND + "&USUA_ID=" + $('#ctl00_txtus').val() +
                "&SUBGRUP_CODE=" + $("#txtCodigoSgModal").val() + "&CODE=" + $("#hfCODE_GRUPO").val() +
                "&p_DETALLES_MARCA=" + detalles + "&sconfigconta=" + JSON.stringify(sconfigcontatot) + "&p_CECC=" + p_CECC + "&p_CECD=" + p_CECD + "&p_ISC_IND=" + ISC_IND + "&p_ISC_CODE=" + ISC_CODE,
                //contentType: "application/json;",
                //dataType: "json",
                contentType: false,
                data: data,
                processData: false,
                async: false,
                success: function (datos) {
                    if (datos[0].SUCCESS == "OK") {

                        Desbloquear("MuestraModalSubGrupo");
                        //if (datos[0].CODIGO == "LIMI") {
                        //    alertCustom("NO SE PUEDE INSERTAR(LIMITE)");
                        //}
                        //else {
                        //    $("#txtCodigoModal").val(datos[0].CODIGO);
                        $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Modificar");
                        $('#grabarModalSubGrupo').attr("href", "javascript:ModificarSubGrupo();");
                        $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cerrar");
                        $('#cancelarModalSubGrupo').attr("href", "javascript:cancelarModalSubGrupo();");
                        exito();
                        ListarSubGrupos($('#hfCODE_GRUPO').val());
                        //}
                    }
                    else {
                        if (datos[0].SUCCESS == "ERROR")
                            noexitoCustom("Problemas al actualizar el subgrupo");
                        else
                            noexitoCustom("Problemas al actualizar la configuración contable");
                        Desbloquear("MuestraModalSubGrupo");
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("MuestraModalSubGrupo");
                    noexitoCustom("Problemas al actualizar el subgrupo");
                }
            });
        }

       
    }

}

function DeleteSubGrupo() {

    var CODE = '';
    
    CODE = $('#hfCODE_SUBGRUPO').val();
    
    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=ESG&CODE=" + CODE,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos[0].MENSAJE) {

                if (datos[0].MENSAJE == "OK") {
                    //$('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
                    //$('#grabarModal').attr("href", "javascript:ModificarGrupo();");
                    //$('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");

                    exito();
                    ListarSubGrupos($('#hfCODE_GRUPO').val());

                }
                else {
                    noexitoCustom(datos[0].MENSAJE);
                }
            }
            else {
                //Desbloquear("modal");
                noexito();
            }
        },
        error: function (msg) {
            //   Desbloquear("modal");
            alert(msg);
        }
    });

}

function DeleteGrupo() {

    var CODE = '';

    CODE = $('#hfCODE_GRUPO').val();

    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=EG&CODE=" + CODE,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos[0].MENSAJE) {

                if (datos[0].MENSAJE == "OK") {
                    //$('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
                    //$('#grabarModal').attr("href", "javascript:ModificarGrupo();");
                    //$('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");

                    exito();
                    ListarGrupos();
                }
                else {
                    noexitoCustom(datos[0].MENSAJE);
                }
            }
            else {
                //Desbloquear("modal");
                noexito();
            }
        },
        error: function (msg) {
            // Desbloquear("modal");
            alert(msg);
        }
    });
};

function GrabarModalSubGrupo() {
    var ESTADO_IND = '';
    var ISC_IND = '';
    var ISC_CODE = '';

    if ($("#chkIscSgModal").is(":checked")) {
        ISC_IND = "S";
        ISC_CODE = $("#cboTipoSistema").val();
        if (ISC_CODE == '') {
            infoCustom2("Seleccione el Tipo de Sistema del ISC");
            return;
        }
    } else {
        ISC_IND = "N";
        ISC_CODE = "";
    }              
    

    if ($("#chkactivoSgModal").is(":checked"))
        ESTADO_IND = "A";
    else
        ESTADO_IND = "I";
    if (vErrorsNotIcon("txtDescSubGrupoModal")) {

        Bloquear("MuestraModalSubGrupo");
        var detalles = "";
        for (var i = 0; i < marcas.length; i++) {
            if (i == marcas.length - 1) {
                detalles += marcas[i].CODIGO;
            }
            else {
                detalles += marcas[i].CODIGO+"|";
            }
        }

        //definicion de varible para cadena json
        var sconfigcontatot = [];

        var p_CECC = $("#txt_centro_costo").data("CodCentroCostoCab");
        var p_CECD = $("#txt_centro_costo").data("CodCentroCosto");

        if (isEmpty(p_CECC) || isEmpty(p_CECD)) {
            infoCustom2("Seleccione Centro de Costos");
            Desbloquear("MuestraModalSubGrupo");
            return;
        } else {
            if (sUsaConta === 'S' || sUsaConta === 'N') {
                //agregando comrpras
                var opecont = 'COMPRA';
                var ctasgrup = $("#cbo_cuentaCompra").val();
                if (ctasgrup === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctagrup = $("#cbo_cuentaCompra option:selected").data('ctaid');
                var dh1 = $("#chxDebe1").is(":checked") ? 'D' : $("#chxHaber1").is(":checked") ? 'H' : 'N';
                if (dh1 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }

                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                var impuesto = 'IGV';
                var ctaimpuesto = $("#cbo_cuentaIgv").val();
                if (ctaimpuesto === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaimp = $("#cbo_cuentaIgv option:selected").data('ctaid');
                var dh2 = $("#chxDebe2").is(":checked") ? 'D' : $("#chxHaber2").is(":checked") ? 'H' : 'N';
                if (dh2 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaMN = $("#cbo_cuentaCompraMN").val();
                if (ctaMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaMN = $("#cbo_cuentaCompraMN option:selected").data('ctaid');
                var dh3 = $("#chxDebe3").is(":checked") ? 'D' : $("#chxHaber3").is(":checked") ? 'H' : 'N';
                if (dh3 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaME = $("#cbo_cuentaCompraME").val();
                if (ctaME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaME = $("#cbo_cuentaCompraME option:selected").data('ctaid');
                var dh4 = $("#chxDebe4").is(":checked") ? 'D' : $("#chxHaber4").is(":checked") ? 'H' : 'N';
                if (dh4 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELMN = $("#cbo_cuentaCompraRelMN").val();
                if (ctaRELMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELMN = $("#cbo_cuentaCompraRelMN option:selected").data('ctaid');
                var dh5 = $("#chxDebe5").is(":checked") ? 'D' : $("#chxHaber5").is(":checked") ? 'H' : 'N';
                if (dh5 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELME = $("#cbo_cuentaCompraRelME").val();
                if (ctaRELME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELME = $("#cbo_cuentaCompraRelME option:selected").data('ctaid');
                var dh6 = $("#chxDebe6").is(":checked") ? 'D' : $("#chxHaber6").is(":checked") ? 'H' : 'N';
                if (dh6 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (COMPRA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                */



                var sconfigconta = {};
                sconfigconta.operacion = opecont;
                sconfigconta.idctagrup = idctagrup;
                sconfigconta.ctasgrup = ctasgrup;
                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                sconfigconta.impuesto = impuesto;
                sconfigconta.idctaimp = idctaimp;
                sconfigconta.ctaimpuesto = ctaimpuesto;
                sconfigconta.idctaMN = idctaMN;
                sconfigconta.ctaMN = ctaMN;
                sconfigconta.idctaME = idctaME;
                sconfigconta.ctaME = ctaME;
                sconfigconta.idRELMN = idRELMN;
                sconfigconta.ctaRELMN = ctaRELMN;
                sconfigconta.idRELME = idRELME;
                sconfigconta.ctaRELME = ctaRELME;
                sconfigconta.debehaber = (dh1 + '|' + dh2 + '|' + dh3 + '|' + dh4 + '|' + dh5 + '|' + dh6);
                */
                sconfigconta.debehaber = (dh1);
                sconfigcontatot.push(sconfigconta);

                //agregando ventas
                var opecont = 'VENTA';
                var ctasgrup = $("#cbo_cuentaVenta").val();
                if (ctasgrup === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctagrup = $("#cbo_cuentaCompra option:selected").data('ctaid');
                var dh1 = $("#chxDebev1").is(":checked") ? 'D' : $("#chxHaberv1").is(":checked") ? 'H' : 'N';
                if (dh1 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }

                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                var impuesto = 'IGV';
                var ctaimpuesto = $("#cbo_cuentaIgv_venta").val();
                if (ctaimpuesto === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaimp = $("#cbo_cuentaIgv option:selected").data('ctaid');
                var dh2 = $("#chxDebev2").is(":checked") ? 'D' : $("#chxHaberv2").is(":checked") ? 'H' : 'N';
                if (dh2 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaMN = $("#cbo_cuentaVentaMN").val();
                if (ctaMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaMN = $("#cbo_cuentaCompraMN option:selected").data('ctaid');
                var dh3 = $("#chxDebev3").is(":checked") ? 'D' : $("#chxHaberv3").is(":checked") ? 'H' : 'N';
                if (dh3 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaME = $("#cbo_cuentaVentaME").val();
                if (ctaME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idctaME = $("#cbo_cuentaCompraME option:selected").data('ctaid');
                var dh4 = $("#chxDebev4").is(":checked") ? 'D' : $("#chxHaberv4").is(":checked") ? 'H' : 'N';
                if (dh4 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELMN = $("#cbo_cuentaVentaRelMN").val();
                if (ctaRELMN === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELMN = $("#cbo_cuentaCompraRelMN option:selected").data('ctaid');
                var dh5 = $("#chxDebev5").is(":checked") ? 'D' : $("#chxHaberv5").is(":checked") ? 'H' : 'N';
                if (dh5 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
    
                var ctaRELME = $("#cbo_cuentaVentaRelME").val();
                if (ctaRELME === "") {
                    infoCustom2("Debe elegir una cuenta contable por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                var idRELME = $("#cbo_cuentaCompraRelME option:selected").data('ctaid');
                var dh6 = $("#chxDebev6").is(":checked") ? 'D' : $("#chxHaberv6").is(":checked") ? 'H' : 'N';
                if (dh6 === "N") {
                    infoCustom2("Debe elegir una opción Debe/Haber por fila (VENTA)");
                    Desbloquear("MuestraModalSubGrupo");
                    return;
                }
                */




                var sconfigconta = {};
                sconfigconta.operacion = opecont;
                sconfigconta.idctagrup = idctagrup;
                sconfigconta.ctasgrup = ctasgrup;

                /*
                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                sconfigconta.impuesto = impuesto;
                sconfigconta.idctaimp = idctaimp;
                sconfigconta.ctaimpuesto = ctaimpuesto;
                sconfigconta.idctaMN = idctaMN;
                sconfigconta.ctaMN = ctaMN;
                sconfigconta.idctaME = idctaME;
                sconfigconta.ctaME = ctaME;
                sconfigconta.idRELMN = idRELMN;
                sconfigconta.ctaRELMN = ctaRELMN;
                sconfigconta.idRELME = idRELME;
                sconfigconta.ctaRELME = ctaRELME;
                sconfigconta.debehaber = (dh1 + '|' + dh2 + '|' + dh3 + '|' + dh4 + '|' + dh5 + '|' + dh6);
                */
                sconfigconta.debehaber = (dh1);
                sconfigcontatot.push(sconfigconta);
            }

            $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=NSG&DESC=" + $("#txtDescSubGrupoModal").val() + "&CODE_EXIS=" + $("#cboExistenciasSgModal").val() +
                "&CTLG_CODE=" + $("#slcEmpresa").val() + "&ESTADO_IND=" + ESTADO_IND + "&USUA_ID=" + $('#ctl00_txtus').val() +
                "&CODE=" + $("#cboGrupoModal").val() + "&p_DETALLES_MARCA=" + detalles + "&sconfigconta=" + JSON.stringify(sconfigcontatot) + "&p_CECC=" + p_CECC + "&p_CECD=" + p_CECD + "&p_ISC_IND=" + ISC_IND + "&p_ISC_CODE=" + ISC_CODE,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos[0].SUCCESS == "OK") {

                        Desbloquear("MuestraModalSubGrupo");
                        if (datos[0].CODIGO == "") {
                            alertCustom("NO SE PUEDE INSERTAR");
                        }
                        else {

                            var objAux = {};
                            objAux.CODIGO = "0000";
                            objAux.DESCRIPCION = "GENERICO";
                            marcas.push(objAux);
                            ListarTablaMarcas();

                            $('#txtCodigoSgModal').val(datos[0].CODIGO);
                            $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Modificar");
                            $('#grabarModalSubGrupo').attr("href", "javascript:ModificarSubGrupo();");
                            $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cerrar");
                            $('#tituloModal').html('EDITAR SUB GRUPO');
                            exito();

                            $("#btns_subgrupo").append("<a id='nuevoSubGrupo' class='btn green' href='javascript:NuevoSubGrupo();' ><i class='icon-plus'></i>&nbsp;Nuevo</a>");
                            ListarSubGrupos($('#hfCODE_GRUPO').val());
                        }
                    }
                    else {
                        if (datos[0].SUCCESS == "ERROR")
                            noexitoCustom("Problemas al insertar el subgrupo");
                        else
                            noexitoCustom("Problemas al insertar la configuración contable");
                        Desbloquear("MuestraModalSubGrupo");
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("MuestraModalSubGrupo");
                    noexitoCustom("Problemas al insertar el subgrupo");
                }
            });
        }

        
    }
}

function ShowModalEditSubGrupo() {

    ClearControlsModalSubGrupo();
    //$("#MuestraModalSubGrupo").attr("style", "margin-top:auto;width:1220px; margin-left:-605px");    

    var CODE = $.trim($('#hfCODE_SUBGRUPO').val());
    if (CODE != "") {
        fillTipoSistemaIsc();

        $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Modificar");
        $('#grabarModalSubGrupo').attr("href", "javascript:ModificarSubGrupo();");
        $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cerrar");
        $('#cancelarModalSubGrupo').attr("href", "javascript:cancelarModalSubGrupo();");
        
        $('#tbldinamicaCompras').attr('style', 'display');
        $('#tbldinamicaVentas').attr('style', 'display');        
        

        $('#cboGrupoModal').append('<option></option>');
        $('#cboGrupoModal').append('<option value="' + $('#hfCODE_GRUPO').val() + '">' + $('#hfDESC_GRUPO').val() + '</option>');
        $('#cboGrupoModal').select2('val', $('#hfCODE_GRUPO').val());


        $('#cboExistenciasSgModal').append('<option></option>');
        $('#cboExistenciasSgModal').append('<option value="' + $('#hfTIPO_EXIS').val() + '">' + $('#hfDESC_EXIS').val() + '</option>');
        $('#cboExistenciasSgModal').select2('val', $('#hfTIPO_EXIS').val());


        $('#cboEmpresaModalSubg').append('<option></option>');
        $('#cboEmpresaModalSubg').append('<option value="' + $('#hfCODE_EMPRESA').val() + '">' + $('#hfDESC_EMPRESA').val() + '</option>');
        $('#cboEmpresaModalSubg').select2('val', $('#hfCODE_EMPRESA').val());
        $("#cboEmpresaModalSubg").prop("disabled", true);


        $('#txtCodigoSgModal').val($('#hfCODE_SUBGRUPO').val());
        $('#txtDescSubGrupoModal').val($('#hfDESC_SUBGRUPO').val());
        $('#txt_centro_costo').val($('#hfCODE_SUBGRUPO_CECO').val());
        $("#txt_centro_costo").data("CodCentroCostoCab", $('#hfCECC').val());
        $("#txt_centro_costo").data("CodCentroCosto", $('#hfCECD').val());

        fnLimpiarCuentas();
                
        //listado de configuracion de cuentas y operaciones
        ListarCtasSgrup('COMPRA', CODE,'');
        ListarCtasSgrup('VENTA', CODE,'');
        

        if ($('#hfESTADO_IND_SUBGRUPO').val() == "Activo") {
            $('#uniform-chkactivoSgModal span').removeClass().addClass("checked");
            $('#chkactivoSgModal').attr('checked', true);

        }
        else {
            $('#uniform-chkactivoSgModal span').removeClass();
            $('#chkactivoSgModal').attr('checked', false);

        }
        $('#tituloModal').html('EDITAR SUB GRUPO');
        $('#MuestraModalSubGrupo').modal('show');

        setCheckDebeHaber();

        $('#chxHaber1').attr('disabled', true);
        $('#chxDebe1').attr('disabled', true);

        $('#chxHaberv1').attr('disabled', true);
        $('#chxDebev1').attr('disabled', true);
        

        if ($('#hfISC_IND').val() == 'N') {
            $('#uniform-chkIscSgModal span').removeClass();
            $('#chkIscSgModal').attr('checked', false).parent().removeClass("checked");
            $("#cboTipoSistema").attr('disabled', true);
        } else if ($('#hfISC_IND').val() == 'S') {
            $('#uniform-chkIscSgModal span').removeClass().addClass("checked");
            $('#chkIscSgModal').attr('checked', true).parent().addClass('checked');
            $("#cboTipoSistema").attr('disabled', false);
        }

        if ($('#hfISC_CODE').val() !== '0' && $('#hfISC_CODE').val().length === 4) {
            $("#cboTipoSistema").select2('val', $('#hfISC_CODE').val());
            $("#cboTipoSistema").attr('disabled', false);
        } else {
            $("#cboTipoSistema").select2('val', '');
            $("#cboTipoSistema").attr('disabled', true);
        }
    }
    
    $('#cboMarca').select2();
    fillCboMarcas();    
    CargarMarcasSubgrupo();
    ListarTablaMarcas();
}

var fnLimpiarCuentas = function () {
    $("#cbo_cuentaCompra").val("").change();

    $('#uniform-chxDebe1 span').removeClass();
    $('#chxDebe1').attr('checked', false);
    $('#chxDebe1').change();

    $('#uniform-chxHaber1 span').removeClass();
    $('#chxHaber1').attr('checked', false);
    $('#chxHaber1').change();
    
    // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
    //$("#cbo_cuentaIgv").val("").change();

    //$('#uniform-chxDebe2 span').removeClass();
    //$('#chxDebe2').attr('checked', false);
    //$('#chxDebe2').change();

    //$('#uniform-chxHaber2 span').removeClass();
    //$('#chxHaber2').attr('checked', false);
    //$('#chxHaber2').change();

    //$("#cbo_cuentaCompraMN").val("").change();

    //$('#uniform-chxDebe3 span').removeClass();
    //$('#chxDebe3').attr('checked', false);
    //$('#chxDebe3').change();

    //$('#uniform-chxHaber3 span').removeClass();
    //$('#chxHaber3').attr('checked', false);
    //$('#chxHaber3').change();
    
    //$("#cbo_cuentaCompraME").val("").change();

    //$('#uniform-chxDebe4 span').removeClass();
    //$('#chxDebe4').attr('checked', false);
    //$('#chxDebe4').change();

    //$('#uniform-chxHaber4 span').removeClass();
    //$('#chxHaber4').attr('checked', false);
    //$('#chxHaber4').change();

    //$("#cbo_cuentaCompraRelMN").val("").change();

    //$('#uniform-chxDebe5 span').removeClass();
    //$('#chxDebe5').attr('checked', false);
    //$('#chxDebe5').change();

    //$('#uniform-chxHaber5 span').removeClass();
    //$('#chxHaber5').attr('checked', false);
    //$('#chxHaber5').change();

    //$("#cbo_cuentaCompraRelME").val("").change();

    //$('#uniform-chxDebe6 span').removeClass();
    //$('#chxDebe6').attr('checked', false);
    //$('#chxDebe6').change();

    //$('#uniform-chxHaber6 span').removeClass();
    //$('#chxHaber6').attr('checked', false);
    //$('#chxHaber6').change();


    $("#cbo_cuentaVenta").val("").change();

    $('#uniform-chxDebev1 span').removeClass();
    $('#chxDebev1').attr('checked', false);
    $('#chxDebev1').change();

    $('#uniform-chxHaberv1 span').removeClass();
    $('#chxHaberv1').attr('checked', false);
    $('#chxHaberv1').change();

    // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
    //$("#cbo_cuentaIgv_venta").val("").change();

    //$('#uniform-chxDebev2 span').removeClass();
    //$('#chxDebev2').attr('checked', false);
    //$('#chxDebev2').change();

    //$('#uniform-chxHaberv2 span').removeClass();
    //$('#chxHaberv2').attr('checked', false);
    //$('#chxHaberv2').change();

    //$("#cbo_cuentaVentaMN").val("").change();

    //$('#uniform-chxDebev3 span').removeClass();
    //$('#chxDebev3').attr('checked', false);
    //$('#chxDebev3').change();

    //$('#uniform-chxHaberv3 span').removeClass();
    //$('#chxHaberv3').attr('checked', false);
    //$('#chxHaberv3').change();

    //$("#cbo_cuentaVentaME").val("").change();

    //$('#uniform-chxDebev4 span').removeClass();
    //$('#chxDebev4').attr('checked', false);
    //$('#chxDebev4').change();

    //$('#uniform-chxHaberv4 span').removeClass();
    //$('#chxHaberv4').attr('checked', false);
    //$('#chxHaberv4').change();

    //$("#cbo_cuentaVentaRelMN").val("").change();

    //$('#uniform-chxDebev5 span').removeClass();
    //$('#chxDebev5').attr('checked', false);
    //$('#chxDebev5').change();

    //$('#uniform-chxHaberv5 span').removeClass();
    //$('#chxHaberv5').attr('checked', false);
    //$('#chxHaberv5').change();

    //$("#cbo_cuentaVentaRelME").val("").change();

    //$('#uniform-chxDebev6 span').removeClass();
    //$('#chxDebev6').attr('checked', false);
    //$('#chxDebev6').change();

    //$('#uniform-chxHaberv6 span').removeClass();
    //$('#chxHaberv6').attr('checked', false);
    //$('#chxHaberv6').change();
};

function ListarCtasSgrup(OPERACION, CODE, PROD_CODE)
{
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/NMMFPRO.ashx?OPCION=LSCONT&p_OPERACION=" + OPERACION + "&SUBGRUP_CODE=" + CODE + "&p_PROD_CODE=" + PROD_CODE,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            
            if (!isEmpty(datos)) {
                switch (OPERACION) {
                    case "COMPRA":
                        {
                            $("#cbo_cuentaCompra").val(datos[0].ctasgrup).change();
                            if (datos[0].debhab_stasgrup == 'D') {
                                $('#uniform-chxDebe1 span').removeClass().addClass("checked");
                                $('#chxDebe1').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_stasgrup == 'H') {
                                $('#uniform-chxHaber1 span').removeClass().addClass("checked");
                                $('#chxHaber1').attr('checked', true).parent().addClass("checked");
                            }

                            /*
                            // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                            $("#cbo_cuentaIgv").val(datos[0].ctaimpuesto).change();
                            if (datos[0].debhab_ctaimpuesto == 'D') {
                                $('#uniform-chxDebe2 span').removeClass().addClass("checked");
                                $('#chxDebe2').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaimpuesto == 'H') {
                                $('#uniform-chxHaber2 span').removeClass().addClass("checked");
                                $('#chxHaber2').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraMN").val(datos[0].ctaopemn).change();
                            if (datos[0].debhab_ctaopemn == 'D') {
                                $('#uniform-chxDebe3 span').removeClass().addClass("checked");
                                $('#chxDebe3').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaopemn == 'H') {
                                $('#uniform-chxHaber3 span').removeClass().addClass("checked");
                                $('#chxHaber3').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraME").val(datos[0].ctaopeme).change();
                            if (datos[0].debhab_ctaopeme == 'D') {
                                $('#uniform-chxDebe4 span').removeClass().addClass("checked");
                                $('#chxDebe4').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaopeme == 'H') {
                                $('#uniform-chxHaber4 span').removeClass().addClass("checked");
                                $('#chxHaber4').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraRelMN").val(datos[0].ctaoperelmn).change();
                            if (datos[0].debhab_ctaoperelmn == 'D') {
                                $('#uniform-chxDebe5 span').removeClass().addClass("checked");
                                $('#chxDebe5').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaoperelmn == 'H') {
                                $('#uniform-chxHaber5 span').removeClass().addClass("checked");
                                $('#chxHaber5').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaCompraRelME").val(datos[0].ctaoperelme).change();
                            if (datos[0].debhab_ctaoperelme == 'D') {
                                $('#uniform-chxDebe6 span').removeClass().addClass("checked");
                                $('#chxDebe6').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaoperelme == 'H') {
                                $('#uniform-chxHaber6 span').removeClass().addClass("checked");
                                $('#chxHaber6').attr('checked', true).parent().addClass("checked");
                            }
                            */

                        }; break;
                    case "VENTA":
                        {
                            $("#cbo_cuentaVenta").val(datos[0].ctasgrup).change();
                            if (datos[0].debhab_stasgrup == 'D') {
                                $('#uniform-chxDebev1 span').removeClass().addClass("checked");
                                $('#chxDebev1').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_stasgrup == 'H') {
                                $('#uniform-chxHaberv1 span').removeClass().addClass("checked");
                                $('#chxHaberv1').attr('checked', true).parent().addClass("checked");
                            }

                            /*
                            // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                            $("#cbo_cuentaIgv_venta").val(datos[0].ctaimpuesto).change();
                            if (datos[0].debhab_ctaimpuesto == 'D') {
                                $('#uniform-chxDebev2 span').removeClass().addClass("checked");
                                $('#chxDebev2').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaimpuesto == 'H') {
                                $('#uniform-chxHaberv2 span').removeClass().addClass("checked");
                                $('#chxHaberv2').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaMN").val(datos[0].ctaopemn).change();
                            if (datos[0].debhab_ctaopemn == 'D') {
                                $('#uniform-chxDebev3 span').removeClass().addClass("checked");
                                $('#chxDebev3').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaopemn == 'H') {
                                $('#uniform-chxHaberv3 span').removeClass().addClass("checked");
                                $('#chxHaberv3').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaME").val(datos[0].ctaopeme).change();
                            if (datos[0].debhab_ctaopeme == 'D') {
                                $('#uniform-chxDebev4 span').removeClass().addClass("checked");
                                $('#chxDebev4').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaopeme == 'H') {
                                $('#uniform-chxHaberv4 span').removeClass().addClass("checked");
                                $('#chxHaberv4').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaRelMN").val(datos[0].ctaoperelmn).change();
                            if (datos[0].debhab_ctaoperelmn == 'D') {
                                $('#uniform-chxDebev5 span').removeClass().addClass("checked");
                                $('#chxDebev5').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaoperelmn == 'H') {
                                $('#uniform-chxHaberv5 span').removeClass().addClass("checked");
                                $('#chxHaberv5').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaVentaRelME").val(datos[0].ctaoperelme).change();
                            if (datos[0].debhab_ctaoperelme == 'D') {
                                $('#uniform-chxDebev6 span').removeClass().addClass("checked");
                                $('#chxDebev6').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaoperelme == 'H') {
                                $('#uniform-chxHaberv6 span').removeClass().addClass("checked");
                                $('#chxHaberv6').attr('checked', true).parent().addClass("checked");
                            }
                            */
                        }; break;
                    default:

                }
            }
            else {
                switch (OPERACION) {
                    case "COMPRA":
                        {
                            if ($("#chxDebe1").is(":checked") || $("#chxHaber1").is(":checked")) {
                                $('#uniform-chxDebe1 span').removeClass();
                                $('#chxDebe1').attr('checked', false);
                                $('#uniform-chxHaber1 span').removeClass();
                                $('#chxHaber1').attr('checked', false);

                                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                                //$('#uniform-chxDebe2 span').removeClass();
                                //$('#chxDebe2').attr('checked', false);
                                //$('#uniform-chxHaber2 span').removeClass();
                                //$('#chxHaber2').attr('checked', false);
                                //$('#uniform-chxDebe3 span').removeClass();
                                //$('#chxDebe3').attr('checked', false);
                                //$('#uniform-chxHaber3 span').removeClass();
                                //$('#chxHaber3').attr('checked', false);
                                //$('#uniform-chxDebe4 span').removeClass();
                                //$('#chxDebe4').attr('checked', false);
                                //$('#uniform-chxHaber4 span').removeClass();
                                //$('#chxHaber4').attr('checked', false);
                                //$('#uniform-chxDebe5 span').removeClass();
                                //$('#chxDebe5').attr('checked', false);
                                //$('#uniform-chxHaber5 span').removeClass();
                                //$('#chxHaber5').attr('checked', false);
                                //$('#uniform-chxDebe6 span').removeClass();
                                //$('#chxDebe6').attr('checked', false);
                                //$('#uniform-chxHaber6 span').removeClass();
                                //$('#chxHaber6').attr('checked', false);
                            }
                        }; break;
                    case "VENTA":
                        {
                            if ($("#chxDebev1").is(":checked") || $("#chxHaberv1").is(":checked")) {
                                $('#uniform-chxDebev1 span').removeClass();
                                $('#chxDebve1').attr('checked', false);
                                $('#uniform-chxHaberv1 span').removeClass();
                                $('#chxHaberv1').attr('checked', false);

                                // Deshabilita configuración cuentas contables - EALFARO (14/02/2018)
                                //$('#uniform-chxDebev2 span').removeClass();
                                //$('#chxDebev2').attr('checked', false);
                                //$('#uniform-chxHaberv2 span').removeClass();
                                //$('#chxHaberv2').attr('checked', false);
                                //$('#uniform-chxDebev3 span').removeClass();
                                //$('#chxDebev3').attr('checked', false);
                                //$('#uniform-chxHaberv3 span').removeClass();
                                //$('#chxHaberv3').attr('checked', false);
                                //$('#uniform-chxDebev4 span').removeClass();
                                //$('#chxDebev4').attr('checked', false);
                                //$('#uniform-chxHaberv4 span').removeClass();
                                //$('#chxHaberv4').attr('checked', false);
                                //$('#uniform-chxDebev5 span').removeClass();
                                //$('#chxDebev5').attr('checked', false);
                                //$('#uniform-chxHaberv5 span').removeClass();
                                //$('#chxHaberv5').attr('checked', false);
                                //$('#uniform-chxDebev6 span').removeClass();
                                //$('#chxDebev6').attr('checked', false);
                                //$('#uniform-chxHaberv6 span').removeClass();
                                //$('#chxHaberv6').attr('checked', false);
                            }
                        }; break;
                    default:
                }        
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
};

// MARCAS
var marcas = [];
function fillCboMarcas() {
    Bloquear($($("#cboMarca").parents("div")[0]).attr("id"));
    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmgmar.ashx?OPCION=L&CODE=&ESTADO_IND=A",
        async: true,
        success: function (datos) {
            Desbloquear($($("#cboMarca").parents("div")[0]).attr("id"));
            $('#cboMarca').empty();
            $('#cboMarca').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    if (datos[i].CODIGO != "0000") {
                        $('#cboMarca').append('<option value="' + datos[i].CODIGO + '">' + datos[i].MARCA + '</option>');
                    }
                }
            }
            $('#cboMarca').select2('val', '');
        },
        error: function (msg) {
            Desbloquear($($("#cboMarca").parents("div")[0]).attr("id"));
            alertCustom("Marcas no se listaron correctamente");
        }
    });
};

function fillTipoSistemaIsc() {
    Bloquear($($("#cboTipoSistema").parents("div")[0]).attr("id"));
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/NMMFPRO.ashx?OPCION=LISC",       
        async: false,
        success: function (datos) {
            Desbloquear($($("#cboTipoSistema").parents("div")[0]).attr("id"));
            $('#cboTipoSistema').empty();
            $('#cboTipoSistema').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboTipoSistema').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboTipoSistema').select2('val', '');
        },
        error: function (msg) {
            Desbloquear($($("#cboTipoSistema").parents("div")[0]).attr("id"));
            alertCustom("Tipos de Sistema del ISC no se listaron correctamente");
        }
    });

}

function AgregarMarca() {
    if (vErrors(['cboMarca'])) {
        var objAux = {};
        objAux.CODIGO = $("#cboMarca").val();
        objAux.DESCRIPCION = $("#cboMarca :selected").html();

        if (ValidarMarcaAgregada(objAux) == -1) {
            marcas.push(objAux);
            ListarTablaMarcas();
        }
        else {
            alertCustom("La marca seleccionada ya ha sido agregada")
        }
    }
}

function EliminarMarca(code) {    
    var detallesNuevo = [];
    for (var i = 0; i < marcas.length; i++) {
        if (marcas[i].CODIGO == code) {
            marcas.splice(i, 1);
        }
    }
    for (var i = 0; i < marcas.length; i++) {  
        detallesNuevo.push(marcas[i]);
    }
    marcas.splice(0, marcas.length);
    marcas = detallesNuevo;
    ListarTablaMarcas();
}

function CargarMarcasSubgrupo() {   
    
    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/NMMGMAR.ashx?OPCION=6&SUBGRUP_CODE=" + $("#txtCodigoSgModal").val(),
        async: false,
        success: function (datos) {                    
            if (datos != null) {
                marcas = [];
                for (var i = 0; i < datos.length; i++) {
                    var objAux = {};
                    objAux.CODIGO = datos[i].CODIGO;
                    objAux.DESCRIPCION = datos[i].DESCRIPCION;
                    marcas.push(objAux);
                    ListarTablaMarcas();
                }
            }          
        },
        error: function (msg) {
            alertCustom("Marcas de subgrupo no se listaron correctamente");
        }
    });
}

function ListarTablaMarcas() {
    var res = "";
    res = '<table id="divTblDetalles" class="table" style="width: 100%; border: 1px solid #cbcbcb;" cellpadding="8px">'
    res += '<thead style="background-color: #8C9CB7; text-align: center; color: #ffffff;">'
    res += '<tr align="center">'
    res += '<th style="text-align:center">CÓDIGO</th>'
    res += '<th style="text-align:center">MARCA</th>'
    res += '<th style="text-align:center">#</th>'
    res += '</tr>'
    res += '</thead>'
    res += '<tbody>'
    var x = "";
    if (marcas.length > 0) {
        for (var i = 0; i < marcas.length; i++) {
            res += '<tr id="' + marcas[i].CODIGO + '">'
            res += '<td style="text-align:center">' + marcas[i].CODIGO + '</td>'
            res += '<td style="text-align:center">' + marcas[i].DESCRIPCION + '</td>'
            if (marcas[i].CODIGO!="0000") {
                res += '<td style="text-align:center"><a href="javascript:EliminarMarca(\'' + marcas[i].CODIGO + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
            } else {
                res += '<td></td>'
            }
            res += '</tr>'
        }
    } else {
        res += '<tr><td colspan="3"></td></tr>';
    }
    res += '</tbody>'
    res += '</table>'
    $("#divTblDetalles").html(res);
}

function ValidarMarcaAgregada(obj) {
    for (var i = 0; i < marcas.length; i++) {
        if (marcas[i].CODIGO == obj.CODIGO) {
            return i;
        }
    }
    return -1;
}

// FIN MARCAS
var NMLFPRO = function () {

    var plugins = function () {
        $('#cboempresa').select2();
    }

    var fillslcEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboempresa').empty();
                $('#cboempresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboempresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboempresa').select2('val', $('#ctl00_hddctlg').val());
                $('#cboempresa').change();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventos = function () {
        $('#cboempresa').on('change', function () {
            ListarTotalGrupos();
        });
    }

    var CargaInicial = function () {

        ListarTotalGrupos();

    }

    return {
        init: function () {
            plugins();
            fillslcEmpresa();
            CargaInicial();
            eventos();
        }
    };
}();

function ListarTotalGrupos() {

    $.ajax({
        type: "POST",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=20&CTLG_CODE=" + $('#cboempresa').val(),
        async: false,
        success: function (datos) {

            $("#table").html(datos);

            var oTablaGrupos = $("#tblgru_subgru").dataTable({
                "oLanguage": {
                    "sEmptyTable": "No hay datos disponibles en la tabla.",
                    "sZeroRecords": "No hay datos disponibles en la tabla."
                }
            });
            oTablaGrupos.fnSetColumnVis(4, false, true);

            $('#tblgru_subgru tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    oTablaGrupos.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');

                    var pos = oTablaGrupos.fnGetPosition(this);
                    var row = oTablaGrupos.fnGetData(pos);
                    var codigo;
                    var tipo = row[2].charAt(0);
                    if (tipo == "S") {
                        codigo = row[4];
                        var subgrup = row[0];
                        window.location.href = "?f=nmmfpro&codigo=" + codigo + "&s=" + subgrup;
                    } else {
                        codigo = row[0];
                        window.location.href = "?f=nmmfpro&codigo=" + codigo;
                    }
                    //window.open("?f=nmmfpro&codigo=" + codigo + "&t=" + tipo, '_blank');                   
                }
            });
        },
        error: function (msg) {
            MostrarError(msg);
        }
    });

}
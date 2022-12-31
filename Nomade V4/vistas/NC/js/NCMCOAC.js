// Variables globales
var control_actividad = '';
var control_modificar = false;

var NCMCOAC = function () {

    var plugins = function () {
        // General
        $("#cboEmpresa, #cboEstablecimiento, #cboActividad").select2();        

        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();        

        // Compras
        //$("#cboTipoDocumentoC, #cboVendedorC").select2();
        $("#cboTipoDocumentoC").select2();

        //$("#txtSerieC").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#txtDocumentoC").inputmask({ "mask": "9", "repeat": 9, "greedy": false });      
       
        $('#txtFechaEmisionC').datepicker();
        $('#txtFechaVencimientoC').datepicker();

        // Ventas
        $("#cboVendedorV").select2();       

        $('#txtFechaEmisionV').datepicker();
        $('#txtFechaVencimientoV').datepicker();

        // Gastos
        $("#cboTipoDocumentoG").select2();

        //$("#txtSerieG").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#txtDocumentoG").inputmask({ "mask": "9", "repeat": 9, "greedy": false });

        $('#txtFechaEmisionG').datepicker();
        $('#txtFechaVencimientoG').datepicker();
        $('#txtFechaDetraG').datepicker();
        $("#cboPeriodoG").select2();

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
                    fillCboVendedor();
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());              

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {                
                console.log("ListaEmpresas");
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
                console.log("ListaEstablecimientos");

            }
        });
    };

    var fillCboActividad = function () {        

        var options = ["COMPRAS", "VENTAS", "GASTOS"];

        var selectActividad = $("#cboActividad");

        if ($("#cboEmpresa").val() !== "" && $("#cboEstablecimiento").val() !== "") {
            for (var i = 0; i < options.length; i++) {
                selectActividad.append('<option value="' + (i + 1) + '">' + options[i] + '</option>');
            }  
            selectActividad.select2('val', 1);
            loadSection('1');
            control_actividad = 1;
            reset();
        } else {
            selectActividad.empty();
            selectActividad.append('<option></option>');
            $('#cboEmpresa').select2('val', '');
        }

    }

    function fillCboVendedor (ctlg, scsl, estado, bAsync) {
        ctlg = $("#cboEmpresa").val()
        scsl = $("#cboEstablecimiento").val()
        estado = "";
        bAsync = true;
        if (bAsync == undefined) {
            bAsync = true;
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" + "&CTLG=" + ctlg + "&SCSL=" + scsl + "&p_ESTADO_IND=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: bAsync,
            success: function (datos) {
                $('#cboVendedorV').empty();
                $('#cboVendedorV').append('<option></option>');

                //$('#cboVendedorC').empty();
                //$('#cboVendedorC').append('<option></option>');

                if (datos != null) {
                    var f = true;
                    var f2 = true;
                    var options = "";
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO == 'A' && f) {
                            options += '<optgroup label="ACTIVOS">';
                            f &= 0;
                        }
                        if (datos[i].ESTADO == 'I' && f2) {
                            if (f) options += '</optgroup>';
                            options += '<optgroup label="INACTIVOS" >';
                            f2 &= 0;
                        }
                        options += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                    }
                    options += '</optgroup>';
                }

                $('#cboVendedorV').append(options);
                //$('#cboVendedorC').append(options);

            },
            error: function (msg) {
                alertCustom("Vendedores no se listaron correctamente.");
            }
        });
    }

    var fillcboTipoDocCompra = function (opcion) {

        var select = $('#cboTipoDocumentoC'); 

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                select.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar documentos de registro');
            }
        });

        $(select).select2();
    }

    var fillCboPeriodo = function () {

        var select = $("#cboPeriodoG");

        if ($("#cboEmpresa").val() != null || $("#cboEmpresa").val() !== "") {
            $.ajax({
                type: "post",
                url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=98&p_CTLG_CODE=" + $("#cboEmpresa").val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    select.empty();
                    select.append('<option value="T">TODOS</option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            select.append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                        }
                        select.select2("val", "T");

                    } else {
                        alertCustom("Error cargar periodo")
                    }
                },
                error: function (msg) {
                    alertCustom("Error cargar periodo");
                }
            });
        }
        
    }

    function mostrarModalBusDoc() {

        var select_actividad = $("#cboActividad").val();

        if (control_actividad === 1 && select_actividad === '1') {
            $(".tituloModal").html("LISTA DE DOCUMENTOS DE COMPRAS");            
            buscarDocumentoCompra();
        } else if (control_actividad === 2 && select_actividad === '2') {
            $(".tituloModal").html("LISTA DE DOCUMENTOS DE VENTAS");
            buscarDocumentoVenta();
        } else if (control_actividad === 3 && select_actividad === '3') {
            $(".tituloModal").html("LISTA DE DOCUMENTOS DE GASTOS");
            buscarDocumentoGasto();
        } else {
            $(".tituloModal").html("");
            infoCustom('Seleccione nuevamente la actividad');
            $("#cboActividad").empty();
            fillCboActividad();
        }

    }

    var buscarDocumentoCompra = function () {        

        var tipo_actividad = parseInt($('#cboActividad :selected').val());

        if (control_actividad === tipo_actividad) {           

            var dataFields = ["cboEmpresa", "cboEstablecimiento", "cboActividad", "txtDesde", "txtHasta"];

            if (vErrors(dataFields)) { 

                $('#tblDocumentosCompra').DataTable().destroy();
                var tbody = $('#tblDocumentosCompra').find('tbody');

                Bloquear("ventana"); 
                control_modificar = false;

                $.ajax({
                    type: 'post',
                    url: 'vistas/nc/ajax/NCMCOAC.ashx?OPCION=LDOCS&CTLG_CODE=' + $("#cboEmpresa").val() + '&SCSL_CODE=' + $("#cboEstablecimiento").val() + '&TIPO_ACT=' + $('#cboActividad :selected').val() + '&F_DESDE=' + $("#txtDesde").val() + '&F_HASTA=' + $("#txtHasta").val(),
                    contenttype: 'application/json',
                    datatype: 'json',
                    async: true
                }).done(function (datos) {                   
                    Desbloquear("ventana");
                    tbody.html('');
                    tbody.unbind('click');                    
                    if (datos.length > 0) {

                        control_modificar = true;

                        tabla = $('#tblDocumentosCompra').DataTable({
                            info: false, responsive: true, order: [[0, 'desc']],
                            data: datos,
                            columns: [
                                { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'NUM_DCTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '20%' },
                                { data: 'EMISION', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'VENCIMIENTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'RAZON_SOCIAL', createdCell: function (cell) { }, width: '15%' },
                                //{ data: 'NOMBRE_EMPLEADO', createdCell: function (cell) { }, width: '25%' },
                                { data: 'COMPLETO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '25%' }
                            ]
                        });

                        $(tbody).css('cursor', 'pointer');
                        $('#tblDocumentosCompra_wrapper').find(':last').remove();

                        tbody.on('click', 'tr', function () {

                            $('#data_transaction').empty();
                            
                            $(this).addClass('selected');
                            var dcto = tabla.row(this).data();
                            var cod_doc = dcto.CODIGO;
                            var tipo_doc = dcto.TIPO_DCTO;
                            var fecha_emision = dcto.EMISION;
                            var fecha_vencimiento = dcto.VENCIMIENTO;
                            var pidm_vendedor = dcto.PIDM;
                            var usuario = dcto.USUARIO;                            

                            if (cod_doc.length !== 0) {

                                clearFields("compras");
                                
                                $('<input/>', {
                                    'id': 'txtCodigoCompra',
                                    'type': 'hidden',
                                    'value': cod_doc
                                }).appendTo('#data_transaction');

                                var nro_doc = dcto.NUM_DCTO.split('-');
                                if (nro_doc.length > 2) {
                                    var serie = nro_doc[0] + '-' + nro_doc[1];
                                    var nro = nro_doc[2];
                                } else if (nro_doc.length > 1) {
                                    var serie = nro_doc[0];
                                    var nro = nro_doc[1];
                                } else {
                                    serie = '';
                                    nro = nro_doc[0];
                                }

                                $("#txtSerieC").val(serie);
                                $("#txtDocumentoC").val(nro);
                                $("#cboTipoDocumentoC").select2("val", tipo_doc);
                                //$("#cboVendedorC").select2("val", pidm_vendedor);
                                //if (usuario !== $('#cboVendedorC :selected').attr('usuario')) {
                                //    $("#cboVendedorC").select2("val", "");
                                //}
                                $("#txtFechaEmisionC").val(fecha_emision);
                                $("#txtFechaVencimientoC").val(fecha_vencimiento);

                                enabledFields([
                                    $("#cboTipoDocumentoC"),
                                    $("#txtSerieC"),
                                    $("#txtDocumentoC"),
                                    //$("#cboVendedorC"),
                                    $("#txtFechaEmisionC"),
                                    $("#txtFechaVencimientoC")
                                ]);                               

                            }                            

                            $("#modalDocumentoCompra").modal("hide");

                        });

                        $("#modalDocumentoCompra").modal("show");

                        if ($("#modalDocumentoCompra").hasClass('in') == true) {
                            $('#tblDocumentosCompra_filter.dataTables_filter input[type=search]').focus();
                        }
                        $('#modalDocumentoCompra').on('shown.bs.modal', function () {
                            $('#tblDocumentosCompra_filter.dataTables_filter input[type=search]').focus();
                        });

                    } else {
                        control_modificar = false;
                        $('#tblDocumentosCompra').DataTable({
                            info: false, responsive: true, order: [[0, 'desc']], data: []
                        });
                        infoCustom('No existen documentos con el filtro buscado.');
                    }
               }).error(function (datos) {
                   control_modificar = false;
                   Desbloquear("ventana");
                   alertCustom('Error al listar documentos de compras.');
               });
            }
        }        

    }

    var buscarDocumentoVenta = function () {

        var tipo_actividad = parseInt($('#cboActividad :selected').val());

        if (control_actividad === tipo_actividad) {

            var dataFields = ["cboEmpresa", "cboEstablecimiento", "cboActividad", "txtDesde", "txtHasta"];

            if (vErrors(dataFields)) {

                $('#tblDocumentosVenta').DataTable().destroy();
                var tbody = $('#tblDocumentosVenta').find('tbody');

                Bloquear("ventana");
                control_modificar = false;

                $.ajax({
                    type: 'post',
                    url: 'vistas/nc/ajax/NCMCOAC.ashx?OPCION=LDOCS&CTLG_CODE=' + $("#cboEmpresa").val() + '&SCSL_CODE=' + $("#cboEstablecimiento").val() + '&TIPO_ACT=' + $('#cboActividad :selected').val() + '&F_DESDE=' + $("#txtDesde").val() + '&F_HASTA=' + $("#txtHasta").val(),
                    contenttype: 'application/json',
                    datatype: 'json',
                    async: true
                }).done(function (datos) {
                    Desbloquear("ventana");
                    tbody.html('');
                    tbody.unbind('click');
                    if (datos.length > 0) {

                        control_modificar = true;
                        
                        tabla = $('#tblDocumentosVenta').DataTable({
                            info: false, responsive: true, order: [[0, 'desc']],
                            data: datos,
                            columns: [
                                { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'DOCUMENTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '20%' },
                                { data: 'EMISION', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'VENCIMIENTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'CLIENTE', createdCell: function (cell) { }, width: '15%' },
                                { data: 'VENDEDOR', createdCell: function (cell) { }, width: '25%' },
                                { data: 'COMPLETO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '25%' }
                            ]
                        });
                        $(tbody).css('cursor', 'pointer');
                        $('#tblDocumentosVenta_wrapper').find(':last').remove();
                        tbody.on('click', 'tr', function () {

                            $('#data_transaction').empty();

                            $(this).addClass('selected');                            
                            var dcto = tabla.row(this).data();
                            var cod_doc = dcto.CODIGO;
                            var fecha_emision = dcto.EMISION;
                            var fecha_vencimiento = dcto.VENCIMIENTO;
                            var pidm_vendedor = dcto.PIDM;
                            var usuario = dcto.USUARIO;
                            var cliente = dcto.CLIENTE;

                            if (cod_doc.length !== 0) {

                                clearFields("ventas");

                                $('<input/>', {
                                    'id': 'txtCodigoVenta',
                                    'type': 'hidden',
                                    'value': cod_doc
                                }).appendTo('#data_transaction');

                                var nro_doc = dcto.DOCUMENTO.split('-');
                                if (nro_doc.length > 2) {
                                    var serie = nro_doc[0] + '-' + nro_doc[1];
                                    var nro = nro_doc[2];
                                } else if (nro_doc.length > 1) {
                                    var serie = nro_doc[0];
                                    var nro = nro_doc[1];
                                } else {
                                    serie = '';
                                    nro = nro_doc[0];
                                }

                                $("#txtSerieV").val(serie);
                                $("#txtDocumentoV").val(nro);                                
                                $("#cboVendedorV").select2("val", pidm_vendedor);                                
                                if (usuario !== $('#cboVendedorV :selected').attr('usuario')) {
                                    $("#cboVendedorV").select2("val", "");
                                }
                                $("#txtFechaEmisionV").val(fecha_emision);
                                $("#txtFechaVencimientoV").val(fecha_vencimiento);
                                $("#txtClienteV").val(cliente);

                                enabledFields([                                                                        
                                    $("#cboVendedorV"),
                                    $("#txtFechaEmisionV"),
                                    $("#txtFechaVencimientoV")
                                ]);                                

                                $("#modalDocumentoVenta").modal("hide");

                            }                            
                           
                        });

                        $("#modalDocumentoVenta").modal("show");

                        if ($("#modalDocumentoVenta").hasClass('in') == true) {
                            $('#tblDocumentosVenta_filter.dataTables_filter input[type=search]').focus();
                        }
                        $('#modalDocumentoVenta').on('shown.bs.modal', function () {
                            $('#tblDocumentosVenta_filter.dataTables_filter input[type=search]').focus();
                        });
                        
                    } else {
                        control_modificar = false;
                        $('#tblDocumentosVenta').DataTable({
                            info: false, responsive: true, order: [[0, 'desc']], data: []
                        });
                        infoCustom('No existen documentos con el filtro buscado.');
                    }
                }).error(function (datos) {
                    control_modificar = false;
                    Desbloquear("ventana");
                    alertCustom('Error al listar documentos de ventas.');
                });

            }

        }


    }

    var buscarDocumentoGasto = function () {

        var tipo_actividad = parseInt($('#cboActividad :selected').val());

        if (control_actividad === tipo_actividad) {

            var dataFields = ["cboEmpresa", "cboEstablecimiento", "cboActividad", "txtDesde", "txtHasta"];

            if (vErrors(dataFields)) {

                $('#tblDocumentosGasto').DataTable().destroy();
                var tbody = $('#tblDocumentosGasto').find('tbody');

                Bloquear("ventana");
                control_modificar = false;

                $.ajax({
                    type: 'post',
                    url: 'vistas/nc/ajax/NCMCOAC.ashx?OPCION=LDOCS&CTLG_CODE=' + $("#cboEmpresa").val() + '&SCSL_CODE=' + $("#cboEstablecimiento").val() + '&TIPO_ACT=' + $('#cboActividad :selected').val() + '&F_DESDE=' + $("#txtDesde").val() + '&F_HASTA=' + $("#txtHasta").val(),
                    contenttype: 'application/json',
                    datatype: 'json',
                    async: true
                }).done(function (datos) {
                    Desbloquear("ventana");
                    tbody.html('');
                    tbody.unbind('click');
                    if (datos.length > 0) {

                        control_modificar = true;

                        tabla = $('#tblDocumentosGasto').DataTable({
                            info: false, responsive: true, order: [[0, 'desc']],
                            data: datos,
                            columns: [
                                { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'DOCUMENTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '20%' },
                                { data: 'NRO_DOCUMENTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '20%' },
                                { data: 'CONCEPTO', createdCell: function (cell) { }, width: '25%' },
                                { data: 'DESCRIPCION', createdCell: function (cell) { }, width: '10%' },
                                { data: 'EMISION', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                                { data: 'BENEFICIARIO', createdCell: function (cell) { }, width: '15%' },                        
                                { data: 'IND_COMPRAS', createdCell: function () { }, "visible": false },
                                { data: 'ANIO_TRIB', createdCell: function () { }, "visible": false },
                                { data: 'MES_TRIB', createdCell: function () { }, "visible": false },
                                { data: 'CODE_APROB', createdCell: function () { }, "visible": false },
                                { data: 'ESTADO_GASTO', createdCell: function () { }, "visible": false },
                                { data: 'ESTADO_GASTO_DESCRIPCION', createdCell: function () { }, "visible": false }
                            ]
                        });

                        $(tbody).css('cursor', 'pointer');
                        $('#tblDocumentosGasto_wrapper').find(':last').remove();

                        tbody.on('click', 'tr', function () {

                            $('#data_transaction').empty();

                            $(this).addClass('selected');
                            var dcto = tabla.row(this).data();                                    
                            var cod_doc = dcto.CODIGO;
                            var tipo_doc = dcto.TIPO_DOC;
                            var fecha_emision = dcto.EMISION;
                            var beneficiario = dcto.BENEFICIARIO;
                            var ind_compra = dcto.IND_COMPRAS;
                            var anio_trib = dcto.ANIO_TRIB;
                            var mes_trib = dcto.MES_TRIB;
                            var cod_apro = dcto.CODE_APROB;
                            var estado_code = dcto.ESTADO_GASTO;
                            var estado_descripcion = dcto.ESTADO_GASTO_DESCRIPCION;
                            var fecha_vencimiento = dcto.FECHA_VENCIMIENTO;
                            var fecha_detraccion = dcto.FECHA_DETRA;
                            var numero_detraccion = dcto.NUMERO_DETRA;

                            if (cod_doc.length !== 0) {

                                clearFields("gastos");

                                $('<input/>', {
                                    'id': 'txtCodigoGasto',
                                    'type': 'hidden',
                                    'value': cod_doc
                                }).appendTo('#data_transaction');

                                $('<input/>', {
                                    'id': 'txtCodigoAprobacion',
                                    'type': 'hidden',
                                    'value': cod_apro
                                }).appendTo('#data_transaction');

                                $('<input/>', {
                                    'id': 'txtCodigoEstado',
                                    'type': 'hidden',
                                    'value': estado_code
                                }).appendTo('#data_transaction');

                                var nro_doc = dcto.NRO_DOCUMENTO.split('-');
                                if (nro_doc.length > 2) {
                                    var serie = nro_doc[0] + '-' + nro_doc[1];
                                    var nro = nro_doc[2];
                                } else if (nro_doc.length > 1) {
                                    var serie = nro_doc[0];
                                    var nro = nro_doc[1];
                                } else {
                                    serie = '';
                                    nro = nro_doc[0];
                                }

                                $("#txtSerieG").val(serie);
                                $("#txtDocumentoG").val(nro);
                                $("#cboTipoDocumentoG").select2("val", tipo_doc);                                       
                                $("#txtFechaEmisionG").val(fecha_emision);
                                $("#txtFechaVencimientoG").val(fecha_vencimiento);
                                $("#txtBeneficiarioG").val(beneficiario);
                                $("#txtFechaDetraG").val(fecha_detraccion);
                                $("#txtNumeroDetraG").val(numero_detraccion);
                                $("#lblEstadoGasto").html(estado_descripcion);
                                $("#hfcod_gasto").val(cod_doc);

                                if (estado_code == '2') {
                                    $("#btnAnularGasto").show();
                                } else {
                                    $("#btnAnularGasto").hide();
                                }

                                if (ind_compra == "S") {
                                    $("#chkComprasG").removeAttr("disabled");
                                    $('#uniform-chkComprasG span').removeClass().addClass("checked");
                                    $('#chkComprasG').attr('checked', true);                                    
                                    $("#content_compra_periodo").show();

                                    if (anio_trib !== "" && mes_trib != "") {

                                        var nombre_mes = parseMes(parseFloat(mes_trib));
                                        var value_periodo = mes_trib + "-" + anio_trib;
                                        var periodo = nombre_mes + " - " + anio_trib;

                                        $("#cboPeriodoG").select2("val", value_periodo);                                       

                                        if ($("#cboPeriodoG").val() !== null) {
                                            if ($("#cboPeriodoG").val() == value_periodo) {
                                                $('.cbo_periodo').hide();
                                                if ($("#txtPeriodoNoActual").length) {
                                                    $("#txtPeriodoNoActual").val("");
                                                }
                                                $(".lb_periodo").show();
                                                $(".slt_periodo").show();
                                                $("#cboPeriodoG").removeAttr("disabled");
                                            } else {                                                
                                                $("#cboPeriodoG").attr("disabled", "disabled");
                                                $(".slt_periodo").hide();
                                                $(".lb_periodo").show();
                                                $(".cbo_periodo").show();
                                                if ($("#txtAnioPeriodo").length && $("#txtMesPeriodo").length) {
                                                    $("#txtAnioPeriodo").val(anio_trib);
                                                    $("#txtMesPeriodo").val(mes_trib);
                                                } else {
                                                    $('<input/>', {
                                                        'id': 'txtAnioPeriodo',
                                                        'type': 'hidden',
                                                        'value': anio_trib
                                                    }).appendTo('#data_transaction');
                                                    $('<input/>', {
                                                        'id': 'txtMesPeriodo',
                                                        'type': 'hidden',
                                                        'value': mes_trib
                                                    }).appendTo('#data_transaction');
                                                }
                                                if ($("#txtPeriodoNoActual").length) {
                                                    $("#txtPeriodoNoActual").val(periodo);
                                                } else {
                                                    $('<input/>', {
                                                        'id': 'txtPeriodoNoActual',
                                                        'type': 'text',
                                                        'class': 'span12',
                                                        'value': periodo
                                                    }).appendTo('.cbo_periodo');
                                                }
                                                
                                                $("#txtPeriodoNoActual").attr("disabled", "disabled");
                                            }
                                        } else {
                                            $("#cboPeriodoG").select2("val", "T");
                                            $("#cboPeriodoG").attr("disabled", "disabled");
                                            $(".lb_periodo").hide();
                                            $(".slt_periodo").hide();
                                            $('.cbo_periodo').hide();
                                            if ($("#txtPeriodoNoActual").length) {
                                                $("#txtPeriodoNoActual").val("");
                                            }
                                        }
                                        
                                    } else {
                                        $("#cboPeriodoG").attr("disabled", "disabled");
                                        $(".lb_periodo").hide();
                                        $(".slt_periodo").hide();
                                        $('.cbo_periodo').hide();
                                        if ($("#txtPeriodoNoActual").length) {
                                            $("#txtPeriodoNoActual").val("");
                                        }
                                    }
                                } else {
                                    $("#chkComprasG").attr("disabled", true);
                                    $('#uniform-chkComprasG span').removeClass();
                                    $('#chkComprasG').attr('checked', false);
                                    $("#content_compra_periodo").show();
                                    $(".lb_periodo").hide();
                                    $(".slt_periodo").hide();
                                    $('.cbo_periodo').hide();
                                    if ($("#txtPeriodoNoActual").length) {
                                        $("#txtPeriodoNoActual").val("");
                                    }
                                }

                                enabledFields([
                                    $("#cboTipoDocumentoG"),
                                    $("#txtSerieG"),
                                    $("#txtDocumentoG"),                                    
                                    $("#txtFechaEmisionG"),
                                    $("#txtFechaVencimientoG"),
                                    $("#txtFechaDetraG"),
                                    $("#txtNumeroDetraG")
                                ]);

                            }

                            $("#modalDocumentoGasto").modal("hide");

                        });

                        $("#modalDocumentoGasto").modal("show");

                        if ($("#modalDocumentoGasto").hasClass('in') == true) {
                            $('#tblDocumentosGasto_filter.dataTables_filter input[type=search]').focus();
                        }
                        $('#modalDocumentoGasto').on('shown.bs.modal', function () {
                            $('#tblDocumentosGasto_filter.dataTables_filter input[type=search]').focus();
                        });

                    } else {
                        control_modificar = false;
                        $('#tblDocumentosGasto').DataTable({
                            info: false, responsive: true, order: [[0, 'desc']], data: []
                        });
                        infoCustom('No existen documentos con el filtro buscado.');
                    }
                }).error(function (data) {
                    control_modificar = false;
                    Desbloquear("ventana");
                    alertCustom('Error al listar documentos de gastos.');
                });
            }
        }        

    }

    var fillcboTipoDocGasto = function () {

        var select = $("#cboTipoDocumentoG");

        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=10&p_CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                select.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].DCTO_CODE + '" gastos="' + datos[i].COMPRAS + '">' + datos[i].DCTO_DESC_CORTA + '</option>');                       
                    }
                    select.select2("val", "");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    };

    function ActualizarDocCompras() {       

        var dataGeneral = ["cboEmpresa", "cboEstablecimiento", "cboActividad", "txtDesde", "txtHasta"];        

        if (vErrors(dataGeneral)) {            

            if (control_modificar) {

                //var dataCompras = ["cboTipoDocumentoC", "txtSerieC", "txtDocumentoC", "cboVendedorC", "txtFechaEmisionC", "txtFechaVencimientoC"];
                var dataCompras = ["cboTipoDocumentoC", "txtSerieC", "txtDocumentoC", "txtFechaEmisionC", "txtFechaVencimientoC"];
                var selected_actividad = parseInt($('#cboActividad :selected').val());
                var div_transaction = $("#data_transaction");

                if (vErrors(dataCompras) && control_actividad === selected_actividad && div_transaction.is(':empty') === false && validaFechas($("#txtFechaEmisionC").val(), $("#txtFechaVencimientoC").val()) ) {

                    Bloquear("ventana");

                    var data = new FormData();

                    data.append('CTLG_CODE', $("#cboEmpresa").val());
                    data.append('SCSL_CODE', $("#cboEstablecimiento").val());
                    data.append('TIPO_ACT', $('#cboActividad :selected').val());
                    data.append('TIPO_DOC', $("#cboTipoDocumentoC").val());
                    //data.append('CODE_VENDEDOR', $("#cboVendedorC :selected").attr('usuario'));
                    data.append('SERIE_DOC', $("#txtSerieC").val());
                    data.append('NRO_DOC', $("#txtDocumentoC").val());
                    data.append('F_EMISION', $("#txtFechaEmisionC").val());
                    data.append('F_VENCIMIENTO', $("#txtFechaVencimientoC").val());
                    data.append('CODE', $("#txtCodigoCompra").val());
                    //data.append('PIDM_VENDEDOR', $("#cboVendedorC").val());

                    $.ajax({
                        type: 'post',
                        url: 'vistas/nc/ajax/NCMCOAC.ashx?OPCION=ADOC',
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (datos) {                        
                        if (datos !== null && datos.length > 0) {
                            exito();
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    }).error(function (datos) {
                        noexito();
                        Desbloquear("ventana");
                    });


                } 
                
            } else {               
                infoCustom('Debe seleccionar un Documento de Compra');
            }
        }

    }

    function ActualizarDocVentas() {

        var dataGeneral = ["cboEmpresa", "cboEstablecimiento", "cboActividad", "txtDesde", "txtHasta"];        

        if (vErrors(dataGeneral)) {

            if (control_modificar) {

                var dataVentas = ["txtSerieV", "txtDocumentoV", "cboVendedorV", "txtFechaEmisionV", "txtFechaVencimientoV", "txtCodigoVenta", "txtClienteV"];
                var selected_actividad = parseInt($('#cboActividad :selected').val());
                var div_transaction = $("#data_transaction");

                if (vErrors(dataVentas) && control_actividad === selected_actividad && div_transaction.is(':empty') === false) {

                    Bloquear("ventana");

                    var data = new FormData();

                    data.append('CTLG_CODE', $("#cboEmpresa").val());
                    data.append('SCSL_CODE', $("#cboEstablecimiento").val());
                    data.append('TIPO_ACT', $('#cboActividad :selected').val());

                    data.append('CODE_VENDEDOR', $("#cboVendedorV :selected").attr('usuario'));
                    data.append('SERIE_DOC', $("#txtSerieV").val());
                    data.append('NRO_DOC', $("#txtDocumentoV").val());
                    data.append('F_EMISION', $("#txtFechaEmisionV").val());
                    data.append('F_VENCIMIENTO', $("#txtFechaVencimientoV").val());
                    data.append('CODE', $("#txtCodigoVenta").val());
                    data.append('PIDM_VENDEDOR', $("#cboVendedorV").val());

                    $.ajax({
                        type: 'post',
                        url: 'vistas/nc/ajax/NCMCOAC.ashx?OPCION=ADOC',
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (datos) {
                        if (datos !== null && datos.length > 0) {
                            exito();
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    }).error(function (datos) {
                        noexito();
                        Desbloquear("ventana");
                    });

                }

            } else {
                infoCustom('Debe seleccionar un Documento de Venta');
            }
        }

    }

    function ActualizarDocGastos() {

        var dataGeneral = ["cboEmpresa", "cboEstablecimiento", "cboActividad", "txtDesde", "txtHasta"];         

        if (vErrors(dataGeneral)) {            

            if (control_modificar) {
                
                var dataGastos = ["txtSerieG", "txtDocumentoG", "cboTipoDocumentoG", "txtFechaEmisionG", "txtCodigoGasto", "txtBeneficiarioG", "txtCodigoAprobacion", "txtCodigoEstado", "txtFechaVencimientoG"];
                var selected_actividad = parseInt($('#cboActividad :selected').val());
                var div_transaction = $("#data_transaction");

                if (vErrors(dataGastos) && control_actividad === selected_actividad && div_transaction.is(':empty') === false) {

                    if (parseInt($("#txtCodigoEstado").val()) < 2) { // Gasto Aprobado
                        infoCustom("El gasto necesita ser aprobado para ser modificado. Se recomienda actualizar los datos al aprobar el gasto.");
                        return;
                    }

                    Bloquear("ventana");

                    var chkComprasG = "N"
                    var anioPeriodo = "";
                    var mesPeriodo = "";

                    if ($("#chkComprasG").is(":checked")) {
                        chkComprasG = "S";
                        if ($(".slt_periodo").css("display") !== 'none') {
                            if ($("#cboTipoDocumentoG :selected").attr("gastos") === "S" && $("#cboPeriodoG").val() !== "T") {
                                mesPeriodo = $("#cboPeriodoG").val().split("-")[0];
                                anioPeriodo = $("#cboPeriodoG").val().split("-")[1];
                            }
                        } else if ($(".slt_periodo").css("display") == 'none') {
                            anioPeriodo = $("#txtAnioPeriodo").val();
                            mesPeriodo = $("#txtMesPeriodo").val();
                        }                       
                    }

                    var data = new FormData();

                    data.append('CTLG_CODE', $("#cboEmpresa").val());
                    data.append('SCSL_CODE', $("#cboEstablecimiento").val());
                    data.append('TIPO_ACT', $('#cboActividad :selected').val());

                    data.append('TIPO_DOC', $("#cboTipoDocumentoG").val());
                    data.append('SERIE_DOC', $("#txtSerieG").val());
                    data.append('NRO_DOC', $("#txtDocumentoG").val());
                    data.append('F_EMISION', $("#txtFechaEmisionG").val());
                    data.append('F_VENCIMIENTO', $("#txtFechaVencimientoG").val());
                    data.append('F_DETRACCION', $("#txtFechaDetraG").val());
                    data.append('N_DETRACCION', $("#txtNumeroDetraG").val());
                    data.append('CODE', $("#txtCodigoGasto").val());
                    data.append('IND_COMPRAS', chkComprasG);
                    data.append('ANIO_PERIODO', anioPeriodo);
                    data.append('MES_PERIODO', mesPeriodo);
                    data.append('CODE_APROB', $("#txtCodigoAprobacion").val());                    

                    $.ajax({
                        type: 'post',
                        url: 'vistas/nc/ajax/NCMCOAC.ashx?OPCION=ADOC',
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false
                    }).done(function (datos) {
                        if (datos !== null && datos.length > 0) {
                            exito();
                        } else {
                            noexito();
                        }
                        Desbloquear("ventana");
                    }).error(function (datos) {
                        noexito();
                        Desbloquear("ventana");
                    });                    
                        
                }

            } else {
                infoCustom('Debe seleccionar un Documento de Gasto');
            }
        }

    }

    function cargainicial() {
        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");         
            fillCboEstablecimiento();        
            reset();
            Desbloquear("ventana");
        });

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
            reset();
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
            reset();
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

    var AnularDctoGasto = function () {

        let data = new FormData();
        data.append('OPCION', "ANULAR_GASTO");
        data.append('p_GASTO_CODE', $("#hfcod_gasto").val());

        $.ajax({
            type: "POST",
            url: "vistas/cp/ajax/CPMPGAS.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $("#btnAnularGasto").attr("style", "display:none;");
                    $("#lblEstadoGasto").html("ANULADO");                    
                }
                else {
                    alertCustom("ERROR: " + " No se anuló correctamente.");
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se anuló correctamente.");
            }
        });

    };

    function EventoControles() {

        $("#cboActividad").on('change', function () {

            if ( $(this).val() !== "" ) {
                var option_actividad = $(this).val();                
                loadSection(option_actividad);
                clearFields("compras");
                reset();
            }

        });

        $("#cboEmpresa").on('change', function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboVendedor();
            fillcboTipoDocCompra('NRMX');
            fillCboPeriodo();
            reset();
            Desbloquear("ventana");
        });

        $('#btnBuscarDocumentoC, #btnBuscarDocumentoV, #btnBuscarDocumentoG').on('click', mostrarModalBusDoc);       

        $('#btnCancelarOperacion').on('click', function () {

            window.location.href = "?f=ncmcoac";

        });

        $("#cboTipoDocumentoG").on("change", function () {
            if ($("#cboTipoDocumentoG :selected").attr("gastos") == "S") {
                $('#uniform-chkComprasG span').removeClass().addClass("checked");
                $('#chkComprasG').attr('checked', true); 
                $('#chkComprasG').attr('disabled', false); 
                $('#cboPeriodoG').removeAttr("disabled"); 
            } else {
                $('#uniform-chkComprasG span').removeClass();
                $('#chkComprasG').attr('checked', false);
                $('#chkComprasG').attr('disabled', true); 
                $('#cboPeriodoG').attr("disabled", "disabled");
            }
        });

        $("#btnActualizarDocCompras").on('click', ActualizarDocCompras);

        $("#btnActualizarDocVentas").on('click', ActualizarDocVentas);

        $("#btnActualizarDocGastos").on('click', ActualizarDocGastos);

        $('#chkComprasG').on('click', function () {
            if ($("#chkComprasG").is(':checked')) {
                $('#uniform-chkComprasG span').removeClass().addClass("checked");
                $('#chkComprasG').attr('checked', true);
                $('#cboPeriodoG').removeAttr("disabled");                
            } else {
                $('#uniform-chkComprasG span').removeClass();
                $('#chkComprasG').attr('checked', false);
                $('#cboPeriodoG').attr("disabled", "disabled");
            }
        });

        $("#btnAnularGasto").on("click", function () {
            $("#modal-confirmar").modal("show");
        });

        $("#btnAceptar").on("click", function () {
            Bloquear("ventana");
            AnularDctoGasto();
            $("#modal-confirmar").modal("hide");
            $("#msgDespacho").html("");
            Desbloquear("ventana");
        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");
            $("#msgDespacho").html("");
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargainicial();
            fillCboActividad();            
            EventoControles();            
            fillcboTipoDocCompra('NRMX');
            fillcboTipoDocGasto();
            fillCboPeriodo();
        }
    };

}();

function reset() {
    control_modificar = false;
    $('#data_transaction').empty();
    clearFields("compras");
    clearFields("ventas");
    clearFields("gastos");
    disabledFields([
        //$("#cboTipoDocumentoC"), $("#txtSerieC"), $("#txtDocumentoC"), $("#cboVendedorC"), $("#txtFechaEmisionC"), $("#txtFechaVencimientoC"), //compras
        $("#cboTipoDocumentoC"), $("#txtSerieC"), $("#txtDocumentoC"), $("#txtFechaEmisionC"), $("#txtFechaVencimientoC"), //compras
        $("#txtSerieV"), $("#txtDocumentoV"), $("#cboVendedorV"), $("#txtFechaEmisionV"), $("#txtFechaVencimientoV"), $("#txtClienteV"), //ventas
        $("#cboTipoDocumentoG"), $("#txtSerieG"), $("#txtDocumentoG"), $("#txtFechaEmisionG"), $("#txtBeneficiarioG"), $("#chkComprasG"), $("#txtFechaVencimientoG"), $("#cboPeriodoG"), $("#txtNumeroDetraG"), $("#txtFechaDetraG")//gastos
    ]);
    $("#chkComprasG").attr("disabled", "disabled");
    $('#uniform-chkComprasG span').removeClass();
    $("#content_compra_periodo").hide();
}

function loadSection(option)
{  
    $("#info_compras").hide();
    $("#info_ventas").hide();
    $("#info_gastos").hide();

    $("#btnActualizarDocCompras").hide();
    $("#btnActualizarDocVentas").hide();
    $("#btnActualizarDocGastos, #btnAnularGasto").hide();

    switch (option) {
        case '1': 
            var section = $("#info_compras");
            $("#title_actividad").html("COMPRAS");
            section.show("fast");   
            $("#btnActualizarDocCompras").show();
            control_actividad = 1;     
            disabledFields([
                //$("#cboTipoDocumentoC"), $("#txtSerieC"), $("#txtDocumentoC"), $("#cboVendedorC"), $("#txtFechaEmisionC"), $("#txtFechaVencimientoC")
                $("#cboTipoDocumentoC"), $("#txtSerieC"), $("#txtDocumentoC"), $("#txtFechaEmisionC"), $("#txtFechaVencimientoC")
            ]);
            break;

        case '2':
            var section = $("#info_ventas");
            $("#title_actividad").html("VENTAS");
            section.show("fast");  
            $("#btnActualizarDocVentas").show();
            control_actividad = 2;
            disabledFields([
                $("#txtSerieV"), $("#txtDocumentoV"), $("#cboVendedorV"), $("#txtFechaEmisionV"), $("#txtFechaVencimientoV"), $("#txtClienteV")
            ]);
            break;

        case '3':
            var section = $("#info_gastos");
            $("#title_actividad").html("GASTOS");
            section.show("fast");    
            $("#btnActualizarDocGastos").show();
            control_actividad = 3;
            disabledFields([
                $("#cboTipoDocumentoG"), $("#txtSerieG"), $("#txtDocumentoG"), $("#txtFechaEmisionG"), $("#txtFechaVencimientoG"), $("#txtBeneficiarioG"), $("#txtFechaDetraG"), $("#txtNumeroDetraG")
            ]);
            break;

        default: break;
    }

    //console.log("actividad: " + control_actividad);
}

function disabledFields(fields) {

    for (var i = 0; i < fields.length; i++) {
        fields[i].prop("disabled", true);
    }

}

function enabledFields(fields) {

    for (var i = 0; i < fields.length; i++) {
        fields[i].prop("disabled", false);
    }

}

function clearFields(actividad) {

    switch (actividad) {

        case "compras":
            $("#txtSerieC").val("");
            $("#txtDocumentoC").val("");
            $("#cboTipoDocumentoC").select2("val", "");
            //$("#cboVendedorC").select2("val", "");
            $("#txtFechaEmisionC").val("");
            $("#txtFechaVencimientoC").val("");
            break;

        case "ventas":
            $("#txtSerieV").val("");
            $("#txtDocumentoV").val("");
            $("#cboVendedorV").select2("val", "");
            $("#txtFechaEmisionV").val("");
            $("#txtFechaVencimientoV").val("");
            $("#txtClienteV").val("");
            break;

        case "gastos":
            $("#txtSerieG").val("");
            $("#txtDocumentoG").val("");
            $("#cboTipoDocumentoG").select2("val", "");            
            $("#txtFechaEmisionG").val("");
            $("#txtFechaVencimientoG").val("");
            $("#txtFechaDetraG").val("");
            $("#txtNumeroDetraG").val("");
            $("#txtBeneficiarioG").val("");
            break;

        default:
            break;
    }

}

function validaFechas(emision, vencimiento) {

    var f_emision = convert_date(emision);
    var f_vencimiento = convert_date(vencimiento);

    if (Date.parse(f_emision) > Date.parse(f_vencimiento)) {
        return false;
    } else {
        return true;
    }

}

function convert_date(date) {

    var year = date.substring(10, 6);
    var month = date.substring(5, 3);
    var day = date.substring(0, 2);
    var new_date = year + '-' + month + '-' + day;

    return new_date;

}

function parseMes(mes) {

    var nombre_mes = "";

    switch (mes) {
        case 1: nombre_mes = "ENERO"; break;
        case 2: nombre_mes = "FEBRERO"; break;
        case 3: nombre_mes = "MARZO"; break;
        case 4: nombre_mes = "ABRIL"; break;
        case 5: nombre_mes = "MAYO"; break;
        case 6: nombre_mes = "JUNIO"; break;
        case 7: nombre_mes = "JULIO"; break;
        case 8: nombre_mes = "AGOSTO"; break;
        case 9: nombre_mes = "SETIEMBRE"; break;
        case 10: nombre_mes = "OCTUBRE"; break;
        case 11: nombre_mes = "NOVIEMBRE"; break;
        case 12: nombre_mes = "DICIEMBRE"; break;
    }

    return nombre_mes;

}
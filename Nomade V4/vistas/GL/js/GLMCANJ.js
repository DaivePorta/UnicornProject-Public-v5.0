auxiliar = [];//actual
auxiliar2 = "";
auxiliar3 = "";//ultimo seleccionado
auxiliar4 = "";//moneda

var asDocumentos = '';  
var asLetras = '';

auxiliar5 = "";//
montoCanjear = 0;
cargini = false;
montoBalance = 0;
clase_boton = "";
docVenta = [];
var tipoP = '';
var bandera = 0;


var GLLCANJ = function () {
    var plugins = function () {
        $('#cboEmpresa').select2();       
    }

    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            fillTablaLetra();
        });       
    }

    var creaTablaVacia = function () {
        var json = null;
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                { data: "PERSONA" }, 
                {
                    data: "FECHA_CREA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },                
                {
                    data: "COD_ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },    
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(rowData.SMONEDA + formatoMiles($(td).html()));


                    }
                }                
            ],
            "sDom": 'C<"clear">lfrtip',
        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;                                
                window.location.href = '?f=GLMCANJ&codigo=' + codigo + '&tipo=C';
            }

        });
    }

    var fillTablaLetra = function () {
        let empresa = $('#cboEmpresa').val();
        let giradoA = ($("#cboGirador").val() == "TODOS") ? '' : $("#cboGirador").val();
        let fechaIni = $('#minfecha').val();;
        let fechaFin = $('#maxfecha').val();;

        $.ajax({
            type: "post",
            url: "vistas/gl/ajax/GLMCANJ.ashx?flag=GET_CANJE&tipo=C&empresa=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length === 0) {
                    infoCustom("No se encontraron registros.");
                    return;
                }

                oTable.fnAddData(datos);
                
            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }  

    return {
        init: function () {
            plugins();
            eventos();
            fillCboEmpresa();
            creaTablaVacia();           
            fillTablaLetra();
        }
    };

}();

var GLMCANJ = function () {

    var plugins = function () {
        $("#slcEmpresa,#cboCliente,#cbo_moneda, #cboEstablecimiento").select2();        
        $("#txtFechaGiro,#txtFechaRegistro, #txtFechaCanje").datepicker();
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                console.log(datos);
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '" data-pidm = "' + datos[i].PIDM +'">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    fillCboEstablecimiento();
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());

                   
                } else {
                    $('#slcEmpresa').select2('val', '');
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
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                //selectEst.append('<option></option>');
                if (datos != null) {
                    // $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
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
       
    var fillCliente = function () {
        let selectEst = $('#cboCliente');
        let sHTML = "<option></option>";
        selectEst.empty();
        Bloquear("divCboCliente");
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/CCLLCCL.ASHX?OPCION=4&empresa=" + $('#slcEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divCboCliente");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        sHTML += `<option value="${datos[i].PIDM}">${datos[i].RSOCIAL}</option>`;
                    }
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        selectEst.html(sHTML);
        $('#cboCliente').val("").change();
        //$('#cboCliente').select2('val', '');
    }; 

    var fillcboMoneda = function () {
        $('#cbo_moneda').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_moneda').empty();
                $('#cbo_moneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                $('#cbo_moneda').val(datos[pos].CODIGO);
                ListarValorCambio($('#cbo_moneda').val());
                ListarValorCambioOficial($('#cbo_moneda').val());
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente.");
            }
        });
        $('#cbo_moneda').select2();
    }

    //Obtiene tipo de cambio INTERNO
    function ListarValorCambio(monecode) {
        if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
            monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=INTERNO",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                        $('#lbl_TC').attr("style", "display:block");
                        $('#input_valor_cambio').attr("style", "display:block");
                        $('#lbl_fec_vig').attr("style", "display:block");
                        $('#input_fec_vig').attr("style", "display:block");
                        $('#txt_valor_cambio').val(datos[0].VALOR_CAMBIO_VENTA);
                        $('#txt_fec_vig').val(datos[0].FECHA_VIGENTE);
                    }
                    else {
                        $('#txt_valor_cambio').val("");
                        $('#txt_fec_vig').val("");
                    }
                },
                error: function (msg) {
                    alertCustom("Tipo de cambio Interno no se obtuvo correctamente.");
                }
            });
        }
    }

    //Obtiene tipo de cambio OFICIAL
    function ListarValorCambioOficial(monecode) {
        if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
            monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=OFICIAL",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                        $('#lbl_TC_Oficial').attr("style", "display:block");
                        $('#input_valor_cambio_Oficial').attr("style", "display:block");
                        $('#lbl_fec_vig_Oficial').attr("style", "display:block");
                        $('#input_fec_vig_Oficial').attr("style", "display:block");
                        $('#txt_valor_cambio_Oficial').val(datos[0].VALOR_CAMBIO_VENTA);
                        $('#txt_fec_vig_Oficial').val(datos[0].FECHA_VIGENTE);
                    }
                    else {
                        $('#txt_valor_cambio_Oficial').val("");
                        $('#txt_fec_vig_Oficial').val("");
                    }
                },
                error: function (msg) {
                    alertCustom("Tipo de cambio Oficial no se obtuvo correctamente.");
                }
            });
        }
    }

    var funcionalidad = function () {

        $("#txtFechaRegistro").datepicker("setDate", new Date()).attr("disabled", true);  

        $("#btnSimular").click(function () {
            if (!vErrorBodyNotIcon(["txtNroLetras", "txtFechaGiro"])) {
                $("#grabar").attr("disabled", false);
                let dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                let nroLetras = parseInt($("#txtNroLetras").val());
                let bLetrasFijas = $("#chkLetrasFijas").is(":checked");
                let dFechaMaxima = dFechaInicial.addDays(nPlazoDiasLinea);
                montoBalance = parseFloat($('#monto_total').text());
                var objArrayLetrasGen = new Array();
                var suma = 0;

                //.format("dd/MM/yyyy")
                if (bLetrasFijas) {
                    if (!vErrorBodyNotIcon(["txtPeriodoLetras"])) {
                        let nPeriodoLetras = parseInt($("#txtPeriodoLetras").val());
                        if ((nPeriodoLetras * nroLetras) <= nPlazoDiasLinea) {
                            for (var i = 0; i < nroLetras; i++) {
                                let objJsonLetraGen = {};
                                objJsonLetraGen.NRO_DOC_DETALLE = 'LETRA' + "-" + (i + 1);
                                objJsonLetraGen.NRO_DIAS = nPeriodoLetras * (i + 1);
                                objJsonLetraGen.FECHA = dFechaInicial.addDays(nPeriodoLetras * (i + 1)).format("dd/MM/yyyy");

                                if (i === nroLetras - 1) {
                                    objJsonLetraGen.MONTO = montoBalance - suma;
                                } else {
                                    suma+= (montoBalance / nroLetras).Redondear(2);
                                    objJsonLetraGen.MONTO = (montoBalance / nroLetras).Redondear(2);                                    
                                }  

                                
                                objArrayLetrasGen.push(objJsonLetraGen);
                            }
                        } else {
                            infoCustom("Número de letras con periodo ha superado al plazo de la línea de crédito.");
                        }
                    } else {
                        infoCustom("Ingrese los campos requeridos!");
                    }

                } else {

                    for (var i = 0; i < nroLetras; i++) {
                        let objJsonLetraGen = {};
                        objJsonLetraGen.NRO_DOC_DETALLE = 'LETRA' + "-" + (i + 1);
                        objJsonLetraGen.NRO_DIAS = 0;
                        objJsonLetraGen.FECHA = "";
                        objJsonLetraGen.MONTO = 0;
                        objArrayLetrasGen.push(objJsonLetraGen);
                    }

                }

                oTable_detalle.fnClearTable();
                if (objArrayLetrasGen.length > 0) {
                    oTable_detalle.fnAddData(objArrayLetrasGen);
                    if (!bLetrasFijas) {
                        editaTabla();
                    }
                }

            } else {
                infoCustom("Ingrese los campos requeridos!");
            }
        });

        var i = 0;
        $("#btnAgregarDctoOrigen").click(function () {            
            $("#prueba").append("<div class='row-fluid div_mas_dctoreg' id='div_mas_dctoreg_" + (i = i + 1) + "'>\
            <div class='span12'>\
            <div class='span2'></div>\
            <div class='span8'><div class='control-group'>\
            <div class='controls'>\
            \
            <input id='txtSerieNroDctoOrigen" + (i) + "' class='fila_" + (i) + " txtSerieNroDctoOrigen span6'  type='text' disabled style='text-align: left'/>\
            <input id='txtMontoDctoOrigenSoles" + (i) + "' class='fila_" + (i) + " txtMontoDctoOrigenSoles span3' data-montosol='' type='text' disabled style='text-align: center' />\
            <input id='txtMontoDctoOrigenCambio" + (i) + "' class='fila_" + (i) + " txtMontoDctoOrigenCambio span3' data-montocambio='' type='text' disabled style='text-align: center' />\
            <input id='txtCodigoDctoOrigen_" + (i) + "' class='fila_" + (i) + " txtCodigoDctoOrigen' data-codventa='' type='hidden'/>\
            <input id='txtCodMonto_" + (i) + "' class='fila_" + (i) + " txtCodMonto' data-codmonto='' type= 'hidden' />\
            </div></div></div><div class='span2'>\
            <div class='control-group'><div class='controls quitar'><button type='button' id='btnBuscadocs_" + (i) + "' onclick=buscarDocumento(this) class='fila_" + (i) + " btn blue search' data-toggle='modal' data-target='#muestralistap'>\
            <i class='icon-search' style='line-height: initial;'></i></button>&nbsp;\
            <button type='button' id='btn_quitar_" + (i) + "' class='fila_" + (i) + " btn red btn-quitar delete' onclick='RemoveDoc($(this).parent().parent().parent().parent().parent());'><i class='icon-minus'  style='line-height: initial;'></i></button>\
            </div></div></div></div></div>");
        });

        $('#slcEmpresa').on('change', function () {
            fillCboEstablecimiento();
            fillCliente();
        });

        $('#cboCliente').on('change', function () {            
            let asTXTDctoOrigen = $(".txtCodigoDctoOrigen");
            let asTXTMontoOrigen = $(".txtCodMonto");
            let asTXTMontoSol = $(".txtMontoDctoOrigenSoles");
            let asTXTMontoDolar = $(".txtMontoDctoOrigenCambio");
            let iNroReg = asTXTDctoOrigen.length;                                   

            for (let i = 0; i < iNroReg; i++) {
                $(asTXTDctoOrigen[i]).data("codventa", "");    
                $(asTXTMontoOrigen[i]).data("codmonto", "");    
                $(asTXTMontoSol[i]).data("montosol", "");    
                $(asTXTMontoDolar[i]).data("montocambio", "");    
            }

            $('.txtSerieNroDctoOrigen').val('');
            $('.txtMontoDctoOrigenSoles').val('');
            $('.txtMontoDctoOrigenCambio').val('');

            $('#cbo_moneda').val('0002').change();

            $('#monto_total').text('0.00');
            $("#txtFechaGiro").val('');
            $("#txtNroLetras").val('');
            $("#txtLugarGiro").val('');
            $("#txtPeriodoLetras").val(''); 
                       
            $("#uniform-chkLetrasFijas span").removeClass();
            $("#chkLetrasFijas").attr("checked", false);
            let spnStatus = $("#txtBalanceadoStatus");
            spnStatus.text("NO BALANCEADO");
            spnStatus.removeClass("balanceado").addClass("noBalanceado");

            oTable_detalle.fnClearTable();
            $("#divSimuLetras").fadeOut(); 
            $("#btnGenerar").attr("disabled", true); 
            $(".search").attr("disabled", false);
            $(".add").attr("disabled", false);
            $(".delete").attr("disabled", false);   
            $("#cbo_moneda").attr("disabled", false);            
            $('#title').css("display", "none"); 
            $('#titleLetras').css("display", "none"); 
            $("#grabar").attr("disabled", true);
            if ($('#cboCliente').val() === '') {
                return;
            }                        

            if (bandera === 0) {
                fnGetLineaCredito('C', $('#cboCliente').val(), $('#slcEmpresa').val());
            }
            
        });

        $('#cbo_moneda').on('change', function () {
            ListarValorCambio($('#cbo_moneda').val());
            ListarValorCambioOficial($('#cbo_moneda').val());
            $('#simbolo_moneda').text($('#cbo_moneda :selected').attr('simbolo'));            
            montoDocumento();      
        });

        $("#chkLetrasFijas").on("click", function () {
            if ($(this).is(":checked")) {
                $("#txtPeriodoLetras").attr("disabled", false);
            } else {
                $("#txtPeriodoLetras").val("");
                $("#txtPeriodoLetras").attr("disabled", true);
            }
        });

        $('#btnGenerar').on('click', function () {            
            $('#titleLetras').css("display", "inline-block"); 
            $('#titleLetras').text("Simulación de Letras"); 
            $("#cbo_moneda").attr("disabled", true);
            $(".search").attr("disabled", true);
            $(".add").attr("disabled", true);
            $(".delete").attr("disabled", true); 
            setTimeout(function () {
                oTable_detalle.fnAdjustColumnSizing();
            }, 200);
            $("#divSimuLetras").fadeIn();            
        });

    }

    var fnGetLineaCredito = function (tipo, pidm, empresa) {
        if (tipo === 'C') {//cliente
            var msgCargaAsync;
            $.ajax({
                type: "GET",
                url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
                data: {
                    flag: 7,
                    pidm: pidm,
                    empr: empresa
                },
                contentType: "application/json;",
                dataType: "json",
                beforeSend: function () {
                    msgCargaAsync = $.gritter.add({
                        text: '<img src="./recursos/img/loading.svg" > Obteniendo Linea de Crédito ...',
                        position: 'bottom-right',
                        sticky: true,
                        time: ''
                    });
                    $("#btnSimular").attr("disabled", true);
                },
                async: true,
                success: function (datos) {
                    var modeda = '';
                    if (datos != "" & datos != null) {
                        nPlazoDiasLinea = datos[0].PLAZO;
                    } else {
                        infoCustom("El cliente no cuenta con línea de crédito vigente.");
                    }
                },
                complete: function () {
                    $.gritter.remove(msgCargaAsync, {
                        fade: true,
                        speed: 'slow'
                    });
                    $("#btnSimular").attr("disabled", false);
                },
                error: function () {
                    alertCustom("Error al obtener datos de línea de crédito del Cliente.");
                }
            });
        } else { //proveedor
            var msgCargaAsync;
            $.ajax({
                type: "GET",
                url: "vistas/NC/estereotipos/ajax/Proveedor.ASHX",
                data: {
                    flag: 7,
                    pidm: pidm,
                    empr: empresa
                },
                contentType: "application/json;",
                dataType: "json",
                beforeSend: function () {
                    msgCargaAsync = $.gritter.add({
                        text: '<img src="./recursos/img/loading.svg" > Obteniendo Linea de Crédito ...',
                        position: 'bottom-right',
                        sticky: true,
                        time: ''
                    });
                    $("#btnSimular").attr("disabled", true);
                },
                async: true,
                success: function (datos) {
                    var modeda = '';
                    if (datos != "" & datos != null) {
                        nPlazoDiasLinea = datos[0].PLAZO;
                    } else {
                        infoCustom("El cliente no cuenta con línea de crédito vigente.");
                    }
                },
                complete: function () {
                    $.gritter.remove(msgCargaAsync, {
                        fade: true,
                        speed: 'slow'
                    });
                    $("#btnSimular").attr("disabled", false);
                },
                error: function () {
                    alertCustom("Error al obtener datos de línea de crédito del Cliente.");
                }
            });
        }
    }    
    
    function cargatablavacia() {
        oTable = $('#tblDocumentos').dataTable({
            data: null,
            columns: [
                {
                    data: "NUMERO_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NPIDM_SUJ",
                },
                {
                    data: { _: "FECHA.display", sort: "FECHA.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_VENC.display", sort: "FECHA_VENC.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NMONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ],
            scrollCollapse: false,
            paging: false,
            info: false,
            "order": [3, 'asc']
            //sort: false,            
        });

        $('#tblDocumentos').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblDocumentos_filter').css('display', 'none');
        $('#tblDocumentos thead, tfoot').css("background", "gainsboro");

        $('#tblDocumentos tbody').on('click', 'tr', function () {                      
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);                                          

                let documento = (row.DOCUMENTO).substring(0, 1) + '/' + row.NUMERO_DOC + ' - ' + row.MONEDA_CORTA;               

                let asTXTDctoOrigen = $(".txtCodigoDctoOrigen");
                let iNroReg = asTXTDctoOrigen.length;
                let sCodVenta = row.CODIGO;
                let sCodMonto = row.MONTO;
                let sCodMOBA = '0002';
                let sCodMonDoc = row.MONEDA;
                let montoDoc = row.MONTO;
                let montoMonNacional = 0;
                let montoMonExtranjera = 0; 
                let tipoCambio = $('#txt_valor_cambio_Oficial').val();
                let bExiste = false;

                for (let i = 0; i < iNroReg; i++) {
                    if ($(asTXTDctoOrigen[i]).data("codventa") == sCodVenta) {
                        bExiste = true;
                        break;
                    }
                }

                if (sCodMOBA === sCodMonDoc) {
                    montoMonNacional = parseFloat(montoDoc);
                    montoMonExtranjera = parseFloat(montoDoc) / parseFloat(tipoCambio);
                } else {
                    montoMonNacional = parseFloat(montoDoc) * parseFloat(tipoCambio);
                    montoMonExtranjera = parseFloat(montoDoc);
                }        

                if (bExiste) {
                    infoCustom('El documento ya ha sido agregado');
                } else {
                    $("." + clase_boton + ".txtSerieNroDctoOrigen").val(documento);
                    $("." + clase_boton + ".txtMontoDctoOrigenSoles").val('S/ ' + montoMonNacional);
                    $("." + clase_boton + ".txtMontoDctoOrigenCambio").val('US$ ' + montoMonExtranjera.toFixed(2));
                    $("." + clase_boton + ".txtCodigoDctoOrigen").val(sCodVenta);
                    $("." + clase_boton + ".txtCodMonto").val(sCodMonto);
                    $("." + clase_boton + ".txtCodigoDctoOrigen").data('codventa', sCodVenta);
                    $("." + clase_boton + ".txtCodMonto").data('codmonto', sCodMonto);

                    $("." + clase_boton + ".txtMontoDctoOrigenSoles").data('montosol', montoMonNacional);
                    $("." + clase_boton + ".txtMontoDctoOrigenCambio").data('montocambio', montoMonExtranjera);                    

                    montoDocumento();
                    $('#divBuscarDoc').modal('hide');
                    $("#btnGenerar").attr("disabled", false);
                }                              
            }
        });
    }

    var cargatablavacia2 = function () {    
        oTable_detalle = iniciaTabla('tblDetalle', {
            data: null,
            columns: [
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "NRO_DIAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort: false,
            preDrawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var columnaFechas = 2;
                var dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                // actualiza fecha
                api.column(columnaFechas, { page: 'current' }).data().filter(function (e, d) {
                    var valor = dFechaInicial.addDays(parseInt(api.data()[d].NRO_DIAS)).format("dd/MM/yyyy");
                    api.data()[d].FECHA = valor;
                    $($(rows).eq(d).children()[columnaFechas]).html(valor);
                });
            },
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                api.column(3, { page: 'current' }).data().filter(function (e, d) {
                    $($(rows).eq(d).children()[3]).html(formatoMiles(e));
                });
            },            

            footerCallback: function (row, data, start, end, display) {
                var api = this.api();
                let spnStatus = $("#txtBalanceadoStatus");
                if (data.length > 0) {
                    let fSumaTotalTabla = api.column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (montoBalance === fSumaTotalTabla) {
                        spnStatus.text("BALANCEADO");
                        spnStatus.removeClass("noBalanceado").addClass("balanceado");
                    } else {
                        spnStatus.text("NO BALANCEADO");
                        spnStatus.removeClass("balanceado").addClass("noBalanceado");
                    }
                }
            }

        });

        $('#tblDetalle').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblDetalle_filter').css('display', 'none');

    }

    var cargatablavacia3 = function () {
        oTable_detalle_documento = iniciaTabla('tblDetalleDocumento', {
            data: null,
            columns: [
                {
                    data: "COD_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort: false,                      
        });

        $('#tblDetalleDocumento').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblDetalleDocumento_filter').css('display', 'none');

    }

    var editaTabla = function () {

        oTable_detalle.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [null,
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                if ($(input.parents("form")[0]).hasClass("monto")) {
                    let fSumaTotalTabla = oTable_detalle.api(true).column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 0) {
                        return false;
                    }
                    if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > montoBalance) {
                        infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }

                }
                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }

            }
        });
    };

    var cargaInicial = function () {
        var codigo = ObtenerQueryString("codigo");

        if (codigo != null) {
            listarDatosCanje(codigo);            
        } else {
            $('#cbo_moneda').change();
            $('#monto_total').text('0.00'); 
            $('#divSimuLetras').css("display", "none");            
            $("#grabar").attr("disabled", true);
        }               
    }    

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCliente();
            fillcboMoneda();
            funcionalidad();
            cargatablavacia();
            cargatablavacia2();
            cargatablavacia3();                   
            cargaInicial();
        }
    };

}();

var montoDocumento = function () {

    let moneda = $("#cbo_moneda").val();    

    if (moneda === '0002') {        
        let asTXTDctoOrigen = $(".txtMontoDctoOrigenSoles");
        let iNroReg = asTXTDctoOrigen.length;
        let sMontoTotal = 0;
        for (let i = 0; i < iNroReg; i++) {
            if ($(asTXTDctoOrigen[i]).data("montosol") != '') {
                sMontoTotal += parseFloat($(asTXTDctoOrigen[i]).data("montosol"));
            }
            
        }
        $("#monto_total").text(sMontoTotal.toFixed(2));
    } else {
        let asTXTDctoOrigen = $(".txtMontoDctoOrigenCambio");
        let iNroReg = asTXTDctoOrigen.length;
        let sMontoTotal = 0;
        for (let i = 0; i < iNroReg; i++) {
            if ($(asTXTDctoOrigen[i]).data("montocambio") != '') {
                sMontoTotal += parseFloat($(asTXTDctoOrigen[i]).data("montocambio"));
            }
            
        }
        $("#monto_total").text(sMontoTotal.toFixed(2));
    }
    
}

function RemoveDoc(oInput) {
    oInput.remove();
    montoDocumento();
}

var buscarDocumento = function (btnBuscar) {
    var a = ['cboCliente'];
    if (vErrors(a)) {
       
        $("#documentosModal_title").html("BUSCAR DOCUMENTO DE VENTA");
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMCANJ.ASHX?flag=8&empresa=" + $("#slcEmpresa").val() + "&tipo=C&estado=A&pidm=" + $("#cboCliente").val() + "&sucursal=" + $("#cboEstablecimiento").val(),
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {                
                var json2 = datos;
                oTable.fnClearTable()
                if (json2.length > 0) {
                    oTable.fnAddData(json2);
                    setTimeout(function () {
                        oTable.fnAdjustColumnSizing();
                    }, 300);
                    $('#divBuscarDoc').modal('show');
                    let asClases = $(btnBuscar).attr('class').split(' ');
                    let sNombreClaseFila = asClases[0];
                    clase_boton = sNombreClaseFila;
                } else {
                    infoCustom('No tiene documentos registrados.');
                }
            }
        });          
    }
    
};

function CrearCanje() {
    let asTXTDctoOrigen = $(".txtCodigoDctoOrigen");
    let asTXTMontoOrigen = $(".txtCodMonto");
    let iNroReg = asTXTDctoOrigen.length;

    let flag = 1;
    let empresa = $("#slcEmpresa").val();
    let sucursal = $("#cboEstablecimiento").val();
    let monto = $("#monto_total").text();
    let giradoA = $("#cboCliente").val();
    let lugarGiro = $("#txtLugarGiro").val();
    let nroLetras = $("#txtNroLetras").val();
    let periodoLetras = $("#txtPeriodoLetras").val();
    let fechaGiro = $("#txtFechaGiro").val();
    let fechaCanje = $("#txtFechaCanje").val();    

    let moneda = $("#cbo_moneda").val();
    let girador = $("#slcEmpresa option:selected").attr("data-pidm");    
    let aoLetrasGeneradas = oTable_detalle.fnGetData();
    
   

    let aoDoc = [];
    for (let i = 0; i < iNroReg; i++) {
        let sCodVenta = $(asTXTDctoOrigen[i]).data("codventa");
        let sMontoVenta = $(asTXTMontoOrigen[i]).data("codmonto");
        let oCodVenta = {};
        oCodVenta.sCodVenta = sCodVenta;
        oCodVenta.sMontoVenta = sMontoVenta;
        aoDoc.push(oCodVenta);
    }

    let estado = $('#txtBalanceadoStatus').text();


    var a = ['txtFechaCanje'];
    if (vErrors(a)) {
        if (estado !== 'BALANCEADO') {
            infoCustom('El canje no esta balanceado');
            return;
        }

        var data = new FormData();
        data.append("flag", flag);
        data.append("p_usuario", $('#ctl00_lblusuario').html());
        data.append("p_empresa", empresa);
        data.append("p_sucursal", sucursal);
        
        data.append("p_NRO", "AUTO");
        data.append("p_tipo", "C");
        data.append("p_fechaGiro", fechaGiro);
        data.append("p_lugar", lugarGiro);
        data.append("p_giradoA", giradoA);
        data.append("p_girador", girador);
        data.append("moneda", moneda);
        data.append("p_fechaCanje", fechaCanje);


        data.append("sucursal", $('#cboEstablecimiento').val());
        data.append("p_montoCambio", $('#txt_valor_cambio_Oficial').val());
        data.append("monto", monto);
        data.append("p_nroLetras", nroLetras);
        data.append("p_periodoLetras", periodoLetras);
        data.append("sJsonDetLetras", JSON.stringify(aoLetrasGeneradas));
        data.append("sJsonDetDoc", JSON.stringify(aoDoc));
        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMCANJ.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    alertCustom("Error al intentar Guardar.");
                    return;
                }
                exito();
                let sCodigo = response;
                listarDatosCanje(sCodigo);

            }
        });    
    }



    
}

function listarDatosCanje(codigo) {
    $('#divControles').css("display", "none");    
    $('#divCabeceraSimulacion').css("display", "none"); 
    $('#divDocumentoVenta').css("display", "none");

    $('#divFechaGiro').css("display", "none");
    

    $("#cboCliente").attr("disabled", true);
    $("#cboEstablecimiento").attr("disabled", true);
    $("#slcEmpresa").attr("disabled", true);
    $("#txtCodCanje").val(codigo);
    $("#txtCodCanje").attr("disabled", true);
    $("#txtLugarGiro").attr("disabled", true); 
    $("#txtFechaGiro").attr("disabled", true);         
    $("#txtFechaCanje").attr("disabled", true); 
    $("#txtFechaCanjeView").attr("disabled", true); 
    $("#txt_proveedor").attr("disabled", true); 
    
    
    $("#txtMonto").text($('#monto_total').text());
    $('#divDetalleCanje').css("display", "inline-block"); 
    obtenerDatosCanje(codigo);
    obtenerDocumentoCanje(codigo);
    obtenerLetrasCanje(codigo);
}

function obtenerDatosCanje(codigo) {
    $.ajax({
        type: "POST",
        url: "vistas/GL/ajax/GLMCANJ.ASHX?flag=GET_COD_CANJE&sCodCanje=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            console.log(datos);
            bandera = 1;
            $('#slcEmpresa').val(datos[0].CodEmpresa).change();
            $('#cboEstablecimiento').val(datos[0].CodSucursal).change();
            $('#cboCliente').val(datos[0].idPersona).change();
            $('#txt_proveedor').val(datos[0].PERSONA);
            $('#cbo_moneda').val(datos[0].Moneda).change();
            $("#lblMonDescripcion").text($("#cbo_moneda option:selected").html());
            $("#txtMonto").text(datos[0].Monto);
            $("#txtFechaCanje").datepicker("setDate", datos[0].fechaCanje); 
            $("#txt_proveedor").attr("disabled", true);
            $("#txtFechaCanjeView").datepicker("setDate", datos[0].fechaCanje);             
            $("#lblMoneda").text($('#cbo_moneda :selected').attr('simbolo'));
            $("#spnMoneda").text($('#cbo_moneda :selected').attr('simbolo'));            
            $("#divSimuLetras").fadeIn();       
            $('#titleLetras').css("display", "inline-block"); 
            $('#titleLetras').text("Letras Canjeadas");
            $('#title').css("display", "inline-block"); 
            $('#title').text("Documento Canjeados");
        }
    });
}

function obtenerDocumentoCanje(codigo) {
    $.ajax({
        type: "POST",
        url: "vistas/GL/ajax/GLMCANJ.ASHX?flag=10&sCodCanje=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            var json2 = datos;
            oTable_detalle_documento.fnClearTable()
            if (json2 != null) {
                oTable_detalle_documento.fnAddData(json2);
                setTimeout(function () {
                    oTable_detalle_documento.fnAdjustColumnSizing();
                }, 300);
            }
        }
    });            
}

function obtenerLetrasCanje(codigo) {    
    $.ajax({
        type: "POST",
        url: "vistas/GL/ajax/GLMCANJ.ASHX?flag=9&sCodCanje=" + codigo,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {                        
            var json2 = datos;
            oTable_detalle.fnClearTable()
            if (json2 != null) {
                $("#txtLugarGiro").val(datos[0].LUGAR);
                $("#txtFechaGiro").datepicker("setDate",datos[0].FECHA_GIRO);
                
                json2.filter(function (objectDetalle) {                    
                    objectDetalle.FECHA = objectDetalle.FECHA;
                }); 

                oTable_detalle.fnAddData(json2);
                setTimeout(function () {
                    oTable_detalle.fnAdjustColumnSizing();
                }, 300);                
            }
        }
    });          
}

var GLLCANP = function () {
    var plugins = function () {
        $('#cboEmpresa').select2();
    }

    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            fillTablaLetra();
        });
    }

    var creaTablaVacia = function () {
        var json = null;
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                { data: "PERSONA" },
                {
                    data: "FECHA_CREA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "COD_ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(rowData.SMONEDA + formatoMiles($(td).html()));


                    }
                }
            ],
            "sDom": 'C<"clear">lfrtip',
        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                window.location.href = '?f=GLMCANP&codigo=' + codigo + '&tipo=P';
            }

        });
    }

    var fillTablaLetra = function () {
        let empresa = $('#cboEmpresa').val();
        $.ajax({
            type: "post",
            url: "vistas/gl/ajax/GLMCANJ.ashx?flag=GET_CANJE&tipo=P&empresa=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos.length === 0) {
                    infoCustom("No se encontraron registros.");
                    return;
                }

                oTable.fnAddData(datos);

            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }  

    return {
        init: function () {
            plugins();
            eventos();
            fillCboEmpresa();
            creaTablaVacia();
            fillTablaLetra();
        }
    };

}();

var GLMCANP = function () {

    var plugins = function () {
        $("#slcEmpresa,#cboProveedor,#cbo_moneda, #cboEstablecimiento").select2();
        $("#txtFechaGiro,#txtFechaRegistro, #txtFechaCanje").datepicker();
    }   

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '" data-pidm = "' + datos[i].PIDM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    fillCboEstablecimiento();                    


                } else {
                    $('#slcEmpresa').select2('val', '');
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
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();            
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
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

    var fillCliente = function () {
        let selectEst = $('#cboProveedor');
        let sHTML = "<option></option>";
        selectEst.empty();
        Bloquear("divCboProveedor");
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/CCLLCCL.ASHX?OPCION=4&empresa=" + $('#slcEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divCboProveedor");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        sHTML += `<option value="${datos[i].PIDM}">${datos[i].RSOCIAL}</option>`;
                    }
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        selectEst.html(sHTML);
        //$('#cboCliente').select2('val', '');
    }; 

    var fillcboMoneda = function () {
        $('#cbo_moneda').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_moneda').empty();
                $('#cbo_moneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                $('#cbo_moneda').val(datos[pos].CODIGO);
                ListarValorCambio($('#cbo_moneda').val());
                ListarValorCambioOficial($('#cbo_moneda').val());
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente.");
            }
        });
        $('#cbo_moneda').select2();
    }

    //Obtiene tipo de cambio INTERNO
    function ListarValorCambio(monecode) {
        if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
            monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=INTERNO",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                        $('#lbl_TC').attr("style", "display:block");
                        $('#input_valor_cambio').attr("style", "display:block");
                        $('#lbl_fec_vig').attr("style", "display:block");
                        $('#input_fec_vig').attr("style", "display:block");
                        $('#txt_valor_cambio').val(datos[0].VALOR_CAMBIO_VENTA);
                        $('#txt_fec_vig').val(datos[0].FECHA_VIGENTE);
                    }
                    else {
                        $('#txt_valor_cambio').val("");
                        $('#txt_fec_vig').val("");
                    }
                },
                error: function (msg) {
                    alertCustom("Tipo de cambio Interno no se obtuvo correctamente.");
                }
            });
        }
    }

    //Obtiene tipo de cambio OFICIAL
    function ListarValorCambioOficial(monecode) {
        if (typeof $("#cbo_moneda [data-tipo='MOAL']").val() != "undefined" && $("#cbo_moneda [data-tipo='MOAL']").val() != "") {
            monecode = $("#cbo_moneda [data-tipo='MOAL']").val();

            $.ajax({
                type: "post",
                url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=OFICIAL",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                        $('#lbl_TC_Oficial').attr("style", "display:block");
                        $('#input_valor_cambio_Oficial').attr("style", "display:block");
                        $('#lbl_fec_vig_Oficial').attr("style", "display:block");
                        $('#input_fec_vig_Oficial').attr("style", "display:block");
                        $('#txt_valor_cambio_Oficial').val(datos[0].VALOR_CAMBIO_VENTA);
                        $('#txt_fec_vig_Oficial').val(datos[0].FECHA_VIGENTE);
                    }
                    else {
                        $('#txt_valor_cambio_Oficial').val("");
                        $('#txt_fec_vig_Oficial').val("");
                    }
                },
                error: function (msg) {
                    alertCustom("Tipo de cambio Oficial no se obtuvo correctamente.");
                }
            });
        }
    }

    function cargatablavacia() {
        oTable = $('#tblDocumentos').dataTable({
            data: null,
            columns: [
                {
                    data: "NUMERO_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NPIDM_SUJ",
                },
                {
                    data: { _: "FECHA.display", sort: "FECHA.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_VENC.display", sort: "FECHA_VENC.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NMONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ],
            scrollCollapse: false,
            paging: false,
            info: false,
            "order": [3, 'asc']
            //sort: false,            
        });

        $('#tblDocumentos').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblDocumentos_filter').css('display', 'none');
        $('#tblDocumentos thead, tfoot').css("background", "gainsboro");

        $('#tblDocumentos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);

                let documento = (row.DOCUMENTO).substring(0, 1) + '/' + row.NUMERO_DOC + ' - ' + row.MONEDA_CORTA;

                let asTXTDctoOrigen = $(".txtCodigoDctoOrigen");
                let iNroReg = asTXTDctoOrigen.length;
                let sCodVenta = row.CODIGO;
                let sCodMonto = row.MONTO;
                let sCodMOBA = '0002';
                let sCodMonDoc = row.MONEDA;
                let montoDoc = row.MONTO;
                let montoMonNacional = 0;
                let montoMonExtranjera = 0;
                let tipoCambio = $('#txt_valor_cambio_Oficial').val();
                let bExiste = false;

                for (let i = 0; i < iNroReg; i++) {
                    if ($(asTXTDctoOrigen[i]).data("codventa") == sCodVenta) {
                        bExiste = true;
                        break;
                    }
                }

                if (sCodMOBA === sCodMonDoc) {
                    montoMonNacional = parseFloat(montoDoc);
                    montoMonExtranjera = parseFloat(montoDoc) / parseFloat(tipoCambio);
                } else {
                    montoMonNacional = parseFloat(montoDoc) * parseFloat(tipoCambio);
                    montoMonExtranjera = parseFloat(montoDoc);
                }

                if (bExiste) {
                    infoCustom('El documento ya ha sido agregado');
                } else {
                    $("." + clase_boton + ".txtSerieNroDctoOrigen").val(documento);
                    $("." + clase_boton + ".txtMontoDctoOrigenSoles").val('S/ ' + montoMonNacional);
                    $("." + clase_boton + ".txtMontoDctoOrigenCambio").val('US$ ' + montoMonExtranjera.toFixed(2));
                    $("." + clase_boton + ".txtCodigoDctoOrigen").val(sCodVenta);
                    $("." + clase_boton + ".txtCodMonto").val(sCodMonto);
                    $("." + clase_boton + ".txtCodigoDctoOrigen").data('codventa', sCodVenta);
                    $("." + clase_boton + ".txtCodMonto").data('codmonto', sCodMonto);

                    $("." + clase_boton + ".txtMontoDctoOrigenSoles").data('montosol', montoMonNacional);
                    $("." + clase_boton + ".txtMontoDctoOrigenCambio").data('montocambio', montoMonExtranjera);

                    montoDocumento();
                    $('#divBuscarDoc').modal('hide');
                    $("#btnGenerar").attr("disabled", false);
                }
            }
        });
    }

    var cargatablavacia2 = function () {
        oTable_detalle = iniciaTabla('tblDetalle', {
            data: null,
            columns: [
                {
                    data: "NRO_DOC_DETALLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "NRO_DIAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort: false,
            preDrawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var columnaFechas = 2;
                var dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                // actualiza fecha
                api.column(columnaFechas, { page: 'current' }).data().filter(function (e, d) {
                    var valor = dFechaInicial.addDays(parseInt(api.data()[d].NRO_DIAS)).format("dd/MM/yyyy");
                    api.data()[d].FECHA = valor;
                    $($(rows).eq(d).children()[columnaFechas]).html(valor);
                });
            },
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                api.column(3, { page: 'current' }).data().filter(function (e, d) {
                    $($(rows).eq(d).children()[3]).html(formatoMiles(e));
                });
            },

            footerCallback: function (row, data, start, end, display) {
                var api = this.api();
                let spnStatus = $("#txtBalanceadoStatus");
                if (data.length > 0) {
                    let fSumaTotalTabla = api.column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (montoBalance === fSumaTotalTabla) {
                        spnStatus.text("BALANCEADO");
                        spnStatus.removeClass("noBalanceado").addClass("balanceado");
                    } else {
                        spnStatus.text("NO BALANCEADO");
                        spnStatus.removeClass("balanceado").addClass("noBalanceado");
                    }
                }
            }

        });

        $('#tblDetalle').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblDetalle_filter').css('display', 'none');

    }

    var cargatablavacia3 = function () {
        oTable_detalle_documento = iniciaTabla('tblDetalleDocumento', {
            data: null,
            columns: [
                {
                    data: "COD_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).attr('data-type-decimal', true);
                    },
                    type: "formatoMiles"
                }
            ],
            scrollCollapse: true,
            paging: false,
            info: false,
            sort: false,
        });

        $('#tblDetalleDocumento').removeAttr('style').attr("style", "border-style: hidden;");
        $('#tblDetalleDocumento_filter').css('display', 'none');

    }

    var editaTabla = function () {

        oTable_detalle.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [
                {
                    cssclass: "required letras",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                },
                {
                    cssclass: "required number dias",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {
                //if ($(input.parents("form")[0]).hasClass("letras")) {
                //    if (input[0].value === '') {
                //        infoCustom("Ingrese el numero de letra.");
                //        input[0].value = original;
                //        $(input.parents("form")[0]).submit();
                //    } else {
                //        if (oTable_detalle.api(true).column(0).data().indexOf(input[0].value) >= 0) {
                //            infoCustom("Ingrese numero de letra ya ha sido ingresado.");
                //            input[0].value = original;
                //            $(input.parents("form")[0]).submit();
                //        } else {
                //            return true;
                //        }
                        
                //    }
                //}
                if ($(input.parents("form")[0]).hasClass("letras")) {
                    /* if (input[0].value === '' && original!=='') {
                         infoCustom("Ingrese el numero de letra.");
                         input[0].value = original;
                         $(input.parents("form")[0]).submit();
                     } else {*/
                    if (oTable_detalle.api(true).column(0).data().indexOf(input[0].value) >= 0 && input[0].value != original && input[0].value !== '') {
                        infoCustom("El numero de letra ya ha sido ingresado.");
                        input[0].value = original;
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                    // }
                }

                if ($(input.parents("form")[0]).hasClass("monto")) {
                    let fSumaTotalTabla = oTable_detalle.api(true).column(3).data().reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                    if (parseFloat(input[0].value) < 0) {
                        return false;
                    }
                    if ((fSumaTotalTabla - parseFloat(original) + parseFloat(input[0].value)) > montoBalance) {
                        infoCustom("La sumatoria del monto de letras a generar no puede ser superior al del monto original.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }

                }
                if ($(input.parents("form")[0]).hasClass("dias")) {
                    if (parseInt(input[0].value) > nPlazoDiasLinea) {
                        infoCustom("La cantidad de días no puede superar el plazo de la línea de crédito.");
                        input[0].value = parseFloat(original);
                        $(input.parents("form")[0]).submit();
                    } else {
                        return true;
                    }
                }

            }
        });
    };

    var editaTablaNro = function () {

        oTable_detalle.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [
                {
                    cssclass: "required letras",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                },
                null, null, null
            ],
            fnOnEditing: function (input, settings, original) {                
                if ($(input.parents("form")[0]).hasClass("letras")) {
                    if (input[0].value === '') {
                        infoCustom("Ingrese el numero de letra.");    
                        input[0].value = original;
                        $(input.parents("form")[0]).submit();
                    } else {
                        if (oTable_detalle.api(true).column(0).data().indexOf(input[0].value) >= 0 && input[0].value != original) {
                            infoCustom("Ingrese numero de letra ya ha sido ingresado.");
                            input[0].value = original;
                            $(input.parents("form")[0]).submit();
                        } else {
                            return true;
                        }
                    }
                }

            }
        });
    };

    var fnGetLineaCredito2 = function (tipo, pidm, empresa) {
        if (tipo === 'C') {//cliente
            var msgCargaAsync;
            $.ajax({
                type: "GET",
                url: "vistas/NC/estereotipos/ajax/Cliente.ASHX",
                data: {
                    flag: 7,
                    pidm: pidm,
                    empr: empresa
                },
                contentType: "application/json;",
                dataType: "json",
                beforeSend: function () {
                    msgCargaAsync = $.gritter.add({
                        text: '<img src="./recursos/img/loading.svg" > Obteniendo Linea de Crédito ...',
                        position: 'bottom-right',
                        sticky: true,
                        time: ''
                    });
                    $("#btnSimular").attr("disabled", true);
                },
                async: true,
                success: function (datos) {
                    var modeda = '';
                    if (datos != "" & datos != null) {
                        nPlazoDiasLinea = datos[0].PLAZO;
                    } else {
                        infoCustom("El cliente no cuenta con línea de crédito vigente.");
                    }
                },
                complete: function () {
                    $.gritter.remove(msgCargaAsync, {
                        fade: true,
                        speed: 'slow'
                    });
                    $("#btnSimular").attr("disabled", false);
                },
                error: function () {
                    alertCustom("Error al obtener datos de línea de crédito del Cliente.");
                }
            });
        } else { //proveedor
            var msgCargaAsync;
            $.ajax({
                type: "GET",
                url: "vistas/NC/estereotipos/ajax/Proveedor.ASHX",
                data: {
                    flag: 7,
                    pidm: pidm,
                    empr: empresa
                },
                contentType: "application/json;",
                dataType: "json",
                beforeSend: function () {
                    msgCargaAsync = $.gritter.add({
                        text: '<img src="./recursos/img/loading.svg" > Obteniendo Linea de Crédito ...',
                        position: 'bottom-right',
                        sticky: true,
                        time: ''
                    });
                    $("#btnSimular").attr("disabled", true);
                },
                async: true,
                success: function (datos) {
                    var modeda = '';
                    if (datos != "" & datos != null) {
                        nPlazoDiasLinea = datos[0].PLAZO;
                    } else {
                        infoCustom("El cliente no cuenta con línea de crédito vigente.");
                    }
                },
                complete: function () {
                    $.gritter.remove(msgCargaAsync, {
                        fade: true,
                        speed: 'slow'
                    });
                    $("#btnSimular").attr("disabled", false);
                },
                error: function () {
                    alertCustom("Error al obtener datos de línea de crédito del Cliente.");
                }
            });
        }
    }    

    function filltxtproveedor(v_ID, v_value) {
        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=3&p_scl=" + $('#slcEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    selectRazonSocial.typeahead({
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","DIRECCION":"' + datos[i].DIRECCION + '","PIDM":"' + datos[i].PIDM + '","ID":"' + datos[i].ID + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);
                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);
                        },
                        updater: function (item) {
                            $("#hfPIDM").val(map[item].PIDM);
                            fnGetLineaCredito2('P', $('#hfPIDM').val(), $('#slcEmpresa').val());
                            return item;
                        },

                    });

                    selectRazonSocial.keyup(function (e) {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($(this).val().length <= 0) {

                            $("#hfPIDM").val('');
                            let asTXTDctoOrigen = $(".txtCodigoDctoOrigen");
                            let asTXTMontoSol = $(".txtMontoDctoOrigenSoles");
                            let asTXTMontoDolar = $(".txtMontoDctoOrigenCambio");
                            let iNroReg = asTXTDctoOrigen.length;

                            for (let i = 0; i < iNroReg; i++) {
                                $(asTXTDctoOrigen[i]).data("codventa", "");
                                $(asTXTMontoSol[i]).data("montosol", "");
                                $(asTXTMontoDolar[i]).data("montocambio", "");
                            }

                            $('.txtSerieNroDctoOrigen').val('');
                            $('.txtMontoDctoOrigenSoles').val('');
                            $('.txtMontoDctoOrigenCambio').val('');

                            $('#cbo_moneda').val('0002').change();

                            $('#monto_total').text('0.00');
                            $("#txtFechaGiro").val('');
                            $("#txtNroLetras").val('');
                            $("#txtLugarGiro").val('');
                            $("#txtPeriodoLetras").val('');

                            $("#uniform-chkLetrasFijas span").removeClass();
                            $("#chkLetrasFijas").attr("checked", false);
                            let spnStatus = $("#txtBalanceadoStatus");
                            spnStatus.text("NO BALANCEADO");
                            spnStatus.removeClass("balanceado").addClass("noBalanceado");

                            oTable_detalle.fnClearTable();
                            $("#divSimuLetras").fadeOut();
                            $("#btnGenerar").attr("disabled", true);
                            $(".search").attr("disabled", false);
                            $(".add").attr("disabled", false);
                            $(".delete").attr("disabled", false);
                            $("#cbo_moneda").attr("disabled", false);
                            $('#title').css("display", "none");
                            $('#titleLetras').css("display", "none");
                            $("#grabar").attr("disabled", true);
                            if ($('#txt_proveedor').val() === '') {
                                return;
                            }

                        }
                    });
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var cargarCombos = function () {
        $.ajaxSetup({ async: false });
        $("#slcEmpresa").select2();
        $.post("vistas/GL/ajax/GLMCANJ.ASHX", { flag: 5 },
            function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {
                    $("#slcEmpresa").html(res);
                }           
            });
        $.ajaxSetup({ async: true });
    
        $("#slctipodc").select2().change(function () {
            limpiarTodo();
        });
    }


    var dataTable = function () {
        cargatablavacia();
    }

    var funcionalidad = function () {

        $('#slcEmpresa').on('change', function () {
            fillCboEstablecimiento();
            $("#txt_proveedor").remove();        
            $("#input_desc_prod").html("<input id='txt_proveedor' class='span12' type='text' />");
            var codigo = ObtenerQueryString("codigo");
            if (codigo != null) {
                $("#txt_proveedor").attr("disabled", true);
            } else {
                filltxtproveedor("#txt_proveedor", ""); 
            } 
                           

        });

        $('#cbo_moneda').on('change', function () {
            ListarValorCambio($('#cbo_moneda').val());
            ListarValorCambioOficial($('#cbo_moneda').val());
            $('#simbolo_moneda').text($('#cbo_moneda :selected').attr('simbolo'));
            montoDocumento();
        });

        var i = 0;
        $("#btnAgregarDctoOrigen").click(function () {
            $("#prueba").append("<div class='row-fluid div_mas_dctoreg' id='div_mas_dctoreg_" + (i = i + 1) + "'>\
            <div class='span12'>\
            <div class='span2'></div>\
            <div class='span8'><div class='control-group'>\
            <div class='controls'>\
            \
            <input id='txtSerieNroDctoOrigen" + (i) + "' class='fila_" + (i) + " txtSerieNroDctoOrigen span6'  type='text' disabled style='text-align: left'/>\
            <input id='txtMontoDctoOrigenSoles" + (i) + "' class='fila_" + (i) + " txtMontoDctoOrigenSoles span3' data-montosol='' type='text' disabled style='text-align: center' />\
            <input id='txtMontoDctoOrigenCambio" + (i) + "' class='fila_" + (i) + " txtMontoDctoOrigenCambio span3' data-montocambio='' type='text' disabled style='text-align: center' />\
            <input id='txtCodigoDctoOrigen_" + (i) + "' class='fila_" + (i) + " txtCodigoDctoOrigen' data-codventa='' type='hidden'/>\
            <input id='txtCodMonto_" + (i) + "' class='fila_" + (i) + " txtCodMonto' data-codmonto='' type= 'hidden' />\
            </div></div></div><div class='span2'>\
            <div class='control-group'><div class='controls quitar'><button type='button' id='btnBuscadocs_" + (i) + "' onclick=buscarDocumento2(this) class='fila_" + (i) + " btn blue search' data-toggle='modal' data-target='#muestralistap'>\
            <i class='icon-search' style='line-height: initial;'></i></button>&nbsp;\
            <button type='button' id='btn_quitar_" + (i) + "' class='fila_" + (i) + " btn red btn-quitar delete' onclick='RemoveDoc($(this).parent().parent().parent().parent().parent());'><i class='icon-minus'  style='line-height: initial;'></i></button>\
            </div></div></div></div></div>");
        });      

        $("#txtFechaRegistro").datepicker("setDate", new Date()).attr("disabled", true);

        $("#btnSimular").click(function () {
            if (!vErrorBodyNotIcon(["txtNroLetras", "txtFechaGiro"])) {
                $("#grabar").attr("disabled", false);
                let dFechaInicial = new Date($("#txtFechaGiro").datepicker("getDate"));
                let nroLetras = parseInt($("#txtNroLetras").val());
                let bLetrasFijas = $("#chkLetrasFijas").is(":checked");
                let dFechaMaxima = dFechaInicial.addDays(nPlazoDiasLinea);
                montoBalance = parseFloat($('#monto_total').text());
                var objArrayLetrasGen = new Array();
                var suma = 0;

                //.format("dd/MM/yyyy")
                if (bLetrasFijas) {
                    if (!vErrorBodyNotIcon(["txtPeriodoLetras"])) {
                        let nPeriodoLetras = parseInt($("#txtPeriodoLetras").val());
                        if ((nPeriodoLetras * nroLetras) <= nPlazoDiasLinea) {
                            for (var i = 0; i < nroLetras; i++) {
                                let objJsonLetraGen = {};
                                objJsonLetraGen.NRO_DOC_DETALLE = 'Ingrese Nro de Letra (Doble click)';
                                objJsonLetraGen.NRO_DIAS = nPeriodoLetras * (i + 1);
                                objJsonLetraGen.FECHA = dFechaInicial.addDays(nPeriodoLetras * (i + 1)).format("dd/MM/yyyy");
                                if (i === nroLetras - 1) {
                                    objJsonLetraGen.MONTO = montoBalance - suma;
                                } else {
                                    suma += (montoBalance / nroLetras).Redondear(2);
                                    objJsonLetraGen.MONTO = (montoBalance / nroLetras).Redondear(2);
                                }                                
                                objArrayLetrasGen.push(objJsonLetraGen);
                            }
                        } else {
                            infoCustom("Número de letras con periodo ha superado al plazo de la línea de crédito.");
                        }
                    } else {
                        infoCustom("Ingrese los campos requeridos!");
                    }

                } else {

                    for (var i = 0; i < nroLetras; i++) {
                        let objJsonLetraGen = {};
                        objJsonLetraGen.NRO_DOC_DETALLE = 'Ingrese Nro de Letra (Doble click)' ;
                        objJsonLetraGen.NRO_DIAS = 0;
                        objJsonLetraGen.FECHA = "";
                        objJsonLetraGen.MONTO = 0;
                        objArrayLetrasGen.push(objJsonLetraGen);
                    }

                }

                oTable_detalle.fnClearTable();
                if (objArrayLetrasGen.length > 0) {
                    oTable_detalle.fnAddData(objArrayLetrasGen);
                    if (!bLetrasFijas) {
                        editaTabla();
                    } else {
                        editaTablaNro();
                    }
                }

            } else {
                infoCustom("Ingrese los campos requeridos!");
            }
        });

        $("#chkLetrasFijas").on("click", function () {
            if ($(this).is(":checked")) {
                $("#txtPeriodoLetras").attr("disabled", false);
            } else {
                $("#txtPeriodoLetras").val("");
                $("#txtPeriodoLetras").attr("disabled", true);
            }
        });

        $('#btnGenerar').on('click', function () {            
            $('#titleLetras').css("display", "inline-block");
            $('#titleLetras').text("Simulación de Letras");
            $("#cbo_moneda").attr("disabled", true);
            $(".search").attr("disabled", true);
            $(".add").attr("disabled", true);
            $(".delete").attr("disabled", true);
            setTimeout(function () {
                oTable_detalle.fnAdjustColumnSizing();
            }, 200);
            $("#divSimuLetras").fadeIn();
        });
    }


    var cargaInicial = function () {  
        var codigo = ObtenerQueryString("codigo");
        if (codigo != null) {
            listarDatosCanje(codigo);
        } else {
            console.log($("#ctl00_hddestablecimiento").val());
            $("#grabar").attr("disabled", true);
            $("#slcEmpresa").val($("#ctl00_hddctlg").val()).change();
            //$("#cboEstablecimiento").val($("#ctl00_hddestablecimiento").val()).change();
            //$("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());            
            $("#slcEmpresa").change();
            $('#cbo_moneda').change();
            $('#monto_total').text('0.00');
            $('#divSimuLetras').css("display", "none");
        }     
    }

   
    return {
        init: function () {    
            plugins();
            fillCboEmpresa();
            fillCliente();
            fillcboMoneda();
            funcionalidad();
            cargatablavacia();
            cargatablavacia2();
            cargatablavacia3();            
            cargaInicial();
        }
    };

}();

var buscarDocumento2 = function (btnBuscar) {
    var a = ['txt_proveedor'];
    if (vErrors(a)) {

        $("#documentosModal_title").html("BUSCAR DOCUMENTO DE COMPRA");
        $.ajax({
            type: "POST",
            url: "vistas/GL/ajax/GLMCANJ.ASHX?flag=8&empresa=" + $("#slcEmpresa").val() + "&tipo=P&estado=A&pidm=" + $("#hfPIDM").val() + "&sucursal=" + $("#cboEstablecimiento").val(),
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                var json2 = datos;
                oTable.fnClearTable()
                if (json2.length > 0) {
                    oTable.fnAddData(json2);
                    setTimeout(function () {
                        oTable.fnAdjustColumnSizing();
                    }, 300);
                    $('#divBuscarDoc').modal('show');
                    let asClases = $(btnBuscar).attr('class').split(' ');
                    let sNombreClaseFila = asClases[0];
                    clase_boton = sNombreClaseFila;
                } else {
                    infoCustom('No tiene documentos registrados.');
                }
            }
        });
    }

};

function CrearCanjePagar() {
    let aoLetrasGeneradas = oTable_detalle.fnGetData();
    let letras = JSON.stringify(aoLetrasGeneradas);
    let cont = 0;    
    for (let i = 0; i < aoLetrasGeneradas.length; i++) {
        let sCodLetra = aoLetrasGeneradas[i].NRO_DOC_DETALLE;
        if (sCodLetra === 'Ingrese Nro de Letra (Doble click)') {
            cont++;
        } 
    }

    // HACER EL REGISTRO DE CANJE DE LETRAS
    if (cont === 0) {
        let asTXTDctoOrigen = $(".txtCodigoDctoOrigen");
        let asTXTMontoOrigen = $(".txtCodMonto");
        let iNroReg = asTXTDctoOrigen.length;

        let flag = 11;
        let empresa = $("#slcEmpresa").val();
        let sucursal = $("#cboEstablecimiento").val();
        let monto = $("#monto_total").text();
        let giradoA = $("#slcEmpresa option:selected").attr("data-pidm");
        let lugarGiro = $("#txtLugarGiro").val();
        let nroLetras = $("#txtNroLetras").val();
        let periodoLetras = $("#txtPeriodoLetras").val();
        let fechaGiro = $("#txtFechaGiro").val();
        let moneda = $("#cbo_moneda").val();
        let girador = $("#hfPIDM").val();
        let fechaCanje = $("#txtFechaCanje").val();   
        

        let aoLetrasGeneradas = oTable_detalle.fnGetData();



        let aoDoc = [];
        for (let i = 0; i < iNroReg; i++) {
            let sCodVenta = $(asTXTDctoOrigen[i]).data("codventa");
            let sMontoVenta = $(asTXTMontoOrigen[i]).data("codmonto");
            let oCodVenta = {};
            oCodVenta.sCodVenta = sCodVenta;
            oCodVenta.sMontoVenta = sMontoVenta;
            aoDoc.push(oCodVenta);
        }

        let estado = $('#txtBalanceadoStatus').text();

        var a = ['txtFechaCanje'];
        if (vErrors(a)) {
            if (estado !== 'BALANCEADO') {
                infoCustom('El canje no esta balanceado');
                return;
            }

            var data = new FormData();
            data.append("flag", flag);
            data.append("p_usuario", $('#ctl00_lblusuario').html());
            data.append("p_empresa", empresa);
            data.append("p_sucursal", sucursal);
            data.append("p_NRO", "AUTO");
            data.append("p_tipo", "P");
            data.append("p_fechaGiro", fechaGiro);
            data.append("p_lugar", lugarGiro);
            data.append("p_giradoA", girador);
            data.append("p_girador", giradoA);
            data.append("sucursal", $('#cboEstablecimiento').val());
            data.append("p_fechaCanje", fechaCanje);
            data.append("moneda", moneda);
            data.append("p_montoCambio", $('#txt_valor_cambio_Oficial').val());
            data.append("monto", monto);
            data.append("p_nroLetras", nroLetras);
            data.append("p_periodoLetras", periodoLetras);
            data.append("sJsonDetLetras", JSON.stringify(aoLetrasGeneradas));
            data.append("sJsonDetDoc", JSON.stringify(aoDoc));
            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/GL/ajax/GLMCANJ.ASHX",
                contentType: false,
                data: data,
                processData: false,
                async: false,
                success: function (response) {
                    Desbloquear("ventana");
                    if (response == "") {
                        noexito();
                        return;
                    }
                    if (response.indexOf("[Advertencia]:") > -1) {
                        alertCustom(response);
                        return;
                    }
                    if (response.indexOf("[Error]:") > -1) {
                        sException = response;
                        alertCustom("Error al intentar Guardar.");
                        return;
                    }
                    exito();
                    let sCodigo = response;
                    listarDatosCanje(sCodigo);

                }
            });
        }
        
    } else {
        infoCustom('Ingrese todos los Números de letras,');
    }    

    
    
}



















































function cargatablavacia() {

    oTable_detalle = iniciaTabla('tblDetalle', {
        data: null,
        columns: [
            {
                data: "DETALLE_IND",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "NRO_DOC_DETALLE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

            {
                data: "GLOSA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

            {
                data: { _: "FECHA_EMISION.display", sort: "FECHA_EMISION.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    if (auxiliar4 != '') {
                        $(td).html(auxiliar4 + formatoMiles($(td).html())).attr("align","right");
                    }
                }
            },
            {
                data: null,
                defaultContent: '  <input type="checkbox" class="slcChk" />',
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }

            }
        ],
        scrollCollapse: true,
        paging: false,
        info: false,
        "order": [3, 'asc'],
        //sort: false,
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };


            // Update footer
            //$(api.column(5).footer()).css("color", "black");

            //$(api.column(5).footer()).html(

            //           auxiliar4 + formatoMiles("0")

            // );
            //montoCanjear = 0;
        }

    });

    $('#tblDetalle').removeAttr('style').attr("style", "border-style: hidden;");
    $('#tblDetalle_filter').css('display', 'none');
    $('#tblDetalle thead, tfoot').css("background", "gainsboro");
    
    $('#tblDetalle tbody').on('click', 'tr', function () {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTable_detalle.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTable_detalle.fnGetPosition(this);
            var row = oTable_detalle.fnGetData(pos);
            auxiliar3 = JSON.stringify(row);
            fila = pos;

        }

    });
    $('#tblDetalle tbody').on('click', '.slcChk', function () {

        var pos = oTable_detalle.api(true).row($(this).parents("tr")[0]).index();
        var row = oTable_detalle.fnGetData(pos);
        var texto = auxiliar5;

        if ($(this).is(":checked")) {
            montoCanjear += parseFloat(row.MONTO).Redondear(2);
            texto += ("|" + row.COD_DETALLE + "," + row.NRO_DOC_DETALLE + "," + row.DETALLE_IND.substring(0, 1));
        } else {
            montoCanjear -= parseFloat(row.MONTO);
            var aux = texto.split("|");
            var cadenaActual=row.COD_DETALLE + "," + row.NRO_DOC_DETALLE + "," + row.DETALLE_IND.substring(0,1);
            aux.filter(function (e, d) { if (e == cadenaActual) aux.splice(d, 1);})
            texto = aux.join("|");
        }

        if (parseFloat($("#lblmonto_cont").html().split(",").join("")) == montoCanjear) {
            $(oTable_detalle.api(true).column(4).footer()).css("color", "green");
            $("#hddpagado").val('S');
        } else {
            $(oTable_detalle.api(true).column(4).footer()).css("color", "red");
            $("#hddpagado").val('N');
        }
        $(oTable_detalle.api(true).column(4).footer()).html(

                   auxiliar4 + formatoMiles(montoCanjear)

         );
        auxiliar5 = texto;
    });

}

fila = 0;

function CargaTabla_detalle(cod) {    
    let empresa = $("#slcEmpresa").val();
    _texto = "";
    $.ajax({
        type: "POST",
        url: "vistas/GL/ajax/GLMCANJ.ASHX?codigo=" + cod + "&flag=3&empresa=" + empresa + "&tipo=" + tipoP,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            console.log(datos);
            oTable_detalle.fnClearTable();
            if (datos != "" && datos != null) {

                var json = datos;

                json.filter(function (e) {


                    var n2 = e.NRO_DOC_DETALLE;
                    var n3 = e.DETALLE_IND.substring(0, 1);
                    _texto += ("|" + e.COD_DETALLE + "," + n2 + "," + n3);

                });



                oTable_detalle.fnAddData(json);


            }
        }
    });
    auxiliar5 = _texto;
}

function funcionRegistro(r) {
    console.log(r);
    var texto2 = '';
    if (ref == 'M') {
        
        $("#txtnumdoc").val(r.NUMERO_DOC);

        $("#lblref").html((r.TIPO == 'P' ? 'Proveedor' : 'Cliente') + ' :');

        $("#lblref_cont").html(r.NPIDM_SUJ);

        $("#lbldoc").html((r.DOCUMENTO_PERSONA.length > 8 ? 'RUC' : 'DNI') + ' :');

        $("#lbldoc_cont").html(r.DOCUMENTO_PERSONA);

        $("#lblmonto").html('Monto (' + r.NMONEDA + ')' + ' :');

        $("#lblmonto_cont").html(formatoMiles(r.MONTO));

        auxiliar6 = r.SMONEDA;

        texto2 += ("|" + r.CODIGO + "," + r.TIPO);

        

       auxiliar7 = texto2;

        $("#documentosModal").modal('hide');

        auxiliar = r;

        tipoP = r.TIPO;

        CargaTabla_detalle(r.CODIGO);

        ref = 'D';
        var moneda = auxiliar.MONEDA;
        var tipod = auxiliar.TIPO;
        var tipodn = auxiliar.NTIPO;
        var pidm = auxiliar.PIDM;

        
        
        if (!cargini) {
            console.log('entra aqui 1');
            buscaDocumento(tipo=="F"?"L":"F", "N", moneda, tipod, tipodn, "", pidm, oTable_detalle);
        }
        

    }
   /* if (ref == 'D') {
        auxiliar2 = JSON.stringify(r);

        var body = "Está seguro de agregar la " + ($("#slctipodc").val() == "L" ? "FACTURA" : "LETRA") + ' ' + r.NUMERO_DOC;
        $("#confirmacionModal_body").html(body);
        $("#documentosModal").modal('hide');
        $("#confirmacionModal").modal('show');



    }*/
}

function confirmacion() {

    crearmodal("confirmacionModal",
                       "CONFIRMACION",
                       "",
                       ' <button type="button" id="rptano" class="btn">No</button><button  type="button" id="rptasi"  class="btn blue">Si</button>');



    $("#rptasi").click(function () {
        CrearDetalle($.parseJSON(auxiliar2));

        $("#confirmacionModal").modal('hide');
    });

    $("#rptano").click(function () {

        $("#documentosModal").modal('show');
        $("#confirmacionModal").modal('hide');
    });
}

function CrearDetalle(r2) {

    
    var codigo_detalle = r2.CODIGO;

    var detalle_ind = r2.DOCUMENTO;

    var nro_detalle = r2.NUMERO_DOC.indexOf("F/.") < 0 ? r2.NUMERO_DOC : r2.NUMERO_DOC.split("F/.")[1];
            var _json = {
            "ITEM": "",
            "NUMERO_DOCUMENTO": "",
            "DOC_IND": "",
            "FECHA_EMISION":
                {
                    "display": r2.FECHA.display,
                    "order": parseInt(r2.FECHA.order)
                },
            "MONTO": r2.MONTO,
            "NRO_DOC_DETALLE": nro_detalle,
            "GLOSA": r2.GLOSA,
            "COD_DETALLE": r2.CODIGO,
            "DETALLE_IND": detalle_ind
        };
           
        
        oTable_detalle.fnAddData(_json);
 
}

function limpiarTodo() {
    $("#txtnumdoc").val("");
    $(".cont").html("");
    oTable_detalle.fnClearTable();
    var api=oTable_detalle.api(true);
    $(api.column(5).footer()).css("color", "black");

    $(api.column(5).footer()).html(

               auxiliar4 + formatoMiles("0")

     );
    montoCanjear = 0;
}

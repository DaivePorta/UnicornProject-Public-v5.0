var NOLANUL = function () {
    var ajaxProducto = null;

    var plugins = function () {
        $('#cbo_Emp, #cbo_establecimiento, #cboTipoDcto,#cboProducto,#cboEstado,#cboProveedor').select2();
        $('#txtFechaEmisionI, #txtFechaEmisionF').datepicker({ format: 'dd/mm/yyyy' });
        $('#txtFechaEmisionI, #txtFechaEmisionF').datepicker();
        $('#txtFechaEmisionI').datepicker().change(function () {
            $('#txtFechaEmisionF').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtFechaEmisionF').val().split("/").reverse().join(""))) ? "" : $('#txtFechaEmisionF').val());
            $('#txtFechaEmisionF').datepicker('setStartDate', $(this).val());
        });
        $('#txtFechaEmisionF').datepicker().on("change", function () {
            if ($('#txtFechaEmisionI').val() !== "") {
                $('#txtFechaEmisionF').datepicker('setStartDate', $('#txtFechaEmisionI').val());
            }
        });
    };
    
    var eventoControles = function () {
        $('#cbo_Emp').on('change', function () {
            ListarEstablecimiento();
            if (ajaxProducto) {
                ajaxProducto.abort();
            }
            fillProducto();
            $('#cboProducto').select2("val", "");

            fnCargarProveedores();
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtFechaEmisionI").val().trim() == "" && $("#txtFechaEmisionF").val().trim() == "") {
                ListarTodoGeneral();
            } else if ($("#txtFechaEmisionI").val().trim() != "" && $("#txtFechaEmisionF").val().trim() != "") {
                ListarTodoGeneral();
            } else {
                infoCustom2("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });
    };
    
    var cargarEmpresas = function () {
        Bloquear("divCboEmpresa");
        $('#cbo_Emp').html('<option></option>');
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divCboEmpresa");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_Emp').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_Emp').select2("val", $("#ctl00_hddctlg").val());
                }
            },
            error: function (msg) {
                Desbloquear("divCboEmpresa");
                alertCustom("Empresas no se listaron correctamente.")
            }
        });
    };

    var ListarEstablecimiento = function () {
        $('#cbo_establecimiento').html('<option></option>');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + $("#cbo_Emp").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divCboEstablecimiento");
                if (datos !== null) {
                    //$('#cbo_establecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_establecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_establecimiento').val($('#ctl00_hddestablecimiento').val()).change();
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente.")
            }
        });
    };

    var fillcboRegistroEspecifico = function (opcion) {
        $('#cboTipoDcto').html('<option value="" selected>TODOS</option>');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG_CODE=" + $("#cbo_Emp").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoDcto').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar documentos de registro');
            }
        });
        $('#cboTipoDcto').val("").change();
    };

    var fillProducto = function () {
        var selectEst = $('#cboProducto');
        Bloquear("divCboProducto");
        ajaxProducto = $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMDOCC.ashx?OPCION=LISTAR_PRODUCTOS&CTLG_CODE=" + $("#cbo_Emp").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboProducto");
                selectEst.html('');
                // selectEst.append('<option></option>');
                if (datos !== null) {
                    $('#cboProducto').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE_COMERCIAL + '</option>');
                    }
                    $('#cboProducto').select2('val', 'TODOS');
                } else {
                    selectEst.html('<option></option>');
                    $('#cboProducto').select2('val', '');
                }
            },
            error: function (msg) {
                Desbloquear("divCboProducto");
                if (msg.statusText != "abort") {
                    alertCustom('Error al cargar productos');
                }
            }
        });
    };

    var fnCargarProveedores = function () {
        var sCodEmpresa = $("#cbo_Emp").val();
        $("#cboProveedor").html(`<option value=0>TODOS</option>`);
        $.ajax({
            type: "post",
            url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=LPROV&CTLG_CODE=" + sCodEmpresa,
            async: false,
            beforeSend: function () { Bloquear($($("#cboProveedor").parents("div")[0])) },
            success: function (data) {

                if (data.length === 0) {
                    return;
                }
                
                $.each(data, function (i, val) {
                    $("#cboProveedor").append(`<option value=${val.PIDM}>${val.RAZON_SOCIAL}</option>`);
                });
                
            },
            error: function (msg) {
                alertCustom('Error al cargar Proveedores.');
            },
            complete: function () {
                Desbloquear($($("#cboProveedor").parents("div")[0]));
            }
        });
    };
        
    var ListarTodoGeneral = function () {

        var CTLG_CODE = $("#cbo_Emp").val();
        var SCSL_CODE = $("#cbo_establecimiento").val();
        var TIPO_DCTO = ($("#cboTipoDcto").val() == "TODOS") ? '' : $("#cboTipoDcto").val();
        var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
        var DESDE = $("#txtFechaEmisionI").val();
        var HASTA = $("#txtFechaEmisionF").val();
        var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
        var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();

        var SERIE = $("#txtSerie").val();
        var NUM_DCTO = $("#txtNumero").val();
        var PROV_PIDM = $("#cboProveedor").val();

        var COMPLETO_IND = "S";

        Bloquear("ventana");
        $('#tabla_general').DataTable().destroy();
        $("#tabla_general").DataTable({
            ajax: {
                type: "POST",
                url: "vistas/no/ajax/nomdocc.ashx?OPCION=BUDP",
                data: {
                    CTLG_CODE: CTLG_CODE, SCSL_CODE: SCSL_CODE, TIPO_DCTO: TIPO_DCTO, DESDE: DESDE, HASTA: HASTA, PRODUCTO: PRODUCTO, NUM_SERIE: SERIE,
                    NUM_DCTO: NUM_DCTO, p_ANULADO_IND: ESTADO, p_PROV_PIDM: PROV_PIDM, p_COMPLETO_IND: COMPLETO_IND
                },
                async: false,
                dataSrc: ''
            },
            responsive: true,
            sDom: 'T<"clear">lfrtip',
            order: [[1, "desc"]],
            oTableTools: {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            columns: [
                { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                { data: 'DESC_DCTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                { data: 'NUM_DCTO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                { data: 'EMISION', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                { data: 'RAZON_SOCIAL', createdCell: function (cell) { }, width: '15%' },
                { data: 'SIMBOLO_MONEDA', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '6%' },
                { data: 'TOTAL', createdCell: function (cell) { $(cell).css('text-align', 'right') }, width: '10%' },
                { data: 'COMPLETO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                { data: 'PROVISIONADO_DESC', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                { data: 'ANULADO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' }
                //{ data: 'PERIODO', createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' }
            ]
        });

        $('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    <a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    <div id="enlaces" style="display: inline-block">\
                        <a class="toggle-vis" data-column="0" href="#">CODIGO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="1" href="#">TIPO DCTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="2" href="#">NUM DCTO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="3" href="#">F. EMISION</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="togGle-vis" data-column="4" href="#">PROVEEDOR</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggLe-vis" data-column="5" href="#">MONEDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="6" href="#">IMPORTE</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="7" href="#">COMPLETO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="8" href="#">PROVISIONADO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                        <a class="toggle-vis" data-column="9" href="#">ANULADO</a>\
                    </div>');

        $("#tabla_general tbody").unbind('click').on('click', 'tr', function () {
            $(this).addClass('selected');
            var cod = $('#tabla_general').DataTable().row(this).data().CODIGO;
            window.location.href = '?f=nomanul&codigo=' + cod;
        });

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            var column = $('#tabla_general').DataTable().column($(this).attr('data-column'));
            column.visible(!column.visible());
        });
        Desbloquear("ventana");
    };

    return {
        init: function () {
            plugins();
            eventoControles();
            cargarEmpresas();
            fillcboRegistroEspecifico("NRMX");
            $("#cbo_Emp").val($('#ctl00_hddctlg').val()).change();
        }
    };
}();

var NOMANUL = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboEstablecimiento,#cboDocumentoCompra,#cbo_moneda').select2();
    };
      
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
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
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
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cbo_moneda').select2();
    }
    //Tipo Documento de Venta
    var fillCboTipoDoc = function () {
        var selectEst = $('#cboDocumentoCompra');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVLDOCV.ashx?OPCION=1&CTLG_CODE=" + $("#cboEmpresa").val() + "&COMP_VENT_IND=E",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                    $('#cboDocumentoCompra').select2('val', '');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboDocumentoCompra').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };


    var eventos = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento();
        });

        $("#btnAnular").on("click", function () {
            $("#modal-confirmar").modal("show");            
        });

        $("#btnAceptar").on("click", function () {
            $("#modal-confirmar").modal("hide");
            AnularDctoCompra();
        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");
        });
    };
        
    var AnularDctoCompra = function () {

        if (!vErrors(["txtNumDctoComp", "txtAnulacionCom"]))
            return;
        
        let sCodCompra = $("#txtNumDctoComp").val();
        let aoDocCompra = fnGetDocCompra(sCodCompra);
        if (aoDocCompra.length === 0) {
            infoCustom("Imposible continuar. No se encontró el Documento de Compra.");
            return;
        }

        if (aoDocCompra[0].ANULADO == "S") {
            infoCustom("Imposible continuar. El Documento de Compra ya fué anulado.");
            return;
        }

        //if (aoDocCompra[0].COMPLETO == "S") {
        //    infoCustom("Imposible continuar. El Documento de Compra ya fué completado.");
        //    return;
        //}
        
        aoExisteMovAlmacen = fnVerificarMovAlmacen(sCodCompra);
        if (aoExisteMovAlmacen[0].P_EXISTE === 'S') {
            infoCustom("Documento de Compra ya movió Inventario, no se puede anular.");
            return;
        }

        var aoSaldoDocCompra = fnGetSaldoDocCompra(sCodCompra);
        if (aoSaldoDocCompra.length > 0) {
            if (aoSaldoDocCompra[0].AMORT_TOTAL > 0) {
                infoCustom("Documento de Compra ya ha sido Amortizado.");
                return;
            }
        }
        
        let sCodCanje = fnGetCodCanjeXDocCompra(sCodCompra);
        let aoCanje = fnGetCanje(sCodCanje);
        if (aoCanje.length > 0) {
            infoCustom("Documento de Compra ha sido canjeado por letras.");
            return;
        }

        var data = new FormData();
        data.append('CODE', $("#txtNumDctoComp").val());
        data.append('CMNT_ANULAC', Enter_MYSQL($("#txtAnulacionCom").val()));

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/no/ajax/nomanul.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        })
            .success(function (datos) {
                if (!isEmpty(datos)) {
                    if (datos == "OK") {
                        exito();
                        $("#chkAnulado").attr("checked", true).parent().addClass("checked");
                        $("#txtAnulacionCom").attr("disabled", "disabled");
                        $("#btnAnular").remove();
                    }
                } else {
                    noexito();
                }
                Desbloquear("ventana");
            })
            .error(function () {
                noexito();
                Desbloquear("ventana");
            });
    };
    

    var fnVerificarMovAlmacen = function (sCodDocCompra) {
        var aoExisteMovAlmacen = [];
        $.ajax({
            type: "post",
            url: "vistas/NA/ajax/NAMINSA.ashx?OPCION=VERIFICAR_MOV_ALMACEN_DOC&P_CODE_DOC=" + sCodDocCompra,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                aoExisteMovAlmacen = datos;
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        return aoExisteMovAlmacen;
    };

    var fnGetCodCanjeXDocCompra = function (sCodCompra) {
        let sCodCanje = "";

        let p_flag = "GET_COD_CANJE_X_VTA";
        let data = new FormData();
        data.append("flag", p_flag);
        data.append("sCodVenta", sCodCompra);

        Bloquear("ventana");
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
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    infoCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    infoCustom("Error al intentar Guardar.");
                    return;
                }
                sCodCanje = response;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });

        return sCodCanje;
    };

    var fnGetCanje = function (sCodCanje) {
        let aoCanje = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMCANJ.ashx?flag=GET_COD_CANJE&sCodCanje=" + sCodCanje,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoCanje = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        Desbloquear("ventana");

        return aoCanje;
    };
    
    var Calcular = function () {
        var descuento = $("#txt_descuento").val() === '' ? 0 : parseFloat($("#txt_descuento").val());
        if (descuento <= base_imponible) {
            var inafecto = $("#txt_isc").val() === '' ? 0 : parseFloat($("#txt_isc").val());

            var tasa_impuest = ($("#hfOperacion").val() === 'ORGNGR') ? 0 : parseFloat($('#hfPor_igv').val());
            var ajuste = $("#hfAjuste").val() === '' ? 0 : parseFloat($("#hfAjuste").val());
            var detraccion = $("#txt_detraccion").val() === '' ? 0 : parseFloat($("#txt_detraccion").val());
            var percepcion = $("#txt_Percepcion").val() === '' ? 0 : parseFloat($("#txt_Percepcion").val());
            var retencion = $("#txt_Retencion").val() === '' ? 0 : parseFloat($("#txt_Retencion").val());

            var subtotal = base_imponible - descuento + inafecto;
            var impuesto = subtotal * (tasa_impuest);

            if (ajuste > 0.02 || ajuste < -0.02 || isNaN(ajuste)) {
                ajuste = 0;
                infoCustom2('Sólo se pueden realizar ajustes de un máximo de 2 céntimos.');
            }

            impuesto = impuesto + ajuste;
            var total_pagar = subtotal + impuesto;
            var neto_pagar = total_pagar + percepcion - detraccion - retencion;

            $("#txt_subtotal").val(subtotal.toFixed(2));
            $("#txt_impuesto_calc").val(impuesto.toFixed(2));
            $("#txt_monto_total").val(neto_pagar.toFixed(2));
        }
    };

    var fnGetDocCompra = function (sCodCompra) {
        var aoDocCompra = [];
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=S&codigo=" + sCodCompra,
            contentType: "application/json;",
            dataType: "json",
            async: false
        }).done(function (datos) {
                aoDocCompra = datos;
            }).fail(function (msg) {
                infoCustom2('Error al cargar datos.');
            });

        Desbloquear("ventana");
        return aoDocCompra;
    };

    var fnGetSaldoDocCompra = function (sCodCompra) {
        var aoSaldoDocCompra = [];
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/NO/ajax/NOMDOCC.ashx?OPCION=GET_SALDO_DOC_COMPRA&FACC_CODE=" + sCodCompra,
            contentType: "application/json;",
            dataType: "json",
            async: false
        }).done(function (datos) {
            aoSaldoDocCompra = datos;
        }).fail(function (msg) {
            infoCustom2('Error al cargar datos.');
        });

        Desbloquear("ventana");
        return aoSaldoDocCompra;
    };

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        $("#btn_add_dcto").attr("href", "?f=nrmgepr");
        $("#btn_add_dcto").attr("target", "_blank");

        if (cod === undefined) {
            return;
        }

        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
        $("#grabar").attr("href", "javascript:ActualizarDctoCompra();");

        let aoDocCompra = fnGetDocCompra(cod);
        if (aoDocCompra.length === 0)
            return;
                
        $("#txtNumDctoComp").val(aoDocCompra[0].CODIGO);
        $("#txtNumSec").val(aoDocCompra[0].SECUENCIA);
        
        if (aoDocCompra[0].COMPLETO == "S") {
            $("#chkCompleto").attr("checked", true).parent().addClass("checked");
        }

        if (aoDocCompra[0].ANULADO == "S") {
            $("#chkAnulado").attr("checked", true).parent().addClass("checked");
            //ANULAC_ID  FECHA_ANULAC      CMNT_ANULAC
            $("#txtAnulacionCom").val(aoDocCompra[0].CMNT_ANULACION);
            $("#txtFechaAnulacion").val(aoDocCompra[0].FECHA_ANULACION);
            $("#txtUsuarioAnulacion").val(aoDocCompra[0].USUARIO_ANULACION);
            $("#divDatosAnulacion").attr("style", "display:block;");

            $("#txtAnulacionCom").attr("readonly", "readonly");
            $("#btnAnular").remove();

        }
        if (aoDocCompra[0].PROVISIONADO == "S") {
            $("#chkContable").attr("checked", true).parent().addClass("checked");
        }

        $("#cboEmpresa").select2('val', aoDocCompra[0].EMPRESA).change();//Este change carga periodos
        $("#cboEstablecimiento").select2('val', aoDocCompra[0].SUCURSAL).change();

        $("#cboDocumentoCompra").select2('val', aoDocCompra[0].TIPO_DOC_REGISTRO).change();
        $("#cboSerieDocCompra").empty();
        $("#cboSerieDocCompra").append('<option value="' + aoDocCompra[0].CODIGO + '" >' + aoDocCompra[0].SERIE_DOC_REGISTRO + '</option>');
        $("#cboSerieDocCompra").select2("val", aoDocCompra[0].CODIGO);
        $("#txtNroDocCompra").val(aoDocCompra[0].NUM_DOC_REGISTRO);

        //$("#hfPIDM").val(datos[0].PIDM);
        $("#txtProveedor").val(aoDocCompra[0].RAZON_SOCIAL);
        if (aoDocCompra[0].RUC === '') {
            $("#txtNroDctoProveedor").val('')
        } else {
            if ((aoDocCompra[0].RUC).length > 8) {
                $("#txtNroDctoProveedor").val(`RUC - ${aoDocCompra[0].RUC}`);
            }
            else {
                $("#txtNroDctoProveedor").val(`DNI - ${aoDocCompra[0].RUC}`);
            }
        }
        $('#txt_fec_transaccion').datepicker('setDate', aoDocCompra[0].FECHA_TRANSACCION);
        $("#txt_fec_emision").datepicker('setDate', aoDocCompra[0].EMISION);

        $("#txt_fec_vencimiento").datepicker('setDate', aoDocCompra[0].VENCIMIENTO);

        $("#cbo_moneda").select2('val', aoDocCompra[0].MONEDA).change();

        $("#txt_comentario").val(aoDocCompra[0].GLOSA);

        //CARGA INICIAL DE TOTALES

        var tipoMoneda = $('#cbo_moneda :selected').attr('data-tipo');
        base_imponible = parseFloat((tipoMoneda === 'MOBA') ? aoDocCompra[0].VALOR : aoDocCompra[0].CONVERT_VALOR);
        isc = parseFloat((tipoMoneda === 'MOBA') ? aoDocCompra[0].INAFECTO : aoDocCompra[0].CONVERT_INAFECTO);
        descuento = parseFloat((tipoMoneda === 'MOBA') ? aoDocCompra[0].DESCUENTO : aoDocCompra[0].CONVERT_DESCUENTO);
        $("#txt_base_imponible").val(base_imponible.toFixed(2));
        $("#txt_isc").val(isc.toFixed(2));
        $("#txt_descuento").val(descuento.toFixed(2));

        //if (aoDocCompra[0].IMPUESTO_IND === 'S') {
        //    $("#txtImpuesto2").val("SI APLICA");
        //} else {
        //    $("#txtImpuesto2").val("NO APLICA");
        //}

        if (aoDocCompra[0].OPERACION === "DSTGRA") {
            $("#txtImpuesto2").val("DESTINO GRAVADO");
        } else if (aoDocCompra[0].OPERACION === "DSTMIX") {
            $("#txtImpuesto2").val("DESTINO MIXTO");
        } else if (aoDocCompra[0].OPERACION === "DSTNGR") {
            $("#txtImpuesto2").val("DESTINO NO GRAVADO");
        } else if (aoDocCompra[0].OPERACION === "ORGNGR") {
            $("#txtImpuesto2").val("ORIGEN NO GRAVADO");
        }


        $("#hfOperacion").val(aoDocCompra[0].OPERACION);
        $("#hfPor_igv").val(aoDocCompra[0].POR_IGV);
        var porcentaje = aoDocCompra[0].POR_IGV === '' ? 0 : (parseFloat(aoDocCompra[0].POR_IGV) * 100);
        $("#txt_impuesto").val(porcentaje.toFixed(2))

        $("#hfAjuste").val(aoDocCompra[0].AJUSTE)
               

        var detraccion = 0, percepcion = 0, retencion = 0
        if (!isEmpty(aoDocCompra[0].CONVERT_DETRACCION)) { detraccion = aoDocCompra[0].CONVERT_DETRACCION }
        if (!isEmpty(aoDocCompra[0].CONVERT_PERCEPCION)) { percepcion = aoDocCompra[0].CONVERT_PERCEPCION }
        if (!isEmpty(aoDocCompra[0].CONVERT_RETENCION)) { retencion = aoDocCompra[0].CONVERT_RETENCION }


        $("#txt_detraccion").val((tipoMoneda === 'MOBA') ? (parseFloat(aoDocCompra[0].DETRACCION)).toFixed(2) : (parseFloat(detraccion)).toFixed(2));
        $("#txt_Percepcion").val((tipoMoneda === 'MOBA') ? (parseFloat(aoDocCompra[0].PERCEPCION)).toFixed(2) : (parseFloat(percepcion)).toFixed(2));
        $("#txt_Retencion").val((tipoMoneda === 'MOBA') ? (parseFloat(aoDocCompra[0].RETENCION)).toFixed(2) : (parseFloat(retencion)).toFixed(2));

        $("#txt_valor_cambio").val(aoDocCompra[0].VALOR_CAMBIO)
        Calcular();
                
    };

    return {
        init: function () {
            plugins();
            eventos();
            fillCboEmpresa();
            fillCboEstablecimiento();
            fillcboMoneda();
            fillCboTipoDoc();
            cargaInicial();
        }
    };
}();



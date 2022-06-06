var cargar_registro_cuenta = false;
var control_messages = 0;
var cont_ajax = 0;
var cont_grabar = 0;

function ListarCtasGeneral(control, control_desc, cuenta) {

    controlvar = $('#' + control);

    var empresa = $("#ctl00_hddctlg").val();    
    
    $.ajax({
        type: "post",
        url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + empresa + "&P_CUEN_CODE=" + cuenta,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana");        
            controlvar.empty();
            controlvar.append('<option></option>');
            if (datos.length > 0) {
                cargar_registro_cuenta = true;
                for (var i = 0; i < datos.length; i++) {
                    controlvar.append('<option value="' + datos[i].CUENTA + '" data-ctaid = "' + datos[i].ID_CUENTA + '" >' + datos[i].DESCRIPCION + ' - ' + datos[i].CUENTA + '</option>');
                }
            }
            controlvar.select2('val', '');
            //colocamos el valor vacío al control de pantalla obtenido por parámetro
            $('#' + control_desc)[0].innerHTML = "";

            // Control para chekear valor por defecto en compras y ventas.
            cont_ajax = (cont_ajax + 1);
            if (cont_ajax == 30) {
                checkearHaberDebe();
            }
        },
        error: function (msg) {
            alert(msg);
            cargar_registro_cuenta = false;
        }

    });

    
}

function ListarCtasSgrup(OPERACION) {
    $.ajax({
        type: "post",
        url: "vistas/CT/ajax/CTMCDCO.ashx?OPCION=L&P_CGRUPCTAS_OPERACION=" + OPERACION,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {       

            console.log(datos.length);

            if (datos.length > 0) {   

                control_messages = (control_messages + 1);
                if (control_messages == 2) {
                    $("#btn_grabar").attr("value", "Actualizar");
                }
                 
                switch (OPERACION) {
                    case "COMPRA":
                        {         
                            console.log(datos);
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

                        }; break;
                    case "VENTA":
                        {                                    
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
                           
                        }; break;
                    case "ANTICIPO":
                        {
                            $("#cbo_cuentaAnticipo_recepcion").val(datos[0].ctarecanti).change();
                            if (datos[0].debhab_ctarecepcionanti == 'D') {
                                $('#uniform-chxDebea2 span').removeClass().addClass("checked");
                                $('#chxDebea2').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctarecepcionanti == 'H') {
                                $('#uniform-chxHabera2 span').removeClass().addClass("checked");
                                $('#chxHabera2').attr('checked', true).parent().addClass("checked");
                            }

                            $("#cbo_cuentaAnticipo_aplicacion").val(datos[0].ctaaplanti).change();
                            if (datos[0].debhab_ctaaplicacionanti == 'D') {
                                $('#uniform-chxDebea3 span').removeClass().addClass("checked");
                                $('#chxDebea3').attr('checked', true).parent().addClass("checked");
                            }
                            else if (datos[0].debhab_ctaaplicacionanti == 'H') {
                                $('#uniform-chxHabera3 span').removeClass().addClass("checked");
                                $('#chxHabera3').attr('checked', true).parent().addClass("checked");
                            }

                        }; break;
                    default:

                }

            }
            else {
                control_messages = (control_messages + 1); 
                if (control_messages == 2) {
                    infoCustom("No existe una configuración de cuentas contables.");                    
                    $("#btn_grabar").attr("value", "Guardar");
                }
                switch (OPERACION) {
                    case "COMPRA":
                        {
                            if ($("#chxDebe1").is(":checked") || $("#chxHaber1").is(":checked")) {                                
                               
                                $('#uniform-chxDebe2 span').removeClass();
                                $('#chxDebe2').attr('checked', false);
                                $('#uniform-chxHaber2 span').removeClass();
                                $('#chxHaber2').attr('checked', false);

                                $('#uniform-chxDebe3 span').removeClass();
                                $('#chxDebe3').attr('checked', false);
                                $('#uniform-chxHaber3 span').removeClass();
                                $('#chxHaber3').attr('checked', false);

                                $('#uniform-chxDebe4 span').removeClass();
                                $('#chxDebe4').attr('checked', false);
                                $('#uniform-chxHaber4 span').removeClass();
                                $('#chxHaber4').attr('checked', false);

                                $('#uniform-chxDebe5 span').removeClass();
                                $('#chxDebe5').attr('checked', false);
                                $('#uniform-chxHaber5 span').removeClass();
                                $('#chxHaber5').attr('checked', false);

                                $('#uniform-chxDebe6 span').removeClass();
                                $('#chxDebe6').attr('checked', false);
                                $('#uniform-chxHaber6 span').removeClass();
                                $('#chxHaber6').attr('checked', false);
                            }
                        }; break;
                    case "VENTA":
                        {
                            if ($("#chxDebev1").is(":checked") || $("#chxHaberv1").is(":checked")) {                               
                                                               
                                $('#uniform-chxDebev2 span').removeClass();
                                $('#chxDebev2').attr('checked', false);
                                $('#uniform-chxHaberv2 span').removeClass();
                                $('#chxHaberv2').attr('checked', false);

                                $('#uniform-chxDebev3 span').removeClass();
                                $('#chxDebev3').attr('checked', false);
                                $('#uniform-chxHaberv3 span').removeClass();
                                $('#chxHaberv3').attr('checked', false);

                                $('#uniform-chxDebev4 span').removeClass();
                                $('#chxDebev4').attr('checked', false);
                                $('#uniform-chxHaberv4 span').removeClass();
                                $('#chxHaberv4').attr('checked', false);

                                $('#uniform-chxDebev5 span').removeClass();
                                $('#chxDebev5').attr('checked', false);
                                $('#uniform-chxHaberv5 span').removeClass();
                                $('#chxHaberv5').attr('checked', false);

                                $('#uniform-chxDebev6 span').removeClass();
                                $('#chxDebev6').attr('checked', false);
                                $('#uniform-chxHaberv6 span').removeClass();
                                $('#chxHaberv6').attr('checked', false);
                            }
                        }; break;
                    case "ANTICIPO":
                        {
                            if ($("#chxDebea1").is(":checked") || $("#chxHabera1").is(":checked")) {

                                $('#uniform-chxDebea2 span').removeClass();
                                $('#chxDebea2').attr('checked', false);
                                $('#uniform-chxHabera2 span').removeClass();
                                $('#chxHabera2').attr('checked', false);

                                $('#uniform-chxDebea3 span').removeClass();
                                $('#chxDebea3').attr('checked', false);
                                $('#uniform-chxHabera3 span').removeClass();
                                $('#chxHabera3').attr('checked', false);
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


function ListarNotasCredito() {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/calnocr.ashx?OPCION=4&p_CTLG_CODE=" + ctlg +
        "&p_SCSL_CODE=" + scsl +
        "&p_COMPRA_VENTA_IND=C" +
        "&p_ESTADO=" + $("#cboEstado").val(),
        contenttype: "application/text;",
        datatype: "json",
        async: true,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {

                $('#divTblNotasCredito').html(datos);

                var oTable = $("#tblNotasCredito").DataTable({
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    },
                    "scrollX": "true",
                    "order": [[0, "desc"]]
                });

                oTable.column(0).visible(false);

            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alertCustom(msg);
        }
    });
}


function CargaCtasContables() {
    //compras
    //ListarCtasGeneral('cbo_cuentaCompra', 'cbo_cuentaCompra_desc', '60');
    ListarCtasGeneral('cbo_cuentaIgv', 'cbo_cuentaIgv_desc', '40');
    ListarCtasGeneral('cbo_cuentaCompraMN', 'cbo_cuentaCompraMN_desc', '42');
    ListarCtasGeneral('cbo_cuentaCompraME', 'cbo_cuentaCompraME_desc', '42');
    ListarCtasGeneral('cbo_cuentaCompraRelMN', 'cbo_cuentaCompraRelMN_desc', '43');
    ListarCtasGeneral('cbo_cuentaCompraRelME', 'cbo_cuentaCompraRelME_desc', '43');


    //ventas
    //ListarCtasGeneral('cbo_cuentaVenta', 'cbo_cuentaVenta_desc', '70');
    ListarCtasGeneral('cbo_cuentaIgv_venta', 'cbo_cuentaIgv_venta_desc', '40');
    ListarCtasGeneral('cbo_cuentaVentaMN', 'cbo_cuentaVentaMN_desc', '12');
    ListarCtasGeneral('cbo_cuentaVentaME', 'cbo_cuentaVentaME_desc', '12');
    ListarCtasGeneral('cbo_cuentaVentaRelMN', 'cbo_cuentaVentaRelMN_desc', '13');
    ListarCtasGeneral('cbo_cuentaVentaRelME', 'cbo_cuentaVentaRelME_desc', '13');

    Anticipos
    ListarCtasGeneral('cbo_cuentaAnticipo_recepcion', 'cbo_cuentaAnticipo_recepcion_desc', '12');
    ListarCtasGeneral('cbo_cuentaAnticipo_aplicacion', 'cbo_cuentaAnticipo_aplicacion_desc', '12');

    //COBROS
    //ListarCtasGeneral('cbo_cuentaCobro', 'cbo_cuentaCobro_desc', '70');
    ListarCtasGeneral('cbo_cuentaIgv_Cobro', 'cbo_cuentaIgv_Cobro_desc', '40');
    ListarCtasGeneral('cbo_cuentaCobroMN', 'cbo_cuentaCobroMN_desc', '12');
    ListarCtasGeneral('cbo_cuentaCobroME', 'cbo_cuentaCobroME_desc', '12');
    ListarCtasGeneral('cbo_cuentaCobroRelMN', 'cbo_cuentaCobroRelMN_desc', '13');
    ListarCtasGeneral('cbo_cuentaCobroRelME', 'cbo_cuentaCobroRelME_desc', '13');


    //PAGO
    //ListarCtasGeneral('cbo_cuentaPago', 'cbo_cuentaPago_desc', '70');
    ListarCtasGeneral('cbo_cuentaIgv_Pago', 'cbo_cuentaIgv_Pago_desc', '40');
    ListarCtasGeneral('cbo_cuentaPagoMN', 'cbo_cuentaPagoMN_desc', '12');
    ListarCtasGeneral('cbo_cuentaPagoME', 'cbo_cuentaPagoME_desc', '12');
    ListarCtasGeneral('cbo_cuentaPagoRelMN', 'cbo_cuentaPagoRelMN_desc', '13');
    ListarCtasGeneral('cbo_cuentaPagoRelME', 'cbo_cuentaPagoRelME_desc', '13');


    //PAGO DIVERSO
    //ListarCtasGeneral('cbo_cuentaPagoDiverso', 'cbo_cuentaPagoDiverso_desc', '70');
    ListarCtasGeneral('cbo_cuentaIgv_PagoDiverso', 'cbo_cuentaIgv_PagoDiverso_desc', '40');
    ListarCtasGeneral('cbo_cuentaPagoDiversoMN', 'cbo_cuentaPagoDiversoMN_desc', '12');
    ListarCtasGeneral('cbo_cuentaPagoDiversoME', 'cbo_cuentaPagoDiversoME_desc', '12');
    ListarCtasGeneral('cbo_cuentaPagoDiversoRelMN', 'cbo_cuentaPagoDiversoRelMN_desc', '13');
    ListarCtasGeneral('cbo_cuentaPagoDiversoRelME', 'cbo_cuentaPagoDiversoRelME_desc', '13');

    //PAGO ASIGNADOS
    //ListarCtasGeneral('cbo_cuentaPagoAsignaciones', 'cbo_cuentaPagoAsignaciones_desc', '70');
    ListarCtasGeneral('cbo_cuentaIgv_PagoAsignaciones', 'cbo_cuentaIgv_PagoAsignaciones_desc', '40');
    ListarCtasGeneral('cbo_cuentaPagoAsignacionesMN', 'cbo_cuentaPagoAsignacionesMN_desc', '12');
    ListarCtasGeneral('cbo_cuentaPagoAsignacionesME', 'cbo_cuentaPagoAsignacionesME_desc', '12');
    ListarCtasGeneral('cbo_cuentaPagoAsignacionesRelMN', 'cbo_cuentaPagoAsignacionesRelMN_desc', '13');
    ListarCtasGeneral('cbo_cuentaPagoAsignacionesRelME', 'cbo_cuentaPagoAsignacionesRelME_desc', '13');

    if (cargar_registro_cuenta) {
        ListarCtasSgrup('COMPRA');
        ListarCtasSgrup('VENTA');
        ListarCtasSgrup('ANTICIPO');
        control_messages = 0;
    }

}


function GrabarDatos() {

    var guardar_compra = false;
    var guardar_venta = false;
    var guardar_anticipo = false;
   
    //COMPRA

    P_CGRUPCTAS_OPERACION = "COMPRA";
    P_CGRUPCTAS_CUENTA_SGRUP = "";
    P_CGRUPCTAS_IMPUESTO = "IGV";
    P_CGRUPCTAS_DEBE_HABER = '';
    P_CGRUPCTAS_CUENTA_IMPUESTO = $("#cbo_cuentaIgv").val();
    P_CGRUPCTAS_CTAS_ID_IMPUESTO = $("#cbo_cuentaIgv option:selected").data('ctaid');
    DHC1 = $("#chxDebe2").is(":checked") ? 'D' : $("#chxHaber2").is(":checked") ? 'H' : 'N';

    P_CGRUPCTAS_CUENTA_OPE_MN = $("#cbo_cuentaCompraMN").val();
    P_CGRUPCTAS_CTAS_ID_OPE_MN = $("#cbo_cuentaCompraMN option:selected").data('ctaid');
    DHC2 = $("#chxDebe3").is(":checked") ? 'D' : $("#chxHaber3").is(":checked") ? 'H' : 'N';

    P_CGRUPCTAS_CUENTA_OPE_ME = $("#cbo_cuentaCompraME").val();
    P_CGRUPCTAS_CTAS_ID_OPE_ME = $("#cbo_cuentaCompraME option:selected").data('ctaid');
    DHC3 = $("#chxDebe4").is(":checked") ? 'D' : $("#chxHaber4").is(":checked") ? 'H' : 'N';


    P_CGRUPCTAS_CUENTA_RELA_OPE_MN = $("#cbo_cuentaCompraRelMN").val();
    P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN = $("#cbo_cuentaCompraRelMN option:selected").data('ctaid');
    DHC4 = $("#chxDebe5").is(":checked") ? 'D' : $("#chxHaber5").is(":checked") ? 'H' : 'N';


    P_CGRUPCTAS_CUENTA_RELA_OPE_ME = $("#cbo_cuentaCompraRelME").val();
    P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME = $("#cbo_cuentaCompraRelME option:selected").data('ctaid');
    DHC5 = $("#chxDebe6").is(":checked") ? 'D' : $("#chxHaber6").is(":checked") ? 'H' : 'N';

    P_CGRUPCTAS_CUENTA_RECEPCION_ANTI = "";
    P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI = "";

    P_CGRUPCTAS_CUENTA_APLICACION_ANTI = "";
    P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI = "";
    

    P_CGRUPCTAS_DEBE_HABER = DHC1 + '|' + DHC2 + '|' + DHC3 + '|' + DHC4 + '|' + DHC5;
    P_USUARIO = 'USUARIO'

    if (P_CGRUPCTAS_IMPUESTO == undefined || P_CGRUPCTAS_IMPUESTO == "" || P_CGRUPCTAS_IMPUESTO == null ||
        P_CGRUPCTAS_CTAS_ID_IMPUESTO == undefined || P_CGRUPCTAS_CTAS_ID_IMPUESTO == "" || P_CGRUPCTAS_CTAS_ID_IMPUESTO == null ||
        P_CGRUPCTAS_CUENTA_IMPUESTO == undefined || P_CGRUPCTAS_CUENTA_IMPUESTO == "" || P_CGRUPCTAS_CUENTA_IMPUESTO == null ||
        P_CGRUPCTAS_CTAS_ID_OPE_MN == undefined || P_CGRUPCTAS_CTAS_ID_OPE_MN == "" || P_CGRUPCTAS_CTAS_ID_OPE_MN == null ||
        P_CGRUPCTAS_CUENTA_OPE_MN == undefined || P_CGRUPCTAS_CUENTA_OPE_MN == "" || P_CGRUPCTAS_CUENTA_OPE_MN == null ||
        P_CGRUPCTAS_CTAS_ID_OPE_ME == undefined || P_CGRUPCTAS_CTAS_ID_OPE_ME == "" || P_CGRUPCTAS_CTAS_ID_OPE_ME == null ||
        P_CGRUPCTAS_CUENTA_OPE_ME == undefined || P_CGRUPCTAS_CUENTA_OPE_ME == "" || P_CGRUPCTAS_CUENTA_OPE_ME == null ||
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN == undefined || P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN == "" || P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN == null ||
        P_CGRUPCTAS_CUENTA_RELA_OPE_MN == undefined || P_CGRUPCTAS_CUENTA_RELA_OPE_MN == "" || P_CGRUPCTAS_CUENTA_RELA_OPE_MN == null ||
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME == undefined || P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME == "" || P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME == null ||
        P_CGRUPCTAS_CUENTA_RELA_OPE_ME == undefined || P_CGRUPCTAS_CUENTA_RELA_OPE_ME == "" || P_CGRUPCTAS_CUENTA_RELA_OPE_ME == null ||
        //P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI == undefined || P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI == "" || P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI == null ||
        //P_CGRUPCTAS_CUENTA_RECEPCION_ANTI == undefined || P_CGRUPCTAS_CUENTA_RECEPCION_ANTI == "" || P_CGRUPCTAS_CUENTA_RECEPCION_ANTI == null ||
        //P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI == undefined || P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI == "" || P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI == null ||
        //P_CGRUPCTAS_CUENTA_APLICACION_ANTI == undefined || P_CGRUPCTAS_CUENTA_APLICACION_ANTI == "" || P_CGRUPCTAS_CUENTA_APLICACION_ANTI == null ||
        P_CGRUPCTAS_DEBE_HABER == undefined || P_CGRUPCTAS_DEBE_HABER == "" || P_CGRUPCTAS_DEBE_HABER == null) {
        infoCustom2("Debe configurar una cuenta contable por cada fila (COMPRA)");
        return;
    } else {
        guardar_compra = true;        
    }

    // SETEAMOS VARIABLES

    //VENTA
    var P_CGRUPCTAS_OPERACION_V = "VENTA";
    var P_CGRUPCTAS_CUENTA_SGRUP_V = "";
    var P_CGRUPCTAS_IMPUESTO_V = "IGV";
    var P_CGRUPCTAS_DEBE_HABER_V = '';
    var P_CGRUPCTAS_CUENTA_IMPUESTO_V = $("#cbo_cuentaIgv_venta").val();
    var P_CGRUPCTAS_CTAS_ID_IMPUESTO_V = $("#cbo_cuentaIgv_venta option:selected").data('ctaid');
    var DHC1_V = $("#chxDebev2").is(":checked") ? 'D' : $("#chxHaberv2").is(":checked") ? 'H' : 'N';

    var P_CGRUPCTAS_CUENTA_OPE_MN_V = $("#cbo_cuentaVentaMN").val();
    var P_CGRUPCTAS_CTAS_ID_OPE_MN_V = $("#cbo_cuentaVentaMN option:selected").data('ctaid');
    var DHC2_V = $("#chxDebev3").is(":checked") ? 'D' : $("#chxHaberv3").is(":checked") ? 'H' : 'N';

    var P_CGRUPCTAS_CUENTA_OPE_ME_V = $("#cbo_cuentaVentaME").val();
    var P_CGRUPCTAS_CTAS_ID_OPE_ME_V = $("#cbo_cuentaVentaME option:selected").data('ctaid');
    var DHC3_V = $("#chxDebev4").is(":checked") ? 'D' : $("#chxHaberv4").is(":checked") ? 'H' : 'N';


    var P_CGRUPCTAS_CUENTA_RELA_OPE_MN_V = $("#cbo_cuentaVentaRelMN").val();
    var P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_V = $("#cbo_cuentaVentaRelMN option:selected").data('ctaid');
    var DHC4_V = $("#chxDebev5").is(":checked") ? 'D' : $("#chxHaberv5").is(":checked") ? 'H' : 'N';


    var P_CGRUPCTAS_CUENTA_RELA_OPE_ME_V = $("#cbo_cuentaVentaRelME").val();
    var P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_V = $("#cbo_cuentaVentaRelME option:selected").data('ctaid');
    var DHC5_V = $("#chxDebev6").is(":checked") ? 'D' : $("#chxHaberv6").is(":checked") ? 'H' : 'N';

    var P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_V = "";
    var P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_V = "";

    var P_CGRUPCTAS_CUENTA_APLICACION_ANTI_V = "";
    var P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_V = "";

    P_CGRUPCTAS_DEBE_HABER_V = DHC1_V + '|' + DHC2_V + '|' + DHC3_V + '|' + DHC4_V + '|' + DHC5_V;
    var P_USUARIO_V = 'USUARIO'
   
    
    if (P_CGRUPCTAS_IMPUESTO_V == undefined || P_CGRUPCTAS_IMPUESTO_V == "" || P_CGRUPCTAS_IMPUESTO_V == null ||
        P_CGRUPCTAS_CTAS_ID_IMPUESTO_V == undefined || P_CGRUPCTAS_CTAS_ID_IMPUESTO_V == "" || P_CGRUPCTAS_CTAS_ID_IMPUESTO_V == null ||
        P_CGRUPCTAS_CUENTA_IMPUESTO_V == undefined || P_CGRUPCTAS_CUENTA_IMPUESTO_V == "" || P_CGRUPCTAS_CUENTA_IMPUESTO_V == null ||
        P_CGRUPCTAS_CTAS_ID_OPE_MN_V == undefined || P_CGRUPCTAS_CTAS_ID_OPE_MN_V == "" || P_CGRUPCTAS_CTAS_ID_OPE_MN_V == null ||
        P_CGRUPCTAS_CUENTA_OPE_MN_V == undefined || P_CGRUPCTAS_CUENTA_OPE_MN_V == "" || P_CGRUPCTAS_CUENTA_OPE_MN_V == null ||
        P_CGRUPCTAS_CTAS_ID_OPE_ME_V == undefined || P_CGRUPCTAS_CTAS_ID_OPE_ME_V == "" || P_CGRUPCTAS_CTAS_ID_OPE_ME_V == null ||
        P_CGRUPCTAS_CUENTA_OPE_ME_V == undefined || P_CGRUPCTAS_CUENTA_OPE_ME_V == "" || P_CGRUPCTAS_CUENTA_OPE_ME_V == null ||
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_V == undefined || P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_V == "" || P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_V == null ||
        P_CGRUPCTAS_CUENTA_RELA_OPE_MN_V == undefined || P_CGRUPCTAS_CUENTA_RELA_OPE_MN_V == "" || P_CGRUPCTAS_CUENTA_RELA_OPE_MN_V == null ||
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_V == undefined || P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_V == "" || P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_V == null ||
        P_CGRUPCTAS_CUENTA_RELA_OPE_ME_V == undefined || P_CGRUPCTAS_CUENTA_RELA_OPE_ME_V == "" || P_CGRUPCTAS_CUENTA_RELA_OPE_ME_V == null ||
        //P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_V == undefined || P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_V == "" || P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_V == null ||
        //P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_V == undefined || P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_V == "" || P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_V == null ||
        //P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_V == undefined || P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_V == "" || P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_V == null ||
        //P_CGRUPCTAS_CUENTA_APLICACION_ANTI_V == undefined || P_CGRUPCTAS_CUENTA_APLICACION_ANTI_V == "" || P_CGRUPCTAS_CUENTA_APLICACION_ANTI_V == null ||
        P_CGRUPCTAS_DEBE_HABER_V == undefined || P_CGRUPCTAS_DEBE_HABER_V == "" || P_CGRUPCTAS_DEBE_HABER_V == null)
    {
        infoCustom2("Debe configurar una cuenta contable por cada fila (VENTA)");
        return;
    } else {
        guardar_venta = true;        
    }

    //ANTICIPO
    var P_CGRUPCTAS_OPERACION_A = "ANTICIPO";
    var P_CGRUPCTAS_CUENTA_SGRUP_A = "";
    var P_CGRUPCTAS_IMPUESTO_A = "IGV";
    var P_CGRUPCTAS_DEBE_HABER_A = '';
    var P_CGRUPCTAS_CUENTA_IMPUESTO_A = $("#cbo_cuentaIgv_venta").val();
    var P_CGRUPCTAS_CTAS_ID_IMPUESTO_A = $("#cbo_cuentaIgv_venta option:selected").data('ctaid');
    var DHC1_A = 'D'

    var P_CGRUPCTAS_CUENTA_OPE_MN_A = $("#cbo_cuentaVentaMN").val();
    var P_CGRUPCTAS_CTAS_ID_OPE_MN_A = $("#cbo_cuentaVentaMN option:selected").data('ctaid');
    var DHC2_A = 'H'

    var P_CGRUPCTAS_CUENTA_OPE_ME_A = $("#cbo_cuentaVentaME").val();
    var P_CGRUPCTAS_CTAS_ID_OPE_ME_A = $("#cbo_cuentaVentaME option:selected").data('ctaid');
    var DHC3_A = 'H'


    var P_CGRUPCTAS_CUENTA_RELA_OPE_MN_A = $("#cbo_cuentaVentaRelMN").val();
    var P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_A = $("#cbo_cuentaVentaRelMN option:selected").data('ctaid');
    var DHC4_A = 'H'


    var P_CGRUPCTAS_CUENTA_RELA_OPE_ME_A = $("#cbo_cuentaVentaRelME").val();
    var P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_A = $("#cbo_cuentaVentaRelME option:selected").data('ctaid');
    var DHC5_A = 'H'

    var P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_A = $("#cbo_cuentaAnticipo_recepcion").val();
    var P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_A = $("#cbo_cuentaAnticipo_recepcion option:selected").data('ctaid');
    var DHC6_A = $("#chxDebea2").is(":checked") ? 'D' : $("#chxHabera2").is(":checked") ? 'H' : 'N';

    var P_CGRUPCTAS_CUENTA_APLICACION_ANTI_A = $("#cbo_cuentaAnticipo_aplicacion").val();
    var P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_A = $("#cbo_cuentaAnticipo_aplicacion option:selected").data('ctaid');
    var DHC7_A = $("#chxDebea3").is(":checked") ? 'D' : $("#chxHabera3").is(":checked") ? 'H' : 'N';

    P_CGRUPCTAS_DEBE_HABER_A = DHC1_A + '|' + DHC2_A + '|' + DHC3_A + '|' + DHC4_A + '|' + DHC5_A + '|' + DHC6_A + '|' + DHC7_A;
    var P_USUARIO_A = 'USUARIO'


    if (P_CGRUPCTAS_IMPUESTO_A == undefined || P_CGRUPCTAS_IMPUESTO_A == "" || P_CGRUPCTAS_IMPUESTO_A == null ||
        P_CGRUPCTAS_CTAS_ID_IMPUESTO_A == undefined || P_CGRUPCTAS_CTAS_ID_IMPUESTO_A == "" || P_CGRUPCTAS_CTAS_ID_IMPUESTO_A == null ||
        P_CGRUPCTAS_CUENTA_IMPUESTO_A == undefined || P_CGRUPCTAS_CUENTA_IMPUESTO_A == "" || P_CGRUPCTAS_CUENTA_IMPUESTO_A == null ||
        P_CGRUPCTAS_CTAS_ID_OPE_MN_A == undefined || P_CGRUPCTAS_CTAS_ID_OPE_MN_A == "" || P_CGRUPCTAS_CTAS_ID_OPE_MN_A == null ||
        P_CGRUPCTAS_CUENTA_OPE_MN_A == undefined || P_CGRUPCTAS_CUENTA_OPE_MN_A == "" || P_CGRUPCTAS_CUENTA_OPE_MN_A == null ||
        P_CGRUPCTAS_CTAS_ID_OPE_ME_A == undefined || P_CGRUPCTAS_CTAS_ID_OPE_ME_A == "" || P_CGRUPCTAS_CTAS_ID_OPE_ME_A == null ||
        P_CGRUPCTAS_CUENTA_OPE_ME_A == undefined || P_CGRUPCTAS_CUENTA_OPE_ME_A == "" || P_CGRUPCTAS_CUENTA_OPE_ME_A == null ||
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_A == undefined || P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_A == "" || P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_A == null ||
        P_CGRUPCTAS_CUENTA_RELA_OPE_MN_A == undefined || P_CGRUPCTAS_CUENTA_RELA_OPE_MN_A == "" || P_CGRUPCTAS_CUENTA_RELA_OPE_MN_A == null ||
        P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_A == undefined || P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_A == "" || P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_A == null ||
        P_CGRUPCTAS_CUENTA_RELA_OPE_ME_A == undefined || P_CGRUPCTAS_CUENTA_RELA_OPE_ME_A == "" || P_CGRUPCTAS_CUENTA_RELA_OPE_ME_A == null ||
        P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_A == undefined || P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_A == "" || P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_A == null ||
        P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_A == undefined || P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_A == "" || P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_A == null ||
        P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_A == undefined || P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_A == "" || P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_A == null ||
        P_CGRUPCTAS_CUENTA_APLICACION_ANTI_A == undefined || P_CGRUPCTAS_CUENTA_APLICACION_ANTI_A == "" || P_CGRUPCTAS_CUENTA_APLICACION_ANTI_A == null ||
        P_CGRUPCTAS_DEBE_HABER_A == undefined || P_CGRUPCTAS_DEBE_HABER_A == "" || P_CGRUPCTAS_DEBE_HABER_A == null) {
        infoCustom2("Debe configurar una cuenta contable por cada fila (ANTICIPO)");
        return;
    } else {
        guardar_anticipo = true;
    }

    if (guardar_compra && guardar_venta && guardar_anticipo) {
        // COMPRA
        Guardar(P_CGRUPCTAS_OPERACION, P_CGRUPCTAS_CUENTA_SGRUP, P_CGRUPCTAS_IMPUESTO,
            P_CGRUPCTAS_CTAS_ID_IMPUESTO, P_CGRUPCTAS_CUENTA_IMPUESTO, P_CGRUPCTAS_CTAS_ID_OPE_MN,
            P_CGRUPCTAS_CUENTA_OPE_MN, P_CGRUPCTAS_CTAS_ID_OPE_ME, P_CGRUPCTAS_CUENTA_OPE_ME,
            P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN, P_CGRUPCTAS_CUENTA_RELA_OPE_MN, P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME,
            P_CGRUPCTAS_CUENTA_RELA_OPE_ME, P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI, P_CGRUPCTAS_CUENTA_RECEPCION_ANTI,
            P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI, P_CGRUPCTAS_CUENTA_APLICACION_ANTI, P_CGRUPCTAS_DEBE_HABER, P_USUARIO);

        // VENTA
        Guardar(P_CGRUPCTAS_OPERACION_V, P_CGRUPCTAS_CUENTA_SGRUP_V, P_CGRUPCTAS_IMPUESTO_V,
            P_CGRUPCTAS_CTAS_ID_IMPUESTO_V, P_CGRUPCTAS_CUENTA_IMPUESTO_V, P_CGRUPCTAS_CTAS_ID_OPE_MN_V,
            P_CGRUPCTAS_CUENTA_OPE_MN_V, P_CGRUPCTAS_CTAS_ID_OPE_ME_V, P_CGRUPCTAS_CUENTA_OPE_ME_V,
            P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_V, P_CGRUPCTAS_CUENTA_RELA_OPE_MN_V, P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_V,
            P_CGRUPCTAS_CUENTA_RELA_OPE_ME_V, P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_V, P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_V,
            P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_V, P_CGRUPCTAS_CUENTA_APLICACION_ANTI_V, P_CGRUPCTAS_DEBE_HABER_V, P_USUARIO_V);               

        //ANTICIPO
        Guardar(P_CGRUPCTAS_OPERACION_A, P_CGRUPCTAS_CUENTA_SGRUP_A, P_CGRUPCTAS_IMPUESTO_A,
            P_CGRUPCTAS_CTAS_ID_IMPUESTO_A, P_CGRUPCTAS_CUENTA_IMPUESTO_A, P_CGRUPCTAS_CTAS_ID_OPE_MN_A,
            P_CGRUPCTAS_CUENTA_OPE_MN_A, P_CGRUPCTAS_CTAS_ID_OPE_ME_A, P_CGRUPCTAS_CUENTA_OPE_ME_A,
            P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN_A, P_CGRUPCTAS_CUENTA_RELA_OPE_MN_A, P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME_A,
            P_CGRUPCTAS_CUENTA_RELA_OPE_ME_A, P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI_A, P_CGRUPCTAS_CUENTA_RECEPCION_ANTI_A,
            P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI_A, P_CGRUPCTAS_CUENTA_APLICACION_ANTI_A, P_CGRUPCTAS_DEBE_HABER_A, P_USUARIO_A);  

    } else {
        if (!guardar_compra) {
            infoCustom2("Debe configurar una cuenta contable por cada fila (COMPRA)");
            return;
        } if (!guardar_venta){
            infoCustom2("Debe configurar una cuenta contable por cada fila (VENTA)");
            return;
        }else {
            infoCustom2("Debe configurar una cuenta contable por cada fila (ANTICIPO)");
            return;
        }
    }

 }

function Guardar(P_CGRUPCTAS_OPERACION, P_CGRUPCTAS_CUENTA_SGRUP, P_CGRUPCTAS_IMPUESTO,
    P_CGRUPCTAS_CTAS_ID_IMPUESTO, P_CGRUPCTAS_CUENTA_IMPUESTO, P_CGRUPCTAS_CTAS_ID_OPE_MN,
    P_CGRUPCTAS_CUENTA_OPE_MN, P_CGRUPCTAS_CTAS_ID_OPE_ME, P_CGRUPCTAS_CUENTA_OPE_ME,
    P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN, P_CGRUPCTAS_CUENTA_RELA_OPE_MN, P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME,
    P_CGRUPCTAS_CUENTA_RELA_OPE_ME, P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI, P_CGRUPCTAS_CUENTA_RECEPCION_ANTI,
    P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI, P_CGRUPCTAS_CUENTA_APLICACION_ANTI, P_CGRUPCTAS_DEBE_HABER, P_USUARIO) {

    var data = new FormData();
     
    data.append('OPCION', 'G');
    data.append('P_CGRUPCTAS_OPERACION', P_CGRUPCTAS_OPERACION)
    data.append('P_CGRUPCTAS_CUENTA_SGRUP', P_CGRUPCTAS_CUENTA_SGRUP)
    data.append('P_CGRUPCTAS_IMPUESTO', P_CGRUPCTAS_IMPUESTO)
    data.append('P_CGRUPCTAS_CTAS_ID_IMPUESTO', P_CGRUPCTAS_CTAS_ID_IMPUESTO)
    data.append('P_CGRUPCTAS_CUENTA_IMPUESTO', P_CGRUPCTAS_CUENTA_IMPUESTO)
    data.append('P_CGRUPCTAS_CTAS_ID_OPE_MN', P_CGRUPCTAS_CTAS_ID_OPE_MN)
    data.append('P_CGRUPCTAS_CUENTA_OPE_MN', P_CGRUPCTAS_CUENTA_OPE_MN)
    data.append('P_CGRUPCTAS_CTAS_ID_OPE_ME', P_CGRUPCTAS_CTAS_ID_OPE_ME)
    data.append('P_CGRUPCTAS_CUENTA_OPE_ME', P_CGRUPCTAS_CUENTA_OPE_ME)
    data.append('P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN', P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN)
    data.append('P_CGRUPCTAS_CUENTA_RELA_OPE_MN', P_CGRUPCTAS_CUENTA_RELA_OPE_MN)
    data.append('P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME', P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME)
    data.append('P_CGRUPCTAS_CUENTA_RELA_OPE_ME', P_CGRUPCTAS_CUENTA_RELA_OPE_ME)
    data.append('P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI', P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI)
    data.append('P_CGRUPCTAS_CUENTA_RECEPCION_ANTI', P_CGRUPCTAS_CUENTA_RECEPCION_ANTI)
    data.append('P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI', P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI)
    data.append('P_CGRUPCTAS_CUENTA_APLICACION_ANTI', P_CGRUPCTAS_CUENTA_APLICACION_ANTI)
    data.append('P_CGRUPCTAS_DEBE_HABER', P_CGRUPCTAS_DEBE_HABER)
    data.append('USUARIO', P_USUARIO)
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CT/ajax/CTMCDCO.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).success(function (res) {
        if (res != null) {
            if (res == "OK") {
                cont_grabar = (cont_grabar + 1);
                if (cont_grabar == 2) {
                    exito();
                    cont_grabar = 0;
                    $("#btn_grabar").attr("value", "Actualizar");
                    ListarCtasSgrup('COMPRA');
                    ListarCtasSgrup('VENTA');
                    ListarCtasSgrup('ANTICIPO');
                    control_messages = 0;
                } 
            }
        } else {
            noexito();
        }
    })
    .error(function () {

    });
    
}

function checkearHaberDebe() {

    // COMPRAS
    $('#uniform-chxDebe2 span').removeClass().addClass("checked");
    $('#chxDebe2').attr('checked', true).parent().addClass("checked");
    $('#chxDebe2').attr('disabled', true);
    $('#chxHaber2').attr('disabled', true);

    $('#uniform-chxHaber3 span').removeClass().addClass("checked");
    $('#chxHaber3').attr('checked', true).parent().addClass("checked");
    $('#chxHaber3').attr('disabled', true);
    $('#chxDebe3').attr('disabled', true);

    $('#uniform-chxHaber4 span').removeClass().addClass("checked");
    $('#chxHaber4').attr('checked', true).parent().addClass("checked");
    $('#chxHaber4').attr('disabled', true);
    $('#chxDebe4').attr('disabled', true);

    $('#uniform-chxHaber5 span').removeClass().addClass("checked");
    $('#chxHaber5').attr('checked', true).parent().addClass("checked");
    $('#chxHaber5').attr('disabled', true);
    $('#chxDebe5').attr('disabled', true);

    $('#uniform-chxHaber6 span').removeClass().addClass("checked");
    $('#chxHaber6').attr('checked', true).parent().addClass("checked");
    $('#chxHaber6').attr('disabled', true);
    $('#chxDebe6').attr('disabled', true);

    // VENTAS
    $('#uniform-chxHaberv2 span').removeClass().addClass("checked");
    $('#chxHaberv2').attr('checked', true).parent().addClass("checked");
    $('#chxHaberv2').attr('disabled', true);
    $('#chxDebev2').attr('disabled', true);

    $('#uniform-chxDebev3 span').removeClass().addClass("checked");
    $('#chxDebev3').attr('checked', true).parent().addClass("checked");
    $('#chxDebev3').attr('disabled', true);
    $('#chxHaberv3').attr('disabled', true);

    $('#uniform-chxDebev4 span').removeClass().addClass("checked");
    $('#chxDebev4').attr('checked', true).parent().addClass("checked");
    $('#chxDebev4').attr('disabled', true);
    $('#chxHaberv4').attr('disabled', true);

    $('#uniform-chxDebev5 span').removeClass().addClass("checked");
    $('#chxDebev5').attr('checked', true).parent().addClass("checked");
    $('#chxDebev5').attr('disabled', true);
    $('#chxHaberv5').attr('disabled', true);

    $('#uniform-chxDebev6 span').removeClass().addClass("checked");
    $('#chxDebev6').attr('checked', true).parent().addClass("checked");
    $('#chxDebev6').attr('disabled', true);
    $('#chxHaberv6').attr('disabled', true);

    // ANTICIPOS
    $('#uniform-chxHabera2 span').removeClass().addClass("checked");
    $('#chxHabera2').attr('checked', true).parent().addClass("checked");
    $('#chxHabera2').attr('disabled', true);
    $('#chxDebea2').attr('disabled', true);

    $('#uniform-chxDebea3 span').removeClass().addClass("checked");
    $('#chxDebea3').attr('checked', true).parent().addClass("checked");
    $('#chxDebea3').attr('disabled', true);
    $('#chxHabera3').attr('disabled', true);

}

var CTMCDCO = function () {
    var plugins = function () {
        $('#slcEmpresa,#cbogrupo,#cbosubgrupo,#cbounidad,#cbomarca,#cbomoneda,#cboexistencia,#cbovolumen,#cboDetraccion,#cboPresentacion').select2();
        $(".combobox").select2();

        //compra
        $('#cbo_cuentaCompra').select2();
        $('#cbo_cuentaIgv').select2();
        $('#cbo_cuentaCompraMN').select2();
        $('#cbo_cuentaCompraME').select2();
        $('#cbo_cuentaCompraRelMN').select2();
        $('#cbo_cuentaCompraRelME').select2();

        //venta
        $('#cbo_cuentaVenta').select2();
        $('#cbo_cuentaIgv_venta').select2();
        $('#cbo_cuentaVentaMN').select2();
        $('#cbo_cuentaVentaME').select2();
        $('#cbo_cuentaVentaRelMN').select2();
        $('#cbo_cuentaVentaRelME').select2();

        //Anticipo
        $('#cbo_cuentaAnticipo').select2();
        $('#cbo_cuentaAnticipo_recepcion').select2();
        $('#cbo_cuentaAnticipo_aplicacion').select2();

        //cobro
        $('#cbo_cuentaCobro').select2();
        $('#cbo_cuentaIgv_Cobro').select2();
        $('#cbo_cuentaCobroMN').select2();
        $('#cbo_cuentaCobroME').select2();
        $('#cbo_cuentaCobroRelMN').select2();
        $('#cbo_cuentaCobroRelME').select2();

        //pago
        $('#cbo_cuentaPago').select2();
        $('#cbo_cuentaIgv_Pago').select2();
        $('#cbo_cuentaPagoMN').select2();
        $('#cbo_cuentaPagoME').select2();
        $('#cbo_cuentaPagoRelMN').select2();
        $('#cbo_cuentaPagoRelME').select2();


        //pago diverso
        $('#cbo_cuentaPagoDiverso').select2();
        $('#cbo_cuentaIgv_PagoDiverso').select2();
        $('#cbo_cuentaPagoDiversoMN').select2();
        $('#cbo_cuentaPagoDiversoME').select2();
        $('#cbo_cuentaPagoDiversoRelMN').select2();
        $('#cbo_cuentaPagoDiversoRelME').select2();

        //pago asignacion
        $('#cbo_cuentaPagoAsignaciones').select2();
        $('#cbo_cuentaIgv_PagoAsignaciones').select2();
        $('#cbo_cuentaPagoAsignacionesMN').select2();
        $('#cbo_cuentaPagoAsignacionesME').select2();
        $('#cbo_cuentaPagoAsignacionesRelMN').select2();
        $('#cbo_cuentaPagoAsignacionesRelME').select2();


    }
    var cargaInicial = function () {
        CargaCtasContables();
    };



    return {
        init: function () {
            plugins();
            cargaInicial();
        }
    };
}();
var CTMLDCO = function () {
   
    var cargaInicial = function () {
        ListarCtasGeneral();
    };



    return {
        init: function () {
            //plugins();
            cargaInicial();
        }
    };
}();
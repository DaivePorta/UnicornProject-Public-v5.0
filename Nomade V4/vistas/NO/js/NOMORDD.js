//var cadenalista = "";
var email;
var NOMORDD = function () {

    var base = 0;
    var flagTb = false;

    var plugins = function () {
        $('#cbo_Empresa, #cbo_Sucursal, #cbo_modo_pago, #cbo_doc_registro, #cbo_doc_origen, #cbo_moneda, #cbo_und_medida, #cbx_destino, #cboTipoDoc, #cbotipoDoctrans').select2();
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_vig').datepicker();
        $('#txt_fec_comp_detrac, #txt_fec_comp_percep, #txt_fec_comp_reten, #txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento, #txt_fec_vig').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txt_fec_emision, #txt_fec_transaccion, #txt_fec_vencimiento').datepicker("setDate", "now");
        $("#txtcant").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#cboUniMedida").select2();

        $('#txt_fec_vencimiento').datepicker('setStartDate', $('#txt_fec_transaccion').val());
        $('#txt_fec_transaccion').datepicker().on("change", function () {
            if ($('#txt_fec_transaccion').val() != "") {
                $('#txt_fec_vencimiento').datepicker('setStartDate', $('#txt_fec_transaccion').val());
            }
        });

    }

    var cargarInputsPersona = function () {
        var jsonPersonas;
        var arrayPersonas = new Array();

        function cargarJson() {
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMRDNI.ashx?flag=L",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null && datos != "") {
                        jsonPersonas = datos;
                    }
                }
            });
        }

        var cargaAutoCompleteInputs = function () {

            var json = jsonPersonas;
            if (json != null) {
                json.filter(function (e) { if (arrayPersonas.indexOf(e.NOMBRE) < 0) { arrayPersonas.push(e.NOMBRE); } });
            }

            $(".personas").typeahead({ source: arrayPersonas }, { highlight: true, hint: true });

            $(".personas").keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"))

            }).change(function () {
                var actual = $(this);
                var encontrado = false;
                json.filter(function (d) {
                    if (d.NOMBRE == actual.val()) {
                        actual.attr("valor", d.PIDM);
                        encontrado = true;
                        //cargarImagenes(d.PIDM);
                    }
                    if (!encontrado) {
                        actual.removeAttr("valor");
                    }
                });
                if (actual.val() == "") { actual.removeAttr("valor"); }
            });
        }

        cargarJson();
        cargaAutoCompleteInputs();
    }

    var fillCboEmpresa = function () {
        var select = $('#cbo_Empresa').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" agente-reten-ind="' + datos[i].AGENTE_RETEN_IND + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $(select).val($('#ctl00_hddctlg').val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $(select).select2();
    }

    //--------------------------
    var REGISTRAR = function () {

        Calcular();
        var datos = datosTabla();
        var data = new FormData;
        var pidm = $("#txtpersona").attr("valor");

        data.append('p_TEX', datos);
        data.append('p_RESPONSABLE', pidm);
        data.append('p_AUTOGENERADO', '00');
        data.append('p_INCLU_IGV', $("#chk_inc_igv").is(":checked") ? "S" : "N");
        data.append('p_COMPRADOR', $('#ctl00_txtus').val());
        data.append('p_CONTACTO', $('#hfContactopidm').val());
        data.append('p_DOC_REGIS', $('#cbo_doc_registro').val());
        data.append('p_DOC_REGIS_NRO', $('#txt_num_ser_reg').val());
        data.append('p_CATALOGO', $('#cbo_Empresa').val());
        data.append('p_ESTABLEC', $('#cbo_Sucursal').val());
        data.append('p_PROVEDOR', $('#hfPIDM').val());
        data.append('p_FECHA_TRANSAC', $('#txt_fec_transaccion').val());
        data.append('p_FECHA_EMISION', $('#txt_fec_emision').val());
        data.append('p_DOC_ORIG', '');
        data.append('p_DOC_ORIG_NRO', '');
        data.append('p_DESPACHO', $('#cbx_destino').val());
        data.append('p_ENTREGA', $("#txt_comentario").val());
        data.append('p_PROVEDOR_TIPODOC', $("#cboTipoDoc").val());
        data.append('p_TRANSPORTISTA_TIPODOC', $("#cbotipoDoctrans").val());

        if ($('#cbo_doc_registro').val() == "C") {
            if ($('#rdPublico').is(':checked')) {
                if ($("#hfPIDM_EMPTRANS").val() == "") {
                    alertCustom("Ingrese un Transportista correcto");
                    return;
                }
                else {
                    data.append('p_TIPO_TRANSPOR', 'PUB');
                    data.append('p_TRANSPORTISTA', $("#hfPIDM_EMPTRANS").val());
                    data.append('p_TRANSPOR_VEHICULO', $("#txtvehiculo").val());
                    data.append('p_TRANSPOR_CERT_INSCR', $("#txtCertificadoInscripcion").val());
                    data.append('p_TRANSPOR_CHOFER', $("#txtchofer").val());
                    data.append('p_TRANSPOR_LICENCIA', $("#txtLicConducir").val());
                }
            }

            if ($('#rdPrivado').is(':checked')) {
                data.append('p_TIPO_TRANSPOR', 'PRI');
                data.append('p_TRANSPORTISTA', $("#hfPIDM_EMPTRANS").val());
                data.append('p_TRANSPOR_VEHICULO', $("#txtvehiculo").val());
                data.append('p_TRANSPOR_CERT_INSCR', $("#txtCertificadoInscripcion").val());
                data.append('p_TRANSPOR_CHOFER', $("#txtchofer").val());
                data.append('p_TRANSPOR_LICENCIA', $("#txtLicConducir").val());
            }

            if ($('#rdProveedor').is(':checked')) {
                data.append('p_TIPO_TRANSPOR', 'PRO');
                data.append('p_TRANSPORTISTA', '');
                data.append('p_TRANSPOR_VEHICULO', '');
                data.append('p_TRANSPOR_CERT_INSCR', '');
                data.append('p_TRANSPOR_CHOFER', '');
                data.append('p_TRANSPOR_LICENCIA', '');
            }
        }
        else {
            data.append('p_TIPO_TRANSPOR', '');
            data.append('p_TRANSPORTISTA', '');
            data.append('p_TRANSPOR_VEHICULO', '');
            data.append('p_TRANSPOR_CERT_INSCR', '');
            data.append('p_TRANSPOR_CHOFER', '');
            data.append('p_TRANSPOR_LICENCIA', '');
        }

        data.append('p_MODO_PAGO', $('#cbo_modo_pago').val());

        if ($('#cbo_modo_pago').val() == '0013') {
            data.append('p_PLAZO_PAGO', '0');
        }
        else {
            data.append('p_PLAZO_PAGO', $('#txt_plazo_pago').val());
        }

        data.append('p_FECHAV_PAGO', $('#txt_fec_vencimiento').val());
        data.append('p_ESTADO_PAGO', $('#txt_estado_credito').val());

        data.append('p_MONETAR_MONEDA', $('#cbo_moneda').val());
        data.append('p_MONETAR_BASE_IMP', $('#txt_base_imponible').val());
        data.append('p_MONETAR_DESCUENTO', $('#txt_descuento').val());
        data.append('p_MONETAR_ISC', $('#txt_isc').val());
        data.append('p_MONETAR_SUBTOTAL', $('#txt_subtotal').val());
        data.append('p_MONETAR_IGVPOR', $("#txt_impuesto").val());
        data.append('p_MONETAR_IGVSOL', $("#txt_impuesto_calc").val());
        data.append('p_MONETAR_AJUST', $('#txt_ajuste').val());
        data.append('p_MONETAR_PREC_TOTAL', $('#txt_prec_total').val());
        data.append('p_GLOSA_GENERAL', $('#txtGlosa_general').val());
        data.append('p_SOCOTI_CODE', "");//txtCodigoCotizacion
        data.append('p_COMPLETO_IND', "N");
        data.append('p_MONETAR_PAGAR', $('#txt_monto_total').val());
        data.append('p_TRIBUTAC_SOLES', $('#txt_monto_detraccion').val());
        data.append('p_TRIBUTAC_CTA_DETRA', $('#txt_cta_detrac').val());
        data.append('p_TRIBUTAC_SUJETODETRA', $("#chk_detraccion").is(":checked") ? "S" : "N");
        data.append('p_TRIBUTAC_SUJETOPERS', $("#chk_percepcion").is(":checked") ? "S" : "N");
        data.append('p_TRIBUTAC_SUJETORETEN', $("#chk_retencion").is(":checked") ? "S" : "N");
        data.append('p_MONETAR_DETRACCION', $("#txt_detraccion").val() == "" ? "0" : $("#txt_detraccion").val());
        data.append('p_MONETAR_PERCEPCION', $("#txt_Percepcion").val() == "" ? "0" : $("#txt_Percepcion").val());
        data.append('p_MONETAR_RETENCION', $("#txt_Retencion").val() == "" ? "0" : $("#txt_Retencion").val());

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos[0].error != "error") {
                    if (datos[0].NOCORREO != "NOCORREO") {
                        if (datos[0].SUCCESS == "OK") {
                            exito();
                            $('#txtNumDctoComp').val(datos[0].CODE_PRODUCTO);
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_').val(datos[0].CODE_PRODUCTO);
                            $('#txt_num_ser_reg').val(datos[0].CORRELATIVO)
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', false)
                            $('#idRegis').attr('disabled', true);
                            $('#idRegis').remove();
                            $('#OcCorreo').css('display', 'none');
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfDescarga').val(datos[0].CODE_PRODUCTO);

                            //$('input[type=checkbox]').attr('disabled', true);
                            //$('input[type=radio]').attr('disabled', true);
                            //$('input[type=text]').attr('disabled', true);

                            //$('textarea').attr('disabled', true);
                            $('#cbo_Empresa').attr('disabled', true);
                            $('#cbo_Sucursal').attr('disabled', true);
                            $('#cbo_doc_registro').attr('disabled', true);
                            $('#cbx_destino').attr('disabled', true);
                            //$('#cbo_modo_pago').attr('disabled', true);
                            $("#s2id_autogen1_search").attr('disabled', false)
                            //$(".quitar").css('display', 'none');
                           // $('#detalle').DataTable().columns(9).visible(false);
                            //$('#btnMail').removeClass('hidden');
                            $("#idRegis").hide();
                            $("#idModificar").show();
                            //$("#divMsgCorreo").css("display", "block");
                            //$("#msgCorreo").html("Se envió correo electrónico");
                        }
                        else {
                            noexito();
                        }
                    }
                    else {
                        noexito();
                        var ruc = $('#txt_ruc_proveedor').val();
                        var tp = ''
                        if (ruc.substring(0, 2) == 10) {
                            tp = 'N';
                        }
                        else {
                            tp = 'J';
                        }
                        var td = $('#cboTipoDoc').val();
                        var d = $('#txt_ruc_proveedor').val();

                        //window.location.href = '?f=ncmpers&tp=' + tp + '&td=' + td + '&d=' + d;
                        $('#correoPro').html("<a href='?f=NRMGEPR&tp=" + tp + "&td=" + td + "&d=" + d + "' target='_blank'> Proveedor no tiene correo Electrónico. Verifique  </a>")
                        alertCustom("Proveedor no tiene correo Electrónico. Verifique");

                    }

                }
                else {
                    alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                    $('#txtNumDctoComp').val(datos[0].CODE_PRODUCTO);
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_').val(datos[0].CODE_PRODUCTO);
                    $('#txt_num_ser_reg').val(datos[0].CORRELATIVO)
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', false)
                    $('#idRegis').attr('disabled', true);
                    $('#idRegis').remove();
                    $('#OcCorreo').css('display', 'none');
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfDescarga').val(datos[0].CODE_PRODUCTO);

                    $('input[type=checkbox]').attr('disabled', true);
                    $('input[type=text]').attr('disabled', true);

                    $('textarea').attr('disabled', true);
                    $("#s2id_autogen1_search").attr('disabled', false);
                }
            },
            error: function (msg) {
                noexito(msg);
                Desbloquear("ventana");
            }
        });
    }
    
    var completarDocumento = function () {
        Calcular();
        var datos = datosTabla();
        var data = new FormData;
        var pidm = $("#txtpersona").attr("valor");
        data.append('p_CODIGO', $('#txtNumDctoComp').val());
        data.append('p_TEX', datos);
        data.append('p_RESPONSABLE', pidm);
        data.append('p_AUTOGENERADO', '00');
        data.append('p_INCLU_IGV', $("#chk_inc_igv").is(":checked") ? "S" : "N");
        data.append('p_COMPRADOR', $('#ctl00_txtus').val());
        data.append('p_CONTACTO', $('#hfContactopidm').val());
        data.append('p_DOC_REGIS', $('#cbo_doc_registro').val());
        data.append('p_DOC_REGIS_NRO', $('#txt_num_ser_reg').val());
        data.append('p_CATALOGO', $('#cbo_Empresa').val());
        data.append('p_ESTABLEC', $('#cbo_Sucursal').val());
        data.append('p_PROVEDOR', $('#hfPIDM').val());
        data.append('p_FECHA_TRANSAC', $('#txt_fec_transaccion').val());
        data.append('p_FECHA_EMISION', $('#txt_fec_emision').val());
        data.append('p_DOC_ORIG', '');
        data.append('p_DOC_ORIG_NRO', '');
        data.append('p_DESPACHO', $('#cbx_destino').val());
        data.append('p_ENTREGA', $("#txt_comentario").val());
        data.append('p_PROVEDOR_TIPODOC', $("#cboTipoDoc").val());
        data.append('p_TRANSPORTISTA_TIPODOC', $("#cbotipoDoctrans").val());

        if ($('#cbo_doc_registro').val() == "C") {
            if ($('#rdPublico').is(':checked')) {
                if ($("#hfPIDM_EMPTRANS").val() == "") {
                    alertCustom("Ingrese un Transportista correcto");
                    return;
                }
                else {
                    data.append('p_TIPO_TRANSPOR', 'PUB');
                    data.append('p_TRANSPORTISTA', $("#hfPIDM_EMPTRANS").val());
                    data.append('p_TRANSPOR_VEHICULO', $("#txtvehiculo").val());
                    data.append('p_TRANSPOR_CERT_INSCR', $("#txtCertificadoInscripcion").val());
                    data.append('p_TRANSPOR_CHOFER', $("#txtchofer").val());
                    data.append('p_TRANSPOR_LICENCIA', $("#txtLicConducir").val());
                }
            }

            if ($('#rdPrivado').is(':checked')) {
                data.append('p_TIPO_TRANSPOR', 'PRI');
                data.append('p_TRANSPORTISTA', $("#hfPIDM_EMPTRANS").val());
                data.append('p_TRANSPOR_VEHICULO', $("#txtvehiculo").val());
                data.append('p_TRANSPOR_CERT_INSCR', $("#txtCertificadoInscripcion").val());
                data.append('p_TRANSPOR_CHOFER', $("#txtchofer").val());
                data.append('p_TRANSPOR_LICENCIA', $("#txtLicConducir").val());
            }

            if ($('#rdProveedor').is(':checked')) {
                data.append('p_TIPO_TRANSPOR', 'PRO');
                data.append('p_TRANSPORTISTA', '');
                data.append('p_TRANSPOR_VEHICULO', '');
                data.append('p_TRANSPOR_CERT_INSCR', '');
                data.append('p_TRANSPOR_CHOFER', '');
                data.append('p_TRANSPOR_LICENCIA', '');
            }
        }
        else {
            data.append('p_TIPO_TRANSPOR', '');
            data.append('p_TRANSPORTISTA', '');
            data.append('p_TRANSPOR_VEHICULO', '');
            data.append('p_TRANSPOR_CERT_INSCR', '');
            data.append('p_TRANSPOR_CHOFER', '');
            data.append('p_TRANSPOR_LICENCIA', '');
        }
        data.append('p_MODO_PAGO', $('#cbo_modo_pago').val());
        if ($('#cbo_modo_pago').val() == '0013') {
            data.append('p_PLAZO_PAGO', '0');
        }
        else {
            data.append('p_PLAZO_PAGO', $('#txt_plazo_pago').val());
        }    
        data.append('p_FECHAV_PAGO', $('#txt_fec_vencimiento').val());
        data.append('p_ESTADO_PAGO', $('#txt_estado_credito').val());
        data.append('p_MONETAR_MONEDA', $('#cbo_moneda').val());
        data.append('p_MONETAR_BASE_IMP', $('#txt_base_imponible').val());
        data.append('p_MONETAR_DESCUENTO', $('#txt_descuento').val());
        data.append('p_MONETAR_ISC', $('#txt_isc').val());
        data.append('p_MONETAR_SUBTOTAL', $('#txt_subtotal').val());
        data.append('p_MONETAR_IGVPOR', $("#txt_impuesto").val());
        data.append('p_MONETAR_IGVSOL', $("#txt_impuesto_calc").val());
        data.append('p_MONETAR_AJUST', $('#txt_ajuste').val());
        data.append('p_MONETAR_PREC_TOTAL', $('#txt_prec_total').val());
        data.append('p_GLOSA_GENERAL', $('#txtGlosa_general').val());
        data.append('p_SOCOTI_CODE', "");//txtCodigoCotizacion
        data.append('p_COMPLETO_IND', "S");
        data.append('p_MONETAR_PAGAR', $('#txt_monto_total').val());
        data.append('p_TRIBUTAC_SOLES', $('#txt_monto_detraccion').val());
        data.append('p_TRIBUTAC_CTA_DETRA', $('#txt_cta_detrac').val());
        data.append('p_TRIBUTAC_SUJETODETRA', $("#chk_detraccion").is(":checked") ? "S" : "N");
        data.append('p_TRIBUTAC_SUJETOPERS', $("#chk_percepcion").is(":checked") ? "S" : "N");
        data.append('p_TRIBUTAC_SUJETORETEN', $("#chk_retencion").is(":checked") ? "S" : "N");
        data.append('p_MONETAR_DETRACCION', $("#txt_detraccion").val() == "" ? "0" : $("#txt_detraccion").val());
        data.append('p_MONETAR_PERCEPCION', $("#txt_Percepcion").val() == "" ? "0" : $("#txt_Percepcion").val());
        data.append('p_MONETAR_RETENCION', $("#txt_Retencion").val() == "" ? "0" : $("#txt_Retencion").val());

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=12",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos[0].error != "error") {
                    if (datos[0].NOCORREO != "NOCORREO") {
                        if (datos[0].SUCCESS == "OK") {
                            exito();
                            $('#txtNumDctoComp').val(datos[0].CODE_PRODUCTO);
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_').val(datos[0].CODE_PRODUCTO);
                            $('#txt_num_ser_reg').val(datos[0].CORRELATIVO)
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', false)
                            $('#idRegis').attr('disabled', true);
                            $('#idRegis').remove();                            
                            $('#OcCorreo').css('display', 'none');
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfDescarga').val(datos[0].CODE_PRODUCTO);
                            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD").show();
                            $('input[type=checkbox]').attr('disabled', true);
                            $('input[type=radio]').attr('disabled', true);
                            $('input[type=text]').attr('disabled', true);
                            $('textarea').attr('disabled', true);
                            $('#cbo_Empresa').attr('disabled', true);
                            $('#cbo_Sucursal').attr('disabled', true);
                            $('#cbo_doc_registro').attr('disabled', true);
                            $('#cbx_destino').attr('disabled', true);
                            $('#cbo_modo_pago').attr('disabled', true);
                            $("#s2id_autogen1_search").attr('disabled', false)
                            $(".quitar").css('display', 'none');
                            $('#detalle').DataTable().columns(9).visible(false);
                            $('#btnMail').removeClass('hidden');
                            $("#idRegis").hide(); 
                            $("#idModificar").hide(); 
                            $("#idCompletar").hide(); 
                            $("#divMsgCorreo").css("display", "block");
                            $("#msgCorreo").html("Se envió correo electrónico");
                        }
                        else {
                            noexito();
                        }
                    }
                    else {
                        noexito();
                        var ruc = $('#txt_ruc_proveedor').val();
                        var tp = ''
                        if (ruc.substring(0, 2) == 10) {
                            tp = 'N';
                        }
                        else {
                            tp = 'J';
                        }
                        var td = $('#cboTipoDoc').val();
                        var d = $('#txt_ruc_proveedor').val();
                        //window.location.href = '?f=ncmpers&tp=' + tp + '&td=' + td + '&d=' + d;
                        $('#correoPro').html("<a href='?f=NRMGEPR&tp=" + tp + "&td=" + td + "&d=" + d + "' target='_blank'> Proveedor no tiene correo Electrónico. Verifique  </a>")
                        alertCustom("Proveedor no tiene correo Electrónico. Verifique");
                    }
                }
                else {
                    alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                    $('#txtNumDctoComp').val(datos[0].CODE_PRODUCTO);
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_').val(datos[0].CODE_PRODUCTO);
                    $('#txt_num_ser_reg').val(datos[0].CORRELATIVO)
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', false)
                    $('#idRegis').attr('disabled', true);
                    $('#idRegis').remove();
                    $('#OcCorreo').css('display', 'none');
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfDescarga').val(datos[0].CODE_PRODUCTO);

                    $('input[type=checkbox]').attr('disabled', true);
                    $('input[type=text]').attr('disabled', true);

                    $('textarea').attr('disabled', true);
                    $("#s2id_autogen1_search").attr('disabled', false);
                }
            },
            error: function (msg) {
                noexito(msg);
                Desbloquear("ventana");
            }
        });
    }

    var modificarAdquisicion = function () {

        Calcular();
        var datos = datosTabla();
        var data = new FormData;
        var pidm = $("#txtpersona").attr("valor");

        data.append('p_CODIGO', $('#txtNumDctoComp').val());
        data.append('p_TEX', datos);
        data.append('p_RESPONSABLE', pidm);
        data.append('p_AUTOGENERADO', '00');
        data.append('p_INCLU_IGV', $("#chk_inc_igv").is(":checked") ? "S" : "N");
        data.append('p_COMPRADOR', $('#ctl00_txtus').val());
        data.append('p_CONTACTO', $('#hfContactopidm').val());
        data.append('p_DOC_REGIS', $('#cbo_doc_registro').val());
        data.append('p_DOC_REGIS_NRO', $('#txt_num_ser_reg').val());
        data.append('p_CATALOGO', $('#cbo_Empresa').val());
        data.append('p_ESTABLEC', $('#cbo_Sucursal').val());
        data.append('p_PROVEDOR', $('#hfPIDM').val());
        data.append('p_FECHA_TRANSAC', $('#txt_fec_transaccion').val());
        data.append('p_FECHA_EMISION', $('#txt_fec_emision').val());
        data.append('p_DOC_ORIG', '');
        data.append('p_DOC_ORIG_NRO', '');
        data.append('p_DESPACHO', $('#cbx_destino').val());
        data.append('p_ENTREGA', $("#txt_comentario").val());
        data.append('p_PROVEDOR_TIPODOC', $("#cboTipoDoc").val());
        data.append('p_TRANSPORTISTA_TIPODOC', $("#cbotipoDoctrans").val());       


        if ($('#cbo_doc_registro').val() == "C") {
            if ($('#rdPublico').is(':checked')) {
                if ($("#hfPIDM_EMPTRANS").val() == "") {
                    alertCustom("Ingrese un Transportista correcto");
                    return;
                }
                else {
                    data.append('p_TIPO_TRANSPOR', 'PUB');
                    data.append('p_TRANSPORTISTA', $("#hfPIDM_EMPTRANS").val());
                    data.append('p_TRANSPOR_VEHICULO', $("#txtvehiculo").val());
                    data.append('p_TRANSPOR_CERT_INSCR', $("#txtCertificadoInscripcion").val());
                    data.append('p_TRANSPOR_CHOFER', $("#txtchofer").val());
                    data.append('p_TRANSPOR_LICENCIA', $("#txtLicConducir").val());
                }
            }

            if ($('#rdPrivado').is(':checked')) {
                data.append('p_TIPO_TRANSPOR', 'PRI');
                data.append('p_TRANSPORTISTA', $("#hfPIDM_EMPTRANS").val());
                data.append('p_TRANSPOR_VEHICULO', $("#txtvehiculo").val());
                data.append('p_TRANSPOR_CERT_INSCR', $("#txtCertificadoInscripcion").val());
                data.append('p_TRANSPOR_CHOFER', $("#txtchofer").val());
                data.append('p_TRANSPOR_LICENCIA', $("#txtLicConducir").val());
            }

            if ($('#rdProveedor').is(':checked')) {
                data.append('p_TIPO_TRANSPOR', 'PRO');
                data.append('p_TRANSPORTISTA', '');
                data.append('p_TRANSPOR_VEHICULO', '');
                data.append('p_TRANSPOR_CERT_INSCR', '');
                data.append('p_TRANSPOR_CHOFER', '');
                data.append('p_TRANSPOR_LICENCIA', '');
            }
        }
        else {
            data.append('p_TIPO_TRANSPOR', '');
            data.append('p_TRANSPORTISTA', '');
            data.append('p_TRANSPOR_VEHICULO', '');
            data.append('p_TRANSPOR_CERT_INSCR', '');
            data.append('p_TRANSPOR_CHOFER', '');
            data.append('p_TRANSPOR_LICENCIA', '');
        }

        data.append('p_MODO_PAGO', $('#cbo_modo_pago').val());

        if ($('#cbo_modo_pago').val() == '0013') {
            data.append('p_PLAZO_PAGO', '0');
        }
        else {
            data.append('p_PLAZO_PAGO', $('#txt_plazo_pago').val());
        }

        data.append('p_FECHAV_PAGO', $('#txt_fec_vencimiento').val());
        data.append('p_ESTADO_PAGO', $('#txt_estado_credito').val());

        data.append('p_MONETAR_MONEDA', $('#cbo_moneda').val());
        data.append('p_MONETAR_BASE_IMP', $('#txt_base_imponible').val());
        data.append('p_MONETAR_DESCUENTO', $('#txt_descuento').val());
        data.append('p_MONETAR_ISC', $('#txt_isc').val());
        data.append('p_MONETAR_SUBTOTAL', $('#txt_subtotal').val());
        data.append('p_MONETAR_IGVPOR', $("#txt_impuesto").val());
        data.append('p_MONETAR_IGVSOL', $("#txt_impuesto_calc").val());
        data.append('p_MONETAR_AJUST', $('#txt_ajuste').val());
        data.append('p_MONETAR_PREC_TOTAL', $('#txt_prec_total').val());
        data.append('p_GLOSA_GENERAL', $('#txtGlosa_general').val());
        data.append('p_SOCOTI_CODE', "");//txtCodigoCotizacion        
        data.append('p_MONETAR_PAGAR', $('#txt_monto_total').val());
        data.append('p_TRIBUTAC_SOLES', $('#txt_monto_detraccion').val());
        data.append('p_TRIBUTAC_CTA_DETRA', $('#txt_cta_detrac').val());
        data.append('p_TRIBUTAC_SUJETODETRA', $("#chk_detraccion").is(":checked") ? "S" : "N");
        data.append('p_TRIBUTAC_SUJETOPERS', $("#chk_percepcion").is(":checked") ? "S" : "N");
        data.append('p_TRIBUTAC_SUJETORETEN', $("#chk_retencion").is(":checked") ? "S" : "N");
        data.append('p_MONETAR_DETRACCION', $("#txt_detraccion").val() == "" ? "0" : $("#txt_detraccion").val());
        data.append('p_MONETAR_PERCEPCION', $("#txt_Percepcion").val() == "" ? "0" : $("#txt_Percepcion").val());
        data.append('p_MONETAR_RETENCION', $("#txt_Retencion").val() == "" ? "0" : $("#txt_Retencion").val());

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=11",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos[0].error != "error") {
                    if (datos[0].NOCORREO != "NOCORREO") {
                        if (datos[0].SUCCESS == "OK") {
                            exito();
                            //$('#txtNumDctoComp').val(datos[0].CODE_PRODUCTO);
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_').val(datos[0].CODE_PRODUCTO);
                            //$('#txt_num_ser_reg').val(datos[0].CORRELATIVO)
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', false)
                            $('#idRegis').attr('disabled', true);
                            $('#idRegis').remove();
                            $('#OcCorreo').css('display', 'none');
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfDescarga').val(datos[0].CODE_PRODUCTO);

                           
                            $('#cbo_Empresa').attr('disabled', true);
                            $('#cbo_Sucursal').attr('disabled', true);
                            $('#cbo_doc_registro').attr('disabled', true);
                            $('#cbx_destino').attr('disabled', true);
                           
                            $("#s2id_autogen1_search").attr('disabled', false)
                           
                            //$('#btnMail').removeClass('hidden');
                            $("#idRegis").hide();
                            $("#idModificar").show();
                            //$("#divMsgCorreo").css("display", "block");
                            
                        }
                        else {
                            noexito();
                        }
                    }
                    else {
                        noexito();
                        var ruc = $('#txt_ruc_proveedor').val();
                        var tp = ''
                        if (ruc.substring(0, 2) == 10) {
                            tp = 'N';
                        }
                        else {
                            tp = 'J';
                        }
                        var td = $('#cboTipoDoc').val();
                        var d = $('#txt_ruc_proveedor').val();

                        //window.location.href = '?f=ncmpers&tp=' + tp + '&td=' + td + '&d=' + d;
                        $('#correoPro').html("<a href='?f=NRMGEPR&tp=" + tp + "&td=" + td + "&d=" + d + "' target='_blank'> Proveedor no tiene correo Electrónico. Verifique  </a>")
                        alertCustom("Proveedor no tiene correo Electrónico. Verifique");

                    }

                }
                else {
                    alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                    $('#txtNumDctoComp').val(datos[0].CODE_PRODUCTO);
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_').val(datos[0].CODE_PRODUCTO);
                    $('#txt_num_ser_reg').val(datos[0].CORRELATIVO)
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', false)
                    $('#idRegis').attr('disabled', true);
                    $('#idRegis').remove();
                    $('#OcCorreo').css('display', 'none');
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfDescarga').val(datos[0].CODE_PRODUCTO);

                    $('input[type=checkbox]').attr('disabled', true);
                    $('input[type=text]').attr('disabled', true);

                    $('textarea').attr('disabled', true);
                    $("#s2id_autogen1_search").attr('disabled', false);
                }
            },
            error: function (msg) {
                noexito(msg);
                Desbloquear("ventana");
            }
        });
    }
    
    var fillcboOrigen = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=7" + "&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_doc_origen').empty();
                $('#cbo_doc_origen').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_doc_origen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $('#cbo_doc_origen').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillcboOrigenEspecifico = function () {
        var select = $('#cbo_doc_origen').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + $('#cbo_doc_registro').val() + "&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $(select).select2();
    }

    var fillcboRegistro = function () {
        var select = $('#cbo_doc_registro').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=7&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $(select).val('0001');
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $(select).select2();
    }

    var fillcboRegistroEspecifico = function (opcion) {
        var select = $('#cbo_doc_registro').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG_CODE=" + $('#cbo_Empresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $(select).val('0001');
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $(select).select2();
    }

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
                        $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                $('#cbo_moneda').val(datos[pos].CODIGO);
                ListarValorCambio($('#cbo_moneda').val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cbo_moneda').select2();
    }

    var fillimpuesto = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                }
                else { alertCustom("No se recupero el impuesto correctamente!"); }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboModoPago = function () {
        $('#cbo_modo_pago').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_modo_pago').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_modo_pago').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_modo_pago').val(datos[0].CODIGO);
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cbo_modo_pago').select2();
    }

    var fillcboUniMedida = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=11",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_und_medida').empty();
                $('#cbo_und_medida').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_und_medida').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_und_medida').select2('val', "");
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var empresa = {};
    var cargarEmpresaDefault = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/NAMINSA.ashx?OPCION=0&CTLG_CODE=" + $('#ctl00_hddctlg').val(),
            contenttype: "application/json;",
            datatype: "json",
            success: function (datos) {
                if (datos != null) {
                    empresa = datos[0];
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var datosTabla = function () {
        var datos_tabla;
        var datos_fila = '';
        $('#detalle tbody').children().each(function (i) {
            var row = oTableActividad.fnGetData(i);
            var v_PRODUCTO, v_UNID_MEDIDAD, v_CANTIDAD, v_IMPORTE, v_GLOSA, ITEMS, v_PREC_UNI, v_DES_PRODUCTO;

            //v_PRODUCTO = $(this).find('td').eq(0).text();
            //v_UNID_MEDIDAD = $(this).find('td.mcodmedida').text();
            //v_CANTIDAD = $(this).find('td.mcantidad').text();
            //v_PREC_UNI = $(this).find('td.mimporte').text();
            //v_IMPORTE = $(this).find('td.mtotal').text();
            //v_GLOSA = $(this).find('td.mglosa').text();

            v_PRODUCTO = row.CODIGO;
            v_UNID_MEDIDAD = row.CODIGO_MEDIDAD;
            v_CANTIDAD = row.CANTIDAD;
            v_PREC_UNI = row.IMPORTE;
            v_IMPORTE = row.TOTAL;
            v_GLOSA = row.GLOSA;
            v_DES_PRODUCTO = row.DES_PRODUCTO;

            if (v_GLOSA == '') {
                v_GLOSA = ''
            }

            ITEMS = i + 1;

            datos_fila += v_PRODUCTO + ',' + v_UNID_MEDIDAD + ',' + v_CANTIDAD + ',' + v_PREC_UNI + ',' + v_IMPORTE + ',' + v_DES_PRODUCTO + ',' + v_GLOSA + ','/*txtCodigoCotizacion*/;
            datos_fila += '|';
        });
        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;
    }

    var eventoControles = function () {
        var fechaAnterior = "";

        $('#cbo_Sucursal').on('change', function () {
            limpiar();
            limpiarDatosMonetarios();
            $('#txtcodprod').val('');
            $('#cboUniMedida').select2("val","");
            if (flagTb) {
                if (oTableActividad.fnGetData().length != 0) {

                    $('#detalle').DataTable().data().clear().draw()
                }
            }

            cargarProductos();
            autocompletarDatosProducto();
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            var asunto1 = '';
            var contenido = $('#txtGlosa_general').val();
            if ($('#cbo_doc_registro').val() == 'C') {
                asunto1 = "ORDEN DE COMPRA " + $('#txt_num_ser_reg').val()
            }
            else {
                asunto1 = "ORDEN DE SERVICIO " + $('#txt_num_ser_reg').val()
            }
            $('#txtAsunto').val(asunto1);
            $('#txtcontenido').val(contenido);
            
            //
            cargarCorreos();
            $('#divMail').modal('show');
        });
             
        $('#cbo_modo_pago').on('change', function () {
            if ($('#cbo_modo_pago').val() == '0001') {
                $('#CuentasPagar').slideDown();
            }
            else {
                $('#CuentasPagar').slideUp();
            }
            if ($('#cbo_modo_pago').val() == "0002") {
                $("#txt_plazo_pago").removeAttr("disabled");
                $("#txt_fec_vencimiento").removeAttr("disabled");             
                $("#txt_plazo_pago").val($('#hfPlzo').val());
            }
            else {
                $("#txt_plazo_pago").attr("disabled", "disabled");
                $("#txt_fec_vencimiento").attr("disabled", "disabled");
                $('#txt_plazo_pago').val('0');
           }

         
            if ($('#cbo_modo_pago').val() == "0001") {
                $("#txt_fec_vencimiento").val($("#txt_fec_transaccion").val());
            } else {
                calcularFechaVencimiento();               
            }
        });

        $("#txt_fec_transaccion").on("change", function () {
            if ($("#txt_fec_transaccion").val() != fechaAnterior) {              
                if ($("#cbo_modo_pago").val() == "0001") {
                    $("#txt_fec_vencimiento").val($("#txt_fec_transaccion").val());
                } else {
                    calcularFechaVencimiento();
                }
                fechaAnterior = $("#txt_fec_transaccion").val();
            }
        });
     
        $('#txt_plazo_pago').bind('keyup', function (e) {
            if ($('#txt_plazo_pago').val() != "") {
                calcularFechaVencimiento();
            }           
        });

        $("#txt_fec_vencimiento").on("change", function () {
            if ($("#txt_fec_vencimiento").val() != "" && $("#txt_fec_transaccion").val() != "") {
                var dias = 0;
                var ini = new Date(ConvertirDate($("#txt_fec_transaccion").val()));
                var fin = new Date(ConvertirDate($("#txt_fec_vencimiento").val()));
                dias = DateDiff(fin, ini);
                $("#txt_plazo_pago").val(dias.toString());
            }
        });

        $('#chk_inc_igv').click(function () {
            if (oTableActividad.fnGetData().length == 0) {
               // alertCustom("Agrege Bienes / Servicios")
            }
            else {
                Calcular();
            }  
        });

        $("#btnemptrans").click(function () {
            if (vErrors("txtemptransporte")) {
                BuscarEmpresa($("#hfPIDM_EMPTRANS").val());
            }
        });

        $('#txt_Percepcion').on('blur', function () {
            if ($('#txt_Percepcion').val() == "") {
                alertCustom("Ingrese Percepcion")
            }
            else {
                Calcular();
            }
        });

        $('#txt_Retencion').on('blur', function () {
            if ($('#txt_Retencion').val() == "") {
                alertCustom("Ingrese Retencion")
            }
            else {
                Calcular();
            }
        });

        $('#rdPublico').click(function () {
            $('#txtemptransporte').prop('disabled', false);
            $('#divBtnTrans').slideDown();
            $('#ocultaTrans').slideDown();
            $('#datosVehiculo').slideUp();
            $('#datosChofer').slideUp();
            $('#txtnumdocemptrans').prop('disabled', false);
            $('#cbotipoDoctrans').val(null);
            $('#cbotipoDoctrans').change();
            $('#cbotipoDoctrans').prop('disabled', false);
            $('#divTxtChofer').html('<input id="txtchofer" class="span12" type="text" style="text-transform: uppercase">');
            //limpiarCampos(['#txtemptransporte', '#txtnumdocemptrans', '#txtvehiculo', '#txtchofer', '#txtCertificadoInscripcion', '#txtLicConducir', '#hfPIDM_EMPTRANS', '#hfRUC_EMPTRANS']);
            limpiarCampos(['#txtemptransporte', '#txtnumdocemptrans', '#hfPIDM_EMPTRANS', '#hfRUC_EMPTRANS']);
        });

        $('#rdPrivado').click(function () {
            $('#txtemptransporte').prop('disabled', true);
            $('#txtemptransporte').val(empresa.DESCRIPCION);
            $('#hfPIDM_EMPTRANS').val(empresa.PIDM);
            $('#txtnumdocemptrans').prop('disabled', true);
            $('#cbotipoDoctrans').val('6');
            $('#cbotipoDoctrans').change();
            $('#cbotipoDoctrans').prop('disabled', true);
            $('#txtnumdocemptrans, #hfRUC_EMPTRANS').val(empresa.RUC);
            $('#divBtnTrans').slideUp();
            $('#ocultaTrans').slideDown();
            $('#datosVehiculo').slideDown();
            $('#datosChofer').slideDown();
            ////alert('hola');
            filltxtchofer('#txtchofer', '');
        });

        $('#rdProveedor').click(function () {
            $('#ocultaTrans').slideUp();
            limpiarCampos(['#txtemptransporte', '#txtnumdocemptrans', '#hfPIDM_EMPTRANS', '#hfRUC_EMPTRANS']);
        });

        $('#idRegis').click(function () {
            if ($('#chk_percepcion').is(':checked')) {
                if ($('#txt_Percepcion').val() == "") {
                    alertCustom("Ingrese Percepcion")
                    return;
                }
            }

            if ($('#chk_retencion').is(':checked')) {
                if ($('#txt_Retencion').val() == "") {
                    alertCustom("Ingrese Retencion")
                    return;
                }
            }

            if (vErrors(['txt_proveedor'])) {
                if (oTableActividad.fnGetData().length == 0) {
                    alertCustom("Agrege Bienes / Servicios")
                }
                else {
                    if (vErrors(["cbo_Empresa", "cbo_Sucursal", "txt_proveedor"])) {

                        if ($("#hfPIDM").val() == "") {
                            alerCustom('Eliga un proveedor que exista.')
                        }
                        else {
                            REGISTRAR();
                        }
                    }
                }
            }
        });

        $('#idCompletar').click(function () {
            if ($('#chk_percepcion').is(':checked')) {
                if ($('#txt_Percepcion').val() == "") {
                    alertCustom("Ingrese Percepcion")
                    return;
                }
            }

            if ($('#chk_retencion').is(':checked')) {
                if ($('#txt_Retencion').val() == "") {
                    alertCustom("Ingrese Retencion")
                    return;
                }
            }

            if (vErrors(['txt_proveedor'])) {
                if (oTableActividad.fnGetData().length == 0) {
                    alertCustom("Agrege Bienes / Servicios")
                }
                else {
                    if (vErrors(["cbo_Empresa", "cbo_Sucursal", "txt_proveedor"])) {

                        if ($("#hfPIDM").val() == "") {
                            alerCustom('Eliga un proveedor que exista.')
                        }
                        else {
                            completarDocumento();
                        }
                    }
                }
            }
        });

        $('#idModificar').click(function () {
            if ($('#chk_percepcion').is(':checked')) {
                if ($('#txt_Percepcion').val() == "") {
                    alertCustom("Ingrese Percepcion")
                    return;
                }
            }

            if ($('#chk_retencion').is(':checked')) {
                if ($('#txt_Retencion').val() == "") {
                    alertCustom("Ingrese Retencion")
                    return;
                }
            }

            if (vErrors(['txt_proveedor'])) {
                if (oTableActividad.fnGetData().length == 0) {
                    alertCustom("Agrege Bienes / Servicios")
                }
                else {
                    if (vErrors(["cbo_Empresa", "cbo_Sucursal", "txt_proveedor"])) {

                        if ($("#hfPIDM").val() == "") {
                            alerCustom('Eliga un proveedor que exista.')
                        }
                        else {
                            modificarAdquisicion();
                        }
                    }
                }
            }
        });


        $('#cbo_Empresa').on('change', function () {
            limpiar();
            limpiarDatosMonetarios();
            $('#txtcodprod').val('');
            $('#cboUniMedida').select2('val','');     
            filltxtproveedor("#txt_proveedor", "");
            if (flagTb) {
                if (oTableActividad.fnGetData().length != 0) {

                    $('#detalle').DataTable().data().clear().draw()
                }
            }         
            ListarSucursales($('#cbo_Empresa').val());
        });

        $('#cbo_moneda').on('change', function () {
            ListarValorCambio($('#cbo_moneda').val());
            $('#simbolo_moneda').text($('#cbo_moneda :selected').attr('simbolo'));
        });

        $("#cbotipoDoctrans").on('change', function () {
            if ($('#cbotipoDoctrans').val() === "6") {
                $("#txtnumdocemptrans").val($("#hfRUC_EMPTRANS").val());
            }
            if ($('#cbotipoDoctrans').val() === "1") {
                $("#txtnumdocemptrans").val($("#hfDNI_EMPTRANS").val());
            }
        });

        $('#cbo_doc_registro').on('change', function () {
            
            if ($('#cbo_doc_registro').val() == 'S') {
                limpiarDatosMonetarios();
                $('#txt_num_ser_reg').val('');
                $("#fieldsetTransporte").slideUp();
                $("#ocultaDespacho").slideUp();

                if (flagTb) {
                    if (oTableActividad.fnGetData().length != 0) {
                        $('#detalle').DataTable().data().clear().draw()
                    }
                }

            }
            else {
                limpiarDatosMonetarios();
                $('#txt_num_ser_reg').val('');
                $("#fieldsetTransporte").slideDown();
                $("#ocultaDespacho").slideDown();

                if (flagTb) {
                    if (oTableActividad.fnGetData().length != 0) {

                        $('#detalle').DataTable().data().clear().draw()
                    }
                }
            }

            cargarProductos();
            autocompletarDatosProducto();
        });

        $("#btnverempl").click(function () {
            if (vErrorsNotIcon("txt_proveedor")) {
                BuscarEmpresa($("#hfPIDM").val());
            }
        });

        $('#btnRefrescarProductos').click(function (event) {
            event.preventDefault();
            Bloquear('detallemov_datos');
            cargarProductos();
            autocompletarDatosProducto();                      
            Desbloquear('detallemov_datos');
        });
      

        $('#txt_plazo_pago').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                if ($("#txt_plazo_pago").val() > 0) {
                    $.ajax({
                        type: "post",
                        url: "vistas/no/ajax/nomordc.ashx?OPCION=FECHAX" +
                             "&ISC=" + $("#txt_plazo_pago").val() +
                             "&FECHA_EMISION=" + $("#txt_fec_transaccion").val(),
                         contenttype: "application/json;",
                        datatype: "json",
                        async: false,
                        success: function (datos) {
                            if (datos != null) {
                                $("#txt_fec_vencimiento").val(datos[0].FECHANUEVA);
                            }
                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    });
                }
            }
        });

        $('#chk_detraccion').click(function () {
            if (oTableActividad.fnGetData().length == 0) {
                alertCustom("Agrege Bienes / Servicios")
            }
            else {
                if ($(this).is(':checked')) {

                    var detrac = datosDetraccion();
                    console.log(detrac);
                    $('#txt_monto_detraccion').val(detrac);
                    //sumaDetrac();
                    //////$("#txt_num_op_detrac,#txt_fec_comp_detrac").prop('disabled', false);
                    $("#txt_detraccion").val($("#txt_monto_detraccion").val());

                    $('#chk_percepcion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
                    $('#txt_Percepcion, #txt_Retencion, #txt_num_comp_percep, #txt_estado_credito, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
                    $('#rbsinserie, #rbseriada').prop('disabled', true);
                    $('#rbsinserie').prop('checked', true).parent().addClass('checked');
                    $('#rbseriada').prop('checked', false).parent().removeClass('checked');
                    cargarCuentaDetraccion();
                } else {
                    $("#txt_num_op_detrac, #txt_fec_comp_detrac").prop('disabled', true);
                    $("#txt_detraccion, #txt_monto_detraccion").val("");
                }
                if ($('#txt_base_imponible').val() !== '') {
                    Calcular();
                }
            }
        });

        $("#chk_percepcion").click(function () {
            if ($(this).is(":checked")) {
                $("#txt_Percepcion, #rbsinserie, #rbseriada").prop('disabled', false);

                $('#chk_detraccion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
                $('#txt_detraccion, #txt_Retencion, #txt_monto_detraccion, #txt_num_op_detrac, #txt_fec_comp_detrac, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
                $('#txt_plazo_pago').prop('disabled', true).val('0');
                $('#txt_fec_vencimiento').prop('disabled', true).datepicker('setDate', 'now');
            }
            else {
                $("#rbsinserie, #rbseriada, #txt_num_comp_percep, #txt_fec_comp_percep, #txt_Percepcion").prop('disabled', true);
                $("#txt_Percepcion, #txt_num_comp_percep, #txt_fec_comp_percep").val("");
                $('#rbsinserie').prop('checked', true).parent().addClass('checked');
                $('#rbseriada').prop('checked', false).parent().removeClass('checked');
            }
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
            $('#txt_Percepcion').focus();
        });

        $("#chk_retencion").click(function () {
            if ($(this).is(":checked")) {
                $("#txt_num_comp_reten, #txt_fec_comp_reten, #txt_Retencion").prop('disabled', false);

                $('#chk_percepcion, #chk_detraccion').prop('checked', false).parent().removeClass('checked');
                $('#txt_detraccion, #txt_Percepcion, #txt_num_op_detrac, #txt_fec_comp_detrac, #txt_num_comp_percep, #txt_fec_comp_percep').prop('disabled', true).val('');
                $('#rbsinserie, #rbseriada').prop('disabled', true);
                $('#rbsinserie').prop('checked', true).parent().addClass('checked');
                $('#rbseriada').prop('checked', false).parent().removeClass('checked');
            }
            else {
                $("#txt_num_comp_reten, #txt_fec_comp_reten, #txt_Retencion").prop('disabled', true);
                $("#txt_Retencion").val("");
            }
            if ($('#txt_base_imponible').val() !== '') {
                Calcular();
            }
            $('#txt_Retencion').focus();
        });

        $('#txt_base_imponible, #txt_descuento, #txt_isc').keyup(function () {
            $('#txt_subtotal, #txt_impuesto, #txt_impuesto_calc, #txt_prec_total, #txt_monto_total').val('');
            if (!$('#chk_detraccion').is(':checked')) { $('#txt_detraccion').val(''); }
            if (!$('#chk_percepcion').is(':checked')) { $('#txt_Percepcion').val(''); }
            if (!$('#chk_retencion').is(':checked')) { $('#txt_Retencion').val(''); }
        });

        $("#txt_detraccion,#txt_Percepcion,#txt_Retencion,#txt_base_imponible,#txt_descuento,#txt_descuento,#txt_isc,#txt_ajuste").on('keyup', function () {
            if (window.event.keyCode == 13) {
                Calcular();
            }
        });

        $('#cboTipoDoc').change(function () {
            var tipo = $(this).val();
            if (tipo === '6') {
                $('#txt_ruc_proveedor').val($("#hfRUC").val());
            } else {
                $('#txt_ruc_proveedor').val($("#hfDNI").val());
            }
        });

        //EVENTOS ENTER     

        $('#txtcant').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13 && $(this).val() != '') {
                $('#txt_importe').focus();
            }
        });

        $('#txt_importe').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13 && $(this).val() != '') {
                $('#txt_glosa_dt').focus();
            }
        });

        $('#txt_glosa_dt').keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 13) {
                $('#btnAgregarDetalle').focus();
            }
        });

    }

    var listarDetalle = function (detalle) {
        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=16&P_CODIGOCAB=" + detalle,
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null) {
                    $('#tabla2').html(datos)
                    $("#tblbmodal").DataTable({
                        "paging": "false",
                        "filter": "false",
                        "scroll": "true",
                    });
                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);
            }
        });
    }

    var tablaDetalle = function () {
        var parms = {
            data: null,
            paging: false,
            filter: false,
            //responsive:true,
            columns: [
                { data: "CODIGO" },
                { data: "DES_PRODUCTO" },
                {
                    data: "UNIDAD_MEDIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').addClass("munidad");
                    }
                },
                {
                    data: "CODIGO_MEDIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').addClass("mcodmedida");
                    },
                    visible:false
                },
                {
                    data: "CANTIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right').addClass("mcantidad");
                    }
                },
                {
                    data: "IMPORTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right').addClass("mimporte");
                    }
                },
                {
                    data: "TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right').addClass("mtotal");
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left').addClass("mglosa");
                    }
                },
                {
                    data: "DETRACCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left').addClass("mdetraccion");
                    },
                    visible: false
                },

                 {
                     data: null,
                     defaultContent: '<a  class="btn red eliminar"><i class="icon-trash"></i></a>',
                     createdCell: function (td, cellData, rowData, row, col) {

                         $(td).attr('align', 'center')

                     }
                 }
            ]
        }
        oTableActividad = iniciaTabla('detalle', parms);
        flagTb = true;
        $('#detalle').removeAttr('style');

        $('#detalle tbody').on('click', '.eliminar', function () {

            var pos = oTableActividad.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableActividad.fnGetData(pos);
            oTableActividad.fnDeleteRow(pos);

            var detra = datosDetraccion()
            var detraccionj = 0;
            if (isNaN(detra)) {
                detraccionj = 0;
            }
            else {
                detraccionj = datosDetraccion();
            }

            $('#txt_monto_detraccion').val(detraccionj);
            if (detraccionj == 0) {
                $('#txt_detraccion').val('0.0');
            }

            if (oTableActividad.fnGetData().length == 0) {
                limpiarDatosMonetarios();
                $("#cbo_doc_registro").removeAttr("disabled");
            }
            else {
                Calcular();
            }
        });
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        //$('#cbo_doc_registro').change();
        $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', true)
        $('#OcCorreo').css('display', 'none');

        $('#txt_num_ser_reg').attr('disabled', true);
        $('#rdPublico').click();
        $('.ocultaC').remove();
        $("#txt_ajuste").attr('disabled', true);
        $("#txt_isc").attr('disabled', true);
        $("#txt_base_imponible").attr('disabled', true);

        $("#txt_descuento").attr('disabled', true);
        /*
        $("#txtUnidad").attr('disabled', true);
        $("#txtcodprod").attr('disabled', true);
        $("#txtdescprod").attr('disabled', true);
        */

        filltxtproveedor("#txt_proveedor", "");
        $("#btn_add_dcto").attr("href", "?f=nrmgepr");
        $("#btn_add_dcto").attr("target", "_blank");
        $("#cbo_Empresa").select2('val', $("#ctl00_hddctlg").val());
        $("#cbo_Empresa").change();
        $("#cbo_doc_registro").change();

        if (cod != undefined) {
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/NOMORDC.ashx?OPCION=6&P_CODIGOCAB=" + cod,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    Desbloquear("div");
                    if (data !== null) {
                        if (data[0].COMPLETO_IND === 'S') {
                            $('#btn_new_transportista').remove();
                            $('#btnemptrans').remove();
                            $('#btnverempl').remove();
                            $('#btn_add_dcto').remove();
                            $('#cbo_doc_registro').attr('disabled', true);
                            $('#cbo_Empresa').attr('disabled', true);
                            $('#cbo_Sucursal').attr('disabled', true);
                            $('#cbx_destino').attr('disabled', true);
                            //$('select').attr('disabled', true);
                            $('textarea').attr('disabled', true);
                            $('#idRegis').remove();
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD').attr('disabled', false);
                            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfDescarga').val(data[0].CODIGO);
                            $('#detalleMo').remove();
                            $('#cbo_doc_registro').select2('val', data[0].TIPODOC);

                            if (data[0].TIPODOC == "S") {
                                $("#fieldsetTransporte").remove();
                            }
                            $('#txt_num_ser_reg').val(data[0].CORRELATIVO);
                            $('#txtNumDctoComp').val(data[0].CODIGO);
                            $('#cbo_Empresa').select2('val', data[0].CATALOGO);
                            $('#cbo_Sucursal').select2('val', data[0].ESTABLECIMIENTO);

                            $('#txt_proveedor').val(data[0].P_NOMBRE);
                            $('#cboTipoDoc').val(data[0].P_NOMBRE);
                            $('#txt_ruc_proveedor').val(data[0].P_NUMERO);

                            $('#txt_fec_transaccion').val(data[0].FECHA_TRANS);
                            $('#txt_fec_emision').val(data[0].FECHA_ENTREGA);

                            $('#cbx_destino').select2('val', data[0].DESPACHO);
                            $('#cbo_moneda').select2('val', data[0].M_TIPOMONEDA).change();
                            


                            $("#txt_comentario").val(data[0].ENTREGAR);
                            $("#txtContacto").val(data[0].CONTACTO);

                            $('#txt_plazo_pago').val(data[0].PLAZO_PAGO);
                            $('#txt_fec_vencimiento').val(data[0].FECHA_PAGO);
                            $('#txt_estado_credito').val(data[0].ESTADO_PAGO);

                            $("#rdPublico").attr("checked", false).parent().addClass("checked")
                            $("#rdPrivado").attr("checked", false).parent().addClass("checked")
                            $("#rdProveedor").attr("checked", false).parent().addClass("checked")

                            $('#txtGlosa_general').val(data[0].GLOSA_GENERAL)

                            var igvitems = '';
                            if (data[0].INCL_IGV_ITEMS == 'S') {
                                igvitems = " * Precios de Items incluyen IGV.";
                            }
                            else {
                                igvitems = " * Precios de Items no incluyen IGV. ";
                            }

                            $('#txtInclIgv').css('display', 'block')
                            $('#txtInclIgv').attr('disabled', true)
                            $('#txtInclIgv').val(igvitems);

                            if (data[0].TIPOTRANS == "PUB") {
                                $("#rdPublico").attr("checked", true).parent().addClass("checked")
                                $("#rdPublico").click()
                            }

                            if (data[0].TIPOTRANS == "PRI") {
                                $("#rdPrivado").attr("checked", true).parent().addClass("checked")
                                $("#rdPrivado").click()
                            }
                            if (data[0].TIPOTRANS == "PRO") {
                                $("#rdProveedor").attr("checked", true).parent().addClass("checked")
                                $("#rdProveedor").click()

                            }
                            $('#txtemptransporte').val(data[0].T_NOMBRE);
                            if (data[0].T_TIPO_DOC == "RUC") {
                                $('#cbotipoDoctrans').select2('val', '6');
                            }
                            else {
                                $('#cbotipoDoctrans').select2('val', '1');
                            }

                            $('#txtnumdocemptrans').val(data[0].T_NUMERO);

                            $('#txtvehiculo').val(data[0].T_VEHICULO);
                            $('#txtCertificadoInscripcion').val(data[0].T_INSCRIPCION);
                            $('#txtchofer').val(data[0].T_CHOFER);
                            $('#txtLicConducir').val(data[0].T_LICENCIA);


                            $('#txt_base_imponible').val(data[0].BASE_IMPONIBLE);
                            $('#txt_descuento').val(data[0].DESCUENTO);
                            $('#txt_isc').val(data[0].ISC);
                            $('#txt_subtotal').val(data[0].SUBTOTAL);
                            $('#txt_impuesto').val(data[0].IGVPOR);
                            $('#txt_impuesto_calc').val(data[0].IGVSOLES);
                            $('#txt_ajuste').val(data[0].AJUSTE);
                            $('#txt_prec_total').val(data[0].TOTAL);

                            $('#txt_detraccion').val(data[0].DETRACCION);
                            $('#txt_Percepcion').val(data[0].PERCCECION);
                            $('#txt_Retencion').val(data[0].RETENCION);
                            $('#txt_monto_total').val(data[0].PAGAR);
                            $('#hfPIDM').val(data[0].PIDM_PROVEEDOR);

                            $('#txt_detraccion').val(data[0].DETRACCION);
                            $('#txt_Percepcion').val(data[0].PERCCECION);
                            $('#txt_Retencion').val(data[0].RETENCION);
                            $('#txt_monto_total').val(data[0].PAGAR);

                            if (data[0].TRIB_SUJDETRA == "S") {
                                $("#chk_detraccion").attr("checked", true).parent().addClass("checked")
                                $("#txt_monto_detraccion").val(data[0].TRIB_SOLES);
                                $("#txt_cta_detrac").val(data[0].TRIB_CUENTA)
                            }

                            if (data[0].TRIB_SUJETOPERS == "S") {
                                $("#chk_percepcion").attr("checked", true).parent().addClass("checked")

                            }

                            if (data[0].TRIB_SUJETORETE == "S") {
                                $("#chk_retencion").attr("checked", true).parent().addClass("checked")
                            }

                            $('#cbo_modo_pago').select2('val', data[0].MODO_PAGO_CODIGO);
                            correo(data[0].PIDM_PROVEEDOR)
                            $('#txtpersona').val(data[0].RESPONSABLE);

                            $('input[type=radio]').attr('disabled', true);
                            $('input[type=checkbox]').attr('disabled', true);
                            $('input[type=text]').attr('disabled', true);
                            listarDetalle(data[0].CODIGO);

                            $('#cbo_moneda').attr('disabled', true);

                            $("#s2id_autogen1_search").attr('disabled', false)

                            $('#Cotizac').css('display', 'block');

                            $('#txtCotizacion1').val(data[0].COTIZACION);

                            $('#btnMail').removeClass('hidden');

                            $('#txtcontenido').attr('disbled', false);
                            $("#idModificar").hide(); 
                            $("#idCompletar").hide(); 
                            $("#divMsgCorreo").css("display", "block");
                        } else {
                            $('#txt_num_ser_reg').val(data[0].CORRELATIVO);
                            $('#txtNumDctoComp').val(data[0].CODIGO);
                            $('#cbo_Empresa').select2('val', data[0].CATALOGO);
                            $('#cbo_Sucursal').select2('val', data[0].ESTABLECIMIENTO);
                            $('#txtCotizacion1').val(data[0].COTIZACION);
                            $('#txt_proveedor').val(data[0].P_NOMBRE);
                            $('#cboTipoDoc').val(data[0].P_NOMBRE);
                            $('#txt_ruc_proveedor').val(data[0].P_NUMERO);
                            $('#cbo_modo_pago').select2('val', data[0].MODO_PAGO_CODIGO);
                            $('#txt_fec_transaccion').val(data[0].FECHA_TRANS);
                            $('#cbo_moneda').select2('val', data[0].M_TIPOMONEDA).change();
                            $('#txt_fec_emision').val(data[0].FECHA_ENTREGA);
                            $('#cbo_modo_pago').select2('val', data[0].MODO_PAGO_CODIGO);
                            $('#cbo_modo_pago').select2('val', data[0].MODO_PAGO_CODIGO);

                            $('#txtpersona').val(data[0].RESPONSABLE);

                            $('#cbx_destino').select2('val', data[0].DESPACHO);
                            $("#txt_comentario").val(data[0].ENTREGAR);
                            $("#txtContacto").val(data[0].CONTACTO);

                            $('#txt_plazo_pago').val(data[0].PLAZO_PAGO);
                            $('#txt_fec_vencimiento').val(data[0].FECHA_PAGO);
                            $('#txt_estado_credito').val(data[0].ESTADO_PAGO);


                            if (data[0].TIPOTRANS == "PUB") {
                                $("#rdPublico").attr("checked", true).parent().addClass("checked")
                                $("#rdPublico").click()
                            }

                            if (data[0].TIPOTRANS == "PRI") {
                                $("#rdPrivado").attr("checked", true).parent().addClass("checked")
                                $("#rdPrivado").click()
                            }
                            if (data[0].TIPOTRANS == "PRO") {
                                $("#rdProveedor").attr("checked", true).parent().addClass("checked")
                                $("#rdProveedor").click()

                            }
                            $('#txtemptransporte').val(data[0].T_NOMBRE);
                            if (data[0].T_TIPO_DOC == "RUC") {
                                $('#cbotipoDoctrans').select2('val', '6');
                            }
                            else {
                                $('#cbotipoDoctrans').select2('val', '1');
                            }

                            $('#txtnumdocemptrans').val(data[0].T_NUMERO);

                            $('#txtvehiculo').val(data[0].T_VEHICULO);
                            $('#txtCertificadoInscripcion').val(data[0].T_INSCRIPCION);
                            $('#txtchofer').val(data[0].T_CHOFER);
                            $('#txtLicConducir').val(data[0].T_LICENCIA);


                            $('#txt_base_imponible').val(data[0].BASE_IMPONIBLE);
                            $('#txt_descuento').val(data[0].DESCUENTO);
                            $('#txt_isc').val(data[0].ISC);
                            $('#txt_subtotal').val(data[0].SUBTOTAL);
                            $('#txt_impuesto').val(data[0].IGVPOR);
                            $('#txt_impuesto_calc').val(data[0].IGVSOLES);
                            $('#txt_ajuste').val(data[0].AJUSTE);
                            $('#txt_prec_total').val(data[0].TOTAL);

                            $('#txt_detraccion').val(data[0].DETRACCION);
                            $('#txt_Percepcion').val(data[0].PERCCECION);
                            $('#txt_Retencion').val(data[0].RETENCION);
                            $('#txt_monto_total').val(data[0].PAGAR);


                            $('#txt_detraccion').val(data[0].DETRACCION);
                            $('#txt_Percepcion').val(data[0].PERCCECION);
                            $('#txt_Retencion').val(data[0].RETENCION);
                            $('#txt_monto_total').val(data[0].PAGAR);

                            $('#txtGlosa_general').val(data[0].GLOSA_GENERAL);
                            $('#hfPIDM').val(data[0].PIDM_PROVEEDOR);
                            correo(data[0].PIDM_PROVEEDOR)
                            $('#cbo_Empresa').attr('disabled', true);
                            $('#cbo_Sucursal').attr('disabled', true);
                            $('#cbo_doc_registro').attr('disabled', true);
                            $('#cbx_destino').attr('disabled', true);
                            
                            $("#s2id_autogen1_search").attr('disabled', false)

                            detalleEditar(data[0].CODIGO, data[0].CATALOGO, data[0].ESTABLECIMIENTO);
                            //$('#detalle').DataTable().columns(9).visible(false);
                            //$('#btnMail').removeClass('hidden');

                            $("#idRegis").hide();
                            $("#idModificar").show();
                            $("#divMsgCorreo").css("display", "none");
                            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD").hide();
                        }
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        } else {
            $("#idModificar").hide();            
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnPFD").hide();
            
        }
    }

    return {
        init: function () {
            plugins();
            cargarEmpresaDefault();
            fillCboEmpresa();
            eventoControles();
            fillcboMoneda();
            fillimpuesto();
            fillCboModoPago();
            filltxtemptransporte('#txtemptransporte', '');
            cargarUnidadesMedida();
            //fillcboUniMedida();           
            
            tablaDetalle();
            cargarInputsPersona();           
            cargarProductos();
            autocompletarDatosProducto();
            cargaInicial();
        }
    };
}();

function filltxtemptransporte(v_ID, v_value) {
    var selectinput = $(v_ID);
    selectinput.typeahead({
        minLength: 4,
        source: function (query, process) {
            var arrayEmpTrans = [];
            map = {};
            $.ajax({
                type: "post",
                url: "vistas/na/ajax/naminsa.ashx?OPCION=4&NICA_CODE=0006&CTLG_CODE=" + $('#cbo_Empresa').val(),
                data: { type: 'keyword', q: query },
                cache: false,
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos !== null) {
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayEmpTrans.push(datos[i].RAZON_SOCIAL);
                            obj += '{';
                            obj += '"DNI":"' + datos[i].DNI + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '","RUC":"' + datos[i].RUC + '","DIRECCION":"' + datos[i].DIRECCION + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });
                        return process(arrayEmpTrans);
                    }
                    if (datos != null && $.trim(v_value).length > 0) {
                        selectinput.val(v_value);
                    }
                },
                error: function (msg) {
                    alertCustom(msg);
                }
            });
        },
        updater: function (item) {
            $("#hfDNI_EMPTRANS").val(map[item].DNI);
            $("#hfRUC_EMPTRANS").val(map[item].RUC);
            $("#hfPIDM_EMPTRANS").val(map[item].PIDM);

            if ($('#hfRUC_EMPTRANS').val() === '' || $('#hfDNI_EMPTRANS').val() === '') {
                $('#cbotipoDoctrans').prop('disabled', true);
            } else {
                $('#cbotipoDoctrans').prop('disabled', false);
            }

            if ($('#hfRUC_EMPTRANS').val() !== '') {
                $("#cbotipoDoctrans").val("6").change();
            }

            if ($('#hfDNI_EMPTRANS').val() !== '') {
                $("#cbotipoDoctrans").val("1").change();
            }

            if ($('#cboTipoEnvio').val() === 'EDTR' || $('#cboTipoEnvio').val() === 'ETDT') {
                cargarDireccionesTransportista();
                $('#txtDireccionTransportista').prop('disabled', false);
            } else {
                $('#txtDireccionTransportista').prop('disabled', true);
            }

            return item;
        },
    });
    selectinput.keyup(function () {
        $(this).siblings("ul").css("width", $(this).css("width"));
        if ($("#txtemptransporte").val().length <= 0) {
            $('#hfPIDM_EMPTRANS, #hfRUC_EMPTRANS, #hfDNI_EMPTRANS, #txtnumdocemptrans, #txtDireccionTransportista').val('');
            $('#cbotipoDoctrans').select2('val', '').change();
            $('#txtDireccionTransportista').select2('val', '').prop('disabled', true);
        }
    });


}

function filltxtchofer(v_ID, v_value) {
    var selectinput = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=6&CTLG_CODE=" + $('#cbo_Empresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                selectinput.typeahead({
                    source: function (query, process) {
                        var arrayChofer = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayChofer.push(datos[i].NOMBRE);
                            obj += '{';
                            obj += '"LICENCIA":"' + datos[i].LICENCIA + '","NOMBRE":"' + datos[i].NOMBRE + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE] = objeto;
                        });
                        process(arrayChofer);
                    },
                    updater: function (item) {
                        $("#hfLIC_CONDUC").val(map[item].LICENCIA);
                        $("#txtLicConducir").val($("#hfLIC_CONDUC").val());
                        $("#txtLicConducir").change();
                        return item;
                    },

                });
                selectinput.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"));
                    if ($("#txtchofer").val().length <= 0) {
                        $("#hfLIC_CONDUC").val('');
                        $("#txtLicConducir").val('');
                        $("#txtLicConducir").change();
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectinput.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function detalleEditar(CODIGO, p_CATALOGO, p_ESTABLEC) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMORDC.ashx?OPCION=9&P_CODIGO_SOLICITUD=" + CODIGO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {            
            if (data !== null) {

                console.log(data);
                oTableActividad.fnAddData(data);
                //for (var i; i<data.length; i++) {
                //    var a = {
                //        "CODIGO": data[i].COD_PROD
                //        //"DES_PRODUCTO": $('#txtdescprod').val(),
                //        //"UNIDAD_MEDIDAD": $('#cboUniMedida :selected').text(),
                //        //"CODIGO_MEDIDAD": $('#cboUniMedida').val(),
                //        //"CANTIDAD": $('#txtcant').val(),
                //        //"IMPORTE": $('#txt_importe').val(),
                //        //"TOTAL": parseFloat(total.toFixed(2)),
                //        //"GLOSA": $.trim($('#txt_glosa_dt').val()),
                //        //"DETRACCION": (parseFloat(detraccion.toFixed(2)))
                //    }
                //}
                //console.log(a);
            }
        },
        error: function (msg) {
            alertCustom(msg.d);
        }
    });
}

function AgregarDetalle() {

    if (vErrors(['txtcant', 'txt_importe', 'txtcodprod', 'txtdescprod'])) {

        var detraccion = parseFloat($("#hfporcentaje_detraccion").val()) * parseFloat($("#txt_importe").val()) / 100;
        var total = parseFloat($('#txtcant').val() * $('#txt_importe').val());
        var a = {
            "CODIGO": prodActual.CODIGO,
            "DES_PRODUCTO": $('#txtdescprod').val(),
            "UNIDAD_MEDIDAD": $('#cboUniMedida :selected').text(),
            "CODIGO_MEDIDAD": $('#cboUniMedida').val(),
            "CANTIDAD": $('#txtcant').val(),
            "IMPORTE": $('#txt_importe').val(),
            "TOTAL": parseFloat(total.toFixed(2)),
            "GLOSA": $.trim($('#txt_glosa_dt').val()),
            "DETRACCION": (parseFloat(detraccion.toFixed(2)))
        }

        console.log(a);
        var ar = oTableActividad.fnGetData();
        var flag = false;
        ar.filter(function (e, f) {
            if (e.CODIGO == $('#txtcodprod').val()) {
                alertCustom("El producto ya ha sido Agregado");
                flag = true;
            }

        });
        if (!flag) {
            oTableActividad.fnAddData(a);
            limpiar();
            var importe = datosImporte();
            var detraccion = datosDetraccion()
            //var descuento = datosDescuento();
            $("#txt_monto_detraccion").val(detraccion);
            //$("#txt_base_imponible").val(importe);
            base = importe
            //$("#txt_descuento").val(descuento);
            Calcular();

            $("#cbo_doc_registro").attr("disabled", "disabled");

        }
    }
}

var cargarLetras = function () {
    var doc = $('#txt_num_ser_reg').val() + '-' + $('#txt_num_doc_reg').val();
    $('#tblLetras').DataTable().destroy();
    var tbody = $('#tblLetras tbody');
    $.post('vistas/no/ajax/nomdocc.ashx?OPCION=LASOC&NUM_DCTO=' + doc + '&TIPO_DCTO=' + $('#cbo_doc_registro :selected').text(),
        function (data) {
            tbody.html('');
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    tbody.append('<tr>\
                    <td style="text-align: center">' + data[i].CODIGO_DOCUMENTO + '</td>\
                    <td style="text-align: center">' + data[i].NUMERO_DOCUMENTO + '</td>\
                    <td style="text-align: center">' + data[i].NRO_DOC_DETALLE + '</td>\
                    <td style="text-align: center">' + data[i].MONTO + '</td>\
                    <td style="text-align: center">' + data[i].FECHA_EMISION + '</td>\
                    </tr>');
                }
            }
        });
    $('#tblLetras').dataTable({ paging: false, responsive: true, order: [[0, 'desc']], ordering: false });
    //$('#tblLetras_wrapper').children(':first').remove();
    $('#tblLetras_wrapper').children(':last').remove();
};

var cargarCuentaDetraccion = function () {
    if (vErrors(['txt_proveedor'])) {
        $.post('vistas/no/ajax/nomdocc.ashx?OPCION=DETRAC&PROV_PIDM=' + $('#hfPIDM').val() + "&MONEDA_CODE=" + $('#cbo_moneda').val(),
            function (data) {
                if (data != null) {
                    $('#txt_cta_detrac').val(data[0].NRO_CUENTA);
                } else {
                    $('#txt_cta_detrac').val('');
                }
            });
    }
};

function ListarSucursales(ctlg) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cbo_Sucursal').empty();
            $('#cbo_Sucursal').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cbo_Sucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $('#cbo_Sucursal').select2('val', $('#ctl00_hddestablecimiento').val());
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function fillContactos(v_ID, v_value, pidm) {
    var selectRazonSocial = $(v_ID);

    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMORDC.ashx?OPCION=2&P_PIDM_PERSONA=" + pidm,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos != "") {
                $('#txtContacto').attr('disabled', false)
                selectRazonSocial.typeahead({
                    source: function (query, process) {

                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].CONTACTO);
                            obj += '{';
                            obj += '"CONTACTO":"' + datos[i].CONTACTO + '","CODIGO":"' + datos[i].PIDM_CONTAC + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.CONTACTO] = objeto;
                        });
                        process(array);

                    },
                    updater: function (item) {

                        $("#hfContactopidm").val(map[item].CODIGO);

                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($(this).val().length == 0) {
                        $("#hfContactopidm").val('');
                    }
                });
            }
            else {
                $('#txtContacto').val("");
                $('#hfContactopidm').val("");
                $('#txtContacto').attr('disabled', true)
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function filltxtproveedor(v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: 'post',
        url: "vistas/na/ajax/naminsa.ashx?OPCION=4&CTLG_CODE=" + $('#cbo_Empresa').val(),
        cache: false,
        dataType: 'json',
        success: function (datos) {
            selectRazonSocial.typeahead({
                source: function (query, process) {
                    arrayRazonSocial = [];
                    map = {};

                    var obj = "[";
                    for (var i = 0; i < datos.length; i++) {
                        arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                        obj += '{';
                        obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","DIRECCION":"' + datos[i].DIRECCION + '","PIDM":"' + datos[i].PIDM + '","DIAS":"' + datos[i].DIAS + '","ID":"' + datos[i].ID + '","ID":"' + datos[i].ID + '", "AGENTE_RETEN_IND": "' + datos[i].AGENTE_RETEN_IND + '"';
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
                    fillContactos('#txtContacto', '', map[item].PIDM)

                    $("#hfDIR").val(map[item].DIRECCION);
                    $("#hfDNI").val(map[item].DNI);
                    $("#hfRUC").val(map[item].RUC);
                    $("#hfPlzo").val(map[item].DIAS);
                    $("#cbo_modo_pago").select2('val', '0001');
                    $("#cbo_modo_pago").change();
                    $('#chk_retencion').prop('disabled', true);
                    $('#chk_retencion').prop('checked', false).parent().removeClass('checked');
                    $('#txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');

                    $("#txt_ruc_proveedor").val(map[item].RUC);
                    if (map[item].RUC === '') {
                        $('#cboTipoDoc').val('1');
                        $("#cboTipoDoc").prop('disabled', true);
                    }
                    if (map[item].DNI === '') {
                        $('#cboTipoDoc').val('6');
                        $("#cboTipoDoc").prop('disabled', true);
                    }
                    $('#cboTipoDoc').change();

                    if (map[item].RUC !== '' && map[item].DNI !== '') {
                        $('#cboTipoDoc').prop('disabled', false);
                    }

                    if (map[item].AGENTE_RETEN_IND == 'S') {
                        $('#chk_retencion').prop('disabled', false);
                    }
                    if ($("#hfPlzo").val() >= 1) {
                        $("#cbo_modo_pago").prop("disabled", false);
                        $.ajax({
                            type: "post",
                            url: "vistas/no/ajax/nomordc.ashx?OPCION=FECHAX" +
                                 "&ISC=" + $("#txt_plazo_pago").val() +
                                 "&FECHA_EMISION=" + $("#txt_fec_transaccion").val(),
                            contenttype: "application/json;",
                            datatype: "json",
                            async: false,
                            success: function (datos) {
                                if (datos != null) {
                                    $("#txt_fec_vencimiento").datepicker('setDate', datos[0].FECHANUEVA);
                                }
                            },
                            error: function (msg) {
                                alert(msg);
                            }
                        });
                    }
                    else {
                        $("#cbo_modo_pago").prop("disabled", true);
                        $("#txt_fec_vencimiento").val($("#txt_fec_transaccion").val())
                    }
                    if ($('#txt_base_imponible').val() !== '') {
                        //Calcular();
                    }
                    if ($('#chk_detraccion').is(':checked')) {
                        cargarCuentaDetraccion();
                    }
                    correo(map[item].PIDM)
                    return item;
                },

            });
            selectRazonSocial.keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"));
                if ($("#txt_proveedor").val().length <= 0) {
                    $('#cbo_modo_pago, #chk_retencion, #txt_Retencion, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true);
                    $('#chk_retencion').parent().removeClass('checked');
                    $('#cbo_modo_pago option:first-child').prop('selected', true);
                    $('#cbo_modo_pago').change();
                    $('#txt_plazo_pago').val('0');
                    $('#txt_fec_vencimiento').datepicker('setDate', 'now');
                    $('#cboTipoDoc').val('6').change();
                    $('#cboTipoDoc').prop('disabled', true);
                    $("#txt_ruc_proveedor, #txt_id_proveedor, #txt_Retencion").val("");
                    if ($('#txt_base_imponible').val() !== '') {
                        //Calcular();
                    }
                }
            });
        }
    });
}

function correo(pidm) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMORDC.ashx?OPCION=10&p_PROVEDOR=" + pidm,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#OcCorreoProveedor').css('display', 'block');
            if (datos[0].CORREO != "NOCORREO") {
                $('#correoPro').html('Correo de proveedor: ' + datos[0].CORREO + ' ');
                email = datos[0].CORREO;
            }
            else {

                var ruc = $('#txt_ruc_proveedor').val().substring(0, 2);

                var tp = ''
                if (ruc == '10') {
                    tp = 'N';
                }
                else {
                    tp = 'J';
                }
                var td = $('#cboTipoDoc').val();
                var d = $('#txt_ruc_proveedor').val();

                //window.location.href = '?f=NRMGEPR&tp=' + tp + '&td=' + td + '&d=' + d;
                $('#correoPro').html("<a href='?f=NRMGEPR&tp=" + tp + "&td=" + td + "&d=" + d + "' target='_blank'> Proveedor no tiene correo Electrónico. Verifique  </a>")
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function ListarValorCambio(monecode) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=1&MONEDA_CODE=" + monecode,
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
                $('#lbl_TC').attr("style", "display:none");
                $('#input_valor_cambio').attr("style", "display:none");
                $('#lbl_fec_vig').attr("style", "display:none");
                $('#input_fec_vig').attr("style", "display:none");
                $('#txt_valor_cambio').val("");
                $('#txt_fec_vig').val("");

            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function limpiarDatosMonetarios() {
    $('#txt_ajuste').val('');
    $("#txt_isc").val('');
    $('#txt_impuesto').val('');

    $("#txt_impuesto_calc").val('');
    $("#txt_monto_total").val('');

    $('#txt_descuento').val('');
    $("#txt_prec_total").val('');
    $("#txt_subtotal").val('');
    $("#txt_base_imponible").val('');
}

function Calcular() {

    var importej = datosImporte();
    //var detraccionj = datosDetraccion();
    base = importej
    //var descuento = datosDescuento();
    if (!isNaN(base)) {
        parseFloat($('#txt_base_imponible').val(base));
    }

    if (vErrors(["txt_base_imponible"])) {
        //base_imponible = parseFloat($('#txt_base_imponible').val());
        base_imponible = base;

        if ($('#chk_inc_igv').is(':checked')) {
            var descuento = $("#txt_descuento").val() === '' ? 0 : parseFloat($("#txt_descuento").val());
            var detraccion = $("#txt_detraccion").val() === '' ? 0 : parseFloat($("#txt_detraccion").val());
            var percepcion = $("#txt_Percepcion").val() === '' ? 0 : parseFloat($("#txt_Percepcion").val());
            var retencion = $("#txt_Retencion").val() === '' ? 0 : parseFloat($("#txt_Retencion").val());

            var neto_pagar = base_imponible;
            var total_pagar = neto_pagar - percepcion + detraccion + retencion;

            var ajuste = $("#txt_ajuste").val() === '' ? 0 : parseFloat($("#txt_ajuste").val());
            if (ajuste > 0.02 || ajuste < -0.02 || isNaN(ajuste)) {
                ajuste = 0;
                alertCustom('Sólo se pueden realizar ajustes de un máximo de 2 céntimos.');
            }
            var inafecto = $("#txt_isc").val() === '' ? 0 : parseFloat($("#txt_isc").val());
            var subtotal = (total_pagar - ajuste - inafecto) / 1.18;

            var tasa_impuest = ($('#cbx_destino').val() === 'ORGNGR') ? 0 : parseFloat($('#hfIMPUESTO').val());
            var impuesto = subtotal * tasa_impuest / 100;

            var bi = subtotal + descuento;

            $('#txt_base_imponible').val(bi.toFixed(2));
            $('#txt_descuento').val(descuento.toFixed(2));
            $('#txt_ajuste').val(ajuste.toFixed(2));
            $("#txt_isc").val(inafecto.toFixed(2));
            //$('#txt_Percepcion').val(percepcion.toFixed(2));
            //$("#txt_detraccion").val(detraccion.toFixed(2));
            //$("#txt_Retencion").val(retencion.toFixed(2));
            $('#txt_impuesto').val(tasa_impuest.toFixed(2));
            $("#txt_subtotal").val(subtotal.toFixed(2));
            $("#txt_impuesto_calc").val(impuesto.toFixed(2));
            $("#txt_prec_total").val(total_pagar.toFixed(2));
            $("#txt_monto_total").val(neto_pagar.toFixed(2));
        } else {
            var descuento = $("#txt_descuento").val() === '' ? 0 : parseFloat($("#txt_descuento").val());
            if (descuento <= base_imponible) {
                var inafecto = $("#txt_isc").val() === '' ? 0 : parseFloat($("#txt_isc").val());

                var tasa_impuest = ($('#cbx_destino').val() === 'ORGNGR') ? 0 : parseFloat($('#hfIMPUESTO').val());
                var ajuste = $("#txt_ajuste").val() === '' ? 0 : parseFloat($("#txt_ajuste").val());
                var detraccion = $("#txt_detraccion").val() === '' ? 0 : parseFloat($("#txt_detraccion").val());
                var percepcion = $("#txt_Percepcion").val() === '' ? 0 : parseFloat($("#txt_Percepcion").val());
                var retencion = $("#txt_Retencion").val() === '' ? 0 : parseFloat($("#txt_Retencion").val());

                var subtotal = base_imponible - descuento;
                var impuesto = subtotal * tasa_impuest / 100;

                if (ajuste > 0.02 || ajuste < -0.02 || isNaN(ajuste)) {
                    ajuste = 0;
                    alertCustom('Sólo se pueden realizar ajustes de un máximo de 2 céntimos.');
                }

                impuesto = impuesto + ajuste;
                var total_pagar = subtotal + impuesto + inafecto;
                var neto_pagar = total_pagar + percepcion - detraccion - retencion;

                $('#txt_base_imponible').val(base_imponible);
                $('#txt_descuento').val(descuento.toFixed(2));
                $('#txt_ajuste').val(ajuste.toFixed(2));
                $("#txt_isc").val(inafecto.toFixed(2));
                //$('#txt_Percepcion').val(percepcion.toFixed(2));
                //$("#txt_detraccion").val(detraccion.toFixed(2));
                //$("#txt_Retencion").val(retencion.toFixed(2));
                $('#txt_impuesto').val(tasa_impuest.toFixed(2));
                $("#txt_subtotal").val(subtotal.toFixed(2));
                $("#txt_impuesto_calc").val(impuesto.toFixed(2));
                $("#txt_prec_total").val(total_pagar.toFixed(2));
                $("#txt_monto_total").val(neto_pagar.toFixed(2));
            } else {
                alertCustom('El Descuento no puede ser mayor que la Base Imponible.');
            }
        }
    }
}

function filltxtrazsocial(v_ID, v_value, SERVICIO, TEXTI) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + $("#cbo_Empresa").val() +
            "&TEXTI=" + TEXTI +
            "&SERVICIO=" + SERVICIO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: false,
        success: function (datos) {
            if (datos != null) {

                selectRazonSocial.typeahead({

                    source: function (query, process) {

                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].DESC_ADM);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","STOCK":"' + datos[i].STOCK + '","DETRACCION":"' + datos[i].DETRACCION + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.DESC_ADM] = objeto;
                        });
                        process(array);
                    },

                    updater: function (item) {
                        $("#hfporcentaje_detraccion").val(map[item].DETRACCION);
                        $("#cboUniMedida").select2("val",map[item].DESC_UNIDAD_DESPACHO);
                        $("#txtcodprod").val(map[item].CODIGO);
                        //$("#txtStock").val(map[item].STOCK);
                        $("#hdcodUNI").val(map[item].UNIDAD);
                        return item;
                    },

                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function sumaDetrac() {
    var df = 0;
    $(".detraccion").each(function () {
        df += parseFloat($(this).text());
    });
    $("#txt_monto_detraccion").val(df.toString());
    if ($("#chk_detraccion").is(":checked")) {
        if ($("#txt_monto_detraccion").val() == "0")
            $("#txt_detraccion").val("0.00");
        else
            $("#txt_detraccion").val($("#txt_monto_detraccion").val());
    }
}

function verificaBalanceo() {
    var monto_total = parseFloat($("#hfMONTO_TOTAL").val()).toFixed(2);
    var monto_actual = parseFloat($("#hfMONTO_ACTUAL").val()).toFixed(2);

    if (monto_total == monto_actual) {
        $("#msg_balanceo").html("<b>BALANCEADO</b>");
        $("#msg_balanceo").attr("style", "font-family: monospace; color:green;");
        $("#hfBalanceo").val("B");
        return true;
    }
    else {
        $("#msg_balanceo").html("<b>NO BALANCEADO</b>");
        $("#msg_balanceo").attr("style", "font-family: monospace; color:red;");
        $("#hfBalanceo").val("NB");
        return false;
    }
}

function sumar() {
    var m = 0;
    $(".suma").each(function () {
        m += parseFloat($(this).text());
    });
    $("#hfMONTO_ACTUAL").val(m.toFixed(2));
    $("#lbl_monto_actual").html("<b>" + formatoMoneda($("#hfMONTO_ACTUAL").val(), "S./") + "</b>");
    if (verificaBalanceo() == true) {
        $("#div_btn_add_prods").attr("style", "display:none");
    } else {
        $("#div_btn_add_prods").attr("style", "display:block");
    }
}

function calcular_con_igv() {
    var cantidad, precio, descuento, bruto, neto, pu, detrac;
    cantidad = $(".cantidad" + item + ":first").text();
    descuento = $(".descuento" + item + ":first").text();
    bruto = $(".bruto" + item + ":first").text();

    pu = bruto / cantidad;
    bruto = cantidad * pu;
    neto = bruto - descuento;
    $(".precio" + item + ":first").text(pu.toFixed(2).toString().replace(',', '.'));
    $(".bruto" + item + ":first").text(bruto.toFixed(2).toString().replace(',', '.'));
    $(".neto" + item + ":first").text(neto.toFixed(2).toString().replace(',', '.'));
    sumar();

    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
}

function calcular_fila_cantidad() {
    var cantidad, precio, descuento, bruto, neto, pu;
    cantidad = parseFloat($(".cantidad" + item + ":first").text());
    descuento = parseFloat($(".descuento" + item + ":first").text());
    neto = parseFloat($(".neto" + item + ":first").text());

    if ($("#hfIGV_IND").val() == "S") { pu = (((neto / 1.18) + descuento) / cantidad).toFixed(2); }
    else {
        pu = ((neto + descuento) / cantidad).toFixed(2);
    }

    bruto = (pu * cantidad).toFixed(2);
    $(".precio" + item + ":first").text(pu);
    $(".bruto" + item + ":first").text(bruto);
    sumar();
    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
}

function calcular_fila_bruto() {
    var cantidad, precio, descuento, bruto, neto, pu;
    cantidad = $(".cantidad" + item + ":first").text();
    descuento = $(".descuento" + item + ":first").text();
    neto = $(".neto" + item + ":first").text();

    if ($("#hfIGV_IND").val() == "S") { pu = (((neto / 1.18) + descuento) / cantidad).toFixed(2); }
    else { pu = ((neto + descuento) / cantidad).toFixed(2); }

    $(".precio" + item + ":first").text(pu.toFixed(2).toString().replace(',', '.'));

    sumar();
    listarDet($("#txtNumDctoComp").val(), $("#txtNumSec").val());
}

function get_producto(prod_code) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=LPROD&CTLG_CODE=" + $('#cbo_Empresa').val() + "&PROD_CODE=" + prod_code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                $("#hfCOD_PROD").val(datos[0].CODIGO);
                $('#hfPROD_ALMACENABLE').val(datos[0].ALMACENABLE_IND);
                $("#txt_cod_producto").val($("#hfCOD_PROD").val());
                $("#txt_cod_producto").change();
                $("#cbo_und_medida").select2('val', datos[0].UNIDAD);
                $("#cbo_und_medida").change();
                $("#txt_desc_producto").val(datos[0].DESC_ADM);
                $("#txt_desc_producto").change();
            }
            else {
                alertCustom("No hay Productos para el catalogo");
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function ValidaDecimales(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true

    // 0-9 a partir del .decimal 
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                regexp = /[0-9]{3}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        regexp = /[0-9]{10}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}

var agregarFiltroFechas = function () {
    $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var inicio = $('#txtFechaEmisionI').val().split('/');
        inicio = inicio[2] + '-' + inicio[1] + '-' + inicio[0];
        var fin = $('#txtFechaEmisionF').val().split('/');
        fin = fin[2] + '-' + fin[1] + '-' + fin[0];

        var fecha = data[4].split('/');
        fecha = fecha[2] + '-' + fecha[1] + '-' + fecha[0];

        var min = new Date(inicio === 'undefined-undefined-' ? null : inicio);
        var max = fin === 'undefined-undefined-' ? new Date() : new Date(fin);
        fecha = new Date(fecha);

        if (fecha >= min && fecha <= max) {
            return true;
        }
        return false;
    });
};

function formatoMoneda(n, moneda) {
    var num = parseFloat(n);
    return moneda + " " + num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ,");

}

function datosImporte() {
    var datos_tabla;
    var datos_fila = '';
    var CANTIDAD = 0, ITEMS;
    $('#detalle tbody').children().each(function (i) {
        CANTIDAD += parseFloat($(this).find('td.mtotal').text());
        ITEMS = i + 1;
    });
    datos_tabla = CANTIDAD;
    return datos_tabla;
}

function datosDetraccion() {
    var datos_tabla = 0;
    let iNroReg = oTableActividad.fnGetData().length;
    if (iNroReg === 0) {
        return datos_tabla;
    }

    var datos_fila = '';
    var CANTIDAD = 0, ITEMS;

    $('#detalle tbody').children().each(function (i) {
        let pos = oTableActividad.fnGetPosition(this);
        let row = oTableActividad.fnGetData(i);
        let nDETRACCION = row.DETRACCION;

        CANTIDAD += nDETRACCION;
        
        ITEMS = i + 1;
    });
    datos_tabla = CANTIDAD;
    return datos_tabla;
}

function ListarEstablecimiento() {
    var select = $('#cbo_establecimiento').select2('destroy');
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + $("#cbo_Emp").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $(select).empty();
            $(select).append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $(select).val($('#ctl00_hddestablecimiento').val());
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $(select).select2();
}

var limpiar = function () {
    $('#txtcodprod').val("");
    $('#txtdescprod').val("");
    $('#cboUniMedida').select2("val","");
    $('#txtcant').val("");
    $('#txt_importe').val("");
    $('#txt_glosa_dt').val("");
}

// EMAIL

function cargarCorreos() {
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
        for (var u in data) {
            if (data[u].usuario === $('#ctl00_txtus').val()) {
                $('#txtRemitente').val(data[u].email);
                break;
            }
        }
        $('#cboCorreos').selectize({
            persist: false,
            maxItems: null,
            valueField: 'email',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                    '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.email;
                    var caption = item.name ? item.email : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                    '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                // email@address.com
                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name <email@address.com>
                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                    return { email: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                alert('Invalid email address.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');

        for (var c in data) {
            if (data[c].codigo === $('#hfPIDM').val()) {
                $("#cboCorreos")[0].selectize.setValue(data[c].email);
                break;
            }
        }

    });
    if ($("#txtRemitente").val() == "") {
        $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
    }
};

function enviarCorreo() {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {

        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        $("#divMsgCorreo").css("display", "none");
        $("#msgCorreo").html("");
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=correo&REMITENTE=" + $('#txtRemitente').val() +
                      "&NREMITENTE=" + $('#txtRemitente').val() +
                      "&DESTINATARIOS=" + destinos +
                      "&ASUNTO=" + $('#txtAsunto').val() +
                      "&p_code_orden=" + $('#txtNumDctoComp').val() +
                      "&p_DOC_REGIS_NRO=" + $('#txt_num_ser_reg').val() +
                      "&MENSAJE=" + $('#txtcontenido').val(),
            contentType: "application/json;",
            dataType: false,
            success: function (datos) {
                if (datos.indexOf("error") >= 0) {
                    alertCustom("No se encontró el archivo adjunto. Correo no se envió correctamente.");

                } else {
                    exito();
                    $("#divMsgCorreo").css("display", "block");
                    $("#msgCorreo").html("Se envió correo a: " + destinos);
                }
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);

            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });

    }
};

// UNIDADES DE MEDIDA
function cargarUnidadesMedida() {
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=11",
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            $('#cboUniMedida').empty();
            $('#cboUniMedida').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboUniMedida').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        },
        error: function (msg) {
            alertCustom('Error al listar unidades de medida.');
        }
    });
}

// PRODUCTOS
productos = [];
prodActual = {};
function cargarProductos() {
    almacenableInd = ($("#cbo_doc_registro :selected").val() == "C") ? "S" : "N";
    $.ajax({
        type: "post",
        url: "vistas/NO/ajax/NOMORDD.ashx?OPCION=1",
        cache: false,
        data: { CTLG_CODE: $('#cbo_Empresa').val(), SCSL_CODE: $('#cbo_Sucursal').val(), ALMACENABLE_IND: almacenableInd },
        datatype: "json",
        async: false,
        success: function (data) {
            productos = data;
        },
        error: function (msg) {
            alertCustom('Error al listar productos.');
        }
    });
};

function autocompletarDatosProducto() {
    $("#divCodigoProducto").html('<input id="txtcodprod" class="span12" type="text" style="text-transform: uppercase" />');
    $("#divDescProducto").html('<input id="txtdescprod" class="span12" type="text" data-provide="typeahead" style="text-transform: uppercase" />');
    v_value = "";
    //DESCRIPCION DE PRODUCTO
    var input = $("#txtdescprod");
    input.typeahead({       
        source: function (query, process) {       
            array = [];
            map = {};
            var obj = "[";
            for (var i = 0; i < productos.length; i++) {
                array.push(productos[i].DESC_ADM);
                obj += '{';
                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
                obj += '},';
            }
            obj += "{}";
            obj = obj.replace(",{}", "");
            obj += "]";
            var json = $.parseJSON(obj);

            $.each(json, function (i, objeto) {
                map[objeto.DESC_ADM] = objeto;
            });
            process(array);
        },
        updater: function (item) {                  
            prodActual.CODIGO = map[item].CODIGO;
            prodActual.CODIGO_ANTIGUO = map[item].CODIGO_ANTIGUO;
            prodActual.DESC_ADM = map[item].DESC_ADM;
            prodActual.DETRACCION = map[item].DETRACCION;
            prodActual.NO_SERIADA = map[item].NO_SERIADA;
            prodActual.STOCK_REAL = map[item].STOCK_REAL;
            prodActual.UNIDAD = map[item].UNIDAD;                
            $("#txtcodprod").val(map[item].CODIGO_ANTIGUO);
            $("#cboUniMedida").select2("val", map[item].UNIDAD);
            return item;
        },
    });
    input.keyup(function (e) {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"))
        if ($("#txtdescprod").val().length <= 0) {
            prodActual = {};
            $("#txt_importe").val("");
            $("#txtcodprod").val("");            
            $("#txtcant").attr("disabled", false);
            $("#txtcant").val("");
        } else {
            var key = e.keyCode ? e.keyCode : e.which;
            if (prodActual.CODIGO != "") {
                if (key === 13) {
                    $('#txtcant').focus();
                }
            }
        }
    });
    input.val(v_value);
    //CODIGO DE PRODUCTO
    var input = $("#txtcodprod");
    input.typeahead({
        source: function (query, process) {
            array = [];
            map = {};
            var obj = "[";
            for (var i = 0; i < productos.length; i++) {
                array.push(productos[i].CODIGO_ANTIGUO);
                obj += '{';
                obj += '"DESC_ADM":"' + productos[i].DESC_ADM + '","CODIGO":"' + productos[i].CODIGO + '","CODIGO_ANTIGUO":"' + productos[i].CODIGO_ANTIGUO + '","UNIDAD":"' + productos[i].UNIDAD + '","NO_SERIADA":"' + productos[i].NO_SERIADA + '", "DETRACCION": "' + productos[i].DETRACCION + '", "STOCK_REAL": "' + productos[i].STOCK_REAL + '"';
                obj += '},';
            }
            obj += "{}";
            obj = obj.replace(",{}", "");
            obj += "]";
            var json = $.parseJSON(obj);

            $.each(json, function (i, objeto) {
                map[objeto.CODIGO_ANTIGUO] = objeto;
            });
            process(array);
        },
        updater: function (item) {
            prodActual.CODIGO = map[item].CODIGO;
            prodActual.CODIGO_ANTIGUO = map[item].CODIGO_ANTIGUO;
            prodActual.DESC_ADM = map[item].DESC_ADM;
            prodActual.DETRACCION = map[item].DETRACCION;
            prodActual.NO_SERIADA = map[item].NO_SERIADA;
            prodActual.STOCK_REAL = map[item].STOCK_REAL;
            prodActual.UNIDAD = map[item].UNIDAD;

            $("#txtdescprod").val(map[item].DESC_ADM);
            $("#cboUniMedida").select2("val",map[item].UNIDAD);
            return item;
        },
    });
    input.keyup(function (e) {
        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
        $(this).siblings("ul").css("width", $(this).css("width"))
        if ($("#txtcodprod").val().length <= 0) {
            prodActual = {};
            $("#txt_importe").val("");
            $("#txtdescprod").val("");            
            $("#txtcant").attr("disabled", false);
            $("#txtcant").val("");
        } else {
            var key = e.keyCode ? e.keyCode : e.which;
            if (prodActual.CODIGO != "") {
                if (key === 13) {
                    $('#txtcant').focus();
                }
            }
        }
    });
    input.val(v_value);
}

var calcularFechaVencimiento = function () {
    if ($("#txt_plazo_pago").val() >= 0) {
        $.ajax({
            type: "post",
            url: "vistas/NO/ajax/NOMORDD.ashx?OPCION=FECHAX&p_PLAZO=" + $("#txt_plazo_pago").val() + "&FECHA_TRANSACCION=" + $("#txt_fec_transaccion").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $("#txt_fec_vencimiento").val(datos[0].FECHANUEVA);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}
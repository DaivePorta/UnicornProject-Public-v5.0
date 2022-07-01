depositos_Masivos = false;

var CPMPGDT = function () {




    var plugins = function () {
        $('#cboProveedores').select2();
        $('#cbo_OrigenPago').select2();
        $('#cboCtaEmpresa').select2();
        $('#cboMedioPago').select2();
        $("#cbDestino, #cbo_Det_Origen, #cbo_moneda,#Mcbo_OrigenPago,#Mcbo_Det_Origen").select2();
        $("#txtMonto").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })

    }


    var cargarCombos = function () {
        $.ajaxSetup({ async: false });
        $("#slcEmpresa").select2();
        $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#cbDestino").select2();
                  $("#slcEmpresa").html(res).change(function () {

                      $("#cbo_moneda").attr("disabled", true);



                      $.ajaxSetup({ async: false });

                      $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: "MO", empresa: $("#slcEmpresa").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_moneda")
                                    //.attr("disabled",false)
                                    .html(res)
                                    .change(function () {
                                        var val0r = $(this).val();
                                        var d = 0.00;

                                    });

                                $("#txt_monto_base").attr("TIPO", $("#cbo_moneda option[tipo=MOBA]").val());
                                $("#txt_monto_alt").attr("TIPO", $("#cbo_moneda option[tipo=MOAL]").val());
                            }

                        });
                      $.ajaxSetup({ async: true });


                  });

              }

          });
        $.ajaxSetup({ async: true });



        $("#cboMedioPago").select2();



        cargaMediosDePago();

    }




    jsonPersonas = null;

    var funcionalidad = function () {

        $("#btn_completar").click(function () {

            if (!vErrors(["Mcbo_OrigenPago", "Mcbo_Det_Origen", "MtxtNroOpe"])) {



            }

        });

        $("#slcEmpresa").change(function () {
            $("#cbo_OrigenPago").attr("disabled", false);

            $("#txt_monto_base").attr("monto", 0.00).val("S/. 0.00");
            $("#txt_monto_alt").attr("monto", 0.00).val("US$ 0.00");

            limpiaCampos();
            consultaDeudas();



            $("#form_medioPago").css("display", "block")

        });


        $("#txtMonto").change(function () {

            var tipo = $("#cbo_moneda :selected").attr("tipo");
            var valor_ = parseFloat($(".monto_sele[tipo = " + tipo + "]").attr("monto"));
            var valor_2 = tipo == "MOAL" ? parseFloat($("#cbo_Det_Origen :selected").attr("monto_d")) : parseFloat($("#cbo_Det_Origen :selected").attr("monto"));

            var d = 0.00;
            if ($("#cboMedioPago").val() != "0006") {
                if (parseFloat($(this).val()) > valor_2) {

                    $(this).val("").attr("monto", 0.000);


                    infoCustom2("El monto excede al saldo disponible en la " + $("#lbl_detalle1").html());

                    $("#s2id_cbo_Det_Origen").pulsate({
                        color: "#33AECD",
                        reach: 20,
                        repeat: 3,
                        glow: true
                    });
                }

                else {
                    if ((parseFloat($(this).val()) + d) > valor_) {

                        $(this).val("").attr("monto", 0.000);
                        infoCustom2("El monto ingresado es mayor al que se ha seleccionado a pagar!");
                        $(".monto_sele[tipo = " + tipo + "]").pulsate({
                            color: "#33AECD",
                            reach: 20,
                            repeat: 3,
                            glow: true
                        });
                    }
                    else {
                        $(this).val(formatoMiles($(this).val()))
                        .attr("monto", $(this).val());
                    }

                }


                if ($(this).attr("monto") == "") {
                    $(this).attr("monto", 0.00);
                }

            }

        });



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

        eventOrigenBco = false;
        eventOrigenCaj = false;

        $('#Mcbo_OrigenPago').change(function () {
            $(".det_saldos").css("display", "none");
            $("#MiconDetSaldo").removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
            /**/
            var OrigenActual = $(this).val();
            switch (OrigenActual) {

                case "Caja":
                    $("#divMSaldoCaja").addClass("activo");
                    $("#divMSaldoCtas").removeClass("activo");

                    $("#Mlbl_detalle1").html("Caja");

                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val() },
                         function (res) {

                             $("#Mcbo_Det_Origen").html(res).attr("disabled", false).change(function () {

                                 //$("#MiconDetSaldo").click();
                                 $("#MtxtMontoDisponibleMOBA").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto")));
                                 $("#MtxtMontoDisponibleMOAL").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto_d")));
                             });

                         });

                    $.ajaxSetup({ async: true });

                    break;

                case "Banco":

                    $("#divMSaldoCaja").removeClass("activo");
                    $("#divMSaldoCtas").addClass("activo");

                    $("#Mlbl_detalle1").html("Cuenta");

                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: "0002"/*soles*/ },
                      function (res) {

                          $("#Mcbo_Det_Origen").html(res).attr("disabled", false).change(function () {

                            //  $("#MiconDetSaldo").click();

                              $("#MtxtMontoDisponibleCta").val(formatoMiles($("#Mcbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#Mcbo_Det_Origen :selected").attr("monto")));
                          });;

                      });

                    $.ajaxSetup({ async: true });

                    break;
            }
        });

        $('#cbo_OrigenPago').change(function () {

            /*conf inicial mostrar detalle de saldos*/
            $(".det_saldos").css("display", "none");
            $("#iconDetSaldo").removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
            /**/
            var OrigenActual = $(this).val();

            $("#lbl_detalle3").html("-");
            $("#lbl_detalle4").html("-");
            $("#cboMedioPago").val("").change();
            $("#cbo_moneda").val("").change();

            switch (OrigenActual) {

                case "Caja":

                    $("#divSaldoCaja").addClass("activo");
                    $("#divSaldoCtas").removeClass("activo");

                    $("#lbl_detalle1").html("Caja");


                    $("#cbo_Det_Origen").off("change");
                    $("#cbo_Det_Origen").attr("data-placeholder", "CAJA").select2("val", "").change();
                    $("#cbDestino").select2("val", "");



                    $.ajaxSetup({ async: false });
                    $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val() },
                         function (res) {
                             if (res != null && res != "" && res.indexOf("error") < 0) {

                                 $("#cbo_Det_Origen").html(res).attr("disabled", false);

                                 $("#cbo_Det_Origen").change(function () {
                                     if ($('#cbo_OrigenPago').val() == "Caja") {
                                         /***/
                                         if (!eventOrigenCaj)
                                             $("#iconDetSaldo").click();
                                         /***/
                                         eventOrigenCaj |= 1;
                                         $("#txtMontoDisponibleMOBA").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto")));
                                         $("#txtMontoDisponibleMOAL").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto_d")));

                                         if ($("#cbo_moneda :selected").attr("tipo") == "MOBA") {
                                             $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto"));

                                         } else {
                                             if (($("#cbo_moneda :selected").attr("tipo") == "MOAL")) {
                                                 $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto_d"));

                                             } else {
                                                 $("#txtMonto").attr("placeholder", "");
                                             }
                                         }
                                     }
                                 });


                             } else {
                                 $("#cbo_Det_Origen").html("").attr("disabled", true);

                             }
                         });
                    $.ajaxSetup({ async: true });

                    //
                    $("#cbo_moneda").change(function () {
                        $("#txtMonto").val("").change();
                        if ($("#cbo_moneda :selected").attr("tipo") == "MOBA") {
                            $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto"));
                        } else {
                            if (($("#cbo_moneda :selected").attr("tipo") == "MOAL"))
                                $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto_d"));
                            else
                                $("#txtMonto").attr("placeholder", "");
                        }
                    });
                    //***

                    $("#cboMedioPago").html(StringMediosPago);
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0001" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);
                    break;

                case "Banco":
                    $("#divSaldoCaja").removeClass("activo");
                    $("#divSaldoCtas").addClass("activo");
                    $(".mPersona").css("display", "none");
                    $("#cbDestino").off("change");

                    $("#lbl_detalle1").html("Cuenta Origen");
                    $("#cbo_moneda").attr("disabled", true);
                    $("#cbDestino").html("<option></option>").select2("val", "");

                    //CargarCuentas Origen
                    $("#cbo_Det_Origen").val("").change().attr("data-placeholder", "CUENTA BANCARIA").select2();

                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: "0002"/*soles*/ },
                      function (res) {
                          if (res != null && res != "" && res.indexOf("error") < 0) {
                              $("#cbo_Det_Origen").html(res).attr("disabled", false);

                              $("#cbo_Det_Origen").change(function () {
                                  if ($('#cbo_OrigenPago').val() == "Banco") {

                                      /***/

                                      if (!eventOrigenBco)
                                          $("#iconDetSaldo").click();

                                      /***/

                                      eventOrigenBco |= 1;

                                      $("#cboMedioPago").change();
                                      var mone_code = $("#cbo_Det_Origen :selected").attr("moneda");
                                      $("#cbo_moneda").select2("val", mone_code);
                                      $("#txtMonto").attr("placeholder", "max. " + ($("#cbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto")));

                                      $("#txtMontoDisponibleCta").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto")));
                                      if (mone_code == "0002") {//soles
                                          $($("#txtMontoDisponibleCta").siblings("span")).addClass("Rojo").removeClass("Azul").html("S/.")

                                      } else {//dolares
                                          $($("#txtMontoDisponibleCta").siblings("span")).addClass("Azul").removeClass("Rojo").html("US$.")
                                      }
                                      $("#txtMontoDisponibleCta").css("border-color", $($("#txtMontoDisponibleCta").siblings("span")).css("border-color"));
                                  }
                              });

                          } else {
                              $("#cbo_Det_Origen").html("<option></option>").change();
                          }

                      });
                    $.ajaxSetup({ async: true });


                    $("#cboMedioPago").html(StringMediosPago);
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0005" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);

                    break;

            }
        });

        $('#cboMedioPago').change(function () {

            var MedioActual = $(this).val();

            $("#txtNroOpe").removeClass("personas").attr("disabled", false);

            $("#cbDestino").val("").select2();

            $("#cbDestino").html("<option value='CUENTA DETRACCION PROVEEDOR'>CUENTA DETRACCION PROVEEDOR</option>");

            $("#cbDestino").attr("disabled", true).off("change");

            $("#txtNroOpe").val("");

            $("#cbo_moneda").val("0002").change();//soles
            $(".infopm").hide();
            depositos_Masivos = false;



            switch (MedioActual) {

                case "0001"://DEPOSITO BANCARIO

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Nro. Op.");

                    $("#cbDestino").attr("disabled", true).select2();
                    $("#cbo_moneda").attr("disabled", true);

                    $(".mPersona").css("display", "none");
                    offObjectEvents("txtNroOpe");
                    $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);

                    if ($(".selecChk:checked").length < 10) {
                        $("#txtNroOpe").attr("disabled", false).addClass("obligatorio");
                        if (!depositos_Masivos && $(".selecChk:checked").length > 1) {
                            $(".infopm").show();
                        }
                    } else {
                        $("#txtNroOpe").attr("disabled", true).removeClass("obligatorio");
                    }

                    break;


                case "0003": //transferencia

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Nro. Op.");
                    $("#cbDestino").html("<option value='CUENTA DETRACCION PROVEEDOR'>CUENTA DETRACCION PROVEEDOR</option>");
                    $("#cbDestino").attr("disabled", true).change().select2();
                    $("#cbo_moneda").attr("disabled", true);
                    $("#txtMonto").attr("disabled", false);
                    //$("#txtNroOpe").attr("disabled", false);
                    depositos_Masivos = true;
                    $("#txtNroOpe").attr("disabled", false).removeClass("obligatorio");
                    break;

                case "0013": //cheques bancarios

                  
                    if ($(".selecChk:checked").length < 1) {

                        infoCustom2("Debe estar seleccionado un documento a pagar como mínimo!");
                        $("#cboMedioPago").val("").change().select2();
                        $("#s2id_cboMedioPago").pulsate({
                            color: "#33AECD",
                            reach: 20,
                            repeat: 3,
                            glow: true
                        });
                    } else {
                        if ($(".selecChk:checked").length > 9) {
                            depositos_Masivos = true;
                        } else {
                            if ($(".selecChk:checked").length == 1) {
                                depositos_Masivos = false;
                            } else {//esta entre 2-9
                                depositos_Masivos = false;
                                infoCustom2("Para realizar pago masivo con cheque debe seleccionar 10 documentos como mínimo!");
                                $("#cboMedioPago").val("").change().select2();
                                $("#s2id_cboMedioPago").pulsate({
                                    color: "#33AECD",
                                    reach: 20,
                                    repeat: 3,
                                    glow: true
                                });
                            }

                        }

                    }


                    $("#lbl_detalle3").html("N° Cheque");
                    $("#lbl_detalle4").html("Girado a");

                    $("#cbDestino").attr("disabled", false);
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 8, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm") },
                      function (res) {
                          if (res != null && res != "" && res.indexOf("error") < 0) {
                              $("#cbDestino").html(res).change(function () {
                                  $("#txtNroOpe").val($("#cbDestino :selected").attr("ngiradoa"));
                                  $("#txtNroOpe")
                                      .attr("valor", $("#cbDestino :selected").attr("giradoa"))
                                  ;
                                  $("#txtMonto")
                                      .val($("#cbDestino :selected").attr("monto"))
                                      .change();
                              }

                              );
                          } else {
                              $("#cbDestino").html("<option></option>").select2();
                          }

                      });
                    $.ajaxSetup({ async: true });


                    $("#txtNroOpe").attr("disabled", true);
                    $("#txtMonto").attr("disabled", true);
                    break;

                case "0006": //tarjeta de credito

                    $("#lbl_detalle3").html("N° Tarjeta");
                    $("#lbl_detalle4").html("Nro. Op.");

                    $("#txtNroOpe").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);

                    $("#cbDestino").attr("disabled", false);
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0006" },
                      function (res) {
                          if (res != null && res != "" && res.indexOf("error") < 0) {
                              $("#cbDestino").html(res).change(function () {

                              }

                              );
                          } else {
                              $("#cbDestino").html("<option></option>").select2();
                          }

                      });
                    $.ajaxSetup({ async: true });

                    break;

                case "0005": // tarjeta de debito

                    $("#lbl_detalle3").html("N° Tarjeta");
                    $("#lbl_detalle4").html("Nro. Op.");

                    $("#txtNroOpe").attr("disabled", false);
                    $("#txtMonto").attr("disabled", false);

                    $("#cbDestino").attr("disabled", false);
                    $.ajaxSetup({ async: false });

                    $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0005" },
                      function (res) {
                          if (res != null && res != "" && res.indexOf("error") < 0) {
                              $("#cbDestino").html(res).select2();
                          } else {
                              $("#cbDestino").html("<option></option>").select2();
                          }

                      });
                    $.ajaxSetup({ async: true });

                    if ($(".selecChk:checked").length < 10) {
                        $("#txtNroOpe").attr("disabled", false).addClass("obligatorio");
                        if (!depositos_Masivos && $(".selecChk:checked").length > 1) {
                            $(".infopm").show();

                        }
                    } else {
                        $("#txtNroOpe").attr("disabled", true).removeClass("obligatorio");
                    }

                    break;

            }


        });


        cargarJson();
    }

    function cargarInputsPersona() {


        var arrayPersonas = new Array();



        function cargaAutoCompleteInputs() {

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


                    }
                    if (!encontrado) {
                        actual.removeAttr("valor");
                    }
                });
                if (actual.val() == "") { actual.removeAttr("valor"); }
            });


        }


        cargaAutoCompleteInputs();
    }

    function btnBuscaPersonas() {

        $(".buscaPersona").click(function () {
            var campo = $("#txtNroOpe");
            if ($.trim(campo.val()) != "") {
                var pidm = campo.attr("valor");
                if (pidm != undefined) {
                    BuscarEmpresa(pidm);
                } else {
                    campo.parents(".control-group").addClass("error");
                    alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese informaci&oacute;n v&aacute;lida!");
                    campo.focus(function () { $(this).parents(".control-group").removeClass("error"); });
                }
            } else {
                campo.parents(".control-group").addClass("error");
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese el campo requerido!");
                campo.focus(function () { $(this).parents(".control-group").removeClass("error"); });
            }
        });

    }


    var cargainicial = function () {
        montoCajas(".div_origen");
        montoCtas(".div_origen");
        montoCajasM(".div_origenM");
        montoCtasM(".div_origenM");
        $("#iconDetSaldo, #MiconDetSaldo").click(function () {
            if ($(this).hasClass("icon-circle-arrow-down")) {
                $(".det_saldos.activo").slideDown();
                $(this).removeClass("icon-circle-arrow-down").addClass("icon-circle-arrow-up");
            } else {
                $(".det_saldos.activo").slideUp();
                $(this).removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
            }
        });
        cargatablavacia();
        btnBuscaPersonas();
        cargatablavaciaLote();

        $('#txtFechaPago').datepicker();
        $('#txtFechaPago').inputmask("date",
        {
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            }
        });

        $('#txtFechaPago').datepicker("setDate", new Date());
        $("#txtFechaTransaccion").datepicker({ dateFormat: "yy/mm/dd" }).datepicker("setDate", new Date());

        $("#slcEmpresa").change();
    }

    json_selec = new Array();

    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.selecChk', function () {


            var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas.fnGetData(pos);

            var moba = parseFloat(row.MONTO);//moneda base

            var valor_moba = parseFloat($("#txt_monto_base").attr("monto") == "" ? 0 : $("#txt_monto_base").attr("monto"));

            if ($(this).is(":checked")) {

                $(this).parent().parent().addClass('selected');

                valor_moba += moba;

                json_selec.push(row);

                $($(".monto_sele").parents(".control-group")[0]).removeClass("error");

            } else {

                $(this).parent().parent().removeClass('selected');

                valor_moba -= moba;

                json_selec.filter(function (e, f) {
                    if (e == row) { json_selec.splice(f, 1); }
                });

            }

            $("#txt_monto_base")
                .val("S/." + formatoMiles(valor_moba))
                .attr("monto", valor_moba.toFixed(2));

            if ($("#cboMedioPago").val() == "0013" && $(".selecChk:checked").length > 1) {//si es cheque

                $("#cboMedioPago").val("").change().select2();
            }

            if ($("#cboMedioPago").val() == "0003") {//si es transferencia

                depositos_Masivos = true;
                $(".infopm").hide();
                $("#txtNroOpe").attr("disabled", true).removeClass("obligatorio");
            } else {

                if ($(".selecChk:checked").length >= 10) {

                    depositos_Masivos = true;
                    $(".infopm").hide();
                    $("#txtNroOpe").attr("disabled", true).removeClass("obligatorio");
                }
                else {

                    $("#txtNroOpe").attr("disabled", false).addClass("obligatorio");
                    depositos_Masivos = false;
                    if ($(".selecChk:checked").length > 1 && $("#cboMedioPago").val() != "0013" && $("#cboMedioPago").val() != "")
                        $(".infopm").show();
                    else
                        $(".infopm").hide();

                }
            }

        });


        $('#tblBandeja2 tbody').on('click', '.detDoc', function () {

            var pos = oTableDeudas2.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas2.fnGetData(pos);
            var detalle = row.DETALLE;
            var id = row.CODIGO;
            var nTr = $(this).parents('tr')[0];

            if (oTableDeudas2.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTableDeudas2.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTableDeudas2.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                oTableDeudas2.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');

                var datos = detalle;

                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
                        var str = "";
                        var resb = "";
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                                    resb += '<th>Tipo Documento</th>';
                                   resb += '<th>Documento</th>';
                                   resb += '<th>Fecha</th>';
                                   resb += '<th>Deuda</th>';
                                   resb += '<th>Proveedor</th>';                
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF" + id, datos);
                        }


                    
                

            }

        });

        $('#tblBandeja2 tbody').on('click', '.completar', function () {

            var pos = oTableDeudas2.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas2.fnGetData(pos);

            json_pCompletar = JSON.parse(JSON.stringify(row));

            $("#divConfirmacion").modal("show");
            $("#Mcbo_OrigenPago").val(json_pCompletar.TIPO == "CAJ" ? "Caja" : "Banco").change();
            $("#Mcbo_Det_Origen").val(json_pCompletar.ORIGEN).change();
            $("#MtxtFecha").datepicker("setDate", new Date()).datepicker("update").datepicker("setStartDate", json_pCompletar.FECHA_CREACION.display);
        });

        $('#tblBandeja2 tbody').on('click', '.descargar', function () {

            var pos = oTableDeudas2.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas2.fnGetData(pos);
            var detalle = row.DETALLE;
            var id = row.CODIGO;

            DepositosMasivos(row.FECHA_CREACION.display.substring(8), row.NRO_SECUENCIAL, $("#slcEmpresa :selected").attr("RUC"), $("#slcEmpresa :selected").text().split(".").join(""), row.MONTO, row.MEDIO_PAGO.CODIGO, detalle);
        
        });


        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id + '"></div>';
            return sOut;
        }
    }



    return {
        init: function () {
            plugins();
            cargarCombos();
            funcionalidad();
            cargainicial();

            funcionalidadTabla();

        }
    };
}();


function consultaDeudas(p_tipo) {
    if ($("#cboProveedores").val() != "") {
        Bloquear("div_body");
        $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 4, empresa: $("#slcEmpresa").val(), tipo: p_tipo },
              function (datos) {
                  if (datos != "" && datos != null) {
                      var json = $.parseJSON(datos);
                      if (json.length > 0) {
                          llenarTablaDeudas(json);
                     
                      } else {
                          llenarTablaDeudas(null);
                      }
                      $(".info").filter(function (e, d) { showInfo($(d).attr("id"), "Información", "Éste proveedor no posee una <br>cuenta de detracción registrada. <br><a href='?f=NRMGEPR&tp=" + ($(d).attr("pr").substring(0, 2) == '20' ? 'J' : 'N') + "&td=" + ($(d).attr("pr").substring(0, 2) == '20' ? '6' : '1') + "&d=" + $(d).attr("pr") + "#estereotipos' target='_blank'>Registrar aquí</a>", 'D', 'D'); });
                  } else {
                      llenarTablaDeudas(null);
                  }
              }).done(function () {

                  Desbloquear("div_body");

              });
    } else {
        llenarTablaDeudas(null);
    }
    json_selec = new Array();
    $("#txt_monto_base").attr("monto", "0");
    $("#txt_monto_base").val("").change();
}


function consultaDeudas2() {

    if ($("#cboProveedores").val() != "") {
        Bloquear("div_body2");
        $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 1.3, empresa: $("#slcEmpresa").val(), completo:"N" },
              function (datos) {
                  if (datos != "" && datos != null) {
                      var json = $.parseJSON(datos);
                      if (json.length > 0) {
                          llenarTablaDeudas2(json);

                      } else {
                          llenarTablaDeudas2(null);
                      }
                      $(".info").filter(function (e, d) { showInfo($(d).attr("id"), "Información", "Éste proveedor no posee una <br>cuenta de detracción registrada. <br><a href='?f=NRMGEPR&tp=" + ($(d).attr("pr").substring(0, 2) == '20' ? 'J' : 'N') + "&td=" + ($(d).attr("pr").substring(0, 2) == '20' ? '6' : '1') + "&d=" + $(d).attr("pr") + "#estereotipos' target='_blank'>Registrar aquí</a>", 'D', 'D'); });
                  } else {
                      llenarTablaDeudas2(null);
                  }
              }).done(function () {

                  Desbloquear("div_body2");

              });
    } else {
        llenarTablaDeudas(null);
    }

}

function cargatablavacia() {

    oTableDeudas = $('#tblBandeja').dataTable({
        data: null,
        columns: [
            {
                data: "TIPO_DOC",
                createdCell: function (td, cellData, rowData, row, col) {

                }
            },
            {
                data: "DOCUMENTO.NUMERO",
                createdCell: function (td, cellData, rowData, row, col) {

                }
            },
            {
                data: "DETRACCION_DEFINICION",
                createdCell: function (td, cellData, rowData, row, col) {

                }
            },
            {
                data: { _: "FECHA_EMISION_DCTO.display", sort: "FECHA_EMISION_DCTO.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');

                }
            },
             {
                 data: { _: "FECHA_PAGO.display", sort: "FECHA_PAGO.order" },
                 visible:false,
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');

                 }
             },
            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'right');

                    $(td).html(rowData.MONEDA.SIMBOLO + formatoMiles(rowData.MONTO));

                }
            },

            {
                data: "PROVEEDOR.NOMBRE"
            },

            {
                data: "LOTE",
                visible:false
            },
            {
                data: null,
                defaultContent: '  <input type="checkbox" class="selecChk" />',
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                    if (rowData.CTA_DETRACCION == 0) {
                        $(td).html('<i style="color:#888; cursor:help;" pr="' + rowData.PROVEEDOR.DOCUMENTO + '" id="info_' + rowData.CODIGO + '" class="icon-info-sign info"></i>');
                        $($(td).parents("tr")[0]).css("color", "#A5A5A5");

                    }                   
                }
            }

        ],
        "scrollY": "280px", "scrollCollapse": false, "paging": false,
        "order": [[3, 'asc'],[5,'asc']],
        //drawCallback: function (settings) {
        //    var api = this.api();
        //    var rows = api.rows({ page: 'current' }).nodes();
        //    var last = null;

        //    api.column(7, { page: 'current' }).data().each(function (group, i) {
        //        if (last !== group) {
        //            $(rows).eq(i).before(
        //                '<tr class="group"><td colspan="8" style="BACKGROUND-COLOR: rgb(223, 223, 223);">LOTE ' + group + '</td></tr>'
        //            );

        //            last = group;
        //        }
        //    });
        //},
        info: false
    });

    $('.display.DTTT_selectable.dataTable.no-footer').removeAttr('style');
    // $('#tblBandeja_filter').css('display', 'none');



    $('.display.DTTT_selectable.dataTable.no-footer').removeAttr('style');

    $($("#tblBandeja_wrapper div.span6")[0]).html(
        '<button type="button" class="btn green refreshData"><i class="icon-refresh"></i></button>');

    $(".pago").click(function () {
        optActual = $(this).val();
        flag_in = false;
        $(".pago").attr("disabled", true);
        switch (optActual) {

            case "P":
                
                $(".pPagar").hide();
                $("#div_body").hide();
                $("#div_body2").show();
                consultaDeudas2($(this).val());
                if ($("#form_medioPago").css("display") == "block") {

                    $("#form_medioPago").toggle('slide', { direction: "right" }
                               , 500, function () {
                                   $("#div_body2").removeClass("span7").addClass("span12");
                                   $('#tblBandeja2').DataTable().draw();
                                   oTableDeudas2.fnAdjustColumnSizing();
                                   $(".pago").attr("disabled", false);
                               });
                } else
                    $("#div_body2").removeClass("span7").addClass("span12");
                $(".pago").attr("disabled", false);
                break;

            case "S"://pagados
                $(".pPagar").hide();
                consultaDeudas($(this).val());

               

                $("#div_body2").hide();
                $("#div_body").show();
                if ($("#form_medioPago").css("display") == "block") {

                    $("#form_medioPago").toggle('slide', { direction: "right" }
                               , 500, function () {
                                   $("#div_body").removeClass("span7").addClass("span12");
                                   
                                   $('#tblBandeja').DataTable().draw();
                                   oTableDeudas.api(true).column(4).visible(true);
                                   oTableDeudas.api(true).column(8).visible(false);
                                   oTableDeudas.api(true).column(7).visible(true);
                                   oTableDeudas.fnAdjustColumnSizing();
                                   $(".pago").attr("disabled", false);
                               });
                } else {
                    $("#div_body").removeClass("span7").addClass("span12");
                    $(".pago").attr("disabled", false);
                }
                              
                
                break;

            case "N"://no pagados
                $(".pPagar").show();
                $("#div_body2").hide();
                $("#div_body").show();
                consultaDeudas($(this).val());

               

                if ($("#form_medioPago").css("display") == "none") {
                    $("#div_body").removeClass("span12").addClass("span7");
                    $("#div_body2").removeClass("span12").addClass("span7");
                    $("#form_medioPago").toggle('slide', { direction: "right" }
                               , 500, function () {
                                   $('#tblBandeja').DataTable().draw();
                                   oTableDeudas.api(true).column(4).visible(false);
                                   oTableDeudas.api(true).column(8).visible(true);
                                   oTableDeudas.api(true).column(7).visible(false);
                                   oTableDeudas.fnAdjustColumnSizing();
                                   $(".pago").attr("disabled", false);
                               });
                } else {
                    $("#div_body").removeClass("span12").addClass("span7");
                    $(".pago").attr("disabled", false);
                }
                              
               

                break;

        }





    });


    $(".refreshData").click(function () { consultaDeudas($('.pago[name=pago]:checked').val()); });



}

function cargatablavaciaLote() {

    oTableDeudas2 = $('#tblBandeja2').dataTable({
        data: null,
        columns: [
            {
                data: null,
                defaultContent: "  <img src='recursos/img/details_open.png' class='detDoc' />",
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                }
            },
            {
                data: "NRO_SECUENCIAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },
            {
                data: "MEDIO_PAGO.NOMBRE"
            },
             {
                 data: "ORIGEN"
             },
    
            {
                data: { _: "FECHA_CREACION.display", sort: "FECHA_CREACION.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');

                }
            },        
            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                     $(td).html(rowData.MONEDA.SIMBOLO + formatoMiles(valor));
                }
            },
            {
                data: null,
                defaultContent: '  <button type="button" class="btn blue descargar"><i class="icon-download"></i> Archivo</button>',
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                }
            },
          
            {
                data: null,
                defaultContent: '  <button type="button" class="btn green completar"><i class="icon-ok"></i> Completar</button>',
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                }
            }



        ],
        "scrollY": "280px",
        "scrollCollapse": false,
        "paginate": false,
        "order": [[2, 'asc'], [5, 'asc']],

        info: false

    });

    $($("#tblBandeja2_wrapper div.span6")[0]).html('<button type="button" class="btn green refreshData2"><i class="icon-refresh"></i></button>');

    $(".refreshData2").click(function () { consultaDeudas2(); });



}

function cargatablavaciaDetalleF(id, json) {

    oTableDeudasDetalle = iniciaTabla(id, {
        data: json,
        columns: [
            {
                data: "TIPO_DOC",
                createdCell: function (td, cellData, rowData, row, col) {

                }
            },
            {
                data: "DOCUMENTO.NUMERO",
                createdCell: function (td, cellData, rowData, row, col) {

                }
            },

            {
                data: { _: "FECHA_EMISION_DCTO.display", sort: "FECHA_EMISION_DCTO.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');

                }
            },

            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'right');

                    $(td).html(rowData.MONEDA.SIMBOLO + formatoMiles(rowData.MONTO));

                }
            },

            {
                data: "PROVEEDOR.NOMBRE"
            }


        ],
        "paging": false,
        scrollCollapse: true,
        //  sort: false,
        "sDom": "t"

    });


}

function llenarTablaDeudas2(json) {


    oTableDeudas2.fnClearTable()

    if (json != null)
        oTableDeudas2.fnAddData(json);
   // oTableDeudas2.fnAdjustColumnSizing();
}

function llenarTablaDeudas(json) {


    oTableDeudas.fnClearTable()

    if (json != null)
        oTableDeudas.fnAddData(json);
    oTableDeudas.fnAdjustColumnSizing();
}

function nuevapersona() {

    window.open('?f=ncmpers', '_blank');

}

$("#btnGrabar").click(function () { verificaPago(); });

var cade_pagar = "";
eventoModalHide = false;

function verificaPago() {


    if (!vErrorBodyAnyElement(".obligatorio") && parseFloat($("#txtMonto").attr("monto")) > 0) { //si no hay errores en los campos oblig. 



        pagar();


    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }


}

var cade_pagar = "";

function pagar() {


    cade_pagar = "";


    var cantidad_doc_venta = json_selec.length;



    if (parseInt($(".monto_sele").attr("monto")) == 0 || json_selec.length == 0) {

        alertCustom("No se ha seleccionado ningún documento a pagar!");

    } else {

        var nTotalDeuda = parseFloat(($(".moneda.activo :selected").attr("tipo") == "MOBA" ? $("#txt_monto_base").attr("monto") : $("#txt_monto_alt").attr("monto")).split(",").join(""));
        var nTotalAmortizacion = parseFloat($("#txtMonto").attr("monto").split(",").join(""));

        if (nTotalAmortizacion > nTotalDeuda) {

            alertCustom("El monto ingresado es mayor al que se ha seleccionado a pagar!");

        } else {


            var json_ordenado = json_selec.sort(function (a, b) {
                return a.CODIGO.order - b.CODIGO.order
            });

            var monto = parseFloat($("#txtMonto").val().split(",").join(""));

            var ind = false;

            var ind_tipo = $("#cbo_OrigenPago").val().substring(0, 1);




            json_ordenado.filter(function (e) {

                var montoBase = e.ES_MONEDA_BASE ? e.MONTO : 0.00;
                var montoAlter = e.ES_MONEDA_BASE ? 0.00 : e.MONTO;

                var monto_pp = "";

                var moneda;


                if (montoBase > 0.00) {

                    monto_pp = parseFloat(montoBase);

                } else {

                    monto_pp = parseFloat(montoAlter);

                }

                monto -= monto_pp;



                if (monto >= 0 && (contar_codigos(oTableDeudas.fnGetData(), e.CODIGO) == 1 || contar_codigos(json_ordenado, e.CODIGO) == contar_codigos(oTableDeudas.fnGetData(), e.CODIGO))) {

                    cade_pagar += ("|" + e.CODIGO + "," + e.DOCUMENTO.NUMERO + "," + montoBase + "," + montoAlter + ",S");
                }
                else {
                    monto_pp += monto;
                    if (montoBase != 0.00) {
                        if (!ind) { montoBase = monto_pp.toFixed(2); ind |= 1; }
                        else { montoBase = 0; }
                    } else {
                        if (!ind) { montoAlter = monto_pp.toFixed(2); ind |= 1; }
                        else { montoAlter = 0; }
                    }

                    if (montoAlter != 0.00 || montoBase != 0.00) {
                        cade_pagar += ("|" + e.CODIGO + "," + e.DOCUMENTO.NUMERO + "," + montoBase + "," + montoAlter + ",N");
                    }
                }

                cade_pagar += "," + e.ITEM_DETALLE;

            });
            
            
            var p_empresa = $("#slcEmpresa").val();
            var p_user = $("#ctl00_txtus").val();
            //var p_caja = "";         
            var p_caja = $("#cbo_Det_Origen").val(); // origen
            var cod_ape = "";
            var p_moneda = $("#cbo_moneda").val();
            var medio_pa = $("#cboMedioPago").val();
            var p_fecha_pago = $("#txtFechaPago").val();
            var p_destino = $("#cbDestino :selected").html();
            var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
            var p_flag = "1B";
            var adicional = "";


            var det_desc = "", pidm_cta = "", cta = "", compl = "";

            if (ind_tipo == "B") {


                pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
                cta = $("#cbo_Det_Origen").val();
                compl = "S";
                p_flag = 1;

                switch ($("#cboMedioPago").val()) {
                    case "0003": //transferencia

                        det_desc = "*TRANSFERENCIA/PAGO DETRACCION PROVEEDOR";

                        break;

                    case "0001": // DEPOSITO

                        det_desc = "*DEPOSITO/PAGO DETRACCION PROVEEDOR";

                        break;

                    case "0005": // tarjeta de debito

                        det_desc = $("#cboProveedores :selected").html() + "/" + $("#cbDestino :selected").html();

                        break;
                }
            } else if (ind_tipo == "C") {


                cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");

            }

            var descripcion = ind_tipo == "C" ? "*EFECTIVO/PAGO DETRACCION" : det_desc;

            /*
            if (depositos_Masivos) {

                $.ajaxSetup({ async: false });

                $.post("vistas/CP/ajax/CPMPGDT.ASHX", {
                    flag: "1.1",
                    empresa: p_empresa,
                    detalle: cade_pagar.substring(1),
                    origen: p_caja,
                    usuario: p_user,
                    codigo_apertura: cod_ape,
                    moneda: p_moneda,
                    medio_pago: medio_pa,
                    descripcion: descripcion,
                    fecha_pago: p_fecha_pago,
                    destino: p_destino,
                    documento: p_documento,
                    pidmcuenta: pidm_cta,
                    cuenta: cta,
                    completo: compl,
                    adicional: adicional,
                    nro_seq:ConsultaSgt(),
                    monto_total: $("#txtMonto").val().split(",").join(""),
                    tipo: ind_tipo == "C"?"CAJ":"BAN"
                },
                  function (res) {
                      if (res != null && res != "" && res.indexOf("error") < 0) {
                          
                          consultaDeudas();
                          json_selec = new Array();

                          $("#txtMonto").attr("placeholder", "max. " + (parseFloat($("#txtMonto").attr("placeholder").split("max. ")[1]) - parseFloat($("#txtMonto").val())).toFixed(2))

                          exito();

                          $("#txt_monto_base, #txt_monto_alt, #txtMonto").val("");
                          $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);

                          $("#form_medioPago").css("display", "block")

                          limpiaCampos(); eventOrigenBco = false;
                          eventOrigenCaj = false;

                      }
                      else {

                          noexito();
                      }
                  });
                $.ajaxSetup({ async: true });


                DepositosMasivos(new Date().getFullYear().toString().substring(2), ConsultaSgt(), $("#slcEmpresa :selected").attr("RUC"), $("#slcEmpresa :selected").text().split(".").join(""), $("#txtMonto").val().split(",").join(""), $("#cboMedioPago").val(), json_selec);


            } else {
                */

                $.ajaxSetup({ async: false });

                $.post("vistas/CP/ajax/CPMPGDT.ASHX", {
                    flag: p_flag,
                    empresa: p_empresa,
                    detalle: cade_pagar.substring(1),
                    origen: p_caja,
                    usuario: p_user,
                    codigo_apertura: cod_ape,
                    moneda: p_moneda,
                    medio_pago: medio_pa,
                    descripcion: descripcion,
                    fecha_pago: p_fecha_pago,
                    destino: p_destino,
                    documento: p_documento,
                    pidmcuenta: pidm_cta,
                    cuenta: cta,
                    completo: compl,
                    adicional: adicional,
                    monto_total: $("#txtMonto").val().split(",").join("")
                },
                  function (res) {
                      if (res != null && res != "" && res.indexOf("error") < 0) {
                     
                          consultaDeudas();
                          json_selec = new Array();

                          $("#txtMonto").attr("placeholder", "max. " + (parseFloat($("#txtMonto").attr("placeholder").split("max. ")[1]) - parseFloat($("#txtMonto").val())).toFixed(2))

                          exito();

                          $("#txt_monto_base, #txt_monto_alt, #txtMonto").val("");
                          $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);

                          $("#form_medioPago").css("display", "block")

                          limpiaCampos(); eventOrigenBco = false;
                          eventOrigenCaj = false;

                      }
                      else {

                          noexito();
                      }
                  });
                $.ajaxSetup({ async: true });

            //}
        }

    }

}

function completar() {


    $("#Mcbo_Det_Origen").val();
    $("#MtxtNroOpe").val();

    
    $.ajaxSetup({ async: false });

    $.post("vistas/CP/ajax/CPMPGDT.ASHX", {
        flag: "1.2",
        medio_pago: json_pCompletar.MEDIO_PAGO.CODIGO,
        codigo: json_pCompletar.CODIGO,
        fecha_pago: $("#MtxtFecha").val() , 
        usuario: $("#ctl00_txtus").val(),
        origen: $("#Mcbo_Det_Origen").val(),
        destino: json_pCompletar.DESTINO,
        documento: $("#MtxtNroOpe").val(),
        descripcion: "*PAGO DETRACCIONES LOTE",
        codigo_apertura: json_pCompletar.APERTURA_CODE,
        cuenta: json_pCompletar.CUENTA.CODIGO,
        pidmcuenta: json_pCompletar.CUENTA.PIDM,
        adicional: json_pCompletar.ADICIONAL,
        tipo: json_pCompletar.TIPO
    },
    function (res) {
        if (res == "OK" ) {
            $("#divConfirmacion").modal("hide");
            consultaDeudas2();
            json_pCompletar = null;
            exito();
        }
    });
    

}


StringMediosPago = "";

function cargaMediosDePago() {


    $.ajaxSetup({ async: false });
    $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: 2 },
      function (res) {
          if (res != null && res != "" && res.indexOf("error") < 0) {


              StringMediosPago = res;

          }

      });
    $.ajaxSetup({ async: true });



}

function ConsultaSgt() {
    var nro = "";

    $.ajaxSetup({ async: false });

    $.post("vistas/CP/ajax/CPMPGDT.ASHX", { flag: "1.4", empresa: $("#slcEmpresa").val() },
             function (datos) {
                 if (datos != "" && datos != null) {
                     nro = datos;
                 } 
             }).done(function () {

             });
    $.ajaxSetup({ async: true });
    return nro;

}

function DepositosMasivos(anho,lote,ruc,nempresa,monto,medio_pago,_json) {

    //var anho = new Date().getFullYear().toString().substring(2);
    //var lote = ConsultaSgt();
    //var ruc = $("#slcEmpresa :selected").attr("RUC");
    //var nempresa = $("#slcEmpresa :selected").text().split(".").join("");
    //var monto = $("#txtMonto").val().split(",").join("");
    //var medio_pago = $("#cboMedioPago").val();

    var titulo = "D" + ruc + anho + lote;       
    var monto_entero = monto.split(".")[0].split("").reverse().join("").concat("0".repeat(13 - monto.split(".")[0].length)).split("").reverse().join("");
    var monto_decimal = monto.split(".")[1] == undefined ? "00" : parseFloat(monto).toFixed(2).split(".")[1];
    var texto = new Array();
    
    

    /*cabecera*/

    texto.push("*");
    texto.push(ruc);
    if (nempresa.length > 35) {
        texto.push(nempresa.substring(0, 35));
    } else {
        texto.push(nempresa);
        for (var i = 0; i < 35 - nempresa.length; i++)
            texto.push(" ");

    }
    texto.push(anho);
    texto.push(lote);
    texto.push(monto_entero);
    texto.push(monto_decimal);
    texto.push("\r\n");

    /*fin cabecera*/

    if (medio_pago == "0003") { //transferencia
        
        /* cuerpo */

        for (var i = 0 ; i < _json.length; i++) {

            texto.push(_json[i].PROVEEDOR.DOCUMENTO);
            texto.push("000000000");
            texto.push(_json[i].DETRACCION_CODE_SUNAT);
            texto.push(_json[i].NRO_CTA_DETRACCION);

            var monto_1 = _json[i].MONTO;
            var monto_entero_1 = monto_1.split(".")[0].split("").reverse().join("").concat("0".repeat(13 - monto_1.split(".")[0].length)).split("").reverse().join("");
            var monto_decimal_1 = monto_1.split(".")[1] == undefined ? "00" : parseFloat(monto_1).toFixed(2).split(".")[1];

            texto.push(monto_entero_1);
            texto.push(monto_decimal_1);

            texto.push("01");//Venta de bienes, prestación de servicios o contratos de construcción gravados con el IGV.

            /*periodo tributario (fecha pago -momentaneo)*/
            var anho_1 = new Date().getFullYear().toString();

            texto.push(anho_1);

            var mes_1 = (new Date().getMonth() + 1) < 10 ? (new Date().getMonth() + 1).toString().concat("0").split("").reverse().join("") : (new Date().getMonth() + 1).toString();

            texto.push(mes_1);

            /**/
            texto.push("\r\n");

        }

        /* fin cuerpo */

    } else {
        /* cuerpo */

        for (var i = 0 ; i < _json.length; i++) {

            texto.push(_json[i].PROVEEDOR.DOCUMENTO);
           
            /*periodo tributario (fecha pago -momentaneo)*/
            var anho_1 = new Date().getFullYear().toString();

            texto.push(anho_1);

            var mes_1 = (new Date().getMonth() + 1) < 10 ? (new Date().getMonth() + 1).toString().concat("0").split("").reverse().join("") : (new Date().getMonth() + 1).toString();

            texto.push(mes_1);

            texto.push("000");
            /* */

            texto.push(_json[i].DETRACCION_CODE_SUNAT); //codigo d bien o servicio

            texto.push(_json[i].NRO_CTA_DETRACCION);
            
            var monto_1 = _json[i].MONTO;
            var monto_entero_1 = monto_1.split(".")[0].split("").reverse().join("").concat("0".repeat(13 - monto_1.split(".")[0].length)).split("").reverse().join("");
            var monto_decimal_1 = monto_1.split(".")[1] == undefined ? "00" : parseFloat(monto_1).toFixed(2).split(".")[1];

            texto.push(monto_entero_1);
            texto.push(monto_decimal_1);
            
            texto.push("01");//Venta de bienes, prestación de servicios o contratos de construcción gravados con el IGV.
            
            texto.push("\r\n");

        }

        /* fin cuerpo */

    }


    var archivo = new Blob(texto, { type: 'text/plain' });
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(archivo);
    a.download = titulo + ".txt";
    a.click();
}

function montoCajas(div) {
    
    $(div).append('<div id="divSaldoCaja" class="row-fluid det_saldos" style="display:none; padding-left: 1em; margin-bottom: 10px; width: 95%;  background-color: rgb(238, 238, 238);">' +
        '<div class="span6"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Rojo">S/.' +
        '</span><input readonly style="border-color: #9A0101;" class="m-wrap span9" id="txtMontoDisponibleMOBA" type="text">' +
        '</div></div></div></div><div class="span5"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Azul">US$' +
        '</span><input class="m-wrap span9" readonly style="border-color: #2822BF;" id="txtMontoDisponibleMOAL" type="text"></div></div></div></div></div>');

}

function montoCtas(div) {

    $(div).append('<div id="divSaldoCtas" class="row-fluid det_saldos" style="display:none; padding-left: 1em; margin-bottom: 10px; width: 95%;  background-color: rgb(238, 238, 238);">' +
        '<div class="span9"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Rojo">S/.' +
        '</span><input readonly style="border-color: #9A0101;" class="m-wrap span9" id="txtMontoDisponibleCta" type="text">' +
        '</div></div></div></div></div></div>');

}

function montoCajasM(div) {

    $(div).append('<div id="divMSaldoCaja" class="row-fluid det_saldos" style="display:none; padding-left: 1em; margin-bottom: 10px; width: 95%;  background-color: rgb(238, 238, 238);">' +
        '<div class="span6"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Rojo">S/.' +
        '</span><input readonly style="border-color: #9A0101;" class="m-wrap span9" id="MtxtMontoDisponibleMOBA" type="text">' +
        '</div></div></div></div><div class="span5"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Azul">US$' +
        '</span><input class="m-wrap span9" readonly style="border-color: #2822BF;" id="MtxtMontoDisponibleMOAL" type="text"></div></div></div></div></div>');

}

function montoCtasM(div) {

    $(div).append('<div id="divMSaldoCtas" class="row-fluid det_saldos" style="display:none; padding-left: 1em; margin-bottom: 10px; width: 95%;  background-color: rgb(238, 238, 238);">' +
        '<div class="span9"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Rojo">S/.' +
        '</span><input readonly style="border-color: #9A0101;" class="m-wrap span9" id="MtxtMontoDisponibleCta" type="text">' +
        '</div></div></div></div></div></div>');

}

function limpiaCampos() {
    $("#cbDestino").html("<option></option>");
    $("#form_medioPago select").select2("val", "").change().attr("disabled", true);

    $("#form_medioPago input").attr("disabled", true);
    $("#cbo_OrigenPago").attr("disabled", false);
    $("#chkArchSunat").attr("disabled", false);
}

function contar_codigos(json,code) {
    
    d = 0;

    json.filter(function (a, b) { if (a.CODIGO == code) { d += 1; } });

    return d;
}

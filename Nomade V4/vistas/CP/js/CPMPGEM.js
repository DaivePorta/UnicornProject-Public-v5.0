var CPMPGEM = function () {
  
    var plugins = function () {
        $('#cboEmpleado').select2();
        $('#cbo_OrigenPago').select2();
        $('#cboCtaEmpresa').select2();
        $('#cboMedioPago').select2();
        $('#cbDestino, #cbo_Det_Origen, #cbo_moneda').select2();
        $("#txt_TC,#txtMonto").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })
        $("#txt_TC").keyup(function () { if ($(this).val() < 1 || $(this).val() > 10) $(this).val(""); });
    }

    var cargarCombos = function () {
        $.ajaxSetup({ async: false });
        $("#slcEmpresa").select2();
        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#cbDestino").select2();
                  $("#slcEmpresa").html(res).change(function () {

                      $("#cbo_moneda").attr("disabled", true);

                      filltxtproveedor();

                      $.ajaxSetup({ async: false });
                   
                      $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: "MO", empresa: $("#slcEmpresa").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_moneda")
                                    //.attr("disabled",false)
                                    .html(res)
                                    .change(function () {
                                        var val0r = $(this).val();
                                        var d = 0.00;
                      
                                    });

                                $("#txt_monto_base").attr("TIPO",$("#cbo_moneda option[tipo=MOBA]").val());
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

        $("#cboEmpleado").change(function () {
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
                    $("#cbo_Det_Origen").attr("data-placeholder", "CAJA").select2("val","").change();
                    $("#cbDestino").select2("val", "");

                    

                    $.ajaxSetup({ async: false });
                    $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val() },
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
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0001" && valorO != "0008" && valorO!="") $(j).remove(); });
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

                    $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco:"",moneda:"" },
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
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0006" && valorO != "0005" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);

                    break;

            }
        });

        $('#cboMedioPago').change(function () {

            var MedioActual = $(this).val();

            $("#txtNroOpe").removeClass("personas").attr("disabled", false);

            $("#cbDestino").val("").select2();

            $("#cbDestino").attr("disabled", false).off("change");

            $("#txtNroOpe").val("");
            offObjectEvents("txtNroOpe");

                switch (MedioActual) {

                    case "0001"://DEPOSITO BANCARIO

                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Nro. Op.");


                        $.ajaxSetup({ async: false });
                        $("#cbDestino").off("change");
                        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 6, empresapidm: $("#cboEmpleado").val(), banco:"",moneda:"" },
                          function (res) {
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#cbDestino").html(res).change(function () {

                                   
                                      var mone_code = $("#cbDestino :selected").attr("moneda");
                                      $("#cbo_moneda").select2("val", mone_code).change();

                               }

                                  );
                              } else {
                                  $("#cbDestino").html("<option></option>").change();
                              }

                          });
                        $.ajaxSetup({ async: true });


                        $("#cbDestino").attr("disabled", false).select2();
                        $("#cbo_moneda").attr("disabled", true);

                        $(".mPersona").css("display", "none");
                        offObjectEvents("txtNroOpe");
                        $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);
                        break;

                    case "0008": //EFECTIVO

                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Persona Recibe");


                        $("#cbDestino").html("<option>ENTREGA DIRECTA A EMPLEADO</option>").attr("disabled",true).select2();
                      
                        $(".mPersona").css("display", "block");

                      

                        $("#txtNroOpe").addClass("personas").attr("disabled", true);
                        cargarInputsPersona();
                        $("#txtNroOpe").val($("#cboEmpleado :selected").html()).keyup(); $($("#txtNroOpe").siblings("ul")).children().click();

                        $("#cbo_moneda").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);
                        break;

                    case "0003": //transferencia

                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Nro. Op.");
                      
                        

                        $.ajaxSetup({ async: false });
                        $("#cbDestino").off("change");
                        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#cboEmpleado").val() },
                          function (res) {
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#cbDestino").html(res).select2();
                              } else {
                                  $("#cbDestino").html("<option></option>").select2();
                              }

                          });
                        $.ajaxSetup({ async: true });
                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 6, banco: $("#cbo_Det_Origen :selected").attr("banco"), moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#cboEmpleado").val() },
                          function (res) {
                              if (res != null && res != "" < 0) {
                                  $("#cbDestino option").filter(function (e, j) { var valorO = $(j).val(); if (res.indexOf(valorO)>0) $(j).remove(); });
                                  if (res != "error") {
                                      $("#cbDestino").append(res.split("<option></option")[1]);
                                  }
                              } else {
                                  $("#cbDestino").html("<option></option>").change();
                              }

                          });
                        $.ajaxSetup({ async: true });

                     
                        $("#cbDestino").attr("disabled", false).change();
                        $("#cbo_moneda").attr("disabled", true);
                        $("#txtMonto").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false);

                        break;

                    case "0013": //cheques bancarios

                        $("#lbl_detalle3").html("N° Cheque");
                        $("#lbl_detalle4").html("Girado a");

                        $("#cbDestino").attr("disabled", false);
                        $.ajaxSetup({ async: false });
                        
                        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 8, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm") },
                          function (res) {
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#cbDestino").html(res).change(function () {
                                      $("#txtNroOpe").val($("#cbDestino :selected").attr("ngiradoa"));
                                      $("#txtNroOpe")
                                          .attr("valor", $("#cbDestino :selected").attr("giradoa"))
                                          ;
                                      $("#txtMonto")                                         
                                          .val($("#cbDestino :selected").attr("monto"))
                                          .change()  ;
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

                        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo:"0006" },
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

                        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0005" },
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

    var cargainicial=function() {
        montoCajas(".div_origen");
        montoCtas(".div_origen");
        $("#iconDetSaldo").click(function () {
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
       

        $('#txt_TC').change(function () {

            $("#txt_monto_base, #txt_monto_alt").val("");
            if (parseFloat($(this).val()) == 0) { $(this).val(""); }

        });
        
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
    }

    json_selec = new Array();

    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.selecChk', function () {
            
          
            var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas.fnGetData(pos);

            var moba = row.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "" ? parseFloat(row.MONTO_MONE_ALTER) * parseFloat($("#txt_TC").val()) : parseFloat(row.MONTO_MONE_BASE);//moneda base
            var moal = row.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "" ? parseFloat(row.MONTO_MONE_BASE) / parseFloat($("#txt_TC").val()) : parseFloat(row.MONTO_MONE_ALTER);//moneda alterna
            var valor_moba = parseFloat($("#txt_monto_base").attr("monto") == "" ? 0 : $("#txt_monto_base").attr("monto"));
            var valor_moal = parseFloat($("#txt_monto_alt").attr("monto") == "" ? 0 : $("#txt_monto_alt").attr("monto"));

                


            if ($(this).is(":checked")) {

                $(this).parent().parent().addClass('selected');

                valor_moba += moba;
                valor_moal += moal;
                json_selec.push(row);

            } else {

                $(this).parent().parent().removeClass('selected');

                valor_moba -= moba;
                valor_moal -= moal;
                json_selec.filter(function (e,f) {
                    if (e == row) { json_selec.splice(f,1); }
                });
                
            }

            $("#txt_monto_base")
                .val("S/." + formatoMiles(valor_moba))
                .attr("monto", valor_moba.toFixed(2));
            $("#txt_monto_alt")
                .val("US$." + formatoMiles(valor_moal))
                .attr("monto", valor_moal.toFixed(2));
        });


        $('#tblBandeja tbody').on('click', '.detDoc', function () {

            var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas.fnGetData(pos);
           
            var id = row.CODIGO;
            var nTr = $(this).parents('tr')[0];

            if (oTableDeudas.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTableDeudas.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTableDeudas.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                oTableDeudas.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
                Bloquear("ventana");
                $.ajax({
                    type: "POST",
                    url: "vistas/cp/ajax/CPMPGEM.ashx?flag=4.5&factura=" + id,
                    async: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        var str = "";
                        var resb="";
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb);}
                        else {
                            resb += "<table id='tblBandejaDetalleF"+id+"' class='display DTTT_selectable' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>FECHA</th>";
                            resb += "<th>ORIGEN</th>";
                            resb += "<th>DESTINO</th>";
                            resb += "<th>FORMA PAGO</th>";
                            resb += "<th>DOCUMENTO / EMPLEADO</th>";
                            resb += "<th>MONTO</th>";
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF"+id, $.parseJSON(datos));
                        }

                       
                    }
                });

            }

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

$("#btnCtc").click(function () {
    if (vErrors(["txt_TC"]))
        consultaDeudas();
});
$("#txt_TC").keypress(function (e) {
    if (e.keyCode == 13) {
        if (vErrors(["txt_TC"]))
            consultaDeudas();
    }
});


//function filltxtproveedor() {
//    $.ajax({
//        type: "post",
//        url: "vistas/CP/ajax/CPMPGEM.ashx?flag=3&empresa=" + $('#slcEmpresa').val(),
//        async: false,
//        success: function (datos) {
//            if (datos != null) {

//                $('#cboEmpleado').empty();


//                $('#cboEmpleado').html(datos).select2("val","").change();


             

//            } 
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });

    
    var filltxtproveedor = function () {
        $.ajax({
            type: "post",
            url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=&ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                if (datos != null) {
                    $('#cboEmpleado').append('<option  value =""></option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '" val_scsl_code ="' + datos[i].SCSL_CODE + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboEmpleado').select2('val', '').change();
                } else {
                    $('#cboEmpleado').select2('val', ''),change();
                }
            },
            error: function (msg) {
                alertCustom("Empleados no se listaron correctamente");
            }
        });
    };









function consultaDeudas() {
    if ($("#cboEmpleado").val() != "") {
        Bloquear("div_body");
        $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 4, empresa: $("#slcEmpresa").val(), empleado: $('#cboEmpleado').val() == null ? 0 : $('#cboEmpleado').val() },
              function (datos) {
                  if (datos != "" && datos != null) {
                      var json = $.parseJSON(datos);
                      if (json.length > 0) {
                          llenarTablaDeudas(json);
                          if ($("#auxiliar").val() == "") {
                              $("#auxiliar").val(json[0].VALOR_CAMBIO_DCTO);
                              $("#txt_TC").val(json[0].VALOR_CAMBIO_DCTO);
                          }
                      } else {
                          llenarTablaDeudas(null);
                      }
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
    $(".monto_sele").attr("monto", "0");
    $(".monto_sele").val("").change();
}

function cargatablavacia() {

    oTableDeudas = $('#tblBandeja').dataTable({
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
                data: "DOCUMENTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },

            {
                data: { _: "FECHA_EMISION.display", sort: "FECHA_EMISION.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                   
                }
            },
             {
                 data: "DESCRIPCION",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
            {
                data: "MONTO_MONE_BASE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'N' && $("#txt_TC").val()!="") {
                        valor = parseFloat(rowData.MONTO_MONE_ALTER) * parseFloat($("#txt_TC").val());
                    }
                    $(td).html(formatoMiles(valor));
                }
            },

            {
                data: "MONTO_MONE_ALTER",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'S' && $("#txt_TC").val()!="") {
                        valor = parseFloat(rowData.MONTO_MONE_BASE) / parseFloat($("#txt_TC").val());
                    }
                    $(td).html(formatoMiles(valor));
                }
            },

            {
                data: null,
                defaultContent: '  <input type="checkbox" class="selecChk" />',
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                }
            }


        ],
        "scrollY": "280px","scrollCollapse": false, "paging": false,
        "order":[2,'asc'],

        info: false
        
    });

    $('.display.DTTT_selectable.dataTable.no-footer').removeAttr('style');
   // $('#tblBandeja_filter').css('display', 'none');
    

    $('.display.DTTT_selectable.dataTable.no-footer').removeAttr('style');
    // $('#tblBandeja_filter').css('display', 'none');
    $($("#tblBandeja_wrapper div.span6")[0]).html('<button type="button" class="btn green refreshData"><i class="icon-refresh"></i></button>');

    $(".refreshData").click(function () { consultaDeudas(); });



}

function cargatablavaciaDetalleF(id,json) {

    oTableDeudasDetalle = iniciaTabla(id, {
        data: json,
        columns: [
            {
                data: { _: "FECHA.display", sort: "FECHA.order" },
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');

                }
            },
             {
                 data: "ORIGEN",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
             {
                 data: "DESTINO",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
             {
                 data: "FORMA_PAGO",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },
            


            {
                data: "DOCUMENTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
            },
       

            {
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;                        
                    $(td).html(rowData.SIMBOLO_MONEDA + formatoMiles(valor));
                }
            }


        ],
        "paging": false,
        scrollCollapse: true,
  //  sort: false,
    "sDom": "t"

    });
   

}

function llenarTablaDeudas(json) {

 
    oTableDeudas.fnClearTable()

    if(json!=null)
    oTableDeudas.fnAddData(json);

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

            if (parseFloat($("#txtMonto").attr("monto")) >
           ($(".moneda.activo :selected").attr("tipo") == "MOBA" ?
           parseFloat($("#txt_monto_base").attr("monto")) :
           parseFloat($("#txt_monto_alt").attr("monto")))) {

                alertCustom("El monto ingresado es mayor al que se ha seleccionado a pagar!");

            } else {


                var json_ordenado = json_selec.sort(function (a, b) {
                    return a.FECHA_EMISION.order - b.FECHA_EMISION.order
                });

                var monto = parseFloat($("#txtMonto").val().split(",").join(""));

                var ind = false;

                var ind_tipo = $("#cbo_OrigenPago").val().substring(0, 1);


                

                    json_ordenado.filter(function (e) {

                        var monto_pb = "";
                        var monto_pp = "";
                        var monto_pa = "";
                        var moneda;


                        if ($("#cbo_moneda :selected").attr("tipo") == "MOBA") {

                            monto_pb = parseFloat(e.MONTO_MONE_BASE).toFixed(2);
                            monto_pp = parseFloat(monto_pb);


                        } else {

                            monto_pa = parseFloat(e.MONTO_MONE_ALTER).toFixed(2);
                            monto_pp = parseFloat(monto_pa);


                        }

                        monto -= monto_pp;



                        if (monto >= 0) {

                            cade_pagar += ("|" + e.CODIGO + "," + e.DOCUMENTO + "," + (monto_pb == "" ? 0 : monto_pb) + "," + (monto_pa == "" ? 0 : monto_pa) + ",S");
                        }
                        else {
                            monto_pp += monto;
                            if (monto_pb != "") {
                                if (!ind) { monto_pb = monto_pp.toFixed(2); ind |= 1; }
                                else { monto_pb = 0; }
                            } else {
                                if (!ind) { monto_pa = monto_pp.toFixed(2); ind |= 1; }
                                else { monto_pa = 0; }
                            }
                            monto_pb = monto_pb == "" ? 0 : monto_pb;
                            monto_pa = monto_pa == "" ? 0 : monto_pa;
                            if (monto_pa != 0 || monto_pb != 0) {
                                cade_pagar += ("|" + e.CODIGO + "," + e.DOCUMENTO + "," + (monto_pb == "" ? 0 : monto_pb) + "," + (monto_pa == "" ? 0 : monto_pa) + ",N");
                            }
                        }
                
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
                    var p_flag = 1;
                    var adicional = "";
                    var tipo_cambio = $("#txt_TC").val();
                    var scsl_actual = $("#cboEmpleado :selected").attr("val_scsl_code");


                    var det_desc = "", pidm_cta = "", cta = "", compl = "";

                    if (ind_tipo == "B") {


                        pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
                        cta = $("#cbo_Det_Origen").val();
                        compl = "S";
                        p_flag = 1.5;

                        switch ($("#cboMedioPago").val()) {
                            case "0003": //transferencia

                                det_desc = "*" + $("#cboEmpleado :selected").html();

                                break;

                            case "0013": //cheques bancarios

                                det_desc = "CHEQ.PAGADOR N°:" + $("#cbDestino").val();
                                adicional = $("#cbDestino").val() + "|" + $("#cbDestino :selected").attr("tipo");
                                compl = "N";
                                p_documento = "";

                                break;

                            case "0006": //tarjeta de credito

                                det_desc = $("#cboEmpleado :selected").html() + "/" + $("#cbDestino :selected").html();

                                break;

                            case "0005": // tarjeta de debito

                                det_desc = $("#cboEmpleado :selected").html() + "/" + $("#cbDestino :selected").html();

                                break;
                        }
                    } else if (ind_tipo == "C") {



                        cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");

                    }

                    var descripcion = ind_tipo == "C" ? "PAGO A EMPLEADO" : det_desc;
               

                $.ajaxSetup({ async: false });

                $.post("vistas/CP/ajax/CPMPGEM.ASHX", {
                    flag: p_flag,
                    empresa: p_empresa,
                    detalle: cade_pagar.substring(1),
                    caja: p_caja,
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
                    monto_total: $("#txtMonto").val().split(",").join(""),
                    tipo_cambio: tipo_cambio,
                    scsl_actual: scsl_actual
                },
                  function (res) {
                      if (res != null && res != "" && res.indexOf("error") < 0) {
                          //filltxtproveedor();
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
            }

        }
        
}


StringMediosPago = "";

function cargaMediosDePago() {


    $.ajaxSetup({ async: false });
    $.post("vistas/CP/ajax/CPMPGEM.ASHX", { flag: 2 },
      function (res) {
          if (res != null && res != "" && res.indexOf("error") < 0) {

            
              StringMediosPago = res;

          }

      });
    $.ajaxSetup({ async: true });



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

function limpiaCampos() {
    $("#cbDestino").html("<option></option>");
    $("#form_medioPago select").select2("val", "").change().attr("disabled", true);

    $("#form_medioPago input").attr("disabled", true);
    $("#cbo_OrigenPago").attr("disabled", false);

}

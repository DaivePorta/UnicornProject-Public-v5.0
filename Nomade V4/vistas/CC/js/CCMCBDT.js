obj = null;
errorSaldoInsuf = false;
indCargaInicial = false;
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE
var CCMCBDT = function () {
    var cargarCombos = function () {
        $.ajaxSetup({ async: false });
        $("#slcEmpresa").select2();
        $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#cbDestino").select2();
                  $("#slcEmpresa").html(res).change(function () {

                      $("#cbo_moneda").attr("disabled", true);

                      $("#inputRazsocial").html("");
                      $("#inputRazsocial").html(`<input id="txtrazsocial" class="span11" type="text" data-provide="typeahead" placeholder="TODOS"/>`);
                      filltxtrazsocial('#txtrazsocial', '');
                      $("#hfPIDM").val("");

                      $.ajaxSetup({ async: false });

                      $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: "MO", empresa: $("#slcEmpresa").val() },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_moneda")
                                   // .attr("disabled", false)
                                    .html(res);

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


     event_moneda = false;

    var plugins = function () {

        $('#cbo_OrigenPago').select2();
        $('#cboMedioPago').select2();
        $('#cbDestino, #cbo_Det_Origen, #cbo_moneda').select2();
        $('#txtFechaPago').datepicker();
        $('#txtFechaPago').inputmask("date",
        {
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            }
        });

        $('#txtFechaPago').datepicker("setDate", new Date()).datepicker('update');
        $('#cboAutoDetra').select2(); //DPORTA 25/02/2021
    }

    var datatable = function () {

        
        var parms = {
            data: null,
            columns: [

                { data: "CODIGO" },
                {data:"TIPO_DOC"},
                { data: "DOCUMENTO.NUMERO" },
                {
                    data: "MONTO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right').html(rowData.MONEDA.SIMBOLO + formatoMiles(cellData));

                    }
                },
                {
                    data: { _: "FECHA_EMISION_DCTO.display", sort: "FECHA_EMISION_DCTO.order" }, createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }   
                },
                { data: "AUTODETRACCION" }, //DPORTA 25/02/2021
                { data: "DOCUMENTO.RUC" },
                { data: "CLIENTE.NOMBRE" },
                {
                    data: null,
                    defaultContent: '  <button type="button" style="padding: 4px 10px;!important" class="btn blue btncobrar"><i class="icon-legal"></i> Cobrar</button>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }

            ],
            "paging": false,
            scrollCollapse: true,
            order: [[0, 'DESC']],
            footerCallback: function (row, data, start, end, display) {
                if (data.length > 0) {
                    //$("#txtTC").val(data[0].VALOR_CAMBIO_DCTO);
                    let oDetracciones = data.filter(function (obj) { return obj.NOMBRE === "DETRACCION"; });

                    var oArrayDetracciones = new Array();

                    oDetracciones.filter(function (obj) {
                        oArrayDetracciones.push(parseFloat(obj.MONTO));
                    });
                    
                    if (oArrayDetracciones.length != 0) {
                        var nDetracciones = oArrayDetracciones.reduce(function (a, b) { return a + b; });
                    } else {
                        var nDetracciones = 0;
                    }

                    $("#TotalDetra").text("S/." + formatoMiles(nDetracciones));
                }
            }
        }

        oTable = iniciaTabla('tblBandeja', parms);


        $('#tblBandeja').removeAttr('style').attr("style", "border-collapse: collapse;");

        $($("#tblBandeja_wrapper div.span6")[0]).html(`<button class="btn green" id="btnLibroXls" type="button" style="padding: 2px 10px; margin-left:10px;">
                                                            <i class="fa fa-file-excel-o"></i>&nbsp;Exportar a Excel</button>`);
       
        $("#tblBandeja_info").css("display", "none");

        //$(".refreshData").click(function () { consultaDeudas(); });
        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblBandeja", "COBRO DETRACCIONES " + new Date().format("dd.MM.yyyy"));
        });
    }

    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.btncobrar', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            CrearPago(row);
            obj = $(this).parent().parent();

        });

    }

    eventOrigenBco = false;
    eventOrigenCaj = false;

    var funcionalidad = function () {

        montoCajas(".div_origen");
        montoCtas(".div_origen");
        montoCtas2(".div_destino");
        $("#iconDetSaldo").click(function () {
            if ($(this).hasClass("icon-circle-arrow-down")) {
                $(".det_saldos.activo").slideDown();
                $(this).removeClass("icon-circle-arrow-down").addClass("icon-circle-arrow-up");
            } else {
                $(".det_saldos.activo").slideUp();
                $(this).removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
            }
        });

        $("#iconDetSaldo2").click(function () {
            if ($(this).hasClass("icon-circle-arrow-down")) {
                $(".det_saldos2.activo").slideDown();
                $(this).removeClass("icon-circle-arrow-down").addClass("icon-circle-arrow-up");
            } else {
                $(".det_saldos2.activo").slideUp();
                $(this).removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
            }
        });

        $("#txtMonto").change(function () {

            var tipo = $("#cbo_moneda").val();
            var valor_ = parseFloat($(".monto_sele[tipo = " + tipo + "]").attr("monto"));
           // var valor_2 = $(this).attr("placeholder").split("max. ")[1]; 


            if (parseFloat($(this).val()) < valor_) {

                $(this).val("");
                infoCustom2("No dispone del saldo suficiente en la " + $("#lbl_detalle1").html() + "  para realizar el pago!");
                $("#s2id_cbo_Det_Origen").pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
                errorSaldoInsuf |= 1;
            }
          

                $(this).val(formatoMiles($(this).val()))
                    .attr("monto", $(this).val());
        });

        $('#btn_filtrar').on('click', function () { //DPORTA 25/02/2021
            consultaDeudas();  
        });

        function cargarJson() {
            $.ajax({ 
                type: "post",
                url: "vistas/GL/ajax/GLMLETR.ashx?flag=L-2",
                contenttype: "application/json;",
                datatype: "json",
                async: false,

                success: function (datos) {
                    if (datos != null && datos != "") {

                        jsonPersonas = JSON.parse(datos);

                    }
                }
            });
        }

        $('#cbo_OrigenPago').change(function () {
            /*conf inicial mostrar detalle de saldos*/
            $(".det_saldos").css("display", "none");
            $("#iconDetSaldo").removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");

            /**/
            var OrigenActual = $(this).val();

            if (OrigenActual != "") {

                $("#lbl_detalle3").html("-");
                $("#lbl_detalle4").html("-");
                $("#cboMedioPago").val("").change();
                $("#cbo_moneda").val("").change();

                switch (OrigenActual) {
                  
                    case "Banco":
                        $("#divSaldoCaja").removeClass("activo");
                        $("#divSaldoCtas").addClass("activo");
                        $("#divSaldoCtas2").addClass("activo");

                        $(".mPersona").css("display", "none");
                        $("#cbDestino").off("change");

                        $("#lbl_detalle1").html("Cuenta Bancaria");
                        $("#cbo_moneda").attr("disabled", true);
                        $("#cbDestino").html("<option></option>").select2("val", "");

                        //CargarCuentas Origen
                        $("#cbo_Det_Origen").val("").change().attr("data-placeholder", "CUENTA BANCARIA").select2();

                        $.ajaxSetup({ async: false });

                        $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: objData.MONEDA.CODIGO },
                          function (res) {
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {

                                      if ($('#cbo_OrigenPago').val() == "Banco") {

                                          /**

                                          if (!eventOrigenBco)
                                              $("#iconDetSaldo").click();

                                          **/

                                          eventOrigenBco |= 1;
                                          $("#cboMedioPago").change();
                                          var mone_code = $("#cbo_Det_Origen :selected").attr("moneda");
                                          $("#cbo_moneda").select2("val", mone_code);
                                          $("#txtMonto").val($("#cbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto")).change();
                                          if (errorSaldoInsuf) { $(this).select2("val", ""); $("#cbo_moneda").select2("val", ""); errorSaldoInsuf &= 0; }

                                          $("#txtMontoDisponibleCta").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto")));
                                          if (mone_code == "0002") {//soles
                                              $($("#txtMontoDisponibleCta").siblings("span")).addClass("Rojo").removeClass("Azul").html("S/.")

                                          } else {//dolares
                                              $($("#txtMontoDisponibleCta").siblings("span")).addClass("Azul").removeClass("Rojo").html("US$.")
                                          }
                                          $("#txtMontoDisponibleCta").css("border-color", $($("#txtMontoDisponibleCta").siblings("span")).css("border-color"));

                                      }

                                  } );
                              } else {
                                  $("#cbo_Det_Origen").html("<option></option>").change();
                              }

                          });
                        $.ajaxSetup({ async: true });


                        $("#cboMedioPago").html(StringMediosPago);

                        if (objData.AUTODETRACCION === "AUTODETRACCIÓN")
                            $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0001" && valorO != "") $(j).remove(); });
                        else
                            $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0001" && valorO != "") $(j).remove(); });

                        $("#cboMedioPago").attr("disabled", false);

                        break;

                }
            }
        });


        $('#cboMedioPago').change(function () {

            var MedioActual = $(this).val();

            if (MedioActual != null) {

                $("#txtNroOpe").removeClass("personas").attr("disabled", false);

                $("#cbDestino").val("").select2();

                $("#cbDestino").attr("disabled", false).off("change");

                $("#txtNroOpe").val("");

                switch (MedioActual) {

                    case "0001"://DEPOSITO BANCARIO

                        $("#lbl_detalle3").html("Origen de Pago");
                        $("#lbl_detalle4").html("Nro. Op.");

                        $("#cbDestino").html("<option>DEPOSITO DIRECTO VENTANILLA</option>").attr("disabled", true).select2();

                        //$(".mPersona").css("display", "block");

                        $(".mPersona").css("display", "none");
                        offObjectEvents("txtNroOpe");
                        $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);
                        break;

                    case "0008": //EFECTIVO

                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Persona Recibe");


                        $("#cbDestino").html("<option>ENTREGA DIRECTA A BENEFICIARIO</option>").attr("disabled", true).select2();

                        $(".mPersona").css("display", "block");



                        $("#txtNroOpe").addClass("personas").attr("disabled", false);
                        cargarInputsPersona();
                        $("#txtNroOpe").val(persona_selec_nombre).keyup(); $($("#txtNroOpe").siblings("ul")).children().click();

                        $("#cbo_moneda").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);
                        break;

                    case "0003": //transferencia

                        $("#lbl_detalle3").html("Cuenta de Pago");
                        $("#lbl_detalle4").html("Nro. Op.");

                        if (objData.TIPO_GASTO_COD == "0700" || objData.TIPO_GASTO_COD == "0200") { //SERVICIO O ALQUILER

                            $("#cbDestino").html("<option></option><option value=0>" + objData.CLIENTE.NOMBRE + "</option>").select2("val", "0").change().attr("disabled", true);
                        }
                        else {



                            if (objData.AUTODETRACCION !== "AUTODETRACCIÓN") {
                                $.ajaxSetup({ async: false });
                                $("#cbDestino").off("change");
                                $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: objData.CLIENTE.CODIGO, quitarCtaDetraccion: "S", esCliente: "S" },
                                    function (res) {
                                        if (res != null && res != "" && res.indexOf("error") < 0) {
                                            $("#cbDestino").html(res).select2();
                                        } else {
                                            $("#cbDestino").html("<option></option>").select2();
                                        }

                                    });
                                $.ajaxSetup({ async: true });


                                //$.ajaxSetup({ async: false });
                                //$.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 6, banco: $("#cbo_Det_Origen :selected").attr("banco"), moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: objData.CLIENTE.CODIGO, quitarCtaDetraccion: "S" },
                                //    function (res) {
                                //        if (res != null && res != "") {
                                //            $("#cbDestino option").filter(function (e, j) { var valorO = $(j).val(); if (res.indexOf(valorO) > 0) $(j).remove(); });
                                //            if (res != "error") {
                                //                $("#cbDestino").append(res.split("<option></option")[1]);
                                //            }
                                //        } else {
                                //            $("#cbDestino").html("<option></option>").change();
                                //        }
                                //    });
                                //$.ajaxSetup({ async: true });

                            } else {
                                $.ajaxSetup({ async: false });
                                $("#cbDestino").off("change");
                                $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 6.6, moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#slcEmpresa :selected").attr("pidm"), quitarCtaDetraccion: "S" },
                                    function (res) {
                                        if (res != null && res != "" && res.indexOf("error") < 0) {
                                            $("#cbDestino").html(res).select2();
                                        } else {
                                            $("#cbDestino").html("<option></option>").select2();
                                        }
                                        $('#cbDestino').change(function () { calcularMontoCtas2(); });
                                    });
                                $.ajaxSetup({ async: true });
                            }



                            $("#cbDestino").attr("disabled", false).change();

                        }
                        $("#cbo_moneda").attr("disabled", true);
                        $("#txtMonto").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false);
                        break;

                    case "0013": //cheques bancarios

                        $("#lbl_detalle3").html("N° Cheque");
                        $("#lbl_detalle4").html("Girado a");

                        $("#cbDestino").attr("disabled", false);
                        $.ajaxSetup({ async: false });

                        $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 8, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm") },
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

                        $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0006" },
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

                        $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0005" },
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

    return {
        init: function () {
            cargarParametrosSistema();
            cargarCombos();
            datatable();
            funcionalidadTabla();
            funcionalidad();
           
            plugins();
            //consultaDeudas();
           
            btnBuscaPersonas();
        }
    };
}();

function cargarParametrosSistema() {
    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                prmtACON = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro ACON!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro ACON!");
        }
    });

}
function filltxtrazsocial(v_ID, v_value) {

    var selectRazonSocial = $(v_ID);
    //Proveedores
    $.ajax({
        type: "post",
        //url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2&p_CTLG_CODE=" + $("#slcEmpresa").val(),
        url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2.5&p_CTLG_CODE=" + $("#slcEmpresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                persona = datos;
                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            obj += '{';
                            //obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
                            obj += '"PIDM":"' + datos[i].PIDM + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '"';
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
                        $("#hfPIDM").val("");
                        $("#hfPIDM").val(map[item].PIDM);
                        $("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                        return item;
                    },

                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($("#txtrazsocial").val().length <= 0) {
                        $(this).attr("placeholder", "TODOS");
                        //$("#txtRuc").val("");
                        $("#hfPIDM").val("");
                    }
                });

            } else {
                persona = [];
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

$(".btnexit").click(function () {

    obj.removeClass('selected');
    objData = null;
});

$("#btnGrabar").click(function () {

    pagar();

});

var persona_selec_nombre = [];
objData = null;
function CrearPago(data) {
   
    objData = data;
   // $("#PgDvDesc").html(CapFirsLetter(data.DESCRIPCION))
    $("#simbMone")
        .html(data.MONEDA.SIMBOLO);
   
    $("#txtMontoAPagar")
        .val(formatoMiles(data.MONTO))
        .attr("tipo", "0003")
        .addClass("monto_sele")
        .attr("monto", data.MONTO);
    $("#modalPagar")
        .modal("show")
        .draggable({ handle: "modal-header" })
        .modal({ backdrop: "static", keyboard: false });
   
    $("#modalPagar select").select2("val", "");

    $("#iconDetSaldo2").css("display", "inline");;
    $(".det_saldos2").css("display", "none");;
    $("#iconDetSaldo2").removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
    calcularMontoCtas2();
    if (data.AUTODETRACCION !== "AUTODETRACCIÓN") {
        $("#iconDetSaldo2").css("display", "none");;
    }

    persona_selec_nombre = data.CLIENTE.NOMBRE;
    limpiaCampos();
}


function pagar() {
    if (!vErrorBodyAnyElement(".obligatorio")){
        var cade_pagar = "";

        var montoBase = objData.ES_MONEDA_BASE ? objData.MONTO : 0.00;
        var montoAlter = objData.ES_MONEDA_BASE ? 0.00 : objData.MONTO;
        cade_pagar += ("|" + objData.CODIGO + "," + objData.DOCUMENTO.NUMERO + "," + montoBase + "," + montoAlter + ",S");

    var ind = false;

    var ind_tipo = $("#cbo_OrigenPago").val().substring(0, 1);

    var p_empresa = $("#slcEmpresa").val();
    var p_user = $("#ctl00_txtus").val();
    //var p_caja = "";         
    var p_caja = $("#cbo_Det_Origen").val(); // origen
    var cod_ape = "";
    var p_moneda = $("#cbo_moneda").val();
    var medio_pa = $("#cboMedioPago").val();
    var p_fecha_pago = $("#txtFechaPago").val();
    var p_destino = $("#cbo_Det_Origen").val();
    var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
    var p_flag = 1;
    var adicional = "";
        var p_origen = $("#cbDestino :selected").html();
        var p_origen_pidm = "";
        var p_origen_codigo_banco = "";

        if (medio_pa === "0003")
        {
            p_origen_pidm = $("#cbDestino :selected").attr("pidm");
            p_origen_codigo_banco = $("#cbDestino").val();
        }


    var det_desc = "", pidm_cta = "", cta = "", compl = "";

    if (ind_tipo == "B") {


        pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
        cta = $("#cbo_Det_Origen").val();
        compl = "S";
    
        switch ($("#cboMedioPago").val()) {
            case "0003": //transferencia

                det_desc = "TRANSFERENCIA DETRACCION*" + "/" + objData.CLIENTE.NOMBRE;

                break;

      

            case "0001": // DEPOSITO

                //det_desc = "*a/DEPOSITO";
                det_desc = "DEPOSITO DETRACCION*" + "/" +  objData.CLIENTE.NOMBRE;

                break;
        }
    }

    var descripcion = det_desc;


    $.ajax({
        type: "post",
        url: "vistas/CC/ajax/CCMCBDT.ASHX",
        data: {
            flag: 1, //"prueba",
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
            monto_total: objData.MONTO,
            origen: p_origen,
            origen_pidm: p_origen_pidm,
            origen_codigo_banco: p_origen_codigo_banco,
            asiento_contable: prmtACON
        },
        contenttype: "application/json;",
        datatype: "json",
        beforeSend: function () { Bloquear($("#ventana"), "Grabando Datos"); },
        async: true,
        success: function (res) {
            if (res != null && res != "" && res.indexOf("error") < 0) {
                switch (res) {

                    case "NA": // Uno de los documentos no puede ser amortizado por el monto indicado
                        alertCustom("Uno de los documentos ya ha sido amortizado!");
                        break;
                    case "NG": // El monto usable de la nota de credito generica es 0
                        alertCustom("La nota de crédito genérica seleccionada no posee monto usable! ");
                        break;
                    case "NC": // El monto usable de la nota de credito es 0
                        alertCustom("La nota de crédito seleccionada no posee monto usable!");
                        break;
                    case "SI": // Saldo insuficiente caja/banco
                        alertCustom("No posee saldo suficiente en la " + ($("#cbo_OrigenPago").val().substring(0, 1) === "B" ? "cuenta" : "caja") + " seleccionada!");
                        break;
                    case "TC": // Transaccion realizada correctamente                             
                        consultaDeudas();
                        json_selec = new Array();

                        exito();

                        $("#txt_monto_base, #txt_monto_alt, #txtMonto").val("");
                        $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);

                        $("#modalPagar")
                          .modal("hide");
                        limpiaCampos(); eventOrigenBco = false;
                        eventOrigenCaj = false;
                        break;
                }
            }
            else {

                noexito();
            }
        },
        complete: function () {
            Desbloquear($("#ventana"))
        }
    });


    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }
}

function CapFirsLetter(frase) {
    var d = new Array();
    frase.toLowerCase().split(" ").filter(function (e) { d.push(e.substring(0, 1).toUpperCase() + e.substring(1)) });
    return d.join(" ");

}

function cargaMediosDePago() {


    $.ajaxSetup({ async: false });
    $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 2 },
      function (res) {
          if (res != null && res != "" && res.indexOf("error") < 0) {


              StringMediosPago = res;

          }

      });
    $.ajaxSetup({ async: true });



}



function limpiaCampos() {
    $("#cbDestino").html("<option></option>");
    $("#mensajemodal select").select2("val", "").change().attr("disabled", true);
    
    $("#mensajemodal input").attr("disabled", true);
    $("#cbo_OrigenPago").attr("disabled", false);
    $('#cbo_OrigenPago').val("Banco").change().attr("disabled", true);
}

function consultaDeudas() {
    var pidm = $("#hfPIDM").val();
    $.post("vistas/CC/ajax/CCMCBDT.ASHX", { flag: 4, empresa: $("#slcEmpresa").val(), cliente: $("#hfPIDM").val(), estado: $("#cboAutoDetra").val()}, //DPORTA 25/02/2021
    function (datos) {
        if (datos != "" && datos != null) {
            var json = $.parseJSON(datos);
            llenarTablaDeudas(json);
                 
        } else {
            llenarTablaDeudas(null);
        }
    });
}



function llenarTablaDeudas(json) {


    oTable.fnClearTable();
    

    if (json != null) {
        oTable.fnAddData(json);
        if (!indCargaInicial) {
            oTable.fnAdjustColumnSizing();
            indCargaInicial |= 1;
        }
    }

}

function nuevapersona() {

    window.open('?f=ncmpers', '_blank');

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

function montoCtas2(div) {

    $(div).append('<div id="divSaldoCtas2" class="row-fluid det_saldos2" style="display:none; padding-left: 1em; margin-bottom: 10px; width: 95%;  background-color: rgb(238, 238, 238);">' +
        '<div class="span9"><div class="control-group"><div class="controls"><div class="input-prepend">' +
        '<span class="add-on Rojo">S/.' +
        '</span><input readonly style="border-color: #9A0101;" class="m-wrap span9" id="txtMontoDisponibleCta2" type="text">' +
        '</div></div></div></div></div></div>');
}

function calcularMontoCtas2() {
    $("#txtMontoDisponibleCta2").val(formatoMiles($("#cbDestino :selected").attr("monto") == undefined ? "0" : $("#cbDestino :selected").attr("monto")));
    if ($("#cbDestino :selected").attr("moneda") == undefined) {//soles
        $($("#txtMontoDisponibleCta2").siblings("span")).addClass("Rojo").removeClass("Azul").html("S/.")
    } else if ($("#cbDestino :selected").attr("moneda") == "0002") {//soles
        $($("#txtMontoDisponibleCta2").siblings("span")).addClass("Rojo").removeClass("Azul").html("S/.")
    } else {//dolares
        $($("#txtMontoDisponibleCta2").siblings("span")).addClass("Azul").removeClass("Rojo").html("US$.")
    }
    $("#txtMontoDisponibleCta2").css("border-color", $($("#txtMontoDisponibleCta2").siblings("span")).css("border-color"));
}
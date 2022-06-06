obj = null;
errorSaldoInsuf = false;
indCargaInicial = false;

var CPLPGAF = function () {
    var cargarCombos = function () {
        $("#cboEmpresa, #cboAfp").select2();

        //cargaAfp
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMAFPP.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($($('#sclAfp').parents("div")[0]).attr("id")) },
            async: true,
            success: function (datos) {
                var cbo_afp = $('#cboAfp');
                cbo_afp.empty();
                cbo_afp.append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        cbo_afp.append('<option value="' + datos[i].PDIM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    cbo_afp.select2('val', '');
                } else {
                    cbo_afp.select2('val', '');
                }
            },
            complete: function () { Desbloquear($($('#cboAfp').parents("div")[0]).attr("id")); },
            error: function (msg) {
                alert(msg);
            }
        });

        //cargar Empresa      
       $.ajax({
               type: "post",
               url: "vistas/CP/ajax/CPMPGAF.ASHX?",
               data :  { flag: 5 },
               contenttype: "application/json;",
               datatype: "json",
               beforeSend: function () { Bloquear($($('#cboEmpresa').parents("div")[0]).attr("id")) },
               async: true,
               success:
                   function (res) {
                       if (res != null && res != "" && res.indexOf("error") < 0) {
                           $("#cboEmpresa").html(res);
                       }
                   },
               complete: function () { Desbloquear($($('#cboEmpresa').parents("div")[0]).attr("id")); },
               error: function (msg) {
                   alert(msg);
               }

          });

    }


    var datatable = function () {

        var parms = {
            data: null,
            columns: [
                {
                    data: "MES", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').html(rowData.ANIO + " - " + cellData);
                    }
                },
                { data: "DESCRIPCION" },
                {
                    data: "FECHA_PAGO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },

                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                    }
                },

                {
                    data: "INTERES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                    }
                },
                {data :"ORIGEN"},
                {
                    data: "CAJBANC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "NOPERACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                        $(td).html(cellData.substring(2));
                    }
                }
            ],
            "paging": false,
        }

        oTable = iniciaTabla('tblBandeja', parms);


        $("#tblBandeja_info").css("display", "none");

        $("#tblBandeja,#tblBandeja_wrapper").removeAttr('style').attr("style", "border-collapse: collapse;");

    

    }

    var eventos = function () {

        $.fn.dataTable.ext.search.push(
          function (settings, data, dataIndex) {
              var min = parseInt($('#minfecha').val().split("/").reverse().join(""), 10);
              var max = parseInt($('#maxfecha').val().split("/").reverse().join(""), 10);
              var age = parseInt(data[2].split("/").reverse().join("")) || 0; // use data for the age column

              if ((isNaN(min) && isNaN(max)) ||
                   (isNaN(min) && age <= max) ||
                   (min <= age && isNaN(max)) ||
                   (min <= age && age <= max)) {
                  return true;
              }
              return false;
          }
      );

        inifechas('minfecha', 'maxfecha');

        $(".fill").click(function () { cargaDatos(); oTable.api(true).draw(); });
    }

    function cargaDatos() {

        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGAF.ASHX?",
            data: { flag: "L",afp:$('#cboAfp').val(),empresa: $('#cboEmpresa').val()},
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($($('#tblBandeja').parents("div")[0]).attr("id")) },
            async: true,
            success:
                function (res) {
                    oTable.fnClearTable();
                    if (res != null && res != "" && res.indexOf("error") < 0) {                       
                        oTable.fnAddData(res);
                    }
                },
            complete: function () { Desbloquear($($('#tblBandeja').parents("div")[0]).attr("id")); },
            error: function (msg) {
                alert(msg);
            }

        });

    }

    
    return {
        init: function () {
            cargarCombos();
            datatable();
            eventos();
            
        }
    };

}();

var CPMPGAF = function () {
    var cargarCombos = function () {
        $.ajaxSetup({ async: false });
        $("#slcEmpresa").select2();
        $.post("vistas/CP/ajax/CPMPGAF.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#cbDestino").select2();
                  $("#slcEmpresa").html(res).change(function () {

                      $("#cbo_moneda").attr("disabled", true);
                      
                      $.ajaxSetup({ async: false });

                      $.post("vistas/CP/ajax/CPMPGAF.ASHX", { flag: "MO", empresa: $("#slcEmpresa").val() },
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
        $("#sclAfp").select2();


        cargaMediosDePago();
        $("#sclAfp,#slcEmpresa").change(function () {

            llenarTablaDeudas(null);

        });

    }



    var ListarAfp = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMAFPP.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($($('#sclAfp').parents("div")[0]).attr("id")) },
            async: true,
            success: function (datos) {
                var cbo_afp = $('#sclAfp');
                cbo_afp.empty();
                cbo_afp.append('<option value="0">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        cbo_afp.append('<option value="' + datos[i].PDIM + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    cbo_afp.select2('val', '');
                } else {
                    cbo_afp.select2('val', '');
                }
            },
            complete: function () { Desbloquear($($('#sclAfp').parents("div")[0]).attr("id"));},
            error: function (msg) {
                alert(msg);
            }
        });
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
        var val0rPipm = '';
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCPRMT.ASHX?codigo=PIPM",
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {
                val0rPipm = datos[0].VALOR;
            },
            error: function (msg) {

                alert("No se encontró el parámetro en PIPM! Regístrelo antes!");
            }
        });

        $("#txtMontoInteres")
            .keypress(function (e) { return (ValidaDecimales(e, this, 4)); })
            .keyup(function () {
                var date = new Date();
                var dateAfp = new Date(objData.ANIO + "-" + (parseInt(objData.MES)+1) + "-09");
                var valorParc = parseFloat($("#txtMontoAPagarMOBA").val());
                var interes=0;
                for(var i = 0;i<Math.floor(Math.abs(DateDiff(date,dateAfp))/2);i++){

                    interes = valorParc * (parseFloat(val0rPipm) / 100);
                    valorParc = valorParc + interes;

                }

                if ($(".sTotal").length == 0)
                    $(this).after("<label class='sTotal'><label>");

                $(".sTotal").html("TOTAL = S/." + (parseFloat($(this).val() == "" ? 0 : $(this).val()) + parseFloat($("#txtMontoAPagarMOBA").val())).toFixed(2));

                if ($(this).val() <= -0.00001 || $(this).val() > (valorParc - parseFloat($("#txtMontoAPagarMOBA").val()))) {
                    $(this).val("");
                    $(".sTotal").html("TOTAL = "+parseFloat($("#txtMontoAPagarMOBA").val()).toString());
                }
            })
            .blur(function () { if ($(this).val() == 0) $(this).val(""); });
    }

    var datatable = function () {


        var parms = {
            data: null,
            columns: [

                { data: "AFP" },
                {
                    data: "FECHA_EMISION",
                    type: "fecha"
                },
                { data: "DOCUMENTO" },
                {
                    data: "MES", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').html(rowData.ANIO + " - " + cellData);
                    }
                },
                { data: "DESCRIPCION" },
                {
                    data: "MONTO_MONE_BASE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right').html(formatoMiles(cellData));
                    }
                },
                {
                    data: null,
                    defaultContent: '  <button type="button" style="padding: 4px 10px;!important" class="btn blue btnpagar"><i class="icon-legal"></i> Pagar</button>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }

            ],
            "paging": false,
            scrollCollapse: true,
            "columnDefs": [
            { "visible": false, "targets": 0 }
            ],
            order: [[0, 'asc']],
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;
                $("#tblBandeja,#tblBandeja_wrapper").removeAttr('style').attr("style", "border-collapse: collapse;");
                api.column(0, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            '<tr class="group"><td colspan="8" style="BACKGROUND-COLOR: rgb(223, 223, 223);">' + group + '</td></tr>'
                        );

                        last = group;
                    }
                });
            },
            footerCallback: function (row, data, start, end, display) {
                if (data.length > 0) {
                    $("#txtTC").val(data[0].VALOR_CAMBIO_DCTO);
                }
            }
        }

        oTable = iniciaTabla('tblBandeja', parms);




        $($("#tblBandeja_wrapper div.span6")[0]).html('<button type="button" class="btn green refreshData"><i class="icon-refresh"></i></button>');

        $("#tblBandeja_info").css("display", "none");

        $("#tblBandeja,#tblBandeja_wrapper").removeAttr('style').attr("style", "border-collapse: collapse;");

        $(".refreshData").click(function () { consultaDeudas(); });

    }

    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.btnpagar', function () {

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

        $("#chkInteres").click(function () {
            
            if ($(this).is(":checked"))
                $("#divMontoInteres").slideDown();
            else {
                $("#divMontoInteres").slideUp();
               
            }
        });

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

                    case "Caja":

                        $("#divSaldoCaja").addClass("activo");
                        $("#divSaldoCtas").removeClass("activo");
                        $("#lbl_detalle1").html("Caja");


                        $("#cbo_Det_Origen").off("change");
                        $("#cbo_Det_Origen").attr("data-placeholder", "CAJA").select2("val", "").change();
                        $("#cbDestino").select2("val", "");



                        $.ajaxSetup({ async: false });
                        $.post("vistas/CP/ajax/CPMPGAF.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val() },
                             function (res) {
                                 if (res != null && res != "" && res.indexOf("error") < 0) {

                                     $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {
                                         if ($('#cbo_OrigenPago').val() == "Caja") {
                                             /***/
                                             if (!eventOrigenCaj)
                                                 $("#iconDetSaldo").click();
                                             /***/
                                             eventOrigenCaj |= 1;
                                             $("#txtMontoDisponibleMOBA").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto")));
                                             $("#txtMontoDisponibleMOAL").val(formatoMiles($("#cbo_Det_Origen :selected").attr("monto_d")));

                                             if ($("#cbo_moneda :selected").attr("tipo") == "MOBA") {
                                                 $("#txtMonto").val($("#cbo_Det_Origen :selected").attr("monto")).change();
                                                 if (errorSaldoInsuf) { $(this).select2("val", ""); errorSaldoInsuf &= 0; }
                                             } else {
                                                 if (($("#cbo_moneda :selected").attr("tipo") == "MOAL"))
                                                     $("#txtMonto").val($("#cbo_Det_Origen :selected").attr("monto_d")).change();
                                                 if (errorSaldoInsuf) { $(this).select2("val", ""); errorSaldoInsuf &= 0; }
                                                 else
                                                     $("#txtMonto").val("").change();
                                             }
                                         }
                                     });

                                 } else {
                                     $("#cbo_Det_Origen").html("").attr("disabled", true);

                                 }
                             });
                        $.ajaxSetup({ async: true });


                        //

                        if (!event_moneda)
                            $("#cbo_moneda").change(function () {
                                event_moneda |= 1;
                                //$("#txtMonto").val("");
                                if ($("#cbo_moneda :selected").attr("tipo") == "MOBA") {
                                    $("#txtMonto").val($("#cbo_Det_Origen :selected").attr("monto") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto")).change();
                                    if (errorSaldoInsuf) { $(this).select2("val", ""); errorSaldoInsuf &= 0; }
                                } else {
                                    if (($("#cbo_moneda :selected").attr("tipo") == "MOAL"))
                                        $("#txtMonto").val($("#cbo_Det_Origen :selected").attr("monto_d") == undefined ? "0" : $("#cbo_Det_Origen :selected").attr("monto_d")).change();
                                    if (errorSaldoInsuf) { $(this).select2("val", ""); errorSaldoInsuf &= 0; }
                                    else
                                        $("#txtMonto").val("").change();
                                }
                            });
                        //***

                        $("#cboMedioPago").html(StringMediosPago);
                        $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0001" && valorO != "") $(j).remove(); });
                        $("#cboMedioPago").select2("val", "0001");
                        $("#cboMedioPago").change();

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
                        $("#cbo_Det_Origen").attr("data-placeholder", "CUENTA BANCARIA").select2();

                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGAF.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: "0002" },
                          function (res) {
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#cbo_Det_Origen").html(res).select2("val","").change().attr("disabled", false).change(function () {

                                      if ($('#cbo_OrigenPago').val() == "Banco") {

                                          /***/

                                          if (!eventOrigenBco)
                                              $("#iconDetSaldo").click();

                                          /***/

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

                                  });
                              } else {
                                  $("#cbo_Det_Origen").html("<option></option>").change();
                              }

                          });
                        $.ajaxSetup({ async: true });


                        $("#cboMedioPago").html(StringMediosPago);
                        $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "") $(j).remove(); });
                        $("#cboMedioPago").attr("disabled", true);
                        $("#cboMedioPago").select2("val", "0003");
                        $("#cboMedioPago").change();

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

                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Nro. Op.");

                        $("#cbDestino").off("change");
                        $("#cbDestino").html("<option value='" + persona_selec_nombre + "'>" + persona_selec_nombre + "</option>").change();
                        $("#cbo_moneda").select2("val", '0002');

                        $("#cbo_moneda").attr("disabled", true);
                        $("#cbDestino").attr("disabled", true).select2();

                        $(".mPersona").css("display", "none");
                        offObjectEvents("txtNroOpe");
                        $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);
                        break;


                    case "0003": //transferencia

                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Nro. Op.");

                        $("#cbDestino").off("change");
                        $("#cbDestino").html("<option value='" + persona_selec_nombre + "'>" + persona_selec_nombre + "</option>").change();


                        $("#cbDestino").attr("disabled", true).select2();


                        $("#cbo_moneda").attr("disabled", true);
                        $("#txtMonto").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false);
                        break;

                }
            }

        });



    }




    var eventos = function () {
        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana")
                ListarAfp($('#slcEmpresa').val())
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });
        $('#sclAfp').on('change', function () { consultaDeudas();});    



    }


    return {
        init: function () {
            cargarCombos();
            ListarAfp($('#slcEmpresa').val());
            eventos();
            datatable();
            funcionalidadTabla();
            funcionalidad();
            plugins();
            consultaDeudas();

        }
    };
}();

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
    $("#PgDvDesc").html(CapFirsLetter(data.DESCRIPCION))
    $("#txtMontoAPagarMOBA")
        .val(formatoMiles(data.MONTO_MONE_BASE))
        .attr("tipo", "0002")
        .addClass("monto_sele")
        .attr("monto", data.MONTO_MONE_BASE);
    $("#txtMontoAPagarMOAL")
        .val(formatoMiles(data.MONTO_MONE_ALTER))
        .attr("tipo", "0003")
        .addClass("monto_sele")
        .attr("monto", data.MONTO_MONE_ALTER);
    $("#modalPagar")
        .modal("show")
        .draggable({ handle: "modal-header" })
        .modal({ backdrop: "static", keyboard: false });

    $("#modalPagar select").select2("val", "");

    persona_selec_nombre = data.AFP;
    limpiaCampos();
    confIniciales(data.ES_MONEDA_BASE);
}

function confIniciales(base) {
    $("#cbo_OrigenPago").select2("val","Caja").change();
    $("#cbo_Det_Origen option[value= ]").remove()
    $("#cbo_Det_Origen").select2().change();
    $("#cboMedioPago").val("0001").change();
    $("#cbo_moneda").select2("val", "0002");

}

function pagar() {
    if (!vErrorBodyAnyElement(".obligatorio")) {
        var cade_pagar = "";
        cade_pagar += ("|" + objData.CODIGO + "," + objData.DOCUMENTO + "," + objData.MONTO_MONE_BASE + ",S");

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
        var p_destino = $("#cbDestino :selected").html();
        var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
        var p_flag = 1;
        var adicional = $("#txtMontoInteres").val() == "" ? 0.00 : $("#txtMontoInteres").val();


        var det_desc = "", pidm_cta = "", cta = "", compl = "";

        if (ind_tipo == "B") {


            pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
            cta = $("#cbo_Det_Origen").val();
            compl = "S";
            p_flag = 1.5;

            switch ($("#cboMedioPago").val()) {
                case "0003": //transferencia

                    det_desc = "*" + objData.AFP + " / " + objData.ANIO + "-" + objData.MES;

                    break;

            }
        } else if (ind_tipo == "C") {



            cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");

        }

        var descripcion = ind_tipo == "C" ? ("PAGO " + objData.DESCRIPCION) : det_desc;


        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGAF.ASHX",
            data: {
                flag: "1",
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
                tipo: ind_tipo == "C" ? "CAJ" : "BAN",
                cuenta: cta,
                completo: compl,
                adicional: adicional,
                monto_total: p_moneda == 0002 ? objData.MONTO_MONE_BASE : objData.MONTO_MONE_ALTER
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
                            json_selec = new Array();
                            exito();
                            $("#txt_monto_base, #txt_monto_alt, #txtMonto").val("");
                            $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);

                            $("#modalPagar")
                              .modal("hide");

                            limpiaCampos(); eventOrigenBco = false;
                            eventOrigenCaj = false;
                            consultaDeudas();
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
    $.post("vistas/CP/ajax/CPMPGAF.ASHX", { flag: 2 },
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
    $("#mensajemodal .select2-input").attr("disabled", false);
    $("#cbo_OrigenPago,#chkInteres,#txtMontoInteres").attr("disabled", false);
    $("#txtMontoInteres").val("");
   
    if ($("#chkInteres").is(":checked")) {
        $("#chkInteres").click().click();
        $('#uniform-chkInteres span').removeClass();
        $('#chkInteres').attr('checked', false);

}
    $(".sTotal").remove();
}

function consultaDeudas() {

    $.post("vistas/CP/ajax/CPMPGAF.ASHX", { flag: 4, empresa: $("#slcEmpresa").val(), afp: ($("#sclAfp").val() == "" ? 0 : $("#sclAfp").val()) },
              function (datos) {
                  if (datos != "" && datos != null && datos != "[-]") {
                      var json = $.parseJSON(datos);
                      llenarTablaDeudas(json);

                      if ($("#sclAfp").val() == "" || $("#sclAfp").val() == "0") {
                          var noption = new Array();
                          var cbo_afp = $('#sclAfp');

                          cbo_afp.children().filter(function (e, d) {
                              if (datos.indexOf('"PIDM_AFP":"' + $(d).val() + '"') > 0 || $(d).val()=="0")
                                  noption.push(d);
                          });
                          // cbo_afp.off("change");
                          cbo_afp.empty();
                          cbo_afp.append(noption).select2("val","0");

                          //  cbo_afp.on("change", function () {  });

                      }

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


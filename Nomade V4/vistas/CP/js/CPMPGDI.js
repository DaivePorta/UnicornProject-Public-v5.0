obj = null;
errorSaldoInsuf = false;
indCargaInicial = false;

var CPLPGDI = function () {
    var cargarCombos = function () {
        $("#cboEmpresa, #cboAfp").select2();

        //cargar Empresa      
        $.ajax({ 
            type: "post",
            url: "vistas/CP/ajax/CPMPGDI.ASHX?",
            data: { flag: 5 },
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
                { data: "DESCRIPCION" },
                {data:"DOCUMENTO_GASTO"},
                { data: "MODULO_DESC_CORTA" },
                { data: "PERSONA" },
                { data: "SOLICITANTE" }  ,
                {
                    data: "CAJBANC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                { data: "MEDIO" },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right');
                    }
                },
                { data: "ORIGEN" },
                { data: "DESTINO" },
                {
                    data: "FECHA_PAGO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },             
                { data: "DOCUMENTO" }
                              
            ]          
        }

        oTable = iniciaTabla('tblBandeja', parms);

        $("#tblBandeja,#tblBandeja_wrapper").removeAttr('style').attr("style", "border-collapse: collapse;");
        
    }

    var eventos = function () {

        $.fn.dataTable.ext.search.push(
          function (settings, data, dataIndex) {
              var min = parseInt($('#minfecha').val().split("/").reverse().join(""), 10);
              var max = parseInt($('#maxfecha').val().split("/").reverse().join(""), 10);
              var age = parseInt(data[10].split("/").reverse().join("")) || 0; // use data for the age column

              if ((isNaN(min) && isNaN(max)) ||
                   (isNaN(min) && age <= max) ||
                   (min <= age && isNaN(max)) ||
                   (min <= age && age <= max)) {
                  return true;
              }
              return false;
          }
      );


        $("#minfecha,#maxfecha").change(function () {
            oTable.api(true).draw();
        });

        inifechas('minfecha', 'maxfecha');



        $(".refresh").click(function () { cargaDatos();  });

        var select = $('#cboEntidad');

        select
            .on('change', function () {
                $('#tblBandeja').DataTable().column(3)
                    .search($(this).val())
                    .draw();
            });


        select.select2({
            placeholder: "SELECCIONAR...",
            allowclear: true

        });

        $("#cboEmpresa").change(function () { cargaDatos(); });
    }

    function cargaDatos() {

        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGDI.ASHX?",
            data: { flag: "L", empresa: $('#cboEmpresa').val() },
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($($('#tblBandeja').parents("div")[0]).attr("id")) },
            async: true,
            success:
                function (res) {
                    oTable.fnClearTable();
                    var select = $('#cboEntidad').empty();
                    if (res != null && res != "" && res.indexOf("error") < 0) {
                        oTable.fnAddData(res);



                        $('#tblBandeja').DataTable().column(3).data().unique().sort().each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        });
                    }
                },
            complete: function () { Desbloquear($($('#tblBandeja').parents("div")[0]).attr("id")); },
            error: function (msg) {
                alert(msg);
            }

        });

    }

    function cargaInicial() {


        $("#maxfecha").datepicker({
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

        $("#minfecha").val(fNueva);


    }


    return {
        init: function () {
            cargarCombos();
            datatable();
            eventos();
            cargaInicial();

        }
    };

}();

var CPMPGDI = function () {
    var cargarCombos = function () {
        $.ajaxSetup({ async: false });
        $("#slcEmpresa").select2();
        $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 5 },
            function (res) {
                if (res != null && res != "" && res.indexOf("error") < 0) {
                    $("#cbDestino").select2();
                    $("#slcEmpresa").html(res).change(function () {

                        $("#cbo_moneda").attr("disabled", true);


                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: "MO", empresa: $("#slcEmpresa").val() },
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
        $("#slcSucural").select2();


        cargaMediosDePago();
        $("#slcSucural,#slcEmpresa").change(function () {

            llenarTablaDeudas(null);

        });

    }



    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {

                        $("#slcSucural").select2("val", "");
                    }

                    Desbloquear("ventana")
                }
                else {
                    noexito();
                    Desbloquear("ventana")
                }



            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana")
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

    }

    var datatable = function () {


        var parms = {
            data: null,
            columns: [

                { data: "MODULO.NOMBRE" },
                {
                    data: "FECHA_VENCIMIENTO.display",
                    type: "fecha"
                },
                
                { data: "DOCUMENTO" },
                {
                    data: "MONTO_MONE_BASE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right').html(formatoMiles(cellData));
                        if (rowData.ES_MONEDA_BASE == "S") {
                            $(td).css("background-color", "rgb(255, 255, 216)");
                        }
                    }
                },
                {
                    data: "MONTO_MONE_ALTER", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right').html(formatoMiles(cellData));

                        if (rowData.ES_MONEDA_BASE != "S") {
                            $(td).css("background-color", "rgb(255, 255, 216)");
                        }
                    }
                },
                { data: "DESCRIPCION" },
                { data: "CONCEPTO" },
                { data: "PERSONA.NOMBRE" },
                {
                    data: "SOLICITANTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
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

                    let oRendiciones = data.filter(function (obj) { return obj.MODULO.NOMBRE === "RENDICION CUENTAS"; });
                    let oGastos = data.filter(function (obj) { return obj.MODULO.NOMBRE === "GASTOS"; });

                    var oArrayRendicionesSoles = new Array();
                    var oArrayRendicionesDolares = new Array();
                    var oArrayGastosSoles = new Array();
                    var oArrayGastosDolares = new Array();

                    oRendiciones.filter(function (obj) {
                        oArrayRendicionesSoles.push(parseFloat(obj.MONTO_MONE_BASE));
                        oArrayRendicionesDolares.push(parseFloat(obj.MONTO_MONE_ALTER));
                    });

                    oGastos.filter(function (obj) {
                        oArrayGastosSoles.push(parseFloat(obj.MONTO_MONE_BASE));
                        oArrayGastosDolares.push(parseFloat(obj.MONTO_MONE_ALTER));
                    });

                    if (oArrayRendicionesSoles.length != 0) {
                        var nRendicionesSoles = oArrayRendicionesSoles.reduce(function (a, b) { return a + b; });
                    } else {
                        var nRendicionesSoles = 0;
                    }

                    if (oArrayRendicionesDolares.length != 0) {
                        var nRendicionesDolares = oArrayRendicionesDolares.reduce(function (a, b) { return a + b; });
                    } else {
                        var nRendicionesDolares = 0;
                    }

                    if (oArrayGastosSoles.length != 0) {
                        var nGastosSoles = oArrayGastosSoles.reduce(function (a, b) { return a + b; });
                    } else {
                        var nGastosSoles = 0;
                    }

                    if (oArrayGastosDolares.length != 0) {
                        var nGastosDolares = oArrayGastosDolares.reduce(function (a, b) { return a + b; });       
                    } else {
                        var nGastosDolares = 0;
                    }

                    //let nRendicionesSoles = oArrayRendicionesSoles.reduce(function (a, b) { return a+b; });
                    //let nRendicionesDolares = oArrayRendicionesDolares.reduce(function (a, b) { return a+b; });
                    //var nGastosSoles = oArrayGastosSoles.reduce(function (a, b) { return a+b; });
                    //var nGastosDolares = oArrayGastosDolares.reduce(function (a, b) { return a+b; });          


                    $("#TotalGastos").text("S/." + formatoMiles(nGastosSoles) + " ó US$" + formatoMiles(nGastosDolares));
                    $("#TotalRedicion").text("S/." + formatoMiles(nRendicionesSoles) + " ó US$" + formatoMiles(nRendicionesDolares));

                    
                    $("#txtTC").val(data[0].VALOR_TIPO_CAMBIO);
                }
            }
        }

        oTable = iniciaTabla('tblBandeja', parms);


        $('#tblBandeja').removeAttr('style').attr("style", "border-collapse: collapse;");

        $($("#tblBandeja_wrapper div.span6")[0]).html(`<button type="button" class="btn green refreshData">
                                                            <i class="icon-refresh"></i></button>
                                                       <button class="btn green" id="btnLibroXls" type="button" style="padding: 2px 10px; margin-left:10px;">
                                                            <i class="fa fa-file-excel-o"></i>&nbsp;Exportar a Excel</button>`);

        $("#tblBandeja_info").css("display", "none");

        $(".refreshData").click(function () { consultaDeudas(); });
        $("#btnLibroXls").on("click", function () {
            exportTable2Excel("tblBandeja", "PAGOS DIVERSOS " + $("#slcSucural :selected").text() + " al " + new Date().format("dd.MM.yyyy"));
        });
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



        function cargarJson() {
            $.ajax({
                type: "post",
                url: "vistas/GL/ajax/GLMLETR.ashx?flag=L",
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
            $(".det_saldos").css("display", "none"); $("#cbo_Det_Origen").select2("val", "");
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
                        $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val() },
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
                        $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0001" && valorO != "0008" && valorO != "") $(j).remove(); });
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

                        $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: "" },
                          function (res) {
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {

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
                        //DPORTA 09/12/2021 BILLETERA DIG.
                        $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0020" && valorO != "0005" && valorO != "") $(j).remove(); });
                        $("#cboMedioPago").attr("disabled", false);

                        break;

                }
                $("#cbo_Det_Origen").select2("val", "");
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

                        if (objData.DESCRIPCION.indexOf("SERVICIO") >= 0 || objData.DESCRIPCION.indexOf("ALQUILER") >= 0) { //SERVICIO O ALQUILER

                            $("#cbDestino").html("<option></option><option value=0>" + objData.PERSONA.NOMBRE + "</option>").select2("val", "0").change().attr("disabled", true);
                            $("#cbo_moneda").attr("disabled", false);
                        }
                        else {

                            $.ajaxSetup({ async: false });
                            $("#cbDestino").off("change");
                            $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 6, empresapidm: objData.PERSONA.CODIGO, banco: "", moneda: "" },
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
                            $("#cbo_moneda").attr("disabled", true);
                            $("#cbDestino").attr("disabled", false).select2();
                        }




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

                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Nro. Op.");
                       
                        if (objData.DESCRIPCION.indexOf("SERVICIO") >= 0 || objData.DESCRIPCION.indexOf("ALQUILER") >= 0) { //SERVICIO O ALQUILER

                            $("#cbDestino").html("<option></option><option value=0>" + objData.PERSONA.NOMBRE + "</option>").select2("val", "0").change().attr("disabled", true);
                        }
                        else {




                            $.ajaxSetup({ async: false });
                            $("#cbDestino").off("change");
                            $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: objData.PERSONA.CODIGO },
                              function (res) {
                                  if (res != null && res != "" && res.indexOf("error") < 0) {
                                      $("#cbDestino").html(res).select2();
                                  } else {
                                      $("#cbDestino").html("<option></option>").select2();
                                  }

                              });
                            $.ajaxSetup({ async: true });
                            $.ajaxSetup({ async: false });

                            $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 6, banco: $("#cbo_Det_Origen :selected").attr("banco"), moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: objData.PERSONA.CODIGO },
                              function (res) {
                                  if (res != null && res != "" < 0) {
                                      $("#cbDestino option").filter(function (e, j) { var valorO = $(j).val(); if (res.indexOf(valorO) > 0) $(j).remove(); });
                                      if (res != "error") {
                                          $("#cbDestino").append(res.split("<option></option")[1]);
                                      }
                                  } else {
                                      $("#cbDestino").html("<option></option>").change();
                                  }

                              });
                            $.ajaxSetup({ async: true });


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

                        $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 8, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm") },
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

                        $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0006" },
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

                        $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 9, cuenta: $("#cbo_Det_Origen").val(), pidmcuenta: $("#slcEmpresa :selected").attr("pidm"), tipo: "0005" },
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
                    case "0020"://OTROS: YAPE, PLIN, TUNKI, ETC BILLETERA DIG.

                        $("#lbl_detalle3").html("Destino de Pago");
                        //$("#lbl_detalle4").html("Nro. Op.");
                        $("#lbl_detalle4").html("App - Nro. Celular");
                        $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino").html("<option>BILLETERA DIGITAL</option>").attr("disabled", true).select2();

                        $(".mPersona").css("display", "none");
                        offObjectEvents("txtNroOpe");
                        $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);
                        $("#cbo_moneda").val($("#cbo_Det_Origen :selected").attr("moneda")).change().attr("disabled", true);

                        $("#p_DatVuelto").hide();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("");

                        let nombre_cuenta = $("#cbo_Det_Origen :selected").html(); //DPORTA 09/12/2021

                        if (nombre_cuenta.indexOf('BCP') > 0) {
                            $("#txtNroOpe").val("YAPE-");
                        } else if (nombre_cuenta.indexOf('BBVA') > 0) {
                            $("#txtNroOpe").val("LUKITA-");
                        } else if (nombre_cuenta.indexOf('IBK') > 0) {
                            $("#txtNroOpe").val("TUNKI-");
                        } else if (nombre_cuenta.indexOf('BIF') > 0 || nombre_cuenta.indexOf('SCT') > 0) {
                            $("#txtNroOpe").val("PLIN-");
                        }

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


    var eventos = function () {
        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana")
                ListarSucursales($('#slcEmpresa').val())
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });


    }


    return {
        init: function () {
            cargarCombos();
            ListarSucursales($('#slcEmpresa').val());
            eventos();
            datatable();
            funcionalidadTabla();
            funcionalidad();
            plugins();
            consultaDeudas();
            btnBuscaPersonas();

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

    persona_selec_nombre = data.PERSONA.NOMBRE;
    limpiaCampos();
    confIniciales(data.ES_MONEDA_BASE);
}

function confIniciales(base) {
    $("#cbo_OrigenPago").val("Caja").change();
    $("#cbo_Det_Origen option[value= ]").remove()
    $("#cbo_Det_Origen").select2().change();
    $("#cboMedioPago").val("0008").change();
    $("#cbo_moneda").val($("#cbo_moneda option[tipo=" + (base == "S" ? "MOBA" : "MOAL") + "]").val()).change();

}

function pagar() {
    if (!vErrorBodyAnyElement(".obligatorio")) {
        var cade_pagar = "";
        cade_pagar += ("|" + objData.CODIGO + "," + objData.DOCUMENTO + "," + objData.MONTO_MONE_BASE + "," + objData.MONTO_MONE_ALTER + ",S");

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
        var adicional = "";

        var codModulo = objData.MODULO.CODIGO;


        var det_desc = "", pidm_cta = "", cta = "", compl = "";

        if (ind_tipo == "B") {


            pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
            cta = $("#cbo_Det_Origen").val();
            compl = "S";
            p_flag = 1.5;

            switch ($("#cboMedioPago").val()) {
                case "0003": //transferencia

                    det_desc = "*" + objData.PERSONA.NOMBRE;

                    break;

                case "0013": //cheques bancarios

                    det_desc = "CHEQ.PAGADOR N°:" + $("#cbDestino").val();
                    adicional = $("#cbDestino").val() + "|" + $("#cbDestino :selected").attr("tipo");
                    compl = "N";
                    p_documento = "";

                    break;



                case "0005": // tarjeta de debito

                    det_desc = objData.PERSONA.NOMBRE + "/" + $("#cbDestino :selected").html();

                    break;
                case "0020": // OTROS (BILLETERA DIGITAL) DPORTA 09/12/2021
                    det_desc = "DEV. BILLETERA DIGITAL*" + "/" + objData.PERSONA.NOMBRE;
                    break;
            }
        } else if (ind_tipo == "C") {



            cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");

        }

        var descripcion = ind_tipo == "C" ? "PAGO A BENEFICIARIO" : det_desc;


        $.ajax({ 
            type: "post",
            url: "vistas/CP/ajax/CPMPGDI.ASHX",
            data: {
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
                monto_total: p_moneda == 0002 ? objData.MONTO_MONE_BASE : objData.MONTO_MONE_ALTER,
                tipo_cambio: $("#txtTC").val(),
                estable: $("#slcSucural").val(),
                codModulo: codModulo
            },
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($("#ventana"), "Grabando Datos"); },
            async: true,
            success:function(res){
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
    $.post("vistas/CP/ajax/CPMPGDI.ASHX", { flag: 2 },
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
    $("#cbo_OrigenPago").attr("disabled", false);

}

function consultaDeudas() {

    $.ajax({
        type: "post",
        url: "vistas/CP/ajax/CPMPGDI.ASHX",
        data: { flag: 4, empresa: $("#slcEmpresa").val(), estable: $("#slcSucural").val() },
        async: true,
        beforeSend: function () { Bloquear($($("#tblBandeja").parents("div")[0]),"Obteniendo Gastos por Pagar ..."); },
        success: function (datos) {
            if (datos != "" && datos != null && datos != "[-]") {
                var json = $.parseJSON(datos);
                llenarTablaDeudas(json);

            } else {
                llenarTablaDeudas(null);
            }
        },
        complete: function () {
            Desbloquear($($("#tblBandeja").parents("div")[0]));
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
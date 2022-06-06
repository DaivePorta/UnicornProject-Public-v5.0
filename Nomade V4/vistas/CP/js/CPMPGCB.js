var inicio = true;

var CPLPGCB = function () {

    var plugins = function () {

        $("#cboempresa").select2();
        inifechas("txtFeIn", "txtFeFi");

    }



    var cargarEmpresas = function () {
        var select = $('#cboempresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {
                //  select.change();
            }
        });
    };

    var cargarSucursales = function () {
        var select = $('#slcEstablec');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboempresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {


                select.multiselect({
                    nonSelectedText: 'TODOS'

                });
             
                Desbloquear($(select.parents("div")[0]));
            }
        });
    };

    var cargarProveedores = function () {
        var select = $("#slcProveedor")
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGCB.ashx?flag=3&empresa=" + $('#cboempresa').val(),
            async: true,
            beforeSend: function () { Bloquear($(select.parents("div")[0])) },
            success: function (data) {
                data = data.split("<option></option>").join("");
                select.append(data);

            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {
                select.multiselect({
                    nonSelectedText: 'TODOS',
                    includeSelectAllOption: true,
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    maxHeight: 200
                });
               
                Desbloquear($(select.parents("div")[0]));
            }
        });


    }

    var eventos = function () {
        $('#cboempresa').change(function () {
            cargarSucursales();
            fillCreditoBancario();
            cargarProveedores();
        });

        $("#btnFiltrar").click(function () {

            $.ajax({
                type: "post",
                url: "vistas/CP/ajax/CPMPGCB.ashx?flag=L&empresa=" + $('#cboempresa').val()+
                    "&establec=" + ($("#slcEstablec").val() === null ? '' : $("#slcEstablec").val().toString()) + 
                    "&proveedor=" + ($("#slcProveedor").val() === null ? '' : $("#slcProveedor").val().toString()) +
                    "&fini=" + $('#txtFeIn').val() + "&ffin=" + $('#txtFeFi').val(),
                async: true,
                contenttype: "application/json",
                datatype: "json",
                beforeSend: function () { Bloquear($($("#tblPagoPr").parents("div")[0])) },
                success: function (data) {

                    oTablePagoPr.fnClearTable();

                    if (data.length > 0) {

                        oTablePagoPr.fnAddData(data);

                    } else {

                        infoCustom2("No se encontraron datos!");

                    }

                },
                error: function (msg) {
                    alertCustom('Error al cargar Sucursales.');
                },
                complete: function () {

                    Desbloquear($($("#tblPagoPr").parents("div")[0]));
                }

            });
        });
    }


    var tablaVacia = function () {

        var parms = {
            data: null,
            columns: [
                   {
                       data: null,
                       defaultContent: "  <img src='recursos/img/details_open.png' class='detDoc' />",
                       createdCell: function (td, cellData, rowData, row, col) {

                           $(td).attr('align', 'center')

                       }
                   },
                { data: "PROVEEDOR" },
                {
                    data: "FECHA_PAGO", type: "fecha", createdCell: function (td, cellData, rowData, row, col) {
                        $(td)                          
                            .css({ "text-align": "center" });
                    }
                },
                {
                    data: "MONEDA", createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .css({ "text-align": "center" });
                    }
                },
                {
                    data: "MONTO",
                   type:"formatoMiles"
                },
                 { data: "ORIGEN" },
                 {
                     data: "CAJA_BCO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td)
                             .css({ "text-align": "center" });
                     }
                 },
                  { data: "FORMA_PAGO" },
                 { data: "NRO_OP" },

            ]

        }
        oTablePagoPr = iniciaTabla('tblPagoPr', parms);

    }


    var eventosTabla = function () {

        $('#tblPagoPr tbody').on('click', '.detDoc', function () {

            var pos = oTablePagoPr.api(true).row($(this).parents("tr")[0]).index();
            var row = oTablePagoPr.fnGetData(pos);

            var id = row.CODE_DOCUMENTO;
            var nTr = $(this).parents('tr')[0];

            if (oTablePagoPr.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTablePagoPr.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTablePagoPr.fnOpen(nTr, fnFormatDetails(nTr, id.split(",").join("")), 'details');
                oTablePagoPr.fnOpen(nTr, '<div id="c' + id.split(",").join("") + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
           //     $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
               
                $.ajax({
                    type: "POST",
                    url: "vistas/cp/ajax/cpmPGCB.ashx?flag=LA&codigo=" + id,
                    beforeSend: function () { Bloquear($('#c' + id.split(",").join(""))); },
                    async: true,
                    success: function (datos) {
                        Desbloquear("ventana");
                        var str = "";
                        var resb = "";
                        if (datos.length<1) { resb = "No hay datos disponibles!"; $('#c' + id.split(",").join("")).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + id.split(",").join("") + "' class='display DTTT_selectable' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>DOCUMENTO</th>";
                            resb += "<th>MONTO AMORT.</th>";       
                            resb += "<th>MONTO TOTAL</th>";
                            resb += "<th>F. EMISION</th>";
                            resb += "<th>F. VENCIMIENTO</th>";
                            resb += "<th>PAGADO</th>";
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id.split(",").join("")).html(resb);

                            cargatablaDetalleF("tblBandejaDetalleF" + id.split(",").join(""), datos);
                        }
                    },
                   complete:function(){ Desbloquear($('#c' + id.split(",").join(""))); }

                    
                });

            }

        });

        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id.split(",").join("") + '"></div>';
            return sOut;
        }

    }

    var cargatablaDetalleF = function(id, json) {

        oTableDeudasDetalle = iniciaTabla(id, {
            data: json,
            columns: [
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                 {
                     data: "MONTO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(rowData.SMONEDA + "." + formatoMiles(rowData.MONTO));
                     }
                 },
                 {
                     data: "MONTO_TOTAL_DOC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(rowData.SMONEDA_ORIGEN + "." + formatoMiles(rowData.MONTO_TOTAL_DOC));
                     }
                 },
                 {
                     data: "FECHA_EMISION",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     },
                     type:"fecha"
                 },



                {
                    data: "FECHA_VCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    },
                    type: "fecha"
                },


                {
                    data: "PAGADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                      
                    }
                }


            ],
            "paging": false,
            scrollCollapse: true,
            //  sort: false,
            "sDom": "t"

        });


    }

    return {
        init: function () {
            plugins();
            eventos();
            cargarEmpresas();
            tablaVacia();
            eventosTabla();
        }
    };
}();


var CPMPGCB = function () {

    var plugins = function () {
        $('#slcCredBanc,#slcEmpresa,#slcEstablec').select2();
        $('#txtFechaPago').datepicker();
        $('#txtFechaPago').inputmask("date",
        {
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            }
        });

        $('#cbo_OrigenPago').select2();
        $('#cboCtaEmpresa').select2();
        $('#cboMedioPago').select2();
        $('#cbDestino, #cbo_Det_Origen, #cbo_moneda').select2();
        $("#txt_TC,#txtMonto,#txtComisiones").keypress(function (e) { return (ValidaDecimales(e, this, 4)); })
        $("#txt_TC").keyup(function () { if ($(this).val() < 1 || $(this).val() > 10) $(this).val(""); });      

    }

    var fillCreditoBancario = function () {

        var select = $("#slcCredBanc");

        if ($('#slcEstablec').val().length == 0) {
            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=L&empresa=" + $('#slcEmpresa').val() + "&stbl=&cuenta=&empresapidm=",
                beforeSend: function () { Bloquear($(select.parents("div")[0])); },
                async: true,
                success: function (data) {
                    select.empty();
                    select.html("<option></option>");
                    select.select2('data', null);
                    if (data.length > 0) {
                        dataCreditos = data;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].COMPLETO == 'S')
                                select.append('<option value="' + data[i].CODIGO + '">' + data[i].TIPO + " " + data[i].BANCO + " " + data[i].NRO_CREDITO + '</option>');
                        }                        
                    }


                },
                error: function (msg) {
                    alertCustom("Ocurrió un error al obtener los Creditos Bancarios!");
                    console.log("Error: " + msg.responseText);
                },
                complete: function () {
                    Desbloquear($(select.parents("div")[0]));
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=L&empresa=" + $('#slcEmpresa').val() + "&stbl=" + $('#slcEstablec').val() + "&cuenta=&empresapidm=",
                beforeSend: function () { Bloquear($(select.parents("div")[0])); },
                async: true,
                success: function (data) {
                    select.empty();
                    select.html("<option></option>");
                    select.select2('data', null);
                    if (data.length > 0) {
                        dataCreditos = data;
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].COMPLETO == 'S')
                                select.append('<option value="' + data[i].CODIGO + '">' + data[i].TIPO + " " + data[i].BANCO + " " + data[i].NRO_CREDITO + '</option>');
                        }

                    }


                },
                error: function (msg) {
                    alertCustom("Ocurrió un error al obtener los Creditos Bancarios!");
                    console.log("Error: " + msg.responseText);
                },
                complete: function () {
                    Desbloquear($(select.parents("div")[0]));
                }
            });
        }

       

    }

    var fillcboEmpresa = function () {
        var select = $('#slcEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nb/ajax/nbmcrba.ashx?flag=4',
            beforeSend: function () { Bloquear($(select.parents("div")[0])) },
            async: true,
            success: function (data) {
                if (data !== '') {
                    select.html(data);                

                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    
                    $("#slcEmpresa").change();
                    
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {
                //if (typeof (dataCredito) !== "undefined") { select.select2("val", dataCredito.CTLG_CODE).change(); }
                Desbloquear($(select.parents("div")[0]));
            }
        });

    }

    var fillcboEstablecimiento = function () {        

        var select = $("#slcEstablec");

        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#slcEmpresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },                
            async: true,
            success: function (data) {
                if (data.length > 0) {
                    select.empty();
                    select.html("<option></option>");
                    select.select2('data', null);
                    for (var i = 0; i < data.length; i++) {
                        select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');                        
                        
                    }
                    $("#slcEstablec").select2("val", "");

                       
                    
                    //$("#slcEstablec").change();
                    fillCreditoBancario();
                           
                } else {
                    select.empty();
                    select.select2('data', null);
                }

            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {
                // if (typeof (dataCredito) !== "undefined") { select.select2("val", dataCredito.SCSL_CODE) }
                Desbloquear($(select.parents("div")[0]));
            }
        });       
        

    }
    
    var fillcboMoneda = function () {
        var select = $('#cbo_moneda');
        $.ajax({
            type: "post",
            url: 'vistas/CP/ajax/CPMPGPR.ASHX?flag=MO&empresa=' + $('#slcEmpresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.html(data);
            },
            error: function (msg) {
                alertCustom('Error al cargar Monedas.');
            },
            complete: function () {
                Desbloquear($(select.parents("div")[0]));
            }
        });


    }

    eventOrigenBco = false;
    eventOrigenCaj = false;
    jsonPersonas = null;

    obtenerCuotas = function () {
        var cod = $("#slcCredBanc").val();
        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=LD&code=" + cod + "&pagado_ind=N",
            contentType: "application/json;",
            beforeSend:function(){},
            dataType: "json",
            success: function (datos) {                
                oTableDeudas.fnClearTable();
                if (datos.length > 0) {
                    oTableDeudas.fnAddData(datos);
                    $("#cbo_OrigenPago").attr("disabled", false);
                }
            },
            error: function (msg) {
                alertCustom("Ocurrió un error al listar detalle de Credito Bancario!");
                console.log("ErrorDetalle: " + msg.responseText);
            },
            complete: function () {
                $(".monto_sele").attr("monto", "0");
                $(".monto_sele").val("").change();
            }
        });

    }

    var cargatablavacia = function () {

        oTableDeudas = $('#tblBandeja').dataTable({
            data: null,
            columns: [
                {
                    data: "NCUOTA",                  
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    width: '5%'
                },
                {
                    data: "FECHA_VCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    },
                    type: "fecha"
                },

                {
                    data: "IMPORTE_CUOTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        var valor = cellData;

                        if (vg_moneda_base!== undefined)
                            if (vg_moneda_base == 'N' && $("#txt_TC").val() != "") 
                                valor = parseFloat(rowData.IMPORTE_CUOTA) * parseFloat($("#txt_TC").val());
                            else
                                $(td).css("background-color", "#FFF9B3");

                        if (vg_moneda_base == 'N') {
                            rowData.IMPORTE_CUOTA_ALT = parseFloat(cellData).Redondear(3);
                            rowData.IMPORTE_CUOTA = parseFloat(valor).Redondear(3);
                        } else {
                            rowData.IMPORTE_CUOTA_ALT = parseFloat(rowData.POR_PAGAR) / parseFloat($("#txt_TC").val());
                        }  

                        $(td).html(valor.Redondear(2));
                    },
                    type: "formatoMiles"
                },

                {
                    data: "IMPORTE_CUOTA_ALT",
                    type: "formatoMiles"
                },

                 {
                     data: "POR_PAGAR",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                         var valor = cellData;
                         if (vg_moneda_base!== undefined)
                             if (vg_moneda_base == 'N' && $("#txt_TC").val() != "")
                                 valor = parseFloat(rowData.POR_PAGAR) * parseFloat($("#txt_TC").val());                           

                         if (vg_moneda_base == 'N') {
                             rowData.POR_PAGAR_ALT = parseFloat(cellData).Redondear(3);
                             rowData.POR_PAGAR = parseFloat(valor).Redondear(3);
                         } else {
                             rowData.POR_PAGAR_ALT = parseFloat(rowData.POR_PAGAR) / parseFloat($("#txt_TC").val());
                         }                      

                         $(td).html(valor.Redondear(2));
                     },
                     type:"formatoMiles"
                 },

                {
                    data: "POR_PAGAR_ALT",
                    type: "formatoMiles"
                },
                {
                    data: null,
                    defaultContent: '  <input type="checkbox" class="selecChk" />',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }


            ],
            "scrollY": "280px",
            "scrollCollapse": false,
            "paginate": false,
            "order": [[1, 'asc']],

            info: false

        });

        $($("#tblBandeja_wrapper div.span6")[0]).html('<button type="button" class="btn green refreshData"><i class="icon-refresh"></i></button>');

        $(".refreshData").click(function () { obtenerCuotas(); });

    }

    var cargaMediosDePago = function () {

        $.ajaxSetup({ async: false });
        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 2 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {


                  StringMediosPago = res;

              }

          });
        $.ajaxSetup({ async: true });

    }

    var funcionalidad = function () {
    
        $("#txtMonto").change(function () {

            var tipo = $("#cbo_moneda :selected").attr("tipo");
            var valor_ = parseFloat($(".monto_sele[tipo = " + tipo + "]").attr("monto"));
            var valor_2 = tipo == "MOAL" ? parseFloat($("#cbo_Det_Origen :selected").attr("monto_d")) : parseFloat($("#cbo_Det_Origen :selected").attr("monto"));

            var d = 0.00;

           

            if (sumaTotal() > valor_2) {

                $(this).val("").attr("monto", 0.000);
                $("#montoTotalAgregado").html(formatoMiles(sumaTotal()));
                infoCustom2("El monto excede al saldo disponible en la " + $("#lbl_detalle1").html());
                $("#s2id_cbo_Det_Origen").pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
            }

            else {
                if ($(this).val() > valor_) {

                    $(this).val("").attr("monto", 0.000);
                    $("#montoTotalAgregado").html(formatoMiles(sumaTotal()));
                    infoCustom2("El monto ingresado es mayor al que se ha seleccionado a pagar!");
                    $(this).pulsate({
                        color: "#33AECD",
                        reach: 20,
                        repeat: 3,
                        glow: true
                    });

                }
                else {
                    $(this).val(formatoMiles($(this).val()))
                    .attr("monto", $(this).val().split(",").join(""));
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
                async: true,

                success: function (datos) {
                    if (datos != null && datos != "") {

                        jsonPersonas = datos;

                    }
                }
            });
        }

        $('#cbo_OrigenPago').change(function () {
            /*conf inicial mostrar detalle de saldos*/
            $("#txtComisiones").attr("disabled", false);
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

                    $("#lbl_detalle1").html("Caja");
                    $("#divSaldoCaja").addClass("activo");
                    $("#divSaldoCtas").removeClass("activo");

                    $("#cbo_Det_Origen").off("change");
                    $("#cbo_Det_Origen").select2("val", "").change().attr("data-placeholder", "CAJA");
                    $("#cbDestino").html("<option></option>").select2("val", "");


                    $.ajaxSetup({ async: false });
                    $.post("vistas/CP/ajax/CPMPGCB.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val(), establec: $("#slcEstablec").val() },
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
                                             $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto"));
                                         } else {
                                             if (($("#cbo_moneda :selected").attr("tipo") == "MOAL"))
                                                 $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto_d"));
                                             else
                                                 $("#txtMonto").attr("placeholder", "");
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

                    $.post("vistas/CP/ajax/CPMPGCB.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: "" },
                      function (res) {
                          if (res != null && res != "" && res.indexOf("error") < 0) {
                              $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {
                                  $("#txtMonto").val("").change();
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
                              }
                              );
                          } else {
                              $("#cbo_Det_Origen").html("<option></option>").change();
                          }

                      });
                    $.ajaxSetup({ async: true });


                    $("#cboMedioPago").html(StringMediosPago);
                    $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003"  && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);

                    break;

            }
        });

        $('#cboMedioPago').change(function () {

            var MedioActual = $(this).val();

            $("#txtNroOpe").removeClass("personas").attr("disabled", false);

            $("#cbDestino").val("").select2();          

            $("#txtNroOpe").val("");

            switch (MedioActual) {

                case "0001"://DEPOSITO BANCARIO

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Nro. Op.");

                    $("#cbDestino")                     
                      .html("<option value='" + vg_codigo_banco + "'>BANCO " + vg_nombre_banco + "</option>").change().attr("disabled", 1);
                    
                 
                    $("#cbo_moneda").attr("disabled", false);



                    $(".mPersona").css("display", "none");
                  
                    $("#txtMonto").attr("disabled", false);
                    break;              

                case "0003": //transferencia

                    $("#lbl_detalle3").html("Destino");
                    $("#lbl_detalle4").html("Nro. Op.");



                    $.ajaxSetup({ async: false });
                 
                    $("#cbDestino")
                     .html("<option value='" + vg_codigo_banco + "'>BANCO " + vg_nombre_banco + "</option>").change().attr("disabled", 1);

                     
                    $("#cbo_moneda").attr("disabled", true);
                    $("#txtMonto").attr("disabled", false);
                    $("#txtNroOpe").attr("disabled", false);

                    break;

            }


        });


        cargarJson();
    }

    var tipoCambio = function () {
        $.post("vistas/NB/ajax/NBMCHEQ.ASHX", { flag: 'TC' },
                                     function (res) {
                                         if (res != null && res != "" && res.indexOf("error") < 0) {
                                             v_tipo_cambio = res;
                                         }
                                     }).complete(function () {
                                         $("#txt_TC").val(v_tipo_cambio);
                                     });
    }    
   
    var cargainicial = function () {

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

        cargaMediosDePago();
        cargatablavacia();
        funcionalidadTabla();
        $("#txtComisiones").val(0);
 
        $('#txt_TC').change(function () {

            $("#txt_monto_base, #txt_monto_alt").val("");
            if (parseFloat($(this).val()) == 0) { $(this).val(""); }

        });    

        $('#txtFechaPago').datepicker("setDate", new Date());
        $("#txtFechaTransaccion").datepicker({ dateFormat: "yy/mm/dd" }).datepicker("setDate", new Date());
    }

    json_selec = new Array();

    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.selecChk', function () {


            var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas.fnGetData(pos);

            var moba = row.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_ALT) * parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR);//moneda base
            var moal = row.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR) / parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_ALT);//moneda alterna
            var valor_moba = parseFloat($("#txt_monto_base").attr("monto") == "" ? 0 : $("#txt_monto_base").attr("monto"));
            var valor_moal = parseFloat($("#txt_monto_alt").attr("monto") == "" ? 0 : $("#txt_monto_alt").attr("monto"));




            if ($(this).is(":checked")) {

                $(this).parent().parent().addClass('selected');

                valor_moba += moba;
                valor_moal += moal.Redondear(2);
                json_selec.push(row);

            } else {

                $(this).parent().parent().removeClass('selected');

                valor_moba -= moba;
                valor_moal -= moal.Redondear(2);
                json_selec.filter(function (e, f) {
                    if (e == row) { json_selec.splice(f, 1); }
                });

            }

            $("#txt_monto_base")
                .val("S/." + formatoMiles(valor_moba))
                .attr("monto", valor_moba.Redondear(2));
            $("#txt_monto_alt")
                .val("US$." + formatoMiles(valor_moal))
                .attr("monto", valor_moal.Redondear(2));
        });


        //$('#tblBandeja tbody').on('click', '.detDoc', function () {

        //    var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
        //    var row = oTableDeudas.fnGetData(pos);

        //    var id = row.CODIGO;
        //    var nTr = $(this).parents('tr')[0];

        //    if (oTableDeudas.fnIsOpen(nTr)) {
        //        /* This row is already open - close it */
        //        this.src = "recursos/img/details_open.png";
        //        oTableDeudas.fnClose(nTr);
        //    }
        //    else {
        //        /* Open this row */
        //        this.src = "recursos/img/details_close.png";
        //        //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

        //        oTableDeudas.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
        //        oTableDeudas.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
        //        $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
            
        //        $.ajax({
        //            type: "POST",
        //            url: "vistas/cp/ajax/cpmPGCB.ashx?flag=4.5&factura=" + id,
        //            async: true,
        //            success: function (datos) {
                        
        //                var str = "";
        //                var resb = "";
        //                if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
        //                else {
        //                    resb += "<table id='tblBandejaDetalleF" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'>";
        //                    resb += "<thead>";
        //                    resb += '<tr align="center">';
        //                    resb += "<th>FECHA</th>";
        //                    resb += "<th>ORIGEN</th>";
        //                    resb += "<th>DESTINO</th>";
        //                    resb += "<th>FORMA_PAGO</th>";
        //                    resb += "<th>DOCUMENTO</th>";
        //                    resb += "<th>MONTO</th>";
        //                    resb += "</tr>";
        //                    resb += "</thead>";
        //                    resb += "</table>";

        //                    $('#c' + id).html(resb);

        //                    cargatablavaciaDetalleF("tblBandejaDetalleF" + id, $.parseJSON(datos));
        //                }
        //            },
        //            complete: function () { Desbloquear("ventana"); }
        //        });

        //    }

        //});

        //function fnFormatDetails(nTr, id) {
        //    //var aData = oTable.fnGetData(nTr);
        //    var sOut = '<div id="c' + id + '"></div>';
        //    return sOut;
        //}
    }

    var eventos = function () {

        var cboEmpresa = $('#slcEmpresa');
        var cboEsta = $('#slcEstablec');
        var cboCrBa = $('#slcCredBanc');
        var cboComis = $("#txtComisiones");

        cboEmpresa.on('change', function () {            
            fillcboMoneda();
            fillcboEstablecimiento();
            oTableDeudas.fnClearTable();
            $("#cbo_OrigenPago").attr("disabled", true);
            $("#spnMonto").html('');
            $("#spnMontoTotal").html('');     
            $('#slcCredBanc').val("val", "");
        });

        cboEsta.on('change', function () {
            console.log(inicio);
            //oTableDeudas.fnClearTable();
            //$("#cbo_OrigenPago").attr("disabled", true);
            //$('#slcCredBanc').val("val", "");
            //$("#spnMonto").html('');
            //$("#spnMontoTotal").html('');     
            //cboCrBa.empty();
            //cboCrBa.html("<option></option>");
            //cboCrBa.select2('data', null);                
            
        });
       
        cboCrBa.on('change', function () {
            $("#cbo_OrigenPago").attr("disabled", false);
            var valorActual = this.value;
            if (dataCreditos!==undefined){
                var objActual = dataCreditos.filter(function (item) {
                    return item.CODIGO === valorActual;
                })[0];
                $("#spnMonto").html(objActual.SMONEDA + formatoMiles(objActual.MONTO));
                $("#spnMontoTotal").html(objActual.SMONEDA + formatoMiles(objActual.TOTAL));

                vg_moneda_base = objActual.ES_MONEDA_BASE;
                vg_nombre_banco = objActual.BANCO_COMPLETO;
                vg_codigo_banco = objActual.BCO_CODE;
                vg_tipo = objActual.TIPO;
            }
            
            obtenerCuotas();            
           
        });

        $("#txtComisiones,#txtMonto").change(function () {
            if (parseFloat(cboComis[0].value) > 0) {
                $("#divMontoAgregado").css({ "display": "block" });
                $("#montoNotaAgregado").html(cboComis[0].value);
                $("#montoTotalAgregado").html(formatoMiles(sumaTotal()));
            } else {
                $("#divMontoAgregado").css({ "display": "none" });
                $("#montoNotaAgregado").html("");
                $("#montoTotalAgregado").html("");
            }
        });

        $("#btnCtc").click(function () {
            if (vErrors(["txt_TC"]))
                obtenerCuotas();
        });

        $("#txt_TC").keypress(function (e) {
            if (e.keyCode == 13) {
                if (vErrors(["txt_TC"]))
                    obtenerCuotas();
            }
        });



        $("#btnGrabar").click(function () { pagar(); });

    }


    function sumaTotal() {
        var comisiones = $("#txtComisiones").val().split(",").join("");
        var monto = $("#txtMonto").val().split(",").join("");
        return parseFloat(monto == "" ? 0 : monto) + parseFloat(comisiones == "" ? 0 : comisiones)

    }

    return {
        init: function () {
            tipoCambio();
            plugins();
            eventos(); 
            fillcboEmpresa();
            fillcboEstablecimiento();                      
            funcionalidad();
            cargainicial();
            
        
        }
    };
}();



function cargatablavaciaDetalleF(id, json) {

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

var cade_pagar = "";

function devOpcion(x) { return 5 % (Math.abs(((x % 2) - 1) * x / 2) + 1) + 1; } //obtiene el numero de la opcion seleccionada

function pagar() {

    cade_pagar = "";
    var p_empresa = $("#slcEmpresa").val();
    var p_user = $("#ctl00_txtus").val();
    var cantidad_doc_venta = json_selec.length;
    var vValor = (parseFloat($("#txtMonto").attr("monto")) == 0.00) + 2 * (json_selec.length == 0) + 4 * (vErrorBodyAnyElement(".obligatorio"));
  

    if (vValor) {      

        switch (devOpcion(vValor)) {

            case 1:
                infoCustom2("El monto no puede ser 0!");
                $("#txtMonto").pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
                break;
            case 2:
                infoCustom2("No se ha seleccionado ninguna cuota a pagar!");
                $($("#tblBandeja").parent("div")).pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
                break;
            case 3:
                alertCustom("Ingrese los campos obligatorios!");
                break;

        }   

    } else {     

            var json_ordenado = json_selec.sort(function (a, b) {

                if (a.FECHA_VCTO.order == b.FECHA_VCTO.order) {
                    return a.POR_PAGAR - b.POR_PAGAR;
                } else {
                    return a.FECHA_VCTO.order - b.FECHA_VCTO.order;
                }
            });


            var monto = parseFloat($("#txtMonto").val().split(",").join(""));

            var ind = false;

            var ind_tipo = $("#cbo_OrigenPago").val().substring(0, 1);

            var codigo_cred = $('#slcCredBanc').val();
                json_ordenado.filter(function (e) {

                    var monto_pb = "";
                    var monto_pp = "";
                    var monto_pa = "";
                    var moneda;


                    if ($(".moneda.activo :selected").attr("tipo") == "MOBA") {

                        monto_pb = parseFloat(vg_moneda_base == "N" ? (e.POR_PAGAR_ALT * parseFloat($("#txt_TC").val())) : e.POR_PAGAR).toFixed(2);
                        monto_pp = parseFloat(monto_pb);


                    } else {

                        monto_pa = parseFloat(vg_moneda_base == "S" ? (e.POR_PAGAR / parseFloat($("#txt_TC").val())) : e.POR_PAGAR_ALT).toFixed(2);
                        monto_pp = parseFloat(monto_pa);


                    }

                    monto -= monto_pp;



                    if (monto >= 0) {
                        cade_pagar += ("|" + codigo_cred + "," + e.NCUOTA + "," + (monto_pb || 0) + ',' + (monto_pa || 0) + ",S");
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
                            cade_pagar += ("|" + codigo_cred + "," + e.NCUOTA + "," + (monto_pb || 0) + ',' + (monto_pa || 0) + ",N");
                        }
                    }
                  

                });




                //var p_caja = "";         
                var p_caja = $("#cbo_Det_Origen").val(); // origen
                var cod_ape = "";
                var p_moneda = $("#cbo_moneda").val();
                var medio_pa = $("#cboMedioPago").val();
                var p_scsl = $("#slcEstablec").val();
                var p_fecha_pago = $("#txtFechaPago").val();
                var p_destino = $("#cbDestino :selected").html();
                var p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
                var p_flag = 1;
                var adicional = parseFloat($("#txtComisiones").val());
                var tipo = $("#cbo_moneda :selected").attr("tipo");
                var valor_ = parseFloat($(".monto_sele[tipo = " + tipo + "]").attr("monto"));
                var pagado = (valor_ == parseFloat($("#txtMonto").attr("monto")) ? 'S' : 'N');

                var det_desc = "", pidm_cta = "", cta = "", compl = "";

                if (ind_tipo == "B") {


                    pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
                    cta = $("#cbo_Det_Origen").val();
                    compl = "S";
                    p_flag = 1.5;

                    switch ($("#cboMedioPago").val()) {
                        case "0003": //transferencia

                            det_desc = "*PAGO " + vg_tipo + " BANCO " + vg_nombre_banco;

                            break;
                    

                    }
                } else if (ind_tipo == "C") {



                    cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");

                }

                var descripcion = ind_tipo == "C" ? "PAGO CREDITO BANCARIO" : det_desc;
           

                $.ajax({
                    type: "post",
                    url: "vistas/CP/ajax/CPMPGCB.ASHX",
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
                        monto_total: $("#txtMonto").val().split(",").join(""),
                        tipo_cambio: $("#txt_TC").val(),
                        scsl: p_scsl,
                        PAGADO_IND: pagado
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
                                    obtenerCuotas();
                                    json_selec = new Array();

                                    exito();
                                    if ($("#txtMonto").attr("placeholder").indexOf("max.") > -1)
                                        $("#txtMonto").attr("placeholder", "max. " + (parseFloat($("#txtMonto").attr("placeholder").split("max. ")[1]) - parseFloat($("#txtMonto").val())).toFixed(2))

                                    $("#txt_monto_base, #txt_monto_alt, #txtMonto").val("");
                                    $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);
                                    $(".gen").remove();
                                    $("#form_medioPago").css("display", "block")
                                    $("#divMontoAgregado").css("display", "none")

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

           
        }    

}


StringMediosPago = "";

function cargaMediosDePago() {


    $.ajaxSetup({ async: false });
    $.post("vistas/CP/ajax/CPMPGCB.ASHX", { flag: 2 },
      function (res) {
          if (res != null && res != "" && res.indexOf("error") < 0) {


              StringMediosPago = res;

          }

      });
    $.ajaxSetup({ async: true });



}


function limpiaCampos() {
    $("#cbDestino").html("<option></option>");
    $("#form_medioPago select").select2("val", "").change().attr("disabled", true);

    $("#form_medioPago input").attr("disabled", true);
    $("#cbo_OrigenPago").attr("disabled", false);
    $("#txtComisiones").val(0);
    $("#montoNotaAgregado,#montoTotalAgregado").html("0");
    $("#divMontoAgregado").css({ "display": "none" });

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
v_code = "";

var NBLCRBA = function () {
    let codMoneBase = mGetParametro("MOBA","CODIGO MONEDA BASE");
    let codMoneAlter = mGetParametro("MOAL", " CODIGO MONEDA ALTERNA");

    var plugins = function () {

        $("#slcEstablec,#slcCuenta,#slcMoneda,#slcEmpresa").select2();
    }

    var fillcboEmpresa = function () {
        var select = $('#slcEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nb/ajax/nbmcrba.ashx?flag=4',
            beforeSend: function () { Bloquear($(select.parents("div")[0])) },
            async: false,
            success: function (data) {

                if (data !== '') {
                    select.html(data);
                }

            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {

                Desbloquear($(select.parents("div")[0]));
            
            }
        });

    }

    var fillcboEstablecimiento = function () {
        var select = $('#slcEstablec');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#slcEmpresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                select.html("<option></option>");
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {

                Desbloquear($(select.parents("div")[0]));
            }
        });

    }

    var fillcboMoneda = function () {
        var select = $('#slcMoneda');
        $.ajax({
            type: "post",
            url: 'vistas/CP/ajax/CPMPGPR.ASHX?flag=MO&empresa=' + $('#slcEmpresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: false,
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

    var fillcboCuenta = function (p) {

        var select = $('#slcCuenta');
        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=6&empresapidm=" + $("#slcEmpresa :selected").attr("pidm") + "&banco=",
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== '') {
                    select.html(data);
                }
                if (p !== 0.5) {
                    select.select2("val", "").change();
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Cuentas.');
            },
            complete: function () {

                Desbloquear($(select.parents("div")[0]));              

            }
        });

    }

    var eventos = function () {

        var cboEmpresa = $('#slcEmpresa');
        var cboCuen = $("#slcCuenta");
        var cboMone = $("#slcMoneda");
        var cboEsta = $('#slcEstablec');

        cboEmpresa.change(function () {
            fillcboEstablecimiento();
            fillcboMoneda();
            fillcboCuenta(1);
        });

        cboCuen.change(function () {
            if (this.value !== "")
                cboMone.select2("val", this.selectedOptions[0].getAttribute("moneda")).change();
            
        });        

        $("#btnFiltrar").click(function () {
            obtenerCreditos();
        });
    };

    var obtenerCreditos = function () {

        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=L&empresa=" + $('#slcEmpresa').val() + "&stbl=" + $('#slcEstablec').val() + "&cuenta=" + $("#slcCuenta").val() + "&empresapidm=" + $("#slcEmpresa :selected").attr("pidm"),
            contentType: "application/json;",
            beforeSend: function () { Bloquear("divTabla"); },
            async: true,
            dataType: "json",
            success: function (datos) {
                oTableL.fnClearTable();
                if (datos.length > 0) {
                    oTableL.fnAddData(datos);
                    cambiaInfoDeuda();
                }
                else {
                    $("#lblMoneBase").text("-");
                    $("#lblMoneAlter").text("-");
                }
            },
            error: function (msg) {
                alertCustom("Ocurrió un error al listar los Creditos Bancarios!");
                console.log("Error: " + msg.responseText);
            },
            complete: function () {
           
                Desbloquear("divTabla");
            }
        });

    }

    var cambiaInfoDeuda = function () {
        

        if (oTableL.length > 0) {

            var tablaCreditos = oTableL.fnGetData();

            if (tablaCreditos.filter(x => x.MONE_CODE == codMoneBase).length > 0) {
                var deduaSoles = tablaCreditos.filter(x => x.MONE_CODE == codMoneBase).map(x => parseFloat(x.TOTAL) - parseFloat(x.MONTO_AMORTIZADO)).reduce((y, z) => (parseFloat(y) + parseFloat(z)), 0);
                var simbMonedaBase = tablaCreditos.filter(x => x.MONE_CODE == codMoneBase)[0].SMONEDA;
            } else {
                deduaSoles = 0;
                simbMonedaBase = "";
            }


            if (tablaCreditos.filter(x => x.MONE_CODE == codMoneAlter).length > 0) {
                var deduaDolares = tablaCreditos.filter(x => x.MONE_CODE == codMoneAlter).map(x => parseFloat(x.TOTAL) - parseFloat(x.MONTO_AMORTIZADO)).reduce((y, z) => (parseFloat(y) + parseFloat(z)), 0);
                var simbMonedaAlter = tablaCreditos.filter(x => x.MONE_CODE == codMoneAlter)[0].SMONEDA;
            } else {
                simbMonedaAlter = "";
                deduaDolares = 0;
            }        
   
            $("#lblMoneBase").text(simbMonedaBase + formatoMiles(deduaSoles));
            $("#lblMoneAlter").text(simbMonedaAlter + formatoMiles(deduaDolares));

        }
        else {
            $("#lblMoneBase").text("-");
            $("#lblMoneAlter").text("-");
        }
  



    }

    var iniciaTablaVacia = function () {
        
       oTableL= $("#tblBandeja").dataTable({
            data: null,
            columns: [

                {
                    data: "NRO_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {

                    },
                    width: '15%'
                },

                {
                    data: "BANCO",
                    createdCell: function (td, cellData, rowData, row, col) {

                    }

                },
                {
                    data: "FECHA_INGRESO",
                   type:"fecha"

                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {

                    },
                    width: '5%'
                },
                {
                     data: "NRO_CUOTAS",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css({ 'text-align': 'center' });
                     },
                    width:'4%'
                 },
                {
                    data: "TEA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({ 'text-align': 'center' });
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var smoneda = rowData.SMONEDA;
                        $(td).css({ 'text-align': 'right' });
                        var valor = cellData;
                        $(td).html(smoneda + " " + formatoMiles(valor));
                    }
                },
                 {
                     data: "INTERES",
                     createdCell: function (td, cellData, rowData, row, col) {
                         var smoneda = rowData.SMONEDA;
                         $(td).css({ 'text-align': 'right' });
                         var valor = cellData;
                         $(td).html(smoneda + " " + formatoMiles(valor));
                     }
                 },
                  {
                      data: "TOTAL",
                      createdCell: function (td, cellData, rowData, row, col) {
                          var smoneda = rowData.SMONEDA;
                          $(td).css({ 'text-align': 'right' });
                          var valor = cellData;
                          $(td).html(smoneda + " " + formatoMiles(valor));
                      }
                  },
               
                {
                    data: "TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {

                    },
                    width: '10%'
                },
                 {
                     data: "CUOTAS_PAGADAS",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css({ 'text-align': 'center' });
                     }
                 },
                {
                    data: "MONTO_AMORTIZADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var smoneda = rowData.SMONEDA;
                        $(td).css({ 'text-align': 'right' });
                        var valor = cellData;
                        $(td).html(smoneda + " " + formatoMiles(valor));
                    }
                }
            ]
        });        

       $("#tblBandeja tbody").on('click', 'tr', function () {

           if ($(this).hasClass('selected')) {
               $(this).removeClass('selected');

           }
           else {
               oTableL.$('tr.selected').removeClass('selected');
               $(this).addClass('selected');

               var pos = oTableL.fnGetPosition(this);
               var row = oTableL.fnGetData(pos);
               var code = row.CODIGO;
               window.location.href = '?f=nbmcrba&codigo=' + code;

           }



       });


    }
    
    return {
        init: function () {
            plugins();     
            fillcboEmpresa();          
            eventos();
            iniciaTablaVacia();
            $('#slcEmpresa').change();
        }
    }

}();


var NBMCRBA = function () {

    var plugins = function () {

        $("#slcEstablec,#slcBco,#slcCuenta,#slcMoneda,#slcTipoPr,#slcEmpresa,#cbo_Det_Origen,#cbo_OrigenPago").select2();
        $("#txtFecha").datepicker();
        $("#txtCuotas").inputmask({ "mask": "9", "repeat": 3, "greedy": false });
        $("#txtMonto,#txtTea").keypress(function (e) { return (ValidaDecimales(e, this, 3)); })    
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
                }

            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {
                if (typeof (dataCredito) !== "undefined") { select.select2("val", dataCredito.CTLG_CODE).change(); }
                Desbloquear($(select.parents("div")[0]));
            }
        });

    }

    var fillcboEstablecimiento = function () {
        var select = $('#slcEstablec');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#slcEmpresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.html("<option></option>");
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {
                if (typeof (dataCredito) !== "undefined") { select.select2("val", dataCredito.SCSL_CODE) }
                Desbloquear($(select.parents("div")[0]));
            }
        });

    }

    var fillcboBco = function () {
        var select = $('#slcBco');
        $.ajax({
            type: "post",
            url: "vistas/NC/estereotipos/ajax/Adicionales.ASHX?flag=9",
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($(select.parents("div")[0])); },
            async: true,
            success: function (datos) {
                select.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            select.append('<option></option>');
                        }
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Bancos.');
                error = msg.responseText;
            },
            complete: function () {
                if (typeof (dataCredito) !== "undefined") { select.select2("val", dataCredito.BCO_CODE).change() }
                Desbloquear($(select.parents("div")[0]));
            }
        });

    }

    var fillcboMoneda = function () {
        var select = $('#slcMoneda');
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

    var fillcboCuenta = function (p) {

        var select = $('#slcCuenta');
        if ($("#slcEmpresa :selected").attr("pidm") !== undefined) {
            $.ajax({
                type: "post",
                url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=6&empresapidm=" + $("#slcEmpresa :selected").attr("pidm") + "&banco=" + ($("#slcBco").val() === null ? "" : $("#slcBco").val()),
                beforesend: function () { Bloquear($(select.parents("div")[0])); },
                contenttype: "application/json",
                datatype: "json",
                async: true,
                success: function (data) {
                    if (data !== '' && data !== 'error') {
                        select.html(data);
                    }else {
                        select.html("<option></option>");
                    }
                },
                error: function (msg) {
                    alertCustom('Error al cargar Cuentas.');
                },
                complete: function () {
                    if (typeof (dataCredito) !== "undefined") { select.select2("val", dataCredito.CUENTA_CODE).change() }
                    Desbloquear($(select.parents("div")[0]));
                }
            });
        }
    }

    var iniciaTabla = function (JSONData) {

        oTable = $("#tblBandeja").removeAttr("style")
            .dataTable(
            {
                data: JSONData,
                columns: [

                    {
                        data: "NCUOTA",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css({ 'text-align': 'right', 'background-color': 'gainsboro' });
                        },
                        width: '5%'
                    },

                    {
                        data: "FECHA_VCTO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center').attr("data-date-format", "dd/mm/yyyy");
                        },
                        type: "fecha"

                    },
                    { //dias
                        data: "DIAS",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css({ 'text-align': 'center', 'background-color': 'gainsboro' });
                        },
                    
                    },
                    {
                        data: "CAPITAL",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css({ 'text-align': 'right', 'background-color': 'gainsboro' });
                            var valor = cellData;
                            $(td).html(formatoMiles(valor));
                        }
                    },
                     {
                         data: "AMORTIZA",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css({ 'text-align': 'right' });
                             var valor = cellData;
                             $(td).html(formatoMiles(valor)).attr("data-type-decimal", true);
                         }

                     },
                     {
                         data: "INTERES",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css({ 'text-align': 'right', 'background-color': 'gainsboro' });
                             var valor = cellData;
                             $(td).html(formatoMiles(valor));
                         }
                     },
                     {
                         data: "COMISIONES",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css({ 'text-align': 'right', 'background-color': 'gainsboro' });
                             var valor = cellData;
                             $(td).html(formatoMiles(valor));
                         }
                     },
                     {
                         data: "IMPORTE_CUOTA",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css({ 'text-align': 'right' });
                             var valor = cellData;
                             $(td).html(formatoMiles(valor)).attr("data-type-decimal", true);;
                         }
                     },
                       {
                           data: "FECHA_PAGO",
                           createdCell: function (td, cellData, rowData, row, col) {
                               $(td).css({ 'text-align': 'center', 'background-color': 'gainsboro' });
                           },
                           type: "fecha"
                       },

                ],
                //"scrollY": "45vh", "scrollCollapse": true,
                "paging": false,
                "sort":false,
                "dom": '<"top cabecera"f><t><"clear">',
                info: false,
                preDrawCallback: function (settings) {
                    var api = this.api();
                    var rows = api.rows({ page: 'current' }).nodes();
                    var last = null;
                    var factor = 0;
                    var difFechas = 0;
                    var fecha = "";
                    var fechaActual = "";
                    var colDecimales = [2,3, 4, 5, 6, 7]

                    if ($("#txtCuotas").val() == api.data().length) {

                        for (var i = 0; i < colDecimales.length; i++) {

                            api.column(colDecimales[i], { page: 'current' }).data().filter(function (e, d) {

                                var valor = e;

                                if (colDecimales[i] == 2 && api.data()[d].FECHA_VCTO !== "" && $("#txtFecha").val() !== "") {

                                    if (d == 0) {
                                        fecha = new Date($("#txtFecha").val().split("/").reverse().join("/"));
                                    } else {
                                        fecha = new Date((api.data()[d - 1].FECHA_VCTO).split("/").reverse().join("/"));
                                    }

                                    fechaActual = new Date((api.data()[d].FECHA_VCTO).split("/").reverse().join("/"));

                                    difFechas = DateDiff(fechaActual, fecha);

                                    api.data()[d].DIAS = difFechas;

                                    valor = difFechas;

                                }

                                if (colDecimales[i] == 5  && $("#txtTea") !== "" ) {                               
                                 
                                    factor = Math.pow(((parseFloat($("#txtTea").val()) / 100) + 1), (api.data()[d].DIAS / 360)) - 1;

                                    valor = api.data()[d].CAPITAL * factor;
                                    
                                    api.data()[d].INTERES = valor;

                                }

                                if (colDecimales[i] == 3 && d > 0) {

                                    valor = parseFloat(api.data()[d - 1].CAPITAL) - parseFloat(api.data()[d - 1].AMORTIZA);
                                    api.data()[d].CAPITAL = valor;

                                }

                                if (colDecimales[i] == 4 && d === parseInt($("#txtCuotas").val()) - 1) {
                                    valor = api.data()[d].CAPITAL;
                                    api.data()[d].AMORTIZA = valor;
                                    $($(rows).eq(d).children()[colDecimales[i]]).addClass("read_only").css({ 'text-align': 'right', 'background-color': 'gainsboro' });
                                }

                                $($(rows).eq(d).children()[colDecimales[i]]).html(colDecimales[i] === 2 ? valor : formatoMiles(valor));

                            });
                        }
                    }




                },
                footerCallback: function (row, data, start, end, display) {
                   
                        var api = this.api(), data;
                        var n = 4;
                        if (data.length == 0) {
                            for (var i = 1; i <= n; i++) {                      
                                $(api.column(i+3).footer()).html(
                                   "0"
                                );                                
                            }
                        } else {                 

                            for (var i = 1; i <= n; i++) {
                                if (this.api().data().length > 0) {
                                    // Total over all pages
                                    total = api
                                        .column(i+3)
                                        .data()
                                        .reduce(function (a, b) {
                                            return parseFloat(a) + parseFloat(b);
                                        });

                                    // Update footer
                                    $(api.column(i+3).footer()).html(
                                       formatoMiles(total)
                                    );              
                                }

                            }                   
                
                    }
                }
            }
            );

        editaTabla();

    }

    var editaTabla = function () {

        oTable.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [null,
                    {
                        cssclass: "required",
                        tooltip: 'Doble Click para cambiar',
                        type: 'text',
                        accionEvento: function (e) {
                            var form = $(this).parent();
                            if ((e.type == "keydown" && e.keyCode == 13) || e.type =='hide') {
                                setTimeout(function () {                                
                                    form.submit();
                                },300);
                            }
                          
                           
                        },
                        onblur: function (f) {                                                                                 
                        }
                    }, null,null,
                     {
                         cssclass: "required number",
                         tooltip: 'Doble Click para cambiar',
                         type: 'text',
                         onblur: 'submit',
                         fnOnCellUpdated: function (sStatus, sValue, settings) {
                         }
                     },
                     null,
                    null,
                     {
                         cssclass: "required number",
                         tooltip: 'Doble Click para cambiar',
                         type: 'text',
                         onblur: 'submit'
                     },

                    null

            ]
        });
    }

    var eventos = function () {

        var cboEmpresa = $('#slcEmpresa');
        var cboBco = $('#slcBco');
        var cboCuen = $("#slcCuenta");
        var cboMone = $("#slcMoneda");

        $("#grabarR").click(function () { //completar

            $("#divModalCajaBanco").modal('show');

        });


        $("#btnAceptar").click(function () {

            if (vErrors(["cbo_OrigenPago", "cbo_Det_Origen"])) {

                $.ajax({
                    type: "post",
                    url: "vistas/nb/ajax/nbmcrba.ashx?flag=3&code=" + v_code + "&tipo=" + $("#cbo_OrigenPago").val().substring(0, 1) +
                          "&destino=" + $("#cbo_Det_Origen").val() + "&doc=" + ($("#cbo_OrigenPago").val() == 'Caja' ? $("#cbo_Det_Origen :selected").attr("codigo") : $("#txtNroCredito").val()),
                    beforesend: function () { Bloquear("ventana"); },
                    async: true,
                    success: function (data) {
                        if (data === "OK") {
                            exito();
                            let tablaCredito = oTable.fnGetData()
                            let sumaImporte = tablaCredito.map(x => x.IMPORTE_CUOTA).reduce((y, z) => (parseFloat(y) + parseFloat(z)), 0);
                            let simboloMone = $("#slcMoneda :selected").attr("simbolo");

                            $("#lblCapAmortizado").text(simboloMone + "0");
                            $("#lblIntereses").text(simboloMone + "0");
                            $("#lblSaldo").text(simboloMone + formatoMiles(sumaImporte));
                            $("#infoPagoCredito").show()

                            $(".form-actions , #btn_generar,.dpago").remove();
                            $("#ventana input, #ventana select").attr("disabled", 1);                    
                        }
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("ventana");
                        $("#divModalCajaBanco").modal('hide');

                    }
                });
            } 

        });



        $('#cbo_OrigenPago').change(function () {

            var OrigenActual = $(this).val(); 

            switch (OrigenActual) {

                case "Caja":                 
                    $("#lbl_detalle1").html("Caja");
                    $("#cbo_Det_Origen").attr("data-placeholder", "CAJA").select2("val", "").change();
                    $("#divNro").addClass("hide");
                  
                    $.ajaxSetup({ async: false });
                    $.post("vistas/CP/ajax/CPMPGCB.ASHX", { flag: 7, empresa: $("#slcEmpresa").val(), usuario: $("#ctl00_txtus").val(), establec: $("#slcEstablec").val() },
                         function (res) {
                             if (res != null && res != "" && res.indexOf("error") < 0) {

                                 $("#cbo_Det_Origen").html(res).attr("disabled", false);

                             } else {
                                 $("#cbo_Det_Origen").html("<option></option>").attr("disabled", true);

                             }
                         });
                    $.ajaxSetup({ async: true });

                    break;

                case "Banco":
                    $("#lbl_detalle1").html("Cuenta Destino");
                    $("#cbo_Det_Origen").attr("data-placeholder", "CUENTA BANCARIA").select2("val", "").change();
                    $("#divNro").removeClass("hide");
                    $.post("vistas/CP/ajax/CPMPGCB.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm"), banco: "", moneda: "" },
                      function (res) {
                          if (res != null && res != "" && res.indexOf("error") < 0) {
                              $("#cbo_Det_Origen").html(res).attr("disabled", false)
                          } else {
                              $("#cbo_Det_Origen").html("<option></option>").attr("disabled", true);
                          }

                      });
                    $.ajaxSetup({ async: true });
                    break;

            }
        });

        cboEmpresa.change(function () {
            fillcboEstablecimiento();
            fillcboMoneda();
            fillcboCuenta(1);
        });

        cboBco.change(function () {       
                fillcboCuenta(0);            
        });

        cboCuen.change(function () {
            
            if (this.value !== "") {
                var mode_code = this.selectedOptions[0].getAttribute("moneda");
                setTimeout(function () { cboMone.select2("val", mode_code ).change().attr("disabled", 1); }, 800);
            }
            else
                cboMone.attr("disabled", 0);

        });

        cboMone.change(function () {
            if (this.value !== "") {
                $("#sMoneda").text(this.selectedOptions[0].getAttribute("simbolo"));
            }

        });



        $("#btn_Generar").click(function () {

            if (!vErrorBodyAnyElement(".obligatorio")) {

                Bloquear($("#ventana"), "Generando Tabla ... ");

                setTimeout(function () {

                    var cuotas = $("#txtCuotas").val();
                    var JSONData = new Array();
                    var fecha = $("#txtFecha").datepicker('getDate');
                    var dPago = $("#txtDPago").val();
                    var nuevaFecha = new Date(fecha.getFullYear(), fecha.getMonth(), dPago);   
                    for (var i = 1; i <= cuotas; i++) {                       
                        nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
                        var nvaFechaFormt = nuevaFecha.format("d/MM/yyyy");
                        if (i == 1) {
                            JSONData.push({ "NCUOTA": i, "FECHA_VCTO": nvaFechaFormt, "DIAS":0,"CAPITAL": $("#txtMonto").val(), "AMORTIZA": 0, "INTERES": 0, "COMISIONES": 0, "IMPORTE_CUOTA": 0, "FECHA_PAGO": "" });
                        } else {
                            JSONData.push({ "NCUOTA": i, "FECHA_VCTO": nvaFechaFormt, "DIAS":0,"CAPITAL": 0, "AMORTIZA": 0, "INTERES": 0, "COMISIONES": 0, "IMPORTE_CUOTA": 0, "FECHA_PAGO": "" });
                        }
                    }

                    if (typeof (oTable) === "undefined")
                        iniciaTabla(JSONData);
                    else {
                       /* data = oTable.fnGetData();

                        data[0].CAPITAL = $("#txtMonto").val();

                        if (cuotas > data.length) {

                            //agregar 

                            var faltante = JSONData.slice(data.length, parseInt(cuotas));

                            JSONData = data.concat(faltante);


                        } else {

                            //quitar

                            data.splice(parseInt(cuotas));
                            JSONData = data;

                        }
                        */

                        JSONData[0].CAPITAL = $("#txtMonto").val();

                        oTable.fnClearTable();
                        oTable.fnAddData(JSONData);
                        editaTabla();
                       // oTable.fnDraw();
                    }


                    Desbloquear($("#ventana"));
                    $("#ventana .form-actions").css({ "display": "block" });

                }, 200);

            }

        });


        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("CREDITO BANCARIO - " + $("#slcEstablec :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html("<p>EMPRESA: " + $("#slcEmpresa :selected").html() + "</p><p>ESTABLECIMIENTO: " + $("#slcEstablec :selected").html() +
                              "<p>CUENTA: " + $("#slcCuenta :selected").html() + "</p><p>TIPO DE CREDITO: " + $("#slcTipoPr :selected").html() +
                               "<p>MONTO: " + $("#sMoneda").text() + " "+$("#txtMonto").val() + "</p><p>N° CUOTAS: " + $("#txtCuotas").val());
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
        });

    }

    var cargaInicial = function () {
        $("#infoPagoCredito").hide()
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {

            $("#grabarA").html("<i class='icon-pencil'></i> Modificar");
            $("#grabarA").attr("onclick", "javascript:Actualizar();");
            v_code = cod;

            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=L&code=" + cod,
                contentType: "application/json;",
                async: false,
                dataType: "json",
                success: function (datos) {
                    if (datos.length > 0) {
                        dataCredito = datos[0];

                        if (dataCredito.COMPLETO == 'S') {
                            $(".form-actions , #btn_Generar,.dpago").remove();
                            $("#ventana input, #ventana select").attr("disabled", 1);
                        }
                        $("#grabarR").removeAttr("style");
                        $("#txtCuotas").val(dataCredito.NRO_CUOTAS);
                        $("#slcTipoPr").select2("val", dataCredito.TIPO_CODE);
                        $("#txtTea").val(dataCredito.TEA);
                        $("#txtMonto").val(dataCredito.MONTO);
                        $("#txtFecha").val(dataCredito.FECHA_INGRESO);
                        $("#txtNroCredito").val(dataCredito.NRO_CREDITO);

                        //Info Deuda Crédito
                        let simboloMone = dataCredito.SMONEDA;
                        let capAmortizado = dataCredito.MONTO_AMORTIZADO - (dataCredito.INTERES_PAGADO + dataCredito.COMISION_PAGADO);
                        let intereses = dataCredito.INTERES_PAGADO + dataCredito.COMISION_PAGADO;
                        let saldo = dataCredito.TOTAL - dataCredito.MONTO_AMORTIZADO;
                        $("#lblCapAmortizado").text(simboloMone + formatoMiles(capAmortizado));
                        $("#lblIntereses").text(simboloMone + formatoMiles(intereses)); 
                        $("#lblSaldo").text(simboloMone + formatoMiles(saldo));
                        $("#infoPagoCredito").show()


                    }
                },
                error: function (msg) {
                    alertCustom("Ocurrió un error al listar Credito Bancario!");
                    console.log("Error: " + msg.responseText);
                },
                complete: function () {
                    if (typeof (dataCredito) !== "undefined")
                        $.ajax({
                            type: "POST",
                            url: "vistas/NB/ajax/NBMCRBA.ASHX?flag=LD&code=" + cod,
                            contentType: "application/json;",
                            dataType: "json",
                            success: function (datos) {
                                if (datos.length > 0) {
                                    iniciaTabla(datos);
                                    $("#ventana .form-actions").css({ "display": "block" });
                                }
                            },
                            error: function (msg) {
                                alertCustom("Ocurrió un error al listar detalle de Credito Bancario!");
                                console.log("ErrorDetalle: " + msg.responseText);
                            }
                        });
                }
            });

        }


    }

    return {
        init: function () {
            plugins();
            eventos();
            cargaInicial();
            fillcboEmpresa();
            fillcboBco();
          

        }
    }

}();

function ObtenerArrayDetalle() {

    var jTabla = oTable.fnGetData();
    var nArray = new Array();
    
    for (var i = 0 ; i < jTabla.length ; i++) {
        //$.map(jTabla[0], function (el) { return el; }); //con jquery
        nArray.push(Object.keys(jTabla[i]).map(function (k) { return jTabla[i][k] }));
    }

    return nArray;

}

function grabar() {
    var cboEmpresa = $('#slcEmpresa');
    var cboBco = $('#slcBco');
    var cboCuen = $("#slcCuenta");
    var cboMone = $("#slcMoneda");
    var cboStbl = $("#slcEstablec");
    var data = new FormData();
    var detalle = ObtenerArrayDetalle().join(";");
    var ventana = $("#ventana");
    var validacion = Validar();
    if (validacion) {

        data.append('flag', '1');
        data.append('empresa', cboEmpresa.val());
        data.append('stbl', cboStbl.val());
        data.append('banco', cboBco.val());
        data.append('cuenta', cboCuen.val());
        data.append('empresapidm', cboEmpresa[0].selectedOptions[0].getAttribute("pidm"));
        data.append('cuota', $("#txtCuotas").val());
        data.append('tipo', $("#slcTipoPr").val());
        data.append('tea', $("#txtTea").val());
        data.append('moneda', cboMone.val());
        data.append('monto', $("#txtMonto").val());
        data.append('detalle', detalle);
        data.append('fecha', $("#txtFecha").val());
        data.append('nroCredito', $("#txtNroCredito").val());

        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCRBA.ASHX",
            contentType: false,
            data: data,
            beforeSend: function () { Bloquear(ventana); },
            processData: false,
            cache: false,
            success: function (response) {
                $("#grabarA").html("<i class='icon-pencil'></i> Modificar");
                $("#grabarA").attr("onclick", "javascript:Actualizar();");
                $("#grabarR").removeAttr("style");
                v_code = response;
                exito();
            },
            error: function (msg) {
                alerCustom("Ocurrió un error al grabar Credito Bancario!");
                console.log("Error:" + msg.responseText);
            },
            complete: function () { Desbloquear(ventana); }


        });
    }

}

function Actualizar() {
    var cboEmpresa = $('#slcEmpresa');
    var cboBco = $('#slcBco');
    var cboCuen = $("#slcCuenta");
    var cboMone = $("#slcMoneda");
    var cboStbl = $("#slcEstablec");
    var data = new FormData();
    var detalle = ObtenerArrayDetalle().join(";");
    var ventana = $("#ventana");
    var validacion = Validar();
    if (validacion) {
        data.append('flag', '2');
        data.append('code', v_code);
        data.append('empresa', cboEmpresa.val());
        data.append('stbl', cboStbl.val());
        data.append('banco', cboBco.val());
        data.append('cuenta', cboCuen.val());
        data.append('empresapidm', cboEmpresa[0].selectedOptions[0].getAttribute("pidm"));
        data.append('cuota', $("#txtCuotas").val());
        data.append('tipo', $("#slcTipoPr").val());
        data.append('tea', $("#txtTea").val());
        data.append('moneda', cboMone.val());
        data.append('monto', $("#txtMonto").val());
        data.append('detalle', detalle);
        data.append('fecha', $("#txtFecha").val());
        data.append('nroCredito', $("#txtNroCredito").val());

        $.ajax({
            type: "POST",
            url: "vistas/NB/ajax/NBMCRBA.ASHX",
            contentType: false,
            data: data,
            beforeSend: function () { Bloquear(ventana); },
            processData: false,
            cache: false,
            success: function (response) {
                if (response === "OK")
                    exito();
            },
            error: function (msg) {
                alerCustom("Ocurrió un error al actualizar Credito Bancario!");
                console.log("Error:" + msg.responseText);
            },
            complete: function () { Desbloquear(ventana); }


        });

    }
}

function Validar() {

    var r = false;
    var data = oTable.fnGetData();
    var ultimo = data[data.length - 1]
    var monto = data.reduce(function (a, b) {
        return ((a.AMORTIZA == undefined ? parseFloat(a) : parseFloat(a.AMORTIZA)) + parseFloat(b.AMORTIZA))
    });
    var c1 = data.length == $("#txtCuotas").val();
    var c2 = ultimo.NCUOTA == $("#txtCuotas").val();
    var c3 = ultimo.AMORTIZA == ultimo.CAPITAL;
    var c4 = monto.Redondear(2) == parseFloat($("#txtMonto").val()).Redondear(2);
    var c5 = data.map(o => o.AMORTIZA > 0).reduce((ob1, ob2) => (ob1 && ob2));
    var c6 = data.map(o => o.IMPORTE_CUOTA > 0).reduce((ob1, ob2) => (ob1 && ob2));

    r = r || !(c1) || !(c2) || !(c3) || !(c4) || !(c5) || !(c6);

    if (!c1)
        infoCustom2("El número de cuotas no coincide con la tabla!");

    if (!c2)
        infoCustom2("El N° de la última Cuota no coincide con el total!");

    if (!c3)
        infoCustom2("No se ha establecido una amortización por completo para el Capital!");

    if (!c4)
        infoCustom2("Los montos están desbalanceados!");

    if (!c5)
        infoCustom2("Los montos de CAP.AMORTIZA no pueden ser 0!");

    if (!c6)
        infoCustom2("Los montos de IMP.CUOTA no pueden ser 0!");

    return !r && !vErrorBodyAnyElement(".obligatorio");

}

var filtraBcoCta = function () {

    var optCuen = $("#slcCuenta > option");
    $('#slcBco > option').attr("disabled", true);
    for (var i = 0; i < optCuen.length; i++) {
        $('#slcBco > option[value=' + optCuen[i].getAttribute("banco") + ']').attr("disabled", false);
    }

}

//EMAIL
function cargarCorreos() {
    ObtenerCorreoUsuario();
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
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
    });
};

var ObtenerCorreoUsuario = function () {
    var email = "";
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ashx?OPCION=RU&ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                email = datos[0].EMAIL;
            } else {
                alertInfo("No se encontro ningun email para remitente!");
            }
        },
        complete: function () {
            $("#txtRemitente").val(email);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();

        var data = new FormData();

        data.append('OPCION', 'SENDMAIL');
        data.append('NREMITENTE', $('#txtNRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $("#datos_correo").html() +
                                    $("#tblBandeja")[0].outerHTML.replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;').replace("</table>",
                                    $(".dataTables_scrollFootInner table tr")[0].outerHTML+"</table>")
                    );
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            exito();
            $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            setTimeout(function () { $('#divMail').modal('hide'); }, 25);
        })
        .error(function () {
            alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
        });

    }
};

$("#divMail").on("show", function () {

    $("#modal_info").modal("hide");

});

$(".close_mail").on("click", function () {

    $("#modal_info").modal("show");

});

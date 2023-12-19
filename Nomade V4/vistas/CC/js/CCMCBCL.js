json_notacredito = new Array();
json_select_NotaCredito = new Array(); // notas de credito agregadas
json_anticipoCompensar = new Array();
json_select_AnticipoCompensar = new Array(); // notas de credito agregadas
var cade_pagar = "";
eventoModalHide = false;
StringMediosPago = "";
let json_nota_dcto = new Array(); //array que contiene la relacion entre nota y dcto
let ArrObjectValidacionNota = new Array();
let ArrObjectValidacionDocu = new Array();
let objComboDocumentos;
conNotaCredito = false;
jsonPersonas = null;
json_selec = new Array();
json_selec_nuevo = new Array();
bMonAlterna = false;
jsonRecalcular = new Array();
var no_rentencion = false;
var montoNC = 0;
var moneCode;
var prmtACON = "NO";//VERIFICA SI DESEA QUE SE GENERE O NO EL ASIENTO CONTABLE
const mediosPago = ['0001', '0003', '0005', '0006', '0020']; //PARA VERIFICAR EL NÚMERO DE OPERACIÓN O COD. DE AUTORIZACIÓN. DPORTA 16/08/2023
var CCLCBCL = function () {

    var plugins = function () {

        $("#cboempresa").select2();
        inifechas("txtFeIn", "txtFeFi");
        fnSetRangoDatePickerMesHoy("txtFeIn", "txtFeFi", true);
        console.log($('#txtFeIn').val());
        console.log($('#txtFeFi').val());
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
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
                select.empty();
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {

                select.multiselect('destroy');
                select.multiselect();

                Desbloquear($(select.parents("div")[0]));
            }
        });
    };

    var cargarClientes = function () {
        var select = $("#slcCliente")
        $.ajax({
            type: "post",
            url: "vistas/CC/ajax/CCMCBCL.ashx?flag=3.5&empresa=" + $('#cboempresa').val(),
            async: true,
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear($(select.parents("div")[0])); },
            success: function (data) {
                select.empty();
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        select.append('<option value="' + data[i].PIDM + '">' + data[i].RAZON_SOCIAL + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {
                $("#slcCliente").select2({
                    language: "es",
                    minimumInputLength: 3
                });

                //select.multiselect('destroy').multiselect({
                //    nonSelectedText: 'TODOS',
                //    enableFiltering: true,
                //    enableCaseInsensitiveFiltering: true,
                //    max_selected_options: 5
                //});

                Desbloquear($(select.parents("div")[0]));
            }
        });
        
    };

    var eventos = function () {
        $('#cboempresa').change(function () {
            cargarSucursales();
            cargarClientes();
        });

        $("#btnFiltrar").click(function () {

            $.ajax({
                type: "post",
                url: "vistas/CC/ajax/CCMCBCL.ashx?flag=L&empresa=" + $('#cboempresa').val() +
                    "&estable=" + ($("#slcEstablec").val() === null ? '' : $("#slcEstablec").val().toString()) +
                    "&cliente=" + ($("#slcCliente").val() === null ? '' : $("#slcCliente").val().toString()) +
                    "&fini=" + $('#txtFeIn').val() + "&ffin=" + $('#txtFeFi').val(),
                async: true,
                contenttype: "application/json",
                datatype: "json",
                beforeSend: function () { Bloquear($($("#tblCobroCl").parents("div")[0])); $("#btnFiltrar").attr("disabled", true); },
                success: function (data) {

                    oTablePagoPr.fnClearTable();

                    if (data.length > 0) {

                        oTablePagoPr.fnAddData(data);

                    } else {

                        infoCustom2("No se encontraron datos!");

                    }

                },
                error: function (msg) {
                    alertCustom('Error al cargar datos!');
                },
                complete: function () {
                    Desbloquear($($("#tblCobroCl").parents("div")[0]));
                    $("#btnFiltrar").attr("disabled", false);
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
                { data: "CLIENTE" },
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
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .html(formatoMiles(cellData))
                            .css({ "text-align": "right" });
                    }
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
                 {
                     data: "RECEPCION", createdCell: function (td, cellData, rowData, row, col) {
                         $(td)
                             .css({ "text-align": "left" });
                     }
                 },
                 {
                     data: null,
                     defaultContent: '',
                     createdCell: function (cell, cellData, row) {
                         if (row.FOTO != "") {
                             $(cell).append('<a class="btn glocat blue"><i class="icon-picture"></i></a>');
                         }
                         $(cell).css('text-align', 'center');

                     }
                 }

            ],
            stateSave: false,
            "sDom": 'TC<"clear">lfrtip',
            "sPaginationType": "full_numbers",
            "oTableTools": {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel "
                    }
            ]
            }
           , "paginate": true

        }
        oTablePagoPr = iniciaTabla('tblCobroCl', parms);
        actualizarEstilos();

     

    }

    var obtenerImagen = function (img) {
        $.ajax({
            type: "post",
            url: 'vistas/CC/ajax/CCMCBCL.ASHX',
            data: { flag: 'PI', RUTA_IMAGEN: img },
            async: true,
            beforeSend: function () { $('#divVerImagen').modal('show'); Bloquear($($("#imgProtesto").parents("div")[0]), "Obteniendo Imagen...") },
            success: function (res) {
                $('#imgProtesto').attr("src", res);
              
            },
            error: function (msg) {
                alertCustom('Error al cargar imagen.');
            },
            complete: function () {
                Desbloquear($($("#imgProtesto").parents("div")[0]));
            }
        });
    }

    var eventosTabla = function () {

        $("#tblCobroCl").on('click', '.glocat', function (e) {
            var img = $('#tblCobroCl').DataTable().row($(this).parents('tr')).data().FOTO;
            obtenerImagen(img);      
        });

        $('#tblCobroCl tbody').on('click', '.detDoc', function () {

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
                    url: "vistas/cp/ajax/cpmpgpr.ashx?flag=LA&codigo=" + id,
                    beforeSend: function () { Bloquear($('#c' + id.split(",").join(""))); },
                    async: true,
                    success: function (datos) {
                     
                        Desbloquear("ventana");
                        var str = "";
                        var resb = "";
                        if (datos.length < 1) { resb = "No hay datos disponibles!"; $('#c' + id.split(",").join("")).html(resb); }
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
                    complete: function () { Desbloquear($('#c' + id.split(",").join(""))); }


                });

            }

        });

        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id.split(",").join("") + '"></div>';
            return sOut;
        }

    }

    var cargatablaDetalleF = function (id, json) {

        oTableDeudasDetalle = $("#"+id).dataTable({
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
                         $(td).html(rowData.SMONEDA + " " + formatoMiles(rowData.MONTO));
                     }
                 },
                 {
                     data: "MONTO_TOTAL_DOC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(rowData.SMONEDA_ORIGEN + " " + formatoMiles(rowData.MONTO_TOTAL_DOC));
                     }
                 },
                 {
                     data: "FECHA_EMISION",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');
                     },
                     type: "fecha"
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

        $("#" + id).on('click', '.glocat', function (e) {
            var img = oTableDeudasDetalle.fnGetData();
            $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 'PI' },
                function (res) {
                    let ruta = res + img[0].FOTO;
                                
                    $('#imgProtesto').attr("src", ruta);
                    $('#divVerImagen').modal('show');
                });
                
                       
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

var CCMCBCL = function () {
      
    var plugins = function () {
        $('#cboClientes').select2();
        $('#cbo_OrigenPago').select2();
        $('#cboCtaEmpresa').select2();
        $('#cboMedioPago').select2();
        $('#cbo_appPago').select2();
        $('#cbo_Det_Origen, #cbo_moneda').select2();
        $("#txtMonto, #txtEfectivo, #txtVuelto").keypress(function (e) { return (ValidaDecimales(e, this, 2)); })
        $("#txt_TC").keypress(function (e) { return (ValidaDecimales(e, this, 4)); })
        var tc = parseFloat($("#txt_TC").val());
        $("#txtMonto").keyup(function () {
            var tc = parseFloat($("#txt_TC").val());
            var monto_actual = this.value;
            var moneda_activa_cod = $("select.moneda.activo").val();            
            var moneda_activa_tipo = $(".moneda.activo :selected").attr("tipo");   

            //DPORTA
            if (typeof (moneda_activa_tipo) == "undefined") {

                moneda_activa_cod = $("#cbo_moneda").val();

                if (moneda_activa_cod == "0002") {
                    let moba = "MOBA";
                    moneda_activa_tipo = moba;
                } else if (moneda_activa_cod == "0003") {
                    let moal = "MOAL";
                    moneda_activa_tipo = moal;
                }
            }

            var nTotaSoloNotas = json_select_NotaCredito.filter(obj => obj.MONE_CODE == moneda_activa_cod).map(obj => parseFloat(obj.MONTO_USABLE).Redondear(2))
                .concat(json_select_NotaCredito.filter(obj => obj.MONE_CODE !== moneda_activa_cod).map(obj => parseFloat(moneda_activa_cod == '0002' ? obj.MONTO_USABLE * tc : obj.MONTO_USABLE / tc).Redondear(2))).reduce((sum, obj) => (sum + obj), 0).Redondear(2);            
            //var montoSeleccionado = json_selec.map(obj => parseFloat(moneda_activa_tipo == 'MOBA' ? (obj.POR_PAGAR_ALTER * parseFloat($("#txt_TC").val())).Redondear(2) : obj.POR_PAGAR_ALTER)).reduce((sum, item) => (sum + item), 0).Redondear(2);
            var montoSeleccionado = (moneda_activa_tipo == 'MOBA') ? $('#txt_monto_base').attr('monto') : $('#txt_monto_alt').attr('monto');

            if (monto_actual.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_actual = this.value.replace(re, '');
            }            
            //DPORTA
            if (moneda_activa_cod != "") {
                if (parseFloat(monto_actual) < 0 || parseFloat(monto_actual) > (parseFloat(montoSeleccionado) - parseFloat(nTotaSoloNotas))) {
                    this.value = (montoSeleccionado - nTotaSoloNotas).Redondear(2);
                    let valor = this.value
                    if (valor < 0) {
                        $("#txtMonto").val("");
                    }
                } else {

                }  
            }
            
           
            $('#txtEfectivo').keyup();
        })
        $("#txt_TC").keyup(function () { if ($(this).val() < 1 || $(this).val() > 10) $(this).val(""); });
        inifechas("txtFeIn", "txtFeFi");
        $("#slcEmpresa").select2();

        $('#txtEfectivo').keyup(function () {
            var monto_cobrar = $('#txtMonto').val();

            if (monto_cobrar.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
                var re = /,/g;
                monto_cobrar = monto_cobrar.replace(re, '');
            }

            var efectivo_recibido = $(this).val();
            if (efectivo_recibido.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
                var re = /,/g;
                efectivo_recibido = efectivo_recibido.replace(re, '');
            }

            var aux_vuelto = false;

            if (parseFloat(efectivo_recibido) >= parseFloat(monto_cobrar)) {
                aux_vuelto = true;
            }

            if (aux_vuelto) {
                var vuelto = efectivo_recibido - monto_cobrar;
                $("#txtVuelto").val(formatoMiles(parseFloat(vuelto).toFixed(2)));
            } else {
                $("#txtVuelto").val("0.00");
            }
        });

    }

    var cargarCombos = function () {

        //COMBO APP MOVIL

        // CARGA DE CATALOGOS
        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#slcEmpresa").html(res);
                  var ctlg_code = ObtenerQueryString("ctlg_code");
                  if (ctlg_code !== undefined) {
                      $("#slcEmpresa").select2('val', ctlg_code).change();
                  }

               }
           });

        // EVENTOS COMBOS
        $("#slcEmpresa").change(function () {

            var valEmpresa = $(this).val();
                   
            limpiaCampos();

            cargarJsonEmpleado(valEmpresa);

            // CARGA DE ESTABLECIMIENTOS
            cargarSucursales(valEmpresa);
       
            filltxtcliente();

            // CARGA MONEDAS DE LA EMPRESA
            $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MO", empresa: valEmpresa },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_moneda").html(res)
                                html_monedas = res;
                           }
                       });
        });

        $("#cbo_moneda").change(function () {
            
            var val0r = $(this).val();
            var d = 0.00;
            if (json_select_NotaCredito.length > 0) {
                json_select_NotaCredito.filter(function (e, f) {
                    var auxMonto = e.MONTO_USABLE;
                    if (e.MONE_CODE != val0r) {
                        if (val0r == "0002") {
                            auxMonto *= parseFloat($("#txt_TC").val());                           
                        }                            
                        else if (val0r == "0003") {
                            auxMonto /= parseFloat($("#txt_TC").val());                           
                        } else {
                            auxMonto = e.MONTO_USABLE;
                        }
                    }
                    d += parseFloat(auxMonto);
                    return d;
                });


                //var moneda_simbolo = val0r == "0002" ? "S/." : "$.";

                $("#montoNotaAgregado").html(formatoMiles(d)); ///actualiza montos de notas de credito
                $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))
            }

            $("#txtMonto").keyup();
            
            
        });

        $("#txtEfectivo").change(function () {
            var valor = $(this).val();
            $(this).val(formatoMiles(valor));
        });

        $("#cboMedioPago").select2();
                      
        $('#cboClientes').change(function () {
            llenarTablaDeudas(null);
        });

        cargaMediosDePago();       
    }

    var cargarSucursales = function (empresa) {
        var select = $('#slcEstablec');
        select.multiselect('destroy');
        select.multiselect();
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + empresa,
            beforesend: function () { select.hide();  Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.empty();
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {

                select.multiselect('destroy');
                select.multiselect();




                var scsl_code = ObtenerQueryString("scsl_code");
                if (scsl_code !== undefined) {
                    $('#slcEstablec').val(scsl_code);
                    $("#slcEstablec").multiselect('refresh');
                }

                Desbloquear($(select.parents("div")[0]));

    }
        });
    };
    
    function cargarJsonEmpleado(empresa) {
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE-2&empresa=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
          //  async: false,

            success: function (datos) {
                if (datos != null && datos != "") {

                    jsonPersonas = $.parseJSON(datos);

                } else {
                    jsonPersonas = "";
                }
            }
        });
    }
    
    var funcionalidad = function () {

        $("#btnConsultar").click(function () {
            if (!isEmpty($("#cboClientes").val()) && !isEmpty($("#slcEmpresa").val())) {
                consultaDeudas();
                consultaNotaCredito();
                /*consultaAnticiposCompensar();*/
                $("#ind_retencion").remove();
                if ($("#cboClientes option:selected").attr("data-retencion") == "S") {
                    $("#cboClientes").after('<span id="ind_retencion" class="is-agente">Agente de Retención</span>')
                } else {
                    if ($("#ind_retencion")) {
                        $('#ind_retencion').remove();
                    }                    
                }
            } else {
                $($("#cboClientes").siblings("div")[0]).pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
        });
            }
        });


        $("#txtMonto").change(function () {

            var tipo = $("#cbo_moneda").val();
            var valor_ = parseFloat($(".monto_sele[tipo = " + tipo + "]").attr("monto"));
           // var valor_2 = parseFloat($("#cbo_Det_Origen :selected").attr("monto"));
            var d = 0.00;

            if (json_select_NotaCredito.length > 0) {
              
                var val0r = $("#cbo_moneda").val();
                json_select_NotaCredito.filter(function (e, f) {
                    var auxMonto = e.MONTO_USABLE;
                    if (e.MONE_CODE != val0r) {
                        if (val0r == "0002")
                            auxMonto *= parseFloat($("#txt_TC").val());
                        else {
                            auxMonto /= parseFloat($("#txt_TC").val());
                        }
                    }
                    d += parseFloat(auxMonto);

                });
            }

         
                if ((parseFloat($(this).val()) + d) > valor_) {

                    $(this).val("");
                    infoCustom2("El monto ingresado es mayor al que se ha seleccionado a cobrar!");
                    $(".monto_sele[tipo = " + tipo + "]").pulsate({
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

            
            if($(this).attr("monto")==""){
                $(this).attr("monto",0.00);
            }



            if (json_select_NotaCredito.length > 0) {
         
                $("#montoNotaAgregado").html(formatoMiles(d)); ///actualiza montos de notas de credito
                $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))
            }

        });


        $('#cbo_OrigenPago').change(function () {
            $("#txtMonto, #cbo_moneda, #txtNroOpe, #txtDestino, #cbo_appPago").attr("disabled", true);
            $("#cboMedioPago").val("").change();
            var OrigenActual = $(this).val();

            $("#lbl_detalle3").html("-");
            $("#lbl_detalle4").html("-");
            $("#cboMedioPago").val("");
            $("#cbo_moneda").val("").change();

            switch (OrigenActual) {

                case "Caja":

                    $("#lbl_detalle1").html("Caja");
                 

                    $("#cbo_Det_Origen").off("change");
                    $("#cbo_Det_Origen").attr("data-placeholder", "CAJA").select2("val", "").change();
                    $("#txtDestino").select2("val", "");
                    $("#txtDestino").val("");
                
                    $.ajax({
                        type: "post",
                        url: "vistas/CC/ajax/CCMCBCL.ashx?flag=7&empresa=" + $("#slcEmpresa").val() + "&usua_id=" + $("#ctl00_txtus").val() + "&scsl=" + ($("#slcEstablec").val() == null ? "" : $('#slcEstablec').val().toString()),
                        async: true,
                        beforeSend: function () { Bloquear($('#form_medioPago')); },
                        success: function (res) {
                             if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_Det_Origen").html(res).attr("disabled", false);
                             } else {
                                $("#cbo_Det_Origen").html("").attr("disabled", true);
                             }
                        },
                        complete: function () {

                    $("#cboMedioPago").html(StringMediosPago);
                            $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0008" && valorO != "0006" && valorO != "0005" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);
                    CargarDatosCobroPorDefecto();
                            Desbloquear($('#form_medioPago'));
                        }
                    });

                    break;

                case "Banco":

                    $(".mPersona").css("display", "none");
                    $("#txtDestino").off("change");
                    $("#pos,#tarjeta,#bco").remove();
                    $("#lbl_detalle1").html("Cuenta Destino");
                    $("#cbo_moneda").attr("disabled", true);
                  //  $("#txtDestino").html("<option></option>").select2("val", "");

                    //CargarCuentas Origen
                    $("#cbo_Det_Origen").val("").change().attr("data-placeholder", "CUENTA BANCARIA").select2();
                    
                    $.ajax({
                        type: "post",
                        url: "vistas/CC/ajax/CCMCBCL.ashx?flag=6&empresapidm=" + $("#slcEmpresa :selected").attr("pidm") + "&banco=&moneda=",
                        async: true,
                        beforeSend: function () { Bloquear($('#form_medioPago'));},
                        success: function (res) {
                          if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_Det_Origen").html(res).attr("disabled", false).change(function () {
                                  $("#cboMedioPago").change();
                                  var mone_code = $("#cbo_Det_Origen :selected").attr("moneda");
                                  $("#cbo_moneda").val(mone_code).change().change();
                                 // $("#txtMonto").attr("placeholder", "max. " + $("#cbo_Det_Origen :selected").attr("monto"));

                              }

                              );
                          } else {
                              $("#cbo_Det_Origen").html("<option></option>").change();
                          }
                        },
                        complete: function () {

                    $("#cboMedioPago").html(StringMediosPago);
                            //DPORTA 09/12/2021 BILLETERA DIG.
                            $("#cboMedioPago option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0003" && valorO != "0013" && valorO != "0001" && valorO != "0020" && valorO != "") $(j).remove(); });
                    $("#cboMedioPago").attr("disabled", false);
                            Desbloquear($('#form_medioPago'));
                        }
                    });

                    break;
            }
        });

         //html_monedas=$("#cbo_moneda").html();
        var html_txtDestino = $("#txtDestino").parent().html();

        $('#cboMedioPago').change(function () {

            var MedioActual = $(this).val();

            $("#txtMonto, #cbo_moneda, #txtNroOpe, #txtDestino").attr("disabled", false);

            $(".cbocta").parent().html(html_txtDestino);
           
            
           // $("#cbo_moneda").html(html_monedas);
            

            $("#txtNroOpe").removeClass("personas").attr("disabled", false);

            $("#txtDestino").val("");

            $("#txtDestino").attr("disabled", false).off("change").attr("placeholder","");

            $("#txtNroOpe").val("");
            $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
         //   offObjectEvents("txtDestino");
            $("#pos,#tarjeta,#bco").remove();

            $(".mPersona").css("display", "none");
            offObjectEvents("txtNroOpe");
         //   offObjectEvents("txtDestino");
            $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                switch (MedioActual) {

                    case "0001"://DEPOSITO BANCARIO
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span7 mNroOpe');
                        $("#lbl_detalle3").html("Origen de Pago");
                        $("#lbl_detalle4").html("Nro. Operación");
                        $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino").html("<option>DEPOSITO DIRECTO VENTANILLA</option>").attr("disabled", true).select2();

                        $(".mPersona").css("display", "none");
                        offObjectEvents("txtNroOpe");
                        $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#txtMonto").attr("disabled", false);
                        $("#cbo_moneda").val($("#cbo_Det_Origen :selected").attr("moneda")).change().attr("disabled", true);

                        $("#p_DatVuelto").hide();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("");
                  
                        break;

                    case "0008": //EFECTIVO
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span7 mNroOpe');
                        $("#lbl_detalle3").html("Destino");
                        $("#lbl_detalle4").html("Persona Recibe");


                       // $("#txtDestino").html("<option>ENTREGA DIRECTA</option>").attr("disabled",true).select2();
                        $("#txtDestino").val("ENTREGA DIRECTA").attr("disabled", true);
                        $(".mPersona").css("display", "block");

                      
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
                        $("#txtNroOpe").addClass("personas").attr("disabled", false);
                        cargarInputsPersona();

                        $("#cbo_moneda").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);

                        $("#txtEfectivo").attr('disabled', false);
                        $("#p_DatVuelto").show();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("0.00");
                        $("#txtVuelto").attr("disabled", true);

                        break;

                    case "0003": //transferencia
                        $(".mNroOpe").attr('class', 'span7 mNroOpe');
                        $(".mAppPago").css("display", "none");
                        $("#lbl_detalle3").html("Origen");
                        $("#lbl_detalle4").html("Nro. Operación");
                      
                        

                        $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                        $("#cbDestino").select2();
                        $.ajaxSetup({ async: false });
                      
                        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6.5, moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#cboClientes").val() },
                          function (res) {
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#cbDestino").html(res).select2();
                              } else {
                                  $("#cbDestino").html("<option></option>").select2();
                              }

                          });
                        $.ajaxSetup({ async: true });
                        $.ajaxSetup({ async: false });

                        $.post("vistas/CP/ajax/CPMPGPR.ASHX", { flag: 6, banco: $("#cbo_Det_Origen :selected").attr("banco"), moneda: $("#cbo_Det_Origen :selected").attr("moneda"), empresapidm: $("#cboClientes").val() },
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
                        $("#cbo_moneda").attr("disabled", true).val($("#cbo_Det_Origen :selected").attr("moneda")).change();
                        $("#txtMonto").attr("disabled", false);
                        //$("#txtNroOpe").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la transacción");
                        $("#p_DatVuelto").hide();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("");
                      
                        break;

                    case "0013": //cheques bancarios
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span7 mNroOpe');
                        $("#lbl_detalle3").html("N° Cheque");
                        $("#lbl_detalle4").html("Girado a");

                        $("#txtDestino").attr("disabled", false);
                        //$("#txtNroOpe").attr("disabled", false);
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "");
                     
                        $("#txtMonto").attr("disabled", false);

                        $("#p_DatVuelto").hide();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("");
                        break;

                    case "0006": //tarjeta de credito
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span7 mNroOpe');
                        $("#cbo_moneda").attr("disabled", false);
                        $("#lbl_detalle3").html("N° Tarjeta");
                        $("#lbl_detalle4").html("Cod. Autorización");

                        $("#txtNroOpe").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);

                        $("#txtDestino").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la operación");
                        mascespecial("txtDestino", "************", 16);


                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos"><div class="span3">POS</div><div class="span7"><select data-placeholder="POS" id="slcPos" class="span12"><option></option></select></div></div>');
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta"><div class="span3">MARCA</div><div class="span7"><select data-placeholder="MARCA TARJETA" id="slcTarjeta" class="span12"><option></option></select></div></div>')
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco"><div class="span3">BANCO</div><div class="span7"><select data-placeholder="BANCO" id="slcBco" class="span12"><option></option></select></div></div>')

                        $("#slcPos, #slcTarjeta, #slcBco").select2();



                        $("#slcPos, #slcBco,#slcTarjeta").attr("disabled", true);

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                          function (res) {
                              Bloquear($($("#slcBco").siblings("div")).attr("id"));
                              $("#slcBco").attr("disabled", false);
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#slcBco").addClass("obligatorio").html(res);

                              } else {
                                  $("#slcBco").html("").attr("disabled", true);
                              }

                          }).done(function () { Desbloquear($($("#slcBco").siblings("div")).attr("id")); });
                 

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR"},
                          function (res) {

                              Bloquear($($("#slcTarjeta").siblings("div")).attr("id"));
                              $("#slcTarjeta").attr("disabled", false);
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  listaTarjetas = res;
                                  $("#slcTarjeta").addClass("obligatorio").html(res);

                              } else {
                                  $("#slcTarjeta").html("").attr("disabled", true);
                              }

                          }).done(function () { Desbloquear($($("#slcTarjeta").siblings("div")).attr("id")); });
                   
                    
                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen").val(), empresa: $("#slcEmpresa").val(), estable: $("#cbo_Det_Origen :selected").attr("stbl") },
                          function (res) {
                              Bloquear($($("#slcPos").siblings("div")).attr("id"));
                              $("#slcPos").attr("disabled", false);
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                
                                  $("#slcPos").addClass("obligatorio").html(res).change(function () {

                                      var mone_pos = $("#slcPos :selected").attr("moneda");
                                      $("#cbo_moneda").html(html_monedas).select2("val", "");
                                      $("#cbo_moneda option").filter(function (e,d) {
                                          var val0r = $(d).val();
                                          if (mone_pos.indexOf(val0r) < 0)
                                          { $("#cbo_moneda option[value=" + val0r + "]").remove(); }
                                          
                                      });
                                      var tarj_pos = $("#slcPos :selected").attr("tarjetas");
                                      $("#slcTarjeta").html(listaTarjetas).select2("val", "");
                                       $("#slcTarjeta option").filter(function (e, d) {
                                          var val0r = $(d).val();
                                          if (tarj_pos.indexOf(val0r) < 0)
                                          { $("#slcTarjeta option[value=" + val0r + "]").remove(); }
                                      });
                                      $("#slcTarjeta").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                  });
                              } else {
                                  $("#slcPos").html("").attr("disabled",true);
                              }
                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen").val() + "&empresa=" + $("#slcEmpresa").val() + "&estable=" + $("#cbo_Det_Origen :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos").val(datos);
                                            $("#slcPos").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });
                            });
                        $("#p_DatVuelto").hide();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("");

                        break;

                    case "0005": // tarjeta de debito
                        $(".mAppPago").css("display", "none");
                        $(".mNroOpe").attr('class', 'span7 mNroOpe');
                        $("#cbo_moneda").attr("disabled", false);
                        $("#lbl_detalle3").html("N° Tarjeta");
                        $("#lbl_detalle4").html("Cod. Autorización");

                        $("#txtNroOpe").attr("disabled", false);
                        $("#txtMonto").attr("disabled", false);

                        $("#txtDestino").attr("disabled", false).attr("placeholder", "ult. 4 digitos");
                        $("#txtNroOpe").attr("disabled", false).attr("placeholder", "de la operación");
                        mascespecial("txtDestino", "************", 16);

                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="pos"><div class="span3">POS</div><div class="span7"><select data-placeholder="POS" id="slcPos" class="span12"><option></option></select></div></div>');
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="tarjeta"><div class="span3">MARCA</div><div class="span7"><select data-placeholder="MARCA TARJETA" id="slcTarjeta" class="span12"><option></option></select></div></div>')
                        $($(this).parents(".row-fluid")[0]).append('<div class="row-fluid pos" id="bco"><div class="span3">BANCO</div><div class="span7"><select data-placeholder="BANCO" id="slcBco" class="span12"><option></option></select></div></div>')

                        $("#slcPos, #slcTarjeta, #slcBco").select2();
                        $("#slcPos, #slcBco,#slcTarjeta").attr("disabled", true);

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "BCO" },
                          function (res) {
                              Bloquear($($("#slcBco").siblings("div")).attr("id"));
                              $("#slcBco").attr("disabled", false);
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  $("#slcBco").addClass("obligatorio").html(res);

                              } else {
                                  $("#slcBco").html("").attr("disabled", true);
                              }

                          }).done(function () { Desbloquear($($("#slcBco").siblings("div")).attr("id")); });

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MTAR" },
                          function (res) {
                              Bloquear($($("#slcTarjeta").siblings("div")).attr("id"));
                              $("#slcTarjeta").attr("disabled", false);
                              if (res != null && res != "" && res.indexOf("error") < 0) {
                                  listaTarjetas = res;
                                  $("#slcTarjeta").addClass("obligatorio").html(res);

                              } else {
                                  $("#slcTarjeta").html("").attr("disabled", true);
                              }

                          }).done(function () { Desbloquear($($("#slcTarjeta").siblings("div")).attr("id")); });;

                        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "POS", caja: $("#cbo_Det_Origen").val(), empresa: $("#slcEmpresa").val(), estable: $("#cbo_Det_Origen :selected").attr("stbl") },
                          function (res) {
                              Bloquear($($("#slcPos").siblings("div")).attr("id"));
                              $("#slcPos").attr("disabled", false);
                              if (res != null && res != "" && res.indexOf("error") < 0) {

                                  $("#slcPos").addClass("obligatorio").html(res).change(function () {

                                      var mone_pos = $("#slcPos :selected").attr("moneda");
                                      if (mone_pos.indexOf($("#cbo_moneda").val()) < 0) {
                                          $("#slcPos").select2("val", "");
                                          infoCustom2("Moneda de POS no coincide con moneda del Documento de Venta")
                                      }

                                      //$("#cbo_moneda").html(html_monedas).select2("val", "");
                                      //$("#cbo_moneda option").filter(function (e, d) {
                                      //    var val0r = $(d).val();
                                      //    if (mone_pos.indexOf(val0r) < 0)
                                      //    { $("#cbo_moneda option[value=" + val0r + "]").remove(); }

                                      //});
                                      var tarj_pos = $("#slcPos :selected").attr("tarjetas");
                                      $("#slcTarjeta").html(listaTarjetas).select2("val", "");
                                      $("#slcTarjeta option").filter(function (e, d) {
                                          var val0r = $(d).val();
                                          if (tarj_pos.indexOf(val0r) < 0)
                                          { $("#slcTarjeta option[value=" + val0r + "]").remove(); }
                                      });
                                      $("#slcTarjeta").select2("val", "00006");//DPORTA 08/07/2021 PARA QUE CARGUE POR DEFECTO LA MARCA "VISA"
                                  });
                              } else {
                                  $("#slcPos").html("").attr("disabled", true);
                              }
                            }).done(function () //DPORTA 24/06/2021
                            {
                                Desbloquear($($("#slcPos").siblings("div")).attr("id"));
                                $.ajax({
                                    type: "post",
                                    url: "vistas/CC/ajax/CCMCBCL.ASHX?flag=POS_PRED&caja=" + $("#cbo_Det_Origen").val() + "&empresa=" + $("#slcEmpresa").val() + "&estable=" + $("#cbo_Det_Origen :selected").attr("stbl"),
                                    contenttype: "application/json;",
                                    datatype: "json",
                                    async: false,
                                    success: function (datos) {
                                        if (datos != null) {
                                            $("#slcPos").val(datos);
                                            $("#slcPos").change();
                                        }
                                    },
                                    error: function (msg) {
                                        alertCustom("Monedas no se listaron correctamente.");
                                    }
                                });
                            });
                        $("#p_DatVuelto").hide();
                        $("#txtEfectivo").val("");
                        $("#txtVuelto").val("");

                        break;
                    case "0020"://OTROS: YAPE, PLIN, TUNKI, ETC BILLETERA DIG.

                        let billetera_dig = $("#cbo_Det_Origen :selected").attr("billetera_dig");

                        if (billetera_dig == 'S') {
                            $(".mAppPago").css("display", "block");
                            $("#lbl_detalle3").html("Origen de Pago");
                            //$("#lbl_detalle4").html("Nro. Op.");
                            $("#lbl_detalle4").html("App - Nro. Operación");
                            $("#txtDestino").parent().html("<select id='cbDestino' class='obligatorio span12 cbocta' data-placeholder='CUENTA DE CLIENTE'></select>");
                            $("#cbDestino").html("<option>BILLETERA DIGITAL</option>").attr("disabled", true).select2();

                            $(".mPersona").css("display", "none");
                            offObjectEvents("txtNroOpe");
                            $("#cbo_appPago").removeClass("personas").attr("disabled", false);

                      
                            $("#cbo_appPago").attr("disabled", false);
                            $(".mNroOpe").attr('class', 'span4 mNroOpe');
                            $("#txtNroOpe").removeClass("personas").attr("disabled", false);
                            $("#txtNroOpe").attr("disabled", false).attr("placeholder", "Nro. Operación");
                            $("#txtMonto").attr("disabled", false);
                            $("#cbo_moneda").val($("#cbo_Det_Origen :selected").attr("moneda")).change().attr("disabled", true);

                            $("#p_DatVuelto").hide();
                            $("#txtEfectivo").val("");
                            $("#txtVuelto").val("");

                            //let nombre_cuenta = $("#cbo_Det_Origen :selected").html(); //DPORTA 09/12/2021

                            //if (nombre_cuenta.indexOf('BCP') > 0) {
                            //    //$("#txtNroOpe").val("YAPE  -");
                            //    mascespecial("txtNroOpe", "", 9);
                            //} else if (nombre_cuenta.indexOf('BBVA') > 0) {
                            //    //$("#txtNroOpe").val("LUKITA-");
                            //    mascespecial("txtNroOpe", "", 9);
                            //} else if (nombre_cuenta.indexOf('IBK') > 0) {
                            //    //$("#txtNroOpe").val("TUNKI -");
                            //    mascespecial("txtNroOpe", "", 9);
                            //} else if (nombre_cuenta.indexOf('BIF') > 0 || nombre_cuenta.indexOf('SCT') > 0) {
                            //    //$("#txtNroOpe").val("PLIN  -");
                            //    mascespecial("txtNroOpe", "", 9);
                            //}
                        } else if (typeof (billetera_dig) == "undefined") {

                        } else {
                            infoCustom2("La cuenta destino seleccionada no tiene asociada una Billetera digital");
                            $(".mAppPago").css("display", "none");
                            $(".mNroOpe").attr('class', 'span7 mNroOpe');
                        }
                        
                        break;
                        
                }
        });

        
        $("#cancelarPagoRetencion").click(function () { 
            no_rentencion = true;
            $("#ModalRetencion").modal('hide');
            for (let i = 0; i < json_selec.length; i++) {
                json_selec[i].PAGO_RETENCION = '';
                json_selec[i].POR_PAGAR_BASE = json_selec[i].MONTO_MONE_BASE;
                json_selec[i].POR_PAGAR_ALTER = json_selec[i].MONTO_MONE_ALTER;
            }
            console.log(json_selec);
            pagar();            
        });

        $("#regPagoRetencion").click(function () {
            var dPorcRetencion = mGetParametro('RETN');
            var dMontoRetencionMN = 0;
            var dMontoRetencionMA = 0;
            var dMontoTotalRetencionPagarMN = 0;
            var dMontoTotalRetencionPagarMA = 0;

            for (let i = 0; i < json_selec.length; i++){
                if (json_selec[i].MONTO_MONE_BASE == json_selec[i].POR_PAGAR_BASE) {                    
                    if (json_selec[i].RETENCION_IND != 'S') {
                        dMontoRetencionMN = parseFloat(json_selec[i].POR_PAGAR_BASE) * ((100 - dPorcRetencion) / 100);
                        dMontoRetencionMA = parseFloat(json_selec[i].POR_PAGAR_ALTER) * ((100 - dPorcRetencion) / 100);
                        dMontoTotalRetencionPagarMN = dMontoTotalRetencionPagarMN.Redondear(2) + dMontoRetencionMN.Redondear(2);
                        dMontoTotalRetencionPagarMA = dMontoTotalRetencionPagarMA.Redondear(2) + dMontoRetencionMA.Redondear(2);
                        json_selec[i].POR_PAGAR_BASE = (dMontoRetencionMN.Redondear(2)).toString();
                        json_selec[i].POR_PAGAR_ALTER = (dMontoRetencionMA.Redondear(2)).toString();
                        json_selec[i].PAGO_RETENCION = 'R';
                    } else {
                        json_selec[i].PAGO_RETENCION = 'N';
                        dMontoTotalRetencionPagarMN = dMontoTotalRetencionPagarMN + parseFloat(json_selec[i].POR_PAGAR_BASE);
                        dMontoTotalRetencionPagarMA = dMontoTotalRetencionPagarMA + parseFloat(json_selec[i].POR_PAGAR_ALTER);
                    }
                } else {
                    infoCustom2('El documento ' + json_selec[i].DOCUMENTO + ' ya tiene una amortización previa, no se puede aplicar retencion.');
                    for (let i = 0; i < json_selec.length; i++) {
                        json_selec[i].PAGO_RETENCION = '';
                        json_selec[i].POR_PAGAR_BASE = json_selec[i].MONTO_MONE_BASE;
                        json_selec[i].POR_PAGAR_ALTER = json_selec[i].MONTO_MONE_ALTER;
                    }
                    return;
                }
            }

            if ($("#cbo_moneda").val() == '0003') {
                if (dMontoTotalRetencionPagarMA.Redondear(2) === parseFloat($('#txtMonto').attr('monto'))) {
                    console.log('Realizar el cobro');
                    pagarRetencion();
                } else { 
                    $("#montoRetencion").html('El monto ingresado debe ser igual a US$. ' + dMontoTotalRetencionPagarMA.toFixed(2));
                    //infoCustom2('El monto ingresado debe ser igual US$. ' + dMontoTotalRetencionPagarMA.toFixed(2) + ' para poder realizar el pago con retención.');
                    for (let i = 0; i < json_selec.length; i++) {
                        json_selec[i].POR_PAGAR_BASE = json_selec[i].MONTO_MONE_BASE;
                        json_selec[i].POR_PAGAR_ALTER = json_selec[i].MONTO_MONE_ALTER;
                    }
                }
            } else {
                if (dMontoTotalRetencionPagarMN.Redondear(2) === parseFloat($('#txtMonto').attr('monto'))) {
                    console.log('Realizar el cobro');
                    pagarRetencion();
                } else {
                    $("#montoRetencion").html('El monto ingresado debe ser igual a S/. ' + dMontoTotalRetencionPagarMN.toFixed(2));
                    //infoCustom2('El monto ingresado debe ser igual S/. ' + dMontoTotalRetencionPagarMN.toFixed(2) + ' para poder realizar el pago con retención.');
                    for (let i = 0; i < json_selec.length; i++) {
                        json_selec[i].PAGO_RETENCION = '';
                        json_selec[i].POR_PAGAR_BASE = json_selec[i].MONTO_MONE_BASE;
                        json_selec[i].POR_PAGAR_ALTER = json_selec[i].MONTO_MONE_ALTER;
                    }
                }
            } 

            console.log(json_selec);
            
        });

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

        inputFile("fileSustento", "imgSustento", "../../recursos/img/no_disponible.jpg",350,350,1);

        cargatablavacia();
        cargatablavaciaModalNotaCredito();
        btnBuscaPersonas();


        $('#txt_TC').change(function () {

            $("#txt_monto_base, #txt_monto_alt").val("");
            if (parseFloat($(this).val()) == 0) { $(this).val(""); }

        });
        
        $('#txtFechaPago').datepicker("setDate", new Date());


        $("#txtFechaTransaccion").datepicker({ dateFormat: "yy/mm/dd" }).datepicker("setDate", new Date());

        $('#chkAll').prop('disabled', true).parent().removeClass('checked');

    }      
    
    var funcionalidadTabla = function () {

        $('#tblBandeja tbody').on('click', '.selecChk', function () {      

            if ($('#chkAll').is(":checked") ) {
                //$('#chkAll').prop('disabled', false).parent().removeClass('checked');
                $('#chkAll').prop('disabled', false).parent().removeClass('checked');
                $('#chkAll').prop('checked', false);
            } else {
                //$('#chkAll').prop('disabled', false).parent().addClass('checked');
                //$('#chkAll').prop('checked', true);
            }

            var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableDeudas.fnGetData(pos);

            var moba = row.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_ALTER) * parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_BASE);//moneda base
            var moal = row.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_BASE) / parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_ALTER);//moneda alterna
            var valor_moba = parseFloat($("#txt_monto_base").attr("monto") == "" ? 0 : $("#txt_monto_base").attr("monto"));
            var valor_moal = parseFloat($("#txt_monto_alt").attr("monto") == "" ? 0 : $("#txt_monto_alt").attr("monto"));
            


            if ($(this).is(":checked")) {

                $(this).parent().parent().addClass('selected');

                valor_moba += moba;
                valor_moal += moal;
                json_selec.push(row);
                json_selec_nuevo.push(row);

                $(".monto_sele").parents(".control-group").removeClass("error");

            } else {

                $(this).parent().parent().removeClass('selected');

                valor_moba -= parseFloat(moba.toFixed(2));
                valor_moal -= parseFloat(moal.toFixed(2));
                json_selec.filter(function (e, f) {
                    if (e == row) { json_selec.splice(f, 1); }
                });

                json_selec_nuevo.filter(function (e, f) {
                    if (e == row) { json_selec_nuevo.splice(f, 1); }
                });

            }

            $("#txt_monto_base")
                .val("S/." + formatoMiles(valor_moba))
                .attr("monto", valor_moba.toFixed(2));
            $("#txt_monto_alt")
                .val("US$." + formatoMiles(valor_moal))
                .attr("monto", valor_moal.toFixed(2));

            $("#txtMonto").keyup();           
            
          
            
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
              
                $.ajax({
                    type: "POST",
                    url: "vistas/CC/ajax/CCMCBCL.ashx?flag=4.5&factura=" + id,
                    beforeSend: function () { Bloquear($('#c' + id.split(",").join(""))); },
                    async: true,
                    success: function (datos) {
                       
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
                            resb += "<th>FORMA_PAGO</th>";
                            resb += "<th>DOCUMENTO</th>";
                            resb += "<th>MONTO</th>";
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);
                            
                            cargatablavaciaDetalleF("tblBandejaDetalleF" + id, $.parseJSON(datos));
                          
                        }                                       
                    },
                    complete: function () { Desbloquear($('#c' + id.split(",").join(""))); }
                });

            }

        });

        $('#tblBandeja tbody').on('dblclick', 'tr', function () {
            
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $("#tblBandeja tr.selected").removeClass('selected');
                $(this).addClass('selected');
                var row = $("#tblBandeja").DataTable().row(this).data();
                var code = row.CODIGO;
                window.open("?f=nvmdocv&codigo=" + code, '_blank');
            }

            

        });


        $('#chkAll').click(function () {

            var checked = $(this).is(':checked');     

            $('#tblBandeja tbody input[type=checkbox]').prop('checked', checked);   

            if (checked) {
                $(this).prop('disabled', false).parent().addClass('checked');
                $(this).prop('checked', true);
            } else {
                $(this).prop('disabled', false).parent().removeClass('checked');
                $(this).prop('checked', false);
            }         
                    

            if (checked) {
                $('#tblBandeja tbody input[type=checkbox]').parent().addClass('checked');    
                $('#tblBandeja tbody tr').addClass('selected');

                $("#txt_monto_base").attr("monto", 0);
                $("#txt_monto_alt").attr("monto", 0);

                json_selec = [];

            } else {
                $('#tblBandeja tbody input[type=checkbox]').parent().removeClass('checked');    
                $('#tblBandeja tbody tr').removeClass('selected');
                
            }

            //$("#txt_monto_base").attr("monto", 0);
            //$("#txt_monto_alt").attr("monto", 0);

            //json_selec = [];


            $('#tblBandeja tbody .selecChk').each(function () {                
              
                $(this).parent().parent().removeClass('selected');

                var pos = oTableDeudas.api(true).row($(this).parents("tr")[0]).index();
                var row = oTableDeudas.fnGetData(pos);

                var moba = row.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_ALTER) * parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_BASE);//moneda base
                var moal = row.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "" ? parseFloat(row.POR_PAGAR_BASE) / parseFloat($("#txt_TC").val()) : parseFloat(row.POR_PAGAR_ALTER);//moneda alterna
                var valor_moba = parseFloat($("#txt_monto_base").attr("monto") == "" ? 0 : $("#txt_monto_base").attr("monto"));
                var valor_moal = parseFloat($("#txt_monto_alt").attr("monto") == "" ? 0 : $("#txt_monto_alt").attr("monto"));


                if ($(this).is(":checked")) {

                    $(this).parent().parent().addClass('selected');

                    valor_moba += moba;
                    valor_moal += moal;
                    json_selec.push(row);
                    json_selec_nuevo.push(row);

                    $(".monto_sele").parents(".control-group").removeClass("error");

                } else {

                    $(this).parent().parent().removeClass('selected');

                    valor_moba -= parseFloat(moba.toFixed(2));
                    valor_moal -= parseFloat(moal.toFixed(2));
                    json_selec.filter(function (e, f) {
                        if (e == row) { json_selec.splice(f, 1); }
                    });

                    json_selec_nuevo.filter(function (e, f) {
                        if (e == row) { json_selec_nuevo.splice(f, 1); }
                    });

                }

                $("#txt_monto_base")
                    .val("S/." + formatoMiles(valor_moba))
                    .attr("monto", valor_moba.toFixed(2));
                $("#txt_monto_alt")
                    .val("US$." + formatoMiles(valor_moal))
                    .attr("monto", valor_moal.toFixed(2));

                $("#txtMonto").keyup();      

            });
            


        });

        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id + '"></div>';
            return sOut;
        }
    }

    var funcionalidadTablaModalNotaCredito = function () {

        $('#tblNotaCredito tbody').on('click', 'tr', function () {

            var pos = oTableModalNotaCredito.fnGetPosition(this);
            var row = oTableModalNotaCredito.fnGetData(pos);

            var element = '<li class="NotaCreditoItem" style="cursor: pointer;" id="' + row.CODIGO + '"><div class="col1">' +
            '					<div class="cont">' +
            '						<div class="cont-col1">' +
            '							<div class="label" style="background-color: #B6ADB9!important;">' +
            '								<i class="icon-ok"></i>' +
            '							</div>' +
            '						</div>' +
            '						<div class="cont-col2">' +
            '							<div class="desc">' +
            '							</div>' +
            '						</div>' +
            '					</div>' +
            '				</div></li>';
            
          
            $("#muestralistap").modal("hide");

            json_select_NotaCredito.push(row); //poner en lista seleccionado

            var val0r = $(".moneda.activo").select2("val");           
            var d = 0.00; json_select_NotaCredito.filter(function (e, f) {
                var auxMonto = e.MONTO_USABLE;                
                if (e.MONE_CODE !== val0r) {
                    if (val0r == "0002")
                        auxMonto *= parseFloat($("#txt_TC").val());
                    else if (val0r == "0003") {
                        auxMonto /= parseFloat($("#txt_TC").val());
                    } else {
                        auxMonto = e.MONTO_USABLE;   
                        console.log();
                    }
                    
                }
                d += parseFloat(auxMonto);
                return d;
            })
            $("#montoNotaAgregado").html(formatoMiles(d)); //actualiza monto de notas de creditos
            if ((d + parseFloat($("#txtMonto").attr("monto"))) > parseFloat($("#cbo_moneda :selected").attr("tipo") == "MOBA" ? $("#txt_monto_base").attr("monto") : $("#txt_monto_alt").attr("monto"))) {
                $("#txtMonto").attr("monto", 0.00).val("0.00");
            }            
            $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))
            $("#lblMontoTotalSoloNota").attr("monto", d.toFixed(2)).html("Total: " + (($("#cbo_monedaSoloNota").val() == "0002" || $("#cbo_monedaSoloNota").val() == "") ? "S/." : "$.") + formatoMiles(d));

            $("#divMontoAgregado").css("display", "inline-block");

            
            $(".NotaCreditoAgregados")
                .css("display", "block");

            $("#listaAgregados").append(element);
            $("#cbo_moneda").change();

            $("#" + row.CODIGO + " .desc").html("Nota de Crédito " + row.DOCUMENTO + " añadida. <b>|</b> " + row.MONEDA_SIMBOLO + formatoMiles(row.MONTO_USABLE));
            montoNC = row.MONTO_USABLE;
            moneCode = row.MONE_CODE;
            $("#"+ row.CODIGO)
                .mouseover(function () {
                    $(this).css("background-color", "#FFC9C9");
                    $(this).find(".label").css("background-color", "#A56A6A");
                    $(this).find(".label i").removeClass("icon-ok").addClass("icon-remove");
                })
                .mouseout(function () {
                    $(this).css("background-color", "");
                    $(this).find(".label").css("background-color", "#B6ADB9");
                    $(this).find(".label i").removeClass("icon-remove").addClass("icon-ok");
                })
                .click(function () {
                    var vacio_ind = false;
                    var id = $(this).attr("id");
                    $(this).remove();
                    var d = 0.00;
                    json_select_NotaCredito.filter(function (e, d) {
                       
                        if (e.CODIGO == id) {
                            if (json_select_NotaCredito.length == 1) { $("#divMontoAgregado").css("display", "none"); vacio_ind |= true;}

                            json_select_NotaCredito.splice(d, 1);
                           
                        }
                    });
                    if (!vacio_ind) {
                        var val0r = $(".moneda.activo").select2("val");
                       json_select_NotaCredito.filter(function (e, f) {
                            var auxMonto = e.MONTO_USABLE;
                            if (e.MONE_CODE != val0r) {
                                if (val0r == "0002")
                                    auxMonto *= parseFloat($("#txt_TC").val());
                                else {
                                    auxMonto /= parseFloat($("#txt_TC").val());
                                }
                            }
                            d += parseFloat(auxMonto);
                            return d;
                        });
                    }

                    $("#montoNotaAgregado").html(formatoMiles(d)); ///actualiza montos de notas de credito                    

                    $("#montoTotalAgregado").html(formatoMiles(d + parseFloat($("#txtMonto").attr("monto") == undefined ? 0 : $("#txtMonto").attr("monto"))))
                  
                    $("#lblMontoTotalSoloNota").attr("monto", d.toFixed(2)).html("Total: " + (($("#cbo_monedaSoloNota").val() == "0002" || $("#cbo_monedaSoloNota").val() == "") ? "S/." : "$.") + formatoMiles(d));
                    
                });
                //$("#p_DatVuelto").hide();
        });

    }

    return {
        init: function () {
            cargarParametrosSistema();
            plugins();            
            cargarCombos();
            funcionalidad();
            cargainicial();
            funcionalidadTabla();
            funcionalidadTablaModalNotaCredito();          
            //CargaInicialVenta();                                     
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

function filltxtcliente() {
    $.ajax({
        type: "post",
        url: "vistas/CC/ajax/CCMCBCL.ashx?flag=3&empresa=" + $('#slcEmpresa').val(),
        async: true,
        beforeSend: function () { Bloquear($($('#cboClientes').parents("div")[0])); $("#btnConsultar").attr("disabled", true); },
        success: function (datos) {
            if (datos != null) {

                $('#cboClientes').empty();

                $('#cboClientes').html(datos);

                $("#cboClientes").change(function () {
                    $("#cbo_OrigenPago").attr("disabled", false);
                    json_nota_dcto = new Array();
                    json_select_NotaCredito = new Array();
                    $("#form_medioPago").css("display", "block")
                    $("#chkSoloNota").attr("checked", false); $("#chkSoloNota").parent().removeClass("checked");
                    $(".NotaCreditoItem").remove();
                    $("#divMontoAgregado").css("display", "none");

                });

                
            }
                
        },
        error: function (msg) {
            alert(msg);
        },
        complete: function () {
            Desbloquear($($('#cboClientes').parents("div")[0]));
            $("#btnConsultar").attr("disabled", false);

            var codigo = ObtenerQueryString("codigo");
            if (codigo !== undefined) {
                window.history.pushState("Object", "COBRO CLIENTES", "/Default.aspx?f=CCMCBCL");
                $("#cboClientes").select2('val', codigo).change();                
                $("#btnConsultar").click();
            }

        }
    });

}

function consultaNotaCredito() {
    $.ajax({
        type: "post",
        url: "vistas/CC/ajax/CCMCBCL.ashx?flag=11&empresa=" + $('#slcEmpresa').val() +"&clientepidm="+ $('#cboClientes').val(),
        async: false,
        //beforeSend: function () { Bloquear($($("div.NotaCreditoAgregados").parents("div")[0]), "Verificando Notas de Crédito..."); },
        success: function (datos) {
         
            if (datos != "SIN_NOTAS") {

                $("#btnNotaCredito, .incluye_nota").css("display", "inline-block");
                json_notacredito = JSON.parse(datos);

            } else {
                $("#btnNotaCredito, .incluye_nota").css("display", "none");
                json_notacredito = [];
            }
        },
        //complete: function () { Desbloquear($($("div.NotaCreditoAgregados").parents("div")[0])); }
    });
}

function consultaAnticipoCompensar() {
    $.ajax({
        type: "post",
        url: "vistas/CC/ajax/CCMCBCL.ashx?flag=ANTICIPO_COMPENSAR&empresa=" + $('#slcEmpresa').val() + "&clientepidm=" + $('#cboClientes').val(),
        async: false,
        //beforeSend: function () { Bloquear($($("div.NotaCreditoAgregados").parents("div")[0]), "Verificando Notas de Crédito..."); },
        success: function (datos) {

            if (datos != "SIN_ANTICIPOS_A_COMPENSAR") {

                $("#btnAnticipoCompensar").css("display", "inline-block");
                json_anticipoCompensar = JSON.parse(datos);

            } else {
                $("#btnAnticipoCompensar").css("display", "none");
                json_anticipoCompensar = [];
            }
        },
        //complete: function () { Desbloquear($($("div.NotaCreditoAgregados").parents("div")[0])); }
    });
}

$("#btnNotaCredito").click(function () {                     
    $("#muestralistap").modal("show");
    llenarTablaModalNotaCredito();
});

$("#btnAnticipoCompensar").click(function () {
    $("#muestralista_a").modal("show");
    llenarTablaModalAnticipoCompensar();
});

function consultaDeudas() {
    $("#txt_monto_base").val("").attr("monto", 0.00);
    $("#txt_monto_alt").val("").attr("monto", 0.00);
    if ($("#cboClientes").val()!=null && $("#cboClientes").val() != "") {             
       
        var cod = "";
        var oData = {
            flag: 4,
            empresa: $("#slcEmpresa").val(),
            clientepidm: $('#cboClientes').val(),
            establec: $("#slcEstablec").val() == null ? "" : $('#slcEstablec').val().toString(),
            fini: $("#txtFeIn").val(),
            ffin: $("#txtFeFi").val()
        };
        $.ajax({
            type: "post",
            url: "vistas/CC/ajax/CCMCBCL.ASHX",
            data: oData,
            async: true,
            beforeSend: function () { Bloquear("div_body", "Obteniendo Deudas..."); },
            success: function (datos) {
                if (datos != "" && datos != null) {
                    var json = $.parseJSON(datos);
                    if ($("#auxiliar").val() == "") {
                        $("#auxiliar").val(json[0].VALOR_TIPO_CAMBIO);
                        $("#txt_TC").val(json[0].VALOR_TIPO_CAMBIO);
                    }
                    llenarTablaDeudas(json);
                    $('#chkAll').prop('disabled', false).parent().removeClass('checked');
                } else {
                    ActualizarUltimoIndicador();
                    //llenarTablaDeudas(null);
                }
            },
            complete: function () { Desbloquear("div_body"); }
        });
       
    } else {
        llenarTablaDeudas(null);
        infoCustom2("No se ha seleccionado un proveedor!");
        $("#s2id_cboClientes").pulsate({
            color: "#33AECD",
            reach: 20,
            repeat: 3,
            glow: true
        });
    }
    json_selec = new Array();
}

function ActualizarUltimoIndicador() {
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=8.5",
        success: function (datos) {

            if (datos == "OK") {
                consultaDeudas2();
            }
        },

        error: function (msg) {
            alert(msg);
        }
    });
}

function consultaDeudas2() {
    $("#txt_monto_base").val("").attr("monto", 0.00);
    $("#txt_monto_alt").val("").attr("monto", 0.00);
    if ($("#cboClientes").val() != null && $("#cboClientes").val() != "") {

        var cod = "";
        var oData = {
            flag: 4,
            empresa: $("#slcEmpresa").val(),
            clientepidm: $('#cboClientes').val(),
            establec: $("#slcEstablec").val() == null ? "" : $('#slcEstablec').val().toString(),
            fini: $("#txtFeIn").val(),
            ffin: $("#txtFeFi").val()
        };
        $.ajax({
            type: "post",
            url: "vistas/CC/ajax/CCMCBCL.ASHX",
            data: oData,
            async: true,
            beforeSend: function () { Bloquear("div_body", "Obteniendo Deudas..."); },
            success: function (datos) {
                if (datos != "" && datos != null) {
                    var json = $.parseJSON(datos);
                    if ($("#auxiliar").val() == "") {
                        $("#auxiliar").val(json[0].VALOR_TIPO_CAMBIO);
                        $("#txt_TC").val(json[0].VALOR_TIPO_CAMBIO);
                    }
                    llenarTablaDeudas(json);
                    $('#chkAll').prop('disabled', false).parent().removeClass('checked');
                } else {                    
                    llenarTablaDeudas(null);
                }
            },
            complete: function () { Desbloquear("div_body"); }
        });

    } else {
        llenarTablaDeudas(null);
        infoCustom2("No se ha seleccionado un proveedor!");
        $("#s2id_cboClientes").pulsate({
            color: "#33AECD",
            reach: 20,
            repeat: 3,
            glow: true
        });
    }
    json_selec = new Array();
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
                    var sHtml = "";
                    if (rowData.ANTICIPO_IND == 'S') {
                        sHtml += '<span class="supidc" style="margin:3px">a</span>';
                    }
                    if (rowData.DOC_CANJEADO == 'S') {
                        sHtml += '<span class="supidc" style="margin:3px">c</span>';
                    }
                    $(td).html(cellData + sHtml);
                }
            },
            {
                data: "FECHA_EMISION",
                createdCell: function (td, cellData, rowData, row, col) {

                    $(td).attr('align', 'center')

                },
                type:"fecha"
              
            },

            {
                data: "MONTO_MONE_BASE",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'N' && $("#txt_TC").val()!="") {
                        valor = parseFloat(rowData.MONTO_MONE_ALTER) * parseFloat($("#txt_TC").val());
                    } else {
                        $(td).css("background-color", "#FFF9B3");
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
                    } else {
                        $(td).css("background-color", "#FFF9B3");
                    }
                    $(td).html(formatoMiles(valor));
                }
            },

             {
                 data: "POR_PAGAR_BASE",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                     var valor = cellData;
                     if (rowData.ES_MONEDA_BASE == 'N' && $("#txt_TC").val() != "") {
                         valor =parseFloat(rowData.POR_PAGAR_ALTER) * parseFloat($("#txt_TC").val());
                     }
                     $(td).html(formatoMiles(valor));
                 }
             },

            {
                data: "POR_PAGAR_ALTER",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    if (rowData.ES_MONEDA_BASE == 'S' && $("#txt_TC").val() != "") {
                        valor = parseFloat(rowData.POR_PAGAR_BASE) / parseFloat($("#txt_TC").val());
                    }
                    $(td).html(formatoMiles(valor));
                }
            },
            {
                data: "RETENCION_IND",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td)                       
                        .css({ "text-align": "right" });
                },
                visible: false
            },
            {
                data: null,
                defaultContent: '  <input type="checkbox" class="selecChk" />',
                createdCell: function (td, cellData, rowData, row, col) {
                    if (rowData.DOC_CANJEADO == 'S') { $(td).children("input[type=checkbox]").attr("disabled", true);}
                    $(td).attr('align', 'center')

                }
            }


        ],
        "scrollY": "280px",
        "scrollCollapse": false,
        "scrollX": true,
        "paginate": false,
        "order": [[2, 'desc'], [5, 'desc']],

        info: false
        
    });
  
    $($("#tblBandeja_wrapper div.span6")[0]).html('<button type="button" class="btn green refreshData"><i class="icon-refresh"></i></button>');

    $(".refreshData").click(function () { consultaDeudas();});

}

function cargatablavaciaModalNotaCredito() {

    oTableModalNotaCredito = iniciaTabla('tblNotaCredito', {
        data: null,
        columns: [

            {
                data: "DOCUMENTO",
                createdCell: function (td, cellData, rowData, row, col) {
                  //  $(td).attr('align', 'center');
                }
            },
          
            {
                data: "MONTO_TOTAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    $(td).html(formatoMiles(valor));
                }
            },
            {
                  data: "MONTO_USABLE",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center');
                      var valor = cellData;
                      $(td).html(formatoMiles(valor));
                  }
              },
               {
                   data: "MONEDA",
                   createdCell: function (td, cellData, rowData, row, col) {
                       $(td).attr('align', 'center');
                   }
               },

             {
                 data: "ORIGEN_TIPO_DOC_DESC",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center');
                 }
             },

            {
                data: "DOCUMENTO_ORIGEN",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
             },

             {
                 data: "SUCURSAL_DESC",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                }
             },

             {
                 data: "MOTIVO",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'left');
                 }
             }


        ],
        //  "scrollY": "200px", "scrollCollapse": false,
        "paging": false,
        "dom": '<"top cabecera"f><t><"clear">',

        info: false

    });  
    $(".top.cabecera").append("<button class='btn green' id='btnActualizaNotaCr' type='button'><i class='icon-refresh'></i> Actualizar Datos</button>");
    $($("#tblNotaCredito").parent()).attr("id", "divtblNotaCredito");
    $("#btnActualizaNotaCr").click(function () {
        Bloquear("divtblNotaCredito");
        consultaNotaCredito();
        llenarTablaModalNotaCredito();
        Desbloquear("divtblNotaCredito");
    });
}

function llenarTablaModalNotaCredito() {

    oTableModalNotaCredito.fnClearTable();

    var json_aux = JSON.parse(JSON.stringify(json_notacredito));

    if (json_aux.length > 0) {
        if (json_select_NotaCredito.length > 0) {
            json_select_NotaCredito.filter(function (e, d) {
                
                if (json_aux!= []) {
                    json_aux.filter(function (f,g) {
                        if (f.CODIGO == e.CODIGO) {
                            json_aux.splice(g, 1);
                        }
                    });  
                } else { json_aux = []; return false;}
            });
        }

        if (json_aux.length > 0) {
            oTableModalNotaCredito.fnAddData(json_aux); 
            setTimeout(function () {                     
                oTableModalNotaCredito.fnAdjustColumnSizing();
            }, 500);
        }
    }
}

function llenarTablaModalAnticipoCompensar() {

    oTableModalAnticipoCompensar.fnClearTable();

    var json_aux = JSON.parse(JSON.stringify(json_anticipoCompensar));

    if (json_aux.length > 0) {
        if (json_select_AnticipoCompensar.length > 0) {
            json_select_AnticipoCompensar.filter(function (e, d) {

                if (json_aux != []) {
                    json_aux.filter(function (f, g) {
                        if (f.CODIGO == e.CODIGO) {
                            json_aux.splice(g, 1);
                        }
                    });
                } else { json_aux = []; return false; }
            });
        }

        if (json_aux.length > 0) {
            oTableModalAnticipoCompensar.fnAddData(json_aux);
            setTimeout(function () {
                oTableModalAnticipoCompensar.fnAdjustColumnSizing();
            }, 500);
        }
    }
}

function cargatablavaciaDetalleF(id,json) {

    oTableDeudasDetalle = $("#" + id).dataTable({
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
                     if (cellData == "ANTICIPO") {
                         $($(td).parents("tr")[0]).css({ "background-color": "antiquewhite" });
                     }
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

    if (json != null) {
        oTableDeudas.fnAddData(json);
    }
    

}

function nuevapersona() {

    window.open('?f=ncmpers', '_blank');

}

$("#btnGrabar").click(function () { verificaPago(); });





function verificaPago() {

    var aux=0, aux2=0;
    
    if (!eventoModalHide) {

        eventoModalHide |= true;
        $("#modElijeDocu").on("hide", function () {
            if (conNotaCredito) { // si hay respuesta de pase sin nota de credito o si nota de credito se valido 
                pagar();

            } else {
                alertCustom("No se asigno ningun documento de venta a nota de crédito!");
                json_nota_dcto = new Array();
            }
        });
    }

    if ($("#chkSoloNota").is(':checked')) {

        if (!vErrorBodyAnyElement(".master .obligatorio")) { //si no hay errores en los campos oblig. 
            rpta = verificarPagoNotaCredito();
            if (rpta) pagar();

        }

    } else {
        aux2 = parseFloat(montoNC);
        if (moneCode == $("#cbo_moneda").val()) {
            aux2 = parseFloat(montoNC);
            if (moneCode == '0002'){
                aux = parseFloat($("#txt_monto_base").attr("monto"));
            } else {
                aux = parseFloat($("#txt_monto_alt").attr("monto"));
            }
        } else {
            if (moneCode !== undefined) {
                if (moneCode == '0002') {
                    aux2 = parseFloat(montoNC) / parseFloat($("#txt_TC").val());
                    aux = parseFloat($("#txt_monto_alt").attr("monto"));
                } else {
                    aux2 = parseFloat(montoNC) * parseFloat($("#txt_TC").val());
                    aux = parseFloat($("#txt_monto_base").attr("monto"));
                }
            } 
        }
        if (!vErrorBodyAnyElement(".obligatorio")) {
            if ((aux >= aux2)) {
                if (parseFloat($("#txtMonto").attr("monto")) > 0){
                    rpta = verificarPagoNotaCredito(); //si hay respuesta inmediata
                    if (rpta) {
                        pagar();
                    } else {
                        //espera al cierre del modal
                    }
                } else {
                    infoCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> El monto no puede ser negativo!");
                }
            } else {
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> No puedes pagar una deuda con una nota de credito con mayor monto!");
            }
        } else {
            infoCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
        }
        /*
        if (aux >= montoNC) {
            if (!vErrorBodyAnyElement(".obligatorio") && parseFloat($("#txtMonto").attr("monto")) > 0) { //si no hay errores en los campos oblig. 
                rpta = verificarPagoNotaCredito(); //si hay respuesta inmediata
                if (rpta) {
                    pagar();
                } else {
                    //espera al cierre del modal
                }
            } else {
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
            }
        } else {
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> No puedes pagar una deuda con una nota de credito con mayor monto!");
        }
        */
    }

}


function pagarRetencion() {

    var aux_vuelto = false;
    var verificaNroOpera = "";//DPORTA 21/04/2021
    var monto = $("#txtMonto").val();
    var efectivo = $('#txtEfectivo').val();
    var vuelto = $('#txtVuelto').val();

    if (monto.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
        var re = /,/g;
        monto = monto.replace(re, '');
    }

    if (efectivo.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
        var re = /,/g;
        efectivo = efectivo.replace(re, '');
    }

    if (vuelto.indexOf(',') !== -1) { // Valida si el vuelto contiene el caracter ","
        var re = /,/g;
        vuelto = vuelto.replace(re, '');
    }

    monto    = parseFloat(monto);
    efectivo = parseFloat(efectivo);
    vuelto   = parseFloat(vuelto);

    if (monto > 0) {
        if ($('#cboMedioPago').val() === "0008") { //EFECTIVO DIRECTO
            if (efectivo >= monto) {
                if (vuelto >= 0) {
                    aux_vuelto = true;
                } else {
                    infoCustom2("Vuelto inválido");
                    return;
                }
            } else {
                infoCustom2("Efectivo recibido inválido");
                return;
            }
        } else {
            aux_vuelto = false;
        }
    }
    else {
        infoCustom2("Monto de cobro inválido");
        return;
    }

    // variables adicionales a una venta
    var efectivo_recibido = "";
    var efectivo_recibido_alterno = "";
    var vuelto = "";
    var vuelto_alterno = "";

    if (aux_vuelto) {
        var moneda_activa_cod = $("select.moneda.activo").val();
        var moneda_activa_tipo = $(".moneda.activo :selected").attr("tipo")
        var tc = parseFloat($("#txt_TC").val());
        //DPORTA
        if (typeof (moneda_activa_tipo) == "undefined") {

            moneda_activa_cod = $("#cbo_moneda").val();

            if (moneda_activa_cod == "0002") {
                let moba = "MOBA";
                moneda_activa_tipo = moba;
            } else if (moneda_activa_cod == "0003") {
                let moal = "MOAL";
                moneda_activa_tipo = moal;
            }
        }

        efectivo_recibido = $('#txtEfectivo').val();
        if (efectivo_recibido.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
            var re = /,/g;
            efectivo_recibido = efectivo_recibido.replace(re, '');
        }
        efectivo_recibido = parseFloat(efectivo_recibido);

        vuelto = $('#txtVuelto').val();
        if (vuelto.indexOf(',') !== -1) { // Valida si el vuelto contiene el caracter ","
            var re = /,/g;
            vuelto = vuelto.replace(re, '');
        }
        vuelto = parseFloat(vuelto);

        if (moneda_activa_cod == "0002" || moneda_activa_tipo == "MOBA") {
            efectivo_recibido_alterno = parseFloat(efectivo_recibido / tc).toFixed(2);
            vuelto_alterno = parseFloat(vuelto / tc).toFixed(2);
        } else if (moneda_activa_cod == "0003" || moneda_activa_tipo == "MOAL") {
            efectivo_recibido_alterno = parseFloat(efectivo_recibido * tc).toFixed(2);
            vuelto_alterno = parseFloat(vuelto * tc).toFixed(2);
        } else {
            efectivo_recibido_alterno = 0;
            vuelto_alterno = 0;
        }

    }

    cade_pagar = "";
    var p_empresa = $("#slcEmpresa").val();
    var p_user = $("#ctl00_txtus").val();
    var cade_pagoConNotacredito = "";
    var p_fecha_pago = $("#txtFechaPago").val();

    var cantidad_doc_venta = json_selec.length;
    var cantidad_notacredito = json_nota_dcto.length;

    var moneda_activa_cod = $("select.moneda.activo").val();
    var moneda_activa_tipo = $(".moneda.activo :selected").attr("tipo")
    var tc = parseFloat($("#txt_TC").val());

    //DPORTA
    if (typeof (moneda_activa_tipo) == "undefined") {

        moneda_activa_cod = $("#cbo_moneda").val();

        if (moneda_activa_cod == "0002") {
            let moba = "MOBA";
            moneda_activa_tipo = moba;
        } else if (moneda_activa_cod == "0003") {
            let moal = "MOAL";
            moneda_activa_tipo = moal;
        }
    }

    var nTotaSoloNotas = json_select_NotaCredito.filter(obj => obj.MONE_CODE == moneda_activa_cod).map(obj => parseFloat(obj.MONTO_USABLE).Redondear(2))
        .concat(json_select_NotaCredito.filter(obj => obj.MONE_CODE !== moneda_activa_cod).map(obj => parseFloat(moneda_activa_cod == '0002' ? obj.MONTO_USABLE * tc : obj.MONTO_USABLE / tc).Redondear(2))).reduce((sum, obj) => (sum + obj), 0).Redondear(2);

    var nTotalMontoPagar = parseFloat($("#txtMonto").val().split(",").join(""));
    //var nMontoSeleccionado = $(".moneda.activo :selected").attr("tipo") == "MOBA" ? parseFloat($("#txt_monto_base").attr("monto")) : parseFloat($("#txt_monto_alt").attr("monto"));
    var nMontoSeleccionado = (moneda_activa_tipo == 'MOBA') ? $('#txt_monto_base').attr('monto') : $('#txt_monto_alt').attr('monto');

    if (parseFloat($(".monto_sele").attr("monto")) == 0 || cantidad_doc_venta == 0) {
        infoCustom("No se ha seleccionado ningún documento a cobrar!");
        return;
    }

    if ((cantidad_notacredito > 0 ? ($("#chkSoloNota").is(':checked') ? nTotaSoloNotas : nTotaSoloNotas + nTotalMontoPagar) : nTotalMontoPagar).Redondear(2) > nMontoSeleccionado) {
        infoCustom("El monto ingresado es mayor al que se ha seleccionado a cobrar!");
        return;
    }

    if (nTotalMontoPagar <= 0) {
        infoCustom("¡Imposible continuar! El monto ingresado a cobrar debe ser mayor a cero.");
        return;
    }

    //DPORTA 21/04/2021
    //if ($("#cboMedioPago").val() == '0001' || $("#cboMedioPago").val() == '0003' || $("#cboMedioPago").val() == '0005' || $("#cboMedioPago").val() == '0006' || $("#cboMedioPago").val() == '0020') {
    if (mediosPago.includes($("#cboMedioPago").val())) {

        //verificaNroOpera = verificarNroOperacion($("#cbo_OrigenPago").val().substring(0, 1) + '-' + ($("#cboMedioPago").val() == '0020' ? $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val()));
        verificaNroOpera = verificarNroOperacionVenta(($("#txtDestino").val() === undefined || $("#txtDestino").val() === "" ? "-" : $("#txtDestino").val()),
            $("#cbo_OrigenPago").val().substring(0, 1) + '-' + ($("#cboMedioPago").val() == '0020' ? $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val()));

        if (verificaNroOpera == 'OK') {
            let continuar = true;
        } else {
            if (verificaNroOpera.substring(0, 1) == 'B') { //BANCO
                infoCustom2("El Nro. de Op. " + verificaNroOpera.split("@")[0].substring(2).replace("OP", '') + " ya se encuentra registrado en el sistema");
                $("#txtNroOpe").pulsate({
                    color: "#FF0000",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
                return;
            } else { //CAJA
                infoCustom2("El Cod. de Aut. " + verificaNroOpera.split("@")[0].substring(2) + " ya se encuentra registrado en el sistema");
                $("#txtNroOpe").pulsate({
                    color: "#FF0000",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
                return;
            }
        }
    }

    var medio_pa = "";
    var p_documento = "";
    var cade_pagoConNotacredito = "";
    var p_origen = "";
    var p_destino = "";

    if (cantidad_notacredito > 0) {

        json_nota_dcto.filter(function (e, d) {
            var pagado_comp_ind = 'N';


            cade_pagoConNotacredito += ("|" + e.Nota.CODIGO + "," + e.Nota.DOCUMENTO + "," + e.monto + "," + e.Nota.MONE_CODE + "," + e.Documento.CODIGO + ",");
            pagado_comp_ind = e.completo;

            json_selec.filter(function (f, g) {
                if (f.CODIGO == e.Documento.CODIGO) {

                    if (moneda_activa_tipo == "MOBA") {
                        f.POR_PAGAR_BASE -= parseFloat(e.Nota.MONE_CODE == "0002" ? e.monto : (parseFloat($("#txt_TC").val()) * e.monto));
                        if (f.POR_PAGAR_BASE <= 0) {
                            if (f.POR_PAGAR_BASE < 0) {
                                e.monto = Math.abs(f.POR_PAGAR_BASE);
                                f.POR_PAGAR_BASE = 0;
                            }
                        }
                    }
                    else {
                        f.POR_PAGAR_ALTER -= parseFloat(e.Nota.MONE_CODE == "0002" ? (e.monto / parseFloat($("#txt_TC").val())) : (e.monto));
                        if (f.POR_PAGAR_ALTER <= 0) {
                            if (f.POR_PAGAR_ALTER < 0) {
                                e.monto = Math.abs(f.POR_PAGAR_ALTER);
                                f.POR_PAGAR_ALTER = 0;
                            }
                        }
                    }

                }
            });

            cade_pagoConNotacredito += pagado_comp_ind;
        });
    }

    var json_ordenado = json_selec.sort(function (a, b) {
        if (a.FECHA_EMISION.order == b.FECHA_EMISION.order) {
            return a.POR_PAGAR_BASE - b.POR_PAGAR_BASE;
        } else {
            return a.FECHA_EMISION.order - b.FECHA_EMISION.order;
        }
    });

    var nTotalMontoPagarTemp = nTotalMontoPagar;

    if (!$("#chkSoloNota").is(':checked')) {

        var nMontoDeudaItemMOBA = 0; // monto deuda del item moneda base
        var nMontoDeudaItemMOAL = 0; // monto deuda del item moneda alternativa
        var nMontoDeudaItem = 0; // monto deuda del item
        var nMontoCobrarItem = 0;
        var sIndPago = "";
        let vMontoDeudaItemMOBA = 0; // variable monto deuda del item moneda base
        let vMontoDeudaItemMOAL = 0; // variable monto deuda del item moneda alternativa

        let oItem;
        for (let i = 0; i < json_ordenado.length && nTotalMontoPagarTemp > 0; i++) {
            oItem = json_ordenado[i];

            if (moneda_activa_tipo === "MOBA") {
                nMontoDeudaItemMOBA = parseFloat(oItem.ES_MONEDA_BASE === "N" ? (oItem.POR_PAGAR_ALTER * tc) : oItem.POR_PAGAR_BASE).Redondear(2);
                nMontoDeudaItem = parseFloat(nMontoDeudaItemMOBA);
            } else {
                nMontoDeudaItemMOAL = parseFloat(oItem.ES_MONEDA_BASE === "S" ? (oItem.POR_PAGAR_BASE / tc) : oItem.POR_PAGAR_ALTER).Redondear(2);
                nMontoDeudaItem = parseFloat(nMontoDeudaItemMOAL);
            }

            if (nMontoDeudaItem <= 0) {
                infoCustom("Imposible continua. Existen items con deuda cero");
                return;
            }

            nMontoCobrarItem = nMontoDeudaItem;
            sIndPago = "S";
            //if (nMontoDeudaItem > nTotalMontoPagarTemp) {
            //    nMontoCobrarItem = nTotalMontoPagarTemp;
            //    sIndPago = "N";
            //}

            if (moneda_activa_tipo === "MOBA") {
                vMontoDeudaItemMOBA = nMontoDeudaItemMOBA;
                vMontoDeudaItemMOAL = 0;
                nMontoDeudaItemMOBA = nMontoCobrarItem;
                nMontoDeudaItemMOAL = 0;
            } else {
                vMontoDeudaItemMOBA = 0;
                vMontoDeudaItemMOAL = nMontoDeudaItemMOAL;
                nMontoDeudaItemMOBA = 0;
                nMontoDeudaItemMOAL = nMontoCobrarItem;
            }

            //cade_pagar += ("|" + oItem.CODIGO + "," + oItem.DOCUMENTO + "," + nMontoDeudaItemMOBA + "," + nMontoDeudaItemMOAL + "," + sIndPago + "," + oItem.SUCURSAL_CODE + "," + oItem.PAGO_RETENCION);
            cade_pagar += ("|" + oItem.CODIGO + "," + oItem.DOCUMENTO + "," + nMontoDeudaItemMOBA + "," + nMontoDeudaItemMOAL + "," + sIndPago + "," + oItem.SUCURSAL_CODE + "," + oItem.PAGO_RETENCION + "," + vMontoDeudaItemMOBA + "," + vMontoDeudaItemMOAL);

            nTotalMontoPagarTemp = nTotalMontoPagarTemp - parseFloat(nMontoCobrarItem);
        }

        p_destino = $("#cbo_Det_Origen").val(); // origen
        var cod_ape = "";
        var p_moneda = $("#cbo_moneda").val();
        medio_pa = $("#cboMedioPago").val();
        var ind_tipo = $("#cbo_OrigenPago").val().substring(0, 1);
        p_origen = $("#txtDestino").val();
        var p_flag = 1.7;  //1;
        var adicional = "";

        if (medio_pa == "0020") {
            p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
        } else {
            p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
        }

        var det_desc = "", pidm_cta = "", cta = "", compl = "";

        if (ind_tipo == "B") {
            pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
            cta = $("#cbo_Det_Origen").val();
            compl = "S";
            p_flag = 1.8;  //1.5;

            switch ($("#cboMedioPago").val()) {
                case "0003": //transferencia
                    det_desc = "TRANSFERENCIA*" + "/" + $("#cboClientes :selected").html();
                    var p_origen = $("#cbDestino").val();
                    break;
                case "0013": //cheques bancarios
                    det_desc = "CHEQ.PAGADOR N°:" + $("#txtDestino").val() + " " + $("#cboClientes :selected").text();
                    adicional = $("#txtDestino").val();
                    compl = "S";
                    p_documento = "";
                    break;
                case "0001": // DEPOSITO
                    det_desc = "DEPÓSITO*" + "/" + $("#cboClientes :selected").html();
                    p_origen = $("#cbDestino").val();
                    break;
                case "0020": // OTROS (BILLETERA DIGITAL) DPORTA 09/12/2021
                    det_desc = "BILLETERA DIGITAL*" + "/" + $("#cboClientes :selected").html();
                    p_origen = $("#cbDestino").val();
                    break;
            }
        } else if (ind_tipo == "C") {
            switch ($("#cboMedioPago").val()) {
                case "0006": //tarjeta de credito
                    p_documento = p_documento.replace("OP", "COD.AUT.");
                    p_origen = p_origen.substring(12);
                    det_desc = $("#cboClientes :selected").html() + "/" + $("#txtDestino").val();
                    adicional = $("#slcPos").val() + "|" + $("#slcTarjeta").val() + "|" + $("#slcBco").val() + "|W"; //pos|marca|banco|tipoind
                    break;
                case "0005": // tarjeta de debito
                    p_documento = p_documento.replace("OP", "COD.AUT.");
                    p_origen = p_origen.substring(12);
                    det_desc = $("#cboClientes :selected").html() + "/" + $("#txtDestino").val();
                    adicional = $("#slcPos").val() + "|" + $("#slcTarjeta").val() + "|" + $("#slcBco").val() + "|W";
                    break;
                case "0008":
                    break;
            }
            cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");
        }

        var descripcion = ind_tipo == "C" ? "COBRO A CLIENTE" : det_desc;

    } else {
        var p_flag = 1.9;  //1.6;
    }
    
    var data = new FormData();
    data.append('flag', p_flag);
    data.append('empresa', p_empresa);
    data.append('detalle', cade_pagar.substring(1));
    data.append('origen', p_origen);
    data.append('usuario', p_user);
    data.append('codigo_apertura', cod_ape);
    data.append('moneda', p_moneda);
    data.append('medio_pago', medio_pa);
    data.append('descripcion', descripcion);
    data.append('fecha_pago', p_fecha_pago);
    data.append('destino', p_destino);
    data.append('documento', p_documento);
    data.append('pidmcuenta', pidm_cta);
    data.append('cuenta', cta);
    data.append('completo', compl);
    data.append('adicional', adicional);
    data.append('monto_total', $("#txtMonto").val().split(",").join(""));
    data.append('notacredito', cade_pagoConNotacredito.substring(1));
    data.append('tipo_cambio', tc);
    data.append('RUTA_IMAGEN', $("#imgSustento").attr("src"));
    data.append('efectivo_recibido', efectivo_recibido);
    data.append('efectivo_recibido_alterno', efectivo_recibido_alterno);
    data.append('vuelto', vuelto);
    data.append('asiento_contable', prmtACON);
    data.append('vuelto_alterno', vuelto_alterno);

    //Bloquear("ModalRetencion");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/CC/ajax/CCMCBCL.ASHX",
        contentType: false,
        data: data,
        processData: false,
        beforeSend: function () { Bloquear($("#ModalRetencion"), "Procesando cobro ..."); },
        cache: false
    })
        .success(function (res) {
            Desbloquear("ModalRetencion");
            var datos = $.parseJSON(res);

            if (datos[0].SUCCESS != null && datos[0].SUCCESS != "" && res.indexOf("error") < 0) {
                switch (datos[0].SUCCESS) {

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
                    case "B": // Cobro en banco                       
                        alertCustom("Error al registrar cobro bancario!");
                        break;
                    case "C": // Cobro en caja
                        alertCustom("Error al registrar cobro en caja!");
                        break;
                    case "P": // Error INSERT en FABCRED o FABAMPR
                        alertCustom("Error al procesar el cobro. Intente nuevamente!");
                        break;
                    case "TI": // Transacción incompleta
                        alertCustom("Parece que hubo un error en el cobro. Intente nuevamente!");
                        break;
                    case "TC": // Transaccion realizada correctamente 
                        if (datos[0].CODE_GENERADO != "") {
                            consultaDeudas();
                            json_selec = new Array();
                            exito();
                            $("#ModalRetencion").modal('hide');
                            $("#txt_monto_base, #txt_monto_alt, #txtMonto, #fileSustento").val("");
                            $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);
                            conNotaCredito = false;
                            $(".gen").remove();
                            $("#form_medioPago").css("display", "block")
                            $("#chkSoloNota").attr("checked", false); $("#chkSoloNota").parent().removeClass("checked");
                            $(".NotaCreditoItem").remove();
                            $("#montoNotaAgregado").html("");//DPORTA
                            $("#montoTotalAgregado").html("");//DPORTA
                            $("#txtMonto").attr("monto", 0.00);//DPORTA
                            $("#divMontoAgregado").css("display", "none")
                            json_nota_dcto = new Array();
                            json_select_NotaCredito = new Array();
                            $('.file-input-name').html("");
                            consultaNotaCredito();
                            llenarTablaModalNotaCredito();
                            limpiaCampos();
                            $("#imgSustento").attr("src", "../../recursos/img/no_disponible.jpg");
                            $(".mAppPago").css("display", "none");
                            montoNC = 0;
                            break;
                        } else {
                            alertCustom("El cobro no se realizó por ser Caja de otra Sucursal");
                            break;
                        }                          
                }
            }
            else {
                Desbloquear("ModalRetencion");
                noexito();
            }
        })
        .error(function () {
            Desbloquear("ModalRetencion");
        });      



}

// VERIFICACIÓN DE COD. OP Y COD. AUT.
//function verificarNroOperacion(nroOpera) { //DPORTA 21/04/2021
//    //var respuesta = false;

//    $.ajax({
//        type: "post",
//        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=4.5&p_NRO_OPERA=" + nroOpera,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (datos) {
//            //respuesta = datos;
//            if (datos == 'OK') {
//                respuesta = datos;
//            } else {
//                respuesta = datos;
//            };
//        },
//        error: function (msg) {
//            alertCustom("Error");
//        }
//    });
//    return respuesta;

//}

// VERIFICACIÓN DE COD. OP Y COD. AUT.
function verificarNroOperacionVenta(origen, nroOpera) { //DPORTA 21/04/2021
    //var respuesta = false;
    if ($("#cboMedioPago").val() == '0005' || $("#cboMedioPago").val() == '0006') {
        if (origen.length == 16) {
            origen = origen.substring(12);
        }
    } else if ($("#cboMedioPago").val() == '0008') {
        origen = "-";
        nroOpera = '%';
    }

    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdovr.ashx?OPCION=4.6&p_NRO_OPERA=" + nroOpera + "&p_ORIGEN_OPERA=" + origen,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            //respuesta = datos;
            if (datos == 'OK') {
                respuesta = datos;
            } else {
                respuesta = datos;
            };
        },
        error: function (msg) {
            alertCustom("Error");
        }
    });
    return respuesta;
}

function pagar() {
   
    var aux_vuelto = false;
    var verificaNroOpera = "";//DPORTA 21/04/2021
    var monto = $("#txtMonto").val();
    var efectivo = $('#txtEfectivo').val();
    var vuelto = $('#txtVuelto').val();

    if (monto.indexOf(',') !== -1) { // Valida si el monto contiene el caracter ","
        var re = /,/g;
        monto = monto.replace(re, '');
    }

    if (efectivo.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
        var re = /,/g;
        efectivo = efectivo.replace(re, '');
    }

    if (vuelto.indexOf(',') !== -1) { // Valida si el vuelto contiene el caracter ","
        var re = /,/g;
        vuelto = vuelto.replace(re, '');
    }

    monto    = parseFloat(monto);
    efectivo = parseFloat(efectivo);
    vuelto = parseFloat(vuelto);

    if ($("#chkSoloNota").is(':checked')) {
        efectivo = $("#montoTotalAgregado").val();
        vuelto = 0;
    } else {
        if (monto > 0) {
            if ($('#cboMedioPago').val() === "0008") { //EFECTIVO DIRECTO
                if (efectivo >= monto) {
                    if (vuelto >= 0) {
                        aux_vuelto = true;
                    } else {
                        infoCustom2("Vuelto inválido");
                        return;
                    }
                } else {
                    infoCustom2("Efectivo recibido inválido");
                    return;
                }
            } else {
                aux_vuelto = false;
            }
        }
        else {
            infoCustom2("Monto de cobro inválido");
            return;
        }
    }

    // variables adicionales a una venta
    var efectivo_recibido = "";
    var efectivo_recibido_alterno = "";
    var vuelto = "";
    var vuelto_alterno = "";

    if (aux_vuelto) {
        var moneda_activa_cod = $("select.moneda.activo").val();
        var moneda_activa_tipo = $(".moneda.activo :selected").attr("tipo")
        var tc = parseFloat($("#txt_TC").val());

        //DPORTA
        if (typeof (moneda_activa_tipo) == "undefined") {

            moneda_activa_cod = $("#cbo_moneda").val();

            if (moneda_activa_cod == "0002") {
                let moba = "MOBA";
                moneda_activa_tipo = moba;
            } else if (moneda_activa_cod == "0003") {
                let moal = "MOAL";
                moneda_activa_tipo = moal;
            }
        }

        efectivo_recibido = $('#txtEfectivo').val();
        if (efectivo_recibido.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
            var re = /,/g;
            efectivo_recibido = efectivo_recibido.replace(re, '');
        }
        efectivo_recibido = parseFloat(efectivo_recibido);

        vuelto = $('#txtVuelto').val();
        if (vuelto.indexOf(',') !== -1) { // Valida si el efectivo contiene el caracter ","
            var re = /,/g;
            vuelto = vuelto.replace(re, '');
        }
        vuelto = parseFloat(vuelto);

        if (moneda_activa_cod == "0002" || moneda_activa_tipo == "MOBA") {
            efectivo_recibido_alterno = parseFloat(efectivo_recibido / tc).toFixed(2);
            vuelto_alterno = parseFloat(vuelto / tc).toFixed(2);
        } else if (moneda_activa_cod == "0003" || moneda_activa_tipo == "MOAL") {
            efectivo_recibido_alterno = parseFloat(efectivo_recibido * tc).toFixed(2);
            vuelto_alterno = parseFloat(vuelto * tc).toFixed(2);
        } else {
            efectivo_recibido_alterno = 0;
            vuelto_alterno = 0;
        }        
       
    }

    var sRetencionInd = $("#cboClientes option:selected").attr("data-retencion");
    var dPorcRetencion = mGetParametro('RETN');
    var dMontoRetencion = mGetParametro('RETR');

    var dtotalRet = dMontoRetencion - parseFloat(dMontoRetencion) * (dPorcRetencion / 100);   
    

    if (sRetencionInd == 'S' && parseFloat($("#txt_monto_base").attr('monto')) > dMontoRetencion && !no_rentencion) {
        $("#montoRetencion").html('');
        $("#ModalRetencion").modal('show');
    } else {

        cade_pagar = "";
        var p_empresa = $("#slcEmpresa").val();
        var p_user = $("#ctl00_txtus").val();
        var cade_pagoConNotacredito = "";
        var p_fecha_pago = $("#txtFechaPago").val();

        var cantidad_doc_venta = json_selec.length;
        var cantidad_notacredito = json_nota_dcto.length;

        var moneda_activa_cod = $("select.moneda.activo").val();
        var moneda_activa_tipo = $(".moneda.activo :selected").attr("tipo")
        var tc = parseFloat($("#txt_TC").val());

        //DPORTA
        if (typeof (moneda_activa_tipo) == "undefined") {

            moneda_activa_cod = $("#cbo_moneda").val();

            if (moneda_activa_cod == "0002") {
                let moba = "MOBA";
                moneda_activa_tipo = moba;
            } else if (moneda_activa_cod == "0003") {
                let moal = "MOAL";
                moneda_activa_tipo = moal;
            }
        }

        var nTotaSoloNotas = json_select_NotaCredito.filter(obj => obj.MONE_CODE == moneda_activa_cod).map(obj => parseFloat(obj.MONTO_USABLE).Redondear(2))
            .concat(json_select_NotaCredito.filter(obj => obj.MONE_CODE !== moneda_activa_cod).map(obj => parseFloat(moneda_activa_cod == '0002' ? obj.MONTO_USABLE * tc : obj.MONTO_USABLE / tc).Redondear(2))).reduce((sum, obj) => (sum + obj), 0).Redondear(2);

        var nTotalMontoPagar = parseFloat($("#txtMonto").val().split(",").join(""));
        //var nMontoSeleccionado = $(".moneda.activo :selected").attr("tipo") == "MOBA" ? parseFloat($("#txt_monto_base").attr("monto")) : parseFloat($("#txt_monto_alt").attr("monto"));
        var nMontoSeleccionado = (moneda_activa_tipo == 'MOBA') ? $('#txt_monto_base').attr('monto') : $('#txt_monto_alt').attr('monto');

        if (parseFloat($(".monto_sele").attr("monto")) == 0 || cantidad_doc_venta == 0) {
            infoCustom("No se ha seleccionado ningún documento a cobrar!");
            return;
        }

        if ((cantidad_notacredito > 0 ? ($("#chkSoloNota").is(':checked') ? nTotaSoloNotas : nTotaSoloNotas + nTotalMontoPagar) : nTotalMontoPagar).Redondear(2) > nMontoSeleccionado) {
            infoCustom("El monto ingresado es mayor al que se ha seleccionado a cobrar!");
            return;
        }

        if ($("#chkSoloNota").is(':checked')) {
            if (nTotaSoloNotas <= 0) {
                infoCustom("¡Imposible continuar! El monto ingresado a cobrar debe ser mayor a cero.");
                return;
            }
        } else {
            if (nTotalMontoPagar <= 0) {
                infoCustom("¡Imposible continuar! El monto ingresado a cobrar debe ser mayor a cero.");
                return;
            }
            //DPORTA 21/04/2021
            //if ($("#cboMedioPago").val() == '0001' || $("#cboMedioPago").val() == '0003' || $("#cboMedioPago").val() == '0005' || $("#cboMedioPago").val() == '0006' || $("#cboMedioPago").val() == '0020') {
            if (mediosPago.includes($("#cboMedioPago").val())) {

                //verificaNroOpera = verificarNroOperacion($("#cbo_OrigenPago").val().substring(0, 1) + '-' + ($("#cboMedioPago").val() == '0020' ? $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val()));
                verificaNroOpera = verificarNroOperacionVenta(($("#txtDestino").val() === undefined || $("#txtDestino").val() === "" ? "-" : $("#txtDestino").val()),
                    $("#cbo_OrigenPago").val().substring(0, 1) + '-' + ($("#cboMedioPago").val() == '0020' ? $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val()));

                if (verificaNroOpera == 'OK') {
                    let continuar = true;
                } else {
                    if (verificaNroOpera.substring(0, 1) == 'B') { //BANCO
                        infoCustom2("El Nro. de Op. " + verificaNroOpera.split("@")[0].substring(2).replace("OP", '') + " ya se encuentra registrado en el sistema");
                        $("#txtNroOpe").pulsate({
                            color: "#FF0000",
                            reach: 20,
                            repeat: 3,
                            glow: true
                        });
                        return;
                    } else { //CAJA
                        infoCustom2("El Cod. de Aut. " + verificaNroOpera.split("@")[0].substring(2) + " ya se encuentra registrado en el sistema");
                        $("#txtNroOpe").pulsate({
                            color: "#FF0000",
                            reach: 20,
                            repeat: 3,
                            glow: true
                        });
                        return;
                    }
                }
            }
        }

        var medio_pa = "";
        var p_documento = "";
        var cade_pagoConNotacredito = "";
        var p_origen = "";
        var p_destino = "";

        if (cantidad_notacredito > 0) {

            json_nota_dcto.filter(function (e, d) {
                var pagado_comp_ind = 'N';


                cade_pagoConNotacredito += ("|" + e.Nota.CODIGO + "," + e.Nota.DOCUMENTO + "," + e.monto + "," + e.Nota.MONE_CODE + "," + e.Documento.CODIGO + ",");
                pagado_comp_ind = e.completo;

                json_selec.filter(function (f, g) {
                    if (f.CODIGO == e.Documento.CODIGO) {

                        if (moneda_activa_tipo == "MOBA") {
                            f.POR_PAGAR_BASE -= parseFloat(e.Nota.MONE_CODE == "0002" ? e.monto : (parseFloat($("#txt_TC").val()) * e.monto));
                            if (f.POR_PAGAR_BASE <= 0) {
                                if (f.POR_PAGAR_BASE < 0) {
                                    e.monto = Math.abs(f.POR_PAGAR_BASE);
                                    f.POR_PAGAR_BASE = 0;
                                }
                            }
                        }
                        else {
                            f.POR_PAGAR_ALTER -= parseFloat(e.Nota.MONE_CODE == "0002" ? (e.monto / parseFloat($("#txt_TC").val())) : (e.monto));
                            if (f.POR_PAGAR_ALTER <= 0) {
                                if (f.POR_PAGAR_ALTER < 0) {
                                    e.monto = Math.abs(f.POR_PAGAR_ALTER);
                                    f.POR_PAGAR_ALTER = 0;
                                }
                            }
                        }

                    }
                });

                cade_pagoConNotacredito += pagado_comp_ind;
            });
        }

        var json_ordenado = json_selec.sort(function (a, b) {
            if (a.FECHA_EMISION.order == b.FECHA_EMISION.order) {
                return a.POR_PAGAR_BASE - b.POR_PAGAR_BASE;
            } else {
                return a.FECHA_EMISION.order - b.FECHA_EMISION.order;
            }
        });

        var nTotalMontoPagarTemp = nTotalMontoPagar;

        if (!$("#chkSoloNota").is(':checked')) {

            var nMontoDeudaItemMOBA = 0; // monto deuda del item moneda base
            var nMontoDeudaItemMOAL = 0; // monto deuda del item moneda alternativa
            var nMontoDeudaItem = 0; // monto deuda del item
            var nMontoCobrarItem = 0;
            var sIndPago = "";
            let vMontoDeudaItemMOBA = 0; // variable monto deuda del item moneda base
            let vMontoDeudaItemMOAL = 0; // variable monto deuda del item moneda alternativa

            let oItem;
            for (let i = 0; i < json_ordenado.length && nTotalMontoPagarTemp > 0; i++) {
                oItem = json_ordenado[i];

                if (moneda_activa_tipo === "MOBA") {
                    nMontoDeudaItemMOBA = parseFloat(oItem.ES_MONEDA_BASE === "N" ? (oItem.POR_PAGAR_ALTER * tc) : oItem.POR_PAGAR_BASE).Redondear(2);
                    nMontoDeudaItem = parseFloat(nMontoDeudaItemMOBA);
                } else {
                    nMontoDeudaItemMOAL = parseFloat(oItem.ES_MONEDA_BASE === "S" ? (oItem.POR_PAGAR_BASE / tc) : oItem.POR_PAGAR_ALTER).Redondear(2);
                    nMontoDeudaItem = parseFloat(nMontoDeudaItemMOAL);
                }

                if (nMontoDeudaItem <= 0) {
                    infoCustom("Imposible continua. Existen items con deuda cero");
                    return;
                }

                nMontoCobrarItem = nMontoDeudaItem;
                sIndPago = "S";
                if (nMontoDeudaItem > nTotalMontoPagarTemp) {
                    nMontoCobrarItem = nTotalMontoPagarTemp;
                    sIndPago = "P";
                }

                if (moneda_activa_tipo === "MOBA") {
                    vMontoDeudaItemMOBA = nMontoDeudaItemMOBA;
                    vMontoDeudaItemMOAL = 0;
                    nMontoDeudaItemMOBA = nMontoCobrarItem;
                    nMontoDeudaItemMOAL = 0;
                } else {
                    vMontoDeudaItemMOBA = 0;
                    vMontoDeudaItemMOAL = nMontoDeudaItemMOAL;
                    nMontoDeudaItemMOBA = 0;
                    nMontoDeudaItemMOAL = nMontoCobrarItem;
                }

                //cade_pagar += ("|" + oItem.CODIGO + "," + oItem.DOCUMENTO + "," + nMontoDeudaItemMOBA + "," + nMontoDeudaItemMOAL + "," + sIndPago + "," + oItem.SUCURSAL_CODE);
                cade_pagar += ("|" + oItem.CODIGO + "," + oItem.DOCUMENTO + "," + nMontoDeudaItemMOBA + "," + nMontoDeudaItemMOAL + "," + sIndPago + "," + oItem.SUCURSAL_CODE + "," + "" + "," + vMontoDeudaItemMOBA + "," + vMontoDeudaItemMOAL);
                nTotalMontoPagarTemp = nTotalMontoPagarTemp - nMontoCobrarItem;
            }

            p_destino = $("#cbo_Det_Origen").val(); // origen
            var cod_ape = "";
            var p_moneda = $("#cbo_moneda").val();
            medio_pa = $("#cboMedioPago").val();
            var ind_tipo = $("#cbo_OrigenPago").val().substring(0, 1);
            p_origen = $("#txtDestino").val();
            var p_flag = 1.7;  //1;
            var adicional = "";
            if (medio_pa == "0020") {
                p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#cbo_appPago").val() + " - " + "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
            } else {
                p_documento = $("#txtNroOpe.personas").html() == undefined ? "OP" + $("#txtNroOpe").val() : $("#txtNroOpe").val();
            }

            var det_desc = "", pidm_cta = "", cta = "", compl = "";

            if (ind_tipo == "B") {
                pidm_cta = $("#cbo_Det_Origen :selected").attr("pidm");
                cta = $("#cbo_Det_Origen").val();
                compl = "S";
                p_flag = 1.8;  //1.5;

                switch ($("#cboMedioPago").val()) {
                    case "0003": //transferencia
                        det_desc = "TRANSFERENCIA*" + "/" + $("#cboClientes :selected").html();
                        var p_origen = $("#cbDestino").val();
                        break;
                    case "0013": //cheques bancarios
                        det_desc = "CHEQ.PAGADOR N°:" + $("#txtDestino").val() + " " + $("#cboClientes :selected").text();
                        adicional = $("#txtDestino").val();
                        compl = "S";
                        p_documento = "";
                        break;
                    case "0001": // DEPOSITO
                        det_desc = "DEPÓSITO*" + "/" + $("#cboClientes :selected").html();
                        p_origen = $("#cbDestino").val();
                        break;
                    case "0020": // OTROS (BILLETERA DIGITAL) DPORTA 09/12/2021
                        det_desc = "BILLETERA DIGITAL*" + "/" + $("#cboClientes :selected").html();
                        p_origen = $("#cbDestino").val();
                        break;
                }
            } else if (ind_tipo == "C") {
                switch ($("#cboMedioPago").val()) {
                    case "0006": //tarjeta de credito
                        p_documento = p_documento.replace("OP", "COD.AUT.");
                        p_origen = p_origen.substring(12);
                        det_desc = $("#cboClientes :selected").html() + "/" + $("#txtDestino").val();
                        adicional = $("#slcPos").val() + "|" + $("#slcTarjeta").val() + "|" + $("#slcBco").val() + "|W"; //pos|marca|banco|tipoind
                        break;
                    case "0005": // tarjeta de debito
                        p_documento = p_documento.replace("OP", "COD.AUT.");
                        p_origen = p_origen.substring(12);
                        det_desc = $("#cboClientes :selected").html() + "/" + $("#txtDestino").val();
                        adicional = $("#slcPos").val() + "|" + $("#slcTarjeta").val() + "|" + $("#slcBco").val() + "|W";
                        break;
                    case "0008":
                        break;
                }
                cod_ape = $("#cbo_Det_Origen :selected").attr("codigo");
            }

            var descripcion = ind_tipo == "C" ? "COBRO A CLIENTE" : det_desc;

   } else {
            var p_flag = 1.9;  //1.6;
   }


        console.log(cade_pagar.substring(1));
        var data = new FormData();
        data.append('flag', p_flag);
        data.append('empresa', p_empresa);
        data.append('detalle', cade_pagar.substring(1));
        data.append('origen', p_origen);
        data.append('usuario', p_user);
        data.append('codigo_apertura', cod_ape);
        data.append('moneda', p_moneda);
        data.append('medio_pago', medio_pa);
        data.append('descripcion', descripcion);
        data.append('fecha_pago', p_fecha_pago);
        data.append('destino', p_destino);
        data.append('documento', p_documento);
        data.append('pidmcuenta', pidm_cta);
        data.append('cuenta', cta);
        data.append('completo', compl);
        data.append('adicional', adicional);
        data.append('monto_total', $("#txtMonto").val().split(",").join(""));
        data.append('notacredito', cade_pagoConNotacredito.substring(1));
        data.append('tipo_cambio', tc);
        data.append('RUTA_IMAGEN', $("#imgSustento").attr("src"));
        data.append('efectivo_recibido', efectivo_recibido);
        data.append('efectivo_recibido_alterno', efectivo_recibido_alterno);
        data.append('vuelto', vuelto);
        data.append('asiento_contable', prmtACON);
        data.append('vuelto_alterno', vuelto_alterno);

       //Bloquear("ventana");
       var jqxhr = $.ajax({
           type: "POST",
           url: "vistas/CC/ajax/CCMCBCL.ASHX",
           contentType: false,
           data: data,
           processData: false,
           beforeSend: function () { Bloquear($("#ventana"), "Procesando cobro ..."); },
           cache: false
       })
           .success(function (res) {
               Desbloquear("ventana");
               var datos = $.parseJSON(res);

               if (datos[0].SUCCESS != null && datos[0].SUCCESS != "" && res.indexOf("error") < 0) {
                   switch (datos[0].SUCCESS) {

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
                       case "B": // Cobro en banco                       
                           alertCustom("Error al registrar cobro bancario!");
                           break;
                       case "C": // Cobro en caja
                           alertCustom("Error al registrar cobro en caja!");
                           break;
                       case "P": // Error INSERT en FABCRED o FABAMPR
                           alertCustom("Error al procesar el cobro. Intente nuevamente!");
                           break;
                       case "TI": // Transacción incompleta
                           alertCustom("Parece que hubo un error en el cobro. Intente nuevamente!");
                           break;
                       case "TC": // Transaccion realizada correctamente
                           if (datos[0].CODE_GENERADO != "") {
                               consultaDeudas();
                               json_selec = new Array();
                               exito();
                               $("#txt_monto_base, #txt_monto_alt, #txtMonto, #fileSustento").val("");
                               $("#txt_monto_base, #txt_monto_alt").attr("monto", 0.00);
                               conNotaCredito = false;
                               $(".gen").remove();
                               $("#form_medioPago").css("display", "block")
                               $("#chkSoloNota").attr("checked", false); $("#chkSoloNota").parent().removeClass("checked");
                               $(".NotaCreditoItem").remove();
                               $("#montoNotaAgregado").html("");//DPORTA
                               $("#montoTotalAgregado").html("");//DPORTA
                               $("#txtMonto").attr("monto", 0.00);//DPORTA
                               $("#divMontoAgregado").css("display", "none")
                               json_nota_dcto = new Array();
                               json_select_NotaCredito = new Array();
                               $('.file-input-name').html("");
                               consultaNotaCredito();
                               llenarTablaModalNotaCredito();
                               limpiaCampos();
                               montoNC = 0;
                               $("#imgSustento").attr("src", "../../recursos/img/no_disponible.jpg");
                               $(".mAppPago").css("display", "none");
                               break;
                           } else {
                               alertCustom("El cobro no se realizó por ser Caja de otra Sucursal");
                               break;
                           }                           
                   }
               }
               else {
                   Desbloquear("ventana");
                   noexito();
               }
               no_rentencion = false;
           })
           .error(function () {
               Desbloquear("ventana");
           });    

    }

}

function cargaMediosDePago() {


    $.ajaxSetup({ async: false });
    $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: 2 },
      function (res) {
          if (res != null && res != "" && res.indexOf("error") < 0) {

            
              StringMediosPago = res;

          }

      });
    $.ajaxSetup({ async: true });



}

function CargaInicialVenta() {
    var cod = ObtenerQueryString("codigo");
    var caja= ObtenerQueryString("caja");

    if (cod != undefined) {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCC&p_FVBVTAC_CODE=" + cod,
            contentType: "application/json;",
            dataType: "json",
            async:false,
            success: function (datos) {

                $("#slcEmpresa").select2("val",datos[0].EMPRESA).change();
                
                if (datos[0].RESPONSABLE_PAGO_PIDM != "") {
                    $("#cboClientes").select2("val",datos[0].RESPONSABLE_PAGO_PIDM).change();
                }else{
                    $("#cboClientes").select2("val",datos[0].CLIE_PIDM).change();
                }

                $("#cbo_OrigenPago").select2("val", "Caja").change();
                $("#cbo_Det_Origen").select2("val", caja).change(); 

                var filas = oTableDeudas.fnGetData();

                for (var i = 0; i < filas.length; i++) {
                    if (filas[i].CODIGO!= undefined) {
                        if (filas[i].CODIGO == cod) {
                            $(".selecChk").attr("checked", true);
                            $(".selecChk").click();
                            $(".selecChk").attr("checked", true);

                        }
                    }
                }
                //window.history.pushState("Object", "COBRO CLIENTES", "/Default.aspx?f=CCMCBCL");
               //$("#txt_valor_cambio").val(datos[0].VALOR_CAMBIO);
               //$("#txt_valor_cambio_Oficial").val(datos[0].VALOR_CAMBIO_OFI);
               //$("#txt_valor_cambio").val(datos[0].VALOR_CAMBIO);     
            },
            error: function (msg) {
                alertCustom("No se listó correctamente venta por cobrar");
            }
        });
        Desbloquear("ventana");

    }
}

$(document).on("change", ".slcModDocumento", function () {

    var NCSelec = this.selectedOptions[0]; // documento seleccionado
    var val0r = NCSelec.value;
    var codigoNotaCredito = this.getAttribute("scodnota");
    var notActual = json_select_NotaCredito.filter(function (e, d) { return e.CODIGO == codigoNotaCredito; })[0];
    var docActual = json_selec.filter(function (obj, d) { return obj.CODIGO == val0r; })[0];

    var montoDocuActual = notActual.MONE_CODE == notActual.MONE_CODE ? docActual.POR_PAGAR_BASE : docActual.POR_PAGAR_ALTER;
    var montoNotaActual = parseFloat(notActual.MONTO_USABLE).Redondear(2);

    var oAmortizacionesDoc = ArrObjectValidacionDocu.filter(function (obj) { return obj.codigo == val0r; });
    var oAmortizacionesNot = ArrObjectValidacionNota.filter(function (obj) { return obj.codigo == codigoNotaCredito; });

    // actualizar montos
    montoDocuActual = parseFloat(oAmortizacionesDoc.length > 0 ?
        montoDocuActual - (oAmortizacionesDoc.length > 1 ? oAmortizacionesDoc.map(ob => ob.montoAmort).reduce((ob1, ob2) => ob1 + ob2) : oAmortizacionesDoc[0].montoAmort) :
        montoDocuActual).Redondear(2);

    montoNotaActual = parseFloat(oAmortizacionesNot.length > 0 ?
        montoNotaActual - (oAmortizacionesNot.length > 1 ? oAmortizacionesNot.map(ob => ob.montoAmort).reduce((ob1, ob2) => ob1 + ob2) : oAmortizacionesNot[0].montoAmort) :
        montoNotaActual).Redondear(2);

    //verificacion

    if (montoDocuActual >= montoNotaActual) { // se usa la nota en su totalidad para un documento / sobra para otra nota       

        var flag_existe = false;
        var posicion = 0;
        json_nota_dcto.filter(function (e, d) {
            if (e.Nota.CODIGO == codigoNotaCredito && e.monto == montoNotaActual) {
                flag_existe = true;
                posicion = d;
            }
        });

        if (flag_existe) {
            json_nota_dcto.splice(posicion, 1);
        }

        ArrObjectValidacionDocu.filter(function (e, d) {
            if (e.nota == codigoNotaCredito && e.montoAmort == montoNotaActual) {
                flag_existe = true;
                posicion = d;
            }
        });

        if (flag_existe) {
            ArrObjectValidacionDocu.splice(posicion, 1);
        }


        ArrObjectValidacionDocu.push({ "codigo": val0r, "nota": codigoNotaCredito, "montoAmort": montoNotaActual });

        if (montoDocuActual == montoNotaActual) {
            json_nota_dcto.push({ "Documento": docActual, "Nota": notActual, "monto": montoNotaActual, "completo": "S" });
        } else {
            json_nota_dcto.push({ "Documento": docActual, "Nota": notActual, "monto": montoNotaActual, "completo": "N" });
        }

        

    } else { // sobra dinero en la nota para otro documento

        this.setAttribute("disabled", true);

        objComboDocumentos.item(this.selectedIndex).setAttribute("disabled", true);


        //otros cbos
        $(".slcModDocumento option[value=" + val0r + "]").attr("disabled", true);
        if (oAmortizacionesDoc.length > 0) {
            $(".slcModDocumento :selected[value=" + val0r + "]").parent("select").attr("disabled", true);
        }


        ArrObjectValidacionNota.push({ "codigo": codigoNotaCredito, "montoAmort": montoDocuActual });

        json_nota_dcto.push({ "Documento": docActual, "Nota": notActual, "monto": montoDocuActual, "completo": "S" });

        // se crea otro objeto
        objComboDocumentos.setAttribute("scodnota", codigoNotaCredito);
        objComboDocumentos.setAttribute("index", oAmortizacionesNot.length);
        this.parentElement.append(objComboDocumentos.cloneNode(true));

    }

});

function verificarPagoNotaCredito() {

    
    // reiniciar Elementos
    json_nota_dcto = new Array();

    ArrObjectValidacionNota = new Array();
    ArrObjectValidacionDocu = new Array();
   


    var cantidad = json_select_NotaCredito.length; //Array que contiene a las notas de créditos agregadas
    var cantidad2 = json_selec.length; // Array de Documentos a pagar seleccionados 
      
                            
    $(".gen").remove();

    if (cantidad > 0) { // si existen notas de credito

        if (cantidad2 > 1) { // si existe mas de un documento a pagar

            for (var j = 0; j < cantidad; j++) {

                objComboDocumentos = document.createElement("select")
                objComboDocumentos.setAttribute("data-placeholder", "DOCUMENTO");
                objComboDocumentos.className = "slcModDocumento obligatorio span12";
                objComboDocumentos.append(document.createElement("option"));

                for (var i = 0; i < cantidad2; i++) { // agregar documentos a oCombo
                    var objItemCombo = document.createElement("option");
                    objItemCombo.innerHTML = json_selec[i].DOCUMENTO + " <b>|</b> " + (json_select_NotaCredito[j].MONE_CODE == "0002" ? (" S/." + formatoMiles(json_selec[i].POR_PAGAR_BASE)) : (" $." + formatoMiles(json_selec[i].POR_PAGAR_ALTER)));
                    objItemCombo.value = json_selec[i].CODIGO;
                    objComboDocumentos.append(objItemCombo);
                }

                var objLabel = document.createElement("label");
                objLabel.id = "lblMod" + json_select_NotaCredito[j].CODIGO;
                objLabel.className = "slcModNotaCredito";
                objLabel.innerHTML = json_select_NotaCredito[j].DOCUMENTO + " <b>|</b> " + json_select_NotaCredito[j].MONEDA_SIMBOLO + formatoMiles(json_select_NotaCredito[j].MONTO_USABLE);

                objComboDocumentos.setAttribute("scodnota", json_select_NotaCredito[j].CODIGO);

                insertar_fila("#divbody", objLabel.outerHTML, objComboDocumentos.outerHTML);
            }

            //  $(".slcModDocumento").select2();

            $("#modElijeDocu").modal("show");

            return false;

        } else { // si existe un documento y una varias notas
            var tc = parseFloat($("#txt_TC").val());
            json_select_NotaCredito.forEach(
                function (obj) {
                    var montoLetra = parseFloat(obj.MONTO_USABLE).Redondear(2);
                    var montoVenta = parseFloat(json_selec[0].POR_PAGAR_BASE).Redondear(2)
                    var indPagado = "S";

                    if (montoVenta > montoLetra) {
                        indPagado = "P";
                    }

                    json_nota_dcto.push({ "Documento": json_selec[0], "Nota": obj, "monto": montoLetra, "completo": indPagado });
                }
            );

            return true;

        }

    } else {
        if ($("#chkSoloNota").is(":checked")) {
            infoCustom("No hay ninguna nota de crédito agregada!");
        }
        else {
            return true;
        }
    }
    
}

function verificaNotaDcto(){
   
    if (!vErrorBodyAnyElement(".slcModDocumento")) {
        
        conNotaCredito = true;
        $("#modElijeDocu").modal("hide");

    } else {
        conNotaCredito = false;
       
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }

}

function insertar_fila(padre, html1, html2) {

    var filaHtml='<div class="row-fluid gen">' +
                 '  <div class="span6">' +
                 '      <div class="control-group ">' +
                 html1 +
                 '     </div>' +
                 ' </div>' +
                 ' <div class="span6">' +
                 '     <div class="control-group ">' +
                 html2 +
                 '     </div>' +
                 ' </div>' +
                 '</div>';
    $(padre).append(filaHtml);
}

$("#chkSoloNota").click(function () {

    if($(this).is(':checked')){
        $("#form_medioPago").slideUp(true);
        var d = 0.00; json_select_NotaCredito.filter(function (e, f) {
            d += parseFloat(e.MONTO_USABLE);
            return d;
        });
        $("#listaAgregados").parent().append("<div id='divMonedaSoloNota' class='row-fluid NotaCreditoItem'>" + $("#divMoneda").html().split("cbo_moneda").join("cbo_monedaSoloNota") + "</div>");
        $("#s2id_cbo_monedaSoloNota").remove(); $("#cbo_monedaSoloNota").addClass("moneda").addClass("activo").css("display", "block").select2().attr("disabled",false);
        $("#cbo_moneda").removeClass("activo");

        $("#cbo_monedaSoloNota").select2("val", "0002").change(function () {
            var val0r=$("#cbo_monedaSoloNota").val();
            var d = 0.00; json_select_NotaCredito.filter(function (e, f) {
                var auxMonto = e.MONTO_USABLE;
                if (e.MONE_CODE != val0r) {
                    if (val0r == "0002")
                        auxMonto *= parseFloat($("#txt_TC").val());
                    else {
                        auxMonto /= parseFloat($("#txt_TC").val());
                    }
                }
                d += parseFloat(auxMonto);
                return d;
            });
            var moneda_simbolo = val0r == "0002" ? "S/." : "$.";

            $("#lblMontoTotalSoloNota").attr("monto", d.toFixed(2)).html("Total: " + moneda_simbolo + formatoMiles(d));
        });
        var moneda_simbolo = ($("#cbo_monedaSoloNota").val() == "0002" || $("#cbo_monedaSoloNota").val() == "") ? "S/." : "$.";
        $("#listaAgregados").parent().append("<div id='MontoTotalSoloNota' class='row-fluid NotaCreditoItem'><div class='span12'><span id='lblMontoTotalSoloNota'>Total: " + moneda_simbolo + formatoMiles(d) + "</span></div></div>");
    }else{
        $("#form_medioPago").slideDown(true);
        $("#MontoTotalSoloNota, #divMonedaSoloNota").remove();
        $("#cbo_moneda").addClass("activo");
    }

});

function CargarDatosCobroPorDefecto() {
    //CARGA POR DEFECTO
  //  $('#cbo_OrigenPago').select2("val", "Caja").change();
    if ($("#cbo_Det_Origen option").length > 0) {
        var cbo = $("#cbo_Det_Origen option");
        $("#cbo_Det_Origen").select2("val", $($("#cbo_Det_Origen option")[1]).val()).change();

        if ($("#cboMedioPago option").length > 0) {
            $("#cboMedioPago").select2("val", "0008"); //EFECTIVO DIRECTO           
            $("#cboMedioPago").change(); //EFECTIVO DIRECTO    
            var jsonUsuario = devuelveDatosUsuario($("#ctl00_lblusuario").html());
            if (jsonUsuario != null) {
                $("#txtNroOpe").val(jsonUsuario[0].NOMBRE).keyup().siblings("ul").children("li").click();
                $("#txtClientes").focus();
            }
        }
    }
}

function limpiaCampos() {
   //$("#form_medioPago input,#form_medioPago select ").not("input[class*=select2]").attr("disabled", true);
   $("#form_medioPago input").not("input[class*=select2]").val("");
   //$("#form_medioPago select").not("#cbo_OrigenPago").select2("val", "").change().attr("disabled", true);

   $("#cbo_OrigenPago").select2("val", "");
   //$("#cbo_OrigenPago").attr("disabled", false);

   $("#cbo_Det_Origen").select2("val", "");
   $("#cbo_Det_Origen").attr("disabled", true);
   $("#cbo_Det_Origen").attr("data-placeholder", "-").select2("val", "").change();  

   $("#cboMedioPago").select2("val", "");   
   $("#cboMedioPago").attr("disabled", true);
   $("#cboMedioPago").attr("data-placeholder", "").select2("val", "").change();

   $("#cbo_moneda").select2("val", "");
   $("#cbo_moneda").attr("disabled", true);
   $("#cbo_moneda").attr("data-placeholder", "-").select2("val", "").change();

   $("#txtNroOpe").attr("disabled", true);
   $("#txtMonto").attr("disabled", true);
   $("#txtDestino").attr("disabled", true);

   $("#lbl_detalle1").html("-");
   $("#lbl_detalle3").html("-");
   $("#lbl_detalle4").html("-");

  

   oTableDeudas.fnClearTable()
}

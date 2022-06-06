


var NVMCOMR = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();
        $('#txtFechaEmision').datepicker();
               
        $('#txtSerie').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 5, "greedy": false }); })
        $('#txtNro').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 15, "greedy": false }); })

        //$("#cboMes").select2();
        //$('#txtanio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
        $('#txtanio').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#cboMes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());
        //OBTENER MES
        //$("#cboMes").datepicker("getDate").getMonth() + 1
        $('#cbo_periodo').select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
        }
    }

 
    var fillCbo_Periodo = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (!isEmpty(datos)) {
                    var valor = "";
                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                        if (i == datos.length - 1) {
                            valor = datos[i].COD;
                        }
                    }
                    var cod = ObtenerQueryString("codigo");
                    if (cod == undefined) {
                        $('#cbo_periodo').select2("val", valor);
                    } else {
                        $('#cbo_periodo').select2("val", "");
                    }
                  
                } else {
                    infoCustom2("No hay periodos aperturados para el catalago seleccionado")
                }
                Desbloquear("div_periodo")
            },
            error: function (msg) {
                alertCustom("Error al cargar periodo.");
                Desbloquear("div_periodo")
            }
        });
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
          
        });

        $("#grabar").on("click", function () {
            Crear();
        });

        $("#btnBuscarDctoOrigen").on("click", function () {

            if (vErrors(["txt_emisor", "txtFechaEmision"])) {
              ListarDctosOrigen();
            }
        });

        $("#txt_ajuste").on("keyup", function () {
            total = $("#txtMontoTotal").val()

            var ajuste_total = 0
            var ajuste = 0
            if ($(this).val().length <= 0 || $(this).val() == "-") {
                $("#txt_total_ajuste").val("0.00")
            }
            else {
                ajuste = $(this).val()
                ajuste_total = parseFloat(ajuste) + parseFloat(total)
                $("#txt_total_ajuste").val(ajuste_total.toFixed(2))
            }


           
        });


        $('#chk_ajuste').on('click', function () {
            if ($("#chk_ajuste").is(':checked')) {

                if (parseFloat($("#txtMontoTotal").val()) != 0) {


                    $('#uniform-chk_ajuste span').removeClass().addClass("checked");
                    $('#chk_ajuste').attr('checked', true);
                    $(".ajuste").css("display", "")
                } else {

                    infoCustom2("No se puede aplicar ajuste a un total de 0")
                    $('#uniform-chk_ajuste span').removeClass();
                    $('#chk_ajuste').attr('checked', false);
                }
               
            } else {

                $('#uniform-chk_ajuste span').removeClass();
                $('#chk_ajuste').attr('checked', false);
                $(".ajuste").css("display", "none")
                $("#txt_total_ajuste").val("0.00")
                $("#txt_ajuste").val("");
            }
        });

        
         x = 1;
        $("#btn_add").on("click", function () {
            var div = $("#div_generador")
            div.append('<div class="row-fluid limpiar" id="div_' + (x = x + 1) + '" >' +
                         '<div class="span12">' +
                         '<div class="span2"></div>'+
                          ' <div class="span3">'+
                           ' <div class="control-group">'+
                                '<div class="controls">'+
                                   ' <input id="txtCodAut" type="hidden" />'+
                                   ' <input id="txtCodDctoOrigen_' + (x ) + '" class="txtCodDctoOrigen inputOrigen" type="hidden" />' +
                                   ' <input id="txtSerieDctoOrigen_' + (x ) + '" class="txtSerieDctoOrigen inputOrigen numeros span4 center" type="text" disabled placeholder="Serie"/>' +
                                   ' <input id="txtNroDctoOrigen_' + (x ) + '" class="txtNroDctoOrigen inputOrigen numeros span8 center" type="text" disabled style="margin-left: -2px;" placeholder="Nro." />' +
                               ' </div>'+
                           ' </div>'+
                      '  </div>'+
                       ' <div class="span2">'+
                           ' <div class="control-group">'+
                               ' <div class="controls">'+
                                 
                                    '  <a id="btn_remove" onclick="javascript:EliminaFila(this);" class="minus btn red"><i class="icon-minus" style="line-height: initial;"></i></a>' +
                               ' </div>'+
                           ' </div>'+
                       ' </div>'+
                      ' <div class="span2">'+
                      '  <div class="control-group">'+
                          '  <div class="controls">'+
                              '  <input id="txtMontoRetencion_' + (x) + '" class="txtMontoRetencion span8" type="text" disabled="" style="text-align: right;">' +
                           ' </div>'+
                       ' </div>'+
                  '  </div>'+
                         '</div>'+
                       '</div>')
        });


        $("#txtFechaEmision").datepicker().on("changeDate", function (e) {
         
            Bloquear("div_tc_o")
            Bloquear("div_botones")
            ListarValorCambioOficial('MOAL',$(this).val())



        });

        $("#cboEmpresa").on("change", function () {
            Bloquear("div_periodo")
            fillCbo_Periodo();
        });
        
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {

        } else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }

    }
      
    return {
        init: function () {
            plugins();           
            eventoControles();
            fillCboEmpresa();
           
            filltxtEmisor('#txt_emisor', '');
            cargaInicial();
        }
    };
}();

function EliminaFila(x) {

    var total = 0;
    $(x).parents()[4].remove();

    for (var i = 1 ; i <= $("#div_generador").children().length ; i++) {
        var div = $($("#div_generador").children()[i - 1]).attr("id")
        if ($("#" + div + " .txtSerieDctoOrigen").val() != "" && $("#" + div + " .txtNroDctoOrigen").val() != "") {
            
           
            var valor = $("#" + div + " .txtMontoRetencion").val();
             total = parseFloat(total) + parseFloat(valor);
            

           
        }
    }
    $("#txtMontoTotal").val(formatoMiles(total));

}


function ListarValorCambioOficial(monecode,fecha) {


        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMCOMR.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=OFICIAL&p_FECHA_EMISION=" + fecha,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                    $('#lbl_TC_Oficial').html(datos[0].VALOR_CAMBIO_VENTA);
                    $("#hfTCO").val(datos[0].VALOR_CAMBIO_VENTA)
                }
                else {
                    $('#lbl_TC_Oficial').html("-");
                    $("#hfTCO").val("")
                }
                Desbloquear("div_tc_o")
                Desbloquear("div_botones")
            },
            error: function (msg) {
                alertCustom("Tipo de cambio Oficial no se obtuvo correctamente.");
                Desbloquear("div_tc_o")
                Desbloquear("div_botones")
            }
        });
    
}

function ListarDctosOrigen() {
    var data = new FormData();

    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('p_USUA_ID', $("#ctl00_txtus").val());
    data.append('p_PIDM', $("#hfPIDM").val());
    data.append('p_DESDE', $("#txtDesde").val());
    data.append('p_HASTA', $("#txtHasta").val());


    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/NVMCOMR.ashx?OPCION=2",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async:true
    })
   .success(function (datos) {
       Desbloquear("ventana");
       if (datos != null) {
           //Reporte
           $('#divTblBuscarDcto').html(datos);

           oTable= $("#tblBuscarDcto").dataTable({
               "sDom": '<"clear">lfrtip',
               "sPaginationType": "full_numbers",
               "oLanguage": {
                   "sEmptyTable": "No hay datos disponibles en la tabla.",
                   "sZeroRecords": "No hay datos disponibles en la tabla."
               },
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
                   "sButtonText": "Exportar a Excel"
               }
                   ]
               }
           });

               
           oTable.fnSetColumnVis(0, false, true);
           oTable.fnSetColumnVis(1, false, true);
           oTable.fnSetColumnVis(2, false, true);
           oTable.fnSetColumnVis(3, false, true);
           oTable.fnSetColumnVis(9, false, true);

           $('#tblBuscarDcto tbody').on('click', 'tr', function () {
               if ($(this).hasClass('selected')) {
                   $(this).removeClass('selected');
               }
               else {
                   oTable.$('tr.selected').removeClass('selected');
                   $(this).addClass('selected');

                   var pos = oTable.fnGetPosition(this);
                   var row = oTable.fnGetData(pos);

                   if (row != null) {
                    var code = row[0];                
                   var serie = row[1];
                   var nro = row[2];
                   var tipoDcto = row[3];
                   var emision = row[5].display;
                   var montoRetencion = row[8];
                   var monedaDesc = row[7];
                   var monedaCode = row[9];
                       
                   CargarDctoOrigen(code,serie,nro,tipoDcto,emision,montoRetencion,monedaDesc,monedaCode);

                   }
                  
               }
           });


           $("#modalBuscarDcto").modal("show");
       } else {
           noexito();
       }
   })
   .error(function () {
       Desbloquear("ventana");
       noexito();
   });


}

var dctoOrigen = {};
function CargarDctoOrigen(code, serie, nro, tipoDcto, emision, montoRetencion, monedaDesc, monedaCode) {
      
    dctoOrigen.CODIGO = code;
    dctoOrigen.SERIE = serie;
    dctoOrigen.NRO = nro;
    dctoOrigen.EMISION= emision;
    dctoOrigen.TIPO_DCTO = tipoDcto;
    dctoOrigen.MONTO_RETENCION = montoRetencion;
    dctoOrigen.MONEDA_CODE = monedaCode;
    dctoOrigen.MONEDA_DESC = monedaDesc;

    //$("#txtCodDctoOrigen_1").val(code);
    //$("#txtSerieDctoOrigen_1").val(serie);
    //$("#txtNroDctoOrigen_1").val(nro);
    //if (emision != "") {
    //    $("#txtFechaEmision").datepicker("setStartDate", emision);
    //}
    //$("#txtMontoRetencion").val(formatoMiles(montoRetencion));
    //$(".simboloMoneda").html("(" + monedaDesc + ")");
    var inputs_lenght = $("#div_generador").children().length
    if (inputs_lenght > 0) {

        if (inputs_lenght == 1) {
            $("#div_1 .txtNroDctoOrigen").val("")
            $("#div_1 .txtSerieDctoOrigen").val("")
            $("#div_1 .txtMontoRetencion").val("")
            $("#div_1 .txtCodDctoOrigen").val("")
            
           
            $("#txtMontoTotal").val("0.00");
        }

        //valido si existe 
        for (var i = 1 ; i <= $("#div_generador").children().length ; i++) {
            var div = $($("#div_generador").children()[i - 1]).attr("id")

            if ($("#" + div + " .txtSerieDctoOrigen").val() == serie && $("#" + div + " .txtNroDctoOrigen").val() == nro) {
                infoCustom2("El documento seleccionado ya ha sido agregado anteriormente.");
                return;
            }
        }


        for (var i = 1 ; i <= $("#div_generador").children().length ; i++) {
            var div = $($("#div_generador").children()[i - 1]).attr("id")
            if ($("#" + div + " .txtSerieDctoOrigen").val() == "" && $("#" + div + " .txtNroDctoOrigen").val() == "") {

                if (monedaCode != "0002") {
                    var TCO = $("#hfTCO").val();
                    if (TCO != "") {

                        montoRetencion = parseFloat(montoRetencion) * parseFloat(TCO)
                    } else {
                        montoRetencion = 0
                        infoCustom2("No se realizo la conversion , no existe tipo de cambio oficial!!")
                    }
                }

                
                $("#" + div + " .txtCodDctoOrigen").val(code + ';' + formatoMiles(montoRetencion)).change()
                $("#" + div + " .txtNroDctoOrigen").val(nro).change()
                $("#" + div + " .txtSerieDctoOrigen").val(serie).change()
                $("#" + div + " .txtMontoRetencion").val(formatoMiles(montoRetencion)).change()

                var valor = $("#txtMontoTotal").val();
                var total = parseFloat(valor) + parseFloat(montoRetencion)
                $("#txtMontoTotal").val(formatoMiles(total)).change();

                $("#modalBuscarDcto").modal("hide");
                return;
            } 
        }
    }
   

   
}

function Crear() {
    var continuar = false;
    if (vErrors(["cboEmpresa", "txtSerie", "txtNro", "txtFechaEmision", "cbo_periodo"])) {
       
        if (vErrors(inputs_validar())) {
            var mesEmision = $("#txtFechaEmision").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
            var anioEmision = $("#txtFechaEmision").val().split("/")[2];
            var mesPeriodo = $("#cbo_periodo").val().split("-")[0];//$("#cbo_periodo").val() :: "1-2016"
            var anioPeriodo = $("#cbo_periodo").val().split("-")[1];
            if (parseInt(anioEmision) == parseInt(anioPeriodo)) {
                if (parseInt(mesEmision) <= parseInt(mesPeriodo)) {
                    continuar = true;
                } else {
                    continuar = false;
                }
            } else if (parseInt(anioEmision) < parseInt(anioPeriodo)) {
                continuar = true;
            } else {
                continuar = false;
            }
        }
            
    }

    var docs_org = obtener_Documentos();

    if (docs_org == "|") {
        continuar = false;
    }


    
    if (continuar) {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        //var tipo = $("#txtCodDctoOrigen_1").val();
        //if (tipo.indexOf("V") == 0) {
        //    tipo = "C";
        //} else {
        //    tipo = "P";
        //}
        // data.append('p_TIPO', tipo);
        data.append('p_PIDM', $("#hfPIDM").val());
        data.append('p_SERIE', $('#txtSerie').val());
        data.append('p_NRO', $("#txtNro").val());
        //data.append('p_COD_AUT', $("#txtCodAut").val());
        data.append('p_FECHA_EMISION', $("#txtFechaEmision").val());
        //data.append('p_DCTO_ORIGEN_CODE', $("#txtCodDctoOrigen_1").val());
        data.append('p_PERIODO_ANIO', $("#cbo_periodo").val().split("-")[1]);
        data.append('p_PERIODO_MES', $("#cbo_periodo").val().split("-")[0]);
        data.append('p_TOTAL', $("#txtMontoTotal").val());
        data.append('p_DOCS_ORIGEN', docs_org);
        data.append('p_AJUSTE', $("#txt_ajuste").val());
        

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMCOMR.ashx?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (!isEmpty(datos)) {
               if (datos[0].RESPUESTA == "OK") {
                   exito();
                   //BloquearCampos
                   BloqueaCampos();



               } else if (datos[0].CODIGO == "LIMITE") {
                   alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Se ha excedido el límite de documentos autorizados!");
               }
               else if (datos[0].CODIGO == "ERROR") {
                   alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/>");
               }
               else {
                   alertCustom(datos[0].CODIGO);//Mensaje de error de bd
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    } else {
        infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
        $("#cbo_periodo").focus();
    }
}
//---------------------------------------------

var NVLCOMR = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();

        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });

        $('#txtanio').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#cboMes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());

    }
    
    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
        }
    }

    var cargatablavacia = function () {
        oTableRetenciones = $('#tblBandeja').dataTable({
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
                    data: "RAZON_SOCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .css({ "text-align": "left" });
                    }
                },
                {
                    data: "PERIODO_ANIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var valor = cellData;
                        valor = rowData.PERIODO_MES + ' - ' + rowData.PERIODO_ANIO; 

                        $(td).css({ "text-align": "center" });

                        $(td).html(valor);
                    },
                    
                },
                {
                    data: "EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .css({ "text-align": "center" });
                    },
                    type: "fecha"

                },
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .css({ "text-align": "left" });
                    }
                },
                {
                    data: "MONTO_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var valor = cellData;
                        
                        $(td).css({ "text-align": "center" });
                        $(td).html('S/  ' + formatoMiles(valor));
                    }
                },
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td)
                            .css({ "text-align": "left" });
                    },
                    visible:false,
                } 

            ],
            "scrollY": "280px",
            "scrollCollapse": false,
            "paginate": true,                      

        });

        $('#tblBandeja tbody').on('click', '.detDoc', function () {            
            var pos = oTableRetenciones.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableRetenciones.fnGetData(pos);            
            var id = row.CODIGO;
            var nTr = $(this).parents('tr')[0];            

            if (oTableRetenciones.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTableRetenciones.fnClose(nTr);

                console.log(id);
                console.log(nTr);
            }
            else {
                console.log('probando');
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTableRetenciones.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                oTableRetenciones.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');

                $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/NVMCOMR.ashx?OPCION=5&p_CODE=" + id,
                    beforeSend: function () { Bloquear($('#c' + id.split(",").join(""))); },
                    async: true,
                    success: function (datos) {
                        console.log(datos);
                        var str = "";
                        var resb = "";
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + id + "' class='display DTTT_selectable' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>NRO DOCUMENTO</th>";
                            resb += "<th>NRO COMPROBANTE</th>";
                            resb += "<th>MONTO</th>";                                                       
                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF" + id, datos);

                        }
                    },
                    complete: function () { Desbloquear($('#c' + id.split(",").join(""))); }
                });

            }

        });

        function fnFormatDetails(nTr, id) {
            //var aData = oTable.fnGetData(nTr);
            var sOut = '<div id="c' + id + '"></div>';
            return sOut;
        }
    }
   


    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            $("#inputRazsocial").html("");
            $("#inputRazsocial").html('<input id="txtRuc" class="span3" type="text" disabled="disabled" /> <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />');
            filltxtrazsocial('#txtrazsocial', '');
        });

        $("#buscar").on("click", function () {
            if (vErrors(["cboEmpresa"])) {
                if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                    Listar();
                } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                    Listar();
                } else {
                    alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
                }
            }
        });
    }

    var Listar = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_USUA_ID', $("#ctl00_txtus").val());
        data.append('p_PIDM', $("#hfPIDM").val());       
        data.append('p_DESDE', $("#txtDesde").val());
        data.append('p_HASTA', $("#txtHasta").val());
        //TO DO: PERIODO
        data.append('p_ANIO', $("#txtAnio").val());
        data.append('p_MES', $("#txtMes").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMCOMR.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               //Reporte
               console.log(datos);
               oTableRetenciones.fnClearTable()

               if (datos != null)
                   oTableRetenciones.fnAddData(datos);
               else
                   infoCustom2('No se encontraron registros.');

              // $('#divTblDatos').html(datos);                            

           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {

        } else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }

    return {
        init: function () {
            plugins();     
            
            eventoControles();
            cargatablavacia();
            fillCboEmpresa();
            cargaInicial();
            Listar();
            filltxtrazsocial('#txtrazsocial', '');
        }
    };
}();

function cargatablavaciaDetalleF(id, json) {

    oTableDeudasDetalle = $("#" + id).dataTable({
        data: json,
        columns: [ 
            {
                data: "DOID_NRO",
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
                data: "MONTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center');
                    var valor = cellData;
                    $(td).html(rowData.SIMBOLO_MONEDA + ' ' + formatoMiles(valor));
                }
            }


        ],
        "paging": false,
        scrollCollapse: true,
        //  sort: false,
        "sDom": "t"

    });


}

function filltxtEmisor(v_ID, v_value) {
    Bloquear("inputEmisor")
    var selectRazonSocial = $(v_ID);
    //PROVEEDORES SON AGENTES DE RETENCION
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/NVMCOMR.ashx?OPCION=4&p_AGENTE_RETEN_IND=S",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if ( !isEmpty(datos)) {

                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            obj += '{';
                            obj += '"NRO_DOCUMENTO":"' + datos[i].NRO_DOCUMENTO + '","TIPO_DOCUMENTO":"' + datos[i].TIPO_DOCUMENTO + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
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
                        Reset();
                        $("#hfPIDM").val("");
                        $("#hfPIDM").val(map[item].PIDM);
                        $("#txt_emisor").val(map[item].RAZON_SOCIAL);
                      
                        return item;
                    },

                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($("#txt_emisor").val().length <= 0) {
                        $("#hfPIDM").val("");
                        Reset();
                    }
                });
               
            } else {
                infoCustom2("No existen personas agentes de retencion!")
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
            Desbloquear("inputEmisor")
        },
        error: function (msg) {
            alertCustom("Error listar emisor");
            Desbloquear("inputEmisor")
        }
    });

}


function filltxtrazsocial(v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    //PERSONAS
    $.ajax({
        type: "post",
        url: "vistas/cp/ajax/CPLRGCA.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {

                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            obj += '{';
                            obj += '"NRO_DOCUMENTO":"' + datos[i].NRO_DOCUMENTO + '","TIPO_DOCUMENTO":"' + datos[i].TIPO_DOCUMENTO + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
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
                        $("#txtRuc").val(map[item].NRO_DOCUMENTO);
                        return item;
                    },

                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                    if ($("#txtrazsocial").val().length <= 0) {
                        $("#txtRuc").val("");
                        $("#hfPIDM").val("");
                    }
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


function Reset() {
    $(".limpiar").remove()
    $("#div_1 .txtCodDctoOrigen").val("")
    $("#div_1 .txtNroDctoOrigen").val("")
    $("#div_1 .txtSerieDctoOrigen").val("")
    $("#div_1 .txtMontoRetencion").val("")


    $("#txtMontoTotal").val("0.00");

}



function inputs_validar() {

    var inputs = [];
    if ($("#div_generador [id*=txtSerieDctoOrigen]").length > 0) {
        for (var i = 0 ; i < $("#div_generador [id*=txtSerieDctoOrigen]").length ; i++) {
            inputs.push($($("#div_generador [id*=txtSerieDctoOrigen]")[i]).attr("id"))
            inputs.push($($("#div_generador [id*=txtNroDctoOrigen]")[i]).attr("id"))
          
        }
    }

    if ($("#chk_ajuste").is(':checked')) {
        inputs.push("txt_ajuste")
    }


    //console.log(inputs);
    return inputs;
}


function obtener_Documentos() {

    var cad = "";
    if ($("#div_generador [id*=txtSerieDctoOrigen]").length > 0) {
        for (var i = 0 ; i < $("#div_generador [id*=txtSerieDctoOrigen]").length ; i++) {
            var id_dcto_code = $($("#div_generador [id*=txtCodDctoOrigen]")[i]).attr("id")
          
            
            cad += $("#" + id_dcto_code).val() + "|"
            
        }
    }
    cad += "}"
    cad = cad.replace("|}","") 
    //console.log(inputs);
    return cad;
}



function BloqueaCampos() {

    $("#btnBuscarDctoOrigen").remove();
    $("#btn_add").remove();
    $(".minus").remove()
    $(".form-actions").remove()
    $(".b").attr("disabled", true);
    //$("#grabar").html("<i class='icon-plus'></i> Nuevo");
    //$("#grabar").attr("href", "?f=nvmcomr");

}
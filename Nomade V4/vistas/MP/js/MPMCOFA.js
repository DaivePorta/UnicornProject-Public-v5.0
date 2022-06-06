var MPMCOFA = function () {
    var codigoOrden = '';
    var plugins = function () {

        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();

        $('.fecha').datepicker();

        $('.fecha').datepicker("setDate", "now");

        $('#txtcant').inputmask({ mask: '9', repeat: 9, greedy: false });

    }

    var llenaTablaGeneral = function () {


        var parms = {
            data: null,
            columns: [
                { data: "NRO_ORDEN" },
                { data: "PRODUCTO" },
                { data: "CANTIDAD_TOTAL" },
                { data: "CODE_LOTE" },
                { data: "FECHA_LOTE_INI" },
                { data: "FECHA_LOTE_FIN" },
                { data: "DESCRIPCION" },
                {
                    data: null,
                    //defaultContent: '<a  class="btn green cerrar"><i class="icon-off"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        
                        $(td).html("<a id=btn_" + rowData.NRO_ORDEN + " class='btn green cerrar'><i class='icon-off'></i></a>");
                        $(td).children('.cerrar').click(function () {

                            $("#modal-confirmar").modal("show");
                            codigoOrden = $(this).parent().parent().children().eq(0).text()
                        })

                    }

                   
                }
            ], "aLengthMenu": [
               [5, 15, 20, -1],
               [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "order": [],
            "paging": false
        }

        $('#tblBandeja').dataTable().fnDestroy();
         tableGeneral = $('#tblBandeja').dataTable(parms);
         $('#tblBandeja').removeAttr('style');


       
    }
    function listarTablaGeneral(cadigo, producto, fechaini, fechafin, tipo) {

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            //url: "vistas/mp/ajax/MPMCOFA.ashx?OPCION=1&P_CODE=" + cadigo,
            url: "vistas/mp/ajax/MPMCOFA.ashx?OPCION=1&P_CODE=" + cadigo + "&P_CODE_PROD=" + producto + "&P_FECHAINI=" + fechaini + "&P_FECHAFIN=" + fechafin + "&P_TIPO=" + tipo,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)
                    tableGeneral.fnClearTable()
                    tableGeneral.fnAddData(json)

                }
                else {

                    tableGeneral.fnClearTable()

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });

    }



    var cargainicial = function () {
        $('#chknumero').click();
        $("#chknumero").attr("checked", true).parent().addClass("checked")
    }



    var eventos = function () {
        $("#btnAceptar").on("click", function () {
            Cerrar();
            $("#modal-confirmar").modal("hide");

        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");
            codigo = '';
        });
        $('#btnBuscar').click(function () {
            var cadigo, producto, fechaini, fechafin, tipo;

            var F = new Date();
            if ($('#chknumero').is(':checked')) {
               
                cadigo = $('#txtcant').val();
                producto = "";
                fechaini = F.getDate() + "/" + (F.getMonth() + 1) + "/" + F.getFullYear();
                fechafin = F.getDate() + "/" + (F.getMonth() + 1) + "/" + F.getFullYear();
                tipo = 1;
              


            }

            if ($('#chkProducto').is(':checked')) {
               
                cadigo = "";
                producto = $('#hdproducto').val();
                fechaini = F.getDate() + "/" + (F.getMonth() + 1) + "/" + F.getFullYear();
                fechafin = F.getDate() + "/" + (F.getMonth() + 1) + "/" + F.getFullYear();
                tipo = 1;
               


            }


            if ($('#chkFecha').is(':checked')) {

                cadigo = "";
                producto = "";
                fechaini = $('#txtFechaIni').val();
                fechafin = $('#txtFechaFin').val();
                tipo = 2;

            }




            listarTablaGeneral(cadigo, producto, fechaini, fechafin, tipo);
            //$('#DetalleFlujoSolici').slideUp()
            //$('#dtfabricacion').slideUp();
            //$('#tblLote').slideUp();
            
        });
        $('#chknumero').click(function () {

            $('#filtro').html('<div class="control-group"> <div class="controls"><input id="txtcant" class="span10" type="text"  disabled /><a id="A1" onclick="buscarDocumento(this)" class=" span2 btn  blue pull-right "><i class="icon-search"></i></a></div></div>')
            plugins();
           

        });

        $('#chkProducto').click(function () {
            $('#filtro').html('<div class="control-group"><div class="controls"><div id="input_desc_prod"><input id="txtdescprod" class="span12" type="text" /> </div></div></div>');
            filltxtrazsocial('#txtdescprod', '', '', '02,');
            plugins();
       
        });

        $('#chkFecha').click(function () {

            $('#filtro').html('<div class="row-fluid">\
                              <div class="span6 fechaI" id="Div2">\
                                    <div class="control-group">\
                                        <div class="controls">\
                                            <div id="Div3">\
                                                <input id="txtFechaIni" class="span12 fecha" data-date-format="dd/mm/yyyy" type="text" />\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                 <div class="span6 fechaF" id="Div1">\
                                    <div class="control-group">\
                                        <div class="controls">\
                                            <div id="Div4">\
                                                <input id="txtFechaFin" class="span12 fecha" data-date-format="dd/mm/yyyy" type="text" />\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                </div>')
            plugins();
       
        });


    }

    function Cerrar() {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            //url: "vistas/mp/ajax/MPMCOFA.ashx?OPCION=1&P_CODE=" + cadigo,
            url: "vistas/mp/ajax/MPMCOFA.ashx?OPCION=2&P_CODE_ORDEN=" + codigoOrden + "&P_USUARIO=" + $('#ctl00_txtus').val(),
            success: function (datos) {
                Desbloquear("ventana");
                if (datos =='ok') {

                    exito();

                    var x = $("#tblBandeja").dataTable().fnGetData();
                    
                    x.filter(function (d, e) {
                        if (d.NRO_ORDEN == codigoOrden) {
                            tableGeneral.fnDeleteRow(e)
                            //x1.splice(e, 1)


                        }
                    });



                }
                else {

                    noexito();

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    return {
        init: function () {
            eventos();
            cargainicial();
            llenaTablaGeneral();
            llenaTabla();
        }
    };

}();

function buscarDocumento() {
   
    //llenaTabla();
    listar();
    $('#modal-req').modal('show');

}


function listar() {

    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/mp/ajax/MPMCOFA.ashx?OPCION=3&CTLG_CODE=" + '' + "&SCSL_CODE=" + '' + "&P_CODEFABR="+'',
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "" && datos != "[{}]") {

                var json = $.parseJSON(datos)
                oTable.fnClearTable()
                oTable.fnAddData(json)

            }
            else {

                oTable.fnClearTable()

            }
        },
        error: function (msg) {
            Desbloquear("div");
            alert(msg);

        }
    });
}
var llenaTabla= function () {
    var parms = {
        data: null,
        order: [[0, 'desc']],
        columns: [

            {
                data: "NRO_ORDEN",

                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                    //$(td).attr('style', 'display:none')
                }
            },
            {
                data: "PRODUCTO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

              {
                  data: "UNIDAD_MEDIDA",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center')
                  }
              },

            {
                data: "CANTIDAD_TOTAL",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },



             {
                 data: "RESPONSABLE",
                 createdCell: function (td, cellData, rowData, row, col) {
                     $(td).attr('align', 'center')
                 }
             },

            {
                data: "DESCRIPCION",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            }


        ]

    }

    $('#tblLISTA').dataTable().fnDestroy();

    oTable = iniciaTabla('tblLISTA', parms);


    $('#tblLISTA tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            var tp = row.NRO_ORDEN;
            $('#txtcant').val(tp);
            $('#modal-req').modal('hide');


        }
    });





}


function filltxtrazsocial(v_ID, v_value, SERVICIO, TEXTI) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        //url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresas").val() + "&TEXTI=" + TEXTI + "&SERVICIO=" + SERVICIO,
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + '' + "&TEXTI=" + TEXTI + "&SERVICIO=" + SERVICIO,
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
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","STOCK":"' + datos[i].STOCK + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';
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
                        //$("#hdcodProd2").val(map[item].CODIGO);
                        $("#txtUnidad").val(map[item].DESC_UNIDAD_DESPACHO);
                        $("#hdproducto").val(map[item].CODIGO);
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
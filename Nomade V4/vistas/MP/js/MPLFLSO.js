var seleccionadosLote = []
var hiden = 0;
var MPLFLSO = function () {

    var flagTb = false;

    var plugins = function () {

        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();

        $('.fecha').datepicker();

        $('.fecha').datepicker("setDate", "now");

        $('#txtcant').inputmask({ mask: '9', repeat: 9, greedy: false });
        
    }


    function listar(cadigo, producto, fechaini, fechafin, tipo) {

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=1&P_CODE=" + cadigo + "&P_CODE_PROD=" + producto + "&P_FECHAINI=" + fechaini + "&P_FECHAFIN=" + fechafin + "&P_TIPO=" + tipo,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)
                    oTableSolictud.fnClearTable()
                    oTableSolictud.fnAddData(json)

                }
                else {

                    oTableSolictud.fnClearTable()

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }




    var ic = 0;
    var funcionalidadTabla = function () {



        $('#detalleLotes tbody').on('click', '.detDoc', function () {

            var pos = oTabledetallelotes.api(true).row($(this).parents("tr")[0]).index();
            var row = oTabledetallelotes.fnGetData(pos);

            var id = row.CODIGO;
            var nTr = $(this).parents('tr')[0];

            if (oTabledetallelotes.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTabledetallelotes.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTabledetallelotes.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                oTabledetallelotes.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
                Bloquear("ventana");
                $.ajax({
                    type: "POST",
                    //url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=1&CODIGO=" + id + "&P_ESTADO=" + '2',
                    url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=4&p_CODIGO=" + id + "&P_FASE=" + '0' + "&P_ESTADO=" + 'A',
                    async: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        var str = "";
                        var resb = "";
                        ic = ic + 1
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + ic + "' class='display DTTT_selectable tblBandejaDetalleFd' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>CODIGO</th>";
                            resb += "<th>COD. SOLICITUD</th>";
                            resb += "<th>ITEM</th>";
                            resb += "<th>CANTIDAD</th>";
                            resb += "<th>ESTADO</th>";

                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF" + ic, $.parseJSON(datos));
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





    function llenaTabla() {
        var parms = {
            data: null,
            order: [[0, 'desc']],
            columns: [

                {
                    data: "CODE",

                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        //$(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "CODE_SOLIC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                  {
                      data: "ITEM",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  },

                {
                    data: "DESCP",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },



                 {
                     data: "UNIDAM",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                {
                    data: "CANTIDAD_APROBADA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                        hiden = hiden + 1;
                        var idex = hiden - 1;
                        //var index = id.split('tblBandejaDetalleF').join("")
                        //var hiden = hiden - 1

                        $(td).html("<input type='radio' id=rd_" + rowData.CODE_SOLIC + rowData.ITEM + " class='chek'  name='ver'/> <input type='hidden' value=" + idex + " id=hd" + idex + " />");

                        $(td).children(".chek").click(function () {

                            var cod = $("#rd_" + rowData.CODE_SOLIC + rowData.ITEM + "").parent().parent().children().eq(0).text()
                            if ($("#rd_" + rowData.CODE_SOLIC + rowData.ITEM + "").is(":checked")) {

                                $('#DetalleFlujoSolici').slideDown();
                                listarDetalleFlujo(cod);
                                $('#dtfabricacion').slideUp();

                            }
                            else {


                                $('#DetalleFlujoSolici').slideUp();
                                oTableSolictudDetalle.fnClearTable()

                            }



                        });
                    }
                }

            ]

        }

        $('#tablaSolicitud').dataTable().fnDestroy();

        oTableSolictud = iniciaTabla('tablaSolicitud', parms);








    }


    function llenaTablaDetalle() {
        var parms = {
            //sPaginationType: "full_numbers",
            //sDom: 'T<"clear">lfrtip',
            paging: false,
            filter:false,
            data: null,
            info: false,

            order: [[0, 'desc']],
            columns: [

                {
                    data: "CODE_ORFL",

                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        //$(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "CODE_SOLIC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                  {
                      data: "CANTIDAD",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  },

                {
                    data: "FASE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },



                 {
                     data: "FECHAINI",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                {
                    data: "FECHAFIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                        hiden = hiden + 1;
                        var idex = hiden - 1;
                        //var index = id.split('tblBandejaDetalleF').join("")
                        //var hiden = hiden - 1

                        $(td).html("<input type='radio' id=rd_" + rowData.CODE_ORFL + rowData.CODE_SOLIC + " class='chek'  name='ver1'/> <input type='hidden' value=" + idex + " id=hd" + idex + " />");

                        $(td).children(".chek").click(function () {

                            var cod = $("#rd_" + rowData.CODE_ORFL + rowData.CODE_SOLIC + "").parent().parent().children().eq(0).text()
                            if ($("#rd_" + rowData.CODE_ORFL + rowData.CODE_SOLIC + "").is(":checked")) {

                                $('#dtfabricacion').slideDown();
                                
                                listarDetalleFabricacion(cod);
                                listarDetaLote(cod);
                            }
                            else {


                                $('#dtfabricacion').slideUp();

                            }



                        });
                    }
                }

            ]

        }

        $('#tblDetalleFlujoSolici').dataTable().fnDestroy();

        oTableSolictudDetalle = iniciaTabla('tblDetalleFlujoSolici', parms);








    }
    function listarDetalleFlujo(cadigo) {

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=2&P_CODE_DETALLE=" + cadigo,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)
                    oTableSolictudDetalle.fnClearTable()
                    oTableSolictudDetalle.fnAddData(json)

                }
                else {

                    oTableSolictudDetalle.fnClearTable()

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }


    function llenaTablaDetalleFabricacion() {
        var parms = {
            paging: false,
            filter: false,
            data: null,
            info: false,
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
                    data: "RESPONSABLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                  {
                      data: "TIPO_FABRICACION",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  }
                  ,

                  {
                      data: "DESCRIPCION",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  }
              

            ]

        }

        $('#tblDetallefabricacion').dataTable().fnDestroy();

        oTableFabricaDetalle = iniciaTabla('tblDetallefabricacion', parms);








    }
    function listarDetalleFabricacion(codigo) {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=4&P_CODEFABR=" + '' + '&P_CODE_DETALLE_FLUJO=' + codigo,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)
                    oTableFabricaDetalle.fnClearTable()
                    oTableFabricaDetalle.fnAddData(json)

                }
                else {

                    oTableFabricaDetalle.fnClearTable()

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    function llenaTablaLote() {
        var parms = {
            paging: false,
            filter: false,
            data: null,
            info: false,
            data: null,
            order: [[0, 'desc']],
            columns: [

                {
                    data: "CODE",

                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        //$(td).attr('style', 'display:none')
                    }
                },
                {
                    data: "CODE_FABRI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                  {
                      data: "SECCION",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  }
                  ,

                  {
                      data: "FECHA_INI",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  }
                  ,

                  {
                      data: "FECHA_FIN",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  }


            ]

        }

        $('#tblLote').dataTable().fnDestroy();

        oTableLote = iniciaTabla('tblLote', parms);








    }
    function listarDetaLote(codigo) {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=5&P_CODEFABR=" + '' + '&P_CODE_DETALLE_FLUJO=' + codigo,
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)
                    oTableLote.fnClearTable()
                    oTableLote.fnAddData(json)

                }
                else {

                    oTableLote.fnClearTable()

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    var eventoControles = function () {



        $('#cboEmpresas').on('change', function () {
            $("#txtdescprod").remove();
            $("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase'/>");
            filltxtrazsocial('#txtdescprod', '', '', '02,');

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




            listar(cadigo, producto, fechaini, fechafin, tipo);
            $('#DetalleFlujoSolici').slideUp()
            $('#dtfabricacion').slideUp();
            //$('#tblLote').slideUp();
            
        });
        $('#cboEstablecimiento').on('change', function () {
            $("#txtdescprod").remove();
            $("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase'/>");
            filltxtrazsocial('#txtdescprod', '', '', '02,');
        });

        $('#chknumero').click(function () {

            $('#filtro').html('<div class="control-group"> <div class="controls"><input id="txtcant" class="span8" type="text"  disabled /><a id="A1" onclick="buscarDocumento(this)" class=" span4 btn  blue pull-right "><i class="icon-search"></i></a></div></div>')
            plugins();
            //$('.cantidad').css('display', 'block')
            //$('#txtdescprod').css('display', 'none')
            //$('#txtFechaIni').css('display', 'none')
            //$('#txtFechaFin').css('display', 'none')
         

            //$('#txtcant').attr('disabled', false)
            //$('#txtdescprod').attr('disabled', true)
            //$('#txtFechaIni').attr('disabled', true)
            //$('#txtFechaFin').attr('disabled', true)

        });

        $('#chkProducto').click(function () {
            $('#filtro').html('<div class="control-group"><div class="controls"><div id="input_desc_prod"><input id="txtdescprod" class="span12" type="text" /> </div></div></div>');
            //$("#txtdescprod").remove();
            //$("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase'/>");
            filltxtrazsocial('#txtdescprod', '', '', '02,');
            plugins();
            //$('.cantidad').css('display', 'none')
            //$('#txtdescprod').css('display', 'block')
            //$('#txtFechaIni').css('display', 'none')
            //$('#txtFechaFin').css('display', 'none')

            //$('#txtcant').attr('disabled', true)
            //$('#txtdescprod').attr('disabled', false)
            //$('#txtFechaIni').attr('disabled', true)
            //$('#txtFechaFin').attr('disabled', true)
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
            //$('.cantidad').css('display', 'none')
            //$('#txtdescprod').css('display', 'none')
            //$('#txtFechaIni').css('display', 'block')
            //$('#txtFechaFin').css('display', 'block')

            //$('#txtcant').attr('disabled', true)
            //$('#txtdescprod').attr('disabled', true)
            //$('#txtFechaIni').attr('disabled', false)
            //$('#txtFechaFin').attr('disabled', false)
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


    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    //Iniciar valores con valores de login
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                    fillCboEstablecimiento();

                    //listar();


                }



            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargaInicial = function () {
        $('#cboEmpresas').select2().change();
        $('#chknumero').click();
        $("#chknumero").attr("checked", true).parent().addClass("checked")
        $('#DetalleFlujoSolici').css('display', 'none');
        $('#dtfabricacion').css('display', 'none');
 

        
    }


    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            //url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
            url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=2&CTLG_CODE=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].ALMACEN + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
                }
                //selectEst.val($('#ctl00_hddestablecimiento').val());
                //selectEst.change();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        $('#cboEstablecimiento').select2('destroy').select2();
    };




    return {
        init: function () {


            plugins();
            //fillCboEmpresa();
            eventoControles();
            cargaInicial();
            llenaTabla();
            //filltxtrazsocial('#txtdescprod', '', '', '02,');
            llenaTablaDetalle();
            llenaTablaDetalleFabricacion();
            llenaTablaLote();
            llenaTablaSoliciCabecera();


        }
    };

}();




var fillCboEmpresa = function () {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboEmpresas').empty();
            $('#cboEmpresas').append('<option></option>');
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }

                //Iniciar valores con valores de login
                $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                fillCboEstablecimiento();




            }



        },
        error: function (msg) {
            alert(msg);
        }
    });
}


var fillCboEstablecimiento = function () {
    var selectEst = $('#cboEstablecimiento');
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEst.empty();

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
            }

        },
        error: function (msg) {
            alert(msg.d);
        }
    });
    $('#cboEstablecimiento').select2('destroy').select2();
};

var limpiar = function () {
    $('#txtcodprod').val("");
    $('#txtdescprod').val("");
    $('#txtUnidad').val("");
    $('#txtcant').val("");

}

function buscarDocumento()
{
    $('#modal-req').modal('show');
    //llenaTablaSoliciCabecera();
    listarSolicitudCabecera();
    
}


function listarSolicitudCabecera() {

    Bloquear("ventana");
    $.ajax({
        type: "POST",
        //url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=1&P_CODE=" + cadigo + "&P_CODE_PROD=" + producto + "&P_FECHAINI=" + fechaini + "&P_FECHAFIN=" + fechafin + "&P_TIPO=" + tipo,
        url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=9",
        async: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "" && datos != "[+]") {

                var json = $.parseJSON(datos)
                oTableSolictudCabecera.fnClearTable()
                oTableSolictudCabecera.fnAddData(json)

            }
            else {

                oTableSolictudCabecera.fnClearTable()

            }
        },
        error: function (msg) {
            Desbloquear("div");
            alert(msg);

        }
    });
}


function llenaTablaSoliciCabecera() {
    var parms = {
        data: null,
        order: [[0, 'desc']],
        columns: [

            {
                data: "CODIGO",

                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                    //$(td).attr('style', 'display:none')
                }
            },
            {
                data: "CATALOGO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },

              {
                  data: "ESTABLECIMIENTO",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center')
                  }
              }
              ,

              {
                  data: "TIPOREQUE",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center')
                  }
              }
              ,

              {
                  data: "IND_CLIENTE",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center')
                  }
              }
                ,

              {
                  data: "CLIENTE",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center')
                  }
              }

        ]

    }

    $('#tblsolicitud').dataTable().fnDestroy();

    oTableSolictudCabecera = iniciaTabla('tblsolicitud', parms);

    $('#tblsolicitud tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTableSolictudCabecera.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTableSolictudCabecera.fnGetPosition(this);
            var row = oTableSolictudCabecera.fnGetData(pos);
            var tp = row.CODIGO;
            $('#txtcant').val(tp);
            $('#modal-req').modal('hide');

           
        }
    });






}
////function plugins2()
////{
//    $('.fecha').datepicker();

//    $('.fecha').datepicker("setDate", "now");

//    $('#txtcant').inputmask({ mask: '9', repeat: 9, greedy: false });
////}
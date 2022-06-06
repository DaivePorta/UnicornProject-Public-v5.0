var NOLREQC = function () {
    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();
       

    }


    var eventoControles = function () {


        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {

                Bloquear("div_filtro");
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 1000);

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        $('#btn_listar').on('click', function () {
            
            ListaReqCompractlgxscsl();

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
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
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
                // $('#slcSucural').append('<option value="T">TODOS</option>');
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


                }
                else {
                    alertCustom("Error listar sucursales")
                }

                Desbloquear("div_filtro");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("div_filtro");
            }
        });
    }


    var fillBandejaReqCompra = function () {


        var parms = {
            data: null,
            "order": [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).css('text-transform', 'uppercase')
                    }
                },    
                      {
                          data: "FECHA_TRAN",
                          createdCell: function (td, cellData, rowData, row, col) {
                              $(td).attr('align', 'center')
                          }
                      }

            ]

        }

        oTableTReq = iniciaTabla('tblreqs_compra', parms);
        $('#tblreqs_compra').removeAttr('style');
        $('#tblreqs_compra tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTReq.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableTReq.fnGetPosition(this);
                var row = oTableTReq.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=NOMRQCP&codigo=' + CODIGO;
            }
        });


    }


    var ListaReqCompractlgxscsl = function () {

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomreqc.ashx?OPCION=13&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val(),
            //contenttype: "application/json;",
            //datatype: "json",
            async: true,
            success: function (datos) {
                if (!isEmpty(datos)) {
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val(datos);
                    var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
                    oTableTReq.fnClearTable();
                    oTableTReq.fnAddData(json);


                }
                else {
                    $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val("");
                    oTableTReq.fnClearTable();
                }


            },
            error: function (msg) {
                // alert(msg);
                noexito();
            }

        });

    }
    return {
        init: function () {
            plugins();
            fillBandejaReqCompra();
            fillCboEmpresa();
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
            ListaReqCompractlgxscsl();
        }
    };

}();

let oTable_Det_Despachos = [];
let oTable_Det_Pedidos = [];
var NOMREQC = function () {

    let stockMaxProdSelec = 0;
    let stockActualProdSelec = 0;

    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();       
    }

    var eventoControles = function () {
    


        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
             
                Bloquear("div_filtro");
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 1000);

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        $('#btn_listar').on('click', function () {
            //Bloquear("ventana")
            //setTimeout(function () {
            ListaReqUsuXctlgxscsl();
            ListaReqA_Despachar();
            ListaReqA_Pedir();
            //}, 1000);


        });


        $('#btn_actualizar').on('click', function () {
            ListaReqUsuXctlgxscsl();

        });

        $('#btn_continuar').on('click', function () {

            if (vErrors("txt_nom_req")) {

                $("#modal_reg").modal("hide")
                if (oTable_Det_Despachos.fnGetData().length > 0) {
                    $("#msg_cargando").html("Creando Requerimiento y despachos  . . .")
                }
                else {
                    $("#msg_cargando").html("Creando Requerimiento   . . .")
                }



                var barra = $("#barra_progreso")
                barra.css("width", 0 + "%")
                $("#modal_progress").modal("show")

                var cont = 5;
                var intervalo = setInterval(function () {

                    barra.css("width", cont + "%")
                    if (cont == 100) { cont = 0; } else { cont = cont + 5; }

                }, 1500)

                setTimeout(function () {

                    $.ajax({
                        type: "post",
                        url: "vistas/no/ajax/nomreqc.ashx?OPCION=10&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val() + "&NOMBRE_REQ=" + $("#txt_nom_req").val() + "&USUA_ID=" + $("#ctl00_txtus").val(),
                        async: true,
                        success: function (datos) {
                            if (!isEmpty(datos)) {


                                clearInterval(intervalo)
                                var barra = $("#barra_progreso")
                                barra.css("width", 100 + "%")
                                $("#modal_progress").modal("hide");
                                $("#txt_nom_req").val("");

                                console.log(datos);

                                //PEDIDO
                                if (datos[0].RESPEDIDO == "OK") {
                                    exitoCustom("El pedido se atendió correctamente.");
                                }
                                else if (datos[0].RESPEDIDO == "CANTIDAD") {
                                    infoCustom("Uno de los pedidos no se atendió.Para atenderlo la cantidad total del req. debe ser igual o superior a la cantidad requerida.")
                                }
                                else if (datos[0].RESPEDIDO == "-") {
                                    console.log("Sin Pedido")
                                }
                                else{
                                    console.log("Error" + datos[0].RESPEDIDO )
                                }


                                //DESPACHO
                                if (datos[0].RESDESPACHO == "OK") {
                                    exitoCustom("El despacho se atendió correctamente.");
                                }
                                else if (datos[0].RESDESPACHO == "CANTIDAD") {
                                    infoCustom("Uno de los despachos no se atendió.Para atenderlo la cantidad total del req. debe ser igual o superior a la cantidad requerida.")
                                }
                                else if (datos[0].RESDESPACHO == "-") {
                                    console.log("Sin Despacho")
                                }
                                else {
                                    console.log("Error" + datos[0].RESDESPACHO)
                                }
                               
                     
                                ListaReqUsuXctlgxscsl();
                                ListaReqA_Despachar();
                                ListaReqA_Pedir();


                            }



                        },
                        error: function (msg) {
                            alertCustom("Error al atender pedid o despacho");
                            Desbloquear("ventana");
                        }

                    });

                }, 1500);
            } 
           

        });
       
        $('#tbl_detalle_req tbody').on('click', '.aceptar', function () {

            $($(this).parents("tr")).addClass('selected');
           

            var pos = oTable_Detalle_Req.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_Detalle_Req.fnGetData(pos);

            fnGetStockProducto(row.PRODUCTO_CODE);
            let prod_cod = row.PRODUCTO_CODE;
            let prod_desc = row.PRODUCTO;
            let cod_req = row.CODIGO_REQ
            let item = row.ITEM
            let nTr = $(this).parents('tr')[0];
            let cant_des_ant = row.CANTIDAD_DESPACHADA;
            let cant_ped_ant = row.CANTIDAD_PEDIDA;
            let cant_requerida = row.CANTIDAD;

            let cant_des = 0.0;
            let cant_ped = 0.0;

            if($(nTr).find(".cantidad_des").val() !== "")
            { 
                cant_des = $(nTr).find(".cantidad_des").val();
            }
   
            if($(nTr).find(".cantidad_ped").val() !== "")
            { 
                cant_ped = $(nTr).find(".cantidad_ped").val();
            }


         
            //Valida Stock Máximo con Stock Pedido
            let totalPedido = fnGetTotalPedido(prod_cod);
            // console.log(stockActualProdSelec);
            if ((parseFloat(totalPedido) + parseFloat(cant_ped) + stockActualProdSelec > parseFloat(stockMaxProdSelec)) && parseFloat(stockMaxProdSelec) !== 0 ) {
                infoCustom("El Stock actual más el pedido que estas haciendo supera el Stock Máximo (" + stockMaxProdSelec.toString() + ") permitido comunicarse con el Jefe de Logística");
                return;
            }

            //Valida que stock despachado sea menor igual a la cantidad requerida
            if ((parseFloat(cant_des) + parseFloat(cant_des_ant)) > parseFloat(cant_requerida)) {
                infoCustom("El despacho NO  puede ser mayor a lo requerido.");
                return;
            }


            let sum_cantidades = 0.0;
            let ind = 0;
            sum_cantidades = parseFloat(cant_ped_ant) + parseFloat(cant_ped) + parseFloat(cant_des_ant) + parseFloat(cant_des);
            if (sum_cantidades >= cant_requerida) {  ind = "1"; }
            else { ind = "0"; }


            // json_despacho = [{ "CODIGO": prod_cod, "PRODUCTO": prod_desc, "CANTIDAD": parseInt(cant_des) }]
                          

           Bloquear("modal_info")
        
             $.post("vistas/NO/ajax/NOMREQC.ASHX", {
                OPCION: "AT",
                CODE_REQ: cod_req,
                ITEM: item,
                CTLG_CODE: $('#slcEmpresa').val(),
                SCSL_CODE: $('#slcSucural').val(),
                CODE_PRODUCTO: prod_cod,
                CANTIDAD_DES: cant_des,
                CANTIDAD_DES_ANT: cant_des_ant,
                CANTIDAD_PED: cant_ped,
                IND_REQ: ind
            },
            function (res) {
           
         
                  if (!isEmpty(res)) {
                      var array = res.split(',');

                      if (array[0] === "-1") {
                          refrescaTabla(oTable_Detalle_Req);
                          $("#msg_error").html("Cantidad despachada no puede ser mayor al stock!")
                          $("#msg").css("display", "block");
                          Desbloquear("modal_info")
                         
                          return 
                      }
                          
                          $("#msg_error").html("")
                          $("#msg").css("display", "none");
                          $("#lbl_stock").html(parseInt(array[0]))
                          oTable_Detalle_Req.fnGetData(pos).CANTIDAD_DESPACHADA = parseFloat(cant_des_ant) + parseFloat(cant_des);
                          oTable_Detalle_Req.fnGetData(pos).CANTIDAD_PEDIDA = parseFloat(cant_ped_ant) + parseFloat(cant_ped); 
                          refrescaTabla(oTable_Detalle_Req);
                          ListaReqA_Despachar();
                          ListaReqA_Pedir();
                          ListaReqUsuXctlgxscsl();
                          exito()
                          Desbloquear("modal_info")

              } else {
                      noexito();
                      Desbloquear("modal_info")
              }

          });

    
        });

        $('#tbl_detalle_req tbody').on('change', ".cantidad_des", function () {
            var _tr = $(this).parent().parent();
            $(_tr).addClass('selected_2');
        });

        $('#tbl_detalle_req tbody').on('change', ".cantidad_ped", function () {
            var _tr = $(this).parent().parent();
            $(_tr).addClass('selected_2');
        });

        $('#tbl_detalle_req tbody').on('click', ".cantidad_des", function () {
            var _tr = $(this).parent().parent();
            $(_tr).addClass('selected_2');
        });

        $('#tbl_detalle_req tbody').on('click', ".cantidad_ped", function () {
            var _tr = $(this).parent().parent();
            $(_tr).addClass('selected_2');
        });

        $('#tbl_detalle_req tbody').on('focus', ".cantidad_des", function () {

            var _tr = $(this).parent().parent();
            $(_tr).parent().find("tr").removeClass("fila").removeClass("foco").addClass("fila")
            $(_tr).removeClass("fila").addClass("foco").addClass('selected_2');
            $(_tr).parent().find("tr:not(.foco)").find("input").val("")
            $(_tr).parent().find("tr:not(.foco)").find("a").css({ "display": "none", "width": "30%", "text-align": "center" })
            $(_tr).children().last().children().css({ "display": "block", "width": "30%", "text-align": "center" })
           
        });

        $('#tbl_detalle_req tbody').on('focus', ".cantidad_ped", function () {

            var _tr = $(this).parent().parent();
            $(_tr).parent().find("tr").removeClass("fila").removeClass("foco").addClass("fila")
            $(_tr).removeClass("fila").addClass("foco").addClass('selected_2');
            $(_tr).parent().find("tr:not(.foco)").find("input").val("")
            $(_tr).parent().find("tr:not(.foco)").find("a").css({ "display": "none", "width": "30%", "text-align": "center" })
            $(_tr).children().last().children().css({ "display": "block", "width": "30%", "text-align": "center" })

        });


        $('#tbl_pedidos tbody').on('click', '.deletePedido', function () {
            $($(this).parents("tr")).addClass('selected');
            var pos = oTable_Det_Pedidos.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_Det_Pedidos.fnGetData(pos);
            EliminarPedidoDespacho('P', row.CODIGO, row.CANTIDAD_PEDIDA);
        });

        $('#tbl_despachos tbody').on('click', '.deleteDespacho', function () {
            $($(this).parents("tr")).addClass('selected');
            var pos = oTable_Det_Despachos.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_Det_Despachos.fnGetData(pos);            
            EliminarPedidoDespacho('D', row.CODIGO, row.CANTIDAD_DESPACHADA);
        });


        
    }


    let fnGetTotalPedido = function (pCodProd) {
        let sumPedido = 0.0;
        if (oTable_Det_Pedidos.length > 0) {
            $.each(oTable_Det_Pedidos.fnGetData(), function (key, value) {
                if (pCodProd == value.CODIGO) {
                    sumPedido = sumPedido + parseFloat(value.CANTIDAD_PEDIDA);
                }
            });
        }
        return sumPedido;
    }


     let fnGetStockProducto = function (pCodProducto) {
        let codEmpresa = $("#slcEmpresa").val();
        let codEstablec = $("#slcSucural").val();

        $.ajax({
            type: "post",
            url: "vistas/NO/ajax/NOMREQC.ASHX?OPCION=LPXS&CODE_PRODUCTO=" + pCodProducto +
            "&CTLG_CODE=" + codEmpresa + "&SCSL_CODE=" + codEstablec,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (!isEmpty(datos)) {
                    stockMaxProdSelec = datos[0].CANT_REORDEN_MIN;
                    stockActualProdSelec = datos[0].STOCK;
                }
                else {
                    noexitoCustom("Error al obtener stock de producto");
                    stockMaxProdSelec = 0;            
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener stock de producto");
                stockMaxProdSelec = 0;
   
            }
        });

    } 

    let EliminarPedidoDespacho = function (p_accion , p_codProducto, p_cantidad) {

        Bloquear("ventana")

        $.post("vistas/NO/ajax/NOMREQC.ASHX", {
            OPCION: "EREQ",
            ACCION: p_accion,
            CTLG_CODE: $('#slcEmpresa').val(),
            SCSL_CODE: $('#slcSucural').val(),
            CODE_PRODUCTO: p_codProducto,
            CANTIDAD: p_cantidad
        },
            function (res) {
                if (!isEmpty(res)) {

                    if (res == 'OK') {
                        ListaReqA_Despachar();
                        ListaReqA_Pedir();
                        ListaReqUsuXctlgxscsl();
                        exito();
                    }
                    else {
                        noexitoCustom("Error al eliminar detalle");
                    }                  
                    Desbloquear("ventana");
                } else {
                    noexito();
                    Desbloquear("ventana");
                }

            });
 

    }

    var fillBandejaReq_Detalle = function () {
        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            responsive : true,
            columns: [

                    {
                        data: "CODIGO_REQ",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                        }
                    },
                      {
                          data: "GLOSA",
                          createdCell: function (td, cellData, rowData, row, col) {
                              $(td).css('text-align', 'left')
                              $(td).css('text-transform', 'uppercase')
                            
                          }
                      },
                   
                    {
                        data: "CANTIDAD",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                        }
                    },
                 
             
                   {
                       data: null,     
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).html("<input type='number' min='0' style='text-align:center;width:40%' id=txt_" + rowData.CODIGO + "  tabindex=" + rowData.CODIGO + " class='cantidad_ped'      />");
                           $(td).css('text-align', 'center')

                       }
                   },
                    {
                        data: null,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).html("<input type='number' min='0' style='text-align:center;width:40%' id=txt_" + rowData.CODIGO + "  tabindex=" + rowData.CODIGO + " class='cantidad_des'      />");
                            $(td).css('text-align', 'center')

                        }
                    },
                      {
                          data: null,
                          createdCell: function (td, cellData, rowData, row, col) {
                           
                              $(td).css('text-align', 'center');
                             
                              $(td).html('<a class="btn green aceptar"  ><i class="icon-check"></i></a>')
                              $(td).children().css('display', 'none');
                          }
                      }

            ]

        }

        $(".display.DTTT_selectable.dataTable.no-footer").removeAttr("style");
       


        oTable_Detalle_Req = $("#tbl_detalle_req").dataTable(parms)
      


        $('#tbl_detalle_req tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected') || $(this).hasClass('selected_2')) {
                $(this).removeClass('selected');
                $(this).removeClass('selected_2');
                $("#td_cant_pedida").html("-")
                $("#td_cant_despachada").html("-")
                $("#td_cc_costo").html("-") //1
                $("#td_prioridad").html("-")
            } else {
                $(this).parent().find("tr").attr("class", "")
                $(this).addClass('selected');
                var pos = oTable_Detalle_Req.fnGetPosition(this);
                var row = oTable_Detalle_Req.fnGetData(pos);
   
                $("#td_cc_costo").html( "<b>"+ row.CC_COSTO + "</b>")//2
                $("#td_prioridad").html("<b>" + row.PRIORIDAD + "</b>")
                $("#td_cant_pedida").html(row.CANTIDAD_PEDIDA)
                $("#td_cant_despachada").html(row.CANTIDAD_DESPACHADA)
            }
        });
          

    }


    var fillBandejaReq_Despachos = function () {
        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            columns: [

                    {
                        data: "CODIGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                        }
                    },
                    {
                        data: "PRODUCTO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'left')
                        }
                    },


                    {
                        data: "CANTIDAD_DESPACHADA",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                        }
                    },

                    {
                        data: null,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center');
                            $(td).html('<a class="btn red deleteDespacho"  ><i class="icon-trash"></i></a>')
                        }
                    }


            ]

        }

        $(".display.DTTT_selectable.dataTable.no-footer").removeAttr("style");



        oTable_Det_Despachos = $("#tbl_despachos").dataTable(parms)






    }

    var fillBandejaReq_Pedidos = function () {
        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            columns: [

                    {
                        data: "CODIGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                        }
                    },
                    {
                        data: "PRODUCTO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'left')
                        }
                    },


                    {
                        data: "CANTIDAD_PEDIDA",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                        }
                    },
                    {
                        data: null,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center');
                            $(td).html('<a class="btn red deletePedido"  ><i class="icon-trash"></i></a>')
                        }
                    }

            ]

        }

        $(".display.DTTT_selectable.dataTable.no-footer").removeAttr("style");

        oTable_Det_Pedidos = $("#tbl_pedidos").dataTable(parms)




    }

    var fillBandejaReqAprobados = function () {




        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            "order" : [[0,"asc"]],
            columns: [
                  {
                    data: "FECHA",
                      createdCell: function (td, cellData, rowData, row, col) {                         
                    },
                    visible:false
                  },
                    {
                        data: "CODIGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                            if ( (parseInt(rowData.CANTIDAD_DESPACHADA) +  parseInt(rowData.CANTIDAD_PEDIDA))   >= rowData.CANTIDAD  ) {
                                $(td).css('background-color', 'darkseagreen')
                            }
                        }
                    },
                    {
                        data: "PRODUCTO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                    {
                        data: "DESC_UNME",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                   {
                       data: "CANTIDAD",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   },
                  {
                      data: "STOCK",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).css('text-align', 'center')
                      }
                  },
     
                {
                    data: "COD_UNME",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    },
                    visible:false
                    
                },
                 {
                     data: "INDICA_COMPLETADOS",
                     createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('style', 'display:none')
                    
                     },
                     visible: false
                 },

                   {
                       data: null,
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center');
                         
                           $(td).html('<a class="btn blue"  onclick="verDetalleReq( ' + "'" + rowData.CODIGO + "'," + "'" + rowData.PRODUCTO.replace("'","").replace('"',"") + "'," + "'" + rowData.STOCK + "'" + ')"  ><i class="icon-search"></i></a>')

                       }
                   }


            ]

        }

        $(".display.DTTT_selectable.dataTable.no-footer").removeAttr("style");



        oTableReqApro = iniciaTabla('tbl_req_aprobados', parms);
       
    }


  

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    return {
        init: function () {
            plugins();
            fillBandejaReqAprobados();
            fillBandejaReq_Detalle();
            fillBandejaReq_Despachos();
            fillBandejaReq_Pedidos();
            fillCboEmpresa();
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
            ListaReqUsuXctlgxscsl();
            ListaReqA_Despachar();
            ListaReqA_Pedir();
         //   cargaInicial();

        }
    };

}();


function verDetalleReq(codigo_req,producto,stock) {
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/nomreqc.ashx?OPCION=L&CODE_PRODUCTO=" + codigo_req + "&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
        async: true,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            oTable_Detalle_Req.fnClearTable();
            $("#msg_error").html("")
            $("#msg").css("display", "none");
            if (!isEmpty(datos)) {
               
                oTable_Detalle_Req.fnAddData(datos);
                $("#tbl_detalle_req tbody").find("tr").addClass("fila")
                $("#lbl_producto").html(producto)
                $("#lbl_stock").html(stock)
                $("#td_cant_pedida").html("-")
                $("#td_cant_despachada").html("-")
                $("#td_cc_costo").html("-") //3
                $("#td_prioridad").html("-")
                $("#modal_info").modal('show');
               

            } else {


                alertCustom("No existen datos que mostrar!")
            }

        },
        error: function (msg) {
            // alert(msg);
            alertCustom("Error al listar detalle del requerimiento!")
        }
    });


 
}
var ListaReqA_Despachar = function () {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomreqc.ashx?OPCION=99&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
        async: true,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            oTable_Det_Despachos.fnClearTable();
            if (!isEmpty(datos)) {



                oTable_Det_Despachos.fnAddData(datos);

            }
            else {


               // alertCustom("Error al listar detalle del requerimiento a despachar!")
            }


            Desbloquear("ventana")

        },
        error: function (msg) {
            alertCustom("Error al listar detalle del requerimiento a despachar!")
            Desbloquear("ventana")
        }

    });

}

var ListaReqA_Pedir = function () {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomreqc.ashx?OPCION=100&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
        async: true,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            oTable_Det_Pedidos.fnClearTable();
            if (!isEmpty(datos)) {
                oTable_Det_Pedidos.fnAddData(datos);
            }
            else {

            }
            Desbloquear("ventana")

        },
        error: function (msg) {
            alertCustom("Error al listar detalle del requerimiento a PEDIR!")
            Desbloquear("ventana")
        }

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
           // $('#slcSucural').append('<option value="T">TODOS</option>');
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


            }
            else {
                alertCustom("Error listar sucursales")
            }

            Desbloquear("div_filtro");

        },
        error: function (msg) {
            alert(msg);
            Desbloquear("div_filtro");
        }
    });
}

var ListaReqUsuXctlgxscsl = function () {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomreqc.ashx?OPCION=9&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val(),
        async: true,
        success: function (datos) {
            if (datos != "") {

                $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val(datos);
                var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
                oTableReqApro.fnClearTable();
                oTableReqApro.fnAddData(json);
                Desbloquear("ventana")
            }
            else {
                oTableReqApro.fnClearTable();
                Desbloquear("ventana")
            }


        },
        error: function (msg) {
            alert(msg);
            Desbloquear("ventana")
        }

    });

}

var EnviaLogistica = function () {


    if (oTable_Det_Pedidos.fnGetData().length <= 0 && oTable_Det_Despachos.fnGetData().length <= 0) {
        alertCustom("No hay datos que procesar...")
        return;
    }

    if (oTable_Det_Pedidos.fnGetData().length > 0) {
        $("#modal_reg").modal("show")
        return;
    }
 
    if (oTable_Det_Despachos.fnGetData().length > 0) {
        $("#msg_cargando").html("Creando sólo las salidas . . .")
        var barra = $("#barra_progreso")
        barra.css("width", 0 + "%")
        $("#modal_progress").modal("show")

        var cont = 10;
        var intervalo = setInterval(function () {

            barra.css("width", cont + "%")
            if (cont == 100) { cont = 0; } else { cont = cont + 10; }

        }, 500)
       

        setTimeout(function () {

            $.ajax({
                type: "post",
                url: "vistas/no/ajax/nomreqc.ashx?OPCION=10&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $("#slcSucural").val() + "&NOMBRE_REQ=" + $("#txt_nom_req").val() + "&USUA_ID=" + $("#ctl00_txtus").val(),
                async: true,
                success: function (datos) {
                    if (!isEmpty(datos)) {

                        clearInterval(intervalo)
                        var barra = $("#barra_progreso")
                        barra.css("width", 100 + "%")
                        $("#modal_progress").modal("hide");
                        $("#txt_nom_req").val("")

        
                        console.log(datos);

                        //PEDIDO
                        if (datos[0].RESPEDIDO == "OK") {
                            exitoCustom("El pedido se atendió correctamente.");
                        }
                        else if (datos[0].RESPEDIDO == "CANTIDAD") {
                            infoCustom("Uno de los pedidos no se atendió.Para atenderlo la cantidad total del req. debe ser igual o superior a la cantidad requerida.")
                        }
                        else if (datos[0].RESPEDIDO == "-") {
                            console.log("Sin Pedido")
                        }
                        else {
                            console.log("Error" + datos[0].RESPEDIDO)
                        }


                        //DESPACHO
                        if (datos[0].RESDESPACHO == "OK") {
                            exitoCustom("El despacho se atendió correctamente.");
                        }
                        else if (datos[0].RESDESPACHO == "CANTIDAD") {
                            infoCustom("Uno de los despachos no se atendió.Para atenderlo la cantidad total del req. debe ser igual o superior a la cantidad requerida.")
                        }
                        else if (datos[0].RESDESPACHO == "-") {
                            console.log("Sin Despacho")
                        }
                        else {
                            console.log("Error" + datos[0].RESDESPACHO)
                        }

                                                            
                        ListaReqUsuXctlgxscsl();
                        ListaReqA_Despachar();
                        ListaReqA_Pedir();
                       



                    }



                },
                error: function (msg) {
                    alertCustom("Error insert almacen o req compra");
                    Desbloquear("ventana");
                }

            });

        }, 3000);



        return;
    }
}




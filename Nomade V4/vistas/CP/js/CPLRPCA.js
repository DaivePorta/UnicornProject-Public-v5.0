


var CPLRPCA = function () {

    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#slcSucural').select2();

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



    var fillBandeja = function () {


        var parms = {
            data: null,
            iDisplayLength: -1,
           columns: [
               //{
               //    data: null,
               //    defaultContent: '<img src="recursos/img/details_open.png" class="detDoc">',
               //    createdCell: function (td, cellData, rowData, row, col) {

               //        $(td).css('text-align', 'center')

               //    }
               //},
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({'text-align': 'left','font-weight':'bold'})
                    }
                },

                //{
                //    data: "FECHA",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).css('text-align', 'center')
                //    }
                //},
                 {
                     data: "DESC_CORTA_MONEDA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center')
                     }
                 },
                   {
                       data: "MONTO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css({'text-align': 'center','font-weight':'bold'})
                           $(td).html(formatoMiles($(td).text()))
                       }
                   }
                   ,
                    {
                        data: "DEUDA_SOLES",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css({ 'text-align': 'center', 'font-weight': 'bold' })
                            $(td).html(formatoMiles($(td).text()))
                        }
                    }
                   ,
                   {
                       data: "PAGADO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                           if (rowData.PAGADO == "SI") {
                               $(td).css({'color': 'green','font-weight':'bold'})
                           } else if (rowData.PAGADO == "NO") {
                               $(td).css({'color': 'red','font-weight':'bold'})
                           }
                       }
                   },
                      {
                          data: null,
                          createdCell: function (td, cellData, rowData, row, col) {
                              $(td).css('text-align', 'center');

                              $(td).html('<a class="btn black"   ><i class="icon-search"></i></a>')

                          }
                      }
                  
                  



            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                //TOTAL MONTO
                api.data().filter(function (e) {

                    y.push(parseFloat(e.MONTO));

                });
                v_total = 0;
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                }


                //TOTAL DEUDA
                y = new Array();
                api.data().filter(function (e) {

                    y.push(parseFloat(e.DEUDA_SOLES));

                });
                v_total2 = 0;
                if (y.length > 0) {
                    v_total2 = y.reduce(function (u, i) { return u + i; });
                }


                $("#total_monto_soles").text(formatoMiles(v_total));
                $("#total_deuda_soles").text(formatoMiles(v_total2));


            }

        }

        oTable = iniciaTabla('tbl_creditos', parms);
        $('#tbl_creditos').removeAttr('style');




    }


    var fillTblAmortizacion = function () {


        var parms = {
            data: null,
            // "sDom": "t",
           
            "paging": false,
            "info": false,
            //"height": "100px",
         //   scrollY: '50px',
            //scrollCollapse: true,
            // "searching": true,
           // responsive : true,
            columns: [
        
                 {
                     data: "EMPLEADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css({ 'text-align': 'left', 'font-weight': 'bold' })
                     }
                 },
                  {
                      data: "FECHA_PROCESO",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).css('text-align', 'center')
                      }
                  },
                    {
                        data: "ORIGEN",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css({ 'text-align': 'center', 'font-weight': 'bold' })
                        
                        }
                    }
                    ,
                     {
                         data: "DESTINO",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).css({ 'text-align': 'center', 'font-weight': 'bold' })
                            
                         }
                     }
                    ,
                    {
                        data: "FORMA_PAGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                           
                        }
                    },
                    {
                        data: "DOCUMENTO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')

                        }
                    },
                    {
                        data: "MONTO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')
                            $(td).html(formatoMiles($(td).text()))
                        }
                    }




            ]

        }

        oTableAmort = iniciaTabla('tbl_amortizaciones', parms);
        $('#tbl_amortizaciones').removeAttr('style');




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
                //$('#slcSucural').append('<option value="T">TODOS</option>');
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

                    $("#input_empl").children().remove();
                    $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")

                    filltxtEmpleado('#txt_empleado', '', 'A');


                }
                else {
                    noexito();
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }



    function filltxtEmpleado(v_ID, v_value) {
        var selectSolicitante = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNLLIMA.ashx?OPCION=2&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&IND_ACTIVO=" + "A",
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null && datos !== '') {
                    selectSolicitante.typeahead({
                        source: function (query, process) {
                            arrayEmpleados = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayEmpleados.push(datos[i].NOMBRE_EMPLEADO);
                                obj += '{';
                                obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '",';
                                obj += '"SCSL_CODE":"' + datos[i].SCSL_CODE + '",';
                                obj += '"CTLG_CODE":"' + datos[i].CTLG_CODE + '",';
                                obj += '"PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE_EMPLEADO] = objeto;
                            });
                            process(arrayEmpleados);
                            Desbloquear("ventana");
                        },
                        updater: function (item) {
                            $("#hfpidm").val(map[item].PIDM);
                            $("#hfnombre_emp").val(map[item].NOMBRE_EMPLEADO);
                            return item;
                        },
                    });


                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectSolicitante.val(v_value);
                    Desbloquear("ventana");
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom('Error al intentar consultar empleados.');
                Desbloquear("ventana");
            }
        });




        selectSolicitante.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txt_empleado").val().length <= 0) {

                $("#hfpidm").val("");
                $("#hfnombre_emp").val("");
            }
        });

    }

    var listar_Credito_Planillas = function () {
        if (vErrors(["slcEmpresa"])) {
            //"slcSucural", "txt_empleado"
            var data = new FormData();

          //  data.append('p_PIDM', $("#hfpidm").val());
            data.append('p_CTLG_CODE', $("#slcEmpresa").val());
           // data.append('p_DESDE', $("#txtDesde").val());
            //data.append('p_HASTA', $("#txtHasta").val());


            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/cp/ajax/CPLRPCA.ashx?OPCION=0",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               Desbloquear("ventana");
               if (datos != null) {
                  
                   oTable.fnClearTable();
                   oTable.fnAddData(datos);
               } else {
                   oTable.fnClearTable();
                 
               }
               Desbloquear("ventana");
           })
           .error(function () {
               Desbloquear("ventana");
               alertCustom("error listado");
           });
        }
    }

    var eventoComtroles = function () {

  

        $('#buscar').on('click', function () {
          //  if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                listar_Credito_Planillas();
            /*} else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                listar_Credito_Planillas();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }*/

        });


        //var emp_ant = ""
        //$('#slcEmpresa').on('change', function () {
        //    if (emp_ant != $(this).val()) {
        //        $("#input_empl").parent().attr("class", "control-group")
        //        Bloquear("ventana");
        //        setTimeout(function () {
        //            ListarSucursales($('#slcEmpresa').val());
        //        }, 1000);

        //        emp_ant = $(this).val();
        //    } else { emp_ant = ""; }
        //});

        //var slc_ant = "";
        //var estado = "";
        //$('#slcSucural').on('change', function () {


        //    if (slc_ant != $(this).val()) {
        //        Bloquear("ventana");
        //        $("#input_empl").parent().attr("class", "control-group")

        //        setTimeout(function () {
        //            $("#input_empl").children().remove();
        //            $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")


        //            filltxtEmpleado('#txt_empleado', '');

        //        }, 1000);



        //        slc_ant = $(this).val();
        //    } else { slc_ant = ""; }
        //});

    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            //ListarSucursales($("#ctl00_hddctlg").val());
            //filltxtEmpleado('#txt_empleado', '');
            eventoComtroles();
            fillBandeja();
            fillTblAmortizacion();
            listar_Credito_Planillas();

        }
    };

}();


$(function () {

    $('#tbl_creditos tbody td a').live('click', function () {

       
        var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
        var row = oTable.fnGetData(pos);

        var codPlanilla = row.DOCUMENTO;
        var ctlg_code = row.CTLG_CODE;
        var planilla = row.DESCRIPCION;
        var nTr = $(this).parents('tr')[0];

        $("#lbl_planilla").text(planilla);
        $("#modal_info").modal("show")

        //if (oTable.fnIsOpen(nTr)) {
        //    /* This row is already open - close it */
        //    this.src = "recursos/img/details_open.png";
        //    oTable.fnClose(nTr);
        //}
        //else {

           
        //    /* Open this row */
        //    this.src = "recursos/img/details_close.png";
        //    //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

        //    oTable.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
        //    oTable.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
        //    $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
            //$.ajax({
            //    type: "POST",
            //    url: "vistas/cp/ajax/CPLRPCA.ashx?OPCION=1&p_COD_FACAPS=" + codPlanilla,
            //    async: false,
            //    success: function (datos) {
            //        oTableAmort.fnClearTable();
            //        if (!isEmpty(datos)) {
            //            oTableAmort.fnAddData(datos)
                        
            //        }
                    
            //    }
        //});
        Bloquear("ventanaInfo");
        var data = new FormData();
        data.append('p_COD_PLANILLA', codPlanilla);
        data.append('p_CTLG_CODE', ctlg_code);
        

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/cp/ajax/CPLRPCA.ashx?OPCION=1",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
              .success(function (datos) {
                  oTableAmort.fnClearTable();
                  if (!isEmpty(datos)) {
                      oTableAmort.fnAddData(datos)
                      $("#tbl_amortizaciones .odd").css("background-color", "#e1f0f7")
                  } else {

                      //infoCustom2("No se han encontrado amortizaciones de pagos!")
                  }
                  Desbloquear("ventanaInfo")
              })
              .error(function () {
                  Desbloquear("ventanaInfo");
                  oTableAmort.fnClearTable();
                  alertCustom("error obtener listado amortizaciones");
                 
              });

        //}

    });

    function fnFormatDetails(nTr, id) {
        //var aData = oTable.fnGetData(nTr);
        var sOut = '<div id="c' + id + '"></div>';
        return sOut;
    }
});
var NMLBEXI = function () {

    var plugins = function () {


        $('#slcEmpresa').select2();
        $('#cbo_series').select2();



    }




    var fillBandeja = function () {

        var parms = {
            data: null,
            ordering: false,
            responsive: true,
            iDisplayLength: -1,
            //"sDom": "t",
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            "paging": false,
            "scrollY": "280px",
            "searching": false,
            "info": false,

            columns: [
                {
                    data: "TIPO_MOV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                 {
                     data: "OPERACION",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');

                     }
                 },
                  {
                      data: "NOMBRES",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center');

                      }
                  },
                   {
                       data: "FEC_ACTV",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center');

                       }
                   },
                    {
                        data: "TIPO_DCTO_DESC",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center');

                        }
                    },
                     {
                         data: "NUM_DCTO",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).attr('align', 'center');

                         }
                     },
                      {
                          data: null,
                          createdCell: function (td, cellData, rowData, row, col) {
                              //if (row.COMPLETO === 'COMPLETO') $(cell).html('');
                              $(td).css('text-align', 'center');
                              $(td).html('<a class="btn red" target="_blank"   href="' + rowData.TARGET + '"><i class="icon-search"></i></a>')
                           
                          }
                      }



            ],




        }

        oTable = iniciaTabla('tbl_detalle', parms);
        $('#tbl_detalle').removeAttr('style');
      //  $("#tbl_mis_marcaciones_filter").attr("style", "color:white");
        $('.dataTables_scrollBody').attr("style", "overflow: auto;width:100%");
        // $("#tbl_mis_marcaciones_wrapper").children().first().remove()


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
                else {
                    alertCustom("no existen empresas que listar")
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
              
            },
            error: function (msg) {
                // alert(msg);
                alertCustom("error listar empresa")
            }
        });
    }









    var eventoControles = function () {



        $('#btn_filtrar').on('click', function () {



            var validar = []
            if ($("#rbPorSerie").is(":checked")) {
                validar.push("txt_serie", "slcEmpresa")
                var serie = $("#txt_serie").val();
            }
            if ($("#rbPorProducto").is(":checked")) {
                validar.push("txt_prod", "cbo_series")
                var serie = $("#cbo_series").val();
            }



            if( vErrors(validar)){
               
                var ctlg = $("#slcEmpresa").val();



                Bloquear("ventana");

                setTimeout(function () {

                    Lista_Seguimiento(serie, ctlg);


                }, 1000)
            }

         
           

        });

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
               Reset()
                Bloquear("ventana");
                $("#txt_prod").remove();
                $("#input_desc_prod").html("<input class='span12' type='text' id='txt_prod' name='txt_prod'>");
               
                setTimeout(function () {
                    fillTxtProducto('#txt_prod', '');

                }, 1000)

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });




        $("#rbPorSerie").click(function () {
            $(".prod").css("display", "none")
            $(".serie").css("display", "block")
            Reset();

        });


        $("#rbPorProducto").click(function () {
            $(".serie").css("display", "none")
            $(".prod").css("display", "block")
            Reset();
           

        });
    }


    function Reset() {
        oTable.fnClearTable();
        $("#desc_producto").text("-")
        $("#txt_serie").val("")
        $("#txt_prod").val("")
        $("#cbo_series").html("<option></option>")
        $("#cbo_series").select2("val", "")

        var a = $(".error")
        $(a).removeClass("error");
        $("[id*=correcto]").remove()
    }


    var Lista_Seguimiento = function (num_serie,ctlg) {

        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmlbexi.ashx?OPCION=1&p_NUM_SERIE=" + num_serie + "&p_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (!isEmpty(datos)) {
                    //$('#btnMail').attr('disabled', false)
                    var a = datos
                    //a.sort(function (x, z) { return x.DIA - z.DIA })
                    oTable.fnClearTable();
                    oTable.fnAddData(a);
                    $("#desc_producto").text(datos[0].DESC_PROD)
                    

                }
                else {
                   
                    oTable.fnClearTable();
                    $("#desc_producto").text("-")
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }

    var CargaInicial = function () {

        $(".serie").css("display", "block")
        $(".prod").css("display", "serie")

        var serie = ObtenerQueryString("serie");
        var ctlg = ObtenerQueryString("ctlg");
        if (serie !== undefined && ctlg !== undefined) {
           
            $('#slcEmpresa').select2("val", ctlg).change()
            $("#txt_serie").val(serie)
            Bloquear('ventana');
            Lista_Seguimiento(serie, ctlg);

        } else {

            $("#txt_prod").remove();
            $("#input_desc_prod").html("<input class='span12' type='text' id='txt_prod' name='txt_prod'>");
            Bloquear("ventana")
            setTimeout(function () {
                fillTxtProducto('#txt_prod', '');

            }, 1000)

        }
       

    }






    return {
        init: function () {
            plugins();
            fillCboEmpresa();


            fillBandeja();
            eventoControles();
            CargaInicial();



        }
    };

}();


function fillTxtProducto(v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NM/ajax/NMLBEXI.ashx?OPCION=2&p_CTLG_CODE=" + $('#slcEmpresa').val(),
            //+ "&p_alamcen=" + $('#hf10').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                selectRazonSocial.typeahead({
                    items: 100,
                    source: function (query, process) {
                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].NOMBRE_COMERCIAL);
                            obj += '{';
                            obj += '"NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL + '","CODIGO":"' + datos[i].CODIGO + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE_COMERCIAL] = objeto;
                        });
                        process(array);

                    },
                    updater: function (item) {
    
                        $("#desc_producto").text(map[item].NOMBRE_COMERCIAL)
                        Bloquear("ventana")
                        setTimeout(function () {

                            Lista_Series(map[item].CODIGO, $('#slcEmpresa').val());


                        }, 1000)
                       
                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width")).css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                    if ($(this).val().length == 0) {

                        $("#desc_producto").text('-');
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
            Desbloquear("ventana");
        },
        error: function (msg) {
            alert(msg);
            Desbloquear("ventana");
        }
    });

}


function Lista_Series(prod_code, ctlg) {

    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmlbexi.ashx?OPCION=3&p_PROD_CODE=" + prod_code + "&p_CTLG_CODE=" + ctlg,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            $('#cbo_series').empty();
            $('#cbo_series').append('<option></option>');
            if (!isEmpty(datos)) {

                for (var i = 0; i < datos.length; i++) {

                    $('#cbo_series').append('<option value="' + datos[i].SERIES + '">' + datos[i].SERIES + '</option>');
                }
            } else {

                alertCustom("No hay series que listar")
            }
            $("#cbo_series").select2("val", "");
            Desbloquear("ventana");

        },
        error: function (msg) {
            alert(msg);
            Desbloquear("ventana");
        }

    });

}
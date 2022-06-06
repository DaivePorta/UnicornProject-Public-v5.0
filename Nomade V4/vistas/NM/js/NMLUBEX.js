var NMLUBEX = function () {

    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#cbo_grupo').select2();
        $('#cbo_subgrupo').select2();
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
            "searching": true,
            "info": false,

            columns: [
                {
                    data: "TIPO_MOV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                 {
                     data: "PRODUCTO_DESC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center');

                     }
                 },
                 {
                     data: "SERIE",
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
                              $(td).html('<a class="btn red" target="_blank"   href="?f=nmlbexi&ctlg=' + rowData.CTLG_CODE + '&serie=' + rowData.SERIE + '"><i class="icon-search"></i></a>')

                          }
                      }



            ],




        }

        oTable = iniciaTabla('tbl_detalle', parms);
        $('#tbl_detalle').removeAttr('style');
       //   $("#tbl_mis_marcaciones_filter").attr("style", "color:white");
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

    var fillCboGrupos = function () {
        Bloquear($($("#cbo_grupo").parents("div")[2]));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=4&CTLG_CODE=" + $.trim($('#slcEmpresa').val()) + "&OPCION2=&CODE_EXIS=",
            async: true,
            success: function (datos) {
                Desbloquear($($("#cbo_grupo").parents("div")[2]));
                $('#cbo_grupo').empty();
                $('#cbo_grupo').append('<option></option>');
               // $('#cbo_grupo').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_grupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_grupo').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cbo_grupo").parents("div")[2]));
                alertCustom("Grupos no se listaron correctamente");
            }
        });
    }

    var fillCboSubgrupos = function () {
        if ($('#cbo_grupo').val() != "") {
            Bloquear($($("#cbo_subgrupo").parents("div")[2]));
            $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + $.trim($('#cbo_grupo').val()) + "&CTLG_CODE=" + $.trim($('#slcEmpresa').val()),
                async: true,
                success: function (datos) {
                    Desbloquear($($("#cbo_subgrupo").parents("div")[2]));
                    $('#cbo_subgrupo').empty();
                    //$('#cbo_subgrupo').append('<option value="">TODOS</option>');
                    $('#cbo_subgrupo').append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbo_subgrupo').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                        }
                        $('#cbo_subgrupo').removeAttr("disabled");
                    } else {
                        $('#cbo_subgrupo').attr("disabled", "disabled");
                    }
                    $('#cbo_subgrupo').select2('val', '');
                },
                error: function (msg) {
                    Desbloquear($($("#cbo_subgrupo").parents("div")[2]));
                    alertCustom("Subgrupos no se listaron correctamente");
                }
            });
        } else {
            $('#cbo_subgrupo').empty().append('<option></option>').select2('val', '');
           
        }
    }







    var eventoControles = function () {



        $('#btn_filtrar').on('click', function () {






            if (vErrors(["slcEmpresa", "cbo_grupo", "cbo_subgrupo"])) {
                Bloquear("ventana");
                setTimeout(function () {
            if($("#txtRazonSocial").val() == "" ){  $("#hfPidm").val("")}
            if ($("#txt_prod").val() == "") { $("#hfCodProd").val("") }


            var pidm = $("#hfPidm").val();
            var prod_code = $("#hfCodProd").val();
            var emp = $("#slcEmpresa").val();
            var grupo = $("#cbo_grupo").val();
            var subgrupo = $('#cbo_subgrupo').val();

            Lista_Seguimiento(emp,grupo,subgrupo,prod_code,pidm);


                }, 1000)
            }




        });


        $('#cbo_grupo').on('change', function () {
         
            $("#hfCodProd").val('')
            $("#txt_prod").remove();
            $("#input_desc_prod").html("<input class='span12' type='text' id='txt_prod' name='txt_prod'>");
            fillCboSubgrupos();
        });


        $('#cbo_subgrupo').on('change', function () {
           
            $("#hfCodProd").val('')
            Bloquear($($("#txt_prod").parents("div")[2]));
            $("#txt_prod").remove();
            $("#input_desc_prod").html("<input class='span12' type='text' id='txt_prod' name='txt_prod'>");

            setTimeout(function () {
                fillTxtProducto('#txt_prod', '');

            }, 1000)
        });

       

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
              
              
                $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase"/>');
                Bloquear($($("#txtRazonSocial").parents("div")[2]));
                $("#cbo_subgrupo").html("<option></option>").select2("val", "")
                $("#txt_prod").remove();
                $("#input_desc_prod").html("<input class='span12' type='text' id='txt_prod' name='txt_prod'>");
                LimpiarHidden();
                setTimeout(function () {
                    fillCboGrupos();
                    autocompletarPersonas('#txtRazonSocial', '');

                }, 1000)

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });


    }





    var Lista_Seguimiento = function (ctlg,grupo,subgrupo,prod_cod,pidm) {

        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmlubex.ashx?OPCION=1&p_CTLG_CODE=" + ctlg + "&p_GRUP_CODE=" + grupo + "&p_SUBGRUP_CODE=" + subgrupo + "&p_PROD_CODE=" + prod_cod + "&p_PIDM=" +  pidm,
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
                  //  $("#desc_producto").text(datos[0].DESC_PROD)


                }
                else {

                    oTable.fnClearTable();
                    //$("#desc_producto").text("-")
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }

 






    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboGrupos();

             fillBandeja();
            eventoControles();
         

            $('#txtRazonSocial').parent().html('<input id="txtRazonSocial" class="span12" type="text" style="text-transform: uppercase"/>');
            Bloquear($($("#txtRazonSocial").parents("div")[2]));
            autocompletarPersonas('#txtRazonSocial', '');


        }
    };

}();



function fillTxtProducto(v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NM/ajax/NMLBEXI.ashx?OPCION=2&p_CTLG_CODE=" + $('#slcEmpresa').val() + "&p_GRUP_CODE=" + $('#cbo_grupo').val() + "&p_SUBGRUP_CODE=" + $('#cbo_subgrupo').val(),
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

                       
                        $("#hfCodProd").val(map[item].CODIGO);

                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width")).css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                    if ($(this).val().length == 0) {

                        $("#hfCodProd").val("");
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
            Desbloquear($($("#txt_prod").parents("div")[2]));
        },
        error: function (msg) {
            alert(msg);
            Desbloquear($($("#txt_prod").parents("div")[2]));
        }
    });

}






function autocompletarPersonas(v_ID, v_value) {
    var selectinput = $(v_ID);
   // Bloquear('ventana');
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/naminsa.ashx?OPCION=LPER",
        cache: false,
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos !== null) {
                selectinput.typeahead({
                    items: 100,
                    source: function (query, process) {
                        arrayPersonas = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayPersonas.push(datos[i].RAZON_SOCIAL);
                            obj += '{ "CODIGO_TIPO_DOC": "' + datos[i].CODIGO_TIPO_DOC + '","NRO_DOC": "' + datos[i].NRO_DOC + '","RAZON_SOCIAL": "' + datos[i].RAZON_SOCIAL + '","DIRECCION": "' + datos[i].DIRECCION + '","PIDM": "' + datos[i].PIDM + '" },';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });

                        process(arrayPersonas);
                    },
                    updater: function (item) {
                        $("#hfPidm").val(map[item].PIDM);
                       
                        return item;
                    },
                });
                selectinput.keyup(function () {
                    //$('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                    $(this).siblings("ul").css("width", $(this).css("width"));
                    if ($(this).val().length == 0) {
                        $('#hfPidm').val('');
                      
                    }
                });
            }
            //   Desbloquear('ventana');
            Desbloquear($($("#txtRazonSocial").parents("div")[2]));
        },
        error: function (msg) {
            alertCustom('Error al listar Personas.');
            //     Desbloquear('ventana');
            Desbloquear($($("#txtRazonSocial").parents("div")[2]));
        }
    });
};


function LimpiarHidden() {

    $("#hfPidm").val("");
    $("#hfCodProd").val("");

}
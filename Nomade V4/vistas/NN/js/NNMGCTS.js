var NNMGCTS = function () {
    var plugins = function () {

        $('#cboEmpresa').select2()
        $('#cbo_mes').select2()
        $("#cbo_tipo_planilla").select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());
    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    $('#cboEstablecimiento').select2('val', '');

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }




    function FitraPlanilla() {

        var data = new FormData();
        data.append('OPCION', "1");
        //data.append('TIPO_PLANILLA', tipo_planilla);
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ANIO', $("#optanho").val());
        data.append('p_MES', $("#optmes").datepicker("getDate").getMonth() + 1);


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/nnlplan.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null && datos != "") {

               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddTabla").val(datos.split("{|||||}")[0]);
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($("#optanho").val());
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddMes").val(($("#optmes").datepicker("getDate").getMonth() + 1));

               if (datos.split("{|||||}")[1] == "" && datos.split("{|||||}")[2] == "") {
                   $("#btnGenerarLibro").attr("style", "display:none")
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
               }

               if (datos.split("{|||||}")[1] != "" && datos.split("{|||||}")[2] != "" && datos.split("{|||||}")[3] == "G") {
                   $("#btnGenerarLibro").attr("style", "display:block")
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:block")
                   $('#divPlanillas').html(datos.split("{|||||}")[0]);
               }

               if (datos.split("{|||||}")[1] != "" && datos.split("{|||||}")[2] != "" && datos.split("{|||||}")[3] == "C") {
                   $("#btnGenerarLibro").attr("style", "display:none")
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:block")
                   getPlanilla($("#cboEmpresa").val(), $("#optanho").val(), ($("#optmes").datepicker("getDate").getMonth() + 1));
               }


               if (datos.split("{|||||}")[1] != "" && datos.split("{|||||}")[2] != "" && datos.split("{|||||}")[3] == "0") {
                   $("#btnGenerarLibro").attr("style", "display:block")
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
                   $('#divPlanillas').html(datos.split("{|||||}")[0]);
               }



           } else {
               alertCustom("Error listar planilla");
           }
       })
       .error(function () {
           Desbloquear("ventana");
           alertCustom("Error listar planilla");
       });
    }


    var ObtenerCadenaPlanillaInserccion = function () {


        var data = new FormData();
        data.append('OPCION', "1");
        //data.append('TIPO_PLANILLA', tipo_planilla);
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ANIO', $("#optanho").val());
        data.append('p_MES', $("#optmes").datepicker("getDate").getMonth() + 1);


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/nnlplan.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null && datos != "") {
               $('#divPlanillas').html(datos.split("{|||||}")[0]);
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddTabla").val(datos.split("{|||||}")[0]);
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($("#optanho").val());
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddMes").val(($("#optmes").datepicker("getDate").getMonth() + 1));


               GeneraPlanilla(datos.split("{|||||}")[1], datos.split("{|||||}")[2], $("#optanho").val(), ($("#optmes").datepicker("getDate").getMonth() + 1), $("#cboEmpresa").val());

           } else {
               alertCustom("Error listar planilla");
           }
       })
       .error(function () {
           Desbloquear("ventana");
           alertCustom("Error listar planilla");
       });


    }



    var GeneraPlanilla = function (cad_cabecera, cad_detalle, anio, mes, ctlg_code) {





        var data = new FormData();
        data.append('OPCION', "2");
        data.append('p_DETALLE', cad_detalle);
        data.append('p_CABECERA', cad_cabecera);
        data.append('p_ANIO', anio);
        data.append('p_MES', mes);
        data.append('p_CTLG_CODE', ctlg_code);
        data.append('p_USUA_ID', $('#ctl00_txtus').val());


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/nnlplan.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != "") {
               if (datos == "OK") {
                   exito();
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:block")
               }
               if (datos == "E") {

                   alertCustom("Error generar planilla");
               }

               if (datos != "E" && datos != "OK") {
                   alertCustom("Error generar planilla");
               }

           } else {
               alertCustom("Error generar planilla");
           }
       })
       .error(function () {
           Desbloquear("ventana");
           alertCustom("Error generar planilla");
       });



    }


    var eventoComtroles = function () {


        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "optanho", "cbo_mes"])) {
                Bloquear("ventana")
                setTimeout(function(){
               $("#div_periodo").css("display", "block");
                if ($("#cbo_mes").val() == 10) {

                    $("#sp_periodo").html("").html("MAYO " + $("#optanho").val() + " - " + "OCTUBRE " + $("#optanho").val());
                }
                if ($("#cbo_mes").val() == 4) {

                    $("#sp_periodo").html("").html("NOVIEMBRE " + ($("#optanho").val() - 1 ) + " - " + "ABRIL " + $("#optanho").val());
                }

                
                Lista_Datos_Cts();
            
            
            
            
            },1000)
               
            }
        });


        //$('#btnGenerarLibro').on('click', function () {
        //    if (vErrors(["cboEmpresa", "cbo_tipo_planilla", "optanho", "optmes"])) {


        //        Verifica_Genracion_plani($("#optanho").val(), ($("#optmes").datepicker("getDate").getMonth() + 1), $("#cboEmpresa").val());
        //    }
        //});


        //$('#cboEmpresa').on('change', function () {
        //    $("#btnGenerarLibro").attr("style", "display:none")
        //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
        //    $("#divPlanillas").html("");
        //});


        //$("#optmes").datepicker().on("changeDate", function (e) {
        //    $("#btnGenerarLibro").attr("style", "display:none")
        //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
        //    $("#divPlanillas").html("");
        //});

        //$("#optanho").datepicker().on("changeDate", function (e) {
        //    $("#btnGenerarLibro").attr("style", "display:none")
        //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
        //    $("#divPlanillas").html("");
        //});


        //$("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").on('click', function () {
        //    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").blur()
        //});
    }

    function Exportar() {

        var data = new FormData;
        data.append('p_ANIO', $('#txtanio').val());
        data.append('p_MES', $('#cboMes').val());
        data.append('p_MES_DES', $('#cboMes option:selected').html());
        data.append('p_RUC', $('#ruc').html());
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());

        $.ajax({
            type: "POST",
            url: "vistas/co/ajax/colreco.ashx?OPCION=5",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos == 'ok') {
                    exito();
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("N");
                }
                else {
                    if (datos == 'vacio') {
                        exito();
                        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("S");

                    } else { noexito(); }
                }
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    var Verifica_Genracion_plani = function (anio, mes, ctlg_code) {

        var data = new FormData();
        data.append('OPCION', "4");
        data.append('p_ANIO', anio);
        data.append('p_MES', mes);
        data.append('p_CTLG_CODE', ctlg_code);
        // data.append('p_USUA_ID', $('#ctl00_txtus').val());


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/nnlplan.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != "") {

               if (datos == "G" || datos == "0") {
                   ObtenerCadenaPlanillaInserccion();
               }
               if (datos == "C") {

                   $("#btnGenerarLibro").attr("style", "display:none")
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:block")
                   getPlanilla(ctlg_code, anio, mes);



               }



           } else {
               alertCustom("Error verificar planilla");
           }
       })
       .error(function () {
           Desbloquear("ventana");
           alertCustom("Error verificar planilla");
       });


    }

    var getPlanilla = function (ctlg, anio, mes) {


        var data = new FormData();
        data.append('OPCION', "3");
        data.append('p_ANIO', anio);
        data.append('p_MES', mes);
        data.append('p_CTLG_CODE', ctlg);
        //data.append('p_USUA_ID', $('#ctl00_txtus').val());


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/nnlplan.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != "") {

               $('#divPlanillas').html("");
               $('#divPlanillas').html(datos);
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddTabla").val("");
               $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddTabla").val(datos);

           } else {
               alertCustom("Error listar planilla");
           }
       })
       .error(function () {
           Desbloquear("ventana");
           alertCustom("Error listar planilla");
       });



    }

    var cargaInicial = function () {

    }


    var fillBandeja = function () {


        var parms = {
            data: null,
            scrollCollapse: true,
          //  scrollX: true,
            paging: false,
            info: false,
            ordering: false,
            searching : false,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },

                {
                    data: "APE_PAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                 {
                     data: "APE_MAT",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'left')
                     }
                 },
                   {
                       data: "NOMBRES",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
                   ,
                   {
                       data: "TIPO_DCTO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                       }
                   }
                   ,
                   {
                       data: "NRO_DCTO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'right')
                         
                       }
                   },     
                   {
                       data: "FECHA_NACIMIENTO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                       }
                   },
                   {
                       data: "FECHA_INI",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                       }
                   },
                    {
                        data: "BANC_CTS",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')

                        }
                    },
                   {
                       data: "NRO_CTA_CTS",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                       }
                   },
                   {
                       data: "REG_LABORAL",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                       }
                   },
                   {
                       data: "PORCENTAJE_CTS",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                       }
                   },
                   {
                       data: "SUMA_TOTAL_AFECTO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                           rowData.SUMA_TOTAL_AFECTO = isNaN((parseFloat(rowData.SUMA_TOTAL_AFECTO) / parseFloat(rowData.CONT_TOTAL_AFECTO))) ? 0 : (parseFloat(rowData.SUMA_TOTAL_AFECTO) / parseFloat(rowData.CONT_TOTAL_AFECTO));
                           $(td).html(formatoMiles(isNaN((parseFloat(rowData.SUMA_TOTAL_AFECTO) / parseFloat(rowData.CONT_TOTAL_AFECTO))) ? 0 : (parseFloat(rowData.SUMA_TOTAL_AFECTO) / parseFloat(rowData.CONT_TOTAL_AFECTO))))
                       }
                   },
                   {
                       data: "MESES",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                          
                           // fecha ini contrato
                           var f_ini = rowData.FECHA_INI.toString()
                           // fecha ini contrato
                           var d = new Date(f_ini.split("/")[1] + "-" + f_ini.split("/")[0] + "-" + f_ini.split("/")[2])
                           // fecha ini computo cts
                           var d2 = new Date(rowData.F_INI_CTS.toString())
                           // fecha fin computo cts
                           var d3 = new Date(rowData.F_FIN_CTS.toString())

                           if (d > d2) {  // d = fecha inicio contrato; d2 = fecha inicio computable pago cts
                               
                               
                               var d4 = d3, dias_total = 0;
                               if (!((d.getMonth() + 1) == (d3.getMonth() + 1) &&
                                      d.getDate() > 1)
                                   )
                                   { // si entra a mitad del ultimo mes computable no tiene cts tiene q ser (MES COMPLETO)
                                    d4.setDate(d4.getDate() + 1)
                                    dias_total = DateDiff(d, d4);
                                   if (dias_total < 0) { dias_total = dias_total * -1; }
                                   }
                                var r = Dias_meses(dias_total) 
                                var oMeses =  Devuelve_Meses(r,1)

                              $(td).html(oMeses)
                               rowData.MESES = oMeses

                           } else {
                                   //var d4 = d3;
                                   //d4.setDate(d4.getDate() + 1)
                                   //var dias_total = DateDiff(d2, d4);
                                   //if (dias_total < 0) { dias_total = dias_total * -1; }

                                   //var r = Dias_meses(dias_total); 
                               //var oMeses = Devuelve_Meses(r,1)
                                   var oMeses = 6;

                                   $(td).html(oMeses)
                                   rowData.MESES = oMeses
                     
                           }
                       }
                   },
                   {
                       data: "DIAS",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                           // fecha ini contrato
                           var f_ini = rowData.FECHA_INI.toString()
                           // fecha ini contrato
                           var d = new Date(f_ini.split("/")[1] + "-" + f_ini.split("/")[0] + "-" + f_ini.split("/")[2])
                           // fecha ini computo cts
                           var d2 = new Date(rowData.F_INI_CTS.toString())
                           // fecha fin computo cts
                           var d3 = new Date(rowData.F_FIN_CTS.toString())
                          
                           if (d > d2) {

                               if (!((d.getMonth() + 1) == (d3.getMonth() + 1) &&
                                     d.getDate() > 1)
                                  ) { // si entra a mitad del ultimo mes computable no tiene cts tiene q ser (MES COMPLETO)
                                   var d5 = d3;
                                   d5.setDate(d5.getDate() + 1)
                                   var dias_total = DateDiff(d, d5);
                                   if (dias_total < 0) { dias_total = dias_total * -1; }
                               }

                               var r = Dias_meses(dias_total);
                               var oDias = Devuelve_Meses(r, 2)
                          

                               $(td).html(oDias)
                               rowData.DIAS = oDias

                           } else {

                                   //var d5 = d3;
                                   //d5.setDate(d5.getDate() + 1)
                                   //var dias_total = DateDiff(d2, d5);
                                   //if (dias_total < 0) { dias_total = dias_total * -1; }

                                   //var r = Dias_meses(dias_total);
                                   //var oDias = Devuelve_Meses(r, 2)
                                   var oDias = 0;
                                   $(td).html(oDias)
                                   rowData.DIAS = oDias
                            
                           }
                       }
                   },
                   {
                       data: "SUELDO_AFECTO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                           
                           var por = parseInt(rowData.PORCENTAJE_CTS) / 100

                           rowData.SUELDO_AFECTO = parseFloat(rowData.SUMA_TOTAL_AFECTO) * por
                           $(td).html(formatoMiles(parseFloat(rowData.SUELDO_AFECTO)))

                       }
                   },
                   {
                       data: "MONTO_MES_CTS",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                          

                           rowData.MONTO_MES_CTS = (parseFloat(rowData.SUELDO_AFECTO) / 12) * rowData.MESES
                           $(td).html(formatoMiles(parseFloat(rowData.MONTO_MES_CTS)))

                       }
                   },
                   {
                       data: "MONTO_DIA_CTS",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                           rowData.MONTO_DIA_CTS = ((parseFloat(rowData.SUELDO_AFECTO) / 12)/30) * rowData.DIAS
                           $(td).html(formatoMiles(parseFloat(rowData.MONTO_DIA_CTS)))


                       }
                   },
                   {
                       data: "MONTO_DESPOSITAR",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                           rowData.MONTO_DESPOSITAR = parseFloat(rowData.MONTO_MES_CTS) + parseFloat(rowData.MONTO_DIA_CTS)
                           $(td).html(formatoMiles(parseFloat(rowData.MONTO_DESPOSITAR)))

                       }
                   }

            ]

        }

        oTable = iniciaTabla('tbl_cts', parms);
        $('#tbl_cts').removeAttr('style');
        $("#tbl_cts").css("border-collapse", "collapse")
    }

    var Lista_Datos_Cts = function () {
       
        
        
       
        

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMGCTS.ashx?OPCION=0&p_CTLG_CODE=" + $("#cboEmpresa").val() + "&p_MES=" + $("#cbo_mes").val() + "&p_ANIO=" + $("#optanho").val(),
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);


                }
                else {

                    oTable.fnClearTable();
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
            fillBandeja();
          //  Lista_Datos_Cts();
            fillCboEmpresa();
            eventoComtroles();
            //cargaInicial();
        }
    };

}();





function Dias_meses(total_days) {
    //var total_days = 1001;
    var date_current = new Date();
    var utime_target = date_current.getTime() + total_days * 86400 * 1000;
    var date_target = new Date(utime_target);

    var diff_year = parseInt(date_target.getUTCFullYear() - date_current.getUTCFullYear());
    var diff_month = parseInt(date_target.getUTCMonth() - date_current.getUTCMonth());
    var diff_day = parseInt(date_target.getUTCDate() - date_current.getUTCDate());

    var days_in_month = [31, (date_target.getUTCFullYear() % 4 ? 28 : 29), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var date_string = "";
    while (true) {
        date_string = "";
        date_string += (diff_year > 0 ? diff_year + "/Y" : "");

        if (diff_month < 0) { diff_year -= 1; diff_month += 12; continue; }
        date_string += (diff_month > 0 ? "-" + diff_month + "/M" : "");

        if (diff_day < 0) { diff_month -= 1; diff_day += days_in_month[((11 + date_target.getUTCMonth()) % 12)]; continue; }
        date_string += (diff_day > 0 ? "-"+diff_day + "/D" : "");
        break;
    }
    return date_string;
}


function Devuelve_Meses(dias_total,tipo) { // tipo 1 = MESES , 2 = DIAS

    var resp = 0,letra = "";

    if(tipo == 1 ){ letra = "M"}
    if (tipo == 2) { letra = "D" }

    var oD = dias_total.split("-")[0]
    var oE = dias_total.split("-")[1]
    var oF = dias_total.split("-")[2]

    if (oD != undefined && oD != "") {
        var oDD = oD.split("/")[1]
        if (oDD == letra) { resp = oD.split("/")[0] }
    }
    if (oE != undefined && oE != "") {
        var oEE = oE.split("/")[1]
        if (oEE == letra) { resp = oE.split("/")[0] }
    }
    if (oF != undefined && oF != "") {
        var oFF = oF.split("/")[1]
        if (oFF == letra) { resp = oF.split("/")[0] }
    }

    return resp;

}


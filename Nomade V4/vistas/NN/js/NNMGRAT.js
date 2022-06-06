var array = [];
var NNMGRAT = function () {


     obj = [
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
                     data: "BANC_GRATI",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center')

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

                            //if (!((d.getMonth() + 1) == (d3.getMonth() + 1) &&
                            //      d.getDate() > 1)
                            //   ) { // si entra a mitad del ultimo mes computable no tiene grati tiene q ser (MES COMPLETO)
                            //    var d5 = d3;
                            //    d5.setDate(d5.getDate() + 1)
                            //    var dias_total = DateDiff(d, d5);
                            //    if (dias_total < 0) { dias_total = dias_total * -1; }
                            //}


                            var oDias = CantidadDias(d, d3)


                            $(td).html(oDias)
                            rowData.DIAS = oDias

                        }
                        else {

                            var oDias = CantidadDias(d2, d3)


                            $(td).html(oDias)
                            rowData.DIAS = oDias

                        }
                    }
                },
                {
                    data: "DIAS_FALTAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')



                    }
                },
                {
                    data: "PROMEDIO_DIARIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                        var pro_dia = 0;

                        if(parseFloat(rowData.DIAS) >= 30 ){
                            var pro_dia = parseFloat(rowData.SUM_REM_BASICO) / parseFloat(rowData.DIAS)
                        }




                        rowData.PROMEDIO_DIARIO = parseFloat(pro_dia.toFixed(2))
                        $(td).html(formatoMiles(pro_dia))

                    }
                },
                 {
                     data: "REM_COMPUTABLE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center')

                         var sum_concep_variables = 0;

                         if (parseFloat(rowData.DIAS) >= 30) {
                             for (var i = 0 ; i < array.length; i++) {
                                 var cad = "rowData." + array[i].toString();
                                 sum_concep_variables = sum_concep_variables + (parseFloat(eval(cad)) / (parseInt(parseInt(rowData.DIAS) / 30)))

                             }
                         }

                         //
                         rowData.REM_COMPUTABLE =  parseFloat((parseFloat(rowData.PROMEDIO_DIARIO * 30) +  sum_concep_variables).toFixed(2))
                         $(td).html(formatoMiles(parseFloat(rowData.REM_COMPUTABLE)))

                     }
                 },
                  {
                      data: "GRAT_COMPLETA",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).css('text-align', 'center')


                          var grat_compl = (parseFloat(rowData.REM_COMPUTABLE) / 6) * (parseInt(parseInt(rowData.DIAS) / 30))
                          rowData.GRAT_COMPLETA = parseFloat(grat_compl.toFixed(2))
                          $(td).html((formatoMiles(parseFloat(rowData.GRAT_COMPLETA))))

                      }
                  },
                  {
                      data: "DESCUENTO_X_FALTA",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).css('text-align', 'center')


                          var factor_dia = (parseFloat(rowData.REM_COMPUTABLE) / 6) / 30
                          var desc = factor_dia.toFixed(2) * parseFloat(rowData.DIAS_FALTAS);


                          rowData.DESCUENTO_X_FALTA = parseFloat(desc.toFixed(2))
                          $(td).html(formatoMiles(parseFloat(rowData.DESCUENTO_X_FALTA)))

                      }
                  },
                   {
                       data: "GRATI_NETA",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')


                           var grat_neta = parseFloat(rowData.GRAT_COMPLETA) - parseFloat(rowData.DESCUENTO_X_FALTA)
                           rowData.GRATI_NETA = parseFloat(grat_neta.toFixed(2))
                           $(td).html(formatoMiles(parseFloat(rowData.GRATI_NETA)))

                       }
                   },
                   {
                       data: "BONI_EXTRA",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')


                           var boni_extra = parseFloat(rowData.GRATI_NETA) * parseFloat((9 / 100))
                           rowData.BONI_EXTRA = parseFloat(boni_extra.toFixed(2))
                           $(td).html(formatoMiles(parseFloat(rowData.BONI_EXTRA)))

                       }
                   }
                   //,
                   //{
                   //    data: "MONTO_PERCIBIR",
                   //    createdCell: function (td, cellData, rowData, row, col) {
                   //        $(td).css('text-align', 'center')


                   //        var monto = parseFloat(rowData.GRAT_COMPLETA) + parseFloat(rowData.BONI_EXTRA)
                   //        rowData.MONTO_PERCIBIR = parseFloat(monto)
                   //        $(td).html(formatoMiles(parseFloat(monto)))

                   //    }
                   //},
               
    ]



    var plugins = function () {

        $('#cboEmpresa').select2()
        $('#cbo_mes').select2()
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
       
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




    var eventoComtroles = function () {


        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "optanho", "cbo_mes"])) {
                Bloquear("ventana")
                setTimeout(function () {
                    $("#div_periodo").css("display", "block");
                    if ($("#cbo_mes").val() == 7) {

                        $("#sp_periodo").html("").html("DICIEMBRE " + ($("#optanho").val() -1) + " - " + "MAYO " + $("#optanho").val());
                    }
                    if ($("#cbo_mes").val() == 12) {

                        $("#sp_periodo").html("").html("JUNIO " + ($("#optanho").val()) + " - " + "NOVIEMBRE " + $("#optanho").val());
                    }


                  //  Lista_Datos_Cts();

                    Desbloquear("ventana")


                }, 1000)

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


    var fillBandeja = function () {

     

        var parms = {
            data: null,
            scrollCollapse: true,
            //  scrollX: true,
            paging: false,
            info: false,
            ordering: false,
            searching: false,
            columns: obj

        }

        oTable = iniciaTabla('tbl_cts', parms);
        $('#tbl_cts').removeAttr('style');
        $("#tbl_cts").css("border-collapse", "collapse")
    }

    var Lista_Datos_Grati = function () {






        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMGRAT.ashx?OPCION=0&p_CTLG_CODE=" + $("#cboEmpresa").val() + "&p_MES=" + $("#cbo_mes").val() + "&p_ANIO=" + $("#optanho").val(),
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



    var CreaColumnasTabla = function () {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMGRAT.ashx?OPCION=1",
            async: false,
            success: function (datos) {
                if (datos != "") {

                    $("#tr_conceptos").append(datos);


                }
                else {

                   
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });



    }



    var CreaObjDataTable = function () {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMGRAT.ashx?OPCION=2",
            async: false,
            success: function (datos) {
                if (datos != "") {

                     array = datos.split(",");

                    for (var i = 0;i< array.length ; i++){
                      
                        obj.push({

                            data: array[i].toString(),
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).css('text-align', 'center')

                                var cad = "rowData." + array[col - 17].toString();
                                
                                var total_promedio = 0;
                                if (parseFloat(rowData.DIAS) >= 30) {
                                     total_promedio = (parseFloat(eval(cad)) / (parseInt(parseInt(rowData.DIAS) / 30))).toFixed(2)
                                }
                                eval(cad + "=" + total_promedio.toString())
                                $(td).html(formatoMiles(total_promedio))

                            }
                        })
                       
                    }


                    obj.push({

                        data: "MONTO_PERCIBIR",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).css('text-align', 'center')

                            var cad1 = "rowData.GRAT_COMPLETA";
                            var cad2 = "rowData.BONI_EXTRA";
                            var monto = parseFloat(eval(cad1)) + parseFloat(eval(cad2))
                            eval("rowData.MONTO_PERCIBIR" + "=" + parseFloat(monto.toFixed(2)))
                            $(td).html(formatoMiles(parseFloat(monto.toFixed(2))))

                        }
                    })
                   


                }
                else {


                }
                Desbloquear("ventana");
              //  array = [];
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
            CreaColumnasTabla();
            CreaObjDataTable();
            fillBandeja();
            fillCboEmpresa();
            eventoComtroles();
            Lista_Datos_Grati();

        }
    };

}();




function Dias360(diaini, diafin) {


    var dateA = diaini;
    var dateB = diafin;

    var dayA = dateA.getDate();
    var dayB = dateB.getDate();


    if (UltimoDiaFebrero(dateA) && UltimoDiaFebrero(dateB))
        dayB = 30;


    if (dayA == 31 && UltimoDiaFebrero(dateA))
        dayA = 30;


    if (dayA == 30 && dayB == 31)
        dayB = 30;


    days = (dateB.getFullYear() - dateA.getFullYear()) * 360 +
        ((dateB.getMonth() +1 ) - (dateA.getMonth()+1))  * 30 + (dayB -dayA);
          

    return days;
}



function UltimoDiaFebrero (date ){

    lastDay = new Date(date.getFullYear(),2,-1);
    return date.getDate() == lastDay


}




function CantidadDias(Dini,Dfin) {

    var DateB = Dfin.getDate();
    var oDias;


  
    if (DateB == 31) {
        var resta_dia = Dfin - 1;
        Dfin.setTime(resta_dia);
    }


    if (Dias360(Dini, Dfin) == 29) {
        oDias =  29 + 1
    }

    //if (DateB == 31)
    //    dayB = DateB - 1;



    if (Dias360(Dini, Dfin) == 30) {
        oDias = Dias360(Dini, Dfin)
    } else {
        oDias = Dias360(Dini, Dfin) + 1
    }

    return oDias;
}







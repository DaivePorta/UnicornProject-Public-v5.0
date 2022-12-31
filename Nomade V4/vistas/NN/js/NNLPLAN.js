var NNLPLAN = function () {
    var plugins = function () {

        $('#cboEmpresa').select2()
        $("#cbo_tipo_planilla").select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {$(".datepicker-months thead").hide();$(".datepicker-months tbody tr td").css("width", "180px");}).keydown(function () { return false; }).datepicker("setDate", new Date());
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

    //var fillCboEstablecimiento = function (ctlg) {
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/cc/ajax/cclrfva.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: false,
    //        success: function (datos) {
    //            $('#cboEstablecimiento').empty();
    //            $('#cboEstablecimiento').append('<option></option>');
    //            if (datos != null) {
    //                for (var i = 0; i < datos.length; i++) {
    //                    $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
    //                }
    //                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
    //            } else {
    //                $('#cboEstablecimiento').select2('val', '');

    //            }
    //        },
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });

    //}

    var fillCboTipoPlanilla = function () {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcnep.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_tipo_planilla').empty();
                $('#cbo_tipo_planilla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_tipo_planilla').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#cbo_tipo_planilla").select2("val", "0002").change();
            },
            error: function (msg) {
                alertCustom("Error Listado Tipo Planilla")
            }
        });
    }


    function FitraPlanilla() {

        var data = new FormData();
        data.append('OPCION', "1");
        data.append('TIPO_PLANILLA', $("#cbo_tipo_planilla").val());
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

               if (datos.split("{|||||}")[1] == "" && datos.split("{|||||}")[2] == "" ) {
                   $("#btnGenerarLibro").attr("style", "display:none")
                   $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style","display:none")
               } 

               if (datos.split("{|||||}")[1] != "" && datos.split("{|||||}")[2] != "" && datos.split("{|||||}")[3] == "G"  ) {
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
        data.append('TIPO_PLANILLA', $("#cbo_tipo_planilla").val());
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



    var GeneraPlanilla = function (cad_cabecera,cad_detalle,anio,mes,ctlg_code) {

         

      

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
            if (vErrors(["cboEmpresa", "cbo_tipo_planilla", "optanho", "optmes"])) {
                FitraPlanilla();
            }
        });


        $('#btnGenerarLibro').on('click', function () {
            if (vErrors(["cboEmpresa", "cbo_tipo_planilla", "optanho", "optmes"])) {
                

                Verifica_Genracion_plani( $("#optanho").val(), ($("#optmes").datepicker("getDate").getMonth() + 1),  $("#cboEmpresa").val());
            }
        });


        $('#cboEmpresa').on('change', function () {
            $("#btnGenerarLibro").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
            $("#divPlanillas").html("");
        });
        

        $("#optmes").datepicker().on("changeDate", function (e) {
            $("#btnGenerarLibro").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
            $("#divPlanillas").html("");
        });

        $("#optanho").datepicker().on("changeDate", function (e) {
            $("#btnGenerarLibro").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
            $("#divPlanillas").html("");
        });


        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").on('click', function () {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").blur()
        });
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

               if (datos == "G" || datos =="0") {
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

    var getPlanilla = function (ctlg,anio,mes) {


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


    return {
        init: function () {
            plugins();
            fillCboTipoPlanilla();
            fillCboEmpresa();
            eventoComtroles();
            cargaInicial();
        }
    };

}();
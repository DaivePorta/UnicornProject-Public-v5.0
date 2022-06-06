var NNLCEPL = function () {


    var plugins = function () {

        $("#slcEmpresa").select2();
       
    }




    var fillBandejaPla = function () {

        var parms = {
            data: null,
            //ordering: false,
            //responsive: true,
            //iDisplayLength: -1,
            ////"sDom": "t",
            //sDom: 'T<"clear">lfrtip',
            "paging": false,
            //"scrollY": "280px",
            //"searching": false,
            "info": false,
            ordering: false,
            iDisplayLength: -1,
            //"order": [[1, 'desc'], [4, 'asc']],
            columns: [
                {
                    data: "DESC_PLANILLA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "USUA_ID",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }


                 },
                {
                    data: "FECHA_ACTV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }

                }
        

            ],
     

        }

        oTable = iniciaTabla('tblplanillas_cerradas', parms);




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


    var Lista_Planillas_Cerradas = function (ctlg_code) {
        Bloquear("ventana")
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMCEPL.ashx?OPCION=2&p_CTLG_CODE=" + ctlg_code ,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);


                }
                else {
                    //    alertCustom("Error listar periodos")
                    oTable.fnClearTable();

                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alertCustom("Error listar planillas")
                Desbloquear("ventana");
            }

        });

    }

    var eventos = function () {

        $('#btn_filtrar').on('click', function () {

            Bloquear("ventana")





            setTimeout(function () {

                Lista_Planillas_Cerradas($("#slcEmpresa").val());

            }, 1000);



        });



    }

    return {
        init: function () {
            plugins();
         
            fillCboEmpresa();
            fillBandejaPla();
            Lista_Planillas_Cerradas($("#slcEmpresa").val());
            eventos();
        }
    };

}();






var NNMCEPL = function () {


    var plugins = function () {

        $("#slcEmpresa").select2();
        $('#cbo_planilla').select2();
        // $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setStartDate', '-10y').keydown(function () { return false; });
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


    var fillCbo_Planilla = function (ctlg_code) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcepl.ashx?OPCION=0&p_CTLG_CODE=" + ctlg_code ,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_planilla').empty();
                $('#cbo_planilla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_planilla').append('<option   mes_num="' + datos[i].MES_NUM + '" anio="' + datos[i].ANIO + '"   mes="' + datos[i].MES + '"     value="' + datos[i].CODIGO + '">' + datos[i].DESC_PLANILLA + '</option>');
                    }

                    

                } 
                Desbloquear("ventana2")
                $('#cbo_planilla').select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error cargar planilla");
                Desbloquear("ventana2")
            }
        });
    }

    var eventos = function () {







        $('#btn_cerrar').on('click', function () {

            if (vErrors(["cbo_planilla"])) {

                $("#modal_pregunta").html("¿Esta Seguro de Cerrar el Período Tributario <b>" + $("#cbo_planilla option:selected").attr("mes") +" "+ $("#cbo_planilla option:selected").attr("anio") + "</b> ?, ya no podrá reabrirla")
                $("#ConfirmCierre").modal("show");


            }



        });


        $('#btn_aceptar').on('click', function () {

            Bloquear("ventana2")
            setTimeout(function () {

                Cerrar_Planilla();

            }, 2000);



        });





        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana2")
                setTimeout(function () {

                    fillCbo_Planilla($('#slcEmpresa').val())

                  
                    $("#btn_cerrar").attr("disabled", true);
                    emp_ant = $(this).val();

                }, 1000);

            } else { emp_ant = ""; }
        });


        var pla_ant = "";
        $('#cbo_planilla').on('change', function () {
            if (pla_ant != $(this).val()) {
           
                $("#btn_cerrar").attr("disabled", false);
               

            } else { pla_ant = ""; }
        });

    


    }



    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCbo_Planilla($('#slcEmpresa').val());
            eventos();
        }
    };

}();


var Cerrar_Planilla = function () {



    var data = new FormData();

    data.append("OPCION", "1");
    data.append("p_CTLG_CODE", $("#slcEmpresa").val());
    data.append("p_ANIO", $("#cbo_planilla option:selected").attr("anio"));
    data.append("p_MES", $("#cbo_planilla option:selected").attr("mes_num"));
    data.append("p_USUA_ID", $("#ctl00_txtus").val());


    $.ajax({
        url: "vistas/NN/ajax/NNMCEPL.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    })


.success(function (datos) {
    if (datos != null && datos != "") {


        switch (datos) {
            case "E":
                $("#msg_error").attr("style", "display:none")
                $("#msg_exito").attr("style", "display:none")
                noexitoCustom("Error al Cerrar Planilla!")
                break;
            case "Error":
                $("#msg_error").attr("style", "display:none")
                $("#msg_exito").attr("style", "display:none")
                noexitoCustom("Error al Cerrar Planilla!")
                break;
            case "OK":
                $("#msg_exito").attr("style", "display:block")
                $("#msg_error").attr("style", "display:none")
                $(".bloquear").attr("disabled", true)
                $("#btn_cerrar").remove();
                break;




        }

    } else { noexitoCustom("Error al Cerrar Planilla!") }

    Desbloquear("ventana2")

})
.error(function () {
    Desbloquear("ventana2");
    noexitoCustom("Error al Cerrar Planilla!")
})

}
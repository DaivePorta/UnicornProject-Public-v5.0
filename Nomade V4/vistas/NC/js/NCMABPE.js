var NCMABPE = function () {


    var plugins = function () {

        $("#slcEmpresa").select2();
        $('#cbo_periodo').select2();
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


    var fillCbo_Periodo = function (ctlg_code) {

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMABPE.ashx?OPCION=1&p_ctlg=" + ctlg_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                    }

                    $('#cbo_periodo').select2("val", "");

                } else {


                    infoCustom2("No hay periodos para reaperturar.")

                }
                Desbloquear("ventana2")

            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
                Desbloquear("ventana2")
            }
        });
    }

    var eventos = function () {







        $('#btn_abrir').on('click', function () {

            if (vErrors(["txt_fec_cierre"])) {

                $("#modal_pregunta").html("¿Esta Seguro de Reaperturar el Período Tributario <b>" + $("#cbo_periodo option:selected").text() + "</b> ?")
                $("#ConfirmCierre").modal("show");


            }



        });


        $('#btn_aceptar').on('click', function () {

            Bloquear("ventana2")
            setTimeout(function () {

                Grabar();

            }, 2000);



        });





        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana2")
                setTimeout(function () {

                    fillCbo_Periodo($('#slcEmpresa').val())

                    $("#txt_fec_cierre").attr("disabled", true);
                    $("#btn_abrir").attr("disabled", true);
                    $("#txt_fec_cierre").val("");
                    $("#txt_fec_declaracion").val("");
                    emp_ant = $(this).val();

                }, 1000);

            } else { emp_ant = ""; }
        });



        var per_ant = "";
        $('#cbo_periodo').on('change', function () {
            if (per_ant != $(this).val()) {
                //var date = new Date()
                get_Fecha_Declaracion($("#slcEmpresa").val(), $('#cbo_periodo').val().split("-")[0], $('#cbo_periodo').val().split("-")[1]);
                $("#txt_fec_cierre").attr("disabled", false);
                $("#btn_abrir").attr("disabled", false);
                $("#txt_fec_cierre").val("");
                $("#txt_fec_cierre").datepicker("setStartDate", "")
                $("#txt_fec_cierre").datepicker("setEndDate", "")
                var primerDia = new Date($('#cbo_periodo').val().split("-")[1], parseInt($('#cbo_periodo').val().split("-")[0]), 1)
                var ultimoDia = new Date($('#cbo_periodo').val().split("-")[1], parseInt($('#cbo_periodo').val().split("-")[0]) + 1, 0)
                $("#txt_fec_cierre").datepicker("setStartDate", primerDia)
                $("#txt_fec_cierre").datepicker("setEndDate", $("#txt_fec_declaracion").val().toString());






            } else { per_ant = ""; }
        });

    }

    var get_Fecha_Declaracion = function (oCtlg, oMes, oAnio) {
        Bloquear("ventana2");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCEPE.ashx?OPCION=1&p_mes=" + oMes + "&p_ctlg=" + oCtlg +
                                                                   "&p_anio=" + oAnio,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    $("#txt_fec_declaracion").val(datos[0].FECHA_DECLARACION);


                }
                else {

                    $("#txt_fec_declaracion").val("");

                }
                Desbloquear("ventana2");

            },
            error: function (msg) {
                noexitoCustom("Error fecha declaracion")
                Desbloquear("ventana2");
            }

        });

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCbo_Periodo($('#slcEmpresa').val());
            eventos();
        }
    };

}();


var Grabar = function () {




    var data = new FormData();

    data.append("OPCION", "2");
    data.append("p_ctlg", $("#slcEmpresa").val());
    data.append("p_anio", $('#cbo_periodo').val().split("-")[1]);
    data.append("p_mes", $('#cbo_periodo').val().split("-")[0]);
    data.append("p_fec_reapertura", $("#txt_fec_cierre").val());
    data.append("p_usua_id", $("#ctl00_txtus").val());

    $.ajax({
        url: "vistas/NC/ajax/NCMABPE.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    })


.success(function (datos) {
    if (datos != null && datos != "") {

        //alert(datos);
        switch (datos) {
            case "E":
                $("#msg_error").attr("style", "display:none")
                $("#msg_exito").attr("style", "display:none")
                $("#msg_error2").attr("style", "display:none")
                noexitoCustom("Error al Registrar E!")
                break;
            case "Error":
                $("#msg_error").attr("style", "display:none")
                $("#msg_exito").attr("style", "display:none")
                $("#msg_error2").attr("style", "display:none")
                noexitoCustom("Error al Registrar ERROR!")
                break;
            case "I":
                $("#msg_error").attr("style", "display:block")
                $("#msg_error2").attr("style", "display:none")
                $("#msg_exito").attr("style", "display:none")
                break;
            case "N":
                $("#msg_error2").attr("style", "display:block")
                $("#msg_error").attr("style", "display:none")
                $("#msg_exito").attr("style", "display:none")
                break;
            case "PC":
                $("#msg_error2").attr("style", "display:none")
                $("#msg_error").attr("style", "display:none")
                infoCustom("El periodo tiene percepciones cobradas.");
                break;
            case "OK":
                $("#msg_exito").attr("style", "display:block")
                $("#msg_error2").attr("style", "display:none")
                $("#msg_error").attr("style", "display:none")
                $(".bloquear").attr("disabled", true)
                $("#btn_abrir").remove();
                break;                

        }












    } else { noexitoCustom("Error al Registrar!") }

    Desbloquear("ventana2")

})
.error(function () {
    Desbloquear("ventana2");
    noexitoCustom("Error al Registrar!")
})



}
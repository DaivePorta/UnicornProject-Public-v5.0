var NNMRPRO = function () {

    var plugins = function () {



        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
        $('#txt_fecha').datepicker();

    }







    var eventoControles = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana");
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 1000);

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        $('#btn_filtrar').on('click', function () {
        
            Bloquear("ventana");

            if (vErrors(["slcEmpresa", "slcSucural", "txt_fecha"])) {
                setTimeout(function () {
                    Extorna_Marcaciones($('#slcEmpresa').val(), $('#slcSucural').val(), $('#txt_fecha').val());
                }, 1000);
                var a;
            }
              

        });



    }

    var Extorna_Marcaciones = function (ctlg,scsl,fecha) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMREFE.ashx?OPCION=4&p_FECHA=" + fecha + "&p_CTLG_CODE=" + ctlg + "&p_SCSL_CODE=" + scsl,
            async: false,
            success: function (datos) {
     


                if (datos == "OK" || datos == "1" && (!isEmpty(datos))) {
                    Crear_Marcaciones(fecha);
                    //Desbloquear("ventana");
                } else {
                    if (isEmpty(datos) || datos == "E") {
                        alertCustom("Error al reprocesar marcaciones");
                        Desbloquear("ventana");
                    }
                    else {
                        if (datos == "2") {
                            alertCustom("La fecha seleccionada esta fuera del periodo actual, por favor seleccionar una fecha correcta.");
                            Desbloquear("ventana");
                        }
                    }
                }

              

            },
            error: function (msg) {
                alertCustom("Error al reprocesar marcaciones");
                Desbloquear("ventana");
            }

        });

    }


    var Crear_Marcaciones = function (fecha) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmrefe.ashx?OPCION=2&p_FECHA=" + fecha + "&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
         

                if (datos == "OK") {

                    Evalua_Marcaciones(fecha);


                } else {
                    if (datos != "E" && datos != "OK") {

                        $("#msg").attr("class", "alert alert-block alert-error")
                        datos = "<strong>Advertencia!&nbsp;</strong>" + datos;
                        $("#msg").html(datos);
                        $("#msg").slideDown();
                        Desbloquear("ventana");

                    } else {
                        if (isEmpty(datos) || datos == "E") {
                            alertCustom("Error crear marcaciones");
                            Desbloquear("ventana");
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom("Error crear marcaciones");
                Desbloquear("ventana");
            }

        });

    }


    var Evalua_Marcaciones = function (fecha) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmrefe.ashx?OPCION=3&p_FECHA=" + fecha + "&p_CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "E") {

                  CalculaAsistencias()                                        
                }
                else {

                    alertCustom("Error evaluar marcaciones");

                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alertCustom("Error evaluar marcaciones");
                Desbloquear("ventana");
            }

        });

    }




    var CalculaAsistencias = function () {
  
        Bloquear("ventana");
        //setTimeout(function () {


            $.ajax({
                type: "post",
                url: "vistas/nn/ajax/nnmreho.ashx?OPCION=C&p_AUTOMATICO=N&CTLG_CODE=" + $("#slcEmpresa").val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos == "OK") {
              
                        if (EjecutaJobFaltas() == "OK") {
                            $("#msg").attr("class", "alert alert-block alert-success")
                            $("#msg").html("<strong>Exito!</strong>&nbsp;Las marcaciones del biometrico fueron reprocesadas para la fecha&nbsp;<strong>[&nbsp;" + $('#txt_fecha').val() + "&nbsp;]</strong>");
                            $("#msg").slideDown();
                        }
                        else {
                            alertCustom("Error al ejecutar Job que inserta faltas");
                        }
                        
                    }
                    else {
                        alertCustom("Error al Calcular Asistencias");
                    }

                    Desbloquear("ventana")
                },
                error: function (msg) {
                    alert(msg);
                    Desbloquear("ventana")
                }
            });

        //}, 1000);
    }


    var EjecutaJobFaltas = function () {
        let msjSalida = "";
        Bloquear("ventana");
       // setTimeout(function () {


            $.ajax({
                type: "post",
                url: "vistas/nn/ajax/nnmreho.ashx?OPCION=JOBFALTA&FECHA=" + $('#txt_fecha').val() + "&CTLG_CODE=" + $("#slcEmpresa").val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos == "OK") {
                        exito()
                        msjSalida = "OK";
                    }

                    Desbloquear("ventana")
                },
                error: function (msg) {
                    alert(msg);
                    Desbloquear("ventana")
                }
            });

       // }, 1000);
        return msjSalida;
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
                $('#slcSucural').append('<option></option>');
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





    return {
        init: function () {
            plugins();

            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            eventoControles();
           


        }
    };

}();


function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
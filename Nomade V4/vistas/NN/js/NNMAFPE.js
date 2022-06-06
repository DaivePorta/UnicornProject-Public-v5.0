var NNMAFPE = function () {


    var plugins = function () {

        $("#slcEmpresa").select2();
        $('#cbo_planilla').select2();
       
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
            url: "vistas/nn/ajax/NNMAFPE.ashx?OPCION=0&p_CTLG_CODE=" + ctlg_code + "&p_TIPO=5" ,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_planilla').empty();
                $('#cbo_planilla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_planilla').append('<option  anio="' + datos[i].ANIO + '"  mes="' + datos[i].MES + '" value="' + datos[i].CODIGO_PLANILLA_REF + '">' + datos[i].DESC_PLANILLA + '</option>');
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







        $('#btn_generar').on('click', function () {
            
            $('#btn_generar').blur();



            if (vErrors(["cbo_planilla"])) {

                Bloquear("ventana2")

                setTimeout(function () {

                  
                    Generar();

                }, 1000)

            }



        });


        $('#btn_descarga').on('click', function () {

            $('#btn_descarga').blur();

            var x = new Array($("#tabla").text().split("\\r\\n").join("\r\n"));
            

            var archivo = new Blob(x, { type: 'text/plain' });
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(archivo);
            a.download = "afpNet" + ".csv";
            a.click();


        });



        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana2")
                setTimeout(function () {

                    fillCbo_Planilla($('#slcEmpresa').val())


                    $("#btn_generar").attr("disabled", true);
                    $("#btn_descarga").css("display", "none")
                    emp_ant = $(this).val();

                }, 1000);

            } else { emp_ant = ""; }
        });


        var pla_ant = "";
        $('#cbo_planilla').on('change', function () {
            if (pla_ant != $(this).val()) {

                $("#btn_generar").attr("disabled", false);


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


var Generar = function () {



    var data = new FormData();

    data.append("OPCION", "1");
    data.append("p_COD_PLANILLA", $("#cbo_planilla").val());
    data.append("p_CTLG_CODE", $("#slcEmpresa").val());
    data.append("p_ANIO", $('#cbo_planilla option:selected').attr("anio"));
    data.append("p_MES", $('#cbo_planilla option:selected').attr("mes"));
    
    $.ajax({
        url: "vistas/NN/ajax/NNMAFPE.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    })


.success(function (datos) {
    if ( datos != "") {

       
        if (datos == "E") {noexitoCustom("Error al generar!") }
        
        if (datos.length > 0) {
            exito();
            $("#tabla").html("").html(datos);
            $("#btn_descarga").css("display","block")
          
        }
      


    } else { noexitoCustom("Error al generar Excel!") }

    Desbloquear("ventana2")

})
.error(function () {
    Desbloquear("ventana2");
    noexitoCustom("Error al generar Excel!")
})

}
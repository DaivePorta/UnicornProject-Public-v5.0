let oTablaPeriodo = [];
var after = false;
var NCMABRP = function () {
    

    var plugins = function () {
        $(".combo").select2();       
    }


    var fnGetPeriodosAbrir = function () {

        let codEmpresa = $("#slcEmpresa").val()

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMABRP.ASHX?OPCION=LPA&p_ctlg=" + codEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (datos != null && datos.length > 0) {
                   
                    oTablaPeriodo = datos;

                    if (!isEmpty(oTablaPeriodo)) {
                        var arrayAnios = [... new Set(oTablaPeriodo.map(x => x.ANIO))]
                        for (var i = 0; i < arrayAnios.length; i++) {
                            $('#cboAnio').append('<option value="' + arrayAnios[i] + '">' + arrayAnios[i] + '</option>');
                        }

                        $('#cboAnio').val(arrayAnios[0]).change();
                                     
                    }

                    $('#btn_abrir').attr("disabled", false);

                }
                else {
                    oTablaPeriodo = [];
                    if (!after) {
                        infoCustom("No se encontraron periodos disponibles para aperturar!");
                    }                    
                    $('#cboMes').empty().append('<option></option>').val('').change();
                    $('#cboAnio').empty().append('<option></option>').val('').change();
                    $('#btn_abrir').attr("disabled", true);
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de cheques.");
                oTableCheques.fnClearTable();
            }
        });

    }


    let getMesPeriodo = function (p_anio) {
        $('#cboMes').empty();
        $('#cboMes').append('<option></option>');

        var oMeses = oTablaPeriodo.filter(x => x.ANIO == p_anio);

        if (oMeses.length > 0) {
            for (var i = 0; i < oMeses.length; i++) {
                $('#cboMes').append('<option value="' + oMeses[i].MES + '">' + oMeses[i].NOMBRE_MES + '</option>');
            }

            $('#cboMes').val(oMeses[0].MES).change();   
        } else {
            $('#btn_abrir').attr("disabled", true);
        }       

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




    var eventos = function () {

        $('#btn_abrir').on('click', function () {

            if (vErrors(["slcEmpresa"])) {
                $("#modal_pregunta").html("¿Esta Seguro de Abrir el Período Tributario <b>" + $('#cboMes :selected').text() +"-"+$("#cboAnio").val()+ "</b> ?")
                $("#ConfirmCierre").modal("show");
            }

        });


        $('#btn_aceptar').on('click', function () {
            Bloquear("ventana2")
            setTimeout(function () {

                Grabar();

            }, 2000);

        });


        $('#cboAnio').on('change', function () {
            getMesPeriodo($(this).val());
        });


        $('#slcEmpresa').on('change', function () {
            fnGetPeriodosAbrir();
        });



    }


    var Cargainicial = function () {
       
    }


    var Grabar = function () {


        Bloquear("ventana2")

        var data = new FormData();

        data.append("OPCION", "2");
        data.append("p_ctlg", $("#slcEmpresa").val());
        data.append("p_Mes", $("#cboMes").val());
        data.append("p_Anio", $("#cboAnio").val());


        $.ajax({
            url: "vistas/NC/ajax/NCMABRP.ASHX",
            type: "POST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        })


            .success(function (datos) {
                if (datos != null && datos != "") {


                    switch (datos) {

                        case "Error":
                            $("#msg_body").removeClass().addClass("alert alert-error");
                            $("#msg_body").html("").html("<strong>Error!</strong> El periodo no se abrió.")
                            $("#msg").css("display", "block")
                            break;
                        case "PERI_ABIERTO":
                            $("#msg_body").removeClass().addClass("alert alert-error");
                            $("#msg_body").html("").html("<strong>Alerta!</strong> El periodo ya se encuentra abierto.")
                            $("#msg").css("display", "block")
                            break;
                        case "2_PERI_ABIERTOS":
                            $("#msg_body").removeClass().addClass("alert alert-error");
                            $("#msg_body").html("").html("<strong>Alerta!</strong> Existen 2 periodos abiertos por lo cual no se puede abrir el actual.")
                            $("#msg").css("display", "block")
                            break;
                        case "NO_EXIS_PERIO":
                            $("#msg_body").removeClass().addClass("alert alert-error");
                            $("#msg_body").html("").html("<strong>Alerta!</strong> No existen periodos creados para el catalogo selccionado, por favor crear los periodos para el catalogo en la pantalla NFMPERI")
                            $("#msg").css("display", "block")
                            break;
                        case "OK":
                            let periodo = $("#cboMes :selected").text() + "-" + $("#cboAnio").val();
                            $("#msg_body").removeClass().addClass("alert alert-success");
                            $("#msg_body").html("").html("<strong>Exito!</strong> El periodo <strong>" + periodo +"</strong> se abrio correctamente.")
                            $("#msg").css("display", "block")
                            //$(".bloquear").attr("disabled", true)
                            //$("#btn_abrir").remove();
                            after = true;
                            fnGetPeriodosAbrir();
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

    return {
        init: function () {
            plugins();
            fillCboEmpresa();       
            eventos();
            fnGetPeriodosAbrir();
            Cargainicial();
        }
    };

}();



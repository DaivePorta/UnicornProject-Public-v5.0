var NOCONFO = function () {

    var plugins = function () {

        //$('#cboEmpresas').select2();

    }



    var EventoControles = function () {



        $('#idRegis').on('click', function ()
        {
            modificar_correlativo();
           
        });

        $('#btnServicio').on('click', function () {
            modificar_correlativoServicio();

        });
    }


    function modificar_correlativoServicio() {
        var data = new FormData;


        if ($("#rbSMes").is(":checked")) {
            data.append('P_TIPO', 'M');
        }

        if ($("#rbSano").is(":checked")) {
            data.append('P_TIPO', 'A');
        }

        data.append('p_nemonico', $('#txtServicio').val());




        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=4" + "&TIPO_UPDATE="+"2",
            contentType: false,
            data: data,
            processData: false,
            cache: false,


            success: function (datos) {

                if (datos == "OK") {
                    exito();
                }
                else {
                    noexito();
                }


            },
            error: function (msg) {
                alert(msg);
            }
        });

    }


    function modificar_correlativo()
    {
        var data = new FormData;


        if ($("#rbMes").is(":checked"))
        {
            data.append('P_TIPO', 'M');
        }
            
        if ($("#rbAno").is(":checked")) {
            data.append('P_TIPO', 'A');
        }

        data.append('p_nemonico', $('#txtNemonico').val());


            

        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=4" + "&TIPO_UPDATE="+"1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,


            success: function (datos) {

                if (datos== "OK") {
                    exito();
                }
                else {
                    noexito();
                }


            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var cargaInicial = function () {

        mostrarConfi();
        mostrarConfiServicio();

    }

    function mostrarConfi() {


        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=3" + "&TIPO_CONF=" +"1",
            contenttype: "application/json;",
            datatype: "json",
            processData: false,
            cache: false,

            success: function (datos) {

                if (datos[0].SUCCESS == "OK") {

                    if (datos[0].TIPO == "A") {

                        $("#rbAno").attr("checked", true).parent().addClass("checked");
                    }
                    else {
                        $("#rbMes").attr("checked", true).parent().addClass("checked");
                    }

                    $('#txtNemonico').val(datos[0].NEMONICO);




                }
                else {
                    noexito();
                }


            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    function mostrarConfiServicio()
    {

        
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=3" + "&TIPO_CONF=" + "3",
            contenttype: "application/json;",
            datatype: "json",
            processData: false,
            cache: false,

            success: function (datos) {

                if (datos[0].SUCCESS == "OK") {
                    
                    if (datos[0].TIPO == "A") {

                        $("#rbSano").attr("checked", true).parent().addClass("checked");
                    }
                    else {
                        $("#rbSMes").attr("checked", true).parent().addClass("checked");
                    }

                    $('#txtServicio').val(datos[0].NEMONICO);

                    
                    

                }
                else {
                    noexito();
                }


            },
            error: function (msg) {
                alert(msg);
            }
        });

    }




    return {
        init: function () {
            plugins();
            EventoControles();
            cargaInicial();

        }
    };

}();

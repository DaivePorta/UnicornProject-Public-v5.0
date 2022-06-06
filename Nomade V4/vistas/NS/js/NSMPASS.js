function verficaSintactiCaclave() {
    var error=false;
    var flag = true;
    if ($('#txtpassword1').attr("value") != $('#txtpassword2').attr("value")) {
        alertCustom("Las contraseñas nuevas no coinciden!");
        error |= true;
    }
    if ($('#txtpassword0').attr("value") == $('#txtpassword1').attr("value")) {
        alertCustom("La contraseña nueva no puede ser igual a la actual!");
        error |= true;
    }
    for (var i = 1; i < 3; i++) {

        $('#txtpassword' + i).focus();
        flag &= $('#txtpassword' + i).hasClass("validado");
        if (!$('#txtpassword' + i).hasClass("validado")) {
            $('#txtpassword' + i).parent().parent().attr("class", "control-group error");
            $('#txtpassword' + i).on("keyup", function () { $(this).parent().parent().removeClass("error"); });
        }

        $('#txtpassword' + i).blur();
    }

    if (!flag) {//hay error

        alertCustom("La contraseña debe cumplir los requerimientos especificados!")
    }
    error |= !flag;
    return !error;
}

var NSLPASS = function () {
    var datatable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                { data: "USUARIO"},
                { data: "NOMBRE" },
                {
                    data: { _: "FECHA_ACTV", sort: "ORDEN_FECHA" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }

       

        var table = iniciaTabla("tblBandeja", parms);
        $('#tblBandeja').removeAttr('style');


      
            $('#tblBandeja tbody').on('click', 'tr', function () {
        
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');

                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');

                    var pos = table.fnGetPosition(this);
                    var row = table.fnGetData(pos);
                    var code = row.USUARIO;

                    window.location.href = '?f=nsmpass&codigo=' + code;

                }



            });
        

            $('#tblBandeja tbody').on('click', 'a', function () {
                $(this).parent().parent().addClass('selected');
                var pos = table.api(true).row($(this).parent().parent()).index();
                var row = table.fnGetData(pos);
                var cod = row.USUARIO;

            Bloquear("ventana");
            $.post("vistas/NS/ajax/NSMPASS.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        table.fnGetData(pos).ESTADO = res;
                        refrescaTabla(table);


                        exito();
             

                    } else {
                        noexito();
                    }
                });


        });


    }

    return {
        init: function () {


            datatable();
        }
    };

}();


var NSMPASS = function () {

    var cargaInicial = function () {

        verificarClave();


        if (ObtenerQueryString("codigo") != undefined) {
            $("#txtusuario").val(ObtenerQueryString("codigo"));

        } else {
            $("#txtusuario").val($("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario").val());
            $("#edit").hide();
        }



        $("#chkactivo").click(function () {
           
            for (var i = 0; i < 3; i++) {

                var id = $('#txtpassword' + i).attr("id");
                var value = $('#txtpassword' + i).attr("value");

                if (i == 0) { html = "<input class=\"span12 \" placeholder=\"Min. 8 Caracteres\" type=\"text\" id=\"" + id + "\" value=\"" + value + "\">";  }
                    if ($(this).is(':checked')) {
                                          
                        html = "<input class=\"span12 contrasena\" placeholder=\"Min. 8 Caracteres\" type=\"text\" id=\"" + id + "\" value=\"" + value + "\">";
                        $('#txtpassword' + i).after(html).remove();
                        $('#txtpassword' + i).parent().parent().removeClass("error");

                    } else {
                         html = "<input class=\"span12 contrasena\" placeholder=\"Min. 8 Caracteres\"type=\"password\" id=\"" + id + "\" value=\"" + value + "\">";
                        $('#txtpassword' + i).after(html).remove();
                        $('#txtpassword' + i).parent().parent().removeClass("error");

                    }
            }
            verificarClave();

        });


        $("#grabar").click(function () {

            p_user = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario").val();
            p_pass = $("#txtpassword0").val();
            p_pasn = $("#txtpassword1").val();


            if (vErrors(["txtpassword0", "txtpassword1", "txtpassword2"])&&verficaSintactiCaclave()) {

                Bloquear("ventana");
                $.post("vistas/NS/ajax/NSMPASS.ASHX", {
             
                    user: p_user,
                    pass: p_pass,
                    pasn: p_pasn,
              
                },
                    function (res) {
                        Desbloquear("ventana");
                        if (res == "1") {
                            exito();
                                                             
                        } else {

                            alertCustom("La contraseña actual no es la correcta! Por favor vuelva a intentarlo.")
                        }
                    });
            }
                                 
        });


    }



    return {
        init: function () {
           
           
            cargaInicial();
        }
    };

}();

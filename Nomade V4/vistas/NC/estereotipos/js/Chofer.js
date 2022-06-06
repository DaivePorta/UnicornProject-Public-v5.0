
/*controles de botones*/
function CrearChofer() {

    var p_acti = $('#chkactivochof').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_nlic = $('#nlicchof').val();
    var p_fect = $('#txtfechatchof').val();
    var p_feci = $('#txtfechaichof').val();
    var p_feex = $('#txtfechaechof').val();
    var p_fere = $('#txtfecharchof').val();
    var p_empr = $('#slcEmpresachof').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_imga = $("#anverso")[0].files[0];
    var p_imgr = $("#reverso")[0].files[0];
    var p_ruimr = $("#imgreverso").attr("src");
    var p_ruima = $("#imganverso").attr("src");
  
    if (vErrors(["nlicchof", "txtfechaichof", "txtfechaechof", "txtfecharchof", "slcEmpresachof"])) {
   
        Bloquear("ventana");
   
    var data = new FormData();
  
    data.append('flag', 1);
    data.append('imga', p_imga);
    data.append('imgr', p_imgr);
    data.append('empr', p_empr);
    data.append('pidm', p_pidm);
    data.append('nrol', p_nlic);
    data.append('feex', p_feex);
    data.append('fere', p_fere);
    data.append('fein', p_feci);
    data.append('fefi', p_fect);
    data.append('acti',p_acti);
     data.append('user', p_user);
     data.append('ruimr', p_ruimr);
     data.append('ruima', p_ruima);

        var url = 'vistas/NC/estereotipos/ajax/Chofer.ASHX';

        $.ajax({

            url: url,
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success:

                function (res) {
                    Desbloquear("ventana");
                    if (res != "") {
                        exito();
                       
                        $("#imganverso").attr("codigo", res.split("|")[0]);
                        $("#imgreverso").attr("codigo", res.split("|")[1]);

                        $("#grabarchof").html("<i class='icon-pencil'></i> Modificar Datos");
                        $("#grabarchof").attr("href", "javascript:ActualizarChofer();");
                    } else {
                        noexito();
                    }
                    
                        
                    
               }
        });
    }

}

function ActualizarChofer() {

    var p_acti = $('#chkactivochof').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_nlic = $('#nlicchof').val();
    var p_fect = $('#txtfechatchof').val();
    var p_feci = $('#txtfechaichof').val();
    var p_feex = $('#txtfechaechof').val();
    var p_fere = $('#txtfecharchof').val();
    var p_empr = $('#slcEmpresachof').val();
    var p_user = $('#ctl00_lblusuario').html();
   
    var p_imga = $("#anverso")[0].files[0];
    var p_imgr = $("#reverso")[0].files[0];

    var p_coima = $("#imganverso").attr("codigo");
    var p_ruima = $("#imganverso").attr("src");
    var p_coimr = $("#imgreverso").attr("codigo");
    var p_ruimr = $("#imgreverso").attr("src");

    if (vErrors(["nlicchof", "txtfechaichof", "txtfechaechof", "txtfecharchof", "slcEmpresachof"])) {
        Bloquear("ventana");
        var data = new FormData();
  
        data.append('flag', 2);
        data.append('imga', p_imga);
        data.append('imgr', p_imgr);
        data.append('empr', p_empr);
        data.append('pidm', p_pidm);
        data.append('nrol', p_nlic);
        data.append('feex', p_feex);
        data.append('fere', p_fere);
        data.append('fein', p_feci);
        data.append('fefi', p_fect);
        data.append('acti',p_acti);
        data.append('user', p_user);
        data.append('coima', p_coima);
        data.append('coimr', p_coimr);
        data.append('ruima', p_ruima);
        data.append('ruimr', p_ruimr);


        var url = 'vistas/NC/estereotipos/ajax/Chofer.ASHX';
        $.ajax({

            url: url,
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success:
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                } else {
                    noexito();
                }
            }
        });
    }

}



function cargarChofer(empresa) {

    Bloquear("ventana");
    $.ajax({
        type: "GET",
        url: "vistas/NC/estereotipos/ajax/Chofer.ASHX",
        data: {
            flag: 3,
            pidm: $("#hfPPBIDEN_PIDM").val(),
            empr: empresa
        },
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {


            $("#grabarchof").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabarchof").attr("href", "javascript:ActualizarChofer();");

            $("#imganverso").attr("src", datos[0].RUTA_ANVERSO+"?"+Math.random());
            $("#imganverso").attr("codigo",datos[0].COD_ANVERSO);
            $("#imgreverso").attr("src", datos[0].RUTA_REVERSO + "?" + Math.random());
            $("#imgreverso").attr("codigo", datos[0].COD_REVERSO);
            $("#imganverso").css("opacity", 1);
            $("#imgreverso").css("opacity", 1);
            $('#nlicchof').val(datos[0].LICENCIA);
            $('#txtfechatchof').val(datos[0].FECHA_FIN);
            $('#txtfechaichof').val(datos[0].FECHA_INICIO);
            $('#txtfechaechof').val(datos[0].EXPEDICION);
            $('#txtfecharchof').val(datos[0].RENOVACION);
        
            if (datos[0].ESTADO == "ACTIVO") {

                $('#uniform-chkactivochof span').removeClass().addClass("checked");
                $('#chkactivochof').attr('checked', true);
                $('#txtfechatchof').attr("disabled", true);
            } else {

                $('#uniform-chkactivochof span').removeClass();
                $('#chkactivochof').attr('checked', false);
                $('#txtfechatchof').attr("disabled", false);
            }

        },
        error: function(){}
    });


     
}


function recargachofer() {

    $("#chofer").load('../../vistas/NC/estereotipos/Chofer.html', function (html) {
        CHOFER.init();
    });

}





/*fin de controles de botones*/




var CHOFER = function () {

    var cargainicial = function () {
        
 

        inputFile("reverso", "imgreverso", "../../recursos/img/500x300.gif");
        inputFile("anverso", "imganverso", "../../recursos/img/500x300.gif");

        $('#chkactivochof').on('change', function () {
            if ($("#chkactivochof").is(':checked')) {

                $('#txtfechatchof').attr("disabled", true);
                $('#txtfechatchof').val('');
            } else {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                today = dd + '/' + mm + '/' + yyyy;
                $('#txtfechatchof').val(today);
                $('#txtfechatchof').attr("disabled", false);
            }
        });

        $.ajax({
            async: false,
            type: "POST",
            url: "vistas/NC/estereotipos/ajax/Chofer.ASHX?flag=" + 4 + "&usua=" + $("#ctl00_txtus").val(),
            
            success: function (res) {

                $("#controlempresachof").html(res);
                $("#slcEmpresachof option[value=0]").remove();
                $("#slcEmpresachof").select2({
                    placeholder: "EMPRESA",
                    allowclear: true

                });
               $("#slcEmpresachof").select2("val", $("#ctl00_hddctlg").val());

                $("#slcEmpresachof").change(function (event, empresa) {
                    $('#txtfechatchof').attr("disabled", true);
                    if (empresa == null) {
                        empresa = $('#slcEmpresachof').val();
                        
                        $("#imganverso").css("opacity",0.3);
                      
                        $("#imgreverso").css("opacity", 0.3);
                 
                       // $('#nlicchof').val("");
                        $('#txtfechatchof').val("");
                        $('#txtfechaichof').val("");
                       // $('#txtfechaechof').val("");
                       // $('#txtfecharchof').val("");


                        $("#grabarchof").html("<i class='icon-pencil'></i> Grabar Datos");
                        $("#grabarchof").attr("href", "javascript:CrearChofer();");
                    } else { $('#slcEmpresachof').select2("val", empresa) }

                    if ($("#hfPPBIDEN_PIDM").val() != "")
                    { cargarChofer(empresa); }
                });
            }
        });

        if (ObtenerQueryString("empr") != undefined) {
            $("#slcEmpresachof").trigger("change", ObtenerQueryString("empr"));
        }
    }


    var plugins = function () {

        aMayuscula(":input");

        inifechas("txtfechaichof", "txtfechatchof");

        $('#txtfecharchof').datepicker();
        $('#txtfecharchof').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txtfechaechof').datepicker();
        $('#txtfechaechof').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

    }

    return {
        init: function () {
            cargainicial();
            plugins();
        }
    };


}();
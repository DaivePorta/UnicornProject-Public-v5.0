function ActualizarAfp() {
    var p_acti = $('#chkactivoafp').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cafp = $('#slcafp').val();
    var p_fect = $('#txtfechafafp').val();
    var p_feci = $('#txtfechaiafp').val();

    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["slcafp", "txtfechaiafp"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Afp.ASHX", {
            flag: 2,
            pidm: p_pidm,
            codigo: p_cafp,
            fein: p_feci,
            user: p_user,
            acti: p_acti,
            fefi: p_fect
      
        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $("#grabarafp").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarafp").attr("href", "javascript:ActualizarAfp();");
                } else {
                    noexito();
                }
            });
    }
}


function CrearAfp() {

    var p_acti = $('#chkactivoafp').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cafp = $('#slcafp').val();
    var p_fect = $('#txtfechafafp').val();
    var p_feci = $('#txtfechaiafp').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["slcafp", "txtfechaiafp"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Afp.ASHX", {
            flag: 1,
            pidm: p_pidm,
            codigo: p_cafp,
            fein: p_feci,
            user: p_user,
            acti: p_acti,
            fefi: p_fect
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabarafp").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarafp").attr("href", "javascript:ActualizarAfp();");
                } else {
                    noexito();
                }
            });
    }
}




var AFP = function () {

    var cargainicial = function () {

        $('#chkactivoafp').on('change', function () {
            if ($("#chkactivoafp").is(':checked')) {

                $('#txtfechafafp').attr("disabled", true);
                $('#txtfechafafp').val('');
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
                $('#txtfechafafp').val(today);
                $('#txtfechafafp').attr("disabled", false);
            }
        });


        $.post("vistas/NC/estereotipos/ajax/Afp.ASHX", { flag: 4, usua: $("#ctl00_txtus").val() },
            function (res) {
                $("#controlempresaafp").html(res);
            
                $("#slcEmpresaafp").select2({
                    placeholder: "EMPRESA",
                    allowclear: true

                });

            });
        $.post("vistas/NC/estereotipos/ajax/Afp.ASHX", { flag: 5 },
            function (res) {
                if (res != "error") {
                    $("#controlafp").html(res);

                    $("#slcafp").select2({
                        placeholder: "AFP",
                        allowclear: true

                    });

                    $("#slcafp").change(function () {

                        $("#slcafp").val($("#slcafp option[value=" + $("#slcafp").val() + "]").attr("codsunat"));

                    });
                }
            });

    }


    var plugins = function () {

        aMayuscula(":input");
        inifechas("txtfechaiafp", "txtfechafafp");


    }


    return {
        init: function () {
            cargainicial();
            plugins();
        }
    };


}();
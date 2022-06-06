
var EPS = function () {

    var cargainicial = function () {

        $('#chkactivoeps').on('change', function () {
            if ($("#chkactivoeps").is(':checked')) {

                $('#txtfechafeps').attr("disabled", true);
                $('#txtfechafeps').val('');
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
                $('#txtfechafeps').val(today);
                $('#txtfechafeps').attr("disabled", false);
            }
        });


        $.post("vistas/NC/estereotipos/ajax/Eps.ASHX", { flag: 4, usua: $("#ctl00_txtus").val() },
            function (res) {
                $("#controlempresaeps").html(res);
                
                $("#slcEmpresaeps").select2({
                    placeholder: "EMPRESA",
                    allowclear: true

                });

            });

        $.post("vistas/NC/estereotipos/ajax/Eps.ASHX", { flag: 5 },
           function (res) {
               $("#controleps").html(res);

               $("#slceps").select2({
                   placeholder: "EPS",
                   allowclear: true

               });

           });


    }


    var plugins = function () {

        aMayuscula(":input");
        inifechas("txtfechaieps", "txtfechafeps");

    }


    return {
        init: function () {
            cargainicial();
            plugins();
        }
    };


}();
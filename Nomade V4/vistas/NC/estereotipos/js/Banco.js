function ActualizarBanco() {
    var p_acti = $('#chkactivobanc').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cate = $('#slcTipobanc').val();
    var p_fect = $('#txtfechatbanc').val();
    var p_feci = $('#txtfechaibanc').val();
    var p_empr = $('#slcEmpresabanc').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["slcTipobanc", "txtfechaibanc", "slcEmpresabanc"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Banco.ASHX", { flag: 2, pidm: p_pidm, cate: p_cate, feci: p_feci, user: p_user, acti: p_acti, fect: p_fect, empr: p_empr },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabarbanc").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarbanc").attr("href", "javascript:ActualizarBanco();");
                } else {
                    noexito();
                }
            });
    }
}


function CrearBanco() {

    var p_acti = $('#chkactivobanc').is(':checked') ? 'A' : 'I';
    var p_pidm = $("#hfPPBIDEN_PIDM").val();
    var p_cate = $('#slcTipobanc').val();
    var p_fect = $('#txtfechatbanc').val();
    var p_feci = $('#txtfechaibanc').val();
    var p_empr = $('#slcEmpresabanc').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["slcTipobanc", "txtfechaibanc", "slcEmpresabanc"])) {
        Bloquear("ventana");
        $.post("vistas/NC/estereotipos/ajax/Banco.ASHX", { flag: 1, pidm: p_pidm, cate: p_cate, feci: p_feci, user: p_user, acti: p_acti, fect: p_fect, empr: p_empr },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabarbanc").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabarbanc").attr("href", "javascript:ActualizarBanco();");
                } else {
                    noexito();
                }
            });
    }
}












var BANCO = function () {
    var datatable = function () {
       // $('#tblprodbanc').DataTable().fnDestroy();
        if ($(".dataTables_wrapper").html()==undefined)
        var table = $('#tblprodbanc').dataTable({
            "scrollCollapse": true,
            "paging": false,
            "info": false,
            "searching": false


        });
    }



    var cargainicial = function () {

        $('#chkactivobanc').on('change', function () {
            if ($("#chkactivobanc").is(':checked')) {

                $('#txtfechafbanc').attr("disabled", true);
                $('#txtfechafbanc').val('');
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
                $('#txtfechafbanc').val(today);
                $('#txtfechafbanc').attr("disabled", false);
            }
        });


        $.post("vistas/NC/estereotipos/ajax/Banco.ASHX", { flag: 4, usua: $("#ctl00_txtus").val() },
            function (res) {
                $("#controlempresabanc").html(res);
            
                $("#slcEmpresabanc").select2({
                    placeholder: "EMPRESA",
                    allowclear: true

                });

            });

        $.post("vistas/NC/estereotipos/ajax/Banco.ASHX", { flag: 5 },
           function (res) {
               $("#controlbanc").html(res);

               $("#slcbancbanc").select2({
                   placeholder: "BANCO",
                   allowclear: true
               });

               $("#slcbancbanc").change(function(){

                   $("#txtbancbanc").val($("#slcbancbanc option[value=" + $("#slcbancbanc").val() + "]").attr("codsunat"));
           
                });

           });



    }


    var plugins = function () {

        aMayuscula(":input");
        inifechas("txtfechaibanc", "txtfechafbanc");


    }


    return {
        init: function () {
            datatable();
            cargainicial();
            plugins();
        }
    };


}();
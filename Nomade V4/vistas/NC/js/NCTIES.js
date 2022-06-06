function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_nombre = $("#txtnombre").val();
    var p_cosu = $('#txtcosu').val();
    var p_noco = $('#txtnoco').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtnombre", "txtcosu", "txtnoco"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCTIES.ASHX", { flag: 2, cosu: p_cosu, nomb: p_nombre, noco: p_noco, user: p_user, acti: p_acti, codi: p_codi },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_nombre = $("#txtnombre").val();
    var p_cosu = $('#txtcosu').val();
    var p_noco = $('#txtnoco').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtnombre", "txtcosu", "txtnoco"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCTIES.ASHX", { flag: 1, cosu: p_cosu, nomb: p_nombre, noco: p_noco, user: p_user, acti: p_acti },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                } else {
                    noexito();
                }
            });
    }
}

var NCLTIES = function () {

    var fillBandejaTEstablecimientos = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjTEstablecimientos').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "CODIGOSUNAT" },
                { data: "TIPO" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }



        oTableTEstablecimientos = iniciaTabla('tblTEstablecimientos', parms);
        $('#tblTEstablecimientos').removeAttr('style');



        $('#tblTEstablecimientos tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTEstablecimientos.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableTEstablecimientos.fnGetPosition(this);
                var row = oTableTEstablecimientos.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmties&codigo=' + codigo;
            }

        });



        $('#tblTEstablecimientos tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableTEstablecimientos.api(true).row($(this).parent().parent()).index();
            var row = oTableTEstablecimientos.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCTIES.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableTEstablecimientos.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableTEstablecimientos);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });




    }




    return {
        init: function () {

            fillBandejaTEstablecimientos();
        }
    };

}();



var NCTIES= function () {


    var cargainicial = function () {

        aMayuscula(":input");

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

             $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCTIES.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtcosu").val(datos[0].CODIGOSUNAT);
                    $("#txtnombre").val(datos[0].TIPO);
                    $("#txtnoco").val(datos[0].CORTO);
                   
                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }



                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }
    }

    var plugins = function () {

        //mail: "[A-Za-z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}";


        $("#txtcosu").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false }); })
        $("#txtnoco").inputmask({ "mask": "A", "repeat": 12, "greedy": false });

    }



    return {
        init: function () {


           cargainicial();
            
            plugins();

        }
    };


}();
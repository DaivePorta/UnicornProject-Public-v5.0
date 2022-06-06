function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_codigosunat = $("#txtcodigosunat").val();
    var p_nombre = $('#txtnombre').val();
    var p_nombrecorto = $('#txtnombrecorto').val();
   
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcodigosunat", "txtnombrecorto", "txtnombre"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCNIED.ASHX", { flag: 2, cosu: p_codigosunat, nomb: p_nombre, user: p_user, acti: p_acti, codi: p_codi, noco: p_nombrecorto, nive: 0 },
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
    var p_codigosunat = $("#txtcodigosunat").val();
    var p_nombre = $('#txtnombre').val();
    var p_nombrecorto = $('#txtnombrecorto').val();
   
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtcodigosunat", "txtnombrecorto", "txtnombre"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCNIED.ASHX", { flag: 1, cosu: p_codigosunat, nomb: p_nombre, user: p_user, acti: p_acti, noco: p_nombrecorto, nive: 0 },
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

var NCLNIED = function () {

    var fillBandejaNEducativos = function () {

        
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjNEducativos').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "CODIGO_SUNAT" },
                { data: "NOMBRE" },
                { data: "NOMBRE_CORTO" },
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

        oTableNEducativos = iniciaTabla('tblNEducativos', parms);
        $('#tblNEducativos').removeAttr('style');



        $('#tblNEducativos tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableNEducativos.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableNEducativos.fnGetPosition(this);
                var row = oTableNEducativos.fnGetData(pos);
                var codigo = row.CODIGO;

                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmnied&codigo=' + codigo;
            }

        });

        $('#tblNEducativos tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableNEducativos.api(true).row($(this).parent().parent()).index();
            var row = oTableNEducativos.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCNIED.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableNEducativos.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableNEducativos);
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
            //plugins();
            fillBandejaNEducativos();
        }
    };

}();

var NCNIED = function () {

    



    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCNIED.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtcodigosunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtnombre").val(datos[0].NOMBRE);
                    $("#txtnombrecorto").val(datos[0].NOMBRE_CORTO);
                    $("#txtnivel").val(datos[0].NIVEL);

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

        aMayuscula(":input");

        $("#txtcodigosunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });

        $("#txtnombre").focus(function () {
            $(this).inputmask({ "mask": "Z", "repeat": 120, "greedy": false });
        });

        $("#txtnombrecorto").inputmask({ "mask": "A", "repeat": 12, "greedy": false });

      

       
    }


    return {
        init: function () {


            cargainicial();
            //datatable();
            plugins();

        }
    };


}();
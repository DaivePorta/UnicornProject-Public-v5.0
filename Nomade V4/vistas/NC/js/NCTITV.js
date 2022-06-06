function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_codigosunat = $("#txtcodigosunat").val();
    var p_descripcion = $('#txtdescripcion').val();
    var p_abreviatura = $('#txtabreviatura').val();
    var p_user = $('#ctl00_lblusuario').html();
  
    if (vErrors(["txtcodigosunat", "txtdescripcion", "txtabreviatura"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCTITV.ASHX", { flag: 2, cosu: p_codigosunat, desc: p_descripcion, user: p_user, acti: p_acti, codi: p_codi, abre: p_abreviatura },
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
    var p_descripcion = $('#txtdescripcion').val();
    var p_abreviatura = $('#txtabreviatura').val();
       var p_user = $('#ctl00_lblusuario').html();

       if (vErrors(["txtcodigosunat", "txtdescripcion", "txtabreviatura"])) {
           Bloquear("ventana");
           $.post("vistas/NC/ajax/NCTITV.ASHX", { flag: 1, cosu: p_codigosunat, desc: p_descripcion, user: p_user, acti: p_acti, abre: p_abreviatura },
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


var NCLTITV = function() {

    var fillBandejaTipoTV = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjTipoTV').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "CODIGO_SUNAT" },
                { data: "DESCRIPCION" },
                { data: "ABREVIATURA" },               
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



        oTableTipoTV = iniciaTabla('tblTipoTV', parms);
        $('#tblTipoTV').removeAttr('style');



        $('#tblTipoTV tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTipoTV.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableTipoTV.fnGetPosition(this);
                var row = oTableTipoTV.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmtitv&codigo=' + codigo;
            }

        });



        $('#tblTipoTV tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableTipoTV.api(true).row($(this).parent().parent()).index();
            var row = oTableTipoTV.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCTITV.ASHX", { flag: 3, codi: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableTipoTV.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableTipoTV);
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

            fillBandejaTipoTV();
        }
    };

}();


var NCTITV = function () {
   
    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCTITV.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtcodigosunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    $("#txtabreviatura").val(datos[0].ABREVIATURA);
                    

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

        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 120, "greedy": false }); });

        $("#txtabreviatura").focus(function () { $(this).inputmask({ "mask": "A", "repeat": 10, "greedy": false }); });




    }

    return {
        init: function () {

            plugins();
            cargainicial();
            //datatable();


        }
    };


}();
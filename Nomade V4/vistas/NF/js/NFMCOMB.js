function Actualizar() {
    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var codi = $('#txtcodigo').val();
    var cMTC = $('#txtcodMTC').val();
    var user = $('#ctl00_lblusuario').html();
    var nomb = $('#txtnombre').val();
    var defi = $('#txtdefinicion').val();


    if (vErrors("txtnombre")) {


        Bloquear("ventana");
        $.post("vistas/NF/ajax/NFMCOMB.ASHX", { flag: 2, user: user, acti: acti, codigo: codi, nomb: nomb, defi: defi, cmtc: cMTC },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }

}


function Crear() {

    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var cMTC = $('#txtcodMTC').val();
    var user = $('#ctl00_lblusuario').html();
    var nomb = $('#txtnombre').val();
    var defi = $('#txtdefinicion').val();

    if (vErrors("txtnombre")) {
        Bloquear("ventana");
        $.post("vistas/NF/ajax/NFMCOMB.ASHX", { flag: 1, user: user, acti: acti, nomb: nomb, defi: defi, cmtc: cMTC },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    $("#txtcodigo").val(res);
                } else {
                    noexito();
                }
            });
    }
}


var NFMCOMB = function () {

    var cargainicial = function () {

        aMayuscula(":input");
        var cod = ObtenerQueryString("codigo");

        if (cod != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NF/ajax/NFMCOMB.ASHX?codigo=" + cod + "&flag=4",
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].COMBUSTIBLE);
                    $("#txtdefinicion").val(datos[0].DESCRIPCION);
                    $("#txtcodMTC").val(datos[0].MTC);


                    if (datos[0].ACTIVO == "ACTIVO") {

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

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 50, "greedy": false }); });
        $('#txtcodMTC').focus(function () { $(this).inputmask({ "mask": "P", "repeat": 4, "greedy": false }); });

    }
    return {
        init: function () {
            cargainicial();
         
            plugins();
        }
    };

}();

var NFLCOMB = function () {

    var datatable = function () {

       
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "COMBUSTIBLE" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
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
                    var code = row.CODIGO;

                    window.location.href = '?f=nfmcomb&codigo=' + code;

                }

            });
      

  

        /*boton cambiar ACTIVO - INACTIVO*/

      
            $('#tblBandeja tbody').on('click', 'a', function () {

                $(this).parent().parent().addClass('selected');


                var pos = table.api(true).row($(this).parent().parent()).index();
                var row = table.fnGetData(pos);
                var cod = row.CODIGO;

                Bloquear("ventana");
                $.ajaxSetup({ async: false });
                $.post("vistas/NF/ajax/NFMCOMB.ASHX", { flag: 3, codigo: cod },
                    function (res) {
                        Desbloquear("ventana");
                        if (res != null) {

                            if (res == "I") res = "INACTIVO";
                            else res = "ACTIVO"

                            table.fnGetData(pos).ESTADO = res;
                            refrescaTabla(table);


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
          
            datatable();
        
        }
    };
}();
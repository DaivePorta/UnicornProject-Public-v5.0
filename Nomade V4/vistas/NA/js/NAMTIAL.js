var NALTIAL = function () {

    var fillBandejaBandeja = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJSON').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBRE" },
                {
                    data: "VENTA_IND", createdCell: function (td, cellData, rowData, row, col) {
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



        oTableBandeja = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');



        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableBandeja.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableBandeja.fnGetPosition(this);
                var row = oTableBandeja.fnGetData(pos);
                var codigo = row.CODIGO;


                window.location.href = '?f=namtial&codigo=' + codigo;
            }

        });








    }

    return {
        init: function () {

            fillBandejaBandeja();
        }
    };

}();

var NAMTIAL = function () {
 
    var cargainicial = function () {


        var cod = ObtenerQueryString("codigo");


        if (cod != null && cod != "") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");


            $.ajax({
                type: "get",
                url: "vistas/NA/ajax/NAMTIAL.ashx",
                data: { codi: cod, flag: 4 },
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtdescripcion").val(datos[0].DESCRIPCION.replace(/\,,/g,","));
                    $("#txtnombre").val(datos[0].NOMBRE);
                  
                    $("#slcventa").val(datos[0].VENTA_IND.substring(0,1));
                  

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

       // $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 500, "greedy": false }); })

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 50, "greedy": false }); });

      
    }

    return {
        init: function () {

          
            cargainicial();

            plugins();

        }
    };


}();


function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_desc = $("#txtdescripcion").val();
    var p_nombre = $("#txtnombre").val();
    var p_venta = $("#slcventa").val();
  

    if (vErrors([ "txtnombre", "slcventa"])) {

        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMTIAL.ASHX", {
            flag: 2,
            codi: p_codi,
            user: p_user,
            acti: p_acti,
           
            nom: p_nombre,
       
            vent: p_venta,
            desc: p_desc
          
        },
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

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';

    var p_user = $('#ctl00_lblusuario').html();
    var p_desc = $("#txtdescripcion").val();
    var p_nombre = $("#txtnombre").val();
    var p_cod_sunat = $("#txtcodsunat").val();
    var p_desc_corta = $("#txtdescCorta").val();
    var p_venta = $("#slcventa").val();
    var p_movcon = $("#slcmovcon").val();

    if (vErrors([ "txtnombre", "slcventa"])) {

        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMTIAL.ASHX", {
            flag: 1,
            user: p_user,
            acti: p_acti,
  
            nom: p_nombre,
      
            vent: p_venta,
            desc: p_desc
       
        },
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
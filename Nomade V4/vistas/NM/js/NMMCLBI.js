var NMLCLBI = function () {
    
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

              {
                  data: "DESCRIPCION",
                  createdCell: function (td, cellData, rowData, row, col) {
                      $(td).attr('align', 'center')
                  }
              },
                {
                    data: "DESC_CORTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "ORDEN",
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
                var code = row.CODIGO;

                window.location.href = '?f=nmmclbi&codigo=' + code;

            }

        });       

    }

    return {
        init: function () {
            datatable();
        }
    };
}();

var NMMCLBI = function () {

    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");
        
        if (cod != null && cod!="") {


            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("onclick", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMCLBI.ASHX?OPCION=4&p_CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    console.log(datos);
                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    $("#txtnombrecorto").val(datos[0].DESC_CORTA);
                    $("#txtcosu").val(datos[0].ORDEN);
                    

                    $("#slcunba option[value=" + datos[0].CODIGO + "]").remove();

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

        $("#txtcosu").inputmask({ "mask": "9", "repeat": 5, "greedy": false });

        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "!", "repeat": 150, "greedy": false }); })

        $('#txtnombrecorto').focus(function () { $(this).inputmask({ "mask": "!", "repeat": 10, "greedy": false }); })

        
    }

    return {
        init: function () {

            plugins();
            cargainicial();

        }
    };

}();

function Actualizar() {

    var p_codi = $('#txtcodigo').val();
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_nombre = $("#txtdescripcion").val();
    var p_descorta = $('#txtnombrecorto').val();
    var p_cosu = $('#txtcosu').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtnombrecorto", "txtdescripcion", "txtcodigo"])) {

        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMCLBI.ASHX",
            {
                OPCION: 2,
                p_CODE: p_codi,
                p_DESCRIPCION: p_nombre,
                p_DESCRIPCION_CORTA: p_descorta,
                P_CODE_SUNAT: p_cosu,
                P_ESTADO: p_acti,
                P_USUARIO: p_user,
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "OK")// && res != null) {
                {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                }
                else
                    infoCustom2(res);//noexito();
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }
}

function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_nombre = $("#txtdescripcion").val();
    var p_descorta = $('#txtnombrecorto').val();
    var p_cosu = $('#txtcosu').val();   
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtnombrecorto", "txtdescripcion"])) {
        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMCLBI.ASHX",
            {
                OPCION: 1,                
                p_DESCRIPCION: p_nombre,
                p_DESCRIPCION_CORTA: p_descorta,
                P_CODE_SUNAT: p_cosu,
                P_ESTADO: p_acti,
                P_USUARIO: p_user,              
            })
            .done(function (res) {
                Desbloquear("ventana");
                if (res.length == 4) // == "OK")//&& res != null) {                  
                {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                }
                else
                    infoCustom2(res); //noexito();
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}

function Crear() {

    var mensaje = "";

    var descripcion = $('#txtdescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();


    if (vErrors(["txtdescripcion"])) {

        Bloquear("ventana");
        $.post("vistas/NR/ajax/NRMNICA.ASHX",
                {
                    opcion: '2',
                    descripcion: descripcion,
                    estado: estado,
                    usuario: usuario
                },

       function (res) {
           Desbloquear("ventana");
           if (res != "") {
               exito();
               $("#grabar").html("<i class='icon-pencil'></i> Modificar");
               $("#grabar").attr("href", "javascript:Modificar();");
               $("#txtCodigo").val(res);

           } else {

               noexito();
           }
       });

    }
}
function Modificar() {

    var mensaje = '';

    var codigo = $('#txtCodigo').val();
    var descripcion = $('#txtdescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();

    if (vErrors(["txtdescripcion"])) {
        Bloquear("ventana");
        $.post("vistas/NR/ajax/NRMNICA.ASHX",
            {
                opcion: 3,
                codigo: codigo,
                descripcion: descripcion,
                estado: estado,
                usuario: usuario
            },
            function (res) {
                Desbloquear("ventana");
                if (res = "ok") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");

                } else {


                    noexito();
                }
            });

    }
}

var NRLNICA = function () {

    var fillBandejaNCAbastecimiento = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjNivelCadenaAbastecimiento').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "Descripcion" },
                {
                    data: "Estado",
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

        oTableNCAbastecimiento = iniciaTabla('tblNivelCadenaAbastecimiento', parms);
        $('#tblNivelCadenaAbastecimiento').removeAttr('style');

        $('#tblNivelCadenaAbastecimiento tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableNCAbastecimiento.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableNCAbastecimiento.fnGetPosition(this);
                var row = oTableNCAbastecimiento.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=nrmnica&codigo=' + codigo;
            }

        });

        $('#tblNivelCadenaAbastecimiento tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableNCAbastecimiento.api(true).row($(this).parent().parent()).index();
            var row = oTableNCAbastecimiento.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NR/ajax/NRMNICA.ASHX", { opcion: '4', code: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableNCAbastecimiento.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableNCAbastecimiento);
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

            fillBandejaNCAbastecimiento();
        }
    };

}();

var NRMNICA = function () {

    var cargaInicial = function () {
        var code =ObtenerQueryString("codigo");
        
        if(typeof(code) !=="undefined"){

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "post",
                url: "vistas/NR/ajax/NRMNICA.ashx?opcion=1&code=" + code,
                contenttype: "application/json;",
                datatype: "json",

                success: function (datos) {

                    $("#txtCodigo").val(datos[0].code);                   
                    $("#txtdescripcion").val(datos[0].Descripcion);
                    if (datos[0].ESTADO_IND == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }
    }

    var plugins = function () {

        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "R", "repeat": 60, "greedy": false }); })

    }


    return{
        init: function () {
            plugins();
            cargaInicial();
        }
    };
}();


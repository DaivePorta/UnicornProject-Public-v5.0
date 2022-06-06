function GrabarZonaH() {

    var index  = $("#txtIndex").val();
    var tiempo = $("#txtTiempo").val();
    var NomZona = $("#txtNomZonaH").val();
    var descripcion = $("#txtDescripcion").val();
    var hora = $("#txtHora").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMZONH.ASHX", {
            opcion: 'N', index: index, tiempo: tiempo, NomZona: NomZona,
            descripcion: descripcion, hora: hora, estado:estado, usuario: usuario
        },

        function (res) {
            Desbloquear("ventana");
            if (res != 'EXIS') {
                $('#txtCodigo').val(res);
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
            } else {
                noexito();
            }
        });
}

function Modificar() {

    var codigo = $("#txtCodigo").val();
    var index = $("#txtIndex").val();
    var tiempo = $("#txtTiempo").val();
    var NomZona = $("#txtNomZonaH").val();
    var descripcion = $("#txtDescripcion").val();
    var hora = $("#txtHora").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    Bloquear("ventana");
    $.post("vistas/NC/ajax/NCMZONH.ASHX", {
        opcion: 'M', codigo: codigo, index: index, tiempo: tiempo, NomZona: NomZona,
        descripcion: descripcion, hora: hora, estado: estado, usuario: usuario
    },
    function (res) {
        Desbloquear("ventana");
        if (res == "OK") {
            exito();
        } else {
            noexito();
          
        }
    }
    );
}

var NCLZONH = function () {

    var fillBandejaZonaH = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjZonaH').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "indicador" },
                { data: "zona" },
                { data: "tiempo" },
                { data: "descripcion" },
                { data: "zona_hora" },
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

        oTableZonaH = iniciaTabla('tblZonaH', parms);
        $('#tblZonaH').removeAttr('style');

        $('#tblZonaH tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableZonaH.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableZonaH.fnGetPosition(this);
                var row = oTableZonaH.fnGetData(pos);
                var codigo = row.Codigo;

                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmzonh&codigo=' + codigo;
            }

        });
        $('#tblZonaH tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableZonaH.api(true).row($(this).parent().parent()).index();
            var row = oTableZonaH.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMZONH.ASHX", { opcion: 'A', CODE:cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableZonaH.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableZonaH);
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
            fillBandejaZonaH();
            

        }
    };
}();

var NCMZONH = function () {

    var plugins = function () {
        aMayuscula(":input");
            $("#txtIndex").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
            $("#txtNomZonaH").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 60, "greedy": false }); })
            $("#txtDescripcion").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 60, "greedy": false }); })
           //$("#txtHora").focus(function () { $(this).inputmask("H:0") });
    }

    var datatable = function () {

    }


    var cargaInicial = function () {

        //$("#txtHora").blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });

        var CODE = ObtenerQueryString("codigo");
        
        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/ncmzonh.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
            
                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtIndex").val(datos[0].INDEX);
                    $("#txtTiempo").val(datos[0].TIEMPO);
                    $("#txtNomZonaH").val(datos[0].ZONA);
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
                    $("#txtHora").val(datos[0].ZONA_HORA);                 
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);                   
                    }
                        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val(datos[0].USUA_ID);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }

    return {
        init: function () {
            plugins();
            datatable();
            cargaInicial();
        }
    };
}();
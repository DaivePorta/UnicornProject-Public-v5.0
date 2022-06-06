function GrabarEPSS() {

    var mensaje = '';
    var cod_sunat = $("#txtCodSunat").val();
    var descripcion = $("#txtDescripcion").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var opcionSit = $("#ckOpcion").is(':checked') ? 'S' : 'N';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje = validar(cod_sunat, descripcion);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMEPSS.ASHX", {
            opcion: 'N', cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, opcionSit: opcionSit,
            usuario: usuario
        },

        function (res) {
            Desbloquear("ventana");
            if (res != 'EXIS' && res.length == 4) {
                $('#txtCodigo').val(res);
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
            } else {

                switch (res) {
                    case 'EXIS':
                        existeCod(cod_sunat);
                        break;
                    case 'DUP':
                        duplicidadCod(descripcion);
                        break;
                    case 'CSN':
                        CodDescDup(cod_sunat, descripcion);
                        break;
                }
            }
        });
    }
}

function Modificar() {

    var mensaje = "";
    var codigo = $("#txtCodigo").val();
    var cod_sunat = $("#txtCodSunat").val();
    var descripcion = $("#txtDescripcion").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var opcionSit = $("#ckOpcion").is(':checked') ? 'S' : 'N';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

    mensaje=validar(cod_sunat, descripcion);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    }
    else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMEPSS.ASHX", {
            opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, opcionSit: opcionSit,
            usuario: usuario
        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                } else {

                    switch (res) {
                        case 'EXIS':
                            existeCod(cod_sunat);
                            break;
                        case 'DUP':
                            duplicidadCod(descripcion);
                            break;
                        case 'CSN':
                            CodDescDup(cod_sunat, descripcion);
                            break;
                    }
                }
            });
    }
}

var NCLEPSS = function () {

    var fillBandejaEPSS = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjEPSS').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "Codigo_Sunat" },
                { data: "descripcion" },
                { data: "OPCION" },                
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



        oTableEPSS = iniciaTabla('tblEPSS', parms);
        $('#tblEPSS').removeAttr('style');



        $('#tblEPSS tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableEPSS.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableEPSS.fnGetPosition(this);
                var row = oTableEPSS.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmepss&codigo=' + codigo;
            }

        });



        $('#tblEPSS tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableEPSS.api(true).row($(this).parent().parent()).index();
            var row = oTableEPSS.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMEPSS.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableEPSS.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableEPSS);
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
            fillBandejaEPSS();
            //datatable();           
        }
    };
}();

var NCMEPSS = function () {


    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        aMayuscula(":input");
        $("#txtDescripcion").focus(function () { $(this).inputmask({ "mask": "Z", "repeat": 150, "greedy": false }); });
    }

    var datatable = function () {

    }
    var cargaInicial = function () {

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/ncmepss.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",

                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODE_SUNAT);
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
                    if (datos[0].OPCION_ID == 'S') {
                        $('#uniform-ckOpcion span').removeClass().addClass("checked");
                        $('#ckOpcion').attr('checked', true);
                    }
                    else {
                        $('#uniform-ckOpcion span').removeClass();
                        $('#ckOpcion').attr('checked', false);
                    }
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

function validar(cod_sunat, descripcion) {

    var mensaje = "";

    if (cod_sunat == "") {

        mensaje = mensaje + 'INGRESE CÓDIGO DE SUNAT<br/>';
    }

    if (descripcion == "") {

        mensaje = mensaje + 'INGRESE DESCRIPCIÓN DE SITUACIÓN EPS';
    }
    return mensaje;
}
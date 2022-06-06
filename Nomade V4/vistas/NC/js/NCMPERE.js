function GrabarPeriodicidad() {
 

    var mensaje = "";
    
    var codigo_sunat = $('#txtCodSunat').val();   
    var descripcion = $('#txtPeriodicidad').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();

    mensaje = validar(codigo_sunat, descripcion);
    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMPERE.ASHX",
            {
                opcion: 'N', codigo_sunat: codigo_sunat, descripcion: descripcion,
                estado: estado, usuario: usuario
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
                            existeCod(codigo_sunat);
                            break;
                        case 'DUP':
                            duplicidadCod(descripcion);
                            break;
                        case 'CSN':
                            CodDescDup(codigo_sunat, descripcion);
                            break;
                    }
                }
            });
    }
}

function Modificar() {

    var mensaje="";
    var codigo = $('#txtCodigo').val();
    var codigo_sunat = $('#txtCodSunat').val();
    var descripcion = $('#txtPeriodicidad').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I'; 
    var usuario = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario').val();

    mensaje = validar(codigo_sunat, descripcion);
    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMPERE.ASHX",
            {
                opcion: 'M', codigo: codigo, codigo_sunat: codigo_sunat, descripcion: descripcion,
                estado: estado, usuario: usuario
            },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                } else {

                    switch (res) {
                        case 'EXIS':
                            existeCod(codigo_sunat);
                            break;
                        case 'DUP':
                            duplicidadCod(descripcion);
                            break;
                        case 'CSN':
                            CodDescDup(codigo_sunat, descripcion);
                            break;
                    }
                }
            });
    }
}


var NCLPERE = function () {

    var fillBandejaPeriodo = function () {
        
     

        var json=jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjPeriodo').val());
        var parms = {
            data: json,
            columns: [
                { data: "codigo" },
                { data: "codigo_sunat" },
                { data: "descripcion" },            
                {
                    data: "estado",
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
        oTablePeriodo = iniciaTabla('tblPeriodo', parms);
        $('#tblPeriodo').removeAttr('style');



        $('#tblPeriodo tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTablePeriodo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTablePeriodo.fnGetPosition(this);
                var row = oTablePeriodo.fnGetData(pos);
                var codigo = row.codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmpere&codigo=' + codigo;
            }

        });



        $('#tblPeriodo tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTablePeriodo.api(true).row($(this).parent().parent()).index();
            var row = oTablePeriodo.fnGetData(pos);
            var cod = row.codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMPERE.ASHX", { opcion: 'A', CODE: cod},
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTablePeriodo.fnGetData(pos).estado = res;
                        refrescaTabla(oTablePeriodo);
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

            fillBandejaPeriodo();
        }
    };

}();


var NCMPERE = function () {
    var plugins = function () {
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $("#txtPeriodicidad").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false }); })
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
                url: "vistas/nc/ajax/ncmpere.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtPeriodicidad").val(datos[0].DESCRIPCION);
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

function validar(codigo_sunat, descripcion) {

    mensaje = "";
    if (codigo_sunat == "") {
        mensaje = mensaje + 'INGRESE CÓDIGO DE SUNAT.<BR/>';
    }
    if (descripcion == "") {
        mensaje = mensaje + 'INGRESE DESCRIPCIÓN.';
    }
    return mensaje;
}

var NCLTREG = function () {

    var fillBandejaTipoRegimen = function () {

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
                { data: "CODIGO_SUNAT" },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "ESTADO_EXO_IGV",
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
                ,
                      {
                          data: null,
                          defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                          createdCell: function (td, cellData, rowData, row, col) {

                              $(td).attr('align', 'center')

                          }
                      }

            ]

        }

        oTableTReg = iniciaTabla('tbltipo_regimen', parms);
        $('#tbltipo_regimen').removeAttr('style');
        $('#tbltipo_regimen tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTReg.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableTReg.fnGetPosition(this);
                var row = oTableTReg.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=ncmtreg&codigo=' + CODIGO;
            }
        });

        $('#tbltipo_regimen tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');


            var pos = oTableTReg.api(true).row($(this).parent().parent()).index();
            var row = oTableTReg.fnGetData(pos);
            var cod = row.CODIGO;

         

          

                Bloquear("ventana");
                $.post("vistas/NC/ajax/NCMTREG.ASHX", { OPCION: "AT", CODE: cod ,TIPO:"ESTADO"},
                    function (res) {
                        Desbloquear("ventana");
                        if (res != null) {

                            if (res == "I") res = "INACTIVO";
                            else res = "ACTIVO"

                            oTableTReg.fnGetData(pos).ESTADO = res;
                            refrescaTabla(oTableTReg);

                            exito();



                        } else {
                            noexito();
                        }

                    });

          
        });
    }

    return {
        init: function () {
            fillBandejaTipoRegimen();
        }
    };

}();


var NCMTREG = function () {



    var eventoControles = function () {

        $('#txtnombre').on('focus', function () {
            $('#txtnombre').inputmask({ "mask": "l", "repeat": 100, "greedy": false });
           
        });

        $('#txt_cod_sunat').on('focus', function () {
            $('#txt_cod_sunat').inputmask({ "mask": "9", "repeat": 100, "greedy": false });

        });

        $('#chkactivo').on('click', function () {
            if ($("#chkactivo").is(':checked')) {
              
                $('#uniform-chkactivo span').removeClass().addClass("checked");
                $('#chkactivo').attr('checked', true);
            } else {
             
                $('#uniform-chkactivo span').removeClass();
                $('#chkactivo').attr('checked', false);
            }
        });


        $('#chkexoigv').on('click', function () {
            if ($("#chkexoigv").is(':checked')) {
                $('#uniform-chkexoigv span').removeClass().addClass("checked");
                $('#chkexoigv').attr('checked', true);
            } else {
                $('#uniform-chkexoigv span').removeClass();
                $('#chkexoigv').attr('checked', false);
            }
        });

        
    }

    var cargaInicial = function () {
        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");


            var data = new FormData();

            data.append('OPCION', 'L');
            data.append('CODE', CODE);

            $.ajax({

                url: "vistas/nc/ajax/ncmtreg.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {


                        $('#txtcodigo').val(datos[0].CODIGO);
                        $('#txtnombre').val(datos[0].NOMBRE);
                        $('#txt_cod_sunat').val(datos[0].CODIGO_SUNAT);
                        if (datos[0].ESTADO_IND == 'A') {
                            $('#uniform-chkactivo span').removeClass().addClass("checked");
                            $('#chkactivo').attr('checked', true);
                        
                        }
                        else {
                            $('#uniform-chkactivo span').removeClass();
                            $('#chkactivo').attr('checked', false);
                           
                        }
                        if (datos[0].EXO_IGV_IND == 'S') {
                            $('#uniform-chkexoigv span').removeClass().addClass("checked");
                            $('#chkexoigv').attr('checked', true);
                        }
                        else {
                            $('#uniform-chkexoigv span').removeClass();
                            $('#chkexoigv').attr('checked', false);
                        }


                    }
                    else { noexito();}
                }

            });


        }
    }
    return {
        init: function () {
            eventoControles();
            cargaInicial();
        }
    };

}();


var Grabar = function () {
    var DESC = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var EXO_IGV_IND = '';


    DESC = $.trim($('#txtnombre').val());
    ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    EXO_IGV_IND = $("#chkexoigv").is(':checked') ? 'S' : 'N';

    var data = new FormData();

    data.append("OPCION", "CR");
    data.append("DESC", DESC);
    data.append("ESTADO_IND", ESTADO_IND);
    data.append("USUA_ID", USUA_ID);
    data.append("EXO_IGV_IND", EXO_IGV_IND);


    if (vErrors("txtnombre")) {

        Bloquear("ventana");

        $.ajax({
            url: "vistas/nc/ajax/NCMTREG.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {

                    $("#txtcodigo").val(datos);
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {
              
                alert(msg);
            }
        });

    }

}


var Modificar = function () {

    var DESC = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var CODE = '';
    var EXO_IGV_IND = '';


    DESC = $.trim($('#txtnombre').val());
    ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    CODE = $.trim($('#txtcodigo').val());
    EXO_IGV_IND = $("#chkexoigv").is(':checked') ? 'S' : 'N';

    var data = new FormData();

    data.append("OPCION", "AT");
    data.append("DESC", DESC);
    data.append("ESTADO_IND", ESTADO_IND);
    data.append("USUA_ID", USUA_ID);
    data.append("TIPO", "NORMAL");
    data.append("CODE", CODE);
    data.append("EXO_IGV_IND", EXO_IGV_IND);

    if (vErrors("txtnombre")) {

        Bloquear("ventana");

        $.ajax({
            url: "vistas/nc/ajax/NCMTREG.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos =! null && datos == "OK") {
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }





}
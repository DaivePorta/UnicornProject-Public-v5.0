var NNLBESO = function () {



    var fillBandejaBeneficios = function () {


        var parms = {
            data: null,

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

        oTable = iniciaTabla('tbl_bene_sociales', parms);
        $('#tbl_bene_sociales').removeAttr('style');
        $('#tbl_bene_sociales tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=nnmbeso&codigo=' + CODIGO;
            }
        });

        $('#tbl_bene_sociales tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');


            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var cod = row.CODIGO;





            Bloquear("ventana");
            $.post("vistas/nn/ajax/nnmbeso.ASHX", { OPCION: "AT", p_CODE: cod, p_TIPO_UPDATE: "ESTADO" , p_USUA_ID : $.trim($('#ctl00_txtus').val()) },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO"

                        oTable.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTable);

                        exito();



                    } else {
                        noexito();
                    }

                });


        });
    }



    var eventoControles = function () {


       


    }


    var listaBeneficios = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmbeso.ashx?OPCION=L",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);


                }
                else {

                    oTable.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }

    return {
        init: function () {
           
            fillBandejaBeneficios();
            listaBeneficios();
        }
    };

}();








var NNMBESO = function () {

  

    var eventoControles = function () {

  


        $('#chkactivo').on('click', function () {
            if ($("#chkactivo").is(':checked')) {

                $('#uniform-chkactivo span').removeClass().addClass("checked");
                $('#chkactivo').attr('checked', true);
            } else {

                $('#uniform-chkactivo span').removeClass();
                $('#chkactivo').attr('checked', false);
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
            data.append('p_CODE', CODE);

            $.ajax({

                url: "vistas/nn/ajax/nnmbeso.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {


                        $('#txtcodigo').val(datos[0].CODIGO);                  
                        $("#txt_descripcion").val(datos[0].DESCRIPCION);


                        if (datos[0].ESTADO_IND == 'A') {
                            $('#uniform-chkactivo span').removeClass().addClass("checked");
                            $('#chkactivo').attr('checked', true);

                        }
                        else {
                            $('#uniform-chkactivo span').removeClass();
                            $('#chkactivo').attr('checked', false);

                        }



                    }
                    else { noexito(); }
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

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';


    ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txt_descripcion").val();

    var data = new FormData();

    data.append("OPCION", "CR");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_DESCRIPCION", DESCRIPCION);


    if (vErrors(["txt_descripcion"])) {

        Bloquear("ventana");

        $.ajax({
            url: "vistas/NN/ajax/NNMBESO.ASHX",
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

 
    var ESTADO_IND = '';
    var USUA_ID = ''; 
    var DESCRIPCION = '';
    var p_CODE = '';


   
    ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txt_descripcion").val();
    p_CODE = $("#txtcodigo").val();

    var data = new FormData();

    data.append("OPCION", "AT");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_TIPO_UPDATE", "NORMAL");
    data.append("p_DESCRIPCION", DESCRIPCION);
    data.append("p_CODE", p_CODE);

    if (vErrors(["txt_descripcion"])) {

        Bloquear("ventana");

        $.ajax({
            url: "vistas/NN/ajax/nnmbeso.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos = ! null && datos == "OK") {
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }





}
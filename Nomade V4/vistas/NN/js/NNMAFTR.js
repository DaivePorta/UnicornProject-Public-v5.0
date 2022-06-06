var NNLAFTR = function () {



    var fillBandejaRelCNTR = function () {


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
                    data: "DESC_RHCNPL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "DESC_RHTRLAB",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                   {
                       data: "DESC_VALOR",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   }



            ]

        }

        oTableATR = iniciaTabla('tblAfec_tr', parms);
        $('#tblAfec_tr').removeAttr('style');
    }






    var listaRelCNTR = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMAFTR.ashx?OPCION=3",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTableATR.fnClearTable();
                    oTableATR.fnAddData(datos);


                }
                else {

                    oTableATR.fnClearTable();
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

            fillBandejaRelCNTR();
            listaRelCNTR();
        }
    };

}();






var NNMAFTR = function () {



    var cargaInicial = function () {
       
    }


    var eventos = function () {

        

        $("#btn_refrescar").on("click", function () {
            ListaTabla();
        });


        //$(".check").on("click", function () {
        //    $(this).attr("codigos");
        //    console.log($(this).attr("codigos"));
        //    console.log($(this).parent());
        //    setTimeout(function () {
        //        $(this).parent().attr("style", "text-align: center;background-color: bisque");
        //    },2000);

        //});
    }

  var ListaTabla = function () {

      Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/NN/ajax/NNMAFTR.ashx?OPCION=1",
        async: false,
        success: function (datos) {
           
            if (datos != "") {
                $("#divTblAfcTributaria").html(datos);

             oTable =     $("#tblAfectacion_tributaria").DataTable({
                    "scrollX": true,
                    "iDisplayLength": -1,
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    },
                    "order": [0, 'asc']
             });

             $(".check").on("click", function () {
                var codigos =  $(this).attr("codigos");
                console.log($(this).attr("codigos"));
                var x = $(this);
                Grabar(codigos,x)
                 //
                 //if ($(this).is(":checked")) {
                 //    $(x).parent().attr("style", "text-align: center;background-color: lightskyblue");
                 //} else {
                 //    $(x).parent().attr("style", "text-align: center;");
                 //}                
             });

             Desbloquear("ventana");

            } else {
                noexito();
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

    }

    return {
        init: function () {
           
           
            ListaTabla();
            eventos();
        }
    };

}();


var Grabar = function(codigos_rel,check) {
    Bloquear("ventana");
    var code_cnpl = codigos_rel.split(",")[0]
    var code_trlb = codigos_rel.split(",")[1]


    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmaftr.ashx?OPCION=2&p_CODE_RHCNPL=" + code_cnpl + "&p_CODE_RHTRLAB=" + code_trlb + "&p_USUA_ID=" + $("#ctl00_txtus").val(),
        async: false,
        success: function (datos) {
            if (datos == "OK") {
             
                if ($(check).is(":checked")) {
                    $(check).parent().attr("style", "text-align: center;background-color: lightskyblue");
                } else {
                    $(check).parent().attr("style", "text-align: center;");
                }      

            } else {
              
                noexito();
            }

            Desbloquear("ventana");
        },
        error: function (msg) {
            alert(msg);
            Desbloquear("ventana");
        }

    });


    



}
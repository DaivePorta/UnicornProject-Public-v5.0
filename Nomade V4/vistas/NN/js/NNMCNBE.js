
var NNLCNBE = function () {



    var fillBandejaRelCNBE = function () {


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
                     data: "DESC_RHBENSO",
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

        oTablePLB = iniciaTabla('tblCnp_benef', parms);
        $('#tblCnp_benef').removeAttr('style');
    }






    var listaRelCNBE = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMCNBE.ashx?OPCION=3",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTablePLB.fnClearTable();
                    oTablePLB.fnAddData(datos);


                }
                else {

                    oTablePLB.fnClearTable();
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

            fillBandejaRelCNBE();
            listaRelCNBE();
        }
    };

}();










var NNMCNBE = function () {



    var cargaInicial = function () {

    }


    var eventos = function () {



        $("#btn_refrescar").on("click", function () {
            ListaTabla();
        });


       
    }

    var ListaTabla = function () {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMCNBE.ashx?OPCION=1",
            async: false,
            success: function (datos) {

                if (datos != "") {
                    $("#divTblConp_Beneficios").html(datos);

                    oTable = $("#tblConceptos_Beneficios").DataTable({
                        "scrollX": true,
                        "iDisplayLength": -1,
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        },
                        "order": [0, 'asc']
                    });

                    $(".check").on("click", function () {
                        var codigos = $(this).attr("codigos");
                        console.log($(this).attr("codigos"));
                        var x = $(this);
                       Grabar(codigos, x)
                                        
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





var Grabar = function (codigos_rel, check) {
    Bloquear("ventana");
    var code_cnpl = codigos_rel.split(",")[0]
    var code_bene = codigos_rel.split(",")[1]


    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmcnbe.ashx?OPCION=2&p_CODE_RHCNPL=" + code_cnpl + "&p_CODE_RHBENSO=" + code_bene + "&p_USUA_ID=" + $("#ctl00_txtus").val(),
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
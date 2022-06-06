
function Confirmacion() {

    var imagen_Interrogacion = "data:image/png;base64,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";

    $("#mensajemodal").html(
        "<div class='row-fluid'>" +
         "<div class='span2'>" +
         "<img src='" + imagen_Interrogacion + "'+></img>" +
         "</div>" +
        "<div class='span10'>" +
         "<div class='row-fluid'>" +
          "<div class='span12'>" +
        "Esta realizando un ajuste para el operador " + $("#slcOpe :selected").html() + " desde " + $("#txtFechaIni").val() + " hasta " + $("#txtFechaFin").val() + " . Desea continuar?" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
         );
    if (vErrors(["txtmonto", "txtImpAbon"])) {
        $("#modalconfir").modal('show');
    }
}

$("#rptasi").click(function () {

    $("#modalconfir").modal('hide');
    grabar();
});


$("#rptano").click(function () {

    $("#modalconfir").modal('hide');


});

var CALROPT = function () {

    var plugins = function () {

        inifechas("txtFechaIni", "txtFechaFin");

    }


    var cargarCombos = function () {

        $("#slcEmpr,#slcMoneda,#slcOpe").select2();

        function cargarEmpresas() {
            var select = $('#slcEmpr');
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/CAMROPT.ashx?flag=5",
                async: false,
                success: function (datos) {
                    select.empty();
                    select.html(datos);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
            select.change(function () { $("#slcOpe").select2("val", ""); cargarOperador(); }).select2('val', $('#ctl00_hddctlg').val()).change();
        };


        function cargarOperador() {
            var select = $('#slcOpe');
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/CAMROPT.ashx?flag=6&empresa=" + $('#slcEmpr').val(),             
                async: false,
                success: function (datos) {
                    select.empty();
                    select.html(datos);
                },
                error: function (msg) {
                    alert(msg.d);
                }
            });
            select.change(function () { $("#slcPOS").select2("val", ""); $('#slcMoneda').select2("val","").attr("disabled", true); cargarMoneda(); });;
        }


        function cargarMoneda() {
            
            var select = $('#slcMoneda');
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/CAMROPT.ashx?flag=MO&empresa=" + $('#slcEmpr').val(),
                // async: false,
                success: function (datos) {
                    select.empty();
                    select.html(datos);
                },
                error: function (msg) {
                    alert(msg);
                }
            }).done(function () {
                select.attr("disabled", false);
                var v_monedas = $('#slcOpe :selected').attr("moneda");
                $("#slcMoneda option").filter(function (e, d) {
                    var val0r = $(d).val();
                    if (v_monedas.indexOf(val0r) < 0)
                    { $("#slcMoneda option[value=" + val0r + "]").remove(); }

                });

               
            });
        }




     

        cargarEmpresas();
  
     

    }

    var datatable = function () {

        var parms = {
            data: null,
            columns: [
                 {
                     data:"FECHA" , createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },type:"fecha"
                 },
                 { data: "TIPO_TRANSACCION" },
                 { data: "NUMERO" },
                 { data: "CANTIDAD_ORDENES"},
                 {
                     data: "MONTO_CIERRE", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(formatoMiles(cellData)).attr("align", "right");
                     }
                 },
                 {
                     data: "TOTAL_COMISIONES", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(formatoMiles(cellData)).attr("align","right");
                     }
                 },
                 {
                     data: "COMISION_EMISOR", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(formatoMiles(cellData)).attr("align", "right");
                     }
                 },
                 {
                     data: "COMISION_OPERADOR", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(formatoMiles(cellData)).attr("align", "right");
                     }
                 },
                 {
                     data: "OTROS", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(formatoMiles(cellData)).attr("align", "right");
                     }
                 },
                 {
                     data: "IGV", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(formatoMiles(cellData)).attr("align", "right");
                     }
                 },
                 {
                     data: "IMPORTE_ABONADO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).html(formatoMiles(cellData)).attr("align", "right");
                     }
                 }
                   
              
            ],
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var n = 8;
                if (data.length == 0) {
                    for (var i = 0; i < n; i++) {
                      
                            $(api.column(i + 3).footer()).html(
                               ""
                            );
                            if (i == n - 1) { $("#txtImpAbon").val("").change(); }
                    }
                } else {
                  

                    for (var i = 0; i < n; i++) {
                        if (this.api().data().length > 0) {
                            // Total over all pages
                            total = api
                                .column(i + 3)
                                .data()
                                .reduce(function (a, b) {
                                    return parseFloat(a) + parseFloat(b);
                                });


                            // Update footer
                            $(api.column(i + 3).footer()).html(
                               i == 0 ? total : formatoMiles(total)
                            );
                            if (i == n - 1) { $("#txtImpAbon").val(total).change(); }
                        }

                    }
                }
                

            }

        }


        table = iniciaTabla('tblBandeja', parms);
        $("#tblBandeja").removeAttr("style").css("border-collapse","collapse");
         $("thead th").attr("style", "padding: 4px 15px!important;");

       


    }

    var funcionalidadTabla=function(){
    
        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);

            }

        });


        $("#btnFiltrar").click(function () {
            if (!vErrors(["slcMoneda", "slcOpe"])) {
                return;
            }

            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camropt.ashx?flag=L&moneda=" + $("#slcMoneda").val()
                + "&operador=" + $("#slcOpe").val()
                + "&fecha_ini=" + $("#txtFechaIni").val()
                + "&fecha_fin=" + $("#txtFechaFin").val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    table.fnClearTable(); $("#btnAjuste").css("display", "none");
                    if (datos.indexOf("error") > -1) {
                        return;   
                    }

                    if (isEmpty(datos))
                        return;

                    table.fnAddData(datos);
                    $("#btnAjuste").css("display", "block");
                    
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        });
    
    }

    var funcionalidad = function () {

        $("#RdAbono, #RdCargo").click(function () {
            $("#CargAbonSym").html($(this).attr("symbol"));
            $("#txtImpAbon, #txtmonto").change();

        });

        $(".cerrar").click(function () {

            $(".head select, .head input, .head button").attr("disabled", false);

        });


        $("#btnAjuste")
            .css("display","none")
            .click(function () {
                if (vErrors(["txtFechaIni", "txtFechaFin"])) {

                    $(".head select, .head input, .head button").attr("disabled", true);

                    $.ajax({
                        type: "post",
                        url: "vistas/ca/ajax/camropt.ashx?flag=4&moneda=" + $("#slcMoneda").val()
                            + "&operador=" + $("#slcOpe").val()
                            + "&fecha_ini=" + $("#txtFechaIni").val()
                            + "&fecha_fin=" + $("#txtFechaFin").val()
                            + "&empresa=" + $("#slcEmpr").val(),
                        async: false,
                        success: function (datos) {


                            if (datos.indexOf("error") < 0) {

                                if (datos == "OK") {

                                    $("#ventanaAjuste").show();

                                } else {
                                    $(".head select, .head input, .head button").attr("disabled", false);
                                    alertCustom("Ya existe un ajuste para este operador en ese intervalo de tiempo!");

                                }

                            }
                        },
                        error: function (msg) {
                            alert(msg);
                            noexito();
                        }
                    });

                }

        });

       
        $("#txtImpAbon, #txtmonto").change(function () {
            if ($("#CargAbonSym").html() == "+") {
                $("#txtimpAjus").val(
                    (parseFloat(
                        $("#txtImpAbon").val() == "" ? 0.00 : $("#txtImpAbon").val()
                    )
                  +
                    parseFloat(
                        $("#txtmonto").val() == "" ? 0.00 : $("#txtmonto").val()
                    )).toFixed(2)
               );
            } else {
                $("#txtimpAjus").val(
                   (parseFloat(
                       $("#txtImpAbon").val() == "" ? 0.00 : $("#txtImpAbon").val()
                   )
                 -
                   parseFloat(
                       $("#txtmonto").val() == "" ? 0.00 : $("#txtmonto").val()
                   )).toFixed(2)
              );
            }

        });

       
    }

    return {
        init: function () {
            $(".radio").css("margin-top", "0px!important");
            plugins();
            cargarCombos();
            datatable();
            funcionalidadTabla();
            funcionalidad();

        }
    };
}();

function grabar() {
     
    var tipo=$("#CargAbonSym").html()=="+"?"A":"C";

            Bloquear("ventanaAjuste");
            $.ajax({
                type: "post",
                url: "vistas/ca/ajax/camropt.ashx?flag=3"
                    + "&moneda=" + $("#slcMoneda").val()
                    + "&monto=" + $("#txtmonto").val()
                    + "&empresa=" + $("#slcEmpr").val()
                    + "&operador=" + $("#slcOpe").val()
                    + "&fecha_ini=" + $("#txtFechaIni").val()
                    + "&fecha_fin=" + $("#txtFechaFin").val()
                    + "&usuario=" + $("#ctl00_txtus").val()
                    + "&tipo=" + tipo,
                async: false,
                success: function (datos) {
                    Desbloquear("ventanaAjuste");
                    if (datos.indexOf("error") < 0) {

                        $("#ventanaAjuste").hide();
                        $(".head select, .head input, .head button").attr("disabled", false);
                        exito();
                    } else {
                        noexito();
                    }
                },
                error: function (msg) {
                    alert(msg);
                    noexito();
                }
            });
        
   
}
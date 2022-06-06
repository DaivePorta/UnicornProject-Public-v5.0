var CPLDEMP = function () {
    var plugins = function () {

        $('#slcEmpresa').select2()
      

    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option value="T">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#slcEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }



    var fillBandeja = function () {


        var parms = {
            data: null,
            info: false,
            paging: false,
            ordering: false,
            columns: [
                {
                    data: "NOMBRES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },

                {
                    data: "DESC_CARGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },
                 {
                     data: "DEUDA_SOL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'right')
                         $(td).css('font-weight', 'bold')
                         $(td).html(formatoMiles(rowData.DEUDA_SOL));
                     }
                 },
                   {
                       data: "DEUDA_USD",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'right')
                           $(td).css('font-weight', 'bold')
                           $(td).html(formatoMiles(rowData.DEUDA_USD));
                       }
                   }
                  


            ]
            ,
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                var x = new Array();
                ////TOTAL DEUDA SOLES
                api.data().filter(function (e) {
                    y.push(parseFloat(e.DEUDA_SOL));
                    x.push(parseFloat(e.DEUDA_USD));
                });
                v_total = 0;
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                }
                $("#total_deuda_soles").text(formatoMiles(v_total))

                ////TOTAL DEUDA DOLARES
                v_total2 = 0;
                if (x.length > 0) {
                    v_total2 = x.reduce(function (c, d) { return c + d; });
                }
                $("#total_deuda_dolares").text(formatoMiles(v_total2))

            }

        }

        oTable = iniciaTabla('tbl_deuda_emp', parms);
        $('#tbl_deuda_emp').removeAttr('style');

    }




    var eventoComtroles = function () {


        $('#btn_filtrar').on('click', function () {
            $("#btn_filtrar").blur()



            if (vErrors(["slcEmpresa"])) {
                ListaDeuda();
            }
        });


    }




    var ListaDeuda = function () {
        Bloquear("ventana");


        var emp = ""
        if ($("#slcEmpresa").val() != "T") {
            emp = $("#slcEmpresa").val()
        }
        


       
            $.ajax({
                type: "post",
                url: "vistas/cp/ajax/CPLDEMP.ashx?OPCION=0&p_CTLG_CODE=" + emp ,
                                                         
                async: false,
                success: function (datos) {
                    if (datos != null) {

                        oTable.fnClearTable();
                        oTable.fnAddData(datos);

                        $("#fechaTipoCambio").html(datos[0].FECHA_TIPO_CAMBIO);
                        $("#valorTipoCambio").html(datos[0].TIPO_CAMBIO);

                        if (datos[0].FECHA_TIPO_CAMBIO != "-")
                        { $("#bloqueTipoCambio").css("display", "block"); }
                        else
                        { $("#bloqueTipoCambio").css("display", "none"); }

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
      
        Desbloquear("ventana");



    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();

            fillBandeja();
            ListaDeuda();
            eventoComtroles();

        }
    };

}();
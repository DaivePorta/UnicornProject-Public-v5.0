var CPLDAFP = function () {
    var plugins = function () {

        $('#slcEmpresa').select2()
        $('#cbo_afp').select2()

        var mifecha2 = new Date()
        var mifecha = new Date(mifecha2.getFullYear(), "0", "01")

        $('#txtanio_ini').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker('setEndDate', '-0y').datepicker('setDate', 'y').keydown(function () { return false; });
        $('#txtmes_ini').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () {
            return false;
        }).datepicker("setDate", mifecha);


        $('#txtanio_fin').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker('setEndDate', '-0y').datepicker('setDate', 'y').keydown(function () { return false; });
        $('#txtmes_fin').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () {
            return false;
        }).datepicker("setDate", new Date());

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

    var fillCboAfp = function () {
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMAFPP.ashx?OPCION=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_afp').empty();
                $('#cbo_afp').append('<option value="T">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_afp').append('<option value="' + datos[i].CODE_SUNAT + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_afp').select2('val', 'T');
                } else {
                    $('#cbo_afp').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("error listar afps")
            }
        });
    }

    var fillBandeja = function () {


        var parms = {
            data: null,
            scrollCollapse: true,
            scrollX: true,
            iDisplayLength : -1,
            columns: [
                {
                    data: "DESC_CTLG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },

                {
                    data: "PERIODO_DEVENGUE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                 {
                     data: "DESC_AFP",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'left')
                     }
                 },
                   {
                       data: "NRO_PLANILLA",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
                   ,
                   {
                       data: "NRO_EMPLEADOS",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')

                       }
                   }
                   ,
                   {
                       data: "TOTAL_FONDO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'right')
                           $(td).html(formatoMiles(rowData.TOTAL_FONDO))
                           //rowData.TOTAL_FONDO
                       }
                   }
                    ,
                   {
                       data: "TOTAL_RETENCION",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'right')
                           $(td).html(formatoMiles(rowData.TOTAL_RETENCION))
                       }
                   }
                     ,
                   {
                       data: "TOTAL_DEUDA",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'right')
                           $(td).html(formatoMiles(rowData.TOTAL_DEUDA))
                       }
                   }
                      ,
              
                   {
                       data: "FECHA_PRESENTACION",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).css('text-align', 'center')
                       }
                   }
                   
                   
            ]
            ,
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                var x = new Array();
                //TOTAL DEUDA SOLES
                api.data().filter(function (e) {
                    y.push(parseFloat(e.TOTAL_DEUDA));
                    x.push(parseFloat(e.TIPO_CAMBIO));
                });
                v_total = 0;
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                }
                $("#total_deuda_soles").text(formatoMiles(v_total))

                //TOTAL DEUDA DOLARES
                v_tipo_cambio = 1;
                if (x.length > 0) {
                    v_tipo_cambio = x[0];
                }
                $("#total_deuda_dolares").text(formatoMiles(v_total / v_tipo_cambio))

            }

        }

        oTable = iniciaTabla('tbl_deuda_afp', parms);
        $('#tbl_deuda_afp').removeAttr('style');

    }




    var eventoComtroles = function () {


        $('#btn_filtrar').on('click', function () {
            $("#btn_filtrar").blur()



            if (vErrors(["slcEmpresa", "cbo_afp", "txtanio_ini", "txtmes_ini", "txtanio_fin", "txtmes_fin"])) {
                ListaDeudasAfp();
            }
        });


    }




    var ListaDeudasAfp = function () {
        Bloquear("ventana");


        var emp = ""
        if ($("#slcEmpresa").val() != "T") {
            emp = $("#slcEmpresa").val()
        }
        var anio = $("#txtanio_ini").val()
        var mes = "";
        if (($("#txtmes_ini").datepicker('getDate').getMonth() + 1).toString() != "NaN") {
            mes = ($("#txtmes_ini").datepicker('getDate').getMonth() + 1).toString();
        }
        var anio2 = $("#txtanio_fin").val()
        var mes2 = "";
        if (($("#txtmes_fin").datepicker('getDate').getMonth() + 1).toString() != "NaN") {
            mes2 = ($("#txtmes_fin").datepicker('getDate').getMonth() + 1).toString();
        }
        //if(mes.length == 1){ mes = "0" + mes }
        var peri_ini = anio + "" + mes;
       // if (mes2.length == 1) { mes2 = "0" + mes2 }
        var peri_fin = anio2 +""+ mes2;
      
        var afp = "";
        if ($("#cbo_afp").val() != "T") {
            afp = $("#cbo_afp").val()
        }


        if (peri_ini < peri_fin) {
            $.ajax({
                type: "post",
                url: "vistas/cp/ajax/CPLDAFP.ashx?OPCION=0&p_CTLG_CODE=" + emp +
                                                         "&p_COD_AFP_SUNAT=" + afp +
                                                         "&p_PERIODO_INI=" + peri_ini +
                                                         "&p_PERIODO_FIN=" + peri_fin,
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
        } else {

            alertCustom("Error periodo desde no puede ser mayor al periodo fin !")
        }
        Desbloquear("ventana");

      

    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            fillCboAfp();
            fillBandeja();
            ListaDeudasAfp();
            eventoComtroles();

        }
    };

}();
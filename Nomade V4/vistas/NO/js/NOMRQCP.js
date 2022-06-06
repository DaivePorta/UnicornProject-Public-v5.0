var NOMRQCP = function () {
    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();


    }


    var eventoControles = function () {


        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {

              
             
                    ListarSucursales($('#slcEmpresa').val());
              

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

       






    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                // $('#slcSucural').append('<option value="T">TODOS</option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());

                    } else {

                        $("#slcSucural").select2("val", "");
                    }


                }
                else {
                    alertCustom("Error listar sucursales")
                }

                Desbloquear("div_filtro");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("div_filtro");
            }
        });
    }


    var fillBandejaReqCompra = function () {


        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            "order": [[0, "desc"]],
            columns: [
                {
                    data: "COD_PROD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "PROD_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CANTIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                  {
                      data: null,
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).css('text-align', 'center');

                          $(td).html('<a class="btn red" onclick="verDetalleReq( ' + "'" + rowData.COD_PROD + "'," + "'" + rowData.REQ_USUA_COD + "'" + ')"><i class="icon-search"></i></a>')

                      }
                  }

            ]

        }

        oTableTReq = $('#tblreqs_compra').dataTable(parms);
        $('#tblreqs_compra').removeAttr('style');



    }

    var fillBandejaDetalleReq = function () {


        var parms = {
            data: null,
            "sDom": "t",
            "paging": false,
            "order": [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO_REQ",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "ITEM",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "PROD_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left')
                    }
                },
                {
                    data: "CANTIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }

            ]

        }

        otbl_detalle_req = $('#tbl_detalle_req').dataTable(parms);
        $('#tbl_detalle_req').removeAttr('style');



    }
    




  


    var cargaInicial = function () {



        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

         

            var data = new FormData();

            data.append('OPCION', '13');
            data.append('CODE_REQ', CODE);

            $.ajax({

                url: "vistas/no/ajax/nomreqc.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (!isEmpty(datos)) {

                        var json = JSON.parse(datos)
                      
                        $('#txt_num_req').val(json[0].CODIGO);
                        $('#txt_nom_req').val(json[0].NOMBRE);
                        $('#txtFecTransaccion').val(json[0].FECHA_TRAN);      
                        $("#slcEmpresa").select2("val",json[0].CTLG_CODE).change();
                        $("#slcSucural").select2("val",json[0].SCSL_CODE);
                     
                        getReqCompraDetalle(json[0].CODIGO);

                    }
                    else { noexito(); }
                }

            });


        }
    }


    function getReqCompraDetalle(codigo_req) {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomreqc.ashx?OPCION=11&CODE_REQ_USUA=" + codigo_req,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (!isEmpty(datos)) {
                 
                    oTableTReq.fnClearTable()
                    oTableTReq.fnAddData(datos)
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
               
                alertCsutom2("Error listar detalle requerimiento de compra")
                Desbloquear("ventana");
            }

        });
    }

    return {
        init: function () {
            plugins();
            fillBandejaReqCompra();
            fillBandejaDetalleReq();
            fillCboEmpresa();
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
          
            cargaInicial();
        }
    };




}();

function verDetalleReq(cod_pro, cod_requsua) {


    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/nomreqc.ashx?OPCION=12&CODE_PRODUCTO=" + cod_pro + "&CODE_REQ_USUA=" + cod_requsua,
        async: true,
        contenttype: "application/json;",
        datatype: "json",
        success: function (datos) {
            otbl_detalle_req.fnClearTable();

            if (!isEmpty(datos)) {

                otbl_detalle_req.fnAddData(datos);

                $("#lbl_producto").html(otbl_detalle_req.fnGetData()[0].PROD_DESC)

                $("#modal_info").modal('show');


            } else {

                alertCustom("no existen datos que mostrar!")
            }


        },
        error: function (msg) {
            // alert(msg);
            alertCustom("Error al listar detalle del requerimiento!")
        }
    });
}
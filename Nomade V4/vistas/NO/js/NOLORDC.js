var NOLORDC = function () {

    var plugins = function () {

        $('#cboEstablecimiento').select2();
        $('#cboEmpresa').select2();
    }

    var datosDetalle = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMORDC.ashx?OPCION=5&p_CATALOGO=" + $('#cboEmpresa').val() + "&p_ESTABLEC=" + $('#cboEstablecimiento').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data != null && data != "") {

                    var json = $.parseJSON(data)
                    llenaTabla(json)
                }
                else {
                    oTableTReg.fnClearTable()
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });

    };

    function llenaTabla(datos) {
        var parms = {
            data: datos,
            order: [[0, 'desc']],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CORRELATIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "TIPODOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "PROVEEDOR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESC_MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                 {
                     data: "FECHA_TRANS",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center')
                     }
                 },                
                {
                    data: "NESTADO_CANCELADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                 },
                {
                    data: "COMPLETO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        $('#detalle').dataTable().fnDestroy();

        oTableTReg = iniciaTabla('detalle', parms);


        $('#detalle tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTReg.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableTReg.fnGetPosition(this);
                var row = oTableTReg.fnGetData(pos);
                var tp = row.CODIGO;


                window.location.href = '?f=NOMORDC&codigo=' + tp;
            }
        });

    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
        });

        $('#buscar').on('click', function () {
            datosDetalle();
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
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    //Iniciar valores con valores de login
                    $("#cboEmpresa").select2("val", $('#ctl00_hddctlg').val());
                    fillCboEstablecimiento();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').val(datos[0].CODIGO);
                }
                //selectEst.val($('#ctl00_hddestablecimiento').val());
                //selectEst.change();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        $('#cboEstablecimiento').select2('destroy').select2();
    };

    var cargaInicial = function () {

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
            llenaTabla();
            datosDetalle();
        }
    };

}();

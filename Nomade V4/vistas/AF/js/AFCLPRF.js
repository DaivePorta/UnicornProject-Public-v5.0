
var AFCLPRF = function () {
    var flagTb = false;
    var flagTbDetalle = false;

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
    }

    function datosDetalle() {
        $.ajax({
            type: 'post',
            url: 'vistas/af/ajax/AFCIPFR.ashx?OPCION=4&P_CATALOGO=' + $('#cboEmpresas').val() + '&P_SUCURSAL=' + $('#cboEstablecimiento').val() + '&ISAC_CODE=' + "",
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    llenaTabla(datos);
                }
                else {
                    oTableTReg.fnClearTable()
                }        
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });
    }
  
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
                    data: "CODIGO_ANTIGUO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        
                    }
                },
                {
                    data: "PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {

                    }
                },
                 {
                     data: "TOTALSIGV",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "TOTALCIGV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NRO_SERIE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_ENSAMBLAJE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type:"fecha"
                },
                {
                    data: "FECHA_MOVIMIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                }               

            ]

        }

        $('#detalle').dataTable().fnDestroy();

        oTableTReg = iniciaTabla('detalle', parms);

        
        $('#detalle tbody').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableTReg.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableTReg.fnGetPosition(this);
                var row = oTableTReg.fnGetData(pos);
                var tp = row.CODIGO;
                //window.location.href = '?f=AFCIPFR&codigo=' + tp;
                window.open("?f=AFCIPFR&codigo=" + tp, '_blank');
            }
        });      
    }

    var eventoControles = function () {
        $("#cboEmpresas").on("change", function () {
            fillCboEstablecimiento();
        });

        $('#btnBuscar').click(function () {          
            datosDetalle();
        });        
    }

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

var fillCboEmpresa = function () {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboEmpresas').empty();
            $('#cboEmpresas').append('<option></option>');
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                //Iniciar valores con valores de login
                $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();
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
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEst.empty();
            var id = "";           
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                id = datos[0].CODIGO;               
            }
            $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            if (id != "" && datos.length > 0 && ($('#cboEstablecimiento :selected').html() == undefined || $('#cboEstablecimiento :selected').html() == "")) {
                $('#cboEstablecimiento').select2('val', id).change();
            }       
        },
        error: function (msg) {
            alert(msg.d);
        }
    });
    $('#cboEstablecimiento').select2('destroy').select2();
};

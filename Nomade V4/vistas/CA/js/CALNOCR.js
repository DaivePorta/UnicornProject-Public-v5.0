function ListarNotasCredito(ctlg, scsl) {
    Bloquear("ventana")
    $.ajax({
        type: "post",
        url: "vistas/ca/ajax/calnocr.ashx?OPCION=1&p_CTLG_CODE=" + ctlg + "&p_SCSL_CODE=" + scsl,
        contenttype: "application/text;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {

                $('#divTblNotasCredito').html(datos);

               var oTable = $("#tblNotasCredito").DataTable({
                    "scrollX": "true",
                    "order": [[0, "desc"]]
               });

               oTable.column(0).visible(false);


            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alert(msg);
        }
    });


}

var CALNOCR = function () {


    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();     

    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/camnocr.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
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
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/camnocr.ashx?OPCION=1&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    $('#cboEstablecimiento').select2('val', '');

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
         

    var cargaInicial = function () {
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresa").change();     
    }


    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#buscar').on('click', function () {
            ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
        });

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboEstablecimiento($("#ctl00_hddctlg").val());          
            eventoControles();
            cargaInicial();
            ListarNotasCredito($("#cboEmpresa").val(), $("#cboEstablecimiento").val());
        }
    };

}();

function cargarNotaCredito(codigo, codempr) {
    window.location.href = "?f=camnocr&codigo=" + codigo + "&codempr=" + codempr
}
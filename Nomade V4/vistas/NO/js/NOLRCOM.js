var NOLRCOM = function () {

    var plugins = function () {
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
        $('#cboEstado').select2();
    };

    var eventoControles = function () {

        $('#buscar').on('click', function () {
            listar();
        });
        
        $('#cboEmpresas').on('change', function () {

            fillCboEstablecimiento();

        });
    };
    
    function listar() {
        
        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=8&CTLG_CODE=" + $('#cboEmpresas').val() + "&p_ESTABLECIMIENTO=" + $('#cboEstablecimiento').val() + "&P_ESTADOCABECE=" + $('#cboEstado').val(),
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null) {

                    $('#tblProductos').html(datos)

                    $("#tblbmodal").DataTable({
                        "order": [[0, 'desc']],
                        "scrollX": "true",
                        "sDom": 'T<"clear">lfrtip',
                        "sPaginationType": "full_numbers",
                        "oTableTools": {
                            "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                            "aButtons": [
                        {
                            "sExtends": "copy",
                            "sButtonText": "Copiar"
                        },
                        {
                            "sExtends": "pdf",
                            "sPdfOrientation": "landscape",
                            "sButtonText": "Exportar a PDF"
                        },
                        {
                            "sExtends": "xls",
                            "sButtonText": "Exportar a Excel"
                        }
                            ]
                        }
                    })
                    
                    $('#tblbmodal tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            $(this).addClass('selected');
                            var pos = $('#tblbmodal').DataTable().row(this).index();
                            var row = $('#tblbmodal').dataTable().fnGetData(pos);
                            var codigo = row[0];
                            if (!isEmpty(codigo)) {
                                window.location.href = '?f=NOMRCOM&codigo=' + codigo;
                            }
                           
                        }
                    });


                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }
    

    return {
        init: function () {
            
            plugins();
            fillCboEmpresa();
            eventoControles();
            listar();            

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
            
            if (datos != null) {
                $('#cboEmpresas').append('<option  value="" >TODOS</option>');
                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }

                //Iniciar valores con valores de login
                $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val());

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

            if (datos != null) {
                $('#cboEstablecimiento').append('<option  value="" >TODOS</option>');
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }


                let empresa = $('#cboEmpresas').val()
                if (empresa == $('#ctl00_hddctlg').val()) {
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                }
                else {
                    $('#cboEstablecimiento').val('').change();
                }



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
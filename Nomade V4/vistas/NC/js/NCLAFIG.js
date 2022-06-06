var NCLAFIG = function () {

    var listarAfectacionesIgv = function () {
        //$('#tAUTD').DataTable({
        //    ajax: {
        //        url: 'vistas/NC/ajax/NCMAUTD.ashx?OPCION=L',
        //        type: 'post',
        //        data: { P_CODE: '' },
        //        dataSrc: ''
        //    },
        var parms = {
            //sDom: 'TC<"clear">lfrtip',
            //scrollX: true,
            /*oTableTools: {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },*/
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td) { $(td).css('text-align', 'center'); $(td).css('width', '10%'); }
                },
                {
                    data: "CODIGO_SUNAT",
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '10%'); }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '40%'); }
                },
                {
                    data: "TIPO_BIEN",
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '15%'); }
                },
                
                {
                    data: "ESTADO_IND",
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '15'); }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td) { $(td).css('text-align', 'center').css('width', '10%'); }
                }
            ]
        };
        oTableAutorizaciones = iniciaTabla("tableafectaciones", parms);
        
        //$('.ColVis_Button').addClass('btn blue').css("margin-bottom", "10px");
        //$('.DTTT').css("float", "right");

        $('#tableafectaciones tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var row = $('#tableafectaciones').DataTable().row(this).data();
                var cod = row.CODIGO;
                window.location.href = '?f=NCMAFIG&codigo=' + cod;
            }
        });

        $('#tableafectaciones tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
            var pos = $('#tableafectaciones').DataTable().row($(this).parent().parent()).index();
            var row = $('#tableafectaciones').DataTable().row(pos).data();
            var code = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCLAFIG.ASHX", { OPCION: 'CE', P_CODE: code },
                function (res) {
                    Desbloquear("ventana");
                    if (res !== null) {


                        res = (res === 'I') ? 'INACTIVO' : 'ACTIVO';
                        $('#tableafectaciones').DataTable().cell(pos, 4).data(res).draw();
                        exito();
                    } else { noexito(); }
                });
            $.ajaxSetup({ async: true });
        });
        
    };

    var cargarDatosTabla = function () {
        Bloquear("ventana");
        
        $.ajax({
            url: "vistas/NC/ajax/NCLAFIG.ashx?OPCION=L",
            type: "post",
            contenttype: "application/json;",
            datatype: "json",
            processData: false,
            cache: false,
            success: function (res) {
                if (res != null && res != "") {
                    oTableAutorizaciones.fnClearTable();
                    oTableAutorizaciones.fnAddData(res);

                } else { oTableAutorizaciones.fnClearTable(); }
                Desbloquear("ventana");
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Listado!")
            }
        });
    };

    return {
        init: function () {
            //plugins();
            listarAfectacionesIgv();
            cargarDatosTabla();
    
        }
    };

}();



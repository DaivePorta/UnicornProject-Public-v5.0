var NOLCCOM = function () {
    var plugins = function () {

        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();


    }

    var eventoControles = function () {

        $('#buscar').on('click', function () {
            listar();
        });


            $('#cboEmpresas').on('change', function () {

                fillCboEstablecimiento();

            });

        //$('#buscar').on('click', function () {
        //    if (vErrors(["slsMoneda", "hf10"])) {
        //        listarKardex();
        //    }
        //});
    }


    function listar() {

        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=15&CTLG_CODE=" + $('#cboEmpresas').val() + "&p_ESTABLECIMIENTO=" + $('#cboEstablecimiento').val() + "&P_CABEUSUARIO=" + '',
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null) {

                    $('#tblProductos').html(datos)

                    $("#tblbmodal").DataTable({

                        "scrollX": "true",
                        order:[[0,'desc']],
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



                    //$('.clear').html('<div class="span12" style="padding: 8px 0px 14px 0px">\
                    //<a class="btn green" href="#">Mostrar / Ocultar</a>&nbsp;&nbsp;\
                    //<div id="enlaces" style="display: inline-block">\
                    //    <a class="toggle-vis" data-column="0" href="#">FECHA SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="1" href="#">FECHA ENTRADA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="2" href="#">ALMACEN ORIGEN</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="3" href="#">ALMACEN DESTINO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="4" href="#">TIPO DE DOCUMENTO / MODELO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="5" href="#">NRO DOCUMENTO DE SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="6" href="#">ESTADO</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="7" href="#">GLOSARIO DE SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="8" href="#">GLOSARIO DE ENTRADA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="9" href="#">VER SALIDA</a>&nbsp;&nbsp;-&nbsp;&nbsp;\
                    //    <a class="toggle-vis" data-column="10" href="#">VER ENTRADA </a>\
                    //</div>');

                    //$('a.toggle-vis').on('click', function (e) {
                    //    e.preventDefault();
                    //    var column = $('#tblbmodal').DataTable().column($(this).attr('data-column'));
                    //    column.visible(!column.visible());
                    //});

                    $('#tblbmodal tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            $(this).addClass('selected');
                            var pos = $('#tblbmodal').DataTable().row(this).index();
                            var row = $('#tblbmodal').dataTable().fnGetData(pos);
                            var codigo = row[0];
                            window.location.href = '?f=nomcrco&codigo=' + codigo;
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



    //var eventoControles = function () {
    //    $('#cboEmpresas').on('change', function () {

    //        fillCboEstablecimiento();

    //    });

    //}


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



        },
        error: function (msg) {
            alert(msg.d);
        }
    });
    $('#cboEstablecimiento').select2('destroy').select2();
};
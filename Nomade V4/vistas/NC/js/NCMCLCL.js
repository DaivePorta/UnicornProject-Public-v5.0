function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_predet = $('#chx_defecto').is(':checked') ? 'S' : 'N';
    var p_codi = $('#txtcodigo').val();
    var p_nombre = $("#txtnombre").val();
    var p_ctlg = $('#slcEmpresa').val();
 //   var p_tipo = $('#slctipo').val();
    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["txtnombre"])) {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMCLCL.ASHX", { flag: 2, nomb: p_nombre, user: p_user, acti: p_acti, codi: p_codi,ctlg: p_ctlg, predet:p_predet },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_predet = $('#chx_defecto').is(':checked') ? 'S' : 'N';
    var p_nombre = $("#txtnombre").val();
  //  var p_tipo = $('#slctipo').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_ctlg = $('#slcEmpresa').val();

    if (vErrors(["txtnombre"])) {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMCLCL.ASHX", { flag: 1, nomb: p_nombre, user: p_user, acti: p_acti, ctlg: p_ctlg, predet: p_predet },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                } else {
                    noexito();
                }
            });
    }
}


var NCLCLCL = function () {

    var fillBandejaCCliente = function () {
       

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjCCliente').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODIGO" },
                { data: "DESCRIPCION" },
                {data: "NEMPRESA"},
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "CONFIGURACION" },
                {
                    data: null,
                    defaultContent: '<a  class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }



        oTableCCliente = iniciaTabla('tblCCliente', parms);
        $('#tblCCliente').removeAttr('style');


        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });

        $("#filemp").each(function () {
            var select = $('<select id="slcfilempr" class="span12" style="margin-bottom: 0px;"><option></option><option value="">Todo</option></select>')
                .appendTo($(this).empty())
                .on('change', function () {
                    $('#tblCCliente').DataTable().column(2)
                        .search($(this).val())
                        .draw();
                });

            $('#tblCCliente').DataTable().column(2).data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            $("#slcfilempr").select2({
                placeholder: "EMPRESA",
                allowclear: true

            });
            $("#s2id_slcfilempr").attr("style", "margin-bottom: -10px;");

        });


        $('#tblCCliente tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCCliente.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCCliente.fnGetPosition(this);
                var row = oTableCCliente.fnGetData(pos);
                var codigo = row.CODIGO;
                var empresa=row.EMPRESA;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmclcl&codigo=' + codigo+"&empr="+empresa;
            }

        });

        $('#tblCCliente tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableCCliente.api(true).row($(this).parent().parent()).index();
            var row = oTableCCliente.fnGetData(pos);
            var cod = row.CODIGO;
            var ctlgx = row.EMPRESA;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMCLCL.ASHX", { flag: 3, codi: cod, ctlg: ctlgx },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableCCliente.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableCCliente);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });

    }

    
    return {
        init: function () {

            fillBandejaCCliente();
        }
    };

}();


var NCMCLCL = function () {

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
                $('#slcEmpresa').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoControles = function ()
    {
        $('#slcEmpresa').on('change', function ()
        {
            Verifica();
        });
    }

    var Verifica = function () {
        var empx = ObtenerQueryString("empr");
        var codx = ObtenerQueryString("codigo");

        if (empx == null) {
            empx = $('#slcEmpresa').val();
            if (empx == null)
                empx = $("#ctl00_hddctlg").val();
        }

        if (codx == null)            //codx = $('#txtcodigo').val();
        {
            $.ajax({
                ype: "GET",
                url: "vistas/NC/ajax/NCMCLCL.ASHX",
                data: { codi: codx, flag: 5, ctlg: empx },
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    if (datos != null) {
                        if (datos[0].VERIFICADOR == "0")
                            $('#chx_defecto').attr('disabled', false);
                        else
                            $('#chx_defecto').attr('disabled', true);
                    }
                    else
                        $('#chx_defecto').attr('disabled', true);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

    }

    var cargainicial = function () {
        $("#slctipo").select2();

        $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
        //$("#slcEmpresa").change();

        var cod = ObtenerQueryString("codigo");
        var empresa = ObtenerQueryString("empr");
        if (cod != null) {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "GET",
                url: "vistas/NC/ajax/NCMCLCL.ASHX",
                data: { codi: cod, flag: 4, ctlg: empresa },
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].DESCRIPCION);
                    $("#slcEmpresa").select2("val", datos[0].EMPRESA);



                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    //if ((datos[0].CONTROL == "S" && datos[0].PREDETERMINADO == "S") || (datos[0].CONTROL == "N" && datos[0].PREDETERMINADO == "N")) {
                    if (datos[0].CONTROL == datos[0].PREDETERMINADO) {
                        if (datos[0].PREDETERMINADO == "S") {
                            $('#uniform-chx_defecto span').removeClass().addClass("checked");
                            $('#chx_defecto').attr('checked', true);
                        }
                        else {
                            $('#uniform-chx_defecto span').removeClass();
                            $('#chx_defecto').attr('checked', false);
                        }
                        $('#chx_defecto').attr('disabled', false);
                    }
                    else
                        $('#chx_defecto').attr('disabled', true);


                },
                error: function (msg) {

                    alert(msg);
                }
            });

        }
        //else
        //    Verifica();
        
    }

    var plugins = function () {

        aMayuscula(":input");

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 150, "greedy": false }); })
        $('#slcEmpresa').select2();

        fillCboEmpresa();
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargainicial();
            //Verifica();
        }
    };


}();
function Crear_Metodo() {

    var mensaje = '';

    var empresa = $('#cboEmpresa').val();
    var metodo = $('#cboMetodo').val();
    var estado = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();

    if (vErrors(["cboEmpresa", "cboMetodo"])) {
        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMMVMT.ASHX",
            {
                opcion: '3',
                empresa: empresa,
                metodo: metodo,
                estado: estado,
                usuario: usuario
            })
            .done(function (res) {
                Desbloquear("ventana");
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                $("#grabar").attr("onclick", "javascript:Modificar();");
                $("#txtcodigo").val(res);
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });
        //TE DIJE QUE COMENTES ESTO MI...DA!
        // function (res) {
        //     Desbloquear("ventana");
        //     if (res != "EXIS") {
        //         $('#txtcodigo').val(res);

        //         exito();
        //         $("#grabar").html("<i class='icon-pencil'></i> Modificar");
        //         $("#grabar").attr("onclick", "javascript:Modificar();");
        //         $("#txtcodigo").val(res);
        //     } else {


        //         noexito();
        //     }
    }  //});
}

function Modificar() {

    var mensaje = '';

    var codigo = $('#txtcodigo').val();
    var empresa = $('#cboEmpresa').val();
    var metodo = $('#cboMetodo').val();
    var estado = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();

    if (vErrors(["cboEmpresa", "cboMetodo"])) {
        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMMVMT.ASHX",
            {
                opcion: 'A',
                codigo: codigo,
                empresa: empresa,
                metodo: metodo,
                estado: estado,
                usuario: usuario
            },
            function (res) {
                Desbloquear("ventana");
                if (res == "ok") {


                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Modificar();");

                } else {


                    noexito();
                }
            });

    }
}

var NALMVMT = function () {

    var fillBandejaMetodos = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjMVMateriales').val());
        var parms = {
            data: json,
            columns: [
                { data: "CODE" },
                { data: "EMPRESA" },
                { data: "METODO" },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }



        oTableMetodos = iniciaTabla('tblMVMateriales', parms);
        $('#tblMVMateriales').removeAttr('style');



        $('#tblMVMateriales tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableMetodos.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableMetodos.fnGetPosition(this);
                var row = oTableMetodos.fnGetData(pos);
                var codigo = row.CODE;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=nammvmt&code=' + codigo;
            }

        });



        $('#tblMVMateriales tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableMetodos.api(true).row($(this).parent().parent()).index();
            var row = oTableMetodos.fnGetData(pos);
            var cod = row.CODE;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NA/ajax/NAMMVMT.ASHX", { opcion: '2', code: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableMetodos.fnGetData(pos).Estado = res;
                        refrescaTabla(oTableMetodos);
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

            fillBandejaMetodos();
        }
    };

}();

var NAMMVMT = function () {

    var cargaInicial = function () {

        //$("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

        var code = ObtenerQueryString("code");

        if (typeof (code) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "post",
                url: "vistas/NA/ajax/nammvmt.ashx?opcion=1&code=" + code,
                contenttype: "application/json;",
                datatype: "json",

                success: function (datos) {

                    $("#txtcodigo").val(datos[0].code);
                    $("#cboEmpresa").select2('val', datos[0].CTLG_CODE);
                    $("#cboMetodo").select2('val', datos[0].MEVA_CODE);
                    if (datos[0].ESTADO_IND == 'A') {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });

        }
    }

    var fillCboEmpresa = function () {

        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nammvmt.ashx?opcion=4&usua=" + $("#ctl00_txtus").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != "" && datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

            },
            error: function (msg) {
                alertCustom("Error al listar Empresa.");
            }
        });

    }

    var fillCboMetodo = function () {

        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nammvmt.ashx?opcion=5",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMetodo').empty();
                $('#cboMetodo').append('<option></option>');
                if (datos != "" && datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMetodo').append('<option value="' + datos[i].code + '">' + datos[i].Descripcion + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom("Error al listar Método Valuación.");
            }
        });

    }

    var plugins = function () {

        $('#cboEmpresa').select2();
        $('#cboMetodo').select2();


    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboMetodo();
            cargaInicial();



        }
    };
}();






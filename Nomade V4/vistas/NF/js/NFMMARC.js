
function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_nombre = $('#txtnombre').val();
    var p_user = $('#ctl00_lblusuario').html();
    var P_DESCRIPCION = $('#txtDescripcion').val();
    if (vErrors(["txtnombre", "txtDescripcion"])) {
        Bloquear("ventana");

        var data = new FormData();
        data.append('codigo', p_codi);
        data.append('nomb', p_nombre);
        data.append('user', p_user);
        data.append('acti', p_acti);
        data.append('P_DESCRIPCION', P_DESCRIPCION);
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMMARC.ASHX?flag=2",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null && datos.length > 0) {
               if (datos[0].RESPUESTA == "OK") {
                   exito();
                   $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                   $("#grabar").attr("href", "javascript:Actualizar();");
               } else if (datos[0].RESPUESTA == "EXISTE") {
                   infoCustom2("Ya existe una marca con ese Nombre");
               }
               else {
                   alertCustom(datos[0].CODIGO);//Mensaje de error de bd
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

        //$.post("vistas/NF/ajax/NFMMARC.ASHX", { flag: 2, nomb: p_nombre, user: p_user, acti: p_acti, codigo: p_codi, P_DESCRIPCION: P_DESCRIPCION },
        //    function (res) {
        //        Desbloquear("ventana");
        //        if (res == "OK") {
        //            exito();
        //            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
        //            $("#grabar").attr("href", "javascript:Actualizar();");
        //        } else if (res.search("ERROR") != -1) {
        //            alertCustom(res);
        //        }
        //        else {
        //            noexito();
        //        }
        //    });
    }
}


function Crear() {

    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_nombre = $('#txtnombre').val();
    var p_user = $('#ctl00_lblusuario').html();
    var P_DESCRIPCION = $('#txtDescripcion').val();

    if (vErrors(["txtnombre", "txtDescripcion"])) {
        Bloquear("ventana");
        var data = new FormData();
        data.append('nomb', p_nombre);
        data.append('user', p_user);
        data.append('acti', p_acti);
        data.append('P_DESCRIPCION', P_DESCRIPCION);
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMMARC.ASHX?flag=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null && datos.length > 0) {
               if (datos[0].RESPUESTA == "OK") {
                   exito();
                   $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                   $("#grabar").attr("href", "javascript:Actualizar();");
                   $("#txtcodigo").val(datos[0].CODIGO);

               } else if (datos[0].RESPUESTA == "EXISTE") {
                   infoCustom2("Ya existe una marca con ese Nombre");
               }
               else {
                   alertCustom(datos[0].CODIGO);//Mensaje de error de bd
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

        //$.post("vistas/NF/ajax/NFMMARC.ASHX", { flag: 1, nomb: p_nombre, user: p_user, acti: p_acti, P_DESCRIPCION: P_DESCRIPCION },
        //    function (res) {
        //        Desbloquear("ventana");
        //        if (res != "" && res.search("ERROR") != -1) {
        //            exito();
        //            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
        //            $("#grabar").attr("href", "javascript:Actualizar();");
        //            $("#txtcodigo").val(res);
        //        }
        //        else if (res.search("ERROR") != -1) {
        //            alertCustom(res);
        //        }
        //        else {
        //            noexito();
        //        }
        //    });
    }
}

var NFMMARC = function () {


    var cargainicial = function () {
        var cod = ObtenerQueryString("codigo");

        if (cod != undefined) {

            Bloquear("ventana");
            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");
            $.ajax({
                type: "POST",
                url: "vistas/NF/ajax/NFMMARC.ASHX?codigo=" + cod + "&flag=4",
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    $("#txtcodigo").val(datos[0].CODIGO);
                    $("#txtnombre").val(datos[0].DESCRIPCION);
                    $("#txtDescripcion").val(datos[0].DESC_MARCA);
                    if (datos[0].ACTIVO == "ACTIVO") {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    alert(msg);
                }
            });
        }
    }

    var plugins = function () {
                aMayuscula(":input");
        $("#txtnombre").attr("maxlength", "150");
        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 30, "greedy": false }); })
    }

    return {
        init: function () {
            cargainicial();
            plugins();
        }
    };
}();

var NFLMARC = function () {

    var datatable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }

        var table = iniciaTabla("tblBandeja", parms);
        $('#tblBandeja').removeAttr('style');

        $('#tblBandeja tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = table.fnGetPosition(this);
                var row = table.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=nfmmarc&codigo=' + code;
            }
        });


        /*boton cambiar ACTIVO - INACTIVO*/
        $('#tblBandeja tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NF/ajax/NFMMARC.ASHX", { flag: 3, codigo: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO"
                        table.fnGetData(pos).ESTADO = res;
                        refrescaTabla(table);
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
            datatable();
        }
    };
}();

var NMLSISC = function () {

    var iniTabla = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESCRIPCION", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "CODIGO_SUNAT", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, 
                {
                    data: "ESTADO", createdCell: function (td, cellData, rowData, row, col) {
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
            ],
            oLanguage: {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            },
            scrollX: "true"
        }

        oTable = iniciaTabla('tblTipoSistemas', parms);
        $('#tblTipoSistemas').removeAttr('style');


        $('#tblTipoSistemas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=NMMSISC&codigo=' + code;
            }
        });

        $('#tblTipoSistemas tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');

            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NM/ajax/NMMSISC.ASHX",
                {
                    OPCION: 'D',
                    p_CODIGO: cod
                })
                .done(function (res) {
                    Desbloquear("ventana");
                    if (res != null && res != "") {
                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";
                        oTable.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTable);
                        exito();
                    }
                })
                .fail(function () {
                    Desbloquear("ventana");
                    noexito();
                });

            $.ajaxSetup({ async: true });

        });
    }
   


    return {
        init: function () {         
            iniTabla();            
        }
    };
}();



var NMMSISC = function () {

    var actualizar = false;

    var plugins = function () {

        $("#txtcodigo").inputmask({ "mask": "9", "repeat": 4, "greedy": false });
        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "!", "repeat": 50, "greedy": false }); })
        $("#txtcosu").focus(function () { $(this).inputmask({ "mask": "!", "repeat": 2, "greedy": false }); })
       
    }


    var eventoControles = function () {

        $("#cancelar_registro").on("click", function () {
            location.reload();
        });

        $("#grabar").on("click", function () {

            if (actualizar) {
                Actualizar();
            } else {
                var data = new FormData();

                data.append('OPCION', 'G');
                data.append('p_DESCRIPCION', $("#txtdescripcion").val());
                data.append('p_COD_SUNAT', $("#txtcosu").val());
                data.append('p_ESTADO', $("#chkactivo").is(':checked') ? 'A' : 'I');
                data.append('p_USUARIO', $('#ctl00_lblusuario').text());

                Bloquear("ventana");

                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/NM/ajax/NMMSISC.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                })
                    .success(function (res) {
                        //var datos = $.parseJSON(res);
                        if (res.length > 0) {
                            if (res[0].RESPUESTA == "CODIGO") {
                                alertCustom('Tipo de sistema ya registrado!!!<br>Verifique CODIGO DE SUNAT.');
                                $("#txtcosu").focus();
                                actualizar = false;
                            }
                            else if (res[0].RESPUESTA == "DESCRI") {
                                alertCustom('Tipo de sistema ya registrado!!!<br>Verifique LA DESCRIPCIÓN.');
                                $("#txtdescripcion").focus();
                                actualizar = false;
                            }
                            else {
                                exito();
                                $("#txtcodigo").val(res[0].RESPUESTA);
                                $("#grabar").html("<i class='icon-pencil'></i> Actualizar");
                                $("#grabar").attr("onclick", "javascript:Actualizar();");
                                actualizar = true;
                                Desbloquear("ventana");
                            }
                        }
                        else {
                            noexito();
                            Desbloquear("ventana");
                            actualizar = false;
                        }
                    })
                    .error(function () {
                        infoCustom("ERROR AL REGISTRAR EL TIPO DE SISTEMA.")
                        Desbloquear("ventana");
                        actualizar = false;
                    });
            }

            
        });  
        

    }

    var Actualizar = function () {

        if (actualizar) {

            var data = new FormData();

            data.append('OPCION', 'A');
            data.append('p_CODIGO', $("#txtcodigo").val());
            data.append('p_DESCRIPCION', $("#txtdescripcion").val());
            data.append('p_COD_SUNAT', $("#txtcosu").val());
            data.append('p_ESTADO', $("#chkactivo").is(':checked') ? 'A' : 'I');
            data.append('p_USUARIO', $('#ctl00_lblusuario').text());
            Bloquear("ventana");

            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMSISC.ASHX",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
                .success(function (res) {
                    actualizar = true;
                    if (res.length > 0) {
                        if (res[0].RESPUESTA == "CODIGO") {
                            alertCustom('Tipo de sistema ya registrado!!!<br>Verifique CODIGO DE SUNAT.');
                            $("#txtcosu").focus();
                            Desbloquear("ventana");

                        }
                        else if (res[0].RESPUESTA == "DESCRI") {
                            alertCustom('Tipo de sistema ya registrado!!!<br>Verifique LA DESCRIPCIÓN.');
                            $("#txtdescripcion").focus();
                            Desbloquear("ventana");

                        }
                        else if (res[0].RESPUESTA == "NOEXIS") {
                            alertCustom('Tipo de sistema no existe!!!<br>VUELVA A INTENTARLO.');
                            Desbloquear("ventana");

                        }
                        else {
                            exito();
                            $("#txtcodigo").val(res[0].RESPUESTA);
                            $("#grabar").html("<i class='icon-pencil'></i> Actualizar");
                            $("#grabar").attr("onclick", "javascript:Actualizar();");
                            
                            Desbloquear("ventana");
                        }
                    }
                    else {
                        noexito();
                        Desbloquear("ventana");
                    }
                })
                .error(function () {
                    infoCustom("ERROR AL ACTUALIZAR EL TIPO DE SISTEMA.")
                    Desbloquear("ventana");
                    actualizar = true;
                });

        }

    }


    var cargaInicial = function () {                 
        var cod = ObtenerQueryString("codigo");

        if (typeof (cod) !== "undefined") {
            $.ajax({
                type: "POST",
                url: "vistas/NM/ajax/NMMSISC.ASHX?OPCION=L&p_CODIGO=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos != "" && datos != null) {
                        actualizar = true;

                        $('#txtcodigo').val(datos[0].CODIGO);
                        if (datos[0].ESTADO == "ACTIVO") {
                            $('#uniform-chkactivo span').removeClass().addClass("checked");
                            $('#chkactivo').attr('checked', true);
                        } else {
                            $('#uniform-chkactivo span').removeClass();
                            $('#chkactivo').attr('checked', false);
                        }
                        $('#txtdescripcion').val(datos[0].DESCRIPCION);
                        $('#txtcosu').val(datos[0].CODIGO_SUNAT);
                        
                        $("#grabar").html("<i class='icon-pencil'></i> Actualizar");
                        $("#grabar").attr("href", "javascript:Actualizar();");
                        

                    }

                },
                error: function (msg) {
                    alertCustom("Error al obtener datos de Tipos de Sistemas.");
                }

            });

        }
    }


    return {
        init: function () {
            eventoControles();
            cargaInicial();
            plugins();
        }
    };
}();






var NSLMODL = function () {

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
            { data: "NOMBRE" },
            { data: "NOMBRE_SISTEMA" },
             { data: "SISTEMA", visible:false },
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
                    var sistema = row.SISTEMA;
                    window.location.href = '?f=nsmmodl&codigo=' + code + '&sist=' + sistema;

                }



            });
        

      

            $('#tblBandeja tbody').on('click', 'a', function () {

                $(this).parent().parent().addClass('selected');


                var pos = table.api(true).row($(this).parent().parent()).index();
                var row = table.fnGetData(pos);
                var cod = row.CODIGO;
                var sistema = row.SISTEMA;

                Bloquear("ventana");
                $.ajaxSetup({ async: false });
                $.post("vistas/NS/ajax/NSMMODL.ASHX", { flag: 3, codi: cod, sist:sistema },
                    function (res) {
                        Desbloquear("ventana");
                        if (res != null) {

                            if (res == "I") res = "INACTIVO";
                            else res = "ACTIVO";


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


var NSMMODL = function () {

    let sistemaActual = '';

    var cargacombos = function () {
        $.ajaxSetup({ async: false });
       
        $.post("vistas/NS/ajax/NSMMODL.ASHX", { flag: 4 },
            function (res) {

                $("#slcsistema").html(res);
                $("#slcsistema").select2();
               
            });


        $.ajaxSetup({ async: true });

        $("#slcsistema").change(function () {

            var cod = ObtenerQueryString("codigo");
            var sistema = ObtenerQueryString("sist");

            if (sistema != $(this).val()) {
                if ($("#txtcodigo").val() != "" && $(this).val() != "") {
                    $.ajaxSetup({ async: false });
                    $.post("vistas/NS/ajax/NSMMODL.ASHX", { flag: 5, codi: $("#txtcodigo").val(), sist: $(this).val() },
                      function (res) {

                          if (res == "error") {

                              alertCustom("El código " + $("#txtcodigo").val() + " con sistema " + $("#slcsistema option[value=" + $("#slcsistema").val() + "]").html() + "  ya se encuentra registrado, porfavor intente otro");
                              //$("#slcsistema").select2('val', '');
                              $('#txtcodigo').val('');
                          }

                      });
                    $.ajaxSetup({ async: true });
                } else {
                    if ($("#txtcodigo").val() != "") { $(this).select2("val", ""); }
                }

            }
        });

  
    }

    var cargainicial = function () {



        var cod = ObtenerQueryString("codigo");
        var sistema = ObtenerQueryString("sist");
        var varex = ObtenerQueryString("ex");

        if (ObtenerQueryString("f") == "nsmmodl") {

            verificacodigos();
        }

        if (cod != undefined) {

            $('#btnGrabar').hide();
            $('#btnActualizar').show();

            if (varex == '1') {
                exito();
            }

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMMODL.ASHX?codigo=" + cod+"&sist="+sistema,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").attr("disabled", true);
                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].NOMBRE);

                    $("#slcsistema").select2("val", datos[0].SISTEMA);
                    sistemaActual = datos[0].SISTEMA;

                    $("#txtareadescripcion").val(datos[0].DESCRIPCION);

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }
        else {
            $('#btnGrabar').show();
            $('#btnActualizar').hide();
        }
    }

    var plugins = function () {

        $('#txtcodigo').inputmask({ "mask": "L", "repeat": 1, "greedy": false });
        //$("#txtnombre").focus(function () { $(this).inputmask({ "mask": "l", "repeat": 150, "greedy": false }); })
        $('#txtnombre').inputmask({ "mask": "L", "repeat": 150, "greedy": false });
        
    }


    var eventoControles = function () {

        $("#btnGrabar").on("click", function () {
            Crear();            
        });

        $("#btnActualizar").on("click", function () {
            Actualizar();
        });

    }

    var verificacodigos = function () {

        $("#txtcodigo").keypress(function (e) {

            if (!/[A-Za-z]/.test(String.fromCharCode(e.keyCode))) {

                return false;
            } else {

                if ($("#slcsistema").val() != "") {
                    $.post("vistas/NS/ajax/NSMMODL.ASHX", { flag: 5, codi: String.fromCharCode(e.keyCode).toUpperCase(), sist: $("#slcsistema").val() },
                        function (res) {

                            if (res == "error") {
                                infoCustom("El código " + String.fromCharCode(e.keyCode).toUpperCase() + " con sistema " + $("#slcsistema option[value=" + $("#slcsistema").val() + "]").html() + "  ya se encuentra registrado, porfavor intente otro");
                                $("#txtcodigo").val("");
                            }

                        });
                }

            }

        });
    }

    var Crear = function() {

        var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
        var p_codi = $('#txtcodigo').val();
        var p_nombre = $('#txtnombre').val();
        var p_sistema = $('#slcsistema').val();
        var p_descripcion = $('#txtareadescripcion').val();
        var p_user = $('#ctl00_lblusuario').html();

        if (vErrors(["txtcodigo", "slcsistema", "txtnombre"])) {
            Bloquear("ventana");
            var data = new FormData();
            data.append('flag', "1");
            data.append('nomb', p_nombre);
            data.append('user', p_user);
            data.append('acti', p_acti);
            data.append('codi', p_codi);
            data.append('sist', p_sistema);
            data.append('desc', p_descripcion);

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMMODL.ASHX",
                data: data,
                contentType: false,
                processData: false,
                cache: false,
                async: false,
                success: function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        if (res != "") {
                            exito();
                            $('#btnGrabar').hide();
                            $('#btnActualizar').show();
                            sistemaActual = p_sistema;
                            verificacodigos();
                            $("#txtcodigo").attr("disabled", true);
                        } else {
                            noexito();
                        }
                    }
                    else {
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexito();
                }
            });

        }
    }

    var Actualizar =  function() {
        var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
        var p_codi = $('#txtcodigo').val();
        var p_nombre = $('#txtnombre').val();
        var p_sistema = $('#slcsistema').val();
        var p_descripcion = $('#txtareadescripcion').val();
        var p_user = $('#ctl00_lblusuario').html();

        if (vErrors(["txtcodigo", "slcsistema", "txtnombre"])) {
            Bloquear("ventana");


            var data = new FormData();
            data.append('flag', "2");
            data.append('nomb', p_nombre);
            data.append('user', p_user);
            data.append('acti', p_acti);
            data.append('codi', p_codi);
            data.append('sist', sistemaActual);
            data.append('desc', p_descripcion);
            data.append('sist_new', p_sistema);

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMMODL.ASHX",
                data: data,
                contentType: false,
                processData: false,
                cache: false,
                async: false,
                success: function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        if (res = "OK") {          
                            if (p_sistema == sistemaActual) {
                                exito();
                            }
                            else {
                                window.location.href = '?f=nsmmodl&codigo=' + p_codi + '&sist=' + p_sistema + '&ex=1';  
                            }
                            
                        }
                        else {
                            noexito();
                        }
                    }
                    else {
                        noexito();
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana");
                    noexito();
                }
            });

        }
    }


    return {
        init: function () {
            plugins();
            eventoControles();
            cargacombos();
            cargainicial();                 
        }
    };


}();
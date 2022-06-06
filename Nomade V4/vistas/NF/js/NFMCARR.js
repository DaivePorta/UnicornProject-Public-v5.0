function Actualizar() {
    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var codi = $('#txtcodigo').val();
    var cMTC = $('#txtcodMTC').val();
    var user = $('#ctl00_lblusuario').html();
    var nomb = $('#txtnombre').val();
    var defi = $('#txtdefinicion').val();



    if (vErrors(["txtnombre", "txtcodMTC"])) {
                   
        Bloquear("ventana");
        var data = new FormData();

                   data.append('flag', 2);
                   data.append('user', user);
                   data.append('acti', acti);
                   data.append('codigo', codi);
                   data.append('nomb', nomb);
                   data.append('defi', defi);
                   data.append('cmtc', cMTC);
                   data.append('img', $("#btnimgcarr")[0].files[0]);
                   data.append('ruta', $("#imgcarr").attr("src"));

                    $.ajax({

                        url: "vistas/NF/ajax/NFMCARR.ASHX",
                        type: 'POST',
                        contentType: false,
                        data: data,
                        processData: false,
                        cache: false,
                        success:
                        function (res) {

                            Desbloquear("ventana");
                            if (res = "OK") {
                                exito();
                                $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                                $("#grabar").attr("href", "javascript:Actualizar();");
                            } else {
                                noexito();
                            }
                        }
            });
    }

}


function Crear() {

    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var cMTC = $('#txtcodMTC').val();
    var user = $('#ctl00_lblusuario').html();
    var nomb = $('#txtnombre').val();
    var defi = $('#txtdefinicion').val();

    if (vErrors(["txtnombre", "txtcodMTC"])) {
        Bloquear("ventana");
        var data = new FormData();

        data.append('flag', 1);
        data.append('user', user);
        data.append('acti', acti);
        data.append('nomb', nomb);
        data.append('defi', defi);
        data.append('cmtc', cMTC);
        data.append('img', $("#btnimgcarr")[0].files[0]);
        data.append('ruta', $("#imgcarr").attr("src"));

        $.ajax({

            url: "vistas/NF/ajax/NFMCARR.ASHX",
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success:
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    $("#txtcodigo").val(res);
                } else {
                    noexito();
                }
                }
            });
    }
}


var NFMCARR = function () {

    var cargainicial = function () {
        inputFile("btnimgcarr", "imgcarr", "../../recursos/img/500x300.gif");
      
        var cod = ObtenerQueryString("codigo");

        if (cod != undefined) {
            $("#btnimgcarr").attr("style", "display:block;");
            $("#btnimgcarr").removeAttr("disabled");

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NF/ajax/NFMCARR.ASHX?codigo=" + cod+"&flag=6",
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].CARROCERIA);
                    $("#txtdefinicion").val(datos[0].DESCRIPCION);
                    $("#txtcodMTC").val(datos[0].MTC);
                    $("#imgcarr").attr("src",datos[0].IMAGEN);


                    if (datos[0].ACTIVO == "ACTIVO") {

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


        
        /*****************galeria******************/
        //inputFile("btnimgs", "img");

        //$("#btneliminar").click(function () {

        //    var idimg,rutaelim;
        //    for (var i = 0; i < $("#galeria").children().length; i++) { if ($($("#galeria").children()[i]).attr("class") == "active") { rutaelim=$($("#galeria").children()[i]).attr("src"); idimg=$($("#galeria").children()[i]).attr("id"); } }
            
        //    Bloquear("ventana");



        //    $.post("vistas/NF/ajax/NFMCARR.ASHX", { flag: 7, codigo: idimg,rutaelim: rutaelim},
        //        function (res) {
        //            exito();
        //            Desbloquear("ventana");
        //         //   cargarimagenes();

        //        });

        //});


        

      

            //guarda img
    //$("#btnimgs").parent().parent().change(function () {
    //    var nomnvo = $("#btnimgs").val().split("\\")[2];
    //    for (var i = 0; i < $("#galeria").children().length; i++) { if ($($("#galeria").children()[i]).attr("src").split("/").reverse()[0] == nomnvo) { alertCustom("Este archivo ya se encuentra agregado."); $("#btnimgs").val(""); } }

    //        if ($("#btnimgs").val() != "" ) {

    //            var p_user = $('#ctl00_lblusuario').html();
    //            var p_codigo = $('#txtcodigo').val();

    //            var data = new FormData();
    //            data.append('flag', 4);
    //            data.append('img', $("#btnimgs")[0].files[0]);
    //            data.append('user', p_user);
    //            data.append('codigo', p_codigo);
    //            $.ajax({

    //                url: "vistas/NF/ajax/NFMCARR.ASHX",
    //                type: 'POST',
    //                contentType: false,
    //                data: data,
    //                processData: false,
    //                cache: false,
    //                success:
    //                function (res) {
    //                    exito();
    //                   cargarimagenes();
    //                    $("#btnimgs").parent().siblings("span").remove();
    //                    $("#btnimgs").val("");
    //                }
    //            });
    //        }
            
    //    });

    //$("#btnimgcarr").click(function () {
    //    //carga img
    //    $("#myModalLabel").html("IMAGENES DE CARROCERIA " + $("#txtnombre").val());
    //    if ($('#txtcodigo').val() != "") {
    //     cargarimagenes();
            
    //    }
    //});
        /***************************************/



    }


  


    var plugins = function () {

        aMayuscula(":input");

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 60, "greedy": false }); });
        $('#txtcodMTC').focus(function () { $(this).inputmask({ "mask": "P", "repeat": 4, "greedy": false }); });

    }


    return {
        init: function () {
            cargainicial();
          
            plugins();
        }
    };
}();

var NFLCARR = function () {

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
                { data: "CARROCERIA" },
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




        //tabla de la vista listarempresa



    
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
                 
                    window.location.href = '?f=nfmcarr&codigo=' + code;
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
                $.post("vistas/NF/ajax/NFMCARR.ASHX", { flag: 3, codigo: cod },
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
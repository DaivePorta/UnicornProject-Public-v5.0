var NCMBATP = function () {
    var cont_01;
    var datai;
    var arreglo=[];

    var cargainicial = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMBATC.ashx?opcion=6",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                datai = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });

        var buildata = function () {
            var source = [];
            var items = [];

            //se construye el arbol

            for (i = 0; i < datai.length; i++) {
                var item = datai[i];
                var label = item["nombreproceso"];
                var parentid = item["codpadre"];
                var id = item["codproceso"];
                var img = '../recursos/img/Proceso.png';


                if (items[parentid]) {
                    var item = { parentid: parentid, label: label, item: item, icon: img };
                    if (!items[parentid].items) {
                        items[parentid].items = [];
                    }
                    items[parentid].items[items[parentid].items.length] = item;
                    items[id] = item;
                }
                else {
                    items[id] = { parentid: parentid, label: label, item: item, icon: img };
                    source[id] = items[id];
                }

            }

            return source;
        }

        var source = buildata();
        //$('#jqxTree').jqxExpander({ showArrow: false, toggleMode: 'none', width: '300px', height: '370px' });
        //$('#jqxTree').jqxTree({ source: source, hasThreeStates: true, checkboxes: true, width: '350px' });
        $('#jqxTree').jqxTree({ source: source,  width: '350px' });
        $('#jqxTree').css('visibility', 'visible');
        //$('#jqxTree').jqxTree('selectItem', null);

        cont_01 = 0;
        
    }

    var iniciomsjproceso = function () {

        $('#lblProceso').html('<H1>Inicio del Proceso</H1>');
    }

    var inicioprogress = function ()
    {
        $.getScript("../../../recursos/plugins/jqwidgets/jqxprogressbar.js")
            .done(function (script, textStatus) {
                $("#jqxProgressBar").jqxProgressBar({ width: 600, height: 20, value: 20 });
            });
      
    }

    var seleccionarcheck = function () {
        var html = '';
        var ban = false;

        $('#jqxTree').on('expand', function (event) {
            var args = event.args;
            var item = $('#jqxTree').jqxTree('getItem', args.element);
            
            return false;

            $.each(arreglo, function (indice, contenido) {
                if (contenido == item.label) {
                     ban = true;
                }
            });


            if (!ban) {
                cont_01 = cont_01 + 1;
                html = "<div id=\'jqxWidget_" + cont_01 + "\' style='font-size: 13px; font-family: Verdana; float: left;'> " +
                                "<div class='span12'> " +
                                    "<div class='row-fluid'> " +
                                        "<div class='span12'> " +
                                               "<label id=\'lblProceso_" + cont_01 + "\' class='control-label'></label> " +
                                        "</div> " +
                                    "</div> " +
                                    "<div class='row-fluid'> " +
                                         "<div class='span12'> " +
                                             "<div style='margin-top: 10px; overflow: hidden;' id=\'jqxProgressBar_" + cont_01 + "\'></div> " +
                                         "</div> " +
                                    "</div> " +
                                "</div> " +
                            "</div>' ";

                $('#contenedor').append(html);
                $('#lblProceso_' + cont_01).html(item.label);

                arreglo[cont_01] = item.label;

                $.getScript("../../../recursos/plugins/jqwidgets/jqxprogressbar.js")
                    .done(function (script, textStatus) {
                        $("#jqxProgressBar_" + cont_01 + "").jqxProgressBar({ width: 600, height: 20, value: 20 });
                    });
            }
        });

        $('#jqxTree').on('collapse', function (event) {
            var args = event.args;
            var item = $('#jqxTree').jqxTree('getItem', args.element);
            return false;

            $.each(arreglo, function (indice, contenido) {
                if (contenido == item.label) {
                    return false;
                }
            });

            cont_01 = cont_01 + 1;
            html="<div id=\'jqxWidget_" + cont_01 + "\' style='font-size: 13px; font-family: Verdana; float: left;'> " +
                            "<div class='span12'> " +
                                "<div class='row-fluid'> " +
                                    "<div class='span12'> " +
                                           "<label id=\'lblProceso_" + cont_01 + "\' class='control-label'></label> " +
                                    "</div> " +
                                "</div> " +
                                "<div class='row-fluid'> " +
                                     "<div class='span12'> " + 
                                         "<div style='margin-top: 10px; overflow: hidden;' id=\'jqxProgressBar_" + cont_01 + "\'></div> " +
                                     "</div> " +
                                "</div> " +
                            "</div> " + 
                        "</div>' ";

            $('#contenedor').append(html);
            $('#lblProceso_' + cont_01).html(item.label);

            arreglo[cont_01] = item.label;

            $.getScript("../../../recursos/plugins/jqwidgets/jqxprogressbar.js")
                .done(function (script, textStatus) {
                    $("#jqxProgressBar_" + cont_01 + "").jqxProgressBar({ width: 600, height: 20, value: 20 });
                });

            $("#jqxProgressBar_" + cont_01 + "").jqxProgressBar({ value: 0 });

        });

        $('#jqxTree').on('select', function (event) {
            //var checked = event.args.checked;
            var ban = false;
            var args = event.args;
            var item;
            //if (checked) {
                item = $('#jqxTree').jqxTree('getItem', args.element);

                $.each(arreglo, function(indice, contenido){
                    if (contenido==item.label)
                    {
                         ban = true;
                    }
                });


                if (!ban){
                    cont_01 = cont_01 + 1;
                    html="<div id=\'jqxWidget_" + cont_01 + "\' style='font-size: 13px; font-family: Verdana; float: left;'> " +
                                    "<div class='span12'> " +
                                        "<div class='row-fluid'> " +
                                            "<div class='span12'> " +
                                                   "<label id=\'lblProceso_" + cont_01 + "\' class='control-label'></label> " +
                                            "</div> " +
                                        "</div> " +
                                        "<div class='row-fluid'> " +
                                             "<div class='span12'> " + 
                                                 "<div style='margin-top: 10px; overflow: hidden;' id=\'jqxProgressBar_" + cont_01 + "\'></div> " +
                                             "</div> " +
                                        "</div> " +
                                    "</div> " + 
                                "</div>' ";

                    $('#contenedor').append(html);
                    $('#lblProceso_' + cont_01).html(item.label);
                    arreglo[cont_01]=item.label;

                    $.getScript("../../../recursos/plugins/jqwidgets/jqxprogressbar.js")
                        .done(function (script, textStatus) {
                            $("#jqxProgressBar_" + cont_01 + "").jqxProgressBar({ width: 600, height: 20, value: 0 });
                        });

                    $("#jqxProgressBar_" + cont_01 + "").jqxProgressBar({ value: 0 });
                }
            //}
        });


    }

    var eventos = function () {

        $('#procesar').click(function () {
            var n = arreglo.length;

            if (n < 2) {
                alertcustom('No ha seleccionado ningun proceso');
                return false;
            }
            else {
                $('#P1').append('Deseas Procesar la Informacion?');
                $("#modalconfir").modal('show');
            }
        });

        $('#rptasi').click(function () {
            procesamiento();
            $("#modalconfir").modal('hide');
        });
    }

    var procesamiento = function () {
        var nombreproc = '';
        var label = '';
        $.each(arreglo, function (indice, contenido) {
            if (contenido != undefined) {
                nombreproc = '';

                $.ajax({
                    type: "post",
                    url: "vistas/NC/ajax/NCMBATP.ASHX?opcion=1&nombreproc=" + contenido,
                    contentType: "application/json;",
                    dataType: "json",
                    async: false,
                    success: function (datos) {
                        nombreproc = datos[0].NombreProcedure;
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });

                if (nombreproc != '') {

                    Bloquear("ventana");
                    $.ajaxSetup("async", false);
                    $.post("vistas/NC/ajax/NCMBATP.ASHX", { opcion: 2, nombreproc: nombreproc },
                            function (res) {                               
                                if (res = "OK") {
                                    label = $('#lblProceso_' + indice).html();
                                    $('#lblProceso_' + indice).html(label + '  Estado:OK');
                                    $("#jqxProgressBar_" + indice + "").jqxProgressBar({ value: 100 });
                                } else {
                                    $('#lblProceso_' + indice).html(label + '  Estado: Error ' + res);
                                    $("#jqxProgressBar_" + indice + "").jqxProgressBar({ value: 100 });
                                }
                            });
                    Desbloquear("ventana");

                }

            }
        });
    }

    var plugins = function () {
        $('#txtFechaProceso').datepicker();
        $('#txtFechaProceso').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        //inifechas("txtFechaProceso");

    }

    return {

        init: function () {
            cargainicial();
            iniciomsjproceso();
            inicioprogress();
            seleccionarcheck();
            eventos();
            plugins();
           
        }
    };
}();
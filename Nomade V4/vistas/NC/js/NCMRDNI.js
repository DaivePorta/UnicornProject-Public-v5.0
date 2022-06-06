var NCMRDNI = function () {

    var imagenVacia = "data:image/gif;base64,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";

    var cargarInputsPersona = function () {

        var jsonPersonas;
        var arrayPersonas = new Array();

        function cargarJson() {
            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMRDNI.ashx?flag=L",
                contenttype: "application/json;",
                datatype: "json",
                async: false,

                success: function (datos) {
                    if (datos != null && datos != "") {

                        jsonPersonas = datos;

                    }
                }
            });
        }

        function cargaAutoCompleteInputs() {

            var json = jsonPersonas;
            if (json != null) {
                json.filter(function (e) { if (arrayPersonas.indexOf(e.NOMBRE) < 0) { arrayPersonas.push(e.NOMBRE); } });
            }

            $(".personas").typeahead({ source: arrayPersonas }, { highlight: true, hint: true });

            $(".personas").keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"))

            }).change(function () {
                var actual = $(this);
                var encontrado = false;
                json.filter(function (d) {
                    if (d.NOMBRE == actual.val()) {
                        actual.attr("valor", d.PIDM);
                        encontrado = true;
                        cargarImagenes(d.PIDM);

                    }
                    if (!encontrado) {
                        actual.removeAttr("valor");
                    }
                });
                if (actual.val() == "") { actual.removeAttr("valor"); }
            });



        }


        function cargarImagenes(PIDM) {

            $.ajax({
                type: "GET",
                url: "vistas/NC/ajax/NCMRDNI.ASHX",
                data: {
                    flag: 2,
                    codigo: PIDM
                },
                contentType: "application/json;",
                dataType: "json",
                async:false,
                success:
                    function (datos) {
                        if (datos != null) {

                            $("#imganverso").attr("src", (datos[0].RUTA_ANVERSO == "" ? imagenVacia : datos[0].RUTA_ANVERSO));

                            $("#imgreverso").attr("src", (datos[0].RUTA_REVERSO == "" ? imagenVacia : datos[0].RUTA_REVERSO));
                        }
                        else {
                            $("#imganverso").attr("src", imagenVacia);
                            $("#imgreverso").attr("src", imagenVacia);
                        }
                },
                error: function () { alert("error!"); }
            });


        }

        cargarJson();
        cargaAutoCompleteInputs();
    }

    

    var cargaInicial = function () {

      function btnBuscaPersonas() {

        $(".buscaPersona").click(function () {
            var campo = $($(this).siblings("input"));
            if ($.trim(campo.val()) != "") {
                var pidm = campo.attr("valor");
                if (pidm != undefined) {
                    BuscarEmpresa(pidm);
                } else {
                    campo.parents(".control-group").addClass("error");
                    alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese informaci&oacute;n v&aacute;lida!");
                    campo.focus(function () { $(this).parents(".control-group").removeClass("error"); });
                }
            } else {
                campo.parents(".control-group").addClass("error");
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese el campo requerido!");
                campo.focus(function () { $(this).parents(".control-group").removeClass("error"); });
            }
        });

        }



        inputFile("reverso", "imgreverso", imagenVacia,500,300);
        inputFile("anverso", "imganverso", imagenVacia,500,300);



        btnBuscaPersonas();

        if (ObtenerQueryString("codigo") != undefined) {

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMRDNI.ASHX?codigo=" + ObtenerQueryString("codigo") + "&flag=3",
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {

                    $("#txtpersona")
                        .val(datos[0].NOMBRE)
                        .attr("valor", datos[0].PIDM);

                    $(".buscaPersona").change();
                    $("#txtpersona").keyup().siblings("ul").children("li").click();
                }
            });

        }

    }

    return {
        init: function () {
              cargarInputsPersona();
              cargaInicial();
        }
    };
}();

function GrabarDNI() {
    var pidm = $("#txtpersona").attr("valor");
    var rima = $("#imganverso").attr("src");
    var rimr = $("#imgreverso").attr("src");
    var user = $('#ctl00_lblusuario').html();
    var flag = "1";


    var data = new FormData();
    data.append('flag', flag);
    data.append('codigo', pidm);
    data.append('ruima', rima);
    data.append('ruimr', rimr);
    data.append('usuario', user);

    $.ajax({
        
        url: "vistas/NC/ajax/NCMRDNI.ashx",
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false,

        success: function (res) {
            var datos = $.parseJSON(res);
            if (datos[0].ESTADO == "OK") {

                    $("#imganverso").attr("codigo", datos[0].CODIGO_ANVERSO);
                    $("#imgreverso").attr("codigo", datos[0].CODIGO_REVERSO);              
                    exito();

            }
        }
    });
}

var NCLRDNI = function () {

    var fillBandejaImgDni = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJSON').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "DNI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOMBRE" }
               
            ]

        }



        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');



        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.PIDM;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmrdni&codigo=' + codigo;
            }

        });



    }




    return {
        init: function () {

            fillBandejaImgDni();
        }
    };

}();
var NCMNOTA = function () {

  
    var cargarInputsPersona = function () {

        var jsonPersonas;
        var arrayPersonas = new Array();

        function cargarJson() {
            $.ajax({
                type: "post",
                url: "vistas/NA/ajax/NAMINSA.ashx?OPCION=LPER",
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
                json.filter(function (e) {
                    if (arrayPersonas.indexOf(e.RAZON_SOCIAL) < 0 && JSON.stringify(json_rt).indexOf(e.RAZON_SOCIAL) < 0) {
                        arrayPersonas.push(e.RAZON_SOCIAL);
                    }
                });
            }

            $(".personas").typeahead({ source: arrayPersonas }, { highlight: true, hint: true });

            $(".personas").keyup(function () {
                $(this).siblings("ul").css("width", $(this).css("width"))

            }).change(function () {
                var actual = $(this);
                var encontrado = false;
                json.filter(function (d) {
                    if (d.RAZON_SOCIAL == actual.val()) {
                        actual.attr("valor", d.PIDM);
                        encontrado = true;
              

                    }
                    if (!encontrado) {
                        actual.removeAttr("valor");
                    }
                });
                if (actual.val() == "") { actual.removeAttr("valor"); }
            });



        }


        cargarJson();
        cargaAutoCompleteInputs();
    }

    
    var fillTablaMNota = function () {

        var parms = {
            data: null,
            columns: [

                { data: "NOMBRE" },
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');


                    }
                },
                { data: "NUMERO" },
                { data: "DIRECCION" },
                { data: "TELEFONO" },
                {
                    data: "EMAIL"
                }

            ],
            stateSave: false

        }



        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style').css("border-collapse", "collapse");

        Cargar_tabla();

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                $("#cod_actual").val(row.CODIGO);
   
            }

        });


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
        });;

    }

   

        btnBuscaPersonas();
    }



    $("#agregaPersona").click(function () {

        var p_pidm = $('#txtpersona').attr("valor");

        var p_user = $('#ctl00_lblusuario').html();

        if (vErrors("txtpersona")) {
            Bloquear("ventana");
            $.post("vistas/NC/ajax/NCMNOTA.ASHX", { flag: 1,  user: p_user, pidm: p_pidm },
                function (res) {
                    Desbloquear("ventana");
                    if (res = "OK") {
                        exito();
                        Cargar_tabla();
                    } else {
                        noexito();
                    }
                });
        }

    });


    $("#eliminaPersona").click(function () {

        var p_codigo = $("#cod_actual").val();

        if (p_codigo!="") {
            Bloquear("ventana");
            $.post("vistas/NC/ajax/NCMNOTA.ASHX", { flag: 2, codigo:  p_codigo},
                function (res) {
                    Desbloquear("ventana");
                    if (res = "OK") {
                        exito();
                        $("#cod_actual").val("");
                        Cargar_tabla();
                    } else {
                        noexito();
                    }
                });
        }else{
        
            alertCustom("Seleccione un elemento de la grilla!");
            
        }

    });

    json_rt = null;
    function Cargar_tabla() {
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMNOTA.ASHX?flag=3",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                json_rt = datos;

                oTable.fnClearTable()

                if (json_rt != null) { oTable.fnAddData(json_rt); $("#tblBandeja").removeAttr("style");}


            }
        });

    }





    return {
        init: function () {
              fillTablaMNota();
              cargarInputsPersona();
              cargaInicial();
           
        }
    };

}();




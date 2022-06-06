function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_nombre = $('#txtnombre').val();
    var p_acronimo = $('#txtacronimo').val();
    var p_icono = $('#txticono').val();
    var p_descripcion = $('#txtareadescripcion').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_tipo = $("input[name='tipo']:checked").val();

    if (vErrors(["txtcodigo", "txtacronimo", "txtnombre"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMSIST.ASHX", { flag: 2, nomb: p_nombre, user: p_user, acti: p_acti, codi: p_codi, acro: p_acronimo, desc: p_descripcion, icon: p_icono, tipo: p_tipo },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    verificacodigos();
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();
    var p_nombre = $('#txtnombre').val();
    var p_icono = $('#txticono').val();
    var p_acronimo = $('#txtacronimo').val();
    var p_descripcion = $('#txtareadescripcion').val();
    var p_user = $('#ctl00_lblusuario').html();
    var p_tipo = $("input[name='tipo']:checked").val();

    if (vErrors(["txtcodigo", "txtacronimo", "txtnombre"])) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMSIST.ASHX", { flag: 1, nomb: p_nombre, user: p_user, codi: p_codi, acti: p_acti, acro: p_acronimo, desc: p_descripcion , icon: p_icono, tipo: p_tipo },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    verificacodigos();
           
                } else {
                    noexito();
                }
            });
    }
}


function verificacodigos() {
    $.post("vistas/NS/ajax/NSMSIST.ASHX", { flag: 4 },
        function (res) {
 
            var str = "[" + res.toString() + "]";
            var reg = new RegExp(str);

            $("#txtcodigo").keypress(function (e) {
                //  alert(String.fromCharCode(e.keyCode).toUpperCase());
                if (!/[A-Za-z]/.test(String.fromCharCode(e.keyCode))) {

                    return false;
                }

                if (reg.test(String.fromCharCode(e.keyCode).toUpperCase())) {
                    alertCustom("El código " + String.fromCharCode(e.keyCode).toUpperCase() + " ya se encuentra registrado, por favor intente otro");
                    return false;
                }
            });
        });
}

var NSMSIST = function () {

    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (ObtenerQueryString("f") == "nsmsist") {

            verificacodigos();
        }

        if (cod != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NS/ajax/NSMSIST.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].NOMBRE);
                    $("#txtacronimo").val(datos[0].ACRONIMO);
                    $("#txtareadescripcion").val(datos[0].DESCRIPCION);
                    $("#txticono").val(datos[0].ICONO);

                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    var icono = $("#txticono").val();
                    $("#seleccionado").addClass(icono);

                    if (datos[0].TIPO_IND == "W") {
                        $('#uniform-rbWeb span').removeClass().addClass("checked");
                        $('#rbWeb').attr('checked', true);
                        $('#uniform-rbEscritorio span').removeClass();
                        $('#rbEscritorio').attr('checked', false);
                    } else {
                        $('#uniform-rbEscritorio span').removeClass().addClass("checked");
                        $('#rbEscritorio').attr('checked', true);
                        $('#uniform-rbWeb span').removeClass();
                        $('#rbWeb').attr('checked', false);                       
                    }
                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }
    }

    var plugins = function () {

        //aMayuscula(":input");

        $("#txtcodigo").attr("maxlength", "1");
        
        //$("#txtnombre").focus(function () { $(this).inputmask({ "mask": "L", "repeat":150 , "greedy": false }); })

        $('#txtacronimo').focus(function () { $(this).inputmask({ "mask": "L", "repeat":150 , "greedy": false }); })

    }

    var iconos = function () {
        $("#iconos i").click(function () {
            var clase = $(this).attr("class");
            $("#txticono").val(clase);
            var tam = clase.length;
            var texto = clase.substr(5,tam);
            $("#seleccionado").attr("class", clase);
        });
    }

    return {
        init: function () {
            cargainicial();
            plugins();
            iconos();
        }
    };


}();

var NSLSIST = function () {

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
                { data: "ACRONIMO" },
                {
                    data: "ICONO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },                
                {
                    data: "TIPO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
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
     
                    window.location.href = '?f=nsmsist&codigo=' + code;
                }
                

            });
        

    
            $('#tblBandeja tbody').on('click', 'a', function () {

                $(this).parent().parent().addClass('selected');


                var pos = table.api(true).row($(this).parent().parent()).index();
                var row = table.fnGetData(pos);
                var cod = row.CODIGO;

                Bloquear("ventana");
                $.ajaxSetup({ async: false });
                $.post("vistas/NS/ajax/NSMSIST.ASHX", { flag: 3, codi: cod },
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
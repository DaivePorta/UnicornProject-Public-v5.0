function Actualizar() {
    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var codi = $('#txtcodigo').val();
    var marc = $("#hddmarcas").val().split("|")[1].split(",")[$("#hddmarcas").val().split("|")[0].split(",").indexOf($('#txtmarca').val())];
    var user = $('#ctl00_lblusuario').html();
    var nomb = $('#txtnombre').val();
    var psec = $('#txtpseco').val();
    var pbru = $('#txtpbruto').val();
    var nasi = $('#txtnasientos').val();
    var carr = $('#slccarroceria').val();
    var p_larg = $('#txtlargo').val();
    var p_anch = $('#txtancho').val();
    var p_alto = $('#txtalto').val();
    var p_ejes = $('#txtNroEjes').val();

    var continuar = false;
    if (vErrors(["txtnombre", "txtmarca", "txtpseco", "txtpbruto", "txtancho", "txtlargo", "txtalto", "txtnasientos", "slccarroceria", "txtNroEjes"])) {
        if (parseFloat(pbru) > parseFloat(psec)) {
            continuar = true;
        } else {
            infoCustom2("Peso Bruto debe ser mayor que el Peso Neto");
            $('#txtpbruto').focus().select();
        }
    }
    if (continuar) {
        Bloquear("ventana");
        $.post("vistas/NF/ajax/NFMMOBU.ASHX", {
            flag: 2, user: user, acti: acti, codigo: codi, nomb: nomb, marc: marc,
            psec: psec,
            pbru: pbru,
            nasi: nasi,
            carr: carr,
            larg: p_larg,
            anch: p_anch,
            alto: p_alto,
            ejes: p_ejes
        }, function (res) {
            Desbloquear("ventana");
            var datos = JSON.parse(res);
            if (datos.length > 0) {
                if (datos[0].RESPUESTA == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");                   
                } else {
                    alertCustom(datos[0].CODIGO); //RESPUESTA DE ERROR
                }
            } else {
                noexito();
            }
            //if (res = "OK") {
            //    exito();
            //    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            //    $("#grabar").attr("href", "javascript:Actualizar();");
            //} else {
            //    noexito();
            //}
        });
    }
}


function Crear() {

    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var marc = $("#hddmarcas").val().split("|")[1].split(",")[$("#hddmarcas").val().split("|")[0].split(",").indexOf($('#txtmarca').val())];
    var user = $('#ctl00_lblusuario').html();
    var nomb = $('#txtnombre').val();
    var defi = $('#txtdefinicion').val();
    var psec = $('#txtpseco').val();
    var pbru = $('#txtpbruto').val();
    var nasi = $('#txtnasientos').val();
    var carr = $('#slccarroceria').val();
    var p_larg = $('#txtlargo').val();
    var p_anch = $('#txtancho').val();
    var p_alto = $('#txtalto').val();
    var p_ejes = $('#txtNroEjes').val();

    var continuar = false;
    if (vErrors(["txtnombre", "txtmarca", "txtpseco", "txtpbruto", "txtancho", "txtlargo", "txtalto", "txtnasientos", "slccarroceria", "txtNroEjes"])) {
        if (parseFloat(pbru) > parseFloat(psec)) {
            continuar = true;
        } else {
            infoCustom2("Peso Bruto debe ser mayor que el Peso Neto");
            $('#txtpbruto').focus().select();
        }
    }
    if (continuar) {
        Bloquear("ventana");
        $.post("vistas/NF/ajax/NFMMOBU.ASHX", {
            flag: 1, user: user, acti: acti, nomb: nomb, marc: marc,
            psec: psec,
            pbru: pbru,
            nasi: nasi,
            carr: carr,
            larg: p_larg,
            anch: p_anch,
            alto: p_alto,
            ejes: p_ejes
        }, function (res) {
            Desbloquear("ventana");
            var datos = JSON.parse(res);
            if (datos.length > 0) {
                if (datos[0].RESPUESTA == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").val(datos[0].CODIGO);
                } else {
                    alertCustom(datos[0].CODIGO); //RESPUESTA DE ERROR
                }
            } else {
                noexito();
            }           
        });
    }
}


function CrearMarca() {

    var p_acti = 'A';
    var p_nombre = $('#txtmarca').val();
    var p_user = $('#ctl00_lblusuario').html();

    //TO DO
    var data = new FormData();
    data.append('nomb', p_nombre);
    data.append('user', p_user);
    data.append('acti', p_acti);
    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NF/ajax/NFMMARC.ASHX?flag=1",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    })
   .success(function (datos) {
       Desbloquear("ventana");
       if (datos != null && datos.length > 0) {
           if (datos[0].RESPUESTA == "OK") {
               exito();      
           }
           else if (datos[0].RESPUESTA == "EXISTE") {
               infoCustom2("Ya existe una marca con ese Nombre pero puede que esté INACTIVA.");
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

}

function rptano() {
    $("#MarcnoExiste").modal('hide');
    // $("#txtmarca").focus();
    $("#txtmarca").val("");
}

function rptasi() {
    var nvamarca = $("#txtmarca").val();
    CrearMarca();
    cargamarcas();
    $("#txtmarca").val(nvamarca);
    $("#MarcnoExiste").modal('hide');
}

function cargamarcas() {
    Bloquear("ventana");
    $.ajaxSetup({ async: false });
    $.post("vistas/NF/ajax/NFMMOBU.ASHX", { flag: 5 }, function (res) {
        if (res != "error") {
            $("#hddmarcas").val(res);

            $("#controlmarca").html("");
            $("#controlmarca").html(" <input id=\"txtmarca\" type=\"text\" class=\"span12 typeahead\" placeholder=\"MARCA\"/>");
            aMayuscula("#txtmarca");
            $("#txtmarca").attr("disabled", false);

            $("#txtmarca").typeahead({ displayKey: 'value', source: res.split("|")[0].split(",") }, { highlight: true, hint: true });
            $("#txtmarca").keyup(function () { $(this).siblings("ul").css("width", $(this).css("width")) });

        }
    });
    $.ajaxSetup({ async: true });
    Desbloquear("ventana");

    //MOSTRAR MENSAJE CREAR MARCA VEHICULO
    $("#txtmarca").blur(function () {
        if ($("#txtmarca").siblings("ul").css("display") == "none" || $("#txtmarca").siblings("ul").html() == undefined) {

            if ($("#hddmarcas").val().split("|")[0].split(",").indexOf($('#txtmarca').val()) < 0 && $('#txtmarca').val() != "") {//buscar

                $("#mensajemodal").html("<p>La marca " + $('#txtmarca').val() + " no existe desea crearla?</p>");
                $("#MarcnoExiste").modal('show');
            }
        }
    });
}


var NFMMOBU = function () {

    var cargarcombos = function () {

        $.ajaxSetup({ async: false });
        $.post("vistas/NF/ajax/NFMMOBU.ASHX", { flag: 6 }, function (res) {
            $("#slccarroceria").html(res);
            $("#slccarroceria").select2({
                allowclear: true

            });
        });
        $.ajaxSetup({ async: true });

        cargamarcas();
    }


    var cargainicial = function () {

        var cod = ObtenerQueryString("codigo");

        if (cod != undefined) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NF/ajax/NFMMOBU.ASHX?codigo=" + cod + "&flag=4",
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtnombre").val(datos[0].MODELO);

                    $('#txtpseco').val(datos[0].PESO_SECO);
                    $('#txtpbruto').val(datos[0].PESO_BRUTO);
                    $('#txtnasientos').val(datos[0].ASIENTOS);
                    $('#txtNroEjes').val(datos[0].NRO_EJES);
                    
                    $("#txtmarca").val(datos[0].MARCA);
                    $('#slccarroceria').select2("val", datos[0].CARROCERIA);

                    $('#txtlargo').val(datos[0].LARGO);
                    $('#txtancho').val(datos[0].ANCHO);
                    $('#txtalto').val(datos[0].ALTO);

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
    }

    var plugins = function () {

        aMayuscula(":input");

        $("#txtnombre").focus(function () { $(this).inputmask({ "mask": "P", "repeat": 30, "greedy": false }); })
        $("#txtnasientos").focus(function () { $(this).inputmask({ "mask": "M", "repeat": 3, "greedy": false }); })
        $("#txtmarca").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 30, "greedy": false }); })

        $('#txtpseco').focus(function () {

            $(this).inputmask({ "mask": "M", "repeat": 16, "greedy": false });
        });

        $('#txtpbruto').focus(function () {

            $(this).inputmask({ "mask": "M", "repeat": 16, "greedy": false });
        });

        $('#txtlargo').focus(function () {

            $(this).inputmask({ "mask": "M", "repeat": 16, "greedy": false });
        });

        $('#txtancho').focus(function () {

            $(this).inputmask({ "mask": "M", "repeat": 16, "greedy": false });
        });

        $('#txtalto').focus(function () {

            $(this).inputmask({ "mask": "M", "repeat": 16, "greedy": false });
        });
    }

    return {
        init: function () {
            cargarcombos();
            cargainicial();
            plugins();
        }
    };

}();

var NFLMOBU = function () {

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
                { data: "MARCA" },
                { data: "CARROCERIA_NOMBRE" },

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
                window.location.href = '?f=nfmmobu&codigo=' + code;
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
            $.post("vistas/NF/ajax/NFMMOBU.ASHX", { flag: 3, codigo: cod },
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
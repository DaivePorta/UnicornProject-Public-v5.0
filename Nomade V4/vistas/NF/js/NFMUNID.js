//UNIDADES DE VEHICULOS
function Actualizar() {
    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var codi = $('#txtcodigo').val();
    var user = $('#ctl00_lblusuario').html();
    var p_fein = $('#txtfechai').val();
    var p_fete = $('#txtfechat').val();
    var p_cmtc = $('#chkmtc').is(':checked') ? 'S' : 'N';
    var p_nuta = $('#txtpartida').val();
    var p_plac = $('#txtplaca').val();
    var p_anfa = $('#txtanho').val();
    var p_marc = $('#slcMarca').val();
    var p_mode = $('#slcModelo').val();
    var p_colo = $('#txtcolor').val();
    //var p_nuas = $('#txtasientos').val();
    // var p_pese = $('#txtpseco').val();
    // var p_pebu = $('#txtpbruto').val();
    var p_numo = $('#txtmotor').val();
    var p_nuse = $('#txtsech').val();
    var p_nuch = $('#txtsech').val();
    var p_sgps = $('#slcGPS').val();
    var p_fegp = $('#txtfechaGPS').val();
    var p_prop = $('#txtpropietario').attr("pidm");
    var p_coso = $('#txtcompa').val();
    var p_poso = $('#txtpoliza').val();
    var p_feso = $('#txtcompra').val();
    //var p_plat = $('#txtplataforma').val();
    //var p_fila = $('#slcFilas').val();
    var p_tiun = $('#slcTipo').val();
    // var p_chof = 0;//$('#').val();
    var p_empr = $('#cboEmpresa').val();
    var p_carmax = $('#txtCargaMaxima').val();
    var p_nro_cons = $('#txtNroConstancia').val();
    var p_fecha_rev = $('#txtFechaRev').val();
    var p_nro_rev = $('#txtNroRev').val();
    var p_combustible = $("#cboCombustible").val();

    if (vErrors(["cboEmpresa", "txtfechai", "txtpartida", "txtplaca", "txtanho", "slcMarca", "slcModelo", "txtcolor", "txtmotor", "slcGPS", "txtpropietario", "txtcompa", "slcTipo", "txtpoliza", "txtCargaMaxima", "cboCombustible"])) {


        Bloquear("ventana");
        $.post("vistas/NF/ajax/NFMUNID.ASHX", {
            flag: 2, user: user, acti: acti, codigo: codi,
            fein: p_fein,
            fete: p_fete,
            cmtc: p_cmtc,
            nuta: p_nuta,
            plac: p_plac,
            anfa: p_anfa,
            marc: p_marc,
            mode: p_mode,
            colo: p_colo,
            numo: p_numo,
            nuse: p_nuse,
            nuch: p_nuch,
            sgps: p_sgps,
            fegp: p_fegp,
            prop: p_prop,
            coso: p_coso,
            poso: p_poso,
            feso: p_feso,
            //plat: p_plat,
            //fila: p_fila,
            tiun: p_tiun,
            empr: p_empr,
            p_CARGA_MAXIMA: p_carmax,
            p_NRO_CONSTANCIA: p_nro_cons,
            p_FECHA_REV_TEC: p_fecha_rev,
            p_NRO_REV_TEC: p_nro_rev,
            p_COMBUSTIBLE: p_combustible
        },
            function (res) {
                Desbloquear("ventana");

                datos = JSON.parse(res);
                if (datos != null && datos.length > 0) {
                    if (datos[0].RESPUESTA == "OK") {
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                        $("#grabar").attr("href", "javascript:Actualizar();");
                        registraprop(p_prop, p_fein, p_empr);

                    } else if (datos[0].RESPUESTA == "EXISTE") {
                        infoCustom2("Ya existe un vehículo con esa Partida Registrar");
                    }
                    else {
                        alertCustom(datos[0].CODIGO);//Mensaje de error de bd
                    }
                } else {
                    noexito();
                }
            });
    }

}

function Crear() {

    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var user = $('#ctl00_lblusuario').html();
    var p_fein = $('#txtfechai').val();
    var p_fete = $('#txtfechat').val();
    var p_cmtc = $('#chkmtc').is(':checked') ? 'S' : 'N';
    var p_nuta = $('#txtpartida').val();
    var p_plac = $('#txtplaca').val();
    var p_anfa = $('#txtanho').val();
    var p_marc = $('#slcMarca').val();
    var p_mode = $('#slcModelo').val();
    var p_colo = $('#txtcolor').val();
    var p_numo = $('#txtmotor').val();
    var p_nuse = $('#txtsech').val();
    var p_nuch = $('#txtsech').val();
    var p_sgps = $('#slcGPS').val();
    var p_fegp = $('#txtfechaGPS').val();
    var p_prop = $('#txtpropietario').attr("pidm");
    var p_coso = $('#txtcompa').val();
    var p_poso = $('#txtpoliza').val();
    var p_feso = $('#txtcompra').val();
    //var p_plat = $('#txtplataforma').val();
    //var p_fila = $('#slcFilas').val();
    var p_tiun = $('#slcTipo').val();
    //var p_chof = 0;//$('#').val();
    var p_empr = $('#cboEmpresa').val();
    var p_carmax = $('#txtCargaMaxima').val();
    var p_nro_cons = $('#txtNroConstancia').val();
    var p_fecha_rev = $('#txtFechaRev').val();
    var p_nro_rev = $('#txtNroRev').val();
    var p_combustible = $("#cboCombustible").val();

    if (vErrors(["cboEmpresa", "txtfechai", "txtpartida", "txtplaca", "txtanho", "slcMarca", "slcModelo", "txtcolor", "txtmotor", "slcGPS", "txtpropietario", "txtcompa", "slcTipo", "txtpoliza", "txtcompra", "txtCargaMaxima", "cboCombustible"])) {
        Bloquear("ventana");
        $.post("vistas/NF/ajax/NFMUNID.ASHX", {
            flag: 1, user: user, acti: acti,
            fein: p_fein,
            fete: p_fete,
            cmtc: p_cmtc,
            nuta: p_nuta,
            plac: p_plac,
            anfa: p_anfa,
            marc: p_marc,
            mode: p_mode,
            colo: p_colo,
            numo: p_numo,
            nuse: p_nuse,
            nuch: p_nuch,
            sgps: p_sgps,
            fegp: p_fegp,
            prop: p_prop,
            coso: p_coso,
            poso: p_poso,
            feso: p_feso,
            //plat: p_plat,
            //fila: p_fila,
            tiun: p_tiun,
            //  chof: p_chof,
            empr: p_empr,
            p_CARGA_MAXIMA: p_carmax,
            p_NRO_CONSTANCIA: p_nro_cons,
            p_FECHA_REV_TEC: p_fecha_rev,
            p_NRO_REV_TEC: p_nro_rev,
            p_COMBUSTIBLE: p_combustible
        }, function (res) {
            Desbloquear("ventana");
            datos = JSON.parse(res);
            if (datos != null && datos.length > 0) {
                if (datos[0].RESPUESTA == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#btnimagenes").attr("style", "display:block;");
                    $("#btnimagenes").removeAttr("disabled");

                    registraprop(p_prop, p_fein, p_empr);

                    $("#btnchoferes").attr("style", "display:block;");
                    $("#btnchoferes").removeAttr("disabled");
                    $("#txtcodigo").val(datos[0].CODIGO);

                } else if (datos[0].RESPUESTA == "EXISTE") {
                    infoCustom2("Ya existe un vehículo con esa Partida Registrar");
                }
                else {
                    alertCustom(datos[0].CODIGO);//Mensaje de error de bd
                }
            } else {
                noexito();
            }
        });
    }
}

//PROPIETARIOS
function registraprop(p_pidm, p_feci, p_empr) {
    var p_user = $('#ctl00_lblusuario').html();
    $.post("vistas/NC/estereotipos/ajax/Propietario.ASHX", {
        flag: 1,
        pidm: p_pidm,
        feci: p_feci,
        user: p_user,
        acti: "A",
        fecf: "",
        empr: p_empr
    },
        function (res) {
            Desbloquear("ventana");
            if (res != "") {
                //   exito();
            } else {
                //  noexito();
            }
        });

}

function listartodosprop() {

    $("#myModalLabelprop").html("LISTA DE PROPIETARIOS");
    $("#subtitleemp").html("");
    $.post("vistas/NF/ajax/NFMUNID.ASHX", { flag: "5b" },
        function (res) {
            $("#divmodal").html("");
            $("#divmodal").html(res);
            var tablemod = $('#divmodal #tblbmodal').DataTable({

                "scrollCollapse": true,
                "paging": false,
                "info": false
            });

            $('#tblbmodal tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tablemod.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                $('#muestralistap').modal('hide');
                var IDPER2 = $(this).attr("id");


                $('#txtpropietario').attr("pidm", IDPER2);
                $('#txtpropietario').val($('#nom' + IDPER2).html());


            });

        });

    $("#btnlistarop").attr("href", "javascript:listarpropempr();");
    $("#btnlistarop").html("<i class=\"icon-minus\"></i> No listar Todos ");

}

function listarpropempr() {

    $("#myModalLabelprop").html("LISTA DE PROPIETARIOS");
    if ($("#cboEmpresa").val() != "") {
        $("#subtitleemp").html("EN " + $("#cboEmpresa option[value=" + $("#cboEmpresa").val() + "]").html());

        Bloquear("muestralistap");
        $.post("vistas/NF/ajax/NFMUNID.ASHX", { flag: 5, empr: $("#cboEmpresa").val() },
            function (res) {
                Desbloquear("muestralistap");

                $("#divmodal").html("");
                $("#divmodal").html(res);

                var tablemod = $('#divmodal #tblbmodal').DataTable({
                    "scrollCollapse": true,
                    "paging": false,
                    "info": false
                });

                $('#tblbmodal tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        tablemod.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }

                    $('#muestralistap').modal('hide');
                    var IDPER2 = $(this).attr("id");

                    $('#txtpropietario').attr("pidm", IDPER2);
                    $('#txtpropietario').val($('#nom' + IDPER2).html());

                });

            });

    } else { $("#divmodal").html("No existen propietarios para la empresa atual. Haga click en listar todos."); }

    $("#btnlistarop").attr("href", "javascript:listartodosprop();");
    $("#btnlistarop").html("<i class=\"icon-plus\"></i> Listar Todos");
}

// CHOFERES
function crearchofer() {
    var acti = $("#chkactchofer").is(':checked') ? 'A' : 'I';
    var chofer = $("#slcchofer").val();
    var turno = $("#slcturno").val();
    var fecha = $("#txtfechainchof").val();
    var user = $('#ctl00_lblusuario').html();
    var codi = $('#txtcodigo').val();

    if (vErrors(['slcchofer', 'slcturno', 'txtfechainchof'])) {

        Bloquear("ventana");
        Bloquear("muestralistach");
        $.post("vistas/NF/ajax/NFMUNID.ASHX", {
            flag: 15, user: user, acti: acti, codigo: codi, chof: chofer, fech: fecha, turn: turno
        },
                function (res) {
                    if (res != "") {
                        Desbloquear("ventana");
                        Desbloquear("muestralistach");
                        if (res.search("Duplicate entry") != -1) {
                            infoCustom2("Chofer ya está registrado");
                        } else {
                            exito();
                            $("#txtcodchofer").val(res);
                            $("#btngrch").html("<i class='icon-pencil'></i> Modificar");
                            $("#btngrch").attr("href", "javascript:actualizarchofer();");
                            $("#btnRecargarChoferes").hide();
                            $("#slcchofer").attr("disabled", "disabled");
                        }
                    }
                    else {
                        noexito();
                        Desbloquear("muestralistach");
                    }
                });
    }

}

function actualizarchofer() {
    var acti = $("#chkactchofer").is(':checked') ? 'A' : 'I';
    var turno = $("#slcturno").val();
    var fecha = $("#txtfechainchof").val();
    var user = $('#ctl00_lblusuario').html();
    var codi = $('#txtcodchofer').val();

    if (vErrors(['slcturno', 'txtfechainchof'])) {
        Bloquear("ventana");
        Bloquear("muestralistach");
        $.post("vistas/NF/ajax/NFMUNID.ASHX", {
            flag: 16, user: user, acti: acti, codigo: codi, fech: fecha, turn: turno
        }, function (res) {
            Desbloquear("ventana");
            Desbloquear("muestralistach");
            if (res == "ok") {
                exito();
            } else if (res.search("Duplicate entry") != -1) {
                infoCustom2("Chofer ya está registrado");
            } else { noexito(); }
        });
    }
}

function editarchofer(id) {

    $("#slcchofer").removeAttr("disabled");
    $('#btnRecargarChoferes').show();
    if (id == undefined) id = "";

    $("#titpro").html("<B>NUEVO CHOFER</B>");
    var cont = $("#contenteditchof").css("display", "block").html();;
    $("#divmodalch").html("");
    $("#divmodalch").html(cont);
    $("#contenteditchof").css("display", "none");

    Bloquear("muestralistach");
    $.ajax({
        async: true,
        type: "POST",
        url: "vistas/NF/ajax/NFMUNID.ASHX?flag=" + 6 + "&empr=" + $("#cboEmpresa").val(),
        success: function (res) {
            Desbloquear("muestralistach");
            $("#slcchofer").html(res);
            $("#slcchofer").select2({
                placeholder: "CHOFER",
                allowclear: true
            });

            if (id != "") {
                $.ajax({
                    async: true,
                    type: "POST",
                    url: "vistas/NF/ajax/NFMUNID.ASHX?codigo=" + id + "&flag=17",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (datos) {
                        $("#slcturno").select2("val", datos[0].TURNO);
                        $('#txtfechainchof').val(datos[0].FECHA_INICIO);
                        $('#slcchofer').select2("val", datos[0].PIDM);
                        $('#txtcodchofer').val(datos[0].CODIGO);

                        if (datos[0].ACTIVO == "ACTIVO") {
                            $('#uniform-chkactchofer span').removeClass().addClass("checked");
                            $('#chkactchofer').attr('checked', true);
                        } else {
                            $('#uniform-chkactchofer span').removeClass();
                            $('#chkactchofer').attr('checked', false);
                        }
                    },
                    error: function (msg) {
                        alertCustom("Chofer no se listó correctamente");
                    }
                });
            }
        },
        error: function (res) {
            Desbloquear("muestralistach");
        }
    });

    $("#slcturno").select2();
    $('#txtfechainchof').datepicker();
    $('#txtfechainchof').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

    if (id != "") {
        $("#btngrch").html("<i class='icon-pencil'></i> Modificar");
        $("#btngrch").attr("href", "javascript:actualizarchofer();");
        $("#slcchofer").attr("disabled", "disabled");
        $('#btnRecargarChoferes').hide();
    }
}

function listarchofer() {

    $("#titpro").html("<B>LISTA DE CHOFERES</B>");
    $("#contenteditchof").css("display", "none");

    Bloquear("muestralistach");
    $.post("vistas/NF/ajax/NFMUNID.ASHX", { flag: 14, codigo: $("#txtcodigo").val() },
         function (res) {
             Desbloquear("muestralistach");

             $("#divmodalch").html("");
             $("#divmodalch").html(res);

             var tablemod = $('#divmodalch #tblbmodal').DataTable({
                 "scrollCollapse": true,
                 "paging": false,
                 "info": false
             });

             $('#tblbmodal tbody').on('click', 'tr', function () {
                 if ($(this).hasClass('selected')) {
                     $(this).removeClass('selected');
                 }
                 else {
                     tablemod.$('tr.selected').removeClass('selected');
                     $(this).addClass('selected');
                 }
                 var id = $(this).attr("id");
                 editarchofer(id);
             });
         });
}

//---------------------
function cargarimagenes() {
    Bloquear("ventana");
    Bloquear("muestraimagenes");
    $.ajax({
        async: true,
        type: "GET",
        url: "vistas/NF/ajax/NFMUNID.ASHX",
        contentType: "application/json;",
        data: { flag: 11, codigo: $('#txtcodigo').val() },
        dataType: "json",
        success: function (datos) {
            Desbloquear("ventana");
            Desbloquear("muestraimagenes");
            if (datos != "error") {
                try {
                    for (var i = 0; i < datos.length; i++) {

                        var idimg = datos[i].RUTA.split("/").reverse()[0].split("_")[1].split(".")[0];
                        $("#" + idimg).attr("src", datos[i].RUTA + "?" + Math.random());
                        $("#" + idimg).parent("a").attr("href", datos[i].RUTA + "?" + Math.random());
                    }
                } catch (ex) { }
            }
        },
        error: function (datos) {
            Desbloquear("ventana");
            Desbloquear("muestraimagenes");
        }
    });

}

function cargaini2() {
    $.ajaxSetup({ async: false });
    $.post("vistas/NF/ajax/NFMUNID.ASHX", { flag: 7 },
        function (res) {
            $("#slcMarca").html(res);
            $("#slcMarca").select2({
                placeholder: "MARCA",
                allowclear: true

            });
            $("#slcMarca").change(function (event, param_mod) {
                $('#txtNroEjes').val("");
                $('#txtasientos').val("");
                $('#txtpseco').val("");
                $('#txtpbruto').val("");
                $('#txtlargo').val("");
                $('#txtancho').val("");
                $('#txtalto').val("");


                Bloquear($($('#slcModelo').parents("div")[0]));
                $.ajaxSetup({ async: true });
                $.post("vistas/NF/ajax/NFMUNID.ASHX", { flag: 8, marc: $("#slcMarca").val() },
                function (res) {
                    Desbloquear($($('#slcModelo').parents("div")[0]));
                    if (res != "") {

                        $("#slcModelo").removeAttr("disabled");

                        $("#slcModelo").html(res);
                        $("#slcModelo").select2({
                            placeholder: "MODELO",
                            allowclear: true
                        });

                        $("#slcModelo").change(function () {
                            $.ajax({
                                type: "POST",
                                url: "vistas/NF/ajax/NFMUNID.ASHX?mode=" + $("#slcModelo").val() + "&flag=13",
                                contentType: "application/json;",
                                async: false,
                                dataType: "json",

                                success: function (datos) {
                                    $('#txtNroEjes').val(datos[0].NRO_EJES);
                                    $('#txtasientos').val(datos[0].ASIENTOS);
                                    $('#txtpseco').val(datos[0].PESO_SECO);
                                    $('#txtpbruto').val(datos[0].PESO_BRUTO);
                                    $('#txtlargo').val(datos[0].LARGO);
                                    $('#txtancho').val(datos[0].ANCHO);
                                    $('#txtalto').val(datos[0].ALTO);

                                    $("#txtpbruto").change();
                                }

                            });

                        });
                        if (param_mod != null) {

                            $("#slcModelo").select2("val", param_mod);
                            $("#slcModelo").trigger("change");
                        }
                    }
                    else {
                        $("#slcModelo").select2("val", "");
                        $("#slcModelo").attr("disabled", "disabled");

                    }
                });
                $.ajaxSetup({ async: true });
            });
        }); $.ajaxSetup({ async: true });

}

var oTable;
//---------------------
var NFMUNID = function () {
       
    var plugins = function () {
        $("#cboCombustible").select2({
            placeholder: "COMBUSTIBLE",
            allowclear: true
        });
        $("#cboEmpresa").select2({
            placeholder: "EMPRESA",
            allowclear: true
        });
        inifechas("txtfechai", "txtfechat");
        $('#txtcompra').datepicker();
        $('#txtcompra').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txtfechaGPS').datepicker();
        $('#txtfechaGPS').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

        $('#txtFechaRev').datepicker();
        $('#txtFechaRev').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

        $('#txtpartida').focus(function () { $(this).inputmask({ "mask": "P", "repeat": 11, "greedy": false }); })
        $('#txtplaca').focus(function () { $(this).inputmask({ "mask": "P", "repeat": 7, "greedy": false }); })

        $('#txtanho').focus(function () { $(this).inputmask({ "mask": "&", "repeat": 1, "greedy": false }) });;

        $("#txtcolor").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 22, "greedy": false }); })
        $('#txtasientos').inputmask({ "mask": "9", "repeat": 3, "greedy": false });
        $('#txtpseco').inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        $('#txtpbruto').inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        $('#txtmotor').focus(function () { $(this).inputmask({ "mask": "U", "repeat": 16, "greedy": false }); })
        $('#txtsech').focus(function () { $(this).inputmask({ "mask": "U", "repeat": 20, "greedy": false }); })
        $('#txtcompa').focus(function () { $(this).inputmask({ "mask": "L", "repeat": 20, "greedy": false }); })
        $('#txtpoliza').focus(function () { $(this).inputmask({ "mask": "C", "repeat": 20, "greedy": false }); })


        aMayuscula(":input");
    }

    var fillCboEmpresa = function () {

        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                beforeSend: function () { Bloquear($($('#cboEmpresa').parents("div")[0])); },
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                },
                complete: function () {
                    Desbloquear($($('#cboEmpresa').parents("div")[0]));
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
            }
        }
    }

    var fillCboCombustible = function () {
        var data = new FormData();
        data.append('codigo', "");
        data.append('p_ESTADO_IND', "A");
        Bloquear($($('#cboCombustible').parents("div")[0]));
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMCOMB.ASHX?flag=LST",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        }).success(function (datos) {
            $('#cboCombustible').empty();
            $('#cboCombustible').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboCombustible').append('<option value="' + datos[i].CODIGO + '">' + datos[i].COMBUSTIBLE + '</option>');
                }
            }
            $('#cboCombustible').select2('val', '');
            //CARGA DE COMBO ASYNCRONA EN CARGA INICIAL
            if (ObtenerQueryString("codigo") != undefined) {
                cbo1 = false;
                $("#cboCombustible").select2("val", value);
            }
        }).error(function () {
            noexito();
        }).complete(function () {
            Desbloquear($($('#cboCombustible').parents("div")[0]));
        });
    }

    var cargamodal = function () {
        $("#BuscaP").click(function () {
            if ($("#cboEmpresa").val() == "") {
                $("#divmodal").html("No existen propietarios para la empresa atual. Haga click en listar todos.");
            } else {
                listarpropempr();
            }
        });

        $("#btnchoferes").click(function () {

            $("#titlechof").html("CHOFERES DE VEHICULO " + $("#slcMarca option[value=" + $("#slcMarca").val() + "]").html() +
                " " + $("#slcModelo option[value=" + $("#slcModelo").val() + "]").html() + " " + $("#txtplaca").val()
               );

            listarchofer();
        });

        $("#btnimagenes").click(function () {
            //carga img
            $("#myModalLabelmi").html("IMAGENES DE UNIDAD " + $("#slcMarca option[value=" + $("#slcMarca").val() + "]").html() + " " + $("#slcModelo option[value=" + $("#slcModelo").val() + "]").html() + " " + $("#txtplaca").val());
            if ($('#txtcodigo').val() != "") {
                cargarimagenes();

            }
        });
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            $("#txtpropietario").val("");
        });

        $("#txtpbruto").on("change", function () {
            CalcularCargaMaxima();
        });

        $("#txtpseco").on("change", function () {
            CalcularCargaMaxima();
        });

        $("#chkactivo").on("change", function () {
            if ($("#chkactivo").is(":checked")) {
                $("#txtfechat").attr("disabled", "disabled");
                $("#txtfechat").val("");
            } else {
                $("#txtfechat").removeAttr("disabled");
            }
        });

        $("#chkmtc").on("change", function () {
            if ($("#chkmtc").is(":checked")) {
                $("#divConstancia").show();
            } else {
                $("#divConstancia").hide();
                $("#txtNroConstancia").val("");
            }
        });

        $("body").on("click", "#btnRecargarChoferes", function () {
            var continuar = true;
            if ($("#cboEmpresa").val() == "") {
                infoCustom2("Seleccione una Empresa.")
                continuar = false;
            }
            if (continuar) {
                Bloquear($($('#slcchofer').parents("div")[0]));
                Bloquear($($('#btnRecargarChoferes').parents("div")[0]));
                $.ajax({
                    async: true,
                    type: "POST",
                    url: "vistas/NF/ajax/NFMUNID.ASHX?flag=" + 6 + "&empr=" + $("#cboEmpresa").val(),
                    success: function (res) {
                        Desbloquear($($('#slcchofer').parents("div")[0]));
                        Desbloquear($($('#btnRecargarChoferes').parents("div")[0]));
                        $("#slcchofer").html(res);
                        $("#slcchofer").select2({
                            placeholder: "CHOFER",
                            allowclear: true
                        });
                    },
                    error: function (res) {
                        Desbloquear($($('#slcchofer').parents("div")[0]));
                        Desbloquear($($('#btnRecargarChoferes').parents("div")[0]));
                    }
                });
            }
        });


        setTimeout(function () {
            $('#chkactchofer').parent().parent().removeClass("checker");
            $('#chkactchofer').removeAttr("style");
        }, 1000);

    }

    var cargainicial = function () {

        $(".fancybox").fancybox();
        /**carga de combos***/
        cargaini2();
        /****/
        $("#slcTipo").select2();
        $("#s2id_slcTipo span.select2-arrow").attr("style", "margin-right: 8px;");
        $("#slcGPS").select2();
        $("#slcGPS").change(function () {
            if ($("#slcGPS").val() == "N") {

                $("#txtfechaGPS").attr("disabled", "disabled"); $("#txtfechaGPS").val("");
            } else { $("#txtfechaGPS").removeAttr("disabled"); }


        });
        /***/
        var cod = ObtenerQueryString("codigo");

        if (cod != undefined) {

            $("#btnimagenes").attr("style", "display:block;");
            $("#btnimagenes").removeAttr("disabled");

            $("#btnchoferes").attr("style", "display:block;");
            $("#btnchoferes").removeAttr("disabled");

            $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NF/ajax/NFMUNID.ASHX?codigo=" + cod + "&flag=12",
                contentType: "application/json;",
                async: false,
                dataType: "json",
                success: function (datos) {
                    $("#txtcodigo").val(datos[0].CODIGO);
                    $('#txtfechai').val(datos[0].FECHA_INI);
                    $('#txtfechat').val(datos[0].FECHA_TER);
                    $('#txtpartida').val(datos[0].NRO_TARJETA);
                    $('#txtplaca').val(datos[0].PLACA);
                    $('#txtanho').val(datos[0].ANIO_FAB);
                    $('#txtCargaMaxima').val(datos[0].CARGA_MAXIMA);
                    $('#txtNroConstancia').val(datos[0].NRO_CONSTANCIA);
                    $('#txtFechaRev').val(datos[0].FECHA_REV_TEC);
                    $('#txtNroRev').val(datos[0].NRO_REV_TEC);

                    $('#txtcolor').val(datos[0].COLOR);
                    // $('#txtasientos').val(datos[0].NRO_ASIENTOS);
                    // $('#txtpseco').val(datos[0].PESO_SECO);
                    // $('#txtpbruto').val(datos[0].PESO_BRUTO);
                    $('#txtmotor').val(datos[0].MOTOR);
                    $('#txtsech').val(datos[0].SERIE);
                    $('#txtsech').val(datos[0].CHASIS);
                    $('#slcGPS').select2("val", datos[0].GPS);
                    $('#txtfechaGPS').val(datos[0].FECHA_GPS);
                    $('#txtpropietario').attr("pidm", datos[0].PROPIETARIO);
                    $('#txtpropietario').val(datos[0].PROPIETARIO_NOMBRE);
                    $('#txtcompa').val(datos[0].COMPA_SOAT);
                    $('#txtpoliza').val(datos[0].POLIZA_SOAT);
                    $('#txtcompra').val(datos[0].FECHA_SOAT);
                    //$('#txtplataforma').val(datos[0].PLATAFORMA);
                    //$('#slcFilas').select2("val", datos[0].FILA);
                    $('#slcTipo').select2("val", datos[0].TIPO_UNIDAD);
                    $('#slcMarca').select2("val", datos[0].MARCA);
                    $('#slcMarca').trigger("change", datos[0].MODELO);
                    $('#cboCombustible').append("<option value='" + datos[0].COMBUSTIBLE_CODE + "'>" + datos[0].COMBUSTIBLE + "<option>").select2("val", datos[0].COMBUSTIBLE_CODE);

                    if (datos[0].MTC == "S") {

                        $('#uniform-chkmtc span').removeClass().addClass("checked");
                        $('#chkmtc').attr('checked', true);
                        $("#divConstancia").show();
                    } else {

                        $('#uniform-chkmtc span').removeClass();
                        $('#chkmtc').attr('checked', false);
                        $("#divConstancia").hide();
                    }

                    if ($("#slcGPS").val() == "N") {

                        $("#txtfechaGPS").attr("disabled", "disabled");
                    } else { $("#txtfechaGPS").removeAttr("disabled"); }

                    AD_Permissions();

                    $("#cboEmpresa").select2("val", datos[0].EMPRESA).change();

                    setTimeout(function () {
                        if (datos[0].ACTIVO == "ACTIVO") {
                            $('#uniform-chkactivo span').removeClass().addClass("checked");
                            $('#chkactivo').attr('checked', true);
                        } else {

                            $('#uniform-chkactivo span').removeClass();
                            $('#chkactivo').attr('checked', false);
                        }
                    }, 500);
                },
                error: function (msg) {

                    alert(msg);
                }
            });
        } else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
        /***/

        $("#slcModelo").attr("disabled", "disabled");
        $("#slcModelo").select2();

        /*****************galeria******************/

        $(".fancybox").bind("contextmenu", function (e) {
            var posX = $(this).position().left,
                posY = $(this).position().top;
            //reinicializar input tipo file
            $("#menuimg").css({ 'display': 'block', 'left': posX, 'top': posY });

            var img = $(this).children("img");
            inputFile("btnimgs", img.attr("id"), "../../recursos/img/500x300.gif");
            $(".fancybox").removeAttr("estado");
            $(this).attr("estado", "activo");
            return false;
        });

        $(".fancybox").click(function () {
            if ($(this).attr("href") != $(this).children("img").attr("src"))
            { $(this).attr("href", $(this).children("img").attr("src")); }
            $("#muestraimagenes").css("z-index", 1000);
            $(".modal-backdrop.fade.in").css("z-index", 900);
        });

        //guarda img
        $("#btnimgs").parent().parent().off("change");
        $("#btnimgs").parent().parent().change(function () {
            var nomnvo = $("#btnimgs").val().split("\\")[2];
            var nomtipo = "";

            for (var i = 0; i < $("#galeria a").length; i++) {
                if ($($("#galeria a")[i]).attr("estado") == "activo") {
                    nomtipo = $($("#galeria a").children('img')[i]).attr("id");
                }
                if ($($("#galeria a").children("img")[i]).attr("src").split("/").reverse()[0] == nomnvo) {
                    alertCustom("Este archivo ya se encuentra agregado."); $("#btnimgs").val("");
                }
            }

            if ($("#btnimgs").val() != "") {
                var p_user = $('#ctl00_lblusuario').html();
                var p_codigo = $('#txtcodigo').val();
                var p_nombredearchivo = p_codigo + "_" + nomtipo + ".jpg";
                var data = new FormData();
                data.append('flag', 9);
                data.append('img', $("#btnimgs")[0].files[0]);
                data.append('user', p_user);
                data.append('codigo', p_codigo);
                data.append('noar', p_nombredearchivo);
                $.ajax({
                    url: "vistas/NF/ajax/NFMUNID.ASHX",
                    type: 'POST',
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success:
                    function (res) {
                        exito();
                        cargarimagenes();
                        $("#btnimgs").parent().siblings("span").remove();
                        $("#btnimgs").val("");
                    }
                });
            }
        });
        /***************************************/
    }

    //VARIABLES EVENTO CARGA INICIAL COMBOS
    var value = "";
    var cbo1 = true;   
    var EventosCargaInicial = function () {      
        $("#cboCombustible").live("select2-opening", function () {
            if (cbo1) {
                value = $(this).val();
                fillCboCombustible();              
            }
        })
    }
    //-------------------------------------

    return {
        init: function () {
            if (ObtenerQueryString("codigo") != undefined) {
                EventosCargaInicial();
            } else {
                fillCboCombustible();
            }
            plugins();
            fillCboEmpresa();
            cargainicial();
            cargamodal();
            eventoControles();
        }
    };
}();

var NFLUNID = function () {

    var plugins = function () {
        $("#cboEmpresa").select2({
            placeholder: "EMPRESA",
            allowclear: true
        });
    }

    var fillCboEmpresa = function () {

        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                beforeSend: function () { Bloquear($($('#cboEmpresa').parents("div")[0])); },
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option value="">TODOS</option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                    $("select.empresa").val($("#ctl00_hddctlg").val()).change();
                    ListaUnidades();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                },
                complete: function () {
                    Desbloquear($($('#cboEmpresa').parents("div")[0]));
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                $('#cboEmpresa').append('<option value="">TODOS</option>');
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                ListaUnidades();
            }
        }
    }

    var eventoControles = function () {
        $("#cboEmpresa").on("change", function () {
            ListaUnidades();
        });
    }


    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "PLACA" },
                { data: "PROPIETARIO_NOMBRE" },
                { data: "NOMBRE_EMPRESA" },
                { data: "nombre_marca" },
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

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');

        $('#tblDatos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=nfmunid&codigo=' + code;
            }
        });

        //Boton cambiar ACTIVO - INACTIVO
        $('#tblDatos tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var cod = row.CODIGO;
            Bloquear("ventana");
            $.post("vistas/NF/ajax/NFMUNID.ASHX", { flag: 3, codigo: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO"
                        oTable.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTable);
                        exito();
                    } else {
                        noexito();
                    }
                });
        });
    }


    var ListaUnidades = function () {

        var data = new FormData();
        data.append('empr', $("#cboEmpresa").val());
        data.append('codigo', '');
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMUNID.ashx?flag=12.5",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear("ventana");
           oTable.fnClearTable();
           if (datos != null && datos.length > 0) {
               oTable.fnAddData(datos);
               oTable.fnAdjustColumnSizing();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

        //var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        //var parms = {
        //    data: json,
        //    columns: [
        //        {
        //            data: "CODIGO",
        //            createdCell: function (td, cellData, rowData, row, col) {
        //                $(td).attr('align', 'center')
        //            }
        //        },
        //        { data: "PLACA" },
        //        { data: "PROPIETARIO_NOMBRE" },
        //        { data: "NOMBRE_EMPRESA" },
        //        { data: "NOMBRE_MARCA" },
        //        { data: "CARROCERIA" },
        //        {
        //            data: "ESTADO",
        //            createdCell: function (td, cellData, rowData, row, col) {
        //                $(td).attr('align', 'center')
        //            }
        //        },
        //        {
        //            data: null,
        //            defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
        //            createdCell: function (td, cellData, rowData, row, col) {

        //                $(td).attr('align', 'center')

        //            }
        //        }
        //    ]
        //};

        //var table = iniciaTabla("tblBandeja", parms);
        //$('#tblBandeja').removeAttr('style');

        ////tabla de la vista listarempresa
        //$('#tblBandeja tbody').on('click', 'tr', function () {

        //    if ($(this).hasClass('selected')) {
        //        $(this).removeClass('selected');

        //    }
        //    else {
        //        table.$('tr.selected').removeClass('selected');
        //        $(this).addClass('selected');

        //        var pos = table.fnGetPosition(this);
        //        var row = table.fnGetData(pos);
        //        var code = row.CODIGO;
        //        window.location.href = '?f=nfmunid&codigo=' + code;
        //    }
        //});

        ///*boton cambiar ACTIVO - INACTIVO*/
        //$('#tblBandeja tbody').on('click', 'a', function () {

        //    $(this).parent().parent().addClass('selected');
        //    var pos = table.api(true).row($(this).parent().parent()).index();
        //    var row = table.fnGetData(pos);
        //    var cod = row.CODIGO;
        //    Bloquear("ventana");
        //    $.post("vistas/NF/ajax/NFMUNID.ASHX", { flag: 3, codigo: cod },
        //        function (res) {
        //            Desbloquear("ventana");
        //            if (res != null) {
        //                if (res == "I") res = "INACTIVO";
        //                else res = "ACTIVO"
        //                table.fnGetData(pos).ESTADO = res;
        //                refrescaTabla(table);
        //                exito();

        //            } else {
        //                noexito();
        //            }
        //        });
        //});
    }

    return {
        init: function () {
            plugins();
            IniciaTabla();
            fillCboEmpresa();
            eventoControles();
        }
    };
}();

function CalcularCargaMaxima() {
    var cod = ObtenerQueryString("codigo");
    if (cod == undefined) {
        if ($("#txtpbruto").val() != "" && $("#txtpseco").val() != "") {
            if (parseFloat($("#txtpbruto").val()) && parseFloat($("#txtpseco").val())) {
                var capacidad = parseFloat($("#txtpbruto").val()) - parseFloat($("#txtpseco").val());
                $("#txtCargaMaxima").val(capacidad.toFixed(2))
            }
        }
    }
}
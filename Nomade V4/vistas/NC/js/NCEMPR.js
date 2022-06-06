var personasHtml = "";
personasJuridicasHtml = "";
var nroFirmantes = 1;
var firmantes = [];
var firmantesMixtos = [];
var nroItemsMixtos = 0;
var biometrico = '';
var tipoContribuyente;

function Actualizar() {
    var continuar = true;
    var acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var corto = $('#txtDescCorta').val();
    var codi = $('#txtcodigo').val();
    var dire = $('#txtdir').val();
    var user = $('#ctl00_lblusuario').html();
    var partida = $('#txtpart').val();
    var capital = $('#txtcapi').val();
    var participaciones = $('#txtnume').val();
    var valor = $('#txtvalor').val();
    var tipo_regimen = $('#cboTipoRegimen').val();
    var tipo_regimen_lab = $('#cboTipoRegimenLab').val();
    var diaCorte = $('#txtDiaCorte').val();
    var topeAdelanto = $('#txtTope').val();
    var cts_codex = $('#txtCts').val();
    var bio_ind = $("#chkBiometrico").is(':checked') ? 'S' : 'N';
    var bio_codex = null;
    if ($("#chkBiometrico").is(':checked')) {
        bio_codex = $('#cboBiometrico').val();
        if (bio_codex == "")
        {
            noexitoCustom('No ha seleccionado biométrico');
            return;
        }
    }
    else
        bio_codex = null;

    var p_TIPO_FIRMA, p_FIRMANTES_OBLIG, p_FIRMANTES_PIDMS, p_FIRMANTES_OBLIG_IND, p_DETALLES_MIXTO;
    p_TIPO_FIRMA = $('#rndMacomunada').is(':checked') ? 'M' : ($('#rndSolidaria').is(':checked') ? 'S' : $('#rndMixta').is(':checked') ? 'X' : '');
    p_FIRMANTES_OBLIG = $('#txtNroFirmantesOblig').val();

    if (vErrors(["txtdir", "txtnombre", "txtruc", "txtpidm", "txtDescCorta", "cboTipoRegimen", "txtNroFirmantesOblig", 'cboTipoRegimenLab', 'txtDiaCorte', 'txtTope', 'txtCts'])) {

        //Validaciones iniciales
        if ($('#rndMixta').is(':checked')) {
            if (firmantesMixtos.length <= 0) {
                continuar = false;
                alertCustom("Necesita agregar almenos 1 persona Autorizada (Firma Mixta)");
            }
        } else {
            if (firmantes.length <= 0) {
                continuar = false;
                alertCustom("Necesita agregar almenos 1 persona Autorizada");
            }
        }

             
        if (continuar) {
            //Indicar que no se agregó el ultimo valor 
            if ($('#rndMixta').is(':checked')) {
                if (firmantes.length > 0) {
                    infoCustom2("Aquellas personas que no aparecen en la tabla NO se guardan para firma Mixta.");
                }
            }

            var pidms = "";
            var inds = "";
            for (var i = 0; i < firmantes.length; i++) {
                if (i == firmantes.length - 1) {
                    pidms += firmantes[i].PIDM + "";
                    inds += firmantes[i].OBLIG + "";
                }
                else {
                    pidms += firmantes[i].PIDM + ",";
                    inds += firmantes[i].OBLIG + ",";
                }
            }
            p_FIRMANTES_PIDMS = pidms;
            p_FIRMANTES_OBLIG_IND = inds;

            var detallesMixto = "";
            var pidmsItem = "";
            var obligItem = "";
            var item = 1;
            var reset = 0;
            for (var i = 0; i < firmantesMixtos.length; i++) {
                if (reset < parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                    reset++;
                }
                if (reset == parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                    pidmsItem += firmantesMixtos[i].PIDM + "";
                    obligItem += firmantesMixtos[i].OBLIG + "";
                } else {
                    pidmsItem += firmantesMixtos[i].PIDM + ",";
                    obligItem += firmantesMixtos[i].OBLIG + ",";
                }
                if (reset == parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                    reset = 0;
                    detallesMixto += item.toString() + ";"
                    detallesMixto += firmantesMixtos[i].DESDE + ";"
                    detallesMixto += firmantesMixtos[i].HASTA + ";"
                    detallesMixto += pidmsItem + ";"
                    detallesMixto += obligItem + "|"
                    pidmsItem = "";
                    obligItem = "";
                    item++;
                }
            }
            P_DETALLES_MIXTO = detallesMixto;
            if (p_TIPO_FIRMA != "X" && parseFloat(p_FIRMANTES_OBLIG) > firmantes.length) {
                alertCustom("Cantidad de firmantes obligatorios no puede ser mayor a la cantidad de firmantes que ha agregado.")
                continuar = false;
            } else {
                for (var i = 0; i < firmantesMixtos.length; i++) {
                    if (parseFloat(p_FIRMANTES_OBLIG) > parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                        alertCustom("Cantidad de firmantes obligatorios(Mixto) no puede ser mayor a la cantidad de firmantes que ha agregado en alguno de los grupos.")
                        continuar = false;
                        break;
                    }
                }
            }

            if (continuar) {
                if (p_TIPO_FIRMA == "X") {
                    p_FIRMANTES_PIDMS = "";
                    p_FIRMANTES_OBLIG_IND = "";
                    LimpiarFirmantes();
                }
                Bloquear("ventana");
                $.post("vistas/NC/ajax/NCEMPR.ASHX", {
                    flag: 2, usuario: user, corto: corto, direc: dire,
                    activo: acti, codigo: codi, partida: partida, capital: capital,
                    participaciones: participaciones, valor: valor, tipo_regimen: tipo_regimen, tipo_regimen_lab: tipo_regimen_lab,
                    p_TIPO_FIRMA: p_TIPO_FIRMA, p_FIRMANTES_OBLIG: p_FIRMANTES_OBLIG, p_FIRMANTES_PIDMS: p_FIRMANTES_PIDMS,
                    p_FIRMANTES_OBLIG_IND: p_FIRMANTES_OBLIG_IND, P_DETALLES_MIXTO: P_DETALLES_MIXTO, diaCorte: diaCorte,
                    topeAdelanto: topeAdelanto, bio_ind: bio_ind, bio_code: bio_codex, cts_codex: cts_codex
                },
                    function (res) {
                        Desbloquear("ventana");
                        if (res = "OK") {
                            exito();
                            $('#MuestraModalAceptar').modal('hide');
                            biometrico = bio_ind;
                            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabar").attr("href", "javascript:ValidacionGeneral();");
                        } else {
                            noexito();
                        }
                    });
            }
        }
    }


}

function cerrarventana(idmodal)
{
    $('#' + idmodal + '').modal('hide');
}


function VerificaModal() {
    var bio_indd = $("#chkBiometrico").is(':checked') ? 'S' : 'N';

    if (biometrico == 'S' && bio_indd == 'N') {
        $('#MuestraModalAceptar').modal('show');        
    }
    else {
        Actualizar();
    }

}

function ValidacionGeneral()
{
    if ($("#chkBiometrico").is(':checked')) {
        $('#uniform-chkBiometrico span').removeClass().addClass("checked");
        $('#chkBiometrico').attr('checked', true);
        //$('#chkBiometrico').change();
        VerificaModal();
    }
    else {
        var codx = $('#txtcodigo').val();
        $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/NNMREHO.ASHX?OPCION=1&CTLG_CODE=" + codx + "&SCSL_CODE=T",
            contentType: "application/json;",
            async: false,
            dataType: "json",
            success: function (datos) {
                if (datos == null) {
                    $.ajax({
                        type: "POST",
                        url: "vistas/NN/ajax/NNMREHO.ASHX?OPCION=5&CTLG_CODE=" + codx + "",
                        contentType: "application/json;",
                        async: false,
                        dataType: "json",
                        success: function (datos) {
                            if (datos == null) {
                                VerificaModal();
                            }
                            else {
                                $('#uniform-chkBiometrico span').removeClass().addClass("checked");
                                $('#chkBiometrico').attr('checked', true);
                                //$('#chkBiometrico').change();
                                $('#MuestraModalProcesa').modal('show');
                            }
                        },
                        error: function (msg) {
                            alert(msg);
                        }
                    });
                }
                else {
                    $('#uniform-chkBiometrico span').removeClass().addClass("checked");
                    $('#chkBiometrico').attr('checked', true);
                    //$('#chkBiometrico').change();
                    $('#MuestraModalRegulariza').modal('show');
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    
}

function Crear() {

    var acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var nombre = $("#txtnombre").val();
    var desc = $('#txtnombre').val();
    var corto = $('#txtDescCorta').val();
    var dire = $('#txtdir').val();
    var ruc = $('#txtruc').val();
    var pidm = $('#txtpidm').val();
    var user = $('#ctl00_lblusuario').html();
    var partida = $('#txtpart').val();
    var capital = $('#txtcapi').val();
    var participaciones = $('#txtnume').val();
    var valor = $('#txtvalor').val();
    var tipo_regimen = $('#cboTipoRegimen').val();
    var cts_codex = $('#txtCts').val();
    var tipo_regimen_lab = $('#cboTipoRegimenLab').val();

    var validaRRHH = true;
    var diaCorte = $('#txtDiaCorte').val();
    var topeAdelanto = $('#txtTope').val();
    var bio_ind = $("#chkBiometrico").is(':checked') ? 'S' : 'N';
    var bio_code = null;
    if (bio_ind = 'S')
        bio_code = $('#cboBiometrico').val();
    else
        bio_code = null;    

    if (parseInt(diaCorte) > 10 ) {
        validaRRHH = false;
        alertCustom("El Nro. de dias de corte debe ser Menor a 10");
        return;        
    }

    if (vErrors(["txtdir", "txtnombre", "txtruc", "txtpidm", 'txtDescCorta', 'cboTipoRegimen', 'cboTipoRegimenLab', 'txtDiaCorte', 'txtTope'])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCEMPR.ASHX", {
            flag: 1, desc: desc, corto: corto, direc: dire, ruc: ruc, usuario: user, activo: acti, pidm: pidm, partida: partida,
            capital: capital, participaciones: participaciones, valor: valor, tipo_regimen: tipo_regimen, tipo_regimen_lab: tipo_regimen_lab, cts_codex: cts_codex,
            diaCorte: diaCorte, topeAdelanto: topeAdelanto, bio_ind: bio_ind, bio_code: bio_code
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    biometrico = bio_ind;
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:ValidacionGeneral();");
                    $("#BuscaPJ").removeClass();
                    $("#BuscaPJ i").removeClass();
                    $("#txtcodigo").val(res);
                    tabacc(res);
                    window.location.href = '?f=ncmempr&codigo=' + res;
                } else {
                    noexito();
                }
            });
    }
}

function cargaAccionistaDiv(p_accionista) {
    $("#Accionista_body").load('../../vistas/NC/estereotipos/Accionista.html', function (html) {
        $("#hfPPBIDEN_PIDM").val("");
        $.getScript("../../vistas/NC/estereotipos/js/Accionista.js")
         .done(function (script, textStatus) {
             ACCIONISTA.init();
             $("#slcEmpresaacci").select2("val", $("#txtcodigo").val()).change();

             $("#slcPidmPersacci").blur(function () {

                 $("#hfPPBIDEN_PIDM").val($(this).attr("valor"));
                 cargarAccionista($("#txtcodigo").val());
             });

             
                 $("#txtporc").keyup(function () {
                     $(this).siblings("small").remove();
                     if (!(ValidarPorcentaje($(this).val()))) {

                         $(this).parent().append("<small style='color:red;'>porcentaje inv&aacute;lido</small>")
                         $(this).parents(".control-group").addClass("error");
                         $(this).addClass("errorPor");
                     } else {
                         $(this).parents(".control-group").removeClass("error");
                         $(this).removeClass("errorPor");
                     }
                 });

             

             if (p_accionista != undefined) {
                 $("#crearAccionista").modal('show');
                 $("#slcPidmPersacci").val(p_accionista).blur();

             }

         });
    });

}

function tabacc(cod) {
    $.ajaxSetup({ async: false });
    $.post("vistas/NC/ajax/NCEMPR.ASHX", { flag: 5, codigo: cod},

    function (res) {
        
        $("#tabladeaccionistas").html("");
        $("#tabladeaccionistas").html(res);

        var tableaccionista = $('#tblaccionista').DataTable({

            "scrollCollapse": true,
            "paging": false,
            "info": false,
            "searching": false,
            "createdRow": function (row, data, index) {
                var porcentaje = $('td', row).eq(1).html();
                var capital = $("#txtcapi").val().split("S/.").reverse()[0].replace(",", "");
                $('td', row).eq(2).html("S/." + (capital * porcentaje) / 100);

            }
        });

        $('#tblaccionista tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

            }
            else {
                tableaccionista.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var nombre = $($(this).children("td")[0]).html();
                cargaAccionistaDiv(nombre);

            }



        });

        $('#tblaccionista tbody').on('click', '.btnElimAcci', function () {

            $($(this).parents("tr")).addClass('selected');
            var pidm = $($(this).parents("tr")[0]).attr("id");
            var empresa = $("#txtcodigo").val();

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCEMPR.ASHX", { flag: 6, pidm: pidm, empresa: empresa },
                function (res) {
                    Desbloquear("ventana");
                    if (res == "OK") {
                        exito();
                        tabacc(empresa);
                    }

                });

            $.ajaxSetup({ async: true });
        });
        if (tipoContribuyente == '0007') {
            if (res.length == 0 || res == '') {
                $("#tabladeaccionistas").append('<div class="row-fluid" align="right"><button data-toggle="modal" data-target="#crearAccionista" class="btn green" id="AgregarAccionista" type="button"> Agregar Accionista </button></div>')
            }
        } else {
            $("#tabladeaccionistas").append('<div class="row-fluid" align="right"><button data-toggle="modal" data-target="#crearAccionista" class="btn green" id="AgregarAccionista" type="button"> Agregar Accionista </button></div>')
        }
    }); //FIN CARGA TABLA ACCIONISTAS
    $.ajaxSetup({ async: true });

    $("#AgregarAccionista").click(function () {
        cargaAccionistaDiv();
    });

    offObjectEvents("masAccionistas");

    $("#masAccionistas").click(function () {
        $("#Accionista_body").html("");
        cargaAccionistaDiv();
    });

    CargaInicialPersonas();
}

var NCEMPR = function () {

    /*cargar datos, crear aspecto y eventos para la ventana modal tblmodal*/
    var cargamodal = function () {
        $("#BuscaPJ").click(function () {
            $("#divmodal").html("");
            $("#tituloModal").html("LISTA DE PERSONAS JURIDICAS");
            if (personasJuridicasHtml == "") {
                CargaInicialPersonasJuridicas();
            }
            $("#divmodal").html(personasJuridicasHtml);

            var tablemod = $('#tblbmodal').DataTable({
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

                $("#grabar").html("<i class='icon-pencil'></i> Grabar ");
                $("#grabar").attr("href", "javascript:Crear();");

                $('#txtcodigo').val("");
                $('#muestralistap').modal('hide');
                var IDPER2 = $(this).attr("id");

                $('#txtpidm').val(IDPER2).change();
                $('#txtnombre').val($('#per' + IDPER2).text());
                $('#txtdir').val($('#dir' + IDPER2).text());
                $('#txtruc').val($('#ruc' + IDPER2).text());

            });


        });
    }

    $("#crearAccionista").on("hide", function () { tabacc($("#txtcodigo").val()); });

    var fillcboTipoRegimen = function () {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmtreg.ashx?OPCION=L&ESTADO_IND=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoRegimen').html('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoRegimen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillcboTipoRegimenLaboral = function () {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmrela.ashx?OPCION=S&ESTADO=A&CODIGO=",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoRegimenLab').html('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoRegimenLab').append('<option value="' + datos[i].CODIGO + '">' + datos[i].ACRONIMO + '</option>');
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var ListarBiometrico = function () {
        $.ajax({
            type: "POST",
            async: false,
            url: "vistas/GB/ajax/GBLNBIO.ashx?Opcion=C&Codigo=undefined",
            success: function (res) {
                $('#cboBiometrico').append(res);
                $('#cboBiometrico').change();
                $('#cboBiometrico').select2();
                $('#cboBiometrico').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargainicial = function () {

        aMayuscula(":input");
        biometrico = '';
        var cod = ObtenerQueryString("codigo");
        

        ListarBiometrico();
        $('#cboBiometrico').attr('disabled', 'disabled');

        $("#txtcapi").change(function () {
            var c = $("#txtcapi").val().split("S/.").reverse()[0].replace(",", "");
            var n = $("#txtnume").val();
            if (n != "" && c != 0) {
                $("#txtvalor").val("S/." + parseFloat(c / n).toFixed(2));
            } else {
                $("#txtvalor").val("");
            }
            if (cod != undefined) tabacc(cod);
        });

        $("#txtnume").change(function () {
            var c = $("#txtcapi").val().split("S/.").reverse()[0].replace(",", "");
            var n = $("#txtnume").val();
            if (c != "" && n != 0) {

                $("#txtvalor").val("S/." + parseFloat(c / n).toFixed(2));

            } else { $("#txtvalor").val(""); }

        });

        if (cod !== undefined) {
            $("#bloqueFirmantes").attr("style", "margin-top: 10px;display:block;");
            $("#BuscaPJ").removeClass();
            $("#BuscaPJ i").removeClass();
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:ValidacionGeneral();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCEMPR.ASHX?codigo=" + cod,
                contentType: "application/json;",
                async: false,
                dataType: "json",
                success: function (datos) {
                    $('#cboTipoRegimen').select2('val', datos[0].CODIGO_REGIMEN).change();
                    $('#cboTipoRegimenLab').select2('val', datos[0].CODIGO_REGIMEN_LAB).change();
                    $("#txtcodigo").val(datos[0].CODIGO);
                    $("#txtpidm").val(datos[0].PIDM);
                    $("#txtnombre").val(datos[0].DESCRIPCION);
                    $('#txtDescCorta').val(datos[0].CORTO);
                    $("#txtdir").val(datos[0].DIRECCION);
                    $("#txtruc").val(datos[0].RUC);
                    $('#txtpart').val(datos[0].PARTIDA);
                    $('#txtcapi').val(datos[0].CAPITAL);
                    $('#txtnume').val(datos[0].PARTICIPACIONES);
                    $('#txtvalor').val(datos[0].VALOR);
                    $('#txtNroFirmantesOblig').val(datos[0].AUT_OBLIG_NRO);
                    $('#txtCts').val(datos[0].CODIGO_CTS);

                    $('#txtDiaCorte').val(datos[0].DIA_CORTE);
                    $('#txtTope').val(datos[0].TOPE_ADEL);
                    tipoContribuyente = datos[0].TIPO_CONTRIBUYENTE;

                    if (datos[0].AUTH === "D") {
                        $('#chkactivo').attr("disabled", "disabled");
                    }

                    if (datos[0].ACTIVO === "ACTIVO") {
                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {
                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                    if (datos[0].BIO_IND === "S") {
                        $('#uniform-chkBiometrico span').removeClass().addClass("checked");
                        $('#chkBiometrico').attr('checked', true);
                        biometrico = 'S'
                    } else {
                        $('#uniform-chkBiometrico span').removeClass();
                        $('#chkBiometrico').attr('checked', false);
                        biometrico = 'N'
                    }

                    $('#chkBiometrico').change();
                    $('#cboBiometrico').select2('val', datos[0].BIO_CODE);


                    if (datos[0].TIPO_FIRMA === 'M') {
                        $('#rndMacomunada').attr('checked', 'checked');
                        $('#rndMacomunada').parent().addClass('checked');
                        $('#rndMacomunada').click();

                        $('#rndSolidaria').removeAttr("checked").parent().removeClass('checked');
                        $('#rndMixta').removeAttr("checked").parent().removeClass('checked');

                    }
                    else if (datos[0].TIPO_FIRMA === 'S') {
                        $('#rndSolidaria').attr('checked', 'checked');
                        $('#rndSolidaria').parent().addClass('checked');
                        $('#rndSolidaria').click();

                        $('#rndMacomunada').removeAttr("checked").parent().removeClass('checked');
                        $('#rndMixta').removeAttr("checked").parent().removeClass('checked');
                    }
                    else if (datos[0].TIPO_FIRMA == 'X') {
                        $('#rndMixta').attr('checked', 'checked');
                        $('#rndMixta').parent().addClass('checked');
                        $('#rndMixta').click();

                        $('#rndMacomunada').removeAttr("checked").parent().removeClass('checked');
                        $('#rndSolidaria').removeAttr("checked").parent().removeClass('checked');
                    }


                    //Carga de firmantes
                    pidm = (datos[0].AUT_PIDMS).split(",");
                    nombre = (datos[0].AUT_NOMBRES).split(",");
                    oblig = (datos[0].AUT_OBLIG_IND).split(",");
                    nro = 0;
                    for (var i = 0; i < pidm.length; i++) {
                        nro++;
                        if (i > 0) {
                            $("#btnAgregarDivFirmante").click();
                        }

                        $("#txtAutorizado" + nro + "").val(pidm[i]);
                        $("#txtAutorizado" + nro + "Desc").val(nombre[i]);
                        if (oblig[i] == "S") {
                            $("#chkObligatorio" + nro + "").attr("checked", "checked").parent().addClass("checked");
                        }

                        if (pidm[i] != "" && nombre[i] != "") {
                            var obj = '{'
                            obj += '"PIDM":"' + pidm[i] + '",';
                            obj += '"OBLIG":"' + oblig[i] + '",';
                            obj += '"NOMBRE":"' + nombre[i] + '"';
                            obj += '}';
                            json = JSON.parse(obj);
                            firmantes.push(json);
                        }
                    }
                    //Carga mixtos
                    CargarAutorizadosMixtos();
                    ListarFirmantesMixtos();

                },
                error: function (msg) {

                    alert(msg);
                }
            });
            tabacc(cod);
        }
    }

    var plugins = function () {
        $('#txtdir').focus(function () { $(this).inputmask({ "mask": "R", "repeat": 100, "greedy": false }); })
        $('#txtpart').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 10, "greedy": false }); })
        mascespecial("txtcapi", "S/.", 13);
        $('#txtnume').inputmask({ "mask": "9", "repeat": 12, "greedy": false });
        $('#txtDiaCorte').inputmask({ "mask": "9", "repeat": 2, "greedy": false });
        $('#txtTope').inputmask({ "mask": "9", "repeat": 3, "greedy": false });
        $('#txtCts').inputmask({ "mask": "9", "repeat": 10, "greedy": false });
        $('#txtvalor').attr("maxlength", "20");
        $('#cboTipoRegimen, #cboTipoRegimenLab').select2();
    }

    var eventoControles = function () {

        $("#chkBiometrico").on("change", function () {
            if ($("#chkBiometrico").is(':checked')) {
                $('#cboBiometrico').removeAttr('disabled');
            }
            else
                $('#cboBiometrico').attr('disabled', 'disabled');

            // $($('#cboBiometrico option')[0]).val()

        });

        $("#btnAgregarDivFirmante").on("click", function () {
            nroFirmantes++;
            var n = nroFirmantes;
            var campos = '<div class="row-fluid" style="padding: 4px">' +
                       '<div class="span2">' +
                            '<div class="control-group ">' +
                                '<label class="control-label">Autorizado ' + n + ' :</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span8">' +
                            '<div class="control-group">' +
                                '<div class="controls">' +
                                    '<input id="txtAutorizado' + n + '" style="text-align: center" type="text" class="span2" data-placeholder="Autorizado ' + n + '" disabled="disabled" />' +
                                    '<input id="txtAutorizado' + n + 'Desc" type="text" class="span7" data-placeholder="Autorizado ' + n + '" disabled="disabled" style="margin-left: 4px;" />' +
                                   ' <div class="span3 pull-right">' +
                                               ' <label class="control-label" title="Obligatorio">' +
                                                   ' <div class="checker" id="uniform-chkObligatorio' + n + '"><span>' +
                                                   '<input type="checkbox" id="chkObligatorio' + n + '" name="chkObligatorio' + n + '" style="opacity: 0;">' +
                                                   '</span></div>' +
                                                   ' Oblig.</label>' +
                                   ' </div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span2" style="margin-left: 5px">' +
                            '<div class="control-group">' +
                                '<div class="controls" style="padding-top: 4px">' +
                                    '<a id="btnBuscar' + n + '" style="margin-right: 4px;" onclick="CargarPersonas(\'' + n + '\')" class="btn blue" data-toggle="modal" data-target="#muestralistap"><i class="icon-user"></i></a>' +
                                    '<a id="btnRemover' + n + '" style="margin-right: 4px;"  class="btn red remove" onclick="RemoverAutorizado(this,\'' + n + '\');"><i class="icon-minus"></i></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '</div>';

            $("#divFirmantes").append(campos)

            var id;
            for (var i = 1; i < n ; i++) {
                m = i;
                id = "chkObligatorio" + i + ""
                offObjectEvents(id);
            }

            $("#divFirmantes input[type=checkbox]").on("change", function () {
                if ($(this).is(":checked")) {
                    $(this).parent().addClass("checked");
                } else {
                    $(this).parent().removeClass("checked");
                }
                var pidm = $($(this).parent().parent().parent().parent().parent().children()[0]).val();
                if (pidm != "") {
                    for (var i = 0; i < firmantes.length; i++) {
                        if (firmantes[i].PIDM == pidm) {
                            var str = ($(this).is(":checked")) ? "S" : "N";
                            firmantes[i].OBLIG = str;
                        }
                    }
                }
            });

            if (n != 2) {
                var m = n - 1;
                $("#btnRemover" + m + "").css("display", "none");
            }
        });

        $("#divFirmantes input[type=checkbox]").on("change", function () {
            if ($(this).is(":checked")) {
                $(this).parent().addClass("checked");
            } else {
                $(this).parent().removeClass("checked");
            }
            var pidm = $($(this).parent().parent().parent().parent().parent().children()[0]).val();
            if (pidm != "") {
                for (var i = 0; i < firmantes.length; i++) {
                    if (firmantes[i].PIDM == pidm) {
                        var str = ($(this).is(":checked")) ? "S" : "N";
                        firmantes[i].OBLIG = str;
                    }
                }
            }
        });

        $("#btnAgregarAutorizados").on("click", function () {
            if (vErrors(['txtSolidariaDesde', 'txtSolidariaHasta', 'txtNroFirmantesOblig'])) {
                if (parseFloat($("#txtSolidariaDesde").val()) >= parseFloat($("#txtSolidariaHasta").val())) {
                    alertCustom("El monto Fin ('Hasta') no puede ser menor o igual al monto Inicial ('Desde')!")
                } else {
                    var pidm, nombre, oblig, tr;
                    var firmantesActual = 0;
                    var nro = 0;
                    for (var i = 0; i < nroFirmantes; i++) {
                        nro = i + 1;
                        if ($("#txtAutorizado" + nro + "").val() != "" && $("#txtAutorizado" + nro + "Desc").val() != "") {
                            firmantesActual++;
                        }
                    }
                    nro = 0;

                    if (firmantesActual != 0) {
                        var continuar = true;
                        for (var i = 0; i < firmantes.length; i++) {
                            if (parseFloat($("#txtNroFirmantesOblig").val()) > firmantesActual) {
                                alertCustom("Cantidad de firmantes obligatorios (Mixto) NO puede ser mayor a la cantidad de firmantes que ha agregado. ")
                                continuar = false;
                                break;
                            }
                        }
                        if (continuar) {
                            nroItemsMixtos++;
                            for (var i = 0; i < nroFirmantes; i++) {
                                nro = i + 1;
                                pidm = $("#txtAutorizado" + nro + "").val();
                                nombre = $("#txtAutorizado" + nro + "Desc").val();
                                oblig = ($("#chkObligatorio" + nro + "").is(":checked")) ? "S" : "N";
                                if (pidm.trim() != "" && nombre.trim() != "") {

                                    var obj = '{'
                                    obj += '"PIDM":"' + pidm + '",';
                                    obj += '"NOMBRE":"' + nombre + '",';
                                    obj += '"NUMERO_FIRMANTES":"' + firmantesActual.toString() + '",';
                                    obj += '"DESDE":"' + $("#txtSolidariaDesde").val() + '",';
                                    obj += '"HASTA":"' + $("#txtSolidariaHasta").val() + '",';
                                    obj += '"OBLIG":"' + oblig + '",';
                                    obj += '"ITEM":"' + nroItemsMixtos + '"';
                                    obj += '}';
                                    json = JSON.parse(obj);
                                    firmantesMixtos.push(json);
                                }

                            }
                            if (firmantesActual != 0) {
                                ListarFirmantesMixtos();
                                LimpiarFirmantes();
                            }
                        }
                    }
                    $("#txtSolidariaHasta").parent().parent().removeClass("error");
                }
            }
        });

        $('#rndSolidaria, #rndMacomunada').click(function () {
            $('#divMixta').slideUp();
            $("#divTblDetalles").slideUp();
            $("#btnAgregarAutorizados").attr("style", "display:none;");
            //$("#bloque1").removeClass("span6").addClass("span8 offset2");
        });

        $('#rndMixta').click(function () {
            ListarFirmantesMixtos();
            $('#divMixta').slideDown();
            $("#btnAgregarAutorizados").attr("style", "display:inline-block;");
            $("#divTblDetalles").slideDown();
            //$("#bloque1").removeClass("span8 offset2").addClass("span6");
        });

        $("#cboMoneda").on("change", function () {
            if ($("#cboMoneda :selected").attr("simbolo") != undefined && $("#cboMoneda :selected").attr("simbolo") != "") {
                $(".simboloMoneda").html("(" + $("#cboMoneda :selected").attr("simbolo") + ")")
            } else {
                $(".simboloMoneda").html("")
            }
        });
    }

    var cargarMonedas = function () {
        $('#cboMoneda').select2();
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") {
                            $('#cboMoneda').select2('val', datos[i].CODIGO).change();
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom("Datos de moneda no se cargaron correctamente.");
            }
        });
    };

    return {
        init: function () {
            fillcboTipoRegimen();
            fillcboTipoRegimenLaboral();
            plugins();
            eventoControles();
            cargainicial();
            CargaInicialPersonasJuridicas();
            CargaInicialPersonas();
            cargarMonedas();
            cargamodal();

        }
    };
}();
//$(document).keypress(function (e) { if (e.which == 13) { $("#BuscaPJ").click(); } })

var RemoverAutorizado = function (campo, nro) {
    for (var i = 0; i < firmantes.length; i++) {
        if (firmantes[i].PIDM == $("#txtAutorizado" + nro + "").val()) {
            firmantes.splice(i, 1);
        }
    }
    if (nro != 2) {
        var m = nro - 1;
        $("#btnRemover" + m + "").css("display", "inline-block");
    }
    nroFirmantes--;
    $(campo).parent().parent().parent().parent().remove();
}

var RemoverFirmantesMixtos = function (indice, nroItems) {
    firmantesMixtos.splice(parseFloat(indice), parseFloat(nroItems));
    nroItemsMixtos--;
    ListarFirmantesMixtos();
}

var ListarFirmantesMixtos = function () {
    $("#tblDetalles tbody tr").remove();
    var reset = 0;
    var ini = 0;
    if (firmantesMixtos.length != 0) {
        for (var i = 0; i < firmantesMixtos.length; i++) {
            if (reset < parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                reset++;
            }
            tr = "<tr>"
            if (reset == 1) {

                tr += '<td rowspan="' + firmantesMixtos[i].NUMERO_FIRMANTES + '" ><a class="btn red remove" onclick="RemoverFirmantesMixtos(\'' + i + '\',\'' + firmantesMixtos[i].NUMERO_FIRMANTES + '\')" style="margin-right: 4px; margin-bottom: 2px;"><i class="icon-minus"></i></a></td>'

                tr += "<td rowspan='" + firmantesMixtos[i].NUMERO_FIRMANTES + "' style='text-align:right;'>" + formatoMiles(firmantesMixtos[i].DESDE) + "</td>"

                tr += "<td rowspan='" + firmantesMixtos[i].NUMERO_FIRMANTES + "'  style='text-align:right;'>" + formatoMiles(firmantesMixtos[i].HASTA) + "</td>"

                tr += "<td>" + firmantesMixtos[i].PIDM + "</td>"
                tr += "<td>" + firmantesMixtos[i].NOMBRE + "</td>"
                tr += "<td>"
                tr += (firmantesMixtos[i].OBLIG == "S") ? "SI" : "NO"
                tr += "</td>"

                $("#txtSolidariaDesde").val(firmantesMixtos[i].HASTA);
                $("#txtSolidariaHasta").val("");

            } else {
                tr += "<td>" + firmantesMixtos[i].PIDM + "</td>"
                tr += "<td>" + firmantesMixtos[i].NOMBRE + "</td>"
                tr += "<td>"
                tr += (firmantesMixtos[i].OBLIG == "S") ? "SI" : "NO"
                tr += "</td>"
            }
            tr += "</tr>"
            $("#tblDetalles tbody").append(tr);

            if (reset == parseFloat(firmantesMixtos[i].NUMERO_FIRMANTES)) {
                reset = 0;
            }
        }
        //Ocultar removes
        var btns = $("#tblDetalles .remove");
        for (var i = 0; i < btns.length - 1; i++) {
            $(btns[i]).attr("style", "display:none");
        }

    } else {
        $("#tblDetalles tbody").append("<tr><td colspan='6' style='text-align:center;'></td></tr>")
        $("#txtSolidariaDesde").val("0");
    }
}

var LimpiarFirmantes = function () {
    var btns = $("#divFirmantes .remove");
    var count = nroFirmantes;
    for (var i = count; i > 0; i--) {
        if (i == 1) {
            firmantes.splice(0, 1);
            $("#txtAutorizado1").val("");
            $("#txtAutorizado1Desc").val("");
        } else {
            $("#btnRemover" + i + "").click()
        }
    }
}

var CargarAutorizadosMixtos = function () {
    var ctlg = ObtenerQueryString('codigo');
    if (ctlg != undefined) {
        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=AUTX&P_CUEN_CODE=&P_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    //Carga de firmantes mixtos
                    for (var i = 0; i < datos.length; i++) {
                        var pidm = (datos[i].AUT_PIDMS).split(",");
                        var nombre = (datos[i].AUT_NOMBRES).split(",");
                        var oblig = (datos[i].AUT_OBLIG_IND).split(",");

                        for (var j = 0; j < pidm.length; j++) {
                            var obj = '{'
                            obj += '"PIDM":"' + pidm[j] + '",';
                            obj += '"NOMBRE":"' + nombre[j] + '",';
                            obj += '"NUMERO_FIRMANTES":"' + datos[i].AUT_CANTIDAD + '",';
                            obj += '"DESDE":"' + datos[i].DESDE + '",';
                            obj += '"HASTA":"' + datos[i].HASTA + '",';
                            obj += '"OBLIG":"' + oblig[j] + '",';
                            obj += '"ITEM":"' + datos[i].ITEM + '"';
                            obj += '}';

                            json = JSON.parse(obj);
                            firmantesMixtos.push(json);
                        }
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}

var CargaInicialPersonas = function () {

    $.post("vistas/NC/ajax/NCEMPR.ASHX", { flag: "7", p_CTLG_CODE: (ObtenerQueryString("codigo") != undefined) ? ObtenerQueryString("codigo") : "" },
    function (res) {
        personasHtml = res;
    });
}

var CargaInicialPersonasJuridicas = function () {
    $.post("vistas/NC/ajax/NCEMPR.ASHX", { flag: 4 },
        function (res) {
            personasJuridicasHtml = res;
        });
}

//Cargag personas para firmantes 
var CargarPersonas = function (nroAut) {
    $("#divmodal").html("");
    $("#tituloModal").html("LISTA DE ACCIONISTAS/EMPLEADOS");
    if (personasHtml == "") {
        CargaInicialPersonas();
    }
    $("#divmodal").html(personasHtml);

    var tablemod = $('#tblbmodal').dataTable({
        "scrollCollapse": true,
        "paging": false,
        "info": false
    });

    $("#tblbmodal tbody").on("click", "tr", function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            tablemod.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        var IDPER2 = $(this).attr("id");

        var existe = false;
        for (var i = 0; i < firmantes.length; i++) {
            if (firmantes[i].PIDM == IDPER2) {
                existe = true;
            }
        }
        if (existe) {
            infoCustom2("La persona seleccionada ya ha sido agregada.")
        } else {
            $("#muestralistap").modal("hide");
            if ($("#txtAutorizado" + nroAut + "").val() != "") {
                var i = parseFloat(nroAut) - 1;
                firmantes.splice(i, 1);
            }
            $("#txtAutorizado" + nroAut + "").val(IDPER2);
            $("#txtAutorizado" + nroAut + "Desc").val($("#PER" + IDPER2).html());
            $("#chkObligatorio" + nroAut + "").removeAttr("checked").parent().removeClass("checked");

            var obj = '{'
            obj += '"PIDM":"' + IDPER2 + '",';
            obj += '"OBLIG":"N",';
            obj += '"NOMBRE":"' + $('#PER' + IDPER2).html() + '"';
            obj += '}';

            json = JSON.parse(obj);
            firmantes.push(json);
        }
    });
}

function ValidarPorcentaje(n) {

    var x = 0; $("#tblaccionista").dataTable().fnGetData().filter(function (e, d) { x += parseInt(e[1]); });

    if (n < 100 && n <= 100 - x) {

        return true;

    } else {

        return false;
    }


}

var NCLEMPR = function () {

    var datatable = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {

            data: json,
            columns: [

                {
                    data: "EMPRESA.CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                { data: "DESCRIPCION" },
                    {
                        data: "DESC_REGIMEN",
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
                var code = row.EMPRESA.CODIGO;

                window.location.href = '?f=ncmempr&codigo=' + code;

            }
        });

        $('#tblBandeja tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');


            var pos = table.api(true).row($(this).parent().parent()).index();
            var row = table.fnGetData(pos);
            var cod = row.EMPRESA.CODIGO;

            var aut = row.EMPRESA.AUTH;

            if (aut == "D") {
                Bloquear("ventana");
                alertCustom("Esta empresa no puede ser desactivada");

                Desbloquear("ventana");
                //        $("#ventana").click(function () { editaconclick(); $("#ventana").off('click'); });
            }
            else {

                Bloquear("ventana");
                $.post("vistas/NC/ajax/NCEMPR.ASHX", { flag: 3, codelim: cod },
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
            }
        });
    }

    return {
        init: function () {
            datatable();
        }
    };
}();


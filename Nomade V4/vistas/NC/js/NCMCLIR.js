var personaSeleccionada = {};
var arrayActividad = [];
DatosReniecCargados = new Array();
var ide;
var city = '';//dporta
var token_migo = '';//dporta
var NCMCLIR = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();
        $("#cboTipoDoc").select2();
        $("#cboClaseCliente").select2();
        //Natural
        $("#txtApePaterno").focus(function () {
            $(this).inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
        });
        $("#txtApeMaterno").focus(function () {
            $("#txtApeMaterno").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
        });
        $("#txtNombres").focus(function () {
            $("#txtNombres").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
        });
        $("#txtDireccionN").focus(function () {
            $("#txtDireccionN").inputmask({ "mask": "Z", "repeat": 200, "greedy": false });
        });
        $('#txtFechaNacimiento').datepicker('setEndDate', '-5y');
        $("#txtTelefonoN").focus(function () {
            $('#txtTelefonoN').inputmask({ "mask": "T", "repeat": 100, "greedy": false });
        });
        $("#txtEmailN").focus(function () {
            $('#txtEmailN').inputmask({ "mask": "E", "repeat": 50, "greedy": false });
        });

        //Juridico
        $("#txtRazonSocial").focus(function () {
            $("#txtRazonSocial").inputmask({ "mask": "Z", "repeat": 150, "greedy": false });
        });
        $("#txtNombreComercial").focus(function () {
            $("#txtNombreComercial").inputmask({ "mask": "Z", "repeat": 150, "greedy": false });
        });
        $("#txtDireccionJ").focus(function () {
            $("#txtDireccionJ").inputmask({ "mask": "Z", "repeat": 200, "greedy": false });
        });
        $('#txtFechaActividad').datepicker();
        $('#txtFechaActividad').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

        $("#txtTelefonoJ").focus(function () {
            $('#txtTelefonoJ').inputmask({ "mask": "T", "repeat": 100, "greedy": false });
        });
        $("#txtEmailJ").focus(function () {
            $('#txtEmailJ').inputmask({ "mask": "E", "repeat": 50, "greedy": false });
        });

        $('#txtfecharetencion').datepicker();
        $('#txtfecharetencion').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txtfechapercepcion').datepicker();
        $('#txtfechapercepcion').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    //$('#cboEmpresa').empty();
                    //$('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $('#cboEmpresa').select2('val', '');
        }
    }

    var fillClaseCliente = function () {
        $('#cboClaseCliente').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=CLACLIE&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //$('#cboClaseCliente').empty();
                //$('#cboClaseCliente').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboClaseCliente').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboClaseCliente').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cboClaseCliente').select2();
    }

    var fillClaseClienteJ = function () {
        $('#cboClaseClienteJ').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=CLACLIE&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //$('#cboClaseCliente').empty();
                //$('#cboClaseCliente').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboClaseClienteJ').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboClaseClienteJ').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cboClaseClienteJ').select2();
    }

    //DocumentosIdentidad
    var fillCboTipoDoc = function () {
        Bloquear("divCboTipoDoc");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOID",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboTipoDoc");
                $('#cboTipoDoc').empty();
                $('#cboTipoDoc').append('<option></option>');
                var codigo = "";
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoDoc').append('<option value="' + datos[i].CODIGO + '" data-sunat="' + datos[i].CODIGO_SUNAT + '">' + datos[i].DESC_CORTA + '</option>');
                    }
                    codigo = datos[0].CODIGO;
                }
                $('#cboTipoDoc').select2('val', codigo);
                $('#cboTipoDoc').change();
                cargaInicial();
            },
            error: function (msg) {
                Desbloquear("divCboTipoDoc");
                alertCustom("Documentos de Identidad no se listaron correctamente.");
            }
        });
    }

    var fillTxtActividad = function () {
        var obj = '';
        var v_value = '';
        var selectActividad = $("#txtActividad");
        Bloquear("divTxtActividad");
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmpers.ashx?OPCION=5",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divTxtActividad");
                if (datos != null) {
                    obj += '[';
                    for (var i = 0; i < datos.length; i++) {
                        arrayActividad.push(datos[i].CODIGO_SUNAT + " \- " + datos[i].NOMBRE);
                        obj += '{';
                        obj += '"NOMBRE":"' + datos[i].NOMBRE + '"';
                        obj += '},';
                    }
                    obj += '{}';
                    obj = obj.replace(',{}', '');
                    obj += ']';

                    selectActividad.typeahead({ source: arrayActividad });
                    selectActividad.keyup(function () { $(this).siblings("ul").css("width", $(this).css("width")) });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectActividad.val(v_value);
                }
            },
            error: function (msg) {
                Desbloquear("divTxtActividad");
                alertCustom("Actividades no se listaron correctamente.")
            }
        });
    }

    var eventoControles = function () {

        $("#grabar").on("click", function () {
            GrabarPersona();
        });

        $("#btnGrabarCliente").on("click", function () {
            GrabarPersonaComoCliente();
        });

        $("#modificar").on("click", function () {
            ModificarPersonita();
        });

        //Limpia Documento y Numero de Identidad del cliente
        $('#cboTipoDoc').change(function () {
            $("#txtNroDctoCliente").focus();
            var valor = $(this).val();
            switch (valor) {
                case "1": //DNI                            
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    break;
                case "6": //RUC
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    break;
                case "4": //CARNE EXTRANJ.
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
                    break;
                case "7": //PASAPORTE
                    $("#txtNroDctoCliente").inputmask({ "mask": "#", "repeat": 9, "greedy": false });
                    break;
                case "11"://PARTIDA
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    break;
                case "0"://OTROS
                    $("#txtNroDctoCliente").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    break;
            }

            var tipo = $(this).val();
            if (tipo === '6') {
                $('#txtNroDctoCliente').val($("#hfRUC").val());
            } else {
                if ($("#hfCodigoTipoDocumento").val() == tipo) {
                    $('#txtNroDctoCliente').val($("#hfNroDocumento").val());
                } else {
                    $('#txtNroDctoCliente').val("");
                }
            }

        });

        $("#txtNroDctoCliente").live("keyup", function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    BuscarClientexDocumento();
                }
            }
        });

        $("#chkpercepcion").click(function () {
            if ($("#chkpercepcion").is(':checked')) {
                $("#txtfechapercepcion").removeAttr("disabled");
                $("#txtfechapercepcion").attr('placeholder', 'dd/mm/yyyy');
                $("#txtfechapercepcion").focus();
                $("#chkpercepcion").attr("value", "S");
            } else {
                $("#txtfechapercepcion").attr("disabled", "disabled");
                $("#txtfechapercepcion").val('');
                $("#txtfechapercepcion").removeAttr('placeholder');
                $("#chkpercepcion").attr("value", "N");
            }
        });

        $("#chkretencion").click(function () {
            if ($("#chkretencion").is(':checked')) {
                $("#txtfecharetencion").removeAttr('disabled');
                $("#txtfecharetencion").attr('placeholder', 'dd/mm/yyyy');
                $("#txtfecharetencion").focus();
                $("#chkretencion").attr('value', 'S');
            } else {
                $("#txtfecharetencion").attr('disabled', true);
                $("#txtfecharetencion").val('');
                $("#txtfecharetencion").removeAttr('placeholder');
                $("#chkretencion").attr("value", "N");
            }
        });

    }

    var eventoControles1 = function() {
        $("#cboEmpresa").on("change", function () {
            LimpiarCampos();
            personaSeleccionada = {};
            $("#divPersonaJuridica").slideUp();
            $("#divPersonaNatural").slideUp();
            $("#divBotones").slideUp();
            $("#divGrabarCliente").slideUp();
            $("#cboClaseCliente").empty();
            $("#cboClaseClienteJ").empty();
            fillClaseCliente($("cboEmpresa").val());
            fillClaseClienteJ($("cboEmpresa").val());
        });

        $("#cboClaseCliente").empty();
        $("#cboClaseClienteJ").empty();
        fillClaseCliente($("cboEmpresa").val());
        fillClaseClienteJ($("cboEmpresa").val());
    }

    var cargaInicial = function () {
        var ctlg = ObtenerQueryString("ctlg");
        var tp = ObtenerQueryString("tp");
        var td = ObtenerQueryString("td");
        var d = ObtenerQueryString("d");
        var ubigeo = ObtenerQueryString("ubi");

        
        if (ctlg != null) {
            $("#cboEmpresa").select2("val", ctlg).change();
            if (td != null && d != null) {
                $("#cboTipoDoc").select2("val", td).change();
                $("#txtNroDctoCliente").val(d);
                $("#txtUbigeo").val(ubigeo);
                BuscarClientexDocumento();

                if ($('#cboTipoDoc').val() === '0') {
                    $("#txtApePaterno").focus(function () {
                        $(this).inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                    });
                    $("#txtApeMaterno").focus(function () {
                        $("#txtApeMaterno").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                    });
                    $("#txtNombres").focus(function () {
                        $("#txtNombres").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                    });
                } else {
                    $("#txtApePaterno").focus(function () {
                        $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                    });
                    $("#txtApeMaterno").focus(function () {
                        $("#txtApeMaterno").inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                    });
                    $("#txtNombres").focus(function () {
                        $("#txtNombres").inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                    });
                }

            }
        } else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
            
            fillClaseCliente();
            fillClaseClienteJ();
            eventoControles1();
        }
        $("#txtcaptcha").keypress(function (e) { if (e.keyCode == "13") { CargaReniec(); } });
            fillClaseCliente();
            fillClaseClienteJ();
            eventoControles1();
    }

    return {
        init: function () {
            plugins();
            cargarParametrosSistema();
            eventoControles();
            fillCboTipoDoc();
            fillTxtActividad();
            fillCboEmpresa();
            
        }
    };
}();

function BuscarClientexDocumento(pidm) {
    if (vErrors(['cboTipoDoc', 'txtNroDctoCliente'])) {
        //DPORTA
        let nro = $("#txtNroDctoCliente").val();//captura el número de documento
        var TipoDocumento = $.trim($('#cboTipoDoc').val());//Captura el tipo de doc

        if (nro.length == 11 && TipoDocumento == '6') {//DPORTA

            if (rucValido(nro)) {
                if ($("#cboTipoDoc").val() === '0') {
                    $("#txtApePaterno").focus(function () {
                        $(this).inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                    });
                    $("#txtApeMaterno").focus(function () {
                        $("#txtApeMaterno").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                    });
                    $("#txtNombres").focus(function () {
                        $("#txtNombres").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                    });
                } else {
                    $("#txtApePaterno").focus(function () {
                        $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                    });
                    $("#txtApeMaterno").focus(function () {
                        $("#txtApeMaterno").inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                    });
                    $("#txtNombres").focus(function () {
                        $("#txtNombres").inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                    });
                }

                var continuar = true;
                personaSeleccionada.TIPO_DCTO = $("#cboTipoDoc").val();
                personaSeleccionada.NRO_DCTO = $("#txtNroDctoCliente").val();
                //VALIDA QUE NO SE TRATE DE UNA PERSONA NATURAL CON RUC
                $("#mensaje").fadeOut();
                ide = $.trim($('#txtNroDctoCliente').val());
                if (personaSeleccionada.TIPO_DCTO == "6") {//JURIDICA         
                    if (personaSeleccionada.NRO_DCTO.length == 11) {
                        if (personaSeleccionada.NRO_DCTO.toString().substring(0, 1) == "1") {
                            //PERSONA NATURAL CON RUC
                            //infoCustom2("Persona Natural con RUC no se puede registrar en esta forma")
                            $("#msgNro").html(personaSeleccionada.NRO_DCTO.toString())
                            $("#mensaje").fadeIn();
                            NuevaPersona();
                            continuar = false;
                        } else {
                            //PERSONA JURÍDICA    
                            $('#DatosSunat').attr('style', 'display:inline;');
                            $('#DatosReniec').attr('style', 'display:none;');
                            //  $("#PerNoExiste").modal("show");
                        }


                    } else {
                        alertCustom("Ingrese un número de documento válido");
                        continuar = false;
                    }
                } else {
                    if (personaSeleccionada.TIPO_DCTO == "1") {
                        //PERSONA NATURAL
                        if (personaSeleccionada.NRO_DCTO.length == 8) {
                            $('#DatosSunat').attr('style', 'display:none;');
                            $('#DatosReniec').attr('style', 'display:inline;');
                            //   $("#PerNoExiste").modal("show");
                        } else {
                            alertCustom("Ingrese un número de documento válido");
                            continuar = false;
                        }
                    } else {
                        if (personaSeleccionada.TIPO_DCTO == "4" || personaSeleccionada.TIPO_DCTO == "7" || personaSeleccionada.TIPO_DCTO == "11" || personaSeleccionada.TIPO_DCTO == "0") {
                            $('#DatosSunat').attr('style', 'display:none;');
                            $('#DatosReniec').attr('style', 'display:none;');
                        }
                    }

                }

                if (continuar) {

                    if (pidm == undefined) { pidm = ""; }
                    Bloquear("divVerificar");
                    $.ajax({
                        type: "post",
                        async: true,
                        url: "vistas/NC/ajax/NCMCLIR.ashx?OPCION=1.5" +
                        "&p_PERS_PIDM=" + pidm +
                        "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
                        "&p_TIPO_DCTO=" + $("#cboTipoDoc").val() +
                        "&p_NRO_DCTO=" + $("#txtNroDctoCliente").val(),
                        contenttype: "application/json;",
                        datatype: "json",
                        success: function (datos) {
                            Desbloquear("divVerificar");
                            if (datos != null && datos != "") {
                                CargarDatosCliente(false, datos);//Persona ya existe, evaluar si es cliente
                                // $("#divBotones").slideDown();  
                            } else {
                                infoCustom2("Cliente NO EXISTE en el ERP, puede registrarlo");
                                setTimeout(function () {
                                    CargarDatosCliente();//Nuevo
                                }, 400);

                            }
                        },
                        error: function (msg) {
                            Desbloquear("divVerificar");
                            alertCustom("No se pudo verificar Identidad de Cliente correctamente");
                        }
                    });
                } else {
                    $("#divPersonaJuridica").slideUp();
                    $("#divPersonaNatural").slideUp();
                    $("#divBotones").slideUp();
                    $("#divGrabarCliente").slideUp();
                    LimpiarCampos();
                }
                
            } else {
                setTimeout(function () {
                    $("#txtNroDctoCliente").val("");
                }, 400);
                infoCustom2("El RUC ingresado NO existe en SUNAT");
            }
        } else {

            if ($("#cboTipoDoc").val() === '0') {
                $("#txtApePaterno").focus(function () {
                    $(this).inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                });
                $("#txtApeMaterno").focus(function () {
                    $("#txtApeMaterno").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                });
                $("#txtNombres").focus(function () {
                    $("#txtNombres").inputmask({ "mask": "Z", "repeat": 40, "greedy": false });
                });
            } else {
                $("#txtApePaterno").focus(function () {
                    $(this).inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                });
                $("#txtApeMaterno").focus(function () {
                    $("#txtApeMaterno").inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                });
                $("#txtNombres").focus(function () {
                    $("#txtNombres").inputmask({ "mask": "L", "repeat": 40, "greedy": false });
                });
            }

            var continuar = true;
            personaSeleccionada.TIPO_DCTO = $("#cboTipoDoc").val();
            personaSeleccionada.NRO_DCTO = $("#txtNroDctoCliente").val();
            //VALIDA QUE NO SE TRATE DE UNA PERSONA NATURAL CON RUC
            $("#mensaje").fadeOut();
            ide = $.trim($('#txtNroDctoCliente').val());
            if (personaSeleccionada.TIPO_DCTO == "6") {//JURIDICA         
                if (personaSeleccionada.NRO_DCTO.length == 11) {
                    if (personaSeleccionada.NRO_DCTO.toString().substring(0, 1) == "1") {
                        //PERSONA NATURAL CON RUC
                        //infoCustom2("Persona Natural con RUC no se puede registrar en esta forma")
                        $("#msgNro").html(personaSeleccionada.NRO_DCTO.toString())
                        $("#mensaje").fadeIn();
                        NuevaPersona();
                        continuar = false;
                    } else {
                        //PERSONA JURÍDICA    
                        $('#DatosSunat').attr('style', 'display:inline;');
                        $('#DatosReniec').attr('style', 'display:none;');
                        //  $("#PerNoExiste").modal("show");
                    }


                } else {
                    alertCustom("Ingrese un número de documento válido");
                    continuar = false;
                }
            } else {
                if (personaSeleccionada.TIPO_DCTO == "1") {
                    //PERSONA NATURAL
                    if (personaSeleccionada.NRO_DCTO.length == 8) {
                        $('#DatosSunat').attr('style', 'display:none;');
                        $('#DatosReniec').attr('style', 'display:inline;');
                        //   $("#PerNoExiste").modal("show");
                    } else {
                        alertCustom("Ingrese un número de documento válido");
                        continuar = false;
                    }
                } else {
                    if (personaSeleccionada.TIPO_DCTO == "4" || personaSeleccionada.TIPO_DCTO == "7" || personaSeleccionada.TIPO_DCTO == "11" || personaSeleccionada.TIPO_DCTO == "0") {
                        $('#DatosSunat').attr('style', 'display:none;');
                        $('#DatosReniec').attr('style', 'display:none;');
                    }
                }

            }

            if (continuar) {

                if (pidm == undefined) { pidm = ""; }
                Bloquear("divVerificar");
                $.ajax({
                    type: "post",
                    async: true,
                    url: "vistas/NC/ajax/NCMCLIR.ashx?OPCION=1.5" +
                    "&p_PERS_PIDM=" + pidm +
                    "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
                    "&p_TIPO_DCTO=" + $("#cboTipoDoc").val() +
                    "&p_NRO_DCTO=" + $("#txtNroDctoCliente").val(),
                    contenttype: "application/json;",
                    datatype: "json",
                    success: function (datos) {
                        Desbloquear("divVerificar");
                        if (datos != null && datos != "") {
                            CargarDatosCliente(false, datos);//Persona ya existe, evaluar si es cliente
                            // $("#divBotones").slideDown();  
                        } else {
                            infoCustom2("Cliente NO EXISTE en el ERP, puede registrarlo");
                            setTimeout(function () {
                                CargarDatosCliente();//Nuevo
                            }, 400);

                        }
                    },
                    error: function (msg) {
                        Desbloquear("divVerificar");
                        alertCustom("No se pudo verificar Identidad de Cliente correctamente");
                    }
                });
            } else {
                $("#divPersonaJuridica").slideUp();
                $("#divPersonaNatural").slideUp();
                $("#divBotones").slideUp();
                $("#divGrabarCliente").slideUp();
                LimpiarCampos();
            }
        }
    }
}

//DPORTA -- AMBAS FORMAS FUNCIONAN BIEN, PERO SE DEJÓ EN EL SEGUNDO PORQUE ES MÁS FÁCIL DE ENTENDER

//function rucValido(ruc) {
//    //11 dígitos y empieza en 10,15,16,17 o 20
//    if (!(ruc >= 1e10 && ruc < 11e9
//        || ruc >= 15e9 && ruc < 18e9
//        || ruc >= 2e10 && ruc < 21e9))
//        return false;

//    for (var suma = -(ruc % 10 < 2), i = 0; i < 11; i++ , ruc = ruc / 10 | 0)
//        suma += (ruc % 10) * (i % 7 + (i / 7 | 0) + 1);
//    return suma % 11 === 0;

//}

//DPORTA
function rucValido(ruc) {

    var dig01 = ruc.substr(0, 1) * 5;
    var dig02 = ruc.substr(1, 1) * 4;
    var dig03 = ruc.substr(2, 1) * 3;
    var dig04 = ruc.substr(3, 1) * 2;
    var dig05 = ruc.substr(4, 1) * 7;
    var dig06 = ruc.substr(5, 1) * 6;
    var dig07 = ruc.substr(6, 1) * 5;
    var dig08 = ruc.substr(7, 1) * 4;
    var dig09 = ruc.substr(8, 1) * 3;
    var dig10 = ruc.substr(9, 1) * 2;
    var dig11 = ruc.substr(10, 1);

    var suma = dig01 + dig02 + dig03 + dig04 + dig05 + dig06 + dig07 + dig08 + dig09 + dig10;

    var residuo = suma % 11;
    var resta = 11 - residuo;

    var digVerifica;

    if (resta == 10) {
        digVerifica = 0;
    } else if (resta == 11) {
        digVerifica = 1;
    } else {
        digVerifica = resta;
    }

    if (dig11 == digVerifica) {
        return true;
    } else {
        return false;
    }

}

function CargarDatosCliente(nuevoInd, datos) {
    if (nuevoInd == undefined) {
        nuevoInd = true;
    }
    $("#lblTipoDocumento").html($("#cboTipoDoc :selected").html());
    $("#txtNroDocumento").val(personaSeleccionada.NRO_DCTO);

    if (nuevoInd) {//NUEVA PERSONA
        LimpiarCampos();
        $("#divBotones").slideDown();
        $("#divGrabarCliente").hide();
        //DPORTA
        $("#divBotones2").hide();
        if ($('#cboTipoDoc').val() == '1' || $('#cboTipoDoc').val() == '6') {
            $("#PerNoExiste").modal("show");
        } else {
            $("#PerNoExiste").modal("hide");
        }
        
    } else {
        //Llenar datos
        personaSeleccionada.PIDM = datos[0].PIDM;
        if (datos[0].ENTIDAD_IND == "J") {
            $('#txtRazonSocial').val(datos[0].RAZON_SOCIAL)
            $('#txtNombreComercial').val(datos[0].NOMBRE_COMERCIAL)
            $('#txtDireccionJ').val(datos[0].DIRECCION)
            $('#txtActividad').val(datos[0].ACTIVIDAD)
            $('#txtTelefonoJ').val(datos[0].TELEFONO)
            $('#txtFechaActividad').val(datos[0].INICIO_ACTIVIDAD)
            $('#txtEmailJ').val(datos[0].CORREO)
            if (datos[0].RETENCION_IND == 'S') {
                $("#chkretencion").attr("checked", "checked").parent().addClass("checked");
            } else {
                $("#chkretencion").removeAttr("checked", "checked").parent().removeClass("checked");
            }
            if (datos[0].PERCEPCION_IND == 'S') {
                $("#chkpercepcion").attr("checked", "checked").parent().addClass("checked");
            } else {
                $("#chkpercepcion").removeAttr("checked", "checked").parent().removeClass("checked");
            }
            if (datos[0].ESTADO == 'A') {
                $("#chkrActivoJ").attr("checked", "checked").parent().addClass("checked");
            } else {
                $("#chkrActivoJ").removeAttr("checked", "checked").parent().removeClass("checked");
            }
            $('#txtfecharetencion').val(datos[0].RETENCION_DESDE)
            $('#txtfechapercepcion').val(datos[0].PERCEPCION_DESDE)
            BloquearCamposJuridico();
        } else {
            $('#txtApePaterno').val(datos[0].PATERNO)
            $('#txtApeMaterno').val(datos[0].MATERNO)
            $('#txtNombres').val(datos[0].NOMBRE)
            if (datos[0].GENERO == 'M') {
                $('#rbnMasculino').attr("checked", "checked").parent().addClass("checked");
                $("#rbnFemenino").removeAttr("checked", "checked").parent().removeClass("checked");
            } else {
                $('#rbnFemenino').attr("checked", "checked").parent().addClass("checked");
                $("#rbnMasculino").removeAttr("checked", "checked").parent().removeClass("checked");
            }
            if (datos[0].ESTADO == 'A') {
                $("#chkrActivoN").attr("checked", "checked").parent().addClass("checked");
            } else {
                $("#chkrActivoN").removeAttr("checked", "checked").parent().removeClass("checked");
            }
            $('#txtDireccionN').val(datos[0].DIRECCION)
            $('#txtFechaNacimiento').val(datos[0].FECNAC)
            $('#txtTelefonoN').val(datos[0].TELEFONO)
            $('#txtEmailN').val(datos[0].CORREO)
            BloquearCamposNatural();
        }

        //Ocultar/bloquear Datos
        if (datos[0].CLIENTE_IND == "S") {
            infoCustom2("Cliente YA EXISTE en el ERP.");
            $("#divBotones").slideUp();
            $("#divGrabarCliente").slideUp();
            $(".oblig").hide();
            //DPORTA
            $("#divBotones2").slideDown();
            if (datos[0].ENTIDAD_IND == "J") {
                $("#chkActivoJ").attr("style", "display:inline");
                $("#chkActivoJR").attr("style", "display:inline");
            } else {
                $("#chkActivoN").attr("style", "display:inline");
                $("#chkActivoNA").attr("style", "display:inline");
            }
        } else {
           
            infoCustom2("Persona EXISTE, pero NO es cliente de la empresa seleccionada.");
            $(".oblig").hide();
            $("#divGrabarCliente").slideDown();
            $("#divBotones").hide();
            //DPORTA
            $("#divBotones2").hide();
        }
    }
    if ($("#cboTipoDoc").val() == "6") {
        $("#divPersonaJuridica").slideDown();
        $("#divPersonaNatural").hide();

    } else {
        $("#divPersonaNatural").slideDown();
        $("#divPersonaJuridica").hide();
        $("#txtDireccionN").val(city); //DPORTA
    }
}

function GrabarPersona() {
    if (personaSeleccionada.TIPO_DCTO != "undefined" && personaSeleccionada.NRO_DCTO != "undefined") {
        if (personaSeleccionada.TIPO_DCTO == "6") {//JURIDICA         
            if (personaSeleccionada.NRO_DCTO.length == 11) {
                if (personaSeleccionada.NRO_DCTO.toString().substring(0, 1) == "1") {
                    //PERSONA NATURAL CON RUC
                    infoCustom2("Persona Natural con RUC no se puede registrar en esta forma")
                } else {
                    //PERSONA JURÍDICA
                    GrabarClienteJuridico();
                }
            } else {
                alertCustom("Ingrese un número de documento válido");
            }
        } else {//PERSONA NATURAL
            GrabarClienteNatural();
        }
    }
}
//DPORTA
function ModificarPersonita() {
    if (personaSeleccionada.TIPO_DCTO != "undefined" && personaSeleccionada.NRO_DCTO != "undefined") {
        if (personaSeleccionada.TIPO_DCTO == "6") {//JURIDICA         
            if (personaSeleccionada.NRO_DCTO.length == 11) {
                if (personaSeleccionada.NRO_DCTO.toString().substring(0, 1) == "1") {
                    //PERSONA NATURAL CON RUC
                    infoCustom2("Persona Natural con RUC no se puede registrar en esta forma")
                } else {
                    //PERSONA JURÍDICA
                    ModificarClienteJuridico();
                }
            } else {
                alertCustom("Ingrese un número de documento válido");
            }
        } else {//PERSONA NATURAL
            ModificarClienteNatural();
        }
    }
}

//DPORTA
function ModificarClienteNatural() {
    if (vErrors(['txtApePaterno'])) {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ESTADO_IND_N', ($("#chkrActivoN").is(":checked")) ? "A" : "I");
        data.append('DOID_CODE', personaSeleccionada.TIPO_DCTO);
        data.append('NRO', personaSeleccionada.NRO_DCTO);

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCLIR.ashx?OPCION=MODIFICAR_PERS_NATURAL",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true,
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos.length > 0) {
                    if (datos[0].SUCCESS == "OK") {
                        //$("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        //$("#grabar").attr("href", "javascript:ModificarNatural();");
                        exito();
                        BloquearCamposNatural();

                    }
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    } 
}
//DPORTA
function ModificarClienteJuridico() {
    if (vErrors(['txtRazonSocial'])) {

        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ESTADO_IND_J', ($("#chkrActivoJ").is(":checked")) ? 'A' : 'I');
        data.append('p_PPBDOID_DOID_CODE', personaSeleccionada.TIPO_DCTO);
        data.append('p_PPBDOID_NRO', personaSeleccionada.NRO_DCTO);

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCLIR.ashx?OPCION=MODIFICAR_PERS_JURIDICA",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true,
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos.length > 0) {
                    if (datos[0].SUCCESS == "OK") {
                        //$("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        //$("#grabar").attr("href", "javascript:ModificarJuridica();");
                        exito();
                        BloquearCamposJuridico();
                    }
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
}

function GrabarClienteNatural() {
    if (vErrors(['txtApePaterno', 'txtNombres', 'txtDireccionN'])) {
        var continuar = false;
        continuar = validarPersonaNatural();

        if (continuar) {

            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('APELL_PATE', $("#txtApePaterno").val().trim());
            data.append('APELL_MATE', $("#txtApeMaterno").val().trim());
            data.append('NOMBRE', $("#txtNombres").val().trim());
            data.append('FECHA', $("#txtFechaNacimiento").val());
            data.append('USUA_ID', $("#ctl00_lblusuario").html());
            data.append('SEXO', ($("#rbnMasculino").is(":checked")) ? "M" : "F");
            data.append('DOID_CODE', personaSeleccionada.TIPO_DCTO);
            data.append('NRO', personaSeleccionada.NRO_DCTO);
            data.append('NUMERO', $("#txtTelefonoN").val().trim());
            data.append('CORREO', $("#txtEmailN").val().trim());
            data.append('UBIGEO', $("#txtUbigeo").val().trim());
            data.append('p_PPBIMAG_TIPO', "N");//NATURAL
            data.append('DIRECCION_N', $("#txtDireccionN").val().trim());

            data.append('p_CLASE_CLIENTE', $("#cboClaseCliente").val());

            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMCLIR.ashx?OPCION=2",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true,
            })
                .success(function (datos) {
                    Desbloquear("ventana");
                    if (datos.length > 0) {
                        if (datos[0].SUCCESS == "OK") {
                            if (datos[0].p_MSG_RUC == "EXISTE") {
                                alertCustom("El RUC ingresado ya está registrado")
                            }
                            else {
                                //$("#grabar").html("<i class='icon-pencil'></i> Modificar");
                                //$("#grabar").attr("href", "javascript:ModificarNatural();");
                                exito();
                                personaSeleccionada.PIDM = datos[0].p_PPBIDEN_PIDM;
                                personaSeleccionada.ID = datos[0].ID;
                                personaSeleccionada.TELE_NUM_SEQ = datos[0].p_PPRTELE_NUM_SEQ;
                                personaSeleccionada.CORR_NUM_SEQ = datos[0].p_PPRCORR_NUM_SEQ;
                                personaSeleccionada.IMAG_CODE = datos[0].p_PPBIMAG_CODE;
                                BloquearCamposNatural();

                            }
                        }
                    }
                })
                .error(function () {
                    Desbloquear("ventana");
                    noexito();
                });
        }
    }
}

function GrabarClienteJuridico() {
    if (vErrors(['txtRazonSocial', 'txtDireccionJ'])) {
        var continuar = false;
        continuar = validarPersonaJuridica();
        if (continuar) {

            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());

            data.append('p_PPBIDEN_APELL_PATE', $("#txtRazonSocial").val().trim());
            data.append('p_PPBIDEN_RAZO_COME', $("#txtNombreComercial").val().trim());
            data.append('p_PPBIDEN_ACTIVIDAD', $("#txtActividad").val().trim());
            data.append('p_PPBIDEN_AGENTE_RETEN_IND', ($("#chkretencion").is(":checked")) ? 'S' : 'N');
            data.append('p_PPBIDEN_FECHA_AGENTE_RETEN', $("#txtfecharetencion").val());
            data.append('p_PPBIDEN_AGENTE_PERCEP_IND', ($("#chkpercepcion").is(":checked")) ? 'S' : 'N');
            data.append('p_PPBIDEN_FECHA_AGENTE_PERCEP', $("#txtfechapercepcion").val());
            data.append('p_PPBIDEN_USUA_ID', $("#ctl00_lblusuario").html());
            data.append('p_PPBDOID_DOID_CODE', personaSeleccionada.TIPO_DCTO);
            data.append('p_PPBDOID_NRO', personaSeleccionada.NRO_DCTO);
            data.append('p_PPRTELE_NUMERO', $("#txtTelefonoJ").val().trim());
            data.append('p_PPRCORR_CORREO', $("#txtEmailJ").val().trim());
            data.append('p_INICIO_ACTIVIDAD', $("#txtFechaActividad").val());
            data.append('p_UBIGEO', $("#txtUbigeo").val());
            data.append('p_PPBIMAG_TIPO', "J");//JURIDICO
            data.append('DIRECCION_J', $("#txtDireccionJ").val().trim());

            data.append('p_CLASE_CLIENTE', $("#cboClaseClienteJ").val());

            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMCLIR.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true,
            })
                .success(function (datos) {
                    Desbloquear("ventana");
                    if (datos.length > 0) {
                        if (datos[0].SUCCESS == "OK") {
                            //$("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            //$("#grabar").attr("href", "javascript:ModificarJuridica();");
                            exito();
                            personaSeleccionada.PIDM = datos[0].p_PPBIDEN_PIDM;
                            personaSeleccionada.ID = datos[0].ID;
                            personaSeleccionada.TELE_NUM_SEQ = datos[0].p_PPRTELE_NUM_SEQ;
                            personaSeleccionada.CORR_NUM_SEQ = datos[0].p_PPRCORR_NUM_SEQ;
                            personaSeleccionada.IMAG_CODE = datos[0].p_PPBIMAG_CODE;

                            BloquearCamposJuridico()
                        }
                    }
                })
                .error(function () {
                    Desbloquear("ventana");
                    noexito();
                });
        }
    }
}

function validarPersonaNatural() {
    var Errors = true;
    //VALIDA EMAIL
    var email = $.trim($('#txtemail').val());
    if (email.length > 0) {
        if (validarEmail($.trim($('#txtEmailN').val())) == false) {
            $('#txtEmailN').val('');
            if (vErrorsNotMessage("txtEmailN") == false) {
                $('#txtEmailN').val(email);
                Errors = false;
            }
        }
    }

    if (!Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }

    return Errors;
}

function validarPersonaJuridica() {
    var Errors = true;
    //VALIDA EMAIL
    var email = $.trim($('#txtEmailJ').val());
    if (email.length > 0) {
        if (validarEmail(email) == false) {
            $('#txtEmailJ').val('');
            if (vErrorsNotMessage(["txtEmailJ"]) == false) {
                $('#txtEmailJ').val(email);
                Errors = false;
            }
        }
    }
    //VALIDA ACTIVIDAD
    var actividad = $.trim($('#txtActividad').val());
    if (actividad.length > 0) {

        var jsonActividades = arrayActividad;
        var existeActividad = false;
        for (var i = 0; i < jsonActividades.length; i++) {
            if (actividad == jsonActividades[i]) {
                existeActividad = true;
                break;
            }
        }
        if (!existeActividad) {
            $('#txtActividad').val('');

            if (vErrorsNotMessage(["txtActividad"]) == false) {
                $('#txtActividad').val(actividad);
                Errors = false;
            }
        }
    }
    //VALIDA RETENCION
    var v_FechaRetencion = $('#txtfecharetencion').val();
    if ($("#chkretencion").is(':checked')) {
        if (v_FechaRetencion == "") {
            if (vErrorsNotMessage(["txtfecharetencion"]) == false) {
                Errors = false;
            }
        }
        else {

            offObjectEvents('txtfecharetencion');
            $('#txtfecharetencion').val(v_FechaRetencion);
        }
    }
    //VALIDA PERCEPCION
    var v_FechaPercepcion = $('#txtfechapercepcion').val();
    if ($("#chkpercepcion").is(':checked')) {
        if (v_FechaPercepcion == "") {
            if (vErrorsNotMessage(["txtfechapercepcion"]) == false) {
                Errors = false;
            }
        }
        else {
            offObjectEvents('txtfechapercepcion');
            $('#txtfechapercepcion').val(v_FechaPercepcion);
        }

    }

    if (!Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }
    return Errors;
}

function BloquearCamposNatural() {
    var ids = ['txtApePaterno', 'txtApeMaterno', 'txtNombres', 'rbnMasculino', 'rbnFemenino',
        'txtDireccionN', 'txtFechaNacimiento', 'txtTelefonoN', 'txtEmailN', 'cboClaseCliente'];
    for (var i = 0; i < ids.length; i++) {
        $("#" + ids[i] + "").attr("disabled", "disabled");
    }
    $("#divBotones").hide();
}

function BloquearCamposJuridico() {
    var ids = ['txtRazonSocial', 'txtNombreComercial', 'txtDireccionJ', 'txtActividad',
        'txtTelefonoJ', 'txtFechaActividad', 'txtEmailJ',
        'chkretencion', 'txtfecharetencion', 'chkpercepcion', 'txtfechapercepcion', 'cboClaseClienteJ'];
    for (var i = 0; i < ids.length; i++) {
        $("#" + ids[i] + "").attr("disabled", "disabled");
    }
    $("#divBotones").hide();
}

function LimpiarCampos(tipo) {
    if (tipo == undefined || tipo == "N") {
        var ids = ['txtApePaterno', 'txtApeMaterno', 'txtNombres', 'rbnMasculino', 'rbnFemenino',
            'txtDireccionN', 'txtFechaNacimiento', 'txtTelefonoN', 'txtEmailN', 'cboClaseCliente','cboClaseClienteJ'];
        for (var i = 0; i < ids.length; i++) {
            $("#" + ids[i] + "").val("");
        }
    }
    if (tipo == undefined || tipo == "J") {
        var ids = ['txtRazonSocial', 'txtNombreComercial', 'txtDireccionJ', 'txtActividad',
        'txtTelefonoJ', 'txtFechaActividad', 'txtEmailJ',
            'chkretencion', 'txtfecharetencion', 'chkpercepcion', 'txtfechapercepcion', 'cboClaseCliente','cboClaseClienteJ'];
        for (var i = 0; i < ids.length; i++) {
            $("#" + ids[i] + "").val("");
        }
    }
    $(".oblig").show();
}

function NuevaPersona() {
    $("#cboTipoDoc").select2("val", "1").change();
    $("#txtNroDctoCliente").val("");
    LimpiarCampos();
    personaSeleccionada = {};
    $("#divPersonaJuridica").slideUp();
    $("#divPersonaNatural").slideUp();
    $("#divBotones").slideUp();
    $("#divGrabarCliente").slideUp();

    var ids = ['txtRazonSocial', 'txtNombreComercial', 'txtDireccionJ', 'txtActividad',
      'txtTelefonoJ', 'txtFechaActividad', 'txtEmailJ',
        'chkretencion', 'txtfecharetencion', 'chkpercepcion', 'txtfechapercepcion','cboClaseClienteJ'];
    for (var i = 0; i < ids.length; i++) {
        $("#" + ids[i] + "").removeAttr("disabled");
    }

    var ids = ['txtApePaterno', 'txtApeMaterno', 'txtNombres', 'rbnMasculino', 'rbnFemenino',
        'txtDireccionN', 'txtFechaNacimiento', 'txtTelefonoN', 'txtEmailN', 'cboClaseCliente'];
    for (var i = 0; i < ids.length; i++) {
        $("#" + ids[i] + "").removeAttr("disabled");
    }
}

function GrabarPersonaComoCliente() {

    var data = new FormData();
    data.append('p_CTLG_CODE', $("#cboEmpresa").val());
    data.append('USUA_ID', $("#ctl00_lblusuario").html());
    data.append('p_PERS_PIDM', personaSeleccionada.PIDM);
    data.append('p_CLASE_CLIENTE', $("#cboClaseCliente").val());
    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMCLIR.ashx?OPCION=RCLI",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true,
    })
   .success(function (datos) {
       if (datos == "OK") {
           exito();
           $("#divBotones").slideUp();
           $("#divGrabarCliente").slideUp();
           $(".oblig").hide();
           BloquearCamposNatural();
           BloquearCamposJuridico();
       } else {
           noexito()
       }
       Desbloquear("ventana");
   })
   .error(function () {
       Desbloquear("ventana");
       noexito();
   });

}


//function MuestraSunat() {

//    var NRO = $("#txtNroDctoCliente").val();

//    $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (data) {

//            if (data == "NO_EXISTE" || data == "error") {
//                $("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido.</p>');

//                $("#existe").css("display", "none");
//            } else {

//                if (data == "ERROR_CAPTCHA") {
//                    infoCustom2("No se puede establecer comunicación con Sunat en este momento, inténtelo en unos minutos o escoja Datos en blanco");
//                    $('#SunatCaptcha').modal('hide');
//                    $('#ModalSunat').modal('hide');

//                } else {
//                    var datos = $.parseJSON(data)

//                    if (datos[0].FECHA_BAJA != "0000-00-00" && datos[0].FECHA_BAJA != "[]") {

//                        //DPORTA_RF
//                        let fecha;
//                        let mes;
//                        let anio;
//                        let dia;
//                        let fecha_baja;

//                        fecha = datos[0].FECHA_BAJA;

//                        anio = fecha.split("-")[0];
//                        mes = fecha.split("-")[1];
//                        dia = fecha.split("-")[2];

//                        fecha_baja = dia + "/" + mes + "/" + anio;

//                        $("#no_existe").css("display", "block").html('<p>El <b>RUC ' + NRO + '</b> perteneciente a <B>' + datos[0].RAZON + '</B> se encuentra en <B>' + datos[0].ESTADO + '</B> desde <B>' + fecha_baja + '</B> por SUNAT. </p>');;
//                        $("#existe").css("display", "none");

//                    }
//                    else {

//                        if (datos != null) {

//                            //DPORTA_RF
//                            let fecha;
//                            let mes;
//                            let anio;
//                            let dia;
//                            let new_fecha;

//                            fecha = datos[0].FECHA_INICIO;

//                            anio = fecha.split("-")[0];
//                            mes = fecha.split("-")[1];
//                            dia = fecha.split("-")[2];

//                            new_fecha = dia + "/" + mes + "/" + anio;

//                            $("#existe").css("display", "block");
//                            $("#no_existe").css("display", "none");
//                            $('#lblModalNumeroRuc').html(NRO);
//                            $('#lblrazonsocial').html(datos[0].RAZON);
//                            $('#lblModalEstado').html(datos[0].ESTADO);
//                            $('#lblModalSituacion').html(datos[0].CONDICION);
//                            $('#lblModalDireccion').html(datos[0].DIRECCION);
//                            $('#lblModalTelefono').html(datos[0].TELEFONO);
//                            $('#lblModalActividad').html(datos[0].ACTIVIDAD);
//                            $('#lblModalNombreComercial').html(datos[0].NOMBRE_COMERCIAL)
//                            $('#lblModalFechaIni').html(new_fecha)

//                            DatosSunatCargados = datos[0];
//                        } else {


//                        }
//                    }

//                    $('#SunatCaptcha').modal('hide');
//                    $('#ModalSunat').modal('show');

//                }
                
//            }
            
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });

//}

function FechaDelDia() {
    $("#txtFechaActividad").datepicker({
        dateFormat: 'dd/mm/yy',
        firstDay: 1
    }).datepicker("setDate", new Date());

    var fecha = new Date();
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;

    var fNueva = dia + '/' + mes + '/' + ano;

    $("#txtFechaActividad").val(fNueva);
};

//Nuevo link, en caso el que se está usando ahora deje de funcionar (Aún en desarrollo)
function MuestraSunat() {

    var NRO = ide;
    var formData = new FormData();

    formData.append("token", token_migo);
    formData.append("ruc", NRO);

    var request = new XMLHttpRequest();

    request.open("POST", "https://api.migo.pe/api/v1/ruc");
    request.setRequestHeader("Accept", "application/json");

    request.send(formData);
    request.onload = function () {
        var data = JSON.parse(this.response);
        $("#PerNoExiste").modal('hide');
        if (data.success == true) {
            if (data.estado_del_contribuyente == "ACTIVO") {
                if (data.condicion_de_domicilio == "HABIDO") {
                    $("#existe").css("display", "block");
                    $("#no_existe").css("display", "none");
                    $('#lblModalNumeroRuc').html(data.ruc);
                    $('#lblrazonsocial').html(data.nombre_o_razon_social);
                    $('#lblModalEstado').html(data.estado_del_contribuyente);
                    $('#lblModalSituacion').html(data.condicion_de_domicilio);
                    $('#lblModalDireccion').html(data.direccion);
                    //$('#lblModalTelefono').html("");
                    //$('#lblModalActividad').html("");
                    $('#lblModalNombreComercial').html(data.nombre_o_razon_social);
                    //$('#lblModalFechaIni').html("")
                    $('#txtCondSunat').html(data.condicion_de_domicilio);
                    $('#txtEstaSunat').html(data.estado_del_contribuyente);
                    DatosSunatCargados = data;

                    $('#SunatCaptcha').modal('hide');
                    $('#ModalSunat').modal('show');
                    
                    
                } else {
                    infoCustom2("El RUC: " + NRO + " se encuentra como " + data.condicion_de_domicilio + " por SUNAT.");
                    $("#divPersonaJuridica").slideUp();
                    $("#divBotones").slideUp();
                }
            } else {
                infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
                $("#divPersonaJuridica").slideUp();
                $("#divBotones").slideUp();
            }
        } 
    };
}


function cargarParametrosSistema() {

    //OCULTAR CBO_CLASECLIENTE 
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=OCCL",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (datos[0].VALOR == "SI") {
                    $("#divTxtClaseCliente").attr("style", "display:none");
                    $("#divCboClaseCliente").attr("style", "display:none");
                    $("#divTxtClaseClienteJ").attr("style", "display:none");
                    $("#divCboClaseClienteJ").attr("style", "display:none");

                } else {
                    $("#divTxtClaseCliente").attr("style", "display:inline");
                    $("#divCboClaseCliente").attr("style", "display:inline");
                    $("#divTxtClaseClienteJ").attr("style", "display:inline");
                    $("#divCboClaseClienteJ").attr("style", "display:inline");
                }
            }
        },
    });

    //DIRECCION(CIUDAD) POR DEFECTO
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CIDE",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (datos[0].VALOR == "SI") {
                    city = datos[0].DESCRIPCION_DETALLADA;

                } else {
                    city = "TRUJILLO";
                }
            } else {
                city = "TRUJILLO";
            }
        },
    });

    //TOKEN PARA PODER HACER LAS CONSULTAS DE LOS N° DE DOCS. A SUNAT
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=MIGO",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                token_migo = datos[0].DESCRIPCION_DETALLADA; 
            } else {
                alertCustom("No se recuperó correctamente el parámetro MIGO!");
            }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro MIGO!");
        }
    });
}


function CargarDatosSunat() {

    //DPORTA_RF
    //let fecha;
    //let mes;
    //let anio;
    //let dia;
    //let new_fecha;

    //fecha = DatosSunatCargados.FECHA_INICIO;

    //anio = fecha.split("-")[0];
    //mes = fecha.split("-")[1];
    //dia = fecha.split("-")[2];

    //new_fecha = dia + "/" + mes + "/" + anio;

    //$("#txtRazonSocial").val(DatosSunatCargados.RAZON);
    //$("#txtDireccionJ").val(DatosSunatCargados.DIRECCION);
    //$("#txtTelefonoJ").val(DatosSunatCargados.TELEFONO);
    //$("#txtNombreComercial").val(DatosSunatCargados.NOMBRE_COMERCIAL);
  
    //$("#txtActividad").val(DatosSunatCargados.ACTIVIDAD.substring(0, 6)).keyup();
    //$("#txtActividad").siblings("ul").children("li").click();
    //$("#txtFechaActividad").val(new_fecha);
    //$("#divPersonaJuridica").slideDown();
    //$("#divPersonaNatural").hide();
    //$("#divBotones").slideDown();


    $("#txtRazonSocial").val(eliminarDiacriticos(DatosSunatCargados.nombre_o_razon_social));
    $("#txtDireccionJ").val(DatosSunatCargados.direccion == ('-' || '') ? city : eliminarDiacriticos(DatosSunatCargados.direccion));
    //$("#txtTelefonoJ").val(DatosSunatCargados.TELEFONO);
    $("#txtNombreComercial").val(eliminarDiacriticos(DatosSunatCargados.nombre_o_razon_social));
    //$("#txtUbigeo").val((DatosSunatCargados.direccion == ('-' || '') ? "130101": DatosSunatCargados.ubigeo));
    $("#txtActividad").val("");
    //$("#txtActividad").siblings("ul").children("li").click();
    //$("#txtFechaActividad").val("");
    FechaDelDia();
    $("#divPersonaJuridica").slideDown();
    $("#divPersonaNatural").hide();
    $("#divBotones").slideDown();
}

function CancelarSunat() {
    $('#ModalSunat').modal('hide');
}


function MuestraReniec() {
    //DPORTA_RF
    var NRO = ide;
    if (NRO.length == 8) {
        var formData = new FormData();
        formData.append("token", token_migo);
        formData.append("dni", NRO);

        var request = new XMLHttpRequest();

        request.open("POST", "https://api.migo.pe/api/v1/dni-beta");
        request.setRequestHeader("Accept", "application/json");

        request.send(formData);
        request.onload = function () {
            var data = JSON.parse(this.response);
            $("#PerNoExiste").modal('hide');
            if (data.success == true) {
                $("#captchaModal").modal('hide');

                DatosReniecCargados = data;
                $('#txtApePaterno').val(DatosReniecCargados.apellido_paterno);
                $('#txtApeMaterno').val(DatosReniecCargados.apellido_materno);
                $('#txtNombres').val(DatosReniecCargados.nombres);
                $("#txtNroDocumento").val(DatosReniecCargados.dni);
                if (DatosReniecCargados != null && DatosReniecCargados != "") {
                    var ids = ['txtApePaterno', 'txtApeMaterno', 'txtNombres', 'rbnMasculino', 'rbnFemenino',
                        'txtDireccionN', 'txtFechaNacimiento', 'txtTelefonoN', 'txtEmailN'];
                    for (var i = 0; i < ids.length; i++) {
                        $("#" + ids[i] + "").removeAttr("disabled");
                    }

                    $("#divPersonaNatural").slideDown();
                    $("#divPersonaJuridica").hide();
                    $("#divBotones").slideDown();
                }
            } else {
                MuestraReniec2();//DPORTA 27/09/2021
                //alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
                //$("#captchaModal").modal('hide');
                //$("#PerNoExiste").modal("show");
            }
        }; 
    } else {
        infoCustom2("RENIEC solo consulta números de DNI");
    }

    //$.ajax({
    //    type: "post",
    //    url: "vistas/nc/ajax/ncmpers.ashx?OPCION=RENIEC&NRO=" + NRO,
    //    contenttype: "application/json;",
    //    datatype: "json",
    //    async: false,
    //    success: function (data) {

    //        switch (data) {

    //            case "SIN_RESULTADOS":
    //                alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
    //                $("#captchaModal").modal('hide');
    //                $("#PerNoExiste").modal("show");

    //                break;

    //            default:
    //                $("#captchaModal").modal('hide');

    //                MuestraFormulario(false, 'R');
    //                DatosReniecCargados = JSON.parse(data);

    //        }
    //    }
    //});
}

function MuestraReniec2() {//DPORTA 27/09/2021
    //DPORTA_RF
    var NRO = ide;
    if (NRO.length == 8) {
        var formData = new FormData();
        formData.append("token", token_migo);
        formData.append("dni", NRO);

        var request = new XMLHttpRequest();

        request.open("POST", "https://api.migo.pe/api/v1/dni");
        request.setRequestHeader("Accept", "application/json");

        request.send(formData);
        request.onload = function () {
            var data = JSON.parse(this.response);
            $("#PerNoExiste").modal('hide');
            if (data.success == true) {
                $("#captchaModal").modal('hide');

                DatosReniecCargados = data;
                $('#txtApePaterno').val(DatosReniecCargados.nombre.split(" ")[0]);
                $('#txtApeMaterno').val(DatosReniecCargados.nombre.split(" ")[1]);
                if (DatosReniecCargados.nombre.split(" ")[3] == undefined) {
                    $('#txtNombres').val(DatosReniecCargados.nombre.split(" ")[2]);
                } else if (DatosReniecCargados.nombre.split(" ")[4] == undefined) {
                    $('#txtNombres').val(DatosReniecCargados.nombre.split(" ")[2] + ' ' + DatosReniecCargados.nombre.split(" ")[3]);
                } else {
                    $('#txtNombres').val(DatosReniecCargados.nombre.split(" ")[2] + ' ' + DatosReniecCargados.nombre.split(" ")[3] + ' ' + DatosReniecCargados.nombre.split(" ")[4]);
                }
                
                $("#txtNroDocumento").val(DatosReniecCargados.dni);
                if (DatosReniecCargados != null && DatosReniecCargados != "") {
                    var ids = ['txtApePaterno', 'txtApeMaterno', 'txtNombres', 'rbnMasculino', 'rbnFemenino',
                        'txtDireccionN', 'txtFechaNacimiento', 'txtTelefonoN', 'txtEmailN'];
                    for (var i = 0; i < ids.length; i++) {
                        $("#" + ids[i] + "").removeAttr("disabled");
                    }

                    $("#divPersonaNatural").slideDown();
                    $("#divPersonaJuridica").hide();
                    $("#divBotones").slideDown();
                }
            } else {
                alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
                $("#captchaModal").modal('hide');
                $("#PerNoExiste").modal("show");
            }
        };
    } else {
        infoCustom2("RENIEC solo consulta números de DNI");
    }
}

//function CargaReniec() {

//    var NRO = ide;
//    $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=RENIEC&NRO=" + NRO + "&CAPTCHA=" + $("#txtcaptcha").val(),
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (data) {

//            switch (data) {

//                case "CAPTCHA":

//                    $("#msgcaptcha")
//                        .html("Ingreso del captcha no v&aacute;lido!<a href='javascript:MuestraReniec();'> Reintentar<a>")
//                        .css("display", "block");
                  
//                    break;

//                case "SIN_RESULTADOS":
//                    alertCustom("No se Encontraron Resultados.")
//                    $("#captchaModal").modal('hide');
//                    $("#PerNoExiste").modal("show");

//                    break;

//                case "ERROR":

//                    alertCustom("Se produjo un error en la consulta. Intente nuevamente más tarde.")
//                    $("#captchaModal").modal('hide');
//                    $("#PerNoExiste").modal("show");

//                    break;

//                default:
//                    $("#captchaModal").modal('hide');

//                    DatosReniecCargados = JSON.parse(data);
//                    cargaDatosReniec(DatosReniecCargados);
//                    if (DatosReniecCargados != null && DatosReniecCargados != "") {
//                        var ids = ['txtApePaterno', 'txtApeMaterno', 'txtNombres', 'rbnMasculino', 'rbnFemenino',
//                                 'txtDireccionN', 'txtFechaNacimiento', 'txtTelefonoN', 'txtEmailN'];
//                        for (var i = 0; i < ids.length; i++) {
//                            $("#" + ids[i] + "").removeAttr("disabled");
//                        }

//                        $("#divPersonaNatural").slideDown();
//                        $("#divPersonaJuridica").hide();
//                        $("#divBotones").slideDown();
//                    }
//            }




//        }
//    });


//}

//function cargaDatosReniec(v_Datos) {
//    $('#txtApePaterno').val(v_Datos[0].APEPATERNO);
//    $('#txtApeMaterno').val(v_Datos[0].APEMATERNO);
//    $('#txtNombres').val(v_Datos[0].NOMBRES);
//    $("#txtNroDocumento").val(personaSeleccionada.NRO_DCTO);
//}

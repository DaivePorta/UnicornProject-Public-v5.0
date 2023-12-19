var arrayActividad = [];
var vg_OptionsPersonaNatural = '';
var vg_OptionsPersonaJuridica = '';
var vg_OptionsTipoTelefono = '';
var vg_OptionsTipoEmail = '';
var ide;
var p = 0;
var us = $("#ctl00_txtus").val();
var vg_SelectTipoContribuyente = '';
var dire = "";//dporta
//var city = '';//dporta
var token_migo = '';//dporta
DatosSunatCargados = new Array();
DatosReniecCargados = new Array();
tipo_doc = 1;
var NPLEMPL = function () {

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option val="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val()).change();
                    fillCboEstablecimiento();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };
    
    var fillCboEstablecimiento = function () {
        var Emp = $("#cboEmpresa").val();
        if (Emp == 'TODOS') { Emp = '' };

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + Emp,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option val="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                    if (Emp == '') {
                        $('#cboSucursal').select2('val', 'TODOS').change();
                    }
                    else {
                        $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                    }
                    

                } else {
                    $('#cboSucursal').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };


    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();

            if ($('#cboEmpresa').val() == 'TODOS') {
                $('#cboSucursal').attr('disabled', 'disabled');
            }
            else {
                $('#cboSucursal').removeAttr('disabled');
            }

        });

        $('#cboSucursal').on('change', function () {
            ListarEmpleados();
        });
    }

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboSucursal').select2();
    }

    return {
        init: function () {
            crearTablaVacia();
            plugins();
            eventoControles();
            fillCboEmpresa();           
            //fillBandejaPersonas();            
        }
    };

}();

function crearTablaVacia() {

    var parms = {
        data: null,
        // responsive: true,
        sDom: 'T<"clear">lfrtip',
        // sPaginationType: "full_numbers",
        //ordering: true,               
        order: [[0, "desc"]],
        oTableTools: {
            sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
            aButtons: [
                { "sExtends": "copy", "sButtonText": "Copiar" },
                { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
            ]
        },
        columns: [
            {
                data: "PIDM",
                visible: false,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "NOMBRE_EMPLEADO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'left')
                }
            },
            {
                data: "DNI",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "CTLG_DESC_CORTA",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'center')
                }
            },
            {
                data: "SCSL_DESC",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')

                }
            },
            {
                data: "CARGO",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('text-align', 'left')
                }
            },
             //{
             //    data: "ESTADO",
             //    createdCell: function (td, cellData, rowData, row, col) {
             //        $(td).attr('align', 'center')
             //    }
             //},

            {
                data: "REG_SALUD_DESC",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'center')
                }
            },
            {
                data: "CTLG_CODE",
                visible: false
            },
            //DPORTA
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

    oTableEmp = iniciaTabla('tblEmpleados', parms);
    //DPORTA
    $('#tblEmpleados tbody').on('click', 'a', function () {
        $(this).parent().parent().addClass('selected');
        var pos = $('#tblEmpleados').DataTable().row($(this).parent().parent()).index();
        var row = $('#tblEmpleados').DataTable().row(pos).data();
        var code = row.PIDM;

        Bloquear("ventana");
        $.ajaxSetup({ async: false });
        $.post("vistas/NP/ajax/NPMEMPL.ASHX",
            { OPCION: 'CAMBIO_ESTADO', P_CODE: code, USUA_ID: $('#ctl00_txtus').val(), CTLG_CODE: $('#ctl00_hddctlg').val() },
            function (res) {
                Desbloquear("ventana");
                if (res !== null) {
                    res = (res === 'I') ? 'INACTIVO' : 'ACTIVO';
                    $('#tblEmpleados').DataTable().cell(pos, 8).data(res).draw();
                    exito();
                } else { noexito(); }
            });
        $.ajaxSetup({ async: true });
    });

    $('#tblEmpleados tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTableEmp.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTableEmp.fnGetPosition(this);
            var row = oTableEmp.fnGetData(pos);
            var tp = "N";
            var td = "1";
            var d = row.DNI;

            window.location.href = '?f=NPMEMPL&tp=' + tp + '&td=' + td + '&d=' + d;
        }
    });

}


function ListarEmpleados() {


    var Emp = $("#cboEmpresa").val();
    var Suc = $('#cboSucursal').val();

    if (Emp == 'TODOS') { Emp = '' };
    if (Suc == 'TODOS') { Suc = '' };

    $.ajax({
        type: "POST",
        url: "vistas/NC/estereotipos/ajax/Empleado.ashx?OPCION=" + "LEMP" + "&CTLG_CODE=" + Emp + "&SCSL_CODE=" + Suc,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {

            oTableEmp.fnClearTable();
            if (!isEmpty(datos) && datos != null) {
               
                oTableEmp.fnAddData(datos);
            }

           

        },
        error: function (msg) {
            alertCustom("Empleados no se listaron correctamente");
        }
    });

}

var NPMEMPL = function () {
    var plugins = function () {
        $('#cboTipoDocumento').select2();

    }

    var cargarParametrosSistema = function () {

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

        //DIRECCION(CIUDAD) POR DEFECTO
        //$.ajax({
        //    type: "post",
        //    url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=CIDE",
        //    contenttype: "application/json;",
        //    datatype: "json",
        //    async: true,
        //    success: function (datos) {
        //        if (datos != null) {
        //            if (datos[0].VALOR == "SI") {
        //                city = datos[0].DESCRIPCION_DETALLADA;

        //            } else {
        //                city = "TRUJILLO";
        //            }
        //        } else {
        //            city = "TRUJILLO";
        //        }
        //    },
        //});
    }

    var fillCboTipoDocumento = function () {



        var selectTipoDocumento = $('#cboTipoDocumento');

        if (localStorage.getItem("dataTipoDoc") != undefined) {
            vg_OptionsPersona = localStorage.getItem("dataTipoDoc");
            selectTipoDocumento.html(vg_OptionsPersona);
            cargarxUrlDNI();
        } else {
            Bloquear($(selectTipoDocumento.siblings("div")[0]).attr("id"));
            var optionsPersona = '';
            $.ajax({
                type: "get",
                url: "vistas/nc/ajax/ncmpers.ashx?OPCION=0",
                success: function (datos) {
                    selectTipoDocumento.empty();

                    if (datos != null) {

                        vg_OptionsPersona = datos;
                        selectTipoDocumento.html(vg_OptionsPersona);
                        localStorage.setItem("dataTipoDoc", vg_OptionsPersona);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            }).done(function () { Desbloquear($(selectTipoDocumento.siblings("div")[0]).attr("id")); cargarxUrlDNI(); });

        }

    }

    var eventoControles = function () {

        $("#txtdocumento").blur(function () {
            if ($('#cboTipoDocumento').val() == "6") {
                if (parseInt($(this).val().substring(0, 1)) == 2 && $(this).val().length == 11) {
                    var aux = $(this).val();
                    var aux2 = $('#cboTipoDocumento').val();

                    $("#cboTipoDocumento").select2('val', aux2);
                    $("#txtdocumento").val(aux);

                    p = 1;

                } else {
                    var aux = $(this).val();
                    var aux2 = $('#cboTipoDocumento').val();

                    $("#cboTipoDocumento").select2('val', aux2);
                    $("#txtdocumento").val(aux);

                    p = 0;
                }
            } else {
                p = 0;
            }

        });

        $('#cboTipoDocumento').on('change', function () {
            $("#txtdocumento").focus();

            var valor = $(this).val();


            switch (valor) {
                case "1": //DNI

                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();

                    break;

                case "6": //RUC
                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();
                    break;

                case "4": //CARNE EXTRANJ.
                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();
                    break;

                case "7": //PASAPORTE
                    $("#txtdocumento").inputmask({ "mask": "#", "repeat": 9, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();
                    break;

                case "11"://PARTIDA

                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();

                    break;

                case "0"://OTROS //DPORTA

                    $("#txtdocumento").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
                    offObjectEvents('txtdocumento');
                    HandlerKeydownDocumento();

                    break;

            }

            tipo_doc = $(this).val();
        });


    }

    var cargaInicial = function () {

        vg_OptionsTipoTelefono = '';
        vg_OptionsTipoEmail = '';
        vg_SelectTipoContribuyente = '';
        $('#hfPPBIDEN_PIDM').val('');
        $('#hfPPBIDEN_ID').val('');
        $('#hfPPRTELE_NUM_SEQ').val('');
        $('#hfPPRCORR_NUM_SEQ').val('');
        $('#hfPPBIMAG_CODE').val('');
        $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
        $('#hfPPBIDEN_PIDM_CONTACTO').val('');
        $('#hfJsonDirecciones').val('');
        $('#hfEstereotipoActivo').val('');
        $('#hfDireccionPersonaJuridica').val('');

        $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });

        HandlerKeydownDocumento();
        $("#txtcaptcha").keypress(function (e) { if (e.keyCode == "13") { CargaReniec(); } });
        //cargarxUrlDNI();

    }

    return {
        init: function () {
            plugins();
            cargarParametrosSistema();
            fillCboTipoDocumento();
            eventoControles();
            cargaInicial();

        }
    };
}();


function BloqueVerifica() {

    $("#cboTipoDocumento").attr("disabled", "disabled"); 
    $("#btnverificar").attr("class", "span8 btn green disabled");
    $("#btnverificar").attr("onclick", "javascript:;");
}

function MuestraFormulario(v_Value, v_Datos) {



    BloqueVerifica();

    HandlerKeydownDocumento();
    $("#txtdocumento").val(ide);

    var doc = $("#cboTipoDocumento").val();

    if (ide.substr(0, 1) == '2' && ide.length == 11 && doc == '6') {//DPORTA

        $("#DatosPersona").load('../../vistas/NC/persona/PersonaJuridica.html', function (html) {

            $.getScript("../../vistas/NC/persona/js/PersonaJuridica.js")
             .done(function (script, textStatus) {
                 NCMPEJU.init();

                 if (v_Value) cargaDatosPersonaJuridica(v_Datos);
                 else limpiarDatosPersonaJuridica();
                 $(".verificar").hide();
                 $("#DatosPersona").show();
             });


        });

    }
    if (((ide.substr(0, 1) != '2') && (doc != '0')) || ((ide.substr(0, 1) == '2') && (ide.length != 11) && (doc != '0'))) {//DPORTA

        $("#DatosPersona").load('../../vistas/NC/persona/PersonaNatural.html', function (html) {

            $.getScript("../../vistas/NC/persona/js/PersonaNatural.js")
             .done(function (script, textStatus) {
                 NCMPENA.init();
                 if (v_Value) cargaDatosPersonaNatural(v_Datos);
                 else {
                     limpiarDatosPersonaNatural();
                     if (v_Datos == "C") {//carga

                         var fechaAct = FechaDelDia();//dporta
                         //cargaDatosSunat(DatosSunatCargados)
                         cargaDatosSunat2(DatosSunatCargados, fechaAct)
                     }
                     if (v_Datos == "R") {//carga

                         cargaDatosReniec(DatosReniecCargados);
                     }
                 }
                 $(".verificar").hide();
                 $("#DatosPersona").show();
             });


        });

    }
    //DPORTA
    if (doc == 0 && ide.length <= 11) {

        $("#DatosPersona").load('../../vistas/NC/persona/PersonaNatural.html', function (html) {

            $.getScript("../../vistas/NC/persona/js/PersonaNatural.js")
                .done(function (script, textStatus) {
                    NCMPENA.init();
                    if (v_Value) { cargaDatosPersonaNatural(v_Datos); p = 0; }
                    else {
                        limpiarDatosPersonaNatural();
                        if (v_Datos == "C") {//carga

                            cargaDatosSunatN(DatosSunatCargados)
                        }
                        if (v_Datos == "R") {//carga

                            cargaDatosReniec(DatosReniecCargados);
                        }
                    }
                    $(".verificar").hide();
                    $("#DatosPersona").show();
                });


        });

    }
}


function cargarEstereotipos() {

    var USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
    var CORRECTO = true;
    var ADICIONALES_IND = true;

    var EMPLEADO_IND = true;

    var CTLG_CODE = $('#ctl00_hddctlg').val();


    if (CORRECTO) {

        $("#estereotipos").removeAttr("style");

        if (ADICIONALES_IND) {
            $('#tabAdicionales').tab('show');
            $('#tabAdicionales').tab().show();

            $.ajaxSetup({ async: false });


            $("#adicionales").load('../../vistas/NC/estereotipos/Adicionales.html', function (html) {
                $.getScript("../../vistas/NC/estereotipos/js/Adicionales.js")
                    .done(function (script, textStatus) {

                    });
            });
            $.ajaxSetup({ async: true });

            ADICIONALES.init();
            $("#txtdir").val(dire == '-' || dire == '' ? "TRUJILLO" : eliminarDiacriticos(dire));//dporta

            $("#tabAdicionales").on("click", function () {
                if ($.trim($('#hfEstereotipoActivo').val()) != "ADICIONALES") {
                    $('#hfEstereotipoActivo').val("ADICIONALES");
                }
            });

            $("#masdirecciones").on("click", function () {
                crearclones("direccion", "../../vistas/NC/estereotipos/Adicionales.html", "Direccion Secundaria", "DIRECCION");
                addObjectJsonDirecciones("", ObtenerUltimoIdDiv("direccion") - 1, 0);
            });

            jsEventsControlsDireccion("direccion");

            $("#masbancos").on("click", function () {
                crearclones("datosbanco", "../../vistas/NC/estereotipos/Adicionales.html", "Datos Bancarios Secundarios", "DATOSBANCO");
                addObjectJsonDatosBanco(ObtenerUltimoIdDiv("datosbanco") - 1, "0");
            });

            $("#mastelefonos").on("click", function () {
                crearclones("telefonos", "../../vistas/NC/estereotipos/Adicionales.html", "", "TELEFONOS");
                addObjectJsonTelefonos(ObtenerUltimoIdDiv("telefonos") - 1, 0);
            });

            $("#masemails").on("click", function () {
                crearclones("emails", "../../vistas/NC/estereotipos/Adicionales.html", "", "EMAILS");
                addObjectJsonEmails(ObtenerUltimoIdDiv("emails") - 1, 0);
            });

        }



        $('#tabEmpleado').tab().hide();




        if (EMPLEADO_IND) {

            $('#tabEmpleado').tab().show();
            $.ajaxSetup({ async: false });
            $("#empleado").load('../../vistas/NC/estereotipos/Empleado.html', function (html) {
            });
            $.ajaxSetup({ async: true });

            $("#tabEmpleado").on("click", function () {
                if ($.trim($('#hfEstereotipoActivo').val()) != "EMPLEADO") {
                    EMPLEADO.init();
                    $('#hfEstereotipoActivo').val("EMPLEADO");
                }
            });
        }


    }

}


function VerificarPersona() {
    var NRO = '';
    var DOID_CODE = '';
    var Errors = '';
    var flag = false;

    var TipoDocumento = $.trim($('#cboTipoDocumento').val());
    var NroDocumento = $.trim($('#txtdocumento').val());

    if (TipoDocumento == "1") {
        if (NroDocumento.length < 8) {
            $('#txtdocumento').val('');
        }
    }
    else if (TipoDocumento == "6") {
        if (NroDocumento.length < 11) {
            $('#txtdocumento').val('');
        }
    }

    Errors = vErrors(["txtdocumento", "cboTipoDocumento"]);

    $('#txtdocumento').val(NroDocumento);

    if (Errors) {

        DOID_CODE = TipoDocumento;
        NRO = NroDocumento;
        ide = NRO;

        if (NRO.length == 11 && TipoDocumento == '6') { //DPORTA

            if (rucValido(NRO)) {
                if ((ide.substr(0, 1) == '1') && (ide.substr(0, 1) != '2') && (ide.length == 11)) {


                    flag = true;
                }

                if ((ide.substr(0, 1) == '1') && (ide.length == 11) && TipoDocumento == '6') {
                    DOID_CODE = '1';
                    NRO = NRO.substring(2, 10);
                }


                Bloquear("verificar");
                $.post("vistas/NC/ajax/NCMPERS.ASHX",
                    {
                        OPCION: 1.5,
                        DOID_CODE: DOID_CODE,
                        NRO: NRO
                    })
                    .done(function (res) {
                        Desbloquear("verificar");
                        if (res == 'NOEXISTE') {
                            if (p == 0) {
                                if (flag) $('#DatosSunat').attr('style', 'display:inline;');
                                else {
                                    $('#DatosSunat').attr('style', 'display:none;');
                                    $('#DatosReniec').attr('style', 'display:inline;');
                                }

                            }
                            if (p == 1) {
                                // MuestraSunat();
                                $('#DatosSunat').attr('style', 'display:inline;');
                                $('#DatosReniec').attr('style', 'display:none;');
                            }
                            var docu = $('#cboTipoDocumento option[value=' + DOID_CODE + ']').attr('nemonico');
                            $('#spanNroDoc').html((docu.substring(docu.length - 1) == 'A' ? "La" : "El") + "<B> " + docu + ' ' + $("#txtdocumento").val() + "</B>");
                            $('#PerNoExiste').modal('show');
                        } else {
                            $('#hfPPBIDEN_PIDM').val(res.split(",")[0]);
                            RecuperarDatos(res.split(",")[0], DOID_CODE, NRO);
                            if (ide.substr(0, 1) == '2' && ide.length == 11) {

                            }
                            if ((ide.substr(0, 1) != '2') || ((ide.substr(0, 1) == '2') && (ide.length != 11))) {

                            }
                            if (DOID_CODE !== res.split(",")[2]) {
                                infoCustom2("Persona ya se encuentra registrada con " + res.split(",")[1]);
                            }
                        }
                    })
                    .fail(function () {
                        Desbloquear("verificar");
                        alertCustom("Error al verificar Persona.");
                    });
            } else {
                setTimeout(function () {
                    $("#txtdocumento").val("");
                }, 400);
                infoCustom2("El RUC ingresado NO existe en SUNAT");
            }
        } else {
            if ((ide.substr(0, 1) == '1') && (ide.substr(0, 1) != '2') && (ide.length == 11)) {


                flag = true;
            }

            if ((ide.substr(0, 1) == '1') && (ide.length == 11) && TipoDocumento == '6') {
                DOID_CODE = '1';
                NRO = NRO.substring(2, 10);
            }


            Bloquear("verificar");
            $.post("vistas/NC/ajax/NCMPERS.ASHX",
                {
                    OPCION: 1.5,
                    DOID_CODE: DOID_CODE,
                    NRO: NRO
                })
                .done(function (res) {
                    Desbloquear("verificar");
                    if (res == 'NOEXISTE') {
                        if (p == 0) {
                            if (flag) $('#DatosSunat').attr('style', 'display:inline;');
                            else {
                                $('#DatosSunat').attr('style', 'display:none;');
                                $('#DatosReniec').attr('style', 'display:inline;');
                            }

                        }
                        if (p == 1) {
                            //  MuestraSunat();
                            $('#DatosSunat').attr('style', 'display:inline;');
                            $('#DatosReniec').attr('style', 'display:none;');
                        }
                        var docu = $('#cboTipoDocumento option[value=' + DOID_CODE + ']').attr('nemonico');
                        $('#spanNroDoc').html((docu.substring(docu.length - 1) == 'A' ? "La" : "El") + "<B> " + docu + ' ' + $("#txtdocumento").val() + "</B>");
                        $('#PerNoExiste').modal('show');
                    } else {
                        $('#hfPPBIDEN_PIDM').val(res.split(",")[0]);
                        RecuperarDatos(res.split(",")[0], DOID_CODE, NRO);
                        if (ide.substr(0, 1) == '2' && ide.length == 11) {

                        }
                        if ((ide.substr(0, 1) != '2') || ((ide.substr(0, 1) == '2') && (ide.length != 11))) {

                        }
                        if (DOID_CODE !== res.split(",")[2]) {
                            infoCustom2("Persona ya se encuentra registrada con " + res.split(",")[1]);
                        }
                    }
                })
                .fail(function () {
                    Desbloquear("verificar");
                    alertCustom("Error al verificar Persona.");
                });
        }  

    }
}

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

function RecuperarDatos(v_PIDM, v_TipoDocumento, v_NRO) {
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=4&PIDM=" + v_PIDM + "&DOID_CODE=" + v_TipoDocumento + "&NRO=" + v_NRO,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                MuestraFormulario(true, datos);
            }
        },
        error: function (msg) {
            alertCustom("Error al obtener datos de la persona.");
        }
    });
}




function cargarxUrlDNI() {

    var v_TipoPersona = ObtenerQueryString("tp");
    var v_TipoDocumento = ObtenerQueryString("td");
    var v_Documento = ObtenerQueryString("d");

    if (v_TipoPersona != undefined && v_TipoDocumento != undefined && v_Documento != undefined) {


        $('#cboTipoDocumento').select2('val', v_TipoDocumento);
        $('#cboTipoDocumento').change();
        $("#txtdocumento").val(v_Documento);

        VerificarPersona();
    }

    if (ObtenerQueryString("prop") != undefined) {
        $("#txtdocumento").val(ObtenerQueryString("prop"));
        VerificarPersona();
    }
    if (ObtenerQueryString("chof") != undefined) {
        $("#txtdocumento").val(ObtenerQueryString("chof"));
        VerificarPersona();
    }
}

function HandlerKeydownDocumento() {
    $("#txtdocumento").keydown(function (e) {
        if (e.keyCode == 13) {
            VerificarPersona();
        }
    });
}

function MuestraReniec() {
    //DPORTA_RF
    var NRO = ide;

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

            MuestraFormulario(false, 'R');
            DatosReniecCargados = data;

        } else {
            MuestraReniec2();//DPORTA 27/09/2021
            //alertCustom("No se Encontraron Resultados. Verique si ingresó correctamente el DNI")
            //$("#captchaModal").modal('hide');
            //$("#PerNoExiste").modal("show");
        }
    };
    
    //var NRO = ide;
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

                MuestraFormulario(false, 'R');
                DatosReniecCargados = data;

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

//                    MuestraFormulario(false, 'R');
//                    DatosReniecCargados = JSON.parse(data);

//            }




//        }
//    });


//}

//function MuestraSunat() {

//    var NRO = ide;

//    $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: false,
//        success: function (datos) {

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

//                            DatosSunatCargados = datos;
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

//function FechaDelDia() {
//    //$("#lblModalFechaIni").datepicker({
//    //    dateFormat: 'dd/mm/yy',
//    //    firstDay: 1
//    //}).datepicker("setDate", new Date());

//    var fecha = new Date();
//    var dia = fecha.getDate();
//    var ano = fecha.getFullYear();
//    var mes = fecha.getMonth() + 1;

//    return fNueva = dia + '/' + mes + '/' + ano;

//    //$("#lblModalFechaIni").val(fNueva);
//};

////Nuevo link, en caso el que se está usando ahora deje de funcionar (Aún en desarrollo)
//function MuestraSunat() {

//    var NRO = ide;
//    var formData = new FormData();

//    formData.append("token", "8d708bab-9775-49cb-a56b-16990135b209-c4efea63-827a-4beb-ac2d-3d8e5edced3b");
//    formData.append("ruc", NRO);

//    var request = new XMLHttpRequest();

//    request.open("POST", "https://api.migoperu.pe/api/v1/ruc");
//    request.setRequestHeader("Accept", "application/json");

//    request.send(formData);
//    request.onload = function () {
//        var data = JSON.parse(this.response);
//        $("#PerNoExiste").modal('hide');
//        if (data.success == true) {
//            if (data.estado_del_contribuyente == "ACTIVO") {
//                if (data.condicion_de_domicilio == "HABIDO") {
//                    $("#existe").css("display", "block");
//                    $("#no_existe").css("display", "none");
//                    $('#lblModalNumeroRuc').html(data.ruc);
//                    $('#lblrazonsocial').html(data.nombre_o_razon_social);
//                    $('#lblModalEstado').html(data.estado_del_contribuyente);
//                    $('#lblModalSituacion').html(data.condicion_de_domicilio);
//                    $('#lblModalDireccion').html(data.direccion);
//                    //$('#lblModalTelefono').html("");
//                    //$('#lblModalActividad').html("");
//                    $('#lblModalNombreComercial').html(data.nombre_o_razon_social);
//                    //$('#lblModalFechaIni').html(fecha)
//                    $('#txtCondSunat').html(data.condicion_de_domicilio);
//                    $('#txtEstaSunat').html(data.estado_del_contribuyente);
//                    DatosSunatCargados = data;

//                    $('#SunatCaptcha').modal('hide');
//                    $('#ModalSunat').modal('show');
//                } else {
//                    infoCustom2("El RUC: " + NRO + " se encuentra como " + data.condicion_de_domicilio + " por SUNAT.");
//                }
//            } else {
//                infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
//            }
//        } else {
//            MuestraSunat2();
//        }
//    };
//}

//function MuestraSunat2() {

//    var NRO = ide;
//    var formData = new FormData();

//    formData.append("token", "4461fceb-ebdb-4155-a62d-599b25c47824-2d9b12d2-fa44-4fcc-b3c6-2b90a502fa4a");
//    formData.append("ruc", NRO);

//    var request = new XMLHttpRequest();

//    request.open("POST", "https://api.migoperu.pe/api/v1/ruc");
//    request.setRequestHeader("Accept", "application/json");

//    request.send(formData);
//    request.onload = function () {
//        var data = JSON.parse(this.response);
//        $("#PerNoExiste").modal('hide');
//        if (data.success == true) {
//            if (data.estado_del_contribuyente == "ACTIVO") {
//                if (data.condicion_de_domicilio == "HABIDO") {
//                    $("#existe").css("display", "block");
//                    $("#no_existe").css("display", "none");
//                    $('#lblModalNumeroRuc').html(data.ruc);
//                    $('#lblrazonsocial').html(data.nombre_o_razon_social);
//                    $('#lblModalEstado').html(data.estado_del_contribuyente);
//                    $('#lblModalSituacion').html(data.condicion_de_domicilio);
//                    $('#lblModalDireccion').html(data.direccion);
//                    //$('#lblModalTelefono').html("");
//                    //$('#lblModalActividad').html("");
//                    $('#lblModalNombreComercial').html(data.nombre_o_razon_social);
//                    //$('#lblModalFechaIni').html("")
//                    $('#txtCondSunat').html(data.condicion_de_domicilio);
//                    $('#txtEstaSunat').html(data.estado_del_contribuyente);
//                    DatosSunatCargados = data;

//                    $('#SunatCaptcha').modal('hide');
//                    $('#ModalSunat').modal('show');
//                } else {
//                    infoCustom2("El RUC: " + NRO + " se encuentra como " + data.condicion_de_domicilio + " por SUNAT.");
//                }
//            } else {
//                infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
//            }
//        } else {
//            MuestraSunat3();
//        }
//    };
//}

//function MuestraSunat3() {

//    var NRO = ide;
//    var formData = new FormData();

//    formData.append("token", "f6ecf91a-dbf4-4ecc-999b-da5dca9d2923-f2ea81e7-be3b-4e6b-a6d0-c7f24e5ce8bd");
//    formData.append("ruc", NRO);

//    var request = new XMLHttpRequest();

//    request.open("POST", "https://api.migoperu.pe/api/v1/ruc");
//    request.setRequestHeader("Accept", "application/json");

//    request.send(formData);
//    request.onload = function () {
//        var data = JSON.parse(this.response);
//        $("#PerNoExiste").modal('hide');
//        if (data.success == true) {
//            if (data.estado_del_contribuyente == "ACTIVO") {
//                if (data.condicion_de_domicilio == "HABIDO") {
//                    $("#existe").css("display", "block");
//                    $("#no_existe").css("display", "none");
//                    $('#lblModalNumeroRuc').html(data.ruc);
//                    $('#lblrazonsocial').html(data.nombre_o_razon_social);
//                    $('#lblModalEstado').html(data.estado_del_contribuyente);
//                    $('#lblModalSituacion').html(data.condicion_de_domicilio);
//                    $('#lblModalDireccion').html(data.direccion);
//                    //$('#lblModalTelefono').html("");
//                    //$('#lblModalActividad').html("");
//                    $('#lblModalNombreComercial').html(data.nombre_o_razon_social);
//                    //$('#lblModalFechaIni').html("")
//                    $('#txtCondSunat').html(data.condicion_de_domicilio);
//                    $('#txtEstaSunat').html(data.estado_del_contribuyente);
//                    DatosSunatCargados = data;

//                    $('#SunatCaptcha').modal('hide');
//                    $('#ModalSunat').modal('show');
//                } else {
//                    infoCustom2("El RUC: " + NRO + " se encuentra como " + data.condicion_de_domicilio + " por SUNAT.");
//                }

//            } else {
//                infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
//            }
//        } else {
//            alertCustom("Servicio SUNAT no disponible en estos momentos.");
//        }
//    };
//}

function CancelarSunat() {
    $('#ModalSunat').modal('hide');
}
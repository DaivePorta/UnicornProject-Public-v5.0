var arrayActividad = [];
var vg_OptionsPersonaNatural = '';
var vg_OptionsPersonaJuridica = '';
var vg_OptionsTipoTelefono = '';
var vg_OptionsTipoEmail = '';
var ide;
var p = 0;
var us = $("#ctl00_txtus").val();
var vg_SelectTipoContribuyente = '';

var tipo_contacto = '';
var tipo_contactoGeneral = '';
var token_migo = '';//dporta
var NCMPEJU = function () {

    var plugins = function () {


        $('#cboEmpresa').select2();
        
        $('#cboTipoContribuyenteJuridica').select2();

        $('#txtrazonsocial').attr('disabled', false);
        $("#txtrucjuridico").val(ide);


        // offObjectEvents('cboTipoContribuyenteJuridica');

        $("#txtrazonsocial").focus(function () {
            $("#txtrazonsocial").inputmask({ "mask": "Z", "repeat": 150, "greedy": false });
        });

        $("#txtrazonsocial").focus();

        $("#txtnombrecomercial").focus(function () {
            $("#txtnombrecomercial").inputmask({ "mask": "Z", "repeat": 150, "greedy": false });
        });

        $("#txtactividad").inputmask({ "mask": "!", "repeat": 250, "greedy": false });
        $("#txtdnirepresentante").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        $("#txtdnicontacto").inputmask({ "mask": "9", "repeat": 8, "greedy": false });

        $("#txtdireccionweb").focus(function () {
            $('#txtdireccionweb').inputmask({ "mask": "W", "repeat": 150, "greedy": false });
        });

        //$('#txtinicioactividad').datepicker();
        //$('#txtinicioactividad').datepicker('setEndDate', '-1d');
        $("#txtinicioactividad").datepicker("setDate", "now")

        $("#txttelefonoj").focus(function () {
            $('#txttelefonoj').inputmask({ "mask": "T", "repeat": 100, "greedy": false });
        });

        $("#txtemailj").focus(function () {
            $('#txtemailj').inputmask({ "mask": "E", "repeat": 50, "greedy": false });
        });

        $('#txtfecharetencion').datepicker();
        $('#txtfecharetencion').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txtfechapercepcion').datepicker();
        $('#txtfechapercepcion').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txtFechaBuenContribuyente').datepicker();
        
     //   $('#txtFechaBuenContribuyente').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

        //   offObjectEvents('txtrazonsocial');

        // offObjectEvents('txtactividad');

        //offObjectEvents('txtemailj');

        //offObjectEvents('txtfecharetencion');

        //offObjectEvents('txtfechapercepcion');

        //offObjectEvents('cboEmpresa');

        $('#imgRUC').removeAttr('src');
        $('#imgRUC').attr('src', '../../recursos/img/150x200.gif');
        $('#fileRUC').parent().parent().children('span').remove();
        $('#fileRUC').val('');

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
    }

    function ListarContactos() {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=17" + '&P_TIPO=' + tipo_contacto + '&P_PERSONA=' + $('#hfPPBIDEN_PIDM').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data !== "") {
                    var json = $.parseJSON(data)
                    llenaTabla(json)
                } else {
                    $('#dtContactos').DataTable().destroy();
                    oTableTReg = iniciaTabla('dtContactos', { sDom: "t", data: [] });
                    $('#dtContactos').DataTable().draw();
                    infoCustom2("No se encontraron Contactos");
                }
            },
            error: function (msg) {
                alertCustom(msg.d);
            }
        });
    }

    function llenaTabla(json) {
        var parms = {
            data: json,
            "sDom": "t",
            columns: [
                {
                    data: "NOMBRE",
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
                      data: "PIDM",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('style', 'display:none')
                      }
                  },

                      {
                          data: "ESTADO",
                          //defaultContent: '<a  class="btn red eliminar"><i class="icon-trash"></i></a>',
                          createdCell: function (td, cellData, rowData, row, col) {
                              var estado = $(td).html();
                              if (estado == '1') {
                                  $(td).html("<input type='radio' id=rb_" + rowData.PIDM + "   class='radio' name='rdContac' checked/>");
                              } else {
                                  $(td).html("<input type='radio' id=rb_" + rowData.PIDM + "   class='radio' name='rdContac'/>");
                              }
                              $(td).css('text-align', 'center');
                          }
                      },

                       {
                           data: "ACTIVO",
                           //defaultContent: '<a  class="btn red eliminar"><i class="icon-trash"></i></a>',
                           createdCell: function (td, cellData, rowData, row, col) {
                               var estado = $(td).html();
                               if (estado == '1') {
                                   $(td).html("<input type='checkbox' id=ch_" + rowData.PIDM + "   class='chek'  checked/>");
                               } else {
                                   $(td).html("<input type='checkbox' id=ch_" + rowData.PIDM + "   class='chek' />");
                               }
                               $(td).css('text-align', 'center');
                           }
                       },

                       {
                           data: "TIPOC",
                           createdCell: function (td, cellData, rowData, row, col) {
                               $(td).attr('style', 'display:none')
                           }
                       }

            ]

        }


        $('#dtContactos').dataTable().fnDestroy();


        oTableTReg = iniciaTabla('dtContactos', parms);

        $('#dtContactos tbody').unbind('click');
        $('#dtContactos tbody').on('click', '.radio', function () {
            var tabla = $('#dtContactos').DataTable();
            var data = tabla.row($(this).parent().parent()).data();

            actContc(data.PIDM, data.TIPOC);

            if (data.TIPO == 'CONTACTO') {

                $('#hfPPBIDEN_PIDM_CONTACTO').val(data.PIDM);
                $("#rescontacto").removeClass();
                $("#rescontacto").attr("class", "alert alert-success");
                $("#rescontacto").html(data.NOMBRE);//Mostramos el resultado en el di

            }
            else {

                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(data.PIDM);
                $("#resrepresentante").removeClass();
                $("#resrepresentante").attr("class", "alert alert-success");
                $("#resrepresentante").html(data.NOMBRE);

            }
        });
        //$("#dtContactos_info").parent().parent().attr("style", "display:none");

        $('#dtContactos tbody').on('click', '.chek', function () {
            var tabla = $('#dtContactos').DataTable();
            var data = tabla.row($(this).parent().parent()).data();
            var chk = $(this).is(':checked');
            //actContacActivo(data.PIDM);
            if (chk) {
                actContacActivo(data.PIDM, 1);
            }
            else {
                actContacActivo(data.PIDM, 2);
            }
        });

    }

    function actContacActivo(contacto, activo) {
        var data = new FormData;

        data.append('PIDM', contacto);
        data.append('P_PERSONA', $('#hfPPBIDEN_PIDM').val());
        data.append('P_ACTIVO', activo);

        $.ajax({

            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=20",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (data) {


                if (data == "OK") {
                    exito();
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

    function actContc(contacto, TIPO) {
        var data = new FormData;


        data.append('PIDM', contacto);
        data.append('P_PERSONA', $('#hfPPBIDEN_PIDM').val());
        data.append('P_TIPO', TIPO);
        data.append('P_TIPOGENERAL', tipo_contactoGeneral);


        $.ajax({

            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=18",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (data) {


                if (data == "OK") {
                    exito();
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

    var eventoControles = function () {

        $("#listarRepresentantes").on("click", function () {
            tipo_contacto = "R"
            tipo_contactoGeneral = "R"
            $('#titulo').html('<H3>Representantes Legales</H3>')
            ListarContactos();
            $('#ModalListaContac').modal('show');

        });

        $("#listarContactos").on("click", function () {
            tipo_contacto = "C"
            tipo_contactoGeneral = "C"
            $('#titulo').html('<H3>Contactos</H3>')
            ListarContactos();
            $('#ModalListaContac').modal('show');

        });
      
        $('#txtdnirepresentante').on("keyup change paste", function (event) {
            if (event.type == "paste") { $(this).change();}
            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8) || (event.keyCode == 46) || event.type=="change") {
               
                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
                $("#resrepresentante").removeClass();
                $("#resrepresentante").attr("class", "alert alert-info");
                $("#resrepresentante").html('<strong>No se ha seleccionado ninguna Persona</strong>.');
              
                if (this.value.length == 8) {
                    $('#btnVerificarRepresentanteLegal').removeClass();
                    $('#btnVerificarRepresentanteLegal').addClass('span8 btn blue');
                    $('#btnVerificarRepresentanteLegal').removeAttr('href');
                    $('#btnVerificarRepresentanteLegal').attr('href', 'javascript:VerificarRepresentante();');
                }
                else {
                    //alert('8');
                    $('#btnVerificarRepresentanteLegal').removeClass();
                    $('#btnVerificarRepresentanteLegal').addClass('span8 btn blue disabled');
                    $('#btnVerificarRepresentanteLegal').removeAttr('href');
                    $('#btnVerificarRepresentanteLegal').attr('href', 'javascript:;');
                }
            }
        });
        
        $('#txtdnicontacto').on("keyup change paste", function (event) {
            if (event.type == "paste") { $(this).change(); }
            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8) || (event.keyCode == 46) || event.type=="change") {
                $('#hfPPBIDEN_PIDM_CONTACTO').val('');
                $("#rescontacto").removeClass();
                $("#rescontacto").attr("class", "alert alert-info");
                $("#rescontacto").html('<strong>No se ha seleccionado ninguna Persona</strong>.');
                if (this.value.length == 8) {
                    $('#btnVerificarContacto').removeClass();
                    $('#btnVerificarContacto').addClass('span8 btn blue');
                    $('#btnVerificarContacto').removeAttr('href');
                    $('#btnVerificarContacto').attr('href', 'javascript:VerificarContacto();')
                }
                else {
                    $('#btnVerificarContacto').removeClass();
                    $('#btnVerificarContacto').addClass('span8 btn blue disabled');
                    $('#btnVerificarContacto').removeAttr('href');
                    $('#btnVerificarContacto').attr('href', 'javascript:;')
                }
            }
        });

        //$("#agregarContac").click(function () {
                
        //    alert('hola');

        //    ////agregarContacto();

        //});

        $("#rbrelasi").click(function () { //radio button mascjur
            filCboEmpresa('');
            $("#cboEmpresa").removeAttr('disabled');
            //$('#cboEmpresa ~ span').children().remove();
            //$('#cboEmpresa').parent().parent().removeClass();
            //$('#cboEmpresa').parent().parent().addClass('control-group');
            //  offObjectEvents('cboEmpresa');
        });

        $("#rbrelano").click(function () { //radio button femjur

            $("#cboEmpresa").attr('disabled', true);
            $("#cboEmpresa").select2('val', []);
            //$('#cboEmpresa ~ span').children().remove();
            //$('#cboEmpresa').parent().parent().removeClass();
            //$('#cboEmpresa').parent().parent().addClass('control-group');
            //  offObjectEvents('cboEmpresa');
        });

        $("#chkretencion").click(function () {
            offObjectEvents('txtfecharetencion');
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
            //$('#txtfecharetencion ~ span').children().remove();
            //$('#txtfecharetencion').parent().parent().removeClass();
            //$('#txtfecharetencion').parent().parent().addClass('control-group');
        });

        $("#chkpercepcion").click(function () {
            offObjectEvents('txtfechapercepcion');
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
            //$('#txtfechapercepcion ~ span').children().remove();
            //$('#txtfechapercepcion').parent().parent().removeClass();
            //$('#txtfechapercepcion').parent().parent().addClass('control-group');
        });

        $("#chkBuenContribuyente").click(function () {
            offObjectEvents('txtFechaBuenContribuyente');
            if ($("#chkBuenContribuyente").is(':checked')) {
                $("#txtFechaBuenContribuyente").removeAttr("disabled");
                $("#txtFechaBuenContribuyente").attr('placeholder', 'dd/mm/yyyy');
                $("#txtFechaBuenContribuyente").focus();
                $("#chkBuenContribuyente").attr("value", "S");

            } else {
                $("#txtFechaBuenContribuyente").attr("disabled", "disabled");
                $("#txtFechaBuenContribuyente").val('');
                $("#txtFechaBuenContribuyente").removeAttr('placeholder');
                $("#chkBuenContribuyente").attr("value", "N");
            }           
        });

        $("#btnHabido").on("click", function () {
            if (vErrors(["txtrazonsocial", "txtrucjuridico"])) {
                if ($("#txtrucjuridico").val().trim().length === 11) {
                    $("#modal-habido").modal("show");
                    MuestraSunat();
                } else {
                    infoCustom2("El ruc no es valido.....!");
                }
            }
        });

        $("#btnActualizarDS").on("click", function () {
            var pidm = $('#hfPPBIDEN_PIDM').val();
            var condSunat = $("#spanVerificando").text();
            var estadoSunat = $("#lblEstadoSunat").text();
            fnActualizarDatosContribuyente(pidm, condSunat, estadoSunat);
        });

    }
    
    var cargaInicial = function () {

        vg_OptionsTipoTelefono = '';
        vg_OptionsTipoEmail = '';
        vg_SelectTipoContribuyente = '';
        //$('#hfPPBIDEN_PIDM').val('');
        $('#hfPPBIDEN_ID').val('');
        $('#hfPPRTELE_NUM_SEQ').val('');
        $('#hfPPRCORR_NUM_SEQ').val('');
        $('#hfPPBIMAG_CODE').val('');
        $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
        $('#hfPPBIDEN_PIDM_CONTACTO').val('');
        $('#hfJsonDirecciones').val('');
        $('#hfEstereotipoActivo').val('');
        $('#hfDireccionPersonaJuridica').val('');


        inputFile("fileRUC", "imgRUC", "../../recursos/img/150x200.gif", 150, 200);

        $("#fileRUC").show();

       
        //   HandlerKeydownDocumento();
        //  cargarxUrlDNI();

    }

    var cargarCombos = function () {

        fillCboTipoContribuyente('#cboTipoContribuyenteJuridica', 'J');
        fillTxtActividad('#txtactividad', '');

    }
    
    return {
        init: function () {
            plugins();
            cargarParametrosSistema();
            cargarCombos();
            eventoControles();
            cargaInicial();
           

        }
    };
}();

function HandlerTipoDeContribuyente() {
    $('#cboTipoDeContribuyenteNatural').on('change', function () {

        if (vg_SelectTipoContribuyente == '' || vg_SelectTipoContribuyente != this.value) {

            var v_RucNatural = '';
            v_RucNatural = $.trim($('#txtrucnatural').val());

            offObjectEvents('txtrucnatural');
            $('#txtrucnatural').val(v_RucNatural);
           
            $('#txtrucnatural').attr('disabled', false);
            $('#txtrucnatural').attr('placeholder', 'RUC');

            $('#txtInicioActividadNatural').attr('disabled', false);
            $('#txtInicioActividadNatural').attr('placeholder', 'dd/mm/yyyy');

            if (this.value == $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoTipoContribuyenteSinNegocio').val()) {
                $('#txtNombreComercialNatural').attr('disabled', true);
                $('#txtNombreComercialNatural').removeAttr('placeholder');
                $('#txtNombreComercialNatural').val('');
            }
            else {
                $('#txtNombreComercialNatural').attr('disabled', false);
                $('#txtNombreComercialNatural').attr('placeholder', 'Nombre Comercial');
                $('#txtNombreComercialNatural').val('');
            }

            $('#chkAgenteRetencion').attr('disabled', false);

            $('#txtActvidadEconomicaNatural').attr('disabled', false);
            $('#txtActvidadEconomicaNatural').attr('placeholder', 'Actividad Economica');

            vg_SelectTipoContribuyente = this.value;

            if ($(this).val() == '') {
                $('#txtrucnatural').val("").attr('disabled', true);
                $('#txtNombreComercialNatural').val("").attr('disabled', true);
                $('#chkAgenteRetencion').removeAttr('checked');
                $('#chkAgenteRetencion').parent().removeClass();
                $('#chkAgenteRetencion').attr('disabled', true);
                $('#txtInicioActividadNatural').val("").attr('disabled', true);
                $('#txtActvidadEconomicaNatural').val("").attr('disabled', true);

            }

        }

    });
}

function GrabarPersona() {

    GrabarJuridica(); //p=1;

}

function cargaDatosSunat(v_Datos) {
    //primer método
    //DPORTA_RF
    //let fecha;
    //let mes;
    //let anio;
    //let dia;
    //let new_fecha;

    //fecha = v_Datos[0].FECHA_INICIO;

    //anio = fecha.split("-")[0];
    //mes = fecha.split("-")[1];
    //dia = fecha.split("-")[2];

    //new_fecha = dia + "/" + mes + "/" + anio;

    //$('#txtrazonsocial').attr('disabled', false);
    //$('#txtrazonsocial').val(v_Datos[0].RAZON);
    //$('#txtnombrecomercial').val(v_Datos[0].NOMBRE_COMERCIAL == '-' ? v_Datos[0].RAZON : v_Datos[0].NOMBRE_COMERCIAL);
    //var tipocont = "";
    //$("#cboTipoContribuyenteJuridica").children().each(function (f, e) { if ($(e).html() == v_Datos[0].TIPO_CONTRIBUYENTE) { tipocont = $(e).val(); return 0; } })
    //$('#cboTipoContribuyenteJuridica').select2('val', tipocont);

    //$("#txtactividad").val(v_Datos[0].ACTIVIDAD.substring(0, 6)).keyup();
    //$("#txtactividad").siblings("ul").children("li").click()
    //$('#txttelefonoj').val(v_Datos[0].TELEFONO);
    //$('#txtinicioactividad').datepicker('setDate', "22/11/2019");
    //$('#txtCondSunat').val(v_Datos[0].CONDICION);
    //$('#txtEstaSunat').val(v_Datos[0].ESTADO);
    //$('#txtCondSunat').attr('disabled', true);
    //$('#txtEstaSunat').attr('disabled', true);
    //fin primer método

    

    $('#txtrazonsocial').attr('disabled', false);
    $('#txtrazonsocial').val(v_Datos.nombre_o_razon_social);
    $('#txtnombrecomercial').val(v_Datos.nombre_o_razon_social);
    //var tipocont = "";
    //$("#cboTipoContribuyenteJuridica").children().each(function (f, e) { if ($(e).html() == v_Datos[0].condicion_de_domicilio) { tipocont = $(e).val(); return 0; } })
    //$('#cboTipoContribuyenteJuridica').select2('val', tipocont);

    $("#txtactividad").val("");
    //$("#txtactividad").siblings("ul").children("li").click()
    //$('#txttelefonoj').val(v_Datos[0].TELEFONO);
    $('#txtinicioactividad').datepicker('setDate', "");
    $('#txtCondSunat').val(v_Datos.condicion_de_domicilio);
    $('#txtEstaSunat').val(v_Datos.estado_del_contribuyente);
    $('#txtCondSunat').attr('disabled', true);
    $('#txtEstaSunat').attr('disabled', true);
}

function cargaDatosSunat2(v_Datos, fecha) {//dporta


    $('#txtrazonsocial').attr('disabled', false);
    $('#txtrazonsocial').val(v_Datos.nombre_o_razon_social);
    $('#txtnombrecomercial').val(v_Datos.nombre_o_razon_social);
    //var tipocont = "";
    //$("#cboTipoContribuyenteJuridica").children().each(function (f, e) { if ($(e).html() == v_Datos[0].condicion_de_domicilio) { tipocont = $(e).val(); return 0; } })
    //$('#cboTipoContribuyenteJuridica').select2('val', tipocont);

    $("#txtactividad").val("");
    //$("#txtactividad").siblings("ul").children("li").click()
    //$('#txttelefonoj').val(v_Datos[0].TELEFONO);
    $('#txtinicioactividad').val(fecha);
    $('#txtCondSunat').val(v_Datos.condicion_de_domicilio);
    $('#txtEstaSunat').val(v_Datos.estado_del_contribuyente);
    $('#txtCondSunat').attr('disabled', true);
    $('#txtEstaSunat').attr('disabled', true);
}

function cargaDatosPersonaJuridica(v_Datos) {

    var array = [];
    var codesEmpresa;
    $("#btnHabido").show();
    $('#hfPPBIDEN_ID').val(v_Datos[0].ID);
    $('#hidPersona').text("ID:" + v_Datos[0].ID);
    $('#txtrazonsocial').val(v_Datos[0].RAZONSOCIAL);

    if (v_Datos[0].ENTIDAD_IND == 'J') {
        $('#txtrazonsocial').attr('disabled', false);
    }
    else {
        $('#txtrazonsocial').attr('disabled', true);
    }

    $('#txtnombrecomercial').val(v_Datos[0].RAZO_COME);

    fillCboTipoContribuyente('#cboTipoContribuyenteJuridica', 'J', v_Datos[0].TCON_CODE);

    //$('#cboTipoContribuyenteJuridica').select2('val', v_Datos[0].TCON_CODE);



    // fillTxtActividad('#txtactividad', v_Datos[0].ACTIVIDAD);

    $("#txtactividad").val(v_Datos[0].ACTIVIDAD);


    $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(v_Datos[0].REP_LEGAL);
    if (v_Datos[0].REPRESENTANTE_DATOS.length > 0) {
        $('#txtdnirepresentante').val(v_Datos[0].REPRESENTANTE_DATOS[0].PPBDOID_NRO);
        $("#resrepresentante").attr("class", "alert alert-success");
        $("#resrepresentante").html(v_Datos[0].REPRESENTANTE_DATOS[0].NOMBRE_COMPLETO);


    }
    else {

        $('#txtdnirepresentante').val('');
        $("#resrepresentante").removeClass();
        $("#resrepresentante").attr("class", "alert alert-info");
        $("#resrepresentante").html('<strong></strong>.');


    }

    $('#hfPPBIDEN_PIDM_CONTACTO').val(v_Datos[0].CONTACTO);
    if (v_Datos[0].CONTACTO_DATOS.length > 0) {
        $('#txtdnicontacto').val(v_Datos[0].CONTACTO_DATOS[0].PPBDOID_NRO);
        $("#rescontacto").attr("class", "alert alert-success");
        $("#rescontacto").html(v_Datos[0].CONTACTO_DATOS[0].NOMBRE_COMPLETO);
    }
    else {
        $('#txtdnicontacto').val('');
        $("#rescontacto").removeClass();
        $("#rescontacto").attr("class", "alert alert-info");
        $("#rescontacto").html('<strong>No se ha seleccionado ninguna Persona</strong>.');
    }

    $('#txtdireccionweb').val(v_Datos[0].WEB);
    $('#txtinicioactividad').val(v_Datos[0].INICIO_ACTIVIDAD);

    $('#hfPPBIMAG_CODE').val(v_Datos[0].PPBIMAG_CODE);
    $('#imgRUC').attr('src', v_Datos[0].PPBIMAG_NOMBRE);

    $('#hfPPRTELE_NUM_SEQ').val(v_Datos[0].PPRTELE_NUM_SEQ);
    $('#txttelefonoj').val(v_Datos[0].NUMERO);

    $('#hfPPRCORR_NUM_SEQ').val(v_Datos[0].PPRCORR_NUM_SEQ);
    $('#txtemailj').val(v_Datos[0].CORREO);

    $('#txtCondSunat').val(v_Datos[0].PPBIDEN_CONDICION_SUNAT);
    $('#txtEstaSunat').val(v_Datos[0].PPBIDEN_ESTADO_SUNAT);
    $('#txtCondSunat').attr('disabled', true);
    $('#txtEstaSunat').attr('disabled', true);

    if (v_Datos[0].AGENTE_RETEN_IND == 'S') {
        $('#chkretencion').attr('checked', true);
        $('#chkretencion').parent().addClass('checked');
        $('#txtfecharetencion').val(v_Datos[0].FECHA_RETEN);
        $('#txtfecharetencion').attr('disabled', false);
    }
    else {
        $('#chkretencion').removeAttr('checked');
        $('#chkretencion').parent().removeClass();
        $('#txtfecharetencion').val('');
        $('#txtfecharetencion').attr('disabled', true);
    }

    if (v_Datos[0].AGENTE_PERCEP_IND == 'S') {
        $('#chkpercepcion').attr('checked', true);
        $('#chkpercepcion').parent().addClass('checked');
        $('#txtfechapercepcion').val(v_Datos[0].FECHA_PERCEP);
        $('#txtfechapercepcion').attr('disabled', false);
    }
    else {
        $('#chkpercepcion').removeAttr('checked');
        $('#chkpercepcion').parent().removeClass();
        $('#txtfechapercepcion').val('');
        $('#txtfechapercepcion').attr('disabled', true);
    }

    if (v_Datos[0].BUEN_CONTRIB_IND == 'S') {
        $('#chkBuenContribuyente').attr('checked', true);
        $('#chkBuenContribuyente').parent().addClass('checked');
        $('#txtFechaBuenContribuyente').val(v_Datos[0].FECHA_BUEN_CONTRIB);
        $('#txtFechaBuenContribuyente').attr('disabled', false);
    }
    else {
        $('#chkBuenContribuyente').removeAttr('checked');
        $('#chkBuenContribuyente').parent().removeClass();
        $('#txtFechaBuenContribuyente').val('');
        $('#txtFechaBuenContribuyente').attr('disabled', true);
    }

    if (v_Datos[0].RELACIONADA_IND == 'S') {
        $('#rbrelasi').attr('checked', true);
        $('#rbrelasi').parent().addClass('checked');
        $('#rbrelano').removeAttr('checked');
        $('#rbrelano').parent().removeClass();
    }
    else {
        $('#rbrelano').attr('checked', true);
        $('#rbrelano').parent().addClass('checked');
        $('#rbrelasi').removeAttr('checked');
        $('#rbrelasi').parent().removeClass();
    }

    if (v_Datos[0].RELACIONADA_CODE.length > 0) {
        $('#cboEmpresa').attr('disabled', false);
        codesEmpresa = v_Datos[0].RELACIONADA_CODE.split(',');
        for (var i = 0; i < codesEmpresa.length; i++) {
            array.push(codesEmpresa[i]);
        }
        filCboEmpresa(array);
    }
    else {
        $('#cboEmpresa').attr('disabled', true);
        $("#cboEmpresa").select2('val', []);
        filCboEmpresa('');

    }

    //09/02/15 - sroncal
    $("#grabarPersona").html("<i class='icon-pencil'></i> Modificar");
    $("#grabarPersona").attr("href", "javascript:ModificarJuridica();");
    $("#grabarPersona").pulsate({
        color: "#0000FF",
        reach: 20,
        repeat: 3,
        glow: true
    });
    /**/

    p = 1;
    cargarEstereotipos();
}

function limpiarDatosPersonaJuridica() {

    ////alert('4');
    $('#txtrazonsocial').val('');
    $('#txtnombrecomercial').val('');
    $('#txtCondSunat').val('');
    $('#txtEstaSunat').val('');
    fillCboTipoContribuyente('#cboTipoContribuyenteJuridica', 'J');

    $('#txtactividad').val('');

    $('#txtdnirepresentante').val('');

    $("#resrepresentante").removeClass();
    $("#resrepresentante").attr("class", "alert alert-info");
    $("#resrepresentante").html('<strong>No se ha seleccionado ninguna Persona</strong>.');

    $('#btnVerificarRepresentanteLegal').removeClass();
    $('#btnVerificarRepresentanteLegal').addClass('span8 btn blue disabled');
    $('#btnVerificarRepresentanteLegal').removeAttr('href');
    $('#btnVerificarRepresentanteLegal').attr('href', 'javascript:;');

    $('#txtdnicontacto').val('');

    $("#rescontacto").removeClass();
    $("#rescontacto").attr("class", "alert alert-info");
    $("#rescontacto").html('<strong>No se ha seleccionado ninguna Persona</strong>.');

    $('#btnVerificarContacto').removeClass();
    $('#btnVerificarContacto').addClass('span8 btn blue disabled');
    $('#btnVerificarContacto').removeAttr('href');
    $('#btnVerificarContacto').attr('href', 'javascript:;')

    $('#txtdireccionweb').val('');
    $('#txtinicioactividad').val('');
    $('#txttelefonoj').val('');
    $('#txtemailj').val('');
    $('#chkretencion').removeAttr('checked');
    $('#chkretencion').parent().removeClass();
    $('#txtfecharetencion').val('');
    $('#txtfecharetencion').removeAttr('placeholder');
    $('#txtfecharetencion').attr('disabled', true);
    $('#chkpercepcion').removeAttr('checked');
    $('#chkpercepcion').parent().removeClass();
    $('#txtfechapercepcion').val('');
    $('#txtfechapercepcion').removeAttr('placeholder');
    $('#txtfechapercepcion').attr('disabled', true);
    $('#rbrelasi').parent().removeClass();
    $('#rbrelasi').removeAttr('checked');
    $('#rbrelano').parent().addClass('checked');
    $('#rbrelano').attr('checked', true);
    $("#cboEmpresa").attr('disabled', true);
    $("#cboEmpresa").select2('val', []);

    $("#grabarPersona").html("<i class='icon-pencil'></i>&nbsp;Grabar");
    $("#grabarPersona").attr("href", "javascript:GrabarJuridica();");

    //fillTxtActividad('#txtactividad', '');

    filCboEmpresa('');

   // obtenerDatosSUNAT();

}

function obtenerDatosSUNAT() {

    var NRO = ide;

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {

            if (datos != null) {

                $('#txtrazonsocial').val(datos[0].RAZON_SOCIAL);
                $('#txttelefonoj').val(datos[0].TELEFONO);
                $('#hfDireccionPersonaJuridica').val(datos[0].DIRECCION);
                $('#txtnombrecomercial').val(datos[0].NOMBRE_COMERCIAL);

            }
            arrayActividad
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function fillTxtActividad(v_ID, v_value) {
    var obj = '';
    var selectActividad = $(v_ID);

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=5",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
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
            alert(msg);
        }
    });
}

function filCboEmpresa(v_value) {
    var selectEmpresa = $('#cboEmpresa');

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=6&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            selectEmpresa.empty();
            selectEmpresa.append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            if (datos != null && v_value.length > 0) {
                selectEmpresa.select2('val', v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function fillCboEstadoCivil(value) {
    var selectEstadoCivil = $('#cboEstadoCivil');
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=2",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEstadoCivil.empty();
            selectEstadoCivil.append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEstadoCivil.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            if (datos != null && $.trim(value).length > 0) {
                selectEstadoCivil.select2('val', value);
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}


function fillCboTipoContribuyente(v_ID, v_TIPO, val0r) {
    var selectTipoContribuyente = $(v_ID);
    var vdatos = null;
    Bloquear($(selectTipoContribuyente.siblings("div")[0]).attr("id"));
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=9&TCON_TIPO=" + v_TIPO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectTipoContribuyente.empty();

            selectTipoContribuyente.append('<option value="">NO ES CONTRIBUYENTE</option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectTipoContribuyente.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                }
                vdatos = datos;
            }
            selectTipoContribuyente.select2('val', '');
        },
        error: function (msg) {
            alert(msg);
        }
    }).done(function () {

        if (val0r != undefined && vdatos != null) {
            selectTipoContribuyente.select2('val', val0r);
        }
        Desbloquear($(selectTipoContribuyente.siblings("div")[0]).attr("id"));
    });
}

function CancelarOperacion() {

    vg_OptionsTipoTelefono = '';
    vg_OptionsTipoEmail = '';
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

    $("#DatosPersona").attr("style", "display:none;");


    $("#cboTipoDocumento").removeAttr("disabled", "disabled");
    $("#txtdocumento").removeAttr("disabled", "disabled");
    $("#btnverificar").attr("class", "span8 btn green");

    $("#btnverificar").attr("onclick", "javascript:VerificarPersona();");

    $("#txtdocumento").focus();
    $("#estereotipos").attr("style", 'display: none;');

    var v_Documento = $('#txtdocumento').val();

    if ($('#cboTipoDocumento').val() == "1") {
        $("#txtdocumento").inputmask({ "mask": "9", "repeat": 8, "greedy": false });
        //   offObjectEvents('txtdocumento');
        HandlerKeydownDocumento();
    }
    else if ($('#cboTipoDocumento').val() == "6") {
        $("#txtdocumento").inputmask({ "mask": "9", "repeat": 11, "greedy": false });
        //   offObjectEvents('txtdocumento');
        HandlerKeydownDocumento();
    }
    else {
        $("#txtdocumento").inputmask({ "mask": "#", "repeat": 20, "greedy": false });
        //     offObjectEvents('txtdocumento');
        HandlerKeydownDocumento();
    }

    $('#txtdocumento').val(v_Documento);

    $(".verificar").show();

}


function VerificarContacto() {


    tipo_contacto = "C";
    tipo_contactoGeneral = "C";

    var nro = $.trim($("#txtdnicontacto").val());
    Bloquear("rescontacto");
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=7&NRO=" + nro + "&P_TIPOCONTA=" + tipo_contacto + "&PIDMEMPRESA=" + $('#hfPPBIDEN_PIDM').val(),
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            Desbloquear("rescontacto");
            console.log("ss" + datos.toString())
            if (datos[0].SUCCESS == "OK") {
                if (datos[0].TIPOCONTAC == "A") {

                    $('#hfPPBIDEN_PIDM_CONTACTO').val(datos[0].PIDM);
                    $("#rescontacto").attr("class", "alert alert-success");
                    $("#rescontacto").html(datos[0].APELL_PATE + ' ' + datos[0].APELL_MATE + ' ' + datos[0].NOMBRE + '  ' + "<strong><a class='btn red ' id='btneliminar' ><i class='icon-remove'></i></a></a><strong>");//Mostramos el resultado en el div pidm
                    $('#btneliminar').attr('href', 'javascript:eliminarCR(' + datos[0].PIDM + ',' + $('#hfPPBIDEN_PIDM').val() + ',"C");');
                }
                else {

                    $('#hfPPBIDEN_PIDM_CONTACTO').val(datos[0].PIDM);
                    $("#rescontacto").attr("class", "alert alert-success");
                    $("#rescontacto").html(datos[0].APELL_PATE + ' ' + datos[0].APELL_MATE + ' ' + datos[0].NOMBRE);//Mostramos el resultado en el div pidm

                }

            }

            if (datos[0].SUCCESS == "ERROR") {
                $('#hfPPBIDEN_PIDM_CONTACTO').val('');
                $("#rescontacto").attr("class", "alert alert-error");
                $("#rescontacto").html(" Persona ya esta registrida como Representante <strong><a class='btn green ' id='agregarRR' ><i class='icon-plus'></i></a></a><strong>");//Mostramos el resultado en el div pidm
                $('#agregarRR').attr('href', 'javascript:agregarCR();');

            }
            if (datos[0].SUCCESS == "NO") {
                $('#rescontacto').val('');
                $("#rescontacto").attr("class", "alert alert-error");
                $("#rescontacto").html("Persona No Encontrada <br> Desea Crearla?? <strong><a href='javascript:ModalCrearPersona(" + "\"C\"" + ");'>Click Aqui</a><strong>");//Mostramos el resultado en el div pidm

            }

            if (datos[0].SUCCESS == "NOCONTA") {

                $('#txtdnirepresentante').attr('disable', true);
                $('#rescontacto').val('');
                $("#rescontacto").attr("class", "alert alert-error");
                $("#rescontacto").html("Persona ya existe en otra empresa <br> Desea Agregarla?? <strong><a class='btn green ' id='agregarContacRepres' ><i class='icon-plus'></i></a></a><strong>");//Mostramos el resultado en el div pidm
                $('#agregarContacRepres').attr('href', 'javascript:agregarContacto();');
            }

        },
        error: function (msg) {
            Desbloquear("rescontacto");//LLamamos a la funcion desbloquear
            alert(msg);
        }
    });

}


function eliminarCR(contacto, empresa, tipo) {



    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=21&PIDM=" + contacto + "&PIDMEMPRESA=" + empresa + "&P_TIPOCONTA=" + tipo,
        contenttype: false,
        datatype: null,
        async: false,
        success: function (datos) {

            if (datos = "ok") {
                exito()

                if (tipo == "R") {

                    $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
                    $("#resrepresentante").removeClass();
                    $("#resrepresentante").attr("class", "alert alert-info");
                    $("#resrepresentante").html('<strong>No se ha seleccionado ninguna Persona</strong>.');
                    $('txtdnirepresentante').val('');

                }
                else {
                    $('#hfPPBIDEN_PIDM_CONTACTO').val(datos[0].p_PPBIDEN_PIDM);
                    $("#rescontacto").removeClass();
                    $("#rescontacto").attr("class", "alert alert-info");
                    $("#rescontacto").html('<strong>No se ha seleccionado ninguna Persona</strong>.');
                    $('txtdnicontacto').val('');

                }
            }
            else {
                noexito()
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

//VerificarRepresentante
function VerificarRepresentante() {

    //alert('5');
    var nro = $.trim($("#txtdnirepresentante").val());
    tipo_contacto = "R";
    tipo_contactoGeneral = "R"
    Bloquear("resrepresentante");
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=7&NRO=" + nro + "&P_TIPOCONTA=" + tipo_contacto + "&PIDMEMPRESA=" + $('#hfPPBIDEN_PIDM').val(),
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            Desbloquear("resrepresentante");
            if (datos[0].SUCCESS == "OK") {

                if (datos[0].TIPOCONTAC == "A") {



                    $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(datos[0].PIDM);
                    $("#resrepresentante").attr("class", "alert alert-success");
                    $("#resrepresentante").html(datos[0].APELL_PATE + ' ' + datos[0].APELL_MATE + ' ' + datos[0].NOMBRE + '  ' + "<strong><a class='btn red ' id='btneliminarR' ><i class='icon-remove'></i></a></a><strong>");
                    $('#btneliminarR').attr('href', 'javascript:eliminarCR(' + datos[0].PIDM + ',' + $('#hfPPBIDEN_PIDM').val() + ',"R");');

                }
                else {

                    $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(datos[0].PIDM);
                    $("#resrepresentante").attr("class", "alert alert-success");
                    $("#resrepresentante").html(datos[0].APELL_PATE + ' ' + datos[0].APELL_MATE + ' ' + datos[0].NOMBRE);

                }

            }

            if (datos[0].SUCCESS == "ERROR") {
                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
                $("#resrepresentante").attr("class", "alert alert-error");
                $("#resrepresentante").html("Persona ya esta registrida como Contacto <strong><a class='btn green ' id='agregarCR' ><i class='icon-plus'></i></a></a><strong>");//Mostramos el resultado en el div pidm
                $('#agregarCR').attr('href', 'javascript:agregarCR();');
            }

            if (datos[0].SUCCESS == "NO") {
                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
                $("#resrepresentante").attr("class", "alert alert-error");
                $("#resrepresentante").html("Persona No Encontrada <br> Desea Crearla?? <strong><a href='javascript:ModalCrearPersona(" + "\"R\"" + ");'>Click Aqui</a><strong>");//Mostramos el resultado en el div pidm

            }

            if (datos[0].SUCCESS == "NOCONTA") {
                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
                $("#resrepresentante").attr("class", "alert alert-error");
                $("#resrepresentante").html("Persona ya existe en otra empresa <br> Desea Agregarla?? <strong><a class='btn green ' id='agregarContac' ><i class='icon-plus'></i></a></a><strong>");//Mostramos el resultado en el div pidm
                $('#agregarContac').attr('href', 'javascript:agregarContacto();');
            }
        },
        error: function (msg) {
            Desbloquear("resrepresentante");
            alert(msg);
        }
    });
}



function GrabarJuridica() {

    var Errors = true;
    var v_ArrayRelacionada = new Array();

    //PPBIDEN
    var APELL_PATE = '';
    var RAZO_COME = '';
    var ACTIVIDAD = '';
    var CONTACTO = '';
    var REP_LEGAL = '';
    var WEB = '';
    var AGENTE_RETEN_IND = '';
    var FECHA_AGENTE_RETEN = '';
    var AGENTE_PERCEP_IND = '';
    var FECHA_AGENTE_PERCEP = '';
    var RELACIONADA_IND = '';
    var RELACIONADA_CODE = '';

    var ENTIDAD_IND = '';
    var TINO_CODE = '';
    var USUA_ID = '';
    var INICIO_ACTIVIDAD = '';
    var TIPO_CONTRIBUYENTE = '';

    //PPBDOID
    var DOID_CODE = ''; //NOT NULL
    var NRO = ''; //NOT NULL,
    var ESTADO_IND = ''; //NOT NULL,

    //PPRTELE
    var PPRTELE_TIDT_CODE = ''; //NOT NULL,
    var NUMERO = ''; //NULL

    //PPRCORR
    var PPRCORR_TIDT_CODE = ''; //NOT NULL,
    var CORREO = ''; //NULL,

    //PPBIMAG
    var TIPO = ''; //NOT NULL COMMENT 'N=FOTO PERSONA NATUAL (FOTO PERSONAL), J=FOTO PERSONA JURIDICA (LOGO EMPRESA), A: ANVERSO CHOFER, R: REVERSO CHOFER .',
    var PPBIMAG = ''; //NOT NULL,

    //ESTADOS SUNAT
    var CONDI_SUNAT = '';
    var ESTADO_SUNAT = '';

    Errors = validarPersonaJuridica();

    if (Errors) {

        APELL_PATE = $.trim($('#txtrazonsocial').val());
        if (APELL_PATE.length == 0) {
            $('#txtrazonsocial').val('');
        }

        RAZO_COME = $.trim($('#txtnombrecomercial').val());
        ACTIVIDAD = $.trim($('#txtactividad').val());
        CONTACTO = $.trim($('#hfPPBIDEN_PIDM_CONTACTO').val());
        REP_LEGAL = $.trim($('#hfPPBIDEN_PIDM_REPRESENTANTE').val());
        WEB = $.trim($('#txtdireccionweb').val());
        AGENTE_RETEN_IND = $("#chkretencion").is(':checked') ? 'S' : 'N';
        FECHA_AGENTE_RETEN = $.trim($('#txtfecharetencion').val());
        AGENTE_PERCEP_IND = $("#chkpercepcion").is(':checked') ? 'S' : 'N';
        FECHA_AGENTE_PERCEP = $.trim($('#txtfechapercepcion').val());
        RELACIONADA_IND = $("#rbrelasi").is(':checked') ? 'S' : 'N';

        v_ArrayRelacionada = $('#cboEmpresa').val();

        //if ($('#cboEmpresa').val() == null) {
        //    RELACIONADA_CODE = '';
        //}
        //else {
        //    RELACIONADA_CODE = $('#cboEmpresa').val();
        //}

        if (v_ArrayRelacionada == null) {
            RELACIONADA_CODE = '';
        }
        else {
            if (v_ArrayRelacionada.length > 0) {
                for (var i = 0; i < v_ArrayRelacionada.length; i++) {
                    if ($.trim(v_ArrayRelacionada[0]) != "") {
                        RELACIONADA_CODE += v_ArrayRelacionada[0] + ',';
                    }
                    if (i == v_ArrayRelacionada.length - 1) {
                        if (RELACIONADA_CODE.length > 0) {
                            RELACIONADA_CODE = RELACIONADA_CODE.substr(0, RELACIONADA_CODE.length - 1);
                        }
                    }
                }
            }
        }

        ENTIDAD_IND = 'J';
        TINO_CODE = 'PJUR';
        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
        INICIO_ACTIVIDAD = $.trim($('#txtinicioactividad').val());
        TIPO_CONTRIBUYENTE = $('#cboTipoContribuyenteJuridica').val();

        DOID_CODE = $('#cboTipoDocumento').val();
        NRO = $.trim($('#txtrucjuridico').val());
        if (NRO.length == 0) {
            $('#txtrucjuridico').val('');
        }
        ESTADO_IND = 'A';

        //PPRTELE_TIDT_CODE = '0003';
        PPRTELE_TIDT_CODE = '';
        NUMERO = $.trim($('#txttelefonoj').val());

        //PPRCORR_TIDT_CODE = '0001';
        PPRCORR_TIDT_CODE = '';
        CORREO = $.trim($('#txtemailj').val());

        TIPO = 'J';
        //PPBIMAG = $("#fileRUC")[0].files[0];
        PPBIMAG = $("#imgRUC").attr("src");

        CONDI_SUNAT = $.trim($('#txtCondSunat').val());
        ESTADO_SUNAT = $.trim($('#txtEstaSunat').val());

        var data = new FormData();
        data.append('OPCION', 'NPJ');
        data.append('APELL_PATE', APELL_PATE);
        data.append('RAZO_COME', RAZO_COME);
        data.append('ACTIVIDAD', ACTIVIDAD);
        data.append('CONTACTO', CONTACTO);
        data.append('REP_LEGAL', REP_LEGAL);
        data.append('WEB', WEB);
        data.append('AGENTE_RETEN_IND', AGENTE_RETEN_IND);
        data.append('FECHA_AGENTE_RETEN', FECHA_AGENTE_RETEN);
        data.append('AGENTE_PERCEP_IND', AGENTE_PERCEP_IND);
        data.append('FECHA_AGENTE_PERCEP', FECHA_AGENTE_PERCEP);
        data.append('RELACIONADA_IND', RELACIONADA_IND);
        data.append('RELACIONADA_CODE', RELACIONADA_CODE);
        data.append('ENTIDAD_IND', ENTIDAD_IND);
        data.append('TINO_CODE', TINO_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('DOID_CODE', DOID_CODE);
        data.append('NRO', NRO);
        data.append('ESTADO_IND', ESTADO_IND);
        data.append('PPRTELE_TIDT_CODE', PPRTELE_TIDT_CODE);
        data.append('NUMERO', NUMERO);
        data.append('PPRCORR_TIDT_CODE', PPRCORR_TIDT_CODE);
        data.append('CORREO', CORREO);
        data.append('TIPO', TIPO);
        data.append('PPBIMAG', PPBIMAG);
        data.append('INICIO_ACTIVIDAD', INICIO_ACTIVIDAD);
        data.append('TIPO_CONTRIBUYENTE', TIPO_CONTRIBUYENTE);

        BUEN_CONTRIB_IND = $("#chkBuenContribuyente").is(':checked') ? 'S' : 'N';
        FECHA_BUEN_CONTRIB = $.trim($('#txtFechaBuenContribuyente').val());
        data.append('BUEN_CONTRIB_IND', BUEN_CONTRIB_IND);
        data.append('FECHA_BUEN_CONTRIB', FECHA_BUEN_CONTRIB);   

        data.append('sCONDI_SUNAT', CONDI_SUNAT);  
        data.append('sESTADO_SUNAT', ESTADO_SUNAT);  

        Bloquear("juridica");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
         .success(function (res) {
             Desbloquear("juridica");
             if (res != null) {
                 var datos = $.parseJSON(res);
                 if (datos.length > 0) {
                     if (datos[0].SUCCESS == "OK") {
                        
                         $('#hfPPBIDEN_PIDM').val(datos[0].p_PPBIDEN_PIDM);
                         $('#hfPPBIDEN_ID').val(datos[0].p_PPBIDEN_ID);
                         $('#hidPersona').text("ID:" + datos[0].p_PPBIDEN_ID);
                         $('#hfPPRTELE_NUM_SEQ').val(datos[0].p_PPRTELE_NUM_SEQ);
                         $('#hfPPRCORR_NUM_SEQ').val(datos[0].p_PPRCORR_NUM_SEQ);
                         $('#hfPPBIMAG_CODE').val(datos[0].p_PPBIMAG_CODE);
                         exito();

                         $("#btnHabido").show();
                         $("#grabarPersona").html("<i class='icon-pencil'></i> Modificar");
                         $("#grabarPersona").attr("href", "javascript:ModificarJuridica();");

                         
                         $.getScript("../../vistas/NC/persona/js/PersonaJuridica.js")
                            .done(function (script, textStatus) {
                                NCMPEJU.init();
                            });

                         NRORUC = ide;

                         cargarEstereotipos();
                         
                     }
                 }
             }
             else {
                 noexito();
             }
         })
        .error(function () {
            Desbloquear("juridica");
            alert("Error al grabar Persona Jurídica.");
        })
        ;
    }

}

function ModificarJuridica() {

    var Errors = true;
    var v_ArrayRelacionada = new Array();

    //PPBIDEN
    var PIDM = 0;
    var APELL_PATE = '';
    var RAZO_COME = '';
    var ACTIVIDAD = '';
    var CONTACTO = '';
    var REP_LEGAL = '';
    var WEB = '';
    var AGENTE_RETEN_IND = '';
    var FECHA_AGENTE_RETEN = '';
    var AGENTE_PERCEP_IND = '';
    var FECHA_AGENTE_PERCEP = '';
    var RELACIONADA_IND = '';
    var RELACIONADA_CODE = '';
    var USUA_ID = '';
    var INICIO_ACTIVIDAD = '';
    var TIPO_CONTRIBUYENTE = '';

    //PPBDOID
    var DOID_CODE = ''; //NOT NULL
    var NRO = ''; //NOT NULL,

    //PPRTELE
    var PPRTELE_NUM_SEQ = 0;
    var NUMERO = ''; //NULL

    //PPRCORR
    var PPRCORR_NUM_SEQ = 0;
    var CORREO = ''; //NULL,

    //PPBIMAG
    var PPBIMAG_CODE = '';
    var PPBIMAG = '';
    var PPBIMAG_URL = '';

    Errors = validarPersonaJuridica();

    if (Errors) {

        PIDM = $('#hfPPBIDEN_PIDM').val();
        APELL_PATE = $.trim($('#txtrazonsocial').val());
        if (APELL_PATE.length == 0) {
            $('#txtrazonsocial').val('');
        }
        RAZO_COME = $.trim($('#txtnombrecomercial').val());
        ACTIVIDAD = $.trim($('#txtactividad').val());
        CONTACTO = $.trim($('#hfPPBIDEN_PIDM_CONTACTO').val());
        REP_LEGAL = $.trim($('#hfPPBIDEN_PIDM_REPRESENTANTE').val());
        WEB = $.trim($('#txtdireccionweb').val());
        AGENTE_RETEN_IND = $("#chkretencion").is(':checked') ? 'S' : 'N';
        FECHA_AGENTE_RETEN = $.trim($('#txtfecharetencion').val());
        AGENTE_PERCEP_IND = $("#chkpercepcion").is(':checked') ? 'S' : 'N';
        FECHA_AGENTE_PERCEP = $.trim($('#txtfechapercepcion').val());
        RELACIONADA_IND = $("#rbrelasi").is(':checked') ? 'S' : 'N';

        //if ($('#cboEmpresa').val() == null) {
        //    RELACIONADA_CODE = '';
        //}
        //else {
        //    RELACIONADA_CODE = $('#cboEmpresa').val();
        //}

        v_ArrayRelacionada = $('#cboEmpresa').val();

        if (v_ArrayRelacionada == null) {
            RELACIONADA_CODE = '';
        }
        else {
            if (v_ArrayRelacionada.length > 0) {
                //for (var i = 0; i < v_ArrayRelacionada.length; i++) {
                //    if ($.trim(v_ArrayRelacionada[0]) != "") {
                //        RELACIONADA_CODE += v_ArrayRelacionada[0] + ',';
                //    }
                //    if (i == v_ArrayRelacionada.length - 1) {
                //        if (RELACIONADA_CODE.length > 0) {
                //            RELACIONADA_CODE = RELACIONADA_CODE.substr(0, RELACIONADA_CODE.length - 1);
                //        }
                //    }
                //}
                RELACIONADA_CODE = $('#cboEmpresa').val().toString();
            }
        }

        USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();
        INICIO_ACTIVIDAD = $.trim($('#txtinicioactividad').val());
        TIPO_CONTRIBUYENTE = $('#cboTipoContribuyenteJuridica').val();

        DOID_CODE = $('#cboTipoDocumento').val();
        NRO = $.trim($('#txtrucjuridico').val());
        if (NRO.length == 0) {
            $('#txtrucjuridico').val('');
        }

        PPRTELE_NUM_SEQ = $.trim($('#hfPPRTELE_NUM_SEQ').val()) == '' ? 1 : parseInt($.trim($('#hfPPRTELE_NUM_SEQ').val()));
        NUMERO = $.trim($('#txttelefonoj').val());

        PPRCORR_NUM_SEQ = $.trim($('#hfPPRCORR_NUM_SEQ').val()) == '' ? 1 : parseInt($.trim($('#hfPPRCORR_NUM_SEQ').val()));
        CORREO = $.trim($('#txtemailj').val());

        PPBIMAG_CODE = $('#hfPPBIMAG_CODE').val();

        // PPBIMAG = $("#fileRUC")[0].files[0];
        PPBIMAG = $("#imgRUC").attr("src");

        if (typeof ($("#fileRUC")[0].files[0]) === "undefined") {
            PPBIMAG_URL = $('#imgRUC').attr('src');
        }
        else {
            PPBIMAG_URL = '';
        }

        var data = new FormData();
        data.append('OPCION', 'MPJ');
        data.append('PIDM', PIDM);
        data.append('APELL_PATE', APELL_PATE);
        data.append('RAZO_COME', RAZO_COME);
        data.append('ACTIVIDAD', ACTIVIDAD);
        data.append('CONTACTO', CONTACTO);
        data.append('REP_LEGAL', REP_LEGAL);
        data.append('WEB', WEB);
        data.append('AGENTE_RETEN_IND', AGENTE_RETEN_IND);
        data.append('FECHA_AGENTE_RETEN', FECHA_AGENTE_RETEN);
        data.append('AGENTE_PERCEP_IND', AGENTE_PERCEP_IND);
        data.append('FECHA_AGENTE_PERCEP', FECHA_AGENTE_PERCEP);
        data.append('RELACIONADA_IND', RELACIONADA_IND);
        data.append('RELACIONADA_CODE', RELACIONADA_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('DOID_CODE', DOID_CODE);
        data.append('NRO', NRO);
        data.append('PPRTELE_NUM_SEQ', PPRTELE_NUM_SEQ);
        data.append('NUMERO', NUMERO);
        data.append('PPRCORR_NUM_SEQ', PPRCORR_NUM_SEQ);
        data.append('CORREO', CORREO);
        data.append('PPBIMAG_CODE', PPBIMAG_CODE);
        data.append('PPBIMAG', PPBIMAG);
        data.append('PPBIMAG_URL', PPBIMAG_URL);
        data.append('INICIO_ACTIVIDAD', INICIO_ACTIVIDAD);
        data.append('TIPO_CONTRIBUYENTE', TIPO_CONTRIBUYENTE);

        BUEN_CONTRIB_IND = $("#chkBuenContribuyente").is(':checked') ? 'S' : 'N';
        FECHA_BUEN_CONTRIB = $.trim($('#txtFechaBuenContribuyente').val());
        data.append('BUEN_CONTRIB_IND', BUEN_CONTRIB_IND);
        data.append('FECHA_BUEN_CONTRIB', FECHA_BUEN_CONTRIB);

        Bloquear("juridica");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("juridica");
            if (res != null) {
                var datos = $.parseJSON(res);
                if (datos.length > 0) {
                    if (datos[0].SUCCESS == "OK") {
                        exito();
                    }
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("juridica");
            alert("Error al modificar Persona Jurídica.");
        })
        ;
    }

}

function validarPersonaJuridica() {
    var Errors = true;

    if (vErrorsNotMessage(["txtrazonsocial"]) == false) {
        Errors = false;
    }

    var email = $.trim($('#txtemailj').val());

    if (email.length > 0) {
        if (validarEmail(email) == false) {
            $('#txtemailj').val('');
            if (vErrorsNotMessage(["txtemailj"]) == false) {
                $('#txtemailj').val(email);
                Errors = false;
            }
        }
    }

    var actividad = $.trim($('#txtactividad').val());

    if (actividad.length > 0) {

        var jsonActividades = arrayActividad;
        var existeActividad = false;

        for (var i = 0; i < jsonActividades.length; i++) {
            if (actividad == jsonActividades[i].replace('(','').replace(')','')) {
                existeActividad = true;
                break;
            }
        }

        if (!existeActividad) {
            //offObjectEvents('txtactividad');
            //$('#txtactividad').val('');
            //$('#txtactividad').parent().parent().removeClass();
            //$('#txtactividad').parent().parent().addClass('control-group error');
            //$('#txtactividad ~ span').children().remove();
            $('#txtactividad').val('');
            //Errors = false;
            if (vErrorsNotMessage(["txtactividad"]) == false) {
                $('#txtactividad').val(actividad);
                Errors = false;
            }
        }
    }

    var v_FechaRetencion = $('#txtfecharetencion').val();
    if ($("#chkretencion").is(':checked')) {
        if (v_FechaRetencion == "") {
            //$('#txtfecharetencion').parent().parent().removeClass();
            //$('#txtfecharetencion').parent().parent().addClass('control-group error');
            //$('#txtfecharetencion ~ span').children().remove();
            //Errors = false;
            if (vErrorsNotMessage(["txtfecharetencion"]) == false) {
                Errors = false;
            }
        }
        else {
            //$('#txtfecharetencion').parent().parent().removeClass();
            //$('#txtfecharetencion').parent().parent().addClass('control-group');
            offObjectEvents('txtfecharetencion');
            $('#txtfecharetencion').val(v_FechaRetencion);
        }

    }

    var v_FechaPercepcion = $('#txtfechapercepcion').val();
    if ($("#chkpercepcion").is(':checked')) {
        if (v_FechaPercepcion == "") {
            //$('#txtfechapercepcion').parent().parent().removeClass();
            //$('#txtfechapercepcion').parent().parent().addClass('control-group error');
            //$('#txtfechapercepcion ~ span').children().remove();
            //Errors = false;
            if (vErrorsNotMessage(["txtfechapercepcion"]) == false) {
                Errors = false;
            }
        }
        else {
            //$('#txtfechapercepcion').parent().parent().removeClass();
            //$('#txtfechapercepcion').parent().parent().addClass('control-group');
            offObjectEvents('txtfechapercepcion');
            $('#txtfechapercepcion').val(v_FechaPercepcion);
        }

    }

    var v_FechaBuenContrib = $('#txtFechaBuenContribuyente').val();
    if ($("#chkBuenContribuyente").is(':checked')) {
        if (v_FechaBuenContrib == "") {            
            if (vErrorsNotMessage(["txtFechaBuenContribuyente"]) == false) {
                Errors = false;
            }
        }
        else {            
            $('#chkBuenContribuyente').val(v_FechaBuenContrib);
            //offObjectEvents('txtFechaBuenContribuyente');
        }
    }

    if ($("#rbrelasi").is(':checked')) {

        if ($('#cboEmpresa').val() == null) {
            //$('#cboEmpresa').parent().parent().removeClass();
            //$('#cboEmpresa').parent().parent().addClass('control-group error');
            //$('#cboEmpresa ~ span').children().remove();
            //Errors = false;
            if (vErrorsNotMessage(["cboEmpresa"]) == false) {
                $("#cboEmpresa").select2('val', []);
                Errors = false;
            }
        }
        var v_ArrayRelacionada = new Array();

        v_ArrayRelacionada = $('#cboEmpresa').val();

        if (v_ArrayRelacionada != null) {

            if (v_ArrayRelacionada.length == 1) {
                if ($.trim(v_ArrayRelacionada[0]) == "") {
                    if (vErrorsNotMessage(["cboEmpresa"]) == false) {
                        $("#cboEmpresa").select2('val', []);
                        Errors = false;
                    }
                }
            }

        }
        else {
            if (vErrorsNotMessage(["cboEmpresa"]) == false) {
                $("#cboEmpresa").select2('val', []);
                Errors = false;
            }
        }
    }

    if (!Errors) {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
    }

    return Errors;
}



//MODAL CREAR PERSONA ----------------------------------

function ModalCrearPersona(v_TipoPersona) {

    var TipoPersona = $.trim(v_TipoPersona);

    $('#MuestraModal').modal('show');

    limpiarDatosModalPersonaNatural(v_TipoPersona);

    $("#txtModalApePaterno").focus();

    if (TipoPersona == "R")
        $("#txtModaldninatural").val($('#txtdnirepresentante').val());
    else
        $("#txtModaldninatural").val($('#txtdnicontacto').val());

    $("#txtModalApePaterno").inputmask({ "mask": "%", "repeat": 150, "greedy": false });
    $("#txtModalApeMaterno").inputmask({ "mask": "%", "repeat": 40, "greedy": false });
    $("#txtModalNombres").inputmask({ "mask": "%", "repeat": 40, "greedy": false });

    $('#txtModalfechanac').datepicker();
    $('#txtModalfechanac').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });

    $('#txtModaltelefono').inputmask({ "mask": "T", "repeat": 20, "greedy": false });
    $('#txtModalemail').inputmask({ "mask": "E", "repeat": 50, "greedy": false });

}

function fillModalCboEstadoCivil(value) {
    var selectModalEstadoCivil = $('#cboModalEstadoCivil');
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=2",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectModalEstadoCivil.empty();
            selectModalEstadoCivil.append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectModalEstadoCivil.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            if (datos != null && $.trim(value).length > 0) {
                selectModalEstadoCivil.select2('val', value);
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function limpiarDatosModalPersonaNatural(v_TipoPersona) {
    $('#txtModalApePaterno').val('');

    offObjectEvents('txtModalApePaterno');
    $('#txtModalApeMaterno').val('');
    $('#txtModalNombres').val('');

    $('#rbModalmasculino').attr('checked', true);
    $('#rbModalmasculino').parent().addClass('checked');

    $('#rbModalfemenino').removeAttr('checked');
    $('#rbModalfemenino').parent().removeClass();

    $('#cboModalEstadoCivil').select2('val', '');
    fillModalCboEstadoCivil('');

    $('#txtModalfechanac').val('');

    $('#txtModaltelefono').val('');
    offObjectEvents('txtModaltelefono');
    $('#txtModalemail').val('');

    offObjectEvents('txtModalemail');

    $('#grabarModalPersonaNatural').removeClass();
    $('#grabarModalPersonaNatural').addClass('btn blue');
    $("#grabarModalPersonaNatural").html("<i class='icon-pencil'></i>&nbsp;Grabar");
    $("#grabarModalPersonaNatural").attr("href", "javascript:GrabarModalNatural(\"" + v_TipoPersona + "\");");

}

function GrabarModalNatural(v_TipoPersona) {
    var Errors = true;

    //PPBIDEN
    var PIDMEMPRESA = $('#hfPPBIDEN_PIDM').val()
    var APELL_PATE = ''; //NOT NULL
    var APELL_MATE = ''; //NULL,
    var NOMBRE = ''; //NULL,
    var FECHA = ''; //NULL 
    var AGENTE_RETEN_IND = '';
    var ENTIDAD_IND = ''; //NOT NULL,
    var TINO_CODE = ''; //NULL,
    var USUA_ID = ''; //NOT NULL,

    //PPBPEBA
    var SEXO = ''; //NULL,
    var ESCI_CODE = ''; //NULL,

    //PPBDOID
    var DOID_CODE = ''; //NOT NULL
    var NRO = ''; //NOT NULL,
    var NRO_RUC = '';
    var ESTADO_IND = ''; //NOT NULL,

    //PPRTELE
    var PPRTELE_TIDT_CODE = ''; //NOT NULL,
    var OPERADOR = ''; //NULL,
    var NUMERO = ''; //NULL

    //PPRCORR
    var PPRCORR_TIDT_CODE = ''; //NOT NULL,
    var CORREO = ''; //NULL,

    //PPBIMAG
    var TIPO = ''; //NOT NULL COMMENT 'N=FOTO PERSONA NATUAL (FOTO PERSONAL), J=FOTO PERSONA JURIDICA (LOGO EMPRESA), A: ANVERSO CHOFER, R: REVERSO CHOFER .',
    var PPBIMAG = ''; //NOT NULL,

    APELL_PATE = $.trim($('#txtModalApePaterno').val());
    if (APELL_PATE.length == 0) {
        $('#txtModalApePaterno').val('');
    }
    APELL_MATE = $.trim($('#txtModalApeMaterno').val());
    NOMBRE = $.trim($('#txtModalNombres').val());
    FECHA = $.trim($('#txtModalfechanac').val());
    AGENTE_RETEN_IND = 'N';
    ENTIDAD_IND = 'N';
    TINO_CODE = 'PNAT';
    USUA_ID = $('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfUsuario').val();



    if ($('#rbModalmasculino').is(':checked')) {
        SEXO = 'M';
    }

    if ($('#rbModalfemenino').is(':checked')) {
        SEXO = 'F';
    }

    //SEXO = $("input:radio[name=sexo]:checked").val();

    ESCI_CODE = $('#cboModalEstadoCivil').val();

    DOID_CODE = "1";
    NRO = $.trim($('#txtModaldninatural').val());
    if (NRO.length == 0) {
        $('#txtModaldninatural').val('');
    }
    NRO_RUC = '';
    ESTADO_IND = 'A';

    PPRTELE_TIDT_CODE = '';

    OPERADOR = '';
    NUMERO = $.trim($('#txtModaltelefono').val());

    PPRCORR_TIDT_CODE = '';
    CORREO = $.trim($('#txtModalemail').val());

    TIPO = 'N';

    PPBIMAG = '';

    Errors = validarModalPersonaNatural();
    if (Errors) {
        var data = new FormData();

        data.append('OPCION', 'NPMN');
        data.append('PIDMEMPRESA', PIDMEMPRESA);
        data.append('P_TIPOCONTA', tipo_contacto);
        data.append('APELL_PATE', APELL_PATE);
        data.append('APELL_MATE', APELL_MATE);
        data.append('NOMBRE', NOMBRE);
        data.append('FECHA', FECHA);
        data.append('AGENTE_RETEN_IND', AGENTE_RETEN_IND);
        data.append('ENTIDAD_IND', ENTIDAD_IND);
        data.append('TINO_CODE', TINO_CODE);
        data.append('USUA_ID', USUA_ID);
        data.append('SEXO', SEXO);
        data.append('ESCI_CODE', ESCI_CODE);
        data.append('DOID_CODE', DOID_CODE);
        data.append('NRO', NRO);
        data.append('NRO_RUC', NRO_RUC);
        data.append('ESTADO_IND', ESTADO_IND);
        data.append('PPRTELE_TIDT_CODE', PPRTELE_TIDT_CODE);
        data.append('OPERADOR', OPERADOR);
        data.append('NUMERO', NUMERO);
        data.append('PPRCORR_TIDT_CODE', PPRCORR_TIDT_CODE);
        data.append('CORREO', CORREO);
        data.append('TIPO', TIPO);
        data.append('PPBIMAG', PPBIMAG);
        Bloquear("MuestraModal");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMPERS.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("MuestraModal");
            if (res != null) {
                var datos = $.parseJSON(res);
                if (datos.length > 0) {
                    if (datos[0].SUCCESS == "OK") {
                        if (v_TipoPersona == "C") {
                            $('#hfPPBIDEN_PIDM_CONTACTO').val(datos[0].p_PPBIDEN_PIDM);
                            $("#rescontacto").attr("class", "alert alert-success");
                            $("#rescontacto").html(datos[0].p_NOMBRE_COMPLETO);
                            if ($.trim($('#txtdnirepresentante').val()) == $.trim($('#txtdnicontacto').val())) {
                                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(datos[0].p_PPBIDEN_PIDM);
                                $("#resrepresentante").attr("class", "alert alert-success");
                                $("#resrepresentante").html(datos[0].p_NOMBRE_COMPLETO);
                            }
                        }
                        else {
                            $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(datos[0].p_PPBIDEN_PIDM);
                            $("#resrepresentante").attr("class", "alert alert-success");
                            $("#resrepresentante").html(datos[0].p_NOMBRE_COMPLETO);
                            if ($.trim($('#txtdnirepresentante').val()) == $.trim($('#txtdnicontacto').val())) {
                                $('#hfPPBIDEN_PIDM_CONTACTO').val(datos[0].p_PPBIDEN_PIDM);
                                $("#rescontacto").attr("class", "alert alert-success");
                                $("#rescontacto").html(datos[0].p_NOMBRE_COMPLETO);
                            }
                        }
                        exito();

                        $('#grabarModalPersonaNatural').removeClass();
                        $('#grabarModalPersonaNatural').addClass('btn blue disabled');
                        $('#grabarModalPersonaNatural').removeAttr('href');
                        $('#grabarModalPersonaNatural').attr('href', 'javascript:;');

                        $('#MuestraModal').modal('hide');
                    }
                }
            }
            else {
                noexito();
            }
        })
        .error(function () {
            Desbloquear("MuestraModal");
            alert("Error al grabar Persona Natural.");
        })
        ;

    }
    else {
        alertCustom("LA OPERACION NO SE REALIZO !<br/> INGRESE LOS CAMPOS OBLIGATORIOS!");
    }
}

function validarModalPersonaNatural() {
    var Errors = true;

    if (vErrorsNotMessage(["txtModalApePaterno", "txtModaldninatural"]) == false) {
        Errors = false;
    }

    var email = $.trim($('#txtModalemail').val());

    if (email.length > 0) {
        if (validarEmail($.trim($('#txtModalemail').val())) == false) {
            $('#txtModalemail').val('');
            if (vErrorsNotMessage("txtModalemail") == false) {
                $('#txtModalemail').val(email);
                Errors = false;
            }
        }
    }

    return Errors;
}

function CerrarModalPersonaNatural() {
    $('#MuestraModal').modal('hide');
}

//FIN MODAL------------------------------------------

//FOTO-------------------------------------------------------------

function TomaFoto() {
    $('#ModalFoto').modal('show');
}

function OcultarFoto() {
    $('#ModalFoto').modal('hide');
}




window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
    navigator.msGetUserMedia != function () {
        alert('su navegador no soporta navigator.getUserMedia().');
    };

window.datosVideo = {
    'StreamVideo': null, 'url': null
}

// jQuery('#botoniniciar').on('click', function (e) {
$('#ModalFoto').on('show', function () {

    navigator.getUserMedia({
        'audio': false,
        'video': true
    }
, function (streamVideo) {
    datosVideo.StreamVideo = streamVideo;
    datosVideo.url = window.URL.createObjectURL(streamVideo);
    jQuery('#camara').attr('src', datosVideo.url);

}, function () {
    alert('No fue posible obtener acceso a la camara.');
    //    $("#ModalFoto").modal('hide');
});
});

//   jQuery('#botondetener').on('click', function (e) {
$('#ModalFoto').on('hide', function () {

    if (datosVideo.StreamVideo) {
        datosVideo.StreamVideo.stop();
        window.URL.revokeObjectURL(datosVideo.url);
    }
});

jQuery('#botonfoto').on('click', function (e) {
    var oCamara, oFoto, oContexto, w, h;

    oCamara = jQuery('#camara');
    oFoto = jQuery('#foto');
    w = oCamara.width();
    h = oCamara.height();
    oFoto.attr({
        'width': w,
        'height': h
    });

    oContexto = oFoto[0].getContext('2d');
    oContexto.drawImage(oCamara[0], 140, 0, 400, 480, 0, 0, w, h);

});

function rptano() {


    $("#ModalFoto").modal('hide');

    $("#txtmarca").val("");
}

function rptasi() {
    var url = document.getElementById('foto').toDataURL('image/jpeg');
    $('#imgRUC').attr("src", url);
    $("#ModalFoto").modal('hide');

}

function agregarCR() {
    tipo_contacto = "A";
    //alert(tipo_contacto);
    //alert(tipo_contactoGeneral);
    agregarContacto();
}



function agregarContacto() {

    var data = new FormData;

    if (tipo_contacto == "A") {



        if (tipo_contactoGeneral == "R") {
            Bloquear('resrepresentante');
            data.append('DNICONT', $('#txtdnirepresentante').val());
        }

        if (tipo_contactoGeneral == "C") {
            Bloquear('rescontacto');
            data.append('DNICONT', $('#txtdnicontacto').val());
        }

    }

    if (tipo_contacto == "R") {
        Bloquear('resrepresentante');
        $('#agregarContacRepres').addClass('hidden')
        data.append('DNICONT', $('#txtdnirepresentante').val());
    }

    if (tipo_contacto == "C") {
        Bloquear('rescontacto');
        $('#agregarContac').css('display', 'none');
        data.append('DNICONT', $('#txtdnicontacto').val());
    }

    data.append('PIDMEMPRESA', $('#hfPPBIDEN_PIDM').val());
    data.append('P_TIPOCONTA', tipo_contacto);

    $.ajax({

        type: "POST",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=16",
        contentType: false,
        data: data,
        processData: false,
        cache: false,

        success: function (res) {

            var datos = $.parseJSON(res);

            if (datos[0].SUCCESS == "OK") {

                if (tipo_contactoGeneral == "R") {

                    //if (tipo_contactoGeneral == "R") {
                    Desbloquear('resrepresentante');
                    $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(datos[0].PIDM);
                    $("#resrepresentante").attr("class", "alert alert-success");
                    $("#resrepresentante").html(datos[0].APELL_PATE + ' ' + datos[0].APELL_MATE + ' ' + datos[0].NOMBRE);
                    exito();
                    //}
                }
                else {

                    Desbloquear('resrepresentante');
                    //$('#btnVerificarContacto').click();
                    $('#hfPPBIDEN_PIDM_CONTACTO').val(datos[0].PIDM);
                    $("#rescontacto").attr("class", "alert alert-success");
                    $("#rescontacto").html(datos[0].APELL_PATE + ' ' + datos[0].APELL_MATE + ' ' + datos[0].NOMBRE);//Mostramos el resultado en el div pidm
                    exito();
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
function cargarReprecPrincipal() {
    var resul = '';
    var vdata = null;
    Bloquear("resrepresentante");
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=19" + '&P_PERSONA=' + $('#hfPPBIDEN_PIDM').val() + '&P_TIPOCONTA=' + '1',
        contenttype: "application/json;",
        datatype: "json",
        //  async: false,
        success: function (data) {
            //alert(data.toString());

            if (data !== null) {


                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val(data[0].PIDM);
                $("#resrepresentante").removeClass();
                $("#resrepresentante").attr("class", "alert alert-success");
                $("#resrepresentante").html(data[0].CONTACTO);
                resul = 'ok';
                //alert('holaok')

            } else {
                $('#hfPPBIDEN_PIDM_REPRESENTANTE').val('');
                $("#resrepresentante").removeClass();
                $("#resrepresentante").attr("class", "alert alert-info");
                $("#resrepresentante").html('<strong>No se ha seleccionado ninguna Persona</strong>.');
                resul = 'error';
            }
        },
        error: function (msg) {
            alertCustom(msg.d);
        }
    }).done(function () {
        Desbloquear("resrepresentante");
    });
    //return resul
}


function cargarContacPrincipal() {
    var resul = '';
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMPERS.ASHX?OPCION=19" + '&P_PERSONA=' + $('#hfPPBIDEN_PIDM').val() + '&P_TIPOCONTA=' + '2',
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data !== null) {

                $('#hfPPBIDEN_PIDM_CONTACTO').val(data[0].PIDM);
                $("#rescontacto").removeClass();
                $("#rescontacto").attr("class", "alert alert-success");
                $("#rescontacto").html(data[0].CONTACTO);//Mostramos el resultado en el div pidm

                resul = 'ok';

            } else {
                $('#hfPPBIDEN_PIDM_CONTACTO').val('');
                $("#rescontacto").removeClass();
                $("#rescontacto").attr("class", "alert alert-info");
                $("#rescontacto").html('<strong>No se ha seleccionado ninguna Persona</strong>.');
                resul = 'error';
            }
        },
        error: function (msg) {
            alertCustom(msg.d);
        }
    });
    //return resul
}
//FIN FOTO ----------------------------------------------------


//DATOS SUNAT PARA INDICADOR HABIDO_IND //cliente
var DatosSunatCargados;
//var ajaxSunat = null;

//function MuestraSunat() {

//    $("#no_existe").css("display", "none").html();
//    var NRO = $("#txtrucjuridico").val();
//    Bloquear("divConsultaHabido");
//    if (ajaxSunat) {
//        ajaxSunat.abort();
//    }
//    ajaxSunat = $.ajax({
//        type: "post",
//        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=SUNAT&NRO=" + NRO,
//        contenttype: "application/json;",
//        datatype: "json",
//        async: true,
//        success: function (data) {

//            if (data == "NO_EXISTE" || data == "error") {
//                //$("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido. Se marcará como HABIDO</p>');
//                $("#no_existe").css("display", "block").html('<p>El número de <B>RUC ' + NRO + '</B> consultado no es válido.</p>');
//                $("#spanVerificando").html("-");
//                HABIDO_IND = "1";
//            } else {
//                var datos = $.parseJSON(data)

//                if (datos[0].FECHA_BAJA != "0000-00-00") {

//                    //DPORTA_RF
//                    let fecha;
//                    let mes;
//                    let anio;
//                    let dia;
//                    let fecha_baja;

//                    fecha = datos[0].FECHA_BAJA;

//                    anio = fecha.split("-")[0];
//                    mes = fecha.split("-")[1];
//                    dia = fecha.split("-")[2];

//                    fecha_baja = dia + "/" + mes + "/" + anio;

//                    $("#no_existe").css("display", "block").html('<p>El <b>RUC ' + NRO + '</b> perteneciente a <B>' + datos[0].RAZON + '</B> se encuentra en <B>' + datos[0].ESTADO + '</B> desde <B>' + fecha_baja + '</B> por SUNAT.</p>');;
//                    if (datos[0].CONDICION == "HABIDO") {
//                        HABIDO_IND = "1";
//                    } else {
//                        HABIDO_IND = "0";
//                    }
//                }
//                else {

//                    if (datos != null) {
//                        if (datos[0].CONDICION == "HABIDO") {
//                            HABIDO_IND = "1";
//                        } else {
//                            HABIDO_IND = "0";
//                        }
//                        DatosSunatCargados = datos[0];
//                    } else {
//                        $("#spanVerificando").html("-");
//                        $("#no_existe").css("display", "block").html('<p>No se encontraron datos. Se marcará como HABIDO</p>');;
//                        HABIDO_IND = "1";
//                    }
//                }
//            }

//            $("#lblEstadoSunat").html(datos[0].ESTADO);
//            $("#spanVerificando").html(datos[0].CONDICION);


//        },
//        error: function (msg) {
//            Desbloquear("divConsultaHabido");
//            if (msg.statusText != "abort") {
//                alertCustom("Consulta no se realizó correctamente");
//            }

//        }, complete: function () {
//            Desbloquear("divConsultaHabido");
//        }
//    });

//}

function MuestraSunat() {

    $("#no_existe").css("display", "none").html();
    var NRO = $("#txtrucjuridico").val();
    Bloquear("divConsultaHabido");

    var formData = new FormData();

    formData.append("token", token_migo);
    formData.append("ruc", NRO);

    var request = new XMLHttpRequest();

    request.open("POST", "https://api.migo.pe/api/v1/ruc");
    request.setRequestHeader("Accept", "application/json");

    request.send(formData);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (data.success == true) {
            //if (data.estado_del_contribuyente == "ACTIVO") {
            if (data.condicion_de_domicilio == "HABIDO") {
                HABIDO_IND = "1";
            } else {
                HABIDO_IND = "0";
            }
            DatosSunatCargados = data;
            //} else {
            //    infoCustom2("El RUC: " + NRO + " se encuentra en " + data.estado_del_contribuyente + " por SUNAT.");
            //}
            debugger;
            Desbloquear("divConsultaHabido");
            $("#lblEstadoSunat").html(data.estado_del_contribuyente);
            $("#spanVerificando").html(data.condicion_de_domicilio);
        } 
    };
}

var fnActualizarDatosContribuyente = function (pidm, cond_sunat, estado_sunat) {

    Bloquear("modal-habido");
    var data = new FormData();
    data.append('PIDM', pidm);
    data.append('sCONDI_SUNAT', cond_sunat);
    data.append('sESTADO_SUNAT', estado_sunat);

    $.ajax({
        type: "POST",
        url: "vistas/nc/ajax/ncmpers.ashx?OPCION=22",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            if (datos != null) {
                if (datos == "OK") {
                    $("#txtCondSunat").val(cond_sunat);
                    $("#txtEstaSunat").val(estado_sunat);
                    exito();
                    $('#modal-habido').modal('hide');
                } else {
                    noexito();
                }

            } else {
                noexito();
            }
            Desbloquear("modal-habido");
        },
        error: function () {
            noexito();
            Desbloquear("modal-habido");
        }

    });
};
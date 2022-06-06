var personasJuridicasHtml = '';
jsonPersonasEmpleado = null;
arrayPersonasEmpleado = new Array();

function CerrarDiagnostico(t) {
    if (vErrors(["txthorarecepcion", "txthoraentrega", "slcAlmacen", "txtnroatencion", "txtfecharecepcion", "txtfechaentrega", "txtdiagnostico", "txtrecomendacion", "txtdiagnostica", "txtestado", "txtconcepto", "txtmonto"])) {
        var opcion, code_rece, fec_diagnostico, fec_entrega, hora_diagnostico, hora_entrega, code_cotiz, autorizado, almc_code, monto_cotiz, diagnostico, recomendacion, pidm_tecnico, estado,
            concepto, monto, dcto_cliente, usua_id, pidm_cliente, cate_cliente, prod_code, des_concepto, ctlg_code, scsl_code, prod_prec_ind, prod_seriado, prod_almacenable_ind, prod_costo, fecha_dia;

        opcion = '1';

        ctlg_code = $("#slcEmpresa").val();
        scsl_code = $("#slcSucural").val();

        code_rece = $("#txtnroatencion").val();
        fec_diagnostico = $("#txtfecharecepcion").val();
        fec_entrega = $("#txtfechaentrega").val();

        hora_diagnostico = $('#txthorarecepcion').val();
        hora_entrega = $('#txthoraentrega').val();
        prod_code = $("#hfProducto").val();
        prod_prec_ind = "E";//Es el concepto //$("#hfPrecioInd").val();
        prod_seriado = "N";//Es el concepto //$("#hfProdSeriado").val();
        prod_almacenable_ind = "N";//Es el concepto //$("#hfAlmacenableInd").val();
        prod_costo = "0.00";//Es el concepto //$("#hfCosto").val();

        dcto_cliente = $("#hfDctoCliente").val();
        pidm_cliente = $("#hfPidmCliente").val();
        cate_cliente = $("#hfCateCliente").val();

        code_cotiz = $("#txtcodcotizacion").val();
        almc_code = $("#slcAlmacen").val();
        monto_cotiz = $("#txtcotizacion").val();
        diagnostico = $("#txtdiagnostico").val();
        recomendacion = $("#txtrecomendacion").val();
        pidm_tecnico = $("#txtdiagnostica").attr('valor');
        estado = $("#txtestado").val();
        concepto = $("#hfConcepto").val();
        des_concepto = $("#txtconcepto").val();
        monto = $('#txtmonto').val();
        usua_id = $('#ctl00_lblusuario').text();
        fecha_dia = $('#txt_fec_dia').val();

        est_atencion = t;

        var data = new FormData();

        data.append('OPCION', opcion);
        data.append('CTLG_CODE', ctlg_code);
        data.append('SCSL_CODE', scsl_code);
        data.append('FEC_DIAGNOSTICO', fec_diagnostico);
        data.append('FEC_ENTREGA', fec_entrega);
        data.append('HORA_DIAGNOSTICO', hora_diagnostico);
        data.append('HORA_ENTREGA', hora_entrega);
        data.append('CODE_COTIZ', code_cotiz);
        data.append('CODE_RECE', code_rece);
        data.append('ALMC_CODE', almc_code);
        data.append('MONTO_COTIZ', monto_cotiz);
        data.append('DIAGNOSTICO', diagnostico);
        data.append('RECOMENDACION', recomendacion);
        data.append('PIDM_TECNICO', pidm_tecnico);
        data.append('DCTO_CLIENTE', dcto_cliente);
        data.append('PIDM_CLIENTE', pidm_cliente);
        data.append('CATE_CLIENTE', cate_cliente);
        data.append('PROD_CODE', prod_code);
        data.append('PROD_PREC_IND', prod_prec_ind);
        data.append('PROD_SERIADO', prod_seriado);
        data.append('PROD_ALMACENABLE_IND', prod_almacenable_ind);
        data.append('PROD_COSTO', prod_costo);
        data.append('ESTADO', estado);
        data.append('CONCEPTO', concepto);
        data.append('DESC_CONCEPTO', des_concepto);
        data.append('MONTO', monto);
        data.append('USUA_ID', usua_id);
        data.append('EST_ATENCION', est_atencion);
        data.append('FECHA_DIA', fecha_dia);

        Bloquear("ventana");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMDIAG.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("ventana");
            if (res != null) {
                if (res.length == 10) {
                    exito();
                    $("#txthfCodeDiag").val(res);
                    $("#btnDiag").addClass("disabled").removeAttr("href");
                    if (t == 'D') {
                        $("#btnRepa").addClass("disabled").removeAttr("href");
                    } else {
                        location.href = '?f=NFMREPA&code=' + $("#txtnroatencion").val();
                    }
                    $("#txtfecharecepcion").attr("disabled", "disabled");
                    $("#txtfechaentrega").attr("disabled", "disabled");
                    $("#txtdiagnostico").attr("disabled", "disabled");
                    $("#txtrecomendacion").attr("disabled", "disabled");
                    $("#txtdiagnostica").attr("disabled", "disabled");
                    $("#txtestado").attr("disabled", "disabled");
                    $("#slcAlmacen").attr("disabled", "disabled");
                    $("#txtconcepto").attr("disabled", "disabled");
                    $("#txtmonto").attr("disabled", "disabled");
                    $('#btnMail').removeAttr("disabled");
                    $('#btnMail').removeClass("disabled");
                } else {
                    noexito();
                }
            } else {
                noexito();
            }
        })
        .error(function () {
            alertCustom('Ocurrio un error al Grabar Diagnóstico');
        });
    }
}

//Imprimir dctu
function ImprimirDcto() {

    //Bloquear("ventana");
    var code_rece, ctlg_code;
    code_rece = $("#txtnroatencion").val();
    ctlg_code = $("#slcEmpresa").val();

    if (code_rece != "") {
        var data = new FormData();
        data.append('CODE_RECE', code_rece);
        data.append('CTLG_CODE', ctlg_code);
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nf/ajax/nfmdiag.ashx?OPCION=IMPR",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            cache: false
        })
            .success(function (datos) {
                if (datos != null) {
                    $("#divDctoImprimir").html(datos);
                    setTimeout(function () {
                        window.print();
                    }, 200)

                } else {
                    noexito();
                }
                //Desbloquear("ventana");
            })
            .error(function () {
                //Desbloquear("ventana");
                noexito();
            });
    }
}

function listarAprobados() {
    var ctlg_code = $("#slcEmpresa").val();
    var scsl_code = $("#slcSucural").val();

    $.ajax({
        type: "post",
        url: "vistas/nf/ajax/nfmrece.ashx?opcion=5&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code,
        async: false,
        success: function (datos) {
            $('#tblDatos').html(datos);
            fillBandejaRecepcion();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function fillBandejaRecepcion() {
    var oTableExistencias = $('#tblAsignacion').dataTable();
    $('#tblAsignacion').removeAttr('style');

    $('#tblAsignacion tbody').on('click', 'tr', function () {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            oTableExistencias.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var pos = oTableExistencias.fnGetPosition(this);
            var row = oTableExistencias.fnGetData(pos);
            var code = $(this).attr("id");
            window.location.href = '?f=nfmrece&codigo=' + code;
        }
    });
}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val(); 

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();

        var data = new FormData();

        data.append('OPCION', 'SENDMAIL');
        data.append('NREMITENTE', $('#txtNRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $('#datos_correo').html());
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMDIAG.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (res) {
                exito();
                $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divMail').modal('hide'); }, 25);
            })
            .error(function () {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
                $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            });

    }
};

var NFMDIAG = function () {

    var productos = [];

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboAlmacen = function () { 
        $.ajax({
            type: "post",
            url: "vistas/nf/ajax/nfmdiag.ashx?OPCION=7&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $('#slcSucural').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcAlmacen').empty();
                $('#slcAlmacen').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcAlmacen').append('<option value="' + datos[i].CODE + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

                $('#slcAlmacen').select2('val', $('#ctl00_hddestablecimiento').val());
                //$("#slcAlmacen").change();
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });
    }

    var eventoControles = function () {

        $('#txtdiagnostico, #txtrecomendacion').bind('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) { //Enter keycode
                return false;
            }
        });

        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
                var datosUsuario = devuelveDatosUsuario(usuario)

                $('#txtAsunto').val('DIAGNÓSTICO DE PRODUCTO EN SOPORTE : ' + $('#txtnroatencion').val());
                $('#lblAsunto').text('DIAGNÓSTICO DE PRODUCTO EN SOPORTE : ' + $('#txtnroatencion').val());
                $('#lblEmpresa').text($('#slcEmpresa :selected').html());
                $('#lblRecepcion').text($("#txtfecharecepcion").val() + ' ' + $("#txthorarecepcion").val());
                $('#lblEntrega').text($("#txtfechaentrega").val() + ' ' + $("#txthoraentrega").val());
                $("#lblCliente").text($("#txtcliente").val());
                $("#lblAutorizado").text($("#txtautorizado").val());
                $("#lblProducto").text($("#txtproducto").val() + " - Serie: " + $("#txtserie").val());
                $("#lblDiagnostico").text($("#txtdiagnostico").val());
                $("#lblRecomendacion").text($("#txtrecomendacion").val());
                $("#lblTecnico").text($("#txtdiagnostica").val());
                $("#lblEstado").text($("#txtestado").val());
                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                cargarCorreos();
                $('#divMail').modal('show');

            }

        });

        $('#slcEmpresa').on('change', function() {
            ListarSucursales($('#slcEmpresa').val());
        });

        $('#slcAlmacen').on('change', function () {
            cargarConceptos();
        });

    }

    var cargarCorreos = function () {
        var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
        $.ajax({
            type: 'post',
            url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
            async: false
        }).done(function (data) {
            data = JSON.parse(data);
            for (var u in data) {
                if (data[u].usuario === $('#ctl00_txtus').val()) {
                    $('#txtRemitente').val(data[u].email);
                    break;
                }
            }
            $('#cboCorreos').selectize({
                persist: false,
                maxItems: null,
                valueField: 'email',
                labelField: 'name',
                searchField: ['name', 'email'],
                options: data,
                render: {
                    item: function (item, escape) {
                        return '<div>' +
                            (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                            (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                            '</div>';
                    },
                    option: function (item, escape) {
                        var label = item.name || item.email;
                        var caption = item.name ? item.email : null;
                        return '<div style="padding: 2px">' +
                            '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                            (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                            '</div>';
                    }
                },
                createFilter: function (input) {
                    var match, regex;
                    // email@address.com
                    regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[0]);
                    // name <email@address.com>
                    regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[2]);
                    return false;
                },
                create: function (input) {
                    if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                        return { email: input };
                    }
                    var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                    if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                    alert('Invalid email address.');
                    return false;
                }
            });
            $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
            $('.selectize-dropdown').css('margin-left', '0px');
        });
    };

    function ListarSucursales(ctlg) {
        var USUA_ID = $("#ctl00_txtus").val();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LSU&CTLG_CODE=" + ctlg + "&USUA_ID=" + USUA_ID,
            //url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '" data-almc="' + datos[i].ALMC_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function cargarConceptos() {
        $('#txtconcepto').removeAttr('disabled');
        $('#txtconcepto').val('');
        $('#hfConcepto').val('');
        $('#txtmonto').val('');

        $.ajax({
            type: "post",
            url: "vistas/nf/ajax/nfmdiag.ashx?OPCION=8&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&ALMC_CODE=" + $('#slcAlmacen').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    productos = datos;
                    // UPDATER_DESC_PROD
                    var input = $('#txtconcepto');
                    input.typeahead({
                        source: function (query, process) {
                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                obj += '{';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM +
                                       '","CODIGO":"' + datos[i].CODIGO +
                                       '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                       '","PRECIO":"' + datos[i].PRECIO + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";

                            var json = $.parseJSON(obj);
                            $.each(json, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },
                        updater: function (item) {

                            $('#hfConcepto').val(map[item].CODIGO);
                            $('#txtmonto').val(map[item].PRECIO);
                            return item;

                        },
                    });
                    input.keyup(function (e) {
                        $(this).siblings("ul").css("min-width", $(this).css("width"))
                        if ($(this).val().length <= 0) {
                            $('#hfConcepto, #txtconcepto').val('');
                            prodActual = {};
                        }
                    });
                }
            },
            error: function (msg) {
                alertCustom("Conceptos no se listaron correctamente");
            }
        });
    }

    var plugins = function () {
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        $('.combo').select2();
        $("#txtmonto").keypress(function (e) { return (ValidaDecimales(e, this)); })
        $('#txt_fec_dia').datepicker();
        $('#txt_fec_dia').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('#txt_fec_dia').datepicker("setDate", "now"); //20/02
    }

    //Parte copiada de Selwyn GLMLETR (.)
    //                                 !
    function cargarJsonEmpleado(empresa) {
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE&empresa=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,

            success: function (datos) {
                if (datos != null && datos != "") {
                    jsonPersonasEmpleado = datos;
                } else {
                    jsonPersonasEmpleado = "";
                }
            }
        });
    }

    var cargarAutocompletarEmpleados = function () {

        $.ajaxSetup({ async: false });

        $.post("vistas/GL/ajax/GLMLETR.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {

                  cargarJsonEmpleado($("#ctl00_hddctlg").val());

                  arrayPersonasEmpleado = new Array();

                  var jsonEmpleado = jQuery.parseJSON(jsonPersonasEmpleado);
                  if (jsonEmpleado != null) {
                      jsonEmpleado.filter(function (e) { if (arrayPersonasEmpleado.indexOf(e.NOMBRE) < 0) { arrayPersonasEmpleado.push(e.NOMBRE); } });
                  }

                  $(".personasEmpleado").typeahead({ source: arrayPersonasEmpleado }, { highlight: true, hint: true });

                  $(".personasEmpleado").keyup(function () {
                      $(this).siblings("ul").css("width", $(this).css("width"))

                  }).change(function () {
                      var actual = $(this);
                      var encontrado = false;
                      if (jsonEmpleado != null) {
                          jsonEmpleado.filter(function (d) {
                              if (d.NOMBRE == actual.val()) {
                                  actual.attr("valor", d.PIDM);
                                  encontrado = true;
                              }
                              if (!encontrado) {
                                  actual.removeAttr("valor");
                              }
                          });
                      }
                      if (actual.val() == "") { actual.removeAttr("valor"); }
                  });
              }
          });
    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("rece_code");

        var code_rece_diag = ObtenerQueryString("cod");
        $("#slcAlmacen").val($("#slcSucural option:selected").attr("data-almc"));
        $("#slcAlmacen").change();
        if (cod != null) {
            Bloquear('ventana');
            $.ajax({
                type: "POST",
                url: "vistas/nf/ajax/nfmrece.ASHX?OPCION=3&CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    $("#slcEmpresa").val(datos[0].CTLG_CODE);
                    $("#slcSucural").val(datos[0].SCSL_CODE);
                    $("#txtnroatencion").val(datos[0].CODE);
                    $("#txtfecharegistro").val(datos[0].FECHA_INGRESO + ' ' + datos[0].HORA_INGRESO);
                    $("#txtfecharecepcion").val(datos[0].FECHA_RECEPCION);
                    $('#txthorarecepcion').timepicker({
                        defaultTime: datos[0].HORA_RECEPCION,
                        minuteStep: 1
                    });
                    $('#txthorarecepcion').val(datos[0].HORA_RECEPCION);

                    $("#txtfechaentrega").val(datos[0].FECHA_ENTREGA);
                    $('#txthoraentrega').timepicker({
                        defaultTime: datos[0].HORA_ENTREGA,
                        minuteStep: 1
                    });
                    $('#txthoraentrega').val(datos[0].HORA_ENTREGA);

                    $("#txtcliente").val(datos[0].CLIENTE);
                    $("#txtautorizado").val(datos[0].AUTORIZADO);
                    $("#hfPidmCliente").val(datos[0].PIDM_CLIENTE);
                    $("#hfCateCliente").val(datos[0].CATE_CLIENTE);
                    $("#hfDctoCliente").val(datos[0].DCTO_CLIENTE);
                    $("#hfProducto").val(datos[0].PROD_CODE);
                    $("#hfPrecioInd").val(datos[0].PRECIO_IND);
                    $("#hfProdSeriado").val(datos[0].SERIADA);
                    $("#hfAlmacenableInd").val(datos[0].ALMACENABLE_IND);
                    $("#hfCosto").val(datos[0].COSTO);

                    if (datos[0].DCTO_CLIENTE == '1') {
                        $("#lblruc").text("DNI");
                    } else {
                        $("#lblruc").text("RUC");
                    }

                    $("#txtruc").val(datos[0].RUC);

                    $("#txtdni").val(datos[0].DNI);
                    $("#txtproducto").val(datos[0].PRODUCTO);
                    $("#txtserie").val(datos[0].SERIE);

                    if (datos[0].ESTADO == '0002') {

                        $("#txtfecharecepcion").attr("disabled", "disabled");
                        $("#txtfechaentrega").attr("disabled", "disabled");
                        $("#txtdiagnostico").attr("disabled", "disabled");
                        $("#txtrecomendacion").attr("disabled", "disabled");
                        $("#txtdiagnostica").attr("disabled", "disabled");
                        $("#txtestado").attr("disabled", "disabled");
                        $("#slcAlmacen").attr("disabled", "disabled");
                        $("#txtconcepto").attr("disabled", "disabled");
                        $("#txtmonto").attr("disabled", "disabled");
                        $("#btnDiag").addClass("disabled");
                        $("#btnRepa").addClass("disabled");

                        $("#btnDiag").removeAttr("href");
                        $("#btnRepa").removeAttr("href");

                        $('#btnMail').removeAttr("disabled");
                        $('#btnMail').removeClass("disabled");
                    }

                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alertCustom('Ocurrio un error al cargar los datos de recepción.');
                    Desbloquear('ventana');
                }
            });
        } else if (code_rece_diag != null) {
            Bloquear('ventana');
            $.ajax({
                type: "POST",
                url: "vistas/nf/ajax/nfmdiag.ASHX?OPCION=2&CODE_RECE=" + code_rece_diag,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    $("#slcEmpresa").val(datos[0].CTLG_CODE);
                    $("#slcSucural").val(datos[0].SCSL_CODE);
                    $("#txtnroatencion").val(datos[0].RECE_CODE);
                    $("#txtfecharegistro").val(datos[0].FECHA_RECEPCION);
                    $("#txtfecharecepcion").val(datos[0].FECHA_DIAGNOSTICO); 
                    $("#txtfechaentrega").val(datos[0].FECHA_ENTREGA);
                    $("#txtcliente").val(datos[0].CLIENTE);
                    $("#hfPidmCliente").val(datos[0].PIDM_CLIENTE);
                    $("#txtautorizado").val(datos[0].AUTORIZADO);
                    $("#txtruc").val(datos[0].RUC);
                    $("#txtdni").val(datos[0].DNI);
                    $("#hfProducto").val(datos[0].PROD_CODE);
                    $("#txtproducto").val(datos[0].PRODUCTO);
                    $("#txtserie").val(datos[0].SERIE);
                    $("#txtcodcotizacion").val(datos[0].CODE_COTIZACION);
                    $("#txtcotizacion").val(datos[0].MONTO_COTIZACION);
                    $("#txtdiagnostico").val(datos[0].DIAGNOSTICO);
                    $("#txtrecomendacion").val(datos[0].RECOMENDACION);
                    $("#txtdiagnostica").val(datos[0].TECNICO);
                    $("#txtestado").val(datos[0].ESTADO);
                    $("#slcAlmacen").val(datos[0].ALMC_CODE);
                    $("#slcAlmacen").change();
                    $("#txtconcepto").val(datos[0].CONCEPTO);
                    $("#txtmonto").val(datos[0].MONTO_DIAGNOSTICO);

                    $('#txthorarecepcion').timepicker({
                        defaultTime: datos[0].HORA_DIAGNOSTICO,
                        minuteStep: 1
                    });
                    $('#txthorarecepcion').val(datos[0].HORA_DIAGNOSTICO);

                    $('#txthoraentrega').timepicker({
                        defaultTime: datos[0].HORA_ENTREGA,
                        minuteStep: 1
                    });
                    $('#txthoraentrega').val(datos[0].HORA_ENTREGA);

                    $("#hfDctoCliente").val(datos[0].DCTO_CLIENTE);

                    if (datos[0].DCTO_CLIENTE == '1') {
                        $("#lblruc").text("DNI");
                    } else {
                        $("#lblruc").text("RUC");
                    }

                    $("#txtfecharecepcion").attr("disabled", "disabled");
                    $("#txtfechaentrega").attr("disabled", "disabled");
                    $("#txtdiagnostico").attr("disabled", "disabled");
                    $("#txtrecomendacion").attr("disabled", "disabled");
                    $("#txtdiagnostica").attr("disabled", "disabled");
                    $("#txtestado").attr("disabled", "disabled");
                    $("#slcAlmacen").attr("disabled", "disabled");
                    $("#txtconcepto").attr("disabled", "disabled");
                    $("#txtmonto").attr("disabled", "disabled");

                    $("#btnDiag").addClass("disabled");
                    $("#btnRepa").addClass("disabled");

                    $("#btnDiag").removeAttr("href");
                    $("#btnRepa").removeAttr("href");

                    $('#btnMail').removeAttr("disabled");
                    $('#btnMail').removeClass("disabled");

                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alertCustom('Ocurrio un error al cargar los datos de diagnóstico.');
                    Desbloquear('ventana');
                }
            });
        }

    }

    /*cargar datos, crear aspecto y eventos para la ventana modal tblmodal*/
    var cargamodal = function () {
        $("#BuscaPJ").click(function () {
            $("#divmodal").html("");
            $("#tituloModal").html("LISTA DE COTIZACIONES");
            if (personasJuridicasHtml == "") {
                obtenerDocumentos();
            }
            $("#divmodal").html(personasJuridicasHtml);

            var tablemod = $('#tblDocumento').DataTable({
                "scrollCollapse": true,
                "paging": false,
                "info": false
            });

            $('#tblDocumento tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tablemod.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                $('#txtcodcotizacion').val("");
                $('#muestralistap').modal('hide');
                var IDPER2 = $(this).attr("id");
                $('#txtcodcotizacion').val(IDPER2);
                $('#txtcotizacion').val($('#mon' + IDPER2).html());

            });


        });
    }

    var obtenerDocumentos = function () {
        var data = new FormData();

        data.append('CTLG_CODE', '');
        data.append('SCSL_CODE', '');
        data.append('DCTO_CODE', '');
        data.append('VENDEDOR', '');
        data.append('CLIENTE', '');
        data.append('PRODUCTO', '');
        data.append('ESTADO', '');
        data.append('SERIE_DCTO', '');
        data.append('NUM_DCTO', '');
        data.append('DESDE', '');
        data.append('HASTA', '');

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMDIAG.ashx?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async : false
        })
       .success(function (datos) {
           if (datos != null) {
               personasJuridicasHtml = datos;
           } else {
               noexito();
           }
       })
       .error(function () {
           noexito();
       });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            $("#slcEmpresa").change();
            fillCboAlmacen();
            cargarAutocompletarEmpleados();
            cargaInicial();
            cargamodal();
        }
    };
}();



var asincrono = true;//clientes y responsablesPago
function Crear() {
    if (vErrors(["txthorarecepcion", "txthoraentrega", "txtfecharegistro", "txtfecharecepcion", "txtfechaentrega", "txtcliente", "txtproducto", "txtrecepcionado", "txtasignado"])) {

        var opcion, ctlg_code, scsl_code, fec_registro, fec_recepcion, fec_entrega,
            hora_registro, hora_recepcion, hora_entrega, cliente, autorizado, producto,
            serie, accesorios, motivos, recepcionado, asignado, usua_id;
         
        opcion='1'; 
        ctlg_code=$('#slcEmpresa').val();
        scsl_code=$('#slcSucural').val();
        fec_registro=$('#txtfecharegistro').val();
        fec_recepcion=$('#txtfecharecepcion').val();
        fec_entrega = $('#txtfechaentrega').val();
        hora_registro = '00:00 AM'; //$('#txthoraregistro').val();
        hora_recepcion = $('#txthorarecepcion').val();
        hora_entrega = $('#txthoraentrega').val();
        cliente = $('#hfCliente').val();
        cliente_dcto = $('#txtruc :selected').attr('data-dcto');
        autorizado=$('#hfAutorizado').val();
        producto=$('#hfProducto').val();
        serie=$('#cboBuscar').val();
        accesorios=$('#txtaccesorios').val();
        motivos=$('#txtmotivos').val();
        recepcionado = $('#txtrecepcionado').attr('valor');
        asignado = $('#txtasignado').attr('valor');
        usua_id=$('#ctl00_lblusuario').text();

        var data = new FormData();

        data.append('OPCION', opcion);
        data.append('CTLG_CODE', ctlg_code);
        data.append('SCSL_CODE', scsl_code);
        data.append('FEC_REGISTRO', fec_registro);
        data.append('FEC_RECEPCION', fec_recepcion);
        data.append('FEC_ENTREGA', fec_entrega);
        data.append('HORA_REGISTRO', hora_registro);
        data.append('HORA_RECEPCION', hora_recepcion);
        data.append('HORA_ENTREGA', hora_entrega);
        data.append('CLIENTE', cliente);
        data.append('CLIENTE_DCTO', cliente_dcto);
        data.append('AUTORIZADO', autorizado);
        data.append('PRODUCTO', producto);
        data.append('SERIE', serie);
        data.append('ACCESORIOS', accesorios);
        data.append('MOTIVOS', motivos);
        data.append('RECEPCION', recepcionado);
        data.append('ASIGNADO', asignado);
        data.append('USUA_ID', usua_id);

        Bloquear("ventana");
            
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
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
                    $("#txtnroatencion").val(res);
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    $("#btnDiag").attr("href", "javascript:Diagnostico();");
                    $("#btnDiag").removeAttr("disabled");
                    $('#btnDiag').removeClass("disabled");

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
            alertCustom('Ocurrio un error al Grabar Recepción');
        });
    }
}

function Diagnostico() {
    var code = $("#txtnroatencion").val();
    //Actualizar2();//cambia a estado de diagnóstico
    location.href = '?f=nfmdiag&rece_code=' + code;
}

function Actualizar() {
    if (vErrors(["txthorarecepcion", "txthoraentrega", "txtfecharegistro", "txtfecharecepcion", "txtfechaentrega", "txtcliente", "txtproducto", "txtrecepcionado", "txtasignado"])) {

        var opcion, code, ctlg_code, scsl_code, fec_registro, fec_recepcion, fec_entrega,
            hora_registro, hora_recepcion, hora_entrega, cliente, autorizado, producto,
            serie, accesorios, motivos, recepcionado, asignado, usua_id;

        opcion = '2';
        code = $("#txtnroatencion").val();
        ctlg_code = $('#slcEmpresa').val();
        scsl_code = $('#slcSucural').val();
        fec_registro = $('#txtfecharegistro').val();
        fec_recepcion = $('#txtfecharecepcion').val();
        fec_entrega = $('#txtfechaentrega').val();
        hora_registro = '00:00 AM';  //$('#txthoraregistro').val();
        hora_recepcion = $('#txthorarecepcion').val();
        hora_entrega = $('#txthoraentrega').val();
        cliente = $('#hfCliente').val();
        cliente_dcto = $('#txtruc :selected').attr('data-dcto');
        autorizado = $('#hfAutorizado').val();
        producto = $('#hfProducto').val();
        serie = $('#cboBuscar').val();
        accesorios = $('#txtaccesorios').val();
        motivos = $('#txtmotivos').val();
        recepcionado = $('#txtrecepcionado').attr('valor');
        asignado = $('#txtasignado').attr('valor');
        usua_id = $('#ctl00_lblusuario').text();

        var data = new FormData();

        data.append('OPCION', opcion);
        data.append('CODE', code);
        data.append('CTLG_CODE', ctlg_code);
        data.append('SCSL_CODE', scsl_code);
        data.append('FEC_REGISTRO', fec_registro);
        data.append('FEC_RECEPCION', fec_recepcion);
        data.append('FEC_ENTREGA', fec_entrega);
        data.append('HORA_REGISTRO', hora_registro);
        data.append('HORA_RECEPCION', hora_recepcion);
        data.append('HORA_ENTREGA', hora_entrega);
        data.append('CLIENTE', cliente);
        data.append('CLIENTE_DCTO', cliente_dcto);
        data.append('AUTORIZADO', autorizado);
        data.append('PRODUCTO', producto);
        data.append('SERIE', serie);
        data.append('ACCESORIOS', accesorios);
        data.append('MOTIVOS', motivos);
        data.append('RECEPCION', recepcionado);
        data.append('ASIGNADO', asignado);
        data.append('USUA_ID', usua_id);

        Bloquear("ventana");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("ventana");
            if (res != null) {
                if (res == 'OK') {
                    exito();
                } else {
                    noexito();
                }
            } else {
                noexito();
            }
        })
        .error(function () {
            alertCustom('Ocurrio un error al Actualizar Recepción');
        });
    }
}

//Imprimir dctu
function ImprimirDcto() {

    //Bloquear("ventana");
    var code;
    code = $("#txtnroatencion").val();

    if (code != "") {
        var data = new FormData();
        data.append('CODE', code);
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nf/ajax/nfmrece.ashx?OPCION=IMPR",
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

//function Actualizar2() { //cuando se pasa a diagnóstico
//    if (vErrors(["txthorarecepcion", "txthoraentrega", "txtfecharegistro", "txtfecharecepcion", "txtfechaentrega", "txtcliente", "txtproducto", "txtrecepcionado", "txtasignado"])) {

//        var opcion, code, ctlg_code, scsl_code, fec_registro, fec_recepcion, fec_entrega,
//            hora_registro, hora_recepcion, hora_entrega, cliente, autorizado, producto,
//            serie, accesorios, motivos, recepcionado, asignado, usua_id;

//        opcion = '2';
//        code = $("#txtnroatencion").val();
//        ctlg_code = $('#slcEmpresa').val();
//        scsl_code = $('#slcSucural').val();
//        fec_registro = $('#txtfecharegistro').val();
//        fec_recepcion = $('#txtfecharecepcion').val();
//        fec_entrega = $('#txtfechaentrega').val();
//        hora_registro = '0002'; // que cambie de estado a diagnóstico
//        hora_recepcion = $('#txthorarecepcion').val();
//        hora_entrega = $('#txthoraentrega').val();
//        cliente = $('#hfCliente').val();
//        cliente_dcto = $('#txtruc :selected').attr('data-dcto');
//        autorizado = $('#hfAutorizado').val();
//        producto = $('#hfProducto').val();
//        serie = $('#cboBuscar').val();
//        accesorios = $('#txtaccesorios').val();
//        motivos = $('#txtmotivos').val();
//        recepcionado = $('#txtrecepcionado').attr('valor');
//        asignado = $('#txtasignado').attr('valor');
//        usua_id = $('#ctl00_lblusuario').text();

//        var data = new FormData();

//        data.append('OPCION', opcion);
//        data.append('CODE', code);
//        data.append('CTLG_CODE', ctlg_code);
//        data.append('SCSL_CODE', scsl_code);
//        data.append('FEC_REGISTRO', fec_registro);
//        data.append('FEC_RECEPCION', fec_recepcion);
//        data.append('FEC_ENTREGA', fec_entrega);
//        data.append('HORA_REGISTRO', hora_registro); //que cambie de estado a diagnóstico
//        data.append('HORA_RECEPCION', hora_recepcion);
//        data.append('HORA_ENTREGA', hora_entrega);
//        data.append('CLIENTE', cliente);
//        data.append('CLIENTE_DCTO', cliente_dcto);
//        data.append('AUTORIZADO', autorizado);
//        data.append('PRODUCTO', producto);
//        data.append('SERIE', serie);
//        data.append('ACCESORIOS', accesorios);
//        data.append('MOTIVOS', motivos);
//        data.append('RECEPCION', recepcionado);
//        data.append('ASIGNADO', asignado);
//        data.append('USUA_ID', usua_id);

//        Bloquear("ventana");

//        var jqxhr = $.ajax({
//            type: "POST",
//            url: "vistas/NF/ajax/NFMRECE.ASHX",
//            contentType: false,
//            data: data,
//            processData: false,
//            cache: false
//        })
//            .success(function (res) {
//                Desbloquear("ventana");
//                if (res != null) {
//                    if (res == 'OK') {
//                        exito();
//                    } else {
//                        noexito();
//                    }
//                } else {
//                    noexito();
//                }
//            })
//            .error(function () {
//                alertCustom('Ocurrio un error al Actualizar Recepción');
//            });
//    }
//}

function listarAprobados(estado) {
    var ctlg_code = $("#slcEmpresa").val();
    var scsl_code = $("#slcSucural").val();

    $.ajax({
        type: "post",
        url: "vistas/nf/ajax/nfmrece.ashx?opcion=5&ctlg_code=" + ctlg_code + "&scsl_code=" + scsl_code + "&ESTADITO=" + estado,
        async: false,
        success: function (datos) {
            $('#tblDatos').html(datos);
            fillBandejaRecepcion();
        },
        error: function (msg) {
            alertCustom('Ocurrio un error al cargar los datos.');
        }
    });
}

function fillBandejaRecepcion() {
    var oTableExistencias = $('#tblAsignacion').dataTable();
    $('#tblAsignacion').removeAttr('style');

    //$('#tblAsignacion tbody').on('click', 'tr', function () {

    //    if ($(this).hasClass('selected')) {
    //        $(this).removeClass('selected');
    //    }
    //    else {
    //        oTableExistencias.$('tr.selected').removeClass('selected');
    //        $(this).addClass('selected');

    //        var pos = oTableExistencias.fnGetPosition(this);
    //        var row = oTableExistencias.fnGetData(pos);
    //        var code = $(this).attr("id");
    //        window.location.href = '?f=nfmrece&codigo=' + code;
    //    }
    //});
}

function limpiarCliente() {
    $("#txtcliente").val('');
    $("#hfCliente").val('');
    $("#txtruc").html('<option></option>')
    $("#txtruc").val('');
    $("#txtruc").change();
    $("#txtcliente").focus();
    $("#txtTelefono").val('');
}

function cargarClientes() {
    limpiarCliente();
    filltxtrazsocial_clientes2("#txtcliente", "");
}

function cargarProductos() {
    limpiarProducto();
    filltxtdescproducto2('');
}

function guardarTelef() {
    let telefonoClie = $("#txtTelefono").val();
    let cliente = $("#hfCliente").val();
    let usua_id = $('#ctl00_lblusuario').text();
    if (telefonoClie.length == 9 && cliente != "") {
        var data = new FormData();

        data.append('OPCION', "TELEF");
        data.append('TELEFONO_CLIE', telefonoClie);
        data.append('CLIENTE', cliente);
        data.append('USUA_ID', usua_id);

        Bloquear("ventana");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (res) {
                Desbloquear("ventana");
                if (res != null) {
                    if (res == "OK") {
                        exito();

                    } else {
                        noexito();
                    }
                } else {
                    noexito();
                }
            })
            .error(function () {
                alertCustom('Ocurrio un error al Grabar el Número Telefónico');
            });
    } else {
        infoCustom2("El número telefónico no es correcto!")
    }
} 

function limpiarAutorizado() {
    $("#txtautorizado").val('');
    $("#hfAutorizado").val('');
    $("#txtdni").val('');
    $("#txtautorizado").focus();
}

function limpiarProducto() {
    $("#txtproducto").val('');
    $("#hfProducto").val('');
    $("#txtgarantia").val('');
    $("#cboBuscar").html('<option></option>')
    $("#cboBuscar").val('');
    $("#cboBuscar").change();
    $("#txtproducto").focus();
}

function ingresarSerie() {
    if ($("#hfProducto").val() == '') {
        alertCustom('Debe seleccionar un producto.');
        $("#txtproducto").focus();
    } else {
        if ($("#hfProdSeriado").val() == 'S') {
            $("#descProducto").text($("#txtproducto").val());
            $("#divseries").modal('show');
        } else {
            alertCustom('No se puede agregar serie, el producto no es seriado.');
        }
    }
}

function crearSerie() {
    if (vErrors(["slcAlmacen", "txtNserie"])) {

        var opcion, ctlg_code, scsl_code, fec_registro, producto, almc_code,
            serie, usua_id;

        opcion = '7';
        ctlg_code = $('#slcEmpresa').val();
        scsl_code = $('#slcSucural').val();
        fec_registro = $('#txtfecharegistro').val();
        producto = $('#hfProducto').val();
        almc_code = $('#slcAlmacen').val();
        serie = $('#txtNserie').val();
        usua_id = $('#ctl00_lblusuario').text();

        var data = new FormData();

        data.append('OPCION', opcion);
        data.append('CTLG_CODE', ctlg_code);
        data.append('SCSL_CODE', scsl_code);
        data.append('FEC_REGISTRO', fec_registro);
        data.append('PRODUCTO', producto);
        data.append('SERIE', serie);
        data.append('ALMC_CODE', almc_code);
        data.append('USUA_ID', usua_id);

        Bloquear("divseries");

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            Desbloquear("divseries");
            if (res != null) {
                if (res.length == 8) {
                    exito();
                    var serie = $("#txtNserie").val();
                    $("#cboBuscar").append("<option value='" + serie + "'>" + serie + "</option>");
                    $("#cboBuscar").val(serie);
                    $("#cboBuscar").change();
                    $("#txtNserie").val('');
                    $("#divseries").modal('hide');

                } else {
                    noexito();
                }
            } else {
                noexito();
            }
        })
        .error(function () {
            alertCustom('Ocurrio un error al Grabar la Serie');
        });
    }
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
            url: "vistas/NF/ajax/NFMRECE.ASHX",
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

var NFMRECE = function () {

    jsonPersonasEmpleado = null;
    arrayPersonasEmpleado = new Array();
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
                alertCustom('Ocurrio un error al cargar las Empresas.');
            }
        });
    }

    var fillCboAlmacen = function () {
        //$.ajax({
        //    type: "post",
        //    url: "vistas/nf/ajax/nfmdiag.ashx?OPCION=7&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $('#slcSucural').val(),
        //    contenttype: "application/json;",
        //    datatype: "json",
        //    async: false,
        //    success: function (datos) {
        //        $('#slcAlmacen').empty();
        //        $('#slcAlmacen').append('<option></option>');
        //        if (datos != null) {

        //            for (var i = 0; i < datos.length; i++) {

        //                $('#slcAlmacen').append('<option value="' + datos[i].CODE + '">' + datos[i].DESCRIPCION + '</option>');
        //            }
        //        }
        //    },
        //    error: function (msg) {
        //        alertCustom('Ocurrio un error al cargar los Almacenes.');
        //    }
        //});
        $('#slcAlmacen').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + $('#slcEmpresa').val() + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcAlmacen').html('');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcAlmacen').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#slcAlmacen').select2('val', $('#ctl00_hddestablecimiento').val());
                //$("#cboAlmacen").change();
            },
            error: function (msg) {
                alertCustom('Ocurrió un error al listar almacenes.');
            }
        });
        $('#slcAlmacen').select2();
    }

    var eventoControles = function () {

        $('#txtaccesorios, #txtmotivos').bind('keypress', function (e) {
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

                $('#txtAsunto').val('RECEPCIÓN DE PRODUCTO EN SOPORTE : '+ $('#txtnroatencion').val());
                $('#lblAsunto').text('RECEPCIÓN DE PRODUCTO EN SOPORTE : ' + $('#txtnroatencion').val());
                $('#lblEmpresa').text($('#slcEmpresa :selected').html());
                $('#lblRegistro').text($("#txtfecharegistro").val() + ' ' + $("#txthoraregistro").val());
                $('#lblRecepcion').text($("#txtfecharecepcion").val() + ' ' + $("#txthorarecepcion").val());
                $('#lblEntrega').text($("#txtfechaentrega").val() + ' ' + $("#txthoraentrega").val());
                $("#lblCliente").text($("#txtcliente").val());
                $("#lblAutorizado").text($("#txtautorizado").val());
                $("#lblProducto").text($("#txtproducto").val() + " - Serie: " + $("#cboBuscar :selected").html());
                $("#lblAccesorios").text($("#txtaccesorios").val());
                $("#lblMotivos").text($("#txtmotivos").val());
                $("#lblRecepcionado").text($("#txtrecepcionado").val());
                $("#lblAsignado").text($("#txtasignado").val());
                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                cargarCorreos();
                $('#divMail').modal('show');
            }

        });

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
            fillCboAlmacen();
            filltxtrazsocial_clientes("#txtcliente","");
        });

        $('#cboBuscar').on('change', function () {
            if ($(this).val().length > 0) {
                var garantia = $('#cboBuscar :selected').attr('data-garantia');
                $("#txtgarantia").val(garantia);
            }
        });
        $('#slcSucural').on('change', function () {
            $("#slcAlmacen").val($("#slcSucural option:selected").attr("data-almc"));
            $("#slcAlmacen").change();
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
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
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
                alertCustom('Ocurrio un error al cargar los Establecimientos.');
            }
        });
    }

    //Llenar productos (Copiada de maiky NVMDOVR)

    var plugins = function () {
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
        $('.combo').select2();
        $("#txtTelefono").focus(function () {
            $('#txtTelefono').inputmask({ "mask": "T", "repeat": 9, "greedy": false });
        });
    }
    


    //Parte copiada de Selwyn GLMLETR (.)
    //                                 !
    function cargarJsonEmpleado(empresa) {
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE-2&empresa=" + empresa,
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
        var cod = ObtenerQueryString("codigo");
        //PARA QUE CARGUE POR DEFECTO LA HORA DEL SISTEMA
        $('#txthorarecepcion').val("00:00 AM");
        $('#txthoraentrega').val("00:00 AM");

        if (cod != null) {
            Bloquear('ventana');
            $.ajax({
                type: "POST",
                url: "vistas/nf/ajax/nfmrece.ASHX?OPCION=3&CODE=" + cod,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");

                    $("#slcEmpresa").val(datos[0].CTLG_CODE);
                    $("#slcSucural").val(datos[0].SCSL_CODE);
                    $("#txtnroatencion").val(datos[0].CODE);
                    $("#txtfecharegistro").val(datos[0].FECHA_INGRESO);
                    $("#txtfecharecepcion").val(datos[0].FECHA_RECEPCION);
                    $("#txtfechaentrega").val(datos[0].FECHA_ENTREGA);
                    $("#txtTelefono").val(datos[0].TELEFONO_CLIE);
                    $('#txthoraregistro').timepicker({
                        defaultTime: datos[0].HORA_INGRESO,
                        minuteStep: 1
                    });
                    $('#txthoraregistro').val(datos[0].HORA_INGRESO);

                    $('#txthorarecepcion').timepicker({
                        defaultTime: datos[0].HORA_RECEPCION,
                        minuteStep: 1
                    });
                    $('#txthorarecepcion').val(datos[0].HORA_RECEPCION);

                    $('#txthoraentrega').timepicker({
                        defaultTime: datos[0].HORA_ENTREGA,
                        minuteStep: 1
                    });
                    $('#txthoraentrega').val(datos[0].HORA_ENTREGA);

                    $("#txtcliente").val(datos[0].CLIENTE);
                    $("#hfCliente").val(datos[0].PIDM_CLIENTE);
                    $("#txtautorizado").val(datos[0].AUTORIZADO);
                    $("#hfAutorizado").val(datos[0].PIDM_AUTORIZADO);

                    $("#txtruc").append('<option data-dcto="' + datos[0].DCTO_CLIENTE + '" value="' + datos[0].RUC + '" >' + datos[0].RUC + '</option>');
                    $("#txtruc").val(datos[0].RUC);
                    $("#txtruc").change();

                    $("#txtdni").val(datos[0].DNI);
                    $("#txtproducto").val(datos[0].PRODUCTO);
                    $("#hfProducto").val(datos[0].PROD_CODE);

                    cargarSeries();
                    $("#cboBuscar").val(datos[0].SERIE);
                    $("#cboBuscar").change();

                    $("#txtaccesorios").val(datos[0].ACCESORIOS);
                    $("#txtmotivos").val(datos[0].MOTIVOS);
                    $("#txtrecepcionado").val(datos[0].RECEPCIONADO);
                    $("#txtrecepcionado").attr('valor', datos[0].PIDM_RECEPCIONADO);
                    $("#txtasignado").val(datos[0].ASIGNADO);
                    $("#txtasignado").attr('valor', datos[0].PIDM_ASIGNADO);
                    
                    $('#btnMail').removeAttr("disabled");
                    $('#btnMail').removeClass("disabled");

                    if (datos[0].ESTADO == '0001') {
                        $("#btnDiag").attr("href", "javascript:Diagnostico();");
                        $("#btnDiag").removeClass("disabled");
                    } else {
                        $("#btnDiag").attr("href", "#");
                        $("#btnDiag").addClass("disabled");
                        $("#down1,#down2,#down3").attr("style", "display:none");
                        $("#grabar").attr("href", "#");
                        $("#grabar").addClass("disabled", "disabled");
                        $("#slcEmpresa,#slcSucural").attr("disabled", "disabled");
                        $("#txtcliente,#txtruc,#txtTelefono").attr("disabled", "disabled");
                        $("#txtautorizado,#txtdni").attr("disabled", "disabled");
                        $("#txtproducto,#cboBuscar").attr("disabled", "disabled");
                        $("#txtaccesorios,#txtmotivos").attr("disabled", "disabled");
                        $("#txtrecepcionado,#txtasignado").attr("disabled", "disabled");
                    }

                    Desbloquear('ventana');
                },
                error: function (msg) {
                    alertCustom('Ocurrio un problema al cargar los datos.');
                    Desbloquear('ventana');
                }
            });
        }
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            $("#slcEmpresa").change();
            fillCboAlmacen();
            //filltxtrazsocial_clientes("#txtcliente", "");
            filltxtrazsocial_autorizado("#txtautorizado", "");
            cargarAutocompletarEmpleados();
            filltxtdescproducto('');
            cargaInicial();
        }
    };
}();

function solonumbef(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = '0123456789';//Caracteres validos
    for (var i = 0; i < string.length; i++) {
        if (filtro.indexOf(string.charAt(i)) != -1) {
            out += string.charAt(i);
        }
    }
    //Corta la cadena y toma la parte decimal
    var arr = out.split(".");
    //Toma la longitud de la cadena y si es 3, entonces es porque ingresaron otro "."
    var long = arr.length;
    //Si es asi, entonces corta la cadena uno anterior
    if (long == 3) {
        return out.substring(0, out.length - 1);
    }

    var arrDecimal = arr[1];

    //Si es menor o igual al valor del parámetro, entonces muestra el número digitado con normalidad. 
    if (typeof arrDecimal != "undefined") {
        if (arrDecimal.length <= 4) {
            return out;
        }
        //Si es mayor al valor del parámetro entonces corta la cadena longitud de la cadena - 1, para que quite el último digito ingresado.
        return out.substring(0, out.length - 1);
    }

    return out;
}

function filltxtrazsocial_clientes(v_ID, v_value) {
    $("#divTxtClientes").html('<input id="txtcliente" class="span12 m-wrap" type="text" placeholder="Digite apellidos o nombres para seleccionar."/>');
    var selectRazonSocial = $(v_ID);
    //if (asincrono == true) {
    //    Bloquear("divTxtClientes");
    //}
    $.ajax({
        type: "post",
        url: "vistas/nf/ajax/nfmrece.ashx?OPCION=4&ctlg_code=" + $("#slcEmpresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: asincrono,
        success: function (datos) {
            //if (asincrono == true) {
            //    Desbloquear("divTxtClientes");
            //}
            if (datos != null) {
                textclientes = selectRazonSocial.typeahead({
                    items: 20,
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        let oObjet = new Array();
                        console.log(v_value);
                        for (var i = 0; i < datos.length; i++) {

                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            var obj = {};
                            obj.DNI = datos[i].DNI;
                            obj.RUC = datos[i].RUC;
                            obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                            obj.TIPO_DOC = datos[i].TIPO_DOC;
                            obj.DIRECCION = datos[i].DIRECCION;
                            obj.PIDM = datos[i].PIDM;
                            obj.TELEFONO_CLIE = datos[i].TELEFONO;

                            if (v_value == obj.PIDM) {
                                jsonPredeterminado = obj;
                            }
                            oObjet.push(obj);
                        }
                        jsonClientes = oObjet;
                        $.each(oObjet, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });
                        process(arrayRazonSocial);

                    },
                    updater: function (item) {

                        $("#hfCliente").val(map[item].PIDM);
                        $("#txtTelefono").val(map[item].TELEFONO_CLIE);
                        //let telef = map[item].TELEFONO; 
                        //if (telef.length >= 6) {
                        //    $("#txtTelefono").attr("disabled", true);
                        //} else {
                        //    $("#txtTelefono").attr("disabled", false);
                        //}
                        $("#txtruc").html('<option></option>')
                        $("#txtruc").val('');
                        $("#txtruc").change();
                        //DPORTA 19/03
                        if (map[item].RUC != "") {
                            $("#txtruc").append("<option data-dcto='6' value='" + map[item].RUC + "'>RUC: " + map[item].RUC + "</option");
                        }
                        if (map[item].DNI != "") {
                            if (map[item].TIPO_DOC == "6") {
                                $("#txtruc").append("<option data-dcto='6' value='" + map[item].DNI + "'>RUC: " + map[item].DNI + "</option");
                            } else if (map[item].TIPO_DOC == "7") {
                                $("#txtruc").append("<option data-dcto='7' value='" + map[item].DNI + "'>PASAPORTE: " + map[item].DNI + "</option");
                            } else if (map[item].TIPO_DOC == "4") {
                                $("#txtruc").append("<option data-dcto='4' value='" + map[item].DNI + "'>CARNÉ EXTRAN: " + map[item].DNI + "</option");
                            } else if (map[item].TIPO_DOC == "0") {
                                $("#txtruc").append("<option data-dcto='0' value='" + map[item].DNI + "'>OTROS: " + map[item].DNI + "</option");
                            } else {
                                $("#txtruc").append("<option data-dcto='1' value='" + map[item].DNI + "'>DNI: " + map[item].DNI + "</option");
                            }
                        }
                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))

                    if (selectRazonSocial.val() == '') {
                        $("#hfCliente").val('');
                        $("#txtTelefono").val('');
                        $("#txtruc").html('<option></option>')
                        $("#txtruc").val('');
                        $("#txtruc").change();
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }

        },
        error: function (msg) {
            alertCustom("Clientes no se listaron correctamente");
            //Desbloquear("divTxtClientes");
        }
    });
}

function filltxtrazsocial_clientes2(v_ID, v_value) {
    $("#divTxtClientes").html('<input id="txtcliente" class="span12 m-wrap" type="text" placeholder="Digite apellidos o nombres para seleccionar."/>');
    var selectRazonSocial = $(v_ID);
    if (asincrono == true) {
        Bloquear("divTxtClientes");
    }
    $.ajax({
        type: "post",
        url: "vistas/nf/ajax/nfmrece.ashx?OPCION=4&ctlg_code=" + $("#slcEmpresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: asincrono,
        success: function (datos) {
            if (asincrono == true) {
                Desbloquear("divTxtClientes");
            }
            if (datos != null) {
                textclientes = selectRazonSocial.typeahead({
                    items: 20,
                    source: function (query, process) {
                        arrayRazonSocial = [];
                        map = {};
                        let oObjet = new Array();
                        console.log(v_value);
                        for (var i = 0; i < datos.length; i++) {

                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            var obj = {};
                            obj.DNI = datos[i].DNI;
                            obj.RUC = datos[i].RUC;
                            obj.RAZON_SOCIAL = datos[i].RAZON_SOCIAL;
                            obj.TIPO_DOC = datos[i].TIPO_DOC;
                            obj.DIRECCION = datos[i].DIRECCION;
                            obj.PIDM = datos[i].PIDM;
                            obj.TELEFONO_CLIE = datos[i].TELEFONO;

                            if (v_value == obj.PIDM) {
                                jsonPredeterminado = obj;
                            }
                            oObjet.push(obj);


                        }
                        jsonClientes = oObjet;
                        $.each(oObjet, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });
                        process(arrayRazonSocial);

                    },
                    updater: function (item) {

                        $("#hfCliente").val(map[item].PIDM);
                        $("#txtTelefono").val(map[item].TELEFONO_CLIE);
                        //let telef = map[item].TELEFONO;
                        //if (telef.length >= 6) {
                        //    $("#txtTelefono").attr("disabled", true);
                        //} else {
                        //    $("#txtTelefono").attr("disabled", false);
                        //}
                        $("#txtruc").html('<option></option>')
                        $("#txtruc").val('');
                        $("#txtruc").change();
                        //DPORTA 19/03
                        if (map[item].RUC != "") {
                            $("#txtruc").append("<option data-dcto='6' value='" + map[item].RUC + "'>RUC: " + map[item].RUC + "</option");
                        }
                        if (map[item].DNI != "") {
                            if (map[item].TIPO_DOC == "6") {
                                $("#txtruc").append("<option data-dcto='6' value='" + map[item].DNI + "'>RUC: " + map[item].DNI + "</option");
                            } else if (map[item].TIPO_DOC == "7") {
                                $("#txtruc").append("<option data-dcto='7' value='" + map[item].DNI + "'>PASAPORTE: " + map[item].DNI + "</option");
                            } else if (map[item].TIPO_DOC == "4") {
                                $("#txtruc").append("<option data-dcto='4' value='" + map[item].DNI + "'>CARNÉ EXTRAN: " + map[item].DNI + "</option");
                            } else if (map[item].TIPO_DOC == "0") {
                                $("#txtruc").append("<option data-dcto='0' value='" + map[item].DNI + "'>OTROS: " + map[item].DNI + "</option");
                            } else {
                                $("#txtruc").append("<option data-dcto='1' value='" + map[item].DNI + "'>DNI: " + map[item].DNI + "</option");
                            }
                        }
                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))

                    if (selectRazonSocial.val() == '') {
                        $("#hfCliente").val('');
                        $("#txtTelefono").val('');
                        $("#txtruc").html('<option></option>')
                        $("#txtruc").val('');
                        $("#txtruc").change();
                    }
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }

        },
        error: function (msg) {
            alertCustom("Clientes no se listaron correctamente");
            Desbloquear("divTxtClientes");
        }
    });
}

function filltxtrazsocial_autorizado(v_ID, v_value) {
    var selectBeneficiario = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/nf/ajax/nfmrece.ashx?OPCION=6",
        cache: false,
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null && datos !== '') {
                selectBeneficiario.typeahead({
                    source: function (query, process) {
                        arrayProveedores = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayProveedores.push(datos[i].PERSONA);
                            obj += '{';
                            obj += '"DNI":"' + datos[i].DNI + '","PERSONA":"' + datos[i].PERSONA + '","PIDM":"' + datos[i].PIDM + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.PERSONA] = objeto;
                        });
                        process(arrayProveedores);
                        Desbloquear("ventana");
                    },
                    updater: function (item) {
                        $("#hfAutorizado").val(map[item].PIDM);
                        $("#txtdni").val(map[item].DNI);
                        return item;
                    },
                });


            }
            if (datos != null && $.trim(v_value).length > 0) {
                arrayProveedores.val(v_value);
                Desbloquear("ventana");
            }
            Desbloquear("ventana");
        },
        error: function (msg) {
            alertCustom('Error al intentar consultar proveedores.');
            Desbloquear("ventana");
        }
    });

    selectBeneficiario.keyup(function () {
        $(this).siblings("ul").css("width", $(this).css("width"));

        if (selectBeneficiario.val() == '') {
            $("#hfAutorizado").val('');
            $("#txtdni").val('');
        }
    });

}

function filltxtdescproducto(seriado) {
    //$('#input_cod_prod').html('<input id="txt_cod_producto" disabled="disabled" class="span6" type="text" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span6" type="text" style="margin-left:-2px;" placeholder="Código"/>');
    $("#input_desc_prod").html("<input id='txtproducto' class='span12 m-wrap' type='text' placeholder='Digite nombre de producto para seleccionar.' />");
    //Bloquear("input_desc_prod");
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#slcEmpresa').val() + "&SCSL=" + $('#slcSucural').val() + "&SERIADO_IND=" + seriado,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            //Desbloquear("input_desc_prod");
            if (datos != null) {
                productos = datos;
                // UPDATER_DESC_PROD
                var input = $('#txtproducto');
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
                                   '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                   '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                   '","NO_SERIADA":"' + datos[i].NO_SERIADA +
                                   '","SERIADO":"' + datos[i].SERIADO + '"';
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

                        $("#hfProducto").val(map[item].CODIGO);
                        $("#hfProdSeriado").val(map[item].SERIADO);
                        //prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                        //DPORTA 19/03
                        $("#cboBuscar").html('<option></option>')
                        $("#cboBuscar").val('');
                        $("#cboBuscar").change();

                        cargarSeries();

                        //CamposProductosSeriados();
                        return item;

                    },
                });
                input.keyup(function (e) {
                    $(this).siblings("ul").css("min-width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        //DPORTA 19 / 03
                        $('#hfProducto, #txtproducto, #hfProdSeriado, #txtgarantia').val('');
                        $("#cboBuscar").html('<option></option>')
                        $("#cboBuscar").val('');
                        $("#cboBuscar").change();
                        //prodActual = {};
                    }
                });
            }
        },
        error: function (msg) {
            alertCustom("Productos no se listaron correctamente");
            //Desbloquear("input_desc_prod");
        }
    });
}

function filltxtdescproducto2(seriado) {
    //$('#input_cod_prod').html('<input id="txt_cod_producto" disabled="disabled" class="span6" type="text" style="margin-right: 4px" /><input id="txt_cod_a_producto" class="span6" type="text" style="margin-left:-2px;" placeholder="Código"/>');
    $("#input_desc_prod").html("<input id='txtproducto' class='span12 m-wrap' type='text' placeholder='Digite nombre de producto para seleccionar.' />");
    Bloquear("input_desc_prod");
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#slcEmpresa').val() + "&SCSL=" + $('#slcSucural').val() + "&SERIADO_IND=" + seriado,
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            Desbloquear("input_desc_prod");
            if (datos != null) {
                productos = datos;
                // UPDATER_DESC_PROD
                var input = $('#txtproducto');
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
                                '","NOMBRE_COMERCIAL":"' + datos[i].NOMBRE_COMERCIAL +
                                '","CODIGO_ANTIGUO": "' + datos[i].CODIGO_ANTIGUO +
                                '","NO_SERIADA":"' + datos[i].NO_SERIADA +
                                '","SERIADO":"' + datos[i].SERIADO + '"';
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

                        $("#hfProducto").val(map[item].CODIGO);
                        $("#hfProdSeriado").val(map[item].SERIADO);
                        //prodActual = ObtenerProductoCompleto(map[item].CODIGO, $("#hfPIDM").val());
                        //DPORTA 19/03
                        $("#cboBuscar").html('<option></option>')
                        $("#cboBuscar").val('');
                        $("#cboBuscar").change();

                        cargarSeries();

                        //CamposProductosSeriados();
                        return item;

                    },
                });
                input.keyup(function (e) {
                    $(this).siblings("ul").css("min-width", $(this).css("width"))
                    if ($(this).val().length <= 0) {
                        //DPORTA 19 / 03
                        $('#hfProducto, #txtproducto, #hfProdSeriado, #txtgarantia').val('');
                        $("#cboBuscar").html('<option></option>')
                        $("#cboBuscar").val('');
                        $("#cboBuscar").change();
                        //prodActual = {};
                    }
                });
            }
        },
        error: function (msg) {
            alertCustom("Productos no se listaron correctamente");
            Desbloquear("input_desc_prod");
        }
    });
}

function cargarSeries() {
    var prodCode = $("#hfProducto").val();
    $.ajax({
        type: "post",
        url: "vistas/nf/ajax/nfmrece.ashx?OPCION=8&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&SERIADO_IND=S" + "&PRODUCTO=" + prodCode,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            var obj = '';
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboBuscar').append('<option data-garantia="' + datos[i].GARANTIA + '" value="' + datos[i].CODIGO_BARRAS + '">' + datos[i].CODIGO_BARRAS + '</option>');
                }
            }
        },
        error: function (msg) {
            alertCustom('Error al listar las series del producto seleccionado.');
        }
    });
}


var NFLRECE = function () {

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
                alertCustom('Ocurrio un error al cargar las Empresas.');
            }
        });
    }

    var eventoControles = function () {

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());
        });

        $('#slcSucural').on('change', function () {
            listarAprobados("P");
        });

        $('#chkTodos').on('click', function () {
            if ($("#chkTodos").is(':checked')) {
                listarAprobados("T");//TODOS
                $('#chkTodos').attr('checked', true);
            } else {
                listarAprobados("P");//SOLO LOS PENDIENTES
                $('#chkTodos').attr('checked', false);
            }
        });
    }

    function ListarSucursales(ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();

            },
            error: function (msg) {
                alertCustom('Ocurrio un error al cargar los Establecimientos.');
            }
        });
    }

    var plugins = function () {
        $('.combo').select2();
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            $("#slcEmpresa").change();
            listarAprobados("P");
        }
    };
}();
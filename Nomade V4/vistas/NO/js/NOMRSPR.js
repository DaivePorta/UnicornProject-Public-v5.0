var NOMRSPR = function () {

    var flagTb = false;

    var plugins = function () {
      //Se cambió el nombre de cboEmpresas a slcEmpresa a todas los conflictos 
        $('#slcEmpresa').select2();
        $('#cboEstablecimiento').select2();

        $('#cboRque').select2();
        $('#cbPrioridad').select2();
        $('#txtFecha').datepicker();
        //$("#txtcant").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
    }

    //Se agregó las variables necesarias y la funcion para cargar los niveles de centro de costo
   
    var oCentroCostoCab = [];
    var sCentroCostoCab = "";
    var aoNiveles = [];

    //función añadida
    var CargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        aoNiveles = vNiveles;
    };

    function ValidaDecimales(e, field) {
        key = e.keyCode ? e.keyCode : e.which
        // backspace
        if (key == 8) return true

        // 0-9 a partir del .decimal 
        if (field.value != "") {
            if ((field.value.indexOf(".")) > 0) {
                //si tiene un punto valida dos digitos en la parte decimal
                if (key > 47 && key < 58) {
                    if (field.value == "") return true
                    //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                    regexp = /[0-9]{3}$/
                    return !(regexp.test(field.value))
                }
            }
        }
        // 0-9 
        if (key > 47 && key < 58) {
            if (field.value == "") return true
            regexp = /[0-9]{10}/
            return !(regexp.test(field.value))
        }
        // .
        if (key == 46) {
            if (field.value == "") return false
            regexp = /^[0-9]+$/
            return regexp.test(field.value)
        }
        // other key
        return false
    }

    function filltxtrazsocial_clientes(v_ID, v_value) {
        var selectinput = $(v_ID);
        selectinput.typeahead({
            minLength: 3,
            source: function (query, process) {
                arrayClientes = [];
                map = {};
                $.ajax({
                    type: "post",
                    url: "vistas/na/ajax/naminsa.ashx?OPCION=5",
                    data: { type: 'keyword', q: query },
                    cache: false,
                    datatype: "json",
                    async: false,
                    success: function (datos) {
                        if (datos !== null && datos !== '') {
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayClientes.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","DIRECCION":"' + datos[i].DIRECCION + '","PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            return process(arrayClientes);
                        }
                        if (datos !== null && $.trim(v_value).length > 0) {
                            selectinput.val(v_value);
                        }
                    },
                    error: function (msg) {
                        alertCustom('Error al listar clientes.');
                    }
                });
            },
            updater: function (item) {
                $("#hfPIDMCLIENTE").val(map[item].PIDM);
                return item;
            },
        });
        selectinput.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"));
            if ($(this).val().length === 0) {
                //$('#cboOrigen, #hfCOD_AUT, #txtNumSerieDOcRegistro, #txtNumDOcRegistro, #cboRegistro, #cbotipoDoc, #txtnumdoc, #hfPIDM, #hfDIR, #hfDNI, #hfRUC, .txtnumdocOrigenserie, .txtnumdocOrigen').val('');
                //$('#cboOrigen, #cboRegistro, #cbotipoDoc').change();
                //if ($('#txtorigen').get(0).tagName === 'SELECT') {
                //    $('#txtorigen').html('').select2().prop('disabled', true);
                //}
                //if ($('#txtorigen').get(0).tagName === 'INPUT') {
                //    $('#txtorigen').val('');
                //}
                //$('#cbotipoDoc').prop('disabled', true);
                //$('.div_mas_dctoreg').remove();
            }
        });
    }

    var eventoControles = function () {


        $('#btnMail').click(function (e) {
            e.preventDefault();
            $('#txtAsunto').val($('#cboRque :selected').text());
            $('#lblEmpresa').text($('#slcEmpresa :selected').text());
            $('#lblAsunto').text($('#txtGlosa').val());
            $('#lblEmision').text($('#txtFecha').val());
            //$('#lblTransaccion').text($('#txtfechatransaccion').val());
            $('#lblSolicitante').text($('#txtSolici').val());
            $('#lblReceptor').text($('#txtentregar').val());
            //$('#lblAux').text(aux + ': ');
            //$('#lblRazSocial').text($('#txtrazsocial').val());
            //$('#lblTipoDoc').text($('#txtnumdoc').val().length === 11 ? 'RUC' : 'DNI');
            //$('#lblNumDoc').text($('#txtnumdoc').val());
            //$('#lblDocRegistro').text($('#cboRegistro :selected').text() + ' ' + $('#txtNumSerieDOcRegistro').val() + '-' + $('#txtNumDOcRegistro').val());
            $('#lblGlosa').text($('#txtGlosa').val());
            $('#lblTablaHtml').html(htmltabla);
            cargarCorreos();
            $('#divMail').modal('show');
            $('#tbleAux th div').removeAttr('style');

        });

        $('#slsRequeIn').on('change', function () {
            if ($('#slsRequeIn').val() == 'I') {
                $('#cliente').css('display', 'none')
            }
            else {
                $('#cliente').css('display', 'block')
                filltxtrazsocial_clientes('#txtCliente', '');
            }
        });

        $('#cboRque').on('change', function () {



            if (flagTb) {
                if (oTableActividad.fnGetData().length != 0) {

                    $('#detalle').DataTable().data().clear().draw()
                }
            }


            if ($('#cboRque').val() == '1') {
                //filltxtrazsocial(v_ID, v_value,SERVICIO,TEXTI) {
                filltxtrazsocial('#txtdescprod', '', '', '02,');


                $("#txtdescprod").remove();
                $("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase'/>");
                filltxtrazsocial('#txtdescprod', '', '', '02,');
                limpiar();

            }
            if ($('#cboRque').val() == '2') {
                //filltxtrazsocial(v_ID, v_value,SERVICIO,TEXTI) {
                $("#txtdescprod").remove();
                $("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase'/>");
                filltxtrazsocial('#txtdescprod', '', '', '02,');
                limpiar();
            }

            if ($('#cboRque').val() == "1") {
                $('#slsRequeIn').select2('val', 'I').change();
            }
            else {
                $('#slsRequeIn').select2('val', 'E').change();
            }

        });

        $('#slcEmpresa').on('change', function () {
            $("#txtdescprod").remove();
            $("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase'/>");
            filltxtrazsocial('#txtdescprod', '', '', '02,');
            fillCboEstablecimiento();
     
            $('#detalle').DataTable().data().clear().draw()
            limpiar();
        });
     
        $('#idRegis').on('click', function () {

            if (vErrors(["txtGlosa"])) {
                if (oTableActividad.fnGetData().length == 0) {
                    alertCustom("Agrege Productos  ")
                }
                else {
                    REGISTRAR();
                    $("#idRegis").remove();

                }

            }

        });




    }

    function REGISTRAR() {
        var tablas = datosTabla();
        var data = new FormData;

        data.append('p_REQUE', $('#slsRequeIn').val());

        if ($('#slsRequeIn').val() == 'I') {
            data.append('p_CLIENTE', "N");

        }

        else {
            data.append('p_CLIENTE', $('#hfPIDMCLIENTE').val());

        }


        data.append('p_GLOSA_GENERAL', $('#txtGlosa_general').val());
        data.append('p_SOLICITA', $('#ctl00_txtus').val());
        data.append('p_FECHA', $('#txtFecha').val());
        data.append('p_PRIORIDAD', $('#cbPrioridad').val());
        data.append('p_TIPOREQ', $('#cboRque').val());

        data.append('CECC', $("#txt_centro_costo").data("CodCentroCostoCab"));
        data.append('CECD', $("#txt_centro_costo").data("CodCentroCosto"));

        data.append('p_GLOSA', $('#txtGlosa').val());
        data.append('p_USUARIO1', $('#ctl00_txtus').val());
        data.append('p_CATALOGO', $("#slcEmpresa").val());
        data.append('p_ESTABLECIMIENTO', $("#cboEstablecimiento").val());
        data.append('p_detalle', tablas);

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=6",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (datos) {
                Desbloquear("ventana");
                $('#txtRequi').val(datos)
                exito();
                $('#div select').attr('disabled', true);
                $('#div input').attr('disabled', true);
                $('#div textarea').attr('disabled', true);
                $('#cancelar').remove();
                $('#acciones_generales').html('<a id="iModificar" class="btn blue" href = "javascript:Modificar()"><i class="icon-pencil"></i>&nbsp;Modificar</a> <a id="iCompletar" class="btn green" href = "javascript:Completar()"><i class="icon-ok-sign"></i>&nbsp;Completar</a>  <a id="cancelar" class="btn" href="?f=NOMRCOM"><i class="icon-remove"></i>Cancelar</a>');
                $('#txtdescprod').attr('disabled', false);
                $('#txtcant').attr('disabled', false);
                htmltabla = '<table class="table table-bordered">' + $("#detalle").html().toString() + '</table>';
                //$('#btnMail').removeClass('hidden');
                //$('#oculta').remove();
                //$('#detalle').DataTable().columns(6).visible(false);
                //window.location.href = '?f=NOMRCOM&codigo=' + datos;

            },
            error: function (msg) {
                alert(msg);
            }
        });


    }

    function NombreUsuario() {
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=5&p_usuario=" + $('#ctl00_txtus').val(),
            async: false,
            success: function (datos) {
                if (datos != null) {

                    $("#txtSolici").val(datos);

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargaInicial = function () {

        $('#slsRequeIn').attr('disabled', true)

        $('#iModificar').css('display', 'none')
        $('#iCompletar').css('display', 'none')

        var F = new Date();
        $("#txtFecha").attr('disabled', true);
        $("#txtSolici").attr('disabled', true);
        $("#txtRequi").attr('disabled', true);


        $("#txtUnidad").attr('disabled', true);
        $("#txtcodprod").attr('disabled', true);

        $("#txtFecha").val(F.getDate() + "/" + (F.getMonth() + 1) + "/" + F.getFullYear())

        $('#slsRequeIn').select2().change();

        $('#cboRque').select2().change();

        $("#txtAprobado").css('display', 'none');
        $("#lblAprobado").css('display', 'none');
    }

    var tabla = function () {
        var parms = {
            data: null,
            paging: false,
            filter: false,
            columns: [

                { data: "CODIGO", createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%' },
                { data: "DES_PRODUCTO" },
                { data: "UNIDAD_MEDIDAD", createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '18%' },
                { data: "CODIGO_MEDIDAD", visible: false },
                { data: "CANTIDAD", createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '12%' },
                { data: "FECHA REQ", createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '15%' },
                 {
                     data: null,
                     defaultContent: '<a  class="btn red eliminar"><i class="icon-trash"></i></a>',
                     createdCell: function (cell) { $(cell).css('text-align', 'center') }, width: '10%'
                 }

            ]

        }
        oTableActividad = iniciaTabla('detalle', parms);
        $('#detalle').removeAttr('style');

        flagTb = true;
        $('#detalle tbody').on('click', '.eliminar', function () {

            //if ($(this).hasClass('selected')) {
            //    $(this).removeClass('selected');
            //}
            //else {
            //    oTableActividad.$('tr.selected').removeClass('selected');
            //    $(this).addClass('selected');

            var pos = oTableActividad.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableActividad.fnGetData(pos);
            oTableActividad.fnDeleteRow(pos);

            // var code = $('#cod' + $(this).attr("id")).html();
            //window.location.href = '?f=ncmactv&codigo=' + codigo;
            // }

        });

    }

    function cantidad() {
        var canti = document.getElementById("detalle").rows.length;
        alert(canti)
    }

    var cargarPOS = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=9&p_CODEUSU=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data !== null) {
                        $('#slcEmpresa').select2('val', data[0].CATALOGO).change();
                        $('#cboEstablecimiento').select2('val', data[0].ESTABLECIMIENTO).change();
                        $('#txtRequi').val(data[0].CODIGO);
                        $('#txtFecha').val(data[0].FECHA);
                        $('#txtSolici').val(data[0].SOLICITANTE);
                        $('#cbPrioridad').select2('val', data[0].PRIORIDAD);
                        $('#cboRque').select2('val', data[0].TIPOREQUE);

                        $("#txt_centro_costo").val(datos[0].CCOSTO);
                        $("#txt_centro_costo").data("CodCentroCostoCab", data[0].CECC);
                        $("#txt_centro_costo").data("CodCentroCosto", data[0].CECD);

                        $('#txtGlosa').val(data[0].GLOSA);
                        $('#div select').attr('disabled', true);
                        $('#div input').attr('disabled', true);
                        $('#div textarea').attr('disabled', true);
                        $('#slsRequeIn').select2('val', data[0].IND_INTERNO).change()
                        $('#txtCliente').val(data[0].CLIENTE)
                        if (data[0].COMPLETAR == '0') {
                            listarDetalleCompletar(data[0].CODIGO)
                            $('#txtdescprod').attr('disabled', false);
                            $('#txtcant').attr('disabled', false);
                            $('#idRegis').remove()
                            $('#cancelar').remove()
                            $('#acciones_generales').html('<a id="iModificar" class="btn blue" href = "javascript:Modificar()"><i class="icon-pencil"></i>Modificar</a> <a id="iCompletar" class="btn green" href = "javascript:Completar()"><i class="icon-ok-sign"></i>Completar</a>  <a id="cancelar" class="btn" href="?f=NOMRCOM"><i class="icon-remove"></i>&nbsp;Cancelar</a>');
                            htmltabla = '<table class="table table-bordered" >' + $("#detalle").html().toString() + '</table>';
                        } else {
                            $('#deTalleGeneral').remove();
                            listarDetalle(data[0].CODIGO);
                            $('#iModificar').remove()
                            $('#idRegis').remove()
                            $('#iCompletar').remove()
                            htmltabla = '<table class="table table-bordered" id="tbleAux">' + $("#tblbmodal").html().toString() + '</table>';
                            $('#btnMail').removeClass('hidden');
                            $('#tbleAux th div').removeAttr('style');
                        }
                        $("#txtAprobado").val(data[0].USUARIO_APROBADO);
                        $("#txtAprobado").css('display', 'block');
                        $("#lblAprobado").css('display', 'block');
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }
    };

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

    function listarDetalleCompletar(detalle) {
        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=101&p_CODEDETALLE=" + detalle + "&P_ESTADO=" + '1',
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null) {

                    var json = $.parseJSON(datos);
                    oTableActividad.fnAddData(json);

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    function listarDetalle(detalle) {
        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=10&p_CODEDETALLE=" + detalle + "&P_ESTADO=" + '1',
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos !== null) {
                    $('#tblProductos').html(datos)
                    $("#tblbmodal").DataTable({
                        "scrollX": "true",
                        "sPaginationType": "full_numbers"
                    })
                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
            NombreUsuario();
            tabla();
            cargarPOS();
        }
    };

}();

function Completar() {


    var tablas = datosTabla();
    var data = new FormData;
    data.append('p_detalle', tablas);
    data.append('P_COMPLETAR', $('#txtRequi').val());

    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=103",
        contentType: false,
        data: data,
        processData: false,
        cache: false,

        success: function (datos) {
            Desbloquear("ventana");
            //Desbloquear("ventana");
            //$('#txtRequi').val(datos)
            if (datos == 'OK') {
                exito();
                $('#acciones_generales').remove();
                $('#oculta').remove();
                $('#detalle').DataTable().columns(6).visible(false);

                htmltabla = '<table class="table table-bordered">' + $("#detalle").html().toString() + '</table>';
                $('#btnMail').removeClass('hidden');
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

function Modificar() {
    var tablas = datosTabla();
    var data = new FormData;
    data.append('p_detalle', tablas);
    data.append('P_ELIMINAR', $('#txtRequi').val());

    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=102",
        contentType: false,
        data: data,
        processData: false,
        cache: false,

        success: function (datos) {
            Desbloquear("ventana");
            //Desbloquear("ventana");
            //$('#txtRequi').val(datos)
            if (datos == 'OK') {
                exito();

                htmltabla = '<table class="table table-bordered">' + $("#detalle").html().toString() + '</table>';
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


function filltxtrazsocial(v_ID, v_value, SERVICIO, TEXTI) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + $("#slcEmpresa").val() + "&TEXTI=" + TEXTI + "&SERVICIO=" + SERVICIO,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        cache: false,
        success: function (datos) {
            if (datos != null) {

                selectRazonSocial.typeahead({

                    source: function (query, process) {

                        array = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            array.push(datos[i].DESC_ADM);
                            obj += '{';
                            obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","STOCK":"' + datos[i].STOCK + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';
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
                        //$("#hdcodProd2").val(map[item].CODIGO);
                        $("#txtUnidad").val(map[item].DESC_UNIDAD_DESPACHO);
                        $("#txtcodprod").val(map[item].CODIGO);
                        //$("#txtStock").val(map[item].STOCK);
                        $("#hdcodUNI").val(map[item].UNIDAD);


                        return item;
                    },

                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                });
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}

function GrabarDet() {
    if ($('#txtcant').val() == "") {
        alertCustom("Ingrese Cantidad");
    } else {
        if ($('#txtcodprod').val() == "") {
            alertCustom("Ingrese un producto correcto");
        } else {
            var a = {
                "CODIGO": $('#txtcodprod').val(),
                "DES_PRODUCTO": $('#txtdescprod').val(),
                "UNIDAD_MEDIDAD": $('#txtUnidad').val(),
                "CODIGO_MEDIDAD": $('#hdcodUNI').val(),
                "CANTIDAD": parseFloat($('#txtcant').val()),
                "FECHA REQ": $("#txtFecha").val()
            }
            var ar = oTableActividad.fnGetData();
            var flag = false;
            ar.filter(function (e, f) {
                if (e.CODIGO == $('#txtcodprod').val()) {
                    alertCustom("Producto Repetido")
                    flag = true;
                }
            });
            if (!flag) {
                oTableActividad.fnAddData(a);
                limpiar();
            }
        }
    }
}

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

                //Iniciar valores con valores de login
                $("#slcEmpresa").select2("val", $('#ctl00_hddctlg').val()).change();

                fillCboEstablecimiento();
         
            }



        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var fillCboEstablecimiento = function () {
    var selectEst = $('#cboEstablecimiento');
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#slcEmpresa').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEst.empty();

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
            }
            //selectEst.val($('#ctl00_hddestablecimiento').val());
            //selectEst.change();
        },
        error: function (msg) {
            alert(msg.d);
        }
    });
    $('#cboEstablecimiento').select2('destroy').select2();
};

var limpiar = function () {
    $('#txtcodprod, #txtdescprod, #txtUnidad, #txtcant').val("");
}

function datosTabla() {
    var datos_tabla;
    var datos_fila = '';
    $('#detalle tbody').children().each(function (i) {

        var CODIGO_PROD, CANTIDAD, CODIGO_UNM, FECHA, ITEMS;

        CODIGO_PROD = $(this).find('td').eq(0).text();
        CANTIDAD = $(this).find('td').eq(4).text();
        CODIGO_UNM = $(this).find('td').eq(3).text();
        FECHA = $(this).find('td').eq(5).text();
        ITEMS = i + 1;

        datos_fila += CODIGO_PROD + ',' + CANTIDAD + ',' + CODIGO_UNM + ',' + FECHA + ',' + ITEMS;
        datos_fila += '|';
    });
    datos_fila = datos_fila + '|';
    datos_tabla = datos_fila.replace('||', '');
    return datos_tabla;
}

function ENVIAGLOSA(codigoCaja) {



    var glosa = $('#txt_' + codigoCaja).val();



    var data = new FormData;

    data.append('P_CODE_DETA', codigoCaja);
    data.append('P_GLOSA_DETA', glosa);



    $.ajax({
        type: "POST",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=11",
        contentType: false,
        data: data,
        processData: false,
        cache: false,

        success: function (datos) {


            exito();
            //$('#txtRequi').val(datos)
            //exito();
            window.location.href = '?f=NOMRCOM&codigo=' + $('#txtRequi').val();
            //$('#txt_' + codigoCaja).attr('disabled', true)


        },
        error: function (msg) {
            alert(msg);
        }
    });


}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        Bloquear('divMail_body');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=SENDMAIL&REMITENTE=" + $('#txtRemitente').val() +
                "&NREMITENTE=" + $('#txtRemitente').val() +
                "&DESTINATARIOS=" + destinos +
                "&ASUNTO=" + $('#txtAsunto').val() +
                "&MENSAJE=" + $('#txtcontenido').val() +
                "&EMPRESA=" + $('#slcEmpresa :selected').text() +
                "&ESTABLECI=" + $('#cboEstablecimiento option:selected').html() +
                "&p_CODEDETALLE=" + $('#txtRequi').val() +
                "&SOLICITANTE=" + $('#txtSolici').val() +
                "&NUM_DOC_ORIGEN=" + $('#txtRequi').val() +
                "&P_ESTADO=" + '' +
            /*
                "&Carea=" + $('#cboArea option:selected').html() +
                "&Cseccion=" + $('#cboSeccion option:selected').html() +
                "&Cproceso=" + $('#cboProceso option:selected').html() +
                "&Cactividad=" + $('#cboActividad option:selected').html() +
            */
                "&GLOSA=" + $('#txtGlosa').val(),


            contentType: "application/json;",
            async: false,
            dataType: false,
            success: function (datos) {
                exito();
                setTimeout(function () { $('#divMail').modal('hide'); }, 50);
            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            }
        });
        Desbloquear('divMail_body');
    }
};

var flag = 'normal';
var v_ok = 'S';
var v_total = 0.00;

var ajaxProveedores = null;

function datosTabla() {
    var datos_tabla;
    var datos_fila = '';
    $('#tblDocumentos tbody').children().each(function (i) {

        var sub_total, igv, fecha, comprobante, serie, numero, tipo_doc, nro_doc, pidm, persona, gravada, total, cuenta, modo_pago, mone_code, concepto;

        fecha = $(this).find('td').eq(2).text();
        serie = $(this).find('td').eq(3).text();
        numero = $(this).find('td').eq(4).text();
        gravada = $(this).find('td').eq(5).text();
        sub_total = $(this).find('td').eq(6).text();
        igv = $(this).find('td').eq(7).text();
        total = $(this).find('td').eq(8).text();
        pidm = $("#hfPIDM").val();
        cuenta = $("#txtNumCuenta").val();
        comprobante = $("#sclDocumento").val();
        modo_pago = $("#sclMopa").val();
        mone_code = $("#cbomoneda").val();
        concepto = $("#cbosubconcepto").val();

        datos_fila += mone_code + ',' + modo_pago + ',' + fecha + ',' + comprobante + ',' + serie + ',' + numero + ',' + pidm + ',' + gravada + ',' + total + ',' + sub_total + ',' + igv + ',' + concepto;
        datos_fila += '|';
    });
    datos_fila = datos_fila + '|';
    datos_tabla = datos_fila.replace('||', '');
    return datos_tabla;
}

function Grabar() {
    $('#aspnetForm').submit();
}

//EDICION TABLA COMPRAS 
//---------------------------------------------------------

function restoreRow(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);

    for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
        oTable.fnUpdate(aData[i], nRow, i, false);
    }

    oTable.fnDraw();
}

function editRow(oTable, nRow) {
    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    jqTds[0].innerHTML = "<a data-mode='new' class='cancel btn red' href='javascript:;'><i class='icon-remove-sign'></i></a>";
    jqTds[1].innerHTML = "<a class='edit btn blue' href='javascript:;'><i class='icon-ok-sign'></i></a>";
    jqTds[2].innerHTML = '<div class="control-group"><div class="controls"><input type="text" id="txt_tfecha" name="txt_tfecha" class="fecha m-wrap required" data-date-format="dd/mm/yyyy" style="width:75px;" value="' + aData[2] + '"></div></div>';
    jqTds[3].innerHTML = '<div class="control-group"><div class="controls"><input id="txt_tserie" name="txt_tserie" type="text" class="m-wrap required number" onkeypress=" return ValidaDecimales(event,this)" maxlength="4" style="width:33px;" value="' + aData[3] + '"></div></div>';
    jqTds[4].innerHTML = '<div class="control-group"><div class="controls"><input id="txt_tnumero" name="txt_tnumero" type="text" class="m-wrap small required number" onkeypress=" return ValidaDecimales(event,this)" value="' + aData[4] + '"></div></div>';
    jqTds[5].innerHTML = '<div class="control-group"><div class="controls"><select class="required" id="cbograbada" name="cbograbada" style="width:57px;"><option value="DSTGRA">SI</option><option value="DSTNGR">NO</option></select></div></div>';
    jqTds[6].innerHTML = '<div class="control-group"><div class="controls"><input name="txt_tbase" id="txt_tbase" type="text" class="m-wrap small number required" onkeypress=" return ValidaDecimales(event,this)" value="' + aData[6] + '"></div></div>';
    jqTds[7].innerHTML = '<div class="control-group"><div class="controls"><input name="txt_timpuesto" id="txt_timpuesto" type="text" class="m-wrap small number required" onkeypress=" return ValidaDecimales(event,this)" value="' + aData[7] + '"></div></div>';
    jqTds[8].innerHTML = '<div class="control-group"><div class="controls"><input name="txt_ttotal" id="txt_ttotal" type="text" class="m-wrap small number required" value="' + aData[8] + '" disabled></div></div>';
    $('.fecha').datepicker();
    $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
    $('.fecha').datepicker("setDate", "now");

    $("#cbograbada").val(aData[5]);
    flag = 'edit';
    $("#agregar").attr("disabled", "disabled");
}

function saveRow(oTable, nRow, total) {
    if (vErrorsNotMessage(['txt_tserie', 'txt_tnumero', 'txt_tbase', 'txt_timpuesto'])) {

        v_ok = 'S';
        var jqInputs = $('input', nRow);
        var jqSelect = $('select', nRow);
        var ttotal = parseFloat(parseFloat(jqInputs[3].value) + parseFloat(jqInputs[4].value));

        oTable.fnUpdate("<a class='delete btn red' href='javascript:;'><i class='icon-remove-sign'></i></a>", nRow, 0, false);
        oTable.fnUpdate("<a class='edit btn yellow' href='javascript:;'><i class='icon-pencil'></i></a>", nRow, 1, false);
        oTable.fnUpdate(jqInputs[0].value, nRow, 2, false);
        oTable.fnUpdate(jqInputs[1].value, nRow, 3, false);
        oTable.fnUpdate(jqInputs[2].value, nRow, 4, false);
        oTable.fnUpdate(jqSelect[0].value, nRow, 5, false);
        oTable.fnUpdate(jqInputs[3].value, nRow, 6, false);
        oTable.fnUpdate(jqInputs[4].value, nRow, 7, false);
        oTable.fnUpdate(ttotal, nRow, 8, false);
        oTable.fnDraw();

        $("#agregar").removeAttr("disabled");
    } else {
        v_ok = 'N';
        return false;
    }
}

function cancelEditRow(oTable, nRow) {
    var jqInputs = $('input', nRow);
    var jqSelect = $('select', nRow);

    oTable.fnUpdate("<a class='delete btn red' href='javascript:;'><i class='icon-remove-sign'></i></a>", nRow, 0, false);
    oTable.fnUpdate("<a class='edit btn yellow' href='javascript:;'><i class='icon-pencil'></i></a>", nRow, 1, false);
    oTable.fnUpdate(jqInputs[0].value, nRow, 2, false);
    oTable.fnUpdate(jqInputs[1].value, nRow, 3, false);
    oTable.fnUpdate(jqInputs[2].value, nRow, 4, false);
    oTable.fnUpdate(jqSelect[0].value, nRow, 5, false);
    oTable.fnUpdate(jqInputs[3].value, nRow, 6, false);
    oTable.fnUpdate(jqInputs[4].value, nRow, 7, false);
    oTable.fnUpdate(ttotal, nRow, 8, false);
    oTable.fnDraw();

    $("#agregar").removeAttr("disabled");
}

//---------------------------------------------------------

function validarCuenta() {
    var cod_cuenta = $("#txtNumCuenta").val();
    var ctlg = $("#slcEmpresa").val();

    if (cod_cuenta.length == 0) {
        return false;
    } else {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomplot.ashx?flag=1&ctlg_code=" + ctlg + "&cod_cuenta=" + cod_cuenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos.length != 0) {
                    $("#txtdesCuenta").val(datos);
                } else {
                    $("#txtdesCuenta").val("");
                    alertCustom("Ingrese un Numero de Cuenta Valido");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}

function GrabarCompras() {
    Bloquear("ventana");

    var opcion, ctlg_code, scsl_code, tipo_camb, usua_id;

    opcion = $("#hf_opcion").val();
    ctlg_code = $("#slcEmpresa").val();
    scsl_code = $("#slcSucural").val();
    usua_id = $('#ctl00_lblusuario').text();
    tipo_camb = $("#txt_tcambio").val();
    text_comp = datosTabla();

    var data = new FormData();

    data.append('flag', '2');
    data.append('ctlg_code', ctlg_code);
    data.append('scsl_code', scsl_code);
    data.append('usua_id', usua_id);
    data.append('text_comp', text_comp);
    data.append('tipo_camb', tipo_camb);
    data.append('p_TIPO_BIEN', $("#cboTipoBien").val());


    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NO/ajax/NOMPLOT.ASHX",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).success(function (res) {
        Desbloquear("ventana");
        if (res != null) {
            if (res == "EXITO") {
                $('#grabar').addClass('disabled');
                $('#grabar').attr('href', '');
                exito();
            } else {
                alertCustom(res);
            }
        }
        else {
            noexito();
        }
    }).error(function () {
        Desbloquear("ventana");
    })
}

var NOMPLOT = function () {

    var validacion = function () {

        var frmPersonaNatural = $("#aspnetForm"); //aspnetForm es el formulario por defecto del ASP
        var errorNatural = $('.alert-error', frmPersonaNatural);
        var successNatural = $('.alert-success', frmPersonaNatural);

        frmPersonaNatural.validate({
            errorElement: 'span', //el input tien por defecto el span para mostrar el error
            errorClass: 'help-inline', // agrega la clase help-line en la cual se mostrara el error
            focusInvalid: false, // no se muestra el foco en el elemento invalido
            ignore: "",
            invalidHandler: function (event, validator) { //se ejecuta al no cumplirse las reglas              
                successNatural.hide();
                errorNatural.show();
                App.scrollTo(errorNatural, -200);
            },

            highlight: function (element) { // error para cada input
                $(element)
                    .closest('.help-inline').removeClass('ok'); // quita el icono de ok (aspa)
                $(element)
                    .closest('.control-group').removeClass('success').addClass('error'); // cambia la clase de todo el agrupador a rojo
            },

            unhighlight: function (element) { // revierte el error a success
                $(element)
                    .closest('.control-group').removeClass('error');
            },

            success: function (label) {
                label
                    .addClass('valid').addClass('help-inline ok') // agrega el icono del check
                .closest('.control-group').removeClass('error').addClass('success'); // quita el color rpjp y lo coloca en verde
                //Grabar()
            },

            submitHandler: function (form) {
                successNatural.show();
                errorNatural.hide();
                GrabarCompras();
            }
        });
    }

    var cargarComprobantes = function () {
        $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camascr.ASHX?opcion=9",
            success: function (datos) {
                comprobanteHTML = datos;
            },
            error: function (msg) {
                alert(msg);
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
                alert(msg);
            }
        });
    }

    function fillTxtCentroCostos(v_ID, v_value) {

        var selectinput = $(v_ID);

        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=17&CTLG_CODE=" + $('#slcEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {


                    selectinput.typeahead({
                        source: function (query, process) {

                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESCC);
                                obj += '{';
                                obj += '"CODE":"' + datos[i].CODE + '","DESCC":"' + datos[i].DESCC + '","CECC_CODE":"' + datos[i].CECC_CODE + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.DESCC] = objeto;
                            });
                            process(array);
                        },


                        updater: function (item) {
                            //selectedCatalogo = map[item].RUC;
                            // alert(map[item].PIDM);
                            $("#idCostos").val(map[item].CODE);
                            // alert(map[item].RUC);
                            return item;
                        },
                    });
                    selectinput.keyup(function () { $(this).siblings("ul").css("width", $(this).css("width")) });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectinput.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var peticionTipoCambio = function () {

        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMTCAM.ASHX?opcion=1",
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {

                if (datos[0].VENTA != '0') {
                    $("#txt_tcambio").val(datos[0].VENTA);
                    //$("#txtCompraOficial").val(datos[0].COMPRA);
                } else {
                    alertCustom('No existe tipo de cambio.');
                    $("#txt_tcambio").val('0.00');
                }

            },
            error: function (msg) {

                alert(msg);
            }
        });
    }

    var cargaConceptos = function () {
        conceptos = $("#cboconceptos");
        $.ajax({
            type: "POST",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=PADRES",
            async: false,
            success: function (datos) {
                conceptos.empty();
                conceptos.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        conceptos.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                conceptos.change();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    function filltxtproveedor(v_ID, v_value) {
        var selectRazonSocial = $(v_ID);

        selectRazonSocial.typeahead({
            minLength: 2,
            source: function (query, process) {
                arrayRazonSocial = [];
                map = {};
                if (ajaxProveedores) {
                    ajaxProveedores.abort();
                }
                ajaxProveedores = $.ajax({
                    type: 'post',
                    url: "vistas/na/ajax/naminsa.ashx?OPCION=4&CTLG_CODE=" + $('#controlempresa').val(),
                    data: { type: 'keyword', q: query },
                    cache: false,
                    dataType: 'json',
                    success: function (datos) {
                        var obj = "[";
                        for (var i = 0; i < datos.length; i++) {
                            arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                            obj += '{';
                            obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","DIRECCION":"' + datos[i].DIRECCION + '","PIDM":"' + datos[i].PIDM + '","DIAS":"' + datos[i].DIAS + '","ID":"' + datos[i].ID + '","ID":"' + datos[i].ID + '", "AGENTE_RETEN_IND": "' + datos[i].AGENTE_RETEN_IND + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.RAZON_SOCIAL] = objeto;
                        });

                        if (datos != null && $.trim(v_value).length > 0) {
                            selectRazonSocial.val(v_value);
                            $("#hfPIDM").val('');
                        }

                        return process(arrayRazonSocial);
                    }
                });
            },
            updater: function (item) {
                $("#txtCodProveedor").val(map[item].RUC);
                $("#hfPIDM").val(map[item].PIDM);
                return item;
            },

        });
        selectRazonSocial.keyup(function () {
            $(this).siblings("ul").css("width", $(this).css("width"))
            if ($("#txtDesProveedor").val().length <= 0) {
                $("#txtDesProveedor").val("");
                $("#txtCodProveedor").val("");
                $("#hfPIDM").val('');
            }
        });

    }

    var plugings = function () {
        $('.combo').select2();
        $('#cboTipoBien').select2();
        $('.fecha').datepicker();
        $('.fecha').inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } });
        $('.fecha').datepicker("setDate", "now");
    }

    var cargaInicial = function () {

        filltxtproveedor("#txtDesProveedor", "");

        var oTable = $('#tblDocumentos').dataTable({
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "Todos"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,

            "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ registros por pagina",
                "oPaginate": {
                    "sPrevious": "Anterior",
                    "sNext": "Siguiente"
                }
            },
            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }
            ]
        });

        jQuery('#tblDocumentos .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
        jQuery('#tblDocumentos .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

        var nEditing = null;

        $('#agregar').click(function (e) {
            e.preventDefault();
            var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
        });

        $('#tblDocumentos a.delete').live('click', function (e) {
            e.preventDefault();

            if (confirm("Esta Seguro de Quitar esta fila?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
        });

        $('#tblDocumentos a.cancel').live('click', function (e) {
            e.preventDefault();
            if ($(this).attr("data-mode") == "new") {
                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
            $("#agregar").removeAttr("disabled");
        });

        $('#tblDocumentos a.edit').live('click', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && flag == "edit") {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing);

                if (v_ok == 'S') {
                    nEditing = null;
                    flag = 'normal';
                } else {
                    return false;
                }

            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });

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
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoControles = function () {

        $('#slcEmpresa').on('change', function () {
            ListarSucursales($('#slcEmpresa').val());

            fillTxtCentroCostos('#txtCenCostos', '');
        }
        );

        $("#cboconceptos").change(function () {
            var selectEst = $('#cbosubconcepto');
            $.ajax({
                type: "POST",
                url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_CODE=" + $("#cboconceptos").val(),
                async: false,
                success: function (datos) {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    selectEst.val('');
                    selectEst.change();
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        });

        $("#cbosubconcepto").on("change", function () {
            if ($("#cboTipoBien").val() == "" && ObtenerQueryString("codigo") == undefined) {
                if ($('#cbo_subgasto option:selected').attr("tipo-bien") != "") {
                    $("#cboTipoBien").select2("val", $('#cbo_subgasto option:selected').attr("tipo-bien"));
                } else {
                    $('#cboTipoBien').select2("val", "0001");
                }
            }
        });
    }

    var fillcboDocRegistro = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=7&CTLG_CODE=" + $('#ctl00_hddctlg').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#sclDocumento').empty();
                $('#sclDocumento').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#sclDocumento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $('#sclDocumento').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboModoPago = function () {
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#sclMopa').empty();
                $('#sclMopa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#sclMopa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#sclMopa').select2('val', datos[0].CODIGO);
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillcboMoneda = function () {

        CrearControl('N', '1', 'cbomoneda', 'con_moneda');

    }

    var fillCboTipoBien = function (code) {
        Bloquear($($('#cboTipoBien').parents("div")[0]));
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMCLBI.ASHX?OPCION=4"
                + "&p_CODE="
            + "&p_DESCRIPCION="
            + "&p_DESC_CORTA="
            + "&p_ESTADO_IND=A",
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                $('#cboTipoBien').html('<option></option>');
                if (datos != null && datos.length > 0) {
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboTipoBien').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                        if (code != undefined) {
                            if (code != "") {
                                $('#cboTipoBien').select2("val", code);
                            }
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom("Tipo de bienes no se listaron correctamente.");
            },
            complete: function (msg) {
                Desbloquear($($('#cboTipoBien').parents("div")[0]));
            }
        });
    }

    return {
        init: function () {
            validacion();
            cargaInicial();
            plugings();
            cargaConceptos();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            fillTxtCentroCostos('#txtCenCostos', '');
            eventoControles();
            fillcboMoneda();
            fillCboModoPago();
            fillcboDocRegistro();
            peticionTipoCambio();
            fillCboTipoBien();
        }
    };
}
();
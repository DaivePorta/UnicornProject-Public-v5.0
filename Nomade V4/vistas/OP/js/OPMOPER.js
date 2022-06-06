var OPMOPER = function () {

    var OtableOperDep;

    var AutocompletarTiposOP = function () {

        Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/OP/ajax/OPMTIOP.ashx?OPCION=LTP",
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {

                    $.each(datos, function (key, value) {
                        $('#cboTipoOp').append('<option value="' + value.CODIGO + '">' + value.DESCRIPCION + '</option>');
                    })
                }

                Desbloquear('ventana');
            },
            error: function (msg) {
                alertCustom('Error al lista de tipos de operaciones');
                Desbloquear('ventana');
            }
        });
    };

    var GrabarOP = function () {

        var aValidar = ['txtdesc', 'cboTipoOp', 'cboTipoPersona'];

        if ($("#chkAutomatica").is(':checked')) {
            aValidar.push("cboPeriodicidad");
            aValidar.push("txtPlazo");
            aValidar.push("cboPlazo");
        }

        if ($("#chkDocumento").is(":checked")) {
            aValidar.push("cboDocumentoItem");
        }

        if (fnGetItemsTable("MONEDA") > 0) {

            if (vErrorsNotMessage(aValidar)) {

                var estado_ind;
                var mostrar_ind;
                var procint_ind;
                var genasiento_ind;
                var compuesta_ind;
                var automatica_ind;

                if ($('#chkEstadoOperacion').is(':checked')) {
                    estado_ind = "A"
                } else {
                    estado_ind = "I"
                }

                if ($('#chkMostrar').is(':checked')) {
                    mostrar_ind = "S"
                } else {
                    mostrar_ind = "N"
                }

                if ($('#chkProcesosInt').is(':checked')) {
                    procint_ind = "S"
                } else {
                    procint_ind = "N"
                }

                if ($('#chkGenAsiento').is(':checked')) {
                    genasiento_ind = "S"
                } else {
                    genasiento_ind = "N"
                }

                if ($("#chkAutomatica").is(":checked")) {
                    automatica_ind = "S"
                } else {
                    automatica_ind = "N"
                }

                compuesta_ind = "S"

                var data = new FormData();
                data.append('OPCION', 'GOP');
                data.append('DESCRIPCION', $("#txtdesc").val());
                data.append('TIPO_OPCODE', $("#cboTipoOp").val());
                data.append('ESTADO_IND', estado_ind);
                data.append('MOSTRAR_IND', mostrar_ind);
                data.append('PROC_INT_IND', procint_ind);
                data.append('GEN_ASIENTO_IND', genasiento_ind);
                data.append('COMPUESTA_IND', compuesta_ind);

                data.append('AUTOMATICA_IND', automatica_ind);
                data.append('PERIODICIDAD', $("#cboPeriodicidad").val());
                data.append('CANTPLAZO', $("#txtPlazo").val());
                data.append('PLAZO', $("#cboPlazo").val());
                data.append('TIPO_PERSONA', $("#cboTipoPersona").val());
                data.append('DOCUMENTO', $("#cboDocumentoItem").val());

                data.append('sDetalleMoneda', fnGetDetalle("MONEDA"));
                data.append('sDetalleEstado', fnGetDetalle("ESTADO"));

                Bloquear('ventana');
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/OP/ajax/OPMOPER.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).success(function (res) {
                    if (res !== null) {
                        if (res !== '') {
                            exito();
                            $("#txtcodeOP").val(res);
                            $("#hfCOD_OP").val(res);
                            $('#btnGrabar').css('display', 'none');
                            $('#btnActualizar').css('display', 'inline-block');

                        } else {
                            noexito();
                        }
                    }
                    Desbloquear("ventana");
                }).error(function () {
                    Desbloquear("ventana");
                    alertCustom("Error al grabar  operacion");
                });
            }
        } else {
            alertCustom("Debe agregar al menos un Tipo de Moneda para poder continuar.");
        }
    };

    var ActualizarOP = function () {

        var aValidar = ['txtcodeOP', 'txtdesc', 'cboTipoOp', 'cboTipoPersona'];

        if ($("#chkAutomatica").is(':checked')) {
            aValidar.push("cboPeriodicidad");
            aValidar.push("txtPlazo");
            aValidar.push("cboPlazo");
        }

        if ($("#chkDocumento").is(":checked")) {
            aValidar.push("cboDocumentoItem");
        }

        if (fnGetItemsTable("MONEDA") > 0) {
            if (vErrorsNotMessage(aValidar)) {

                var estado_ind;
                var mostrar_ind;
                var procint_ind;
                var genasiento_ind;
                var compuesta_ind;

                if ($('#chkEstadoOperacion').is(':checked')) {
                    estado_ind = "A"
                } else {
                    estado_ind = "I"
                }

                if ($('#chkMostrar').is(':checked')) {
                    mostrar_ind = "S"
                } else {
                    mostrar_ind = "N"
                }

                if ($('#chkProcesosInt').is(':checked')) {
                    procint_ind = "S"
                } else {
                    procint_ind = "N"
                }

                if ($('#chkGenAsiento').is(':checked')) {
                    genasiento_ind = "S"
                } else {
                    genasiento_ind = "N"
                }

                if ($("#chkAutomatica").is(":checked")) {
                    automatica_ind = "S"
                } else {
                    automatica_ind = "N"
                }

                compuesta_ind = "S"

                var data = new FormData();
                data.append('OPCION', 'AOP');
                data.append('OPR_CODE', $("#hfCOD_OP").val());
                data.append('DESCRIPCION', $("#txtdesc").val());
                data.append('TIPO_OPCODE', $("#cboTipoOp").val());
                data.append('MONTO_MIN', $("#txtValorMin").val());
                data.append('MONTO_MAX', $("#txtValorMax").val());
                data.append('ESTADO_IND', estado_ind);
                data.append('MOSTRAR_IND', mostrar_ind);
                data.append('PROC_INT_IND', procint_ind);
                data.append('GEN_ASIENTO_IND', genasiento_ind);
                data.append('COMPUESTA_IND', compuesta_ind);

                data.append('AUTOMATICA_IND', automatica_ind);
                data.append('PERIODICIDAD', $("#cboPeriodicidad").val());
                data.append('CANTPLAZO', $("#txtPlazo").val());
                data.append('PLAZO', $("#cboPlazo").val());
                data.append('TIPO_PERSONA', $("#cboTipoPersona").val());
                data.append('DOCUMENTO', $("#cboDocumentoItem").val());

                data.append('sDetalleMoneda', fnGetDetalle("MONEDA"));
                data.append('sDetalleEstado', fnGetDetalle("ESTADO"));


                Bloquear('ventana');

                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/OP/ajax/OPMOPER.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).success(function (res) {
                    if (res !== null) {
                        if (res.trim() == 'OK') {
                            exito();
                        } else {
                            noexito();
                        }
                    }
                    Desbloquear("ventana");
                }).error(function () {
                    Desbloquear("ventana");
                    alertCustom("Error al Actualizar los datos..!");
                });
            }
        } else {
            alertCustom("Debe agregar al menos un Tipo de Moneda para poder continuar.");
        }
    };

    var CargaInicial = function () {
        var codigo = ObtenerQueryString("codigo");
        if (codigo !== undefined) {

            $.ajax({
                type: "post",
                url: "vistas/OP/ajax/OPMOPER.ashx?OPCION=LOPU&OPR_CODE=" + codigo,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != null && datos.length > 0) {

                        $("#hfCOD_OP").val(datos[0].CODIGO);
                        $("#txtcodeOP").val(datos[0].CODIGO);

                        $("#txtdesc").val(datos[0].DESCRIPCION_OP);

                        $("#cboTipoOp").val(datos[0].CODETOP).change();
                        $("#txtTipoOp").val(datos[0].DESC_TIPOOP);

                        $("#txtValorMin").val(datos[0].VAL_MIN);
                        $("#txtValorMax").val(datos[0].VAL_MAX);

                        if (datos[0].MOSTRAR == "SI") {
                            $('#uniform-chkMostrar span').removeClass().addClass("checked");
                            $('#chkMostrar').attr('checked', true);
                        } else {
                            $('#uniform-chkMostrar span').removeClass();
                            $('#chkMostrar').attr('checked', false);
                        }
                        if (datos[0].PROC_INT == "SI") {
                            $('#uniform-chkProcesosInt span').removeClass().addClass("checked");
                            $('#chkProcesosInt').attr('checked', true);
                        } else {
                            $('#uniform-chkProcesosInt span').removeClass();
                            $('#chkProcesosInt').attr('checked', false);
                        }
                        if (datos[0].GEN_ASIENTO == "SI") {
                            $('#uniform-chkGenAsiento span').removeClass().addClass("checked");
                            $('#chkGenAsiento').attr('checked', true);
                        } else {
                            $('#uniform-chkGenAsiento span').removeClass();
                            $('#chkGenAsiento').attr('checked', false);
                        }

                        if (datos[0].COMPUESTA_IND == "SI") {
                            $('#uniform-chkCompuestaInd span').removeClass().addClass("checked");
                            $('#chkCompuestaInd').attr('checked', true);
                            $('#chkCompuestaInd').attr('disabled', 'disabled');
                        } else {
                            $('#uniform-chkCompuestaInd span').removeClass();
                            $('#chkCompuestaInd').attr('checked', false);
                        }
                        if (datos[0].ESTADO == "ACTIVO") {
                            $('#uniform-chkEstadoOperacion span').removeClass().addClass("checked");
                            $('#chkEstadoOperacion').attr('checked', true);
                        } else {
                            $('#uniform-chkEstadoOperacion span').removeClass();
                            $('#chkEstadoOperacion').attr('checked', false);
                        }

                        if (datos[0].AUTOMATICA_IND == "SI") {
                            $("#chkAutomatica").attr('checked', true).change();
                        } else {
                            $("#chkAutomatica").attr('checked', false).change();
                        }

                        $("#cboPeriodicidad").val(datos[0].PERIODICIDAD).change();
                        $("#txtPlazo").val((datos[0].NUMPLAZO == null ? 0 : datos[0].NUMPLAZO));
                        $("#cboPlazo").val(datos[0].PLAZO).change();
                        $("#cboTipoPersona").val(datos[0].TIPO_PERSONA).change();
                        
                        if (datos[0].DOCUMENTO == null) {
                            $("#chkDocumento").attr('checked', false).change();
                        } else {
                            $("#chkDocumento").attr('checked', true).change();
                        }

                        $("#cboDocumentoItem").val(datos[0].DOCUMENTO).change();
                        
                        fnCargarDetalle("MONEDA");
                        fnCargarDetalle("ESTADO");

                        $('#btnGrabar').css('display', 'none');
                        $('#btnActualizar').css('display', 'inline-block');

                    }
                    else {
                        alertCustom("Faltan datos en el listado de operaciones")
                        Desbloquear('ventana');
                    }
                },
                error: function (msg) {
                    noexitoCustom("Error al obtener datos  de la operacion...!");
                }
            });
        }
    };

    var eventoControles = function () {

        $("#btnNuevo").on("click", function () {
            if ($("#btnNuevo").attr("disabled") != 'disabled') {
                window.open("?f=OPMTIOP", '_blank');
            }
        });

        $("#btnGrabar").on("click", function () {
            if ($("#btnGrabar").attr("disabled") != 'disabled') {
                GrabarOP();
            }
        });

        $("#btnCancelar").on("click", function () {
            Cancelar();
        });

        $("#btnActualizar").on("click", function () {
            if ($("#btnActualizar").attr("disabled") != 'disabled') {
                ActualizarOP();
            }
        });

        $("#chkAutomatica").on("change", function () {

            if ($(this).is(':checked')) {
                Desbloquear("divAutomatica");
            } else {
                BloquearSinGif("#divAutomatica");
                $("#cboPeriodicidad").val('').change();
                $("#cboPlazo").val('').change();
                $("#txtPlazo").val('0');
            }

        });

        $("#chkDocumento").on("change", function () {

            if ($(this).is(':checked')) {
                Desbloquear("divDocumento");
            } else {
                BloquearSinGif("#divDocumento");
                $("#cboDocumentoItem").val('').change();
            }

        });

        $("#txtValorMin").on("change", function () {

            if ($(this).val() == "") {
                $(this).val('0');
            }

            fnValidarMontos();

        });

        $("#txtValorMax").on("change", function () {

            if ($(this).val() == "") {
                $(this).val('0');
            }

            fnValidarMontos();

        });

        $("#btnAgregarMoneda").on("click", function () {
            fnAgregar("MONEDA");
        });

        $("#btnAgregarEstado").on("click", function () {
            fnAgregar("ESTADO");
        });

    }

    var plugins = function () {

        aMayuscula(":input");
        $(".combo").select2();
        $('.danger-toggle-button-custom').toggleButtons({
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "info",
                disabled: "danger"
            },
            label: {
                enabled: "SI",
                disabled: "NO"
            }
        });

    }

    var listaTPC = function () {
        $.ajax({
            type: "post",
            url: "vistas/OP/ajax/OPMCOBE.ASHX?sOpcion=LTPC",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                var select = $("select#cboPeriodicidad");
                select.html("<option></option>");
                for (var i = 0; i < datos.length; i++) {
                    select.append("<option value='" + datos[i].CODIGO + "'>" + datos[i].DESCRIPCION + "</option>");
                }
            },
            error: function (msg) {
                noexitoCustom("Error al Listar Tipo de Periodicidad");
            }
        });
    }

    var listaTPP = function () {
        $.ajax({
            type: "post",
            url: "vistas/OP/ajax/OPMCOBE.ASHX?sOpcion=LTPP",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                var select = $("select#cboPlazo");
                select.html("<option></option>");
                for (var i = 0; i < datos.length; i++) {
                    select.append("<option value='" + datos[i].CODIGO + "'>" + datos[i].DESCRIPCION + "</option>");
                }
            },
            error: function (msg) {
                noexitoCustom("Error al Listar Tipo de Plazo");
            }
        });
    }

    var listaDocumentos = function () {

        //Carga Documentos
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCTIDC.ASHX?sOpcion=4&sEstado=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                var oDocumento = JSON.parse(datos);
                if (isEmpty(oDocumento))
                    return;
                //$("#cboDocumento").html("<option></option>");
                $("#cboDocumentoItem").html("<option></option>");
                $.each(oDocumento, function (key, value) {
                    //$("#cboDocumento").append("<option value='" + value.CodSunat + "'>" + value.cDescripcion + "</option>");
                    $("#cboDocumentoItem").append("<option value='" + value.CODIGO + "'>" + value.DESCRIPCION + "</option>");
                });
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });
    }

    var fnValidarMontos = function () {

        var nMontoMin = parseFloat($("#txtValorMin").val());
        var nMontoMax = parseFloat($("#txtValorMax").val());

        if (nMontoMax < nMontoMin) {
            alertCustom('El valor máximo no puede ser menos que el mínimo!!!');
            $("#txtValorMax").val(nMontoMin);
        }

    }

    var fnGetMonedas = function () {
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMMONE.ASHX?sOpcion=4",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                var oTipoMoneda = datos;
                $("#cboMoneda").html("<option></option>");
                $.each(oTipoMoneda, function (key, value) {
                    $("#cboMoneda").append("<option value='" + value.CODIGO + "'>" + value.DESCRIPCION + "</option>");
                });
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fnAgregar = function (tipo) {

        if (tipo == "ESTADO") {
            if (vErrors(["cboEstado"])) {

                if (fnExisteItem($("#cboEstado").val(), tipo)) {

                    $("#tblEstados tbody").append("<tr class='cItem' id='" + $("#cboEstado").val() + "'>" +
                                                        "<td>" + $.trim($("#cboEstado option:selected").text()) + "</td>" +
                                                        "<td style='text-align:center;'><button type='button' class='btn mini red quitar'><i class='icon-trash'></i>&nbsp Quitar</button></td>" +
                                                    "</tr>");

                    $("#tblEstados tbody .quitar").on('click', function () {
                        $(this).closest('tr').remove();
                    });

                    $("#cboEstado").val("").change();

                } else {

                    alertCustom("El Estado seleccionado ya se encuentra en la lista.");

                }
            }
        } else if (tipo == "MONEDA") {
            if (vErrors(["cboMoneda", "txtValorMin", "txtValorMax"])) {

                if (fnExisteItem($("#cboMoneda").val(),tipo)) {

                    $("#tblMontosMoneda tbody").append("<tr class='cItem' id='" + $("#cboMoneda").val() + "'>" +
                                                        "<td>" + $.trim($("#cboMoneda option:selected").text()) + "</td>" +
                                                        "<td class='cMinimo' style='text-align:center;'>" + $("#txtValorMin").val() + "</td>" +
                                                        "<td class='cMaximo' style='text-align:center;'>" + $("#txtValorMax").val() + "</td>" +
                                                        "<td style='text-align:center;'><button type='button' class='btn mini red quitar'><i class='icon-trash'></i>&nbsp Quitar</button></td>" +
                                                    "</tr>");

                    $("#tblMontosMoneda tbody .quitar").on('click', function () {
                        $(this).closest('tr').remove();
                    });

                    $("#cboMoneda").val("").change();
                    $("#txtValorMin").val("0");
                    $("#txtValorMax").val("0");

                } else {

                    alertCustom("El tipo de Moneda seleccionada ya se encuentra en la lista.");

                }
            }
        }

        

    }

    var fnExisteItem = function (valor,tipo) {

        var res = true;

        if (tipo == "ESTADO") {
            $("#tblEstados .cItem").each(function (i, val) {
                var actual = $.trim($(val).attr('id'));
                if (actual == valor) {
                    res = false;
                }
            });
        } else if (tipo == "MONEDA") {
            $("#tblMontosMoneda .cItem").each(function (i, val) {
                var actual = $.trim($(val).attr('id'));
                if (actual == valor) {
                    res = false;
                }
            });
        }
        

        return res;
    }
    
    var fnGetItemsTable = function (tipo) {
        var res = 0;

        if (tipo == "MONEDA") {
            $("#tblMontosMoneda .cItem").each(function (i, val) {
                res += 1;
            })
        } else if (tipo == "ESTADO") {
            $("#tblEstados .cItem").each(function (i, val) {
                res += 1;
            })
        }
        

        return res;
    }

    var fnGetDetalle = function (tipo) {

        var aDetalle = []

        if (tipo == "MONEDA") {
            $('#tblMontosMoneda tbody tr').each(function (i) {

                var oDetalle = {};

                oDetalle.CodEmpresa = $("#ctl00_hddctlg").val();
                oDetalle.CodOperacion = $("#txtcodeOP").val();
                oDetalle.CodTipoMoneda = $(this).attr("id");
                oDetalle.nValorMinimo = $.trim($(this).find('.cMinimo').text());
                oDetalle.nValorMaximo = $.trim($(this).find('.cMaximo').text());

                aDetalle.push(oDetalle);

            });
        } else if (tipo == "ESTADO") {
            $('#tblEstados tbody tr').each(function (i) {

                var oDetalle = {};

                oDetalle.CodEmpresa = $("#ctl00_hddctlg").val();
                oDetalle.CodOperacion = $("#txtcodeOP").val();
                oDetalle.IdEstado = $(this).attr("id");
                oDetalle.tFechaCreacion = "14/11/1991";
                oDetalle.CodUsuario = "CARMED"
                aDetalle.push(oDetalle);

            });
        }
        return JSON.stringify(aDetalle);

    }

    var fnCargarDetalle = function (tipo) {

        if (tipo == "MONEDA") {
            $.ajax({
                type: "POST",
                url: "vistas/OP/ajax/OPMOPER.ashx?OPCION=OTM&MONEDA=&OPR_CODE=" + $("#hfCOD_OP").val(),
                contentType: "application/json;",
                dataType: "json",
                success: function (res) {

                    if (res != null && res != "") {

                        for (var i = 0; i < res.length; i++) {

                            $("#cboMoneda").val(res[i].CodTipoMoneda).change();
                            $("#txtValorMin").val(res[i].nValorMinimo);
                            $("#txtValorMax").val(res[i].nValorMaximo);

                            fnAgregar(tipo);

                        }

                    } else {

                        alertCustom('Error al obtener el detalle de Operaciones por Tipo de Moneda');

                    }

                },
                error: function (msg) {

                    noexitoCustom('Error al obtener el detalle de Operaciones por Tipo de Moneda');

                }
            });
        } else if (tipo == "ESTADO") {
            $.ajax({
                type: "POST",
                url: "vistas/OP/ajax/OPMOPER.ashx?OPCION=OES&ESTADO=&OPR_CODE=" + $("#hfCOD_OP").val(),
                contentType: "application/json;",
                dataType: "json",
                success: function (res) {

                    if (res != null && res != "") {

                        for (var i = 0; i < res.length; i++) {

                            $("#cboEstado").val(res[i].IdEstado).change();

                            fnAgregar(tipo);

                        }

                    } else {

                        alertCustom('Error al obtener el detalle de Operaciones por Tipo de Moneda');

                    }

                },
                error: function (msg) {

                    noexitoCustom('Error al obtener el detalle de Operaciones por Tipo de Moneda');

                }
            });
        }

    }

    var CargarEstadosHijos = function (code_estado) {
        var select = $('#cboEstado');
        $.ajax({
            type: "post",
            url: "vistas/AD/ajax/ADLMOSO.ashx?OPCION=LEHIJOS&CODE_DEPEN=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].ID_ESTADO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar Estados de Socio.');
            }
        });
    };

    return {
        init: function () {
            plugins();
            AutocompletarTiposOP();
            listaTPC();
            listaTPP();
            listaDocumentos();
            fnGetMonedas();
            CargarEstadosHijos();
            eventoControles();
            CargaInicial();
            
        }
    };

}();

var OPLOPER = function () {

    var OtableOP;

    var iniciaTablaOP = function () {

        var parms = {
            data: null,
            columns: [

                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        $(td).css('width', '5%');
                    }
                },
                 {
                     data: "DESCRIPCION_OP",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'left');
                     }
                 },
                {
                    data: "DESC_TIPOOP",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'left');
                    }
                },
                {
                    data: "MOSTRAR",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
            ]

        }
        OtableOP = iniciaTabla("tblOP", parms);

        $('#tblOP tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                OtableOP.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = OtableOP.fnGetPosition(this);
                var row = OtableOP.fnGetData(pos);
                var cod = row.CODIGO;

                window.location.href = '?f=OPMOPER&codigo=' + cod;
            }
        });

    }

    var CargarOperaciones = function () {
        Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/OP/ajax/OPMOPER.ashx?OPCION=LOP",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    OtableOP.fnClearTable();
                    OtableOP.fnAddData(datos);
                    Desbloquear('ventana');
                }
                else {
                    alertCustom("No hay operaciones Registradas..!")
                    OtableOP.fnClearTable();
                    Desbloquear('ventana');
                }
            },
            error: function (msg) {
                noexitoCustom("Error al listar  operaciones...!");
                OtableTipoOP.fnClearTable();
            }
        });
    };

    return {
        init: function () {
            iniciaTablaOP();
            CargarOperaciones();

        }
    };

}();
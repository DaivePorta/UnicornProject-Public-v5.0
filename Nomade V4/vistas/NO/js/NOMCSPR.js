
var NOMCSPR = function () {
    var plugins = function () {
        $('#cboArea').select2();
        $('#cboSeccion').select2();
        $('#cboProceso').select2();
        $('#cboActividad').select2();
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
        $('#slsRequeIn').select2();

        $('#cboRque').select2();
        $('#cbPrioridad').select2();
        $("#txtcant").inputmask({ "mask": "9", "repeat": 9, "greedy": false });





    }

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

    var eventoControles = function () {


        $('#slsRequeIn').on('change', function () {
            if ($('#slsRequeIn').val() == 'I') {
                $('#cliente').css('display', 'none')
            }
            else {
                $('#cliente').css('display', 'block')
                //filltxtrazsocial_clientes('#txtCliente', '');
            }
        });


        $('input').on('keydown', function (e) {
            if (e.keyCode === 13) {
                var curreTabindex = $(this).attr('tabindex');
                var nextabindex = parseInt(curreTabindex) + 1;
                var nextfield = $('[tabindex=' + nextabindex + ']');

                if (nextfield.length > 0) {
                    nextfield.focus();
                    e.preventDefault();
                }
            }
        });
        //filltxtrazsocial('#txtdescprod', '');

        $("#btnAceptar").on("click", function () {
            REGISTRAR();
            $("#modal-confirmar").modal("hide");

        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");
            //$("#codigoEliminar").val("");
        });


        $('#cboEmpresas').on('change', function () {

            fillCboEstablecimiento();
            ListarAreas();
        });

        $('#cboArea').on('change', function () {

            ListarSeccioanes($('#cboArea').val());
        });

        $('#cboSeccion').on('change', function () {

            ListarProceso($('#cboSeccion').val());
        });


        $('#cboProceso').on('change', function () {

            ListarActividad($('#cboProceso').val());
        });

        $('#idRegis').on('click', function () {

            //REGISTRAR();

            if (oTableTReg.fnGetData().length == 0) {
                exito();
                window.location.href = '?f=NOLCCOM';
            }
            else {
                //$('.cantidad').attr('disabled', false);


                if (!vErrorBodyAnyElement('.cantidad')) {
                    $("#modal-confirmar").modal("show");
                }



            }

        });


    }

    function datosEliminar() {

        $('#detalle tbody').children().each(function (i) {

            var CODIGO, CANTIDAD;

            CODIGO = $(this).find('td').eq(0).text();

            if ($("#ch_" + CODIGO + "").is(":checked")) {
                eliminar(CODIGO);
            }



        });


    }

    function datosTabla() {
        var datos_tabla;
        var datos_fila = '';
        $('#detalle tbody').children().each(function (i) {

            var CODIGO, CANTIDAD, ESTADO;

            CODIGO = $(this).find('td').eq(0).text();


            CANTIDAD = $("#ch_" + CODIGO + "").is(":checked") ? 0 : $('#txt_' + CODIGO + '').val();



            ESTADO = $("#ch_" + CODIGO + "").is(":checked") ? "N" : "S"
            //txt_" + rowData.CODIGO

            datos_fila += CODIGO + ',' + CANTIDAD + ',' + ESTADO;
            datos_fila += '|';
        });
        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;
    }

    function REGISTRAR() {
        var tablas = datosTabla();
        var data = new FormData;


        data.append('P_APR_DETALLE', tablas);
        data.append('P_USU_APROBACION', $('#ctl00_txtus').val());
        data.append('P_CODE', $('#txtRequi').val());
        data.append('tipoRequerimiento', $('#cboRque').val());


        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=14",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (datos) {


                Desbloquear("ventana");
                if (datos == 'OK') {

                    exito();
                    $('.cantidad').attr('disabled', true);
                    $('#idRegis').remove();
                    $('#detalle').DataTable().columns(5).visible(false);
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
        var F = new Date();
        $("#txtFecha").attr('disabled', true);
        $("#txtSolici").attr('disabled', true);
        $("#txtRequi").attr('disabled', true);
        $("#txtUnidad").attr('disabled', true);
        $("#txtcodprod").attr('disabled', true);
        $("#txtFecha").val(F.getDate() + "/" + (F.getMonth() + 1) + "/" + F.getFullYear())
    }

    function cantidad() {
        var canti = document.getElementById("detalle").rows.length;
        alert(canti)
    }

    var datosDetalle = function () {
        var codigo = ObtenerQueryString('codigo');
        if (codigo !== undefined) {
            $.ajax({
                type: "post",
                url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=12&p_CODEDETALLE=" + codigo + "&P_ESTADO=" + '2',
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data !== null) {
                        var json = $.parseJSON(data)
                        llenaTabla(json)
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }
    };

    function llenaTabla(datos) {
        var parms = {
            data: datos,
            paging: false,
            filter: false,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').css('width', '10%');
                    }
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('width', '25%');
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<input id=txt_" + rowData.CODIGO + "  onkeypress='return ValidaDecimales(event,this)' tabindex=" + rowData.CODIGO + " class='cantidad span8' style='text-align: center' />");
                        $(td).css('text-align', 'center').css('width', '20%');
                        $("#txt_" + rowData.CODIGO + "").removeAttr('disabled');

                    }
                },
                {
                    data: "CANTIDAD_SOLI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').css('width', '20%');
                    }
                },
                {
                    data: "UNIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center').css('width', '15%');
                    }
                }, {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<input type='checkbox' id=ch_" + rowData.CODIGO + " class='chek' />");
                        $(td).css('text-align', 'center').css('width', '10%');
                        $("#ch_" + rowData.CODIGO + "").removeAttr('disabled');
                        $(td).children(".chek").click(function () {
                            if ($("#ch_" + rowData.CODIGO + "").is(':checked')) {
                                $("#txt_" + rowData.CODIGO + "").attr('disabled', true)
                                $("#txt_" + rowData.CODIGO + "").val(0);
                            } else {
                                $("#txt_" + rowData.CODIGO + "").attr('disabled', false)
                                $("#txt_" + rowData.CODIGO + "").val("");
                            }
                        });
                    }
                }
            ]

        }

        oTableTReg = iniciaTabla('detalle', parms);

        $('#detalle tbody').on('click', '.eliminar', function () {



            var pos = oTableTReg.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableTReg.fnGetData(pos);
            oTableTReg.fnDeleteRow(pos);

            eliminar(row.CODIGO);



        });

        $('#detalle tbody').on('keydown', 'input', function (e) {

            if (e.keyCode == 13) {
                var curreTabindex = $(this).attr('tabindex');
                var nextabindex = parseInt(curreTabindex) + 1;
                var nextfield = $('[tabindex=' + nextabindex + ']');

                if (nextfield.length > 0) {
                    nextfield.focus();
                    e.preventDefault();
                }

            }
        });
    }

    function eliminar(codigo) {

        //alert(codigo)

        var data = new FormData;
        data.append('P_CODE_DETA', codigo);
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMRSPR.ashx?OPCION=13",
            contentType: false,
            data: data,
            processData: false,
            cache: false,

            success: function (datos) {


                exito();
                //$('#txtRequi').val(datos)
                //exito();

                //$('#txt_' + codigoCaja).attr('disabled', true)


            },
            error: function (msg) {
                alert(msg);
            }
        });
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
                        $('#cboEmpresas').select2('val', data[0].CATALOGO).change();
                        $('#cboEstablecimiento').select2('val', data[0].ESTABLECIMIENTO);
                        $('#txtRequi').val(data[0].CODIGO);
                        $('#txtFecha').val(data[0].FECHA);
                        $('#txtSolici').val(data[0].SOLICITANTE);
                        $('#cbPrioridad').select2('val', data[0].PRIORIDAD);
                        $('#cboRque').select2('val', data[0].TIPOREQUE);

                        $('#cboArea').select2('val', data[0].AREA).change();

                        $('#cboSeccion').select2('val', data[0].SECCION).change();
                        $('#cboProceso').select2('val', data[0].PROCESO).change();
                        $('#cboActividad').select2('val', data[0].ACTIVIDAD).change();
                        $('#txtGlosa').val(data[0].GLOSA);

                        $('#div select').attr('disabled', true);
                        $('#div input[type="text"]').attr('disabled', true);

                        $('.cantidad').attr('disabled', false);

                        $('#div textarea').attr('disabled', true);
                        $('#oculta').remove();

                        $('#slsRequeIn').select2('val', data[0].IND_INTERNO).change();
                        $('#txtCliente').val(data[0].CLIENTE)
                        $('#btnMail').removeClass('hidden');
                    }
                },
                error: function (msg) {
                    alertCustom(msg.d);
                }
            });
        }
    };

    $('#cboALmc_tranf').change(function () {
        $('#txtorigenT').val($('#cboALmc_tranf :selected').attr('direccion'));
    });

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
            NombreUsuario();
            datosDetalle();
            cargarPOS();
        }
    };

}();

function ListarActividad(proceso) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=4&p_proceso=" + proceso + "&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboActividad').empty();
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboActividad').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboActividad').select2('val', datos[0].CODIGO);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $('#cboActividad').select2('destroy').select2();

}

function ListarProceso(seccion) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=3&p_seccion=" + seccion + "&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboProceso').empty();
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboProceso').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboProceso').select2('val', datos[0].CODIGO);

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $('#cboProceso').select2('destroy').select2();
    ListarActividad($('#cboProceso').val());
}

function ListarSeccioanes(area) {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=2&p_area=" + area + "&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboSeccion').empty();
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboSeccion').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboSeccion').select2('val', datos[0].CODIGO);


            }

        },
        error: function (msg) {
            alert(msg);
        }
    });
    $('#cboSeccion').select2('destroy').select2();
    ListarProceso($('#cboSeccion').val());
}

function ListarAreas() {
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=1&CTLG_CODE=" + $("#cboEmpresas").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboArea').empty();
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboArea').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboArea').select2('val', datos[0].CODIGO).change();



            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
    $('#cboArea').select2('destroy').select2();

    ListarSeccioanes($('#cboArea').val());
}

function filltxtrazsocial(v_ID, v_value, SERVICIO, TEXTI) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + $("#ctl00_hddctlg").val() + "&TEXTI=" + TEXTI + "&SERVICIO=" + SERVICIO,
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
        alertCustom("Ingrese Cantidad")
    }

    else {
        var a = {
            "CODIGO": $('#txtcodprod').val(),
            "DES_PRODUCTO": $('#txtdescprod').val(),
            "UNIDAD_MEDIDAD": $('#txtUnidad').val(),
            "CODIGO_MEDIDAD": $('#hdcodUNI').val(),
            "CANTIDAD": $('#txtcant').val(),
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

var fillCboEmpresa = function () {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboEmpresas').empty();
            $('#cboEmpresas').append('<option></option>');
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }

                //Iniciar valores con valores de login
                $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                fillCboEstablecimiento();
                ListarAreas();



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
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEst.empty();

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboEstablecimiento').select2('val', datos[0].CODIGO);
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
    $('#txtcodprod').val("");
    $('#txtdescprod').val("");
    $('#txtUnidad').val("");
    $('#txtcant').val("");

}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();
    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        Bloquear('divMail_body');
        destinos = destinos.toString();
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=SENDMAIL&REMITENTE=" + $('#txtRemitente').val() +
                "&NREMITENTE=" + $('#txtNRemitente').val() +
                "&DESTINATARIOS=" + destinos +
                "&ASUNTO=" + $('#txtAsunto').val() +
                "&MENSAJE=" + $('#txtcontenido').val() +
                "&EMPRESA=" + $('#ctl00_lbl_empresa').text() +
                "&ESTABLECI=" + $('#cboEstablecimiento option:selected').html() +

                "&SOLICITANTE=" + $('#txtSolici').val() +
                "&NUM_DOC_ORIGEN=" + $('#txtRequi').val() +

                "&Carea=" + $('#cboArea option:selected').html() +
                "&Cseccion=" + $('#cboSeccion option:selected').html() +
                "&Cproceso=" + $('#cboProceso option:selected').html() +
                "&Cactividad=" + $('#cboActividad option:selected').html() +

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
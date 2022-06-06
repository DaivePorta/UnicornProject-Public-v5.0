var NVLPRVE = function () {

    var plugins = function () {
        $("#cboGrupoProductos").select2();
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboVendedor').select2();
        $('#cboCliente').select2();
        $('#cboEntregado').select2();
        //$('#cboTipoVenta').select2();

        $('#cboTipoVenta').multiselect({
            nonSelectedText: 'Seleccione!'
        });


        $("#cboMoneda").select2();

        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });

    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            complete: function () {
                if (ObtenerQueryString("ctlg") == undefined) {
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                }
                fillCboEstablecimiento();
                fillCboVendedor();
                fillCliente();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                selectEst.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                    selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            complete: function () {
                if (ObtenerQueryString("scsl") == undefined) {
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                } else {
                    $("#cboEstablecimiento").select2("val", ObtenerQueryString("scsl"));
                    $("#txtDesde").val(ObtenerQueryString("desde"));
                    $("#txtHasta").val(ObtenerQueryString("hasta"));

                }
                fillcboMoneda();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    function fillCboVendedor(ctlg, scsl, estado, bAsync) {
        ctlg = $("#cboEmpresa").val()
        scsl = $("#cboEstablecimiento").val()
        estado = "";
        bAsync = true;
        if (bAsync == undefined) {
            bAsync = true;
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
                "&CTLG=" + ctlg +
                "&SCSL=" + scsl +
                "&p_ESTADO_IND=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: bAsync,
            success: function (datos) {
                $('#cboVendedor').empty();
                $('#cboVendedor').append('<option></option>');
                $('#cboVendedor').append('<option Value="TODOS">TODOS</option>');

                if (datos != null) {
                    var f = true;
                    var f2 = true;
                    var options = "";
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO == 'A' && f) {
                            options += '<optgroup label="ACTIVOS">';
                            f &= 0;
                        }
                        if (datos[i].ESTADO == 'I' && f2) {
                            if (f) options += '</optgroup>';
                            options += '<optgroup label="INACTIVOS" >';
                            f2 &= 0;
                        }
                        options += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                    }
                    options += '</optgroup>';
                }

                $('#cboVendedor').append(options);
                $('#cboVendedor').select2("val", "TODOS");

                if (ObtenerQueryString("pidmV") != undefined) {
                    if (ObtenerQueryString("pidmV") != "TODOS") {
                        $('#cboVendedor').select2("val", ObtenerQueryString("pidmV"));
                    }
                }
            },
            error: function (msg) {
                alertCustom("Vendedores no se listaron correctamente.");
            }
        });
    }

    var fillCliente = function () {
        var selectEst = $('#cboCliente');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboCliente').select2('val', 'TODOS');
        Bloquear("divCboCliente");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboCliente");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].ID + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                }
                $('#cboCliente').select2('val', 'TODOS');
                if (ObtenerQueryString("pidmC") != undefined) {
                    var pidm = pad(ObtenerQueryString("pidmC"), 9);
                    $('#cboCliente').select2("val", pidm);
                    obtenerProdVendidos();
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var fillGrupoProductos = function () {

        var select = $('#cboGrupoProductos');
        select.empty();
        //select.append('<option></option>');
        $('#cboGrupoProductos').select2('val', '');
        $.ajax({
            type: "post",
            url: "vistas/NM/ajax/NMMFPRO.ashx?OPCION=4&CTLG_CODE=" + $("#cboEmpresa").val() + "&OPCION2=-",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear("divGrupProd"); },
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboGrupoProductos').select2('val', '');
            },
            complete: function () { Desbloquear("divGrupProd"); },
            error: function (msg) {
                alert(msg.d);
            }
        });

    }

    var fillcboMoneda = function () {
        var mon = "";
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboMoneda').empty();
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                    mon = datos[pos].CODIGO;
                }

            },
            complete: function () {
                $('#cboMoneda').select2("val", mon);
                if (ObtenerQueryString("pidmC") == undefined) {
                    obtenerProdVendidos();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var crearTablaVacia = function () {
        var parms = {
            data: null,
            columns: [
                    {
                        data: "CODE_PROD_ANT", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                    },
                    {
                        data: "DESC_PROD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }


                    },
                    {
                        data: "MARCA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "GRUPO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "SUBGRUPO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "UNME", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                    },
                    {
                        data: "CANTIDAD", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); }

                    },
                    {
                        data: "TOTAL", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right").html(rowData.SIMBOLO_MONEDA + " " + formatoMiles(rowData.TOTAL))

                        }

                    }
            ],
            stateSave: false,
            "sDom": 'TC<"clear">lfrtip',
            "oTableTools": {
                "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copiar"
                    },
                    {
                        "sExtends": "pdf",
                        "sPdfOrientation": "landscape",
                        "sButtonText": "Exportar a PDF"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Exportar a Excel"
                    }
                ]
            },
            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                        i : 0;
                };

                var autoSuma = function (p_Array) {
                    if (p_Array.length)
                        return p_Array.reduce(function (a, b) { return intVal(a) + intVal(b); });
                    else
                        return 0;
                };

            }
        }


        oTable = iniciaTabla('tblDocumento', parms);
        //  $(".ColVis.TableTools").remove();
        actualizarEstilos();
        $('#tblDocumento tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
            }
        });
        $('#tblDocumento tbody').on('click', 'a', function () {
            $(this).parent().parent().addClass('selected');
        });
    }

    var obtenerProdVendidos = function () {
        var data = new FormData();
        var CTLG_CODE = $("#cboEmpresa").val();
        var SCSL_CODE = $("#cboEstablecimiento").val();
        var MONEDA_CODE = $("#cboMoneda").val();
        var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
        var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : parseFloat($("#cboCliente :selected").val()).toString();
        //var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('MONEDA_CODE', MONEDA_CODE);
        data.append('VENDEDOR', VENDEDOR);
        data.append('CLIENTE', CLIENTE);        
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());
        data.append('ENTREGADO', $("#cboEntregado").val());
        data.append('TIPO_VENTA', $("#cboTipoVenta").val());


        $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLPRVE.ashx?OPCION=LR",
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            beforeSend: function () { Bloquear("divDocumento"); },
            cache: false,
            async: true,
            success: function (datos) {


                oTable.fnClearTable();
                if (datos.length > 0) {
                    oTable.fnAddData(datos);
                    oTable.fnSort([[1, "desc"]]);

                } else {
                    infoCustom2("No se encontraron Datos!");
                }
            },
            complete: function () { Desbloquear("divDocumento"); },
            error: function () {
                Desbloquear("divDocumento");
                noexito();
            }
        });

    }

    function cargainicial() {

        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboVendedor();
            fillCliente();
            fillGrupoProductos();
            Desbloquear("ventana");
        });

        $("#cboGrupoProductos").on("change", function () {

        });

        $("#btnFiltrarProdVen").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                obtenerProdVendidos();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                obtenerProdVendidos();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("REPORTE PRODUCTOS VENDIDOS - " + $("#cboEstablecimiento :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html("<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p><p>ESTABLECIMIENTO: " + $("#cboEstablecimiento :selected").html() +
                              "<p>VENDEDOR: " + $("#cboVendedor :selected").html() + "</p><p>CLIENTE: " + $("#cboCliente :selected").html() +
                              "</p><p>DESDE: " + ($("#txtDesde").val() == "" ? "INICIO" : $("#txtDesde").val()) + "</p><p>HASTA: " +
                              ($("#txtHasta").val() == "" ? "FIN" : $("#txtHasta").val()) + "</p>");
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
        });

        $('#cboTipoVenta').val('V');
        $("#cboTipoVenta").multiselect('refresh');
        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);
    }

    return {
        init: function () {
            plugins();
            crearTablaVacia();
            fillCboEmpresa();
            cargainicial();

        }
    };
}();


//EMAIL
function cargarCorreos() {
    ObtenerCorreoUsuario();
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

    if ($("#txtRemitente").val() == "") {
        $("#txtRemitente").val($("#ctl00_lblusuario").html() + "@gmail.com");
    }
};


function cargarCorreos() {
    ObtenerCorreoUsuario();
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
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

var ObtenerCorreoUsuario = function () {
    var email = "";
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ashx?OPCION=RU&ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                email = datos[0].EMAIL;
            } else {
                alertInfo("No se encontro ningun email para remitente!");
            }
        },
        complete: function () {
            $("#txtRemitente").val(email);
        },
        error: function (msg) {
            alert(msg);
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
        $("#tblDocumento_length select").val("-1").change()
        data.append('HTMLMENSAJE', $("#datos_correo").html() + $("#tblDocumento")[0].outerHTML.replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;'));
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


$("#divMail").on("show", function () {

    $("#modal_info").modal("hide");

});
$(".close_mail").on("click", function () {

    $("#modal_info").modal("show");

});


function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
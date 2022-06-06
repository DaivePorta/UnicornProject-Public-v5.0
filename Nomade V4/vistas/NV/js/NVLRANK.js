var ajaxListado = null;
var ajaxVendedor = null;

var NVLRANK = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboEstablecimiento,#cboMoneda,#cboVendedor').select2();

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

        Highcharts.setOptions({
            lang: {
                printChart: 'Imprimir gráfico',
                downloadJPEG: 'Descargar JPEG',
                downloadPDF: 'Descargar PDF',
                downloadPNG: 'Descargar PNG',
                downloadSVG: 'Descargar SVG'
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
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $("#cboEmpresa").select2("val", '');
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
            $("#cboEmpresa").select2("val", '');

        }
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var fillCboMoneda = function () {
        Bloquear($($('#cboMoneda').parents("div")[0]));
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                    $('#cboMoneda').select2("val", datos[pos].CODIGO);
                }
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente");
            },
            complete: function (msg) {
                Desbloquear($($('#cboMoneda').parents("div")[0]));
            }
        });
    }

    var fillCboVendedor = function (ctlg, scsl, estado, bAsync) {
        if (bAsync == undefined) {
            bAsync = true;
        }
        if (ajaxVendedor) {
            ajaxVendedor.abort();
        }
        Bloquear($($('#cboVendedor').parents("div")[0]));
        ajaxVendedor = $.ajax({
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
            },
            error: function (msg) {
                if (msg.statusText != "abort") {
                    alertCustom("Vendedores no se listaron correctamente.");
                }
            },
            complete: function (msg) {
                Desbloquear($($('#cboVendedor').parents("div")[0]));
            }
        });
    }

    var IniciaTabla = function () {

        var parms = {
            data: null,
            columns: [
                {
                    data: null,//RANKING
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).css('background-color', '#cbcbcb !important')
                    }
                },
                {
                    data: "CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }                    
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        var simbolo = '<span style="float:left">' + $("#cboMoneda option:selected").attr("simbolo") + '</span>';
                        if (simbolo==undefined) {
                            simbolo = "";
                        }
                        $(td).html(simbolo + formatoMiles(rowData.MONTO));

                    },
                    width: 120
                },
                {
                    data: "UTILIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
                        var simbolo = '<span style="float:left">' + $("#cboMoneda option:selected").attr("simbolo") + '</span>';
                        if (simbolo == undefined) {
                            simbolo = "";
                        }
                        $(td).html(simbolo + formatoMiles(rowData.UTILIDAD));
                    },
                    width: 120
                },
                {
                    data: "NRO_VENTAS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html('\
                            <a class="btn red btn1" title="Productos Vendidos">P</a>\
                            <a class="btn green btn2" title="Utilidad Bruta">U</a>\
                            <a class="btn blue btn3" title="Documentos de Venta">V</a>\
                       ');
                        $(td).css('text-align', 'center');
                    },
                    width: 120
                }
            ],
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],
            "order": [[2, 'desc']],
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
            }
        }
        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        actualizarEstilos();


        var t = $('#tblDatos').DataTable();

        t.on('order.dt search.dt', function () {
            t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#tblDatos tbody').on('click', 'tr .btn1', function () {
            var pos = oTable.fnGetPosition($(this).parents('tr')[0]);
            var row = oTable.fnGetData(pos);
            var ctlg = $("#cboEmpresa").val();
            var scsl = $("#cboEstablecimiento").val();
            var desde = $("#txtDesde").val();
            var hasta = $("#txtHasta").val();
            var pidmC = row.PIDM_CLIENTE;
            var pidmV = $("#cboVendedor").val();

            var str = '?f=NVLPRVE' +
                 "&ctlg=" + ctlg+
                 "&scsl=" + scsl+
                 "&desde=" + desde+
                 "&hasta=" + hasta+
                 "&pidmC=" + pidmC +
                 "&pidmV=" + pidmV
            ; 
            window.open(str, '_blank');
        });

        $('#tblDatos tbody').on('click', 'tr .btn2', function () {
            var pos = oTable.fnGetPosition($(this).parents('tr')[0]);
            var row = oTable.fnGetData(pos);
            var ctlg = $("#cboEmpresa").val();
            var scsl = $("#cboEstablecimiento").val();
            var desde = $("#txtDesde").val();
            var hasta = $("#txtHasta").val();
            var pidmC = row.PIDM_CLIENTE;
            var pidmV = $("#cboVendedor").val();
            var str= '?f=NVLUTBR' +
                 "&ctlg=" + ctlg +
                 "&scsl=" + scsl +
                 "&desde=" + desde +
                 "&hasta=" + hasta +
                 "&pidmC=" + pidmC +
                 "&pidmV=" + pidmV
            ;
            window.open(str, '_blank');

        });

        $('#tblDatos tbody').on('click', 'tr .btn3', function () {
            var pos = oTable.fnGetPosition($(this).parents('tr')[0]);
            var row = oTable.fnGetData(pos);
            var ctlg = $("#cboEmpresa").val();
            var scsl = $("#cboEstablecimiento").val();
            var desde = $("#txtDesde").val();
            var hasta = $("#txtHasta").val();
            var pidmC = row.PIDM_CLIENTE;
            var pidmV = $("#cboVendedor").val();
            var str = '?f=NVLDOCV' +
                 "&ctlg=" + ctlg +
                 "&scsl=" + scsl +
                 "&desde=" + desde +
                 "&hasta=" + hasta +
                 "&pidmC=" + pidmC +
                 "&pidmV=" + pidmV
            ;
            window.open(str, '_blank');
        });
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $("#cboEstablecimiento").on("change", function () {
            fillCboVendedor($("#cboEmpresa").val(), $("#cboEstablecimiento").val(), "A", true);
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboMoneda", "cboEmpresa", "cboEstablecimiento"])) {
                if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                    Listar();
                } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                    Listar();
                } else {
                    infoCustom2("Ingrese ambas fechas para filtrar por Fecha.")
                }               
            }
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("POSICION GLOBAL - " + $("#cboEmpresa :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html("<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p>");
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
        });

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboMoneda();
            eventoControles();
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
            IniciaTabla();
            Listar();
        }
    };

}();

var Listar = function () {
    var continuar = true;
    if (continuar) {

        var data = new FormData();
        data.append('p_USUA_ID', $("#ctl00_txtus").val());
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_MONE_CODE', $("#cboMoneda").val());
        data.append('p_DESDE', $("#txtDesde").val());
        data.append('p_HASTA', $("#txtHasta").val());
        data.append('p_VENDEDOR', $("#cboVendedor").val());
        

        Bloquear('ventana');
        if (ajaxListado) {
            ajaxListado.abort();
        }
        ajaxListado = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLRANK.ASHX?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            oTable.fnClearTable();
            if (datos != null && datos.length > 0) {
                oTable.fnAddData(datos);
                oTable.fnAdjustColumnSizing();
            }

        }).error(function (msg) {
            if (msg.statusText != "abort") {
                alertCustom("Error al recuperar la información. Por favor intente nuevamente.");
            }
        }).complete(function () {
            Desbloquear("ventana");
        });
    }
}

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
        data.append('HTMLMENSAJE', $("#datos_correo").html() + $(".divTblCustom").html().replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;').split('height: 0px;').join().split('height:0').join());
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

function ImprimirDcto() { //arreglo de div(s) que iran,titulo(opcional) 
    if ($("#styleImpresion").html() == undefined) {
        var estilos = '<style id="styleImpresion">@media print {.bn{border:none !important;} .chat-window {display: none !important;}.navbar-inner {display: none !important;}.page-sidebar {display: none  !important;}.footer {display: none  !important;}.page-content {margin-left: 0px  !important;}#contenedorBreadcrumb{ display: none  !important;}.page-container {margin-top: 0px  !important;}#divDctoImprimir {display: block  !important;width: 100%  !important;}.container-fluid {padding: 0px  !important;}.dn{display:none !important;}}</style>';
        $("#ventana").append(estilos);
    }
    $("#divDctoImprimir").html($(".divTblCustom").html());
    setTimeout(function () {
        window.print();
    }, 200)    
}

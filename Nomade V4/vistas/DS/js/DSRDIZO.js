var oTable;

var DSRDIZO = function () {

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var plugins = function () {
        $("#cboEmpresa,#cboEstablecimiento,#cboZona").select2();

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
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
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
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
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
                //$('#cboEstablecimiento').append('<option value="">TODOS</option>');
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

    var fillCboZona = function () {
        $.ajax({
            type: "post",
            url: "vistas/ds/ajax/dsmzona.ashx?OPCION=3" +
            "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
            "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
            "&p_ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboZona').empty();
                $('#cboZona').append('<option value="">TODOS</option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboZona').append('<option value="' + datos[i].CODIGO + '" >' + datos[i].NOMBRE + '</option>');
                    }
                }
                $('#cboZona').select2('val', '').change();
            },
            error: function (msg) {
                alertCustom("Zonas no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $("#cboEstablecimiento").on("change", function () {
            fillCboZona();
        });

        $("#buscar").on("click", function () {
            Listar();
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("VENTAS POR ZONA DE DISTRIBUCIÓN (" + $("#cboZona :selected").html() + " - " + $("#cboEstablecimiento :selected").html() + ")");
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html("<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p><p>ESTABLECIMIENTO: " + $("#cboEstablecimiento :selected").html() + "</p><p>ZONA DISTRIBUCIÓN: " + $("#cboZona :selected").html() + "</p>");
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
        });
    }

    var Listar = function () {
        if (vErrors(['cboEmpresa','cboEstablecimiento'])) {
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_ZONA_CODE', $("#cboZona").val());
            data.append('p_FECHA_INI', $("#txtDesde").val().trim());
            data.append('p_FECHA_FIN', $("#txtHasta").val().trim());
            
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/ds/ajax/DSLRPRT.ashx?OPCION=2",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true
            })
           .success(function (datos) {
               Desbloquear("ventana");
               oTable.fnClearTable();
               if (datos != null && datos.length > 0) {
                   oTable.fnAddData(datos);
                   oTable.fnAdjustColumnSizing();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
    }

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DOCUMENTO_VENTA",
                   createdCell: function (td, cellData, rowData, row, col) {                       
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DIRECCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                       $(td).attr('align', 'left')
                    }
                }, {
                    data: "ZONA",
                    createdCell: function (td, cellData, rowData, row, col) {
                       $(td).attr('align', 'left')
                    }
                }, {
                    data: "PESO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'right')
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
                        "sButtonText": "Exportar a Excel "
                    }
                ]
            }
           , "paginate": true,
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
                       return p_Array.reduce(function (a, b) { return parseFloat(a) + parseFloat(b); });
                   else
                       return 0;
               };

               // Total over this page
               if (api.column(0).data().length) {
                   var auxArray = new Array();
                   //filtro
                   auxArray.push(api.columns(5, { page: 'current' }).data()[0]);

                   /*api.columns(0, { page: 'current' }).data()[0].filter(function (e, d) {
                       if (e.MONEDA == '0002')
                           auxArray.push(e.VALOR);
                       else
                           auxArray2.push(e.VALOR)
                   });*/

                   pageTotalpeso = autoSuma(auxArray[0]);


               } else {
                   pageTotalpeso = 0;
               };

               $("#pesototal").html(formatoMiles(pageTotalpeso).toString());


           }
        }

        oTable = iniciaTabla('tblDatos', parms);
        actualizarEstilos();
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            fillCboZona();
            IniciaTabla();
            Listar();
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
        data.append('HTMLMENSAJE', $("#datos_correo").html() + $("#tblDatos")[0].outerHTML.replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;').split('height: 0px;').join().split('height:0').join());
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


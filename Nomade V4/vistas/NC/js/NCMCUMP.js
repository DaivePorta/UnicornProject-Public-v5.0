
var oTable;

//--------LISTADO
var NCMCUMP = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();
        $("#cboEstablecimiento").select2();
        $("#txtMesDesde").datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());
        $("#txtMesHasta").datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());
        $('#txtMesHasta').datepicker('setStartDate', $('#txtMesDesde').datepicker('getDate'));
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
                $('#cboEstablecimiento').append('<option value="">TODOS</option>');
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

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $("#buscar").on("click", function () {
            Listar();
        });

        $('#txtMesDesde').datepicker().on("change", function () {
            $('#txtMesHasta').datepicker('setStartDate', $('#txtMesDesde').datepicker('getDate'));
        });
    }

    var Listar = function () {
        if (vErrors(['cboEmpresa'])) {
            var data = new FormData();
            var mesDesde = ($("#txtMesDesde").datepicker('getDate').getMonth() + 1).toString().length == 1 ? "0" + ($("#txtMesDesde").datepicker('getDate').getMonth() + 1).toString() : ($("#txtMesDesde").datepicker('getDate').getMonth() + 1).toString();
            var mesHasta = ($("#txtMesHasta").datepicker('getDate').getMonth() + 1).toString().length == 1 ? "0" + ($("#txtMesHasta").datepicker('getDate').getMonth() + 1).toString() : ($("#txtMesHasta").datepicker('getDate').getMonth() + 1).toString();


            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_MES_DESDE', mesDesde);
            data.append('p_MES_HASTA', mesHasta);
      
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nc/ajax/NCMCUMP.ashx?OPCION=3",
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
                    data: { _: "FECHA", sort: "FECHA_ORDEN" },                   
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.FECHA == null || rowData.FECHA == "") {
                            $(td).html("-");
                        } else {
                            var dia = rowData.FECHA.split('-')[0];
                            var mes = rowData.FECHA.split('-')[1];
                            var nMes = "";
                            switch (mes) {
                                case "1":
                                    nMes = "Ene";
                                    break;
                                case "2":
                                    nMes = "Feb";
                                    break;
                                case "3":
                                    nMes = "Mar";
                                    break;
                                case "4":
                                    nMes = "Abr";
                                    break;
                                case "5":
                                    nMes = "May";
                                    break;
                                case "6":
                                    nMes = "Jun";
                                    break;
                                case "7":
                                    nMes = "Jul";
                                    break;
                                case "8":
                                    nMes = "Ago";
                                    break;
                                case "9":
                                    nMes = "Sep";
                                    break;
                                case "10":
                                    nMes = "Oct";
                                    break;
                                case "11":
                                    nMes = "Nov";
                                    break;
                                case "12":
                                    nMes = "Dic";
                                    break;
                                default:

                            }
                            $(td).html(dia+" - "+nMes);                           
                        }
                    }
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    data: "CARGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "TELEFONO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')                     
                    }
                },
                {
                    data: "CORREO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,                
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.CORREO == null || rowData.CORREO == "") {
                            $(td).html('');
                        } else {
                            $(td).html('<a class="btn purple"><i class="icon-envelope"></i></a>');                            
                        }
                    }
                }
            ]            
        }

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');      


        $('#tblDatos tbody').on('click', 'a', function () {
           // $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
           //                                                                                                                                                                                                                                                                                                                                                                          var cod = row.CODIGO;
            MostrarEnviarCorreo(row.CORREO,row.NOMBRE);
        });

    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            IniciaTabla();
            Listar();
        }
    };
}();


function MostrarEnviarCorreo(CORREO,NOMBRE) {

        $('#txtcontenido').attr('disabled', false);
        $('#txtAsunto').val("Feliz Cumpleaños");
        var div = document.createElement("div");
        div.id = "tempDiv";
        $(div).html("<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p>");
        $("#datos_correo").html($(div).html());
        cargarCorreos();
        $('#divMail').modal('show');

        setTimeout(function () {
            var selectize = $("#cboCorreos")[0].selectize;
         
            selectize.addOption({ email: CORREO, name: NOMBRE, usuario: 'USUARIO' });
            selectize.addItem(CORREO);
            selectize.refreshOptions();
            selectize.setValue(CORREO);

            $("#txtcontenido").val("FELIZ CUMPLEAÑOS " + NOMBRE);
            $('.selectize-dropdown').hide();
            $('.selectize-input').removeClass('focus input-active dropdown-active');
            $('div.selectize-input > input').blur();

        }, 500);

  
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
        data.append('NREMITENTE', $('#txtRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $("#datos_correo").html());
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

//-----------
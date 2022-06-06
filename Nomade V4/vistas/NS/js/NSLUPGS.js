
var NSLUPGS = function () {
    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
        $('#btnMail').attr('disabled', true);
        $('#btnImprimir').attr('disabled', true);
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

    var ListarSucursales = function (ctlg) {
        var bool = false;
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
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {

                        $("#slcSucural").select2("val", "");
                    }


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

    var fillBandeja = function () {


        var parms = {
            data: null,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "BENEFICIARIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "USER_SOLIC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "FECHA_SOLIC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "USER_APR",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "FECHA_APR",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "USER_PAGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "FECHA_PAGP",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
            ]

        }

        oTableUSGST = iniciaTabla('tbl_gastos_usuario', parms);
        //$('#tbl_gastos_usuario').removeAttr('style');
        //$('#tbl_gastos_usuario tbody').on('click', 'tr', function () {
        //    if ($(this).hasClass('selected')) {
        //        $(this).removeClass('selected');
        //    }
        //    else {
        //        oTableGST.$('tr.selected').removeClass('selected');
        //        $(this).addClass('selected');
        //        var pos = oTableGST.fnGetPosition(this);
        //        var row = oTableGST.fnGetData(pos);
        //        var CODIGO = row.CODIGO;
        //        window.location.href = '?f=cpmpgas&codigo=' + CODIGO;


        //    }
        //});

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

    var eventos = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana");
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 1000);
                emp_ant = $(this).val();
                Desbloquear("ventana");
            } else { emp_ant = ""; Desbloquear("ventana"); }
        });

        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
                var datosUsuario = devuelveDatosUsuario(usuario)
                var aa = $("#optanho").val();
                var mm = $("#optmes").val();
                var asunto = "REPORTE DE GASTOS POR USUARIOS"
                var data = oTableUSGST.fnGetData();
                var tabla = "";
                tabla += '<table border="1" style="font-family: serif;border-collapse:collapse;">';
                tabla += '<thead style="background-color: rgb(52, 112, 160); color: aliceblue;">'
                tabla += '<tr>'
                tabla += '<th style="width: 10%; background-color: #4585F2;height:65px;">Gasto'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">Beneficiario'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">Monto'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">Solicita'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">F.Solicita'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">Aprueba'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">F.Aprueba'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">Paga'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4585F2;">F.Paga'
                tabla += '</th>'
                tabla += '</tr>'
                tabla += '</thead>'
                tabla += '<tbody>'
                for (var i = 0 ; i < data.length ; i++) {

                    if (i % 2 == 0) {
                        tabla += '<tr style="background-color:white;">'

                    } else {
                        tabla += '<tr style="background-color:antiquewhite;">'
                    }

                    tabla += '<td align="left">'   + data[i].GLOSA + '</td>'
                    tabla += '<td align="left">'   + data[i].BENEFICIARIO + '</td>'
                    tabla += '<td align="center">' + data[i].MONTO + '</td>'
                    tabla += '<td align="center">' + data[i].USER_SOLIC + '</td>'
                    tabla += '<td align="center">' + data[i].FECHA_SOLIC + '</td>'
                    tabla += '<td align="center">' + data[i].USER_APR + '</td>'
                    tabla += '<td align="center">' + data[i].FECHA_APR + '</td>'
                    tabla += '<td align="center">' + data[i].USER_PAGO + '</td>'
                    tabla += '<td align="center">' + data[i].FECHA_PAGP + '</td>'
                    tabla += '</tr>'
                }
                tabla += '</tbody>'
                tabla += '</table>'

                $('#txtAsunto').val(asunto);
                $('#lblAsunto').text(asunto);
                $('#lblEmpresa').text($('#slcEmpresa :selected').html())
                $('#lblSucursal').text($('#slcSucural :selected').html());
                $('#hftabla').val('');
                $('#hftabla').val(tabla);
                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                cargarCorreos();
                $('#divMail').modal('show');
            }

        });

        $('#btnImprimir').click(function (e) {
            if ($('#btnImprimir').attr('disabled') != 'disabled') {
                imprimirDiv('tbUsrgastos');
            }
        });

    }
    
    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            eventos();
            inifechas('txt_fdel', 'txt_fal');
            fillBandeja();
            cargarCorreos();

        }
    };

}();

var rep_gastos_user = function () {
    var p_CTLG_CODE = '';
    var p_SCSL_CODE = '';
    var p_FDEL = '';
    var p_FAL = '';

    p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    p_SCSL_CODE = $.trim($('#slcSucural').val());
    p_FDEL = $.trim($('#txt_fdel').val());
    p_FAL = $.trim($('#txt_fal').val());

    var data = new FormData();
    var arraY = ["slcEmpresa", "slcSucural", "txt_fdel", "txt_fal"];
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_SCSL_CODE", p_SCSL_CODE);
    data.append("p_FDEL", p_FDEL);
    data.append("p_FAL", p_FAL);

    if (vCamposO(arraY)) {

        Bloquear("ventana");

        $.ajax({
            url: "vistas/NS/ajax/NSLUPGS.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos != null && datos != "") {
                    $('#btnMail').attr('disabled', false);
                    $('#btnImprimir').attr('disabled', false);
                    oTableUSGST.fnClearTable();
                    oTableUSGST.fnAddData(datos);

                } else { oTableUSGST.fnClearTable(); }
                Desbloquear("ventana");
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Listado!")
            }
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
        data.append('HTMLMENSAJE', $('#datos_correo').html() + $("#hftabla").val());
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

var NFLVANU = function () {

    var cargacombos = function () {
        
        $.ajax({
            type: "post",
            url: "vistas/nf/ajax/nflvanu.ashx?opcion=1",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcAnio').empty();
                $('#slcAnio').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#slcAnio').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    var t=new Date();
                    $('#slcAnio').val(t.getFullYear());
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#slcAnio').select2();
        $("#slcMes").datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate",new Date());

    }

    var fillCboempresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar empresas.');
            }
        });
        $("#slcEmpresa").select2();
    }
    
    var ListarEstablecimiento = function () {
        //var select = $('#slcscsl').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcscsl').empty();
                $('#slcscsl').append('<option></option>');
                $('#slcscsl').append('<option value="">TODOS</option>');
                if (datos !== null) {
                    //$('#cbo_establecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $("#slcscsl").append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcscsl").val($('#ctl00_hddestablecimiento').val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
        //$(select).select2();
        $("#slcscsl").select2();
    }

    var eventoControles = function () {
        $("#slcEmpresa").on('change', function () {
            ListarEstablecimiento($('#slcEmpresa').val());
        });

        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
                var datosUsuario = devuelveDatosUsuario(usuario)

                var asunto = "Cálculo del IGV y Anticipo Renta de 3ra - " + $("#slcMes").val() + " " + $("#slcAnio").val();
                
                //var tabla = $("#tblProductos")[0].outerHTML;
                var mes = ($("#slcMes").datepicker('getDate').getMonth() + 1).toString().length == 1 ? "0" + ($("#slcMes").datepicker('getDate').getMonth() + 1).toString() : ($("#slcMes").datepicker('getDate').getMonth() + 1).toString();
                /*$.ajax({
                    type: "POST",
                    url: "vistas/nf/ajax/nflvanu.ashx?OPCION=3&pMes=" + mes + '&pAnio=' + $('#slcAnio').val() + "&pctlg=" + $("#slcEmpresa").val() + "&pscsl=" + $("#slcscsl").val(),
                    async: false,
                    success: function (datos) {
                        if (datos != null) {
                            tabla = datos;
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });*/

                $('#txtAsunto').val(asunto);
                $('#lblAsunto').text(asunto);
                $('#lblEmpresa').text($('#slcEmpresa :selected').html());
                $('#lblSucursal').text($('#slcscsl :selected').html());
                $('#hftabla').val('');                
                $('#hftabla').val($("#tblProductos")[0].outerHTML);
                //$('#hftabla').val($("#tblbmodal")[0].outerHTML.toString().replace('id="tblbmodal"', "") + '<br/>' + $("#tblbmodalRA")[0].outerHTML.toString().replace('id="tblbmodalRA"', "") + '<br/>' + $("#tblbmodal2")[0].outerHTML.toString().replace('id="tblbmodal2"', ""));
                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                cargarCorreos();
                $('#divMail').modal('show');
            }

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

    function cargadatosempresa() {
        $.ajax({
            url: "vistas/nf/ajax/nflvanu.ashx?OPCION=4&pctlg=" + $('#ctl00_hddctlg').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#NombreEmpresa").html(datos[0].NOMEMPRESA);
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    //function CargarGrilla(oTable) {
    function CargarGrilla() {
        var mes = ($("#slcMes").datepicker('getDate').getMonth() + 1).toString().length == 1 ? "0" + ($("#slcMes").datepicker('getDate').getMonth() + 1).toString() : ($("#slcMes").datepicker('getDate').getMonth() + 1).toString();
        $.ajax({
            type: "POST",
            url: "vistas/nf/ajax/nflvanu.ashx?OPCION=3&pMes=" + mes + '&pAnio=' + $('#slcAnio').val() + "&pctlg=" + $("#slcEmpresa").val() + "&pscsl=" + $("#slcscsl").val(),
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#tblProductos').html(datos)
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function LlenarGrilla(data_json, otable) {

        otable.fnClearTable();
        otable.fnAddData(data_json);
    }

    function cargaTitulo() {

        var informacion = "<H2>Cálculo del IGV y Anticipo Renta de 3ra</H2>";
        $("#txtTitulo").html(informacion);

        var anho = $("#slcAnio").val();
        var mes = $("#slcMes").val();
        var fecha = "<H3>" + mes.toUpperCase() + "&nbsp;" + anho + "</H3><br />";
        $("#txtFecha").html(fecha);
    }

    var cargainicial = function () {      

        //var parms = {
        //    data: null,
        //    columns: [
        //        { data: "DESCRIPCION"},
        //        { data: "BASE" },
        //        { data: "TRIBUTO" }                
        //    ], "aLengthMenu": [
        //       [5, 15, 20, -1],
        //       [5, 15, 20, "Todos"] // change per page values here
        //    ],
        //    // set the initial value
        //    "iDisplayLength": 5,
        //    "order": [],
        //    "paging": false
        //}

        //var table = $('#tblBandeja').dataTable(parms);
        //$('#tblBandeja').removeAttr('style');

        //en el momento de hacer click boton buscar

        $('#buscar').on('click', function () {
            cargaTitulo();
            //cargadatosempresa();
            //CargarGrilla(table);
            CargarGrilla();
        });     
    }

    return {
        init: function () {
            eventoControles();
            cargacombos();
            cargainicial();
            fillCboempresa();
            $('#slcEmpresa').select2('val', $('#ctl00_hddctlg').val()).change();
            ListarEstablecimiento();
            cargarCorreos();

        }
    };
}();

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();
        var data = new FormData();

        //$('#tblmensaje').html($("#tblProductos")[0].outerHTML);        

        data.append('OPCION', 'SENDMAIL');
        data.append('NREMITENTE', $('#txtNRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE',$('#datos_correo').html() + $('#hftabla').val());// $('#datos_correo').html() +
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFLVANU.ASHX",
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

        //$('#tblmensaje').html("");
    }
};
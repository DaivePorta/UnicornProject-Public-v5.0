var CCMCACO = function () {
    
    var plugins = function () {
        $('#slcEmpresa,#cboClientes,#cboMoneda').select2();
    }

    var fillCboempresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/NCMEIMG.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '" imgSup="' + datos[i].IMG_SUPERIOR + '"  imgInf="' + datos[i].IMG_INFERIOR + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar empresas.');
            }
        });
    }

    var filltxtcliente = function () {
        $.ajax({
            type: "post",
            url: "vistas/CC/ajax/CCMCBCL.ashx?flag=3&empresa=" + $('#slcEmpresa').val(),
            async: false,
            success: function (datos) {
                if (datos != null) {
                    $('#cboClientes').empty();
                    $('#cboClientes').html(datos);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargarMonedas = function () {
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=12&CTLG_CODE=" + $('#ctl00_hddctlg').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').html('<option></option>');
                if (datos != null) {
                    for (var i = datos.length - 1 ; i > -1 ; i--) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al listar las monedas del Sistema.');
            }
        });
    }

    var fillDeudas = function () {
       
        $.post("vistas/CC/ajax/CCMCACO.ASHX", { flag: 1, empresa: $("#slcEmpresa").val(), clientepidm: $('#cboClientes').val()},
                  function (datos) {

                      $("#tblDeudas tbody").html('');
                      var tot_soles = 0;
                      var tot_dolares = 0;
                      if (datos != "" && datos != null) {
                          var json = $.parseJSON(datos);
                          for (var i = 0; i < json.length; i++) {
                              if (i % 2 == 0) {
                                  $("#tblDeudas tbody").append('<tr style="background-color:#eeeeee">' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].DOCUMENTO + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].FECHA_EMISION.display + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].FECHA_VENCIMIENTO.display + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].DIAS + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;" align="right">' + json[i].SIMBOLO_MONEDA + ' ' + formatoMiles(json[i].MONTO) + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;" align="right">S/. ' + formatoMiles(json[i].POR_PAGAR_BASE) + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;" align="right">$ ' + formatoMiles(json[i].POR_PAGAR_ALTER) + '</td>'
                                      );
                              } else {
                                  $("#tblDeudas tbody").append('<tr style="background-color:white">' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].DOCUMENTO + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].FECHA_EMISION.display + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].FECHA_VENCIMIENTO.display + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;">' + json[i].DIAS + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;" align="right">' + json[i].SIMBOLO_MONEDA + ' ' + formatoMiles(json[i].MONTO) + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;" align="right">S/. ' + formatoMiles(json[i].POR_PAGAR_BASE) + '</td>' +
                                      '<td style="border:solid 1px;padding: 3px;" align="right">$ ' + formatoMiles(json[i].POR_PAGAR_ALTER) + '</td>'
                                      );
                              }
                              tot_soles += parseFloat(json[i].POR_PAGAR_BASE);
                              tot_dolares += parseFloat(json[i].POR_PAGAR_ALTER);
                          }    
                      }

                      $("#tblDeudas tbody").append('<tr><td style="border:solid 1px;font-weight:600;" colspan="5" align="right">TOTALES&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="border:solid 1px;font-weight:600;" align="right">S/. ' + formatoMiles(tot_soles) + '</td><td style="border:solid 1px;font-weight:600;" align="right">$ ' + formatoMiles(tot_dolares) + '</td></tr>')

                      if ($("#cboMoneda").val() == '0002') {
                          $("#montoCarta").text(formatoMiles(tot_soles));
                      } else {
                          $("#montoCarta").text(formatoMiles(tot_dolares));
                      }
                      $("#monedaCarta").text($("#cboMoneda :selected").text());

                  });
        $.ajaxSetup({ async: true });

    }

    var fillCuentas = function () {

        $.post("vistas/CC/ajax/CCMCACO.ASHX", { flag: 3, empresa: $("#slcEmpresa").val() },
                  function (datos) {

                      $("#tblCuentas tbody").html('');

                      if (datos != "" && datos != null) {
                          var json = $.parseJSON(datos);
                          for (var i = 0; i < json.length; i++) {
                              if (i % 2 == 0) {
                                  $("#tblCuentas tbody").append('<tr style="background-color:#eeeeee">' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].TIPO + '</td>' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].BANCO + '</td>' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].NRO_CUENTA + '</td>' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].NRO_CTA_INTER + '</td>'
                                  );
                              } else {
                                  $("#tblCuentas tbody").append('<tr style="background-color:white">' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].TIPO + '</td>' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].BANCO + '</td>' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].NRO_CUENTA + '</td>' +
                                  '<td style="border:solid 1px;padding: 3px;">' + json[i].NRO_CTA_INTER + '</td>'
                                  );
                              }
                          }
                      }
                      
                  });
        $.ajaxSetup({ async: true });

    }

    var fillFirma = function () {
        var imagenVacia = "data:image/gif;base64,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";

        $.ajax({
            type: "POST",
            url: "vistas/NS/ajax/NSMUSUA.ASHX?OPCION=RU&ID=" + $("#ctl00_txtus").val(),
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (datos != "") {
                    
                    $("#usuarioCarta").text(datos[0].NOMBRE);

                    $.ajax({
                        type: "GET",
                        url: "vistas/NC/ajax/NCMRFIR.ashx",
                        data: {
                            flag: 2,
                            codigo: datos[0].PIDM
                        },
                        contentType: "application/json;",
                        dataType: "json",
                        async: false,
                        success:
                            function (datos) {
                                if (datos != null) {

                                    $("#firmaCarta").attr("src", (datos[0].IMAGEN == "" ? imagenVacia : datos[0].IMAGEN));


                                }
                                else {
                                    $("#firmaCarta").attr("src", imagenVacia);

                                }
                            },
                        error: function () { alertCustom("Ocurrio un error al obtener la firma del usuario"); }
                    });

                    $.ajax({
                        type: "GET",
                        url: "vistas/CC/ajax/CCMCACO.ashx",
                        data: {
                            flag: 4,
                            PIDM_USUARIO: datos[0].PIDM

                        },
                        contentType: "application/json;",
                        dataType: "json",
                        async: false,
                        success:
                            function (datos) {
                                if (datos != null) {
                                    $("#cargoCarta").text(datos[0].CARGO);
                                }
                            },
                        error: function () { alertCustom("Ocurrio un error al obtener la firma del usuario"); }
                    });

                }

            },
            error: function (msg) {
                alertCustom("Error al obtener datos del Usuario.");
            }

        });

        
    }

    var fillDatosEstablecimiento = function () {
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCSCSL.ASHX?codigo=" + $("#ctl00_hddestablecimiento").val() + "&empresa=" + $("#ctl00_hddctlg").val(),
            success: function (datos) {
                $.ajax({
                    type: "POST",
                    url: "vistas/CC/ajax/CCMCACO.ASHX?flag=2&code_ubigeo=" + datos[0].DISTRITO,
                    success: function (datos) {
                        $("#distritoCarta").text(datos);
                    },
                    error: function (msg) {
                        alertCustom('Error al obtener Distrito');
                    }
                });
            },
            error: function (msg) {
                alertCustom('Error al codigo Distrito');
            }
        });
    }

    var cargarCorreos = function () {
        var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
        $.ajax({
            type: 'post',
            url: 'vistas/cc/ajax/ccmcaco.ashx?flag=LMAILS&pidm_cliente=' + $("#hfPdimCliente").val(),
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

    var eventoControles = function () {
        
        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html());
                var datosUsuario = devuelveDatosUsuario(usuario);

                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);
                $("#datos_correo").html($("#preview").html());
                $("#txtAsunto").val('CARTA DE COBRANZA - ' + $("#slcEmpresa :selected").text());

                cargarCorreos();

                $('#divMail').modal('show');
            }

        });

        $("#btnGenerar").on('click', function () {

            if (vErrors(["slcEmpresa", "cboClientes", "cboMoneda", "txt_PD"])) {
                Bloquear('ventan');
                $("#empresaCarta").text($("#slcEmpresa :selected").text());
                $("#cabeceraCarta").attr('src', $("#slcEmpresa :selected").attr('imgsup'));
                $("#pieCarta").attr('src', $("#slcEmpresa :selected").attr('imginf'));

                $("#fechaCarta").text(Date.today().toString('d MMMM, yyyy'));
                $("#clienteCarta").text(($("#cboClientes :selected").text()));
                $("#direccionCarta").text(($("#cboClientes :selected").attr('data-direccion')));
                $("#usuarioCarta").text($("#slcEmpresa :selected").text());
                $("#pdCarta").text($("#txt_PD").val());
                fillDatosEstablecimiento();
                fillDeudas();
                fillCuentas();
                fillFirma();

                $("#previewCarta").show();

                $("#grabar").removeAttr("disabled");
                Desbloquear('ventana');
            }
        });

        $("#grabar").on('click', function (e) {
            e.preventDefault();
            Crear();
        });

        $("#imprimir").on('click', function (e) {
            e.preventDefault();
            imp();
        });

        $("#slcEmpresa").on('change', function () {
            filltxtcliente();
        });
    }

    var cargaInicial = function () {
        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {
            $("#previewCarta").show();
            $(".master").hide();
            $("#grabar").attr('disabled', 'disabled');
            $("#imprimir").removeAttr('disabled');
            $("#btnMail").removeAttr('disabled');
            $("#btnMail").removeClass('disabled');
            $.ajax({
                type: "POST",
                url: "vistas/CC/ajax/CCMCACO.ASHX?flag=5.1&empresa=&codigo=" + CODE,
                success: function (datos) {
                    $("#preview").html(datos);
                    $("#nroCArta").text('00' + CODE.substring(2, 10));
                    $('.editable').removeClass('tooltips').removeClass('editable').removeAttr('contenteditable').removeAttr('data-original-title');

                },
                error: function (msg) {
                    alertCustom('Error al obtener datos');
                }
            });

            $.ajax({
                type: "POST",
                url: "vistas/CC/ajax/CCMCACO.ASHX?flag=5.2&empresa=&codigo=" + CODE,
                success: function (datos) {
                    $("#hfPdimCliente").val(datos);
                },
                error: function (msg) {
                    alertCustom('Error al obtener datos');
                }
            });
        }
    }

    var rutaPublica = function () {
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCPRMT.ASHX?codigo=RUIC",
            contentType: "application/json;",
            dataType: "json",
            success: function (datos) {

                $("#hfPublico").val(datos[0].VALOR);

            },
            error: function (msg) {

                alertCustom('Error al obtener la ruta publica.');
            }
        });
    }

    return {
        init: function () {
            cargaInicial();
            plugins();
            fillCboempresa();
            filltxtcliente();
            cargarMonedas();
            rutaPublica();
            eventoControles();
        }
    };
}();

var CCLCACO = function () {
    var plugins = function () {
        $('#slcEmpresa,#cboClientes,#cboMoneda').select2();
    }

    var fillCboempresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/NCMEIMG.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').html('<option></option>');
                if (datos !== null && datos !== '') {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '" imgSup="' + datos[i].IMG_SUPERIOR + '"  imgInf="' + datos[i].IMG_INFERIOR + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom('Error al intentar listar empresas.');
            }
        });
    }

    var fillBandeja = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('display', 'none')
                    }
                },
                {
                    data: "NUMERO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CLIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "FECHA.display",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(formatoMiles(cellData));
                    }
                }
            ]

        }

        oTableGST = iniciaTabla('tbl_gastos', parms);
        $('#tbl_gastos').removeAttr('style');
        $('#tbl_gastos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableGST.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableGST.fnGetPosition(this);
                var row = oTableGST.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=ccmcaco&codigo=' + CODIGO;


            }
        });


    }

    var llenaBandeja = function () {

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/ccmcaco.ashx?flag=5&empresa=" + $('#slcEmpresa').val() + "&codigo=",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTableGST.fnClearTable();
                    oTableGST.fnAddData(datos);
                }
                else {
                    oTableGST.fnClearTable();
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                console.log(msg);
                Desbloquear("ventana");
            }
        });
    }

    var eventoControles = function () {
        $("#btnListar").on('click', function (e) {
            e.preventDefault();
            llenaBandeja();
        })
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboempresa();
            fillBandeja();
            $("#btnListar").click();
        }
    }
}();

function Crear() {

    var ctlg_code = $('#slcEmpresa').val();
    var pidm_cliente = $('#cboClientes').val();
    var moneda = $("#cboMoneda").val();
    var html = $("#preview").html();
    var usuario = $("#ctl00_txtus").val();
    var monto = $("#montoCarta").text().replace(',','');

    if (vErrors(["slcEmpresa", "cboClientes", "cboMoneda"])) {
        Bloquear("ventana");

        var data = new FormData();
        data.append('flag', 6);
        data.append('empresa', ctlg_code);
        data.append('pidm_cliente', pidm_cliente);
        data.append('moneda', moneda);
        data.append('html', html);
        data.append('monto', monto);
        data.append('usuario', usuario);

        $.ajax({
            url: "vistas/CC/ajax/CCMCACO.ASHX",
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success:
            function (res) {
                Desbloquear("ventana");
                if (res.length == 10) {
                    $("#nroCArta").text(res);
                    $('.editable').removeClass('tooltips').removeClass('editable').removeAttr('contenteditable').removeAttr('data-original-title');
                    $("#grabar").attr('disabled', 'disabled');
                    $("#imprimir").removeAttr('disabled');
                    $("#btnGenerar").attr('disabled', 'disabled');
                    $("#btnMail").removeAttr('disabled');
                    $("#btnMail").removeClass('disabled');
                    $("#hfPdimCliente").val(pidm_cliente);
                    exito();
                } else {
                    noexito();
                }
            }
        });
    }
}

function imp() {
    var auxiliar = new Array();
    var _divs = "preview";

    if (!(Object.prototype.toString.call(_divs) == "[object Array]")) {
        auxiliar[0] = _divs; //solo cuerpo
    } else { auxiliar = _divs; } //arreglo de div, > 1, cabeza, cuerpo, footer(alternativo) 

    //configuraciones generales
    var flag = false;

    $("#preview").removeClass('well');

    //solo contenedor principal
    var ConfInicial = '.chat-window,.navbar-inner,.page-sidebar,.footer,#gritter-notice-wrapper,#contenedor,#contenedorBreadcrumb,.icon-reorder {display: none !important;}' +
                      '.page-content {margin-left: 0px !important;}.page-container {margin-top: 0px !important;}.portlet-title{display: none !important;}' +
                      'h4{font-weight:bold !important;}.portlet{border:none !important;}';

    var ConfEsp = "";

    //-titulo
    $(".nav-tabs").css("display", "none");

    var tituloOriginal = $(".portlet-title h4").html();

    $(".portlet-body").append("<div class='row-fluid' id='nuevoDivImprimible'></div>")

    //-conf especiales
    for (var i = 0; i < auxiliar.length; i++) {

        var _div = "#" + auxiliar[i];

        var isdatatable = $(_div + " .dataTables_wrapper").html() != undefined ? true : false;

        if (!isdatatable) {

            $("#nuevoDivImprimible").append($(_div)[0].outerHTML);
            if ($(_div).hasClass("portlet")) {
                $("#nuevoDivImprimible .portlet-title, #nuevoDivImprimible .info_print,#nuevoDivImprimible .form-actions,#nuevoDivImprimible i").remove()
            }

            $("#nuevoDivImprimible " + _div + " label").css("font-weight", "bold");
            select2label("#nuevoDivImprimible " + _div);
            input2label("#nuevoDivImprimible " + _div);
            txtarea2label("#nuevoDivImprimible " + _div);

            ConfEsp += "#" + auxiliar[i] + " .btn {display:none}";

        } else {
            var paginado = $("#" + $(_div + " table").attr("id") + "_rppag").val();
            $("#" + $(_div + " table").attr("id") + "_rppag").val("-1").change();

            $("#nuevoDivImprimible").append($(_div)[0].outerHTML);

            $("#" + $(_div + " table").attr("id") + "_rppag").val(paginado).change();

            var id_tabla = $("#nuevoDivImprimible table").length > 1 ? $($("#nuevoDivImprimible table")[1]).attr("id") : $("#nuevoDivImprimible table").attr("id");
            //  $("#nuevoDivImprimible #" + id_tabla).dataTable().fnDestroy();
            $("#nuevoDivImprimible #" + id_tabla).attr("border", "1").css("width", "100%");

            $($("#nuevoDivImprimible #" + id_tabla).parent()).siblings("div").addClass("noimprimibletbl");
            input2labelList($("#nuevoDivImprimible #" + id_tabla + " :input"));
        }
    }

    $(".portlet-body div").addClass("noimprimible");
    $(".portlet").siblings().addClass("noimprimible");
    $("#nuevoDivImprimible, #nuevoDivImprimible div").removeClass("noimprimible");

    $('<style media="print">' + ConfInicial + '.actions,.noimprimible,.noimprimibletbl{display:none !important;}#nuevoDivImprimible td{padding:5px;}</style>').appendTo('head');

    var document_focus = false;
    $(document).ready(function () { window.print(); document_focus = true; });
    var int = setInterval(function () {
        if (document_focus === true) {

            $("#nuevoDivImprimible").remove();
            $(".info_print").remove();
            $(".portlet-title h4").html(tituloOriginal);
            $("#preview").addClass('well');
            clearInterval(int);
        }
    }, 300);
}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();
    var rutaPublica = $("#hfPublico").val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {

        var x = $(".imgCorreo")

        for (var i = 0; i < x.length; i++) {
            var rutaActual = $(x[i]).attr('src');
            var rutaNueva = rutaActual.replace('../../..', 'http://' + rutaPublica);

            $(x[i]).attr('src', rutaNueva);
        }


        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();

        var data = new FormData();

        data.append('OPCION', 'SENDMAIL');
        data.append('NREMITENTE', $('#txtNRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $('#datos_correo').html());
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', '');

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


            for (var i = 0; i < x.length; i++) {
                var rutaActual = $(x[i]).attr('src');
                var rutaNueva = rutaActual.replace('http://' + rutaPublica, '../../..');

                $(x[i]).attr('src', rutaNueva);
            }

        })
        .error(function () {
            alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
        });

    }
};

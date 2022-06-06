
var oTable;

var CPLECPR = function () {

    var plugins = function () {

        $('#btnMail').attr('disabled', true);

        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();

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
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cplrfca.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cplrfca.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    $('#cboEstablecimiento').select2('val', '');

                }

            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillcboMoneda = function () {
        $('#cbo_moneda').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_moneda').empty();
                $('#cbo_moneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                $('#cbo_moneda').val(datos[pos].CODIGO);
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente.");
            }
        });
        $('#cbo_moneda').select2();
    }

    function filltxtrazsocial(v_ID, v_value) {
        var selectRazonSocial = $(v_ID);
        //Proveedores
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cplrfca.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    selectRazonSocial.typeahead({
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);
                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);
                        },

                        updater: function (item) {
                            $("#hfPIDM").val("");
                            $("#hfDNI").val("");
                            $("#hfRUC").val("");

                            $("#hfPIDM").val(map[item].PIDM);
                            $("#hfDNI").val(map[item].DNI);
                            $("#hfRUC").val(map[item].RUC);
                            $("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                            if (map[item].RUC == "") {
                                $("#txtRuc").val(map[item].DNI);
                            }
                            else {
                                $("#txtRuc").val(map[item].RUC);
                            }
                            return item;
                        },


                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtrazsocial").val().length <= 0) {

                        }
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

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var crearTablaVacia = function () {
        var parms = {
            data: null,
            columns: [
                   {
                       data: "fecha",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr("align", "center");
                       },
                       type: "fecha"

                   },
                   {
                       data: "descripcion",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr("align", "left");
                       }

                   },
                   {
                       data: "tipo_doc",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr("align", "left");
                       }

                   },
                   {
                       data: "numero_doc",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr("align", "left");
                       }

                   },
                   {
                       data: "cargo",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).html(formatoMiles(cellData));
                           $(td).attr("align", "right");
                       }

                   },
                   {
                       data: "abono",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).html(formatoMiles(cellData));
                           $(td).attr("align", "right");
                       }

                   },
                   {
                       data: "saldo",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).html("");
                           $(td).attr("align", "right");
                       }

                   }
            ],
            order: [[0, 'asc']],
            "paginate": false,

            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;
                var valor = null;

                api.column(0, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {

                        if (i) {
                            valor = formatoMiles(oTable.fnGetData(i - 1).saldo);
                            $(rows).eq(i).before(
                           '<tr class="group"><td style="BACKGROUND-COLOR: rgb(223, 223, 223);"></td><td colspan="5" style="BACKGROUND-COLOR: rgb(223, 223, 223);">NUEVO SALDO:</td><td align="right" style="BACKGROUND-COLOR: rgb(223, 223, 223);">' + valor + '</td></tr>'
                            );
                        }
                       
                      

                        last = group;
                    }

                    if (i === $(rows).length - 1) {
                        valor = formatoMiles(oTable.fnGetData(i).saldo);
                        $(rows).eq(i).after(
                       '<tr class="group"><td style="BACKGROUND-COLOR: rgb(223, 223, 223);"></td><td colspan="5" style="BACKGROUND-COLOR: rgb(223, 223, 223);">NUEVO SALDO:</td><td align="right" style="BACKGROUND-COLOR: rgb(223, 223, 223);">' + valor + '</td></tr>'
                        );
                    }

                });

                $("table.dataTable thead th").removeClass("sorting").removeClass("sorting_asc").off("click");
            },
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
        oTable = iniciaTabla('tblBandeja', parms);
        actualizarEstilos();
    }

    var listarFacturasCompra = function () {
        if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtrazsocial", "txtRuc"])) {

            var data = new FormData();

            data.append('p_PERS_PIDM', $("#hfPIDM").val());
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_USUA_ID', $("#ctl00_txtus").val());
            data.append('p_DESDE', $("#txtDesde").val());
            data.append('p_HASTA', $("#txtHasta").val());
            data.append('p_MONE_CODE', $("#cbo_moneda").val());


            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/cp/ajax/cplrfca.ashx?OPCION=5.5",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               Desbloquear("ventana");
               oTable.fnClearTable();
               if (!isEmpty(datos)) {
                   oTable.fnAddData(datos);
                   $("#txtTotalMoneda").html(formatoMiles($("#hfValorSaldo").val()));
                   $("#lblSimboloMoneda").html($("#hfSimboloSaldo").val());
                   $("#bloqueTotales").attr("style", "display:block;");

                   $('#btnMail').attr('disabled', false)

               } else {
                   noexito();
                   $('#btnMail').attr('disabled', true)
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
    }

    var eventoComtroles = function () {


        $('#cboEmpresa').on('change', function () {
            $("#inputRazsocial").html("");
            $("#inputRazsocial").html('<input id="txtRuc" class="span3" type="text" disabled="disabled" /> <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />');
            filltxtrazsocial('#txtrazsocial', '');
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#buscar').on('click', function () {            
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                listarFacturasCompra();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                listarFacturasCompra();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }

        });

        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
                var datosUsuario = devuelveDatosUsuario(usuario)
                var aa = $("#txtDesde").val();
                var mm = $("#txtHasta").val();
                var proveedor = $("#txtrazsocial").val();
                var sucursal = $("#cboEstablecimiento :selected").html();
                var empresa = $("#cboEmpresa :selected").html();

                var asunto = "REPORTE DE ESTADO DE CUENTA PROVEEDOR - " + proveedor

                if (!(aa == ''))
                    asunto = asunto + " DESDE " + aa + " HASTA " + mm;
                else
                    asunto = asunto + " DESDE INICIO DE OPERACIONES";
                //              mm.toUpperCase() + " - " + aa + " ]"


                $('#txtAsunto').val(asunto);
                //$('#lblAsunto').text(asunto);
                //$('#lblEmpresa').text($('#slcEmpresa :selected').html())
                //$('#lblSucursal').text($('#slcSucural :selected').html());
       
                $('#txtNRemitente').val(datosUsuario[0].NOMBRE);

                $('#txtcontenido').attr('disabled', false);
                var div = document.createElement("div");
                div.id = "tempDiv";
                $(div).html("<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p><p>ESTABLECIMIENTO: " + $("#cboEstablecimiento :selected").html() +
                                  "</p><p>DESDE: " + ($("#txtDesde").val() == "" ? "INICIO" : $("#txtDesde").val()) + "</p><p>HASTA: " +
                                  ($("#txtHasta").val() == "" ? "FIN" : $("#txtHasta").val()) + "</p><p>MONEDA: " + $("#cbo_moneda :selected").html() + "</p>");
                $("#datos_correo").html($(div).html());

                cargarCorreos();
                $('#divMail').modal('show');
            }

        });

    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            fillCboEstablecimiento($("#ctl00_hddctlg").val());
            filltxtrazsocial('#txtrazsocial', '');
            fillcboMoneda();
            crearTablaVacia();
            eventoComtroles();

        }
    };

}();


function cargarCorreos() {
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
        data.append('HTMLMENSAJE', $('#datos_correo').html() +
                                  $("#tblBandeja")[0].outerHTML.replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;')
                                    .split("height:0;").join("")
                                   );

        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPLRFCA.ASHX",
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
//$(function () {

//    $('#tblBandeja tbody td img').live('click', function () {

//        var id = $(this).attr('id');
//        var nTr = $(this).parents('tr')[0];

//        if (oTable.fnIsOpen(nTr)) {
//            /* This row is already open - close it */
//            this.src = "recursos/img/details_open.png";
//            oTable.fnClose(nTr);
//        }
//        else {
//            /* Open this row */
//            this.src = "recursos/img/details_close.png";
//            //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

//            oTable.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
//            oTable.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');            
//            $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
//            $.ajax({
//                type: "POST",
//                url: "vistas/cp/ajax/cplrfca.ashx?OPCION=4&p_FACTURA=" + id,
//                async: false,
//                success: function (datos) {                  
//                    $('#c' + id).html(datos);
//                }
//            });

//        }      

//    });

//    function fnFormatDetails(nTr, id) {
//        //var aData = oTable.fnGetData(nTr);
//        var sOut = '<div id="c' + id + '"></div>';
//        return sOut;
//    }
//});
var NVLVOVE = function () {

    var plugins = function () {
        $("#cboGrupoProductos").select2();
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboVendedor').select2();
        $('#cboCliente').select2();
        //$('#cboEstado').select2();
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

        $('#cboEntregado').select2();
        $('#cboTipoVenta').multiselect({
            nonSelectedText: 'Seleccione!'
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
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
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
                $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
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
        var mon="";
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
            complete: function () { $('#cboMoneda').select2("val", mon); obtenerProdVendidos(); },
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
                        data: "UNME_VOLUMEN", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }, visible: false

                    },
                    {
                        data: "CANTIDAD_VOLUMEN", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "right"); }

                    },
                    {
                        data: "TOTAL", createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "right").html(rowData.SIMBOLO_MONEDA + " " + formatoMiles(rowData.TOTAL))

                        }

                    },
                    {
                        data: "SIMBOLO_MONEDA", visible: false

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
                        "sButtonText": "Exportar a Excel (Detalle)"
                    }
                ]
            },
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;
                var totalUnidades = 0;
                var totalMonto = 0;
                var smoneda = "";
                texto = new Array();
                texto.push("UNIDAD DE MEDIDA,TOTAL UNIDADES VENDIDAS,TOTAL MONTO VENDIDO");
                texto.push("\r\n");
                api.column(5, { page: 'current' }).data().each(function (group, i) {                  
                    

                    if (last !== group ) {

                        $(rows).eq(i).before(
                            '<tr class="group" id="tr_' + group.split(" ").join("_").split("(")[0] + '" style="BACKGROUND-COLOR: rgb(223, 223, 223);color:black;font-weight:600;"></tr>'
                        );

                        if (last !== null) {
                            $("#tr_" + last.split(" ").join("_").split("(")[0]).html('<td colspan="2" style="border:solid #AAAAAA 2px">UNIDAD DE VOLUMEN:<span style="float: right;right: 34%;position: relative;">' + last + '</span></td><td style="border:solid #AAAAAA 2px" colspan="2">CANTIDAD TOTAL:<span style="float:right;">' + formatoMiles(totalUnidades) + '</span></td><td colspan="3" style="border:solid #AAAAAA 2px">MONTO TOTAL:<span style="float:right;">' + smoneda + formatoMiles(totalMonto) + '</span></td>');
                            texto.push(last + "," + totalUnidades + "," + smoneda + totalMonto.Redondear());
                            texto.push("\r\n");
                        }

                        totalUnidades = 0;
                        totalMonto = 0;

                        smoneda = api.column(8, { page: 'current' }).data()[i];

                        last = group;
                    }

                    totalUnidades += api.column(6, { page: 'current' }).data()[i];
                    totalMonto += api.column(7, { page: 'current' }).data()[i];

                    if (api.column(5, { page: 'current' }).data().length - 1 == i) {
                        $("#tr_" + group.split(" ").join("_").split("(")[0]).html('<td colspan="2" style="border:solid #AAAAAA 2px">UNIDAD DE VOLUMEN:<span style="float: right;right: 34%;position: relative;">' + group + '/<span></td><td style="border:solid #AAAAAA 2px" colspan="2">CANTIDAD TOTAL:<span style="float:right;">' + formatoMiles(totalUnidades) + '</span></td><td colspan="3" style="border:solid #AAAAAA 2px">MONTO TOTAL:<span style="float:right;">' + smoneda + formatoMiles(totalMonto) + '</span></td>');
                        texto.push(last + "," + totalUnidades + "," + smoneda + totalMonto.Redondear());
                    }
                    
                });
                $("table.dataTable thead th").removeClass("sorting");
                $("#ctd").removeClass("sorting_desc");
            },                   
            "paginate": false,
            "order":[[5, 'asc'],[6, 'desc']],
            info: false
        }

  
        oTable =  iniciaTabla('tblDocumento', parms);
        $(".DTTT.btn-group").append('<a class="btn" id="ToolTables_tblDocumento_3" onclick="javascript:imprimirTotales();"><span>Exportar a Excel (Totales)</span></a>');
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
        //data.append('ESTADO', ESTADO);
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());
        data.append('ENTREGADO', $("#cboEntregado").val());
        data.append('TIPO_VENTA', $("#cboTipoVenta").val());

       
        $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLPRVE.ashx?OPCION=L",
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            beforeSend: function () { Bloquear("divDocumento"); },
            cache: false,
            async: true,
            success: function (datos) {            
                oTable.fnClearTable();
                if (datos != null && datos.length!=0) {
                    oTable.fnAddData(datos);                 
                    oTable.fnAdjustColumnSizing();
                } else {
                    infoCustom2("No hay datos disponibles");
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
            $('#txtAsunto').val("REPORTE DE VOLUMEN VENDIDO - " + $("#cboEstablecimiento :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html( "<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p><p>ESTABLECIMIENTO: " + $("#cboEstablecimiento :selected").html() +
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

var detallesVenta = [];

function imprimirTotales() {

    var archivo = new Blob(texto, { type: 'text/plain' });
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(archivo);
    a.download = "REPORTE_VOLUMEN_VENDIDO_" + $("#cboEstablecimiento :selected").html() + ".csv";
    a.click();

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
   var  email = "";
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



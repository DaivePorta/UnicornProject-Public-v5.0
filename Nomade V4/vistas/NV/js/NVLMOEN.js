var NVLMOEN = function () {

    var plugins = function () {
       
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();       
        $("#cboMoneda").select2();
        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();
        inifechas("txtDesde", "txtHasta")
        $("#txtDesde,#txtHasta").datepicker('setDate',new Date());
 
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
            beforeSend: function () { Bloquear($(selectEst.parents("div")[0])) },
            datatype: "json",
            async: true,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }                            
                } else {                  
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            complete: function () {
                Desbloquear($(selectEst.parents("div")[0]));
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

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
            complete: function () {
                $('#cboMoneda').val(mon).change();
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
                       data: "FECHA_ENTREGA", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }, type: "fecha"

                   },
                    {
                        data: "CODIGO_UBICACION", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "center"); }

                    },
                    {
                        data: "CLIENTE", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }
                    },
                    {
                        data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "TIPO_ANULACION", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

                    },
                    {
                        data: "MOTIVO", createdCell: function (td, cellData, rowData, row, col) { $(td).attr("align", "left"); }

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
            ,"paginate": true
    
        }

  
        oTable =  iniciaTabla('tblDocumento', parms);
       // $(".DTTT.btn-group").append('<a class="btn" id="ToolTables_tblDocumento_3" onclick="javascript:imprimirTotales();"><span>Exportar a Excel (Totales)</span></a>');
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
        //var MONEDA_CODE = $("#cboMoneda").val();

        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        //data.append('MONEDA_CODE', MONEDA_CODE);
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());

       
        $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLPRVE.ashx?OPCION=L4",
            contentType: false,
            data: data,
            dataType: "json",
            processData: false,
            beforeSend: function () { Bloquear("divDocumento"); },
            cache: false,
            async: true,
            success: function (datos) {            
                oTable.fnClearTable();
                if (datos.length>0 && datos!==null) {
                    oTable.fnAddData(datos);
                    oTable.fnAdjustColumnSizing();
                } else {
                    infoCustom2("No se encontraron datos!");
                }
            },
            complete: function () { Desbloquear("divDocumento"); },
            error: function () {
                Desbloquear("divDocumento");
                noexito();
            }
        });

    }

    var eventos = function () {
        $("#cboEmpresa").change(function () {
            fillCboEstablecimiento();
        });
        $('#cboEstablecimiento').change(function () {
            fillcboMoneda();
        });
        //$('#cboMoneda').change(function () {
        //    $(".moneSimb").html(this[0].getAttribute("simbolo"));
        //});

        $("#btnFiltrarProdVen").on("click", function () {            
                obtenerProdVendidos();           
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("REPORTE MOTIVO NO ENTREGA - " + $("#cboEstablecimiento :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html( "<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p><p>ESTABLECIMIENTO: " + $("#cboEstablecimiento :selected").html() +                             
                              "</p><p>DESDE: " + ($("#txtDesde").val() == "" ? "INICIO" : $("#txtDesde").val()) + "</p><p>HASTA: " +
                              ($("#txtHasta").val() == "" ? "FIN" : $("#txtHasta").val()) + "</p>");
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
        });
    }

    return {
        init: function () {
            plugins();
            eventos();
            crearTablaVacia();
            fillCboEmpresa();                              
        }
    };
}();

var detallesVenta = [];

function imprimirTotales() {

    var archivo = new Blob(texto, { type: 'text/plain' });
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(archivo);
    a.download = "REPORTE_MOTIVO_NO_ENTREGA" + $("#cboEstablecimiento :selected").html() + ".csv";
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
        data.append('HTMLMENSAJE', $("#datos_correo").html() +
                                    $("#tblDocumento")[0].outerHTML.replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;').split("height:0;").join(""));
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


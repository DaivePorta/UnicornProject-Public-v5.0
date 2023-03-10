var NNLFAVA = function () {


    var plugins = function () {
        $('#btnMail').attr('disabled', true);
        $('#slcSucural').select2();
       $('#slcEmpresa').select2();

      

        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) { $(".datepicker-months thead").hide(); $(".datepicker-months tbody tr td").css("width", "180px"); }).keydown(function () { return false; }).datepicker("setDate", new Date());
    }

    var fillBandeja = function () {

        var parms = {
            data: null,
            responsive: true,
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            columns: [
                {
                    data: "NOMBRES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DNI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "DESC_CARGO",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "REM_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        $(td).html("S/.&nbsp;&nbsp;&nbsp;&nbsp;" + cellData);
                    }
                },
                  {
                      data: "FALTAS",
                      createdCell: function (td, cellData, rowData, row, col) {

                          $(td).attr('align', 'center')
                         
                      }
                  },
                   {
                       data: "DSCTO_FAL_INJUST",
                       createdCell: function (td, cellData, rowData, row, col) {

                           $(td).attr('align', 'center')
                           $(td).html("S/.&nbsp;&nbsp;&nbsp;&nbsp;" + cellData);

                       }
                   },
                {
                    data: "TOTAL_MINUTOS_TARDANZAS",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        $(td).html("S/.&nbsp;&nbsp;&nbsp;&nbsp;" + cellData);
                    }
                },
                {
                    data: "TOTAL_MINUTOS_EXTRAS",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
                ,
                {
                    data: "REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')
                        $(td).html("S/.&nbsp;&nbsp;&nbsp;&nbsp;" + cellData);
                    }
                },
                 {
                     data: "SALDO",
                     createdCell: function (td, cellData, rowData, row, col) {

                         //var total = parseFloat(rowData.DSCTO_FAL_INJUST) + parseFloat(rowData.REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA) + parseFloat(rowData.REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS)
                         //$(td).attr('align', 'center')
                         $(td).html("S/.&nbsp;&nbsp;&nbsp;&nbsp;" + cellData);
                     }
                 }




            ]



        }

        oTable = iniciaTabla('tbl_ft_valorizado', parms);
        $('#tbl_ft_valorizado').removeAttr('style');




    }


 

    var Lista_Valorizado_Tardanzas = function () {
        var Emp = $("#slcEmpresa").val();
        var Suc = $('#slcSucural').val();
        var aa = $("#optanho").val();
        var mm = $("#optmes").datepicker("getDate").getMonth() + 1
        $("#hfctlg").val(Emp);
        $("#hfscsl").val(Suc);
        $("#hf_anio").val(aa);
        $("#hf_mes").val(mm);


        $.ajax({
            type: "post",
            url: "vistas/NS/ajax/NSLAPHO.ashx?Opcion=10&Emp=" + Emp + "&Suc=" + Suc + "&ANIO=" + aa + "&MES=" + mm,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oTable.fnClearTable();
                $('#btnMail').attr('disabled', true)
                $("#msg").html("");
                $("#msg").slideUp();
                if (datos != null) {
             
                    oTable.fnAddData(datos);
                    $('#btnMail').attr('disabled', false)
                    if (datos[0].INDICADOR_PENDIENTES == "1") {
                      
                        
                        $("#msg").html("<strong>Alerta!  </strong>Se encontraron fechas sin procesar, por favor procesar las fechas pendientes...!");
                       
                        }
                    if (datos[0].INDICADOR_PENDIENTES == "2") {
                          
                        $("#msg").html("<strong>Alerta!  </strong>Se encontraron horas sin procesar, por favor procesar las horas pendientes...!");
                       
                        }
                    if (datos[0].INDICADOR_PENDIENTES == "3") {
                        
                        $("#msg").html("<strong>Alerta!  </strong>Se econtraron horas que no se han regularizado, por favor regularizar las horas pendiente...!");
                        
                    }

                    if (datos[0].INDICADOR_PENDIENTES != "0") {
                        $("#msg").slideDown();
                        $("#msg").pulsate("destroy");
                        $("#msg").pulsate({color: "#b94a48"})
                        }
                }
                //else {
                //    alertCustom("No hay datos que mostrar")
                //}
             
                Desbloquear("ventana");

            },
            error: function (msg) {
                infoCustom2("No se pudo listar correctamente, porque no existe la BD biométricos.")//Cambio alert por info
                Desbloquear("ventana")
                
            }
        });

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
             //   $('#slcSucural').append('<option value="T">TODOS</option>');
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
                    alertCustom("Error listar sucursales")
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }

    var eventos = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                $("#input_empl").parent().attr("class", "control-group")
                Bloquear("ventana");
                setTimeout(function () {
                    ListarSucursales($('#slcEmpresa').val());
                }, 1000);

                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });


        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
                var datosUsuario = devuelveDatosUsuario(usuario)
                var aa = $("#optanho").val();
                var mm = $("#optmes").val();


                var asunto = "REPORTE DE FALTAS Y TARDANZAS VALORIZADAS - PERIODO - [ " +
                              mm.toUpperCase() + " - " + aa + " ]"

                var data = oTable.fnGetData();
                var tabla = "";
                tabla += '<table border="1" style="font-family: serif;border-collapse:collapse;">';
                tabla += '<thead style="background-color: rgb(52, 112, 160); color: aliceblue;">'
                tabla += '<tr>'
                tabla += '<th style="width: 10%; background-color: #00839A;height:65px;">Empleado'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #00839A;">Doct.Ident.'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #00839A;">Cargo'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #00839A;">Sueldo<br />(Basico)'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #d84a38;">Faltas injustificadas(dias)'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #d84a38;">Dscto Falta injustificadas'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #F5B400;">Tardanzas totales(minutos)'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #F5B400;">Dscto por Tardanzas'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #00A300;">Horas Extras(minutos)'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #00A300;">Abono por Horas Extras'
                tabla += '</th>'
                tabla += '<th style="width: 10%; background-color: #4b8df8;">Saldo Monetario'
                tabla += '</th>'
                tabla += '</tr>'
                tabla += '</thead>'
                tabla += '<tbody>'
                for (var i = 0 ; i < data.length ; i++) {
                   
                    if(i%2 == 0){
                        tabla += '<tr style="background-color:white;">'
                        
                    }else{
                        tabla += '<tr style="background-color:antiquewhite;">'
                   }
                   
                    tabla += '<td align="center">' + data[i].NOMBRES + '</td>'
                    tabla += '<td align="center">' + data[i].DNI + '</td>'
                    tabla += '<td align="center">' + data[i].DESC_CARGO + '</td>'
                    tabla += '<td align="center">S/.&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].REM_TOTAL + '</td>'
                    tabla += '<td align="center">' + data[i].FALTAS + '</td>'
                    tabla += '<td align="center">S/.&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].DSCTO_FAL_INJUST + '</td>'
                    tabla += '<td align="center">' + data[i].TOTAL_MINUTOS_TARDANZAS + '</td>'
                    tabla += '<td align="center">S/.&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA + '</td>'
                    tabla += '<td align="center">'+ data[i].TOTAL_MINUTOS_EXTRAS+'</td>'
                    tabla += '<td align="center">S/.&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS + '</td>'
                    tabla += '<td>S/.&nbsp;&nbsp;&nbsp;&nbsp;' + data[i].SALDO + '</td>'
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


        $('#btn_listar').on('click', function () {


            if (vErrors(["optanho", "optmes", "slcEmpresa", "slcSucural"])) {

                Bloquear("ventana")
                setTimeout(function () {
                    Lista_Valorizado_Tardanzas();
                }, 1000);
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




    return {
        init: function () {
            cargarCorreos();
            plugins();
            eventos();
            fillCboEmpresa();
            ListarSucursales($("#slcEmpresa").val());
            fillBandeja();
            Lista_Valorizado_Tardanzas();

        }
    };

}();


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


var ArmaCadena = function () {

    var array = oTable.fnGetData();
    var cadena = '';
    var bool = false;
    var bool2 = false;

    if ($("#hfctlg").val() != "" &&
        $("#hfscsl").val() != "" &&
        $("#hf_anio").val() != "" &&
        $("#hf_mes").val() != "" ) {

        bool = true;
      
    }
    if (array.length > 0) {
        bool2 = true;
    }

    if (bool2 && bool) {

        for (var i = 0 ; i < array.length ; i++) {
            cadena += array[i]["NOMBRES"] + "/"
            cadena += array[i]["DNI"] + "/"
            cadena += array[i]["DESC_CARGO"] + "/"
            cadena += array[i]["REM_TOTAL"] + "/"
            cadena += array[i]["FALTAS"] + "/"
            cadena += parseFloat(array[i]["DSCTO_FAL_INJUST"]) + "/"
            cadena += array[i]["TOTAL_MINUTOS_TARDANZAS"] + "/"
            cadena += parseFloat(array[i]["REDONDEO_TOTAL_DESC_X_MINUTOS_TARDANZA"]) + "/"
            cadena += array[i]["TOTAL_MINUTOS_EXTRAS"] + "/"
            cadena += parseFloat(array[i]["REDONDEO_TOTAL_PAGAR_HORAS_EXTRAS"]) + "/"
            cadena += parseFloat(array[i]["SALDO"]) + "/"
            cadena += $("#hfctlg").val() + "/"
            cadena += $("#hfscsl").val() + "/"
            cadena += $("#hf_anio").val() + "/"
            cadena += $("#hf_mes").val() + ";"

        }
        cadena += "?"
        cadena = cadena.replace(";?", "");
        Bloquear("ventana")
        setTimeout(function () {
            Generar($("#hf_anio").val(), $("#hf_mes").val(), cadena);
        }, 500);

    } else {
        alertCustom("Seleccionar catalago,establecimiento ,periodo o no hay datos que procesar.");
    }
}

var Generar = function (anio,mes,cadena) {

    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSLAPHO.ashx?Opcion=11&p_DETALLE=" + cadena + "&ANIO=" + anio + "&MES=" + mes,
        async: false,
        success: function (datos) {
            
            if (datos == "OK") {

                exito();
            }
            if(datos == "E"){
                alertCustom("error generar valorizado")
            }
            Desbloquear("ventana");

        },
        error: function (msg) {
            alertCustom("error generar valorizado")
            Desbloquear("ventana")
        }
    });

}
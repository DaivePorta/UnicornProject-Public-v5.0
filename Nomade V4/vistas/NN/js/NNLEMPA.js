usuario = $("#ctl00_txtus").val();
//usuario = "MCASTRO"
var NNLEMPA = function () {

    var plugins = function () {

        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker('setEndDate', '-0y').datepicker('setDate', 'y').keydown(function () { return false; });  
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () {
            return false;
        }).datepicker("setDate", new Date());


    }




    var fillBandeja = function () {

        var parms = {
            data: null,          
            columns: [
                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                      
                    },
                    type: "fecha"
                },
                {
                    data: "ENTRADA_M",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        
                    }
                },
                {
                    data: "SALIDA_M",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                         
                    }
                },
                {
                    data: "ENTRADA_T",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                          
                    }
                },
                {
                    data: "SALIDA_T",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                            
                    }
                },
                {
                    data: "TARDANZA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                            
                    }
                },
                {
                    data: "FALTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                         
                    }
                },
                       
                {
                    data: "EXTRA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
                {
                    data: "MIN_NO_SUBSANADOS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                }, 
                {
                    data: "MIN_SUBSANADOS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                    }
                },
            ],
            //ordering: false,
            responsive: true,
            iDisplayLength: -1,
            //"sDom": "t",
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
                    { "sExtends": "copy", "sButtonText": "Copiar" },
                    { "sExtends": "pdf", "sPdfOrientation": "landscape", "sButtonText": "Exportar a PDF" },
                    { "sExtends": "xls", "sButtonText": "Exportar a Excel" }
                ]
            },
            "paging": false,
            "scrollY": "280px",
            "searching": false,
            "info": false,
            order: [[0, 'asc']],
            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();

                var last = null;
                var color1 = "#FFF";
                var color2 = "#EEEEEE";
                var aux;
                api.data().filter(function (obj, i) {
                    if (last !== (obj.FECHA).toString()) {
                        aux = color2;
                        color2 = color1;
                        color1 = aux;

                        last = (obj.FECHA).toString();
                        $(api.row(i).node()).css("background", color2);
                    } else {
                        $(api.row(i).node()).css("background", color2);
                    }
                });



                //api.data().filter(function (obj2, j) {
                //    if ("1" == (obj2.FALTA).toString()) {
              
                //        $(api.row(j).node()).css("background", "#f2dede");
                //    } 
                //});

            },

            footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;
                var y = new Array();
                //TOTAL TARDANZAS
                api.data().filter(function (e) {
                    if (e.TARDANZA.toString() == "-") {
                        y.push(parseFloat(0));
                    } else {
                        y.push(parseFloat(e.TARDANZA));
                    }
                
                });
                v_total = 0;
                if (y.length > 0) {
                    v_total = y.reduce(function (a, b) { return a + b; });
                }
                //TOTAL FALTAS
                y = new Array();
                api.data().filter(function (e) {
                    if (e.FALTA.toString() == "" || e.FALTA.toString() == "-") {
                        y.push(parseFloat(0));
                    } else {
                        y.push(parseFloat(e.FALTA));
                    }

                });
                v_total2 = 0;
                if (y.length > 0) {
                    v_total2 = y.reduce(function (a, b) { return a + b; });
                }
                //TOTAL EXTRA
                y = new Array();
                api.data().filter(function (e) {
                    if (e.EXTRA.toString() == "" || e.EXTRA.toString() == "-") {
                        y.push(parseFloat(0));
                    } else {
                        y.push(parseFloat(e.EXTRA));
                    }

                });
                v_total3 = 0;
                if (y.length > 0) {
                    v_total3 = y.reduce(function (a, b) { return a + b; });
                }
                //TOTAL MIN NO SUBSANADOS
                y = new Array();
                api.data().filter(function (e) {
                    if (e.MIN_NO_SUBSANADOS.toString() == "" || e.MIN_NO_SUBSANADOS.toString() == "-") {
                        y.push(parseFloat(0));
                    } else {
                        y.push(parseFloat(e.MIN_NO_SUBSANADOS));
                    }

                });
                v_total4 = 0;
                if (y.length > 0) {
                    v_total4 = y.reduce(function (a, b) { return a + b; });
                }

                //TOTAL MIN  SUBSANADOS
                y = new Array();
                api.data().filter(function (e) {
                    if (e.MIN_SUBSANADOS.toString() == "" || e.MIN_SUBSANADOS.toString() == "-") {
                        y.push(parseFloat(0));
                    } else {
                        y.push(parseFloat(e.MIN_SUBSANADOS));
                    }

                });
                v_total5 = 0;
                if (y.length > 0) {
                    v_total5 = y.reduce(function (a, b) { return a + b; });
                }



                $(api.column(5).footer()).html(v_total);
                $(api.column(6).footer()).html(v_total2);
                $(api.column(7).footer()).html(v_total3);
                $(api.column(8).footer()).html(v_total4);
                $(api.column(9).footer()).html(v_total5);
            }
   


        }

        oTable = iniciaTabla('tbl_mis_marcaciones', parms);
        $('#tbl_mis_marcaciones').removeAttr('style');
        $("#tbl_mis_marcaciones_filter").attr("style", "color:white");
        $('.dataTables_scrollBody').attr("style", "overflow: auto;width:100%");
       // $("#tbl_mis_marcaciones_wrapper").children().first().remove()


    }


    var eventoControles = function () {

        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                var usuario = $.trim($('#ctl00_lblusuario').html())
               // usuario = "MCASTRO"
                var datosUsuario = devuelveDatosUsuario(usuario)
                var aa = $("#optanho").val();
                var mm = $("#optmes").val();


                var asunto = "MIS ASISTENCIAS - [ " +
                              mm.toUpperCase() + " - " + aa + " ] - [ " + datosUsuario[0].NOMBRE + " ]"

                var data = oTable.fnGetData();
                var tabla = "";
                tabla += '<table border="1" style="font-family: serif;border-collapse:collapse;border-color:aliceblue;">';
                tabla += '<thead style="background-color: rgb(52, 112, 160); color: aliceblue;border-color:black;">'
                tabla += '<tr>'
                tabla += '<th style="width: 10%;padding:11px;">FECHA'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">ENTRADA'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">SALIDA'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">ENTRADA'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">SALIDA'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">TARDANZA(min)'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">FALTA'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">EXTRA(min)'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">PERMISOS NO SUBSANADOS'
                tabla += '</th>'
                tabla += '<th style="width: 10%;">PERMISOS SUBSANADOS'
                tabla += '</th>'
                tabla += '</tr>'
                tabla += '</thead>'
                tabla += '<tbody style="border-color:black;">'
                for (var i = 0 ; i < data.length ; i++) {

                    if (i % 2 == 0) {
                        tabla += '<tr style="background-color:white;">'

                    } else {
                        tabla += '<tr style="background-color:#EEEEEE;">'
                    }

                    tabla += '<td align="center" style="padding:7px;">' + data[i].FECHA + '</td>'
                    tabla += '<td align="center">' + data[i].ENTRADA_M + '</td>'
                    tabla += '<td align="center">' + data[i].SALIDA_M + '</td>'
                    tabla += '<td align="center">' + data[i].ENTRADA_T + '</td>'
                    tabla += '<td align="center">' + data[i].SALIDA_T + '</td>'
                    tabla += '<td align="center">' + data[i].TARDANZA + '</td>'
                    tabla += '<td align="center">' + data[i].FALTA + '</td>'
                    tabla += '<td align="center">' + data[i].EXTRA + '</td>'
                    tabla += '<td align="center">' + data[i].MIN_NO_SUBSANADOS + '</td>'
                    tabla += '<td align="center">' + data[i].MIN_SUBSANADOS + '</td>'
                    tabla += '</tr>'




                }
                tabla += '<tr style="background-color:white;">'
                var total_1 = 0, total_2 = 0, total_3 = 0, total_4 = 0, total_5 = 0;
                for (var i = 0 ; i < data.length ; i++) {

                   
                    if (data[i].TARDANZA != "-") {
                        total_1 += parseInt(data[i].TARDANZA);
                    }
                    if (data[i].FALTA != "" && data[i].FALTA != "-") {
                        total_2 += parseInt(data[i].FALTA);
                    }
                    if (data[i].EXTRA != "" && data[i].EXTRA != "-") {
                        total_3 += parseInt(data[i].EXTRA);
                    }
                    if (data[i].MIN_NO_SUBSANADOS != "" && data[i].MIN_NO_SUBSANADOS != "-") {
                        total_4 += parseInt(data[i].MIN_NO_SUBSANADOS);
                    }
                    if (data[i].MIN_SUBSANADOS != "" && data[i].MIN_SUBSANADOS != "-") {
                        total_5 += parseInt(data[i].MIN_SUBSANADOS);
                    }
                   
                  
                   
                }

                tabla += '<td align="right" colspan="5" style="padding:7px;"><b>TOTAL:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td>'
                tabla += '<td align="center">' + total_1 + '</td>'
                tabla += '<td align="center">' + total_2 + '</td>'
                tabla += '<td align="center">' + total_3 + '</td>'
                tabla += '<td align="center">' + total_4 + '</td>'
                tabla += '<td align="center">' + total_5 + '</td>'

                tabla += '</tr>'
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

        $('#btn_filtrar').on('click', function () {

            Bloquear("ventana")
            var array = devuelveDatosUsuario(usuario);
            var oMes = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
            var oAnho = $("#optanho").val();



            setTimeout(function () {

                Lista_Asistencias(oAnho, oMes, array[0].PIDM);

            }, 1000);



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

    var Lista_Asistencias = function (oAnho, oMes,oPidm) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnlempa.ashx?OPCION=1&ANHO=" + oAnho + "&MES=" + oMes + "&PIDM=" + oPidm,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    $('#btnMail').attr('disabled', false)
                    var a = datos
                    a.sort(function (x, z) { return x.DIA - z.DIA })
                    oTable.fnClearTable();
                    oTable.fnAddData(a);
                    

                }
                else {
                    $('#btnMail').attr('disabled', true)
                    oTable.fnClearTable();
                 
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }




    var CargaInicial = function () {

       
        var array = devuelveDatosUsuario(usuario);
        $("#nombre_empl").html(array[0].NOMBRE);

        Bloquear("ventana")
        var oMes = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
        var oAnho = $("#optanho").val();

       

        setTimeout(function () {

            Lista_Asistencias(oAnho, oMes, array[0].PIDM);

        }, 1000);

    }


  



    return {
        init: function () {
            plugins();
            //fillCboEmpresa();
            //ListarSucursales($('#slcEmpresa').val());

            fillBandeja();
            eventoControles();
            CargaInicial();



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


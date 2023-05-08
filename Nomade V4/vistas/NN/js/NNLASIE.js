var NNLASIE = function () {

    var plugins = function () {


        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
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
                //$('#slcSucural').append('<option value="T">TODOS</option>');
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
                   
                    $("#input_empl").children().remove();
                    $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")
                   
                    filltxtEmpleado('#txt_empleado', '', 'A');
                   

                }
                else {
                    noexito();
                }

                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }
        });
    }



    var eventoControles = function () {

        $('#btnMail').click(function (e) {
            e.preventDefault();

            if ($('#btnMail').attr('disabled') != 'disabled') {

                //var usuario = $.trim($('#ctl00_lblusuario').html())
                //var datosUsuario = devuelveDatosUsuario()
                var aa = $("#optanho").val();
                var mm = $("#optmes").val();


                var asunto = "MIS ASISTENCIAS - [ " +
                              mm.toUpperCase() + " - " + aa + " ] - [ " + $("#hfnombre_emp").val() + " ]"

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
                $('#txtNRemitente').val($("#hfnombre_emp").val());
                cargarCorreos();
                $('#divMail').modal('show');
            }

        });

        $('#btn_filtrar').on('click', function () {

            if (vErrors(['txt_empleado', 'optmes', 'optanho', 'slcEmpresa', 'slcSucural'])) {
                Bloquear("ventana")

                var oMes = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
                var oAnho = $("#optanho").val();

                $("#nombre_empl").html("");

                setTimeout(function () {

                    $("#nombre_empl").html($("#hfnombre_emp").val());

                    Lista_Asistencias(oAnho, oMes, $("#hfpidm").val());

                }, 500);

            }

        });

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

        var slc_ant = "";
        var estado = "";
        $('#slcSucural').on('change', function () {


            if (slc_ant != $(this).val()) {
                Bloquear("ventana");
                $("#input_empl").parent().attr("class", "control-group")

                setTimeout(function () {
                    $("#input_empl").children().remove();
                    $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")


                    filltxtEmpleado('#txt_empleado', '');

                }, 1000);



                slc_ant = $(this).val();
            } else { slc_ant = ""; }
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

    var Lista_Asistencias = function (oAnho, oMes, oPidm) {

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

    function filltxtEmpleado(v_ID, v_value) {
        var selectSolicitante = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNLLIMA.ashx?OPCION=2&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&IND_ACTIVO=" + "A",
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null && datos !== '') {
                    selectSolicitante.typeahead({
                        source: function (query, process) {
                            arrayEmpleados = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayEmpleados.push(datos[i].NOMBRE_EMPLEADO);
                                obj += '{';
                                obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '",';
                                obj += '"SCSL_CODE":"' + datos[i].SCSL_CODE + '",';
                                obj += '"CTLG_CODE":"' + datos[i].CTLG_CODE + '",';
                                obj += '"PIDM":"' + datos[i].PIDM + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE_EMPLEADO] = objeto;
                            });
                            process(arrayEmpleados);
                            Desbloquear("ventana");
                        },
                        updater: function (item) {
                            $("#hfpidm").val(map[item].PIDM);
                            $("#hfnombre_emp").val(map[item].NOMBRE_EMPLEADO);
                            return item;
                        },
                    });


                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectSolicitante.val(v_value);
                    Desbloquear("ventana");
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom('Error al intentar consultar empleados.');
                Desbloquear("ventana");
            }
        });

        selectSolicitante.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txt_empleado").val().length <= 0) {

                $("#hfpidm").val("");
                $("#hfnombre_emp").val("");
            }
        });
    }

    var CargaInicial = function () {

        $('#btnMail').attr('disabled', true)
        //var array = devuelveDatosUsuario(usuario);
        //$("#nombre_empl").html(array[0].NOMBRE);

        //Bloquear("ventana")
        //var oMes = ($("#optmes").datepicker('getDate').getMonth() + 1).toString();
        //var oAnho = $("#optanho").val();



        //setTimeout(function () {

        //    Lista_Asistencias(oAnho, oMes, array[0].PIDM);

        //}, 1000);

    }
    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());

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
var NNLMARB = function () {

    var plugins = function () {


        var d = new Date(); // today!
        var x = 1; // go back 5 days!
        d.setDate(d.getDate() - x);
        var m = d.getMonth() + 1;
        var y = d.getFullYear();

        $('#slcEmpresa').select2();
        $('#slcSucural').select2();
        $('#txt_fecha').daterangepicker({
            "autoApply": true,
            "locale": {
                "applyLabel": "Aplicar",
                "cancelLabel": "Cancelar",
                "fromLabel": "Desde",
                "toLabel": "Hasta"
            },
            startDate: m + "/" + d.getDate() + "/" + y,
            endDate: new Date(),

        });

    }




    var fillBandejaMarcaciones = function () {

        var parms = {
            data: null,
            //ordering: false,
            iDisplayLength: -1,
            //"sDom": "t",
            //"paging": false,
            //"scrollY": "380px",
            //"searching": false,
            //"info": false,
            order: [[0, 'asc']],
            columns: [
                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                },
                {
                    data: "NOMBRES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "HORA_ENTRADA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "HORA_SALIDA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "MARCACION_ENTRADA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "MARCACION_SALIDA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ],

            drawCallback: function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();

                var last = null;
                var color1 = "#FFF";
                var color2 = "#FFFACD";
                var aux;
                api.data().filter(function (obj, i) {
                    if (last !== (obj.PIDM + obj.FECHA).toString()) {
                        aux = color2;
                        color2 = color1;
                        color1 = aux;

                        last = (obj.PIDM + obj.FECHA).toString();
                        $(api.row(i).node()).css("background", color2);
                    } else {
                        $(api.row(i).node()).css("background", color2);
                    }
                });
            }

        }

        oTableMarcacion = iniciaTabla('tbl_marcaciones', parms);
        $('#tbl_marcaciones').removeAttr('style');




    }


    var eventoControles = function () {

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
                    if ($("#chk_todos").is(':checked')) {
                        $("#txt_empleado").val("").attr("disabled", true)
                    } else {
                        $("#txt_empleado").val("").attr("disabled", false)
                    }
                    if ($("#rb_activo").is(':checked')) {
                        estado = "A"
                    } else {
                        if ($("#rb_inactivo").is(':checked')) {
                            estado = "I"
                        }
                    }
                    filltxtEmpleado('#txt_empleado', '', estado);

                }, 1000);



                slc_ant = $(this).val();
            } else { slc_ant = ""; }
        });

        $('#chk_todos').on('click', function () {
            $("#input_empl").parent().attr("class", "control-group")

            if ($("#chk_todos").is(':checked')) {

                $('#uniform-undefined span').removeClass().addClass("checked");
                $('#chk_todos').attr('checked', true);
                $("#txt_empleado").val("").attr("disabled", true)

            } else {

                $('#uniform-undefined span').removeClass();
                $('#chk_todos').attr('checked', false);
                $("#txt_empleado").val("").attr("disabled", false)
            }


        });

        $('#btn_filtrar').on('click', function () {
            $("#input_empl").parent().attr("class", "control-group")
            var array_input = ["slcEmpresa", "slcSucural", "txt_fecha"];
            if ($("#chk_todos").is(':checked')) {
                $("#hfpidm").val("");
                var index = array_input.indexOf("txt_empleado");
                if (index > -1) {
                    array_input.splice(index, 1);
                }
            }
            else {
                array_input.push("txt_empleado");

            }


            if (vErrors(array_input)) {
                var fecha_desde = $.trim($("#txt_fecha").val().split("-")[0]);
                var fecha_hasta = $.trim($("#txt_fecha").val().split("-")[1]);
                var pidm = $("#hfpidm").val();
                var ind_activo = "";
                if ($("#rb_activo").is(':checked')) {
                    ind_activo = "A"
                } else {
                    if ($("#rb_inactivo").is(':checked')) {
                        ind_activo = "I"
                    }
                }
                var ctlg = $("#slcEmpresa").val()
                var scsl = $("#slcSucural").val()
                Bloquear("ventana");
                setTimeout(function () {

                    Lista_Marcaciones(pidm, ind_activo, fecha_desde, fecha_hasta, ctlg, scsl);

                }, 500);

            }

        });


        $('#rb_activo').on('click', function () {

            if ($("#rb_activo").is(':checked')) {
                $("#input_empl").parent().attr("class", "control-group")
                Bloquear("ventana");

                if ($("#chk_todos").is(':checked')) {
                    $("#txt_empleado").val("").attr("disabled", true)
                    Desbloquear("ventana")
                } else {
                    $("#txt_empleado").val("").attr("disabled", false)
                    setTimeout(function () {
                        $("#input_empl").children().remove();
                        $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")
                        filltxtEmpleado('#txt_empleado', '', 'A');

                    }, 1000);
                }






            }
        });

        $('#rb_inactivo').on('click', function () {

            if ($("#rb_inactivo").is(':checked')) {
                $("#input_empl").parent().attr("class", "control-group")
                Bloquear("ventana");
                if ($("#chk_todos").is(':checked')) {
                    $("#txt_empleado").val("").attr("disabled", true)

                    Desbloquear("ventana")
                } else {
                    $("#txt_empleado").val("").attr("disabled", false)
                    setTimeout(function () {
                        $("#input_empl").children().remove();
                        $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")
                        filltxtEmpleado('#txt_empleado', '', 'I');

                    }, 1000);
                }
            }
        });

    }

    var Lista_Marcaciones = function (pidm, ind_activo, fecha_desde, fecha_hasta, ctlg, scsl) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnllima.ashx?OPCION=3&FECHA_DESDE=" + fecha_desde + "&FECHA_HASTA=" + fecha_hasta + "&IND_ACTIVO=" + ind_activo + "&PIDM=" + pidm + "&CTLG_CODE=" + ctlg + "&SCSL_CODE=" + scsl,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTableMarcacion.fnClearTable();
                    oTableMarcacion.fnAddData(datos);


                }
                else {

                    oTableMarcacion.fnClearTable();

                }

                Desbloquear("ventana");

            },
            error: function (msg) {
               alertCustom("Error al obtener las marcaciones");
                Desbloquear("ventana");
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
                $('#slcSucural').append('<option value="T">TODOS</option>');
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
                    var estado = "A";
                    $("#input_empl").children().remove();
                    $("#input_empl").html(" <input type='text' class='span12' id='txt_empleado'>")
                    if ($("#rb_activo").is(':checked')) {
                        estado = "A"
                    } else {
                        if ($("#rb_inactivo").is(':checked')) {
                            estado = "I"
                        }
                    }
                    filltxtEmpleado('#txt_empleado', '', estado);
                    if ($("#chk_todos").is(':checked')) {
                        $("#txt_empleado").val("").attr("disabled", true)
                    } else {
                        $("#txt_empleado").val("").attr("disabled", false)
                    }

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

    function filltxtEmpleado(v_ID, v_value, estado_ind) {
        var selectSolicitante = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNLLIMA.ashx?OPCION=2&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&IND_ACTIVO=" + estado_ind,
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

            }
        });

    }

    var CargaInicial = function () {

        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();


        var d = new Date(); // today!
        var x = 1; // go back 5 days!
        d.setDate(d.getDate() - x);
        var m = d.getMonth() + 1;
        var dia = d.getDate();

        if (mm.toString().length == 1) {
            mm = "0" + mm;
        }

        if (m.toString().length == 1) {
            m = "0" + m;
        }

        if (dd.toString().length == 1) {
            dd = "0" + dd;
        }

        if (dia.toString().length == 1) {
            dia = "0" + dia;
        }

        var fecha_desde = dia + "/" + m + "/" + yyyy
        var fecha_hasta = dd + "/" + mm + "/" + yyyy
        $("#txt_fecha").val(fecha_desde + " - " + fecha_hasta);
    }

    return {
        init: function () {
            plugins();

            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            eventoControles();
            //filltxtEmpleado('#txt_empleado', '','A');
            CargaInicial();
            fillBandejaMarcaciones();
            $('#uniform-rbactivo span').removeClass().addClass("checked");
            $('#rb_activo').attr('checked', true);


        }
    };

}();
var array_validacion = ["slcEmpresa", "txt_fecha_ini", "txt_fecha_fin", "cbo_motivo", "txt_empleado"];

var NNLPESR = function () {

    var plugins = function () {

        $("#slcEmpresa").select2();
        $("#cbo_motivo").select2();
      

    }

    var eventoControles = function () {




        $('#btn_filtrar').on('click', function () {




            listaPerSinRemu($('#slcEmpresa').val(), $("#cbo_motivo").val());

        });







    }


    var fillBandejaPerioSRemuneracion = function () {


        var parms = {
            data: null,

            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "NOMBRE_EMPLEADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "MOTIVO_DESC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                   {
                       data: "FEC_INI",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   },
                     {
                         data: "FEC_FIN",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).attr('align', 'center')
                         }
                     },
                   {
                       data: "NESTADO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   }



            ]

        }

        oTable = iniciaTabla('tbl_periodo_sin_remuneracion', parms);
        $('#tbl_periodo_sin_remuneracion').removeAttr('style');
        $('#tbl_periodo_sin_remuneracion tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=nnmpesr&codigo=' + CODIGO;


            }
        });
    }


    var listaPerSinRemu = function (ctlg_code,motivo_code) {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMPESR.ashx?OPCION=1&p_CTLG_CODE=" + ctlg_code + "&p_MOTIVO=" + motivo_code,
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);


                }
                else {

                    oTable.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                MostrarError(msg, "ventana");
               
            }

        });

    }

    var fillMotivos = function () {

 
        $("#cbo_motivo").append('<option value="T">' + "TODOS" + '</option>');
        $("#cbo_motivo").append('<option value="' + 1 + '">' + "LICENCIAS SIN GOCE DE HABER" + '</option>');
        $("#cbo_motivo").append('<option value="' + 2 + '">' + "SUBSIDIADO POR ESSALUD" + '</option>');
        $("#cbo_motivo").append('<option value="' + 3 + '">' + "OTROS" + '</option>');
        $("#cbo_motivo").select2("val", "T").change();
    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option value="T">TODAS</option>');
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

    return {
        init: function () {
            plugins();
            eventoControles();
            fillMotivos();
            fillCboEmpresa();
            fillBandejaPerioSRemuneracion();
            listaPerSinRemu($('#slcEmpresa').val(), $("#cbo_motivo").val());
          
        }
    };

}();


var NNMPESR = function () {

    var plugins = function () {

        $("#slcEmpresa").select2();
        $("#cbo_motivo").select2();
        $("#txt_fecha_ini").datepicker();
        $("#txt_fecha_fin").datepicker();

    }

    var eventoControles = function () {


        var mot_ant = ""
        $('#cbo_motivo').on('change', function () {


            if (mot_ant != $(this).val()) {
                $("#txt_glosa").val("");
                if ($(this).val() == "3") {
                    $("#div_glosa").slideDown();
                    array_validacion.push("txt_glosa");
                  
                } else {
                    $("#div_glosa").attr("style", "display:none")
                    $($("#txt_glosa").parent().parent()).attr("class", "control-group");
                    array_validacion =  ["slcEmpresa", "txt_fecha_ini", "txt_fecha_fin", "cbo_motivo", "txt_empleado"];
                }
                $("#div_e").slideUp();
                mot_ant = $(this).val();
            } else { mot_ant = ""; }
        });

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {


            if (emp_ant != $(this).val()) {
                $("#txt_empleado").val("");

                $("#input_empl").children().remove();
                $("#input_empl").html(' <input id="txt_empleado" class="bloquear span12" type="text" placeholder="Buscar Empleado ...">')

                //Bloquear("input_empl")
                //setTimeout(function(){
                    filltxtEmpleado('#txt_empleado', '');
                
                //},400)

               


                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        $('#chkestado').on('click', function () {

            if ($("#chkestado").is(':checked')) {

                $('#uniform-chkestado span').removeClass().addClass("checked");
                $('#chkestado').attr('checked', true);


            } else {

                $('#uniform-chkestado span').removeClass();
                $('#chkestado').attr('checked', false);

            }


        });







    }

    var Draw_Acciones = function (id) {

        var html =  "<div class='form-actions'>" +
                    "<a id='grabar' class='btn blue' href='javascript:Grabar();'><i class='icon-save'></i>&nbsp;Grabar</a>&nbsp;&nbsp;" +
                    "<a class='btn' href='?f=NNMPESR'><i class='icon-remove'></i>&nbsp;Cancelar</a>" +
                    "</div>";

        $("#" + id).html(html);
    }


    var cargaInicial = function () {




        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {


            Bloquear("ventana");
        

         

            $.ajax({
                type: "post",
                url: "vistas/NN/ajax/NNMPESR.ashx?OPCION=1&p_CODIGO=" + CODE ,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    if (datos != "" && datos != null) {


                      
                        $('#txt_codigo').val(datos[0].CODIGO);
                        $('#cbo_motivo').select2("val", datos[0].MOTIVO_CODIGO).change();
                        $('#slcEmpresa').select2("val", datos[0].CTLG_CODE).change();
                     
                        $('#hfpidm').val(datos[0].PIDM);
                        $('#hfctlg_code').val(datos[0].CTLG_CODE);
                        $("#txt_glosa").val(datos[0].GLOSA)
                        $("#txt_fecha_ini").datepicker("setDate", datos[0].FEC_INI)
                        $("#txt_fecha_fin").datepicker("setDate", datos[0].FEC_FIN)
                        $('#txt_empleado').val(datos[0].NOMBRE_EMPLEADO);
                       

                        if (datos[0].ESTADO_IND == 'A') {

                            $('#uniform-chkestado span').removeClass().addClass("checked");
                            $('#chkestado').attr('checked', true);
                        } else {
                            $('#uniform-chkestado span').removeClass();
                            $('#chkestado').attr('checked', false);
                        }

                     
                        if (datos[0].IND_MODIF == '0') {
                            $(".bloquear").attr("disabled", true)
                            
                        } else {
                            Draw_Acciones("acciones");
                            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                            $("#grabar").attr("href", "javascript:Modificar();");
                        }

                    }
                    else {

                        noexitoCustom("Error carga inicial lsita de periodos sin remuneracion");
                    }
                    Desbloquear("ventana");

                },
                error: function (msg) {
          
                    MostrarError(msg,"ventana")
            
                }

            });
      

        } else {
            Draw_Acciones("acciones");

        }
    }


    var fillMotivos = function () {


        $("#cbo_motivo").append('<option value="' + 1 + '">' + "LICENCIAS SIN GOCE DE HABER" + '</option>');
        $("#cbo_motivo").append('<option value="' + 2 + '">' + "SUBSIDIADO POR ESSALUD" + '</option>');
        $("#cbo_motivo").append('<option value="' + 3 + '">' + "OTROS" + '</option>');

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
    function filltxtEmpleado(v_ID, v_value) {
    


        Bloquear("input_empl")

        var selectSolicitante = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNLLIMA.ashx?OPCION=2&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=T&IND_ACTIVO=" + "A",
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
                            Desbloquear("input_empl");
                        },
                        updater: function (item) {
                            $("#hfpidm").val(map[item].PIDM);
                            return item;
                        },
                    });


                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectSolicitante.val(v_value);
                  
                    Desbloquear("input_empl");
                }
                Desbloquear("input_empl");
            },
            error: function (msg) {
                alertCustom('Error al intentar consultar empleados.');
                Desbloquear("input_empl");
            }
        });




        selectSolicitante.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txt_empleado").val().length <= 0) {

                $("#hfpidm").val("");
            }
        });


    }
    return {
        init: function () {
            plugins();
            fillMotivos();
            fillCboEmpresa();
            filltxtEmpleado('#txt_empleado', '');
            eventoControles();
            cargaInicial();
          
        }
    };

}();


var Grabar = function () {

    var p_CTLG_CODE = '';
    var p_ESTADO = '';
    var p_FECHA_INI = '';
    var p_FECHA_FIN = '';
    var p_GLOSA = '';
    var p_MOTIVO = '';
    var p_PIDM = '';
    var p_USUA_ID = '';



    p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    p_ESTADO = $("#chkestado").is(':checked') ? 'A' : 'I';
    p_FECHA_INI = $("#txt_fecha_ini").val();
    p_FECHA_FIN = $("#txt_fecha_fin").val();
    p_GLOSA = $("#txt_glosa").val();
    p_MOTIVO = $.trim($('#cbo_motivo').val());
    p_PIDM = $("#hfpidm").val();
    p_USUA_ID = $.trim($('#ctl00_txtus').val());



    var data = new FormData();

    data.append("OPCION", "G");
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_ESTADO", p_ESTADO);
    data.append("p_FECHA_INI", p_FECHA_INI);
    data.append("p_FECHA_FIN", p_FECHA_FIN);
    data.append("p_GLOSA", p_GLOSA);
    data.append("p_MOTIVO", p_MOTIVO);
    data.append("p_PIDM", p_PIDM);
    data.append("p_USUA_ID", p_USUA_ID);

   
  
 
Bloquear("ventana");

if (vErrors(array_validacion)) {
    if (process($("#txt_fecha_ini").val()) > process($("#txt_fecha_fin").val())) {
        alertCustom("Fecha inicio debe ser menor a la fecha final!!!");
        Desbloquear("ventana");
    } else {
    

        $.ajax({
            url: "vistas/NN/ajax/NNMPESR.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos.split(",")[0] == "OK") {
                    $("#div_e").slideUp();
                    $("#txt_codigo").val(datos.split(",")[1]);
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");
                    exito();
                    if (process(datos.split(",")[2]) > process(p_FECHA_FIN)) {
                        $(".bloquear").attr("disabled", true);
                        $("#acciones").slideUp();
                        $("#acciones").remove();
                        $("#txt_empleado").removeAttr("style")
                    }


                } else {
                    if (datos.split(",")[0] == "E") {
                        $("#div_e").slideDown();

                        var html = "<b>Ya existe periodo Sin Remuneracion para el empleado&nbsp;" +
                                    $("#txt_empleado").val() +
                                    "&nbsp;desde&nbsp;" +
                                    $("#txt_fecha_ini").val() +
                                    "&nbsp;hasta&nbsp;" +
                                    $("#txt_fecha_fin").val() +
                                    "&nbsp;por motivo&nbsp;" +
                                     $('#cbo_motivo option:selected').text() +
                                    " &nbsp;&nbsp;</b> <i class='icon-remove-sign'></i>";

                        $("#lbl_msg").html(html);
                    }
                }

            },
            error: function (msg) {


                MostrarError(msg, "ventana");

            }
        });
    }
} else { Desbloquear("ventana")}
    





}

var Modificar = function () {

    var p_CTLG_CODE = '';
    var p_ESTADO = '';
    var p_FECHA_INI = '';
    var p_FECHA_FIN = '';
    var p_GLOSA = '';
    var p_MOTIVO = '';
    var p_PIDM = '';
    var p_USUA_ID = '';
    var p_CODIGO = '';


    p_CTLG_CODE = $.trim($('#slcEmpresa').val());
    p_ESTADO = $("#chkestado").is(':checked') ? 'A' : 'I';
    p_FECHA_INI = $("#txt_fecha_ini").val();
    p_FECHA_FIN = $("#txt_fecha_fin").val();
    p_GLOSA = $("#txt_glosa").val();
    p_MOTIVO = $.trim($('#cbo_motivo').val());
    p_PIDM = $("#hfpidm").val();
    p_USUA_ID = $.trim($('#ctl00_txtus').val());
    p_CODIGO = $("#txt_codigo").val();


    var data = new FormData();

    data.append("OPCION", "AT");
    data.append("p_CODIGO", p_CODIGO);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_ESTADO", p_ESTADO);
    data.append("p_FECHA_INI", p_FECHA_INI);
    data.append("p_FECHA_FIN", p_FECHA_FIN);
    data.append("p_GLOSA", p_GLOSA);
    data.append("p_MOTIVO", p_MOTIVO);
    data.append("p_PIDM", p_PIDM);
    data.append("p_USUA_ID", p_USUA_ID);




    Bloquear("ventana");

    if (vErrors(array_validacion)) {
        if (process($("#txt_fecha_ini").val()) > process($("#txt_fecha_fin").val())) {
            alertCustom("Fecha inicio debe ser menor a la fecha final!!!");
            Desbloquear("ventana");
        } else {


            $.ajax({
                url: "vistas/NN/ajax/NNMPESR.ASHX",
                type: "post",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (datos) {
                    Desbloquear("ventana");
                    if (datos.split(",")[0] == "OK") {
                        $("#div_e").slideUp();
                        exito();
                        if (process(datos.split(",")[1]) > process(p_FECHA_FIN)) {
                            $(".bloquear").attr("disabled", true);
                            $("#acciones").slideUp();
                            $("#acciones").remove();
                            $("#txt_empleado").removeAttr("style")
                        }


                    } else {
                        if (datos.split(",")[0] == "E") {
                            $("#div_e").slideDown();

                            var html = "<b>Ya existe periodo Sin Remuneracion para el empleado&nbsp;" +
                                        $("#txt_empleado").val() +
                                        "&nbsp;desde&nbsp;" +
                                        $("#txt_fecha_ini").val() +
                                        "&nbsp;hasta&nbsp;" +
                                        $("#txt_fecha_fin").val() +
                                        "&nbsp;por motivo&nbsp;" +
                                         $('#cbo_motivo option:selected').text() +
                                        " &nbsp;&nbsp;</b> <i class='icon-remove-sign'></i>";

                            $("#lbl_msg").html(html);
                        }
                    }

                },
                error: function (msg) {


                    MostrarError(msg, "ventana");

                }
            });
        }
    } else { Desbloquear("ventana") }






}


function process(date) {

    var parts = date.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);

}
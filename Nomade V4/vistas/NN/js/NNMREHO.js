var NNMREHO = function () {

    var plugins = function () {
        var date = new Date();
        var dd = date.getDate() - (date.getDate() - 1);
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();

        

       
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
            startDate: mm +"/"+dd+"/" + yyyy,
            endDate: new Date(),

        });
       
    }


    var fillBandejaEmpleados = function () {


        var parms = {
            data: null,
            //"sDom": "t",
            "paging": false,
            "scrollY": "623px",
            "searching": true,
            "info": false,
            columns: [
                {
                    data: "EMPLEADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "PIDM",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('style', 'display:none')

                    }
                },
                {
                    data: "CODIGO_HORARIO",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('style', 'display:none')

                    }
                } 
                

            ]

        }

        oTable = iniciaTabla('tbl_empl', parms);
        $('#tbl_empl').removeAttr('style');
        $("#tbl_empl_filter").children().attr("style", "color:white");
        $('#tbl_empl tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected2')) {
                $(this).removeClass('selected2');
                $("#hf_nom_empl").val("");
                $("#hf_pidm_empl").val("");
                $("#hf_fecha_empl").val("");
                $("#hf_index_e").val("");
                oTableMarcacion.fnClearTable();
                $('#body_horario').empty();
                $('#body_horario').append('<tr><td style="text-align: center;">----</td><td style="text-align: center;">--:--</td></tr>');
                $('#body_horas_re').empty();
                $('#body_horas_re').append('<tr><td style="text-align: center;">--:--</td></tr>');
                $("#boton").attr("style", "text-align:center;display:none;");
            }
            else {
                oTable.$('tr.selected2').removeClass('selected2');
                $(this).addClass('selected2');
             
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO_HORARIO = row.CODIGO_HORARIO;
                var PIDM = row.PIDM;
                var FECHA = row.FECHA;
                $("#hf_nom_empl").val(row.EMPLEADO);
                $("#hf_pidm_empl").val(PIDM);
                $("#hf_fecha_empl").val(FECHA);
                $("#hf_index_e").val(pos);

                $("#error").attr("style","display:none");
                Bloquear("ventana");
              


                setTimeout(function () {
               
                    Get_Horarios(FECHA, PIDM),
                             Get_Horas_Regularizar(PIDM, FECHA),
                             Get_Marcacion_Real_Biometrico(PIDM, FECHA)

                }, 1000);


            }
        });

    }


    var fillBandejaMarcaciones = function () {

        var parms = {
            data: null,
            //"sDom": "t",
            "paging": false,
            "scrollY": "380px",
            "searching": false,
            "info": false,
            columns: [
                {
                    data: "MARCACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
               


            ]

        }

        oTableMarcacion = iniciaTabla('tbl_marcaciones', parms);
        $('#tbl_marcaciones').removeAttr('style');




    }


    var eventoControles = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana");
                ListarSucursales($('#slcEmpresa').val());
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });



        $('#btn_filtrar').on('click', function () {

            if (vErrors(["slcEmpresa", "slcSucural", "txt_fecha"])) {
                var fecha_desde = $("#txt_fecha").val().split("-")[0];
                var fecha_hasta = $("#txt_fecha").val().split("-")[1];

                Bloquear("ventana");
                setTimeout(function () {

                    Lista_Regularizacion_X_horas_Emp($("#slcEmpresa").val(), $("#slcSucural").val(), fecha_desde, fecha_hasta);

                }, 1000);

            }

        });


        $('#brn_regularizar').on('click', function () {

            var cadena = "", divs_msgs = [], horas = [];
            $(".picker :input").each(function (index) {
                //console.log(index + ": " + $(this).val() + $(this).attr("id"));

                if ($(this).val() == "") {
                    cadena += "0"
                    divs_msgs.push("#div_msg" + index);
                }
                if ($(this).val() != "") {
                    cadena += "1"
                }
            });
            //console.log(divs_msgs);

            //divs_msgs = [];
            var bits_validacion = ["0000", "0011", "1100", "1111", "11", "00"];
            var existe = bits_validacion.indexOf(cadena);
            if (existe == -1) {
                $(".popovers").html("");
                $("#error").attr("style","display:block")
                $(divs_msgs.toString()).html("<span style='color: red;font-size: x-large;'><i class='icon-exclamation-sign'></i></span>")
                $("#msg_text").html("Campos no deben estar vacios.")
            } else {
                //$("#error").removeClass("in")
                //$(".popovers").html("")
                //evalua mayores menores
                if (existe == 3 || existe == 4) {//caso execpcion 1111 - 11 ahi valida
                    $(".picker :input").each(function (index) {

                        horas.push($(this).val());
                    });
                    var hora_ = new Date(new Date().toDateString() + ' ' + '00:00')
                    divs_msgs = [];
                    for (var i = 0 ; i < horas.length ; i++) {

                        if (i < (horas.length - 1)) {
                            if (new Date(new Date().toDateString() + ' ' + horas[i].toString()) > hora_ && new Date(new Date().toDateString() + ' ' + horas[i].toString()) < new Date(new Date().toDateString() + ' ' + horas[i + 1].toString())) {

                            }
                            else {
                                divs_msgs.push("#div_msg" + i);
                            }

                        }
                        else {

                            if (new Date(new Date().toDateString() + ' ' + horas[i].toString()) > hora_) {

                            }
                            else {
                                divs_msgs.push("#div_msg" + i);
                            }
                        }


                        hora_ = new Date(new Date().toDateString() + ' ' + horas[i].toString());
                    }

                    if (divs_msgs.length > 0) {
                        $(".popovers").html("")
                        $("#error").attr("style","display:block")
                        $("#msg_text").html("Hora de entrada no debe ser mayor a la hora de salida ó la Hora de salida no debe ser menor a la hora de entrada")
                        $(divs_msgs.toString()).html("<span style='color: red;font-size: x-large;'><i class='icon-exclamation-sign'></i></span>")
                    } else {
                        $("#error").attr("style", "display:none")
                        $(".popovers").html("")
                        /////M O D A L                   C O N F I R M A C I O N//////////
                        // $($("#MuestraModalAceptar").children().children()[1]).html("¿Deseas realmente regularizar?")
                        $($("#empleado_modal").html($("#hf_nom_empl").val()));
                        $("#horas_modal").empty();

                        $(".td_horario").each(function (index) {
                            $("#horas_modal").append("<td class='hidden-phone'>" + $(this).text() + "</td>")
                            $("#head_horario").attr("colspan", index +1)
                        });

                        $(".picker :input").each(function (index) {
                            $("#horas_modal").append("<td class='hidden-phone'>" + $(this).val() + "</td>")
                            $("#head_hora_tomada").attr("colspan", index + 1)
                        });

                     

                        $("#MuestraModalAceptar").modal("show");
                    }
                } else {

                    $("#error").attr("style","display:none")
                    $(".popovers").html("")
                    /////M O D A L                   C O N F I R M A C I O N//////////
                    // $($("#MuestraModalAceptar").children().children()[1]).html("¿Deseas realmente regularizar?")
                    $($("#empleado_modal").html($("#hf_nom_empl").val()));
                    $("#horas_modal").empty();


                    $(".td_horario").each(function (index) {
                        $("#horas_modal").append("<td class='hidden-phone'>" + $(this).text() + "</td>")
                        $("#head_horario").attr("colspan", index + 1)
                    });

                    $(".picker :input").each(function (index) {
                        $("#horas_modal").append("<td class='hidden-phone'>" + $(this).val() + "</td>")
                        $("#head_hora_tomada").attr("colspan", index + 1)
                    });

                  

                    $("#MuestraModalAceptar").modal("show");
                }

            }

        });

     
        

    }

    var Lista_Regularizacion_X_horas_Emp = function (emp, scsl, fecha_desde,fecha_hasta) {
       
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=1&CTLG_CODE=" + emp + "&SCSL_CODE=" + scsl + "&FECHA_DESDE=" + fecha_desde + "&FECHA_HASTA=" + fecha_hasta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {

                    oTable.fnClearTable();
                    oTableMarcacion.fnClearTable();
                    oTable.fnAddData(datos);
                   

                }
                else {

                    oTable.fnClearTable();
                    oTableMarcacion.fnClearTable();
                    
                }
                $('#body_horario').empty();
                $('#body_horario').append('<tr><td style="text-align: center;">----</td><td style="text-align: center;">--:--</td></tr>');
                $('#body_horas_re').empty();
                $('#body_horas_re').append('<tr><td style="text-align: center;">--:--</td></tr>');
                $("#boton").attr("style", "text-align:center;display:none;");
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
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
                   

                }
                else {
                    noexito();
                }

                // Desbloquear("divadd_empl");
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                // Desbloquear("divadd_empl");
                Desbloquear("ventana");
            }
        });
    }



    var Get_Horarios = function (fecha,pidm) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=2&FECHA=" + fecha + "&PIDM=" + pidm + "&CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#body_horario').empty();
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                      

                        $('#body_horario').append('<tr style="height:56px;"><td style="text-align: center;vertical-align:middle;">ENTRADA</td><td class="td_horario" style="text-align: center;vertical-align:middle;">' + datos[i].HORA_INICIO + '</td></tr>');
                        $('#body_horario').append('<tr style="height:56px;"><td style="text-align: center;vertical-align:middle;">SALIDA</td><td class="td_horario" style="text-align: center;vertical-align:middle;">' + datos[i].HORA_FIN + '</td></tr>');
                    }
                    $("#boton").attr("style", "text-align:center;display:block;");
                }
                
                Desbloquear("ventana")
            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana")
            }
        });

    }


    var Get_Horas_Regularizar = function (pidm,fecha) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=3&PIDM=" + pidm + "&FECHA=" + fecha,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //$('.picker').datetimepicker('destroy');
                $('#body_horas_re').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                       
                       
                        $('#body_horas_re').append('<tr><td style="text-align: center;"><div class="span2"></div><div id="datetimepicker' + i + '" class="input-append picker span8"><input id="hora' + i + '" style="width:62px;text-align:center;" class="m-wrap" data-format="hh:mm"  type="text" ><span class="add-on"><i class="icon-time"></i></span></div><div class="span2 popovers" data-trigger="hover" data-content="Popover body goes here! Popover body goes here!" data-original-title="Popover in right" id="div_msg' + i + '"></div></td><td class="id_s" style="display: none;">' + datos[i].recordid + '</td><tr>');
                      
                        //$('.picker').datetimepicker({
                        //    maskInput: false,           // disables the text input mask
                        //    pickDate: false,            // disables the date picker
                        //    pickTime: true,            // disables de time picker
                        //    pick12HourFormat: true,   // enables the 12-hour format time picker
                        //    pickSeconds: false        // disables seconds in the time picker

                        //});
                        $("#hora" + i).focus(function () { $(this).inputmask("H:0") });
                        $("#hora" + i).blur(function () { if ($(this).val().indexOf("_") != -1) { $(this).val(($(this).val().replace("__", "00"))); } });
                        if (datos[i].MARCACION != "") {
                           
                            var hora = datos[i].MARCACION.split(":")[0]
                            var min = datos[i].MARCACION.split(":")[1]

                            var d = new Date();
                            var month = d.getMonth() +1;
                            var day = d.getDate();
                            var year = d.getFullYear();

                            //$("#datetimepicker" + i).data('datetimepicker').setLocalDate(new Date(year, month, day, hora, min));
                            //$("#datetimepicker" + i).datetimepicker('destroy');
                            $("#hora" + i).val(hora +":"+ min)

                           
                            //$("#hora" + i).attr("disabled", true);

                        }

                    }

                }

                Desbloquear("ventana")
            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana")
            }
        });


    }


    var Get_Marcacion_Real_Biometrico = function (pidm, fecha) {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=4&PIDM=" + pidm + "&FECHA=" + fecha,
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
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }

    var cargaInicial = function () {
        Bloquear("ventana");
        var date = new Date();
        var dd = date.getDate() ;
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();

        if (mm.toString().length == 1) {
            mm = "0" + mm;
        }


        if (dd.toString().length == 1) {
            dd = "0" + dd;
        }

        var fecha_desde = "01" + "/" + mm + "/"+ yyyy
        var fecha_hasta = dd  + "/" + mm + "/" + yyyy
        $("#txt_fecha").val(fecha_desde + " - " + fecha_hasta);

        
        

        var msg = "<div class='alert alert-block alert-warning fade in'>"+
									"<h4 class='alert-heading'>Alerta!</h4>"+
									"<p>"+
									"Se han encontrado marcaciones regularizadas ," +
                                    "que no han sido procesadas, por favor <b>Click en Procesar</b> antes de continuar."+
                                "</p>"+
                                "<p>"+
                                    "<a id='btn_procesar_warning' class='btn red' href='JavaScript:Procesar_warning();'>Procesar</a> " +
                                "</p>"+
                            "</div>";

        setTimeout(function () {
            Lista_Regularizacion_X_horas_Emp($("#slcEmpresa").val(), $("#slcSucural").val(), fecha_desde, fecha_hasta);
            $.ajax({
                type: "post",
                url: "vistas/nn/ajax/nnmreho.ashx?OPCION=5",
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    $('#msg_warning').empty();
                    if (datos != null) {




                        $('#msg_warning').append(msg);
                        $('#msg_warning').slideDown();

                    } else {
                        $(".a").removeAttr("style");
                        oTable.fnDraw();
                        oTableMarcacion.fnDraw();
                        $('#msg_warning').attr("style","display:none");
                       

                    }

                    Desbloquear("ventana")
                },
                error: function (msg) {
                    alert(msg);
                    Desbloquear("ventana")
                }
            });

        }, 1000);


      

    }

    return {
        init: function () {
            plugins();
          
            fillCboEmpresa();
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
            fillBandejaEmpleados();
            fillBandejaMarcaciones();
           
            cargaInicial();
           
            $($('.dataTables_scrollBody')[1]).attr("style", "overflow: auto;max-height:280px;width:100%");

        }
    };

}();



var Regularizar = function () {

        var PIDM = '';
        var FECHA = '';
        var horas = '';
        var id_s = '';
       
       
        


        $(".picker :input").each(function (index) {

            if ($(this).val() == "") {
                horas += "%,";
            } else {
                horas += $(this).val() + ","
            }
          
        });
        horas += "*";
        horas = horas.replace(",*", "");

        $(".id_s").each(function (index) {
            id_s += $(this).text() + ","
        });
        id_s += "*";
        id_s = id_s.replace(",*", "");

        PIDM = $("#hf_pidm_empl").val();
        FECHA = $("#hf_fecha_empl").val();




        var data = new FormData();

        data.append("OPCION", "AT");
        data.append("PIDM", PIDM);
        data.append("FECHA", FECHA);
        data.append("p_HORAS", horas);
        data.append("p_Ids", id_s);


        var boton = "<a id='btn_procesar' class='btn green' href='JavaScript:procesar();'>Procesar&nbsp <i class='icon-cogs'></i></a> ";

        Bloquear("Ventana");

        setTimeout(function () {
            $.ajax({
                url: "vistas/NN/ajax/NNMREHO.ASHX",
                type: "post",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success: function (datos) {
                    Desbloquear("Ventana");
                    if (datos == "OK") {

                        oTable.fnDeleteRow($("#hf_index_e").val());
                        oTableMarcacion.fnClearTable();
                        $('#body_horario').empty();
                        $('#body_horario').append('<tr><td style="text-align: center;">----</td><td style="text-align: center;">--:--</td></tr>');
                        $('#body_horas_re').empty();
                        $('#body_horas_re').append('<tr><td style="text-align: center;">--:--</td></tr>');
                        $("#boton").attr("style", "text-align:center;display:none;");
                      
                        exito();
                        $("#accion_procesar").empty();
                        $("#accion_procesar").append(boton);
                        $(".b").attr("style", "display:block");

                    } else {

                        if (datos == "E") {

                            alertCustom("Error al regularizar")
                        } else {
                            alertCustom("Error al regularizar")
                        }

                    }
                    Desbloquear("Ventana");
                    $("#MuestraModalAceptar").modal('hide')
                    Desbloquear("MuestraModalAceptar");
                },
                error: function (msg) {
                    Desbloquear("Ventana");
                    $("#MuestraModalAceptar").modal('hide')
                    Desbloquear("MuestraModalAceptar");
                    alertCustom("Error al regularizar")
                }
            });


        }, 1000);

        

        
    
}


var HideAceptar = function () {

    Bloquear("MuestraModalAceptar");

    setTimeout(function () {

        Regularizar();

    }, 1000);

}



var Procesar_warning = function () {


    Bloquear("ventana");
    setTimeout(function () {

        


        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=C&p_AUTOMATICO=N&CTLG_CODE=" + $("#slcEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {




                  
                    $(".a").removeAttr("style");
                    oTable.fnDraw();
                    oTableMarcacion.fnDraw();
                    $('#msg_warning').attr("style", "display:none");
                    exito()
                }

                Desbloquear("ventana")
            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana")
            }
        });

    }, 1000);

}



var procesar = function () {

   
    Bloquear("ventana");
    setTimeout(function () {




        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmreho.ashx?OPCION=C&p_AUTOMATICO=N&CTLG_CODE=" + $("#slcEmpresa").val() ,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    exito()
                    $("#accion_procesar").empty();
                    $(".b").attr("style", "display:none");
                 
                }

                Desbloquear("ventana")
            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana")
            }
        });

    }, 1000);
}
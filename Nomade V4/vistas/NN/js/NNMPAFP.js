var NNLPAFP = function () {
    var plugins = function () {

        $('#slcEmpresa').select2()

    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option value="T">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#slcEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillBandeja = function () {


        var parms = {
            data: null,

            columns: [
                {
                    data: "DESC_CTLG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "DESC_PLANILLA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "NUM_AFP",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                   {
                       data: "NUM_EMP",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   }
                   ,
                   {
                       data: "FECHA_GENERACION",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   }
                   ,
                   {
                       data: "USUA_GENERO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   }


            ]

        }

        oTable = iniciaTabla('tbl_afp', parms);
        $('#tbl_afp').removeAttr('style');
        $('#tbl_afp tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO = row.COD_PLANILLA;
                window.location.href = '?f=NNMPAFP&codigo=' + CODIGO;
            }
        });
    }




    var eventoComtroles = function () {


        $('#btn_filtrar').on('click', function () {
            $("#btn_filtrar").blur()
           
            if (vErrors(["slcEmpresa"])) {
                listaPlanillasGeneradas();
            }
        });


    }




    var listaPlanillasGeneradas = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMPAFP.ashx?OPCION=2&p_CTLG_CODE=" + $("#slcEmpresa").val(),
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
                alert(msg);
                Desbloquear("ventana");
            }

        });

    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            fillBandeja();
            listaPlanillasGeneradas();
            eventoComtroles();

        }
    };

}();



var NNMPAFP = function () {
    var plugins = function () {

        $('#slcEmpresa').select2()
        $("#cbo_planilla").select2();
      
        $("#txt_fec_generacion").datepicker("setDate", "now")
    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option  corto="' + datos[i].CORTO + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#slcEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }


    var fillCbo_Planilla = function (ctlg_code) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcepl.ashx?OPCION=2&p_CTLG_CODE=" + ctlg_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_planilla').empty();
                $('#cbo_planilla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_planilla').append('<option   mes_num="' + datos[i].MES_NUM + '" anio="' + datos[i].ANIO + '"   mes="' + datos[i].MES + '"     value="' + datos[i].CODIGO_PLANILLA + '">' + datos[i].DESC_PLANILLA + '</option>');
                    }



                }
                Desbloquear("ventana")
                $('#cbo_planilla').select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error cargar planilla");
                Desbloquear("ventana")
            }
        });
    }


    var fillCbo_Planilla_Sin_Generar = function (ctlg_code) {

        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/nnmcepl.ashx?OPCION=2&p_CTLG_CODE=" + ctlg_code + "&p_TIPO=3" ,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_planilla').empty();
                $('#cbo_planilla').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_planilla').append('<option   mes_num="' + datos[i].MES_NUM + '" anio="' + datos[i].ANIO + '"   mes="' + datos[i].MES + '"     value="' + datos[i].CODIGO_PLANILLA + '">' + datos[i].DESC_PLANILLA + '</option>');
                    }



                }
                Desbloquear("ventana")
                $('#cbo_planilla').select2("val", "");
            },
            error: function (msg) {
                alertCustom("Error cargar planilla");
                Desbloquear("ventana")
            }
        });
    }


    var eventoComtroles = function () {




        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana")
                setTimeout(function () {

                    fillCbo_Planilla_Sin_Generar($('#slcEmpresa').val())

                  
                    emp_ant = $(this).val();

                }, 1000);

            } else { emp_ant = ""; }
        });


        $("#btn_generar").on('click', function () {
            $("#btn_generar").blur();
              
            if (vErrors(["slcEmpresa", "cbo_planilla"])) {
            
                var barra = $("#barra_progreso")
                barra.css("width", 0 + "%")
                $("#modal_progress").modal("show")

                var cont = 10;
                var intervalo = setInterval(function () {

                    barra.css("width", cont + "%")
                    if (cont == 100) { cont = 0; } else { cont = cont + 10; }

                }, 1000)



                setTimeout(function () {

                    $.ajax({
                        type: "post",
                        url: "vistas/nn/ajax/NNMPAFP.ashx?OPCION=1&p_PLANILLA_CODE=" + $("#cbo_planilla").val() + "&p_USUA_ID=" + $('#ctl00_txtus').val(),
                        contenttype: "application/json;",
                        datatype: "json",
                        async: false,
                        success: function (datos) {
                            if (datos != "" && datos != null) {


                                $('#body_table').html("");
                                for (var i = 0; i < datos.length; i++) {

                                    var cadena = "";
                                    cadena += "<tr>"
                                    cadena += '<td>' + datos[i].AFP_DESC + '</td>'
                                    cadena += '<td>' + datos[i].NRO_EMPLEADOS + '</td>'
                                    cadena += '<td>' + formatoMiles(datos[i].TOTAL_APORTACION) + '</td>'
                                    cadena += '<td>' + formatoMiles(datos[i].TOTAL_RETENCION) + '</td>'
                                    cadena += "</tr>"

                                    $('#body_table').append(cadena);

                                }
                                $("#div_table").attr("style", "display:block")
                                var titulo = "PLANILLA [AFP] "
                                titulo = titulo + $("#cbo_planilla option:selected").attr("mes") + " " +
                                                  $("#cbo_planilla option:selected").attr("anio") + " - " + $("#slcEmpresa option:selected").attr("corto")
                                $("#titulo").html("").html(titulo);
                                $("#titulo").attr("style", "display:block;text-align: center;")

                                clearInterval(intervalo)
                                barra.css("width", 100 + "%")
                                setTimeout(function () {
                                    $(".bloquear").attr("disabled", true);
                                    $("#div_btn_generar").remove()
                                    $(".borrar").remove()
                                    $("#modal_progress").modal("hide");
                                    exito();
                                 
                                }, 2000);

                                


                            }
                            else {
                                clearInterval(intervalo)
                                alertCustom("No hay datos para generar planilla afp, por favor verifica si exiten planillas cerradas!")
                                $("#modal_progress").modal("hide")


                            }



                        },
                        error: function (msg) {
                            clearInterval(intervalo)
                            alertCustom("Error al generar planilla afp.")
                            $("#modal_progress").modal("hide")


                        }

                    });

                }, 3000);


            }
          
        });

        $('#btn_ver_detalle').on('click', function () {
            $('#btn_ver_detalle').blur();

            var titulo = "PLANILLA [AFP] "
            titulo = titulo + $("#cbo_planilla option:selected").attr("mes") + " " +
                              $("#cbo_planilla option:selected").attr("anio") + " - " + $("#slcEmpresa option:selected").attr("corto")
            $("#titulo").html("").html(titulo);
            $("#titulo").attr("style", "display:block;text-align: center;")
            $("#div_table").attr("style", "display:block")
         
         

        });

    }





 

    var cargaInicial = function () {

        $("#txt_usua_id").val($("#ctl00_txtus").val())


        var CODE = ObtenerQueryString("codigo");
        if (typeof (CODE) !== "undefined") {

      

            Bloquear("ventana")
            var data = new FormData();

            data.append('OPCION', '3');
            data.append('p_PLANILLA_CODE', CODE);

            $.ajax({

                url: "vistas/nn/ajax/NNMPAFP.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {

                        $("#div_btn_detalle").css("display", "block")

                       
                        $("#txt_usua_id").val(datos[0].USUA_GENERO)
                        $("#txt_fec_generacion").datepicker("setDate", datos[0].FECHA_GENERACION)
                      
                        $("#slcEmpresa").select2("val", datos[0].CTLG_CODE)
                        fillCbo_Planilla($('#slcEmpresa').val())
                        $("#cbo_planilla").select2("val", datos[0].COD_PLANILLA)

                        $(".bloquear").attr("disabled", true);

                        $('#body_table').html("");
                        for (var i = 0; i < datos.length; i++) {

                            var cadena = "";
                            cadena += "<tr>"
                            cadena += '<td>' + datos[i].DESC_AFP + '</td>'
                            cadena += '<td>' + datos[i].NRO_EMPLEADOS + '</td>'
                            cadena += '<td>' + datos[i].TOTAL_FONDO + '</td>'
                            cadena += '<td>' + datos[i].TOTAL_RETENCION + '</td></tr>'
                            cadena += "</tr>"

                            $('#body_table').append(cadena);

                        }
                    
                        Desbloquear("ventana")

                    }
                    else { Desbloquear("ventana");alertCustom("no hay datos que mostrar"); }
                }



            });


        } else {

            $("#div_btn_generar").css("display", "block");
        }
    }


    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCbo_Planilla_Sin_Generar($('#slcEmpresa').val())
            eventoComtroles();
            cargaInicial();
        }
    };

}();
var NNLLIQB = function () {
    
    var fillBandejaLiq = function () {

        var parms = {
            data: null,

            columns: [
                {
                    visible: false,
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    visible:false,
                    data: "ARCHIVO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                 {
                     data: "NOMBRE_EMPLEADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     }
                 },
                  {
                      data: "DNI",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center')
                      }
                  },
                     {
                         data: "FECHA_LIQ",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).attr('align', 'center')
                         }
                     },
                  
                
               

                      {
                          data: null,
                         
                          createdCell: function (td, cellData, rowData, row, col) {
                              if (rowData.ARCHIVO != "") {
                                  $(td).html('<a class="btn purple"   download="' + rowData.ARCHIVO + '"  href="..\\..\\..\\Archivos\\' + rowData.ARCHIVO + '.pdf" style="border-radius:4px!important"><i class="icon-file"></i></a>')
                                  $(td).attr('align', 'center')
                                  }
                          }
                      }

            ]

        }

        oTableLiq = iniciaTabla('tbl_liq_empl', parms);
        $('#tbl_liq_empl').removeAttr('style');
      
    }
    
    var eventoControles = function () {





    }
    
    var listaLiq = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMLIQB.ashx?OPCION=4",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTableLiq.fnClearTable();
                    oTableLiq.fnAddData(datos);


                }
                else {

                    oTableLiq.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alertCustom(msg);
                Desbloquear("ventana");
            }

        });

    }

    return {
        init: function () {

            fillBandejaLiq();
            listaLiq();
        }
    };

}();

var NNMLIQB = function () {
    
    var plugins = function () {
        $('#slcSucural').select2();
        $('#slcEmpresa').select2();
        $('#cboEmpleado').select2();        
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
                alertCustom(msg);
            }
        });
    }

    var eventoControles = function () {

        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                ListarSucursales($('#slcEmpresa').val());
                fillCboEmpleado();
                $('#cboEmpleado').select2('val', '').change();
                emp_ant = $(this).val();
                Limpiar();
                $("#mostrar").slideUp();

            } else { emp_ant = ""; }
        });

        var scsl_ant = "";
        $('#slcSucural').on('change', function () {
            if (scsl_ant != $(this).val()) {
                scsl_ant = $(this).val();
                Limpiar();
                $("#mostrar").slideUp();
            } else { scsl_ant = ""; }

        });

        $('#cboEmpleado').on('change', function () {
            $('#hfpidm').val($('#cboEmpleado').val());
            $('#hfdni').val($("#cboEmpleado option:selected").attr("data-dni")); 
            $('#hfest_contrato').val($("#cboEmpleado option:selected").attr("data-contrato"));  
            $('#hfruc').val($("#cboEmpleado option:selected").attr("data-ruc"));  
            $('#hfest_contrato_desc').val($("#cboEmpleado option:selected").attr("data-estado"));  
            $('#hfnombres').val($("#cboEmpleado option:selected").attr("data-empleado"));  
        });

        $('#btn_consultar').on('click', function () {
            Bloquear("ventana");
            if ($("#hfpidm").val() != "") {
                $("#mostrar").slideDown();

                $("#nombres").html("NOMBRES&nbsp;:<br>-&nbsp;&nbsp;" + $("#hfnombres").val());
                $("#documento").html("D.N.I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + $("#hfdni").val() );
                $("#estado").html("ESTADO&nbsp;:<br>-&nbsp;&nbsp;" + $("#hfest_contrato_desc").val());
                
                oPidm = $("#hfpidm").val();

                getContrato($("#hfpidm").val());

                $("#nro_contrato").html("N° CONTRATO&nbsp;:<br>-&nbsp;&nbsp;" + $("#hfnro_contrato").val());
                $("#fec_inicio").html("FECHA INICIO&nbsp;:<br>-&nbsp;&nbsp;" + $("#hffec_ini").val());
                $("#fec_fin").html("FECHA FIN&nbsp;:<br>-&nbsp;&nbsp;" + $("#hffec_fin").val());
                $("#fecha_cese").html("FECHA CESE&nbsp;:<br>-&nbsp;&nbsp;" + $("#hffecha_cese").val());


                if ($("#hfest_LIQ").val() != "L") {
                    $("#error_liq").slideUp();
                    if ($("#hfest_contrato").val() == "I") {

                        //$("#error").attr("style", "display:none");
                        $("#error").slideUp();
                        $("#div_visualizar").attr("style", "display:block");
                        $("#div_vac_gozadas").attr("style", "display:block");
                        $("#divHojaLiquidacion").attr("style", "overflow: scroll;height:450px; margin-bottom:20px;resize:vertical;display:block");
                    }
                    else {

                        // $("#error").attr("style", "display:block");
                        $("#error").slideDown();
                        $("#div_visualizar").attr("style", "display:none");
                        $("#div_vac_gozadas").attr("style", "display:none");
                        $("#div_liquidar").attr("style", "display:none");
                        $("#divHojaLiquidacion").attr("style", "overflow: scroll;height:450px; margin-bottom:20px;resize:vertical;display:none");
                    }
                } else {

                    $("#error_liq").slideDown();

                }               
                Limpiar();                               
            } else {
                infoCustom2("No se seleccionó ningún empleado")
                Desbloquear("ventana");
            }

        });
       
        
        $('#btn_vac_gozadas').on('click', function () {

            window.open('?f=NPMEMVA&pidm=' + oPidm + '&ctlg_code=' + $('#slcEmpresa').val() + '&scsl_code=' + $('#slcSucural').val(), '_blank');
            //window.location.href = '?f=NPMEMVA&pidm=' + oPidm;



        });

        $('#btn_visualizar').on('click', function () {
            oDetalle = '';
            Bloquear("ventana");

            //var estado = verificarLiquidacion();
          
            getGeneraTable("v");


            if ($('#vac_pendientes').text() != "") {
                oDetalle = $('#vac_pendientes').text();
            }


            for (var i = 0 ; i < $('.vacaciones').length ; i++){
                if (oDetalle != '') {
                    oDetalle = oDetalle + ";" + $($('.vacaciones')[i]).text();
               
                }
                else {
                    oDetalle =  $($('.vacaciones')[i]).text();

                }
            
            }


            if ($('#cts').text() != "" && $('#grati').text() != "") {
                if (oDetalle != '') {
                    oDetalle = oDetalle + ";" + $('#cts').text() + ";" + $('#grati').text() + ";" + $('#aportes').text();
                }
                else {
                    oDetalle =  $('#cts').text() + ";" + $('#grati').text() + ";" + $('#aportes').text();

                }
            }
            if ($('#cts').text() == "" && $('#grati').text() == "") {

                if (oDetalle != '') {
                    oDetalle = oDetalle + ";" + $('#aportes').text();
                }
                else {
                    oDetalle =  $('#aportes').text();
                }
              
            }
       
           

        });
    }

    var ListarSucursales = function (ctlg) {
        var bool = false;
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {
                    Desbloquear("ventana")
                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {

                        $("#slcSucural").select2("val", datos[0].CODIGO);
                    }


                }
                else {
                    noexito();
                    Desbloquear("ventana")
                }



            },
            error: function (msg) {
                alertCustom(msg);
                Desbloquear("ventana")
            }
        });
    }   

    //var verificarLiquidacion = function () {

        
    //}    

    
    var fillCboEmpleado = function () {
        $.ajax({
            type: "post",
            //url: "vistas/np/ajax/NPMEMCO.ashx?OPCION=LEMP&PIDM=0&CTLG_CODE=" + $('#slcEmpresa').val() + "&SCSL_CODE=" + $('#slcSucural').val() + "&ESTADO_IND=A",
            url: "vistas/nn/ajax/NNMLIQB.ashx?OPCION=1&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpleado').empty();
                $('#cboEmpleado').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpleado').append('<option value="' + datos[i].PIDM + '" data-dni="' + datos[i].DNI + '" data-contrato="' + datos[i].ESTADO_CONTRATO + '" data-ruc="' + datos[i].RUC + '" data-estado="' + datos[i].ESTADO_CONT + '" data-empleado="' + datos[i].NOMBRE_EMPLEADO   +'">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }                    
                } else {
                    $('#cboEmpleado').select2('val', '').change();
                    
                }
            },
            error: function (msg) {
                alertCustom("Empleados no se listaron correctamente");
            }
        });
    };

    var getContrato = function (pidm) {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMLIQB.ashx?OPCION=2&PIDM=" + pidm,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
               
                if (datos != null && datos != "") {
                   
                    $("#hfnro_contrato").val(datos[0].NRO);
                    $("#hffec_ini").val(datos[0].FECHA_INI);
                    $("#hffec_fin").val(datos[0].FECHA_FIN);
                    $("#hffecha_cese").val(datos[0].FECHA_CESE);
                    $("#hfest_LIQ").val(datos[0].LIQ_IND);
                }
                else {
                    //noexitoCustom("Empleado sin Contrato!")
                    $("#hfnro_contrato").val("");
                    $("#hffec_ini").val("");
                    $("#hffec_fin").val("");
                    $("#hffecha_cese").val("");
                    $("#hfest_LIQ").val("");
                }

                Desbloquear("ventana")

            },
            error: function (msg) {
                alertCustom(msg);
                Desbloquear("ventana")
            }
        });

    }

    var getGeneraTable = function (p_tipo) {
       Bloquear("ventana")
        $.ajax({
            type: "post",
            url: "vistas/NN/ajax/NNMLIQB.ashx?OPCION=3&PIDM=" + oPidm + "&p_tipo=" + p_tipo,
            async: false,
            success: function (datos) {
                  
                Desbloquear("ventana");

                if (datos != "") {
                    $("#div_liquidar").attr("style", "display:block");
                    $("#divHojaLiquidacion").html(datos);
                }
                else {
                    noexito();

                }



            },
            error: function (msg) {
                alertCustom(msg);
                Desbloquear("ventana");
            }
        });

    }

    function filltxtEmpleado(v_ID, v_value) {
        var selectSolicitante = $(v_ID);

        selectSolicitante.typeahead({
            minLength: 3,
            source: function (query, process) {
                arrayEmpleados = [];
                map = {};
                $.ajax({
                    type: 'post',
                    url: "vistas/nn/ajax/NNMLIQB.ashx?OPCION=1&CTLG_CODE=" + $("#slcEmpresa").val() + "&SCSL_CODE=" + $('#slcSucural').val(),
                    data: { type: 'keyword', q: query },
                    cache: false,
                    dataType: 'json',
                    success: function (datos) {
                        if (datos != null) {
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayEmpleados.push(datos[i].NOMBRE_EMPLEADO);
                                obj += '{';
                                obj += '"NOMBRE_EMPLEADO":"' + datos[i].NOMBRE_EMPLEADO + '",';
                                obj += '"SCSL_CODE":"' + datos[i].SCSL_CODE + '",';
                                obj += '"CTLG_CODE":"' + datos[i].CTLG_CODE + '",';
                                obj += '"ESTADO_CONTRATO":"' + datos[i].ESTADO_CONTRATO + '",';
                                obj += '"ESTADO_CONT":"' + datos[i].ESTADO_CONT + '",';
                                obj += '"DNI":"' + datos[i].DNI + '",';
                                obj += '"RUC":"' + datos[i].RUC + '",';
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
                            return process(arrayEmpleados);
                        }
                    }
                });
            },
            updater: function (item) {
                $("#hfpidm").val(map[item].PIDM);
                $("#hfest_contrato").val(map[item].ESTADO_CONTRATO);
              
                $("#hfnombres").val(map[item].NOMBRE_EMPLEADO);
                $("#hfdni").val(map[item].DNI);
                $("#hfruc").val(map[item].RUC);
                $("#hfest_contrato_desc").val(map[item].ESTADO_CONT);

                selectSolicitante.attr("style","border-color: forestgreen; background-color: beige");  
                return item;
            },

        });
        selectSolicitante.keyup(function () {
            $(this).siblings("ul").css("min-width", $(this).css("width"));
            if ($("#txt_empleado").val().length <= 0) {
                selectSolicitante.removeAttr("style", "border-color: forestgreen; background-color: beige");
                $("#hfpidm").val("");
                $("#hfest_contrato").val("");
                $("#hfnombres").val("");
                $("#hfdni").val("");
                $("#hfruc").val("");
                $("#hfest_contrato_desc").val("");
            }
        });

    }
    
    var Limpiar = function () {

        $("#txt_empleado").val("");
        $("#txt_empleado").removeAttr("style", "border-color: forestgreen; background-color: beige");
        $("#hfpidm").val("");
        $("#divHojaLiquidacion").html("");
        
        $("#btn_liquidar").attr("class", "btn green");
        $("#btn_liquidar").html("<i class='icon-money'></i> Liquidar");
        $("#btn_liquidar").attr("href", "javascript:ShowAceptar();");
        $("#btn_liquidar").removeAttr("download");
        $("#success").attr("style", "display:none");
        $('#div_liquidar').attr("style", "display:none");
        
    }

    return {
        init: function () {
            plugins();           
            fillCboEmpresa();           
            eventoControles();
            ListarSucursales($('#slcEmpresa').val());
            fillCboEmpleado();
            filltxtEmpleado('#txt_empleado', '');           
        }
    };

}();

var Grabar = function () {
   
    Bloquear("ventana");   
    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmliqb.ashx?OPCION=G&PIDM=" + oPidm + "&p_USUA_ID=" + $("#ctl00_txtus").val() + "&p_DETALLE=" + oDetalle,
        async: false,
        success: function (datos) {
            if (datos.split(",")[0] == "OK") {
                $("#btn_liquidar").attr("class", "btn black");
                $("#btn_liquidar").html("<i class='icon-download'></i> Descargar");
                var href = "..\\..\\..\\Archivos\\" + datos.split(",")[1] + ".pdf"
                var download =  datos.split(",")[1]
                $("#btn_liquidar").attr("href", href);
                $("#btn_liquidar").attr("download",download);
             
                $("#success").slideDown();
                //$('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfarchivo').val(datos.split(",")[1]);
            } else {

                $("#error_liq").slideDown();
                $("#success").slideUp();
            }

            Desbloquear("ventana");
        },
        error: function (msg) {
            alertCustom(msg);
            Desbloquear("ventana");
        }

    });
}

var Download = function () {
    Bloquear("ventana");  
    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmliqb.ashx?OPCION=D&PIDM=" + oPidm,
        async: false,
        success: function (datos) {         
            $('#ctl00_cph_ctl00_PCONGEN1_ctl00_btnliqbe').click();
            Desbloquear("ventana");
        },
        error: function (msg) {
            alertCustom(msg);
            Desbloquear("ventana");
        }
    });
}

var ShowAceptar = function () {
    $('#MuestraModalAceptar').modal('show');
}

var HideAceptar = function () {
    $('#MuestraModalAceptar').modal('hide');
    Grabar();
}
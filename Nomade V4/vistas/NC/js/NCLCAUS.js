var NCLCAUS = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboRol').select2();

        $('.danger-toggle-button-custom').toggleButtons({
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "info",
                disabled: "danger"
            },
            label: {
                enabled: "SI",
                disabled: "NO"
            }
        });

    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");   
        $("TableTools_Button").css("float", "left");
    }

    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").val($("#ctl00_hddctlg").val()).change();
    };

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();                
                selectEst.append('<option></option>');                
                if (datos !== null) {
                    $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };


    var autocompletarResponsables = function (v_ID, v_value) {
        var txtResp = $(v_ID);
        var Vac = ""
        var empresa = $("#cboEmpresa").val();

        $.ajax({
            type: "post",   
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=CAJRESP&CTLG_CODE=" + empresa + "&INDICADOR=C",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    txtResp.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                arrayNC.push(datos[i].NOMBRE);
                                obj += '{ "USUARIO" : "' + datos[i].USUARIO + '", "NOMBRE" : "' + datos[i].NOMBRE + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            $('#hfCOD_NRESP').val(map[item].USUARIO);
                            return item;
                        }
                    });

                    txtResp.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if (txtResp.val().length <= 0) { $('#hfCOD_NRESP').val(''); }
                    });
                }
                if (datos !== null && $.trim(v_value).length > 0) {
                    txtResp.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var autocompletarResponsables2 = function (v_ID, v_value) {
        
        var txtResp = $(v_ID);
        var empresa = $("#cboEmpresa").val();

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=CAJRESP&CTLG_CODE=" + empresa + "&INDICADOR=R",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    txtResp.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                arrayNC.push(datos[i].NOMBRE);
                                obj += '{ "USUARIO" : "' + datos[i].USUARIO + '", "NOMBRE" : "' + datos[i].NOMBRE + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            $('#hfCOD_NRESP').val(map[item].USUARIO);
                            return item;
                        }
                    });

                    txtResp.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if (txtResp.val().length <= 0) { $('#hfCOD_NRESP').val(''); }
                    });
                }
                if (datos !== null && $.trim(v_value).length > 0) {
                    txtResp.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var autocompletarTodos = function (v_ID, v_value) {

        var txtResp = $(v_ID);
        var empresa = $("#cboEmpresa").val();

        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=CAJRESP&CTLG_CODE=" + empresa + "&INDICADOR=T",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    txtResp.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                arrayNC.push(datos[i].NOMBRE);
                                obj += '{ "USUARIO" : "' + datos[i].USUARIO + '", "NOMBRE" : "' + datos[i].NOMBRE + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            $('#hfCOD_NRESP').val(map[item].USUARIO);
                            return item;
                        }
                    });

                    txtResp.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if (txtResp.val().length <= 0) { $('#hfCOD_NRESP').val(''); }
                    });
                }
                if (datos !== null && $.trim(v_value).length > 0) {
                    txtResp.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };


    var obtenerUsuariosCaja = function () {
        var data = new FormData();
        data.append('USUA_CAJERO', $('#hfCOD_NRESP').val());
        data.append('CTLG_CODE', $("#cboEmpresa").val());
        data.append('SCSL_CODE', $('#cboEstablecimiento').val());
        var inactivas = $("#chkInactivas").is(':checked') ? '' : 'A';
        data.append('ESTADO', inactivas);
        

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=14",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos !== null) {
               $('#divCajerosCaja').html(datos);

               $("#tblCajasxUsuario").DataTable({
                   "sDom": 'TC<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
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
                       "sButtonText": "Exportar a Excel"
                   }
                       ]
                   }
               })
               actualizarEstilos()

           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

    }

    var obtenerUsuariosCaja2 = function () {
        var data = new FormData();
        data.append('USUA_ID', $('#hfCOD_NRESP').val());
        data.append('CTLG_CODE', $("#cboEmpresa").val());
        data.append('SCSL_CODE', $('#cboEstablecimiento').val());
        var inactivas = $("#chkInactivas").is(':checked') ? '' : 'A';
        data.append('ESTADO', inactivas);


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=16",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divCajerosCaja').html(datos);

               $("#tblCajasxUsuario").DataTable({
                   "sDom": 'TC<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
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
                       "sButtonText": "Exportar a Excel"
                   }
                       ]
                   }
               })
               actualizarEstilos()

           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

    }

    var obtenerUsuariosTodos = function () {
        var data = new FormData();
        data.append('USUA_ID', $('#hfCOD_NRESP').val());
        data.append('CTLG_CODE', $("#cboEmpresa").val());
        data.append('SCSL_CODE', $('#cboEstablecimiento').val());
        var inactivas = $("#chkInactivas").is(':checked') ? '' : 'A';
        data.append('ESTADO', inactivas);

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=CAJASTODO",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $('#divCajerosCaja').html(datos);

                    $("#tblCajasxUsuario").DataTable({
                        "sDom": 'TC<"clear">lfrtip',
                        "sPaginationType": "full_numbers",
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
                                    "sButtonText": "Exportar a Excel"
                                }
                            ]
                        }
                    })
                    actualizarEstilos()

                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

    var getUsuariosCaja = function () {
        if ($('#cboRol').val() == "C") {
            $('#lblCajero').text('Cajero:');
            autocompletarResponsables('#txtResp', $('#hfRESP').val()); //Cajeros
        }
        else if ($('#cboRol').val() == "R"){
            $('#lblCajero').text('Responsable:');
            autocompletarResponsables2('#txtResp', $('#hfRESP').val()); //Responsables  
        }
        else {
            $('#lblCajero').text('Todos');
            autocompletarTodos('#txtResp', $('#hfRESP').val()); //Todos  
        } 
    }

    function cargainicial() {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento();
            getUsuariosCaja();
        });

        $("#btnBuscarCaja").on("click", function () {            
            if ($('#cboRol').val() == "C") {
                obtenerUsuariosCaja();
            }
            else if ($('#cboRol').val() == "R"){
                obtenerUsuariosCaja2();
            }
            else {
                obtenerUsuariosTodos();
            }
        });

        $('#cboRol').on('change', function () {
            $('#input').html('<input type="text" id="txtResp" class="span12" />');
            $('#hfCOD_NRESP').val('');
            getUsuariosCaja();

        });

    }


    return {
        init: function () {
            plugins();
            cargainicial();
            fillCboEmpresa();
        }
    };

}();


var NCLCARE = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
    
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        //ColVis_Button TableTools_Button     
        $("TableTools_Button").css("float", "left");
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                //$('#cboEmpresa').append('<option></option>');               
                if (datos != null) {
                    $('#cboEmpresa').append('<option value = "TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", "TODOS");
                    $('#cboEstablecimiento').empty();
                    $('#cboEstablecimiento').append('<option value="TODOS">TODOS</option>');
                    $("#cboEstablecimiento").select2("val", "TODOS");

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
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
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }
                //selectEst.val($('#ctl00_hddestablecimiento').val());
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };




    var autocompletarResponsables2 = function (v_ID, v_value) {
        var txtResp = $(v_ID);
   
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=15",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    txtResp.typeahead({
                        source: function (query, process) {
                            arrayNC = [];
                            map = {};

                            var obj = '[';
                            for (var i = 0; i < datos.length; i++) {
                                arrayNC.push(datos[i].NOMBRE);
                                obj += '{ "USUARIO" : "' + datos[i].USUARIO + '", "NOMBRE" : "' + datos[i].NOMBRE + '" },';
                            }
                            obj += '{}';
                            obj = obj.replace(',{}', '');
                            obj += ']';
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.NOMBRE] = objeto;
                            });

                            process(arrayNC);
                        },
                        updater: function (item) {
                            $('#hfCOD_NRESP').val(map[item].USUARIO);
                            return item;
                        }
                    });

                    txtResp.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if (txtResp.val().length <= 0) { $('#hfCOD_NRESP').val(''); }
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    txtResp.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };


    var obtenerUsuariosCaja2 = function () {
        var data = new FormData();
        data.append('USUA_ID', $('#hfCOD_NRESP').val());
        data.append('CTLG_CODE', $("#cboEmpresa").val());
        data.append('SCSL_CODE', $('#cboEstablecimiento').val());


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=16",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divCajerosCaja').html(datos);

               $("#tblCajasxUsuario").DataTable({
                   "sDom": 'TC<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
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
                       "sButtonText": "Exportar a Excel"
                   }
                       ]
                   }
               })
               actualizarEstilos()

           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

    }




    function cargainicial() {

        $('#cboEmpresa').on('change', function () {
            if ($('#cboEmpresa').val() == "TODOS") {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
                $("#cboEstablecimiento").select2("val", "TODOS");
            } else {
                fillCboEstablecimiento();
            }

        });

        $("#btnBuscarCaja").on("click", function () {
            obtenerUsuariosCaja2();
        });


        $('a.VerCaj').on('click', function (e) {
            e.preventDefault();
            window.location.href = "?f=NCLCAUS"
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargainicial();
            autocompletarResponsables2('#txtResp', $('#hfRESP').val());
        }
    };





}();
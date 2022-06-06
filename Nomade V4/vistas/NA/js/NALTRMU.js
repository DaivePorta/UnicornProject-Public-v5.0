var documentos = []; 

var NALTRMU = function () {  

    
    var plugins = function () {

        $('#cboEmpresa').select2();
        $('#cboGrupo').select2();
        $("#cbosubgrupo").select2();
        $("#cboAlmacenOrigen").select2();
        $("#cboDocRegistro").select2();
        $("#cboSerie").select2();

        $("#txtSerie").inputmask({ "mask": "9", "repeat": 4, "greedy": false });
        $('#txtFecha').datepicker("setDate", "now");
        
    };

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        //ColVis_Button TableTools_Button     
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var EventoControles = function () {

        $("#btnBusquedaAvanz").on("click", function () {
            $("#iconAvanz").removeClass();
            let bVer = $("#btnBusquedaAvanz").data("ver");
            if (bVer) {
                $("#btnBusquedaAvanz").data("ver", false);
                $(".bavanzado").hide();
                $("#iconAvanz").addClass("icon-chevron-down");
            } else {
                $("#btnBusquedaAvanz").data("ver", true);
                $(".bavanzado").show();
                $("#iconAvanz").addClass("icon-chevron-up");
            }
        });

        $('#cboEmpresa').on('change', function () {
            fillCboGrupo();
            $('#cboGrupo').change();
            listarAlmacenes($('#cboEmpresa').val());
        });

        $('#cboGrupo').on('change', function () {
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            fillCboSubgrupos();
        });

        $("#cboDocRegistro").on('change', function () {
            $("#cboSerie").select2('val', '');
            if ($(this).val() !== null) {
                fillCboSeries($(this).val(), $('#cboEmpresa').val(), $("#cboAlmacenOrigen").val());
            }            
        });

        $("#btnFiltrar").on('click', function () {

            if (vErrors(["cboEmpresa", "cboAlmacenOrigen", "txtFecha", "cboDocRegistro", "cboSerie"])) {               
                       
                var data = new FormData();         
                data.append('OPCION', 'LSTOCK');
                data.append('CTLG_CODE', $("#cboEmpresa").val());
                data.append('ALMACEN_CODE', $("#cboAlmacenOrigen").val());
                data.append('FECHA', $("#txtFecha").val());
                data.append('DCTO_CODE', $("#cboDocRegistro").val());
                data.append('NRO_SERIE', $("#cboSerie").val());
                data.append('GRUPO_CODE', $("#cboGrupo").val());
                data.append('SUBGRUPO_CODE', $("#cbosubgrupo").val());

                Bloquear("ventana", "Se está consultando el stock disponible en los almacénes. Espere un momento por favor...");
                
                $.ajax({
                    type: "post",
                    url: "vistas/na/ajax/naltrmu.ashx",
                    contentType: false,
                    data: data,
                    processData: false,
                    async: true,
                    success: function (datos) {
                        if (datos !== null) {
                            
                            if (datos.indexOf("[Advertencia]") >= 0) {
                                infoCustom2(datos);
                                Desbloquear("ventana");
                                return;
                            }
                            if (datos.indexOf("[Error]") >= 0) {
                                alertCustom(datos);
                                Desbloquear("ventana");
                                return;
                            }

                            $('#divTblPrecios').html(datos);
                            $("#tblTransferencia").dataTable({
                                "order": [1, 'desc'],
                                "sDom": 'TC<"clear">lfrtip',
                                "sPaginationType": "full_numbers",
                                "scrollX": true,
                                "oLanguage": {
                                    "sEmptyTable": "No hay datos disponibles en la tabla.",
                                    "sZeroRecords": "No hay datos disponibles en la tabla."
                                },
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
                            });
                            actualizarEstilos();
                            Desbloquear("ventana");
                        } else {                            
                            noexito();
                            Desbloquear("ventana");
                        }
                       
                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        alertCustom("Error al cargar los datos. Por favor intente nuevamente.");
                    }
                });

            }
        });

    };

    var CargaInicial = function () {
        $("#btnBusquedaAvanz").data("ver", false);
        $(".bavanzado").hide();
        $("#iconAvanz").addClass("icon-chevron-down");
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
                if (ObtenerQueryString("ctlg") == undefined) {
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                }
                //fillCboEstablecimiento();
                listarAlmacenes($('#cboEmpresa').val());

                fillcboDocRegistro($('#cboEmpresa').val(), $('#cboAlmacenOrigen').val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboGrupo = function () {
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=4&CTLG_CODE=" + $.trim($('#cboEmpresa').val()) + "&OPCION2=TX&CODE_EXIS=" + $.trim($('#cboexistencia').val()),
            async: false,
            success: function (datos) {
                $('#cboGrupo').empty();
                $('#cboGrupo').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboGrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboGrupo').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboSubgrupos = function () {
        if ($('#cboGrupo').val() != "") {
            Bloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
            $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + $.trim($('#cboGrupo').val()) + "&CTLG_CODE=" + $.trim($('#cboEmpresa').val()),
                async: true,
                success: function (datos) {
                    Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                    $('#cbosubgrupo').empty();
                    $('#cbosubgrupo').append('<option value="">TODOS</option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                        }
                        $('#cbosubgrupo').removeAttr("disabled");
                    } else {
                        $('#cbosubgrupo').attr("disabled", "disabled");
                    }
                    $('#cbosubgrupo').select2('val', '');
                },
                error: function (msg) {
                    Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                    alertCustom("Subgrupos no se listaron correctamente");
                }
            });
        } else {
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
        }
    };    

    var fillcboDocRegistro = function (empresa, almacen) {
        var selectDocRegistro = $("#cboDocRegistro"); 
        if (empresa !== null && almacen !== null) {
            $.ajax({
                type: "POST",
                url: "vistas/na/ajax/naltrmu.ashx?OPCION=LDOCRE&CTLG_CODE=" + empresa + "&ALMACEN_CODE=" + almacen,
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {
                    selectDocRegistro.empty();
                    selectDocRegistro.append('<option></option>');
                    if (datos.length !== 0 || datos !== null) {
                        for (var i = 0; i < datos.length; i++) {
                            selectDocRegistro.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                            // add function for load series
                        }
                    } else {
                        selectDocRegistro.select2('val', '');
                        alertCustom("No se obtuvieron los documentos de registro correctamente.");
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
        
    }

    var fillCboSeries = function (tipoDocumento, empresa, almacen) {
        var selectSerie = $("#cboSerie"); 
        if (tipoDocumento !== null && almacen !== null) {
            $.ajax({
                type: "POST",
                url: "vistas/na/ajax/naltrmu.ashx?OPCION=LSERIE&CODE=" + tipoDocumento + "&CTLG_CODE=" + empresa + "&ALMACEN_CODE=" + almacen,
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                success: function (datos) {
                    selectSerie.empty();
                    selectSerie.append('<option></option>');
                    if (datos.length !== 0 || datos !== null) {
                        for (var i = 0; i < datos.length; i++) {
                            selectSerie.append('<option value="' + datos[i].CODIGO + '" data-nlineas="' + datos[i].NRO_LINEAS + '" data-formato="' + datos[i].FORMATO + '" data-actual="' + datos[i].VALOR_ACTUAL + '" >' + datos[i].NRO_SERIE + '</option>');
                            // add function for load series
                        }
                    } else {
                        selectSerie.select2('val', '');
                        alertCustom("No se obtuvieron las series de los documentos de registro correctamente.");
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }        
    }

    return {
        init: function () {
            plugins();
            EventoControles();
            CargaInicial();
            fillCboEmpresa();
            fillCboGrupo();
            
        }
    };

    function listarAlmacenes(empresa) {

        var obj = "";
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/NAMSECC.ashx?flag=10&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#cboAlmacenOrigen").empty();
                if (datos != null) {
                    $("#cboAlmacenOrigen").html(datos);
                    //$('#hf10').select2('val', $("#hf10").val()).change();  

                    if (empresa == $('#ctl00_hddctlg').val()) {
                        $('#cboAlmacenOrigen').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                    }
                    else {
                        $('#cboAlmacenOrigen').select2('val', '').change();
                    }


                }
                else {
                    $('#cboAlmacenOrigen').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }
    
}();

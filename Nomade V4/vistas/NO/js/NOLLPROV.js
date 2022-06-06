
var NOLLPROV = function () {

    var oTable;

    var plugins = function () {
        $('#cboEmpresas').select2();


        $('#txtFechaInicial').datepicker();
        $('#txtFechaInicial').inputmask("date",
            {
                yearrange: {
                    minyear: 1900,
                    maxyear: 2099
                }
            });

        $('#txtFechaFinal').datepicker();
        $('#txtFechaFinal').inputmask("date",
            {
                yearrange: {
                    minyear: 1900,
                    maxyear: 2099
                }
            });
    };
    
    var eventoControles = function () {
        $('#buscar').on('click', function () {
            listar();
        });

        $('#cboEmpresas').on('change', function () {
            $("#txt_proveedor").remove();
            $("#input_desc_prod").html("<input id='txt_proveedor' class='span12' type='text' placeholder='TODOS'/>");
            filltxtproveedor("#txt_proveedor", "");
            listar();
            $("#txtDescr").remove();
            $("#input_desc").html("<input id='txtDescr' class='span12' type='text' placeholder='TODOS'/>");
            filltxtrazsocial("#txtDescr", "");
        });    
    };
    
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };
    
    //var ListarSubGruposCbo = function () {
    //    $.ajax({
    //        type: "POST",
    //        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + " " + "&CTLG_CODE=" + $("#cboEmpresas").val(),
    //        async: false,
    //        success: function (datos) {
    //            $('#cbosubgrupo').empty();
    //            $('#cbosubgrupo').append('<option></option>');
    //            if (datos != null) {
    //                for (var i = 0; i < datos.length; i++) {
    //                    $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
    //                }
    //            }
    //            $('#cbosubgrupo').select2('val', '');
    //        },
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });
    //};


    var fnHandleTable = function () {

        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO_SAP",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "Persona",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    },
                    type: "fecha"
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "left");
                    }
                },
                {
                    data: "UNIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    type: "formatoMiles"
                },
                {
                    data: "PRECIO_ULTIMO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    type: "formatoMiles"
                },
                {
                    data: "PRECIO_PROMEDIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    type: "formatoMiles"
                }
            ]
        }

        oTable = iniciaTabla("tblbmodal", parms);

        //$("#tblbmodal").DataTable({

        //    "scrollX": "true",
        //    "sDom": 'TC<"clear">lfrtip',
        //    "sPaginationType": "full_numbers",
        //    "oTableTools": {
        //        "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
        //        "aButtons": [
        //            {
        //                "sExtends": "copy",
        //                "sButtonText": "Copiar"
        //            },
        //            {
        //                "sExtends": "pdf",
        //                "sPdfOrientation": "landscape",
        //                "sButtonText": "Exportar a PDF"
        //            },
        //            {
        //                "sExtends": "xls",
        //                "sButtonText": "Exportar a Excel"
        //            }
        //        ]
        //    }
        //});
    };

    var listar = function () {
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=4&p_pidm=" + $('#hfPIDM').val() + "&p_prd=" + $('#hdcodProd2').val() + "&p_scl=" + $('#cboEmpresas').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (datos) {
                oTable.fnClearTable();

                if (isEmpty(datos))
                    return;

                oTable.fnAddData(datos);

                $("#smIncIGV").pulsate({
                    color: "#FF0000",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });

                oTable.fnSort([[2, "desc"]]);
                Desbloquear("ventana");

            },
            error: function (msg) {
                infoCustom("No se pudo recuperar la información.");
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    };
    
    var filltxtproveedor = function (v_ID, v_value) {

        var selectRazonSocial = $(v_ID);

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=3&p_scl=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {

                    selectRazonSocial.typeahead({

                        source: function (query, process) {
                            arrayRazonSocial = [];

                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","DIRECCION":"' + datos[i].DIRECCION + '","PIDM":"' + datos[i].PIDM + '","ID":"' + datos[i].ID + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.RAZON_SOCIAL] = objeto;
                            });
                            process(arrayRazonSocial);
                        },


                        updater: function (item) {
                            $("#hfPIDM").val(map[item].PIDM);


                            return item;
                        },

                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if (selectRazonSocial.val().trim() == '') {
                            $("#hfPIDM").val('0');
                        }
                    });

                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var filltxtrazsocial = function (v_ID, v_value) {
        //var obj = '';
        var selectRazonSocial = $(v_ID);

        $.ajax({
            type: "post",
            //url: "vistas/na/ajax/NALLRIF.ashx?OPCION=1&p_scl=" + $("#ctl00_hddctlg").val(),
            // url: "vistas/na/ajax/naminsa.ashx?OPCION=4",
            url: "vistas/na/ajax/NALLRIF.ashx?OPCION=1&p_scl=" + $('#cboEmpresas').val() + "&p_alamcen=" + $('#hf10').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {

                    selectRazonSocial.typeahead({

                        source: function (query, process) {

                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                obj += '{';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","CODE_SUNAT":"' + datos[i].CODE_SUNAT + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';

                                // obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","UNIDAD":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },


                        updater: function (item) {
                            $("#hdcodProd2").val(map[item].CODIGO);
                            // $("#txtCodUni").val(map[item].UNIDAD_DESP));
                            //if ($("#hfRUC").val()) {
                            //    $("#cbotipoDoc").val("6");
                            //    $("#cbotipoDoc").change();
                            //    $("#txtnumdoc").val($("#hfRUC").val());
                            //}
                            //else {
                            //    $("#cbotipoDoc").val("6");
                            //    $("#cbotipoDoc").change();
                            //    $("#txtnumdoc").val($("#hfRUC").val());
                            //}
                            return item;
                        },

                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if (selectRazonSocial.val().trim() == '') {
                            $("#hdcodProd2").val('');
                        }
                    });

                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var cargaInicial = function () {
        $("#hfPIDM").val('0');
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();
    };
        
    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fnHandleTable();
            eventoControles();
            cargaInicial();
        }
    };
}();
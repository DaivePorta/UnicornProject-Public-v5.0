var ADMREKA = function () {

    var oTable;

    var eventos = function () {        

        $("#cboEmpresa").on("change", function () {
            fnCargaAlmacen(this.value);
            fnCargaMoneda(this.value);
        });
        $("#cboAlmacen").on("change", function () {
            var empresa = $("#cboEmpresa").val();       
            fnCargaProducto(empresa,this.value);
        });

        $("#btnVerKardex").on("click", function () {
            var empresa = $("#cboEmpresa").val();
            var almacen = $("#cboAlmacen").val();
            var moneda = $("#cbo_moneda").val();
            listarKardex(empresa, almacen, moneda);
        });

        $("#btnRecalcular").on("click", function () {
            var empresa = $("#cboEmpresa").val();
            var almacen = $("#cboAlmacen").val();
            var producto = $('#hdcodProd').val();
            var fecha = $("#txtFecha").val();
            recalcularKardex(empresa, almacen, producto, fecha);
        });

    };

    var fnCargaEmpresas = function () {

        var cboEmpresa = $("#cboEmpresa");

        cboEmpresa.html(fnGetEmpresas(1, 'A', false));
        cboEmpresa.val($("#ctl00_hddctlg").val()).change()

    };

    var fnCargaMoneda = function (ctlg){
        $.post("vistas/CC/ajax/CCMCBCL.ASHX", { flag: "MO", empresa: ctlg },
                        function (res) {
                            if (res     != null && res != "" && res.indexOf("error") < 0) {
                                $("#cbo_moneda").html(res)                              
                           }
                       });
    }

    var fnCargaAlmacen = function (ctlg) {
        var cboAlmacen = $("#cboAlmacen");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/naminsa.ashx?OPCION=LALM&CTLG_CODE=" + ctlg + "&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                cboAlmacen.html('<option value=""></option>');
                if (datos != null) {
                    if (datos[0].CODIGO != "" && datos[0].DESCRIPCION != "") {
                        for (var i = 0; i < datos.length; i++) {
                            cboAlmacen.append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].SCSL_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                }
                cboAlmacen.val('').change();
            },
            error: function (msg) {
                alertCustom('Error al intentar listar almacenes.');
            }
        });
    };

    var fnCargaProducto = function (ctlg,almc) {
        var txtProducto = $("#txtdescprod");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/NALKARD.ashx?OPCION=1&p_scl=" + ctlg + "&p_alamcen=" + almc,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (!isEmpty(datos)) {
                    txtProducto.typeahead({
                        items: 100,
                        source: function (query, process) {
                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                obj += '{';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","UNIDAD":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '"';
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
                            $("#hdcodProd").val(map[item].CODIGO);                                                    
                            return item;
                        },
                    });
                    txtProducto.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width")).css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                        if ($(this).val().length == 0) {
                            $("#hdcodProd").val('');                          
                        }
                    });
                }              
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var listarKardex = function (ctlg, almc,moneda) {
        if (!vErrorBodyAnyElement(".obligatorio")) {
            $.ajax({
                type: "POST",
                url: "vistas/na/ajax/NALKARD.ashx?OPCION=2&p_alamcen=" + almc + "&p_scl=" + ctlg + "&p_moneda=" + moneda + "&p_prd=" + $('#hdcodProd').val() + "&p_fecha=" + $("#txtFecha").val(),
                async: true,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    oTable.fnClearTable();
                    if (!isEmpty(datos)) {
                        oTable.fnAddData(datos);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    };

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var handleTable = function () {
       

            var parms = {
                data: null,
                columns: [
                    {
                        data: "ITEM",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                        }

                    },
                    {
                        data: "FECHA_FORMAT",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                        },
                        type: "fechaHora"

                    },
                    {
                        data: "PRODUCTO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                        }

                    },
                    {
                        data: "DETALLE"

                    },
                    {
                        data: "SIMBOLO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                        }

                    },
                    {
                        data: "CA_ENT",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center").addClass("colorColumna");
                            $(td).html(cellData.Redondear(2));
                        }

                    },
                    {
                        data: "PU_ENT",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center").addClass("colorColumna");
                            $(td).html(cellData.Redondear(2));
                        }

                    },
                    {
                        data: "PT_ENT",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center").addClass("colorColumna");
                            $(td).html(cellData.Redondear(2));
                        }

                    },
                    {
                        data: "CA_SAL",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                            $(td).html(cellData.Redondear(2));
                        }
                    },
                    {
                        data: "PU_SAL",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                            $(td).html(cellData.Redondear(2));
                        }
                    },
                    {
                        data: "PT_SAL",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                            $(td).html(cellData.Redondear(2));
                        }
                    },
                    {
                        data: "CA_TOT",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center").addClass("colorColumna");
                            $(td).html(cellData.Redondear(2));
                        }

                    },
                    {
                        data: "PU_TOT",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center").addClass("colorColumna");
                            $(td).html((parseFloat(rowData.PU_TOT) > 0 ? rowData.PU_TOT : rowData.COSTO).Redondear(2));
                        }

                    },
                    {
                        data: "PT_TOT",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center").addClass("colorColumna");
                            $(td).html(cellData.Redondear(2));
                        }

                    },


                    {
                        data: "TIPO_CAMBIO_KARDEX",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                            $(td).html(cellData.Redondear(4));
                        }

                    },
                    {
                        data: null,
                        createdCell: function (td, cellData, rowData, row, col) {
                            var enlace = (rowData.DCTO_REFERENCIA.substring(0, 1) == "A" ?
                                ("?f=naminsa&codigo=" + rowData.DCTO_REFERENCIA.toString()) :
                                (rowData.DCTO_REFERENCIA.substring(0, 1) == "V" ?
                                    (rowData.DETALLE.toString() == "ANULACION DE VENTA" ?
                                        ("?f=nvmanul&codigo=" + rowData.DCTO_REFERENCIA.toString()) :
                                        ("?f=nvmdocv&codigo=" + rowData.DCTO_REFERENCIA.toString())
                                    ) :
                                    (rowData.TIPO_NOTA_CRED.toString() == "C" ?
                                        ("?f=CAMNOPR&codigo=" + rowData.DCTO_REFERENCIA.toString() + "&codempr=" + rowData.CTLG_CODE.toString()) :
                                        ("?f=CAMNOCL&codigo=" + rowData.DCTO_REFERENCIA.toString() + "&codempr=" + rowData.CTLG_CODE.toString())
                                    )
                                )
                            );
                            $(td).attr("align", "center")
                                .html("<a style='padding: 7px' target='_blank' href='" + enlace + "' class='btn blue'><i class='icon-circle-arrow-right'></i></a>");

                        }

                    }
                ],
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
                }, "sDom": 'TC<"clear">lfrtip',

                footerCallback: function (row, data, start, end, display) {
                    var api = this.api(), data;

                    // Remove the formatting to get integer data for summation
                    var intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '') * 1 :
                            typeof i === 'number' ?
                                i : 0;
                    };


                    //ActualizarFooter
                    $(api.column(5).footer()).html(
                        formatoMiles((api.column(5)
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0)
                        ))
                    );
                    $(api.column(7).footer()).html(
                        formatoMiles((api.column(7)
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0)
                        ))
                    );
                    $(api.column(8).footer()).html(
                        formatoMiles((api.column(8)
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0)
                        ))
                    );
                    $(api.column(10).footer()).html(
                        formatoMiles((api.column(10)
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0)
                        ))
                    );
                    if (api.rows()[0].length > 0) {
                        $(api.column(11).footer()).html(
                            formatoMiles(api.row(api.rows()[0].length - 1).data().CA_TOT)
                        );
                        $(api.column(13).footer()).html(
                            formatoMiles(api.row(api.rows()[0].length - 1).data().PT_TOT)
                        );
                    } else {
                        $(api.column(11).footer()).html(
                            "0"
                        );
                        $(api.column(13).footer()).html(
                            "0"
                        );
                    }
                }
            }

            oTable = iniciaTabla("tblListaKardex", parms);
            actualizarEstilos();
        
    }

    var plugins = function () {
        $(".select").select2();
        $("#txtFecha").datepicker();
    };

    var recalcularKardex = function (ctlg, almc,producto,fecha) {
        if (!vErrorBodyAnyElement(".obligatorio")) {
            $.ajax({
                type: "POST",
                url: "vistas/ad/ajax/ADMREKA.ashx?opcion=1&ctlgCode=" + ctlg + "&prodCode=" + producto + "&almcCode=" + almc + "&fecha=" + fecha,
                beforeSend: function () { Bloquear("divTblKardex"); },
                async: true,
                success: function (datos) {
                    if (datos == "OK")
                        exito();
                },
                complete: function () {
                    var moneda = $("#cbo_moneda").val();
                    listarKardex(ctlg, almc, moneda);
                    Desbloquear("divTblKardex");
                },
                error: function (msg) {
                    alert(msg);
                    noexito();
                }
            });
        }

    };

    return {
        init: function () {
            handleTable();
            plugins();   
            eventos();
            fnCargaEmpresas();                
        }
    };

}();
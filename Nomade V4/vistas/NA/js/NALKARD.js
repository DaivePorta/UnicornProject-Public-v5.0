var NALKARD = function () {
    var plugins = function () {
        $('#cboEmpresas, #hf10, #slcSucural').select2();
        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').html('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val());
                    //listarAlmacenes($('#cboEmpresas').val());
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoComtroles = function () {
        CrearControl("N", "1", "slsMoneda", "moneda");

        $('#cboEmpresas').on('change', function () {
            Bloquear("div");
            ListarSucursales($('#cboEmpresas').val());
            listarAlmacenes($('#cboEmpresas').val());
            listarGrupos($('#cboEmpresas').val());

            $("#txtdescprod").remove();
            $("#input_desc_prod").html("<input id='txtdescprod' class='span12' type='text' style='text-transform: uppercase' placeholder='NOMBRE PRODUCTO'/>");
            fillTxtProducto('#txtdescprod', '');

            $("#txtUnidad").val("");
            Desbloquear("div");
      
        });
        
        $('#slsMoneda').on('change', function () {
            //if (vErrors(["slsMoneda", "hf10", "txtdescprod"])) {
              //  listarKardex();
            //}
        });
       
        $('#buscar').on('click',function(){
            if (vErrors(["slsMoneda", "hf10"]))
            {
                listarKardex();
            }
        });

    }

    function listarGrupos(empresa) {

        var obj = "";
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=3&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (datos != null) {
                    var arr = [];
                    obj += '[';

                    if (datos[0].MENSAJE == "Error") {

                    }
                    else {
                        for (var i = 0; i < datos.length; i++) {
                            arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
                            obj += '{';
                            obj += '"NOMBRE":"' + datos[i].CODIGO + '"';
                            obj += '},';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';
                    }
                    $('#slsGrupos').multiselect('dataprovider', arr);

                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    function ListarSucursales(ctlg) {
        var USUA_ID = $("#ctl00_txtus").val();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LSU&CTLG_CODE=" + ctlg + "&USUA_ID=" + USUA_ID,
            //url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucural').empty();
                $('#slcSucural').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcSucural').append('<option value="' + datos[i].CODIGO + '" data-almc="' + datos[i].ALMC_CODE + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }

                $("#slcSucural").select2("val", $("#ctl00_hddestablecimiento").val());
                $("#slcSucural").change();

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    function listarAlmacenes(empresa) {

        var obj = "";
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/NAMSECC.ashx?flag=10&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#hf10").empty();
                if (datos != null) {                    
                    $("#hf10").html(datos);
                    //$('#hf10').select2('val', $("#hf10").val()).change();  

                    if (empresa == $('#ctl00_hddctlg').val()) {
                        //$('#hf10').select2('val', $('#ctl00_hddestablecimiento').val()).change();
                        $("#hf10").val($("#slcSucural option:selected").attr("data-almc"));
                        $("#hf10").change();
                    }
                    else {
                        $('#hf10').select2('val', '').change();
                    }


                }
                else {
                    $('#hf10').select2('val', '').change();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    function listarKardex() {

        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/na/ajax/NALKARD.ashx?OPCION=3&p_alamcen=" + $('#hf10').val() + "&p_scl=" + $('#cboEmpresas').val() + "&p_moneda=" + $('#slsMoneda').val() + "&p_prd=" + $('#hdcodProd').val()
                + "&p_desde=" + $('#txtDesde').val() + "&p_hasta=" + $('#txtHasta').val(),
            async: true,
            contenttype: "application/json;",
            datatype: "json",
            success: function (datos) {
                Desbloquear("div");

                oTable.fnClearTable();

                if (!isEmpty(datos)) {

                    oTable.fnAddData(datos);          
                  
                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    var cargaInicial = function () {
        Bloquear("div");
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val()).change();
        //$("#hf10").val($("#slcSucural option:selected").attr("data-almc"));
        //$("#hf10").change();
        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());

        var fecha = new Date();
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;

        if (mes == 1) {
            mes = 12;
            ano = ano - 1
        } else {
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);
    }
    
    var cargaTablaVacia = function () {

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
                        type:"fechaHora"

                    },
                    {
                        data: "ORIGEN_DESTINO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "left");
                        }

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
                            //$(td).html((parseFloat(rowData.PU_TOT) > 0 ? rowData.PU_TOT : rowData.COSTO).Redondear(2));     
                            $(td).html(cellData.Redondear(2));
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
                            var enlace = (rowData.DCTO_REFERENCIA.substring(0, 1) == "A"?
                                          ("?f=naminsa&codigo=" + rowData.DCTO_REFERENCIA.toString()):
                                          (rowData.DCTO_REFERENCIA.substring(0, 1) == "V"?
                                                (rowData.DETALLE.toString() == "ANULACION DE VENTA"?
                                                    ("?f=nvmanul&codigo=" + rowData.DCTO_REFERENCIA.toString()) :
                                                    ("?f=nvmdocv&codigo=" + rowData.DCTO_REFERENCIA.toString())
                                                ):
                                                (rowData.TIPO_NOTA_CRED.toString() == "C"?
                                                    ("?f=CAMNOPR&codigo=" + rowData.DCTO_REFERENCIA.toString() + "&codempr=" + rowData.CTLG_CODE.toString()):
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
                $(api.column(6).footer()).html(
                      formatoMiles((api.column(6)
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
                $(api.column(9).footer()).html(
                   formatoMiles((api.column(9)
                       .data()
                       .reduce(function (a, b) {
                           return intVal(a) + intVal(b);
                       }, 0)
                    ))
                 );
                $(api.column(11).footer()).html(
                   formatoMiles((api.column(11)
                       .data()
                       .reduce(function (a, b) {
                           return intVal(a) + intVal(b);
                       }, 0)
                    ))
                 );
                if (api.rows()[0].length > 0) {
                    $(api.column(12).footer()).html(
                       formatoMiles(api.row(api.rows()[0].length - 1).data().CA_TOT)
                     );
                    $(api.column(14).footer()).html(
                       formatoMiles(api.row(api.rows()[0].length - 1).data().PT_TOT)
                     );
                } else {
                    $(api.column(12).footer()).html(
                      "0"
                    );
                    $(api.column(14).footer()).html(
                      "0"
                     );
                }
            }
        }

        oTable = iniciaTabla("tblProd", parms);
        actualizarEstilos();
    }




    return {
        init: function () {
            plugins();
            cargaTablaVacia();
            fillCboEmpresa();
            eventoComtroles();
            cargaInicial();
            $('#slsMoneda').select2();
            if ($("#slsMoneda option")[1] != undefined) {
                $("#slsMoneda").select2("val", $($("#slsMoneda option")[1]).val());                
            }

            let cod = ObtenerQueryString("codigo");

            if (cod !== undefined) {
                $('#hdcodProd').val(cod);   
                
                let nombreProd = getCookie('nombreProductoKardex');
                let nombreUnidad = getCookie('nombreUnidadKardex');
                let codigoAlmacen = getCookie('codAlmacenKardex');//para que muestre correctamente el kardex del producto y su respectivo almacen seleccionado

                $('#hf10').val(codigoAlmacen);
                $('#hf10').select2('val', codigoAlmacen).change();

                $('#txtdescprod').val(nombreProd);
                $('#txtUnidad').val(nombreUnidad);

                deleteCookie('nombreProductoKardex');
                deleteCookie('nombreUnidadKardex');

                $('#buscar').click();

            }
        }
    };

}();


function fillTxtProducto(v_ID, v_value) {
    var selectRazonSocial = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/na/ajax/NALKARD.ashx?OPCION=1&p_scl=" + $('#cboEmpresas').val() + "&p_alamcen=" + $('#hf10').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (!isEmpty(datos)) {
                selectRazonSocial.typeahead({
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
                        $("#txtUnidad").val(map[item].UNIDAD);
                        //$("#hfDNI").val(map[item].DNI);
                        //$("#hfRUC").val(map[item].RUC);                    
                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width")).css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                    if ($(this).val().length == 0) {
                        $("#hdcodProd").val('');
                        $("#txtUnidad").val('');
                    }
                });
            }
            if ((!isEmpty(datos)) && ($.trim(v_value).length > 0)) {
                selectRazonSocial.val(v_value);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
   
}
var NOLRCPR = function () {
    var oTableReporte = [];

    var plugins = function () {

        $('#cboEmpresas').select2()


    }
    

    var eventoComtroles = function () {

        $('#buscar').on('click', function () {
            if (vErrors(["txt_proveedor", "txtFechaInicial", "txtFechaFinal"])) {
                fnGetReporte();              
            }
        });

        $('#cboEmpresas').on('change', function () {
            $("#txt_proveedor").remove();
            $("#input_desc_prod").html("<input id='txt_proveedor' class='span12' type='text' />");
            filltxtproveedor("#txt_proveedor", "");
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
    }


    var handleTablaProveedores = function () {

        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns: [
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "EMISION",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "VENCIMIENTO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "BASE_IMPONIBLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(' S/' + formatoMiles(cellData));
                    }
                },
                {
                    data: "PRECIO_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(' S/' + formatoMiles(cellData));
                    }
                },
                {
                    data: "DETRACCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(' S/' + formatoMiles(cellData));
                    }
                },
                {
                    data: "PERCEPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(' S/' + formatoMiles(cellData));
                    }
                },
                {
                    data: "RETENCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(' S/' + formatoMiles(cellData));
                    }
                },
                {
                    data: "MONTO_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'right').text(' S/' + formatoMiles(cellData));
                    }
                },
                {
                    data: "PAGADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }              
            ],


             footerCallback: function (row, data, start, end, display) {
                var api = this.api(), data;

                var valorBaseTot = 0.0;
                var valorPrecioTot = 0.0;
                var valorMontoTot = 0.0;

                var aSumaBaseTot = [];
                var aSumaPrecioTot = [];
                var aSumaMontoTot = [];

                api.data().filter(function (e) {

                    valorBaseTot = parseFloat(e.BASE_IMPONIBLE);
                    valorPrecioTot = parseFloat(e.PRECIO_TOTAL);
                    valorMontoTot = parseFloat(e.MONTO_TOTAL);
                   
                    aSumaBaseTot.push(valorBaseTot)
                    aSumaPrecioTot.push(valorPrecioTot)
                    aSumaMontoTot.push(valorMontoTot)


                });

                if (aSumaBaseTot.length > 0) {
                    var nMontoBaseTot = formatoMiles(aSumaBaseTot.reduce(function (a, b) { return a + b; }));
                    $("#lblBaseTot").html("<b> S/" + nMontoBaseTot);
                }
                if (aSumaPrecioTot.length > 0) {
                    var nMontoPrecioTot = formatoMiles(aSumaPrecioTot.reduce(function (a, b) { return a + b; }));
                    $("#lblPrecioTot").html("<b> S/" + nMontoPrecioTot);
                }
                if (aSumaMontoTot.length > 0) {
                    var nMontoTot = formatoMiles(aSumaMontoTot.reduce(function (a, b) { return a + b; }));
                    $("#lblMontoTot").html("<b> S/" + nMontoTot);
                }

            }






        }

        oTableReporte = iniciaTabla("tblProveedores", parms);
        $('#tblProveedores_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modificar la caja de texto del buscador
        $('#tblProveedores_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modificar el combo de paginacion


        $('#tblProveedores tbody').on('dblclick', 'tr', function () {
            var pos = oTableReporte.fnGetPosition(this);
            var row = oTableReporte.fnGetData(pos);
            var sCodigo = row.CODIGO;
      
            if (sCodigo != "") {
                       window.open("?f=NOMDOCC&codigo=" + sCodigo, '_blank');
                   }
        });
        
    }

   
    var fnGetReporte = function () {
        let pidmEmpresa = $("#cboEmpresa option:selected").attr('data-pidm');
        let CodCta = $("#cbocta").val();

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOLRCPR.ashx?OPCION=LREP&p_pidm=" + $('#hfPIDM').val() + "&p_desde=" + $('#txtFechaInicial').val() + "&p_hasta=" + $('#txtFechaFinal').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    oTableReporte.fnClearTable();
                    oTableReporte.fnAddData(datos);
                }
                else {
                    oTableReporte.fnClearTable();
                    Desbloquear('ventana');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener reporte.");
                oTableReporte.fnClearTable();
            }
        });

    }
 
    var cargaInicial = function () {       
        $("#cboEmpresas").select2("val", $("#ctl00_hddctlg").val());
        $("#cboEmpresas").change();
    }

    var controlesfecha = function () {

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
    }


    return {
        init: function () {
            controlesfecha();
            handleTablaProveedores();
            eventoComtroles();
            fillCboEmpresa();
            plugins();
            cargaInicial();
        }
    };

}();


function filltxtproveedor(v_ID, v_value) {

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

            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });

}
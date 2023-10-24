var persona = [];
var CCLRCCL = function () {
    var plugins = function () {
        $('#cboEmpresa').select2();
        $("#tblCuentasPorCobrar").DataTable();

        $('#txtDesde').datepicker();
        $('#txtHasta').datepicker();

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
        //ColVis_Button TableTools_Button     
        $("TableTools_Button").css("float", "left");
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrccl.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargarSucursales = function (empresa) {
        var select = $('#slcEstablec');
        select.multiselect('destroy');
        select.multiselect();
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + empresa,
            beforesend: function () { select.hide(); Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: true,
            success: function (data) {
                select.empty();
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {

                select.multiselect('destroy');
                select.multiselect();

                Desbloquear($(select.parents("div")[0]));
            }
        });
    };

    function filltxtrazsocial(v_ID, v_value) {
        var selectRazonSocial = $(v_ID);
        //Proveedores
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2.4&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    persona = datos;
                    selectRazonSocial.typeahead({
                        source: function (query, process) {
                            arrayRazonSocial = [];
                            map = {};
                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayRazonSocial.push(datos[i].RAZON_SOCIAL);
                                obj += '{';
                                obj += '"DNI":"' + datos[i].DNI + '","RUC":"' + datos[i].RUC + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
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
                            $("#hfPIDM").val("");
                            $("#hfDNI").val("");
                            $("#hfRUC").val("");

                            $("#hfPIDM").val(map[item].PIDM);
                            $("#hfDNI").val(map[item].DNI);
                            $("#hfRUC").val(map[item].RUC);
                            $("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                            if (map[item].RUC == "") {
                                $("#txtRuc").val(map[item].DNI);
                            }
                            else {
                                $("#txtRuc").val(map[item].RUC);
                            }
                            return item;
                        },


                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtrazsocial").val().length <= 0) {

                        }
                    });

                } else {
                    persona = [];
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


    var eventoComtroles = function () {

        $('#cboEmpresa').on('change', function () {
            $("#inputRazsocial").html("");
            $("#inputRazsocial").html('<input id="txtRuc" class="span3" type="text" disabled="disabled" /> <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />');
            filltxtrazsocial('#txtrazsocial', '');
            $("#bloqueTotales").attr("style", "display:none;");
            $("#bloqueTipoCambio").attr("style", "display:none;"); 
            $('#divCuentasPorCobrar').html('');
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa"])) {
                if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                    obtenerReporteCuentasPorCobrar();
                } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                    obtenerReporteCuentasPorCobrar();
                } else {
                    alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
                }
            }
        });




    }
    var obtenerReporteCuentasPorCobrar = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_USUA_ID', $("#ctl00_txtus").val());
        data.append('p_CLIE_PIDM', $("#hfPIDM").val());
        data.append('p_DESDE', $("#txtDesde").val());
        data.append('p_HASTA', $("#txtHasta").val());
        data.append('p_SCSL_CODE', $("#slcEstablec").val() == null ? "" : $('#slcEstablec').val().toString())

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/cc/ajax/cclrccl.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divCuentasPorCobrar').html(datos);
               //"TotalCuentasPorCobrar
               $("#txtTotalMonedaBase").html($("#hfTotalBase").val());
               $("#txtTotalMonedaAlterna").html($("#hfTotalAlterna").val());
               $("#bloqueTotales").attr("style", "display:block;");
               //Datos moneda
               $("#lblMonedaBase").html($("#hfDescMonedaBase").val());
               $("#lblSimboloMonedaBase").html($("#hfSimbMonedaBase").val());
               $("#lblMonedaAlterna").html($("#hfDescMonedaAlterna").val());
               $("#lblSimboloMonedaAlterna").html($("#hfSimbMonedaAlterna").val());
               //Datos tipo de cambio
               $("#fechaTipoCambio").html($("#hfFechaTipoCambio").val());
               $("#valorTipoCambio").html($("#hfValorTipoCambio").val());
               if ($("#hfFechaTipoCambio").val() != "-")
                   $("#bloqueTipoCambio").attr("style", "display:block;");
               else
                   $("#bloqueTipoCambio").attr("style", "display:block;");
               $("#txtTotalSoles").html($("#hfTotalSoles").val());
               $("#txtTotalDolares").html($("#hfTotalDolares").val());

               oTableTReg = $("#tblCuentasPorCobrar").dataTable({
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
                   },
                   "oLanguage": {
                       "sEmptyTable": "No hay datos disponibles en la tabla.",
                       "sZeroRecords": "No hay datos disponibles en la tabla."
                   }
               })
               oTableTReg.fnSort([[5, "desc"]]);
               actualizarEstilos();


               $('#tblCuentasPorCobrar').DataTable().columns(0).visible(false);
               $('#tblCuentasPorCobrar').DataTable().columns(1).visible(false);
               $('#tblCuentasPorCobrar tbody').on('dblclick', 'tr', function () {
                   var pos = oTableTReg.fnGetPosition(this);
                   var row = oTableTReg.fnGetData(pos);
                   var tabla = row[0];
                   var codigo = row[1];
                   if (tabla == "VENTA") {
                       if (codigo != "") {
                           window.open("?f=NVMDOCV&codigo=" + codigo, '_blank');
                       }
                   }

               });


           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

    }

    var cargaInicial = function () {
        var pidm = ObtenerQueryString("p");
        if (pidm != undefined && pidm != null) {
            var nombre = "";
            for (var i = 0; i < persona.length; i++) {
                if (persona[i].PIDM == pidm) {
                    nombre = persona[i].RAZON_SOCIAL;
                    break;
                }
            }
            if (nombre != "") {
                $("#txtrazsocial").val(nombre);
                $("#txtrazsocial").keyup().siblings("ul").children("li").click();
                obtenerReporteCuentasPorCobrar();
            } else {
                infoCustom2("El cliente no se encuentra activo. Actívelo por favor para poder ver la información.")
            }

        }
    }


    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargarSucursales($("#ctl00_hddctlg").val());
            filltxtrazsocial('#txtrazsocial', '');
            eventoComtroles();
            cargaInicial();
        }
    };

}();


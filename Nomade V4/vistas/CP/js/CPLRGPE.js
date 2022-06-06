var CPLRGPE = function () {
    var plugins = function () {
        $('#cboEmpresa').select2();
        $("#tblCuentasPorPagar").DataTable();

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
        $("TableTools_Button").css("float", "left");
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/CPLRGPE.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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

    function filltxtrazsocial(v_ID, v_value) {
        var selectRazonSocial = $(v_ID);
        //PERSONAS
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/CPLRGCA.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
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
                                obj += '"NRO_DOCUMENTO":"' + datos[i].NRO_DOCUMENTO + '","TIPO_DOCUMENTO":"' + datos[i].TIPO_DOCUMENTO + '","RAZON_SOCIAL":"' + datos[i].RAZON_SOCIAL + '","PIDM":"' + datos[i].PIDM + '"';
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
                            $("#hfPIDM").val(map[item].PIDM);
                            $("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                            $("#txtRuc").val(map[item].NRO_DOCUMENTO);
                            return item;
                        },

                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtrazsocial").val().length <= 0) {
                            $("#txtRuc").val("");
                            $("#hfPIDM").val("");
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

    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            $("#inputRazsocial").html("");
            $("#inputRazsocial").html('<input id="txtRuc" class="span3" type="text" disabled="disabled" /> <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />');
            filltxtrazsocial('#txtrazsocial', '');
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "txtRuc"])) {
                if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                    obtenerReporteCuentasPorPagar();
                } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                    obtenerReporteCuentasPorPagar();
                } else {
                    alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
                }
            }
        });

    }

    var obtenerReporteCuentasPorPagar = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_USUA_ID', $("#ctl00_txtus").val());
        data.append('p_PIDM', $("#hfPIDM").val());
        data.append('p_DESDE', $("#txtDesde").val());
        data.append('p_HASTA', $("#txtHasta").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/cp/ajax/CPLRGPE.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divCuentasPorPagar').html(datos);
               //"TotalCuentasPorPagar
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
                   $("#bloqueTipoCambio").attr("style", "display:none;");

               $("#tblCuentasPorPagar").DataTable({
                   "sDom": 'TC<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
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



    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            filltxtrazsocial('#txtrazsocial', '');
            eventoControles();

        }
    };

}();



var oTable;

var CPLRGCA = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();

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

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/CPLRGCA.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/CPLRGCA.ashx?OPCION=1&p_CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    $('#cboEstablecimiento').select2('val', '');

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

    var listarFacturasCompra = function () {
        if (vErrors(["cboEmpresa", "cboEstablecimiento", "txtrazsocial", "txtRuc"])) {

            var data = new FormData();

            data.append('p_PERS_PIDM', $("#hfPIDM").val());
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_USUA_ID', $("#ctl00_txtus").val());
            data.append('p_DESDE', $("#txtDesde").val());
            data.append('p_HASTA', $("#txtHasta").val());


            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/cp/ajax/CPLRGCA.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               Desbloquear("ventana");
               if (datos != null) {
                   //Reporte
                   $('#divBandeja').html(datos)
                   //Montos totales separados por moneda
                   $("#txtTotalMonedaBase0").html($("#hfMontoTotalBase").val());
                   $("#txtTotalMonedaAlterna0").html($("#hfMontoTotalAlterna").val());
                   //"TotalDeudas
                   $("#txtTotalMonedaBase").html($("#hfTotalBase").val());
                   $("#txtTotalMonedaAlterna").html($("#hfTotalAlterna").val());
                   $("#bloqueTotales").attr("style", "display:block;");
                   //Datos moneda
                   $("#lblMonedaBase,#lblMonedaBase0").html($("#hfDescMonedaBase").val());
                   $("#lblSimboloMonedaBase,#lblSimboloMonedaBase0").html($("#hfSimbMonedaBase").val());
                   $("#lblMonedaAlterna,#lblMonedaAlterna0").html($("#hfDescMonedaAlterna").val());
                   $("#lblSimboloMonedaAlterna,#lblSimboloMonedaAlterna").html($("#hfSimbMonedaAlterna").val());
                   //Datos tipo de cambio
                   $("#fechaTipoCambio").html($("#hfFechaTipoCambio").val());
                   $("#valorTipoCambio").html($("#hfValorTipoCambio").val());
                   if ($("#hfFechaTipoCambio").val() != "-")
                       $("#bloqueTipoCambio").attr("style", "display:block;");
                   else
                       $("#bloqueTipoCambio").attr("style", "display:none;");

                   //$("#tblBandeja").DataTable()
                   oTable = $('#tblBandeja').dataTable({
                       "sPaginationType": "full_numbers",
                       "oLanguage": {
                           "sEmptyTable": "No hay datos disponibles en la tabla.",
                           "sZeroRecords": "No hay datos disponibles en la tabla."
                       }
                   });

                   //$("#txtDeudaTotal").html($("#hfDeudaTotal").val());
                   //$("#txtMontoTotal").html($("#hfMontoTotal").val());

               } else {
                   noexito();
               }
           })
           .error(function () {
               Desbloquear("ventana");
               noexito();
           });
        }
    }

    var eventoComtroles = function () {
        
        $('#cboEmpresa').on('change', function () {
            $("#inputRazsocial").html("");
            $("#inputRazsocial").html('<input id="txtRuc" class="span3" type="text" disabled="disabled" /> <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />');
            filltxtrazsocial('#txtrazsocial', '');
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#buscar').on('click', function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                listarFacturasCompra();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                listarFacturasCompra();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }

        });

    }

    return {
        init: function () {

            plugins();
            fillCboEmpresa();
            fillCboEstablecimiento($("#ctl00_hddctlg").val());
            filltxtrazsocial('#txtrazsocial', '');
            eventoComtroles();

        }
    };

}();


$(function () {

    $('#tblBandeja tbody td img').live('click', function () {

        var id = $(this).attr('id');
        var nTr = $(this).parents('tr')[0];

        if (oTable.fnIsOpen(nTr)) {
            /* This row is already open - close it */
            this.src = "recursos/img/details_open.png";
            oTable.fnClose(nTr);
        }
        else {
            /* Open this row */
            this.src = "recursos/img/details_close.png";
            //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

            oTable.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
            oTable.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
            $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
            $.ajax({
                type: "POST",
                url: "vistas/cp/ajax/CPLRGCA.ashx?OPCION=4&p_FACTURA=" + id,
                async: false,
                success: function (datos) {
                    $('#c' + id).html(datos);
                }
            });

        }

    });

    function fnFormatDetails(nTr, id) {
        //var aData = oTable.fnGetData(nTr);
        var sOut = '<div id="c' + id + '"></div>';
        return sOut;
    }
});
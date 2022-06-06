var CTLMCLC = function () {

    var fillCboEmpresa = function () {

        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                beforeSend: function () { Bloquear($($('#cboEmpresa').parents("div")[0])); },
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    //$('#cboEmpresa').select2('val', '');
                    $("select.empresa").val($("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                },
                complete: function () {
                    Desbloquear($($('#cboEmpresa').parents("div")[0]));
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
        }

    }

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option value="">TODOS</option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    //$('#cboEstablecimiento').select2('val', 'TODOS');
                    //selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    //$('#cboEstablecimiento').select2('val', '');
                }
                $('#cboEstablecimiento').val("").change();

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var fillcboTipoMoneda = function () {
        //Carga Monedas
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMMONE.ASHX?Opcion=4",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                var oTipoMoneda = datos;
                $("#cboTipoMoneda").html("<option value=''>TODOS</option>");
                $.each(oTipoMoneda, function (key, value) {
                    $("#cboTipoMoneda").append("<option value='" + value.CODIGO +
                        "' valueSimbMoneda='" + value.SIMBOLO + "'>" + value.DESCRIPCION + "</option>");
                });

                $("#cboTipoMoneda").val("").change();

            },
            error: function (msg) {
                alert(msg);
            }
        });
    };
    
    var fnCargarPlugins = function () {
        $(".ComboBox").select2();

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
    };

    var fnFillBandeja = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "NRO_MOV",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "ANIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                },
                {
                    data: "MES",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TIPO_ASIENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_EMI_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "FECHA_TRANSAC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "DECLARADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "MONE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "TC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        type: formatoMiles;
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<a class='VerAsiento' >Ver Asiento</a>");
                        $(td).css("text-align", "center").addClass("asiento");
                    }
                }
            ]
        }

        oTableLista = iniciaTabla("tblLista", parms);
        $("#tblLista").removeAttr("style");

        //var sFecha = mGetFechaActualServer(true);
        //var nAnio = sFecha.split("/")[2];


        var nAnio = (new Date()).getFullYear()
        var nLimite = (nAnio - 2016) + 4;
        var asAnio = [];
        for (var i = 0; i < nLimite; i++)
            asAnio[i] = nAnio - i;

        //Agregamos los tipos de controles para los filtros
        $("#tblLista").dataTable().columnFilter({
            aoColumns: [
                { type: "text" },
                { type: "text" },
                { type: "select", values: asAnio },
                { type: "select", values: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] },
                { type: "text" },
                { type: "select", values: ["AUTOMATICO", "MANUAL"] },
                { type: "text" },
                { type: "text" },
                { type: "select", values: ["S", "N"] },
                { type: "select", values: ["PEN", "USD"] },
                { type: "text" },
                null
            ]
        });

        //Editamos el texto de los combos que se usan en los filtros
        $("#tblLista_wrapper tfoot select option[value='S']").text("SI");
        $("#tblLista_wrapper tfoot select option[value='N']").text("NO");

        //Agregamos los placeholder a las cajas de texto de los filtros
        $("#tblLista_wrapper tfoot input").each(function () {
            $(this).attr("placeholder", $(this).attr("value"));
        });

        // modificamos la caja de texto del buscador
        //$("#tblPlanCuentas_wrapper .dataTables_filter input").addClass("m-wrap medium");

        // modificamos el combo de paginacion
        $("#tblLista_wrapper .dataTables_length select").addClass("m-wrap xsmall");

        // modificamos el tamaño de las caja de texto de los filtros
        var vInputBusq = $("#tblLista_wrapper tfoot input");
        $(vInputBusq[0]).addClass("m-wrap small");
        $(vInputBusq[1]).addClass("m-wrap small");
        $(vInputBusq[2]).addClass("m-wrap small");
        $(vInputBusq[3]).addClass("m-wrap small");
        $(vInputBusq[4]).addClass("m-wrap small");
        $(vInputBusq[5]).addClass("m-wrap xsmall");

        // modificamos el tamaño de los combos de los filtros
        var vSelectBusq = $("#tblLista_wrapper tfoot select");
        $(vSelectBusq[0]).addClass("m-wrap xsmall");
        $(vSelectBusq[1]).addClass("m-wrap xsmall");
        $(vSelectBusq[2]).addClass("m-wrap xsmall");
        $(vSelectBusq[3]).addClass("m-wrap xsmall");
        $(vSelectBusq[4]).addClass("m-wrap xsmall");

        //ponemos los filtros encima de las cabeceras de columnas de la Tabla
        //$("#tblLista tfoot").css("display", "table-header-group");
        //ponemos los filtros encima de las cabeceras de columnas de la Tabla
        $(".dataTables_scrollFoot").insertAfter($(".dataTables_scrollHead"));

        $("#tblLista tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                oTableLista.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
                var pos = oTableLista.fnGetPosition(this);
                var row = oTableLista.fnGetData(pos);
                //var sAnio = row.cAnio;
                //var sMes = row.cMes;
                //var sCodLibro = row.CodLibro;
                //var sNroMov = row.cNroMov;
                //window.location.href = "?f=CTMMCLC&sAnio=" + sAnio + "&sMes=" + sMes + "&sCodLibro=" + sCodLibro + "&sNroMov=" + sNroMov;
            }
        });

        $("#tblLista tbody").on("click", "td.asiento", function (event) {

            event.stopPropagation();
            var oTr = $(this).parent();

            $(this).find("a.VerAsiento").html("Ocultar");

            if (oTableLista.fnIsOpen(oTr)) {
                $(this).find("a.VerAsiento").html("Ver Asiento");
                oTr.removeClass("details");
                oTableLista.fnClose(oTr);
                return;
            }

            //alert("En contrucción...")
            var pos = oTableLista.api(true).row(oTr).index();
            var row = oTableLista.fnGetData(pos);
            var sCodigo = row.CODIGO;
   

            var oMovCuentaDet = fnListaMovContableDet(sCodigo);

            var sHtml = "<div class='span12' id='divTblCuentas'>";
            sHtml += "<div class='span12' id='divTblCuentas'>";
            sHtml += "<table id='tblCuentas' class='table table-bordered'>";
            sHtml += "<thead>";
            sHtml += "<tr style='background-color: rgb(3, 121, 56); color: aliceblue;'>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Correlativo</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Documento</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>F. Emisión</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Doc Id</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Persona</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Descripción</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Centro de Costos</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Cuenta</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberMN</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>DebeME</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>HaberME</th>";
            sHtml += "</tr>";
            sHtml += "</thead>";
            sHtml += "<tbody>";

            if (!isEmpty(oMovCuentaDet)) {
                var nTotalDebeMN = 0;
                var nTotalHaberMN = 0;
                var nTotalDebeME = 0;
                var nTotalHaberME = 0;
                $.each(oMovCuentaDet, function (key, value) {
                    var sCorrelativo = value.ITEM;
                    var sDocumento = value.DCTO;
                    var sFEmision = value.FECHA_DCTO;
                    var sCodIdent = value.DOC_IDENT;
                    var sPersona = value.PERSONA;
                    var sDescripcionItem = value.CTAS;
                    var sCCosto = value.CCOSTO_DET;
                    var sCuenta = value.CTAS_CODE;
                    var nDebeMN = value.DEBE_MN;
                    var nHaberMN = value.HABER_MN;
                    var nDebeME = value.DEBE_ME;
                    var nHaberME = value.HABER_ME;

                    sHtml += ("<tr>");
                    sHtml += ("<td style='text-align:center;'>" + sCorrelativo + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sDocumento + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sFEmision + "</td>");
                    sHtml += ("<td style='text-align:center;'>" + sCodIdent + "</td>");
                    sHtml += ("<td>" + sPersona + "</td>");
                    sHtml += ("<td>" + sDescripcionItem + "</td>");
                    sHtml += ("<td>" + sCCosto + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + sCuenta + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberMN) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nDebeME) + "</td>");
                    sHtml += ("<td style='text-align:right;'>" + formatoMiles(nHaberME) + "</td>");
                    sHtml += ("</tr>");

                    nTotalDebeMN = nTotalDebeMN + nDebeMN;
                    nTotalHaberMN = nTotalHaberMN + nHaberMN;

                    nTotalDebeME = nTotalDebeME + nDebeME;
                    nTotalHaberME = nTotalHaberME + nHaberME;
                });
            }
            sHtml += ("<tr style='background-color: rgb(237, 208, 0); color: #006232;'>");
            sHtml += ("<td colspan='8' style='text-align:right;font-weight:bold;'>Total</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberMN) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalDebeME) + "</td>");
            sHtml += ("<td style='text-align:right; font-weight:bold;'>" + formatoMiles(nTotalHaberME) + "</td>");
            sHtml += ("</tr>");

            sHtml += "</tbody>";
            sHtml += "</table>";
            sHtml += "</div>";

            oTableLista.fnOpen(oTr, sHtml, "details");
        });
    }

    var EventosControles = function () {
        $("#btnBuscar").on("click", function () {
            // aqui llmará para obtener datos de asientos
            fnListaMovContable();
        });

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento();
         
        });

        $("#cboEstablecimiento").on("change", function () {
         
        });
    };

    var fnListaMovContable = function () {
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LMCO&p_CTLG_CODE=" + $('#cboEmpresa').val() + "&p_SCSL_CODE=" + $('#cboEstablecimiento').val() +
                                                       "&p_MONE_CODE=" + $('#cboTipoMoneda').val(),

            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Asiento Contable.");
            }
        });
    };

    var fnListaMovContableDet = function (psCodigo) {
        var oMovCuentaDet = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LDCO&p_DCTO_CODE=" + psCodigo ,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oMovCuentaDet = datos; // JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Detalle del Movimiento Contable.");
            }
        });
        return oMovCuentaDet;
    };

    return {
        init: function () {
            fnCargarPlugins();
            EventosControles();
            fillCboEmpresa();
            fillCboEstablecimiento();
            fillcboTipoMoneda();
            fnFillBandeja();
            //fnListaMovContable();            
        }
    };

    

}();
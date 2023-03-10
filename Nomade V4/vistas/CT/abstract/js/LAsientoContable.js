var LAsientoContable = function () {

    var sCodMovContab;
    var sCodReferencia;//CAMBIO AVENGER
    var oTableLista;
    
    var fnFillBandejaCtas = function () {
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

        oTableLista = $("#tblLista").dataTable(parms);
        // $("#tblLista").removeAttr("style");

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

            var pos = oTableLista.api(true).row(oTr).index();
            var row = oTableLista.fnGetData(pos);
            var sCodigo = row.CODIGO;

            var oMovCuentaDet = fnListaMovContableDet(sCodigo);
            //console.log(oMovCuentaDet);
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
            sHtml += "<th style='text-align:center;font-weight: 600;'>Cuenta</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Descripción</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Centro de Costos</th>";            
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
                    var sCuenta = value.CTAS_CODE;
                    var sDescripcionItem = value.CTAS;
                    var sCCosto = value.CCOSTO_DET;                    
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
                    sHtml += ("<td style='text-align:right;'>" + sCuenta + "</td>");
                    sHtml += ("<td>" + sDescripcionItem + "</td>");
                    sHtml += ("<td>" + sCCosto + "</td>");                    
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
    };

    var fnListaMovContableDet = function (sCodMovContab) {
        var oMovCuentaDet = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LDCO&p_DCTO_CODE=" + sCodMovContab,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            beforeSend: function () { Bloquear("divTblCuentas"); },
            success: function (datos) {
                oMovCuentaDet = datos; // JSON.parse(datos);
            },
            error: function (msg) {
                infoCustom("No se pudo recuperar el Detalle del Movimiento Contable.");
            },
            complete: function () { Desbloquear("divTblCuentas"); }
        });
        return oMovCuentaDet;
    };

    var eventos = function () {
        $('#btnGenerarAsiento').on('click', function () {
            if (LAsientoContable.validate) {
                LAsientoContable.sCodDoc = $.trim(LAsientoContable.sCodDoc);
                if (LAsientoContable.sCodDoc === "") {
                    infoCustom("Imposible continuar. ¡El documento no está completado!");
                    return;
                }

                if (LAsientoContable.objDoc.length === 0 || LAsientoContable.objDoc === undefined) {
                    infoCustom("No se encontró el Documento: " + LAsientoContable.sCodDoc);
                    return;
                }

                let sAnuladoInd = LAsientoContable.objDoc[0].AnuladoInd;
                if (sAnuladoInd === "S") {
                    infoCustom("Imposible continuar. ¡El documento está anulado!");
                    return;
                }

                let sCompletoInd = LAsientoContable.objDoc[0].CompletoInd;
                if (sCompletoInd === "N") {
                    infoCustom("Imposible continuar. ¡El documento no está completado!");
                    return;
                }

                let sCodMovContab = LAsientoContable.objDoc[0].MOVCONT_CODE;
                sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
                if (sCodMovContab === "") {
                    fnGenerarAsiento(LAsientoContable.sCodDoc);
                }
            } else {
                if (LAsientoContable.sCodDoc === undefined || LAsientoContable.sCodDoc === null || LAsientoContable.sCodDoc === "") {
                    //infoCustom("No se encontró el Documento: " + LAsientoContable.sCodDoc);
                    return;
                }
                fnGenerarAsiento(LAsientoContable.sCodDoc);
            }
            

        });

    };

    var fnGenerarAsiento = function (sCodDoc) {
        var sUrl = "";
        var data = new FormData();
        data.append("OPCION", "GEN_ASIENTO");
        data.append("p_CODE", sCodDoc);
        data.append("USUA_ID", $("#ctl00_txtus").val());
        data.append("p_NCMOCONT_CODIGO", LAsientoContable.sTipoMov);
        debugger;
        switch (LAsientoContable.sTipoMov) {
            case "0001": /* VENTA */                
                sUrl = "vistas/nv/ajax/nvmdocv.ashx";
                break;
            case "0002": /* COMPRA */          
                sUrl = "vistas/NO/ajax/NOMDOCC.ashx";
                break; 
            case "0004": /* ALMACEN */
                sUrl = "vistas/NA/ajax/NAMINSA.ashx";
                break; 
            case "0003": /* GASTO*/
                sUrl = "vistas/CP/ajax/CPMAGAS.ashx";
                break;
            case "0009": /* ANTICIPO*/
                sUrl = "vistas/NV/ajax/NVMANTI.ashx";
                break;
            case "0013": /* NOTA DE CREDITO CLIENTE*/
                if (LAsientoContable.nc_generic)
                    sUrl = "vistas/CA/ajax/CAMNGCL.ashx";
                else
                    sUrl = "vistas/CA/ajax/CAMNOCL.ashx";
                break;
            case "0038": /* NOTA DE CREDITO PROVEEDOR*/
                if (LAsientoContable.nc_generic)
                    sUrl = "vistas/CA/ajax/CAMNGPR.ashx";
                else
                    sUrl = "vistas/CA/ajax/CAMNOPR.ashx";
                break;
        }     

        $.ajax({
            type: "POST",
            url: sUrl,
            contentType: false,
            data: data,
            processData: false,
            beforeSend: function () { Bloquear("divTablaAsiento","Generando Asiento ...");},
            async: true,
            success: function (response) {               
                if (response == "") {
                    noexito();
                    return;
                }

                if (response.indexOf("[Advertencia]:") > -1) {                    
                    infoCustom2(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    alertCustom(response);
                    return;
                }

                if (response == "SIN_CTA_CONTABLE_ORIGEN_COBRO") {
                    infoCustom2("No se pudo generar el asiento. El origen de cobro no tiene asociada una cuenta contable.");
                    return;
                }

                if (response == "NO_GENERA_ASIENTO_VENTA") {
                    infoCustom2("Solo se genera asiento de cobro para este tipo de documento.");
                    return;
                }

                $("#divGenAsiento").hide();
                //fnGetMovContable(response);
                fnGetMovContable(sCodDoc); //CAMBIO AVENGER
                exito();
            },
            complete: function () { Desbloquear("divTablaAsiento"); },
            error: function (msg) {              
                infoCustomCustom("No se pudo generar el asiento.");
            }
        });
    };

    //var fnGetMovContable = function (sCodMovContab) {
    
    //    $.ajax({
    //        type: "post",
    //        url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LMCO&p_DCTO_CODE=" + sCodMovContab,
    //        contenttype: "application/json;",
    //        datatype: "json",
    //        async: true,
    //        beforeSend: function () {
    //            Bloquear("divTblAsientos", "Obteniendo Asientos Contables ...");
    //        },
    //        success: function (datos) {
    //            oTableLista.fnClearTable();
    //            if (isEmpty(datos))
    //                return;
    //            oTableLista.fnAddData(datos);
    //        },
    //        error: function (msg) {
    //            infoCustom("No se pudo recuperar el Asiento Contable.");
    //        },
    //        complete: function () {
    //            Desbloquear("divTblAsientos");
    //        }
    //    });

    //};
    var VerificarAsiento = function (codref) {
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=VACO&p_DCTO_CODE=" + codref,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos !== "NAC") {//NO TIENE ASIENTO CONTABLE
                    $("#divGenAsiento").hide();
                } else {
                    $("#divGenAsiento").show();
                }
            },
            //error: function (msg) {
            //    infoCustom("No se pudo recuperar el Asiento Contable.");
            //}
        });
    };

    var fnGetMovContable = function (sCodReferencia) { //CAMBIO AVENGER

        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LMCO&p_DCTO_CODE=" + sCodReferencia,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            beforeSend: function () {
                Bloquear("divTblAsientos", "Obteniendo Asientos Contables ...");
            },
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
            },
            error: function (msg) {
                infoCustom("No se pudo recuperar el Asiento Contable.");
            },
            complete: function () {
                Desbloquear("divTblAsientos");
            }
        });

    };

    return {
        //init: function (sCodMovContab) {
          
        //    sCodMovContab = (isEmpty(sCodMovContab)? "" : sCodMovContab);
        //    if (sCodMovContab !== "") {
        //        $("#divGenAsiento").hide();
        //        fnGetMovContable(sCodMovContab);
        //    }
        //    fnFillBandejaCtas();
        //    eventos();
        //},
        init: function (sCodReferencia) { //CAMBIO AVENGER 

            sCodReferencia = (isEmpty(sCodReferencia) ? "" : sCodReferencia);
            if (sCodReferencia !== "") {
                //$("#divGenAsiento").hide();
                fnGetMovContable(sCodReferencia);
                VerificarAsiento(sCodReferencia);//VERFICAR SI TIENE ASIENTO AL CODIGO ORIGEN RELACIONADO
            }
            
            fnFillBandejaCtas();
            eventos();
        },
        objDoc: "",
        sCodDoc: "",
        sTipoMov: "",
        validate: true,
        nc_generic: false,
        limpiar: function () {
            oTableLista.fnClearTable();
            LAsientoContable.objDoc = "";
            LAsientoContable.sCodDoc = "";
            $("#divGenAsiento").show();
        }
    };

}();

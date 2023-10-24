var EFLENSU = function () {

    var bUltimo = false;

    var arrayDetalle = [];
    var nroDocsEnviados = 0;
    var nroDocsNoEnviados = 0;
    var nroDocsBaja = 0;

    var plugins = function () {        
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboCliente').select2();
        $('#cboEmision').select2();        
        $('#cboDocumento').select2();      

        $('#txtDesde').datepicker().change(function () {
            $('#txtHasta').val((parseInt($(this).val().split("/").reverse().join("")) > parseInt($('#txtHasta').val().split("/").reverse().join(""))) ? "" : $('#txtHasta').val());
            $('#txtHasta').datepicker('setStartDate', $(this).val());
        });

        $('#txtHasta').datepicker().on("change", function () {
            if ($('#txtDesde').val() != "") {
                $('#txtHasta').datepicker('setStartDate', $('#txtDesde').val());
            }
        });
        //fnSetRangoDatePickerMesHoy('txtDesde', 'txtHasta', true);
    }    

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            //url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        /*$('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');*/
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '" ruc="' + datos[i].RUC + '">' + datos[i].DESCRIPCION + '</option>');
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
                fillCboEstablecimiento();                                
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

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
                if (datos != null) {
                    $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');//se comenta esta línea y se oculta la opción de todos
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                    selectEst.val();
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            complete: function () {
                if (ObtenerQueryString("scsl") == undefined) {
                    //$("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                } else {
                    $("#cboEstablecimiento").select2("val", ObtenerQueryString("scsl"));
                    $("#txtDesde").val(ObtenerQueryString("desde"));
                    $("#txtHasta").val(ObtenerQueryString("hasta"));

                }                
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };
   
    var fillCliente = function () {
        var selectEst = $('#cboCliente');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option value="TODOS">TODOS</option>');
        $('#cboCliente').select2('val', 'TODOS');
        Bloquear("divCboCliente");
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=2.5&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboCliente");
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].PIDM + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                }
                $('#cboCliente').select2('val', 'TODOS');
                if (ObtenerQueryString("pidmC") != undefined) {
                    var pidm = pad(ObtenerQueryString("pidmC"), 9);
                    $('#cboCliente').select2("val", pidm);                   
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn grey");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var crearTablaVacia = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: null,
                    defaultContent: "<input type='checkbox' name='chkSelect' class='chkSelect'/>",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                        if (rowData.ESTADO_ELECT == 'ACEPTADO') {
                            $(td).html("<input type='checkbox' name='chkSelect' disabled='disabled' class='chkSelect'/>");
                        }
                    }
                },
                {
                    data: "COD_DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr('style', 'font-size:12px')
                    }


                },
                {
                    data: "DOC_CLIENTE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr('style', 'font-size:12px')
                    }

                },
                {
                    data: "CLIENTE", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).attr('style', 'font-size:12px')
                    }

                },
                {
                    data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr('style', 'font-size:12px')
                    }


                },
                {
                    data: "FECHA_EMISION",                   
                    type: "fecha",
                    align:"center"

                },
                {
                    data: "INFORMACION", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr('style', 'font-size:12px')
                    }


                },
                {
                    data: "TOTAL", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr('style', 'font-size:12px')
                    }

                },
                {
                    data: "ESTADO_ELECT", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr('style', 'font-size:12px')
                    }

                },
                {
                    data: null, createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')                      
                        let buttons = "";
                        if (rowData.ANULADO_IND === 'S' && rowData.ESTADO_ELECT !== "DE BAJA") {
                            if (rowData.ESTADO_ELECT !== "ENVIADO") {
                                buttons += `<button type="button" class='btn btnTbl black' action="baja" data-toggle="tooltip" data-placement="bottom" title="Dar de Baja"><i class='fa fa-thumbs-down'></i></button>`;
                            }
                        }
                        if ((rowData.ESTADO_ELECT == 'NO ENVIADO' || rowData.ESTADO_ELECT == 'ERROR') && rowData.ANULADO_IND === 'N') {
                            buttons += `<button type="button" class='btn btnTbl green' action="enviar" data-toggle="tooltip" data-placement="bottom" title="Enviar"><i class='fa fa-paper-plane'></button>`;                           
                        } else {
                            if (rowData.ESTADO_ELECT == 'ENVIADO') {

                                if (rowData.ANULADO_IND === 'S') {
                                    buttons = `<button type="button" class='btn btnTbl blue' action="verificar_baja"  data-toggle="tooltip" data-placement="bottom" title="Verificar"><i class="fa fa-clock-o"></i></button>`;                                   
                                } else {
                                    buttons = `<button type="button" class='btn btnTbl blue' action="verificar"  data-toggle="tooltip" data-placement="bottom" title="Verificar"><i class="fa fa-clock-o"></i></button>`;                                   
                                }                               
                                    
                                
                            } else {
                                if (rowData.ESTADO_ELECT == 'PENDIENTE') {
                                    buttons = `<button type="button" class='btn btnTbl blue' action="verificar"  data-toggle="tooltip" data-placement="bottom" title="Verificar"><i class="fa fa-clock-o"></i></button>`;                                   
                                } else {
                                    if (rowData.ESTADO_ELECT == 'PENDIENTE DE BAJA') {
                                        buttons = `<button type="button" class='btn btnTbl blue' action="verificar_baja"  data-toggle="tooltip" data-placement="bottom" title="Verificar"><i class="fa fa-clock-o"></i></button>`;      
                                    } else {
                                        $(td).html("")
                                    }
                                }
                            }
                        }
                        $(td).html(buttons);
                    },
                    width:"100px"

                }
            ],
            "sDom": 'TC<"clear">lfrtip',
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
            
        }

        oTable = iniciaTabla('tblDocumento', parms);
        actualizarEstilos();
        $('#tblDocumento tbody').on('click', 'button', function () {
            let pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            let row = oTable.fnGetData(pos);
            let documento = row.COD_DOCUMENTO;
            let serieNro = row.DOCUMENTO;

            //console.log(row);

            $('#btnEnviar').off("click"); // quitar eventos del boton
            $('#btnEnviarBaja').off("click");
            var sCodTipoDoc = $("#cboDocumento").val();

            switch ($(this).attr("action")) {

                case "enviar":
                    $('#divConfirmacion').modal('show');
                    $('#divDocElegido').attr('style', 'display:block;');
                    $('#divDocTodos').attr('style', 'display:none;');
                    $('#btnEnviar').show();
                    $('#btnConfirmarEnviarTodos').hide();
                    $('#btnConfirmarVerificarTodos').hide();
                    $('#btnEnviarBaja').hide();
                    $('#div_title').html('¿Esta seguro de enviar el documento ' + row.COD_DOCUMENTO + '?');
                    $('#lblDocumento').html(row.DOCUMENTO);
                    $('#lblCliente').html(row.CLIENTE);
                    $('#lblFecha').html(row.FECHA_EMISION);
                    $('#lblMonto').html(row.TOTAL);
                    $('#btnEnviar').on('click', function () { // boton del modal
                        bUltimo = true;
                        GenerarDocFacturacion(documento, serieNro);
                    });
                    break;
                case "baja":
                    $('#divConfirmacion').modal('show');
                    $('#divDocElegido').attr('style', 'display:block;');
                    $('#divDocTodos').attr('style', 'display:none;');
                    $('#btnEnviar').hide();
                    $('#btnConfirmarEnviarTodos').hide();
                    $('#btnConfirmarVerificarTodos').hide();
                    $('#btnEnviarBaja').show();              
                    $('#div_title').html('¿Esta seguro de realizar la baja del documento ' + row.COD_DOCUMENTO + '?');
                    $('#lblDocumento').html(row.DOCUMENTO);
                    $('#lblCliente').html(row.CLIENTE);
                    $('#lblFecha').html(row.FECHA_EMISION);
                    $('#lblMonto').html(row.TOTAL);
                    $('#btnEnviarBaja').on('click', function () { // boton del modal
                        bUltimo = true;
                        DarBajaDocFacturacion(documento);
                    });
                    break;
                case "ver":
                    fnDescargarArchivoEfact(sCodTipoDoc, row.DOCUMENTO.toString().split("/")[1]);
                    break;
                case "verificar":
                    fnVerificarDocOrbitum(documento, serieNro);
                    break;
                case "verificar_baja":
                    fnVerificarBajaDoc(documento);
                    break;
            }
            
        });
    };

    var fnVerificarDoc = function (documento, serieNro) {

        var sCodEmpresa = $("#cboEmpresa").val();
        var sCodTipoDoc = $("#cboDocumento").val();
        var rucEmpresa = $('#cboEmpresa option:selected').attr('ruc');

        if (sCodTipoDoc == '0001' || sCodTipoDoc == '0003') {
            if (sCodTipoDoc == '0001') {
                var sOpcion = 'VFACTELEC';
            } else {
                if (sCodTipoDoc == '0003') {
                    var sOpcion = 'VBOLELEC';
                }
            }
            //var sCodVenta = documento;
            var sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;
            $.ajax({
                type: "post",
                url: sRuta,
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                beforeSend: function () { Bloquear("contenedor"); },
                success: function (datos) {


                    if (isEmpty(datos)) {
                        alertCustom("Error al Enviar Documento Eletrónico");
                        return;
                    }
                    let iIndice = datos.indexOf("[Advertencia]");
                    if (iIndice >= 0) {
                        alertCustom(datos);
                        return;
                    }
                    if (datos.indexOf("[Error]") >= 0) {
                        alertCustom(datos);
                        return;
                    }

                    
                    if (datos === "ENVIADO_SUNAT") {
                        $('#btnFiltrarFactElec').click();
                        exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                    } else if (datos == "EXITO_SUNAT") {
                        $('#btnFiltrarFactElec').click();
                        exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                    } else if (datos == "PENDIENTE_SUNAT") {
                        $('#btnFiltrarFactElec').click();
                        infoCustom("El documento está pendiente a enviar a SUNAT. Vuelva a verificar en unos minutos.");
                    } else {
                        infoCustom("El documento no pudo ser enviado.");
                    }

                    //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));                    

                    $("#divConfirmacion").modal('hide');
                },
                error: function (msg) {
                    noexito();
                },
                complete: function () {
                    Desbloquear("contenedor");
                    if (bUltimo) {
                        bUltimo = false;
                        $('#btnFiltrarFactElec').click();
                    }
                }
            });
        } else {
            if (sCodTipoDoc == '0007') {   // NOTA DE CREDITO                
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VNCORB&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("contenedor") },
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        if (datos === "ENVIADO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else if (datos == "EXITO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                        } else if (datos == "PENDIENTE_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            infoCustom("El documento está pendiente a enviar a SUNAT. Vuelva a verificar en unos minutos.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }

                        /*if (datos === "") {
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }*/

                        //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));    
                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("contenedor");
                        if (bUltimo) {
                            bUltimo = false;
                            $('#btnFiltrarFactElec').click();
                        }
                    }
                });
            } else if (sCodTipoDoc == '0008') { // NOTA DE DEBITO
                //var sOpcion = 'VND';
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("contenedor") },
                    success: function (datos) {

                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }


                        if (datos === "ENVIADO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else if (datos == "EXITO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                        } else if (datos == "PENDIENTE_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            infoCustom("El documento está pendiente a enviar a SUNAT. Vuelva a verificar en unos minutos.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }

                        //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));                    

                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("contenedor");
                        if (bUltimo) {
                            bUltimo = false;
                            $('#btnFiltrarFactElec').click();
                        }
                    }
                });
            } else if (sCodTipoDoc == '0009') { //GUIA DE REMISION
                //var sOpcion = 'VGUIA_REMI_ELEC';
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VGUIA_REMI_ELEC&sCodEmpresa=" + sCodEmpresa + "&sCodGuiaRemision=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("contenedor"); },
                    success: function (datos) {


                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }


                        if (datos === "ENVIADO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else if (datos == "EXITO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                        } else if (datos == "PENDIENTE_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            infoCustom("El documento está pendiente a enviar a SUNAT. Vuelva a verificar en unos minutos.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }

                        //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));                    

                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("contenedor");
                        if (bUltimo) {
                            bUltimo = false;
                            $('#btnFiltrarFactElec').click();
                        }
                    }
                });
            }
        }
    };


    var fnVerificarDocOrbitum = function (documento, serieNro) {

        var sCodEmpresa = $("#cboEmpresa").val();
        var sCodTipoDoc = $("#cboDocumento").val();
        var anticipo = (documento.substring(0, 2) == "AP") ? true : false;
        var rucEmpresa = $('#cboEmpresa option:selected').attr('ruc');

        if (sCodTipoDoc == '0001' || sCodTipoDoc == '0003') {
            if (sCodTipoDoc == '0001') {
                if (anticipo) {
                    var sOpcion = 'VFACT_ANTI_ORBI';
                } else {
                    var sOpcion = 'VFACTELEC';
                }
                //var sOpcion = 'VFACTELEC';
            } else if (sCodTipoDoc == '0003') {
                if (anticipo) {
                    var sOpcion = 'VBOL_ANTI_ORBI';
                } else {
                    var sOpcion = 'VBOLELEC';
                }      
                //var sOpcion = 'VBOLELEC';    
            }
            //var sCodVenta = documento;
            var sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;
            $.ajax({
                type: "post",
                url: sRuta,
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                beforeSend: function () { Bloquear($("#contenedor"), "Verificando documentos ...") },
                success: function (datos) {


                    if (isEmpty(datos)) {
                        alertCustom("Error al Enviar Documento Eletrónico");
                        return;
                    }
                    let iIndice = datos.indexOf("[Advertencia]");
                    if (iIndice >= 0) {
                        alertCustom(datos);
                        return;
                    }
                    if (datos.indexOf("[Error]") >= 0) {
                        alertCustom(datos);
                        return;
                    }

                    if (datos === "ENVIADO_SUNAT") {                       
                        $('#btnFiltrarFactElec').click();                        
                        exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                    } else if (datos == "EXITO_SUNAT") {
                        $('#btnFiltrarFactElec').click();
                        exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                    } else if (datos == "PENDIENTE_SUNAT") {
                        $('#btnFiltrarFactElec').click();                        
                        exitoCustom("Se generaron los archivos correctamente. El documento está pendiente a enviar a SUNAT.");
                    } else {
                        infoCustom("El documento no pudo ser enviado.");                        
                    }

                    //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));                    

                    $("#divConfirmacion").modal('hide');
                },
                error: function (msg) {
                    noexito();
                },
                complete: function () {
                    Desbloquear("contenedor");
                    if (bUltimo) {
                        bUltimo = false;
                        $('#btnFiltrarFactElec').click();
                    }
                }
            });
        } else {
            if (sCodTipoDoc == '0007') {   // NOTA DE CREDITO                
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VNCORB&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear($("#contenedor"), "Verificando documentos ...") },
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        if (datos === "ENVIADO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else if (datos == "EXITO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                        } else if (datos == "PENDIENTE_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("Se generaron los archivos correctamente. El documento está pendiente a enviar a SUNAT.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }

                        /*if (datos === "OK") {
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }*/

                        //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));    
                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("contenedor");
                        if (bUltimo) {
                            bUltimo = false;
                            $('#btnFiltrarFactElec').click();
                        }
                    }
                });
            } else if (sCodTipoDoc == '0008') { // NOTA DE DEBITO
                //var sOpcion = 'FACT';
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear($("#contenedor"), "Verificando documentos ...") },
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        if (datos === "ENVIADO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else if (datos == "EXITO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                        } else if (datos == "PENDIENTE_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("Se generaron los archivos correctamente. El documento está pendiente a enviar a SUNAT.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }

                        /*if (datos === "OK") {
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }*/

                        //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));    
                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("contenedor");
                        if (bUltimo) {
                            bUltimo = false;
                            $('#btnFiltrarFactElec').click();
                        }
                    }
                });
            } else if (sCodTipoDoc == '0009') {
                //var sOpcion = 'FACT';
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VGUIA_REMI_ELEC&sCodEmpresa=" + sCodEmpresa + "&sCodGuiaRemision=" + documento + "&sSerieNro=" + serieNro + "&rucEmpresa=" + rucEmpresa;
                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear($("#contenedor"), "Verificando documentos ...") },
                    success: function (datos) {


                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        if (datos === "ENVIADO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else if (datos == "EXITO_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                        } else if (datos == "PENDIENTE_SUNAT") {
                            $('#btnFiltrarFactElec').click();
                            exitoCustom("Se generaron los archivos correctamente. El documento está pendiente a enviar a SUNAT.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }

                        //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));                    

                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("contenedor");
                        if (bUltimo) {
                            bUltimo = false;
                            $('#btnFiltrarFactElec').click();
                        }
                    }
                });
            }
        }
    };


    var fnVerificarBajaDoc = function (documento) {

        var sCodEmpresa = $("#cboEmpresa").val();
        var sCodTipoDoc = $("#cboDocumento").val();

        if (sCodTipoDoc == '0001' || sCodTipoDoc == '0003') {
            if (sCodTipoDoc == '0001') {
                var sOpcion = 'VBAJAFACT';
            } else {
                if (sCodTipoDoc == '0003') {
                    var sOpcion = 'VBAJABOL';
                }
            }
            var sCodVenta = documento;
            var sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta;
            $.ajax({
                type: "post",
                url: sRuta,
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                beforeSend: function () { Bloquear("contenedor"); },
                success: function (datos) {
                    if (isEmpty(datos)) {
                        alertCustom("Error al Enviar Documento Electrónico");
                        return;
                    }
                    let iIndice = datos.indexOf("[Advertencia]");
                    if (iIndice >= 0) {
                        alertCustom(datos);
                        return;
                    }
                    if (datos.indexOf("[Error]") >= 0) {
                        alertCustom(datos);
                        return;
                    }
                    if (datos === "ENVIADO_SUNAT") {
                        $('#btnFiltrarFactElec').click();
                        exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                    } else if (datos == "EXITO_SUNAT") {
                        $('#btnFiltrarFactElec').click();
                        exitoCustom("El documento fue aceptado correctamente por SUNAT.");
                    } else if (datos == "PENDIENTE_SUNAT") {
                        $('#btnFiltrarFactElec').click();
                        infoCustom("El documento está pendiente a enviar a SUNAT. Vuelva a verificar en unos minutos.");
                    } else {
                        infoCustom("El documento no pudo ser enviado.");
                    }
                    //if (datos === "OK") {
                    //    exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                    //} else {
                    //    infoCustom("El documento no pudo ser enviado.");
                    //}
                    //fnSubirArchivoEfact(datos.replace(".xml", ".zip"));                    

                    $("#divConfirmacion").modal('hide');
                },
                error: function (msg) {
                    noexito();
                },
                complete: function () {
                    Desbloquear("contenedor");
                    if (bUltimo) {
                        bUltimo = false;
                        $('#btnFiltrarFactElec').click();
                    }
                }
            });
        } else {
            if (sCodTipoDoc == '0007') {   // NOTA DE CREDITO                
                var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VBAJANC&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + sCodVenta

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("contenedor") },
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Electrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        if (datos === "OK") {
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                        } else {
                            infoCustom("El documento no pudo ser enviado.");
                        }
                        
                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("contenedor");
                        if (bUltimo) {
                            bUltimo = false;
                            $('#btnFiltrarFactElec').click();
                        }
                    }
                });
            } else {
                if (sCodTipoDoc == '0008') {   // NOTA DE DEBITO
                    var sOpcion = 'FACT';
                    var sCodVenta = documento;
                    let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=VBAJAND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + sCodVenta

                    $.ajax({
                        type: "post",
                        url: sRuta,
                        contenttype: "application/json;",
                        datatype: "json",
                        async: true,
                        beforeSend: function () { Bloquear("contenedor") },
                        success: function (datos) {
                            if (isEmpty(datos)) {
                                alertCustom("Error al Enviar Documento Electrónico");
                                return;
                            }
                            let iIndice = datos.indexOf("[Advertencia]");
                            if (iIndice >= 0) {
                                alertCustom(datos);
                                return;
                            }
                            if (datos.indexOf("[Error]") >= 0) {
                                alertCustom(datos);
                                return;
                            }

                            if (datos === "OK") {
                                exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
                            } else {
                                infoCustom("El documento no pudo ser enviado.");
                            }

                            $("#divConfirmacion").modal('hide');
                        },
                        error: function (msg) {
                            noexito();
                        },
                        complete: function () {
                            Desbloquear("contenedor");
                            if (bUltimo) {
                                bUltimo = false;
                                $('#btnFiltrarFactElec').click();
                            }
                        }
                    });
                }
            }
        }
    };

    var GenerarDocFacturacion = function (documento, serieNro) {
        
        var sCodEmpresa = $("#cboEmpresa").val();
        var sCodTipoDoc = $("#cboDocumento").val();
        var rucEmpresa = $('#cboEmpresa option:selected').attr('ruc');

        var anticipo = (documento.substring(0, 2) == "AP") ? true : false;

        if (sCodTipoDoc == '0001' || sCodTipoDoc == '0003') {
            if (sCodTipoDoc == '0001') {
                if (anticipo) {
                    var sOpcion = 'FACT_ANTI_ORBI';
                } else {
                    var sOpcion = 'FACT_ORBI';
                }
            } else {
                if (sCodTipoDoc == '0003') {
                    if (anticipo) {
                        var sOpcion = 'BOL_ANTI_ORBI';
                    } else {
                        var sOpcion = 'BOL_ORBI';
                    }                    
                }
            }
            //var sCodVenta = documento;
            let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + documento + "&rucEmpresa=" + rucEmpresa;
            $.ajax({
                type: "post",
                url: sRuta,
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                beforeSend: function () { Bloquear("divConfirmacion") },
                success: function (datos) {
                    if (isEmpty(datos)) {
                        alertCustom("Error al Enviar Documento Eletrónico");                        
                        return;
                    }
                    let iIndice = datos.indexOf("[Advertencia]");
                    if (iIndice >= 0) {
                        alertCustom(datos);
                        return;
                    }
                    if (datos.indexOf("[Error]") >= 0) {
                        alertCustom(datos);
                        return;
                    }                    
                    
                    fnVerificarDocOrbitum(documento, serieNro);
                    $("#divConfirmacion").modal('hide');
                    
                },
                error: function (msg) {
                    Desbloquear("divConfirmacion");
                    noexito();
                },
                complete: function () {
                    Desbloquear("divConfirmacion");
                
                }
            });
        } else {
            if (sCodTipoDoc == '0007') {   // NOTA DE CREDITO                
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=NC_ORBI&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + documento + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("divConfirmacion") },
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        fnVerificarDocOrbitum(documento, serieNro);

                        $("#divConfirmacion").modal('hide');
                    },
                    error: function (msg) {
                        Desbloquear("divConfirmacion");
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("divConfirmacion");

                    }
                });
            } else if (sCodTipoDoc == '0008') {   // NOTA DE DEBITO
                //var sOpcion = 'FACT';
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=ND_ORBI&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + documento + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("divConfirmacion") },
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        fnVerificarDocOrbitum(documento, serieNro);
                        $("#divConfirmacion").modal('hide');

                    },
                    error: function (msg) {
                        Desbloquear("divConfirmacion");
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("divConfirmacion");

                    }
                });
            } else if (sCodTipoDoc == '0009') { // GUIA DE REMISION
                //var sOpcion = 'FACT';
                //var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=GUIA_REMI_ORBI&sCodEmpresa=" + sCodEmpresa + "&sCodGuiaRemision=" + documento + "&rucEmpresa=" + rucEmpresa;

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("divConfirmacion") },
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }

                        fnVerificarDocOrbitum(documento, serieNro);
                        $("#divConfirmacion").modal('hide');

                    },
                    error: function (msg) {
                        Desbloquear("divConfirmacion");
                        noexito();
                    },
                    complete: function () {
                        Desbloquear("divConfirmacion");

                    }
                });
            }
        }
    };

    var ModificarEstadoDocumento = function (documento) {
        var sCodVenta = documento;
        var sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=MEFACT&sCodVenta=" + sCodVenta + "&sTipoDoc=" + $("#cboDocumento").val();
        $.ajax({
            type: "post",
            url: sRuta,
            contentType: false,
            processData: false,
            cache: false,
            success: function (datos) {
                $("#divConfirmacion").modal('hide');
                $('#btnFiltrarFactElec').click();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var DarBajaDocFacturacion = function (documento) {
        Bloquear("divConfirmacion");
        var sCodEmpresa = $("#cboEmpresa").val();
        var sCodTipoDoc = $("#cboDocumento").val();

        if (sCodTipoDoc == '0001' || sCodTipoDoc == '0003') {
            if (sCodTipoDoc == '0001') {
                var sOpcion = 'BFACT';
            } else {
                if (sCodTipoDoc == '0003') {
                    var sOpcion = 'BBOL';
                }
            }
            var sCodVenta = documento;
            var sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta;
            $.ajax({
                type: "post",
                url: sRuta,
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                success: function (datos) {
                    //console.log(datos)
                    if (isEmpty(datos)) {
                        alertCustom("Error al Enviar Documento Eletrónico");
                        return;
                    }
                    if (datos == "duplicado") {
                        alertCustom("Error registro de baja ya generado");
                        return;
                    }
                    let iIndice = datos.indexOf("[Advertencia]");
                    if (iIndice >= 0) {
                        alertCustom(datos);
                        return;
                    }
                    if (datos.indexOf("[Error]") >= 0) {
                        alertCustom(datos);
                        return;
                    }
                    exito();

                    //fnSubirArchivoEfact(datos);
                    $("#divConfirmacion").modal('hide');
                    $('#btnFiltrarFactElec').click();
                },
                error: function (msg) {
                    alert(msg);
                },
                complete: function () { Desbloquear("divConfirmacion"); }
            });
        } else {
            if (sCodTipoDoc == '0007') {   // NOTA DE CREDITO                
                var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=BNC&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + sCodVenta

                $.ajax({
                    type: "post",
                    url: sRuta,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,
                    success: function (datos) {
                        if (isEmpty(datos)) {
                            alertCustom("Error al Enviar Documento Eletrónico");
                            return;
                        }
                        let iIndice = datos.indexOf("[Advertencia]");
                        if (iIndice >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        if (datos.indexOf("[Error]") >= 0) {
                            alertCustom(datos);
                            return;
                        }
                        exito();
                        //fnSubirArchivoEfact(datos);
                        $("#divConfirmacion").modal('hide');
                        $('#btnFiltrarFactElec').click();
                    },
                    error: function (msg) {
                        alert(msg);
                    },
                    complete: function () { Desbloquear("divConfirmacion"); }
                });
            } else {
                if (sCodTipoDoc == '0008') {   // NOTA DE DEBITO
                    var sOpcion = 'FACT';
                    var sCodVenta = documento;
                    let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=BND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + sCodVenta

                    $.ajax({
                        type: "post",
                        url: sRuta,
                        contenttype: "application/json;",
                        datatype: "json",
                        async: false,
                        success: function (datos) {
                            if (isEmpty(datos)) {
                                alertCustom("Error al Enviar Documento Eletrónico");
                                return;
                            }
                            let iIndice = datos.indexOf("[Advertencia]");
                            if (iIndice >= 0) {
                                alertCustom(datos);
                                return;
                            }
                            if (datos.indexOf("[Error]") >= 0) {
                                alertCustom(datos);
                                return;
                            }
                            exito();
                            //fnSubirArchivoEfact(datos);
                            $("#divConfirmacion").modal('hide');
                            $('#btnFiltrarFactElec').click();
                        },
                        error: function (msg) {
                            alert(msg);
                        },
                        complete: function () { Desbloquear("divConfirmacion"); }
                    });
                }
            }
        }

    };

    var fnTestConexionFTP = function () {
        Bloquear("ventana");
        let sRuta = "vistas/EF/ajax/EFLENSU.ashx?sOpcion=TEST_CONEC_FTP_EFACT"

        $.ajax({
            type: "post",
            url: sRuta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                let iIndice = datos.indexOf("[Advertencia]");
                if (iIndice >= 0) {
                    alertCustom(datos);
                    return;
                }
                if (datos.indexOf("[Error]") >= 0) {
                    alertCustom(datos);
                    return;
                }
                exito();
            },
            error: function (msg) {
                alert(msg);
            },
            complete: function () { Desbloquear("ventana"); }
        });

    };

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboTipoDocumento();
            fillCliente();
            oTable.fnClearTable();
            Desbloquear("ventana");
        });

        $('#cboEstablecimiento').on('change', function () {
            Bloquear("ventana");
            fillCboTipoDocumento();
            oTable.fnClearTable();
            Desbloquear("ventana");
        });

        $('#btnCancelar').on('click', function () {
            $("#divConfirmacion").modal('hide');
        });

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
            //mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txtDesde").val(fNueva);

        $('#btnConfirmarEnviarTodos').on('click', function () {

            //var aDetalle = [];

            if (oTable.fnGetData().length == 0) {
                return "";
            }         

            if (arrayDetalle.length <= 0) {
                infoCustom("Seleccione por lo menos un documento...!");
            } else {
                let iNroReg = arrayDetalle.length;                

                for (var i = 0; i < iNroReg; i++) {
                    if (i === iNroReg - 1) {
                        bUltimo = true;
                    }
                    if (arrayDetalle[i].ESTADO_ELECT == 'NO ENVIADO' || arrayDetalle[i].ESTADO_ELECT == 'ERROR') {
                        if (arrayDetalle[i].ANULADO_IND == 'N') {
                            GenerarDocFacturacion(arrayDetalle[i].COD_DOCUMENTO, arrayDetalle[i].DOCUMENTO);
                        } else {
                            DarBajaDocFacturacion(arrayDetalle[i].COD_DOCUMENTO);
                        }
                    } else {
                        //infoCustom2("Los documentos ya fueron generados, aún están pendientes de enviar!");

                        if ($('#divConfirmacion').hasClass('in')) {
                            $("#divConfirmacion").modal('hide');
                        } 
                        
                    }
                }
            }

            /*$('#tblDocumento tbody').children().each(function (i) {
                var oDetalle = {};
                var varData = oTable.api(true).row($(this).parents("tr")[0]).index();
                var dataRow = oTable.fnGetData(varData);

                var COD_DOCUMENTO = dataRow.COD_DOCUMENTO;
                var ESTADO_ELECT = dataRow.ESTADO_ELECT;
                var ANULADO_IND = dataRow.ANULADO_IND;
                bValSelect = ($(this).find('input[type="checkbox"]').is(':checked') ? true : false);
                if (bValSelect) {
                    oDetalle.COD_DOCUMENTO = COD_DOCUMENTO
                    oDetalle.ESTADO_ELECT = ESTADO_ELECT
                    oDetalle.ANULADO_IND = ANULADO_IND
                    aDetalle.push(oDetalle);
                }
            });

            if (aDetalle.length <= 0) {
                infoCustom("Seleccione por lo menos un documento...!");
            } else {
                let iNroReg = aDetalle.length;
                for (var i = 0; i < iNroReg; i++) {
                    if (i === iNroReg - 1) {
                        bUltimo = true;
                    }
                    if (aDetalle[i].ESTADO_ELECT == 'NO ENVIADO' || aDetalle[i].ESTADO_ELECT == 'ERROR') {
                        if (aDetalle[i].ANULADO_IND == 'N') {
                            GenerarDocFacturacion(aDetalle[i].COD_DOCUMENTO);
                        } else {
                            DarBajaDocFacturacion(aDetalle[i].COD_DOCUMENTO);
                        }                        
                    } else {
                        infoCustom2("Los documentos ya fueron generados, aún están pendientes de enviar!");
                        $("#divConfirmacion").modal('hide');
                    }
                }
            }*/
        });

        $('#btnConfirmarVerificarTodos').on('click', function () {
            // var arrayVerificar = []
            if (oTable.fnGetData().length == 0) {
                return "";
            }
            /*$('#tblDocumento tbody').children().each(function (i) {
                var oDetalle = {};
                var varData = oTable.api(true).row($(this).parents("tr")[0]).index();
                var dataRow = oTable.fnGetData(varData);

                var COD_DOCUMENTO = dataRow.COD_DOCUMENTO;
                var ESTADO_ELECT = dataRow.ESTADO_ELECT;
                var ANULADO_IND = dataRow.ANULADO_IND; 
                bValSelect = ($(this).find('input[type="checkbox"]').is(':checked') ? true : false);
                if (bValSelect) {
                    oDetalle.COD_DOCUMENTO = COD_DOCUMENTO
                    oDetalle.ESTADO_ELECT = ESTADO_ELECT      
                    oDetalle.ANULADO_IND = ANULADO_IND
                    arrayVerificar.push(oDetalle);
                }
            });*/
            //console.log(arrayVerificar);
            if (arrayDetalle.length <= 0) {
                infoCustom("Seleccione por lo menos un documento...!");
            } else {
                let iNroReg = arrayDetalle.length;
                for (var i = 0; i < iNroReg; i++) {
                    if (i === iNroReg - 1) {
                        bUltimo = true;
                    }
                    if (arrayDetalle[i].ESTADO_ELECT == 'PENDIENTE' || arrayDetalle[i].ESTADO_ELECT == 'ENVIADO' || arrayDetalle[i].ESTADO_ELECT == 'PENDIENTE DE BAJA') {
                        if (arrayDetalle[i].ANULADO_IND == 'N') {
                            fnVerificarDoc(arrayDetalle[i].COD_DOCUMENTO, arrayDetalle[i].DOCUMENTO);
                        } else {
                            fnVerificarBajaDoc(arrayDetalle[i].COD_DOCUMENTO);
                        }                        
                    } else {
                        // infoCustom2("No se pueden verificar los documentos que aún no ha sido enviados a SUNAT!");
                        if ($('#divConfirmacion').hasClass('in')) {
                            $("#divConfirmacion").modal('hide');
                        }
                        
                    }
                }
            }
        });

        $('#btnFiltrarFactElec').on('click', function () {
            lstSeleccionados = [];
            var emp = $('#cboEmpresa').val();
            var suc = $("#cboEstablecimiento").val() == 'TODOS' ? '' : $('#cboEstablecimiento').val();
            var doc = $("#cboDocumento").val() == 'TODOS' ? '' : $('#cboDocumento').val();
            var des = $('#txtDesde').val();
            var has = $('#txtHasta').val();

            var dataFields = ["cboEmpresa", "cboEstablecimiento", "cboDocumento", "txtDesde", "txtHasta"];

            if (vErrors(dataFields)) {
                //var cli = $('#cboCliente').val();
                if ($('#cboCliente').val() == 'TODOS') {
                    var cli = '';
                } else {
                    var cli = $('#cboCliente').val();
                }
                var emi = $('#cboEmision').val();
                $.ajax({
                    type: "post",
                    url: "vistas/EF/ajax/EFLENSU.ashx?sOpcion=BLFE&sCodEmpresa=" + emp + "&sSucursal=" + suc + "&sTipoDoc=" + doc + "&sCliente=" + cli + "&sEmision=" + emi + "&sDesde=" + des + "&sHasta=" + has,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear($("#divDocumento"), "Cargando documentos ...") }, //{ Bloquear("divDocumento") },
                    success: function (datos) {
                        oTable.fnClearTable();
                        if (datos.length > 0) {
                            oTable.fnAddData(datos);
                            oTable.fnSort([[4,5, "desc"]]);
                            $(".btnTbl").tooltip();
                        } else {
                            infoCustom2("No se encontraron datos!");
                        }
                    },
                    complete: function () {
                        Desbloquear("divDocumento");
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });
            }
            
        });

        $('#btnEnviarTodos').on('click', function () {

            arrayDetalle = [];

            $('#tblDocumento tbody .chkSelect').each(function () {

                var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
                var row = oTable.fnGetData(pos);

                if ($(this).is(":checked")) {
                    arrayDetalle.push(row);
                } else {
                    arrayDetalle.filter(function (e, f) {
                        if (e == row) { arrayDetalle.splice(f, 1); }
                    });
                }
                //console.log(arrayDetalle);
            });

            if (arrayDetalle.length == 0) {
                infoCustom2("Seleccione por lo menos un documento.");
                return;
            } else {
                $("#divConfirmacion").modal('show');
                $('#divDocElegido').attr('style', 'display:none;');
                $('#btnEnviar').hide();
                $('#btnEnviarBaja').hide();
                $('#btnConfirmarEnviarTodos').show();
                $('#btnConfirmarVerificarTodos').hide();
                $('#divDocTodos').attr('style', 'display:block;');
                $('#div_title').html('¡ADVERTENCIA!');
            }

            
        });

        $('#btnVerificarTodos').on('click', function () {

            arrayDetalle = [];

            $('#tblDocumento tbody .chkSelect').each(function () {

                var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
                var row = oTable.fnGetData(pos);

                if ($(this).is(":checked")) {
                    arrayDetalle.push(row);
                } else {
                    arrayDetalle.filter(function (e, f) {
                        if (e == row) { arrayDetalle.splice(f, 1); }
                    });
                }
                //console.log(arrayDetalle);
            });

            if (arrayDetalle.length == 0) {
                infoCustom2("Seleccione por lo menos un documento.");
                return;
            } else {
                $("#divConfirmacion").modal('show');
                $('#divDocElegido').attr('style', 'display:none;');
                $('#btnEnviar').hide();
                $('#btnEnviarBaja').hide();
                $('#btnConfirmarEnviarTodos').hide();
                $('#btnConfirmarVerificarTodos').show();
                $('#divDocTodos').attr('style', 'display:block;');
                $('#div_title').html('¡ADVERTENCIA!');
                //console.log($('#txtMensajeConfirmar').html("<strong>¿Estás seguro de verificar todos los documentos seleccionados?</strong>"));
            }

           
        });

        $('#btnEnviarBaja').on('click', function () {
            var data = oTable.fnGetData();
            DarBajaDocFacturacion(data[0].COD_DOCUMENTO);
        });

        $(document).on("click", ".chkSeleccionarTodo", function () {
            if ($(this).is(":checked")) {
                $(".chkSelect").attr("checked", "checked").parent().addClass("checked");
            }
            else {
                $(".chkSelect").removeAttr("checked", "checked").parent().removeClass("checked");
            }
        });

        $(document).on("click", ".chkSelect", function () {
            if ($(this).is(":checked")) {
            } else {
                $(".chkSeleccionarTodo").removeAttr("checked", "checked").parent().removeClass("checked");
            }
        });

        $('#idTestConexion').on('click', function () {
            fnTestConexionFTP();
        });

        $('#cboDocumento').on('change', function () {
            oTable.fnClearTable();
        });

        $('#cboCliente').on('change', function () {
            oTable.fnClearTable();
        });

        $('#cboEmision').on('change', function () {
            oTable.fnClearTable();
        });        

    };

    var fillCboTipoDocumento = function () {
        var emp = $('#cboEmpresa').val();
        var sucu = $("#cboEstablecimiento").val() == 'TODOS' ? '' : $('#cboEstablecimiento').val();
        //$('#cboDocumento').html("<option value=''>TODOS</option>");
        //$('#cboDocumento').select2('val', 'TODOS');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=LDCE&P_SCSL_CODE=" + sucu + "&P_CTLG_CODE=" + emp,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //if (isEmpty(datos)) {
                //    return;
                //}
                $('#cboDocumento').empty();
                //$('#cboDocumento').append('<option Value="TODOS">TODOS</option>');//se comenta esta línea y se oculta la opción de todos
                for (var i = 0; i < datos.length; i++) {
                    $('#cboDocumento').append('<option value="' + datos[i].TIPO_DOC_CODE + '">' + datos[i].TIPO_DOC + '</option>');
                }
                $('#cboDocumento').select2('val', datos[0].TIPO_DOC_CODE);
                //$('#cboDocumento').select2('val', 'TODOS');
            },
            complete: function () {                             
                fillCliente();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    function cargainicial() {
        //$('#btnFiltrarFactElec').click();
    }

    var fnSubirArchivoEfact = function (sRuta) {
        $.ajax({
            type: "post",
            beforeSend: function () { Bloquear("ventana", "Cargando Archivo a Efact..."); },
            url: "vistas/EF/ajax/EFLENSU.ashx?sOpcion=SUBIR_EFACT&sRuta=" + sRuta,
            success: function (datos) {
                if (datos.indexOf("[Error]:")) {
                    infoCustom("El archivo no se ha descargado. Inténtelo en otro momento.");
                    return;
                }

                if (datos == "OK") {
                    Desbloquear("ventana");
                    exitoCustom("Se subieron correctamente los datos");
                }
            },
            complete: function () {
                Desbloquear("ventana");
            }
        });
    };

    var fnDescargarArchivoEfact = function (sTipoDoc, sNroDoc) {
        var sRespuesta = 0;
        $.ajax({
            type: "post",
            beforeSend: function () { Bloquear("ventana", "Descargando Archivos de Efact..."); },
            url: "vistas/EF/ajax/EFLENSU.ashx?sOpcion=BAJAR_EFACT&sTipoDoc=" + sTipoDoc + "&sNroDoc=" + sNroDoc,
            success: function (datos) {
                //console.log(datos);
                if (datos === "") {                  
                    infoCustom("El archivo no se ha descargado. Inténtelo en otro momento.");
                }
                sRespuesta = datos;
                exito();
            },
            complete: function () {
                Desbloquear("ventana");
                var sArchivoBase64 = "";
                if (sRespuesta) {
                    $.ajax({
                        type: "post",
                        url: "vistas/controles/UTILES.ashx?sOpcion=FILE2B64&sRuta=" + sRespuesta,
                        success: function (datos) {
                            if (datos.indexOf("[Error]") === -1) {
                                sArchivoBase64 = datos;
                            } else {
                                alertCustom("No se encontró el archivo");
                            }
                        },
                        complete: function () {                                              
                            var blob = new Blob([string2Buffer(atob(sArchivoBase64))], { type: 'application/pdf' });                       
                            window.open(URL.createObjectURL(blob), "_blank");
                        }
                    });
                   
                }
            }
        });
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            crearTablaVacia();
            fillCboEmpresa();
            fillCboTipoDocumento();
            cargainicial();

        }
    };

}();

var EnviarDocumento = function (documento) {
    GenerarDocFacturacion(documento);
}

var AnularDocumento = function (documento) {
    alert('Anular documento');
}

var NuevaPantalla = function () {
    window.location.href = '?f=EFLENSU';
}


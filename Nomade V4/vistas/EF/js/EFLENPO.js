﻿var EFLENPO = function () {

    var bUltimo = false;

    var plugins = function () {        
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboCliente').select2();
        $('#cboEmision').select2();        
        $('#cboDocumento').select2();
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
        fnSetRangoDatePickerMesHoy('txtDesde', 'txtHasta', true);                
    }    

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
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
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
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
  
    var crearTablaVacia = function () {
        var parms = {
            data: null,
            paginate: false,            
            columns: [
                {
                    data: null,
                    defaultContent: "<input type='checkbox' name='chkSelect' class='chkSelect'/>",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
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
                        if (rowData.ANULADO_IND === 'S' && rowData.ESTADO_ELECT!=="DE BAJA") {
                            buttons += `<button type="button" class='btn btnTbl black' action="baja" data-toggle="tooltip" data-placement="bottom" title="Dar de Baja"><i class='fa fa-thumbs-down'></i></button>`;
                        }
                        if ((rowData.ESTADO_ELECT == 'NO ENVIADO' || rowData.ESTADO_ELECT == 'ERROR') && rowData.ANULADO_IND === 'N') {
                            buttons += `<button type="button" class='btn btnTbl green' action="enviar" data-toggle="tooltip" data-placement="bottom" title="Enviar"><i class='fa fa-paper-plane'></button>`;                           
                        } else {
                            if (rowData.ESTADO_ELECT == 'ENVIADO') {                             
                                buttons += `<button type="button" class='btn btnTbl red' action="ver" data-toggle="tooltip" data-placement="bottom" title="Ver Documento"><i class='fa fa-file-pdf-o'></i></button>`;                                                           
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
        }

        oTable = iniciaTabla('tblDocumento', parms);
 
        $('#tblDocumento tbody').on('click', 'button', function () {
            let pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            let row = oTable.fnGetData(pos);
            let documento = row.COD_DOCUMENTO;

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
                    $('#btnEnviarBaja').hide();
                    $('#div_title').html('¿Esta seguro de enviar el documento ' + row.COD_DOCUMENTO + '?');
                    $('#lblDocumento').html(row.DOCUMENTO);
                    $('#lblCliente').html(row.CLIENTE);
                    $('#lblFecha').html(row.FECHA_EMISION.display);
                    $('#lblMonto').html(row.TOTAL);
                    $('#btnEnviar').on('click', function () { // boton del modal
                        bUltimo = true;
                        GenerarDocFacturacion(documento);
                    });
                    break;
                case "baja":
                    $('#divConfirmacion').modal('show');
                    $('#divDocElegido').attr('style', 'display:block;');
                    $('#divDocTodos').attr('style', 'display:none;');
                    $('#btnEnviar').hide();
                    $('#btnConfirmarEnviarTodos').hide();
                    $('#btnEnviarBaja').show();              
                    $('#div_title').html('¿Esta seguro de realizar la baja del documento ' + row.COD_DOCUMENTO + '?');
                    $('#lblDocumento').html(row.DOCUMENTO);
                    $('#lblCliente').html(row.CLIENTE);
                    $('#lblFecha').html(row.FECHA_EMISION.display);
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
                    fnVerificarDoc(documento);
                    break;
                case "verificar_baja":
                    fnVerificarBajaDoc(documento);
                    break;
            }
            
        });
    };

    var fnVerificarDoc = function (documento) {

        var sCodEmpresa = $("#cboEmpresa").val();
        var sCodTipoDoc = $("#cboDocumento").val();

        if (sCodTipoDoc == '0001' || sCodTipoDoc == '0003') {
            if (sCodTipoDoc == '0001') {
                var sOpcion = 'VFACT';
            } else {
                if (sCodTipoDoc == '0003') {
                    var sOpcion = 'VBOL';
                }
            }
            var sCodVenta = documento;
            var sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta;
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

                    if (datos === "OK") {
                        exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
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
                var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=VNC&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + sCodVenta

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

                        if (datos === "OK") {
                            exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
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
                if (sCodTipoDoc == '0008') {   // NOTA DE DEBITO
                    var sOpcion = 'FACT';
                    var sCodVenta = documento;
                    let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=VND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + sCodVenta

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

                            if (datos === "OK") {
                                exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
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
            var sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta;
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

                    if (datos === "OK") {
                        exitoCustom("La verificación se completó con éxito. El documento se envio correctamente.");
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
                var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=VBAJANC&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + sCodVenta

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
                    let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=VBAJAND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + sCodVenta

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

    var GenerarDocFacturacion = function (documento) {
        
        var sCodEmpresa = $("#cboEmpresa").val();
        var sCodTipoDoc = $("#cboDocumento").val();

        if (sCodTipoDoc == '0001' || sCodTipoDoc == '0003') {
            if (sCodTipoDoc == '0001') {
                var sOpcion = 'FACT';
            } else {
                if (sCodTipoDoc == '0003') {
                    var sOpcion = 'BOL';
                }
            }
            var sCodVenta = documento;
            var sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta;
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

                    fnVerificarDoc(documento);
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
                var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=NC&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + sCodVenta

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

                        fnVerificarDoc(documento);
                     
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
                if (sCodTipoDoc == '0008') {   // NOTA DE DEBITO
                    var sOpcion = 'FACT';
                    var sCodVenta = documento;
                    let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=ND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + sCodVenta

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

                            fnVerificarDoc(documento);                            
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
        }
    };

    var ModificarEstadoDocumento = function (documento) {
        var sCodVenta = documento;
        var sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=MEFACT&sCodVenta=" + sCodVenta + "&sTipoDoc=" + $("#cboDocumento").val();
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
            var sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=" + sOpcion + "&sCodEmpresa=" + sCodEmpresa + "&sCodVenta=" + sCodVenta;
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
            if (sCodTipoDoc == '0007') {   // NOTA DE CREDITO                
                var sCodVenta = documento;
                let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=BNC&sCodEmpresa=" + sCodEmpresa + "&sCodNC=" + sCodVenta

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
                    let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=BND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + sCodVenta

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
        let sRuta = "vistas/EF/ajax/EFLENPO.ashx?sOpcion=TEST_CONEC_FTP_EFACT"

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

        $('#btnConfirmarEnviarTodos').on('click', function () {
            var aDetalle = []
            if (oTable.fnGetData().length == 0) {
                return "";
            }
            $('#tblDocumento tbody').children().each(function (i) {
                var oDetalle = {};
                var COD_DOCUMENTO = $(this).find('td').eq(1).text();
                var ESTADO_ELECT = $(this).find('td').eq(7).text();
                bValSelect = ($(this).find('input[type="checkbox"]').is(':checked') ? true : false);
                if (bValSelect) {
                    oDetalle.COD_DOCUMENTO = COD_DOCUMENTO
                    oDetalle.ESTADO_ELECT = ESTADO_ELECT
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
                        GenerarDocFacturacion(aDetalle[i].COD_DOCUMENTO);
                    }
                }
            }
        });

        $('#btnFiltrarFactElec').on('click', function () {
            lstSeleccionados = [];
            var emp = $('#cboEmpresa').val();
            var suc = $('#cboEstablecimiento').val();
            var doc = $('#cboDocumento').val();
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
                    url: "vistas/EF/ajax/EFLENPO.ashx?sOpcion=BLFE&sCodEmpresa=" + emp + "&sSucursal=" + suc + "&sTipoDoc=" + doc + "&sCliente=" + cli + "&sEmision=" + emi + "&sDesde=" + des + "&sHasta=" + has,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    beforeSend: function () { Bloquear("divDocumento") },
                    success: function (datos) {
                        oTable.fnClearTable();
                        if (datos.length > 0) {
                            oTable.fnAddData(datos);
                            oTable.fnSort([[1, "desc"]]);
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
            $("#divConfirmacion").modal('show');
            $('#divDocElegido').attr('style', 'display:none;');
            $('#btnEnviar').hide();
            $('#btnEnviarBaja').hide();
            $('#btnConfirmarEnviarTodos').show();
            $('#divDocTodos').attr('style', 'display:block;');
            $('#div_title').html('¡ADVERTENCIA!');
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
        var sucu = $('#cboEstablecimiento').val();
        $('#cboDocumento').html("<option value=''></option>");
        $('#cboDocumento').select2('val', '');
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMAUTD.ashx?OPCION=LDCE&P_SCSL_CODE=" + sucu + "&P_CTLG_CODE=" + emp,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos)) {
                    return;
                }                                
                for (var i = 0; i < datos.length; i++) {
                    $('#cboDocumento').append('<option value="' + datos[i].TIPO_DOC_CODE + '">' + datos[i].TIPO_DOC + '</option>');
                }
                $('#cboDocumento').select2('val', datos[0].TIPO_DOC_CODE);
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
        $('#btnFiltrarFactElec').click();
    }

    var fnSubirArchivoEfact = function (sRuta) {
        $.ajax({
            type: "post",
            beforeSend: function () { Bloquear("ventana", "Cargando Archivo a Efact..."); },
            url: "vistas/EF/ajax/EFLENPO.ashx?sOpcion=SUBIR_EFACT&sRuta=" + sRuta,
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
            url: "vistas/EF/ajax/EFLENPO.ashx?sOpcion=BAJAR_EFACT&sTipoDoc=" + sTipoDoc + "&sNroDoc=" + sNroDoc,
            success: function (datos) {
                console.log(datos);
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



﻿
var monedaCabecera;
var gDatos = null;
var CAMANPR = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDocumento').select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            Bloquear("divCboEmpresa");
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                cache: true,
                success: function (datos) {
                    Desbloquear("divCboEmpresa");
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option value=""></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                    Fin1_CargaEmpresa();
                },
                error: function (msg) {
                    Desbloquear("divCboEmpresa");
                    alertCustom("Empresas no se listaron correctamente");
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
            $('#cboEmpresa').select2('val', '');
            Fin1_CargaEmpresa();
        }
    }

    var fillCboEstablecimiento = function () {
        Bloquear("divCboEstablecimiento");
        $('#divCboEstablecimiento').select2("val", "");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboEstablecimiento");
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option value=""></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                Fin2_CargaEstablecimiento();
            },
            error: function (msg) {
                Desbloquear("divCboEstablecimiento");
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    //TIPOS DE DOCUMENTO DE REFERENCIA (VENTA)
    var fillCboTipoDocumento = function () {
        Bloquear("divCboTipoDocumento");
        $('#cboTipoDocumento').select2("val", "");
        var opcion = 'VENT';
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboTipoDocumento");
                $('#cboTipoDocumento').empty();
                $('#cboTipoDocumento').append('<option value=""></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoDocumento').append('<option value="' + datos[i].CODIGO + '" fecha-elec="' + datos[i].FECHA_ELEC + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                Fin2_CargaTipoDocumento();
            },
            error: function (msg) {
                Desbloquear("divCboTipoDocumento");
                alertCustom(msg);
            }
        });
    }

    var AnularDcto = function () {
        var data = new FormData();
        Bloquear("ventana");
        data.append('p_NOCC_CODE', $("#txtCodigo").val());
        data.append('ANULAC_ID', $("#ctl00_txtus").val());
        data.append('CMNT_ANULAC', $("#txtAnulacionCom").val());
        data.append('DEVOLUCION_EFECTIVO', ($("#chkDevEfectivo").is(":checked")) ? "S" : "N");
        data.append('DEVOLUCION_DESPACHO', ($("#chkDevDespacho").is(":checked")) ? "S" : "N");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/ca/ajax/camnopr.ashx?OPCION=ANULAR",
            contentType: false,
            data: data,
            processData: false,
            async: true,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               if (datos == "OK") {
                   exito();
                   $("#chkAnulado").attr("checked", true).parent().addClass("checked");
                   $("#txtAnulacionCom").attr("disabled", "disabled");
                   $("#btnAnular").attr("style", "display:none;");
                   $("#divDevoluciones").attr("style", "display:none;");
                   $("#divMensajes").slideUp();
               }
               else if (datos == "COINCIDENCIAS") {
                   infoCustom2("El documento tiene asociadas varias amortizaciones coincidentes con el monto de la nota de crédito. La anulación NO se realizará");
               }
               else {
                   alertCustom("ERROR: " + datos);
               }
           } else {
               noexito();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });

    }

    function eventoControles() {
        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento();
            fillCboTipoDocumento();
        });

        $("#cbo_moneda").on("change", function () {
            $('#simbolo_moneda').text($('#cbo_moneda :selected').attr('simbolo'));
        });

        $("#btnAnular").on("click", function () {
            if ($("#chkAnulado").is(":checked")) {
                alertCustom("El documento ya no puede ser anulado!")
            }
            else {
                //TO DO: VALIDAR DESPACHO DE PRODUCTOS Y AMORTIZACIONES
                //if (vErrors(['txtAnulacionCom'])) {
                //    if ($("#hfEstadoDespacho").val() != "N" && !$("#chkDevDespacho").is(":checked")) {
                //        $("#msgDespacho").html("Se encontraron salidas de almacén registradas para este documento y NO se seleccionó  'Devolución Despacho'. NO se  retornará stock entregado.");
                //    }
                //    $("#modal-confirmar").modal("show");
                //}
                if (vErrors(['txtAnulacionCom'])) {
                    $("#modal-confirmar").modal("show");
                }
            }
        });

        $("#btnAceptar").on("click", function () {
            Bloquear("ventana");
            AnularDcto();
            $("#modal-confirmar").modal("hide");
            $("#msgDespacho").html("");
            Desbloquear("ventana");
        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");
            $("#msgDespacho").html("");
        });

    }

    var cargaInicial = function () {
        var code = ObtenerQueryString("codigo");
        if (code != undefined) {
            Bloquear("ventana");
            if (code.indexOf("BG") == 0) {//NOTA DE CREDITO GENÉRICA
                $.ajax({
                    type: "post",
                    url: "vistas/ca/ajax/CAMNGPR.ashx?OPCION=4" +
                         "&p_CODE=" + code +
                         "&p_TIPO_IND=P",
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        gDatos = datos;
                        gDatos[0].SUCURSAL_CODE = datos[0].SCSL_CODE;
                        gDatos[0].ORIGEN_TIPO_DOC = datos[0].DCTO_REF_TIPO_CODE;
                        $("#chkAlmacen").parent().parent().parent().fadeOut();
                        $("#divMensajes").fadeOut();
                        $("#divMensajes2").fadeIn();

                        Desbloquear("ventana");
                        //F0
                        $("#txtCodigo").val(datos[0].CODIGO);

                        if (datos[0].ANULADO_IND == "S") {
                            $("#chkAnulado").attr("checked", "checked").parent().addClass("checked");

                            $("#txtAnulacionCom").val(datos[0].CMNT_ANULAC);
                            $("#txtFechaAnulacion").val(datos[0].FECHA_ANULAC);
                            $("#txtUsuarioAnulacion").val(datos[0].ANULAC_ID);
                            $("#divDatosAnulacion").attr("style", "display:block;");

                            $("#txtAnulacionCom").attr("readonly", "readonly");
                            $("#btnAnular").attr("style", "display:none;");
                            $("#divDevoluciones").attr("style", "display:none;");
                            $("#divMensajes").slideUp();
                        }
                        //F1
                        $("#cboEmpresa").select2("val", datos[0].CTLG_CODE).change();//CHANGE CARGA SUCURSAL Y TIPOS DE DCTO DE FORMA ASINCRONA                    
                        //F2
                        $("#txtrazsocial").val(datos[0].RAZON_SOCIAL);
                        $("#txtSerieNotaCredito").val(datos[0].SERIE);
                        $("#txtNroNotaCredito").val(datos[0].NUMERO);
                        //
                        $("#txtFechaEmision").val(datos[0].EMISION);
                        $("#txtFechaTransaccion").val(datos[0].TRANSACCION);
                        //F4   //EJM:DOCUMENTO_ORIGEN: "T/001 - 000005104"          
                        $("#txtSerie").val($.trim(datos[0].DCTO_REF_SERIE));
                        $("#txtNro").val($.trim(datos[0].DCTO_REF_NRO));
                        //
                        $("#txtMontoIgv").val(datos[0].IGV);
                        $("#txtTotalDevolucion").val(datos[0].IMPORTE_TOTAL);
                        $(".lblMoneda").html("(" + datos[0].MONEDA_SIMBOLO + ")");

                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        alert(msg);
                    }
                });

            } else {
                $.ajax({
                    type: "post",
                    url: "vistas/CA/ajax/calnocr.ashx?opcion=2" +
                        "&p_NOCC_CODE=" + code +
                        "&p_CTLG_CODE=",
                    contenttype: "application/json;",
                    datatype: "json",
                    async: true,
                    success: function (datos) {
                        gDatos = datos;
                        Desbloquear("ventana");
                        /*
                        CODIGO: "B00000001"
                        COMPRA_VENTA: "V"
                        DESC_SUCURSAL: "ORBITUM TRUJILLO"
                        DESTINO: "V00000838"
                        DESTINO_TIPO_DOC: "0012"
                        DOCUMENTO: "N/0001-0000020"
                        DOCUMENTO_ORIGEN: "T/001 - 000005104"
                        EMISION: "07/11/2015"
                        EMPRESA_CODE: "N"
                        ENTREGA_DESPACHO_ALMACEN: "S"
                        ESTADO_USO: ""
                        FECHA_TRANSACCION: "17/12/2015 12:23:05 p.m."
                        MONEDA: "PEN"
                        MONEDA_SIMBOLO: "S/."
                        MONTO_IGV: "28.98"
                        MONTO_TOTAL: "190.00"
                        ORIGEN: "V00000384"
                        ORIGEN_IMPORTE: "190.0000"
                        ORIGEN_TIPO_DOC: "0012"
                        PIDM: "2321"
                        RAZON_SOCIAL: "LLERENA PALOMINO LUIS"
                        SECUENCIA: "1"
                        SERIE_NUMERO: "0001-0000020"
                        SUCURSAL_CODE: "0001"                    
                        */
                        //F0
                        $("#txtCodigo").val(datos[0].CODIGO);
                        if (datos[0].ENTREGA_DESPACHO_ALMACEN == "S") {
                            $("#chkAlmacen").attr("checked", "checked").parent().addClass("checked");
                        }
                        if (datos[0].ANULADO_IND == "S") {
                            $("#chkAnulado").attr("checked", "checked").parent().addClass("checked");

                            $("#txtAnulacionCom").val(datos[0].CMNT_ANULAC);
                            $("#txtFechaAnulacion").val(datos[0].FECHA_ANULAC);
                            $("#txtUsuarioAnulacion").val(datos[0].ANULAC_ID);
                            $("#divDatosAnulacion").attr("style", "display:block;");

                            $("#txtAnulacionCom").attr("readonly", "readonly");
                            $("#btnAnular").attr("style", "display:none;");
                            $("#divDevoluciones").attr("style", "display:none;");
                            $("#divMensajes").slideUp();
                        }
                        //F1
                        $("#cboEmpresa").select2("val", datos[0].EMPRESA_CODE).change();//CHANGE CARGA SUCURSAL Y TIPOS DE DCTO DE FORMA ASINCRONA                    
                        //F2
                        $("#txtrazsocial").val(datos[0].RAZON_SOCIAL);
                        $("#txtSerieNotaCredito").val(datos[0].SERIE_NUMERO.split("-")[0]);
                        $("#txtNroNotaCredito").val(datos[0].SERIE_NUMERO.split("-")[1]);
                        //
                        $("#txtFechaEmision").val(datos[0].EMISION);
                        $("#txtFechaTransaccion").val(datos[0].FECHA_TRANSACCION);
                        //F4   //EJM:DOCUMENTO_ORIGEN: "T/001 - 000005104"          
                        $("#txtSerie").val($.trim(datos[0].DOCUMENTO_ORIGEN.split("/")[1].split("-")[0]));
                        $("#txtNro").val($.trim(datos[0].DOCUMENTO_ORIGEN.split("/")[1].split("-")[1]));
                        //
                        $("#txtMontoIgv").val(datos[0].MONTO_IGV);
                        $("#txtTotalDevolucion").val(datos[0].MONTO_TOTAL);
                        $(".lblMoneda").html("(" + datos[0].MONEDA_SIMBOLO + ")");

                    },
                    error: function (msg) {
                        Desbloquear("ventana");
                        alert(msg);
                    }
                });
            }

        }
    }

    var Fin1_CargaEmpresa = function () {
        cargaInicial();
        if ($("#cboEmpresa").val() != "") {
            fillCboEstablecimiento();
            fillCboTipoDocumento();
        }
    };
    var Fin2_CargaEstablecimiento = function () {
        if (gDatos != null) {
            $("#cboEstablecimiento").select2("val", gDatos[0].SUCURSAL_CODE);
        }
    };
    var Fin2_CargaTipoDocumento = function () {
        if (gDatos != null) {
            $("#cboTipoDocumento").select2("val", gDatos[0].ORIGEN_TIPO_DOC);
        }
    };

    return {
        init: function () {
            var cod = ObtenerQueryString("codigo");
            if (cod != undefined) {
                plugins();
                eventoControles();
                fillCboEmpresa();
            } else {
                infoCustom2("Debe seleccionar una nota de crédito!");
                window.location.href = "?f=CALANPR";
            }

        }
    };

    /**************************************************************/

}();

//LISTADO DE TODOS
var json = null;
var ini = true;
var CALNCPR = function () {
    
    //GENERICAS
    function ListarNotasCredito() {
        oTable.fnClearTable();

        Bloquear("ventana")
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMNGPR.ashx?OPCION=4" +
                "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
                "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
                "&p_TIPO_IND=P",
            contenttype: "application/text;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("ventana")
                if (!isEmpty(datos)) {
                    oTable.fnAddData(datos);
                    oTable.fnAdjustColumnSizing();
                }
                ListarNotasCredito2();
            },
            error: function (msg) {
                ListarNotasCredito2();
                Desbloquear("ventana")
                alert(msg);
            }
        });
    }

    //DEVOLUCION PRODUCTOS
    function ListarNotasCredito2() {
        Bloquear("ventana")
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calnocr.ashx?OPCION=2"+
                 "&p_CTLG_CODE=" + $("#cboEmpresa").val() +
                 "&p_SCSL_CODE=" + $("#cboEstablecimiento").val() +
                 "&p_COMPRA_VENTA_IND=C",
            contenttype: "application/text;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("ventana")
                if (!isEmpty(datos)) {
                    oTable.fnAddData(datos);
                    oTable.fnAdjustColumnSizing();
                }
            },
            error: function (msg) {
                Desbloquear("ventana")
                alert(msg);
            }
        });


    }


    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboEstado').select2();        
    }

    function fillCboEmpresa() {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            Bloquear("divCboEmpresa");
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: true,
                cache: true,
                success: function (datos) {
                    Desbloquear("divCboEmpresa");
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option value=""></option>');
                    if (!isEmpty(datos)) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $('#cboEmpresa').select2('val', '');
                    Fin1_CargaEmpresa();
                },
                error: function (msg) {
                    Desbloquear("divCboEmpresa");
                    alertCustom("Empresas no se listaron correctamente");
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
            $('#cboEmpresa').select2('val', '');
            Fin1_CargaEmpresa();
        }
    }

    function fillCboEstablecimiento() {
        Bloquear("divCboEstablecimiento");
        $('#divCboEstablecimiento').select2("val", "");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboEstablecimiento");
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option value=""></option>');
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                Fin2_CargaEstablecimiento();
            },
            error: function (msg) {
                Desbloquear("divCboEstablecimiento");
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $('#buscar').on('click', function () {
            ListarNotasCredito();
        });
    }
    //---
    var iniTabla = function () {

        var parms = {
            data: null,
            columns: [
                 {
                     data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     visible: false
                 },
                  {
                      data: null, createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('align', 'center');
                          if (rowData.ANULADO_IND == "S") {
                              $(td).html('<i class="icon-pushpin" style="color: red"></i>');
                          } else {
                              if (rowData.CODIGO.indexOf("BG") == 0) {
                                  $(td).html('<i class="icon-pushpin" style="color: black"></i>');
                              } else {
                                  $(td).html('<i class="icon-pushpin" style="color: blue"></i>');
                              }
                          }
                      }
                  },
                 {
                     data: "DOCUMENTO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "MOTIVO_DESC", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     }
                 },
                 {
                     data: "MONEDA", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "IMPORTE_TOTAL", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                         var valor = cellData;
                         $(td).html(formatoMiles(valor));
                     },
                 },
                 {
                     data: "RAZON_SOCIAL", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                     },
                 },
                 {
                     data: "EMISION", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                     type: "fecha"
                 },
                 {
                     data: "USADO", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     },
                 },
                 {
                     data: "DOCUMENTO_REF", createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                         var valor = cellData;
                         if (valor == "") {
                             $(td).html("NINGUNO");
                         }
                     },
                 }
            ],
            order: ["0", "desc"],
            oLanguage: {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            },
            scrollX: "true"
        }

        oTable = iniciaTabla('tblNotasCredito', parms);
        $('#tblNotasCredito').removeAttr('style');


        $('#tblNotasCredito tbody').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var code = row.CODIGO;
                var codempr = row.EMPRESA_CODE;
                if (code.indexOf("BG") == 0) {
                    //window.location.href = '?f=CAMNGPR&codigo=' + code;
                    window.open("?f=CAMNGPR&codigo=" + code, '_blank');
                } else {
                    //window.location.href = '?f=CAMNOPR&codigo=' + code + "&codempr=" + codempr;
                    window.open("?f=CAMNOPR&codigo=" + code + "&codempr=" + codempr, '_blank');
                }
            }
        });
    }
    var iniBloqueo = function () {
        Bloquear("cboEmpresa");
        Bloquear("cboEstablecimiento");
    }
    //---
    var Fin1_CargaEmpresa = function () {

        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        if ($("#cboEmpresa").val() != "") {
            fillCboEstablecimiento();
        }
    };
    var Fin2_CargaEstablecimiento = function () {

        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val()).change();
        if ($("#cboEstablecimiento").val() != "" && ini) {//Primera Carga
            ini = false;
            ListarNotasCredito();
        }
    };

    return {
        init: function () {
            iniBloqueo();
            iniTabla();
            plugins();
            fillCboEmpresa();
            eventoControles();
        }
    };

}();

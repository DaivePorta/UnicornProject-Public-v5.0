//----
var igv = 0.18;
var iDesc;
var iCant;
var iUnme;
var iAfec;
var iPrec;
var iPrecSinIgv;
var iSubt;
var iSubtSinIgv;
var opGra = 0;
var opIna = 0;
var opExo = 0;
var opIgv = 0;
var importeTotal = 0;
//-------
var detalles = [];
var item = {};
var dctoSeleccionado = {};
var notaDebito = {};
//------
const codUnidades = '0007';

var CAMNODP = function () {
   

    var plugins = function () {
        $(".combobox").select2();
        $("#txtFechaEmision").datepicker();
        $("#txtFechaEmision").datepicker("setEndDate", "now");
        $("#txtFechaEmisionRef").datepicker();
        $("#txtFechaTransaccion").datepicker("setDate", "now");
        $("#txtSerieND").inputmask({ "mask": "#", "repeat": 5, "greedy": false });
        $('#cbo_periodo').select2();

    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
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
                    $('#cboEmpresa').select2('val', '');
                },
                error: function (msg) {
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
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var filltxtrazsocial = function (v_ID, v_value) {
        $("#inputRazsocial").html('<input id="txtrazsocial" class="span12" type="text" data-provide="typeahead" placeholder="Proveedor" />');
        var selectRazonSocial = $(v_ID);
        //Clientes
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=2&p_CTLG_CODE=" + $("#cboEmpresa").val(),
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
                            //$("#txtrazsocial").val(map[item].RAZON_SOCIAL);
                            //if (map[item].RUC == "") {
                            //    $("#txtRuc").val(map[item].DNI);
                            //}
                            //else {
                            //    $("#txtRuc").val(map[item].RUC);
                            //}
                            return item;
                        },


                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                        if ($("#txtrazsocial").val().length <= 0) {
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

    var fillCboMoneda = function () {
        $('#cboMoneda').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty().append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboMoneda').val("");
            },
            error: function (msg) {
                alertCustom("Monedas no se listaron correctamente.");
            }
        });
        $('#cboMoneda').select2();
    }

    var fillcboUniMedida = function () {
        Bloquear("divUnidadMedida");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=3",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                $('#cboUnidadMedida').empty();
                $('#cboUnidadMedida').append('<option value="">NINGUNA</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboUnidadMedida').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboUnidadMedida').select2('val', codUnidades);
                Desbloquear("divUnidadMedida");
            },
            error: function (msg) {
                alertCustom("Unidades de Medida no se listaron correctamente.");
                Desbloquear("divUnidadMedida");
            }
        });
    }

       
    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            filltxtrazsocial('#txtrazsocial', '');
            fillCboEstablecimiento($("#cboEmpresa").val());
            fillCboTipoDocumento();
        });

        $("#cboEstablecimiento").on("change", function () {

            if ($("#cboEstablecimiento").val() == "") {


            } else {
                if ($("#cboEstablecimiento :selected").attr("data-exonerado") == "SI") {
                    igv = 0;
                    $("#lblExonerado").html("*Establecimiento Exonerado");
                    $("#cboAfectacionIgv").select2("val", "EXO").attr("disabled", "disabled");

                } else {
                    var auxIgv = parseFloat($('#hfIMPUESTO').val())
                    igv = auxIgv > 1 ? (igv = auxIgv / 100) : (auxIgv = auxIgv);
                    $("#lblExonerado").html("");
                    $("#cboAfectacionIgv").removeAttr("disabled");
                }
                $("#cboAfectacionIgv").change();
            }
        });

        $("#grabar").on("click", function () {
            GrabarNotaDebito();
        });

        $("#cboTipoDocumento").on("change", function () {
            $("#txtSerie").val("");
            $("#txtNro").val("");
            $("#txtFechaEmisionRef").val("");
            $("#cboMoneda").select2("val", "");
        });

        $("#btnBuscarDocumento").on("click", function () {
            if (vErrors(['cboEmpresa', 'cboEstablecimiento', 'txtrazsocial', 'cboTipoDocumento'])) {
                if ($("#hfPIDM").val() != "") {
                    mostrarModalBuscarDocumento();
                }
                else {
                    alertCustom("Seleccione un cliente válido");
                }
            }
        });

        $("#cboAfectacionIgv").on("change", function () {
            if ($("#cboEstablecimiento :selected").attr("data-exonerado") == "SI") {
                $("#lblIndIgv small").html("*Montos para detalle <strong>NO</strong> incluyen IGV. Establecimiento Exonerado")

            } else {
                if ($(this).val() == "GRA") {
                    $("#lblIndIgv small").html("*Montos para detalle incluyen IGV")
                } else { // INA - EXO
                    $("#lblIndIgv small").html("*Montos para detalle <strong>NO</strong> incluyen IGV")
                }
            }
        });
        $("#btnEFac").click(function () {
            GenerarDocFacturacion();
        });
        //CALCULO PRECIO - SUBTOTAL
        $("#txtCantidad")
            .on("keyup", function (e) {
                var key = e.keyCode ? e.keyCode : e.which;
                if ($(this).val() != "" && $("#txtPrecioUnitario").val() != "" && $("#txtSubtotalItem").val() != "") {
                    iSubt = iPrec * parseFloat($(this).val());
                    $("#txtPrecioUnitario").val(iPrec.toFixed(2));
                    $("#txtSubtotalItem").val(iSubt.toFixed(2));

                } else if ($(this).val() != "" && $("#txtPrecioUnitario").val() != "") {
                    iSubt = parseFloat($("#txtPrecioUnitario").val()) * parseFloat($("#txtCantidad").val());
                    $("#txtSubtotalItem").val(iSubt.toFixed(2));

                } else if ($(this).val() != "" && $("#txtSubtotalItem").val() != "") {
                    iPrec = parseFloat($("#txtSubtotalItem").val()) / parseFloat($("#txtCantidad").val());
                    $("#txtPrecioUnitario").val(iPrec.toFixed(2));
                }

                if (key == 13 && $(this).val() != '') {
                    $('#txtPrecioUnitario').focus();
                }
            });

        $("#txtPrecioUnitario")
            .on("keyup", function (e) {
                var key = e.keyCode ? e.keyCode : e.which;
                if ($(this).val() != "" && $("#txtCantidad").val() != "") {
                    iPrec = parseFloat($(this).val());
                    iSubt = parseFloat($(this).val()) * parseFloat($("#txtCantidad").val());
                    $("#txtSubtotalItem").val(iSubt.toFixed(2));
                }
                if (key == 13 && $(this).val() != '') {
                    $('#txtSubtotalItem').focus();
                }
            });

        $("#txtSubtotalItem")
            .on("keyup", function (e) {
                var key = e.keyCode ? e.keyCode : e.which;
                if ($(this).val() != "" && $("#txtCantidad").val() != "") {
                    iSubt = parseFloat($(this).val());
                    iPrec = parseFloat($(this).val()) / parseFloat($("#txtCantidad").val());
                    $("#txtPrecioUnitario").val(iPrec.toFixed(2));
                }
                if (key === 13 && $(this).val() != '') {
                    $('#btnAgregarDetalle').focus();
                }
            });



        $("#cboMoneda").on("change", function () {
            $(".lblMoneda").html("(" + $('#cboMoneda :selected').attr("simbolo") + ")");
        });
      

   
    };

    var GenerarDocFacturacion = function () {
        Bloquear('ventana');
        let sCodEmpresa = $("#ctl00_hddctlg").val();
        let sCodND = $("#hfCodigoNota").val();
        let sRuta = "vistas/EF/ajax/EFACTEL.ashx?sOpcion=ND&sCodEmpresa=" + sCodEmpresa + "&sCodND=" + sCodND

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
                Desbloquear('ventana');
                exito();
            },
            error: function (msg) {
                alert(msg);
            }
        });

    };

    var fillCboTipoDocumento = function () {
        var select = $('#cboTipoDocumento').select2('destroy');
        $.ajax({
            type: "post",
            url: 'vistas/no/ajax/nomdocc.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=NRMX&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" >' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                }
                $(select).select2('val', '');
            },
            error: function (msg) {
                alertCustom("Tipos de Documentos no se listaron correctamente.");
            }
        });
        $(select).select2();
    }

   
    var mostrarModalBuscarDocumento = function () {
        Bloquear("ventana")
        var html =
            '<div id="_buscarDocumento" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="false" style="display: none;">' +
            '<div class="modal-header" style="padding: 1px 15px; background: #4b8df8; color:#ffffff;">' +
            ' <button type="button"  class="btn red" data-dismiss="modal" style="margin-top: 6px; float: right;" aria-hidden="true">' +
            '  <i class="icon-remove"></i>' +
            ' </button>' +
            '        <h4 id="myModalLabel">BUSCAR DOCUMENTO</h4>' +
            '    </div>' +
            '    <div class="modal-body" id="ventanaBuscarDocumento">' +
            '       <div class="row-fluid" >' +
            '         <div class="span12" id="divTblDocumentos" >' +
            '            <table id="tblBuscarDocumento" class="display DTTT_selectable" style="width: 100%;">' +
            '                 <thead>' +
            '                    <tr>' +
            '                         <th>CODIGO</th>' +
            '                         <th>SERIE</th>' +
            '                         <th>NRO</th>' +
            '                         <th>EMISION</th>' +
            '                     </tr>' +
            '                 </thead>' +
            '                 <tbody>' +
            '                    <tr>' +
            '                       <td></td>' +
            '                       <td></td>' +
            '                       <td></td>' +
            '                       <td></td>' +
            '                   </tr>' +
            '               </tbody>' +
            '            </table>    ' +
            '           </div>' +
            '       </div>' +
            '       <div class="row-fluid" >' +
            '              <div class="form-actions">' +
            '                     <p>*Haga clic en una fila para seleccionar.</p>' +
            '              </div>' +
            '       </div>' +
            '    </div>' +
            '</div>'
            ;
        if ($("#_buscarDocumento").html() == undefined) {
            $("body").append(html);
        }
        fillTblDocumentosRef();
    }

    var fillTblDocumentosRef = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/CAMNOPR.ashx?OPCION=5" +
            "&CTLG_CODE=" + $("#cboEmpresa").val() +
            "&SCSL_CODE=" + $("#cboEstablecimiento").val() +
            "&USUA_ID=" + $("#hfPIDM").val() +
            "&TIPO_DOC_CODE=" + $("#cboTipoDocumento").val() +
            "&p_FECHA_EMISION=" + $("#txtFechaEmision").val(),
            async: true,
            success: function (datos) {
                Desbloquear("ventana")
                if (datos != null) {
                    $('#divTblDocumentos').html(datos)
                }
                $("#tblBuscarDocumento").DataTable({
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });
                var oTable = $('#tblBuscarDocumento').dataTable();
                oTable.fnSort([[0, "desc"]]);
                $("#_buscarDocumento").modal('show');
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("Documentos de referencia no se listaron correctamente");
                $("#tblBuscarDocumento").DataTable({
                    "oLanguage": {
                        "sEmptyTable": "No hay datos disponibles en la tabla.",
                        "sZeroRecords": "No hay datos disponibles en la tabla."
                    }
                });
            }
        });

    }

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");
        if (cod != null) {
            $("#hfCodigoNota").val(cod);

            var data = new FormData();
            data.append('p_CODE', cod);
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/NVMNDAC.ashx?OPCION=4",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true
            })
                .success(function (datos) {
                    Desbloquear("ventana");

                    if (datos != null && datos.length > 0) {
                        // $('#btnEFac').removeClass('hidden');
                        $("#hfPIDM").val(datos[0].PIDM);
                        igv = parseFloat(datos[0].PCTJ_IGV) / 100;
                        //F1
                        $("#cboEmpresa").select2("val", datos[0].CTLG_CODE).change();
                        $("#cboEstablecimiento").select2("val", datos[0].SCSL_CODE).change();
                        //F2
                        $("#txtrazsocial").val(datos[0].RAZON_SOCIAL);
                        $("#txtrazsocial").keyup().siblings("ul").children("li").click();
                        $("#txtSerieND").val(datos[0].SERIE);
                        $("#txtNroND").val(datos[0].NUMERO);
                        //F3
                        $("#txtFechaEmision").val(datos[0].EMISION.display)
                        $("#txtFechaTransaccion").val(datos[0].TRANSACCION.display)
                        //F4
                        $("#cboMotivo").select2("val", datos[0].MOTIVO_CODE);
                        $("#txtMotivoAdicional").val(datos[0].MOTIVO_ADICIONAL);
                        //F5
                        $("#cboTipoDocumento").select2("val", datos[0].DCTO_REF_TIPO_CODE);
                        $("#txtSerie").val(datos[0].DCTO_REF_SERIE);
                        $("#txtNro").val(datos[0].DCTO_REF_NRO);
                        //F6
                        $("#txtFechaEmisionRef").val(datos[0].EMISION_REF)
                        $("#cboMoneda").select2("val", datos[0].MONE_CODE)

                        if (datos[0].MES_PERIODO !== 0) {
                            var oMes = Devuelve_Desc_MES(datos[0].MES_PERIODO);
                            $("#cbo_periodo").empty();
                            var option = "<option value=" + datos[0].MES_PERIODO + "-" + datos[0].ANIO_PERIODO + ">" + oMes + " - " + datos[0].ANIO_PERIODO + "</option>";
                            $("#cbo_periodo").append(option);
                            $("#cbo_periodo").select2("val", datos[0].ANIO_PERIODO + "-" + datos[0].MES_PERIODO);
                        }
             
                        //LLENAR DETALLES
                        Bloquear("divTblDatos");
                        var data2 = new FormData();
                        data2.append('p_CODE', cod);
                        var jqxhr = $.ajax({
                            type: "POST",
                            url: "vistas/nv/ajax/NVMNDAC.ashx?OPCION=5",
                            contentType: false,
                            data: data2,
                            processData: false,
                            async: true
                        })
                            .success(function (datos) {
                                Desbloquear("divTblDatos");
                                if (datos != null) {
                                    detalles = datos;
                                    ListarTablaDetalles();
                                    $(".btnEliminarDetalle").remove();
                                }
                            })
                            .error(function () {
                                Desbloquear("divTblDatos");
                                alertCustom("Detalles no se listaron correctamente")
                            });

                        //LLENAR MONTOS
                        $("#txtGravada").val(parseFloat(datos[0].IMPORTE_GRA).toFixed(2));
                        $("#txtInafecta").val(parseFloat(datos[0].IMPORTE_INA).toFixed(2));
                        $("#txtExonerada").val(parseFloat(datos[0].IMPORTE_EXO).toFixed(2));
                        $("#txtMontoIgv").val(parseFloat(datos[0].IGV).toFixed(2));
                        $("#txtImporteTotal").val(parseFloat(datos[0].IMPORTE_TOTAL).toFixed(2));
                        //---------

                        $("#cboEmpresa").attr("disabled", "disabled");
                        $("#cboEstablecimiento").attr("disabled", "disabled");
                        $("#txtMotivoAdicional").attr("disabled", "disabled");
                        $("#cboMotivo").attr("disabled", "disabled");
                        $("#txtSerieND").attr("disabled", "disabled");
                        $("#txtNroND").attr("disabled", "disabled");
                        $("#txtFechaEmision").attr("disabled", "disabled");
                        $("#txtrazsocial").attr("disabled", "disabled");
                        $("#cboTipoDocumento").attr("disabled", "disabled");
                        //BloquearCampos
                        $("#btnBuscarDocumento").attr("style", "display:none");
                        $("#divAgregarDetalles").attr("style", "display:none");
                        $("#grabar").html("<i class='icon-plus'></i> Nuevo");
                        $("#grabar").attr("href", "?f=NVMNDAC");
                    }
                })
                .error(function () {
                    Desbloquear("ventana");
                    noexito();
                });

        } else {
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }

    };


    var Devuelve_Desc_MES = function (oMes) {

        var array = [];
        array[1] = "ENERO"
        array[2] = "FEBRERO"
        array[3] = "MARZO"
        array[4] = "ABRIL"
        array[5] = "MAYO"
        array[6] = "JUNIO"
        array[7] = "JULIO"
        array[8] = "AGOSTO"
        array[9] = "SEPTIEMBRE"
        array[10] = "OCTUBRE"
        array[11] = "NOVIEMBRE"
        array[12] = "DICIEMBRE"

        return array[oMes].toString();
    }

    var cargarParametrosSistema = function() {
        //OBTENER IMPUESTO GENERAL A LAS VENTAS
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=0021",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null) {
                    if (!isNaN(parseFloat(datos[0].VALOR))) {
                        $('#hfIMPUESTO').val(parseFloat(datos[0].VALOR) * 100);
                        igv = parseFloat(datos[0].VALOR)
                        igv > 1 ? igv = igv / 100 : igv = igv; // igv en decimal

                    } else {
                        infoCustom2("El parámetro de Impuesto(0021) no es válido. Se considerará IGV 18%")
                        $('#hfIMPUESTO').val("18");
                        igv = 0.18;
                    }
                }
                else { alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!"); }
            },
            error: function (msg) {
                alertCustom("No se recuperó el Impuesto General a la Ventas correctamente!");
            }
        });
    }

    var fillCboMotivo= function () {
        $('#cboMotivo').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmndac.ashx?OPCION=MND&p_ESTADO=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMotivo').empty().append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMotivo').append('<option value="' + datos[i].CODIGO +  '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboMotivo').val("");
            },
            error: function (msg) {
                alertCustom("Los Motivos no se listaron correctamente.");
            }
        });
        $('#cboMotivo').select2();
    }

    var fillCbo_Periodo = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {
                    var valor = "";
                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                        if (i == datos.length - 1) {
                            valor = datos[i].COD;
                        }
                    }
                    var cod = ObtenerQueryString("codigo");
                    if (cod == undefined) {
                        $('#cbo_periodo').select2("val", valor);
                        $("#hfvalor_periodo_carga").val(valor);
                    } else {
                        $('#cbo_periodo').select2("val", "");
                    }
                } else {
                    alertCustom("Error al cargar periodo.")
                }

            },
            error: function (msg) {
                alertCustom("Error al cargar periodo.");
            }
        });
    }

    return {
        init: function () {
            cargarParametrosSistema();

            plugins();
            eventoControles();

            fillCboEmpresa();
            fillCboMoneda();
            fillcboUniMedida();
            fillCboMotivo();
            fillCbo_Periodo();

            //Requieren de Empresa
            filltxtrazsocial('#txtrazsocial', '');

            cargaInicial();
        }
    };
}();


let setSeleccionDocumento = function (codigo, secuencia, serie, nro, tipo, importe, moneda, simboloMoneda, scslExonerada, emision) {
    $("#tblDetalles").dataTable().fnDestroy();

    dctoSeleccionado.CODIGO = codigo;
    dctoSeleccionado.SERIE = serie;
    dctoSeleccionado.NRO = nro;
    dctoSeleccionado.MONEDA_CODE = moneda;
    dctoSeleccionado.SIMBOLO_MONEDA = simboloMoneda;
    dctoSeleccionado.SCSL_EXONERADA_IND = scslExonerada;

    dctoSeleccionado.TIPO_DCTO = $("#cboTipoDocumento option[value='" + tipo + "']").html();
    dctoSeleccionado.TIPO_DCTO_CODE = tipo;
    dctoSeleccionado.FECHA_EMISION = emision;

    //LLENAR DATOS DOCUMENTO SELECCIONADO  
    if (codigo != "" & serie != "") {
        $("#txtNro").val(dctoSeleccionado.NRO);
        $("#txtSerie").val(dctoSeleccionado.SERIE);
        $("#cboMoneda").select2("val", dctoSeleccionado.MONEDA_CODE).change();
        $("#txtFechaEmisionRef").val(dctoSeleccionado.FECHA_EMISION);

        $("#txtFechaEmision").datepicker("setStartDate", dctoSeleccionado.FECHA_EMISION);

        if ($("#txtFechaEmision").val() != "") {
            if ((DateDiff(new Date(ConvertirDate($("#txtFechaEmision").val())), new Date(ConvertirDate(dctoSeleccionado.FECHA_EMISION)))) < 0) {
                infoCustom2("Fecha de nota de débito debe ser mayor a la del documento de referencia");
                $("#txtFechaEmision").val("").focus();
            }
        }

        BloquearxSeleccion();
    } else {
        $("#txtNro").val("");
        $("#txtSerie").val("");
        $("#cboMoneda").select2("val", "");
    }
    $(".doc_fila").css("background-color", "#f9f9f9 !important");
    $("#doc_fila_" + codigo + "_" + serie + "").css("background-color", "#cbcbcb !important");
    $("#_buscarDocumento").modal('hide');

}

let BloquearxSeleccion = function() {
    $("#cboEmpresa,#cboEstablecimiento").attr("disabled", "disabled");
    $("#txtrazsocial").attr("disabled", "disabled");
}

let AgregarDetalle = function() {
    if ($("#cboMoneda").val() != "") {
        var continuar = false;
        if (vErrors(['txtDesc', 'txtCantidad', 'cboAfectacionIgv', 'txtPrecioUnitario', 'txtSubtotalItem'])) {
            iDesc = $.trim($("#txtDesc").val());
            iCant = $("#txtCantidad").val();
            iUnmeCode = $("#cboUnidadMedida").val();
            iUnme = $("#cboUnidadMedida :selected").html();
            iAfec = $("#cboAfectacionIgv").val();

            if (parseFloat(iCant) > 0) {
                if (parseFloat(iPrec) > 0) {
                    if (parseFloat(iSubt) > 0) {
                        continuar = true;
                    } else {
                        alertCustom("Subtotal no puede ser menor o igual a 0");
                    }
                } else {
                    alertCustom("Precio Unitario no puede ser menor o igual a 0");
                }
            } else {
                alertCustom("Cantidad no puede ser menor o igual a 0");
            }

            if (continuar) {
                //IGV
                igv > 1 ? igv = igv / 100 : igv = igv;
                //DESDE HTML
                item.DESC = iDesc;
                item.CANT = iCant;
                item.UNME = iUnme;
                item.UNME_CODE = iUnmeCode;
                item.AFEC = iAfec;

                //CON IGV
                item.PREC = iPrec;
                item.SUBT = iSubt;

                //CALCULADOS
                item.ITEM = detalles.length + 1;
                item.PREC_VENTA_UNITARIO = parseFloat(item.PREC); // Precio con igv

                if (iAfec == "GRA") {
                    item.PREC_SIN_IGV = iPrec / (1 + igv);
                    item.SUBT_SIN_IGV = iSubt / (1 + igv);
                    item.IGV = parseFloat(item.SUBT_SIN_IGV) * igv;

                } else {
                    item.IGV = 0.00;
                    item.PREC_SIN_IGV = iPrec;
                    item.SUBT_SIN_IGV = iSubt;
                }

                var itemAux = JSON.parse(JSON.stringify(item));
                detalles.push(itemAux);
                ListarTablaDetalles();
                LimpiarCamposDetalle();
            }
        }

    } else {
        alertCustom("Seleccione un documento de referencia.");
        $("#btnBuscarDocumento").focus();
    }

}

let Delete = function (item) {
    var detallesNuevo = [];
    for (var i = 0; i < detalles.length; i++) {
        if (detalles[i].ITEM == item) {
            detalles.splice(i, 1);
        }
    }
    for (var i = 0; i < detalles.length; i++) {
        detalles[i].ITEM = i + 1;
        detallesNuevo.push(detalles[i]);
    }
    detalles.splice(0, detalles.length);
    detalles = detallesNuevo;
    ListarTablaDetalles();
}

let ListarTablaDetalles = function () {
    if ($("#cboMoneda").val() != "") {
        $(".lblMoneda").html("(" + $('#cboMoneda :selected').attr("simbolo") + ")");
    }
    $(".lblPctjIgv").html("(" + (igv * 100).toFixed(2) + "%)");

    $("#tblDetalles").dataTable().fnDestroy();
    $("#tblDetalles tbody tr").remove(tr);
    opIna = 0; opGra = 0; opExo = 0; opIgv = 0;

    for (var i = 0; i < detalles.length; i++) {
        var tr = "";
        tr += "<tr>"
        tr += "<td class='center'>" + detalles[i].ITEM + "</td>"
        tr += "<td class='center'>" + detalles[i].DESC + "</td>"
        tr += "<td class='center'>" + detalles[i].CANT + "</td>"
        tr += "<td class='center'>" + ((detalles[i].UNME == "NINGUNA") ? "" : detalles[i].UNME) + "</td>"
        tr += "<td class='center'>" + parseFloat(detalles[i].PREC_SIN_IGV).toFixed(2) + "</td>"
        tr += "<td class='center'>" + parseFloat(detalles[i].PREC_VENTA_UNITARIO).toFixed(2) + "</td>"
        tr += "<td class='center'>" + ((detalles[i].AFEC == "GRA") ? "GRAVADO" : ((detalles[i].AFEC == "EXO") ? "EXONERADO" : "INAFECTO")) + "</td>"
        tr += "<td class='center'>" + parseFloat(detalles[i].IGV).toFixed(2) + "</td>"
        tr += "<td class='center'>" + parseFloat(detalles[i].SUBT_SIN_IGV).toFixed(2) + "</td>"
        tr += '<td align="center"><a href="javascript:Delete(\'' + detalles[i].ITEM + '\')" class="btn btnEliminarDetalle red"><i class=icon-trash></i></a></td>'
        tr += "</tr>"
        $("#tblDetalles tbody").append(tr);

        if (ObtenerQueryString("codigo") == null) {
            if (detalles[i].AFEC == "GRA") {
                opGra += detalles[i].SUBT_SIN_IGV;
            } else if (detalles[i].AFEC == "INA") {
                opIna += detalles[i].SUBT_SIN_IGV;
            } else { // EXO
                opExo += detalles[i].SUBT_SIN_IGV;
            }
            opIgv += detalles[i].IGV;
        }
    }

    if (ObtenerQueryString("codigo") == null) {

        importeTotal = (opGra + opIgv) + opIna + opExo;
        $("#txtGravada").val(opGra.toFixed(2));
        $("#txtInafecta").val(opIna.toFixed(2));
        $("#txtExonerada").val(opExo.toFixed(2));
        $("#txtMontoIgv").val(opIgv.toFixed(2));
        $("#txtImporteTotal").val(importeTotal.toFixed(2));

        notaDebito.IMPORTE_INA = opIna;
        notaDebito.IMPORTE_EXO = opExo;
        notaDebito.IMPORTE_GRA = opGra;
        notaDebito.IGV = opIgv;
        notaDebito.PCTJ_IGV = (igv * 100);
        notaDebito.IMPORTE_TOTAL = importeTotal;
    }


    $("#tblDetalles").dataTable({
        "aLengthMenu": 10,
        "iDisplayLength": 10,
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla.",
            "sZeroRecords": "No hay datos disponibles en la tabla."
        }
    });

    $('#tblDetalles_wrapper :first').remove();

    if (detalles.length == 0) {
    }
}

let LimpiarCamposDetalle = function() {
    $("#txtCantidad").val("1");
    $("#txtPrecioUnitario").val("");
    $("#txtSubtotalItem").val("");
    $("#cboUnidadMedida").select2("val", codUnidades);
    $("#cboAfectacionIgv").val();
    $("#txtDesc").val("").focus();
}



let GrabarNotaDebito = function() {
    var continuar = false;
    if (vErrors(['cboEmpresa', 'cboEstablecimiento', 'txtrazsocial', 'txtSerieND', 'txtNroND', 'txtFechaEmision', 'cboMotivo', 'txtSerie', 'txtNro', 'cboMoneda', 'txtFechaEmisionRef', 'cbo_periodo'])) {
        if ($("#hfPIDM").val() != "") {
            if (detalles.length > 0) {
                continuar = true;

            } else {
                alertCustom("Ingrese al menos un detalle")
            }
        }
        else {
            alertCustom("Seleccione un cliente válido");
        }
    }


    if (!verificaFechaPeriodo()) {
        infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
        continuar = false;
    };

    if (continuar) {

        //---------------------OBTENER DETALLES-------------
        strDetalles = "";
        for (var i = 0; i < detalles.length; i++) {
            strDetalles += detalles[i].ITEM + ";"; //ITEM
            strDetalles += detalles[i].DESC + ";"; //DESCRIPCION DE ITEM
            strDetalles += detalles[i].CANT + ";"; //CANTIDAD
            strDetalles += detalles[i].UNME_CODE + ";"; //UNIDAD DE MEDIDA
            strDetalles += detalles[i].PREC_SIN_IGV + ";"; //PRECIO UNITARIO SIN IGV/ VALOR UNITARIO
            strDetalles += detalles[i].PREC_VENTA_UNITARIO + ";"; // PRECIO VENTA UNITARIO
            strDetalles += detalles[i].AFEC + ";";
            strDetalles += detalles[i].IGV + ";"; //MONTO IGV
            strDetalles += detalles[i].SUBT_SIN_IGV + ";"; //VALOR VENTA / SUBTOTAL SIN IGV
            strDetalles += "" + ";"; //PROD_CODE
            strDetalles += "" + "|"; //MCDR_CODE
        }
        //-------------------FIN OBTENER DETALLES-------------

        var data = new FormData();

        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
        data.append('p_SCSL_EXONERADA_IND', ($("#cboEstablecimiento :selected").attr("data-exonerado") == "SI") ? 'S' : 'N');
        data.append('p_PERS_PIDM', $("#hfPIDM").val());
        data.append('p_TIPO_IND', "C"); //C = Nota de Débito Proveedor
        data.append('USUA_ID', $("#ctl00_txtus").val());
        data.append('p_SERIE', $('#txtSerieND').val());
        data.append('p_NUMERO', $("#txtNroND").val());
        data.append('p_CODIGO_CORRELATIVO', $("#hfCodigoCorrelativo").val());

        data.append('p_FECHA_EMISION', $("#txtFechaEmision").val());
        data.append('p_MOTIVO_CODE', $("#cboMotivo").val());
        data.append('p_MOTIVO_DESC', $("#cboMotivo :selected").html());
        data.append('p_MOTIVO_ADICIONAL', $("#txtMotivoAdicional").val());

        data.append('p_IMPORTE_EXO', notaDebito.IMPORTE_EXO.toFixed(8));
        data.append('p_IMPORTE_INA', notaDebito.IMPORTE_INA.toFixed(8));
        data.append('p_IMPORTE_GRA', notaDebito.IMPORTE_GRA.toFixed(8));
        data.append('p_IGV', notaDebito.IGV.toFixed(8));
        data.append('p_IMPORTE_TOTAL', notaDebito.IMPORTE_TOTAL.toFixed(8));
        data.append('p_PCTJ_IGV', notaDebito.PCTJ_IGV);

        data.append('p_MONE_CODE', dctoSeleccionado.MONEDA_CODE);
        data.append('p_DCTO_REF_CODE', dctoSeleccionado.CODIGO);
        data.append('p_DCTO_REF_SERIE', dctoSeleccionado.SERIE);
        data.append('p_DCTO_REF_NRO', dctoSeleccionado.NRO);
        data.append('p_DCTO_REF_TIPO_CODE', dctoSeleccionado.TIPO_DCTO_CODE);
        data.append('p_DETALLES', strDetalles);

        data.append('p_MES', $("#cbo_periodo").val().split("-")[0]);
        data.append('p_ANIO', $("#cbo_periodo").val().split("-")[1]);


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMNDAC.ashx?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos.length > 0) {
                    console.log(datos);
                    if (datos[0].RESPUESTA == "OK") {
                        exito();
                        $("#hfCodigoNota").val(datos[0].CODIGO);
                        //BloquearCampos
                        $("#btnBuscarDocumento").attr("style", "display:none");
                        $("#divAgregarDetalles").attr("style", "display:none");
                        $("#grabar").off('click');
                        $("#grabar").html("<i class='icon-plus'></i> Nuevo");
                        $("#grabar").attr("href", "?f=CAMNODP");
                     

                        $(".btnEliminarDetalle").remove();
                        $("#cboSerieND,#txtNroND").attr("disabled", "disabled");
                        $("#txtMotivoAdicional").attr("disabled", "disabled");
                        $("#cboMotivo").attr("disabled", "disabled");
                        $("#cboSerieND").attr("disabled", "disabled");
                        $("#txtNroND").attr("disabled", "disabled");
                        $("#cboTipoDocumento").val(dctoSeleccionado.TIPO_DCTO_CODE).attr("disabled", "disabled");
                        $("#txtFechaEmision").attr("disabled", "disabled");

                        //$("#btnEFac").removeClass("hidden");
                        //TO DO
                        //$("#btnImprimirDcto").removeAttr("style");
                    } else if (datos[0].CODIGO == "LIMITE") {
                        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Se ha excedido el límite de documentos autorizados!");
                    }
                    else if (datos[0].CODIGO == "ERROR") {
                        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/>");
                    }
                    else {
                        alertCustom(datos[0].CODIGO);//Mensaje de error de bd
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
}

let verificaFechaPeriodo = function () {
    //VALIDAR FECHA Y PERIODO
    var continuar = false;
    var mesEmision = $("#txtFechaEmision").val().split("/")[1];
    var anioEmision = $("#txtFechaEmision").val().split("/")[2];
    var mesPeriodo = $("#cbo_periodo").val().split("-")[0];
    var anioPeriodo = $("#cbo_periodo").val().split("-")[1];
    if (parseInt(anioEmision) == parseInt(anioPeriodo)) {
        if (parseInt(mesEmision) <= parseInt(mesPeriodo)) {
            continuar = true;
        }
    } else if (parseInt(anioEmision) < parseInt(anioPeriodo)) {
        continuar = true;
    }

    return continuar;
}





var CALNODP = function () {

    var plugins = function () {
        $("#cboEmpresa,#cboEstablecimiento").select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
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
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
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
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
            },
            error: function (msg) {
                alertCustom("Establecimientos no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
            fillCboEstablecimiento($("#cboEmpresa").val());
        });

        $("#cboEstablecimiento").on("change", function () {
            ListaNotaDebito();
        });

        $("#buscar").on("click", function () {
            ListaNotaDebito();
        });
    }

    var ListaNotaDebito = function () {

        if (vErrors(['cboEmpresa', 'cboEstablecimiento'])) {
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboEstablecimiento").val());
            data.append('p_TIPO_IND', 'C');

            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/NVMNDAC.ashx?OPCION=4",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true
            })
                .success(function (datos) {
                    Desbloquear("ventana"); oTable.fnClearTable();
                    if (datos != null && datos.length > 0) {
                        oTable.fnAddData(datos);
                        oTable.fnAdjustColumnSizing();
                    }

                })
                .error(function () {
                    Desbloquear("ventana");
                    noexito();
                });
        }
    }

    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "EMISION.display", sort: parseInt("EMISION.order") },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "RAZON_SOCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "MOTIVO_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(rowData.MOTIVO_DESC + ": " + rowData.MOTIVO_ADICIONAL)
                    }
                },
                {
                    data: "DOCUMENTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'text-align:center');
                    }
                },
                {
                    data: "IMPORTE_TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'text-align:right');
                        $(td).html(parseFloat(cellData).toFixed(2));
                    }
                },
                {
                    data: "DOCUMENTO_REF",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "TRANSACCION.display", sort: "TRANSACCION.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
            ]
        }

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        oTable.fnSetColumnVis(0, false, true);

        $('#tblDatos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var code = row.CODIGO;
                window.location.href = '?f=CAMNODP&codigo=' + code;
            }
        });

    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            IniciaTabla();
            ListaNotaDebito();
        }
    };
}();
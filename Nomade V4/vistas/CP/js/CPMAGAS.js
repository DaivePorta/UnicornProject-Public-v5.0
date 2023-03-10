var tipo_op;
var obj_actual;
var btn_actual;
var arr = [];
var posicion;
var detallesGasto = [];
var objProd = {};
var dTotal = 0;
var objAux;
var SIMB_MONEDA = "";
var vAsientoContable = null;
const sCodModulo = "0003";
var prmtACON = "NO";

var CPLAGAS = function () {
    var oCentroCostoCab = [];
    var aoNiveles = [];

    var fnCargarParametros = function (psPlanCostos) {
        aoNiveles = fnCargarNivelesCentroCostos(psPlanCostos);
    };

    var fnCargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        return vNiveles;
    };

    var plugins = function () {
        $("#txt_fec_vencimiento").datepicker("setDate", "now");
        $("#txt_fec_actual").datepicker("setDate", "now");
        $("#txt_fec_ini_emi").datepicker();
        $("#txt_fec_fin_emi").datepicker();
        $('#txt_serie').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 4, "greedy": false }); });
        $('#txt_dcto_ref').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 20, "greedy": false }); });
        $("#slcEmpresa").select2();
        $("#slcSucursal").select2();
        $("#cbo_documento").select2();
        $("#cbo_documento_int").select2();
        $("#cbo_periodo").select2();
        $("#cbo_tipo_aprobacion").select2();
        $("#cboTipoBien,#cbx_destino").select2();
        $("#cbx_opcion").select2();
    };

    var fillBandeja = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            scrollCollapse: true,
            scrollX: true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CODIGO_GAST_ORG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', '')
                    }
                },
                {
                    data: "DESC_DCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "DESC_MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "MONTO_APROBADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                {
                    data: "NUMERO_CONCAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', '')
                    }
                },

                {
                    data: "FECHA_APROBACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_PAGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FEC_EMISION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FEC_REG",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "RAZON_SOCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', '')
                    }
                },
                {
                    data: "SOLICITA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        oTableG = iniciaTabla('tbl_aprob_gastos', parms);
        $('#tbl_aprob_gastos').removeAttr('style');
        $('#tbl_aprob_gastos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableG.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableG.fnGetPosition(this);
                var row = oTableG.fnGetData(pos);
                var CODIGO = row.CODIGO_GAST_ORG; //DPORTA
                window.location.href = '?f=CPMAGAS&codigo=' + CODIGO;
            }
        });
    };

    var fillBandejaSinAprobar = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            scrollCollapse: true,
            scrollX: true,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "GASTO_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "BENEFICIARIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left');
                    }
                }, {
                    data: "MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    type: "formatoMiles"
                },
                {
                    data: "FECHA_EMISION",
                    align: "center",
                    type: "fecha"
                },
                {
                    data: "FECHA_REGISTRO",
                    align: "center",
                    type: "fecha"
                },
                {
                    data: "DCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-aling', 'center');
                    }
                },
                {
                    data: "SERIE_NRO_DOC",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', '');
                    }
                },
                {
                    data: "USU_ID_SOLICITA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', '');
                    }
                },
                {
                    data: null,
                    defaultContent: '  <button type="button" style="height:30px;padding: 4px 10px;!important" class="btn green btnpagar"><i class="icon-ok"></i></button>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '  <button type="button" style="height:30px;padding: 4px 10px;!important" class="btn red btnrechazar"><i class="icon-remove-sign"></i></button>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        oTableGST = iniciaTabla('tbl_gastos', parms);

        $('#tbl_gastos').on('dblclick', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $("#tbl_gastos tr.selected").removeClass('selected');
                $(this).addClass('selected');
                var row = $("#tbl_gastos").DataTable().row(this).data();
                var code = row.CODIGO;
                window.open("?f=cpmagas&ap=no&codigo=" + code, '_blank');
            }
        });
    };

    var fillCboTipoBien = function (code) {
        Bloquear($($('#cboTipoBien').parents("div")[0]));
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMCLBI.ASHX?OPCION=4"
            + "&p_CODE="
            + "&p_DESCRIPCION="
            + "&p_DESC_CORTA="
            + "&p_ESTADO_IND=A",
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                $('#cboTipoBien').html('<option></option>');
                if (datos != null && datos.length > 0) {
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboTipoBien').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                        if (code == undefined) {
                            $('#cboTipoBien').select2("val", "0001");
                        } else {
                            if (code != "") {
                                $('#cboTipoBien').select2("val", code);
                            }
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom("Tipo de bienes no se listaron correctamente.");
            },
            complete: function (msg) {
                Desbloquear($($('#cboTipoBien').parents("div")[0]));
            }
        });
    };

    objData = null;
    
    function CrearPago(data) {
        objData = data;
        $("#PgDvDesc").html(CapFirsLetter(data.DESCRIPCION))
        $("#txtMontoAPagarMOBA")
            .val(formatoMiles(data.MONTO_MONE_BASE))
            .attr("tipo", "0002")
            .addClass("monto_sele")
            .attr("monto", data.MONTO_MONE_BASE);
        $("#txtMontoAPagarMOAL")
            .val(formatoMiles(data.MONTO_MONE_ALTER))
            .attr("tipo", "0003")
            .addClass("monto_sele")
            .attr("monto", data.MONTO_MONE_ALTER);
        $("#modalPagar")
            .modal("show")
            .draggable({ handle: "modal-header" })
            .modal({ backdrop: "static", keyboard: false });

        $("#modalPagar select").select2("val", "");

        persona_selec_nombre = data.PERSONA.NOMBRE;
        limpiaCampos();
        confIniciales(data.ES_MONEDA_BASE);
    };

    var funcionalidadTabla = function () {
        $('#tbl_gastos tbody').on('click', '.btnpagar', function () {
            var pos = oTableGST.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableGST.fnGetData(pos);

            console.log(row);

            //console.log(row);

            posicion = pos;
            btn_actual = $(this);
            tipo_op = 'AP';
            obj_actual = row;

            $("#hfCodigo").val('');
            $("#txt_glosa").val('');
            $("#txt_serie_int").val('');
            $("#txt_dcto_ref_int").val('');
            $('#uniform-chk_sin_dcto span').removeClass();
            $('#chk_sin_dcto').attr('checked', false);
            $('#uniform-chk_compras span').removeClass();
            $('#chk_compras').attr('checked', false);

            $("#titulo_gasto").html("<i class='icon-warning-sign'></i>&nbsp APROBAR " + row.GASTO_DESC);
            $("#txt_glosa").val(row.GASTO_DESC);
            $("#txt_monto").html(formatoMiles(row.MONTO) + "&nbsp;(" + row.MONEDA + ")");
            $("#txt_importePagar").html(formatoMiles(row.IMPORTE_PAGAR) + "&nbsp;(" + row.MONEDA + ")");
            $("#lbl_proveedor").html(row.BENEFICIARIO)

            var permiso_ind = $("#hf_permiso").val();

            if (permiso_ind == "" || permiso_ind == "0") {
                $(".denegar").show();
                $(".permitir").hide();
            } else {
                $(".denegar").hide();
                $(".permitir").show();

                $("#cbo_documento").val(row.DCTO_CODE).change();
                $("#txt_serie").val(row.SERIE_DOC);
                $("#txt_dcto_ref").val(row.NRO_DOC);
                if (row.DCTO_CODE == "") {
                    $('#chk_sin_dcto').click().click()
                    $('#uniform-chk_sin_dcto span').removeClass().addClass("checked");
                    $('#chk_sin_dcto').attr('checked', true);
                }

                if (row.IND_COMPRAS == 'S') {
                    $('#uniform-chk_compras span').removeClass().addClass("checked");
                    $('#chk_compras').attr('checked', true);
                    $("#div_per_tri").attr("style", "display:block")
                    $(".divDestinoTipo").show();
                } else {
                    $('#uniform-chk_compras span').removeClass();
                    $('#chk_compras').attr('checked', false);
                    $("#div_per_tri").attr("style", "display:none")
                    $(".divDestinoTipo").hide();
                }


                if (row.IND_DEDUCIBLE == 'S') {
                    $('#uniform-chkDeducible span').removeClass().addClass("checked");
                    $('#chkDeducible').attr('checked', true);  

                    if ($("#chk_compras").is(':checked')) {
                        $("#div_per_tri").attr("style", "display:block");
                        $(".espacio").attr("style", "display:none")
                    } else {
                        $("#div_per_tri").attr("style", "display:block");
                        $(".espacio").attr("style", "display:block")
                    }



                    $("#div_per_tri").attr("style", "display:block")
                } else {
                    $('#uniform-chkDeducible span').removeClass();
                    $('#chkDeducible').attr('checked', false);                         
                }

                //---------------------------
                HABIDO_IND = row.HABIDO_IND;
                if (row.HABIDO_IND == "1") {
                    $("#lblHabido").html("Condición: HABIDO");
                } else {
                    $("#lblHabido").html("Condición: NO HABIDO");
                }
                $("#cbx_destino").select2("val", row.OPERACION);
                fillCboTipoBien(row.TIPO_BIEN);
                //----------------------------
            }

            $("#MuestraModalAceptar").modal("show");

            fillCbo_Periodo(row.CTLG_CODE);
            $("#lbl_concepto").text(row.CONCEPTO);
            $("#lbl_subconcepto").text(row.SUBCONCEPTO);
            let emision = row.FECHA_EMISION;
            let setearFecha = emision.substring(10, 0);

            $("#txt_fec_vencimiento").datepicker("setDate", setearFecha);
            $("div .error").attr("class", "control-group");

            $("#txt_centro_costo").val(row.CCOSTO);
            $("#txt_centro_costo").data("CodCentroCostoCab", row.CCOSTO_CAB_CODE);
            $("#txt_centro_costo").data("CodCentroCosto", row.CCOSTO_DET_CODE);
            
            listarDetallesGasto(row.CODIGO);

            var sCodGasto = row.CODIGO;
            sCodGasto = $.trim(sCodGasto);
            var oDocGasto = fnGetGasto(sCodGasto);

            fnCargaTablaCuentasC(sCodGasto, oDocGasto, sCodGasto);//CAMBIO AVENGER



        });

        $('#tbl_gastos tbody').on('click', '.btnrechazar', function () {
            var pos = oTableGST.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableGST.fnGetData(pos);
            posicion = pos;  
            btn_actual = $(this);
            tipo_op = 'RE';
            obj_actual = row;

            $("#titulo_gasto").html("<i class='icon-warning-sign'></i>&nbsp RECHAZAR " + row.GASTO_DESC);

            var permiso_ind = $("#hf_permiso").val();

            $("#txt_glosa").val('');
            $("#txt_serie_int").val('');
            $("#txt_dcto_ref_int").val('');

            if (permiso_ind == "" || permiso_ind == "0") {
                $(".denegar").show();
                $(".permitir").hide();
            } else {
                $(".denegar").hide();
                $(".permitir").show();

                $("#cbo_documento").val(row.DCTO_CODE).change();
                $("#txt_serie").val(row.SERIE_DOC);
                $("#txt_dcto_ref").val(row.NRO_DOC);
            }
            $("#MuestraModalAceptar").modal("show");
            $(".botones").show();

            obj = $(this).parent().parent();
        });
    };

    var fnCargaTablaCuentasC = function (sCodGasto, oDocGasto, sCodAsiento) {
        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = sCodModulo;
                    vAsientoContable.sCodDoc = sCodGasto;
                    vAsientoContable.objDoc = oDocGasto;
                    vAsientoContable.init(sCodAsiento);
                });
        });

    }


    var listarDetallesGasto = function (code) {
        detallesGasto = [];
        //console.log(code);
        var data = new FormData();
        data.append('OPCION', 'DETGAST');
        data.append('p_CODE', code);


        $.ajax({
            url: "vistas/CP/ajax/CPMPGAS.ashx?",
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {                
                if (datos != null) {                   
                    for (var i = 0; i < datos.length; i++) {
                        dTotal += datos[i].SUB_MONTO;
                        var item = i + 1;
                        objProd.ITEM = item;
                        objProd.COD_GASTO = datos[i].COD_GASTO;
                        objProd.GASTO = datos[i].GASTO;
                        objProd.COD_SUB_GASTO = datos[i].COD_SUB_GASTO;
                        objProd.SUB_GASTO = datos[i].SUB_GASTO;
                        objProd.CC_CAB = datos[i].CC_CAB;
                        objProd.CC_COSTO = datos[i].CC_COSTO;
                        objProd.CENTRO_COSTO = datos[i].CENTRO_COSTO;
                        objProd.GLOSA = datos[i].GLOSA;
                        objProd.CUENTA = datos[i].CUENTA;
                        objProd.DES_CUENTA = datos[i].DES_CUENTA;
                        objProd.NOM_CUENTA = datos[i].NOM_CUENTA;
                        objProd.MONTO = datos[i].SUB_MONTO;
                        objProd.COD_OPERACION = datos[i].COD_OPERACION;
                        objProd.DES_OPERACION = datos[i].DES_OPERACION;
                        //objProd.SUB_MONTO = $("#cbo_moneda option:selected").attr("simbolo") + ' ' + datos[i].SUB_MONTO;
                        objProd.SUB_MONTO = datos[i].SUB_MONTO;
                        objProd.DETRACCION = datos[i].DETRACCION;
                        objProd.SUB_DETRACCION = datos[i].DETRACCION;
                        objProd.TOTAL_NETO = datos[i].TOTAL_NETO;
                        objProd.SUB_TOTAL_NETO = datos[i].TOTAL_NETO;
                        objProd.MONEDA = datos[i].MONEDA;

                        objAux = jQuery.parseJSON(JSON.stringify(objProd));
                        detallesGasto.push(objAux);
                    }
                    
                    oTableGasto.fnClearTable();
                    oTableGasto.fnAddData(detallesGasto);
                    setTimeout(function () {
                        oTableGasto.fnAdjustColumnSizing();
                    }, 500);
                    

                }
                else { noexito(); }
            },
            error: function (msg) {
                noexitoCustom("No se listó correctamente.")
                Desbloquear("ventana");
            },
            complete: function (msg) {
                Desbloquear("ventana");
            }
        });
    };

    var ListaGastos = function () {
        let p_CTLG_CODE = $("#slcEmpresa").val();
        let p_SCSL_CODE = $("#slcSucursal").val();
        let p_CODE = "";
        let p_FECHA_INI = $("#txt_fec_ini_emi").val();
        let p_FECHA_FIN = $("#txt_fec_fin_emi").val();
        let p_ESTADO_IND = "1";

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMPGAS.ashx?OPCION=LGASTOS" +
            "&p_CTLG_CODE=" + p_CTLG_CODE +
            "&p_SCSL_CODE=" + p_SCSL_CODE +
            "&p_CODE=" + p_CODE +
            "&p_FECHA_FIN_EMI=" + p_FECHA_FIN +
            "&p_FECHA_INI_EMI=" + p_FECHA_INI +
            "&p_ESTADO_IND=" + p_ESTADO_IND,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    oTableGST.fnClearTable();
                    oTableGST.fnAddData(datos);
                }
                else {
                    oTableGST.fnClearTable();
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                Desbloquear("ventana");
            }
        });
    };

    var ListaAprobGastos = function () {
        
        var p_CTLG_CODE = $("#slcEmpresa").val();
        var p_SCSL_CODE = $("#slcSucursal").val();     

        var p_FECHA_INI = $("#txt_fec_ini_emi").val();
        var p_FECHA_FIN = $("#txt_fec_fin_emi").val();
        

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMAGAS.ashx?OPCION=7&p_FECHA_INI=" + p_FECHA_INI +
            "&p_FECHA_FIN=" + p_FECHA_FIN +
            "&p_CTLG_CODE=" + $("#slcEmpresa").val() +
            "&p_SCSL_CODE=" + $("#slcSucursal").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    oTableG.fnClearTable();
                    oTableG.fnAddData(datos);
                }
                else {
                    oTableG.fnClearTable();
                }
                Desbloquear("ventana");
            },
            error: function (msg) {
                noexitoCustom("Error Listado")
                Desbloquear("ventana");
            }
        });
    };

    var eventoControles = function () {
        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {

                ListarSucursales($('#slcEmpresa').val())
                emp_ant = $(this).val();
            } else { emp_ant = ""; }
        });

        $('#chkfecha').on('click', function () {
            if ($("#chkfecha").is(':checked')) {

                $('#uniform-chkfecha span').removeClass().addClass("checked");
                $('#chkfecha').attr('checked', true);
            } else {

                $('#uniform-chkfecha span').removeClass();
                $('#chkfecha').attr('checked', false);
            }
        });

        $('#chk_sin_dcto').on('click', function () {
            $("div .error").attr("class", "control-group");
            if ($("#chk_sin_dcto").is(':checked')) {

                $('#uniform-chk_sin_dcto span').removeClass().addClass("checked");
                $('#chk_sin_dcto').attr('checked', true);
                $("#cbo_documento").select2('val', "").attr('disabled', 'disabled');
                $("#txt_serie").val('').attr('disabled', 'disabled');
                $("#txt_dcto_ref").val('').attr('disabled', 'disabled');


                $('#chk_compras').attr("disabled", true)
                $('#uniform-chk_compras span').removeClass();
                $('#chk_compras').attr('checked', false);
                MuestraPeriodo("none")
            } else {

                $('#uniform-chk_sin_dcto span').removeClass();
                $('#chk_sin_dcto').attr('checked', false);
                $("#cbo_documento").select2('val', "").removeAttr('disabled', 'disabled');
                $("#txt_serie").val('').removeAttr('disabled', 'disabled');
                $("#txt_dcto_ref").val('').removeAttr('disabled', 'disabled');


                $('#chk_compras').attr("disabled", false)
            }
        });

        $('#chk_compras').on('click', function () {
            $("div .error").attr("class", "control-group")
            if ($("#chk_compras").is(':checked')) {
                $('#chk_compras').prop('checked', true).parent().addClass('checked');
                $(".divDestinoTipo").show();
                $(".espacio").attr("style", "display:none")
                MuestraPeriodo("block");
            } else {
                if ($("#chkDeducible").is(':checked')) {
                    $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                    $(".divDestinoTipo").hide();
                    $(".espacio").attr("style", "display:block")
                } else {
                    $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                    $(".divDestinoTipo").hide();
                    MuestraPeriodo("none");
                }
                
            }
        });

        $('#chkDeducible').on('click', function () {            
            if ($("#chkDeducible").is(':checked')) {
                $('#chkDeducible').prop('checked', true).parent().addClass('checked');

                if ($("#chk_compras").is(':checked')) {
                    $("#div_per_tri").attr("style", "display:block");
                    $(".espacio").attr("style", "display:none")    
                } else {
                    $("#div_per_tri").attr("style", "display:block");
                    $(".espacio").attr("style", "display:block")    
                }                            
            } else {
                if ($("#chk_compras").is(':checked')) {
                    $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
                    $(".espacio").attr("style", "display:none")        
                } else {
                    $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
                    $(".espacio").attr("style", "display:none")                        
                    $("#div_per_tri").attr("style", "display:none");
                }     
            }
        });

        $('#btn_filtrar').on('click', function () {

            if ($("#cbo_tipo_aprobacion").val() == "SA") {
                $("#apro").hide();
                $("#noapro").show();
                ListaGastos();
            }

            if ($("#cbo_tipo_aprobacion").val() == "A") {
                $("#apro").show();
                $("#noapro").hide();
                ListaAprobGastos();
            }
            //filltxtCentroCostos('#txt_centro_costo', '');
        });

        $("#btnBuscarCentroCto").on("click", function (e) {
            e.preventDefault();

            //fnCargarArbolCentroCostos();
            $("#txtFiltrarCentroCosto").val("");
            $("#modal-centrocosto").modal("show");
            //$("#txtFiltrarCentroCosto").focus();
        });
        
        $("#modal-confirmacion").on("hidden.bs.modal", function () {
            Desbloquear("MuestraModalAceptar");
        });

        $("#btnAceptarConfirmacion").on('click', HideAceptar1);
        
        var lastPattern = '';
        $("#txtFiltrarCentroCosto").on("keyup", function (e) {
            var pattern = $("#txtFiltrarCentroCosto").val();
            if (pattern === lastPattern) {
                return;
            }
            lastPattern = pattern;
            var tree = $("#treeCentroCostos").treeview(true);
            fnResetTree();
            if (pattern.length < 3) { // avoid heavy operation
                $("#treeCentroCostos").treeview('clearSearch');
            } else {
                $("#treeCentroCostos").treeview("search", [pattern, {
                    ignoreCase: true,     // case insensitive
                    exactMatch: false,    // like or equals
                    revealResults: true,  // reveal matching nodes
                }]);
                // get all root nodes: node 0 who is assumed to be
                //   a root node, and all siblings of node 0.
                var roots = $("#treeCentroCostos").treeview("getSiblings", 0);
                roots.push($("#treeCentroCostos").treeview("getNode", 0));
                //first collect all nodes to disable, then call disable once.
                //  Calling disable on each of them directly is extremely slow! 
                var unrelated = collectUnrelated(roots);
                $("#treeCentroCostos").treeview("disableNode", [unrelated, { silent: true }]);
            }
        });

        $("#txt_fec_fin_emi").datepicker({
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
            mes = mes - 1;
        }

        if (mes >= 10)
            var fNueva = '01/' + mes + '/' + ano;
        else
            var fNueva = '01/0' + mes + '/' + ano;

        $("#txt_fec_ini_emi").val(fNueva);

    };

    var fnlimpiaCentroCostos = function () {
        $("#txt_centro_costo").val('');
        $("#txt_centro_costo").data("CodCentroCostoCab", '');
        $("#txt_centro_costo").data("CodCentroCosto", '');
    };

    var collectUnrelated = function (nodes) {
        var unrelated = [];
        $.each(nodes, function (i, n) {
            if (!n.searchResult && !n.state.expanded) { // no hit, no parent
                unrelated.push(n.nodeId);
            }
            if (!n.searchResult && n.nodes) { // recurse for non-result children
                $.merge(unrelated, collectUnrelated(n.nodes));
            }
        });
        return unrelated;
    };

    var fnResetTree = function () {
        $("#treeCentroCostos").treeview('collapseAll', { silent: true });
        $("#treeCentroCostos").treeview('enableAll', { silent: true });
    };

    var fnCargarArbolCentroCostos = function () {
        let sCodEmpresa = obj_actual.CTLG_CODE;
        oCentroCostoCab = fnGetCentroCostoActivo(sCodEmpresa);

        if (oCentroCostoCab.length === 0) {
            infoCustom("Imposible listar los Centros de Costo. No se pudo obtener los datos del centro de costo activo")
            return;
        }

        let sCodCentroCosCab = oCentroCostoCab[0].CodCentroCosCab;
        let sNombrePlan = oCentroCostoCab[0].NombrePlan;

        fnCargarParametros(oCentroCostoCab[0].CodCentroCosCab);

        Bloquear("treeCentroCostos");
        vArbol = {};
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LACC&sCodCentroCostosCab=" + sCodCentroCosCab + "&sEstado=A" + "&CTLG_CODE=" + sCodEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                var vData = [];
                var oItem = {};
                oItem.CODIGO = "0";
                oItem.DESCRIPCION = sNombrePlan;
                oItem.CodPadre = "-1";
                if (!isEmpty(datos))
                    vData = datos;

                vData.unshift(oItem);
                mCrearArbol(vData);
                mCargarArbol();
                Desbloquear("treeCentroCostos");

            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los centros de costos.");
                Desbloquear("treeCentroCostos");
            }
        });
    };

    var mCrearArbol = function (data) {
        if (isEmpty(data) || data === undefined)
            return;
        for (var i = 0; i < data.length; i++) {
            var nodo = data[i];
            mAgregarNodo(nodo);
        }
    };

    var mCargarArbol = function () {
        var niveles = [];
        var datos = [];
        datos.push(vArbol);
        $("#treeCentroCostos").treeview({ data: datos });
        for (var i = 0; i < aoNiveles.length; i++) {
            niveles.push(aoNiveles[i].DESCRIPCION);
        }
        setTimeout(function () {
            var ArrayBuscados = niveles;
            var todos = $(".list-group-item.node-treeCentroCostos");
            todos.filter(function (index, obj) {
                var text = obj.innerHTML;
                var textoEncontrado = "";
                for (var i = 0; i < ArrayBuscados.length; i++) {
                    if (text.indexOf(ArrayBuscados[i]) > -1) {
                        textoEncontrado = $.trim(ArrayBuscados[i]);
                    }
                }
                text = text.replace(eval("/" + textoEncontrado + "/g"), '<span style="font-weight:600;">' + textoEncontrado + '</span>');
                obj.innerHTML = text;
            });
        }, 500);
        $("#treeCentroCostos").on("nodeCollapsed nodeExpanded nodeSelected", function () {
            setTimeout(function () {
                var ArrayBuscados = niveles;
                var todos = $(".list-group-item.node-treeCentroCostos");
                todos.filter(function (index, obj) {
                    var text = obj.innerHTML;
                    var textoEncontrado = "";
                    for (var i = 0; i < ArrayBuscados.length; i++) {
                        if (text.indexOf(ArrayBuscados[i]) > -1) {
                            textoEncontrado = $.trim(ArrayBuscados[i]);
                        }
                    }
                    text = text.replace(eval("/" + textoEncontrado + "/g"), '<span style="font-weight:600;">' + textoEncontrado + '</span>');
                    obj.innerHTML = text;
                });
            }, 500);
        });
    };

    var mAgregarNodo = function (oNodo) {
        if (oNodo.CODIGO === "0") {
            vArbol.Codigo = oNodo.CODIGO;
            vArbol.Descripcion = oNodo.DESCRIPCION;
            vArbol.CodPadre = oNodo.CodPadre;
            vArbol.text = oNodo.DESCRIPCION; // Dato Necesario para que el plugin cree el Treeview
        } else {
            mAgregarNodo2(oNodo, vArbol);
        }
    };

    var mAgregarNodo2 = function (oNodo, oArbol) {
        var jsonColor = [{ nivel: 1, color: '#000000' }, { nivel: 2, color: '#00A300' }, { nivel: 3, color: '#AD193E' }, { nivel: 4, color: '#094CB4' }, { nivel: 5, color: '#D24726' }, { nivel: 6, color: '#A000A7' }, { nivel: 7, color: '#00839A' }, { nivel: 8, color: '#5535B0' }]
        if (oArbol.Codigo === oNodo.CodPadre) {
            if (oArbol.nodes === undefined)
                oArbol.nodes = [];
            var oTempNodo = {};
            oTempNodo.Codigo = oNodo.Codigo;
            oTempNodo.Descripcion = oNodo.Descripcion;
            oTempNodo.CodPadre = oNodo.CodPadre;
            oTempNodo.text = oNodo.Descripcion; // Dato Necesario para que el plugin cree el Treeview
            oTempNodo.color = jsonColor.filter(function (obj) { return obj.nivel === oNodo.Nivel })[0].color;
            oArbol.nodes.push(oTempNodo);
            return true;
        } else {
            if (oArbol.nodes !== undefined) {
                for (var i = 0; i < oArbol.nodes.length; i++) {
                    var bEncontrado = mAgregarNodo2(oNodo, oArbol.nodes[i]);
                    if (bEncontrado)
                        break;
                }
            }
        }
    };

    var LimpiaForm = function () {
        $('#uniform-chkfecha span').removeClass();
        $('#chkfecha').attr('checked', false);
    };

    var fillCboDcto_Emite = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=10&p_CTLG_CODE=" + $('#ctl00_hddctlg').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $('#cbo_documento').empty();
                $('#cbo_documento').append('<option></option>');

                $('#cbo_documento_int').empty();
                $('#cbo_documento_int').append('<option></option>');

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_documento').append('<option value="' + datos[i].DCTO_CODE + '">' + datos[i].DCTO_DESC_CORTA + '</option>');
                        $('#cbo_documento_int').append('<option value="' + datos[i].DCTO_CODE + '">' + datos[i].DCTO_DESC_CORTA + '</option>');
                    }
                    $('#cbo_documento').select2("val", "");
                    $('#cbo_documento_int').select2("val", "0100");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var MuestraPeriodo = function (valor) {
        $("#div_per_tri").attr("style", "display:" + valor)
    };

    var permiso_aprobar = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=ROL&p_USUA_ID=" + $("#ctl00_txtus").val(),
            async: false,
            success: function (datos) {
                $("#hf_permiso").val(datos);
            },
            error: function (msg) {
                alertCustom("No se obtuvo correctamente el indicador de permiso");
            }
        });
    };

    var fillCbo_Periodo = function (ctlg_code) {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + ctlg_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                    }
                    $('#cbo_periodo').select2("val", "");
                } else {
                    alertCustom("Error cargar periodo");
                }
            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
            }
        });
    };

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcSucursal').empty();
                $('#slcSucursal').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcSucursal').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#slcSucursal").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#slcSucursal").select2("val", "");
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var CargarTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "SUB_GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "CENTRO_COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DES_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "SUB_MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(rowData.MONEDA + " " + formatoMiles(rowData.SUB_MONTO));
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SUB_DETRACCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(rowData.MONEDA + " " + formatoMiles(rowData.SUB_DETRACCION));
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SUB_TOTAL_NETO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(rowData.MONEDA + " " + formatoMiles(rowData.SUB_TOTAL_NETO));
                        $(td).attr('align', 'center')
                    }
                }
                    //, {
                //    data: null,
                //    createdCell: function (td, cellData, rowData, row, col) {

                //        $(td)
                //            .html("<a class='btn red btnEliminarDetalle' onclick=\"deleteDetalle('" + rowData.ITEM + "')\"><i class='icon-remove'></i></a>")
                //            .attr("align", "center");
                //    }
                //}
            ]
        }

        oTableGasto = iniciaTabla('tblGastos', parms);
    }

    return {
        init: function () {
            cargarParametrosSistema();
            plugins();
            fillCboEmpresa();
            ListarSucursales($('#slcEmpresa').val());
            $("#cbo_tipo_aprobacion").select2("val", "SA");
            fillCboDcto_Emite();
            fillBandeja();
            fillBandejaSinAprobar();
            //ListaAprobGastos();
            funcionalidadTabla();
            permiso_aprobar();
            eventoControles();
            CargarTabla();
            $('#uniform-chkfecha span').removeClass();
            $('#chkfecha').attr('checked', false);
            $('#uniform-chk_sin_dcto span').removeClass();
            $('#chk_sin_dcto').attr('checked', false);
            $("#btn_filtrar").click();
            // fillCbo_Periodo();          
            fillCboTipoBien();            
        }
    };

}();

//DPORTA
function cargarParametrosSistema() {

    //QUE SE GENERE O NO EL ASIENTO CONTABLE
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=ACON",
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                prmtACON = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro ACON!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro ACON!");
        }
    });

    //OBTENER PARAMETRO DE DETRACCION
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DETR",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                if (!isNaN(parseFloat(datos[0].VALOR))) {
                    $('#hfParamDetraccion').val(datos[0].VALOR);
                } else {
                    infoCustom2("El parámetro de sistema de Detracción(DETR) no es válido. Se considerará como monto requerido 700")
                    $('#hfParamDetraccion').val("700");
                }
            }
            else { alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó el parámetro de Detracción(DETR) correctamente!");
        }
    });
}

var HABIDO_IND = "1";
var CPMAGAS = function () {
    var oCentroCostoCab = [];
    var aoNiveles = [];


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


    var fnCargarParametros = function (psPlanCostos) {
        aoNiveles = fnCargarNivelesCentroCostos(psPlanCostos);
    };

    var fnCargarNivelesCentroCostos = function (psPlanCostos) {
        let vNiveles = [];
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + psPlanCostos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                vNiveles = datos;
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los niveles.");
            }
        });
        return vNiveles;
    };

    var plugins = function () {
        $("#txt_fec_aprobacion").datepicker("setDate", "now");
        $("#txt_fec_vencimiento").datepicker();
        $("#txt_fec_pago").datepicker();
        $('#txt_serie').focus(function () { $(this).inputmask({ "mask": "#", "repeat": 5, "greedy": false }); });
        $('#txt_dcto_ref').focus(function () { $(this).inputmask({ "mask": "9", "repeat": 8, "greedy": false }); });
        $("#cbo_documento").select2();
        $("#cboRegistroInterno").select2();
        $("#cbo_periodo").select2();
        $("#cbo_gasto").select2();
        $("#cbo_subgasto").select2();
        $("#cboTipoBien,#cbx_destino").select2();
        $("#cbx_opcion").select2();
    }

    var fillBandeja = function () {
        var parms = {
            data: null,
            order: [[0, "desc"]],
            "dom": '<"toolbar">frtip',
            "paging": false,
            "info": false,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('display', 'none')
                    },
                    visible: false
                }, {
                    data: "GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }, {
                    data: "FECHA_REGISTRO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }, {
                    data: "MONTO_ORIGEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                    }
                }, {
                    data: "CTA_CONTABLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "CODIGO_GAST_ORG",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "FECHA_UNICA",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "PIDM",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "CTLG_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "SCSL_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "MONEDA_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "SIMBOLO_MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "DCTO_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "CONC_CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "DESC_MONEDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "RAZON_SOCIAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }, {
                    data: "DESC_DCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }, {
                    data: "SERIE",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }, {
                    data: "NUMERO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }, {
                    data: "RUC",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "DESC_CENTRO_COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "COD_CENTRO_COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "COD_CABECERA_CENTRO_COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "HABIDO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }, {
                    data: "TIPO_BIEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                    },
                    visible: false
                }
            ]
        }

        oTable = iniciaTabla('tbl_gastos', parms);
        //$('#tbl_gastos').removeAttr('style');
        $('#tbl_gastos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $("#txtCodigo").val("");
                $("#txt_gasto").val("");
                $("#txt_cta_contable").val("");
                $("#txt_monto, #txt_importePagar").val("");
                $("#hfcodgasto").val("");
                $("#txt_fec_pago").datepicker("setDate", "")
                $("#hfpidm").val("");
                $("#hfctlg_code").val("");
                $("#hfscsl_code").val("");
                $("#hfmone_code").val("");
                $("#hfsimb_code").val("");
                $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                $("#estado").children().children().html("-")
                $("#hfdesc_dcto").val("");
                $("#hf_conc_code").val("");
                $("#cbo_moneda").empty();
                $("#txt_usuario").val("");
                $("#txt_proveedor").val("");
                $("#txt_ruc").val("");
                $("#div_ce_costos").empty();
                $("#div_ce_costos").html(' <input id="txt_centro_costo" class="b span12 m-wrap" type="text" >');
                $("#txt_centro_costo").val("");
                $("#txt_centro_costo").data("CodCentroCostoCab", "");
                $("#txt_centro_costo").data("CodCentroCosto", "");
                $("#txt_serie").val("");
                $("#txt_glosa").val("")
                $("#cbo_documento").html("<option></option>");
                $("#cboRegistroInterno").html("<option></option>");
                $("#cbo_documento").select2("val", "")
                $("#cboRegistroInterno").select2("val", "")
                $("#txt_solicita").val("");
                $("#txt_dni").val("");
                $("#txtSerieRegistroInterno").val("");
                $("#txtNroRegistroInterno").val("");
                $("#txt_dcto_ref").val("");
                $('#uniform-chk_compras span').removeClass();
                $('#chk_compras').attr('checked', false);
                MuestraPeriodo("none")
                $("#cbo_gasto").html("<option></option>");
                $("#cbo_subgasto").html("<option></option>");
                $("#cbo_gasto").select2("val", "")
                $("#cbo_subgasto").select2("val", "")
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO = row.CODIGO;
                var GASTO = row.GASTO;
                var CTA_CONTABLE = row.CTA_CONTABLE;
                var MONTO = row.MONTO_ORIGEN;
                var GASTO_ORG = row.CODIGO_GAST_ORG;
                var FECHA_PAGO = row.FECHA_UNICA;
                var PIDM_BENEFICIARIO = row.PIDM;
                var CTLG = row.CTLG_CODE;
                var SCSL = row.SCSL_CODE;
                var MONE_CODE = row.MONEDA_CODE;
                var SIMB_MONEDA = row.SIMBOLO_MONEDA;
                var DESC_DCTO = row.DCTO_DESC;
                var DESC_MONEDA = row.DESC_MONEDA;
                var GASTO_CODE = row.CONC_CODE;
                var SGASTO_CODE = row.SCONC_CODE
                var RAZON_SOCIAL = row.RAZON_SOCIAL;
                var RUC = "RUC: " + row.RUC;
                var DESC_CENTRO_COSTO = row.DESC_CENTRO_COSTO;
                var COD_CENTRO_COSTO = row.COD_CENTRO_COSTO;
                var COD_CABECERA_CENTRO_COSTO = row.COD_CABECERA_CENTRO_COSTO;

                var TIPO_DCTO = row.TIPO_DCTO;
                var SERIE = row.SERIE;
                var NUMERO = row.NUMERO;
                var COMPRAS_IND = row.COMPRAS_IND;
                var SOLICITA = row.SOLICITA;
                var DNI = "DNI: " + row.DNI;

                cargarCorrelativoDocumentoRegistroInterno(row.CTLG_CODE);
                fillCbo_Periodo(CTLG);
                //$('#MuestraModalAceptar').modal('show');
                //$(this).removeClass('selected');
                $("#txtCodigo").val(CODIGO).change();
                $("#txt_gasto").val(GASTO).change();
                $("#txt_cta_contable").val(CTA_CONTABLE + " [" + $("#cbo_subgasto option:selected").attr("cta_des") + "]").change();
                $("#txt_monto").val(MONTO).change();
                //$("#txt_importePagar").val(IMPORTE_PAGAR).change();
                $("#hfcodgasto").val(GASTO_ORG);
                $("#txt_fec_pago").datepicker("setDate", FECHA_PAGO);
                $("#txt_fec_vencimiento").datepicker("setDate", FECHA_PAGO);

                $("#hfpidm").val(PIDM_BENEFICIARIO);
                $("#hfctlg_code").val(CTLG);
                $("#hfscsl_code").val(SCSL);
                if (DESC_DCTO == null || DESC_DCTO == "") {
                    $("#hfdesc_dcto").val(GASTO);
                } else {
                    $("#hfdesc_dcto").val(DESC_DCTO);
                }                
                $("#hfmone_code").val(MONE_CODE);
                $("#hfsimb_code").val(SIMB_MONEDA);
                $("#hf_conc_code").val(GASTO_CODE);
                $("#lbl_monto").html("Importe Total(" + SIMB_MONEDA + ")");
                $("#lbl_importePagar").html("Importe a Pagar(" + SIMB_MONEDA + ")");
                $("#labelMonto").html("Monto(" + SIMB_MONEDA + ")");
                
                $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;REGISTRADO")
                AgregaItemCombo(MONE_CODE, DESC_MONEDA);
                $("#txt_usuario").val($("#ctl00_txtus").val());
                $("#txt_proveedor").val(RAZON_SOCIAL);
                $("#txt_ruc").val(RUC);

                $("#txt_glosa").val(GASTO);
                $("#txt_solicita").val(SOLICITA);
                $("#txt_dni").val(DNI);

                $("#txt_serie").val(SERIE);
                $("#txt_dcto_ref").val(NUMERO);
                if (COMPRAS_IND == 'S') {
                    $('#chk_compras').prop('checked', true).parent().addClass('checked');
                    $(".divDestinoTipo").show();
                    MuestraPeriodo("display")
                } else {
                    $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                    $(".divDestinoTipo").hide();
                    MuestraPeriodo("none")
                }
                //---------------------------
                HABIDO_IND = row.HABIDO_IND;
                if (row.HABIDO_IND = "1") {
                    $("#lblHabido").html("Condición: HABIDO");
                } else {
                    $("#lblHabido").html("Condición: NO HABIDO");
                }
                //$("#cbx_destino").select2("val", row.OPERACION);
                fillCboTipoBien(row.TIPO_BIEN);
                //----------------------------

                $("#div_ce_costos").empty();
                $("#div_ce_costos").html(' <input id="txt_centro_costo" class="b span12 m-wrap" type="text" >');
                Bloquear("MuestraModal");
               // setTimeout(function () {

                    //$("#txt_centro_costo").val(DESC_CENTRO_COSTO);
                    //$("#txt_centro_costo").data("CodCentroCostoCab", COD_CABECERA_CENTRO_COSTO);
                    //$("#txt_centro_costo").data("CodCentroCosto", COD_CENTRO_COSTO);

                    fillCboDcto_Emite();
                    ListarGasto(CTLG, GASTO_CODE);
                    ListarSubGasto(GASTO_CODE, SGASTO_CODE);

                    $("#cbo_gasto").select2("val", "");
                    $("#cbo_subgasto").select2("val", "");

                    listarDetallesGasto(GASTO_ORG);
                    $("#cbo_documento").val(TIPO_DCTO).change();
               // }, 1000);
                Desbloquear("MuestraModal");
                $('#MuestraModal').modal('hide');
            }
        });
    };

    var ListarSubGastoCombo = function (depend_code) {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_ESTADO_IND=A&p_CODE=" + depend_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_subgasto').empty();
                $('#cbo_subgasto').append('<option></option>');
                if (datos != null) {
                    $("#error").slideUp();
                    for (var i = 0; i < datos.length; i++) {

                        $('#cbo_subgasto').append('<option cta_des="' + datos[i].CONTABLE_DESC + '" cta="' + datos[i].CONTABLE + '" value="' + datos[i].CODIGO + '" detraccion="' + datos[i].GASTO_DETRACCION_DECIMALES + '">' + datos[i].DESCRIPCION + '</option>');

                    }
                    $('#cbo_subgasto').select2("val", "");
                }
                else {
                    $('#cbo_subgasto').select2("val", "");
                    $("#error").slideDown();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var MuestraPeriodo = function (valor) {
        $("#div_lbl_per").attr("style", "display:" + valor)
        $("#div_cbo_per").attr("style", "display:" + valor)
    };

    var ListarSubGasto = function (depend_code, SGASTO_CODE) {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_ESTADO_IND=A&p_CODE=" + depend_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_subgasto').empty();
                $('#cbo_subgasto').append('<option></option>');
                if (datos != null) {
                    $("#error").slideUp();
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_subgasto').append('<option cta_des="' + datos[i].CONTABLE_DESC + '" cta="' + datos[i].CONTABLE + '" value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_subgasto').select2("val", SGASTO_CODE);
                }
                else {
                    $('#cbo_subgasto').select2("val", "");
                    $("#error").slideDown();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var ListarGasto = function (code, GASTO_CODE) {
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=3&p_TIPO=3&p_ESTADO_IND=A&p_CTLG_CODE=" + code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_gasto').empty();
                $('#cbo_gasto').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_gasto').append('<option  value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cbo_gasto').select2("val", GASTO_CODE);
                }
                else {
                    $('#cbo_gasto').select2("val", "");
                    $('#cbo_subgasto').empty();
                    $('#cbo_subgasto').append('<option></option>');
                    $('#cbo_subgasto').select2("val", "");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboDcto_Emite = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=10&p_CTLG_CODE=" + $('#hfctlg_code').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_documento').empty();
                $('#cbo_documento').append('<option></option>');
                $('#cboRegistroInterno').empty();
                $('#cboRegistroInterno').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_documento').append('<option value="' + datos[i].DCTO_CODE + '">' + datos[i].DCTO_DESC_CORTA + '</option>');
                        $('#cboRegistroInterno').append('<option value="' + datos[i].DCTO_CODE + '">' + datos[i].DCTO_DESC_CORTA + '</option>');
                    }
                    $('#cbo_documento').select2("val", "");
                    $('#cboRegistroInterno').select2("val", "0100");
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCbo_Periodo = function (ctlg_code) {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + ctlg_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                    }
                    $('#cbo_periodo').select2("val", "");
                } else {
                    alertCustom("Error cargar periodo");
                }
            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
            }
        });
    };

    var fillCboTipoBien = function (code) {
        Bloquear($($('#cboTipoBien').parents("div")[0]));
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMCLBI.ASHX?OPCION=4"
            + "&p_CODE="
            + "&p_DESCRIPCION="
            + "&p_DESC_CORTA="
            + "&p_ESTADO_IND=A",
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                $('#cboTipoBien').html('<option></option>');
                if (datos != null && datos.length > 0) {
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboTipoBien').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                        if (code == undefined) {
                            $('#cboTipoBien').select2("val", "0001");
                        } else {
                            if (code != "") {
                                $('#cboTipoBien').select2("val", code);
                            }
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom("Tipo de bienes no se listaron correctamente.");
            },
            complete: function (msg) {
                Desbloquear($($('#cboTipoBien').parents("div")[0]));
            }
        });
    };

    var ListaGastos = function () {
        RecargarGastos();
    }

    var cargarCorrelativoInterno = function (p_ctg_code) {
        if ($('#cboRegistro').val() !== '') {
            $.ajax({
                type: "post",
                url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=CORR&p_CTLG_CODE=" + p_ctg_code + "&TIP_DCTO=" + $('#cboRegistro').val(),
                contenttype: "application/json;",
                async: false,
                datatype: "json",
                success: function (datos) {
                    correlativoInterno = datos;
                },
                error: function (msg) {
                    alertCustom('Error al cargar numeraciones de documentos comerciales.');
                }
            });
        }
    };

    var establecerCorrelativoInterno = function (formato) {
        if (correlativoInterno !== null) {
            for (var i = 0; i < correlativoInterno.length; i++) {
                if (correlativoInterno[i].FORMATO == formato) {
                    $('#hfCOD_AUT_INTERNO').val(correlativoInterno[i].CODIGO);
                    $('#txtSerieRegistroInterno').val(correlativoInterno[i].SERIE);
                    $('#txtNroRegistroInterno').val(correlativoInterno[i].VALOR_ACTUAL);
                    $('#txtLineasRegistroInterno').val(correlativoInterno[i].NRO_LINEAS);
                    return;
                }
            }
        } else {
            $('#txtSerieRegistroInterno, #txtNroRegistroInterno').val('');
        }
    };

    var contieneFormatoEnCorrelativoInterno = function (formato) {
        if (correlativoInterno != null) {
            for (var i = 0; i < correlativoInterno.length; i++) {
                if (formato == correlativoInterno[i].FORMATO) {
                    return true;
                }
            }
        } else {
            return false;
        }
    };

    var cargarCorrelativoDocumentoRegistroInterno = function (p_ctg_code) {
        cargarCorrelativoInterno(p_ctg_code);
        establecerCorrelativoInterno('F');
        var fechaelec = $('#cboRegistroInterno :selected').attr('fecha-elec');
        if (fechaelec == '0000-00-00') {
            $('#divElecInterno').addClass('hidden');
        } else {
            if (new Date(fechaelec) <= new Date()) {
                if (contieneFormatoEnCorrelativoInterno('E')) {
                    $('#divElecInterno').removeClass('hidden');
                } else {
                    $('#divElecInterno').addClass('hidden');
                }
            } else {
                $('#divElecInterno').addClass('hidden');
            }
        }
    };

    var eventoControles = function () {  

        

        $('#chk_compras').on('click', function () {
            if ($("#chk_compras").is(':checked')) {
                $('#chk_compras').prop('checked', true).parent().addClass('checked');
                $(".divDestinoTipo").show();
                MuestraPeriodo("block");
            } else {
                if ($("#chkDeducible").is(':checked')) {
                    $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                    $("#div_lbl_per").attr("style", "display:block");
                    $("#div_cbo_per").attr("style", "display:block");
                    $(".divDestinoTipo").hide();
                    //MuestraPeriodo("none");
                } else {
                    $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                    $("#div_lbl_per").attr("style", "display:none");
                    $("#div_cbo_per").attr("style", "display:none");
                    $(".divDestinoTipo").hide();
                    //MuestraPeriodo("none");
                }




            
               
            }
        });

        $('#chk_sin_dcto').on('click', function () {
            arr = [];
            if ($("#chk_sin_dcto").is(':checked')) {

                $('#chk_sin_dcto').prop('checked', true).parent().addClass('checked');

                $("#cbo_documento").val('').change().attr('disabled', 'disabled');
                $("#txt_serie").val('').attr('disabled', 'disabled');
                $("#txt_dcto_ref").val('').attr('disabled', 'disabled');

                $('#chk_compras').attr("disabled", "disabled");
                $('#chk_compras').prop('checked', false).parent().removeClass('checked');
                MuestraPeriodo("none")

                $($("#txt_serie").parent().parent()).attr("class", "control-group")
                $($("#txt_dcto_ref").parent().parent()).attr("class", "control-group")
                $($("#cbo_documento").parent().parent()).attr("class", "control-group")
            } else {
                $('#chk_sin_dcto').prop('checked', false).parent().removeClass('checked');

                $("#cbo_documento").select2("val", "").removeAttr('disabled', 'disabled');
                $("#txt_serie").val('').removeAttr('disabled', 'disabled');
                $("#txt_dcto_ref").val('').removeAttr('disabled', 'disabled');

                $('#chk_compras').removeAttr("disabled");
            }
        });

        $('#chkDeducible').on('click', function () {
            if ($("#chkDeducible").is(':checked')) {
                $('#chkDeducible').prop('checked', true).parent().addClass('checked');
                $("#div_lbl_per").attr("style", "display:block");
                $("#div_cbo_per").attr("style", "display:block");
               
            } else {
                if ($("#chk_compras").is(':checked')) {
                    $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
                    $("#div_lbl_per").attr("style", "display:block");
                    $("#div_cbo_per").attr("style", "display:block");
                } else {
                    $('#chkDeducible').prop('checked', false).parent().removeClass('checked');
                    $("#div_lbl_per").attr("style", "display:none");
                    $("#div_cbo_per").attr("style", "display:none");
                }
                
            }
        });

        $('#btn_ver').on('click', function () {
            $('#MuestraModal').modal('show');
        });

        $('#btn_agregar').on('click', function () {
            window.location.href = '?f=cpmpgas';
        });

        var gasto_ant = "";
        $('#cbo_gasto').on('change', function () {
            if (gasto_ant != $(this).val()) {
                ListarSubGastoCombo($('#cbo_gasto').val())
                gasto_ant = $(this).val();
            } else { gasto_ant = ""; }
            $("#txt_cta_contable").val('');
        });

        $('#cbo_subgasto').on('change', function () {
            var cta = $('#cbo_subgasto :selected').attr('cta');
            var cta_des = $('#cbo_subgasto :selected').attr('cta_des');
            //$("#txt_cta_contable").val("[" + cta + "] " + cta_des);
            $("#txtcuenta").val("[" + cta + "] " + cta_des);
        });

        $("#btnBuscarCentroCto").on("click", function (e) {
            e.preventDefault();            
            //fnCargarArbolCentroCostos();
            //$("#txtFiltrarCentroCosto").val("");
            $("#modal-centrocosto").modal("show");
            //$("#txtFiltrarCentroCosto").focus();
        });

        var lastPattern = '';
        $("#txtFiltrarCentroCosto").on("keyup", function (e) {
            var pattern = $("#txtFiltrarCentroCosto").val();
            if (pattern === lastPattern) {
                return;
            }
            lastPattern = pattern;
            var tree = $("#treeCentroCostos").treeview(true);
            fnResetTree();
            if (pattern.length < 3) { // avoid heavy operation
                $("#treeCentroCostos").treeview('clearSearch');
            } else {
                $("#treeCentroCostos").treeview("search", [pattern, {
                    ignoreCase: true,     // case insensitive
                    exactMatch: false,    // like or equals
                    revealResults: true,  // reveal matching nodes
                }]);
                // get all root nodes: node 0 who is assumed to be
                //   a root node, and all siblings of node 0.
                var roots = $("#treeCentroCostos").treeview("getSiblings", 0);
                roots.push($("#treeCentroCostos").treeview("getNode", 0));
                //first collect all nodes to disable, then call disable once.
                //  Calling disable on each of them directly is extremely slow! 
                var unrelated = collectUnrelated(roots);
                $("#treeCentroCostos").treeview("disableNode", [unrelated, { silent: true }]);
            }
        });

        $("#add_detalle").on("click", function () {

            if (vErrors(['cbo_gasto', 'cbo_subgasto', 'txt_centro_costo', 'txtcuenta', 'txtSubTotal'])) {
                let codGasto = $("#cbo_gasto").val();
                let descGasto = $("#cbo_gasto option:selected").text();
                let codSubGasto = $("#cbo_subgasto").val();
                let desSubcGasto = $("#cbo_subgasto option:selected").text();
                let p_CENTRO_COSTO_CABECERA = $("#txt_centro_costo").data("CodCentroCostoCab");
                let p_CENTRO_COSTO = $("#txt_centro_costo").data("CodCentroCosto");
                let sCentroCosto = $("#txt_centro_costo").val();

                let sGlosa = $("#txt_glosa_detalle").val();


                let sCuenta = $('#cbo_subgasto :selected').attr("cta");
                let nomCuenta = $('#cbo_subgasto :selected').attr("cta_des");;
                let codOperacion = $("#cbx_destino").val();
                let desOperacion = $("#cbx_destino :selected").html();
                let desCuenta = $("#txtcuenta").val();
                let sSubTotal = $("#txtSubTotal").val();
                let detraccion = $('#cbo_subgasto :selected').attr("detraccion"); //DPORTA 17/01/2022

                dTotal += parseFloat(sSubTotal);

                var item = detallesGasto.length + 1;
                objProd.ITEM = item;
                objProd.COD_GASTO = codGasto;
                objProd.GASTO = descGasto;
                objProd.COD_SUB_GASTO = codSubGasto;
                objProd.SUB_GASTO = desSubcGasto;
                objProd.CC_CAB = p_CENTRO_COSTO_CABECERA;
                objProd.CC_COSTO = p_CENTRO_COSTO;
                objProd.GLOSA = sGlosa;
                objProd.CENTRO_COSTO = sCentroCosto;
                objProd.CUENTA = sCuenta;
                objProd.DES_CUENTA = desCuenta;
                objProd.COD_OPERACION = codOperacion;
                objProd.DES_OPERACION = desOperacion;
                objProd.NOM_CUENTA = nomCuenta;
                objProd.MONTO = sSubTotal;
                objProd.SUB_MONTO = SIMB_MONEDA + ' ' + formatoMiles(sSubTotal);

                //let tipoDocCode = $("#cboSerieDocVenta :selected").attr("data-tipoDocCode");//DPORTA SIN-IMPUESTOS
                if ($('#cbo_documento').val() == '0001') { //DPORTA 18/08/2022
                    objProd.DETRACCION = parseFloat(detraccion) * (sSubTotal);//DPORTA 17/01/2022
                    objProd.SUB_DETRACCION = SIMB_MONEDA + ' ' + formatoMiles(detraccion * sSubTotal);
                } else {
                    objProd.DETRACCION = parseFloat(0) * (sSubTotal);//DPORTA 17/01/2022
                    objProd.SUB_DETRACCION = SIMB_MONEDA + ' ' + formatoMiles(0 * sSubTotal);
                }
                objProd.TOTAL_NETO = sSubTotal;//DPORTA 17/01/2022
                objProd.SUB_TOTAL_NETO = SIMB_MONEDA + ' ' + formatoMiles(sSubTotal);

                objAux = jQuery.parseJSON(JSON.stringify(objProd));
                detallesGasto.push(objAux);

                console.log(detallesGasto);

                oTableGasto.fnClearTable();
                oTableGasto.fnAddData(detallesGasto);
                oTableGasto.fnAdjustColumnSizing();

                $("#cbo_gasto").select2("val", "");

                $("#cbo_subgasto").select2("val", "");

                $("#txt_centro_costo").data("CodCentroCostoCab", "");
                $("#txt_centro_costo").data("CodCentroCosto", "");
                $("#txtcuenta").val("");
                $("#txtSubTotal").val("");
                $("#txt_centro_costo").val('');

                CalcularDetraccion();

                parseFloat($("#txt_monto").val(dTotal)).toFixed(2);
                parseFloat($("#txt_importePagar").val(dTotal - parseFloat($("#hfMontoDetraccion").val()))).toFixed(2);

                //$("#txt_monto").val(formatoMiles(dTotal));
            }
        });

    };

    var fnlimpiaCentroCostos = function () {
        $("#txt_centro_costo").val('');
        $("#txt_centro_costo").data("CodCentroCostoCab", '');
        $("#txt_centro_costo").data("CodCentroCosto", '');
    };

    var collectUnrelated = function (nodes) {
        var unrelated = [];
        $.each(nodes, function (i, n) {
            if (!n.searchResult && !n.state.expanded) { // no hit, no parent
                unrelated.push(n.nodeId);
            }
            if (!n.searchResult && n.nodes) { // recurse for non-result children
                $.merge(unrelated, collectUnrelated(n.nodes));
            }
        });
        return unrelated;
    };

    var fnResetTree = function () {
        $("#treeCentroCostos").treeview('collapseAll', { silent: true });
        $("#treeCentroCostos").treeview('enableAll', { silent: true });
    };

    var fnCargarArbolCentroCostos = function () {
        let sCodEmpresa = $("#hfctlg_code").val();
        oCentroCostoCab = fnGetCentroCostoActivo(sCodEmpresa);

        if (oCentroCostoCab.length === 0) {
            infoCustom("Imposible listar los Centros de Costo. No se pudo obtener los datos del centro de costo activo")
            return;
        }

        let sCodCentroCosCab = oCentroCostoCab[0].CodCentroCosCab;
        let sNombrePlan = oCentroCostoCab[0].NombrePlan;

        fnCargarParametros(oCentroCostoCab[0].CodCentroCosCab);

        Bloquear("treeCentroCostos");
        vArbol = {};
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LACC&sCodCentroCostosCab=" + sCodCentroCosCab + "&sEstado=A" + "&CTLG_CODE=" + sCodEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                var vData = [];
                var oItem = {};
                oItem.CODIGO = "0";
                oItem.DESCRIPCION = sNombrePlan;
                oItem.CodPadre = "-1";
                if (!isEmpty(datos))
                    vData = datos;

                vData.unshift(oItem);
                mCrearArbol(vData);
                mCargarArbol();
                Desbloquear("treeCentroCostos");

            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los centros de costos.");
                Desbloquear("treeCentroCostos");
            }
        });
    };

    var mCrearArbol = function (data) {
        if (isEmpty(data) || data === undefined)
            return;
        for (var i = 0; i < data.length; i++) {
            var nodo = data[i];
            mAgregarNodo(nodo);
        }
    };

    var mCargarArbol = function () {
        var niveles = [];
        var datos = [];
        datos.push(vArbol);
        $("#treeCentroCostos").treeview({ data: datos });
        for (var i = 0; i < aoNiveles.length; i++) {
            niveles.push(aoNiveles[i].DESCRIPCION);
        }
        setTimeout(function () {
            var ArrayBuscados = niveles;
            var todos = $(".list-group-item.node-treeCentroCostos");
            todos.filter(function (index, obj) {
                var text = obj.innerHTML;
                var textoEncontrado = "";
                for (var i = 0; i < ArrayBuscados.length; i++) {
                    if (text.indexOf(ArrayBuscados[i]) > -1) {
                        textoEncontrado = $.trim(ArrayBuscados[i]);
                    }
                }
                text = text.replace(eval("/" + textoEncontrado + "/g"), '<span style="font-weight:600;">' + textoEncontrado + '</span>');
                obj.innerHTML = text;
            });
        }, 500);
        $("#treeCentroCostos").on("nodeCollapsed nodeExpanded nodeSelected", function () {
            setTimeout(function () {
                var ArrayBuscados = niveles;
                var todos = $(".list-group-item.node-treeCentroCostos");
                todos.filter(function (index, obj) {
                    var text = obj.innerHTML;
                    var textoEncontrado = "";
                    for (var i = 0; i < ArrayBuscados.length; i++) {
                        if (text.indexOf(ArrayBuscados[i]) > -1) {
                            textoEncontrado = $.trim(ArrayBuscados[i]);
                        }
                    }
                    text = text.replace(eval("/" + textoEncontrado + "/g"), '<span style="font-weight:600;">' + textoEncontrado + '</span>');
                    obj.innerHTML = text;
                });
            }, 500);
        });             
        
    };

    var mAgregarNodo = function (oNodo) {
        if (oNodo.CODIGO === "0") {
            vArbol.Codigo = oNodo.CODIGO;
            vArbol.Descripcion = oNodo.DESCRIPCION;
            vArbol.CodPadre = oNodo.CodPadre;
            vArbol.text = oNodo.DESCRIPCION; // Dato Necesario para que el plugin cree el Treeview
        } else {
            mAgregarNodo2(oNodo, vArbol);
        }
    };

    var mAgregarNodo2 = function (oNodo, oArbol) {
        var jsonColor = [{ nivel: 1, color: '#000000' }, { nivel: 2, color: '#00A300' }, { nivel: 3, color: '#AD193E' }, { nivel: 4, color: '#094CB4' }, { nivel: 5, color: '#D24726' }, { nivel: 6, color: '#A000A7' }, { nivel: 7, color: '#00839A' }, { nivel: 8, color: '#5535B0' }]
        if (oArbol.Codigo === oNodo.CodPadre) {
            if (oArbol.nodes === undefined)
                oArbol.nodes = [];
            var oTempNodo = {};
            oTempNodo.Codigo = oNodo.Codigo;
            oTempNodo.Descripcion = oNodo.Descripcion;
            oTempNodo.CodPadre = oNodo.CodPadre;
            oTempNodo.text = oNodo.Descripcion; // Dato Necesario para que el plugin cree el Treeview
            oTempNodo.color = jsonColor.filter(function (obj) { return obj.nivel === oNodo.Nivel })[0].color;
            oArbol.nodes.push(oTempNodo);
            return true;
        } else {
            if (oArbol.nodes !== undefined) {
                for (var i = 0; i < oArbol.nodes.length; i++) {
                    var bEncontrado = mAgregarNodo2(oNodo, oArbol.nodes[i]);
                    if (bEncontrado)
                        break;
                }
            }
        }
    };

    var cargaInicial = function () {
        $("#txt_fec_aprobacion").attr("disabled", true)

        var CODE = ObtenerQueryString("codigo");
        var APR = ObtenerQueryString("ap");
        
        if (typeof (CODE) !== "undefined") {
            if (APR == 'no') {
                var data = new FormData();
                data.append('OPCION', '2');
                data.append('p_CODIGO', CODE);
                data.append('p_ESTADO_IND', '1');

                $.ajax({
                    url: "vistas/CP/ajax/CPMPGAS.ashx",
                    type: 'POST',
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success:
                    function (datos) {
                        if (datos != null) {

                            row = datos[0];
                            var CODIGO = row.CODIGO;
                            var GASTO = row.GASTO;
                            var CTA_CONTABLE = row.CTA_CONTABLE;
                            var MONTO = row.MONTO_ORIGEN;
                            var GASTO_ORG = row.CODIGO_GAST_ORG;
                            var FECHA_PAGO = row.FECHA_UNICA;
                            var PIDM_BENEFICIARIO = row.PIDM;
                            var CTLG = row.CTLG_CODE;
                            var SCSL = row.SCSL_CODE;
                            var MONE_CODE = row.MONEDA_CODE;
                            SIMB_MONEDA = row.SIMBOLO_MONEDA;
                            var DESC_DCTO = row.DCTO_DESC;
                            var DESC_MONEDA = row.DESC_MONEDA;
                            var GASTO_CODE = row.CONC_CODE;
                            var RAZON_SOCIAL = row.RAZON_SOCIAL;
                            var RUC = "RUC: " + row.RUC;
                            var DESC_CENTRO_COSTO = row.DESC_CENTRO_COSTO;
                            var COD_CENTRO_COSTO = row.COD_CENTRO_COSTO;
                            var COD_CABECERA_CENTRO_COSTO = row.COD_CABECERA_CENTRO_COSTO;

                            var TIPO_DCTO = row.TIPO_DCTO;
                            var SERIE = row.SERIE;
                            var NUMERO = row.NUMERO;
                            var COMPRAS_IND = row.COMPRAS_IND;
                            var SOLICITA = row.SOLICITA;
                            var DNI = "DNI: " + row.DNI;

                            var CONC_CODE = row.CONC_CODE;
                            var SCONC_CODE = row.SCONC_CODE;
                            var IMPORTE_PAGAR = parseFloat(row.IMPORTE_PAGAR).toFixed(2);
                            //ListarGasto(CTLG, CONC_CODE);
                            //ListarSubGasto(CONC_CODE, SCONC_CODE);

                            ListarGasto(CTLG, "");
                            ListarSubGasto("", SCONC_CODE);

                            fillCbo_Periodo(CTLG);
                            cargarCorrelativoDocumentoRegistroInterno(row.CTLG_CODE);

                            //$('#MuestraModalAceptar').modal('show');
                            //$(this).removeClass('selected');
                            $("#txtCodigo").val(CODIGO).change();
                            $("#txt_gasto").val(GASTO).change();
                            //$("#txt_cta_contable").val(CTA_CONTABLE + " [" + $("#cbo_subgasto option:selected").attr("cta_des") + "]").change();
                            $("#txt_monto").val(MONTO).change();
                            $("#txt_importePagar").val(IMPORTE_PAGAR).change();
                            $("#txt_glosa").val(GASTO).change();
                            $("#hfcodgasto").val(GASTO_ORG);
                            $("#txt_fec_pago").datepicker("setDate", FECHA_PAGO);
                            $("#hfpidm").val(PIDM_BENEFICIARIO);
                            $("#hfctlg_code").val(CTLG);
                            $("#hfscsl_code").val(SCSL);
                            $("#labelMonto").html("Monto (" + SIMB_MONEDA + ")");
                            $("#hfdesc_dcto").val(GASTO);
                            //$("#hfdesc_dcto").val($("#cbo_gasto option:selected").text() + ' ' + $("#cbo_subgasto option:selected").text());

                            //data.append("p_REF_DCTO_DESC", obj_actual.DESC_GASTO + ' ' + obj_actual.DESC_SUBGASTO);
                            //data.append("p_REF_DCTO_NRO", $.trim($("#txt_serie").val()) + "-" + $.trim($("#txt_dcto_ref").val()));
                            //data.append("p_COMC_CODE", obj_actual.GASTO_COD);
                            
                            $("#hfmone_code").val(MONE_CODE);
                            $("#hfsimb_code").val(SIMB_MONEDA);
                            $("#hf_conc_code").val(CONC_CODE);
                            $("#lbl_monto").html("Importe Total(" + SIMB_MONEDA + ")")
                            $("#lbl_importePagar").html("Importe a Pagar(" + SIMB_MONEDA + ")")
                            $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                            $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;REGISTRADO")
                            AgregaItemCombo(MONE_CODE, DESC_MONEDA);
                            $("#txt_usuario").val($("#ctl00_txtus").val());
                            $("#txt_proveedor").val(RAZON_SOCIAL);
                            $("#txt_ruc").val(RUC);

                            $("#txt_fec_vencimiento").datepicker("setDate", FECHA_PAGO);

                            $("#txt_solicita").val(SOLICITA);
                            $("#txt_dni").val(DNI);                      
                            
                            $("#txt_serie").val(SERIE);
                            $("#txt_dcto_ref").val(NUMERO);
                            if (COMPRAS_IND == 'S') {
                                $("#chk_compras").click().click();
                                $('#chk_compras').attr('checked', true);
                                $(".divDestinoTipo").show();
                            } else {
                                $(".divDestinoTipo").hide();
                            }


                            if (row.IND_DEDUCIBLE == 'S') {
                                $('#uniform-chkDeducible span').removeClass().addClass("checked");
                                $('#chkDeducible').attr('checked', true);

                                if ($("#chk_compras").is(':checked')) {
                                    $("#div_lbl_per").attr("style", "display:block");
                                    $("#div_cbo_per").attr("style", "display:block");
                                } else {
                                    $("#div_lbl_per").attr("style", "display:block");
                                    $("#div_cbo_per").attr("style", "display:block");
                                }



                                //$("#div_per_tri").attr("style", "display:block")
                            } else {
                                $('#uniform-chkDeducible span').removeClass();
                                $('#chkDeducible').attr('checked', false);
                            }


                            if (datos[0].RUC != "") {
                                rucSeleccionado = datos[0].RUC;
                                $("#lblRucSeleccionado").html("RUC: " + rucSeleccionado + "");
                            }                


                            if (SERIE == "" && NUMERO == "") {
                                $("#chk_sin_dcto").click().click()
                                $('#uniform-chk_sin_dcto span').removeClass().addClass("checked");
                                $('#chk_sin_dcto').attr('checked', true);
                            } else {
                                $('#uniform-chk_sin_dcto span').removeClass();
                                $('#chk_sin_dcto').attr('checked', false);

                            }

                            //---------------------------
                            HABIDO_IND = datos[0].HABIDO_IND;
                            if (datos[0].HABIDO_IND == "1") {
                                $("#lblHabido").html("Condición: HABIDO");
                            } else {
                                $("#lblHabido").html("Condición: NO HABIDO");
                            }
                            //$("#cbx_destino").select2("val", datos[0].OPERACION);
                            fillCboTipoBien(datos[0].TIPO_BIEN);
                            //----------------------------

                            $("#div_ce_costos").empty();
                            $("#div_ce_costos").html(' <input id="txt_centro_costo" class="b span12 m-wrap" type="text" >');
                            listarDetallesGasto(CODE);                            
                            
                            if (prmtACON == "SI") {
                                var sCodGasto = $("#hfcodgasto").val();
                                sCodGasto = $.trim(sCodGasto);
                                var oDocGasto = fnGetGasto(sCodGasto);
                                fnCargaTablaCuentasC(sCodGasto, oDocGasto, sCodGasto); //CAMBIO AVENGER
                            }                         

                            Bloquear("MuestraModal");
                            setTimeout(function () {                                
                                fillCboDcto_Emite();
                                $("#cbo_documento").val(TIPO_DCTO).change();
                            }, 1000);
                            
                        }
                    }
                });
            } else {

                var data = new FormData();

                data.append('OPCION', '7');
                data.append('p_CODIGO', CODE);

                $.ajax({

                    url: "vistas/CP/ajax/CPMAGAS.ashx",
                    type: 'POST',
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success:
                    function (datos) {
                        
                        if (datos != null) {

                            ListarGasto(datos[0].CTLG_CODE, "");
                            ListarSubGasto("", "");

                            $('#txtCodigo').val(datos[0].CODIGO);

                            $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                            var html = "<i class='icon-asterisk'></i>&nbsp;&nbsp;" + datos[0].NESTADO

                            $("#txt_fec_pago").datepicker("remove")
                            $("#txt_fec_pago").datepicker("update")

                            $("#txt_fec_vencimiento").datepicker("remove")
                            $("#txt_fec_vencimiento").datepicker("update")

                            $("#estado").children().children().html(html)

                            $("#txt_fec_aprobacion").datepicker("setDate", datos[0].FECHA_APROBACION)
                            $("#txt_fec_vencimiento").datepicker("setDate", datos[0].FECHA_VENCIMIENTO)
                            $("#txt_fec_pago").datepicker("setDate", datos[0].FECHA_PAGO)

                            $('#hfcodgasto').val(datos[0].CODIGO_GAST_ORG)
                            $("#txt_monto").val(formatoMiles(datos[0].MONTO_APROBADO))
                            $("#txt_importePagar").val(formatoMiles(datos[0].IMPORTE_PAGAR_APROBADO))
                            $("#txt_glosa").val(datos[0].GLOSA)
                            $("#txt_gasto").val(datos[0].GASTO)
                            $("#txt_cta_contable").val(datos[0].CTA_CONTABLE + " [" + $("#cbo_subgasto option:selected").attr("cta_des") + "]")
                            $("#txt_dcto_ref").val(datos[0].DCTO_REF)
                            //$("#txt_centro_costo").val(datos[0].DESC_CENTRO_COSTO)


                            $("#lbl_monto").html("Importe Total(" + datos[0].SIMBOLO_MONEDA + ")")
                            $("#lbl_importePagar").html("Importe a Pagar(" + datos[0].SIMBOLO_MONEDA + ")")
                            if (datos[0].IND_COMPRAS == "S") {
                                $("#chk_compras").click().click();
                                $(".divDestinoTipo").show();
                            } else {
                                $(".divDestinoTipo").hide();
                            }

                            if (datos[0].IND_DEDUCIBLE == 'S') {
                                $('#uniform-chkDeducible span').removeClass().addClass("checked");
                                $('#chkDeducible').attr('checked', true);  
                                $("#div_lbl_per").show();
                                $("#div_cbo_per").show();
                            } else {
                                $('#uniform-chkDeducible span').removeClass();
                                $('#chkDeducible').attr('checked', false);
                            }
                            
                            if (datos[0].ESTADO == "P") {                              
                                $("#acciones_generales").remove();
                            }
                            if (datos[0].ESTADO == "A") {
                                $("#btnGenerarAsiento").attr("style", "display:display");
                                $("#acciones_generales").remove();
                            }
                            if (datos[0].ESTADO == "R") {
                                $("#acciones_generales").remove();
                            }

                            if (datos[0].ESTADO == "C") {
                                $("#acciones_generales").remove();
                            }

                            if (datos[0].RUC != "") {
                                rucSeleccionado = datos[0].RUC;
                                $("#lblRucSeleccionado").html("RUC: " + rucSeleccionado + "");
                            }


                            $("#txt_proveedor").val(datos[0].RAZON_SOCIAL)
                            $("#txt_ruc").val("RUC: " + datos[0].RUC)
                            $("#txt_dni").val("DNI: " + datos[0].DNI)
                            $("#txtSerieRegistroInterno").val(datos[0].SERIE_INT)
                            $("#txtNroRegistroInterno").val(datos[0].NUMERO_INT)
                            $("#txt_solicita").val(datos[0].SOLICITA)
                            $("#txt_usuario").val(datos[0].USUARIO_AUT)
                            AgregaItemCombo("", datos[0].DESC_MONEDA)
                            AgregaItemComboDcto(datos[0].DCTO_CODE, datos[0].DESC_DCTO);

                            AgregaItemComboDctoInt(datos[0].DCTO_CODE_INT, datos[0].DESC_DCTO_INT);

                            $("#txt_serie").val(datos[0].SERIE)

                            if (datos[0].SERIE == "" && datos[0].DCTO_REF == "") {
                                $("#chk_sin_dcto").click().click()
                                $('#uniform-chk_sin_dcto span').removeClass().addClass("checked");
                                $('#chk_sin_dcto').attr('checked', true);
                            } else {
                                $('#uniform-chk_sin_dcto span').removeClass();
                                $('#chk_sin_dcto').attr('checked', false);
                            }


                            //---------------------------
                            HABIDO_IND = datos[0].HABIDO_IND;
                            if (datos[0].HABIDO_IND == "1") {
                                $("#lblHabido").html("Condición: HABIDO");
                            } else {
                                $("#lblHabido").html("Condición: NO HABIDO");
                            }
                            //$("#cbx_destino").select2("val", datos[0].OPERACION);
                            fillCboTipoBien(datos[0].TIPO_BIEN);
                            listarDetallesGasto($("#hfcodgasto").val());
                            $("#add_detalle").attr("disabled", true);
                            $("#btnBuscarCentroCto").attr("disabled", true);
                            $("#cbo_gasto").attr("disabled", true);
                            $("#cbo_subgasto").attr("disabled", true);
                            $("#txtSubTotal").attr("disabled", true);
                            
                            $("#cabecera").attr("style", "display:none");
                            $(".btnEliminarDetalle").attr("style", "display:none");
                            //----------------------------

                            if (datos[0].ANIO_TRIB != "") {
                                $("#cbo_periodo").html("<option value='" + datos[0].MES_TRIB + "-" + datos[0].ANIO_TRIB + "'>" + Devuelve_Desc_MES(datos[0].MES_TRIB) + " - " + datos[0].ANIO_TRIB + "</option>")
                                $("#cbo_periodo").select2("val", datos[0].MES_TRIB + "-" + datos[0].ANIO_TRIB)
                            }

                            $(".b").attr("disabled", true);

                            if (prmtACON == "SI") {
                                var sCodGasto = $("#hfcodgasto").val();
                                sCodGasto = $.trim(sCodGasto);
                                var oDocGasto = fnGetGasto(sCodGasto);

                                fnCargaTablaCuentasC(sCodGasto, oDocGasto, sCodGasto); //CAMBIO AVENGER
                                //fnCargaTablaCuentasC(); 
                            } else {
                                $("#asientos_contables").hide();
                            }
                        }
                        else { noexito(); }
                    }
                });
            }
        } else {
            if (prmtACON == "SI") {
                fnCargaTablaCuentasC();
            }
            if (prmtACON == "NO") {
                $("#asientos_contables").hide();
            }
            
        }

    }

    var fnGetGasto = function (sCodGasto) {
        let aoDocGasto = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMAGAS.ashx?OPCION=GET_GASTO&p_CODE_REF_GASTO=" + sCodGasto,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocGasto = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de venta.");
            }
        });
        Desbloquear("ventana");

        return aoDocGasto;
    };

    var fnCargaTablaCuentasC = function (sCodGasto, oDocGasto, sCodAsiento) {
        $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
            $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
                .done(function (script, textStatus) {
                    vAsientoContable = LAsientoContable;
                    vAsientoContable.sTipoMov = sCodModulo;
                    vAsientoContable.sCodDoc = sCodGasto;
                    vAsientoContable.objDoc = oDocGasto;
                    vAsientoContable.init(sCodAsiento);
                });
        });

    }

    var listarDetallesGasto = function (CODE) {

        var data = new FormData();
        data.append('OPCION', 'DETGAST');
        data.append('p_CODE', CODE);


        $.ajax({
            url: "vistas/CP/ajax/CPMPGAS.ashx?",
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false,
            success: function (datos) {

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        dTotal += datos[i].SUB_MONTO;
                        var item = i + 1;
                        objProd.ITEM = item;
                        objProd.COD_GASTO = datos[i].COD_GASTO;
                        objProd.GASTO = datos[i].GASTO;
                        objProd.COD_SUB_GASTO = datos[i].COD_SUB_GASTO;
                        objProd.SUB_GASTO = datos[i].SUB_GASTO;
                        objProd.CC_CAB = datos[i].CC_CAB;
                        objProd.CC_COSTO = datos[i].CC_COSTO;
                        objProd.CENTRO_COSTO = datos[i].CENTRO_COSTO;
                        objProd.GLOSA = datos[i].GLOSA;
                        objProd.CUENTA = datos[i].CUENTA;
                        objProd.DES_CUENTA = datos[i].DES_CUENTA;
                        objProd.COD_OPERACION = datos[i].COD_OPERACION;
                        objProd.DES_OPERACION = datos[i].DES_OPERACION;
                        objProd.NOM_CUENTA = datos[i].NOM_CUENTA;
                        objProd.MONTO = datos[i].SUB_MONTO;
                        objProd.SUB_MONTO = SIMB_MONEDA + ' ' + formatoMiles(datos[i].SUB_MONTO);
                        objProd.DETRACCION = datos[i].DETRACCION;
                        objProd.SUB_DETRACCION = SIMB_MONEDA + ' ' + formatoMiles(datos[i].DETRACCION);
                        objProd.TOTAL_NETO = datos[i].TOTAL_NETO;
                        objProd.SUB_TOTAL_NETO = SIMB_MONEDA + ' ' + formatoMiles(datos[i].TOTAL_NETO);
                        objAux = jQuery.parseJSON(JSON.stringify(objProd));
                        detallesGasto.push(objAux);
                    }

                    console.log(detallesGasto);

                    //console.log(detallesGasto);
                    oTableGasto.fnClearTable();
                    oTableGasto.fnAddData(detallesGasto);
                    oTableGasto.fnAdjustColumnSizing();

                    if ($("#hf_permiso").val() == 0) {
                        $("#cbo_documento").attr('disabled', true);
                        $("#txt_serie").attr('disabled', true);
                        $("#txt_dcto_ref").attr('disabled', true);
                        $("#chk_compras").attr('disabled', true);
                        $("#chkDeducible").attr('disabled', true);
                        $(".btnEliminarDetalle").hide();
                    } 
                    

                }
                else { noexito(); }
            },
            error: function (msg) {
                noexitoCustom("No se listó correctamente.")
                Desbloquear("ventana");
            },
            complete: function (msg) {
                Desbloquear("ventana");
            }
        });

    }

    var CargarTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "SUB_GASTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "CENTRO_COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DES_CUENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "DES_OPERACION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }, {
                    data: "SUB_MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).html(rowData.MONEDA + " " + formatoMiles(rowData.SUB_MONTO));
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SUB_DETRACCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).html(rowData.MONEDA + " " + formatoMiles(rowData.SUB_MONTO));
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "SUB_TOTAL_NETO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        //$(td).html(rowData.MONEDA + " " + formatoMiles(rowData.SUB_MONTO));
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td)
                            .html("<a class='btn red btnEliminarDetalle' onclick=\"deleteDetalle('" + rowData.ITEM + "')\"><i class='icon-remove'></i></a>")
                            .attr("align", "center");
                    }
                }
            ]
        }

        oTableGasto = iniciaTabla('tblGastos', parms);
    }

    var permiso_aprobar = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=ROL&p_USUA_ID=" + $("#ctl00_txtus").val(),
            async: false,
            success: function (datos) {
                $("#hf_permiso").val(datos);
                if ($("#hf_permiso").val() == 0) {
                    // disabled all fields for rol user inactive
                    $('.denegar').show();
                    $('#tabDatosGenerales').attr('data-toggle', '');
                    $('#tabAsiento').attr('data-toggle', '');
                    $('#estereotipos').find('*').attr('disabled', true);
                    $('#estereotipos').find('.btn').hide();
                    $("#chk_compras").attr("disabled", "disabled");
                    
                }
            },
            error: function (msg) {
                alertCustom("No se obtuvo correctamente el indicador de permiso");
            }
        });
    };

    return {
        init: function () {
            var CODE = ObtenerQueryString("codigo");
            if (CODE == undefined) {
                fillCboTipoBien();
            }
            cargarParametrosSistema();
            plugins();
            fillBandeja();
            fnFillBandejaCtas();
            ListaGastos();
            eventoControles();
            CargarTabla();            
            cargaInicial();
            permiso_aprobar();
            //fillCbo_Periodo();
        }
    };

}();


var deleteDetalle = function (item) {

    for (var i = 0; i < detallesGasto.length; i++) {
        if (detallesGasto[i].ITEM == item) {
            //console.log("SI");            
            dTotal = dTotal - parseFloat(detallesGasto[i].MONTO);
            detallesGasto.splice(i, 1);
            //$("#txt_monto").val(formatoMiles(dTotal));
            CalcularDetraccion();

            parseFloat($("#txt_monto").val(dTotal)).toFixed(2);
            parseFloat($("#txt_importePagar").val(dTotal - parseFloat($("#hfMontoDetraccion").val()))).toFixed(2);
        }
    }

    if (detallesGasto.length > 0) {
        oTableGasto.fnClearTable();
        oTableGasto.fnAddData(detallesGasto);
        oTableGasto.fnAdjustColumnSizing();
    } else {
        oTableGasto.fnClearTable();
    }
}

var Aprobar = function () {


    var p_CODE_REF_GASTO = '';
    var p_ESTADO = '';
    var p_MONTO = "";
    var p_FECHA_APROBACION = '';
    var p_FECHA_OPERACION = '';
    var p_FECHA_VENCIMIENTO = '';
    var p_USUA_ID = "";
    var p_GLOSA = '';
    var p_NRO_DCTO_REF = '';
    var p_SERIE = '';
    var p_DCTO_CODE = '';
    var p_CENTRO_COSTO_CODE = '';
    var p_CENTRO_COSTO_CABECERA = '';
    var p_IND_COMPRAS = '';
    var p_DETALLE_GASTO = '';
    var p_CTA_CONTABLE = '';
    var p_SCONC_CODE = '';
    var p_CONC_CODE = '';
    var p_DETRACCION_IND = 'N';
    var p_IMPORTE_DETRACCION = 0;
    var p_IMPORTE_PAGAR = 0;
    
    p_DETALLE_GASTO = obtenerDetalle();

    if (detallesGasto.length == 0) {
        infoCustom("No existen detalles para el gasto.");
        return;
    }
        
    p_CODE_REF_GASTO = $.trim($('#hfcodgasto').val());
    p_ESTADO = '2';
    p_FECHA_APROBACION = $.trim($('#txt_fec_aprobacion').val());
    p_FECHA_OPERACION = $.trim($('#txt_fec_pago').val());
    p_MONTO = $.trim(ReplaceTotal(",", "", $('#txt_monto').val()));
    p_USUA_ID = $.trim($('#ctl00_txtus').val());
    p_FECHA_VENCIMIENTO = $.trim($('#txt_fec_vencimiento').val());
    p_GLOSA = Enter_MYSQL($('#txt_glosa').val());
    p_NRO_DCTO_REF = $.trim($('#txt_dcto_ref').val());
    p_SERIE = $.trim($('#txt_serie').val());
    p_DCTO_CODE = $.trim($('#cbo_documento').val());
    p_CONC_CODE = $.trim(detallesGasto[0].COD_GASTO);
    p_SCONC_CODE = $.trim(detallesGasto[0].COD_SUB_GASTO);  
    p_CENTRO_COSTO_CABECERA = detallesGasto[0].CC_CAB;
    p_CENTRO_COSTO_CODE = detallesGasto[0].CC_COSTO;
    p_CTA_CONTABLE = detallesGasto[0].CUENTA;   
    p_IND_COMPRAS = $("#chk_compras").is(':checked') ? 'S' : 'N';

    p_IMPORTE_PAGAR = $.trim(ReplaceTotal(",", "", $('#txt_importePagar').val()));
    if (p_MONTO > p_IMPORTE_PAGAR && p_IMPORTE_PAGAR != 0) {
        p_DETRACCION_IND = 'S';
        p_IMPORTE_DETRACCION = p_MONTO - p_IMPORTE_PAGAR;
    }    

    p_IND_DEDUCIBLE = $("#chkDeducible").is(':checked') ? 'S' : 'N';

    var data = new FormData();

    data.append("OPCION", "G");
    data.append("p_CODE_REF_GASTO", p_CODE_REF_GASTO);
    data.append("p_ESTADO", p_ESTADO);
    data.append("p_FECHA_APROBACION", p_FECHA_APROBACION);
    data.append("p_FECHA_OPERACION", p_FECHA_OPERACION);
    data.append("p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO);
    data.append("p_MONTO", p_MONTO);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_GLOSA", p_GLOSA);
    data.append("p_NRO_DCTO_REF", p_NRO_DCTO_REF);
    data.append("p_SERIE", p_SERIE);
    data.append("p_DCTO_CODE", p_DCTO_CODE);
    data.append("p_CENTRO_COSTO_CODE", p_CENTRO_COSTO_CODE);
    data.append("p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA);
    data.append("p_IND_COMPRAS", p_IND_COMPRAS);
    data.append("p_IND_DEDUCIBLE", p_IND_DEDUCIBLE);
    data.append("p_PIDM", $("#hfpidm").val());
    data.append("p_CONC_CODE", p_CONC_CODE);
    data.append("p_SCONC_CODE", p_SCONC_CODE);
    data.append("p_CTA_CONTABLE", p_CTA_CONTABLE);
    data.append("p_DETALLE_GASTO", p_DETALLE_GASTO);
    data.append("p_DETRACCION_IND", p_DETRACCION_IND);
    data.append("p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION);
    data.append("p_IMPORTE_PAGAR", p_IMPORTE_PAGAR);
    
    var p_TIPO_BIEN = "";
    //var p_OPERACION = "";
    if ($("#chk_compras").is(':checked')) {
        p_TIPO_BIEN = $("#cboTipoBien").val();
        //p_OPERACION = $("#cbx_destino").val();
        if ($("#cbo_periodo").val() !== undefined) {
            if (!VerificaFechaPeriodo()) {
                infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                $("#cbo_periodo").focus();
                return false;
            }
        }
    } else {
        p_TIPO_BIEN = "0001";
        //p_OPERACION = "DSTGRA";
    }
    data.append("p_HABIDO_IND", HABIDO_IND);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    //data.append("p_OPERACION", p_OPERACION);

    arr = [];
   

    if ($("#chk_sin_dcto").is(':checked')) {
        arr.push("txt_monto");
        arr.push("txt_fec_pago");
        //arr.push("txt_cta_contable");
        arr.push("txt_gasto");
        arr.push("txt_proveedor");
        arr.push("txt_fec_vencimiento");
        //arr.push("txt_centro_costo");
        //arr.push("cbo_gasto");
        //arr.push("cbo_subgasto");
    } else {
        arr.push("txt_monto");
        arr.push("txt_fec_pago");
        //arr.push("txt_cta_contable");
        arr.push("txt_gasto");
        arr.push("txt_proveedor");
        arr.push("txt_dcto_ref");
        arr.push("txt_fec_vencimiento");
        //arr.push("txt_centro_costo");
        arr.push("txt_serie");
        arr.push("cbo_documento");
        //arr.push("cbo_gasto");
        //arr.push("cbo_subgasto");
    }

    //3
    if ($("#chk_compras").is(':checked')) {
        arr.push("cboTipoBien");
        arr.push("cbx_destino");

        arr.push("cbo_periodo");
        data.append("p_MES_TRIB", $("#cbo_periodo").val().split("-")[0]);
        data.append("p_ANIO_TRIB", $("#cbo_periodo").val().split("-")[1]);

        if ($("#cbo_periodo").val() !== undefined) {
            if (!VerificaFechaPeriodo()) {
                infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                $("#cbo_periodo").focus();
                return false;
            }
        }
    } else {
        if ($("#chkDeducible").is(':checked')) {
            arr.push("cbo_periodo");
            data.append("p_MES_TRIB", $("#cbo_periodo").val().split("-")[0]);
            data.append("p_ANIO_TRIB", $("#cbo_periodo").val().split("-")[1]);

            if ($("#cbo_periodo").val() !== undefined) {
                if (!VerificaFechaPeriodo()) {
                    infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                    $("#cbo_periodo").focus();
                    return false;
                }
            }
        } else {
            var index = arr.indexOf("cbo_periodo")
            arr.splice(index, 1)
            data.append("p_MES_TRIB", "");
            data.append("p_ANIO_TRIB", "");
        }
        
    }


    if (vErrors(arr)) {
        //$("#MuestraModalAceptar").modal("show");
        //bool = HideAceptar();
        // MuestraModal();
        // bool = HideAceptar();
        //if (bool) {
        //MuestraModal();
        Bloquear("ventana");
        //OPCION: G
        $.ajax({
            url: "vistas/CP/ajax/CPMAGAS.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    if (datos[0].ERROR != "X") {
                        if (datos[0].CODE_GENERADO.length <= 8) {
                            $("#txtCodigo").val(datos[0].CODE_GENERADO);
                            window.history.pushState("Object", "APROBACION DE GASTO", "/Default.aspx?f=cpmagas&codigo=" + datos[0].CODE_GENERADO);
                            $('#txtSerieRegistroInterno').val(datos[0].SERIE_INT);
                            $('#txtNroRegistroInterno').val(datos[0].NUMERO_INT);
                            CrearPagoDiverso();
                            $("#add_detalle").attr("disabled", true);
                            $("#btnBuscarCentroCto").attr("disabled", true);
                            $("#cbo_gasto").attr("disabled", true);
                            $("#cbo_subgasto").attr("disabled", true);
                            $("#txtSubTotal").attr("disabled", true);
                            $("#cabecera").attr("style", "display:none");
                            $(".btnEliminarDetalle").attr("style", "display:none");

                            $("#cabecera").attr("style", "display:none");
                            if (prmtACON == "SI") {
                                var sCodGasto = $('#hfcodgasto').val();
                                sCodGasto = $.trim(sCodGasto);
                                var oDocGasto = fnGetGasto(sCodGasto);
                                vAsientoContable.sCodDoc = sCodGasto;
                                vAsientoContable.objDoc = oDocGasto;

                                if (p_IND_DEDUCIBLE == "S") {
                                    $('#btnGenerarAsiento').click();
                                } else {
                                    $("#btnGenerarAsiento").attr("style", "display:display");
                                }
                            } else {
                                var sCodGasto = $('#hfcodgasto').val();
                                sCodGasto = $.trim(sCodGasto);
                                var oDocGasto = fnGetGasto(sCodGasto);
                                fnCargaTablaCuentasC(sCodGasto, oDocGasto, sCodGasto); //CAMBIO AVENGER
                            }
                        }
                    }
                    if (datos[0].ERROR == "X") {
                        noexitoCustom("DISCULPA! La provision con el numero de documento ya ha sido registrada anteriormente en el sistema.")
                    }
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Registrar, por favor registra autorizacion de documento recibo de pago para poder aprobar en pantalla NCMAUTD!")
            }
        });
        //   }
    }
    //} else {
    //    alertCustom("El documento ingresado ya se encuentra registrado!!!");
    //}
}

var fnGetGasto = function (sCodGasto) {
    let aoDocGasto = [];

    Bloquear("ventana");
    $.ajax({
        type: "post",
        url: "vistas/CP/ajax/CPMAGAS.ashx?OPCION=GET_GASTO&p_CODE_REF_GASTO=" + sCodGasto,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            Desbloquear("ventana");
            aoDocGasto = datos;
        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("No se encontró el documento de venta.");
        }
    });
    Desbloquear("ventana");

    return aoDocGasto;
};

var fnCargaTablaCuentasC = function (sCodGasto, oDocGasto, sCodAsiento) {
    $("#asientos_contables").load('../../vistas/CT/abstract/LAsientoContable.html', function (html) {
        $.getScript("../../vistas/CT/abstract/js/LAsientoContable.js")
            .done(function (script, textStatus) {
                vAsientoContable = LAsientoContable;
                vAsientoContable.sTipoMov = sCodModulo;
                vAsientoContable.sCodDoc = sCodGasto;
                vAsientoContable.objDoc = oDocGasto;
                vAsientoContable.init(sCodAsiento);
            });
    });

}

var obtenerDetalle = function () {
    var detalles = "";
    for (var i = 0; i < detallesGasto.length; i++) {
        detalles += detallesGasto[i].COD_GASTO + ";" +
            detallesGasto[i].GASTO + ";" +
            detallesGasto[i].COD_SUB_GASTO + ";" +
            detallesGasto[i].SUB_GASTO + ";" +
            detallesGasto[i].CUENTA + ";" +
            detallesGasto[i].NOM_CUENTA + ";" +
            detallesGasto[i].MONTO + ";" +
            detallesGasto[i].CC_CAB + ";" +
            detallesGasto[i].CC_COSTO + ";" +
            detallesGasto[i].GLOSA + ";" +
            detallesGasto[i].COD_OPERACION + ";" +
            detallesGasto[i].DES_OPERACION + ";" +
            detallesGasto[i].DETRACCION + ";" +
            detallesGasto[i].TOTAL_NETO +
            "||";
    }

    return detalles;

}


var Rechazar = function () {

    var data = new FormData();
    if ($("#chk_compras").is(':checked')) {
        p_IND_COMPRAS = 'S'
    } else {
        p_IND_COMPRAS = 'N'
    }
    data.append("OPCION", "G");
    data.append("p_CODE_REF_GASTO", $.trim($('#hfcodgasto').val()));
    data.append("p_ESTADO", "4");
    data.append("p_MONTO", $.trim(ReplaceTotal(",", "", $('#txt_monto').val())));
    data.append("p_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_IND_COMPRAS", p_IND_COMPRAS);
    var p_TIPO_BIEN = "";
    var p_OPERACION = "";
    if ($("#chk_compras").is(':checked')) {
        p_TIPO_BIEN = $("#cboTipoBien").val();
        p_OPERACION = $("#cbx_destino").val();

        //6
        if ($("#cbo_periodo").val() !== undefined) {
            if (!VerificaFechaPeriodo()) {
                infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                $("#cbo_periodo").focus();
                return false;
            }
        }

    } else {
        p_TIPO_BIEN = "0001";
        p_OPERACION = "DSTGRA";
    }
    data.append("p_HABIDO_IND", HABIDO_IND);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    data.append("p_OPERACION", p_OPERACION);
    if (vErrors(["txt_monto", "txt_fec_pago", "txt_cta_contable", "txt_gasto"])) {
        Bloquear("ventana");
        $.ajax({
            url: "vistas/CP/ajax/CPMAGAS.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("ventana");
                if (datos != null && datos != "") {
                    $("#txtCodigo").val(datos);
                    window.history.pushState("Object", "APROBACION DE GASTO", "/Default.aspx?f=cpmagas&codigo=" + datos);
                    $("#acciones_generales").remove();
                    $(".b").attr("disabled", true);
                    $("#rech").slideDown();
                    $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;");
                    $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;RECHAZADO");
                } else { noexito(); }
            }, error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("Error al Registrar!")
            }, complete: function (msg) {
                Desbloquear("ventana");
            }
        });
    }
}

var CrearPagoDiverso = function () {

    var data = new FormData();

    data.append("OPCION", "4");
    data.append("p_FACGADI_MONE_CODE", $("#hfmone_code").val());
    data.append("p_FACGADI_MONTO", $.trim(ReplaceTotal(",", "", $('#txt_monto').val())));
    data.append("p_FACGADI_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_FACGADI_REF_CODE", $.trim($('#hfcodgasto').val()));
    data.append("p_FACGADI_FECHA_VENCIMIENTO", $.trim($('#txt_fec_vencimiento').val()));
    data.append("p_FACGADI_FECHA_PAGO_PROG", $.trim($('#txt_fec_pago').val()));
    data.append("p_FACGADI_FECHA_TRANSACCION", $.trim($('#txt_fec_aprobacion').val()));
    data.append("p_PIDM", $.trim($("#hfpidm").val()));
    data.append("p_FECHA_EMISION", $.trim($('#txt_fec_aprobacion').val()));
    data.append("p_REF_DCTO_DESC", $.trim($("#hfdesc_dcto").val()));
    data.append("p_FACGADI_IMPORTE_PAGAR", $.trim(ReplaceTotal(",", "", $('#txt_importePagar').val()))); //DPORTA 21/01/2022

    if ($("#chk_sin_dcto").is(':checked')) {
        data.append("p_REF_DCTO_NRO", $.trim($("#txtSerieRegistroInterno").val()) + '-' + $.trim($("#txtNroRegistroInterno").val()));
    } else {
        data.append("p_REF_DCTO_NRO", $.trim($("#txt_serie").val()) + '-' + $.trim($("#txt_dcto_ref").val()));
    }
    data.append("p_COMC_CODE", $.trim($("#hf_conc_code").val()));


    Bloquear("ventana");

    $.ajax({
        url: "vistas/CP/ajax/CPMAGAS.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "") {

                CrearCredito(datos);
            } else { noexito(); }

        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("Error al Registrar!")
        }
    });





}

var Anular = function () {


    var data = new FormData();

    data.append("OPCION", "5");
    data.append("p_ESTADO", "3");
    data.append("p_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_CODE_REF_GASTO", $.trim($('#hfcodgasto').val()));

    Bloquear("ventana");

    $.ajax({
        url: "vistas/CP/ajax/CPMAGAS.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "") {

                if (datos == "E") {
                    $("#error").slideDown()
                    $("#aprob").slideUp()
                    $("#anul").slideUp()
                    $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                    $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;PAGADO/AMORTIZADO")
                    $("#acciones_generales").remove();

                } else {
                    $("#anul").slideDown()
                    $("#error").slideUp()
                    $("#aprob").slideUp()
                    $("#acciones_generales").remove();
                    $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                    $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;ANULADO")
                }

            } else { noexito(); }

        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("Error al Anular!")
        }
    });


}

var CrearCredito = function (cod) {

    var data = new FormData();

    data.append("OPCION", "6");
    data.append("p_CTLG_CODE", $("#hfctlg_code").val());
    data.append("p_SCSL_CODE", $("#hfscsl_code").val());
    data.append("p_COMC_CODE", cod);
    data.append("p_FECHA_EMISION", $.trim($('#txt_fec_aprobacion').val()));
    data.append("p_MONTO", $.trim(ReplaceTotal(",", "", $('#txt_monto').val())));
    data.append("p_TIPO_CRED_IND", "CR");
    data.append("p_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_FACGADI_FECHA_VENCIMIENTO", $.trim($('#txt_fec_vencimiento').val()));
    data.append("p_FACGADI_FECHA_PAGO_PROG", $.trim($('#txt_fec_pago').val()));
    data.append("p_TIPO_IND", "P");
    data.append("p_FACGADI_MONE_CODE", $("#hfmone_code").val());
    data.append("p_IMPORTE_PAGAR", $.trim(ReplaceTotal(",", "", $('#txt_importePagar').val()))); //DPORTA 21/01/2022

    Bloquear("ventana");

    $.ajax({
        url: "vistas/CP/ajax/CPMAGAS.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "") {


                //$("#aprobar").html("<i class='icon-trash'></i> Anular");
                //$("#aprobar").attr("href", "javascript:Anular();");
                //$("#aprobar").attr("class", "btn red");
                $("#acciones_generales").remove()
                $(".b").attr("disabled", true);
                $("#aprob").slideDown()
                $("#error").slideUp()
                $("#anul").slideUp()
                //  $("#rechazar").remove();
                $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;APROBADO")

            } else { noexito(); }

        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("Error al Anular!")
        }
    });

}

// CALCULOS //DPORTA 17/01/2022

function CalcularDetraccion() {

    //if ($("#hfCompletoInd").val() == "N") {

    var parametroDetraccion = parseFloat($("#hfParamDetraccion").val());

    var montoParaDetraccion = 0; // en MOBA o MOAL segun cbo_moneda
    var detraccionActual = 0;
    for (var i = 0; i < detallesGasto.length; i++) {
        //Suma montos netos de aquellos productos que tengan detraccion
        if (parseFloat(detallesGasto[i].DETRACCION) > 0) {
            montoParaDetraccion += parseFloat(detallesGasto[i].TOTAL_NETO);
            detraccionActual += parseFloat(detallesGasto[i].DETRACCION);
        }
    }

    //Muestra detraccion MOAL / MOBA
    //var valorCambio = parseFloat($("#txt_valor_cambio").val());
    //var valorCambioOfi = parseFloat($("#txt_valor_cambio_Oficial").val());

    //$("#txt_detraccion").val(detraccionActual.toFixed(2));


    //var detraccionMoal, montoParaDetraccionMoal;
    //if ($("#cbo_moneda :selected").attr("data-tipo") == "MOAL") {
    //    var detraccionMoba = detraccionActual * valorCambioOfi;
    //    detraccionMoal = detraccionActual;
    //    detraccionActual = detraccionMoba;
    //    var montoParaDetraccionMoba = montoParaDetraccion * valorCambioOfi;
    //    montoParaDetraccionMoal = montoParaDetraccion;
    //    montoParaDetraccion = montoParaDetraccionMoba;
    //}

    //$(".simboloMoneda").html($("#cbo_moneda :selected").attr("simbolo"));

    if (montoParaDetraccion >= parametroDetraccion && montoParaDetraccion != 0) {

        //$('#chk_detraccion').prop('checked', true).parent().addClass('checked');
        if ($("#cbo_moneda").val() == "0003") {
            parseFloat($("#hfMontoDetraccion").val(detraccionMoal)).toFixed(2);
        } else {
            parseFloat($("#hfMontoDetraccion").val(detraccionActual)).toFixed(2);
        }

        //$("#txt_num_op_detrac,#txt_fec_comp_detrac").prop('disabled', false);
        //$('#chk_percepcion, #chk_retencion').prop('checked', false).parent().removeClass('checked');
        //$('#txt_Percepcion, #txt_Retencion, #txt_num_comp_percep, #txt_estado_credito, #txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', true).val('');
        //$('#rbsinserie, #rbseriada').prop('disabled', true);
        //$('#rbsinserie').prop('checked', true).parent().addClass('checked');
        //$('#rbseriada').prop('checked', false).parent().removeClass('checked');
        //cargarCuentaDetraccion();
    }
    else {

        //if ($("#cbo_Empresa :selected").attr("agente-reten-ind") == "N" && $("#hfAgenteRetencionCliente").val() == "S") {//CAMBIO_RETENCION
        //    $('#chk_retencion').prop('checked', true).parent().addClass('checked');
        //    $('#txt_num_comp_reten, #txt_fec_comp_reten').prop('disabled', false).val('');

        //} else {
        //    $("#txt_Retencion").val("0.00");
        //}

        //$('#chk_detraccion').prop('checked', false).parent().removeClass('checked');
        //$("#txt_num_op_detrac, #txt_fec_comp_detrac").prop('disabled', true);
        $("#hfMontoDetraccion").val(0);
    }
    //}
}

//REFRESCAR LISTA DE GASTOS
function RecargarGastos() {
    Bloquear("MuestraModal");
    $.ajax({
        type: "post",
        url: "vistas/CP/ajax/CPMPGAS.ashx?OPCION=2&p_ESTADO_IND=1",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != "" && datos != null) {
                oTable.fnClearTable();
                oTable.fnAddData(datos);
                //setTimeout(function(){
                //    oTable.fnAdjustColumnSizing();
                //}, 800);
            }
            else {
                oTable.fnClearTable();
            }
        },
        error: function (msg) {
            alertCustom("Error al listar gastos.")
        }, complete: function (msg) {
            Desbloquear("MuestraModal");
        }
    });
}

function ReplaceTotal(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function AgregaItemCombo(Cod, Nom) {
    var selectEmpleado = $('#cbo_moneda');
    selectEmpleado.append('<option value="' + Cod + '">' + Nom + '</option>');
    selectEmpleado.val(Cod);
    selectEmpleado.change();
}

function AgregaItemComboDcto(Cod, Nom) {
    var selectDocumento = $('#cbo_documento');
    selectDocumento.append('<option value="' + Cod + '">' + Nom + '</option>');
    selectDocumento.val(Cod);
    selectDocumento.change();
}

function AgregaItemComboDctoInt(Cod, Nom) {
    var selectDocumento = $('#cboRegistroInterno');
    selectDocumento.append('<option value="' + Cod + '">' + Nom + '</option>');
    selectDocumento.val(Cod);
    selectDocumento.change();
}

function HideAceptar() {
    $("#MuestraModalAceptar").modal("hide")
    //setTimeout(function () {

    Aprobar();

    //}, 1000);

    return true;

}

function MuestraModal() {
    $(".botones").show();
    $("#MuestraModalAceptar").modal("show")
}

//aprobacion rapida

function Confirmar() {

    if ($("#chk_sin_dcto").is(":checked")) {
        if ($("#MuestraModalAceptar").hasClass('in')) {
            Bloquear("MuestraModalAceptar");
            $("#modal-confirmacion").modal("show");
        } else {
            Desbloquear("MuestraModalAceptar");
        }
    } else {
        HideAceptar1();
    }
   
    
}

function HideAceptar1() {
    //setTimeout(function () {

    if ($("#chk_sin_dcto").is(":checked")) {
        Desbloquear("MuestraModalAceptar");
        $("#modal-confirmacion").modal("hide"); 
    }    
    
    if (tipo_op == "AP") {
        Aprobar1();
    } else if (tipo_op == "RE") {
        Rechazar1();
    }
    return true;
}

var Aprobar1 = function () {

    var p_CODE_REF_GASTO = '';
    var p_ESTADO = '';
    var p_MONTO = "";
    var p_FECHA_APROBACION = '';
    var p_FECHA_OPERACION = '';
    var p_FECHA_VENCIMIENTO = '';
    var p_USUA_ID = "";
    var p_GLOSA = '';
    var p_NRO_DCTO_REF = '';

    var p_SERIE = '';
    var p_DCTO_CODE = '';
    var p_CENTRO_COSTO_CODE = '';
    var p_CENTRO_COSTO_CABECERA = '';
    var p_IND_COMPRAS = '';
    var p_SIN_DCTO = 'N';
    //var bool = false;
    var p_DETALLE_GASTO = '';
    var p_CTA_CONTABLE = '';
    var p_SCONC_CODE = '';
    var p_CONC_CODE = '';
    var p_DETRACCION_IND = 'N';
    var p_IMPORTE_DETRACCION = 0;
    var p_IMPORTE_PAGAR = 0;

    p_DETALLE_GASTO = obtenerDetalle();

    p_SIN_DCTO = $("#chk_sin_dcto").is(':checked') ? 'S' : 'N';
    p_CODE_REF_GASTO = obj_actual.CODIGO;
    p_ESTADO = '2';
    p_FECHA_APROBACION = $("#txt_fec_actual").val();
    p_FECHA_OPERACION = $("#txt_fec_actual").val();
    p_MONTO = obj_actual.MONTO;
    p_USUA_ID = $.trim($('#ctl00_txtus').val());
    p_FECHA_VENCIMIENTO = $.trim($('#txt_fec_vencimiento').val());
    p_GLOSA = Enter_MYSQL($('#txt_glosa').val());
    p_NRO_DCTO_REF = $.trim($('#txt_dcto_ref').val());


    p_CONC_CODE = $.trim(detallesGasto[0].COD_GASTO);
    p_SCONC_CODE = $.trim(detallesGasto[0].COD_SUB_GASTO);
    p_CENTRO_COSTO_CABECERA = detallesGasto[0].CC_CAB;
    p_CENTRO_COSTO_CODE = detallesGasto[0].CC_COSTO;

    p_CTA_CONTABLE = detallesGasto[0].CUENTA;


    p_SERIE = $.trim($('#txt_serie').val());
    p_DCTO_CODE = $.trim($('#cbo_documento').val());
    //p_CENTRO_COSTO_CODE = $("#txt_centro_costo").data("CodCentroCosto");
    //p_CENTRO_COSTO_CABECERA = $("#txt_centro_costo").data("CodCentroCostoCab");
    p_IND_COMPRAS = $("#chk_compras").is(':checked') ? 'S' : 'N';
    p_IND_DEDUCIBLE = $("#chkDeducible").is(':checked') ? 'S' : 'N';

    p_IMPORTE_PAGAR = obj_actual.IMPORTE_PAGAR;
    if (p_MONTO > p_IMPORTE_PAGAR && p_IMPORTE_PAGAR != 0) {
        p_DETRACCION_IND = 'S';
        p_IMPORTE_DETRACCION = p_MONTO - p_IMPORTE_PAGAR;
    }
    
    var data = new FormData();

    data.append("OPCION", "G");
    data.append("p_CODE_REF_GASTO", p_CODE_REF_GASTO);
    data.append("p_ESTADO", p_ESTADO);
    data.append("p_FECHA_APROBACION", p_FECHA_APROBACION);
    data.append("p_FECHA_OPERACION", p_FECHA_OPERACION);
    data.append("p_FECHA_VENCIMIENTO", p_FECHA_VENCIMIENTO);
    data.append("p_MONTO", p_MONTO);
    data.append("p_USUA_ID", p_USUA_ID);
    data.append("p_GLOSA", p_GLOSA);
    data.append("p_NRO_DCTO_REF", p_NRO_DCTO_REF);
    data.append("p_SIN_DCTO", p_SIN_DCTO);
    data.append("p_IND_DEDUCIBLE", p_IND_DEDUCIBLE);
    data.append("p_SERIE", p_SERIE);
    data.append("p_DCTO_CODE", p_DCTO_CODE);
    data.append("p_CENTRO_COSTO_CODE", p_CENTRO_COSTO_CODE);
    data.append("p_CENTRO_COSTO_CABECERA", p_CENTRO_COSTO_CABECERA);
    data.append("p_IND_COMPRAS", p_IND_COMPRAS);
    data.append("p_DETALLE_GASTO", p_DETALLE_GASTO);
    data.append("p_DETRACCION_IND", p_DETRACCION_IND);
    data.append("p_IMPORTE_DETRACCION", p_IMPORTE_DETRACCION);
    data.append("p_IMPORTE_PAGAR", p_IMPORTE_PAGAR);

    data.append("p_PIDM", obj_actual.PIDM_BENEF);
    var p_TIPO_BIEN = "";
    var p_OPERACION = "";
    if ($("#chk_compras").is(':checked')) {
        p_TIPO_BIEN = $("#cboTipoBien").val();
        p_OPERACION = $("#cbx_destino").val();
    } else {
        p_TIPO_BIEN = "0001";
        p_OPERACION = "DSTGRA";
    }
    data.append("p_HABIDO_IND", HABIDO_IND);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    data.append("p_OPERACION", p_OPERACION);

    //VerificaExiste(obj_actual.PIDM_BENEF, p_DCTO_CODE, p_SERIE, p_NRO_DCTO_REF);
    arr = ["txt_centro_costo"];

    //if ($("#hf_existe").val() == 0 ) {

    if ($("#chk_sin_dcto").is(':checked')) {
        arr.push("txt_fec_vencimiento");
    } else {
        arr.push("cbo_documento");
        arr.push("txt_serie");
        arr.push("txt_fec_vencimiento");
        arr.push("txt_dcto_ref");
    }
    if ($("#chk_compras").is(':checked')) {

        arr.push("cbo_periodo");
        data.append("p_MES_TRIB", $("#cbo_periodo").val().split("-")[0]);
        data.append("p_ANIO_TRIB", $("#cbo_periodo").val().split("-")[1]);

        //4
        if ($("#cbo_periodo").val() !== undefined) {
            if (!VerificaFechaPeriodo()) {
                infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                $("#cbo_periodo").focus();
                return false;
            }
        }

    } else {

        if ($("#chkDeducible").is(':checked')) {
            arr.push("cbo_periodo");
            data.append("p_MES_TRIB", $("#cbo_periodo").val().split("-")[0]);
            data.append("p_ANIO_TRIB", $("#cbo_periodo").val().split("-")[1]);

            if ($("#cbo_periodo").val() !== undefined) {
                if (!VerificaFechaPeriodo()) {
                    infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                    $("#cbo_periodo").focus();
                    return false;
                }
            }
        } else {
            var index = arr.indexOf("cbo_periodo")
            if (index != -1) {
                arr.splice(index, 1)
            }
            data.append("p_MES_TRIB", "");
            data.append("p_ANIO_TRIB", "");
        }
        
    }

    if (vErrors(arr)) {

        Bloquear("MuestraModalAceptar")
        //data.append("OPCION", "G");
        $.ajax({
            url: "vistas/CP/ajax/CPMAGAS.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModalAceptar");
                if (datos != null) {
                    if (datos[0].ERROR != "X") {
                        if (datos[0].CODE_GENERADO.length <= 8) {
                            $("#hfCodigo").val(datos[0].CODE_GENERADO);

                            $('#txt_serie_int').val(datos[0].SERIE_INT);
                            $('#txt_dcto_ref_int').val(datos[0].NUMERO_INT);

                            CrearPagoDiverso1(); 
                            //Para generar el asiento contable de manera automática.
                            console.log(obj_actual);
                            if (prmtACON == "SI") {
                                btnGenerarAsiento(obj_actual.CODIGO);
                            }
                        }
                    }
                    if (datos[0].ERROR == "X") {
                        $("#MuestraModalAceptar").modal('hide')
                        noexitoCustom("DISCULPA! La provision con el numero de documento ya ha sido registrada anteriormente en el sistema.")

                    }
                }

            },
            error: function (msg) {
                Desbloquear("MuestraModalAceptar");
                noexitoCustom("Error al Registrar!")
            }
        });

    }
}

var btnGenerarAsiento = function (sCodGasto1) {//dporta
    
    if (sCodGasto1 !== "") {
        if (sCodGasto1 === "") {
            infoCustom("Imposible continuar. ¡El documento no está completado!");
            return;
        }
        

        var oDocGasto1 = fnGetGasto(sCodGasto1);
        if (oDocGasto1.length === 0) {
            infoCustom("No se encontró el Documento: " + sCodGasto1);
            return;
        }

        var sAnuladoInd = oDocGasto1[0].AnuladoInd;
        if (sAnuladoInd === "S") {
            infoCustom("Imposible continuar. ¡El documento está anulado!");
            return;
        }

        var sCompletoInd = oDocGasto1[0].CompletoInd;
        if (sCompletoInd === "N") {
            infoCustom("Imposible continuar. ¡El documento no está completado!");
            return;
        }

        var sCodMovContab = oDocGasto1[0].MOVCONT_CODE;
        sCodMovContab = (sCodMovContab === null ? "" : sCodMovContab);
        if (sCodMovContab === "") {
            fnGenerarAsiento(sCodGasto1);
        }
    }
};

var fnGenerarAsiento = function (sCodGasto1) { //dporta

    var data = new FormData();
    data.append("OPCION", "GEN_ASIENTO");
    data.append("p_CODE", sCodGasto1);
    data.append("USUA_ID", $("#ctl00_txtus").val());
    data.append("p_NCMOCONT_CODIGO", sCodModulo);

    Bloquear("ventana");
    $.ajax({
        type: "POST",
        url: "vistas/cp/ajax/cpmagas.ashx",
        contentType: false,
        data: data,
        processData: false,
        async: false,
        success: function (response) {
            Desbloquear("ventana");
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

            $("#divGenAsiento").hide();

            //fnGetMovContable(response);
            //fnGetMovContable(sCodGasto1); //AVENGER

            //exito();
        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("No se pudo generar el asiento.");
        }
    });
    Desbloquear("ventana");
};

var fnGetMovContable = function (sCodMovContab) {//dporta
    $.ajax({
        type: "post",
        url: "vistas/CT/ajax/CTMMOCO.ASHX?sOpcion=LMCO&p_DCTO_CODE=" + sCodMovContab,
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

var Rechazar1 = function () {

    var data = new FormData();

    data.append("OPCION", "G");
    data.append("p_CODE_REF_GASTO", obj_actual.CODIGO);
    data.append("p_ESTADO", "4");
    data.append("p_MONTO", obj_actual.MONTO);
    data.append("p_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_IND_COMPRAS", obj_actual.IND_COMPRAS);
    var p_TIPO_BIEN = "";
    var p_OPERACION = "";
    if ($("#chk_compras").is(':checked')) {
        p_TIPO_BIEN = $("#cboTipoBien").val();
        p_OPERACION = $("#cbx_destino").val();

        //4
        if ($("#cbo_periodo").val() !== undefined) {
            if (!VerificaFechaPeriodo()) {
                infoCustom("La Fecha de Emisión NO debe exceder al Periodo seleccionado");
                $("#cbo_periodo").focus();
                return false;
            }
        }
    } else {
        p_TIPO_BIEN = "0001";
        p_OPERACION = "DSTGRA";
    }
    data.append("p_HABIDO_IND", HABIDO_IND);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    data.append("p_OPERACION", p_OPERACION);
    Bloquear("ventana");

    $.ajax({
        url: "vistas/CP/ajax/CPMAGAS.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "") {
                $("#MuestraModalAceptar").modal('hide');
                exito();
                $(".botones").hide();
                $(btn_actual).parent().parent().find(".btnpagar").remove();
                $(btn_actual).remove();              

                oTableGST.fnDeleteRow(posicion);

            } else { noexito(); }

        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("Error al Registrar!")
        }
    });


}


let VerificaFechaPeriodo = function () {
    var continuar = false;
    var mesEmision = $("#txt_fec_vencimiento").val().split("/")[1]; //$("#txt_fec_emision").val() :: "10/02/2016"
    var anioEmision = $("#txt_fec_vencimiento").val().split("/")[2];
    var mesPeriodo = $("#cbo_periodo").val().split("-")[0];//$("#cbo_periodo").val() :: "1-2016"
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

var CrearPagoDiverso1 = function () {


    console.log(obj_actual);
    var data = new FormData();

    data.append("OPCION", "4");
    data.append("p_FACGADI_MONE_CODE", obj_actual.MONE_CODE);
    data.append("p_FACGADI_MONTO", obj_actual.MONTO);
    data.append("p_FACGADI_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_FACGADI_REF_CODE", obj_actual.CODIGO);
    data.append("p_FACGADI_FECHA_VENCIMIENTO", $.trim($('#txt_fec_vencimiento').val()));
    data.append("p_FACGADI_FECHA_PAGO_PROG", $("#txt_fec_actual").val());
    data.append("p_FACGADI_FECHA_TRANSACCION", $("#txt_fec_actual").val());
    data.append("p_PIDM", obj_actual.PIDM_BENEF);
    data.append("p_FECHA_EMISION", $("#txt_fec_actual").val());
    data.append("p_REF_DCTO_DESC", obj_actual.CONCEPTO + ' ' + obj_actual.SUBCONCEPTO);
    data.append("p_REF_DCTO_NRO", $.trim($("#txt_serie").val()) + "-" + $.trim($("#txt_dcto_ref").val()));
    data.append("p_COMC_CODE", obj_actual.CONCEPTO_CODE);
    data.append("p_FACGADI_IMPORTE_PAGAR", obj_actual.IMPORTE_PAGAR);  //DPORTA 21/01/2022

    Bloquear("MuestraModalAceptar")

    $.ajax({
        url: "vistas/CP/ajax/CPMAGAS.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "") {

                CrearCredito1(datos);
            } else { noexito(); }

        },
        error: function (msg) {
            Desbloquear("MuestraModalAceptar");
            noexitoCustom("Error al Registrar!")
        }
    });





}

var Anular1 = function () {


    var data = new FormData();

    data.append("OPCION", "5");
    data.append("p_ESTADO", "3");
    data.append("p_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_CODE_REF_GASTO", $.trim($('#hfcodgasto').val()));

    Bloquear("ventana");

    $.ajax({
        url: "vistas/CP/ajax/CPMAGAS.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "") {

                if (datos == "E") {
                    $("#error").slideDown()
                    $("#aprob").slideUp()
                    $("#anul").slideUp()
                    $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                    $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;PAGADO/AMORTIZADO")
                    $("#acciones_generales").remove();

                } else {
                    $("#anul").slideDown()
                    $("#error").slideUp()
                    $("#aprob").slideUp()
                    $("#acciones_generales").remove();
                    $("#estado").children().children().attr("style", "text-align: -webkit-center;font-size: large;font-family: sans-serif;font-weight: bold;")
                    $("#estado").children().children().html("<i class='icon-asterisk'></i>&nbsp;&nbsp;ANULADO")
                }

            } else { noexito(); }

        },
        error: function (msg) {
            Desbloquear("ventana");
            noexitoCustom("Error al Anular!")
        }
    });


}

var CrearCredito1 = function (cod) {

    var data = new FormData();

    data.append("OPCION", "6");
    data.append("p_CTLG_CODE", obj_actual.CTLG_CODE);
    data.append("p_SCSL_CODE", obj_actual.SCSL_CODE);
    data.append("p_COMC_CODE", cod);
    data.append("p_FECHA_EMISION", $("#txt_fec_actual").val());
    data.append("p_MONTO", obj_actual.MONTO);
    data.append("p_TIPO_CRED_IND", "CR");
    data.append("p_USUA_ID", $.trim($('#ctl00_txtus').val()));
    data.append("p_FACGADI_FECHA_VENCIMIENTO", $("#txt_fec_actual").val());
    data.append("p_FACGADI_FECHA_PAGO_PROG", $("#txt_fec_actual").val());
    data.append("p_TIPO_IND", "P");
    data.append("p_FACGADI_MONE_CODE", obj_actual.MONE_CODE);
    data.append("p_IMPORTE_PAGAR", obj_actual.IMPORTE_PAGAR); //DPORTA 21/01/2022

    Bloquear("MuestraModalAceptar")

    $.ajax({
        url: "vistas/CP/ajax/CPMAGAS.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("MuestraModalAceptar");
            if (datos != null && datos != "") {
                $("#MuestraModalAceptar").modal('hide')
                exito();
                $(".botones").hide();
                $(btn_actual).parent().parent().find(".btnrechazar").remove();
                $(btn_actual).remove();
                $(".botones").hide();

                oTableGST.fnDeleteRow(posicion);
                //$("#btn_filtrar").click();

            } else { noexito(); }

        },
        error: function (msg) {
            Desbloquear("MuestraModalAceptar");
            noexitoCustom("Error al Anular!")
        }
    });

}

//function VerificaExiste(p_pidm, p_dcto, p_serie, p_numero) {

//    if (p_dcto != '' && (p_serie != '' || p_numero != '')) {
//        var data = new FormData();

//        data.append("OPCION", "VERIFICA");

//        data.append("p_PIDM_BENEFICIARIO", p_pidm);
//        data.append("p_TIPO_DCTO", p_dcto);
//        data.append("p_SERIE", p_serie);
//        data.append("p_NUMERO", p_numero);

//        $.ajax({
//            url: "vistas/CP/ajax/CPMPGAS.ASHX",
//            type: "post",
//            contentType: false,
//            data: data,
//            async: false,
//            processData: false,
//            cache: false,
//            success: function (datos) {
//                $("#hf_existe").val(datos);
//            },
//            error: function (msg) {
//                noexitoCustom("Error al Verificar Documento!");
//            }
//        });
//    }

//}


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
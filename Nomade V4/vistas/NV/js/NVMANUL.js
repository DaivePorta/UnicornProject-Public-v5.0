var NVLANUL = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDoc').select2();
        $('#cboVendedor').select2();
        $('#cboProducto').select2();
        $('#cboCliente').select2();
        $('#cboEstado').select2();
        $("#cboTipoDoc").select2();

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

        //$("#txtSerie").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#txtNumero").inputmask({ "mask": "9", "repeat": 9, "greedy": false });

    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        //ColVis_Button TableTools_Button     
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
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
                    // $('#cboEmpresa').append('<option value = "TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    fillCboEstablecimiento();

                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());

                    fillCboTipoDoc();
                    fillVendedor();
                    //fillProducto();
                    //fillCliente();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
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
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillCboTipoDoc = function () {
        var opcion = 'VENT';
        var select = $('#cboTipoDoc');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=DOCESPECIFICO&TIPO_DCTO=" + opcion + "&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                $(select).append('<option Value="TODOS">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                    $(select).select2('val', 'TODOS');
                } else {
                    $(select).select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("No se pudo listar los Tipos de Documentos correctamente.");
            }
        });
    };

    var fillVendedor = function () {
        var selectEst = $('#cboVendedor');
        // var CTLG_CODE = ($("#cboEmpresa").val() == "TODOS") ? '' : $("#cboEmpresa").val();
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/NVLDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
                "&CTLG=" + $("#cboEmpresa").val() +
                "&SCSL=" + $("#cboEstablecimiento").val() +
                "&p_ESTADO_IND=" + "A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboVendedor').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].USUARIO + '">' + datos[i].NOMBRE_EMPLEADO + '</option>');
                    }
                    $('#cboVendedor').select2('val', 'TODOS');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboVendedor').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillProducto = function () {
        var selectEst = $('#cboProducto');
        //var CTLG_CODE = ($("#cboEmpresa").val() == "TODOS") ? '' : $("#cboEmpresa").val();
        $.ajax({
            type: "post",
            //url: "vistas/no/ajax/NOMDOCC.ashx?OPCION=LPROD&CTLG_CODE=" + $("#cboEmpresa").val(),
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cboEmpresa').val() + "&SCSL=" + $('#cboEstablecimiento').val(),
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#cboEmpresa').val() + "&ALMC_CODE=" + $('#cboEstablecimiento').val() + "&SERIADO_IND=" + "",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboProducto').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE_COMERCIAL + '</option>');
                    }
                    $('#cboProducto').select2('val', 'TODOS');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboProducto').select2('val', '');
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
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
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
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var obtenerDocumentos = function () {
        var data = new FormData();
        var CTLG_CODE = $("#cboEmpresa").val();
        var SCSL_CODE = $("#cboEstablecimiento").val();
        var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
        var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
        var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : parseFloat($("#cboCliente :selected").val()).toString();
        var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
        var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
        
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('DCTO_CODE', DCTO_CODE);
        data.append('VENDEDOR', VENDEDOR);
        data.append('CLIENTE', CLIENTE);
        data.append('PRODUCTO', PRODUCTO);
        data.append('ESTADO', ESTADO);
        data.append('SERIE_DCTO', $("#txtSerie").val());
        data.append('NUM_DCTO', $("#txtNumero").val());
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());
        
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLANUL.ashx?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divDocumento').html(datos);                         
               $("#tblDocumento").dataTable({
                   "order": [2, 'desc'],
                   "sDom": 'TC<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
                   "scrollX": true,
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
               });
               //$("#tblDocumento").DataTable();
               actualizarEstilos();

               $('#tblDocumento').on('dblclick', 'tr', function () {
                   if ($(this).hasClass('selected')) {
                       $(this).removeClass('selected');
                   }
                   else {            
                       $("#tblDocumento tr.selected").removeClass('selected');
                       $(this).addClass("selected");
                       table = $('#tblDocumento').dataTable();
                       var pos = table.fnGetPosition(this);
                       var row = table.fnGetData(pos);
                       var code = row[0];
                       //window.location.href = "?f=nvmanul&codigo=" + code;
                       window.open("?f=nvmanul&codigo=" + code, '_blank');
                   }
               });

               $('#tblDocumento tbody').on('click', 'td.vta', function (e) {
                   e.stopPropagation();
                   let oTr = $(this).parent();

                   table = $('#tblDocumento').dataTable();
                   let pos = table.api(true).row(oTr).index();
                   let row = table.fnGetData(pos);
                   let sCodVenta = row[0];
                   let sPrefijo = sCodVenta.substring(0, 2);
                   if (sPrefijo == 'AP') {
                       window.open("?f=nvmanti&codigo=" + sCodVenta, '_blank');
                   } else {
                       window.open("?f=nvmdocv&codigo=" + sCodVenta, '_blank');
                   }
               });

               $('#tblDocumento tbody').on('click', 'a', function () {
                   $(this).parent().parent().addClass('selected');
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

    function cargaInicial() {
        var controlProCli = false
        $("#txtHasta").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1
        }).datepicker("setDate", new Date());
       
        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboTipoDoc();
            fillVendedor();
            //fillProducto();
            //fillCliente();
            Desbloquear("ventana");
        });

        $("#btnBuscarDoc").on("click", function () {
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                obtenerDocumentos();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                obtenerDocumentos();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });

        $("#btnBusquedaAvanz").on("click", function () {
            $("#iconAvanz").removeClass();
            let bVer = $("#btnBusquedaAvanz").data("ver");
            if (bVer) {
                $("#btnBusquedaAvanz").data("ver", false);
                $(".bavanzado").hide();
                $("#iconAvanz").addClass("icon-chevron-down");
            } else {
                $("#btnBusquedaAvanz").data("ver", true);
                $(".bavanzado").show();
                $("#iconAvanz").addClass("icon-chevron-up");

                if (!controlProCli) {
                    fillProducto();
                    fillCliente();
                }
                controlProCli = true;
            }
        });


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
        
        $("#txtDesde").val(fNueva);
                            
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargaInicial();
            //obtenerDocumentos();
        }
    };
}();

var monedaCabecera;
var flagAnular = true;
var NVMANUL = function () {

    var plugins = function () {       
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDoc').select2();
        $('#cboVendedor').select2();
        $('#cboCliente').select2();
        $('#cboEstado,#cboDocumentoVenta,#cboSerieDocVenta').select2();
        $('#cboMotivo').select2();

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

        $("#txtSerie").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#txtNumero").inputmask({ "mask": "9", "repeat": 9, "greedy": false });

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
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
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
                    $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val());
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboEstablecimiento').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    //Tipo Documento de Venta
    var fillCboTipoDoc = function () {
        var selectEst = $('#cboDocumentoVenta');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVLDOCV.ashx?OPCION=1&CTLG_CODE=" + $("#cboEmpresa").val() + "&COMP_VENT_IND=E",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_CORTA + '</option>');
                    }
                    $('#cboDocumentoVenta').select2('val', '');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboDocumentoVenta').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillVendedor = function () {
        var selectEst = $('#cboVendedor');
        // var CTLG_CODE = ($("#cboEmpresa").val() == "TODOS") ? '' : $("#cboEmpresa").val();
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVLDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboVendedor').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].PIDM + '">' + datos[i].USUARIO + '</option>');
                    }
                    $('#cboVendedor').select2('val', 'TODOS');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboVendedor').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var fillCliente = function () {
        var selectEst = $('#cboCliente');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboCliente').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].ID + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                    $('#cboCliente').select2('val', 'TODOS');
                } else {
                    selectEst.empty();
                    selectEst.append('<option></option>');
                    $('#cboCliente').select2('val', '');
                }

            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    }

    var fillcboMoneda = function () {
        $('#cbo_moneda').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_moneda').empty();
                $('#cbo_moneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_moneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                }
                $('#cbo_moneda').val(datos[pos].CODIGO);
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cbo_moneda').select2();
    }

    var fillCboModoPago = function () {
        $('#cbo_modo_pago').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=4",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_modo_pago').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_modo_pago').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cbo_modo_pago').val(datos[0].CODIGO);
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cbo_modo_pago').select2();
    }

    var fillCboMotivoAnulacion = function (motivoCode,tipo) {
        $('#cboMotivo').select2('destroy');
              

        Bloquear($($('#cboMotivo').parents("div")[0]));
        var data = new FormData();
        data.append('p_CODE', '');
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_TIPO_DCTO', tipo);
        data.append('p_ESTADO_IND', "");
       
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMMOAN.ashx?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear($($('#cboMotivo').parents("div")[0]));
           $('#cboMotivo').empty();
           $('#cboMotivo').append('<option value=""  desc="" ></option>');
           if (datos != null && datos.length > 0) {
               for (var i = 0; i < datos.length; i++) {
                   $('#cboMotivo').append('<option value="' + datos[i].CODIGO + '"  desc="' + datos[i].DESC_MOTIVO + '" >' + datos[i].MOTIVO + '</option>');
               }
           }          
           $('#cboMotivo').select2();
           if (motivoCode != undefined && motivoCode != "") {
               $('#cboMotivo').select2("val", motivoCode).change();
               $('#cboMotivo').attr("disabled", "disabled");
           }
       })
       .error(function () {
           Desbloquear($($('#cboMotivo').parents("div")[0]));
           $('#cboMotivo').select2();
       });
    }

    var AnularDctoVenta = function () {

        let sCodVenta = $("#txtNumDctoComp").val();
        let sNroSec = $("#txtNumSec").val();
        let sIdUsuarioAnula = $("#ctl00_txtus").val();
        let sComentarioAnula = $("#txtAnulacionCom").val();
        let sDevEfectivo = ($("#chkDevEfectivo").is(":checked") ? "S" : "N");
        let sDevDespacho = ($("#chkDevDespacho").is(":checked") ? "S" : "N");
        let sMotivo = $("#cboMotivo").val();


        let sPrefijo = sCodVenta.substring(0, 2);
        let bEsAnticipo = (sPrefijo == "AP" ? true : false);
        let sOPCION = (bEsAnticipo ? "2" : "1");

        let data = new FormData();
        data.append('OPCION', sOPCION);
        data.append('VTAC_CODE', sCodVenta);
        data.append('NUM_SEQ_DOC', sNroSec);
        data.append('ANULAC_ID', sIdUsuarioAnula);
        data.append('CMNT_ANULAC', sComentarioAnula);
        data.append('DEVOLUCION_EFECTIVO', sDevEfectivo);
        data.append('DEVOLUCION_DESPACHO', sDevDespacho);
        data.append('MOTIVO_CODE', sMotivo);

        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmanul.ASHX",
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
                    alertCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    alertCustom(response);
                    return;
                }

                if (response == "OK") {
                    exito();
                    $("#chkAnulado").attr("checked", true).parent().addClass("checked");
                    $("#txtAnulacionCom").attr("disabled", "disabled");
                    $("#btnAnular").attr("style", "display:none;");
                    //$("#divDevoluciones").attr("style", "display:none;");
                    $("#chkDevEfectivo").prop("disabled", true);
                    $("#chkDevDespacho").prop("disabled", true);
                    $("#cboMotivo").attr("disabled", "disabled");
                }
                else if (response == "RETN") {
                    infoCustom2("El documento tiene asociado un comprobante de Retención, NO podrá anularlo.");
                }
                else if (response == "DETR") {
                    infoCustom2("El documento tiene amortizaciones por Detracción, NO podrá anularlo.");
                }
                else {
                    alertCustom("ERROR: " + response);
                }
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });

    };

    function eventoControles() {
        $("#cboEmpresa").on("change", function () {
            Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboTipoDoc();
            fillVendedor();
            fillCliente();
            Desbloquear("ventana");
        });

        $("#cbo_moneda").on("change", function () {
            $('#simbolo_moneda').text($('#cbo_moneda :selected').attr('simbolo'));
        });

        $("#btnAnular").on("click", function () {
            if ($("#chkAnulado").is(":checked") || $("#chkContable").is(":checked")) {
                alertCustom("El documento ya no puede ser anulado!")
            }
            else if (!$("#chkCompleto").is(":checked")) {
                alertCustom("El documento aún no puede ser anulado. Debe estar completado!")
            }
            else if (!flagAnular) {
                alertCustom("El documento no puede ser anulado porque ya fue enviado a SUNAT!")
            }
            else {
                if (vErrors(['txtAnulacionCom', 'cboMotivo'])) {
                    
                    if ($("#hfEstadoDespacho").val() != "N" && !$("#chkDevDespacho").is(":checked")) {
                        $("#msgDespacho").html("Se encontraron salidas de almacén registradas para este documento y NO se seleccionó  'Devolución Despacho'. NO se  retornará stock entregado.");
                    }
                    $("#modal-confirmar").modal("show");
                }
            }
        });

        $("#btnAceptar").on("click", function () {
            Bloquear("ventana");
            AnularDctoVenta();
            $("#modal-confirmar").modal("hide");
            $("#msgDespacho").html("");
            Desbloquear("ventana");
        });

        $("#btnCancelar").on("click", function () {
            $("#modal-confirmar").modal("hide");
            $("#msgDespacho").html("");
        });

        $("#cboMotivo").on("change", function () {
            if ($("#cboMotivo").val() != "") {
                $($("#bloqueInfo p")[0]).html("<b>DESCRIPCIÓN:</b> "+$("#cboMotivo :selected").attr("desc"));
            } else {
                $($("#bloqueInfo p")[0]).html("[SELECCIONE MOTIVO]");
            }
        });

        $("#info_btnf").on("click", function () {
            $("#bloqueInfo").slideToggle();
        });

        $("#btnVerDoc").on("click", function (e) {
            e.stopPropagation();

            if (!vErrors(['txtNumDctoComp'])) {
                return;
            }

            let sCodVenta = $('#txtNumDctoComp').val();
            let sPrefijo = sCodVenta.substring(0, 2);
            if (sPrefijo == 'AP') {
                window.open("?f=nvmanti&codigo=" + sCodVenta, '_blank');
            } else {
                window.open("?f=nvmdocv&codigo=" + sCodVenta, '_blank');
            }
        });
    };

    var fnGetVenta = function (sCodVenta) {
        let aoVenta = [];
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LDOCC&p_FVBVTAC_CODE=" + sCodVenta,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                aoVenta = datos;
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });
        Desbloquear("ventana");

        return aoVenta;
    };

    var fnGetAnticipo = function (sCodVenta) {
        let aoVenta = [];

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/NVMANTI.ashx?OPCION=2&p_CTLG_CODE=&p_SCSL_CODE=&p_ACCION=5&p_TIPO=1&p_CODE_COTI=" + sCodVenta,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                aoVenta = datos;                
            },
            error: function (msg) {
                alertCustom(msg);
            }
        });
        Desbloquear("ventana");    

        return aoVenta;
    };
        
    var fnGetSaldoDocVta = function (sCodVenta) {
        let aoDocSaldoVta = [];

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NV/ajax/NVMDOCV.ashx?OPCION=GET_SALDO_DOC_VTA&p_CODE=" + sCodVenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("ventana");
                aoDocSaldoVta = datos;
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se encontró el documento de venta.");
            }
        });
        Desbloquear("ventana");

        return aoDocSaldoVta;
    };

    var cargaInicial = function () {
        let sCodVenta = ObtenerQueryString("codigo");

        if (sCodVenta == undefined) {
            return;
        }

        let aoVenta = [];
        let sPrefijo = sCodVenta.substring(0, 2);
        let bEsAnticipo = (sPrefijo == "AP" ? true : false);
        if (bEsAnticipo) {
            aoVenta = fnGetAnticipo(sCodVenta);
        } else {
            aoVenta = fnGetVenta(sCodVenta);
        }
        
        if (aoVenta.length === 0) {
            return;
        }

        if (aoVenta[0].ESTADO_DOC_ELECT !== 'N') {
            flagAnular = false;
        }
        

        $("#txtNumDctoComp").val(aoVenta[0].CODIGO);
        $("#txtNumSec").val(aoVenta[0].SECUENCIA);

        if (aoVenta[0].COMPLETO == "SI") {
            $("#chkCompleto").attr("checked", true).parent().addClass("checked");
        }

        if (aoVenta[0].ANULADO == "SI") {
            $("#chkAnulado").attr("checked", true).parent().addClass("checked");
            //ANULAC_ID  FECHA_ANULAC      CMNT_ANULAC
            $("#txtAnulacionCom").val(aoVenta[0].CMNT_ANULAC);
            $("#txtFechaAnulacion").val(aoVenta[0].FECHA_ANULAC);
            $("#txtUsuarioAnulacion").val(aoVenta[0].ANULAC_ID);
            $("#divDatosAnulacion").attr("style", "display:block;");

            $("#txtAnulacionCom").attr("readonly", "readonly");
            $('#divEfectvo').show();
            $('#divDespacho').show();
            $("#btnAnular").attr("style", "display:none;");
            $("#chkDevEfectivo").prop("disabled", true);
            $("#chkDevDespacho").prop("disabled", true);

            if (!bEsAnticipo) {
                if (aoVenta[0].MOTIVO_EFECTIVO == "S") {
                    $("#chkDevEfectivo").attr("checked", true).parent().addClass("checked");
                }
                if (aoVenta[0].MOTIVO_DESPACHO == "S") {
                    $("#chkDevDespacho").attr("checked", true).parent().addClass("checked");
                }
            }
        }

        if (aoVenta[0].SCSL_EXONERADA_IND == "S") {
            $("#txtImpuesto2").val("NO APLICA - EXONERADA");
        } else {
            $("#txtImpuesto2").val("SI APLICA");
        }
                

        if (bEsAnticipo){
            $("#hfEstadoDespacho").val("N");
        } else {
            if (aoVenta[0].DESPACHADO_IND == "S" || aoVenta[0].DESPACHADO_IND == "P") {
                $("#hfEstadoDespacho").val(aoVenta[0].DESPACHADO_IND);
            }
        }

        if ($("#hfEstadoDespacho").val() === "N") {
            $("#chkDevDespacho").prop("disabled", true);
        }
                
        if (aoVenta[0].PROVISIONADO == "SI") {
            $("#chkContable").attr("checked", true).parent().addClass("checked");
        }

        $("#cboEmpresa").select2('val', aoVenta[0].EMPRESA);
        $("#cboEmpresa").change();
        $("#cboEstablecimiento").select2('val', aoVenta[0].SUCURSAL);
        $("#cboEstablecimiento").change();

        $("#cbo_doc_origen").select2('val', aoVenta[0].DCTO_TIPO_CODE_REF);
        $("#cbo_doc_origen").change();

        $("#cbo_moneda").select2('val', aoVenta[0].MONEDA);
        $("#cbo_moneda").change();

        $("#cbo_modo_pago").select2('val', aoVenta[0].MOPA);
        $("#cbo_modo_pago").change();

        //Carga datos de cliente
        $("#txtClientes").val(aoVenta[0].RAZON_SOCIAL);
        $("#txtDctoCliente").val(aoVenta[0].CLIE_DCTO_DESC);
        $("#txtNroDctoCliente").val(aoVenta[0].CLIE_DCTO_NRO);
        $("#cboVendedor").select2("val", aoVenta[0].USVE_USUA_ID);
        $("#hfPIDM").val(aoVenta[0].CLIE_PIDM);

        $("#cboDocumentoVenta").select2("val", aoVenta[0].DCTO_CODE);

        $("#cboSerieDocVenta").empty();
        $("#cboSerieDocVenta").append('<option value="' + aoVenta[0].CODIGO + '" >' + aoVenta[0].DCTO_SERIE + '</option>');
        $("#cboSerieDocVenta").select2("val", aoVenta[0].CODIGO);
        $("#txtNroDocVenta").val(aoVenta[0].DCTO_NRO);
        $("#txt_valor_cambio").val(aoVenta[0].VALOR_CAMBIO);

        $("#txt_comentario").val(aoVenta[0].GLOSA);

        //CARGA INICIAL DE TOTALES              
        var baseImponible = parseFloat(aoVenta[0].IMPORTE_EXO) + parseFloat(aoVenta[0].IMPORTE_GRA) + parseFloat(aoVenta[0].IMPORTE_INA);

        $("#txt_base_imponible").val(baseImponible.toFixed(2));
        $("#txt_descuento").val(aoVenta[0].DESCUENTO);
        $("#txt_isc").val(aoVenta[0].ISC);
        $("#txtOpExonerada").val(aoVenta[0].IMPORTE_EXO);
        $("#txtOpGravada").val(aoVenta[0].IMPORTE_GRA);
        $("#txtOpInafecta").val(aoVenta[0].IMPORTE_INA);
        $("#txt_impuesto").val(parseFloat(aoVenta[0].PCTJ_IGV).toFixed(2));
        $("#txt_impuesto_calc").val(aoVenta[0].IGV);

        var subtotal = baseImponible + parseFloat(aoVenta[0].IGV);
        $("#txt_subtotal").val(subtotal.toFixed(2));
        //Retenciones
        $("#txt_detraccion").val(aoVenta[0].DETRACCION)
        $("#txt_Retencion").val(aoVenta[0].RETENCION)
        $("#txt_Percepcion").val(aoVenta[0].PERCEPCION)
        $('#txtRedondeo2').val(aoVenta[0].REDONDEO);
        $('#txtDonacion2').val(aoVenta[0].DONACION);
        $("#txt_monto_total").val(aoVenta[0].IMPORTE);
        //FIN CARGA TOTALES
        $("#txt_fec_vencimiento").val(aoVenta[0].VENCIMIENTO);
        $("#txt_fec_transaccion").val(aoVenta[0].TRANSACCION);
        $("#txt_fec_emision").val(aoVenta[0].EMISION);

        monedaCabecera = aoVenta[0].MONEDA;

        var v_tipo_anulacion = "OM,RS,RC";
        //if (aoVenta[0].DESPACHADO_IND == 'S') { -- EL ING. DIJO QUE SE LE QUITARA Y NO SÉ POR QUÉ "?"
        //    v_tipo_anulacion += ",RC"; //SE AGREGÓ EL RECHAZO DE SUNAT -- DPORTA
        //}

        //if (!bEsAnticipo) {
        //    fillCboMotivoAnulacion(aoVenta[0].MOTIVO_CODE, v_tipo_anulacion);
        //}

        fillCboMotivoAnulacion(aoVenta[0].MOTIVO_CODE, v_tipo_anulacion);
        

        if ($('#chkCompleto').is(':checked')) {
            $('#divEfectvo').show();
            $('#divDespacho').show();
        } else {
            $('#divEfectvo').show();
            $('#divDespacho').hide();
        }

        if (bEsAnticipo) {
            $('#divDespacho').hide();
        }

        if (aoVenta[0].ANULADO != "SI") {
            $("#chkDevEfectivo").prop("disabled", true);
            let aoDocSaldoVta = fnGetSaldoDocVta(sCodVenta);
            if (aoDocSaldoVta.length === 0) {
                infoCustom("No se pudo obtener el saldo del Documento: " + sCodVenta);
                return;
            }

            let nMontoAmortizado = aoDocSaldoVta[0].AMORT_TOTAL;
            if (nMontoAmortizado > 0) {
                $("#chkDevEfectivo").prop("disabled", false);
            }

        }


    };

    return {
        init: function () {
            var cod = ObtenerQueryString("codigo");
            if (cod != undefined) {
                plugins();
                eventoControles();
                fillcboMoneda();
                fillCboModoPago();
                fillCboEmpresa();
                fillCboEstablecimiento();
                fillCboTipoDoc();
                fillVendedor();
                fillCliente();
                cargaInicial();
            } else {
                infoCustom2("Debe seleccionar un documento de venta!");
                window.location.href = "?f=NVLANUL";
            }

        }
    };
}();

function solonumbef(string) {
    var out = '';
    //Se añaden las letras validas
    var filtro = 'ebfBEF1234567890';//Caracteres validos

    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
} 

function fVerificarLimite() {
    var result = false;
    var fTran = $("#txt_fec_emision").val();
    var iMes = fTran.substring(3, 5);
    var iAnio = fTran.substring(6, 10);
    var nMonto = $("#txt_monto_total").val();
    nMonto = -1 * nMonto;
    $.ajax({
        type: "post",
        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=Limite&P_MES=" + iMes + "&P_ANIO=" + iAnio + "&P_MONTO=" + nMonto + "&CTLG_CODE=" + $("#cbo_Empresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null && datos.length != 0) {
                if (datos[0].P_RESULTADO == "1") {
                    result = true;
                }
            }
        },
        error: function (msg) {
            alertCustom("No se obtuvo correctamente descuento por Categoría de cliente.");
        }
    });
    return result;



}

function imprimirDctosVenta() {
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
    var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
    var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : $("#cboCliente :selected").text();
    var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
    var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();

    data.append('CTLG_CODE', CTLG_CODE);
    data.append('SCSL_CODE', SCSL_CODE);
    data.append('DCTO_CODE', DCTO_CODE);
    data.append('VENDEDOR', VENDEDOR);
    data.append('CLIENTE', CLIENTE);
    data.append('PRODUCTO', PRODUCTO);
    data.append('ESTADO', ESTADO);
    data.append('SERIE_DCTO', $("#txtSerie").val());
    data.append('NUM_DCTO', $("#txtNumero").val());
    data.append('DESDE', $("#txtDesde").val());
    data.append('HASTA', $("#txtHasta").val());

    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLANUL.ashx?OPCION=3",
        contentType: false,
        data: data,
        processData: false,
        cache: false
    })
   .success(function (datos) {
       Desbloquear("ventana");
       if (datos != null) {
           $("#divDctoImprimir").html(datos);
           $("#divDctoImprimir #tblDocumento").attr("border", "1");
           $("#divDctoImprimir #tblDocumento").removeClass("display").removeClass("DTTT_selectable");
           var nomSucursal, nomEmpresa;
           nomSucursal = $("#cboEstablecimiento :selected").html();
           nomEmpresa = $("#cboEmpresa :selected").html();
           $("#divDctoImprimir").prepend("<hr></hr>")
           $("#divDctoImprimir").prepend("<h5 class='arial'>DOCUMENTOS DE VENTA - " + nomSucursal + "</h5>")
           $("#divDctoImprimir").prepend("<h4 class='arial'>" + nomEmpresa + "</h4>")
           setTimeout(function () {
               window.print();
           }, 200);
       }
   })
   .error(function () {
       Desbloquear("ventana");
   });
}

//function AnularDctoVenta() {
//    var data = new FormData();
//    data.append('VTAC_CODE', $("#txtNumDctoComp").val());
//    data.append('NUM_SEQ_DOC', $("#txtNumSec").val());
//    data.append('ANULAC_ID', $("#ctl00_txtus").val());
//    data.append('CMNT_ANULAC', $("#txtAnulacionCom").val());
//    data.append('DEVOLUCION_EFECTIVO', ($("#chkDevEfectivo").is(":checked")) ? "S" : "N");
//    data.append('DEVOLUCION_DESPACHO', ($("#chkDevDespacho").is(":checked")) ? "S" : "N");
//    var jqxhr = $.ajax({
//        type: "POST",
//        url: "vistas/nv/ajax/nvmanul.ashx?OPCION=1",
//        contentType: false,
//        data: data,
//        processData: false,
//        async: false,
//        cache: false
//    })
//   .success(function (datos) {
//       if (datos != null) {
//           if (datos == "OK") {
//               exito();
//               $("#chkAnulado").attr("checked", true).parent().addClass("checked");
//               $("#txtAnulacionCom").attr("disabled", "disabled");
//               $("#btnAnular").attr("style", "display:none;");
//               $("#divDevoluciones").attr("style", "display:none;");
//           }
//           else {
//               alertCustom("ERROR: " + datos);
//           }

//       } else {
//           noexito();
//       }
//   })
//   .error(function () {
//       noexito();
//   });

//}
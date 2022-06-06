var NVLCOTI = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDoc').select2();
        $('#cboVendedor').select2();
        $('#cboProducto').select2();
        $('#cboCliente').select2();       
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

        $("#txtSerie").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        $("#txtNumero").inputmask({ "mask": "9", "repeat": 9, "greedy": false });
        
    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
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
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    fillCboEstablecimiento();
                    $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());

                    fillCboTipoDoc();
                    fillVendedor();
                    fillProducto();
                    fillCliente();

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
                    $('#cboEstablecimiento').select2('val', 'TODOS');
                    selectEst.val();
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
                        selectEst.append('<option value="' + datos[i].USUARIO + '">' + datos[i].NOMBRE + '</option>');
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
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboProducto').select2('val', 'TODOS');
        Bloquear("divCboProducto");
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPROD2&CTLG=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboProducto");
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboProducto').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE_COMERCIAL + '</option>');
                    }
                    $('#cboProducto').select2('val', 'TODOS');
                }
                $('#cboProducto').select2('val', 'TODOS');
            },
            error: function (msg) {
                Desbloquear("divCboProducto");
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
            url: "vistas/nv/ajax/NVMDOCV.ashx?OPCION=2&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                Desbloquear("divCboCliente");
                selectEst.empty();
                selectEst.append('<option></option>');
                if (datos != null) {
                    $('#cboCliente').append('<option Value="TODOS">TODOS</option>');
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].ID + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }                   
                }
                $('#cboCliente').select2('val', 'TODOS');
            },
            error: function (msg) {
                alert(msg.d);
                Desbloquear("divCboCliente");
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
        var ESTADO = "";

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
            url: "vistas/NV/ajax/NVLCOTI.ashx?OPCION=3",
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

               var oTable = $('#tblDocumento').dataTable();
               oTable.fnSort([[0, "desc"]]);

               $("#tblDocumento").DataTable();
               actualizarEstilos()

               $('#tblDocumento tbody').on('click', 'tr', function () {
                   if ($(this).hasClass('selected')) {
                       $(this).removeClass('selected');
                   }
                   else {
                       table = $('#tblDocumento').dataTable();
                       var pos = table.fnGetPosition(this);
                       var row = table.fnGetData(pos);
                       var code = row[0];
                       window.location.href = '?f=nvmcoti&codigo=' + code;
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

    function cargainicial() {

        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            fillCliente();
            fillCboEstablecimiento();
            fillCboTipoDoc();
            fillVendedor();
            fillProducto();

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

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            cargainicial();
            obtenerDocumentos();
        }
    };
}();


function imprimirDetalle(codigo, nroDoc) {
    Bloquear("ventana");
    var data = new FormData();
    data.append('p_CODE', codigo);
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmcoti.ashx?OPCION=IMPR",
        contentType: false,
        data: data,
        processData: false,
        async: false,
        cache: false
    })
   .success(function (datos) {
       if (datos != null) {
           $("#divDctoImprimir").html(datos);
           setTimeout(function () {
               window.print();
           }, 200)

       } else {
           noexito();
       }
       Desbloquear("ventana");
   })
   .error(function () {
       Desbloquear("ventana");
       noexito();
   });
}

function imprimirListaDctosVenta() {
    Bloquear("ventana")
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
    var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
    var CLIENTE = ($("#cboCliente").val() == "TODOS") ? '' : $("#cboCliente :selected").text();
    var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
    var ESTADO = "";
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
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/NVLCOTI.ashx?OPCION=5",
        async: false,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("ventana")
            if (datos != null) {
                $("#divDctoImprimir").html(datos);
                $("#divDctoImprimir #tblDocumento").attr("border", "1");
                $("#divDctoImprimir #tblDocumento").removeClass("display").removeClass("DTTT_selectable");
                var nomSucursal, nomEmpresa;
                nomSucursal = $("#cboEstablecimiento :selected").html();
                nomEmpresa = $("#cboEmpresa :selected").html();
                $("#divDctoImprimir").prepend("<hr></hr>")
                $("#divDctoImprimir").prepend("<h5 class='arial'>COTIZACIONES CLIENTE - " + nomSucursal + "</h5>")
                $("#divDctoImprimir").prepend("<h4 class='arial'>" + nomEmpresa + "</h4>")
                setTimeout(function () {
                    window.print();
                }, 200);
            }
        },
        error: function (msg) {
            Desbloquear("ventana")
            alertCustom("No se pudo obtener correctamente los documentos de venta.");
        }
    });
}


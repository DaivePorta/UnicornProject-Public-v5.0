
var NVLDOVS = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipoDoc').select2();
        $('#cboVendedor').select2();
        $('#cboProducto').select2();
        $('#cboCliente').select2();
        $('#cboEstado').select2();
        $("#cboTipoDoc").select2();
        $('#cboCompleto').select2();
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

        $("#txtSerie").inputmask({ "mask": "#", "repeat": 4, "greedy": false });
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
                    fillCboVendedor();

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
                //selectEst.append('<option></option>');
                if (datos != null) {
                    // $('#cboEstablecimiento').append('<option Value="TODOS">TODOS</option>');
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
            async: true,
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

    function fillCboVendedor(ctlg, scsl, estado, bAsync) {
        ctlg = $("#cboEmpresa").val()
        scsl = $("#cboEstablecimiento").val()
        estado = "A";
        bAsync = true;
        if (bAsync == undefined) {
            bAsync = true;
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=LVEND" +
                "&CTLG=" + ctlg +
                "&SCSL=" + scsl +
                "&ESTADO=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: bAsync,
            success: function (datos) {
                $('#cboVendedor').empty();
                $('#cboVendedor').append('<option></option>');
                $('#cboVendedor').append('<option Value="TODOS">TODOS</option>');
                if (datos != null) {
                    var f = true;
                    var f2 = true;
                    var options = "";
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO == 'A' && f) {
                            options += '<optgroup label="ACTIVOS">';
                            f &= 0;
                        }
                        if (datos[i].ESTADO == 'I' && f2) {
                            if (f) options += '</optgroup>';
                            options += '<optgroup label="INACTIVOS">';
                            f2 &= 0;
                        }
                        options += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                    }
                    options += '</optgroup>';
                }

                $('#cboVendedor').append(options);
                $('#cboVendedor').select2("val", "TODOS");

            },
            error: function (msg) {
                alertCustom("Vendedores no se listaron correctamente.");
            }
        });
    }

    var fillProducto = function () {
        var selectEst = $('#cboProducto');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option Value="TODOS">TODOS</option>');
        $('#cboProducto').select2('val', 'TODOS');
        Bloquear("divCboProducto");
        $.ajax({
            type: "post",
            //url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODTODOS&CTLG=" + $('#cboEmpresa').val() + "&SCSL=" + $('#cboEstablecimiento').val() + "&SERIADO_IND=",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LPRODALMC_CAB&CTLG=" + $('#cboEmpresa').val() + "&ALMC_CODE=" + $('#cboEstablecimiento').val() + "&SERIADO_IND=" + "",
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
        var CLIENTE = ($("#cboCliente").val() == "TODOS" || $("#cboCliente").val() == "") ? '' : parseFloat($("#cboCliente :selected").val()).toString();
        var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
        var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
        var COMPLETO = ($("#cboCompleto").val() == "TODOS") ? '' : $("#cboCompleto").val();
        data.append('CTLG_CODE', CTLG_CODE);
        data.append('SCSL_CODE', SCSL_CODE);
        data.append('DCTO_CODE', DCTO_CODE);
        data.append('VENDEDOR', VENDEDOR);
        data.append('CLIENTE', CLIENTE);
        data.append('PRODUCTO', PRODUCTO);
        data.append('ESTADO', ESTADO);
        data.append('p_COMPLETO_IND', COMPLETO);
        data.append('SERIE_DCTO', $("#txtSerie").val());
        data.append('NUM_DCTO', $("#txtNumero").val());
        data.append('DESDE', $("#txtDesde").val());
        data.append('HASTA', $("#txtHasta").val());


        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=LVRSERV",
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
                   "bAutoWidth": false,
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

               $('#tblDocumento').on('dblclick', 'tr', function () {
                   if ($(this).hasClass('selected')) {
                       $(this).removeClass('selected');
                   }
                   else {
                       table = $('#tblDocumento').dataTable();        
                       var pos = table.fnGetPosition(this);
                       var row = table.fnGetData(pos);
                       var code = row[0];
                       window.open("?f=nvmdovs&codigo=" + code, '_blank');
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

        var controlProCli = false;

        $('#cboEmpresa').on('change', function () {
            //Bloquear("ventana");
            fillCboEstablecimiento();
            fillCboTipoDoc();
            fillCboVendedor();
            //Desbloquear("ventana");
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
            cargainicial();
        }
    };
}();

function solonumbef(string) {//Solo numeros
    var out = '';
    //Se añaden las letras validas
    var filtro = 'ebfBEF1234567890';//Caracteres validos

    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
} 


//function verificarFormatoTicket(tipoDoc) {
//    Bloquear("ventana");

//    var data = new FormData();
//    data.append('DOC_CODE', tipoDoc);
//    data.append('CTLG', $("#ctl00_hddctlg").val());
//    data.append('SCSL', $("#ctl00_hddestablecimiento").val());

//    var jqxhr = $.ajax({
//        type: "POST",
//        url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=FORTICK",
//        contentType: false,
//        data: data,
//        processData: false,
//        async: false,
//        cache: false
//    })
//        .success(function (datos) {
//            Desbloquear("ventana");
//            if (datos != null) {
//                if (datos[0].FORMATO_TICKET == "SI") {
//                    return true;
//                } else {
//                    return false;
//                }
//            } else {
//                return false;
//                //noexito();
//            }
//        })
//        .error(function () {
//            Desbloquear("ventana");
//            //noexito();
//        });

//    return jqxhr.responseText;

//}

function imprimirDetalle(codigo, nroDoc, tipoDoc, electronicInd) {
    //Bloquear("ventana");

    //if (verificarFormatoTicket(tipoDoc) == '[{"FORMATO_TICKET" :"SI"}]') {
    if (electronicInd == 'S') {
        var data = new FormData();
        data.append('p_CODE', codigo);
        data.append('USAR_IGV_IND', "S")
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
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
                    }, 0.0000000000000001)

                } else {
                    noexito();
                }
                Desbloquear("ventana");
            })
            .error(function () {
                //Desbloquear("ventana");
                noexito();
            });
        //ImprimirDctoVentaTicket(codigo);
    } else {
        if (tipoDoc == '0012' || tipoDoc == '0101') { //ticket
            var data = new FormData();
            data.append('p_CODE', codigo);
            data.append('USAR_IGV_IND', "S")
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
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
                        }, 0.0000000000000001)

                    } else {
                        noexito();
                    }
                    //Desbloquear("ventana");
                })
                .error(function () {
                    //Desbloquear("ventana");
                    noexito();
                });
            //ImprimirDctoVentaTicket(codigo);
        } else {
            crearImpresion(codigo);
            //Desbloquear("ventana");
        }
    }  
}

//function ImprimirDctoVentaTicket(codigo) {
//    //Bloquear("ventana");

//    var data = new FormData();
//    data.append('p_CODE', codigo);
//    data.append('USAR_IGV_IND', ($("#chk_inc_igv").is(":checked")) ? "S" : "N")
//    var jqxhr = $.ajax({
//        type: "POST",
//        url: "vistas/nv/ajax/nvmdovs.ashx?OPCION=IMPRT",
//        contentType: false,
//        data: data,
//        processData: false,
//        async: true,
//        cache: false
//    })
//        .success(function (datos) {
//            if (datos != null) {

//                $("#divDctoImprimir").html(datos);
//                setTimeout(function () {
//                    window.print();
//                }, 200)
//            } else {
//                noexito();
//            }
//        })
//        .error(function () {
//            noexito();
//        });

//}


function imprimirListaDctosVenta() {
    //Bloquear("ventana")
    var data = new FormData();
    var CTLG_CODE = $("#cboEmpresa").val();
    var SCSL_CODE = $("#cboEstablecimiento").val();
    var DCTO_CODE = ($("#cboTipoDoc").val() == "TODOS") ? '' : $("#cboTipoDoc").val();
    var VENDEDOR = ($("#cboVendedor").val() == "TODOS") ? '' : $("#cboVendedor :selected").text();
    var CLIENTE = ($("#cboCliente").val() == "TODOS" || $("#cboCliente").val() == "") ? '' : parseFloat($("#cboCliente :selected").val()).toString();
    var PRODUCTO = ($("#cboProducto").val() == "TODOS") ? '' : $("#cboProducto").val();
    var ESTADO = ($("#cboEstado").val() == "TODOS") ? '' : $("#cboEstado").val();
    var TIPO_VENTA = 'Y';
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
    data.append('TIPO_VENTA', TIPO_VENTA);
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NV/ajax/nvmdovs.ashx?OPCION=5",
        async: false,
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            //Desbloquear("ventana")
            if (datos != null) {
                $("#divDctoImprimir").html(datos);
                $("#divDctoImprimir #tblDocumento").attr("border", "1");
                $("#divDctoImprimir #tblDocumento").removeClass("display").removeClass("DTTT_selectable");
                var nomSucursal, nomEmpresa;
                nomSucursal = $("#cboEstablecimiento :selected").html();
                nomEmpresa = $("#cboEmpresa :selected").html();
                $("#divDctoImprimir").prepend("<hr></hr>")
                $("#divDctoImprimir").prepend("<h5 class='arial'>DOCUMENTOS DE VENTA RÁPIDA SERVICIOS - " + nomSucursal + "</h5>")
                $("#divDctoImprimir").prepend("<h4 class='arial'>" + nomEmpresa + "</h4>")
                setTimeout(function () {
                    window.print();
                }, 0.0000000000000001);
            }
        },
        error: function (msg) {
            //Desbloquear("ventana")
            alertCustom("No se pudo obtener correctamente los documentos de venta.");
        }
    });
}


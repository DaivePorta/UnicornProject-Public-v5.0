var CPLRCPP = function () {
    var plugins = function () {
        $('#cboEmpresa').select2();
        $("#tblCuentasPorPagar").DataTable();

    }
    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        //ColVis_Button TableTools_Button     
        $("TableTools_Button").css("float", "left");        
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cplrcpp.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            beforeSend: function () { Bloquear($($("#cboEmpresa").parents("div")[0])); },
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEmpresa').select2('val', '');
                }
             
              
                
            },
            error: function (msg) {
                alert(msg);
            },
            complete: function () {
                Desbloquear($($("#cboEmpresa").parents("div")[0]));              
            }
        });
    }


    var cargarSucursales = function () {
        var select = $('#slcEstablec');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            beforesend: function () { Bloquear($(select.parents("div")[0])); },
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                select.html('');
                for (var i = 0; i < data.length; i++) {
                    select.append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            },
            complete: function () {
                select.multiselect('destroy').multiselect({
                    nonSelectedText: 'TODOS'
                });

                Desbloquear($(select.parents("div")[0]));
            }
        });
    };

    var eventoComtroles = function () {

        $('#buscar').on('click', function () {
            obtenerReporteCuentasPorPagar();
        });       
        $("#cboEmpresa").change(function () {
            cargarSucursales();
            obtenerReporteCuentasPorPagar();
        });
    }
    var obtenerReporteCuentasPorPagar = function () {
        var data = new FormData();          
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_USUA_ID', $("#ctl00_txtus").val());
        data.append('p_SCSL', ($("#slcEstablec").val() === null ? '' : $("#slcEstablec").val().toString()));

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/cp/ajax/cplrcpp.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               //Reporte
               $('#divCuentasPorPagar').html(datos);           
               //"TotalCuentasPorPagar
               $("#txtTotalMonedaBase").html($("#hfTotalBase").val());
               $("#txtTotalMonedaAlterna").html($("#hfTotalAlterna").val());
               //Datos moneda
               $("#lblMonedaBase").html($("#hfDescMonedaBase").val());
               $("#lblSimboloMonedaBase").html($("#hfSimbMonedaBase").val());
               $("#lblMonedaAlterna").html($("#hfDescMonedaAlterna").val());
               $("#lblSimboloMonedaAlterna").html($("#hfSimbMonedaAlterna").val());
               //Datos tipo de cambio
               $("#fechaTipoCambio").html($("#hfFechaTipoCambio").val());
               $("#valorTipoCambio").html($("#hfValorTipoCambio").val());
               if ($("#hfFechaTipoCambio").val() != "-")
                   $("#bloqueTipoCambio").attr("style", "display:block;");
               else
                   $("#bloqueTipoCambio").attr("style", "display:none;");
              
               oTableTReg = $("#tblCuentasPorPagar").dataTable({
                   "sDom": 'TC<"clear">lfrtip',
                   "sPaginationType": "full_numbers",
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
               })
               oTableTReg.fnSort([[4, "desc"]]);
               actualizarEstilos();

               $('#tblCuentasPorPagar').DataTable().columns(0).visible(false);
               $('#tblCuentasPorPagar tbody').on('dblclick', 'tr', function () {
                   var pos = oTableTReg.fnGetPosition(this);
                   var row = oTableTReg.fnGetData(pos);
                   var pidm = row[0];
                   if (pidm != "") {
                       window.open("?f=CPLRCPR&p=" + pidm, '_blank');
                   }

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

    var cargaInicial = function () {
        $("#buscar").click();

    }
   

    return {
        init: function () {
            plugins();
            eventoComtroles();
            fillCboEmpresa();            
            cargaInicial();
        }
    };

}();


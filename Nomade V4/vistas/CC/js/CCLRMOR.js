﻿var CCLRMOR = function () {
    var plugins = function () {
        $("#cboEmpresa").select2();
        $("#tblMorosos").DataTable();

    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrmor.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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
    }

    var eventoComtroles = function () {
        $('#cboEmpresa').on('change', function () {
            obtenerReporteMorosos();
        });

    }


    var obtenerReporteMorosos = function () {
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_USUA_ID', $("#ctl00_txtus").val());

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/cc/ajax/cclrmor.ashx?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
       .success(function (datos) {
           Desbloquear("ventana");
           if (datos != null) {
               $('#divMorosos').html(datos);
               //"TotalDeudasMorosos
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
               oTableTReg = $("#tblMorosos").dataTable({
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

               $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
               $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
               //ColVis_Button TableTools_Button
               $("TableTools_Button").css("float", "left");

               $('#tblMorosos').DataTable().columns(0).visible(false);               

               $('#tblMorosos tbody').on('dblclick', 'tr', function () {
                   var pos = oTableTReg.fnGetPosition(this);
                   var row = oTableTReg.fnGetData(pos);                   
                   var pidm = row[0];
                   if (pidm != "") {
                       window.open("?f=cclrccl&p=" + pidm, '_blank');
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

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoComtroles();
            obtenerReporteMorosos();
        }
    };

}();


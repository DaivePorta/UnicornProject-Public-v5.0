
var oTable;

var CTLCOAS = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();       
        $('#cboEstablecimiento').select2(); 
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

    }

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var fillCboEmpresa = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            }
        });
    };
    
    var fillCboEstablecimiento = function () {
        var select = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: 'vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=' + $('#cboEmpresa').val(),
            contenttype: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                $(select).html('<option value="">TODOS</option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
                $(select).val('');
            },
            error: function (msg) {
                alertCustom('Error al cargar Sucursales.');
            }
        });
    };
    

    var listarFacturasCompra = function () {
        if (vErrors(["cboEmpresa"])) {

            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', ($("#cboEstablecimiento").val() === null ? '' : $("#cboEstablecimiento").val().toString()));
            data.append('p_DESDE', $("#txtDesde").val());
            data.append('p_HASTA', $("#txtHasta").val());

                 
            Bloquear("ventana");
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTLCOAS.ashx?OPCION=3",
                contentType: false,
                data: data,
                processData: false,
                cache: false
            })
           .success(function (datos) {
               Desbloquear("ventana");

               if (datos != null) {
                   $('#divBandeja').html(datos)
                   oTable = $('#tblBandeja').dataTable({
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
                   actualizarEstilos()
                                 
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

    var eventoComtroles = function () {

   
        $('#cboEmpresa').on('change', function () {          
            $("#inputRazsocial").html("");                        
            $("#inputRazsocial").html('<input id="txtRuc" class="span3" type="text" disabled="disabled" /> <input id="txtrazsocial" class="span9" type="text" data-provide="typeahead" />');
            fillCboEstablecimiento();
        });

        $('#buscar').on('click', function () {          
            if ($("#txtDesde").val().trim() == "" && $("#txtHasta").val().trim() == "") {
                listarFacturasCompra();
            } else if ($("#txtDesde").val().trim() != "" && $("#txtHasta").val().trim() != "") {
                listarFacturasCompra();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }

        });             

    }

    function cargainicial() {
        

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
            
            fillCboEmpresa();
            $('#cboEmpresa').val($('#ctl00_hddctlg').val());
            fillCboEstablecimiento(); 
            plugins();
            eventoComtroles();
            cargainicial();
        
        }
    };

}();


$(function () {
  
    $('#tblBandeja tbody td img').live('click', function () {
            
        var id = $(this).attr('id');
        var nTr = $(this).parents('tr')[0];
        var ctlg = $("#cboEmpresa").val();
        var p_DESDE = $("#txtDesde").val();
        var p_HASTA = $("#txtHasta").val();
        var p_SCSL_CODE = ($("#cboEstablecimiento").val() === null ? '' : $("#cboEstablecimiento").val().toString())

        if (oTable.fnIsOpen(nTr)) {
            this.src = "recursos/img/details_open.png";
            oTable.fnClose(nTr);
        }
        else {
            this.src = "recursos/img/details_close.png";

            Bloquear("divBandeja");
            oTable.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
            oTable.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');            
            $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTLCOAS.ashx?OPCION=4&p_FACTURA=" + id + "&p_CTLG=" + ctlg + '&p_SCSL_CODE=' + p_SCSL_CODE + "&p_DESDE=" + p_DESDE + "&p_HASTA=" + p_HASTA,
                async: true,
                success: function (datos) {                  
                    $('#c' + id).html(datos);
                    Desbloquear("divBandeja");

                },
                error: function (datos) {
                    Desbloquear("divBandeja");
                }
            });
       
        }      

    });

    function fnFormatDetails(nTr, id) {
        var sOut = '<div id="c' + id + '"></div>';
        return sOut;
    }
});
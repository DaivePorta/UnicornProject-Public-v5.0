var oTableMes;
var NNLTIPL = function () {
    var plugins = function () {

    }

 
    var eventoControles = function () {
      
    }


    function cargainicial() {
        GetTipoPlanilla();
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            cargainicial();
        }
    };


}();

var NNMTIPL = function () {
    var plugins = function () {
        $('#cboPago').select2();
        $('#cboPeriodo').select2();
        $('#txtDescripcion').inputmask({ "mask": "L", "repeat": 100, "greedy": false });
        $('#txt_Mes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {
            $(".datepicker-months thead").hide();
            $(".datepicker-months tbody tr td").css("width", "180px");
        }).keydown(function () { return false; }).datepicker("setDate", new Date());
    }


    var eventoControles = function () {
        $('#cboPago').on('change', function () {
            if ($('#cboPago').val() == 'R') {
                $('#cboPeriodo').removeAttr('disabled');
                $('#cboPeriodo').select2('val', '0001').change();
                //$('#chkBoleta ').attr('checked', true).parent().addClass("checked")
                $('#chkBoleta ').removeAttr('disabled')
            }
            else {
                $('#cboPeriodo').select2('val', '0005').change();
                $('#cboPeriodo').attr('disabled', 'disabled');
                $('#chkBoleta ').attr('checked', false).parent().removeClass("checked")
                $('#chkBoleta ').attr('disabled','disabled')
            }
        });

      
       
    }


    function cargainicial() {
        $('#cboPago').select2('val', 'R').change()      
        $('#divMes').slideUp();
        ListarPeriodicidadPago();

        $('#cboPeriodo').on('change', function () {
            if ($('#cboPeriodo').val() == '0005') {
                $('#divMes').slideDown();
            }
            else {
                $('#divMes').slideUp();
                if (typeof oTableMes != "undefined") {
                    oTableMes.fnClearTable();
                }
            }

        });

        var cod = ObtenerQueryString("code");        
        if (typeof (cod) !== "undefined") {
            $.ajax({
                type: "POST",
                url: "vistas/NN/ajax/NNMTIPL.ASHX?OPCION=6&CODE=" + cod + '&ESTADO_IND=',
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    if (datos != "" && datos != null) {

                        $('#txtCodigo').val(datos[0].CODIGO);
                        if (datos[0].ESTADO_IND == "A") {
                            $('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkEstado ').attr('checked', true).parent().addClass("checked")
                        } else {
                            $('#uniform-chkEstado span').removeClass();
                            $('#chkEstado').attr('checked', false).parent().removeClass("checked")
                        }

                        if (datos[0].BOLE_IND == "S") {
                            //$('#uniform-chkEstado span').removeClass().addClass("checked");
                            $('#chkBoleta ').attr('checked', true).parent().addClass("checked")
                        } else {
                            //$('#uniform-chkEstado span').removeClass();
                            $('#chkBoleta').attr('checked', false).parent().removeClass("checked")
                        }

                        $('#txtDescripcion').val(datos[0].DESCRIPCION);
                        $('#cboPago').select2('val', datos[0].PAGO_IND).change();
                        $('#cboPeriodo').select2('val', datos[0].PEPA_IND).change();

                        $('#cboPago').attr('disabled', 'disabled');
                        $('#cboPeriodo').attr('disabled', 'disabled');

                        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                        $("#grabar").attr("href", "javascript:actualizarTipoPlanilla();");

                        listaMes(datos[0].CODIGO);

                    }

                },
                error: function (msg) {
                    alertCustom("Error al obtener datos de Presentaciones");
                }

            });

        }
        else { listaMes('0000'); }            

    }

    function ListarPeriodicidadPago() {
        $.ajax({
            type: "post",
            url: "vistas/nn/ajax/NNMTIPL.ashx?OPCION=3&CODE=&CODE_SUNAT=&ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboPeriodo').empty();
                //$('#cboPeriodo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboPeriodo').append('<option value="' + datos[i].CODIGO + '" value_sunat ="' + datos[i].CODIGO_SUNAT + '">' + datos[i].NOMBRE + '</option>');
                    }
                    $("#cboPeriodo").select2('val', datos[0].CODIGO).change();
                }
                else {
                    $('#cboPeriodo').empty();
                    $('#cboPeriodo').append('<option></option>');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }



    return {
        init: function () {
            plugins();
            eventoControles();
            cargainicial();
        }
    };


}();


var GetTipoPlanilla = function () {
    var data = new FormData();
    data.append('CODE', '0');
    data.append('ESTADO_IND', '');

    Bloquear("ventana");
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/NN/ajax/NNMTIPL.ashx?OPCION=1",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: false
    })
   .success(function (datos) {
       Desbloquear("ventana");
       if (datos != null) {
           $('#divTipoPlanilla').html(datos);

           $("#tblTipoPlanilla").DataTable({
               "sDom": 'T<"clear">lfrtip',
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
           .columns(0).visible(false);
           actualizarEstilos()

           $('#tblTipoPlanilla tbody').on('click', 'tr', function () {
               if ($(this).hasClass('selected')) {
                   $(this).removeClass('selected');
               }
               else {
                   table = $('#tblTipoPlanilla').dataTable();
                   //table.$('tr.selected').removeClass('selected');
                   //$(this).addClass('selected');
                   var pos = table.fnGetPosition(this);
                   var row = table.fnGetData(pos);
                   var code = row[0];
                   window.location.href = '?f=nnmtipl&code=' + code;                   
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

var actualizarEstilos = function () {
    $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
    $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
    //ColVis_Button TableTools_Button 
    //$(".DTTT.btn-group").addClass("pull-right");
    $("TableTools_Button").css("float", "left");


}
function actualizaestadoTipla(code) {

    var USUA_ID = $.trim($('#ctl00_lblusuario').html());
    var data = new FormData();
    data.append('OPCION', "2");
    data.append('CODE', code);
    data.append('USUA_ID', USUA_ID);

    Bloquear("ventana");

    $.ajax({
        type: "POST",
        url: "vistas/nn/ajax/nnmtipl.ashx",
        data: data,
        contentType: false,
        processData: false,
        cache: false,
        async: false,
        success: function (datos) {
            Desbloquear("ventana");
            if (datos != null) {
                if (datos[0].SUCCESS == "OK") {
                    exito();
                    GetTipoPlanilla();
                }
            }
            else {
                noexito();
            }
        },
        error: function (msg) {
            Desbloquear("ventana");
            noexito();
        }
    });
}

function grabaTipoPlanilla() {
    var tablas = datosTabla();
    var data = new FormData;

    var DESC = '';
    var PAGO_IND = '';
    var PEPA_CODE = '';
    var ESTADO = '';
    var USUA_ID = '';
    var DETALLE = '';
    var BOLE_IND = '';

    if (vErrors(["txtDescripcion"])) {


        var flag = true;

        if ($('#cboPeriodo').val() == '0005' && oTableMes.fnGetData().length == 0) {
            flag = false;
            alertCustom("Debe ingresar al menos 1 mes de");
            return false;
        }

        DESC = $.trim($('#txtDescripcion').val());
        PAGO_IND = $('#cboPago').val();
        PEPA_CODE = $('#cboPeriodo').val();
        BOLE_IND = $('#chkBoleta').is(':checked') ? 'S' : 'N';
        ESTADO = $('#chkEstado').is(':checked') ? 'A' : 'I';
        USUA_ID = $.trim($('#ctl00_lblusuario').html());
        DETALLE = tablas;
        Bloquear("ventana");

        $.post("vistas/NN/ajax/NNMTIPL.ASHX", {
            OPCION: "4",
            DESC: DESC,
            ESTADO_IND: ESTADO,
            USUA_ID: USUA_ID,
            PAGO_IND: PAGO_IND,
            PEPA_CODE: PEPA_CODE,
            BOLE_IND: BOLE_IND,
            DETALLE:DETALLE,
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe un tipo de planilla con la misma descripción");
                }
                else {
                  
                    $('#txtCodigo').val(res);
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i>&nbsp;Modificar");
                    $("#grabar").attr("href", "javascript:actualizarTipoPlanilla();");
            
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}

function actualizarTipoPlanilla() {
    var tablas = datosTabla();
    var data = new FormData;

    var CODE = '';
    var DESC = '';
    var ESTADO = '';
    var USUA_ID = '';
    var PAGO_IND = '';
    var PEPA_CODE = '';
    var DETALLE = '';
    var BOLE_IND = '';

    if (vErrors(["txtDescripcion"])) {

        CODE = $.trim($('#txtCodigo').val());
        DESC = $.trim($('#txtDescripcion').val());
        PAGO_IND = $('#cboPago').val();
        PEPA_CODE = $('#cboPeriodo').val();
        BOLE_IND = $('#chkBoleta').is(':checked') ? 'S' : 'N';
        ESTADO = $('#chkEstado').is(':checked') ? 'A' : 'I';
        USUA_ID = $.trim($('#ctl00_lblusuario').html());
        DETALLE = tablas;

        Bloquear("ventana");

        $.post("vistas/NN/ajax/NNMTIPL.ASHX", {
            OPCION: "5",
            CODE: CODE,
            DESC: DESC,
            ESTADO_IND: ESTADO,
            USUA_ID: USUA_ID,
            PAGO_IND: PAGO_IND,
            PEPA_CODE: PEPA_CODE,
            BOLE_IND:BOLE_IND,
            DETALLE: DETALLE,
        })
            .done(function (res) {
                Desbloquear("ventana");
                if (res == "DUPLICADO") {
                    alertCustom("Existe un tipo de planilla con la misma descripción");
                }
                else {
                    exito();
                }
            })
            .fail(function () {
                Desbloquear("ventana");
                noexito();
            });

    }

}

var listaMes = function (code) {

    $.ajax({
        type: "post",
        url: "vistas/nn/ajax/nnmtipl.ashx?OPCION=7&CODE=" + code,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                var json = datos;
                var parms = {
                    data: json,
                    order: [[0, 'asc']],
                    iDisplayLength: -1,
                    paging: false,
                    info: false,
                    columns: [
                        {
                            data: "NUM_MES",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center');
                                $(td).attr('style', 'display:none');
                            }

                        },
                        {
                            data: "MES",
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).attr('align', 'center');
                                //$(td).attr('style', 'display:none');
                            }
                        },

                                                 {
                                                     data: null,
                                                     defaultContent: '<a  class="btn red eliminar"><i class="icon-minus"></i></a>',
                                                     createdCell: function (td, cellData, rowData, row, col) {

                                                         $(td).attr('align', 'center')

                                                     }
                                                 }


                    ]

                }

                oTableMes = iniciaTabla("tblMeses", parms);
                $('#tblMeses').removeAttr('style');
                $('#tblMeses_filter').parent().parent().remove();
                //$('#DivPlanillas').slideDown();
           
                $('#tblMeses tbody').on('click', '.eliminar', function () {
                    var pos = oTableMes.api(true).row($(this).parents("tr")[0]).index();
                    var row = oTableMes.fnGetData(pos);                   
                    oTableMes.fnDeleteRow(pos);

                });


            }
            else {

                var parms = {
                    data: null,
                    order: [[0, 'asc']],
                    iDisplayLength: -1,
                    paging: false,
                    info:false,
                    columns: [
                          {
                              data: "NUM_MES",
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).attr('align', 'center');
                                  $(td).attr('style', 'display:none');
                              }
                          },
                          {
                              data: "MES",
                              createdCell: function (td, cellData, rowData, row, col) {
                                  $(td).attr('align', 'center');
                                  //$(td).attr('style', 'display:none');
                              }
                          },
                         
                         {
                             data: null,
                             defaultContent: '<a  class="btn red eliminar"><i class="icon-minus"></i></a>',
                             createdCell: function (td, cellData, rowData, row, col) {

                                 $(td).attr('align', 'center')

                             }
                         }

                    ]

                }



                oTableMes = iniciaTabla('tblMeses', parms);
                $('#tblMeses').removeAttr('style');

                flagTb = true;

                $('#tblMeses tbody').on('click', '.eliminar', function () {


                    var pos = oTableMes.api(true).row($(this).parents("tr")[0]).index();
                    var row = oTableMes.fnGetData(pos);      
                    oTableMes.fnDeleteRow(pos);          
                });

                $('#tblMeses_filter').parent().parent().remove();
                //$('#tblMeses_length').remove();
          
            }
        },
        error: function (msg) {

            alert(msg);
        }
    });
}

function AgregarMes() {

    if ($('#btnAgregaMesDetalle').attr('disabled') != 'disabled') {
        var flag = true;
   
        if (!vErrors(['txt_Mes'])) {
            flag = false;
            return false;
        }
     
        var mes = $('#txt_Mes').datepicker('getDate').getMonth() + 1

        var a = {
            "NUM_MES": mes,
            "MES": $('#txt_Mes').val(),
        }

        var ar = oTableMes.fnGetData();
        ar.filter(function (e, f) {
            if (e.NUM_MES ==  mes) {
                alertCustom("El mes ya ha sido seleccionado")
                flag = false
            }
        });
        if (flag) {
            oTableMes.fnAddData(a);
            //limpiar();
        }
    }
}

//function Cancelar() {
    
//}

function datosTabla() {
    var datos_tabla;
    var datos_fila = '';
    $('#divMeses tbody').children().each(function (i) {

        var NUM_MES

        NUM_MES = $(this).find('td').eq(0).text();

        datos_fila += NUM_MES;
        datos_fila += '|';
    });
    datos_fila = datos_fila + '|';
    datos_tabla = datos_fila.replace('||', '');
    return datos_tabla;
}

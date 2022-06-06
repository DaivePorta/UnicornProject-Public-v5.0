function Actualizar() {
    var p_CODE_FER = $('#txtCodigo').val();
    var p_DESC = $('#txtDescripcion').val();
    var p_FECHA = $('#txtDia').val();
    var p_REPETIR_IND = $('#chkRepetir').is(':checked')? 'S' : 'N';
    var p_TIEMPO_IND = obtenerRadioButton();
    var p_HORA_INICIO = $('#txthorainicio').val();
    var p_HORA_FIN = $('#txthorafin').val();
    var p_ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
    var p_USUA_ID = $('#ctl00_lblusuario').html();

    var v_validacion;
    if (obtenerRadioButton() == "D") {
        v_validacion = ["txtDescripcion", "txtDia"];
       
    } else {
        v_validacion = ["txtDescripcion", "txtDia", "txthorainicio", "txthorafin"];
    }
    if (vErrors(v_validacion) && valida_hora()) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMGFER.ASHX", {
            OPCION: "AC",
            CODE:p_CODE_FER,
            DESC: p_DESC,
            FECHA: p_FECHA,
            REPETIR_IND: p_REPETIR_IND,
            TIEMPO_IND: p_TIEMPO_IND,
            HORA_INICIO: p_HORA_INICIO,
            HORA_FIN: p_HORA_FIN,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID:p_USUA_ID

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {
    var p_CODE_FER = $('#txtCodigo').val();
    var p_DESC = $('#txtDescripcion').val();
    var p_FECHA = $('#txtDia').val();
    var p_REPETIR_IND = $('#chkRepetir').is(':checked') ? 'S' : 'N';
    var p_TIEMPO_IND = obtenerRadioButton();
    var p_HORA_INICIO = $('#txthorainicio').val();
    var p_HORA_FIN = $('#txthorafin').val();
    var p_ESTADO_IND = $('#chkActivo').is(':checked') ? 'A' : 'I';
    var p_USUA_ID = $('#ctl00_lblusuario').html();

    var v_validacion;
    if (obtenerRadioButton() == "D") {
        v_validacion = ["txtDescripcion", "txtDia"];
    } else {      
        v_validacion = ["txtDescripcion", "txtDia", "txthorainicio", "txthorafin"];
    }

    if (vErrors(v_validacion) && valida_hora()) {
        Bloquear("ventana");
        $.post("vistas/NS/ajax/NSMGFER.ASHX", {
            OPCION: "CR",
            CODE_FER: p_CODE_FER,
            DESC: p_DESC,
            FECHA: p_FECHA,
            REPETIR_IND: p_REPETIR_IND,
            TIEMPO_IND: p_TIEMPO_IND,
            HORA_INICIO: p_HORA_INICIO,
            HORA_FIN: p_HORA_FIN,
            ESTADO_IND: p_ESTADO_IND,
            USUA_ID: p_USUA_ID

        },
            function (res) {
                var resulta = 0;
                Desbloquear("ventana");
                if (res.indexOf("error") > -1) {
                    noexitoCustom(res);
                    resulta = 1;
                }
                
                if (res.indexOf("ADVERTENCIA") > -1) {
                    infoCustom2(res);
                    resulta = 1;
                }

                if (resulta == 0) {
                    exito();
                    $('#txtCodigo').val(res);
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    habilita_detalle();
                }

            });
    }
}


function valida_hora() {

    if ($("#txthorainicio").val().indexOf("_") != -1) {
        alertCustom("Completar campo hora inicio correctamente.");
        return false;
    } if ($("#txthorafin").val().indexOf("_") != -1) {
        alertCustom("Completar campo hora fin correctamente.");
        return false;
    }

    if (($("#txthorainicio").val() >= $("#txthorafin").val()) &&  (obtenerRadioButton() != "D")) {
        
        alertCustom("Hora de inicio debe ser menor a la final!");
        return false;
    }

    return true;
}

function funcionalidad() {
    $(":radio").change(
    function () {
        $("#txthorainicio").attr("disabled", false);
        $("#txthorafin").attr("disabled", false);
        if ($(this).attr('id') == "rbDiacompleto" && $(this).is(':checked')) {
            $("#txthorainicio").attr("disabled", "disabled");
            $("#txthorafin").attr("disabled", "disabled");
            $("#txthorainicio").parent().parent().removeClass("error");
            $("#txthorafin").parent().parent().removeClass("error");
            $("#txthorainicio").val("");
            $("#txthorafin").val("");


        } 
    });

   

}

function obtenerRadioButton() {

    for (var i = 0; i < 3; i++) {
        if ($($(":radio")[i]).is(':checked')) {
            return ($($(":radio")[i]).val());
        }
    }
}


function cargarCombos() {

    $("#cboEstablecimiento").select2();

    $.ajaxSetup({ async: false });

    $.post("vistas/NS/ajax/NSMGFER.ASHX", { OPCION: "EM", USUA_ID: $('#ctl00_txtus').val() },
    function (res) {
        $("#controlcboEmpresa").html(res);

        $("#cboEmpresa").select2({
            placeholder: "EMPRESA",
            allowclear: true

        });

     
        $("#cboEmpresa").change(function () {

            $.ajaxSetup({ async: false });
            $.post("vistas/NS/ajax/NSMGFER.ASHX", { OPCION: "ES", EMPRESA: $(this).val(), USUA_ID: $('#ctl00_txtus').val() },
            function (res) {

                $("#controlcboEstablecimiento").html(res);

                $("#cboEstablecimiento").select2({
                    placeholder: "ESTABLECIMIENTO",
                    allowclear: true

                });

                if (res.indexOf("SIN ESTABLECIMIENTOS") != -1) { $("#cboEstablecimiento").attr("disabled","disabled"); }

            });
            $.ajaxSetup({ async: true });
        });

    });
    $.ajaxSetup({ async: true });
}


function listasselect() {

    $(".item").click(function () {


        $("#" + $(this).parent("div").attr("id") + " .item").removeClass('selected');
        $(this).addClass('selected');

    });
}


function habilita_detalle() {

    cargarCombos();
   
    $("#estarowprop").click(
        function () {

            var codigo = $("#cboEstablecimiento").val();
            if (codigo == "") { alertCustom("Seleccione establecimiento antes!");  return; }
            var nombre = $("#cboEstablecimiento OPTION[VALUE=" + $("#cboEstablecimiento").val() + "]").html();


            //if ($("#contEstablecimiento").attr("estado") == "vacio") {
            //    $("#contEstablecimiento").html("");
            //    $("#contEstablecimiento").removeAttr("estado");
            //}


             //   $("#contEstablecimiento").append('<p class="item" codigo="' + codigo + '">' + nombre + '</p>');

              
            Bloquear("ventana");
                $.post("vistas/NS/ajax/NSMGFER.ASHX", { OPCION: "DE", CODE: $('#txtCodigo').val(), ESTABLECIMIENTO: codigo, ESTADO_IND: "A", USUA_ID: $('#ctl00_lblusuario').html(), EMPRESA: $("#cboEmpresa").val() },
                function (res) {

                    var correcto = 0;

                    if (res.indexOf("ADVERTENCIA") > -1) {
                        infoCustom2(res);
                        correcto = 1;
                    }

                    if (res.indexOf("error") > -1) {
                        noexito();
                        correcto = 1;
                    }

                    if(correcto==0){
                        //$("#contEstablecimiento").html(res);
                        listasselect();
                        ListarConfiguracion();
                        exito();
                    }
                 }

                );

            //} else { alertCustom("El establecimiento " + nombre + " ya está agregado!"); }

                Desbloquear("ventana");
        });

    $("#estarowdel").click(
        function () {
            //var item = $("#contEstablecimiento .selected");
            var codigo = item.attr("codigo");
            if (codigo == undefined) { alertCustom("Seleccione item de lista antes!"); return; }

        
            item.remove();

            //if ($("#contEstablecimiento").html() == "") {
            //    $("#contEstablecimiento").attr("estado", "vacio");
            //    $("#contEstablecimiento").html("<p class=\"item\" style=\"color:#C3C1C1;\">NINGUN ESTABLECIMIENTO...</p>");
            //}

            $.post("vistas/NS/ajax/NSMGFER.ASHX", { OPCION: "DE", CODE: $('#txtCodigo').val(), ESTABLECIMIENTO: codigo, ESTADO_IND: "I", USUA_ID: $('#ctl00_lblusuario').html(), EMPRESA: $("#cboEmpresa").val() },
                function (res) {
                    if (res.indexOf("error") == -1) {
                
                        exito();

                    } else {
                        noexito();
                    }
                }
                );

         


        });
   
    $("#detalle_feriado").show();
}

var NSLGFER = function () {

    var fillBandejaFeriados = function () {
   
       
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NDESC" },
                {
                    data: { _: "FECHA.display", sort: "FECHA.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NTIEMPO_IND"},
          
                {
                    data: "NESTADO_IND",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }


        var oTableFeriados = iniciaTabla("tblFeriados",parms);

        $('#tblFeriados').removeAttr('style');
       
            $('#tblFeriados tbody').on('click', 'tr', function () {             


                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');

                }
                else {
                    oTableFeriados.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');

                    var pos = oTableFeriados.fnGetPosition(this);
                    var row = oTableFeriados.fnGetData(pos);
                    var code = row.CODE;

                    window.location.href = '?f=nsmgfer&codigo=' + code;
                }



            });
     

        /*boton cambiar ACTIVO - INACTIVO*/

            $('#tblFeriados tbody').on('click', 'a', function () {

                $(this).parent().parent().addClass('selected');

                var pos = oTableFeriados.api(true).row($(this).parent().parent()).index();
                var row = oTableFeriados.fnGetData(pos);
                var cod = row.CODE;


                Bloquear("ventana");
                $.ajaxSetup({ async: false });
            $.post("vistas/NS/ajax/NSMGFER.ASHX", { OPCION: 'R', CODE_FER: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO"

                        oTableFeriados.fnGetData(pos).NESTADO_IND = res;
                        refrescaTabla(oTableFeriados);

                        exito();
                     


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });


        });


    }


    return {
        init: function () {
            fillBandejaFeriados();
        }
    };

}();

 var NSMGFER = function () {

   var cargainicial = function () {

       funcionalidad();

         var cod = ObtenerQueryString("codigo");

           if (cod != null) {
               
               $("#grabar").html("<i class='icon-pencil'></i> Modificar Datos");
               $("#grabar").attr("href", "javascript:Actualizar();");

               $.ajax({
                   type: "POST",
                   url: "vistas/NS/ajax/NSMGFER.ASHX?codigo=" + cod,
                   contentType: "application/json;",
                   dataType: "json",
                   success: function (datos) {

                       habilita_detalle();

                       $("#txtCodigo").val(datos[0].CODE);
                       $("#txtDescripcion").val(datos[0].NDESC);
                       $("#txtDia").val(datos[0].FECHA); 
                      
                          if (datos[0].NESTADO_IND == "ACTIVO") {

                           $('#uniform-chkActivo span').removeClass().addClass("checked");
                           $('#chkActivo').attr('checked', true);
                       } else {

                           $('#uniform-chkActivo span').removeClass();
                           $('#chkActivo').attr('checked', false);
                       }

                       if (datos[0].REPETIR_IND == "SI") {

                           $('#uniform-chkRepetir span').removeClass().addClass("checked");
                           $('#chkRepetir').attr('checked', true);
                       } else {

                           $('#uniform-chkRepetir span').removeClass();
                           $('#chkRepetir').attr('checked', false);
                       }
                      
                       
                       $(":radio").parent().removeAttr("class", "checked");
                       $(":radio").removeAttr("checked");
                       
                       if (datos[0].TIEMPO_IND == "M") {

                           $("#rbMediodia").parent().attr("class", "checked");
                           $("#rbMediodia").attr("checked", "checked");

                       } else {


                           if (datos[0].TIEMPO_IND == "D") {

                               $("#rbDiacompleto").parent().attr("class", "checked");
                               $("#txthorainicio").attr("disabled", "disabled");
                               $("#txthorafin").attr("disabled", "disabled");
                               $("#rbDiacompleto").attr("checked", "checked");

                           } else {


                               if (datos[0].TIEMPO_IND == "H") {

                                   $("#rbSuspensionHoras").parent().attr("class", "checked");
                                   $("#rbSuspensionHoras").attr("checked", "checked");

                               } 

                           }
                       }
                       $("#txthorainicio").val(datos[0].HORA_INICIO);
                       $("#txthorafin").val(datos[0].HORA_FIN);

                       $.ajaxSetup({ async: false });
                       $.post("vistas/NS/ajax/NSMGFER.ASHX", { OPCION: "DL", CODE: datos[0].CODE},
                       function (res) {
                           //$("#contEstablecimiento").removeAttr("estado");
                           //$("#contEstablecimiento").html(res);
                           listasselect();
                       });
                       $.ajaxSetup({ async: true });
                       /*MAURICIO ARRESE*/
                       ListarConfiguracion();
                       /*MAURICIO ARRESE*/
                   },








                   error: function (msg) {

                       alert(msg) ; 

                   }

               });


           }
   }












   var plugins = function () {

       aMayuscula(":input");

       $("#txtDescripcion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 150, "greedy": false }); })

       inifechas("txtDia");

       $("#txthorainicio").focus(function () { $(this).inputmask("H:0")});
        $("#txthorafin").focus(function () { $(this).inputmask("H:0")});
        $('#TablaListado').dataTable();
      


   }

   return {
       init: function () {

           plugins();
           
           cargainicial();
           
          

       }
   };


}();
 function ListarConfiguracion() {
     $('#TablaListado').dataTable().fnDestroy();
     //var emp = $("#ctl00_hddctlg").val();
     var CODE = $('#txtCodigo').val();
     //var aa = $("#optanho").val();
     //var mm = $("#optmes").val();
     //var fe = mm + " " + aa;
     //fe = fe.toUpperCase();


     //$('#TablaListado').dataTable().fnDestroy()


     //ValidarPeriodo();

     //if (fe == $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hffecha").val()) {
     //    $("#btnNuevo").show();
     //} else {
     //    $("#btnNuevo").hide();
     //}
     $.ajax({
         type: "POST",
         url: "vistas/NS/ajax/NSMGFER.ASHX?OPCION=L" + "&CODE=" + CODE,
         contentType: "application/json;",
         dataType: "json",
         success: function (datos) {
             if (datos == null) {
                 iniciaTabla('TablaListado');
                 return false;
             }
             var parms = {
                 data: datos,
                 columns: [
                     {
                         data: "CTLG_CODE",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).attr('align', 'center')
                         }
                     },
                     {
                         data: "CATALOGO",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).attr('align', 'center')
                         }
                     },
                     {
                         data: "ESTABLECIMIENTO",
                         createdCell: function (td, cellData, rowData, row, col) {
                             $(td).attr('align', 'center')
                         }
                     },
   
                      {

                          data: null,
                          defaultContent: '<a class="btn red Eliminar" title="Eliminar fila."><i class="icon-minus"></i></a>',
                          createdCell: function (td, cellData, rowData, row, col) {
                              $(td).attr('align', 'center')
                          }

                      }
                 ]

             }

             oListado = iniciaTabla('TablaListado', parms);


             $('#TablaListado tbody').on('click', 'a', function () {//si existieran dos etiquetas en una sola fila

                 var pos = oListado.api(true).row($(this).parent().parent()).index();
                 var row = oListado.fnGetData(pos);
                 var cod = row.CODIGO;//nombre de la data
                 var empr = row.CTLG_CODE; //empresa
                 var scsl = row.SCSL_CODE;
                 var row2 = $(this).parents('tr')[0];

           
                 $.ajaxSetup({ async: false });
                 Bloquear("ventana");
                 $.post("vistas/NS/ajax/NSMGFER.ASHX", { OPCION: "DE", CODE: $('#txtCodigo').val(), ESTABLECIMIENTO: scsl, ESTADO_IND: "I", USUA_ID: $('#ctl00_lblusuario').html(), EMPRESA: empr },
                     function (res) {
                         if (res.indexOf("error") == -1) {
                             exito();
                             oListado.fnDeleteRow(pos);
                         } else {
                             noexito();
                         }
                     }
                 );
                 
                 Desbloquear("ventana");
                 $.ajaxSetup({ async: true }); 

             });
         },
         error: function (msg) {
             alert(msg);
         }
     });

 }

               

                   


    
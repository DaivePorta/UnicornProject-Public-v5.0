
var NBLANUL= function () {
    var oTable = [];

    var handlePlugins = function () {
        $(".combo").select2();
    }

    var handleControls = function () {
        $("#cboEmpresa").on("change", function () {
            let pidmEmp = $("#cboEmpresa option:selected").attr('data-pidm');
            handleFillcboCuentas(pidmEmp);
        });

        $("#cbocta").on("change", function () {
            fnGetChequesAnulados();
        });
    }

    var IniTablaAnulaCheque = function () {
      
        var parms = {
            data: null,
            columns: [
                {
                    data: "NUMERO_CHEQ", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NUMERO_CUENTA" },
                { data: "NEMPRESA" },
                { data: "NTIPO" },
                {
                    data: "FECHA_EMISION",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHA_REGISTRO",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },             
                {
                    data: "FECHA",
                    type: "fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "USUARIO" }
               
            ],
            stateSave: false

        }



        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');



        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                
                var pidm = row.CTA_PIDM;
                var cta = row.CTA_CODE;
                var t = row.TIPO;
                var n = row.NUMERO_CHEQ;
                // var code = $('#cod' + $(this).attr("id")).html();/****!?***/
                window.open('?f=nbmcheq&pidm=' + pidm + '&cta=' + cta + '&t=' + t + '&n=' + n, '_blank');
            }

        });


        /*************FILTROSSS****************/


        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var min = parseInt($('#minfecha').val().split("/").reverse().join(""), 10);
                var max = parseInt($('#maxfecha').val().split("/").reverse().join(""), 10);
                var age = parseInt(data[6].split("/").reverse().join("")) || 0; // use data for the age column

                if ((isNaN(min) && isNaN(max)) ||
                     (isNaN(min) && age <= max) ||
                     (min <= age && isNaN(max)) ||
                     (min <= age && age <= max)) {
                    return true;
                }
                return false;
            }
        );

        inifechas('minfecha','maxfecha');

        $('#minfecha, #maxfecha').change(function () {
            oTable.api(true).draw();
        });

        /*--------------------------------*/
        $('input.column_filter').on('keyup click', function () {
            filterColumn($(this).parents('tr').attr('data-column'));
        });


    }

    var handleFillcboEmpresa = function () {
        var sEmpresa = fnGetEmpresas(1, "A", true);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").val("").change();
        $("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val());
    }


    var handleFillcboCuentas = function (pPidmEmp) {
        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/nbmcheq.ashx?flag=LCU" +
            "&pidm_cuenta=" + pPidmEmp + "&estado=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                let oTipoCta = datos;
                $("#cbocta").html('<option value="">TODOS</option>');
                $.each(oTipoCta, function (key, value) {
                    $("#cbocta").append("<option pidm='" + value.PIDM + "' value='" + value.CODE + "'>" + value.DESCRIPCION + "</option>");
                });

                $("#cbocta").val("").change();

            },
            error: function () {
                noexito();
            }
        });

    }



    var fnGetChequesAnulados = function () {
        let pidmEmpresa = $("#cboEmpresa option:selected").attr('data-pidm');
        let CodCta = $("#cbocta").val();

        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMCHEQ.ASHX?flag=LCHE&cuenta_bancaria=" + CodCta +
            "&pidm_cuenta=" + pidmEmpresa + 
            "&estado=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    oTable.fnClearTable();
                    oTable.fnAddData(datos);
                }
                else {
                    oTable.fnClearTable();
                    Desbloquear('ventana');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de cheques.");
                oTable.fnClearTable();
            }
        });

    }

    return {
        init: function () {
            handlePlugins();
            IniTablaAnulaCheque();
            handleControls();
            handleFillcboEmpresa();  
        }
    }
}();



var NBMANUL = function () {


    var handlePlugins = function () {
        $(".combo").select2();
    }


    var fillTablaMAnulaCheque = function () {
        
        var parms = {
            data: null,
            columns: [
                {data: null,               
                       defaultContent: '  <input type="checkbox" class="aprobarChk" />',
                       createdCell: function (td, cellData, rowData, row, col) {
                       
                           $(td).attr('align', 'center');
                           $(td).children("input").attr("id", "chk_" + row);

                          
                       }
                },
                { data: "NUMERO_CHEQ" },
                { data: "NUMERO_CUENTA.NOMBRE" },
                { data: "EMPRESA.NOMBRE" },
                { data: "TIPO.NOMBRE" },
                { data: "NGIRADOA"},
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(rowData.SMONEDA + $(td).html());

                    }
                },
                {
                    data: { _: "FECHA_EMISION.display", sort: parseInt("FECHA_EMISION.order") },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NESTADO_CHEQ",
                    createdCell: function (td, cellData, rowData, row, col) {
                        if(rowData.NESTADO_CHEQ=='RECHAZADO'){
                            $($(td).parents("tr")[0]).addClass("rechazado");}

                    } 
                }

            ],
            stateSave: false

        }



        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style').css("border-collapse","collapse");

        // Cargar_tabla(); //1

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
              //  window.open('?f=nbmletr&codigo=' + codigo, '_blank');
            }

        });

       
    }

    var handleFillcboEmpresa = function () {
        var sEmpresa = fnGetEmpresas(1, "A", true);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").val($('#ctl00_hddctlg').val()).change();
        //$("#cboEmpresa").select2('val', $('#ctl00_hddctlg').val());
    }


    var handleFillcboCuentas = function (pPidmEmp) {        
        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/nbmcheq.ashx?flag=LCU" +
            "&pidm_cuenta=" + pPidmEmp + "&estado=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                let oTipoCta = datos;
                $("#cbocta").html('<option value="">TODOS</option>');
                $.each(oTipoCta, function (key, value) {
                    $("#cbocta").append("<option pidm='" + value.PIDM + "' value='" + value.CODE + "'>" + value.DESCRIPCION + "</option>");
                });

                $("#cbocta").val("").change();
                
            },
            error: function () {
                noexito();
            }
        });

    }


    var funcionalidad = function(){

        $("#cboEmpresa").on("change", function () {
            let pidmEmp = $("#cboEmpresa option:selected").attr('data-pidm');
            handleFillcboCuentas(pidmEmp);
        });

        $("#cbocta").on("change", function () {
            Cargar_tabla();
        });


        $('#tblBandeja tbody').on('click', '.aprobarChk', function () {
            codigos = $('#hddauxiliar').val();
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            var cta = row.NUMERO_CUENTA.CODIGO
            var pidm = row.NUMERO_CUENTA.PIDM;           
            var t = row.TIPO.CODIGO
            var n = row.NUMERO_CHEQ
            
            var title = "Motivo";
            var text = '<textarea type="text" rows="2" id="txt_glosa"></textarea>';
            $('#_info_').remove();
            $("body").append("<div id='_info_" + "' class='infoDiv' style=\"max-width:50%;background-color:#FBFDB0; border-radius: 5px !important;\"><p align=\"center\" style=\"margin:5px;\"><strong>" +
                title + "</strong></p><div style=\"margin:4px;border-color:#e5e5e5;border-style:solid;border-width:1px;margin-botton:10px;\"></div><div style=\"overflow-y: auto; max-height: 150px;\"><p align=\"\" style=\"margin:5px;line-height: 1.5;\"><small>" +
                text + "</small></p><p><button style= 'margin:4px;'type='button' class='btn blue acpglos'>Aceptar</button><button style= 'margin:4px;'type='button' class='btn canglos'>Cancelar</button></p></div></div>");
            $('#_info_').hide();

            var ancho = parseInt($(this).css("width").split("px")[0]);
            var alto = parseInt($(this).css("height").split("px")[0]);
            var ancho_inf = parseInt($('#_info_').css("width").split("px")[0]);
            var alto_inf = parseInt($('#_info_').css("height").split("px")[0]);

            $(this).attr("over", true);
            $('#_info_').css({ 'position': 'absolute', 'left': $(this).offset().left  + 20 , 'top': $(this).offset().top - alto_inf + 5 });
            $('.infoDiv').hide();
        

            valor= cta + "," + pidm + "," + t + "," + n;

            if ($(this).is(":checked")) {
                
             
                $('#_info_').show();
                $('#_info_').focus();


                    $(this)
                        .attr("checked", false)
                        .parent().removeClass("checked");

                    objeto = $(this);

                    $(".acpglos").click(function () {
                        if ($("#txt_glosa").val() != "") {
                            $('.infoDiv').hide();
                            objeto
                                .attr("checked", true)
                                .parent().addClass("checked");

                            codigos += ("|" + valor + "," + $("#txt_glosa").val());  // SE ASIGNA EL VALOR
                            $('#hddauxiliar').val(codigos);
                        } else {

                            alertCustom("Ingrese un motivo para la anulación!");
                        }
                    });
                    $(".canglos").click(function () {
                       $('.infoDiv').hide();                        
                      
                    });
                

               
            } else {
                if (codigos.indexOf(valor) >= 0) {
                    codigos = codigos.replace(codigos.substring(codigos.indexOf(valor) - 1, codigos.indexOf(valor) + valor.length + codigos.split(valor)[1].split("|")[0].length ), "");
                    $('#hddauxiliar').val(codigos);
                }
            }
           
        });
    
    }

    $("#btnanular").click(function () { CrearAnulacionEsp(); });

    return {
        init: function () {
            handlePlugins();
            fillTablaMAnulaCheque();
            funcionalidad();
            handleFillcboEmpresa();                     
        }
    }
}();

function chekar_rechazados() {
    codigoss = $('#hddauxiliar').val();
    $('#tblBandeja tbody .rechazado .aprobarChk').each(function(){
        var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
        var row = oTable.fnGetData(pos);

        var cta = row.NUMERO_CUENTA.CODIGO
        var pidm = row.NUMERO_CUENTA.PIDM;
        var t = row.TIPO.CODIGO
        var n = row.NUMERO_CHEQ

        $(this)
        .attr("checked", true)
        .parent().addClass("checked");

        valor = cta + "," + pidm + "," + t + "," + n;


        codigoss += ("|" + valor + "," + "RECHAZADO");  // SE ASIGNA EL VALOR
        $('#hddauxiliar').val(codigoss);
    });
}

function Cargar_tabla() {
    let pidmEmpresa = $("#cboEmpresa option:selected").attr('data-pidm');
    let CodCta = $("#cbocta").val();
    $.ajax({
        type: "POST",
        url: "vistas/NB/ajax/NBMANUL.ASHX?flag=LCHEANU&pidm_cuenta=" + pidmEmpresa + "&cuenta_bancaria=" + CodCta ,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
                var json = datos;
                $('.infoDiv').hide();
                oTable.fnClearTable()

                if (json != null) {
                    oTable.fnAddData(json);
                    chekar_rechazados();
                } else {
                    infoCustom2("No existen datos.")
                }                         
        }
    });
 
}

function CrearAnulacion(funcion) {

    var p_codi = $('#hddauxiliar').val().substring(1);
    var p_user = $('#ctl00_lblusuario').html();

    var v_flag =  1;

        Bloquear("ventana");
        $.post("vistas/NB/ajax/NBMANUL.ASHX", {
            flag: v_flag,
            codigo: p_codi,           
            usuario: p_user

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    Cargar_tabla();
                    $('#hddauxiliar').val("");
                } else {
                    noexito();
                }
            });
    
}

v_existe = false;

function CrearAnulacionEsp() {


    var bodyER = "<div class='row-fluid'>" +
        "<div class='span4' style='width: 18%;'><b>EMPRESA:</b></div><div class='span8'> <div class='control-group'><div class='controls'>" +
        '<select id="slcEmpresa" class="span12 obligatorio" data-placeholder="EMPRESA"><option></option></select>' +
        "</div></div></div></div>" +
        "<div class='row-fluid'>" +
        "<div class='span4' style='width: 18%;'><b>CTA BANCARIA:</b></div><div class='span8'><div class='control-group'><div class='controls'>" +
        '<select id="slcctaban" data-placeholder="CUENTA BANCARIA" class="span12 obligatorio"><option></option></select>' +
        "</div></div></div></div>" +
        "<div class='row-fluid'>" +
        "<div class='span6'>" +
        "<div class='row-fluid'>" +
        "<div class='span4' style='width: 40%;'><b>TIPO:</b></div><div class='span7'> <div class='control-group'><div class='controls'>" +
        '<select id="slctipo" data-placeholder="TIPO" class="span12 obligatorio"><option value="C">COMERCIALES</option><option value="D">PAGO DIFERIDO</option></select>' +
        "</div></div></div>" +
        "</div>" +
        "<div class='row-fluid'>" +
        "<div class='span4' style='width: 40%;'><b>CHEQUERA:</b></div><div class='span7'> <div class='control-group'><div class='controls'>" +
        '<select id="slcchqa" data-placeholder="CHEQUERA" class="span12 obligatorio"><option></option></select>' +
        "</div></div></div>" +
        "</div>" +
        "</div>" +
        "<div class='span6'>" +
        "<div class='row-fluid'>" +
        "<div class='span12'><b>MOTIVO:</b></div>" +
        "</div>" +
        "<div class='row-fluid'>" +
        "<div class='control-group'><div class='controls'>" +
        '<textarea type="text" rows="2" id="txt_glosa_modal" class="span12 obligatorio" style="margin-bottom: 0;"></textarea>' +
        "</div></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row-fluid'>" +
        "<div class='span4' style='width: 18%'>" +
        "<b>NUMERACIÓN</b>" +
        "</div>" +
        "<div class='span3'>" +
        "<div class='control-group'>" +
        "<div class='controls'>" +
        '<input type="text" id="txt_numero" maxlength="8" class="span12 obligatorio" disabled="disabled"/>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='span1' style='text-align: center;'><b>a</b></div>" +
        "<div class='span3'>" +
        "<div class='control-group'>" +
        "<div class='controls'>" +
        '<input type="text" id="txt_numero_hasta" maxlength="8" class="span12 obligatorio" disabled="disabled"/>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div/>";
    var footerER =
        '<button id="btngrDetalle" type="button" class="btn blue"><i class="icon-save"></i> Grabar</button>' +
        '<button class="btn" type="button" data-dismiss="modal"><i class="icon-remove"></i> Cancelar</button>';


    //var existe = $("#modaleditarRegistro").html() == undefined ? true : false;


    if (!v_existe) {
        crearmodal("modalCrearAnulacion", "Anular Cheque No Registrado", bodyER, footerER);
        cargarCombos();
        $("#btngrDetalle").click(function () { CrearDetalle(); });
        v_existe |= true;
    }

    $("#modalCrearAnulacion").modal("show");

}

$("#rptasi").click(function () {
    CrearDetalle();
    $("#modalconfir").modal('hide');
});

function cargarCombos() {

    $.ajaxSetup({ async: false });

    $("#slcEmpresa").select2();

    $.post("vistas/NB/ajax/NBMCHEQ.ASHX", { flag: 5 },
      function (res) {
          if (res != null && res != "" && res.indexOf("error") < 0) {
              $("#slcctaban").select2();                      

              $("#slcEmpresa").html(res);              

              $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()).change(function () {                  

                  $.ajaxSetup({ async: false });

                  console.log($("#slcEmpresa :selected").attr("pidm"));   

                  $("#slcchqa").select2("val", "");
                  $("#slcchqa").empty();
                  $("#slcchqa").append("<option></option>");
                  $("#txt_numero, #txt_numero_hasta, #txt_glosa_modal").val("");
                  $("#txt_numero").val("").attr("disabled", true);
                  $("#txt_numero_hasta").val("").attr("disabled", true);

                  $.post("vistas/NB/ajax/NBMCHEQ.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm") },
                    function (res) {
                        if (res != null && res != "" && res.indexOf("error") < 0) {
                            $("#slcctaban").html(res);
                            $("#slctipo, #slcctaban").change(
                                   function () {

                                       $.ajaxSetup({ async: false });

                                       if ($("#slcctaban").val() !== '') {
                                           $.post("vistas/NB/ajax/NBMANUL.ASHX", { flag: "L", cuenta_bancaria: $("#slcctaban").val(), pidm_cuenta: $("#slcctaban :selected").attr("pidm"), tipo: $("#slctipo").val() },
                                               function (res) {
                                                   if (res != null && res != "" && res.indexOf("error") < 0) {

                                                       $("#slcchqa").html("").html(res).change(
                                                           function () {

                                                               if ($(this).val() != "") {                                                                   
                                                                   cargaNumero();
                                                               } else {
                                                                   $("#txt_numero").val("").attr("disabled", true);
                                                                   $("#txt_numero_hasta").val("").attr("disabled", true);
                                                               }
                                                           }

                                                       ).change();
                                                   } else {
                                                       $("#slcchqa").html("<option></option>").change();
                                                   }

                                               });
                                           $.ajaxSetup({ async: true });
                                       }
                                   }
                                );
                        } else {
                            $("#slcctaban").html("<option></option>").change();
                        }

                    });
                  $.ajaxSetup({ async: true });
              });

          }

      });
    $.ajaxSetup({ async: true });

    $("#slctipo, #slcchqa").select2();


    $("#txt_numero").change(function () {
        if (parseInt($("#hddauxiliar2").val()) > parseInt($(this).val())) {           
            infoCustom2("Ingrese un número de cheque no registrado");
            $(this).focus();           
        }
        else {           
            if (parseInt($("#slcchqa :selected").attr("fi")) < parseInt($(this).val())) {                
                infoCustom2("Número de cheque fuera de rango!");
                $(this).focus();               
            }

            if ($(this).val() != "") {
                var tam=$(this).val().length
                if (tam > 8) {
                    $(this).val($(this).val().substring(tam - 8));

                } else {
                    var valorf = "00000000".substring(0, 8 - $(this).val().length);
                    $(this).val(valorf + $(this).val());
                }                
            }
        }
    });

    $("#txt_numero_hasta").change(function () {
        $(this).parent('.control-group').removeClass("error");
        if (parseInt($("#hddauxiliar2").val()) > parseInt($(this).val())) {            
            infoCustom2("Ingrese un número de cheque no registrado");            
            $(this).focus();           
        }
        else {           

            if (parseInt($("#slcchqa :selected").attr("fi")) < parseInt($(this).val())) {                
                infoCustom2("Número de cheque fuera de rango!");                
                $(this).focus();                
            }

            if ($(this).val() != "") {
                var tam = $(this).val().length
                if (tam > 8) {
                    $(this).val($(this).val().substring(tam - 8));

                } else {
                    var valorf = "00000000".substring(0, 8 - $(this).val().length);
                    $(this).val(valorf + $(this).val());
                }               
            }
        }
    });

    $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
    $("#slcctaban").select2("val", $("#slcfilcta").val()).change();

}

function cargaNumero() {
   

        var ncta = $("#slcctaban").val();
        var ctapidm = $("#slcctaban :selected").attr("pidm");
        var p_tipo = $("#slctipo").val();
        var code_chequera = $("#slcchqa").val();

        $.ajaxSetup({ async: false });

        $.post("vistas/NB/ajax/NBMCHEQ.ASHX", { flag: 4, cuenta_bancaria: ncta, pidm_cuenta: ctapidm, tipo: p_tipo, code_chequera: code_chequera },
            function (res) {
                $("#txt_numero").removeAttr("style");
                $("#txt_numero_hasta").removeAttr("style");
                if (res.NUMERO_CHEQUE.length === 8 && res.NUMERO_CHEQUE !== "RNC") {
                    $("#txt_numero").val(res.NUMERO_CHEQUE);
                    $("#txt_numero_hasta").val(res.NUMERO_CHEQUE);
                    $("#txt_numero").attr("disabled", false);
                    $("#txt_numero_hasta").attr("disabled", false);
                } else if (res.NUMERO_CHEQUE === "RNC") {
                    $("#txt_numero").css("border-color", "rgb(190, 67, 67)");
                    $("#txt_numero_hasta").css("border-color", "rgb(190, 67, 67)");
                    alertCustom("La cuenta bancaria no posee una chequera registrada, registre una nueva Chequera!");
                    $("#txt_numero").val("");
                    $("#txt_numero_hasta").val("");
                    $("#txt_numero").attr("disabled", true);
                    $("#txt_numero_hasta").attr("disabled", true);
                } else {
                    alertCustom("No se pudo obtener correctamente el número de cheque.");
                    $("#txt_numero").css("border-color", "rgb(190, 67, 67)");
                    $("#txt_numero_hasta").css("border-color", "rgb(190, 67, 67)");
                    $("#txt_numero").val("");
                    $("#txt_numero_hasta").val("");
                    $("#txt_numero").attr("disabled", true);
                    $("#txt_numero_hasta").attr("disabled", true);
                }       

          });
        $.ajaxSetup({ async: true });

} 


function verificarNumeracion() {

    var rango_inicio = parseInt($("#hddauxiliar2").val());
    var rango_final = parseInt($("#slcchqa :selected").attr("fi"));
    var nro_inicio = parseInt($("#txt_numero").val());
    var nro_final = parseInt($("#txt_numero_hasta").val());
    var mensaje = "";

    if (nro_inicio < rango_inicio || nro_final < rango_inicio) {
        mensaje = "Ingrese un número de cheque no registrado";
    } else if (nro_inicio > rango_final || nro_final > rango_final) {
        mensaje = "Número de cheque fuera de rango!";
    } 

    return mensaje;

}


function CrearDetalle() {
    
    if (!vErrorBodyAnyElement(".obligatorio")) {
        var error = verificarNumeracion();
        if (error == "") {
            Bloquear("ventana");
            $.post("vistas/NB/ajax/NBMANUL.ASHX", {
                flag: 'ARCHE',
                empresa: $("#slcEmpresa").val(),
                tipo: $("#slctipo").val(),
                cuenta_bancaria: $("#slcctaban").val(),
                pidm_cuenta: $("#slcctaban :selected").attr("pidm"),
                cheque_inicio: $("#txt_numero").val(),
                cheque_final: $("#txt_numero_hasta").val(),
                usuario: $('#ctl00_lblusuario').html(),
                //glosa: ($("#slcctaban").val() + "," + $("#slcctaban :selected").attr("pidm") + "," + $("#slctipo").val() + "," + $("#txt_numero").val() + "," + $("#txt_glosa_modal").val())
                glosa: $("#txt_glosa_modal").val()

            },
                function (res) {
                    Desbloquear("ventana");
                    if (res != "" && res != null && res == "OK") {
                        $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                        $("#slcctaban").select2("val", "").change();
                        $("#slcchqa").select2("val", "");
                        $("#slcchqa").empty();         
                        $("#slcchqa").append("<option></option>");
                        $("#txt_numero, #txt_numero_hasta, #txt_glosa_modal").val("");
                        $("#txt_numero").attr("disabled", true);
                        $("#txt_numero_hasta").attr("disabled", true);
                        $("#modalCrearAnulacion").modal("hide");
                        exito();
                    } else {
                        noexito();
                    }
                });
        } else {
            infoCustom2(error);
        }
        
    } else {
        infoCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }

}


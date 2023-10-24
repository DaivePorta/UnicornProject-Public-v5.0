

var NCLRTEP = function () {

  
    var fillBandeja = function () {

        json = null;
        
        var parms = {
            data: json,
            columns: [
                { data: "DESCRIPCION" },
                { data: "NUMERO" },
                { data: "NRESPONSABLE" },
                { data: "NTIPO" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                
            ]

        }
                
        oTable = iniciaTabla('tblBandeja', parms);
        filcol("", "", oTable);
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
                var codigo = row.CODIGO;
                var cta_pidm = row.PIDM;
                var cta_code = row.CUENTA.CODIGO;
                window.location.href = '?f=ncmrtep&codigo=' + codigo+'&ctp='+cta_pidm+'&ctc='+cta_code;
            }

        });


        $.ajaxSetup({ async: false });
        $.post("vistas/NC/ajax/NCMRTEP.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {

                  $("#filemp").select2().html(res).change(function () {
                      var valorpidm = $("#filemp :selected").attr("pidm") == undefined ? "" : $("#filemp :selected").attr("pidm");
                      filcol(valorpidm, $("#filcta").val(), oTable);

                      $.ajaxSetup({ async: false });

                      $.post("vistas/NC/ajax/NCMRTEP.ASHX", { flag: 6, empresapidm: valorpidm },
                        function (res2) {
                            if (res2 != null && res != "" && res2.indexOf("error") < 0) {
                                $("#filcta").select2().html(res2 + "<option value=''>Todo</option>").change(function () {
                                    filcol(valorpidm, $("#filcta").val(), oTable);

                                }

                                );
                            } else {
                                $("#filcta").html("<option></option>").change();
                            }

                        });
                      $.ajaxSetup({ async: true });
                  });

              }
          });
        $.ajaxSetup({ async: true });
    }
   
    return {
        init: function () {
          
            fillBandeja();

        }
    }

}();


var NCMRTEP = function () {

    var plugins = function () {

        $("#slcEmpresa, #slcctaban, #slctipo").select2();
        $("#txt_fecha_inicio, #txt_fecha_fin").datepicker();       
        $("#txtnro").focus(function () { $(this).inputmask({ "mask": "C", "repeat": 20, "greedy": false }); });
        $("#txtpere").focus(function () { $(this).inputmask({ "mask": "l", "repeat": 50, "greedy": false }); });
        $("#txtdesc").focus(function () { $(this).inputmask({ "mask": "U", "repeat": 50, "greedy": false }); });

    }


    var cargaCombos = function () {

        $.ajaxSetup({ async: false });
        $.post("vistas/NC/ajax/NCMRTEP.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                
                  $("#slcEmpresa").html(res).change(function () {


                      $.ajaxSetup({ async: false });

                      $.post("vistas/NC/ajax/NCMRTEP.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm") },
                        function (res) {
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#slcctaban").html(res).change(function () {

                                  var mone= $("#slcctaban :selected").attr("moneda");

                                  $("#moneda").html(mone);
                                    
                                }

                                );
                            } else {
                                $("#slcctaban").html("<option></option>").change();
                            }

                        });
                      $.ajaxSetup({ async: true });


                      /** EMPLEADO **/
                      var jsonPersonasEmpleado = cargarJsonEmpleado($(this).val());

                      arrayPersonasEmpleado = new Array();

                      var jsonEmpleado = jQuery.parseJSON(jsonPersonasEmpleado);
                      if (jsonEmpleado != null) {
                          jsonEmpleado.filter(function (e) { if (arrayPersonasEmpleado.indexOf(e.NOMBRE) < 0) { arrayPersonasEmpleado.push(e.NOMBRE); } });
                      }

                      $(".personasEmpleado").typeahead({ source: arrayPersonasEmpleado }, { highlight: true, hint: true });

                      $(".personasEmpleado").keyup(function () {
                          $(this).siblings("ul").css("width", $(this).css("width"))

                      }).change(function () {
                          var actual = $(this);
                          var encontrado = false;
                          if (jsonEmpleado != null) {
                              jsonEmpleado.filter(function (d) {
                                  if (d.NOMBRE == actual.val()) {
                                      actual.attr("valor", d.PIDM);
                                      encontrado = true;

                                  }
                                  if (!encontrado) {
                                      actual.removeAttr("valor");
                                  }
                              });
                          }
                          if (actual.val() == "") { actual.removeAttr("valor"); }
                      });
                  });
              }
          });
        $.ajaxSetup({ async: true });



        $.ajaxSetup({ async: false });
        $.post("vistas/NC/ajax/NCMRTEP.ASHX", { flag: 4 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {

                  $("#slctipo").html(res);
                  $("#slctipo option").filter(function (e, j) { var valorO = $(j).val(); if (valorO != "0006" && valorO != "0005" && valorO != "") $(j).remove(); });

              }

          });
        $.ajaxSetup({ async: true });


        function cargarJsonEmpleado(empresa) {

            var resp = "";
            $.ajax({
                type: "post",
                url: "vistas/GL/ajax/GLMLETR.ashx?flag=LE-2&empresa=" + empresa,
                contenttype: "application/json;",
                datatype: "json",
                async: false,

                success: function (datos) {
                    if (datos != null && datos != "") {

                        resp = datos;

                    } else {
                        resp = "";
                    }
                }
            });
            return resp;

        }

    }


    var cargaInicial = function () {


        var cod = ObtenerQueryString("codigo");
        var cta_pidm = ObtenerQueryString("ctp");
        var cta_code = ObtenerQueryString("ctc");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:actualizarTarjetaEmpresa();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCMRTEP.ASHX?flag=3&codigo=" + cod + '&pidm_cuenta=' + cta_pidm + '&cuenta_bancaria=' + cta_code,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#hddauxiliar").val(datos[0].CODIGO);

                    //$("#slctipo").val(datos[0].TIPO);
                    $("#slctipo").select2("val", datos[0].TIPO).change();
                    $("#txtnro").val(datos[0].NUMERO);
                    $("#txtdesc").val(datos[0].DESCRIPCION);
                    $("#txtpere").val(datos[0].NRESPONSABLE);
                   
                    $("#txt_fecha_inicio").val(datos[0].FECHA_INICIO);
                    $("#txt_fecha_fin").val(datos[0].FECHA_FIN);
                    $("#slcEmpresa").select2("val", datos[0].EMPRESA.CODIGO).change();
                    //$("#slcctaban").val(datos[0].CUENTA.CODIGO);
                    $("#slcctaban").select2("val", datos[0].CUENTA.CODIGO).change();
                    $("#slcctaban").attr("disabled", "disabled");
                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }
                },
                error: function (msg) {

                    alert(msg);
                }
            });
        }
    }

    return {
        init: function () {
            plugins();
            cargaCombos();
            cargaInicial();
        }
    }

}();


function crearTarjetaEmpresa() {

    var p_tipo = $("#slctipo").val();
    var p_nuro = $("#txtnro").val();
    var p_desc = $("#txtdesc").val();
    var p_pere = $("#txtpere").attr("valor");
    var p_ctab = $("#slcctaban").val();
    var p_fein = $("#txt_fecha_inicio").val();
    var p_fefi = $("#txt_fecha_fin").val();
    var p_pidm = $("#slcEmpresa :selected").attr("pidm");
    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';

    var p_user = $('#ctl00_txtus').val();


    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMRTEP.ASHX", {
            flag: 1,
            pidm_cuenta: p_pidm,
            cuenta_bancaria: p_ctab,
            nro: p_nuro,
            descripcion: p_desc,
            pidm_responsable: p_pere,
            tipo: p_tipo,
            estado: p_acti,
            usuario: p_user,
            fecha_inicio: p_fein,
            fecha_fin: p_fefi

        },
            function (res) {
                Desbloquear("ventana");
                if (res != "" && res.indexOf("error")<0) {
                    exito();
                    $("#hddauxiliar").val(res);
                      $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                      $("#grabar").attr("href", "javascript:actualizarTarjetaEmpresa();");

                } else {
                    noexito();
                }
            });
    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }

}



function actualizarTarjetaEmpresa() {

    var p_codigo = $("#hddauxiliar").val();
    var p_tipo = $("#slctipo").val();
    var p_nuro = $("#txtnro").val();
    var p_desc = $("#txtdesc").val();
    var p_pere = $("#txtpere").attr("valor");
    var p_ctab = $("#slcctaban").val();
    var p_fein = $("#txt_fecha_inicio").val();
    var p_fefi = $("#txt_fecha_fin").val();
    var p_pidm = $("#slcEmpresa :selected").attr("pidm");
    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';

    var p_user = $('#ctl00_txtus').val();


    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMRTEP.ASHX", {
            flag: 2,
            codigo:p_codigo,
            pidm_cuenta: p_pidm,
            cuenta_bancaria: p_ctab,
            nro: p_nuro,
            descripcion: p_desc,
            pidm_responsable: p_pere,
            tipo: p_tipo,
            estado: p_acti,
            usuario: p_user,
            fecha_inicio: p_fein,
            fecha_fin: p_fefi

        },
            function (res) {
                Desbloquear("ventana");
                if (res != "" && res.indexOf("error") < 0) {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:actualizarTarjetaEmpresa();");

                } else {
                    noexito();
                }
            });
    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }
}


function filcol(pidm, cta, oTablepf) {

    
    $.ajax({
        type: "POST",
        url: "vistas/NC/ajax/NCMRTEP.ASHX?flag=L&pidm_cuenta=" + pidm + "&cuenta_bancaria="+cta,
        contentType: "application/json;",
        async:false,
        dataType: "json",
        success: function (datos) {
            if(datos!=""){
                oTablepf.fnClearTable();
                if (datos != null) {
                    oTablepf.fnAddData(datos);
                }
            }
        }
    });
}
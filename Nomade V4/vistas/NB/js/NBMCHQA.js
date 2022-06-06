var NBMCHQA = function () {

    var cargarCombos = function () {

        $.ajaxSetup({ async: false });
        $("#slcEmpresa").select2();
        $.post("vistas/NB/ajax/NBMCHQA.ASHX", { flag: 5 },
          function (res) {
              if (res != null && res != "" && res.indexOf("error") < 0) {
                  $("#slcctaban").select2();
                  
                  $("#slcEmpresa").html(res).change(function () {

                      $("#txtChqInicial").val("");
                      $("#txtNroChq").val("");
                      $("#txtChqFinal").val("");
                      $.ajaxSetup({ async: false });
                     
                      $.post("vistas/NB/ajax/NBMCHQA.ASHX", { flag: 6, empresapidm: $("#slcEmpresa :selected").attr("pidm") },
                          function (res) {
                              
                              $("#slcctaban").select2("val", "");
                              $("#lblmonto").html("Monto");
                            if (res != null && res != "" && res.indexOf("error") < 0) {
                                $("#slcctaban").html(res).change(function () {

                                    cargaNumeroInicial("N");

                                    var mone_code = $("#slcctaban :selected").attr("moneda");

                                    $.post("vistas/NB/ajax/NBMCHQA.ASHX", { flag: "M", codigo: mone_code },
                                        function (resp) {
                                            $("#lblmonto").html("Monto (" + resp + ")");
                                        });
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



        $("input:radio[name=rb_tipo]").change(function () {

            cargaNumeroInicial("N");

        });

    }


    var funcionalidad = function () {

      
        function calculaFinal() {

            $("#txtChqInicial, #txtNroChq").change(function () {
                if ($("#txtChqInicial").val() != "" && $("#txtNroChq").val() != "") {
                    $("#txtChqFinal").val(parseInt($("#txtChqInicial").val()) + parseInt($("#txtNroChq").val()) - 1);
                    if ($("#txtChqFinal").val().length < $("#txtChqInicial").val().length) {
                        var valorf = $("#txtChqInicial").val().substring(0,$("#txtChqInicial").val().length - $("#txtChqFinal").val().length);
                        $("#txtChqFinal").val(valorf+$("#txtChqFinal").val());
                    }
                }
            });
        }

      
        calculaFinal();
    }


    var cargaInicial = function () {


        $("input:radio[name=rb_tipo]").change();
      
        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NB/ajax/NBMCHQA.ASHX?codigo=" + cod + "&flag=3",
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {

                    


                    $('#hddauxiliar').val(datos[0].CODIGO);

                    $("input:radio[name=rb_tipo]").removeAttr("checked").parent("span").removeClass("checked");
                    $("input:radio[value=" + datos[0].TIPO + "]").attr("checked", true).parent("span").addClass("checked");
                    $("input:radio[name=rb_tipo]").change();
                    $("#hddauxiliar4").val(datos[0].TIPO);

                    $("#slcEmpresa").select2("val", datos[0].EMPRESA).change();
                    $("#slcctaban").select2("val", datos[0].CTA_CODE).change();
                    $("#hddauxiliar5").val(datos[0].CTA_CODE);
                    $("#txt_fecha_rgto").val(datos[0].FECHA_REGISTRO);
                    $("#txt_fecha_inicio").val(datos[0].FECHA_INICIO);
           
                    $("#txtChqInicial").val(datos[0].CHEQUE_INICIAL);
                    $("#hddauxiliar3").val(datos[0].CHEQUE_INICIAL);
                    $("#txtChqFinal").val(datos[0].CHEQUE_FINAL);
                    $("#txtNroChq").val(datos[0].NRO_CHEQUES);
                    $("#txt_monto").val(datos[0].MONTO);
                  //  $("#txtNroChq").val(datos[0].MONEDA_CODE);

                    cargaNumeroInicial("S");
                    if (parseInt($('#hddauxiliar2').val()) - 1 != parseInt(datos[0].CHEQUE_FINAL)) {
                        $(".portlet-body :input").attr("disabled", true);
                        $(".form-actions").hide();
                    }

                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }


    }


    var plugins = function () {

        var date = new Date();
        var fecha_actual = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString();
        $("#txt_fecha_rgto, #txt_fecha_inicio").datepicker('setDate', fecha_actual);

        inifechas("txt_fecha_inicio");

        aMayuscula(":input");
        $("#txtNroChq").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 3, "greedy": false }); });
        $("#txt_monto").keypress(function (e) { return (ValidaDecimales(e, this)); })
        $("#txtChqInicial").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 8, "greedy": false }); });
    }


    return {
        init: function () {
            cargarCombos();
            plugins();
            funcionalidad();
            cargaInicial();
        }


    }


}();


function cargaNumeroInicial(parm) {

    var ncta = $("#slcctaban").val();
    var ctapidm = $("#slcctaban :selected").attr("pidm");
    var p_tipo = $("input:radio[name=rb_tipo]:checked").val();
    $.ajaxSetup({ async: false });

    $.post("vistas/NB/ajax/NBMCHQA.ASHX", { flag: 4, cuenta_bancaria: ncta, pidm_cuenta: ctapidm, tipo: p_tipo },
      function (res) {
          if (res != null && res != "" && res.indexOf("error") < 0) {
              if (parm == "N"){
                  if (
                  ($("#hddauxiliar3").val() != ""
                   && p_tipo != $("#hddauxiliar4").val())
                   || ($("#hddauxiliar3").val() == ""
                   && $("#hddauxiliar4").val() == "")
                   || ncta != $("#hddauxiliar5").val()
                      ) {

                      $("#txtChqInicial").val(res).change();
                  } else {
                      $("#txtChqInicial").val($("#hddauxiliar3").val());
                      $("#txtNroChq").change();
                  }
              } else {
                  $("#hddauxiliar2").val(res);
              }
          }

      });
    $.ajaxSetup({ async: true });
}

function Actualizar() {

    var p_codi = $('#hddauxiliar').val();
    var p_tipo = $("input:radio[name=rb_tipo]:checked").val();
    var p_empr = $("#slcEmpresa").val();
    var p_ctab = $("#slcctaban").val();
    var p_ctap = $("#slcctaban :selected").attr("pidm")
    var p_fere = $("#txt_fecha_rgto").val();
    var p_fein = $("#txt_fecha_inicio").val();
    var p_mont = $("#txt_monto").val();
    var p_chin = $("#txtChqInicial").val();
    var p_chfi = $("#txtChqFinal").val();
    var p_nrch = $("#txtNroChq").val();
    var p_mone = $("#slcctaban :selected").attr("moneda");
    var p_user = $('#ctl00_lblusuario').html();
 
    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/NB/ajax/NBMCHQA.ASHX", {
            flag: 2,
            codigo: p_codi,
            empresa: p_empr,
            tipo: p_tipo,
            cta_code: p_ctab,
            cta_pidm: p_ctap,
            fecha_registro: p_fere,
            fecha_inicio: p_fein,
            cheque_inicial: p_chin,
            cheque_final: p_chfi,
            nro_cheques: p_nrch,
            usuario: p_user,
            monto: p_mont,
            moneda: p_mone

        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    } else {

        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }
}


function Crear() {
    var p_tipo = $("input:radio[name=rb_tipo]:checked").val();
    var p_empr = $("#slcEmpresa").val();
    var p_ctab = $("#slcctaban").val();
    var p_ctap = $("#slcctaban :selected").attr("pidm");
    var p_fere = $("#txt_fecha_rgto").val();
    var p_fein = $("#txt_fecha_inicio").val();
    var p_mont = $("#txt_monto").val();
    var p_chin = $("#txtChqInicial").val();
    var p_chfi = $("#txtChqFinal").val();
    var p_nrch = $("#txtNroChq").val();
    var p_mone = $("#slcctaban :selected").attr("moneda");
  
    var p_user = $('#ctl00_lblusuario').html();

    if (!vErrorBodyAnyElement(".obligatorio")) {
        Bloquear("ventana");
        $.post("vistas/NB/ajax/NBMCHQA.ASHX", {
            flag: 1,
            empresa: p_empr,
            tipo: p_tipo,
            cta_code: p_ctab,
            cta_pidm: p_ctap,
            fecha_registro: p_fere,
            fecha_inicio: p_fein,
          monto:p_mont,
            cheque_inicial: p_chin,
            cheque_final: p_chfi,
            nro_cheques: p_nrch,
            usuario: p_user,
            moneda: p_mone
      
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "" && res != null) {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#hddauxiliar").val(res);
                } else {
                    noexito();
                }
            });
    } else {
        alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");

    }
}





var NBLCHQA = function () {
    var oTableCheques = [];

    var handlePlugins = function () {
        $(".combo").select2();
    }

    var handleFillcboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").val($("#ctl00_hddctlg").val()).change();
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
                    $("#cbocta").append("<option value='" + value.CODE + "'>" + value.DESCRIPCION + "</option>");
                });

                $("#cbocta").val("").change();

            },
            error: function () {
                noexito();
            }
        });

    }


    var handleControls = function () {
        $("#cboEmpresa").on("change", function () {
            let pidmEmp = $("#cboEmpresa option:selected").attr('data-pidm');
            handleFillcboCuentas(pidmEmp);
        });

        $("#cbocta").on("change", function () {
            fnGetCheques();
        });
    
    }

    var handleTablaCheques = function () {
        let nroChequesUsados = 0;
        let ChequeInicial = 0;
        let ChequeFinal = 0;
        let estado = "";
        let bgc = "";

        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns: [
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NTIPO" },
                { data: "NUMERO_CUENTA" },
                { data: "CHEQUE_INICIAL" },
                { data: "CHEQUE_FINAL" },
                { data: "NEMPRESA" },

                {
                    data: "FECHA_INICIO",
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
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                     
                        /*nroChequesUsados = parseInt(rowData.NUMERO_CHEQUES_USADOS);
                        ChequeInicial = parseInt(rowData.CHEQUE_INICIAL);
                        ChequeFinal = parseInt(rowData.CHEQUE_FINAL);*/

                        if (rowData.ESTADO == "TERMINADO") {
                            estado = "TERMINADO";
                            bgc = "rgb(221, 140, 140)";
                        } else if (rowData.ESTADO == "EN USO") {
                            estado = "EN USO";
                            bgc = "rgb(255, 255, 207)";
                        } else if (rowData.ESTADO == "EN BLANCO") {
                            estado = "EN BLANCO";
                            bgc = "white";
                        }

                        cellData = estado;
                        $(td).html(estado).css("background-color", bgc);
                        
                        //Pendiente Definir Estados de Chequeras (esta lógica se tomó de la carga de datos desde vb.)
                        /*if (nroChequesUsados >= ChequeFinal) {
                            bgc = "rgb(221, 140, 140)";
                            estado = "TERMINADO";
                        }
                        else if (nroChequesUsados < ChequeFinal && nroChequesUsados > ChequeInicial) {
                            bgc = "rgb(255, 255, 207)";
                            estado = "EN USO";
                        }
                        else if (nroChequesUsados < ChequeFinal && nroChequesUsados <= ChequeInicial) {
                            bgc = "white";
                            estado = "EN BLANCO";
                        }

                        cellData = estado;
                        $(td).html(estado).css("background-color", bgc);*/

                    }
                }
            ]
        }

        oTableCheques = iniciaTabla("tblBandeja", parms);
        $('#tblBandeja').removeAttr('style');

   
        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCheques.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCheques.fnGetPosition(this);
                var row = oTableCheques.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=nbmchqa&codigo=' + codigo;
            }

        });


       

    }
 

    var fnGetCheques = function () {
        let pidmEmpresa = $("#cboEmpresa option:selected").attr('data-pidm');
        let CodCta = $("#cbocta").val();


        $.ajax({
            type: "post",
            url: "vistas/NB/ajax/NBMCHQA.ASHX?flag=LCQA&codigo=&cuenta_bancaria=" + CodCta +
            "&pidm_cuenta=" + pidmEmpresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length > 0) {
                    oTableCheques.fnClearTable();
                    oTableCheques.fnAddData(datos);
                }
                else {
                    oTableCheques.fnClearTable();
                    infoCustom2("No se encontraron datos!");
                    Desbloquear('ventana');
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de chequeras.");
                oTableCheques.fnClearTable();
            }
        });

    }

    return {
        init: function () {
            handlePlugins();
            handleTablaCheques();
            handleControls();
            handleFillcboEmpresa();      
        }
    };

}();


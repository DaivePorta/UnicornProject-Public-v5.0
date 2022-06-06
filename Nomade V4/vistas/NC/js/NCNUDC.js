function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();

    var p_tipocomprobante = $("#slccompro").val();
    var p_tipocampo = $('#slccampo').val();
    var p_scsl = $('#slcscsl').val();

    var p_caja = $('#slccajaalmacen').val();
    var p_impr = $('#slcimpr').val();
    var p_corre = $('#slccorre').val();
    var p_ndigito = $('#txtnrodig').val();
    var p_nrolineas = $('#txtnrolinea').val();
    var p_serie = $('#txtserie').val();
    var p_valini = $('#txtvalorini').val();
    var p_valfin = $('#txtvalorfin').val();
    var p_tipodoc = $('#slctipodoc').val();
    var p_autori = $('#txtcodauto').val();
    var p_imprenta = $('#txtimprenta').val();
    var p_empresa = $('#slcEmpresa').val();

    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["slccompro", "slcEmpresa", "slcscsl", "slccorre", "slccampo", "slccajaalmacen", "txtvalorini", "txtnrodig", "txtnrolinea", "slctipodoc", "txtcodauto", "slcimpr"])) {

        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCNUDC.ASHX", {
            flag: 2,
            tico: p_tipocomprobante,
            tica: p_tipocampo,
            user: p_user,
            acti: p_acti,
            codi: p_codi,
            scsl: p_scsl,
            caja: p_caja,
            impr: p_impr,
            corr: p_corre,
            ndig: p_ndigito,
            lineas: p_nrolineas,
            seri: p_serie,
            vain: p_valini,
            vafi: p_valfin,
            tido: p_tipodoc,
            auto: p_autori,
            imta: p_imprenta,
            codempr: p_empresa
        },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $("#chkactivo").is(':checked') ? 'A' : 'I';
    var p_tipocomprobante = $("#slccompro").val();
    var p_tipocampo = $('#slccampo').val();
    var p_scsl = $('#slcscsl').val();

    var p_caja = $('#slccajaalmacen').val();
    var p_impr = $('#slcimpr').val();
    var p_corre = $('#slccorre').val();
    var p_ndigito = $('#txtnrodig').val();
    var p_nrolineas = $('#txtnrolinea').val();
    var p_serie = $('#txtserie').val();
    var p_valini = $('#txtvalorini').val();
    var p_valfin = $('#txtvalorfin').val();
    var p_tipodoc = $('#slctipodoc').val();
    var p_autori = $('#txtcodauto').val();
    var p_imprenta = $('#txtimprenta').val();
    var p_empresa = $('#slcEmpresa').val();

    var p_user = $('#ctl00_lblusuario').html();

    if (vErrors(["slccompro", "slcEmpresa", "slccorre", "slcscsl", "slccampo", "slccajaalmacen", "txtvalorini", "txtnrodig", "txtnrolinea", "slctipodoc", "txtcodauto", "slcimpr"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 1, tico: p_tipocomprobante, tica: p_tipocampo, user: p_user, acti: p_acti, scsl: p_scsl, caja: p_caja, impr: p_impr, corr: p_corre, ndig: p_ndigito, lineas: p_nrolineas, seri: p_serie, vain: p_valini, vafi: p_valfin, tido: p_tipodoc, auto: p_autori, imta: p_imprenta, codempr: p_empresa },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                } else {
                    noexito();
                }
            });
    }
}

function funcionalidad() {
    $("#chkvfin").change(function () {
        if ($(this).is(":checked"))
            $("#txtvalorfin").attr("disabled", false);
        else
            $("#txtvalorfin").attr("disabled", "disabled").val("");;
    });

    $("#slccorre").change(function () {
        switch ($(this).val()) {
            case "C":
                $("#slcscsl").append("<option value='todo'>TODAS LAS SUCURSALES</option>")
                $("#slccajaalmacen").append("<option value='todo'>TODAS LAS CAJAS</option>")
                $("#slcimpr").append("<option value='todo'>IMPRESORA CORRESPONDIENTE</option>")

                $("#slcscsl").select2("val", "todo").attr("disabled", true);
                $("#slcimpr").select2("val", "todo").attr("disabled", true);
                $("#slccajaalmacen").select2("val", "todo").attr("disabled", true);
                break;

            case "P":
                if ($("#slcscsl").val() == "todo") { $("#slcscsl option[value=todo]").remove(); $("#slcscsl").select2("val", "").attr("disabled", false); }
                else { $("#slcscsl").select2("val", ""); }

                if ($("#slcimpr").val() == "todo") { $("#slcimpr option[value=todo]").remove(); $("#slcimpr").select2("val", ""); }

                if ($("#slccajaalmacen").val() == "todo") { $("#slccajaalmacen option[value=todo]").remove(); $("#slccajaalmacen").select2("val", ""); if ($("#slcscsl").val() != "") $("#slccajaalmacen").attr("disabled", false); }
                break;
            case "V":

                if ($("#slcscsl").val() == "todo") { $("#slcscsl option[value=todo]").remove(); $("#slcscsl").select2("val", "").attr("disabled", false); }

                $("#slccajaalmacen").append("<option value='todo'>TODAS LAS CAJAS</option>").select2("val", "todo").attr("disabled", true);

                $("#slcimpr").append("<option value='todo'>IMPRESORA CORRESPONDIENTE</option>").select2("val", "todo"); if ($("#slcscsl").val() != "") $("#slcimpr").attr("disabled", true);
                break;

            case "S":
                if ($("#slcscsl").val() == "todo") { $("#slcscsl option[value=todo]").remove(); $("#slcscsl").select2("val", "").attr("disabled", false); }

                $("#slccajaalmacen").append("<option value='todo'>TODAS LAS CAJAS</option>").select2("val", "todo").attr("disabled", true);

                $("#slcimpr").append("<option value='todo'>IMPRESORA CORRESPONDIENTE</option>").select2("val", "todo"); if ($("#slcscsl").val() != "") $("#slcimpr").attr("disabled", true);
                break;
        }

    });

    $("#slctipodoc").change(function (event, pp_caja, pp_impresora) {
        $("#slccorre").attr("disabled", false);
        if (($(this).val() == "0012" || $(this).val() == "0044") && $("#slccompro").val() == "T") {
            $("#slccorre").html("<option></option><option value='P'>POR PUNTO DE VENTA</option><option value='C'>CENTRALIZADO</option>").select2("val", "");

            if ($("#slccorre").val() == "C") {
                $("#slcscsl").append("<option value='todo'>TODAS LAS SUCURSALES</option>")
                $("#slccajaalmacen").append("<option value='todo'>TODAS LAS CAJAS</option>")
                $("#slcimpr").append("<option value='todo'>IMPRESORA CORRESPONDIENTE</option>")

                $("#slcscsl").select2("val", "todo").attr("disabled", true);
                $("#slcimpr").select2("val", "todo").attr("disabled", true);
                $("#slccajaalmacen").select2("val", "todo").attr("disabled", true);

            } else {
                if ($("#slccorre").val() == "P") {
                    if ($("#slcscsl").val() == "todo") { $("#slcscsl option[value=todo]").remove(); $("#slcscsl").select2("val", "").attr("disabled", false); }

                    if ($("#slcimpr").val() == "todo") { $("#slcimpr option[value=todo]").remove(); $("#slcimpr").select2("val", "").attr("disabled", false); }

                    if ($("#slccajaalmacen").val() == "todo") { $("#slccajaalmacen option[value=todo]").remove(); $("#slccajaalmacen").select2("val", "").attr("disabled", false); }
                }
            }
        }
        else {
            if ($("#slctipodoc").val() == "0009") {
                if ($("#slcscsl").val() != "") {
                    $("#slccorre").html("<option value='A'>POR ALMACEN</option>").select2("val", "");

                    $("#txtcajaalmacen").html("Almacén");

                    $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 9, codscsl: $("#slcscsl").val() },
                                                function (res) {
                                                    $("#slccajaalmacen").attr("disabled", false);
                                                    $("#slccajaalmacen").attr("data-placeholder", "ALMACEN");
                                                    $("#slccajaalmacen").select2();
                                                    $("#s2id_slccajaalmacen").attr("title", "Elija Establecimiento");
                                                    $("#slccajaalmacen").html(res);
                                                    $("#slccajaalmacen").select2("val", "");
                                                    if ($("#slcimpr").val() == "todo") $("#slcimpr").select2("val", "");

                                                    $("#slccajaalmacen").change(function (event, p_caja, p_impresora) {
                                                        if (p_caja != null) $("#slccajaalmacen").select2("val", p_caja);
                                                        $.ajaxSetup({ async: false });
                                                        $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 10, tico: $("#slccompro").val(), codalmacen: $(this).val() },
                                                              function (res) {
                                                                  if (res == "error") {
                                                                      $("#slcimpr").attr("disabled", true).select2("val", "");

                                                                  } else {

                                                                      $("#slcimpr").html(res);

                                                                      $("#slcimpr").attr("disabled", false);

                                                                      if (p_impresora != null) $("#slcimpr").select2("val", p_impresora);
                                                                      //   vErrorsCG("slcimpr");

                                                                  }
                                                              });
                                                        $.ajaxSetup({ async: true });


                                                    }); if (pp_caja != null && pp_impresora != null) { $("#slccajaalmacen").trigger("change", [pp_caja, pp_impresora]) }

                                                });
                } else { $("#slctipodoc").select2("val", ""); alertCustom("Primero seleccione un establecimiento!"); }

            } else {

                $("#slccorre").html("<option></option><option value='P'>POR PUNTO DE VENTA</option><option value='V'>POR VENDEDOR</option><option value='S'>POR SUCURSAL</option>").select2("val", "");

                if ($("#slcscsl").val() == "todo") { $("#slcscsl option[value=todo]").remove(); $("#slcscsl").select2("val", "").attr("disabled", false); }

                if ($("#slcimpr").val() == "todo") { $("#slcimpr option[value=todo]").remove(); $("#slcimpr").select2("val", ""); }

                if ($("#slccajaalmacen").val() == "todo") { $("#slccajaalmacen option[value=todo]").remove(); $("#slccajaalmacen").select2("val", ""); }

                if ($("#txtcajaalmacen").html() == "Almacén") {
                    $("#txtcajaalmacen").html("Caja"); $("#slcscsl").select2("val", ""); $("#slccajaalmacen").attr("data-placeholder", "CAJA");
                    $("#slccajaalmacen").select2(); $("#slcimpr").select2("val", "").attr("disabled", true);; $("#slccajaalmacen").select2("val", "");
                    $("#slccajaalmacen").html("").attr("disabled", "disabled");
                    $("#s2id_slccajaalmacen").attr("title", "Elija Establecimiento");

                }


            }
        }


    });
}

function caragainicombos() {
    $("#slcEmpresa").select2();
    $("#slcscsl").select2();
    $("#slccajaalmacen").select2();
    $("#s2id_slccajaalmacen").attr("title", "Elija Establecimiento");
    $("#slcimpr").select2();
    $("#slccorre").select2();
    $("#slctipodoc").select2();
    $("#slccompro").select2();
    $("#slccampo").select2();

    $.ajaxSetup({ async: false });

    $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 4 },
          function (res) {
              $("#slctipodoc").html(res);
          });
    $.ajaxSetup({ async: true });
    $.ajaxSetup({ async: false });
    $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 5, usua: $("#ctl00_txtus").val() },
          function (res) {
              $("#slcEmpresa").html(res);
              $("#slcEmpresa").change(function (event, p_sucursal, p_caja, p_impresora) {
                  $.ajaxSetup({ async: false });
                  $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 6, codempr: $("#slcEmpresa").val() },
                        function (res) {
                            if (res == "error") {
                                $("#slcscsl").attr("disabled", true);
                                $("#slccajaalmacen").attr("disabled", true);
                            }
                            else {
                                if (p_sucursal == null) { $("#slcscsl").select2("val", ""); }
                                $("#slccajaalmacen").attr("disabled", true);
                                if (p_caja != "todo") $("#slccajaalmacen").select2("val", "");
                                if (p_sucursal != "todo") {
                                    $("#slcscsl").attr("disabled", false);
                                    $("#slcscsl").html(res);
                                }
                                $("#slcscsl").change(function (event, paramsuc) {
                                    $("#slcscsl").parent().parent().attr("class", "control-group");
                                    if ($("#slccajaalmacen").val() != "todo") $("#slccajaalmacen").attr("disabled", true).select2("val", "");
                                    if ($("#slcimpr").val() != "todo") $("#slcimpr").attr("disabled", true).select2("val", "");
                                    if (paramsuc != null) {//selecciona el departamento que se quiere cargar en el select
                                        var sucursal = paramsuc;
                                        if (sucursal != "todo")
                                            $("#slcscsl").select2("val", sucursal).attr("disabled", false);
                                    } else {//setea p_distrito a null para q no avancen los trigger con  valores no existentes
                                        var sucursal = $("#slcscsl").val();
                                    }
                                    $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 7, codscsl: sucursal },
                                          function (res) {
                                              if (res == "error") {
                                                  $("#slccajaalmacen").attr("disabled", true);
                                                  $("#slcimpr").attr("disabled", true);
                                              }
                                              else {
                                                  if ($("#slcscsl").val() != "" && $("#slccajaalmacen").val() != "todo" && p_caja != "todo") {
                                                      $("#slccajaalmacen").attr("disabled", false);
                                                      $("#slccajaalmacen").html(res);
                                                  }
                                                  $("#slccajaalmacen").change(function (event, impresora) {
                                                      $("#slccompro").trigger("change", impresora);
                                                  });

                                                  if (p_caja != null) {//selecciona CAJA que se quiere cargar en el select
                                                      if (p_caja != "todo")
                                                          $("#slccajaalmacen").select2("val", p_caja);
                                                  } else { if ($("#slccajaalmacen").val() != "todo" && p_caja != "todo") $("#slccajaalmacen").select2("val", ""); }
                                                  if (p_impresora != null) {
                                                      if (p_impresora != "todo")
                                                          $("#slccajaalmacen").trigger("change", p_impresora);
                                                  }
                                              }
                                          });
                                });
                                if (p_sucursal != null) {
                                    $("#slcscsl").trigger("change", p_sucursal);
                                }
                            }
                        });
                  $.ajaxSetup({ async: true });
              });



          });

    $("#slccompro").change(function (event, p_impresora) {
        if ($(this).val() != "") { $("#slctipodoc").attr("disabled", false); }
        if ($("#slccompro").val() != "" && $("#slccajaalmacen").val() != "") {
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCNUDC.ASHX", { flag: 8, tico: $("#slccompro").val(), codcaja: $("#slccajaalmacen").val() },
                  function (res) {
                      if (res == "error") {
                          $("#slcimpr").attr("disabled", true);
                      } else {
                          $("#slcimpr").html(res);
                          $("#slcimpr").attr("disabled", false);
                          $("#slcimpr").change(function () { $("#slcimpr").parent().parent().attr("class", "control-group"); })
                          if (p_impresora != null) $("#slcimpr").select2("val", p_impresora);
                      }
                  });
            $.ajaxSetup({ async: true });
        }

        $("#slctipodoc option[value=0012]").remove()
        $("#slctipodoc option[value=0044]").remove();
        if ($("#slccompro").val() == "M") {
            $("#txtimprenta").attr("disabled", false);


        } else {
            $("#txtimprenta").attr("disabled", "disabled");
            $("#txtimprenta").val("");
            $("#slctipodoc").append("<option value='0012'>TICKET O CINTA GRAVADA</option></option><option value='0044'>TICKET O CINTA NO GRAVADA</option>");

        }

    });
    $.ajaxSetup({ async: true });

}

var NCLNUDC = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboTipoDoc').select2();
    };

    var cargarEmpresas = function () {
        $.ajax({
            async: false,
            type: "post",
            url: "vistas/nc/ajax/ncmctas.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val(),
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
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var cargarTiposDocumento = function () {
        $.ajax({
            async: false,
            type: "post",
            url: "vistas/nc/ajax/NCNUDC.ashx?flag=LTDC&codempr=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoDoc').empty();
                $('#cboTipoDoc').append('<option value=" ">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoDoc').append('<option value="' + datos[i].DCTO_CODE + '">' + datos[i].DCTO_DESC + '</option>');
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $('#cboTipoDoc').val(' ');
        $('#cboTipoDoc').change();
    };

    var fillBandejaNTDComercial = function () {
        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjNTDComercial').val());
        var parms = {
            data: json,
            columns: [
                { data: "DOCUMENTO" },
                {
                    data: "COMPROBANTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CAJA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "IMPRENTA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "CORRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "NRO_DIGITO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "SERIE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "VALOR_INICIO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                {
                    data: "VALOR_FIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                { data: "CODIGO", visible: false },
                { data: "CODE_EMPRESA", visible: false },
                { data: "TIPO_DOC", visible: false }
            ]
        }



        oTableNTDComercial = iniciaTabla('tblNTDComercial', parms);
        $('#tblNTDComercial').removeAttr('style');



        $('#tblNTDComercial tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableNTDComercial.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableNTDComercial.fnGetPosition(this);
                var row = oTableNTDComercial.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmnudc&codigo=' + codigo;
            }

        });

    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            $('#tblNTDComercial').DataTable().column(10)
                       .search($(this).val())
                       .draw();
            cargarTiposDocumento();
        });

        $('#cboTipoDoc').change(function () {
            $('#tblNTDComercial').DataTable().column(11)
                       .search($(this).val())
                       .draw();
        });
    };

    var valores = function () {
        $('#cboEmpresa').val($('#ctl00_hddctlg').val());
        $('#cboEmpresa').change();
    };

    return {
        init: function () {
            plugins();
            cargarEmpresas();
            cargarTiposDocumento();
            fillBandejaNTDComercial();
            eventos();
            valores();
        }
    };
}();


var NCNUDC = function () {

    var cargainicial = function () {
        caragainicombos();
        funcionalidad();
        $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
        $("#slcEmpresa").trigger("change", $("#ctl00_hddestablecimiento").val());

        var cod = ObtenerQueryString("codigo");

        if (cod != null) {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");

            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCNUDC.ASHX?codigo=" + cod,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {

                    //$('#slccajaalmacen').select2("val",datos[0].CODCAJA);
                    //$('#slcimpr').val();

                    $("#txtcodigo").val(datos[0].CODIGO);
                    $('#txtnrodig').val(datos[0].NRO_DIGITO);
                    $('#txtnrolinea').val(datos[0].NRO_LINEAS);
                    $('#txtserie').val(datos[0].SERIE);
                    $('#txtvalorini').val(datos[0].VALOR_INICIO);
                    $('#txtvalorfin').val(datos[0].VALOR_FIN);

                    if (datos[0].VALOR_FIN != "") {
                        $('#uniform-chkvfin span').removeClass().addClass("checked");
                        $('#chkvfin').attr('checked', true);
                        $("#txtvalorfin").attr("disabled", false);
                    }

                    $('#txtcodauto').val(datos[0].COD_AUTORI);
                    $('#txtimprenta').val(datos[0].IMPRENTA);
                    $('#slccampo').select2("val", datos[0].TIPO_CAMPO.substring(0, 1));



                    $("#slccompro").val(datos[0].CODCOMPROBANTE.substring(0, 1));

                    if (datos[0].TIPO_DOC == "0009") {
                        $("#slcEmpresa").select2("val", datos[0].EMPRESA);

                        $("#slcEmpresa").trigger("change", [datos[0].SUCURSAL, datos[0].CODCAJA, datos[0].CODIMPRESORA]);
                        $('#slctipodoc').select2("val", datos[0].TIPO_DOC);
                        $('#slccorre').select2("val", datos[0].CORRE.substring(0, 1));
                        $('#slctipodoc').trigger("change", [datos[0].CODCAJA, datos[0].CODIMPRESORA]);

                    } else {

                        $('#slctipodoc').select2("val", datos[0].TIPO_DOC);

                        $('#slccorre').select2("val", datos[0].CORRE.substring(0, 1));


                        $("#slcEmpresa").select2("val", datos[0].EMPRESA);

                        $("#slcEmpresa").trigger("change", [datos[0].SUCURSAL, datos[0].CODCAJA, datos[0].CODIMPRESORA]);
                    }
                    //  $('#slccajaalmacen').select2("val", datos[0].CODCAJA);

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

    var plugins = function () {
        aMayuscula(":input");
        $("#txtvalorini").inputmask({ "mask": "9", "repeat": 25, "greedy": false });
        $("#txtnrodig").inputmask({ "mask": "9", "repeat": 2, "greedy": false });
        //$("#txtnrolinea").inputmask({ "mask": "9", "repeat": 2, "greedy": false });
        $('#txtcodauto').inputmask({ "mask": "9", "repeat": 20, "greedy": false });
        $('#txtvalorfin').inputmask({ "mask": "9", "repeat": 25, "greedy": false });
        $('#txtserie').attr("maxlength", "5");
        $('#txtimprenta').focus(function () { $(this).inputmask({ "mask": "L", "repeat": 60, "greedy": false }); })
    }

    return {
        init: function () {
            cargainicial();
            plugins();

        }
    };


}();
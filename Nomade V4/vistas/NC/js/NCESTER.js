
//var boolButtonToggle = false
var NCESTER = function () {
    var fnCargarPlugins = function () {
        $(".ComboBox").select2();
        //$('#txt_cod_alternativo').inputmask({ "mask": "!", "repeat": 5, "greedy": false });
        //$('#txt_descripcion').inputmask({ "mask": "!", "repeat": 500, "greedy": false });
    };

    //var ToggleButtons = function () {

    //    // $('.basic-toggle-button').toggleButtons('setState', false);
    //    if (!boolButtonToggle) {
    //        $('.basic-toggle-button').toggleButtons({

    //            label: {
    //                enabled: "SI",
    //                disabled: "NO"
    //            }
    //        });
    //        boolButtonToggle = true;
    //    }
    //}
    var fillListaEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/cc/ajax/cclrfva.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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


    var fnCargarCombos = function () {
       
        fillListaEmpresa();
    };

    var fnCargarEventos = function () {
        $("#cboEmpresa").on("change", function () {
            var sCodEmpresa = $("#cboEmpresa").val().trim();
            if (sCodEmpresa === "")
                return;
            fnCargarEstereotipos(sCodEmpresa);
        });

        $("#btnGrabar").on("click", function () {
            fnGrabar();
        });

        $("#btnCancelar").on("click", function () {
            window.location.href = "?f=NCESTER";
        });


        $("#btn_agregar").on("click", function () {
            fnAgregaEstereotipos($("#cboEmpresa").val().trim());
        });
    };

    var fnCargarEstereotipos = function (sCodEmpresa) {
        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCESTER.ASHX?flag=3&p_CTLG_CODE=" + sCodEmpresa,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                var oEstereotipo = datos;
                if (isEmpty(oEstereotipo)) {
                    $("#divEstereotipos").html("")
                    $("#acciones").css("display", "none")
                    alertCustom("No se econtraron registros para este catalogo por favor registrar en la Base de Datos");
                    return;
                }

                var sHtml = "";
                var nIndice = 0;
                $.each(oEstereotipo, function (key, value) {
                    if (nIndice === 0) {
                        sHtml += "<div class='row-fluid'>";
                        sHtml += "<div class='span12'>";
                        sHtml += "<div class='row-fluid'>";
                        sHtml += "<div class='span2'></div>";
                    }

                    sHtml += "<div class='span2'>";
                    sHtml += "<div class='control-group'>";
                    sHtml += "<div class='controls'>";
                    sHtml += "<div class='checker' id='uniform-" + value.CODE_CTLG + "-" + value.CODE_ESTEREOTIPO + "'>";
                    sHtml += "<span class='checked'>";
                    sHtml += "<input type='checkbox' id='" + value.CODE_CTLG + "-" + value.CODE_ESTEREOTIPO + "' style='opacity: 0;'/>";
                    sHtml += "</span>";
                    sHtml += "</div>";
                    sHtml += value.DESCRIPCION;
                    sHtml += "</div>";
                    sHtml += "</div>";
                    sHtml += "</div>";

                    if (nIndice === 0 || nIndice === 1) {
                        sHtml += "<div class='span1'></div>";
                        nIndice = nIndice + 1;
                    } else if (nIndice === 2) {
                        sHtml += "<div class='span2'></div>";
                        sHtml += "</div>";
                        sHtml += "</div>";
                        sHtml += "</div>";
                        nIndice = 0;
                    }
                });

                if (nIndice !== 0) {
                    sHtml += "<div class='span2'></div>";
                    sHtml += "</div>";
                    sHtml += "</div>";
                    sHtml += "</div>";
                }

                $("#divEstereotipos").html(sHtml);

                $.each(oEstereotipo, function (key, value) {
                    if (value.ESTADO_IND === "S") {
                        $("#uniform-" + value.CODE_CTLG + "-" + value.CODE_ESTEREOTIPO + " span").removeClass().addClass("checked");
                        $("#" + value.CODE_CTLG + "-" + value.CODE_ESTEREOTIPO).attr("checked", true);
                    }
                    else {
                        $("#uniform-" + value.CODE_CTLG + "-" + value.CODE_ESTEREOTIPO + " span").removeClass();
                        $("#" + value.CODE_CTLG + "-" + value.CODE_ESTEREOTIPO).attr("checked", false);
                    }
                });

                Desbloquear("ventana");

                $("input[type=checkbox]").on("click", function () {
                    if ($(this).is(":checked")) {
                        $("#uniform-" + $(this).attr("id") + " span").removeClass().addClass("checked");
                        $("#" + $(this).attr("id")).attr("checked", true);
                    }
                    else {
                        $("#uniform-" + $(this).attr("id") + " span").removeClass();
                        $("#" + $(this).attr("id")).attr("checked", false);
                    }
                });

                $("#acciones").css("display", "block")
            },
            error: function (result) {
                alertCustom("No se pudo recuperar la información.");
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    };

    var fnAgregaEstereotipos = function (sCodEmpresa) {
       

        var data = new FormData();

        data.append("p_CODE_ALTERNATIVO", $("#txt_cod_alternativo").val());
        data.append("p_CTLG_CODE", $("#cboEmpresa").val());
        data.append("p_DESCRIPCION", $("#txt_descripcion").val());
        data.append("p_ESTADO_IND", $("#chk_estado").is(":checked") == true ? 'S' : 'N');

        if (vErrors(["txt_cod_alternativo", "txt_descripcion", "cboEmpresa"])) {

            Bloquear("ventana");
            $.ajax({
                type: "POST",
                url: "vistas/NC/ajax/NCESTER.ASHX?flag=1",
                data: data,
                contentType: false,
                processData: false,
                async: false,
                success: function (datos) {
                    var oResp = datos;
                    //if (isEmpty(oResp) || oResp == "ERROR" || )
                    //{ ; }
                    if (oResp != "ERROR" && (!isEmpty(oResp)) && (!isNaN(parseInt(oResp)))) {
                        $("[id*=correcto]").remove()
                        exito()
                        $("#txt_descripcion").val("")
                        $("#txt_cod_alternativo").val("")
                        $('.basic-toggle-button').toggleButtons('setState', true);
                        if ($("#cboEmpresa").val() != "") {
                            fnCargarEstereotipos($("#cboEmpresa").val());
                        } else {
                            alertCustom("No se pudo listar estereotipos no hay empresa seleccionada.");
                        }
                    }
                    else { alertCustom("No se pudo agregar estereotipo.") }


                    Desbloquear("ventana");


                },
                error: function (result) {
                    alertCustom("No se pudo agregar estereotipo.");
                    Desbloquear("ventana");
                }
            });
            Desbloquear("ventana");
        };
    }

    var fnGrabar = function () {
        if (!vErrors(["cboEmpresa"]))
            return;

        var data = new FormData();


        var flag = ("2");

        var aoEstereotiposDet = "";

        $("input[type=checkbox]").each(function () {
            var asId = ($(this).attr("id") + "").split("-");
            var sCodEmpresa = asId[0];
            var sCodEstereotipo = asId[1];
            var bEstado = $(this).is(":checked") == true ? 'S' : 'N';

            

            aoEstereotiposDet += sCodEmpresa + ","
            aoEstereotiposDet += sCodEstereotipo + ","
            aoEstereotiposDet += bEstado + "|"


        });

        aoEstereotiposDet += "}"
        aoEstereotiposDet = aoEstereotiposDet.replace("|}", "");

        data.append("flag", flag);
        data.append("p_DETALLE", aoEstereotiposDet);

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCESTER.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {

                if (response != "ERROR" && (!isEmpty(response)) && response == "OK") {
                    exito();
                } else {
                    noexitoCustom("No se pudo guardar los cambios.");
                }




                Desbloquear("ventana");
               

               
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });
    };

    //var fnCargaInicial = function () {
    //    var sCodEmpresa = ObtenerQueryString("sCodEmpresa");
    //    if (sCodEmpresa !== undefined && sCodEmpresa !== "undefined" && sCodEmpresa !== "")
    //        $("#cboEmpresa").val(sCodEmpresa).change();
    //};

    return {
        init: function () {
            fnCargarPlugins();
            fnCargarEventos();
            fnCargarCombos();
            fnCargarEstereotipos($("#cboEmpresa").val());
            // fnCargaInicial();
          //  ToggleButtons();
           // $('.basic-toggle-button').toggleButtons('setState', true);
        }
    };
}();


function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
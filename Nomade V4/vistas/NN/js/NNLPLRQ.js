var NNLPLRQ = function () {
    var rucMap = {};

    var plugins = function () {
        $('#cboEmpresa').select2()
        $("#cbo_tipo_planilla").select2();
        $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setEndDate', '-0y').datepicker('setStartDate', '-10y').keydown(function () { return false; });
        $('#optmes').datepicker({ 'minViewMode': 1, 'autoclose': true }).on("show", function (e) {$(".datepicker-months thead").hide();$(".datepicker-months tbody tr td").css("width", "180px");}).keydown(function () { return false; }).datepicker("setDate", new Date());
    }

    var fillCboEmpresa = function () {
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
                        rucMap[datos[i].CODIGO] = datos[i].RUC;
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

    function getRenta4ta() {
        var data = new FormData();
        data.append('OPCION', "1");
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_ANIO', $("#optanho").val());
        data.append('p_MES', $("#optmes").datepicker("getDate").getMonth() + 1);

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NN/ajax/NNLPLRQ.ASHX",
            contentType: false,
            data: data,
            async: true,
            processData: false,
            cache: false
        })
        .success(function (datos) {
            Desbloquear("ventana");
            if (datos != null && datos != "") {
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddTabla").val(datos.split("{|||||}")[0]);
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddAnio").val($("#optanho").val());
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddMes").val(($("#optmes").datepicker("getDate").getMonth() + 1));
                var ruc = rucMap[$("#cboEmpresa").val()];
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRUC").val(ruc);

                if (datos.split("{|||||}")[0] != "" && datos.split("{|||||}")[1] != "" && datos.split("{|||||}")[2] != "") {
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportarPS4").attr("style", "display:block")
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportar4TA").attr("style", "display:block")
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:block")
                    $('#divRenta').html(datos.split("{|||||}")[0]);
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCadenaPS4").val(datos.split("{|||||}")[1])
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddCadena4TA").val(datos.split("{|||||}")[2])
                }

            } else {
                alertCustom("No hay datos disponibles");
            }
        })
        .error(function () {
            Desbloquear("ventana");
            alertCustom("Error al listar datos");
        });
    }

    var eventoComtroles = function () {
        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresa", "optanho", "optmes"])) {
                getRenta4ta();
            }
        });

        $('#cboEmpresa').on('change', function () {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportarPS4").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportar4TA").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
            $("#divRentas").html("");
        });
        
        $("#optmes").datepicker().on("changeDate", function (e) {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportarPS4").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportar4TA").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
            $("#divRentas").html("");
        });

        $("#optanho").datepicker().on("changeDate", function (e) {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportarPS4").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btnExportar4TA").attr("style", "display:none")
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").attr("style", "display:none")
            $("#divRentas").html("");
        });

        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").on('click', function () {
            $("#ctl00_cph_ctl00_PCONGEN1_ctl00_btn_xls").blur()
        });
    }

    function Exportar() {
        var data = new FormData;
        data.append('p_ANIO', $('#txtanio').val());
        data.append('p_MES', $('#cboMes').val());
        data.append('p_CTLG_CODE', $('#cboEmpresa').val());

        $.ajax({
            type: "POST",
            url: "vistas/co/ajax/colreco.ashx?OPCION=5",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                if (datos == 'ok') {
                    exito();
                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("N");
                }
                else {
                    if (datos == 'vacio') {
                        exito();
                        $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfind_vacio").val("S");

                    } else { noexito(); }
                }
                $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hddRuc").val($('#ruc').html());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var cargaInicial = function () {
       
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoComtroles();
            cargaInicial();
        }
    };
}();
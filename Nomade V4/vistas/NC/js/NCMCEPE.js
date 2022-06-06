var NCMCEPE = function () {

    var plugins = function () {
        $("#slcEmpresa").select2();
        $('#cbo_periodo').select2();
        // $('#optanho').datepicker({ 'minViewMode': 2, 'autoclose': true }).datepicker("setDate", new Date()).datepicker('setStartDate', '-10y').keydown(function () { return false; });
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slcEmpresa').empty();
                $('#slcEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCbo_Periodo = function (ctlg_code) {

        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/cpmpgas.ashx?OPCION=99&p_CTLG_CODE=" + ctlg_code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cbo_periodo').empty();
                $('#cbo_periodo').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbo_periodo').append('<option  value="' + datos[i].COD + '" coeficiente="'+datos[i].COEFICIENTE+'" >' + datos[i].PERIODO_DESC + '</option>');
                    }
                    $('#cbo_periodo').select2("val", "");

                } else {
                    infoCustom("La empresa seleccionada no cuenta con periodos abiertos.");
                }
                Desbloquear("ventana2");
            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
                Desbloquear("ventana2");
            }
        });
    }

    var eventoControles = function () {

        $('#btn_cerrar').on('click', function () {
            if (vErrors(["txt_fec_cierre", "txt_fec_declaracion", "txtCoeficiente"])) {
                $("#modal_pregunta").html("¿Esta Seguro de Cerrar el Período Tributario <b>" + $("#cbo_periodo option:selected").text() + "</b> ?, ya no podrá agregar nada al mismo")
                $("#ConfirmCierre").modal("show");
            }
        });

        $('#btn_aceptar').on('click', function () {
            Bloquear("ventana2")
            setTimeout(function () {
                Grabar();
            }, 2000);
        });

        var emp_ant = "";
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana2")
                setTimeout(function () {
                    fillCbo_Periodo($('#slcEmpresa').val())
                    $("#txt_fec_cierre").attr("disabled", true);
                    $("#btn_cerrar").attr("disabled", true);
                    $("#txt_fec_cierre").val("");
                    $("#txt_fec_declaracion").val("");
                    emp_ant = $(this).val();
                }, 1000);

            } else { emp_ant = ""; }
        });

        var per_ant = "";
        $('#cbo_periodo').on('change', function () {
            if (per_ant != $(this).val()) {
                //var date = new Date()
                get_Fecha_Declaracion($("#slcEmpresa").val(), $('#cbo_periodo').val().split("-")[0], $('#cbo_periodo').val().split("-")[1]);
                $("#txt_fec_cierre").attr("disabled", false);
                $("#btn_cerrar").attr("disabled", false);
                $("#txt_fec_cierre").val("");
                $("#txt_fec_cierre").datepicker("setStartDate", "")
                $("#txt_fec_cierre").datepicker("setEndDate", "")
                var primerDia = new Date($('#cbo_periodo').val().split("-")[1], parseInt($('#cbo_periodo').val().split("-")[0]), 1)
                var ultimoDia = new Date($('#cbo_periodo').val().split("-")[1], parseInt($('#cbo_periodo').val().split("-")[0]) + 1, 0)
                $("#txt_fec_cierre").datepicker("setStartDate", primerDia)
                $("#txt_fec_cierre").datepicker("setEndDate", $("#txt_fec_declaracion").val().toString());

                if ($("#txtCoeficiente").val()=="") {
                    $("#txtCoeficiente").val($('#cbo_periodo option:selected').attr("coeficiente"));
                }

            } else { per_ant = ""; }
        });

        $("#txtCoeficiente").on('blur', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            } else {
                $(this).val("0.00");
            }
        }).on("click", function () {
            $(this).select();
        }).on('keyup', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            }
        });
    }

    var get_Fecha_Declaracion = function (oCtlg, oMes, oAnio) {
        Bloquear("ventana2");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCEPE.ashx?OPCION=1" +
                "&p_mes=" + oMes +
                "&p_ctlg=" + oCtlg +
                "&p_anio=" + oAnio,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != "" && datos != null) {
                    $("#txt_fec_declaracion").val(datos[0].FECHA_DECLARACION);
                }
                else {
                    $("#txt_fec_declaracion").val("");
                }
                Desbloquear("ventana2");
            },
            error: function (msg) {
                noexitoCustom("Error fecha declaracion")
                Desbloquear("ventana2");
            }
        });
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCbo_Periodo($('#slcEmpresa').val());
            eventoControles();
        }
    };

}();

var Grabar = function () {

    var data = new FormData();
    data.append("OPCION", "2");
    data.append("p_ctlg", $("#slcEmpresa").val());
    data.append("p_anio", $('#cbo_periodo').val().split("-")[1]);

    var p_mes = $('#cbo_periodo').val().split("-")[0]
    if (p_mes.length == 1) {
        p_mes = "0" + p_mes;
    }

    data.append("p_mes", p_mes);
    data.append("p_fec_cierre", $("#txt_fec_cierre").val());
    data.append("p_fec_declara", $("#txt_fec_declaracion").val());
    data.append("p_usua_id", $("#ctl00_txtus").val());
    data.append("p_COEFICIENTE", $("#txtCoeficiente").val());

    $.ajax({
        url: "vistas/NC/ajax/NCMCEPE.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    }).success(function (datos) {
        if (datos != null && datos != "") {
            switch (datos) {
                case "E":
                    $("#msg_error").attr("style", "display:none")
                    $("#msg_exito").attr("style", "display:none")
                    noexitoCustom("Error al Registrar!")
                    break;
                case "Error":
                    $("#msg_error").attr("style", "display:none")
                    $("#msg_exito").attr("style", "display:none")
                    noexitoCustom("Error al Registrar!")
                    break;
                case "I":
                    $("#msg_error").attr("style", "display:block")
                    $("#msg_exito").attr("style", "display:none")
                    break;
                case "OK":
                    $("#msg_exito").attr("style", "display:block")
                    $("#msg_error").attr("style", "display:none")
                    $(".bloquear").attr("disabled", true)
                    $("#btn_cerrar").remove();
                    break;
            }

        } else { noexitoCustom("Error al Registrar!") }

        Desbloquear("ventana2")

    }).error(function () {
        Desbloquear("ventana2");
        noexitoCustom("Error al Registrar!")
    })
}

//--------LISTADO

var NCLCEPE = function () {

    var plugins = function () {
        $("#cboEmpresa").select2();
        $("#cboEstado").select2();
    }

    var fillCboEmpresa = function () {
        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
            $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
        }
    }

    var eventoControles = function () {

        $("#cboEmpresa").on("change", function () {
        });

        $("#buscar").on("click", function () {
            Listar();
        });

        $("#txtCoeficiente").on('blur', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            } else {
                $(this).val("0.00");
            }
        }).on("click", function () {
            $(this).select();
        }).on('keyup', function () {
            if (parseFloat($(this).val())) {
                if ($(this).val() > 100) {
                    $(this).val("100.00");
                }
            }
        });

        $("#btnModificar").on("click", function () {
            if (vErrors(['txtCoeficiente', 'txtPëriodo'])) {
                Modificar();
            }
        });
       
    }
      
    var IniciaTabla = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "PERIODO_DESC",
                    createdCell: function (td, cellData, rowData, row, col) {
                    }
                }, {
                    data: "COEFICIENTE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "FECHA_CIERRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    type: "fecha"
                }, {
                    data: "USUA_CIERRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'text-align:center');
                    }
                }, {
                    data: null,
                    defaultContent: '<a class="btn blue"><i class="icon-pencil"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]
        }

        oTable = iniciaTabla('tblDatos', parms);
        $('#tblDatos').removeAttr('style');
        oTable.fnSetColumnVis(0, false, true);

        $('#tblDatos tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var cod = row.CODIGO;
            MostrarModificarCoeficiente(row.CTLG_CODE,row.COEFICIENTE,row.CODIGO);
        });
    }

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            IniciaTabla();
            Listar();
        }
    };
}();

function Listar() {
    if (vErrors(['cboEmpresa'])) {
        var data = new FormData();
        data.append('p_ctlg', $("#cboEmpresa").val());
        data.append('p_anio', '');
        data.append('p_ESTADO', $("#cboEstado").val());
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/nc/ajax/NCMCEPE.ashx?OPCION=3",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
       .success(function (datos) {
           Desbloquear("ventana");
           oTable.fnClearTable();
           if (datos != null && datos.length > 0) {
               oTable.fnAddData(datos);
               oTable.fnAdjustColumnSizing();
           }
       })
       .error(function () {
           Desbloquear("ventana");
           noexito();
       });
    }
}

function MostrarModificarCoeficiente( CTLG_CODE,COEFICIENTE,CODIGO) {
    $("#hfCtlg").val(CTLG_CODE);
    $("#hfCod").val(CODIGO);
    $("#txtPëriodo").val(CODIGO);
    $("#txtCoeficiente").val(COEFICIENTE);
    $("#modalModificar").modal("show");
}

function Modificar() {
    var data = new FormData();
    data.append("OPCION", "4");
    data.append("p_ctlg", $("#hfCtlg").val());
    data.append("p_CODE", $('#hfCod').val()); 
    data.append("p_COEFICIENTE", $("#txtCoeficiente").val());

    Bloquear('modalModificar');
    $.ajax({
        url: "vistas/NC/ajax/NCMCEPE.ASHX",
        type: "POST",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
    }).success(function (datos) {
        if (datos == "OK") {
            exito();
            $("#modalModificar").modal("hide");
            Listar();
        } else {
            noexitoCustom(datos)
        }
    }).error(function () {
        noexitoCustom("Error al Modificar!")
    }).complete(function () {
        Desbloquear('modalModificar');
    });
}
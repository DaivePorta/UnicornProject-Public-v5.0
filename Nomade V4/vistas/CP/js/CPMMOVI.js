var empleados = [];
var Periodo = [];
let iContGuardar = 0;
var CPMMOVI = function () {
    var plugin = function () {
        $("#cboEmpresa").select2();
        $("#cboEstablecimiento").select2();
        $("#cboEmpleado").select2();
        $("#cboPeriodo").select2();

    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
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
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    //$('#txt_fec_emision').datepicker("setDate", "now");
    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#cboEstablecimiento").select2("val", "");
                    }
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var fillCboEmpleados = function () {
        var selectEmpleado = $('#cboEmpleado');
        var valorActual = selectEmpleado.val();
        var bPresente = false;
        $.ajax({
            type: "post",
            url: "vistas/CP/ajax/CPMMOVI.ASHX?OPCION=6&P_FPRGAST_CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEmpleado.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectEmpleado.append('<option></option>');
                        }
                        selectEmpleado.append('<option value="' + datos[i].CODIGO + '">' + datos[i].NOMBRE + '</option>');
                        bPresente |= (valorActual === datos[i].CODIGO);
                    }
                }

                Desbloquear("ventana")
            },
            complete: function () {
                if (bPresente)
                    selectEmpleado.select2("val", valorActual);
                else
                    selectEmpleado.select2("val", "");

            },
            error: function (msg) {
                Desbloquear("ventana")
                alert(msg);
            }
        });
    }
    var obtenerDocumentos = function () {
        var data = new FormData();
        //txtPeriodo txaGlosa cboEmpleado txtFechaDesde  txtFechaHasta     cboEstablecimiento cboEmpresa

        let sPeriodo = $("#txtPeriodo").val();
        let sGlosa = $("#txaGlosa").val();
        let sIdEmpleado = $("#cboEmpleado").val();
        let sFechaDesde = $("#txtFechaDesde").val();
        let sFechaHasta = $("#txtFechaHasta").val();
        let sIdEstablecimiento = $("#cboEstablecimiento").val();
        let sIdEmpresa = $("#cboEmpresa").val();

        data.append('OPCION', '1');
        data.append('P_FECHA_INICIO', sFechaDesde);
        data.append('P_FECHA_FIN', sFechaHasta);
        data.append('P_FPRGAST_PIDM_BENEFICIARIO', sIdEmpleado);
        data.append('P_FPRGAST_CTLG_CODE', sIdEmpresa);
        data.append('P_FPRGAST_SCSL_CODE', sIdEstablecimiento);

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMOVI.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    var nMontoTotal = datos.split('|')[0];
                    var nMontoValido = datos.split('|')[1];
                    var nMontoInvalido = datos.split('|')[2];
                    var sLista = datos.split('|')[3];

                    $('#spTotal').html(nMontoTotal);
                    $('#spTotalValido').html(nMontoValido);
                    $('#spTotalInvalido').html(nMontoInvalido);
                    $('#dvLista').html(sLista);
                    $("#tbLista").dataTable({
                        //"sDom": 'TC<"clear">lfrtip',
                        "sPaginationType": "full_numbers",
                        "scrollX": true,
                        "bAutoWidth": false,
                        "oLanguage": {
                            "sEmptyTable": "No hay datos disponibles en la tabla.",
                            "sZeroRecords": "No hay datos disponibles en la tabla."
                        }
                        ,
                        "oTableTools": {
                            "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                            "aButtons": [
                                //    {
                                //        "sExtends": "copy",
                                //        "sButtonText": "Copiar"
                                //    },
                                //    {
                                //        "sExtends": "pdf",
                                //        "sPdfOrientation": "landscape",
                                //        "sButtonText": "Exportar a PDF"
                                //    },
                                //    {
                                //        "sExtends": "xls",
                                //        "sButtonText": "Exportar a Excel"
                                //    }
                            ]
                        }
                    });

                    var oTable = $('#tbLista').dataTable();
                    oTable.fnSort([[0, "desc"]]);

                    $("#tbLista").DataTable();


                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
    var fnObtenerPeriodo = function () {
        var selectPeriodo = $('#cboPeriodo');
        var valorActual = selectPeriodo.val();
        var p_PeriodoActivo = "A";
        var bPresente = false;
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/CPMMOVI.ashx?OPCION=4&P_FPRGAST_CTLG_CODE=" + $("#cboEmpresa").val() + "&p_PeriodoActivo=" + p_PeriodoActivo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                //if (datos != null) {
                //    var iTotal = datos.length - 1;
                //    var sPeriodo = datos[iTotal].PERIODO_DESC;
                //    var sCodigo = datos[iTotal].COD;
                //    $('#txtPeriodo').val(sPeriodo);
                //    $('#hdfIdPeriodo').val(sCodigo);

                //} else {


                //    alertCustom("Error cargar periodo")

                //}
                selectPeriodo.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectPeriodo.append('<option></option>');
                        }
                        selectPeriodo.append('<option value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                        bPresente |= (valorActual === datos[i].COD);
                    }
                }

                Desbloquear("ventana")

            },
            complete: function () {
                if (bPresente)
                    selectPeriodo.select2("val", valorActual);
                else
                    selectPeriodo.select2("val", "");

            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
            }
        });
    }
    var eventos = function () {
        var emp_ant = "";
        $('#cboEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                ListarSucursales($('#cboEmpresa').val());
                fnObtenerPeriodo();
                emp_ant = $(this).val();
            } else {
                emp_ant = "";
            }
        });
        $("#btnFiltro").click(function () {

            obtenerDocumentos();
        });


    }
    return {
        init: function () {
            plugin();
            eventos();
            fillCboEmpresa();
            fillCboEmpleados();
            ListarSucursales($('#cboEmpresa').val());
            fnObtenerPeriodo();
            $('#txtFechaDesde').datepicker("setDate", "now");
            $('#txtFechaHasta').datepicker("setDate", "now");
        }
    };
}();
var CPLMOVI = function () {
    var plugin = function () {
        $("#cboEmpresa").select2();
        $("#cboEstablecimiento").select2();
        $("#cboEmpleado").select2();
        $("#cboPeriodo").select2();
    }
    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
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
                $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    //$('#txt_fec_emision').datepicker("setDate", "now");
    var ListarSucursales = function (ctlg) {
        var bool = false;
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEstablecimiento').empty();
                $('#cboEstablecimiento').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEstablecimiento').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].CODIGO == $("#ctl00_hddestablecimiento").val()) { bool = true; }
                    }
                    if (bool) {
                        $("#cboEstablecimiento").select2("val", $("#ctl00_hddestablecimiento").val());
                    } else {
                        $("#cboEstablecimiento").select2("val", "");
                    }
                    filltxtEmpleado('#txtTrabajador', '');
                     
                }
                else {
                    noexito();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
    var fnListaPagoPlanillaMovilidad = function () {
        var data = new FormData();

        let sIdEstablecimiento = $("#cboEstablecimiento").val();
        let sIdEmpresa = $("#cboEmpresa").val();
        let sPeriodo = $("#cboPeriodo").val();
        let sIdEmpleado = $("#hfpidm").val();

        data.append('OPCION', '3');
        data.append('P_FPRGAST_PIDM_BENEFICIARIO', sIdEmpleado);
        data.append('P_FPRGAST_CTLG_CODE', sIdEmpresa);
        data.append('P_FPRGAST_SCSL_CODE', sIdEstablecimiento);
        data.append('P_PERIODO', sPeriodo);
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMOVI.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    var nMontoTotal = datos.split('|')[0];
                    var sLista = datos.split('|')[1];

                    $('#spTotal').html(nMontoTotal);
                    $('#dvLista').html(sLista);
                    $("#tbLista").dataTable({
                        //"sDom": 'TC<"clear">lfrtip',
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
                                //{
                                //    "sExtends": "copy",
                                //    "sButtonText": "Copiar"
                                //},
                                //{
                                //    "sExtends": "pdf",
                                //    "sPdfOrientation": "landscape",
                                //    "sButtonText": "Exportar a PDF"
                                //},
                                //{
                                //    "sExtends": "xls",
                                //    "sButtonText": "Exportar a Excel"
                                //}
                            ]
                        }
                    });

                    var oTable = $('#tbLista').dataTable();
                    oTable.fnSort([[0, "desc"]]);

                    $("#tbLista").DataTable();
                    //actualizarEstilos()

                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
    var fnImprimirPagoPlanillaMovilidad = function () {
        var data = new FormData();

        let sIdEstablecimiento = $("#cboEstablecimiento").val();
        let sIdEmpresa = $("#cboEmpresa").val();
        let sPeriodo = $("#cboPeriodo").val();
        let sIdEmpleado = $("#hfpidm").val();

        data.append('OPCION', '5');
        data.append('P_FPRGAST_PIDM_BENEFICIARIO', sIdEmpleado);
        data.append('P_FPRGAST_CTLG_CODE', sIdEmpresa);
        data.append('P_FPRGAST_SCSL_CODE', sIdEstablecimiento);
        data.append('P_PERIODO', sPeriodo);
        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMOVI.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    $("#dvTablaL").html(datos);
                } else {
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
            });
    }
    var fnObtenerPeriodo = function () {
        var selectPeriodo = $('#cboPeriodo');
        var valorActual = selectPeriodo.val();
        var p_PeriodoActivo = "";
        var bPresente = false;
        $.ajax({
            type: "post",
            url: "vistas/cp/ajax/CPMMOVI.ashx?OPCION=4&P_FPRGAST_CTLG_CODE=" + $("#cboEmpresa").val() + "&p_PeriodoActivo=" + p_PeriodoActivo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                selectPeriodo.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectPeriodo.append('<option></option>');
                        }
                        selectPeriodo.append('<option value="' + datos[i].COD + '">' + datos[i].PERIODO_DESC + '</option>');
                        bPresente |= (valorActual === datos[i].COD);
                    }
                }

                Desbloquear("ventana")

            },
            complete: function () {
                if (bPresente)
                    selectPeriodo.select2("val", valorActual);
                else
                    selectPeriodo.select2("val", "");

            },
            error: function (msg) {
                alertCustom("Error cargar periodo");
            }
        });
    }
    var eventos = function () {
        var emp_ant = "";
        $('#cboEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                ListarSucursales($('#cboEmpresa').val())
                fnObtenerPeriodo();
                emp_ant = $(this).val();
            } else {
                emp_ant = "";
            }
        });
        $("#btnFiltrar").click(function () {
            fnListaPagoPlanillaMovilidad();
            fnImprimirPagoPlanillaMovilidad();
        });


    }
    return {
        init: function () {
            plugin();
            eventos();
            fillCboEmpresa();
            ListarSucursales($('#cboEmpresa').val());
            fnObtenerPeriodo();
            $('#txtFechaDesde').datepicker("setDate", "now");
            $('#txtFechaHasta').datepicker("setDate", "now");
        }
    };
}();


function fnGuardarPlanillaMovilidad() {
    iContGuardar = iContGuardar + 1;
    
    let sPeriodo = $("#cboPeriodo").val();
    let sGlosa = $("#txaGlosa").val();
    let sIdEmpleado = $("#cboEmpleado").val();
    let sIdEstablecimiento = $("#cboEstablecimiento").val();
    let sIdEmpresa = $("#cboEmpresa").val();
    let sFechaDesde = $("#txtFechaDesde").val();
    let sFechaHasta = $("#txtFechaHasta").val();
    let sMontoTotal = $('#spTotal').html();
    if (sGlosa == "") {
        infoCustom("Por favor ingrese descripción a la glosa.");
        return;
    }
    var data = new FormData();
    if (iContGuardar == 1) {
        data.append('OPCION', '2');
        data.append('P_FPRGAST_CTLG_CODE', sIdEmpresa);
        data.append('P_FPRGAST_SCSL_CODE', sIdEstablecimiento);
        data.append('P_FPRGAST_PIDM_BENEFICIARIO', sIdEmpleado);
        data.append('P_GLOSA', sGlosa);
        data.append('P_PERIODO', sPeriodo);
        data.append('P_FPRGASTMOV_MONTO_TOTAL', sMontoTotal)
        data.append('P_FECHA_INICIO', sFechaDesde);
        data.append('P_FECHA_FIN', sFechaHasta);

        Bloquear("ventana");
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/CP/ajax/CPMMOVI.ashx",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
            .success(function (datos) {
                Desbloquear("ventana");
                if (datos != null) {
                    if (datos == '-2') {
                        infoCustom('El Total Sobrepasa el monto maximo para generar planilla de movilidades');
                        iContGuardar=0
                    } else {
                        $("#txtPlanilla").val(datos);
                        $("#aprobar").hide()
                        exito();
                        iContGuardar=2
                    }
                } else {
                    iContGuardar=0
                    noexito();
                }
            })
            .error(function () {
                Desbloquear("ventana");
                noexito();
                iContGuardar=0
            });
    }
}
function filltxtEmpleado(v_ID, v_value) {
    var selectSolicitante = $(v_ID);
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMGHEM.ASHX?OPCION=1&p_RHPLAHO_CTLG_CODE=" + $("#cboEmpresa").val(),
        cache: false,
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos !== null && datos !== '') {
                empleados = datos;
                selectSolicitante.typeahead({
                    source: function (query, process) {
                        arrayEmpleados = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < empleados.length; i++) {
                            arrayEmpleados.push(empleados[i].NOMBRE);
                            obj += '{';
                            obj += '"NOMBRE":"' + empleados[i].NOMBRE + '",';
                            obj += '"CODIGO":"' + empleados[i].CODIGO + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE] = objeto;
                        });
                        process(arrayEmpleados);
                        Desbloquear("ventana");
                    },
                    updater: function (item) {
                        $("#hfpidm").val(map[item].CODIGO);
                        $("#hfnombre_emp").val(map[item].NOMBRE);
                        return item;
                    },
                });

            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectSolicitante.val(v_value);
                Desbloquear("ventana");
            }
            Desbloquear("ventana");
        },
        error: function (msg) {
            alertCustom('Error al intentar consultar empleados.');
            Desbloquear("ventana");
        }
    });

    selectSolicitante.keyup(function () {
        $(this).siblings("ul").css("min-width", $(this).css("width"));
        if ($("#txtTrabajador").val().length <= 0) {

            $("#hfpidm").val("");
            $("#hfnombre_emp").val("");
        }
    });

}

function fillCbo_Periodo(vID, v_value) {
    var selectPeriodo = $(vID);
    $.ajax({
        type: "post",
        url: "vistas/cp/ajax/CPMMOVI.ashx?OPCION=4&P_FPRGAST_CTLG_CODE=" + $("#cboEmpresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (datos != null) {
                Periodo = datos;
                selectPeriodo.typeahead({
                    source: function (query, process) {
                        arrayPeriodos = [];
                        map = {};

                        var obj = "[";
                        for (var i = 0; i < Periodo.length; i++) {
                            arrayPeriodos.push(Periodo[i].PERIODO_DESC);
                            obj += '{';
                            obj += '"PERIODO_DESC":"' + Periodo[i].PERIODO_DESC + '",';
                            obj += '"COD":"' + Periodo[i].COD + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.PERIODO_DESC] = objeto;
                        });
                        process(arrayPeriodos);
                        Desbloquear("ventana");
                    },
                    updater: function (item) {
                        hdfNombrePeriodo
                        $("#hfdpIdPeriodo").val(map[item].COD);
                        $("#hdfNombrePeriodo").val(map[item].arrayPeriodos);
                        return item;
                    },
                });
            } else {
                alertCustom("Error cargar periodo")
            }
            if (datos != null && $.trim(v_value).length > 0) {
                selectPeriodo.val(v_value);
                Desbloquear("ventana");
            }
        },
        error: function (msg) {
            alertCustom("Error cargar periodo");
        }
    });
    selectPeriodo.keyup(function () {
        $(this).siblings("ul").css("min-width", $(this).css("width"));
        if ($("#txtPeriodo").val().length <= 0) {

            $("#hfdpIdPeriodo").val("");
            $("#hdfNombrePeriodo").val("");
        }
    });
}
//function fnImprimir() {
//    let sTablaContenido = document.getElementById('dvTablaL').innerHTML;
//    let sTablaContenidoOriginal = document.body.innerHTML;
//    document.body.innerHTML = sTablaContenido;
//    window.print();
//    document.body.innerHTML = sTablaContenidoOriginal;
//}


function fnImprimir() {
    var contents = document.getElementById("dvTablaL").innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head><title>Planillas</title>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('<br><span style="color:red;font-size:6pt">NOTA: No debe exeder 4% de la Remuneración mínima (4% de 930.00 o sea de S/37.20)</span><br>');
    frameDoc.document.write('<span style="color:red;font-size:6pt">Este límite debe ser por trabajador en planillas y por día</span>');
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
}
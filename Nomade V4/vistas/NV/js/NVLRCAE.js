
var NVLRCAE = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboSucursal,#cboMoneda').select2();

        $('#txtAnio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
        Highcharts.setOptions({
            lang: {
                printChart: 'Imprimir gráfico',
                downloadJPEG: 'Descargar JPEG',
                downloadPDF: 'Descargar PDF',
                downloadPNG: 'Descargar PNG',
                downloadSVG: 'Descargar SVG'
            }
        });              
     
        $('.checkbox').attr("style", "padding:2px 0px 0px 2px !important");

        $('.danger-toggle-button-custom').toggleButtons({
            //width: 220,
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "info",
                disabled: "danger"
            },
            label: {
                enabled: "SI",
                disabled: "NO"
            }
        });
    }

    var cargarFechaDefecto = function () {
        $('#txtAnio').val(new Date().getFullYear());
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
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboSucursal = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboSucursal').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillCboVendedor = function () {
        ctlg = $("#cboEmpresa").val()
        scsl = $("#cboEstablecimiento").val()
        estado = "";
        bAsync = true;
        if (bAsync == undefined) {
            bAsync = true;
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
                "&CTLG=" + ctlg +
                "&SCSL=" + scsl +
                "&p_ESTADO_IND=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: bAsync,
            success: function (datos) {
                $("#cboVendedor").multiselect("destroy");
                $('#cboVendedor').empty();
                //if (datos != null) {
                //    for (var i = 0; i < datos.length; i++) {
                //        $('#cboVendedor').append('<option value="' + datos[i].PIDM + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                //    }
                //}
                var activos = "";
                var inactivos = "";
                var opciones = "";
                if (datos != null) {                   
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO == 'A') {
                            activos += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                        } else if (datos[i].ESTADO == 'I') {                         
                            inactivos += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                        }
                    }
                }
                if (activos!="") {
                    opciones += '<optgroup label="ACTIVOS">';
                    opciones += activos;
                    opciones += '</optgroup>';
                }
                if (inactivos != "") {
                    opciones += '<optgroup label="INACTIVOS" >';
                    opciones += inactivos;
                    opciones += '</optgroup>';
                }
                $('#cboVendedor').append(opciones);
                $('#cboVendedor').multiselect({
                    nonSelectedText: 'Seleccione Vendedor!',
                    numberDisplayed: 1
                });
                $('.checkbox').attr("style", "padding:2px 0px 0px 2px !important");
            },
            error: function (msg) {
                alert(msg.d);
            }
        });

        $(".btn-group").attr("style", "max-width:100%");
        $(".multiselect.dropdown-toggle").attr("style", "max-width:100%");
    };

    var fillcboMoneda = function () {

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                    $('#cboMoneda').select2("val", datos[pos].CODIGO);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargarDatos = function () {
      
            var data = new FormData();
            data.append('p_CTLG_CODE', $("#cboEmpresa").val());
            data.append('p_SCSL_CODE', $("#cboSucursal").val());
            data.append('p_MONE_CODE', $("#cboMoneda").val());
            data.append('p_ANIO', $('#txtAnio').val());
            data.append('p_VENDEDORES', ($('#cboVendedor').val() != null) ? $('#cboVendedor').val().toString() : "");
            data.append('p_IGV', ($("#chboAvanzado").is(":checked") == false) ? 'N':'S');

            Bloquear('divDatos');
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/NV/ajax/NVLRCAE.ASHX?OPCION=1",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: false
            }).success(function (datos) {
                Desbloquear("divDatos");
                if (datos != null) {
                    $("#divDatos").html(datos)
                }
            }).error(function () {
                Desbloquear("divDatos");
                alertCustom("Error al listar. Por favor intente nuevamente.");
            });
        

    }

    var cargarGrafico = function (idContenedor, titulo, subtitulo, idTabla) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: 'line',
            },
            title: {
                text: titulo
            },
            subtitle: {
                text: subtitulo
            },
            yAxis: {
                allowDecimals: true,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.value);
                    }
                }
            },
            xAxis: {
                allowDecimals: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>Monto: ' + $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.point.y);
                }
            }
        });
    }

    var eventoControles = function () {
        var empresaAnterior = "";

        $("#cboEmpresa").on("change", function () {
            if ($(this).val() != empresaAnterior) {
                fillCboSucursal($("#cboEmpresa").val());
                fillCboVendedor();
                empresaAnterior = $(this).val();
            }
        });

        $('#buscar').on('click', function () {
            $('#buscar').attr("disabled", "disabled");
            if (vErrors(["cboMoneda", "cboEmpresa","txtAnio"])) {

            if ($('#cboVendedor').val() == null) {

                    alertCustom("Seleccione almenos 1 vendedor!")

                } else {

                    Bloquear("divGrafico")
                    cargarDatos();
                    setTimeout(function () {
                        cargarGrafico("contenedor", "Comparativo Analítico Vendedores", "", "tblDatos");
                        $('#buscar').removeAttr("disabled");
                        Desbloquear("divGrafico")
                    }, 250);
                }
            } else {
                $('#buscar').removeAttr("disabled");
            }

        });

        $("#chboAvanzado").on("change", function () {
            let bValorAnterior = $("#chboAvanzado").data("valactual");
            let bValorActual = $("#chboAvanzado").is(":checked");

            if (bValorAnterior === bValorActual)
                return;

            $("#chboAvanzado").data("valactual", bValorActual);
        });

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboSucursal($("#cboEmpresa").val());
            fillCboVendedor();
            fillcboMoneda();
            cargarFechaDefecto();
            eventoControles();
        }
    };

}();

var NVLRCEP = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboSucursal,#cboMoneda').select2();

        $('#txtAnio').focus(function () { $(this).inputmask({ "mask": "@", "repeat": 1, "greedy": false }) });
        Highcharts.setOptions({
            lang: {
                printChart: 'Imprimir gráfico',
                downloadJPEG: 'Descargar JPEG',
                downloadPDF: 'Descargar PDF',
                downloadPNG: 'Descargar PNG',
                downloadSVG: 'Descargar SVG'
            }
        });

        $('.checkbox').attr("style", "padding:2px 0px 0px 2px !important");
    }

    var cargarFechaDefecto = function () {
        $('#txtAnio').val(new Date().getFullYear());
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
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    $('#cboEmpresa').change();
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboSucursal = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '" data-almc="' + datos[i].ALMC_CODE + '" >' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboSucursal').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillCboVendedor = function () {
        ctlg = $("#cboEmpresa").val()
        scsl = $("#cboEstablecimiento").val()
        estado = "";
        bAsync = true;
        if (bAsync == undefined) {
            bAsync = true;
        }
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=LVEND" +
            "&CTLG=" + ctlg +
            "&SCSL=" + scsl +
            "&p_ESTADO_IND=" + estado,
            contenttype: "application/json;",
            datatype: "json",
            async: bAsync,
            success: function (datos) {
                $("#cboVendedor").multiselect("destroy");
                $('#cboVendedor').empty();
                //if (datos != null) {
                //    for (var i = 0; i < datos.length; i++) {
                //        $('#cboVendedor').append('<option value="' + datos[i].PIDM + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>');
                //    }
                //}
                var activos = "";
                var inactivos = "";
                var opciones = "";
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].ESTADO == 'A') {
                            activos += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                        } else if (datos[i].ESTADO == 'I') {
                            inactivos += '<option value="' + datos[i].PIDM + '" usuario="' + datos[i].USUARIO + '" >' + datos[i].NOMBRE_EMPLEADO + '</option>';
                        }
                    }
                }
                if (activos != "") {
                    opciones += '<optgroup label="ACTIVOS">';
                    opciones += activos;
                    opciones += '</optgroup>';
                }
                if (inactivos != "") {
                    opciones += '<optgroup label="INACTIVOS" >';
                    opciones += inactivos;
                    opciones += '</optgroup>';
                }
                $('#cboVendedor').append(opciones);
                $('#cboVendedor').multiselect({
                    nonSelectedText: 'Seleccione Vendedor!',
                    numberDisplayed: 1
                });
                $('.checkbox').attr("style", "padding:2px 0px 0px 2px !important");
            },
            error: function (msg) {
                alert(msg.d);
            }
        });

        $(".btn-group").attr("style", "max-width:100%");
        $(".multiselect.dropdown-toggle").attr("style", "max-width:100%");
    };

    var fillcboMoneda = function () {

        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda').append('<option></option>');
                if (datos != null) {
                    var pos = 0;
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '">' + datos[i].DESCRIPCION + '</option>');
                        if (datos[i].TIPO == "MOBA") { pos = i; }
                    }
                    $('#cboMoneda').select2("val", datos[pos].CODIGO);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargarDatos = function () {
        var getUsuario = devuelveDatosUsuario($('#ctl00_txtus').val());
        var pidmUsuario = getUsuario[0].PIDM;        
        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_SCSL_CODE', $("#cboSucursal").val());
        data.append('p_MONE_CODE', $("#cboMoneda").val());
        data.append('p_ANIO', $('#txtAnio').val());
        data.append('p_VENDEDORES', pidmUsuario);
        data.append('p_IGV', ($("#chboAvanzado").is(":checked") == false) ? 'N' : 'S');

        Bloquear('divDatos');
        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVLRCAE.ASHX?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: false
        }).success(function (datos) {
            Desbloquear("divDatos");
            if (datos != null) {
                $("#divDatos").html(datos)
            }
        }).error(function () {
            Desbloquear("divDatos");
            alertCustom("Error al listar. Por favor intente nuevamente.");
        });


    }

    var cargarGrafico = function (idContenedor, titulo, subtitulo, idTabla) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
                '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: 'line',
            },
            title: {
                text: titulo
            },
            subtitle: {
                text: subtitulo
            },
            yAxis: {
                allowDecimals: true,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.value);
                    }
                }
            },
            xAxis: {
                allowDecimals: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>Monto: ' + $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.point.y);
                }
            }
        });
    }

    var eventoControles = function () {
        var empresaAnterior = "";

        $("#cboEmpresa").on("change", function () {
            if ($(this).val() != empresaAnterior) {
                fillCboSucursal($("#cboEmpresa").val());
                fillCboVendedor();
                empresaAnterior = $(this).val();
            }
        });

        $('#buscar').on('click', function () {
            $('#buscar').attr("disabled", "disabled");
            if (vErrors(["cboMoneda", "cboEmpresa", "txtAnio"])) {
                Bloquear("divGrafico")
                cargarDatos();
                setTimeout(function () {
                    cargarGrafico("contenedor", "Comparativo Analítico Vendedores", "", "tblDatos");
                    $('#buscar').removeAttr("disabled");
                    Desbloquear("divGrafico")
                }, 250);
            } else {
                $('#buscar').removeAttr("disabled");
            }

        });

        $("#chboAvanzado").on("change", function () {
            let bValorAnterior = $("#chboAvanzado").data("valactual");
            let bValorActual = $("#chboAvanzado").is(":checked");

            if (bValorAnterior === bValorActual)
                return;

            $("#chboAvanzado").data("valactual", bValorActual);

            //if (bValorActual) {
            //    $(".divAvanzado").show();
            //} else {
            //    $(".divAvanzado").hide();
            //}
        });

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboSucursal($("#cboEmpresa").val());
            fillCboVendedor();
            fillcboMoneda();
            cargarFechaDefecto();
            eventoControles();
            $('#buscar').click();
        }
    };

}();
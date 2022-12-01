
var actual = 0;
var ultTipo = "";
var ultSubtipo = "";
var ajaxListado = null;

var datosCaj = [];
var datosAlm = [];
var datosBan = [];
var datosCli = [];
var datosAct = [];
var datosPro = [];
var datosAfp = [];
var datosPre = [];
var datosEmp = [];

var CALPOSG = function () {

    var plugins = function () {
        $('#cboEmpresa,#cboMoneda').select2();
        Highcharts.setOptions({
            lang: {
                printChart: 'Imprimir gráfico',
                downloadJPEG: 'Descargar JPEG',
                downloadPDF: 'Descargar PDF',
                downloadPNG: 'Descargar PNG',
                downloadSVG: 'Descargar SVG'
            }
        });
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

    var fillCboMoneda = function () {

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

    //Pie
    var cargarGrafico = function (idContenedor, titulo, subtitulo, idTabla, tipoGrafico) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: tipoGrafico,
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
                    useHTML: true,
                    formatter: function () {
                        return $("#cboMoneda :selected").attr("simbolo") + ' ' + formatoMiles(this.value);
                    }
                }
            },
            xAxis: {
                labels: { useHTML: true },
                allowDecimals: false
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<b>' + this.point.name.toUpperCase() + '</b><br/>' +
                         $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(this.point.y);
                }
            },
            plotOptions: {
                useHTML: true,
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        useHTML: true,
                        formatter: function () {
                            return '<strong>' + this.point.name + '</strong><br>' + this.percentage.toFixed(2) + '%';
                        }
                    }
                }
            }
        });
    }

    //Barras
    var cargarGrafico2 = function (idContenedor, titulo, subtitulo, idTabla) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            data: {
                table: idTabla
            },
            chart: {
                type: 'column',
            },
            title: {
                text: titulo
            },
            legend: {
                enabled: false
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
                allowDecimals: false,
                labels: { useHTML: true }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<b>' + this.point.name + '</b><br/>' +
                         $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(this.point.y);
                }
            },
            plotOptions: {
                useHTML: true,
                series: {
                    colorByPoint: true
                }
            }
        });
    }

    var eventoControles = function () {

        $("#tblInicio tbody").on("click", "tr", function () {
            var id = $(this).attr("id");
            if (id != "trTotales") {
                id = id.replace("tr", "tbl");
                CargarDatos(id);
            }
        });

        //LLAMADAS NIVEL 2
        $("#tblCaja_1 tbody").on("click", "tr", function () {
            CargarDatos('tblCaja', 2);
            var filtro1 = "";
            if ($(this).attr("filtro1") != undefined) {
                filtro1 = $(this).attr("filtro1");
            }
            Listar("CAJ", "CAJ", filtro1, "2");
        });

        $("#tblCliente_1 tbody").on("click", "tr", function () {
            CargarDatos("tblCliente", 2);
            var filtro1 = "";
            if ($(this).attr("filtro1") != undefined) {
                filtro1 = $(this).attr("filtro1");
            }
            Listar("CLI", "CLI", filtro1, "2");
        });

        $("#tblActivo_1 tbody").on("click", "tr", function () {
            CargarDatos("tblActivo", 2);
            var filtro1 = "";
            if ($(this).attr("filtro1") != undefined) {
                filtro1 = $(this).attr("filtro1");
            } Listar("ACT", "ACT", filtro1, "2");
        });

        $("#tblProveedor_1 tbody").on("click", "tr", function () {
            CargarDatos("tblProveedor", 2);
            var filtro1 = "";
            if ($(this).attr("filtro1") != undefined) {
                filtro1 = $(this).attr("filtro1");
            }
            Listar("PRO", "PRO", filtro1, "2");
        });

        $("#tblPrestamo_1 tbody").on("click", "tr", function () {
            CargarDatos("tblPrestamo", 2);
            var filtro1 = "";
            if ($(this).attr("filtro1") != undefined) {
                filtro1 = $(this).attr("filtro1");
            }
            Listar("PRE", "PRE", filtro1, "2");

        });

        $("#tblEmpleado_1 tbody").on("click", "tr", function () {
            CargarDatos("tblEmpleado", 2);
            var filtro1 = "";
            if ($(this).attr("filtro1") != undefined) {
                filtro1 = $(this).attr("filtro1");
            }
            Listar("EMP", "EMP", filtro1, "2");
        });

        $("#btnInicio").on("click", function () {
            if (actual != 0) {
                $('.tblCustom tbody tr').not("#trCaja,#trAlmacen,#trBanco,#trCliente,#trActivo,#trProveedor,#trAfp,#trPrestamo,#trEmpleado").remove();
                BloquearSinGif("#ventana");
                $('.tblCustom').parent().slideUp("fast", function () {
                    setTimeout(function () {
                        $('#tblInicio').parent().slideDown();
                        DesbloquearSinGif("#ventana");
                    }, 500);
                });
                actual = 0;
                ultTipo = "";
                ultSubtipo = "";
                $("#btnRegresar").slideUp();
                $("#divGrafico").slideDown();
                $("#divGrafico2").slideDown();
                $("#divGrafico3").slideDown();
            }
        });

        $("#btnRegresar").on("click", function () {
            BloquearSinGif("#ventana");
            if (actual <= 1) {
                $('.tblCustom').parent().slideUp('fast', function () {
                    setTimeout(function () {
                        $('#tblInicio').parent().slideDown();
                        DesbloquearSinGif("#ventana");
                    }, 500);
                });
                actual = 0;
                ultTipo = "";
                ultSubtipo = "";
                $("#btnRegresar").slideUp();
                $("#divGrafico").slideUp();
            } else if (actual > 1) {
                var anterior = actual - 1;
                $('.tblCustom').parent().slideUp('fast', function () {
                    setTimeout(function () {
                        $('#' + ultTipo + "_" + anterior).parent().slideDown();
                        DesbloquearSinGif("#ventana");
                    }, 500);
                });
                actual = anterior;
            }
            //TO DO: Recargar Grafico de tabla anterior
            $("#divGrafico").slideDown();
            $("#divGrafico2").slideDown();
            $("#divGrafico3").slideDown();
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboMoneda", "cboEmpresa"])) {
                Listar("", "", "");
            }
        });

        $('#btnMail').click(function (e) {
            $('#txtcontenido').attr('disabled', false);
            $('#txtAsunto').val("POSICION GLOBAL - " + $("#cboEmpresa :selected").html());
            var div = document.createElement("div");
            div.id = "tempDiv";
            $(div).html("<p>EMPRESA: " + $("#cboEmpresa :selected").html() + "</p>");
            $("#datos_correo").html($(div).html());
            cargarCorreos();
            $('#divMail').modal('show');
        });

        //WHATSAPP
        $('#btnWhatsapp').click(function (e) {
            $('#txtcontenidoWhatsapp').attr('disabled', false);
            $('#txtcontenidoWhatsapp').val("");
            cargarTelefonos();
            $('#divWhatsapp').modal('show');
        });
        
    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillCboMoneda();
            eventoControles();
            Listar("", "", "");
        }
    };

}();

//Si el json indicado ya se ha obtenido devuelve false para no volver a consultar
function ValidaConsultar(tipo, subtipo, filtro1, nivel) {
    //TO DO
    var continuar = true;
    return continuar;
}

var Listar = function (tipo, subtipo, filtro1, nivel) {

    var consultar = true;
    //consultar = ValidaConsultar(tipo, subtipo, filtro1, nivel);

    if (tipo == "") {
        $('.tblCustom').parent().slideUp('fast', function () {
            setTimeout(function () {
                $('#tblInicio').parent().slideDown();
            }, 500);
        });
        actual = 0;
        ultTipo = "";
        ultSubtipo = "";
    }

    if (consultar) {
        LimpiarFilasTablaConsultada(tipo, subtipo, nivel);

        var data = new FormData();
        data.append('p_CTLG_CODE', $("#cboEmpresa").val());
        data.append('p_MONE_CODE', $("#cboMoneda").val());
        data.append('p_TIPO', tipo);
        data.append('p_SUBTIPO', subtipo);
        data.append('p_FILTRO1', filtro1);

        Bloquear('divDatosMostrar');
        if (ajaxListado) {
            ajaxListado.abort();
        }
        ajaxListado = $.ajax({
            type: "POST",
            url: "vistas/CA/ajax/CALPOSG.ASHX?OPCION=1",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        }).success(function (datos) {
            var simbolo ='<span style="float:left">'+ $("#cboMoneda option:selected").attr("simbolo")+'</span>';
            //JSON
            if (tipo == "") {
                if (datos != null && datos.length > 0) {
                    //HABER
                    $($("#trCaja td")[1]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_CAJA))
                    $($("#trAlmacen td")[1]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_ALMACEN))
                    $($("#trBanco td")[1]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_BANCO))
                    $($("#trCliente td")[1]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_CLIENTE))
                    $($("#trActivo td")[1]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_ACTIVO))
                    //DEBE
                    $($("#trProveedor td")[2]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_PROVEEDOR))
                    $($("#trAfp td")[2]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_AFP))
                    $($("#trPrestamo td")[2]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_PRESTAMO))
                    $($("#trEmpleado td")[2]).html(simbolo + " " + formatoMiles(datos[0].TOTAL_EMPLEADO))

                    var totalHaber = datos[0].TOTAL_CAJA + datos[0].TOTAL_ALMACEN + datos[0].TOTAL_BANCO + datos[0].TOTAL_CLIENTE + datos[0].TOTAL_ACTIVO
                    var totalDebe = datos[0].TOTAL_PROVEEDOR + datos[0].TOTAL_AFP + datos[0].TOTAL_PRESTAMO + datos[0].TOTAL_EMPLEADO
                    var total = totalHaber - totalDebe

                    $($("#trTotales td")[1]).html("<b>" + simbolo + " " + formatoMiles(totalHaber) + "</b>")
                    $($("#trTotales td")[2]).html("<b>" + simbolo + " " + formatoMiles(totalDebe) + "</b>")

                    $("#lblMontoPosGlobal").html(simbolo + " " + formatoMiles(total));
                    //TOTAL
                    var dataSeries = [];
                    var obj = {};
                    obj.name = "HABER";
                    obj.y = totalHaber;
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "DEBE";
                    obj.y = totalDebe;
                    dataSeries.push(obj);
                    $("#divGrafico").slideDown();
                    $("#divGrafico2").slideDown();
                    $("#divGrafico3").slideDown();
                    CargarGraficoPie("contenedor", "Haber vs. Debe", "", dataSeries)
                    //HABER
                    var dataSeries = [];
                    var obj = {};
                    obj.name = "CAJAS";
                    obj.y = parseFloat(datos[0].TOTAL_CAJA);
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "ALMACÉN VALORIZADO";
                    obj.y = parseFloat(datos[0].TOTAL_ALMACEN);
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "CUENTAS EN BANCOS";
                    obj.y = parseFloat(datos[0].TOTAL_BANCO);
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "POR COBRAR CLIENTES";
                    obj.y = parseFloat(datos[0].TOTAL_CLIENTE);
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "ACTIVOS FIJOS";
                    obj.y = parseFloat(datos[0].TOTAL_ACTIVO);
                    dataSeries.push(obj);
                    $("#divGrafico2").slideDown();
                    CargarGraficoPie("contenedor2", "Composición del Haber", "", dataSeries)
                    //DEBE
                    var dataSeries = [];
                    var obj = {};
                    obj.name = "DEUDA PROVEEDORES";
                    obj.y = parseFloat(datos[0].TOTAL_PROVEEDOR);
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "DEUDAS CON AFP";
                    obj.y = parseFloat(datos[0].TOTAL_AFP);
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "PRÉSTAMOS BANCOS";
                    obj.y = parseFloat(datos[0].TOTAL_PRESTAMO);
                    dataSeries.push(obj);
                    var obj = {};
                    obj.name = "POR PAGAR EMPLEADOS";
                    obj.y = parseFloat(datos[0].TOTAL_EMPLEADO);                                 
                    dataSeries.push(obj);
                    $("#divGrafico3").slideDown();
                    CargarGraficoPie("contenedor3", "Composición del Debe", "", dataSeries)

                } else {
                    infoCustom2("No se han encontrado datos");
                }
            } else {
                switch (tipo) {
                    case "CAJ":
                        CargarDatosCaja(datos, subtipo, nivel);
                        break;
                    case "ALM":
                        CargarDatosAlmacen(datos, subtipo, nivel);
                        break;
                    case "BAN":
                        CargarDatosBanco(datos, subtipo, nivel);
                        break;
                    case "CLI":
                        CargarDatosCliente(datos, subtipo, nivel);
                        break;
                    case "ACT":
                        CargarDatosActivo(datos, subtipo, nivel);
                        break;
                    case "PRO":
                        CargarDatosProveedor(datos, subtipo, nivel);
                        break;
                    case "AFP":
                        CargarDatosAfp(datos, subtipo, nivel);
                        break;
                    case "PRE":
                        CargarDatosPrestamo(datos, subtipo, nivel);
                        break;
                    case "EMP":
                        CargarDatosEmpleado(datos, subtipo, nivel);
                        break;
                    default:
                }
            }

        }).error(function (msg) {
            if (msg.statusText != "abort") {
                alertCustom("Error al recuperar la información. Por favor intente nuevamente.");
            }
        }).complete(function () {
            Desbloquear("divDatosMostrar");
        });
    } else {
        //TO DO: CARGAR TABLA SIN CONSULTAR

    }
}

function LimpiarFilasTablaConsultada(tipo, subtipo, nivel) {
    if (tipo == "") {

    } else {
        switch (tipo) {
            case "CAJ":
                $("#tblCaja_" + nivel + " tbody tr").remove();
                var col = $("#tblCaja_" + nivel + " thead tr th").length;
                $("#tblCaja_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "ALM":
                $("#tblAlmacen_" + nivel + " tbody tr").remove();
                var col = $("#tblAlmacen_" + nivel + " thead tr th").length;
                $("#tblAlmacen_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "BAN":
                $("#tblBanco_" + nivel + " tbody tr").remove();
                var col = $("#tblBanco_" + nivel + " thead tr th").length;
                $("#tblBanco_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "CLI":
                $("#tblCliente_" + nivel + " tbody tr").remove();
                var col = $("#tblCliente_" + nivel + " thead tr th").length;
                $("#tblCliente_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "ACT":
                $("#tblActivo_" + nivel + " tbody tr").remove();
                var col = $("#tblActivo_" + nivel + " thead tr th").length;
                $("#tblActivo_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "PRO":
                $("#tblProveedor_" + nivel + " tbody tr").remove();
                var col = $("#tblProveedor_" + nivel + " thead tr th").length;
                $("#tblProveedor_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "AFP":
                $("#tblAfp_" + nivel + " tbody tr").remove();
                var col = $("#tblAfp_" + nivel + " thead tr th").length;
                $("#tblAfp_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "PRE":
                $("#tblPrestamo_" + nivel + " tbody tr").remove();
                var col = $("#tblPrestamo_" + nivel + " thead tr th").length;
                $("#tblPrestamo_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            case "EMP":
                $("#tblEmpleado_" + nivel + " tbody tr").remove();
                var col = $("#tblEmpleado_" + nivel + " thead tr th").length;
                $("#tblEmpleado_" + nivel + " tbody").append('<tr><td colspan="' + col + '" style="text-align:center;"><img src="/recursos/img/359.gif" style="max-height:20px;"/></td></tr>');

                break;
            default:
        }
    }
}

//$('#tblInicio').animate({ 'width': '100%' });
//SIEMPRE DEBE MANDARSE UN TIPO
function CargarDatos(idTabla, subtipo) {
    $("#btnRegresar").show();
    $("#divGrafico").hide();
    $("#divGrafico2").hide();
    $("#divGrafico3").hide();
    var ocultar = true;
    var id = "";
    if (subtipo == undefined) {
        subtipo = "1";
        actual = 1;
    }
    else {
        actual = parseInt(subtipo);
    }

    id = idTabla + '_' + subtipo;//EJEM: tblCaja_1
    ultTipo = idTabla;
    ultSubtipo = subtipo;

    var paramTipo = "";
    switch (idTabla) {
        case "tblCaja":
            if (subtipo.toString() == "1") {
                Listar("CAJ", "EST", "", "1");
            } else if (subtipo.toString() == "2") {
                // Listar("CAJ", "CAJ", "", "2");
            }
            break;
        case "tblAlmacen":
            Listar("ALM", "", "", "1");
            break;
        case "tblBanco":
            Listar("BAN", "", "", "1");
            break;
        case "tblCliente":
            if (subtipo.toString() == "1") {
                Listar("CLI", "EST", "", "1");
            } else if (subtipo.toString() == "2") {
                // Listar("CLI", "CLI", "", "2");
            }
            break;
        case "tblActivo":
            if (subtipo.toString() == "1") {
                Listar("ACT", "EST", "", "1");
            } else if (subtipo.toString() == "2") {
                // Listar("ACT", "ACT", "", "2");
            }
            break;
        case "tblProveedor":
            if (subtipo.toString() == "1") {
                Listar("PRO", "EST", "", "1");
            } else if (subtipo.toString() == "2") {
                // Listar("PRO", "PRO", "", "2");
            }
            break;
        case "tblAfp":
            Listar("AFP", "", "", "1");
            break;
        case "tblPrestamo":
            if (subtipo.toString() == "1") {
                Listar("PRE", "EST", "", "1");
            } else if (subtipo.toString() == "2") {
                // Listar("PRE", "PRE", "", "2");
            }
            break;
        case "tblEmpleado":
            if (subtipo.toString() == "1") {
                Listar("EMP", "EST", "", "1");
            } else if (subtipo.toString() == "2") {
                // Listar("EMP", "EMP", "", "2");
            }
            break;
        default:
    }

    $('.tblCustom').parent().slideUp('fast', function () {
        setTimeout(function () {
            $('#' + id).parent().slideDown();
        }, 100);
    });
}

//------------------------------
function CargarDatosCaja(datos, subtipo, nivel) {
    //TEST
    //datosCaj = []
    //switch (subtipo) {
    //    case "EST":
    //        var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88","SUCURSAL_CODE": "0001" }
    //        var obj2 = { "SUCURSAL": "SUCU2", "MONTO": "789.88","SUCURSAL_CODE": "0002" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    case "CAJ":
    //        datosCaj = []
    //        var obj = { "DESCRIPCION": "CAJA 1", "RESPONSABLE": "LUISINI", "MONTO": "5456.48" }
    //        var obj2 = { "DESCRIPCION": "CAJA 2", "RESPONSABLE": "MELBIN", "MONTO": "879556.48" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    default:
    //        break;
    //}
    //FIN TEST
    nivel = nivel.toString();
    $("#tblCaja_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    switch (subtipo) {
        case "EST":
            if (datos == null || datos.length == 0) {
                $("#tblCaja_" + nivel + " tbody").append('<tr><td colspan="2">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblCaja_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    var strFiltro1 = 'filtro1=\"' + datos[i].SUCURSAL_CODE + '\"';
                    $("#tblCaja_" + nivel + " tbody").append('<tr ' + strFiltro1 + '><td>' + datos[i].SUCURSAL + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].SUCURSAL;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoCaja_1", "Torta Saldo en Cajas", "Por Establecimiento", dataSeries)
            }
            break;
        case "CAJ":
            if (datos == null || datos.length == 0) {
                $("#tblCaja_" + nivel + " tbody").append('<tr><td colspan="3">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblCaja_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    $("#tblCaja_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td>' + datos[i].RESPONSABLE + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].DESCRIPCION;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                CargarGraficoPie("graficoCaja_2", "Torta Saldo en Cajas", "Por Caja", dataSeries)
            }
            break;
        default:
    }
}

function CargarDatosAlmacen(datos, subtipo, nivel) {
    //TEST2
    //datosCaj = []
    //var obj = { "DESCRIPCION": "ALM 1", "RESPONSABLE": "RESP1", "MONTO": "41776.48" }
    //var obj2 = { "DESCRIPCION": "ALM 2", "RESPONSABLE": "RESP2", "MONTO": "4345.48" }
    //datosCaj.push(obj)
    //datosCaj.push(obj2)
    //datos = datosCaj;
    //FIN TEST2
    nivel = nivel.toString();
    $("#tblAlmacen_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    if (datos == null || datos.length == 0) {
        $("#tblAlmacen_" + nivel + " tbody").append('<tr><td colspan="3">No se encontraron datos</td></tr>');
    } else {
        var dataSeries = [];
        //POBLAR DATA
        $("#tblAlmacen_" + nivel + " tbody tr").remove();
        for (var i = 0; i < datos.length; i++) {
            $("#tblAlmacen_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td>' + datos[i].RESPONSABLE + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
            var obj = {};
            obj.name = datos[i].DESCRIPCION;
            obj.y = parseFloat(datos[i].MONTO);
            dataSeries.push(obj);
        }
        
        CargarGraficoPie("graficoAlmacen_1", "Torta Saldo en Almacén Valorizado", "Por Almacén", dataSeries)
    }
}

function CargarDatosBanco(datos, subtipo, nivel) {
    //TEST2
    //datosCaj = []
    //var obj = { "DESCRIPCION": "CUENTA 1", "MONTO_ORIGEN": "21230.1", "MONTO": "41776.48", "MONE_SIMBOLO": "$" }
    //var obj2 = { "DESCRIPCION": "CUENTA 2", "MONTO_ORIGEN": "5461.21", "MONTO": "4345.48", "MONE_SIMBOLO": "$" }
    //datosCaj.push(obj)
    //datosCaj.push(obj2)
    //datos = datosCaj;
    //FIN TEST2
    nivel = nivel.toString();
    $("#tblBanco_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    if (datos == null || datos.length == 0) {
        $("#tblBanco_" + nivel + " tbody").append('<tr><td colspan="3">No se encontraron datos</td></tr>');
    } else {
        var dataSeries = [];
        //POBLAR DATA
        $("#tblBanco_" + nivel + " tbody tr").remove();
        for (var i = 0; i < datos.length; i++) {
            $("#tblBanco_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td class="right"><span style="float:left">' + datos[i].MONE_SIMBOLO + '</span>' + formatoMiles(datos[i].MONTO_ORIGEN) + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
            var obj = {};
            obj.name = datos[i].DESCRIPCION;
            obj.y = parseFloat(datos[i].MONTO);
            dataSeries.push(obj);
        }
        
        CargarGraficoPie("graficoBanco_1", "Torta Saldo de Cuentas en Bancos", "Por Cuenta", dataSeries)
    }
}

function CargarDatosCliente(datos, subtipo, nivel) {
    //TEST
    //datosCaj = []
    //switch (subtipo) {
    //    case "EST":
    //        var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88","SUCURSAL_CODE": "0001" }
    //        var obj2 = { "SUCURSAL": "SUCU2", "MONTO": "789.88" ,"SUCURSAL_CODE": "0002"}
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    case "CLI":
    //        var obj = { "DESCRIPCION": "CLIENTE1", "TELEFONO": "LUISINI", "MONTO": "5456.48" }
    //        var obj2 = { "DESCRIPCION": "CLIENTE2", "TELEFONO": "MELBIN", "MONTO": "879556.48" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    default:
    //        break;
    //}
    //FIN TEST
    nivel = nivel.toString();
    $("#tblCliente_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    switch (subtipo) {
        case "EST":
            if (datos == null || datos.length == 0) {
                $("#tblCliente_" + nivel + " tbody").append('<tr><td colspan="2">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblCliente_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    var strFiltro1 = 'filtro1=\"' + datos[i].SUCURSAL_CODE + '\"';
                    $("#tblCliente_" + nivel + " tbody").append('<tr ' + strFiltro1 + '><td>' + datos[i].SUCURSAL + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].SUCURSAL;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoCliente_1", "Torta Por Cobrar a Clientes", "Por Establecimiento", dataSeries)
            }
            break;
        case "CLI":
            if (datos == null || datos.length == 0) {
                $("#tblCliente_" + nivel + " tbody").append('<tr><td colspan="3">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblCliente_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    $("#tblCliente_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td>' + datos[i].TELEFONO + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].DESCRIPCION;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoCliente_2", "Torta Por Cobrar a Clientes", "Por Cliente", dataSeries)
            }
            break;
        default:
    }
}

function CargarDatosActivo(datos, subtipo, nivel) {
    //TEST
    //datosCaj = []
    //switch (subtipo) {
    //    case "EST":
    //        var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88", "SUCURSAL_CODE": "0001" }
    //        var obj2 = { "SUCURSAL": "SUCU2", "MONTO": "789.88", "SUCURSAL_CODE": "0002" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    case "ACT":
    //        var obj = { "DESCRIPCION": "ACTIVO FIJO 1", "SERIE": "546512332", "MONTO": "5456.48" }
    //        var obj2 = { "DESCRIPCION": "ACTV 2", "SERIE": "5456465", "MONTO": "879556.48" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    default:
    //        break;
    //}
    //FIN TEST
    nivel = nivel.toString();
    $("#tblActivo_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    switch (subtipo) {
        case "EST":
            if (datos == null || datos.length == 0) {
                $("#tblActivo_" + nivel + " tbody").append('<tr ' + strFiltro1 + '><td colspan="2">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblActivo_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    var strFiltro1 = 'filtro1=\"' + datos[i].SUCURSAL_CODE + '\"';
                    $("#tblActivo_" + nivel + " tbody").append('<tr ' + strFiltro1 + '><td>' + datos[i].SUCURSAL + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].SUCURSAL;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                //
                CargarGraficoPie("graficoActivo_1", "Torta Saldo en Activos Fijos", "Por Establecimiento", dataSeries)
            }
            break;
        case "ACT":
            if (datos == null || datos.length == 0) {
                $("#tblActivo_" + nivel + " tbody").append('<tr><td colspan="3">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblActivo_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    $("#tblActivo_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td>' + datos[i].SERIE + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].DESCRIPCION;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoActivo_2", "Torta Saldo en Activos Fijos", "Por Activo Fijo", dataSeries)
            }
            break;
        default:
    }
}

function CargarDatosProveedor(datos, subtipo, nivel) {
    //TEST
    //datosCaj = []
    //switch (subtipo) {
    //    case "EST":
    //        var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88", "SUCURSAL_CODE": "0001" }
    //        var obj2 = { "SUCURSAL": "SUCU2", "MONTO": "789.88", "SUCURSAL_CODE": "0002" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    case "PRO":
    //        var obj = { "DESCRIPCION": "PROV1 1", "TELEFONO": "546512332", "MONTO": "5456.48" }
    //        var obj2 = { "DESCRIPCION": "PROV 2", "TELEFONO": "5456465", "MONTO": "879556.48" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    default:
    //        break;
    //}
    //FIN TEST
    nivel = nivel.toString();
    $("#tblProveedor_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    switch (subtipo) {
        case "EST":
            if (datos == null || datos.length == 0) {
                $("#tblProveedor_" + nivel + " tbody").append('<tr><td colspan="2">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblProveedor_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    var strFiltro1 = 'filtro1=\"' + datos[i].SUCURSAL_CODE + '\"';
                    $("#tblProveedor_" + nivel + " tbody").append('<tr ' + strFiltro1 + '><td>' + datos[i].SUCURSAL + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].SUCURSAL;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoProveedor_1", "Torta Deuda Proveedores", "Por Establecimiento", dataSeries)
            }
            break;
        case "PRO":
            if (datos == null || datos.length == 0) {
                $("#tblProveedor_" + nivel + " tbody").append('<tr><td colspan="3">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblProveedor_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    $("#tblProveedor_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td>' + datos[i].TELEFONO + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].DESCRIPCION;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoProveedor_2", "Torta Deuda Proveeedores", "Por Proveedor", dataSeries)
            }
            break;
        default:
    }
}

function CargarDatosAfp(datos, subtipo, nivel) {
    //TEST2
    //datosCaj = []
    //var obj = { "DESCRIPCION": "AFP 1", "MONTO": "41776.48" }
    //var obj2 = { "DESCRIPCION": "AFP 2", "MONTO": "4345.48" }
    //datosCaj.push(obj)
    //datosCaj.push(obj2)
    //datos = datosCaj;
    //FIN TEST2
    nivel = nivel.toString();
    $("#tblAfp_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    if (datos == null || datos.length == 0) {
        $("#tblAfp_" + nivel + " tbody").append('<tr><td colspan="2">No se encontraron datos</td></tr>');
    } else {
        var dataSeries = [];
        //POBLAR DATA
        $("#tblAfp_" + nivel + " tbody tr").remove();
        for (var i = 0; i < datos.length; i++) {
            $("#tblAfp_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
            var obj = {};
            obj.name = datos[i].DESCRIPCION;
            obj.y = parseFloat(datos[i].MONTO);
            dataSeries.push(obj);
        }
        
        CargarGraficoPie("graficoAfp_1", "Torta Deudas con AFP", "Por AFP", dataSeries)
    }
}

function CargarDatosPrestamo(datos, subtipo, nivel) {
    //TEST
    //datosCaj = []
    //switch (subtipo) {
    //    case "EST":
    //        var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88", "SUCURSAL_CODE": "0001" }
    //        var obj2 = { "SUCURSAL": "SUCU2", "MONTO": "789.88", "SUCURSAL_CODE": "0002" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    case "PRE":
    //        var obj = { "DESCRIPCION": "BANCO 1", "NRO_CREDITO": "546512332", "MONTO_ORIGEN": "5456.48", "MONTO": "5456.48", "MONE_SIMBOLO": "$" }
    //        var obj2 = { "DESCRIPCION": "BANCO 2", "NRO_CREDITO": "5456465", "MONTO_ORIGEN": "879556.48", "MONTO": "5456.48", "MONE_SIMBOLO": "$" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    default:
    //        break;
    //}
    //FIN TEST
    nivel = nivel.toString();
    $("#tblPrestamo_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    switch (subtipo) {
        case "EST":
            if (datos == null || datos.length == 0) {
                $("#tblPrestamo_" + nivel + " tbody").append('<tr><td colspan="2">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblPrestamo_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    var strFiltro1 = 'filtro1=\"' + datos[i].SUCURSAL_CODE + '\"';
                    $("#tblPrestamo_" + nivel + " tbody").append('<tr ' + strFiltro1 + '><td>' + datos[i].SUCURSAL + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].SUCURSAL;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoPrestamo_1", "Torta Préstamos Bancos", "Por Establecimiento", dataSeries)
            }
            break;
        case "PRE":
            if (datos == null || datos.length == 0) {
                $("#tblPrestamo_" + nivel + " tbody").append('<tr><td colspan="4">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblPrestamo_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    $("#tblPrestamo_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td>' + datos[i].NRO_CREDITO + '</td><td class="right"><span style="float:left">' + datos[i].MONE_SIMBOLO + '</span> ' + formatoMiles(datos[i].MONTO_ORIGEN) + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].DESCRIPCION;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoPrestamo_2", "Torta Préstamos Bancos", "Por Crédito", dataSeries)
            }
            break;
        default:
    }
}

function CargarDatosEmpleado(datos, subtipo, nivel) {
    //TEST
    //datosCaj = []
    //switch (subtipo) {
    //    case "EST":
    //        var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88", "SUCURSAL_CODE": "0001" }
    //        var obj2 = { "SUCURSAL": "SUCU2", "MONTO": "789.88", "SUCURSAL_CODE": "0002" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    case "EMP":
    //        var obj = { "DESCRIPCION": "EMP 1", "CARGO": "ADMIN", "MONTO": "41.48" }
    //        var obj2 = { "DESCRIPCION": "EMP 2", "CARGO": "CONTADOR", "MONTO": "41456.48" }
    //        datosCaj.push(obj)
    //        datosCaj.push(obj2)
    //        datos = datosCaj;
    //        break;
    //    default:
    //        break;
    //}
    //FIN TEST
    nivel = nivel.toString();
    $("#tblEmpleado_" + nivel + " tbody tr").remove();
    var simbolo = '<span style="float:left">' + $('#cboMoneda :selected').attr('simbolo') + '</span>';
    switch (subtipo) {
        case "EST":
            if (datos == null || datos.length == 0) {
                $("#tblEmpleado_" + nivel + " tbody").append('<tr><td colspan="2">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblEmpleado_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    var strFiltro1 = 'filtro1=\"' + datos[i].SUCURSAL_CODE + '\"';
                    $("#tblEmpleado_" + nivel + " tbody").append('<tr ' + strFiltro1 + '><td>' + datos[i].SUCURSAL + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].SUCURSAL;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoEmpleado_1", "Torta Por Pagar Empleados", "Por Establecimiento", dataSeries)
            }
            break;
        case "EMP":
            if (datos == null || datos.length == 0) {
                $("#tblEmpleado_" + nivel + " tbody").append('<tr><td colspan="3">No se encontraron datos</td></tr>');
            } else {
                var dataSeries = [];
                //POBLAR DATA
                $("#tblEmpleado_" + nivel + " tbody tr").remove();
                for (var i = 0; i < datos.length; i++) {
                    $("#tblEmpleado_" + nivel + " tbody").append('<tr><td>' + datos[i].DESCRIPCION + '</td><td>' + datos[i].CARGO + '</td><td class="right">' + simbolo + formatoMiles(datos[i].MONTO) + '</td></tr>');
                    var obj = {};
                    obj.name = datos[i].DESCRIPCION;
                    obj.y = parseFloat(datos[i].MONTO);
                    dataSeries.push(obj);
                }
                
                CargarGraficoPie("graficoEmpleado_2", "Torta Por Pagar Empleados", "Por Empleado", dataSeries)
            }
            break;
        default:
    }
}

//----------
var usar = true;
function CargarGraficoPie(idContenedor, titulo, subtitulo, dataSeries) {
    //dataSeries:
    /*
    [{  name: 'Microsoft Internet Explorer',    y: 56.33 }, 
     {  name: 'Chrome',y: 24.03, sliced: true,  selected: true}]  
    */
    if (usar) {
        $('#' + idContenedor).highcharts({
            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: titulo
            },
            subtitle: {
                text: subtitulo
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                    return '<b>' + this.point.name.toUpperCase() + '</b> - <b>' + formatoMiles(this.point.percentage) + '%</b><br/>' +
                         $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(this.point.y);
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Montos',
                colorByPoint: true,
                data: dataSeries
            }]
        });
    }
}

//EMAIL
function cargarCorreos() {
    ObtenerCorreoUsuario();
    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LMAILS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);
        $('#cboCorreos').selectize({
            persist: false,
            maxItems: null,
            valueField: 'email',
            labelField: 'name',
            searchField: ['name', 'email'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                    '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.email;
                    var caption = item.name ? item.email : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                    '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                // email@address.com
                regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name <email@address.com>
                regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                    return { email: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
                if (match) { return { email: match[2], name: $.trim(match[1]) }; }
                alert('Invalid email address.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');
    });
};

//WHATSAPP

function cargarTelefonos() {
    REGEX_TELE = "([0-9]*)"
    $.ajax({
        type: 'post',
        url: 'vistas/na/ajax/naminsa.ashx?OPCION=LTELEFONOS',
        async: false
    }).done(function (data) {
        data = JSON.parse(data);

        $('#cboClienteWhatsapp').selectize({
            persist: false,
            maxItems: null,
            valueField: 'telefono',
            labelField: 'name',
            searchField: ['name', 'telefono'],
            options: data,
            render: {
                item: function (item, escape) {
                    return '<div>' +
                        (item.name ? '<span class="name">' + escape(item.name) + '</span>&nbsp;' : '') +
                        (item.telefono ? '<span class="telefono">' + escape(item.telefono) + '</span>' : '') +
                        '</div>';
                },
                option: function (item, escape) {
                    var label = item.name || item.telefono;
                    var caption = item.name ? item.telefono : null;
                    return '<div style="padding: 2px">' +
                        '<span class="label" style="display: block; font-size: 14px; background-color: inherit; color: inherit; text-shadow: none">' + escape(label) + '</span>' +
                        (caption ? '<span class="caption" style="display: block; font-size: 12px; margin: 2px 5px">' + escape(caption) + '</span>' : '') +
                        '</div>';
                }
            },
            createFilter: function (input) {
                var match, regex;
                regex = new RegExp('^' + REGEX_TELE + '$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[0]);
                // name phone_number
                regex = new RegExp('^([^<]*)\<' + REGEX_TELE + '\>$', 'i');
                match = input.match(regex);
                if (match) return !this.options.hasOwnProperty(match[2]);
                return false;
            },
            create: function (input) {
                if ((new RegExp('^' + REGEX_TELE + '$', 'i')).test(input)) {
                    return { telefono: input };
                }
                var match = input.match(new RegExp('^([^<]*)\<' + REGEX_TELE + '\>$', 'i'));
                if (match) { return { telefono: match[2], name: $.trim(match[1]) }; }
                alert('Invalid number.');
                return false;
            }
        });
        $('.selectize-control').css('margin-left', '0px').css('margin-bottom', '15px');
        $('.selectize-dropdown').css('margin-left', '0px');

        for (var c in data) {
            if (data[c].codigo === $('#hfPIDM').val()) {
                $("#cboClienteWhatsapp")[0].selectize.setValue(data[c].telefono);
                break;
            }
        }
    });
}

var ObtenerCorreoUsuario = function () {
    var email = "";
    $.ajax({
        type: "post",
        url: "vistas/NS/ajax/NSMUSUA.ashx?OPCION=RU&ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                email = datos[0].EMAIL;
            } else {
                alertInfo("No se encontro ningun email para remitente!");
            }
        },
        complete: function () {
            $("#txtRemitente").val(email);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var enviarCorreo = function () {
    var destinos = $('#cboCorreos').val();

    if (vErrors(['cboCorreos', 'txtAsunto'])) {
        $('#btnEnviarCorreo').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        destinos = destinos.toString();

        var data = new FormData();

        data.append('OPCION', 'SENDMAIL');
        data.append('NREMITENTE', $('#txtNRemitente').val());
        data.append('REMITENTE', $('#txtRemitente').val());
        data.append('DESTINATARIOS', destinos);
        data.append('HTMLMENSAJE', $("#datos_correo").html() + $(".divTblCustom").html().replace("table", "table border='1'").replace('style="width: 100%;', 'style="width: 100%;border-collapse:collapse;').split('height: 0px;').join().split('height:0').join());
        data.append('ASUNTO', $('#txtAsunto').val());
        data.append('MENSAJE', $('#txtcontenido').val());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NF/ajax/NFMRECE.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        })
        .success(function (res) {
            exito();
            $('#cboCorreos').parent().html('<select multiple="multiple" class="span12" id="cboCorreos"></select>');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            setTimeout(function () { $('#divMail').modal('hide'); }, 25);
        })
        .error(function () {
            alertCustom('Ocurrió un error en el servidor al intentar enviar el correo electrónico. Por favor, inténtelo nuevamente.');
            $('#btnEnviarCorreo').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
        });

    }
};

function enviarWhatsapp() {

    var contenido = "<div><div style='font-size: 1.8vw;'>POSICION GLOBAL</div><b>EMPRESA: </b><div>&nbsp;&nbsp;" + $("#cboEmpresa").text() + "</div></div>" + "<div><b>MONEDA: </b><div>&nbsp;&nbsp;" + $('#cboMoneda :selected').text() + "</div></div>" + "<div><b>POS GLOBAL: <div>&nbsp;&nbsp;" + $("#lblMontoPosGlobal").text() + "</b></div></div>" +
        "<div class=&quot;row-fluid&quot;><div class=&quot;span12&quot;>" + $(".divTblCustom").html() + "</div></div>" +
        "<div class=&quot;row-fluid&quot;><div class=&quot;span12&quot;>" + $("#divGrafico").html() + "</div></div>" +
        "<div class=&quot;row-fluid&quot;><div class=&quot;span12&quot;>" + $("#divGrafico2").html() + "</div></div>" +
        "<div class=&quot;row-fluid&quot;><div class=&quot;span12&quot;>" + $("#divGrafico3").html() + "</div></div>";

    var telefonos = $("#cboClienteWhatsapp").val();

    if (vErrors(['cboClienteWhatsapp'])) {
        $('#btnEnviarWhatsapp').prop('disabled', true).html('<img src="./recursos/img/loading.gif" align="absmiddle">&nbsp;Enviando');
        RECIPIENT_PHONE_NUMBER = telefonos.toString();
/*        var payload = { "url": payload };*/
        $.ajax({
            type: "post",
            url: "vistas/CA/ajax/CALPOSG.ashx?OPCION=whatsapp" +
                "&RECIPIENT_PHONE_NUMBER=" + RECIPIENT_PHONE_NUMBER +
                "&MENSAJEWHATSAPP=" + $('#txtContenidoWhatsapp').val(),
            contentType: "application/json;",
            data: JSON.stringify(contenido),
            contentType: "application/json",
            success: function (datos) {
                if (datos === null) {
                    datos = ""
                }
                if (datos.indexOf("error") >= 0) {
                    alertCustom("El mensaje no se envio correctamente");
                } else {
                    exito();
                }
                $('#btnEnviarWhatsapp').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
                setTimeout(function () { $('#divWhatsapp').modal('hide'); }, 25);
            },
            error: function (msg) {
                alertCustom('Ocurrió un error en el servidor al intentar enviar el mensaje. Por favor, inténtelo nuevamente.');
                $('#btnEnviarWhatsapp').prop('disabled', false).html('<i class="icon-plane"></i>&nbsp;Enviar');
            }
        });
    }
};

$("#divMail").on("show", function () {

    $("#modal_info").modal("hide");

});

$(".close_mail").on("click", function () {

    $("#modal_info").modal("show");

});

//-----------
var asyncLoop = function (o) {
    var i = -1;

    var loop = function () {
        i++;
        if (i == o.length) { o.callback(); return; }
        o.functionToLoop(loop, i);
    }
    loop();//init
}
function test1() {
    var datos = [];
    var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88" }
    datos.push(obj)

    $("#tblCaja_1 tbody tr").remove();

    for (var i = 0; i < 1000; i++) {
        $("#tblCaja_1 tbody").append('<tr><td>' + i + "-" + datos[0].SUCURSAL + '</td><td>' + $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(datos[0].MONTO) + '</td></tr>');
    }
}
function test2() {
    var datos = [];
    var obj = { "SUCURSAL": "SUCU1", "MONTO": "2123.88" }
    datos.push(obj)
    $("#tblCaja_1 tbody tr").remove();

    asyncLoop({
        length: 1000,
        functionToLoop: function (loop, i) {
            setTimeout(function () {
                $("#tblCaja_1 tbody").append('<tr><td>' + i + "-" + datos[0].SUCURSAL + '</td><td>' + $('#cboMoneda :selected').attr('simbolo') + ' ' + formatoMiles(datos[0].MONTO) + '</td></tr>');
                loop();
            }, 0.000000000001);
        },
        callback: function () {
            console.log("Fin loop")
        }
    });

}



function ImprimirDcto() { //arreglo de div(s) que iran,titulo(opcional) 
    if ($("#styleImpresion").html() == undefined) {
        var estilos = '<style id="styleImpresion">@media print {.bn{border:none !important;} .chat-window {display: none !important;}.navbar-inner {display: none !important;}.page-sidebar {display: none  !important;}.footer {display: none  !important;}.page-content {margin-left: 0px  !important;}#contenedorBreadcrumb{ display: none  !important;}.page-container {margin-top: 0px  !important;}#divDctoImprimir {display: block  !important;width: 100%  !important;}.container-fluid {padding: 0px  !important;}.dn{display:none !important;}}</style>';
        $("#ventana").append(estilos);
    }
      
    $("#divDctoImprimir").html($(".divTblCustom").html());
    setTimeout(function () {
        window.print();
    }, 200)

   
}

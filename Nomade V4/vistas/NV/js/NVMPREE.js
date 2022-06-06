/*

 El boton "Calcular Precios(C)": Calcula los precios de los productos en pantalla 
 basados en su costo promedio, si el costo es 0 el cálculo no se realizará
 
 El boton "Calcular Precios(P)": Calcula los precios de los productos en pantalla 
 basados en su último precio de compra, si el último precio de compra es 0 el cálculo no se realizará
 
 La moneda en la que se guardará el precio está determinado por el tipo de moneda del Producto (columna MONEDA de la tabla)
 
 Las opciones de costeo determinan si el Costo Promedio y el Último Precio de Compra se obtendrán de acuerdo a la moneda del producto, su valor en moneda base o su valor en moneda alterna.

 Al usar los botones de cálculo de precios: Si la moneda usada para el costeo no coincide con la moneda del producto se utilizará el tipo de cambio mostrado en la pantalla (Interno-Venta)

 Al costo Promedio se le agregado IGV, y  usa el parametro costo fijo(CFIJ) 
 Al último precio de compra se le ha agregado IGV

 Información de Guardado
 -----------------------
*Los datos se guardarán al deseleccionar cada casilla de Precio Normal luego de ingresar un valor
*El borde VERDE indica que la operación se realizó correctamente
*El borde AZUL indica que la operación se está procesando

*/

var soloCalcular = false;//true=Sin limpiar campos ni mensaje de calculo 0
var msgCalcular = true;
var calcularPrecioConTabla = false;
var opProcesando = 0;
var tipoCambio = 1;
var moneValorizado = "PROD";

var rangos = [];
var rangoSelecCode = "";

var anterior;
//DPORTA
var prmtDIGC = 0;
var prmtDIGP = 0;

var NVMPREE = function () {

    var plugins = function () {
        $('#cboEmpresa, #cboSucursal,#cboGrupo, #cbomarca').select2();
        $("#cbosubgrupo").select2();

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
    };

    var fillCboEmpresa = function () {
        var select = $('#cboEmpresa').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=CTLG&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $(select).empty();
                $(select).append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $(select).append('<option value="' + datos[i].CODIGO + '" data-pidm="' + datos[i].PIDM + '" ruc="' + datos[i].RUC + '">' + datos[i].DESCRIPCION + '</option>');

                    }
                }
                $(select).val($('#ctl00_hddctlg').val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
        $(select).select2();
    };

    var fillCboEstablecimiento = function (ctlg) {
        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=0&CTLG_CODE=" + ctlg,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboSucursal').empty();
                $('#cboSucursal').append('<option></option>');
                $('#cboSucursal').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboSucursal').append('<option value="' + datos[i].CODIGO + '" data-exonerado="' + datos[i].EXONERADO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboSucursal').select2('val', $('#ctl00_hddestablecimiento').val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboGrupo = function () {
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=4&CTLG_CODE=" + $.trim($('#cboEmpresa').val()) + "&OPCION2=TX&CODE_EXIS=" + $.trim($('#cboexistencia').val()),
            async: false,
            success: function (datos) {
                $('#cboGrupo').empty();
                $('#cboGrupo').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboGrupo').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboGrupo').select2('val', '');
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fillCboMarcas = function () {
        $('#cbomarca').empty().append('<option value="">TODOS</option>').select2('val', '');
        Bloquear($($("#cbomarca").parents("div")[0]).attr("id"));
        $.ajax({
            type: "POST",
            url: "vistas/nm/ajax/nmmgmar.ashx?OPCION=L&CODE=",
            async: false,
            success: function (datos) {
                Desbloquear($($("#cbomarca").parents("div")[0]).attr("id"));
                $('#cbomarca').empty();
                $('#cbomarca').append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cbomarca').append('<option value="' + datos[i].CODIGO + '">' + datos[i].MARCA + '</option>');
                    }
                }
                $('#cbomarca').select2('val', '');
            },
            error: function (msg) {
                Desbloquear($($("#cbomarca").parents("div")[0]).attr("id"));
                alertCustom("Marcas no se listaron correctamente");
            }
        });
    };

    var fillCboSubgrupos = function () {
        if ($('#cboGrupo').val() != "") {
            Bloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
            $.ajax({
                type: "POST",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=6&DEPEND_CODE=" + $.trim($('#cboGrupo').val()) + "&CTLG_CODE=" + $.trim($('#cboEmpresa').val()),
                async: true,
                success: function (datos) {
                    Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                    $('#cbosubgrupo').empty();
                    $('#cbosubgrupo').append('<option value="">TODOS</option>');
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cbosubgrupo').append('<option value="' + datos[i].Codigo + '">' + datos[i].Descripcion + '</option>');
                        }
                        $('#cbosubgrupo').removeAttr("disabled");
                    } else {
                        $('#cbosubgrupo').attr("disabled", "disabled");
                    }
                    $('#cbosubgrupo').select2('val', '');
                },
                error: function (msg) {
                    Desbloquear($($("#cbosubgrupo").parents("div")[0]).attr("id"));
                    alertCustom("Subgrupos no se listaron correctamente");
                }
            });
        } else {
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
        }
    };

    var fillcboMoneda = function () {
        $('#cboMoneda').select2('destroy');
        $('#cboMoneda2').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/nomdocc.ashx?OPCION=2",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboMoneda').empty();
                $('#cboMoneda2').empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboMoneda').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '" desc-corta="' + datos[i].DESC_CORTA + '">' + datos[i].DESCRIPCION + '</option>');
                        $('#cboMoneda2').append('<option value="' + datos[i].CODIGO + '" simbolo="' + datos[i].SIMBOLO + '" data-tipo="' + datos[i].TIPO + '" desc-corta="' + datos[i].DESC_CORTA + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                ListarValorCambio();
            },
            error: function (msg) {
                alertCustom("Datos para Monedas no se listaron correctamente.");
            }
        });
        $('#cboMoneda').select2();
        $('#cboMoneda2').select2().change();
    };

    var fillCboRango = function () {

        $("#cboRango").multiselect("destroy");
        $('#cboRango').empty();
        $('#cboRango').append('<option value="um">Mínimo</option>');
        $('#cboRango').append('<option value="un">Normal</option>');
        $('#cboRango').multiselect({
            nonSelectedText: 'Seleccione Precio',
            numberDisplayed: 2
        });
        $('.checkbox').attr("style", "padding:3px 20px 3px 30px !important");

        $(".btn-group").attr("style", "max-width:100%");
        $(".multiselect.dropdown-toggle").attr("style", "max-width:100%");
        $(".multiselect.dropdown-toggle ").css("overflow-x", "hidden");

        $(".utilidad").attr("onkeypress", "javascript:return ValidaDecimales(event,this,5)");
    };

    var eventoControles = function () {
        var fechaEmisionAnterior = "";

        $("#btnMostrarPorcentaje").on("click", function () {
            $('#divRangos').slideDown();
            $("#btnMostrarPorcentaje").css("display", "none");
            $("#btnOcultarPorcentaje").css("display", "block");
        });

        $("#btnOcultarPorcentaje").on("click", function () {
            $('#divRangos').slideUp();
            $("#btnOcultarPorcentaje").css("display", "none");
            $("#btnMostrarPorcentaje").css("display", "block");
        });

        $('#cboEmpresa').on('change', function () {
            fillCboEstablecimiento($('#cboEmpresa').val());
            $("#divTblPrecios").addClass("hide");
            //$("#divAsignarUtilidad").fadeOut();
            //$("#btnCalcularTodo").attr("style", "display:none");
            //$("#btnCalcularTodo2").attr("style", "display:none");

            fillCboGrupo();
            $('#cboGrupo').change();
        });

        $('#cboSucursal').on('change', function () {
            if ($('#cboEmpresa').val() != "" && $('#cboSucursal').val() != "") {

            }
            $("#divTblPrecios").addClass("hide");
            //$("#divAsignarUtilidad").fadeOut();
            //$("#btnCalcularTodo").attr("style", "display:none");
            //$("#btnCalcularTodo2").attr("style", "display:none");

            if ($('#cboSucursal').val() != "") {
                if ($('#cboSucursal option:selected').attr("data-exonerado") == "SI") {
                    $("#lblExonerado").html("Exonerado");
                } else {
                    $("#lblExonerado").html("");
                }
            } else {
                $("#lblExonerado").html("");
            }
        });

        $('#cboGrupo').on('change', function () {
            $('#cbosubgrupo').empty().append('<option value="">TODOS</option>').select2('val', '').attr("disabled", "disabled");
            fillCboSubgrupos();
        });

        $("#buscar").on("click", function () {
            Bloquear("ventana");
            setTimeout(function () {
                //$("#btnCalcularTodo").attr("style", "display:none;");
                //$("#btnCalcularTodo2").attr("style", "display:none;");
                $("#msgCalcular").html("Cargando precios y costos...");
                CargarTablaPrecios();
                Desbloquear("ventana")
            }, 200);
        });

        $("#info_btnf").on("click", function () {
            $("#bloqueInfo").slideToggle();
        });

        $("#btnCalcularTodo").on("click", function () {
            if ($("#msgCalcular").html() != "Calculando...") {
                $("#msgCalcular").html("Calculando...")
                msgCalcular = false;
                calcularPrecioConTabla = true;
                var btns = $(".btnCalcular");
                setTimeout(function () {
                    for (var i = 0; i < btns.length; i++) {
                        btns[i].click();
                    }
                    msgCalcular = true;
                    $("#msgCalcular").html("")
                }, 100);
            }
        });

        $("#btnCalcularTodo2").on("click", function () {
            if ($("#msgCalcular").html() != "Calculando...") {
                $("#msgCalcular").html("Calculando...")
                msgCalcular = false;
                calcularPrecioConTabla = true;
                var btns = $(".btnCalcular2");
                setTimeout(function () {
                    for (var i = 0; i < btns.length; i++) {
                        btns[i].click();
                    }
                    msgCalcular = true;
                    $("#msgCalcular").html("")
                }, 100);
            }
        });

        //UTILIDAD POR RANGOS

        //$("#btnAsignarUtilidad").on("click", function () {
        //    if ($("#rbtnCostoProm").is(":checked") || $("#rbtnUltCompra").is(":checked")) {
        //        if ($("#cboRango").val() != null) {
        //            AsignarUtilidad();
        //        } else {
        //            alertCustom("Seleccione el Tipo de Precio");
        //        }
        //    } else {
        //        if ($("#txtUtilidad").val() != "") {
        //            if (parseFloat($("#txtUtilidad").val()) >= 0) {
        //                if ($("#cboRango").val() != null) {
        //                    AsignarUtilidad();
        //                } else {
        //                    alertCustom("Seleccione el Tipo de Precio");
        //                }

        //            } else {
        //                alertCustom("Ingrese un valor mayor o igual a 0");
        //            }
        //        } else {
        //            alertCustom("Ingrese un valor en campo utilidad.");
        //        }
        //    }
        //});

        $("#btnUtilidadMinimaxRango").on("click", function () {
            if ($("#rbtnCostoProm").is(":checked") || $("#rbtnUltCompra").is(":checked")) {
                AsignarUtilidadxRangos("um");
            } else {
                alertCustom("Debe seleccionar un tipo de Costo [Costo Promedio/Última Compra].");
            }
        });

        $("#btnUtilidadNormalxRango").on("click", function () {
            if ($("#rbtnCostoProm").is(":checked") || $("#rbtnUltCompra").is(":checked")) {
                AsignarUtilidadxRangos("un");
            } else {
                alertCustom("Debe seleccionar un tipo de Costo [Costo Promedio/Última Compra].");
            }
        });

        $("#btnUtilidadMinimaxUtilidad").on("click", function () {
            if ($("#txtUtilidad").val() != "") {
                if (parseFloat($("#txtUtilidad").val()) >= 0) {
                    AsignarUtilidadxUtilidad("um");
                } else {
                    alertCustom("Ingrese un valor mayor o igual a 0");
                }
            } else {
                alertCustom("Ingrese un valor en campo utilidad.");
            }
        });

        $("#btnUtilidadNormalxUtilidad").on("click", function () {
            if ($("#txtUtilidad").val() != "") {
                if (parseFloat($("#txtUtilidad").val()) >= 0) {
                    AsignarUtilidadxUtilidad("un");
                } else {
                    alertCustom("Ingrese un valor mayor o igual a 0");
                }
            } else {
                alertCustom("Ingrese un valor en campo utilidad.");
            }
        });

        //$("#btnExplorar").on("click", function () {
        //    ListarRangosUtilidad();
        //    $("#modalPlantilla").modal("show");
        //});

        $("#cboMoneda2").on("change", function () {
            if ($(this).val() != "") {
                $(".lblMonedaRango").html("(" + $("#cboMoneda2 :selected").attr("desc-corta") + ")");
            } else {
                $(".lblMonedaRango").html("");
            }
        });

        $("#rbtnCostoProm").on("change", function () {
            if ($("#rbtnUltCompra").is(":checked") || $("#rbtnCostoProm").is(":checked")) {
                $(".utilSimple").hide();
                $(".utilRango").show();
                $("#divBotonesUtil").addClass("offset1");
            } else {
                $(".utilSimple").show();
                $(".utilRango").hide();
                $("#divBotonesUtil").removeClass("offset1");
            }
        });

        $("#rbtnUltCompra").on("change", function () {
            if ($("#rbtnUltCompra").is(":checked") || $("#rbtnCostoProm").is(":checked")) {
                $(".utilSimple").hide();
                $(".utilRango").fadeIn();
                $("#divBotonesUtil").addClass("offset1");
            } else {
                $(".utilSimple").fadeIn();
                $(".utilRango").hide();
                $("#divBotonesUtil").removeClass("offset1");
            }
        });

        //EVENTOS ENTER
        $("#txtRangoInicio").keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    $('#txtUtilidad2').focus();
                    $("#txtRangoInicio").val(formatoMiles($(this).val()));
                }
            }
        });

        $("#txtUtilidad2").keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    AgregarRango()
                    $('#txtRangoInicio').focus();
                }
            }
        });

        $("#btnAgregarRango").keyup(function (e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if ($(this).val() != "") {
                if (key === 13) {
                    $('#txtRangoInicio').focus();
                }
            }
        });

        $("#chboAvanzado").on("change", function () {
            let bValorAnterior = $("#chboAvanzado").data("valactual");
            let bValorActual = $("#chboAvanzado").is(":checked");

            if (bValorAnterior === bValorActual)
                return;

            $("#chboAvanzado").data("valactual", bValorActual);

            if (bValorActual) {
                $(".divAvanzado").show();
            } else {
                $(".divAvanzado").hide();
            }
        });

        $("#chboUtilxRango").on("change", function () {
            let bValorAnterior = $("#chboUtilxRango").data("valactual");
            let bValorActual = $("#chboUtilxRango").is(":checked");

            if (bValorAnterior === bValorActual)
                return;

            $("#chboUtilxRango").data("valactual", bValorActual);
            
            if (bValorActual) {
                $('#uniform-chboUtilDirec span').removeClass();
                $('#chboUtilDirec').attr('checked', false).change();
                $(".divUtilxRangos").show();
            } else {
                $(".divUtilxRangos").hide();
            }
        });

        $("#chboUtilDirec").on("change", function () {
            let bValorAnterior = $("#chboUtilDirec").data("valactual");
            let bValorActual = $("#chboUtilDirec").is(":checked");

            if (bValorAnterior === bValorActual)
                return;

            $("#chboUtilDirec").data("valactual", bValorActual);

            if (bValorActual) {
                $('#uniform-chboUtilxRango span').removeClass();
                $('#chboUtilxRango').attr('checked', false).change();

                $(".divUtilDirectas").show();
            } else {
                $(".divUtilDirectas").hide();
            }
        });

        $("#rbnMoba").on("change", function () {
            let bValorActual = $("#rbnMoba").is(":checked");
            if (bValorActual) {
                $("#buscar").click();
            }
        });

        $("#rbnMoal").on("change", function () {
            let bValorActual = $("#rbnMoal").is(":checked");
            if (bValorActual) {
                $("#buscar").click();
            }
        });

        $("#rbnProd").on("change", function () {
            let bValorActual = $("#rbnProd").is(":checked");
            if (bValorActual) {
                $("#buscar").click();
            }
        });

        $("#rbtnEstandar").on("change", function () {
            let bValorActual = $("#rbtnEstandar").is(":checked");
            if (bValorActual) {
                $("#buscar").click();
            }
        });

        $("#rbtnCantidad").on("change", function () {
            let bValorActual = $("#rbtnCantidad").is(":checked");
            if (bValorActual) {
                $("#buscar").click();
            }
        });

        $("#rbtnTodos").on("change", function () {
            let bValorActual = $("#rbtnTodos").is(":checked");
            if (bValorActual) {
                $("#buscar").click();
            }
        });
    };
    
    var eventoPrecios = function () {
        $(".prec").live("keyup", function () {
            if ($.trim(parseFloat($(this).val())) == "") {
                $(this).attr("title", "");
            } else {
                $(this).attr("title", formatoMiles($(this).val()));
            }
        }).live("paste", function () {
            return false;
        });

        $(".util").live("paste", function () {
            return false;
        });

        $(".prec").live("focus", function () {
            anterior = $(this).val();

            $(this).css("border-color", "#ccc");
            if ($.trim(parseFloat($(this).val())) == "") {
                $(this).attr("title", "");
            } else {
                $(this).attr("title", formatoMiles($(this).val()));
            }
        });

        $(".util").live("focus", function () {
            $(this).css("border-color", "#ccc");
            if ($.trim(parseFloat($(this).val())) == "") {
                $(this).attr("title", "");
            } else {
                $(this).attr("title", formatoMiles($(this).val()));
            }
        });

        $(".prec").live("blur", function () {
            var id = $(this).attr("id");//pn  
            //DPORTA
            var cadena = id.substring(0, 2);

            if (cadena == "pn") {
                var id2 = id.replace("p", "u");//un
                var id3 = id.replace("n", "m");//pm
                var id4 = id2.replace("n", "m");//um
            } else {
                var id2 = id.replace("p", "u");//un
                var id3 = id.replace("m", "n");//pm
                var id4 = id2.replace("m", "n");//um
            }
            
            if ($(this).val() != anterior
                || $(".util[id='" + id2 + "']").val() != $(this).attr("data-un")
                || $(".prec[id='" + id3 + "']").val() != $(this).attr("data-pm")
                || $(".util[id='" + id4 + "']").val() != $(this).attr("data-um")) {

                if ($.trim($(this).val()) != "") {
                    $(".prec[id='" + id + "']").css("border-color", "blue");
                    $(".util[id='" + id2 + "']").css("border-color", "blue");
                    $(".prec[id='" + id3 + "']").css("border-color", "blue");
                    $(".util[id='" + id4 + "']").css("border-color", "blue");
                    opProcesando++;

                    $("select[name='tblPrecios_length']").attr("disabled", "disabled");
                    $("#tblPrecios_filter input").attr("disabled", "disabled");

                    $(".paginate_button").parent().attr("id", "ss")
                    Bloquear($(".paginate_button").parent().attr("id"))

                    if ($("#tblPrecios_filter input").val() == "") {
                        $("#tblPrecios_filter input").val("Esperando precios...");
                    }
                    if ($(this).parent().parent().hasClass("registrado")) {
                        ActualizarPrecio($(this), "A");
                    } else {
                        ActualizarPrecio($(this), "G");
                    }
                } else if (anterior != "") {
                    if (soloCalcular) {
                        soloCalcular = false;
                    }
                    else {
                        $(".util[id='" + id2 + "']").val($(this).attr("data-un"));
                        $(".prec[id='" + id3 + "']").val($(this).attr("data-pm"));
                        $(".util[id='" + id4 + "']").val($(this).attr("data-um"));
                        $(this).val(anterior);
                        infoCustom2("Ingrese almenos 1 valor para actualizar.");
                    }
                }
            }
        });
    };

    var cargaInicial = function () {
        var cod = ObtenerQueryString("codigo");

        $(".divAvanzado").hide();
        $(".divUtilxRangos").hide();
        $(".divUtilDirectas").hide();

        ListarRangosUtilidad();
    };

    return {
        init: function () {
            //DPORTA
            cargarParametrosSistema();
            plugins();
            fillCboEmpresa();
            fillCboEstablecimiento($("#cboEmpresa").val());
            fillCboGrupo();
            fillCboMarcas();
            fillcboMoneda();
            $('#divRangos').slideUp();
            fillCboRango();
            eventoControles();
            $('#cboSucursal').change();
            eventoPrecios();
            crearTablaVacia();
            cargaInicial();
        }
    };
}();


//DPORTA
function cargarParametrosSistema() {
    //OBTENER CANTIDAD DIGITOS EN LA PARTE DECIMAL (COSTO)
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DIGC",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                prmtDIGC = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro DIGC!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro DIGC!");
        }
    });

    //OBTENER CANTIDAD DIGITOS EN LA PARTE DECIMAL (PRECIO)
    $.ajax({
        type: "post",
        url: "vistas/no/ajax/nomdocc.ashx?OPCION=3&CODE_PARAMETRO=DIGP",
        contenttype: "application/json;",
        datatype: "json",
        async: true,
        success: function (datos) {
            if (datos != null) {
                prmtDIGP = datos[0].VALOR;
            }
            else { alertCustom("No se recuperó correctamente el parámetro DIGP!"); }
        },
        error: function (msg) {
            alertCustom("No se recuperó correctamente el parámetro DIGP!");
        }
    });
}

var ListarRangosUtilidad = function () {
    Bloquear("platillaOpciones");
    var data = new FormData();
    data.append("p_CODE", "")
    data.append("CTLG", $("#cboEmpresa").val())
    data.append("SCSL", $("#cboSucursal").val())
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmprec.ashx?OPCION=9",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("platillaOpciones")
        if (typeof $("#tblRangosUtilidad_wrapper").html() != undefined) {
            $("#tblRangosUtilidad").dataTable().fnDestroy();
        }

        $("#tblRangosUtilidad tbody tr").remove();
        if (datos != null) {
            for (var i = 0; i < datos.length; i++) {
                var tr = "";
                tr += "<tr>"
                tr += "<td class='center'>" + datos[i].FECHA_ACTV + "</td>";
                tr += "<td>" + datos[i].DESCRIPCION + "</td>";
                tr += "<td class='center'><a style='margin-left:5px;' title='Seleccionar' class='btn blue' href=\"javascript:SeleccionarRangoUtilidad('" + datos[i].CODIGO + "','" + datos[i].DESCRIPCION + "','" + datos[i].MONE_CODE + "');\"><i class=icon-check></i></a><a style='margin-left:5px;' title='Eliminar' class='btn red' href=\"javascript:EliminarRangoUtilidad('" + datos[i].CODIGO + "');\"><i class=icon-trash></i></a></td>"
                tr += "</tr>"
                $("#tblRangosUtilidad tbody").append(tr);
            }
        }

        $("#tblRangosUtilidad").dataTable({
            "oLanguage": {
                "sEmptyTable": "No hay datos disponibles en la tabla.",
                "sZeroRecords": "No hay datos disponibles en la tabla."
            }
        });
        $("#tblRangosUtilidad_filter").find("input").addClass("span6");

    }).error(function () {
        Desbloquear("platillaOpciones")
        noexito();
    });
};

var crearTablaVacia = function () {
    let v_TipoCambio = $("#txtTipoCambio").val();
    
    var parms = {
        data: null,
        columns: [
            {
                data: "CODIGO_ANTIGUO", createdCell: function (td, cellData, rowData, row, col) {
                    $(td)
                        .addClass("hover")
                        .attr("title", "Doble clic para ver Producto")
                        .attr("ondblclick", "IrAProducto('" + rowData.CODIGO + "')");
                    var registradoInd = "";
                    if (!(rowData.UTILIDAD_MINIMO == "" && rowData.PRECIO_MINIMO == "" && rowData.UTILIDAD_VENTA == "" && rowData.PRECIO_VENTA == "")) {
                        registradoInd = "registrado";
                    }
                    $($(td).parents("tr")[0])
                        .attr("id", "f_" + rowData.CODIGO)
                        .addClass(registradoInd);
                }
            },
            {
                data: "DESC_ADM", createdCell: function (td, cellData, rowData, row, col) {
                    $(td)
                        .addClass("hover")
                        .attr("title", "Doble clic para ver Producto")
                        .attr("ondblclick", "IrAProducto('" + rowData.CODIGO + "')");
                }
            },
            {
                data: "MONEDA_DESC_CORTA", createdCell: function (td, cellData, rowData, row, col) {
                    $(td)
                        .addClass("hover")
                        .addClass("center")
                        .attr("title", "Doble clic para ver Producto")
                        .attr("ondblclick", "IrAProducto('" + rowData.CODIGO + "')")
                        .attr("data-mone", rowData.MONEDA)
                        .attr("data-costo", rowData.COSTO)
                        .attr("data-costoultcompra", rowData.VALOR_ULTIMA_COMPRA);
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {
                    let val0r = "";
                    let val0r2 = "";
                    let sCodMonedaProd = rowData.MONEDA;
                    let sMoneda = rowData.MONEDA_SIMBOLO;
                    switch ($("input[name='rbnValorizado']:checked").val()) {
                        case "MOBA": val0r = rowData.COSTO_MOBA; sMoneda = "S/"; break;
                        case "MOAL": val0r = parseFloat(rowData.COSTO_MOBA / v_TipoCambio).toFixed(prmtDIGC); sMoneda = "$"; break;//rowData.COSTO_MOAL; break;
                        case "PROD": val0r = rowData.COSTO; break;
                    }

                    switch (sCodMonedaProd) {
                        case "0002": val0r2 = rowData.COSTO_MOBA; break;
                        case "0003": val0r2 = parseFloat(rowData.COSTO_MOBA / v_TipoCambio).toFixed(prmtDIGC); break;
                    }

                    $(td)
                        .html(sMoneda + " " + val0r)
                        .addClass("center")
                        .attr("id", "c_" + rowData.CODIGO)
                        .attr("data-valor", val0r2);
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {
                    var val0r = "";
                    let val0r2 = "";
                    let sCodMonedaProd = rowData.MONEDA;
                    let sMoneda = rowData.MONEDA_SIMBOLO;
                    switch ($("input[name='rbnValorizado']:checked").val()) {
                        case "MOBA": val0r = rowData.VALOR_ULTIMA_COMPRA_MOBA; sMoneda = "S/."; break;
                        case "MOAL": val0r = parseFloat(rowData.VALOR_ULTIMA_COMPRA_MOBA / v_TipoCambio).toFixed(prmtDIGC); sMoneda = "$";break;//rowData.VALOR_ULTIMA_COMPRA_MOAL; break;
                        case "PROD": val0r = rowData.VALOR_ULTIMA_COMPRA; break;
                    }
                    switch (sCodMonedaProd) {
                        case "0002": val0r2 = rowData.VALOR_ULTIMA_COMPRA_MOBA; break;
                        case "0003": val0r2 = parseFloat(rowData.VALOR_ULTIMA_COMPRA_MOBA / v_TipoCambio).toFixed(prmtDIGC); break;
                    }
                    $(td)
                        .html(sMoneda + " " + val0r)
                        .addClass("center")
                        .attr("id", "pc_" + rowData.CODIGO)
                        .attr("data-valor", val0r2);
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {
                    var strPrecios;
                    if (rowData.PRECIO_IND == "C") {
                        strPrecios = "CANTIDAD"
                    } else {
                        strPrecios = "ESTANDAR"
                    }
                    $(td)
                        .html(strPrecios)
                        .addClass("dn")
                        .attr("id", "tp_" + rowData.CODIGO);
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td)
                        .html("<input type='text' class='util' value='" + rowData.UTILIDAD_MINIMO + "' id='um_" + rowData.CODIGO + "_" + rowData.MONEDA + "_" + rowData.ALMACEN + "_" + rowData.UNIDAD + "'/>")
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td)
                        .html("<input type='text' class='prec' value='" + rowData.PRECIO_MINIMO + "' id='pm_" + rowData.CODIGO + "_" + rowData.MONEDA + "_" + rowData.ALMACEN + "_" + rowData.UNIDAD + "'/>");
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td)
                        .html("<input type='text' class='util' value='" + rowData.UTILIDAD_VENTA + "' id='un_" + rowData.CODIGO + "_" + rowData.MONEDA + "_" + rowData.ALMACEN + "_" + rowData.UNIDAD + "'/>")
                        .addClass("colorColumna");
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td)
                        .html("<input type='text' class='prec prec2' value='" + rowData.PRECIO_VENTA + "' id='pn_" + rowData.CODIGO + "_" + rowData.MONEDA + "_" + rowData.ALMACEN + "_" + rowData.UNIDAD + "' data-um='" + rowData.UTILIDAD_MINIMO + "' data-pm='" + rowData.PRECIO_MINIMO + "' data-un='" + rowData.UTILIDAD_VENTA + "'/>")
                        .addClass("colorColumna");
                }
            },
            {
                data: null,
                createdCell: function (td, cellData, rowData, row, col) {

                    var html = "<div id='divBtn_" + rowData.CODIGO + "'>" +
                        "<a onclick=\"CalcularPreciosEstandar('" + rowData.CODIGO + "','" + rowData.MONEDA + "')\" class='btn green btnCalcular' title='Calcular precio basado en Costo Promedio' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>" +
                        "<a onclick=\"CalcularPreciosEstandar2('" + rowData.CODIGO + "','" + rowData.MONEDA + "')\" class='btn red btnCalcular2' title='Calcular precio basado en Precio Compra' style='margin:0px 2px 2px 0px;'><i class='fa fa-gears'></i></a>" +
                        "<a id='btnCambiarIndicadorPrecio_{0}' onclick=\"CambiarIndicadorPrecio('" + rowData.CODIGO + "','" + rowData.PRECIO_IND + "',this)\" class='btn blue btnCambiarIndicadorPrecio' title='Cambiar indicador de precio de producto'  style='margin:0px 2px 2px 0px;'><i class='fa fa-random'></i></a>" +
                        "</div>";

                    $(td)
                        .html(html)
                        .addClass("dn center")
                        .css({ "min-width": "85px !important" });
                },
                width: "135px"
            }
        ],
        stateSave: false,

        "iDisplayLength": 10,
        "lengthMenu": [[10, 25, 50, 100, 500, 1000, -1], [10, 25, 50, 100, 500, 1000, "Todo"]],
        //"oLanguage": {
        //    "sEmptyTable": "No hay datos disponibles en la tabla.",
        //    "sZeroRecords": "No hay datos disponibles en la tabla."
        //},
        "sDom": 'TC<"clear">lfrtip',
        //  "sPaginationType": "full_numbers",
        "oTableTools": {
            "sSwfPath": "recursos/plugins/swf/copy_csv_xls_pdf.swf",
            "aButtons": [
                {
                    "sExtends": "copy",
                    "sButtonText": "Copiar"
                },
                {
                    "sExtends": "pdf",
                    "sPdfOrientation": "landscape",
                    "sButtonText": "Exportar a PDF"
                },
                {
                    "sExtends": "xls",
                    "sButtonText": "Exportar a Excel"
                }
            ]
        },
        "order": [1, 'asc']
    }


    oTable = iniciaTabla('tblPrecios', parms);
    $(".ColVis.TableTools").remove();
};

var CargarTablaPrecios = function () {
    let continuar = true;
    opProcesando = 0;
    if ($("#cboSucursal").val() == "") {
        if ($("#cboEmpresa").val() == $("#ctl00_hddctlg").val()) {
            sucursal = $('#ctl00_hddestablecimiento').val();
        }
        else {
            sucursal = $($("#cboSucursal option")[2]).val();
            if (sucursal == undefined) {
                alertCustom("No existen establecimientos para realizar la operación")
                continuar = false;
            }
        }
    } else {
        sucursal = $("#cboSucursal").val();
    }

    let simboloMoneda = "";
    if ($("input[name='rbnValorizado']:checked").val() == "MOBA") {
        moneValorizado = "MOBA";
        simboloMoneda = "(" + $("#cboMoneda option[data-tipo='MOBA']").attr("desc-corta") + ")";
    } else if ($("input[name='rbnValorizado']:checked").val() == "MOAL") {
        moneValorizado = "MOAL";
        simboloMoneda = "(" + $("#cboMoneda option[data-tipo='MOAL']").attr("desc-corta") + ")";
    } else {//moneValorizado == "PROD"       
        moneValorizado = "PROD";
    }

    let costoInd = ($("#chkCostos").is(":checked")) ? "S" : "N";

    let p_PROD_SIN_STOCK_IND = ($("#chkPrecioSinStock").is(":checked")) ? "S" : "N";

    if (continuar) {

        let sTipoPrecio = "";
        if ($("#rbtnEstandar").is(":checked"))
            sTipoPrecio = "E";
        else if ($("#rbtnCantidad").is(":checked"))
            sTipoPrecio = "C";
       
        $.ajax({
            type: "POST",
            url: "vistas/nv/ajax/nvmpree.ashx?OPCION=1&CTLG=" + $.trim($('#cboEmpresa').val()) +
            "&SCSL=" + sucursal +
            "&GRUP_CODE=" + $('#cboGrupo').val() +
            "&SUBGRUP_CODE=" + $('#cbosubgrupo').val() +
            "&PRECIO_FILTRO=" + sTipoPrecio +
            "&VALORIZADO_IND=" + moneValorizado +
            "&SIMBOLO_MONEDA=" + simboloMoneda +
            "&p_COSTO_IND=" + costoInd +
            "&p_PROD_SIN_STOCK_IND=" + p_PROD_SIN_STOCK_IND +
            "&p_MARC_CODE=" + $('#cbomarca').val(),
            async: true,
            contentType: "application/json;",
            dataType: "json",
            beforeSend: function () { Bloquear("divTblPrecios"); },
            success: function (datos) {
                oTable.fnClearTable();
                if (!isEmpty(datos)) {
                    oTable.fnAddData(datos);

                    //$("#divTblPrecios").html(datos);

                    $(".prec").attr("onkeypress", "javascript:return ValidaDecimales(event,this,5)");
                    $(".util").attr("onkeypress", "javascript:return ValidaDecimales(event,this,5)");

                    var valorizado = "";
                    if (moneValorizado == "MOAL") {
                        valorizado = $.trim($("#rbnMoal").parent().parent().parent().text());
                    } else if (moneValorizado == "MOBA") {
                        valorizado = $.trim($("#rbnMoba").parent().parent().parent().text());
                    } else {//moneValorizado == "PROD"
                        valorizado = " Moneda de Producto";
                    }

                    $("#divTblPrecios").removeClass("hide");

                    if ($("#divTblPrecios H4").length == 0)
                        $("#tblPrecios_wrapper").prepend("<h4>Costeo Según " + valorizado + "</h4>");
                    else
                        $($("#divTblPrecios H4")[0]).text("Costeo Según " + valorizado);


                    $.trim($("#rbnMoal").parent().parent().parent().text())

                    $("#tblPrecios").css("width", "auto");
                    oTable.fnAdjustColumnSizing();
                }

                if (oTable.fnGetData().length <= 0) {
                    infoCustom2("Lista de Precios Aún no se ha creado");
                    opProcesando = 0;
                }
                HabilitarBuscador();
            },
            complete: function () { Desbloquear("divTblPrecios"); },
            error: function (msg) {
                Desbloquear("divTblPrecios");
                alertCustom("No se pudo obtener correctamente los precios de productos.");
            }
        });
    }
};

var HabilitarBuscador = function () {
    if (opProcesando == 0) {
        $("select[name='tblPrecios_length']").removeAttr("disabled");
        $("#tblPrecios_filter input").removeAttr("disabled");
        $("#tblPrecios_filter input").val("");
    } else {
        $("#tblPrecios_filter input").val("Esperando precios...");
    }
    if ($(".dataTables_empty").html() == undefined) {
        //$("#btnCalcularTodo").removeAttr("style");
        //$("#btnCalcularTodo2").removeAttr("style");
        //$("#divAsignarUtilidad").fadeIn();

        Desbloquear($(".paginate_button").parent().attr("id"))
    }
    $("#msgCalcular").html("");
};

var ActualizarPrecio = function (input, grabarActualizar) {
    let id = $(input).attr("id");//pn
    let dt = id.split("_");//COD/MON/ALM/UNIDAD
    //DPORTA
    let id0 = dt[0];

    if (id0 == "pn") {
        var id2 = id.replace("p", "u");//un
        var id3 = id.replace("n", "m");//pm
        var id4 = id2.replace("n", "m");//um
    } else {
        var id2 = id.replace("p", "u");//un
        var id3 = id.replace("m", "n");//pm
        var id4 = id2.replace("m", "n");//um
    }
    

    if (vErrors(['cboEmpresa'])) {
        let data = new FormData();
        data.append('CTLG', $("#cboEmpresa").val());
        if ($("#cboSucursal").val() != "") {
            //Grabar para una sucursal en específico
            if (grabarActualizar == "G") {
                //Grabar para una sucursal en específico
                data.append('OPCION', "2");
            } else {
                //Actualiza para una sucursal en específico
                data.append('OPCION', "3");
            }
        }
        else {
            //Grabar o Actualiza  para todas las sucursales
            data.append('OPCION', "4");
        }

        data.append('PROD_CODE', dt[1]);
        data.append('MONE_CODE', dt[2]);
        data.append('ALMC_CODE', dt[3]);
        data.append('UNME_CODE', dt[4]);
        data.append('PLAN_CODE', '');
        //data.append('PRECIO_VENTA', ($.trim($(input).val()) == "") ? "0.00" : $(input).val());
        if (id0 == "pn") {
            data.append('PRECIO_VENTA', ($.trim($(".prec[id='" + id + "']").val()) == "") ? "0.00" : $(".prec[id='" + id + "']").val());
            data.append('UTILIDAD_VENTA', ($.trim($(".util[id='" + id2 + "']").val()) == "") ? "0.00" : $(".util[id='" + id2 + "']").val());
        } else {
            data.append('PRECIO_VENTA', ($.trim($(".prec[id='" + id3 + "']").val()) == "") ? "0.00" : $(".prec[id='" + id3 + "']").val());
            data.append('UTILIDAD_VENTA', ($.trim($(".util[id='" + id4 + "']").val()) == "") ? "0.00" : $(".util[id='" + id4 + "']").val());
        }
        let PRECIO_MINIMO;
        let UTILIDAD_NORMAL;
        let UTILIDAD_MIN;
        if (id0 == "pn") {
            if ($.trim($(".prec[id='" + id3 + "']").val()) == "") {
                PRECIO_MINIMO = $(input).val();
            } else {
                if (parseFloat($.trim($(".prec[id='" + id3 + "']").val())) > parseFloat($(input).val())) {
                    PRECIO_MINIMO = $(input).val();
                    $(".prec[id='" + id3 + "']").val(PRECIO_MINIMO);

                    if (UTILIDAD_NORMAL !== "" && UTILIDAD_MIN !== "") {
                        UTILIDAD_MIN = parseFloat($("#" + id4).val());
                        UTILIDAD_NORMAL = parseFloat($("#" + id2).val());
                        if (UTILIDAD_MIN > UTILIDAD_NORMAL) {
                            $("#" + id4).val(UTILIDAD_NORMAL);
                        }
                    }


                    infoCustom2("Precio mínimo no puede ser mayor a precio normal. Se igualó precio mínimo a precio normal.<br/>Producto:" +
                        $($(".prec[id='" + id3 + "']").parent().parent().children("td")[0]).html())
                }
                else {
                    PRECIO_MINIMO = $.trim($(".prec[id='" + id3 + "']").val())
                }
            }
        } else {
            if ($.trim($(".prec[id='" + id3 + "']").val()) == "") {
                PRECIO_MINIMO = $(input).val();
            } else {
                if (parseFloat($.trim($(".prec[id='" + id3 + "']").val())) < parseFloat($(input).val())) {
                    PRECIO_MINIMO = $(input).val();
                    $(".prec[id='" + id3 + "']").val(PRECIO_MINIMO);

                    if (UTILIDAD_NORMAL !== "" && UTILIDAD_MIN !== "") {
                        UTILIDAD_MIN = parseFloat($("#" + id2).val());
                        UTILIDAD_NORMAL = parseFloat($("#" + id4).val());
                        if (UTILIDAD_MIN > UTILIDAD_NORMAL) {
                            $("#" + id4).val(UTILIDAD_NORMAL);
                        }
                    }


                    infoCustom2("Precio mínimo no puede ser mayor a precio normal. Se igualó precio mínimo a precio normal.<br/>Producto:" +
                        $($(".prec[id='" + id3 + "']").parent().parent().children("td")[0]).html())
                }
                else {
                    PRECIO_MINIMO = $.trim($(".prec[id='" + id + "']").val())
                }
            }
        }
        
        data.append('PRECIO_MINIMO', PRECIO_MINIMO);

        if (id0 == "pn") {
            data.append('UTILIDAD_MINIMO', ($.trim($(".util[id='" + id4 + "']").val()) == "") ? "0.00" : $(".util[id='" + id4 + "']").val());
        } else {
            data.append('UTILIDAD_MINIMO', ($.trim($(".util[id='" + id2 + "']").val()) == "") ? "0.00" : $(".util[id='" + id2 + "']").val());
        }
        data.append('USUA_ID', $('#ctl00_lblusuario').text());

        var jqxhr = $.ajax({
            type: "POST",
            url: "vistas/NV/ajax/NVMPREE.ASHX",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            async: true
        })
            .success(function (res) {

                if (!isEmpty(res)) {
                    //DPORTA
                    var resp = res;
                    var arr = resp.split("-");
                    var arr1 = arr[0];
                    var arr2 = arr[1];
                    var DIGP = parseInt(arr2);

                    if (arr1 == "OK") {
                        if (grabarActualizar == "G") {
                            $(input).parent().parent().addClass("registrado")
                        }

                        //Precio normal
                        if ($.trim($(".prec[id='" + id + "']").val()) != "") {
                            $(".prec[id='" + id + "']").css("border-color", "green").removeAttr("readonly");
                            var valor = parseFloat($(".prec[id='" + id + "']").val());
                            $(".prec[id='" + id + "']").val(valor.toFixed(DIGP));
                        }
                        //Utilidad precio normal
                        $(".util[id='" + id2 + "']").css("border-color", "green").removeAttr("readonly");
                        if ($.trim($(".util[id='" + id2 + "']").val()) == "") {
                            $(".util[id='" + id2 + "']").val("0.00");
                            $(input).attr("data-un", "0.00")
                        } else {
                            var valor = parseFloat($(".util[id='" + id2 + "']").val());
                            $(".util[id='" + id2 + "']").val(valor.toFixed(DIGP));
                            $(input).attr("data-un", valor.toFixed(DIGP))
                        }
                        //Precio minimo
                        $(".prec[id='" + id3 + "']").css("border-color", "green").removeAttr("readonly");
                        if ($.trim($(".prec[id='" + id3 + "']").val()) != "") {
                            var valor = parseFloat($(".prec[id='" + id3 + "']").val());
                            $(".prec[id='" + id3 + "']").val(valor.toFixed(DIGP));
                            $(input).attr("data-pm", valor.toFixed(DIGP))
                        } else {
                            var valor = parseFloat($(".prec[id='" + id + "']").val());
                            $(".prec[id='" + id3 + "']").val(valor.toFixed(DIGP));
                            $(input).attr("data-pm", valor.toFixed(DIGP))
                        }
                        //Utilidad precio minimo
                        $(".util[id='" + id4 + "']").css("border-color", "green").removeAttr("readonly");
                        if ($.trim($(".util[id='" + id4 + "']").val()) == "") {
                            $(".util[id='" + id4 + "']").val("0.00");
                            $(input).attr("data-um", "0.00")
                        } else {
                            var valor = parseFloat($(".util[id='" + id4 + "']").val());
                            $(".util[id='" + id4 + "']").val(valor.toFixed(DIGP));
                            $(input).attr("data-um", valor.toFixed(DIGP))
                        }

                    } else if (res == "ALMC") {
                        alertCustom('No se encontró Almacén!!!');
                        $(".prec[id='" + id + "']").css("border-color", "red").removeAttr("readonly");
                        $(".util[id='" + id2 + "']").css("border-color", "red").removeAttr("readonly");
                        $(".prec[id='" + id3 + "']").css("border-color", "red").removeAttr("readonly");
                        $(".util[id='" + id4 + "']").css("border-color", "red").removeAttr("readonly");
                    } else if (res == "EXISTE") {
                        exito();
                        $(".prec[id='" + id + "']").css("border-color", "green").removeAttr("readonly");
                        $(".util[id='" + id2 + "']").css("border-color", "green").removeAttr("readonly");
                        $(".prec[id='" + id3 + "']").css("border-color", "green").removeAttr("readonly");
                        $(".util[id='" + id4 + "']").css("border-color", "green").removeAttr("readonly");
                    } else {
                        alertCustom('El precio no se actualizó correctamente!!!');
                        $(".prec[id='" + id + "']").css("border-color", "red").removeAttr("readonly");
                        $(".util[id='" + id2 + "']").css("border-color", "red").removeAttr("readonly");
                        $(".prec[id='" + id3 + "']").css("border-color", "red").removeAttr("readonly");
                        $(".util[id='" + id4 + "']").css("border-color", "red").removeAttr("readonly");
                    }
                } else {
                    noexito();
                }
                opProcesando--;
                if (opProcesando == 0) {
                    HabilitarBuscador();
                }
            })
            .error(function () {
                opProcesando--; HabilitarBuscador();
            });
    }
};

//Basado en costo promedio
var CalcularPreciosEstandar = function (cod, mone) {
    anterior = "";
    var f = "f_" + cod;
    var idCosto;
    $("#hfNeto").val("0");

    calcularPrecioConTabla = true;//Si se desea consultar desde BD, el el boton por fila, entonces borrar esta linea 
    if (calcularPrecioConTabla) {
        idCosto = "c_" + cod;
        if ($("#" + idCosto + "").html() == "" || $("#" + idCosto + "").html() == "Obteniendo...") {
            $("#hfNeto").val("0");
        }
        else {
            $("#hfNeto").val($("#" + idCosto + "").data("valor"));

        }
    }
    else {
        CargarCostosProducto(cod, mone);
    }

    if (parseFloat($("#hfNeto").val()) != 0) {
        //Id moneda base:
        var moba = $("#cboMoneda option[data-tipo='MOBA']").val()
        //Id moneda base:
        var moal = $("#cboMoneda option[data-tipo='MOAL']").val()

        var utils = $("#" + f + " .util")
        var idUtil, idPrec;
        var precioNormal, preciodMinimo = 0;
        var nCostoMonedaOrigen = 0;
        //Precio mínimo
        idUtil = $(utils[0]).attr("id");
        idPrec = idUtil.replace("u", "p");
        //Precio Normal
        idUtil2 = idUtil.replace("m", "n")
        idPrec2 = idPrec.replace("m", "n")

        //Id moneda de producto
        moneProd = $($("input[id='" + idPrec + "']").parent().parent().children()[2]).data("mone");
        nCostoMonedaOrigen = $($("input[id='" + idPrec + "']").parent().parent().children()[2]).data("costo");
        
        //console.log($($("input[id='" + idPrec + "']").parent().parent().children()[2]).data("costoultcompra"));

        if ($.trim($("input[id='" + idUtil + "']").val()) != "") {
            preciodMinimo = parseFloat(nCostoMonedaOrigen) + parseFloat(nCostoMonedaOrigen) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100);            

            //preciodMinimo = parseFloat($("#hfNeto").val()) + parseFloat($("#hfNeto").val()) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100);
            ////--------
            //if (moneProd == moba) {//EL PRECIO DE PRODUCTO SE GUARDARÁ EN MONEDA BASE
            //    //// Usar tipo de cambio si moneda de producto no coincide
            //    //if (moneValorizado == "MOAL") {
            //    //    var valorCalculo = parseFloat($("#hfNeto").val()) * parseFloat(tipoCambio);
            //    //    preciodMinimo = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100)
            //    //}
            //} else if (moneProd == moal) {//EL PRECIO DEL PRODUCTO SE GUARDARÁ EN MONEDA ALTERNA
            //    // Usar tipo de cambio si moneda de producto no coincide
            //    if (moneValorizado == "MOBA") {
            //        var valorCalculo = parseFloat($("#hfNeto").val()) / parseFloat(tipoCambio);
            //        preciodMinimo = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100);
            //    }
            //} else {
            //    //Monedas de la empresa no coinciden con las del producto. Posible error al listar monedas
            //}
            //--------
            $("input[id='" + idPrec + "']").val(preciodMinimo.toFixed(prmtDIGP));
        }

        if ($.trim($("input[id='" + idUtil2 + "']").val()) != "") {
            precioNormal = parseFloat(nCostoMonedaOrigen) + parseFloat(nCostoMonedaOrigen) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100);


            //precioNormal = parseFloat($("#hfNeto").val()) + parseFloat($("#hfNeto").val()) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100);
            ////--------
            //if (moneProd == moba) {//EL PRECIO DE PRODUCTO SE GUARDARÁ EN MONEDA BASE
            //    //// Usar tipo de cambio si moneda de producto no coincide
            //    //if (moneValorizado == "MOAL") {
            //    //    var valorCalculo = parseFloat($("#hfNeto").val()) * parseFloat(tipoCambio);
            //    //    precioNormal = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100)
            //    //}
            //} else if (moneProd == moal) {//EL PRECIO DEL PRODUCTO SE GUARDARÁ EN MONEDA ALTERNA
            //    // Usar tipo de cambio si moneda de producto no coincide
            //    if (moneValorizado == "MOBA") {
            //        var valorCalculo = parseFloat($("#hfNeto").val()) / parseFloat(tipoCambio);
            //        precioNormal = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100)
            //    }
            //} else {
            //    //Monedas de la empresa no coinciden con las del producto. Posible error al listar monedas
            //}
            //--------
            $("input[id='" + idPrec2 + "']").val(precioNormal.toFixed(prmtDIGP));
        }
        soloCalcular = true;
        $("input[id='" + idPrec2 + "']").blur();

    } else {
        if (msgCalcular) {
            infoCustom2("El cálculo no se realizó ya que el Costo Promedio encontrado fue 0.");
        }
    }
};

//Basado en ultimo precio compra
var CalcularPreciosEstandar2 = function (cod, mone) {
    anterior = "";
    var f = "f_" + cod;
    var idCosto;
    $("#hfUltimaCompra").val("0");

    calcularPrecioConTabla = true;//Si se desea consultar desde BD, el el boton por fila, entonces borrar esta linea 
    if (calcularPrecioConTabla) {
        idCosto = "pc_" + cod;
        if ($("#" + idCosto + "").html() == "" || $("#" + idCosto + "").html() == "Obteniendo...") {
            $("#hfUltimaCompra").val("0");
        }
        else {
            $("#hfUltimaCompra").val($("#" + idCosto + "").data("valor"));
        }
    }
    else {
        CargarCostosProducto(cod, mone);
    }

    if (parseFloat($("#hfUltimaCompra").val()) != 0) {
        //Id moneda base:
        var moba = $("#cboMoneda option[data-tipo='MOBA']").val()
        //Id moneda base:
        var moal = $("#cboMoneda option[data-tipo='MOAL']").val()

        var utils = $("#" + f + " .util")
        var idUtil, idPrec;
        var precioNormal, preciodMinimo = 0;
        var nCostoMonedaOrigen = 0;
        //Precio mínimo
        idUtil = $(utils[0]).attr("id");
        idPrec = idUtil.replace("u", "p");
        //Precio Normal
        idUtil2 = idUtil.replace("m", "n")
        idPrec2 = idPrec.replace("m", "n")

        //Id moneda de producto
        moneProd = $($("input[id='" + idPrec + "']").parent().parent().children()[2]).data("mone");
        nCostoMonedaOrigen = $($("input[id='" + idPrec + "']").parent().parent().children()[2]).data("costoultcompra");

        if ($.trim($("input[id='" + idUtil + "']").val()) != "") {
            preciodMinimo = parseFloat(nCostoMonedaOrigen) + parseFloat(nCostoMonedaOrigen) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100);  


            //preciodMinimo = parseFloat($("#hfUltimaCompra").val()) + parseFloat($("#hfUltimaCompra").val()) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100)
            ////--------
            //if (moneProd == moba) {//EL PRECIO DE PRODUCTO SE GUARDARÁ EN MONEDA BASE
            //    //// Usar tipo de cambio si moneda de producto no coincide
            //    //if (moneValorizado == "MOAL") {
            //    //    var valorCalculo = parseFloat($("#hfUltimaCompra").val()) * parseFloat(tipoCambio);
            //    //    preciodMinimo = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100)
            //    //}
            //} else if (moneProd == moal) {//EL PRECIO DEL PRODUCTO SE GUARDARÁ EN MONEDA ALTERNA
            //    // Usar tipo de cambio si moneda de producto no coincide
            //    if (moneValorizado == "MOBA") {
            //        var valorCalculo = parseFloat($("#hfUltimaCompra").val()) / parseFloat(tipoCambio);
            //        preciodMinimo = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil + "']").val()) / 100)
            //    }
            //} else {
            //    //Monedas de la empresa no coinciden con las del producto. Posible error al listar monedas
            //}
            //--------
            $("input[id='" + idPrec + "']").val(preciodMinimo.toFixed(prmtDIGP));
        }

        if ($.trim($("input[id='" + idUtil2 + "']").val()) != "") {
            precioNormal = parseFloat(nCostoMonedaOrigen) + parseFloat(nCostoMonedaOrigen) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100);



            //precioNormal = parseFloat($("#hfUltimaCompra").val()) + parseFloat($("#hfUltimaCompra").val()) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100)
            ////--------
            //if (moneProd == moba) {//EL PRECIO DE PRODUCTO SE GUARDARÁ EN MONEDA BASE
            //    //// Usar tipo de cambio si moneda de producto no coincide
            //    //if (moneValorizado == "MOAL") {
            //    //    var valorCalculo = parseFloat($("#hfUltimaCompra").val()) * parseFloat(tipoCambio);
            //    //    precioNormal = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100)
            //    //}
            //} else if (moneProd == moal) {//EL PRECIO DEL PRODUCTO SE GUARDARÁ EN MONEDA ALTERNA
            //    // Usar tipo de cambio si moneda de producto no coincide
            //    if (moneValorizado == "MOBA") {
            //        var valorCalculo = parseFloat($("#hfUltimaCompra").val()) / parseFloat(tipoCambio);
            //        precioNormal = parseFloat(valorCalculo) + parseFloat(valorCalculo) * (parseFloat($("input[id='" + idUtil2 + "']").val()) / 100)
            //    }
            //} else {
            //    //Monedas de la empresa no coinciden con las del producto. Posible error al listar monedas
            //}
            //--------
            $("input[id='" + idPrec2 + "']").val(precioNormal.toFixed(prmtDIGP));
        }
        soloCalcular = true;
        $("input[id='" + idPrec2 + "']").blur();

    } else {
        if (msgCalcular) {
            infoCustom2("El cálculo no se realizó ya que el Precio Compra encontrado fue 0.");
        }
    }
};

var CargarCostosProducto = function (cod, mone, tdTr, last) {
    var asincrono = false;
    if (tdTr == "td") {
        $("#c_" + cod + "").html("Obteniendo...");
        asincrono = true;
    }
    var sucursal = "";
    if ($("#cboSucursal").val() == "") {
        sucursal = $('#ctl00_hddestablecimiento').val();
    } else {
        sucursal = $("#cboSucursal").val();
    }
    if (cod != null) {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmprod.ashx?OPCION=16&CTLG_CODE=" + $("#cboEmpresa").val() +
            "&PROD_CODE=" + cod +
            "&MONE_CODE=" + mone +
            "&SCSL_CODE=" + sucursal,
            contenttype: "application/json;",
            datatype: "json",
            async: asincrono,
            success: function (datos) {
                if (datos != null) {
                    if (tdTr == "td") {
                        $("#c_" + cod + "").html(datos[0].NETO);
                        if (last == 'last') {
                            HabilitarBuscador();
                        }
                    } else {
                        $("#hfUltimaCompra").val(datos[0].ULTIMA_COMPRA);
                        $("#hfValorizado").val(datos[0].VALORIZADO);
                        $("#hfNeto").val(datos[0].NETO);
                    }
                }
            },
            error: function (msg) {

                if (msgCalcular) {
                    alertCustom("No se pudo obtener costos de producto correctamente.");
                }
            }
        });

    } else {
        $("#hfUltimaCompra").val("0.00");
        $("#hfValorizado").val("0.00");
        $("#hfNeto").val("0.00");
    }
};

var CambiarIndicadorPrecio = function (cod, ind, btn) {
    var text;
    if (ind == "E") {
        ind = "C";
        text = "CANTIDAD";
    } else {
        ind = "E";
        text = "ESTANDAR";
    }
    $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmprec.ashx?OPCION=4" +
        "&PROD_CODE=" + cod +
        "&CTLG=" + $('#cboEmpresa').val() +
        "&PRECIO_IND=" + ind,
        async: false,
        success: function (datos) {
            if (!isEmpty(datos)) {
                if (datos == "OK") {
                    exito();
                    $("#tp_" + cod + "").html(text);
                    $(btn).attr("onclick", "CambiarIndicadorPrecio('" + cod + "','" + ind + "',this)");

                    if ($("#rbtnTodos").is(":checked")) {
                        return;
                    }

                    var row = $(btn).parents('tr');
                    row.remove();
                }
            }
        },
        error: function (msg) {
            alertCustom("Indicador de precio no pudo actualizarse correctamente.");
        }
    });
};

var IrAProducto = function (cod) {
    var url = "?f=nmmprod&codigo=" + cod;
    window.open(url, '_blank');
};

var ImprimirPrecios = function () {
    var tabla;
    var continuar = true;

    if ($("#cboSucursal").val() == "") {
        if ($("#cboEmpresa").val() == $("#ctl00_hddctlg").val()) {
            sucursal = $('#ctl00_hddestablecimiento').val();
        }
        else {
            sucursal = $($("#cboSucursal option")[2]).val();
            if (sucursal == undefined) {
                alertCustom("No existen establecimientos para realizar la operación")
                continuar = false;
            }
        }
    } else {
        sucursal = $("#cboSucursal").val();
    }

    if (continuar) {
        //$("#tblPrecios").DataTable().destroy();
        //$("#divDctoImprimir").html($("#divTblPrecios").html());
        //$("table").css("border-collapse", "initial");

        var nomSucursal, nomEmpresa;
        nomSucursal = $("#cboSucursal option[value='" + sucursal + "']").html();
        nomEmpresa = $("#cboEmpresa :selected").html();
        //$("#divDctoImprimir").prepend("<h5>MANTENIMIENTO DE PRECIOS - " + nomSucursal + "</h5>")
        //$("#divDctoImprimir").prepend("<h4>" + nomEmpresa + "</h4>")
        imprimirDiv("divTblPrecios", "MANTENIMIENTO DE PRECIOS - " + nomSucursal);
        //window.print();
        //setTimeout(function () {
        //    $("#divDctoImprimir").html("");
        //    $("#tblPrecios").DataTable({
        //        "scrollX": true,
        //        "iDisplayLength": 10,
        //        "oLanguage": {
        //            "sEmptyTable": "No hay datos disponibles en la tabla.",
        //            "sZeroRecords": "No hay datos disponibles en la tabla."
        //        },
        //        "order": [1, 'asc']
        //    });

        //}, 500);
    }
};

var ImprimirListaPrecios = function () {
    var sucursal;
    var continuar = true;
    if (vErrors(['cboSucursal', 'cboEmpresa'])) {
        if ($("#cboSucursal").val() == "") {
            if ($("#cboEmpresa").val() == $("#ctl00_hddctlg").val()) {
                sucursal = $('#ctl00_hddestablecimiento').val();
            }
            else {
                sucursal = $($("#cboSucursal option")[2]).val();
                if (sucursal == undefined) {
                    alertCustom("No existen establecimientos para realizar la operación")
                    continuar = false;
                }
            }
        } else {
            sucursal = $("#cboSucursal").val();
        }

        if (continuar) {
            var costoInd = ($("#chkCostos").is(":checked")) ? "S" : "N";

            let sTipoPrecio = "";
            if ($("#rbtnEstandar").is(":checked"))
                sTipoPrecio = "E";
            else if ($("#rbtnCantidad").is(":checked"))
                sTipoPrecio = "C";

            Bloquear("ventana")
            $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmpree.ashx?OPCION=6&CTLG=" + $.trim($('#cboEmpresa').val()) +
                "&SCSL=" + sucursal +
                "&GRUP_CODE=" + $('#cboGrupo').val() +
                "&SUBGRUP_CODE=" + $('#cbosubgrupo').val() +
                "&PRECIO_FILTRO=" + sTipoPrecio +
                "&p_COSTO_IND=" + costoInd,
                async: false,
                success: function (datos) {
                    Desbloquear("ventana")
                    if (datos != null) {
                        $("#divDctoImprimir").html(datos);
                        var nomSucursal, nomEmpresa;
                        nomSucursal = $("#cboSucursal option[value='" + sucursal + "']").html();
                        nomEmpresa = $("#cboEmpresa :selected").html();
                        imprimirDiv("divDctoImprimir", "LISTA DE PRECIOS - " + nomSucursal);

                        //$("#divDctoImprimir").prepend("<hr></hr>")
                        //$("#divDctoImprimir").prepend("<h5>LISTA DE PRECIOS - " + nomSucursal + "</h5>")
                        //$("#divDctoImprimir").prepend("<h4>" + nomEmpresa + "</h4>")
                        //window.print();
                    }
                },
                error: function (msg) {
                    Desbloquear("ventana")
                    alertCustom("No se pudo obtener correctamente los precios de productos.");
                }
            });
        }
    }
};


var ListarValorCambio = function () {
    if (typeof $("#cboMoneda [data-tipo='MOAL']").val() != "undefined" && $("#cboMoneda [data-tipo='MOAL']").val() != "") {
        monecode = $("#cboMoneda [data-tipo='MOAL']").val();

        $.ajax({
            type: "post",
            url: "vistas/nv/ajax/nvmdocv.ashx?OPCION=TICA&MONEDA_CODE=" + monecode + "&TIPO_CAMBIO=INTERNO",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos[0].VALOR_CAMBIO_VENTA != "" && datos[0].FECHA_VIGENTE != "") {
                    tipoCambio = datos[0].VALOR_CAMBIO_VENTA;
                    $('#txtTipoCambio').val(datos[0].VALOR_CAMBIO_VENTA);
                    $('#txtFechaVigencia').val(datos[0].FECHA_VIGENTE);
                }
                else {
                    tipoCambio = 1;
                    $('#txtTipoCambio').val("");
                    $('#txtFechaVigencia').val("");
                }
            },
            error: function (msg) {
                alertCustom("Tipo de cambio Interno no se obtuvo correctamente.");
            }
        });
    }
};

//UTILIDAD POR RANGOS
var AsignarUtilidadxRangos = function (sTipoCosto) {

    if (!($("#rbtnCostoProm").is(":checked") || $("#rbtnUltCompra").is(":checked"))) {
        return;
    }

    if (rangos.length === 0) {
        infoCustom2("No se encontro Tabla de Rangos. Intente seleccionar nuevamente");
        return;
    }

    var campos = $(".util");
    ListarRangos();
    //Id moneda base:
    var moba = $("#cboMoneda option[data-tipo='MOBA']").val();
    //Id moneda base:
    var moal = $("#cboMoneda option[data-tipo='MOAL']").val();

    for (var i = 0; i < campos.length; i++) {
        var id = $(campos[i]).attr("id").split("_")[0];

        if (sTipoCosto.indexOf(id) >= 0) {

            var costoPromedio = parseFloat($($(campos[i]).parent().parent().children()[3]).data("valor"));
            var ultimoPrecioCompra = parseFloat($($(campos[i]).parent().parent().children()[4]).data("valor"));
            var moneProd = $($(campos[i]).parent().parent().children()[2]).attr("data-mone");

            //ELEGIR MONEDA SEGUN EL VALORIZADOS O MONEDA DE PRODUCTOS
            if (moneValorizado == "MOAL") {
                moneProd = moal;
            } else if (moneValorizado == "MOBA") {
                moneProd = moba;
            } else {//moneValorizado == "PROD"
                //MONEDA DE PRODUCTO SE MANTIENE
            }

            //Conversion según moneda
            if (moneProd == moba) {//EL PRECIO DE PRODUCTO EN MONEDA BASE           
                if ($("#cboMoneda2 :selected").attr("data-tipo") == "MOAL") {
                    costoPromedio = costoPromedio / parseFloat(tipoCambio);
                    ultimoPrecioCompra = ultimoPrecioCompra / parseFloat(tipoCambio);
                }
            } else if (moneProd == moal) {//EL PRECIO DEL PRODUCTO EN MONEDA ALTERNA
                if ($("#cboMoneda2 :selected").attr("data-tipo") == "MOBA") {
                    costoPromedio = costoPromedio * parseFloat(tipoCambio);
                    ultimoPrecioCompra = ultimoPrecioCompra * parseFloat(tipoCambio);
                }
            }
            //Elegir valor a comparar
            var valorComparar;
            if ($("#rbtnCostoProm").is(":checked")) {
                valorComparar = costoPromedio;
            } else {//$("#rbtnUltCompra").is(":checked")
                valorComparar = ultimoPrecioCompra;
            }
            //Agignar el rango adecuado
            if (valorComparar != 0) {
                for (var j = 0; j < rangos.length; j++) {
                    var desde = parseFloat(rangos[j].DESDE);
                    var hasta = parseFloat(rangos[j].HASTA);
                    var utilidad = parseFloat(rangos[j].UTILIDAD);

                    if (hasta == -1) {
                        $(campos[i]).val(parseFloat(utilidad).toFixed(prmtDIGP));
                        break;
                    } else {
                        if (valorComparar >= desde && valorComparar < hasta) {
                            $(campos[i]).val(parseFloat(utilidad).toFixed(prmtDIGP));
                            break;
                        }
                    }
                }
            }
        }
    }
    exitoCustom("Se asignó la utilidad correctamente. Ahora ya puede calcular precios.");
};

//UTILIDAD POR UTILIDAD
var AsignarUtilidadxUtilidad = function (sTipoCosto) {
    var campos = $(".util");
    
    for (var i = 0; i < campos.length; i++) {
        var id = $(campos[i]).attr("id").split("_")[0];
        if (sTipoCosto.indexOf(id) >= 0) {
            $(campos[i]).val(parseFloat($("#txtUtilidad").val()).toFixed(prmtDIGP));
        }
    }
    exitoCustom("Se asignó la utilidad correctamente. Ahora ya puede calcular precios.");
    
};

var ListarRangos = function () {

    $("#txtRangoInicio").val("");
    $("#txtUtilidad2").val("");
    $("#tblRangos tbody tr").remove();
    $('#cboMoneda2').change();

    rangos = OrdenarJson(rangos);

    if (rangos.length > 0) {
        $("#txtRangoInicio").removeAttr("disabled");
        var table = "";
        if (rangos.length > 0) {
            for (var i = 0; i < rangos.length; i++) {
                table += "<tr>"
                table += "<td class='center'>" + formatoMiles(rangos[i].DESDE) + "</td>"
                if (i == (rangos.length - 1)) {
                    table += "<td class='center'> ... </td>"
                    rangos[i].HASTA = "-1";

                }
                else {
                    table += "<td class='center'>" + formatoMiles(rangos[i + 1].DESDE) + "</td>"
                    rangos[i].HASTA = parseFloat(rangos[i + 1].DESDE).toFixed(2);
                }
                table += "<td class='center'>" + parseFloat(rangos[i].UTILIDAD).toFixed(DIGP) + "</td>"
                table += "<td class='center'><a class='btn red' href=\"javascript:EliminarRango('" + rangos[i].DESDE + "');\"><i class=icon-trash></i></a></td>"
                table += "</tr>"
            }
        }
        else {
            $("#txtRangoInicio").val("0");
            $("#txtRangoInicio").attr("disabled", "disabled");
        }

        $("#tblRangos tbody").append(table);

    } else {
        $("#txtRangoInicio").val("0");
        $("#txtRangoInicio").attr("disabled", "disabled");
    }

};

var ValidaRango = function (rango) {
    var res = -1;
    if (typeof rango != "undefined") {
        for (var i = 0; i < rangos.length; i++) {
            if (rango.DESDE == rangos[i].DESDE) {
                res = i;
                break;
            }
        }
    }
    return res
};

var AgregarRango = function () {
    if ($.trim($("#txtUtilidad2").val()) != "" && $.trim($("#txtRangoInicio").val()) != "") {
        var rango = {}
        rango.DESDE = $("#txtRangoInicio").val().split(",").join("");
        rango.HASTA = -1;
        rango.UTILIDAD = $("#txtUtilidad2").val();
        if (ValidaRango(rango) == -1) {
            rangos.push(rango);
            ListarRangos();
        } else {
            alertCustom("Rango ya existe!")
        }
        $("#txtRangoInicio").focus();

    } else {
        $("#txtRangoInicio").focus();
        alertCustom("Ingrese un valor en campo utilidad.");
    }
};

var EliminarRango = function (rangoInicio) {
    for (var i = 0; i < rangos.length; i++) {
        if (rangoInicio == rangos[i].DESDE) {
            rangos.splice(i, 1);
            break;
        }
    }
    ListarRangos();
};

var OrdenarJson = function (json) {
    var auxJson = [];
    if (json.length > 0) {
        json.sort(function (a, b) {
            if (parseFloat(a.DESDE) < parseFloat(b.DESDE)) {
                return -1;
            }
            else if (parseFloat(a.DESDE) > parseFloat(b.DESDE)) {
                return 1;
            }
            return 0;
        }).forEach(function (elem) {
            auxJson.push(elem);
        });
    }
    return auxJson;
};

//TRANSACCIONES
var RegistrarRangoUtilidad = function () {
    if (rangoSelecCode == "") {

        if (vErrors(['cboEmpresa', 'cboSucursal', 'cboMoneda2', 'txtNombre'])) {
            if (rangos.length > 0) {
                var strDetalles = "";
                for (var i = 0; i < rangos.length; i++) {
                    strDetalles += rangos[i].DESDE + ";" +
                        rangos[i].UTILIDAD + ";" +
                        i +
                        "|";
                }
                Bloquear("modalPlantilla_body")
                var data = new FormData();
                data.append("p_CODE", "")
                data.append("p_DESCRIPCION", $("#txtNombre").val())
                data.append("CTLG", $("#cboEmpresa").val())
                data.append("SCSL", $("#cboSucursal").val())
                data.append("MONE_CODE", $("#cboMoneda2").val())
                data.append("p_DETALLES", strDetalles)
                data.append("USUA_ID", $("#ctl00_lblusuario").html())

                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/nv/ajax/nvmprec.ashx?OPCION=6",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    async: true
                }).success(function (datos) {
                    Desbloquear("modalPlantilla_body")
                    if (datos != null) {
                        rangoSelecCode = datos[0].RESPUESTA
                        ListarRangosUtilidad();
                        exitoCustom("La operación se ha realizado correctamente! Ya puede asignar utilidad ");
                        $("#lblRangoSelec").html("[" + $("#txtNombre").val() + " - " + $("#cboMoneda2 :selected").attr("desc-corta") + "]");
                    }
                }).error(function () {
                    Desbloquear("modalPlantilla_body")
                    noexito();
                });

            }
            else {
                alertCustom("Ingrese almenos un rango");
            }
        }
    } else {
        ActualizarRangoUtilidad()
    }
};

var ActualizarRangoUtilidad = function () {

    if (vErrors(['cboEmpresa', 'cboSucursal', 'cboMoneda2', 'txtNombre'])) {
        if (rangos.length > 0) {
            var strDetalles = "";
            for (var i = 0; i < rangos.length; i++) {
                strDetalles += rangos[i].DESDE + ";" +
                    rangos[i].UTILIDAD + ";" +
                    i +
                    "|";
            }
            Bloquear("modalPlantilla_body")
            var data = new FormData();
            data.append("p_CODE", rangoSelecCode)
            data.append("p_DESCRIPCION", $("#txtNombre").val())
            data.append("CTLG", $("#cboEmpresa").val())
            data.append("SCSL", $("#cboSucursal").val())
            data.append("MONE_CODE", $("#cboMoneda2").val())
            data.append("p_DETALLES", strDetalles)
            data.append("USUA_ID", $("#ctl00_lblusuario").html())
            var jqxhr = $.ajax({
                type: "POST",
                url: "vistas/nv/ajax/nvmprec.ashx?OPCION=7",
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                async: true
            }).success(function (datos) {
                Desbloquear("modalPlantilla_body")
                if (datos != null) {
                    rangoSelecCode = datos[0].RESPUESTA
                    ListarRangosUtilidad();
                    exitoCustom("La operación se ha realizado correctamente! Ya puede asignar utilidad ");
                    $("#lblRangoSelec").html("[" + $("#txtNombre").val() + " - " + $("#cboMoneda2 :selected").attr("desc-corta") + "]");
                }
            }).error(function () {
                Desbloquear("modalPlantilla_body")
                noexito();
            });

        }
        else {
            alertCustom("Ingrese almenos un rango");
        }
    }
};

var EliminarRangoUtilidad = function (codigo) {
    if (codigo == rangoSelecCode) {
        NuevoRangoUtilidad();
    }
    var data = new FormData();
    data.append("p_CODE", codigo)
    Bloquear("modalPlantilla_body")
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmprec.ashx?OPCION=8",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("modalPlantilla_body")
        exito();
        ListarRangosUtilidad()
    }).error(function () {
        Desbloquear("modalPlantilla_body")
        noexito();
    });
};

var SeleccionarRangoUtilidad = function (cod, desc, mone) {
    $("#txtNombre").val(desc);
    $("#cboMoneda2").select2("val", mone);
    rangoSelecCode = cod;
    $("#lblRangoSelec").html("[" + desc + " - " + $("#cboMoneda2 :selected").attr("desc-corta") + "]");

    Bloquear("modalPlantilla_body")
    var data = new FormData();
    data.append("p_CODE", cod);
    var jqxhr = $.ajax({
        type: "POST",
        url: "vistas/nv/ajax/nvmprec.ashx?OPCION=10",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        async: true
    }).success(function (datos) {
        Desbloquear("modalPlantilla_body")
        if (datos != null) {
            rangos.splice(0, rangos.length);
            for (var i = 0; i < datos.length; i++) {
                var rango = {}
                rango.DESDE = datos[i].INICIO;
                rango.HASTA = -1;
                rango.UTILIDAD = datos[i].UTILIDAD;

                var aux = JSON.stringify(rango);
                var objAux = JSON.parse(aux);
                rangos.push(objAux);
            }

            infoCustom2("Se seleccionó correctamente. Ya puede asignar utilidad.");
        }
        ListarRangos();
    }).error(function () {
        Desbloquear("modalPlantilla_body")
        noexito();
    });
};

var NuevoRangoUtilidad = function () {
    rangoSelecCode = "";
    $("#lblRangoSelec").html("");
    $("#txtNombre").val("");
    rangos.splice(0, rangos.length);
    ListarRangos();
};
var sException = "";
var oTablePlanCuentas;
var sCtasFlujoEfectivo = 0;
var eEstado = { Ninguno: 0, Nuevo: 1, Editar: 2 };
var eEstadoActual = eEstado.Ninguno
var bEsCuentaHoja = false;
var aArbolPlanContable = {};
var aArbolCCosto = {};
var nodoSeleccionado = {};
var arrayCtaDestino = [];
var objDes = {};
var objAux;
var objElimCuenta = {};
var nroNivelesPlanContable = 0;

var CTMCUCO = function () {

    var fnCargarParametros = function () {
        sCtasFlujoEfectivo = mGetParametro("FLUX", "CUENTAS DE FLUJO DE EFECTIVO");
    };

    var fnGetCuentaContable = function (sCodPlanContable, sCuenta) {
        var oCuenta = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=3&sCodPlanContable=" + sCodPlanContable + "&sCuenta=" + sCuenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oCuenta = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        return oCuenta;
    };


    var fnGetCuentaContableDestino = function (sCodPlanContable, sCuenta) {
        var oCuentaDestino = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=10&sCodPlanContable=" + sCodPlanContable + "&sCuenta=" + sCuenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oCuentaDestino = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        return oCuentaDestino;
    };

    

    var fnGetCuentaContableHoja = function (sCodPlanContable, sCuenta, sEstado, sCuentaAsiento) {
        sCuenta = (sCuenta === undefined ? "" : sCuenta);
        sEstado = (sEstado === undefined ? "" : sEstado);
        sCuentaAsiento = (sCuentaAsiento === undefined ? "" : sCuentaAsiento);
        var oCuentaHoja = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=6&sCodPlanContable=" + sCodPlanContable + "&sCuenta=" + sCuenta + "&sEstado=" + sEstado + "&sCuentaAsiento=" + sCuentaAsiento,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oCuentaHoja = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los Datos de la Cuenta.");
            }
        });
        return oCuentaHoja;
    };
  
    var fnCargarPlanContable = function (sCodPlanContable, sEstado) {
        sEstado = (sEstado === undefined ? "" : sEstado);
        var sDigitos = "[";
        if ($("#chbodigito0").is(":checked"))
            sDigitos = sDigitos + "0";
        if ($("#chbodigito1").is(":checked"))
            sDigitos = sDigitos + "1";
        if ($("#chbodigito2").is(":checked"))
            sDigitos = sDigitos + "2";
        sDigitos = sDigitos + "]";

        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=5&sCodPlanContable=" + sCodPlanContable + "&sEstado=" + sEstado + "&sDigitos=" + sDigitos,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                var vData = [];
                var oItem = {};
                oItem.Codigo = "0";
                oItem.Descripcion = $("#cboPlanContable").select2("data").text;
                oItem.CodPadre = "-1";
                datos = JSON.parse(datos);
                if (!isEmpty(datos))
                    vData = datos;

                vData.unshift(oItem);

                var oArbol = fnCrearArbol(vData);
                aArbolPlanContable = [];
                aArbolPlanContable.push(oArbol);
                fnCargarArbol(aArbolPlanContable);
                var iNroCtas = (vData.length - 1);
                $("#lblNroCtas").html("Reg(s): " + iNroCtas)
                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Plan de Cuentas.");
                Desbloquear("ventana");
            }
        });
    };

    var fnCargarArbol = function (aArbol) {
        $("#treeCuentas").treeview({ data: aArbol });       

        $("#treeCuentas").on("nodeUnselected", function (event, node) {
            let iNodeId = node.nodeId;
            if(iNodeUnSelectedId !== iNodeId)
                return;
            
            iNodeUnSelectedId = iNodeId;
            iNroMiliseNodeUnSelected = new Date().getTime();
            fnEventClickNode(event, node);
        });

        $("#treeCuentas").on("nodeSelected", function (event, data) {
            nodoSeleccionado = data;
            console.log(eEstadoActual);
            if (eEstadoActual == "0") {
                if (data.Codigo === "0") {
                    $("#cboClaseCuenta").val("").change();
                    $("#txtNumeracion").val("");
                    $("#txtCuenta").remove();
                    $("#divcuenta").append('<input id="txtCuenta" class="span12" type="text" placeholder="Código" maxlength="50" onkeypress="return ValidaNumeros(event,this)"/>')
                    $("#txtCuentaPadre").val("-");
                    $("#txtCuenta").val(data.Codigo);
                    $("#txtDescripcion").val(data.Descripcion);
                    $("#txtFechaIni").val("");
                    $("#uniform-chboTipoCambio span").removeClass();
                    $("#chboTipoCambio").attr("checked", false);
                    $("#chboTipoCambio").change();
                    $("#txtFechaFin").val("");

                    //$("#uniform-chboCentroCosto span").removeClass();
                    //$("#chboCentroCosto").attr("checked", false);

                    $('#uniform-chboCentroCosto span').removeClass();
                    $('#chboCentroCosto').attr('checked', false).change();

                    //$("#uniform-chboEstado span").removeClass().addClass("checked");
                    //$("#chboEstado").attr("checked", true);

                    $('#uniform-chboEstado span').removeClass().addClass("checked");
                    $('#chboEstado').attr('checked', true).change();
                }
                else {
                    let sNIveles = $("#cboPlanContable :selected").attr("nivel");
                    var sCodPlanContable = $("#cboPlanContable").val();
                    var sCodigo = data.Codigo;
                    var oCuenta = fnGetCuentaContable(sCodPlanContable, sCodigo);
                    let sNivelCuentaActual = oCuenta[0].Nivel;//DPORTA 14/09/2021

                    if (sNIveles == sNivelCuentaActual) { //DPORTA 14/09/2021
                        var oCuentaDestino = fnGetCuentaContableDestino(sCodPlanContable, sCodigo);
                    }
                    
                    if (!isEmpty(oCuentaDestino)) {

                        arrayCtaDestino = oCuentaDestino;


                        oTableDestinoCuentas.fnClearTable();
                        oTableDestinoCuentas.fnAddData(arrayCtaDestino);
                        oTableDestinoCuentas.fnAdjustColumnSizing();
                    } else {

                        oTableDestinoCuentas.fnClearTable();
                        arrayCtaDestino = [];
                    }

                    if (isEmpty(oCuenta))
                        return;

                    let sNivelCuenta = oCuenta[0].Nivel;

                    if (sNIveles == sNivelCuenta) {
                        $("#btnNuevo").css({ "display": "none" });
                    } else {
                        $("#btnNuevo").css({ "display": "inline" });
                    }

                    $("#cboClaseCuenta").val(oCuenta[0].CodClaseCuenta);
                    $("#cboClaseCuenta").change();
                    $("#txtCuenta").remove();
                    $("#divcuenta").append('<input id="txtCuenta" class="span12" type="text" placeholder="Código" maxlength="50" onkeypress="return ValidaNumeros(event,this)"/>')
                    $("#txtCuentaPadre").val(oCuenta[0].CuentaPadre);
                    $("#txtCuenta").val(oCuenta[0].Cuenta);
                    $("#txtNivel").val(oCuenta[0].Nivel);
                    $("#txtDescripcion").val(oCuenta[0].DescripCuenta);


                    if (oCuenta[0].TipoAjusteDifCamb !== null) {
                        if (oCuenta[0].TipoAjusteDifCamb == 'S') {
                            $("#uniform-chboTipoCambio span").removeClass().addClass("checked");
                            $("#chboTipoCambio").attr("checked", true);
                            $("#chboTipoCambio").change();
                            var cadenaxxx = oCuenta[0].TipoCambio.toString();
                            var indica = cadenaxxx.indexOf('.');
                            if (indica > -1) {
                                var cadenax = cadenaxxx.substring(indica);
                                if (cadenax.length < 5) {
                                    var cad = cadenax.length;
                                    if (cad == 2)
                                        cadenax = cadenax + '000';
                                    else {
                                        if (cad == 3)
                                            cadenax = cadenax + '00';
                                        else {
                                            cadenax = cadenax + '0';
                                        }
                                    }
                                }
                                cadenaxxx = cadenaxxx.substring(0, indica) + cadenax;
                            }
                            //$("#cboTipoCambio").val(oCuenta[0].TipoCambio).change();
                            $("#cboTipoCambio").val(cadenaxxx).change();
                        }
                        else {
                            $("#chboTipoCambio").attr("checked", false);
                            $("#chboTipoCambio").change();
                        }
                    }
                    else {
                        $("#uniform-chboTipoCambio span").removeClass();
                        $("#chboTipoCambio").attr("checked", false);
                        $("#chboTipoCambio").change();
                    }

                    $("#txtFechaIni").val(oCuenta[0].FechaIni);
                    $("#txtFechaFin").val(oCuenta[0].FechaFin);


                    $("#cboClasificacionCuenta").select2("val", oCuenta[0].clasificacionCuenta)

                    if (oCuenta[0].Estado == "A") {

                        $('#uniform-chboEstado span').removeClass().addClass("checked");
                        $('#chboEstado').attr('checked', true).change();
                        //$("#uniform-chboEstado span").removeClass().addClass("checked");
                        //$("#chboEstado").attr("checked", true);
                    }
                    else {
                        $('#uniform-chboEstado span').removeClass();
                        $('#chboEstado').attr('checked', false).change();

                        //$("#uniform-chboEstado span").removeClass();
                        //$("#chboEstado").attr("checked", false);
                    }

                    if (oCuenta[0].CentroCosto == "S") {
                        //$("#uniform-chboCentroCosto span").removeClass().addClass("checked");
                        //$("#chboCentroCosto").attr("checked", true);
                        $('#uniform-chboCentroCosto span').removeClass().addClass("checked");
                        $('#chboCentroCosto').attr('checked', true).change();
                    }
                    else {
                        //$("#uniform-chboCentroCosto span").removeClass();
                        //$("#chboCentroCosto").attr("checked", false);
                        $('#uniform-chboCentroCosto span').removeClass();
                        $('#chboCentroCosto').attr('checked', false).change();
                    }

                    if (oCuenta[0].Destino == "S") {
                        $("#uniform-chboDestino span").removeClass().addClass("checked");
                        $("#chboDestino").attr("checked", true).change();
                    }
                    else {
                        $("#uniform-chboDestino span").removeClass();
                        $("#chboDestino").attr("checked", false).change();
                    }

                    //$("#chboDestino").change();

                    var oCuentaHoja = fnGetCuentaContableHoja(sCodPlanContable, sCodigo);
                    if (isEmpty(oCuentaHoja))
                        bEsCuentaHoja = false;
                    else
                        bEsCuentaHoja = true;
                }

            }

            
            let iNodeId = data.nodeId;           

            iNodeSelectedId = iNodeId;
            iNroMiliseNodeSelected = new Date().getTime();
            fnEventClickNode(event, data);


        });



    };

    var iNodeSelectedId = null;
    var iNroMiliseNodeSelected = null;
    var iNodeUnSelectedId = null;
    var iNroMiliseNodeUnSelected = null;
    var hasEvents = false; 

    var fnCrearArbol = function (data) {
        Bloquear("ventana");
        var oArbol = {};
        if (isEmpty(data) || data === undefined)
            return oArbol;

        var n = data.length;

        for (var i = 0; i < n; i++) {
            var nodo = data[i];
            fnAgregarNodo(nodo, oArbol);
        }
        return oArbol;
    };

    var fnAgregarNodo = function (oNodo, oArbol) {
        if (oNodo.Codigo === "0") {
            oArbol.Codigo = oNodo.Codigo;
            oArbol.Descripcion = oNodo.Descripcion;
            oArbol.CodPadre = oNodo.CodPadre;
            oArbol.text = oNodo.Descripcion; // Dato Necesario para que el plugin cree el Treeview
        } else {
            fnAgregarNodo2(oNodo, oArbol);
        }
    };

    var fnAgregarNodo2 = function (oNodo, oArbol) {
        if (oArbol.Codigo === oNodo.CodPadre) {
            if (oArbol.nodes === undefined)
                oArbol.nodes = [];
            var oTempNodo = {};
            oTempNodo.Codigo = oNodo.Codigo;
            oTempNodo.Descripcion = oNodo.Descripcion;
            oTempNodo.CodPadre = oNodo.CodPadre;
            oTempNodo.text = oNodo.Descripcion; // Dato Necesario para que el plugin cree el Treeview
            oArbol.nodes.push(oTempNodo);
            return true;
        } else {
            if (oArbol.nodes !== undefined) {
                var n = oArbol.nodes.length;
                for (var i = 0; i < n; i++) {
                    var bEncontrado = fnAgregarNodo2(oNodo, oArbol.nodes[i]);
                    if (bEncontrado)
                        break;
                }
            }
        }
    };

    var fnEditarNodo = function (sCodigo, oArbol, sDescripcion) {
        if (sCodigo === oArbol.Codigo) {
            oArbol.Descripcion = sDescripcion;
            oArbol.text = sDescripcion;
            return true;
        } else {
            if (oArbol.nodes === undefined)
                return;
            else {
                for (var i = 0; i < oArbol.nodes.length; i++) {
                    var bExiste = fnEditarNodo(sCodigo, oArbol.nodes[i], sDescripcion);
                    if (bExiste)
                        return true;
                }
            }
            return false;
        }
    };

    var fnExisteNodo = function (sCodigo, oArbol) {
        if (oArbol.nodes === undefined)
            return;
        else {
            if (sCodigo === oArbol.Codigo) {
                return true;
            }
            for (var i = 0; i < oArbol.nodes.length; i++) {
                var bExiste = fnExisteNodo(sCodigo, oArbol.nodes[i]);
                if (bExiste)
                    return true;
            }
        }
        return false;
    };

    var fnRecorrerArbol = function (oArbol) {
        if (oArbol.nodes === undefined)
            return
        else {
            for (var i = 0; i < oArbol.nodes.length; i++) {
                fnRecorrerArbol(oArbol.nodes[i]);
            }
        }
    };

    var fnErrorValidacion = function () {
        if (eEstadoActual !== eEstado.Nuevo && eEstadoActual !== eEstado.Editar) {
            infoCustom2("La Cuenta no se registró, debe dar clic en Editar.");
            return;
        }

        var aeError = ["cboPlanContable", "txtCuentaPadre", "txtCuenta", "txtDescripcion", "txtFechaIni"];

        if ($("#chboTipoCambio").is(":checked"))
            aeError.push("cboTipoCambio");
        
        if (!vErrors(aeError))
            return;

        if (eEstadoActual === eEstado.Nuevo) {
            var iLongitudNivel = parseInt($("#txtCuenta").attr("maxlength"));
            var sCuenta = $("#txtCuenta").val();
            sCuenta = sCuenta.fnReplaceAll("_", "");
            if (sCuenta.length !== iLongitudNivel) {
                infoCustom2("La Cuenta no se registró. Cantidad de caracteres incorrecta.");
                return;
            }
        }
        // var bUsaCentroCosto = $("#chboCentroCosto").is(":checked");
        return false;
    };

    var fnGrabar = function () {
        let dMontoDebe = 0;
        let dMontoHaber = 0;

        var bError = fnErrorValidacion();
        if (bError === undefined)
            return;
        if (bError)
            return;

        var sCodPlanContable = $("#cboPlanContable").val();
        var sCuentaPadre = $("#txtCuentaPadre").val().trim();
        var sCuenta = sCuentaPadre + "." + $("#txtCuenta").val().trim();
        var sDescripcion = $("#txtDescripcion").val().trim();
        if (eEstadoActual === eEstado.Editar) {
            var sCuentaPadre = $("#txtCuentaPadre").val().trim();
            var sCuenta = $("#txtCuenta").val().trim();
            var sDescripcion = $("#txtDescripcion").val().trim();
        }

        if (arrayCtaDestino.length > 0) {
            for (let i = 0; i < arrayCtaDestino.length; i++) {
                if (arrayCtaDestino[i].TIPO == "D") {
                    dMontoDebe = dMontoDebe + parseFloat(arrayCtaDestino[i].PORCENTAJE);
                }

                if (arrayCtaDestino[i].TIPO == "H") {
                    dMontoHaber = dMontoHaber + parseFloat(arrayCtaDestino[i].PORCENTAJE);
                }
            }

            if (dMontoDebe != 100 || dMontoHaber != 100) {
                infoCustom2('Los porcentajes del debe y el haber no estan balanceados.');
                return;
            }            
        }

        var detalleDestino;

        detalleDestino = obtenerDetalleDestino();


        console.log(detalleDestino);

        var data = new FormData();
        data.append("sOpcion", eEstadoActual);
        data.append("sCodPlanContable", sCodPlanContable);
        data.append("sCuenta", sCuenta);
        data.append("sDescripcion", sDescripcion);
        data.append("sCodClaseCuenta", $("#cboClaseCuenta").val());
        data.append("sCuentaPadre", sCuentaPadre);
        data.append("sFechaIni", $("#txtFechaIni").val().trim());
        data.append("sFechaFin", $("#txtFechaFin").val().trim());
        data.append("sEstado", $("#chboEstado").is(":checked") ? "A" : "I");
        data.append("sCentroCosto", $("#chboCentroCosto").is(":checked") ? "S" : "N");
        data.append("sDestino", $("#chboDestino").is(":checked") ? "S" : "N");
        data.append("sTipoCambio", $("#chboTipoCambio").is(":checked") ? "S" : "N");          
        data.append("sCodTipoCambio", $("#cboTipoCambio").val().trim());
        data.append("sClasificacionCuenta", $("#cboClasificacionCuenta").val());
        data.append("sCodFlujoEfectivo", "");
        data.append("sDetalleDestino", detalleDestino);
        
        

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMCUCO.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response === "") {
                    noexito();
                    return;
                }

                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }

                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    alertCustom("La Cuenta no se registró.");
                    return;
                }


                var vNodo = [];
                var sDescripcionCuenta = "";
                if (eEstadoActual === eEstado.Nuevo) {
                    var oNodo = {};
                    oNodo.Codigo = sCuenta;
                    oNodo.Descripcion = sCuenta + " - " + sDescripcion;
                    oNodo.CodPadre = sCuentaPadre;

                    //fnAgregarNodo(oNodo);
                    //fnCargarArbol();
                    sDescripcionCuenta = oNodo.Descripcion;
                     $("#txtCuenta").inputmask("remove");

                } else if (eEstadoActual === eEstado.Editar) {
                    //fnEditarNodo(sCuenta, vArbol, sCuenta + " - " + sDescripcion);
                    //fnCargarArbol();
                    var oNodo = {};
                    oNodo.Codigo = sCuenta;
                    oNodo.Descripcion = sCuenta + " - " + sDescripcion;
                    oNodo.CodPadre = sCuentaPadre;

                    sDescripcionCuenta = oNodo.Descripcion;
                    $("#txtCuenta").inputmask("remove");
                }

                exito();

                $("#divcuenta").removeClass("input-prepend");
                $("#spancuenta").remove();
                $("#txtCuenta").removeClass("m-wrap");

                eEstadoActual = eEstado.Ninguno;
                fnHabilitarControles();
                
                $("#btnlistarpc").click();
                vNodo = $("#treeCuentas").treeview("search", [sDescripcionCuenta, {}]);
                $("#treeCuentas").treeview("clearSearch");
                $("#treeCuentas").treeview("selectNode", vNodo);
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("La Cuenta no se registró.");
            }
        });
    };

    var obtenerDetalleDestino = function () {
        var detalles = "";
        var cont = 0;
        for (var i = 0; i < arrayCtaDestino.length; i++) {
            cont++;
            detalles += cont + ";" +
                arrayCtaDestino[i].COD_DEBE + ";" +
                arrayCtaDestino[i].COD_HABER + ";" +
                arrayCtaDestino[i].PORCENTAJE +
                "|";
        }

        return detalles;

    }

    var fnCargarPlugins = function () {
        $(".ComboBox, #cboCtaContable").select2();

        $("#txtFechaIni").datepicker()
                .inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } })
                .datepicker("setDate", "now");

        $("#s2id_cboClaseCuenta a .select2-chosen").html("");

        $('.danger-toggle-button-custom').toggleButtons({
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


        $('.danger-toggle-button-custom-2').toggleButtons({
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "info",
                disabled: "danger"
            },
            label: {
                enabled: "DEBE",
                disabled: "HABER"
            }
        });

    };

    var fnCargarCombos = function () {
        //Combo Diferencia de Cambio
        //Codigo TCA: Cabecera de la Tabla TblCodigo

        //var sCboDiferenciaCambio = fillComboTblCodigo("TCA");
        //$("#cboTipoCambio").html(sCboDiferenciaCambio);

        //Combo Actividad Flujo Efectivo 
        //Codigo AFE: Cabecera de la Tabla TblCodigo
        var sCboActividadFlujoEfectivo = fillComboTblCodigo("AFE");
        $("#cboActividadFlujoEfectivo").html(sCboActividadFlujoEfectivo);

        //Combo Plan Contable
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMNIPL.ASHX?sOpcion=2&sCodPlanContable=&sEstado=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {             
                $('#cboPlanContable').empty();
                $('#cboPlanContable').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        var sNiveles = "";
                        var iNroNiveles = datos[i].NroNiveles;
                        var sDigitosNiveles = datos[i].DigitosNiveles;
                        var asDigitosNiveles = sDigitosNiveles.split(",");
                        for (var j = 1; j <= iNroNiveles; j++) {
                            sNiveles += " nivel" + j + "='" + asDigitosNiveles[j - 1] + "'";
                        }

                        $('#cboPlanContable').append('<option value="' + datos[i].CodPlanContable + '"  nivel="' + datos[i].NroNiveles + '"  valueDescripTipoPlan="' + datos[i].TipoPlanContab + '"' + sNiveles + '" determinado = "' + datos[i].Predeterminado + '">' + datos[i].NombrePlanContab + '</option>');
                    }

                    $("#cboPlanContable > option").each(function () {
                        let predeter = $('#cboPlanContable [value="' + this.value + '"]').attr('determinado');
                        if (predeter == 'S') {
                            $("#cboPlanContable").val(this.value).change();

                        }
                    });
                } else {
                    $('#cboPlanContable').select2('val', '');
                }


            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista Planes Contables");
            }
        });
        //Combo Clase Cuenta
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMCLCC.ASHX?sOpcion=3&sEstado=A",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                var oClaseCuenta = datos;
                $("#cboClaseCuenta").html("<option></option>");
                $.each(oClaseCuenta, function (key, value) {
                    $("#cboClaseCuenta").append("<option value='" + value.CodClaseCuenta +
                        "' value_sunat='" + value.cCodigoSunat +
                        "' value_numeracion='" + value.iNumeracion +
                        "' value_centroCost='" + value.UsaCentroCosto +
                        "' value_generadestino='" + value.GeneraDestino +
                        
                        "'>" + value.cDescripcion + "</option>");
                });
            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista Clases de Cuentas Contables");
            }
        });

    };

    var fnCargarEventoControles = function () {
        //DPORTA 14/09/2021
        $("#addrowprop").click(function () {
            let sCuentaAlcual = $("#cboCtaContable").val(); //$("#txtCuenta").val();
            let sDebeHaber = $("#chboDebeHaber").is(":checked") ? "D" : "H";

            if (nodoSeleccionado.Codigo == sCuentaAlcual) {
                infoCustom2('Una misma cuenta no puede ser destino de si misma.');
                return;
            } else {
                if (arrayCtaDestino.length > 0) {
                    for (var i = 0; i < arrayCtaDestino.length; i++) {
                        if (arrayCtaDestino[i].CUENTA == $("#cboCtaContable").val()) {//nodoSeleccionado.Codigo
                            infoCustom2('La cuenta seleccionada ya ha sido agregada.');
                            return;
                        }
                    }
                }
            }
                        
            let sNivelMaximo = $("#cboPlanContable :selected").attr("nivel");
            let sCodPlanContableActual = $("#cboPlanContable").val();
            let sCodigoSelec = $("#cboCtaContable").val();//nodoSeleccionado.Codigo;
            let oCuentaActual = fnGetCuentaContable(sCodPlanContableActual, sCodigoSelec);
           

            let sNivelCuentaActual = oCuentaActual[0].Nivel;

            if (sNivelMaximo == sNivelCuentaActual) {                                
                if (sDebeHaber == "D") {
                    objDes.CUENTA = $("#cboCtaContable").val();//nodoSeleccionado.Codigo;
                    objDes.COD_DEBE = $("#cboCtaContable").val();//nodoSeleccionado.Codigo;
                    objDes.DEBE = $("#cboCtaContable :selected").html();//nodoSeleccionado.text;
                    objDes.COD_HABER = '';
                    objDes.HABER = '-';
                    objDes.PORCENTAJE = $("#txtPorcentaje").val();//"0";
                    objDes.TIPO = "D";
                } else {
                    objDes.CUENTA = $("#cboCtaContable").val();//nodoSeleccionado.Codigo;
                    objDes.COD_DEBE = '';
                    objDes.DEBE = '-';
                    objDes.COD_HABER = $("#cboCtaContable").val();//nodoSeleccionado.Codigo;
                    objDes.HABER = $("#cboCtaContable :selected").html();//nodoSeleccionado.text;
                    objDes.PORCENTAJE = $("#txtPorcentaje").val();//"0";
                    objDes.TIPO = "H";
                }
                
                objAux = jQuery.parseJSON(JSON.stringify(objDes));
                arrayCtaDestino.push(objAux);

                oTableDestinoCuentas.fnClearTable();
                oTableDestinoCuentas.fnAddData(arrayCtaDestino);
                oTableDestinoCuentas.fnAdjustColumnSizing();

                editaTabla();
                //arrayCtaDestino = jQuery.parseJSON(JSON.stringify(objDes));

                console.log(arrayCtaDestino);
                $("#txtPorcentaje").val("0");
            } else {
                infoCustom2('Se debe seleccionar una cuenta del ultimo nivel.');                
            }

        });

        $("#delrowprop").click(function () {
            
            if (objElimCuenta.COD_DEBE != "") {
                for (var i = 0; i < arrayCtaDestino.length; i++) {
                    if (arrayCtaDestino[i].COD_DEBE == objElimCuenta.COD_DEBE) {                                                           
                        arrayCtaDestino.splice(i, 1);                        
                    }
                }

                if (arrayCtaDestino.length > 0) {
                    oTableDestinoCuentas.fnClearTable();
                    oTableDestinoCuentas.fnAddData(arrayCtaDestino);
                    oTableDestinoCuentas.fnAdjustColumnSizing();
                } else {
                    oTableDestinoCuentas.fnClearTable();
                }
            } else {
                for (var i = 0; i < arrayCtaDestino.length; i++) {
                    if (arrayCtaDestino[i].COD_HABER == objElimCuenta.COD_HABER) {
                        arrayCtaDestino.splice(i, 1);
                    }
                }

                if (arrayCtaDestino.length > 0) {
                    oTableDestinoCuentas.fnClearTable();
                    oTableDestinoCuentas.fnAddData(arrayCtaDestino);
                    oTableDestinoCuentas.fnAdjustColumnSizing();
                } else {
                    oTableDestinoCuentas.fnClearTable();
                }
            }

            console.log(arrayCtaDestino);

        });
        
        $("#cboClasificacionCuenta").on("change", function () {
            let sMonetario = $("#chboTipoCambio").is(":checked") ? "S" : "N";
            let sClasificacion = $("#cboClasificacionCuenta").val();

            if (sMonetario == "S") {
                if (sClasificacion == "A") {
                    $("#cboTipoCambio").select2("val", "C")
                } else {
                    if (sClasificacion == "P") {
                        $("#cboTipoCambio").select2("val", "V")
                    } else {
                        $("#cboTipoCambio").select2("val", "")
                    }
                }
            }   
        });

        $("#chboEstado").on("change", function () {
            $("#txtFechaFin").val("");
            if ($("#chboEstado").is(":checked"))
                $("#txtFechaFin").attr("disabled", true);
            else
                $("#txtFechaFin").attr("disabled", false);
        });
        
        $("#chboDestino").on("change", function () {
            let sNivelMaximo = $("#cboPlanContable :selected").attr("nivel");
            let sCodPlanContableActual = $("#cboPlanContable").val();
            let sCodigoSelec = nodoSeleccionado.Codigo;
            let oCuentaActual = fnGetCuentaContable(sCodPlanContableActual, sCodigoSelec);
            let sNivelCuentaActual = oCuentaActual[0].Nivel;

            if (sNivelMaximo == sNivelCuentaActual) {
                if ($("#chboDestino").is(":checked")) {
                    setTimeout(function () {
                        oTableDestinoCuentas.fnAdjustColumnSizing();
                    }, 100);
                    $("#ctaDestino").slideDown();

                } else {                    
                    $("#ctaDestino").slideUp(500);
                }                
            } else {
                if ($("#chboDestino").is(":checked")) {
                    infoCustom2('Las cuentas destino solo se pueden agregar en el ultimo nivel.');
                }
            }                            
        });

        $("#chboTipoCambio").on("change", function () {            
            if ($("#chboTipoCambio").is(":checked")) {
                let sClasificacionCuenta = $("#cboClasificacionCuenta").val();

                if (sClasificacionCuenta == "" || sClasificacionCuenta == "C") {
                    $("#cboTipoCambio").select2("val", "")
                } else {
                    if (sClasificacionCuenta == 'A') {
                        $("#cboTipoCambio").select2("val", "C")
                    } else {
                        $("#cboTipoCambio").select2("val", "V")
                    }
                }
                
            } else {
                $("#cboTipoCambio").select2("val", "")
            }
                
        });        

        $("#cboPlanContable").on("change", function () {
            fnCargarComboCuentasContables(); //DPORTA 14/09/2021
            var sTipoPlan = $("#cboPlanContable :selected").attr("valueDescripTipoPlan");
            if (sTipoPlan === undefined)
                $("#txtTipoPlan").val("");
            else
                $("#txtTipoPlan").val(sTipoPlan);
        });

        $("#chboTipoCambio").on("change", function () {
            if ($("#chboTipoCambio").is(":checked"))
                $("#cboTipoCambio").removeAttr("disabled");
            else {
                $("#cboTipoCambio").val("").change();
                $("#cboTipoCambio").attr("disabled", "disabled");
            }
        });
    
        $("#cboClaseCuenta").on("change", function () {
            var sNumeracion = $("#cboClaseCuenta :selected").attr("value_numeracion");
            $("#txtNumeracion").val(sNumeracion);
        });

        $("#btnlistarpc").on("click", function () {
            if (!vErrors(["cboPlanContable"]))
                return;
            var sCodPlanContable = $("#cboPlanContable ").val();
            var sEstado = $("#cboEstado").val();
            fnCargarPlanContable(sCodPlanContable, sEstado);
        });

        $("#btnNuevo").on("click", function (e) {
            e.preventDefault();
            var vCuenta = $("#treeCuentas").treeview("getSelected");
            if (vCuenta.length === 1 && vCuenta[0].Codigo !== undefined) {
                var sCodPlanContable = $("#cboPlanContable").val();
                var sCodigo = vCuenta[0].Codigo;
                var oCuenta = fnGetCuentaContable(sCodPlanContable, sCodigo);
                if (isEmpty(oCuenta))
                    return;

                var sEstado = oCuenta[0].Estado;
                if (sEstado === 'I') {
                    infoCustom2("No se puede Agregar Subdivisionarias a una Cuenta que No está Activa");
                    return;
                }

                var sCtaAsiento = oCuenta[0].CtaAsiento;
                if (sCtaAsiento === 'S') {
                    infoCustom2("No se puede Agregar Subdivisionarias a una Cuenta que esta marcada como 'Cuenta de Asiento'");
                    return;
                }

                $("#cboClaseCuenta").val(oCuenta[0].CodClaseCuenta).change();                
                var usaCentroCosto = $("#cboClaseCuenta :selected").attr("value_centroCost");
                var generaDestino = $("#cboClaseCuenta :selected").attr("value_generadestino");
                                
                if(usaCentroCosto === 'S'){
                    //$("#uniform-chboCentroCosto span").removeClass().addClass("checked");
                    //$("#chboCentroCosto").attr("checked", true).change();

                    $('#uniform-chboCentroCosto span').removeClass().addClass("checked");
                    $('#chboCentroCosto').attr('checked', true).change();
                }
                else{                    
                    //$("#uniform-chboCentroCosto span").removeClass();
                    //$("#chboCentroCosto").attr("checked", false).change();
                    $('#uniform-chboCentroCosto span').removeClass();
                    $('#chboCentroCosto').attr('checked', false).change();
                }

                if (generaDestino === 'S') {                    
                    $('#uniform-chboDestino span').removeClass().addClass("checked");
                    $('#chboDestino').attr('checked', true).change();
                }
                else {                    
                    $('#uniform-chboDestino span').removeClass();
                    $('#chboDestino').attr('checked', false).change();
                }

                var sCuentaPadre = oCuenta[0].Cuenta;
                $("#txtCuentaPadre").val(sCuentaPadre);

                var nNivelSiguiente = parseInt(oCuenta[0].Nivel) + 1;
                var nLogCuenta = parseInt($("#cboPlanContable :selected").attr("nivel" + nNivelSiguiente));

                $("#divcuenta").removeClass("input-prepend");
                $("#spancuenta").remove();
                $("#txtCuenta").removeClass("m-wrap");

                $("#divcuenta").addClass("input-prepend");
                $("#divcuenta").prepend("<span id='spancuenta' class='add-on'>" + sCuentaPadre  +"</span>");
                $("#txtCuenta").addClass("m-wrap");

                $("#txtCuenta").val("");
                $("#txtCuenta").attr("maxlength", nLogCuenta);

                var sMascara = "";
                for (var i = 0; i < nLogCuenta; i++)
                    sMascara += "9";
                $("#txtCuenta").inputmask(sMascara);

                $("#txtNivel").val(nNivelSiguiente);

                $("#txtDescripcion").val("");


                $("#uniform-chboTipoCambio span").removeClass();
                $("#chboTipoCambio").attr("checked", false);
                $("#chboTipoCambio").change();

                $("#txtFechaIni").datepicker("setDate", "now");
                $("#txtFechaFin").val("");


                $('#uniform-chboEstado span').removeClass().addClass("checked");
                $('#chboEstado').attr('checked', true).change();

                //$("#uniform-chboEstado span").removeClass().addClass("checked");
                //$("#chboEstado").attr("checked", true);
                       
                eEstadoActual = eEstado.Nuevo;
                fnHabilitarControles();
            }
            else
                infoCustom2("Debe seleccionar una Cuenta para poder crear la Sub-Cuenta");
        });

        $("#btnEditar").on("click", function (e) {
            e.preventDefault();
            let sNivelMaximo = $("#cboPlanContable :selected").attr("nivel");
            let sCodPlanContableActual = $("#cboPlanContable").val();
            let sCodigoSelec = nodoSeleccionado.Codigo;
            let oCuentaActual = fnGetCuentaContable(sCodPlanContableActual, sCodigoSelec);
            let sNivelCuentaActual = oCuentaActual[0].Nivel;

            var vCuenta = $("#treeCuentas").treeview("getSelected");
            if (vCuenta.length === 1 && vCuenta[0].Codigo !== undefined) {
                var sCodPadre = vCuenta[0].CodPadre;
                if (sCodPadre !== "-1") {                    
                    eEstadoActual = eEstado.Editar;
                    fnHabilitarControles();

                    //console.log(eEstadoActual);
                }
            }
            else
                infoCustom2("Debe seleccionar una Cuenta para poder Editar");
        });

        $(".cancelar").on("click", function (e) {
            e.preventDefault();
            $("#ctaDestino").slideUp(500);
            $("#txtCuenta").inputmask("remove");
            $("#divcuenta").removeClass("input-prepend");
            $("#spancuenta").remove();
            $("#txtCuenta").removeClass("m-wrap");

            if (eEstadoActual === eEstado.Nuevo) {
                var vNodo = $("#treeCuentas").treeview("getSelected");
                $("#treeCuentas").treeview("unselectNode", vNodo);
                //$("#treeCuentas").treeview("selectNode", vNodo);
            }            

            eEstadoActual = eEstado.Ninguno;
            fnHabilitarControles();
            arrayCtaDestino = [];
            oTableDestinoCuentas.fnClearTable();
            //console.log(eEstadoActual);
        });

        $("#btnGrabar").on("click", function () {
            fnGrabar();
        });

        $("#linkModalCuentas").on("click", function () {
            if (!vErrors(["txtCuentaDestino", "cboPlanContable"]))
                return;
            fnCargarModalCuentasDestino();
            //$("#divModalBusqueda").modal("show");
            $("#divModal").modal("show");
        });

        $("#btnAgregaCtaDestino").on("click", function () {
            fnAgregarCtaDestino();
        });

        $("#cboClaseCuenta").on("change", function () {
            var sNumeracion = $("#cboClaseCuenta :selected").attr("value_numeracion");
            $("#txtNumeracion").val(sNumeracion);
        });
          
        var lastPattern = '';
        $("#txtFiltraCtas").on("keyup", function (e) {
            var pattern = $("#txtFiltraCtas").val();
            if (pattern === lastPattern) {
                return;
            }
            lastPattern = pattern;
            var tree = $("#treeCuentas").treeview(true);
            fnResetTree();
            if (pattern.length < 3) { // avoid heavy operation
                $("#treeCuentas").treeview('clearSearch');
            } else {
                $("#treeCuentas").treeview("search", [pattern, {
                    ignoreCase: true,     // case insensitive
                    exactMatch: false,    // like or equals
                    revealResults: true,  // reveal matching nodes
                }]);
                // get all root nodes: node 0 who is assumed to be
                //   a root node, and all siblings of node 0.
                var roots = $("#treeCuentas").treeview("getSiblings", 0);
                roots.push($("#treeCuentas").treeview("getNode", 0));
                //first collect all nodes to disable, then call disable once.
                //  Calling disable on each of them directly is extremely slow! 
                var unrelated = collectUnrelated(roots);
                $("#treeCuentas").treeview("disableNode", [unrelated, { silent: true }]);
            }
            });
    };

    var collectUnrelated = function (nodes) {
        var unrelated = [];
        $.each(nodes, function (i, n) {
            if (!n.searchResult && !n.state.expanded) { // no hit, no parent
                unrelated.push(n.nodeId);
            }
            if (!n.searchResult && n.nodes) { // recurse for non-result children
                $.merge(unrelated, collectUnrelated(n.nodes));
            }
        });
        return unrelated;
    };
  
    var fnResetTree = function () {
        $("#treeCuentas").treeview('collapseAll', { silent: true });
        $("#treeCuentas").treeview('enableAll', { silent: true });
    };

    var fnEventClickNode = function (event, node) {
        let iNodeId = node.nodeId;
        $('#treeCuentas').treeview('toggleNodeExpanded', iNodeId);

        if (iNodeId === 0) {
            return;
        }

        let aoNode = node.nodes;
        if (aoNode !== undefined) {
            return;
        }

        if (iNodeSelectedId === null || iNodeUnSelectedId === null) {
            return;
        }

        // let iNroMilisegTotal = Math.abs(iNroMiliseNodeUnSelected - iNroMiliseNodeSelected);
        // if (iNodeSelectedId === iNodeUnSelectedId && iNroMilisegTotal < 300) {
        //     fnSeleccionarCCosto(node);
        // }
    };
    
    var fnCargarTablaDestino = function () {
        var parms = {            
            data: null,
            columns: [
                {
                    data: "DEBE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left")
                    }
                },
                {
                    data: "HABER",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left")
                    }
                },
                {
                    data: "PORCENTAJE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center")
                    }
                }
            ],
            "searching": false,
            "paging": false,
            "ordering": false,
            "info": false
        }

        oTableDestinoCuentas = iniciaTabla("tblCtasDestino", parms);
        $("#tblCtasDestino").removeAttr("style");
       


        $("#tblCtasDestino tbody").on("click", "tr", function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableDestinoCuentas.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTableDestinoCuentas.fnGetPosition(this);
                var row = oTableDestinoCuentas.fnGetData(pos);
                objElimCuenta = row;                                
            }
        });       
      
    };

    var fnCargarModalCuentasDestino = function () {
        Bloquear("ventana");

        var sCodPlanContable = $("#cboPlanContable").val();
        var sCuentaDestino = $("#txtCuentaDestino").val();
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=7&sCodPlanContable=" + sCodPlanContable + "&sCuenta=" + sCuentaDestino + "&sEstado=A&sCuentaAsiento=S",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                var oCuentas = JSON.parse(datos);
                $("#tituloModal").html("LISTA DE CUENTAS");
                if (isEmpty(oCuentas)) {
                    Desbloquear("ventana");
                    $("#divModalContenido").html("<div class='span12'><div class='alert alert-block alert-info fade in'><h4 class='alert-heading'>Info!</h4><p>No se encontrarón Datos.</b></p></div></div>");
                    return;
                }

                var sTabla = "";
                sTabla += ("<table id='tablaModal' class='display DTTT_selectable bordered' border='0' >");
                sTabla += ("<thead>");
                sTabla += ("<tr align='center'>");
                sTabla += ("<th>Cuenta</th>");
                sTabla += ("<th>Descripcion</th>");
                sTabla += ("</tr>");
                sTabla += ("</thead>");

                sTabla = sTabla + ("<tbody>");
                $.each(oCuentas, function (key, value) {
                    sTabla += ("<tr>");
                    sTabla += ("<td>" + value.cCuenta + "</td>");
                    sTabla += ("<td>" + value.cDescripcion + "</td>");
                    sTabla += ("</tr>");
                });
                sTabla += ("</tbody>");
                sTabla += ("</table>");

                $("#divModalContenido").html(sTabla);
                $("#divModalPie").html("Reg(s): " + oCuentas.length);

                Desbloquear("ventana");

                var oTablaModal = $("#tablaModal").dataTable({
                    scrollY: '30vh',
                    scrollCollapse: true,
                    paging: false,
                    ordering: false,
                    info: false
                });

                $("#tablaModal tbody tr").on("click", function () {
                    if ($(this).hasClass("selected"))
                        $(this).removeClass("selected");
                    else {
                        oTablaModal.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    }

                    $("#divModal").modal("hide");
                    var sCuenta = $(this).find("td").eq(0).html();
                    var sDescripcion = $(this).find("td").eq(1).html();

                    $("#txtCuentaDestino").val(sCuenta);
                    $("#txtCtaDestDescrip").val(sDescripcion);
                });
            },
            error: function (msg) {
                alertCustom("Error al obtener Lista de Cuentas.");
                Desbloquear("ventana");
            }
        });
    };
    
    var fnAgregarCtaDestino = function () {
        if (!vErrors(["cboPlanContable", "txtCuentaDestino", "txtPorcentaje"]))
            return;

        var sCodPlanContable = $("#cboPlanContable").val();
        var sCuentaDestino = $("#txtCuentaDestino").val();
        var nPorcentaje = $("#txtPorcentaje").val();

        var oCuentaHoja = fnGetCuentaContableHoja(sCodPlanContable, sCuentaDestino);
        if (isEmpty(oCuentaHoja)) {
            infoCustom2("¡Imposible Agregar Cuenta Destino! La Cuenta Destino no es válida. Posiblemente la Cuenta Destino no existe o no es de Último Nivel");
            return;
        }

        var sEstado = oCuentaHoja[0].Estado;
        if (sEstado === 'I') {
            infoCustom2("¡Imposible Agregar Cuenta Destino! La Cuenta Destino está Inactiva.");
            return;
        }

        var sCuentaAsiento = oCuentaHoja[0].CuentaAsiento;
        if (sEstado === 'N') {
            infoCustom2("¡Imposible Agregar Cuenta Destino! La Cuenta Destino no está marcada como Cuenta de Asiento.");
            return;
        }

        if (isNaN(nPorcentaje)) {
            infoCustom2("¡Imposible Agregar Cuenta Destino! El valor del Porcentaje no es válido.");
            return;
        }

        nPorcentaje = parseFloat(nPorcentaje);
        if (nPorcentaje === 0) {
            infoCustom2("¡Imposible Agregar Cuenta Destino! El valor del Porcentaje debe ser mayor a cero.");
            return;
        }

        if (nPorcentaje > 100) {
            infoCustom2("¡Imposible Agregar Cuenta Destino! El valor del Porcentaje no debe ser mayor a cien.");
            return;
        }



        var sCodPlanContable = oCuentaHoja[0].CodPlanContable;
        var sCuenta = oCuentaHoja[0].cCuenta;
        var sDescripcion = oCuentaHoja[0].cDescripcion;
        var nPorcentajeDebe = 0;
        var nPorcentajeHaber = 0;
        var bTipoMov = $("#rbtnHaber").is(":checked");
        if (bTipoMov)
            nPorcentajeHaber = nPorcentaje;
        else
            nPorcentajeDebe = nPorcentaje;

        fnAgregarFila(sCodPlanContable, sCuenta, sDescripcion, nPorcentajeDebe, nPorcentajeHaber);
    };

    var fnAgregarFila = function (sCodPlanContable, sCuenta, sDescripcion, nPorcentajeDebe, nPorcentajeHaber) {
        var sFila = "";

        sFila += ("<tr>");
        sFila += ("<td class='cuenta' data-codplancontable='" + sCodPlanContable + "' style='text-align:right; font-weight:bold;'>" + sCuenta + "</td>");
        sFila += ("<td class='descripcion'>" + sDescripcion + "</td>");
        sFila += ("<td class='porcentajedebe' style='text-align:center; font-weight:bold;'>" + (nPorcentajeDebe === 0 ? "" : nPorcentajeDebe.Redondear()) + "</td>");
        sFila += ("<td class='porcentajehaber' style='text-align:center; font-weight:bold;'>" + (nPorcentajeHaber === 0 ? "" : nPorcentajeHaber.Redondear()) + "</td>");
        sFila += "<td class='Ocultar' style='text-align:center;'><a class='btn red eliminar'><i class=icon-trash></i></a></td>";
        sFila += ("</tr>");
       
    };
    
    var fnHabilitarControles = function () {
        if (eEstadoActual === eEstado.Nuevo) {
            BloquearSinGif("#PlanContab");
            Desbloquear("DatosDetCuenta");
            $("#btnNuevo").attr("disabled", true);
            $("#btnEditar").attr("disabled", true);
            $("#btnCancelar2").attr("disabled", false);
            $("#txtCuenta").attr("disabled", false);
            DesbloquearSinGif(".Bloquear");
        } else if (eEstadoActual === eEstado.Editar) {
            //BloquearSinGif("#PlanContab");
            Desbloquear("DatosDetCuenta");
            $("#btnNuevo").attr("disabled", true);
            $("#btnEditar").attr("disabled", true);
            $("#btnCancelar2").attr("disabled", false);
            $("#txtCuenta").attr("disabled", true);
            //if (bEsCuentaHoja)
            //    DesbloquearSinGif(".Bloquear");
            //else
            //    BloquearSinGif(".Bloquear");
        } else if (eEstadoActual === eEstado.Ninguno) {
            Desbloquear("PlanContab");
            BloquearSinGif("#DatosDetCuenta");
            $("#btnNuevo").attr("disabled", false);
            $("#btnEditar").attr("disabled", false);
            $("#btnCancelar2").attr("disabled", true);
            $("#txtCuenta").attr("disabled", false);
            DesbloquearSinGif(".Bloquear");
        }
    };

    var editaTabla = function () {

        oTableDestinoCuentas.makeEditable({

            sUpdateURL: function (value, settings) {
                return (value);
            },
            "aoColumns": [
                null, null,
                {
                    cssclass: "required number monto",
                    tooltip: 'Doble Click para cambiar',
                    type: 'text',
                    onblur: 'submit'
                }
            ],
            fnOnEditing: function (input, settings, original) {                               
                if ($(input.parents("form")[0]).hasClass("monto")) {
                    
                    if (parseFloat(input[0].value) < 0) {
                        return false;
                    } else {
                        return true;
                    }
                    

                }                

            }
        });
    };

    var fnCargarComboCuentasContables = function () {//DPORTA 14/09/2021

        $("#cboCtaContable").html("<option></option>");

        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + $('#ctl00_hddctlg').val() + "&P_CUEN_CODE=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos)) {
                    return;
                }
                for (var i = 0; i < datos.length; i++) {
                    $("#cboCtaContable").append(`<option value="${datos[i].CUENTA}" data-ctaid="${datos[i].ID_CUENTA}">${datos[i].CUENTA} - ${datos[i].DESCRIPCION}</option>`);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fnCargaInicial = function () {
        //Configuracion del Tamaño del Arbol de las Cuentas
        var nAlturaDiv = $("#planCont").height();
        nAlturaDiv = parseInt(0.60 * nAlturaDiv);
        $("#PlanContab").css("max-height", nAlturaDiv);
        $("#PlanContab").css("overflow-y", "scroll");
        // $("#DetCuenta").css("max-height", nAlturaDiv);
        // $("#DetCuenta").css("overflow-y", "scroll");
        
        BloquearSinGif("#DatosDetCuenta");

        $(".centro").css("text-align", "center");

        var sCodEmpresa = $("#ctl00_hddctlg").val(); //mGetCodEmpresaSesion();
        $("#").val(sCodEmpresa).change();

        $("#btnlistarpc").click();

        let sCodCuenta = getCookie('sCuenta');
        let sDescripcion = getCookie('sDescripcion');

        //console.log(sCodCuenta);
        //console.log(sDescripcion);
        
        if (sCodCuenta !== '' || sDescripcion !== ''){
            if (sCodCuenta !== undefined && sDescripcion !== undefined) {
                sDescripcion = sDescripcion.replace(/%20/g, " ");
                vNodo = $("#treeCuentas").treeview("search", [sCodCuenta + " - " + sDescripcion, {}]);
                $("#treeCuentas").treeview("clearSearch");
                $("#treeCuentas").treeview("selectNode", vNodo);
            }

            deleteCookie('sCuenta');
            deleteCookie('sCodCuenta');
            deleteCookie('sDescripcion');
        }

    };

    return {
        init: function () {

            fnCargarPlugins();
            fnCargarParametros();
            fnCargarEventoControles();
            fnCargarTablaDestino();            
            fnCargarCombos();                        
            fnCargaInicial();
        }
    };

}();

var CTLCUCO = function () {

    var fnCargarPlugins = function () {        
        $("#cboPlanContable").select2();
        $("#cboEmpresa").select2();
    };

    var actualizarEstilos = function () {
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").css("margin-bottom", "10px");
        $(".ColVis_Button, .TableTools_Button ColVis_MasterButton").addClass("btn green");
        $("TableTools_Button").css("float", "left");
        $(".DTTT.btn-group").addClass("pull-right");
    }

    var fillCboPlanContable = function () {
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMNIPL.ASHX?sOpcion=2&sCodPlanContable=&sEstado=A&emp=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                //console.log(datos);
                $('#cboPlanContable').empty();
                $('#cboPlanContable').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        var sNiveles = "";
                        var iNroNiveles = datos[i].NroNiveles;
                        var sDigitosNiveles = datos[i].DigitosNiveles;
                        var asDigitosNiveles = sDigitosNiveles.split(",");
                        for (var j = 1; j <= iNroNiveles; j++) {
                            sNiveles += " nivel" + j + "='" + asDigitosNiveles[j - 1] + "'";
                        }                        

                        $('#cboPlanContable').append('<option value="' + datos[i].CodPlanContable + '"  nivel="' + datos[i].NroNiveles + '"  valueDescripTipoPlan="' + datos[i].TipoPlanContab + '"' + sNiveles + '" determinado = "' + datos[i].Predeterminado + '">' + datos[i].NombrePlanContab + '</option>');
                        $('#cboPlanContable').select2('val', "");
                    }

                    $("#cboPlanContable > option").each(function () {                                 
                        let predeter = $('#cboPlanContable [value="' + this.value + '"]').attr('determinado');
                        if (predeter == 'S') {
                            $("#cboPlanContable").val(this.value).change();
                         
                        }
                    });
                } else {
                    $('#cboPlanContable').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    //Lista de Clases Contables
    var fnListaClasesContables = function () {
        var oClasesContable = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMCLCC.ashx?sOpcion=3&sEstado=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oClasesContable = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los Datos de las Clases Contables.");
            }
        });
        return oClasesContable;
    };

    
    var fnCargarBandeja = function () {
        var parms = {
            aLengthMenu: [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "Todos"]
            ],
            data: null,
            columns: [
                
                {
                    data: "Cuenta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left")
                    }
                },
                {
                    data: "DescripCuenta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left")
                    }
                },
                {
                    data: "DescripClaseCuenta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center")
                    }
                },
                 {
                     data: "Nivel",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr("align", "center")
                     }
                 },
                 {
                     data: "TipoCambio",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr("align", "center")
                     }
                },
                {
                    data: "CentroCosto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center")
                        if (cellData === "S")
                            $(td).html("SI");
                        else
                            $(td).html("NO");
                    },
                },
                {
                    data: "Destino",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center")
                        if (cellData === "S")
                            $(td).html("SI");
                        else
                            $(td).html("NO");
                    },
                },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center")
                        if (cellData === "A")
                            $(td).html("ACTIVO");
                        else
                            $(td).html("INACTIVO");
                    }
                },
                {
                    data: "CodEstereotipo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center")
                        if (cellData === "SU")
                            $(td).html("SI USAR");
                        else
                            $(td).html("NO USAR");
                    },
                },
                {
                    data: null,
                    defaultContent: "<a class='btn green'><i class='icon-refresh'></i></a>",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    }
                },
                {
                    data: null,
                    defaultContent: "<b class='btn black'><i class='icon-refresh'></i></a>",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    }
                }
            ],
            "sDom": 'TC<"clear">lfrtip',
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
        }

        oTablePlanCuentas = iniciaTabla("tblPlanCuentas", parms);
        $("#tblPlanCuentas").removeAttr("style");
        actualizarEstilos();
        //Obtenemos Lista de Clases de Cuenta y lo pasamos a un Array
        var aoClasesContable = fnListaClasesContables();
        var aClasesContables = [];
        $.each(aoClasesContable, function (iKey, oValue) {
            aClasesContables.push(oValue.cDescripcion);
        });

        //Agregamos los tipos de controles para los filtros
        $("#tblPlanCuentas").dataTable().columnFilter({
            aoColumns: [                
                { type: "text" },
                { type: "text" },
                { type: "select", values: aClasesContables },                
                //{ type: "number" },
                { type: "select", values: Array.from({ length: nroNivelesPlanContable }, (_, i) => i + 1) },
                { type: "text" },
                { type: "select", values: ["S", "N"] },
                { type: "select", values: ["S", "N"] },
                { type: "select", values: ["A", "I"] },
                { type: "select", values: ["SU", "NU"] },
                null,
                null
            ]
        });

        //Editamos el texto de los combos que se usan en los filtros
        $("#tblPlanCuentas_wrapper tfoot select option[value='S']").text("SI");
        $("#tblPlanCuentas_wrapper tfoot select option[value='N']").text("NO");
        $("#tblPlanCuentas_wrapper tfoot select option[value='SU']").text("SI USAR");
        $("#tblPlanCuentas_wrapper tfoot select option[value='NU']").text("NO USAR");
        $("#tblPlanCuentas_wrapper tfoot select option[value='A']").text("ACTIVO");
        $("#tblPlanCuentas_wrapper tfoot select option[value='I']").text("INACTIVO");

        //Sobreescrimos el div de busqueda predeterminada agregando un boton para limpiar los filtros
        $("#tblPlanCuentas_filter").html("<a id='btnQuitarFiltros' class='btn green'><i class='icon-remove'></i>Quitar Filtros</a>");
        $("#btnQuitarFiltros").on("click", function () {
            $("#tblPlanCuentas_wrapper tfoot input").val("");
            $("#tblPlanCuentas_wrapper tfoot select").val("");
            oTablePlanCuentas.DataTable().search("").columns().search("").draw();
        });

        //Agregamos los placeholder a las cajas de texto de los filtros
        $("#tblPlanCuentas_wrapper tfoot input").each(function () {
            $(this).attr("placeholder", $(this).attr("value"));
        });

        // modificamos la caja de texto del buscador
        //$("#tblPlanCuentas_wrapper .dataTables_filter input").addClass("m-wrap medium");

        // modificamos el combo de paginacion
        $("#tblPlanCuentas_wrapper .dataTables_length select").addClass("m-wrap xsmall");

        // modificamos el tamaño de las caja de texto de los filtros
        var vInputBusq = $("#tblPlanCuentas_wrapper tfoot input");
        $(vInputBusq[0]).addClass("m-wrap small");
        $(vInputBusq[1]).addClass("m-wrap small");
        $(vInputBusq[2]).addClass("m-wrap xsmall");
        $(vInputBusq[3]).addClass("m-wrap xsmall");

        // modificamos el tamaño de los combos de los filtros
        var vSelectBusq = $("#tblPlanCuentas_wrapper tfoot select");
        $(vSelectBusq[0]).addClass("m-wrap small");
        $(vSelectBusq[1]).addClass("m-wrap xsmall");
        $(vSelectBusq[2]).addClass("m-wrap xsmall");
        $(vSelectBusq[3]).addClass("m-wrap xsmall");
        
        //ponemos los filtros encima de las cabeceras de columnas de la Tabla
        $(".dataTables_scrollFoot").insertAfter($(".dataTables_scrollHead"));


        $("#tblPlanCuentas tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                oTablePlanCuentas.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
                var pos = oTablePlanCuentas.fnGetPosition(this);
                var row = oTablePlanCuentas.fnGetData(pos);
                var sCuenta = row.Cuenta;
                var sCodPlanContable = row.CodPlanContable;
                var sDescripcion = row.DescripCuenta;

                setCookie('sCuenta', sCuenta, 0.5);
                setCookie('sDescripcion', sDescripcion, 0.5);

                window.open("?f=CTMCUCO", '_blank');

                
            }
        });

        $("#tblPlanCuentas tbody").on("click", "a", function () {
            $(this).parent().parent().addClass("selected");

            var pos = oTablePlanCuentas.api(true).row($(this).parent().parent()).index();
            var row = oTablePlanCuentas.fnGetData(pos);
            var sCuenta = row.Cuenta;
            var sCodPlanContable = row.CodPlanContable;

            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMCUCO.ASHX?sOpcion=4&sCuenta=" + sCuenta + "&sCodPlanContable=" + sCodPlanContable,
                async: false,
                success: function (response) {
                    if (response == "") {
                        noexito();
                        return;
                    }

                    if (response.indexOf("[Advertencia]:") > -1) {
                        infoCustom2(response);
                        return;
                    }

                    if (response.indexOf("[Error]:") > -1) {
                        sException = response;
                        noexito();
                        return;
                    }
                    oTablePlanCuentas.fnGetData(pos).Estado = response;
                    refrescaTabla(oTablePlanCuentas);
                    exito();
                },
                error: function (msg) {
                    noexito();
                }
            });
            Desbloquear("ventana");
        });

        $("#tblPlanCuentas tbody").on("click", "b", function () {
            $(this).parent().parent().addClass("selected");

            var pos = oTablePlanCuentas.api(true).row($(this).parent().parent()).index();
            var row = oTablePlanCuentas.fnGetData(pos);
            var sCuenta = row.Cuenta;
            var sCodPlanContable = row.CodPlanContable;

            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMCUCO.ASHX?sOpcion=4.5&sCuenta=" + sCuenta + "&sCodPlanContable=" + sCodPlanContable,
                async: false,
                success: function (response) {
                    if (response == "") {
                        noexito();
                        return;
                    }

                    if (response.indexOf("[Advertencia]:") > -1) {
                        infoCustom2(response);
                        return;
                    }

                    if (response.indexOf("[Error]:") > -1) {
                        sException = response;
                        noexito();
                        return;
                    }
                    oTablePlanCuentas.fnGetData(pos).CodEstereotipo = response;
                    refrescaTabla(oTablePlanCuentas);
                    exito();
                },
                error: function (msg) {
                    noexito();
                }
            });
            Desbloquear("ventana");
        });
    };

    var fnCargarDatos = function (sCodPlanContable) {
        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMCUCO.ASHX?sOpcion=3&sCodPlanContable=" + sCodPlanContable,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                oTablePlanCuentas.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTablePlanCuentas.fnAddData(datos);
                Desbloquear("ventana");
            },
            error: function (result) {
                alertCustom("No se pudo recuperar el Plan de Cuentas.");
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    };
    

    var fnCargarComboNiveles = function () {
        var nNroNiveles = $("#cboPlanContable :selected").attr("nroNiveles");
        $("#cboNiveles").html("<option value = '0'>TODOS</option>");
        for (var i = 1; i <= nNroNiveles; i++) {
            var nValorNivel = $("#cboPlanContable :selected").attr("nivel" + i);
            $("#cboNiveles").append("<option value='" + nValorNivel + "'>" + i + "</option>");
        }
    };

    var fnCargarEventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            Bloquear("ventana");
            //$("#cboPlanContable").empty();
            fillCboPlanContable();
            oTablePlanCuentas.fnClearTable();
            Desbloquear("ventana");
        });

        $("#cboPlanContable").on("change", function () {            
            //fnCargarComboNiveles();
            nroNivelesPlanContable = 0;
            if(!isNaN($("#cboPlanContable :selected").attr("nivel")))
                nroNivelesPlanContable = parseInt($("#cboPlanContable :selected").attr("nivel"));

            fnCargarBandeja();

            var sCodPlanContable = $("#cboPlanContable").val();
            fnCargarDatos(sCodPlanContable);
        });
    };

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
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
                    if (ObtenerQueryString("ctlg") == undefined) {
                        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());
                    } else {
                        $("#cboEmpresa").select2("val", ObtenerQueryString("ctlg"));
                    }
                    fillCboPlanContable();

                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    function cargainicial() {
    };

    return {
        init: function () {            
            fnCargarPlugins();
            cargainicial();
            fnCargarEventoControles();
            fillCboEmpresa();
            //fillCboPlanContable();
            
            
        }
    };
}();

function Cancelar() {
    window.location.href = "?f=ADMCUSO";
}



var CTMDICU = function () {
    var eEstado = { Ninguno: 0, Nuevo: 1, Editar: 2 };
    var eEstadoActual = eEstado.Ninguno;
    var sCodPlanContable = "";
    var sCodTipoOperacionEgreso = "";

    var fnCargarParametros = function () {
        sCodPlanContable = mGetParametro("PCGE", "CODIGO PLAN CONTABLE EMPRESA");
        sCodTipoOperacionEgreso = mGetParametro("CTOE", "CODIGO TIPO DE OPERACION EGRESO");
    };

    var fnCargarPlugins = function () {
        $(".ComboBox").select2();
    };

    var fnCargarCombos = function () {
        //Carga Libros Contables
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMLICO.ASHX?sOpcion=3&sEstado=A",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                var oLibroContable = JSON.parse(datos);
                if (isEmpty(oLibroContable))
                    return;
                $("#cboLibroContable").html("<option></option>");
                $.each(oLibroContable, function (key, value) {
                    $("#cboLibroContable").append("<option value='" + value.CodLibro + "'>" + value.cDescripcion + "</option>");
                });
            },
            error: function (msg) {
                alert(msg);
            }
        });

        //Carga Monedas
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMMONE.ASHX?Opcion=4",
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos))
                    return;
                var oTipoMoneda = datos;
                $("#cboTipoMoneda").html("<option></option>");
                $.each(oTipoMoneda, function (key, value) {
                    $("#cboTipoMoneda").append("<option value='" + value.CODIGO +
                        "' valueSimbMoneda='" + value.SIMBOLO + "'>" + value.DESCRIPCION + "</option>");
                });
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fnCargarEventos = function () {
        $("#btnBuscarOperacion").on("click", function () {
            fnCargarOperaciones();
            $("#divModalBusqueda").modal("show");
        });

        $("#linkModalCuentas").on("click", function () {
            if (!vErrors(["txtCuenta"]))
                return;
            fnCargarModalCuentas();
            $("#divModal").modal("show");
        });

        $("#btnAgregaCuenta").on("click", function () {
            fnAgregarCuenta();
            fnListarCuentasDestinos();
            $("#txtCuenta").val("");
            $("#txtCuentaDescrip").val("");
        });
        
        $("#tblCuentas tbody").on("click", ".eliminar", function () {
            var oTr = $(this).parent().parent();
            oTr.remove();
            fnListarCuentasDestinos();
        });

        $("#btnGrabar").on("click", function () {
            fnGrabar();
        });

        $("#btnCancelar").on("click", function () {
            window.location.href = "?f=CTMDICU";
        });
    };

    var fnCargarOperaciones = function () {
        var sCodOperacion = "";
        var oOperaciones = fnGetOperacion(sCodOperacion);
        $("#divModalBusqueda h3").html("Lista de Operaciones");
        if (isEmpty(oOperaciones)) {
            Desbloquear("ventana");
            $("#divModalBusqueda .modal-body").html("<div class='row-fluid'><div class='span12'><div class='alert alert-block alert-info fade in'><h4 class='alert-heading'>Info!</h4><p>No se encontrarón Datos.</b></p></div></div></div>");
            return;
        }

        var sTabla = "<div class='row-fluid'>";
        sTabla += "<div class='span12'>";
        sTabla += ("<table id='tblOperaciones' class='display DTTT_selectable bordered' border='0' >");
        sTabla += ("<tfoot>");
        sTabla += ("<tr align='center'>");
        sTabla += ("<th>Código</th>");
        sTabla += ("<th>Tipo</th>");
        sTabla += ("<th>Descripción</th>");
        sTabla += ("</tr>");
        sTabla += ("</tfoot>");

        sTabla += ("<thead>");
        sTabla += ("<tr align='center'>");
        sTabla += ("<th>Código</th>");
        sTabla += ("<th>Tipo</th>");
        sTabla += ("<th>Descripción</th>");
        sTabla += ("</tr>");
        sTabla += ("</thead>");

        sTabla += ("<tbody>");
        $.each(oOperaciones, function (key, value) {
            sTabla += ("<tr>");
            sTabla += ("<td>" + value.CODIGO + "</td>");
            sTabla += ("<td>" + value.DESC_TIPOOP + "</td>");
            sTabla += ("<td>" + value.DESCRIPCION_OP + "</td>");
            sTabla += ("</tr>");
        });
        sTabla += ("</tbody>");
        sTabla += ("</table>");
        sTabla += ("</div>");
        sTabla += ("</div>");

        $("#divModalBusqueda .modal-body").html(sTabla);
        $("#divModalBusqueda .modal-footer").html("Reg(s): " + oOperaciones.length);
        $("#divModalBusqueda .oculto").hide();

        var oTablaModal = $("#tblOperaciones").dataTable({ });

        $("#tblOperaciones").removeAttr("style");

        //Agregamos los tipos de controles para los filtros
        $("#tblOperaciones").dataTable().columnFilter({
            aoColumns: [
                { type: "text" },
                { type: "text" },
                { type: "text" }
            ]
        });

        //Sobreescrimos el div de busqueda predeterminada agregando un boton para limpiar los filtros
        $("#tblOperaciones_filter").html("");

        // modificamos la caja de texto del buscador
        //$("#tblPlanCuentas_wrapper .dataTables_filter input").addClass("m-wrap medium");

        // modificamos el combo de paginacion
        $("#tblOperaciones_wrapper .dataTables_length select").addClass("m-wrap xsmall");

        // modificamos el tamaño de las caja de texto de los filtros
        var vInputBusq = $("#tblOperaciones_wrapper tfoot input");
        $(vInputBusq[0]).addClass("m-wrap xsmall");
        $(vInputBusq[1]).addClass("m-wrap small");
        $(vInputBusq[2]).addClass("m-wrap medium");

        //ponemos los filtros encima de las cabeceras de columnas de la Tabla
        $("#tblOperaciones tfoot").css("display", "table-header-group");

        $("#tblOperaciones tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected"))
                $(this).removeClass("selected");
            else {
                oTablaModal.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }

            $("#divModalBusqueda").modal("hide");

            var sCodOperacion = $(this).find("td").eq(0).html();
            oOperaciones = {};
            oOperaciones = fnGetOperacion(sCodOperacion);

            sCodOperacion = oOperaciones[0].CODIGO;
            var sTipoOperacion = oOperaciones[0].DESC_TIPOOP;
            var sOperacion = oOperaciones[0].DESCRIPCION_OP;

            $("#txtCodOperacion").val(sCodOperacion);
            $("#txtTipoOperacion").val(sTipoOperacion);
            $("#txtOperacion").val(sOperacion);
            $("#txtDescripcion").val("ASIENTO " + sOperacion);
            
        });

        Desbloquear("ventana");
    };
    
    var fnGetOperacion = function (sCodOperacion) {
        var oOperaciones = {};
        Bloquear("ventana");
        $.ajax({
            type: "POST",
            //url: "vistas/OP/ajax/OPMOPER.ashx?OPCION=LOPU&ESTADO_IND=A&OPR_CODE=" + sCodOperacion + "&OPER_CODE=" + sCodTipoOperacionEgreso,
            url: "vistas/OP/ajax/OPMOPER.ashx?OPCION=LOPU&ESTADO_IND=A&OPR_CODE=" + sCodOperacion,
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (!isEmpty(datos))
                    oOperaciones = datos;

                Desbloquear("ventana");
            },
            error: function (msg) {
                alertCustom("Error al obtener Lista de Solicitudes de Retiro.");
                Desbloquear("ventana");
            }
        });
        return oOperaciones;
    };

    var fnCargarModalCuentas = function () {
        Bloquear("ventana");

        var sCuenta = $("#txtCuenta").val();
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=7&sCodPlanContable=" + sCodPlanContable + "&sCuenta=" + sCuenta + "&sEstado=A&sCuentaAsiento=S",
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

                    $("#txtCuenta").val(sCuenta);
                    $("#txtCuentaDescrip").val(sDescripcion);
                });
            },
            error: function (msg) {
                alertCustom("Error al obtener Lista de Cuentas.");
                Desbloquear("ventana");
            }
        });
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
    
    var fnListaDinamicaCuentaDet = function (sCodOperacion, sCodTipoMoneda) {
        sCodOperacion = (sCodOperacion === undefined ? "" : sCodOperacion);
        sCodTipoMoneda = (sCodTipoMoneda === undefined ? "" : sCodTipoMoneda);
        var oDinamicaCuentaDet = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMDICU.ashx?sOpcion=5&sCodOperacion=" + sCodOperacion + "&sCodTipoMoneda=" + sCodTipoMoneda,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oDinamicaCuentaDet = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Detalle de Cuentas.");
            }
        });
        return oDinamicaCuentaDet;
    };
    
    var fnListaCuentasDestino = function (sCodPlanContable, sCuenta) {
        sCuenta = (sCuenta === undefined ? "" : sCuenta);
        var oCuentaDestino = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMCUCO.ashx?sOpcion=8&sCodPlanContable=" + sCodPlanContable + "&sCuenta=" + sCuenta,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oCuentaDestino = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar los Datos de las Cuentas Destino.");
            }
        });
        return oCuentaDestino;
    };

    var fnExisteDinamicaCuentaDet = function (sCodLibro, sCodTipoMoneda, sCodDinamicaCuenta, sJsonDinamicaCuentaDet) {        
        var oDinamicaCuentaDet = {};
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMDICU.ASHX?sOpcion=6&sCodLibro=" + sCodLibro + "&sCodTipoMoneda="+sCodTipoMoneda+"&sCodDinamicaCuenta="+sCodDinamicaCuenta+"&sJsonDinamicaCuentaDet=" + sJsonDinamicaCuentaDet,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos.indexOf("[Error]:") > -1)
                    oDinamicaCuentaDet = {};
                 else
                    oDinamicaCuentaDet = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo verificar la Existencia del Detalle de Cuentas.");
            }
        });
        return oDinamicaCuentaDet;
    }

    var fnAgregarCuenta = function () {
        if (!vErrors(["txtCuenta"]))
            return;

        var sCuenta = $("#txtCuenta").val();
        var sDescripcionCuenta = $("#txtCuentaDescrip").val();

        var oCuentaHoja = fnGetCuentaContableHoja(sCodPlanContable, sCuenta);
        if (isEmpty(oCuentaHoja)) {
            alertCustom("¡Imposible Agregar Cuenta! La Cuenta no es válida. Posiblemente la Cuenta no existe o no es de Último Nivel");
            return;
        }

        var sEstado = oCuentaHoja[0].Estado;
        if (sEstado === 'I') {
            alertCustom("¡Imposible Agregar Cuenta! La Cuenta está Inactiva.");
            return;
        }

        var sCuentaAsiento = oCuentaHoja[0].CuentaAsiento;
        if (sEstado === 'N') {
            alertCustom("¡Imposible Agregar Cuenta! La Cuenta no está marcada como Cuenta de Asiento.");
            return;
        }

        var bExisteCuenta = false;

        $("#tblCuentas tbody tr").each(function () {
            var sCuentaTemp = $(this).find("td").eq(0).text();
            if (sCuentaTemp === sCuenta) {
                bExisteCuenta = true;
                return;
            }
        });

        if (bExisteCuenta) {
            alertCustom("La Cuenta ya existe en la Lista.");
            return;
        }

        var bTipoMov = $("#rbtnHaber").is(":checked");
        var sDebe = "";
        var sHaber = "";
        if (bTipoMov)
            sHaber = "X";
        else
            sDebe = "X";

        fnAgregarFila(sCuenta, sDescripcionCuenta, sDebe, sHaber);
    };

    var fnAgregarFila = function (sCuenta, sDescripcionCuenta, sDebe, sHaber) {
        var sFila = "";

        sFila += ("<tr>");
        sFila += ("<td style='text-align:right; font-weight:bold;'>" + sCuenta + "</td>");
        sFila += ("<td>" + sDescripcionCuenta + "</td>");
        sFila += ("<td style='text-align:center; font-weight:bold;'>" + sDebe + "</td>");
        sFila += ("<td style='text-align:center; font-weight:bold;'>" + sHaber + "</td>");
        sFila += "<td class='Ocultar' style='text-align:center;'><a class='btn red eliminar'><i class=icon-trash></i></a></td>";
        sFila += ("</tr>");

        $("#tblCuentas tbody").append(sFila);
    };
    
    var fnListarCuentasDestinos = function () {
        $(".CtaDestino").hide();
        $("#tblCtasDestino tbody").html("");
        $("#tblCuentas tbody tr").each(function () {
            var sCuenta = $(this).find("td").eq(0).text();
            var sDescripcionCuenta = $(this).find("td").eq(1).text();

            var oCuentaDestino = fnListaCuentasDestino(sCodPlanContable, sCuenta);
            if (!isEmpty(oCuentaDestino)) {
                $(".CtaDestino").show();
                fnAgregarFilaTituloCtaDestino(sCuenta, sDescripcionCuenta);
                $.each(oCuentaDestino, function (key, value) {
                    var sCuentaDestino = value.CodCuentaDestino;
                    var sDescripcionCuentaDestino = value.CuentaDestino;
                    var sTipoMov = value.TipoMov;
                    var sDebe = (sTipoMov === "D" ? "X" : "");
                    var sHaber = (sTipoMov === "H" ? "X" : "");
                    var nPorcentaje = value.Porcentaje.toFixed(2);
                    fnAgregarFilaCtaDestino(sCuentaDestino, sDescripcionCuentaDestino, sDebe, sHaber, nPorcentaje);
                });
            }
        });
    };

    var fnAgregarFilaTituloCtaDestino = function (sCuenta, sDescripcionCuenta) {
        var sFila = "";
        sFila += ("<tr>");
        sFila += ("<td colspan='5' style='text-align:center; font-weight:bold; background: rgb(220, 220, 220);'>" + sCuenta + " - " + sDescripcionCuenta + "</td>");
        sFila += ("</tr>");
        $("#tblCtasDestino tbody").append(sFila);
    };

    var fnAgregarFilaCtaDestino = function (sCuenta, sDescripcionCuenta, sDebe, sHaber, nPorcentaje) {
        var sFila = "";
        sFila += ("<tr>");
        sFila += ("<td style='text-align:right; font-weight:bold;'>" + sCuenta + "</td>");
        sFila += ("<td>" + sDescripcionCuenta + "</td>");
        sFila += ("<td style='text-align:center; font-weight:bold;'>" + sDebe + "</td>");
        sFila += ("<td style='text-align:center; font-weight:bold;'>" + sHaber + "</td>");
        sFila += ("<td style='text-align:right;'>" + nPorcentaje + "</td>");
        sFila += ("</tr>");

        $("#tblCtasDestino tbody").append(sFila);

        //$("#tblCtasDestino tbody").on("click", ".eliminar", function () {
        //    var oTr = $(this).parent().parent();
        //    oTr.remove();
        //});
    };

    var fnErrorValidacion = function () {
        if (eEstadoActual !== eEstado.Nuevo && eEstadoActual !== eEstado.Editar) {
            alertCustom("El Asiento no se registró.");
            return;
        }

        if (!vErrors(["txtCodOperacion", "cboTipoMoneda", "cboLibroContable", "txtDescripcion"]))
            return;

        var nNroCuentas = $("#tblCuentas tbody tr").length;
        if (nNroCuentas === 0) {
            alertCustom("Debe agregar las Cuentas del Asiento.");
            return true;
        }

        var nNroItemsDebe = 0;
        var nNroItemsHaber = 0;
        var asCuentas = [];
        $("#tblCuentas tbody tr").each(function () {
            var sCuenta = $(this).find("td").eq(0).text();
            asCuentas.push(sCuenta);

            var sDebe = $(this).find("td").eq(2).text();
            if (sDebe === "X")
                nNroItemsDebe = nNroItemsDebe + 1;
            else
                nNroItemsHaber = nNroItemsHaber + 1;
        });

        var asCuentasSinRepetidos = [];
        $.each(asCuentas, function (i, sCuenta) {
            if ($.inArray(sCuenta, asCuentasSinRepetidos) === -1) asCuentasSinRepetidos.push(sCuenta);
        });

        if (asCuentas.length !== asCuentasSinRepetidos.length) {
            alertCustom("Existen Cuentas Repetidas.");
            return true;
        }

        if (nNroItemsDebe !== nNroItemsHaber) {
            alertCustom("El Número de Cuentas en el Debe es diferente al Número de Cuentas del Haber.");
            return true;
        }

        //var sCodOperacion = $("#txtCodOperacion").val().trim();
        //var sCodTipoMoneda = $("#cboTipoMoneda").val().trim();
        //var sCodLibro = $("#cboLibroContable").val().trim();

        //var aoDinamicaCuentasDet = [];
        //$("#tblCuentas tbody tr").each(function () {
        //    var sCuenta = $(this).find("td").eq(0).text();
        //    var sDebe = $(this).find("td").eq(2).text();
        //    var bTipoMov = (sDebe === "X" ? false : true);

        //    var oDinamicaCuentas = {};
        //    oDinamicaCuentas.CodEmpresa = "X";
        //    oDinamicaCuentas.CodDinamicaCuenta = sCodDinamicaCuenta;
        //    oDinamicaCuentas.CodPlanContable = sCodPlanContable;
        //    oDinamicaCuentas.cCuenta = sCuenta;
        //    oDinamicaCuentas.bTipoMov = bTipoMov;
        //    oDinamicaCuentas.bEstado = true;

        //    aoDinamicaCuentasDet.push(oDinamicaCuentas);
        //});

        //var oDinamicaCuentaDet = fnExisteDinamicaCuentaDet(sCodLibro, sCodTipoMoneda, sCodDinamicaCuenta, JSON.stringify(aoDinamicaCuentasDet));
        //if (!isEmpty(oDinamicaCuentaDet)) {
        //    var iIndice = 0;
        //    var sMensaje = "Existe Asientos con la misma configuración de Cuentas con el(los) código(s) (";
        //    $.each(oDinamicaCuentaDet, function (key, value) {
        //        if (iIndice === 0)
        //            sMensaje += value.CodDinamicaCuenta;
        //        else
        //            sMensaje += ", " + value.CodDinamicaCuenta;
        //        iIndice = iIndice + 1;
        //    });
        //    sMensaje += ")."

        //    alertCustom(sMensaje);
        //    return true;
        //}
        return false;
    };

    var fnGrabar = function () {
        var bError = fnErrorValidacion();
        if (bError === undefined)
            return;
        if (bError)
            return;

        var sOpcion = "1";
        if (eEstadoActual === eEstado.Editar) {
            sOpcion = "2";
        }

        var data = new FormData();

        var sCodOperacion = $("#txtCodOperacion").val().trim();
        var sCodTipoMoneda = $("#cboTipoMoneda").val().trim();
        var sCodLibro = $("#cboLibroContable").val().trim();
        var sDescripcion = $("#txtDescripcion").val().trim();
        var sEstado = ($("#chboEstado").is(":checked") ? "A" : "I");

        var aoDinamicaCuentasDet = [];
        $("#tblCuentas tbody tr").each(function () {
            var sCuenta = $(this).find("td").eq(0).text();
            var sDebe = $(this).find("td").eq(2).text();
            var bTipoMov = (sDebe === "X" ? "D" : "H");

            var oDinamicaCuentas = {};
            oDinamicaCuentas.CodEmpresa = "X";
            oDinamicaCuentas.CodOperacion = sCodOperacion;
            oDinamicaCuentas.CodTipoMoneda = sCodTipoMoneda;
            oDinamicaCuentas.CodPlanContable = sCodPlanContable;
            oDinamicaCuentas.cCuenta = sCuenta;
            oDinamicaCuentas.bTipoMov = bTipoMov;
            oDinamicaCuentas.bEstado = "A";

            aoDinamicaCuentasDet.push(oDinamicaCuentas);
        });

        data.append("sOpcion", sOpcion);
        data.append("sCodOperacion", sCodOperacion);
        data.append("sCodTipoMoneda", sCodTipoMoneda);
        data.append("sCodLibro", sCodLibro);
        data.append("sDescripcion", sDescripcion);
        data.append("sEstado", sEstado);
        data.append("sJsonDinamicaCuentaDet", JSON.stringify(aoDinamicaCuentasDet));

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMDICU.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    alertCustom("Error al intentar Guardar.");
                    return;
                }
                //if (eEstadoActual === eEstado.Nuevo) {
                //    $("#txtCodDinamicaCuenta").val(response);
                //}
                eEstadoActual = eEstado.Editar;
                $("#btnGrabar").html("<i class='icon-pencil'></i> Modificar");
                $("#btnBuscarOperacion").hide();
                $("#cboTipoMoneda").attr("disabled", true);
                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });
    };

    var fnCargaInicial = function () {
        $(".centro").css("text-align", "center");
        $(".derecha").css("text-align", "right");

        eEstadoActual = eEstado.Nuevo;
        var sCodOperacion = ObtenerQueryString("sCodOperacion");
        if (sCodOperacion === undefined || sCodOperacion === "undefined" || sCodOperacion === "")
            return;

        var sCodTipoMoneda = ObtenerQueryString("sCodTipoMoneda");
        if (sCodTipoMoneda === undefined || sCodTipoMoneda === "undefined" || sCodTipoMoneda === "")
            return;

        eEstadoActual = eEstado.Editar;
        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMDICU.ASHX?sOpcion=3&sCodOperacion=" + sCodOperacion + "&sCodTipoMoneda=" + sCodTipoMoneda,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                var oDinamicaCuenta = datos;
                if (isEmpty(oDinamicaCuenta))
                    return;

                var sCodOperacion = oDinamicaCuenta[0].CodOperacion;
                var aoOperaciones = fnGetOperacion(sCodOperacion);

                sCodOperacion = aoOperaciones[0].CODIGO;
                var sTipoOperacion = aoOperaciones[0].DESC_TIPOOP;
                var sOperacion = aoOperaciones[0].DESCRIPCION_OP;

                $("#txtCodOperacion").val(sCodOperacion);
                $("#txtTipoOperacion").val(sTipoOperacion);
                $("#txtOperacion").val(sOperacion);
                
                var sCodTipoMoneda = oDinamicaCuenta[0].CodTipoMoneda;
                $("#cboTipoMoneda").val(sCodTipoMoneda);
                $("#cboTipoMoneda").change();

                $("#cboLibroContable").val(oDinamicaCuenta[0].CodLibro);
                $("#cboLibroContable").change();

                $("#txtDescripcion").val(oDinamicaCuenta[0].DinamicaCuenta);

                if (oDinamicaCuenta[0].Estado === "A") {
                    $("#uniform-chboEstado span").removeClass().addClass("checked");
                    $("#chboEstado").attr("checked", true);
                }
                else {
                    $("#uniform-chboEstado span").removeClass();
                    $("#chboEstado").attr("checked", false);
                }

                var oDinamicaCuentaDet = fnListaDinamicaCuentaDet(sCodOperacion, sCodTipoMoneda);
                $("#tblCuentas tbody").html("");
                if (!isEmpty(oDinamicaCuentaDet)) {
                    $.each(oDinamicaCuentaDet, function (key, value) {
                        var sCuenta = value.CodCuenta;
                        var sDescripcionCuenta = value.Cuenta;
                        var sTipoMov = value.TipoMov;
                        var sDebe = (sTipoMov === "D" ? "X" : "");
                        var sHaber = (sTipoMov === "H" ? "X" : "");
                        fnAgregarFila(sCuenta, sDescripcionCuenta, sDebe, sHaber);
                    });
                }
                fnListarCuentasDestinos();
                $("#btnGrabar").html("<i class='icon-pencil'></i> Modificar");
                $("#btnBuscarOperacion").hide();
                $("#cboTipoMoneda").attr("disabled", true);
                Desbloquear("ventana");
            },
            error: function (result) {
                alertCustom("No se pudo recuperar la información.");
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
        
    };

    return {
        init: function () {
            fnCargarParametros();
            fnCargarPlugins();
            fnCargarEventos();
            fnCargarCombos();
            fnCargaInicial();
        }
    };

}();

var CTLDICU = function () {

    var fnCargarBandeja = function () {
        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMDICU.ASHX?sOpcion=3",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
                Desbloquear("ventana");
            },
            error: function (result) {
                alertCustom("No se pudo recuperar la información.");
                Desbloquear("ventana");
            }
        });
        Desbloquear("ventana");
    }

    var fnFillBandeja = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CodOperacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "Operacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "CodTipoMoneda",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("display", "none");
                    }
                },
                {
                    data: "TipoMoneda",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "DinamicaCuenta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "Libro",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<a class='VerAsiento' >Ver Asiento</a>");
                        $(td).css("text-align", "center").addClass("asiento");
                    }
                },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        if (cellData === "A")
                            $(td).html("ACTIVO");
                        else
                            $(td).html("INACTIVO");
                    }
                },
                {
                    data: null,
                    defaultContent: "<a class='btn green Estado'><i class='icon-refresh'></i></a>",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                }
            ]
        }

        oTableLista = iniciaTabla("tblLista", parms);
        $("#tblLista").removeAttr("style");

        //Agregamos los tipos de controles para los filtros
        $("#tblLista").dataTable().columnFilter({
            aoColumns: [
                { type: "text" },
                { type: "text" },
                null,
                { type: "select", values: ["SOL", "DOL"] },
                { type: "text" },
                { type: "text" },
                null,
                { type: "select", values: ["A", "I"] },
                null
            ]
        });

        //Editamos el texto de los combos que se usan en los filtros
        $("#tblLista_wrapper tfoot select option[value='A']").text("ACTIVO");
        $("#tblLista_wrapper tfoot select option[value='I']").text("INACTIVO");

        //Sobreescrimos el div de busqueda predeterminada agregando un boton para limpiar los filtros
        $("#tblLista_filter").html("");
        //$("#tblLista_filter").html("<a id='btnQuitarFiltros' class='btn green'><i class='icon-remove'></i>Quitar Filtros</a>");
        //$("#btnQuitarFiltros").on("click", function () {
        //    $("#tblLista_wrapper tfoot input").val("");
        //    $("#tblLista_wrapper tfoot select").val("");
        //    oTableLista.DataTable().search("").columns().search("").draw();
        //});

        //Agregamos los placeholder a las cajas de texto de los filtros
        $("#tblLista_wrapper tfoot input").each(function () {
            $(this).attr("placeholder", $(this).attr("value"));
        });

        // modificamos la caja de texto del buscador
        //$("#tblPlanCuentas_wrapper .dataTables_filter input").addClass("m-wrap medium");

        // modificamos el combo de paginacion
        $("#tblLista_wrapper .dataTables_length select").addClass("m-wrap xsmall");

        // modificamos el tamaño de las caja de texto de los filtros
        var vInputBusq = $("#tblLista_wrapper tfoot input");
        $(vInputBusq[0]).addClass("m-wrap small");
        $(vInputBusq[1]).addClass("m-wrap medium");
        $(vInputBusq[2]).addClass("m-wrap small");
        $(vInputBusq[3]).addClass("m-wrap small");

        // modificamos el tamaño de los combos de los filtros
        var vSelectBusq = $("#tblLista_wrapper tfoot select");
        $(vSelectBusq[0]).addClass("m-wrap xsmall");
        $(vSelectBusq[1]).addClass("m-wrap xsmall");

        //ponemos los filtros encima de las cabeceras de columnas de la Tabla
        $("#tblLista tfoot").css("display", "table-header-group");

        $("#tblLista tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                oTableLista.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
                var pos = oTableLista.fnGetPosition(this);
                var row = oTableLista.fnGetData(pos);
                var sCodOperacion = row.CodOperacion;
                var sCodTipoMoneda = row.CodTipoMoneda;
                window.location.href = "?f=CTMDICU&sCodOperacion=" + sCodOperacion + "&sCodTipoMoneda=" + sCodTipoMoneda;
            }
        });


        $("#tblLista tbody").on("click", "td.asiento", function (event) {
            event.stopPropagation();
            var oTr = $(this).parent();

            $(this).find("a.VerAsiento").html("Ocultar Asiento");

            if (oTableLista.fnIsOpen(oTr)) {
                $(this).find("a.VerAsiento").html("Ver Asiento");
                oTr.removeClass("details");
                oTableLista.fnClose(oTr);
                return;
            }

            var pos = oTableLista.api(true).row(oTr).index();
            var row = oTableLista.fnGetData(pos);
            var sCodOperacion = row.CodOperacion;
            var sCodTipoMoneda = row.CodTipoMoneda;

            var oDinamicaCuentaDet = fnListaDinamicaCuentaDet(sCodOperacion, sCodTipoMoneda);

            var sHtml = "<div class='span2'></div>";
            sHtml += "<div class='span8' id='divTblCuentas'>";
            sHtml += "<table id='tblCuentas' class='table table-bordered'>";
            sHtml += "<thead>";
            sHtml += "<tr style='background-color: rgb(3, 121, 56); color: aliceblue;'>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Cuenta</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Descripción</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Debe</th>";
            sHtml += "<th style='text-align:center;font-weight: 600;'>Haber</th>";
            sHtml += "</tr>";
            sHtml += "</thead>";
            sHtml += "<tbody>";

            if (!isEmpty(oDinamicaCuentaDet)) {
                $.each(oDinamicaCuentaDet, function (key, value) {
                    var sCuenta = value.CodCuenta;
                    var sDescripcionCuenta = value.Cuenta;
                    var sTipoMov = value.TipoMov;
                    var sDebe = (sTipoMov === "D" ? "X" : "");
                    var sHaber = (sTipoMov === "H" ? "X" : "");

                    sHtml += ("<tr>");
                    sHtml += ("<td style='text-align:right; font-weight:bold;'>" + sCuenta + "</td>");
                    sHtml += ("<td>" + sDescripcionCuenta + "</td>");
                    sHtml += ("<td style='text-align:center; font-weight:bold;'>" + sDebe + "</td>");
                    sHtml += ("<td style='text-align:center; font-weight:bold;'>" + sHaber + "</td>");
                    sHtml += ("</tr>");
                });
            }

            sHtml += "</tbody>";
            sHtml += "</table>";
            sHtml += "</div>";
            sHtml += "<div class='span2'></div>";

            oTableLista.fnOpen(oTr, sHtml, 'details');
        });

        $("#tblLista tbody").on("click", "a.Estado", function () {
            $(this).parent().parent().addClass("selected");

            var pos = oTableLista.api(true).row($(this).parent().parent()).index();
            var row = oTableLista.fnGetData(pos);
            var sCodOperacion = row.CodOperacion;
            var sCodTipoMoneda = row.CodTipoMoneda;

            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMDICU.ASHX?sOpcion=4&sCodOperacion=" + sCodOperacion + "&sCodTipoMoneda=" + sCodTipoMoneda,
                async: false,
                success: function (response) {
                    if (response == "") {
                        noexito();
                        return;
                    }

                    if (response.indexOf("[Advertencia]:") > -1) {
                        alertCustom(response);
                        return;
                    }

                    if (response.indexOf("[Error]:") > -1) {
                        sException = response;
                        noexito();
                        return;
                    }
                    oTableLista.fnGetData(pos).Estado = response;
                    refrescaTabla(oTableLista);
                    exito();
                },
                error: function (msg) {
                    noexito();
                }
            });
            Desbloquear("ventana");
        });
    };

    var fnListaDinamicaCuentaDet = function (sCodOperacion, sCodTipoMoneda) {
        sCodOperacion = (sCodOperacion === undefined ? "" : sCodOperacion);
        sCodTipoMoneda = (sCodTipoMoneda === undefined ? "" : sCodTipoMoneda);
        var oDinamicaCuentaDet = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMDICU.ashx?sOpcion=5&sCodOperacion=" + sCodOperacion + "&sCodTipoMoneda=" + sCodTipoMoneda,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                oDinamicaCuentaDet = JSON.parse(datos);
            },
            error: function (msg) {
                alertCustom("No se pudo recuperar el Detalle de Cuentas.");
            }
        });
        return oDinamicaCuentaDet;
    };

    return {
        init: function () {
            fnFillBandeja();
            fnCargarBandeja();
        }
    };

}();
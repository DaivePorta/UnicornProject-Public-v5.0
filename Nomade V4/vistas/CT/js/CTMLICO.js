var CTMLICO = function () {
    var eEstado = { Ninguno: 0, Nuevo: 1, Editar: 2 };
    var eEstadoActual = eEstado.Ninguno;

    var fnCargarEventos = function () {
        $("#btnGrabar").on("click", function () {
            fnGrabar();
        });

        $("#btnCancelar").on("click", function () {
            window.location.href = "?f=CTMDICU";
        });
    };

    var fnErrorValidacion = function () {
        if (eEstadoActual !== eEstado.Nuevo && eEstadoActual !== eEstado.Editar) {
            alertCustom("No se pudo realizar la operación.");
            return;
        }

        if (!vErrors(["txtCodSunat", "txtDescripcion", "txtDescripCorta"]))
            return;

        return false;
    };

    var fnGrabar = function () {
        var bError = fnErrorValidacion();
        if (bError === undefined)
            return;
        if (bError)
            return;

        var data = new FormData();

        var sOpcion = (eEstadoActual === eEstado.Editar ? "2" : "1");
        var sCodLibro = $("#txtCodLibro").val().trim();
        var sCodigoSunat = $("#txtCodSunat").val().trim();
        var sDescripcion = $("#txtDescripcion").val().trim();
        var sDescripcionCorta = $("#txtDescripCorta").val().trim();
        var sEstado = ($("#chboEstado").is(":checked") ? "A" : "I");
        
        data.append("sOpcion", sOpcion);
        data.append("sCodLibro", sCodLibro);
        data.append("sCodigoSunat", sCodigoSunat);
        data.append("sDescripcion", sDescripcion);
        data.append("sDescripcionCorta", sDescripcionCorta);
        data.append("sEstado", sEstado);

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMLICO.ASHX",
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
                if (eEstadoActual === eEstado.Nuevo) {
                    $("#txtCodLibro").val(response);
                }
                eEstadoActual = eEstado.Editar;
                $("#btnGrabar").html("<i class='icon-pencil'></i> Modificar");
                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });
    };

    var fnCargaInicial = function () {
        eEstadoActual = eEstado.Nuevo;
        $(".derecha").css("text-align", "right");

        var sCodLibro = ObtenerQueryString("sCodLibro");
        if (sCodLibro !== undefined && sCodLibro !== "undefined" && sCodLibro !== "") {
            eEstadoActual = eEstado.Editar;
            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMLICO.ASHX?sOpcion=3&sCodLibro=" + sCodLibro,
                contentType: "application/json;",
                dataType: "json",
                async: false,
                success: function (datos) {
                    var oLibro = datos;
                    if (isEmpty(oLibro))
                        return;

                    $("#txtCodLibro").val(oLibro[0].CodLibro);
                    if (oLibro[0].Estado === "A") {
                        $("#uniform-chboEstado span").removeClass().addClass("checked");
                        $("#chboEstado").attr("checked", true);
                    }
                    else {
                        $("#uniform-chboEstado span").removeClass();
                        $("#chboEstado").attr("checked", false);
                    }

                    $("#txtCodSunat").val(oLibro[0].cCodSunat);

                    $("#txtDescripcion").val(oLibro[0].cDescripcion);

                    $("#txtDescripCorta").val(oLibro[0].cDescripcionCorta);

                    $("#btnGrabar").html("<i class='icon-pencil'></i> Modificar");
                    Desbloquear("ventana");
                },
                error: function (result) {
                    alertCustom("No se pudo recuperar la información.");
                    Desbloquear("ventana");
                }
            });
            Desbloquear("ventana");
        }
    };

    return {
        init: function () {
            fnCargarEventos();
            fnCargaInicial();
        }
    };

}();

var CTLLICO = function () {

    var fnFillBandeja = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CodLibro",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    }
                },
                {
                    data: "cCodSunat",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    }
                },
                {
                    data: "cDescripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    }
                },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        if (cellData === "A")
                            $(td).html("ACTIVO");
                        else
                            $(td).html("INACTIVO");
                    }
                },
                {
                    data: null,
                    defaultContent: "<a class='btn green'><i class='icon-refresh'></i></a>",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
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
                { type: "text" },
                { type: "select", values: ["A", "I"] },
                null
            ]
        });

        //Editamos el texto de los combos que se usan en los filtros
        $("#tblLista_wrapper tfoot select option[value='A']").text("ACTIVO");
        $("#tblLista_wrapper tfoot select option[value='I']").text("INACTIVO");

        //Sobreescrimos el div de busqueda predeterminada agregando un boton para limpiar los filtros
        $("#tblLista_filter").html("<a id='btnQuitarFiltros' class='btn green'><i class='icon-remove'></i>Quitar Filtros</a>");
        $("#btnQuitarFiltros").on("click", function () {
            $("#tblLista_wrapper tfoot input").val("");
            $("#tblLista_wrapper tfoot select").val("");
            oTableLista.DataTable().search("").columns().search("").draw();
        });

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
        $(vInputBusq[0]).addClass("m-wrap xsmall");
        $(vInputBusq[1]).addClass("m-wrap small");
        $(vInputBusq[2]).addClass("m-wrap large");

        // modificamos el tamaño de los combos de los filtros
        var vSelectBusq = $("#tblLista_wrapper tfoot select");
        $(vSelectBusq[0]).addClass("m-wrap xsmall");

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
                var sCodLibro = row.CodLibro;
                window.location.href = "?f=CTMLICO&sCodLibro=" + sCodLibro;
            }
        });
        
        $("#tblLista tbody").on("click", "a", function () {
            $(this).parent().parent().addClass("selected");

            var pos = oTableLista.api(true).row($(this).parent().parent()).index();
            var row = oTableLista.fnGetData(pos);
            var sCodLibro = row.CodLibro;

            Bloquear("ventana");
            sException = "";
            $.ajax({
                type: "POST",
                url: "vistas/CT/ajax/CTMLICO.ASHX?sOpcion=4&sCodLibro=" + sCodLibro,
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
    }

    var fnCargarBandeja = function () {
        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMLICO.ASHX?sOpcion=3",
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

    return {
        init: function () {
            fnFillBandeja();
            fnCargarBandeja();
        }
    };

}();

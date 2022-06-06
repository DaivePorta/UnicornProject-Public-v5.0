var CTMOPAC = function () {
    var OtableAsientosCont;

    var plugins = function () {
        $("#cboTipoOp").select2();
        $("#cboMoneda").select2();
        $("#cboLibrosCont").select2();
        $("#cboTipoOperacion").select2();
        $("#cboOperacion").select2();
    }

    var CargaInicial = function () {
        var codigo = ObtenerQueryString("codigo");
        if (codigo !== undefined) {

            fnCargarDatos(codigo, 1);

        }
    };

    var ListrarTiposOP = function () {

        Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/OP/ajax/OPMTIOP.ashx?OPCION=LTP",
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoOperacion').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }

                }

                Desbloquear('ventana');
            },
            error: function (msg) {
                alertCustom('Error al lista de tipos de operaciones');
                Desbloquear('ventana');
            }
        });
    };

    var CargarOperaciones = function (v_tipo) {
        Bloquear('ventana');
        $.ajax({
            type: "post",
            url: "vistas/OP/ajax/OPMOPER.ashx?OPCION=LOP&TIPO_OPCODE=" + v_tipo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                $('#cboOperacion').empty();

                if (datos != null && datos.length > 0) {

                    $('#cboOperacion').append("<option></option>");

                    for (var i = 0; i < datos.length; i++) {
                        $('#cboOperacion').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION_OP + '</option>');
                    }

                    Desbloquear('ventana');
                }
                else {
                    alertCustom("No hay operaciones Registradas..!")
                    Desbloquear('ventana');
                }
            },
            error: function (msg) {
                noexitoCustom("Error al listar  operaciones...!");
                OtableTipoOP.fnClearTable();
            }
        });
    };

    var CargarMonedas = function () {
        var select = $('#cboMoneda');
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
                select.html("<option></option>");
                $.each(oTipoMoneda, function (key, value) {
                    select.append("<option value='" + value.CODIGO +
                        "' valueSimbMoneda='" + value.SIMBOLO + "'>" + value.DESCRIPCION + "</option>");
                });
            },
            error: function (msg) {
                noexitoCustom("ERROR AL LISTAR MONEDAS...!");
            }
        });
    };

    var CargarLibrosCont = function () {
        var select = $('#cboLibrosCont');
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMOPAC.ashx?OPCION=LLC",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                select.append('<option value="">TODOS</option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        select.append('<option value="' + datos[i].CodLibro + '">' + datos[i].cDescripcion + '</option>');
                    }
                    select.select2('val', 'TODOS');
                }
            },
            error: function (msg) {
                alertCustom('Error al listar Datos de centros de trabajo.');
            }
        });
    };

    var AutocompletarAsientosCont = function (moneda,libro) {
        var selectinput = $("#txtAsienCont");
        Bloquear('txtascont');
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMOPAC.ashx?OPCION=LAC&CODE_MONEDA=" + moneda + "&CODE_LIBRO=" + libro,
            cache: false,
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos !== null) {
                    selectinput.remove();
                    $("#txtascont").append('<input id="txtAsienCont" class="span12" placeholder="Asiento contable" type="text" />');
                    selectinput = $("#txtAsienCont");

                    items: 100,
                    selectinput.typeahead({
                        source: function (query, process) {
                            arrayCargos = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                arrayCargos.push(datos[i].DinamicaCuenta);
                                obj += '{';
                                obj += '"CODIGO":"' + datos[i].CodDinamicaCuenta + '","DESCRIPCION":"' + datos[i].DinamicaCuenta  + '","USUARIO":"' + datos[i].USUARIO + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.DESCRIPCION] = objeto;
                            });
                            process(arrayCargos);

                        },
                        updater: function (item) {
                            $("#hfCODE_ASCT").val(map[item].CODIGO);
                            $("#txtAsienCont").val(map[item].DESCRIPCION);

                            fnDetalle(map[item].CODIGO);

                            return item;
                        },
                    });
                    selectinput.keyup(function () {
                        $('.dropdown-menu').css('max-height', '300px').css('overflow-x', 'hidden').css('overflow-y', 'auto');
                        $(this).siblings("ul").css("width", $(this).css("width"));
                        if ($(this).val().length === 0) {
                            $('#hfCODE_ASCT, #txtAsienCont').val('');
                            $('.div_mas_dctoreg').remove();
                        }
                    });
                } else {
                    selectinput.autocomplete({ source: [] });
                    alertCustom('No hay Asientos contables....!');
                }
                Desbloquear('txtascont');
            },
            error: function (msg) {
                alertCustom('Error al listar asientos contables');
                Desbloquear('txtascont');
            }
        });
    };

    var IniTablaAsientosCont= function () {

        var parms = {
            data: null,
            columns: [
                { data: 'CODIGO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                 { data: 'DESC_OPERACION', createdCell: function (cell) { $(cell).css('text-align', 'left') } },
                { data: 'DESC_LIBRO', createdCell: function (cell) { $(cell).css('text-align', 'left') } },
                { data: 'MONEDA' },
                 { data: 'DESC_DINAMCUENTA', createdCell: function (cell) { $(cell).css('text-align', 'left') } },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<a style='color: #7D4B09;' class='VerAsiento' ><i class='icon-circle-arrow-down'></i>&nbsp;Ver</a>");
                        $(td).css("text-align", "center");
                    }
                },
                { data: 'ESTADO', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                {
                    data: null, defaultContent: '<a class="btn tooltips green estado" data-toggle="modal" data-original-title="Cambiar Estado"><i class="icon-refresh"></i></a>',
                    createdCell: function (cell) { $(cell).css('text-align', 'center') }
                },
                 { data: 'CODIGO_OP', createdCell: function (cell) { $(cell).css('display', 'none') } },
                 { data: 'CODIGO_DINAMCUENT', createdCell: function (cell) { $(cell).css('display', 'none') } }
            ]

        }


        OtableAsientosCont = iniciaTabla("tblAsientCont", parms);

        $("#tblAsientCont tbody").on("click", "a.VerAsiento", function (event) {
            event.stopPropagation();
            var oTr = $(this).parent().parent();
            $(this).parent().css("background-color", "rgba(26, 144, 35, 0.76);")
            $(this).css("color", "#e5e5e5;")
            oTr.addClass("selected");
            $(this).html("<i class='icon-circle-arrow-up'>&nbsp;Ocultar");

            if (OtableAsientosCont.fnIsOpen(oTr)) {
                $(this).html("<i class='icon-circle-arrow-down'></i>&nbsp;Ver");
                $(this).parent().css("background-color", "white");
                $(this).css("color", "#7D4B09;")
                oTr.removeClass("details");
                OtableAsientosCont.fnClose(oTr);
                oTr.removeClass("selected");
                return;
            }

            var pos = OtableAsientosCont.api(true).row(oTr).index();
            var row = OtableAsientosCont.fnGetData(pos);
            var sCodDinamicaCuenta = row.CODIGO_DINAMCUENT;

            var oDinamicaCuentaDet = fnListaDinamicaCuentaDet(sCodDinamicaCuenta);

            var sHtml = "<div class='span12' id='divTblCuentas'>";
            sHtml += "<div class='span12' id='divTblCuentas'>";
            sHtml += "<table id='tblCuentas' class='table table-bordered'>";
            sHtml += "<thead>";
            sHtml += "<tr style='background-color:rgba(26, 144, 35, 0.76); color: aliceblue;'>";
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

            OtableAsientosCont.fnOpen(oTr, sHtml, 'details');
        });

        $('#tblAsientCont tbody').on('click', 'a.estado', function () {
            $(this).parent().parent().addClass('selected');
            var pos = OtableAsientosCont.api(true).row($(this).parent().parent()).index();
            var row = OtableAsientosCont.fnGetData(pos);
            var code_ascnop = row.CODIGO;
            var code_op = row.CODIGO_OP;
            var code_dnc = row.CODIGO_DINAMCUENT;
            var estado;
            if (row.ESTADO.trim() == "ACTIVO") {
               estado = "I"
            } else {
                estado = "A"
            }

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/CT/ajax/CTMOPAC.ASHX", { OPCION: 'CEACOP', CODE_DINMCUET: code_dnc, CODE_OPER: code_op, CODE_ASNCONTOPR: code_ascnop, ESTADO_IND: estado },
                function (res) {
                    if (res != null) {
                        if (res != null) {
                            //if (res == "I") res = "INACTIVO";
                            //else res = "ACTIVO";
                            $('#tblAsientCont').DataTable().cell(pos, 5).data(res).draw();
                            exito();
                        } else {
                            noexito();
                        }
                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });
            Desbloquear("ventana");
        });

    };

    var fnListaDinamicaCuentaDet = function (sCodDinamicaCuenta) {
        sCodDinamicaCuenta = (sCodDinamicaCuenta === undefined ? "" : sCodDinamicaCuenta);
        var oDinamicaCuentaDet = {};
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMDICU.ashx?sOpcion=5&sCodDinamicaCuenta=" + sCodDinamicaCuenta,
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

    var AgregarAsisntoCont = function () {
        if (vErrorsNotMessage(['cboOperacion', 'txtAsienCont'])) {

                var data = new FormData();
                data.append('OPCION', 'GAOA');
                data.append('CODE_OPER', $("#cboOperacion").val());
                data.append('CODE_DINMCUET', $("#hfCODE_ASCT").val());
                Bloquear('ventana');
                var jqxhr = $.ajax({
                    type: "POST",
                    url: "vistas/CT/ajax/CTMOPAC.ASHX",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false
                }).success(function (res) {
                    if (res !== null) {
                        if (res !== '' & res == "OK") {

                            $("#btnGrabar").html("<i class='icon-save'></i>&nbsp Actualizar");
                            exito();

                        } else {
                            alertCustom("Fallo el registro");
                        }


                    } else {
                        noexito();
                    }
                    Desbloquear("ventana");
                }).error(function () {
                    Desbloquear("ventana");
                    alertCustom("Error al grabar  operacion");
                });
        }
    };

    var ListarAsientoCont = function (CODE_OP) {
        Bloquear('ventana');

        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMOPAC.ashx?OPCION=LOPA&CODE_OPER=" + CODE_OP,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (datos != null && datos.length != undefined) {
                    OtableAsientosCont.fnClearTable();
                    OtableAsientosCont.fnAddData(datos);
                    Desbloquear('ventana');
                }
                else {
                    alertCustom("La operacion no tienes asientos contables asiganados..!")
                    OtableAsientosCont.fnClearTable();
                    Desbloquear('ventana');
                }
            },
            error: function (msg) {
                noexitoCustom("Error al obtener asintos contables de la operacion..!");
                OtableAsientosCont.fnClearTable();
            }
        });
    };

    var EliminarAsiento = function (id) {
        var tr = $("#tblDetAsienCont" + " #" + id.trim());
        tr.remove();
    };

    var fnCargarDatos = function (codigo, nFlag) {

        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMOPAC.ashx?OPCION=LOPA&CODE_OPER=" + codigo,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (!isEmpty(datos)) {

                    if (nFlag === 1) {
                        $("#cboTipoOperacion").val(datos[0].CODE_TIPO_OPERACION).change();
                        $("#cboOperacion").val(datos[0].CODIGO_OP).change();
                    }
                    $("#cboMoneda").val(datos[0].CODE_MONEDA).change();
                    $("#cboLibrosCont").val(datos[0].LIBRO_CODE).change();
                    $("#txtAsienCont").val(datos[0].DESC_DINAMCUENTA);
                    $("#hfCODE_ASCT").val(datos[0].CODIGO_DINAMCUENT);

                    fnDetalle(datos[0].CODIGO_DINAMCUENT);

                    $("#btnGrabar").html("<i class='icon-save'></i>&nbsp Actualizar");

                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener datos  de la operacion...!");
            }
        });

    }

    var fnDetalle = function (sCodDinamicaCuenta) {

        var oDinamicaCuentaDet = fnListaDinamicaCuentaDet(sCodDinamicaCuenta);

        var sHtml = "<div class='span12' id='divTblCuentas'>";
        sHtml += "<div class='span12' id='divTblCuentas'>";
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

        $("#divDetalle").html(sHtml);

    }

    var eventoControles = function () {

        $("#cboMoneda").on("change", function () {
            AutocompletarAsientosCont($(this).val(), $("#cboLibrosCont").val());
        });

        $("#cboLibrosCont").on("change", function () {
            AutocompletarAsientosCont($("#cboMoneda").val(), $(this).val());
        });

        $("#btnGrabar").on("click", function () {
            AgregarAsisntoCont();
        });

        $("#btnCancelar").on("click", function () {
            Cancelar();
        });
    
        $("#cboTipoOperacion").on("change", function () {

            CargarOperaciones($(this).val());

        });

        $("#cboOperacion").on("change", function () {
            fnCargarDatos($(this).val());
        });

    }

    return {
        init: function () {
            plugins();
            ListrarTiposOP();
            CargarMonedas();
            CargarLibrosCont();
            IniTablaAsientosCont();
            eventoControles();
            CargaInicial();
        }
    };
}();


var CTLOPAC = function () {
    var OtableAsnOper;

    var IniTablaAntOper = function () {

        var parms = {
            sDom: 'T<"clear">lfrtip',
            oTableTools: {
                sSwfPath: "recursos/plugins/swf/copy_csv_xls_pdf.swf",
                aButtons: [
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
            data: null,
            columns: [
                { data: 'CODIGO_OP', createdCell: function (cell) { $(cell).css('text-align', 'center') } },
                 { data: 'DESC_OPERACION', createdCell: function (cell) { $(cell).css('text-align', 'left') } },
                { data: 'DESC_DINAMCUENTA', createdCell: function (cell) { $(cell).css('text-align', 'left') } },
                { data: 'DESC_LIBRO', createdCell: function (cell) { $(cell).css('text-align', 'left') } },
                { data: 'MONEDA' },
                {
                    data: 'ESTADO', createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                        if (rowData) {
                            $(td).html('ACTIVO')
                        } else {
                            $(td).html('INACTIVO')
                        }
                    }
                },
            ]

        }


        OtableAsnOper = iniciaTabla("tblOperAsntCont", parms);

        $('#tblOperAsntCont tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                OtableAsnOper.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = OtableAsnOper.fnGetPosition(this);
                var row = OtableAsnOper.fnGetData(pos);
                var cod = row.CODIGO_OP;

                window.location.href = '?f=CTMOPAC&codigo=' + cod;
            }
        });


    };

    var eventoControles = function () {

        $("#btnCancelar").on("click", function () {
            Cancelar();
        });

    }

    var ListarAsntConOper = function () {

        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMOPAC.ashx?OPCION=LOPA",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (datos != null && datos.length > 0) {

                    OtableAsnOper.fnAddData(datos);

                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener datos  de la operacion...!");
            }
        });

    }


    return {
        init: function () {
            IniTablaAntOper();
            ListarAsntConOper();

        }
    };

}();
var seleccionadosLote = []
var hiden = 0;

var NOMGNLO = function () {

    var flagTb = false;

    var plugins = function () {
        $('#cboArea').select2();
        $('#cboSeccion').select2();
        $('#cboProceso').select2();
        $('#cboActividad').select2();
        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();
        $('#cboTipofabri').select2();


        $('#cboRque').select2();
        $('#cbPrioridad').select2();
        $("#txtcant").inputmask({ "mask": "9", "repeat": 9, "greedy": false });

        $('.fecha').datepicker();

        $('.fecha').datepicker("setDate", "now");
    }

    var listar = function () {
        Bloquear("div");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=5&CTLG_CODE=" + $('#cboEmpresas').val() + "&p_ESTABLECIMIENTO=" + $('#cboEstablecimiento').val() + "&P_FECHAINI=" + $('#txtFechaInicio').val() + "&P_FECHAFIN=" + $('#txtFechaFin').val(),
            async: false,
            success: function (datos) {
                Desbloquear("div");
                if (datos != null && datos != "" && datos != "[+]") {

                    var json = $.parseJSON(datos)
                    oTabledetallelotes.fnClearTable()
                    oTabledetallelotes.fnAddData(json)

                }
                else {

                    oTabledetallelotes.fnClearTable()

                }
            },
            error: function (msg) {
                Desbloquear("div");
                alert(msg);

            }
        });
    }

    var ic = 0;
    var funcionalidadTabla = function () {
        $('#detalleLotes tbody').on('click', '.detDoc', function () {

            var pos = oTabledetallelotes.api(true).row($(this).parents("tr")[0]).index();
            var row = oTabledetallelotes.fnGetData(pos);

            var id = row.CODIGO;
            var nTr = $(this).parents('tr')[0];

            if (oTabledetallelotes.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                this.src = "recursos/img/details_open.png";
                oTabledetallelotes.fnClose(nTr);
            }
            else {
                /* Open this row */
                this.src = "recursos/img/details_close.png";
                //$(this).parents('tbody').prepend('<tr><td coslpan="9"></td></tr>');

                oTabledetallelotes.fnOpen(nTr, fnFormatDetails(nTr, id), 'details');
                oTabledetallelotes.fnOpen(nTr, '<div id="c' + id + '" style="border:1px solid #cbcbcb; text-align:center;"></div>', 'details');
                $('#c' + id).html('<img src="./recursos/img/loading.gif" align="absmiddle">');
                Bloquear("ventana");
                $.ajax({
                    type: "POST",
                    //url: "vistas/no/ajax/NOMPRSP.ashx?OPCION=1&CODIGO=" + id + "&P_ESTADO=" + '2',
                    url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=4&p_CODIGO=" + id + "&P_FASE=" + '0' + "&P_ESTADO=" + 'A',
                    async: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        var str = "";
                        var resb = "";
                        ic = ic + 1
                        if (datos == "") { resb = "No hay datos disponibles!"; $('#c' + id).html(resb); }
                        else {
                            resb += "<table id='tblBandejaDetalleF" + ic + "' class='display DTTT_selectable tblBandejaDetalleFd' border='0' style='width:100%;'>";
                            resb += "<thead>";
                            resb += '<tr align="center">';
                            resb += "<th>CODIGO</th>";
                            resb += "<th>COD. SOLICITUD</th>";
                            resb += "<th>ITEM</th>";
                            resb += "<th>CANTIDAD</th>";
                            resb += "<th>ESTADO</th>";

                            resb += "</tr>";
                            resb += "</thead>";
                            resb += "</table>";

                            $('#c' + id).html(resb);

                            cargatablavaciaDetalleF("tblBandejaDetalleF" + ic, $.parseJSON(datos));
                        }


                    }
                });

            }

        });
        function fnFormatDetails(nTr, id) {
            var sOut = '<div id="c' + id + '"></div>';
            return sOut;
        }
    }

    var cargatablavaciaDetalleF = function (id, json) {
        oTableDeudasDetalle = iniciaTabla(id, {
            data: json,
            columns: [
                {
                    data: "CODE_DETALLE_ORDFLU",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "CODE_SOLICTUD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "ITEM",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "CANTIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                }
            ],
            "paging": false,
            scrollCollapse: true,
            "sDom": "t"
        });
    };

    var llenaTabla = function () {
        var parms = {
            data: [],
            order: [[1, 'desc']],
            columns: [
                {
                    data: null,
                    defaultContent: "  <img src='recursos/img/details_open.png' class='detDoc' />",
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHAINI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "FECHAFIN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "CODE_PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "UNIDMEDIDAD",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "TOTAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "GLOSA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');

                        hiden = hiden + 1;
                        var idex = hiden - 1;
                        //var index = id.split('tblBandejaDetalleF').join("")
                        //var hiden = hiden - 1

                        $(td).html("<input type='checkbox' id=ch_" + rowData.CODIGO + " class='chek' /> <input type='hidden' value=" + idex + " id=hd" + idex + " />");

                        $(td).children(".chek").click(function () {

                            var cod = $("#ch_" + rowData.CODIGO + "").parent().parent().children().eq(4).text()
                            if ($("#ch_" + rowData.CODIGO + "").is(":checked")) {
                                var pos = $("#hd" + idex + "").val()
                                //seleccionadosLote.push(cod);
                                seleccionadosLote.push({ "index": "" + pos + "", "valor": "" + cod + "" });
                                $('#hdproducto').val(cod);
                            }
                            else {

                                var pos = $("#hd" + idex + "").val();
                                seleccionadosLote.filter(function (d, e) { if (d.index == pos) { seleccionadosLote.splice(e, 1) } })
                                var codd = recorridocheck();
                                if (codd == 0) {
                                    $('#hdproducto').val("");
                                }
                                else { $('#hdproducto').val(codd); }


                            }



                        });
                    }
                }
            ]
        }
        $('#detalleLotes').DataTable().destroy();
        oTabledetallelotes = iniciaTabla('detalleLotes', parms);
    }

    var eventoControles = function () {
        $('#btnGuardar').click(function () {
            if ($('#emplPidm').val() == '') {
                alertCustom('Ingrese un Responsable Valido')
            } else {
                var numeros = DateDiff(new Date(ConvertirDate($('#txtLoteFechaFin').val())), new Date(ConvertirDate($('#txtLoteFechaini').val())))
                if (numeros < 0) {
                    alertCustom("La Fecha Fin  debe ser mayor a la Fecha de Inicio de - Lote de Produccion");
                    return;
                } else {
                    generar();
                }
            }
        });

        $('#cboEmpresas').on('change', function () {
            $("#txtResponsable").remove();
            $("#input_empl").html("<input id='txtResponsable' class='span10' type='text' style='text-transform: uppercase' autocomplete='off'/> ");
            autocompletarEmpleado('#txtResponsable');
            cargarSucursales();
            $('#cboEstablecimiento').select2('val', $('#ctl00_hddestablecimiento').val()).change();
            oTabledetallelotes.fnClearTable()
        });

        $('#btnBuscar').click(function () {
            listar();
            $("#txtResponsable").remove();
            $("#input_empl").html("<input id='txtResponsable' class='span10' type='text' style='text-transform: uppercase' autocomplete='off'/> ");
            autocompletarEmpleado('#txtResponsable');
            cargarAlmacenes();
        });

        $('#cboEstablecimiento').on('change', function () {
            $("#txtResponsable").remove();
            $("#input_empl").html("<input id='txtResponsable' class='span10' type='text' style='text-transform: uppercase' autocomplete='off'/> ");
            autocompletarEmpleado('#txtResponsable');
            oTabledetallelotes.fnClearTable()
        });

        $('#generar').click(function () {
            if (seleccionadosLote.length > 0) {
                if (seleccionadosLote.length == 1) {
                    var obj = seleccionadosLote[0];
                    $('#hdproducto').val(obj.valor);
                }
                var ik;
                var ij = 0;
                for (ik = 0; ik < seleccionadosLote.length ; ik++) {
                    var obj = seleccionadosLote[ik];
                    if (obj.valor == $('#hdproducto').val()) {
                        ij = ij + 1;
                    } else {
                        alertCustom("error" & obj.valor);
                    }
                }
                if (ij == seleccionadosLote.length) {
                    var datos = recorrido()
                    registrar()
                } else {
                    alertCustom("Seleccione items del mismo producto.")
                }
            } else {
                alertCustom("Seleccione un item.")
            }
        });

        $('#btnSalir').click(function () {
            llenaTabla();
            seleccionadosLote = [];
            $('#txtDescripcion, #hdproducto, #emplPidm, #txtResponsable, #txtOrden, #txtnrolote').val('');
            $('#txtDescripcion, #cboTipofabri, #txtResponsable, #txtfechaRegistro, #txtLoteFechaini, #txtLoteFechaFin, #cboArea').prop('disabled', false);
            $('#txtfechaRegistro, #txtLoteFechaini, #txtLoteFechaFin').datepicker('setDate', new Date());
            $('#tabDatosGenerales').click();
            $("#btnGuardar, #Button1").css('display', 'inline-block');
            $('#btnSalir').css('display', 'none');
            $('#divFabri').modal('hide');
        });
    }

    var registrar = function () {
        var tablas = recorrido();
        var cantidadTotal = recorridoTotal();
        $('#txtCantidad').val(parseFloat(cantidadTotal));
        $('#txtCantidadLote').val(parseFloat(cantidadTotal));
        $('#divFabri').modal({ show: true, backdrop: false, keyboard: true });
    }

    var generar = function () {
        var tablas = recorrido();
        var cantidadTotal = recorridoTotal();

        var data = new FormData;
        data.append('p_CATALOGO', $('#cboEmpresas').val());
        data.append('P_SURCURSAL', $('#cboEstablecimiento').val());
        data.append('P_FECHAREGISTRO', $('#txtfechaRegistro').val());
        data.append('p_GLOSA', $('#txtDescripcion').val());
        data.append('P_PRODUCTO', $('#hdproducto').val());
        data.append('P_TOTAL', cantidadTotal);
        data.append('P_TXT', tablas);

        data.append('P_ESTADO', $("#chkFabri").is(":checked") ? "A" : "I");
        data.append('P_PIDM', $('#emplPidm').val());
        data.append('P_TIPOFABRICARION', $('#cboTipofabri').val());
        data.append('P_CANTIDADFABRICACION', $('#txtCantidad').val());

        data.append("P_SECCION_ALM", $('#cboArea').val())
        data.append("P_FECHAINI_LOTE", $('#txtLoteFechaini').val())
        data.append("P_FECHAFIN_LOTE", $('#txtLoteFechaFin').val())
        data.append("P_CANTIDAD_LOTE", $('#txtCantidadLote').val())
        data.append("P_ESTADO_LOTE", $("#chkLote").is(":checked") ? "A" : "I")

        Bloquear("divFabri");
        $.ajax({
            type: "POST",
            url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=6",
            contentType: false,
            data: data,
            processData: false,
            cache: false
        }).done(function (datos) {
            Desbloquear("divFabri")
            var json = $.parseJSON(datos)
            if (datos[0].SUCCESS == 'ok') {
                exito();
                $('#txtOrden').val(datos[0].CORRELATIVO_0);
                $('#txtnrolote').val(datos[0].CORRELATIVO_1);
                $('#cboArea').attr('disabled', true);
                $('#txtLoteFechaini').attr('disabled', true);
                $('#txtLoteFechaFin').attr('disabled', true);
                $('#txtCantidadLote').attr('disabled', true);
                $("#chkLote").attr('disabled', true);
                $('#txtfechaRegistro').attr('disabled', true);
                $('#txtDescripcion').attr('disabled', true);
                $('#cboTipofabri').attr('disabled', true);
                $('#chkFabri').attr('disabled', true);
                $("#txtResponsable").attr('disabled', true);
                $("#btnGuardar, #Button1").css('display', 'none');
                $('#btnSalir').css('display', 'inline-block');
            }
        }).fail(function (msg) {
            alert(msg);
        });
    }

    var recorridocheck = function () {
        var chc = "";
        var datos_tabla = '';
        var datos_fila = '';
        var id = 0;
        $('#detalleLotes tbody').children().each(function (i) {

            var codigos;

            codigos = $(this).children().eq(9).children().eq(0).attr('id');

            if ($("#" + codigos + "").is(":checked")) {
                id = $("#" + codigos + "").parent().parent().children().eq(4).text()

            }

        });
        return id;
    }

    var recorridoTotal = function () {
        var chc = "";
        var cantidad = 0;
        var total = 0;
        var datos_tabla = '';
        var datos_fila = '';
        $('#detalleLotes tbody').children().each(function (i) {
            var codigos;
            var id = "";
            codigos = $(this).children().eq(9).children().eq(0).attr('id');
            if ($("#" + codigos + "").is(":checked")) {
                cantidad = $("#" + codigos + "").parent().parent().children().eq(7).text()
                total = parseFloat(total) + parseFloat(cantidad);
            }
        });
        return total;
    };

    var recorrido = function () {
        var chc = "";
        var datos_tabla = '';
        var datos_fila = '';
        $('#detalleLotes tbody').children().each(function (i) {
            var codigos;
            var id = "";
            codigos = $(this).children().eq(9).children().eq(0).attr('id');
            if ($("#" + codigos + "").is(":checked")) {
                id = $("#" + codigos + "").parent().parent().children().eq(1).text()
                datos_fila += id + ',' + 'N';
                datos_fila += '|';
            }
        });
        datos_fila = datos_fila + '|';
        datos_tabla = datos_fila.replace('||', '');
        return datos_tabla;
    };

    var autocompletarEmpleado = function (v_ID, v_value) {
        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/NC/estereotipos/ajax/Empleado.ashx?OPCION=LEMP&PIDM=" + 0,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: false
        }).done(function (data) {
            if (data !== null) {
                selectRazonSocial.typeahead({
                    source: function (query, process) {
                        array = [];
                        map = {};
                        var obj = "[";
                        for (var i = 0; i < data.length; i++) {
                            array.push(data[i].NOMBRE_EMPLEADO);
                            obj += '{';
                            obj += '"PIDM":"' + data[i].PIDM + '","NOMBRE_EMPLEADO":"' + data[i].NOMBRE_EMPLEADO + '"';
                            obj += '},';
                        }
                        obj += "{}";
                        obj = obj.replace(",{}", "");
                        obj += "]";
                        var json = $.parseJSON(obj);

                        $.each(json, function (i, objeto) {
                            map[objeto.NOMBRE_EMPLEADO] = objeto;
                        });
                        process(array);
                    },
                    updater: function (item) {
                        $("#emplPidm").val(map[item].PIDM);
                        $("#emplNombres").val(map[item].NOMBRE_EMPLEADO);
                        $("#emplSueldo").val((parseFloat(map[item].REM_TOTAL) / (parseFloat(map[item].HORAS_CONTRATO) * 4)).toFixed(2));
                        return item;
                    },
                });
                selectRazonSocial.keyup(function () {
                    $(this).siblings("ul").css("width", $(this).css("width"))
                });
            }
            if (data != null && $.trim(v_value).length > 0) {
                selectRazonSocial.val(v_value);
            }
        }).fail(function () {
            alertCustom('Error al listar empleados.');
        });
    };

    var tablaVacia = function () {
        var parms = {
            data: [],
            order: [[1, 'desc']],
            columns: [
                 {
                     data: null,
                 },
                 {
                     data: "CODIGO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "IND_CLIENTE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "CLIENTE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "TIPOREQUE",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "PRIORIDAD",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                 {
                     data: "GLOSA",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 }
            ]
        }
        $('#detalle').dataTable().fnDestroy();
        oTable = iniciaTabla('detalle', parms);
    };

    var cargarEmpresas = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false
        }).done(function (datos) {
            $('#cboEmpresas').html('<option></option>');
            if (datos !== null) {
                for (var i in datos) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        }).fail(function () {
            alertCustom('Error al listar empresas.');
        });
    };

    var cargarSucursales = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=2&CTLG_CODE=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false
        }).done(function (datos) {
            selectEst.html('<option></option>');
            if (datos !== null) {
                for (var i in datos) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].ALMACEN + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
        }).fail(function () {
            alertCustom('Error al listar sucursales.');
        });
    };

    var cargarAlmacenes = function () {
        var selectEst = $('#cboArea');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=1&P_ALM=" + $('#cboEstablecimiento :selected').attr('data-scsl-code'),
            contenttype: "application/json;",
            datatype: "json",
            async: false
        }).done(function (datos) {
            selectEst.html('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].ALMACEN + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboArea').select('val', datos[0].CODIGO).change();
            }
        }).fail(function (msg) {
            alert(msg.d);
        });
        $('#cboArea').select2('destroy').select2();
    };

    var cargaInicial = function () {
        $('#txtOrden').attr('disabled', true);
        $('#txtnrolote').attr('disabled', true);
        $('#txtCantidad').attr('disabled', true);
        $('#txtCantidadLote').attr('disabled', true);
        $('#btnSalir').css('display', 'none');
    };

    return {
        init: function () {
            plugins();
            llenaTabla()
            eventoControles();
            cargarEmpresas();
            $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();
            cargaInicial();
            funcionalidadTabla();
        }
    };
}();

var cargarEmpresas = function () {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false
    }).done(function (datos) {
        $('#cboEmpresas').html('<option></option>');
        if (datos != null) {
            for (var i = 0; i < datos.length; i++) {
                $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
            }
            $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();
            cargarSucursales();
        }
    }).fail(function () {
        alertCustom('Error al cargar empresas.');
    });
};

var limpiar = function () {
    $('#txtcodprod, #txtdescprod, #txtUnidad, #txtcant').val("");
};
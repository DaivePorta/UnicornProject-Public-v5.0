
var arrayproducto = [];

var NAMDTLG = function () {

    var oTableLista;    

    var plugins = function () {
        $('#cboEmpresas').select2();
        //$("#tblbmodal").DataTable();

        $('#hf10').multiselect(
            {
                nonSelectedText: 'Seleccione un Almacen!'
            }
        );
    };

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    if (datos.length != 0) {
                        $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val());
                        listarAlmacenes($('#cboEmpresas').val());
                        //Seleccionar almacen de inicio:                       
                        $('#hf10').multiselect("select",$('#ctl00_hddestablecimiento').val());                   
                    }
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };
    
    var eventoControles = function () {
        $('#cboEmpresas').on('change', function () {
            // listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#slsGrupos').val(), $('#slsMoneda').val())
            listarAlmacenes($('#cboEmpresas').val());
        });

        $('#hf10').on('change', function () {
            //listarProductos($('#cboEmpresas').val(), $('#hf10').val())
        });

        $('#buscar').on('click', function () {
            if (vErrors(["cboEmpresas", "txtRotacion"])) {
                listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#txtRotacion').val())
            }
        });

        $('#actualizar').on('click', function () {
            var datos = oTableLista.fnGetData();
            var text = "";

            if (arrayproducto.length > 0) {
                for (var j = 0; j < arrayproducto.length; j++) {                                  
                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].CODIGO_PROD == arrayproducto[j]) {
                            
                            text += datos[i].CODIGO_PROD + ","
                            text += datos[i].PUNTO_REORDEN + ","
                            text += datos[i].STOCK_MINIMO + ","
                            text += datos[i].STOCK_MAXIMO + ","
                            text += datos[i].CODIGO_ALMC + ";"
                        }
                    }
                }            
                text += "}";
                text = text.replace(";}", "");
                var data = new FormData();
                data.append("OPCION", "AB");
                data.append("CADENA", text);

                $.ajax({                    
                    url: "vistas/na/ajax/namdtlg.ashx",
                    type: "post",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        if (datos = "OK") {
                            exito();
                            listarProductos($('#cboEmpresas').val(), $('#hf10').val(), $('#txtRotacion').val());
                        } else {
                            noexito();
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });
            }            
        });

        $("#chkEstado").on("change", function () {
            //listarProductos($('#cboEmpresas').val(), $('#hf10').val());
        });

        $("#txtRotacion").blur(function () {
            let iRotacion = $("#txtRotacion").val();
            iRotacion = $.trim(iRotacion);
            if (iRotacion === "") {
                $("#txtRotacion").val("3");
            } else {
                iRotacion = parseInt(iRotacion);
                if (iRotacion <= 0) {
                    $("#txtRotacion").val("1");
                } else if (iRotacion > 36) {
                    $("#txtRotacion").val("36");
                }
            }
        });
    };   

    var listarAlmacenes = function (empresa) {
        var obj = "";
        Bloquear("divAlmacenes");
        $.ajax({
            type: "post",
            url: "vistas/na/ajax/nalmerc.ashx?OPCION=1&USUA_ID=" + $('#ctl00_txtus').val() + "&codempr=" + empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                Desbloquear("divAlmacenes");
                if (datos != null) {
                    var arr = [];
                    obj += '[';

                    if (datos[0].MENSAJE == "Error") {
                        $('#hf10').multiselect('disable');
                    }
                    else {
                        $('#hf10').multiselect('enable');

                        for (var i = 0; i < datos.length; i++) {

                            arr.push({ "label": datos[i].DESCRIPCION, "title": datos[i].DESCRIPCION, "value": datos[i].CODIGO });
                            obj += '{';
                            obj += '"NOMBRE":"' + datos[i].CODIGO + '"';
                            obj += '},';
                        }
                        obj += '{}';
                        obj = obj.replace(',{}', '');
                        obj += ']';

                    }
                    $('#hf10').multiselect('dataprovider', arr);
                    //$('#hf10').multiselect("select", datos[0].CODIGO);

                    $('.checkbox').attr("style", "padding:2px 0px 2px 0px !important");
                    //listarProductos($('#cboEmpresas').val(), $('#hf10').val());
                }
            },
            error: function (msg) {
                Desbloquear("divAlmacenes");
                alertCustom("Almacenes no listaron corretamente.");
            }
        });
    };

    var fnHandleTable = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CODIGO_PROD_ANTIGUO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "PRODUCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "left");
                    }
                },
                {
                    data: "EMPRESA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "ALMACEN",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "UNIDAD_MEDIDA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        $(td).html(`<input id='pr_${rowData.CODIGO_PROD}_${rowData.CODIGO_ALMC}' type='text' class="Cprec1" value='${rowData.PUNTO_REORDEN}' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/>`);
                        //$(td).html("<input id='pr_" + rowData.CODIGO_PROD + "_" + rowData.CODIGO_ALMC + "' type='text' value='" + rowData.PUNTO_REORDEN + "' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/>");
                        prec_ref = 0;
                        $(td).children(".Cprec1").focus(function () {
                            prec_ref = $(this).val();
                            $(td).children(".Cprec1").val("");
                        });


                        $(td).children(".Cprec1").blur(function () {
                            if ($(this).val() == "") {
                                $(td).children(".Cprec1").val(formatoMiles(prec_ref.split(",").join("")));
                                prec_ref = 0;
                            }
                            else {
                                
                                var minimo = rowData.STOCK_MINIMO;                                

                                if (parseFloat($.trim($(this).val())) > parseFloat(minimo)) {
                                    if (prec_ref != $(this).val()) {
                                        rowData.PUNTO_REORDEN = $.trim($(this).val());
                                        var pos = oTableLista.api(true).row($(this).parent().parent()).index();
                                        var row = oTableLista.fnGetData(pos);

                                        if (arrayproducto.indexOf(row.CODIGO_PROD) === -1) {
                                            arrayproducto.push(row.CODIGO_PROD);
                                            //console.log(arrayproducto);
                                        }
                                    }
                                } else {
                                    infoCustom('La operación NO se realizó! Punto de reorden debe ser mayor a Stock mínimo!');
                                    $(td).children(".Cprec1").val(formatoMiles(prec_ref.split(",").join("")));
                                    prec_ref = 0;
                                }
                                
                            }
                        });
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        $(td).html(`<input id='smin_${rowData.CODIGO_PROD}_${rowData.CODIGO_ALMC}' type='text' class="Cprec2" value='${rowData.STOCK_MINIMO}' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/>`)
                        //$(td).html("<input id='smin_" + rowData.CODIGO_PROD + "_" + rowData.CODIGO_ALMC + "' type='text' value='" + rowData.STOCK_MINIMO + "' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/>");

                        prec_ref2 = 0;
                        $(td).children(".Cprec2").focus(function () {
                            prec_ref2 = $(this).val();
                            $(td).children(".Cprec2").val("");
                        });


                        $(td).children(".Cprec2").blur(function () {
                            if ($(this).val() == "") {
                                $(td).children(".Cprec2").val(formatoMiles(prec_ref2.split(",").join("")));
                                prec_ref2 = 0;
                            }
                            else {
                                
                                var maximo = rowData.STOCK_MAXIMO;
                                var reorden = rowData.PUNTO_REORDEN;

                                if (parseFloat($.trim($(this).val())) < parseFloat(maximo) && parseFloat(reorden) > parseFloat($.trim($(this).val()))) {
                                    if (prec_ref2 != $(this).val()) {
                                        rowData.STOCK_MINIMO = $.trim($(this).val());
                                        var pos = oTableLista.api(true).row($(this).parent().parent()).index();
                                        var row = oTableLista.fnGetData(pos);

                                        if (arrayproducto.indexOf(row.CODIGO_PROD) === -1) {
                                            arrayproducto.push(row.CODIGO_PROD);
                                            //console.log(arrayproducto);
                                        }
                                    }
                                } else {

                                    if (parseFloat($.trim($(this).val())) > parseFloat(maximo)) {
                                        infoCustom('La operación NO se realizó! Stock mínimo no debe ser mayor a Stock máximo!');
                                        $(td).children(".Cprec2").val(formatoMiles(prec_ref2.split(",").join("")));
                                        prec_ref2 = 0;
                                    } else {
                                        infoCustom('La operación NO se realizó! Punto de reorden debe ser mayor a Stock mínimo!');
                                        $(td).children(".Cprec2").val(formatoMiles(prec_ref2.split(",").join("")));
                                        prec_ref2 = 0;
                                    }                                    
                                }                                
                            }
                        });

                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        $(td).html(`<input id='smax_${rowData.CODIGO_PROD}_${rowData.CODIGO_ALMC}' type='text' class="Cprec3" value='${rowData.STOCK_MAXIMO}' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/>`)
                        //$(td).html("<input id='smin_" + rowData.CODIGO_PROD + "_" + rowData.CODIGO_ALMC + "' type='text' value='" + rowData.STOCK_MAXIMO + "' style='max-width:50px;' onkeypress='return ValidaDecimales(event,this)'/>");

                        prec_ref3 = 0;
                        $(td).children(".Cprec3").focus(function () {
                            prec_ref3 = $(this).val();
                            $(td).children(".Cprec3").val("");
                        });

                        $(td).children(".Cprec3").blur(function () {
                            if ($(this).val() == "") {
                                $(td).children(".Cprec3").val(formatoMiles(prec_ref3.split(",").join("")));
                                prec_ref3 = 0;                                
                            }
                            else {
                                
                                var minimo = rowData.STOCK_MINIMO;

                                if (parseFloat($.trim($(this).val())) > parseFloat(minimo)) {
                                    if (prec_ref3 != $(this).val()) {
                                        rowData.STOCK_MAXIMO = $.trim($(this).val());
                                        var pos = oTableLista.api(true).row($(this).parent().parent()).index();
                                        var row = oTableLista.fnGetData(pos);

                                        if (arrayproducto.indexOf(row.CODIGO_PROD) === -1) {
                                            arrayproducto.push(row.CODIGO_PROD);
                                            //console.log(arrayproducto);
                                        }

                                    }       
                                } else {    
                                    infoCustom('La operación NO se realizó! Stock máximo no debe ser menor a Stock minimo!');
                                    $(td).children(".Cprec3").val(formatoMiles(prec_ref3.split(",").join("")));
                                    prec_ref3 = 0;
                                }                                                                                       
                            }
                        });
                    }
                },
                {
                    data: "STOCK_ACTUAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    }
                },
                {
                    data: "COSTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        $(td).html(rowData.MONEDA_SIMB + formatoMiles(cellData))
                    }
                },
                {
                    data: "ROTACION_MENSUAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                    },
                    type: "formatoMiles"
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        $(td).html(`<a class='btn green cambiarbt' tooltip='Modificar'><i class='icon-refresh'></i></a>`);
                        //$(td).html("<a class='btn green cambiarbt' tooltip='Modificar' onclick='modificarDatosLogisticos(" + rowData.CODIGO_PROD + "," + rowData.CODIGO_ALMC + ")><i class='icon-refresh'></i></a>");
                    }
                }
            ]
        }

        oTableLista = iniciaTabla("tblbmodal", parms);

        $('#tblbmodal tbody').on('click', '.cambiarbt', function () {
            var pos = oTableLista.api(true).row($(this).parent().parent()).index();
            var row = oTableLista.fnGetData(pos);
            modificarDatosLogisticos(row.CODIGO_PROD, row.CODIGO_ALMC);
        });
    };

    var modificarDatosLogisticos = function (codProd, codAlmc) {

        var punto_retorno = $.trim($("#pr_" + codProd + "_" + codAlmc + "").val());
        var stock_min = $.trim($("#smin_" + codProd + "_" + codAlmc + "").val());
        var stock_max = $.trim($("#smax_" + codProd + "_" + codAlmc + "").val());

        if (punto_retorno == "" || stock_min == "" || stock_max == "") {
            alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!")
        } else {

            if (parseInt(stock_min) >= parseInt(stock_max)) {
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Stock mínimo no debe ser mayor a Stock máximo!")
            }
            else if (parseInt(punto_retorno) >= parseInt(stock_max)) {
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Punto de reorden no debe ser mayor a Stock máximo!")
            }
            else if (parseInt(punto_retorno) <= parseInt(stock_min)) {
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Punto de reorden debe ser mayor a Stock mínimo!")
            }
            else {
                $.ajax({
                    type: "post",
                    url: "vistas/na/ajax/namdtlg.ashx?OPCION=2&pr=" + punto_retorno + "&smin=" + stock_min + "&smax=" + stock_max + "&codProd=" + codProd + "&codAlmc=" + codAlmc,
                    contenttype: "application/json;",
                    datatype: "json",
                    async: false,
                    success: function (datos) {
                        Desbloquear("ventana");
                        if (datos = "OK") {
                            exito();
                        } else {
                            noexito();
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });
            }
        }
    };

    var listarProductos = function (empresa, almacen, rotacion) {
        $.ajax({
            type: "POST",
            url: "vistas/na/ajax/namdtlg.ashx?OPCION=1&p_almacen=" + $('#hf10').val() +
            "&p_scl=" + empresa +
            "&ESTADO_IND=" + (($("#chkEstado").is(":checked")) ? "" : "A") +
            "&p_ROTACION_MENS=" + rotacion,
            contentType: "application/json;",
            dataType: "json",
            async: true,
            beforeSend: function () { Bloquear("tblProductos"); },
            success: function (datos) {
                oTableLista.fnClearTable();
                if (isEmpty(datos))
                    return;
                oTableLista.fnAddData(datos);
                
            },
            error: function (msg) {
                infoCustom("No se pudo recuperar la información.");
            },
            complete: function () {
                Desbloquear('tblProductos');
            }
        });        
    };
    
    var fnCargaInicial = function () {
        $(".derecha").css("text-align", "right");
    };

    return {
        init: function () {
            plugins();
            eventoControles();
            fillCboEmpresa();
            fnHandleTable();
            fnCargaInicial();
        }
    };

}();











